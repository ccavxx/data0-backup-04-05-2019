function populateIWE(){
	var iWe = document.getElementsByName('form3ca.f3CA.declaration.point1.iWe')[0];

	if(iWe.value=="I"){
		document.getElementsByName('form3ca.f3CA.declaration.point1.meUs')[0].value='Me';
		document.getElementsByName('form3ca.f3CA.declaration.point1A.iWe')[0].value='I';
		document.getElementsByName('form3ca.f3CA.declaration.point1.myOur')[0].value='My';
		document.getElementsByName('form3ca.f3CA.declaration.point3A.myMe')[0].value='my';
		document.getElementsByName('form3ca.f3CA.declaration.point3B.myMe')[0].value='my';
		document.getElementsByName('form3ca.f3CA.declaration.point3C.myMe')[0].value='me';
		
		document.getElementsByName('form3ca.f3CA.declaration.point3A.myMeHidden')[0].value='My';
		document.getElementsByName('form3ca.f3CA.declaration.point3B.myMeHidden')[0].value='My';
		document.getElementsByName('form3ca.f3CA.declaration.point3C.myMeHidden')[0].value='Me';
	}else if(iWe.value=="We"){
		document.getElementsByName('form3ca.f3CA.declaration.point1.meUs')[0].value='Us';
		document.getElementsByName('form3ca.f3CA.declaration.point1A.iWe')[0].value='We';
		document.getElementsByName('form3ca.f3CA.declaration.point1.myOur')[0].value='Our';
		document.getElementsByName('form3ca.f3CA.declaration.point3A.myMe')[0].value='our';
		document.getElementsByName('form3ca.f3CA.declaration.point3B.myMe')[0].value='our';
		document.getElementsByName('form3ca.f3CA.declaration.point3C.myMe')[0].value='us';
		
		document.getElementsByName('form3ca.f3CA.declaration.point3A.myMeHidden')[0].value='Our';
		document.getElementsByName('form3ca.f3CA.declaration.point3B.myMeHidden')[0].value='Our';
		document.getElementsByName('form3ca.f3CA.declaration.point3C.myMeHidden')[0].value='Us';
	}	
}

function populateIWEHiddenValues() {
	var iWe = document.getElementsByName('form3ca.f3CA.declaration.point1.iWe')[0];
	if(iWe.value=="I"){		
		
		document.getElementsByName('form3ca.f3CA.declaration.point3A.myMeHidden')[0].value='My';
		document.getElementsByName('form3ca.f3CA.declaration.point3B.myMeHidden')[0].value='My';
		document.getElementsByName('form3ca.f3CA.declaration.point3C.myMeHidden')[0].value='Me';
		
	}else if(iWe.value=="We"){		
		
		document.getElementsByName('form3ca.f3CA.declaration.point3A.myMeHidden')[0].value='Our';
		document.getElementsByName('form3ca.f3CA.declaration.point3B.myMeHidden')[0].value='Our';
		document.getElementsByName('form3ca.f3CA.declaration.point3C.myMeHidden')[0].value='Us';
		
	}	
}


/*function populateAy(){

	var year = document.getElementsByName('form3ca.f3CA.declaration.point1.year')[0].value;

	
	//document.getElementsByName('form3ca.f3CA.declaration.point1A.year')[0].value=year;
	//document.getElementsByName('form3cb.f3CB.partA.pshowTextBoxreviousYear')[0].value=year;
	//document.getElementsByName('form3cb.f3CB.form3CDAnnexure1PartA.previousYear')[0].value=year;
	
	
	if (parseInt(year, 10) >= 1000)
	{
		
		var nxt = parseInt(year, 10) % 1000 + 1;
		var len=nxt.toString().length;
		if(len=='1')
		{
			nxt="0"+nxt;
		}
		document.getElementsByName('form3cb.f3CB.partA.assessmentYear')[0].value=parseInt(year, 10)+ "-" + nxt;
	}else {
		document.getElementsByName('form3cb.f3CB.partA.assessmentYear')[0].value="";
	}
}*/

function populateTypeOfAccount(){

	var account = document.getElementsByName('form3ca.f3CA.declaration.point1.typeOfAccount')[0].value;

	if(account!=""){
		document.getElementsByName('form3ca.f3CA.declaration.point1A.typeOfAccount')[0].value=account;
	}else{
		document.getElementsByName('form3ca.f3CA.declaration.point1A.typeOfAccount')[0].value="";
	}
}

function populateValues(src,dest){

	var srcVal = document.getElementsByName(src)[0].value;
	if(srcVal!=null && srcVal!=""){
		document.getElementsByName(dest)[0].value=srcVal.toUpperCase();
	} else {
		document.getElementsByName(dest)[0].value="";
	}
}
var mitems=new Array();
 mitems['01']=['Select:',
 'Agro-based industries:0101',
 'Automobile and Auto parts:0102',
 'Cement:0103',
 'Diamond cutting:0104',
 'Drugs and Pharmaceuticals:0105',
 'Electronics including Computer Hardware:0106',
 'Engineering goods:0107',
 'Fertilizers, Chemicals, Paints:0108',
 'Flour & Rice Mills:0109',
 'Food Processing Units:0110',
 'Marble & Granite:0111',
 'Paper:0112',
 'Petroleum and Petrochemicals:0113',
 'Power and energy:0114',
 'Printing & Publishing:0115',
 'Rubber:0116',
 'Steel:0117',
 'Sugar:0118',
 'Tea, Coffee:0119',
 'Textiles, Handloom, Powerlooms:0120',
 'Tobacco:0121',
 'Tyre:0122',
 'Vanaspati & Edible Oils:0123',
 'Others:0124'
 ];
 mitems['02']=['Select:','Chain Stores:0201','Retailers:0202','Wholesalers:0203','Others:0204'];
 mitems['03']=['Select:','General Commission Agents:0301'];
 mitems['04']=['Select:','Builders:0401','Estate agents:0402','Property Developers:0403','Others:0404'];
 mitems['05']=['Select:','Civil Contractors:0501','Excise Contractors:0502','Forest Contractors:0503',
 'Mining Contractors:0504','Others:0505'];
 mitems['06']=['Select:','Chartered Accountants, Auditors, etc.:0601','Fashion designers:0602','Legal professionals:0603','Medical professionals:0604','Nursing Homes:0605','Specialty hospitals:0606','Others:0607'];
 mitems['07']=['Select:','Advertisement agencies:0701','Beauty Parlours:0702','Consultancy services:0703','Courier Agencies:0704','Computer training/educational and coaching institutes:0705','Forex Dealers:0706','Hospitality services:0707',
 'Hotels:0708',
 'I.T. enabled services, BPO service providers:0709',
 'Security agencies:0710',
 'Software development agencies:0711',
 'Transporters:0712',
 'Travel agents, tour operators:0713',
 'Others:0714'];

 mitems['08']=['Select:','Banking Companies:0801','Chit Funds:0802','Financial Institutions:0803','Financial service providers:0804','Leasing Companies:0805','Money Lenders:0806','Non-Banking Financial Companies:0807',

 'Share Brokers, Sub-brokers, etc.:0808',
 'Others:0809'];
 mitems['09']=['Select:','Cable T.V. productions:0901','Film distribution:0902','Film laboratories:0903','Motion Picture Producers:0904','Television Channels:0905','Others:0906'];
 mitems['10']=['Select:','other than (1) to (9) above:1001'];


function onSectorChange(elem,tableId){

	var index = parseInt(elem.name.substring(elem.name.indexOf("[") + 1, elem.name.indexOf("]")));
    if(tableId=='pt4Table'){
     	var sector = document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+index+'].sector')[0];
	    var subSector = document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+index+'].subSector')[0];
	}else if(tableId=='pt10aTable'){
	    var sector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+index+'].sector')[0];
	    var subSector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+index+'].subSector')[0];
	}else if(tableId=='pt10bTable'){
	    var sector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+index+'].sector')[0];
	    var subSector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+index+'].subSector')[0];
		}

	if(!subSector){return;}
	subSector.options.length=0;
	cur=mitems[sector.options[sector.selectedIndex].value];
	if(!cur){return;}
	subSector.options.length=cur.length;
	if(sector.value!='') {
		for(var i=0;i<cur.length;i++)
		{
			var cuArry=cur[i].split(":");
			var first = cuArry[0];
			var last = cuArry[1];

			subSector.options[i].text=first;
			subSector.options[i].value=last;
		}
	}
	if(tableId=='pt4Table'){
	    document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+index+'].sectionCode')[0].value="";
	}else if(tableId=='pt10aTable'){
	    document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+index+'].sectorCode')[0].value="";
	}else if(tableId=='pt10bTable'){
	    document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+index+'].sectorCode')[0].value="";
	}
}


function onSubSectorChange(tableId){
	var tab= document.getElementById(tableId);
	var noOfRows = tab.rows.length;

	for(var j=0;j<noOfRows;j++) { 
	    if(tableId=='pt4Table'){
		   var subSector = document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+j+'].subSector')[0];
		   document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+j+'].sectionCode')[0].value=subSector.value;
		}else if(tableId=='pt10aTable'){
		   var subSector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+j+'].subSector')[0];
		   document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+j+'].sectorCode')[0].value=subSector.value;
		}else if(tableId=='pt10bTable'){
		   var subSector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+j+'].subSector')[0];
		   document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+j+'].sectorCode')[0].value=subSector.value;
		}
	}
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
				alert ('exception caught in addRowToTable =:  ' + e );
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
	}catch(e){
	  alert('error in addrow' + e);
	}
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
		alert ('exception caught in checkRowBlank =:  ' + e );
	}
	return isRowBlank;
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
		alert('exception caught in deleteRowTable =' +e.stack );
	}
}

function populatePartB(){
	document.getElementsByName('form3cb.3cb.firstName')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.firstName')[0].value;
	document.getElementsByName('form3cb.3cb.middleName')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.middleName')[0].value;
	document.getElementsByName('form3cb.3cb.lastName')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.lastName')[0].value;

	document.getElementsByName('form3cb.3cb.addressLine1')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.addressLine1')[0].value;
	document.getElementsByName('form3cb.3cb.addressLine2')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.addressLine2')[0].value;
	document.getElementsByName('form3cb.3cb.city')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.city')[0].value;
	document.getElementsByName('form3cb.3cb.stateCode')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.stateCode')[0].value;
	document.getElementsByName('form3cb.3cb.pincode')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.pincode')[0].value;

	document.getElementsByName('form3cb.3cb.place')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.place')[0].value;

	document.getElementsByName('form3cb.3cb.memNumber')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.membershipNo')[0].value;

	document.getElementsByName('form3cb.3cb.firmRegNumber')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.frn')[0].value;

	document.getElementsByName('form3cb.3cb.date')[0].value=document.getElementsByName('form3cb.f3CB.otherInformation1.date')[0].value;

	//document.getElementsByName('form3cb.f3CB.partA.from.date')[0].value=document.getElementsByName('form3ca.f3CA.declaration.point1.startDate')[0].value;

	//document.getElementsByName('form3cb.f3CB.partA.to.date')[0].value=document.getElementsByName('form3ca.f3CA.declaration.point1.endDate')[0].value;


	}



function enableTable(tableId,fieldName){

	var tabl = document.getElementById(tableId);
	var allInputTags = tabl.getElementsByTagName('input');

	var selectTags = tabl.getElementsByTagName('select');
	
	var status=document.getElementsByName(fieldName)[0].value;
	

	for(var i = 0; i < allInputTags.length; i++) {
			
		if(tableId !='pt10bTable' && tableId !='pt29Table' && tableId !='pt28Table'){
				if(status=='Y' || status=='5'){		
				allInputTags[i].disabled=false;
				allInputTags[i].readOnly=false;	
		
						
			}else{
		
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;
				allInputTags[i].value="";	
			}

		}
		
		if(tableId == 'pt9aTable'){
			if(status=='7'){
                    
				document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].disabled=false;
				
			}else if(status=='3'||status=='4'){

				document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].value='';
				document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].disabled=true;
				allInputTags[i].disabled=false;
				allInputTags[i].readOnly=false;	
				allInputTags[i].value="";
				adjustTable('pt9aTable',document.getElementsByName('form3cb.f3CB.partA.status')[0],1,1);
			
			}else{
					document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].value='';
					document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].disabled=true;
					allInputTags[i].disabled=true;
					allInputTags[i].readOnly=true;	
					allInputTags[i].value="";
					adjustTable('pt9aTable',document.getElementsByName('form3cb.f3CB.partA.status')[0],1,1);	
			}
	   }
		
	   if(tableId =='pt9bTable'){
			if(status=='3'||status=='4'||status=='7'){		
            
				document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].value='';
				document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].disabled=false;	
				adjustTable('pt9bTable',document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0],1,1);
			}else{
				
				document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].value='';
				document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].disabled=true;
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;	
				allInputTags[i].value="";
				adjustTable('pt9bTable',document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0],1,1);
			}

		}
	   
	   if(tableId =='pt29Table'){
			if(status=='5'){		
           
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viib)')[0].disabled=false;			
			}else{
				
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viib)')[0].value='';
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viib)')[0].disabled=true;
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;	
				allInputTags[i].value="";
				adjustTable('pt29Table',document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viib)')[0],1,1);
			}

		}
	   
	   if(tableId =='pt28Table'){
			if(status=='3'||status=='4'||status=='5'){		
	            
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0].disabled=false;	
				//adjustTable('pt28Table',document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0],1,1);
			}else{
				
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0].value='';
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0].disabled=true;
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;	
				allInputTags[i].value="";
				adjustTable('pt28Table',document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0],1,1);
			}


		}
		
		if(tableId == 'pt34aTable'){	
			var tabl = document.getElementById(tableId);
			var allInputTagsNature = tabl.getElementsByTagName('input');
			for(var k=0; k<allInputTagsNature.length; k++ ){
				if(allInputTagsNature[k].name.match("natureOfPayment$")){
			
					allInputTags[k].disabled=true;
				}
			
			}
		}
	}

	for(var i = 0; i < selectTags.length; i++){
		if(status=='Y'){
			
			selectTags[i].disabled=false;		
		}else{			
			selectTags[i].disabled=true;
			selectTags[i].value="";
		}
		
	}
	if(tableId=='pt11aTable' && status=='N'){
	   document.getElementById('pt11bCheck').checked=false;
	   document.getElementById('pt11cCheck').checked=false;
	}

}

function enableTableCondn(tableId,fieldName,flag){
	
	var table = document.getElementById(tableId);
	var allInputTags = table.getElementsByTagName('input');
	var selectTags = table.getElementsByTagName('select');
	
	  status=document.getElementsByName(fieldName)[0].value;
	  for(var i = 0; i < allInputTags.length; i++) {
			if(status==flag){	
				
				allInputTags[i].disabled=false;
				allInputTags[i].readOnly=false;
	      
			}else{
			
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;
				allInputTags[i].value="";
		
			} 
		  
	  }
	  
	  for(var i = 0; i < selectTags.length; i++){
			if(status==flag){
				
				selectTags[i].disabled=false;		
			}else{			
				selectTags[i].disabled=true;
				selectTags[i].value="";
			}
	  }
}
function enableTable27(tableId,fieldName){
	var tab = ["pt27b1Table","pt27b2Table","pt27b3Table","pt27b4Table"];
	var i=0;
	var j=0;
	for(j = 0; j < 4; j++){
	var table = document.getElementById(tab[j]);
	var allInputTags = table.getElementsByTagName('input');
	  status=document.getElementsByName(fieldName)[0].value;
	for(i = 0; i < allInputTags.length; i++) {
		if(status=='N'){	
		
			allInputTags[i].disabled=false;
			allInputTags[i].readOnly=false;
      
		}else{
		
			allInputTags[i].disabled=true;
			allInputTags[i].readOnly=true;
			allInputTags[i].value="";
	
		}
	}
  }	
}

function validateOnSubmit()
{
	calPoint40PY();
	calPoint40PPY();
	checkDateCompare();
	checkProfit('pt13cTable');
	checkProfit('pt13dTable');
	checkProfit('pt14bTable');
	validateIncreaseOrDecreasept13c();
	validateIncreaseOrDecreasept13d();
	validateIncreaseOrDecreasept14();
	checkPt34Amt();
	checkUniqueTableCol('pt18Table', 'descBlockAssets$');
	sumOfRatio('pt9aTable');
	checkDates();
	convertToAssmtYear();
	checkCSVTableMandatory('pt34aTable','form3cb.f3CB.form3CdFlags.complyXVIIB');
	checkCSVTableMandatoryOptNo('pt34bTable','form3cb.f3CB.form3CdFlags.TaxDeducted/Collected');
	checkCSVTableMandatory('pt34cTable','form3cb.f3CB.form3CdFlags.section201(1A)');
	populateValues('form3ca.f3CA.declaration.point1.pan','form3cb.f3CB.partA.pan');
}
function checkCSVTableMandatory(tableId,flag) {
	var tab = document.getElementById(tableId);
	var tbodys = tab.tBodies[1];
	var flagVal = document.getElementsByName(flag)[0].value;
	
	if(flagVal == 'Y') {
		if(!tbodys.children[1].cells[0].hasAttribute('id')) {
			j.setFieldError(flag, 'Table mandatory.');
			addErrorXHTML(document.getElementsByName(flag)[0], 'Table mandatory.' ,true);
		}
	}
}
function checkCSVTableMandatoryOptNo(tableId,flag) {
	var tab = document.getElementById(tableId);
	var tbodys = tab.tBodies[1];
	var flagVal = document.getElementsByName(flag)[0].value;
	
	if(flagVal == 'N') {
		if(!tbodys.children[1].cells[0].hasAttribute('id')) {
			j.setFieldError(flag, 'Table mandatory.');
			addErrorXHTML(document.getElementsByName(flag)[0], 'Table mandatory.' ,true);
		}
	}
}
function getPan(){
	return "";
}
function duplicateTable11b(){

    var tab= document.getElementById('pt11aTable');
    var noOfRows = tab.rows.length;
   if(document.getElementById("pt11bCheck").checked){
	   deletePerviousRows('pt11bCheck');
	  document.getElementsByName('form3CdFirmAopDetailPK.3cb11b[0].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11a[0].booksPk.booksDetails')[0].value;
     
     
     for(var i = 1; i <= (noOfRows-3); i++)
     { 
       addRowToTable('pt11bTable',2,1);
       document.getElementsByName('form3CdFirmAopDetailPK.3cb11b['+i+'].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11a['+i+'].booksPk.booksDetails')[0].value; 
       }

	  }else{
	  /*var tab= document.getElementById('pt11bTable');
     var noOfRows = tab.rows.length;
	  for(var i = 0; i < (noOfRows-2); i++){
	     document.getElementById('pt11bCheck.tableRow').checked=true;
	     deleteRowTable('pt11bTable',1,1);
	  }*/
		  
	  $('#pt11bTable input').attr("checked" , true);
		deleteRowTable('pt11bTable',1,1);
		$('#pt11bTable input').attr("checked" , false);
		  
	  document.getElementById('pt11bCheck.tableRow').checked=false;
	  document.getElementsByName('form3CdFirmAopDetailPK.3cb11b[0].booksPk.booksDetails')[0].value='';
	  if(document.getElementById('pt11cCheck').checked){
		/*var tab= document.getElementById('pt11cTable');
		var noOfRows = tab.rows.length;
			for(var i = 0; i < (noOfRows-2); i++){
				document.getElementById('pt11cCheck.tableRow').checked=true;
				deleteRowTable('pt11cTable',1,1);
			}*/
		  
		  $('#pt11cTable input').attr("checked" , true);
			deleteRowTable('pt11cTable',1,1);
			$('#pt11cTable input').attr("checked" , false);
		  
		document.getElementById('pt11cCheck.tableRow').checked=false;
		document.getElementById('pt11cCheck').checked=false;
		document.getElementsByName('form3CdFirmAopDetailPK.3cb11c[0].booksPk.booksDetails')[0].value=''; 
		}
 }
}

function duplicateTable11c(){
	 var tab= document.getElementById('pt11bTable');
	var noOfRows = tab.rows.length;
	if(document.getElementById("pt11cCheck").checked){
	deletePerviousRows('pt11cCheck');
  document.getElementsByName('form3CdFirmAopDetailPK.3cb11c[0].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11b[0].booksPk.booksDetails')[0].value;
 
  
  
  for(var i = 1; i <=(noOfRows-3); i++)
  {
	    addRowToTable('pt11cTable',2,1);
	    document.getElementsByName('form3CdFirmAopDetailPK.3cb11c['+i+'].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11b['+i+'].booksPk.booksDetails')[0].value;
	   }
  }else{
		  /*var tab= document.getElementById('pt11cTable');
	      var noOfRows = tab.rows.length;
		  for(var i = 0; i < (noOfRows-3); i++){
		     document.getElementById('pt11cCheck.tableRow').checked=true;
		     deleteRowTable('pt11cTable',1,1);
		  }*/
	   		
	   $('#pt11cTable input').attr("checked" , true);
		deleteRowTable('pt11cTable',1,1);
		$('#pt11cTable input').attr("checked" , false);
	   
		  document.getElementsByName('form3CdFirmAopDetailPK.3cb11c[0].booksPk.booksDetails')[0].value='';
}
}

function calPoint40PY(){
     var grossProfit=document.getElementsByName('form3cb.py.grossProfit')[0].value;
	 var grossTurnOver=document.getElementsByName('form3cb.py.grossTurnover')[0].value;
	 var netProfit=document.getElementsByName('form3cb.py.netProfit')[0].value;
	 var netTurnOver=document.getElementsByName('form3cb.py.netTurnover')[0].value;
	 var stockInTrade=coalesce(document.getElementsByName('form3cb.py.stockInTrade')[0].value,0);
	 var stockInTradeTurnOver=document.getElementsByName('form3cb.py.stockInTradeTurnover')[0].value;
	 var materialConsumed=document.getElementsByName('form3cb.py.materialConsumed')[0].value;
	 var finishedGoods=document.getElementsByName('form3cb.py.finishedGoodsProduced')[0].value;
     if(grossProfit !='' && grossTurnOver !=''){
    	 
    	 if(grossTurnOver == 0){
    		 document.getElementsByName('form3cb.py.pt40Gross')[0].value='';
	
    	  	}else{
    		   document.getElementsByName('form3cb.py.pt40Gross')[0].value=parseFloat(eval(parseInt(grossProfit) / parseInt(grossTurnOver))*100).toFixed(2); 
    	 }

	 }
	 else{
	     document.getElementsByName('form3cb.py.pt40Gross')[0].value='';
	 }
	 
	  if(netProfit !='' && netTurnOver !=''){
		  
	    	 if(netTurnOver == 0){
	    		 document.getElementsByName('form3cb.py.pt40Net')[0].value='';
	        	 }else{
	        		 document.getElementsByName('form3cb.py.pt40Net')[0].value=parseFloat(eval(parseInt(netProfit) / parseInt(netTurnOver))*100).toFixed(2);
	        	 }
	 }
	 else{
	     document.getElementsByName('form3cb.py.pt40Net')[0].value='';
	 }
	 
	  if(stockInTrade !='' && stockInTradeTurnOver !=''){
		  
	    	 if(stockInTradeTurnOver == 0){
	    		 document.getElementsByName('form3cb.py.pt40Stock')[0].value='';
	    			 }else{
	        		 document.getElementsByName('form3cb.py.pt40Stock')[0].value=parseFloat(eval(parseInt(stockInTrade) / parseInt(stockInTradeTurnOver))*100).toFixed(2);
	        	 }
	 }
	 else{
	     document.getElementsByName('form3cb.py.pt40Stock')[0].value='';
	 }
	 
	  if(materialConsumed !='' && finishedGoods !=''){
		  
	    	 if(materialConsumed  == 0){
	    		 document.getElementsByName('form3cb.py.pt40Mat')[0].value='';
	    			 }else{
	        		 document.getElementsByName('form3cb.py.pt40Mat')[0].value=parseFloat(eval(parseInt(materialConsumed) / parseInt(finishedGoods))*100).toFixed(2);
	        	 }
	 }
	 else{
	     document.getElementsByName('form3cb.py.pt40Mat')[0].value='';
	 }

}

function calPoint40PPY(){
    var grossProfit=document.getElementsByName('form3cb.ppy.grossProfit')[0].value;
	 var grossTurnOver=document.getElementsByName('form3cb.ppy.grossTurnover')[0].value;
	 var netProfit=document.getElementsByName('form3cb.ppy.netProfit')[0].value;
	 var netTurnOver=document.getElementsByName('form3cb.ppy.netTurnover')[0].value;
	 var stockInTrade=document.getElementsByName('form3cb.ppy.stockInTrade')[0].value;
	 var stockInTradeTurnOver=document.getElementsByName('form3cb.ppy.stockInTradeTurnover')[0].value;
	 var materialConsumed=document.getElementsByName('form3cb.ppy.materialConsumed')[0].value;
	 var finishedGoods=document.getElementsByName('form3cb.ppy.finishedGoodsProduced')[0].value;
    
	 if(grossProfit !='' && grossTurnOver !=''){
    	
   	 if(grossTurnOver == 0){
   		 	document.getElementsByName('form3cb.ppy.pt40Gross')[0].value='';
    	 }else{
	        document.getElementsByName('form3cb.ppy.pt40Gross')[0].value=parseFloat(eval(parseInt(grossProfit) / parseInt(grossTurnOver))*100).toFixed(2);
    	 }
	 
	 }
	 else{
	     document.getElementsByName('form3cb.ppy.pt40Gross')[0].value='';
	 }
	 
	  if(netProfit !=''&& netTurnOver !=''){
		  
		   	 if(netTurnOver == 0){
		   		document.getElementsByName('form3cb.ppy.pt40Net')[0].value='';
		    	 }else{
		    		 document.getElementsByName('form3cb.ppy.pt40Net')[0].value=parseFloat(eval(parseInt(netProfit) / parseInt(netTurnOver))*100).toFixed(2);
		    	 }
	 }
	 else{
	     document.getElementsByName('form3cb.ppy.pt40Net')[0].value='';
	 }
	 
	  if(stockInTrade !='' && stockInTradeTurnOver !=''){
		  
		   	 if(stockInTradeTurnOver == 0){
		   		document.getElementsByName('form3cb.ppy.pt40Stock')[0].value='';
		   			}else{
		    		 document.getElementsByName('form3cb.ppy.pt40Stock')[0].value=parseFloat(eval(parseInt(stockInTrade) / parseInt(stockInTradeTurnOver))*100).toFixed(2);
		    	 }
	 }
	 else{
	     document.getElementsByName('form3cb.ppy.pt40Stock')[0].value='';
	 }
	 
	  if(materialConsumed !='' && finishedGoods !=''){
		   	 if(materialConsumed == 0){
		   		document.getElementsByName('form3cb.ppy.pt40Mat')[0].value='';
		    	 }else{
		    		 document.getElementsByName('form3cb.ppy.pt40Mat')[0].value=parseFloat(eval(parseInt(materialConsumed) / parseInt(finishedGoods))*100).toFixed(2);
		    	 }
	 }
	 else{
	     document.getElementsByName('form3cb.ppy.pt40Mat')[0].value='';
	 }

}
function onchangeTable11a(){
	   var tab= document.getElementById('pt11aTable');
		var noOfRowsa = tab.rows.length;
		 var tabl= document.getElementById('pt11bTable');
		var noOfRowsb = tabl.rows.length;
	   if(document.getElementById("pt11bCheck").checked && noOfRowsa==noOfRowsb){

	   for(var i = 0; i <=(noOfRowsa-2); i++)
	          { 
		        document.getElementsByName('form3CdFirmAopDetailPK.3cb11b['+i+'].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11a['+i+'].booksPk.booksDetails')[0].value; 
	          }
				onchangeTable11b();
	}
	if(document.getElementById("pt11bCheck").checked && noOfRowsa != noOfRowsb){
	  if(noOfRowsa > noOfRowsb){
	 for(var i = (noOfRowsb-2); i < (noOfRowsa-2); i++)
	          { 
		        addRowToTable('pt11bTable',2,1);
		        document.getElementsByName('form3CdFirmAopDetailPK.3cb11b['+i+'].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11a['+i+'].booksPk.booksDetails')[0].value; 
			    }
				onchangeTable11b();

	       }else{
		   
		   document.getElementsByName('pt11bCheck.checkBox')[0].checked=false;
		   
		   }
	    }
	}
function onchangeTable11b(){
	   var tab= document.getElementById('pt11bTable');
		var noOfRowsb = tab.rows.length;
		 var tab1= document.getElementById('pt11cTable');
		var noOfRowsc = tab1.rows.length;
		if(document.getElementById("pt11bCheck").checked){
			
			document.getElementById("pt11bCheck").checked=false;
		}
	   if(document.getElementById("pt11cCheck").checked && noOfRowsb==noOfRowsc){

	for(var i = 0; i <= (noOfRowsc-2); i++)
	          { 
		        document.getElementsByName('form3CdFirmAopDetailPK.3cb11c['+i+'].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11b['+i+'].booksPk.booksDetails')[0].value; 
		       
			    }
	}
	if(document.getElementById("pt11cCheck").checked && noOfRowsb != noOfRowsc){
	  if(noOfRowsb > noOfRowsc){
	 for(var i = (noOfRowsc-2); i < (noOfRowsb-2); i++)
	          { 
		        addRowToTable('pt11cTable',2,1);
		        document.getElementsByName('form3CdFirmAopDetailPK.3cb11c['+i+'].booksPk.booksDetails')[0].value=document.getElementsByName('form3CdFirmAopDetailPK.3cb11b['+i+'].booksPk.booksDetails')[0].value; 
		       
			    }

	}else{
		   
		   document.getElementsByName('pt11cCheck.checkBox')[0].checked=false;
		   
		   }
	}
	}

function onchangeTable11c(){
	
	if(document.getElementById("pt11cCheck").checked){
		
		document.getElementById("pt11cCheck").checked=false;
	}	
	
}
function deletePerviousRows(tableId){
	try{
	      if(tableId=='pt11cCheck'){
       /*var tab= document.getElementById('pt11cTable');
	      var noOfRows = tab.rows.length;
		  for(var i = 0; i <= (noOfRows-3); i++){
		     document.getElementById('pt11cCheck.tableRow').checked=true;
		     deleteRowTable('pt11cTable',1,1);
		  }*/
		  
		  $('#pt11cTable input').attr("checked" , true);
			deleteRowTable('pt11cTable',1,1);
			$('#pt11cTable input').attr("checked" , false);
			
		  document.getElementById('pt11cCheck.tableRow').checked=false;
		  document.getElementsByName('form3CdFirmAopDetailPK.3cb11c[0].booksPk.booksDetails')[0].value='';
		  }else if(tableId=='pt11bCheck')
		  {
			  /*var tab= document.getElementById('pt11bTable');
	      var noOfRows = tab.rows.length;
	      for(var i = 0; i <= (noOfRows-3); i++){
		     document.getElementById('pt11bCheck.tableRow').checked=true;
		     alert('delete num::'+(i+1) );
		    deleteRowTable('pt11bTable',1,1);
		  }*/
		  
			$('#pt11bTable input').attr("checked" , true);
			deleteRowTable('pt11bTable',1,1);
			$('#pt11bTable input').attr("checked" , false);
		  
		  document.getElementById('pt11bCheck.tableRow').checked=false;
		  document.getElementsByName('form3CdFirmAopDetailPK.3cb11b[0].booksPk.booksDetails')[0].value='';
		  } }
	catch(e) {
		alert('exception ::'+e.stack);
	}
}

function setSectorValuesOnLoad(tableId){
	var tab= document.getElementById(tableId);
	var noOfRows = tab.rows.length;
	for(var j=0;j<noOfRows-2;j++) {
	
	if(tableId=='pt10aTable'){
	var section = document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+j+'].sectorCode')[0].value;
	var sectorVal = section.substring(2,0);
	var subSectorVal = section.substring(2);
	var sector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+j+'].sector')[0];
	 var subSector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10a['+j+'].subSector')[0];
	 } else if(tableId=='pt10bTable'){
	var section = document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+j+'].sectorCode')[0].value;
	var sectorVal = section.substring(2,0);
	var subSectorVal = section.substring(2);
	var sector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+j+'].sector')[0];
	 var subSector = document.getElementsByName('form3CdFirmAopDetailPK.3cb10b['+j+'].subSector')[0];
	 }else if(tableId=='pt4Table'){
	var section = document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+j+'].sectionCode')[0].value;
	var sectorVal = section.substring(2,0);
	var subSectorVal = section.substring(2);
	var sector = document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+j+'].sector')[0];
	 var subSector = document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+j+'].subSector')[0];
	 }
	sector.selectedIndex=sectorVal;
	cur=mitems[sectorVal];

	if(!cur){return;}
	subSector.options.length=cur.length;
	 
	for(var i=0;i<cur.length;i++)
	{
	var cuArry=cur[i].split(":");
	var first = cuArry[0];
	var last = cuArry[1];
	subSector.options[i].text=first;
	subSector.options[i].value=last;
	}
	subSector.value=section;
	}
}


function calculateTotalsPt18(){
	
    var tab1 = document.getElementById('pt18Table');
	var noOfRows = tab1.rows.length;

	for(var i=0; i< (noOfRows-4); i++)
	{ 
	   document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].writtenDownVal')[0].value=zeroOrMore(eval(
			parseInt(coalesce(document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].openingWDV')[0].value),10)+
			parseInt(coalesce(document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].totalPurchaseValue')[0].value),10)-
			parseInt(coalesce(document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].totalDeduction')[0].value),10)-
			parseInt(coalesce(document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].depAllowable')[0].value),10)));
	}

}

function adjustForm() {
	
	
	enableTable('pt10bTable','form3cb.f3CB.form3CdFlags.changeNaturBuisnes');
	enableTable('pt11aTable','form3cb.f3CB.form3CdFlags.bookOfAcnt');
	enableTable('pt12Table','form3cb.f3CB.form3CdFlags.prftLoassAcnt');
	enableTable('pt13cTable','form3cb.f3CB.form3CdFlags.chngMethodOfAcc');
	enableTable('pt13dTable','form3cb.f3CB.form3CdFlags.sec145');
	enableTable('pt14bTable','form3cb.f3CB.form3CdFlags.sec145A');
	enableTableCondn('pt21dATable','form3cb.f3CB.form3CdFlags.sec40A3','N');
	enableTableCondn('pt21dBTable','form3cb.f3CB.form3CdFlags.sec40A3A','N');
	enableTable('pt27a1Table','form3cb.f3CB.form3CdFlags.valueTaxPYa');
	enableTable('pt30Table','form3cb.f3CB.form3CdFlags.section69D');
	enableTextBox('form3cb.f3CB.form3CdFlags.chngShareSec73','form3CdInadm.3cb32c.amount');
	enableTextBox('form3cb.f3CB.form3CdFlags.chngShareSec73e','form3CdInadm.3cb32e.amount');
	enableTextBox('form3cb.f3CB.form3CdFlags.chngShareSec73A','form3CdInadm.3cb32d.amount');
	enableTable('pt33Table','form3cb.f3CB.form3CdFlags.sectionDed');
	enableImpostCSVButtons('form3cb.f3CB.form3CdFlags.complyXVIIB','ImportCSV34a','FillData34a','ClearData34a','<tr></tr><tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>','pt34aTable');
	enableTable('pt34cTable','form3cb.f3CB.form3CdFlags.section201(1A)');
	enableImpostCSVButtons('form3cb.f3CB.form3CdFlags.section201(1A)','ImportCSV34c','FillData34c','ClearData34c','<tr></tr><tr><td>1</td><td></td><td></td><td></td><td></td></tr>','pt34cTable');
	enableTableCondn('pt34bTable','form3cb.f3CB.form3CdFlags.TaxDeducted/Collected','N');
	enableImpostCSVButtonsNo('form3cb.f3CB.form3CdFlags.TaxDeducted/Collected','ImportCSV34b','FillData34b','ClearData34b','<tr></tr><tr><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>','pt34bTable');
	populateIWEHiddenValues();
	populateValues('form3ca.f3CA.declaration.point1.firstName','form3cb.f3CB.partA.firstName');
	populateValues('form3ca.f3CA.declaration.point1.middleName','form3cb.f3CB.partA.middleName');
	populateValues('form3ca.f3CA.declaration.point1.lastName','form3cb.f3CB.partA.lastName');
	enableTextBox('form3cb.f3CB.form3CdFlags.costAudit','form3cb.f3CB.form3CdFlags.costAudit.details');
	enableTextBox('form3cb.f3CB.form3CdFlags.centralExciseAct','form3cb.f3CB.form3CdFlags.centralExciseAct.details');
	enableTextBox('form3cb.f3CB.form3CdFlags.AuditunderSection72A','form3cb.f3CB.form3CdFlags.AuditunderSection72A.details');
	enableField('form3cb.f3CB.partA.indirectTaxFlag','form3cb.f3CB.partA.regNo');
	enableField('form3cb.f3CB.partA.indirectTaxFlag','form3cb.f3CB.partA.indirectTaxFlagA');
	setSectorValuesOnLoad('pt10aTable');
	setSectorValuesOnLoad('pt10bTable');
	populatePartB();
	enableField('form3cb.f3CB.form3CdFlags.salesTax','Y','form3cb.form3CdFlags.26iia.salesTax');
	//enableField('form3cb.f3CB.form3CdFlags.salesTax','form3cb.form3CdFlags.26iia.salesTax')
	//populateAy();
	//populateDeclaration('form3cb.f3CB.declaration.point1.typeOfAccount');
	enableTable('pt4ATable','form3cb.f3CB.partA.indirectTaxFlag');
	showTextBox('pt4ATable');
	populateTypeOfAccount();
	populateValues('form3ca.f3CA.declaration.point1.auditStartDate','form3cb.f3CB.partA.from.date');
	populateValues('form3ca.f3CA.declaration.point1.auditEndDate','form3cb.f3CB.partA.to.date');
    enableTable('pt36Table','form3cb.f3CB.partA.status');
    enableTableOnImport('pt9aTable');
	enableTableOnImport('pt9bTable');
	enableTableOnImport('pt28Table');
	enableTableOnImport('pt29Table');
    showTextBox('pt12Table');
    showTextBox('pt16bTable');
	enableStateClause41('pt41Table');
	populateValues('form3ca.f3CA.declaration.point1.pan','form3cb.f3CB.partA.pan');

}


function enableStateClause41(tableId){
	var tab= document.getElementById(tableId);
	var noOfRows = tab.rows.length;
	
	for(var j=0;j<noOfRows-2;j++){
		if(document.getElementsByName('form3cb.wealthTaxAct['+j+'].nameTaxLaw')[0].value=='SAT' ||
				document.getElementsByName('form3cb.wealthTaxAct['+j+'].nameTaxLaw')[0].value=='SED' ){
			 document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeState')[0].style.display='';
			 //addErrorXHTML(document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeState')[0],'If registered in more than 1 State,provide details by add row option',true);
			 
			
		}else{
			document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeState')[0].style.display='none';
			document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeState')[0].value='';
		}
		
		if(document.getElementsByName('form3cb.wealthTaxAct['+j+'].nameTaxLaw')[0].value=='OIT'){
			document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeOthers')[0].style.display='';
			document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeOthers')[0].disabled=false;
			
		}else{
			document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeOthers')[0].style.display='none';
			document.getElementsByName('form3cb.wealthTaxAct['+j+'].typeOthers')[0].value='';
		}
		
		
	}
}


function enableTableOnImport(tableId){

	
	var tabl = document.getElementById(tableId);
	var allInputTags = tabl.getElementsByTagName('input');
	var statusField=document.getElementsByName('form3cb.f3CB.partA.status')[0].value;

	for(var i = 0; i < allInputTags.length; i++) {
		if(tableId=='pt9aTable'){
			if(statusField =='7'){
				document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].disabled=false;
				enableTableYesNo('pt9aTable','form3cb.f3CB.form3CdFlags.shareOfMembers');	
              }else if(statusField=='3'|| statusField=='4'){
            	  	document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].disabled=true;
            	  	document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].value='';
    				allInputTags[i].disabled=false;
    				allInputTags[i].readOnly=false;	
            	  }else{
              	  	document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].disabled=true;
            	  	document.getElementsByName('form3cb.f3CB.form3CdFlags.shareOfMembers')[0].value='';
    				allInputTags[i].disabled=true;
    				allInputTags[i].readOnly=true;	
            	  }
          }else if(tableId=='pt9bTable'){	
			if(statusField =='3' || statusField =='4' || statusField =='7'){
					document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].disabled=false;
					enableTableYesNo('pt9bTable','form3cb.f3CB.form3CdFlags.changeInPartner');
				}else{
					document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].disabled=true;
					document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].value='';
					enableTableYesNo('pt9bTable','form3cb.f3CB.form3CdFlags.changeInPartner');
				}
			}else if(tableId=='pt28Table'){
			if(statusField =='3' || statusField =='4' || statusField =='5'){
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0].disabled=false;
				enableTableYesNo('pt28Table','form3cb.f3CB.form3CdFlags.Section56(2)(viia)');
			}else{
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0].disabled=true;
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viia)')[0].value='';
				enableTableYesNo('pt28Table','form3cb.f3CB.form3CdFlags.Section56(2)(viia)');
			}
			
		}else if(tableId=='pt29Table'){
			if(statusField =='5'){
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viib)')[0].disabled=false;
				enableTableYesNo('pt29Table','form3cb.f3CB.form3CdFlags.Section56(2)(viib)');
			}else{
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viib)')[0].disabled=true;
				document.getElementsByName('form3cb.f3CB.form3CdFlags.Section56(2)(viib)')[0].value='';
				enableTableYesNo('pt29Table','form3cb.f3CB.form3CdFlags.Section56(2)(viib)');
			}
			
		}
	 }
	}
	

function enableTableYesNo(tableId,field){

	var tabl = document.getElementById(tableId);
	var allInputTags = tabl.getElementsByTagName('input');
	var status=document.getElementsByName(field)[0].value;
	var selectTags = tabl.getElementsByTagName('select');

	for(var i = 0; i < allInputTags.length; i++) {

			if(status=='Y' || tableId=='pt9aTable'){
				
				allInputTags[i].disabled=false;
				allInputTags[i].readOnly=false;	
				
			}else{
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;
				allInputTags[i].value="";	
			}	
			
		}
	
	for(var i = 0; i < selectTags.length; i++){
		if(status=='Y'){
			
			selectTags[i].disabled=false;		
		}else{			
			selectTags[i].disabled=true;
			selectTags[i].value="";
		}
		
	}
   }
function adjustTable(tableId,field,deleteIndex1,deleteIndex2) {

	var status = field.value;
	var statusPt27b1Table = 'N'
	if(tableId=='pt27b1Table') {
		statusPt27b1Table = field.value;
	}

	
	if(status=='N' || statusPt27b1Table == 'Y' || status=='' || status=='X') {
		$('#'+tableId+' input').attr("checked" , true);
        deleteRowTable(tableId,deleteIndex1,deleteIndex2);
        $('#'+tableId+' input').attr("checked" , false);
	}else if(tableId=='pt29Table' && status != '5' ){
	    $('#'+tableId+' input').attr("checked" , true);
        deleteRowTable(tableId,deleteIndex1,deleteIndex2);
        $('#'+tableId+' input').attr("checked" , false);
	}else if(tableId=='pt9aTable'){
	
		$('#'+tableId+' input').attr("checked" , true);
        deleteRowTable(tableId,deleteIndex1,deleteIndex2);
        $('#'+tableId+' input').attr("checked" , false);
	}else if(tableId=='pt9bTable' && status=='Y'){
	
		$('#'+tableId+' input').attr("checked" , true);
        deleteRowTable(tableId,deleteIndex1,deleteIndex2);
        $('#'+tableId+' input').attr("checked" , false);
	}
	
	
	if(tableId=='pt34bTable' && status=='Y'){
		$('#'+tableId+' input').attr("checked" , true);
        deleteRowTable(tableId,deleteIndex1,deleteIndex2);
        $('#'+tableId+' input').attr("checked" , false);
		
	}
}

function enableField(field1,field2){
	
	var status=document.getElementsByName(field1)[0].value;
	
		if(status=='Y'){		
			document.getElementsByName(field2)[0].disabled=false;
			document.getElementsByName(field2)[0].readOnly=false;			
						
		}else{
		
			document.getElementsByName(field2)[0].disabled=true;
			document.getElementsByName(field2)[0].readOnly=true;
			document.getElementsByName(field2)[0].value="";	
			
	
		}
	
}

function checkAssYear(field){
    var asstYear=field.value;
	var firstYear=parseInt(asstYear.substring(0,4),10)+1;
	var secondYear=asstYear.substring(5,7);
	if(!(firstYear.toString().substring(2,4) == secondYear)) {
		j.setFieldError('','The prior period must be consecutive');
		addErrorXHTML(field,'The prior period must be consecutive',true);
	 }
}
/*
function populateDeclaration(field){
 
   var account = document.getElementsByName(field)[0].value;
   var selectedSubCat = document.getElementsByName('form3cb.f3CB.declaration.point3.pointBC.pointSecond.plsd')[0].value;
   if(account == 'Income and expenditure account'){
	    var subCat = document.getElementById('pt3CprofLoss');
		subCat.options.length=0;
		subCat.options[0] =new Option('Select','');
		subCat.options[1]=new Option('Surplus','Surplus');
		subCat.options[2]=new Option('Deficit','Deficit');
		subCat.value=selectedSubCat;
   }else if (account == 'Profit and loss account'){
		var subCat = document.getElementById('pt3CprofLoss');
		subCat.options.length=0;
		subCat.options[0] =new Option('Select','');
		subCat.options[1]=new Option('Profit','Profit');
		subCat.options[2]=new Option('Loss','Loss');
		subCat.value=selectedSubCat;
   }else{
		var subCat = document.getElementById('pt3CprofLoss');
		subCat.options.length=0;
		subCat.options[0] =new Option('Select','');
   }
}
*/
function checkAmounts36(){
    var tab= document.getElementById('pt36Table');
	var noOfRows = tab.rows.length;
	alert("welcome");
	for(var i = 0; i < (noOfRows-2); i++)
	{
	  var profitAmount=parseInt(coalesce(document.getElementsByName('form3CdDistribtedProf115O.3cb36['+i+'].totAmtsDistProf')[0].value),10);
	  var totalTaxPaid=parseInt(coalesce(document.getElementsByName('form3CdDistribtedProf115O.3cb36['+i+'].totalTaxPaid')[0].value),10);
	  
	  if(profitAmount > 0 && totalTaxPaid>0){
	    if(profitAmount < totalTaxPaid){
		addErrorXHTML('','Total amount of distributed profit must be greater than total tax paid theron',true);
		j.setFieldError('form3CdDistribtedProf115O.3cb36['+i+'].totAmtsDistProf','Total amount of distributed profit must be greater than total tax paid theron');
	  
	    }
	}
   }
}

function addRowToSector(tableId) {
	addRowToTable(tableId,2,1);
	var tab1 = document.getElementById(tableId);
	var rowCount = tab1.rows.length-3;
	document.getElementsByName('form3CB.f3CB.annexure.sectionCode['+rowCount+'].subSector')[0].options.length=1;
}

function enableTextBox(field1,field2){
	
	var status=document.getElementsByName(field1)[0].value;
	
		if(status=='Y'){		
			document.getElementsByName(field2)[0].disabled=false;
			document.getElementsByName(field2)[0].readOnly=false;			
						
		}else{
		
			document.getElementsByName(field2)[0].disabled=true;
			document.getElementsByName(field2)[0].readOnly=true;
			document.getElementsByName(field2)[0].value="";	
			
	
		}
	
}

////////////////////////////////////////CSV////////////////////////////////

var deprAddRow = 0;
var deprAddLine = 1;
var deprDedRow = 0;
var deprDedLine = 1;
 

/*function populateCSV(name, val){
	try{

	if(name.indexOf(".addcsv[")!=-1 ){
		//alert('inside addcsv::');
		p.invoke('IMPORT_CSV_PLUGIN','SET_FIELDS',['pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv',name,decodeURIComponent(val)]);
		return true;
	}else if(name.indexOf(".dedcsv[")!=-1){
		p.invoke('IMPORT_CSV_PLUGIN','SET_FIELDS',['pt18TableDed','form3CdDeprAllw.3cb18[0].dedcsv',name,decodeURIComponent(val)]);
		return true;
	}
	}catch(e){alert('rrrrrrrrrrr:  ' + e);}
	return false;
}*/


function setCSVpt18AddValues(sumValues, index,lineNo) {
	index = parseInt(index,10) - 1;
	
	if(parseInt(lineNo,10) == 0) {
		main.generateMsgDialog('Empty file',"");
	} else {
		document.getElementsByName('form3CdDeprAllw.3cb18['+index+'].totalPurchase')[0].value=sumValues[0];
		document.getElementsByName('form3CdDeprAllw.3cb18['+index+'].totalModvat')[0].value=sumValues[1];
		document.getElementsByName('form3CdDeprAllw.3cb18['+index+'].totalChangeExchangeRate')[0].value=sumValues[2];
		document.getElementsByName('form3CdDeprAllw.3cb18['+index+'].totalSubsidyGrant')[0].value=sumValues[3];
		document.getElementsByName('form3CdDeprAllw.3cb18['+index+'].totalPurchaseValue')[0].value= parseInt(sumValues[0]) + parseInt(sumValues[1]) + 
																							parseInt(sumValues[2]) + parseInt(sumValues[3]);
		main.generateMsgDialog('Successfully '+lineNo+' row/rows imported.',"");
		calculateTotalsPt18();
	}
	
}

function setCSVpt18DedValues(sumValues, index,lineNo) {
	
	index = parseInt(index,10) - 1;
	
	if(parseInt(lineNo,10) == 0) {
		main.generateMsgDialog('Empty file',"");
	} else {
		document.getElementsByName('form3CdDeprAllw.3cb18['+index+'].totalDeduction')[0].value=sumValues[0];
		main.generateMsgDialog('Successfully '+lineNo+' row/rows imported.',"");
		calculateTotalsPt18();
	}
}

function modifyCSVButtons(actionType){
	var tab = document.getElementById('pt18Table');
	var lastRow = tab.rows[tab.rows.length-2];
	var slNo = lastRow.getElementsByTagName('td')[0].innerHTML;
	var lastFn = lastRow.getElementsByTagName('img')[0].getAttribute('onclick');
	
	var lastAddFn = lastRow.getElementsByTagName('img')[1].getAttribute('onclick');
	
	var lastAddViewFun = lastRow.getElementsByTagName('img')[2].getAttribute('onclick');
	var lastDedViewFun = lastRow.getElementsByTagName('img')[5].getAttribute('onclick');
	
	var lastDedFn = lastRow.getElementsByTagName('img')[4].getAttribute('onclick');

	var lastRownum = lastFn.substring(lastFn.lastIndexOf(',')+2,lastFn.lastIndexOf(']')-1);
	var lastIndex = lastFn.substring(lastFn.lastIndexOf('addcsv\',')+9,lastFn.lastIndexOf(',')-1);
	//alert('lastIndex::'+lastIndex+'  lastRownum:'+lastRownum);
	if(actionType) {
		var rowCount1 = tab.rows.length -4;
		var rowNo = 3;
		for(var a =0; a<rowCount1;a++) {
			var rowObject = tab.rows[rowNo];
			slNo = rowObject.getElementsByTagName('td')[0].innerHTML;
			//alert('slNo::'+slNo);
			var lastFun = rowObject.getElementsByTagName('img')[0].getAttribute('onclick');
			var lastFunDed = rowObject.getElementsByTagName('img')[3].getAttribute('onclick');
			
			var fillDataAdd = rowObject.getElementsByTagName('img')[1].getAttribute('onclick');
			var fillDataDed = rowObject.getElementsByTagName('img')[4].getAttribute('onclick');
			
			var index1 = lastFun.substring(0,lastFn.lastIndexOf(',')+2);
			var index2 = lastFun.substring(lastFn.lastIndexOf("'"));
			
			var index3 = lastFunDed.substring(0,lastFn.lastIndexOf(',')+2);
			var index4 = lastFunDed.substring(lastFn.lastIndexOf("'"));
			
			var index5 = fillDataAdd.substring(0,lastAddFn.lastIndexOf('=')+1);
			var index6 = fillDataAdd.substring(lastAddFn.lastIndexOf("clearPt18AdtionsFillDataTable")-1);
			
			var index7 = fillDataDed.substring(0,lastDedFn.lastIndexOf('=')+1);
			var index8 = fillDataDed.substring(lastDedFn.lastIndexOf("clearPt18DeducFillDataTable")-1);
			
			var index9 = lastAddViewFun.substring(0,lastAddViewFun.lastIndexOf(',')+2);
			var index10 = lastAddViewFun.substring(lastAddViewFun.lastIndexOf("'"));		
			
			var index11 = lastDedViewFun.substring(0,lastDedViewFun.lastIndexOf(',')+2);
			var index12 = lastDedViewFun.substring(lastDedViewFun.lastIndexOf("'"));	
			
			var name = index1 +  slNo +  index2;
			var nameDed = index3 +  slNo +  index4;
			
			var addName = index5 +  slNo +  index6;
			var dedName = index7 +  slNo +  index8;
			var viewAddName = index9 +  slNo +  index10;
			var viewDedName = index11 +  slNo +  index12;

			
			//alert('name:::'+name);
			rowObject.getElementsByTagName('img')[0].setAttribute('onclick',name);
			rowObject.getElementsByTagName('img')[3].setAttribute('onclick',nameDed);
			rowObject.getElementsByTagName('img')[1].setAttribute('onclick',addName);
			rowObject.getElementsByTagName('img')[4].setAttribute('onclick',dedName);
			rowObject.getElementsByTagName('img')[2].setAttribute('onclick',viewAddName);
			rowObject.getElementsByTagName('img')[5].setAttribute('onclick',viewDedName);
			rowNo++;
		}
	} else {
		lastRow.getElementsByTagName('img')[0].setAttribute('onclick',"p.invoke('IMPORT_CSV_PLUGIN','DEPR_ADD',['pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv','" + (parseInt(lastIndex) + 1) + "','" + slNo + "']);");
		lastRow.getElementsByTagName('img')[3].setAttribute('onclick',"p.invoke('IMPORT_CSV_PLUGIN','DEPR_DED',['pt18TableDed','form3CdDeprAllw.3cb18[0].dedcsv','" + (parseInt(lastIndex) + 1) + "','" + slNo + "']);");		
		lastRow.getElementsByTagName('img')[1].setAttribute('onclick',"deprAddRow="+ (parseInt(lastIndex) + 1) +";deprAddLine="+slNo+";clearPt18AdtionsFillDataTable();$('#csvAddtionsFillDiv').dialog('open');");
		lastRow.getElementsByTagName('img')[4].setAttribute('onclick',"deprDedRow="+ (parseInt(lastIndex) + 1) +";deprDedLine="+slNo+";clearPt18DeducFillDataTable();$('#csvDeductionsFillDiv').dialog('open');");
		lastRow.getElementsByTagName('img')[2].setAttribute('onclick',"p.invoke('IMPORT_CSV_PLUGIN','VIEW_CSV',['pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv','" + (parseInt(lastIndex) + 1) + "','" + slNo + "']);");
		lastRow.getElementsByTagName('img')[5].setAttribute('onclick',"p.invoke('IMPORT_CSV_PLUGIN','VIEW_CSV',['pt18TableDed','form3CdDeprAllw.3cb18[0].dedcsv','" + (parseInt(lastIndex) + 1) + "','" + slNo + "']);");

	}
}

function addRowToPt18(tableId,rowCount,lastRow){
	var tab = document.getElementById(tableId);
	var rowCount1 = tab.rows.length;
	addRowToTable(tableId,rowCount,lastRow);
	var newRowCount = tab.rows.length;
	if(newRowCount == eval(parseInt(rowCount1,10)+1)) {
		modifyCSVButtons();
	}
}


function deleteRowTableToPt18(tableId,rowCount,lastRow) {
	try{
	var tab = document.getElementById(tableId);
	var rowCount1 = tab.rows.length -4;
	var count=0;
	for(var a =0; a<rowCount1;a++) {
		var chosenCheckBoxChecked = document.getElementsByName('form3CdDeprAllw.3cb18['+a+'].chosenCheckBox')[0].checked;
		if(chosenCheckBoxChecked) {
			var deleteRow = tab.rows[a+3];
			var deleteRowFn = deleteRow.getElementsByTagName('img')[0].getAttribute('onclick');
			
			var index = deleteRowFn.substring(deleteRowFn.lastIndexOf('addcsv\',')+9,deleteRowFn.lastIndexOf(',')-1);
			
			p.invoke('IMPORT_CSV_PLUGIN','DELETE_ROW',['pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv',parseInt(index)]);
			count++;
		}
	}
	
	deleteRowTable(tableId,rowCount,lastRow);
	var newRowCount = tab.rows.length - 4;
	if(count != 0 && (newRowCount == eval(parseInt(rowCount1,10) - parseInt(count,10)) ||  count == rowCount1)) {
		modifyCSVButtons('DELETE');
	}
	} catch(e) {
		alert('exec::'+e)
	}
}


function modifyPreview(){
	p.invoke('IMPORT_CSV_PLUGIN','MOD_PREVIEW',['pt18TableAdd']);
	return true;

}


function enableField(src,val,targets){ 
	var srcField = document.getElementsByName(src)[0];
	if(contains(val,srcField.value)){
		for(var i=2;i<arguments.length; i++){	
			var targetField = document.getElementsByName(arguments[i])[0];		
				targetField.disabled= false;
				targetField.readOnly=false;
		}
	}else{
		for(var i=2;i<arguments.length; i++){
			var targetField = document.getElementsByName(arguments[i])[0];		
			if(targetField.type=='select-one'){
				targetField.selectedIndex = 0;
			}else{
				targetField.value='';
			}
			targetField.disabled= true;
			targetField.readOnly=true;
		}	
	}
	
}

function contains(arr, val){
	if(arr.constructor.name=="Array"){
		for(var i=0;i<arr.length; i++){
			if(arr[i]==val){
				return true;
			}
		}
		return false;
	}else{
		return (arr==val);
	}
}

/*function enableTable9b(tableId,fieldName){
    var tabl = document.getElementById(tableId);
	var allInputTags = tabl.getElementsByTagName('input');
	var status=document.getElementsByName(fieldName)[0].value;

	for(var i = 0; i < allInputTags.length; i++) {
		if(status=='Y'){	
            allInputTags[i].disabled=false;
			allInputTags[i].readOnly=false;		
		}else{
            allInputTags[i].disabled=true;
			allInputTags[i].readOnly=true;
			allInputTags[i].value="";	
		   }
	   }
	  
}*/

function selectNatureOfPayment34a(tableId)
{
	var tab= document.getElementById(tableId);
	var noOfRows = tab.rows.length;
	
	for(var j=0;j<noOfRows - 2;j++)
		{
		var section=document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].section')[0].value;
		
		
	document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].disabled=true;
	document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].readonly=true;
	
	if(section=='192')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Salary";	
	else if(section=='193')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Interest on securities";
	else if(section=='194')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Dividends";
	else if(section=='194A')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Interest other than Interest on securities";
	else if(section=='194B')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Winnings from lottery or crossword puzzle";
	else if(section=='194BB')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Winnings from horse race";
	else if(section=='194C')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payments to contractors";
	else if(section=='194D')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Insurance commission";
	else if(section=='194DA')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payment in respect of life insurance policy";
	else if(section=='194E')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payments to non-resident sportsmen or sports associations";
	else if(section=='194EE')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payments in respect of deposits under National Savings Scheme etc";
	else if(section=='194F')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payments on account of repurchase of units by Mutual Fund or Unit Trust of India";
	else if(section=='194G')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Commission etc. on the sale of lottery tickets.";
	else if(section=='194H')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Commission or brokerage";
	else if(section=='194-I')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Rent";
	else if(section=='194-IA')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payment on transfer of certain immovable property other than agricultural land";
	else if(section=='194J')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Fees for professional or technical services";
	else if(section=='194K')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Income in respect of units";
	else if(section=='194L')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payment of compensation on acquisition of capital asset";
	else if(section=='194LA')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Payment of compensation on acquisition of certain immovable property";
	else if(section=='194LB')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Income by way of interest from infrastructure debt fund";
	else if(section=='194LC')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Income by way of interest from Indian company";
	else if(section=='194LD')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Income by way of interest on certain bonds and Government securities";
	else if(section=='195')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Other sums";
	else if(section=='196B')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Income from units";
	else if(section=='196C')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Income from foreign currency bonds or shares of Indian company";
	else if(section=='196D')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Income of Foreign Institutional Investors from securities";
	else if(section=='206C')
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="Profits and gains from the business of trading in alcoholic liquor and forest produce and scrap etc";
	else
		document.getElementsByName('form3cb.f3CB.complyXVIIB['+j+'].natureOfPayment')[0].value="";
}

}


function enableTable36(tableId,fieldName){
    var tabl = document.getElementById(tableId);
	var allInputTags = tabl.getElementsByTagName('input');
	var status=document.getElementsByName(fieldName)[0].value;

	for(var i = 0; i < allInputTags.length; i++) {
		if(status=='5'){	
			
            allInputTags[i].disabled=false;
			allInputTags[i].readOnly=false;		
		}else{
			allInputTags[i].disabled=true;
			allInputTags[i].readOnly=true;	
			allInputTags[i].value="";
		   }
	   }
	  
}


function populateRateofDepr(){
	
	var table = document.getElementById('pt18Table');
	var rowCount = table.rows.length - 4;
	
	for(var i =0;i<rowCount;i++) {
		
		var field =  document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].descBlockAssets')[0];
			
		/*var index1 = eval(parseInt(field.name.lastIndexOf('[') ,10)+1);
		var index2 = eval(parseInt(field.name.lastIndexOf(']') ,10));
		var rowNumber = field.name.substring(index1, index2);
		rowNumber = parseInt(rowNumber ,10);*/
		
		var rateOfDep = document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].rateOfDepDisplay')[0];
		var rateOfDepHidden = document.getElementsByName('form3CdDeprAllw.3cb18['+i+'].rateOfDep')[0];
		
		rateOfDepHidden.value = field.value;
		
		if(field.value=="1") {
			rateOfDep.value="15";
		} else if(field.value=="2") {
			rateOfDep.value="30";
		} else if(field.value=="3") {
			rateOfDep.value="40";
		} else if(field.value=="4") {
			rateOfDep.value="50";
		} else if(field.value=="5") {
			rateOfDep.value="60";
		} else if(field.value=="6") {
			rateOfDep.value="80";
		} else if(field.value=="7") {
			rateOfDep.value="100";
		} else if(field.value=="14") {
			rateOfDep.value="3.4";
		} else if(field.value=="15") {
			rateOfDep.value="7.84";
		} else if(field.value=="16") {
			rateOfDep.value="8.24";
		} else if(field.value=="8") {
			rateOfDep.value="5";
		} else if(field.value=="9") {
			rateOfDep.value="10";
		} else if(field.value=="10") {
			rateOfDep.value="100";
		} else if(field.value=="17") {
			rateOfDep.value="3.02";
		} else if(field.value=="18") {
			rateOfDep.value="7.84";
		} else if(field.value=="19") {
			rateOfDep.value="3.4";
		} else if(field.value=="20") {
			rateOfDep.value="33.4";
		} else if(field.value=="11") {
			rateOfDep.value="10";
		} else if(field.value=="12") {
			rateOfDep.value="25";
		} else if(field.value=="13") {
			rateOfDep.value="20";
		} else if(field.value=="21") {
			rateOfDep.value="7.84";
		} else if(field.value=="22") {
			rateOfDep.value="1.95";
		} else if(field.value=="23") {
			rateOfDep.value="3.4";
		} else if(field.value=="24") {
			rateOfDep.value="7.81";
		} else if(field.value=="25") {
			rateOfDep.value="7.84";
		} else if(field.value=="26") {
			rateOfDep.value="7.84";
		} else if(field.value=="27") {
			rateOfDep.value="7.84";
		} else if(field.value=="28") {
			rateOfDep.value="12.77";
		} else if(field.value=="29") {
			rateOfDep.value="5.27";
		} else if(field.value=="30") {
			rateOfDep.value="33.4";
		} else if(field.value=="31") {
			rateOfDep.value="5.27";
		} else if(field.value=="32") {
			rateOfDep.value="3.02";
		} else if(field.value=="33") {
			rateOfDep.value="5.27";
		} else if(field.value=="34") {
			rateOfDep.value="7.84";
		} else if(field.value=="35") {
			rateOfDep.value="12.77";
		} else if(field.value=="36") {
			rateOfDep.value="33.4";
		} else if(field.value=="37") {
			rateOfDep.value="12.77";
		} else if(field.value=="38") {
			rateOfDep.value="33.4";
		} else if(field.value=="39") {
			rateOfDep.value="12.77";
		} else if(field.value=="40") {
			rateOfDep.value="12.77";
		} else if(field.value=="41") {
			rateOfDep.value="12.77";
		} else if(field.value=="42") {
			rateOfDep.value="12.77";
		} else if(field.value=="43") {
			rateOfDep.value="33.4";
		} else if(field.value=="44") {
			rateOfDep.value="12.77";
		} else if(field.value=="45") {
			rateOfDep.value="12.77";
		} else if(field.value=="46") {
			rateOfDep.value="7.69";
		}
	}
}

function showTextBox(tableId){
	
	var tab= document.getElementById(tableId);
	var noOfRows = tab.rows.length;
	
	for(var j=0;j<noOfRows-2;j++){
		if(tableId =='pt4ATable'){
	    if (document.getElementsByName('form3cb.f3CB.partA['+j+'].type')[0].value == 'OIT') {
	        document.getElementsByName('form3cb.f3CB.partA['+j+'].typeOthers')[0].style.visibility = 'visible';
	        document.getElementsByName('form3cb.f3CB.partA['+j+'].typeState')[0].value = '';
	    } else {
	        document.getElementsByName('form3cb.f3CB.partA['+j+'].typeOthers')[0].style.visibility = 'hidden';
	    }
	    
	    if (document.getElementsByName('form3cb.f3CB.partA['+j+'].type')[0].value == 'SED'||document.getElementsByName('form3cb.f3CB.partA['+j+'].type')[0].value =='SAT') {
	        document.getElementsByName('form3cb.f3CB.partA['+j+'].typeState')[0].style.visibility = 'visible';
	      //  addErrorXHTML(document.getElementsByName('form3cb.f3CB.partA['+j+'].typeState')[0],'If registered in more than 1 State,provide details by add row option',true);
	    } else {
	    	document.getElementsByName('form3cb.f3CB.partA['+j+'].typeState')[0].value = '';
	        document.getElementsByName('form3cb.f3CB.partA['+j+'].typeState')[0].style.visibility = 'hidden';
	    }
	}else if(tableId == 'pt12Table'){
	    if (document.getElementsByName('form3cdProfGainsPresum.3cb12['+j+'].section')[0].value == 'OTHER') {
	        document.getElementsByName('form3cdProfGainsPresum.3cb12['+j+'].otherSection')[0].style.visibility = 'visible';
	    } else {
	        document.getElementsByName('form3cdProfGainsPresum.3cb12['+j+'].otherSection')[0].style.visibility = 'hidden';
	    }
		
	}else if(tableId == 'pt16bTable'){
		if (document.getElementsByName('form3CdAmtNotCredit.3cb16b['+j+'].description')[0].value == 'OTH') {
	        document.getElementsByName('form3CdAmtNotCredit.3cb16b['+j+'].descriptionothers')[0].style.visibility = 'visible';
	    } else {
	        document.getElementsByName('form3CdAmtNotCredit.3cb16b['+j+'].descriptionothers')[0].style.visibility = 'hidden';
	    }		
	}
		}
}




function sumOfRatio(tableId)
{
	 var tabl = document.getElementById(tableId);
	 var noOfRows = tabl.rows.length;
	 var sumTotal=0;
	 var sumOld=0;
	 var sumNew=0;
	 if(tableId=="pt9aTable")
	 {
			 for(var k=0;k<noOfRows-2;k++)
			{
				var val=parseFloat( document.getElementsByName('form3CdFirmAopDetailPK.3cb9a['+k+'].firmAopPerc')[0].value);
				 sumTotal=parseFloat(sumTotal+val);
				 
			}
			 if(sumTotal>100)
			{ 
				
				addErrorXHTML('','Total profit sharing ratio should not be more than 100 in clause 9a',true);
				
			}
			
	 	}
}


function checkDates(){
	
	var startDate=document.getElementsByName('form3ca.f3CA.declaration.point1.auditStartDate')[0].value;
	var endDate=document.getElementsByName('form3ca.f3CA.declaration.point1.auditEndDate')[0].value;
    
	if(endDate!=null && endDate!=''&& startDate!=null && startDate!=''){
		if(checkFirstDateBefore(endDate,startDate)){
			addErrorXHTML('','End Date cannot be before Start Date',true);
		}
	}
}
function setFilledData(tableId){
	var arr = new Array();
	var tab = null;
	if(tableId == 'csvAddtionsFillTable') {
		tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-3;i++){
			var values=
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv[' + i + '].purchaseOrSaleDate')[0].value + ',' +
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv[' + i + '].datePutToUse')[0].value + ',' +
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv[' + i + '].purchaseOrSaleValue')[0].value + ',' +
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv[' + i + '].modvat')[0].value + ',' +
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv[' + i + '].exchangeRateChange')[0].value + ',' +
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv[' + i + '].subsidyGrant')[0].value + ',' +
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv[' + i + '].additionsTotalPurchaseValue')[0].value;
			arr[i] = values;
		}
		
		alert('arr: ' + arr);
		//alert(p.invoke('IMPORT_CSV_PLUGIN','DEPR_ADD_FILL_DATA',[arr,'pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv','"'+deprAddRow+'"','"'+deprAddLine+'"']));
		var success = p.invoke('IMPORT_CSV_PLUGIN','DEPR_ADD_FILL_DATA',[arr,'pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv','"'+deprAddRow+'"','"'+deprAddLine+'"']);
		if(success){
			$('#csvAddtionsFillDiv').dialog('close');
		}
	} else if(tableId == 'csvDeductionssFillTable') {
		tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].dedcsv[' + i + '].purchaseOrSaleDate')[0].value + ',' +
					  document.getElementsByName('form3CdDeprAllw.3cb18[0].dedcsv[' + i + '].purchaseOrSaleValue')[0].value;
			arr[i] = values;
		}
		
		alert('arr: ' + arr);
		//alert(p.invoke('IMPORT_CSV_PLUGIN','DEPR_ADD_FILL_DATA',[arr,'pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv','"'+deprAddRow+'"','"'+deprAddLine+'"']));
		var success = p.invoke('IMPORT_CSV_PLUGIN','DEPR_DED_FILL_DATA',[arr,'pt18TableDed','form3CdDeprAllw.3cb18[0].dedcsv','"'+deprDedRow+'"','"'+deprDedLine+'"']);
		if(success){
			$('#csvDeductionsFillDiv').dialog('close');
		}
	}
}
function calcPt18FillDataTotal(tableId) {
	var tab = document.getElementById(tableId);
	var rowCount = tab.rows.length - 3;
	
	for(var i=0;i<rowCount;i++){
		var purchaseOrSaleValue = coalesce(document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv['+i+'].purchaseOrSaleValue')[0].value);
		var modvat = coalesce(document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv['+i+'].modvat')[0].value);
		var exchangeRateChange = coalesce(document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv['+i+'].exchangeRateChange')[0].value);
		var subsidyGrant = coalesce(document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv['+i+'].subsidyGrant')[0].value);
		var additionsTotalPurchaseValue = document.getElementsByName('form3CdDeprAllw.3cb18[0].addcsv['+i+'].additionsTotalPurchaseValue')[0];
		
		additionsTotalPurchaseValue.value = zeroOrMore(eval(parseInt(purchaseOrSaleValue,10)+parseInt(modvat,10)+parseInt(exchangeRateChange,10)+parseInt(subsidyGrant,10)));
	}
}

function clearPt18AdtionsFillDataTable() {
	
	$('#csvAddtionsFillTable input').attr("checked" , true);
	deleteRowTable('csvAddtionsFillTable',2,1);
	$('#csvAddtionsFillTable input').attr("checked" , false);
}

function clearPt18DeducFillDataTable() {
	
	$('#csvDeductionssFillTable input').attr("checked" , true);
	deleteRowTable('csvDeductionssFillTable',1,1);
	$('#csvDeductionssFillTable input').attr("checked" , false);
}
function checkDateCompare(){
	var year = document.getElementsByName('form3ca.f3CA.declaration.point1.year')[0].value;
	var date= document.getElementsByName('form3cb.f3CB.otherInformation1.date')[0].value;
	var arr = date.split("/",3);
	var currYear=arr[2];
		
	if(parseInt(year,10) > parseInt(currYear,10))
	{
		
		j.setFieldError('form3cb.f3CB.otherInformation1.date','Please select a date greater than the date mentioned in Point 1b');
		addErrorXHTML(document.getElementsByName('form3cb.f3CB.otherInformation1.date')[0],'Please select a date greater than the date mentioned in Point 1b ',true);
		
	}
}
function enableTable9a(tableId,fieldName){

	var tabl = document.getElementById(tableId);
	var allInputTags = tabl.getElementsByTagName('input');
	
	var status=document.getElementsByName(fieldName)[0].value;

	for(var i = 0; i < allInputTags.length; i++) {

			if(status=='3' || status=='4' || status=='7'){
				
				allInputTags[i].disabled=false;
				allInputTags[i].readOnly=false;	
				
			}else{
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;
				allInputTags[i].value="";	
			}	
		}
   }


function enableTable9b(tableId,fieldName){

	var tabl = document.getElementById(tableId);
	var allInputTags = tabl.getElementsByTagName('input');

	var selectTags = tabl.getElementsByTagName('select');
	
	var status=document.getElementsByName(fieldName)[0].value;
	var statusField=document.getElementsByName('form3cb.f3CB.partA.status')[0].value;
	
	for(var i = 0; i < allInputTags.length; i++) {
			if(statusField !='1' && statusField !='2' && statusField !=''){
				document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].disabled=false;
			}else{
				document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].disabled=true;
				document.getElementsByName('form3cb.f3CB.form3CdFlags.changeInPartner')[0].value='';
			}
				if(status=='Y'){	
					
				allInputTags[i].disabled=false;
				allInputTags[i].readOnly=false;	
		
						
			}else{
		
				
				allInputTags[i].disabled=true;
				allInputTags[i].readOnly=true;
				allInputTags[i].value="";	
			}

	}
	
	var selectTags = tabl.getElementsByTagName('select');

	for(var i = 0; i < selectTags.length; i++){
		if(status=='Y'){
			
			selectTags[i].disabled=false;		
		}else{			
			selectTags[i].disabled=true;
			selectTags[i].value="";
		}
		
	}
	
}

function showErrorMessage(error) {
	main.generateMsgDialog(error,"");
}

function customBeforeSave(){
	try {
		var tab = document.getElementById('pt18Table');
		var len = tab.rows.length - 4;
		for(var j=0; j<len; j++){
			
			var onclickName = tab.rows[j+3].getElementsByTagName('img')[0].getAttribute('onclick');
			
			var index1 = parseInt(onclickName.substring(onclickName.lastIndexOf('.addcsv')+10, onclickName.lastIndexOf("',")));
			
			p.invoke('IMPORT_CSV_PLUGIN','GET_FIELDS',['pt18TableAdd','form3CdDeprAllw.3cb18[0].addcsv',index1,j]);
			
			p.invoke('IMPORT_CSV_PLUGIN','GET_FIELDS',['pt18TableDed','form3CdDeprAllw.3cb18[0].dedcsv',index1,j]);
		
		}
		
		p.invoke('IMPORT_CSV_PLUGIN','GET_FIELDS',['reset','form3CdDeprAllw.3cb18[0].dedcsv',0,0]);
		
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt21biaTable', 'taxdeductedlate.3cb21bia', 'taxdeductedlate.3cb21bia[0].dateOfPayment']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt21bibTable', 'taxdeductedlate.3cb21bib', 'taxdeductedlate.3cb21bib[0].dateOfPayment']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt21biiaTable', 'taxdeductedlate.3cb21biia', 'taxdeductedlate.3cb21biia[0].dateOfPayment']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt21biibTable', 'taxdeductednotpaid.3cb21biib', 'taxdeductednotpaid.3cb21biib[0].dateOfPayment']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt21bviaTable', 'taxdeductedlate.3cb21bvi', 'taxdeductedlate.3cb21bvi[0].dateOfPayment']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt34aTable', 'form3cb.f3CB.complyXVIIB', 'form3cb.f3CB.complyXVIIB[0].tan']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt34bTable', 'form3cb.f3CB.TaxCollectedPrescribedTime', 'form3cb.f3CB.TaxCollectedPrescribedTime[0].tan']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt20Table', 'form3CdEmpBonusComm.3cb20b', 'form3CdEmpBonusComm.3cb20b[0].nature']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt34cTable', 'form3cb.f3CB.form3Cd.section201(1A)', 'form3cb.f3CB.form3Cd.section201(1A)[0].tan']);
//		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt31aTable', 'form3CdAmtSec269SsDetail.3cb31a', 'form3CdAmtSec269SsDetail.3cb31a[0].lenderName']);
//		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt31bTable', 'form3CdAmtSec269TDetail.3cb31b', 'form3CdAmtSec269TDetail.3cb31b[0].payeeName']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt26iAaTable', 'form3CdUnpaidStrySec43B.3cb26iAa', 'form3CdUnpaidStrySec43B.3cb26iAa[0].section']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt26iAbTable', 'form3CdUnpaidStrySec43B.3cb26iAb', 'form3CdUnpaidStrySec43B.3cb26iAb[0].section']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt26iBaTable', 'form3CdUnpaidStrySec43B.3cb26iBa', 'form3CdUnpaidStrySec43B.3cb26iBa[0].section']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt26iBbTable', 'form3CdUnpaidStrySec43B.3cb26iBb', 'form3CdUnpaidStrySec43B.3cb26iBb[0].section']);
		/*p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt23Table', 'form3CdPymtSec40A2BDetail.3cb23', 'form3CdPymtSec40A2BDetail.3cb23[0].relatedPartyName']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt35aTable', 'form3CdTradeRawProdDet.3cb35a', 'form3CdTradeRawProdDet.3cb35a[0].itemName']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt35bATable', 'form3CdTradeRawProdDet.3cb35bA', 'form3CdTradeRawProdDet.3cb35bA[0].itemName']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt35bBTable', 'form3CdTradeRawProdDet.3cb35bB', 'form3CdTradeRawProdDet.3cb35bB[0].itemName']);
		p.invoke('CSV_PLUGIN_3CB_OTHERS','GET_FIELDS',['pt35bCTable', 'form3CdTradeRawProdDet.3cb35bC', 'form3CdTradeRawProdDet.3cb35bC[0].itemName']);*/

		
		} catch (e) {
			alert ('Uma :- ' + e);
		}
}

function customBeforeImport(){
	p.invoke('IMPORT_CSV_PLUGIN','SAVE_CSV',['pt18Table','form3CdDeprAllw.3cb18']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV',['pt21biaTable','taxdeductedlate.3cb21bia']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV',['pt21bviaTable','taxdeductedlate.3cb21bvi']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM',['pt34aTable','form3cb.f3CB.complyXVIIB']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM',['pt34bTable','form3cb.f3CB.TaxCollectedPrescribedTime']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM',['pt20Table','form3CdEmpBonusComm.3cb20b']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM',['pt34cTable','form3cb.f3CB.form3Cd.section201(1A)']);
//	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM',['pt31aTable','form3CdAmtSec269SsDetail.3cb31a']);
//	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM',['pt31bTable','form3CdAmtSec269TDetail.3cb31b']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV',['pt26iAaTable','form3CdUnpaidStrySec43B.3cb26iAa']);
	/*p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM',['pt23Table','form3CdPymtSec40A2BDetail.3cb23']);
	p.invoke('CSV_PLUGIN_3CB_OTHERS','SAVE_CSV_CUSTOM2',['pt35aTable','form3CdTradeRawProdDet.3cb35bA']);*/
}

function deleteTempFiles() {
	p.invoke('IMPORT_CSV_PLUGIN','DELETE_TEMP_FILES',[]);
}

function setCSVImportValues(tableId,lineNo,htmlBody,filledOption) {
	var tab = document.getElementById(tableId);
	var tbodys = tab.tBodies[1];
	tbodys.innerHTML = htmlBody;
	if(filledOption=='importCsv') {
		if(tableId == 'pt34cTable'){
			clearFillDataTable(tableId+'FillTable',2,1);
		} else {
			clearFillDataTable(tableId+'FillTable',1,1);
		}
	}
	
	main.generateMsgDialog('Successfully '+lineNo+' row/rows imported.',"");
}

function clearFillDataTable(tableId,deleteIndex1,deleteIndex2) {
	
	$('#'+tableId+' input').attr("checked" , true);
	deleteRowTable(tableId,deleteIndex1,deleteIndex2);
	$('#'+tableId+' input').attr("checked" , false);
}

function setFilledDataForPt21bia(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('taxdeductedlate.3cb21bia[' + i + '].dateOfPayment')[0].value + ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bia[' + i + '].amtOfPayment')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bia[' + i + '].natureOfPayment')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bia[' + i + '].nameOfPayee')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bia[' + i + '].panOfPayee')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bia[' + i + '].addressLine1')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bia[' + i + '].addressLine2')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bia[' + i + '].cityTownDis')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bia[' + i + '].pincode')[0].value;
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt21biaTable','taxdeductedlate.3cb21bia']);
		if(success){
			$('#pt21biaTableDiv').dialog('close');
		}
	
}

function setFilledDataForPt21bib(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('taxdeductedlate.3cb21bib[' + i + '].dateOfPayment')[0].value + ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bib[' + i + '].amtOfPayment')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bib[' + i + '].natureOfPayment')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bib[' + i + '].nameOfPayee')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bib[' + i + '].panOfPayee')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bib[' + i + '].addressLine1')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bib[' + i + '].addressLine2')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bib[' + i + '].city')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bib[' + i + '].pincode')[0].value + ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bib[' + i + '].taxDeducted')[0].value;
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt21bibTable','taxdeductedlate.3cb21bib']);
		if(success){
			$('#pt21bibTableDiv').dialog('close');
		}
	
}

function setFilledDataForPt21biia(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('taxdeductedlate.3cb21biia[' + i + '].dateOfPayment')[0].value + ',' +
					  document.getElementsByName('taxdeductedlate.3cb21biia[' + i + '].amtOfPayment')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21biia[' + i + '].natureOfPayment')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21biia[' + i + '].nameOfPayment')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21biia[' + i + '].panOfPayee')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21biia[' + i + '].addressLine1')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21biia[' + i + '].addressLine2')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21biia[' + i + '].city')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21biia[' + i + '].pincode')[0].value;
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt21biiaTable','taxdeductedlate.3cb21biia']);
		if(success){
			$('#pt21biiaTableDiv').dialog('close');
		}
		
}

function setFilledDataForPt21biib(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('taxdeductednotpaid.3cb21biib[' + i + '].dateOfPayment')[0].value + ',' +
					  document.getElementsByName('taxdeductednotpaid.3cb21biib[' + i + '].amtOfPayment')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductednotpaid.3cb21biib[' + i + '].natureOfPayment')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductednotpaid.3cb21biib[' + i + '].nameOfPayee')+"\""+ ',' +
					  document.getElementsByName('taxdeductednotpaid.3cb21biib[' + i + '].panOfPayee')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductednotpaid.3cb21biib[' + i + '].addressLine1')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductednotpaid.3cb21biib[' + i + '].addressLine2')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductednotpaid.3cb21biib[' + i + '].city')+"\""+ ',' +
					  document.getElementsByName('taxdeductednotpaid.3cb21biib[' + i + '].pincode')[0].value + ',' +
					  document.getElementsByName('taxdeductednotpaid.3cb21biib[' + i + '].taxDeducted')[0].value + ',' +
					  document.getElementsByName('taxdeductednotpaid.3cb21biib[' + i + '].amtDeposited')[0].value;
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt21biibTable','taxdeductednotpaid.3cb21biib']);
		if(success){
			$('#pt21biibTableDiv').dialog('close');
		}
}

function setFilledDataForPt21bvia(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('taxdeductedlate.3cb21bvi[' + i + '].dateOfPayment')[0].value + ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bvi[' + i + '].amtOfPayment')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bvi[' + i + '].nameOfPayee')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bvi[' + i + '].panOfPayee')[0].value + ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bvi[' + i + '].addressLine1')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bvi[' + i + '].addressLine2')+"\""+ ',' +
					  "\""+ removeQuotesFromString('taxdeductedlate.3cb21bvi[' + i + '].city')+"\""+ ',' +
					  document.getElementsByName('taxdeductedlate.3cb21bvi[' + i + '].pincode')[0].value;
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt21bviaTable','taxdeductedlate.3cb21bvi']);
		if(success){
			$('#pt21bviaTableDiv').dialog('close');
		}
}
function setFilledDataForPt26iAa(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iAa[' + i + '].section')[0].value + ',' +
					  "\""+ removeQuotesFromString('form3CdUnpaidStrySec43B.3cb26iAa[' + i + '].nature')+"\""+ ',' +
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iAa[' + i + '].amount')[0].value;
					 				  
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt26iAaTable','form3CdUnpaidStrySec43B.3cb26iAa']);
		if(success){
			$('#pt26iAaTableDiv').dialog('close');
		}
	
}
function setFilledDataForPt26iAb(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iAb[' + i + '].section')[0].value + ',' +
					  "\""+ removeQuotesFromString('form3CdUnpaidStrySec43B.3cb26iAb[' + i + '].nature')+"\""+ ',' +
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iAb[' + i + '].amount')[0].value;
					 				  
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt26iAbTable','form3CdUnpaidStrySec43B.3cb26iAb']);
		if(success){
			$('#pt26iAbTableDiv').dialog('close');
		}
	
}
function setFilledDataForPt26iBa(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iBa[' + i + '].section')[0].value + ',' +
					  "\""+ removeQuotesFromString('form3CdUnpaidStrySec43B.3cb26iBa[' + i + '].nature')+"\""+ ',' +
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iBa[' + i + '].amount')[0].value;
					 				  
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt26iBaTable','form3CdUnpaidStrySec43B.3cb26iBa']);
		if(success){
			$('#pt26iBaTableDiv').dialog('close');
		}
	
}
function setFilledDataForPt26iBb(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iBb[' + i + '].section')[0].value + ',' +
					  "\""+ removeQuotesFromString('form3CdUnpaidStrySec43B.3cb26iBb[' + i + '].nature')  +"\""+ ',' +
					  document.getElementsByName('form3CdUnpaidStrySec43B.3cb26iBb[' + i + '].amount')[0].value;
					 				  
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt26iBbTable','form3CdUnpaidStrySec43B.3cb26iBb']);
		if(success){
			$('#pt26iBbTableDiv').dialog('close');
		}
	
}
function setFilledDataForPt34a(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].tan')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].section')[0].value + ',' +
					  "\""+ removeQuotesFromString('form3cb.f3CB.complyXVIIB[' + i + '].natureOfPayment')+"\""+ ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].amountOfPayment')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].taxRequiredToBeDeducted')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].taxDeductedAtSpecificRate')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].taxDeductedon(6)')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].taxDeductedLessThanSpecificRate')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].taxDeductedon(8)')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.complyXVIIB[' + i + '].taxDeductedToGovt')[0].value;
			arr[i] = values;
		}
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt34aTable','form3cb.f3CB.complyXVIIB']);
		if(success){
			$('#pt34aTableDiv').dialog('close');
		}
}
function removeQuotesFromString(value) {
	var val = document.getElementsByName(value)[0].value;
	
	return val.replace(/[\", \']/g,' ');
}
function setFilledDataForPt34b(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3cb.f3CB.TaxCollectedPrescribedTime[' + i + '].tan')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.TaxCollectedPrescribedTime[' + i + '].typeOfForm')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.TaxCollectedPrescribedTime[' + i + '].dueDate')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.TaxCollectedPrescribedTime[' + i + '].date')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.TaxCollectedPrescribedTime[' + i + '].reportFlag')[0].value;
			arr[i] = values;
			alert(values);
		}
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt34bTable','form3cb.f3CB.TaxCollectedPrescribedTime']);
		if(success){
			$('#pt34bTableDiv').dialog('close');
		}
}
function setFilledDataForpt20Table(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			var values=
					  document.getElementsByName('form3CdEmpBonusComm.3cb20b[' + i + '].nature')[0].value + ',' +
					  document.getElementsByName('form3CdEmpBonusComm.3cb20b[' + i + '].sumReceived')[0].value + ',' +
					  document.getElementsByName('form3CdEmpBonusComm.3cb20b[' + i + '].dueDate')[0].value + ',' +
					  document.getElementsByName('form3CdEmpBonusComm.3cb20b[' + i + '].actualAmt')[0].value + ',' +
					  document.getElementsByName('form3CdEmpBonusComm.3cb20b[' + i + '].actualDate')[0].value;
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt20Table','form3CdEmpBonusComm.3cb20b']);
		if(success){
			$('#pt20TableDiv').dialog('close');
		}
}
function setFilledDataForpt34cTable(tableId){
	var arr = new Array();
	var tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-3;i++){
			var values=
					  document.getElementsByName('form3cb.f3CB.form3Cd.section201(1A)[' + i + '].tan')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.form3Cd.section201(1A)[' + i + '].amountOfInterest')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.form3Cd.section201(1A)[' + i + '].amountPaid')[0].value + ',' +
					  document.getElementsByName('form3cb.f3CB.form3Cd.section201(1A)[' + i + '].date')[0].value;
			arr[i] = values;
		}
		
		var success = p.invoke('CSV_PLUGIN_3CB_OTHERS','PT21BIA_FILL_DATA',[arr,'pt34cTable','form3cb.f3CB.form3Cd.section201(1A)']);
		if(success){
			$('#pt34cTableDiv').dialog('close');
		}
}

function displayFieldsInHtml(htmlBody,tableId) {
	var tab = document.getElementById(tableId);
	var tbodys = tab.tBodies[1];
	tbodys.innerHTML = htmlBody;
}

function deleteFieldsInHtml(htmlBody,tableId) {
	var tab = document.getElementById(tableId);
	var tbodys = tab.tBodies[1];
	tbodys.innerHTML = htmlBody;
	
	if(tableId == 'pt34cTable'){
		clearFillDataTable(tableId+'FillTable',2,1);
	} else {
		clearFillDataTable(tableId+'FillTable',1,1);
	}
	p.invoke('CSV_PLUGIN_3CB_OTHERS','DELETE_ROW',[tableId]);
}




function validateIncreaseOrDecreasept13c(){
	var table= document.getElementById('pt13cTable');
    var noOfRows = table.rows.length;
    
    for(var k=0;k<noOfRows-2;k++) {
    	var pertName=document.getElementsByName('form3CdChngMethAccValPK.3cb13c['+k+'].particulars')[0].value;
    	var increaseProf=document.getElementsByName('form3CdChngMethAccValPK.3cb13c['+k+'].increaseProfits')[0].value;
    	var decreasProf=document.getElementsByName('form3CdChngMethAccValPK.3cb13c['+k+'].decreaseProfits')[0].value;
    	    	
    	if(pertName!='' && (increaseProf=='' && decreasProf=='')){
    		j.setFieldError('form3CdChngMethAccValPK.3cb13c['+k+'].particulars','Either Increase in profit or Decrease in profit is mandatory');
    		addError(document.getElementsByName('form3CdChngMethAccValPK.3cb13c['+k+'].particulars')[0],"Either Increase in profit or Decrease in profit is mandatory");
    	}
    }
}

function validateIncreaseOrDecreasept14(){
	var table= document.getElementById('pt14bTable');
    var noOfRows = table.rows.length;
    
    for(var k=0;k<noOfRows-2;k++) {
    	var pertName=document.getElementsByName('deviationDesc.3cb14b['+k+'].particulars')[0].value;
    	var increaseProf=document.getElementsByName('deviationDesc.3cb14b['+k+'].increaseProfits')[0].value;
    	var decreasProf=document.getElementsByName('deviationDesc.3cb14b['+k+'].decreaseProfits')[0].value;
    	    	
    	if(pertName!='' && (increaseProf=='' && decreasProf=='')){
    		j.setFieldError('deviationDesc.3cb14b['+k+'].particulars','Either Increase in profit or Decrease in profit is mandatory');
    		addError(document.getElementsByName('deviationDesc.3cb14b['+k+'].particulars')[0],"Either Increase in profit or Decrease in profit is mandatory");
    	}
    }
}

function validateIncreaseOrDecreasept13d(){
	var table= document.getElementById('pt13dTable');
    var noOfRows = table.rows.length;
    
    for(var k=0;k<noOfRows-2;k++) {
    	var pertName=document.getElementsByName('deviationDesc.3cb13d['+k+'].particulars')[0].value;
    	var increaseProf=document.getElementsByName('deviationDesc.3cb13d['+k+'].increaseProfits')[0].value;
    	var decreasProf=document.getElementsByName('deviationDesc.3cb13d['+k+'].decreaseProfits')[0].value;
    	    	
    	if(pertName!='' && (increaseProf=='' && decreasProf=='')){
    		j.setFieldError('deviationDesc.3cb13d['+k+'].particulars','Either Increase in profit or Decrease in profit is mandatory');
    		addError(document.getElementsByName('deviationDesc.3cb13d['+k+'].particulars')[0],"Either Increase in profit or Decrease in profit is mandatory");
    	}
    }
}

function onStatusChange(){
	enableTable('pt9aTable','form3cb.f3CB.partA.status');
	enableTable('pt9bTable','form3cb.f3CB.partA.status');
	enableTable('pt28Table','form3cb.f3CB.partA.status');
	enableTable('pt29Table','form3cb.f3CB.partA.status');
	enableTable('pt36Table','form3cb.f3CB.partA.status');
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

function populatePartBOnImport(){
	document.getElementsByName('form3ca.f3CA.otherInformation1.name')[0].value=document.getElementsByName('form3cb.3cb.name')[0].value;

	document.getElementsByName('form3ca.f3CA.otherInformation1.address')[0].value=document.getElementsByName('form3cb.3cb.address')[0].value;

	document.getElementsByName('form3ca.f3CA.otherInformation1.place')[0].value=document.getElementsByName('form3cb.3cb.place')[0].value;

	document.getElementsByName('form3ca.f3CA.otherInformation1.membershipNo')[0].value=document.getElementsByName('form3cb.3cb.memNumber')[0].value;

	document.getElementsByName('form3ca.f3CA.otherInformation1.frn')[0].value=document.getElementsByName('form3cb.3cb.firmRegNumber')[0].value;

	document.getElementsByName('form3ca.f3CA.otherInformation1.date')[0].value=document.getElementsByName('form3cb.3cb.date')[0].value;

	}

function popPartAAddress(){
	populateValues('form3ca.f3CA.declaration.point1.addressLine1','form3cb.f3CB.partA.addressLine1');
	populateValues('form3ca.f3CA.declaration.point1.addressLine2','form3cb.f3CB.partA.addressLine2');
	populateValues('form3ca.f3CA.declaration.point1.city','form3cb.f3CB.partA.city');
	populateValues('form3ca.f3CA.declaration.point1.stateCode','form3cb.f3CB.partA.stateCode');
	populateValues('form3ca.f3CA.declaration.point1.pincode','form3cb.f3CB.partA.pincode');
}






function checkProfit(tableId){
	
	if(tableId == 'pt13cTable'){
		
		tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
		 
			var particulars=document.getElementsByName('form3CdChngMethAccValPK.3cb13c['+i+'].particulars')[0].value;
			var increase=document.getElementsByName('form3CdChngMethAccValPK.3cb13c['+i+'].increaseProfits')[0].value;
			var decrease=document.getElementsByName('form3CdChngMethAccValPK.3cb13c['+i+'].decreaseProfits')[0].value;
			if(particulars != '' && increase =='' && decrease == ''){
				
				addErrorXHTML('','Either Increase in profit or Decrease in profit should be entered',true);
			}
		
		}
	}else if(tableId == 'pt13dTable'){
		
		tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			 
			var particulars=document.getElementsByName('deviationDesc.3cb13d['+i+'].particulars')[0].value;
			var increase=document.getElementsByName('deviationDesc.3cb13d['+i+'].increaseProfits')[0].value;
			var decrease=document.getElementsByName('deviationDesc.3cb13d['+i+'].decreaseProfits')[0].value;
			if(particulars != '' && increase =='' && decrease == ''){
				
				addErrorXHTML('','Either Increase in profit or Decrease in profit should be entered',true);
			}
		
		}
	}else{

		tab = document.getElementById(tableId);
		for(var i=0;i<tab.rows.length-2;i++){
			 
			var particulars=document.getElementsByName('deviationDesc.3cb14b['+i+'].particulars')[0].value;
			var increase=document.getElementsByName('deviationDesc.3cb14b['+i+'].increaseProfits')[0].value;
			var decrease=document.getElementsByName('deviationDesc.3cb14b['+i+'].decreaseProfits')[0].value;
			if(particulars != '' && increase =='' && decrease == ''){
				
				addErrorXHTML('','Either Increase in profit or Decrease in profit should be entered',true);
			}
		
		}
		
	}
}






function checkPt34Amt(){
	
	var table= document.getElementById('pt34cTable');
    var noOfRows = table.rows.length;
	for(var i=0; i < noOfRows-2;i++ ){
		
		if(document.getElementsByName('form3cb.f3CB.form3Cd.section201(1A)['+i+'].amountPaid').value>0){
			j.setFieldError('form3cb.f3CB.form3Cd.section201(1A)['+i+'].date','Please enter Dates of payment as Amount paid is greater than zero');
    		addError(document.getElementsByName('form3cb.f3CB.form3Cd.section201(1A)['+i+'].date')[0],"Please enter Dates of payment as Amount paid is greater than zero");		
		}
	}
}




function checkUniqueTableCol(tableId, colname,errorMesg){
	
	var tab = document.getElementById(tableId);
	var selects = tab.getElementsByTagName('SELECT');
	var arr = new Array();
	for(var i=0;i<selects.length;i++){
		if(selects[i].name.match(colname) && selects[i].value!=''){
			if(arr.indexOf(selects[i].value)==-1){
				arr.push(selects[i].value);
			}else if(selects[i].value!='Others'){
				var msg = errorMesg || 'A particular drop down cannot be selected twice';
				j.setFieldError(selects[i].name, msg);
				addErrorXHTML(selects[i], msg ,true);	
			}
		}
	}
}

function convertToAssmtYear(){
	
	var assementYear=document.getElementsByName('form3cb.f3CB.partA.assessmentYear')[0].value;
	
	var year=parseInt(assementYear.substring(0,4),10);
	
	document.getElementsByName('form3cb.f3CB.partA.assessmentYearHidden')[0].value=parseInt(year,10);
	
}
function enableImpostCSVButtons(flag,importCSVTableId,fillDataTableId,clearDataTableId,tbody,tableId){
	
	if(document.getElementsByName(flag)[0].value=='Y'){
		
		document.getElementById(importCSVTableId).style.visibility = 'visible';
		document.getElementById(fillDataTableId).style.visibility = 'visible';
		document.getElementById(clearDataTableId).style.visibility = 'visible';
	}else{
		
		document.getElementById(importCSVTableId).style.visibility = 'hidden';
		document.getElementById(fillDataTableId).style.visibility = 'hidden';
		document.getElementById(clearDataTableId).style.visibility = 'hidden';
		deleteFieldsInHtml(tbody,tableId);
	}
}
function enableImpostCSVButtonsNo(flag,importCSVTableId,fillDataTableId,clearDataTableId,tbody,tableId){
	
	if(document.getElementsByName(flag)[0].value=='N'){
		
		document.getElementById(importCSVTableId).style.visibility = 'visible';
		document.getElementById(fillDataTableId).style.visibility = 'visible';
		document.getElementById(clearDataTableId).style.visibility = 'visible';
	}else{
		
		document.getElementById(importCSVTableId).style.visibility = 'hidden';
		document.getElementById(fillDataTableId).style.visibility = 'hidden';
		document.getElementById(clearDataTableId).style.visibility = 'hidden';
		deleteFieldsInHtml(tbody,tableId);
		
	}
}
