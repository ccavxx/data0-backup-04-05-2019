
function calcItr1(){
	calcGrossTotIncome();
	onchangeDed();

}

function calcGrossTotIncome() {
	
	try{
	var varDate = document.getElementsByName('itr1.verification.date')[0];
	if(varDate.value=='' || varDate.value==undefined || varDate.value== null){
		var dt = new Date();
		varDate.value = getCurrentDate();	
	}
	
	var salaries = document.getElementsByName('itr1.itr1IncomeDeductions.incomeFromSal')[0]; salaries.value = coalesce(salaries.value) ;
	var incFrmHP = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncomeOfHP')[0]; incFrmHP.value = coalesce(incFrmHP.value) ;

	//var incFrmHP = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncomeOfHP')[0].value; incFrmHP = coalesce(incFrmHP) ;

 	var incFrmOthSrc = document.getElementsByName('itr1.itr1IncomeDeductions.incomeOthSrc')[0]; incFrmOthSrc.value = coalesce(incFrmOthSrc.value);
	var grossTotInc = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0]; 

	var advanceTaxToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
	var TDSToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
	var SATtoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);
	var refundDue = document.getElementsByName('itr1.refund.refundDue')[0];  refundDue.value = coalesce(refundDue.value);

	var temp = eval(parseInt(salaries.value ,10)) + eval(parseInt(incFrmHP.value ,10)) + eval(parseInt(incFrmOthSrc.value,10));
	
	
		grossTotInc.value = temp;
	
	
	dedUndVIA();
	}catch(e){ alert('1 Exceptions e = ' + e.stack); }
}

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
	
	var sec80EE = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE_Usr')[0].value; sec80EE = coalesce(sec80EE);
	var sec80EEsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80EE')[0];

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
		
		if( parseInt(sec80C,10) > eval('100000')) {
			sec80CsysCalc.value = '100000' ;
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
	if( parseInt(sec80CCC,10) > eval('100000')) {
		sec80CCCsysCalc.value = '100000' ;
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

		var emplrCat = document.getElementsByName('itr1.personalInfo.employerCategory')[0].value;
		var salUppLimit = Math.round(eval(parseInt(salaries.value,10)) * eval('0.10'));
		var gtiUppLimit = Math.round(eval(parseInt(coalesce(grossTotInc),10)) * eval('0.10'));
		if( parseInt(grossTotInc ,10) >0 ){
		if(parseInt(salaries.value) == parseInt('0' , 10)){
			if(emplrCat !='-1'){
				if(gtiUppLimit > parseInt('100000' ,10)){
					if( parseInt(sec80CCDempeContr,10) > eval('100000')) {
						sec80CCDempeContrsysCalc.value = '100000' ;
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
			}
		}else{
			if(emplrCat !='-1'){
				if(parseInt(sec80CCDempeContr,10) > parseInt(salUppLimit,10)){
					sec80CCDempeContrsysCalc.value = parseInt(salUppLimit,10);
				}else{
					sec80CCDempeContrsysCalc.value = parseInt(sec80CCDempeContr,10);
				}
			if(parseInt(grossTotInc ,10) < sec80CCDempeContrsysCalc.value){
						sec80CCDempeContrsysCalc.value = grossTotInc;
					}
			}else{
				sec80CCDempeContrsysCalc.value = parseInt('0',10);
			}
		}
		}  else {
		sec80CCDempeContrsysCalc.value= parseInt('0',10);
	}
	

	// CHECK FOR 80D	
	var age = calcAge();
	if( parseInt(grossTotInc ,10) >0 ){
	if((residentialStatus== 'RES' || residentialStatus== 'NOR') && age > eval('59')){
		if( parseInt(sec80D,10) > eval('40000')){
			sec80DsysCalc.value = '40000';
		} else {
			sec80DsysCalc.value =  parseInt(sec80D,10);
		}
	}else {
		if( parseInt(sec80D,10) > eval('35000')){
			sec80DsysCalc.value = '35000';
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
			if( parseInt(sec80DD,10) > parseInt('100000' ,10)){
				sec80DDsysCalc.value = '100000';
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
			if(parseInt(sec80DDB ,10) > eval('60000')){
					sec80DDBsysCalc.value = '60000';
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
	
	// CHECK FOR 80EE
	if( parseInt(grossTotInc ,10) >0 ){
		
			if( parseInt(sec80EE,10) > parseInt('100000' ,10)){
				sec80EEsysCalc.value = '100000';
			}else{
				sec80EEsysCalc.value = parseInt(sec80EE,10);
			}
			if(parseInt(grossTotInc ,10) < sec80EEsysCalc.value){
					sec80EEsysCalc.value = grossTotInc;
			}
		
		} else {
	sec80EEsysCalc.value= parseInt('0',10);
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
		if( parseInt(isNVL(sec80U),10) > eval('100000')){
			sec80UsysCalc.value = '100000';
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
	if( parseInt(grossTotInc ,10) >0 ){
	if(eval(parseInt(isNVL(sec80TTA),10) < parseInt('10000',10))){
		sec80TTAsysCalc.value =  parseInt(isNVL(sec80TTA),10);
	}else{
		sec80TTAsysCalc.value =  parseInt('10000',10);
	}
	if(parseInt(grossTotInc ,10) < sec80TTAsysCalc.value){
			sec80TTAsysCalc.value = grossTotInc;
		}
	} else {
	sec80TTAsysCalc.value= parseInt('0',10);
	}
	
	checkSum80C80CCC();
	sumUserEntrdDed();
	sec80GGsysCalc.value=0;
	sumDeductionsWithout80GG(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
					sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
					sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
					sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80EEsysCalc);

	// CHECK FOR 80GG again
	
	var totInc = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0];
	if(totInc.value > 0){
	totInc.value = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0].value;
	} 
	/*else {
	totInc.value = eval(parseInt(0, 10));
	}*/
	

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
		sec80CCCsysCalc.value=parseInt('0',10);
		sec80CsysCalc.value=parseInt('0',10);
		sec80QQBsysCalc.value=parseInt('0',10);
		sec80TTAsysCalc.value=parseInt('0',10);
		sec80GGsysCalc.value= parseInt('0',10);
		sec80EEsysCalc.value=parseInt('0',10);
	}
	
	
	// Do the sum of deductions again after adding 80GG and 80G
	 sumDeductions(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
		sec80GGsysCalc,sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80EEsysCalc);
}

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
var sec80EE = document.getElementsByName('itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE_Usr')[0]; sec80EE.value = coalesce(sec80EE.value);

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
						 eval(parseInt(sec80EE.value ,10));
						 }

function checkSum80C80CCC(){
	var sec80CsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80C')[0];
	var sec80CCCsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCC')[0];
	var sec80CCDempeContrsysCalc = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.section80CCD')[0];
	var netSum = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDempeContrsysCalc.value);
	if(eval(netSum) >  eval('100000')) {
		var residue = eval(netSum) - eval('100000');
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

function sumDeductionsWithout80GG(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
		sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80EEsysCalc){

	sec80CsysCalc.value 			= coalesce(sec80CsysCalc.value); 				sec80CCCsysCalc.value			= coalesce(sec80CCCsysCalc.value);
	sec80CCDemprContrsysCalc.value 	= coalesce(sec80CCDemprContrsysCalc.value); 	sec80CCDempeContrsysCalc.value 	= coalesce(sec80CCDempeContrsysCalc.value);
	sec80DsysCalc.value 			= coalesce(sec80DsysCalc.value);
	sec80DDsysCalc.value 			= coalesce(sec80DDsysCalc.value); 				sec80DDBsysCalc.value			= coalesce(sec80DDBsysCalc.value);
	sec80EsysCalc.value 			= coalesce(sec80EsysCalc.value); 				sec80GsysCalc.value 			= coalesce(sec80GsysCalc.value);
	sec80GGAsysCalc.value 			= coalesce(sec80GGAsysCalc.value);
	sec80GGCsysCalc.value 			= coalesce(sec80GGCsysCalc.value); 				sec80UsysCalc.value 			= coalesce(sec80UsysCalc.value);
	sec80CCGsysCalc.value 			= coalesce(sec80CCGsysCalc.value);				sec80RRBsysCalc.value 			= coalesce(sec80RRBsysCalc.value);
	sec80QQBsysCalc.value 			= coalesce(sec80QQBsysCalc.value);				sec80TTAsysCalc.value 			= coalesce(sec80TTAsysCalc.value);
	sec80EEsysCalc.value 			= coalesce(sec80EEsysCalc.value);

	var dedVIA = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];
	
	var temp2 = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDemprContrsysCalc.value) +
				eval(sec80CCDempeContrsysCalc.value) + eval(sec80DsysCalc.value) +
				eval(sec80DDsysCalc.value) + eval(sec80DDBsysCalc.value) + eval(sec80EsysCalc.value) +
				eval(sec80GsysCalc.value) + eval(sec80GGAsysCalc.value) +
				eval(sec80GGCsysCalc.value)+ eval(sec80UsysCalc.value)+ eval(sec80CCGsysCalc.value)+ eval(sec80RRBsysCalc.value)+ 
				eval(sec80QQBsysCalc.value)+ eval(sec80TTAsysCalc.value)+ eval(sec80EEsysCalc.value);

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

function sumDeductions(sec80CsysCalc,sec80CCCsysCalc,sec80CCDemprContrsysCalc,sec80CCDempeContrsysCalc,
		sec80DsysCalc,sec80DDsysCalc,sec80DDBsysCalc,sec80EsysCalc,sec80GsysCalc,
		sec80GGsysCalc,sec80GGAsysCalc,sec80GGCsysCalc,sec80UsysCalc,sec80CCGsysCalc,
		sec80RRBsysCalc,sec80QQBsysCalc,sec80TTAsysCalc,sec80EEsysCalc){

	sec80CsysCalc.value 			= coalesce(sec80CsysCalc.value); 				sec80CCCsysCalc.value			= coalesce(sec80CCCsysCalc.value);
	sec80CCDemprContrsysCalc.value 	= coalesce(sec80CCDemprContrsysCalc.value); 	sec80CCDempeContrsysCalc.value 	= coalesce(sec80CCDempeContrsysCalc.value);
	sec80DsysCalc.value 			= coalesce(sec80DsysCalc.value);
	sec80DDsysCalc.value 			= coalesce(sec80DDsysCalc.value); 				sec80DDBsysCalc.value			= coalesce(sec80DDBsysCalc.value);
	sec80EsysCalc.value 			= coalesce(sec80EsysCalc.value); 				sec80GsysCalc.value 			= coalesce(sec80GsysCalc.value);
	sec80GGsysCalc.value 			= coalesce(sec80GGsysCalc.value); 				sec80GGAsysCalc.value 			= coalesce(sec80GGAsysCalc.value);
	sec80GGCsysCalc.value 			= coalesce(sec80GGCsysCalc.value); 				sec80UsysCalc.value 			= coalesce(sec80UsysCalc.value);
	sec80CCGsysCalc.value 			= coalesce(sec80CCGsysCalc.value);				sec80RRBsysCalc.value 			= coalesce(sec80RRBsysCalc.value);
	sec80QQBsysCalc.value 			= coalesce(sec80QQBsysCalc.value);				sec80TTAsysCalc.value 			= coalesce(sec80TTAsysCalc.value);
	sec80EEsysCalc.value 			= coalesce(sec80EEsysCalc.value);
	var dedVIA = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];
	
	var temp2 = eval(sec80CsysCalc.value) + eval(sec80CCCsysCalc.value) + eval(sec80CCDemprContrsysCalc.value) +
				eval(sec80CCDempeContrsysCalc.value) + eval(sec80DsysCalc.value) +
				eval(sec80DDsysCalc.value) + eval(sec80DDBsysCalc.value) + eval(sec80EsysCalc.value) +
				eval(sec80GsysCalc.value) + eval(sec80GGsysCalc.value) + eval(sec80GGAsysCalc.value) +
				eval(sec80GGCsysCalc.value)+ eval(sec80UsysCalc.value)+ eval(sec80CCGsysCalc.value)+ eval(sec80RRBsysCalc.value)+ 
				eval(sec80QQBsysCalc.value)+ eval(sec80TTAsysCalc.value)+ eval(sec80EEsysCalc.value);

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

	//checkTotDeductions();

	calcTI();
}

function calcTI(){

	var dedVIA = document.getElementsByName('itr1.itr1IncomeDeductions.deductUndChapVIA.totalChapVIADeductions')[0];  dedVIA.value = coalesce(dedVIA.value);
	var totInc = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncome')[0];	totInc.value = coalesce(totInc.value);
	var grossInc = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value; 
	
	/* if( parseInt(grossInc ,10) <0 ){
		 grossInc = parseInt(0,10);
		}*/
	
	
	if(eval(parseInt(coalesce(grossInc),10) > parseInt(dedVIA.value,10))){
		totInc.value = eval(coalesce(grossInc)) - eval(dedVIA.value);
	}
	/*else{
		totInc.value = parseInt('0' ,10);
	}*/

	// Rounding of to nearest multiple of 10
	//if(eval(totInc.value) > 10){
	 totInc.value= eval(Math.round(eval(totInc.value)/10)*parseInt('10' ,10));
	//}

	calcTaxPayableOnTI();
	
	var rebate87A = document.getElementsByName('itr1.itr1TaxComputationOnline.rebate87A')[0];
	var taxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalTaxPayable')[0];
	var resStatus = document.getElementsByName('itr1.filingStatus.residentialStatus')[0].value;
	var taxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalTaxPayable')[0].value;
	var taxPayableOnRebate = document.getElementsByName('itr1.itr1TaxComputationOnline.taxPayableOnRebate')[0]; 
	var surchargeOnAboveCrore = document.getElementsByName('itr1.itr1TaxComputationOnline.surchargeOnAboveCrore')[0];
	if((resStatus=='RES'||resStatus=='NOR') && totInc.value<=500000){
		rebate87A.value = Math.min(parseInt(taxPayable,10),2000);
	} else {
	    rebate87A.value = parseInt('0' ,10);
	}
	
	
	taxPayableOnRebate.value = taxPayable-(rebate87A.value);
	
	calsurchargeOnAboveCrore();
	
	
		
	
}

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
			taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 125000);
			} else if( (resStatus == 'RES' || resStatus=='NOR') &&  ( eval(age)> eval(79))){
			taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 100000);
			} else {
				taxOnCutOffInc = ((10000000 - 1000000)  * 0.3 + 130000);
			}

			if( rndOffNrsTen(totInc.value) > 10000000 ){
				var tempSurcharge = taxOnTotInc  * 0.1 ;
				
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
		if ( eval(totInc.value) <= eval('200000')){
			taxPayable.value = '0';
		} else {
			if((eval(totInc.value) >= eval('200001')) && (eval(totInc.value) <= eval('500000'))){
				var temp = (eval(totInc.value) - eval ('200000')) * eval('0.10');
				taxPayable.value = Math.round(eval(temp));
			} else if((eval(totInc.value) >= eval('500001')) && (eval(totInc.value) <= eval('1000000'))) {
				var temp = (eval(totInc.value) - eval ('500000')) * eval('0.20');
				taxPayable.value = Math.round(eval(temp) + eval('30000'));
			} else if(eval(totInc.value) >= eval('1000001')) {
				var temp = (eval(totInc.value) - eval ('1000000')) * eval('0.30');
				taxPayable.value = Math.round(eval(temp) + eval('130000'));
			}
		}
	}
	
 calcEduCess();
}

function calcEduCess(){

	/*var totInc = document.getElementsByName('itr1.itr1TaxComputationOnline.totalTaxPayable')[0];
	var eduCess = document.getElementsByName('itr1.itr1TaxComputationOnline.educationCess')[0];
	eduCess.value = eval(totInc.value) * eval('0.03');
	eduCess.value  = Math.round(eduCess.value);

	var totTaxWithEduCess = document.getElementsByName('itr1.itr1TaxComputationOnline.grossTaxLiability')[0];
	totTaxWithEduCess.value = eval(totInc.value) + eval(eduCess.value);*/
	var taxPayableOnRebate = document.getElementsByName('itr1.itr1TaxComputationOnline.taxPayableOnRebate')[0].value; 
	var surchargeOnAboveCrore = document.getElementsByName('itr1.itr1TaxComputationOnline.surchargeOnAboveCrore')[0].value;
	var eduCess = document.getElementsByName('itr1.itr1TaxComputationOnline.educationCess')[0];
	eduCess.value = (eval(coalesce(taxPayableOnRebate))+eval(coalesce(surchargeOnAboveCrore)))* eval('0.03');
	eduCess.value  = Math.round(eduCess.value);
	calcBalTaxPay();
}

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

function deleteRowToTablePage5Donations(tableId,noOfRow,last){

	deleteRowTaxDedTDSPage(tableId,noOfRow,last);
	allRowsForPage5Donations(tableId,noOfRow,last);
}

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
			if(grossTotalIncome==deductionsSysTotal.value){
				adjstGTI=0;
			}else{
			
			 adjstGTI = eval(parseInt(grossTotalIncome ,10) - (parseInt(deductionsSysTotal.value ,10) - parseInt(sys80G.value ,10) - parseInt(sys80GG.value ,10)+parseInt(usr80GG.value ,10)));
			 
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
			alert ('Uma :- ' + e.stack);
		}
}

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

function calcUserDonations80G(){
 var tot80GAuserEntrd =  document.getElementsByName('itr1.schedule80G.don100Percent.totDon100Percent')[0]; tot80GAuserEntrd.value = coalesce(tot80GAuserEntrd.value);
 var tot80GBuserEntrd =  document.getElementsByName('itr1.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0]; tot80GBuserEntrd.value = coalesce(tot80GBuserEntrd.value);
 var tot80GCuserEntrd =  document.getElementsByName('itr1.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0]; tot80GCuserEntrd.value = coalesce(tot80GCuserEntrd.value);
 var tot80GDuserEntrd =  document.getElementsByName('itr1.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0]; tot80GDuserEntrd.value = coalesce(tot80GDuserEntrd.value);
 var tot80GDonuserEntrd =  document.getElementsByName('itr1.schedule80G.totalDonationsUs80G')[0]; tot80GDonuserEntrd.value = coalesce(tot80GDonuserEntrd.value);

 tot80GDonuserEntrd.value = eval(tot80GAuserEntrd.value)+ eval(tot80GBuserEntrd.value)+ eval(tot80GCuserEntrd.value)+ eval(tot80GDuserEntrd.value) ;

}

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

function selfAsstTax234A(){
	
	var selfAssessmentTax234A = parseInt('0',10);
	var tab3 = document.getElementById('taxDedSelf');
	var allInputTags = tab3.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
		if(allInputTags[i].name.match("dateDep$")){
			if( checkFirstDateBefore('01/04/2014' , allInputTags[i].value) && checkFirstDateBefore(allInputTags[i].value , '31/07/2014')){
					selfAssessmentTax234A = eval(parseInt(isNVL(selfAssessmentTax234A) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10)) ;
				}
		}
	}
	 return selfAssessmentTax234A;
	
}

function calcInterestPayable(){
		var advanceTaxToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
		var TDSToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
		var SATtoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);

		var balTaxPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.netTaxLiability')[0]; balTaxPayable.value = coalesce(balTaxPayable.value);
		var advanceTax = parseInt('0' ,10) ;
		var selfAssessmentTax = parseInt('0' ,10) ;

		var TDS = parseInt('0' ,10);
		var tab1 = document.getElementById('taxDedSourceSal');
		var allInputTags = tab1.getElementsByTagName('input');
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("totalTDSSal$")) {
					if(parseInt(allInputTags[i].value ,10) > parseInt(allInputTags[i-1].value ,10)){
						//addErrorXHTML('','Total Tax deducted cannot be more than income chargeable under the head salaries');
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
							//addErrorXHTML('','Amount claimed for this year cannot be more than total tax deducted.');
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
							//addErrorXHTML('','Amount claimed for this year cannot be more than total tax deducted.');
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

		var tab3 = document.getElementById('taxDedSelf');
		var allInputTags = tab3.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			if(allInputTags[i].name.match("dateDep$")){
				if(checkFirstDateBefore('01/04/2013' , allInputTags[i].value) && checkFirstDateBefore(allInputTags[i].value , '31/03/2014')){
						advanceTax = eval( parseInt(isNVL(advanceTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}else if( checkFirstDateBefore('01/04/2014' , allInputTags[i].value)){
						selfAssessmentTax = eval(parseInt(isNVL(selfAssessmentTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10)) ;
					}
			}
		}

		advanceTaxToDisplay.value = parseInt(advanceTax,10);
		SATtoDisplay.value = parseInt(selfAssessmentTax,10);
		var selfAssessmentTax234A = selfAsstTax234A();

		var intrst234Aprinciple	;
		if(parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(selfAssessmentTax234A ,10) - parseInt(TDS ,10) < 0){
			intrst234Aprinciple = parseInt('0' ,10);
		}else {
			intrst234Aprinciple = parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(selfAssessmentTax234A ,10) - parseInt(TDS ,10);
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
		MonthsAfterDueDate =  calcNoOfMonths(currentDate , '01/08/2014');		
		if(document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value=='17' && 
			document.getElementsByName('itr1.filingStatus.returnType')[0].value=='R'){
			
			var origDate = document.getElementsByName('itr1.filingStatus.origRetFiledDate')[0].value;		
			if(origDate!=null && origDate!=undefined  && origDate!=''){
				MonthsAfterDueDate =  calcNoOfMonths(origDate , '01/08/2014'); 	// for Revised return take date of original filling
			}else{
				MonthsAfterDueDate =  0;
			}
		}
		
		if(document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value=='18'){
			
			var origDate = document.getElementsByName('itr1.filingStatus.noticeDate')[0].value;		
			if(origDate!=null && origDate!=undefined  && origDate!=''){
				MonthsAfterDueDate =  calcNoOfMonths(origDate , '01/08/2014'); 	// for Defective return take date of original filling
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

			var tab4 = document.getElementById('taxDedSelf');
			var allInputTags = tab4.getElementsByTagName('input');
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("dateDep$")) {

					if(checkFirstDateBefore('01/04/2013' , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , '15/09/2013' ) ){						
						slab1 = eval(parseInt(slab1 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					else if(checkFirstDateBefore('16/09/2013' , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , '17/12/2013' ) ){						
						slab2 = eval(parseInt(slab2 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					else if(checkFirstDateBefore('18/12/2013' , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , '18/03/2014' ) ){						
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
		if(( eval(parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10)) >=  parseInt('10000',10))){

			if(parseInt(slab1 ,10) < eval((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10)) * parseFloat('0.3'))){
				var tempintrst234Ci = (((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) ) * parseFloat('0.30')) - parseInt(slab1 ,10));

				if(parseInt(tempintrst234Ci,10) > 100){
					tempintrst234Ci= Math.floor(parseInt(tempintrst234Ci,10)/100)*parseInt('100' ,10);
				}
				intrst234Ci=parseInt(tempintrst234Ci,10)* parseFloat('0.01') * parseInt('3' ,10) ;

			}
			
			if(eval(parseInt(slab1 ,10) + parseInt(slab2 ,10)) < eval((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10)) * parseFloat('0.6') )){
				var tempintrst234Cii = (((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10)) * parseFloat('0.6') ) -parseInt(slab1 ,10) - parseInt(slab2 ,10) );

				if(parseInt(tempintrst234Cii,10) > 100){
					tempintrst234Cii= Math.floor(parseInt(tempintrst234Cii,10)/100)*parseInt('100' ,10);
				}
				intrst234Cii=parseInt(tempintrst234Cii,10)* parseFloat('0.01') * parseInt('3' ,10) ;

			}
			
			if(eval(parseInt(slab1 ,10) + parseInt(slab2 ,10) + parseInt(slab3 ,10)) < eval((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10)) * parseInt('1' ,10))){
				var tempintrst234Ciii = ((parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10)) - parseInt(slab1 ,10)- parseInt(slab2 ,10) - parseInt(slab3 ,10) );

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
		var earliestSelfAsspaidDate=parseInt('0',10);
		var noOfMonthsTillSelfasst= parseInt('0',10);

		if(parseInt(balTaxPayable.value,10) - parseInt(TDS,10) >= parseInt('10000' ,10)) {
			if(parseInt(advanceTax,10) < ((parseInt(balTaxPayable.value,10) - parseInt(TDS,10)) * parseFloat('0.90'))) {

				intrst234Bprinciple = (parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10) );

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
						if( checkFirstDateBefore('01/04/2014' , allInputTags[p].value) && checkFirstDateBefore(allInputTags[p].value, currentDate) ){

							selfAsspaidDates[x]=allInputTags[p].value;
							selfAsspaidAmts[x]=allInputTags[p+2].value;
							x++;
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
					noOfMonthsTillSelfasst=calcNoOfMonths(currentDate,'01/04/2014');
				}else{
					noOfMonthsTillSelfasst=calcNoOfMonths(selfAsspaidDates[0],'01/04/2014');
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

						intrst234Bprinciple2=zeroOrMore(eval(parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10) +
								parseInt(intrst234A ,10)+parseInt(intrst234C ,10)+parseInt(intrst234Bi ,10)+parseInt(intrst234Bii ,10)
								-parseInt(partialSelfAssPaid,10)));

								// Rounding off to previous hundered
						if(parseInt(intrst234Bprinciple2,10) > parseInt('100' ,10)){
							intrst234Bprinciple2= Math.floor(parseInt(intrst234Bprinciple2,10)/100)*parseInt('100' ,10);
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

function sum234A234B234C(){
	

	var intrstPayable = document.getElementsByName('itr1.itr1TaxComputationOnline.totalIntrstPay')[0]; intrstPayable.value = coalesce(intrstPayable.value);

	

	var input234A = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234A')[0]; input234A.value = coalesce(input234A.value);
	var input234B = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234B')[0]; input234B.value = coalesce(input234B.value);
	var input234C = document.getElementsByName('itr1.itr1TaxComputationOnline.intrstPay.intrstPayUs234C')[0]; input234C.value = coalesce(input234C.value);

	intrstPayable.value =eval(Math.round(eval(input234A.value) + eval(input234B.value)+ eval(input234C.value)));

	
	calcIntrstPayable();
}

function calcTotTaxPaid(){

	var advanceTaxToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.advanceTax')[0];  advanceTaxToDisplay.value = coalesce(advanceTaxToDisplay.value);
	var TDSToDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.tds')[0]; 			   TDSToDisplay.value = coalesce(TDSToDisplay.value);
	var SATtoDisplay = document.getElementsByName('itr1.taxPaid.taxesPaid.selfAssessmentTax')[0];  SATtoDisplay.value = coalesce(SATtoDisplay.value);
	var totTaxPaid = document.getElementsByName('itr1.taxPaid.taxesPaid.totalTaxesPaid')[0];  totTaxPaid.value = coalesce(totTaxPaid.value);
	totTaxPaid.value = eval(parseInt(advanceTaxToDisplay.value ,10) + parseInt(TDSToDisplay.value,10) + parseInt(SATtoDisplay.value ,10));

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

function calcAge(){
	var dob = document.getElementsByName('itr1.personalInfo.dob')[0];
	var retVal = calcAgeCommon(dob);
	return retVal;
}

function returnFile_UnderSec() {
try{
	var val=document.getElementsByName('itr1.filingStatus.returnFileSec')[0].value;

	if(val=='18'){
		document.getElementsByName('itr1.filingStatus.returnType')[0].value='O';
		
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].readOnly=false;
		//document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].value = '';
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].readOnly=false;
		//document.getElementsByName('itr1.filingStatus.noticeNo')[0].value = '';
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.noticeDate')[0].readOnly=false;
		//document.getElementsByName('itr1.filingStatus.noticeDate')[0].value = '';
		
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
		
		$(function(){
			$("#PersistITR_itr1_filingStatus_noticeDate").datepicker("destroy");
		});
		
		returnType_change();
		
	}else{
		
		if(val == '13'||val=='14'||val=='15'||val=='16'){
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].disabled=false;
			document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].readOnly=false;
			//document.getElementsByName('itr1.filingStatus.noticeDateUnderSec')[0].value='';	
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
		
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.ackNoOriginalReturn')[0].value = '';
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].disabled=true;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].readOnly=true;
		document.getElementsByName('itr1.filingStatus.noticeNo')[0].value = '';
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
	}catch(e){ alert(e.stack);}
}

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

function onStateChng(){
	try{
		var state = document.getElementsByName('itr1.personalInfo.address.stateCode')[0];
		var country = document.getElementsByName('itr1.personalInfo.address.country')[0];
		var pinCode = document.getElementsByName('itr1.personalInfo.address.pinCode')[0];
		
		if(state.value != '99' && state.value != '-1'){
			country.value='91';
			pinCode.value='';
		}else if(state.value == '99'){
			pinCode.value='999999';
		}
	}catch(e){
		alert(e.stack);
	}	
}

function onChngPCC5A(){
	var typeHP = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
	if(typeHP=='Y'){
		addErrorXHTML('','You have selected to be governed by Sec 5A. Please enter only your share of  Income from'+
		' House Property and Income from Other Sources.Refer to instructions (A22) for further clarification');
		document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].disabled=false;
		document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].readOnly=false;
		
	} else {
	
	document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].disabled=true;
	document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].readOnly=true;
	document.getElementsByName('itr1.filingStatus.panOfSpouse')[0].value='';
		
	}
}
function validateOnSubmit(){

	checkTRP();
	gtiWarningMessage();
	checkEmptyAmtSpouse();
	validateTDS();
	ifscCodeUpperCase();
	
}

function checkTRP(){
	
	try{
		
		var trpName=document.getElementsByName('itr1.taxReturnPreparer.nameOfTRP')[0].value;
		var trpId=document.getElementsByName('itr1.taxReturnPreparer.identificationNoOfTRP')[0].value;
		
		if(trpName.length==0 && trpId.length!=0){
			addErrorXHTML('','Please enter the TRP Name');
			j.setFieldError('itr1.taxReturnPreparer.nameOfTRP','Please enter the TRP Name');
			
		}
		
		if(trpId.length==0 && trpName.length!=0){
			addErrorXHTML('','Please enter the TRP Id');
			j.setFieldError('itr1.taxReturnPreparer.identificationNoOfTRP','Please enter the TRP PIN');
			
			
		}
		}catch(e){
			alert(e);
		}
	
}

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

	function gtiWarningMessage() {
	
	var grossTotalIncome = document.getElementsByName('itr1.itr1IncomeDeductions.grossTotIncome')[0].value;
	if( parseInt(grossTotalIncome ,10) <0 ){
	 grossTotalIncome = parseInt(0,10);
	  addErrorXHTML('','To avail the benefit of carry forward and set off of loss, please use ITR-2.');
	 //j.setWarnings(grossTotalIncome,'To avail the benefit of carry forward and set off of loss, please use ITR-2.');
	}
	}
	
	
	function selfOccupdNegativChk(){

var typeOfHP = document.getElementsByName('itr1.itr1IncomeDeductions.typeOfHP')[0].value;
var incmHP = document.getElementsByName('itr1.itr1IncomeDeductions.totalIncomeOfHP')[0].value;

if(typeOfHP== 'S' && incmHP > 0){
	addErrorXHTML('' ,'Annual value of Self Occupied House property shall be nil in view of Sec 23(2)');	
	j.setFieldError('itr1.itr1IncomeDeductions.totalIncomeOfHP','Annual value of Self Occupied House property shall be nil in view of Sec 23(2)');
}

}

function calculateTax(){
clearOldValues();
calcItr1();
}



function getPan(){

var pan = document.getElementsByName('itr1.personalInfo.pan')[0].value;
return pan;
}

function zeroOrMore(val){
		val = coalesce(val);
		if(val < 0){
			return 0;
		}
		return val;
	}

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


function enableTDSspouseAmt(portVal){
var table = document.getElementById('taxDedSourceSrc');
var noOfRows = table.rows.length;
if(portVal=='Y'){
for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 2); i++) {
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=false;
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=false;
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].value='';
}
} else {
for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 2); i++) {
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=true;
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=true;
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].value='';
}
	}
}


function enableTDSspouseAmtOnLoad(){
var portVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
var table = document.getElementById('taxDedSourceSrc');
var noOfRows = table.rows.length;
if(portVal=='Y'){
for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 2); i++) {
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=false;
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=false;
}
} else {
for ( var i = 0; i < eval(parseInt(noOfRows, 10) - 2); i++) {
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].disabled=true;
document.getElementsByName('itr1.tdSonOthThanSals.tdSonOthThanSal['+i+'].amtClaimedBySpouse')[0].readOnly=true;
}

	}
}

function checkEmptyAmtSpouse(){
var tab = document.getElementById('taxDedSourceSrc');
var allInputTags = tab.getElementsByTagName('input');
var portuVal = document.getElementsByName('itr1.filingStatus.portugeseCC5A')[0].value;
var isRowBlank = checkRowBlank('taxDedSourceSrc', 2, 1);
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


function ifscCodeUpperCase(){

document.getElementsByName('itr1.refund.depositToBankAccount.iFSCCode')[0].value=document.getElementsByName('itr1.refund.depositToBankAccount.iFSCCode')[0].value.toUpperCase();

}
