function ChangePasswordController(userObject)
{
	var self = this; 
	this.firstLogin = userObject.passwordChangeRequired;
	this.userId = userObject.userId;
	
	//console.log(JSON.stringify(userObject));

	this.init = function()
	{
		this.getChangePasswordForm();
	}
	this.setVersionInfo = function(versionInfo)
	{
		//console.log('versionInfo ->'+versionInfo);
		document.getElementById('title').textContent += versionInfo;
	}
	this.getChangePasswordForm = function()
	{
		 this.changePasswordFormContainer = document.getElementById('changePasswordFormContainer');
		 this.loginCard = document.createElement('div');
		 this.loginCard.setAttribute('class','loginCard');
		 this.changePasswordForm = document.createElement('form');
		 this.changePasswordForm.setAttribute('id','ChangePasswordForm');
		 this.changePasswordForm.classList.add('form-data');
		 
		 this.error = Agnity.createErrorMessageCard('',function(){
			 var errorCard = document.getElementById('errorCard');
			 if(errorCard.style.display === 'flex')
			 {
				 errorCard.style.display = 'none';
		   	 }
		 });
		 
		 this.idDiv = Agnity.createInputTextRowField(this.userId,'loginId', null, null, false);
		 var id = this.idDiv.getElementsByClassName('AgnityTextFieldClass');
		 id[0].setAttribute('name','id');
		 id[0].setAttribute('readonly','');
		 this.changePasswordForm.appendChild(this.idDiv);
		 
		 if(!this.firstLogin)
		 {
			 this.changePasswordForm.appendChild(Agnity.createInputPasswordRowField('','oldpassword',null, null, false));
		 }
		 this.changePasswordForm.appendChild(Agnity.createInputPasswordRowField('','newpassword',null, null, false));
		 this.changePasswordForm.appendChild(Agnity.createInputPasswordRowField('','confirmpassword', null, null, false));
//		 this.changePasswordForm.appendChild(Agnity.createCheckboxRowField('','remember', null, false));
		  
		 this.buttonDiv = Agnity.createButtonRowField('changePassword',self.validateForm);
		 var button = this.buttonDiv.getElementsByClassName('AgnityFieldRowButtonClass');
		 button[0].setAttribute('type','button');
		 button[0].setAttribute('id','changePassword');

		 this.buttonDiv.setAttribute('class','ChangePassword');
		 button[0].setAttribute('class','AgnityFieldRowButtonClass ChangePasswordButton');

		 this.wrapper = document.createElement('div');
		 this.wrapper.classList.add('buttonWrapper');
			 
	     if(this.firstLogin)
		 {
			 this.backButtonDiv = Agnity.createButtonRowField('back',self.backToLogin);
		 }
		 else 
		 {
			 this.backButtonDiv = Agnity.createButtonRowField('back',self.gotoApp);		  	 	
		 }	

		 var button = this.backButtonDiv.getElementsByClassName('AgnityFieldRowButtonClass');
		 button[0].setAttribute('type','button');
		 button[0].setAttribute('id','back');
  		 this.backButtonDiv.setAttribute('class','ChangePasswordback');

		 this.wrapper.appendChild(this.buttonDiv);
		 this.wrapper.appendChild(this.backButtonDiv);
		 this.changePasswordForm.appendChild(this.wrapper);
		 if(this.firstLogin) 
		 {
		 	this.loginCard.setAttribute('class','loginCard UserFirstTimeChanagePassword');		 	
		 }else
		 {
		 	this.loginCard.setAttribute('class','loginCard UserChanagePassword');
		 }
		 
		 this.loginCard.appendChild(this.error);
		 this.loginCard.appendChild(this.changePasswordForm);
		 this.changePasswordFormContainer.appendChild(this.loginCard);
	}
	
	this.backToLogin = function(event)
	{
		Agnity.clearLocalStorage();
		Agnity.doRedirect('./Login.html');
	}
	
	this.gotoApp = function(event)
	{
		Agnity.doRedirect('./ApplicationBuilder.html');
	}
	
	this.validateForm = function(event)
	{
		var data = $("#ChangePasswordForm").serializeArray();
		if(!self.firstLogin)
		{
			var id = data[0].value;
			var currentpassword = data[1].value;
			var newpassword = data[2].value;
			var confirmpassword = data[3].value;
		}
		else
		{
			var id = data[0].value;
			var newpassword = data[1].value;
			var confirmpassword = data[2].value;
		}
		
	    var errorMsg = "";
	    if(!self.firstLogin)
	    {
	    	
	    	errorMsg = Validator.validateField(currentpassword,mxResources.get('oldpassword'));
		    if(errorMsg != null)
		    {
				//console.log(errorMsg);
		        Validator.showErrorMessage(errorMsg);
		    	return;
		    }
		    
		    errorMsg = Validator.compareOldPassword(newpassword, currentpassword);
		    if(errorMsg != null)
		    {
				//console.log(errorMsg);
		        Validator.showErrorMessage(errorMsg);
		    	return;
		    }
	    }

		if( self.firstLogin )
		{
			//console.log('fisrt login errMsg->'+errorMsg);
			
			errorMsg = Validator.comparePassword(newpassword,confirmpassword);
			//console.log('fisrt login errMsg->'+errorMsg);
			
			if(errorMsg != null)
		    {
				//console.log(errorMsg);
		        Validator.showErrorMessage(errorMsg);
		    	return;
		    }
			
			//console.log('.'+errorMsg+'.');

			var update = new AgnityUpdateUserPassword();
			//console.log('.'+update+'.');

	    	update.storeData(newpassword ,confirmpassword,function(){
	    		Validator.showSuccessMessage(mxResources.get('changePasswordSuccess'));
	    		if(self.firstLogin)
	    		{
	    			Agnity.clearLocalStorage();
					console.log('inside clear local str');

	    		}
	    		Agnity.doRedirect('./ApplicationBuilder.html');
	    		
	   		},function(xhr){
				//console.log('fail response');
	   			Validator.showErrorMessage(xhr.responseJSON.errorMessage);
	   		});
			
		}
		
		//console.log('type Error msg '+typeof(errorMsg));
	    //console.log('.'+errorMsg+'.');	    
	    //errorMsg = Validator.validateField(newpassword, mxResources.get('newpassword'), 4, Validator.passwordRegex, mxResources.get('regexErrorForPassword'));
	    if(errorMsg != null)
	    {
			//console.log(errorMsg);
	        Validator.showErrorMessage(errorMsg);
	    	return;
	    }
	    errorMsg = Validator.validateField(confirmpassword,mxResources.get('confirmpassword'));
	    if(errorMsg != null)
	    {
			//console.log(errorMsg);
	        Validator.showErrorMessage(errorMsg);
	    	return;
	    }
	    errorMsg = Validator.comparePassword(newpassword,confirmpassword);
	    if(errorMsg != null)
	    {
			//console.log(errorMsg);
	        Validator.showErrorMessage(errorMsg);
	    	return;
	    }
	    
	    if(errorMsg == null || errorMsg == "")
	    {
	    	var update = new AgnityUpdateUserPassword();
	    	update.storeData(currentpassword,newpassword ,function(){
	    		Validator.showSuccessMessage(mxResources.get('changePasswordSuccess'));
	    		if(!self.firstLogin)
	    		{
	    			Agnity.clearLocalStorage();
	    		}
	    		Agnity.doRedirect('./ApplicationBuilder.html');
	    		
	   		},function(xhr){
	   			Validator.showErrorMessage(xhr.responseJSON.errorMessage);
	   		});
	    }
	}
}
