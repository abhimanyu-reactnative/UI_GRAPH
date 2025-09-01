Agnity.getUrlParam = function(name)
{
	var url = window.location.href;
	
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    
    return decodeURIComponent(results[2].replace(/\+/g, " "));    
}

Agnity.getDefaultForestName = function()
{
	return Agnity.getUrlParam('forestName');
}

Agnity.hasUrlDebugParam = function()
{
	var debugParam = Agnity.getUrlParam('debug');
	
	if(debugParam == 1)
		return true;
	
	return false;
}

Agnity.hasUrlReadonlyParam = function()
{
	var readonlyParam = Agnity.getUrlParam('readonly');
	
	if(readonlyParam == 1)
		return true;
	
	return false;
}

Agnity.hasLockAcquired = function()
{
	var lockAcquired = Agnity.getUrlParam('lockAcquired');
	
	if(lockAcquired == 1)
		return true;
	
	return false;
}

Agnity.isComponentDiagram = function()
{
	var componentDiagram = Agnity.getUrlParam('diagram');
	
	if(componentDiagram == 'component')
		return true;
	
	return false;
}

Agnity.isProcessDiagram = function()
{
	var processDiagram = Agnity.getUrlParam('diagram');
	
	if(processDiagram == 'process')
		return true;
	
	return false;
}

Agnity.isTreeDiagram = function()
{
	var treeDiagram = Agnity.getUrlParam('diagram');
	
	if(treeDiagram == 'tree')
		return true;
	
	return false;
}

Agnity.isDBSchemaDiagram = function()
{
	var dbSchemaDiagram = Agnity.getUrlParam('diagram');
	
	if(dbSchemaDiagram == 'dbSchema')
		return true;
	
	return false;
}

Agnity.getThemeName = function()
{
	var theme = Agnity.getUrlParam('theme');
	if(theme != null) return theme;
	
	return 'default';
}

Agnity.isADE = function()
{
	var url = window.location.pathname;
	
	var urlParts = url.split('/');
	
	return Agnity.includes(urlParts, 'ADE');
}

Agnity.sendTabRefreshMessage = function(lockStatus)
{
	if(lockStatus == 'CREATEDLOCK')
	{
		agnityGlobalData.sendMessageToParent('RefreshActiveTab');
	}
}

Agnity.getDomainName = function()
{ 
	var domain = $('#AgnityApplicationDropdownField',parent.document).find(":selected").parent().prop('label');
	return domain;
}

Agnity.getSelectedForestName = function()
{
	return $('#AgnityApplicationDropdownField',parent.document).find("option:selected").prop("value");
}

Agnity.includes = function(array, value)
{
	return (array.indexOf(value) != -1);
}

Agnity.onShapesLoaded = function(editorUi)
{
	var forestName = Agnity.getUrlParam('forestName');
	var treeName = Agnity.getUrlParam('treeName');
	var componentName = Agnity.getUrlParam('componentName');
	var tabId = Agnity.getUrlParam('tabId');
	var showVariables = Agnity.getUrlParam('showVariables');
	var forceNew = Agnity.getUrlParam('forceNew');
	var diagramName = null;
	Agnity.loadCss();
	
	agnityGlobalData.ui = editorUi;
	
	//Add Lock and Unlock action in toolbar
	if(forestName && forestName.includes('AgnityProcess_'))
	{
		forestName = Agnity.getSelectedForestName();
	}
	if(Agnity.isComponentDiagram())
	{
		diagramName = urlParams.componentName ? urlParams.componentName : componentName;
	} 
	else if(Agnity.isTreeDiagram() || Agnity.isProcessDiagram())
	{
		diagramName = urlParams.treeName;
	} 
	var lock = new GetCurrentLockStatus(forestName, Agnity.getUrlParam('diagram'), diagramName, Agnity.getDomainName());
	lock.getLockStatus(function(response){ 
		Agnity.createFloatingLockStatusIcon(editorUi, lock, response.status, response.lockedBy, response.userName);
	}); 
	
	editorUi.setPageVisible(false);
	var graph = editorUi.editor.graph;
	
	if(graph.isGridEnabled())
	{
		editorUi.actions.get('grid').funct();
	}
	
	if(tabId != null)
	{
		agnityGlobalData.startMessageListener(tabId);
	}
	
	var mappingLoader = new AgnityGetMappingDataHelper();
	
	mappingLoader.fetchData(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response){
		
		agnityGlobalData.setupMappingData(response);
		
		if(Agnity.isComponentDiagram())
		{
			if(forceNew != 1)
			{				
				if(forestName != null && componentName != null)
				{
					editorUi.actions.get('loadFunctionBlock_int').funct(forestName, componentName, function()
					                                                    {
																			editorUi.sidebar.showTreeData();
					                                                    });
				}
				else if(forestName != null)
				{
					editorUi.actions.get('loadFunctionBlock_int').funct(forestName, forestName, function()
					                                                    {
						editorUi.sidebar.showTreeData();
                    });
				}
			}
		}
		else if(Agnity.isProcessDiagram())
		{
			if(forestName != null && treeName != null)
			{
				editorUi.actions.get('loadProcess_int').funct(forestName, treeName, function()
	              {
						editorUi.sidebar.showTreeData();

						if(showVariables == 1)
						{
							editorUi.actions.get('variableManagement').funct();
						}
	              });
			}
		}
		else if(Agnity.isDBSchemaDiagram())
		{
			if(forestName != null)
			{
				editorUi.actions.get('loadDBSchema_int').funct(forestName, function()
				{
					
				});
			}
		}
		else
		{
			if(forestName != null && treeName != null)
			{
				editorUi.actions.get('loadTreeDialog_int').funct(forestName, treeName, function()
		        {
					editorUi.sidebar.showTreeData();

					if(showVariables == 1)
					{
						editorUi.actions.get('variableManagement').funct();
					}					    
		        });
			}			
		}
		
	});
	
	if(Agnity.hasUrlReadonlyParam())
		Agnity.setupMenusOnReadonlyMode(agnityGlobalData.ui);
	
	if(!Agnity.hasLockAcquired())
		Agnity.setupMenusOnLock(agnityGlobalData.ui);
	
	//Agnity.setupCustomOperations(agnityGlobalData.ui);
}

Agnity.createFloatingLockStatusIcon = function(ui, lock, lockStatus, lockedUser, lockedUserName)
{
	var h=33;
	var w = 33;
	var dh = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	var left = Math.max(1, Math.round(($(".geSidebarContainer").width()+ $("body > .geDiagramContainer").width() - w - 5)));
	var top = $(".geToolbarContainer.geMenubarContainer").height()+ 15; //Math.max(1, Math.round((dh - h - ui.footerHeight) / 3));
	var div = document.getElementById('lock-status-floating-icon');
	if(div != null)
	{
	   div.remove(); 
	}
	div =  ui.createDiv('lock-status-floating-icon');
	div.setAttribute('id', 'lock-status-floating-icon');
	
	Agnity.toggleLockIcon(lockStatus, lockedUser);
	Agnity.toggleFloatingLockIcon(ui, div, lockStatus, lockedUser, lockedUserName);
	 
	div.style.width = w + 'px';
	div.style.height = h + 'px';
	div.style.left = left + 'px';
	div.style.top = top + 'px';
	div.style.zIndex = this.zIndex;
	div.style.position = 'relative';
	
	if(lockStatus != 'UNLOCKED')
	{
		$(div).click(function(){
			lock.getLockInfo(function(response)
					{ 
				var dlg = new AgnityLockStatusDialog(ui, response.locks);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 800, 450, true, false);
					})
		});
	}
	
	$("body > .geDiagramContainer").after(div);
	
	this.resizeListener = mxUtils.bind(this, function()
	{
		var left = Math.max(1, Math.round(($(".geSidebarContainer").width()+ $("body > .geDiagramContainer").width() - w)));
		var top = $(".geToolbarContainer.geMenubarContainer").height()+ 15;
		div.style.left = left + 'px';
		div.style.top = top + 'px';
	});
	
	let resizeObserver = new ResizeObserver(this.resizeListener);
    resizeObserver.observe($("body > .geDiagramContainer")[0]);
	mxEvent.addListener(window, 'resize', this.resizeListener);
}

Agnity.toggleFloatingLockIcon = function(ui, div, lockStatus, lockedUser, lockedUserName)
{
	var lockIcon;
	var userIcon;
	var disabledIcon;
	if(lockStatus == 'UNLOCKED')
	 {
	    lockIcon = ui.createDiv('lock-status-notlocked');
	    div.appendChild(lockIcon);
	 	div.setAttribute('title', lockStatus.toLowerCase());
	 	div.style.background = "#68A93E";
	 }
	 else if(lockStatus == 'LOCKED' || lockStatus == 'PARENTLOCKED')
	 {
	 	if(Agnity.isLoggedInUser(lockedUser))
	 	{
	 		div.style.background = '#f57203';
		 	lockIcon = ui.createDiv('lock-status-locked');
		 	userIcon = ui.createDiv('user-icon');
		 	div.appendChild(lockIcon);
		 	div.appendChild(userIcon);
	 	}
	 	else
	 	{
	 		div.style.background = 'red';
	 		lockIcon = ui.createDiv('lock-status-locked');
	 		div.appendChild(lockIcon);
		 	disabledIcon = ui.createDiv('disabled-icon');
		 	div.appendChild(disabledIcon);
	 	}
	 	
	 	if(lockStatus == 'PARENTLOCKED')
	 		div.setAttribute('title', ('parent-locked' + ' by user ' + lockedUserName));
	 	else
	 		div.setAttribute('title', (lockStatus.toLowerCase() + ' by user ' + lockedUserName));
	 }
	
}

Agnity.toggleLockIcon = function(lockStatus, lockedUser)
{
	var lockIcon = $('#Lock');
	var unlockIcon = $('#Unlock');
	if(Agnity.getUrlParam('newTab') != null && Agnity.getUrlParam('newTab') == 1)
	{
		if(Agnity.isComponentDiagram() || Agnity.isTreeDiagram())
		{
			Agnity.addDisabled(lockIcon);
			Agnity.addDisabled(unlockIcon);
			return;
		}
	} 
	if(lockStatus == 'LOCKED')
	{
		Agnity.addDisabled(lockIcon);
			
		if((Agnity.isLoggedInUser(lockedUser)))
		{
			Agnity.addEnabled(unlockIcon);
		}
		else
		{
			Agnity.addDisabled(unlockIcon);
		}
	}
	else if(lockStatus == 'PARENTLOCKED')
	{
		Agnity.addDisabled(lockIcon);
		Agnity.addDisabled(unlockIcon);
	}
	else
	{
		Agnity.addEnabled(lockIcon);
		Agnity.addDisabled(unlockIcon);
	}
}

Agnity.addDisabled = function(elt)
{
	if(!elt.hasClass('mxDisabled'))
	{
		elt.addClass('mxDisabled');
	}
}
Agnity.addEnabled = function(elt)
{
	if(elt.hasClass('mxDisabled'))
	{
		elt.removeClass('mxDisabled');
	}
}

Agnity.setupMenusOnReadonlyMode = function(ui)
{
	for(var idx = 0; idx < agnityGlobalData.disableMenusOperations.length; idx++)
	{
		ui.actions.get(agnityGlobalData.disableMenusOperations[idx]).setEnabled(false);
	}
}

Agnity.setupMenusOnLock = function(ui)
{
	for(var idx = 0; idx < agnityGlobalData.disableMenusOperationsOnLock.length; idx++)
	{
		ui.actions.get(agnityGlobalData.disableMenusOperationsOnLock[idx]).setEnabled(false);
	}
}



Agnity.setupCustomOperations = function(ui)
{
	var allowedOperations;
	
	var treeData = Agnity.getTreeData(ui);
	
	for(var idx = 0; idx < agnityGlobalData.allCustomOperations.length; idx++)
	{
		ui.actions.get(agnityGlobalData.allCustomOperations[idx] + '_int').setEnabled(false);
	}
	
	if(treeData.forestName != null && treeData.treeName != null && 
			treeData.forestName != '' && treeData.treeName != '')
	{
		allowedOperations = new AgnityGetAllowedCustomOperationsHelper(treeData.forestName, treeData.treeName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		
		allowedOperations.fetchData(function(customOperations)
        {
			for(var opIdx = 0; opIdx < customOperations.length; opIdx++)
			{
				ui.actions.get(customOperations[opIdx].toLowerCase() + '_int').setEnabled(true);
			}
        });
	}
}

Agnity.loadCss = function()
{
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '../themes/' + Agnity.getThemeName() + '/styles/Agnity.css';
    head.appendChild(link);
}

Agnity.doRedirect = function(url)
{
	var redirectUrl = url + "?theme=" + Agnity.getThemeName();
	window.parent.location.replace(redirectUrl);
}

Agnity.doRedirectToNewTab = function(url)
{
	var redirectUrl = url + "?theme=" + Agnity.getThemeName();
	window.open(redirectUrl,'_blank');
}

Agnity.getLocalStorage = function(title)
{
	 return JSON.parse(localStorage.getItem(title));
}

Agnity.isAdminUser = function()
{
	return Agnity.getLocalStorage('user').admin;
}

Agnity.setLocalStorage = function(title,data)
{
	localStorage.setItem(title,data);
}

Agnity.clearLocalStorage = function(title)
{
	localStorage.clear();
}

Agnity.getApplications = function()
{
	var applications = new AgnityGetAllAvailableForestsHelper();
	applications.fetchData(function(possibleValues) 
	{
		if(Agnity.getUrlParam('domain') == null || Agnity.getUrlParam('domain') == undefined)
		{
			var getLastAccessedContext = new AgnityGetLastAccessedContext();
			getLastAccessedContext.fetchData(function(response)
			{
				agnityGlobalData.sendMessageToParent('Receive Available Applications', { 'applications': possibleValues, 'forestName': response.forestName, 'domainName': response.domainName
					,'doRefresh': true});
			});
		}
		else
		{
			agnityGlobalData.sendMessageToParent('Receive Available Applications', { 'applications': possibleValues, 'forestName': Agnity.getUrlParam('forestName'), 'domainName': Agnity.getUrlParam('domain')
				,'doRefresh': true});
		}
	});
}

Agnity.getAccountHierarchialColumn = function(inColumnName, inApiName, inDescription)
{
	var accountInfo = new AgnityColumnInfo();
	
	accountInfo.name = inColumnName;
	accountInfo.apiName = inApiName;
	accountInfo.description = inDescription;
	accountInfo.type = 'NUMBER';
	accountInfo.columnType = 'System Type';
	accountInfo.size = '';
	accountInfo.sizeType = '';
	accountInfo.isSort = false;
	accountInfo.defaultVal = '';	
	accountInfo.nullVal = '';
	accountInfo.precision = '38';
	accountInfo.scale = '0';
	accountInfo.timestampType = '';
	accountInfo.secondsPrecision = '';
	accountInfo.formulaText = '';
	accountInfo.isSeqGeneratedField = false;
	accountInfo.sequenceName = 'NONE';
	
	return accountInfo;
}

Agnity.NAFormatter = function(value)
{
	if(value == null || value == '')
	{
		value = 'N/A';
		return value;
	}
	return value;
}

Agnity.addZeroBefore = function(value, number) {
	return ( value + "").padStart(number,'0');
}


Agnity.dateFormatter = function(value)
{
	if(value != null && value != '')
	{
/*		 const monthNames =["Jan","Feb","Mar","Apr",
            "May","Jun","Jul","Aug",
            "Sep", "Oct","Nov","Dec"];
		 var date = new Date(value);
		 var day = Agnity.addZeroBefore(date.getDate(), 2);
		 var monthName = Agnity.addZeroBefore(monthNames[date.getMonth()], 2);
		 var year = Agnity.addZeroBefore(date.getFullYear(), 4);
		 var hours = Agnity.addZeroBefore(date.getHours(), 2);
		 var minutes = Agnity.addZeroBefore(date.getMinutes(), 2);*/
		 var date = new Date(value);

		 return date.toLocaleString();
	}
	else
	{
		value = 'N/A';
		return value;
	}
}

Agnity.timeFormatter = function(value)
{
	if(value != null && value != '')
	{
		 var date = value/1000;
		 var days = Math.floor(date / 86400);
		 var hours = Math.floor(date / 3600) % 24;
		 var minutes =  Math.floor(date / 60) % 60;
		 if(days == 0 && (hours != 0 && minutes != 0))
		 {
			 return `${hours}h ${minutes}m`;
		 }
		 else if(days == 0 && hours == 0)
		 {
			 return `${minutes}m`;
		 }
		 return `${days}d ${hours}h ${minutes}m`;
	}
	else
	{
		value = 'N/A';
		return value;
	}
}

Agnity.isLoggedInUser = function(userid)
{
	return Agnity.getLocalStorage('user').userId == userid ? true: false;
}