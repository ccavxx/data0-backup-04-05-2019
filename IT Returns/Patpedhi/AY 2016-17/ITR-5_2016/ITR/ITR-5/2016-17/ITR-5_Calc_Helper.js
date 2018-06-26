function setEditableFieldValue(element, newVal){
    if(element.oldvalue!=newVal){
    	element.value = newVal;
    	element.oldvalue = newVal;
    }
}

////////////////////////////// CG Calculation Starts /////////////////////////////////

function addCGDeductions(tableId){
	var tab = document.getElementById(tableId);
	var inputs = tab.getElementsByTagName("INPUT");
	var sum = 0;
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].name.match('amount$')){
			sum = parseInt(sum) + parseInt(coalesce(inputs[i].value));
		}
	}
	return sum;
}

function calculateCGDeductions(){
	var tab = document.getElementById('schduleCGDed');
	var inputs = tab.getElementsByTagName('INPUT');
	var sum = 0;
	for(var i=0; i<inputs.length; i++){
		if(inputs[i].name.match('amtDed$')){
			sum = parseInt(sum, 10) + parseInt(coalesce(inputs[i].value), 10);
		}
	}
	var totDeductClaim = document.getElementsByName('scheduleCGPost45.deducClaimInfo.totDeductClaim')[0];
	totDeductClaim.value = sum;
}

function calcBulidingSellSTCG(){
    
    //calculate deduction
    var totalDedn = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.deductSec48.totalDedn')[0];
    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.deductSec48.aquisitCost') + 
                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.deductSec48.improveCost') +  
                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.deductSec48.expOnTrans'));
                       
   //calcBalance                  
   var balanceCG = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.balanceCG')[0];
   balanceCG.value = eval(coalesce(document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0].value) -
                    coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.deductSec48.totalDedn'));
   
   //gain on asset                  
   var capgainonAssets = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.capgainonAssets')[0];
   var exemptionOrDednUs54 = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.exemptionOrDednUs54')[0];
   exemptionOrDednUs54.value = addCGDeductions('stcgDeduction1');
   if(balanceCG.value > parseInt(0,10)){
   capgainonAssets.value = zeroOrMore(eval(balanceCG.value -
                    		parseInt(exemptionOrDednUs54.value)));
	} else {
		capgainonAssets.value = balanceCG.value;
	}
}

function calcSlumpSaleSTCG(){
	   var netWorthOfUTDivn = document.getElementsByName('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.cgSlumpSale')[0];
	   netWorthOfUTDivn.value = coalesceSetRet('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.fullConsideration')
	   							- coalesceSetRet('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.netWorthOfUTDivn');;
	 
}

function calcEquitySellSTCG(cgosIncome){
	
	var tab = document.getElementById('scheduleCGstcg2');
	var len = tab.tBodies.length;
	var sum = 0;
	for(var i=0;i<len;i++){	
		//Calc deduction
	    var totalDedn = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].deductSec48.totalDedn')[0];
	    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].deductSec48.aquisitCost') + 
	                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].deductSec48.improveCost') +  
	                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].deductSec48.expOnTrans'));
	    
	    //calcBalance                  
	    var balanceCG = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].balanceCG')[0];
	    balanceCG.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].fullConsideration') -
	    					   totalDedn.value);
	    
	    //gain on equity share
	    var capgainonAssets = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].capgainonAssets')[0];
	    capgainonAssets.value = eval(parseInt(balanceCG.value, 10) +
	                     coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ i +'].lossSec94of7Or94of8'));

	    var section = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[' + i +  '].section')[0].value;
	    if(section=='1A'){
	    	sum = parseInt(sum) + parseInt(capgainonAssets.value); 
	    }else if(section=='5AD1biip'){
	    	cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = capgainonAssets.value;
	    }	    
	    
	}
	return sum;
}

function calcSecuritiesSellSTCG(){
	//Calc deduction
    var totalDedn = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.totalDedn')[0];
    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost') + 
                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.improveCost') +  
                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.expOnTrans'));
    
    //calcBalance                  
    var balanceCG = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.balanceCG')[0];
    balanceCG.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration') -
    					   totalDedn.value);
    
    //gain on Securities
    var capgainonAssets = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.capgainonAssets')[0];
    capgainonAssets.value = eval(parseInt(balanceCG.value, 10) +
                     coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.lossSec94of7Or94of8'));     
}

function calcOtherAssetSellSTCG(){
	//Calc deduction
    var totalDedn = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.deductSec48.totalDedn')[0];
    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.deductSec48.aquisitCost') + 
                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.deductSec48.improveCost') +  
                           coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.deductSec48.expOnTrans'));
    
    //calcBalance                  
    var balanceCG = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.balanceCG')[0];
    balanceCG.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration') -
    					   totalDedn.value);
    
    var exemptionOrDednUs54 = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.exemptionOrDednUs54')[0];
    exemptionOrDednUs54.value = addCGDeductions('stcgDeduction2');
    //gain on Securities
    var capgainonAssets = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.capgainonAssets')[0];
    capgainonAssets.value = eval(parseInt(balanceCG.value, 10) +
                     coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.lossSec94of7Or94of8') + coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.amtDeemedCGDepAssets')); 

    if(parseInt(coalesce(capgainonAssets.value),10) > 0){
    	capgainonAssets.value = zeroOrMore(parseInt(capgainonAssets.value) - coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.exemptionOrDednUs54'));
    }
}

//To calculate STCG DTAA tax
function calcDtaaTaxSTCG(){
	
	var totAmtStcgUnderDtaa = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0];
	   
	totAmtStcgUnderDtaa.value = addCGDeductions('scheduleStcgDtaa');
	
}

function calculateSTCG(cgosIncome){
    
	calcBulidingSellSTCG();
	calcSlumpSaleSTCG();
    var sum = calcEquitySellSTCG(cgosIncome);
    calcSecuritiesSellSTCG();
    
    var amtDeemedCGDepAssets = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.amtDeemedCGDepAssets')[0];
    amtDeemedCGDepAssets.value =coalesceSetRet('scheduleDCG.summaryFromDeprSchCG.totalDepreciation');
    
    calcOtherAssetSellSTCG();
    calcDtaaTaxSTCG();
    
    
    var totalSTCG = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.totalSTCG')[0];
    totalSTCG.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.capgainonAssets') + 
    						coalesceSetRet('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.cgSlumpSale') +
            				parseInt(sum) +  
            				parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii) + 
            				coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid') +  
            				coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid') +  
            				coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.capgainonAssets') +  
            				coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.capgainonAssets') +  
            				//coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.amtDeemedCGDepAssets') + 
            				coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa') -
            				coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa'));

	cgosIncome.cgInc.stcg.prctg30 = coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.capgainonAssets');
	cgosIncome.cgInc.stcg.prctgAr = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.capgainonAssets') +
										coalesceSetRet('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.cgSlumpSale') +
										coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid') +
										coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.capgainonAssets') +
										//coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.amtDeemedCGDepAssets') +
										coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa')); 
	
	cgosIncome.cgInc.stcg.prctg15.sec111a = eval(parseInt(sum) + 
										 coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid') );
    
}

function calcBulidingSellLTCG(){
    
    //calculate deduction
    var totalDedn = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.deductSec48.totalDedn')[0];
    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.deductSec48.aquisitCost') + 
                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.deductSec48.improveCost') +  
                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.deductSec48.expOnTrans'));
                       
   //calcBalance                  
   var balanceCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.balanceCG')[0];
   balanceCG.value = eval(coalesce(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0].value) -
                    	  coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.deductSec48.totalDedn'));
   
   //gain on asset                  
   var capgainonAssets = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.capgainonAssets')[0];
    
   var exemptionOrDednUs54 = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.exemptionOrDednUs54')[0];
   
   exemptionOrDednUs54.value = addCGDeductions('ltcgDeduction1');
   
   if(balanceCG.value > parseInt(0,10)){
   capgainonAssets.value = zeroOrMore(eval(balanceCG.value -
                    			parseInt(exemptionOrDednUs54.value)));
	} else {
	capgainonAssets.value = balanceCG.value;
	}
}

function calcSlumpSaleLTCG(){
	   var netWorthOfUTDivn = document.getElementsByName('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.cgSlumpSaleB')[0];
	   netWorthOfUTDivn.value = coalesceSetRet('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.fullConsiderationB')
	   							- coalesceSetRet('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.netWorthOfUTDivnB');
	    var exemptionOrDednUs54 = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.capGainSlumpSale.exemptionOrDednUs54');
	    var longTCgains = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.capGainSlumpSale.capgainonAssets')[0];	    
	    if(parseInt(netWorthOfUTDivn.value) < 0){
	    	longTCgains.value = netWorthOfUTDivn.value;
	    }else{
	    	longTCgains.value = zeroOrMore(netWorthOfUTDivn.value - exemptionOrDednUs54);
	    }
}

function calcBondSellLTCG(){
	//Calc deduction
    var totalDedn = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.deductSec48.totalDedn')[0];
    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.deductSec48.aquisitCost') + 
                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.deductSec48.improveCost') +  
                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.deductSec48.expOnTrans'));
    
    //calcBalance                  
    var balanceCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.balanceCG')[0];
    balanceCG.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.fullConsideration') -
    					   totalDedn.value);
    
    //gain on Assets
    var capgainonAssets = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.capgainonAssets')[0];
    var exemptionOrDednUs54 = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.exemptionOrDednUs54');
	if(balanceCG.value > parseInt(0,10)){
    capgainonAssets.value = zeroOrMore(eval(balanceCG.value -
                     			 parseInt(exemptionOrDednUs54)));    
	} else {
	capgainonAssets.value = balanceCG.value;
	}
}

function calcListedSecuritiesSellLTCG(cgosIncome){
	
	var tab = document.getElementById('scheduleCGltcg3');
	var len = tab.tBodies.length;
	var sum = 0;
	for(var i=0;i<len;i++){
	
		//Calc deduction
	    var totalDedn = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].deductSec48.totalDedn')[0];
	    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].deductSec48.aquisitCost') + 
	                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].deductSec48.improveCost') +  
	                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].deductSec48.expOnTrans'));
	    
	    //calcBalance                  
	    var balanceCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].balanceCG')[0];
	    balanceCG.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].fullConsideration') -
	    					   totalDedn.value);
	    
	    //gain on Assets
	    var capgainonAssets = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].capgainonAssets')[0];
	    var exemptionOrDednUs54S = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['+ i +'].exemptionOrDednUs54S');
	    //exemptionOrDednUs54S.value = addCGDeductions('scheduleCGltcg3_ded' + (i+1));
	
	    if(balanceCG.value > parseInt(0,10)){
	    capgainonAssets.value = zeroOrMore(eval(balanceCG.value -
	                     			 parseInt(exemptionOrDednUs54S)));     
		} else {
									 
			capgainonAssets.value = balanceCG.value;
		}
	    
	    var section = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[' + i +  '].sectionCode')[0].value;
	    if(section=='22'){
	    	sum = parseInt(sum) + parseInt(capgainonAssets.value); 
	    }
	}
	
	return sum;
}

function calcNRIProvisoSec48LTCG(){
	var balanceCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.BalanceCG')[0];
	var ltcgWithoutBenefit = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit');
	var exemptionOrDednUs54 = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0];
	if(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit') > parseInt(0, 10)){
		balanceCG.value = zeroOrMore(eval( ltcgWithoutBenefit - exemptionOrDednUs54.value));
	}else{
		balanceCG.value = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit');
	}    
}

function calcUnlistedSecuritiesSellLTCG(cgosIncome){
	//Calc deduction
	
	var tab = document.getElementById('stcg10pctTab');
	var len = tab.tBodies.length;
	var sum = 0;
	for(var i=0;i<len;i++){
	    var totalDedn = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].deductSec48.totalDedn')[0];
	    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].deductSec48.aquisitCost') + 
	                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].deductSec48.improveCost') +  
	                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].deductSec48.expOnTrans'));
	    
	    //calcBalance                  
	    var balanceCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].balanceCG')[0];
	    balanceCG.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].fullConsideration') -
	    					   totalDedn.value);
	    
	    //gain on Assets
	    var capgainonAssets = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].capgainonAssets')[0];
		var exemptionOrDednUs54S = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].exemptionOrDednUs54S')[0];
		//exemptionOrDednUs54S.value = addCGDeductions('stcg10pctTab_ded' + (i+1));
		coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].exemptionOrDednUs54S');
		
		if(balanceCG.value > parseInt(0,10)){
	    capgainonAssets.value = zeroOrMore(eval(balanceCG.value -
	    							 parseInt(exemptionOrDednUs54S.value)));
		} else {
		capgainonAssets.value = balanceCG.value;
		}
	    sum = parseInt(sum, 10) + parseInt(capgainonAssets.value, 10);
	    var section = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[' + i +  '].sectionCode')[0].value;
	    if(section=='21ciii'){
	    	cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = parseInt(capgainonAssets.value, 10); 
	    }else if(section=='5AC1c'){
	    	cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = parseInt(capgainonAssets.value, 10);
	    }else if(section=='5AB1b'){
	    	cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = parseInt(capgainonAssets.value, 10);
	    }else if(section=='5ADiii'){
	    	cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = parseInt(capgainonAssets.value, 10);
	    } 
	}
	return sum;
}

function calcForexAssetLTCG(){
	//var balonSpeciAsset = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balonSpeciAsset')[0];
	//var dednSpecAssetus115 = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednSpecAssetus115');
	//var saleonSpecAsset = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleonSpecAsset');

	if(parseInt(saleonSpecAsset) > parseInt(0, 10)){
		balonSpeciAsset.value = zeroOrMore(eval(parseInt(saleonSpecAsset) - 
							   		 parseInt(dednSpecAssetus115)));
	}else{
		balonSpeciAsset.value = saleonSpecAsset;
	} 	
	
	//var balOtherthanSpecAsset = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balOtherthanSpecAsset')[0];
	//var dednOtherSpecAssetus115 = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednOtherSpecAssetus115');
	var saleOtherSpecAsset = coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleOtherSpecAsset');
	
	if(parseInt(saleOtherSpecAsset) > parseInt(0, 10)){
		balOtherthanSpecAsset.value = zeroOrMore(eval(parseInt(saleOtherSpecAsset) - 
							   		 parseInt(dednOtherSpecAssetus115)));
	}else{
		balOtherthanSpecAsset.value = saleOtherSpecAsset;
	} 
}

function calcOthAssetLTCG(){
	//Calc deduction
    var totalDedn = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.totalDedn')[0];
    totalDedn.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.aquisitCost') + 
                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.improveCost') +  
                           coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.expOnTrans'));
    
    //calcBalance                  
    var balanceCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.balanceCG')[0];
    balanceCG.value = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration') -
    					   totalDedn.value);
    
    //gain on Assets
    var capgainonAssets = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.capgainonAssets')[0];
    var exemptionOrDednUs54S = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.exemptionOrDednUs54S')[0];
    exemptionOrDednUs54S.value = addCGDeductions('scheduleCGltcg7');
    if(parseInt(balanceCG.value) > 0){
    capgainonAssets.value = zeroOrMore(eval(balanceCG.value -
    							 parseInt(exemptionOrDednUs54S.value)));
    }else{
    	capgainonAssets.value = balanceCG.value;
    }
}

//To calculate DTAA tax 
function calcDtaaTaxLTCG(){
	var totAmtLtcgUnderDtaa = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.totAmtLtcgUnderDtaa')[0];
	   
	totAmtLtcgUnderDtaa.value = addCGDeductions('scheduleLtcgDtaa');
	
}
function calculateLTCG(cgosIncome){
    
	calcBulidingSellLTCG();
	calcSlumpSaleLTCG();
	calcBondSellLTCG();
	var secSell = calcListedSecuritiesSellLTCG(cgosIncome);
	calcNRIProvisoSec48LTCG();
	var sum = calcUnlistedSecuritiesSellLTCG(cgosIncome);
	//calcForexAssetLTCG();
	calcOthAssetLTCG();	
	//ltcgPoint8Sum();
	calcDtaaTaxLTCG();
    var totalLTCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.totalLTCG')[0];
   
    totalLTCG.value = eval( coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.capgainonAssets') + 
    						coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.capGainSlumpSale.capgainonAssets') + 
            				coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.capgainonAssets') +  
            				parseInt(secSell) +
            				coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.BalanceCG') +
            				//parseInt(coalesce(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B)) +            				
            				//coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgOnListedSecurity') +  
            				//coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgOnUnlistedSecurity') +  
            				parseInt(sum, 10) +  
            				//coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balonSpeciAsset') +  
            				//coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balOtherthanSpecAsset') +  
            				coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.capgainonAssets') +  
            				//coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.amtDeemedCGSec54')
            				coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa') -
            				coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.totAmtLtcgUnderDtaa'));

	cgosIncome.cgInc.ltcg.prctg20.sec112 = eval(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.capgainonAssets') + 
												coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.capGainSlumpSale.capgainonAssets') + 
												coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.capgainonAssets') +  
												coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.BalanceCG') +
												coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa') +  
												coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.capgainonAssets') - setOffWithDtaa('sec112'));
	
	cgosIncome.cgInc.ltcg.prctg20.sec11EA = 0;
		
	cgosIncome.cgInc.ltcg.prctg10.secProviso = eval(parseInt(secSell) - setOffWithDtaa('secProviso'));
	
	cgosIncome.cgInc.ltcg.prctg10.sec115E_b = 0;
	
}

function doCGSetOff(cgosIncome){
	populateCGTab(cgosIncome);
	setOffPctg30Loss(cgosIncome);
	setOffPctgArLoss(cgosIncome);
	setOffPctg20Loss(cgosIncome);	
	setOffPctg15Loss(cgosIncome);
	setOffPctg10Loss(cgosIncome);
}
	
//To setOfff STCG With A9
function setOffSTCGWithA9(cgosIncome) {
	
	var sec111a= parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a,10);
	var sec115ad_1_b_ii = parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii,10);
	
	var tab = document.getElementById('scheduleStcgDtaa');
	var noOfRows = tab.rows.length - 2;
	
	var sectionValue;
	var amount;
	
	for(var i=0; i<noOfRows; i++){
		sectionValue = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['+i+'].itemIncluded')[0].value;
		amount = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['+i+'].amount')[0].value;
		
		if(sectionValue=='A3e_111A' || sectionValue=='A4a' ){
			sec111a -= amount;
		}
		else if(sectionValue=='A3e_115AD'){
			sec115ad_1_b_ii -= amount;
		}
		else if(sectionValue=='A5e'){
			cgosIncome.cgInc.stcg.prctg30 -= amount;			
		}
		else if(sectionValue=='A1e' || sectionValue=='A2c' ||sectionValue=='A4b'||sectionValue=='A6g'||sectionValue=='A7' ||sectionValue=='A8'){
			cgosIncome.cgInc.stcg.prctgAr -= amount;
		}
	}
	
	cgosIncome.cgInc.stcg.prctg15.sec111a = sec111a;
	cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii=sec115ad_1_b_ii;
	
}

//To populate CG Tab values
function populateCGTab(cgosIncome){
	
	setOffSTCGWithA9(cgosIncome);
	//setOffLTCGWithB9(cgosIncome);
	var stcg = cgosIncome.cgInc.stcg;
	var prctg15 = cgosIncome.cgInc.stcg.prctg15;
	var prctg15Sum = eval( parseInt(prctg15.sec111a,10) + 
							 parseInt(prctg15.sec115ad_1_b_ii,10));
	
	var neg15 = 0;
	if(zeroOrLess(prctg15.sec111a) < 0){
		neg15 = parseInt(neg15) + parseInt(prctg15.sec111a);
		prctg15.sec111a = 0;
	}
	if(zeroOrLess(prctg15.sec115ad_1_b_ii) < 0){
		neg15 = parseInt(neg15) + parseInt(prctg15.sec115ad_1_b_ii);
		prctg15.sec115ad_1_b_ii = 0;
	}	
	
	if(neg15 < 0){
		var setOff = setOffAgainst111a(neg15, cgosIncome);
		neg15 = parseInt(neg15) + parseInt(setOff);
		setOff = setOffAgainst115ad_1_b_ii(neg15, cgosIncome);
		neg15 = parseInt(neg15) + parseInt(setOff);
		prctg15.sec111a = parseInt(neg15) + parseInt(prctg15.sec111a);
	}
	
	setProfitLoss(prctg15Sum, 'scheduleCGPost45.currYrLosses.inLossSetOff.stclSetoff15Per', 'scheduleCGPost45.currYrLosses.inStcg15Per.currYearIncome');
	setProfitLoss(stcg.prctg30, 'scheduleCGPost45.currYrLosses.inLossSetOff.StclSetoff30Per', 'scheduleCGPost45.currYrLosses.inStcg30Per.currYearIncome');
	setProfitLoss(stcg.prctgAr, 'scheduleCGPost45.currYrLosses.inLossSetOff.StclSetoffAppRate', 'scheduleCGPost45.currYrLosses.inStcgAppRate.currYearIncome');
	
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	prctg10.sec115ACA_1 = prctg10.sec115ACA_1 - setOffWithDtaa('sec115ACA_1');
	prctg10.sec112_1_c_2 = prctg10.sec112_1_c_2 - setOffWithDtaa('sec112_1_c_2');
	prctg10.sec115AC_1 = prctg10.sec115AC_1 -  setOffWithDtaa('sec115AC_1');
	prctg10.sec115AD_3 = prctg10.sec115AD_3 - setOffWithDtaa('sec115AD_3');
	prctg10.sec115_AB_1_B = prctg10.sec115_AB_1_B - setOffWithDtaa('sec115_AB_1_B');
	
	var prctg10Sum = eval( parseInt(prctg10.secProviso,10) + 
							 parseInt(prctg10.sec112_1_c_2,10) + 
							 parseInt(prctg10.sec115AC_1,10) + 
							 parseInt(prctg10.sec115_AB_1_B,10) + 
							 parseInt(prctg10.sec115AD_3,10) + 
							 parseInt(prctg10.sec115E_b,10) );
					 
	var neg10 = 0;
	

	if(zeroOrLess(prctg10.sec112_1_c_2) < 0){
		neg10 = parseInt(neg10) + parseInt(prctg10.sec112_1_c_2);
		prctg10.sec112_1_c_2 = 0;
	}
	if(zeroOrLess(prctg10.sec115_AB_1_B) < 0){
		neg10 = parseInt(neg10) + parseInt(prctg10.sec115_AB_1_B);
		prctg10.sec115_AB_1_B = 0;
	}	
	if(zeroOrLess(prctg10.sec115AC_1) < 0){
		neg10 = parseInt(neg10) + parseInt(prctg10.sec115AC_1);
		prctg10.sec115AC_1 = 0;
	}
	if(zeroOrLess(prctg10.sec115AD_3) < 0){
		neg10 = parseInt(neg10) + parseInt(prctg10.sec115AD_3);
		prctg10.sec115AD_3 = 0;
	}
	if(zeroOrLess(prctg10.secProviso) < 0){
		neg10 = parseInt(neg10) + parseInt(prctg10.secProviso);
		prctg10.secProviso = 0;
	}	

	if(neg10 < 0){
		var setOff = setOffAgainst112_1_c_2(neg10, cgosIncome);
		neg10 = parseInt(neg10) + parseInt(setOff);
		
		setOff = setOffAgainst115_AB_1_B(neg10, cgosIncome);
		neg10 = parseInt(neg10) + parseInt(setOff);
		
		setOff = setOffAgainst115AC_1(neg10, cgosIncome);
		neg10 = parseInt(neg10) + parseInt(setOff);

		setOff = setOffAgainst115AD_3(neg10, cgosIncome);
		neg10 = parseInt(neg10) + parseInt(setOff);
		
		
		setOff = setOffAgainstsecProviso(neg10, cgosIncome);
		neg10 = parseInt(neg10) + parseInt(setOff);	
		
		prctg10.sec112_1_c_2 = parseInt(neg10) + parseInt(prctg10.sec112_1_c_2);	
	}
		
	
	var prctg20 = cgosIncome.cgInc.ltcg.prctg20;
	var prctg20Sum = eval( parseInt(prctg20.sec112,10) + 
							 parseInt(prctg20.sec11EA,10));
	
	var neg20 = 0;
	if(zeroOrLess(prctg20.sec112) < 0){
		neg20 = parseInt(neg20) + parseInt(prctg20.sec112);
		prctg20.sec112 = 0;
	}
	if(zeroOrLess(prctg20.sec11EA) < 0){
		neg20 = parseInt(neg20) + parseInt(prctg20.sec11EA);
		prctg20.sec11EA = 0;
	}	
	
	if(neg20 < 0){
		var setOff = setOffAgainst112(neg20, cgosIncome);
		neg20 = parseInt(neg20) + parseInt(setOff);
		prctg20.sec112 = parseInt(neg20) + parseInt(prctg20.sec112 );
	}	
	
	setProfitLoss(prctg10Sum, 'scheduleCGPost45.currYrLosses.inLossSetOff.LtclSetOff10Per', 'scheduleCGPost45.currYrLosses.inLtcg10Per.currYearIncome');
	setProfitLoss(prctg20Sum, 'scheduleCGPost45.currYrLosses.inLossSetOff.LtclSetOff20Per', 'scheduleCGPost45.currYrLosses.inLtcg20Per.currYearIncome');
	

}



function setOffPctg30Loss(cgosIncome){
	var inStcgAppRate = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcgAppRate.stclSetoff30Per')[0];
	var inStcg15Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcg15Per.stclSetoff30Per')[0];
	var inLtcg20Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg20Per.StclSetoff30Per')[0];
	var inLtcg10Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg10Per.stclSetoff30Per')[0];
	
	var amtSetOff = 0;
	
	amtSetOff = setOffAgainstAr(parseInt(cgosIncome.cgInc.stcg.prctg30, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctg30 = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctg30, 10));
	inStcgAppRate.value = Math.abs(parseInt(amtSetOff, 10));	

	amtSetOff = setOffAgainst20(parseInt(cgosIncome.cgInc.stcg.prctg30, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctg30 = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctg30, 10));
	inLtcg20Per.value = Math.abs(parseInt(amtSetOff, 10));	
	
	amtSetOff = setOffAgainst15(parseInt(cgosIncome.cgInc.stcg.prctg30, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctg30 = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctg30, 10));
	inStcg15Per.value = Math.abs(parseInt(amtSetOff, 10));
	
	amtSetOff = setOffAgainst10(parseInt(cgosIncome.cgInc.stcg.prctg30, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctg30 = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctg30, 10));
	inLtcg10Per.value = Math.abs(parseInt(amtSetOff, 10));
}

function setOffPctgArLoss(cgosIncome){
	var inStcg30Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcg30Per.stclSetoffAppRate')[0];
	var inStcg15Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcg15Per.StclSetoffAppRate')[0];
	var inLtcg20Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg20Per.StclSetoffAppRate')[0];
	var inLtcg10Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg10Per.stclSetoffAppRate')[0];
	
	var amtSetOff = 0;
	
	amtSetOff = setOffAgainst30(parseInt(cgosIncome.cgInc.stcg.prctgAr, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctgAr = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctgAr, 10));
	inStcg30Per.value = Math.abs(parseInt(amtSetOff, 10));	

	amtSetOff = setOffAgainst20(parseInt(cgosIncome.cgInc.stcg.prctgAr, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctgAr = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctgAr, 10));
	inLtcg20Per.value = Math.abs(parseInt(amtSetOff, 10));	
	
	amtSetOff = setOffAgainst15(parseInt(cgosIncome.cgInc.stcg.prctgAr, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctgAr = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctgAr, 10));
	inStcg15Per.value = Math.abs(parseInt(amtSetOff, 10));
	
	amtSetOff = setOffAgainst10(parseInt(cgosIncome.cgInc.stcg.prctgAr, 10), cgosIncome);
	cgosIncome.cgInc.stcg.prctgAr = eval( parseInt(amtSetOff, 10) +
										  parseInt(cgosIncome.cgInc.stcg.prctgAr, 10));
	inLtcg10Per.value = Math.abs(parseInt(amtSetOff, 10));
}

function setOffPctg15Loss(cgosIncome){
	var inStcg30Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcg30Per.stclSetoff15Per')[0];
	var inStcgAppRate = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcgAppRate.stclSetoff15Per')[0];
	var inLtcg20Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg20Per.StclSetoff15Per')[0];
	var inLtcg10Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg10Per.stclSetoff15Per')[0];
	
	var amtSetOff = 0;
	var totalSetOff = 0;

	var prctg15 = cgosIncome.cgInc.stcg.prctg15;
	var prctg15Sum = eval( parseInt(prctg15.sec111a,10) + 
							 parseInt(prctg15.sec115ad_1_b_ii,10));
	
	amtSetOff = setOffAgainst30(parseInt(prctg15Sum, 10), cgosIncome);
	prctg15Sum = eval( parseInt(amtSetOff, 10) +
					   parseInt(prctg15Sum, 10));
	totalSetOff = amtSetOff;
	inStcg30Per.value = Math.abs(parseInt(amtSetOff, 10));	

	amtSetOff = setOffAgainstAr(parseInt(prctg15Sum, 10), cgosIncome);
	prctg15Sum = eval( parseInt(amtSetOff, 10) +
										  parseInt(prctg15Sum, 10));
	totalSetOff = parseInt(totalSetOff) + parseInt(amtSetOff);
	inStcgAppRate.value = Math.abs(parseInt(amtSetOff, 10));

	amtSetOff = setOffAgainst20(parseInt(prctg15Sum, 10), cgosIncome);
	prctg15Sum = eval( parseInt(amtSetOff, 10) +
										  parseInt(prctg15Sum, 10));
	totalSetOff = parseInt(totalSetOff) + parseInt(amtSetOff);
	inLtcg20Per.value = Math.abs(parseInt(amtSetOff, 10));
	
	amtSetOff = setOffAgainst10(parseInt(prctg15Sum, 10), cgosIncome);
	prctg15Sum = eval( parseInt(amtSetOff, 10) +
										  parseInt(prctg15Sum, 10));
	totalSetOff = parseInt(totalSetOff) + parseInt(amtSetOff);
	inLtcg10Per.value = Math.abs(parseInt(amtSetOff, 10));
	
	if(parseInt(totalSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10)) > parseInt(totalSetOff, 10)){
		cgosIncome.cgInc.stcg.prctg15.sec111a = parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10) + 
												parseInt(totalSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(totalSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10) < 0){
		amtSetOff = parseInt(totalSetOff, 10) + 
			parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10) ;
		cgosIncome.cgInc.stcg.prctg15.sec111a = 0;
	}

	if(parseInt(totalSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10)) > parseInt(totalSetOff, 10)){
		cgosIncome.cgInc.ltcg.prctg20.sec115ad_1_b_ii = parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10) + 
												parseInt(totalSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(totalSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10) < 0){
		amtSetOff = parseInt(totalSetOff, 10) + 
					parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10) ;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = 0;
	}		
	
}

function setOffPctg20Loss(cgosIncome){
	var inLtcg10Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg10Per.ltclSetOff20Per')[0];

	var amtSetOff = 0;
					 
	var prctg20 = cgosIncome.cgInc.ltcg.prctg20;
	var prctg20Sum = eval( parseInt(prctg20.sec112,10) + 
							 parseInt(prctg20.sec11EA,10));
	
	amtSetOff = setOffAgainst10(parseInt(prctg20Sum, 10), cgosIncome);
	
	inLtcg10Per.value = Math.abs(parseInt(amtSetOff, 10));
	
	if(parseInt(amtSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10)) > parseInt(amtSetOff, 10)){
		cgosIncome.cgInc.ltcg.prctg20.sec112 = parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) + 
												parseInt(amtSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(amtSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) < 0){
		amtSetOff = parseInt(amtSetOff, 10) + 
			parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) ;
		cgosIncome.cgInc.ltcg.prctg20.sec112 = 0;
	}


}

function setOffPctg10Loss(cgosIncome){
	var inLtcg20Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg20Per.LtclSetOff10Per')[0];
	
	var amtSetOff = 0;
	
	
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = eval( parseInt(prctg10.secProviso,10) + 
							 parseInt(prctg10.sec112_1_c_2,10) + 
							 parseInt(prctg10.sec115AC_1,10) + 
							 parseInt(prctg10.sec115_AB_1_B,10) + 
							 parseInt(prctg10.sec115AD_3,10) + 
							 parseInt(prctg10.sec115E_b,10) );

	amtSetOff = setOffAgainst20(parseInt(prctg10Sum, 10), cgosIncome);
	
	inLtcg20Per.value = Math.abs(parseInt(amtSetOff, 10));
	


	if(parseInt(amtSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10)) > parseInt(amtSetOff, 10)){
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10) +
												parseInt(amtSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(amtSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10) < 0){
		amtSetOff = parseInt(amtSetOff, 10) + 
					parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10) ;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = 0;
	}	

	if(parseInt(amtSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10)) > parseInt(amtSetOff, 10)){
		cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10) + 
												parseInt(amtSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(amtSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10) < 0){
		amtSetOff = parseInt(amtSetOff, 10) + 
					parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10) ;
		cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = 0;
	}
	
	if(parseInt(amtSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10)) > parseInt(amtSetOff, 10)){
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10) + 
												parseInt(amtSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(amtSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10) < 0){
		amtSetOff = parseInt(amtSetOff, 10) + 
					parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10) ;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = 0;
	}
	
	
	if(parseInt(amtSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10)) > parseInt(amtSetOff, 10)){
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10) + 
												parseInt(amtSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(amtSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10) < 0){
		amtSetOff = parseInt(amtSetOff, 10) + 
					parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10) ;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = 0;
	}

	
	if(parseInt(amtSetOff, 10) >= 0 && Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10)) > parseInt(amtSetOff, 10)){
		cgosIncome.cgInc.ltcg.prctg10.secProviso = parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10) + 
												parseInt(amtSetOff, 10);
		amtSetOff = 0;
	}else if(parseInt(amtSetOff, 10) >= 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10) < 0){
		amtSetOff = parseInt(amtSetOff, 10) + 
					parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10) ;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = 0;
	}
	
	calcCYCgRemaining(cgosIncome);
	calcTotalSetOffs();
	calcLossRemaining(cgosIncome);

}

function calcCYCgRemaining(cgosIncome){
	var inStcg15Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcg15Per.CurrYrLosSetOff')[0];
	var inStcg30Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcg30Per.currYrLosSetOff')[0];
	var inStcgAppRate = document.getElementsByName('scheduleCGPost45.currYrLosses.inStcgAppRate.currYrLosSetOff')[0];
	var inLtcg10Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg10Per.currYrLosSetOff')[0];
	var inLtcg20Per = document.getElementsByName('scheduleCGPost45.currYrLosses.inLtcg20Per.CurrYrLosSetOff')[0];
	
	var prctg15 = cgosIncome.cgInc.stcg.prctg15;
	var prctg15Sum = eval( parseInt(prctg15.sec111a,10) + 
							 parseInt(prctg15.sec115ad_1_b_ii,10));	
	inStcg15Per.value = zeroOrMore(prctg15Sum);

	inStcg30Per.value = zeroOrMore(cgosIncome.cgInc.stcg.prctg30);

	inStcgAppRate.value = zeroOrMore(cgosIncome.cgInc.stcg.prctgAr);
	
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = eval( parseInt(prctg10.secProviso,10) + 
							 parseInt(prctg10.sec112_1_c_2,10) + 
							 parseInt(prctg10.sec115AC_1,10) + 
							 parseInt(prctg10.sec115_AB_1_B,10) + 
							 parseInt(prctg10.sec115AD_3,10) + 
							 parseInt(prctg10.sec115E_b,10) );
	
	
	inLtcg10Per.value = zeroOrMore(prctg10Sum);
	
	var prctg20 = cgosIncome.cgInc.ltcg.prctg20;
	var prctg20Sum = eval( parseInt(prctg20.sec112,10) + 
							 parseInt(prctg20.sec11EA,10));
	
	inLtcg20Per.value = zeroOrMore(prctg20Sum);	
}

function calcTotalSetOffs(){
	var stclSetoff15Per = document.getElementsByName('scheduleCGPost45.currYrLosses.totLossSetOff.stclSetoff15Per')[0];
	var stclSetoff30Per = document.getElementsByName('scheduleCGPost45.currYrLosses.totLossSetOff.stclSetoff30Per')[0];
	var stclSetoffAppRate = document.getElementsByName('scheduleCGPost45.currYrLosses.totLossSetOff.stclSetoffAppRate')[0];
	var ltclSetOff10Per = document.getElementsByName('scheduleCGPost45.currYrLosses.totLossSetOff.ltclSetOff10Per')[0];
	var ltclSetOff20Per = document.getElementsByName('scheduleCGPost45.currYrLosses.totLossSetOff.ltclSetOff20Per')[0];
	
	ltclSetOff20Per.value = eval(coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg10Per.ltclSetOff20Per') );

	ltclSetOff10Per.value = eval(coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg20Per.LtclSetOff10Per') );
	
	stclSetoffAppRate.value = eval(coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg15Per.StclSetoffAppRate') + 
			 coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg30Per.stclSetoffAppRate') +
			 coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg10Per.stclSetoffAppRate') + 
			 coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg20Per.StclSetoffAppRate') );
	
	stclSetoff30Per.value = eval(coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg15Per.stclSetoff30Per') + 
				 coalesceSetRet('scheduleCGPost45.currYrLosses.inStcgAppRate.stclSetoff30Per') +
				 coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg10Per.stclSetoff30Per') + 
				 coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg20Per.StclSetoff30Per') );
	
	stclSetoff15Per.value = eval(coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg30Per.stclSetoff15Per') + 
				 coalesceSetRet('scheduleCGPost45.currYrLosses.inStcgAppRate.stclSetoff15Per') +
				 coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg10Per.stclSetoff15Per') + 
				 coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg20Per.StclSetoff15Per') );		
}

function calcLossRemaining(cgosIncome){
	var stclSetoff15Per = document.getElementsByName('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoff15Per')[0];
	var stclSetoff30Per = document.getElementsByName('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoff30Per')[0];
	var stclSetoffAppRate = document.getElementsByName('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoffAppRate')[0];
	var ltclSetOff10Per = document.getElementsByName('scheduleCGPost45.currYrLosses.lossRemainSetOff.ltclSetOff10Per')[0];
	var ltclSetOff20Per = document.getElementsByName('scheduleCGPost45.currYrLosses.lossRemainSetOff.ltclSetOff20Per')[0];

	var prctg15 = cgosIncome.cgInc.stcg.prctg15;
	var prctg15Sum = eval( parseInt(prctg15.sec111a,10) + 
							 parseInt(prctg15.sec115ad_1_b_ii,10));	
	
	stclSetoff15Per.value = Math.abs(zeroOrLess(prctg15Sum));

	stclSetoff30Per.value = Math.abs(zeroOrLess(cgosIncome.cgInc.stcg.prctg30));

	stclSetoffAppRate.value = Math.abs(zeroOrLess(cgosIncome.cgInc.stcg.prctgAr));
	
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = eval( parseInt(prctg10.secProviso,10) + 
							 parseInt(prctg10.sec112_1_c_2,10) + 
							 parseInt(prctg10.sec115AC_1,10) + 
							 parseInt(prctg10.sec115_AB_1_B,10) + 
							 parseInt(prctg10.sec115AD_3,10) + 
							 parseInt(prctg10.sec115E_b,10) );
	
	ltclSetOff10Per.value = Math.abs(zeroOrLess(prctg10Sum));
	
	var prctg20 = cgosIncome.cgInc.ltcg.prctg20;
	var prctg20Sum = eval( parseInt(prctg20.sec112,10) + 
							 parseInt(prctg20.sec11EA,10));
	
	ltclSetOff20Per.value = Math.abs(zeroOrLess(prctg20Sum));	
}

function setOffAgainstAr(value, cgosIncome){
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.stcg.prctgAr, 10) > 0){
		if(parseInt(cgosIncome.cgInc.stcg.prctgAr, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.stcg.prctgAr = eval( parseInt(cgosIncome.cgInc.stcg.prctgAr, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.stcg.prctgAr, 10));	
			cgosIncome.cgInc.stcg.prctgAr = 0;	
		}
	}
	return amtSetOff;
}

function setOffAgainst30(value, cgosIncome){
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.stcg.prctg30, 10) > 0){
		if(parseInt(cgosIncome.cgInc.stcg.prctg30, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.stcg.prctg30 = eval( parseInt(cgosIncome.cgInc.stcg.prctg30, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.stcg.prctg30, 10));	
			cgosIncome.cgInc.stcg.prctg30 = 0;	
		}
	}
	return amtSetOff;
}

function setOffAgainst15(value, cgosIncome){
	
	var amtSetOff111a = 0;
	var amtSetOff115ad_1_b_ii = 0;
	if(value<0){
		amtSetOff115ad_1_b_ii = setOffAgainst115ad_1_b_ii(value, cgosIncome);
		amtSetOff111a = setOffAgainst111a(value + amtSetOff115ad_1_b_ii, cgosIncome);
		
	}
	return parseInt(amtSetOff111a, 10) + parseInt(amtSetOff115ad_1_b_ii, 10);	

}

function setOffAgainst20(value, cgosIncome){
	var amtSetOff112 = 0;
	if(value<0){
		amtSetOff112 = setOffAgainst112(value, cgosIncome);
		//amtSetOff115ea = setOffAgainst115Ea(value + amtSetOff112, cgosIncome);
	}
	return parseInt(amtSetOff112, 10);
}

function setOffAgainst10(value, cgosIncome){
	var amtSetOff = 0;
	if(value < 0){
		amtSetOff = eval(parseInt(amtSetOff, 10) + parseInt(setOffAgainst112_1_c_2(value + amtSetOff, cgosIncome), 10));
		amtSetOff = eval(parseInt(amtSetOff, 10) + parseInt(setOffAgainst115_AB_1_B(value + amtSetOff, cgosIncome), 10));		
		amtSetOff = eval(parseInt(amtSetOff, 10) + parseInt(setOffAgainst115AC_1(value + amtSetOff, cgosIncome), 10));
		amtSetOff = eval(parseInt(amtSetOff, 10) + parseInt(setOffAgainst115AD_3(value + amtSetOff, cgosIncome), 10));
//		amtSetOff = eval(parseInt(amtSetOff, 10) + parseInt(setOffAgainst115E_b(value + amtSetOff, cgosIncome), 10));
		amtSetOff = eval(parseInt(amtSetOff, 10) + parseInt(setOffAgainstsecProviso(value + amtSetOff, cgosIncome), 10));
	}
	return amtSetOff;
}

function setOffAgainst111a(value, cgosIncome){
	
	
	var prctg15 = cgosIncome.cgInc.stcg.prctg15;
	var prctg15Sum = eval( parseInt(prctg15.sec111a,10) + 
							 parseInt(prctg15.sec115ad_1_b_ii,10));			
	
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10) > 0){
		if(parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.stcg.prctg15.sec111a = eval( parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10));	
			cgosIncome.cgInc.stcg.prctg15.sec111a = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg15Sum)){
			cgosIncome.cgInc.stcg.prctg15.sec111a = parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a) + parseInt(amtSetOff) - parseInt(prctg15Sum);
			amtSetOff = parseInt(prctg15Sum);
		}
	}

	return amtSetOff;
}

function setOffAgainst115ad_1_b_ii(value, cgosIncome){
	
	
	var prctg15 = cgosIncome.cgInc.stcg.prctg15;
	var prctg15Sum = eval( parseInt(prctg15.sec111a,10) + 
							 parseInt(prctg15.sec115ad_1_b_ii,10));			
	
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10) > 0){
		if(parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = eval( parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10));	
			cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg15Sum)){
			cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii) + parseInt(amtSetOff) - parseInt(prctg15Sum);
			amtSetOff = parseInt(prctg15Sum);
		}
	}

	return amtSetOff;
}

function setOffAgainst112(value, cgosIncome){
	
	
	var prctg20 = cgosIncome.cgInc.ltcg.prctg20;
	var prctg20Sum = zeroOrMore(eval( parseInt(prctg20.sec112,10) + 
							 parseInt(prctg20.sec11EA,10)));		
	
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg20.sec112 = eval( parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10));	
			cgosIncome.cgInc.ltcg.prctg20.sec112 = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg20Sum)){
			cgosIncome.cgInc.ltcg.prctg20.sec112 = parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112) + parseInt(amtSetOff) - parseInt(prctg20Sum);
			amtSetOff = parseInt(prctg20Sum);
		}
	}

	return amtSetOff;
}

function setOffAgainst112(value, cgosIncome){
	
	
	var prctg20 = cgosIncome.cgInc.ltcg.prctg20;
	var prctg20Sum = zeroOrMore(eval( parseInt(prctg20.sec112,10) + 
							 parseInt(prctg20.sec11EA,10)));		
	
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg20.sec112 = eval( parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10));	
			cgosIncome.cgInc.ltcg.prctg20.sec112 = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg20Sum)){
			cgosIncome.cgInc.ltcg.prctg20.sec112 = parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112) + parseInt(amtSetOff) - parseInt(prctg20Sum);
			amtSetOff = parseInt(prctg20Sum);
		}
	}

	return amtSetOff;
}

function setOffAgainst115Ea(value, cgosIncome){
	var prctg20 = cgosIncome.cgInc.ltcg.prctg20;
	var prctg20Sum = zeroOrMore(eval( parseInt(prctg20.sec112,10) + 
							 parseInt(prctg20.sec11EA,10)));	
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg20.sec11EA, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec11EA, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg20.sec11EA = eval( parseInt(cgosIncome.cgInc.ltcg.prctg20.sec11EA, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec11EA, 10));	
			cgosIncome.cgInc.ltcg.prctg20.sec11EA = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg20Sum)){
			cgosIncome.cgInc.ltcg.prctg20.sec11EA = parseInt(cgosIncome.cgInc.ltcg.prctg20.sec11EA) + parseInt(amtSetOff) - parseInt(prctg20Sum);
			amtSetOff = parseInt(prctg20Sum);
		}	
	}
	

	return amtSetOff;
}

function setOffAgainstsecProviso(value, cgosIncome){
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = zeroOrMore(eval( parseInt(prctg10.secProviso,10) + 
			 parseInt(prctg10.sec112_1_c_2,10) + 
			 parseInt(prctg10.sec115AC_1,10) + 
			 parseInt(prctg10.sec115_AB_1_B,10) + 
			 parseInt(prctg10.sec115AD_3,10) + 
			 parseInt(prctg10.sec115E_b,10) ));	
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg10.secProviso = eval( parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10));	
			cgosIncome.cgInc.ltcg.prctg10.secProviso = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg10Sum)){
			cgosIncome.cgInc.ltcg.prctg10.secProviso = parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso) + parseInt(amtSetOff) - parseInt(prctg10Sum);
			amtSetOff = parseInt(prctg10Sum);
		}		
	}

	

	return amtSetOff;
}
function setOffAgainst112_1_c_2(value, cgosIncome){
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = zeroOrMore(eval( parseInt(prctg10.secProviso,10) + 
			 parseInt(prctg10.sec112_1_c_2,10) + 
			 parseInt(prctg10.sec115AC_1,10) + 
			 parseInt(prctg10.sec115_AB_1_B,10) + 
			 parseInt(prctg10.sec115AD_3,10) + 
			 parseInt(prctg10.sec115E_b,10) ));
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = eval( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10));	
			cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg10Sum)){
			cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2) + parseInt(amtSetOff) - parseInt(prctg10Sum);
			amtSetOff = parseInt(prctg10Sum);
		}	
	}
	
	return amtSetOff;
}
function setOffAgainst115AC_1(value, cgosIncome){
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = zeroOrMore(eval( parseInt(prctg10.secProviso,10) + 
			 parseInt(prctg10.sec112_1_c_2,10) + 
			 parseInt(prctg10.sec115AC_1,10) + 
			 parseInt(prctg10.sec115_AB_1_B,10) + 
			 parseInt(prctg10.sec115AD_3,10) + 
			 parseInt(prctg10.sec115E_b,10) ));
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = eval( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10));	
			cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg10Sum)){
			cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1) + parseInt(amtSetOff) - parseInt(prctg10Sum);
			amtSetOff = parseInt(prctg10Sum);
		}		
		
	}

		
	
	return amtSetOff;
}
function setOffAgainst115_AB_1_B(value, cgosIncome){
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = zeroOrMore(eval( parseInt(prctg10.secProviso,10) + 
			 parseInt(prctg10.sec112_1_c_2,10) + 
			 parseInt(prctg10.sec115AC_1,10) + 
			 parseInt(prctg10.sec115_AB_1_B,10) + 
			 parseInt(prctg10.sec115AD_3,10) + 
			 parseInt(prctg10.sec115E_b,10) ));
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = eval( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10));	
			cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = 0;	
		}
		
		if(parseInt(amtSetOff) > parseInt(prctg10Sum)){
			cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B) + parseInt(amtSetOff) - parseInt(prctg10Sum);
			amtSetOff = parseInt(prctg10Sum);
		}
	}
	
	return amtSetOff;
}
function setOffAgainst115AD_3(value, cgosIncome){
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = zeroOrMore(eval( parseInt(prctg10.secProviso,10) + 
			 parseInt(prctg10.sec112_1_c_2,10) + 
			 parseInt(prctg10.sec115AC_1,10) + 
			 parseInt(prctg10.sec115_AB_1_B,10) + 
			 parseInt(prctg10.sec115AD_3,10) + 
			 parseInt(prctg10.sec115E_b,10) ));
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = eval( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10));	
			cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg10Sum)){
			cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3) + parseInt(amtSetOff) - parseInt(prctg10Sum);
			amtSetOff = parseInt(prctg10Sum);
		}
	}

	return amtSetOff;
}
function setOffAgainst115E_b(value, cgosIncome){
	var prctg10 = cgosIncome.cgInc.ltcg.prctg10;
	var prctg10Sum = zeroOrMore(eval( parseInt(prctg10.secProviso,10) + 
							 parseInt(prctg10.sec112_1_c_2,10) + 
							 parseInt(prctg10.sec115AC_1,10) + 
							 parseInt(prctg10.sec115_AB_1_B,10) + 
							 parseInt(prctg10.sec115AD_3,10) + 
							 parseInt(prctg10.sec115E_b,10) ));
	var amtSetOff = 0;
	if(parseInt(value, 10) < 0 && parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115E_b, 10) > 0){
		if(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115E_b, 10) >= Math.abs(parseInt(value, 10))){
			cgosIncome.cgInc.ltcg.prctg10.sec115E_b = eval( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115E_b, 10) +
												  parseInt(value, 10));
			amtSetOff = Math.abs(parseInt(value, 10));
		}else{
			amtSetOff = Math.abs(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115E_b, 10));	
			cgosIncome.cgInc.ltcg.prctg10.sec115E_b = 0;	
		}
		if(parseInt(amtSetOff) > parseInt(prctg10Sum)){
			cgosIncome.cgInc.ltcg.prctg10.sec115E_b = parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115E_b) + parseInt(amtSetOff) - parseInt(prctg10Sum);
			amtSetOff = parseInt(prctg10Sum);
		}
	}	
	
	return amtSetOff;
}

function setProfitLoss(value, lossFld, profitFld){
	if(parseInt(value, 10) < 0){
		document.getElementsByName(lossFld)[0].value = Math.abs(value);
		document.getElementsByName(profitFld)[0].value = 0;
	}else if(parseInt(value, 10) > 0){
		document.getElementsByName(lossFld)[0].value = 0;
		document.getElementsByName(profitFld)[0].value = Math.abs(value);
	}else{
		document.getElementsByName(lossFld)[0].value = 0;
		document.getElementsByName(profitFld)[0].value = 0;
	}
}

//////////////////////////////CG Calculation Ends/////////////////////////////////

function calcCFL_sumAll(){
	try{
		//HP Loss :: total of earlier year losses
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF');
		document.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF')[0].value =
			coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.hpLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.hpLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.hpLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.hpLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.hpLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.hpLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.hpLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.hpLossCF');

		// Loss from business other than loss from speculative business and specified business :: total of earlier year losses
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF');
		document.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value =
			coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.busLossOthThanSpecLossCF');

		//  Loss from speculative business :: total of earlier year losses
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecBusCF');
		document.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecBusCF')[0].value =
			coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.lossFrmSpecBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.lossFrmSpecBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.lossFrmSpecBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.lossFrmSpecBusCF');

		//Loss from specified business :: total of earlier year losses
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecifiedBusCF');
		document.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].value =
			coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.lossFrmSpecifiedBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.lossFrmSpecifiedBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.lossFrmSpecifiedBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.lossFrmSpecifiedBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.lossFrmSpecifiedBusCF')+
			coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.lossFrmSpecifiedBusCF');

		//Short-term capital loss
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF');
		document.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF')[0].value =
			coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.stcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.stcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.stcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.stcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.stcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.stcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.stcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.stcgLossCF');

		//Long-term Capital loss
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF');
		document.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF')[0].value =
			coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.ltcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.ltcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.ltcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.ltcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.ltcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.ltcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.ltcgLossCF')+
			coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.ltcgLossCF');


		//Other sources loss (from owning race horses)
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF');
		document.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value =
			coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')+
			coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')+
			coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')+
			coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.othSrcLossRaceHorseCF');


	}catch(e){
		alert('error in calcCFL_sumALL=' + e.stack);
	}
}

function getLTCG20ExmpFrmSI(){
	var inc = {"10":0, "20":0};
	var afterExmp = {"10":0, "20":0};
	var tab = document.getElementById('scheduleSI');
	var allInput = tab.getElementsByTagName("INPUT");
	for(var i=0;i<allInput.length;i++){
		if(allInput[i].name.match('secCode$')){
			index = allInput[i].name.substring(allInput[i].name.indexOf('[')+1,allInput[i].name.indexOf(']'));
			if(allInput[i].value=='22'){
				inc["10"] = eval(parseInt(inc["10"]) + coalesceSetRet('scheduleSI.splCodeRateTax[' + index + '].splRateInc'));
				afterExmp["10"] = eval(parseInt(afterExmp["10"]) + coalesceSetRet('scheduleSI.splCodeRateTax[' + index + '].taxableInc'));
				
			}else if(allInput[i].value=='21'){
				inc["20"] = eval(parseInt(inc["20"]) + coalesceSetRet('scheduleSI.splCodeRateTax[' + index + '].splRateInc'));
				afterExmp["20"] = eval(parseInt(afterExmp["20"]) + coalesceSetRet('scheduleSI.splCodeRateTax[' + index + '].taxableInc'));
				
			}
		}
	}
	return {"10":(inc["10"]-afterExmp["10"]), "20":(inc["20"]-afterExmp["20"])};
	
}

function deleteRowFSI(tableId , noOfHeader , noOfFooter){
	try{
		var mytable = document.getElementById(tableId);
		var rowCount = mytable.rows.length;
		var itemCount = (rowCount - 4 )/ 5;
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
						if((rowNumber!=0) || (rowNumber==0 &&  parseInt(eval(rowCurrCount-noOfHeader-noOfFooter)/5)>1) ){
							rowNumber = eval(parseInt(rowNumber,10) * 5 + noOfHeader);
							for(var i=0;i<5;i++){
								mytable.deleteRow(rowNumber);
							}
							//To Do - reset the name of row for all input , textarea, select
							var newTrList = mytable.getElementsByTagName('tr');
							var newTrListLength = eval(parseInt(newTrList.length ,10)-noOfFooter);
							for( var q=rowNumber; q < newTrListLength ; q++ ){	//iterate over all rows from delete point to second last row
								var p = parseInt((q-noOfHeader) /5) + noOfHeader;
								//set the serial number;
								if((q-noOfHeader)%5==0){
									if(noOfHeader==2){
										newTrList[q].getElementsByTagName('td')[0].innerHTML = parseInt(p-1,10);
									}else if(noOfHeader==1){
										newTrList[q].getElementsByTagName('td')[0].innerHTML = parseInt(p,10);
									}else if(noOfHeader==3){
										newTrList[q].getElementsByTagName('td')[0].innerHTML = parseInt(p-2,10);
									}
								}
								var allInputTags = newTrList[q].getElementsByTagName('input');

								for(var zz=0; zz<allInputTags.length ; zz++ ){
									var index1= allInputTags[zz].name.lastIndexOf('[');
									var index2= allInputTags[zz].name.lastIndexOf(']');

									var str1 = allInputTags[zz].name.substring(0, index1);
									var str3 = allInputTags[zz].name.substring(index2 + 1, allInputTags[zz].name.length);

									allInputTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}

								var allSelectTags = newTrList[q].getElementsByTagName('select');

								for(var zz=0; zz<allSelectTags.length ; zz++ ){
									var index1= allSelectTags[zz].name.lastIndexOf('[');
									var index2= allSelectTags[zz].name.lastIndexOf(']');

									var str1 = allSelectTags[zz].name.substring(0, index1);
									var str3 = allSelectTags[zz].name.substring(index2 + 1, allSelectTags[zz].name.length);

									allSelectTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}

								var allTextAreaTags = newTrList[q].getElementsByTagName('textarea');

								for(var zz=0; zz<allTextAreaTags.length ; zz++ ){
									var index1= allTextAreaTags[zz].name.lastIndexOf('[');
									var index2= allTextAreaTags[zz].name.lastIndexOf(']');

									var str1 = allTextAreaTags[zz].name.substring(0, index1);
									var str3 = allTextAreaTags[zz].name.substring(index2 + 1, allTextAreaTags[zz].name.length);

									allTextAreaTags[zz].name = str1+'[' +eval(parseInt(p,10)-noOfHeader) +']'+str3;
								}
							}
							break;
						}else if((rowNumber==0)  && (parseInt(eval(rowCurrCount-noOfHeader-noOfFooter)/5)==1)){
							//Vacate the content if its first row

							for(var m=0; m<5; m++){ 
								var firstRow = mytable.getElementsByTagName('tr')[parseInt(noOfHeader) + m];
	
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
		}
		//modifyRow(mytable);
	}catch(e){
		alert('exception caught in =' +e.stack );
	}
}


function setSIDesc(){
	var tab = document.getElementById('scheduleSI');
	var inputs = tab.getElementsByTagName("INPUT");
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].name.match('secCode$')){
			var row = inputs[i].parentNode.parentNode;
			row.cells[1].innerHTML = getSectionTextMap(inputs[i].value);
		}
	}
}

function getSlabbedIncome(totalIncome){
	
	var taxPayer = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	//IN-I,HUF-H
	var resStatus 			= document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0]; //RES , NRI 
	
	//var age	= calcAge();
	
	var netTxblIncome 		= totalIncome;

	var inc = {"10":0,"20":0,"30":0,"40":0};
	
	
	rateCase = -1;
	var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0];
	//1-Firm,2-Local Auth,3-Co-Op-Bank,4-Co-Op-Society,5-LLP,6-AOP/BOI/AJP				2013
	//1-Firm,2-Local Auth,3-Co-Op-Bank,4-Co-Op-Society,5-LLP,7-PDT,8-AOP/BOI,9-AJP		2014

	if( taxPayer.value=='9'){

		if(parseInt(netTxblIncome,10) >= parseInt('0',10) && parseInt(netTxblIncome,10) <= parseInt('250000',10)){
			inc = {"10":0, "20":0, "30":0,"40":0};
		}else if(parseInt(netTxblIncome,10) >= parseInt('250001',10) && parseInt(netTxblIncome,10) <= parseInt('500000',10)){
			inc = {"10":(parseInt(netTxblIncome,10) - 250000), "20":0, "30":0,"40":0};
		}else if(parseInt(netTxblIncome,10) >= parseInt('500001',10) && parseInt(netTxblIncome,10) <= parseInt('1000000',10)){
			inc = {"10":250000, "20":(parseInt(netTxblIncome,10) - 500000), "30":0,"40":0};
		}else if(parseInt(netTxblIncome,10) >= parseInt('1000001',10)){
			inc = {"10":250000, "20":500000, "30":(parseInt(netTxblIncome,10) - 1000000),"40":0};
		}

	}else if(taxPayer.value=='8'){
		var isSharedForeign = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;
		var totIncFrmMemberOfAop = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].totIncFrmMemberOfAop')[0].value;
		var shares = getPercentOfShare();
		var total = parseInt(shares.foreignPerc,10)+parseInt(shares.otherPerc,10);
		if(isSharedForeign=='NO' && shares.otherPerc==100){
			if(totIncFrmMemberOfAop=='Y'){
				rateCase = 1;
				inc = {"10":0, "20":0, "30":parseInt(netTxblIncome),"40":0};

			}else{
				rateCase = 2;
				if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('0',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('250000',10)){

					inc = {"10":0, "20":0, "30":0,"40":0};
				}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('250001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('500000',10)){

					inc = {"10":(parseInt(netTxblIncome,10) - 250000), "20":0, "30":0,"40":0};
				}else if(parseInt(netTxblIncome,10) >= parseInt('500001',10) && parseInt(netTxblIncome,10) <= parseInt('1000000',10)){
					inc = {"10":250000, "20":(parseInt(netTxblIncome,10) - 500000), "30":0,"40":0};
				}else if(parseInt(netTxblIncome,10) >= parseInt('1000001',10)){
					inc = {"10":250000, "20":500000, "30":(parseInt(netTxblIncome,10) - 1000000),"40":0};
				}
			}
		}else if(isSharedForeign=='NO'){
			rateCase = 3;
			
			inc = {"10":0, "20":0, "30":parseInt(netTxblIncome),"40":0};
		}else if(isSharedForeign=='YES' && total==100){

			rateCase = 4;
			
			inc = {"10":0, "20":0, "30":parseInt(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat(shares.otherPerc==0?0:shares.otherPerc/100)),"40":parseInt(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat(shares.foreignPerc==0?0:shares.foreignPerc/100))};
		}else{
			rateCase = 5;
			inc = {"10":0, "20":0, "30":0,"40":parseInt(netTxblIncome)};
		}
		
	}else if(taxPayer.value=='1' || taxPayer.value=='2' || taxPayer.value=='5'|| taxPayer.value=='7'){
		inc = {"10":0, "20":0, "30":parseInt(netTxblIncome),"40":0};

	}else if(taxPayer.value=='3' || taxPayer.value=='4'){
		if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('0',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('10000',10)){

			inc = {"10":parseInt(netTxblIncome), "20":0, "30":0,"40":0};
		}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('10001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('20000',10)){

			inc = {"10":10000, "20":parseInt(netTxblIncome)-10000, "30":0,"40":0};
		}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('20001',10)){

			inc = {"10":10000, "20":10000, "30":parseInt(netTxblIncome)-20000,"40":0};
		}	
	}
	
	
	return inc;
}

function customImport(fieldId,rowCount,type){
	if(((fieldId.indexOf('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115')!=-1 &&
		fieldId.indexOf('.exemptionOrDedn[')==-1) || 
		fieldId.indexOf('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT')!=-1 || 
		(fieldId.indexOf('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable')!=-1 && 
		fieldId.indexOf('.exemptionOrDedn[')==-1))){
			addRowToCG(getTableId(fieldId));
			return true;
	}
	return false;
    }

function checkUniqueOSSec(){
	
	checkUniqueTableCol('schduleOsf', 'sourceDescription$');
	checkUniqueTableCol('scheduleCGstcg2', 'section$');
	checkUniqueTableCol('ltcgDeduction1', 'section$');
	checkUniqueTableCol('stcgDeduction1', 'section$');
	checkUniqueTableCol('stcgDeduction2', 'section$');
	//checkUniqueTableCol('scheduleCGltcg3', 'sectionCode$');
	
	checkUniqueTableCol('scheduleCGltcg7', 'section$');
	checkUniqueTableCol('stcgDeduction1', 'section$');
	checkUniqueTableCol('stcgDeduction2', 'section$');
	//checkUniqueTableCol('stcgDeduction3', 'section$');
	//checkUniqueTableCol('ltcgDeduction8', 'section$');
	//checkUniqueTableCol('scheduleCGltcg4_ded1', 'section$');
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

function ltcgPoint8Sum(){

var exemptionOrDednUs54 = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.amtDeemedCGSec54')[0];
exemptionOrDednUs54.value = addCGDeductions('ltcgDeduction8');
checkUniqueTableCol('ltcgDeduction8', 'section$');
}

function addBPExmptInc(tableId){
	var tab = document.getElementById(tableId);
	var inputs = tab.getElementsByTagName("INPUT");
	var sum = 0;
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].name.match('totalAmount$')){
			sum = parseInt(sum) + parseInt(coalesce(inputs[i].value));
		}
	}
	return sum;
}


function deleteRowRowToTableSchPartnerInfo(tableId, noOfRow, last) {
	
	if (numberOfPartnerInfoCheck(tableId,7) ) {
		
		deleteRowTable(tableId,noOfRow,last);
		//setSerialNumber(elem,2);
	}
}

function numberOfPartnerInfoCheck(tableId,noRows){
	var tab = document.getElementById(tableId);
	var rowCount = tab.rows.length;
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	
	if(rowCount < noRows && (status != 2 && status != 9 && status != 7 && status != '')) {
		
	addErrorXHTML('','Atleast two members are required',true);
	return false;
	}
	return true;

}

function isDSCMandatory(){
		var count = 0;
		while(document.getElementsByName('partAGEN2.natOfBus.business['+count+'].code')[0] && 
				document.getElementsByName('partAGEN2.natOfBus.business['+count+'].code')[0].value){
			count++;
		}
		
		if(count==1 && document.getElementsByName('partAGEN2.natOfBus.business[0].code')[0].value=='0712') {
			return;
		}
		
		var i=0;
		var limit = 10000000;
		var msg = 'Liable for audit u/s 44AB as turnover exceeds  Rs. 1 crore. Please check 44AB selection.';
		while(document.getElementsByName('partAGEN2.natOfBus.business['+i+'].code')[0] && 
				document.getElementsByName('partAGEN2.natOfBus.business['+i+'].code')[0].value){
			if(document.getElementsByName('partAGEN2.natOfBus.business['+i+'].code')[0].value.match('060[1-7]')){
				limit=2500000;
				msg = 'Liable for audit u/s 44AB as turnover exceeds Rs. 25 lakh (Profession). Please check 44AB selection.';
				break;
			}
			i++;
		}
		var grossRcpt = parseInt(coalesce(document.getElementsByName('partapl.noBooksOfAccPL.grossReceipt')[0].value));
		var totRevenueFrmOperations = parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.totRevenueFrmOperations')[0].value));
		if(parseInt(grossRcpt) + parseInt(totRevenueFrmOperations) > limit){
			var auditFlag = document.getElementsByName('partAGEN2.liableSec44ABflg')[0];
			if(auditFlag.value!='Y'){
				j.setFieldError(auditFlag.name, msg);
				addErrorXHTML(auditFlag, msg ,true);
			}
		}
}

function setOffWithDtaa(sectionCode) {

	var arr = {
		'B1e' : 0,
		'B2e' : 0,
		'B3e' : 0,
		'B4e' : 0,
		'B5c' : 0,
		'B6e_21ciii' : 0,
		'B6e_5AB1b' : 0,
		'B6e_5AC1c' : 0,
		'B6e_5ADiii' : 0,
		'B7e' : 0,
		'B8' : 0
	};
	var tab = document.getElementById('scheduleLtcgDtaa');
	var rowCount = tab.rows.length - 2;
	var total = 0;

	for ( var i = 0; i < rowCount; i++) {
		var itemIncluded = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i + '].itemIncluded')[0].value;
		var amount = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['	+ i + '].amount')[0].value;
		if (itemIncluded == 'B1e') {
			arr['B1e'] = parseInt(arr['B1e'], 10)+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B2e') {
			arr['B2e'] = parseInt(arr['B2e'], 10)+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B3e') {
			arr['B3e'] = parseInt(arr['B3e'], 10)	+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B4e') {
			arr['B4e'] = parseInt(arr['B4e'], 10)+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B5c') {
			arr['B5c'] = parseInt(arr['B5c'], 10)+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B6e_21ciii') {
			arr['B6e_21ciii'] = parseInt(arr['B6e_21ciii'], 10)	+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B6e_5AB1b') {
			arr['B6e_5AB1b'] = parseInt(arr['B6e_5AB1b'], 10)	+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B6e_5AC1c') {
			arr['B6e_5AC1c'] = parseInt(arr['B6e_5AC1c'], 10)+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B6e_5ADiii') {
			arr['B6e_5ADiii'] = parseInt(arr['B6e_5ADiii'], 10)	+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B7e') {
			arr['B7e'] = parseInt(arr['B7e'], 10)+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B8') {
			arr['B8'] = parseInt(arr['B8'], 10)	+ parseInt(coalesce(amount), 10);
		}
	}

	if (sectionCode == 'sec112') {
		total = arr['B1e'] + arr['B2e'] + arr['B3e'] + arr['B7e'] + arr['B5c'] + arr['B8'];
	} else if (sectionCode == 'secProviso') {
		total = arr['B4e'] ;
	} else if(sectionCode == 'sec112_1_c_2') {
	    total = arr['B6e_21ciii'];
    } else if(sectionCode == 'sec115_AB_1_B') {
	    total = arr['B6e_5AB1b'];
    } else if(sectionCode == 'sec115AC_1') {
	    total = arr['B6e_5AC1c'];
    } else if(sectionCode == 'sec115AD_3') {
	    total = arr['B6e_5ADiii'];
    }
	return total;

}