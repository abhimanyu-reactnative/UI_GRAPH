var Validator = {
	// Common regex pattern for password, name, id fields
	passwordRegex: /^(?! )[A-Za-z0-9!@#$%^&*()]*(?<! )$/,
	textFieldRegex: /[a-zA-Z0-9]+/,
	
	isMatchRegularExp: function(exp, value)
	{
		if(value != null && value != '')
	    {
	        if(!exp.test(value))
	        {
		          return false;
	        }
	    }
		return true;
	},
	
	showErrorMessage: function(msg)
	{
		 var errorCard = document.getElementById('errorCard');
		 errorCard.classList.remove('successCard');
		 errorCard.classList.add('errorCard');
		 errorCard.style.display = 'flex';

		if( msg.includes('[') || msg.includes(']') || msg.includes('[') && msg.includes(']') )
		{
			msg = msg.replace('[','');
			msg = msg.replace(']','');
			
		}		
		var errorLines = msg.split(".,");
		
		var errorTextDiv = document.getElementById('errorText');
  		errorTextDiv.innerHTML = '';  

		for(var i = 0; i < errorLines.length; i++){
			var errorLine = errorLines[i].trim();
			var errorLineElement = document.createElement('span');
			errorLineElement.textContent = errorLine.trim();
			console.log("errorLine-> "+errorLine);
			errorTextDiv.appendChild(errorLineElement);

			if (i !== errorLines.length - 1) {
				var lineBreakElement = document.createElement('br');
				errorTextDiv.appendChild(lineBreakElement);
			}
		}

		//document.getElementById('errorText').textContent = msg;
	},
    showSuccessMessage: function(msg)
	{
		var errorCard = document.getElementById('errorCard');
		errorCard.classList.remove('errorCard');
		errorCard.classList.add('successCard');
		errorCard.style.display = 'flex';
		 
		console.log("error msg = > "+msg);


		document.getElementById('errorText').textContent = msg;
	},
	
	checkEmpty: function(text_value, fieldType)
	{
	    if(text_value == undefined || text_value == null || text_value.trim() === "")
	    {
	    	return (fieldType + " " + mxResources.get('emptyFieldErrorMsg'));
	    }
	    return null;
	},
	compareOldPassword: function(value,password)
	{
		if(value === password)
		{
			return (mxResources.get('oldPasswordNotMatch'));
		}
		return null;
	},
	comparePassword: function(password,confirmPassword)
	{
		if(password != confirmPassword)
		{
			return (mxResources.get('passwordNotMatch'));
		}
		return null;
		
	},
	
	 validateField: function(textValue, fieldType,  minLength, regexPattern, regexErrorMessage)
		{
			var errorTxt = '';
			var minLength = minLength ? minLength : 2;
			var defaultPattern = (regexPattern) ? regexPattern : /[a-zA-Z0-9]+/;
			var regexErrorMsg = (regexErrorMessage) ? regexErrorMessage: mxResources.get('regexErrorMsg');
			
			errorTxt = Validator.checkEmpty(textValue,fieldType);
			if(errorTxt != null)
			{
				return errorTxt;
			}
			
			if(minLength!= undefined && minLength!= null )
			{
				if(textValue.length < minLength)
				{
					return (fieldType +" : " + mxResources.get("minLengthError") + minLength + ".");
				}
			}	
			if(!Validator.isMatchRegularExp(defaultPattern,textValue))
			{
				if(regexErrorMessage != null && regexErrorMessage != undefined)
				{
					return (fieldType +" : " + regexErrorMessage);
				}
				else
				{
					return (fieldType +" : " + regexErrorMsg);
				}
			}
			return null;
		}
	}