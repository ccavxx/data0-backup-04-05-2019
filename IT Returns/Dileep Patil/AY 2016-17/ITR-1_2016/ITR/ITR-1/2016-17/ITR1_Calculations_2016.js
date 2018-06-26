
var FY_start_date = '01/04/2015';
var FY_end_date = '31/03/2016';
var AY_start_date = '01/04/2016';
var Filing_dueDate= '31/07/2016'; // Modified due to the due date extended for filing the return
var Int_start_date_234A = '01/08/2016'; // Modified due to the due date extended for filing the return

var slab1_end_date = '15/09/2015';
var slab2_start_date = '16/09/2015';
var slab2_end_date = '15/12/2015';
var slab3_start_date = '16/12/2015';
var slab3_end_date = '15/03/2016';

//To calculate Interest calculations
function calcItr1(){
	calcGrossTotIncome();
	onchangeDed();
	
}

//To calculate GrossTotIncome
function calcGrossTotIncome() {
	
	try{
	var varDate = document.getElementsByName('itr1.verification.date')[0];
	if(varDate.value=='' || varDate.value==undefined || varDate.value== null){
		varDate.value = getCurrentDate();	
	}
	
	var salaries = document.getElementsByName('itr1.itr1IncomeDeductions.incomeFromSal')[0]; salaries.value = coalesce(salaries.value) ;
	var incFrmHP = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncomeOfHP')[0]; incFrmHP.value = coalesce(incFrmHP.value) ;

 	var incFrmOthSrc = document.getElementsByName('itr1.itr1IncomeDeductions.incomeOthSrc')[0]; incFrmOthSrc.value = coalesce(incFrmOthSrc.value);
	var grossTotInc = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0]; 

	var advanceTaxToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
	var TDSToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
	var SATtoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);
	var refundDue = document.getElementsByName('itr1.refund.refundDue')[0];  refundDue.value = coalesce(refundDue.value);

	var temp = eval(parseInt(salaries.value ,10)) + eval(parseInt(incFrmHP.value ,10)) + eval(parseInt(incFrmOthSrc.value,10));
	
	
		grossTotInc.value = temp;
	
	
	dedUndVIA();
	}catch(e){ alert('Exceptions in calcGrossTotIncome method = ' + e.stack); }
}


//To get Ifsc Bank Details
function getIfscBankDetails(elem){
	
	var position = parseInt(elem.name.substring(elem.name.indexOf("[") + 1, elem.name.indexOf("]")));
			
	var  ifscCode = document.getElementsByName('itr1.scheduleBA['+position+'].ifscCode')[0].value;
	
	document.getElementsByName('itr1.scheduleBA['+position+'].bankName')[0].value = main.getBankName(ifscCode);
		
	
}

//To get Ifsc Bank Name
function getIfscBankName(field){
	
	document.getElementsByName('itr1.refund.depositToBankAccount.bankName')[0].value = main.getBankName(field.value);
		
	
}

//To caluclate deductions Under Chapter VIA
function dedUndVIA(){
	var salaries = document.getElementsByName('itr1.itr1IncomeDeductions.incomeFromSal')[0]; salaries.value = coalesce(salaries.value);
	var incFrmHP = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncomeOfHP')[0].value; incFrmHP = coalesce(incFrmHP) ;
	var incFrmOthSrc = document.getElementsByName('itr1.itr1IncomeDeductions.incomeOthSrc')[0].value; incFrmOthSrc = coalesce(incFrmOthSrc);
	var grossTotInc = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value; 
	var gIncome=document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value; 
	
	 if( parseInt(grossTotInc ,10) <0 ){
		 grossTotInc = parseInt(0,10);
		}
	
	
	var residentialStatus  = document.getElementsByName('itr1.filingStatus.residentialStatus')[0].value;

	var sec80C = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80C_Usr')[0].value; sec80C = coalesce(sec80C);
	var sec80CsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80C')[0];

	var sec80CCC = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC_Usr')[0].value; sec80CCC = coalesce(sec80CCC);
	var sec80CCCsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCC')[0];

	var sec80CCDempeContr = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD_Usr')[0].value; sec80CCDempeContr = coalesce(sec80CCDempeContr);
	var sec80CCDempeContrsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCD')[0];

	var sec80CCD1B = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B_Usr')[0].value; sec80CCD1B = coalesce(sec80CCD1B);
	var sec80CCD1BsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCD1B')[0];
	
	var sec80CCDemprContr = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer_Usr')[0].value; sec80CCDemprContr = coalesce(sec80CCDemprContr);
	var sec80CCDemprContrsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCDEmployer')[0];

	var sec80D = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80D_Usr')[0].value; sec80D = coalesce(sec80D);
	var sec80DsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80D')[0];

	var sec80DD = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD_Usr')[0].value; sec80DD = coalesce(sec80DD);
	var sec80DDsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80DD')[0];

	var sec80DDB = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr')[0].value; sec80DDB = coalesce(sec80DDB);
	var sec80DDBsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80DDB')[0];

	var sec80E = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80E_Usr')[0].value; sec80E = coalesce(sec80E);
	var sec80EsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80E')[0];
	
	

	var sec80G = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80G_Usr')[0]; sec80G.value = coalesce(sec80G.value);
	var sec80GsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80G')[0];

	var sec80GG = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG_Usr')[0].value; sec80GG = coalesce(sec80GG);
	var sec80GGsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80GG')[0];

	var sec80GGA = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA_Usr')[0].value; sec80GGA = coalesce(sec80GGA);
	var sec80GGAsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80GGA')[0];

	var sec80GGC = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC_Usr')[0].value; sec80GGC = coalesce(sec80GGC);
	var sec80GGCsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80GGC')[0];

	var sec80U = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80U_Usr')[0].value; sec80U = coalesce(sec80U);
	var sec80UsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80U')[0];

	var sec80CCG = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG_Usr')[0].value; sec80CCG = coalesce(sec80CCG);
	var sec80CCGsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCG')[0];
	
	var sec80RRB = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB_Usr')[0].value; sec80RRB = coalesce(sec80RRB);
	var sec80RRBsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80RRB')[0];
	
	var sec80QQB = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB_Usr')[0].value; sec80QQB = coalesce(sec80QQB);
	var sec80QQBsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80QQB')[0];
	
	var sec80TTA = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA_Usr')[0].value; sec80TTA = coalesce(sec80TTA);
	var sec80TTAsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80TTA')[0];
	
	
	// CHECK FOR 80C
	
	if( parseInt(grossTotInc ,10) >0 ){
	
	if(parseInt(grossTotInc,10)> eval('100000')){
		
		if( parseInt(sec80C,10) > eval('150000')) {
			sec80CsysCalc.value = '150000' ;
		} else {
			sec80CsysCalc.value = parseInt(sec80C,10);
		}
		
	}else{
		
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
	
	

	// CHECK FOR 80CCC
	if( parseInt(grossTotInc ,10) >0 ){
	
	if(parseInt(grossTotInc,10)> eval('100000')){
		if( parseInt(sec80CCC,10) > eval('150000')) {
			sec80CCCsysCalc.value = '150000' ;
	} else {
		sec80CCCsysCalc.value = parseInt(sec80CCC,10);
	}
	
	}else{
		
		if( parseInt(sec80CCC,10) > parseInt(grossTotInc)) {
			sec80CCCsysCalc.value = grossTotInc ;
		} else {
			sec80CCCsysCalc.value = parseInt(sec80CCC,10);
		}
	}
	
	if(parseInt(grossTotInc ,10) < sec80CCCsysCalc.value){
		sec80CCCsysCalc.value = grossTotInc;
	}
	
	} else {
	
	sec80CCCsysCalc.value = parseInt('0',10);
	
	}

	// CHECK FOR 80CCD1B
if( parseInt(grossTotInc ,10) >0 ){
		if( parseInt(sec80CCD1B,10) > eval('50000')){
			sec80CCD1BsysCalc.value = '50000';
		} else {
			sec80CCD1BsysCalc.value =  parseInt(sec80CCD1B,10);
		}
} 
else {
	sec80CCD1BsysCalc.value= parseInt('0',10);
	}
	// CHECK FOR 80CCD (EMPLOYER CONTRIBUTIION)
	var temp = Math.round(eval(parseInt(salaries.value,10)) * eval('0.10'));
	if( parseInt(grossTotInc ,10) >0 ){
	if( parseInt(sec80CCDemprContr,10) > temp ) {
		sec80CCDemprContrsysCalc.value = temp ;
	} else {
		sec80CCDemprContrsysCalc.value = parseInt(sec80CCDemprContr,10);
	}
	
	if(parseInt(grossTotInc ,10) < sec80CCDemprContrsysCalc.value){
		sec80CCDemprContrsysCalc.value = grossTotInc;
	}
	}  else {
		sec80CCDemprContrsysCalc.value= parseInt('0',10);
	}

	// CHECK FOR 80CCD(EMPLOYEE)
    //  var emplrCat = document.getElementsByName('itr1.personalInfo.employerCategory')[0].value;
		var salUppLimit = Math.round(eval(parseInt(salaries.value,10)) * eval('0.10'));
		var gtiUppLimit = Math.round(eval(parseInt(coalesce(grossTotInc),10)) * eval('0.10'));
		if( parseInt(grossTotInc ,10) >0 ){
		if(parseInt(salaries.value) == parseInt('0' , 10)){
			//if(emplrCat !='-1'){
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
			//}
			/*else{
				if(salUppLimit > parseInt('100000' ,10)){
					if( parseInt(sec80CCDempeContr,10) > eval('100000')) {
						sec80CCDempeContrsysCalc.value = '100000' ;
					} else {
						sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
					}
				} else {
					if( parseInt(sec80CCDempeContr,10) > salUppLimit ) {
						sec80CCDempeContrsysCalc.value = salUppLimit ;
					} else {
						sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
					}
				}
				if(parseInt(grossTotInc ,10) < sec80CCDempeContrsysCalc.value){
						sec80CCDempeContrsysCalc.value = grossTotInc;
					}
			}*/
		}else{
			//if(emplrCat !='-1'){
				if(salUppLimit > parseInt('150000' ,10)){
					if( parseInt(sec80CCDempeContr,10) > eval('150000')) {
						sec80CCDempeContrsysCalc.value = '150000' ;
					} else {
						sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
					}
				} else {
					if( parseInt(sec80CCDempeContr,10) > salUppLimit ) {
						sec80CCDempeContrsysCalc.value = salUppLimit ;
					} else {
						sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
					}
				}
				if(parseInt(grossTotInc ,10) < sec80CCDempeContrsysCalc.value){
						sec80CCDempeContrsysCalc.value = grossTotInc;
					}
			//}
			/*else{
				sec80CCDempeContrsysCalc.value = parseInt('0',10);
			}*/
		
		}  
		}else {sec80CCDempeContrsysCalc.value= parseInt('0',10);
	}
		sec80CCDempeContrsysCalc.value =Math.min(sec80CCDempeContrsysCalc.value,grossTotInc);
	// CHECK FOR 80D	
	var age = calcAge();
	if( parseInt(grossTotInc ,10) >0 ){
	if((residentialStatus== 'RES' || residentialStatus== 'NOR') && age > eval('59')){
		if( parseInt(sec80D,10) > eval('60000')){
			sec80DsysCalc.value = '60000';
		} else {
			sec80DsysCalc.value =  parseInt(sec80D,10);
		}
	}else {
		if( parseInt(sec80D,10) > eval('55000')){
			sec80DsysCalc.value = '55000';
		} else {
			sec80DsysCalc.value = parseInt(sec80D,10);
		}
	}
	
	if(parseInt(grossTotInc ,10) < sec80DsysCalc.value){
		sec80DsysCalc.value = grossTotInc;
	}
	
	} else {
		sec80DsysCalc.value= parseInt('0',10);
	}

	// CHECK FOR 80DD
	if( parseInt(grossTotInc ,10) >0 ){
		if(residentialStatus =='RES' || residentialStatus =='NOR'){
			if( parseInt(sec80DD,10) > parseInt('125000' ,10)){
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

	// CHECK FOR 80DDB	
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
	

	// CHECK FOR 80E
	if( parseInt(grossTotInc ,10) >0 ){
	if(eval(parseInt(coalesce(grossTotInc),10)>parseInt(sec80E,10))){
			sec80EsysCalc.value = parseInt(sec80E,10);
		}else{
			sec80EsysCalc.value = parseInt(coalesce(grossTotInc),10);
		}
		if(parseInt(grossTotInc ,10) < sec80EsysCalc.value){
					sec80EsysCalc.value = grossTotInc;
		}
		} else {
	sec80EsysCalc.value= parseInt('0',10);
	}
	
	
	
	// AUTOPOPULATE 80G
	var sec80Geligdonations = document.getElementsByName('itr1.schedule80G.totalEligibleDonationsUs80G')[0].value;
	if( parseInt(grossTotInc ,10) >0 ){
	sec80G.value = parseInt(sec80Geligdonations,10);
	} else {
	sec80G.value= parseInt('0',10);
	}
	
	if( parseInt(grossTotInc ,10) >0 ){
	sec80GsysCalc.value = parseInt(sec80Geligdonations,10);
		if(parseInt(grossTotInc ,10) < sec80GsysCalc.value){
			sec80GsysCalc.value = grossTotInc;
		}
	} else {
	sec80GsysCalc.value= parseInt('0',10);
	}


	// CHECK FOR 80GGA
	if( parseInt(grossTotInc ,10) >0 ){
	sec80GGAsysCalc.value = (eval(parseInt(sec80GGA,10)>=grossTotInc))?(parseInt(coalesce(grossTotInc),10)):(parseInt(isNVL(sec80GGA),10));
	
	} else {
	sec80GGAsysCalc.value= parseInt('0',10);
	}
	// CHECK FOR 80GGC
	if( parseInt(grossTotInc ,10) >0 ){
	sec80GGCsysCalc.value =  (eval(parseInt(isNVL(sec80GGC),10)>=grossTotInc))?(parseInt(coalesce(grossTotInc),10)):(parseInt(isNVL(sec80GGC),10));
	} else {
	sec80GGCsysCalc.value= parseInt('0',10);
	}
	
	
	// CHECK FOR 80U
	if( parseInt(grossTotInc ,10) >0 ){
	if(residentialStatus ==='RES' || residentialStatus ==='NOR'){
		if( parseInt(isNVL(sec80U),10) > eval('125000')){
			sec80UsysCalc.value = '125000';
		} else {
			sec80UsysCalc.value = parseInt(isNVL(sec80U),10);
		}
		if(parseInt(grossTotInc ,10) < sec80UsysCalc.value){
			sec80UsysCalc.value = grossTotInc;
		}
	}else {
		sec80UsysCalc.value = parseInt('0',10);
	}
	} else {
	sec80UsysCalc.value= parseInt('0',10);
	}
	
	// CHECK FOR 80CCG
	if( parseInt(grossTotInc ,10) >0 ){
	 sec80CCGsysCalc.value = (residentialStatus=='RES' || residentialStatus=='NOR')?((grossTotInc <= parseInt('1200000',10))?((parseInt(isNVL(sec80CCG),10) > parseInt('25000',10))? parseInt('25000',10):parseInt(isNVL(sec80CCG),10)) : parseInt('0',10)) : parseInt('0',10) ;		
	 if((sec80CCGsysCalc.value>0)&&(parseInt(grossTotInc ,10) < sec80CCGsysCalc.value)){
			sec80CCGsysCalc.value = grossTotInc;
		}
	 } else {
	sec80CCGsysCalc.value= parseInt('0',10);
	} 
	// CHECK FOR 80RRB
	if( parseInt(grossTotInc ,10) >0 ){
	sec80RRBsysCalc.value = (residentialStatus=='RES' || residentialStatus=='NOR')?( (parseInt(isNVL(sec80RRB),10)<parseInt('300000',10))? (parseInt(sec80RRB,10)) : (parseInt('300000',10))) : parseInt('0',10) ;		
	if((sec80RRBsysCalc.value>0)&&(parseInt(grossTotInc ,10) < sec80RRBsysCalc.value)){
			sec80RRBsysCalc.value = grossTotInc;
		}
	} else {
	sec80RRBsysCalc.value= parseInt('0',10);
	} 
	// CHECK FOR 80QQB
	if( parseInt(grossTotInc ,10) >0 ){
	sec80QQBsysCalc.value = (residentialStatus=='RES' || residentialStatus=='NOR')?( (parseInt(isNVL(sec80QQB),10)<parseInt('300000',10))? (parseInt(sec80QQB,10)) : (parseInt('300000',10))) : parseInt('0',10) ;		
	if((sec80QQBsysCalc.value>0)&&(parseInt(grossTotInc ,10) < sec80QQBsysCalc.value)){
			sec80QQBsysCalc.value = grossTotInc;
		}
	} else {
	sec80QQBsysCalc.value= parseInt('0',10);
	} 
	// CHECK FOR 80TTA

	
	var incOs = document.getElementsByName('itr1.itr1IncomeDeductions.incomeOthSrc')[0].value;
	if( parseInt(grossTotInc ,10) >0 ){
		if(parseInt(isNVL(sec80TTA),10) > parseInt('0',10)){
			sec80TTAsysCalc.value=Math.min(parseInt(incOs,10),parseInt(grossTotInc ,10),10000,parseInt(isNVL(sec80TTA),10));
		} else{
			sec80TTAsysCalc.value= parseInt('0',10);
		}
	} else {
		sec80TTAsysCalc.value= parseInt('0',10);
	}
	
	checkSum80C80CCC();
	sumUserEntrdDed();
	sec80GGsysCalc.value=0;
	sumDeductionsWithout80GG(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCD1BsysCalc,sec80CCDempeContrsysCalc,
					sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
					sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
					sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc);

	// CHECK FOR 80GG again
	
	var totInc = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0];
	if(totInc.value > 0){
	totInc.value = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0].value;
	} 

	var oneFrthTI =  Math.round(eval(totInc.value) * eval(0.25));
	
	if(eval(oneFrthTI) < eval('24000')) {
		if(eval(sec80GG) > eval(oneFrthTI)){
			sec80GGsysCalc.value = eval(oneFrthTI);
		} else {
			sec80GGsysCalc.value = sec80GG;
		}
	} else{
		if(eval(sec80GG) > eval('24000')){
			sec80GGsysCalc.value = eval('24000');
		}else {
			sec80GGsysCalc.value = sec80GG;
		}
	}
	
	if( parseInt(grossTotInc ,10) >0 ){
	sec80GGsysCalc.value = (sec80GGsysCalc.value < eval('0')) ? parseInt('0',10): (sec80GGsysCalc.value) ;
	if(parseInt(grossTotInc ,10) < sec80GGsysCalc.value){
			sec80GGsysCalc.value = grossTotInc;
		}
	} else {
	sec80GGsysCalc.value= parseInt('0',10);
	}

	
	if(gIncome< eval('0')){
		
		sec80CCDemprContrsysCalc.value=parseInt('0',10);
		sec80QQBsysCalc.value =parseInt('0',10);
		sec80RRBsysCalc.value=parseInt('0',10);
		sec80CCGsysCalc.value=parseInt('0',10);
		sec80UsysCalc.value =parseInt('0',10);
		sec80GGCsysCalc.value=parseInt('0',10);
		sec80GGAsysCalc.value=parseInt('0',10);
		sec80GsysCalc.value=parseInt('0',10);
		sec80EsysCalc.value=parseInt('0',10);
		sec80DDBsysCalc.value=parseInt('0',10);
		sec80DDsysCalc.value=parseInt('0',10);
		sec80DsysCalc.value=parseInt('0',10);
		sec80CCDempeContrsysCalc.value=parseInt('0',10);
		sec80CCD1BsysCalc.value=parseInt('0',10);
		sec80CCCsysCalc.value=parseInt('0',10);
		sec80CsysCalc.value=parseInt('0',10);
		sec80QQBsysCalc.value=parseInt('0',10);
		sec80TTAsysCalc.value=parseInt('0',10);
		sec80GGsysCalc.value= parseInt('0',10);
	}
	

	// Do the sum of deductions again after adding 80GG and 80G
	 sumDeductions(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCD1BsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
		sec80GGsysCalc,sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc);
}

//To calculate sum of Deductions entered by user
function sumUserEntrdDed() {

var sec80C = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80C_Usr')[0] ; sec80C.value = coalesce(sec80C.value);
var sec80CCC = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC_Usr')[0] ;sec80CCC.value = coalesce(sec80CCC.value);
var sec80CCDempeContr = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD_Usr')[0] ;sec80CCDempeContr.value = coalesce(sec80CCDempeContr.value);
var sec80CCDemprContr = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer_Usr')[0] ;sec80CCDemprContr.value = coalesce(sec80CCDemprContr.value);
var sec80D = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80D_Usr')[0] ;sec80D.value = coalesce(sec80D.value);
var sec80DD = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD_Usr')[0] ;sec80DD.value = coalesce(sec80DD.value);
var sec80DDB = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr')[0] ;sec80DDB.value = coalesce(sec80DDB.value);
var sec80E = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80E_Usr')[0] ;sec80E.value = coalesce(sec80E.value);
var sec80G = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80G_Usr')[0];sec80G.value = coalesce(sec80G.value);
var sec80GG = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG_Usr')[0] ;sec80GG.value = coalesce(sec80GG.value);
var sec80GGA = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA_Usr')[0] ;sec80GGA.value = coalesce(sec80GGA.value);
var sec80GGC = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC_Usr')[0] ;sec80GGC.value = coalesce(sec80GGC.value);
var sec80U = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80U_Usr')[0] ;sec80U.value = coalesce(sec80U.value);
var sec80CCG = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG_Usr')[0]; sec80CCG.value = coalesce(sec80CCG.value);
var sec80RRB = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB_Usr')[0]; sec80RRB.value = coalesce(sec80RRB.value);
var sec80QQB = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB_Usr')[0]; sec80QQB.value = coalesce(sec80QQB.value);
var sec80TTA = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA_Usr')[0]; sec80TTA.value = coalesce(sec80TTA.value);
var sec80CCD1B = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B_Usr')[0]; sec80CCD1B.value = coalesce(sec80CCD1B.value);

	var userEntrdDed = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.totalChapVIADeductions_Usr')[0];
	userEntrdDed.value = eval(parseInt(sec80C.value ,10))+
						 eval(parseInt(sec80CCC.value ,10))+
						 eval(parseInt(sec80CCDempeContr.value ,10))+
						 eval(parseInt(sec80CCDemprContr.value ,10))+
						 eval(parseInt(sec80D.value ,10))+
						 eval(parseInt(sec80DD.value ,10))+
						 eval(parseInt(sec80DDB.value ,10))+
						 eval(parseInt(sec80E.value ,10))+
						 eval(parseInt(sec80G.value ,10))+
						 eval(parseInt(sec80GG.value ,10))+
						 eval(parseInt(sec80GGA.value ,10))+
						 eval(parseInt(sec80GGC.value ,10))+
						 eval(parseInt(sec80U.value ,10))+
						 eval(parseInt(sec80CCG.value ,10))+
						 eval(parseInt(sec80RRB.value ,10))+
						 eval(parseInt(sec80QQB.value ,10))+
						 eval(parseInt(sec80TTA.value ,10))+
	                     eval(parseInt(sec80CCD1B.value ,10));
	
						 }


//To calculate sum of 80G sections
function checkSum80C80CCC(){
	var sec80CsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80C')[0];
	var sec80CCCsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCC')[0];
	var sec80CCDempeContrsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCD')[0];
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

//to get Max Limit Amount
function getMaxLimitAmount() {
	var gtaAmount = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value;
	var maxAmount = eval('150000');
	if(gtaAmount >= eval('150000')) {
		return maxAmount;
	} else {
		return gtaAmount;
	}
	
}

//To calculate sum of Deductions Without 80GG
function sumDeductionsWithout80GG(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCD1BsysCalc
,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
		sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc){

	sec80CsysCalc.value 			= coalesce(sec80CsysCalc.value); 				sec80CCCsysCalc.value			= coalesce(sec80CCCsysCalc.value);
	sec80CCDemprContrsysCalc.value 	= coalesce(sec80CCDemprContrsysCalc.value); 	sec80CCDempeContrsysCalc.value 	= coalesce(sec80CCDempeContrsysCalc.value);
	sec80CCD1BsysCalc.value 	= coalesce(sec80CCD1BsysCalc.value); 
	sec80DsysCalc.value 	= coalesce(sec80DsysCalc.value); 
	sec80DDsysCalc.value 			= coalesce(sec80DDsysCalc.value); 				sec80DDBsysCalc.value			= coalesce(sec80DDBsysCalc.value);
	sec80EsysCalc.value 			= coalesce(sec80EsysCalc.value); 				sec80GsysCalc.value 			= coalesce(sec80GsysCalc.value);
	sec80GGAsysCalc.value 			= coalesce(sec80GGAsysCalc.value);
	sec80GGCsysCalc.value 			= coalesce(sec80GGCsysCalc.value); 				sec80UsysCalc.value 			= coalesce(sec80UsysCalc.value);
	sec80CCGsysCalc.value 			= coalesce(sec80CCGsysCalc.value);				sec80RRBsysCalc.value 			= coalesce(sec80RRBsysCalc.value);
	sec80QQBsysCalc.value 			= coalesce(sec80QQBsysCalc.value);				sec80TTAsysCalc.value 			= coalesce(sec80TTAsysCalc.value);

	var dedVIA = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];
	
	var temp2 = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDemprContrsysCalc.value) +
				eval(sec80CCDempeContrsysCalc.value) + eval(sec80CCD1BsysCalc.value) + eval(sec80DsysCalc.value) +
				eval(sec80DDsysCalc.value) + eval(sec80DDBsysCalc.value) + eval(sec80EsysCalc.value) +
				eval(sec80GsysCalc.value) + eval(sec80GGAsysCalc.value) +
				eval(sec80GGCsysCalc.value)+ eval(sec80UsysCalc.value)+ eval(sec80CCGsysCalc.value)+ eval(sec80RRBsysCalc.value)+ 
				eval(sec80QQBsysCalc.value)+ eval(sec80TTAsysCalc.value);

	var grossTotInc = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0]; grossTotInc.value = coalesce(grossTotInc.value);
		
	if(grossTotInc.value > parseInt('0',10)){		
		if( temp2 >  parseInt(grossTotInc.value ,10)){
			dedVIA.value = parseInt(grossTotInc.value ,10);
		} else{
			dedVIA.value = temp2;
		}
	}else{
		dedVIA.value = temp2;
	}
	
	var totInc = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0];
	totInc.value = Math.round(eval(parseInt(coalesce(grossTotInc.value) ,10) - parseInt(coalesce(dedVIA.value) ,10)));
}

//To calculate sum of dedections
function sumDeductions(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80CCD1BsysCalc,sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
		sec80GGsysCalc,sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc){

	sec80CsysCalc.value 			= coalesce(sec80CsysCalc.value); 				sec80CCCsysCalc.value			= coalesce(sec80CCCsysCalc.value);
	sec80CCDemprContrsysCalc.value 	= coalesce(sec80CCDemprContrsysCalc.value); 	sec80CCDempeContrsysCalc.value 	= coalesce(sec80CCDempeContrsysCalc.value);
	sec80CCD1BsysCalc.value 	= coalesce(sec80CCD1BsysCalc.value); 	sec80CCD1BsysCalc.value 	= coalesce(sec80CCD1BsysCalc.value);

	sec80DsysCalc.value 			= coalesce(sec80DsysCalc.value);
	sec80DDsysCalc.value 			= coalesce(sec80DDsysCalc.value); 				sec80DDBsysCalc.value			= coalesce(sec80DDBsysCalc.value);
	sec80EsysCalc.value 			= coalesce(sec80EsysCalc.value); 				sec80GsysCalc.value 			= coalesce(sec80GsysCalc.value);
	sec80GGsysCalc.value 			= coalesce(sec80GGsysCalc.value); 				sec80GGAsysCalc.value 			= coalesce(sec80GGAsysCalc.value);
	sec80GGCsysCalc.value 			= coalesce(sec80GGCsysCalc.value); 				sec80UsysCalc.value 			= coalesce(sec80UsysCalc.value);
	sec80CCGsysCalc.value 			= coalesce(sec80CCGsysCalc.value);				sec80RRBsysCalc.value 			= coalesce(sec80RRBsysCalc.value);
	sec80QQBsysCalc.value 			= coalesce(sec80QQBsysCalc.value);				sec80TTAsysCalc.value 			= coalesce(sec80TTAsysCalc.value);
	var dedVIA = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];
	
	var temp2 = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDemprContrsysCalc.value) +eval(sec80CCD1BsysCalc.value) +
				eval(sec80CCDempeContrsysCalc.value) + eval(sec80DsysCalc.value) +
				eval(sec80DDsysCalc.value) + eval(sec80DDBsysCalc.value) + eval(sec80EsysCalc.value) +
				eval(sec80GsysCalc.value) + eval(sec80GGsysCalc.value) + eval(sec80GGAsysCalc.value) +
				eval(sec80GGCsysCalc.value)+ eval(sec80UsysCalc.value)+ eval(sec80CCGsysCalc.value)+ eval(sec80RRBsysCalc.value)+ 
				eval(sec80QQBsysCalc.value)+ eval(sec80TTAsysCalc.value);

	var grossTotInc = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0]; grossTotInc.value = coalesce(grossTotInc.value);
	
	
	
	if(grossTotInc.value > parseInt('0',10)){		
		if( temp2 >  parseInt(grossTotInc.value ,10)){
			dedVIA.value = parseInt(grossTotInc.value ,10);
		} else{
			dedVIA.value = temp2;
		}
	}else{
		dedVIA.value = temp2;
	}
	calcTI();
}

//to calculate Part B TI
function calcTI(){

	var dedVIA = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];  dedVIA.value = coalesce(dedVIA.value);
	var totInc = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0];	totInc.value = coalesce(totInc.value);
	var grossInc = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value; 
	
	if(eval(parseInt(coalesce(grossInc),10) > parseInt(dedVIA.value,10))){
		totInc.value = eval(coalesce(grossInc)) - eval(dedVIA.value);
	}

	// Rounding of to nearest multiple of 10
	 totInc.value= eval(Math.round(eval(totInc.value)/10)*parseInt('10' ,10));


	calcTaxPayableOnTI();

	
	var rebate87A = document.getElementsByName('itr1.itr1TaxComputationOnline.rebate87A')[0];
	var resStatus = document.getElementsByName('itr1.filingStatus.residentialStatus')[0].value;
	var taxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalTaxPayable')[0].value;
	var taxPayableOnRebate = document.getElementsByName('itr1.itr1TaxComputationOnline.taxPayableOnRebate')[0]; 
	
	if((resStatus=='RES'||resStatus=='NOR') && totInc.value<=500000){
		rebate87A.value = Math.min(parseInt(taxPayable,10),2000);
	} else {
	    rebate87A.value = parseInt('0' ,10);
	}
	
	
	taxPayableOnRebate.value = taxPayable-(rebate87A.value);
	
	calsurchargeOnAboveCrore();
	}

//To calculate surcharge On Above Crore
function calsurchargeOnAboveCrore(){
var taxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalTaxPayable')[0];
var surchargeOnAboveCrore = document.getElementsByName('itr1.itr1TaxComputationOnline.surchargeOnAboveCrore')[0];
var totInc = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0];	totInc.value = coalesce(totInc.value);
var resStatus=document.getElementsByName('itr1.filingStatus.residentialStatus')[0].value;
var age = calcAge(); 
// for surcharge
			var taxOnTotInc =  parseInt(taxPayable.value,10);
			var taxOnCutOffInc;
			
			if((resStatus == 'RES' || resStatus=='NOR') && (age> eval(59) && age <= eval(79))){
			taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 120000);
			} else if( (resStatus == 'RES' || resStatus=='NOR') &&  ( eval(age)> eval(79))){
			taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 100000);
			} else {
				taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 125000);
			}

			if( rndOffNrsTen(totInc.value) > 10000000 ){
				var tempSurcharge = taxOnTotInc  * 0.12 ;
				
				//check if eligible for marginal relief
				var extraInc = rndOffNrsTen(totInc.value) - 10000000;
				if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc)){
					var marginalRelief = taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc );
					surchargeOnAboveCrore.value = tempSurcharge - marginalRelief;
					surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
					
				}else {
					surchargeOnAboveCrore.value = tempSurcharge;
					surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
					}
			} else {
				 surchargeOnAboveCrore.value = parseInt('0' ,10);
			}
}

//Tax calculation according to tax slabs
function calcTaxPayableOnTI(){

 var totInc = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0];
 var taxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalTaxPayable')[0];

 var age = calcAge();

 
 var resStatus=document.getElementsByName('itr1.filingStatus.residentialStatus')[0].value;
 	
	if((resStatus == 'RES' || resStatus == 'NOR') && ( eval(age)> eval(59) ) &&  (eval(age) <= eval(79))){
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
	} else if( (resStatus == 'RES' || resStatus == 'NOR') &&  ( eval(age)> eval(79))){
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
	}else {
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

//To calculate Education Cess
function calcEduCess(){

	var taxPayableOnRebate = document.getElementsByName('itr1.itr1TaxComputationOnline.taxPayableOnRebate')[0].value; 
	var surchargeOnAboveCrore = document.getElementsByName('itr1.itr1TaxComputationOnline.surchargeOnAboveCrore')[0].value;
	var eduCess = document.getElementsByName('itr1.itr1TaxComputationOnline.educationCess')[0];
	eduCess.value = (eval(coalesce(taxPayableOnRebate))+eval(coalesce(surchargeOnAboveCrore)))* eval('0.03');
	eduCess.value  = Math.round(eduCess.value);

	calcBalTaxPay();

}

//To calculate Balance Tax Pay
function calcBalTaxPay(){

	var sec89 = document.getElementsByName('itr1.itr1TaxComputationOnline.section89')[0]; sec89.value = coalesce(sec89.value);
	var taxPayableOnRebate = document.getElementsByName('itr1.itr1TaxComputationOnline.taxPayableOnRebate')[0];
	var surchargeOnAboveCrore = document.getElementsByName('itr1.itr1TaxComputationOnline.surchargeOnAboveCrore')[0];
	var eduCess = document.getElementsByName('itr1.itr1TaxComputationOnline.educationCess')[0]; eduCess.value = coalesce(eduCess.value);
	var totTaxWithEduCess = document.getElementsByName('itr1.itr1TaxComputationOnline.grossTaxLiability')[0];
	totTaxWithEduCess.value= eval(parseInt(eduCess.value,10)) + eval(parseInt(taxPayableOnRebate.value,10))+ eval(parseInt(surchargeOnAboveCrore.value,10));
	var balTaxPay = document.getElementsByName('itr1.itr1TaxComputationOnline.netTaxLiability')[0];
	balTaxPay.value= Math.round(eval(parseInt(totTaxWithEduCess.value ,10))-eval(parseInt(sec89.value ,10)));
	if(balTaxPay.value < eval('0')) {
		balTaxPay.value = '0';
	}


	calcInterestPayable();

	calcIntrstPayable();
}

//To calculate Interrst Payable
function calcIntrstPayable(){

	
	var balTaxPay = document.getElementsByName('itr1.itr1TaxComputationOnline.netTaxLiability')[0]; balTaxPay.value = coalesce(balTaxPay.value);
	var totIntrstPay = document.getElementsByName('itr1.itr1TaxComputationOnline.totalIntrstPay')[0]; totIntrstPay.value = coalesce(totIntrstPay.value);
	var totTaxIntrstPay = document.getElementsByName('itr1.itr1TaxComputationOnline.totTaxPlusIntrstPay')[0]; totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);

	totTaxIntrstPay.value = eval(balTaxPay.value) + eval(totIntrstPay.value);
	calcTaxPayable15Minus17();
}

function deleteRowTaxDedTDSPage(tableId , noOfHeader , noOfFooter) {
	
	deleteRowTable(tableId , noOfHeader , noOfFooter);
	calcInterestPayable();
	calcTaxPayable15Minus17();
}

function addRowToTablePage5Donations (tableId,noOfRow,last){

	addRowToTable(tableId,noOfRow,last);
	allRowsForPage5Donations (tableId,noOfRow,last);

}

function addRowToTablePage3(tableId,noOfRow,last){

	addRowToTable(tableId,noOfRow,last);
	calcInterestPayable();
	calcGrossTotIncome();
}

/* Delete Row Function for Schedule 80G Donations. */
function deleteRowToTablePage5Donations(tableId,noOfRow,last){

	deleteRowTaxDedTDSPage(tableId,noOfRow,last);
	allRowsForPage5Donations(tableId,noOfRow,last);
}

/* Add Row Functions for all Parts of Schedule 80G */
function allRowsForPage5Donations (tableId,noOfRow,last)  {

	allRowsForPage5DonationsSaras(tableId,0,0);
	allRowsForPage5DonationsSaras('ded100PerWithoutQual',0,0);
	allRowsForPage5DonationsSaras('ded50WithoutQual',0,0);
	allRowsForPage5DonationsSaras('ded100Qual',0,0);
	allRowsForPage5DonationsSaras('ded50WithQual',0,0);

}

function onchangeDed(){
	allRowsForPage5DonationsSaras('ded100PerWithoutQual',0,0);
	allRowsForPage5DonationsSaras('ded50WithoutQual',0,0);
	allRowsForPage5DonationsSaras('ded100Qual',0,0);
	allRowsForPage5DonationsSaras('ded50WithQual',0,0);
}

/* Calculate Tax for Schedule 80G. */
function allRowsForPage5DonationsSaras (tableId,noOfRow,last)  {
	 try {
		 
		 	var residue50Perc;
		 	var qualifyingLimit;
			var grossTotalIncome = coalesce(document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value);

			 if( parseInt(grossTotalIncome ,10) <0 ){
				 grossTotalIncome = parseInt(0,10);
				}
			
			
			var sys80G = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80G')[0]; sys80G.value = coalesce(sys80G.value);
			var sys80GG = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80GG')[0]; sys80GG.value = coalesce(sys80GG.value);
			var usr80GG = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG_Usr')[0]; usr80GG.value = coalesce(usr80GG.value);
			var deductionsSysTotal =  document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0]; deductionsSysTotal.value = coalesce(deductionsSysTotal.value);

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
			
			 adjstGTI = eval(parseInt(grossTotalIncome ,10) - (parseInt(deductionsSysTotal.value ,10) - parseInt(sys80G.value ,10) - parseInt(sys80GG.value ,10) + parseInt(usr80GG.value ,10)));
			 
			}
			qualifyingLimit = eval(parseInt(adjstGTI ,10) * parseFloat('0.10'));
			 
			 
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

			var totEligAmtTableC = document.getElementsByName('itr1.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0]; totEligAmtTableC.value = coalesce(totEligAmtTableC.value);
			var residue;
			if(parseInt(qualifyingLimit , 10) > parseInt(totEligAmtTableC.value , 10)) {
					residue = eval( parseInt(qualifyingLimit , 10) - parseInt(totEligAmtTableC.value , 10) );
				} else {
					residue = parseInt('0' ,10) ;
				}

			 residue50Perc = eval( parseInt(residue , 10) * parseFloat('0.50') );
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
			alert ('Exception in allRowsForPage5DonationsSaras method :- ' + e.stack);
		}
}

//to calculate Table Total Eligible Amount
function calcTableTotEligAmt(tableId,qualifyingLimit,residue50Perc){

		var tab = document.getElementById(tableId);
		var allInputTags = tab.getElementsByTagName('input');
		var sumOfAll = parseInt('0' ,10);
		var sumOfAlluserEntredValue = parseInt('0' ,10);
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("eligibleDonationAmt$")) {
					sumOfAll = eval ( parseInt(sumOfAll ,10) + parseInt( allInputTags[i].value ,10) );
					sumOfAlluserEntredValue = eval ( parseInt(sumOfAlluserEntredValue ,10) + parseInt( coalesce(allInputTags[i-1].value) ,10) );
				}
			}

		var grossTotalIncome = coalesce(document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value);
		
		 if( parseInt(grossTotalIncome ,10) <0 ){
			 grossTotalIncome = parseInt(0,10);
			}
		
		if( parseInt(sumOfAll ,10) > parseInt(grossTotalIncome ,10)) {
			sumOfAll = grossTotalIncome;
		}

		if(tableId == 'ded100PerWithoutQual'){
				var temp1 = document.getElementsByName('itr1.schedule80G.don100Percent.totEligibleDon100Percent')[0] ;
				var temp2 = document.getElementsByName('itr1.schedule80G.don100Percent.totDon100Percent')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
			}
		else if(tableId == 'ded50WithoutQual'){
				var temp1 = document.getElementsByName('itr1.schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0] ;
				var temp2 = document.getElementsByName('itr1.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
			}
		else if(tableId == 'ded100Qual'){
				var temp1 = document.getElementsByName('itr1.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0] ;
				var temp2 = document.getElementsByName('itr1.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
				
				if(parseInt(temp1.value ,10) > parseInt(qualifyingLimit ,10)){
					
					temp1.value=parseInt(qualifyingLimit ,10);;
				}
				
		}
		else if(tableId == 'ded50WithQual'){
				var temp1 = document.getElementsByName('itr1.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0] ;
				var temp2 = document.getElementsByName('itr1.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0] ;
				temp1.value = parseInt(sumOfAll ,10);
				temp2.value = parseInt(sumOfAlluserEntredValue ,10);
				
				if(parseInt(temp1.value ,10) > parseInt(residue50Perc ,10)){
					
					temp1.value=parseInt(residue50Perc ,10);;
				}
		}

		calcUserDonations80G();
		calcDonationsEligb();
	}

//To calculate User Donations under 80G
function calcUserDonations80G(){
 var tot80GAuserEntrd =  document.getElementsByName('itr1.schedule80G.don100Percent.totDon100Percent')[0]; tot80GAuserEntrd.value = coalesce(tot80GAuserEntrd.value);
 var tot80GBuserEntrd =  document.getElementsByName('itr1.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0]; tot80GBuserEntrd.value = coalesce(tot80GBuserEntrd.value);
 var tot80GCuserEntrd =  document.getElementsByName('itr1.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0]; tot80GCuserEntrd.value = coalesce(tot80GCuserEntrd.value);
 var tot80GDuserEntrd =  document.getElementsByName('itr1.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0]; tot80GDuserEntrd.value = coalesce(tot80GDuserEntrd.value);
 var tot80GDonuserEntrd =  document.getElementsByName('itr1.schedule80G.totalDonationsUs80G')[0]; tot80GDonuserEntrd.value = coalesce(tot80GDonuserEntrd.value);

 tot80GDonuserEntrd.value = eval(tot80GAuserEntrd.value)+ eval(tot80GBuserEntrd.value)+ eval(tot80GCuserEntrd.value)+ eval(tot80GDuserEntrd.value) ;

}

//To calculate Donations eligibility
function calcDonationsEligb(){
 var tot80GAelig =  document.getElementsByName('itr1.schedule80G.don100Percent.totEligibleDon100Percent')[0]; tot80GAelig.value = coalesce(tot80GAelig.value);
 var tot80GBelig =  document.getElementsByName('itr1.schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0]; tot80GBelig.value = coalesce(tot80GBelig.value);
 var tot80GCelig =  document.getElementsByName('itr1.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0]; tot80GCelig.value = coalesce(tot80GCelig.value);
 var tot80GDelig =  document.getElementsByName('itr1.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0]; tot80GDelig.value = coalesce(tot80GDelig.value);
 var tot80GDonelig =  document.getElementsByName('itr1.schedule80G.totalEligibleDonationsUs80G')[0]; tot80GDonelig.value = coalesce(tot80GDonelig.value);

 tot80GDonelig.value = eval(tot80GAelig.value)+ eval(tot80GBelig.value)+ eval(tot80GCelig.value)+ eval(tot80GDelig.value) ;
 var grossTotalIncome = coalesce(document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value);
 
 if( parseInt(grossTotalIncome ,10) <0 ){
	 grossTotalIncome = parseInt(0,10);
	}
 
 if( parseInt(grossTotalIncome ,10) <  parseInt(tot80GDonelig.value ,10)) {
		tot80GDonelig.value = parseInt(grossTotalIncome ,10);
   }
   calcGrossTotIncome();
}

//To calculate Interest Payable
function calcInterestPayable(){

		var advanceTaxToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
		var TDSToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
		var SATtoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);
		var TCStoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tcs')[0];  TCStoDisplay.vaue = coalesce(TCStoDisplay.value);

		var balTaxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.netTaxLiability')[0]; balTaxPayable.value = coalesce(balTaxPayable.value);
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
						allInputTags[i].value = parseInt('0' ,10);
						TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					} else{
						TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}
				}
			}
	
			

		var portuVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
		var tab2 = document.getElementById('taxDedSourceSrc');
		var allInputTags = tab2.getElementsByTagName('input');

		if(portuVal=='N'){
			for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$") && allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 6 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 6 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}else{							
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}
					}
				}
		} else {
		
			for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$") && allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10) + parseInt(coalesce(allInputTags[i+1].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 6+Col 7 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 6+Col 7 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);
							allInputTags[i+1].value = parseInt('0',10);
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}else{							
							TDS = eval(parseInt(TDS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
						}
					}
				}
			}
		TDSToDisplay.value = parseInt(TDS,10);
		
		var TCS = parseInt('0' ,10);
		var tcsTAB = document.getElementById('scheduleTCS');
		var allInputTags = tcsTAB.getElementsByTagName('input');
		if(portuVal=='N'){
			for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("amtTCSClaimedThisYear$") && allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
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
							addError(allInputTags[i],'Amount claimed in Col 5+Col 6cannot exceed Total tax collected',true);
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
		calculateTotalTaxTCS('scheduleTCS');
		var totalTCS = document.getElementsByName('itr1.scheduleTCS.totalTcSSalary')[0].value;
		TCStoDisplay.value = parseInt(totalTCS,10);
		TCS = parseInt(totalTCS,10);


		var tab3 = document.getElementById('taxDedSelf');
		var allInputTags = tab3.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			if(allInputTags[i].name.match("dateDep$")){
				if(checkFirstDateBefore(FY_start_date , allInputTags[i].value) && checkFirstDateBefore(allInputTags[i].value , FY_end_date)){
						advanceTax = eval( parseInt(isNVL(advanceTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
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
		if(parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS ,10)- parseInt(TCS ,10) -parseInt(selfAssessmentTax234A,10) < 0){
			intrst234Aprinciple = parseInt('0' ,10);
		}else {
			intrst234Aprinciple = parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS ,10)- parseInt(TCS ,10)-parseInt(selfAssessmentTax234A,10);
			// Rounding off to previous hundered
			if(parseInt(intrst234Aprinciple,10) > 100){
				intrst234Aprinciple= Math.floor(parseInt(intrst234Aprinciple,10)/100)*parseInt('100' ,10);
			}
		}

		var currentDate = document.getElementsByName('itr1.verification.date')[0].value;
		
		var MonthsAfterDueDate;
		if(checkFirstDateBefore(currentDate, getCurrentDate())){
			currentDate = getCurrentDate();
		}
		MonthsAfterDueDate =  calcNoOfMonths(currentDate , Int_start_date_234A);		
		if(document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value=='17' && 
			document.getElementsByName('itr1.filingStatus.returnType')[0].value=='R'){
			
			var origDate = document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].value;		
			if(origDate!=null && origDate!=undefined  && origDate!=''){
				MonthsAfterDueDate =  calcNoOfMonths(origDate , Int_start_date_234A); 	// for Revised return take date of original filling
			}else{
				MonthsAfterDueDate =  0;
			}
		}
		
		if(document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value=='18'){
			
			var origDate = document.getElementsByName('itr1.filingStatus.noticeDate')[0].value;		
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
		
		var state = document.getElementsByName('itr1.personalInfo.address.stateCode')[0];

		if(state.value== '25' || state.value == '29'){
			
			slab2_end_date='31/12/2015';
			slab3_start_date='01/01/2016';
			
		}else{
			
			var slab2_end_date = '15/12/2015';
			var slab3_start_date = '16/12/2015';
		}
		
			var tab4 = document.getElementById('taxDedSelf');
			var allInputTags = tab4.getElementsByTagName('input');
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("dateDep$")) {

					if(checkFirstDateBefore(FY_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab1_end_date ) ){						
						slab1 = eval(parseInt(slab1 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					else if(checkFirstDateBefore(slab2_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab2_end_date ) ){						
						slab2 = eval(parseInt(slab2 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					else if(checkFirstDateBefore(slab3_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab3_end_date ) ){						
						slab3 = eval(parseInt(slab3 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
				}
			}


		var intrst234Ci = parseInt('0' ,10);
		var intrst234Cii = parseInt('0' ,10);
		var intrst234Ciii = parseInt('0' ,10);
		var advanceTaxToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
		var TDSToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
		var SATtoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);

		var balTaxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.netTaxLiability')[0]; balTaxPayable.value = coalesce(balTaxPayable.value);
		if(( eval(parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) >=  parseInt('10000',10))){

			if(parseInt(slab1 ,10) < eval((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.3'))){
				var tempintrst234Ci = (((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10) ) * parseFloat('0.30')) - parseInt(slab1 ,10));

				if(parseInt(tempintrst234Ci,10) > 100){
					tempintrst234Ci= Math.floor(parseInt(tempintrst234Ci,10)/100)*parseInt('100' ,10);
				}
				intrst234Ci=parseInt(tempintrst234Ci,10)* parseFloat('0.01') * parseInt('3' ,10) ;

			}
			
			if(eval(parseInt(slab1 ,10) + parseInt(slab2 ,10)) < eval((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.6') )){
				var tempintrst234Cii = (((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.6') ) -parseInt(slab1 ,10) - parseInt(slab2 ,10) );


				if(parseInt(tempintrst234Cii,10) > 100){
					tempintrst234Cii= Math.floor(parseInt(tempintrst234Cii,10)/100)*parseInt('100' ,10);
				}
				intrst234Cii=parseInt(tempintrst234Cii,10)* parseFloat('0.01') * parseInt('3' ,10) ;

			}
			
			if(eval(parseInt(slab1 ,10) + parseInt(slab2 ,10) + parseInt(slab3 ,10)) < eval((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseInt('1' ,10))){
				var tempintrst234Ciii = ((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) - parseInt(slab1 ,10)- parseInt(slab2 ,10) - parseInt(slab3 ,10) );


				if(parseInt(tempintrst234Ciii,10) > 100){
					tempintrst234Ciii= Math.floor(parseInt(tempintrst234Ciii,10)/100)*parseInt('100' ,10);
				}
				intrst234Ciii=parseInt(tempintrst234Ciii,10)* parseFloat('0.01') * parseInt('1' ,10) ;
			}			
		}
		else {
			 intrst234Ci = parseInt('0',10);
			 intrst234Cii = parseInt('0',10);
			 intrst234Ciii = parseInt('0',10);
		}

		intrst234C = eval(parseInt(intrst234Ci ,10) + parseInt(intrst234Cii ,10) + parseInt(intrst234Ciii ,10));
		var age = calcAge();
		var residentialStatus  = document.getElementsByName('itr1.filingStatus.residentialStatus')[0].value;
		
		if(eval(parseInt(age,10)>parseInt('59' ,10)) && (residentialStatus =='RES' || residentialStatus=='NOR') ){
			intrst234C=parseInt('0' ,10);	
		}

		// ===============Interest234B calculation=======================

		var intrst234Bprinciple;
		var intrst234Bi=parseInt('0',10);
		var noOfMonthsTillSelfasst= parseInt('0',10);

		if(parseInt(balTaxPayable.value,10) - parseInt(TDS,10) - parseInt(TCS ,10) >= parseInt('10000' ,10)) {
			if(parseInt(advanceTax,10) < ((parseInt(balTaxPayable.value,10) - parseInt(TDS,10) - parseInt(TCS ,10)) * parseFloat('0.90'))) {
				intrst234Bprinciple = (parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10) - parseInt(TCS ,10) );
				

				// Rounding off to previous hundered
				if(parseInt(intrst234Bprinciple,10) > 100){
					intrst234Bprinciple= Math.floor(parseInt(intrst234Bprinciple,10)/100)*parseInt('100' ,10);
				}

				//======== Interest 234B first part calc==========

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
				}else{
					noOfMonthsTillSelfasst=calcNoOfMonths(selfAsspaidDates[0],AY_start_date);
				}

				intrst234Bi= parseInt(intrst234Bprinciple,10) * parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst) ;
				
				//======== Interest 234B second part calc==========
				var intrst234Bprinciple2=parseInt('0',10);  // intrst234Bprinciple if self assesment is paid
				var selfAsspart=parseInt('0',10);
				var noOfMonthsTillSelfasst2;
				var intrst234Bii=parseInt('0',10);
				var partialSelfAssPaid=parseInt('0',10);
				var k=parseInt('0',10);
				var interestFrom;
				var interestTill;
				
				
				

				if(selfAsspaidDates.length!=0){
					
					for(var i = 0; i < selfAsspaidDates.length; i++) {
						
						partialSelfAssPaid= eval(parseInt(partialSelfAssPaid ,10) +parseInt(selfAsspaidAmts[i] ,10));

						intrst234Bprinciple2=eval(parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10) - parseInt(TCS ,10) +
								parseInt(intrst234A ,10)+parseInt(intrst234C ,10)+parseInt(intrst234Bi ,10)+parseInt(intrst234Bii ,10)
								-parseInt(partialSelfAssPaid,10));


								// Rounding off to previous hundered
						if(parseInt(intrst234Bprinciple2,10) > parseInt('100' ,10)){
							intrst234Bprinciple2= Math.floor(parseInt(intrst234Bprinciple2,10)/100)*parseInt('100' ,10);
						}
						
						else if(parseInt(intrst234Bprinciple2,10) < 0){
							intrst234Bprinciple2 = parseInt('0',10);
						}
						//calclulating remaining months to levy interest

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
						
						noOfMonthsTillSelfasst2=calcNoOfMonths(interestTill,interestFrom)-parseInt('1' ,10) ;
						if(parseInt(intrst234Bprinciple2,10) < parseInt(intrst234Bprinciple,10)){								
							intrst234Bii= eval(parseInt(intrst234Bii,10) +
								(parseInt(intrst234Bprinciple2,10) * parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst2))) ;
						}else{
							intrst234Bii= eval(parseInt(intrst234Bii,10) +
								(parseInt(intrst234Bprinciple,10) * parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst2))) ;
						}					
					}
				}

				intrst234B=eval(parseInt(intrst234Bi,10) +parseInt(intrst234Bii,10));
			}
		}else{
			intrst234B = parseInt('0' ,10);
		}
		
		if(eval(parseInt(age,10)>parseInt('59' ,10))  && (residentialStatus =='RES' || residentialStatus=='NOR') ){
			intrst234B=parseInt('0' ,10);	
		}

		var intrstPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalIntrstPay')[0]; intrstPayable.value = coalesce(intrstPayable.value);

		var input234A = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234A')[0]; input234A.value = parseInt(intrst234A ,10);
		var input234B = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234B')[0]; input234B.value = parseInt(intrst234B ,10);
		var input234C = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234C')[0]; input234C.value = parseInt(intrst234C ,10);

		intrstPayable.value = Math.round(eval(parseInt(intrst234A ,10) + parseInt(intrst234B ,10) + parseInt(intrst234C ,10)));

		var balTaxPay = document.getElementsByName('itr1.itr1TaxComputationOnline.netTaxLiability')[0]; balTaxPay.value = coalesce(balTaxPay.value);
		var totIntrstPay = document.getElementsByName('itr1.itr1TaxComputationOnline.totalIntrstPay')[0]; totIntrstPay.value = coalesce(totIntrstPay.value);
		var totTaxIntrstPay = document.getElementsByName('itr1.itr1TaxComputationOnline.totTaxPlusIntrstPay')[0]; totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);

		totTaxIntrstPay.value = eval(balTaxPay.value) + eval(totIntrstPay.value);


		calcTotTaxPaid();

}

//To calculate sum of 234A 234B 234C
function sum234A234B234C(){
	

	var intrstPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalIntrstPay')[0]; intrstPayable.value = coalesce(intrstPayable.value);

	

	var input234A = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234A')[0]; input234A.value = coalesce(input234A.value);
	var input234B = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234B')[0]; input234B.value = coalesce(input234B.value);
	var input234C = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234C')[0]; input234C.value = coalesce(input234C.value);

	intrstPayable.value =eval(Math.round(eval(input234A.value) + eval(input234B.value)+ eval(input234C.value)));

	
	calcIntrstPayable();
}

//to calculate Total Tax Paid
function calcTotTaxPaid(){

	var advanceTaxToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
	var TDSToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
	var TCStoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tcs')[0];  TCStoDisplay.value = coalesce(TCStoDisplay.value);

	var SATtoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);
	var totTaxPaid = document.getElementsByName('itr1.taxPaid.taxesPaid.totalTaxesPaid')[0];  totTaxPaid.value = coalesce(totTaxPaid.value);
	totTaxPaid.value = eval(parseInt(advanceTaxToDisplay.value ,10) + parseInt(TDSToDisplay.value,10) + parseInt(SATtoDisplay.value ,10) + parseInt(TCStoDisplay.value,10));

	calcTaxPayable15Minus17();
}

function calcTaxPayable15Minus17(){

	
	var taxStatus= document.getElementsByName('itr1.filingStatus.taxStatus')[0];

	var totTaxPaid = document.getElementsByName('itr1.taxPaid.taxesPaid.totalTaxesPaid')[0];  totTaxPaid.value = coalesce(totTaxPaid.value);
	var totTaxIntrstPay = document.getElementsByName('itr1.itr1TaxComputationOnline.totTaxPlusIntrstPay')[0]; totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);

	if(eval(totTaxPaid.value) <= eval(totTaxIntrstPay.value)) {
		var taxPayable15M17 = document.getElementsByName('itr1.taxPaid.balTaxPayable')[0]; taxPayable15M17.value = coalesce(taxPayable15M17.value);
		var refund15M17 = document.getElementsByName('itr1.refund.refundDue')[0]; refund15M17.value = coalesce(refund15M17.value);
		refund15M17.value = eval('0');
		taxPayable15M17.value = eval(totTaxIntrstPay.value) - eval(totTaxPaid.value);
		
		taxPayable15M17.value= eval(Math.round(eval(taxPayable15M17.value)/10)*parseInt('10' ,10));
		
	} else{
		var taxPayable15M17 = document.getElementsByName('itr1.taxPaid.balTaxPayable')[0]; taxPayable15M17.value = coalesce(taxPayable15M17.value);
		var refund15M17 = document.getElementsByName('itr1.refund.refundDue')[0]; refund15M17.value = coalesce(refund15M17.value);
		refund15M17.value = eval(totTaxPaid.value) -  eval(totTaxIntrstPay.value);

		taxPayable15M17.value = eval('0');

		refund15M17.value= eval(Math.round(eval(refund15M17.value)/10)*parseInt('10' ,10));
		
		taxStatus.value='TR';
	}
	
	var balTaxPayable = document.getElementsByName('itr1.taxPaid.balTaxPayable')[0];  balTaxPayable.value = coalesce(balTaxPayable.value);
	var refundDue = document.getElementsByName('itr1.refund.refundDue')[0]; refundDue.value = coalesce(refundDue.value);

	if(eval(balTaxPayable.value) > parseInt(0)) {
		taxStatus.value='TP';
	}else if(eval(refundDue.value) > parseInt(0)) {
		taxStatus.value='TR';
	}else {
		taxStatus.value='NT';
	}
	
}

//To calculate Age
function calcAge(){
	var dob = document.getElementsByName('itr1.personalInfo.dob')[0];
	var retVal = calcAgeCommon(dob);
	return retVal;
}

function returnFile_UnderSec(type) {
try{
	var val=document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value;
	if(type != 'onload' && val == '20'){
		addErrorXHTML('','Return u/s 119(2)(b) for AY 2016-17 can be filed only after 31st March 2018.');
	}
	if(val=='18'){
		document.getElementsByName('itr1.filingStatus.returnType')[0].value='O';
		
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].readOnly=false;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].readOnly=false;
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].readOnly=false;
		
		document.getElementsByName('itr1.filingStatus.receiptNo')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.receiptNo')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.receiptNo')[0].value='';
		document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].value='';
		document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].readOnly=false;
		
		$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDate").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
			
			$("#PersistITR_itr1_filingStatus_noticeDate").mask('00/00/0000');
		});
		$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDateUnderSec").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
			$("#PersistITR_itr1_filingStatus_noticeDateUnderSec").mask('00/00/0000');
		});
		
		$(function(){
			$("#PersistITR_itr1_filingStatus_origRetFiledDate").datepicker("destroy");
		});
		
	}else if(val=='17'){
		document.getElementsByName('itr1.filingStatus.returnType')[0].value='R';
		
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].value = '';
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].value = '';
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].value = '';
		document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].value='';	
			
		$(function(){
			$("#PersistITR_itr1_filingStatus_origRetFiledDate").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
		});
		$("#PersistITR_itr1_filingStatus_origRetFiledDate").mask('00/00/0000');
		
		$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDate").datepicker("destroy");
		});
		returnType_change();

		
	}else{

		
		if(val == '13'||val=='14'||val=='15'||val=='16'){
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].disabled=false;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].readOnly=false;
			$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDateUnderSec").datepicker({
				changeMonth: true,
				changeYear: true,
				yearRange: "-100:+6",
				dateFormat: "dd/mm/yy",
				buttonText: "Choose",
				showOtherMonths: true,
				selectOtherMonths: true
			});
			$("#PersistITR_itr1_filingStatus_noticeDateUnderSec").mask('00/00/0000');
		});
			
		} else {
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].disabled=true;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].readOnly=true;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].value='';	
			
			$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDateUnderSec").datepicker("destroy");
		});
		
		}
	
		document.getElementsByName('itr1.filingStatus.returnType')[0].value='O';
		
		document.getElementsByName('itr1.filingStatus.receiptNo')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.receiptNo')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.receiptNo')[0].value='';
		document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].value='';
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].value = '';
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].value = '';
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].value = '';

		
		
		$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDate").datepicker("destroy");
		});

		$(function(){
			$("#PersistITR_itr1_filingStatus_origRetFiledDate").datepicker("destroy");
		});		
	}	
	if(document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value==-1||
		document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value=='N'){
		document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].value = '';
		}
	}catch(e){
		alert('Exception in returnFile_UnderSec method::'+e.stack);
	}
}

/* Return Type Filed is Revised(R) or Original(O). */
function returnType_change() {
	var val=document.getElementsByName('itr1.filingStatus.returnType')[0].value;
	var sec=document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value;
	if(val=='O'){
		if(sec == '17'){
			addErrorXHTML('','Return type in Income Details cannot be original if return filed under section 139(5)');
			document.getElementsByName('itr1.filingStatus.returnType')[0].value='R';
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].disabled=false;
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].readOnly=false;
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].disabled=false;
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].readOnly=false;
		} else{
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].disabled=true;
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].readOnly=true;
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].disabled=true;
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].readOnly=true;
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].value='';
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].value='';
		}
	} else if(val=='R'){
		if(sec != '17') {
			addErrorXHTML('','Return type in Income Details cannot be revised if return NOT filed under section 139(5)');
			document.getElementsByName('itr1.filingStatus.returnType')[0].value='O';
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].disabled=true;
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].readOnly=true;
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].disabled=true;
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].readOnly=true;
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].value='';
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].value='';

		}else{
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].disabled=false;
			document.getElementsByName('itr1.filingStatus.receiptNo')[0].readOnly=false;
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].disabled=false;			
			document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].readOnly=false;			
		}
	}
}

/* Check State Code and Country Code.*/
function onStateChng(){
	try{
		var state = document.getElementsByName('itr1.personalInfo.address.stateCode')[0];
		var country = document.getElementsByName('itr1.personalInfo.address.country')[0];
		var pinCode = document.getElementsByName('itr1.personalInfo.address.pinCode')[0];
		
		if(state.value != '99' && state.value != '-1'){
			country.value='91';
			pinCode.value='';
			$('.country').selectmenu('refresh', true);
		}else if(state.value == '99'){
			pinCode.value='999999';
		}
	}catch(e){
		alert('Exception in onStateChng method::'+e.stack);
	}	
}

/* Enable Schedule 5A if Portugese Code = Y. */
function onChngPCC5A(){
	var typeHP = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
	if(typeHP=='Y'){
		addErrorXHTML('','You have selected to be governed by Sec 5A. Please enter only your share of  Income from'+
		' House Property and Income from Other Sources.Refer to instructions (A23) for further clarification');
		document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].readOnly=false;
	
					} else {

	document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].disabled=true;
	document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].readOnly=true;
	document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].value='';
		
	}
}

//To do caluclations or validations on click on Submit button
function validateOnSubmit(){
	gtiWarningMessage();
	checkEmptyAmtSpouse();
	checkEmptyAmtSpousetcs();
	validateTDS();
	ifscCodeUpperCase();
	displaywarnings();
	panValidation80G('ded100PerWithoutQual');
	panValidation80G('ded50WithoutQual');
	panValidation80G('ded100Qual');
	panValidation80G('ded50WithQual');
	checkNoOfRowsFilled();
	calculateTotalTax('taxDedSourceSal');
	calculateTotalTaxTDS2('taxDedSourceSrc');
	calculateTotalTaxIT('taxDedSelf');
	calculateTotalTaxTCS('scheduleTCS');
	
}

//To populate name in Verification section
function populateVerName(){
	
	var fName=document.getElementsByName('itr1.personalInfo.assesseeName.firstName')[0].value;
	var mName=document.getElementsByName('itr1.personalInfo.assesseeName.middleName')[0].value;
	var lName=document.getElementsByName('itr1.personalInfo.assesseeName.surNameOrOrgName')[0].value;
	
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
	document.getElementsByName('itr1.verification.declaration.assesseeVerName')[0].value=verName;
	
}

//To display a warning message if grossTotIncome is negative
function gtiWarningMessage() {
	
	var grossTotalIncome = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value;
	if( parseInt(grossTotalIncome ,10) <0 ){
	 grossTotalIncome = parseInt(0,10);
	  addErrorXHTML('','To avail the benefit of carry forward and set off of loss, please use ITR-2.');
	}
}
	
/* Function to check if Self-Occupied. */
function selfOccupdNegativChk(){

	var typeOfHP = document.getElementsByName('itr1.itr1IncomeDeductions.typeOfHP')[0].value;
	var incmHP = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncomeOfHP')[0].value;
	
	if(typeOfHP== 'S' && incmHP > 0){
		addErrorXHTML('' ,'Annual value of Self Occupied House property shall be nil in view of Sec 23(2)');	
		j.setFieldError('itr1.itr1IncomeDeductions.totalIncomeOfHP','Annual value of Self Occupied House property shall be nil in view of Sec 23(2)');
	}

}

//To caluclate interest calculations On clicking on Re calculate button
function calculateTax(){
clearOldValues();
calcItr1();
}


/* Fetch PAN entered from itr1.personalInfo.pan field. */
function getPan(){

var pan = document.getElementsByName('itr1.personalInfo.pan')[0].value;
return pan;
}

/* Check if given amount is Zero or Negative, if -ve return 0, else return value. */
function zeroOrMore(val){
		val = coalesce(val);
		if(val < 0){
			return 0;
		}
		return val;
	}

/* If return filed under section = 13,14,15,16,18 then noticeDateUnderSec is disabled */
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

/* If Portugese Code = Y, Enable amtClaimedBySpouse field for TDS1 and TDS2 */
function enableTDSspouseAmt(portVal){
	var table = document.getElementById('taxDedSourceSrc');
	var noOfRows = table.rows.length;
	if(portVal=='Y'){
		
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=false;
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].value='';
		}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=true;
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=true;
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].value='';
		}
	}
}

/* If Portugese Code = Y, Enable amtClaimedBySpouse field for TDS1 and TDS2 */
function enableTCSspouseAmt(portVal){
	var table = document.getElementById('scheduleTCS');
	var noOfRows = table.rows.length;
	if(portVal=='Y'){
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=false;
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].value='';
		}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=true;
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=true;
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].value='';
		}
	}
}

/* If Portugese Code = Y, Enable amtClaimedBySpouse field for TDS1 and TDS2 On Load*/
function enableTDSspouseAmtOnLoad(){
	var portVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
	var table = document.getElementById('taxDedSourceSrc');
	var noOfRows = table.rows.length;
	if(portVal=='Y'){
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=false;
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=true;
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=true;
		}
	}
}

/* If Portugese Code = Y, Enable amtClaimedBySpouse field for TDS1 and TDS2 On Load*/
function enableTCSspouseAmtOnLoad(){
	var portVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
	var table = document.getElementById('scheduleTCS');
	var noOfRows = table.rows.length;
	if(portVal=='Y'){
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=false;
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=false;
		}
	} else {
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].disabled=true;
		document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtClaimedBySpouse')[0].readOnly=true;
		}
	}
}

/* Check if Portugese Code = Y, Amount in hands of Spouse is mandatory. */
function checkEmptyAmtSpouse(){
	var tab = document.getElementById('taxDedSourceSrc');
	var allInputTags = tab.getElementsByTagName('input');
	var portuVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
	var isRowBlank = checkRowBlank('taxDedSourceSrc', 3, 2);
	if(portuVal=='Y' && isRowBlank == false){
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("amtClaimedBySpouse$")) {
						if(allInputTags[i].value==''){
							addError(allInputTags[i],' Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero');
						}
					}
				}
		}
}

//To validate schedule TDS
function validateTDS(){
var tab1 = document.getElementById('taxDedSourceSal');
		var allInputTags = tab1.getElementsByTagName('input');
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("totalTDSSal$")) {
					if(parseInt(allInputTags[i].value ,10) > parseInt(allInputTags[i-1].value ,10)){
						addError(allInputTags[i],'Total tax deducted cannot be more than Income chargeable under Salaries',true);
						j.setFieldError(allInputTags[i].name,'Total tax deducted cannot be more than Income chargeable under Salaries');
						allInputTags[i].value = parseInt('0' ,10);
						
					} 
				}
			}
	
		var portuVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
		var tab2 = document.getElementById('taxDedSourceSrc');
		var allInputTags = tab2.getElementsByTagName('input');
		if(portuVal=='N'){
			for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$") && allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 6 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 6 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);
							
						}
					}
				}
		} else {
		
			for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("claimOutOfTotTDSOnAmtPaid$") && allInputTags[i+1].name.match("amtClaimedBySpouse$")) {
						if(eval(parseInt(coalesce(allInputTags[i].value),10) + parseInt(coalesce(allInputTags[i+1].value),10)) >  parseInt(allInputTags[i-1].value,10)){
							addError(allInputTags[i],' Amount claimed in Col 6+Col 7 cannot exceed Total tax deducted',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in Col 6+Col 7 cannot exceed Total tax deducted');
							allInputTags[i].value = parseInt('0',10);
							allInputTags[i+1].value = parseInt('0',10);
						}
					}
				}
			}
}

/* Convert IFS Code to Upper-Case */
function ifscCodeUpperCase(){

document.getElementsByName('itr1.refund.depositToBankAccount.iFSCCode')[0].value=document.getElementsByName('itr1.refund.depositToBankAccount.iFSCCode')[0].value.toUpperCase();

}

//To validate bank account number in schedule BA
function checkBankAcntScheduleBA() {
	try {
		var pat = /^[a-zA-Z0-9]{1,20}([\/-]?(((\d*[1-9]\d*)*[a-zA-Z])|(\d*[1-9]\d*[a-zA-Z]*))+)*[0-9]*$|^$/;
		var table = document.getElementById('scheduleBA');
		var noOfRows = table.rows.length;
		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 2); i++) {
			var bankaccNo = document.getElementsByName('itr1.scheduleBA[' + i
					+ '].accNo')[0].value;
			if (!(pat.test(bankaccNo))) {
				j.setFieldError('itr1.scheduleBA[' + i + '].accNo',
						'Please enter valid bank account number.');
			}
		}
	} catch (e) {
		alert('Exceptions in checkBankAcntScheduleBA method = ' + e.stack);
	}

}


//To display warning message on submit button
function displaywarnings(){
	var incSal = document.getElementsByName('itr1.itr1IncomeDeductions.incomeFromSal')[0].value;
	var tab1 = document.getElementById('taxDedSourceSal');
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
		
	for ( var i = 0; i < (noOfRows-3); i++) {
		amt = document.getElementsByName('itr1.tdSonSalaries.tdSonSalary['+i+'].incChrgSal')[0].value;
		sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
	}
 
	var tdsSalminusTenPer = sum*parseFloat('0.90');
	var errText="";
	var i=1;
	
	if(incSal < tdsSalminusTenPer){
		errText+=(i++)+". The amount of salary disclosed in \"Income details/Part BTI\" is less than 90% of Salary reported in TDS1.\n\n";
	}
	var sec119=document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value;
	var taxPay=document.getElementsByName('itr1.taxPaid.balTaxPayable')[0].value;

	if(sec119=='20'){
		errText+=(i++)+". Return u/s 119(2)(b) for AY 2016-17 can be filed only after 31st March 2018\n\n";
	}
	
	if(taxPay > '0'){
		
		errText+=(i++)+". Please ensure that the taxes are paid before the submission of the return, else return shall be treated as defective.\n";
	}
	

	
	main.generateMsgDialogWithOk(errText,"");
	var incHP = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncomeOfHP')[0].value;
	var incOs = document.getElementsByName('itr1.itr1IncomeDeductions.incomeOthSrc')[0].value;
	var totalDed = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0].value;
	var totalTaxPaid = document.getElementsByName('itr1.taxPaid.taxesPaid.totalTaxesPaid')[0].value;
	if(totalTaxPaid > 0 && incHP ==0 && incOs==0 && totalDed==0&&incSal==0){
		j.setFieldError('itr1.itr1IncomeDeductions.incomeFromSal','Income details and Tax computation have not been provided but details regarding Taxes Paid have been provided.');
	}

}

/* Validate PAN for Schedule 80G Tables */
function panValidation80G(tableId) {

	var pan = document.getElementsByName('itr1.personalInfo.pan')[0].value;
	var verificationPAN = document.getElementsByName('itr1.verification.declaration.assesseeVerPAN')[0].value;
	var table = document.getElementById(tableId);
	var allInputTags = table.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("doneePAN$")) {
			if(allInputTags[i].value != '' && (allInputTags[i].value == pan || allInputTags[i].value == verificationPAN )){
				j.setFieldError(allInputTags[i].name,'Enter the PAN of the person to whom the donation is made.');

			}
		}
	}
}

//To check number of rows filled in schedule BA
function checkNoOfRowsFilled(){
	var tab = document.getElementById('scheduleBA');
	var rowCount = tab.rows.length;
	var count =  parseInt(0,10);
	var noOfBankAccounts = document.getElementsByName('itr1.scheduleBA.noOfBankAcc')[0].value;
	for ( var i = 0; i < (rowCount-2); i++) {
		var IFSC = document.getElementsByName('itr1.scheduleBA['+i+'].ifscCode')[0].value;
		if(IFSC !=""){
			count = count+1;
		}
	}
	if(noOfBankAccounts != '' && (noOfBankAccounts-1) != count){
		 j.setFieldError('itr1.scheduleBA.noOfBankAcc','Number of bank accounts held during the previous year should be equal to number of rows entered in the below tables');
	}
	
}

//To calculate Total Tax
function calculateTotalTax(tableId){

	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'taxDedSourceSal'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
				amt = document.getElementsByName('itr1.tdSonSalaries.tdSonSalary['+i+'].totalTDSSal')[0].value;
				sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr1.tdSonSalaries.tdSonSalary.totalTaxDeducted')[0].value = parseInt(sum,10);
		
	}	
}

//To calculate Total Tax TDS2
function calculateTotalTaxTDS2(tableId){

	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'taxDedSourceSrc'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
			amt = document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].claimOutOfTotTDSOnAmtPaid')[0].value;
			sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal.claimOutOfTotTDSOnAmtPaid')[0].value = parseInt(sum,10);
	}	
}

//To calculate Total Tax IT
function calculateTotalTaxIT(tableId){
	
	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'taxDedSelf'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
			amt = document.getElementsByName('itr1.taxPayments.taxPayment['+i+'].amt')[0].value;
			sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr1.scheduleIT.taxPayment.amt')[0].value = parseInt(sum,10);
	}
}

//To open Save file dialog
function popupWithOk()
{
	  j.popup();
}


//To calculate Total tax on TCS

function calculateTotalTaxTCS(tableId){
	
	var tab1 = document.getElementById(tableId);
    var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;
	
	if(tableId = 'scheduleTCS'){
		
		for ( var i = 0; i < (noOfRows-3); i++) {
			 amt = document.getElementsByName('itr1.scheduleTCS.tcs['+i+'].amtTCSClaimedThisYear')[0].value;
			 sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		
		document.getElementsByName('itr1.scheduleTCS.totalTcSSalary')[0].value = parseInt(sum,10);
	}
}

function validateSchAL() {
	var immovableAssetLand = document.getElementsByName('scheduleAL.immovableAssetLand')[0].value;
	var immovableAssetBuilding = document.getElementsByName('scheduleAL.immovableAssetBuilding')[0].value;
	var cashInHand = document.getElementsByName('scheduleAL.movableAsset.cashInHand')[0].value;
	var jewelleryBullionEtc = document.getElementsByName('scheduleAL.movableAsset.jewelleryBullionEtc')[0].value;
	var vehiclYachtsBoatsAircrafts = document.getElementsByName('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value;
	var liabilityInRelatAssets = document.getElementsByName('scheduleAL.liabilityInRelatAssets')[0].value;
	
	var totalImmovablMovablAssets = document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0];
	
	if(immovableAssetLand == '' && immovableAssetBuilding == '' && cashInHand == '' && jewelleryBullionEtc == '' && vehiclYachtsBoatsAircrafts == '' && liabilityInRelatAssets == '') {
		totalImmovablMovablAssets.value = '';
	}
}

//To calculate the total amount of Schedule AL

function totAmtOfSchedAL(){
	var totalIncome = parseInt(coalesce(document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0].value) ,10);
	if(totalIncome <= eval('5000000')){
		document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value=eval(
				coalesceSetRet('scheduleAL.immovableAssetLand')+
				coalesceSetRet('scheduleAL.immovableAssetBuilding')+
				coalesceSetRet('scheduleAL.movableAsset.cashInHand')+
				coalesceSetRet('scheduleAL.movableAsset.jewelleryBullionEtc')+
				coalesceSetRet('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts'));
		
		coalesceSetRet('scheduleAL.liabilityInRelatAssets');
	}else{
		document.getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value=eval(
				parseInt(coalesce(document.getElementsByName('scheduleAL.immovableAssetLand')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.immovableAssetBuilding')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.movableAsset.cashInHand')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.movableAsset.jewelleryBullionEtc')[0].value),10)+
				parseInt(coalesce(document.getElementsByName('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value),10));
	}
}
//schedule tcs changes
function adjustTcs(){
	enableField('itr1.filingStatus.portugeseCC5A','Y','itr1.scheduleTCS.tcs[0].amtClaimedBySpouse');
}

//To enable field
function enableField(src, val, targets) {
	var srcField = document.getElementsByName(src)[0];
	if (contains(val, srcField.value)) {
		for ( var i = 2; i < arguments.length; i++) {
			var targetField = document.getElementsByName(arguments[i])[0];
			targetField.disabled = false;
			targetField.readOnly = false;
		}
	} else {
		for ( var i = 2; i < arguments.length; i++) {
			var targetField = document.getElementsByName(arguments[i])[0];
			if (targetField.type == 'select-one') {
				targetField.selectedIndex = 0;
			} else {
				targetField.value = '';
			}
			targetField.disabled = true;
			targetField.readOnly = true;
		}
	}

}


function checkEmptyAmtSpousetcs(){
	var tab = document.getElementById('scheduleTCS');
	var allInputTags = tab.getElementsByTagName('input');
	var portuVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
	var isRowBlank = checkRowBlank('scheduleTCS', 3, 2);
	if(portuVal=='Y' && isRowBlank == false){
		for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("amtClaimedBySpouse$")) {
						if(allInputTags[i].value==''){
							addError(allInputTags[i],' Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero',true);
							j.setFieldError(allInputTags[i].name,'Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero');
						}
					}
				}
		}
}
