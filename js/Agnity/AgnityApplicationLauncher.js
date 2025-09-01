function AgnityAppLaunchController()
{
	this.mainHolder = null;
	this.forestName = null;
	this.forestDialog = null;
	
	this.init = function(appLaunchHolder, agnityModalHolder)
	{
		var self = this;
		
		var applicationHelper = new AgnityDynamicDropDownHelper();
		
		this.forestDialog = new AgnityCreateForestModal(agnityModalHolder);
		this.mainHolder = appLaunchHolder;
		
		this.mainHolder.appendChild(applicationHelper.setupWidget(new AgnityGetAvailableForestsHelper('component', Agnity.hasUrlReadonlyParam(), 'afe', Agnity.getDomainName()),
                this.forestName, 'forestName',
       			function(event)
       			{
       				if(this.value == 'AgnityNewRecordRequest')
       				{
       					agnityModalHolder.classList.toggle('showAgnityModal');
       					
       					self.forestDialog.setupContainer(function(possibleForests, newForestName)
       					{
       						applicationHelper.rebuildEntries(possibleForests, newForestName);
       						self.forestName = newForestName;
       					});
       					
       				}
       				else
       				{
       					self.forestName = this.value;
       				}
       			}, 'addNewForest'));
		
		this.mainHolder.appendChild(Agnity.createButtonRowField('launchApplication', function(event)
		{
			self.launchApplication();
		}));
	}
	
	this.launchApplication = function()
	{
		$(location).attr('href', 'ApplicationBuilder.html?' + this.getParamString());
	}
	
	this.getParamString = function()
	{
		var ret = '';
		
		if(this.forestName != null) ret = 'forestName=' + this.forestName;
		
		return ret;
	}
}

function AgnityCreateForestModal(modalHolder)
{
	this.agnityModal = modalHolder;
	this.applicationName = null;
	
	this.setHeading = function(heading)
	{
		var modalHeading = document.createElement('h3');
		modalHeading.appendChild(document.createTextNode(mxResources.get(heading)));
		
		return modalHeading;
	}
	
	this.setupContainer = function(onForestCreatedHandler)
	{
		var self = this;
		
		var agnityModalContent = document.createElement('div');
		agnityModalContent.setAttribute('class', 'AgnityModalContent');
		
		agnityModalContent.appendChild(this.setHeading('createForestDialog'));
		
		agnityModalContent.appendChild(Agnity.createInputTextRowField(this.applicationName, 'forestName', function()
		{		
			self.applicationName = this.value;		
		}));
		
		agnityModalContent.appendChild(Agnity.createButtonRowField('close', function(event)
		{
			if(self.applicationName != null)
			{
				var dataProvider = new AgnityCreateForest(self.applicationName, 'component', Agnity.hasUrlReadonlyParam(), 'afe', Agnity.getDomainName());
				dataProvider.createData(function(possibleValues)
				{
					onForestCreatedHandler(possibleValues, self.applicationName);
				});
			}
			
			self.toggleAgnityModal();
		}));
		
		this.agnityModal.appendChild(agnityModalContent);
	}
	
	this.toggleAgnityModal = function()
	{
		this.agnityModal.classList.toggle('showAgnityModal');
	}
}