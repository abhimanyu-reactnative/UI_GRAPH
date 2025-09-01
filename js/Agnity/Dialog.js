function AgnityHelpDialog(ui, inNodeName) {
	this.parentDiv = null;
	this.nodeName = inNodeName;
    
	this.setupContainer = function() {
		var self = this;
		const help_mapping = new Map([
		 	["NODE_START",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Start_Node.htm"],
			["NODE_CDR",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Save_CDR_Node.htm"],
			["NODE_ASSIGN",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Assignment_Node.htm"],
			["NODE_DB_QUERY",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/DB_Call_Node.htm"],
			["NODE_FUNCTION",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Condition_Node.htm"],
			["NODE_EXPRESSION" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Expression_Node.htm"],
			["NODE_GOTO",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Connect_Node.htm"],
			["NODE_PLAYCOLLECT",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Play_and_Collect_Node.htm"],
			["NODE_PLAY",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Play_Node.htm"],
			["NODE_SOAP_QUERY",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/External_Call_Node.htm"],
			["NODE_SWITCH",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Switch_Node.htm"],
			["NODE_ROUTECALL",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Route_Call_Node.htm"],
			["NODE_TERMINATECALL",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Terminate_Node.htm"],
			["NODE_TIME_PATTERN",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_ORIGIN_PATTERN",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_CREATE_CONF",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Create_Conference_Node.htm"],
			["NODE_DESTROY_CONF",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Destroy_Conference_Node.htm"],
			["NODE_RECORD",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Record_Node.htm"],
			["NODE_STOP_MEDIA",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Stop_Media_Node.htm"],
			["NODE_EVENT_HANDLER",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Event_Handler_Node.htm"],
			["NODE_CREATE_TIMER",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Create_Timer_Node.htm"],
			["NODE_BLOCKED_PHONE_LIST",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_CALL_AREA_SCREENING",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_DIALED_PATTERN",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_PERCENTAGE",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_STOP_TIMER",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Stop_Timer_Node.htm"],
			["NODE_CALL_HOLD",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Hold_Node.htm"],
			["NODE_ACCOUNT_CODE",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_DIGIT_PATTERN",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_PROCESS",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Process_Call_Node.htm"],
			["NODE_PROCESS_START",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Start_Node.htm"],
			["NODE_RETURN",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/General_Assets.htm"],
			["NODE_RESYNC_CALL",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Resync_Call_Node.htm"],
			["NODE_DIALOUTCALL",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_SEND_ALARM",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Send_Alarm_Node.htm"],
			["NODE_ENDEXECUTION",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/End_Execution_Node.htm"],
			["NODE_EMAIL",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Send_Email_Node.htm"],
			["NODE_TEXT_SMS",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Send_SMS_Node.htm"],
			["NODE_ROUTING_ENGINE",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Routing_Engine_Node.htm"],
			["NODE_ROUTE_PLAY",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/RE_Route_Play_Node.htm"],
			["NODE_ROUTE_PLAYCOLLECT",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/RE_Route_Play_Collect_Node.htm"],
			["NODE_ROUTE",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/RE_Route_Node.htm"],
			["NODE_APPLY_CHARGING",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_ACG",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Automatic_Code_Gapping_Node.htm"],
			["NODE_TC_RULE",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_TUI",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/TUI_Node.htm"],
			["NODE_ENUMSERVICE",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_AVPR",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_AVPW",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_DIAMETER_CCR",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_DIAMETER_CCA",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_SIP_HEADER",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_ECHO",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Enterprise_Assets.htm"],
			["NODE_SMPP",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_CCB",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_ATI",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_UDR",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_SERVICE_CHAINING",  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_CHECKPOINT" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_FORCE_CALL_CLEANUP" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Call_Assets.htm"],
			["NODE_GDI" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/GDI_Node.htm"],
			["NODE_TREE" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/ADE_Components.htm"],
			["NODE_FUNCTION_BLOCK" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/ADE_Components.htm"],
			["NODE_SEQUENCE" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/05_mngEmbeddedSAS/Creating_Database_Schema.htm"],
			["NODE_TABLE" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/05_mngEmbeddedSAS/Creating_Database_Schema.htm"],
			["NODE_VIEW" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/05_mngEmbeddedSAS/Creating_Database_Schema.htm"],
			["NODE_USER_TYPE" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/05_mngEmbeddedSAS/Creating_Database_Schema.htm"],
		 	["NODE_MEASUREMENT_SET" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/NODE_MEASUREMENT_SET.htm"],
		 	["NODE_PEG_COUNT", "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/NODE_PEG_COUNT.htm"],
			["NODE_MEASUREMENT_SET" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/NODE_MEASUREMENT_SET.htm"],
			["NODE_INITIATE_SS7_CALL", "../help/aconyx_ade/Responsive HTML5/aconyx_ade/A_compProperties/Node_InitiateSS7_Calls.htm"],
			["NODE_PLAYSPEECH" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Play_Speech.htm"],
			["NODE_LOGGING" ,  "../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/A_compProperties/Node_Logging.htm"]  

		]);

		
		this.parentDiv = document.createElement('div');
		headingDiv = document.createElement('div');
		headingDiv.id = "headingDiv";
		headingDiv.setAttribute('class', 'AgnityDialogHeadingDiv');
		var contentDiv = document.createElement('center');
		contentDiv.textContent = "Help";
		headingDiv.appendChild(contentDiv);


		this.parentDiv.setAttribute('class', 'AgnityDialogDiv');

		var agnityIframe = document.createElement('iframe');
		agnityIframe.setAttribute('class', 'AgnityIFrame');
		var helpUrl = '../help/aconyx_ade/Responsive%20HTML5/aconyx_ade/02_getStarted/Understanding_the_Application_Building_Blocks.htm';
		if(help_mapping.has(self.nodeName)) {
			helpUrl = help_mapping.get(self.nodeName);
		}
		console.log("Opening help document for " + self.nodeName + " : " + helpUrl);
		agnityIframe.setAttribute('src', helpUrl);

		this.parentDiv.id = "parentDivId";
		this.parentDiv.appendChild(headingDiv);
		$('#parentDivId').load(helpUrl);
		this.parentDiv.appendChild(agnityIframe);
	}
};

function AgnityUnsetAssignmentDialog(ui, inAssignNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.assignNodeData = inAssignNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AssignUnsetVariable();
	this.listModel = null;

	this.setupDetailPanel = function() {
		var self = this;

		var fromSelector = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, fromSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.from, 'variable', function() {
			self.currVal.from = this.value;
		}));

	}

	this.saveCurrVal = function() {
		this.assignNodeData.assignUnsetVariables.push(this.currVal);
		this.currVal = new AssignUnsetVariable();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.assignNodeData.assignUnsetVariables, ['from']);

		this.dialogHelper.setRelatedListing([{ 'name': 'variable', 'width': '75%' }, { 'name': 'action', 'width': '25%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.assignNodeData.assignUnsetVariables.splice(row, 1);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('assignUnsetVarSetting');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.assignNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}

};

function AgnityPlayItemDialog(ui, inPlayNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.playNodeData = inPlayNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityPlayItem();
	this.listModel = null;
	this.currRow = -1;

	this.announcementTypeMapping = agnityGlobalData.mappingData.playAnnouncementTypeMapping;
	this.typeMapping = agnityGlobalData.mappingData.playTypeMapping;
	this.subTypeMapping = agnityGlobalData.mappingData.playSubTypeMapping;
	this.dateTypeMapping = agnityGlobalData.mappingData.playDateTypeMapping;
	this.digitTypeMapping = agnityGlobalData.mappingData.playDigitTypeMapping;
	this.durationTypeMapping = agnityGlobalData.mappingData.playDurationTypeMapping;
	this.moneyTypeMapping = agnityGlobalData.mappingData.playMoneyTypeMapping;
	this.numberTypeMapping = agnityGlobalData.mappingData.playNumberTypeMapping;
	this.timeTypeMapping = agnityGlobalData.mappingData.playTimeTypeMapping;
	this.staticAnnTypeMapping = agnityGlobalData.mappingData.playStaticAnnTypeMapping;
	this.languageMapping = agnityGlobalData.mappingData.languageMapping;
	this.languageMapping = agnityGlobalData.mappingData.languageMapping;

	this.emptyFieldRow = Agnity.createFieldRow();

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDropDownRowField(this.announcementTypeMapping, this.currVal.playType, 'announcementType', function() {
			var prevVal = self.currVal.playType;
			self.currVal.playType = this.value;
			self.setupDetailPanel();
		}));

		if (this.currVal.playType == 'Variable Announcement') {
			var nameSelector = new AgnityDynamicDropDownHelper();
			this.dialogHelper.addPanelToDetailPageGrid(0, 1, nameSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.variable, 'variable', function() {
				self.currVal.variable = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.typeMapping, this.currVal.type, 'type', function() {
				self.currVal.type = this.value;
				self.setupDetailPanel();
			}));

			if (this.currVal.type == 'date') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.dateTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'digit') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.digitTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'duration' || this.currVal.type == 'month' || this.currVal.type == 'silence' || this.currVal.type == 'string' || this.currVal.type == 'weekday') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.durationTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'money') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.moneyTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'number') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.numberTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'time') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.timeTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createDropDownRowField(this.languageMapping, this.currVal.language, 'language', function() {
				self.currVal.language = this.value;
			}));
		}
		else if (this.currVal.playType == 'Static Announcement') {
			this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createDropDownRowField(this.staticAnnTypeMapping, this.currVal.staticAnnType, 'annType', function() {
				self.currVal.staticAnnType = this.value;
			}));

			var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.playNodeData.ui);
			selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.value, 'value', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.value = value; }, 1, 0, 1, 1);

			this.dialogHelper.addPanelToDetailPageGrid(2, 0, this.emptyFieldRow[0]);
		}
		else if (this.currVal.playType == 'SMS Announcement') {
			this.dialogHelper.clearDetailPageGridPanel(0, 1);
			this.dialogHelper.clearDetailPageGridPanel(1, 1);
			var smsVariableSelector = new AgnityDynamicDropDownHelper();
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, smsVariableSelector.setupWidget(new AgnityGetSMSVariableHelper(Agnity.getTreeData(ui).forestName, null, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.smsVariable, 'smsVariable', function() {
				self.currVal.smsVariable = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(2, 0, this.emptyFieldRow[0]);
		}

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.emptyOtherVals = function() {
		if (this.currVal.playType == 'Static Announcement') {
			this.currVal.type = '';
			this.currVal.subtype = '';
			this.currVal.variable = '';
			this.currVal.smsVariable = '';
		}
		else if (this.currVal.playType == 'SMS Announcement') {
			this.currVal.type = '';
			this.currVal.subtype = '';
			this.currVal.variable = '';
			this.currVal.staticAnnType = '';
			this.currVal.valueType = '';
			this.currVal.value = '';
		}
		else if (this.currVal.playType == 'Variable Announcement') {
			this.currVal.staticAnnType = '';
			this.currVal.valueType = '';
			this.currVal.value = '';
			this.currVal.smsVariable = '';
		}
	}

	this.saveCurrVal = function() {
		this.emptyOtherVals();
		this.playNodeData.playItems.push(this.currVal);
		this.currVal = new AgnityPlayItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.emptyOtherVals();
		this.playNodeData.playItems.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityPlayItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.playNodeData.playItems, [['playType', this.announcementTypeMapping], 'smsVariable', 'variable', ['type', this.typeMapping], ['subtype', this.subTypeMapping], ['staticAnnType', this.staticAnnTypeMapping], ['valueType', agnityGlobalData.valueType], 'value']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'announcementType', 'width': '12%' }, { 'name': 'smsVariable', 'width': '14%' },
		{ 'name': 'variable', 'width': '14%' }, { 'name': 'type', 'width': '8%' },
		{ 'name': 'subType', 'width': '8%' }, { 'name': 'staticAnnType', 'width': '8%' }, { 'name': 'valueType', 'width': '13%' },
		{ 'name': 'value', 'width': '15%' }, { 'name': 'action', 'width': '8%' },
		], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.playNodeData.playItems.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityPlayItem();
			this.playNodeData.playItems.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('playItemDialog');
		this.dialogHelper.setDetailPageGrid(3, 2);
		this.setupDetailPanel();
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.playNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};


function AgnityMessageParameterDialog(ui, inSs7NodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.ss7CallNodeData = inSs7NodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnitySs7CallInitiateItem();
	this.listModel = null;
	this.currRow = -1;

	this.protocolVersionMapping = agnityGlobalData.mappingData.protocolVersionMapping;
	this.appContextIdentifierMapping = agnityGlobalData.mappingData.appContextIdentifierMapping;
	this.appContextNameMapping = agnityGlobalData.mappingData.appContextNameMapping;
	this.userInformationIdentifierMapping = agnityGlobalData.mappingData.userInformationIdentifierMapping;
	this.userInformationMapping = agnityGlobalData.mappingData.userInformationMapping;

	this.emptyFieldRow = Agnity.createFieldRow();

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDropDownRowField(this.protocolVersionMapping, this.currVal.protocolVersion, 'protocolVersion', function() {
			var prevVal = self.currVal.protocolVersion;
			self.currVal.protocolVersion = this.value;
			self.setupDetailPanel();
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.appContextIdentifierMapping, this.currVal.appContextIdentifier, 'appContextIdentifier', function() {
			var prevVal = self.currVal.appContextIdentifier;
			self.currVal.appContextIdentifier = this.value;
			self.setupDetailPanel();
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.appContextNameMapping, this.currVal.appContextName, 'appContextName', function() {
			var prevVal = self.currVal.appContextName;
			self.currVal.appContextName = this.value;
			self.setupDetailPanel();
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createDropDownRowField(this.userInformationIdentifierMapping, this.currVal.userInformationIdentifier, 'userInformationIdentifier', function() {
			var prevVal = self.currVal.userInformationIdentifier;
			self.currVal.userInformationIdentifier = this.value;
			self.setupDetailPanel();
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 1, Agnity.createDropDownRowField(this.userInformationMapping, this.currVal.userInformation, 'userInformation', function() {
			var prevVal = self.currVal.userInformation;
			self.currVal.userInformation = this.value;
			self.setupDetailPanel();
		}));

		

		

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.emptyOtherVals = function() {
		if (this.currVal.playType == 'Static Announcement') {
			this.currVal.type = '';
			this.currVal.subtype = '';
			this.currVal.variable = '';
			this.currVal.smsVariable = '';
		}
		else if (this.currVal.playType == 'SMS Announcement') {
			this.currVal.type = '';
			this.currVal.subtype = '';
			this.currVal.variable = '';
			this.currVal.staticAnnType = '';
			this.currVal.valueType = '';
			this.currVal.value = '';
		}
		else if (this.currVal.playType == 'Variable Announcement') {
			this.currVal.staticAnnType = '';
			this.currVal.valueType = '';
			this.currVal.value = '';
			this.currVal.smsVariable = '';
		}
	}

	this.saveCurrVal = function() {
		this.emptyOtherVals();
		this.ss7CallNodeData.messageParameters.push(this.currVal);
		this.currVal = new AgnitySs7CallInitiateItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.emptyOtherVals();
		this.ss7CallNodeData.messageParameters.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnitySs7CallInitiateItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.ss7CallNodeData.messageParameters, 
			[
				['protocolVersion', this.protocolVersionMapping],
				['appContextIdentifier', this.appContextIdentifierMapping],
				['appContextName', this.appContextNameMapping],
				['userInformationIdentifier', this.userInformationIdentifierMapping],
				['userInformation', this.userInformationMapping],
			]
			);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([
			{'name': 'protocolVersion', 'width': '15%'},
			{'name': 'appContextIdentifier', 'width': '20%'},
			{'name': 'appContextName', 'width': '15%'},
			{'name': 'userInformationIdentifier', 'width': '20%'},
			{'name': 'userInformation', 'width': '20%'},
			{ 'name': 'action', 'width': '10%' }
		], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.ss7CallNodeData.messageParameters.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnitySs7CallInitiateItem();
			
			// setting default values
			entry.protocolVersion = this.protocolVersionMapping[0][1] || ""
			entry.appContextIdentifier = this.appContextIdentifierMapping[0][1] || ""
			entry.appContextName = this.appContextNameMapping[0][1] || ""
			entry.userInformationIdentifier = this.userInformationIdentifierMapping[0][1] || ""
			entry.userInformation = this.userInformationMapping[0][1] || ""

			this.ss7CallNodeData.messageParameters.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('messageParameter_config');
		this.dialogHelper.setDetailPageGrid(3, 2);
		this.setupDetailPanel();
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.ss7CallNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityPlayAndCollectNodeItemDialog(ui, inPlayAndCollectNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.playAndCollectNodeData = inPlayAndCollectNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityPlayCollectItem();
	this.currRow = -1;
	this.listModel = null;

	this.announcementTypeMapping = agnityGlobalData.mappingData.playCollectAnnouncementTypeMapping;
	this.staticAnnTypeMapping = agnityGlobalData.mappingData.playCollectStaticAnnTypeMapping;
	this.typeMapping = agnityGlobalData.mappingData.playTypeMapping;
	this.subTypeMapping = agnityGlobalData.mappingData.playSubTypeMapping;
	this.dateTypeMapping = agnityGlobalData.mappingData.playDateTypeMapping;
	this.digitTypeMapping = agnityGlobalData.mappingData.playDigitTypeMapping;
	this.durationTypeMapping = agnityGlobalData.mappingData.playDurationTypeMapping;
	this.moneyTypeMapping = agnityGlobalData.mappingData.playMoneyTypeMapping;
	this.numberTypeMapping = agnityGlobalData.mappingData.playNumberTypeMapping;
	this.timeTypeMapping = agnityGlobalData.mappingData.playTimeTypeMapping;
	this.languageMapping = agnityGlobalData.mappingData.languageMapping;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDropDownRowField(this.announcementTypeMapping, this.currVal.playType, 'announcementType', function() {
			var prevVal = self.currVal.playType;
			self.currVal.playType = this.value;
			self.setupDetailPanel();
		}));

		if (this.currVal.playType == 'Variable Announcement') {
			var nameSelector = new AgnityDynamicDropDownHelper();
			this.dialogHelper.addPanelToDetailPageGrid(0, 1, nameSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.variable, 'variable', function() {
				self.currVal.variable = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.typeMapping, this.currVal.type, 'type', function() {
				self.currVal.type = this.value;
				self.setupDetailPanel();
			}));

			if (this.currVal.type == 'date') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.dateTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'digit') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.digitTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'duration' || this.currVal.type == 'month' || this.currVal.type == 'silence' || this.currVal.type == 'string' || this.currVal.type == 'weekday') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.durationTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'money') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.moneyTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'number') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.numberTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			else if (this.currVal.type == 'time') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.timeTypeMapping, this.currVal.subtype, 'subType', function() {
					self.currVal.subtype = this.value;
				}));
			}
			this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(this.languageMapping, this.currVal.language, 'language', function() {
				self.currVal.language = this.value;
			}));
		}
		else if (this.currVal.playType == 'Static Announcement') {
			this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createCheckboxRowField(this.currVal.isRetry, 'isRetry', function() {
				self.currVal.isRetry = this.checked;
			}));

			this.dialogHelper.clearDetailPageGridPanel(0, 2);

			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.staticAnnTypeMapping, this.currVal.staticAnnType, 'annType', function() {
				self.currVal.staticAnnType = this.value;
			}));

			var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.playAndCollectNodeData.ui);
			selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.value, 'value', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.value = value; }, 1, 1, 1, 2);
		}
		else if (this.currVal.playType == 'SMS Announcement') {
			this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createCheckboxRowField(this.currVal.isRetry, 'isRetry', function() {
				self.currVal.isRetry = this.checked;
			}));

			this.dialogHelper.clearDetailPageGridPanel(0, 2);

			this.dialogHelper.clearDetailPageGridPanel(1, 1);
			this.dialogHelper.clearDetailPageGridPanel(1, 2);
			var smsVariableSelector = new AgnityDynamicDropDownHelper();
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, smsVariableSelector.setupWidget(new AgnityGetSMSVariableHelper(Agnity.getTreeData(ui).forestName, null, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.smsVariable, 'smsVariable', function() {
				self.currVal.smsVariable = this.value;
			}));
		}

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.emptyOtherVals = function() {
		if (this.currVal.playType == 'Static Announcement') {
			this.currVal.smsVariable = '';
			this.currVal.variable = '';
			this.currVal.language = '';
			this.currVal.type = '';
			this.currVal.subtype = '';
		}
		else if (this.currVal.playType == 'SMS Announcement') {
			this.currVal.staticAnnType = '';
			this.currVal.valueType = '';
			this.currVal.value = '';
			this.currVal.variable = '';
			this.currVal.language = '';
			this.currVal.type = '';
			this.currVal.subtype = '';
		}
		else if (this.currVal.playType == 'Variable Announcement') {
			this.currVal.staticAnnType = '';
			this.currVal.valueType = '';
			this.currVal.value = '';
			this.currVal.smsVariable = '';
			this.currVal.isRetry = false;
		}
	}

	this.saveCurrVal = function() {
		this.emptyOtherVals();
		this.playAndCollectNodeData.playItems.push(this.currVal);
		this.currVal = new AgnityPlayCollectItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.emptyOtherVals();
		this.playAndCollectNodeData.playItems.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityPlayCollectItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.playAndCollectNodeData.playItems, [['playType', this.announcementTypeMapping], ['isRetry', agnityGlobalData.booleanMapping], 'smsVariable', ['staticAnnType', this.staticAnnTypeMapping], ['valueType', agnityGlobalData.valueType], 'value', 'variable']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'playItem', 'width': '15%' }, { 'name': 'isRetry', 'width': '8%' },
		{ 'name': 'smsVariable', 'width': '15%' }, { 'name': 'staticAnnType', 'width': '15%' }, { 'name': 'valueType', 'width': '7%' },
		{ 'name': 'value', 'width': '15%' }, { 'name': 'variable', 'width': '13%' }, { 'name': 'action', 'width': '12%' },
		], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.playAndCollectNodeData.playItems.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityPlayCollectItem();
			this.playAndCollectNodeData.playItems.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('playItemDialog');
		this.dialogHelper.setDetailPageGrid(2, 3);
		this.setupDetailPanel();
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.playNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnitySoapNodeInputDialog(ui, inSoapCallNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.soapCallNodeData = inSoapCallNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnitySoapQueryInput();
	this.listModel = null;
	this.currRow = -1;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.type, 'type', function() {
			self.currVal.type = this.value;
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.soapCallNodeData.ui);
		selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.value, 'value', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.value = value; }, 1, 0, 1, 1);

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {
		this.soapCallNodeData.inputList.push(this.currVal);
		this.currVal = new AgnitySoapQueryInput();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.soapCallNodeData.inputList.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnitySoapQueryInput();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.soapCallNodeData.inputList, ['type', ['valueType', agnityGlobalData.valueType], 'value']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'type', 'width': '25%' }, { 'name': 'valueType', 'width': '20%' }, { 'name': 'value', 'width': '30%' }, { 'name': 'action', 'width': '25%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.soapCallNodeData.inputList.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnitySoapQueryInput();
			this.soapCallNodeData.inputList.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('inputListSetting');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.soapCallNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnitySoapNodeOutputDialog(ui, inSoapNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.soapNodeData = inSoapNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnitySoapQueryOutput();
	this.listModel = null;
	this.currRow = -1;

	this.setupDetailPanel = function() {
		var self = this;

		var nameSelector = new AgnityDynamicDropDownHelper();
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, nameSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.name, 'variableName', function() {
			self.currVal.name = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.outputKey, 'key', function() {
			self.currVal.outputKey = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createCheckboxRowField(this.currVal.isArrayResponse, 'arrayResponse', function() {
			self.currVal.isArrayResponse = this.checked;
		}));

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {
		this.soapNodeData.outputList.push(this.currVal);
		this.currVal = new AgnitySoapQueryOutput();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.soapNodeData.outputList.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnitySoapQueryOutput();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.soapNodeData.outputList, ['name', 'outputKey', 'isArrayResponse']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'variableName', 'width': '25%' }, { 'name': 'key', 'width': '25%' }, { 'name': 'arrayResponse', 'width': '25%' }, { 'name': 'action', 'width': '25%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.soapNodeData.outputList.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnitySoapQueryOutput();
			this.soapNodeData.outputList.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('outputListSetting');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.soapNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}

};

function AgnityLocalVarDialog(ui, inStartNodeData, callback) {
	this.dialogHelper = new AgnityDialogHelper('localVarSettings', 2, 2);
	this.callback = callback;
	this.startNodeData = inStartNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityLocalVariableData();
	this.listModel = null;

	this.variableTypeMapping = agnityGlobalData.mappingData.localVariableTypeMapping;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.variableName, 'variableName', function() {
			self.currVal.variableName = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.initValue, 'initVal', function() {
			self.currVal.initValue = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.variableTypeMapping, this.currVal.type, 'type', function() {
			self.currVal.type = this.value;
		}));
	}

	this.saveCurrVal = function() {
		this.startNodeData.localVariableMap.set(this.currVal.variableName, this.currVal);
		this.currVal = new AgnityLocalVariableData();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.startNodeData.localVariableMap, ['variableName', 'initValue', ['type', this.variableTypeMapping]]);

		this.dialogHelper.setRelatedListing([{ 'name': 'variableName', 'width': '30%' }, { 'name': 'initVal', 'width': '30%' }, { 'name': 'type', 'width': '20%' }, { 'name': 'action', 'width': '20%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.startNodeData.localVariableMap.delete(entry.variableName);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('localVarSettings');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.startNodeData);
					if (Agnity.isProcessDiagram())
						ui.actions.get('saveProcess_int').funct(self.callback);
					else
						ui.actions.get('saveUiXml_int').funct(self.callback);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnitySMSVarDialog(ui, inStartNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.startNodeData = inStartNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnitySMSVariableData();
	this.listModel = null;

	this.dataTypeMapping = agnityGlobalData.mappingData.smsDataTypeMapping;
	this.variableTypeMapping = agnityGlobalData.mappingData.smsVariableTypeMapping;
	this.fieldTypeMapping = agnityGlobalData.mappingData.smsFieldTypeMapping;
	this.htmlTypeMapping = agnityGlobalData.mappingData.smsHtmlTypeMapping;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.varName, 'variableName', function() {
			self.currVal.varName = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.defaultValue, 'defaultValue', function() {
			self.currVal.defaultValue = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(0, 2, Agnity.createCheckboxRowField(this.currVal.isRequired, 'isRequired', function() {
			self.currVal.isRequired = this.checked;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowField(this.currVal.size, 'size', function() {
			self.currVal.size = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createRangeTextRowField(this.currVal.minLength, this.currVal.maxLength, 'afeLength', function() {
			self.currVal.minLength = this.value;
		}, function() {
			self.currVal.maxLength = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createRangeTextRowField(this.currVal.minValue, this.currVal.maxValue, 'value', function() {
			self.currVal.minValue = this.value;
		}, function() {
			self.currVal.maxValue = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createDropDownRowField(this.dataTypeMapping, this.currVal.dataType, 'dataType', function() {
			self.currVal.dataType = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(2, 1, Agnity.createDropDownRowField(this.variableTypeMapping, this.currVal.type, 'type', function() {
			self.currVal.type = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(2, 2, Agnity.createDropDownRowField(this.fieldTypeMapping, this.currVal.fieldType, 'fieldType', function() {
			self.currVal.fieldType = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(3, 0, Agnity.createDropDownRowField(this.htmlTypeMapping, this.currVal.htmltype, 'htmlType', function() {
			self.currVal.htmltype = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(3, 1, Agnity.createInputTextRowField(this.currVal.label, 'label', function() {
			self.currVal.label = this.value;
		}));
		this.dialogHelper.addPanelToDetailPageGrid(3, 2, Agnity.createInputTextRowField(this.currVal.label_MX, 'labelMX', function() {
			self.currVal.label_MX = this.value;
		}));

	}

	this.saveCurrVal = function() {
		this.startNodeData.smsVariableMap.set(this.currVal.varName, this.currVal);
		this.currVal = new AgnitySMSVariableData();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.startNodeData.smsVariableMap, ['varName', 'defaultValue', ['dataType', this.dataTypeMapping], ['type', this.variableTypeMapping], ['fieldType', this.fieldTypeMapping], ['htmlType', this.htmlTypeMapping]]);

		this.dialogHelper.setRelatedListing([{ 'name': 'variableName', 'width': '30%' }, { 'name': 'defaultValue', 'width': '30%' }, { 'name': 'dataType', 'width': '20%' }, { 'name': 'action', 'width': '20%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.startNodeData.smsVariableMap.delete(entry.varName);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('smsVarSetting');
		this.dialogHelper.setDetailPageGrid(4, 3);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.startNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityCDRParamDialog(ui, inCDRNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.cdrNodeData = inCDRNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityCdrParamData();
	this.listModel = null;
	this.currRow = -1;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.desc, 'description', function() {
			self.currVal.desc = this.value;
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.cdrNodeData.ui);
		selector.setVariableProvider(new AgnityGetNonSmsVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()));
		selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.value, 'value', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.value = value; }, 1, 0, 1, 1);

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {
		this.cdrNodeData.cdrParams.push(this.currVal);
		this.currVal = new AgnityCdrParamData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.cdrNodeData.cdrParams.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityCdrParamData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.cdrNodeData.cdrParams, ['desc', ['valueType', agnityGlobalData.valueType], 'value']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'description', 'width': '35%' }, { 'name': 'valueType', 'width': '15%' }, { 'name': 'value', 'width': '35%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.cdrNodeData.cdrParams.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityCdrParamData();
			this.cdrNodeData.cdrParams.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('cdrParamSetting');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.cdrNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};


function AgnitySetPegCountDialog(ui, inCDRNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.cdrNodeData = inCDRNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityPegCountData();
	this.listModel = null;
	this.currRow = -1;

	this.setupDetailPanel = function() {
		var self = this;

	this.dialogHelper.addPanelToDetailPageGrid(0, 0,
		Agnity.createInputTextRowField(this.currVal.pegCountName, 'pegCountName', function () {
		const RemoveSpace =this.value.replace(/\s*/gm,'');
		$(this).val(RemoveSpace);
		self.currVal.pegCountName = RemoveSpace;// this.value.replace(/\s*/gm,''); //.split(" ").join("");
	}));


		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {
		this.cdrNodeData.pegCounts.push(this.currVal);
		this.currVal = new AgnityPegCountData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.cdrNodeData.pegCounts.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityPegCountData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.cdrNodeData.pegCounts, ['pegCountName']);

		this.dialogHelper.listActions = [
			['load', 'geSprite-insert'],
			['insert', 'geSprite-plus'],
			['delete', 'geSprite-delete']
		];

		this.dialogHelper.setRelatedListing([
			{ 'name': 'pegCountName', 'width': '70%' },
			{ 'name': 'action', 'width': '30%' }
		], this.listModel, this.onListAction.bind(this));

	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.cdrNodeData.pegCounts.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityCdrParamData();
			this.cdrNodeData.pegCounts.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('pegCountSettings');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.cdrNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};



function AgnitySethttpRaDialog(ui, inCDRNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.soapCallNodeData = inCDRNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;
    //inputHeaderSetting
	this.currVal = new AgnityHttpRaQueryInput();
	this.listModel = null;
	this.currRow = -1;

	this.setupDetailPanel = function() {
		var self = this;  

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'headername', function() {
			self.currVal.name = this.value;  //type
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.soapCallNodeData.ui);
		selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.value, 'headervalue', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.value = value; }, 1, 0, 1, 1);

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {
		//console.log("inRoutingEngineNodeData",inRoutingEngineNodeData);
		this.soapCallNodeData.headers.push(this.currVal);
		
		this.currVal = new AgnityHttpRaQueryInput();// AgnitySoapQueryInput();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.soapCallNodeData.headers.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityHttpRaQueryInput(); //AgnitySoapQueryInput();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();  
	}

	this.setupListingPanel = function() {
		var self = this; 															//type

		this.listModel =new AgnityDialogListingModel(this.soapCallNodeData.headers, ['name', ['valueType', agnityGlobalData.valueType], 'value']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'headername', 'width': '25%' }, { 'name': 'valueType', 'width': '20%' }, { 'name': 'headervalue', 'width': '30%' }, { 'name': 'action', 'width': '25%' }], this.listModel, this.onListAction.bind(this));
	}

 
	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.soapCallNodeData.headers.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityHttpRaQueryInput();// AgnitySoapQueryInput();
			this.soapCallNodeData.headers.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;
		this.dialogHelper.setHeading('httpheader');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.soapCallNodeData);
				}
				ui.hideDialog.apply(ui, arguments);
			}
		}]);
		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnitySipHeaderDialog(ui, inSipHeaderData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.sipHeaderNode = inSipHeaderData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnitySipHeaderData();
	this.listModel = null;
	this.currRow = -1;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.headerName, 'headername', function() {
			self.currVal.headerName = this.value;
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.sipHeaderNode.ui);
		selector.setVariableProvider(new AgnityGetNonSmsVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()));
		selector.setupWidgetInDialog(this.currVal.headerValueType, this.currVal.headerValue, 'headervalue', function(value) { self.currVal.headerValueType = value; }, function(value) { self.currVal.headerValue = value; }, 1, 0, 1, 1);

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {
		this.sipHeaderNode.sipHeaders.push(this.currVal);
		this.currVal = new AgnitySipHeaderData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.sipHeaderNode.sipHeaders.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnitySipHeaderData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.sipHeaderNode.sipHeaders, ['headerName', ['headerValueType', agnityGlobalData.valueType], 'headerValue']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'headername', 'width': '35%' }, { 'name': 'valueType', 'width': '15%' }, { 'name': 'headervalue', 'width': '35%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.sipHeaderNode.sipHeaders.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnitySipHeaderData();
			this.sipHeaderNode.sipHeaders.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('SIPHeaders');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.sipHeader);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnitySetAssignmentValueDialog(ui, inAssignNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.assignNodeData = inAssignNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityAssignNodeVariable();
	this.listModel = null;

	this.setupDetailPanel = function() {
		var self = this;

		var toSelector = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, toSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.to, 'toVariable', function() {
			self.currVal.to = this.value;
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.assignNodeData.ui);
		selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.from, 'from', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.from = value; }, 1, 0, 1, 1);
	}

	this.saveCurrVal = function() {
		this.assignNodeData.assignNodeVariableMap.set(this.currVal.to, this.currVal);
		this.currVal = new AgnityAssignNodeVariable();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.assignNodeData.assignNodeVariableMap, ['to', ['valueType', agnityGlobalData.valueType], 'from']);

		this.dialogHelper.setRelatedListing([{ 'name': 'toVariable', 'width': '35%' }, { 'name': 'valueType', 'width': '15%' }, { 'name': 'from', 'width': '35%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.assignNodeData.assignNodeVariableMap.delete(entry.to);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('assignValSetting');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.assignNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityDBQueryDialog(ui, inDBQueryNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.dbQueryNodeData = inDBQueryNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityDbQuerySpecifierData();
	this.listModel = null;
	this.currRow = -1;

	this.typeMapping = agnityGlobalData.mappingData.dbTypeMapping;
	this.positionMapping = agnityGlobalData.mappingData.dbPositionMapping;
	this.parsingStyleMapping = agnityGlobalData.mappingData.dbParsingStyleMapping;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
			self.currVal.name = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.typeMapping, this.currVal.type, 'type', function() {
			self.currVal.type = this.value;
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.dbQueryNodeData.ui);
		selector.setupWidgetInDialog(this.currVal.varType, this.currVal.value, 'value', function(value) { self.currVal.varType = value; }, function(value) { self.currVal.value = value; }, 0, 1, 0, 2);

		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.position, 'position', function() {
			self.currVal.position = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(this.positionMapping, this.currVal.inOrOut, 'inOrOut', function() {
			self.currVal.inOrOut = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createMultiSelectDropDownRowField(this.parsingStyleMapping, this.currVal.parsingstyle, 'parsingStyle', function(event) {
			var list = this.selectedOptions;
			var multipleOptions = '';
			for (var idx = 0; idx < list.length; idx++) {
				if (idx == 0) {
					multipleOptions = list[idx].label;
				}
				else {
					multipleOptions += ',' + list[idx].label;
				}
			}
			self.currVal.parsingstyle = multipleOptions;
		}));

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {
		this.dbQueryNodeData.dbQuerySpecifiers.push(this.currVal);
		this.currVal = new AgnityDbQuerySpecifierData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.dbQueryNodeData.dbQuerySpecifiers.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityDbQuerySpecifierData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.dbQueryNodeData.dbQuerySpecifiers, ['name', ['type', this.typeMapping], ['varType', agnityGlobalData.valueType], 'value', 'position', ['inOrOut', this.positionMapping], 'parsingstyle']);
		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'name', 'width': '15%' }, { 'name': 'type', 'width': '10%' }, { 'name': 'varType', 'width': '11%' }, { 'name': 'value', 'width': '20%' }, { 'name': 'position', 'width': '10%' },
		{ 'name': 'inOrOut', 'width': '10%' }, { 'name': 'parsingstyle', 'width': '12%' }, { 'name': 'action', 'width': '12%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.dbQueryNodeData.dbQuerySpecifiers.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityDbQuerySpecifierData();
			this.dbQueryNodeData.dbQuerySpecifiers.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var count = (this.dbQueryNodeData.procQuery.match(/\?/g) || []).length;

		if (this.dbQueryNodeData.dbQuerySpecifiers.length == 0) {
			for (var idx = 0; idx < count; idx++) {
				this.dbQueryNodeData.dbQuerySpecifiers.push(new AgnityDbQuerySpecifierData());
			}
		}

		var self = this;

		this.dialogHelper.setHeading('dbQuerySetting');
		this.dialogHelper.setDetailPageGrid(3, 3);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.dbQueryNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityLoadTreeDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.forestName = Agnity.getUrlParam('forestName');
	this.treeName = null;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.setupDetailPanel = function() {
		var self = this;

		var treeSelectionHelper = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, treeSelectionHelper.setupWidget(new AgnityGetAvailableTreesHelper(self.forestName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.treeName, 'treeName', function(event) {
			self.treeName = this.value;
		},null, null, false));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('loadTreeHeading');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'loadTreeDiagram', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				if (Agnity.isComponentDiagram() || Agnity.isProcessDiagram() || Agnity.isDBSchemaDiagram()) {
					if (agnityGlobalData.tabId == null)
						window.open('TreeViewer.html?forestName=' + self.forestName + '&treeName=' + self.treeName + '&diagram=tree');
					else
						agnityGlobalData.sendMessageToParent('loadDiagram', { 'name': self.treeName, 'forestName': self.forestName, 'diagramType': 'tree' });
				}
				else
					ui.actions.get('loadTreeDialog_int').funct(self.forestName, self.treeName);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnitySaveAsTemplateDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.templateName = '';

	this.parentDiv = null;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(self.templateName, 'templateName', function() {
			self.templateName = this.value;
		}, null, false));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('saveTemplateDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'saveTemplateBtn', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('saveTemplateDialog_int').funct(self.templateName);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityLoadFromTemplateDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.templateName = null;
	this.parentDiv = null;

	this.setupDetailPanel = function() {
		var self = this;
		var diagramType = 'tree';

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableTemplatesHelper(diagramType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.templateName, 'templateName', function(event) {
			self.templateName = this.value;
		}));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('loadTemplateDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'loadTemplateBtn', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('loadTreeTemplateDialog_int').funct(self.templateName);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityDeleteDiagramDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.forestName = Agnity.getUrlParam('forestName');
	this.treeName = null;
	this.componentName = null;

	this.parentDiv = null;

	this.setupDetailPanel = function() {
		var self = this;

		var treeSelectionHelper = new AgnityDynamicDropDownHelper();
		var componentSelectionHelper = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, treeSelectionHelper.setupWidget(new AgnityGetAvailableTreesHelper(self.forestName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.treeName, 'treeName', function(event) {
			self.treeName = this.value;
		}, null, null, false));
		this.dialogHelper.addPanelToDetailPageGrid(1, 0, componentSelectionHelper.setupWidget(new AgnityGetAvailableFunctionBlocksHelper(self.forestName, 'component', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.componentName, 'componentName', function(event) {
			self.componentName = this.value;
		}, null, null, false));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('deleteDiagram');
		this.dialogHelper.setDetailPageGrid(2, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'deleteForest', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('DeleteForestDialog').funct(self.forestName, self.treeName, function() {
					var applications = new AgnityGetAllAvailableForestsHelper();
					applications.fetchData(function(possibleValues) {
							agnityGlobalData.sendMessageToParent('Refresh Applications', { 'applications': possibleValues,'doRefresh': true });
					});
				});

			}
		}, {
			'name': 'deleteTree', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('DeleteTreeDialog').funct(self.forestName, self.treeName);
			}
		}, {
			'name': 'deleteComponent', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('DeleteComponentDialog').funct(self.forestName, self.componentName);
			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityCreateAppDialog(ui, onAppCreatedHandler) {
	this.dialogHelper = new AgnityDialogHelper();
	this.appName = null;
	this.appId = null;

	this.parentDiv = null;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField('', 'appName', function() {
			self.appName = this.value;
		}, null, false));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowField('', 'appId', function() {
			self.appId = this.value;
		}, null, false));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('createAppDialog');
		this.dialogHelper.setDetailPageGrid(2, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'add', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				var dataProvider = new AgnityCreateNewApp(self.appName, self.appId, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				dataProvider.createData(function(possibleValues) {
					onAppCreatedHandler(possibleValues, self.appId);
				});
			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityCreateForestDialog(ui, onForestCreatedHandler) {
	this.dialogHelper = new AgnityDialogHelper();
	this.forestName = null;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('createForestDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField('', 'forestName', function() {
			self.forestName = this.value;
		}, null, false));
		this.dialogHelper.setDialogActions([{
			'name': 'add', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				var dataProvider = new AgnityCreateForest(self.forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				dataProvider.createData(function(possibleValues) {

					var allForests = new AgnityGetAllAvailableForestsHelper();

					allForests.fetchData(function(possibleValue) {
						if (onForestCreatedHandler != null && typeof onForestCreatedHandler === "function")
							onForestCreatedHandler(possibleValues, self.forestName);

						agnityGlobalData.sendMessageToParent('Refresh Applications', { 'applications': possibleValue, 'forestName': self.forestName, 'doRefresh': true});
					})
				});
			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityErrorMsgDialog(ui, severityResourceId, errorMsgResourceId, additionalErrorMsg) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;

	this.setupContainer = function() {

		this.dialogHelper.setHeading(severityResourceId == 'info' ? severityResourceId : 'error');
		this.dialogHelper.setErrorMsgPanel(severityResourceId, errorMsgResourceId, additionalErrorMsg);

		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();

	}
};


function AgnitySearchDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.searchString = null;
	this.parentDiv = null;
	this.cellId = null;

	this.setupDetailPanel = function() {
		var self = this;

		var nodeSelectionHelper = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(self.searchString, 'searchString', function(event) {
			self.searchString = this.value;
			nodeSelectionHelper.dataProvider.searchString = this.value;
			nodeSelectionHelper.selectedValue = null;
			nodeSelectionHelper.rebuildOptions();
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, nodeSelectionHelper.setupWidget(new AgnitySearchHelper(self.searchString), self.cellId, 'node', function(event) {
			self.cellId = this.value;
		}));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('search');
		this.dialogHelper.setDetailPageGrid(2, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'show', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('showCell').funct(self.cellId);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};
function AgnityLogoutDialog(userName) {
	this.dialogHelper = new AgnityDialogHelper();
	this.parentDiv = null;
	this.name = userName;

	this.setupUserName = function(infoData)
	{
		var rowDiv = document.createElement('div');
		rowDiv.setAttribute('class', 'AgnityFieldRow');

		var icon = document.createElement('div');
		icon.setAttribute('class', 'UserTextInfoIcon');

		var textHolder = document.createElement('p');
		textHolder.setAttribute('class', 'UserTextInfo');
		mxUtils.write(textHolder, infoData);

		rowDiv.appendChild(icon);
		rowDiv.appendChild(textHolder);

		return rowDiv;
	}
	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, this.setupUserName(self.name));
		this.dialogHelper.setDialogActions([{
			'name': 'changePassword', 'func': function() {
				Agnity.doRedirect('./ChangePassword.html');
			}
		}, {
			'name': 'logout', 'func': function() {
				var logout = new AgnityLogout();
			    var data = JSON.parse(localStorage.getItem('user'));
				logout.doLogout(data.sessionId,function(){
					Agnity.clearLocalStorage();
					Agnity.doRedirect('./Login.html');
				});

			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};
function AgnitySessionTimeoutDialog(ui,response) {

	this.dialogHelper = new AgnityDialogHelper();
	this.parentDiv = null;
    this.additionalErrorMsg = 'Please login again';
    var errorMsgResourceId = 'sessionTimedOutResponse';
    var severityResourceId = 'critical';

	this.setupContainer = function() {

		this.dialogHelper.setHeading('error');
		this.dialogHelper.setErrorMsgPanel(severityResourceId, errorMsgResourceId, this.additionalErrorMsg);
		this.dialogHelper.setDialogActions([{
			'name': 'loginAgain', 'func': function() {
				window.open('./Login.html');
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}

	this.setErrorContentHeight = function()
	{
		var errorContent = this.parentDiv.getElementsByClassName('AgnityDialogErrorContentDiv');
		errorContent[0].style.height = '100px';
	}
};
function AgnitySearchHelper(searchString) {
	this.searchString = searchString;

	this.fetchData = function(callback) {
		if (this.searchString == null || this.searchString.length < 3) return;

		var searchStr = this.searchString.toLowerCase();

		var ui = agnityGlobalData.ui;
		var treeCell = ui.editor.graph.getModel().getCell(1);
		var treeNodes = ui.editor.graph.getModel().getChildVertices(treeCell);

		var resultNodes = [];

		for (idx = 0; idx < treeNodes.length; idx++) {
			var cellValue = treeNodes[idx].value.attributes;

			var nodeLabel = cellValue.label.nodeValue;
			var nodeAgnityData = cellValue.agnityData.nodeValue;

			if ((nodeLabel != null && nodeLabel.toLowerCase().includes(searchStr)) || (nodeAgnityData != null && nodeAgnityData.toLowerCase().includes(searchStr))) {
				if (nodeLabel == null) nodeLabel = '';

				var filteredLabel = $("<div/>").html(nodeLabel).text();;
				resultNodes.push({ 'id': treeNodes[idx].id, 'name': filteredLabel });
			}
		}

		console.log('List of nodes contains search String: ' + resultNodes);

		callback(resultNodes);
	}
}

function AgnityLoadComponentDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.forestName = Agnity.getUrlParam('forestName');
	this.functionName = null;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.setupDetailPanel = function() {
		var self = this;
		var functionSelectionHelper = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, functionSelectionHelper.setupWidget(new AgnityGetAvailableFunctionBlocksHelper(self.forestName, 'component', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.functionName, 'functionName', function(event) {
			self.functionName = this.value;
		},null, null, false));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('loadComponentHeading');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'loadFunctionDiagram', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				if (!Agnity.isComponentDiagram()) {
					if (agnityGlobalData.tabId == null)
						window.open('TreeViewer.html?forestName=' + self.forestName + '&componentName=' + self.functionName + '&diagram=component');
					else
						agnityGlobalData.sendMessageToParent('loadDiagram', { 'name': self.functionName, 'forestName': self.forestName, 'diagramType': 'component' });
				}
				else {
					ui.actions.get('loadFunctionBlock_int').funct(self.forestName, self.functionName);
				}
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityLoadFunctionBlockTemplateDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.forestName = Agnity.getUrlParam('forestName');
	this.templateName = null;
	this.parentDiv = null;

	this.setupDetailPanel = function() {
		var self = this;
		var diagramType = 'component';

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableTemplatesHelper(diagramType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.templateName, 'templateName', function(event) {
			self.templateName = this.value;
		}));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('loadTemplateDialog');
		this.dialogHelper.setDetailPageGrid(2, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'loadTemplateBtn', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('loadFunctionBlockTemplate_int').funct(self.forestName, self.templateName);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityDeleteFunctionTemplateDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.templateName = null;
	this.parentDiv = null;

	this.setupDetailPanel = function() {
		var self = this;
		var diagramType = 'component';

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableTemplatesHelper(diagramType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.templateName, 'templateName', function(event) {
			self.templateName = this.value;
		},null, null, false));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('deleteFunctionBlockTemplate');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'deleteTemplateBtn', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('deleteFunctionBlockTemplate_int').funct(self.templateName);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityDeleteTreeTemplateDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.templateName = null;
	this.parentDiv = null;

	this.setupDetailPanel = function() {
		var self = this;
		var diagramType = 'tree';

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableTemplatesHelper(diagramType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.templateName, 'templateName', function(event) {
			self.templateName = this.value;
		}));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('deleteTreeTemplate');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.setupDetailPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}, {
			'name': 'deleteTemplateBtn', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				ui.actions.get('deleteTreeTemplate_int').funct(self.templateName);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityCreateFunctionBlockDialog(ui, onFunctionBlockCreatedHandler) {
	this.dialogHelper = new AgnityDialogHelper();
	this.functionBlockName = null;
	this.templateName = null;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('createFunctionBlockDialog');
		this.dialogHelper.setDetailPageGrid(2, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField('', 'blockName', function() {
			self.functionBlockName = this.value;
		}, null, false));

		var diagramType = 'component';

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableTemplatesHelper(diagramType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.templateName, 'templateName', function(event) {
			self.templateName = this.value;
		}));

		this.dialogHelper.setDialogActions([{
			'name': 'add', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				var componentData = Agnity.getComponentData(ui);
				var dataProvider = new AgnityCreateFunctionBlock(componentData.forestName, self.functionBlockName, diagramType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				dataProvider.createData(function(possibleValues) {
					onFunctionBlockCreatedHandler(possibleValues, self.functionBlockName);
				});
			}
		}, {
			'name': 'loadTemplateDialog', 'func': function(result) {
				ui.hideDialog.apply(ui, arguments);
				var componentData = Agnity.getComponentData(ui);
				ui.actions.get('loadFunctionBlockTemplate_int').funct(componentData.forestName, self.templateName, function(response) {
					onFunctionBlockCreatedHandler(response.allBlocks, response.functionBlockName);
				});
			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityCreateTreeDialog(ui, onTreeCreatedHandler) {
	this.dialogHelper = new AgnityDialogHelper();
	this.treeName = null;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('createTreeDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField('', 'treeName', function() {
			self.treeName = this.value;
		}, null, false));
		this.dialogHelper.setDialogActions([{
			'name': 'add', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				var componentData = Agnity.getComponentData(ui);
				var dataProvider = new AgnityCreateTree(componentData.forestName, self.treeName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				dataProvider.createData(function(possibleValues) {
					onTreeCreatedHandler(possibleValues, self.treeName);
				});
			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityLoadProcessDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.processName = null;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('loadProcessDiagram');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableProcessHelper('process', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.processName, 'processName', function(event) {
			self.processName = this.value;
		},null, null, false));

		this.dialogHelper.setDialogActions([{
			'name': 'loadProcess', 'func': function() {
				ui.hideDialog.apply(ui, arguments);

				if (!Agnity.isProcessDiagram()) {
					if (agnityGlobalData.tabId == null)
						window.open('TreeViewer.html?forestName=' + self.processName + '&processName=' + self.processName + '&diagram=process');
					else
						agnityGlobalData.sendMessageToParent('loadDiagram', { 'name': self.processName, 'forestName': 'AgnityProcess_' + self.processName, 'diagramType': 'process' });
				}
				else {
					ui.actions.get('loadProcess_int').funct('AgnityProcess_' + self.processName, self.processName);
				}

			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityDeleteProcessDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.processName = null;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('deleteProcessDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableProcessHelper('process', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.processName, 'processName', function(event) {
			self.processName = this.value;
		}));

		this.dialogHelper.setDialogActions([{
			'name': 'deleteProcess', 'func': function() {
				ui.hideDialog.apply(ui, arguments);

				ui.actions.get('deleteProcess_int').funct(self.processName);

			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnitySaveAsProcessDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();
	this.processName = null;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;
		var processData = Agnity.getTreeData(ui);

		this.dialogHelper.setHeading('saveAsProcess');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField('', 'processName', function() {
			processData.treeName = this.value;
			processData.forestName = 'AgnityProcess_' + this.value;
		},null, false));
		this.dialogHelper.setDialogActions([{
			'name': 'save', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				agnityGlobalData.prevSelectedCellData = processData;
				ui.actions.get('saveProcess_int').funct(null);
			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityAppRouterDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;
	this.applicationName = Agnity.getUrlParam('forestName');
	this.sipMethod = null;

	this.availableRouters = new Array();
	this.ruleInfoListing = new Array();

	this.currRuleInfo = new AgnityRuleInfo();
	this.listModel = null;
	this.currRow = -1;
	this.isAppRoutersLoaded = false;

	this.sipMethodsMapping = agnityGlobalData.mappingData.sipMethodsMapping;
	this.routingRegionMapping = agnityGlobalData.mappingData.routingRegionMapping;
	this.sipHeaderMapping = agnityGlobalData.mappingData.sipHeaderMapping;
	this.routeModifierMapping = agnityGlobalData.mappingData.routeModifierMapping;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableForestsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.applicationName, 'forestName', function(event) {
			self.applicationName = this.value;

		}, null, Agnity.isADE(), false));

		if (!self.isAppRoutersLoaded) {
			var routers = new AgnityGetAvailableAppRoutersHelper(Agnity.getDefaultForestName(), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('diagram'), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
			routers.fetchData(function(availableRouters) {
				self.isAppRoutersLoaded = true;
				self.availableRouters = availableRouters;
				self.ruleInfoListing = new Array();
				self.getRuleInfoListing(self.sipMethod);
				self.setupDetailPanel();
				self.setupListingPanel();
			});
		}

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createDropDownRowField(self.sipMethodsMapping, self.sipMethod, 'sipMethod', function(event) {
			self.sipMethod = this.value;
			self.ruleInfoListing = new Array();
			self.getRuleInfoListing(self.sipMethod);
			self.setupListingPanel();
		}, false));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(self.sipHeaderMapping, self.currRuleInfo.sipHeader, 'sipHeader', function() {
			self.currRuleInfo.sipHeader = this.value;
		}, false));

		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(self.routingRegionMapping, self.currRuleInfo.routingRegion, 'routingRegion', function() {
			self.currRuleInfo.routingRegion = this.value;
		}, false));

		this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(self.routeModifierMapping, self.currRuleInfo.routeModifier, 'routeModifier', function() {
			self.currRuleInfo.routeModifier = this.value;
		}, false));

		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createInputTextRowField(self.currRuleInfo.regex, 'regex', function() {
			self.currRuleInfo.regex = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(2, 1, Agnity.createCheckboxRowField(self.currRuleInfo.ignore, 'ignore', function() {
			self.currRuleInfo.ignore = this.checked;
		}, false));

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}

	}

	this.saveCurrVal = function() {
		this.ruleInfoListing.push(this.currRuleInfo);
		this.setRulesInfoToRouters(this.ruleInfoListing);
		this.currRuleInfo = new AgnityRuleInfo();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.updateCurrVal = function() {
		this.ruleInfoListing.splice(this.currRow, 1, this.currRuleInfo);

		this.setRulesInfoToRouters(this.ruleInfoListing);

		this.currRuleInfo = new AgnityRuleInfo();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		this.listModel = new AgnityDialogListingModel(this.ruleInfoListing, [['sipHeader', this.sipHeaderMapping], ['routingRegion', this.routingRegionMapping], ['routeModifier', this.routeModifierMapping], 'regex', 'ignore']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'sipHeader', 'width': '17%' }, { 'name': 'routingRegion', 'width': '17%' }, { 'name': 'routeModifier', 'width': '17%' }, { 'name': 'regex', 'width': '17%' }, { 'name': 'ignore', 'width': '17%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currRuleInfo = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.ruleInfoListing.splice(row, 1);
			this.setRulesInfoToRouters(this.ruleInfoListing);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityRuleInfo();
			this.ruleInfoListing.splice(row, 0, entry);
			this.setRulesInfoToRouters(this.ruleInfoListing);
			this.currRuleInfo = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.getRuleInfoListing = function(sipMethod) {
		for (var idx = 0; idx < this.availableRouters.length; idx++) {
			if (this.availableRouters[idx].sipMethod != sipMethod) continue;

			this.ruleInfoListing = this.availableRouters[idx].rules;
			break;
		}
	}

	this.setRulesInfoToRouters = function(rulesInfo) {
		var sipFound = false;
		for (var idx = 0; idx < this.availableRouters.length; idx++) {
			if (this.availableRouters[idx].sipMethod != this.sipMethod) continue;
			sipFound = true;
			this.availableRouters[idx].rules = rulesInfo;
			break;
		}

		if (!sipFound) {
			this.availableRouters.push({ "sipMethod": this.sipMethod, "rules": rulesInfo });
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('appRouterDialog');
		this.dialogHelper.setDetailPageGrid(3, 3);
		this.setupDetailPanel();
		this.setupListingPanel();

		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				var appRouters = new AgnitySaveAppRoutersHelper(self.applicationName, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('diagram'), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				appRouters.storeData(self.availableRouters, function() { });

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityDBDetailDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;

	this.dbConfig = new AgnityDBConfig();
	this.listModel = null;
	this.currRow = -1;
	this.isDBConfigLoaded = false;

	this.dbDetails = [];

	this.dbConfigTypeMapping = agnityGlobalData.mappingData.dbConfigTypeMapping;

	this.setupDetailPanel = function() {
		var self = this;

		if (!self.isDBConfigLoaded) {
			var dbConfig = new AgnityGetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
			dbConfig.fetchData(function(applicationDBConfig) {
				self.isDBConfigLoaded = true;
				if (applicationDBConfig == null)
					self.dbConfig = new AgnityDBConfig();
				else
					self.dbConfig = applicationDBConfig;

				self.setupDetailPanel();
			});
		}

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(self.dbConfig.user, 'user', function() {
			self.dbConfig.user = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(self.dbConfig.password, 'password', function() {
			self.dbConfig.password = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowField(self.dbConfig.scheme, 'scheme', function() {
			self.dbConfig.scheme = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(self.dbConfig.host, 'host', function() {
			self.dbConfig.host = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createDropDownRowField(self.dbConfigTypeMapping, self.dbConfig.type, 'type', function() {
			self.dbConfig.type = this.value;
		}, false));

	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('dbDetailsConfig');
		this.dialogHelper.setDetailPageGrid(3, 2);

		this.setupDetailPanel();

		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				var setDBConfig = new AgnitySetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				setDBConfig.storeData(self.dbConfig);

				ui.hideDialog.apply(ui, arguments);
			}
		},
		{
			'name': 'loadSchema', 'func': function() {
				var setDBConfig = new AgnitySetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				setDBConfig.storeData(self.dbConfig);

				var schema = new AgnityLoadApplicationSchemaHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), self.dbConfig.type);
				schema.loadSchema(function(response) {
					console.log(response);
					console.log(response.result);
					if (response.result == true) {
						Agnity.showErrorMessage('info', ['successLoadDBResponse', 'SCHEMA LOADED SUCCESSFULLY!!!']);
					}
					else {
						console.log(response.result);
						Agnity.showErrorMessage('critical', ['failedServerResponse', 'Failed to load DB Schema. Please check debug.out file in work environment for more details']);
					}
				});

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityApplicationRoutingRuleDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;

	this.applicationName = null;
	this.casName = null;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableCASServersHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam()), self.casName, 'casServer', function(event) {
			self.casName = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableForestsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.applicationName, 'forestName', function(event) {
			self.applicationName = this.value;
		}));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('applicationRoutingRule');
		this.dialogHelper.setDetailPageGrid(2, 1);
		this.setupDetailPanel();

		this.dialogHelper.setDialogActions([
			{
				'name': 'close', 'func': function() {
					var appRoutingRule = new AgnitySetApplicationRoutingRuleHelper(self.applicationName, self.casName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
					appRoutingRule.fetchData(function(response) { });

					ui.hideDialog.apply(ui, arguments);
				}
			}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityApplicationDebuggerDialog(ui, isGlobal) {
	this.dialogHelper = new AgnityDialogHelper();
	this.debuggerFilesHelper = new AgnityDebuggerFilesHelper(Agnity.getUrlParam('operationMode'));

	this.parentDiv = null;
	this.isListingPanelLoaded = false;
	this.isDetailPanelLoaded = false;
	this.debugStatus = false;

	this.listModel = null;
	this.currRow = -1;

	this.refreshListingPanel = function() {
		var self = this;
		var operation = 'getAvailableDebuggerFilesByApp';
		if(isGlobal)
		{
			operation = 'getAllAvailableDebuggerFiles';
			this.debuggerFilesHelper.fetchGlobalData(operation, function(files) {
				self.debugFilesInfo = files;
				self.setupListingPanel();
			});
		}
		else
		{
			this.debuggerFilesHelper.fetchData(operation, Agnity.getUrlParam('forestName'), Agnity.getDomainName(), function(files) {
				var debuggingInfoHelper = new AgnityGetDebuggingInfoHelper();
			 		debuggingInfoHelper.getDebugEnableStatus(function(response) {
			 			self.debugStatus =  response.debugStatus;
			 			self.debugFilesInfo = files;
						self.setupListingPanel();
			 		},function() {
			 			self.debugFilesInfo = files;
						self.setupListingPanel();
			 		});
			});
		}

	}

	this.timeStampFormatter = function(val){
		// Convert timestamp format "dd-mm-yyyyTHH-MM-SS.SSSZ" to "dd-mm-yyyy HH-MM-SS"
		return new Date(Number(val)).toLocaleString('en-US');
	};

	this.setupListingPanel = function() {

		if(isGlobal)
		{
			this.dialogHelper.listActions = [['delete', 'geSprite-delete']];
			this.listModel = new AgnityDialogListingModel(this.debugFilesInfo, ['appid', 'domainname', {'head' : 'timestamp','formatter':this.timeStampFormatter}, 'callingParty', 'calledParty', 'casname']);
			this.dialogHelper.setRelatedListing([{ 'name': 'applicationname', 'width': '15%' },{ 'name': 'domainname', 'width': '15%' }, { 'name': 'timestamp', 'width': '17%' },{ 'name': 'callingParty', 'width': '14%' },
				{ 'name': 'calledParty', 'width': '14%' }, { 'name': 'casname', 'width': '15%' }, { 'name': 'action', 'width': '10%' }], this.listModel, this.onListAction.bind(this));
		}
		else
		{
			this.dialogHelper.listActions = [['debug', 'geSprite-debug']];
			this.listModel = new AgnityDialogListingModel(this.debugFilesInfo, [{'head' : 'timestamp','formatter':this.timeStampFormatter}, 'callingParty', 'calledParty', 'casname']);
			this.dialogHelper.setRelatedListing([{ 'name': 'timestamp', 'width': '30%' },{ 'name': 'callingParty', 'width': '20%' },
				{ 'name': 'calledParty', 'width': '20%' }, { 'name': 'casname', 'width': '20%' }, { 'name': 'action', 'width': '10%' }], this.listModel, this.onListAction.bind(this));
		}

		if(!this.debugStatus)
		{
			$(".refresh-icon.poll-new-files").hide();
		}
	}

	this.onListAction = function(action, row) {
		var self = this;

		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'debug') {
			console.log("debug file"+ row);
			this.debuggerFilesHelper.loadFile(entry,'file', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getDomainName(), function(response) {
				agnityGlobalData.sendMessageToParent('playDebug', response);
				ui.hideDialog();
			});
		}
		else if (action == 'delete') {
			console.log("delete file" + row);
			var files = [entry];
			console.log(this.timeStampFormatter(entry.timestamp));
			let isExecuted = confirm("Are you sure to delete the debug file of \"" + entry.appid + "\" application belongs to \"" + entry.domainname + "\" domain created on \""
					+ this.timeStampFormatter(entry.timestamp) + "\" at \"" + entry.casname + "\" CAS?");
			if(isExecuted)
			{
					this.debuggerFilesHelper.deleteFiles(files, function() {
						self.refreshListingPanel();
					});
			}

		}
	}

	this.createPollNewFilesLink = function() {
		var wrapper = $("<div class='grid-icons'/>");

			var pollNewFiles = $("<div class='refresh-icon poll-new-files' />");
			var self = this;
			pollNewFiles.click(function(){
				if(!pollNewFiles.hasClass("rotate"))
				{
					pollNewFiles.addClass("rotate");
					pollNewFiles.attr("title", mxResources.get('pollingNewFiles'));
					self.debuggerFilesHelper.pollNewFile(Agnity.getUrlParam('forestName'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getDomainName(), function(response) {
						self.refreshListingPanel();
						pollNewFiles.attr("title", mxResources.get('pollNewFiles'));
						pollNewFiles.removeClass("rotate");
					}, function(){
						pollNewFiles.attr("title", mxResources.get('pollNewFiles'));
						pollNewFiles.removeClass("rotate");
					});
				}
				return false;
			});
			pollNewFiles.attr("title", mxResources.get('pollNewFiles'));
			wrapper.append(pollNewFiles);

		var fileUpload = $("<div class='fileupload-icon poll-new-files' />");
		var self = this;
		fileUpload.click(function(){

			window.openNew = false;

       		window.openFile = new OpenFile(mxUtils.bind(this, function()
       		                                    		{
       		                                    			ui.hideDialog();
       		                                    		}));
       		window.openFile.setConsumer(mxUtils.bind(this, function(inData, filename)
       		                                 		{
       		                                 			try
       		                                 			{
       		                                 				 self.debuggerFilesHelper.loadFile(JSON.parse(inData),'filecontent', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getDomainName(), function(response)
													           {
																	agnityGlobalData.sendMessageToParent('playDebug', response);
																	ui.hideDialog();
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

		});
		fileUpload.attr("title", mxResources.get('manualupload'));


		wrapper.append(fileUpload);
		return wrapper;
	};

	this.setupContainer = function() {
		var self = this;

		if(isGlobal)
		{
			this.dialogHelper.setHeading(mxResources.get('callTraceFiles'));
		}
		else
		{
			this.dialogHelper.setHeading(mxResources.get('debugApplication') + " : "+  Agnity.getUrlParam('forestName'));
			this.dialogHelper.setDialogActions([
			{
				'name': 'close', 'func': function() {
					ui.hideDialog.apply(ui, arguments);
				}
			}]);
		}
		this.refreshListingPanel();
		self.setupListingPanel();


		this.parentDiv = this.dialogHelper.setupContainer();
		this.parentDiv.classList.add('DebugSettingsParent');
		if(!isGlobal)
		{
			//$(this.parentDiv).find(".AgnityDialogActionDiv").before(this.addManualDebugger());
			$(this.parentDiv).find(".AgnityDialogListingPageDiv").before(this.createPollNewFilesLink());
		}
	}
};

function AgnityLockStatusDialog(ui, lockStatus){
	this.dialogHelper = new AgnityDialogHelper();
	this.lockStatusInfo = lockStatus;
	var self = this;

	this.setupListingPanel = function() {

		this.listModel = new AgnityDialogListingModel(this.lockStatusInfo, [{'head':'path', 'type':'html', 'formatter' : function(value, currEntry){return self.convertPathToObject(value , currEntry)}}, {'head':'type', 'type':'html', 'formatter' : function(value, currEntry){return self.componentFormatter(value, currEntry)}}, 'lockedby', {'head':'elapsedtime', 'type':'html', 'formatter' : function(value){return Agnity.timeFormatter(value)}}]);

		this.dialogHelper.listActions = [['unlock', 'geSprite-unlock']];
		this.dialogHelper.setRelatedListing([{ 'name': 'path', 'width': '20%' },{ 'name': 'componenttype', 'width': '12%' }, { 'name': 'lockedby', 'width': '10%' },{ 'name': 'elapsedtime', 'width': '15%' }, { 'name': 'action', 'width': '5%' }], this.listModel, this.onListAction.bind(this));

	}

	this.convertPathToObject = function(value, currEntry)
	{
		if(value == '')
		{
			return currEntry.object;
		}
		return value;
	}

	this.componentFormatter = function(value, currEntry)
	{
		if(value == 'component' && currEntry.path == '')
		{
			return 'forest';
		}
		return value;
	}

	this.onListAction = function(action, row) {
		var self = this;

		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'unlock') {
			let isExecuted = confirm("Are you sure to unlock " + entry.object + "?");
			if(isExecuted)
			{
				var lock  = new AgnityUnLockObject(entry.object, entry.type, entry.path, Agnity.getDomainName());
				lock.unlockObject(true, function(unlockedResponse){
					console.log("Successfully Removed");
					var forestName = Agnity.getDefaultForestName();
					var componentDiagram = Agnity.getUrlParam('diagram');
					var diagramName;

					if(Agnity.isComponentDiagram())
					{
						diagramName = urlParams.componentName;
					}
					else if(Agnity.isTreeDiagram() || Agnity.isProcessDiagram())
					{
						diagramName = urlParams.treeName;
					}
					var lock = new GetCurrentLockStatus(forestName,  componentDiagram, diagramName, Agnity.getDomainName());
					lock.getLockStatus(function(response)
					{
						self.lockStatusInfo =  response.locks;
						self.setupListingPanel();
						self.currRow = -1;
						agnityGlobalData.sendMessageToParent('LockStatusChange', {'lock':JSON.parse(unlockedResponse.lock)});
					});

				});
			}
		}
	}

	this.getLockStatusHeading = function()
	{
		var heading = 'Unlocked';
		if(this.lockStatusInfo.length > 0 && this.lockStatusInfo != undefined)
		{
			var objectType = urlParams.diagram;
			objectType = objectType.charAt(0).toUpperCase() + objectType.slice(1);
			if(Agnity.isComponentDiagram())
			{
				name = urlParams.componentName == undefined ? Agnity.getComponentData(agnityGlobalData.ui).componentName : urlParams.componentName;
			}
			else if(Agnity.isTreeDiagram() || Agnity.isProcessDiagram())
			{
				name = urlParams.treeName == undefined ? Agnity.getTreeData(agnityGlobalData.ui).treeName : urlParams.treeName;
			}
			heading = objectType + " \""+ name + "\" " + "is locked";
		}

		return heading;
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading(this.getLockStatusHeading());

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([
			{
				'name': 'close', 'func': function() {
					ui.hideDialog.apply(ui, arguments);
				}
			}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}

};

function AgnityManageCASApplicationsDialog(ui) {
	this.statusMapping = agnityGlobalData.mappingData.casStatusMapping;;
	this.dialogHelper = new AgnityDialogHelper();
	this.casApplicationsInfo = null;

	this.parentDiv = null;
	this.isListingPanelLoaded = false;
	this.isDetailPanelLoaded = false;

	this.casName = null;
	this.applicationName = null;
	this.priority = 5;
	this.listModel = null;
	this.currRow = -1;

	var enableDebugHelper = new AgnityCASApplicationDebugHelper();

	// get all configuared cas group
	// this.getGroup = new AgnityGetAvailableCASServersGroupHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());
	// this.groupList = [];
	// this.setGroupList = (res) => {
	// 	this.groupList = [...res.map(r => r.name)];
	// 	this.setupDetailPanel();
	// }
	// this.getGroup.fetchData((res) => {
	// 	this.setGroupList(res);
	// })

	// get all configuared cas servers
	this.getcasServers = new AgnityGetAvailableCASServersHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());
	this.serverList = [];
	this.casGroups = {};
	this.setServerList = (res) => {
		this.serverList = res;
		for(let i of this.serverList) {
			if(this.casGroups[i['group']]) {
				this.casGroups[i['group']].push(i);
			} else {
				this.casGroups[i['group']] = [i];
			}
		}
		this.setupDetailPanel();
	}
	this.getcasServers.fetchData((res) => {
		this.setServerList(res);
	})

	this.setupDetailPanel = function() {
		var self = this;

		var availablePackagedApplications = new AgnityGetAvailablePackagedApplicationsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		availablePackagedApplications.fetchData(function(possibleValues) {
			if (Agnity.includes(possibleValues, Agnity.getUrlParam('forestName'))) {
				self.applicationName = Agnity.getUrlParam('forestName');

				if (!self.isDetailPanelLoaded) {
					self.setupDetailPanel();
					self.isDetailPanelLoaded = true;
				}

			}
		});


        this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDropDownRowField(Object.keys(self.casGroups), self.casName, 'casGroup', function() {
            self.casName = this.value;
            self.casApplicationsInfo = self.casGroups[self.casName];
            // self.setupDetailPanel();
        }, false));

		// this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableCASServersHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam()), self.casName, 'availableCASServers', function(event) {
		// 	self.casName = this.value;

		// var debuggingInfoHelper = new AgnityGetDebuggingInfoHelper();
		//  		debuggingInfoHelper.getDebugEnableStatus(function(response) {
		//  			self.debugStatus =  response.debugStatus;
		//  			if (!self.isListingPanelLoaded) {
		// 				self.refreshListingPanel();
		// 				self.isListingPanelLoaded = true;
		// 			}
		//  		},function() {
		//  			self.debugStatus = false;
		// 			if (!self.isListingPanelLoaded) {
		// 				self.refreshListingPanel();
		// 				self.isListingPanelLoaded = true;
		// 			}
		//  		});

		// },null, null, false));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.applicationName, 'forestName', null, Agnity.isADE()));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowField(this.priority, 'priority', function() {
			self.priority = this.value;
		}, null, false , null));

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'refreshApplications', 'func': function() {
					self.refreshListingPanel();
				}
			},
			{
				'name': 'deployApplication', 'func': function() {
					var casApplication = new AgnityDeployCASApplication(self.casName, self.applicationName, self.priority, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('diagram'), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
					casApplication.deployApplication(function(response) {
						self.casApplicationsInfo = response.Applications;
						self.setupListingPanel();
					});
				}
			},
			{
				'name': 'downloadApplicationPackage', 'func': function() {
					var application = new AgnityDownloadApplicationPackage(self.applicationName, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('diagram'), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
					application.downloadApplication(function(response) {
						ui.actions.get('downloadApplicationPackage').funct(response);
					});
				}
			}
			]);
		}
	}

	this.refreshListingPanel = function() {
		var self = this;

		var getCASApplicationsInfo = new AgnityGetCASApplicationsHelper(self.casName, Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());
		getCASApplicationsInfo.fetchData(function(inCasApplicationsInfo) {
 			self.casApplicationsInfo = inCasApplicationsInfo;
					self.setupListingPanel();
			var debuggingInfoHelper = new AgnityGetDebuggingInfoHelper();
		 		debuggingInfoHelper.getDebugEnableStatus(function(response) {
		 			self.debugStatus =  response.debugStatus;
		 		},function() {
		 			self.debugStatus = false;
					self.setupListingPanel();
		 		});

		});
	}

	this.setupListingPanel = function() {

		var self = this;

		if(this.debugStatus)
		{
			self.debugMapping = {'enabled':'Enabled <div class="AgnityDialogListingPageTableEntryButton geSprite geSprite-enableDebug" title="Enabled"></div>',
			'disabled':'Disabled <div class="AgnityDialogListingPageTableEntryButton geSprite geSprite-disableDebug" title="Disabled"></div>'};

			self.listModel = new AgnityDialogListingModel(self.casApplicationsInfo, ['application', {'head':'debug', 'type':'html', 'value':self.debugMapping}, 'DEPLOYEDBY', ['STATUS', self.statusMapping]]);

			self.dialogHelper.listActions = [['activate', 'geSprite-active'], ['start', 'geSprite-start'], ['stop', 'geSprite-stop'], ['deactivate', 'geSprite-deactivate'], ['undeploy', 'geSprite-undeploy'], ['applicationInfo', 'geSprite-applicationInfo'], ['setRoutingRules', 'geSprite-setRoutingRules'], ['enableDebug', 'geSprite-enableDebugBtn'],['disableDebug', 'geSprite-disableDebugBtn']];
			self.dialogHelper.setRelatedListing([{ 'name': 'applicationName', 'width': '20%' },{ 'name': 'debugging', 'width': '18%' }, { 'name': 'deployer', 'width': '20%' }, { 'name': 'status', 'width': '18%' }, { 'name': 'action', 'width': '25%' }], self.listModel, self.onListAction.bind(self), self.filterListAction.bind(self));
		}
		else
		{
			self.listModel = new AgnityDialogListingModel(self.casApplicationsInfo, ['application', 'DEPLOYEDBY', ['STATUS', self.statusMapping]]);

			self.dialogHelper.listActions = [['activate', 'geSprite-active'], ['start', 'geSprite-start'], ['stop', 'geSprite-stop'], ['deactivate', 'geSprite-deactivate'], ['undeploy', 'geSprite-undeploy'], ['applicationInfo', 'geSprite-applicationInfo'], ['setRoutingRules', 'geSprite-setRoutingRules']];
			self.dialogHelper.setRelatedListing([{ 'name': 'applicationName', 'width': '25%' },{ 'name': 'deployer', 'width': '25%' }, { 'name': 'status', 'width': '25%' }, { 'name': 'action', 'width': '25%' }], self.listModel, self.onListAction.bind(self), self.filterListAction.bind(self));
		}
	}

	this.filterListAction = function(listActions, casApplicationInfo) {
		var status = casApplicationInfo.STATUS.toLowerCase();
		var deployedBy = casApplicationInfo.DEPLOYEDBY.toLowerCase();
		var debug = casApplicationInfo.debug;

		var ret = new Array();

		for (var idx = 0; idx < listActions.length; idx++) {
			var action = listActions[idx][0];

			//Remove condition && deployedBy == 'afe' from all the actions except from action == 'applicationInfo'
			if (status == 'installed' && (action == 'undeploy' || action == 'start')) {
				ret.push(listActions[idx]);
			}
			else if (status == 'ready' && (action == 'stop' || action == 'activate')) {
				ret.push(listActions[idx]);
			}
			else if (status == 'active' && (action == 'deactivate')) {
				ret.push(listActions[idx]);
			}

			if (action == 'applicationInfo')
				ret.push(listActions[idx]);
			else if (action == 'setRoutingRules') {
				ret.push(listActions[idx]);
			}

			if (debug == 'disabled'  && (action == 'enableDebug') && status == 'active')
				ret.push(listActions[idx]);

			if (debug == 'enabled'  && (action == 'disableDebug'))
				ret.push(listActions[idx]);

		}

		return ret;
	}

	this.onListAction = function(action, row) {
		var self = this;

		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'applicationInfo') {
			// Open Application Info Dialog
			ui.actions.get('applicationInfo_dlg').funct(this.casApplicationsInfo[this.currRow]);
		}
		else if (action == 'setRoutingRules') {
			var appRoutingRule = new AgnitySetApplicationRoutingRuleHelper(this.casApplicationsInfo[this.currRow].application, self.casName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
			appRoutingRule.fetchData(function(response) { });
		}
		else if (action == 'enableDebug') {
			enableDebugHelper.enableDebug(entry.appId, self.casName, Agnity.getUrlParam('diagram'),  Agnity.hasUrlReadonlyParam(),  Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response){
				console.log(response);
				self.listModel.values[row]['debug'] = response["debug"];
				self.setupListingPanel();
			});
		}
		else if (action == 'disableDebug') {
			enableDebugHelper.disableDebug(entry.appId, self.casName, Agnity.getUrlParam('diagram'),  Agnity.hasUrlReadonlyParam(),  Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), function(response){
				console.log(response);
				self.listModel.values[row]['debug'] = response["debug"];
				self.setupListingPanel();
			});
		}
		else {
			var casApplicationAction = new AgnityExecuteCASApplicationAction(this.casName, this.casApplicationsInfo[this.currRow].application, action, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('diagram'), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
			casApplicationAction.executeAction(function(response) {
				self.casApplicationsInfo = response.Applications;
				self.setupListingPanel();
			})
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('manageCASApplicationsDialog');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([
			{
				'name': 'close', 'func': function() {
					ui.hideDialog.apply(ui, arguments);
				}
			}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityCASApplicationInfoDialog(ui, inCASApplicationData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.casApplicationInfo = inCASApplicationData.INFO;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('casApplicationInfo');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.displayTextInfo(self.casApplicationInfo));
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityUploadForestDBSchema(ui, callback) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;
	this.saveOnClose = false;

	this.applicationName = null;
	this.schemaContent = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('uploadForestDBSchema');
		this.dialogHelper.setDetailPageGrid(1, 1);

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createFileReaderInputRowField('uploadSchema', function(evt) {

			var file = evt.target.files;
			var reader = new FileReader();
			reader.onload = function() {
				self.schemaContent = reader.result;
			};
			reader.readAsText(file[0]);

		}));

		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {

				var uploadSchema = new AgnitySaveUserDefinedDBSchemaHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				uploadSchema.storeData(self.schemaContent, function() { });

				if (callback != null && typeof callback === 'function')
					callback(self.schemaContent);

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityPackageApplicationDialog(ui) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;
	this.saveOnClose = false;

	this.applicationName = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('packageApplicationDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createDynamicDropDownRowField(new AgnityGetAvailableForestsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), self.applicationName, 'availableApplications', function(event) {
			self.applicationName = this.value;
		}));
		this.dialogHelper.setDialogActions([{
			'name': 'packageApplication', 'func': function() {

				var application = new AgnityCreateApplicationPackageHelper(self.applicationName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				application.applicationPackage(function(response) {
					if (response.result) {
						var successMsg = mxResources.get('applicationPackageCreated') + self.applicationName;
						ui.actions.get('successDialog').funct(successMsg);
					}
					else if (!response.result) {
						Agnity.showErrorMessage('critical', ['failedToCreateApplicationPackage', mxResources.get('applicationPackageFailed') + self.applicationName]);
					}

				});
				ui.hideDialog.apply(ui, arguments);
			}
		},
		{
			'name': 'close', 'func': function() {

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();

	}
}

function AgnitySuccessDialog(ui, msg) {
	this.dialogHelper = new AgnityDialogHelper();
	this.successMsg = msg;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('successDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.displayTextInfo(self.successMsg));
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityCASServersDialog(ui, inAvailableCASServersData, callback) {
	this.dialogHelper = new AgnityDialogHelper();
	this.availableCASServersDataList = inAvailableCASServersData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityCASData();
	this.listModel = null;
	this.currRow = -1;
	this.getGroup = new AgnityGetAvailableCASServersGroupHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());
	this.groupList = [];
	this.setGroupList = (res) => {
		this.groupList = ["",...res.map(r => r.name)];
		this.groupList.push("+ New Group")
		this.setupDetailPanel();
	}
	this.getGroup.fetchData((res) => {
		this.setGroupList(res);
	})

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
			self.currVal.name = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.ip, 'ip', function() {
			self.currVal.ip = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowField(this.currVal.port, 'port', function() {
			self.currVal.port = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createInputTextRowField(this.currVal.sshUser, 'sshUser', function() {
			self.currVal.sshUser = this.value;
		},null, false));
		this.dialogHelper.addPanelToDetailPageGrid(3, 0, Agnity.createInputPasswordRowField(this.currVal.sshPassword, 'sshPassword', function() {
			self.currVal.sshPassword = this.value;
		},null, false));
		this.dialogHelper.addPanelToDetailPageGrid(2, 1, Agnity.createInputTextRowField(this.currVal.sshPort, 'sshPort', function() {
			self.currVal.sshPort = this.value;
		},null, false));
		this.dialogHelper.addPanelToDetailPageGrid(3, 1, Agnity.createInputPasswordRowField(this.currVal.sshCnfPassword, 'sshCnfPassword', function() {
			self.currVal.sshCnfPassword = this.value;
		},null, false));
		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.ctfsd, 'ctfsd', function() {
			self.currVal.ctfsd = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(4, 0, Agnity.createInputTextRowField(this.currVal.httpport, 'httpport', function() {
			self.currVal.httpport = this.value;
		},null, false));

		this.dialogHelper.addPanelToDetailPageGrid(4, 1, Agnity.createDropDownRowField(this.groupList, self.currVal.group, 'casGroup', function() {
			if(this.value === '+ New Group') {
				self.currVal.group = '';
				ui.actions.get('manageCASGroupDialog').funct((res) => {
					self.setGroupList(res);
				});
			} else {
				self.currVal.group = this.value;
			}

		}, false));

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.saveCurrVal = function() {

		var validator = window.parent.Validator;
		var isValid = this.validateFields(this.currVal, validator, true);
		if(!isValid)
		{
			return
		}
		var comparePasswordResult = validator.comparePassword(this.currVal.sshPassword, this.currVal.sshCnfPassword);
		if (comparePasswordResult)
		{
			Agnity.showErrorMessage('critical', ['failedValidation',comparePasswordResult]);
			return;
		}

		var isSameNameAvail = false;
		if(this.availableCASServersDataList)
		{
			this.availableCASServersDataList.forEach(
				cas =>
				{
						if(cas.name.valueOf() == this.currVal.name.valueOf())
						{
							Agnity.showErrorMessage('critical', ['failedValidation',"CAS with same name already exists."]);
							isSameNameAvail = true;
							return;
						}
				}
			);
		}

		if(!isSameNameAvail)
		{
			this.availableCASServersDataList.push(this.currVal);
			this.currVal = new AgnityCASData();
			this.currRow = -1;
			this.setupDetailPanel();
			this.setupListingPanel();
		}


	}

	this.updateCurrVal = function() {
		var validator = window.parent.Validator;
		var isValid = this.validateFields(this.currVal,validator, false);
		if(!isValid)
		{
			return
		}
		if(this.currVal.sshPassword && this.currVal.sshPassword != '')
		{
			var comparePasswordResult = validator.comparePassword(this.currVal.sshPassword, this.currVal.sshCnfPassword);
			if (comparePasswordResult)
			{
				Agnity.showErrorMessage('critical', ['failedValidation',comparePasswordResult]);
				return;
			}
		}

		if(this.loadedValue.name.valueOf() != this.currVal.name.valueOf())
		{
			Agnity.showErrorMessage('critical', ['failedValidation',"Cannot modify CAS Name"]);
			return;
		}


		this.availableCASServersDataList.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityCASData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.validateFields = function(currVal, validator, allowEmptyPassword){
		var errorMsg = [
			 validator.checkEmpty(currVal.name, mxResources.get('name')),
			 validator.checkEmpty(currVal.ip, mxResources.get('ip')),
			 validator.checkEmpty(currVal.port, mxResources.get('port')),
			 validator.checkEmpty(currVal.sshUser, mxResources.get('sshUser')),
			 validator.checkEmpty(currVal.sshPort, mxResources.get('sshPort')),
			 validator.checkEmpty(currVal.httpport, mxResources.get('httpport')),
			validator.checkEmpty(currVal.ctfsd,mxResources.get('ctfsd')),
			validator.checkEmpty(currVal.group,mxResources.get('group'))
		]
		if(allowEmptyPassword)
		{
			errorMsg.push(validator.checkEmpty(currVal.sshPassword, mxResources.get('sshPassword')))
			errorMsg.push(validator.checkEmpty(currVal.sshCnfPassword, mxResources.get('sshCnfPassword')))
		}

		for(var i=0; i< errorMsg.length; i++)
		{
			if(errorMsg[i] != null)
		    {
		        Agnity.showErrorMessage('critical', ['failedValidation', errorMsg[i]]);
		    	return false;
		    }
		}

		return true;
	}

	this.setupListingPanel = function () {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.availableCASServersDataList, ['name', 'ip', 'port', {
			'head': 'sshUser',
			'type': 'html',
			'formatter': function (value) {
				return self.undefinedFormatter(value)
			}
		}, {
			'head': 'sshPort', 'type': 'html', 'formatter': function (value) {
				return self.undefinedFormatter(value)
			}
		}, {
			'head': 'ctfsd', 'type': 'html', 'formatter': function (value) {
				return self.undefinedFormatter(value)
			}
		}, {
			'head': 'httpport', 'type': 'html', 'formatter': function (value) {
				return self.undefinedFormatter(value)
			}
		},'group']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{'name': 'name', 'width': '12%'}, {
			'name': 'ip',
			'width': '14%'
		}, {'name': 'port', 'width': '10%'}, {'name': 'sshUser', 'width': '12%'}, {
			'name': 'sshPort',
			'width': '8%'
		}, {'name': 'ctfsd', 'width': '20%'}, {'name': 'httpport', 'width': '10%'},
			{'name': 'group', 'width': '10%'},
			{
				'name': 'action',
				'width': '12%'
			}], this.listModel, this.onListAction.bind(this));
	}

	this.undefinedFormatter = function(value)
	{
		if(value == undefined)
		{
			return '';
		}
	    return value;
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.loadedValue = JSON.parse(JSON.stringify(entry));
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.availableCASServersDataList.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityCASData();
			this.availableCASServersDataList.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('casConfigureDialog');
		this.dialogHelper.setDetailPageGrid(5, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				var casServersData = new AgnitySaveCASServersHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());
				var filteredCasServerDetails = self.availableCASServersDataList.map(function(data){
					data = Object.assign({}, data);
					if(data.sshCnfPassword)
					{
						delete data.sshCnfPassword;
					}

					return data;
				})
				casServersData.storeData(filteredCasServerDetails);

				if (callback != null && typeof callback === "function")
					callback(self.availableCASServersDataList);

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityCASServersGroupDialog(ui, inAvailableCASServersData, callback) {
	this.dialogHelper = new AgnityDialogHelper();
	this.availableCASServersDataList = inAvailableCASServersData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityCASGroupData();
	this.listModel = null;
	this.currRow = -1;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
			self.currVal.name = this.value;
		},null, false));

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.dialogHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function() {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function() {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.validateCasDetails = () => {
		if(this.currVal.name == null || this.currVal.name == undefined || this.currVal.name == '') {
			return 'Please enter group name';
		}
		
		return '';
	}

	this.saveCurrVal = function() {
		var validationMessage = this.validateCasDetails();

		if(validationMessage !== '') {
			Agnity.showErrorMessage('critical', ['failedServerResponse', validationMessage]);
			return;
		}

		this.availableCASServersDataList.push(this.currVal);
		this.currVal = new AgnityCASGroupData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();

	}

	this.updateCurrVal = function() {
		this.availableCASServersDataList.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnityCASGroupData();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.availableCASServersDataList, ['name']);

		this.dialogHelper.listActions = [['load', 'geSprite-insert'], ['insert', 'geSprite-plus'], ['delete', 'geSprite-delete']];
		this.dialogHelper.setRelatedListing([{ 'name': 'name', 'width': '60%' }, { 'name': 'action', 'width': '40%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.availableCASServersDataList.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		}
		else if (action == 'insert') {
			entry = new AgnityCASGroupData();
			this.availableCASServersDataList.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('casGroupConfigureDialog');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();

		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				var casServersData = new AgnitySaveCASServersGroupHelper(Agnity.getDomainName(), Agnity.getUrlParam('operationMode'), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam());
				casServersData.storeData(self.availableCASServersDataList);

				if (callback != null && typeof callback === "function")
					callback(self.availableCASServersDataList);

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}


function AgnityProcessSetVarDialog(ui, inProcessNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.processNodeData = inProcessNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityProcessNodeVariable();
	this.listModel = null;
	this.isListingPanelLoaded = false;

	this.setupDetailPanel = function() {
		var self = this;

		var processVarSelector = new AgnityDynamicDropDownHelper();
		var outVarSelector = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, processVarSelector.setupWidget(new AgnityGetProcessVariablesHelper(self.processNodeData.processName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.processVar, 'processVar', function() {
			self.currVal.processVar = this.value;
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.processNodeData.ui);
		selector.setupWidgetInDialog(this.currVal.invarType, this.currVal.inVar, 'inVar', function(value) { self.currVal.invarType = value; }, function(value) { self.currVal.inVar = value; }, 0, 1, 0, 2);

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, outVarSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.outVar, 'outVar', function(event) {
			if (this.value == 'AgnityNewRecordRequest') {
				self.currVal.outVar = '';
			}
			else
				self.currVal.outVar = this.value;
		}, 'none'));
	}

	this.saveCurrVal = function() {
		this.processNodeData.processNodeVariableMap.set(this.currVal.processVar, this.currVal);
		this.currVal = new AgnityProcessNodeVariable();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		var dataProvider = new AgnityGetProcessVariablesHelper(this.processNodeData.processName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());

		dataProvider.fetchData(function(possibleValues) {
			if (self.isListingPanelLoaded == false) {
				for (var idx = 0; idx < possibleValues.length; idx++) {
					var currVal = new AgnityProcessNodeVariable();
					currVal.processVar = possibleValues[idx];
					if (self.processNodeData.processNodeVariableMap.get(possibleValues[idx]) == null || !self.processNodeData.processNodeVariableMap.get(possibleValues[idx]))
						self.processNodeData.processNodeVariableMap.set(possibleValues[idx], currVal);
				}

				self.setupListingPanel();
				self.isListingPanelLoaded = true;
			}
		});

		this.listModel = Agnity.getDialogListingModelFromMap(this.processNodeData.processNodeVariableMap, ['processVar', ['invarType', agnityGlobalData.valueType], 'inVar', 'outVar']);

		this.dialogHelper.setRelatedListing([{ 'name': 'processVar', 'width': '28%' }, { 'name': 'invarType', 'width': '12%' }, { 'name': 'inVar', 'width': '27%' }, { 'name': 'outVar', 'width': '20%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.processNodeData.processNodeVariableMap.delete(entry.to);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('processVarSetting');
		this.dialogHelper.setDetailPageGrid(2, 3);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.processNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnitySelectPatternDialog(ui, inPatternNodeData, inPatternType, inHeading, callback) {
	this.dialogHelper = new AgnityDialogHelper();
	this.patternNodeData = inPatternNodeData;
	this.searchPattern = '';
	this.pattern = inPatternNodeData.patternId;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;
		var selectPatternDropDown = new AgnitySelectPatternDropDown(ui);

		this.dialogHelper.setHeading(inHeading);
		this.dialogHelper.setDetailPageGrid(3, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, selectPatternDropDown.setupSearchWidget('searchPattern', function() {
			self.searchPattern = this.value;
			if (self.searchPattern.length > 3)
				selectPatternDropDown.rebuildOptions(self.searchPattern, inPatternType);
		}));
		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createSearchButtonRowField('search', function() {
			selectPatternDropDown.rebuildOptions(self.searchPattern, inPatternType);
		}));
		this.dialogHelper.addPanelToDetailPageGrid(2, 0, selectPatternDropDown.setupWidget(new AgnityGetFilteredPatternsHelper(Agnity.getTreeData(self.patternNodeData.ui).forestName, Agnity.getUrlParam('diagram'),
			self.searchPattern, inPatternType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.pattern, null,
			function() {
				self.pattern = this.value;
			}));
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				callback(self.pattern);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}

}

function AgnityDiagramSavedCopiesDialog(ui, autoSaveTime, callback) {
	this.dialogHelper = new AgnityDialogHelper();
	this.userSelectedType = 'UiXml';
	this.parentDiv = null;

	this.userSelectMapping = agnityGlobalData.mappingData.userSelectXmlMapping;

	this.setupContainer = function() {
		var self = this;
		var date = new Date(autoSaveTime);
		var autoSaveInfo = date.toLocaleString();

		this.dialogHelper.setHeading('selectTypeOfXmlToProceed');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createRadioButtonRowField(this.userSelectMapping, this.userSelectedType, 'type', function() {
			self.userSelectedType = this.value;
		}, autoSaveInfo));

		this.dialogHelper.setDialogActions([{
			'name': 'load', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
				callback(self.userSelectedType);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityManageColumnsDialog(ui, inTableNodeData, userTypes, sequences) {
	this.dialogHelper = new AgnityDialogHelper();
	this.tableNodeData = inTableNodeData;
	this.userTypes = userTypes;
	this.sequences = sequences;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityColumnInfo();
	this.currRow = -1;
	this.listModel = null;

	this.columnTypeMapping = agnityGlobalData.mappingData.tableColumnDataTypeMapping;
	this.typeMapping = agnityGlobalData.mappingData.oracleColumnTypeMapping;
	this.sizeMapping = agnityGlobalData.mappingData.columnSizeTypeMapping;
	this.timestampMapping = agnityGlobalData.mappingData.columnTimestampTypeMapping;
	this.nullMapping = agnityGlobalData.mappingData.columnNullMapping;

	this.emptyFieldRow = Agnity.createFieldRow();

	var accountType = this.tableNodeData.accountHierarchialType;

	if (accountType == 'PROVIDER')
	{
		this.tableNodeData.manageColumnsMap.set("ACCOUNT_NUMBER", Agnity.getAccountHierarchialColumn("ACCOUNT_NUMBER", "accountNumber", "Account Number"));
	}
	else if(accountType == 'SUBSCRIBER')
	{
		this.tableNodeData.manageColumnsMap.set("ACCOUNT_NUMBER", Agnity.getAccountHierarchialColumn("ACCOUNT_NUMBER", "accountNumber", "Account Number"));
		this.tableNodeData.manageColumnsMap.set("SUBSCRIBER_ID", Agnity.getAccountHierarchialColumn("SUBSCRIBER_ID", "subscriberId", "Subscriber Id"));
	}
	else
	{
		this.tableNodeData.manageColumnsMap.set("ACCOUNT_NUMBER", Agnity.getAccountHierarchialColumn("ACCOUNT_NUMBER", "accountNumber", "Account Number"));
	}
	console.log(this.tableNodeData.manageColumnsMap);

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
			self.currVal.name = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.description, 'description', function() {
			self.currVal.description = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 2, Agnity.createDropDownRowField(this.columnTypeMapping, this.currVal.columnType, 'columnType', function() {
			self.currVal.columnType = this.value;

			self.setupDetailPanel();
		}));

		if (self.currVal.columnType == 'System Type') {
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.typeMapping, this.currVal.type, 'type', function() {
				self.currVal.type = this.value;

				self.setupDetailPanel();
			}));

			if (self.currVal.type == 'CHAR' || self.currVal.type == 'VARCHAR2' || self.currVal.type == 'CHARACTER') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.size, 'size', function() {
					self.currVal.size = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(this.sizeMapping, this.currVal.sizeType, 'sizeType', function() {
					self.currVal.sizeType = this.value;
				}));

				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'NCHAR' || self.currVal.type == 'NVARCHAR2' || self.currVal.type == 'RAW' || self.currVal.type == 'UROWID' || self.currVal.type == 'CHARACTER VARYING') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.size, 'size', function() {
					self.currVal.size = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.sizeType = '';
				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'NUMBER' || self.currVal.type == 'NUMERIC') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createInputTextRowField(this.currVal.scale, 'scale', function() {
					self.currVal.scale = this.value;
				}));

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'FLOAT' || self.currVal.type == 'INTERVAL YEAR' || self.currVal.type == 'REAL') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'TIMESTAMP') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(this.timestampMapping, this.currVal.timestampType, 'timestampType', function() {
					self.currVal.timestampType = this.value;
				}));

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.scale = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'INTERVAL DAY') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createInputTextRowField(this.currVal.secondsPrecision, 'secondsPrecision', function() {
					self.currVal.secondsPrecision = this.value;
				}));

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'FORMULA') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.formulaText, 'formulaText', function() {
					self.currVal.formulaText = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
			}
			else if (self.currVal.type == 'BINARY FLOAT' || self.currVal.type == 'BINARY DOUBLE' || self.currVal.type == 'LONG' || self.currVal.type == 'BYTEA' ||
				self.currVal.type == 'LONG RAW' || self.currVal.type == 'BLOB' || self.currVal.type == 'CLOB' || self.currVal.type == 'NCLOB' ||
				self.currVal.type == 'BFILE' || self.currVal.type == 'ROWID' || self.currVal.type == 'DATE' || self.currVal.type == 'TEXT' || self.currVal.type == 'INTERVAL') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, this.emptyFieldRow[0]);
				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
		}
		else {
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.userTypes, this.currVal.type, 'type', function() {
				self.currVal.type = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(1, 1, this.emptyFieldRow[0]);
			this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);
		}


		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createCheckboxRowField(this.currVal.isSort, 'isSort', function() {
			self.currVal.isSort = this.checked;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 1, Agnity.createInputTextRowField(this.currVal.defaultVal, 'defaultVal', function() {
			self.currVal.defaultVal = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 2, Agnity.createDropDownRowField(this.nullMapping, this.currVal.nullVal, 'nullVal', function() {
			self.currVal.nullVal = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(3, 0, Agnity.createInputTextRowField(this.currVal.apiName, 'apiName', function() {
			self.currVal.apiName = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(3, 1, Agnity.createCheckboxRowField(this.currVal.isSeqGeneratedField, 'isSeqGeneratedField', function() {
			self.currVal.isSeqGeneratedField = this.checked;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(3, 2, Agnity.createDropDownRowField(this.sequences, this.currVal.sequenceName, 'selectedSequence', function() {
			self.currVal.sequenceName = this.value;
		}));

			this.dialogHelper.addPanelToDetailPageGrid(4, 0, Agnity.createCheckboxRowField(this.currVal.isInternalProperty, 'isInternalProperty', function() {
			self.currVal.isInternalProperty = this.checked;
		}));
	}

	this.setupDBType = function() {
		var self = this;

		var dbConfig = new AgnityGetApplicationDBConfigHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		dbConfig.fetchData(function(applicationDBConfig) {
			if (applicationDBConfig.type == 'Postgres') {
				self.typeMapping = agnityGlobalData.mappingData.postgresColumnTypeMapping;
				self.timestampMapping = agnityGlobalData.mappingData.postgresColumnTimestampTypeMapping;
				self.setupDetailPanel();
			}

		});
	}

	this.saveCurrVal = function() {
		this.currVal.name = Agnity.getStringReplaceAll(this.currVal.name);
		this.tableNodeData.manageColumnsMap.set(this.currVal.name, this.currVal);
		this.currVal = new AgnityColumnInfo();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.tableNodeData.manageColumnsMap, ['name', ['columnType', this.columnTypeMapping], 'isSort', 'defaultVal', ['nullVal', this.nullMapping]]);

		this.dialogHelper.setRelatedListing([{ 'name': 'name', 'width': '17%' }, { 'name': 'columnType', 'width': '17%' }, { 'name': 'sort', 'width': '17%' }, { 'name': 'defaultVal', 'width': '17%' }, { 'name': 'nullVal', 'width': '17%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.tableNodeData.manageColumnsMap.delete(entry.name);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('tableColumnDialog');
		this.dialogHelper.setDetailPageGrid(5, 3);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupDBType();
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.tableNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityMangeConstraintsDialog(ui, inTableNodeData, dbTablesData) {
	this.graph = ui.editor.graph;
	this.cell = this.graph.getSelectionCell();

	this.dialogHelper = new AgnityDialogHelper();
	this.tableNodeData = inTableNodeData;
	this.tablesInfoMap = dbTablesData;
	this.tables = Array.from(dbTablesData.keys());

	this.parentDiv = null;
	this.saveOnClose = false;
	this.isLoaded = false;

	this.currVal = new AgnityConstraintsInfo();
	this.currRow = -1;
	this.listModel = null;

	this.selectedColumns = new Array();
	this.nonSelectedColumns = Array.from(inTableNodeData.manageColumnsMap.keys());
	this.addColumnSelected = null;
	this.removeColumnSelected = null;

	this.constraintTypeMapping = agnityGlobalData.mappingData.constraintTypeMapping;
	this.tableReferenceMapping = agnityGlobalData.mappingData.tableReferenceMapping;

	this.emptyFieldRow = Agnity.createFieldRow();
	this.prevReferenceName = null;
	this.prevReferenceType = null;
	this.prevReferenceTable = null;
	this.prevConstraintName = null;

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
			self.currVal.name = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.description, 'description', function() {
			self.currVal.description = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 2, Agnity.createDropDownRowField(this.constraintTypeMapping, this.currVal.type, 'type', function() {
			self.currVal.type = this.value;
			self.currVal.table = '';
			self.currVal.tableColumn = '';
			self.currVal.reference = '';
			self.setupDetailPanel();
		}));

		if (self.currVal.type == 'PRIMARY KEY' || self.currVal.type == 'UNIQUE' || self.currVal.type == 'FOREIGN KEY') {
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.nonSelectedColumns, this.removeColumnSelected, 'nonSelectedColumns', function() {
				self.removeColumnSelected = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createAddRemoveSelectedItemsRowField(function() {
				if (self.removeColumnSelected)
					self.removeFromNonSelectedColumn(self.removeColumnSelected);

			},
				function() {
					if (self.addColumnSelected)
						self.removeFromSelectedColumns(self.addColumnSelected);

				}));

			this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(this.selectedColumns, this.addColumnSelected, 'selectedColumns', function() {

				self.addColumnSelected = this.value;
			}));

		}
		else if (self.currVal.type == 'CHECK') {
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowField(this.currVal.check, 'checkText', function() {
				self.currVal.check = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(1, 1, this.emptyFieldRow[0]);
			this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);
		}

		if (self.currVal.type == 'FOREIGN KEY') {
			this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createDropDownRowField(this.tables, this.currVal.table, 'tables', function() {
				self.currVal.table = this.value;

				self.setupDetailPanel();
			}));

			this.dialogHelper.addPanelToDetailPageGrid(2, 1, Agnity.createDropDownRowField(this.tablesInfoMap.get(self.currVal.table), this.currVal.tableColumn, 'selectColumn', function() {
				self.currVal.tableColumn = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(2, 2, Agnity.createDropDownRowField(this.tableReferenceMapping, this.currVal.reference, 'reference', function() {
				self.currVal.reference = this.value;
			}));
		}
		else {
			this.dialogHelper.addPanelToDetailPageGrid(2, 0, this.emptyFieldRow[0]);
			this.dialogHelper.addPanelToDetailPageGrid(2, 1, this.emptyFieldRow[0]);
			this.dialogHelper.addPanelToDetailPageGrid(2, 2, this.emptyFieldRow[0]);
		}
	}

	this.removeFromNonSelectedColumn = function(selectedColumn) {
		var self = this;

		this.selectedColumns.push(selectedColumn);
		var index = this.nonSelectedColumns.indexOf(selectedColumn);

		if (index > -1) {
			this.nonSelectedColumns.splice(index, 1);
		}

		this.currVal.selectedColumns = self.getSelectedColumns(self.selectedColumns);
		this.setupDetailPanel();
	}

	this.removeFromSelectedColumns = function(selectedColumn) {
		var self = this;

		this.nonSelectedColumns.push(selectedColumn);
		var index = this.selectedColumns.indexOf(selectedColumn);

		if (index > -1) {
			this.selectedColumns.splice(index, 1);
		}

		this.currVal.selectedColumns = self.getSelectedColumns(self.selectedColumns);
		this.setupDetailPanel();
	}

	this.setupSelectedNonSelectedColumns = function() {
		var self = this;

		this.nonSelectedColumns = new Array();
		this.nonSelectedColumns = Array.from(self.tableNodeData.manageColumnsMap.keys());
		this.selectedColumns = new Array();
		this.setupDetailPanel();
	}

	this.getSelectedColumns = function(selectedColumns) {
		var list = selectedColumns;
		var ret = '';
		for (var idx = 0; idx < list.length; idx++) {
			if (idx == 0) {
				ret = list[idx];
			}
			else {
				ret += ',' + list[idx];
			}
		}
		return ret;
	}

	this.saveCurrVal = function() {
		this.currVal.name = Agnity.getStringReplaceAll(this.currVal.name);
		this.setupReferencePanel(this.currVal, true);
		this.tableNodeData.manageConstraintsMap.set(this.currVal.name, this.currVal);
		this.currVal = new AgnityConstraintsInfo();
		this.setupSelectedNonSelectedColumns();
		this.setupDetailPanel();
		this.setupListingPanel();

		this.isLoaded = false;
		this.prevReferenceName = null;
		this.prevReferenceType = null;
		this.prevReferenceTable = null;
		this.prevConstraintName = null;
	}

	this.setupReferencePanel = function(currVal, isKey) {
		if (currVal.type == 'FOREIGN KEY' || this.prevReferenceType == 'FOREIGN KEY') {
			var sourceCellId = this.cell.getId();
			var targetCellId = Agnity.getCellId(ui, currVal.table);
			var referenceName = currVal.tableColumn;
			var prevReferenceTable = this.prevReferenceTable;
			var prevTargetCellId = Agnity.getCellId(ui, prevReferenceTable);

			if (isKey) {
				if (this.isLoaded && (prevReferenceTable != currVal.table)) {
					Agnity.createForeignKeyConstraints(ui, sourceCellId, targetCellId, isKey, referenceName);
					Agnity.createForeignKeyConstraints(ui, sourceCellId, prevTargetCellId, false, this.prevReferenceName);
				}
				else {
					Agnity.createForeignKeyConstraints(ui, sourceCellId, targetCellId, isKey, referenceName);

					if (referenceName != this.prevReferenceName && this.prevReferenceName != null && this.prevReferenceName != '' && this.prevConstraintName == currVal.name) {
						Agnity.createForeignKeyConstraints(ui, sourceCellId, targetCellId, false, this.prevReferenceName);
					}

				}
			}
			else
				Agnity.createForeignKeyConstraints(ui, sourceCellId, targetCellId, isKey, referenceName, false, null);
		}
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.tableNodeData.manageConstraintsMap, ['name', ['type', this.constraintTypeMapping], 'description']);

		this.dialogHelper.setRelatedListing([{ 'name': 'name', 'width': '25%' }, { 'name': 'type', 'width': '25%' }, { 'name': 'description', 'width': '25%' }, { 'name': 'action', 'width': '25%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.isLoaded = true;
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.prevReferenceName = this.currVal.tableColumn;
			this.prevReferenceType = this.currVal.type;
			this.prevReferenceTable = this.currVal.table;
			this.prevConstraintName = this.currVal.name;
			this.selectedColumns = this.currVal.selectedColumns.split(',');

			this.nonSelectedColumns = Array.from(inTableNodeData.manageColumnsMap.keys());
			for (var idx = 0; idx < this.selectedColumns.length; idx++) {
				var index = this.nonSelectedColumns.indexOf(this.selectedColumns[idx]);

				if (index > -1) {
					this.nonSelectedColumns.splice(index, 1);
				}
			}

			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.setupReferencePanel(entry, false);
			this.tableNodeData.manageConstraintsMap.delete(entry.name);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('manageConstraintsDialog');
		this.dialogHelper.setDetailPageGrid(3, 3);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {

				Agnity.storeNodeData(self.tableNodeData);
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityManageIndexesDialog(ui, inTableNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.tableNodeData = inTableNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityIndex();
	this.currRow = -1;
	this.listModel = null;

	this.selectedColumns = new Array();
	this.availableColumns = Array.from(inTableNodeData.manageColumnsMap.keys());
	this.columnToAdd = null;
	this.columnToRemove = null;
	this.order = null;

	this.indexTypeMapping = agnityGlobalData.mappingData.indexTypeMapping;
	this.indexOrderMapping = agnityGlobalData.mappingData.indexOrderMapping;
	this.indexSortMapping = agnityGlobalData.mappingData.indexSortMapping;
	this.indexVisibleTypeMapping = agnityGlobalData.mappingData.indexVisibleTypeMapping;

	this.setupDetailPanel = function() {
		var self = this;
		this.order = '';

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
			self.currVal.name = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.description, 'description', function() {
			self.currVal.description = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 2, Agnity.createDropDownRowField(this.indexTypeMapping, this.currVal.type, 'type', function() {
			self.currVal.type = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.availableColumns, this.columnToAdd, 'availableColumns', function() {
			self.columnToAdd = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createDropDownRowField(this.indexOrderMapping, this.order, 'order', function() {
			self.order = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createAddRemoveSelectedItemsRowField(function() {
			if (self.columnToAdd)
				self.removeFromAvailableColumns(self.columnToAdd);
		},
			function() {
				if (self.columnToRemove)
					self.removeFromSelectedColumns(self.columnToRemove);
			}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 3, Agnity.createDropDownRowField(this.selectedColumns, this.columnToRemove, 'selectedColumns', function() {
			self.columnToRemove = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 0, Agnity.createDropDownRowField(this.indexSortMapping, this.currVal.sort, 'sortType', function() {
			self.currVal.sort = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 1, Agnity.createCheckboxRowField(this.currVal.isReverse, 'isReverse', function() {
			self.currVal.isReverse = this.checked;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(2, 2, Agnity.createDropDownRowField(this.indexVisibleTypeMapping, this.currVal.visible, 'visibleType', function() {
			self.currVal.visible = this.value;
		}));

	}

	this.removeFromAvailableColumns = function(selectedColumn) {
		var self = this;

		this.selectedColumns.push(selectedColumn + ' ' + this.order);
		var index = this.availableColumns.indexOf(selectedColumn);

		if (index > -1) {
			this.availableColumns.splice(index, 1);
		}

		this.currVal.selectedColumns = self.getSelectedColumns(self.selectedColumns);
		this.setupDetailPanel();
	}

	this.removeFromSelectedColumns = function(selectedColumn) {
		var self = this;
		var currColumn = selectedColumn;

		selectedColumn = selectedColumn.replace(' ASC', '');
		selectedColumn = selectedColumn.replace(' DESC', '');
		selectedColumn = selectedColumn.trim();

		this.availableColumns.push(selectedColumn);
		var index = this.selectedColumns.indexOf(currColumn);

		if (index > -1) {
			this.selectedColumns.splice(index, 1);
		}

		this.currVal.selectedColumns = self.getSelectedColumns(self.selectedColumns);
		this.setupDetailPanel();
	}

	this.saveCurrVal = function() {
		this.currVal.name = Agnity.getStringReplaceAll(this.currVal.name);
		this.tableNodeData.manageIndexesMap.set(this.currVal.name, this.currVal);
		this.currVal = new AgnityIndex();
		this.setupSelectedNonSelectedColumns();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupSelectedNonSelectedColumns = function() {
		var self = this;

		this.availableColumns = new Array();
		this.availableColumns = Array.from(self.tableNodeData.manageColumnsMap.keys());
		this.selectedColumns = new Array();
		this.setupDetailPanel();
	}

	this.getSelectedColumns = function(selectedColumns) {
		var list = selectedColumns;
		var ret = '';
		for (var idx = 0; idx < list.length; idx++) {
			if (idx == 0) {
				ret = list[idx];
			}
			else {
				ret += ',' + list[idx];
			}
		}
		return ret;
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.tableNodeData.manageIndexesMap, ['name', 'description', ['type', this.indexTypeMapping], 'isReverse']);

		this.dialogHelper.setRelatedListing([{ 'name': 'name', 'width': '20%' }, { 'name': 'description', 'width': '20%' }, { 'name': 'type', 'width': '20%' }, { 'name': 'isReverse', 'width': '20%' }, { 'name': 'action', 'width': '20%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.setupSelectedNonSelectedColumns();
			this.currVal = JSON.parse(JSON.stringify(entry));

			var selectedColumns = this.currVal.selectedColumns.split(',');
			for (var idx = 0; idx < selectedColumns.length; idx++) {
				var selectedColumn = this.getSelectedColumnName(selectedColumns[idx]);

				this.removeFromAvailableColumns(selectedColumn);
			}

			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.tableNodeData.manageIndexesMap.delete(entry.name);
			this.setupListingPanel();
		}
	}

	this.getSelectedColumnName = function(selectedColumn) {
		var currColumn = selectedColumn;

		selectedColumn = selectedColumn.replace(' ASC', '');
		selectedColumn = selectedColumn.replace(' DESC', '');
		selectedColumn = selectedColumn.trim();

		if (currColumn.includes(' ASC'))
			this.order = 'ASC';
		else if (currColumn.includes(' DESC'))
			this.order = 'DESC';
		else
			this.order = '';

		return selectedColumn;
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('tableIndexDialog');
		this.dialogHelper.setDetailPageGrid(3, 4);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.tableNodeData);
				}
				console.log(self.tableNodeData.manageIndexesMap);
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityDefineObjectRuleDialog(ui, inTableNodeData)
{
	this.dialogHelper = new AgnityDialogHelper();
	this.tableNodeData = inTableNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityObjectRuleInfo();
	this.listModel = null;

	this.isLoadedData = false;
	this.loadedIndex = 0;

	this.setupDetailPanel = function()
	{
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(self.currVal.expression, 'expression', function() {
			self.currVal.expression = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowField(self.currVal.errorMessage, 'errorMessage', function() {
			self.currVal.errorMessage = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createCheckboxRowField(self.currVal.errorOnTrue, 'errorOnTrue', function() {
			self.currVal.errorOnTrue = this.checked;
		}));


	}

	this.saveCurrVal = function()
	{
		if(!this.tableNodeData.validationRules)
		{
			this.tableNodeData.validationRules = new Array();
		}

		if(this.isLoadedData)
		{
			this.isLoadedData = false;
			console.log('[Jensi]-' + JSON.stringify(this.currVal));
			this.tableNodeData.validationRules.splice(this.loadedIndex, 1, this.currVal);
		}
		else
		{
			this.tableNodeData.validationRules.push(this.currVal);
		}

		this.currVal = new AgnityObjectRuleInfo();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function()
	{
		var self = this;

		console.log('[]Jensi]- ' + JSON.stringify(this.tableNodeData.validationRules));

		this.listModel = new AgnityDialogListingModel(this.tableNodeData.validationRules, ['expression', 'errorMessage', 'errorOnTrue']);

		this.dialogHelper.setRelatedListing([{ 'name': 'expression', 'width': '35%' }, { 'name': 'errorMessage', 'width': '35%' }, { 'name': 'errorOnTrue', 'width': '15%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.isLoadedData = true;
			this.loadedIndex = row;
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			if(this.isLoadedData && this.loadedIndex == row)
			{
				this.isLoadedData = false;
			}
			this.tableNodeData.validationRules.splice(row, 1);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('defineRules');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.tableNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityDefineManageAuditDialog( ui, inTableNodeData )
{
	console.log('inside manage Audit dialog, outside setup Container');

	this.dialogHelper = new AgnityDialogHelper();
	this.tableNodeData = inTableNodeData;

	this.parentDiv = null;

	this.availableColumns = Array.from(inTableNodeData.manageColumnsMap.keys());
	this.columnToAdd = null;
	this.columnToRemove = null;
	this.selectedColumns = new Array();

	this.currVal = new AgnityManageAuditInfo();

	this.setupDetailPanel = function()
	{
		var self = this;
		console.log('inside setupDetail panel');

		this.dialogHelper.addPanelToDetailPageGrid( 0, 0, 
			Agnity.createInputTextRowFieldWithAuditNameValidation(this.currVal.name,'name', function() { self.currVal.name = this.value;},"","")
		);

		this.dialogHelper.addPanelToDetailPageGrid( 0, 2, Agnity.createInputTextRowField(this.currVal.description,'description',function(){
			self.currVal.description = this.value;
		}));
		
		this.dialogHelper.addPanelToDetailPageGrid( 0, 3, Agnity.createCheckboxRowField(this.currVal.ignoreAudit, 'ignoreAudit', function() {
			self.currVal.ignoreAudit = this.checked;
		}));

		this.dialogHelper.addPanelToDetailPageGrid( 1, 0, Agnity.createDropDownRowField(this.availableColumns, this.columnToAdd, 'availableColumns', function(){
			self.columnToAdd = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid( 1, 1, Agnity.createAddRemoveSelectedItemsRowField( 
			function()
			{	console.log('outside add button');
				if(self.columnToAdd)
				{   console.log('inside add button');
					self.removeFromAvailableColumns(self.columnToAdd);
				}		
			},
			function()
			{   console.log('outside remove button');
				if(self.columnToRemove)
				{   console.log('inside remove button');
					self.removeFromSelectedColumns(self.columnToRemove);
				}	
			}
		));

		this.dialogHelper.addPanelToDetailPageGrid( 1, 2, Agnity.createDropDownRowField( this.selectedColumns, this.columnToRemove,'selectedColumns', function(){
			self.columnToRemove = this.value;	
		}));
	}

	this.removeFromAvailableColumns = function(selectedColumn)
	{
		console.log('inside removeFromAvailableColumns');
		
		var self = this;

		this.selectedColumns.push(selectedColumn);
		var index = this.availableColumns.indexOf(selectedColumn);

		if(index > -1){
			this.availableColumns.splice(index, 1);
		}

		this.currVal.selectedColumns = self.getSelectedColumns(self.selectedColumns);
		this.setupDetailPanel();
	}

	this.removeFromSelectedColumns = function(selectedColumn)
	{
		console.log('inside removeFromSelectedColumns');
		
		var self = this;

		var currColumn = selectedColumn;
		selectedColumn = selectedColumn.trim();

		this.availableColumns.push( selectedColumn );
		var index = this.selectedColumns.indexOf(currColumn);

		if( index > -1 ){
			this.selectedColumns.splice(index,1);
		}

		this.currVal.selectedColumns = self.getSelectedColumns(self.selectedColumns);
		this.setupDetailPanel();
	}

	this.getSelectedColumns = function(selectedColumns)
	{
		var list = selectedColumns;
		var ret = '';
		for (var idx = 0; idx < list.length; idx++) {
			if (idx == 0) {
				ret = list[idx];
			}
			else {
				ret += ',' + list[idx];
			}
		}
		return ret;
	}
	this.saveCurrVal = function()
	{
		this.currVal.name = Agnity.getStringReplaceAll(this.currVal.name);
		if(this.currVal.name == ''){
			console.log('Empty string, enter field value');
			Agnity.showErrorMessage('critical',['containsValidationErrors','Name field cannot be empty!']);
			return;
		}

		this.audit = false;
		this.audit = this.isAuditPresent();
		console.log('this.audit : '+this.audit);
		if( this.audit )
		{
			console.log('Cannot add more than one audit, try updating the existing one');
			Agnity.showErrorMessage('critical',['containsValidationErrors','Cannot add more than one audit!']);
			return;
		}
		
		this.tableNodeData.manageAuditMap.set(this.currVal.name,this.currVal);
		this.currVal = new AgnityManageAuditInfo();
		this.setupSelectedNonSelectedColumns();
		this.setupDetailPanel();
		this.setupListingPanel();
		console.log('inside save currval function:'+ JSON.stringify(this.tableNodeData.manageAuditMap));
	}

	this.isAuditPresent = function()
	{
		var val = Agnity.convertMapToArray(this.tableNodeData.manageAuditMap);
		console.log('val length :'+val.length);
				
		if( val.length !== 0 )
			return true;

		return false;
	}

	this.setupSelectedNonSelectedColumns = function() {
		var self = this;

		this.availableColumns = new Array();
		this.availableColumns = Array.from(self.tableNodeData.manageColumnsMap.keys());
		this.selectedColumns = new Array();
		this.setupDetailPanel();
	}

	this.setupListingPanel = function()
	{
		var self = this;
		this.listModel = Agnity.getDialogListingModelFromMap(this.tableNodeData.manageAuditMap,['name','description']);
		this.dialogHelper.setRelatedListing([{'name':'name','width':"20%"},{'name':'description','width':'20%'},{'name':'action','width':'20%'}], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action,row)
	{
		var entry = this.listModel.values[row];
		
		if(action == 'load')
		{
			this.setupSelectedNonSelectedColumns();
			this.currVal = JSON.parse(JSON.stringify(entry));

			var selectedColumns = this.currVal.selectedColumns.split(',');
			for( var idx = 0; idx < selectedColumns.length; idx++ ){
				var selectedColumn = this.getSelectedColumnName(selectedColumns[idx]);

				this.removeFromAvailableColumns(selectedColumn);
			}
			this.setupDetailPanel();
		}
		else if( action == 'delete')
		{
			this.tableNodeData.manageAuditMap.delete(entry.name);
			this.setupListingPanel();
		}
	    console.log('inside onList action');
	}

	this.getSelectedColumnName = function( selectedColumn )
	{
		var currColumn = selectedColumn;

		selectedColumn = selectedColumn.trim();

		return selectedColumn;
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('manageAudit');
		this.dialogHelper.setDetailPageGrid(3, 4);
		this.setupDetailPanel();

		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function(){
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func':function(){
				if( self.saveOnClose )
				{
					Agnity.storeNodeData(self.tableNodeData);
				}
				console.log(self.tableNodeData.manageAuditMap);
				ui.hideDialog.apply(ui,arguments);
			}
		}]);
		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityManageUserColumnTypesDialog(ui, inUserTypeNodeData, dbSchemeType, userTypes, currUserType) {
	this.dialogHelper = new AgnityDialogHelper();
	this.userTypeNodeData = inUserTypeNodeData;
	this.userTypes = userTypes;
	this.currUserType = currUserType;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityColumnInfo();
	this.currRow = -1;
	this.listModel = null;

	this.typeMapping = agnityGlobalData.mappingData.oracleColumnTypeMapping;
	this.sizeMapping = agnityGlobalData.mappingData.columnSizeTypeMapping;
	this.timestampMapping = agnityGlobalData.mappingData.columnTimestampTypeMapping;
	this.columnTypeMapping = agnityGlobalData.mappingData.tableColumnDataTypeMapping;

	if (dbSchemeType == 'Postgres') {
		this.typeMapping = agnityGlobalData.mappingData.postgresColumnTypeMapping;
		this.timestampMapping = agnityGlobalData.mappingData.postgresColumnTimestampTypeMapping;
	}

	this.emptyFieldRow = Agnity.createFieldRow();

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'name', function() {
			self.currVal.name = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.description, 'description', function() {
			self.currVal.description = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 2, Agnity.createDropDownRowField(this.columnTypeMapping, this.currVal.columnType, 'columnType', function() {
			self.currVal.columnType = this.value;

			self.setupDetailPanel();
		}));

		if (self.currVal.columnType == 'System Type') {
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.typeMapping, this.currVal.type, 'type', function() {
				self.currVal.type = this.value;

				self.setupDetailPanel();
			}));

			if (self.currVal.type == 'CHAR' || self.currVal.type == 'VARCHAR2' || self.currVal.type == 'CHARACTER') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.size, 'size', function() {
					self.currVal.size = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(this.sizeMapping, this.currVal.sizeType, 'sizeType', function() {
					self.currVal.sizeType = this.value;
				}));

				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'NCHAR' || self.currVal.type == 'NVARCHAR2' || self.currVal.type == 'RAW' || self.currVal.type == 'UROWID' || self.currVal.type == 'CHARACTER' || self.currVal.type == 'CHARACTER VARYING') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.size, 'size', function() {
					self.currVal.size = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.sizeType = '';
				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'NUMBER' || self.currVal.type == 'NUMERIC') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createInputTextRowField(this.currVal.scale, 'scale', function() {
					self.currVal.scale = this.value;
				}));

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'FLOAT' || self.currVal.type == 'INTERVAL YEAR' || self.currVal.type == 'REAL') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'TIMESTAMP') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createDropDownRowField(this.timestampMapping, this.currVal.timestampType, 'timestampType', function() {
					self.currVal.timestampType = this.value;
				}));

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.scale = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'INTERVAL DAY' || self.currVal.type == 'TEXT(RAW)') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.precision, 'precision', function() {
					self.currVal.precision = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, Agnity.createInputTextRowField(this.currVal.secondsPrecision, 'secondsPrecision', function() {
					self.currVal.secondsPrecision = this.value;
				}));

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.formulaText = '';
			}
			else if (self.currVal.type == 'FORMULA') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowField(this.currVal.formulaText, 'formulaText', function() {
					self.currVal.formulaText = this.value;
				}));

				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
			}
			else if (self.currVal.type == 'BINARY FLOAT' || self.currVal.type == 'BINARY DOUBLE' || self.currVal.type == 'LONG' || self.currVal.type == 'DOUBLE PRECISION' ||
				self.currVal.type == 'LONG RAW' || self.currVal.type == 'BLOB' || self.currVal.type == 'CLOB' || self.currVal.type == 'NCLOB' || self.currVal.type == 'BYTEA' ||
				self.currVal.type == 'BFILE' || self.currVal.type == 'ROWID' || self.currVal.type == 'DATE' || self.currVal.type == 'TEXT' || self.currVal.type == 'INTERVAL') {
				this.dialogHelper.addPanelToDetailPageGrid(1, 1, this.emptyFieldRow[0]);
				this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

				self.currVal.size = '';
				self.currVal.sizeType = '';
				self.currVal.precision = '';
				self.currVal.scale = '';
				self.currVal.timestampType = '';
				self.currVal.secondsPrecision = '';
				self.currVal.formulaText = '';
			}
		}
		else {
			this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.userTypes, this.currVal.type, 'type', function() {
				self.currVal.type = this.value;
			}));

			this.dialogHelper.addPanelToDetailPageGrid(1, 1, this.emptyFieldRow[0]);
			this.dialogHelper.addPanelToDetailPageGrid(1, 2, this.emptyFieldRow[0]);

			self.currVal.size = '';
			self.currVal.sizeType = '';
			self.currVal.precision = '';
			self.currVal.scale = '';
			self.currVal.timestampType = '';
			self.currVal.secondsPrecision = '';
			self.currVal.formulaText = '';
		}

	}

	this.saveCurrVal = function() {
		this.currVal.name = Agnity.getStringReplaceAll(this.currVal.name);
		this.userTypeNodeData.manageColumnTypes.set(this.currVal.name, this.currVal);
		this.currVal = new AgnityColumnInfo();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.userTypeNodeData.manageColumnTypes, ['name', ['type', this.typeMapping], 'description']);

		this.dialogHelper.setRelatedListing([{ 'name': 'name', 'width': '25%' }, { 'name': 'type', 'width': '25%' }, { 'name': 'description', 'width': '25%' }, { 'name': 'action', 'width': '25%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));

			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.userTypeNodeData.manageColumnTypes.delete(entry.name);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('userDefinedTypeDialog');
		this.dialogHelper.setDetailPageGrid(2, 3);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.userTypeNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}

	{
		var index = this.userTypes.indexOf(this.currUserType);

		if (index > -1) {
			this.userTypes.splice(index, 1);
		}
	}
}

function AgnityTuiDataHandlerDialog(ui, inTuiNodeData) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;

	this.tuiNodeData = inTuiNodeData;
	var tempTuiJson = this.tuiNodeData.tuiJson == null || this.tuiNodeData.tuiJson == "" ? null : JSON.stringify(this.tuiNodeData.tuiJson);

	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createTextAreaRowField(tempTuiJson, function(event) {
			tempTuiJson = this.value;
		}));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('tuiDataHandler');
		this.dialogHelper.setDetailPageGrid(1, 1);

		this.setupDetailPanel();

		this.dialogHelper.setDialogActions([{
			'name': 'save', 'func': function() {
				try
				{
					if (tempTuiJson != null && tempTuiJson != "")
						self.tuiNodeData.tuiJson = JSON.parse(tempTuiJson);
					else
						self.tuiNodeData.tuiJson = "";

					ui.hideDialog.apply(ui, arguments);
				}
				catch(exp)
				{
					Agnity.showErrorMessage('critical', ['invalidInput', exp]);
					//alert(exp);
				}
			}
		},
		{
			'name': 'upload', 'func': function() {
				ui.actions.get('uploadSchema').funct(function(response) {
					self.tuiNodeData.tuiJson = JSON.parse(response);
					self.setupDetailPanel();
				});
			}
		},
		{
			'name': 'cancel', 'func': function() {
				try
				{
					if (tempTuiJson != null && tempTuiJson != "")
					self.tuiNodeData.tuiJson = JSON.parse(tempTuiJson);
					else
						self.tuiNodeData.tuiJson = "";

					ui.hideDialog.apply(ui, arguments);
				}
				catch(exp)
				{
					Agnity.showErrorMessage('critical', ['invalidInput', exp]);
					//alert(exp);
				}
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityTuiDefineKeysDialog(ui, inTuiNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.tuiNodeData = inTuiNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityTuiKey();
	this.listModel = null;

	this.setupDetailPanel = function() {
		var self = this;

		var toSelector = new AgnityDynamicDropDownHelper();

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, toSelector.setupWidget(new AgnityGetDefinedTuiKeyHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName(), self.tuiNodeData), this.currVal.id, 'key', function() {
			self.currVal.id = this.value;
		}));

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.tuiNodeData.ui);
		selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.value, 'value', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.value = value; }, 1, 0, 1, 1);
	}

	this.saveCurrVal = function() {
		this.tuiNodeData.tuiKeyMap.set(this.currVal.id, this.currVal);
		this.currVal = new AgnityTuiKey();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = Agnity.getDialogListingModelFromMap(this.tuiNodeData.tuiKeyMap, ['id', ['valueType', agnityGlobalData.valueType], 'value']);

		this.dialogHelper.setRelatedListing([{ 'name': 'key', 'width': '35%' }, { 'name': 'valueType', 'width': '15%' }, { 'name': 'value', 'width': '35%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.tuiNodeData.tuiKeyMap.delete(entry.id);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('defineKeys');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.tuiNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityDefineAvpDialog(ui, inAvpNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.avpNodeData = inAvpNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityAvpData();
	this.listModel = null;

	this.avpTypeMapping = agnityGlobalData.mappingData.avpTypeMapping;
	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.name, 'avpname', function() {
			self.currVal.name = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.code, 'avpCode', function() {
			self.currVal.code = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(0, 2, Agnity.createInputTextRowField(this.currVal.vendorId, 'avpVendorId', function() {
			self.currVal.vendorId = this.value;
		}));

		this.dialogHelper.addPanelToDetailPageGrid(1, 0, Agnity.createDropDownRowField(this.avpTypeMapping, this.currVal.type, 'avpType', function() {
			self.currVal.type = this.value;

			self.setupDetailPanel();
		}));

		if(this.avpNodeData.name === 'NODE_AVPR')
		{
			var fromSelector = new AgnityDynamicDropDownHelper();

			this.dialogHelper.addPanelToDetailPageGrid(1, 1, fromSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.data, 'avprOutput', function() {
				self.currVal.data = this.value;
			}));
		}

		if(this.avpNodeData.name === 'NODE_AVPW')
		{
			var fromSelector = new AgnityDynamicDropDownHelper();

			this.dialogHelper.addPanelToDetailPageGrid(1, 1, fromSelector.setupWidget(new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), this.currVal.data, 'avpwData', function() {
				self.currVal.data = this.value;
			}));
		}
	}

	this.saveCurrVal = function() {
		this.avpNodeData.avpMap.set(this.currVal.name, this.currVal);
		this.currVal = new AgnityAvpData();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;
		this.listModel = Agnity.getDialogListingModelFromMap(this.avpNodeData.avpMap, ['name', 'code', 'vendorId',  ['type', this.avpTypeMapping], 'data']);

		if(this.avpNodeData.name === 'NODE_AVPR')
		{
			this.dialogHelper.setRelatedListing([{ 'name': 'avpname', 'width': '20%' }, { 'name': 'avpCode', 'width': '15%' }, { 'name': 'avpVendorId', 'width': '20%' },
			 { 'name': 'avpType', 'width': '15%' },  { 'name': 'avprOutput', 'width': '15%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
		}
		if(this.avpNodeData.name === 'NODE_AVPW')
		{
			this.dialogHelper.setRelatedListing([{ 'name': 'avpname', 'width': '20%' }, { 'name': 'avpCode', 'width': '15%' }, { 'name': 'avpVendorId', 'width': '20%' },
			 { 'name': 'avpType', 'width': '15%' },  { 'name': 'avpwData', 'width': '15%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
		}
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = entry;
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.avpNodeData.avpMap.delete(entry.name);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('avpInfoHeading');
		this.dialogHelper.setDetailPageGrid(2, 3);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.avpNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
};

function AgnityUserDefinedSchemaDialog(ui, userDefinedDBSchema) {
	this.dialogHelper = new AgnityDialogHelper();

	this.parentDiv = null;

	this.schemaContent = userDefinedDBSchema;
	this.setupDetailPanel = function() {
		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createTextAreaRowField(self.schemaContent, function(event) {
			self.schemaContent = this.value;
		}));
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('userDefinedSchema');
		this.dialogHelper.setDetailPageGrid(1, 1);

		this.setupDetailPanel();

		this.dialogHelper.setDialogActions([{
			'name': 'save', 'func': function() {
				var userDefinedSchema = new AgnitySaveUserDefinedDBSchemaHelper(Agnity.getDefaultForestName(), Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				userDefinedSchema.storeData(self.schemaContent, function() { });
				ui.hideDialog.apply(ui, arguments);
			}
		},
		{
			'name': 'upload', 'func': function() {
				ui.actions.get('uploadSchema').funct(function(response) {
					self.schemaContent = response;
					self.setupDetailPanel();
				});
			}
		},
		{
			'name': 'download', 'func': function() {
				ui.actions.get('downloadUserDefinedSchema').funct(self.schemaContent);
			}
		},
		{
			'name': 'close', 'func': function () {
				ui.hideDialog.apply(ui, arguments);
			}
		}
		
	]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnityCreateVariableDialog(ui, onVariableCreateHandler) {
	this.dialogHelper = new AgnityDialogHelper();
	this.variableName = null;

	this.parentDiv = null;

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('createVariableDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField('', 'variable', function() {
			self.variableName = this.value;
		}));
		this.dialogHelper.setDialogActions([{
			'name': 'add', 'func': function() {
				ui.hideDialog.apply(ui, arguments);

				var dataProvider = new AgnityCreateVariable(self.variableName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
				dataProvider.createData(function(possibleValues) {
					if (onVariableCreateHandler != null && typeof onVariableCreateHandler === "function")
						onVariableCreateHandler(possibleValues, self.variableName);

				});

			}
		}, {
			'name': 'close', 'func': function() {
				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}

function AgnitySetFunctionArgDialog(ui, inFunctNodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.functNodeData = inFunctNodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnityFunctionArg();
	this.listModel = null;

	this.setupDetailPanel = function() {
		var self = this;

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.functNodeData.ui);
		selector.setupWidgetInDialog(this.currVal.valueType, this.currVal.value, 'arg', function(value) { self.currVal.valueType = value; }, function(value) { self.currVal.value = value; }, 1, 0, 1, 1);
	}

	this.saveCurrVal = function() {
		this.functNodeData.args.push(this.currVal);
		this.currVal = new AgnityFunctionArg();
		this.setupDetailPanel();
		this.setupListingPanel();
	}

	this.setupListingPanel = function() {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.functNodeData.args, ['valueType', 'value']);

		this.dialogHelper.setRelatedListing([{ 'name': 'valueType', 'width': '15%' }, { 'name': 'value', 'width': '70%' }, { 'name': 'action', 'width': '15%' }], this.listModel, this.onListAction.bind(this));
	}

	this.onListAction = function(action, row) {
		var entry = this.listModel.values[row];

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		}
		else if (action == 'delete') {
			this.functNodeData.args.splice(row, 1);
			this.setupListingPanel();
		}
	}

	this.setupContainer = function() {
		var self = this;

		this.dialogHelper.setHeading('setArgs');
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([{
			'name': 'add', 'func': function() {
				self.saveCurrVal();
			}
		}]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([{
			'name': 'close', 'func': function() {
				if (self.saveOnClose) {
					Agnity.storeNodeData(self.functNodeData);
				}

				ui.hideDialog.apply(ui, arguments);
			}
		}]);

		this.parentDiv = this.dialogHelper.setupContainer();
	}
}


function AgnityMessageParameterDialog(ui, inss7NodeData) {
	this.dialogHelper = new AgnityDialogHelper();
	this.ss7NodeData = inss7NodeData;

	this.parentDiv = null;
	this.saveOnClose = false;

	this.currVal = new AgnitySs7CallInitiateItem();
	this.listModel = null;
	this.currRow = -1;

	this.variableTypeMapping = agnityGlobalData.mappingData.localVariableTypeMapping;

	this.emptyFieldRow = Agnity.createFieldRow();

	this.setupDetailPanel = function () {
		var self = this;

		var self = this;

		this.dialogHelper.addPanelToDetailPageGrid(
			0,
			0,
			Agnity.createDropDownRowField(agnityGlobalData.mappingData.paramNamesSS7Mapping, this.currVal.pName, "pName", function (event) {
				self.currVal.pName = this.value;
			})
		);

		var selector = new AgnityDynamicValueSelector(this.dialogHelper, this.ss7NodeData.ui);
		selector.setupWidgetInDialog(
			this.currVal.type,
			this.currVal.pValue,
			"pValue",
			function (value) {
				self.currVal.type = value;
			},
			function (value) {
				self.currVal.pValue = value;
			},
			1,
			0,
			1,
			1
		);

		if (this.currRow == -1) {
			this.dialogHelper.setDetailPageActions([
				{
					name: "addNew",
					func: function () {
						self.saveCurrVal();
					},
				},
			]);
		} else {
			this.dialogHelper.setDetailPageActions([
				{
					name: "addNew",
					func: function () {
						self.saveCurrVal();
					},
				},
				{
					name: "update",
					func: function () {
						self.updateCurrVal();
					},
				},
			]);
		}
	};

	this.emptyOtherVals = function () {};

	this.saveCurrVal = function () {
		this.emptyOtherVals();
		this.ss7NodeData.parameterMap.push(this.currVal);
		this.currVal = new AgnitySs7CallInitiateItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	};

	this.updateCurrVal = function () {
		this.emptyOtherVals();
		this.ss7NodeData.parameterMap.splice(this.currRow, 1, this.currVal);
		this.currVal = new AgnitySs7CallInitiateItem();
		this.currRow = -1;
		this.setupDetailPanel();
		this.setupListingPanel();
	};

	this.setupListingPanel = function () {
		var self = this;

		this.listModel = new AgnityDialogListingModel(this.ss7NodeData.parameterMap, ["pName", "pValue", ["type", this.variableTypeMapping]]);

		this.dialogHelper.setRelatedListing(
			[
				{ name: "pName", width: "30%" },
				{ name: "initVal", width: "30%" },
				{ name: "type", width: "20%" },
				{ name: "action", width: "20%" },
			],
			this.listModel,
			this.onListAction.bind(this)
		);
	};

	this.onListAction = function (action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == "load") {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
		} else if (action == "delete") {
			this.ss7NodeData.parameterMap.splice(row, 1);
			this.setupListingPanel();
			this.currRow = -1;
		} else if (action == "insert") {
			entry = new AgnitySs7CallInitiateItem();
			this.ss7NodeData.parameterMap.splice(row, 0, entry);
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.setupDetailPanel();
			this.setupListingPanel();
		}
	};

	this.setupContainer = function () {
		var self = this;

		this.dialogHelper.setHeading("messageParameter_settings");
		this.dialogHelper.setDetailPageGrid(2, 2);
		this.setupDetailPanel();
		this.dialogHelper.setDetailPageActions([
			{
				name: "add",
				func: function () {
					self.saveCurrVal();
				},
			},
		]);
		this.setupListingPanel();
		this.dialogHelper.setDialogActions([
			{
				name: "close",
				func: function () {
					if (self.saveOnClose) {
						Agnity.storeNodeData(self.ss7NodeData);
						if (Agnity.isProcessDiagram()) ui.actions.get("saveProcess_int").funct(self.callback);
						else ui.actions.get("saveUiXml_int").funct(self.callback);
					}

					ui.hideDialog.apply(ui, arguments);
				},
			},
		]);

		this.parentDiv = this.dialogHelper.setupContainer();
	};
}
