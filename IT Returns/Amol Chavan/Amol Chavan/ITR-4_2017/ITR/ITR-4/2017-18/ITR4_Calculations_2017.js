var FY_start_date = '01/04/2016';
var FY_end_date = '31/03/2017';
var AY_start_date = '01/04/2017';
var Filing_dueDate= '31/07/2017'; // Modified due to the due date extended for filing the return
var Int_start_date_234A = '01/08/2017'; // Modified due to the due date extended for filing the return

var slab1_end_date = '15/06/2016';
var slab2_start_date = '16/06/2016';
var slab2_end_date = '15/09/2016';
var slab3_start_date = '16/09/2016';
var slab3_end_date = '15/12/2016';
var slab4_start_date = '16/12/2016';
var slab4_end_date = '15/03/2017';

// To calculate all Interest calculations
function calcItr4(){
	calcGrossTotIncome();
	onchangeDed();
	calc44aeNobBp('us44aeHeavyVehcl');
}
function addRowToTableItr4s(tableId, noOfRow, last){

if (natureOfBusChck('natOfBustTradeTableId',4)) {
	addRowToTable('natOfBustTradeTableId',2,1)	
}
}

function onchangeDed(){
	allRowsForPage8DonationsSaras('ded100PerWithoutQual',0,0);
	allRowsForPage8DonationsSaras('ded50WithoutQual',0,0);
	allRowsForPage8DonationsSaras('ded100Qual',0,0);
	allRowsForPage8DonationsSaras('ded50WithQual',0,0);
}

// To calculate Gross Total Income
function calcGrossTotIncome() {
	try{

	var incFrmBus = document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromBusinessProf')[0]; incFrmBus.value = coalesce(incFrmBus.value) ;
	var salaries = document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0]; salaries.value = coalesce(salaries.value) ;
	var incFrmHP = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncomeOfHP')[0]; incFrmHP.value = coalesce(incFrmHP.value) ;
 	var incFrmOthSrc = document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeOthSrc')[0]; incFrmOthSrc.value = coalesce(incFrmOthSrc.value);
	var grossTotInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0];

	var advanceTaxToDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
	var TDSToDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
	var SATtoDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);
	var refundDue = document.getElementsByName('itr4S.refund.refundDue')[0];  refundDue.value = coalesce(refundDue.value);
	var temp = eval(parseInt(incFrmBus.value ,10)) + eval(parseInt(salaries.value ,10)) + eval(parseInt(incFrmHP.value ,10)) + eval(parseInt(incFrmOthSrc.value,10));

	
		grossTotInc.value = temp;

	
	dedUndVIA();
	}catch(e){ alert('Exceptions in calcGrossTotIncome()= ' + e.stack); }
}

//To calculate interest for 44AE NOB BP

function calc44aeNobBp(tableId){
	try{
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.totSundryDbtAmt')[0].value 
			= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.totSundryDbtAmt')[0].value );
		document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.totSundryCrdAmt')[0].value 
			= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.totSundryCrdAmt')[0].value );
		document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.totStkInTradAmt')[0].value 
			= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.totStkInTradAmt')[0].value);
		document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.cashBalAmt')[0].value 
			= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.noBooksOfAccBS.cashBalAmt')[0].value);
		
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].value 
		= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].value);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].value 
		= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].value);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value 
		= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value 
		= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value);
		
		
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value 
		= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value 
		= coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value);
		
		var listOfTr = document.getElementById(tableId).getElementsByTagName('tr');
		var totPresumIncm =0;
		var noOfRows = eval(parseInt(listOfTr.length,10)-2);
		for(var i=1; i< noOfRows; i++){
			var listOfInputTags = listOfTr[i].getElementsByTagName('input');
			var listOfSelectTags = listOfTr[i].getElementsByTagName('select');

			var period  ; var incmPerVehicle ; var deemedIncm ; var vehicleType;

			for(var j=0; j<listOfInputTags.length ; j++){

				if(listOfInputTags[j].name.match(".holdingPeriod$")){
					period = listOfInputTags[j];
				}

				if(listOfInputTags[j].name.match(".incomePerVehicle$")){
					incmPerVehicle = listOfInputTags[j];
				}

				if(listOfInputTags[j].name.match(".deemedInc$")){
					deemedIncm = listOfInputTags[j];
				}
			}
				
				deemedIncm.value = coalesce(eval( parseInt(period.value,10) * parseInt(incmPerVehicle.value,10)))
				totPresumIncm= coalesce(eval( parseInt(totPresumIncm ,10)  + parseInt( deemedIncm.value ,10) ));
				
			
		}
		
		document.getElementsByName('itr4S.totalHeavyVehcl')[0].value = coalesce(parseInt(totPresumIncm ,10));
		
		
		// E3
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.totPersumInc44AE')[0].value = coalesce(parseInt(totPresumIncm ,10));
		
		//E7 = E5 - E6
		document.getElementsByName('itr4S.scheduleBPForITR4S.incChargeableUnderBus')[0].value = coalesce(
				eval( parseInt(coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.totPersumInc44AE')[0].value ) ,10) -
					  parseInt(coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].value ) ,10)));

		document.getElementsByName('itr4S.scheduleBPForITR4S.incChargeableUnderBus')[0].value = Math.max(0, document.getElementsByName('itr4S.scheduleBPForITR4S.incChargeableUnderBus')[0].value);
		
		calc44AD();
		
		
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromBusinessProf')[0].value = coalesce(
			coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.totalPersumptiveInc44AD')[0].value ));

		calcGrossTotIncome();
		

	} catch(e){
		alert('Exception in calc44aeNobBp () = ' +e.stack);
	}
}

// To calculate deductions under Chapter VI-A

function dedUndVIA(){
	var salaries = document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0]; salaries.value = coalesce(salaries.value);
	var incFrmHP = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncomeOfHP')[0].value; incFrmHP = coalesce(incFrmHP) ;
	var incFrmOthSrc = document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeOthSrc')[0].value; incFrmOthSrc = coalesce(incFrmOthSrc);
	var grossTotInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value; 
	var grossTotIncome = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value; 
	 if( parseInt(grossTotInc ,10) <0 ){
		 grossTotInc = parseInt(0,10);
		}
	
	var residentialStatus  = document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;
	var typeOfUser = document.getElementsByName('itr4S.personalInfo.pan')[0].value;
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;

	var sec80C = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80C_Usr')[0].value; sec80C = coalesce(sec80C);
	var sec80CsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80C')[0]; sec80CsysCalc.value = coalesce(sec80CsysCalc.value);

	var sec80CCC = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCC_Usr')[0].value; sec80CCC = coalesce(sec80CCC);
	var sec80CCCsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80CCC')[0]; sec80CCCsysCalc.value = coalesce(sec80CCCsysCalc.value);

	var sec80CCDempeContr = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCD_Usr')[0].value; sec80CCDempeContr = coalesce(sec80CCDempeContr);
	var sec80CCDempeContrsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80CCD')[0]; sec80CCDempeContrsysCalc.value = coalesce(sec80CCDempeContrsysCalc.value);

	var sec80CCDemprContr = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer_Usr')[0].value; sec80CCDemprContr = coalesce(sec80CCDemprContr);
	var sec80CCDemprContrsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80CCDEmployer')[0]; sec80CCDemprContrsysCalc.value = coalesce(sec80CCDemprContrsysCalc.value);

	var sec80D = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80D_Usr')[0].value; sec80D = coalesce(sec80D);
	var sec80DsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80D')[0]; sec80DsysCalc.value = coalesce(sec80DsysCalc.value);

	var sec80DD = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80DD_Usr')[0].value; sec80DD = coalesce(sec80DD);
	var sec80DDsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80DD')[0]; sec80DDsysCalc.value = coalesce(sec80DDsysCalc.value);

	var sec80DDB = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr')[0].value; sec80DDB = coalesce(sec80DDB);
	var sec80DDBsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80DDB')[0]; sec80DDBsysCalc.value = coalesce(sec80DDBsysCalc.value);

	var sec80E = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80E_Usr')[0].value; sec80E = coalesce(sec80E);
	var sec80EsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80E')[0]; sec80EsysCalc.value = coalesce(sec80EsysCalc.value);

	var sec80EE = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80EE_Usr')[0].value; sec80EE = coalesce(sec80EE);
	var sec80EEsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80EE')[0]; sec80EEsysCalc.value = coalesce(sec80EEsysCalc.value);

	var sec80CCD1B = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCD1B_Usr')[0].value; sec80CCD1B = coalesce(sec80CCD1B);
	var sec80CCD1BsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80CCD1B')[0];
	
	var sec80G = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80G_Usr')[0]; sec80G.value = coalesce(sec80G.value);
	var sec80GsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80G')[0]; sec80GsysCalc.value = coalesce(sec80GsysCalc.value);

	var sec80GG = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80GG_Usr')[0].value; sec80GG = coalesce(sec80GG);
	var sec80GGsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80GG')[0]; sec80GGsysCalc.value = coalesce(sec80GGsysCalc.value);	

	var sec80GGC = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80GGC_Usr')[0].value; sec80GGC = coalesce(sec80GGC);
	var sec80GGCsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80GGC')[0]; sec80GGCsysCalc.value = coalesce(sec80GGCsysCalc.value);

	var sec80U = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80U_Usr')[0].value; sec80U = coalesce(sec80U);
	var sec80UsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80U')[0]; sec80UsysCalc.value = coalesce(sec80UsysCalc.value);

	
	var sec80CCG = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCG_Usr')[0].value; sec80CCG = coalesce(sec80CCG);
	var sec80CCGsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80CCG')[0]; sec80CCGsysCalc.value = coalesce(sec80CCGsysCalc.value);
	
	var sec80RRB = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80RRB_Usr')[0].value; sec80RRB = coalesce(sec80RRB);
	var sec80RRBsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80RRB')[0]; sec80RRBsysCalc.value = coalesce(sec80RRBsysCalc.value);
	
	var sec80QQB = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80QQB_Usr')[0].value; sec80QQB = coalesce(sec80QQB);
	var sec80QQBsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80QQB')[0]; sec80QQBsysCalc.value = coalesce(sec80QQBsysCalc.value);
	
	var sec80TTA = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80TTA_Usr')[0].value; sec80TTA = coalesce(sec80TTA);
	var sec80TTAsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80TTA')[0]; sec80TTAsysCalc.value = coalesce(sec80TTAsysCalc.value);

	// CHECK FOR 80C
	if(status=='I' || status=='H'){
	if( parseInt(grossTotInc ,10) >0 ){
	if(parseInt(grossTotInc,10)> eval('100000')){
	if( parseInt(sec80C,10) > eval('150000')) {
		sec80CsysCalc.value = '150000' ;
	} else {
		sec80CsysCalc.value = parseInt(sec80C,10);
	}
	} else{
		
		if( parseInt(sec80C,10) > eval(grossTotInc)) {
			sec80CsysCalc.value = grossTotInc ;
		} else {
			sec80CsysCalc.value = parseInt(sec80C,10);
		}
		
		
	}
	if(parseInt(grossTotInc ,10) < sec80CsysCalc.value){
		sec80CsysCalc.value = grossTotInc;
	}
	} else {
	
	sec80CsysCalc.value = parseInt('0',10);
	
	}
	}
	else{
	sec80CsysCalc.value = parseInt('0',10);
	}

	// CHECK FOR 80CCC
	if(status=='I'){
		if(parseInt(grossTotInc,10)> eval('100000')){
		if( parseInt(sec80CCC,10) > eval('150000')) {
			sec80CCCsysCalc.value = '150000' ;
		} else {
			sec80CCCsysCalc.value = parseInt(sec80CCC,10);
		}
	} else{
		
		if( parseInt(sec80CCC,10) > parseInt(grossTotInc)) {
			sec80CCCsysCalc.value = grossTotInc ;
		} else {
			sec80CCCsysCalc.value = parseInt(sec80CCC,10);
		}
		
		
	}}else{
		sec80CCCsysCalc.value = parseInt('0',10);
	}
	sec80CCCsysCalc.value =Math.min(sec80CCCsysCalc.value ,grossTotInc);
	// CHECK FOR 80CCD (EMPLOYER CONTRIBUTIION)
	if(status=='I'){
		var temp = Math.round(eval(parseInt(salaries.value,10)) * eval('0.10'));

		if( parseInt(sec80CCDemprContr,10) > temp ) {
			sec80CCDemprContrsysCalc.value = temp ;
		} else {
			sec80CCDemprContrsysCalc.value = parseInt(sec80CCDemprContr,10);
		}
	}else{
		sec80CCDemprContrsysCalc.value = parseInt('0',10);
	}

	sec80CCDemprContrsysCalc.value =Math.min(sec80CCDemprContrsysCalc.value ,grossTotInc);
	// CHECK FOR 80CCD(EMPLOYEE)
		//var emplrCat = document.getElementsByName('itr4S.personalInfo.employerCategory')[0].value;
		var salUppLimit = Math.round(eval(parseInt(salaries.value,10)) * eval('0.10'));
		var gtiUppLimit = Math.round(eval(parseInt(coalesce(grossTotInc),10)) * eval('0.10'));
		
	if( parseInt(grossTotInc ,10) >0 ){
		if(status =='I'){
			
			if(parseInt(salaries.value) == parseInt('0' , 10)){
				
					if(gtiUppLimit > parseInt('150000' ,10)){
						if( parseInt(sec80CCDempeContr,10) > eval('150000')) {
							sec80CCDempeContrsysCalc.value = '150000' ;
						} else {
							sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
						}
						if(parseInt(grossTotInc ,10) < sec80CCDempeContrsysCalc.value){
						sec80CCDempeContrsysCalc.value = grossTotInc;
					}
					} else {
						if( parseInt(sec80CCDempeContr,10) > gtiUppLimit ) {
							sec80CCDempeContrsysCalc.value = gtiUppLimit ;
						} else {
							sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
						}
						if(parseInt(grossTotInc ,10) < sec80CCDempeContrsysCalc.value){
						sec80CCDempeContrsysCalc.value = grossTotInc;
					}
					}
				
			}else{
				if(salUppLimit > parseInt('150000' ,10)){
					if( parseInt(sec80CCDempeContr,10) > eval('150000')) {
						sec80CCDempeContrsysCalc.value = '150000' ;
					} else {
						sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
					}
					
					if(parseInt(grossTotInc ,10) < sec80CCDempeContrsysCalc.value){
						sec80CCDempeContrsysCalc.value = grossTotInc;
					}
				}
				
				else if(parseInt(sec80CCDempeContr,10) > parseInt(salUppLimit,10)){
						sec80CCDempeContrsysCalc.value = parseInt(salUppLimit,10);
					}else{
						sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
					}
					if(parseInt(grossTotInc ,10) < sec80CCDempeContrsysCalc.value){
						sec80CCDempeContrsysCalc.value = grossTotInc;
					}
				
			}
		}else{
			sec80CCDempeContrsysCalc.value= parseInt('0',10);
		}
		} else {
		sec80CCDempeContrsysCalc.value= parseInt('0',10);
	}
	
		 sec80CCDempeContrsysCalc.value =Math.min(sec80CCDempeContrsysCalc.value ,grossTotInc);
		// alert('sec80CCDempeContrsysCalc.value:::'+sec80CCDempeContrsysCalc.value);
	

	// CHECK FOR 80D	
	var age = calcAge();
	if( parseInt(grossTotInc ,10) >0 ){
	if(status =='I'){
	if((residentialStatus== 'RES' || residentialStatus== 'NOR') && age > eval('59')){
		
		if( parseInt(sec80D,10) > eval('60000')){
			sec80DsysCalc.value = '60000';
		} else {
			sec80DsysCalc.value =  parseInt(sec80D,10);
		}
		if(parseInt(grossTotInc ,10) < sec80DsysCalc.value){
			sec80DsysCalc.value = grossTotInc;
		}
	}else {
		if( parseInt(sec80D,10) > eval('55000')){
		
		sec80DsysCalc.value = '55000';
		} else {
			sec80DsysCalc.value = parseInt(sec80D,10);
		}
		if(parseInt(grossTotInc ,10) < sec80DsysCalc.value){
			sec80DsysCalc.value = grossTotInc;
		}
	}
	} else if(status == 'H'){
	
	if( parseInt(sec80D,10) > eval('30000')){
		
		sec80DsysCalc.value = '30000';
		} else {
			sec80DsysCalc.value = parseInt(sec80D,10);
		}
		if(parseInt(grossTotInc ,10) < sec80DsysCalc.value){
			sec80DsysCalc.value = grossTotInc;
		}
	
	}else{
		sec80DsysCalc.value= parseInt('0',10);
	}
	} else {
		sec80DsysCalc.value= parseInt('0',10);
	}
	
	
	// CHECK FOR 80DD
	if(status == 'I' || status == 'H'){
	if( parseInt(grossTotInc ,10) >0 ){
		if(residentialStatus =='RES' || residentialStatus =='NOR'){
			if( parseInt(sec80DD,10) > eval('125000')){
				sec80DDsysCalc.value = '125000';
			}else{
				sec80DDsysCalc.value = parseInt(sec80DD,10);
			}
			if(parseInt(grossTotInc ,10) < sec80DDsysCalc.value){
				sec80DDsysCalc.value = grossTotInc;
			}
		}else {
			sec80DDsysCalc.value = '0';
		}
	} else {
	sec80DDsysCalc.value= parseInt('0',10);
	}
	}
	else {
		sec80DDsysCalc.value= parseInt('0',10);
	}

	// CHECK FOR 80DDB
	if(status == 'I' || status == 'H'){
	if( parseInt(grossTotInc ,10) >0 ){
		if(residentialStatus =='RES' || residentialStatus =='NOR'){
			if(parseInt(sec80DDB ,10) > eval('80000')){
					sec80DDBsysCalc.value = '80000';
				} else {
					sec80DDBsysCalc.value = parseInt(sec80DDB ,10);
				}
			if(parseInt(grossTotInc ,10) < sec80DDBsysCalc.value){
					sec80DDBsysCalc.value = grossTotInc;
				}
		} else {
			sec80DDBsysCalc.value = '0';
		}
		} else {
	sec80DDBsysCalc.value= parseInt('0',10);
	}
   }
	else {
		sec80DDBsysCalc.value= parseInt('0',10);
   }

	// CHECK FOR 80E
	if( parseInt(grossTotInc ,10) >0 ){
	if(status =='I'){
		if(eval(parseInt(coalesce(grossTotInc),10)>parseInt(sec80E,10))){
			sec80EsysCalc.value = parseInt(sec80E,10);
		}else{
			sec80EsysCalc.value = parseInt(coalesce(grossTotInc),10);
		}
	}else{
		sec80EsysCalc.value = parseInt('0',10);
	}
	} else {
	sec80EsysCalc.value= parseInt('0',10);
	}

	// CHECK FOR 80EE
	if(status =='I'){
	if( parseInt(sec80EE,10) > eval('50000'))
	{
		sec80EEsysCalc.value = '50000';
	}
	else
	{
		sec80EEsysCalc.value = parseInt(sec80EE,10);
	}
	}
	else{
		sec80EEsysCalc.value = parseInt('0',10);
	}
	sec80EEsysCalc.value =Math.min(sec80EEsysCalc.value ,grossTotInc);
	
	// CHECK FOR 80CCD(1B)
	if( parseInt(grossTotInc ,10) >0 ){
		if(status =='I'){
			if( parseInt(sec80CCD1B,10) > parseInt('50000' ,10)){
				sec80CCD1BsysCalc.value = '50000';
			}else{
				sec80CCD1BsysCalc.value = parseInt(sec80CCD1B,10);
			}
			if(parseInt(grossTotInc ,10) < sec80CCD1BsysCalc.value){
				sec80CCD1BsysCalc.value = grossTotInc;
			}
		}else {
			sec80CCD1BsysCalc.value = '0';
		}
		} else {
			sec80CCD1BsysCalc.value= parseInt('0',10);
	}
	// AUTOPOPULATE 80G
	var sec80Geligdonations = document.getElementsByName('itr4S.schedule80G.totalEligibleDonationsUs80G')[0].value;
	if( parseInt(grossTotInc ,10) >0 ){
	sec80G.value = parseInt(sec80Geligdonations,10);
	if( parseInt(grossTotInc ,10) >0 ){
	sec80GsysCalc.value = parseInt(sec80Geligdonations,10);
	if(parseInt(grossTotInc ,10) < sec80GsysCalc.value){
			sec80GsysCalc.value = grossTotInc;
		}
	}
	alert("sec80GsysCalc:"+sec80GsysCalc.value);
	
   } else {
	sec80GsysCalc.value= parseInt('0',10);
	}

	//80GGA
	
		
	// CHECK FOR 80GGC
	if( parseInt(grossTotInc ,10) >0 ){
	sec80GGCsysCalc.value =  (eval(parseInt(isNVL(sec80GGC),10)>=grossTotInc))?(parseInt(coalesce(grossTotInc),10)):(parseInt(isNVL(sec80GGC),10));
	} else {
	sec80GGCsysCalc.value= parseInt('0',10);
	
	alert("sec80GGCsysCalc:"+sec80GGCsysCalc.value);
	}
	// CHECK FOR 80U
	if( parseInt(grossTotInc ,10) >0 ){
		if(residentialStatus ==='RES' || residentialStatus ==='NOR'){
			if(status =='I'){
				if( parseInt(sec80U,10) > eval('125000')){
					sec80UsysCalc.value = '125000';
				} else {
					sec80UsysCalc.value = parseInt(sec80U,10);
				}
				if(parseInt(grossTotInc ,10) < sec80UsysCalc.value){
					sec80UsysCalc.value = grossTotInc;
				}
			}else{
				sec80UsysCalc.value = parseInt('0',10);
			}
		}else {
			sec80UsysCalc.value = '0';
		}
	} else {
	sec80UsysCalc.value= parseInt('0',10);
	}
	
	// CHECK FOR 80CCG
	
	if( parseInt(grossTotInc ,10) >0 ){
	if(status =='I'){
		sec80CCGsysCalc.value = (residentialStatus=='RES' || residentialStatus=='NOR')?(((parseInt(coalesce(grossTotInc),10)) <= parseInt('1200000',10))?((parseInt(sec80CCG,10) > parseInt('25000',10))? parseInt('25000',10):parseInt(sec80CCG,10)) : parseInt('0',10)) : parseInt('0',10) ;	
		 if((sec80CCGsysCalc.value>0)&&(parseInt(grossTotInc ,10) < sec80CCGsysCalc.value)){
		 sec80CCGsysCalc.value = grossTotInc;
		}
	}else{
		sec80CCGsysCalc.value =parseInt('0',10);
	} } else {
	sec80CCGsysCalc.value= parseInt('0',10);
	} 
	
	// CHECK FOR 80RRB
	if( parseInt(grossTotInc ,10) >0 ){
	if(status =='I'){
		sec80RRBsysCalc.value = (residentialStatus=='RES' || residentialStatus=='NOR')?( (parseInt(sec80RRB,10)<parseInt('300000',10))? (parseInt(sec80RRB,10)) : (parseInt('300000',10))) : parseInt('0',10) ;
		if((sec80RRBsysCalc.value>0)&&(parseInt(grossTotInc ,10) < sec80RRBsysCalc.value)){
			sec80RRBsysCalc.value = grossTotInc;
		}
	}else{
		sec80RRBsysCalc.value =parseInt('0',10);
	}} else {
	sec80RRBsysCalc.value= parseInt('0',10);
	} 
	// CHECK FOR 80QQB
	if( parseInt(grossTotInc ,10) >0 ){
	if(status =='I'){
		sec80QQBsysCalc.value = (residentialStatus=='RES' || residentialStatus=='NOR')?( (parseInt(sec80QQB,10)<parseInt('300000',10))? (parseInt(sec80QQB,10)) : (parseInt('300000',10))) : parseInt('0',10) ;
		if((sec80QQBsysCalc.value>0)&&(parseInt(grossTotInc ,10) < sec80QQBsysCalc.value)){
			sec80QQBsysCalc.value = grossTotInc;
		}
	}else{
		sec80QQBsysCalc.value =parseInt('0',10);
	}} else {
	sec80QQBsysCalc.value= parseInt('0',10);
	} 
	
	if(residentialStatus=='NRI'){
		
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].value=parseInt('0',10);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].value=parseInt('0',10);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value=parseInt('0',10);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value=parseInt('0',10);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].readOnly=true;
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value=parseInt('0',10);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].readOnly=true;
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value=parseInt('0',10);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value=parseInt('0',10);
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].readOnly=true;
		
	}else if(residentialStatus=='RES'|| residentialStatus=='NOR'){
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].readOnly=false;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].readOnly=false;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].readOnly=false;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].readOnly=false;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].readOnly=false;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].readOnly=false;
		
	}
	
	// CHECK FOR 80TTA
	var incOs = document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeOthSrc')[0].value;
	if( parseInt(grossTotInc ,10) >0 ){
		if(status == 'F'){sec80TTAsysCalc.value= parseInt('0',10);}
		else
		if(parseInt(isNVL(sec80TTA),10) > parseInt('0',10)){
			sec80TTAsysCalc.value=Math.min(parseInt(incOs,10),parseInt(grossTotInc ,10),10000,parseInt(isNVL(sec80TTA),10) < parseInt('0',10) ? parseInt('0',10) : parseInt(isNVL(sec80TTA),10));
			if(sec80TTAsysCalc.value<parseInt('0',10)){
				sec80TTAsysCalc.value= parseInt('0',10);
			}
		} else{
			sec80TTAsysCalc.value= parseInt('0',10);
		}
	} else {
		sec80TTAsysCalc.value= parseInt('0',10);
	}
	
	checkSum80C80CCC();

	sumUserEntrdDed();
	sec80GGsysCalc.value=0;
		sumDeductionsWithout80GG(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80EEsysCalc,sec80GsysCalc,sec80GGCsysCalc,
		sec80UsysCalc,sec80CCGsysCalc,sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80CCD1BsysCalc);


	// CHECK FOR 80GG again
	var totInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0];
	if(totInc.value > 0){
	totInc.value = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0].value;
	}
	var oneFrthTI =  Math.round(eval(totInc.value) * eval(0.25));
	if(status =='I'){
		
		if(eval(oneFrthTI) < eval('60000')) {
			if(eval(sec80GG) > eval(oneFrthTI)){
				sec80GGsysCalc.value = eval(oneFrthTI);
			} else {
				sec80GGsysCalc.value = sec80GG;
			}
		} else{
			if(eval(sec80GG) > eval('60000')){
				sec80GGsysCalc.value = eval('60000');
			}else {
				sec80GGsysCalc.value = sec80GG;
			}
		}
	}else{
		
		sec80GGsysCalc.value = eval(parseInt(0, 10));
	}
	
	if(grossTotIncome < 0){
			sec80CsysCalc.value=eval(parseInt(0, 10));
			sec80CCCsysCalc.value=eval(parseInt(0, 10));
			sec80CCDemprContrsysCalc.value=eval(parseInt(0, 10));
			sec80CCDempeContrsysCalc.value=eval(parseInt(0, 10));
			sec80DsysCalc.value =eval(parseInt(0, 10));
			sec80DDsysCalc.value=eval(parseInt(0, 10));
			sec80DDBsysCalc.value=eval(parseInt(0, 10));
			sec80EsysCalc.value=eval(parseInt(0, 10));
			sec80EEsysCalc.value=eval(parseInt(0, 10));
			sec80GsysCalc.value=eval(parseInt(0, 10));			
			sec80GGCsysCalc.value=eval(parseInt(0, 10));
			sec80UsysCalc.value=eval(parseInt(0, 10));
			sec80CCGsysCalc.value=eval(parseInt(0, 10));
			sec80RRBsysCalc.value=eval(parseInt(0, 10));
			sec80QQBsysCalc.value=eval(parseInt(0, 10));
			sec80TTAsysCalc.value=eval(parseInt(0, 10));
			sec80GGsysCalc.value=eval(parseInt(0, 10));
			sec80CCD1BsysCalc.value=parseInt('0',10);
	}

	// Do the sum of deductions again after adding 80GG and 80G
	 sumDeductions(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80EEsysCalc,sec80GsysCalc,
		sec80GGsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80CCD1BsysCalc);
}

//To calculate sum of Deductions entered by user

function sumUserEntrdDed() {

var sec80C = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80C_Usr')[0] ; sec80C.value = coalesce(sec80C.value);
var sec80CCC = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCC_Usr')[0] ;sec80CCC.value = coalesce(sec80CCC.value);
var sec80CCDempeContr = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCD_Usr')[0] ;sec80CCDempeContr.value = coalesce(sec80CCDempeContr.value);
var sec80CCDemprContr = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer_Usr')[0] ;sec80CCDemprContr.value = coalesce(sec80CCDemprContr.value);

var sec80D = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80D_Usr')[0] ;sec80D.value = coalesce(sec80D.value);
var sec80DD = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80DD_Usr')[0] ;sec80DD.value = coalesce(sec80DD.value);
var sec80DDB = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr')[0] ;sec80DDB.value = coalesce(sec80DDB.value);
var sec80E = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80E_Usr')[0] ;sec80E.value = coalesce(sec80E.value);
var sec80EE = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80EE_Usr')[0] ;sec80EE.value = coalesce(sec80EE.value);
var sec80G = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80G_Usr')[0];sec80G.value = coalesce(sec80G.value);
var sec80GG = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80GG_Usr')[0] ;sec80GG.value = coalesce(sec80GG.value);
var sec80GGC = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80GGC_Usr')[0] ;sec80GGC.value = coalesce(sec80GGC.value);
var sec80U = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80U_Usr')[0] ;sec80U.value = coalesce(sec80U.value);
var sec80CCG = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCG_Usr')[0]; sec80CCG.value = coalesce(sec80CCG.value);
var sec80RRB = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80RRB_Usr')[0]; sec80RRB.value = coalesce(sec80RRB.value);
var sec80QQB = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80QQB_Usr')[0]; sec80QQB.value = coalesce(sec80QQB.value);
var sec80TTA = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80TTA_Usr')[0]; sec80TTA.value = coalesce(sec80TTA.value);
var sec80CCD1B = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80CCD1B_Usr')[0]; sec80CCD1B.value = coalesce(sec80CCD1B.value);

	var userEntrdDed = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.totalChapVIADeductions_Usr')[0];
	userEntrdDed.value = eval(parseInt(sec80C.value ,10))+
						 eval(parseInt(sec80CCC.value ,10))+
						 eval(parseInt(sec80CCDempeContr.value ,10))+
						 eval(parseInt(sec80CCDemprContr.value ,10))+
						 eval(parseInt(sec80D.value ,10))+
						 eval(parseInt(sec80DD.value ,10))+
						 eval(parseInt(sec80DDB.value ,10))+
						 eval(parseInt(sec80E.value ,10))+
						 eval(parseInt(sec80EE.value ,10))+
						 eval(parseInt(sec80G.value ,10))+
						 eval(parseInt(sec80GG.value ,10))+						 
						 eval(parseInt(sec80GGC.value ,10))+
						 eval(parseInt(sec80U.value ,10))+
						 eval(parseInt(sec80CCG.value ,10))+
						 eval(parseInt(sec80RRB.value ,10))+
						 eval(parseInt(sec80QQB.value ,10))+
						 eval(parseInt(sec80TTA.value ,10))+
						 eval(parseInt(sec80CCD1B.value ,10));
						 }

//To calculate sum of 80C and 80CCC and 80CCD


function checkSum80C80CCC(){
	var sec80CsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80C')[0];
	var sec80CCCsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80CCC')[0];
	var sec80CCDempeContrsysCalc = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80CCD')[0];
	var netSum = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDempeContrsysCalc.value);
	var maxAmount = getMaxLimitAmount();
	if(eval(netSum) >  eval(maxAmount)) {
		var residue = eval(netSum) - eval(maxAmount);
		if(sec80CCDempeContrsysCalc.value >= residue) {
			sec80CCDempeContrsysCalc.value = eval(sec80CCDempeContrsysCalc.value) - eval(residue);
		}else {
			residue = eval(residue) - eval(sec80CCDempeContrsysCalc.value);
			sec80CCDempeContrsysCalc.value =eval('0');

			if(sec80CCCsysCalc.value >= residue){
				sec80CCCsysCalc.value = eval(sec80CCCsysCalc.value) -eval(residue);
			} else {
				residue = eval(residue) - eval(sec80CCCsysCalc.value);
				sec80CCCsysCalc.value =eval('0');
			}
		}
	}
}

// To calculate the maximum amount between Gross total income and Maximum eligible amount

function getMaxLimitAmount() {
	var gtaAmount = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value;
	var maxAmount = eval('150000');
	if(gtaAmount >= eval('150000')) {
		return maxAmount;
	} else {
		return gtaAmount;
	}
	
}

//To calculate the sum of Deductions

function sumDeductions(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80EEsysCalc,sec80GsysCalc,
		sec80GGsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80CCD1BsysCalc){

	sec80CsysCalc.value 			= coalesce(sec80CsysCalc.value); 				sec80CCCsysCalc.value			= coalesce(sec80CCCsysCalc.value);
	sec80CCDemprContrsysCalc.value 	= coalesce(sec80CCDemprContrsysCalc.value); 	sec80CCDempeContrsysCalc.value 	= coalesce(sec80CCDempeContrsysCalc.value);
	sec80DsysCalc.value 			= coalesce(sec80DsysCalc.value);
	sec80DDsysCalc.value 			= coalesce(sec80DDsysCalc.value); 				sec80DDBsysCalc.value			= coalesce(sec80DDBsysCalc.value);
	sec80EsysCalc.value 			= coalesce(sec80EsysCalc.value); 				sec80GsysCalc.value 			= coalesce(sec80GsysCalc.value);
	sec80GGsysCalc.value 			= coalesce(sec80GGsysCalc.value); 
	sec80EEsysCalc.value 			= coalesce(sec80EEsysCalc.value); 
	sec80GGCsysCalc.value 			= coalesce(sec80GGCsysCalc.value); 				sec80UsysCalc.value 			= coalesce(sec80UsysCalc.value);
	sec80CCGsysCalc.value 			= coalesce(sec80CCGsysCalc.value);				sec80RRBsysCalc.value 			= coalesce(sec80RRBsysCalc.value);
	sec80QQBsysCalc.value 			= coalesce(sec80QQBsysCalc.value);				sec80TTAsysCalc.value 			= coalesce(sec80TTAsysCalc.value);
	sec80CCD1BsysCalc.value 			= coalesce(sec80CCD1BsysCalc.value);		 	

	var dedVIA = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];
	var temp2 = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDemprContrsysCalc.value) +
				eval(sec80CCDempeContrsysCalc.value) + eval(sec80DsysCalc.value) +
				eval(sec80DDsysCalc.value) + eval(sec80DDBsysCalc.value) + eval(sec80EsysCalc.value) + eval(sec80EEsysCalc.value) +
				eval(sec80GsysCalc.value) + eval(sec80GGsysCalc.value) + 
				eval(sec80GGCsysCalc.value)+ eval(sec80UsysCalc.value)+ eval(sec80CCGsysCalc.value)+ eval(sec80RRBsysCalc.value)+ 
				eval(sec80QQBsysCalc.value)+ eval(sec80TTAsysCalc.value)+ eval(sec80CCD1BsysCalc.value);

	var grossTotInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0]; 

	if(coalesce(grossTotInc.value) > parseInt('0',10)){
		if( temp2 >  parseInt(coalesce(grossTotInc.value) ,10)){
			dedVIA.value = parseInt(coalesce(grossTotInc.value) ,10);
		} else{
			dedVIA.value = temp2;
		}
	}else{
		dedVIA.value = temp2;
	}
	calcTI();
}

//To calculate the sum of Deductions without Section 80GG


function sumDeductionsWithout80GG(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80EEsysCalc,sec80GsysCalc,
		sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80CCD1BsysCalc){

	sec80CsysCalc.value 			= coalesce(sec80CsysCalc.value); 				sec80CCCsysCalc.value			= coalesce(sec80CCCsysCalc.value);
	sec80CCDemprContrsysCalc.value 	= coalesce(sec80CCDemprContrsysCalc.value); 	sec80CCDempeContrsysCalc.value 	= coalesce(sec80CCDempeContrsysCalc.value);
	sec80DsysCalc.value 			= coalesce(sec80DsysCalc.value);
	sec80DDsysCalc.value 			= coalesce(sec80DDsysCalc.value); 				sec80DDBsysCalc.value			= coalesce(sec80DDBsysCalc.value);
	sec80EsysCalc.value 			= coalesce(sec80EsysCalc.value); 				sec80EEsysCalc.value 			= coalesce(sec80EEsysCalc.value);
	sec80GsysCalc.value 			= coalesce(sec80GsysCalc.value);
	sec80GGCsysCalc.value 			= coalesce(sec80GGCsysCalc.value); 				sec80UsysCalc.value 			= coalesce(sec80UsysCalc.value);
	sec80CCGsysCalc.value 			= coalesce(sec80CCGsysCalc.value);				sec80RRBsysCalc.value 			= coalesce(sec80RRBsysCalc.value);
	sec80QQBsysCalc.value 			= coalesce(sec80QQBsysCalc.value);				sec80TTAsysCalc.value 			= coalesce(sec80TTAsysCalc.value);
	sec80CCD1BsysCalc.value 			= coalesce(sec80CCD1BsysCalc.value);		

	var dedVIA = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];
	var temp2 = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDemprContrsysCalc.value) +
				eval(sec80CCDempeContrsysCalc.value) + eval(sec80DsysCalc.value) +
				eval(sec80DDsysCalc.value) + eval(sec80DDBsysCalc.value) + eval(sec80EsysCalc.value) +
				eval(sec80GsysCalc.value) + eval(sec80EEsysCalc.value) + 
				eval(sec80GGCsysCalc.value)+ eval(sec80UsysCalc.value)+ eval(sec80CCGsysCalc.value)+ eval(sec80RRBsysCalc.value)+ 
				eval(sec80QQBsysCalc.value)+ eval(sec80TTAsysCalc.value)+ eval(sec80CCD1BsysCalc.value);

	var grossTotInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0]; 

	if(coalesce(grossTotInc.value) > parseInt('0',10)){
		if( temp2 >  parseInt(coalesce(grossTotInc.value) ,10)){
			dedVIA.value = parseInt(coalesce(grossTotInc.value) ,10);
		} else{
			dedVIA.value = temp2;
		}
	}else{
		dedVIA.value = temp2;
	}
	
	var totInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0];
	totInc.value =eval(parseInt(coalesce(grossTotInc.value) ,10) - parseInt(coalesce(dedVIA.value) ,10));
	
	

	
	
}

//To calculate Total Income

function calcTI(){

 var dedVIA = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];  dedVIA.value = coalesce(dedVIA.value);
 var totInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0];	totInc.value = coalesce(totInc.value);
 var grossInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value; 
 var pan = document.getElementsByName('itr4S.personalInfo.pan')[0].value;
 
 totInc.value = eval(coalesce(grossInc)) - eval(dedVIA.value); 
 totInc.value = zeroOrMore(coalesce(totInc.value));

 // Rounding of to nearest multiple of 10
	 totInc.value= eval(Math.round(eval(totInc.value)/10)*parseInt('10' ,10));

 calcTaxPayableOnTI();
 
 
 
 var rebate87A = document.getElementsByName('itr4S.itr1TaxComputationOnline.rebate87A')[0];
	
	var resStatus = document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;
	var taxPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalTaxPayable')[0].value;
	var taxPayableOnRebate = document.getElementsByName('itr4S.itr1TaxComputationOnline.taxPayableOnRebate')[0]; //D3
	var surchargeOnAboveCrore = document.getElementsByName('itr4S.itr1TaxComputationOnline.surchargeOnAboveCrore')[0];
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
	if((status =='I')&&(resStatus=='RES'||resStatus=='NOR') && totInc.value<=500000){
		rebate87A.value = Math.min(parseInt(taxPayable,10),5000);
	} else {
	    rebate87A.value = parseInt('0' ,10);
	}
	
	
	taxPayableOnRebate.value = taxPayable-(rebate87A.value);
	calsurchargeOnAboveCrore();
}

//To calculate surcharge On Above Crore


function calsurchargeOnAboveCrore(){
var taxPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalTaxPayable')[0];
var surchargeOnAboveCrore = document.getElementsByName('itr4S.itr1TaxComputationOnline.surchargeOnAboveCrore')[0];
var totInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0];	totInc.value = coalesce(totInc.value);
var resStatus=document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;
var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
var age = calcAge(); 
// for surcharge
			var taxOnTotInc =  parseInt(taxPayable.value,10);
			var taxOnCutOffInc;
			
			if((status=='I')&&(resStatus == 'RES' || resStatus=='NOR') && (age> eval(59) && age <= eval(79))){
			taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 120000);
			} else if((status=='I') && (resStatus == 'RES' || resStatus=='NOR') &&  ( eval(age)> eval(79))){
			taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 100000);
			}else if(status == 'F') {
				taxOnCutOffInc = ((10000000)* 0.3);
			}
			
			else {
				taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 125000);
			}

			if( rndOffNrsTen(totInc.value) > 10000000 ){
				 if(status == 'F'){
				var tempSurcharge = taxOnTotInc  * 0.12 ; //surcharge change for 17-18 for Firm
				 }
				 else if(status == 'I' || status == 'H'){
					 var tempSurcharge = taxOnTotInc  * 0.15 ;  // for ind n huf for 17-18
				 }
				
				//check if eligible for marginal relief
				var extraInc = rndOffNrsTen(totInc.value) - 10000000;
				if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc)){
					var marginalRelief = taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc );
					surchargeOnAboveCrore.value = tempSurcharge - marginalRelief;
					surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
					} else {
					surchargeOnAboveCrore.value = tempSurcharge;
					surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
					}
				} else {
					surchargeOnAboveCrore.value = parseInt('0' ,10);
			}
}


//Tax calculation according to tax slabs
function calcTaxPayableOnTI(){

 var totInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0];
 var taxPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalTaxPayable')[0];
 var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
 var age = calcAge(); 

 var resStatus=document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;

	if((resStatus == 'RES' || resStatus=='NOR') && ( eval(age)> eval(59) ) &&  (eval(age) <= eval(79))){

	
		if(status == 'H' || status == 'h'){
		if ( eval(totInc.value) <= eval('250000')){
			taxPayable.value = '0';
		} else {
			if((eval(totInc.value) >= eval('250001')) && (eval(totInc.value) <= eval('500000'))){
				var temp = (eval(totInc.value) - eval ('250000')) * eval('0.10');
				taxPayable.value = Math.round(eval(temp));
			} else if((eval(totInc.value) >= eval('500001')) && (eval(totInc.value) <= eval('1000000'))) {
				var temp = (eval(totInc.value) - eval ('500000')) * eval('0.20');
				taxPayable.value = Math.round(eval(temp) + eval('25000'));
			} else if(eval(totInc.value) >= eval('1000001')) {
				var temp = (eval(totInc.value) - eval ('1000000')) * eval('0.30');
				taxPayable.value = Math.round(eval(temp) + eval('125000'));
			}
		}
		} 
		else if(status == 'F' || status == 'f' && (resStatus == 'RES' || resStatus=='NRI')){
			var temp = eval(totInc.value) * eval('0.30');
			taxPayable.value = Math.round(eval(temp));
			
		}
		else { 

		if ( eval(totInc.value) <= eval('300000')){
			taxPayable.value = '0';
		} else {
			if((eval(totInc.value) >= eval('300001')) && (eval(totInc.value) <= eval('500000'))){
				var temp = (eval(totInc.value) - eval ('300000')) * eval('0.10');
				taxPayable.value = Math.round(eval(temp));
			} else if((eval(totInc.value) >= eval('500001')) && (eval(totInc.value) <= eval('1000000'))) {
				var temp = (eval(totInc.value) - eval ('500000')) * eval('0.20');
				taxPayable.value = Math.round(eval(temp) + eval('20000'));
			} else if(eval(totInc.value) >= eval('1000001')) {
				var temp = (eval(totInc.value) - eval ('1000000')) * eval('0.30');
				taxPayable.value = Math.round(eval(temp) + eval('120000'));
			}
		}
		}
	} else if( (resStatus == 'RES' || resStatus=='NOR') &&  ( eval(age)> eval(79))){
		if(status == 'H' || status == 'h'){
		if ( eval(totInc.value) <= eval('250000')){
			taxPayable.value = '0';
		} 
		else {
			if((eval(totInc.value) >= eval('250001')) && (eval(totInc.value) <= eval('500000'))){
				var temp = (eval(totInc.value) - eval ('250000')) * eval('0.10');
				taxPayable.value = Math.round(eval(temp));
			} else if((eval(totInc.value) >= eval('500001')) && (eval(totInc.value) <= eval('1000000'))) {
				var temp = (eval(totInc.value) - eval ('500000')) * eval('0.20');
				taxPayable.value = Math.round(eval(temp) + eval('25000'));
			} else if(eval(totInc.value) >= eval('1000001')) {
				var temp = (eval(totInc.value) - eval ('1000000')) * eval('0.30');
				taxPayable.value = Math.round(eval(temp) + eval('125000'));
			}
		}
		}else if(status == 'F' || status == 'f' && (resStatus == 'RES' || resStatus=='NRI')){
			var temp = eval(totInc.value) * eval('0.30');
			taxPayable.value = Math.round(eval(temp));
			
		} 
		else { 
		if ( eval(totInc.value) <= eval('500000')){
			taxPayable.value = '0';
		} else {
			if((eval(totInc.value) >= eval('500001')) && (eval(totInc.value) <= eval('1000000'))){
				var temp = (eval(totInc.value) - eval ('500000')) * eval('0.20');
				taxPayable.value = Math.round(eval(temp));
			}
			else if(eval(totInc.value) >= eval('1000001')) {
				var temp = (eval(totInc.value) - eval ('1000000')) * eval('0.30');
				taxPayable.value = Math.round(eval(temp) + eval('100000'));
			}
		}
		}
	} else if(status == 'F' || status == 'f' && (resStatus == 'RES' || resStatus=='NRI')){
		var temp = eval(totInc.value) * eval('0.30');
		taxPayable.value = Math.round(eval(temp));
		
	}
	else {
		if ( eval(totInc.value) <= eval('250000')){
			taxPayable.value = '0';
		} else {
			if((eval(totInc.value) >= eval('250001')) && (eval(totInc.value) <= eval('500000'))){
				var temp = (eval(totInc.value) - eval ('250000')) * eval('0.10');
				taxPayable.value = Math.round(eval(temp));
			} else if((eval(totInc.value) >= eval('500001')) && (eval(totInc.value) <= eval('1000000'))) {
				var temp = (eval(totInc.value) - eval ('500000')) * eval('0.20');
				taxPayable.value = Math.round(eval(temp) + eval('25000'));
			} else if(eval(totInc.value) >= eval('1000001')) {
				var temp = (eval(totInc.value) - eval ('1000000')) * eval('0.30');
				taxPayable.value = Math.round(eval(temp) + eval('125000'));
			}
		}
	}

 calcEduCess();

 }

//To calculate tax on Education Cess

function calcEduCess(){

	var totInc = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalTaxPayable')[0];// D1
	var eduCess = document.getElementsByName('itr4S.itr4sTaxComputationOnline.educationCess')[0]; // D5
	var taxPayableOnRebate = document.getElementsByName('itr4S.itr1TaxComputationOnline.taxPayableOnRebate')[0].value; //D3
	var surchargeOnAboveCrore = document.getElementsByName('itr4S.itr1TaxComputationOnline.surchargeOnAboveCrore')[0].value; // D4
	if(totInc.value < 0){
	totInc.value = eval(parseInt(0, 10));
	} else {
	totInc.value = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalTaxPayable')[0].value;
	}
	eduCess.value = (eval(coalesce(taxPayableOnRebate))+eval(coalesce(surchargeOnAboveCrore)))* eval('0.03');
	eduCess.value  = Math.round(eduCess.value);
	
	var totTaxWithEduCess = document.getElementsByName('itr4S.itr4sTaxComputationOnline.grossTaxLiability')[0];// D6
	totTaxWithEduCess.value= eval(parseInt(eduCess.value,10)) + eval(parseInt(taxPayableOnRebate,10))+ eval(parseInt(surchargeOnAboveCrore,10));
	calcBalTaxPay();
}

//To calculate Balance tax payable

function calcBalTaxPay(){

	var sec89 = document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0]; sec89.value = coalesce(sec89.value);
	var totTaxWithEduCess = document.getElementsByName('itr4S.itr4sTaxComputationOnline.grossTaxLiability')[0]; totTaxWithEduCess.value = coalesce(totTaxWithEduCess.value);

	var balTaxPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.netTaxLiability')[0];
	balTaxPay.value= Math.round(eval(parseInt(totTaxWithEduCess.value ,10)-parseInt(sec89.value ,10)));
	if(balTaxPay.value < eval('0')) {
		balTaxPay.value = '0';
	}
	calcInterestPayable();
	calcIntrstPayable();
}

//To calculate Balance interest payable

function calcIntrstPayable(){

	var balTaxPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.netTaxLiability')[0]; balTaxPay.value = coalesce(balTaxPay.value);
	var totIntrstPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalIntrstPay')[0]; totIntrstPay.value = coalesce(totIntrstPay.value);
	var totTaxIntrstPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totTaxPlusIntrstPay')[0]; totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);

	totTaxIntrstPay.value = eval(balTaxPay.value) + eval(totIntrstPay.value);

	calcTaxPayable15Minus17();
}

//To add row for table

function addRowToTablePage8Donations (tableId,noOfRow,last){

	addRowToTable(tableId,noOfRow,last);
	allRowsForPage8Donations (tableId,noOfRow,last);
	calcInterestPayable();
	calcGrossTotIncome();

}

//To add row for table and calculate GTI and interest

function addRowToTablePage6(tableId,noOfRow,last){
	
	addRowToTable(tableId,noOfRow,last);
	calcInterestPayable();
	calcGrossTotIncome();
}

//To add row for table 44AE

function addRowToTablePage4(tableId,noOfRow,last){
	if(tableId == 'us44aeHeavyVehcl'){
		var table1Rows = document.getElementById('us44aeHeavyVehcl').rows.length;
		var totalRows = eval( parseInt(table1Rows,10) -parseInt(2,10) );
		if(totalRows >10){
			addErrorXHTML('','Cannot add more than 10 rows for Vehicles Table');
		}else{
			addRowToTable(tableId,noOfRow,last);
			calcGrossTotIncome();
		}
	}else{
		addRowToTable(tableId,noOfRow,last);
		calcGrossTotIncome();
	}
}

//To delete row for table

function deleteRowToTablePage8Donations(tableId,noOfRow,last){

	deleteRowTable(tableId,1,2);
	allRowsForPage8Donations(tableId,noOfRow,last);
}

//To delete row for table in 80G


function allRowsForPage8Donations (tableId,noOfRow,last)  {

	allRowsForPage8DonationsSaras(tableId,0,0);
	allRowsForPage8DonationsSaras('ded100PerWithoutQual',0,0);
	allRowsForPage8DonationsSaras('ded50WithoutQual',0,0);
	allRowsForPage8DonationsSaras('ded100Qual',0,0);
	allRowsForPage8DonationsSaras('ded50WithQual',0,0);
}

function allRowsForPage8DonationsSaras (tableId,noOfRow,last)  {
	 try {
			var residue50Perc;
		 	var qualifyingLimit;
			var grossTotalIncome = coalesce(document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value);

			var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
			var pan = document.getElementsByName('itr4S.personalInfo.pan')[0].value;
			
			
			 if( parseInt(grossTotalIncome ,10) <0 ){
				 grossTotalIncome = parseInt(0,10);
				}

			var sys80G = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80G')[0]; sys80G.value = coalesce(sys80G.value);
			var sys80GG = document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.section80GG')[0]; sys80GG.value = coalesce(sys80GG.value);
			var usr80GG = document.getElementsByName('itr4S.itr4SIncomeDeductions.usrDeductUndChapVIA.section80GG_Usr')[0]; usr80GG.value = coalesce(usr80GG.value);
			var deductionsSysTotal =  document.getElementsByName('itr4S.itr4SIncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0]; deductionsSysTotal.value = coalesce(deductionsSysTotal.value);

			var tab = document.getElementById(tableId);
			var allInputTags = tab.getElementsByTagName('input');

			if ( tableId == 'ded100PerWithoutQual' ) {
				for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("eligibleDonationAmt$")) {
						allInputTags[i].value = coalesce(allInputTags[i - 1].value);
							if( parseInt(allInputTags[i].value,10) > parseInt(grossTotalIncome ,10)) {
								allInputTags[i].value = grossTotalIncome;
							}
					}
				}
				calcTableTotEligAmt('ded100PerWithoutQual',qualifyingLimit,residue50Perc);
			}			
			
			if ( tableId == 'ded50WithoutQual' ) {
				for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("eligibleDonationAmt$")) {
						allInputTags[i].value = parseInt(Math.round(coalesce(allInputTags[i - 1].value)/2) , 10);
							if( parseInt(allInputTags[i].value ,10) > parseInt(grossTotalIncome ,10) ) {
								allInputTags[i].value = grossTotalIncome;
							}
					}
				}
				calcTableTotEligAmt('ded50WithoutQual',qualifyingLimit,residue50Perc);
			}
			var	adjstGTI;
			if(grossTotalIncome == eval(parseInt(deductionsSysTotal.value,10) - parseInt(sys80G.value ,10))){
			adjstGTI=0;
			}else{
			if((pan.substring(3,4)=='P' || pan.substring(3,4)=='p') && (status == 'I')) {
			 adjstGTI = eval(parseInt(grossTotalIncome ,10) -(parseInt(deductionsSysTotal.value ,10) - parseInt(sys80G.value ,10) - parseInt(sys80GG.value ,10) + parseInt(usr80GG.value ,10)));
			 } else {
			 adjstGTI = eval(parseInt(grossTotalIncome ,10) -(parseInt(deductionsSysTotal.value ,10) - parseInt(sys80G.value ,10) - parseInt(sys80GG.value ,10)));
			 }
			
			}
			
			var qualifyingLimit = eval(parseInt(adjstGTI ,10) * parseFloat('0.10'));
			 if( parseInt(qualifyingLimit ,10) <0 ){
				 qualifyingLimit = parseInt(0,10);
				}

			if ( tableId == 'ded100Qual' ) {
				for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("eligibleDonationAmt$")) {
						allInputTags[i].value = parseInt(Math.round(coalesce(allInputTags[i - 1].value)) , 10);
							if( parseInt(allInputTags[i].value ,10) > parseInt(qualifyingLimit , 10)) {
								allInputTags[i].value = parseInt(qualifyingLimit , 10);
							}
					}
				}
				calcTableTotEligAmt('ded100Qual',qualifyingLimit,residue50Perc);
			}

			var totEligAmtTableC = document.getElementsByName('itr4S.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0]; totEligAmtTableC.value = coalesce(totEligAmtTableC.value);
			var residue;
			if(parseInt(qualifyingLimit , 10) > parseInt(totEligAmtTableC.value , 10)) {
					residue = eval( parseInt(qualifyingLimit , 10) - parseInt(totEligAmtTableC.value , 10) );
				} else {
					residue = parseInt('0' ,10) ;
				}

			var residue50Perc = eval( parseInt(residue , 10) * parseFloat('0.50') );
			if ( tableId == 'ded50WithQual' ) {
				for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("eligibleDonationAmt$")) {
						allInputTags[i].value = parseInt(Math.round(coalesce(allInputTags[i - 1].value)/2) , 10);
							if( parseInt(allInputTags[i].value ,10) > parseInt(residue50Perc , 10)) {
								allInputTags[i].value = parseInt(residue50Perc , 10);
							}
					}
				}
				calcTableTotEligAmt('ded50WithQual',qualifyingLimit,residue50Perc);
			}
		}
		catch (e) {
			alert ('exception in allRowsForPage8DonationsSaras() = ' + e);
		}
}

//To calculate total eligible amount

function calcTableTotEligAmt(tableId,qualifyingLimit,residue50Perc){

		var tab = document.getElementById(tableId);
		var allInputTags = tab.getElementsByTagName('input');
		var sumOfAll = parseInt('0' ,10);
		var sumOfAlluserEntredValue = parseInt('0' ,10);
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("eligibleDonationAmt$")) {
					if(parseInt( allInputTags[i].value ,10)<0){
						allInputTags[i].value = 0;
					}
					sumOfAll = eval ( parseInt(sumOfAll ,10) + parseInt( allInputTags[i].value ,10) );
					sumOfAlluserEntredValue = eval ( parseInt(sumOfAlluserEntredValue ,10) + parseInt( coalesce(allInputTags[i-1].value) ,10) );
				}
			}

		var grossTotalIncome = coalesce(document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value);
		
		 if( parseInt(grossTotalIncome ,10) <0 ){
			 grossTotalIncome = parseInt(0,10);
			}
		
		
		if( parseInt(sumOfAll ,10) > parseInt(grossTotalIncome ,10)) {
			sumOfAll = grossTotalIncome;
		}

		if(tableId == 'ded100PerWithoutQual'){
				var temp1 = document.getElementsByName('itr4S.schedule80G.don100Percent.totEligibleDon100Percent')[0] ;
				var temp2 = document.getElementsByName('itr4S.schedule80G.don100Percent.totDon100Percent')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
			}
		else if(tableId == 'ded50WithoutQual'){
				var temp1 = document.getElementsByName('itr4S.schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0] ;
				var temp2 = document.getElementsByName('itr4S.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
			}
		else if(tableId == 'ded100Qual'){
				var temp1 = document.getElementsByName('itr4S.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0] ;
				var temp2 = document.getElementsByName('itr4S.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
					if(parseInt(temp1.value ,10) > parseInt(qualifyingLimit ,10)){
					
					temp1.value=parseInt(qualifyingLimit ,10);;
				}
		}
		else if(tableId == 'ded50WithQual'){
				var temp1 = document.getElementsByName('itr4S.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0] ;
				var temp2 = document.getElementsByName('itr4S.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
				
					if(parseInt(temp1.value ,10) > parseInt(residue50Perc ,10)){
					
					temp1.value=parseInt(residue50Perc ,10);;
				}
		}

		calcUserDonations80G();
		calcDonationsEligb();
	}

//To calculate donations under section 80G

function calcUserDonations80G(){
 var tot80GAuserEntrd =  document.getElementsByName('itr4S.schedule80G.don100Percent.totDon100Percent')[0]; tot80GAuserEntrd.value = coalesce(tot80GAuserEntrd.value);
 var tot80GBuserEntrd =  document.getElementsByName('itr4S.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0]; tot80GBuserEntrd.value = coalesce(tot80GBuserEntrd.value);
 var tot80GCuserEntrd =  document.getElementsByName('itr4S.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0]; tot80GCuserEntrd.value = coalesce(tot80GCuserEntrd.value);
 var tot80GDuserEntrd =  document.getElementsByName('itr4S.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0]; tot80GDuserEntrd.value = coalesce(tot80GDuserEntrd.value);
 var tot80GDonuserEntrd =  document.getElementsByName('itr4S.schedule80G.totalDonationsUs80G')[0]; tot80GDonuserEntrd.value = coalesce(tot80GDonuserEntrd.value);

 tot80GDonuserEntrd.value = eval(tot80GAuserEntrd.value)+ eval(tot80GBuserEntrd.value)+ eval(tot80GCuserEntrd.value)+ eval(tot80GDuserEntrd.value) ;

}

//To calculate eligible donations under section 80G

function calcDonationsEligb(){
 var tot80GAelig =  document.getElementsByName('itr4S.schedule80G.don100Percent.totEligibleDon100Percent')[0]; tot80GAelig.value = coalesce(tot80GAelig.value);
 var tot80GBelig =  document.getElementsByName('itr4S.schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0]; tot80GBelig.value = coalesce(tot80GBelig.value);
 var tot80GCelig =  document.getElementsByName('itr4S.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0]; tot80GCelig.value = coalesce(tot80GCelig.value);
 var tot80GDelig =  document.getElementsByName('itr4S.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0]; tot80GDelig.value = coalesce(tot80GDelig.value);
 var tot80GDonelig =  document.getElementsByName('itr4S.schedule80G.totalEligibleDonationsUs80G')[0]; tot80GDonelig.value = coalesce(tot80GDonelig.value);

 tot80GDonelig.value = eval(tot80GAelig.value)+ eval(tot80GBelig.value)+ eval(tot80GCelig.value)+ eval(tot80GDelig.value) ;
 var grossTotalIncome = coalesce(document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value);
 
 if( parseInt(grossTotalIncome ,10) <0 ){
	 grossTotalIncome = parseInt(0,10);
	}
 
 if( parseInt(grossTotalIncome ,10) <  parseInt(tot80GDonelig.value ,10)) {
		tot80GDonelig.value = parseInt(grossTotalIncome ,10);
   }
   calcGrossTotIncome();
}

//To calculate Interest payable

function calcInterestPayable(){

try{

	var varDate = document.getElementsByName('itr4S.verification.date')[0];
	if(varDate.value=='' || varDate.value==undefined || varDate.value== null){
		var dt = new Date();
		varDate.value= getCurrentDate();
	}

	var advanceTaxToDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.vaue = coalesce(advanceTaxToDisplay.value);
	var TDSToDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.vaue = coalesce(TDSToDisplay.value);
	var SATtoDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.vaue = coalesce(SATtoDisplay.value);
	var TCStoDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.tcs')[0];  TCStoDisplay.vaue = coalesce(TCStoDisplay.value);

	var balTaxPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.netTaxLiability')[0]; balTaxPayable.vaue = coalesce(balTaxPayable.value);
	var advanceTax = parseInt('0' ,10) ;
	var selfAssessmentTax = parseInt('0' ,10) ;

	var TDS = parseInt('0' ,10);
	var tab1 = document.getElementById('taxDedSourceSal');
	var allInputTags = tab1.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("totalTDSSal$")) {				
				if(parseInt(allInputTags[i].value ,10) > parseInt(allInputTags[i-1].value ,10)){
					addError(allInputTags[i],'Total tax deducted cannot be more than Income chargeable under Salaries',true);
						j.setFieldError(allInputTags[i].name,'Total tax deducted cannot be more than Income chargeable under Salaries');
					allInputTags[i].value = parseInt('0',10);
					TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
				} else{
					TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
				}
			}
		}

	var tab2 = document.getElementById('taxDedSourceSrc');
	var allInputTags = tab2.getElementsByTagName('input');
	var portuVal = document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value;
	if(portuVal=='N'){
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$")) {
					
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 7 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 7 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}else{							
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}
					}
			}
			}
		} else {
		
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$")) {
					
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$") && allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10) + parseInt(coalesce(allInputTags[i+1].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 7+Col 8 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 7+Col 8 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);
							allInputTags[i+1].value = parseInt('0',10);
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}else{							
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}
					}
			}
			}
		
		}
	calculateTotalTax('taxDedSourceSal');
	calculateTotalTaxTDS2('taxDedSourceSrc');
	var totalTaxDeducted = document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary.totalTaxDeducted')[0].value;
	var claimOutOfTotTDSOnAmtPaid = document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal.claimOutOfTotTDSOnAmtPaid')[0].value;
	TDS = eval(parseInt(totalTaxDeducted,10) + parseInt(claimOutOfTotTDSOnAmtPaid,10));
	TDSToDisplay.value = TDS;

	var TCS = parseInt('0' ,10);
	var tcsTAB = document.getElementById('tcsTableId');
	var allInputTags = tcsTAB.getElementsByTagName('input');
	if(portuVal=='N'){
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("amtTCSClaimedThisYear$")) {
					if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  parseInt(allInputTags[i-1].value,10)){
						addError(allInputTags[i],'Amount claimed in Col 5 cannot exceed Total tax collected',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 5 cannot exceed Total tax collected');
						allInputTags[i].value = parseInt('0',10);
						TCS = eval(parseInt(TCS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}else{
						TCS = eval(parseInt(TCS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}
				}
			}
		} else {
		
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("amtTCSClaimedThisYear$")&& allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
					if(eval(parseInt(coalesce(allInputTags[i].value),10) + parseInt(coalesce(allInputTags[i+1].value),10)) >  parseInt(allInputTags[i-1].value,10)){
						addError(allInputTags[i],'Amount claimed in cannot exceed Total tax collected',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 5+Col 6 cannot exceed Total tax collected');
						allInputTags[i].value = parseInt('0',10);
						allInputTags[i+1].value = parseInt('0',10);
						TCS = eval(parseInt(TCS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}else{
						TCS = eval(parseInt(TCS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}
				}
			}
		
		}
	calculateTotalTaxTCS('tcsTableId');
	var totalTCS = document.getElementsByName('itr4S.scheduleTCS.tcs.amtTCSClaimedThisYear')[0].value;
	TCStoDisplay.value = parseInt(totalTCS,10);
	TCS = parseInt(totalTCS,10);


	var tab3 = document.getElementById('taxDedSelf');
	var allInputTags = tab3.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
		if(allInputTags[i].name.match("dateDep$")){
			if( checkFirstDateBefore(FY_start_date , allInputTags[i].value) && checkFirstDateBefore(allInputTags[i].value , FY_end_date) ){
					advanceTax = eval( parseInt(isNVL(advanceTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10) );
				}else if( checkFirstDateBefore(AY_start_date , allInputTags[i].value)){
					selfAssessmentTax = eval(parseInt(isNVL(selfAssessmentTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10)) ;
				}
		}
	}
	
	var selfAssessmentTax234A = parseInt('0',10);
   	for(var i = 0; i < allInputTags.length; i++) {
			if(allInputTags[i].name.match("dateDep$")){
				if(checkFirstDateBefore(AY_start_date , allInputTags[i].value) && checkFirstDateBefore(allInputTags[i].value , Filing_dueDate)){
					selfAssessmentTax234A = selfAssessmentTax234A +parseInt(isNVL(allInputTags[i+2].value) ,10) ;
				}
			}
	}


	advanceTaxToDisplay.value = parseInt(advanceTax,10);
	SATtoDisplay.value = parseInt(selfAssessmentTax,10);

	var intrst234Aprinciple	;
	if(parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS ,10)- parseInt(TCS ,10) - parseInt(selfAssessmentTax234A,10) < 0){
		intrst234Aprinciple = parseInt('0' ,10);
	}else {

		intrst234Aprinciple = parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS ,10)- parseInt(TCS ,10)-parseInt(selfAssessmentTax234A,10);

		// Rounding off to previous hundered
		if(parseInt(intrst234Aprinciple,10) > 100){
			intrst234Aprinciple= Math.floor(parseInt(intrst234Aprinciple,10)/100)*parseInt('100' ,10);
		}
	}

	var currentDate = document.getElementsByName('itr4S.verification.date')[0].value;
		
	var MonthsAfterDueDate;	
	if(checkFirstDateBefore(currentDate, getCurrentDate())){
		currentDate = getCurrentDate();
	}
	MonthsAfterDueDate =  calcNoOfMonths(currentDate , Int_start_date_234A);
	if(document.getElementsByName('itr4S.filingStatus.returnFileSec')[0].value=='17' && 
		document.getElementsByName('itr4S.filingStatus.returnType')[0].value=='R'){
		var origDate = document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].value;
		if(origDate!=null && origDate!=undefined  && origDate!=''){
			MonthsAfterDueDate =  calcNoOfMonths(origDate , Int_start_date_234A); 	// for Revised return take date of original filling
		}else{
			MonthsAfterDueDate =  0;
		}
	}
	
	if(document.getElementsByName('itr4S.filingStatus.returnFileSec')[0].value=='18'){
			
			var origDate = document.getElementsByName('itr4S.filingStatus.noticeDate')[0].value;		
			if(origDate!=null && origDate!=undefined  && origDate!=''){
				MonthsAfterDueDate =  calcNoOfMonths(origDate , Int_start_date_234A); 	// for Defective return take date of original filling
			}else{
				MonthsAfterDueDate =  0;
			}
		}
		
	
	var intrst234A = parseInt(intrst234Aprinciple,10) * parseFloat('0.01') * parseInt(MonthsAfterDueDate) ;
	var intrst234B = parseInt('0' ,10);
	var	intrst234C = parseInt('0' ,10);

	var slab1 = parseInt('0' ,10);
	var slab2 = parseInt('0' ,10);
	var slab3 = parseInt('0' ,10);
	var slab4 = parseInt('0' ,10);
	
	/*var state = document.getElementsByName('itr4S.personalInfo.address.stateCode')[0];

	if(state.value== '25' || state.value == '29'){
		
		slab2_end_date='31/12/2015';
		slab3_start_date='01/01/2016';
		
	}else{
		
		var slab2_end_date = '15/12/2015';
		var slab3_start_date = '16/12/2015';
	}
*/

		var tab4 = document.getElementById('taxDedSelf');
		var allInputTags = tab4.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("dateDep$")) {

				if(checkFirstDateBefore(FY_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab1_end_date ) ){
					slab1 = eval(parseInt(slab1 ,10) + parseInt(coalesce(allInputTags[i+2].value) ,10));

				}
				else if(checkFirstDateBefore(slab2_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab2_end_date ) ){
					slab2 = eval(parseInt(slab2 ,10) + parseInt(coalesce(allInputTags[i+2].value) ,10));

				}
				else if(checkFirstDateBefore(slab3_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab3_end_date ) ){
					slab3 = eval(parseInt(slab3 ,10) + parseInt(coalesce(allInputTags[i+2].value) ,10));

				}
				else if(checkFirstDateBefore(slab4_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab4_end_date ) ){
					slab4 = eval(parseInt(slab4 ,10) + parseInt(coalesce(allInputTags[i+2].value) ,10));
					
				}
			}
		}

	var intrst234Ci = parseInt('0' ,10);
	var intrst234Cii = parseInt('0' ,10);
	var intrst234Ciii = parseInt('0' ,10);
	var intrst234Civ = parseInt('0' ,10);

	var balTaxPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.netTaxLiability')[0]; balTaxPayable.value = coalesce(balTaxPayable.value);

	//Here get the value of virtualBalTaxPayableFor234C
	var virtualBalTaxPayableFor234C = calcVirtualTaxPayableOnTI();             //call the function to calculate virtualBalTaxPayable
	if(( eval(parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10)- parseInt(TCS ,10)) >=  parseInt('10000',10))){

		if(parseInt(slab1 ,10) < eval((parseInt(virtualBalTaxPayableFor234C ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.12'))){
			var tempintrst234Ci = (((parseInt(virtualBalTaxPayableFor234C ,10) - parseInt(TDS ,10)- parseInt(TCS ,10) ) * parseFloat('0.15')) - parseInt(slab1 ,10));

			if(parseInt(tempintrst234Ci,10) > 100){
				tempintrst234Ci= Math.floor(parseInt(tempintrst234Ci,10)/100)*parseInt('100' ,10);
			}
			intrst234Ci=parseInt(tempintrst234Ci,10)* parseFloat('0.01') * parseInt('3' ,10) ;

		}

		if(eval(parseInt(slab1 ,10) + parseInt(slab2 ,10)) < eval((parseInt(virtualBalTaxPayableFor234C ,10) - parseInt(TDS ,10)- parseInt(TCS ,10)) * parseFloat('0.36') )){
		var tempintrst234Cii = (((parseInt(virtualBalTaxPayableFor234C ,10) - parseInt(TDS ,10)- parseInt(TCS ,10)) * parseFloat('0.45') ) -parseInt(slab1 ,10) - parseInt(slab2 ,10) );

			if(parseInt(tempintrst234Cii,10) > 100){
				tempintrst234Cii= Math.floor(parseInt(tempintrst234Cii,10)/100)*parseInt('100' ,10);
			}
			intrst234Cii=parseInt(tempintrst234Cii,10)* parseFloat('0.01') * parseInt('3' ,10) ;

		}
		
		if(eval(parseInt(slab1 ,10) + parseInt(slab2 ,10) + parseInt(slab3 ,10)) < eval((parseInt(virtualBalTaxPayableFor234C ,10) - parseInt(TDS ,10)- parseInt(TCS ,10)) * parseFloat('0.75') )){
			var tempintrst234Ciii = (((parseInt(virtualBalTaxPayableFor234C ,10) - parseInt(TDS ,10)- parseInt(TCS ,10)) * parseFloat('0.75') ) -parseInt(slab1 ,10) - parseInt(slab2 ,10)-  parseInt(slab3 ,10) );

				if(parseInt(tempintrst234Ciii,10) > 100){
					tempintrst234Ciii= Math.floor(parseInt(tempintrst234Ciii,10)/100)*parseInt('100' ,10);
				}
				intrst234Ciii=parseInt(tempintrst234Ciii,10)* parseFloat('0.01') * parseInt('3' ,10) ;

			}
		
		if(eval(parseInt(slab1 ,10) + parseInt(slab2 ,10) + parseInt(slab3 ,10) + parseInt(slab4 ,10)) < eval((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseInt('1' ,10))){
			var tempintrst234Civ = (((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('1') ) - parseInt(slab1 ,10)- parseInt(slab2 ,10) - parseInt(slab3 ,10) - parseInt(slab4 ,10));
			if(parseInt(tempintrst234Civ,10) > 100){
				tempintrst234Civ= Math.floor(parseInt(tempintrst234Civ,10)/100)*parseInt('100' ,10);
			}
			intrst234Civ=parseInt(tempintrst234Civ,10)* parseFloat('0.01') * parseInt('1' ,10) ;
		}	
	}
	else {
		 intrst234Ci = parseInt('0',10);
		 intrst234Cii = parseInt('0',10);
		 intrst234Ciii = parseInt('0',10);
		 intrst234Civ = parseInt('0',10);
	}
	
	intrst234C = eval(parseInt(intrst234Ci ,10) + parseInt(intrst234Cii ,10) + parseInt(intrst234Ciii ,10)+ parseInt(intrst234Civ ,10));
	
	var age = calcAge();
	var residentialStatus  = document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;
	
	alert("presInc44AD:"+document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value);
	
	var presInc44AD = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0]; 
	presInc44AD.value = coalesce(parseInt(presInc44AD.value,10));
 
	// ===============Interest234B calculation=======================


	var intrst234Bprinciple;
	var intrst234Bi=parseInt('0',10);
	var earliestSelfAsspaidDate=parseInt('0',10);
	var noOfMonthsTillSelfasst= parseInt('0',10);
	var presumpInc44AD = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0];
	
	if(parseInt(balTaxPayable.value,10) - parseInt(TDS,10)- parseInt(TCS,10) >= parseInt('10000' ,10)) {
		if(parseInt(advanceTax,10) < ((parseInt(balTaxPayable.value,10) - parseInt(TDS,10) - parseInt(TCS,10)) * parseFloat('0.90'))) {

			intrst234Bprinciple = (parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10)- parseInt(TCS,10) );
			// Rounding off to previous hundered
			if(parseInt(intrst234Bprinciple,10) > 100){
				intrst234Bprinciple= Math.floor(parseInt(intrst234Bprinciple,10)/100)*parseInt('100' ,10);
			}

			//======== Interest 234B first part calc==========
			if( parseInt(intrst234Bprinciple,10) > 0 ){
				var selfAsspaidDates=new Array();
				var selfAsspaidAmts=new Array();
				var x=parseInt('0',10);
				var tempDate=parseInt('0',10);
				var tempAmt=parseInt('0',10);

				var tab234B = document.getElementById('taxDedSelf');
				var allInputTags234B = tab234B.getElementsByTagName('input');

				// to get all self assesment tax values
				for(var p = 0; p < allInputTags.length; p++) {
					if(allInputTags[p].name.match("dateDep$")){
						if( checkFirstDateBefore(AY_start_date , allInputTags[p].value) && checkFirstDateBefore(allInputTags[p].value, currentDate) ){
							if(allInputTags[p+2].value!=0){
								
							selfAsspaidDates[x]=allInputTags[p].value;
							selfAsspaidAmts[x]=allInputTags[p+2].value;
							x++;
							
							}

						}
					}
				}

				// to sort all self assesment tax values according to date
				var selfAsspaidDatesSorted=new Array();
				var selfAsspaidAmtsSorted=new Array();

				if(selfAsspaidDates.length > 1){
					for(var q = 0; q < selfAsspaidDates.length-1; q++) {
						for(var r = q+1; r < selfAsspaidDates.length; r++) {
							if(checkFirstDateBefore(selfAsspaidDates[q], selfAsspaidDates[r])){


							}else{
								tempDate=selfAsspaidDates[q];
								tempAmt=selfAsspaidAmts[q];

								selfAsspaidDates[q]=selfAsspaidDates[r];
								selfAsspaidAmts[q]=selfAsspaidAmts[r];

								selfAsspaidDates[r]=tempDate;
								selfAsspaidAmts[r]=tempAmt;
							}
						}
					}
					var arrLen = selfAsspaidDates.length;
					var lastMonth = 0;
					var lastIndex = -1;
					for(var q = 0; q < arrLen; q++) {
						if(parseInt(selfAsspaidDates[q].substr(3,2), 10) == lastMonth){
							selfAsspaidAmts[lastIndex] = parseInt(selfAsspaidAmts[lastIndex], 10) + parseInt(selfAsspaidAmts[q], 10);
						}else{
							lastMonth = parseInt(selfAsspaidDates[q].substr(3,2), 10);
							selfAsspaidAmts[++lastIndex] = selfAsspaidAmts[q];
							selfAsspaidDates[lastIndex] = selfAsspaidDates[q];
						}
					}
					selfAsspaidAmts.length = ++lastIndex;
					selfAsspaidDates.length = lastIndex;
				}

				if(selfAsspaidDates.length==0){
					noOfMonthsTillSelfasst=calcNoOfMonths(currentDate,AY_start_date);
				}
				else{
					noOfMonthsTillSelfasst=calcNoOfMonths(selfAsspaidDates[0],AY_start_date);
				}

				intrst234Bi= parseInt(intrst234Bprinciple,10) * parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst) ;
				
				//======== Interest 234B second part calc==========
				var intrst234Bprinciple2=parseInt('0',10);
				var selfAsspart=parseInt('0',10);
				var noOfMonthsTillSelfasst2;
				var intrst234Bii=parseInt('0',10);
				var partialSelfAssPaid=parseInt('0',10);
				var k=parseInt('0',10);
				var interestFrom;
				var interestTill;

				if(selfAsspaidDates.length!=0){

					for(var i = 0; i < selfAsspaidDates.length; i++) {

						partialSelfAssPaid= eval(parseInt(partialSelfAssPaid ,10) + parseInt(selfAsspaidAmts[i] ,10));

						intrst234Bprinciple2=zeroOrMore(eval(parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10)- parseInt(TCS,10) +
								parseInt(intrst234A ,10)+parseInt(intrst234C ,10)+parseInt(intrst234Bi ,10)+parseInt(intrst234Bii ,10)-parseInt(partialSelfAssPaid,10)));

						if(parseInt(intrst234Bprinciple2,10) > parseInt('100' ,10)){
							intrst234Bprinciple2= Math.floor(parseInt(intrst234Bprinciple2,10)/100)*parseInt('100' ,10);
						}else if(parseInt(intrst234Bprinciple2,10) < 0){
							intrst234Bprinciple2 = parseInt('0',10);
						}

						interestTill=currentDate;
						interestFrom=selfAsspaidDates[i];

						if(i != eval(selfAsspaidDates.length-parseInt('1' ,10))){
							for(k=i;k < eval(selfAsspaidDates.length-parseInt('1' ,10)); k++){
								if(selfAsspaidDates[k]!=selfAsspaidDates[k+1]){
									interestTill=selfAsspaidDates[k+1];
									interestFrom=selfAsspaidDates[k];
									k=selfAsspaidDates.length;
								}
							}
						}
						
						noOfMonthsTillSelfasst2=calcNoOfMonths(interestTill,interestFrom) - parseInt('1' ,10) ;
						
						if(parseInt(intrst234Bprinciple2,10) < parseInt(intrst234Bprinciple,10)){
								intrst234Bii= eval(parseInt(intrst234Bii,10) + (parseInt(intrst234Bprinciple2,10) * parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst2))) ;
						}
						else{
								intrst234Bii= eval(parseInt(intrst234Bii,10) + (parseInt(intrst234Bprinciple,10) * parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst2))) ;
						}
					}
				}

				intrst234B=eval(parseInt(intrst234Bi,10) +parseInt(intrst234Bii,10));
			}else{
				intrst234B=eval(parseInt('0',10));
			}
		}
	}else {
		intrst234B = parseInt('0' ,10);
	}
	var intrstPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalIntrstPay')[0]; intrstPayable.value = coalesce(intrstPayable.value);


	var input234A = document.getElementsByName('itr4S.itr4sTaxComputationOnline.intrstPay.intrstPayUs234A')[0]; input234A.value = parseInt(intrst234A ,10);
	var input234B = document.getElementsByName('itr4S.itr4sTaxComputationOnline.intrstPay.intrstPayUs234B')[0]; input234B.value = parseInt(intrst234B ,10);
	var input234C = document.getElementsByName('itr4S.itr4sTaxComputationOnline.intrstPay.intrstPayUs234C')[0]; input234C.value = parseInt(intrst234C ,10);

	intrstPayable.value = Math.round(eval(parseInt(intrst234A ,10) + parseInt(intrst234B ,10) + parseInt(intrst234C ,10)));

	var balTaxPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.netTaxLiability')[0]; balTaxPay.value = coalesce(balTaxPay.value);
	var totIntrstPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalIntrstPay')[0]; totIntrstPay.value = coalesce(totIntrstPay.value);
	var totTaxIntrstPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totTaxPlusIntrstPay')[0]; totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);

	totTaxIntrstPay.value = eval(balTaxPay.value) + eval(totIntrstPay.value);

	calcTotTaxPaid();

	}catch(e){
		alert('Exception in calcInterestPayable() = ' + e.stack);
	}
}

//To calculate sum of 234A, 234B and 234C

function sum234A234B234C(){

	var intrstPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalIntrstPay')[0]; intrstPayable.value = coalesce(intrstPayable.value);
	var input234A = document.getElementsByName('itr4S.itr4sTaxComputationOnline.intrstPay.intrstPayUs234A')[0]; input234A.value = coalesce(input234A.value);
	var input234B = document.getElementsByName('itr4S.itr4sTaxComputationOnline.intrstPay.intrstPayUs234B')[0]; input234B.value = coalesce(input234B.value);
	var input234C = document.getElementsByName('itr4S.itr4sTaxComputationOnline.intrstPay.intrstPayUs234C')[0]; input234C.value = coalesce(input234C.value);

	intrstPayable.value =eval(Math.round(eval(input234A.value) + eval(input234B.value)+ eval(input234C.value)));
	calcIntrstPayable();
}

//To calculate the amount of total tax paid

function calcTotTaxPaid(){

	var advanceTaxToDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
	var TDSToDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
	var SATtoDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);
	var TCStoDisplay = document.getElementsByName('itr4S.taxPaid.taxesPaid.tcs')[0];  TCStoDisplay.value = coalesce(TCStoDisplay.value);

	var totTaxPaid = document.getElementsByName('itr4S.taxPaid.taxesPaid.totalTaxesPaid')[0];  totTaxPaid.value = coalesce(totTaxPaid.value);

	totTaxPaid.value = eval(parseInt(advanceTaxToDisplay.value ,10) + parseInt(TDSToDisplay.value,10) + parseInt(SATtoDisplay.value ,10)+ parseInt(TCStoDisplay.value ,10)) ;

	calcTaxPayable15Minus17();
}

//To calculate tax payable 

function calcTaxPayable15Minus17(){

	var taxStatus= document.getElementsByName('itr4S.filingStatus.taxStatus')[0];

	var totTaxPaid = document.getElementsByName('itr4S.taxPaid.taxesPaid.totalTaxesPaid')[0];  totTaxPaid.value = coalesce(totTaxPaid.value);
	var totTaxIntrstPay = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totTaxPlusIntrstPay')[0]; totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);


	if(eval(totTaxPaid.value) <= eval(totTaxIntrstPay.value)) {
		var taxPayable15M17 = document.getElementsByName('itr4S.taxPaid.balTaxPayable')[0]; taxPayable15M17.value = coalesce(taxPayable15M17.value);
		var refund15M17 = document.getElementsByName('itr4S.refund.refundDue')[0]; refund15M17.value = coalesce(refund15M17.value);
		refund15M17.value = eval('0');
		taxPayable15M17.value = eval(totTaxIntrstPay.value) - eval(totTaxPaid.value);
		
		taxPayable15M17.value= eval(Math.round(eval(taxPayable15M17.value)/10)*parseInt('10' ,10));
		
	}
	else{
		var taxPayable15M17 = document.getElementsByName('itr4S.taxPaid.balTaxPayable')[0]; taxPayable15M17.value = coalesce(taxPayable15M17.value);
		var refund15M17 = document.getElementsByName('itr4S.refund.refundDue')[0]; refund15M17.value = coalesce(refund15M17.value);
		refund15M17.value = eval(totTaxPaid.value) -  eval(totTaxIntrstPay.value);
		
		taxPayable15M17.value = eval('0');

		
		refund15M17.value= eval(Math.round(eval(refund15M17.value)/10)*parseInt('10' ,10));
		
		taxStatus.value='TR';
	}
	
	var balTaxPayable = document.getElementsByName('itr4S.taxPaid.balTaxPayable')[0];  balTaxPayable.value = coalesce(balTaxPayable.value);
	var refundDue = document.getElementsByName('itr4S.refund.refundDue')[0]; refundDue.value = coalesce(refundDue.value);

	if(eval(balTaxPayable.value) > parseInt(0)) {
		taxStatus.value='TP';
	}else if(eval(refundDue.value) > parseInt(0)) {
		taxStatus.value='TR';
	}else {
		taxStatus.value='NT';
	}
}

//To calculate age with the Date of Birth

function calcAge(){
	var dob = document.getElementsByName('itr4S.personalInfo.dob')[0];
	var retVal = calcAgeCommon(dob);
	return retVal;
}

//To enable and disable fields based on the section of return filed 

function returnFile_UnderSec(type){
	var val=document.getElementsByName('itr4S.filingStatus.returnFileSec')[0].value;
	if(type != 'onload' && val == '20'){
		addErrorXHTML('','Return u/s 119(2)(b) for AY 2017-18 can be filed only after 31st March 2018.');
	}
	if(val=='18')
	{
		document.getElementsByName('itr4S.filingStatus.returnType')[0].value='O';
		
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].disabled=false;
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].readOnly=false;
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].disabled=false;
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].readOnly=false;
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].disabled=false;
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].readOnly=false;
		 
		document.getElementsByName('itr4S.filingStatus.receiptNo')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.receiptNo')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.receiptNo')[0].value='';
		document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].value='';
		document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].disabled=false;
		document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].readOnly=false;
		
			
		$(function(){
			$("#PersistITR_itr4S_filingStatus_noticeDate").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
		});
		
		$(function(){
			$("#PersistITR_itr4S_filingStatus_noticeDateUnderSec").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
		});
		
		$(function(){
			$("#PersistITR_itr4S_filingStatus_origRetFiledDate").datepicker("destroy");
		});
		
		
	}else if(val=='17') {
		document.getElementsByName('itr4S.filingStatus.returnType')[0].value='R';
		 
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].value = '';
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].value = '';
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].value = '';
		document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].value='';
		
		$(function(){
			$("#PersistITR_itr4S_filingStatus_origRetFiledDate").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
		});
		
		$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDate").datepicker("destroy");
		});
		
		returnType_change();
	} else{
	
		if(val == '13'||val=='14'||val=='15'||val=='16'){
			document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].disabled=false;
			document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].readOnly=false;
			$(function(){
			$("#PersistITR_itr4S_filingStatus_noticeDateUnderSec").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
		});
			
		} else {
			document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].disabled=true;
			document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].readOnly=true;
			document.getElementsByName('itr4S.filingStatus.noticeDateUnderSec')[0].value='';
				$(function(){
			$("#PersistITR_itr4S_filingStatus_noticeDateUnderSec").datepicker("destroy");
		});
		
		}
		
		
		document.getElementsByName('itr4S.filingStatus.returnType')[0].value='O';
		
		document.getElementsByName('itr4S.filingStatus.receiptNo')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.receiptNo')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.receiptNo')[0].value='';
		document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].value='';
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.ackNoOriginalReturn')[0].value = '';
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.noticeNo')[0].value = '';
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.noticeDate')[0].value = '';
	
				
		$(function(){
			$("#PersistITR_itr4S_filingStatus_noticeDate").datepicker("destroy");
		});

		$(function(){
			$("#PersistITR_itr4S_filingStatus_origRetFiledDate").datepicker("destroy");
		});		
	}
	if(document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value==''||
		document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value=='N'){
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].disabled=true;
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].readOnly=true;
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].value = '';
		}
	var status = document.getElementsByName('itr4S.personalInfo.status')[0];
	if(status.value=='H'||status.value=='S' || status.value=='F'){
	document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].disabled = true;
	if(status.value == 'F'){
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].disabled=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].readOnly=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].value='';
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].disabled=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].readOnly=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].value='';
		document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0].disabled=true;
		document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0].readOnly=true;
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].disabled=true;
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].readOnly=true;
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].value='';
		
		/*document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].readOnly=false;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].value='';*/
		
		
		disableE3Under44ADLoad();
		disableTDS1();
		//disableAL();
		//autoPopulateAL();
	}
	}
}

//To enable and disable fields based on the return type 

function returnType_change(){

	var val=document.getElementsByName('itr4S.filingStatus.returnType')[0].value;
	var sec=document.getElementsByName('itr4S.filingStatus.returnFileSec')[0].value;


	if(val=='O'){
		if(sec == '17'){
			addErrorXHTML('','Return type in Income Details cannot be original if return filed under section 139(5)');
			document.getElementsByName('itr4S.filingStatus.returnType')[0].value='R';
			document.getElementsByName('itr4S.filingStatus.receiptNo')[0].disabled=false;
			document.getElementsByName('itr4S.filingStatus.receiptNo')[0].readOnly=false;
			document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].disabled=false;
			document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].readOnly=false;
		}
		else{
			document.getElementsByName('itr4S.filingStatus.receiptNo')[0].disabled=true;
			document.getElementsByName('itr4S.filingStatus.receiptNo')[0].readOnly=true;
			document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].disabled=true;
			document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].readOnly=true;
			document.getElementsByName('itr4S.filingStatus.receiptNo')[0].value='';
			document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].value='';
		}
	}
	else if(val=='R'){
		
			document.getElementsByName('itr4S.filingStatus.returnFileSec')[0].value='17'
		
		
			document.getElementsByName('itr4S.filingStatus.receiptNo')[0].disabled=false;
			document.getElementsByName('itr4S.filingStatus.receiptNo')[0].readOnly=false;
			document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].disabled=false;			
			document.getElementsByName('itr4S.filingStatus.origRetFiledDate')[0].readOnly=false;			
		
	}
}

//To delete row for table 44AE NOB BP 

function deleteRowTablePage4(tableId , noOfHeader, noOfFooter){
	deleteRowTable(tableId , noOfHeader, noOfFooter);
	calc44aeNobBp(tableId);
}

//To delete row for table  

function deleteRowPage6(tableId , noOfHeader, noOfFooter){

	deleteRowTable(tableId , noOfHeader, noOfFooter);
	calcInterestPayable();
}

//To calculate VirtualTax Payable On Total Income

function calcVirtualTaxPayableOnTI(){
 try{
 var totInc = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0];
 var taxPayable = document.getElementsByName('itr4S.itr4sTaxComputationOnline.totalTaxPayable')[0];
 var presInc44AD = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0]; presInc44AD.value = coalesce(parseInt(presInc44AD.value,10));
 var salInt = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0]; salInt.value = coalesce(parseInt(salInt.value,10));
 var totPersumInc44AE = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.totPersumInc44AE')[0]; totPersumInc44AE.value = coalesce(parseInt(totPersumInc44AE.value,10));
 var presInc44ADA = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0]; presInc44ADA.value = coalesce(parseInt(presInc44ADA.value,10));

 var age = calcAge();
 var gender = document.getElementsByName('itr4S.personalInfo.gender')[0].value;

 var resStatus=document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;

	var virtualTotInc=parseInt('0',10);;
	
	if(resStatus=='RES' || resStatus=='NOR'){
		
		virtualTotInc = eval(parseInt(totInc.value,10) - parseInt( presInc44AD.value ,10) - parseInt( presInc44ADA.value ,10));
	}else{
		virtualTotInc = parseInt(totInc.value,10);
	}
	
	
  var virtualTaxPayable;
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
	if((status=='I' || status=='i') && (resStatus == 'RES' || resStatus=='NOR') && ( eval(age)> eval(59) ) &&  (eval(age) <= eval(79))){
		if ( eval(virtualTotInc) <= eval('300000')){
			virtualTaxPayable = '0';
		} else {
			if((eval(virtualTotInc) >= eval('300001')) && (eval(virtualTotInc) <= eval('500000'))){
				var temp = (eval(virtualTotInc) - eval ('300000')) * eval('0.10');
				virtualTaxPayable = Math.round(eval(temp));
			} else if((eval(virtualTotInc) >= eval('500001')) && (eval(virtualTotInc) <= eval('1000000'))) {
				var temp = (eval(virtualTotInc) - eval ('500000')) * eval('0.20');
				virtualTaxPayable = Math.round(eval(temp) + eval('20000'));
			} else if(eval(virtualTotInc) >= eval('1000001')) {
				var temp = (eval(virtualTotInc) - eval ('1000000')) * eval('0.30');
				virtualTaxPayable = Math.round(eval(temp) + eval('120000'));
			}
		}
	} else if((status=='I' || status=='i') && (resStatus == 'RES' || resStatus=='NOR') &&  ( eval(age)> eval(79))){
		if ( eval(virtualTotInc) <= eval('500000')){
			virtualTaxPayable = '0';
		} else {
			if((eval(virtualTotInc) >= eval('500001')) && (eval(virtualTotInc) <= eval('1000000'))){
				var temp = (eval(virtualTotInc) - eval ('500000')) * eval('0.20');
				virtualTaxPayable = Math.round(eval(temp));
			}
			else if(eval(virtualTotInc) >= eval('1000001')) {
				var temp = (eval(virtualTotInc) - eval ('1000000')) * eval('0.30');
				virtualTaxPayable = Math.round(eval(temp) + eval('100000'));
			}
		}
	}
	
	else{
		if((status=='F' || status=='f') && (resStatus == 'RES' || resStatus=='NRI')){
			var temp = (eval(virtualTotInc)) * eval('0.30');
			virtualTaxPayable = Math.round(eval(temp));
		}
		else
		
		if ( eval(virtualTotInc) <= eval('250000')){
			virtualTaxPayable = '0';
		} else {
			if((eval(virtualTotInc) >= eval('250001')) && (eval(virtualTotInc) <= eval('500000'))){
				var temp = (eval(virtualTotInc) - eval ('250000')) * eval('0.10');
				virtualTaxPayable = Math.round(eval(temp));  
			} else if((eval(virtualTotInc) >= eval('500001')) && (eval(virtualTotInc) <= eval('1000000'))) {
				var temp = (eval(virtualTotInc) - eval ('500000')) * eval('0.20');
				virtualTaxPayable = Math.round(eval(temp) + eval('25000')); 
			} else if(eval(virtualTotInc) >= eval('1000001')) {
				var temp = (eval(virtualTotInc) - eval ('1000000')) * eval('0.30');
				virtualTaxPayable = Math.round(eval(temp) + eval('125000'));
			}
		}
		
	}
	var rebate87A = document.getElementsByName('itr4S.itr1TaxComputationOnline.rebate87A')[0].value;
        var surcharge = document.getElementsByName('itr4S.itr1TaxComputationOnline.surchargeOnAboveCrore')[0].value;
		var surChargeFor44AD = eval(parseInt((surcharge * virtualTotInc)/parseInt(totInc.value,10),10));
	var virtualEduCess= Math.round(eval((virtualTaxPayable)-(rebate87A) + surChargeFor44AD )* eval('0.03'));
	
	var virtualTotalTaxWithEduCess = eval(virtualTaxPayable) + surChargeFor44AD + eval(virtualEduCess)-rebate87A;
	
	var sec89 = document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0]; sec89.value = coalesce(sec89.value);
	
	var virtualBalTaxPayable = Math.round(eval(parseInt(virtualTotalTaxWithEduCess ,10)-parseInt(sec89.value ,10)));

	
	if(virtualBalTaxPayable < eval('0')) {
		virtualBalTaxPayable = '0';
	}

	
	return virtualBalTaxPayable;
	}catch(e){
		alert('Exception in calcVirtualTaxPayableOnTI () = ' + e.stack);
	}
 }

//To change the status based on the gender

function onGenderChange(){
	
	var gender = document.getElementsByName('itr4S.personalInfo.gender')[0];
	var status = document.getElementsByName('itr4S.personalInfo.status')[0];
	if(gender.value == 'S' ||gender.value == 'M' ||gender.value == 'F'){
		status.options[1].selected = true;
		document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].disabled = false;
	}else if(gender.value == 'X'){
		status.options[0].selected = true;
		document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].disabled = true;
    	document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value='';
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].disabled = true;
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].value='';
	}
	onStatusChange();
	disableE3Under44AD();
	calc44aeNobBp('us44aeHeavyVehcl');
	
}

//To change the Portugese status based on the status on Prefill

function onStatusChangePrefill(){
	
	var status = document.getElementsByName('itr4S.personalInfo.status')[0];
	if(status.value == 'I'){
		document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].disabled = false;
	} else{
		document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].disabled = true;
    	document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value='';
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].disabled = true;
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].value='';
	}
	
}

//To change the gender based on the status

function onStatusChange(){
	
	var table1 = document.getElementById('taxDedSourceSrc');
	var table2 = document.getElementById('tcsTableId');
	var noOfRows1 = table1.rows.length;
	var noOfRows2 = table2.rows.length;
	var gender = document.getElementsByName('itr4S.personalInfo.gender')[0];
	var status = document.getElementsByName('itr4S.personalInfo.status')[0];
	if(status.value == 'I' ){
		document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].disabled = false;
		
		for ( var i = 0; i < eval(parseInt(noOfRows1, 10) - 3); i++) {
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=false;
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		}
		for ( var i = 0; i < eval(parseInt(noOfRows2, 10) - 3); i++) {
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		}

	if(!(gender.value == 'M' || gender.value == 'F')){
		gender.options[0].selected = true;
		}
	}else if(status.value == 'H' || status.value == 'F'){
		gender.options[3].selected = true;
		document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].disabled = true;
    	document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value='';
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].disabled = true;
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].value='';
		for ( var i = 0; i < eval(parseInt(noOfRows1, 10) - 3); i++) {
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=true;
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=true;
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].value='';
		}
		for ( var i = 0; i < eval(parseInt(noOfRows2, 10) - 3); i++) {
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=true;
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=true;
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].value='';
		}
	}
	if(status.value == 'F'){
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].disabled=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].readOnly=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].value='';
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].disabled=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].readOnly=true;
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].value='';
		document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0].disabled=true;
		document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0].readOnly=true;
		document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0].value='';
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].disabled=true;
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].readOnly=true;
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].value='';
		
		
		
		disableE3Under44ADLoad();
    	disableTDS1();
    	//disableAL();
    	//autoPopulateAL();
	}
	else{
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].disabled=false;
		document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].readOnly=false;
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].disabled=false;
		document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].readOnly=false;
		document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0].disabled=false;
		document.getElementsByName('itr4S.itr4sTaxComputationOnline.section89')[0].readOnly=false;
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].disabled=false;
		document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].readOnly=false;
		disableE3Under44ADLoad();
		disableTDS1();
		//disableAL();
		//autoPopulateAL();
		
	}
}

//To populate default Pincode and Country based on state

function onStateChng(){
	try{
		var state = document.getElementsByName('itr4S.personalInfo.address.stateCode')[0];
		var country = document.getElementsByName('itr4S.personalInfo.address.country')[0];
		var pinCode = document.getElementsByName('itr4S.personalInfo.address.pinCode')[0];
		
		if(state.value != '99' && state.value != '-1'){
			country.value='91';
			pinCode.value='';
			$('.country').selectmenu('refresh', true);
		}else if(state.value == '99'){
			pinCode.value='999999';
		}
	}catch(e){
		alert('Exception in onStateChng () = ' + e.stack);
	}	
}

function onStateChngAL(){
	
	var listOfTr = document.getElementById('scheduleAL').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);
	
	
	for (var i = 0; i < noOfRows; i++) {
	var state = document.getElementsByName('itr4S.scheduleAL.immovableDtls['+ i +'].addressAL.stateCode')[0];
	var country = document.getElementsByName('itr4S.scheduleAL.immovableDtls['+ i +'].addressAL.country')[0];
	var pinCode = document.getElementsByName('itr4S.scheduleAL.immovableDtls['+ i +'].addressAL.pinCode')[0];
	
	if(state.value != '99' && state.value != '' )
	{		
		if(country.value!='91'){
				country.value='91';
				pinCode.value='';	
			}			
	}
	else if(state.value == '99')
	{
	
		if (pinCode.value != null || pinCode.value != '' ) 
		{
		
			pinCode.value='999999';
			country.value='';
		}
	}
}
}

function onCountryChngAL(){

var listOfTr = document.getElementById('scheduleAL').getElementsByTagName('tr');
var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);


for (var i = 0; i < noOfRows; i++) {
var state = document.getElementsByName('itr4S.scheduleAL.immovableDtls['+ i +'].addressAL.stateCode')[0];
var country = document.getElementsByName('itr4S.scheduleAL.immovableDtls['+ i +'].addressAL.country')[0];
var pinCode = document.getElementsByName('itr4S.scheduleAL.immovableDtls['+ i +'].addressAL.pinCode')[0];

try{
	if(country.value=='91' && state.value == "99"){
		
		state.value = "";
		pincode.value = '';
			
		
	} else if(country.value!='' && country.value !="91"){
		state.value = "99";
		// pincode.value = '999999';
	
		
	}
	
		}catch (e) {
	}
}

}
function onStateChngAOP(){
	
	var listOfTr = document.getElementById('AOPAsset').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);
	
	for (var i = 0; i < noOfRows; i++) {
	
	
	var state = document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+ i +'].addressAL.stateCode')[0];
	var country = document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+ i +'].addressAL.country')[0];
	var pinCode = document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+ i +'].addressAL.pinCode')[0];
	
	if(state.value != '99' && state.value != '' )
	{		
		if(country.value!='91'){
				country.value='91';
				pinCode.value='';	
			}			
	}
	else if(state.value == '99')
	{
	
		if (pinCode.value != null || pinCode.value != '' ) 
		{
		
			pinCode.value='999999';
			country.value='';
		}
	}
}
}


function onCountryChngAOP(){

var listOfTr = document.getElementById('AOPAsset').getElementsByTagName('tr');
var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);

for (var i = 0; i < noOfRows; i++) {


var state = document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+ i +'].addressAL.stateCode')[0];
var country = document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+ i +'].addressAL.country')[0];
var pinCode = document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+ i +'].addressAL.pinCode')[0];

try{
	if(country.value=='91' && state.value == "99"){
		
		state.value = "";
		pincode.value = '';
			
		
	} else if(country.value!='' && country.value !="91"){
		state.value = "99";
		pincode.value = '999999';
	
		
	}
	
		}catch (e) {
	}
}
}


//To enable or disabled fields based on the selection of portugeseCC5A

function onChngPCC5A(){
	var typeHP = document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value;
	if(typeHP=='Y'){
		addErrorXHTML('','You have selected to be governed by Sec 5A. Please enter only your share of  Income from '+
		'House Property and Income from Other Sources.Refer to instructions (A22) for further clarification');
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].disabled=false;
		document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].readOnly=false;
	} else {
	
	document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].disabled=true;
	document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].readOnly=true;
	document.getElementsByName('itr4S.filingStatus.panOfSpouse')[0].value='';
		
	}
}

//To check nature of business

function checkNob(){
	
	var turnOverE1a=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].value;
	var turnOverE1b=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].value;
	var turnOverE2a = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value;
	var turnOverE2b = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value;
	
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value=eval(
			coalesceSetRet('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')+
			coalesceSetRet('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per'));
		
		
	
	var turnOver6=eval(parseInt(coalesce(turnOverE1a)) * .06);
	var turnOver8=eval(parseInt(coalesce(turnOverE1b)) * .08);
	
	var presumInc = eval(parseInt(presumInc,10) + parseInt(coalesce(turnOverE2a),10)+ parseInt(coalesce(turnOverE2b),10));
	
	if((parseInt(turnOverE1a,10)+parseInt(turnOverE1b,10))>20000000){
		
		addErrorXHTML('' ,'If Gross Receipts entered at [E1(a)+E1(b)] is greater than 2 crores.it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3 or 5 form.');	
		j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank','If Gross Receipts entered at [E1(a)+E1(b)] is greater than 2 crores.it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3 or 5 form.');
		
	}
	
	if(turnOverE2a < turnOver6){
	
		addErrorXHTML('' ,'If the income is less than 6% of E1(a), it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3/5 form');	
		j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per','If the income is less than 6% of E1(a), it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3/5 form');
		
	}
	
	if(turnOverE2b < turnOver8){
		
		addErrorXHTML('' ,' If the income is less than 8% of E1(b), it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3/5 form');	
		j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per',' If the income is less than 8% of E1(b), it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3/5 form');
	}
	
}

function checkE4E3()
{var turnOverE3=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value;
var totPersumptiveInc44ADA=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value;
var turnOver50=eval(parseInt(coalesce(turnOverE3)) * .5);

if(totPersumptiveInc44ADA < turnOver50){
	
	addErrorXHTML('' ,'If the income is less than 50% of Gross Receipts, it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3 or ITR 5 form');	
	j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA','If the income is less than 50% of Gross Receipts, it is mandatory to have a tax audit under 44AB. Please use the regular ITR 3 or ITR 5 form');
	
}
}

//To calculate Income vehicle from 44AE

function calc44AEIncmVehicle(tableId){

		var listOfTr = document.getElementById(tableId).getElementsByTagName('tr');
		var noOfRows = eval(parseInt(listOfTr.length,10)-2);
		
		try {
		for(var i=1; i< noOfRows; i++){
			var listOfInputTags = listOfTr[i].getElementsByTagName('input');
			
			var incmPerVehicle;
			
			for(var k=0; k<listOfInputTags.length ; k++){

				if(listOfInputTags[k].name.match(".incomePerVehicle$")){
					incmPerVehicle = listOfInputTags[k];
					
				}
				
			}

			if((parseInt(coalesce(incmPerVehicle.value),10) < 7500) && (parseInt(coalesce(incmPerVehicle.value),10)> 0)){
				
				addErrorXHTML('','Income Per vehicle in 44AE cannot be less than 7500');	
				j.setFieldError('itr4S.us44aeHeavy['+(i-1)+'].incomePerVehicle','Income Per vehicle in 44AE cannot be less than 7500');
		
		}
		}
		}catch(e){
			alert('Exception in calc44AEIncmVehicle () = ' +e.stack);
		}
		
		
		}
		
//Check whether the status and the PAN matches

function panStatusCheck(){

var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
var pan = document.getElementsByName('itr4S.personalInfo.pan')[0].value;

if((pan.substring(3,4)=='P' || pan.substring(3,4)=='p') && (status == 'I')){
		document.getElementsByName('itr4S.verification.declaration.assesseeVerPAN')[0].value=document.getElementsByName('itr4S.personalInfo.pan')[0].value.toUpperCase();
		} else {
	document.getElementsByName('itr4S.verification.declaration.assesseeVerPAN')[0].value="";
		}

if((pan.substring(3,4)=='P' || pan.substring(3,4)=='p') && (status == 'H' || status == 'F')){
		addErrorXHTML('' ,'Since PAN entered is Individual PAN, Select Status in A16 as Individual');	
		j.setFieldError('itr4S.personalInfo.pan','Since PAN entered is Individual PAN, Select Status in A16 as Individual');
		} else if((pan.substring(3,4)=='H' || pan.substring(3,4)=='h') && (status == 'I' || status == 'F')){
	addErrorXHTML('' ,'Since PAN entered is HUF PAN, Select Status in A16 as HUF');	
	j.setFieldError('itr4S.personalInfo.pan','Since PAN entered is HUF PAN, Select Status in A16 as HUF');
	}
	else if((pan.substring(3,4)=='F' || pan.substring(3,4)=='f') && (status == 'I' || status == 'H')){
			addErrorXHTML('' ,'Since PAN entered is Firm PAN, Select Status in A16 as Firm');	
			j.setFieldError('itr4S.personalInfo.pan','Since PAN entered is Firm PAN, Select Status in A16 as Firm');
	}
}

//Check whether the status and the PAN and verification PAN matches 

function panStatusCheckSubmit(){

var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
var pan = document.getElementsByName('itr4S.personalInfo.pan')[0].value;
var Verpan = document.getElementsByName('itr4S.verification.declaration.assesseeVerPAN')[0].value;

if((pan.substring(3,4)=='P' || pan.substring(3,4)=='p') && (status == 'I') && Verpan == null && Verpan == undefined  && Verpan ==''){
		document.getElementsByName('itr4S.verification.declaration.assesseeVerPAN')[0].value=document.getElementsByName('itr4S.personalInfo.pan')[0].value.toUpperCase();
		} else if((pan.substring(3,4)=='H' || pan.substring(3,4)=='h') && (status == 'H') && Verpan == null && Verpan == undefined  && Verpan ==''){
		document.getElementsByName('itr4S.verification.declaration.assesseeVerPAN')[0].value="";
		}

if((pan.substring(3,4)=='P' || pan.substring(3,4)=='p') && (status == 'H' || status == 'F')){
	addErrorXHTML('' ,'Since PAN entered is Individual PAN, Select Status in A16 as Individual');	
	j.setFieldError('itr4S.personalInfo.pan','Since PAN entered is Individual PAN, Select Status in A16 as Individual');
	} else if((pan.substring(3,4)=='H' || pan.substring(3,4)=='h') && (status == 'I' || status == 'F')){
addErrorXHTML('' ,'Since PAN entered is HUF PAN, Select Status in A16 as HUF');	
j.setFieldError('itr4S.personalInfo.pan','Since PAN entered is HUF PAN, Select Status in A16 as HUF');
}
else if((pan.substring(3,4)=='F' || pan.substring(3,4)=='f') && (status == 'I' || status == 'H')){
		addErrorXHTML('' ,'Since PAN entered is Firm PAN, Select Status in A16 as Firm');	
		j.setFieldError('itr4S.personalInfo.pan','Since PAN entered is Firm PAN, Select Status in A16 as Firm');
}


}

//Populate name on Verification tab

function populateVerName(){
	
	var fName=document.getElementsByName('itr4S.personalInfo.assesseeName.firstName')[0].value;
	var mName=document.getElementsByName('itr4S.personalInfo.assesseeName.middleName')[0].value;
	var lName=document.getElementsByName('itr4S.personalInfo.assesseeName.surNameOrOrgName')[0].value;
	
	var verName;
	
	if(fName !='' && mName!='' ){
	verName=fName+ ' '+ mName +' '+lName ;
	}
	
	else if(fName =='' && mName!='' ){
		verName= mName +' '+lName ;
		}
	
	else if(fName !='' && mName =='' ){
		verName=fName+ ' '+lName ;
		}
	else{
		verName=lName;
	}
	document.getElementsByName('itr4S.verification.declaration.assesseeVerName')[0].value=verName;
	
}

//Check validations on Submit

function validateOnSubmit(){

	
	//E2Sum();
checkNob();
checkE4E3();
calc44AEIncmVehicle('us44aeHeavyVehcl');
panStatusCheckSubmit();
residentialStatusCheck();
gtiWarningMessage();
//presumtive8PerCheck();
presumtiveE1aE2aPerCheck();
presumtiveE4E3PerCheck();
TDS2Check();
calcTCSAmtTaxCheck();
NOBBPBussn();
checkEmptyAmtSpouse('taxDedSourceSrc');
checkEmptyAmtSpouse('tcsTableId');
//check44ADAESum();

calc44AD();

//onStatusChange();
validateTDS();
ifscCodeUpperCase();
displaywarnings();
panValidation80G('ded100PerWithoutQual');
panValidation80G('ded50WithoutQual');
panValidation80G('ded100Qual');
panValidation80G('ded50WithQual');
checkNoOfRowsFilled();
//calculateTotalTax('taxDedSourceSal');
//calculateTotalTaxTDS2('taxDedSourceSrc');
//calculateTotalTaxTCS('tcsTableId');
calculateTotalTaxIT('taxDedSelf');

//validateSchAL();
//totAmtOfSchedAL();
}

//Enable or Disable table 44AE based on residential status

function disable44AE(noCalculation){

	var resStatus=document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;

	if(resStatus=='RES' || resStatus=='NOR'){
		
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].readOnly=false;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].readOnly=false;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].readOnly=false;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].readOnly=false;
		
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].readOnly=false;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].readOnly=false;

	}
	else if(resStatus=='NRI'){
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].readOnly=true;	
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].readOnly=true;
	
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].readOnly=true;

	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value="";
	
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value="";

	}else{
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value="";
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value="";
	
	
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value="";

	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value="";
	
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].readOnly=true;
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value="";




	}

	if(noCalculation!=true){
		calc44aeNobBp('us44aeHeavyVehcl');
	}

	}
	
//Display error message for GTI if GTI is less than 0

	function gtiWarningMessage() {
	
	var grossTotalIncome = document.getElementsByName('itr4S.itr4SIncomeDeductions.grossTotIncome')[0].value;
	if( parseInt(grossTotalIncome ,10) <0 ){
	 grossTotalIncome = parseInt(0,10);
	 addErrorXHTML('','To avail the benefit of carry forward and set off of loss, please use ITR-3.');
	}
	}
	
//Display error message for presumptive Income
	
	

	function presumtiveE1aE2aPerCheck(){
		 var grsTrnOverBank=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverBank')[0].value;
		 var persumptiveInc44AD6Per=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value;
		 
		 var grsTrnOverAnyOthMode=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverAnyOthMode')[0].value;
		 var persumptiveInc44AD8Per=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value;
				
			if(parseInt(persumptiveInc44AD6Per,10) > parseInt(grsTrnOverBank,10)){
				addErrorXHTML('' ,'E2(a) should  not be greater than E1(a)');	
				j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per','E2(a) should  not be greater than E1(a)');
				
			}
			
			if(parseInt(persumptiveInc44AD8Per,10) > parseInt(grsTrnOverAnyOthMode,10)){
				addErrorXHTML('' ,'E2(b) should  not be greater than E1(b)');	
				j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per','E2(b) should  not be greater than E1(b)');
			}
	 }
	
	
 function presumtiveE4E3PerCheck(){
	 var grsReceipt=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value;
		var totPersumptiveInc44ADA=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value;
			
		if(parseInt(totPersumptiveInc44ADA,10) > parseInt(grsReceipt,10)){
			addErrorXHTML('' ,'E4 should not be greater than E3');	
			j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA','E4 should not be greater than E3');
		}
 }
 
 
 
 
 
 function TDS2Check(){

		var tab = document.getElementById('taxDedSourceSrc');
		var allInputTags = tab.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("rcptDtls26AS$") && allInputTags[i+1].name.match("totTDSOnAmtPaid$")) {
				if(allInputTags[i].value!='' && allInputTags[i+1].value!=''){
					if(eval(parseInt(coalesce(allInputTags[i].value),10) <  (2*parseInt(allInputTags[i+1].value,10)))){
						addError(allInputTags[i],'Details of Receipt as mentioned in Form 26AS should not be less than twice of the amount of tax deducted',true);
						j.setFieldError(allInputTags[i].name,'Details of Receipt as mentioned in Form 26AS should not be less than twice of the amount of tax deducted');
						//allInputTags[i].value = parseInt('0',10);
					}
				}
			}
		}
	}
 
 
 function calcTCSAmtTaxCheck(){
		
		var tab = document.getElementById('tcsTableId');
		var allInputTags = tab.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			
			
			if (allInputTags[i].name.match("amtfrom26as$") && allInputTags[i+1].name.match("totalTCS$")) {
					if(allInputTags[i].value!='' && allInputTags[i+1].value!=''){
					if(eval(parseInt(coalesce(allInputTags[i].value),10) <  (2*parseInt(allInputTags[i+1].value,10)))){
						addError(allInputTags[i],'Details of amount paid as mentioned in Form 26AS should not be less than twice of the amount of tax collected.',true);
						j.setFieldError(allInputTags[i].name,'Details of amount paid as mentioned in Form 26AS should not be less than twice of the amount of tax collected');
						//allInputTags[i].value = parseInt('0',10);
					}
				}
			}
		}
	}
 


 function NOBBPBussn(){
	 var Inc44AD=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value;
	 var Inc44ADA=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value;
	 var Inc44AE=document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.totPersumInc44AE')[0].value;
	 
	 var Total=Inc44AD+Inc44ADA+Inc44AE;
	 
	 
	 if(parseInt(Total,10) ==0){
			addErrorXHTML('' ,'For filing ITR-4, presumptive business or profession Income is mandatory. If there is no presumptive business or profession Income, please fill other ITR.');	
			j.setFieldError('itr4S.scheduleBPForITR4S.persumptiveInc44AE.totalPersumptiveInc44AD','For filing ITR-4, presumptive business or profession Income is mandatory. If there is no presumptive business or profession Income, please fill other ITR.');
		}
 }
 
//Display error message for nature of business

function natureOfBusChck(tableId,noRows){

var tab = document.getElementById(tableId);
var rowCount = tab.rows.length;
if(rowCount > noRows) {
addErrorXHTML('','Cannot insert more than 3 rows');
return false;
}
return true;

}
	
//Display error message for Self Occupied House property

function selfOccupdNegativChk(){

var typeOfHP = document.getElementsByName('itr4S.itr4SIncomeDeductions.typeOfHP')[0].value;
var incmHP = document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncomeOfHP')[0].value;

if(typeOfHP == 'S' && incmHP > 0){
	addErrorXHTML('' ,'Annual value of Self Occupied House property shall be nil in view of Sec 23(2)');	
	j.setFieldError('itr4S.itr4SIncomeDeductions.totalIncomeOfHP','Annual value of Self Occupied House property shall be nil in view of Sec 23(2)');
}

}

//Calculate Tax

function calculateTax(){
clearOldValues();
calcItr4();
}

//To check if value is greater than 0 else return 0

function zeroOrMore(val){
		val = coalesce(val);
		if(val < 0){
			return 0;
		}
		return val;
	}
	
// Get the PAN of the taxpayer

function getPan(){

var pan = document.getElementsByName('itr4S.personalInfo.pan')[0].value;
return pan;
}

//Enable or disable notice date based on the section under which return is filed

function changeNoticeDateUndSec(val){

if(val == '13'||val=='14'||val=='15'||val=='16'||val=='18'){
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].disabled=false;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].readOnly=false;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].value='';	
			
		} else {
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].disabled=true;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].readOnly=true;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].value='';	
		
		}
	
}

//Enable or disable TDS spouse amount field

function enableTDSspouseAmt(portVal){
var table = document.getElementById('taxDedSourceSrc');
var noOfRows = table.rows.length;
	if(portVal=='Y'){
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
				document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=false;
				document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=false;
				document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].value='';
			}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
				document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=true;
				document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=true;
				document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].value='';
			}
		}
}

//Enable or disable TDS spouse amount field based on portugeseCC5A

function enableTDSspouseAmtOnLoad(){
var portVal = document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value;
var table = document.getElementById('taxDedSourceSrc');
var noOfRows = table.rows.length;

	if(portVal=='Y'){
	
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=false;
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=true;
			document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=true;
		}
	}
}

//Enable or disable TCS spouse amount field 

function enableTCSspouseAmt(portVal){
var table = document.getElementById('tcsTableId');
var noOfRows = table.rows.length;
	if(portVal=='Y'){
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
				document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=false;
				document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=false;
				document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].value='';
			}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
				document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=true;
				document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=true;
				document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].value='';
			}
		}
}

//Enable or disable TCS spouse amount field based on portugeseCC5A

function enableTCSspouseAmtOnLoad(){
var portVal = document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value;
var table = document.getElementById('tcsTableId');
var noOfRows = table.rows.length;

	if(portVal=='Y'){
	
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=true;
			document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=true;
		}
	}
}

//Check if Amount in amount claimed by spouse is empty 

function checkEmptyAmtSpouse(tableId){
var tab = document.getElementById(tableId);
var allInputTags = tab.getElementsByTagName('input');
var portuVal = document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value;
var isRowBlank = checkRowBlank(tableId, 3, 2);
if(portuVal=='Y' && isRowBlank == false){
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("amtClaimedBySpouse$")) {
						if(allInputTags[i].value ==''){
							addError(allInputTags[i],' Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero');
						}
					}
				}
		}
}

//Check if total amount in 44ADAE is greater than 1 crore  

/*function check44ADAESum(){

var grossRecpt = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.grsTrnOverOrReceipt')[0].value;
var totalIncome = parseInt(grossRecpt,10);
if(totalIncome>20000000){
	
		addError('',' If income E1 is more than Rs 2 crore (Gross Receipts), it is mandatory to have a tax audit under 44AB. Please use the regular ITR 4 form.',true);
		j.setFieldError('','If income E1 is more than Rs 2 crore (Gross Receipts), it is mandatory to have a tax audit under 44AB. Please use the regular ITR 4 form.');

	}

}
*/
//Validate fields in TDS table

function validateTDS(){
	var tab1 = document.getElementById('taxDedSourceSal');
	var allInputTags = tab1.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("totalTDSSal$")) {				
				if(parseInt(allInputTags[i].value ,10) > parseInt(allInputTags[i-1].value ,10)){
					addError(allInputTags[i],'Total tax deducted cannot be more than Income chargeable under Salaries',true);
					j.setFieldError(allInputTags[i].name,'Total tax deducted cannot be more than Income chargeable under Salaries');
					allInputTags[i].value = parseInt('0',10);
					
				} 
			}
		}

	var tab2 = document.getElementById('taxDedSourceSrc');
	var allInputTags = tab2.getElementsByTagName('input');
	var portuVal = document.getElementsByName('itr4S.filingStatus.portugeseCC5A')[0].value;
	if(portuVal=='N'){
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$")) {
					
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 7 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 7 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);		
						}
					}
			}
			}
		} else {
		
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$")) {
					
				if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$") && allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10) + parseInt(coalesce(allInputTags[i+1].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 7+Col 8 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 7+Col 8 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);
							allInputTags[i+1].value = parseInt('0',10);
							}
					}
			}
			}
		
		}
	
	var tcsTAB = document.getElementById('tcsTableId');
	var allInputTags = tcsTAB.getElementsByTagName('input');
	if(portuVal=='N'){
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("amtTCSClaimedThisYear$")) {
					if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  parseInt(allInputTags[i-1].value,10)){
						addError(allInputTags[i],'Amount claimed in Col 5 cannot exceed Total tax collected',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 5 cannot exceed Total tax collected');
						allInputTags[i].value = parseInt('0',10);
						
						
					}
				}
			}
		} else {
		
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("amtTCSClaimedThisYear$")&& allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
					if(eval(parseInt(coalesce(allInputTags[i].value),10) + parseInt(coalesce(allInputTags[i+1].value),10)) >  parseInt(allInputTags[i-1].value,10)){
						addError(allInputTags[i],'Amount claimed in Col 5+Col 6 cannot exceed Total tax collected',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 5+Col 6 cannot exceed Total tax collected');
						allInputTags[i].value = parseInt('0',10);
						allInputTags[i+1].value = parseInt('0',10);
					}
				}
			}
		
		}
}

//Convert IFS Code to uppercase on tab out

function ifscCodeUpperCase(){

document.getElementsByName('itr4S.refund.depositToBankAccount.iFSCCode')[0].value=document.getElementsByName('itr4S.refund.depositToBankAccount.iFSCCode')[0].value.toUpperCase();

}


//To set options in Aadhar dropdown

function setAadharOption() {
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
	var aadhar = document.getElementsByName('itr4S.filingStatus.adharNoOption')[0];

	if (status == 'I') {
		removeAll(aadhar);
		addOption(aadhar, 'Yes', 'Y');
		addOption(aadhar, 'No', 'N');
	} else if (status == 'H' || status == 'F') {
		removeAll(aadhar);
		addOption(aadhar, 'NA', 'X');
	} else {

		removeAll(aadhar);
		addOption(aadhar, 'Yes', 'Y');
		addOption(aadhar, 'No', 'N');
		addOption(aadhar, 'NA', 'X');

	}
}

//To add options in Aadhar dropdown

function addOption(selectbox, text, value) {
	var optn = document.createElement("option");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

//To remove all the options in Aadhar dropdown

function removeAll(selectbox) {

	for ( var i = selectbox.options.length - 1; i > 0; i--) {
		selectbox.removeChild(selectbox[i]);

	}
}

//To set options in Aadhar dropdown 

/*function setAadharOptionOnLoad() {
	var aadhar = document.getElementsByName('itr4S.filingStatus.adharNoOption')[0].value;
	setAadharOption();
	document.getElementsByName('itr4S.filingStatus.adharNoOption')[0].value = aadhar;

}*/

//To set error message if return is filed under section 119


function displaywarnings(){
	
	
	var incSal = document.getElementsByName('itr4S.itr4SIncomeDeductions.incomeFromSal')[0].value;
	var tab1 = document.getElementById('taxDedSourceSal');
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
		
	for ( var i = 0; i < (noOfRows-3); i++) {
				amt = document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].incChrgSal')[0].value;
				sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
	}
 
	var tdsSalminusTenPer = sum*parseFloat('0.90');
	var errText="";
	var i=1;

 
	if(incSal < tdsSalminusTenPer){
		errText+=(i++)+". The amount of salary disclosed in \"Income details/Part BTI\" is less than 90% of Salary reported in TDS1.\n\n";
	}
	
	var sec119=document.getElementsByName('itr4S.filingStatus.returnFileSec')[0].value;
	var taxPay=document.getElementsByName('itr4S.taxPaid.balTaxPayable')[0].value;
	
	if(sec119=='20'){
		errText+=(i++)+". Return u/s 119(2)(b) for AY 2017-18 can be filed only after 31st March 2018\n\n";
	}
	
	/*if(taxPay > '0'){
		
		errText+=(i++)+". Please ensure that the taxes are paid before the submission of the return, else return shall be treated as defective.\n";
	}*/
	main.generateMsgDialogWithOk(errText,"");

}

//To perform PAN validation for 80G

function panValidation80G(tableId) {
	var pan = document.getElementsByName('itr4S.personalInfo.pan')[0].value;
	var verificationPAN = document.getElementsByName('itr4S.verification.declaration.assesseeVerPAN')[0].value;
	var table = document.getElementById(tableId);
	var allInputTags = table.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("doneePAN$")) {
			if(allInputTags[i].value != '' && (allInputTags[i].value == pan || allInputTags[i].value == verificationPAN )){
				j.setFieldError(allInputTags[i].name,'Donee PAN cannot be same as assesse PAN or verification PAN.');

			}
		}
	}
}

//To check if the number of rows filled is equal to the number of bank accounts entered

function checkNoOfRowsFilled(){
	var tab = document.getElementById('scheduleBA');
	var rowCount = tab.rows.length;
	var count =  parseInt(0,10);
	//var noOfBankAccounts = document.getElementsByName('itr4S.scheduleBA.noOfBankAcc')[0].value;
	for ( var i = 0; i < (rowCount-2); i++) {
		var IFSC = document.getElementsByName('itr4S.scheduleBA['+i+'].ifscCode')[0].value;
		if(IFSC !=""){
			count = count+1;
		}
	}
	/*if(noOfBankAccounts != '' && (noOfBankAccounts-1) != count){
		 j.setFieldError('itr4S.scheduleBA.noOfBankAcc','Number of bank accounts held during the previous year should be equal to number of rows entered in the below tables');
	}*/
	
}

//To enable or disable fields -- Account balance

function enableScheduleBAAccountStatus(elem) {
	var position = parseInt(elem.name.substring(elem.name.indexOf("[") + 1, elem.name.indexOf("]")));
	var index = elem.selectedIndex;
	if(index == 1) {
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].value = '0';
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].disabled = true;
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].readOnly = true;
	} else if(index == 2) {
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].value = '';
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].disabled = false;
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].readOnly = false;
	} else {
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].disabled = true;
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].value = '';
		document.getElementsByName('itr4S.scheduleBA['+position+'].accBalance')[0].readOnly = true;
	}
}

//To enable or disable fields -- Account balance on load

function enableScheduleBAAccountStatusOnLoad(){
	
	var table = document.getElementById('scheduleBA');
	var rows = table.getElementsByTagName('tr');
	var rowCount = rows.length;
	
	for(var  i = 0; i<rowCount - 2; i++){
		var selectedOptionValue = document.getElementsByName('itr4S.scheduleBA['+i+'].accStatusFlag')[0].value;	
		
		if (selectedOptionValue == 'C'){
			document.getElementsByName('itr4S.scheduleBA['+i+'].accBalance')[0].disabled=true;
			document.getElementsByName('itr4S.scheduleBA['+i+'].accBalance')[0].readOnly = true;
		}else{
			document.getElementsByName('itr4S.scheduleBA['+i+'].accBalance')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleBA['+i+'].accBalance')[0].readOnly = false;
		}
	}
}

//To fetch bank name corresponding to the IFS code

function getIfscBankDetails(elem){
	
	var position = parseInt(elem.name.substring(elem.name.indexOf("[") + 1, elem.name.indexOf("]")));
			
	var  ifscCode = document.getElementsByName('itr4S.scheduleBA['+position+'].ifscCode')[0].value;
	
	document.getElementsByName('itr4S.scheduleBA['+position+'].bankName')[0].value = main.getBankName(ifscCode);
	
}

//To fetch bank name corresponding to the IFS code

function getIfscBankName(field){
	
	document.getElementsByName('itr4S.refund.depositToBankAccount.bankName')[0].value = main.getBankName(field.value);	
}

//To calculate Total tax

function calculateTotalTax(tableId){

	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'taxDedSourceSal'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
				amt = document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].totalTDSSal')[0].value;
				sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary.totalTaxDeducted')[0].value = parseInt(sum,10);
		
	}	
}

//To calculate Total tax on TDS2

function calculateTotalTaxTDS2(tableId){

	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'taxDedSourceSrc'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
			amt = document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal['+i+'].claimOutOfTotTDSOnAmtPaid')[0].value;
			sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr4S.tdSonOthThanSals.tdSonOthThanSal.claimOutOfTotTDSOnAmtPaid')[0].value = parseInt(sum,10);
	}	
}

//To calculate Total tax on TCS

function calculateTotalTaxTCS(tableId){
	
	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'tcsTableId'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
			 amt = document.getElementsByName('itr4S.scheduleTCS.tcs['+i+'].amtTCSClaimedThisYear')[0].value;
			 sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr4S.scheduleTCS.tcs.amtTCSClaimedThisYear')[0].value = parseInt(sum,10);
	}
}

//To calculate Total tax on IT

function calculateTotalTaxIT(tableId){
	
	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'taxDedSelf'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
			amt = document.getElementsByName('itr4S.scheduleIT.taxPayment['+i+'].amt')[0].value;
			sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr4S.scheduleIT.taxPayment.amt')[0].value = parseInt(sum,10);
	}
}

//To open Save file dialog
function popupWithOk()
{
	  j.popup();
}

//To calculate the total amount of Schedule AL

/*function totAmtOfSchedAL(){
	var totalIncome = parseInt(coalesce(document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0].value) ,10);
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
	
	if(totalIncome <= eval('5000000')){
		document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value=eval(
				coalesceSetRet('scheduleAL.immovableAssetLand')+
				coalesceSetRet('scheduleAL.immovableAssetBuilding')+
				coalesceSetRet('scheduleAL.movableAsset.cashInHand')+
				coalesceSetRet('scheduleAL.movableAsset.jewelleryBullionEtc')+
				coalesceSetRet('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts'));
		
				coalesceSetRet('scheduleAL.liabilityInRelatAssets');
	}else if(totalIncome > eval('5000000') && status == 'F'){
		
		document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value=eval(
				coalesceSetRet('scheduleAL.immovableAssetLand')+
				coalesceSetRet('scheduleAL.immovableAssetBuilding')+
				coalesceSetRet('scheduleAL.movableAsset.cashInHand')+
				coalesceSetRet('scheduleAL.movableAsset.jewelleryBullionEtc')+
				coalesceSetRet('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts'));
		
				coalesceSetRet('scheduleAL.liabilityInRelatAssets');
	}
	else{
		document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value=eval(
				parseInt(coalesce(document.getElementsByName('scheduleAL.immovableAssetLand')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.immovableAssetBuilding')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.movableAsset.cashInHand')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.movableAsset.jewelleryBullionEtc')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value),10));
	}
}*/
/*function validateSchAL() {
	var immovableAssetLand = document.getElementsByName('scheduleAL.immovableAssetLand')[0].value;
	var immovableAssetBuilding = document.getElementsByName('scheduleAL.immovableAssetBuilding')[0].value;
	var cashInHand = document.getElementsByName('scheduleAL.movableAsset.cashInHand')[0].value;
	var jewelleryBullionEtc = document.getElementsByName('scheduleAL.movableAsset.jewelleryBullionEtc')[0].value;
	var vehiclYachtsBoatsAircrafts = document.getElementsByName('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value;
	var liabilityInRelatAssets = document.getElementsByName('scheduleAL.liabilityInRelatAssets')[0].value;
	
	var totalImmovablMovablAssets = document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0];
	
	if(immovableAssetLand == '' && immovableAssetBuilding == '' &&  cashInHand == '' && jewelleryBullionEtc == '' && vehiclYachtsBoatsAircrafts == '' && liabilityInRelatAssets == '') {
		totalImmovablMovablAssets.value = '';
	}
}
*/
/*function autoPopulateAL(){
	
	var totalIncome = parseInt(coalesce(document.getElementsByName('itr4S.itr4SIncomeDeductions.totalIncome')[0].value) ,10);
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
	
	if(status == 'F'){
		alert('firm case');
		document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value=eval(
				coalesceSetRet('scheduleAL.immovableAssetLand')+
				coalesceSetRet('scheduleAL.immovableAssetBuilding')+
				coalesceSetRet('scheduleAL.movableAsset.cashInHand')+
				coalesceSetRet('scheduleAL.movableAsset.jewelleryBullionEtc')+
				coalesceSetRet('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts'));
		
				coalesceSetRet('scheduleAL.liabilityInRelatAssets');
	}
	else{
		document.getElementsByName('scheduleAL.immovableAssetLand')[0].value='';
		document.getElementsByName('scheduleAL.immovableAssetBuilding')[0].value='';
		document.getElementsByName('scheduleAL.movableAsset.cashInHand')[0].value='';
		document.getElementsByName('scheduleAL.movableAsset.jewelleryBullionEtc')[0].value='';
		document.getElementsByName('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value='';
		document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value='';
		document.getElementsByName('scheduleAL.liabilityInRelatAssets')[0].value='';
	}
	
}*/

function calc44AD(){
	
	E2Sum();

	//E8= E2c+E4+E7
	//new change nagesh
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.totalPersumptiveInc44AD')[0].value = coalesce(
			eval( parseInt(coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.totPersumptiveInc44ADA')[0].value ) ,10) +
					parseInt(coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.incChargeableUnderBus')[0].value ) ,10)
				  +parseInt(coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value ) ,10)));
	
	
}

function E2Sum(){

	
	document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.totPersumptiveInc44AD')[0].value = coalesce(
			eval( parseInt(coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD6Per')[0].value ) ,10) +
				  parseInt(coalesce(document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AD.persumptiveInc44AD8Per')[0].value ) ,10) 
				  ));
	
	
	
}


function disableE3Under44ADLoad(){

	var status=document.getElementsByName('itr4S.personalInfo.status')[0].value;

	if(!(status=='H' || status=='S' || status=='I')){
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].readOnly=false;
		
		
	}
	else{
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].readOnly=true;
	
	}
	calc44AD();
}

function disableE3Under44AD(){

	var status=document.getElementsByName('itr4S.personalInfo.status')[0].value;

	if(!(status=='H' || status=='S' || status=='I')){
		
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].readOnly=false;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].value="0";
	}
	else{
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44AE.salInterestByFirm')[0].value="0";

		
	}
	calc44AD();
}
//Check whether the Residentialstatus for Firm

function residentialStatusCheck(){

var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
var resStatus = document.getElementsByName('itr4S.filingStatus.residentialStatus')[0].value;

if((status == 'F') && (resStatus == 'NOR')){
		addErrorXHTML('' ,'For a Firm, Residential Status cannot be NOR');	
		j.setFieldError('itr4S.filingStatus.residentialStatus','For a Firm, Residential Status cannot be NOR');
		}
}

function disableTDS1(){
	
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
	var tableTDS1 = document.getElementById('taxDedSourceSal');
	var noOfRows = tableTDS1.rows.length;
	
	if(status == 'F'){
		
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.chosenCheckBox')[0].disabled=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.chosenCheckBox')[0].readOnly=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.chosenCheckBox')[0].value='';
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.tan')[0].disabled=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.tan')[0].readOnly=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.tan')[0].value='';
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName')[0].disabled=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName')[0].readOnly=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName')[0].value='';
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].incChrgSal')[0].disabled=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].incChrgSal')[0].readOnly=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].incChrgSal')[0].value='';
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].totalTDSSal')[0].disabled=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].totalTDSSal')[0].readOnly=true;
			document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].totalTDSSal')[0].value='';
		}
		
	}
		else{
			
			for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.chosenCheckBox')[0].disabled=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.chosenCheckBox')[0].readOnly=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.tan')[0].disabled=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.tan')[0].readOnly=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName')[0].disabled=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName')[0].readOnly=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].incChrgSal')[0].disabled=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].incChrgSal')[0].readOnly=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].totalTDSSal')[0].disabled=false;
				document.getElementsByName('itr4S.tdSonSalaries.tdSonSalary['+i+'].totalTDSSal')[0].readOnly=false;
			}
			
		}
}

function disableAL(){
	
	var status = document.getElementsByName('itr4S.personalInfo.status')[0].value;
	/*var tableTDS1 = document.getElementById('taxDedSourceSal');
	var noOfRows = tableTDS1.rows.length;*/
	
	if(status == 'F'){
		
		document.getElementsByName('itr4S.scheduleAL.immovableFlag')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.immovableFlag')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.immovableFlag')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.jewelleryBullionEtc')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.jewelleryBullionEtc')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.jewelleryBullionEtc')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.depositsinbank')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.depositsinbank')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.depositsinbank')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.sharesandsecurities')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.sharesandsecurities')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.sharesandsecurities')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.insurancepolicies')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.insurancepolicies')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.insurancepolicies')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.loansandadvancesgiven')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.loansandadvancesgiven')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.loansandadvancesgiven')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.movableAsset.cashInHand')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.cashInHand')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.movableAsset.cashInHand')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.interstAOPFlag')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.interstAOPFlag')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.interstAOPFlag')[0].value='';
		document.getElementsByName('itr4S.scheduleAL.liabilityInRelatAssets')[0].disabled=true;
		document.getElementsByName('itr4S.scheduleAL.liabilityInRelatAssets')[0].readOnly=true;
		document.getElementsByName('itr4S.scheduleAL.liabilityInRelatAssets')[0].value='';
	
		disableFields_AOP();
		disableFields_AL();
		disableImmovableAsset();
		disableAOP();
		
	}
		else{
			

			document.getElementsByName('itr4S.scheduleAL.immovableFlag')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.immovableFlag')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.jewelleryBullionEtc')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.jewelleryBullionEtc')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.depositsinbank')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.depositsinbank')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.sharesandsecurities')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.sharesandsecurities')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.insurancepolicies')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.insurancepolicies')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.loansandadvancesgiven')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.loansandadvancesgiven')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.cashInHand')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.movableAsset.cashInHand')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.interstAOPFlag')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.interstAOPFlag')[0].readOnly=false;
			document.getElementsByName('itr4S.scheduleAL.liabilityInRelatAssets')[0].disabled=false;
			document.getElementsByName('itr4S.scheduleAL.liabilityInRelatAssets')[0].readOnly=false;
			
			disableFields_AOP();
			disableFields_AL();
			disableImmovableAsset();
			disableAOP();
		}
}

function check44ADASum(){

	var grsReceiptADA = document.getElementsByName('itr4S.scheduleBPForITR4S.persumptiveInc44ADA.grsReceipt')[0].value;
	var totalIncome = parseInt(grsReceiptADA,10);
	if(totalIncome>5000000){
		
			addError('','If income is more than Rs 50 lakhs (Gross Receipts), it is mandatory to have a tax audit under 44AB and Regular ITR 3/5 form has to be filled and not this form',true);
			j.setFieldError('','If income is more than Rs 50 lakhs (Gross Receipts), it is mandatory to have a tax audit under 44AB and Regular ITR 3/5 form has to be filled and not this form');

		}
}

function disableFields_AL(){
	
	var listOfTr = document.getElementById('scheduleAL').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 4);
	
	
	for (var j = 0; j < noOfRows; j++) {
	
		var flag = document.getElementsByName('itr4S.scheduleAL.immovableFlag')[0].value;
		if(flag=="Y")
		{
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].description')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.residenceNo')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.residenceName')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.roadOrStreet')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.localityOrArea')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.cityOrTownOrDistrict')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.stateCode')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.country')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.pinCode')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].amount')[0].disabled=false;
		 
		
		}
	else{
		
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].description')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].description')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.residenceNo')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.residenceNo')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.residenceName')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.residenceName')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.roadOrStreet')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.roadOrStreet')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.localityOrArea')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.localityOrArea')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.cityOrTownOrDistrict')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.cityOrTownOrDistrict')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.stateCode')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.stateCode')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.country')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.country')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.pinCode')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].addressAL.pinCode')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].amount')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.immovableDtls['+j+'].amount')[0].value="";
		 
    
		}
	
	}
}


function disableFields_AOP(){
	
	var listOfTr = document.getElementById('AOPAsset').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);
	
	
	for (var j = 0; j < noOfRows; j++) {
	
		var flag = document.getElementsByName('itr4S.scheduleAL.interstAOPFlag')[0].value;
		if(flag=="Y")
		{
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].nameOfFirm')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.residenceNo')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.residenceName')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.roadOrStreet')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.localityOrArea')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.cityOrTownOrDistrict')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.stateCode')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.country')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.pinCode')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].panOfFirm')[0].disabled=false;
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].assesseInvestment')[0].disabled=false;
		 
		
		}
	else{
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].nameOfFirm')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].nameOfFirm')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.residenceNo')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.residenceNo')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.residenceName')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.residenceName')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.roadOrStreet')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.roadOrStreet')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.localityOrArea')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.localityOrArea')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.cityOrTownOrDistrict')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.cityOrTownOrDistrict')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.stateCode')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.stateCode')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.country')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.country')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.pinCode')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].addressAL.pinCode')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].panOfFirm')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].panOfFirm')[0].value="";
		 
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].assesseInvestment')[0].disabled=true;
		 document.getElementsByName('itr4S.scheduleAL.interestHeldInaAssetDtls['+j+'].assesseInvestment')[0].value="";
		 
    
		}
	
	}
}


function disableImmovableAsset(){

	var immovableFlag=document.getElementsByName('itr4S.scheduleAL.immovableFlag')[0].value;
	
        removeTableData('scheduleAL',immovableFlag);

}

//To remove Table Data
function removeTableData(tableID,immovableFlag){
    
    var tab = document.getElementById(tableID);
    
    if(immovableFlag!='Y'){
    $('#'+tableID+' input').attr("checked" , true);
    deleteRowTable(tableID,3,1);
    $('#'+tableID+' input').attr("checked" , false);
    }
            
	var allInputTags = tab.getElementsByTagName('input');
    var selectTags=tab.getElementsByTagName('select');


	for(var i = 0; i < allInputTags.length; i++) {
		if(immovableFlag=='Y'){
			allInputTags[i].disabled=false;
			allInputTags[i].readOnly=false;	
			
	}else{		
		
		allInputTags[i].disabled=true;
		allInputTags[i].readOnly=true;
		allInputTags[i].value="";	
	}
}
for(var i = 0; i < selectTags.length; i++){
	if(immovableFlag=='Y'){
		  selectTags[i].disabled=false;		
	}else{
		selectTags[i].disabled=true;
		selectTags[i].value="";	
                  	
	}
}

}


function disableAOP(){
	
	var interestFlag = document.getElementsByName('itr4S.scheduleAL.interstAOPFlag')[0].value;	
	removeTableData1('AOPAsset',interestFlag);
	
}


function removeTableData1(tableID,interestFlag){
    
	var tab = document.getElementById(tableID);

	if(interestFlag!='Y'){
	$('#'+tableID+' input').attr("checked" , true);
	deleteRowTable(tableID,2,1);
	$('#'+tableID+' input').attr("checked" , false);
	}
	        
	var allInputTags = tab.getElementsByTagName('input');
	var selectTags=tab.getElementsByTagName('select');


	for(var i = 0; i < allInputTags.length; i++) {
		if(interestFlag=='Y'){
			allInputTags[i].disabled=false;
			allInputTags[i].readOnly=false;	
			
			
	}else{		
		
		
		allInputTags[i].disabled=true;
		allInputTags[i].readOnly=true;
		allInputTags[i].value="";	
	}
	}
	for(var i = 0; i < selectTags.length; i++){
	if(interestFlag=='Y'){
		
		
		  selectTags[i].disabled=false;		
	}else{
		selectTags[i].disabled=true;
		selectTags[i].value="";	
	              	
	}
	} 

}