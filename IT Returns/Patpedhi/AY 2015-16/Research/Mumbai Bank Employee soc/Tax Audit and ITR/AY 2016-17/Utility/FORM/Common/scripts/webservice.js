	$(".date_dummy_black").datepicker({

			changeMonth : true,
			changeYear : true,
			yearRange: "-100:+5",
			dateFormat : "dd/mm/yy",
			buttonText : "Choose",
			showOtherMonths : true,
			selectOtherMonths : true
		});
		
function validateField_userName(field) {
	
	var errors = false;
	var continueValidation = true;
	var row = (field.type != null) ? field : field[0];
         
	if (continueValidation
			&& (row.value != null)
			&& ((row.value == '') || (row.value.replace(/^\s+|\s+$/g, '').length == 0))) {
		var error = "Please enter the User ID.";
		addError(row, error);
		errors = true;
		continueValidation = false;
	}
	if (continueValidation && field.value != null) {
		var value = field.value;
		if ((7 > -1 && value.length < 7) || (10 > -1 && value.length > 10)) {
			var error = "Invalid User ID. Please retry.";
			addError(field, error);
			errors = true;
			continueValidation = false;
		}
	}
	var row = (field.type != null) ? field : field[0];
	if (continueValidation
			&& row.value != null
			&& !row.value
					.match("^[A-Za-z]{3}[JjLlBbTtAaCcFfHhPpGg]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$|^[Ee][Rr][Ii][UuAaTt][0-9]{6}$|^[Ii][Tt][Dd][Uu][0-9]{6}$|^[Hh][Dd][Ss][Kk][0-9]{6}$|^[Aa][Rr][Cc][Aa][0-9]{6}$|^[Nn][Ss][Dd][Ll][0-9]{6}$|^[Ee][Xx][Tt][Aa][0-9]{6}$|^[A-Za-z]{4}[0-9]{5}[A-Za-z]{1}$|^[Tt][Ff][Cc][Aa][0-9]{6}$|^[Tt][Ff][Cc][uU][0-9]{6}$")) {
		var error = "Invalid User ID. Please retry.";
		addError(row, error);
		errors = true;
		continueValidation = false;
	}
        
	return !errors;
}

function validateField_password(field) {
	
	var errors = false;
	var continueValidation = true;
	var row = (field.type != null) ? field : field[0];
        
	if (continueValidation
			&& (row.value != null)
			&& ((row.value == '') || (row.value.replace(/^\s+|\s+$/g, '').length == 0))) {
		var error = "Please enter a Password.";
		addError(row, error);
		errors = true;
		continueValidation = false;
               
	}
	if (continueValidation && field.value != null) {
		var value = field.value;
		if ((8 > -1 && value.length < 8) || (14 > -1 && value.length > 14)) {
			var error = "Invalid Password. Please retry.";
			addError(field, error);
			errors = true;
			continueValidation = false;                        
		}
	}
        
	return !errors;
}
function validateField_dob(field) {
	var errors = false;
	var continueValidation = true;
	var row = (field.type != null) ? field : field[0];
        var userId = document.getElementsByName('userId')[0].value;
        if(userId.match("^[A-Za-z]{4}[0-9]{5}[A-Za-z]{1}")){
            continueValidation = false;
        }
	if (continueValidation
			&& (row.value != null)
			&& ((row.value == '') || (row.value.replace(/^\s+|\s+$/g, '').length == 0))) {
		var error = "Please enter a Date Of Birth.";
		addError(row, error);
		errors = true;
		continueValidation = false;
	}
	if (continueValidation && (field.value != null) && !checkDate(field.value)) {
		var error = "Incorrect Date of Birth/Incorporation. Please retry.";
		addError(field, error);
		errors = true;
		continueValidation = false;
	}
        
        var row = (field.type != null) ? field : field[0];
	if (continueValidation
			&& row.value != null
			&& !row.value
					.match("^[0-9]{2}(/)[0-9]{2}(/)[0-9]{4}$")) {
		var error = "Invalid Date. Please enter date in dd/mm//yyyy format.";
		addError(row, error);
		errors = true;
		continueValidation = false;
	}
	return !errors;
}		
function enableFields(val){
	if(!val){
	document.getElementById('step2Id').style.display="none";
	
			document.getElementsByName('validate')[0].value="Validate XML";
			
	}else{
			document.getElementById('step2Id').style.display="block";
			
			document.getElementsByName('validate')[0].value="Submit ITR";
			
	}
	
}		

function validateField_dscFlag(field){
	var errors = false;
	if(field!=undefined && !field[0].checked && !field[1].checked){
		var error = "Please select 'Do you want to digitally sign?'";
		addError(document.getElementsByName('dscFlag')[0], error);
		errors = true;
	}
	return !errors;
}



function validateField_dscTypeFlag(field){
	var errors = false;
	if(document.getElementsByName('dscFlag')[0].checked)
	if(!field[0].checked && !field[1].checked){
		var error = "Please select the type of Digital Signature Certificate.";
		addError(document.getElementsByName('typeOfDsc')[0], error);
		errors = true;
	}
	if(!errors){
		var flag=document.getElementsByName('typeOfDsc')[1].checked;
		if(flag){
			if(document.getElementsByName('usbToken')[0].value=='-1'){
				var error = "Please select Certificate.";
				addError(document.getElementsByName('usbToken')[0], error);
				errors = true;
			}
		}
	}
	return !errors;
}

function validateField_keyStoreFile(field){
	var errors = false;
	
	if(document.getElementsByName('typeOfDsc')[0].checked){
		var len=document.getElementById('pfxVal').innerHTML.length;
		if(len==0){
			var error="Please select your certificate keystore file(.PFX/.P12).";
			addError(document.getElementsByName('keystoreFile')[0], error);
			errors = true;
		}
	}
	return !errors;
}
function validateField_keyStoreFilePass(field){
	var errors = false;
	
	if(document.getElementsByName('typeOfDsc')[0].checked){
		var len=document.getElementsByName('keystoreKey')[0].value.length;
		if(len==0){
			var error="Please enter the password for your private key.";
			addError(document.getElementsByName('keystoreKey')[0], error);
			errors = true;
		}
	}
	return !errors;
}


function validateOnSubmit(){
	var errors = true;
	try{
	var form=document.forms[0];
        // alert("userId...."+document.getElementsByName('userId')[0].value);
       // alert("password...."+document.getElementsByName('password')[0].value);
	errors = validateField_keyStoreFilePass(document.getElementsByName('keystoreKey')) && errors;
	errors = validateField_keyStoreFile(document.getElementsByName('keystoreFile')) && errors;
	errors = validateField_dscTypeFlag(document.getElementsByName('typeOfDsc')) && errors;
	errors = validateField_dscFlag(document.getElementsByName('dscFlag')) && errors;
	errors = validateField_dob(document.getElementsByName('dob')[0]) && errors;
	errors = validateField_password(document.getElementsByName('password')[0]) && errors;
	errors = validateField_userName(document.getElementsByName('userId')[0]) && errors;
        alert("FINAL errors...."+errors);	
	}catch(e){
		alert('validateOnSubmit: '+e);
		errors=false;
	}
	return errors;
}




function setFormFile(index,file){
var row=document.getElementById('xmlTable').insertRow(-1);
row.insertCell(0).innerHTML=index;

var checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.name = "form.form64.form62Entity.webserviceUtilBulk[0].chosenCheckBox";
checkbox.value = file;
checkbox.id = index;
var cell1=row.insertCell(1);
cell1.appendChild(checkbox);

var cell=row.insertCell(2);
var aTag=document.createElement('span');
            var onclick="main.openDraftForm('"+index+"');";
	aTag.setAttribute('onclick','');
	aTag.setAttribute('href',"#");
	aTag.innerHTML=file;
	cell.appendChild(aTag);

row.insertCell(3).innerHTML='---';
row.insertCell(4).innerHTML='---';
row.insertCell(5).innerHTML='---';
row.insertCell(6).innerHTML='---';
row.insertCell(7).innerHTML='---';

}
function setValues(vals){
	var values=vals.split(',');
	document.getElementsByName('asstYear')[0].value=values[0];
	document.getElementsByName('formName')[0].value=values[1];
	document.getElementsByName('verPan')[0].value=values[2];
	document.getElementsByName('dob')[0].value=values[3];
	document.getElementsByName('userPan')[0].value=values[4];
}

function setEmpty(){
	document.getElementById('fileVal').innerHTML='';
	document.getElementsByName('asstYear')[0].value='';
	document.getElementsByName('formName')[0].value='';
	document.getElementsByName('verPan')[0].value='';
	document.getElementsByName('dob')[0].value='';
	document.getElementsByName('userPan')[0].value='';
	
	$('#schemaError').hide();
	enableFields(false);
}
function setSchemaErrors(index,error,fileName){
alert('setSchemaError inside: '+index+'error: '+error);
	var row=document.getElementById('xmlTable');
	var cell=row.rows[index].cells[4];
	cell.innerHTML='';
	var aTag=document.createElement('a');
	var onclick="showError('"+error+"','"+fileName+"');";
	aTag.setAttribute('onclick',onclick);
	aTag.setAttribute('href',"#");
	aTag.innerHTML='Failed';
	cell.appendChild(aTag);
	row.rows[index].scrollIntoView();
}

function setNoSchemaErrors(index){
	alert('setNoSchemaErrors inside: '+index);
	var row=document.getElementById('xmlTable');
	var cell=row.rows[index].cells[4];
	cell.innerHTML='Passed';
	row.rows[index].scrollIntoView();
}

function showError(error,fileName){
	alert('showError called: '+error+',fileName:'+fileName);
	error=error.replace('<br/>','\n');
	main.generateWebServiceErrorDialog(error,true,fileName);
}





function enableDscSign(){
	var dsc=document.getElementsByName('dscFlag');
	if(dsc[0].checked){
		$('.typeDsc').show();
	}else{
		$('.typeDsc').hide();
		$('.typeDsc2').hide();
		uncheck('typeOfDsc');
	}
}
function enableDscType(){
try{
	var dscType=document.getElementsByName('dscFlag');
	var dscTypeTemp=document.getElementsByName('typeOfDsc');
	alert(dscTypeTemp);
	alert(dscTypeTemp[0].checked);
	if(dscType[0].checked){
		$('.typeDsc2').show();
		if(dscTypeTemp[0].checked){
			document.getElementById('pfxVal').style.display="block";
			document.getElementsByName('keystoreFile')[0].style.display="block";
			document.getElementsByName('usbToken')[0].style.display="none";
			document.getElementById('usbTokenVals').style.display="none";
		}else{
			document.getElementById('pfxVal').style.display="none";
			document.getElementsByName('keystoreFile')[0].style.display="none";
			document.getElementsByName('usbToken')[0].style.display="block";
			document.getElementById('usbTokenVals').style.display="block";
			document.getElementById('usbTokenVals').innerHTML='';
			j.checkUsbToken();
		}
	}else{
		$('.typeDsc2').hide();
	}
	}catch(e){alert(e);};
}
$('.typeDsc').hide();
$('.typeDsc2').hide();
$('.typeDsc0').hide();
function createXml(){


	var userId=document.getElementsByName('userId')[0].value;
	var password=document.getElementsByName('password')[0].value;
	var dob=document.getElementsByName('dob')[0].value;
	var dscFlag=document.getElementsByName('dscFlag')[0].value;
	var keystoreKey=document.getElementsByName('keystoreKey')[0].value;
	var auditFlag=document.getElementsByName('auditFlag')[0].value;
	
	
	j.submitITR();
}
function showResults(index,transactionId,ackNo){
	var row=document.getElementById('xmlTable');
	row.rows[index].cells[6].innerHTML=transactionId;
        row.rows[index].cells[7].innerHTML=ackNo;
	row.rows[index].cells[5].innerHTML='Processed';
	row.rows[index].scrollIntoView();
	
}
function toUpper(field){
	field.value=field.value.toUpperCase();
}
function uncheck(field){
	document.getElementsByName(field)[0].checked=false;
	document.getElementsByName(field)[1].checked=false;
}
function backToSubmitItr(){
	document.getElementById('resultsDiv').style.display="none";
	document.getElementById('submitItr').style.display="block";
}


function itrvSuccess(path){

}

function clearFiles(){
	var row=document.getElementById('xmlTable');
	var length=row.rows.length;
	for(var i=1;i<length;i++){
		row.deleteRow(-1);
		alert('delete file');
	}
	document.getElementById('browseFile').disabled=false;
	document.getElementById('addMoreFiles').disabled="disabled";
	document.getElementById('deleteFiles').disabled="disabled";
	document.getElementById('showXmls').style.display='none';
	document.getElementsByName('submit')[0].disabled='disabled';
}

function selectAllFiles(){
    var row=document.getElementById('xmlTable');
     var all = document.getElementById("all");
     alert(all.checked);
    var listOfCheckBox = row.getElementsByTagName('input');
  
     for(var z=0; z<listOfCheckBox.length; z++){  
         if(listOfCheckBox[z].name.match(".chosenCheckBox$")){            
          if(all.checked == true){
                listOfCheckBox[z].checked = true;
          }else if(all.checked == false){
                   listOfCheckBox[z].checked = false;
          }
         }
     }
            
         
}

function getFileSN(){
    var row=document.getElementById('xmlTable');
    var listOfCheckBox = row.getElementsByTagName('input');
    alert("row.rows.length ........."+row.rows.length+" , "+row.rows[row.rows.length-1]);
    alert("getFileSN .."+row.rows[row.rows.length-1].cells[0].innerHTML);
   //  alert("getFileSN..."+row.);
    return row.rows[row.rows.length-1].cells[0].innerHTML;
    
}

function clearCheckedFiles(){
	var row=document.getElementById('xmlTable');
	var listOfCheckBox = row.getElementsByTagName('input');
        var obj=new Array();
        var obj1=new Array();
      
        for(var z=0; z<listOfCheckBox.length; z++){            
		if(listOfCheckBox[z].name.match(".chosenCheckBox$")){
			if(listOfCheckBox[z].checked==true){				                                                               
                               var index = listOfCheckBox[z].id;                                                         
                               obj1[obj1.length] = document.getElementById(index).parentNode.parentNode;                            
                               obj[obj.length]=index;                                 
                        }
                }
        }
        for(var i=0;i<obj1.length;i++){
            row.children[0].removeChild(obj1[i]);
        }
        if(listOfCheckBox.length<=0){
	 document.getElementById('browseFile').disabled=false;
         document.getElementById('addMoreFiles').disabled="disabled";
         document.getElementById('deleteFiles').disabled="disabled";
        }
        else{
         document.getElementById('browseFile').disabled=true;
         document.getElementById('addMoreFiles').removeAttribute('disabled');
         document.getElementById('deleteFiles').removeAttribute('disabled');
        }
	
	//document.getElementById('showXmls').style.display='none';
	document.getElementsByName('submit')[0].disabled='disabled';
        alert("totalChecked.."+obj);
        return obj;
}



function toggleSubmit(flag){
	document.getElementsByName('submit')[0].disabled=flag;
}

function toggleValidate(flag){
	document.getElementsByName('validate')[0].disabled=flag;
}

function validateXml(){
	var row=document.getElementById('xmlTable');
	if(row.rows.length==1){
		addError(document.getElementById('browseFile'), 'Please upload xml file/files.');
	}else{
		j.startValidationTask();
	}
}

function submitXmlDialog(field){
	document.getElementsByName('userId')[0].value='';
	document.getElementsByName('password')[0].value='';
	document.getElementsByName('dob')[0].value='';
	document.getElementsByName('keystoreKey')[0].value='';
	
	$( "#dialog" ).dialog( { width: 700 });
	$( "#dialog" ).dialog('open');
	
}
function submitXml(field){
try{
var errors=validateOnSubmit();
alert("submitXml..ERROR............"+errors);
	if(errors){
	j.startWebseviceTask();
	$( "#dialog" ).dialog('close');
	}
	}catch(e){alert('error in submitxml: '+e);}
}

function setPanAndName(index,pan,name){
var row=document.getElementById('xmlTable');
try{
	if(pan!=''){
		row.rows[index].cells[3].innerHTML=pan+'<br/>'+name;
	}else{	
		row.rows[index].cells[3].innerHTML=name;
	}
	}catch(e){alert(e);}
}


function showFault(index,error,fileName){
alert('showfault : '+error+'fileName'+fileName);
	var row=document.getElementById('xmlTable');
	row.rows[index].cells[5].innerHTML='';
	var cell=row.rows[index].cells[5];
	var aTag=document.createElement('a');
	var onclick="showError('"+error+"','"+fileName+"');";
	aTag.setAttribute('onclick',onclick);
	aTag.setAttribute('href',"#");
	aTag.innerHTML='Failed';
	cell.appendChild(aTag);
	
}

function setUsbDetails(element){
document.getElementById('usbTokenVals').style.display="block";
	document.getElementById('usbTokenVals').innerHTML=usbTokensDetails[element.value];
}
function getTokenAlial(){
//alert('document.getElementsByName("usbToken")[0].value: '+document.getElementsByName('usbToken')[0].value);
alert('document.getElementsByName("usbToken")[0].value: '+document.getElementsByName('usbToken')[0].value);

	return document.getElementsByName('usbToken')[0].value;
}

var usbTokensDetails=new Array();
function setUsbToken(alias,issuedBy,issuedTo,validForm,validTill){
	var select=document.getElementsByName('usbToken')[0];
	var option = document.createElement("option");
	option.text=alias;
	option.value=usbTokensDetails.length;
	select.add(option);
	usbTokensDetails[usbTokensDetails.length]='IssuedBy: '+issuedBy+'<br/>IssuedTo: '+issuedTo+'<br/> ValidForm: '+validForm+'<br/>ValidTill: '+validTill+'<br/>'
}


function hideDobForTan(userId){
  var dob = document.getElementsByName('dob')[0];
  if(userId.match("^[A-Za-z]{4}[0-9]{5}[A-Za-z]{1}")){
        dob.parentNode.parentNode.style.display='none';
  }else{
      dob.parentNode.parentNode.style.display='';
  }
    
}
