Settings = {};
function doInitSettings() {
	var menuList = [
	{ name: 'Domains', load: AgnitySettingDomainTab },
	{ name: 'Users', load: AgnitySettingUsersTab },
	{ name: 'Audit Logs', load: AgnitySettingAuditLogsTab },
	{ name: "Call Trace Files", load: AgnityDebugFileTab },
	{ name: 'Password Policy', load: AgnityDebugPassPolicyTab }];

	var ul = document.createElement('ul');
	ul.setAttribute('id', 'sidebarlist');
	ul.setAttribute('class', 'geSidebar helpsidebar');
	document.getElementById('sidebar').appendChild(ul);

	var lastActiveElement;
	function loadContent(methodeToCall, activeElement) {
		var content = document.getElementById('content');
		content.innerHTML = "";
		methodeToCall(content);
		activeElement.setAttribute('class', 'menu active');

		if (lastActiveElement) {
			lastActiveElement.setAttribute('class', 'menu');
		}

		lastActiveElement = activeElement;
	}

	function renderTab(data, index) {
		var li = document.createElement('li');
		li.setAttribute('class', 'menu');
		li.addEventListener("click", function () {
			loadContent(data.load, li);
		});
		li.innerHTML = '<div class="AgnitySidebarPaletteLabel"><a href="#">' + data.name + '</a></div>';
		ul.appendChild(li);

		if (index == 0) {
			loadContent(data.load, li);
		}

	}

	menuList.forEach(renderTab);
}

function GlobalDialog(editorUi, elt, w, h, modal, closable, onClose, noScroll) {
	var dx = 0;
	editorUi.footerHeight = 20;

	if (mxClient.IS_VML && (document.documentMode == null || document.documentMode < 8)) {
		// Adds padding as a workaround for box model in older IE versions
		// This needs to match the total padding of geDialog in CSS
		dx = 80;
	}

	w += dx;
	h += dx;

	var w0 = w;
	var h0 = h;

	var dh = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	var left = Math.max(1, Math.round((document.body.clientWidth - w - 64) / 2));
	var top = Math.max(1, Math.round((dh - h - editorUi.footerHeight) / 3));

	// Keeps window size inside available space
	if (!mxClient.IS_QUIRKS) {
		elt.style.maxHeight = '100%';
	}

	w = Math.min(w, document.body.scrollWidth - 64);
	h = Math.min(h, dh - 64);

	// Increments zIndex to put subdialogs and background over existing dialogs and background

	this.zIndex = 190;

	if (this.bg == null) {
		this.bg = document.createElement('div');
		this.bg.className = 'background';
		this.bg.style.position = 'absolute';
		this.bg.style.background = 'white';
		this.bg.style.height = dh + 'px';
		this.bg.style.right = '0px';
		this.bg.style.zIndex = this.zIndex - 2;

		mxUtils.setOpacity(this.bg, this.bgOpacity);

		if (mxClient.IS_QUIRKS) {
			new mxDivResizer(this.bg);
		}
	}

	var origin = mxUtils.getDocumentScrollOrigin(document);
	this.bg.style.left = origin.x + 'px';
	this.bg.style.top = origin.y + 'px';
	left += origin.x;
	top += origin.y;

	if (modal) {
		document.body.appendChild(this.bg);
	}

	var div = document.createElement('div');
	div.className = 'geDialog';
	/*	var pos = this.getPosition(left, top, w, h);
		left = pos.x;
		top = pos.y;*/

	div.style.width = w + 'px';
	div.style.height = h + 'px';
	div.style.left = left + 'px';
	div.style.top = top + 'px';
	div.style.zIndex = this.zIndex;

	div.appendChild(elt);
	document.body.appendChild(div);

	// Adds vertical scrollbars if needed
	if (!noScroll && elt.clientHeight > div.clientHeight - 64) {
		elt.style.overflowY = 'auto';
	}

	if (closable) {
		var img = document.createElement('img');

		img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQMAAADaX5RTAAAABlBMVEV7mr3///+wksspAAAAAnRSTlP/AOW3MEoAAAAdSURBVAgdY9jXwCDDwNDRwHCwgeExmASygSL7GgB12QiqNHZZIwAAAABJRU5ErkJggg==');
		img.setAttribute('title', mxResources.get('close'));
		img.className = 'geDialogClose';
		img.style.top = (top + 14) + 'px';
		img.style.left = (left + w + 38 - dx) + 'px';
		img.style.zIndex = this.zIndex;

		mxEvent.addListener(img, 'click', mxUtils.bind(this, function () {
			//			editorUi.hideDialog(true);
			this.close(true);
		}));

		document.body.appendChild(img);
		this.dialogImg = img;

		mxEvent.addGestureListeners(this.bg, null, null, mxUtils.bind(this, function (evt) {
			//			editorUi.hideDialog(true);
			this.close(true);
		}));
	}

	this.resizeListener = mxUtils.bind(this, function () {
		dh = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
		this.bg.style.height = dh + 'px';

		left = Math.max(1, Math.round((document.body.clientWidth - w - 64) / 2));
		top = Math.max(1, Math.round((dh - h - editorUi.footerHeight) / 3));
		w = Math.min(w0, document.body.scrollWidth - 64);
		h = Math.min(h0, dh - 64);

		/*var pos = this.getPosition(left, top, w, h);
		left = pos.x;
		top = pos.y;*/

		div.style.left = left + 'px';
		div.style.top = top + 'px';
		div.style.width = w + 'px';
		div.style.height = h + 'px';

		// Adds vertical scrollbars if needed
		if (!noScroll && elt.clientHeight > div.clientHeight - 64) {
			elt.style.overflowY = 'auto';
		}

		if (this.dialogImg != null) {
			this.dialogImg.style.top = (top + 14) + 'px';
			this.dialogImg.style.left = (left + w + 38 - dx) + 'px';
		}
	});

	mxEvent.addListener(window, 'resize', this.resizeListener);

	this.onDialogClose = onClose;
	this.container = div;

	//	editorUi.editor.fireEvent(new mxEventObject('showDialog'));
};
GlobalDialog.prototype.close = function (cancel) {
	if (this.onDialogClose != null) {
		this.onDialogClose(cancel);
		this.onDialogClose = null;
	}

	if (this.dialogImg != null) {
		this.dialogImg.parentNode.removeChild(this.dialogImg);
		this.dialogImg = null;
	}

	if (this.bg != null && this.bg.parentNode != null) {
		this.bg.parentNode.removeChild(this.bg);
	}

	mxEvent.removeListener(window, 'resize', this.resizeListener);
	this.container.parentNode.removeChild(this.container);
};


Settings.showFormError = function (xhr, height, width) {

	var paarseJSON = function (json) {
		try {
			var result = JSON.parse(json);
			if (result && typeof result === "object") {
				return result;
			}
		}
		catch (e) { }

		return false;
	};

	var response = xhr.responseJSON;
	if (xhr.responseJSON && xhr.responseJSON.errorMessage) {
		response = xhr.responseJSON.errorMessage;

	}

	var jsonRes = paarseJSON(response);
	if (jsonRes) {
		response = "";
		for (var key in jsonRes) {
			var message = jsonRes[key];
			var messageProcessed = mxResources.get(message);
			if (!messageProcessed) {
				messageProcessed = message;
			}
			var label = mxResources.get(key);
			if (label)
				response = label + " : " + messageProcessed;
			else
				response = messageProcessed;
		}
	}

	Settings.showError('critical', ['failedServerResponse', response], height, width);

};


Settings.showError = function (severityResourceId, errorMsg, h, w) {
	this.dialogHelper = new AgnityDialogHelper();

	var stdErrMsgResourceId = '';
	var additionalErrMsg = '';

	var height = h ? h : 300;
	var width = w ? w : 500;

	if (errorMsg != null) {
		stdErrMsgResourceId = errorMsg[0];
		additionalErrMsg = errorMsg[1];
	}
	this.parentDiv = null;
	var self = this;

	this.dialogHelper.setHeading('error');
	this.dialogHelper.setErrorMsgPanel(severityResourceId, stdErrMsgResourceId, additionalErrMsg);

	this.parentDiv = this.dialogHelper.setupContainer();

	new GlobalDialog({}, this.parentDiv, width, height, false, true, null, true);
};

