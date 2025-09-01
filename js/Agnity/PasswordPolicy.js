function AgnityDebugPassPolicyTab(contentDom)
{
	var userDetails = new AgnityGetPassPolicyDetails();
	userDetails.fetchData(function (response) {	
		if (response.length != 0) {
			var settings = new AgnityBuildUserPasswdPolicy(response, contentDom);
			settings.setupContainer();
		}
		else {
			var debugDialog = new AgnityBuildUserPasswdPolicy("",contentDom)
			debugDialog.setupContainer();
			contentDom.appendChild(debugDialog.parentDiv);	}
	});
}
function AgnityBuildUserPasswdPolicy(inUsersList, contentDom) {
	var self = this;
	this.settingsContent = contentDom;
	this.parentDiv = null;
	this.settingsHelper = new AgnityDialogHelper();
	this.userslist = inUsersList;
	this.accessAllDomainsCheckbox = null;
	this.currVal = new AgnitySettingsPasswdPolicy();
	this.currRow = -1;
	this.listModel = null;

	this.setupDetailPanel = function () {
		var self = this;

		this.settingsHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.policyId, 'policyId', function () {
			self.currVal.policyId = this.value;
		}, null, true));

		this.settingsHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowFieldPassPolicy(this.currVal.policyName, 'passpolicyname', function () {
			const removeSpace = this.value.replace(/\s*/gm, '');
			$(this).val(removeSpace);
			self.currVal.policyName = removeSpace;
			self.currVal.policyName = this.value;
		}, null, false, 'Max 20 Chars','Policy Name'));

		this.settingsHelper.addPanelToDetailPageGrid(0, 1, Agnity.createInputTextRowFieldPassPolicy(this.currVal.maxFailAttempts, 'maxFailAttempts', function () {
			self.currVal.maxFailAttempts = this.value;
		}, null, false, 'Limit 0-10','Maximum Fail Attempts'));

		this.settingsHelper.addPanelToDetailPageGrid(0, 2, Agnity.createInputTextRowFieldPassPolicy(this.currVal.passExpDays, 'passExpDays', function () {
			self.currVal.passExpDays = this.value;
		}, null, false, 'Limit 1-90','Password Expiry Days'));

		this.settingsHelper.addPanelToDetailPageGrid(1, 0, Agnity.createInputTextRowFieldPassPolicy(this.currVal.minLength, 'minLength', function () {
			self.currVal.minLength = this.value;
		}, null, false, 'Limit 8-15','Minimum Password Length'));

		this.settingsHelper.addPanelToDetailPageGrid(1, 1, Agnity.createInputTextRowFieldPassPolicy(this.currVal.minDigits, 'minDigits', function () {
			self.currVal.minDigits = this.value;
		}, null, false, 'Limit 0-10','Minimum number of digits in Password'));

		this.settingsHelper.addPanelToDetailPageGrid(1, 2, Agnity.createInputTextRowFieldPassPolicy(this.currVal.minSplChar, 'minSplChar', function () {
			self.currVal.minSplChar = this.value;
		}, null, false, 'Limit 0-10','Minimum number of Special characters in password'));

		this.settingsHelper.addPanelToDetailPageGrid(2, 0, Agnity.createInputTextRowFieldPassPolicy(this.currVal.minUpperChar, 'minUpperChar', function () {
			self.currVal.minUpperChar = this.value;
		}, null, false, 'Limit 0-10','Minimum number of Upper case characters'));

		this.settingsHelper.addPanelToDetailPageGrid(2, 1, Agnity.createInputTextRowFieldPassPolicy(this.currVal.minLowerChar, 'minLowerChar', function () {
			self.currVal.minLowerChar = this.value;
		}, null, false, 'Limit 1-10','Minimum number of Lower case characters'));

		this.settingsHelper.addPanelToDetailPageGrid(2, 2, Agnity.createInputTextRowFieldPassPolicy(this.currVal.numMultLogin, 'numMultLogin', function () {
			self.currVal.numMultLogin = this.value;
		}, null, false, 'Limit 1-10','Number of multiple logins allowed'));

		this.settingsHelper.addPanelToDetailPageGrid(3, 0, Agnity.createInputTextRowFieldPassPolicy(this.currVal.numOldPass, 'numOldPass', function () {
			self.currVal.numOldPass = this.value;
		}, null, false, 'Limit 0-15','Number of old passwords to store'));

		this.settingsHelper.addPanelToDetailPageGrid(3, 1, Agnity.createInputTextRowFieldPassPolicy(this.currVal.minReuseDays, 'minReuseDays', function () {
			self.currVal.minReuseDays = this.value;
		}, null, false, 'Limit 1-90','Minimum days to reuse password'));

		this.settingsHelper.addPanelToDetailPageGrid(3, 2, Agnity.createInputTextRowFieldPassPolicy(this.currVal.suspendFirstLogin, 'suspendFirstLogin', function () {
			self.currVal.suspendFirstLogin = this.value;
		}, null, false, 'Limit 1-90','Suspend login of first time after these many days'));

		this.settingsHelper.addPanelToDetailPageGrid(4, 0, Agnity.createInputTextRowFieldPassPolicy(this.currVal.suspendInactiveAccount, 'suspendInactiveAccount', function () {
			self.currVal.suspendInactiveAccount = this.value;
		}, null, false, 'Limit 1-90','Suspend inactive account after these number of days'));

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
	this.saveCurrVal = function () {
		var errorMsg = this.validateForm();
		if (errorMsg != null && errorMsg != '') {
			Settings.showError('critical', ['failedValidation', errorMsg], 150, 400);
		}
		else {
			var userDetail = JSON.parse(JSON.stringify(this.currVal));
			var userData = new AgnitySaveDataPassPolicyHelper("addEditPasswordPolicy");
			userData.storeData(userDetail, function (res) {
				self.currVal = new AgnitySettingsPasswdPolicy();
				self.currRow = -1;
				self.toggleDomainList(self.currVal.accessAllDoamins);
				self.setupDetailPanel();
				var userDetails = new AgnityGetPassPolicyDetails();
				userDetails.fetchData(function (response) {
					self.userslist = response;
					self.setupListingPanel();
				});
				alert('Added Successfully');
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
			var userData = new AgnitySaveDataPassPolicyHelper("addEditPasswordPolicy");

			userData.storeData(userDetail, function (response) {
				self.toggleDomainList(self.currVal.accessAllDoamins);
				self.currVal = new AgnitySettingsPasswdPolicy();
				self.currRow = -1;
				self.setupDetailPanel();
				var userDetails = new AgnityGetPassPolicyDetails();
				userDetails.fetchData(function (response) {
					self.userslist = response;
					self.setupListingPanel();
				});
				alert('Updated Successfully');
			});
		}
	}
	this.validateForm = function (isUpdate) {
		this.errorMsg = '';
		if (this.currVal.policyName.length >= 1 && this.currVal.policyName.length <= 20 == true) { }
		else {
			this.errorMsg = "The Maximum characters  for Policy Name should be 20";
			return this.errorMsg;
		}
		if (this.currVal.maxFailAttempts.valueOf() >= 0 && this.currVal.maxFailAttempts.valueOf() <= 10) { }
		else {
			this.errorMsg = "The value for maximum number of Failed Attempts should be from  (0-10)";
			return this.errorMsg;
		}
		if (this.currVal.passExpDays.valueOf() >= 1 && this.currVal.passExpDays.valueOf() <= 90) { }
		else {
			this.errorMsg = "The Password Expiry Days can be from 1 to 90";
			return this.errorMsg;
		}
		if (this.currVal.minLength.valueOf() >= 8 && this.currVal.minLength.valueOf() <= 15) { }
		else {
			this.errorMsg = "The Minimum Length of password characters should be from (8-15)";
			return this.errorMsg;
		}
		if (this.currVal.minDigits.valueOf() >= 0 && this.currVal.minDigits.valueOf() <= 10) { }
		else {
			this.errorMsg = "The minimum number of digits in password can be from (0-10)";
			return this.errorMsg;
		}
		if (this.currVal.minSplChar.valueOf() >= 0 && this.currVal.minSplChar.valueOf() <= 10) { }
		else {
			this.errorMsg = "The number of special characters in Passwrod can be from (0-10)";
			return this.errorMsg;
		}
		if (this.currVal.minUpperChar.valueOf() >= 0 && this.currVal.minUpperChar.valueOf() <= 10) { }
		else {
			this.errorMsg = "The number of Upper case characters in Password be from (0-10)";
			return this.errorMsg;
		}
		if (this.currVal.minLowerChar.valueOf() >= 1 && this.currVal.minLowerChar.valueOf() <= 10) { }
		else {
			this.errorMsg = "The number of Lower case characters in Password be from (1-10)";
			return this.errorMsg;
		}
		if (this.currVal.numMultLogin.valueOf() >= 1 && this.currVal.numMultLogin.valueOf() <= 10) { }
		else {
			this.errorMsg = "The number of multiple logins can be from (1-10)";
			return this.errorMsg;
		}
		if (this.currVal.numOldPass.valueOf() >= 0 && this.currVal.numOldPass.valueOf() <= 15) { }
		else {
			this.errorMsg = "The number of Old Passwords to store can be from (0-15)";
			return this.errorMsg;
		}
		if (this.currVal.minReuseDays.valueOf() >= 1 && this.currVal.minReuseDays.valueOf() <= 90) { }
		else {
			this.errorMsg = "The minimum number of days for Password reuse can be from(1-90)";
			return this.errorMsg;
		}
		if (this.currVal.suspendFirstLogin.valueOf() >= 1 && this.currVal.suspendFirstLogin.valueOf() <= 90) { }
		else {
			this.errorMsg = "The number of days to suspend inactive FirstLogin can be from (1-90)";
			return this.errorMsg;
		}
		if (this.currVal.suspendInactiveAccount.valueOf() >= 1 && this.currVal.suspendInactiveAccount.valueOf() <= 90) { }
		else {
			this.errorMsg = "The maximum number of days to suspend InactiveAccount can be from (0-90)";
			return this.errorMsg;
		}
		this.errorMsg = "";
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

	this.setupListingPanel = function () {
		var self = this;
		this.isAdminMapping = { 'true': 'Yes', 'false': 'No' };
		if (this.userslist.values!="" ){
			this.listModel = new AgnityDialogListingModel(this.userslist, ['policyName', 'maxFailAttempts', 'passExpDays', 'minLength', 'minDigits', 'minSplChar', 'minUpperChar', 'minLowerChar', 'numMultLogin', 'numOldPass', 'minReuseDays', 'suspendFirstLogin', 'suspendInactiveAccount']);
		}

		this.settingsHelper.listActions = [['load', 'geSprite-insert'], ['delete', 'geSprite-delete']];
		this.settingsHelper.setRelatedListing([{ 'name': 'policyName', 'width': '13%' }, { 'name': 'maxFailAttempts', 'width': '20%' }, { 'name': 'passExpDays', 'width': '13%' }, { 'name': 'minLength', 'width': '13%' }, { 'name': 'minDigits', 'width': '13%' }, { 'name': 'minSplChar', 'width': '13%' }, { 'name': 'minUpperChar', 'width': '13%' }, { 'name': 'minLowerChar', 'width': '13%' }, { 'name': 'numMultLogin', 'width': '13%' }, { 'name': 'numOldPass', 'width': '13%' }, { 'name': 'minReuseDays', 'width': '13%' }, { 'name': 'suspendFirstLogin', 'width': '13%' }, { 'name': 'suspendInactiveAccount', 'width': '13%' }, { 'name': 'action', 'width': '12%' }], this.listModel, this.onListAction.bind(this));
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
			this.setupDetailPanel();

			this.settingsHelper.addPanelToDetailPageGrid(0, 0, Agnity.createInputTextRowField(this.currVal.policyName, 'passpolicyname', function () {
				self.currVal.policyName = this.value;
			}, true, true));
		}
		else if (action == 'delete') {
			let user = JSON.parse(JSON.stringify(entry));
			let isExecuted = confirm("Are you sure to delete user " + user.policyName + "?");
			if (isExecuted) {
				var deleteUser = new AgnityDeletePolicyDetails();
				deleteUser.deleteData(JSON.parse(JSON.stringify(entry.policyId)), function (response) {
					var userDetails = new AgnityGetPassPolicyDetails();
					userDetails.fetchData(function (response) {
						self.userslist = response;
						self.setupListingPanel();
					});
					alert(response.message);
				});
				this.setupListingPanel();
				this.currRow = -1;
			}
		}
	}
	this.setupContainer = function () {
		var self = this;

		this.settingsHelper.setHeading('passwordPolicy');
		this.settingsHelper.setDetailPageGrid(5, 3);
		this.setupDetailPanel();
	 	this.setupListingPanel();

		this.parentDiv = this.settingsHelper.setupContainer();
		this.parentDiv.classList.add('PasswordPolicyParent');
		this.settingsContent.appendChild(this.parentDiv);
	}
}