/*
 * $Id: validation.js 692578 2008-09-05 23:30:16Z davenewton $
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function clearErrorMessages(form) {
	clearErrorMessagesXHTML(form);
}

function clearErrorMessagesXHTML(form) {

}
function clearFieldErrorLabels(form) {
}
function clearFieldErrorMessages(form) {
}

function clearErrorLabels(form) {
	clearErrorLabelsXHTML(form);
}

function clearErrorLabelsXHTML(form) {

}
function addErrorHome(fieldname,error){
try{
addError(document.getElementsByName(fieldname)[0],error);
}catch(e){
alert(e);
}
}
function addError(e, errorText,notRemovable) {
        if(e.type=='hidden'){
            e=getNonHiddenElement(e);
         
        }
	addErrorXHTML(e, errorText,notRemovable);
}

function getNonHiddenElement(field){
var node=field.parentNode;
var nodeList=node.getElementsByTagName('input');
for(var i=0;i<nodeList.length;i++){
    if(nodeList[i].type!='hidden'){
        return nodeList[i];
    }
}
return field;
}

var lastErrorField = '';

function addErrorXHTML(e, errorText,notRemovable) {
	if(e!=null && e!=undefined && e!=''){
		focusTab(e);			
		window.scroll(0,findPos(e));			
		calculatePos(e);
	}
	lastErrorField=e;	
	$('#validationErrorMsg')[0].notRemovable = notRemovable;	
	$('#validationErrorMsg').stop(0,function(){});
	$('#validationErrorMsg').show(0,function(){
		$('#validationErrorMsg').html(errorText);
		$('#validationErrorMsg').fadeOut(12000);
	});
	if(e==null||e==undefined||e==''){
		$('#validationErrorMsg')[0].style.top = '10px';
		$('#validationErrorMsg')[0].style.width = '50%';
		$('#validationErrorMsg')[0].style.left = '';
		$('#validationErrorMsg')[0].className="";
	}
	else{
		calculatePos(e);
		window.onscroll=function() { calculatePos(e, true) };
	}
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop -100];
    }
}

function calculatePos(e, scroll){

	if($('#validationErrorMsg')[0].className=='' && scroll==true){
		return;
	}
	var docWidth=$(document).width();
	var pos = $('[name="'+e.name+'"]').offset();
	var top = (pos.top - $('#validationErrorMsg')[0].offsetHeight - 15);
	var left=(pos.left + $('#validationErrorMsg')[0].offsetWidth);
	$('#validationErrorMsg')[0].className="triangleBottom-isosceles";
	var flagTop=false;
	if(top < 0){
		top = pos.top + e.offsetHeight + 15;
		$('#validationErrorMsg')[0].className="triangleTop-isosceles";
		flagTop=true;
	}
	
	if(left>docWidth){
		var offWidth=$('#validationErrorMsg')[0].offsetWidth;
		left=pos.left-offWidth+e.offsetWidth;
		pos.left=left;
		if(flagTop){
			$('#validationErrorMsg')[0].className="triangleBottomLeft-isosceles";
		}else{
			$('#validationErrorMsg')[0].className="triangleLeft-isosceles";
		}
	}
	pos.top = top;
	$('#validationErrorMsg').offset(pos);
	$('#validationErrorMsg')[0].style.width = '300px';
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft ;
        _y += el.offsetTop ;
        el = el.offsetParent;
    }
    return { top: _y -  $(document).scrollTop(), left: _x - $(document).scrollLeft()};
}


/* function addErrorXHTML(e, errorText) {
	alert(errorText);
} */

function isInteger(input) {

	for ( var i = 0; i < input.length; i++) {
		if (!(input.charAt(i) >= '0' && input.charAt(i) <= '9')) {
			return false;
		}
	}
	return true;
}

function checkDate(inputDate) {

	if (inputDate.replace(/^\\s+|\\s+$/g, '').length == 0) {
		return true;
	}

	var dateArray = inputDate.split("/");

	var isDateValid = true;

	if (dateArray.length == 3) {

		var dayOfDate = dateArray[0];
		var monthOfDate = dateArray[1];
		var yearOfDate = dateArray[2];

		if (isInteger(dayOfDate) && isInteger(monthOfDate)
				&& isInteger(yearOfDate) && dayOfDate.length == 2
				&& monthOfDate.length == 2 && yearOfDate.length == 4) {

			var tempDate = new Date(monthOfDate + "/" + dayOfDate + "/"
					+ yearOfDate);

			if (tempDate.getMonth() != monthOfDate - 1) {

				isDateValid = false;
			}
		} else {
			isDateValid = false;
		}
	} else {
		isDateValid = false;
	}

	return isDateValid;
}

function isFirstDateBefore(firstDate,secondDate){
	if((firstDate != null && firstDate != '') && (secondDate != null && secondDate != '')){		
		if(eval(firstDate.substring(6,10)) < eval(secondDate.substring(6,10))){
			return true;
		} else if(eval(firstDate.substring(6,10)) == eval(secondDate.substring(6,10))){
			if(eval(firstDate.substring(3,5)) < eval(secondDate.substring(3,5))){
				return true;
			} else if(eval(firstDate.substring(3,5)) == eval(secondDate.substring(3,5))){
				if(eval(firstDate.substring(0,2)) < eval(secondDate.substring(0,2))){
					return true;
				} else if(eval(firstDate.substring(0,2)) == eval(secondDate.substring(0,2))){
					return true;
				} else {
					return false;
				}
			} else{
				return false;
			}
		} else {
			return false;
		}
	}else{
		return false;
	}
}

function countRowInTable(field,inField) {
	var count = 0;
	while (true) {
		var temp='.'+inField;
		if(inField==''){
			temp='';
		}
		if (document.getElementsByName(field+'['+ count + ']'+temp).length != 0)
			count++;
		else
			break;

	}
	return count;
}
function modifyRow(table){
return true;
	
}

function findNoOfRows(table){
	var allInputTags=table.getElementsByTagName('input');
	var allSelectTags=table.getElementsByTagName('select');
	var allTextareaTags=table.getElementsByTagName('textarea');
	var name1,name2;
	var count=0;
	
	for(var i=0;i<allSelectTags.length;i++){
		
			name1=allSelectTags[i].name;
			name2=name1.substring(name1.lastIndexOf(']')+2,name1.length);
			name1=name1.substring(0,name1.lastIndexOf('['));
			
			count=countRowInTable(name1,name2);
			return count;
	}
	
	for(var i=0;i<allInputTags.length;i++){
		if(allInputTags[i].type!="checkbox" && allInputTags[i].name.indexOf('chosenCheckBox')==-1){
			name1=allInputTags[i].name;
			name2=name1.substring(name1.lastIndexOf(']')+2,name1.length);
			name1=name1.substring(0,name1.lastIndexOf('['));
			
			count=countRowInTable(name1,name2);
			return count;
		}
	}
	
	for(var i=0;i<allTextareaTags.length;i++){
		
			name1=allTextareaTags[i].name;
			name2=name1.substring(name1.lastIndexOf(']')+2,name1.length);
			name1=name1.substring(0,name1.lastIndexOf('['));
			
			count=countRowInTable(name1,name2);
			return count;
		
	}
}
function validateForm(){
	//var elements=document.forms[0].elements
	//for(var i=0;i<elements.length;i++){
		//j.validateAll(elements[i],elements[i].name,elements[i].value);
	//}
	j.validateAll(document.forms[0].elements);
}

function hideError(){
if($('#validationErrorMsg')[0].notRemovable != true){
	$('#validationErrorMsg').hide();
}
}

function prefill(){
}

function getAllTabs(){
	var objArr=new Array();
	$('.tabs').hide()
	var temp=$('.tabs:nth-child(1) li a');
	for(var i=0;i<temp.length;i++){
		objArr[i]=temp[i];
	}
	return objArr;
}

function setOnFocusDoc(){
	var page='page'+document.getElementById('currentPage').value;
	var inputs=document.getElementById(page).getElementsByTagName('input');
	var flag=false;
	flag=checkHidden(inputs);
	if(!flag){
		inputs=document.getElementById(page).getElementsByTagName('select');
		flag=checkHidden(inputs);
	}
	if(!flag){
		inputs=document.getElementById(page).getElementsByTagName('textarea');
		flag=checkHidden(inputs);
	}
}
function checkHidden(inputs){
	for(var i=0;i<inputs.length;i++){
		if(!inputs[i].hidden){
			inputs[i].focus();
			return true;
		}
	}
	return false;
}

function toggleTab(page,toggle){
	main.toggleTab(page,toggle);
}

function setFileName(fieldName,fileName){
	document.getElementById(fieldName+'.fileName').innerHTML=fileName;
        document.getElementsByName(fieldName)[0].value=fileName;
}
