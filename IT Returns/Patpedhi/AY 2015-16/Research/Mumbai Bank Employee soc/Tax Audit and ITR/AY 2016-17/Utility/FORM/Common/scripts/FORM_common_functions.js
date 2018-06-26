function coalesce(value){	
	if (isNaN(value) || value=='') {
		value = '0';
	}
	return value;
}

function coalescePath(path){
try {
	
	var value= document.getElementsByName(path)[0].value;
	
	if (isNaN(value) || value=='') {
		value = parseInt(0, 10);
	}
	return parseInt(value,10);
	
}catch(e){
	alert('error = '+ e.stack);
}

}

function coalesceSetRet(path){
	try{		
		var myValue= document.getElementsByName(path)[0].value;
		if(isNaN(myValue)){
			addError(document.getElementsByName(path)[0],'Please Enter Numeric Value.');
			document.getElementsByName(path)[0].value='0';
		}else if (myValue == null || myValue=='') {
			document.getElementsByName(path)[0].value='0';
		}else{
			document.getElementsByName(path)[0].value = parseInt(document.getElementsByName(path)[0].value,10) ; //to remove initial zero
		}
		return parseInt(document.getElementsByName(path)[0].value,10);
	}catch(e){
		alert('error = '+ e.stack);
	}
}

function isNVL(value){
	if (value == null || isNaN(value) || value=='') {
		return '0';
	}else{
		return value;
	}	
}

function checkFirstDateBefore(firstDate,secondDate){
	if(eval(firstDate.substring(6,10)) < eval(secondDate.substring(6,10))){
		return true;
	}
	else if(eval(firstDate.substring(6,10)) == eval(secondDate.substring(6,10))){

		if(eval(firstDate.substring(3,5)) < eval(secondDate.substring(3,5))){
			return true;
		}
		else if(eval(firstDate.substring(3,5)) == eval(secondDate.substring(3,5))){
			if(eval(firstDate.substring(0,2)) < eval(secondDate.substring(0,2))){
				return true;
			}
			else if(eval(firstDate.substring(0,2)) == eval(secondDate.substring(0,2))){
				return true;
			}
			else
			{
				return false;
			}
		}
		else{
			return false;
		}
	}
	else {
	return false;
	}
}

function calcNoOfMonths(currentDate , startDate ){
	var currentYear = currentDate.substring(6,10); var startYear = startDate.substring(6,10);
	var currentMonth = currentDate.substring(3,5); var startMonth = startDate.substring(3,5);
	var noOfMonths = parseInt('0',10);
	
	if(currentYear==startYear &&  currentMonth==startMonth && 
		currentDate.substring(0,2) == startDate.substring(0,2)){
		
		noOfMonths = parseInt('1',20);
		
	}else if(checkFirstDateBefore(currentDate,startDate)) {
	
		noOfMonths = parseInt('0',20);
		
	}else {	
		if(parseInt(currentYear ,10) == (parseInt(startYear ,10) + parseInt('1' ,10))){
			if(parseInt(currentMonth ,10) < parseInt(startMonth ,10)){
				noOfMonths = parseInt('12' ,10) - (parseInt(startMonth ,10) -parseInt(currentMonth ,10)) + parseInt('1' ,10);
			} else{
				noOfMonths =  parseInt('12' ,10) + (parseInt(currentMonth ,10) - parseInt(startMonth ,10)) + parseInt('1' ,10);
			}
		} else if(parseInt(currentYear ,10) == parseInt(startYear ,10)){
			noOfMonths = parseInt(currentMonth ,10) - parseInt(startMonth ,10) + parseInt('1' ,10);
		} else{

			if(parseInt(currentMonth ,10) < parseInt(startMonth ,10)){
				noOfMonths =  Math.round((eval(parseInt(currentYear ,10) -parseInt(startYear ,10) - parseInt('1' ,10)) * parseInt('12' ,10))) + parseInt('12',10) - parseInt(startMonth ,10) + parseInt(currentMonth ,10) + parseInt('1' ,10);
			} else if(parseInt(currentMonth ,10) > parseInt(startMonth ,10)){

				noOfMonths =  Math.round(((parseInt(currentYear ,10) -parseInt(startYear ,10)) * parseInt('12' ,10))) + parseInt(currentMonth ,10) -parseInt(startMonth ,10) + parseInt('1' ,10);
			} else{
				noOfMonths =  Math.round(((parseInt(currentYear ,10) -parseInt(startYear ,10)) * parseInt('12' ,10))) + parseInt('1' ,10);
			}
		}
	}
	return noOfMonths;
}

function genderHiglight(element, startcolour, endcolour, time_elapsed) {
	var interval = 30;
	var steps = time_elapsed / interval;
	var red_change = (startcolour[0] - endcolour[0]) / steps;
	var green_change = (startcolour[1] - endcolour[1]) / steps;
	var blue_change = (startcolour[2] - endcolour[2]) / steps;
	var currentcolour = startcolour;
	var stepcount = 0;
	element.style.backgroundColor = 'rgb(' + currentcolour.toString() + ')';
	 var timer = setInterval(function(){
		currentcolour[0] = parseInt(currentcolour[0] - red_change);
		currentcolour[1] = parseInt(currentcolour[1] - green_change);
		currentcolour[2] = parseInt(currentcolour[2] - blue_change);
		element.style.backgroundColor = 'rgb(' + currentcolour.toString() + ')';
		stepcount += 1;
		if (stepcount >= steps) {
			element.style.backgroundColor = 'rgb(' + endcolour.toString() + ')';
			clearInterval(timer);
		}
	}, interval);
}

//calculates age as of 31-MAR-(assYr)
function calcAgeCommon(dob) {
	var assessmentYear = eval(parseInt(document.getElementsByName('customReturnType')[0].value.split('_')[1],10));
	var birth_year = parseInt(dob.value.substring(6,10) ,10);
	var birth_month = parseInt(dob.value.substring(3,5) ,10);
	var	birth_day = parseInt(dob.value.substring(0,2) ,10);

	var today_year = parseInt(assessmentYear ,10);
	var today_month = parseInt('3' ,10);
	var today_day = parseInt('31' ,10);

	age = today_year - birth_year;
	if( eval(today_month) <  eval(birth_month)){
		age--;
	} else if( (eval(today_month) == eval(birth_month)) && ( eval(today_day) < eval(birth_day) )){
		age--;
	}

	return age;
}

function addRowToTable(tableId, noOfRow, last, skipCheck) {
    try{
		var isRowBlank = checkRowBlank(tableId, noOfRow, last);
		
		if(skipCheck==false){
			isRowBlank = false;
		}
		
		if(isRowBlank == false){
			
			var tab = document.getElementById(tableId);
			var rowCount = tab.rows.length;
			var clone = tab.getElementsByTagName('tr')[rowCount - noOfRow].cloneNode(true);
			var lastRow = tab.getElementsByTagName('tr')[rowCount - last];			
			var allInputTags = clone.getElementsByTagName('input');			
			var serialNumber = eval(clone.getElementsByTagName('td')[0].innerHTML);
			var index = eval(allInputTags[0].name.substring(allInputTags[0].name.lastIndexOf("[")+1,allInputTags[0].name.lastIndexOf("]"))) + 1;
			
			clone.getElementsByTagName('td')[0].innerHTML = serialNumber + 1;
			for ( var i = 0; i < allInputTags.length; i++) {
			
				var classMme = allInputTags[i].getAttribute("class");
				var className = allInputTags[i].getAttribute("className");

				if (classMme == "date_dummy_black hasDatepicker" || className ==  "date_dummy_black hasDatepicker" ) {
					allInputTags[i].id = allInputTags[i].id + serialNumber;
					allInputTags[i].setAttribute("className","date_dummy_black");
					allInputTags[i].setAttribute("class","date_dummy_black");
					saras  = allInputTags[i].id;

				}else if( classMme == "date_dummy_white hasDatepicker" || className ==  "date_dummy_white hasDatepicker"  ){
					allInputTags[i].id = allInputTags[i].id + serialNumber;
					allInputTags[i].setAttribute("className","date_dummy_white");
					allInputTags[i].setAttribute("class","date_dummy_white");
					saras  = allInputTags[i].id;
				}

				allInputTags[i].value='';
				var inputelem = allInputTags[i].name;
				var inputelemLen = inputelem.length;
				var index1 = inputelem.lastIndexOf("[");
				var index2 = inputelem.lastIndexOf("]");
				if(eval(inputelem.length-1)==index2){
					index1=inputelem.indexOf("[");
					index2 = inputelem.indexOf("]");
				}
				var str1 = inputelem.substring(0, index1);                        
				var str3 = inputelem.substring(index2 + 1, inputelemLen);
				var name = str1 + '[' + index + ']' + str3;

				allInputTags[i].name = name;
				var blurAttr=allInputTags[i].getAttribute('onblur');
				if(blurAttr!=null){
					blurAttr=blurAttr+";";
				}else{
					blurAttr="";
				}
				allInputTags[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
			}
			
			var selectTags = clone.getElementsByTagName('select');

			for ( var i = 0; i < selectTags.length; i++) {

				var inputelem = selectTags[i].name;
				var inputelemLen = inputelem.length;
				var index1 = inputelem.lastIndexOf("[");
				var index2 = inputelem.lastIndexOf("]");
				if(eval(inputelem.length-1)==index2){
					index1=inputelem.indexOf("[");
					index2 = inputelem.indexOf("]");
				}
				var str1 = inputelem.substring(0, index1);

				var str3 = inputelem.substring(index2 + 1, inputelemLen);

				var name = str1 + '[' + index + ']' + str3;

				selectTags[i].name = name;
				var blurAttr=selectTags[i].getAttribute('onblur');
				if(blurAttr!=null){
					blurAttr=blurAttr+";";
				}else{
					blurAttr="";
				}
				selectTags[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
				var selectElem = selectTags[i];
				selectElem[0].selected = true;
			}
			var textareaTags = clone.getElementsByTagName('textarea');

			for ( var i = 0; i < textareaTags.length; i++) {
				var textareaElem = textareaTags[i].name;
				var textareaElemLen = textareaElem.length;
				var index1 = textareaElem.lastIndexOf("[");
				var index2 = textareaElem.lastIndexOf("]");
				if(eval(inputelem.length-1)==index2){
					index1=inputelem.indexOf("[");
					index2 = inputelem.indexOf("]");
				}
				var str1 = textareaElem.substring(0, index1);
				var str3 = textareaElem.substring(index2 + 1, textareaElemLen);
				var name = str1 + '[' + index + ']' + str3;
				textareaTags[i].name = name;
				var blurAttr=textareaTags[i].getAttribute('onblur');
				if(blurAttr!=null){
					blurAttr=blurAttr+";";
				}else{
					blurAttr="";
				}
				textareaTags[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
				textareaTags[i].value = '';
			}
			
			try {
				var parentNode = lastRow.parentNode;
				parentNode.insertBefore(clone, lastRow);
			}catch (e) {
				alert ('uma exceptoin :  ' + e );
			}
			
			var tab = document.getElementById(tableId);
			var rowCount = tab.rows.length;
			var lastRow = tab.getElementsByTagName('tr')[rowCount - last];
			var allInputTags = clone.getElementsByTagName('input');

			for ( var i = 0; i < allInputTags.length; i++) {
			
				var classMme = allInputTags[i].getAttribute("class");
				var className = allInputTags[i].getAttribute("className");
				
				
				if (classMme == "date_dummy_black" || className ==  "date_dummy_black" ||
					classMme == "date_dummy_white" || className ==  "date_dummy_white" ) {

					saras  = allInputTags[i].id;

						$(function() {
						$( "#"+saras ).datepicker({
							changeMonth: true,
							changeYear: true,
							yearRange: "-100:+5",
							dateFormat: "dd/mm/yy",
							buttonText: "Choose",
							showOtherMonths: true,
							selectOtherMonths: true
						});
					})
				}
			}
		 //modifyRow(tab);
		}else{
			addErrorXHTML('', 'Please fill in all the mandatory fields in the last row before adding another row.');
		}	
		checkMaxLengthLimit();
	}catch(e){
	  alert('error in addrow' + e);
	}
}

function checkMaxLengthLimit() {
	$(':input').unbind('keyup change input paste').bind('keyup change input paste',function(e){
	    var $this = $(this);
	    var val = $this.val();					    
	    var valLength = val.length;
	    var maxCount = $this.attr('maxlength');
	    if(valLength>maxCount){
	        $this.val($this.val().substring(0,maxCount));
	    }
	});
}

function checkRowBlank(tableId, noOfRow, last){
	try{
	var tab = document.getElementById(tableId);
	var rowCount = tab.rows.length;
	var trOfLastRow = tab.getElementsByTagName('tr')[rowCount - noOfRow];
	var allInputTags = trOfLastRow.getElementsByTagName('input');
	var allSelectTags = trOfLastRow.getElementsByTagName('select');
	var allTextareaTags = trOfLastRow.getElementsByTagName('textarea');
	var isRowBlank = true;
	
	for ( var i = 0; i < allInputTags.length; i++) {
		if(!allInputTags[i].name.match(".chosenCheckBox$")){
			if(allInputTags[i] != undefined || allInputTags[i].value != null){
				if((allInputTags[i].getAttribute("readonly") == null ) || 
					(allInputTags[i].getAttribute("readonly") != 'readonly')){
						if( allInputTags[i].parentNode.style.display != "none"  && allInputTags[i].getAttribute('type')!='hidden' ){
							var str = allInputTags[i].value.replace(/^\s+|\s+$/g,'');				
							if(str!=''){
								isRowBlank = false;
								break;
							}
						}
				}
			}
		}
	}
	
	for ( var i = 0; i < allTextareaTags.length; i++) {
		if(allTextareaTags[i] != undefined || allTextareaTags[i].value != null ){
			var str = allTextareaTags[i].value.replace(/^\s+|\s+$/g,'');
			if(str!=''){
				isRowBlank = false;
				break;
			}
		}
	}
	
	for ( var i = 0; i < allSelectTags.length; i++) {
		if(allSelectTags[i].value != '-1' && allSelectTags[i].value != ''){
			isRowBlank = false;
			break;
		}
	}
	}catch(e){
		alert(e);
	}
	return isRowBlank;
}

function displayArrowForItrOffline(currentPage,totalPage) {
    try{
		if (currentPage == totalPage) {
			java.disableNext();
            java.enablePrevious();
		}
		if (currentPage == 1) {
			java.disablePrevious();
			java.enableNext();
		}
		
		if((currentPage < totalPage) && (currentPage > 1)){
			java.enableNext();
            java.enablePrevious();
		}
    }catch(e){console.log(e);}
	}
	
var tabStart = 1;
var tabEnd = 6;	
	
function showPage(page) {
		showPageFor7(page);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		
}

function adjustSlider(){
                var currentPage=document.getElementById("currentPage").value;
                var totalPage=document.getElementById("totalPage").value;
                if(eval(currentPage) < eval(tabStart) || eval(currentPage) > eval(tabEnd)){
                    tabStart = currentPage;
                    tabEnd = eval(tabStart) + 5;
                    if(eval(tabEnd) > eval(totalPage)){
                        tabEnd = totalPage;
                        tabStart = eval(totalPage) - 5;
                    }
                }
                var tabs = document.getElementsByClassName('tabs')[1].getElementsByTagName('li');                               
    		for(var i=1; i<= totalPage; i++){
			if((i >= tabStart && i<= tabEnd)){
				tabs[i-1].style.display = '';
			}else{
				tabs[i-1].style.display = 'none';
			}
		}
}




	
function gotoNextPage() {
	var currentPage=document.getElementById("currentPage").value;
	var totalPage=document.getElementById("totalPage").value;
	if(currentPage==totalPage){
		return false;
	}
	document.getElementById("currentPage").value=++currentPage;
	var goTopage = 'page' + currentPage;
	showPageFor7(goTopage);
	main.scrollToTab(goTopage);
	return true;
}

function gotoPrevPage() {
	var currentPage=document.getElementById("currentPage").value;
	var totalPage=document.getElementById("totalPage").value;
	if(currentPage==1){
		return false;
	}
	document.getElementById("currentPage").value=--currentPage;
	
	var goTopage = 'page' + currentPage;
	showPageFor7(goTopage);
	main.scrollToTab(goTopage);
	return true;
}
function isPrevPageExists()
{
	var currentPage=document.getElementById("currentPage").value;	
	if(currentPage==1){
		return false;
	}
	return true;
}

function isNextPageExists()
{
	
	
	var currentPage=document.getElementById("currentPage").value;
	var totalPage=document.getElementById("totalPage").value;
	if(currentPage==totalPage){
		return false;
	}
	return true;
}
function showPageFor7(page) {

	var currentPage=document.getElementById("currentPage").value;
/*
	if(!validatePage(currentPage)){
	
		return false;
	
	}*/
	
	var totalPage=document.getElementById("totalPage").value;
	hideAllPage(totalPage);
	document.getElementById(page).style.display = "block";
	                    
	currentPage=page.substring(4);
	document.getElementById("currentPage").value = currentPage;
	main.IsprevPage();
	main.IsnextPage();
	displayArrowForItrOffline(currentPage,totalPage);
	document.body.style.height="";
	document.body.style.height="auto";
	pageOnLoad();
	try{
	if(j!=undefined){
		$('.tabs').hide();
	}
	}catch(e){}
	
}
function pageOnLoad(){

}
	
function hideAllPage(totalPage) {
	var v = 0;
	for (v = 1; v <= totalPage; v++) {
		document.getElementById("page" + v).style.display = "none";                        
	}
}
	
function deleteRowTable(tableId , noOfHeader , noOfFooter){
	try{
		var mytable = document.getElementById(tableId);
		var rowCount = mytable.rows.length;
		noOfHeader = parseInt(noOfHeader , 10);
		var isChecked=false;
		var listOfCheckBox = mytable.getElementsByTagName('input');
		var totalChecked = 0;
		for(var z=0; z<listOfCheckBox.length; z++){
			if(listOfCheckBox[z].name.match(".chosenCheckBox$")){
				if(listOfCheckBox[z].checked==true){
					totalChecked = eval( parseInt(totalChecked,10) +1);
					isChecked=true;
				}
			}
		}
		if(!isChecked){
			addErrorXHTML('','Please select a checkbox for deleting row');
		}

		for(var j=1; j<=totalChecked ; j++){      // iterate for total number of checkboxes
			var totalNoOfInput = mytable.getElementsByTagName('input');

			for(var z=0; z<totalNoOfInput.length; z++){
				if(totalNoOfInput[z].name.match(".chosenCheckBox$")){		// if its a chosenCheckBox element

					var akhilIndex1 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf('[') ,10)+1);
					var akhilIndex2 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf(']') ,10));
					var rowNumber = totalNoOfInput[z].name.substring(akhilIndex1, akhilIndex2);
					rowNumber = parseInt(rowNumber ,10);
					
					var myCurrtable = document.getElementById(tableId);
					var rowCurrCount = myCurrtable.rows.length;

					
					if(totalNoOfInput[z].checked==true){
						if((rowNumber!=0) || (rowNumber==0 &&  eval(rowCurrCount-noOfHeader-noOfFooter)>1) ){
							rowNumber = eval(parseInt(rowNumber,10) + noOfHeader);
							mytable.deleteRow(rowNumber);

							//To Do - reset the name of row for all input , textarea, select
							var newTrList = mytable.getElementsByTagName('tr');
							var newTrListLength = eval(parseInt(newTrList.length ,10)-noOfFooter);
							for( var p=rowNumber; p < newTrListLength ; p++ ){	//iterate over all rows from delete point to second last row
								//set the serial number;

								if(noOfHeader==2){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p-1,10);
								}else if(noOfHeader==1){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p,10);
								}else if(noOfHeader==3){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p-2,10);
								}

								var allInputTags = newTrList[p].getElementsByTagName('input');

								for(var zz=0; zz<allInputTags.length ; zz++ ){
									var index1= allInputTags[zz].name.lastIndexOf('[');
									var index2= allInputTags[zz].name.lastIndexOf(']');

									var str1 = allInputTags[zz].name.substring(0, index1);
									var str3 = allInputTags[zz].name.substring(index2 + 1, allInputTags[zz].name.length);

									allInputTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}

								var allSelectTags = newTrList[p].getElementsByTagName('select');

								for(var zz=0; zz<allSelectTags.length ; zz++ ){
									var index1= allSelectTags[zz].name.lastIndexOf('[');
									var index2= allSelectTags[zz].name.lastIndexOf(']');

									var str1 = allSelectTags[zz].name.substring(0, index1);
									var str3 = allSelectTags[zz].name.substring(index2 + 1, allSelectTags[zz].name.length);

									allSelectTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}

								var allTextAreaTags = newTrList[p].getElementsByTagName('textarea');

								for(var zz=0; zz<allTextAreaTags.length ; zz++ ){
									var index1= allTextAreaTags[zz].name.lastIndexOf('[');
									var index2= allTextAreaTags[zz].name.lastIndexOf(']');

									var str1 = allTextAreaTags[zz].name.substring(0, index1);
									var str3 = allTextAreaTags[zz].name.substring(index2 + 1, allTextAreaTags[zz].name.length);

									allTextAreaTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}
							}
							break;
						}else if((rowNumber==0)  && (eval(rowCurrCount-noOfHeader-noOfFooter)==1)){
							//Vacate the content if its first row

							var firstRow = mytable.getElementsByTagName('tr')[noOfHeader];

							var firstInputBox = firstRow.getElementsByTagName('input')[0];
							firstInputBox.checked = false;

							var allInputTags = firstRow.getElementsByTagName('input');
							for ( var i = 0; i < allInputTags.length; i++) {
								allInputTags[i].value = "";
							}
							var allSelectTags = firstRow.getElementsByTagName('select');
							for ( var i = 0; i < allSelectTags.length; i++) {
								var elem = allSelectTags[i];
								elem[0].selected = true;
							}
							var allTextAreaTags = firstRow.getElementsByTagName('textarea');
							for ( var i = 0; i < allTextAreaTags.length; i++) {
								allTextAreaTags[i].value = "";
							}
						}
					}
				}
			}
		}
		//modifyRow(mytable);
	}catch(e){
		alert('exception caught in =' +e.stack );
	}
}


function deleteRowTableForAuditDetails(tableId , noOfHeader , noOfFooter){
	try{
		var mytable = document.getElementById(tableId);
		var rowCount = mytable.rows.length;
		noOfHeader = parseInt(noOfHeader , 10);
		var isChecked=false;
		var listOfCheckBox = mytable.getElementsByTagName('input');
		var totalChecked = 0;
		for(var z=0; z<listOfCheckBox.length; z++){
			if(listOfCheckBox[z].name.match(".chosenCheckBox$")){
				if(listOfCheckBox[z].checked==true){
					totalChecked = eval( parseInt(totalChecked,10) +1);
					isChecked=true;
				}
			}
		}
		if(!isChecked){
			addErrorXHTML('','Please select a checkbox for deleting row');
		}

		for(var j=1; j<=totalChecked ; j++){      // iterate for total number of checkboxes
			var totalNoOfInput = mytable.getElementsByTagName('input');

			for(var z=0; z<totalNoOfInput.length; z++){
				if(totalNoOfInput[z].name.match(".chosenCheckBox$")){		// if its a chosenCheckBox element

					var akhilIndex1 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf('[') ,10)+1);
					var akhilIndex2 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf(']') ,10));
					var rowNumber = totalNoOfInput[z].name.substring(akhilIndex1, akhilIndex2);
					rowNumber = parseInt(rowNumber ,10) - 1;
					
					var myCurrtable = document.getElementById(tableId);
					var rowCurrCount = myCurrtable.rows.length;

					
					if(totalNoOfInput[z].checked==true){
						if((rowNumber!=0) || (rowNumber==0 &&  eval(rowCurrCount-noOfHeader-noOfFooter)>1) ){
							rowNumber = eval(parseInt(rowNumber,10) + noOfHeader);
							mytable.deleteRow(rowNumber);

							//To Do - reset the name of row for all input , textarea, select
							var newTrList = mytable.getElementsByTagName('tr');
							var newTrListLength = eval(parseInt(newTrList.length ,10)-noOfFooter);
							for( var p=rowNumber; p < newTrListLength ; p++ ){	//iterate over all rows from delete point to second last row
								//set the serial number;
								if(noOfHeader==2){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p-1,10);
								}else if(noOfHeader==1){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p,10);
								}else if(noOfHeader==3){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p-2,10);
								}

								var allInputTags = newTrList[p].getElementsByTagName('input');

								for(var zz=0; zz<allInputTags.length ; zz++ ){
									var index1= allInputTags[zz].name.lastIndexOf('[');
									var index2= allInputTags[zz].name.lastIndexOf(']');

									var str1 = allInputTags[zz].name.substring(0, index1);
									var str3 = allInputTags[zz].name.substring(index2 + 1, allInputTags[zz].name.length);

									allInputTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader  + 1) +']'+str3;
								}

								var allSelectTags = newTrList[p].getElementsByTagName('select');

								for(var zz=0; zz<allSelectTags.length ; zz++ ){
									var index1= allSelectTags[zz].name.lastIndexOf('[');
									var index2= allSelectTags[zz].name.lastIndexOf(']');

									var str1 = allSelectTags[zz].name.substring(0, index1);
									var str3 = allSelectTags[zz].name.substring(index2 + 1, allSelectTags[zz].name.length);

									allSelectTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader + 1) +']'+str3;
								}

								var allTextAreaTags = newTrList[p].getElementsByTagName('textarea');

								for(var zz=0; zz<allTextAreaTags.length ; zz++ ){
									var index1= allTextAreaTags[zz].name.lastIndexOf('[');
									var index2= allTextAreaTags[zz].name.lastIndexOf(']');

									var str1 = allTextAreaTags[zz].name.substring(0, index1);
									var str3 = allTextAreaTags[zz].name.substring(index2 + 1, allTextAreaTags[zz].name.length);

									allTextAreaTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader + 1) +']'+str3;
								}
							}
							break;
						}else if((rowNumber==0)  && (eval(rowCurrCount-noOfHeader-noOfFooter)==1)){
							//Vacate the content if its first row

							var firstRow = mytable.getElementsByTagName('tr')[noOfHeader];

							var firstInputBox = firstRow.getElementsByTagName('input')[0];
							firstInputBox.checked = false;

							var allInputTags = firstRow.getElementsByTagName('input');
							for ( var i = 0; i < allInputTags.length; i++) {
								allInputTags[i].value = "";
							}
							var allSelectTags = firstRow.getElementsByTagName('select');
							for ( var i = 0; i < allSelectTags.length; i++) {
								var elem = allSelectTags[i];
								elem[0].selected = true;
							}
							var allTextAreaTags = firstRow.getElementsByTagName('textarea');
							for ( var i = 0; i < allTextAreaTags.length; i++) {
								allTextAreaTags[i].value = "";
							}
						}
					}
				}
			}
		}
		//modifyRow(mytable);
	}catch(e){
		alert('exception caught in =' +e.stack );
	}
}


function deleteRowTableModified(tableId , noOfHeader , noOfFooter){
	var noOfFixedRows = 7;
	try{
		var mytable = document.getElementById(tableId);
		var rowCount = mytable.rows.length;
		noOfHeader = parseInt(noOfHeader , 10);
		var isChecked=false;
		var listOfCheckBox = mytable.getElementsByTagName('input');

		var totalChecked = 0;
		for(var z=0; z<listOfCheckBox.length; z++){
			if(listOfCheckBox[z].name.match(".chosenCheckBox$")){
				if(listOfCheckBox[z].checked==true){
					totalChecked = eval( parseInt(totalChecked,10) +1);
					isChecked=true;
				}
			}
		}
		if(!isChecked){
			addErrorXHTML('','Please select a checkbox for deleting row');
		}


		for(var j=1; j<=totalChecked ; j++){      // iterate for total number of checkboxes
			var totalNoOfInput = mytable.getElementsByTagName('input');
			
			for(var z=0; z<totalNoOfInput.length; z++){
				
				if(totalNoOfInput[z].name.match(".chosenCheckBox$")){		// if its a chosenCheckBox element
			
					var akhilIndex1 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf('[') ,10)+1);
					var akhilIndex2 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf(']') ,10));
					var rowNumber = totalNoOfInput[z].name.substring(akhilIndex1, akhilIndex2);
					rowNumber = parseInt(rowNumber ,10);
					
					var myCurrtable = document.getElementById(tableId);
					var rowCurrCount = myCurrtable.rows.length;
					
					if(totalNoOfInput[z].checked==true){
						
						if(eval(rowCurrCount-noOfHeader-noOfFooter-noOfFixedRows)>1){
							
							rowNumber = eval(parseInt(rowNumber,10) + noOfHeader);
							mytable.deleteRow(rowNumber);
							
							var newTrList = mytable.getElementsByTagName('tr');
							var newTrListLength = eval(parseInt(newTrList.length ,10)-noOfFooter);
							for( var p=rowNumber; p < newTrListLength ; p++ ){	//iterate over all rows from delete point to second last row
								

								if(noOfHeader==2){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p-1,10);
								}else if(noOfHeader==1){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p,10);
								}else if(noOfHeader==3){
									newTrList[p].getElementsByTagName('td')[0].innerHTML = parseInt(p-2,10);
								}

								var allInputTags = newTrList[p].getElementsByTagName('input');

								for(var zz=0; zz<allInputTags.length ; zz++ ){
									var index1= allInputTags[zz].name.lastIndexOf('[');
									var index2= allInputTags[zz].name.lastIndexOf(']');

									var str1 = allInputTags[zz].name.substring(0, index1);
									var str3 = allInputTags[zz].name.substring(index2 + 1, allInputTags[zz].name.length);

									allInputTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}

								var allSelectTags = newTrList[p].getElementsByTagName('select');

								for(var zz=0; zz<allSelectTags.length ; zz++ ){
									var index1= allSelectTags[zz].name.lastIndexOf('[');
									var index2= allSelectTags[zz].name.lastIndexOf(']');

									var str1 = allSelectTags[zz].name.substring(0, index1);
									var str3 = allSelectTags[zz].name.substring(index2 + 1, allSelectTags[zz].name.length);

									allSelectTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}

								var allTextAreaTags = newTrList[p].getElementsByTagName('textarea');

								for(var zz=0; zz<allTextAreaTags.length ; zz++ ){
									var index1= allTextAreaTags[zz].name.lastIndexOf('[');
									var index2= allTextAreaTags[zz].name.lastIndexOf(']');

									var str1 = allTextAreaTags[zz].name.substring(0, index1);
									var str3 = allTextAreaTags[zz].name.substring(index2 + 1, allTextAreaTags[zz].name.length);

									allTextAreaTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}
							}
							break;
						}else if(eval(rowCurrCount-noOfHeader-noOfFooter-noOfFixedRows)==1){
							
							var firstRow = mytable.getElementsByTagName('tr')[noOfHeader + noOfFixedRows];

							var firstInputBox = firstRow.getElementsByTagName('input')[0];
							firstInputBox.checked = false;

							var allInputTags = firstRow.getElementsByTagName('input');
							for ( var i = 0; i < allInputTags.length; i++) {
								allInputTags[i].value = "";
							}
							var allSelectTags = firstRow.getElementsByTagName('select');
							for ( var i = 0; i < allSelectTags.length; i++) {
								var elem = allSelectTags[i];
								elem[i].selected = true;
							}
							var allTextAreaTags = firstRow.getElementsByTagName('textarea');
							for ( var i = 0; i < allTextAreaTags.length; i++) {
								allTextAreaTags[i].value = "";
							}
						}
					}
				}
			}
		}
	}catch(e){
		alert('exception caught in =' +e.stack );
	}
}

function focusTabJava(fieldName){

var tempField = document.getElementsByName(fieldName)[0];
 if(tempField.type=='hidden'){
         fieldName=getNonHiddenElementSubmit( document.getElementsByName(fieldName)[0]);
        
        }
        callMeRec(tempField,fieldName);

        return false;
}

function getNonHiddenElementSubmit(field){
var node=field.parentNode;
var nodeList=node.getElementsByTagName('input');
for(var i=0;i<nodeList.length;i++){
    if(nodeList[i].type!='hidden'){
        return nodeList[i].name;
    }
}
return field.name;
}

function focusTab(akhilFieldName){
  
        var tempField = akhilFieldName;
        callMeRecNoFocus(tempField,akhilFieldName.name );
        return false;
}

function callMeRecNoFocus(tempField,akhilFieldName){
try{
    var parentElem = tempField.parentNode; 
   
		var parentElemId = parentElem.id;

            if(parentElemId != undefined){
		if(parentElemId.match("^page[0-9]{1,2}$")){
					if(document.getElementById('currentPage').value != parentElemId.substring(4)){
						showPage(parentElemId);
						document.getElementsByName(akhilFieldName)[0].focus();
					}					
					
					var element=document.getElementsByName(akhilFieldName)[0];
					colorHighlight(element, [255,0,0], [161,161,161], 2500);
				}else{
					callMeRecNoFocus(parentElem,akhilFieldName);
				}
            }else{
	callMeRecNoFocus(parentElem,akhilFieldName);
}
		return true;
	}catch(e){
		alert('error in fun: callMeRecNoFocus: '+e+' '+akhilFieldName);
	}

}

function callMeRec(tempField,akhilFieldName){
try{
    var parentElem = tempField.parentNode; 
   
		var parentElemId = parentElem.id;

            if(parentElemId != undefined){
		if(parentElemId.match("^page[0-9]{1,2}$")){
					if(document.getElementById('currentPage').value != parentElemId.substring(4)){
						showPage(parentElemId);
						main.scrollToTab(parentElemId);
					}					
					document.getElementsByName(akhilFieldName)[0].parentNode.scrollIntoView();
					var element=document.getElementsByName(akhilFieldName)[0];
					colorHighlight(element, [255,0,0], [161,161,161], 2500);
				}else{
					callMeRec(parentElem,akhilFieldName);
				}
            }else{
	callMeRec(parentElem,akhilFieldName);
}
		return true;
	}catch(e){
		alert('error in fun: callMeRec: '+e+' '+akhilFieldName);
	}

}

function colorHighlight(element, startcolour, endcolour, time_elapsed) {

        var interval = 30;
        var steps = time_elapsed / interval;
        var red_change = (startcolour[0] - endcolour[0]) / steps;
        var green_change = (startcolour[1] - endcolour[1]) / steps;
        var blue_change = (startcolour[2] - endcolour[2]) / steps;
        var currentcolour = startcolour;
        var stepcount = 0;

element.style.border='2px solid '+'rgb(' + currentcolour.toString() + ')';
		 var timer = setInterval(function(){
            currentcolour[0] = parseInt(currentcolour[0] - red_change);
            currentcolour[1] = parseInt(currentcolour[1] - green_change);
            currentcolour[2] = parseInt(currentcolour[2] - blue_change);
    

element.style.border='2px solid '+'rgb(' + currentcolour.toString() + ')';
           
 stepcount += 1;
            if (stepcount >= steps) {
      


element.style.border='1px solid '+'rgb(' + endcolour.toString() + ')';   
clearInterval(timer);
            }
        }, interval);
    }

function addRowToTableNoCheck(tableId, noOfRow, last) {
		var tab = document.getElementById(tableId);
		var rowCount = tab.rows.length;
		var clone = tab.getElementsByTagName('tr')[rowCount - noOfRow].cloneNode(true);

		var lastRow = tab.getElementsByTagName('tr')[rowCount - last];

		var allInputTags = clone.getElementsByTagName('input');
		var serialNumber = eval(clone.getElementsByTagName('td')[0].innerHTML);
			var index = eval(allInputTags[0].name.substring(allInputTags[0].name.lastIndexOf("[")+1,allInputTags[0].name.lastIndexOf("]"))) + 1;

		clone.getElementsByTagName('td')[0].innerHTML = serialNumber + 1;

		for ( var i = 0; i < allInputTags.length; i++) {
		
			var classMme = allInputTags[i].getAttribute("class");
			var className = allInputTags[i].getAttribute("className");
			
			if (classMme == "date_dummy_black hasDatepicker" || className ==  "date_dummy_black hasDatepicker" ) {
				allInputTags[i].id = allInputTags[i].id + serialNumber;
				allInputTags[i].setAttribute("className","date_dummy_black");
				allInputTags[i].setAttribute("class","date_dummy_black");
				saras  = allInputTags[i].id;

			}else if( classMme == "date_dummy_white hasDatepicker" || className ==  "date_dummy_white hasDatepicker"  ){
				allInputTags[i].id = allInputTags[i].id + serialNumber;
				allInputTags[i].setAttribute("className","date_dummy_white");
				allInputTags[i].setAttribute("class","date_dummy_white");
				saras  = allInputTags[i].id;
			}
			
			allInputTags[i].value='';
			var inputelem = allInputTags[i].name;
			var inputelemLen = inputelem.length;
				var index1 = inputelem.lastIndexOf("[");
				var index2 = inputelem.lastIndexOf("]");
			if(eval(inputelem.length-1)==index2){
					index1=inputelem.indexOf("[");
					index2 = inputelem.indexOf("]");
				}
			var str1 = inputelem.substring(0, index1);

			var str3 = inputelem.substring(index2 + 1, inputelemLen);

				var name = str1 + '[' + index + ']' + str3;

			allInputTags[i].name = name;
			var blurAttr=allInputTags[i].getAttribute('onblur');
			if(blurAttr!=null){
				blurAttr=blurAttr+";";
			}else{
				blurAttr="";
			}
			allInputTags[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
			allInputTags[i].id=name.replace(/\./gi,"_").replace(/\[/gi,"_").replace(/\]/gi,"_");
		}
		var selectTags = clone.getElementsByTagName('select');

		for ( var i = 0; i < selectTags.length; i++) {

			var inputelem = selectTags[i].name;
			var inputelemLen = inputelem.length;
				var index1 = inputelem.lastIndexOf("[");
				var index2 = inputelem.lastIndexOf("]");
			if(eval(inputelem.length-1)==index2){
					index1=inputelem.indexOf("[");
					index2 = inputelem.indexOf("]");
				}
			var str1 = inputelem.substring(0, index1);

			var str3 = inputelem.substring(index2 + 1, inputelemLen);

				var name = str1 + '[' + index + ']' + str3;

			selectTags[i].name = name;
			var blurAttr=selectTags[i].getAttribute('onblur');
			if(blurAttr!=null){
				blurAttr=blurAttr+";";
			}else{
				blurAttr="";
			}
			selectTags[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
			selectTags[i].id=name.replace(/\./gi,"_").replace(/\[/gi,"_").replace(/\]/gi,"_");
			
			var selectElem = selectTags[i];
			selectElem[0].selected = true;
		}
		
		var textareaTags = clone.getElementsByTagName('textarea');

		for ( var i = 0; i < textareaTags.length; i++) {
			var textareaElem = textareaTags[i].name;
			var textareaElemLen = textareaElem.length;
				var index1 = textareaElem.lastIndexOf("[");
				var index2 = textareaElem.lastIndexOf("]");
			if(eval(inputelem.length-1)==index2){
					index1=inputelem.indexOf("[");
					index2 = inputelem.indexOf("]");
				}
			var str1 = textareaElem.substring(0, index1);
			var str3 = textareaElem.substring(index2 + 1, textareaElemLen);
				var name = str1 + '[' + index + ']' + str3;
			textareaTags[i].name = name;
			var blurAttr=textareaTags[i].getAttribute('onblur');
			if(blurAttr!=null){
				blurAttr=blurAttr+";";
			}else{
				blurAttr="";
			}
			textareaTags[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
			textareaTags[i].id=name.replace(/\./gi,"_").replace(/\[/gi,"_").replace(/\]/gi,"_");
			textareaTags[i].value = '';
		}

		try {
			var parentNode = lastRow.parentNode;
			parentNode.insertBefore(clone, lastRow);
		}catch (e) {
			alert ('uma exceptoin :  ' + e+ 'rowcount'+rowCount+'last' +last);
		}

		var tab = document.getElementById(tableId);
		var rowCount = tab.rows.length;
		var lastRow = tab.getElementsByTagName('tr')[rowCount - last];
		var allInputTags = clone.getElementsByTagName('input');
		
		for ( var i = 0; i < allInputTags.length; i++) {
		
			var classMme = allInputTags[i].getAttribute("class");
			var className = allInputTags[i].getAttribute("className");
			
			
			if (classMme == "date_dummy_black" || className ==  "date_dummy_black" ||
				classMme == "date_dummy_white" || className ==  "date_dummy_white" ) {

				saras  = allInputTags[i].id;

					$(function() {
					$( "#"+saras ).datepicker({
						changeMonth: true,
						changeYear: true,
						yearRange: "-100:+5",
						dateFormat: "dd/mm/yy",
						buttonText: "Choose",
						showOtherMonths: true,
						selectOtherMonths: true
					});
				})
			}
		}
		checkMaxLengthLimit();
}

function addRows(fieldId,rowCount,type){
    var flag=true;
    try{
	 if(fieldId.indexOf('form.formBA.formBaDetail.schJewelProp')!=-1 &&  fieldId.indexOf('schJewelStones')==-1){
	addRowToSchJew();
		return true;
	}
	 if(fieldId.indexOf('form3CdDeprAllw.3cb18[0]')!=-1){
		 addRowToPt18('pt18Table',2,1);
				return true;
			} 
      
	var tablId=getTableId(fieldId);
	if(document.getElementById(tablId).getElementsByTagName('img').length==0){
	return flag;
	}
	var onclickAttr=document.getElementById(tablId).getElementsByTagName('img')[0].getAttribute('onclick');
	var str=onclickAttr.substring(onclickAttr.indexOf(tablId)-1,onclickAttr.length-1);
	var strArr=str.split(',');
	var noRows=strArr[1];
	var last=strArr[2];
	if(isNaN(last)){
		last=last.charAt(0);
	}
	var count=findNoOfRows(document.getElementById(tablId));
	if(count<rowCount){
		count=rowCount-count;
	}else{
		count=0;
	}
	if(type!=undefined && type=='1'){
		count=1;
	}
	if(count!=0)
    for(var i=0;i<count;i++){
	addRowToTableNoCheck(tablId,noRows,last);
    }
    }catch(e){
        alert('addRows errors: '+fieldId+' :: '+rowCount+' '+e);
        flag=false;
    }
    return flag;
}

function getTableId(fieldId){
	var tempField=document.getElementsByName(fieldId);
	if(fieldId.indexOf('scheduleMATC')==-1)
	for(var i=0;i<10;i++){
		var tempId=fieldId;
		if(fieldId.indexOf('coOwners')==-1 && tempField.length!=0 && (tempField[0].type=='hidden' || tempField[0].style.display=='none')){
		var t1=eval(tempId.substring(tempId.indexOf('[')+1,tempId.indexOf(']')));
			tempId=tempId.replace('['+t1+']','['+eval(t1+1)+']');
			tempField=document.getElementsByName(tempId);
			continue;
		}else{
			break;
		}
	}
	if(tempField.length==0){
		tempField=document.getElementsByName(fieldId);
	}
    var temp=tempField[0].parentNode;
	var tId="";
    for(var i=0;i<8;i++){
		temp=temp.parentNode;
        tId=temp.id;
		if(temp.nodeName == 'TABLE' || temp.nodeName == 'table'){
            break;
        }
	
    }
    return tId;
}

function isPostv(field){
	try{
		if(parseInt(coalesceSetRet(field),10) >= 0){
			return true;
		}else{
			return false;
		}
	}catch(e){
		alert('error in checkPos= ' +e.stack);
	}
}


function getNameVals(){
	var doc=document.forms[0].elements;
	var arr=new Array();
	var obj;
	for(var i=0;i<doc.length;i++){
		obj=new Object();
		obj.name=doc[i].name;
		obj.value=doc[i].value;
		arr[i]=obj;
	}
	if(window.customNameValues){
		customNameValues(arr,i);
	}
	return arr;
}
function getNameValsPreview(){
	var doc=document.forms[0].elements;
	var arr=new Array();
	var obj;
	for(var i=0;i<doc.length;i++){
	try{
		obj=new Object();
		obj.name=doc[i].name;
		if(doc[i].type=='select-one'){	
			obj.value=doc[i].options[doc[i].selectedIndex].text;
		}else{
			obj.value=doc[i].value;
		}
		arr[i]=obj;
		}catch(e){alert('error setting array: '+e+' '+doc[i].name);}
	}
	return arr;
}
var transactionName=new Array();
var currTransaction;

/*function addTransactionTable(name,val){
alert('entred addTransactionTable: '+name);
if(name.indexOf('TransactionType')!=-1){
			
			if(transactionName[val]){
				transactionName[val].value=transactionName[val].value+1;
			}else{
				transactionName[val]=new Object();
				transactionName[val].name='transaction'+val;
				transactionName[val].value=0;
			}
			currTransaction=val;
		}
	alert('name: change: '+name+',transactionName: '+transactionName+',currTransaction: '+currTransaction);	
		//get ACt Name
	name=name.replace('transactions18','transactions'+currTransaction)	;
	name=name.substring(0,name.lastIndexOf('[')+1)+transactionName[currTransaction].value+name.substring(name.lastIndexOf(']'));
	alert('name: change: '+name);
	return name;
}*/

function setValues(name,val,index){
	if(window.populateCSV){
		if(populateCSV(name,val)){
			return;
		}
	}		
val=decodeURIComponent(val);

var field=document.getElementsByName(name);
alert('field: '+field.length);
if(field.length==0 && name.indexOf('[')!=-1){
	name=name.substring(0,name.lastIndexOf('[')+1)+'0'+name.substring(name.lastIndexOf(']'));
	var flag=addRows(name,1,'1');
	
}
field[parseInt(index,10)].value=val;
}

function enableYesNo(element1,element2){
	
	if(document.getElementsByName(element1)[0].value=='N'){
		
		document.getElementsByName(element2)[0].disabled=true;
		document.getElementsByName(element2)[0].value="";
	}
	else if(document.getElementsByName(element1)[0].value=='Y'){
		
		document.getElementsByName(element2)[0].disabled=false;
		
	}
	else{
		document.getElementsByName(element2)[0].disabled=true;
		document.getElementsByName(element2)[0].value="";
		
	}
	
}

function getCurrentDate(){
		var dt = new Date();
		return ("00" + dt.getDate()).slice(-2) + '/' + ("00" + (dt.getMonth()+1)).slice(-2)+ '/' + dt.getFullYear() ;
}

function copySourceToDest(source,destn){
	
	document.getElementsByName(destn)[0].value=document.getElementsByName(source)[0].value.toUpperCase();
	
}

function selectToTextReadonly(selectField,textField,checkValue){
	var val=document.getElementsByName(selectField)[0].value;
	if(document.getElementsByName(textField)[0].type=='select-one'){
	if(val == checkValue){
		document.getElementsByName(textField)[0].disabled=false;
	}
	else{
		document.getElementsByName(textField)[0].disabled=true;
		if(document.getElementsByName(textField)[0].options[0].value == 0){
			document.getElementsByName(textField)[0].value="0";	
		}else{
		document.getElementsByName(textField)[0].value="";
		}
	}
	}
	else{
	if(val == checkValue){
		document.getElementsByName(textField)[0].readOnly=false;
                document.getElementsByName(textField)[0].disabled=false;
	}
	else{
		document.getElementsByName(textField)[0].readOnly=true;
                document.getElementsByName(textField)[0].disabled=true;
		document.getElementsByName(textField)[0].value="";
	}
	}
}

function getAmt(name){
		var val = $('[name="'+name+'"]')[0].value;
		return parseInt(coalesce(val));
	}
	
function zeroOrMore(val){
	val = coalesce(val);
	if(val < 0){
		return 0;
	}
	return val;
}

function coalesceString(val){
    if(val==undefined || val == null){
        return 0;
    }
    return val;
}


function clearOldValues(){
	var elems = document.forms[0].elements;
	for(var i=0;i<elems.length; i++){
		if(elems[i].old!=undefined){
			elems[i].old = undefined;
		}
		if(elems[i].oldvalue!=undefined){
			elems[i].oldvalue = undefined;
		}
	}
}

function setCountryName(elem, countryName){
	var index = elem.selectedIndex;
	var country = elem.options[index].text;
	country = country.substr(country.indexOf('-')+1);
	var ctryPref = elem.name.substr(0,elem.name.lastIndexOf('.')+1);
	var ctrySuff = countryName.substr(countryName.lastIndexOf('.')+1);
	if(country!='Select'){
		document.getElementsByName(ctryPref+ctrySuff)[0].value = country;
	}else{
		document.getElementsByName(ctryPref+ctrySuff)[0].value = '';
	}
}

function addRowsForCopyPaste(rowLength,tablId,heads,last){
    var rowcount= eval(document.getElementById(tablId).rows.length-eval(heads-last));    
     var nonEmptyRowCount= getTableRowCOunt(tablId,heads,last);
		for(var i=0;i<(rowLength-(rowcount-nonEmptyRowCount));i++){
			addRowToTableNoCheck(tablId,heads,last);
		}
       return nonEmptyRowCount;
               
}

function addRowsForCopyPasteRowCount(tablId,heads,last){
	try{
       return eval(document.getElementById(tablId).rows.length-eval(heads-last));
	} catch(e){
		alert('error in addRowsForCopyPasteRowCount ::'+e.stack);
	}
}

function addRowsForCopyPasteNonEmptyRowCount(tablId,heads,last){
	try{
		return getTableRowCOunt(tablId,heads,last);;
	} catch(e){
		alert('error in addRowsForCopyPasteNonEmptyRowCount ::'+e.stack);
	}
}

function getTableRowCOunt(tablId,noOfHeader,noOfFooter){

      var mytable = document.getElementById(tablId);
      var rowNumber = mytable.rows.length;
       for(var i=(rowNumber-noOfFooter-1);i>=((noOfHeader-noOfFooter));i--){
         var tblRow = mytable.rows[i];
         var countEmpty=0;
         var allInputTags = tblRow.cells;
         
         for ( var j = 2; j < allInputTags.length; j++) {
            if(allInputTags[j].children[0].type!='hidden' && allInputTags[j].children[0].value.trim().length!=0){
                
                    countEmpty++;
                    break;
                }
             }
             if(countEmpty==0){
                
                 if(rowNumber==eval(eval(noOfHeader)+1)){
                     return i;
                 }
             }else{
                 return (i+1);
             }
            
       }     
       return (rowNumber-noOfFooter);    
}

function setTableCellValues(tableId, rowNo,colNo, cellValue) {
     try{
        // alert("HTML:setCellValue::tableId : "+tableId+" ,rowNo:"+rowNo+" , colNo:"+colNo+",cellValue:"+cellValue);
         var mytable = document.getElementById(tableId); 
         mytable.rows[rowNo].cells[colNo].children[0].value=cellValue;
     }catch(er){
         alert(er);
     }
 }
function checkMembershipNoLength(memberShipNO) {

	if(memberShipNO.value.length==5) {
		memberShipNO.value=0+memberShipNO.value;
	} else if(memberShipNO.value.length==4) {
		memberShipNO.value='00'+memberShipNO.value;
	} else if(memberShipNO.value.length==3) {
		memberShipNO.value='000'+memberShipNO.value;
	} else if(memberShipNO.value.length==2) {
		memberShipNO.value='0000'+memberShipNO.value;
	} else if(memberShipNO.value.length==1 && memberShipNO.value!=0) {
		memberShipNO.value='00000'+memberShipNO.value;
	}
}

function beforePreview(){
	if(window.modifyPreview){
		modifyPreview();
	}
}

function beforeSave(){
	if(window.customBeforeSave){
		customBeforeSave();
	}
}

function beforeImport(){
	if(window.customBeforeImport){
		customBeforeImport();
	}
}
function clearTempFiles(){
	if(window.deleteTempFiles){
		deleteTempFiles();
	}
}
