function AgnitySettingDomainTab(contentDom)
{
	function AgnityDomainDetails()
	{
		this.fetchData = function(callback)
		{		
			var params = {};
			params.op = 'getDomains';
			
			$.ajax({
				type : "GET",
				url : agnityGlobalData.serviceEndPoint,
				contentType : 'application/json',
				data : params,
				dataType : 'json',
				success : function(response)
				{
					callback(response);
				},
				error : function(xhr, status)
				{
					Settings.showError('critical', ['failedServerResponse', 'Failed to fetch domain details. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)],200,400);
				}
			})
		}
	}
		
	new AgnityDomainDetails().fetchData(function(response){
		if(response.length != 0)
		{
			var settings = new AgnitySettingDomainUi(response, contentDom);
			settings.setupContainer();
		}
		else
		{
			var dlg = alert('info', ['emptyCasServersData', mxResources.get('casNotConfiguredError')]);
		}
	});
	
	function AgnitySaveDomainDetails(action)
	{
		this.storeData = function(domain,callback)
		{
			var body = JSON.stringify(domain);
			var queryParams = {};
			queryParams.op = action;
			queryParams.domainName = domain.name;

			var queryString = jQuery.param(queryParams);
			
			$.ajax({
				type : "POST",
				url : agnityGlobalData.serviceEndPoint + "?" + queryString,
				data : body,
				contentType : 'application/json',
				dataType : 'json',
				success : function(response)
				{
					callback(response);
				},
				error : function(xhr, status)
				{
					Settings.showFormError(xhr,150,400);
				}
			})
		}
	}
	
	function AgnityDeleteDomainDetails()
	{
		this.deleteData = function(domain,callback)
		{
			var body = JSON.stringify(domain);
			var queryParams = {};
			queryParams.op = 'deleteDomain';
			queryParams.domainName = domain.name;
			var queryString = jQuery.param(queryParams);
			
			$.ajax({
				type : "POST",
				url : agnityGlobalData.serviceEndPoint + "?" + queryString,
				data : body,
				contentType : 'application/json',
				dataType : 'json',
				success : function(response)
				{
					callback(response);
					agnityGlobalData.sendMessageToParent('RefreshDomainSwticher', {doRefresh : false} );
				},
				error : function(xhr, status)
				{
					var response = xhr.responseJSON;
					Settings.showError('critical', ['failedServerResponse', 'Failed to Delete Domain Data. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(response)],200,400);
				}
			})
		}
	}

	
	function AgnityDomainData(availableProtoList)
	{
		this.name = '';
		this.allowMultiplApps = false;
		this.status = 'ACTIVE';
		this.protocolList = availableProtoList;
	}

	function AgnitySettingDomainUi(response, contentDom)
	{
		 this.settingsContent = contentDom;
		 this.settingsHelper = new AgnityDialogHelper();
		 this.domainlist = response[1];
		 this.availableProtoList = response[0].protocolList;
		 
		 this.currVal = new AgnityDomainData([]);
		 this.currRow = -1;
		 this.listModel = null;
		 
		
		this.setupDetailPanel = function() 
		{
			var self = this;

			self.domainNameField = Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
				self.currVal.name = this.value;
			},null, false);
			this.settingsHelper.addPanelToDetailPageGrid(0, 0, self.domainNameField);

			self.supportMultipleAppField = Agnity.createCheckboxRowField(this.currVal.allowMultiplApps, 'allowMultiplApps', function() {
				self.currVal.allowMultiplApps = this.checked;
			}, false);
			this.settingsHelper.addPanelToDetailPageGrid(2, 0, self.supportMultipleAppField);
			
			this.settingsHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(['ACTIVE','INACTIVE'], this.currVal.status, 'status', function() {
				self.currVal.status = this.value;
			}, false));

			this.settingsHelper.addPanelToDetailPageGrid(0, 1, Agnity.createBSMultiSelectBox(this.availableProtoList, this.currVal.protocolList, 'protocolList', function(selection) {
				self.currVal.protocolList = selection;
				
			}),3); 
			
			
			if (this.currRow == -1) {
				this.settingsHelper.setDetailPageActions([{
					'name': 'addNew', 'func': function() {
						self.saveCurrVal(false);
					}
				}]);
			}
			else {
				this.settingsHelper.setDetailPageActions([{
					'name': 'addNew', 'func': function() {
						self.saveCurrVal(false);
					}
				}, {
					'name': 'update', 'func': function() {
						self.saveCurrVal(true);
					}
				}]);
			}
		}
		
		this.validateForm = function(isUpdate) 
		{
			var errorMsg = '';

			if(!isUpdate && this.currVal.protocolList.length  < 1)
			{
				return mxResources.get('protocolList') + " cannot be empty.";
			}
			var domainNameField = mxResources.get('name');
			errorMsg = Validator.validateField(this.currVal.name,mxResources.get('name'), 1,/[^\\/?:\"'<>|]/, domainNameField + " cannot contain any of the characters ^\\/?:\"'<>|");
			

			if(isUpdate)
			{
				if(this.dbVal.name != this.currVal.name)
				{
					return '"Domain Name" cannot be updated.';
				}
				
				if(this.dbVal.allowMultiplApps && ! this.currVal.allowMultiplApps)
				{
					return 'Enabled "Support Multiple Apps" cannot be disabled';
				}
				
				if(this.currVal.manualCreation && this.currVal.protocolList.length > 0)
				{
					return " For Manually created Domain, Protocol list should be empty..";
				}
				
				let oldProtocolListAvil = this.dbVal.protocolList.every(val => this.currVal.protocolList.includes(val));
				
				if(!oldProtocolListAvil)
				{
					return mxResources.get('protocolList') + " not reversible once added.";
				}			
			}
			
			
			return errorMsg;
		}
		
		this.saveCurrVal = function(isUpdate) 
		{
			var self = this;
			var errorMsg = this.validateForm(isUpdate);
			if(errorMsg != null && errorMsg  != '')
			{
				Settings.showError('critical',['failedValidation',errorMsg], 150, 400);
			}
			else
			{
				var domainDetail = JSON.parse(JSON.stringify(this.currVal));
				var action = 'modifyDomain';
				if(!isUpdate)
				{
					action = 'addDomain';
					domainDetail.id = 0;
					domainDetail.manualCreation = false;	
				}
				
				var doRefresh = false;
				var domainName = Agnity.getDomainName();
				
				if(domainName != null && domainName == domainDetail.name)
				{
					if(self.dbVal.protocolList.length != self.currVal.protocolList.length)
					{
						doRefresh = true;
						message = "Adding Protocols to the Domain '" + domainName + "' will cause page reload, you may lose unsaved changes."
								 + " Do you wish to continue?";

						let doProceed = confirm(message);
						if(!doProceed)
							return;
					}
				}
				

				new AgnitySaveDomainDetails(action).storeData(domainDetail,function(res){
					
					agnityGlobalData.sendMessageToParent('RefreshDomainSwticher', {doRefresh : doRefresh} );

					
					self.currVal = new AgnityDomainData([]);
					self.currRow = -1;
					self.setupDetailPanel();
					
					new AgnityDomainDetails().fetchData(function(response){
						if(response.length != 0)
						{
							self.domainlist = response[1];
							self.setupListingPanel();
						}
					});
				});
		   }
		}
		
		this.protoListFormatter = function(value)
		{
			if(value == null || value <= 0)
			{
				return "N/A";
			}
			return value;
		}
		
		this.setupListingPanel = function() 
		{	
			this.issupportMultipleApp = {true: 'Yes',false:'No'};
			this.listModel = new AgnityDialogListingModel(this.domainlist, ['name', 'status', {'head':'allowMultiplApps', 'type':'object','value': this.issupportMultipleApp},{'head':'protocolList', 'type':'html', 'formatter': this.protoListFormatter}]);

			this.settingsHelper.listActions = [['load', 'geSprite-insert'],['delete', 'geSprite-delete']];
			this.settingsHelper.setRelatedListing([{ 'name': 'name', 'width': '15%' },  { 'name': 'status', 'width': '15%' },  { 'name': 'allowMultiplApps', 'width': '15%' }, { 'name': 'protocolList', 'width': '20%' },{ 'name': 'action', 'width': '10%' }], this.listModel, this.onListAction.bind(this));
		}
		this.onListAction = function(action, row) 
		{
			var entry = this.listModel.values[row];
			this.currRow = row;

			if (action == 'load') {
				this.dbVal = JSON.parse(JSON.stringify(entry));

				this.currVal = JSON.parse(JSON.stringify(entry));
				this.setupDetailPanel();
/*				if(this.currVal.allowMultiplApps)
				{
					this.supportMultipleAppField.childNodes[1].childNodes[0].disabled = true
				}
				this.domainNameField.childNodes[1].childNodes[0].disabled = true;
*/			}
			else if (action == 'delete') {
				this.currVal = JSON.parse(JSON.stringify(entry));
				let isExecuted = confirm("Are you sure to delete domain: " + this.currVal.name + ", applications of the domain will also be deleted.");
				if(isExecuted)
				{
					var self = this;
					new AgnityDeleteDomainDetails().deleteData(this.currVal,function(res){
						self.currVal = new AgnityDomainData([]);
						self.currRow = -1;
						self.setupDetailPanel();
						
						new AgnityDomainDetails().fetchData(function(response){
							if(response.length != 0)
							{
								self.domainlist = response[1];
								self.setupListingPanel();
							}
						});
					});
				}
			}
		}
				
		this.setupContainer = function()
		{
			this.settingsHelper.setHeading('Domainlist');
			this.settingsHelper.setDetailPageGrid(3, 2);
			this.setupDetailPanel();
			this.setupListingPanel();
		
			var domainContainer = document.createElement("div");
			domainContainer.setAttribute('id','agnity_domain_page');
			
			this.settingsContent.appendChild(domainContainer);
			domainContainer.appendChild(this.settingsHelper.setupContainer());
			
			
		}	

	}	
}
