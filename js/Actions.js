/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Constructs the actions object for the given UI.
 */
function Actions(editorUi)
{
	this.autoSaveXml = '';
	
	this.editorUi = editorUi;
	this.actions = new Object();
	this.init();
};

/**
 * Adds the default actions.
 */
Actions.prototype.init = function()
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var self = this;
	
	var isGraphEnabled = function()
	{
		return Action.prototype.isEnabled.apply(this, arguments) && graph.isEnabled();
	};
	
	var isGraphReadonly = function()
	{
		return false;
	}

	// File actions
	this.addAction('newTree', function() 
	{
		var forestName = Agnity.getUrlParam('forestName');
		if(agnityGlobalData.tabId == null)
			window.open('TreeViewer.html?diagram=tree');
		else
			agnityGlobalData.sendMessageToParent('new', {'diagramType' : 'tree', 'forestName' : forestName});
	}, null, null, 'ALT+N').isEnabled = isGraphEnabled;
	
	this.addAction('newComponent', function()
    {
		//New component
		var forestName = Agnity.getUrlParam('forestName');
		if(agnityGlobalData.tabId == null)
			window.open('TreeViewer.html?diagram=component');
		else
			agnityGlobalData.sendMessageToParent('new', {'diagramType' : 'component', 'additionalParam' : 'forceNew=1', 'forestName' : forestName});
    }, null, null, null);
	
	this.addAction('newProcess', function()
    {
		//new Process
		var forestName = Agnity.getUrlParam('forestName');
		if(agnityGlobalData.tabId == null)
			window.open('TreeViewer.html?diagram=process');
		else
			agnityGlobalData.sendMessageToParent('new', {'diagramType' : 'process', 'additionalParam' : 'forceNew=1', 'forestName' : forestName});
    }, null, null, null);
	
	this.addAction('openComponent', function()
    {
		//open component
		window.openNew = false;
		window.openKey = 'open';
		
		window.openFile = new OpenFile(mxUtils.bind(this, function()
		                                    		{
		                                    			ui.hideDialog();
		                                    		}));
		
		window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
                 		{
                 			try
                 			{
                 				var doc = mxUtils.parseXml(xml);
                 				ui.editor.setGraphXml(doc.documentElement);
                 				agnityGlobalData.resetData();
                 				agnityGlobalData.prevSelectedCellData = Agnity.getComponentData(ui);
                 				if(agnityGlobalData.tabId != null)
                 					agnityGlobalData.sendMessageToParent('setName', {'name': agnityGlobalData.prevSelectedCellData.componentName, 'forestName': agnityGlobalData.prevSelectedCellData.forestName, 'diagramType' : 'component'});

     				            ui.editor.graph.setSelectionCell(ui.editor.graph.getModel().getCell(0));
                 			}
                 			catch (e)
                 			{
                 				mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
                 			}
                 		}));
		
		ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
			      		{
			      			window.openFile = null;
			      		});
    }, null, null, null).isEnabled = isGraphEnabled;
	
	this.addAction('openProcess', function()
    {
		window.openNew = false;
		window.openKey = 'open';
		
		window.openFile = new OpenFile(mxUtils.bind(this, function()
		                                    		{
		                                    			ui.hideDialog();
		                                    		}));
		window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
		                                 		{
		                                 			try
		                                 			{
		                                 				var doc = mxUtils.parseXml(xml);
		                                 				ui.editor.setGraphXml(doc.documentElement);
		                                 				agnityGlobalData.resetData();
		                                 				agnityGlobalData.prevSelectedCellData = Agnity.getTreeData(ui);
		                                 				if(agnityGlobalData.tabId != null)
		                                 					agnityGlobalData.sendMessageToParent('setName', {'name': agnityGlobalData.prevSelectedCellData.treeName, 'forestName': agnityGlobalData.prevSelectedCellData.forestName, 'diagramType' : 'process'});

		                     				            ui.editor.graph.setSelectionCell(ui.editor.graph.getModel().getCell(0));
		                                 			}
		                                 			catch (e)
		                                 			{
		                                 				mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
		                                 			}
		                                 		}));
		
		ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
		      		{
		      			window.openFile = null;
		      		});
    }, null, null, 'ALT+O').isEnabled = isGraphEnabled;
		
	this.addAction('openTree', function()
	{
		window.openNew = false;
		window.openKey = 'open';
		
		window.openFile = new OpenFile(mxUtils.bind(this, function()
		                                    		{
		                                    			ui.hideDialog();
		                                    		}));
		window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
		                                 		{
		                                 			try
		                                 			{
		                                 				var doc = mxUtils.parseXml(xml);
		                                 				ui.editor.setGraphXml(doc.documentElement);
		                                 				agnityGlobalData.resetData();
		                                 				agnityGlobalData.prevSelectedCellData = Agnity.getTreeData(ui);
		                                 				if(agnityGlobalData.tabId != null)
		                                 					agnityGlobalData.sendMessageToParent('setName', {'name': agnityGlobalData.prevSelectedCellData.treeName, 'forestName': agnityGlobalData.prevSelectedCellData.forestName, 'diagramType' : 'tree'});

		                     				            ui.editor.graph.setSelectionCell(ui.editor.graph.getModel().getCell(0));
		                                 			}
		                                 			catch (e)
		                                 			{
		                                 				mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
		                                 			}
		                                 		}));
		
		ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
		      		{
		      			window.openFile = null;
		      		});
	}, null, null, 'ALT+O').isEnabled = isGraphEnabled;
	
	this.addAction('importProcess', function()
    {
		window.openNew = false;
		window.openKey = 'import';
		
		// Closes dialog after open
		window.openFile = new OpenFile(mxUtils.bind(this, function()
		{
			ui.hideDialog();
		}));
		
		window.openFile.setConsumer(mxUtils.bind(this, function(importedXml, filename)
         		{
         			try
         			{
         				Agnity.savePanelChanges();
         				var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
         				
         				var dataProvider = new AgnityImportUiXmlHelper();
         				dataProvider.fetchData(uiXml, importedXml, 'process', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
         				                       {
         											var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.uiXml));
         									        ui.editor.graph.model.beginUpdate();
         									        ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
         									        ui.hideDialog();
         									        ui.editor.graph.model.endUpdate(); 
                                      				agnityGlobalData.resetData();
         				                       });
         			}
         			catch (e)
         			{
         				mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
         			}
         		}));

         		// Removes openFile if dialog is closed
         		ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
         		{
         			window.openFile = null;
         		});
		                                 		
    }, null, null, 'ALT+I').isEnabled = isGraphEnabled;
	           		
	this.addAction('importTree', function()
	{
		window.openNew = false;
		window.openKey = 'import';
		
		// Closes dialog after open
		window.openFile = new OpenFile(mxUtils.bind(this, function()
		{
			ui.hideDialog();
		}));
		
		window.openFile.setConsumer(mxUtils.bind(this, function(importedXml, filename)
		{
			try
			{
				Agnity.savePanelChanges();
				var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
				
				var dataProvider = new AgnityImportUiXmlHelper();
				dataProvider.fetchData(uiXml, importedXml, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
				                       {
											var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.uiXml));
									        ui.editor.graph.model.beginUpdate();
									        ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
									        ui.hideDialog();
									        ui.editor.graph.model.endUpdate(); 
a                             				//Agnity.getOutlinePanel(ui);
				                       });
			}
			catch (e)
			{
				mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
			}
		}));

		// Removes openFile if dialog is closed
		ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
		{
			window.openFile = null;
		});
	}, null, null, 'ALT+I').isEnabled = isGraphEnabled;
	
	this.addAction('closeToggleSidebar', function()
    {
		ui.toggleSidebar(true);
    });
	
	this.addAction('variableManagement', function(callback)
	{
		var startNodeCell = Agnity.getStartNodeCell(ui);
		
		if(startNodeCell == null)
		{
			var treeData = Agnity.getTreeData(ui);
			if(treeData.forestName == null) return;
			var dataProvider = new AgnityGetStartNodeTree(treeData.forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
			dataProvider.fetchData(function(treemap)
            {
				if(agnityGlobalData.tabId == null)
					window.open('TreeViewer.html?forestName=' + treeData.forestName + '&treeName=' + treemap.treeName + '&showVariables=1');
				else
					agnityGlobalData.sendMessageToParent('variableManagement', {'forestName' : treeData.forestName, 'name': treemap.treeName, 'showVariables' : 1, 'diagramType' : Agnity.getUrlParam('diagram')});
            });
		}
		else
		{
			var inStartNodeData = null;
			if(Agnity.isProcessDiagram())
			{
				inStartNodeData = Agnity.getProcessStartNodeData(ui, startNodeCell); 
			}
			else
				inStartNodeData = Agnity.getStartNodeData(ui, startNodeCell);
			
			var cell = graph.getSelectionCell();
			if(cell != null)
				graph.removeSelectionCell(cell);
			
			var dlg = new AgnityLocalVarDialog(ui, inStartNodeData, callback);
			dlg.setupContainer();
			dlg.saveOnClose = true;
			ui.showDialog(dlg.parentDiv, 600, 520, true, false);
		}		
		
	}, null, null, null).isEnabled = isGraphEnabled;
	
	this.addAction('validate', function()
	{
		Agnity.savePanelChanges();		

		if(Agnity.isComponentDiagram())
		{
			var componentXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			var validator = new AgnityComponentValidationHelper();
			
			validator.fetchData(componentXml, 'component', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
			{
				var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.componentXml));
		        ui.editor.graph.model.beginUpdate();
		        try
		        {
		            ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
		        }
		        catch (e)
		        {
		        	console.log(e);
		            error = e;
		        }
		        finally
		        {
		            ui.editor.graph.model.endUpdate();    
	            }
		        
				agnityGlobalData.resetData();
			});			
		}
		else if(Agnity.isDBSchemaDiagram())
		{
			Agnity.savePanelChanges();
			var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			
			var dbConfig = new AgnityGetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
			dbConfig.fetchData(function(applicationDBConfig)
			{
				var validate = new AgnityDbSchemaValidationHelper();
				validate.fetchData(uiXml, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), applicationDBConfig.type, function(response){
					var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.uiXml));
					ui.editor.graph.model.beginUpdate();
					try
			        {
			            ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
			        }
			        catch (e)
			        {
			        	console.log(e);
			            error = e;
			        }
			        finally
			        {
			            ui.editor.graph.model.endUpdate();    
		            }
					agnityGlobalData.resetData();
				});
			});
			
		}
		else
		{
			Agnity.savePanelChanges();		
			var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			var validate = new AgnityTreeValidationHelper();
			validate.fetchData(uiXml, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response){
				var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.uiXml));
		        ui.editor.graph.model.beginUpdate();
		        try
		        {
		            ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
		        }
		        catch (e)
		        {
		        	console.log(e);
		            error = e;
		        }
		        finally
		        {
		            ui.editor.graph.model.endUpdate();    
	            }
				agnityGlobalData.resetData();

			});			
		}		
	}).isEnabled = isGraphEnabled;
	
	this.addAction('tuiDataHandler', function(inTuiNodeData)
	{
			var dlg = new AgnityTuiDataHandlerDialog(ui, inTuiNodeData);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 700, 550, true, false);		
	});
	
	this.addAction('defineKeys', function(inTuiNodeData)
	{
			var dlg = new AgnityTuiDefineKeysDialog(ui, inTuiNodeData);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 700, 550, true, false);		
	});
	
	this.addAction('defineAvp', function(inAvpNodeData)
	{
		var dlg = new AgnityDefineAvpDialog(ui, inAvpNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 700, 600, true, false);	
	});
	
	this.addAction('errorDialog', function(severityResourceId, stdErrMsgResourceId, additionalErrMsg)
	               {
						var dlg = new AgnityErrorMsgDialog(ui, severityResourceId, stdErrMsgResourceId, additionalErrMsg);
						dlg.setupContainer();
						ui.showDialog(dlg.parentDiv, 400, 350, true, false);
	               });
	
	this.addAction('searchDialog', function()
	               {
						var dlg = new AgnitySearchDialog(ui);
						dlg.setupContainer();
						ui.showDialog(dlg.parentDiv, 400, 160, true, false);
	               });
	this.addAction('sessionTimeoutDialog', function()
			  {
					var dlg = new AgnitySessionTimeoutDialog(ui);
					dlg.setupContainer();
					dlg.setErrorContentHeight();
					ui.showDialog(dlg.parentDiv, 250, 185, true, false);
			  });
	this.addAction('settingsDialog', function()
		     	  {
        agnityGlobalData.sendMessageToParent('toggele-settings');
			      });
	this.addAction('showCell', function(cellId)
	               {
						if(cellId == null) return;
						
						var cell = ui.editor.graph.getModel().getCell(cellId);
						
						if(cell == null) return;
						ui.editor.graph.scrollCellToVisible(cell, true);
						ui.editor.graph.setSelectionCell(cell);
	               });
	
	this.addAction('debug', function()
	           	{
	           		var dlg = new AgnityApplicationDebuggerDialog(ui);
	           		dlg.setupContainer();
					ui.showDialog(dlg.parentDiv, 800, 450, true, false);
	           	}, null, null, null).isEnabled = isGraphEnabled;
	
	this.addAction('saveUiXml_int', function(callback) 
			{
				if(Agnity.hasUrlReadonlyParam() || (Agnity.getUrlParam("newTab") != 1 && !Agnity.hasLockAcquired()))
				{
					return;
				}
				
				Agnity.savePanelChanges();
				var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
				
				var treeData = Agnity.getTreeData(ui);
				
				console.log(treeData);
				
				var dataProvider = new AgnitySaveTreeHelper(treeData.forestName, treeData.treeName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), false, Agnity.getDomainName());
 				agnityGlobalData.sendMessageToParent('setName', {'name': treeData.treeName, 'forestName': treeData.forestName, 'diagramType' : 'tree'});

				if(callback != null && typeof callback === "function")
				{
					dataProvider.storeData(uiXml, callback);					
				}
				else
				{
					dataProvider.storeData(uiXml, function(response){
						//To call setupCustomOperations
						Agnity.setupCustomOperations(ui);
						Agnity.sendTabRefreshMessage(response.lockStatus);
					});
				}
				
				window.onbeforeunload = null;
				
			}, null, null, 'ALT+S').isEnabled = isGraphEnabled;
	
	this.addAction('saveDBSchema_int', function(callback)
			{
				if(Agnity.hasUrlReadonlyParam() || (Agnity.getUrlParam("newTab") != 1 && !Agnity.hasLockAcquired()))
				{
					return;
				}
				
				Agnity.savePanelChanges();
				var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
				
				var dbSchemaData = Agnity.getTreeData(ui);
				
				var dbSchemaData = Agnity.getTreeData(ui);
				var dataProvider = new AgnitySaveDBSchemaHelper(dbSchemaData.forestName, 'dbSchema', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), false, Agnity.getDomainName());
				agnityGlobalData.sendMessageToParent('setName', {'name': dbSchemaData.forestName, 'forestName': dbSchemaData.forestName, 'diagramType' : 'dbSchema'});
 				
				if(callback != null && typeof callback === "function")
				{
					dataProvider.storeData(uiXml, callback);					
				}
				else
				{
					dataProvider.storeData(uiXml, function(response){
						Agnity.sendTabRefreshMessage(response.lockStatus);
					});
				}
				
			});
	
	this.addAction('saveProcess_int', function(callback)
           {
				if(Agnity.hasUrlReadonlyParam() || (Agnity.getUrlParam("newTab") != 1 && !Agnity.hasLockAcquired()))
				{
					return;
				}
				
				Agnity.savePanelChanges();
				var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
				var processData = Agnity.getTreeData(ui);
				
				var dataProvider = new AgnitySaveProcessHelper(processData.treeName, 'process', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), false, Agnity.getDomainName());
				if(Agnity.isProcessDiagram())
					agnityGlobalData.sendMessageToParent('setName', {'name': processData.treeName, 'forestName': processData.forestName, 'diagramType' : 'process'});

				if(callback != null && typeof callback === "function")
				{
					dataProvider.storeData(uiXml, callback);					
				}
				else
				{
					dataProvider.storeData(uiXml, function(response){
						//To call setupCustomOperations
						Agnity.setupCustomOperations(ui);
						Agnity.sendTabRefreshMessage(response.lockStatus);
					});
				}
				
				window.onbeforeunload = null;
				//To Do save process
           }, null, null, 'ALT+S').isEnabled = isGraphEnabled;
	
	this.addAction('saveComponent_int', function(callback)
           {
				//Save Component
				if(Agnity.hasUrlReadonlyParam() || (Agnity.getUrlParam("newTab") != 1 && !Agnity.hasLockAcquired()))
				{
					return;
				}
				
				Agnity.savePanelChanges();
				var componentXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
				
				var componentData = Agnity.getComponentData(ui);
				
				var dataProvider = new AgnitySaveFunctionBlockHelper(componentData.forestName, componentData.componentName, 'component', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), false, Agnity.getDomainName());
				agnityGlobalData.sendMessageToParent('setName', {'name': componentData.componentName, 'forestName': componentData.forestName, 'diagramType' : 'component'});
				if(callback != null && typeof callback === "function")
				{
					dataProvider.storeData(componentXml, callback);					
				}
				else
				{
					dataProvider.storeData(componentXml, function(response){
						Agnity.sendTabRefreshMessage(response.lockStatus);
					});
				}
				
				
           }, null, null, 'ALT+S').isEnabled = isGraphEnabled;
	
	this.addAction('autoSave', function()
	{	
		if(Agnity.hasUrlReadonlyParam() || (Agnity.getUrlParam("newTab") != 1 && !Agnity.hasLockAcquired()))
		{
			return;
		}
						
		if(Agnity.isComponentDiagram())
		{
			var componentXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			if(self.autoSaveXml == componentXml) return;
			
			self.autoSaveXml = componentXml;
			
			var componentData = Agnity.getComponentData(ui);	    				
			var dataProvider = new AgnitySaveFunctionBlockHelper(componentData.forestName, componentData.componentName, 'component', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), true, Agnity.getDomainName());	    				
			dataProvider.storeData(componentXml, function(response){
				Agnity.sendTabRefreshMessage(response.lockStatus);
			});
		}
		else if(Agnity.isProcessDiagram())
		{
			var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			if(self.autoSaveXml == uiXml) return;

			self.autoSaveXml = uiXml;

			var processData = Agnity.getTreeData(ui);							
			var dataProvider = new AgnitySaveProcessHelper(processData.treeName, 'process', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), true, Agnity.getDomainName());
			dataProvider.storeData(uiXml, function(response){
				Agnity.sendTabRefreshMessage(response.lockStatus);
			});
		}
		else if(Agnity.isDBSchemaDiagram())
		{
			var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			if(self.autoSaveXml == uiXml) return;

			self.autoSaveXml = uiXml;
			var dbSchemaData = Agnity.getTreeData(ui);
			var dataProvider = new AgnitySaveDBSchemaHelper(dbSchemaData.forestName, 'dbSchema', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), true, Agnity.getDomainName());
			dataProvider.storeData(uiXml, function(response){
				Agnity.sendTabRefreshMessage(response.lockStatus);
			});
		}
		else
		{
			var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			if(self.autoSaveXml == uiXml) return;

			self.autoSaveXml = uiXml;

			var treeData = Agnity.getTreeData(ui);							
			var dataProvider = new AgnitySaveTreeHelper(treeData.forestName, treeData.treeName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), true, Agnity.getDomainName());
			dataProvider.storeData(uiXml, function(response){
				Agnity.sendTabRefreshMessage(response.lockStatus);
			});
		}
   }, null, null, null);
	               
	this.addAction('loadComponent_dlg', function()
           {
				//load component dialog
				var dlg = new AgnityLoadComponentDialog(ui);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 400, 180, true, false);
           }, null, null, null).isEnabled = isGraphEnabled;
	
	this.addAction('loadProcess_dlg', function()
           {
				//load process dialog
				var dlg = new AgnityLoadProcessDialog(ui);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 400, 180, true, false);
           }, null, null, null).isEnabled = isGraphEnabled;
	
	this.addAction('selectPattern_dlg', function(inDialedPatternData, inPatternType, inDlgLabel, callback)
	       {
				var dlg = new AgnitySelectPatternDialog(ui, inDialedPatternData, inPatternType, inDlgLabel, callback);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 450, 350, true, false);
	       });
	
	this.addAction('loadTreeDialog', function()
			{
				var dlg = new AgnityLoadTreeDialog(ui);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 400, 180, true, false);
			}, null, null, 'ALT+L').isEnabled = isGraphEnabled;
	
	this.addAction('newAppId', function(onAppCreatedHandler)
			{
				var dlg = new AgnityCreateAppDialog(ui, onAppCreatedHandler);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 400, 180, true, false);
			}).isEnabled = isGraphEnabled;
	
	this.addAction('newFunctionBlock', function(onFunctionBlockCreatedHandler)
           {
				var dlg = new AgnityCreateFunctionBlockDialog(ui, onFunctionBlockCreatedHandler);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 350, 180, true, false);
           });
	
	this.addAction('newTree_dlg', function(onTreeCreatedHandler)
	       {
				var dlg = new AgnityCreateTreeDialog(ui, onTreeCreatedHandler);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 350, 150, true, false);
	       });
	
	this.addAction('createForest', function(onForestCreatedHandler)
			{
				var dlg = new AgnityCreateForestDialog(ui, onForestCreatedHandler);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 300, 120, true, false);
			});
	
	this.addAction('createVariable', function(onVariableCreateHandler)
			{
				var dlg = new AgnityCreateVariableDialog(ui, onVariableCreateHandler);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 300, 120, true, false);
			});
	
	this.addAction('develop_int', function()
			{
				var treeData = Agnity.getTreeData(ui);
				var executeOperation = new AgnityExecuteCustomOperation(treeData.forestName, treeData.treeName, 'develop', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				
				executeOperation.executeCustomOperation(function(response)
                {
					Agnity.setupCustomOperations(ui);
                });
			}).isEnabled = isGraphEnabled;
	
	this.addAction('test_int', function()
			{
				var treeData = Agnity.getTreeData(ui);
				var executeOperation = new AgnityExecuteCustomOperation(treeData.forestName, treeData.treeName, 'test', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				
				executeOperation.executeCustomOperation(function(response)
				                                        {
				                        					Agnity.setupCustomOperations(ui);
				                                        });
			}).isEnabled = isGraphEnabled;
	
	this.addAction('deploy_int', function()
			{
				var treeData = Agnity.getTreeData(ui);
				var executeOperation = new AgnityExecuteCustomOperation(treeData.forestName, treeData.treeName, 'deploy', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				
				executeOperation.executeCustomOperation(function(response)
				                                        {
				                        					Agnity.setupCustomOperations(ui);
				                                        });
			}).isEnabled = isGraphEnabled;
	
	this.addAction('activate_int', function()
			{
				var treeData = Agnity.getTreeData(ui);
				var executeOperation = new AgnityExecuteCustomOperation(treeData.forestName, treeData.treeName, 'activate', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				
				executeOperation.executeCustomOperation(function(response)
				                                        {
				                        					Agnity.setupCustomOperations(ui);
				                                        });
			}).isEnabled = isGraphEnabled;
	
	this.addAction('loadTreeDialog_int', function(forestName, treeName, callback)
			{
				var dataProvider = new AgnityLoadTreeHelper();
				dataProvider.fetchData(forestName, treeName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
					{						
						var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.uiXml));
				        
						if(response.autoSavedXml != null)
						{
							//open a new dialog
							var dlg = new AgnityDiagramSavedCopiesDialog(ui, response.autoSaveTimeInMillis, function(type)
                              {
									if(type == 'Auto Saved Xml')
										data =  ui.editor.graph.zapGremlins(mxUtils.trim(response.autoSavedXml));
									
									Agnity.loadDiagramXml(ui, data, forestName, treeName, 'tree', callback);
                              });
							dlg.setupContainer();
							ui.showDialog(dlg.parentDiv, 400, 180, true, false);
							
						}
						else
						{
							Agnity.loadDiagramXml(ui, data, forestName, treeName, 'tree', callback);
						}
						
					});
			});
	
	this.addAction('getReferencedNodes_int', function(forestName, functionBlockName, nodeId, callback)
	               {
						if(functionBlockName == null)
						{
							functionBlockName = forestName;
						}
						
						var dataProvider = new AgnityGetReferencedNodesHelper();
						dataProvider.fetchData(forestName, functionBlockName, nodeId, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
	                       {
								if(callback != null)
									callback(response);
	                       });
	               });
	
	this.addAction('loadProcess_int', function(forestName, processName, callback)
	               {
						var dataProvider = new AgnityLoadProcessHelper();
						dataProvider.fetchData(processName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
	                       {
								var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.uiXml));
								
								if(response.autoSavedXml != null)
								{
									//open a new dialog
									var dlg = new AgnityDiagramSavedCopiesDialog(ui, response.autoSaveTimeInMillis, function(type)
	                                  {
											if(type == 'Auto Saved Xml')
												data =  ui.editor.graph.zapGremlins(mxUtils.trim(response.autoSavedXml));
											
											Agnity.loadDiagramXml(ui, data, forestName, processName, 'process', callback);
	                                  });
									dlg.setupContainer();
									ui.showDialog(dlg.parentDiv, 400, 180, true, false);
									
								}
								else
								{
									Agnity.loadDiagramXml(ui, data, forestName, processName, 'process', callback);
								}
								
	                       });
	               });
	
	this.addAction('loadDBSchema_int', function(forestName, callback)
			{
				var dataProvider = new AgnityLoadDBSchemaHelper(forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				dataProvider.fetchData(function(response)
				{
					var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.dbSchemaXml));
					
					if(response.autoSavedXml != null)
					{
						//open a new dialog
						var dlg = new AgnityDiagramSavedCopiesDialog(ui, response.autoSaveTimeInMillis, function(type)
                          {
								if(type == 'Auto Saved Xml')
									data =  ui.editor.graph.zapGremlins(mxUtils.trim(response.autoSavedXml));
								
								Agnity.loadDiagramXml(ui, data, forestName, forestName, 'dbSchema', callback);
                          });
						dlg.setupContainer();
						ui.showDialog(dlg.parentDiv, 400, 180, true, false);
						
					}
					else
					{
						Agnity.loadDiagramXml(ui, data, forestName, forestName, 'dbSchema', callback);
					}
				});
			});
	
	this.addAction('loadFunctionBlock_int', function(forestName, functionBlockName, callback)
	               {
						var dataProvider = new AgnityLoadFunctionBlockHelper();
						dataProvider.fetchData(forestName, functionBlockName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
	                       {
								var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.componentXml));
								
								if(response.autoSavedXml != null)
								{
									//open a new dialog
									var dlg = new AgnityDiagramSavedCopiesDialog(ui, response.autoSaveTimeInMillis, function(type)
	                                  {
											if(type == 'Auto Saved Xml')
												data =  ui.editor.graph.zapGremlins(mxUtils.trim(response.autoSavedXml));
											
											Agnity.loadDiagramXml(ui, data, forestName, functionBlockName, 'component', callback);
	                                  });
									dlg.setupContainer();
									ui.showDialog(dlg.parentDiv, 400, 180, true, false);
									
								}
								else
								{
									Agnity.loadDiagramXml(ui, data, forestName, functionBlockName, 'component', callback);
								}
								
	                       });
	               });
	
	this.addAction('saveTemplateDialog', function()
	   			{
	   				var dlg = new AgnitySaveAsTemplateDialog(ui);
	   				dlg.setupContainer();
	   				ui.showDialog(dlg.parentDiv, 400, 145, true, false);
	   			}, null, null, 'ALT+K').isEnabled = isGraphEnabled;
	
	this.get('saveTemplateDialog').label = mxResources.get('keepAsTemplate');
	
	this.addAction('saveAsProcess', function()
               {
					var dlg = new AgnitySaveAsProcessDialog(ui);
					dlg.setupContainer();
					ui.showDialog(dlg.parentDiv, 400, 145, true, false);
               }, null, null, null).isEnabled = isGraphEnabled;
	
	this.addAction('saveTemplateDialog_int', function(templateName)
		   			{
						var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
						
						if(Agnity.isComponentDiagram())
						{
							var componentData = Agnity.getComponentData(ui);
							var handler = new AgnitySaveFunctionBlockAsTemplate();
							handler.storeData(componentData.forestName, componentData.componentName, templateName, 'component', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
						}
						else if(Agnity.isProcessDiagram())
						{
							//TO do
						}
						else if(Agnity.isDBSchemaDiagram())
						{
							//TO do
						}
						else
						{
							var handler = new AgnitySaveTreeAsTemplateHelper();						
							handler.storeData(templateName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), uiXml, Agnity.getDomainName());
						}
						
		   			}).isEnabled = isGraphEnabled;
	
	this.addAction('loadTemplateDialog', function()
	{
		if(Agnity.isComponentDiagram())
		{
			var dlg = new AgnityLoadFunctionBlockTemplateDialog(ui);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 400, 185, true, false);
		}
		else
		{
			var dlg = new AgnityLoadFromTemplateDialog(ui);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 400, 145, true, false);
			
		}
	}, null, null, 'ALT+C').isEnabled = isGraphEnabled;
		
	this.get('loadTemplateDialog').label = mxResources.get('createFromTemplate');
	
	this.addAction('loadTreeTemplateDialog_int', function(templateName)
		   			{
		var dataProvider = new AgnityCreateTreeFromTemplateHelper();
		dataProvider.fetchData(templateName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
			{						
				var data = ui.editor.graph.zapGremlins(mxUtils.trim(response.uiXml));
		        
		        ui.editor.graph.model.beginUpdate();
		        try
		        {
		            ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
     				agnityGlobalData.resetData();
		            ui.hideDialog();
					Agnity.setupTreePropertyPanel(ui, propertyTabDiv);
		        }
		        catch (e)
		        {
		            error = e;
		        }
		        finally
		        {
		            ui.editor.graph.model.endUpdate();                
		        }
			});
		});
	
	this.addAction('loadFunctionBlockTemplate_int', function(forestName, templateName, callback)
       {
			var dataProvider = new AgnityCreateFunctionBlockFromTemplateHelper();
			if(callback != null && typeof callback === "function")
			{
				dataProvider.fetchData(forestName, templateName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), callback);
			}
			else
			{
				dataProvider.fetchData(forestName, templateName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
				                       {
				                       });				
			}
       });
	
	//this.addAction('save', function() { ui.saveFile(true); }, null, null, Editor.ctrlKey + '+S').isEnabled = isGraphEnabled;
	//this.addAction('saveAs...', function() { ui.saveFile(true); }, null, null, Editor.ctrlKey + '+Shift+S').isEnabled = isGraphEnabled;
	this.addAction('exportTree', function() 
	               {
						var treeData = Agnity.getTreeData(ui);
						
						if(treeData.treeName == null)
						{
							alert('Please provide tree name to download');
							return;
						}
						Agnity.savePanelChanges();
						var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
						download(uiXml, treeData.treeName + '' + '.diagram', 'text/plain');
	               }, null, null, 'ALT+E');
	
	this.addAction('exportProcess', function()
	               {
						var processData = Agnity.getTreeData(ui);
						
						if(processData.treeName == null)
						{
							alert('Please provide process name to download');
							return;
						}
						Agnity.savePanelChanges();
						var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
						download(uiXml, 'AgnityProcess_' + processData.treeName + '' + '.diagram', 'text/plain');
	               }, null, null, 'ALT+E');
	
	this.addAction('downloadComponent', function()
	   {
			var componentData = Agnity.getComponentData(ui);
			
			if(componentData.componentName == null || componentData.componentName == '')
			{
				alert('Please provide function block name to download');
				return;
			}
			Agnity.savePanelChanges();
			var componentXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
			download(componentXml, componentData.componentName + '' + '.diagram', 'text/plain');
	   }, null, null, null);
	
	this.addAction('editDiagram...', function()
	{
		var dlg = new EditDiagramDialog(ui);
		ui.showDialog(dlg.container, 620, 420, true, false);
		dlg.init();
	});
	
	this.addAction('deleteFunctionTemplateDialog', function()
				   {
						var dlg = new AgnityDeleteFunctionTemplateDialog(ui);
						dlg.setupContainer();
						ui.showDialog(dlg.parentDiv, 400, 185, true, false);
						
				   }, null, null, null);
	
	this.addAction('deleteFunctionBlockTemplate_int', function(templateName)
	               {
						var handler = new AgnityDeleteFunctionBlockTemplate();
						handler.deleteData(templateName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
	               });
	
	this.addAction('deleteTreeTemplateDialog', function()
	               {
						var dlg = new AgnityDeleteTreeTemplateDialog(ui);
						dlg.setupContainer();
						ui.showDialog(dlg.parentDiv, 400, 185, true, false);
						
	               }, null, null, null);
	
	this.addAction('deleteTreeTemplate_int', function(templateName)
	               {
						var handler = new AgnityDeleteTreeTemplate();
						handler.deleteData(templateName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
	               });
	
	this.addAction('deleteDialog', function()
	               {
						var dlg = new AgnityDeleteDiagramDialog(ui);
						dlg.setupContainer();
						ui.showDialog(dlg.parentDiv, 500, 240, true, false);
	               }, null, null, 'ALT+X');
	
	this.addAction('DeleteForestDialog', function(forestName, treeName, callback)
	               {
						var handler = new AgnityDeleteForestHelper();
						handler.deleteData(forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), callback);
	               });
	
	this.addAction('deleteProcessDialog', function()
	               {
						var dlg = new AgnityDeleteProcessDialog(ui);
						dlg.setupContainer();
						ui.showDialog(dlg.parentDiv, 400, 185, true, false);
						
	               }, null, null, null);
	
	this.addAction('deleteProcess_int', function(processName)
	               {
						var handler = new AgnityDeleteProcessHelper();
						handler.deleteData(processName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
	               });
	
	this.addAction('DeleteTreeDialog', function(forestName, treeName)
	               {
						var handler = new AgnityDeleteTreeHelper();
						handler.deleteData(forestName, treeName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
	               });
	
	this.addAction('DeleteComponentDialog', function(forestName, functionBlockName)
	               {
						var handler = new AgnityDeleteFunctionBlockHelper();
						handler.deleteData(forestName, functionBlockName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
	               });
	
	this.addAction('downloadServiceXml_int', function()
	               {
						var treeData = Agnity.getTreeData(ui);
						
						if(treeData.treeName == null)
						{
							alert('Please provide tree name to download');
							return;
						}
						Agnity.savePanelChanges();
						var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
						var dataProvider = new AgnityGetServiceXmlHelper();
						dataProvider.fetchData(uiXml, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
						                       {
													download(response.serviceXml, treeData.treeName + '.xml', 'text/plain');
						                       });
	               }, null, null, 'ALT+D');
	
	this.addAction('downloadApplicationPackage', function(response)
	{
		var forestName = response.forestName;
		var base64EncodedAppData = response.applicationPackage;
		
		download('data:application/octet-stream;base64,' + base64EncodedAppData, forestName + '.sar', "application/octet-stream");
	});
	
	this.addAction('openServiceXmlDialog', function()
	           	{
	           		window.openNew = false;
	           		window.openKey = 'open';
	           		
	           		window.openFile = new OpenFile(mxUtils.bind(this, function()
	           		                                    		{
	           		                                    			ui.hideDialog();
	           		                                    		}));
	           		
	           		window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
	           		                                 		{
	           		                                 			try
	           		                                 			{
	           		                                 				var doc = new DOMParser().parseFromString(xml, "application/xml");
	           		                                 				var xmlStr = new XMLSerializer().serializeToString(doc);
           		                                 					var serviceXml = xmlStr.replace(/(\r\n|\n|\r|\t)/gm, '').replace(/  +/g, '');
           		                                 					
           		                                 					var dataProvider = new AgnityOpenServiceXmlHelper();
           		                                 					
           		                                 					dataProvider.fetchData(serviceXml, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response)
           		                                 					                       {
           		                                 												var doc = mxUtils.parseXml(response.uiXml);
           		                                 												ui.editor.setGraphXml(doc.documentElement);

           		                                 												agnityGlobalData.resetData();

           		                                 												var model = ui.editor.graph.getModel();           		                                 										
           		                                 												var nodes = model.getChildEdges(model.getCell(1));
           		                                 										
           		                                 												if(nodes == null) return null;
           		                                 												
           		                                 												for(var idx = 0; idx < nodes.length; idx++)
           		                                 												{
           		                                 													var cell = nodes[idx];
           		                                 													
           		                                 													if(cell.value == null && cell.agnityValue != null)
           		                                 													{
           		                                 														ui.editor.graph.getModel().setValue(cell, mxResources.get(agnityGlobalData.connectorValueToResourceMap.get(cell.agnityValue)));
           		                                 													}
           		                                 												}
           		                                 												
           		                                 												agnityGlobalData.prevSelectedCellData = Agnity.getTreeData(ui);
           		                                 							 				    agnityGlobalData.sendMessageToParent('setName', {'name': agnityGlobalData.prevSelectedCellData.treeName, 'forestName' : agnityGlobalData.prevSelectedCellData.forestName, 'diagramType' : 'tree'});

           		                                 												ui.editor.graph.setSelectionCell(ui.editor.graph.getModel().getCell(0));
           		                                 					                       });
	           		                                 			}
	           		                                 			catch (e)
	           		                                 			{
	           		                                 				mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
	           		                                 			}
	           		                                 		}));
	           		
	           		ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
	           		      		{
	           		      			window.openFile = null;
	           		      		});
	           	}, null, null, 'ALT+B').isEnabled = isGraphEnabled;
	
	this.get('openServiceXmlDialog').label = mxResources.get('buildFromServiceXML');
	
	this.addAction('pageSetup...', function() { ui.showDialog(new PageSetupDialog(ui).container, 320, 220, true, true); }).isEnabled = isGraphEnabled;
	this.addAction('print...', function() { ui.showDialog(new PrintDialog(ui).container, 300, 180, true, true); }, null, 'sprite-print', Editor.ctrlKey + '+P');
	this.addAction('preview', function() { mxUtils.show(graph, null, 10, 10); });
	
	this.addAction('helpLinkDialog', function(nodeName)
	{
		console.log('calling help action');
		var dlg = new AgnityHelpDialog(ui, nodeName);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 600, 500, true, true);
	});
	
	this.addAction('setLocalVar', function(inTreeData) 
	{
		var cell = graph.getSelectionCell();
		graph.removeSelectionCell(cell);
		
		var dlg = new AgnityLocalVarDialog(ui, inTreeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 600, 520, true, false);
	});
	
	this.addAction('setSMSVar', function(inTreeData)
	{
		var dlg = new AgnitySMSVarDialog(ui, inTreeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 700, 600, true, false);
		//dlg.setupSMSVarEntries();
	});
	
	this.addAction('setHeaders', function(inSIPNodeData) 
	{
		var dlg = new AgnitySipHeaderDialog(ui, inSIPNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 650, 520, true, false);
	});
	
	this.addAction('setCdrParams', function(inCDRNodeData) 
			{
				var dlg = new AgnityCDRParamDialog(ui, inCDRNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 650, 520, true, false);
			});
	
	this.addAction('setAssignNodeVal', function(inAssignNodeData) 
			{
				var dlg = new AgnitySetAssignmentValueDialog(ui, inAssignNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 600, 520, true, false);
			});
	
	this.addAction('unsetAssignNodeVal', function(inAssignNodeData) 
			{
				var dlg = new AgnityUnsetAssignmentDialog(ui, inAssignNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 600, 500, true, false);
			});
	
	this.addAction('dbNodeVariableMap', function(inDBNodeData) 
			{
				var dlg = new AgnityDBNodeVarDialog(ui, inDBNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 450, 420, true, false);
			});
	
	this.addAction('dbQuerySpecifierMap', function(inDBQueryNodeData) 
			{
				var dlg = new AgnityDBQueryDialog(ui, inDBQueryNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 850, 600, true, false);
			});
	
	this.addAction('playAndCollectNodeItem', function(inPlayAndCollectNodeData) 
			{
				var dlg = new AgnityPlayAndCollectNodeItemDialog(ui, inPlayAndCollectNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 900, 520, true, false);
			});
	
	this.addAction('playItem', function(inPlayNodeData)
			{
				var dlg = new AgnityPlayItemDialog(ui, inPlayNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 900, 600, true, false);
			})
	this.addAction('messageParameter', function(inPlayNodeData)
	{
		var dlg = new AgnityMessageParameterDialog(ui, inPlayNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 900, 600, true, false);
	})
			
			
	
	this.addAction('setInputList', function(inSoapCallNodeData) 
			{
				var dlg = new AgnitySoapNodeInputDialog(ui, inSoapCallNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 750, 520, true, false);
			});
	
	this.addAction('setOutputList', function(inSoapNodeData) 
			{
				var dlg = new AgnitySoapNodeOutputDialog(ui, inSoapNodeData);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 650, 520, true, false);
			});
	
	this.addAction('setProcessVar', function(inProcessNodeData) 
	   			{
	   				var dlg = new AgnityProcessSetVarDialog(ui, inProcessNodeData);
	   				dlg.setupContainer();
	   				ui.showDialog(dlg.parentDiv, 650, 550, true, false);
	   			});
	
	this.addAction('manageColumns', function(inTableNodeData)
	{
		var dbConfig = new AgnityGetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		dbConfig.fetchData(function(response)
		{
			if(response.user && response.scheme)
			{
				var dlg = new AgnityManageColumnsDialog(ui, inTableNodeData, Agnity.getUserTypeCells(ui), Agnity.getSequenceCells(ui));
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 750, 550, true, false);
			}
			else
			{
				var dlg = Agnity.showErrorMessage('info', ['emptyDBConfigureData', mxResources.get('dbNotConfigured')]);
			}
			
		});
		
	});
	
	this.addAction('generateApi', function()
	{
		var treeData = Agnity.getTreeData(ui);
		var uiXml = mxUtils.getPrettyXml(editor.getGraphXml()).replace(/(\r\n|\n|\r)/gm, '').replace(/  +/g, '');
		
		var codeGenerator = new AgnityGenerateApiCodeHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), treeData.apiVersion, uiXml);
		codeGenerator.generateCode(function(response)
		{
			if(response.result)
			{
				alert("Generated Api successfully");
			}
			else
			{
				alert("Compilation error. Check logs generated in debug.out");
			}
			
		});
	});
	
	this.addAction('manageConstraints', function(inTableNodeData)
	{
		var dlg = new AgnityMangeConstraintsDialog(ui, inTableNodeData, Agnity.getTableCellsInfo(ui));
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 750, 550, true, false);
	});
	
	this.addAction('manageIndexes', function(inTableNodeData)
	{
		var dlg = new AgnityManageIndexesDialog(ui, inTableNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 850, 550, true, false);
	});
	
	this.addAction('defineRules', function(inTableNodeData)
	{
		var dlg = new AgnityDefineObjectRuleDialog(ui, inTableNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 850, 550, true, false);
	});

	this.addAction('manageAudit', function(inTableNodeData)
	{
		var dlg = new AgnityDefineManageAuditDialog(ui,inTableNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 850, 550, true, false);
	});
	
	this.addAction('casConfigureDialog', function(callback)
	{
		var availableCASServers = new AgnityGetAvailableCASServersHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());
		
		availableCASServers.fetchData(function(response)
		{
			
			var dlg = new AgnityCASServersDialog(ui, response, callback);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 800, 550, true, false);
			
		});
		
	});
	
	this.addAction('manageCASDialog', function()
	{
		let data = {
			r_data : {
				operation : "manageCas",
				getUrlParam : {
					diagram : Agnity.getUrlParam('diagram'),
					operationMode : Agnity.getUrlParam('operationMode'),
				}
			}
		};
		agnityGlobalData.postMessageToReactApp(data);

		// var applications = new AgnityGetAvailablePackagedApplicationsHelper(
		// 	Agnity.getUrlParam("diagram"),
		// 	Agnity.hasUrlReadonlyParam(),
		// 	Agnity.getUrlParam("operationMode"),
		// 	Agnity.getDomainName()
		// );
		// var packagedApplications = [];
		// applications.fetchData(function (possibleValues) {
		// 	packagedApplications = possibleValues;
		// });
		//
		// var casDetails = new AgnityGetAvailableCASServersHelper(
		// 	Agnity.getDomainName(),
		// 	Agnity.getUrlParam("operationMode"),
		// 	Agnity.getUrlParam("diagram"),
		// 	Agnity.hasUrlReadonlyParam()
		// );
		// casDetails.fetchData(function (response) {
		// 	if (response.length != 0) {
		// 		var dlg = new AgnityManageCASApplicationsDialog(ui);
		// 		dlg.setupContainer();
		// 		ui.showDialog(dlg.parentDiv, 650, 550, true, false);
		// 	} else {
		// 		var dlg = Agnity.showErrorMessage("info", [
		// 			"emptyCasServersData",
		// 			mxResources.get("casNotConfiguredError"),
		// 		]);
		// 	}
		// });

	});

	this.addAction('manageCASGroupDialog', function(callback)
	{
		var availableCASServers = new AgnityGetAvailableCASServersGroupHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());

		availableCASServers.fetchData(function(response)
		{

			var dlg = new AgnityCASServersGroupDialog(ui, response, callback);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 650, 550, true, false);

		});

	});

	this.addAction('applicationInfo_dlg', function(casApplicationInfo)
	{
		var dlg = new AgnityCASApplicationInfoDialog(ui, casApplicationInfo);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 650, 450, true, false);
	});
	
	this.addAction('packageApplicationDialog', function()
	{
		var application = new AgnityCreateApplicationPackageHelper(Agnity.getUrlParam('forestName'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		application.applicationPackage(function(response)
		{
			if(response.result)
			{
				var successMsg = mxResources.get('applicationPackageCreated') + Agnity.getUrlParam('forestName');
				ui.actions.get('successDialog').funct(successMsg);
			}
			else if(!response.result)
			{
				Agnity.showErrorMessage('critical', ['failedToCreateApplicationPackage', mxResources.get('applicationPackageFailed') + Agnity.getUrlParam('forestName')]);
			}
			
		});
	});

	this.addAction('setPegCount', function(inCDRNodeData)
	{
		var dlg = new AgnitySetPegCountDialog(ui, inCDRNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 650, 520, true, false);
	});
	this.addAction('setHttpHeaders', function(inCDRNodeData)
	{
		var dlg = new AgnitySethttpRaDialog(ui, inCDRNodeData);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 650, 520, true, false);
	});
	
	this.addAction('successDialog', function(successMsg)
	{
		var dlg = new AgnitySuccessDialog(ui, successMsg);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 450, 200, true, false);
	});
	
	this.addAction('userDefinedDBSchema', function()
	{
		var schemaContent = new AgnityGetUserDefinedDBSchemaHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		schemaContent.fetchData(function(response)
		{
			var dlg = new AgnityUserDefinedSchemaDialog(ui, response.userDefinedDBSchema);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 700, 550, true, false);
		});
	});
	
	this.addAction('uploadSchema', function(callback)
	{
		var dlg = new AgnityUploadForestDBSchema(ui, callback);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 400, 150, true, false);
	});
	
	this.addAction('showDBSchema', function(forestName)
	{
		var dbSchema = new AgnityGetForestDBSchemaHelper(forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		dbSchema.fetchData(function(response)
			{
				var dlg = new AgnityInformationDialog(ui, response.schemaContent);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 450, 200, true, false);
			})
	});
	
	this.addAction('appRouterDialog', function()
	{
		var dlg = new AgnityAppRouterDialog(ui);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 800, 600, true, false);
	});
	
	this.addAction('dbDetailDialog', function()
	{
		var dlg = new AgnityDBDetailDialog(ui);
		dlg.setupContainer();
		ui.showDialog(dlg.parentDiv, 600, 280, true, false);
	});
	
	this.addAction('schemaBuilderDiagram', function()
	{
		var forestName = Agnity.getDefaultForestName();
		
		agnityGlobalData.sendMessageToParent('new', {'diagramType' : 'dbSchema', 'forestName' : forestName});
	});

	this.addAction('createDBSchema_int', function(inTableData)
	{
		var dbConfig = new AgnityGetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		dbConfig.fetchData(function(applicationDBConfig)
		{
			var dbName = applicationDBConfig[0].scheme;
			var dbType = applicationDBConfig[0].type;
			var dbSchema = new AgnityDBSchema(dbName, inTableData);
			dbSchema.oracleDBSchema();
		});
		
		var forestName = Agnity.getDefaultForestName();
	});
	
	this.addAction('manageUserType_dlg', function(inUserTypeNodeData)
	{
		var cell = graph.getSelectionCell();
		var label = Agnity.getLabel(ui, cell);
		
		var dbConfig = new AgnityGetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		dbConfig.fetchData(function(applicationDBConfig)
		{
			if(applicationDBConfig.type != null)
			{
				var dlg = new AgnityManageUserColumnTypesDialog(ui, inUserTypeNodeData, applicationDBConfig.type, Agnity.getUserTypeCells(ui), label);
				dlg.setupContainer();
				ui.showDialog(dlg.parentDiv, 700, 500, true, false);
			}
			else
			{
				var dlg = Agnity.showErrorMessage('info', ['emptyDBConfigureData', mxResources.get('dbNotConfigured')]);
			}
		});
		
	});
	
	this.addAction('downloadDBSchema_int', function()
	{
		var dataProvider = new AgnityDownloadDBSchemaHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		dataProvider.fetchData(function(response)
           {
				var schemaContent = response.diagramDBSchema + "\n" + response.userDefinedDBSchema;
				download(schemaContent,  'DbSchema.sql', 'text/plain');
           });
	});
	
	this.addAction('downloadUserDefinedSchema', function(schemaContent)
	{
		download(schemaContent,  'userDefinedDbSchema.sql', 'text/plain');
	})
	
	this.addAction('setArgs', function(inFunctNodeData)
		{
			var dlg = new AgnitySetFunctionArgDialog(ui, inFunctNodeData);
			dlg.setupContainer();
			ui.showDialog(dlg.parentDiv, 900, 600, true, false);
		})
	// Edit actions
	this.addAction('undo', function() { ui.undo(); }, null, 'sprite-undo', Editor.ctrlKey + '+Z');
	this.addAction('redo', function() { ui.redo(); }, null, 'sprite-redo', (!mxClient.IS_WIN) ? Editor.ctrlKey + '+Shift+Z' : Editor.ctrlKey + '+Y');
	this.addAction('cut', function() { mxClipboard.cut(graph); }, null, 'sprite-cut', Editor.ctrlKey + '+X');
	this.addAction('copy', function() {console.log('copy event is getting fired'); mxClipboard.copy(graph); }, null, 'sprite-copy', Editor.ctrlKey + '+C');
	this.addAction('paste', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			var result = mxClipboard.paste(graph);
			console.log(result[0]);
			var json = JSON.parse(result[0].getValue().attributes.agnityData.nodeValue);
			console.log(json.nodeId);
			json.nodeId = Agnity.nodeId();
			result[0].setAttribute('agnityData', JSON.stringify(json));
			//document.getElementsByClassName('propertyTabDiv')[0].firstElementChild.firstElementChild.childNodes[1].firstElementChild.value = json.nodeId;
			console.log(result[0]);
			console.log(result[0].value);
			var cell = ui.editor.graph.getSelectionCell();
			//ui.editor.graph.getModel().setValue(cell, result[0].value);
			//Agnity.createPropertyPanel(ui);
		}
	}, false, 'sprite-paste', Editor.ctrlKey + '+V');
	this.addAction('pasteHere', function(evt)
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			graph.getModel().beginUpdate();
			try
			{
				var cells = mxClipboard.paste(graph);

				if (cells != null)
				{
					var includeEdges = true;
					
					for (var i = 0; i < cells.length && includeEdges; i++)
					{
						includeEdges = includeEdges && graph.model.isEdge(cells[i]);
					}

					var t = graph.view.translate;
					var s = graph.view.scale;
					var dx = t.x;
					var dy = t.y;
					var bb = null;
					
					if (cells.length == 1 && includeEdges)
					{
						var geo = graph.getCellGeometry(cells[0]);
						
						if (geo != null)
						{
							bb = geo.getTerminalPoint(true);
						}
					}

					bb = (bb != null) ? bb : graph.getBoundingBoxFromGeometry(cells, includeEdges);
					
					if (bb != null)
					{
						var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
						var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));
						
						graph.cellsMoved(cells, x - bb.x, y - bb.y);
					}
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	});
	
	function deleteCells(includeEdges)
	{
		// Cancels interactive operations
		graph.escape();
		var cells = graph.getDeletableCells(graph.getSelectionCells());
		
		if (cells != null && cells.length > 0)
		{
			var parents = graph.model.getParents(cells);
			graph.removeCells(cells, includeEdges);
			
			// Selects parents for easier editing of groups
			if (parents != null)
			{
				var select = [];
				
				for (var i = 0; i < parents.length; i++)
				{
					if (graph.model.contains(parents[i]) &&
						(graph.model.isVertex(parents[i]) ||
						graph.model.isEdge(parents[i])))
					{
						select.push(parents[i]);
					}
				}
				
				graph.setSelectionCells(select);
			}
		}
	};
	
	this.addAction('delete', function(evt)
	{
		deleteCells(evt != null && mxEvent.isShiftDown(evt));
	}, null, null, 'Delete');
	this.addAction('deleteAll', function()
	{
		deleteCells(true);
	}, null, null, Editor.ctrlKey + '+Delete');
	this.addAction('duplicate', function()
	{
		graph.setSelectionCells(graph.duplicateCells());
	}, null, null, Editor.ctrlKey + '+D');
	this.put('turn', new Action(mxResources.get('turn') + ' / ' + mxResources.get('reverse'), function()
	{
		graph.turnShapes(graph.getSelectionCells());
	}, null, null, Editor.ctrlKey + '+R'));
	this.addAction('selectVertices', function() { graph.selectVertices(); }, null, null, Editor.ctrlKey + '+Shift+I');
	this.addAction('selectEdges', function() { graph.selectEdges(); }, null, null, Editor.ctrlKey + '+Shift+E');
	this.addAction('selectAll', function() { graph.selectAll(null, true); }, null, null, Editor.ctrlKey + '+A');
	this.addAction('selectNone', function() { graph.clearSelection(); }, null, null, Editor.ctrlKey + '+Shift+A');
	this.addAction('lockUnlock', function()
	{
		if (!graph.isSelectionEmpty())
		{
			graph.getModel().beginUpdate();
			try
			{
				var defaultValue = graph.isCellMovable(graph.getSelectionCell()) ? 1 : 0;
				graph.toggleCellStyles(mxConstants.STYLE_MOVABLE, defaultValue);
				graph.toggleCellStyles(mxConstants.STYLE_RESIZABLE, defaultValue);
				graph.toggleCellStyles(mxConstants.STYLE_ROTATABLE, defaultValue);
				graph.toggleCellStyles(mxConstants.STYLE_DELETABLE, defaultValue);
				graph.toggleCellStyles(mxConstants.STYLE_EDITABLE, defaultValue);
				graph.toggleCellStyles('connectable', defaultValue);
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}, null, null, Editor.ctrlKey + '+L');

	// Navigation actions
	this.addAction('home', function() { graph.home(); }, null, null, 'Home');
	this.addAction('exitGroup', function() { graph.exitGroup(); }, null, null, Editor.ctrlKey + '+Shift+Home');
	this.addAction('enterGroup', function() { graph.enterGroup(); }, null, null, Editor.ctrlKey + '+Shift+End');
	this.addAction('collapse', function() { graph.foldCells(true); }, null, null, Editor.ctrlKey + '+Home');
	this.addAction('expand', function() { graph.foldCells(false); }, null, null, Editor.ctrlKey + '+End');
	
	// Arrange actions
	this.addAction('toFront', function() { graph.orderCells(false); }, null, null, Editor.ctrlKey + '+Shift+F');
	this.addAction('toBack', function() { graph.orderCells(true); }, null, null, Editor.ctrlKey + '+Shift+B');
	this.addAction('group', function()
	{
		if (graph.getSelectionCount() == 1)
		{
			graph.setCellStyles('container', '1');
		}
		else
		{
			graph.setSelectionCell(graph.groupCells(null, 0));
		}
	}, null, null, Editor.ctrlKey + '+G');
	this.addAction('ungroup', function()
	{
		if (graph.getSelectionCount() == 1 && graph.getModel().getChildCount(graph.getSelectionCell()) == 0)
		{
			graph.setCellStyles('container', '0');
		}
		else
		{
			graph.setSelectionCells(graph.ungroupCells());
		}
	}, null, null, Editor.ctrlKey + '+Shift+U');
	this.addAction('removeFromGroup', function() { graph.removeCellsFromParent(); });
	// Adds action
	this.addAction('edit', function()
	{
		if (graph.isEnabled())
		{
			graph.startEditingAtCell();
		}
	}, null, null, 'F2/Enter');
	this.addAction('editData...', function()
	{
		var cell = graph.getSelectionCell() || graph.getModel().getRoot();
		
		if (cell != null)
		{
			var dlg = new EditDataDialog(ui, cell);
			ui.showDialog(dlg.container, 320, 320, true, false, null, false);
			dlg.init();
		}
	}, null, null, Editor.ctrlKey + '+M');
	this.addAction('editTooltip...', function()
	{
		var graph = ui.editor.graph;
		
		if (graph.isEnabled() && !graph.isSelectionEmpty())
		{
			var cell = graph.getSelectionCell();
			var tooltip = '';
			
			if (mxUtils.isNode(cell.value))
			{
				var tmp = cell.value.getAttribute('tooltip');
				if (tmp != null)
				{
					tooltip = tmp;
				}
			}
			
	    	var dlg = new TextareaDialog(ui, mxResources.get('editTooltip') + ':', tooltip, function(newValue)
			{
				graph.setTooltipForCell(cell, newValue);
			});
			ui.showDialog(dlg.container, 320, 200, true, true);
			dlg.init();
		}
	});
	this.addAction('openLink', function()
	{
		var link = graph.getLinkForCell(graph.getSelectionCell());
		
		if (link != null)
		{
			window.open(link);
		}
	});
	this.addAction('editLink...', function()
	{
		var graph = ui.editor.graph;
		
		if (graph.isEnabled() && !graph.isSelectionEmpty())
		{
			var cell = graph.getSelectionCell();
			var value = graph.getLinkForCell(cell) || '';
			
			ui.showLinkDialog(value, mxResources.get('apply'), function(link)
			{
				link = mxUtils.trim(link);
    				graph.setLinkForCell(cell, (link.length > 0) ? link : null);
			});
		}
	});
	this.addAction('insertLink...', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			ui.showLinkDialog('', mxResources.get('insert'), function(link, docs)
			{
				link = mxUtils.trim(link);
				
				if (link.length > 0)
				{
					var icon = null;
					var title = link.substring(link.lastIndexOf('/') + 1);
					var pageLink = graph.isPageLink(link);
					
					if (pageLink)
					{
						var comma = link.indexOf(',');

						if (comma > 0)
						{
							var page = ui.getPageById(link.substring(comma + 1));
			
							if (page != null)
							{
								title = page.getName();
							}
							else
							{
								title = mxResources.get('pageNotFound');
							}
						}
					}
					
					if (docs != null && docs.length > 0)
					{
						icon = docs[0].iconUrl;
						title = docs[0].name || docs[0].type;
						title = title.charAt(0).toUpperCase() + title.substring(1);
						
						if (title.length > 30)
						{
							title = title.substring(0, 30) + '...';
						}
					}
					
					var pt = graph.getFreeInsertPoint();
	            		var linkCell = new mxCell(title, new mxGeometry(pt.x, pt.y, 100, 40),
		            	    	'fontColor=#0000EE;fontStyle=4;rounded=1;overflow=hidden;' + ((icon != null) ?
		            	    	'shape=label;imageWidth=16;imageHeight=16;spacingLeft=26;align=left;image=' + icon :
		            	    	'spacing=10;'));
	            	    linkCell.vertex = true;
	
	            	    graph.setLinkForCell(linkCell, link);
	            	    graph.cellSizeUpdated(linkCell, true);

	            		graph.getModel().beginUpdate();
	            		try
	            	    {
	            	    		linkCell = graph.addCell(linkCell);
	            	    		graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [linkCell]));
	            	    }
	            		finally
	            		{
	            			graph.getModel().endUpdate();
	            		}
	            		
	            	    graph.setSelectionCell(linkCell);
	            	    graph.scrollCellToVisible(graph.getSelectionCell());
				}
			});
		}
	}).isEnabled = isGraphEnabled;
	this.addAction('link...', mxUtils.bind(this, function()
	{
		var graph = ui.editor.graph;
		
		if (graph.isEnabled())
		{
			if (graph.cellEditor.isContentEditing())
			{
				var link = graph.getParentByName(graph.getSelectedElement(), 'A', graph.cellEditor.textarea);
				var oldValue = '';
				
				if (link != null)
				{
					oldValue = link.getAttribute('href') || '';
				}
				
				var selState = graph.cellEditor.saveSelection();
				
				ui.showLinkDialog(oldValue, mxResources.get('apply'), mxUtils.bind(this, function(value)
				{
			    		graph.cellEditor.restoreSelection(selState);
	
			    		if (value != null)
			    		{
			    			graph.insertLink(value);
					}
				}));
			}
			else if (graph.isSelectionEmpty())
			{
				this.get('insertLink').funct();
			}
			else
			{
				this.get('editLink').funct();
			}
		}
	})).isEnabled = isGraphEnabled;
	this.addAction('autosize', function()
	{
		var cells = graph.getSelectionCells();
		
		if (cells != null)
		{
			graph.getModel().beginUpdate();
			try
			{
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					
					if (graph.getModel().getChildCount(cell))
					{
						graph.updateGroupBounds([cell], 20);
					}
					else
					{
						var state = graph.view.getState(cell);
						var geo = graph.getCellGeometry(cell);

						if (graph.getModel().isVertex(cell) && state != null && state.text != null &&
							geo != null && graph.isWrapping(cell))
						{
							geo = geo.clone();
							geo.height = state.text.boundingBox.height / graph.view.scale;
							graph.getModel().setGeometry(cell, geo);
						}
						else
						{
							graph.updateCellSize(cell);
						}
					}
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}, null, null, Editor.ctrlKey + '+Shift+Y');
	this.addAction('formattedText', function()
	{
    	var state = graph.getView().getState(graph.getSelectionCell());
    	
    	if (state != null)
    	{
	    	var value = '1';
	    	graph.stopEditing();
			
			graph.getModel().beginUpdate();
			try
			{
		    	if (state.style['html'] == '1')
		    	{
		    		value = null;
		    		var label = graph.convertValueToString(state.cell);
		    		
		    		if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0')
					{
						// Removes newlines from HTML and converts breaks to newlines
						// to match the HTML output in plain text
						label = label.replace(/\n/g, '').replace(/<br\s*.?>/g, '\n');
					}
		    		
		    		// Removes HTML tags
	    			var temp = document.createElement('div');
	    			temp.innerHTML = label;
	    			label = mxUtils.extractTextWithWhitespace(temp.childNodes);
	    			
					graph.cellLabelChanged(state.cell, label);
		    	}
		    	else
		    	{
		    		// Converts HTML tags to text
		    		var label = mxUtils.htmlEntities(graph.convertValueToString(state.cell), false);
		    		
		    		if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0')
					{
						// Converts newlines in plain text to breaks in HTML
						// to match the plain text output
		    			label = label.replace(/\n/g, '<br/>');
					}
		    		
		    		graph.cellLabelChanged(state.cell, graph.sanitizeHtml(label));
		    	}
		
		       	graph.setCellStyles('html', value);
				ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['html'],
						'values', [(value != null) ? value : '0'], 'cells',
						graph.getSelectionCells()));
			}
			finally
			{
				graph.getModel().endUpdate();
			}
    	}
	});
	this.addAction('wordWrap', function()
	{
    	var state = graph.getView().getState(graph.getSelectionCell());
    	var value = 'wrap';
    	
		graph.stopEditing();
    	
    	if (state != null && state.style[mxConstants.STYLE_WHITE_SPACE] == 'wrap')
    	{
    		value = null;
    	}

       	graph.setCellStyles(mxConstants.STYLE_WHITE_SPACE, value);
	});
	this.addAction('rotation', function()
	{
		var value = '0';
    	var state = graph.getView().getState(graph.getSelectionCell());
    	
    	if (state != null)
    	{
    		value = state.style[mxConstants.STYLE_ROTATION] || value;
    	}

		var dlg = new FilenameDialog(ui, value, mxResources.get('apply'), function(newValue)
		{
			if (newValue != null && newValue.length > 0)
			{
				graph.setCellStyles(mxConstants.STYLE_ROTATION, newValue);
			}
		}, mxResources.get('enterValue') + ' (' + mxResources.get('rotation') + ' 0-360)');
		
		ui.showDialog(dlg.container, 375, 80, true, true);
		dlg.init();
	});
	// View actions
	this.addAction('resetView', function()
	{
		graph.zoomTo(1);
		ui.resetScrollbars();
	}, null, null, Editor.ctrlKey + '+H');
	this.addAction('zoomIn', function(evt) { graph.zoomIn(); }, null, null, Editor.ctrlKey + ' + (Numpad) / Alt+Mousewheel');
	this.addAction('zoomOut', function(evt) { graph.zoomOut(); }, null, null, Editor.ctrlKey + ' - (Numpad) / Alt+Mousewheel');
	this.addAction('fitWindow', function() { graph.fit(); }, null, null, Editor.ctrlKey + '+Shift+H');
	this.addAction('fitPage', mxUtils.bind(this, function()
	{
		if (!graph.pageVisible)
		{
			this.get('pageView').funct();
		}
		
		var fmt = graph.pageFormat;
		var ps = graph.pageScale;
		var cw = graph.container.clientWidth - 10;
		var ch = graph.container.clientHeight - 10;
		var scale = Math.floor(20 * Math.min(cw / fmt.width / ps, ch / fmt.height / ps)) / 20;
		graph.zoomTo(scale);
		
		if (mxUtils.hasScrollbars(graph.container))
		{
			var pad = graph.getPagePadding();
			graph.container.scrollTop = pad.y * graph.view.scale;
			graph.container.scrollLeft = Math.min(pad.x * graph.view.scale, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
		}
	}), null, null, Editor.ctrlKey + '+J');
	this.addAction('fitTwoPages', mxUtils.bind(this, function()
	{
		if (!graph.pageVisible)
		{
			this.get('pageView').funct();
		}
		
		var fmt = graph.pageFormat;
		var ps = graph.pageScale;
		var cw = graph.container.clientWidth - 10;
		var ch = graph.container.clientHeight - 10;
		
		var scale = Math.floor(20 * Math.min(cw / (2 * fmt.width) / ps, ch / fmt.height / ps)) / 20;
		graph.zoomTo(scale);
		
		if (mxUtils.hasScrollbars(graph.container))
		{
			var pad = graph.getPagePadding();
			graph.container.scrollTop = Math.min(pad.y, (graph.container.scrollHeight - graph.container.clientHeight) / 2);
			graph.container.scrollLeft = Math.min(pad.x, (graph.container.scrollWidth - graph.container.clientWidth) / 2);
		}
	}), null, null, Editor.ctrlKey + '+Shift+J');
	this.addAction('fitPageWidth', mxUtils.bind(this, function()
	{
		if (!graph.pageVisible)
		{
			this.get('pageView').funct();
		}
		
		var fmt = graph.pageFormat;
		var ps = graph.pageScale;
		var cw = graph.container.clientWidth - 10;

		var scale = Math.floor(20 * cw / fmt.width / ps) / 20;
		graph.zoomTo(scale);
		
		if (mxUtils.hasScrollbars(graph.container))
		{
			var pad = graph.getPagePadding();
			graph.container.scrollLeft = Math.min(pad.x * graph.view.scale,
				(graph.container.scrollWidth - graph.container.clientWidth) / 2);
		}
	}));
	this.put('customZoom', new Action(mxResources.get('custom') + '...', mxUtils.bind(this, function()
	{
		var dlg = new FilenameDialog(this.editorUi, parseInt(graph.getView().getScale() * 100), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
		{
			var val = parseInt(newValue);
			
			if (!isNaN(val) && val > 0)
			{
				graph.zoomTo(val / 100);
			}
		}), mxResources.get('zoom') + ' (%)');
		this.editorUi.showDialog(dlg.container, 300, 80, true, true);
		dlg.init();
	}), null, null, Editor.ctrlKey + '+0'));
	this.addAction('pageScale...', mxUtils.bind(this, function()
	{
		var dlg = new FilenameDialog(this.editorUi, parseInt(graph.pageScale * 100), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
		{
			var val = parseInt(newValue);
			
			if (!isNaN(val) && val > 0)
			{
				ui.setPageScale(val / 100);
			}
		}), mxResources.get('pageScale') + ' (%)');
		this.editorUi.showDialog(dlg.container, 300, 80, true, true);
		dlg.init();
	}));

	// Option actions
	var action = null;
	action = this.addAction('grid', function()
	{
		graph.setGridEnabled(!graph.isGridEnabled());
		ui.fireEvent(new mxEventObject('gridEnabledChanged'));
	}, null, null, Editor.ctrlKey + '+Shift+G');
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.isGridEnabled(); });
	action.setEnabled(false);
	
	action = this.addAction('guides', function()
	{
		graph.graphHandler.guidesEnabled = !graph.graphHandler.guidesEnabled;
		ui.fireEvent(new mxEventObject('guidesEnabledChanged'));
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.graphHandler.guidesEnabled; });
	action.setEnabled(false);
	
	action = this.addAction('tooltips', function()
	{
		graph.tooltipHandler.setEnabled(!graph.tooltipHandler.isEnabled());
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.tooltipHandler.isEnabled(); });
	
	action = this.addAction('collapseExpand', function()
	{
		var change = new ChangePageSetup(ui);
		change.ignoreColor = true;
		change.ignoreImage = true;
		change.foldingEnabled = !graph.foldingEnabled;
		
		graph.model.execute(change);
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.foldingEnabled; });
	action.isEnabled = isGraphEnabled;
	action = this.addAction('scrollbars', function()
	{
		ui.setScrollbars(!ui.hasScrollbars());
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.scrollbars; });
	action = this.addAction('pageView', mxUtils.bind(this, function()
	{
		ui.setPageVisible(!graph.pageVisible);
	}));
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.pageVisible; });
	action = this.addAction('connectionArrows', function()
	{
		graph.connectionArrowsEnabled = !graph.connectionArrowsEnabled;
		ui.fireEvent(new mxEventObject('connectionArrowsChanged'));
	}, null, null, 'Alt+Shift+A');
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.connectionArrowsEnabled; });
	action = this.addAction('connectionPoints', function()
	{
		graph.setConnectable(!graph.connectionHandler.isEnabled());
		ui.fireEvent(new mxEventObject('connectionPointsChanged'));
	}, null, null, 'Alt+Shift+P');
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.connectionHandler.isEnabled(); });
	action = this.addAction('copyConnect', function()
	{
		graph.connectionHandler.setCreateTarget(!graph.connectionHandler.isCreateTarget());
		ui.fireEvent(new mxEventObject('copyConnectChanged'));
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.connectionHandler.isCreateTarget(); });
	action.isEnabled = isGraphEnabled;
	action = this.addAction('autosave', function()
	{
		ui.editor.setAutosave(!ui.editor.autosave);
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return ui.editor.autosave; });
	action.isEnabled = isGraphEnabled;
	action.visible = false;
	
	// Help actions
	this.addAction('help', function()
	{
		var ext = '';
		
		if (mxResources.isLanguageSupported(mxClient.language))
		{
			ext = '_' + mxClient.language;
		}
		
		window.open(RESOURCES_PATH + '/help' + ext + '.html');
	});
	
	var showingAbout = false;
	
	this.put('about', new Action(mxResources.get('about') + ' Graph Editor...', function()
	{
		if (!showingAbout)
		{
			ui.showDialog(new AboutDialog(ui).container, 320, 280, true, true, function()
			{
				showingAbout = false;
			});
			
			showingAbout = true;
		}
	}, null, null, 'F1'));
	
	// Font style actions
	var toggleFontStyle = mxUtils.bind(this, function(key, style, fn, shortcut)
	{
		return this.addAction(key, function()
		{
			if (fn != null && graph.cellEditor.isContentEditing())
			{
				fn();
			}
			else
			{
				graph.stopEditing(false);
				
				graph.getModel().beginUpdate();
				try
				{
					graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, style);
					
					// Removes bold and italic tags and CSS styles inside labels
					if ((style & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD)
					{
						graph.updateLabelElements(graph.getSelectionCells(), function(elt)
						{
							elt.style.fontWeight = null;
							
							if (elt.nodeName == 'B')
							{
								graph.replaceElement(elt);
							}
						});
					}
					else if ((style & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC)
					{
						graph.updateLabelElements(graph.getSelectionCells(), function(elt)
						{
							elt.style.fontStyle = null;
							
							if (elt.nodeName == 'I')
							{
								graph.replaceElement(elt);
							}
						});
					}
					else if ((style & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE)
					{
						graph.updateLabelElements(graph.getSelectionCells(), function(elt)
						{
							elt.style.textDecoration = null;
							
							if (elt.nodeName == 'U')
							{
								graph.replaceElement(elt);
							}
						});
					}
				}
				finally
				{
					graph.getModel().endUpdate();
				}
			}
		}, null, null, shortcut);
	});
	
	toggleFontStyle('bold', mxConstants.FONT_BOLD, function() { document.execCommand('bold', false, null); }, Editor.ctrlKey + '+B');
	toggleFontStyle('italic', mxConstants.FONT_ITALIC, function() { document.execCommand('italic', false, null); }, Editor.ctrlKey + '+I');
	toggleFontStyle('underline', mxConstants.FONT_UNDERLINE, function() { document.execCommand('underline', false, null); }, Editor.ctrlKey + '+U');
	
	// Color actions
	this.addAction('fontColor...', function() { ui.menus.pickColor(mxConstants.STYLE_FONTCOLOR, 'forecolor', '000000'); });
	this.addAction('strokeColor...', function() { ui.menus.pickColor(mxConstants.STYLE_STROKECOLOR); });
	this.addAction('fillColor...', function() { ui.menus.pickColor(mxConstants.STYLE_FILLCOLOR); });
	this.addAction('gradientColor...', function() { ui.menus.pickColor(mxConstants.STYLE_GRADIENTCOLOR); });
	this.addAction('backgroundColor...', function() { ui.menus.pickColor(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'backcolor'); });
	this.addAction('borderColor...', function() { ui.menus.pickColor(mxConstants.STYLE_LABEL_BORDERCOLOR); });
	
	// Format actions
	this.addAction('vertical', function() { ui.menus.toggleStyle(mxConstants.STYLE_HORIZONTAL, true); });
	this.addAction('shadow', function() { ui.menus.toggleStyle(mxConstants.STYLE_SHADOW); });
	this.addAction('solid', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_DASHED, null);
			graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
				'values', [null, null], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('dashed', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
			graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
				'values', ['1', null], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('dotted', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
			graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, '1 4');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
				'values', ['1', '1 4'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('sharp', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
			graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
					'values', ['0', '0'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('rounded', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_ROUNDED, '1');
			graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
					'values', ['1', '0'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('toggleRounded', function()
	{
		if (!graph.isSelectionEmpty() && graph.isEnabled())
		{
			graph.getModel().beginUpdate();
			try
			{
				var cells = graph.getSelectionCells();
	    		var state = graph.view.getState(cells[0]);
	    		var style = (state != null) ? state.style : graph.getCellStyle(cells[0]);
	    		var value = (mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, '0') == '1') ? '0' : '1';
	    		
				graph.setCellStyles(mxConstants.STYLE_ROUNDED, value);
				graph.setCellStyles(mxConstants.STYLE_CURVED, null);
				ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
						'values', [value, '0'], 'cells', graph.getSelectionCells()));
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	});
	this.addAction('curved', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
			graph.setCellStyles(mxConstants.STYLE_CURVED, '1');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
					'values', ['0', '1'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('collapsible', function()
	{
		var state = graph.view.getState(graph.getSelectionCell());
		var value = '1';
		
		if (state != null && graph.getFoldingImage(state) != null)
		{
			value = '0';	
		}
		
		graph.setCellStyles('collapsible', value);
		ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['collapsible'],
				'values', [value], 'cells', graph.getSelectionCells()));
	});
	this.addAction('editStyle...', mxUtils.bind(this, function()
	{
		var cells = graph.getSelectionCells();
		
		if (cells != null && cells.length > 0)
		{
			var model = graph.getModel();
			
	    	var dlg = new TextareaDialog(this.editorUi, mxResources.get('editStyle') + ':',
	    			model.getStyle(cells[0]) || '', function(newValue)
			{
	    		if (newValue != null)
				{
					graph.setCellStyle(mxUtils.trim(newValue), cells);
				}
			}, null, null, 400, 220);
			this.editorUi.showDialog(dlg.container, 420, 300, true, true);
			dlg.init();
		}
	}), null, null, Editor.ctrlKey + '+E');
	this.addAction('setAsDefaultStyle', function()
	{
		if (graph.isEnabled() && !graph.isSelectionEmpty())
		{
			ui.setDefaultStyle(graph.getSelectionCell());
		}
	}, null, null, Editor.ctrlKey + '+Shift+D');
	this.addAction('clearDefaultStyle', function()
	{
		if (graph.isEnabled())
		{
			ui.clearDefaultStyle();
		}
	}, null, null, Editor.ctrlKey + '+Shift+R');
	this.addAction('addWaypoint', function()
	{
		var cell = graph.getSelectionCell();
		
		if (cell != null && graph.getModel().isEdge(cell))
		{
			var handler = editor.graph.selectionCellsHandler.getHandler(cell);
			
			if (handler instanceof mxEdgeHandler)
			{
				var t = graph.view.translate;
				var s = graph.view.scale;
				var dx = t.x;
				var dy = t.y;
				
				var parent = graph.getModel().getParent(cell);
				var pgeo = graph.getCellGeometry(parent);
				
				while (graph.getModel().isVertex(parent) && pgeo != null)
				{
					dx += pgeo.x;
					dy += pgeo.y;
					
					parent = graph.getModel().getParent(parent);
					pgeo = graph.getCellGeometry(parent);
				}
				
				var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
				var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));
				
				handler.addPointAt(handler.state, x, y);
			}
		}
	});
	this.addAction('removeWaypoint', function()
	{
		// TODO: Action should run with "this" set to action
		var rmWaypointAction = ui.actions.get('removeWaypoint');
		
		if (rmWaypointAction.handler != null)
		{
			// NOTE: Popupevent handled and action updated in Menus.createPopupMenu
			rmWaypointAction.handler.removePoint(rmWaypointAction.handler.state, rmWaypointAction.index);
		}
	});
	this.addAction('clearWaypoints', function()
	{
		var cells = graph.getSelectionCells();
		
		if (cells != null)
		{
			cells = graph.addAllEdges(cells);
			
			graph.getModel().beginUpdate();
			try
			{
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					
					if (graph.getModel().isEdge(cell))
					{
						var geo = graph.getCellGeometry(cell);
			
						if (geo != null)
						{
							geo = geo.clone();
							geo.points = null;
							graph.getModel().setGeometry(cell, geo);
						}
					}
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}, null, null, 'Alt+Shift+C');
	action = this.addAction('subscript', mxUtils.bind(this, function()
	{
	    if (graph.cellEditor.isContentEditing())
	    {
			document.execCommand('subscript', false, null);
		}
	}), null, null, Editor.ctrlKey + '+,');
	action = this.addAction('superscript', mxUtils.bind(this, function()
	{
	    if (graph.cellEditor.isContentEditing())
	    {
			document.execCommand('superscript', false, null);
		}
	}), null, null, Editor.ctrlKey + '+.');
	this.addAction('image...', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			var title = mxResources.get('image') + ' (' + mxResources.get('url') + '):';
		    	var state = graph.getView().getState(graph.getSelectionCell());
		    	var value = '';
		    	
		    	if (state != null)
		    	{
		    		value = state.style[mxConstants.STYLE_IMAGE] || value;
		    	}
		    	
		    	var selectionState = graph.cellEditor.saveSelection();
		    	
		    	ui.showImageDialog(title, value, function(newValue, w, h)
			{
		    		// Inserts image into HTML text
		    		if (graph.cellEditor.isContentEditing())
		    		{
		    			graph.cellEditor.restoreSelection(selectionState);
		    			graph.insertImage(newValue, w, h);
		    		}
		    		else
		    		{
					var cells = graph.getSelectionCells();
					
					if (newValue != null && (newValue.length > 0 || cells.length > 0))
					{
						var select = null;
						
						graph.getModel().beginUpdate();
				        	try
				        	{
				        		// Inserts new cell if no cell is selected
				    			if (cells.length == 0)
				    			{
				    				var pt = graph.getFreeInsertPoint();
				    				cells = [graph.insertVertex(graph.getDefaultParent(), null, '', pt.x, pt.y, w, h,
				    						'shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;')];
				    				select = cells;
			            	    		graph.fireEvent(new mxEventObject('cellsInserted', 'cells', select));
				    			}
				    			
				        		graph.setCellStyles(mxConstants.STYLE_IMAGE, (newValue.length > 0) ? newValue : null, cells);
				        		
				        		// Sets shape only if not already shape with image (label or image)
				        		var state = graph.view.getState(cells[0]);
				        		var style = (state != null) ? state.style : graph.getCellStyle(cells[0]);
				        		
				        		if (style[mxConstants.STYLE_SHAPE] != 'image' && style[mxConstants.STYLE_SHAPE] != 'label')
				        		{
				        			graph.setCellStyles(mxConstants.STYLE_SHAPE, 'image', cells);
				        		}
				        		else if (newValue.length == 0)
				        		{
				        			graph.setCellStyles(mxConstants.STYLE_SHAPE, null, cells);
				        		}
					        	
					        	if (graph.getSelectionCount() == 1)
					        	{
						        	if (w != null && h != null)
						        	{
						        		var cell = cells[0];
						        		var geo = graph.getModel().getGeometry(cell);
						        		
						        		if (geo != null)
						        		{
						        			geo = geo.clone();
							        		geo.width = w;
							        		geo.height = h;
							        		graph.getModel().setGeometry(cell, geo);
						        		}
						        	}
					        	}
				        	}
				        	finally
				        	{
				        		graph.getModel().endUpdate();
				        	}
				        	
				        	if (select != null)
				        	{
				        		graph.setSelectionCells(select);
				        		graph.scrollCellToVisible(select[0]);
				        	}
					}
		    		}
			}, graph.cellEditor.isContentEditing(), !graph.cellEditor.isContentEditing());
		}
	}).isEnabled = isGraphEnabled;
	this.addAction('insertImage...', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			graph.clearSelection();
			ui.actions.get('image').funct();
		}
	}).isEnabled = isGraphEnabled;
	action = this.addAction('layers', mxUtils.bind(this, function()
	{
		if (this.layersWindow == null)
		{
			// LATER: Check outline window for initial placement
			this.layersWindow = new LayersWindow(ui, document.body.offsetWidth - 280, 120, 220, 180);
			this.layersWindow.window.addListener('show', function()
			{
				ui.fireEvent(new mxEventObject('layers'));
			});
			this.layersWindow.window.addListener('hide', function()
			{
				ui.fireEvent(new mxEventObject('layers'));
			});
			this.layersWindow.window.setVisible(true);
			ui.fireEvent(new mxEventObject('layers'));
		}
		else
		{
			this.layersWindow.window.setVisible(!this.layersWindow.window.isVisible());
		}
	}), null, null, Editor.ctrlKey + '+Shift+L');
	action.setToggleAction(true);
	action.setSelectedCallback(mxUtils.bind(this, function() { return this.layersWindow != null && this.layersWindow.window.isVisible(); }));
	action = this.addAction('formatPanel', mxUtils.bind(this, function()
	{
		ui.toggleFormatPanel();
	}), null, null, Editor.ctrlKey + '+Shift+P');
	action.setToggleAction(true);
	action.setSelectedCallback(mxUtils.bind(this, function() { return ui.formatWidth > 0; }));
	action = this.addAction('outline', mxUtils.bind(this, function()
	{
		if (this.outlineWindow == null)
		{
			// LATER: Check layers window for initial placement
			this.outlineWindow = new OutlineWindow(ui, document.body.offsetWidth - 260, 100, 180, 180);
			this.outlineWindow.window.addListener('show', function()
			{
				ui.fireEvent(new mxEventObject('outline'));
			});
			this.outlineWindow.window.addListener('hide', function()
			{
				ui.fireEvent(new mxEventObject('outline'));
			});
			this.outlineWindow.window.setVisible(true);
			ui.fireEvent(new mxEventObject('outline'));
		}
		else
		{
			this.outlineWindow.window.setVisible(!this.outlineWindow.window.isVisible());
		}
	}), null, null, Editor.ctrlKey + '+Shift+O');
	
	action.setToggleAction(true);
	action.setSelectedCallback(mxUtils.bind(this, function() { return this.outlineWindow != null && this.outlineWindow.window.isVisible(); }));
	this.addAction('lockComponent', mxUtils.bind(this,function(event) {
		//Restricting Click event when lock icon was disabled
		var lockIcon = $(event.target).parent();
		if(lockIcon.hasClass('mxDisabled') || Agnity.hasLockAcquired())
		{
			return false;
		}

		var forestName;
		var componentDiagram = Agnity.getUrlParam('diagram');
		var domainName = Agnity.getDomainName();
		var diagramName;
		if(Agnity.isComponentDiagram())
		{
			forestName = Agnity.getComponentData(agnityGlobalData.ui).forestName;
			diagramName = urlParams.componentName == undefined ? Agnity.getComponentData(agnityGlobalData.ui).componentName : urlParams.componentName;
		}
		else if(Agnity.isTreeDiagram() || Agnity.isProcessDiagram())
		{
			forestName = Agnity.getTreeData(agnityGlobalData.ui).forestName;
			diagramName = urlParams.treeName == undefined ? Agnity.getTreeData(agnityGlobalData.ui).treeName : urlParams.treeName;
		}
		else if(Agnity.isDBSchemaDiagram())
		{
			forestName = Agnity.getComponentData(agnityGlobalData.ui).forestName;
		}
		var lockOperation = new AgnityLockObject(forestName, componentDiagram, diagramName, domainName);
		lockOperation.doLock(function(response)
		{
			agnityGlobalData.sendMessageToParent('LockStatusChange',{'lock': JSON.parse(response.lock)});
		});

	}), null, null, null);
	this.addAction('unLockComponent', mxUtils.bind(this,function() {
		//Restricting Click event when unlock icon was disabled
		var unlockIcon = $(event.target).parent();
		if(unlockIcon.hasClass('mxDisabled') || !Agnity.hasLockAcquired())
		{
			return false;
		}
		var forestName = Agnity.getDefaultForestName();
		var componentDiagram = Agnity.getUrlParam('diagram');
		var domainName = Agnity.getDomainName();
		var diagramName;

		if(Agnity.isComponentDiagram())
		{
			diagramName = urlParams.componentName;
		}
		else if(Agnity.isTreeDiagram() || Agnity.isProcessDiagram())
		{
			diagramName = urlParams.treeName;
		}

		let isExecuted = confirm("Are you sure to unlock " + componentDiagram + "?");
		if(isExecuted)
		{
			var lock  = new AgnityUnLockObject(forestName, componentDiagram, diagramName, domainName);
			lock.unlockObject(false, function(response)
			{
				agnityGlobalData.sendMessageToParent('LockStatusChange',{'lock' :JSON.parse(response.lock)});
			});
		}

	}), null, null, null);
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.addAction = function(key, funct, enabled, iconCls, shortcut)
{
	var title;
	
	if (key.substring(key.length - 3) == '...')
	{
		key = key.substring(0, key.length - 3);
		title = mxResources.get(key) + '...';
	}
	else
	{
		title = mxResources.get(key);
	}
	
	return this.put(key, new Action(title, funct, enabled, iconCls, shortcut));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.put = function(name, action)
{
	this.actions[name] = action;
	
	return action;
};

/**
 * Returns the action for the given name or null if no such action exists.
 */
Actions.prototype.get = function(name)
{
	return this.actions[name];
};

/**
 * Constructs a new action for the given parameters.
 */
function Action(label, funct, enabled, iconCls, shortcut)
{
	mxEventSource.call(this);
	this.label = label;
	this.funct = this.createFunction(funct);
	this.enabled = (enabled != null) ? enabled : true;
	this.iconCls = iconCls;
	this.shortcut = shortcut;
	this.visible = true;
};

// Action inherits from mxEventSource
mxUtils.extend(Action, mxEventSource);

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.createFunction = function(funct)
{
	return funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setEnabled = function(value)
{
	if (this.enabled != value)
	{
		this.enabled = value;
		this.fireEvent(new mxEventObject('stateChanged'));
	}
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isEnabled = function()
{
	return this.enabled;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setToggleAction = function(value)
{
	this.toggleAction = value;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setSelectedCallback = function(funct)
{
	this.selectedCallback = funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isSelected = function()
{
	return this.selectedCallback();
};
