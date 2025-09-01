function AgnityGetAvailableForestsHelper(diagramType, isReadonly, operationMode, domainName)
{
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAvailableForests';
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableForests. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}
function AgnityGetAllAvailableForestsHelper()
{
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAllAvailableForests';
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAllAvailableForests. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetStartNodeTree(forestName, diagramType, isReadonly, operationMode, domainName)
{	
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'getStartNodeTree';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{
				if(response.hasOwnProperty("treeName"))
					callback(response);
				else
					{
						Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetStartNodeTree.']);
					}
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to get Treename containing startnode in ' + params.forestName + 'Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetAvailableTreesHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{	
		if(this.forestName == null) return;
		
		var params = {};
		params.op = 'getAvailableTrees';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableTrees. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityCreateForest(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.createData = function(callback)
	{
		var params = {};
		params.op = 'createNewForest';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to CreateNewForest. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityCreateNewApp(appName, appId, diagramType, isReadonly, operationMode, domainName)
{
	this.appName = appName;
	this.appId = appId;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.createData = function(callback)
	{	
		var params = {};
		params.op = 'createNewApp';
		params.appName = this.appName;
		params.appId = this.appId;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		console.log(params);
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to CreateNewApplication. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetAvailableAppsHelper(diagramType, isReadonly, operationMode, domainName)
{
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAvailableApps';
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableApplication. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}
// Loading In Dropdown Policy Id, PolicyName
function AgnityGetPassPolicyHelper()
{
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getPasswordPolicyNameAndId';
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableApplication. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}


	function AgnitySaveDataPassPolicyHelper(action)
	{
		this.storeData = function(user,callback)
		{
			var body = JSON.stringify(user);
			var queryParams = {};
			queryParams.op = action;
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
					Settings.showFormError(xhr, 200, 400);
				}
			})
		}
	}



 
// GET In  all list 
function AgnityGetListofAllPassPolicyHelper()
{
	this.fetchData = function(callback)
	{
		var params = {};

		params.op = 'getListOfAllPasswordPolicy';
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableApplication. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}
// Delete data 
function AgnityDeletePassPolicyHelper()
{
	this.deleteData = function(policyId)
	{	
		var params = {};
		
		var queryParams = {};
		queryParams.op = 'deletePasswordPolicy';
		queryParams.policyId = policyId;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{

			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to deleteTree. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
};
function AgnityGetVariablesHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{	
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'getVariables';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetVariables. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetNonSmsVariablesHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'getNonSmsVariables';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetNonSmsVariables. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityAvailableCdrParams(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getCdrNodes';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableCdrParams. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetLicensedShapesHelper(diagramType, isReadonly, operationMode, domainName)
{
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getLicensedShapes';
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetLicensedShapes. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnitySaveTreeHelper(forestName, treeName, diagramType, isReadonly, operationMode, autoSaveFlag, domainName)
{	
	this.forestName = forestName;
	this.treeName = treeName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.autoSaveFlag = autoSaveFlag;
	this.domainName = domainName;
	this.storeData = function(uiXml, callback)
	{
		if(this.forestName == null || this.treeName == null || this.forestName == '' || this.treeName == '') return;
		
		var params = {};
		params.uiXml = uiXml;
		
		var queryParams = {};
		queryParams.op = 'saveTree';
		queryParams.forestName = this.forestName;
		queryParams.treeName = this.treeName;
		queryParams.diagramType = this.diagramType;
		queryParams.isReadonly = this.isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.autoSaveFlag = this.autoSaveFlag;
		queryParams.domainName = this.domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				if(callback != null && typeof callback === "function")
					callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to Save TreeInfo. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityLoadTreeHelper()
{
	this.fetchData = function(forestName, treeName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.op = 'loadTree';
		params.forestName = forestName;
		params.treeName = treeName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		
		if(!Agnity.hasLockAcquired())
			params.isReadonly = true;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to load Tree. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetAvailableTemplatesHelper(diagramType, isReadonly, operationMode, domainName)
{
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAvailableTemplates';
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to GetAvailableTemplates. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnitySaveTreeAsTemplateHelper()
{
	this.storeData = function(templateName, diagramType, isReadonly, operationMode, uiXml, domainName)
	{
		var params = {};
		params.uiXml = uiXml;
		
		var queryParams = {};
		queryParams.op = 'saveTreeAsTemplate';
		queryParams.templateName = templateName;
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to save the Template. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityCreateTreeFromTemplateHelper()
{
	this.fetchData = function(templateName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.op = 'createTreeFromTemplate';
		params.templateName = templateName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to CreateTreeFromTemplate. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetSMSVariableHelper(forestName, smsDataType, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.smsDataType = smsDataType;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'getSMSVariables';
		params.forestName = this.forestName;
		params.smsDataType = smsDataType;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to GetSMSVariables. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetAvailableNodesHelper(forestName, treeName, diagramType, isReadonly, operationMode, domainName)
{
	this.treeName = treeName;
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		if(this.treeName == null || this.treeName == '') return;
		
		var params = {};
		params.op = 'getAvailableNodes';
		params.forestName = this.forestName;
		params.treeName = this.treeName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to GetAvailableNodes. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetServiceXmlHelper()
{
	this.fetchData = function(uiXml, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.uiXml = uiXml;
		
		var queryParams = {};
		queryParams.op = 'getServiceXml';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type: 'POST',
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to GetServiceXml. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityOpenServiceXmlHelper()
{
	this.fetchData = function(serviceXml, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.serviceXml = serviceXml;
		
		var queryParams = {};
		queryParams.op = 'openServiceXml';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		console.log(JSON.stringify(params));
		$.ajax({
			type: 'POST',
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to OpenServiceXml. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityDeleteForestHelper()
{
	this.deleteData = function(forestName, diagramType, isReadonly, operationMode, domainName, callback)
	{	
		var params = {};
		
		var queryParams = {};
		queryParams.op = 'deleteForest';
		queryParams.forestName = forestName;
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{
				if(callback != null && typeof callback === 'function')
					callback();
				//alert(forestName + ' has been deleted successfully');
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to deleteForest. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityDeleteTreeHelper()
{
	this.deleteData = function(forestName, treeName, diagramType, isReadonly, operationMode, domainName)
	{	
		var params = {};
		
		var queryParams = {};
		queryParams.op = 'deleteTree';
		queryParams.forestName = forestName;
		queryParams.treeName = treeName;
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{

			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to deleteTree. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
};

function AgnityImportUiXmlHelper()
{
	this.fetchData = function(uiXml, importedXml, diagramType, isReadonly, operationMode, domainName, callback)
	{	
		var params = {};
		params.uiXml = uiXml;
		params.importedXml = importedXml;
		
		var queryParams = {};
		queryParams.op = 'importUiXml';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type: 'POST',
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to ImportUiXml. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityTreeValidationHelper()
{
	this.fetchData = function(uiXml, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.uiXml = uiXml;
		
		var queryParams = {};
		queryParams.op = 'validateUiXml';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type: 'POST',
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to VaildateUiXml. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityComponentValidationHelper()
{
	this.fetchData = function(componentXml, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.componentXml = componentXml;
		
		var queryParams = {};
		queryParams.op = 'validateComponentXml';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type: 'POST',
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to VaildateUiXml. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetMappingDataHelper()
{
	this.fetchData = function(diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.op = 'getMappingData';
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to GetMappingData. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetAllowedCustomOperationsHelper(forestName, treeName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.treeName = treeName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAllowedOperations';
		params.forestName = this.forestName;
		params.treeName = this.treeName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to get allowed custom operation. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityExecuteCustomOperation(forestName, treeName, operationAction, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.treeName = treeName;
	this.operationAction = operationAction;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.executeCustomOperation = function(callback)
	{
		var params = {};
		params.op = 'executeOperation';
		params.forestName = this.forestName;
		params.treeName = this.treeName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationAction = this.operationAction;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to execute custom operation. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetDebuggingInfoHelper()
{
	this.getDebugEnableStatus = function (callback, errorCallback)
	{
		var queryParams = {};
		queryParams.op = 'debugEnableStatus';
		
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : queryParams,
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				errorCallBack();
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to poll new debugger files. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
		
	}
}

function AgnityGetFilteredPatternsHelper(forestName, diagramType, searchString, patternType, isReadonly, operationMode, domainName)
{	
	this.forestName = forestName;
	this.searchString = searchString;
	this.patternType = patternType;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'getFilteredPatterns';
		params.forestName = this.forestName;
		params.searchString = this.searchString;
		params.patternType = this.patternType;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetPatterns. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetAvailableFunctionBlocksHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.fetchData = function(callback)
	{
		if(this.forestName == null) return;
		
		var params = {};
		params.op = 'getAvailableFunctionBlocks';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch getAvailableFunctionBlocks. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnitySaveFunctionBlockHelper(forestName, functionBlockName, diagramType, isReadonly, operationMode, autoSaveFlag, domainName)
{
	if(functionBlockName == null)
	{
		functionBlockName = forestName;
	}

	this.forestName = forestName;
	this.functionBlockName = functionBlockName;	
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.autoSaveFlag = autoSaveFlag;
	this.domainName = domainName;
	this.storeData = function(componentXml, callback)
	{
		if(this.forestName == null || this.functionBlockName == null || this.forestName == '' || this.functionBlockName == '') return;
		
		var params = {};
		params.componentXml = componentXml;
		
		var queryParams = {};
		queryParams.op = 'saveFunctionBlock';
		queryParams.forestName = this.forestName;
		queryParams.functionBlockName = this.functionBlockName;
		queryParams.diagramType = this.diagramType;
		queryParams.isReadonly = this.isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.autoSaveFlag = this.autoSaveFlag; 
		queryParams.domainName = this.domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response) 
			{
				if(callback != null && typeof callback === "function")
					callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to Save FunctionBlockInfo. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnitySaveFunctionBlockAsTemplate()
{
	this.storeData = function(forestName, functionBlockName, templateName, diagramType, isReadonly, operationMode, domainName)
	{
		var params = {};
		params.op = 'saveFunctionBlockAsTemplate';
		params.forestName = forestName;
		params.functionBlockName = functionBlockName;
		params.templateName = templateName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;

		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to save the Template. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityLoadFunctionBlockHelper()
{
	this.fetchData = function(forestName, functionBlockName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.op = 'loadFunctionBlock';
		params.forestName = forestName;
		params.functionBlockName = functionBlockName; 
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		
		if(! Agnity.hasLockAcquired())
			params.isReadonly = true;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to load Tree. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityCreateFunctionBlockFromTemplateHelper()
{
	this.fetchData = function(forestName, templateName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.op = 'createFunctionBlockFromTemplate';
		params.forestName = forestName;
		params.templateName = templateName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
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
			error : function()
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to CreateTreeFromTemplate. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityDeleteFunctionBlockHelper()
{
	this.deleteData = function(forestName, functionBlockName, diagramType, isReadonly, operationMode, domainName)
	{	
		var params = {};
		params.op = 'deleteFunctionBlock';
		params.forestName = forestName;
		params.functionBlockName = functionBlockName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{

			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to delete functionBlock. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityDeleteFunctionBlockTemplate()
{
	this.deleteData = function(templateName, diagramType, isReadonly, operationMode, domainName)
	{
		var params = {};
		params.op = 'deleteFunctionBlockTemplate';
		params.templateName = templateName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{

			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to delete template. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
		
	}
}

function AgnityDeleteTreeTemplate()
{
	this.deleteData = function(templateName, diagramType, isReadonly, operationMode, domainName)
	{
		var params = {};
		params.op = 'deleteTreeTemplate';
		params.templateName = templateName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{

			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to delete template. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityCreateFunctionBlock(forestName, functionBlockName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.functionBlockName = functionBlockName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.createData = function(callback)
	{
		var params = {};
		params.op = 'createNewFunctionBlock';
		params.forestName = this.forestName;
		params.functionBlockName = this.functionBlockName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to CreateNewFunctionBlock. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityCreateTree(forestName, treeName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.treeName = treeName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.createData = function(callback)
	{
		var params = {};
		params.op = 'createNewTree';
		params.forestName = this.forestName;
		params.treeName = this.treeName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to CreateNewTree. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGetReferencedNodesHelper()
{
	this.fetchData = function(forestName, functionBlockName, nodeId, diagramType, isReadonly, operationMode, domainName, callback)
	{
		if(forestName == null || forestName == '' ||
		   functionBlockName == null || functionBlockName == '') return;
		
		var params = {};
		params.op = 'getReferencedNodes';
		params.forestName = forestName;
		params.functionBlockName = functionBlockName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.nodeId = nodeId;
		params.domainName = domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to Get ReferencedNodesInfo. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetForestFunctionBlocks()
{
	this.fetchData = function(forestName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		if(forestName == null || forestName == '') return;
		
		var params = {};
		params.op = 'getForestFunctionBlocks';
		params.forestName = forestName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to Get ForestFunctionBlocksInfo. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityCreateProcess(processName, diagramType, isReadonly, operationMode, domainName)
{
	this.processName = processName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.createData = function(callback)
	{
		var params = {};
		params.op = 'createNewProcess';
		params.processName = this.processName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to CreateNewProcess. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		
		})
	}
}

function AgnityLoadProcessHelper()
{
	this.fetchData = function(processName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var params = {};
		params.op = 'loadProcess';
		params.processName = processName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		
		if(!Agnity.hasLockAcquired())
		{
			params.isReadonly = true;
		}
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to load Process. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetAvailableProcessHelper(diagramType, isReadonly, operationMode, domainName)
{
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'getAvailableProcesses';
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch available processes. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnitySaveProcessHelper(processName, diagramType, isReadonly, operationMode, autoSaveFlag, domainName)
{
	this.processName = processName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.autoSaveFlag = autoSaveFlag;
	this.domainName = domainName;
	this.storeData = function(uiXml, callback)
	{
		if(this.processName == null || this.processName == '') return;
		
		var params = {};
		params.uiXml = uiXml;
		
		var queryParams = {};
		queryParams.op = 'saveProcess';
		queryParams.processName = this.processName;
		queryParams.diagramType = this.diagramType;
		queryParams.isReadonly = this.isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.autoSaveFlag = this.autoSaveFlag; 
		queryParams.domainName = this.domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to Save ProcessNameInfo. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityDeleteProcessHelper()
{
	this.deleteData = function(processName, diagramType, isReadonly, operationMode, domainName)
	{
		var params = {};
		
		var queryParams = {};
		queryParams.op = 'deleteProcess';
		queryParams.processName = processName;
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to delete Process. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetProcessVariablesHelper(processName, diagramType, isReadonly, operationMode, domainName)
{
	this.processName = processName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getProcessVariables';
		params.processName = this.processName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetProcessVariables. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetAvailableCASServersHelper(domainName, operationMode, diagramType, isReadonly, dontShowError=false)
{
	this.domainName = domainName;
	this.operationMode = operationMode;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAvailableCASServers';
		params.domainName = this.domainName;
		params.operationMode = this.operationMode;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		
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
				if(dontShowError) {
					callback({err : 'Failed to fetch GetAvailableCAS. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)}, true);
				} else {
					Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableCAS. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
				}
			}
		})

	}
}

function AgnityGetAvailableCASServersGroupHelper(domainName, operationMode, diagramType, isReadonly)
{
	this.domainName = domainName;
	this.operationMode = operationMode;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;

	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAvailableCASServersGroup';
		params.domainName = this.domainName;
		params.operationMode = this.operationMode;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;

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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableCAS. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})

	}
}

function AgnitySaveCASServersHelper(domainName, operationMode, diagramType, isReadonly)
{
	this.domainName = domainName;
	this.operationMode = operationMode;
	this.diagramType = diagramType;
	this.isReadOnly = isReadonly;
	
	this.storeData = function(casData, callback)
	{
		var params = {};
		params.casData = casData;
		
		var queryParams = {};
		queryParams.op = 'saveCASServers';
		queryParams.diagramType = this.diagramType;
		queryParams.isReadonly = this.isReadonly;
		queryParams.operationMode = this.operationMode; 
		queryParams.domainName = this.domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				//callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to SaveCASServersData. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}
function AgnitySaveUserDetails(action)
{
	this.storeData = function(user,callback)
	{
		var params = {};
		params.user = user;
		
		var body = JSON.stringify(params);
		var queryParams = {};
		queryParams.op = action;
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
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}

function AgnityUnlockUser()
{
	this.unlockUser = function(user,callback)
	{
		var params = {};
		params.userId = user;
	
		var queryParams = {};
		queryParams.op = 'unlockUser';
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data: JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}
function AgnityUpdateUserPassword()
{
	this.storeData = function(oldpassword, password, callback,errorCallback)
	{
		var params = {};
		params.oldpassword = oldpassword;
		params.password = password;
		
		var queryParams = {};
		queryParams.op = 'changePassword';
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			data : JSON.stringify(params),
			contentType : 'application/json',
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				errorCallback(xhr);
//				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to Save User Data. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityDeleteUserDetails()
{
	this.deleteData = function(id,callback)
	{
		var params = {}
		params.id = id;
		
		var queryParams = {};
		queryParams.op = 'deleteUser';
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data: JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}
function AgnityDeletePolicyDetails()
{
	this.deleteData = function(policyId,callback)
	{
		var params = {}
		params.policyId = policyId;
		
		var queryParams = {};
		queryParams.op = 'deletePasswordPolicy';
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data: JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}

function AgnityGetUserDetails()
{
	this.fetchData = function(callback)
	{		
		var params = {};
		params.op = 'getUsers';
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
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}
function AgnityGetPassPolicyDetails()
{
	this.fetchData = function(callback)
	{		
		var params = {};
		params.op = 'getListOfAllPasswordPolicy';
		
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
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}
function AgnitytGetAuditlogDetails(size)
{	
	this.fetchData = function(callback)
	{		
		var params = {};
		params.op = 'getAuditlogs';
		params.size = size;
		
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
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}


function AgnitytSearchAuditlogDetails()
{	
	this.fetchData = function(searchKey, callback)
	{		
		var params = {};
		params.op='searchAuditlogs';
		params.searchKey = searchKey
		var queryString = jQuery.param(params);
		console.log(queryString);
		
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
}

function AgnityGetCurrentVersionDetails()
{
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'getCurrentVersion';
		
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint + "/login",
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				console.log(xhr);
			}
		})
	}
}
function AgnityCheckLoginStatus()
{
	this.fetchData = function(callback)
	{	
		var params = {};
		params.op = 'checkLoginStatus';
		
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
				var path = document.location.pathname.split('/');
		    	if(xhr.responseJSON.errorMessage != 'Password change needed' && path[path.length-1] != 'Login.html')
		    	{
		    		Agnity.doRedirect('./Login.html');
		    	}
		    	if(xhr.responseJSON.errorMessage == 'Password change needed' && path[path.length-1] != 'ChangePassword.html')
		    	{
		    		Agnity.doRedirect('./ChangePassword.html');
		    	}
			}
		})
	}
}
function AgnityLogout()
{
	this.doLogout = function(session, callback)
	{
		var params = {};
		params.sessionId = session;
		
		var queryParams = {};
		queryParams.op = 'logout';
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showFormError(xhr);
			}
		})
	}
}
function AgnityLogin()
{
	this.doLogin = function(id, password, callback,errorCallback)
	{
		var params = {};
		params.loginId = id;
		params.password = password;
		
		var queryParams = {};
		queryParams.op = 'login';
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "/login" + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				errorCallback(xhr);
			}
		})
	}
}

function AgnitySaveAccessedContext()
{
	this.storeData = function(forestName, domainName, callback)
	{
		var params = {}
		params.domainName = domainName;
		params.forestName = forestName;
		
		var queryParams = {};
		queryParams.op = 'saveAccessedContext';
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + '?' +queryString,
			contentType : 'application/json',
			data :  JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				console.log("ERROR SAVING LAST ACCESSED DOMAIN");
			}
		});
		
	}
}

function AgnityGetLastAccessedContext()
{
	this.fetchData = function(callback)
	{
		var params = {}
		params.op = 'getLastAccessedContext';
		
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
				console.log("ERROR GETTING LAST ACCESSED DOMAIN");
			}
		});
		
	}
}

function AgnityGetAllLocks(forestName, diagramType, diagramName, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.diagramName = diagramName;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {}
		params.op = 'getAllLockInfo';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.diagramName = this.diagramName;
		params.domainName = this.domainName;

		var queryString = jQuery.param(params);
		
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint + '?' + queryString,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showFormError(xhr);
			}
		});
	}
}

function AgnityLockObject(forestName, diagramType, diagramName, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.diagramName = diagramName;
	this.domainName = domainName;

	this.doLock = function(callback)
	{
		var params = {}
		params.op = 'lockObject';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.diagramName = this.diagramName;
		params.domainName = this.domainName;

		var queryString = jQuery.param(params);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showFormError(xhr);
			}
		});
	}
}

function AgnityUnLockObject(forestName, diagramType, diagramName, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.diagramName = diagramName;
	this.domainName = domainName;
	
	this.unlockObject = function(forceUnlock, callback)
	{
		var params = {}
		params.op = 'unlockObject';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		if(diagramName)
			params.diagramName = this.diagramName;
		params.domainName = this.domainName;
		params.forceUnlock = forceUnlock;
		
		var queryString = jQuery.param(params);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showFormError(xhr);
			}
		});
	}
}
function GetCurrentLockStatus(forestName, diagramType, diagramName, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.diagramName = diagramName;
	this.domainName = domainName;
	
	this.getLockStatus = function(callback)
	{
		var params = {};
		params.op = 'getObjectLockStatus';
		if(this.forestName)
			params.forestName = this.forestName;
		if(this.diagramName)
			params.diagramName = this.diagramName;
		params.diagramType = this.diagramType;
		params.domainName = this.domainName;

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
				Agnity.showFormError(xhr);
			}
		});
	}
	this.getLockInfo = function(callback)
	{
		var params = {};
		params.op = 'getAllLocks';
		if(this.forestName)
			params.forestName = this.forestName;
		if(this.diagramName)
			params.diagramName = this.diagramName;
		params.diagramType = this.diagramType;
		params.domainName = this.domainName;
		
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
				Agnity.showFormError(xhr);
			}
		});
	}
}

function AgnityGetCASApplicationsHelper(casName, domainName, operationMode, diagramType, isReadonly, dontShowError=false)
{
	this.casName = casName;
	this.domainName = domainName;
	this.operationMode = operationMode;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getCASApplications';
		params.casName = this.casName;
		params.domainName = this.domainName;
		params.operationMode = this.operationMode;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		
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
				if(dontShowError) {
					callback({
						err : 'Failed to GetCASApplications. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)
					}, true)
 				} else {
					Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to GetCASApplications. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
				}
			}
		})
	}
}

function AgnityExecuteCASApplicationAction(casName, application, action, isReadonly, diagramType, operationMode, domainName, dontShowError=false)
{
	this.casName = casName;
	this.application = application;
	this.action = action;
	this.isReadonly = isReadonly;
	this.diagramType = diagramType;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.executeAction = function(callback)
	{
		var params = {};
		params.op = 'executeCASApplicationAction';
		params.casName = this.casName;
		params.application = this.application;
		params.action = this.action;
		params.isReadonly = this.isReadonly;
		params.diagramType = this.diagramType;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
		
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
				if(dontShowError) {
					callback({
						err : 'Failed to executeCASApplicationAction. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)
					}, true)
				}
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to executeCASApplicationAction. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityDeployCASApplication(casName, forestName, priority, isReadonly, diagramType, operationMode, domainName, serverDetails = null, dontShowError=false)
{
	this.casName = casName;
	this.forestName = forestName;
	this.priority = priority;
	this.isReadonly = isReadonly;
	this.diagramType = diagramType;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.deployApplication = function(callback)
	{
		var params = {};
		params.op = 'deployCASApplication';
		params.casName = this.casName;
		params.forestName = this.forestName;
		params.priority = this.priority;
		params.isReadonly = this.isReadonly;
		params.diagramType = this.diagramType;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : params,
			dataType : 'json',
			success : function(response)
			{
				callback(response, serverDetails);
			},
			error : function(xhr, status)
			{
				if(dontShowError) {
					callback({
						err : 'Failed to DeployCASApplication. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)
					}, true)
				} else {
					Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to DeployCASApplication. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
				}
			}
		})
	}
}

function AgnityGetAvailablePackagedApplicationsHelper(diagramType, isReadonly, operationMode, domainName, dontShowError=false)
{
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAvailablePackagedApplications';
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				if(dontShowError) {
					callback(
						{err: 'Failed to getAvailablePackagedApplications. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)},
						true
					)
					return;
				}
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to getAvailablePackagedApplications. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityDebuggerFilesHelper(operationMode)
{
	this.operationMode = operationMode;
	
	
	this.fetchGlobalData = function(operation, callback)
	{
		var params = {};
		params.op = operation;// getAllAvailableDebuggerFiles'getAvailableDebuggerFilesByApp';
		params.operationMode = this.operationMode;
		
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
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
	
	this.fetchData = function(operation, forestName, domainName, callback)
	{
		var params = {};
		params.op = operation;// getAllAvailableDebuggerFiles'getAvailableDebuggerFilesByApp';
		params.forestName = forestName;
		params.operationMode = this.operationMode;
		params.domainName = domainName;
		params.diagramType = 'tree';
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to getDebuggerFiles. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
	
	this.deleteFiles = function(files, callback)
	{
		var params = {};
		params.op = 'deleteAvailableDebuggerFiles';
		params.operationMode = this.operationMode;
		params.diagramType = 'tree';
		var payload = {}
		payload.debuggerFiles = files;
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + jQuery.param(params),
			contentType : 'application/json',
			data : JSON.stringify(payload),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Settings.showFormError(xhr, 200, 400);
			}
		})
	}
	
	this.loadFile = function(payload, payloadMeta,  diagramType, isReadonly, domainName, callback)
	{
		var params = {};
		if( payloadMeta == 'filecontent')
		{
			params.debugInfo = payload;
		}
		else
		{
			params.debugFileInfo = payload;
		}
		
		var queryParams = {};
		queryParams.op = 'getDebuggingInfo';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = domainName;
		var queryString = jQuery.param(queryParams);
		
		console.log(JSON.stringify(params));
		$.ajax({
			type: 'POST',
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to GetDebuggingInfo. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
	
	
	this.pollNewFile = function(forestName, diagramType,isReadonly, domainName,callback, errorCallback)
	{
		var queryParams = {};
		queryParams.op = 'pollNewFilesFromCAS';
		queryParams.forestName = forestName;
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = domainName;
		
		$.ajax({
			type : "GET",
			url : agnityGlobalData.serviceEndPoint,
			contentType : 'application/json',
			data : queryParams,
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				errorCallback();
				callback(null);
				Agnity.showFormError(xhr);
				//Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to poll new debugger files. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityCASApplicationDebugHelper()
{

	this.enableDebug = function(appId, casName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var queryParams = {};
		queryParams.op = 'enableDebugApplicationOnCAS';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		
		var payload = {};
		payload.appId = appId;
		payload.casName = casName;
		payload.isEnable = true;
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?"+ jQuery.param(queryParams),
			contentType : 'application/json',
			data : JSON.stringify(payload),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showFormError(xhr);
			}
		})
	};
	
	this.disableDebug = function(appId, casName, diagramType, isReadonly, operationMode, domainName, callback)
	{
		var queryParams = {};
		queryParams.op = 'disableDebugApplicationOnCAS';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		
		var payload = {};
		payload.appId = appId;
		payload.casName = casName;
		payload.isEnable = false;
		
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?"+ jQuery.param(queryParams),
			contentType : 'application/json',
			data : JSON.stringify(payload),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to disable debug on CAS server. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	};

}

function AgnityCreateApplicationPackageHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.applicationPackage = function(callback)
	{
		var params = {};
		params.op = 'createApplicationPackage';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to createApplicationPackage. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityDownloadApplicationPackage(forestName, isReadonly, diagramType, operationMode, domainName, dontShowError=false)
{
	this.forestName = forestName;
	this.isReadonly = isReadonly;
	this.diagramType = diagramType;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.downloadApplication = function(callback)
	{
		var params = {};
		params.op = 'downloadApplicationPackage';
		params.forestName = this.forestName;
		params.isReadonly = this.isReadonly;
		params.diagramType = this.diagramType;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				if(dontShowError) {
					callback({
						err : 'Failed to downloadApplicationPackage. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)
					},true)
				} else {
					Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to downloadApplicationPackage. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
				}
			}
		})
		
	}
}

function AgnityGetAvailableAppRoutersHelper(forestName, isReadonly, diagramType, operationMode, domainName)
{
	this.forestName = forestName;
	this.isReadonly = isReadonly;
	this.diagramType = diagramType;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getAvailableAppRouters';
		params.forestName = this.forestName;
		params.isReadonly = this.isReadonly;
		params.diagramType = this.diagramType;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetAvailableAppRouters. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
		
	}
}

function AgnitySaveAppRoutersHelper(forestName, isReadonly, diagramType, operationMode, domainName)
{
	this.forestName = forestName;
	this.isReadonly = isReadonly;
	this.diagramType = diagramType;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.storeData = function(appRouters, callback)
	{
		var params = {};
		params.appRouters = appRouters;
		
		var queryParams = {};
		queryParams.op = 'saveAppRouters';
		queryParams.forestName = this.forestName;
		queryParams.isReadonly = this.isReadonly;
		queryParams.diagramType = this.diagramType;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = this.domainName;
		
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				//callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to SaveAppRoutersData. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnitySaveForestDBSchemaHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName; 
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.storeData = function(schemaContent, callback)
	{
		if(schemaContent == null) return;
		
		var params = {};
		params.schemaContent = schemaContent;
		
		var queryParams = {};
		queryParams.op = 'saveForestDBSchema';
		queryParams.forestName = this.forestName;
		queryParams.diagramType = this.diagramType;
		queryParams.isReadonly = this.isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = this.domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				//callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to SaveDbSchema. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetForestDBSchemaHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName; 
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getForestDBSchema';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;

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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetForestDBSchema. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnitySetApplicationRoutingRuleHelper(application, casName, diagramType, isReadonly, operationMode, domainName)
{
	this.application = application;
	this.casName = casName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'setApplicationRoutingRule';
		params.application = this.application;
		params.casName = this.casName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to set ApplicationRoutingRule. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetApplicationDBConfigHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getApplicationDBConfig';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to get ApplicationDBConfig. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnitySetApplicationDBConfigHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.storeData = function(dbSchemaConfig)
	{
		var params = {};
		params.dbSchemaConfig = dbSchemaConfig;
		
		var queryParams = {};
		queryParams.op = 'saveApplicationDBConfig';
		queryParams.forestName = this.forestName;
		queryParams.isReadonly = this.isReadonly;
		queryParams.diagramType = this.diagramType;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = this.domainName;
		
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				//callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to SaveDbSchemaConfig. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnitySaveDBSchemaHelper(forestName, diagramType, isReadonly, operationMode, autoSaveFlag, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.autoSaveFlag = autoSaveFlag;
	this.domainName = domainName;
	
	this.storeData = function(uiXml, callback)
	{
		var params = {};
		params.uiXml = uiXml;
		
		var queryParams = {};
		queryParams.op = 'saveDBSchema';
		queryParams.forestName = this.forestName;
		queryParams.isReadonly = this.isReadonly;
		queryParams.diagramType = this.diagramType;
		queryParams.operationMode = this.operationMode;
		queryParams.autoSaveFlag = this.autoSaveFlag;
		queryParams.domainName = this.domainName;
		
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				//callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to SaveDbSchemaConfig. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityLoadDBSchemaHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'loadDBSchema';
		params.forestName = forestName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
		
		if(!Agnity.hasLockAcquired())
			params.isReadonly = true;
			
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to load DB Schema. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityLoadApplicationSchemaHelper(forestName, diagramType, isReadonly, operationMode, domainName, dbType)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.dbType = dbType;
	
	this.loadSchema = function(callback)
	{
		var params = {};
		params.op = 'loadApplicationSchema';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;
		params.dbType = this.dbType;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to load DB Schema. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnitySaveUserDefinedDBSchemaHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName; 
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.storeData = function(userDefinedDBSchema, callback)
	{
		if(userDefinedDBSchema == null) return;
		
		var params = {};
		params.userDefinedDBSchema = userDefinedDBSchema;
		
		var queryParams = {};
		queryParams.op = 'saveUserDefinedDBSchema';
		queryParams.forestName = this.forestName;
		queryParams.diagramType = this.diagramType;
		queryParams.isReadonly = this.isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = this.domainName;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				//callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to SaveDbSchema. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetUserDefinedDBSchemaHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName; 
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'getUserDefinedDBSchema';
		params.forestName = this.forestName;
		params.diagramType = this.diagramType;
		params.isReadonly = this.isReadonly;
		params.operationMode = this.operationMode;
		params.domainName = this.domainName;

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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to fetch GetForestDBSchema. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityDownloadDBSchemaHelper(forestName, diagramType, isReadonly, operationMode, domainName)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	
	this.fetchData = function(callback)
	{
		var params = {};
		params.op = 'downloadDBSchema';
		params.forestName = forestName;
		params.diagramType = diagramType;
		params.isReadonly = isReadonly;
		params.operationMode = operationMode;
		params.domainName = domainName;
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
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to load DB Schema. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityDbSchemaValidationHelper()
{
	this.fetchData = function(uiXml, diagramType, isReadonly, operationMode, domainName, dbType, callback)
	{
		var params = {};
		params.uiXml = uiXml;
		
		var queryParams = {};
		queryParams.op = 'validateDbUiXml';
		queryParams.diagramType = diagramType;
		queryParams.isReadonly = isReadonly;
		queryParams.operationMode = operationMode;
		queryParams.domainName = domainName;
		queryParams.dbType = dbType;
		var queryString = jQuery.param(queryParams);
		
		$.ajax({
			type: 'POST',
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to VaildateUiXml. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		});
	}
}

function AgnityGenerateApiCodeHelper(forestName, diagramType, isReadonly, operationMode, domainName, apiVersion, uiXml)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.uiXml = uiXml;
	this.apiVersion = apiVersion;
	
	this.generateCode = function(callback)
	{
		var queryParams = {};
		queryParams.op = 'generateApiCode';
		queryParams.forestName = this.forestName;
		queryParams.isReadonly = this.isReadonly;
		queryParams.diagramType = this.diagramType;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = this.domainName;
		
		var queryString = jQuery.param(queryParams);
		
		var params = {};
		params.uiXml = this.uiXml;	
		params.apiVersion = this.apiVersion;
				
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + '?' + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to generateApiCode. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetDefinedTuiKeyHelper(forestName, diagramType, isReadonly, operationMode, domainName, tuiNodeData)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	this.domainName = domainName;
	this.tuiNodeData = tuiNodeData;
	
	this.fetchData = function(callback)
	{
		var queryParams = {};
		queryParams.op = 'getTuiDefinedKey';
		queryParams.forestName = this.forestName;
		queryParams.isReadonly = this.isReadonly;
		queryParams.diagramType = this.diagramType;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = this.domainName;
		
		var queryString = jQuery.param(queryParams);
		
		var params = {};
		params.tuiJson = this.tuiNodeData.tuiJson;	
				
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + '?' + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to getDefinedTuiKeys. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnityGetAvpListOnAvpWritersHelper(forestName, diagramType, isReadonly, operationMode, uiXml)
{
	this.forestName = forestName;
	this.diagramType = diagramType;
	this.isReadonly = isReadonly;
	this.operationMode = operationMode;
	
	this.fetchData = function(callback)
	{
		var queryParams = {};
		queryParams.op = 'getAvpListOnAvpWriters';
		queryParams.forestName = this.forestName;
		queryParams.isReadonly = this.isReadonly;
		queryParams.diagramType = this.diagramType;
		queryParams.operationMode = this.operationMode;
		
		var queryString = jQuery.param(queryParams);
		
		var params = {};
		params.uiXml = uiXml;	
				
		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + '?' + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to getAvpList. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}

function AgnitySaveCASServersGroupHelper(domainName, operationMode, diagramType, isReadonly)
{
	this.domainName = domainName;
	this.operationMode = operationMode;
	this.diagramType = diagramType;
	this.isReadOnly = isReadonly;

	this.storeData = function(casData, callback)
	{
		var params = {};
		params.casGroup = casData;

		var queryParams = {};
		queryParams.op = 'saveCASServersGroup';
		queryParams.diagramType = this.diagramType;
		queryParams.isReadonly = this.isReadonly;
		queryParams.operationMode = this.operationMode;
		queryParams.domainName = this.domainName;
		var queryString = jQuery.param(queryParams);

		$.ajax({
			type : "POST",
			url : agnityGlobalData.serviceEndPoint + "?" + queryString,
			contentType : 'application/json',
			data : JSON.stringify(params),
			dataType : 'json',
			success : function(response)
			{
				if (callback) callback(response);
			},
			error : function(xhr, status)
			{
				Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to SaveCASServersData. Status: ' + JSON.stringify(status) + ' moreInfo:' + JSON.stringify(xhr)]);
			}
		})
	}
}