function LoginController()
{
	var self = this;
	
	this.init = function(versionInfo)
	{
		this.getLoginForm();
		//this.setVersionInfo(versionInfo);
	}
	this.setVersionInfo = function(versionInfo)
	{
		document.getElementById('title').textContent += versionInfo;
	}
	this.getLoginForm = function()
	{
		 this.loginFormContainer = document.getElementById('loginFormContainer');
		 this.loginCard = document.createElement('div');
		 this.loginCard.setAttribute('class','loginCard');
		 this.loginForm = document.createElement('form');
		 this.loginForm.setAttribute('id','LoginForm');
		 this.loginForm.setAttribute('name','LoginForm');
		 this.loginForm.classList.add('form-data');
	
		 this.loginIcon = document.createElement('img');
		 this.loginIcon.setAttribute('src','../themes/default/images/Agnity/loginIcon.png');
		 this.loginIcon.setAttribute('class','rounded-circle LoginLock');
		 this.loginCard.appendChild(this.loginIcon);
		 
		 this.error = Agnity.createErrorMessageCard('',function(){
			 var errorCard = document.getElementById('errorCard');
			 if(errorCard.style.display === 'flex')
			 {
				 errorCard.style.display = 'none';
		   	 }
		 });
		 
		 this.idDiv = Agnity.createInputTextRowField('','loginId', null, null, false);

		 this.passwordDiv = Agnity.createInputPasswordRowField('','password', null, null, false);
		 
		 
		 this.buttonDiv = Agnity.createButtonRowField('loginbtn',self.validateForm);
		 var button = this.buttonDiv.getElementsByClassName('AgnityFieldRowButtonClass');
		 button[0].setAttribute('type','button');
		 button[0].setAttribute('id','loginbtn');
		 
		 this.loginForm.appendChild(this.idDiv);
		 this.loginForm.appendChild(this.passwordDiv);
		 this.loginForm.appendChild(this.buttonDiv);
		 this.loginCard.appendChild(this.error);
		 this.loginCard.appendChild(this.loginForm);
		 this.loginFormContainer.appendChild(this.loginCard);
	}
	this.validateForm = function(event)
	{
		var data = $("#LoginForm").serializeArray();
		var id = data[0].value;
		var password = data[1].value;
	    var errorMsg = "";
	
	    errorMsg = Validator.validateField(id,mxResources.get('loginId'),4 , Validator.textFieldRegex,mxResources.get('loginIdRegexErrorMsg'));
	    if(errorMsg != null)
	    {
	    	Validator.showErrorMessage(errorMsg);
	    	return;
	    }
	    
	    errorMsg = Validator.validateField(password,mxResources.get('password'));
	    if(errorMsg != null)
	    {
	        Validator.showErrorMessage(errorMsg);
	    	return;
	    }
	    
	    if(errorMsg == null || errorMsg == "")
	    {
	    	var login = new AgnityLogin();
	    	login.doLogin(id,password,function(response){
	    		console.log("Logging in as " + id);
	    		Agnity.setLocalStorage('user',response.user);
	    		if(Agnity.getLocalStorage('user').passwordChangeRequired)
		    	{   
	    			Agnity.doRedirect("./ChangePassword.html");
		    	}
	    		else
	    		{
	    			event.preventDefault();
					Agnity.doRedirect("./ApplicationBuilder.html");	
	    		}
	    	},function(xhr){
	    		Validator.showErrorMessage(xhr.responseJSON.errorMessage);
	    	});
	    	
	    }	
	}
}