function AgnityDebugFileTab(contentDom)
{
	var debugDialog = new AgnityApplicationDebuggerDialog(contentDom, true)
	debugDialog.setupContainer();
	contentDom.appendChild(debugDialog.parentDiv);
}
