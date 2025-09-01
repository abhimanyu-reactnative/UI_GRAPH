function AgnityForestDiagramInfo(forestController, forestName, diagramType, diagramName, additionalParams)
{
	this.forestController = forestController;
	
	this.forestName = forestName;
	this.additionalParams = additionalParams;
	this.diagramType = diagramType;
	this.name = diagramName;
	
	this.tabId = Agnity.uuid();

	this.diagramFrame = null;
	this.diagramTab = null;
	this.dialgramLabel = null;
		
	this.setupDiagramName = function(newName)
	{
		this.name = newName;
		
		if(newName == null || newName == '')
		{
			if(this.diagramType == 'component')
			{
				this.name = mxResources.get('newComponent');
			}
			else if(this.diagramType == 'process')
			{
				this.name = mxResources.get('newProcess');
			}
			else if(this.diagramType == 'dbSchema')
			{
				this.name = mxResources.get('dbSchema');
			}
			else
			{
				this.name = mxResources.get('newTree');				
			}
		}
		
		this.diagramLabel.innerHTML = '';

		mxUtils.write(this.diagramLabel, this.name);
	}
	
	this.setupForestName = function(newForestName)
	{
		this.forestName = newForestName;
		
		if(newForestName == null || newForestName == '')
			this.forestName = mxResources.get('newForest');
		
	}
	
	this.setupPanels = function()
	{
		var self = this;
		
		if(this.name == null)
		{
			if(this.diagramType == 'component')
			{
				this.name = mxResources.get('newComponent');
			}
			else if(this.diagramType == 'process')
			{
				this.name = mxResources.get('newProcess');
			}
			else if(this.diagramType == 'dbSchema')
			{
				this.name = mxResources.get('dbSchema');
			}
			else
			{
				this.name = mxResources.get('newTree');
			}
		}
		
		this.diagramTab = document.createElement('div');
		this.diagramTab.setAttribute('class', 'AgnityDiagramTab');
		
		this.diagramLabel = document.createElement('div');
		
		if(this.diagramType == 'component')
		{
			this.diagramLabel.classList.add('AgnityComponentDiagramTab');
		}
		else if(this.diagramType == 'process')
		{
			this.diagramLabel.classList.add('AgnityProcessDiagramTab');
		}
		else if(this.diagramType == 'dbSchema')
		{
			this.diagramLabel.classList.add('AgnityDBDiagramTab');
		}
		else
		{
			this.diagramLabel.classList.add('AgnityTreeDiagramTab');			
		}
		
		mxUtils.write(this.diagramLabel, this.name);
		
		var closeBtnDiv = document.createElement('div');		
		closeBtnDiv.classList.add('AgnityCloseTab');
		
		closeBtnDiv.addEventListener('click', function(event)
        {
			self.forestController.closeTab(self.tabId);
        });
		
		this.diagramTab.appendChild(this.diagramLabel);
		this.diagramTab.appendChild(closeBtnDiv);
				
		this.diagramTab.addEventListener('click', function(event)
        {
			self.forestController.setActiveTab(self.tabId);
        });
		
		this.diagramFrame = document.createElement('iframe');		
		this.diagramFrame.setAttribute('class', 'AgnityDiagramIFrame');
		
		this.updateLockStatus();
	}


	this.updateLockStatus = function()
	{
		var self = this;
		var diagramName = null;
		var lockAcquired = 0;
		var isNewTab = false;
		
		if(this.diagramType == 'component')
		{
			if(this.name != mxResources.get('newComponent'))
			{
				diagramName = this.name;				
			}
			else
			{
				if(self.getParamString().includes("forceNew"))
				{
					isNewTab = true;
				}
			}
		}
		else if(this.diagramType == 'tree')
		{
			if(this.name != mxResources.get('newTree')) 
				diagramName = this.name;
			else
				isNewTab = true;
		}
		else if(this.diagramType == 'process')
		{
			if(this.name != mxResources.get('newProcess')) 
				diagramName = this.name;
			else
				isNewTab = true;
		}
		else if(this.diagramType == 'dbSchema')
		{
			if(this.name != mxResources.get('dbSchema')) 
				diagramName = this.name;
		}
		var lock = new GetCurrentLockStatus(this.forestName, this.diagramType, diagramName, Agnity.getDomainName());
		
		if(isNewTab)
		{
			lockAcquired = 1;
			lock.getLockStatus(function(response){
				
				if ((response.status == 'LOCKED' || response.status == 'PARENTLOCKED' )  && !Agnity.isLoggedInUser(response.lockedBy))
				{
					lockAcquired = 0;
				}
				self.diagramFrame.setAttribute('src', 'TreeViewer.html?' + self.getParamString() + self.forestController.defaultParams +"&lockAcquired="+lockAcquired +"&newTab=1");
				self.setActive();
				self.diagramFrame.onload = function(){
					self.diagramFrame.contentWindow.onbeforeunload =  function(){
						   event.stopImmediatePropagation();
					};
				}
				return;
			});
		}
		
		lock.getLockStatus(function(response){ 
			console.log(response);
			
			if ((response.status == 'LOCKED' || response.status == 'PARENTLOCKED' ) && Agnity.isLoggedInUser(response.lockedBy))
			{
				lockAcquired = 1;
			}
			console.log(self.forestController.defaultParams);
			
			self.diagramFrame.contentWindow.onbeforeunload =  function(){
					   event.stopImmediatePropagation();
			};
	
			self.diagramFrame.setAttribute('src', 'TreeViewer.html?' + self.getParamString() + self.forestController.defaultParams +"&lockAcquired="+lockAcquired);
			self.setActive();
		}); 
	}
	
	this.getParamString = function()
	{
		var ret = 'tabId=' + this.tabId;
		
		if(this.forestName != null) ret += '&forestName=' + this.forestName;
		
		if(this.diagramType == 'component')
		{
			ret += '&diagram=component';
			
			if(this.name != mxResources.get('newComponent')) ret += '&componentName=' + this.name;
		}
		else if(this.diagramType == 'tree')
		{
			ret += '&diagram=tree';

			if(this.name != mxResources.get('newTree')) ret += '&treeName=' + this.name;
		}
		else if(this.diagramType == 'process')
		{
			ret += '&diagram=process';
			
			if(this.name != mxResources.get('newProcess')) ret += '&treeName=' + this.name;
		}
		else if(this.diagramType == 'dbSchema')
		{
			ret += '&diagram=dbSchema';
			
			if(this.name != mxResources.get('dbSchema')) ret += '&dbSchema=' + this.name;
		}
		
		if(this.additionalParams != null) ret += '&' + this.additionalParams;
		
		return ret;
	}
	
	this.setInactive = function()
	{
		this.diagramTab.classList.remove('AgnityActiveTab');		
		this.diagramTab.classList.add('AgnityInactiveTab');		

		this.diagramFrame.classList.remove('AgnityActiveIframe');		
		this.diagramFrame.classList.add('AgnityInactiveIframe');		
	}
	
	this.setActive = function(iframeHeight)
	{
		this.diagramTab.classList.remove('AgnityInactiveTab');		
		this.diagramTab.classList.add('AgnityActiveTab');
		
		this.diagramFrame.style.height = iframeHeight + 'px';
		this.diagramFrame.classList.remove('AgnityInactiveIframe');		
		this.diagramFrame.classList.add('AgnityActiveIframe');		
	}
}

function AgnityForestController()
{
	this.diagramInfos = [];
	this.activeTabId = null;
		
	this.mainHolder = null;
	this.diagramIFrameHolder = null;
	this.diagramTabHolder = null;
	this.actionPanelHolder = null;
	
	this.applicationsHelper = new AgnityApplicationDynamicDropDownHelper();
	this.applications = [];
	this.applicationName = null;
	
	this.defaultParams = '';
	
	this.debugItems = null;
	this.debugIndex = null;
	this.buttonNameToDivMap = new Map();
	
	this.init = function(forestControlHolder, iframeHolder)
	{
		this.mainHolder = forestControlHolder;
		this.diagramIFrameHolder = iframeHolder;
		
		this.createDiagramTabHolder();
		this.createActionPanelHolder();
		
		this.mainHolder.appendChild(this.diagramTabHolder);
		this.mainHolder.appendChild(this.actionPanelHolder);
		this.startMessageListener();
	}
	
	this.startMessageListener = function()
	{
		var self = this;
		
		window.setInterval(function()
        {
			self.sendMessageToActiveTab('AutoSave', {});
        }, 60000);
		
		window.addEventListener('message', function(event)
		{
			var msg = event.data;
			
			var to = msg.to;
			var tabId = msg.from;
			var payload = msg.payload;
			
			if(msg.to != 'ForestViewer') return;

			if(msg.command == 'setName')
			{		
				self.renameTab(tabId, payload.forestName, payload.diagramType, payload.name);
			}
			else if(msg.command == 'new')
			{
				self.addNewTab(payload.forestName, payload.diagramType, null, payload.additionalParam);
			}
			else if(msg.command == 'loadDiagram')
			{
				if(payload.diagramType != self.getActiveDiagramType(self.activeTabId))
				{
					var isTreeAvailable = false;
					for(var idx = 0; idx < self.diagramInfos.length; idx++)
					{
						if(self.diagramInfos[idx].name == payload.name && self.diagramInfos[idx].diagramType == payload.diagramType && 
								self.diagramInfos[idx].forestName == payload.forestName)
						{
							self.setActiveTab(self.diagramInfos[idx].tabId);
							isTreeAvailable = true;
						}
					}
					if(!isTreeAvailable)
						self.addNewTab(payload.forestName, payload.diagramType, payload.name, null);
				}
				else
					self.renameTab(tabId, payload.forestName, payload.diagramType, payload.name);
			}
			else if(msg.command == 'variableManagement')
			{
				var isTreeAvailable = false;

				for(var idx = 0; idx < self.diagramInfos.length; idx++)
				{
					if(self.diagramInfos[idx].forestName == payload.forestName && self.diagramInfos[idx].name == payload.name && self.diagramInfos[idx].diagramType == 'tree')
					{
						self.setActiveTab(self.diagramInfos[idx].tabId);
						self.sendMessageToActiveTab('executeAction', {'action':'variableManagement'});
						isTreeAvailable = true;
					}
				}
				if(!isTreeAvailable)
					self.addNewTab(payload.forestName, 'tree', payload.name, 'showVariables=' + payload.showVariables);
			}
			else if(msg.command == 'connectTree')
			{
				var isTreeAvailable = false;

				for(var idx = 0; idx < self.diagramInfos.length; idx++)
				{
					if(self.diagramInfos[idx].forestName == payload.forestName && self.diagramInfos[idx].name == payload.name && self.diagramInfos[idx].diagramType == 'tree')
					{
						self.setActiveTab(self.diagramInfos[idx].tabId);
						isTreeAvailable = true;
					}
					else if(self.diagramInfos[idx].forestName == payload.forestName && self.diagramInfos[idx].name == payload.name && self.diagramInfos[idx].diagramType == 'process')
					{
						self.setActiveTab(self.diagramInfos[idx].tabId);
						isTreeAvailable = true;
					}
				}
				if(!isTreeAvailable)
				{
					self.addNewTab(payload.forestName, payload.diagramType, payload.name, null);
				}
			}
			
			else if(msg.command == 'viewComponent')
			{
				var isComponentAvailable = false;

				for(var idx = 0; idx < self.diagramInfos.length; idx++)
				{
					if(self.diagramInfos[idx].forestName == payload.forestName && self.diagramInfos[idx].name == payload.name && self.diagramInfos[idx].diagramType == 'component')
					{
						self.setActiveTab(self.diagramInfos[idx].tabId);
						isComponentAvailable = true;
					}
				}
				if(!isComponentAvailable)
				{
					self.addNewTab(payload.forestName, payload.diagramType, payload.name, null);
				}
			}
			
			else if(msg.command == 'playDebug')
			{
				self.debugItems = payload;
				
				for(var debugInfoIdx = 0; debugInfoIdx < self.debugItems.length; debugInfoIdx++)
				{
					var hasTreeTab = false;
					var hasProcessTab = false;
					
					for(var idx = 0; idx < self.diagramInfos.length; idx++)
					{	
						if(!self.debugItems[debugInfoIdx].isProcess && self.diagramInfos[idx].forestName == self.debugItems[debugInfoIdx].forestName && self.diagramInfos[idx].name == self.debugItems[debugInfoIdx].treeName
								&& self.diagramInfos[idx].diagramType == 'tree')
						{
							hasTreeTab = true;
							break;
						}
						else if(self.debugItems[debugInfoIdx].isProcess && self.diagramInfos[idx].forestName == ('AgnityProcess_' + self.debugItems[debugInfoIdx].treeName) && self.diagramInfos[idx].name == self.debugItems[debugInfoIdx].treeName
								&& self.diagramInfos[idx].diagramType == 'process')
						{
							hasProcessTab = true;
							break;
						}
					}
					
					if(!self.debugItems[debugInfoIdx].isProcess && !hasTreeTab)
					{
						self.addNewTab(self.debugItems[debugInfoIdx].forestName, 'tree', self.debugItems[debugInfoIdx].treeName, null);
					}
					
					if(self.debugItems[debugInfoIdx].isProcess && !hasProcessTab)
					{
						self.addNewTab('AgnityProcess_' + self.debugItems[debugInfoIdx].treeName, 'process', self.debugItems[debugInfoIdx].treeName, null);
					}
					
					self.hideButton('debug');
					self.showButton('debugItem_start');
				}				
			}
			
			else if(msg.command == 'Receive Available Applications')
			{
				if(Object.keys(self.applications).length > 0) return;
				
				self.applications = payload.applications;
				self.applicationsHelper.rebuildEntries(payload.applications, payload.forestName, payload.domainName, payload.doRefresh);
			}
			
			else if(msg.command == 'Refresh Applications')
			{
				self.applications = payload.applications;
				
				if(payload.forestName != null)
					self.applicationName = payload.forestName;
				else if(Agnity.getUrlParam('forestName') != null)
					self.applicationName = Agnity.getUrlParam('forestName');
				else
					self.applicationName = self.findApplicationOnDomain(payload.applications, Agnity.getDomainName(), self.applicationName);
				
				self.applicationsHelper.rebuildEntries(payload.applications, self.applicationName, Agnity.getDomainName(), payload.doRefresh);
				self.closeAllTabs();
				
				self.openFirstTab(self.applicationName);
			}
			else if(msg.command == 'TogglePopups')
			{
				self.setListenerToLogoutPopup();
				// self.setListenerToToggleViewOnIframe();
			}
			else if(msg.command == 'RefreshActiveTab')
			{
				self.currentDiagramInfo.updateLockStatus();
			}
			else if(msg.command == 'RefreshDomainSwticher')
			{
				var applications = new AgnityGetAllAvailableForestsHelper();
				applications.fetchData(function(possibleValues) 
				{
					var getLastAccessedContext = new AgnityGetLastAccessedContext();
					getLastAccessedContext.fetchData(function(response)
					{
						var doRefresh = payload.doRefresh;
						if(Agnity.getDomainName() != response.domainName)
						{
							doRefresh = true;								
						}

						self.applicationsHelper.rebuildEntries(possibleValues, response.forestName, response.domainName, doRefresh);					
					});
				});
			}
			else if(msg.command == 'LockStatusChange')
			{
			    if(!(payload.lock.objectType == 'component' && payload.lock.path.length == 0))
			    {
			    	self.currentDiagramInfo.updateLockStatus();
			    }
			    else
			    {
			    	for(var idx = 0; idx < self.diagramInfos.length; idx++)
			    	{			
			    		if(self.diagramInfos[idx].diagramType == 'tree' || self.diagramInfos[idx].diagramType == 'component')
			    		{
			    			self.diagramInfos[idx].updateLockStatus();
			    		}
			    	}		
			    }
				
				var applications = new AgnityGetAllAvailableForestsHelper();
				applications.fetchData(function(possibleValues) 
				{
					var getLastAccessedContext = new AgnityGetLastAccessedContext();
					getLastAccessedContext.fetchData(function(response)
					{
						self.applicationsHelper.rebuildEntries(possibleValues, response.forestName, response.domainName, false);					
					});
				});
			} else if (msg.command == 'toggele-settings')
			{
				var settingsPage = $("#settings-page")[0];
				if(settingsPage.classList.contains("settings-page-disable"))
				{
					settingsPage.classList.remove("settings-page-disable")
				} else
				{
					settingsPage.classList.add("settings-page-disable")
				}
			}
		});
	}
	
	this.findApplicationOnDomain = function(allPossibleValues, currentDomain, applicationName)
	{
		if(allPossibleValues.length <= 1 && allPossibleValues[0].applications.length == 0)
		{
			return undefined;
		}
		 for (var appKey in allPossibleValues) 
		  {
			  var flag = false;
			  let applications = allPossibleValues[appKey].applications;
			  for(var i = 0; i < applications.length; i++)
			  {
				   if(applications[i].name == currentDomain)
				   {
					   flag = true;
					   return applications[i].name;
				   }
			  }
			  if(flag) 
				  break;
		  }
		return applicationName;
	}
	
	this.sendMessageToActiveTab = function(command, payload)
	{
		var msg = {};
		msg.command = command;
		msg.from = 'ForestViewer';
		msg.to = this.activeTabId;
		msg.payload = payload;
		
		if(!this.isManagedTab(msg.to)) return;
		
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{			
			if(this.diagramInfos[idx].tabId == msg.to)
			{
				this.diagramInfos[idx].diagramFrame.contentWindow.postMessage(msg, $(location).attr("href"));
			}
		}		
	}
	
	this.sendMessageToInActiveTab = function(command, payload)
	{
		var msg = {};
		msg.command = command;
		msg.from = 'ForestViewer';
		msg.to = this.activeTabId;
		msg.payload = payload;
		
		if(!this.isManagedTab(msg.to)) return;
		
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{			
			/*if(this.diagramInfos[idx].tabId != msg.to)
			{*/
				this.diagramInfos[idx].diagramFrame.contentWindow.postMessage(msg, $(location).attr("href"));
			/*}*/
		}		
	}

	
	this.sendMessageToTreeTab = function(forestName, treeName, command, payload)
	{
		var msg = {};
		msg.command = command;
		msg.from = 'ForestViewer';
		msg.payload = payload;
		
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{		
			if(this.diagramInfos[idx].forestName != forestName || this.diagramInfos[idx].name != treeName || this.diagramInfos[idx].diagramType != 'tree') continue;
			
			msg.to = this.diagramInfos[idx].tabId;			
			this.diagramInfos[idx].diagramFrame.contentWindow.postMessage(msg, $(location).attr("href"));
		}
	}
	
	this.sendMessageToProcessTab = function(forestName, treeName, command, payload)
	{
		var msg = {};
		msg.command = command;
		msg.from = 'ForestViewer';
		msg.payload = payload;
		
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{		
			if(this.diagramInfos[idx].forestName != forestName || this.diagramInfos[idx].name != treeName || this.diagramInfos[idx].diagramType != 'process') continue;
			msg.to = this.diagramInfos[idx].tabId;			
			this.diagramInfos[idx].diagramFrame.contentWindow.postMessage(msg, $(location).attr("href"));
		}
	}
	
	this.setupDefaultParams = function()
	{
		this.defaultParams = '';
		
		if(Agnity.getUrlParam('debug') != null)
			this.defaultParams += '&debug=' + Agnity.getUrlParam('debug');
		if(Agnity.getUrlParam('lang') != null)
			this.defaultParams += '&lang=' + Agnity.getUrlParam('lang');
		if(Agnity.getUrlParam('readonly') != null)
			this.defaultParams += '&readonly=' + Agnity.getUrlParam('readonly');
		if(Agnity.getUrlParam('lockAcquired') != null)
			this.defaultParams += '&lockAcquired=' + Agnity.getUrlParam('lockAcquired');
		if(Agnity.getUrlParam('operationMode') != null)
			this.defaultParams += '&operationMode=' + Agnity.getUrlParam('operationMode').toLowerCase();
		else
			this.defaultParams += '&operationMode=afe';
		if(Agnity.getUrlParam('theme') != null)
			this.defaultParams += '&theme=' + Agnity.getUrlParam('theme').toLowerCase();
		else
			this.defaultParams += '&theme=default';
		if(Agnity.getUrlParam('domain') != null)
			this.defaultParams += '&domain=' + Agnity.getUrlParam('domain');
	}
	
	this.openFirstTab = function(inForestName)
	{
		var forestName = Agnity.getUrlParam('forestName');
		if(inForestName != null)
			forestName = inForestName;
		var treeName = Agnity.getUrlParam('treeName');
		var componentName = Agnity.getUrlParam('componentName');
		var processName = Agnity.getUrlParam('processName');
		
		var additionalParams = null;
			
		var showVariables = Agnity.getUrlParam('showVariables');
		if(showVariables != null)
		{
			additionalParams = 'showVariables=' + showVariables;	
		}
		
		if(forestName != null && treeName == null)
		{
			if(additionalParams == null)
				additionalParams = 'openStartBlock=1';
			else
				additionalParams += '&openStartBlock=1';
		}
		
		if(componentName != null && forestName != null)
		{
			this.addNewTab(forestName, 'component', componentName, additionalParams);
		}
		else if(treeName != null && forestName != null)
		{
			this.addNewTab(forestName, 'tree', treeName, additionalParams);
		}
		else if(forestName != null)
		{
			this.addNewTab(forestName, 'component', null, additionalParams);
		}
		else if(processName != null)
		{
			this.addNewTab('AgnityProcess_' + processName, 'process', processName, additionalParams);
		}
		else
		{
			this.addNewTab(null, 'component', null, null);
		}
	}
	
	this.createDiagramTabHolder = function()
	{
		if(this.diagramTabHolder != null) return;
		
		this.diagramTabHolder = document.createElement('div');
		this.diagramTabHolder.setAttribute('class', 'AgnityDiagramTabHolder'); 			
	}
	
	this.getImageButton = function(title, callback)
	{
		var divElement = document.createElement('div');
		divElement.classList.add('AgnityActionPanelIcon');
		divElement.addEventListener('click', callback);
		return divElement;
	}

	this.setListenerToToggleViewOnIframe = function()
	{
		//for click event on iframe body
		$('iframe').contents().find("body").on('click', function(event) { 
			  var popup = document.getElementById('eyeDropdown');
			  if((!document.getElementById('eyeDropdownIcon').contains(event.target) 
					  || !document.getElementById('eyeDropdownExpandIcon').contains(event.target)) 
					  	&& popup.style.display === 'block') 
			  {
				  popup.style.display = 'none';
			  }
		});
	}
	this.setListenerToToggleViewOnParentDocument = function()
	{
		//for click event on doc body
		 var popup = document.getElementById('eyeDropdown');
		 if((!document.getElementById('eyeDropdownIcon').contains(event.target) && !document.getElementById('eyeDropdownExpandIcon').contains(event.target)) 
				&& popup.style.display === 'block') 
		  {
			popup.style.display = 'none';
		  }
	}
	
	this.setListenerToLogoutPopup = function()
	{
		//for click event on iframe body
		$('iframe').contents().find("body").on('click', function(event) { 
			  var popup = document.getElementById('userlogoutPopup');
			  if( !document.getElementById('User').contains(event.target) && popup.style.display === 'block') 
			  {
				  popup.style.display = 'none';
			  }
		});
	}
	this.getUserLogoutPopup = function(title, callback,clickcallback)
	{
		var divElement = document.createElement('div');
		divElement.classList.add('AgnityActionPanelIcon');
		
		var userlogoutPopup = document.createElement('div');
		userlogoutPopup.setAttribute('id','userlogoutPopup');
		userlogoutPopup.classList.add('geDialog');
		userlogoutPopup.classList.add('userDetailsPopup');
		userlogoutPopup.style.display = 'none';
		
	    var dlg = new AgnityLogoutDialog(this.getCurrentUserName());
	    dlg.setupContainer();
	    userlogoutPopup.appendChild(dlg.parentDiv);
	    
		divElement.appendChild(userlogoutPopup);
		divElement.addEventListener('click', callback);
		//for click event on parent html
		document.body.addEventListener('click', clickcallback);
		return divElement;
	}
	this.getCurrentUserName = function()
	{
		var data = Agnity.getLocalStorage('user');
		if(data != null)
		{
			return data.name;
		}
	}
	this.isMinimumScreenWidthExceeds = function()
	{
		var minWidth = 1280;
		if(minWidth < window.screen.availWidth)
		{
			return true;
		}
		return false;
	}
	this.getExpandButton = function(callback)
	{
		var divElement = document.createElement('div');
		divElement.classList.add('AgnityActionPanelExpandIcon');
		divElement.setAttribute('id','eyeDropdownExpandIcon');
		
		divElement.addEventListener('click', callback);
		return divElement;
	}
	this.toggleImageDropdown = function()
	{
		  var popup = document.getElementById('eyeDropdown');
		  if (popup.style.display === 'none') 
		  {
			  popup.style.display = 'block'; 
		  } 
		  else 
		  {
			  popup.style.display = 'none';
		  }
	}
	this.toggleLogoutPopup = function()
	{
		 var popup = document.getElementById('userlogoutPopup');
		  if (popup.style.display === 'none') 
		  {
			  popup.style.display = 'block'; 
		  } 
		  else 
		  {
			  popup.style.display = 'none';
		  }
	}
	this.changeFullScreenImage = function()
	{
		var iframe = document.getElementsByClassName('AgnityDiagramIFrame')[0].contentWindow.document;
		var formatContainer = iframe.getElementsByClassName('AgnityFormatContainer')[0];
		var fullScreenIcon = document.getElementById(mxResources.get('fullScreen')); 
		if(formatContainer.clientWidth > 0 && fullScreenIcon.classList.contains('AgnityFullScreenIcon'))
		{
			fullScreenIcon.classList.remove('AgnityFullScreenIcon');
			fullScreenIcon.classList.add('AgnityFullScreenOutIcon');
		}
		else if(fullScreenIcon.classList.contains('AgnityFullScreenOutIcon'))
		{
			fullScreenIcon.classList.add('AgnityFullScreenIcon');
			fullScreenIcon.classList.remove('AgnityFullScreenOutIcon');
		}
	}
	this.getImageDropDown = function(title, inOptions, callback, documentCallback)
	{
		var divElement = document.createElement('div');
		divElement.classList.add('AgnityActionPanelIcon');
		divElement.setAttribute('id','eyeDropdownIcon');
		
		var optionDiv = document.createElement('div');
		optionDiv.setAttribute('id','eyeDropdown');
		optionDiv.classList.add('mxPopupMenu');
		optionDiv.classList.add('panelDropdown');
		optionDiv.style.display = 'none';
	
		if(inOptions != null && inOptions != undefined)
		{
			var optionTable = document.createElement('table');
			optionTable.classList.add('mxPopupMenu');
			for(var i = 0;i < inOptions.length;i++)
			{
				var optionRow = document.createElement('tr');
				optionTable.appendChild(optionRow);
				var optionData = document.createElement('td');
				optionData.appendChild(inOptions[i]);
				optionRow.appendChild(optionData);
			}
		}
		optionDiv.appendChild(optionTable);
		divElement.appendChild(optionDiv);
		
		divElement.addEventListener('click', callback);
		document.body.addEventListener('click', documentCallback);
		return divElement;
	}
	this.createSeparator = function()
	{
		var separator = document.createElement('div');
		separator.setAttribute('class', 'titleseparator');
		return separator;
	}
	
	this.displayApplicationTitle = function(forestName)
	{
		var divElement = document.createElement('div');
		divElement.classList.add('AgnityApplicationTextHolder');
		divElement.appendChild(document.createTextNode(forestName));
		
		return divElement;
	}
	
	this.displayApplicationsPanelHolder = function()
	{
		if(this.applicationsPanelHolder != null) return;
		
		this.applicationsPanelHolder = document.createElement('div');
		this.applicationsPanelHolder.setAttribute('class', 'AgnityApplicationsPanelHolder');
	}
	
	this.createActionPanelHolder = function()
	{
		if(this.actionPanelHolder != null) return;

		this.actionPanelHolder = document.createElement('div');
		this.actionPanelHolder.setAttribute('class', 'AgnityActionPanelHolder');
		
		var self = this;
		
		var application = this.displayApplicationTitle(Agnity.getUrlParam('forestName'));
		
		var applicationCloseButton = this.getImageButton("", function(event){
			$(location).attr('href', 'ApplicationLauncher.html');
		});
		applicationCloseButton.classList.add('AgnityCloseApplication');
		applicationCloseButton.setAttribute('title', mxResources.get('closeApplication'));
		
		var debugButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('GetDebugFile', {});
		});
		debugButton.classList.add('AgnityDebugIcon');
		debugButton.setAttribute('title', mxResources.get('debug_help'));
		
		var debugItemStartButton = this.getImageButton("", function(){
			self.debugIndex = 0;
			
			for(var idx = 0; idx < self.debugItems.length; idx++)
			{
				if(self.debugItems[idx].isProcess)
					self.sendMessageToProcessTab('AgnityProcess_' + self.debugItems[idx].treeName, self.debugItems[idx].treeName, 'EnableDebugView', {"cellId" :  self.debugItems[idx].cellId});
				else
					self.sendMessageToTreeTab(self.debugItems[idx].forestName, self.debugItems[idx].treeName, 'EnableDebugView', {"cellId" :  self.debugItems[idx].cellId});
			}
			
			self.hideButton('debugItem_start');
			self.showButton('debugItem_close');
			self.showDebugItem();
		});
		debugItemStartButton.classList.add('AgnityStartIcon');
		debugItemStartButton.classList.add('AgnityHideIcon');
		debugItemStartButton.setAttribute('title', mxResources.get('debugItemStart_help'));
		
		var debugItemFirstButton = this.getImageButton("", function(){
			self.debugIndex = 0;
			self.showDebugItem();
		});
		debugItemFirstButton.classList.add('AgnityFirstIcon');
		debugItemFirstButton.classList.add('AgnityHideIcon');
		debugItemFirstButton.setAttribute('title', mxResources.get('debugItemFirst_help'));
		
		var debugItemNextButton = this.getImageButton("", function(){
			if(self.debugIndex == self.debugItems.length - 1) return;
			self.debugIndex += 1;
			self.showDebugItem();
		});
		debugItemNextButton.classList.add('AgnityNextIcon');
		debugItemNextButton.classList.add('AgnityHideIcon');
		debugItemNextButton.setAttribute('title', mxResources.get('debugItemNext_help'));
		
		var debugItemPrevButton = this.getImageButton("", function(){
			if(self.debugIndex == 0) return;
			self.debugIndex -= 1;
			self.showDebugItem();
		});
		debugItemPrevButton.classList.add('AgnityPrevIcon');
		debugItemPrevButton.classList.add('AgnityHideIcon');
		debugItemPrevButton.setAttribute('title', mxResources.get('debugItemPrev_help'));
		
		var debugItemLastButton = this.getImageButton("", function(){
			self.debugIndex = self.debugItems.length - 1;
			self.showDebugItem();
		});
		debugItemLastButton.classList.add('AgnityLastIcon');
		debugItemLastButton.classList.add('AgnityHideIcon');
		debugItemLastButton.setAttribute('title', mxResources.get('debugItemLast_help'));
		
		var debugItemCloseButton = this.getImageButton("", function(){
			for(var idx = 0; idx < self.debugItems.length; idx++)
			{
				if(self.debugItems[idx].isProcess)
					self.sendMessageToProcessTab('AgnityProcess_' + self.debugItems[idx].treeName, self.debugItems[idx].treeName, 'DisableDebugView', {"cellId" :  self.debugItems[idx].cellId});
				else
					self.sendMessageToTreeTab(self.debugItems[idx].forestName, self.debugItems[idx].treeName, 'DisableDebugView', {"cellId" :  self.debugItems[idx].cellId});
			}
			self.showButton('debug');
			self.hideButton('debugItem_first');
			self.hideButton('debugItem_next');
			self.hideButton('debugItem_prev');
			self.hideButton('debugItem_last');
			self.hideButton('debugItem_close');
			
		});
		debugItemCloseButton.classList.add('AgnityCloseIcon');
		debugItemCloseButton.classList.add('AgnityHideIcon');
		debugItemCloseButton.setAttribute('title', mxResources.get('debugItemClose_help'));
		
		this.buttonNameToDivMap.set('debug', debugButton);
		this.buttonNameToDivMap.set('debugItem_start', debugItemStartButton);
		this.buttonNameToDivMap.set('debugItem_first', debugItemFirstButton);
		this.buttonNameToDivMap.set('debugItem_next', debugItemNextButton);
		this.buttonNameToDivMap.set('debugItem_prev', debugItemPrevButton);
		this.buttonNameToDivMap.set('debugItem_last', debugItemLastButton);
		this.buttonNameToDivMap.set('debugItem_close', debugItemCloseButton);
		
		this.actionPanelHolder.appendChild(debugButton);
		this.actionPanelHolder.appendChild(debugItemStartButton);
		this.actionPanelHolder.appendChild(debugItemFirstButton);
		this.actionPanelHolder.appendChild(debugItemPrevButton);
		this.actionPanelHolder.appendChild(debugItemNextButton);
		this.actionPanelHolder.appendChild(debugItemLastButton);
		this.actionPanelHolder.appendChild(debugItemCloseButton);
		
		var newButton = this.getImageButton("", function(){
			var diagramType = self.getActiveDiagramType(self.activeTabId);
			
			if(diagramType == 'component')
				self.addNewTab(self.applicationName, diagramType, null, 'forceNew=1', true);
			else
				self.addNewTab(self.applicationName, diagramType, null, null);
		});
		newButton.classList.add('AgnityNewTreeIcon');
		newButton.setAttribute('title', mxResources.get('new'));
		this.buttonNameToDivMap.set('new', newButton);
		
		this.actionPanelHolder.appendChild(newButton);	
		
		var saveButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('Save', {});
		});
		saveButton.classList.add('AgnitySaveTreeIcon');
		saveButton.setAttribute('title', mxResources.get('save'));
		this.buttonNameToDivMap.set('save', saveButton);
		
		this.actionPanelHolder.appendChild(saveButton);
		
		var saveAsTemplateButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('SaveAsTemplate', {});
		});
		saveAsTemplateButton.classList.add('AgnitySaveAsTemplateIcon');
		saveAsTemplateButton.setAttribute('title', mxResources.get('saveAsTemplate_help'));
		this.buttonNameToDivMap.set('saveAsTemplate', saveAsTemplateButton);
		
		this.actionPanelHolder.appendChild(saveAsTemplateButton);

		var searchButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('Search', {});
		});
		searchButton.classList.add('AgnitySearchIcon');
		searchButton.setAttribute('title', mxResources.get('search'));
		this.buttonNameToDivMap.set('search', searchButton);
		
		this.actionPanelHolder.appendChild(searchButton);
		
		var helpButton = this.getImageButton("", function(){
			//$(location).attr('href', '../../help/aconyx_ade/Responsive HTML5/index.html');
			window.open('../help/aconyx_ade/Responsive HTML5/index.html', '_blank'); 

			self.sendMessageToActiveTab('Help', {});
		});
		helpButton.classList.add('AgnityHelpTreeIcon');
		helpButton.setAttribute('title', mxResources.get('help'));
		this.buttonNameToDivMap.set('help', helpButton);
		
		this.actionPanelHolder.appendChild(helpButton);
		
		var navigatorButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('Navigator', {});
		});
		navigatorButton.classList.add('AgnityNavigatorIcon');
		navigatorButton.setAttribute('title', mxResources.get('navigator_help'));
		this.buttonNameToDivMap.set('navigator', navigatorButton);
		
//		this.actionPanelHolder.appendChild(navigatorButton);
		
		var toggleLeftPanelButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('Toggle SideBar', {});
		});
		toggleLeftPanelButton.classList.add('AgnityToggleLeftPanelIcon');
		toggleLeftPanelButton.setAttribute('title', mxResources.get('toggleLeftPanel_help'));
		this.buttonNameToDivMap.set('toggleLeftPanel', toggleLeftPanelButton);
		
//		this.actionPanelHolder.appendChild(toggleLeftPanelButton);
		
		var toggleHeaderButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('Toggle Header', {});
		});
		toggleHeaderButton.classList.add('AgnityToggleHeaderIcon');
		toggleHeaderButton.setAttribute('title', mxResources.get('toggleHeader_help'));
		this.buttonNameToDivMap.set('togglerHeader', toggleHeaderButton);
		
//		this.actionPanelHolder.appendChild(toggleHeaderButton);
		
		var toggleRightPanelButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('Toggle Right Panel', {});
		});
		toggleRightPanelButton.classList.add('AgnityToggleRightPanelIcon');
		toggleRightPanelButton.setAttribute('title', mxResources.get('toggleRightPanel_help'));
		this.buttonNameToDivMap.set('togglerRightPanel', toggleRightPanelButton);
		
//		this.actionPanelHolder.appendChild(toggleRightPanelButton);
		
		if(!(this.isMinimumScreenWidthExceeds()))
		{
			//TODO
			var options = [navigatorButton,toggleLeftPanelButton,toggleHeaderButton,toggleRightPanelButton];
			var eyeButton = this.getImageDropDown("",options, function(){
				self.toggleImageDropdown();
			}, function(event) {
				self.setListenerToToggleViewOnParentDocument();
			});
			eyeButton.classList.add('AgnityEyeIcon');
			this.buttonNameToDivMap.set('eyeDropdown', eyeButton);
			this.actionPanelHolder.appendChild(eyeButton);
			
			var expand = this.getExpandButton( function(){
				self.toggleImageDropdown();
			}, function(event) {
				self.setListenerToToggleViewOnParentDocument();
			});
			expand.classList.add('eyeExpandIcon');
			this.buttonNameToDivMap.set('eyeExpand', expand);
			this.actionPanelHolder.appendChild(expand);
		}
		else
		{
			this.actionPanelHolder.appendChild(this.createSeparator());
			this.actionPanelHolder.appendChild(navigatorButton);
			this.actionPanelHolder.appendChild(toggleLeftPanelButton);
			this.actionPanelHolder.appendChild(toggleHeaderButton);
			this.actionPanelHolder.appendChild(toggleRightPanelButton);
		}
				
		
		var fullScreenButton = this.getImageButton("", function(){
			self.sendMessageToActiveTab('Full Screen', {});
			self.changeFullScreenImage();
		});
		//TODO
		fullScreenButton.classList.add('AgnityFullScreenIcon');
		fullScreenButton.setAttribute('id', mxResources.get('fullScreen'));
		fullScreenButton.setAttribute('title', mxResources.get('fullScreen_help'));
		this.buttonNameToDivMap.set('fullScreen', fullScreenButton);
		
		if(Agnity.getUrlParam('readonly') == 1)
		{
			this.disableButton('new');
			this.disableButton('save');
			this.disableButton('saveAsTemplate');
		}
		
		if(Agnity.getUrlParam('lockAcquired') == 1)
		{
			this.disableButton('new');
			this.disableButton('save');
			this.disableButton('saveAsTemplate');
		}
		
		this.actionPanelHolder.appendChild(fullScreenButton);
		/*this.actionPanelHolder.appendChild(application);
		this.actionPanelHolder.appendChild(applicationCloseButton);*/
		
		this.actionPanelHolder.appendChild(this.createSeparator());
		
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'applicationhelperwrapper');
		
		this.actionPanelHolder.appendChild(placeholder);
		
		placeholder.appendChild(self.applicationsHelper.setupWidget([], Agnity.getUrlParam('forestName'),
       			function(event)
       			{
       				if(this.value == 'AgnityNewRecordRequest')
       				{
       					self.sendMessageToActiveTab('Create Application', {});
       				}
       				else
       				{
       					self.closeAllTabs();
       					self.openFirstTab(this.value);
       					self.applicationName = this.value;
       					var saveContext = new AgnitySaveAccessedContext();
       					saveContext.storeData(this.value,Agnity.getDomainName(), function(response){
       						console.log(response);
       					});
       				}
       			}, 'addNewForest'));
		
		this.actionPanelHolder.appendChild(this.createSeparator());
		
		if(Agnity.isAdminUser())
		{
			var settingsButton = this.getImageButton("", function(){
					self.sendMessageToActiveTab('Settings', {});
			});
			settingsButton.classList.add('AgnitySettingsIcon');
			settingsButton.setAttribute('title', mxResources.get('settings'));
			this.buttonNameToDivMap.set('settings', settingsButton);
					
			this.actionPanelHolder.appendChild(settingsButton);
		}
				
		var userButton = this.getUserLogoutPopup("", function(){
			self.toggleLogoutPopup();
		}, function(event) {
			  var popup = document.getElementById('userlogoutPopup');
			  if( !document.getElementById('User').contains(event.target) && popup.style.display === 'block') 
			  {
				  popup.style.display = 'none';
			  } 
		});
		userButton.classList.add('AgnityUserIcon');
		userButton.setAttribute('id',mxResources.get('user'))
		this.buttonNameToDivMap.set('logout', userButton);
				
		this.actionPanelHolder.appendChild(userButton);
		
	}
	
	this.sendMessageOnLoad = function()
	{
		console.log('Send Message On Load');
		this.sendMessageToActiveTab('Get Available Applications', {});
	}
	
	this.addNewTab = function(forestName, diagramType, diagramName, additionalParam, isNew)
	{
		if(forestName == null)
		{
			if(Agnity.getUrlParam('forestName') != null && !isNew)
			{
				forestName = Agnity.getUrlParam('forestName');
			}
		}
		
		var currDiagramInfo = new AgnityForestDiagramInfo(this, forestName, diagramType, diagramName, additionalParam);
		currDiagramInfo.setupPanels();
		
		
		this.diagramTabHolder.appendChild(currDiagramInfo.diagramTab);
		this.diagramIFrameHolder.appendChild(currDiagramInfo.diagramFrame);
		this.diagramInfos.push(currDiagramInfo);
		this.currentDiagramInfo = currDiagramInfo;
		this.setActiveTab(currDiagramInfo.tabId);
	}
	
	this.isManagedTab = function(tabId)
	{
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{			
			if(this.diagramInfos[idx].tabId == tabId) return true;
		}
		
		return false;
	}
	
	this.setActiveTab = function(tabId, callback)
	{
		if(!this.isManagedTab(tabId)) return;
		
		if(this.activeTabId != null && tabId != this.activeTabId)
		{
			this.sendMessageToActiveTab('AutoSave', {});
		}
		
		this.activeTabId = null;
		
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{			
			if(this.diagramInfos[idx].tabId == tabId)
			{
				this.activeTabId = tabId;
				this.currentDiagramInfo = this.diagramInfos[idx];
				this.diagramInfos[idx].setActive(this.diagramIFrameHolder.clientHeight - 2);
			}
			else
			{
				this.diagramInfos[idx].setInactive();
			}
		}
		
		if(callback != null && typeof callback === 'function')
			callback();
	}
	
	this.getActiveDiagramType = function(tabId)
	{
		if(!this.isManagedTab(tabId)) return;
		
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{
			if(this.diagramInfos[idx].tabId == tabId)
			{
				return this.diagramInfos[idx].diagramType;
			}
		}
		
		return;
	}
	
	this.renameTab = function(tabId, forestName, diagramType, diagramName)
	{
		if(!this.isManagedTab(tabId)) return;
				
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{			
			if(this.diagramInfos[idx].tabId == tabId && this.diagramInfos[idx].diagramType == diagramType)
			{
				this.diagramInfos[idx].setupDiagramName(diagramName);
				this.diagramInfos[idx].setupForestName(forestName);
				break;
			}
		}
	}
	
	this.closeAllTabs = function()
	{
		var numberOfTabs = this.diagramInfos.length;
		
		for(var idx = 0; idx < numberOfTabs; idx++)
		{	
			this.diagramTabHolder.removeChild(this.diagramInfos[idx].diagramTab);
			this.diagramIFrameHolder.removeChild(this.diagramInfos[idx].diagramFrame);
			
		}
		this.diagramInfos = [];
		
		this.activeTabId = null;
		
	}
	
	this.closeTab = function(tabId)
	{
		if(!this.isManagedTab(tabId)) return;

		var removeIdx = -1;
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{			
			if(this.diagramInfos[idx].tabId == tabId)
			{
				this.diagramTabHolder.removeChild(this.diagramInfos[idx].diagramTab);
				this.diagramIFrameHolder.removeChild(this.diagramInfos[idx].diagramFrame);
			
				removeIdx = idx;
				break;
			}
		}
		
		if(removeIdx != -1)
		{
			this.diagramInfos.splice(removeIdx, 1);
			
			if(this.activeTabId == tabId)
			{
				this.activeTabId = null;
				
				if(this.diagramInfos.length <= removeIdx)
				{
					removeIdx--;
					
					if(removeIdx != -1)
					{
						this.setActiveTab(this.diagramInfos[removeIdx].tabId);
					}
					else
					{
						this.openFirstTab();
					}
				}
				else
				{
					this.setActiveTab(this.diagramInfos[removeIdx].tabId);
				}
			}
		}
		
	}
	
	this.getTabId = function(forestName, diagramType, diagramName)
	{
		if(forestName == null || diagramName == null) return;
		
		for(var idx = 0; idx < this.diagramInfos.length; idx++)
		{
			if(this.diagramInfos[idx].forestName == forestName && this.diagramInfos[idx].name == diagramName && this.diagramInfos[idx].diagramType == diagramType)
			{
				return this.diagramInfos[idx].tabId;
			}
		}
	}
	
	this.showDebugItem = function()
	{
		if(this.debugIndex == null) return;
		
		this.enableButton('debugItem_first');
		this.enableButton('debugItem_next');
		this.enableButton('debugItem_prev');
		this.enableButton('debugItem_last');
		
		if(this.debugIndex == 0)
		{
			this.disableButton('debugItem_prev');
		}
		
		if(this.debugIndex == this.debugItems.length -1)
		{
			this.disableButton('debugItem_next');
		}
		
		var currDebugItem = this.debugItems[this.debugIndex];
		
		if(currDebugItem == null) return;
		
		var forestName = currDebugItem.forestName;
		var diagramType = 'tree';
		
		if(currDebugItem.isProcess)
		{
			forestName = 'AgnityProcess_' + currDebugItem.treeName;
			diagramType = 'process';
		}
			
		var tabId = this.getTabId(forestName, diagramType, currDebugItem.treeName);
		this.setActiveTab(tabId);
		this.sendMessageToActiveTab('ShowCell', {'cellId' : currDebugItem.cellId});
	}
	
	this.showButton = function(buttonName)
	{
		var button = this.buttonNameToDivMap.get(buttonName);
		button.classList.add('AgnityShowIcon');
		button.classList.remove('AgnityHideIcon');
	}
	
	this.hideButton = function(buttonName)
	{
		var button = this.buttonNameToDivMap.get(buttonName);
		button.classList.add('AgnityHideIcon');
		button.classList.remove('AgnityShowIcon');
	}
	
	this.enableButton = function(buttonName)
	{
		var button = this.buttonNameToDivMap.get(buttonName);
		button.classList.add('AgnityShowIcon');
		button.classList.remove('AgnityDisableIcon');
		button.classList.remove('AgnityHideIcon');
	}
	
	this.disableButton = function(buttonName)
	{
		var button = this.buttonNameToDivMap.get(buttonName);
		button.classList.add('AgnityDisableIcon');
	}
}

