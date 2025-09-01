Agnity.createFieldRow = function()
{
	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');

	var labelHolder = document.createElement('div');
	labelHolder.setAttribute('class', 'AgnityFieldRowLabelHolder');

	var fieldHolder = document.createElement('div');
	fieldHolder.setAttribute('class', 'AgnityFieldRowFieldHolder');

	rowDiv.appendChild(labelHolder);
	rowDiv.appendChild(fieldHolder);

	return [ rowDiv, labelHolder, fieldHolder ];
};

Agnity.createSelectFieldRow = function()
{
	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');

	var fieldHolder = document.createElement('div');
	fieldHolder.setAttribute('class', 'AgnitySelectFieldRowFieldHolder');
	
	rowDiv.appendChild(fieldHolder);

	return [ rowDiv, fieldHolder ];
}

Agnity.displayTextInfo = function(infoData)
{
	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');
	
	var textHolder = document.createElement('p');
	textHolder.setAttribute('class', 'AgnityTextInfo');
	mxUtils.write(textHolder, infoData);
	
	rowDiv.appendChild(textHolder);
	
	return rowDiv;
}

Agnity.createAddRemoveSelectedItemsRowField = function(addBtnClickHandler, removeBtnClickHandler)
{
	var rowHolder = document.createElement('div');
	rowHolder.setAttribute('class', 'AgnityFieldRow');
	
	var addRowDiv = document.createElement('div');
	addRowDiv.setAttribute('class', 'AgnityFieldRow');
	rowHolder.appendChild(addRowDiv);
	
	var addButtonField = document.createElement('button');
	addButtonField.setAttribute('class', 'AgnityAddSelectedItem');
	addButtonField.setAttribute('title', mxResources.get('addItem'));
	mxUtils.write(addButtonField, mxResources.get('add'));
	addRowDiv.appendChild(addButtonField);
	
	var removeRowDiv = document.createElement('div');
	removeRowDiv.setAttribute('class', 'AgnityFieldRow');
	rowHolder.appendChild(removeRowDiv);
	
	var removeButtonField = document.createElement('button');
	removeButtonField.setAttribute('class', 'AgnityRemoveSelectedItem');
	removeButtonField.setAttribute('title', mxResources.get('removeItem'));
	mxUtils.write(removeButtonField, mxResources.get('remove'));
	removeRowDiv.appendChild(removeButtonField);
	
	mxEvent.addListener(addButtonField, 'click', addBtnClickHandler);
	mxEvent.addListener(removeButtonField, 'click', removeBtnClickHandler);
	
	return rowHolder;
}

Agnity.createButtonRowField = function(resourceTxt, onClickHandler)
{
	var buttonName = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');

	var buttonField = mxUtils
			.button(buttonName, mxUtils.bind(this, onClickHandler));
	buttonField.setAttribute('class', 'AgnityFieldRowButtonClass');
	buttonField.setAttribute('title', helpTextVal);

	rowDiv.appendChild(buttonField);

	return rowDiv;
};

Agnity.removeRowFieldDisabled = function(rowField)
{
	$(rowField).find('.AgnityDisableIcon').removeClass('AgnityDisableIcon');
}

Agnity.createHelpLinkRow = function(resourceTxt, onClickHandler)
{
	var link = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');

	var linkRow = document.createElement('a');
	linkRow.textContent = link;
	linkRow.setAttribute('title', helpTextVal);
	linkRow.setAttribute('class', 'AgnityHelpHyperLink');
	mxEvent.addListener(linkRow, 'click', onClickHandler);

	rowDiv.appendChild(linkRow);

	return rowDiv;
}

Agnity.createRadioButtonRowField = function(radioOptions, checkedVal,
											name, onChangeHandler, autoSaveInfo)
{

	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');

	for(idx = 0; idx < radioOptions.length; idx++)
	{
		var optionDiv = document.createElement('div');
		optionDiv.setAttribute('class', 'AgnityRadioButtonFieldRow');

		var agnityRadioBtn = document.createElement('input');
		agnityRadioBtn.setAttribute('type', 'radio');
		agnityRadioBtn.setAttribute('name', name);
		agnityRadioBtn.setAttribute('value', radioOptions[idx][1]);

		if(checkedVal != null && radioOptions[idx][1] == checkedVal)
		{
			agnityRadioBtn.setAttribute('checked', 'checked');
		}

		var agnityLabel = document.createElement('label');
		agnityLabel.appendChild(agnityRadioBtn);
		
		if(autoSaveInfo != null && radioOptions[idx][0] == 'autoSavedXml')
			mxUtils.write(agnityLabel, mxResources.get(radioOptions[idx][0]) + ' at ' +  autoSaveInfo);
		else
			mxUtils.write(agnityLabel, mxResources.get(radioOptions[idx][0]));

		optionDiv.appendChild(agnityLabel);
		rowDiv.appendChild(optionDiv);

		mxEvent.addListener(agnityRadioBtn, 'click', onChangeHandler);
	}

	return rowDiv;
};

Agnity.createRangeTextRowField = function(minVal, maxVal, resourceTxt, minDataChangeHandler, maxDataChangeHandler, enableLockStatus)
{
	if(minVal == null) minVal = '';
	if(maxVal == null) maxVal = '';
	
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);
	
	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);
	
	var agnityMinInputText = document.createElement('input');
	agnityMinInputText.setAttribute('class', 'AgnityRangeTextFieldClass');
	agnityMinInputText.setAttribute('type', 'text');
	agnityMinInputText.setAttribute('placeholder', mxResources.get('min'));
	agnityMinInputText.setAttribute('value', minVal);
	holders[2].appendChild(agnityMinInputText);
	
	if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnityMinInputText.setAttribute('disabled', true);
	
	var agnityMaxInputText = document.createElement('input');
	agnityMaxInputText.setAttribute('class', 'AgnityRangeTextFieldClass');
	agnityMaxInputText.setAttribute('type', 'text');
	agnityMaxInputText.setAttribute('placeholder', mxResources.get('max'));
	agnityMaxInputText.setAttribute('value', maxVal);
	holders[2].appendChild(agnityMaxInputText);
	
	if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnityMaxInputText.setAttribute('disabled', true);
	
	if(minDataChangeHandler)
	{
		mxEvent.addListener(agnityMinInputText, 'input', minDataChangeHandler);
	}
	if(maxDataChangeHandler)
	{
		mxEvent.addListener(agnityMaxInputText, 'input', maxDataChangeHandler);
	}
		
	return holders[0];
}

Agnity.createCheckboxRowField = function(textVal, resourceTxt, onDataChangeHandler, enableLockStatus)
{
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	return Agnity.createCheckboxRowFieldWithLabel(textVal, labelVal, helpTextVal, onDataChangeHandler, enableLockStatus);
}

Agnity.createCheckboxRowFieldWithLabel = function(textVal, labelVal, helpTextVal, onDataChangeHandler, enableLockStatus)
{
	var holders = Agnity.createFieldRow();

	if(enableLockStatus === undefined)
		enableLockStatus = true;

	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);
	
	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);
	
	var agnityCheckbox = document.createElement('input');
	agnityCheckbox.setAttribute('class', 'AgnityCheckboxRowFieldClass');
	agnityCheckbox.setAttribute('type', 'checkbox');
	agnityCheckbox.checked = textVal;
	holders[2].setAttribute('class', 'AgnityCheckboxRowFieldHolder');
	holders[2].appendChild(agnityCheckbox);
	
	if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnityCheckbox.setAttribute('disabled', true);
	
	if(onDataChangeHandler)
	{
		mxEvent.addListener(agnityCheckbox, 'change', onDataChangeHandler);
	}
	
	return holders[0];
}

Agnity.createInputTextRowFieldPassPolicy = function(textVal, resourceTxt, 
	onDataChangeHandler, isADE, enableLockStatus, placeholder, helpText)
{
if(enableLockStatus === undefined)
enableLockStatus = true;

if(textVal == null) textVal = '';
var holders = Agnity.createFieldRow();
var labelVal = mxResources.get(resourceTxt);
var helpTextVal = mxResources.get(resourceTxt + '_help');

var agnityLabel = document.createElement('label');
agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
agnityLabel.setAttribute('title', helpText);
//console.log('textVal(help text)=>'+ helpText);
// for css New Code
//this.listingPageDiv.innerHTML = '';
//this.listingPageDiv.setAttribute('class', 'AgnityDialogListingPageDiv1');

var agnityLabelText = document.createTextNode(labelVal);
agnityLabel.appendChild(agnityLabelText);
holders[1].appendChild(agnityLabel);

var agnityInputText = document.createElement('input');
agnityInputText.setAttribute('class', 'AgnityTextFieldClass');
agnityInputText.setAttribute('type', 'text');
agnityInputText.setAttribute('value', textVal);
agnityInputText.setAttribute('name', resourceTxt);

if(placeholder)
{
agnityInputText.setAttribute('placeholder', placeholder);
}
holders[2].appendChild(agnityInputText);

if(Agnity.hasUrlReadonlyParam() || (isADE != null && isADE) || (enableLockStatus && !Agnity.hasLockAcquired()))
agnityInputText.setAttribute('disabled', true);

if(onDataChangeHandler)
mxEvent.addListener(agnityInputText, 'input', onDataChangeHandler);

return holders[0];
};

Agnity.createInputTextRowField = function(textVal, resourceTxt, 
											onDataChangeHandler, isADE, enableLockStatus, placeholder)
{
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	if(textVal == null) textVal = '';
	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);

	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);

	var agnityInputText = document.createElement('input');
	agnityInputText.setAttribute('class', 'AgnityTextFieldClass');
	agnityInputText.setAttribute('type', 'text');
	agnityInputText.setAttribute('value', textVal);
	agnityInputText.setAttribute('name', resourceTxt);
	if(placeholder)
	{
		agnityInputText.setAttribute('placeholder', mxResources.get(placeholder));
	}
	holders[2].appendChild(agnityInputText);

	if(Agnity.hasUrlReadonlyParam() || (isADE != null && isADE) || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnityInputText.setAttribute('disabled', true);

	if(onDataChangeHandler)
		mxEvent.addListener(agnityInputText, 'input', onDataChangeHandler);

	return holders[0];
};

Agnity.createInputTextRowFieldWithAuditNameValidation = function(textVal, resourceTxt, onDataChangeHandler,isADE, enableLockStatus)
{   
	if(enableLockStatus === undefined)
	enableLockStatus = true;

	if(textVal == null) textVal = '';
	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');

	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);

	//agnityLabel.setAttribute('id',resourceTxt+'Constraint');
	var spanElement = document.createElement('span');
	spanElement.setAttribute('class','requiredAuditName');
	spanElement.innerText = '*';
	spanElement.style.color =  'red';

	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	agnityLabel.appendChild(spanElement);
	holders[1].appendChild(agnityLabel);

	var agnityInputText = document.createElement('input');
	agnityInputText.setAttribute('class', 'AgnityTextFieldClass');
	agnityInputText.setAttribute('type', 'text');
	agnityInputText.setAttribute('value', textVal);
	agnityInputText.setAttribute('name', resourceTxt);
	
	if(resourceTxt == "name")
		agnityInputText.setAttribute('required',true);
	
	var placeholderMsg = 'Enter an Audit name';
	agnityInputText.setAttribute('placeholder', placeholderMsg);
	agnityInputText.setAttribute('title',placeholderMsg);
	holders[2].appendChild(agnityInputText);

	if(Agnity.hasUrlReadonlyParam() || (isADE != null && isADE) || (enableLockStatus && !Agnity.hasLockAcquired()) )
	agnityInputText.setAttribute('disabled', true);

	if(onDataChangeHandler)
	mxEvent.addListener(agnityInputText, 'input', onDataChangeHandler);

	return holders[0];
};

Agnity.createInputPasswordRowField = function(textVal, resourceTxt,
											onDataChangeHandler, isADE, enableLockStatus)
{
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	if(textVal == null) textVal = '';
	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');

	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);

	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);

	var agnityInputText = document.createElement('input');
	agnityInputText.setAttribute('class', 'AgnityTextFieldClass');
	agnityInputText.setAttribute('type', 'password');
	agnityInputText.setAttribute('value', textVal);
	agnityInputText.setAttribute('name', resourceTxt);
	holders[2].appendChild(agnityInputText);
	
	if(Agnity.hasUrlReadonlyParam() || (isADE != null && isADE) || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnityInputText.setAttribute('disabled', true);

	if(onDataChangeHandler)
		mxEvent.addListener(agnityInputText, 'input', onDataChangeHandler);

	return holders[0];
};
Agnity.createErrorMessageCard = function(textVal, onChangeHandler)
{
	var error = document.createElement('div');
	 error.setAttribute('id','errorCard');
	 error.setAttribute('class','errorCard');
	 error.style.display = 'none';

	 var errorTextDiv = document.createElement('div');
	 errorTextDiv.classList.add('errorText');

	 var errorText = document.createElement('span');
	 errorText.setAttribute('id','errorText');
	 mxUtils.write(errorText,textVal);

	 errorTextDiv.appendChild(errorText);
	 error.appendChild(errorTextDiv);

	 closeError = document.createElement('div');
	 closeError.classList.add('errorClose');
	 error.appendChild(closeError);

	 mxEvent.addListener(closeError, 'click', onChangeHandler);

	 return error;
}
Agnity.createTextAreaRowField = function(textVal, onDataChangeHandler)
{
	if(textVal == null) textVal = '';
	
	var fieldHolder = document.createElement('div');
	fieldHolder.setAttribute('class', 'AgnityFieldRowFieldHolder');
	
	var agnityTextArea = document.createElement('textarea');
	agnityTextArea.setAttribute('class', 'AgnityTextFieldClass');
	agnityTextArea.setAttribute('type', 'text');
	agnityTextArea.value = textVal;
	fieldHolder.appendChild(agnityTextArea);
	
	mxEvent.addListener(agnityTextArea, 'input', onDataChangeHandler);

	return fieldHolder;
}

Agnity.createFileReaderInputRowField = function(resourceTxt, onChangeHandler)
{
	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);

	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);

	var agnityInputFile = document.createElement('input');
	agnityInputFile.setAttribute('class', 'AgnityFileRowFieldClass');
	agnityInputFile.setAttribute('type', 'file');
	holders[2].appendChild(agnityInputFile);
	
	mxEvent.addListener(agnityInputFile, 'change', onChangeHandler);

	return holders[0];
}

function AgnityDynamicDisplay()
{
	this.hide = function(rowHolder)
	{
		rowHolder.style.display = 'none';
	}
	
	this.show = function(rowHolder)
	{
		rowHolder.style.display = 'block';
	}
}

function AgnityDynamicValueSelector(panel, ui)
{
	this.panel = panel;
	this.ui = ui;

	this.typeVals = agnityGlobalData.mappingData.valueType;// variables
	this.variablePanelHelper = new AgnityDynamicDropDownHelper();
	this.variableProvider = new AgnityGetVariablesHelper(Agnity.getTreeData(ui).forestName, Agnity.getUrlParam('diagram'), Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
    console.log(this.variableProvider);
	
	this.typeRow = null;
	this.literalRow = null;
	this.variableRow = null;
	this.httpReqJSONRow = null;
	
	this.lastLiteral = '';
	this.lastVariable = '';
	this.lastHttpReqJSON = '';

	this.typeChangeHandler = null;
	this.valueChangeHandler = null;
	
	this.setVariableProvider = function(newProvider)
	{
		this.variableProvider = newProvider;
	}

	this.setupWidget = function(currType, currValue, resourceTxt,
								typeChangeHandler, valueChangeHandler)
	{
		this.setupInternalWidget(currType, currValue, resourceTxt,
								typeChangeHandler, valueChangeHandler, 'addNewVariable');
		
		this.panel.appendChild(this.typeRow);
		this.panel.appendChild(this.literalRow);
		this.panel.appendChild(this.variableRow);
		this.panel.appendChild(this.httpReqJSONRow);
	}
	
	this.setupWidgetInDialog = function(currType, currValue, resourceTxt,
	                                    typeChangeHandler, valueChangeHandler, typeRow, typeCol, valueRow, valueCol)
	{
		this.setupInternalWidget(currType, currValue, resourceTxt,
									typeChangeHandler, valueChangeHandler, null);
		
		this.panel.addPanelToDetailPageGrid(typeRow, typeCol, this.typeRow);
		this.panel.addPanelToDetailPageGrid(valueRow, valueCol, this.literalRow);
		this.panel.appendPanelToDetailPageGrid(valueRow, valueCol, this.variableRow);
		this.panel.appendPanelToDetailPageGrid(valueRow, valueCol, this.httpReqJSONRow);
	}
	
	this.setupInternalWidget = function(currType, currValue, resourceTxt,
	                                    typeChangeHandler, valueChangeHandler, newVariable)
	{	
		var self = this;
		this.type = currType;
		
		this.typeChangeHandler = typeChangeHandler;
		this.valueChangeHandler = valueChangeHandler;
		
		if(this.type != 'Literal' && this.type != 'Variable' && this.type != 'HttpReqJSON')
		{
			this.type = 'Literal';
			this.typeChangeHandler(this.type);
			currValue = '';
			this.valueChangeHandler('');
		}
		
		if(this.type == 'Literal')
			this.lastLiteral = currValue;
		else if(this.type == 'Variable')
			this.lastVariable = currValue;
		else
			this.lastHttpReqJSON = currValue;
			
		this.typeRow = Agnity
				.createDropDownRowField(this.typeVals, this.type, resourceTxt,
				                        function(event)
										{
											self.type = this.value;
											self.setupPanelState();
											self.typeChangeHandler(this.value);
											
											if(self.type == 'Literal')
												self.valueChangeHandler(self.lastLiteral);
											else if(self.type == 'Variable')
												self.valueChangeHandler(self.lastVariable);
											else 
												self.valueChangeHandler(self.lastHttpReqJSON);	
										});

		this.literalRow = Agnity
				.createInputTextRowField(this.lastLiteral, 'noLabel', function(event)
				                         {
											self.lastLiteral = this.value;
											
											if(self.type == 'Literal')
												self.valueChangeHandler(this.value);
				                         });

		this.variableRow = this.variablePanelHelper
				.setupWidget(this.variableProvider, this.lastVariable, 'noLabel', 
								function(event)
								{
									if(this.value == 'AgnityNewRecordRequest')
									{
										ui.actions.get('variableManagement')
												.funct(function(){
													self.variablePanelHelper.rebuildOptions();
												});
									}
									else
									{
										self.lastVariable = this.value;										
										if(self.type != 'Literal' && self.type != 'HttpReqJSON')
											self.valueChangeHandler(this.value);
									}
								}, newVariable);
		this.httpReqJSONRow = Agnity
				.createInputTextRowField(this.lastHttpReqJSON, 'noLabel', function(event)
				                         {
											self.lastHttpReqJSON = this.value;
											
											if(self.type != 'Literal' && self.type != 'Variable')
												self.valueChangeHandler(this.value);
				                         });
		this.setupPanelState();
		
	}
	
	this.setupPanelState = function()
	{
		if(this.type == 'Literal')
		{
			this.literalRow.style.display = 'block';
			this.variableRow.style.display = 'none';
			this.httpReqJSONRow.style.display = 'none';
		}
		else if(this.type == 'Variable')
		{
			this.literalRow.style.display = 'none';
			this.variableRow.style.display = 'block';	
			this.httpReqJSONRow.style.display = 'none';		
		}
		else{
			this.literalRow.style.display = 'none';
			this.variableRow.style.display = 'none';	
			this.httpReqJSONRow.style.display = 'block';	
		}
	}
	
	this.hide = function()
	{
		this.typeRow.style.display = 'none';
		this.literalRow.style.display = 'none';
		this.variableRow.style.display = 'none';	
		this.httpReqJSONRow.style.display = 'none';				
	}
	
	this.show = function()
	{
		this.typeRow.style.display = 'block';
		this.setupPanelState();
	}
}

function AgnityDynamicDropDownHelper()
{
	this.widget = null;
	this.newRecordLabel = null;
	this.dataProvider = null;
	this.selectedValue = null;
	this.OnSelectionChangeHandler = null;

	this.setupWidget = function(dataProvider, selectedValue, resourceTxt,
	                            OnSelectionChangeHandler, newRecordLabel, isADE, enableLockStatus)
	{
		this.selectedValue = selectedValue;
		this.dataProvider = dataProvider;
		this.newRecordLabel = newRecordLabel;
		this.OnSelectionChangeHandler = OnSelectionChangeHandler;
		this.widget = Agnity
				.createDynamicDropDownRowField(dataProvider, selectedValue, resourceTxt,
												OnSelectionChangeHandler,
												newRecordLabel, isADE, enableLockStatus);

		return this.widget;
	}
	
	this.rebuildOptions = function()
	{
		var self = this;
	
		this.dataProvider.fetchData(function(possibleValues)
        {
			self.rebuildEntries(possibleValues, self.selectedValue);
        });
	}

	this.rebuildEntries = function(possibleValues, selectedValue)
	{
		var selectHolder = this.widget.childNodes[1];
		var agnitySelectOptions = selectHolder.childNodes[0];

		agnitySelectOptions.innerHTML = '';

		for(var idx = 0; idx < possibleValues.length; idx++)
		{
			var createOption = document.createElement('option');

			if(possibleValues[idx].id != null
					&& possibleValues[idx].name != null)
			{
				createOption.value = possibleValues[idx].id;
				createOption.text = possibleValues[idx].name;
			}
			else
			{
				createOption.text = possibleValues[idx];
				createOption.value = possibleValues[idx];
			}

			if((selectedValue == null || selectedValue == '') && idx == 0)
			{
				createOption.selected = "selected";
			}

			if(selectedValue == createOption.value)
			{
				createOption.selected = "selected";
			}

			agnitySelectOptions.add(createOption, idx);
		}

		if(this.newRecordLabel != null)
		{
			var createOption = document.createElement('option');
			createOption.text = this.newRecordLabel;
			createOption.value = 'AgnityNewRecordRequest';
			agnitySelectOptions.add(createOption, idx);
		}
		if(selectedValue == null || selectedValue == '')
		{
			var mychangeHandler = this.OnSelectionChangeHandler
					.bind(agnitySelectOptions);
			mychangeHandler(null);
		}
	}
}

Agnity.createSelectDropDownRow = function(dataProvider, selectedValue, resourceTxt, 
                               OnSelectionChangeHandler, enableLockStatus)
{
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');

	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);

	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);

	var agnitySelectOptions = document.createElement('SELECT');
	agnitySelectOptions.setAttribute('class', 'AgnityDropdownFieldClass');
	holders[2].appendChild(agnitySelectOptions);
	
	dataProvider.fetchData(function(possibleValues)
   	{
   		var selectValFound = false;
   		
   		for(var idx = 0; idx < possibleValues.length; idx++)
   		{
   			var createOption = document.createElement('option');

   			if(possibleValues[idx].id != null
   					&& possibleValues[idx].name != null)
   			{
   				createOption.value = possibleValues[idx].id;
   				createOption.text = possibleValues[idx].name;
   			}
   			else
   			{
   				createOption.text = possibleValues[idx];
   				createOption.value = possibleValues[idx];
   			}

   			if((selectedValue == null || selectedValue == '') && idx == 0)
   			{
   				createOption.selected = "selected";
   			}

   			if(selectedValue == createOption.value)
   			{
   				selectValFound = true;
   				createOption.selected = "selected";
   			}

   			agnitySelectOptions.add(createOption, idx);
   		}
   		
   		/*if(selectedValue == null || selectedValue == '' || !selectValFound)
   		{
   			var mychangeHandler = OnSelectionChangeHandler
   					.bind(agnitySelectOptions);
   			mychangeHandler(null);
   		}*/
   	});
	
	if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnitySelectOptions.setAttribute('disabled', true);
	
	agnitySelectOptions.addEventListener('select2', function(){
		
	});
	
	return holders[0];
}

Agnity.createSearchActionRowButtonField = function()
{
	var holders = Agnity.createSelectFieldRow();
}

Agnity.createDynamicDropDownSelectRowField = function(dataProvider, selectedValue,
      												resourceTxt,
    												OnSelectionChangeHandler, enableLockStatus)
{
	var holders = Agnity.createSelectFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');

	if(enableLockStatus === undefined)
		enableLockStatus = true;

	/*var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	holders[1].appendChild(agnityLabel);*/
	
	var agnitySelectOptions = document.createElement('SELECT');
	agnitySelectOptions.setAttribute('class', 'AgnityDropdownFieldClass');
	agnitySelectOptions.setAttribute('size', '8');
	holders[1].appendChild(agnitySelectOptions);

	dataProvider.fetchData(function(possibleValues)
	{
		var selectValFound = false;
		for(var idx = 0; idx < possibleValues['data'].length; idx++)
		{
			var createOption = document.createElement('option');

			if(possibleValues['data'][idx].id != null
					&& possibleValues['data'][idx].name != null)
			{
				createOption.value = possibleValues['data'][idx].id;
				createOption.text = possibleValues['data'][idx].name;
			}
			else
			{
				createOption.text = possibleValues['data'][idx];
				createOption.value = possibleValues['data'][idx];
			}

			if((selectedValue == null || selectedValue == '') && idx == 0)
			{
				createOption.selected = "selected";
			}
			
			if(selectedValue == createOption.value)
			{
				selectValFound = true;
				createOption.selected = "selected";
			}

			agnitySelectOptions.add(createOption, idx);
		}
		
		if(selectedValue == null || selectedValue == '' || !selectValFound)
		{
			var mychangeHandler = OnSelectionChangeHandler
					.bind(agnitySelectOptions);
			mychangeHandler(null);
		}
	});
	
	if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnitySelectOptions.setAttribute('disabled', true);
	
	mxEvent
	.addListener(agnitySelectOptions, 'change',
					OnSelectionChangeHandler);
	
	mxEvent
	.addListener(agnitySelectOptions, 'click',
					OnSelectionChangeHandler);
	
	return [holders[0], agnitySelectOptions];
}

function AgnityApplicationDynamicDropDownHelper()
{
	this.widget = null;
	this.newRecordLabel = null;
	this.applications = null;
	this.selectedValue = null;
	this.OnSelectionChangeHandler = null;

	this.setupWidget = function(applications, selectedValue,
	                            OnSelectionChangeHandler, newRecordLabel)
	{
		this.selectedValue = selectedValue;
		this.applications = applications;
		this.newRecordLabel = newRecordLabel;
		this.OnSelectionChangeHandler = OnSelectionChangeHandler;

		this.widget = Agnity
				.createApplicationDynamicDropDownField(applications, selectedValue,
												OnSelectionChangeHandler,
												newRecordLabel);

		return this.widget;
	}

	this.rebuildEntries = function(allPossibleValues, selectedValue, selectedDomain, doRefresh)
	{
		var self = this;
		var selectHolder = this.widget.childNodes[0];
		var agnitySelectOptions = selectHolder;
        var tempValue = selectedValue;

		agnitySelectOptions.innerHTML = '';
		for (var key in allPossibleValues) {

		    var possibleValues = allPossibleValues[key];
		    var isMultipleAppsAllowed = true;

			var createOptionGroup = document.createElement('optgroup');
			createOptionGroup.setAttribute('label', possibleValues.name);

			for(var idx = 0; idx < possibleValues.applications.length; idx++)
			{
				var createOption = document.createElement('option');

				if(possibleValues.applications[idx].id != null
						&& possibleValues.applications[idx].name != null)
				{
					createOption.value = possibleValues.applications[idx].id;
					createOption.text = possibleValues.applications[idx].name;
				}
				else
				{
					createOption.text = possibleValues.applications[idx].name;
					createOption.value = possibleValues.applications[idx].name;
					createOption.setAttribute('data-lock',possibleValues.applications[idx].isLocked);
				}

				if((selectedValue == null || selectedValue == '') && idx == 0)
				{
					createOption.selected = "selected";
				}

				if(selectedValue == createOption.value)
				{
					if(createOptionGroup.label == selectedDomain)
					{
						createOption.selected = "selected";
						tempValue = null;
					}
				}

			     createOptionGroup.appendChild(createOption);
			}

			agnitySelectOptions.appendChild(createOptionGroup);

			if(this.newRecordLabel != null && possibleValues.isAllowMultiplApps)
			{
				var createOption = document.createElement('option');
				createOption.text = mxResources.get(this.newRecordLabel);
				createOption.value = 'AgnityNewRecordRequest';
				createOptionGroup.appendChild(createOption);
			}
		}

		$('#AgnityApplicationDropdownField').select2({
			    containerCssClass: "AgnityApplicationDropdownFieldClass",
			  templateSelection: function(data) {
			    let label = $(data.element).parent('optgroup').attr('label');
			    label = label ? label + ' > ' : '';
			    return label + data.text;
			  },
			  templateResult: function(state) {
				  var $state = $('<span class="lock-status-locked-dropdown-wrapper">');
				  $state.html(state.text);
				  if($(state.element).attr("data-lock") == "true")
				  {
					  $state = $('<span class="lock-status-locked-dropdown-wrapper">' + state.text + '</span>' + '<div class="lock-status-locked-dropdown"/>');
				  }
				  return $state;
			  }
		});

		 $('#AgnityApplicationDropdownField').on('change', function (e) {
			 self.OnSelectionChangeHandler.call(this,e);
		 });


		if(doRefresh)
		{
			var mychangeHandler = this.OnSelectionChangeHandler
					.bind(agnitySelectOptions);
			mychangeHandler(null);
		}
	}
}

Agnity.createApplicationDynamicDropDownField = function(allApplications, selectedValue,
		OnSelectionChangeHandler, newRecordLabel)
{
	var holder = document.createElement('div');
	holder.setAttribute('class', 'AgnityApplicationDropDownFieldHolder');
	
	var agnitySelectOptions = document.createElement('SELECT');
	agnitySelectOptions.setAttribute('class', 'AgnityApplicationDropdownFieldClass');
	agnitySelectOptions.setAttribute('id', 'AgnityApplicationDropdownField');

	holder.appendChild(agnitySelectOptions);
	
	var selectValFound = false;
	for (var key in allApplications) {

		var applications = allApplications[key];

		for(var idx = 0; idx < applications.length; idx++)
		{
			var createOption = document.createElement('option');

			if(applications[idx].id != null
					&& applications[idx].name != null)
			{
				createOption.value = applications[idx].id;
				createOption.text = applications[idx].name;
			}
			else
			{
				createOption.text = applications[idx];
				createOption.value = applications[idx];
			}

			if((selectedValue == null || selectedValue == '') && idx == 0)
			{
				createOption.selected = "selected";
			}

			if(selectedValue == createOption.value)
			{
				selectValFound = true;
				createOption.selected = "selected";
			}

			agnitySelectOptions.add(createOption, idx);
		}
	}
	
	if(newRecordLabel != null)
	{
		var createOption = document.createElement('option');
		createOption.text = mxResources.get(newRecordLabel);
		createOption.value = 'AgnityNewRecordRequest';
		agnitySelectOptions.add(createOption, idx);
	}
	
	if(selectedValue == null || selectedValue == '' || !selectValFound)
	{
		var mychangeHandler = OnSelectionChangeHandler
				.bind(agnitySelectOptions);
		mychangeHandler(null);
	}
	
	mxEvent
	.addListener(agnitySelectOptions, 'change',
					OnSelectionChangeHandler);

	return holder;
}

Agnity.createDynamicDropDownRowField = function(dataProvider, selectedValue,
												resourceTxt,
												OnSelectionChangeHandler,
												newRecordLabel, isADE, enableLockStatus)
{
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');

	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);

	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);

	var agnitySelectOptions = document.createElement('SELECT');
	agnitySelectOptions.setAttribute('class', 'AgnityDropdownFieldClass');
	holders[2].appendChild(agnitySelectOptions);

	dataProvider.fetchData(function(possibleValues)
	{
		var selectValFound = false;
		
		for(var idx = 0; idx < possibleValues.length; idx++)
		{
			var createOption = document.createElement('option');
			
			if(possibleValues[idx].id != null
					&& possibleValues[idx].name != null)
			{
				createOption.value = possibleValues[idx].id;
				createOption.text = possibleValues[idx].name;
			}
			else if(possibleValues[idx].ip != null && possibleValues[idx].port != null
					&& possibleValues[idx].name !=null)
			{
				createOption.text = possibleValues[idx].name;
				createOption.value = possibleValues[idx].name;
			}
			else if(possibleValues[idx].policyId != null && possibleValues[idx].policyName != null
				)
			{
			createOption.text = possibleValues[idx].policyName;
			createOption.value = possibleValues[idx].policyId;
			}
			else
			{
				createOption.text = possibleValues[idx];
				createOption.value = possibleValues[idx];
			}

			if((selectedValue == null || selectedValue == '') && idx == 0)
			{
				createOption.selected = "selected";
			}

			if(selectedValue == createOption.value)
			{
				selectValFound = true;
				createOption.selected = "selected";
			}

			agnitySelectOptions.add(createOption, idx);
		}
		if(newRecordLabel != null)
		{
			var createOption = document.createElement('option');
			createOption.text = mxResources.get(newRecordLabel);
			createOption.value = 'AgnityNewRecordRequest';
			agnitySelectOptions.add(createOption, idx);
		}
		if(selectedValue == null || selectedValue == '' || !selectValFound)
		{
			var mychangeHandler = OnSelectionChangeHandler
					.bind(agnitySelectOptions);
			mychangeHandler(null);
		}
	});
	
	if(Agnity.hasUrlReadonlyParam() || (isADE != null && isADE) || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnitySelectOptions.setAttribute('disabled', true);

	mxEvent
			.addListener(agnitySelectOptions, 'change',
							OnSelectionChangeHandler);

	return holders[0];
};

Agnity.createMultiSelectBox = function(possibleLabelValues, selectedValues, resourceTxt,onChangeHandler, disableSelected)
{
	    var holders = Agnity.createFieldRow();
		var labelVal = mxResources.get(resourceTxt);
		var helpTextVal = mxResources.get(resourceTxt + '_help');

		var agnityLabel = document.createElement('label');
		agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
		agnityLabel.setAttribute('title', helpTextVal);

		var agnityLabelText = document.createTextNode(labelVal);
		agnityLabel.appendChild(agnityLabelText);
		holders[1].appendChild(agnityLabel);

	    var agnitySelectOptions = document.createElement('select');
		agnitySelectOptions.setAttribute('id', resourceTxt);
		agnitySelectOptions.setAttribute('multiple', 'true');

		holders[2].appendChild(agnitySelectOptions);
		var selectValFound = false;

		for(var idx = 0; idx < possibleLabelValues.length; idx++)
		{
			var createOption = document.createElement('option');
			if(Array.isArray(possibleLabelValues[idx]))
			{
				createOption.text = mxResources.get(possibleLabelValues[idx][0]);
				createOption.value = possibleLabelValues[idx][1];
			}
			else
			{
				createOption.text = possibleLabelValues[idx];
				createOption.value = possibleLabelValues[idx];
			}
			if(selectedValues)
			{
				for(var index = 0; index < selectedValues.length; index++)
				{
					if(selectedValues[index] == createOption.value)
					{
						createOption.selected = "selected";
						if(disableSelected)
						{
							createOption.disabled = "disabled";
						}
					}
				}
			}
			if(selectedValues == createOption.value)
			{
				selectValFound = true;
				createOption.selected = "selected";
			}
			//This sets first option is selected by default
		   /*if((selectedValues == null || selectedValues == '') && idx == 0)
			{
				createOption.selected = "selected";
			}*/

			agnitySelectOptions.add(createOption, idx);
		}

		$('body').on('change', '#' + resourceTxt, function(event) {
		    var selected = [...this.selectedOptions]
            .map(option => option.value);
			onChangeHandler(selected)
		})

		return holders[0];
};

Agnity.createMultiSelectDropDownRowField = function(possibleLabelValues, selectedValues,
                                                 resourceTxt, OnSelectionChangeHandler, enableLockStatus)
{
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);
	
	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);
	
	var agnitySelectOptions = document.createElement('SELECT');
	agnitySelectOptions.setAttribute('class', 'AgnityDropdownFieldClass');
	agnitySelectOptions.setAttribute('multiple', 'true');
	agnitySelectOptions.setAttribute('size', '2');
	
	holders[2].appendChild(agnitySelectOptions);
	
	var selectValFound = false;
	
	for(var idx = 0; idx < possibleLabelValues.length; idx++)
	{
		var createOption = document.createElement('option');
		if(Array.isArray(possibleLabelValues[idx]))
		{
			createOption.text = mxResources.get(possibleLabelValues[idx][0]);
			createOption.value = possibleLabelValues[idx][1];
		}
		else
		{
			createOption.text = possibleLabelValues[idx];
			createOption.value = possibleLabelValues[idx];
		}
		if(selectedValues != '' && selectedValues)
		{
			var selectedValue = selectedValues.split(',');
			for(var index = 0; index < selectedValue.length; index++)
			{
				if(selectedValue[index] == createOption.value)
				{
					createOption.selected = "selected";
				}
			}
		}
		if(selectedValues == createOption.value)
		{
			selectValFound = true;
			createOption.selected = "selected";
		}
		
		if((selectedValues == null || selectedValues == '') && idx == 0)
		{
			createOption.selected = "selected";
		}
		
		agnitySelectOptions.add(createOption, idx);
	}
	
	if(selectedValues == null || selectedValues == '' || !selectValFound)
	{
		var mychangeHandler = OnSelectionChangeHandler
				.bind(agnitySelectOptions);
		mychangeHandler(null);
	}
	
	if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnitySelectOptions.setAttribute('disabled', true);
	
	mxEvent.addListener(agnitySelectOptions, 'change',OnSelectionChangeHandler);
	
	return holders[0];
};


Agnity.createBSMultiSelectBox = function( possibleLabelValues, selectedValues, resourceTxt, onChangeHandler, disableSelected)
 {
	var selectBox = Agnity.createMultiSelectBox(possibleLabelValues, selectedValues, resourceTxt,onChangeHandler, disableSelected);
	$("#" + resourceTxt).ready(function (){
		$.when($("#" + resourceTxt).bsMultiSelect({
				placeholder: 'Click here to add ..'
		})).done(
			function (){
				var protoList = $("#" + resourceTxt)[0];
				var multiSelectDropdown = protoList.parentElement.childNodes[1].children[0];
				var selectAllBtn = document.createElement("Button");
				selectAllBtn.innerText = "SelectAll";
				selectAllBtn.classList.add("AgnityDialogDetailPageActionButton");
				selectAllBtn.classList.add("AgnityBSMultiSelectBox");
				selectAllBtn.addEventListener("click",function() {
					$("#"+ resourceTxt).bsMultiSelect("SelectAll")
				});

				var deSelectAllBtn = document.createElement("Button");
				deSelectAllBtn.innerText = "Deselect All";
				deSelectAllBtn.classList.add("AgnityDialogDetailPageActionButton");
				deSelectAllBtn.classList.add("AgnityBSMultiSelectBox");
				deSelectAllBtn.addEventListener("click",function() {
					$("#" + resourceTxt).bsMultiSelect("DeselectAll")
				});
				multiSelectDropdown.prepend(deSelectAllBtn);
				multiSelectDropdown.prepend(selectAllBtn);
			});
	});

	return selectBox;
};


Agnity.createDropDownRowField = function(possibleLabelValues, selectedValue,
                                         resourceTxt, OnSelectionChangeHandler, enableLockStatus)
{
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	var holders = Agnity.createFieldRow();
	var labelVal = mxResources.get(resourceTxt);
	var holders = Agnity.createFieldRow();
	var helpTextVal = mxResources.get(resourceTxt + '_help');

	var agnityLabel = document.createElement('label');
	agnityLabel.setAttribute('class', 'AgnityFieldRowLabelClass');
	agnityLabel.setAttribute('title', helpTextVal);

	var agnityLabelText = document.createTextNode(labelVal);
	agnityLabel.appendChild(agnityLabelText);
	holders[1].appendChild(agnityLabel);

	var agnitySelectOptions = document.createElement('SELECT');
	agnitySelectOptions.setAttribute('class', 'AgnityDropdownFieldClass');
	
	holders[2].appendChild(agnitySelectOptions);

	var selectValFound = false;

	for(var idx = 0; idx < possibleLabelValues.length; idx++)
	{
		var createOption = document.createElement('option');
		
		if(Array.isArray(possibleLabelValues[idx]))
		{
			createOption.text = mxResources.get(possibleLabelValues[idx][0]);
			createOption.value = possibleLabelValues[idx][1];
		}
		else
		{
			createOption.text = possibleLabelValues[idx];
			createOption.value = possibleLabelValues[idx];
		}
		if(selectedValue == createOption.value)
		{
			selectValFound = true;
			createOption.selected = "selected";
		}
		
		if((selectedValue == null || selectedValue == '') && idx == 0)
		{
			createOption.selected = "selected";
		}
		
		agnitySelectOptions.add(createOption, idx);
	}
	
	if(selectedValue == null || selectedValue == '' || !selectValFound)
	{
		var mychangeHandler = OnSelectionChangeHandler
				.bind(agnitySelectOptions);
		mychangeHandler(null);
	}
	
	if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
		agnitySelectOptions.setAttribute('disabled', true);

	mxEvent
			.addListener(agnitySelectOptions, 'change',
							OnSelectionChangeHandler);

	return holders[0];
};

Agnity.createEdgeOptionsPanel = function(cell, ui, values, sourceNodeCell, multiSelectFlag, enableLockStatus)
{
	if(enableLockStatus === undefined)
		enableLockStatus = true;

	var edgePropertyPanel = document.createElement('div');
	edgePropertyPanel.setAttribute('class', 'AgnityEdgeTextOptionsPropertyPanel');
	
	var title = document.createElement('h3');
	mxUtils.write(title, mxResources.get('connector'));
	edgePropertyPanel.appendChild(title);
	
	var valueToLabelMap = new Map();
	
	for(var idx = 0; idx < values.length; idx++)
	{
		valueToLabelMap.set(values[idx][1], values[idx][0]);
	}

	if(cell.value == null && cell.agnityValue != null)
	{
		ui.editor.graph.getModel().setValue(cell, mxResources.get(valueToLabelMap.get(cell.agnityValue)));
	}
	else if(cell.agnityValue == null)
	{		
		var usedValues = [];
		for(var idx = 0; idx < sourceNodeCell.edges.length; idx++)
		{
			var currEdgeCell = sourceNodeCell.edges[idx];
			if(currEdgeCell.agnityValue == null) continue;
						
			var edgeStyle = ui.editor.graph.getCellStyle(currEdgeCell);
			var edgeSourceCell = null;
			
			if(edgeStyle.endArrow == undefined && edgeStyle.startArrow != undefined)
			{
				edgeSourceCell = currEdgeCell.target;
			}
			else if(edgeStyle.endArrow != undefined
					&& edgeStyle.startArrow == undefined)
			{
				edgeSourceCell = currEdgeCell.source;
			}
			
			if(edgeSourceCell == null) continue;
			
			if(sourceNodeCell.id != edgeSourceCell.id) continue;
			
			currEdgeCell.agnityValue.split(',').forEach(function(element){
				usedValues.push(element);
			})			
		}
		
		var found=false;
		for(var idx = 0; idx < values.length; idx++)
		{		
			if(usedValues.indexOf(values[idx][1]) != -1) continue;
			
			cell.agnityValue = values[idx][1];
			ui.editor.graph.getModel().setValue(cell, mxResources.get(values[idx][0]));
			found = true;
			break;
		}	
		
		if(!found)
		{
			cell.agnityValue = values[values.length - 1][1];
			ui.editor.graph.getModel().setValue(cell, mxResources.get(values[values.length - 1][0]));
		}
	}
	
	if(multiSelectFlag)
	{
		for(var idx = 0; idx < values.length; idx++)
		{
			edgePropertyPanel.appendChild(Agnity.createConnectorCheckboxRowField(cell, ui, values[idx], valueToLabelMap));
		}
	}
	else
	{
		edgePropertyPanel.appendChild(Agnity.createConnectorRadioButtonRowField(values, cell.agnityValue, 'Somename', function(event)
		                                                                        {
		                                                                    		cell.agnityValue = this.value;
		                                                                    		ui.editor.graph.getModel().setValue(cell, mxResources.get(valueToLabelMap.get(this.value)));	
		                                                                        },enableLockStatus));		
	}
	
	return edgePropertyPanel;
}

Agnity.createConnectorCheckboxRowField = function(cell, ui, valAry, valueToLabelMap)
{
	var values = cell.agnityValue.split(",");
	var resourceText = valAry[0];
	var optionValue = valAry[1];
	
	var isPresent = values.indexOf(optionValue) != -1;
	
	var panel = Agnity.createCheckboxRowField(isPresent, resourceText, function(event)
    {
		var currValues = cell.agnityValue.split(",");
		var newValues = [];
		var newLabel = [];
		
		for(var idx = 0; idx < currValues.length; idx++)
		{
			if(currValues[idx] == '') continue;
			
			if(currValues[idx] != optionValue)
			{
				newValues.push(currValues[idx]);
				newLabel.push(mxResources.get(valueToLabelMap.get(currValues[idx])));
			}
		}

		if(this.checked)
		{
			newValues.push(optionValue);
			newLabel.push(mxResources.get(valueToLabelMap.get(optionValue)))
		}
		
		cell.agnityValue = newValues.join(",");		
		ui.editor.graph.getModel().setValue(cell, newLabel.join(", "));
		
	});
	
	return panel;
}

Agnity.createForeignKeyConstraints = function(ui, sourceCellId, targetCellId, isAdd, referenceName)
{
	var graph = ui.editor.graph;  	  
	var sourceCell = graph.getModel().getCell(sourceCellId);
	var targetCell = graph.getModel().getCell(targetCellId);
	
	if(sourceCellId == targetCellId) return;
	
	if(isAdd)
	{
		var parentCell = graph.getModel().getParent(sourceCell);
		var edgeStyle = graph.createCurrentEdgeStyle();
		var edgeFound = false;
		if(sourceCell.edges != null)
		{
			var currValues;
			var newValues = [];
			
			for(var idx = 0; idx < sourceCell.edges.length; idx++)
			{
				var currEdge = sourceCell.edges[idx];
				
				if(currEdge.source == null || currEdge.target == null) continue;
				
				if(currEdge.source.id == sourceCellId && currEdge.target.id == targetCellId)
				{
					edgeFound = true;
					currValues = currEdge.value.split(',');
					
					for(var val = 0; val < currValues.length; val++)
					{
						newValues.push(currValues[val].trim());
					}
					if(!newValues.includes(referenceName.trim()))
						newValues.push(referenceName.trim());
					
					currEdge.value = newValues.join(",");		
					ui.editor.graph.getModel().setValue(currEdge, newValues.join(", "));
				}
				
			}
			
			if(sourceCell.edges.length == 0 || !edgeFound)
				graph.insertEdge(parentCell, null, referenceName, sourceCell, targetCell, edgeStyle);
			
		}
		else
		{
			graph.insertEdge(parentCell, null, referenceName, sourceCell, targetCell, edgeStyle);
		}
		
	}
	else
	{
		var edgesToRemove = [];
		var currValues;
		var newValues = [];
		
		if(sourceCell.edges != null)
		{
			for(var idx = 0; idx < sourceCell.edges.length; idx++)
			{
				var currEdge = sourceCell.edges[idx];
				
				if(currEdge.source == null || currEdge.target == null) continue;
				
				if(currEdge.source.id == sourceCellId && currEdge.target.id == targetCellId)
				{
					currValues = currEdge.value.split(',');
					
					if(currValues.length == 1)
						edgesToRemove.push(currEdge);
					else
					{
						for(var val = 0; val < currValues.length; val++)
						{
							newValues.push(currValues[val].trim());
						}
						var index = newValues.indexOf(referenceName.trim());
						
						if (index > -1) {
							newValues.splice(index, 1);
						}
						
						currEdge.value = newValues.join(",");		
						ui.editor.graph.getModel().setValue(currEdge, newValues.join(", "));
					}
					
				}			
			}		
		}
 		
		graph.removeCells(edgesToRemove); 
	}
	
}

Agnity.createReferencedNodeField = function(ui, sourceCellId, targetCellId)
{		
	var graph = ui.editor.graph;  	  
	var sourceCell = graph.getModel().getCell(sourceCellId);
	var targetCell = graph.getModel().getCell(targetCellId);
	
	var connectedFlag = false;
	
	if(sourceCell.edges != null)
	{
		for(var idx = 0; idx < sourceCell.edges.length; idx++)
		{
			var currEdge = sourceCell.edges[idx];
			
			if(currEdge.source == null || currEdge.target == null) continue;
			
			var edgeStyle = graph.getCellStyle(currEdge);

			if(edgeStyle.endArrow == undefined && edgeStyle.startArrow != undefined)
			{
				if(currEdge.source.id == targetCellId && currEdge.target.id == sourceCellId)
				{
					connectedFlag = true;
					break;
				}
			}
			else if(edgeStyle.endArrow != undefined
					&& edgeStyle.startArrow == undefined)
			{
				if(currEdge.source.id == sourceCellId && currEdge.target.id == targetCellId)
				{
					connectedFlag = true;
					break;
				}
			}			
		}		
	}
	
	var holder = Agnity.createCheckboxRowFieldWithLabel(connectedFlag, Agnity.getLabel(ui, targetCell), '', function(event)
	{  		  
      	  if(this.checked)
  		  {      		 
      		  var parentCell = graph.getModel().getParent(sourceCell);
      		  var edgeStyle = graph.createCurrentEdgeStyle();
      		  
      		  graph.insertEdge(parentCell, null, null, sourceCell, targetCell, edgeStyle);
  		  }
      	  else
  		  {
      		  sourceCell = graph.getModel().getCell(sourceCellId);
      		  targetCell = graph.getModel().getCell(targetCellId);
      		
      		  var edgesToRemove = [];
      		  
      		  if(sourceCell.edges != null)
      		  {
      			  for(var idx = 0; idx < sourceCell.edges.length; idx++)
      			  {
      				  var currEdge = sourceCell.edges[idx];
      				
      				  if(currEdge.source == null || currEdge.target == null) continue;
      				
      				  var edgeStyle = graph.getCellStyle(currEdge);

      				  if(edgeStyle.endArrow == undefined && edgeStyle.startArrow != undefined)
      				  {
      					  if(currEdge.source.id == targetCellId && currEdge.target.id == sourceCellId)
      					  {
      						  edgesToRemove.push(currEdge);
      					  }
      				  }
      				  else if(edgeStyle.endArrow != undefined
      						  && edgeStyle.startArrow == undefined)
      				  {
      					  if(currEdge.source.id == sourceCellId && currEdge.target.id == targetCellId)
      					  {
      						  edgesToRemove.push(currEdge);
      					  }
      				  }			
      			  }		
      		  }
      		  
      		  graph.removeCells(edgesToRemove);                		  
  		  }		
	});

	return holder;
}

Agnity.createConnectorRadioButtonRowField = function(radioOptions, checkedVal,
														name, onChangeHandler,enableLockStatus)
{
	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');

	for(idx = 0; idx < radioOptions.length; idx++)
	{
		var optionDiv = document.createElement('div');
		optionDiv.setAttribute('class', 'AgnityRadioButtonFieldRow');

		var agnityRadioBtn = document.createElement('input');
		agnityRadioBtn.setAttribute('type', 'radio');
		agnityRadioBtn.setAttribute('name', name);
		agnityRadioBtn.setAttribute('value', radioOptions[idx][1]);
		
		if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
			agnityRadioBtn.setAttribute('disabled', true);

		if(checkedVal != null && radioOptions[idx][1] == checkedVal)
		{
			agnityRadioBtn.setAttribute('checked', 'checked');
		}

		var agnityLabel = document.createElement('label');
		agnityLabel.appendChild(agnityRadioBtn);
		mxUtils.write(agnityLabel, mxResources.get(radioOptions[idx][0]));

		optionDiv.appendChild(agnityLabel);
		rowDiv.appendChild(optionDiv);

		mxEvent.addListener(agnityRadioBtn, 'click', onChangeHandler);
	}

	return rowDiv;
};

Agnity.createSearchButtonRowField = function(resourceTxt, onClickHandler)
{
	var buttonName = mxResources.get(resourceTxt);
	var helpTextVal = mxResources.get(resourceTxt + '_help');
	
	var rowDiv = document.createElement('div');
	rowDiv.setAttribute('class', 'AgnityFieldRow');

	var buttonField = mxUtils
			.button(buttonName, mxUtils.bind(this, onClickHandler));
	buttonField.setAttribute('class', 'AgnityFieldRowSearchButtonClass');
	buttonField.setAttribute('title', helpTextVal);

	rowDiv.appendChild(buttonField);

	return rowDiv;
};

function AgnitySelectPatternDropDown(inUi)
{
	this.ui = inUi;
	this.selectHolder = null;
	this.selectedValue = null;
	this.resourceTxt = null;
	this.onSelectionChangeHandler = null;
	this.dataProvider = null;
	this.agnitySelectOptions = null;
	this.textVal = '';
	
	this.setupSearchWidget = function(resourceTxt, onChangeHandler)
	{
		var self = this;
		self.resourceTxt = resourceTxt;
		
		self.searchWidget = Agnity.createInputTextRowField(this.textVal, this.resourceTxt, onChangeHandler);
		
		return self.searchWidget;
	}
	
	this.setupWidget = function(dataProvider, selectedValue, resourceTxt, onSelectionChangeHandler)
	{
		var self = this;
		self.selectedValue = selectedValue;
		self.dataProvider = dataProvider;
		self.resourceTxt = resourceTxt;
		self.onSelectionChangeHandler = onSelectionChangeHandler;
		self.setupVariables = Agnity.createDynamicDropDownSelectRowField(this.dataProvider, 
	                                    this.selectedValue,
	                                    this.resourceTxt, onSelectionChangeHandler);
		
		self.agnitySelectOptions = self.setupVariables[1];
		
		return self.setupVariables[0];
	}
	
	this.rebuildOptions = function(searchVal, patternType)
	{
		var self = this;
		var dataProvider = new AgnityGetFilteredPatternsHelper(Agnity.getTreeData(self.ui).forestName, Agnity.getUrlParam('diagram'), searchVal, patternType, Agnity.hasUrlReadonlyParam(), Agnity.getUrlParam('operationMode'), Agnity.getDomainName());
		dataProvider.fetchData(function(possibleValues)
		                      	{
									self.rebuildEntries(possibleValues, null);
		                      	});
	}
	
	this.rebuildEntries = function(possibleValues, selectedValue)
	{
		this.agnitySelectOptions.innerHTML = '';

		for(var idx = 0; idx < possibleValues['data'].length; idx++)
		{
			var createOption = document.createElement('option');

			if(possibleValues['data'][idx].id != null
					&& possibleValues['data'][idx].name != null)
			{
				createOption.value = possibleValues['data'][idx].id;
				createOption.text = possibleValues['data'][idx].name;
			}
			else
			{
				createOption.text = possibleValues['data'][idx];
				createOption.value = possibleValues['data'][idx];
			}

			if((selectedValue == null || selectedValue == '') && idx == 0)
			{
				createOption.selected = "selected";
			}

			if(selectedValue == createOption.value)
			{
				createOption.selected = "selected";
			}

			this.agnitySelectOptions.add(createOption, idx);
		}
	}
}

function AgnityDialogHelper()
{
	this.parentDiv = null;
	this.headingDiv = null;
	this.detailPageDiv = null;
	this.detailPageActionDiv = null;
	this.listingPageDiv = null;
	this.dialogActionDiv = null;
	this.errorMsgDiv = null;

	this.showHeading = false;
	this.showDetailPage = false;
	this.showDetailPageAction = false;
	this.showListingPage = false;
	this.showDialogAction = false;
	this.showErrorMsg = false;
	
	this.listActions = [['load', 'geSprite-insert'], ['delete', 'geSprite-delete']];
	
	this.heading = '';
	this.numberOfCols = 0;
	this.numberOfRows = 0;
	
	this.severity = '';
	this.stdErrMsg = '';
	this.additionalErrMsg = '';
	
	this.detailPageContentHolder = [];	
	this.detailPageActions = [];

	this.listingColumns = [];
	this.listingDataModel = null;
	this.listingActionCallback = null;
	this.actionFilterCallback = null;
	this.appwiseMap = {};

	this.dialogActions = [];
	
	this.setHeading = function(newHeading)
	{
		this.showHeading = true;
		this.heading = newHeading;
		this.setupHeadingDiv();
	}

	this.setErrorMsgPanel = function(severity, stdErrorMsg, additionalMsg)
	{
		this.showErrorMsg = true;
		this.severity = severity;
		this.stdErrMsg = stdErrorMsg;
		this.additionalErrMsg = additionalMsg;
		this.setupErrorMsgDiv();
	}
	
	this.setDetailPageGrid = function(inNumberOfRows, inNumberOfCols)
	{
		this.showDetailPage = true;
		this.numberOfRows = inNumberOfRows;
		this.numberOfCols = inNumberOfCols;
		this.setupDetailPageDiv();
	}
	
	this.addRowPanelToDetailPageGrid = function(row, col, panel1, panel2)
	{
		this.detailPageContentHolder[row][col].innerHTML = '';
		this.detailPageContentHolder[row][col].appendChild(panel1);
		this.detailPageContentHolder[row][col].appendChild(panel2);
		this.detailPageContentHolder[row][col].childNodes[1].setAttribute('style', 'display: none;');
	}

	this.clearDetailPageGridPanel = function(row, col)
	{
		this.detailPageContentHolder[row][col].innerHTML = '';		
	}
	
	this.addPanelToDetailPageGrid = function(row, col, panel, rowspan)
	{
		this.detailPageContentHolder[row][col].innerHTML = '';
		this.detailPageContentHolder[row][col].appendChild(panel);
		if(rowspan)
		{
			this.detailPageContentHolder[row][col].setAttribute('rowspan', rowspan);
		}
	}

	this.appendPanelToDetailPageGrid = function(row, col, panel)
	{
		this.detailPageContentHolder[row][col].appendChild(panel);
	}	
	
	this.setDetailPageActions = function(actionButtonDetails)
	{
		this.showDetailPageAction = true;
		this.detailPageActions = actionButtonDetails;
		this.setupDetailPageActionDiv();
	}
	
	this.setRelatedListing = function(columnDetails, dataModel, callback, actionFilterCallback)
	{
		this.showListingPage = true;
		this.listingColumns = columnDetails;
		this.listingDataModel = dataModel;
		this.listingActionCallback = callback;
		this.actionFilterCallback = actionFilterCallback;
		this.setupListingPageDiv();
	}

	this.setCasManageListing = function(columnDetails, dataModel, callback, actionFilterCallback, appwiseMap)
	{
		this.showListingPage = true;
		this.listingColumns = columnDetails;
		this.listingDataModel = dataModel;
		this.listingActionCallback = callback;
		this.actionFilterCallback = actionFilterCallback;
		this.appwiseMap = appwiseMap;
		this.setupCasManageDiv();
	}

	this.setDialogActions = function(actionButtonDetails)
	{
		this.showDialogAction = true;
		this.dialogActions = actionButtonDetails;
		this.setupDialogActionDiv();
	}
	
	this.setupHeadingDiv = function()
	{
		if(!this.showHeading) return;
		if(this.headingDiv == null)
		{
			this.headingDiv = document.createElement('div');
		}

		this.headingDiv.innerHTML = '';
		
		this.headingDiv.setAttribute('class', 'AgnityDialogHeadingDiv');
		var contentDiv = document.createElement('center');
		this.headingDiv.appendChild(contentDiv);
		var value =  mxResources.get(this.heading);
		if(value != null)
			mxUtils.write(contentDiv, value);
		else
			mxUtils.write(contentDiv, this.heading);
	}
		
	this.setupErrorMsgDiv = function()
	{
		if(!this.showErrorMsg) return;
		
		if(this.errorMsgDiv == null)
		{
			this.errorMsgDiv = document.createElement('div');
		}
		
		this.errorMsgDiv.setAttribute('class', 'AgnityDialogErrorMsgDiv');
						
		var severityImg = document.createElement('img');
		severityImg.setAttribute('src', '../images/' + this.severity + '.png');
		this.errorMsgDiv.appendChild(severityImg);
		
		var contentDiv = document.createElement('div');
		contentDiv.setAttribute('class', 'AgnityDialogErrorContentDiv');
		
		var stdErrMsgElt = document.createElement('p');
		mxUtils.write(stdErrMsgElt, mxResources.get(this.stdErrMsg));	
		contentDiv.appendChild(stdErrMsgElt);
		
		var additionalErrMsgElt = document.createElement('p');
		mxUtils.write(additionalErrMsgElt, this.additionalErrMsg);	
		contentDiv.appendChild(additionalErrMsgElt);
		
		this.errorMsgDiv.appendChild(contentDiv);
	}
	
	this.setupDetailPageDiv = function()
	{
		if(!this.showDetailPage) return;
		
		if(this.detailPageDiv == null)
		{
			this.detailPageDiv = document.createElement('div');
		}

		this.detailPageDiv.innerHTML = '';

		this.detailPageContentHolder = new Array(this.numberOfRows);
		this.detailPageDiv.setAttribute('class', 'AgnityDialogDetailPageDiv');
		
		var tableElement = document.createElement('table');
		if(this.numberOfCols == 1)
		{
			tableElement.setAttribute('class', 'AgnityDialogDetailPageSingleColTable');
		}
		else if(this.numberOfCols == 2)
		{
			tableElement.setAttribute('class', 'AgnityDialogDetailPageTwoColTable');			
		}
		else if(this.numberOfCols == 3)
		{
			tableElement.setAttribute('class', 'AgnityDialogDetailPageThreeColTable');						
		}
		else
		{
			tableElement.setAttribute('class', 'AgnityDialogDetailPageFourColTable');
		}
			
		this.detailPageDiv.appendChild(tableElement);
		
		for(var row = 0; row < this.numberOfRows; row++)
		{
			this.detailPageContentHolder[row] = new Array(this.numberOfCols);
			var trElement = document.createElement('tr');
			tableElement.appendChild(trElement);
			for(var col = 0; col < this.numberOfCols; col++)
			{
				var tdElement = document.createElement('td');
				trElement.appendChild(tdElement);
				this.detailPageContentHolder[row][col] = tdElement;
			}
		}
	}
	
	this.setupDetailPageActionDiv = function(enableLockStatus)
	{
		if(!this.showDetailPageAction) return;
		if(this.detailPageActionDiv == null)
		{
			this.detailPageActionDiv = document.createElement('div');
		}

		this.detailPageActionDiv.innerHTML = '';
		this.detailPageActionDiv.setAttribute('class', 'AgnityDialogDetailPageActionDiv');
		
		for(var idx = 0; idx < this.detailPageActions.length; idx++)
		{
			var currActionInfo = this.detailPageActions[idx];
			
			var currButton = mxUtils.button(mxResources.get(currActionInfo.name), currActionInfo.func);
			currButton.setAttribute('class', 'AgnityDialogDetailPageActionButton');
			if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
				currButton.classList.add('AgnityDisableIcon');
			this.detailPageActionDiv.appendChild(currButton);
		}
	}

	this.setupListingPageDiv = function()
	{
		if(!this.showListingPage) return;
		var self = this;
		if(this.listingPageDiv == null)
		{
			this.listingPageDiv = document.createElement('div');
		}
		
		this.listingPageDiv.innerHTML = '';
		this.listingPageDiv.setAttribute('class', 'AgnityDialogListingPageDiv');
		
		var headHolder = document.createElement('div');
		this.listingPageDiv.appendChild(headHolder);
		headHolder.setAttribute('class', 'AgnityDialogListingPageHeadDiv');
		
		var tableElement = document.createElement('table');
		tableElement.setAttribute('class', 'AgnityDialogListingPageHeadTable');						
		headHolder.appendChild(tableElement);
		
		var tableHeadElement = document.createElement('thead');
		tableHeadElement.setAttribute('class', 'AgnityDialogListingPageTableHead');						
		tableElement.appendChild(tableHeadElement);

		var tableHeadRowElement = document.createElement('tr');
		tableHeadRowElement.setAttribute('class', 'AgnityDialogListingPageTableHeadRow');						
		tableHeadElement.appendChild(tableHeadRowElement);

		for(var col = 0; col < this.listingColumns.length; col++)
		{
			if(this.listingColumns[col].bulkOperation) {
				var tdElement = document.createElement('th');
				tdElement.style.width = this.listingColumns[this.listingColumns.length - 1].width;
				// trElement.appendChild(tdElement);
				
				//var status = this.listingDataModel.getEntry(row, 2).toLowerCase();
				var actions = this.listActions;
				
				if(this.actionFilterCallback != null)
				{
					actions =[this.listActions[1], this.listActions[4]];
				}
				// let label = document.createElement('div')
				// label.innerHTML = "Actions";
				// tdElement.appendChild(label);
				for(var idx = 0; idx < actions.length; idx++)
				{
					var actionButton = this.setupLinkActionButton(actions[idx][0]+"All", 0, actions[idx][1]);
					actionButton.id = actions[idx][0]+"All";
					let self = this;
					actionButton.onclick =function(){
						self.listingColumns[col].onClick(this.id);
					}
					tdElement.appendChild(actionButton);
				}
				tableHeadRowElement.appendChild(tdElement);
			} else {
				var thElement = document.createElement('th');
				thElement.style.width = this.listingColumns[col].width;
				mxUtils.write(thElement, mxResources.get(this.listingColumns[col].name));	
				tableHeadRowElement.appendChild(thElement);
			}
		}
		
		var bodyHolder = document.createElement('div');
		this.listingPageDiv.appendChild(bodyHolder);
		bodyHolder.setAttribute('class', 'AgnityDialogListingPageBodyDiv');
		
		tableElement = document.createElement('table');
		tableElement.setAttribute('class', 'AgnityDialogListingPageBodyTable');						
		bodyHolder.appendChild(tableElement);
		
		if(this.listingDataModel == null) return;
		
		for(var row = 0; row < this.listingDataModel.getEntryCount(); row++)
		{
			var trElement = document.createElement('tr');
			trElement.setAttribute('class', 'AgnityDialogListingPageTableEntryRow');						
			tableElement.appendChild(trElement);
			
			var isActionAvail = true;
			var listingColumnsLength = this.listingColumns.length - 1;
			if( (this.listActions == null || this.listActions.length == 0) &&  this.actionFilterCallback == null)
			{
				isActionAvail = false;
				listingColumnsLength = this.listingColumns.length;
			}


			for(var col = 0; col < listingColumnsLength; col++)
			{
				var tdElement = document.createElement('td');
				tdElement.style.width = this.listingColumns[col].width;
				trElement.appendChild(tdElement);
				if(this.listingDataModel.getColType(col) == 'html')
				{
					tdElement.innerHTML = this.listingDataModel.getEntry(row, col);
				}
				else
				{
					mxUtils.write(tdElement, this.listingDataModel.getEntry(row, col));
				}

				
			}
			
			if(isActionAvail)
			{
				var tdElement = document.createElement('td');
				tdElement.style.width = this.listingColumns[this.listingColumns.length - 1].width;
				trElement.appendChild(tdElement);

				//var status = this.listingDataModel.getEntry(row, 2).toLowerCase();
				var actions = this.listActions;

				if(this.actionFilterCallback != null)
				{
					actions = this.actionFilterCallback(this.listActions, this.listingDataModel.values[row]);
				}

				for(var idx = 0; idx < actions.length; idx++)
				{
					var actionButton = this.setupLinkActionButton(actions[idx][0], row, actions[idx][1]);
					tdElement.appendChild(actionButton);
				}
			}
		}
	}

	this.setupCasManageDiv = function()
	{
		if(!this.showListingPage) return;
		var self = this;
		if(this.listingPageDiv == null)
		{
			this.listingPageDiv = document.createElement('div');
		}
		
		this.listingPageDiv.innerHTML = '';
		this.listingPageDiv.setAttribute('class', 'AgnityDialogListingPageDiv');
		
		var headHolder = document.createElement('div');
		this.listingPageDiv.appendChild(headHolder);
		headHolder.setAttribute('class', 'AgnityDialogListingPageHeadDiv');
		
		var tableElement = document.createElement('table');
		tableElement.setAttribute('class', 'AgnityDialogListingPageHeadTable');						
		headHolder.appendChild(tableElement);
		
		var tableHeadElement = document.createElement('thead');
		tableHeadElement.setAttribute('class', 'AgnityDialogListingPageTableHead');						
		tableElement.appendChild(tableHeadElement);

		var tableHeadRowElement = document.createElement('tr');
		tableHeadRowElement.setAttribute('class', 'AgnityDialogListingPageTableHeadRow');						
		tableHeadElement.appendChild(tableHeadRowElement);

		for(var col = 0; col < this.listingColumns.length; col++)
		{
			if(this.listingColumns[col].bulkOperation) {
				var tdElement = document.createElement('th');
				tdElement.style.width = this.listingColumns[this.listingColumns.length - 1].width;
				// trElement.appendChild(tdElement);
				
				//var status = this.listingDataModel.getEntry(row, 2).toLowerCase();
				var actions = this.listActions;
				
				if(this.actionFilterCallback != null)
				{
					actions =[this.listActions[1], this.listActions[4]];
				}
				// let label = document.createElement('div')
				// label.innerHTML = "Actions";
				// tdElement.appendChild(label);
				for(var idx = 0; idx < actions.length; idx++)
				{
					var actionButton = this.setupLinkActionButton(actions[idx][0]+"All", 0, actions[idx][1]);
					actionButton.id = actions[idx][0]+"All";
					let self = this;
					actionButton.onclick =function(){
						self.listingColumns[col].onClick(this.id);
					}
					tdElement.appendChild(actionButton);
				}
				tableHeadRowElement.appendChild(tdElement);
			} else {
				var thElement = document.createElement('th');
				thElement.style.width = this.listingColumns[col].width;
				mxUtils.write(thElement, mxResources.get(this.listingColumns[col].name));	
				tableHeadRowElement.appendChild(thElement);
			}
		}
		
		var bodyHolder = document.createElement('div');
		this.listingPageDiv.appendChild(bodyHolder);
		bodyHolder.setAttribute('class', 'AgnityDialogListingPageBodyDiv');
		
		tableElement = document.createElement('table');
		tableElement.setAttribute('class', 'AgnityDialogListingPageBodyTable');						
		bodyHolder.appendChild(tableElement);
		
		if(this.listingDataModel == null) return;

		let parentTBody = document.createElement('tbody')
		tBody.appendChild(parentTBody);

		for(var row = 0; row < this.listingDataModel.getEntryCount(); row++)
		{
			let tBody = document.createElement('tbody')
	
			var trElement = document.createElement('tr');
			
			parentTBody.appendChild(tBody);

			trElement.setAttribute('class', 'AgnityDialogListingPageTableEntryRow');						
			tableElement.appendChild(tBody);
			
			var isActionAvail = true;
			var listingColumnsLength = this.listingColumns.length - 1;
			if( (this.listActions == null || this.listActions.length == 0) &&  this.actionFilterCallback == null)
			{
				isActionAvail = false;
				listingColumnsLength = this.listingColumns.length;
			}
			
				
			for(var col = 0; col < listingColumnsLength; col++)
			{
				var tdElement = document.createElement('td');
				tdElement.style.width = this.listingColumns[col].width;
				trElement.appendChild(tdElement);
				if(this.listingDataModel.getColType(col) == 'html')
				{
					tdElement.innerHTML = this.listingDataModel.getEntry(row, col);
				}
				else
				{
					mxUtils.write(tdElement, this.listingDataModel.getEntry(row, col));
				}
					
				
			}
			
			if(isActionAvail)
			{
				var tdElement = document.createElement('td');
				tdElement.style.width = this.listingColumns[this.listingColumns.length - 1].width;
				trElement.appendChild(tdElement);
				
				//var status = this.listingDataModel.getEntry(row, 2).toLowerCase();
				var actions = this.listActions;
				
				if(this.actionFilterCallback != null)
				{
					actions = this.actionFilterCallback(this.listActions, this.listingDataModel.values[row]);
				}
				
				for(var idx = 0; idx < actions.length; idx++)
				{
					var actionButton = this.setupLinkActionButton(actions[idx][0], row, actions[idx][1]);
					tdElement.appendChild(actionButton);
				}
			}
		}
	}
	
	this.setupLinkActionButton = function(action, rowIdx, imageClass, enableLockStatus)
	{
		var self = this;
		
		var divButton = document.createElement('div');
		divButton.classList.add('AgnityDialogListingPageTableEntryButton');
		divButton.title = mxResources.get(action);
		divButton.classList.add('geSprite');
		divButton.classList.add(imageClass);
		divButton.onclick = function()
		{
			self.listingActionCallback(action, rowIdx);
		}
		if(Agnity.hasUrlReadonlyParam() || (enableLockStatus && !Agnity.hasLockAcquired()))
			divButton.classList.add('AgnityDisableIcon');
		return divButton;
	}
	
	this.setupListingActionButton = function(action, rowIdx)
	{
		var self = this;
		return mxUtils.button(mxResources.get(action), function(event)
        {			
			self.listingActionCallback(action, rowIdx);
        });
	}
	
	this.setupDialogActionDiv = function()
	{
		if(!this.showDialogAction) return;
		if(this.dialogActionDiv == null)
		{
			this.dialogActionDiv = document.createElement('div');
		}

		this.dialogActionDiv.innerHTML = '';
		this.dialogActionDiv.setAttribute('class', 'AgnityDialogActionDiv');
		
		for(var idx = 0; idx < this.dialogActions.length; idx++)
		{
			var currActionInfo = this.dialogActions[idx];
			
			var currButton = mxUtils.button(mxResources.get(currActionInfo.name), currActionInfo.func);
			currButton.setAttribute('class', 'AgnityDialogActionButton');
			this.dialogActionDiv.appendChild(currButton);
		}
	}
	
	this.setupContainer = function()
	{
		if(this.parentDiv == null)
		{
			this.parentDiv = document.createElement('div');
		}
		this.parentDiv.innerHTML = '';
		this.parentDiv.setAttribute('class', 'AgnityDialogDiv');
		
		if(this.headingDiv == null) this.setupHeadingDiv();
		if(this.detailPageDiv == null) this.setupDetailPageDiv();
		if(this.detailPageActionDiv == null) this.setupDetailPageActionDiv();
		if(this.listingPageDiv == null) this.setupListingPageDiv();
		if(this.dialogActionDiv == null) this.setupDialogActionDiv();
				
		if(this.showHeading) this.parentDiv.appendChild(this.headingDiv);
		if(this.showDetailPage) this.parentDiv.appendChild(this.detailPageDiv);
		if(this.showDetailPageAction) this.parentDiv.appendChild(this.detailPageActionDiv);
		if(this.showListingPage) this.parentDiv.appendChild(this.listingPageDiv);
		if(this.showErrorMsg) this.parentDiv.appendChild(this.errorMsgDiv);
		if(this.showDialogAction) this.parentDiv.appendChild(this.dialogActionDiv);
		
		return this.parentDiv;
	}
}

function AgnityDialogListingModel(values, colNames)
{
	this.values = values;
	this.colNames = colNames;
	this.getEntryCount = function()
	{
		if(!this.values) return 0;
		return this.values.length;
	}
	
	this.getEntry = function(row, col)
	{
		var currEntry = this.values[row];
		
		if(currEntry instanceof String) return currEntry;
		
		var colInfo = colNames[col];
		
		if(Array.isArray(colInfo))
		{
			var currValue = currEntry[colInfo[0]];
			var translations = colInfo[1];
			
			for(var idx = 0; idx < translations.length; idx++)
			{
				if(currValue == translations[idx][1])
				{
					return mxResources.get(translations[idx][0]);
				}
			}
			
			return currValue;
		}
		
		if(typeof colInfo === 'object')
		{
			var value = currEntry[colInfo['head']];

			if (colInfo.hasOwnProperty('value'))
				value = colInfo['value'][value];

			if (colInfo.hasOwnProperty('formatter'))
				return colInfo['formatter'](value, currEntry);

			else
				return value;
		}

		return currEntry[colNames[col]];
	}	


	this.getColType = function(col)
	{
		var colInfo = colNames[col];
		if(typeof colInfo === 'object' && colInfo.hasOwnProperty('type'))
		{
			return colInfo['type'];
		}

		return 'text';
	}
}

Agnity.getDialogListingModelFromMap = function(variableMap, colNames)
{
	var values = Agnity.convertMapToArray(variableMap);
	return new AgnityDialogListingModel(values, colNames);
}

Agnity.getOutlinePanel = function(editorUi)
{
	var graph = editorUi.editor.graph;
	this.updateOutline = null;
	
	var outlineSection = document.createElement('div');
	outlineSection.setAttribute('class', 'AgnityOutlineSection');
	
	var agnityLabel = document.createElement('label');
	
	var agnityLabelText = document.createTextNode(mxResources.get('navigator'));
	agnityLabel.appendChild(agnityLabelText);
	outlineSection.appendChild(agnityLabel);
	
	var outlineDiv = document.createElement('div');
	outlineDiv.setAttribute('id', 'AgnityOutlineMode');
	
	var outline = editorUi.createOutline(outlineDiv);
	
	var outlineCreateGraph = outline.createGraph;
	outline.createGraph = function(container)
	{
		var g = outlineCreateGraph.apply(this, arguments);
		g.gridEnabled = false;
		
		g.pageScale = graph.pageScale;
		g.pageFormat = graph.pageFormat;
		g.background = (graph.background == null || graph.background == mxConstants.NONE) ? graph.defaultPageBackgroundColor : graph.background;
		g.pageVisible = graph.pageVisible;

		var current = mxUtils.getCurrentStyle(graph.container);
		outlineDiv.style.backgroundColor = '#fff';//current.backgroundColor;
		
		return g;
	};
	
	this.updateOutline = function()
	{
		outline.outline.pageScale = graph.pageScale;
		outline.outline.pageFormat = graph.pageFormat;
		outline.outline.pageVisible = graph.pageVisible;
		outline.outline.background = (graph.background == null || graph.background == mxConstants.NONE) ? graph.defaultPageBackgroundColor : graph.background;;
		
		var current = mxUtils.getCurrentStyle(graph.container);
		outlineDiv.style.backgroundColor = "#fff";//current.backgroundColor;

		if (graph.view.backgroundPageShape != null && outline.outline.view.backgroundPageShape != null)
		{
			outline.outline.view.backgroundPageShape.fill = graph.view.backgroundPageShape.fill;
		}
		
		outline.outline.refresh();
	};
	
	outline.init(outlineDiv);

	editorUi.editor.addListener('resetGraphView', this.updateOutline);
	editorUi.addListener('pageFormatChanged', this.updateOutline);
	editorUi.addListener('backgroundColorChanged', this.updateOutline);
	editorUi.addListener('backgroundImageChanged', this.updateOutline);
	editorUi.addListener('pageViewChanged', function()
	{
		this.updateOutline;
		outline.update(true);
	});
	
	if (outline.outline.dialect == mxConstants.DIALECT_SVG)
	{
		var zoomInAction = editorUi.actions.get('zoomIn');
		var zoomOutAction = editorUi.actions.get('zoomOut');
		
		mxEvent.addMouseWheelListener(function(evt, up)
		{
			var outlineWheel = false;
			var source = mxEvent.getSource(evt);
	
			while (source != null)
			{
				if (source == outline.outline.view.canvas.ownerSVGElement)
				{
					outlineWheel = true;
					break;
				}
	
				source = source.parentNode;
			}
	
			if (outlineWheel)
			{
				if (up)
				{
					zoomInAction.funct();
				}
				else
				{
					zoomOutAction.funct();
				}
	
				mxEvent.consume(evt);
			}
		});
	}
	
	outlineSection.appendChild(outlineDiv);
	return outlineSection;
}

Agnity.showFormError = function(xhr)
{

	var paarseJSON = function(json){
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
	if(jsonRes)
	{
		response = "";
		for (var key in jsonRes) {
			var message = jsonRes[key];
			var messageProcessed = mxResources.get(message);
			if(!messageProcessed){
				messageProcessed = message;
			}

			response = response  + " " + messageProcessed;

		}

	}

	Agnity.showErrorMessage('critical', ['failedServerResponse', response]);

};

Agnity.showErrorMessage = function(severityResourceId, errorMsg, ui=agnityGlobalData.ui)
{
	// var ui = agnityGlobalData.ui;
	var stdErrMsgResourceId = '';
	var additionalErrMsg = '';

	if(errorMsg != null)
	{
		stdErrMsgResourceId = errorMsg[0];
		additionalErrMsg = 	errorMsg[1];
	}

	ui.actions.get('errorDialog').funct(severityResourceId, stdErrMsgResourceId, additionalErrMsg);
}

Agnity.loadDiagramXml = function(inUi, inData, inForestName, inTreeName, diagramType, callback)
{
	var ui = inUi;
	var forestName = inForestName;
	var treeName = inTreeName;
	var data = inData;
	
	ui.editor.graph.model.beginUpdate();
    try
    {
        ui.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
		agnityGlobalData.resetData();
		agnityGlobalData.prevSelectedCellData = (diagramType == 'component') ? Agnity.getComponentData(ui) : Agnity.getTreeData(ui)
        agnityGlobalData.sendMessageToParent('loadDiagram', {'name': treeName, 'forestName' : forestName, 'diagramType' : diagramType});

        ui.editor.graph.setSelectionCell(ui.editor.graph.getModel().getCell(0));
        ui.hideDialog();
    }
    catch (e)
    {
        error = e;
    }
    finally
    {
        ui.editor.graph.model.endUpdate();    
    }
    
    if(callback != null)
    	callback();
	
}

function AgnityInformationDialog(ui, msg)
{
	this.dialogHelper = new AgnityDialogHelper();
	this.msg = msg;
	
	this.parentDiv = null;
	this.saveOnClose = false;
	
	this.setupContainer = function()
	{
		var self = this;
		
		this.dialogHelper.setHeading('helpDialog');
		this.dialogHelper.setDetailPageGrid(1, 1);
		this.dialogHelper.addPanelToDetailPageGrid(0, 0, Agnity.displayTextInfo(self.msg));
		this.dialogHelper.setDialogActions([{'name':'close', 'func':function() {
			
			ui.hideDialog.apply(ui, arguments);
		}}]);
		
		this.parentDiv = this.dialogHelper.setupContainer();
	}
}