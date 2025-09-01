Agnity.savePanelChanges = function(action) {
	if (agnityGlobalData.prevSelectedCellData != null) {
		var prevSelectedNodeName = agnityGlobalData.prevSelectedCellData.name;

		if (agnityGlobalData.prevSelectedCellData instanceof AgnityTreeData) {
			Agnity.storeTreeData(agnityGlobalData.prevSelectedCellData);
		}
		else if (agnityGlobalData.prevSelectedCellData instanceof AgnityComponentData) {
			Agnity.storeComponentData(agnityGlobalData.prevSelectedCellData);
		}
		else {
			Agnity.storeNodeData(agnityGlobalData.prevSelectedCellData);
		}

		if (agnityGlobalData.prevSelectedCellData instanceof AgnityTreeData && action != null) {
			var treeData = Agnity.getTreeData(agnityGlobalData.ui);
			if (treeData.treeName == null) return;
			agnityGlobalData.sendMessageToParent('setName', { 'name': treeData.treeName, 'forestName': treeData.forestName, 'diagramType': Agnity.getUrlParam('diagram') });
		}
		else if (agnityGlobalData.prevSelectedCellData instanceof AgnityComponentData && action != null) {
			var componentData = Agnity.getComponentData(agnityGlobalData.ui);
			if (componentData.componentName == null) return;
			agnityGlobalData.sendMessageToParent('setName', { 'name': componentData.componentName, 'forestName': componentData.forestName, 'diagramType': Agnity.getUrlParam('diagram') });
		}

		if (prevSelectedNodeName == 'NODE_TABLE' || prevSelectedNodeName == 'NODE_SEQUENCE' || prevSelectedNodeName == 'NODE_VIEW' || prevSelectedNodeName == 'NODE_USER_TYPE') {
			Agnity.getValidateNodeLabel(agnityGlobalData.prevSelectedCellData);
		}
	}
};

Agnity.createPropertyPanel = function(ui) {
	var graph = ui.editor;

	var propertyTabDiv = document.createElement('div');
	propertyTabDiv.setAttribute('class', 'propertyTabDiv');

	if (agnityGlobalData.prevSelectedCellData != null) {

		if(agnityGlobalData.prevSelectedCellData.name == 'NODE_MEASUREMENT_SET') {
			agnityGlobalData.setAMMappingData([agnityGlobalData.prevSelectedCellData]);
		}

		Agnity.savePanelChanges(null);
		agnityGlobalData.prevSelectedCellData = null;
	}


	if (Agnity.isComponentDiagram()) {
		Agnity.setupComponentPropertyPanel(ui, propertyTabDiv);
	}
	else {
		Agnity.setupTreePropertyPanel(ui, propertyTabDiv);
	}

	agnityGlobalData.validateNode();

	return propertyTabDiv;
};

Agnity.setupTreePropertyPanel = function(ui, propertyTabDiv) {
	var graph = ui.editor.graph;
	var cell = graph.getSelectionCell();
	var state = graph.view.getState(cell);
	Agnity["refreshParams"] = [ui, propertyTabDiv];

	if (graph.isSelectionEmpty()) {
		var panelData = null;
		if (Agnity.isProcessDiagram())
			panelData = Agnity.getProcessPropertyPanel(Agnity.getTreeData(ui));
		else if (Agnity.isDBSchemaDiagram())
			panelData = Agnity.getDBSchemaPropertyPanel(Agnity.getTreeData(ui));
		else
			panelData = Agnity.getTreePropertyPanel(Agnity.getTreeData(ui));

		propertyTabDiv.appendChild(panelData[0]);
		agnityGlobalData.prevSelectedCellData = panelData[1];

	}
	else if (cell.edge) {
		var panelData = null;
		if (Agnity.isProcessDiagram())
			panelData = Agnity.getProcessPropertyPanel(Agnity.getTreeData(ui));
		else if (Agnity.isDBSchemaDiagram())
			panelData = Agnity.getDBSchemaPropertyPanel(Agnity.getTreeData(ui));
		else
			panelData = Agnity.getTreePropertyPanel(Agnity.getTreeData(ui));

		propertyTabDiv.appendChild(panelData[0]);
		agnityGlobalData.prevSelectedCellData = panelData[1];

		Agnity.setupEdgePropertyPanel(propertyTabDiv, cell, ui);

	}
	else {
		/*
		 * if(Agnity.hasUrlReadonlyParam() && graph.isCellMovable(cell) == 1)
		 * ui.actions.get('lockUnlock').funct();
		 */

		var selectedShape = state.style['agnshape'];
		console.log('SHAR : selected Shape : ' + state.style);
		if (selectedShape == 'start') {
			var panelData = Agnity.getStartNodePropertyPanel(Agnity.getStartNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'save_cdr') {
			var panelData = Agnity.getCDRNodePropertyPanel(Agnity.getCdrNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}

		else if (selectedShape == 'interm_cdr') {
			var panelData = Agnity.getIntermCDRNodePropertyPanel(Agnity.getIntermCdrNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'assignment') {
			var panelData = Agnity.getAssignNodePropertyPanel(Agnity.getAssignNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'db_call') {
			var panelData = Agnity.getDBQueryNodePropertyPanel(Agnity.getDbNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'condition') {
			var panelData = Agnity
				.getConditionNodePropertyPanel(Agnity.getConditionNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'expression') {
			var panelData = Agnity
				.getExpressionNodePropertyPanel(Agnity.getExpressionNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'connect') {
			var panelData = Agnity.getConnectNodePropertyPanel(Agnity.getConnectNodeData(ui, cell));

			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'play_and_collect') {
			var panelData = Agnity.getPlayAndCollectNodePropertyPanel(Agnity.getPlayAndCollectNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'play') {
			var panelData = Agnity.getPlayNodePropertyPanel(Agnity.getPlayNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'playspeech') {
			var panelData = Agnity.getPlaySpeechNodePanel(Agnity.getPlaySpeechNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'external_call') {
			var panelData = Agnity
				.getSoapCallNodePropertyPanel(Agnity.getSoapNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'switch') {
			var panelData = Agnity.getSwitchNodePropertyPanel(Agnity
				.getSwitchNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'route_call') {
			var panelData = Agnity
				.getRouteCallNodePropertyPanel(Agnity.getRouteCallNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'terminate') {
			var panelData = Agnity
				.getTerminateNodePropertyPanel(Agnity.getTerminateNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'time_pattern') {
			var panelData = Agnity
				.getTimePatternPropertyPanel(Agnity.getTimePatternNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'origin_pattern') {
			var panelData = Agnity
				.getOriginPatternPropertyPanel(Agnity.getOriginPatternNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'create_conference') {
			var panelData = Agnity.getConferenceNodePropertyPanel(Agnity
				.getCreateConferenceNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'join_conference') {
			var panelData = Agnity.getJoinConferenceNodePropertyPanel(Agnity
				.getJoinConferenceNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'unjoin_conference') {
			var panelData = Agnity.getUnJoinConferencePropertyPanel(Agnity
				.getUnJoinConferenceNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'destroy_conference') {
			var panelData = Agnity.getDestroyConferencePropertyPanel(Agnity
				.getDestroyConferenceNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'record') {
			var panelData = Agnity
				.getRecordNodePanel(Agnity.getRecordNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'stop_media') {
			var panelData = Agnity
				.getStopMediaPanel(Agnity.getStopMediaNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'event_handler') {
			var panelData = Agnity
				.getEventHandlerPanel(Agnity.getEventHandlerNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'create_timer') {
			var panelData = Agnity
				.getCreateTimerPanel(Agnity.getCreateTimerNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'block_pattern') {
			var panelData = Agnity
				.getCreateBlockPatternPanel(Agnity.getBlockPatternNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'call_area_screening') {
			var panelData = Agnity
				.getCreateCallAreaScreeningPanel(Agnity.getCallAreaScreeningNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'dialed_pattern') {
			var panelData = Agnity
				.getCreateDialedPatternPanel(Agnity.getDialedPatternNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'percentage') {
			var panelData = Agnity.getCreatePercentagePanel(
				Agnity.getPercentageNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'stop_timer') {
			var panelData = Agnity.getCreateStopTimerNodePanel(
				Agnity.getStopTimerNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'account_code') {
			var panelData = Agnity.getCreateAccountCodePanel(
				Agnity.getAccountCodeNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'call_hold') {
			var panelData = Agnity.getCreateCallHoldPanel(Agnity.getCallHoldNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'digit_pattern') {
			var panelData = Agnity.getCreateDigitPatternPanel(Agnity.getDigitPatternNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'process_call') {
			var panelData = Agnity.getCreateProcessCallNodePanel(Agnity.getProcessCallNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'process_start') {
			var panelData = Agnity.getCreateProcessStartNodePanel(Agnity.getProcessStartNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'return') {
			var panelData = Agnity.getCreateReturnNodePanel(
				Agnity.getReturnNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'resync_call') {
			var panelData = Agnity.getCreateResyncCallNodePanel(Agnity.getResyncCallNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'dialout_call') {
			console.log()
			var panelData = Agnity.getCreateDialoutCallNodePanel(Agnity.getDialOutCallNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'table') {
			var panelData = Agnity.getCreateTableNodePanel(Agnity.getTableNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'sequence') {
			var panelData = Agnity.getSequenceNodePanel(Agnity.getSequenceNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'view') {
			var panelData = Agnity.getViewNodePanel(Agnity.getViewNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'user_type') {
			var panelData = Agnity.getUserTypeNodePanel(Agnity.getUserTypeNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'send_alarm') {
			var panelData = Agnity.getSendAlaramNodePanel(Agnity.getSendAlaramNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'end_execution') {
			var panelData = Agnity.getEndExecutionNodePanel(Agnity.getEndExecutionNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'send_email') {
			var panelData = Agnity.getSendEmailNodePanel(Agnity.getSendEmailNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'send_sms') {
			var panelData = Agnity.getSendSMSNodePanel(Agnity.getSendSMSNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'routing_engine') {
			var panelData = Agnity.getRoutingEngineNodePanel(Agnity.getRoutingEngineNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'route_play') {
			var panelData = Agnity.getRoutePlayNodePanel(Agnity.getREPlayNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'route_play_collect') {
			var panelData = Agnity.getRoutePlayCollectNodePanel(Agnity.getREPlayCollectNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'route') {
			var panelData = Agnity.getRouteNodePanel(Agnity.getRERouteNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'apply_charge') {
			var panelData = Agnity.getApplyChargeNodePanel(Agnity.getApplyChargeNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'automatic_code_gapping') {
			var panelData = Agnity.getACGNodePanel(Agnity.getACGNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'trigger_rule') {
			var panelData = Agnity.getTriggerRuleNodePanel(Agnity.getTriggerRuleNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'tui') {
			var panelData = Agnity.getTuiNodePanel(Agnity.getTuiNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'enum') {
			var panelData = Agnity.getEnumNodePanel(Agnity.getEnumNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'avp_reader') {
			var panelData = Agnity.getAVPRNodePanel(Agnity.getAVPRNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'avp_writer') {
			var panelData = Agnity.getAVPWNodePanel(Agnity.getAVPWNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'diameter_ccr') {
			var panelData = Agnity.getDiameterCCRNodePanel(Agnity.getDiameterCCRNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'diameter_cca') {
			var panelData = Agnity.getDiameterCCANodePanel(Agnity.getDiameterCCANodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'sip_header') {
			var panelData = Agnity.getSIPHeaderPanel(Agnity.getSipHeaderNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		
		else if(selectedShape == 'checkpoint'){
		
			var panelData = Agnity.getCheckPointPanel(Agnity.getCheckPointNodeData(ui , cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		
		else if (selectedShape == 'smpp') {
			var panelData = Agnity.getSmppNodePanel(Agnity.getSmppNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'gdi') {
			var panelData = Agnity.getGdiNodePanel(Agnity.getGdiNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'disconnect_leg') {
			var panelData = Agnity.getDisconnectLegNodePanel(Agnity.getDisconnectLegNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'force_call_cleanup') {
			var panelData = Agnity.getForceCallCleanupNodePanel(Agnity.getForceCallCleanupNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'service_chaining') {
			var panelData = Agnity.getServiceChainingNodePanel(Agnity.getServiceChainingNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'ati') {
			var panelData = Agnity.getATINodePanel(Agnity.getATINodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'udr') {
			var panelData = Agnity.getUDRNodePanel(Agnity.getUDRNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'ccb') {
			var panelData = Agnity.getCCBNodePanel(Agnity.getCCBNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
        else if (selectedShape == 'peg_count') {
            var panelData = Agnity.getPegCountNodePanel(Agnity.getPegCountData(ui, cell));
            propertyTabDiv.appendChild(panelData[0]);
            agnityGlobalData.prevSelectedCellData = panelData[1];
        }
		else if (selectedShape == 'http_ra') {
            var panelData = Agnity.getHttpRaNodePanel(Agnity.getHttpRaNodeData(ui, cell));
            propertyTabDiv.appendChild(panelData[0]);
            agnityGlobalData.prevSelectedCellData = panelData[1];
        }
		else if (selectedShape == 'application_measurement_counter') {
			var panelData = Agnity.getApplicationCounterNodePanel(Agnity.getApplicationCounterData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'echo_data') {
			var panelData = Agnity.getEchoNodePropertyPanel(Agnity.getEchoDataNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'call_queuing') {
			var panelData = Agnity.getCallQueuingNodePanel(Agnity.getCallQueuingNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'initiate_ss7_call') {

			let initialState = Agnity.getinitiateSs7CallNodeData(ui, cell);
			if(agnityGlobalData.prevSelectedCellData !== null) initialState = agnityGlobalData.prevSelectedCellData;

			var panelData = Agnity.getinitiateSs7CallNodePanel(initialState);

			if(propertyTabDiv.children[0]) propertyTabDiv.children[0].replaceWith(panelData[0]);
			else propertyTabDiv.appendChild(panelData[0]);

			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (selectedShape == 'logging') {
            var panelData = Agnity.getLoggingNodePanel(Agnity.getLoggingNodeData(ui, cell));
            propertyTabDiv.appendChild(panelData[0]);
            agnityGlobalData.prevSelectedCellData = panelData[1];
        }
		else if (!selectedShape && Agnity.isProcessDiagram()) {
			var panelData = Agnity.getProcessPropertyPanel(Agnity.getTreeData(ui));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else if (!selectedShape && Agnity.isDBSchemaDiagram()) {
			var panelData = Agnity.getDBSchemaPropertyPanel(Agnity.getTreeData(ui));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else {
			var panelData = Agnity.getTreePropertyPanel(Agnity.getTreeData(ui));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
			console.log(agnityGlobalData.prevSelectedCellData);
		}

	}
}

Agnity.setupComponentPropertyPanel = function(ui, propertyTabDiv) {
	var graph = ui.editor.graph;
	var cell = graph.getSelectionCell();
	var state = graph.view.getState(cell);

	if (graph.isSelectionEmpty()) {
		var panelData = Agnity.getComponentPropertyPanel(Agnity.getComponentData(ui));
		propertyTabDiv.appendChild(panelData[0]);
		agnityGlobalData.prevSelectedCellData = panelData[1];
	}
	else if (cell.edge) {
		var panelData = Agnity.getComponentPropertyPanel(Agnity.getComponentData(ui));
		propertyTabDiv.appendChild(panelData[0]);
		agnityGlobalData.prevSelectedCellData = panelData[1];
	}
	else if (cell.vertex) {
		/*
		 * if(Agnity.hasUrlReadonlyParam() && graph.isCellMovable(cell) == 1)
		 * ui.actions.get('lockUnlock').funct();
		 */

		var selectedShape = state.style['agnshape'];

		if (selectedShape == 'tree_node') {
			var panelData = Agnity.getTreeNodePropertyPanel(Agnity.getTreeNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
			/*
			 * propertyTabDiv.appendChild(Agnity.createComponentConnectorCheckboxRowField('Initial
			 * Processing', function(event) {
			 * 
			 * }));
			 */
		}
		else if (selectedShape == 'function_block') {
			var panelData = Agnity.getFunctionBlockNodePropertyPanel(Agnity.getFunctionBlockNodeData(ui, cell));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}
		else {
			var panelData = Agnity.getComponentPropertyPanel(Agnity.getComponentData(ui));
			propertyTabDiv.appendChild(panelData[0]);
			agnityGlobalData.prevSelectedCellData = panelData[1];
		}

		if (cell.value != null && cell.value.attributes != null) {
			var componentData = Agnity.getComponentData(ui);
			var agnityData = JSON.parse(cell.value.attributes.agnityData.nodeValue);

			ui.actions.get('getReferencedNodes_int').funct(componentData.forestName, componentData.componentName, agnityData.nodeId,
				function(possibleReferencedNodes) {
					Agnity.setupReferenceNodesConnectorPanel(propertyTabDiv, cell, ui, possibleReferencedNodes);
				});

		}
	}
}

Agnity.setupReferenceNodesConnectorPanel = function(propertyTabDiv, cell, ui, possibleReferencedNodes) {
	if (possibleReferencedNodes == null || possibleReferencedNodes.length == 0) return;

	var panel = document.createElement('div');
	panel.setAttribute('class', 'AgnityReferencedNodesConnectorPanel');

	var title = document.createElement('h3');
	mxUtils.write(title, mxResources.get('connector'));
	panel.appendChild(title);

	for (var idx = 0; idx < possibleReferencedNodes.length; idx++) {
		panel.appendChild(Agnity.createReferencedNodeField(ui, cell.getId(), possibleReferencedNodes[idx]['cellId']));
	}

	propertyTabDiv.appendChild(panel);
}

Agnity.setupEdgePropertyPanel = function(propertyTabDiv, cell, ui) {
	var agnityData = '';
	var edgeStyle = ui.editor.graph.getCellStyle(cell);
	var sourceCell = null;

	if (edgeStyle.endArrow == undefined && edgeStyle.startArrow != undefined) {
		if (cell.target == null) return;
		sourceCell = cell.target;
		agnityData = JSON
			.parse(cell.target.value.attributes.agnityData.nodeValue);
	}
	else if (edgeStyle.endArrow != undefined
		&& edgeStyle.startArrow == undefined) {
		if (cell.source == null) return;
		sourceCell = cell.source;
		agnityData = JSON
			.parse(cell.source.value.attributes.agnityData.nodeValue);
	}
	else {
		return;
	}

	if (agnityData.name == 'NODE_DB_QUERY') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.dbNodeConnectorsMapping, sourceCell, true));
	}
	else if (agnityData.name == 'NODE_FUNCTION' ||agnityData.name == 'NODE_INTERM_CDR' ||  agnityData.name == 'NODE_CREATE_CONF' ||agnityData.name == 'NODE_JOIN_CONF' ||agnityData.name == 'NODE_UNJOIN_CONF' || agnityData.name == 'NODE_DESTROY_CONF' ||
		agnityData.name == 'NODE_TIME_PATTERN' || agnityData.name == 'NODE_STOP_MEDIA' || agnityData.name == 'NODE_ORIGIN_PATTERN' ||
		agnityData.name == 'NODE_RECORD' || agnityData.name == 'NODE_ROUTECALL' || agnityData.name == 'NODE_CREATE_TIMER' ||
		agnityData.name == 'NODE_BLOCKED_PHONE_LIST' || agnityData.name == 'NODE_CALL_AREA_SCREENING' || agnityData.name == 'NODE_DIALED_PATTERN' ||
		agnityData.name == 'NODE_ACCOUNT_CODE' || agnityData.name == 'NODE_CALL_HOLD' || agnityData.name == 'NODE_STOP_TIMER' ||
		agnityData.name == 'NODE_DIGIT_PATTERN' || agnityData.name == 'NODE_RESYNC_CALL' || agnityData.name == 'NODE_DIALOUTCALL' ||
		agnityData.name == 'NODE_SOAP_QUERY' || agnityData.name == 'NODE_SEND_ALARM' || agnityData.name == 'NODE_TUI' || agnityData.name == 'NODE_ENUMSERVICE' ||
		agnityData.name == 'NODE_AVPR' || agnityData.name == 'NODE_AVPW' || agnityData.name == 'NODE_DIAMETER_CCR' || agnityData.name == 'NODE_DIAMETER_CCA' ||
		agnityData.name == 'NODE_SIP_HEADER' || agnityData.name == 'NODE_CHECKPOINT'|| agnityData.name == 'NODE_SMPP' || agnityData.name == 'NODE_ECHO' || agnityData.name == 'NODE_CCB' || agnityData.name == 'NODE_ATI'
		|| agnityData.name == 'NODE_UDR'|| agnityData.name == 'NODE_SERVICE_CHAINING'|| agnityData.name == 'NODE_FORCE_CALL_CLEANUP'|| agnityData.name == 'NODE_GDI' || agnityData.name == 'NODE_DISCONNECTLEG' || agnityData.name == 'NODE_INITIATE_SS7_CALL') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.conditionalConnectorsMapping, sourceCell, false));
	}
	else if (agnityData.name == 'NODE_PLAYCOLLECT' || agnityData.name == 'NODE_PLAY' || agnityData.name == 'NODE_EMAIL' || agnityData.name == 'NODE_TEXT_SMS') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.playCollectConnectorsMapping, sourceCell, true));
	}
	else if(agnityData.name == 'NODE_PLAYSPEECH'){
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.playSpeechCollectConnectorsMapping, sourceCell, true));
	}
	else if(agnityData.name == 'NODE_HTTP_RA'){
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.httpraConnectorsMapping, sourceCell, true));
	}
	else if (agnityData.name == 'NODE_EVENT_HANDLER') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.eventHandlerConnectorsMapping, sourceCell, true));
	}
	else if (agnityData.name == 'NODE_SWITCH') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.switchConnectorsMapping, sourceCell, false));
	}
	else if (agnityData.name == 'NODE_PERCENTAGE') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.percentageConnectorsMapping, sourceCell, false));
	}
	else if (agnityData.name == 'NODE_ACG') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.acgConnectorMapping, sourceCell, false));
	}
	else if (agnityData.name == 'NODE_ROUTING_ENGINE') {
		var interestedMappingData = [];


		for (var idx = 0; idx < agnityGlobalData.mappingData.routingEngineConnectorsMapping.length; idx++) {
			var mappingData = agnityGlobalData.mappingData.routingEngineConnectorsMapping[idx];

			if ((mappingData[0] == 'play' && !agnityData.advHandlerPlay) || (mappingData[0] == 'playCollect' && !agnityData.advHandlerPlayCollect)
				|| (mappingData[0] == 'playDisconnect' && !agnityData.advHandlerPlayDisconnect)) continue;

			interestedMappingData.push(mappingData);
		}

		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, interestedMappingData, sourceCell, false));
	}
	else if (agnityData.name == 'NODE_CALL_QUEUING') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.callQueuingConnectorMapping, sourceCell, false));
	}
	else if (agnityData.name == 'NODE_LOGGING') {
		propertyTabDiv.appendChild(Agnity.createEdgeOptionsPanel(cell, ui, agnityGlobalData.mappingData.loggingConnectorsMapping, sourceCell, false));
	}
}

Agnity.getLoggingNodePanel = function(logNodeData) {
      var loggingNodePropertyPanel = document.createElement('div');
      loggingNodePropertyPanel.setAttribute('id', 'LoggingNodePropertyPanel');
      loggingNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.loggingStaticKeymapping, logNodeData.loggingMode, 'loggingMode',
          function(event) {
              logNodeData.loggingMode = this.value;
          }));
  
      loggingNodePropertyPanel.appendChild(Agnity.createInputTextRowField(logNodeData.logStatement, 'logStatement',
          function(event) {
              logNodeData.logStatement = this.value;
          }));
  
      loggingNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
          logNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(logNodeData));
      }));
  
	  return [loggingNodePropertyPanel, logNodeData];
 };


Agnity.getProcessPropertyPanel = function(inProcessData) {
	var processPropertyPanel = document.createElement('div');
	processPropertyPanel.setAttribute('id', 'ProcessPropertyPanel');

	processPropertyPanel.appendChild(Agnity.createInputTextRowField(inProcessData.treeName, 'processName', function(event) {
		inProcessData.treeName = this.value;
		inProcessData.forestName = 'AgnityProcess_' + this.value;
	}));

	return [processPropertyPanel, inProcessData];
}

Agnity.getDBSchemaPropertyPanel = function(inDBSchemaData) {
	var dbSchemaPropertyPanel = document.createElement('div');
	dbSchemaPropertyPanel.setAttribute('id', 'DBSchemaPropertyPanel');

	var forestPanelHelper = new AgnityDynamicDropDownHelper();

	dbSchemaPropertyPanel.appendChild(forestPanelHelper.setupWidget(new AgnityGetAvailableForestsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inDBSchemaData.forestName, 'forestName', function(event) {
		inDBSchemaData.forestName = this.value;
	}, null, Agnity.isADE()));

	dbSchemaPropertyPanel.appendChild(Agnity.createInputTextRowField(inDBSchemaData.apiVersion, 'apiVersion', function(event) {
		inDBSchemaData.apiVersion = this.value;
	}));

	dbSchemaPropertyPanel.appendChild(Agnity.createButtonRowField('generateApi', function(event) {
		inDBSchemaData.ui.actions.get('generateApi').funct();
	}));

	return [dbSchemaPropertyPanel, inDBSchemaData];
}

Agnity.getTreePropertyPanel = function(inTreeData) {
	var treePropertyPanel = document.createElement('div');
	treePropertyPanel.setAttribute('id', 'TreePropertyPanel');

	var forestPanelHelper = new AgnityDynamicDropDownHelper();

	treePropertyPanel.appendChild(forestPanelHelper.setupWidget(new AgnityGetAvailableForestsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inTreeData.forestName, 'forestName',
		function(event) {
			if (this.value == 'AgnityNewRecordRequest') {
				inTreeData.ui.actions.get('createForest').funct(function(possibleForests, newForestName) {
					inTreeData.forestName = newForestName;
					forestPanelHelper.rebuildEntries(possibleForests, newForestName);
				});
			}
			else {
				inTreeData.forestName = this.value;
			}
		}, 'addNewForest', Agnity.isADE())
	);

	treePropertyPanel.appendChild(Agnity.createInputTextRowField(inTreeData.treeName, 'treeName', function(event) {
		inTreeData.treeName = this.value;
	}));

	treePropertyPanel.appendChild(Agnity.createInputTextRowField(inTreeData.treeVersion, 'treeVersion', function(event) {
		inTreeData.treeVersion = this.value;
	}));
	return [treePropertyPanel, inTreeData];
};

Agnity.getStartNodePropertyPanel = function(inStartNodeData) {
	var startNodePropertyPanel = document.createElement('div');
	startNodePropertyPanel.setAttribute('id', 'StartNodePropertyPanel');

	var appEntryPanelHelper = new AgnityDynamicDropDownHelper();

	startNodePropertyPanel.appendChild(appEntryPanelHelper.setupWidget(new AgnityGetAvailableAppsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inStartNodeData.appId, 'appId',
		function(event) {
			if (this.value == 'AgnityNewRecordRequest') {
				inStartNodeData.ui.actions.get('newAppId').funct(function(possibleValues, newAppId) {
					inStartNodeData.appId = newAppId;
					appEntryPanelHelper.rebuildEntries(possibleValues, newAppId);
				});
			}
			else
				inStartNodeData.appId = this.value;
		}, 'addNewApp')
	);

	startNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inStartNodeData.versionId, 'appVersionId', function(event) {
		inStartNodeData.versionId = this.value;
	}));

	startNodePropertyPanel.appendChild(Agnity.createButtonRowField('setSMSVar', function(event) {
		inStartNodeData.ui.actions.get('setSMSVar').funct(inStartNodeData);
	}));

	startNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inStartNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inStartNodeData));
	}));

	return [startNodePropertyPanel, inStartNodeData];
};

Agnity.getCDRNodePropertyPanel = function(inCDRNodeData) {
	var cdrNodePropertyPanel = document.createElement('div');
	cdrNodePropertyPanel.setAttribute('id', 'CDRNodePropertyPanel');

	cdrNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.cdrDelimiterMapping, inCDRNodeData.delimiter, 'delimiter',
		function(event) {
			inCDRNodeData.delimiter = this.value;
		}));

	cdrNodePropertyPanel.appendChild(Agnity.createButtonRowField('setCdrParams', function(event) {
		inCDRNodeData.ui.actions.get('setCdrParams').funct(inCDRNodeData);
	}));

	cdrNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inCDRNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inCDRNodeData));
	}));

	return [cdrNodePropertyPanel, inCDRNodeData];
};

Agnity.getIntermCDRNodePropertyPanel = function(inIntermCDRNodeData) {
	var cdrNodePropertyPanel = document.createElement('div');
	cdrNodePropertyPanel.setAttribute('id', 'IntermCDRNodePropertyPanel');

	cdrNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.cdrDelimiterMapping, inIntermCDRNodeData.delimiter, 'delimiter',
		function(event) {
			inIntermCDRNodeData.delimiter = this.value;
		}));

	cdrNodePropertyPanel.appendChild(Agnity.createButtonRowField('setCdrParams', function(event) {
		inIntermCDRNodeData.ui.actions.get('setCdrParams').funct(inIntermCDRNodeData);
	}));

	cdrNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inIntermCDRNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inIntermCDRNodeData));
	}));

	return [cdrNodePropertyPanel, inIntermCDRNodeData];
};

Agnity.getAssignNodePropertyPanel = function(inAssignNodeData) {
	var assignNodePropertyPanel = document.createElement('div');
	assignNodePropertyPanel.setAttribute('id', 'AssignNodePropertyPanel');

	assignNodePropertyPanel.appendChild(Agnity.createButtonRowField('setAssignNodeVal', function(event) {
		inAssignNodeData.ui.actions.get('setAssignNodeVal').funct(
			inAssignNodeData);
	}));

	assignNodePropertyPanel.appendChild(Agnity.createButtonRowField('unsetAssignNodeVal', function(event) {
		inAssignNodeData.ui.actions.get('unsetAssignNodeVal').funct(
			inAssignNodeData);
	}));

	assignNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inAssignNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inAssignNodeData));
	}));

	return [assignNodePropertyPanel, inAssignNodeData];
};

Agnity.getDBQueryNodePropertyPanel = function(inDBQueryNodeData) {
	var dbQueryNodePropertyPanel = document.createElement('div');
	dbQueryNodePropertyPanel.setAttribute('id', 'DBQueryNodePropertyPanel');

	var packageSelector = new AgnityDynamicValueSelector(dbQueryNodePropertyPanel, inDBQueryNodeData.ui);

	packageSelector.setupWidget(inDBQueryNodeData.packageType, inDBQueryNodeData.package, 'package',
		function(value) {
			inDBQueryNodeData.packageType = value;
		},
		function(value) {
			inDBQueryNodeData.package = value;
		});

	dbQueryNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inDBQueryNodeData.procQuery, 'procquery', function(event) {
		inDBQueryNodeData.procQuery = this.value;
	}));

	dbQueryNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.dbResultsInMapping,
		inDBQueryNodeData.results_in, 'results_in', function(event) {
		inDBQueryNodeData.results_in = this.value;
	}));

	dbQueryNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(inDBQueryNodeData.isQuery,
		'query', function(event) {
		inDBQueryNodeData.isQuery = this.checked;
	}));
	
	dbQueryNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(inDBQueryNodeData.isReadOnly,
		'isReadOnly', function(event) {
		inDBQueryNodeData.isReadOnly = this.checked;
	}));

	dbQueryNodePropertyPanel.appendChild(Agnity.createButtonRowField('dbQuerySpecifierMap', function(event) {
		inDBQueryNodeData.ui.actions.get('dbQuerySpecifierMap').funct(
			inDBQueryNodeData);
	}));

	dbQueryNodePropertyPanel.appendChild(Agnity.createButtonRowField('showDBSchema', function(event) {
		inDBQueryNodeData.ui.actions.get('showDBSchema').funct(Agnity.getTreeData(inDBQueryNodeData.ui).forestName);
	}));

	dbQueryNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inDBQueryNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inDBQueryNodeData));
	}));

	return [dbQueryNodePropertyPanel, inDBQueryNodeData];
};

function recreateConditionNodePropertyPanel(panelDiv, inConditionNodeData) {
	this.conditionNodeData = inConditionNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		var functionVals = agnityGlobalData.mappingData.conditionFunctionMapping;
		var LHSValueSelector = new AgnityDynamicValueSelector(panelDiv, inConditionNodeData.ui);
		var RHSValueSelector = new AgnityDynamicValueSelector(panelDiv, inConditionNodeData.ui);

		var functionNameSelector = Agnity.createDropDownRowField(functionVals, self.conditionNodeData.functionName,
			'functionName', function(event) {
			self.conditionNodeData.functionName = this.value;
			self.conditionNodeData.LHS = 'Literal';
			self.conditionNodeData.RHS = 'Literal';
			self.conditionNodeData.LHSValue = '';
			self.conditionNodeData.RHSValue = '';
			self.setupPanel();
		});
		panelDiv.appendChild(functionNameSelector);

		if (self.conditionNodeData.functionName == 'RANGE_OF') {
			panelDiv.appendChild(Agnity.createInputTextRowField(self.conditionNodeData.LHSValue, 'rangeInput', function(event) {
				self.conditionNodeData.LHSValue = this.value;
			}));
		}
		else {
			LHSValueSelector.setupWidget(self.conditionNodeData.LHS, self.conditionNodeData.LHSValue, 'LHS',
				function(value) {
					self.conditionNodeData.LHS = value;
				},
				function(value) {
					self.conditionNodeData.LHSValue = value;
				});
		}

		if (self.conditionNodeData.functionName == 'EQUAL_TO' || self.conditionNodeData.functionName == 'CHECK_LENGTH') {
			panelDiv.appendChild(Agnity.createInputTextRowField(self.conditionNodeData.RHSValue, 'RHS', function(event) {
				self.conditionNodeData.RHSValue = this.value;
			}));
		}
		else if (self.conditionNodeData.functionName == 'COMPARE' || self.conditionNodeData.functionName == 'COMPARE_IGNORE_CASE' ||
			self.conditionNodeData.functionName == 'STARTS_WITH' || self.conditionNodeData.functionName == 'NOT_EQUAL_TO' ||
			self.conditionNodeData.functionName == 'GREATER_THAN' || self.conditionNodeData.functionName == 'GREATER_THAN_EQUAL_TO' ||
			self.conditionNodeData.functionName == 'LESS_THAN' || self.conditionNodeData.functionName == 'CONTAINS' || self.conditionNodeData.functionName == 'LESS_THAN_EQUAL_TO') {
			RHSValueSelector.setupWidget(self.conditionNodeData.RHS, self.conditionNodeData.RHSValue, 'RHS',
				function(value) {
					self.conditionNodeData.RHS = value;
				},
				function(value) {
					self.conditionNodeData.RHSValue = value;
				});
		}
		else if (self.conditionNodeData.functionName == 'RANGE_OF') {
			LHSValueSelector.setupWidget(self.conditionNodeData.RHS, self.conditionNodeData.RHSValue, 'startRange',
				function(value) {
					self.conditionNodeData.RHS = value;
				},
				function(value) {
					self.conditionNodeData.RHSValue = value;
				});

			var LHS1ValueSelector = new AgnityDynamicValueSelector(panelDiv, inConditionNodeData.ui);

			LHS1ValueSelector.setupWidget(self.conditionNodeData.RHS1, self.conditionNodeData.RHS1Value, 'endRange',
				function(value) {
					self.conditionNodeData.RHS1 = value;
				},
				function(value) {
					self.conditionNodeData.RHS1Value = value;
				});
		}
	}
};






function ccbConditionNodePropertyPanel(panelDiv, inCCBNodeData) {
	this.ccbNodeData = inCCBNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		var ccbfunctionVals = agnityGlobalData.mappingData.ccbFunctionMapping;

		var functionNameSelector = Agnity.createDropDownRowField(ccbfunctionVals, self.ccbNodeData.callBarringFunction,
			'callBarringFunction', function(event) {
				self.ccbNodeData.callBarringFunction = this.value;
				self.setupPanel();

			});

		panelDiv.appendChild(functionNameSelector);

		panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			self.ccbNodeData.number, 'number', function(event) {
				self.ccbNodeData.number = this.value;
			}));

		panelDiv.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.ccbNumberTypeMapping,
			self.ccbNodeData.numberType, 'numberType', function(event) {
				self.ccbNodeData.numberType = this.value;
			}));
		console.log("callBarring function", self.ccbNodeData.callBarringFunction);
		if (self.ccbNodeData.callBarringFunction == 'INCREASE_COUNT' || self.ccbNodeData.callBarringFunction == 'UPDATE_ASSOCIATION') {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.groupId, 'groupId', function(event) {
					self.ccbNodeData.groupId = this.value;
				}));

		}
		else if (self.ccbNodeData.callBarringFunction == 'GET_CALL_COUNT' || self.ccbNodeData.callBarringFunction == 'IS_CALL_ALLOWED') {

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.groupId, 'groupId', function(event) {
					self.ccbNodeData.groupId = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.groupLimit, 'groupLimit', function(event) {
					self.ccbNodeData.groupLimit = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.numberLimit, 'numberLimit', function(event) {
					self.ccbNodeData.numberLimit = this.value;
				}));

		}
		else if (self.ccbNodeData.callBarringFunction == 'CHECK_AND_RESERVE_COUNT') {

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.groupId, 'groupId', function(event) {
					self.ccbNodeData.groupId = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.groupLimit, 'groupLimit', function(event) {
					self.ccbNodeData.groupLimit = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.numberLimit, 'numberLimit', function(event) {
					self.ccbNodeData.numberLimit = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.callLimit, 'callLimit', function(event) {
					console.log("call Limit value:- ", this.value);
					self.ccbNodeData.callLimit = this.value;

				}));

			var emailSubject = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.emailSubject, 'emailSubject', function(event) {
					console.log("check email2:- ", this.value);
					self.ccbNodeData.emailSubject = this.value;
				});

			var emailContent = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.emailContent, 'emailContent', function(event) {
					self.ccbNodeData.emailContent = this.value;
				});
			
			var emailRecipients = 	Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.emailRecipients, 'emailRecipients', function(event) {
					self.ccbNodeData.emailRecipients = this.value;
				});
			var emailThreshold = 	Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCCBNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.ccbNodeData.emailThreshold, 'emailThreshold', function(event) {
					self.ccbNodeData.emailThreshold = this.value;
				});	

			var ccbPanelDisplay = new AgnityDynamicDisplay();

			panelDiv.appendChild(Agnity.createCheckboxRowField(
				self.ccbNodeData.checkEmail, 'checkEmail', function(event) {
				self.ccbNodeData.checkEmail = this.checked;
				if (this.checked) {
					ccbPanelDisplay.show(emailSubject);
					ccbPanelDisplay.show(emailContent);
					ccbPanelDisplay.show(emailRecipients);
					ccbPanelDisplay.show(emailThreshold);

				}
				else {
					ccbPanelDisplay.hide(emailSubject);
					ccbPanelDisplay.hide(emailContent);
					ccbPanelDisplay.hide(emailRecipients);
					ccbPanelDisplay.hide(emailThreshold);
				}
			}));

			panelDiv.appendChild(emailSubject);
			panelDiv.appendChild(emailContent);
			panelDiv.appendChild(emailRecipients);
			panelDiv.appendChild(emailThreshold);

			if (!self.ccbNodeData.checkEmail) {
				ccbPanelDisplay.hide(emailSubject);
				ccbPanelDisplay.hide(emailContent);
				ccbPanelDisplay.hide(emailRecipients);
				ccbPanelDisplay.hide(emailThreshold);
			}

		}
	}

};

function callQueuingConditionNodePropertyPanel(panelDiv, inCQNodeData) {
	this.cqNodeData = inCQNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		panelDiv.appendChild(Agnity.createDropDownRowField(
			agnityGlobalData.mappingData.callQueuingFunctionMapping,
			self.cqNodeData.cqOperation, 'cqOperation', function(event) {
				self.cqNodeData.cqOperation = this.value;
				self.setupPanel();
			}));

		if (self.cqNodeData.cqOperation == 'INIT') {

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.tfNumber, 'tfNumber', function(event) {
					self.cqNodeData.tfNumber = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.activeCallsLimit, 'activeCallsLimit', function(event) {
					self.cqNodeData.activeCallsLimit = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.enableQueuing, 'enableQueuing', function(event) {
					self.cqNodeData.enableQueuing = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.initialAnnEnabled, 'initialAnnEnabled', function(event) {
					self.cqNodeData.initialAnnEnabled = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.initialAnn, 'initialAnn', function(event) {
					self.cqNodeData.initialAnn = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.normalQueueSize, 'normalQueueSize', function(event) {
					self.cqNodeData.normalQueueSize = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.normalQueueTimeout, 'normalQueueTimeout', function(event) {
					self.cqNodeData.normalQueueTimeout = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.queueTimeoutAnnEnabled, 'queueTimeoutAnnEnabled', function(event) {
					self.cqNodeData.queueTimeoutAnnEnabled = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.queueTimeoutAnn, 'queueTimeoutAnn', function(event) {
					self.cqNodeData.queueTimeoutAnn = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.normalQueueAnn, 'normalQueueAnn', function(event) {
					self.cqNodeData.normalQueueAnn = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.queueOverflowAnnEnabled, 'queueOverflowAnnEnabled', function(event) {
					self.cqNodeData.queueOverflowAnnEnabled = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.cqNodeData.normalQueueOverflowAnn, 'normalQueueOverflowAnn', function(event) {
					self.cqNodeData.normalQueueOverflowAnn = this.value;
				}));

			/* Priority Queue Properties */
			var priorityQueueEnabled = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityQueueEnabled, 'priorityQueueEnabled', function(event) {
								self.cqNodeData.priorityQueueEnabled = this.value;
							});

			var priorityQueuePINAnn = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityQueuePINAnn, 'priorityQueuePINAnn', function(event) {
								self.cqNodeData.priorityQueuePINAnn = this.value;
							});

			var priorityQueuePIN = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityQueuePIN, 'priorityQueuePIN', function(event) {
								self.cqNodeData.priorityQueuePIN = this.value;
							});

			var priorityQueueSize = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityQueueSize, 'priorityQueueSize', function(event) {
								self.cqNodeData.priorityQueueSize = this.value;
							});

			var priorityQueueTimeout = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityQueueTimeout, 'priorityQueueTimeout', function(event) {
								self.cqNodeData.priorityQueueTimeout = this.value;
							});

			var priorityPINMaxRetries = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityPINMaxRetries, 'priorityPINMaxRetries', function(event) {
								self.cqNodeData.priorityPINMaxRetries = this.value;
							});

			var priorityQueueAnn = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityQueueAnn, 'priorityQueueAnn', function(event) {
								self.cqNodeData.priorityQueueAnn = this.value;
							});

			var priorityQueueOverflowAnn = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.priorityQueueOverflowAnn, 'priorityQueueOverflowAnn', function(event) {
								self.cqNodeData.priorityQueueOverflowAnn = this.value;
							});

			var incorrectPINAnn = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.incorrectPINAnn, 'incorrectPINAnn', function(event) {
								self.cqNodeData.incorrectPINAnn = this.value;
							});

			var moveToPriorityAnn = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.moveToPriorityAnn, 'moveToPriorityAnn', function(event) {
								self.cqNodeData.moveToPriorityAnn = this.value;
							});

			var maxRetriesFailedAnn = Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inCQNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
							self.cqNodeData.maxRetriesFailedAnn, 'maxRetriesFailedAnn', function(event) {
								self.cqNodeData.maxRetriesFailedAnn = this.value;
							});

			var priorityQProps = new AgnityDynamicDisplay();

			panelDiv.appendChild(Agnity.createCheckboxRowField(
				inCQNodeData.priorityQueue, 'priorityQueue', function(event) {
					inCQNodeData.priorityQueue = this.checked;
					if (this.checked) {
						priorityQProps.show(priorityQueueSize);
						priorityQProps.show(priorityQueueTimeout);
						priorityQProps.show(priorityPINMaxRetries);
						priorityQProps.show(priorityQueueAnn);
						priorityQProps.show(priorityQueuePIN);
						priorityQProps.show(priorityQueuePINAnn);
						priorityQProps.show(priorityQueueOverflowAnn);
						priorityQProps.show(incorrectPINAnn);
						priorityQProps.show(moveToPriorityAnn);
						priorityQProps.show(maxRetriesFailedAnn);
						priorityQProps.show(priorityQueueEnabled);
					} else {
						priorityQProps.hide(priorityQueueSize);
						priorityQProps.hide(priorityQueueTimeout);
						priorityQProps.hide(priorityPINMaxRetries);
						priorityQProps.hide(priorityQueueAnn);
						priorityQProps.hide(priorityQueuePIN);
						priorityQProps.hide(priorityQueuePINAnn);
						priorityQProps.hide(priorityQueueOverflowAnn);
						priorityQProps.hide(incorrectPINAnn);
						priorityQProps.hide(moveToPriorityAnn);
						priorityQProps.hide(maxRetriesFailedAnn);
						priorityQProps.hide(priorityQueueEnabled);
					}
				}));
				panelDiv.appendChild(priorityQueueSize);
				panelDiv.appendChild(priorityQueueTimeout);
				panelDiv.appendChild(priorityPINMaxRetries);
				panelDiv.appendChild(priorityQueueAnn);
				panelDiv.appendChild(priorityQueuePIN);
				panelDiv.appendChild(priorityQueuePINAnn);
				panelDiv.appendChild(priorityQueueOverflowAnn);
				panelDiv.appendChild(incorrectPINAnn);
				panelDiv.appendChild(moveToPriorityAnn);
				panelDiv.appendChild(maxRetriesFailedAnn);
				panelDiv.appendChild(priorityQueueEnabled);

				if(!inCQNodeData.priorityQueue) {
					priorityQProps.hide(priorityQueueSize);
					priorityQProps.hide(priorityQueueTimeout);
					priorityQProps.hide(priorityPINMaxRetries);
					priorityQProps.hide(priorityQueueAnn);
					priorityQProps.hide(priorityQueuePIN);
					priorityQProps.hide(priorityQueuePINAnn);
					priorityQProps.hide(priorityQueueOverflowAnn);
					priorityQProps.hide(incorrectPINAnn);
					priorityQProps.hide(moveToPriorityAnn);
					priorityQProps.hide(maxRetriesFailedAnn);
					priorityQProps.hide(priorityQueueEnabled);
				}
			}

	}

};



Agnity.getConditionNodePropertyPanel = function(inConditionNodeData) {
	var conditionNodePropertyPanel = document.createElement('div');
	conditionNodePropertyPanel.setAttribute('id', 'ConditionNodePropertyPanel');

	var conditionNodePanel = new recreateConditionNodePropertyPanel(conditionNodePropertyPanel, inConditionNodeData);
	conditionNodePanel.setupPanel();

	return [conditionNodePropertyPanel, inConditionNodeData];
};

function recreateExpressionNodePropertyPanel(panelDiv, inExpressionNodeData) {
	this.expressionNodeData = inExpressionNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		var functionVals = agnityGlobalData.mappingData.expressionFunctionMapping;
		var arg1TypeValueSelector = new AgnityDynamicValueSelector(panelDiv, inExpressionNodeData.ui);
		var arg2TypeValueSelector = new AgnityDynamicValueSelector(panelDiv, inExpressionNodeData.ui);

		if (self.expressionNodeData.functionName != 'IS_BIT_POSITION_SET') {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inExpressionNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.expressionNodeData.output, 'output', function(event) {
				self.expressionNodeData.output = this.value;
			}));
		}

		var functionNameSelector = Agnity.createDropDownRowField(functionVals, self.expressionNodeData.functionName, 'functionName', function(event) {
			self.expressionNodeData.functionName = this.value;
			self.expressionNodeData.arg2Type = 'Literal';
			self.expressionNodeData.arg3Type = 'Literal';
			self.expressionNodeData.arg1 = '';
			self.expressionNodeData.arg2 = '';
			self.expressionNodeData.arg3 = '';
			self.setupPanel();
		});

		panelDiv.appendChild(functionNameSelector);

		if (self.expressionNodeData.functionName == 'GET_VALUE_FROM_LIST' ||
			self.expressionNodeData.functionName == 'GET_NEXT_VALUE_FROM_LIST') {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inExpressionNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.expressionNodeData.arg1, 'arg1', function(event) {
					self.expressionNodeData.arg1Type = 'Variable';
					self.expressionNodeData.arg1 = this.value;
				}));

			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inExpressionNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.expressionNodeData.arg2, 'arg2', function(event) {
					self.expressionNodeData.arg2Type = 'Variable';
					self.expressionNodeData.arg2 = this.value;
				}));

			return;
		}

		if (self.expressionNodeData.functionName == 'CONCAT') {
			var setArgsButton = Agnity.createButtonRowField('setArgs', function(event) {
				inExpressionNodeData.ui.actions.get('setArgs').funct(inExpressionNodeData);
			});

			panelDiv.appendChild(setArgsButton);
		}
		else {
			inExpressionNodeData.args = new Array();
			arg1TypeValueSelector.setupWidget(self.expressionNodeData.arg1Type, self.expressionNodeData.arg1, 'arg1Type',
				function(value) {
					self.expressionNodeData.arg1Type = value;
				},
				function(value) {
					self.expressionNodeData.arg1 = value;
				});
		}

		if (self.expressionNodeData.functionName == 'APPEND' || self.expressionNodeData.functionName == 'ADD' || self.expressionNodeData.functionName == 'SUBTRACT' ||
			self.expressionNodeData.functionName == 'LOGICAL_AND' || self.expressionNodeData.functionName == 'LOGICAL_OR' || self.expressionNodeData.functionName == 'IS_BIT_POSITION_SET') {
			arg2TypeValueSelector.setupWidget(self.expressionNodeData.arg2Type, self.expressionNodeData.arg2, 'arg2Type',
				function(value) {
					self.expressionNodeData.arg2Type = value;
				},
				function(value) {
					self.expressionNodeData.arg2 = value;
				});
		}

		else if (self.expressionNodeData.functionName == 'SUBSTR' || self.expressionNodeData.functionName == 'LEFT_PAD' || self.expressionNodeData.functionName == 'RIGHT_PAD') {
			panelDiv.appendChild(Agnity.createInputTextRowField(self.expressionNodeData.arg2, 'arg2', function(event) {
				self.expressionNodeData.arg2 = this.value;
			}));
			panelDiv.appendChild(Agnity.createInputTextRowField(self.expressionNodeData.arg3, 'arg3', function(event) {
				self.expressionNodeData.arg3 = this.value;
			}));
		}
		else if (self.expressionNodeData.functionName == 'LEFT_SHIFT' || self.expressionNodeData.functionName == 'RIGHT_SHIFT') {
			panelDiv.appendChild(Agnity.createInputTextRowField(self.expressionNodeData.arg2, 'arg2', function(event) {
				self.expressionNodeData.arg2 = this.value;
			}));
		}
	}
}
Agnity.getExpressionNodePropertyPanel = function(inExpressionNodeData) {

	var expressionNodePropertyPanel = document.createElement('div');
	expressionNodePropertyPanel.setAttribute('id', 'ExpressionNodePropertyPanel');

	var expressionNodePanel = new recreateExpressionNodePropertyPanel(expressionNodePropertyPanel, inExpressionNodeData);
	expressionNodePanel.setupPanel();

	return [expressionNodePropertyPanel, inExpressionNodeData];
};


Agnity.getEchoNodePropertyPanel = function(inEchoNodeData) {

	var echoNodePropertyPanel = document.createElement('div');
	echoNodePropertyPanel.setAttribute('id', 'EchoNodePropertyPanel');

	/*var echoNodePanel = new recreateEchoNodePropertyPanel(echoNodePropertyPanel, inEchoNodeData);
	echoNodePanel.setupPanel();*/

	echoNodePropertyPanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inEchoNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inEchoNodeData.output, 'output', function(event) {
		inEchoNodeData.output = this.value;
	}));

	echoNodePropertyPanel.appendChild(Agnity.createInputTextRowField(inEchoNodeData.arg1, 'ApplicationId', function(event) {
		inEchoNodeData.arg1 = this.value;
	}));
	return [echoNodePropertyPanel, inEchoNodeData];
};




Agnity.getConnectNodePropertyPanel = function(inConnectNodeData) {
	var connectNodePropertyPanel = document.createElement('div');
	connectNodePropertyPanel.setAttribute('id', 'ConnectNodePropertyPanel');

	var treeSelectionHelper = new AgnityDynamicDropDownHelper();
	var nodeSelectionHelper = new AgnityDynamicDropDownHelper();

	if (Agnity.isProcessDiagram()) {
		inConnectNodeData.treeId = Agnity.getTreeData(inConnectNodeData.ui).treeName;
		connectNodePropertyPanel.appendChild(nodeSelectionHelper.setupWidget(new AgnityGetAvailableNodesHelper(Agnity.getTreeData(inConnectNodeData.ui).forestName, inConnectNodeData.treeId, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inConnectNodeData.nextNodeId, 'nextNodeId',
			function(event) {
				inConnectNodeData.nextNodeId = this.value;
			}, null));
	}
	else {
		connectNodePropertyPanel.appendChild(treeSelectionHelper.setupWidget(new AgnityGetAvailableTreesHelper(Agnity.getTreeData(inConnectNodeData.ui).forestName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inConnectNodeData.treeId, 'treeId', function(event) {
			inConnectNodeData.treeId = this.value;
			nodeSelectionHelper.dataProvider.treeName = this.value;
			nodeSelectionHelper.selectedValue = null;
			nodeSelectionHelper.rebuildOptions();
		}, null));

		connectNodePropertyPanel.appendChild(nodeSelectionHelper.setupWidget(new AgnityGetAvailableNodesHelper(Agnity.getTreeData(inConnectNodeData.ui).forestName, inConnectNodeData.treeId, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inConnectNodeData.nextNodeId, 'nextNodeId',
			function(event) {
				inConnectNodeData.nextNodeId = this.value;
			}, null));

		var openButton = Agnity.createButtonRowField('openTree', function(event) {
			Agnity.storeNodeData(inConnectNodeData);

			if (agnityGlobalData.tabId == null)
				window.open('TreeViewer.html?forestName=' + Agnity.getTreeData(inConnectNodeData.ui).forestName + '&treeName=' + inConnectNodeData.treeId);
			else
				agnityGlobalData.sendMessageToParent('connectTree', { 'forestName': Agnity.getTreeData(inConnectNodeData.ui).forestName, 'name': inConnectNodeData.treeId, 'diagramType': 'tree' });
		});

		Agnity.removeRowFieldDisabled(openButton);

		connectNodePropertyPanel.appendChild(openButton);

	}

	connectNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inConnectNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inConnectNodeData));
	}));

	return [connectNodePropertyPanel, inConnectNodeData];
};

Agnity.getPlayAndCollectNodePropertyPanel = function(inPlayAndCollectNodeData) {
	var playAndCollectNodePropertyPanel = document.createElement('div');
	playAndCollectNodePropertyPanel.setAttribute('id', 'PlayAndCollectNodePropertyPanel');

	playAndCollectNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayAndCollectNodeData.isDropIvrOnCompletion, 'dropIvrOnCompletion', function(event) {
		inPlayAndCollectNodeData.isDropIvrOnCompletion = this.checked;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayAndCollectNodeData.barge, 'barge', function(event) {
		inPlayAndCollectNodeData.barge = this.checked;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayAndCollectNodeData.flex, 'flex', function(event) {
		inPlayAndCollectNodeData.flex = this.checked;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playCollectSendModeMapping,
		inPlayAndCollectNodeData.sendMode, 'sendMode', function(event) {
		inPlayAndCollectNodeData.sendMode = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playCollectConnectionNodeMapping,
		inPlayAndCollectNodeData.connectionNode, 'connectionMode', function(event) {
		inPlayAndCollectNodeData.connectionNode = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inPlayAndCollectNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inPlayAndCollectNodeData.output, 'storeOutput', function(event) {
		inPlayAndCollectNodeData.output = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.maxRetries, 'maxRetries', function(event) {
		inPlayAndCollectNodeData.maxRetries = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.repeat, 'repeat', function(event) {
		inPlayAndCollectNodeData.repeat = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playCollectReturnKeyMapping,
		inPlayAndCollectNodeData.returnKey, 'returnKey', function(event) {
		inPlayAndCollectNodeData.returnKey = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playCollectEscapeKeyMapping,
		inPlayAndCollectNodeData.escapeKey, 'escapeKey', function(event) {
		inPlayAndCollectNodeData.escapeKey = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.firstDigitTimer, 'firstDigitTimer', function(event) {
		inPlayAndCollectNodeData.firstDigitTimer = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.interDigitTimer, 'interDigitTimer', function(event) {
		inPlayAndCollectNodeData.interDigitTimer = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.minDigit, 'minDigit', function(event) {
		inPlayAndCollectNodeData.minDigit = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.maxDigit, 'maxDigit', function(event) {
		inPlayAndCollectNodeData.maxDigit = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.ignoreDigits, 'ignoreDigits', function(event) {
		inPlayAndCollectNodeData.ignoreDigits = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayAndCollectNodeData.backspaceDigits, 'backspaceDigits', function(event) {
		inPlayAndCollectNodeData.backspaceDigits = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playCollectConnectPartyMapping,
		inPlayAndCollectNodeData.connectParty, 'connectParty', function(event) {
		inPlayAndCollectNodeData.connectParty = this.value;
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createButtonRowField('playItem', function(event) {
		inPlayAndCollectNodeData.ui.actions.get('playAndCollectNodeItem').funct(inPlayAndCollectNodeData);
	}));

	playAndCollectNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inPlayAndCollectNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inPlayAndCollectNodeData));
	}));

	return [playAndCollectNodePropertyPanel, inPlayAndCollectNodeData];
};

Agnity.getPlaySpeechNodePanel = function(inPlaySpeechNodeData) {

	var PlaySpeechNodePanel = document.createElement('div');
	PlaySpeechNodePanel.setAttribute('id', 'PlaySpeechNodePanel');
	var _panel = new recreatePlaySpeechNodePropertyPanel(PlaySpeechNodePanel, inPlaySpeechNodeData);
	_panel.setupPanel();
	return [PlaySpeechNodePanel, inPlaySpeechNodeData];

};


Agnity.getPlayNodePropertyPanel = function(inPlayNodeData) {
	var playNodePropertyPanel = document.createElement('div');
	playNodePropertyPanel.setAttribute('id', 'PlayNodePropertyPanel');

	playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayNodeData.isDropIvrOnCompletion, 'dropIvrOnCompletion', function(event) {
		inPlayNodeData.isDropIvrOnCompletion = this.checked;
	}));

	playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayNodeData.barge, 'barge', function(event) {
		inPlayNodeData.barge = this.checked;
	}));

	playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayNodeData.flex, 'flex', function(event) {
		inPlayNodeData.flex = this.checked;
	}));

	playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayNodeData.earlyMedia, 'earlyMedia', function(event) {
		inPlayNodeData.earlyMedia = this.checked;
	}));

	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playSendModeMapping,
		inPlayNodeData.sendMode, 'sendMode', function(event) {
		inPlayNodeData.sendMode = this.value;
	}));

	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playConnectionNodeMapping,
		inPlayNodeData.connectionNode, 'connectionMode', function(event) {
		inPlayNodeData.connectionNode = this.value;
	}));

	playNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inPlayNodeData.repeat, 'repeat', function(event) {
		inPlayNodeData.repeat = this.value;
	}));

	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playReturnKeyMapping,
		inPlayNodeData.returnKey, 'returnKey', function(event) {
		inPlayNodeData.returnKey = this.value;
	}));

	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playEscapeKeyMapping,
		inPlayNodeData.escapeKey, 'escapeKey', function(event) {
		inPlayNodeData.escapeKey = this.value;
	}));

	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playConnectPartyMapping,
		inPlayNodeData.connectParty, 'connectParty', function(event) {
		inPlayNodeData.connectParty = this.value;
	}));

	var broadCastDestination =(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inPlayNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inPlayNodeData.broadcastDestination, 'broadcastDestination', function(event) {
				inPlayNodeData.broadcastDestination = this.value;
			}));


	var playBroadCast = new AgnityDynamicDisplay();

			playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
				inPlayNodeData.broadcast, 'broadcast', function(event) {
				inPlayNodeData.broadcast = this.checked;
				if (this.checked) {
					playBroadCast.show(broadCastDestination);
				}
				else {
						playBroadCast.hide(broadCastDestination);
				}
			}));

	playNodePropertyPanel.appendChild(broadCastDestination);

	if (!inPlayNodeData.broadcast) {
		playBroadCast.hide(broadCastDestination);
	}


	playNodePropertyPanel.appendChild(Agnity.createButtonRowField('playItem', function(event) {
		inPlayNodeData.ui.actions.get('playItem').funct(inPlayNodeData);
	}));

	playNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inPlayNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inPlayNodeData));
	}));

	return [playNodePropertyPanel, inPlayNodeData];
};

Agnity.getSoapCallNodePropertyPanel = function(inSoapCallNodeData) {
	var soapCallNodePropertyPanel = document.createElement('div');
	soapCallNodePropertyPanel.setAttribute('id', 'SoapCallNodePropertyPanel');

	soapCallNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inSoapCallNodeData.portMethodName, 'portMethodName', function(event) {
		inSoapCallNodeData.portMethodName = this.value;
	}));

	soapCallNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inSoapCallNodeData.serviceClassName, 'serviceClassName', function(event) {
		inSoapCallNodeData.serviceClassName = this.value;
	}));
	soapCallNodePropertyPanel.appendChild(Agnity.createInputTextRowField(
		inSoapCallNodeData.operation, 'operation', function(event) {
		inSoapCallNodeData.operation = this.value;
	}));

	soapCallNodePropertyPanel.appendChild(Agnity.createButtonRowField('setInputList', function(event) {
		inSoapCallNodeData.ui.actions.get('setInputList').funct(inSoapCallNodeData);
	}));

	soapCallNodePropertyPanel.appendChild(Agnity.createButtonRowField('setOutputList', function(event) {
		inSoapCallNodeData.ui.actions.get('setOutputList').funct(inSoapCallNodeData);
	}));

	soapCallNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inSoapCallNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inSoapCallNodeData));
	}));

	return [soapCallNodePropertyPanel, inSoapCallNodeData];
};

Agnity.getSwitchNodePropertyPanel = function(inSwitchNodeData) {
	var switchNodePropertyPanel = document.createElement('div');
	switchNodePropertyPanel.setAttribute('id', 'SwitchNodePropertyPanel');

	switchNodePropertyPanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSwitchNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSwitchNodeData.variable, 'variable', function(event) {
		inSwitchNodeData.variable = this.value;
	}));

	switchNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inSwitchNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inSwitchNodeData));
	}));

	return [switchNodePropertyPanel, inSwitchNodeData];
};

Agnity.getRouteCallNodePropertyPanel = function(inRouteCallNodeData) {
	var routeCallNodePropertyPanel = document.createElement('div');
	routeCallNodePropertyPanel.setAttribute('id', 'RouteCallNodePropertyPanel');

	routeCallNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.routeCallSendModeMapping,
		inRouteCallNodeData.sendMode, 'sendMode', function(event) {
		inRouteCallNodeData.sendMode = this.value;
	}));

	routeCallNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.routeCallConnectionModeMapping,
		inRouteCallNodeData.connectionMode, 'connectionMode', function(event) {
		inRouteCallNodeData.connectionMode = this.value;
	}));

	routeCallNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.routeCallDropCallModeMapping,
		inRouteCallNodeData.dropCallMode, 'dropCallMode', function(event) {
		inRouteCallNodeData.dropCallMode = this.value;
	}));

	
	routeCallNodePropertyPanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inRouteCallNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inRouteCallNodeData.outboundAddress,
		'outboundAddress', function(event) {
			inRouteCallNodeData.outboundAddress = this.value;
		}));

	routeCallNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.routeCallDirectionOfConnectionMapping,
		inRouteCallNodeData.directionOfConnection, 'directionOfConnection', function(event) {
		inRouteCallNodeData.directionOfConnection = this.value;
	}));


    routeCallNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inRouteCallNodeData.parallelRinging, 'parallelRinging', function() {
		console.log("parallelRinging value :_ " + this.checked);
		inRouteCallNodeData.parallelRinging = this.checked;
	}));

	routeCallNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inRouteCallNodeData.serialRinging, 'serialRinging', function() {
		console.log("serialRinging value :_ " + this.checked);
		inRouteCallNodeData.serialRinging = this.checked;
	}));

	var protocolPanelDisplay = new AgnityDynamicDisplay();
	var protocol = Agnity.createDropDownRowField(agnityGlobalData.mappingData.protocolMapping,
		inRouteCallNodeData.protocol, 'protocol', function(event) {
		inRouteCallNodeData.protocol = this.value;
	});

    var outbountgatewayPoolIdValue = Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inRouteCallNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inRouteCallNodeData.outbountGateWayPoolId,
		'outbountGateWayPoolId', function(event) {
			inRouteCallNodeData.outbountGateWayPoolId = this.value;
		});
	routeCallNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inRouteCallNodeData.outboundgatewayIdCheck, 'outboundgatewayIdCheck', function() {
		console.log("outboundgatewayIdCheck value :_ " + this.checked);
		inRouteCallNodeData.outboundgatewayIdCheck = this.checked;
		if (this.checked) {
			console.log("outboundgatewayIdCheck true:-");
			protocolPanelDisplay.show(outbountgatewayPoolIdValue);
		} else {
			console.log("outboundgatewayIdCheck false:-");
			protocolPanelDisplay.hide(outbountgatewayPoolIdValue);
		}
	}));
		
		
	routeCallNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inRouteCallNodeData.dialoutMode, 'dialoutMode', function() {
		inRouteCallNodeData.dialoutMode = this.checked;
		if (this.checked) {
			console.log("dialoutmode true:-");
			protocolPanelDisplay.show(protocol);
		} else {
			console.log("dialoutmode false:-");
			protocolPanelDisplay.hide(protocol);
		}
	}));
	

	routeCallNodePropertyPanel.appendChild(outbountgatewayPoolIdValue);
	routeCallNodePropertyPanel.appendChild(protocol);
	if(!inRouteCallNodeData.outboundgatewayIdCheck) {
	console.log("hiding outbountgatewayPoolIdValue ");
	    protocolPanelDisplay.hide(outbountgatewayPoolIdValue);
	}

	if (!inRouteCallNodeData.dialoutMode) {
	console.log("hiding protocol");
		protocolPanelDisplay.hide(protocol);
	}
	
	
	routeCallNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inRouteCallNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inRouteCallNodeData));
	}));

	return [routeCallNodePropertyPanel, inRouteCallNodeData];
};

Agnity.getTerminateNodePropertyPanel = function(inTerminateNodeData) {
	var terminateNodePropertyPanel = document.createElement('div');
	terminateNodePropertyPanel.setAttribute('id', 'TerminateNodePropertyPanel');

	terminateNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.terminateDropCallModeMapping,
		inTerminateNodeData.dropCallMode, 'dropCallMode', function(event) {
		inTerminateNodeData.dropCallMode = this.value;
	}));

	terminateNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inTerminateNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inTerminateNodeData));
	}));

	return [terminateNodePropertyPanel, inTerminateNodeData];
};

Agnity.reRenderPanel = function() {
	// it will re render the right side panel, it will reset current state also
	// to get current state, check agnityGlobalData.prevSelectedCellData data
	Agnity.setupTreePropertyPanel(Agnity["refreshParams"][0],Agnity["refreshParams"][1]);
}

Agnity.getinitiateSs7CallNodePanel = function(inPlayNodeData) {
	var playNodePropertyPanel = document.createElement('div');

	playNodePropertyPanel.setAttribute('id', 'PlayNodePropertyPanel');


	let messageNameOptions;
	let render = Agnity.reRenderPanel;

	messageNameOptions = agnityGlobalData.mappingData.ss7MapMsgNameMapping;

	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.ss7CallInitiateProtocolMapping,
		inPlayNodeData.protocol, 'protocol', function(event) {
		inPlayNodeData.protocol = this.value;

		if(messageNameOptions == agnityGlobalData.mappingData.ss7MapMsgNameMapping && this.value != 'MAP') {
			messageNameOptions == agnityGlobalData.mappingData.ss7NotMapMsgNameMapping;
			inPlayNodeData.messageName = agnityGlobalData.mappingData.ss7NotMapMsgNameMapping[0][1];
			render();
		}
		if(this.value == 'MAP' && messageNameOptions == agnityGlobalData.mappingData.ss7NotMapMsgNameMapping) {
			messageNameOptions == agnityGlobalData.mappingData.ss7MapMsgNameMapping;
			inPlayNodeData.messageName = agnityGlobalData.mappingData.ss7MapMsgNameMapping[0][1];
			render();
		}
	}));

	if(inPlayNodeData.protocol !== 'MAP') {
		messageNameOptions = agnityGlobalData.mappingData.ss7NotMapMsgNameMapping;
	}


	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(messageNameOptions,
		inPlayNodeData.messageName, 'message_name', function(event) {
			inPlayNodeData.messageName = this.value;
	}));



	if(typeof inPlayNodeData.sccpCalledPartyInfo === 'undefined') {
		inPlayNodeData.sccpCalledPartyInfo = true;
	}

	playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayNodeData.sccpCalledPartyInfo, 'sccpCalledPartyInfo', function(event) {
		inPlayNodeData.sccpCalledPartyInfo = this.checked;
		render();
	}));


	let fields = [ "routingIndicator","pointCodeIndicator","pointCode","subsystemNoIndicator","subsystemNumber","globalTitleIndicator","nationalUse","translationType","encodingScheme","natureOfAddressIndicator","numberingPlan","gtDigits",]

	if(inPlayNodeData.sccpCalledPartyInfo === true) {
		playNodePropertyPanel.append(Agnity.displayTextInfo("SCCP Called Party Info"))

		for(let i of fields) {
			playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData[i+"Mapping"],
				inPlayNodeData[i+"Called"], i, function(event) {
					inPlayNodeData[i+"Called"] = this.value;
			}));
		}
	}

	if(typeof inPlayNodeData.sccpCallingPartyInfo === 'undefined') {
		inPlayNodeData.sccpCallingPartyInfo = true;
	}

	playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
		inPlayNodeData.sccpCallingPartyInfo, 'sccpCallingPartyInfo', function(event) {
		inPlayNodeData.sccpCallingPartyInfo = this.checked;
		render();
	}));

	if(inPlayNodeData.sccpCallingPartyInfo === true) {
		playNodePropertyPanel.append(Agnity.displayTextInfo("SCCP Calling Party Info"))

		for(let i of fields) {
			playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData[i+"Mapping"],
				inPlayNodeData[i+"Calling"], i, function(event) {
					inPlayNodeData[i+"Calling"] = this.value;
			}));
		}
	}


	// buttons
	playNodePropertyPanel.appendChild(Agnity.createButtonRowField('messageParameter', function(event) {
		inPlayNodeData.ui.actions.get('messageParameter').funct(inPlayNodeData);
	}));

	playNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inPlayNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inPlayNodeData));
	}));

	return [playNodePropertyPanel, inPlayNodeData];
};

Agnity.reRenderPanel = function() {
	// it will re render the right side panel, it will reset current state also
	// to get current state, check agnityGlobalData.prevSelectedCellData data
	Agnity.setupTreePropertyPanel(Agnity["refreshParams"][0],Agnity["refreshParams"][1]);
}

Agnity.getinitiateSs7CallNodePanel = function(inPlayNodeData) {
	var playNodePropertyPanel = document.createElement('div');

	playNodePropertyPanel.setAttribute('id', 'PlayNodePropertyPanel');


	let messageNameOptions;
	let render = Agnity.reRenderPanel;

	let staticVariables=[];

	let oldState = {
		...inPlayNodeData,
	}
	if(inPlayNodeData["loaded"]) {
		staticVariables = inPlayNodeData["loadedSV"];
	} else  {
		new AgnityGetVariablesHelper(
				Agnity.getTreeData(inPlayNodeData.ui).forestName,
				Agnity.getUrlParam('diagram'),
				Agnity.hasUrlReadonlyParam(),
				Agnity.getUrlParam('operationMode'),
				Agnity.getDomainName()
		).fetchData((out) => {
			staticVariables = out;

			if(inPlayNodeData["loaded"] != true) {
				inPlayNodeData = oldState;
				inPlayNodeData["loaded"] = true;
				inPlayNodeData["loadedSV"] = staticVariables;
				render();
			}
		})
	}


	messageNameOptions = agnityGlobalData.mappingData.ss7MapMsgNameMapping;

	var reactElement = document.createElement('div');

	reactElement.setAttribute('id', 'like_button_container');
	playNodePropertyPanel.appendChild(reactElement);






	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.ss7CallInitiateProtocolMapping,
		inPlayNodeData.protocol, 'protocol', function(event) {
		inPlayNodeData.protocol = this.value;

		if(messageNameOptions == agnityGlobalData.mappingData.ss7MapMsgNameMapping && this.value != 'MAP') {
			messageNameOptions == agnityGlobalData.mappingData.ss7NotMapMsgNameMapping;
			inPlayNodeData.messageName = agnityGlobalData.mappingData.ss7NotMapMsgNameMapping[0][1];
			render();
		}
		if(this.value == 'MAP' && messageNameOptions == agnityGlobalData.mappingData.ss7NotMapMsgNameMapping) {
			messageNameOptions == agnityGlobalData.mappingData.ss7MapMsgNameMapping;
			inPlayNodeData.messageName = agnityGlobalData.mappingData.ss7MapMsgNameMapping[0][1];
			render();
		}
	}));

	if(inPlayNodeData.protocol !== 'MAP') {
		messageNameOptions = agnityGlobalData.mappingData.ss7NotMapMsgNameMapping;
	}


	playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(messageNameOptions,
		inPlayNodeData.messageName, 'message_name', function(event) {
			inPlayNodeData.messageName = this.value;
	}));



	if(typeof inPlayNodeData.sccpCalledPartyInfo === 'undefined') {
		inPlayNodeData.sccpCalledPartyInfo = true;
	}


	let staticVariablesFiields = {
		"pointCode" : true,
		"subsystemNumber" : true,
		"translationType" : true,
		"gtDigits" : true,
		"userInformation" : true,
		"appContextName" : true,
	};
	let fields = [ "routingIndicator","pointCodeIndicator","pointCode","subsystemNoIndicator","subsystemNumber","globalTitleIndicator","nationalUse","translationType","encodingScheme","natureOfAddressIndicator","numberingPlan","gtDigits",]

	playNodePropertyPanel.append(Agnity.displayTextInfo("SCCP Called Party Info"))

	for(let i of fields) {
		let options = agnityGlobalData.mappingData[i+"Mapping"];
		if(i in staticVariablesFiields) {
			options = staticVariables;
		}
		playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(options,
			inPlayNodeData[i+"Called"], i, function(event) {
				inPlayNodeData[i+"Called"] = this.value;
		}));
	}
	// if(inPlayNodeData.sccpCalledPartyInfo === true) {
	// }

	if(typeof inPlayNodeData.sccpCallingPartyInfo === 'undefined') {
		inPlayNodeData.sccpCallingPartyInfo = true;
	}

	// playNodePropertyPanel.appendChild(Agnity.createCheckboxRowField(
	// 	inPlayNodeData.sccpCallingPartyInfo, 'sccpCallingPartyInfo', function(event) {
	// 	inPlayNodeData.sccpCallingPartyInfo = this.checked;
	// 	render();
	// }));

	playNodePropertyPanel.append(Agnity.displayTextInfo("SCCP Calling Party Info"))

	for(let i of fields) {
		let options = agnityGlobalData.mappingData[i+"Mapping"];
		if(i in staticVariablesFiields) {
			options = staticVariables;
		}
		playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(options,
			inPlayNodeData[i+"Calling"], i, function(event) {
				inPlayNodeData[i+"Calling"] = this.value;
		}));
	}

	playNodePropertyPanel.append(Agnity.displayTextInfo("Dialogue Portion"))

	let dPortion = [
		"protocolVersion",
		"appContextIdentifier",
		"appContextName",
		"userInformationIdentifier",
		"userInformation",
	]

	for(let i of dPortion) {
		let options = agnityGlobalData.mappingData[i+"Mapping"];
		if(i in staticVariablesFiields) {
			options = staticVariables;
		}
		playNodePropertyPanel.appendChild(Agnity.createDropDownRowField(options,
			inPlayNodeData[i], i, function(event) {
				inPlayNodeData[i] = this.value;
		}));
	}

	// if(inPlayNodeData.sccpCallingPartyInfo === true) {
	// }


	// buttons
	playNodePropertyPanel.appendChild(Agnity.createButtonRowField('messageParameter', function(event) {
		inPlayNodeData.ui.actions.get('messageParameter').funct(inPlayNodeData);
	}));

	playNodePropertyPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inPlayNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inPlayNodeData));
	}));

	if(!inPlayNodeData["loaded"]) {
		inPlayNodeData = oldState;
	}

	return [playNodePropertyPanel, inPlayNodeData];
};

function recreateTimePatternPanel(panelDiv, inTimePatternNodeData) {
	this.timePatternNodeData = inTimePatternNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		if (Agnity.getUrlParam('operationMode') == 'rfe') {
			panelDiv.appendChild(Agnity.createInputTextRowField(
				self.timePatternNodeData.patternId, 'patternId', function(event) {
				self.timePatternNodeData.patternId = this.value;
			}));

			panelDiv.appendChild(Agnity.createButtonRowField('selectPattern', function(event) {
				self.timePatternNodeData.ui.actions.get('selectPattern_dlg').funct(self.timePatternNodeData, 'timePattern', 'timePattern', function(patternId) {
					self.timePatternNodeData.patternId = patternId;
					self.setupPanel();
				});
			}));

		}
		else {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(
				new AgnityGetSMSVariableHelper(Agnity.getTreeData(self.timePatternNodeData.ui).forestName, 'timepattern', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.timePatternNodeData.smsValue, 'smsValue', function() {
					self.timePatternNodeData.smsValue = this.value;
				}));
		}
	}
}

Agnity.getTimePatternPropertyPanel = function(inTimePatternNodeData) {
	var timePatternPanel = document.createElement('div');
	timePatternPanel.setAttribute('id', 'TimeBasedRoutingPanel');

	var timePatternNodePanel = new recreateTimePatternPanel(timePatternPanel, inTimePatternNodeData);
	timePatternNodePanel.setupPanel();

	return [timePatternPanel, inTimePatternNodeData];
};

function recreateOriginPatternPanel(panelDiv, inOriginPatternNodeData) {
	this.originPatternNodeData = inOriginPatternNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		if (Agnity.getUrlParam('operationMode') == 'rfe') {
			panelDiv.appendChild(Agnity.createInputTextRowField(
				self.originPatternNodeData.patternId, 'patternId', function(event) {
				self.originPatternNodeData.patternId = this.value;
			}));

			panelDiv.appendChild(Agnity.createButtonRowField('selectPattern', function(event) {
				self.originPatternNodeData.ui.actions.get('selectPattern_dlg').funct(self.originPatternNodeData, 'originPattern', 'originPattern', function(patternId) {
					self.originPatternNodeData.patternId = patternId;
					self.setupPanel();
				});
			}));

		}
		else {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(
				new AgnityGetSMSVariableHelper(Agnity.getTreeData(self.originPatternNodeData.ui).forestName, 'originpattern', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.originPatternNodeData.smsValue, 'smsValue', function() {
					self.originPatternNodeData.smsValue = this.value;
				}));
		}
	}
}

Agnity.getOriginPatternPropertyPanel = function(inOriginPatternNodeData) {
	var originPropertyPanel = document.createElement('div');
	originPropertyPanel.setAttribute('id', 'OriginBasedRoutingPanel');

	var originPatternPanel = new recreateOriginPatternPanel(originPropertyPanel, inOriginPatternNodeData);
	originPatternPanel.setupPanel();

	return [originPropertyPanel, inOriginPatternNodeData];
};

Agnity.getConferenceNodePropertyPanel = function(inConferenceNodeData) {
	var conferenceNodePanel = document.createElement('div');
	conferenceNodePanel.setAttribute('id', 'ConferenceNodePanel');

	conferenceNodePanel.appendChild(Agnity.createInputTextRowField(
		inConferenceNodeData.maxActiveSpeaker, 'maxActiveSpeaker', function(event) {
		inConferenceNodeData.maxActiveSpeaker = this.value;
	}));

	conferenceNodePanel.appendChild(Agnity.createCheckboxRowField(
		inConferenceNodeData.notifyActiveSpeaker, 'notifyActiveSpeaker', function() {
		inConferenceNodeData.notifyActiveSpeaker = this.checked;
	}));

	conferenceNodePanel.appendChild(Agnity.createInputTextRowField(
		inConferenceNodeData.notificationInterval, 'notificationInterval', function(event) {
		inConferenceNodeData.notificationInterval = this.value;
	}));

	conferenceNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.conferenceDestroyCriteriaMapping,
		inConferenceNodeData.destroyCriteria, 'destroyCriteria', function() {
		inConferenceNodeData.destroyCriteria = this.value;
	}));

	conferenceNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inConferenceNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inConferenceNodeData.conferenceID,
		'conferenceID', function(event) {
			inConferenceNodeData.conferenceID = this.value;
		}));
	conferenceNodePanel.appendChild(Agnity.createInputTextRowField(
		inConferenceNodeData.timer, 'timer', function(event) {
		inConferenceNodeData.timer = this.value;
	}));	
		
	conferenceNodePanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inConferenceNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inConferenceNodeData));
	}));

	return [conferenceNodePanel, inConferenceNodeData];
}

Agnity.getJoinConferenceNodePropertyPanel = function(inJoinConferenceNodeData) {
	var joinConferenceNodePanel = document.createElement('div');
	joinConferenceNodePanel.setAttribute('id', 'JoinConferenceNodePanel');

    joinConferenceNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inJoinConferenceNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inJoinConferenceNodeData.conferenceID,
		'conferenceID', function(event) {
			inJoinConferenceNodeData.conferenceID = this.value;
		}));
	return [joinConferenceNodePanel, inJoinConferenceNodeData];
}

Agnity.getUnJoinConferencePropertyPanel = function(inUnJoinConferenceNodeData) {
	var unJoinConfNodePanel = document.createElement('div');
	unJoinConfNodePanel.setAttribute('id', 'UnJoinConferenceNodePanel');
 	
	unJoinConfNodePanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inUnJoinConferenceNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inUnJoinConferenceNodeData));
	}));

	return [unJoinConfNodePanel, inUnJoinConferenceNodeData];
}

Agnity.getDestroyConferencePropertyPanel = function(inDestroyConfNodeData) {
	var destroyConfNodePanel = document.createElement('div');
	destroyConfNodePanel.setAttribute('id', 'DestroyConferenceNodePanel');
 	
 	destroyConfNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inDestroyConfNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inDestroyConfNodeData.conferenceID,
		'conferenceID', function(event) {
			inDestroyConfNodeData.conferenceID = this.value;
		}));
	destroyConfNodePanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inDestroyConfNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inDestroyConfNodeData));
	}));

	return [destroyConfNodePanel, inDestroyConfNodeData];
}

Agnity.getRecordNodePanel = function(inRecordNodeData) {
	var recordNodePanel = document.createElement('div');
	recordNodePanel.setAttribute('id', 'RecordNodePanel');

	var recordPanelDisplay = new AgnityDynamicDisplay();

	var recordPathSelector = new AgnityDynamicValueSelector(recordNodePanel, inRecordNodeData.ui);
	var recordFileSelector = new AgnityDynamicValueSelector(recordNodePanel, inRecordNodeData.ui);

	var barge = Agnity.createCheckboxRowField(inRecordNodeData.barge, 'barge', function() {
		inRecordNodeData.barge = this.checked;
	});

	var returnKey = Agnity.createDropDownRowField(
		agnityGlobalData.mappingData.recordReturnKeyMapping, inRecordNodeData.returnKey, 'returnKey', function() {
		inRecordNodeData.returnKey = this.value;
	});

	var escapeKey = Agnity.createDropDownRowField(
		agnityGlobalData.mappingData.recordEscapeKeyMapping, inRecordNodeData.escapeKey, 'escapeKey', function() {
		inRecordNodeData.escapeKey = this.value;
	});

	var recordFormat = Agnity.createDropDownRowField(
		agnityGlobalData.mappingData.recordingFormatMapping, inRecordNodeData.recordingFormat, 'recordingFormat', function() {
		inRecordNodeData.recordingFormat = this.value;
	});

	var recordingDuration = Agnity.createInputTextRowField(
		inRecordNodeData.recordingDuration, 'recordingDuration', function(event) {
		inRecordNodeData.recordingDuration = this.value;
	});

	var recordTerminationKey = Agnity.createDropDownRowField(
		agnityGlobalData.mappingData.recordTerminateKeyMapping, inRecordNodeData.recordingTerminationKey, 'recordingTerminationKey', function() {
		inRecordNodeData.recordingTerminationKey = this.value;
	});

	var playItems = Agnity.createButtonRowField('playItem', function(event) {
		inRecordNodeData.ui.actions.get('playItem').funct(inRecordNodeData);
	});

	recordNodePanel.appendChild(Agnity.createCheckboxRowField(
		inRecordNodeData.playAnnBeforeRecording, 'playAnnBeforeRecording', function() {
		inRecordNodeData.playAnnBeforeRecording = this.checked;
		if (this.checked) {
			recordPanelDisplay.show(barge);
			recordPanelDisplay.show(returnKey);
			recordPanelDisplay.show(escapeKey);
			recordPanelDisplay.show(recordFormat);
			recordPanelDisplay.show(recordingDuration);
			recordPanelDisplay.show(recordTerminationKey);
			recordPanelDisplay.show(playItems);
			recordPathSelector.show();
			recordFileSelector.show();
		}
		else {
			recordPanelDisplay.hide(barge);
			recordPanelDisplay.hide(returnKey);
			recordPanelDisplay.hide(escapeKey);
			recordPanelDisplay.hide(recordFormat);
			recordPanelDisplay.hide(recordingDuration);
			recordPanelDisplay.hide(recordTerminationKey);
			recordPanelDisplay.hide(playItems);
			recordPathSelector.hide();
			recordFileSelector.hide();
		}
	}));

	recordNodePanel.appendChild(barge);
	recordNodePanel.appendChild(returnKey);
	recordNodePanel.appendChild(escapeKey);

	recordPathSelector.setupWidget(inRecordNodeData.recordingPathType, inRecordNodeData.recordingPath, 'recordingPath',
		function(value) {
			inRecordNodeData.recordingPathType = value;
		},
		function(value) {
			inRecordNodeData.recordingPath = value;
		});


	recordFileSelector.setupWidget(inRecordNodeData.recordingFileType, inRecordNodeData.recordingFilename, 'recordingFilename',
		function(value) {
			inRecordNodeData.recordingFileType = value;
		},
		function(value) {
			inRecordNodeData.recordingFilename = value;
		});

	recordNodePanel.appendChild(recordFormat);
	recordNodePanel.appendChild(recordingDuration);
	recordNodePanel.appendChild(recordTerminationKey);
	recordNodePanel.appendChild(playItems);

	recordNodePanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inRecordNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inRecordNodeData));
	}));

	if (!inRecordNodeData.playAnnBeforeRecording) {
		recordPanelDisplay.hide(barge);
		recordPanelDisplay.hide(returnKey);
		recordPanelDisplay.hide(escapeKey);
		recordPanelDisplay.hide(recordFormat);
		recordPanelDisplay.hide(recordingDuration);
		recordPanelDisplay.hide(recordTerminationKey);
		recordPanelDisplay.hide(playItems);
		recordPathSelector.hide();
		recordFileSelector.hide();
	}

	return [recordNodePanel, inRecordNodeData];
}

Agnity.getStopMediaPanel = function(inStopMediaNodeData) {
	var stopMediaPanel = document.createElement('div');
	stopMediaPanel.setAttribute('id', 'StopMediaNodePanel');

	stopMediaPanel.appendChild(Agnity.createDropDownRowField(
		agnityGlobalData.mappingData.stopMediaDisconnectPartyMapping, inStopMediaNodeData.disconnectParty, 'disconnectParty', function() {
		inStopMediaNodeData.disconnectParty = this.value;
	}));

	stopMediaPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inStopMediaNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inStopMediaNodeData));
	}));

	return [stopMediaPanel, inStopMediaNodeData];
}

Agnity.getEventHandlerPanel = function(inEventHandlerNodeData) {
	var eventHandlerPanel = document.createElement('div');
	eventHandlerPanel.setAttribute('id', 'EventHandlerPanel');

	eventHandlerPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.eventHandlerTypeMapping,
		inEventHandlerNodeData.handlerType, 'handlerType', function(event) {
		inEventHandlerNodeData.handlerType = this.value;
	}));

	eventHandlerPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inEventHandlerNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inEventHandlerNodeData));
	}));

	return [eventHandlerPanel, inEventHandlerNodeData];
}

Agnity.getCreateTimerPanel = function(inCreateTimerNodeData) {
	var createTimerPanel = document.createElement('div');
	createTimerPanel.setAttribute('id', 'CreateTimerPanel');

	createTimerPanel.appendChild(Agnity.createInputTextRowField(
		inCreateTimerNodeData.timerName, 'timerName', function(event) {
		inCreateTimerNodeData.timerName = this.value;
	}));

	createTimerPanel.appendChild(Agnity.createInputTextRowField(
		inCreateTimerNodeData.duration, 'duration', function(event) {
		inCreateTimerNodeData.duration = this.value;
	}));

	createTimerPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.timerTimeUnitMapping,
		inCreateTimerNodeData.timeunit, 'timeunit', function(event) {
		inCreateTimerNodeData.timeunit = this.value;
	}));

	createTimerPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inCreateTimerNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inEventHandlerNodeData));
	}));

	return [createTimerPanel, inCreateTimerNodeData];
}

Agnity.getCreateAccountCodePanel = function(inAccountCodeNodeData) {
	var accountCodePanel = document.createElement('div');
	accountCodePanel.setAttribute('id', 'AccountCodePanel');

	var playAnnSelector = new AgnityDynamicValueSelector(accountCodePanel, inAccountCodeNodeData.ui);

	playAnnSelector.setupWidget(inAccountCodeNodeData.playAnnType, inAccountCodeNodeData.playAnn, 'playAnn',
		function(value) {
			inAccountCodeNodeData.playAnnType = value;
		},
		function(value) {
			inAccountCodeNodeData.playAnn = value;
		});

	var invalidInputAnnSelector = new AgnityDynamicValueSelector(accountCodePanel, inAccountCodeNodeData.ui);

	invalidInputAnnSelector.setupWidget(inAccountCodeNodeData.invalidInputAnnType, inAccountCodeNodeData.invalidInputAnn, 'invalidInputAnn',
		function(value) {
			inAccountCodeNodeData.invalidInputAnnType = value;
		},
		function(value) {
			inAccountCodeNodeData.invalidInputAnn = value;
		});

	var noInputAnnSelector = new AgnityDynamicValueSelector(accountCodePanel, inAccountCodeNodeData.ui);

	noInputAnnSelector.setupWidget(inAccountCodeNodeData.noInputAnnType, inAccountCodeNodeData.noInputAnn, 'noInputAnn',
		function(value) {
			inAccountCodeNodeData.noInputAnnType = value;
		},
		function(value) {
			inAccountCodeNodeData.noInputAnn = value;
		});

	accountCodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetSMSVariableHelper(Agnity.getTreeData(inAccountCodeNodeData.ui).forestName, null, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inAccountCodeNodeData.digitPattern, 'digitPattern', function() {
			inAccountCodeNodeData.digitPattern = this.value;
		}));

	accountCodePanel.appendChild(Agnity.createInputTextRowField(
		inAccountCodeNodeData.validPatternList, 'validPatternList', function(event) {
		inAccountCodeNodeData.validPatternList = this.value;
	}));

	accountCodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.accountCodeValidationTypeMapping,
		inAccountCodeNodeData.validationType, 'validationType', function(event) {
		inAccountCodeNodeData.validationType = this.value;
	}));

	accountCodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.accountCodePossibleValueMapping,
		inAccountCodeNodeData.checkFixLength, 'checkFixLength', function(event) {
		inAccountCodeNodeData.checkFixLength = this.value;
	}));

	accountCodePanel.appendChild(Agnity.createInputTextRowField(
		inAccountCodeNodeData.length, 'accountCodeLength', function(event) {
		inAccountCodeNodeData.length = this.value;
	}));

	accountCodePanel.appendChild(Agnity.createInputTextRowField(
		inAccountCodeNodeData.retryAttempts, 'retryAttempts', function(event) {
		inAccountCodeNodeData.retryAttempts = this.value;
	}));

	return [accountCodePanel, inAccountCodeNodeData];
}

function recreateBlockPatternPanel(panelDiv, inBlockPatternNodeData) {
	this.blockPatternNodeData = inBlockPatternNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		if (Agnity.getUrlParam('operationMode') == 'rfe') {
			panelDiv.appendChild(Agnity.createInputTextRowField(
				self.blockPatternNodeData.patternId, 'patternId', function(event) {
				self.blockPatternNodeData.patternId = this.value;
			}));

			panelDiv.appendChild(Agnity.createButtonRowField('selectPattern', function(event) {
				self.blockPatternNodeData.ui.actions.get('selectPattern_dlg').funct(self.blockPatternNodeData, 'blockPattern', 'blockPattern', function(patternId) {
					self.blockPatternNodeData.patternId = patternId;
					self.setupPanel();
				});
			}));

		}
		else {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(
				new AgnityGetSMSVariableHelper(Agnity.getTreeData(self.blockPatternNodeData.ui).forestName, 'blocknumpattern', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.blockPatternNodeData.smsValue, 'smsValue', function() {
					self.blockPatternNodeData.smsValue = this.value;
				}));
		}
	}
}

Agnity.getCreateBlockPatternPanel = function(inBlockPatternNodeData) {
	var blockPatternPanel = document.createElement('div');
	blockPatternPanel.setAttribute('id', 'BlockPatternPanel');

	var blockPatternNodePanel = new recreateBlockPatternPanel(blockPatternPanel, inBlockPatternNodeData);
	blockPatternNodePanel.setupPanel();

	return [blockPatternPanel, inBlockPatternNodeData];
}

function recreateCallAreaScreeningPanel(panelDiv, inCallAreaScreeningNodeData) {
	this.callAreaScreeningNodeData = inCallAreaScreeningNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		if (Agnity.getUrlParam('operationMode') == 'rfe') {
			panelDiv.appendChild(Agnity.createInputTextRowField(
				self.callAreaScreeningNodeData.patternId, 'patternId', function(event) {
				self.callAreaScreeningNodeData.patternId = this.value;
			}));

			panelDiv.appendChild(Agnity.createButtonRowField('selectPattern', function(event) {
				self.callAreaScreeningNodeData.ui.actions.get('selectPattern_dlg').funct(self.callAreaScreeningNodeData, 'callAreaScreeningPattern', 'callAreaScreeningPattern', function(patternId) {
					self.callAreaScreeningNodeData.patternId = patternId;
					self.setupPanel();
				});
			}));

		}
		else {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(
				new AgnityGetSMSVariableHelper(Agnity.getTreeData(self.callAreaScreeningNodeData.ui).forestName, 'callareascreening', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.callAreaScreeningNodeData.smsValue, 'smsValue', function() {
					self.callAreaScreeningNodeData.smsValue = this.value;
				}));
		}
	}
}

Agnity.getCreateCallAreaScreeningPanel = function(inCallAreaScreeningNodeData) {
	var callAreaScreeningPanel = document.createElement('div');
	callAreaScreeningPanel.setAttribute('id', 'CallAreaScreeningPanel');

	var callAreaScreeningNodePanel = new recreateCallAreaScreeningPanel(callAreaScreeningPanel, inCallAreaScreeningNodeData);
	callAreaScreeningNodePanel.setupPanel();

	return [callAreaScreeningPanel, inCallAreaScreeningNodeData];
}

function recreateDialedPatternPanel(panelDiv, inDialedPatternNodeData) {
	this.dialedPatternNodeData = inDialedPatternNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		if (Agnity.getUrlParam('operationMode') == 'rfe') {
			panelDiv.appendChild(Agnity.createInputTextRowField(
				self.dialedPatternNodeData.patternId, 'patternId', function(event) {
				self.dialedPatternNodeData.patternId = this.value;
			}));

			panelDiv.appendChild(Agnity.createButtonRowField('selectPattern', function(event) {
				self.dialedPatternNodeData.ui.actions.get('selectPattern_dlg').funct(self.dialedPatternNodeData, 'dialedPattern', 'dialedPattern', function(patternId) {
					self.dialedPatternNodeData.patternId = patternId;
					self.setupPanel();
				});
			}));

		}
		else {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(
				new AgnityGetSMSVariableHelper(Agnity.getTreeData(self.dialedPatternNodeData.ui).forestName, 'dialedpattern', Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.dialedPatternNodeData.smsValue, 'smsValue', function() {
					self.dialedPatternNodeData.smsValue = this.value;
				}));
		}
	}
}

Agnity.getCreateDialedPatternPanel = function(inDialedPatternNodeData) {
	var dialedPatternNodePanel = document.createElement('div');
	dialedPatternNodePanel.setAttribute('id', 'DialedPatternNodePanel');

	var dialledPatternPanel = new recreateDialedPatternPanel(dialedPatternNodePanel, inDialedPatternNodeData);
	dialledPatternPanel.setupPanel();

	return [dialedPatternNodePanel, inDialedPatternNodeData];
}

Agnity.getCreatePercentagePanel = function(inPercentageNodeData) {
	var percentageNodePanel = document.createElement('div');
	percentageNodePanel.setAttribute('id', 'PercentageNodePanel');

	return [percentageNodePanel, inPercentageNodeData];
}

Agnity.getCreateStopTimerNodePanel = function(inStopTimerNodeData) {
	var stopTimerNodePanel = document.createElement('div');
	stopTimerNodePanel.setAttribute('id', 'StopTimerNodePanel');

	var timerNameSelector = new AgnityDynamicValueSelector(stopTimerNodePanel, inStopTimerNodeData.ui);

	timerNameSelector.setupWidget(inStopTimerNodeData.timerNameType, inStopTimerNodeData.timerName, 'timerName',
		function(value) {
			inStopTimerNodeData.timerNameType = value;
		},
		function(value) {
			inStopTimerNodeData.timerName = value;
		});

	return [stopTimerNodePanel, inStopTimerNodeData];
}

Agnity.getCreateCallHoldPanel = function(inCallHoldNodeData) {
	var callHoldPanel = document.createElement('div');
	callHoldPanel.setAttribute('id', 'CallHoldNodePanel');

+    callHoldPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.callHoldLegMapping,
			inCallHoldNodeData.callLeg , 'callLeg', function(event) {
			console.log("callLeg value:- "+ this.value);
				inCallHoldNodeData.callLeg = this.value;
			}));
	callHoldPanel.appendChild(Agnity.createCheckboxRowField(
		inCallHoldNodeData.playMusicOnHold, 'playMusicOnHold', function() {
		inCallHoldNodeData.playMusicOnHold = this.checked;
		if (this.checked) {
			playAnnSelector.show();
		}
		else {
			playAnnSelector.hide();
		}
	}));

	var playAnnSelector = new AgnityDynamicValueSelector(callHoldPanel, inCallHoldNodeData.ui);

	playAnnSelector.setupWidget(inCallHoldNodeData.playAnnType, inCallHoldNodeData.playAnn, 'playAnn',
		function(value) {
			inCallHoldNodeData.playAnnType = value;
		},
		function(value) {
			inCallHoldNodeData.playAnn = value;
		});

	if (!inCallHoldNodeData.playMusicOnHold) {
		playAnnSelector.hide();
	}

	return [callHoldPanel, inCallHoldNodeData];
}

function recreateDigitPatternPanel(panelDiv, inDigitPatternNodeData) {
	this.digitPatternNodeData = inDigitPatternNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		var playAnnSelector = new AgnityDynamicValueSelector(panelDiv, self.digitPatternNodeData.ui);

		playAnnSelector.setupWidget(self.digitPatternNodeData.playAnnType, self.digitPatternNodeData.playAnn, 'playAnn',
			function(value) {
				self.digitPatternNodeData.playAnnType = value;
			},
			function(value) {
				self.digitPatternNodeData.playAnn = value;
			});

		var invalidInputAnnSelector = new AgnityDynamicValueSelector(panelDiv, self.digitPatternNodeData.ui);

		invalidInputAnnSelector.setupWidget(self.digitPatternNodeData.invalidInputAnnType, self.digitPatternNodeData.invalidInputAnn, 'invalidInputAnn',
			function(value) {
				self.digitPatternNodeData.invalidInputAnnType = value;
			},
			function(value) {
				self.digitPatternNodeData.invalidInputAnn = value;
			});

		var noInputAnnSelector = new AgnityDynamicValueSelector(panelDiv, self.digitPatternNodeData.ui);

		noInputAnnSelector.setupWidget(self.digitPatternNodeData.noInputAnnType, self.digitPatternNodeData.noInputAnn, 'noInputAnn',
			function(value) {
				self.digitPatternNodeData.noInputAnnType = value;
			},
			function(value) {
				self.digitPatternNodeData.noInputAnn = value;
			});

		var patternTypeVal = agnityGlobalData.mappingData.digitPatternTypeMapping;

		var patternTypeValueSelector = Agnity.createDropDownRowField(patternTypeVal, self.digitPatternNodeData.patternType, 'patternType', function(event) {
			var prevSelectedPatternType = self.digitPatternNodeData.patternType;
			self.digitPatternNodeData.patternType = this.value;

			if (prevSelectedPatternType != null && prevSelectedPatternType != '' && prevSelectedPatternType != self.digitPatternNodeData.patternType)
				self.setupPanel();
		});

		panelDiv.appendChild(patternTypeValueSelector);

		panelDiv.appendChild(Agnity.createInputTextRowField(
			self.digitPatternNodeData.validPatternList, 'validPatternList', function(event) {
			self.digitPatternNodeData.validPatternList = this.value;
		}));

		panelDiv.appendChild(Agnity.createInputTextRowField(
			self.digitPatternNodeData.retryAttempts, 'retryAttempts', function(event) {
			self.digitPatternNodeData.retryAttempts = this.value;
		}));

		var digitPatternType = 'authdigitpattern'

		if (self.digitPatternNodeData.patternType == 'PIN') {
			digitPatternType = 'pindigitpattern';
		}
		else if (self.digitPatternNodeData.patternType == 'EXTN') {
			digitPatternType = 'extndigitpattern';
		}

		if (Agnity.getUrlParam('operationMode') == 'rfe') {
			panelDiv.appendChild(Agnity.createInputTextRowField(
				self.digitPatternNodeData.patternId, 'patternId', function(event) {
				self.digitPatternNodeData.patternId = this.value;
			}));

			panelDiv.appendChild(Agnity.createButtonRowField('selectPattern', function(event) {
				self.digitPatternNodeData.ui.actions.get('selectPattern_dlg').funct(self.digitPatternNodeData, digitPatternType, 'digitPattern', 'digitPattern', function(patternId) {
					self.digitPatternNodeData.patternId = patternId;
					self.setupPanel();
				});
			}));

		}
		else {
			panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetSMSVariableHelper(Agnity.getTreeData(self.digitPatternNodeData.ui).forestName, digitPatternType, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
				self.digitPatternNodeData.digitPattern, 'digitPattern', function() {
					self.digitPatternNodeData.digitPattern = this.value;
				}))
		}
	}
}

Agnity.getCreateDigitPatternPanel = function(inDigitPatternNodeData) {
	var digitPatternPanel = document.createElement('div');
	digitPatternPanel.setAttribute('id', 'DigitPatternNodePanel');

	var digitPatternNodePanel = new recreateDigitPatternPanel(digitPatternPanel, inDigitPatternNodeData);
	digitPatternNodePanel.setupPanel();

	return [digitPatternPanel, inDigitPatternNodeData];
}

Agnity.getComponentPropertyPanel = function(inComponentData) {
	var componentPropertyPanel = document.createElement('div');
	componentPropertyPanel.setAttribute('id', 'ComponentPropertyPanel');

	var forestPanelHelper = new AgnityDynamicDropDownHelper();

	componentPropertyPanel.appendChild(forestPanelHelper.setupWidget(new AgnityGetAvailableForestsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inComponentData.forestName, 'forestName',
		function(event) {
			if (this.value == 'AgnityNewRecordRequest') {
				inComponentData.ui.actions.get('createForest').funct(function(possibleForests, newForestName) {
					inComponentData.forestName = newForestName;
					forestPanelHelper.rebuildEntries(possibleForests, newForestName);
				});
			}
			else {
				inComponentData.forestName = this.value;
			}
		}, 'addNewForest', Agnity.isADE())
	);

	componentPropertyPanel.appendChild(Agnity.createInputTextRowField(inComponentData.componentName, 'componentName', function(event) {
		inComponentData.componentName = this.value;
	}));

	return [componentPropertyPanel, inComponentData];
}

Agnity.getTreeNodePropertyPanel = function(inTreeNodeData) {
	var treeNodePropertyPanel = document.createElement('div');
	treeNodePropertyPanel.setAttribute('id', 'TreeNodePropertyPanel');

	var treeSelectionHelper = new AgnityDynamicDropDownHelper();

	treeNodePropertyPanel.appendChild(treeSelectionHelper.setupWidget(new AgnityGetAvailableTreesHelper(Agnity.getComponentData(inTreeNodeData.ui).forestName, 'tree', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inTreeNodeData.treeName, 'treeName', function(event) {
		if (this.value == 'AgnityNewRecordRequest') {
			inTreeNodeData.ui.actions.get('newTree_dlg').funct(function(possibleValues, newTree) {
				inTreeNodeData.treeName = newTree;
				Agnity.setLabel(inTreeNodeData.ui, inTreeNodeData.cell, newTree);

				treeSelectionHelper.rebuildEntries(possibleValues, newTree);
			});
		}
		else
			inTreeNodeData.treeName = this.value;
	}, 'addNewTree')
	);

	var openButton = Agnity.createButtonRowField('viewTree', function(event) {
		Agnity.storeNodeData(inTreeNodeData);

		if (agnityGlobalData.tabId == null)
			window.open('TreeViewer.html?forestName=' + Agnity.getComponentData(inTreeNodeData.ui).forestName + '&treeName=' + inTreeNodeData.treeName);
		else
			agnityGlobalData.sendMessageToParent('connectTree', { 'forestName': Agnity.getComponentData(inTreeNodeData.ui).forestName, 'name': inTreeNodeData.treeName, 'diagramType': 'tree' });
	});

	Agnity.removeRowFieldDisabled(openButton);

	treeNodePropertyPanel.appendChild(openButton);

	return [treeNodePropertyPanel, inTreeNodeData];
}

Agnity.getFunctionBlockNodePropertyPanel = function(inFunctionBlockNodeData) {
	var functionBlockNodePropertyPanel = document.createElement('div');
	functionBlockNodePropertyPanel.setAttribute('id', 'FunctionBlockNodePropertyPanel');

	var functionBlockPanelHelper = new AgnityDynamicDropDownHelper();

	functionBlockNodePropertyPanel.appendChild(functionBlockPanelHelper.setupWidget(new AgnityGetAvailableFunctionBlocksHelper(Agnity.getComponentData(inFunctionBlockNodeData.ui).forestName, 'component', Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inFunctionBlockNodeData.functionBlockName, 'blockName',
		function(event) {
			if (this.value == 'AgnityNewRecordRequest') {
				inFunctionBlockNodeData.ui.actions.get('newFunctionBlock').funct(function(possibleValues, newFunctionBlock) {
					inFunctionBlockNodeData.functionBlockName = newFunctionBlock;
					Agnity.setLabel(inFunctionBlockNodeData.ui, inFunctionBlockNodeData.cell, newFunctionBlock);

					functionBlockPanelHelper.rebuildEntries(possibleValues, newFunctionBlock);
				});
			}
			else
				inFunctionBlockNodeData.functionBlockName = this.value;
		}, 'addNewFunctionBlock')
	);

	var openButton = Agnity.createButtonRowField('viewFunctionBlock', function(event) {
		Agnity.storeNodeData(inFunctionBlockNodeData);

		if (agnityGlobalData.tabId == null)
			window.open('TreeViewer.html?forestName=' + Agnity.getComponentData(inFunctionBlockNodeData.ui).forestName + '&componentName=' + inFunctionBlockNodeData.functionBlockName);
		else
			agnityGlobalData.sendMessageToParent('viewComponent', { 'forestName': Agnity.getComponentData(inFunctionBlockNodeData.ui).forestName, 'name': inFunctionBlockNodeData.functionBlockName, 'diagramType': 'component' });
	});

	Agnity.removeRowFieldDisabled(openButton);

	functionBlockNodePropertyPanel.appendChild(openButton);

	return [functionBlockNodePropertyPanel, inFunctionBlockNodeData];
}

Agnity.getCreateProcessCallNodePanel = function(inProcessNodeData) {
	var processNodePanel = document.createElement('div');
	processNodePanel.setAttribute('id', 'ProcessNodePanel');

	processNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetAvailableProcessHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inProcessNodeData.processName,
		'processName', function() {
			inProcessNodeData.processName = this.value;
		}));

	var openButton = Agnity.createButtonRowField('openProcess', function(event) {
		Agnity.storeNodeData(inProcessNodeData);

		if (inProcessNodeData.processName != null && inProcessNodeData.processName != '')
			agnityGlobalData.sendMessageToParent('connectTree', { 'forestName': 'AgnityProcess_' + inProcessNodeData.processName, 'name': inProcessNodeData.processName, 'diagramType': 'process' });
	});

	processNodePanel.appendChild(openButton);

	processNodePanel.appendChild(Agnity.createButtonRowField('setProcessVar', function(event) {
		inProcessNodeData.ui.actions.get('setProcessVar').funct(inProcessNodeData);
	}));

	Agnity.removeRowFieldDisabled(openButton);

	return [processNodePanel, inProcessNodeData];
}

Agnity.getCreateProcessStartNodePanel = function(inProcessStartNodeData) {
	var processStartNodePanel = document.createElement('div');
	processStartNodePanel.setAttribute('id', 'ProcessStartNodePanel');

	processStartNodePanel.appendChild(Agnity.createInputTextRowField(inProcessStartNodeData.versionId,
		'processVersion', function(event) {
		inProcessStartNodeData.versionId = this.value;
	}));

	processStartNodePanel.appendChild(Agnity.createButtonRowField('setSMSVar', function(event) {
		inProcessStartNodeData.ui.actions.get('setSMSVar').funct(inProcessStartNodeData);
	}));

	return [processStartNodePanel, inProcessStartNodeData];
}

Agnity.getCreateReturnNodePanel = function(inReturnNodeData) {
	var returnNodePanel = document.createElement('div');
	returnNodePanel.setAttribute('id', 'ReturnNodePanel');

	return [returnNodePanel, inReturnNodeData];
}

Agnity.getCreateResyncCallNodePanel = function(inResyncCallNodeData) {
	var resyncCallNodePanel = document.createElement('div');
	resyncCallNodePanel.setAttribute('id', 'ResyncCallNodePanel');

	return [resyncCallNodePanel, inResyncCallNodeData];
}

Agnity.getCreateDialoutCallNodePanel = function(inDialoutCallNodeData) {
	var dialoutCallNodePanel = document.createElement('div');
	dialoutCallNodePanel.setAttribute('id', 'DialoutCallNodePanel');

	/*dialoutCallNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.dialoutCallCalledPartyMapping,
		inDialoutCallNodeData.sendMode, 'sendMode', function(event) {
		inDialoutCallNodeData.sendMode = this.value;
	}));

	dialoutCallNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.dialoutCallCallingPartyMapping,
		inDialoutCallNodeData.connectionMode, 'connectionMode', function(event) {
		inDialoutCallNodeData.connectionMode = this.value;
	}));*/
	/*dialoutCallNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.dialoutCallDropCallModeMapping,
		inDialoutCallNodeData.dropCallMode, 'dropCallMode', function(event) {
		inDialoutCallNodeData.dropCallMode = this.value;
	}));*/
	/*dialoutCallNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.dialoutCallDirectionOfConnectionMapping,
		inDialoutCallNodeData.directionOfConnection, 'directionOfConnection', function(event) {
		inDialoutCallNodeData.directionOfConnection = this.value;
	}));*/
	
    dialoutCallNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inDialoutCallNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inDialoutCallNodeData.calledParty,
		'calledParty', function(event) {
			inDialoutCallNodeData.calledParty = this.value;
		}));
		
	dialoutCallNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inDialoutCallNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inDialoutCallNodeData.callingParty,
		'callingParty', function(event) {
			inDialoutCallNodeData.callingParty = this.value;
		}));	
	
	dialoutCallNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inDialoutCallNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()), inDialoutCallNodeData.outboundAddress,
		'outboundAddress', function(event) {
			inDialoutCallNodeData.outboundAddress = this.value;
		}));

	return [dialoutCallNodePanel, inDialoutCallNodeData];
}

Agnity.getCreateTableNodePanel = function(inTableNodeData) {
	var tableNodePanel = document.createElement('div');
	tableNodePanel.setAttribute('id', 'TableNodePanel');

	tableNodePanel.appendChild(Agnity.createInputTextRowField(inTableNodeData.apiName, 'apiName', function(event) {
		inTableNodeData.apiName = this.value;
	}));

	tableNodePanel.appendChild(Agnity.createInputTextRowField(inTableNodeData.description, 'description', function(event) {
		inTableNodeData.description = this.value;
	}));

	tableNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.accountHierarchialType,
		inTableNodeData.accountHierarchialType, 'accountHierarchialType', function(event) {
		inTableNodeData.accountHierarchialType = this.value;
	}));

	tableNodePanel.appendChild(Agnity.createCheckboxRowField(inTableNodeData.isSpsOnly, 'isSpsOnly', function(event) {
		inTableNodeData.isSpsOnly = this.checked;
	}));

	tableNodePanel.appendChild(Agnity.createCheckboxRowField(inTableNodeData.isVersionEnabled, 'isVersionEnabled', function(event) {
		inTableNodeData.isVersionEnabled = this.checked;
	}));
	
	tableNodePanel.appendChild(Agnity.createCheckboxRowField(inTableNodeData.isVersionkeyRequired, 'isVersionkeyRequired', function(event) {
		inTableNodeData.isVersionkeyRequired = this.checked;
	}));

	tableNodePanel.appendChild(Agnity.createButtonRowField('manageColumns', function(event) {
		inTableNodeData.ui.actions.get('manageColumns').funct(inTableNodeData);
	}));

	tableNodePanel.appendChild(Agnity.createButtonRowField('manageConstraints', function(event) {
		inTableNodeData.ui.actions.get('manageConstraints').funct(inTableNodeData);
	}));

	tableNodePanel.appendChild(Agnity.createButtonRowField('manageIndexes', function(event) {
		inTableNodeData.ui.actions.get('manageIndexes').funct(inTableNodeData);
	}));

	tableNodePanel.appendChild(Agnity.createButtonRowField('defineRules', function(event) {
		inTableNodeData.ui.actions.get('defineRules').funct(inTableNodeData);
	}));

	tableNodePanel.appendChild(Agnity.createButtonRowField('manageAudit', function(event){
		inTableNodeData.ui.actions.get('manageAudit').funct(inTableNodeData);
	}))

	return [tableNodePanel, inTableNodeData];
}

Agnity.getSequenceNodePanel = function(inSequenceNodeData) {
	var sequenceNodePanel = document.createElement('div');
	sequenceNodePanel.setAttribute('id', 'SequenceNodePanel');

	var sequencePanelDisplay = new AgnityDynamicDisplay();

	sequenceNodePanel.appendChild(Agnity.createInputTextRowField(inSequenceNodeData.description, 'description', function(event) {
		inSequenceNodeData.description = this.value;
	}));

	sequenceNodePanel.appendChild(Agnity.createInputTextRowField(inSequenceNodeData.startsWith, 'startsWith', function(event) {
		inSequenceNodeData.startsWith = this.value;
	}));

	sequenceNodePanel.appendChild(Agnity.createInputTextRowField(inSequenceNodeData.incrementBy, 'incrementBy', function(event) {
		inSequenceNodeData.incrementBy = this.value;
	}));

	var maxValue = Agnity.createInputTextRowField(inSequenceNodeData.maxVal, 'maxVal', function(event) {
		inSequenceNodeData.maxVal = this.value;
	})

	sequenceNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.sequenceNodeMaxValueMapping,
		inSequenceNodeData.max, 'max', function(event) {
			inSequenceNodeData.max = this.value;

			if (this.value == "Maximum")
				sequencePanelDisplay.show(maxValue);
			else {
				inSequenceNodeData.maxVal = ''
				sequencePanelDisplay.hide(maxValue);
			}

		}));

	sequenceNodePanel.appendChild(maxValue);

	var minValue = Agnity.createInputTextRowField(inSequenceNodeData.minVal, 'minVal', function(event) {
		inSequenceNodeData.minVal = this.value;
	})

	sequenceNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.sequenceNodeMinValueMapping,
		inSequenceNodeData.min, 'min', function(event) {
			inSequenceNodeData.min = this.value;

			if (this.value == "Minimum")
				sequencePanelDisplay.show(minValue);
			else {
				inSequenceNodeData.minVal = '';
				sequencePanelDisplay.hide(minValue);
			}
		}));

	sequenceNodePanel.appendChild(minValue);

	var cacheValue = Agnity.createInputTextRowField(inSequenceNodeData.cacheVal, 'cacheVal', function(event) {
		inSequenceNodeData.cacheVal = this.value;
	});

	sequenceNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.sequenceNodeCacheValueMapping,
		inSequenceNodeData.cache, 'cache', function(event) {
			inSequenceNodeData.cache = this.value;

			if (this.value == "Cache")
				sequencePanelDisplay.show(cacheValue);
			else {
				inSequenceNodeData.cacheVal = '';
				sequencePanelDisplay.hide(cacheValue);
			}
		}));

	sequenceNodePanel.appendChild(cacheValue);

	sequenceNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.sequenceNodeCycleValueMapping,
		inSequenceNodeData.cycle, 'cycle', function(event) {
			inSequenceNodeData.cycle = this.value;
		}));

	sequenceNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.sequenceNodeOrderValueMapping,
		inSequenceNodeData.order, 'order', function(event) {
			inSequenceNodeData.order = this.value;
		}));

	if (inSequenceNodeData.max != "Maximum") {
		sequencePanelDisplay.hide(maxValue);
	}

	if (inSequenceNodeData.min != "Minimum") {
		sequencePanelDisplay.hide(minValue);
	}

	if (inSequenceNodeData.cache != "Cache") {
		sequencePanelDisplay.hide(cacheValue);
	}

	return [sequenceNodePanel, inSequenceNodeData];
}

Agnity.getViewNodePanel = function(inViewNodeData) {
	var viewNodePanel = document.createElement('div');
	viewNodePanel.setAttribute('id', 'ViewNodePanel');

	viewNodePanel.appendChild(Agnity.createInputTextRowField(inViewNodeData.description, 'description', function(event) {
		inViewNodeData.description = this.value;
	}));

	viewNodePanel.appendChild(Agnity.createInputTextRowField(inViewNodeData.statement, 'statement', function(event) {
		inViewNodeData.statement = this.value;
	}));

	return [viewNodePanel, inViewNodeData];
}
Agnity.getUserTypeNodePanel = function(inUserTypeNodeData) {
	var userTypeNodePanel = document.createElement('div');
	userTypeNodePanel.setAttribute('id', 'UserTypeNodePanel');

	userTypeNodePanel.appendChild(Agnity.createInputTextRowField(inUserTypeNodeData.description, 'description', function(event) {
		inUserTypeNodeData.description = this.value;
	}));

	userTypeNodePanel.appendChild(Agnity.createButtonRowField('manageUserType', function(event) {
		inUserTypeNodeData.ui.actions.get('manageUserType_dlg').funct(inUserTypeNodeData);
	}));

	return [userTypeNodePanel, inUserTypeNodeData];
}
Agnity.getSendAlaramNodePanel = function(inSendAlaramNodeData) {
	var sendAlaramNodePanel = document.createElement('div');
	sendAlaramNodePanel.setAttribute('id', 'SendAlaramNodePanel');

	sendAlaramNodePanel.appendChild(Agnity.createInputTextRowField(inSendAlaramNodeData.alarmcode, 'alarmcode', function(event) {
		inSendAlaramNodeData.alarmcode = this.value;
	}));

	sendAlaramNodePanel.appendChild(Agnity.createInputTextRowField(inSendAlaramNodeData.description, 'description', function(event) {
		inSendAlaramNodeData.description = this.value;
	}));

	sendAlaramNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.severityTypeMapping,
		inSendAlaramNodeData.severity, 'severity', function(event) {
			inSendAlaramNodeData.severity = this.value;
		}));

	return [sendAlaramNodePanel, inSendAlaramNodeData];
}
Agnity.getEndExecutionNodePanel = function(inEndExecutionNodePanel) {
	var endExecutionNodePanel = document.createElement('div');
	endExecutionNodePanel.setAttribute('id', 'EndExecutionNodePanel');

	return [endExecutionNodePanel, inEndExecutionNodePanel];
}

Agnity.getSendEmailNodePanel = function(inSendEmailNodeData) {
	var sendEmailNodePanel = document.createElement('div');
	sendEmailNodePanel.setAttribute('id', 'SendEmailNodePanel');

	sendEmailNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendEmailNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendEmailNodeData.smtpHost, 'smtpHost', function(event) {
		inSendEmailNodeData.smtpHost = this.value;
	}));

	sendEmailNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendEmailNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendEmailNodeData.user, 'user', function(event) {
		inSendEmailNodeData.user = this.value;
	}));

	sendEmailNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendEmailNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendEmailNodeData.password, 'password', function(event) {
		inSendEmailNodeData.password = this.value;
	}));

	sendEmailNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendEmailNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendEmailNodeData.from, 'from', function(event) {
		inSendEmailNodeData.from = this.value;
	}));

	sendEmailNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendEmailNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendEmailNodeData.recipient, 'recipient', function(event) {
		inSendEmailNodeData.recipient = this.value;
	}));

	sendEmailNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendEmailNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendEmailNodeData.subject, 'subject', function(event) {
		inSendEmailNodeData.subject = this.value;
	}));

	sendEmailNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendEmailNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendEmailNodeData.body, 'body', function(event) {
		inSendEmailNodeData.body = this.value;
	}));

	sendEmailNodePanel.appendChild(Agnity.createInputTextRowField(inSendEmailNodeData.mimeContent, 'mimeContent', function(event) {
		inSendEmailNodeData.mimeContent = this.value;
	}));

	return [sendEmailNodePanel, inSendEmailNodeData];
}

Agnity.getSendSMSNodePanel = function(inSendSMSNodeData) {
	var sendSMSNodePanel = document.createElement('div');
	sendSMSNodePanel.setAttribute('id', 'SendSMSNodePanel');

	var phoneNumberListSelector = new AgnityDynamicValueSelector(sendSMSNodePanel, inSendSMSNodeData.ui);

	phoneNumberListSelector.setupWidget(inSendSMSNodeData.phoneNumbertype, inSendSMSNodeData.phoneNumberList, 'phoneNumberList',
		function(value) {
			inSendSMSNodeData.phoneNumbertype = value;
		},
		function(value) {
			inSendSMSNodeData.phoneNumberList = value;
		});

	sendSMSNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inSendSMSNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inSendSMSNodeData.smsContent, 'smsContent', function(event) {
		inSendSMSNodeData.smsContent = this.value;
	}));

	sendSMSNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.smsAdaptorTypeMapping,
		inSendSMSNodeData.smsAdaptorType, 'smsAdaptorType', function(event) {
		inSendSMSNodeData.smsAdaptorType = this.value;
	}));

	return [sendSMSNodePanel, inSendSMSNodeData];
}

Agnity.getRoutingEngineNodePanel = function(inRoutingEngineNodeData) {
	var routingEnginePanel = document.createElement('div');
	routingEnginePanel.setAttribute('id', 'RoutingEngineNodePanel');

	var routingEngineNodePanel = new recreateRoutingEnginePanel(routingEnginePanel, inRoutingEngineNodeData);
	routingEngineNodePanel.setupPanel();

	return [routingEnginePanel, inRoutingEngineNodeData];
}

Agnity.getRouteNodePanel = function(inRouteNodeData) {
	var routeNodePanel = document.createElement('div');
	routeNodePanel.setAttribute('id', 'RouteNodePanel');

	routeNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.routeSendModeMapping,
		inRouteNodeData.sendMode, 'sendMode', function(event) {
		inRouteNodeData.sendMode = this.value;
	}));

	routeNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.routeConnectionModeMapping,
		inRouteNodeData.connectionMode, 'connectionMode', function(event) {
		inRouteNodeData.connectionMode = this.value;
	}));

	return [routeNodePanel, inRouteNodeData];
}

Agnity.getRoutePlayNodePanel = function(inRoutePlayNodeData) {
	var routePlayNodePanel = document.createElement('div');
	routePlayNodePanel.setAttribute('id', 'RouteNodePanel');

	routePlayNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.rePlayConnectionModeMapping,
		inRoutePlayNodeData.connectionMode, 'rePlayConnectionMode', function(event) {
		inRoutePlayNodeData.connectionMode = this.value;
	}));

	return [routePlayNodePanel, inRoutePlayNodeData];
}

Agnity.getRoutePlayCollectNodePanel = function(inRoutePlayCollectNodeData) {
	var routeplayCollectNodePanel = document.createElement('div');
	routeplayCollectNodePanel.setAttribute('id', 'RoutePlayCollectNodePropertyPanel');

	routeplayCollectNodePanel.appendChild(Agnity.createCheckboxRowField(
		inRoutePlayCollectNodeData.barge, 'rePlayCollectBarge', function(event) {
		inRoutePlayCollectNodeData.barge = this.checked;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createCheckboxRowField(
		inRoutePlayCollectNodeData.flex, 'rePlayCollectFlex', function(event) {
		inRoutePlayCollectNodeData.flex = this.checked;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createCheckboxRowField(
		inRoutePlayCollectNodeData.isDropIvrOnCompletion, 'reDropIvrOnCompletion', function(event) {
		inRoutePlayCollectNodeData.isDropIvrOnCompletion = this.checked;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.rePlayCollectConnectionModeMapping,
		inRoutePlayCollectNodeData.connectionNode, 'reConnectionMode', function(event) {
		inRoutePlayCollectNodeData.connectionNode = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.repeat, 'rePlayCollectRepeat', function(event) {
		inRoutePlayCollectNodeData.repeat = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.rePlayCollectReturnKeyMapping,
		inRoutePlayCollectNodeData.returnKey, 'rePlayCollectReturnKey', function(event) {
		inRoutePlayCollectNodeData.returnKey = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.rePlayCollectEscapeKeyMapping,
		inRoutePlayCollectNodeData.escapeKey, 'rePlayCollectEscapeKey', function(event) {
		inRoutePlayCollectNodeData.escapeKey = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.firstDigitTimer, 'rePlayCollectFirstDigitTimer', function(event) {
		inRoutePlayCollectNodeData.firstDigitTimer = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.extraDigitTimer, 'rePlayCollectExtraDigitTimer', function(event) {
		inRoutePlayCollectNodeData.extraDigitTimer = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.interDigitTimer, 'rePlayCollectInterDigitTimer', function(event) {
		inRoutePlayCollectNodeData.interDigitTimer = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.interDigitCriticalTimer, 'rePlayInterDigitCriticalTimer', function(event) {
		inRoutePlayCollectNodeData.interDigitCriticalTimer = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.longDigitTimer, 'rePlayCollectLongDigitTimer', function(event) {
		inRoutePlayCollectNodeData.longDigitTimer = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.minDigit, 'rePlayCollectMinDigit', function(event) {
		inRoutePlayCollectNodeData.minDigit = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.maxDigit, 'rePlayCollectMaxDigit', function(event) {
		inRoutePlayCollectNodeData.maxDigit = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.ignoreDigits, 'rePlayCollectIgnoreDigits', function(event) {
		inRoutePlayCollectNodeData.ignoreDigits = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createInputTextRowField(
		inRoutePlayCollectNodeData.backspaceDigits, 'rePlayCollectBackspaceDigits', function(event) {
		inRoutePlayCollectNodeData.backspaceDigits = this.value;
	}));

	routeplayCollectNodePanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inRoutePlayCollectNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inRoutePlayCollectNodeData));
	}));

	return [routeplayCollectNodePanel, inRoutePlayCollectNodeData];
}

Agnity.getApplyChargeNodePanel = function(inApplyChargeNodeData) {
	var applyChargeNodePanel = document.createElement('div');
	applyChargeNodePanel.setAttribute('id', 'ApplyChargeNodePanel');

	applyChargeNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inApplyChargeNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inApplyChargeNodeData.partyToCharge, 'partyToCharge', function(event) {
		inApplyChargeNodeData.partyToCharge = this.value;
	}));

	applyChargeNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inApplyChargeNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inApplyChargeNodeData.maxCallPeriodDuration, 'maxCallPeriodDuration', function(event) {
		inApplyChargeNodeData.maxCallPeriodDuration = this.value;
	}));

	applyChargeNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inApplyChargeNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inApplyChargeNodeData.tariffSwitchInterval, 'tariffSwitchInterval', function(event) {
		inApplyChargeNodeData.tariffSwitchInterval = this.value;
	}));

	applyChargeNodePanel.appendChild(Agnity.createCheckboxRowField(inApplyChargeNodeData.audibleIndicator,
		'audibleIndicator', function(event) {
		inApplyChargeNodeData.audibleIndicator = this.checked;
	}));

	applyChargeNodePanel.appendChild(Agnity.createCheckboxRowField(inApplyChargeNodeData.releaseIfdurationExceeded,
		'releaseIfdurationExceeded', function(event) {
		inApplyChargeNodeData.releaseIfdurationExceeded = this.checked;
	}));

	return [applyChargeNodePanel, inApplyChargeNodeData];
}

Agnity.getACGNodePanel = function(inAcgNodeData) {
	var acgNodePanel = document.createElement('div');
	acgNodePanel.setAttribute('id', 'ACGNodePanel');

	acgNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inAcgNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inAcgNodeData.calledParty, 'calledParty', function(event) {
		inAcgNodeData.calledParty = this.value;
	}));

	acgNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inAcgNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inAcgNodeData.newtorkMgmtClass, 'newtorkMgmtClass', function(event) {
		inAcgNodeData.newtorkMgmtClass = this.value;
	}));

	acgNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inAcgNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inAcgNodeData.factor, 'factor', function(event) {
		inAcgNodeData.factor = this.value;
	}));

	return [acgNodePanel, inAcgNodeData];
}

Agnity.getTriggerRuleNodePanel = function(inTriggerRuleNodeData) {
	var triggerRuleNodePanel = document.createElement('div');
	triggerRuleNodePanel.setAttribute('id', 'TriggerRuleNodePanel');

	var appEntryPanelHelper = new AgnityDynamicDropDownHelper();

	triggerRuleNodePanel.appendChild(appEntryPanelHelper.setupWidget(new AgnityGetAvailableAppsHelper(Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inTriggerRuleNodeData.appId, 'appId',
		function(event) {
			if (this.value == 'AgnityNewRecordRequest') {
				inTriggerRuleNodeData.ui.actions.get('newAppId').funct(function(possibleValues, newAppId) {
					inTriggerRuleNodeData.appId = newAppId;
					appEntryPanelHelper.rebuildEntries(possibleValues, newAppId);
				});
			}
			else
				inTriggerRuleNodeData.appId = this.value;
		}, 'addNewApp')
	);

	return [triggerRuleNodePanel, inTriggerRuleNodeData];
}

Agnity.getTuiNodePanel = function(inTuiNodeData) {
	var tuiNodePanel = document.createElement('div');
	tuiNodePanel.setAttribute('id', 'TuiNodePanel');

	tuiNodePanel.appendChild(Agnity.createButtonRowField('uploadJson', function(event) {
		inTuiNodeData.ui.actions.get('tuiDataHandler').funct(
			inTuiNodeData);
	}));

	tuiNodePanel.appendChild(Agnity.createButtonRowField('defineKeys', function(event) {
		inTuiNodeData.ui.actions.get('defineKeys').funct(
			inTuiNodeData);
	}));

	return [tuiNodePanel, inTuiNodeData];
}

Agnity.getEnumNodePanel = function(inEnumNodeData) {
	var enumNodePanel = document.createElement('div');
	enumNodePanel.setAttribute('id', 'EnumNodePanel');

	enumNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.enumServiceRoleMapping, inEnumNodeData.role, 'role', function(event) {
		inEnumNodeData.role = this.value;
	}));

	enumNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inEnumNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inEnumNodeData.queryNum, 'queryNum', function(event) {
			inEnumNodeData.queryNum = this.value;
		}));

	enumNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inEnumNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inEnumNodeData.zone, 'zone', function(event) {
			inEnumNodeData.zone = this.value;
		}));

	return [enumNodePanel, inEnumNodeData];
}

Agnity.getAVPRNodePanel = function(inAvprNodeData) {
	var avprNodePanel = document.createElement('div');
	avprNodePanel.setAttribute('id', 'AvprNodePanel');

	avprNodePanel.appendChild(Agnity.createButtonRowField('defineAvp', function(event) {
		inAvprNodeData.ui.actions.get('defineAvp').funct(
			inAvprNodeData);
	}));

	return [avprNodePanel, inAvprNodeData];
}

Agnity.getAVPWNodePanel = function(inAvpwNodeData) {
	var avpwNodePanel = document.createElement('div');
	avpwNodePanel.setAttribute('id', 'AvpwNodePanel');

	avpwNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inAvpwNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inAvpwNodeData.avpListHolder, 'avpListHolder', function(event) {
		inAvpwNodeData.avpListHolder = this.value;
	}));

	avpwNodePanel.appendChild(Agnity.createButtonRowField('defineAvp', function(event) {
		inAvpwNodeData.ui.actions.get('defineAvp').funct(
			inAvpwNodeData);
	}));

	return [avpwNodePanel, inAvpwNodeData];
}

Agnity.getDiameterCCRNodePanel = function(inDiameterCCRNodeData) {
	var diameterCCRNodePanel = document.createElement('div');
	diameterCCRNodePanel.setAttribute('id', 'DiameterCCRNodePanel');

	diameterCCRNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.ccrActionMapping, inDiameterCCRNodeData.action, 'ccrAction', function(event) {
		inDiameterCCRNodeData.action = this.value;
	}));

	diameterCCRNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inDiameterCCRNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
		inDiameterCCRNodeData.realm, 'ccrRealm', function(event) {
		inDiameterCCRNodeData.realm = this.value;
	}));

	diameterCCRNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetAvpListOnAvpWritersHelper(Agnity.getTreeData(inDiameterCCRNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getUiXml(inDiameterCCRNodeData.ui)),
		inDiameterCCRNodeData.avpListHolder, 'ccaAvpListHolder', function(event) {
		inDiameterCCRNodeData.avpListHolder = this.value;
	}));

	diameterCCRNodePanel.appendChild(Agnity.createCheckboxRowField(inDiameterCCRNodeData.isSessionBased,
		'ccrIsSessionBased', function(event) {
		inDiameterCCRNodeData.isSessionBased = this.checked;
	}));

	diameterCCRNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.ccrSessionModeMapping, inDiameterCCRNodeData.sessionMode, 'ccrSessionMode', function(event) {
		inDiameterCCRNodeData.sessionMode = this.value;
	}));

	return [diameterCCRNodePanel, inDiameterCCRNodeData];
}

Agnity.getDiameterCCANodePanel = function(inDiameterCCANodeData) {
	var diameterCCAPanel = document.createElement('div');
	diameterCCAPanel.setAttribute('id', 'DiameterCCANodePanel');

	diameterCCAPanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.ccaReturnCodeMapping, inDiameterCCANodeData.ccaReturnCode, 'ccaReturnCode', function(event) {
		inDiameterCCANodeData.ccaReturnCode = this.value;
	}));

	diameterCCAPanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetAvpListOnAvpWritersHelper(Agnity.getTreeData(inDiameterCCANodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getUiXml(inDiameterCCANodeData.ui)),
		inDiameterCCANodeData.avpListHolder, 'ccaAvpListHolder', function(event) {
		inDiameterCCANodeData.avpListHolder = this.value;
	}));

	return [diameterCCAPanel, inDiameterCCANodeData];
}

Agnity.getSIPHeaderPanel = function(inSIPHeaderNodeData) {
	var sipHeaderPanel = document.createElement('div');
	sipHeaderPanel.setAttribute('id', 'SIPHeaderPanel');

	sipHeaderPanel.appendChild(Agnity.createButtonRowField('setHeaders', function(event) {
		inSIPHeaderNodeData.ui.actions.get('setHeaders').funct(inSIPHeaderNodeData);
	}));

	sipHeaderPanel.appendChild(Agnity.createHelpLinkRow('help', function(event) {
		inSIPHeaderNodeData.ui.actions.get('helpLinkDialog').funct(Agnity.getNodeName(inSIPHeaderNodeData));
	}));

	return [sipHeaderPanel, inSIPHeaderNodeData];
};

Agnity.getCheckPointPanel =  function(inCheckPointData){

	var checkpointNodePanel = document.createElement('div');
	checkpointNodePanel.setAttribute('id' , 'CheckPointNodePanel');
	return [checkpointNodePanel, inCheckPointData];

};

Agnity.getSmppNodePanel = function(inSmppNodeData) {
	var smppNodePanel = document.createElement('div');
	smppNodePanel.setAttribute('id', 'SmppNodePanel');

	smppNodePanel.appendChild(Agnity.createInputTextRowField(inSmppNodeData.destPh, 'destPh', function(event) {
		inSmppNodeData.destPh = this.value;
	}));

	smppNodePanel.appendChild(Agnity.createInputTextRowField(inSmppNodeData.srcPh, 'srcPh', function(event) {
		inSmppNodeData.srcPh = this.value;
	}));

	smppNodePanel.appendChild(Agnity.createInputTextRowField(inSmppNodeData.shortMsg, 'shortMsg', function(event) {
		inSmppNodeData.shortMsg = this.value;
	}));


	return [smppNodePanel, inSmppNodeData];
}

Agnity.getGdiNodePanel = function(inGdiNodeData) {
	var gdiNodePanel = document.createElement('div');
	gdiNodePanel.setAttribute('id', 'GdiNodePanel');

	gdiNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inGdiNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inGdiNodeData.recieverId, 'recieverId', function(event) {
				inGdiNodeData.recieverId = this.value;
			}));

	gdiNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inGdiNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inGdiNodeData.dialledNumber, 'dialledNumber', function(event) {
				inGdiNodeData.dialledNumber = this.value;
			}));

	gdiNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inGdiNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inGdiNodeData.callingNumber, 'callingNumber', function(event) {
				inGdiNodeData.callingNumber = this.value;
			}));


	return [gdiNodePanel, inGdiNodeData];
}

Agnity.getDisconnectLegNodePanel = function(inDisconnectLegNodeData) {
	var disconnectLegNodePanel = document.createElement('div');
	disconnectLegNodePanel.setAttribute('id', 'DisconnectLegNodePanel');

	disconnectLegNodePanel.appendChild(Agnity.createDropDownRowField(
		agnityGlobalData.mappingData.disconnectLegMapping, inDisconnectLegNodeData.disconnectLeg, 'disconnectLeg', function() {
		inDisconnectLegNodeData.disconnectLeg = this.value;
	}));


	return [disconnectLegNodePanel, inDisconnectLegNodeData];
}



Agnity.getServiceChainingNodePanel = function(inServiceChainingData) {
	var serviceChainingNodePanel = document.createElement('div');
	serviceChainingNodePanel.setAttribute('id', 'ServiceChainingNodePanel');

	serviceChainingNodePanel.appendChild(Agnity.createInputTextRowField(inServiceChainingData.nextServiceApplicationId, 'nextServiceApplicationId', function(event) {
		inServiceChainingData.nextServiceApplicationId= this.value;
	}));


	return [serviceChainingNodePanel, inServiceChainingData];
}

Agnity.getForceCallCleanupNodePanel = function(inForceCallCleanupData) {
	var forceCallCleanupNodePanel = document.createElement('div');
	forceCallCleanupNodePanel.setAttribute('id', 'ForceCallCleanupNodePanel');

	forceCallCleanupNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inForceCallCleanupData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inForceCallCleanupData.appSessionId, 'appSessionId', function(event) {
				inForceCallCleanupData.appSessionId = this.value;
			}));
			
		forceCallCleanupNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inForceCallCleanupData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inForceCallCleanupData.appId, 'appId', function(event) {
				inForceCallCleanupData.appId = this.value;
			}));		

	return [forceCallCleanupNodePanel, inForceCallCleanupData];
}

Agnity.getATINodePanel = function(inATINodeData) {
	var atiNodePanel = document.createElement('div');
	atiNodePanel.setAttribute('id', 'ATINodePanel');

	atiNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.atiReturnDomainType, inATINodeData.domainType, 'domainType', function(event) {
		inATINodeData.domainType = this.value;
	}));
			
	atiNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inATINodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inATINodeData.currLocation, 'currLocation', function(event) {
				inATINodeData.currLocation = this.value;
			}));
			
	atiNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inATINodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inATINodeData.gsmScfAddress, 'gsmScfAddress', function(event) {
				inATINodeData.gsmScfAddress = this.value;
			}));
			
		
	atiNodePanel.appendChild(Agnity.createInputTextRowField(inATINodeData.msisdn, 'msisdn', function(event) {
		inATINodeData.msisdn = this.value;
	}));

	return [atiNodePanel, inATINodeData];
}

Agnity.getUDRNodePanel = function(inUDRNodeData) {
	var udrNodePanel = document.createElement('div');
	udrNodePanel.setAttribute('id', 'UDRNodePanel');

	udrNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inUDRNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inUDRNodeData.currLocation, 'currLocation', function(event) {
				inUDRNodeData.currLocation = this.value;
			}));
	udrNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inUDRNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inUDRNodeData.msisdn, 'msisdn', function(event) {
				inUDRNodeData.msisdn = this.value;
			}));
	udrNodePanel.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(inUDRNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inUDRNodeData.destinationRealm, 'destinationRealm', function(event) {
				inUDRNodeData.destinationRealm = this.value;
			}));				

	return [udrNodePanel, inUDRNodeData];
}

Agnity.getCCBNodePanel = function(inCCBNodeData) {
	var ccbNodePropertyPanel = document.createElement('div');
	ccbNodePropertyPanel.setAttribute('id', 'CCBNodePropertyPanel');

	var ccbNodeFunctionPanel = new ccbConditionNodePropertyPanel(ccbNodePropertyPanel, inCCBNodeData);
	ccbNodeFunctionPanel.setupPanel();
	return [ccbNodePropertyPanel, inCCBNodeData];

}

Agnity.getCallQueuingNodePanel = function(inCQNodeData) {
	var cqNodePropertyPanel = document.createElement('div');
	cqNodePropertyPanel.setAttribute('id', 'CallQueuingNodePropertyPanel');

	var cqNodeFunctionPanel = new callQueuingConditionNodePropertyPanel(cqNodePropertyPanel, inCQNodeData);
	cqNodeFunctionPanel.setupPanel();
	return [cqNodePropertyPanel, inCQNodeData];

}


Agnity.getPegCountNodePanel = function(inPegCountNodeData) {
	var routingEnginePanel = document.createElement('div');
	routingEnginePanel.setAttribute('id', 'pegCountNodePanel');

	var routingEngineNodePanel = new pegCountNodePanel(routingEnginePanel, inPegCountNodeData);
	routingEngineNodePanel.setupPanel();

	return [routingEnginePanel, inPegCountNodeData];
}

Agnity.getHttpRaNodePanel = function(inPegCountNodeData) {
	var routingEnginePanel = document.createElement('div');
	routingEnginePanel.setAttribute('id', 'getHttpRaNodePanel');

	var routingEngineNodePanel = new getHttpRaNodePanel(routingEnginePanel, inPegCountNodeData);
	routingEngineNodePanel.setupPanel();

	return [routingEnginePanel, inPegCountNodeData];
}

function getHttpRaNodePanel(panelDiv, inRoutingEngineNodeData) {
	this.routingEngineNodeData = inRoutingEngineNodeData;
	this.panelDiv = panelDiv;
	//--------------------------------------// panel holder creation
		this.variablePanelHelper = new AgnityDynamicDropDownHelper();  
		this.variablePanelHelper2 = new AgnityDynamicDropDownHelper();  
		this.variablePanelHelper3 = new AgnityDynamicDropDownHelper();   
		this.variablePanelHelper4 = new AgnityDynamicDropDownHelper();   
		this.variablePanelHelper5 = new AgnityDynamicDropDownHelper();   
		this.variablePanelHelper6 = new AgnityDynamicDropDownHelper();   
		
		this.variableProvider = new AgnityGetVariablesHelper(Agnity.getTreeData(this.routingEngineNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
	//--------------------------------------- 

	this.setupPanel = function () {
		var self = this;
		self.panelDiv.innerHTML = '';

		let pegCountIdOptions = agnityGlobalData.getAMMappingData().map(v => v.pegCountName);
		if (pegCountIdOptions.length == 0) {
			pegCountIdOptions = ['None'];
		}
		//--------------------------------------
		self.variableRow = self.variablePanelHelper
		.setupWidget(self.variableProvider, inRoutingEngineNodeData.url, 'url', 
		function (event) {
			inRoutingEngineNodeData.url = this.value; //httpRaCountId
		});
		//--------------------------------------- 
		panelDiv.appendChild(self.variableRow);
		//--------------------------------------
		//2
		//--------------------------------------
		self.variableRow2 = self.variablePanelHelper2
		.setupWidget(self.variableProvider, inRoutingEngineNodeData.content, 'content', //httpcontent
		function (event) {
			inRoutingEngineNodeData.content = this.value;
		});
		//--------------------------------------- 
		panelDiv.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.httpRaCountStaticKeymapping,
			inRoutingEngineNodeData.method, 'method', function (event) { //httpmethod
				inRoutingEngineNodeData.method = this.value;
			}));
		panelDiv.appendChild(self.variableRow2);
		//3
		//--------------------------------------
		self.variableRow3 = self.variablePanelHelper3
		.setupWidget(self.variableProvider, inRoutingEngineNodeData.contentType, 'contentType', 
		function (event) {
			inRoutingEngineNodeData.contentType = this.value;
		});
		panelDiv.appendChild(self.variableRow3);
		//4
		//--------------------------------------
		self.variableRow4 = self.variablePanelHelper4
		.setupWidget(self.variableProvider, inRoutingEngineNodeData.reqTimeout, 'reqTimeout', 
		function (event) {
			inRoutingEngineNodeData.reqTimeout = this.value;
		});
		panelDiv.appendChild(self.variableRow4);

//5
		//--------------------------------------
		self.variableRow5 = self.variablePanelHelper5
		.setupWidget(self.variableProvider, inRoutingEngineNodeData.outHttpResp, 'outHttpResp', 
		function (event) {
			inRoutingEngineNodeData.outHttpResp = this.value;
		});
		panelDiv.appendChild(self.variableRow5);

//6
		//--------------------------------------
		self.variableRow6 = self.variablePanelHelper6
		.setupWidget(self.variableProvider, inRoutingEngineNodeData.outHttpContent, 'outHttpContent', 
		function (event) {
			inRoutingEngineNodeData.outHttpContent = this.value;
		});
		panelDiv.appendChild(self.variableRow6);


		panelDiv.appendChild(Agnity.createButtonRowField('setHttpHeaders', function (event) {
			inRoutingEngineNodeData.ui.actions.get('setHttpHeaders').funct(inRoutingEngineNodeData);
		}));


		// panelDiv.appendChild(Agnity.createButtonRowField('setPegCount', function(event) {
		// 	inRoutingEngineNodeData.ui.actions.get('setPegCount').funct(inRoutingEngineNodeData);
		// }));

		// if (inRoutingEngineNodeData.staticKey == "INCREMENT_BY" || inRoutingEngineNodeData.staticKey == "DECREMENT_BY") {
		// 	panelDiv.appendChild(Agnity.createInputTextRowField(inRoutingEngineNodeData.incrementByValue, 'incrementByValue', function (event) {
		// 		inRoutingEngineNodeData.incrementByValue = this.value;
		// 	}));
		// } else {
		// 	inRoutingEngineNodeData.incrementByValue = "";
		// }
	}
}

function pegCountNodePanel(panelDiv, inRoutingEngineNodeData) {
	this.routingEngineNodeData = inRoutingEngineNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		let pegCountIdOptions = agnityGlobalData.getAMMappingData().map(v => v.pegCountName);
		if(pegCountIdOptions.length == 0) {
			pegCountIdOptions = ['None'];
		}
		panelDiv.appendChild(Agnity.createDropDownRowField(pegCountIdOptions,
			inRoutingEngineNodeData.pegCountId, 'pegCountId', function(event) {
				inRoutingEngineNodeData.pegCountId = this.value;
			}));

		let action = Agnity.createDropDownRowField(agnityGlobalData.mappingData.pegCountStaticKeymapping,
			inRoutingEngineNodeData.staticKey, 'staticKey', function(event) {
				inRoutingEngineNodeData.staticKey = this.value;

				if(this.value == "INCREMENT_BY" || this.value == "DECREMENT_BY") {
					self.setupPanel();
				}
			})

		panelDiv.appendChild(action);


		if(inRoutingEngineNodeData.staticKey == "INCREMENT_BY" || inRoutingEngineNodeData.staticKey == "DECREMENT_BY") {
			panelDiv.appendChild(Agnity.createInputTextRowField(inRoutingEngineNodeData.incrementByValue, 'incrementByValue', function(event) {
				inRoutingEngineNodeData.incrementByValue = this.value;
			}));
		} else {
			inRoutingEngineNodeData.incrementByValue = "";
		}
	}
}



Agnity.getApplicationCounterNodePanel = function(inRoutingEngineNodeData) {
	var routingEnginePanel = document.createElement('div');
	routingEnginePanel.setAttribute('id', 'RoutingEngineNodePanel');

	var routingEngineNodePanel = new applicationCounterPanel(routingEnginePanel, inRoutingEngineNodeData);
	routingEngineNodePanel.setupPanel();

	return [routingEnginePanel, inRoutingEngineNodeData];
}

function applicationCounterPanel(panelDiv, inRoutingEngineNodeData) {
	this.routingEngineNodeData = inRoutingEngineNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		panelDiv.appendChild(Agnity.createInputTextRowField(self.routingEngineNodeData.measurementSetNames, 'measurementSetNames', function(event) {
			const RemoveSpace =this.value.replace(/\s*/gm,'');
			inRoutingEngineNodeData.measurementSetNames = RemoveSpace;
			$(this).val(RemoveSpace);
			//self.routingEngineNodeData.measurementSetNames = this.value.replace(/\s*/gm,'');//self.setupPanel();
		}));

		panelDiv.appendChild(Agnity.createInputTextRowField(self.routingEngineNodeData.accumulationInterval, 'accumulationInterval', function(event) {
			inRoutingEngineNodeData.accumulationInterval = this.value;
		}));

		panelDiv.appendChild(Agnity.createButtonRowField('setPegCount', function(event) {
			inRoutingEngineNodeData.ui.actions.get('setPegCount').funct(inRoutingEngineNodeData);
		}));

	}
}

function recreateRoutingEnginePanel(panelDiv, inRoutingEngineNodeData) {
	this.routingEngineNodeData = inRoutingEngineNodeData;
	this.panelDiv = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.panelDiv.innerHTML = '';

		panelDiv.appendChild(Agnity.createDynamicDropDownRowField(new AgnityGetVariablesHelper(Agnity.getTreeData(self.routingEngineNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			self.routingEngineNodeData.planId, 'planId', function(event) {
				self.routingEngineNodeData.planId = this.value;
			}));

		var title = document.createElement('h3');
		mxUtils.write(title, mxResources.get('advanceReHandler'));
		panelDiv.appendChild(title);

		panelDiv.appendChild(Agnity.createCheckboxRowField(self.routingEngineNodeData.advHandlerAll,
			'advHandlerAll', function(event) {
			console.log('Checked : ' + this.checked + ' Value : ' + this.value);
			self.routingEngineNodeData.advHandlerAll = this.checked;
			self.routingEngineNodeData.advHandlerPlay = this.checked;
			self.routingEngineNodeData.advHandlerPlayCollect = this.checked;
			self.routingEngineNodeData.advHandlerPlayDisconnect = this.checked;
			self.setupPanel();
		}));

		panelDiv.appendChild(Agnity.createCheckboxRowField(self.routingEngineNodeData.advHandlerPlay,
			'advHandlerPlay', function(event) {
			self.routingEngineNodeData.advHandlerPlay = this.checked;

			if (!this.checked && self.routingEngineNodeData.advHandlerAll) {
				self.routingEngineNodeData.advHandlerAll = false;
				self.setupPanel();
			}
			else if (self.routingEngineNodeData.advHandlerPlay && self.routingEngineNodeData.advHandlerPlayCollect
				&& self.routingEngineNodeData.advHandlerPlayDisconnect) {
				self.routingEngineNodeData.advHandlerAll = true;
				self.setupPanel();
			}
		}));

		panelDiv.appendChild(Agnity.createCheckboxRowField(self.routingEngineNodeData.advHandlerPlayCollect,
			'advHandlerPlayCollect', function(event) {
			self.routingEngineNodeData.advHandlerPlayCollect = this.checked;

			if (!this.checked && self.routingEngineNodeData.advHandlerAll) {
				self.routingEngineNodeData.advHandlerAll = false;
				self.setupPanel();
			}
			else if (self.routingEngineNodeData.advHandlerPlay && self.routingEngineNodeData.advHandlerPlayCollect
				&& self.routingEngineNodeData.advHandlerPlayDisconnect) {
				self.routingEngineNodeData.advHandlerAll = true;
				self.setupPanel();
			}
		}));

		panelDiv.appendChild(Agnity.createCheckboxRowField(self.routingEngineNodeData.advHandlerPlayDisconnect,
			'advHandlerPlayDisconnect', function(event) {
			self.routingEngineNodeData.advHandlerPlayDisconnect = this.checked;

			if (!this.checked && self.routingEngineNodeData.advHandlerAll) {
				self.routingEngineNodeData.advHandlerAll = false;
				self.setupPanel();
			}
			else if (self.routingEngineNodeData.advHandlerPlay && self.routingEngineNodeData.advHandlerPlayCollect
				&& self.routingEngineNodeData.advHandlerPlayDisconnect) {
				self.routingEngineNodeData.advHandlerAll = true;
				self.setupPanel();
			}
		}));
	}
}

function recreatePlaySpeechNodePropertyPanel(panelDiv, inPlaySpeechNodeData) {
	// this.PlaySpeechNodePanel = inPlaySpeechNodeData;
	this.PlaySpeechNodePanel = panelDiv;

	this.setupPanel = function() {
		var self = this;
		self.PlaySpeechNodePanel.innerHTML = '';

		self.PlaySpeechNodePanel.appendChild(Agnity.createCheckboxRowField(
			inPlaySpeechNodeData.isDropIvrOnCompletion, 'dropIvrOnCompletion', function(event) {
			inPlaySpeechNodeData.isDropIvrOnCompletion = this.checked;
		}));

		self.PlaySpeechNodePanel.appendChild(Agnity.createCheckboxRowField(
			inPlaySpeechNodeData.barge, 'barge', function(event) {
				inPlaySpeechNodeData.barge = this.checked;
			}));

		self.PlaySpeechNodePanel.appendChild(Agnity.createCheckboxRowField(
			inPlaySpeechNodeData.isPlayRequired, 'isPlayRequired', function(event) {
			inPlaySpeechNodeData.isPlayRequired = this.checked;
		}));

		self.PlaySpeechNodePanel.appendChild(Agnity.createCheckboxRowField(
			inPlaySpeechNodeData.isRecordRequired, 'isRecordRequired', function(event) {
			inPlaySpeechNodeData.isRecordRequired = this.checked;
			self.setupPanel();
		}));
		
		self.PlaySpeechNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playSendSpeechLanguageMapping,
				inPlaySpeechNodeData.speechLanguage, 'speechLanguage', function(event) {
				inPlaySpeechNodeData.speechLanguage = this.value;
			}));
		
		if(inPlaySpeechNodeData.isRecordRequired === true) {

			var recordPathSelector = new AgnityDynamicValueSelector(self.PlaySpeechNodePanel, inPlaySpeechNodeData.ui);
			var recordFileSelector = new AgnityDynamicValueSelector(self.PlaySpeechNodePanel, inPlaySpeechNodeData.ui);

			var recordFormat = Agnity.createDropDownRowField(
				agnityGlobalData.mappingData.recordingFormatMapping, inPlaySpeechNodeData.recordingFormat, 'recordingFormat', function() {
				inPlaySpeechNodeData.recordingFormat = this.value;
			});

			var recordingDuration = Agnity.createInputTextRowField(
				inPlaySpeechNodeData.recordingDuration, 'recordingDuration', function(event) {
				inPlaySpeechNodeData.recordingDuration = this.value;
			});

			var recordTerminationKey = Agnity.createDropDownRowField(
				agnityGlobalData.mappingData.recordTerminateKeyMapping, inPlaySpeechNodeData.recordingTerminationKey, 'recordingTerminationKey', function() {
				inPlaySpeechNodeData.recordingTerminationKey = this.value;
			});


			recordPathSelector.setupWidget(inPlaySpeechNodeData.recordingPathType, inPlaySpeechNodeData.recordingPath, 'recordingPath',
				function(value) {
					inPlaySpeechNodeData.recordingPathType = value;
				},
				function(value) {
					inPlaySpeechNodeData.recordingPath = value;
				});


			recordFileSelector.setupWidget(inPlaySpeechNodeData.recordingFileType, inPlaySpeechNodeData.recordingFilename, 'recordingFilename',
				function(value) {
					inPlaySpeechNodeData.recordingFileType = value;
				},
				function(value) {
					inPlaySpeechNodeData.recordingFilename = value;
				});

			self.PlaySpeechNodePanel.appendChild(recordFormat);
			self.PlaySpeechNodePanel.appendChild(recordingDuration);
			self.PlaySpeechNodePanel.appendChild(recordTerminationKey);


		}

		self.PlaySpeechNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playSendModeMapping,
			inPlaySpeechNodeData.sendMode, 'sendMode', function(event) {
			inPlaySpeechNodeData.sendMode = this.value;
		}));

		self.PlaySpeechNodePanel.appendChild(Agnity.createDropDownRowField(agnityGlobalData.mappingData.playConnectionNodeMapping,
			inPlaySpeechNodeData.connectionNode, 'connectionMode', function(event) {
			inPlaySpeechNodeData.connectionNode = this.value;
		}));

		self.PlaySpeechNodePanel.appendChild(Agnity.createDynamicDropDownRowField(
		new AgnityGetVariablesHelper(Agnity.getTreeData(inPlaySpeechNodeData.ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName()),
			inPlaySpeechNodeData.collectedtext, 'collectedText', function(event) {
			inPlaySpeechNodeData.collectedtext = this.value;
		}));
		
		

		self.PlaySpeechNodePanel.appendChild(Agnity.createInputTextRowField(
			inPlaySpeechNodeData.recognitionTime, 'recognitiontime', function(event) {
				inPlaySpeechNodeData.recognitionTime = this.value;
			}));

		self.PlaySpeechNodePanel.appendChild(Agnity.createInputTextRowField(
			inPlaySpeechNodeData.speechComplete, 'speechcomplete', function(event) {
				inPlaySpeechNodeData.speechComplete = this.value;
			}));

		self.PlaySpeechNodePanel.appendChild(Agnity.createButtonRowField('playItem', function(event) {
			inPlaySpeechNodeData.ui.actions.get('playItem').funct(inPlaySpeechNodeData);
		}));



	}
};