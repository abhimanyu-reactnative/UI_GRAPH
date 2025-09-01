function AgnitySettingAuditLogsTab(contentDom) {
	var auditDetails = new AgnitytGetAuditlogDetails(200);
	auditDetails.fetchData(function(response) {
		if (response.length != 0) {
			settings = new AgnityBuildAuditlogDetailsPage(response, contentDom);
			settings.setupContainer();
		}
	});
}


function AgnityBuildAuditlogDetailsPage(inAuditlogList, contentDom) {

	var self = this;
	this.settingsContent = contentDom;
	this.parentDiv = null;
	this.settingsHelper = new AgnityDialogHelper();
	this.auditloglist = inAuditlogList;
	this.searchData = new AgnitySearchData();
	this.setupContainer = function() {
		this.settingsHelper.setHeading('Auditloglist');
		this.settingsHelper.setDetailPageGrid(4, 3);		
		this.setupListingPanel();
		this.parentDiv = this.settingsHelper.setupContainer();
		this.parentDiv.classList.add('AuditLogsParent');
		this.settingsContent.appendChild(this.parentDiv);	
		this.setupTopPanel();	
		this.setupExportPanel();
	}

	this.parseJSONToCSVStr = function (jsonData) {
	    if(jsonData.length == 0) {
	        return '';
	    }
	
	    let keys = Object.keys(jsonData[0]);
	
	    let columnDelimiter = ',';
	    let lineDelimiter = '\n';
	
	    let csvColumnHeader = keys.join(columnDelimiter);
	    let csvStr = csvColumnHeader + lineDelimiter;
	
	    jsonData.forEach(item => {
	        keys.forEach((key, index) => {
	            if( (index > 0) && (index < keys.length-1) ) {
	                csvStr += columnDelimiter;
	            }
	            csvStr += item[key];
	        });
	        csvStr += lineDelimiter;
	    });
	
	    return encodeURIComponent(csvStr);
	}
	
	this.createAuditLogFields = function()
	{
		this.wrapperDiv = document.createElement('div');
		this.wrapperDiv.style.display = 'flex';
		
		this.searchButton = Agnity.createSearchButtonRowField('search',   function() { self.search(); });
		this.clearButton = Agnity.createSearchButtonRowField('clear',   function() { self.clear(); });
		this.searchBox = Agnity.createInputTextRowField(this.searchData.searchKey, 'searchKey', function() {}, null, false, 'search_placeholder');
		
		this.searchButton.style.width = 'unset';
		this.clearButton.style.width = 'unset';
		this.searchButton.classList.add('AuditLogButtons');	
		this.clearButton.classList.add('AuditLogButtons');	
		this.searchBox.classList.add('AuditLogSearch');	

		
		this.wrapperDiv.appendChild(this.searchBox);
		this.wrapperDiv.appendChild(this.searchButton);
		this.wrapperDiv.appendChild(this.clearButton);
		
		return this.wrapperDiv;
	}

	this.setupTopPanel = function() {
			this.settingsHelper.addPanelToDetailPageGrid(0, 2, this.createAuditLogFields());
	}
	
	this.setupExportPanel = function() {
	 var self = this;
	 
            var exportWrapper = $("<div class='downloadLogs'/>");
			var exportLink = $("<a href='javascript:void(0)'>Download all logs</a>");
			
			var tableDisclaimer = $("<div>Recent 200 audit logs will be displayed. Use &quot;Download all logs&quot; link to download all the logs.</div>");
			exportWrapper.append(exportLink);
			
			exportWrapper.append(tableDisclaimer);
			
			exportLink.click(function(){
				var auditdetails = new AgnitytGetAuditlogDetails(-1);
				auditdetails.fetchData(function(response) {
					jsonData = response;
			        if(jsonData.length == 0) {
				        return '';
				    }
				
				    let keys = Object.keys(jsonData[0]);
				
				    let columnDelimiter = ',';
				    let lineDelimiter = '\n';
				
				    let csvColumnHeader = mxResources.get('user') + columnDelimiter;
				    csvColumnHeader +=  mxResources.get('operation') + columnDelimiter;
				    csvColumnHeader +=  mxResources.get('domain') + columnDelimiter;
				    csvColumnHeader +=  mxResources.get('ip') + columnDelimiter;
				    csvColumnHeader +=  mxResources.get('date') + columnDelimiter;
				    csvColumnHeader +=  mxResources.get('description');
				    
				    keys.join(columnDelimiter);
				    
				    let csvStr = csvColumnHeader + lineDelimiter;
				
					jsonData.forEach(item => {
						
						var csvStrLine = item.user.loginId + columnDelimiter;
						csvStrLine += item.operation + columnDelimiter;
						if(item.domain == null)
						{
							csvStrLine += '';
						} else {
							csvStrLine += item.domain.name;
						}
						csvStrLine += columnDelimiter;
						csvStrLine +=  item.ip + columnDelimiter;
						csvStrLine +=  '\"' + Agnity.dateFormatter(item.date) + '\"' + columnDelimiter;
						csvStrLine +=  '\"' + item.description + '\"';
						
						csvStr += csvStrLine + lineDelimiter;
					});
				
				    csvStr = encodeURIComponent(csvStr);
			
				    let dataUri = 'data:text/csv;charset=utf-8,'+ csvStr;
				    
				    let exportFileDefaultName = 'auditlogs.csv';
				
				    let linkElement = document.createElement('a');
				    linkElement.setAttribute('href', dataUri);
				    linkElement.setAttribute('download', exportFileDefaultName);
				    linkElement.click();				
				
				});
			});
			
			listingPanel = $('.AgnityDialogListingPageDiv')[0]
			listingPanel.append(exportWrapper[0]);
	
	}

	this.search = function() {
		var self = this;
		searchElem = $('[name="searchKey"]')[0];
		if(searchElem == undefined || searchElem.value == undefined || searchElem.value.length == 0)
		{
			return;
		}
		console.log("Search key = " +  searchElem.value);
		if(searchElem.value != null || searchElem.value != '') {
			var auditdetails = new AgnitytSearchAuditlogDetails();
			auditdetails.fetchData(searchElem.value, function(response) {
			    console.log("Search response " + response);

 				self.auditloglist = response;
				self.setupListingPanel();
				self.setupExportPanel();
				
			});
		}
	}
	
	this.clear = function() {
		var self = this;
		searchElem = $('[name="searchKey"]')[0];
		if(searchElem == undefined || searchElem.value == undefined)
		{
			return;
		}
		searchElem.value = '';
		var auditDetails = new AgnitytGetAuditlogDetails(200);
		auditDetails.fetchData(function(response) {
			if (response.length != 0) {
				self.auditloglist = response;
				self.setupListingPanel();
				self.setupExportPanel();
			}
		});		
	}
	
	this.setupListingPanel = function() {
		this.settingsHelper.listActions = [];
		this.listModel = new AgnityDialogListingModel(this.auditloglist, [{ 'head': 'user', 'type': 'html', 'formatter': function(value) { return self.mapValue(value, 'loginId') } }, 'operation', { 'head': 'domain', 'type': 'html', 'formatter': function(value) { return self.mapValue(value, 'name') } }, 'ip' , { 'head': 'date', 'type': 'html', 'formatter': function(value) { return Agnity.dateFormatter(value) } }, 'description']);
		this.settingsHelper.setRelatedListing([{ "name": "user", "width": "10%" }, { "name": "operation", "width": "15%" }, { "name": "domain", "width": "10%" }, { "name": "ip", "width": "10%" }, { "name": "date", "width": "15%" }, { "name": "description", "width": "25%" }], this.listModel, null);
	}

	this.mapValue = function(value, field) {
		if (value == null) {
			return 'N/A';
		}
		else {
			return value[field];
		}
	}
}