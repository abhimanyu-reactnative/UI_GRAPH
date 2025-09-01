function AgnitySettingUsersTab(contentDom) {
	var userDetails = new AgnityGetUserDetails();
	userDetails.fetchData(function (response) {
		if (response.length != 0) {
			var settings = new AgnityBuildUserDetailsPage(response, contentDom);
			settings.setupContainer();
		}
		else {
			var dlg = alert('info', ['emptyCasServersData', mxResources.get('casNotConfiguredError')]);
		}
	});
}
function AgnityBuildUserDetailsPage(inUsersList, contentDom) {
	var self = this;
	this.settingsContent = contentDom;
	this.parentDiv = null;
	this.settingsHelper = new AgnityDialogHelper();
	this.userslist = inUsersList[1];
	this.availableDomainsList = inUsersList[0];
	this.accessAllDomainsCheckbox = null;

	this.currVal = new AgnitySettingsData([]);
	this.currRow = -1;
	this.listModel = null;

	this.passwdpolicymap = new Map();
	const agnitygetpasspolicyhelper = new AgnityGetPassPolicyHelper();
	agnitygetpasspolicyhelper.fetchData((response) => {
		response.forEach((val) => {
			var keyitem = val.policyId;
			this.passwdpolicymap.set(keyitem, val.policyName);
		})
		this.setupListingPanel();
	})
	this.setupDetailPanel = function () {
		var self = this;

		this.settingsHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.loginId, 'loginId', function () {
			self.currVal.loginId = this.value;
		}, null, false));

		this.settingsHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputPasswordRowField(this.currVal.password, 'password', function () {
			self.currVal.password = this.value;
		}, null, false));

		this.settingsHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowField(this.currVal.name, 'name', function () {
			self.currVal.name = this.value;
		}, null, false));
		this.settingsHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputPasswordRowField(this.currVal.confirmPassword, 'confirmPassword', function () {
			self.currVal.confirmPassword = this.value;
		}, null, false));

		self.accessAllDomainsCheckbox = Agnity.createCheckboxRowField(this.currVal.accessAllDomains, 'accessAllDomains', function () {
			self.currVal.accessAllDomains = this.checked;
			self.toggleDomainList(this.checked);
		}, false);
		this.settingsHelper.addPanelToDetailPageGrid(3, 0, self.accessAllDomainsCheckbox);

		this.settingsHelper.addPanelToDetailPageGrid(2, 0, Agnity.createCheckboxRowField(this.currVal.adminUser, 'isAdmin', function () {
			self.currVal.adminUser = this.checked;
			self.currVal.accessAllDomains = this.checked;
			self.toggleAccessAllDomains(this.checked);
			self.toggleDomainList(this.checked);
		}, false));

		this.settingsHelper.addPanelToDetailPageGrid(2, 1, Agnity.createDropDownRowField(['ACTIVE', 'INACTIVE', 'LOCKED'], this.currVal.status, 'status', function () {
			self.currVal.status = this.value;
		}, false));
		this.settingsHelper.addPanelToDetailPageGrid(3, 1, Agnity.createDynamicDropDownRowField(agnitygetpasspolicyhelper,
			self.currVal.policyId, 'passwordPolicy', function (event) {
				self.currVal.policyId = this.value;
			}, null, false, false));
		// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>				
		if (!self.currVal.accessAllDomains) {
			this.settingsHelper.addPanelToDetailPageGrid(0, 2, Agnity.createBSMultiSelectBox(this.availableDomainsList, this.currVal.accessibleDomainList, 'accessibleDomainList', function (selection) {
				self.currVal.accessibleDomainList = selection;
			}), 4);
		}


		if (this.currRow == -1) {
			this.settingsHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function () {
					self.saveCurrVal();
				}
			}]);
		}
		else {
			this.settingsHelper.setDetailPageActions([{
				'name': 'addNew', 'func': function () {
					self.saveCurrVal();
				}
			}, {
				'name': 'update', 'func': function () {
					self.updateCurrVal();
				}
			}]);
		}
	}

	this.toggleAccessAllDomains = function (value) {
		self.accessAllDomainsCheckbox.childNodes[1].childNodes[0].checked = value;
		self.accessAllDomainsCheckbox.childNodes[1].childNodes[0].disabled = value;
	}

	this.setSelectedDomainList = function () {
		var list = $('#accessibleDomainList').find(":selected");
		var multipleOptions = [];
		if (this.currVal.accessAllDomains) {
			multipleOptions.push('All');
		}
		else {
			for (var idx = 0; idx < list.length; idx++) {
				multipleOptions.push(list[idx].label);
			}
		}
		this.currVal.accessibleDomainList = multipleOptions;
	}
	this.saveCurrVal = function () {
		var errorMsg = this.validateForm();
		if (errorMsg != null && errorMsg != '') {
			Settings.showError('critical', ['failedValidation', errorMsg], 150, 400);
		}
		else {
			var userDetail = JSON.parse(JSON.stringify(this.currVal));
			delete userDetail.confirmPassword;
			userDetail.id = 0;
			var userData = new AgnitySaveUserDetails('addUser');
			userData.storeData(userDetail, function (res) {
				self.currVal = new AgnitySettingsData([]);
				self.currRow = -1;
				self.toggleDomainList(self.currVal.accessAllDoamins);
				self.setupDetailPanel();
				var userDetails = new AgnityGetUserDetails();
				userDetails.fetchData(function (response) {
					self.userslist = response[1];
					self.setupListingPanel();
				});
			});
		}
	}

	this.updateCurrVal = function () {
		var errorMsg = this.validateForm(true);
		if (errorMsg != null && errorMsg != '') {
			Settings.showError('critical', ['failedValidation', errorMsg], 150, 400);
		}
		else {
			var userDetail = JSON.parse(JSON.stringify(this.currVal));
			delete userDetail.confirmPassword;
			var userData = new AgnitySaveUserDetails("modifyUser");
			userData.storeData(userDetail, function (response) {
				self.toggleDomainList(self.currVal.accessAllDoamins);
				self.currVal = new AgnitySettingsData([]);
				self.currRow = -1;
				self.setupDetailPanel();
				var userDetails = new AgnityGetUserDetails();
				userDetails.fetchData(function (response) {
					self.userslist = response[1];
					self.setupListingPanel();
				});
			});
		}
	}
	this.validateForm = function (isUpdate) {
		this.errorMsg = '';
		this.errorMsg = Validator.validateField(this.currVal.loginId, mxResources.get('loginId'), 4, Validator.textFieldRegex, mxResources.get('loginIdRegexErrorMsg'));
		if (this.errorMsg != null) {
			return this.errorMsg;
		}

		this.errorMsg = Validator.validateField(this.currVal.name, mxResources.get('name'), 2, Validator.textFieldRegex, mxResources.get('loginIdRegexErrorMsg'));
		if (this.errorMsg != null) {
			return this.errorMsg;
		}
		if (!isUpdate || this.currVal.password != '') {
			this.errorMsg = Validator.validateField(this.currVal.password, mxResources.get('password'), 4, Validator.passwordRegex, mxResources.get('regexErrorForPassword'));
			if (this.errorMsg != null) {
				return this.errorMsg;
			}

			this.errorMsg = Validator.validateField(this.currVal.confirmPassword, mxResources.get('confirmPassword'));
			if (this.errorMsg != null) {
				return this.errorMsg;
			}
			this.errorMsg = Validator.comparePassword(this.currVal.password, this.currVal.confirmPassword);
			if (this.errorMsg != null) {
				return this.errorMsg;;
			}
		}
		return this.errorMsg;
	}
	this.toggleDomainList = function (checked) {
		var domainList = document.querySelector('table > tr > td:last-child');
		if (checked) {
			domainList.style.display = 'none';
		}
		else {
			domainList.style.display = 'table-cell';
		}
	}

	this.accessibleDomainListFormatter = function (value, user) {
		if (user.accessAllDomains) {
			return "ALL";
		}
		else {
			return value;
		}
	}
	this.getPolicyName = function (value) {
		console.log("policyId",value)
		if ( value ){
			return this.passwdpolicymap.get(value.toString());
		}
		else {
			value = "N/A"
			return value;
		}
	}
	this.setupListingPanel = function () {
		var self = this;
		this.isAdminMapping = { 'true': 'Yes', 'false': 'No' };
		this.listModel = new AgnityDialogListingModel(this.userslist, ['loginId', 'name', { 'head': 'accessibleDomainList', 'type': 'html', 'formatter': this.accessibleDomainListFormatter }, { 'head': 'adminUser', 'type': 'html', 'value': this.isAdminMapping }, { 'head': 'createdOn', 'type': 'html', 'formatter': function (value) { return Agnity.dateFormatter(value) } }, { 'head': 'lastlogin', 'type': 'html', 'formatter': function (value) { return Agnity.dateFormatter(value) } }, 'status', { 'head': 'policyId', 'type': 'html', 'formatter': this.getPolicyName.bind(this) }]);
		this.settingsHelper.listActions = [['load', 'geSprite-insert'], ['delete', 'geSprite-delete'], ['unlock', 'geSprite-unlock']];
		this.settingsHelper.setRelatedListing([{ 'name': 'loginId', 'width': '13%' }, { 'name': 'name', 'width': '13%' }, { 'name': 'accessibleDomainList', 'width': '20%' }, { 'name': 'adminPriviliges', 'width': '13%' }, { 'name': 'createdOn', 'width': '20%' }, { 'name': 'lastlogin', 'width': '20%' }, { 'name': 'status', 'width': '10%' }, { 'name': 'passwordPolicy', 'width': '20%' }, { 'name': 'action', 'width': '10%' }], this.listModel, this.onListAction.bind(this)); //, self.filterListAction.bind(self)
	}

	this.filterListAction = function (listActions, userInfo) {
		var status = userInfo.status.toLowerCase();
		var ret = new Array();
		ret.push(listActions[0]);
		ret.push(listActions[1]);
		if (status == 'locked') {
			ret.push(listActions[2]);
		}
		return ret;
	}

	this.onListAction = function (action, row) {
		var entry = this.listModel.values[row];
		this.currRow = row;

		if (action == 'load') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			this.currVal.password = '';
			this.setupDetailPanel();
			if (this.currVal.adminUser) {
				this.toggleAccessAllDomains(this.currVal.adminUser);
			}
			this.toggleDomainList(this.currVal.accessAllDomains);
		}
		else if (action == 'delete') {
			let user = JSON.parse(JSON.stringify(entry));
			let isExecuted = confirm("Are you sure to delete user " + user.name + "?");
			if (isExecuted) {
				var deleteUser = new AgnityDeleteUserDetails();
				deleteUser.deleteData(JSON.parse(JSON.stringify(entry.id)), function (response) {
					var userDetails = new AgnityGetUserDetails();
					userDetails.fetchData(function (response) {
						self.userslist = response[1];
						self.setupListingPanel();
					});
				});
				this.setupListingPanel();
				this.currRow = -1;
			}
		}
		else if (action == 'unlock') {
			this.currVal = JSON.parse(JSON.stringify(entry));
			let isExecuted = confirm("Are you sure to force unlock user: " + this.currVal.name + "?");
			if (isExecuted) {
				if (this.currVal.status == 'LOCKED') {
					var unlock = new AgnityUnlockUser();
					unlock.unlockUser(this.currVal.loginId, function () {

						var userDetails = new AgnityGetUserDetails();
						userDetails.fetchData(function (response) {
							self.userslist = response[1];
							self.setupListingPanel();
						});
					});
				}
				else {
					Settings.showError('critical', ['failedUnlockUser', ''], 150, 400);
				}
			}
		}
	}
	this.setupContainer = function () {
		var self = this;
		this.settingsHelper.setHeading('Userlist');
		this.settingsHelper.setDetailPageGrid(4, 3);
		this.setupDetailPanel();
		this.setupListingPanel();
		this.parentDiv = this.settingsHelper.setupContainer();
		this.parentDiv.classList.add('UserSettingsParent');
		this.settingsContent.appendChild(this.parentDiv);
	}
}