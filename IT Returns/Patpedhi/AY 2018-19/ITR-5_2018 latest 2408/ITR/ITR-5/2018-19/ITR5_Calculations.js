/*
 * ITR5_Calculations.js
 *
 * Created on 11/10/2013
 *
 * Copyright(c) 2014  TCS Company, Inc.  All Rights Reserved.
 * This software is the proprietary information of TCS Company.
 *
 */

var globTempStcg1 = 0;
var globTempStcg2 = 0;
var globTempltcg1 = 0;
var globTempltcg2 = 0;
var dpmCeasesMesg ='';
var doaCeasesMesg ='';


var FY_start_date = '01/04/2017';
var FY_end_date = '31/03/2018';
var AY_start_date = '01/04/2018';
var Filing_dueDate = '31/08/2018';
//var Int_start_date_234A = '01/09/2018';
var Int_start_date_234A = '01/09/2018'; //modified due date

var slab0_end_date = '15/06/2017';
var slab1_start_date = '16/06/2017';
var slab1_end_date = '15/09/2017';
var slab2_start_date = '16/09/2017';
var slab2_end_date = '15/12/2017';
var slab3_start_date = '16/12/2017';
var slab3_end_date = '15/03/2018';
var slab4_start_date = '16/03/2018';

var Cg_ded_start_date = '31/03/2015';
var Cg_ded_end_date = '01/04/2021';

function calcITR5(){
	//setTimeout(calcITR5Impl, 100);
	calcITR5Impl();
}

function calcITR5Impl(){
	try{
		calculateTotalDeductions();
		validateTDS2();
		validateTDS3();
		validatepoint1513();
		enableSch80p();
		calculate80P();
		calcTotFullConA('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdRecvUnqshr','scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fairMrktValueUnqshr','scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdSec50CA');
		scheduleCGA('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdSec50CA','scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdOthUnqshr','scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration');
		calcTotFullConA('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullValueConsdRecvUnqshr','scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fairMrktValueUnqshr', 'scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullValueConsdSec50CA');
		scheduleCGA('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullValueConsdSec50CA','scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullValueConsdOthUnqshr','scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration');
		scheduleCGA('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullValueConsdRecvUnqshr','scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullValueConsdOthUnqshr','scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration');
		calcTotFullConA('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullValueConsdSec50CA','scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fairMrktValueUnqshr', 'scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullValueConsdSec50CA');
		if(document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value=='NRI'){
			scheduleCGGrtr();
		}


		var cgosIncome = {};
		initCgOsInc(cgosIncome);
		enableTable('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag','Y','scheduleStcgunUtilizedCapGain54');
		enableTable('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag','Y','scheduleLtcgunUtilizedCapGain54');
		var effectOnProfit = document.getElementsByName('partaoi.profDeviatDueAcctMeth')[0];
		effectOnProfit.value =  coalesceSetRet('itrScheduleICDS.totNetEffect') ;
		if(coalesceSetRet('itrScheduleICDS.totNetEffect')<0){
			effectOnProfit.value =  coalesceSetRet('itrScheduleICDS.totNetEffectN') ;
		}

		var simap = calculateOS(cgosIncome);
		/*enableNRItables();*/
		calcBalSheet();
		validateCGSecwiseDed();
		calculateRemurationPaid();
		calculatePL();
		calcSchBP();
		calcPartAOI();
		scheduleHPCalcFor5();
		calculateSchDPM();
		calculateSchDOA();
		calcSchDEPFor6();
		calcSchDCGFor6();
		calcSchESRFor5();
		calcUD();
		//calc10A();
		calc10AA();
		calcSchBP();
		calcSchCG(cgosIncome);

		OSSubCal();
		calculateCYLA(cgosIncome);
		var amt5BBC = simap['5BBC'];
        var amt5Ea = simap['5Ea'];
        populateSI(cgosIncome,simap);
		calcTotal80IA();
		calcTotal80IB();
		calcTotal80IC();
		calculatePartBTI_first();
		caclDedSchVIA();
		calcTotal80GDeductions('ded100PerWithoutQual',3,2,amt5BBC,amt5Ea);
		calcTotal80GDeductions('ded50WithoutQual',3,2,amt5BBC,amt5Ea);
		calcTotal80GDeductions('ded100Qual',3,2,amt5BBC,amt5Ea);
		calcTotal80GDeductions('ded50WithQual',3,2,amt5BBC,amt5Ea);
		caclDedSchVIA();
		calcTotalAmt('schEIMinorChild');
		calculateNetAgricultureIncomeforEI();
		calcScheduleSI();
		calTotalEI();
		calcScheduleFSI();
		calculatePartBTI_second();
		populateAMT();
        calculateTCS();
		calculateTiTti(cgosIncome);
		calCGA7TotalSum();
		calCGPointB8Total();
		calculatePartBTTI_second(cgosIncome);
		populateAMTC();
		calScheduleAmtc();
		calculateTotalTaxIT('scheduleIt');
		makeSurchargeCessEditable();
		validatePartAGen2();
		calcTotalICDS();
		surchargeEditable();
		enable44AD();
		enableFieldsPDTAOT();
		pdtItr5NotReqd();
		validateTDS29Grtthen67();
		validateTDS39Grtthen67();
		checkFor16thFiledValue();

			}catch(e){
		alert('error in calcITR5 ='+ e.stack);
	}
	}

function validateSec50C_CG(capGainType) {
	var fullConsideration = document.getElementsByName('scheduleCGPost45.'+capGainType+'.saleofLandBuild.fullConsideration')[0];
	var propertyValuation = document.getElementsByName('scheduleCGPost45.'+capGainType+'.saleofLandBuild.propertyValuation')[0];
	var fullConsideration50C = document.getElementsByName('scheduleCGPost45.'+capGainType+'.saleofLandBuild.fullConsideration50C')[0];

	if(fullConsideration50C.value!=fullConsideration.value && fullConsideration50C.value!=propertyValuation.value){
		j.setFieldError('scheduleCGPost45.'+capGainType+'.saleofLandBuild.fullConsideration50C','Please enter value from ai or aii only');
		addErrorXHTML(fullConsideration50C ,'Please enter value from ai or aii only',true);
	}
}
function scheduleCFLfieldReadonlyonLoad(){
	var returnFiled = document.getElementsByName('partAGEN1.filingStatus.returnFileSec.incomeTaxSec')[0].value;
	if(returnFiled=='12'||returnFiled=='13'||returnFiled=='20'){
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF')[0].readOnly=false;

	}
	else{
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF')[0].readOnly=true;

	}

}
function scheduleCFLfieldReadonly(){
	var returnFiled = document.getElementsByName('partAGEN1.filingStatus.returnFileSec.incomeTaxSec')[0].value;
	if(returnFiled=='12'||returnFiled=='13'||returnFiled=='20'){
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0].readOnly=false;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF')[0].readOnly=false;

	}
	else{
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0].readOnly=true;
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF')[0].readOnly=true;

	}

}

function validateNatureOfBussiness(){
	var table = document.getElementById('natOfBustTradeTableId');
	var rowCount = table.rows.length;

	for(var i=0;i<rowCount-2;i++){
		if(document.getElementsByName('partAGEN2.natOfBus.natureOfBusiness[' + i + '].code')[0].value=="00002"&&(document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value!="7"&&document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value!="12"&&document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value!="11"&&document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value!="13")){
			j.setFieldError('partAGEN2.natOfBus.natureOfBusiness[' + i + '].code','Please select applicable nature of business code for the selected sub status');
			addErrorXHTML( document.getElementsByName('partAGEN2.natOfBus.natureOfBusiness[' + i + '].code')[0],
					'Please select applicable nature of business code for the selected sub status',
					true);

		}


	}


}


function checkFor16thFiledValue(){
	if( getAmt('scheduleDPM.plantMachinery.rate15.depreciationDetail.proportionateAggDepreciation') >
		getAmt('scheduleDPM.plantMachinery.rate15.depreciationDetail.netAggregateDepreciation')  ){
		j.setFieldError('scheduleDPM.plantMachinery.rate15.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}

	if( getAmt('scheduleDPM.plantMachinery.rate30.depreciationDetail.proportionateAggDepreciation') >
		getAmt('scheduleDPM.plantMachinery.rate30.depreciationDetail.netAggregateDepreciation')  ){
		j.setFieldError('scheduleDPM.plantMachinery.rate30.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}

	if( getAmt('scheduleDPM.plantMachinery.rate40.depreciationDetail.proportionateAggDepreciation') >
		getAmt('scheduleDPM.plantMachinery.rate40.depreciationDetail.netAggregateDepreciation')  ){
		j.setFieldError('scheduleDPM.plantMachinery.rate40.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDPM.plantMachinery.rate40.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}

	if( getAmt('scheduleDPM.plantMachinery.rate15.depreciationDetail.depDisAllowUs38_2') >
	getAmt('scheduleDPM.plantMachinery.rate15.depreciationDetail.totalDepreciation')  ){
	j.setFieldError('scheduleDPM.plantMachinery.rate15.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
	addErrorXHTML( document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.depDisAllowUs38_2')[0],
			'Amount cannot be more than the amount entered in Total depreciation',
			true);
}

if( getAmt('scheduleDPM.plantMachinery.rate30.depreciationDetail.depDisAllowUs38_2') >
	getAmt('scheduleDPM.plantMachinery.rate30.depreciationDetail.totalDepreciation')  ){
	j.setFieldError('scheduleDPM.plantMachinery.rate30.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
	addErrorXHTML( document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.depDisAllowUs38_2')[0],
			'Amount cannot be more than the amount entered in Total depreciation',
			true);
}

if( getAmt('scheduleDPM.plantMachinery.rate40.depreciationDetail.depDisAllowUs38_2') >
	getAmt('scheduleDPM.plantMachinery.rate40.depreciationDetail.totalDepreciation')  ){
	j.setFieldError('scheduleDPM.plantMachinery.rate40.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
	addErrorXHTML( document.getElementsByName('scheduleDPM.plantMachinery.rate40.depreciationDetail.depDisAllowUs38_2')[0],
			'Amount cannot be more than the amount entered in Total depreciation',
			true);
}
}
function scheduleCGGrtr(){
	var table = document.getElementById('stcg10pctTab');
	var rowCount = table.rows.length/16;
	for(var i=0;i<rowCount;i++){
		calcTotFullConA('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+ i + '].fullValueConsdRecvUnqshr','scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+ i + '].fairMrktValueUnqshr', 'scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+ i + '].fullValueConsdSec50CA');
		scheduleCGA('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+ i + '].fullValueConsdSec50CA','scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+ i + '].fullValueConsdOthUnqshr','scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+ i + '].fullConsideration');
	}


}
function scheduleCGA(Grtr,Total,grndTotal){
	var afield = document
	.getElementsByName(Grtr)[0];afield.value=coalesce(afield.value);
	var bfield = document
	.getElementsByName(Total)[0];bfield.value=coalesce(bfield.value);
	var cfield = document
	.getElementsByName(grndTotal)[0];cfield.value=coalesce(cfield.value);

	cfield.value=parseInt(coalesce(afield.value),10)+parseInt(coalesce(bfield.value),10);
}

function initCgOsInc(cgosIncome){
	cgosIncome.cgInc = {};
	cgosIncome.osInc = {};
	cgosIncome.cgInc.stcg={};
	cgosIncome.cgInc.ltcg={};
	cgosIncome.cgInc.ltcg.prctg10={};
	cgosIncome.cgInc.ltcg.prctg20 = {};
	cgosIncome.cgInc.stcg.prctg30 = 0;
	cgosIncome.cgInc.stcg.prctgAr = 0;
	cgosIncome.cgInc.stcg.prctg15 = {};
	cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = 0;
	cgosIncome.cgInc.stcg.prctg15.sec111a = 0;
	cgosIncome.cgInc.ltcg.prctg20.sec112 = 0;
	cgosIncome.cgInc.ltcg.prctg20.sec11EA = 0; // Not active
	cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = 0; // B6 of CG
	cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = 0; // B6 of CG new
	cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = 0; //B6 of CG
	cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = 0; //B6 of CG
	cgosIncome.cgInc.ltcg.prctg10.secProviso = 0; // B4e + B5d CG
	cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1 = 0; // Not active
	cgosIncome.cgInc.ltcg.prctg10.sec115E_b = 0; // Not active
	cgosIncome.osInc.sec115A_1_a_i = 0;
	cgosIncome.osInc.sec115A_1_a_ii = 0;
	cgosIncome.osInc.sec115A_1_a_iia = 0;
	cgosIncome.osInc.sec115A_1_a_iiaa = 0;
	cgosIncome.osInc.sec115A_1_a_iiab = 0;
	cgosIncome.osInc.sec115A_1_a_iii = 0;
	cgosIncome.osInc.sec115A_1_b_A = 0;
	cgosIncome.osInc.sec115A_1_b_B = 0;
	cgosIncome.osInc.sec115AC_1_a_b = 0;
	cgosIncome.osInc.sec115ACA_1_a = 0;
	cgosIncome.osInc.sec115AD_1_i = 0;
	cgosIncome.osInc.sec115BBA = 0;
	cgosIncome.osInc.sec115BBDA = 0;
	cgosIncome.osInc.sec115BBC = 0;
	cgosIncome.osInc.sec115BBE = 0;
	cgosIncome.osInc.sec115BBF = 0;
	cgosIncome.osInc.sec115BBG = 0;
    cgosIncome.osInc.sec115BB = 0;
	cgosIncome.osInc.sec115E_a = 0;
	cgosIncome.osInc.sec111 = 0;
	cgosIncome.bpNetInc = 0;
}

function initMapForSI(cgosIncome){
	var simap = {
			"5Eacg":cgosIncome.cgInc.ltcg.prctg20.sec11EA,
			"5AC1c":cgosIncome.cgInc.ltcg.prctg10.sec115AC_1,
			"5ACA1b":cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1,
			"5ADiii":cgosIncome.cgInc.ltcg.prctg10.sec115AD_3,
			"5Eb":cgosIncome.cgInc.ltcg.prctg10.sec115E_b,
			"5AD1biip":cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii,
			"1A":cgosIncome.cgInc.stcg.prctg15.sec111a,
			"5AB1b":cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B
	};
	return simap;
}

function updateMapForSI(cgosIncome, simap){
	simap["5Eacg"]=cgosIncome.cgInc.ltcg.prctg20.sec11EA;
	simap["5AC1c"]=cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
	simap["5ACA1b"]=cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1;
	simap["5AB1b"]=cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B;
    simap["5ADiii"]=cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
    simap["5Eb"]=cgosIncome.cgInc.ltcg.prctg10.sec115E_b;
    simap["5AD1biip"]=cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
    simap["1A"]=cgosIncome.cgInc.stcg.prctg15.sec111a;
}

function calcTotal80IA(){

	var grossTotalIncome = coalesce(document.getElementsByName('partBTI.grossTotalIncome')[0].value);

 	if(parseInt(grossTotalIncome ,10)< 0){

 		grossTotalIncome='';

 	}

 	var table = document.getElementById('taxDed80IA4iID');
	var rowCount = table.rows.length;
	var sumTotal80IAaa=0;
	for(var i=0;i<rowCount-2;i++){
		sumTotal80IAaa = eval(parseInt(sumTotal80IAaa,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IAaa['+i+']'),10));
	}

	var table = document.getElementById('taxDed80IA4iiID');
		var rowCount = table.rows.length;
		var sumTotal80IAa=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IAa = eval(parseInt(sumTotal80IAa,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IAa['+i+']'),10));
		}

	var table = document.getElementById('taxDed80IA4iiiID');
		var rowCount = table.rows.length;
		var sumTotal80IAb=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IAb = eval(parseInt(sumTotal80IAb,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IAb['+i+']'),10));
		}

	var table = document.getElementById('taxDed80IA4ivID');
		var rowCount = table.rows.length;
		var sumTotal80IAc=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IAc = eval(parseInt(sumTotal80IAc,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IAc['+i+']'),10));
		}

	var table = document.getElementById('taxDed80IA4vID');
		var rowCount = table.rows.length;
		var sumTotal80IAd=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IAd = eval(parseInt(sumTotal80IAd,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IAd['+i+']'),10));
		}

		document.getElementsByName('schedule80IA.totSchedule80IA')[0].value=sumTotal80IAaa+sumTotal80IAa+sumTotal80IAb+sumTotal80IAc+sumTotal80IAd;


}

function calcTotal80IB(){

	var grossTotalIncome = coalesce(document.getElementsByName('partBTI.grossTotalIncome')[0].value);

 	if(parseInt(grossTotalIncome ,10)< 0){

 		grossTotalIncome='';

 	}


	var table = document.getElementById('deductJKLocUs80IB4');
		var rowCount = table.rows.length;
		var sumTotal80IBa=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBa = eval(parseInt(sumTotal80IBa,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBa['+i+']'),10));
		}

	var table = document.getElementById('deductBackStatesUs80IB4');
		var rowCount = table.rows.length;
		var sumTotal80IBb=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBb = eval(parseInt(sumTotal80IBb,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBb['+i+']'),10));
		}

	var table = document.getElementById('deductBackDisttUs80IB5');
		var rowCount = table.rows.length;
		var sumTotal80IBc=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBc = eval(parseInt(sumTotal80IBc,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBc['+i+']'),10));
		}

	var table = document.getElementById('deductMultiplexUs80IB7A');
		var rowCount = table.rows.length;
		var sumTotal80IBd=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBd = eval(parseInt(sumTotal80IBd,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBd['+i+']'),10));
		}

	var table = document.getElementById('deductConvCentUs80IB7B');
		var rowCount = table.rows.length;
		var sumTotal80IBe=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBe = eval(parseInt(sumTotal80IBe,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBe['+i+']'),10));
		}

	var table = document.getElementById('deductMinOilUs80IB9');
		var rowCount = table.rows.length;
		var sumTotal80IBf=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBf = eval(parseInt(sumTotal80IBf,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBf['+i+']'),10));
		}

	var table = document.getElementById('deductHousUs80IB10');
		var rowCount = table.rows.length;
		var sumTotal80IBg=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBg = eval(parseInt(sumTotal80IBg,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBg['+i+']'),10));
		}

	var table = document.getElementById('deductColdChainUs80IB11');
		var rowCount = table.rows.length;
		var sumTotal80IBh=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBh = eval(parseInt(sumTotal80IBh,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBh['+i+']'),10));
		}

	var table = document.getElementById('deductFruitVegUs80IB11A');
		var rowCount = table.rows.length;
		var sumTotal80IBi=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBi = eval(parseInt(sumTotal80IBi,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBi['+i+']'),10));
		}

	var table = document.getElementById('deductFoodGrainUs80IB11A');
		var rowCount = table.rows.length;
		var sumTotal80IBj=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBj = eval(parseInt(sumTotal80IBj,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBj['+i+']'),10));
		}

	var table = document.getElementById('deductRurHospUs80IB11B');
		var rowCount = table.rows.length;
		var sumTotal80IBk=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBk = eval(parseInt(sumTotal80IBk,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBk['+i+']'),10));
		}

	var table = document.getElementById('deductHospAnyAreaUs80IB11C');
		var rowCount = table.rows.length;
		var sumTotal80IBl=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80IBl = eval(parseInt(sumTotal80IBl,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80IBl['+i+']'),10));
		}

	document.getElementsByName('schedule80IB.totSchedule80IB')[0].value=
	sumTotal80IBa+
	sumTotal80IBb+
	sumTotal80IBc+
	sumTotal80IBd+
	sumTotal80IBe+
	sumTotal80IBf+
	sumTotal80IBg+
	sumTotal80IBh+
	sumTotal80IBi+
	sumTotal80IBj+
	sumTotal80IBk+
	sumTotal80IBl;


}

function calcTotal80IC(){
	var grossTotalIncome = coalesce(document.getElementsByName('partBTI.grossTotalIncome')[0].value);

 	if(parseInt(grossTotalIncome ,10)< 0){

 		grossTotalIncome='';

 	}

	var table = document.getElementById('deductInSikkim');
		var rowCount = table.rows.length;
		var sumTotal80ICa=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICa = eval(parseInt(sumTotal80ICa,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICa['+i+']'),10));
		}
	var table = document.getElementById('deductInHimachalP');
		var rowCount = table.rows.length;
		var sumTotal80ICb=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICb = eval(parseInt(sumTotal80ICb,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICb['+i+']'),10));
		}
	var table = document.getElementById('deductInUttaranchal');
		var rowCount = table.rows.length;
		var sumTotal80ICc=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICc = eval(parseInt(sumTotal80ICc,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICc['+i+']'),10));
		}
	var table = document.getElementById('deductInNorthEastAassam');
		var rowCount = table.rows.length;
		var sumTotal80ICda=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICda = eval(parseInt(sumTotal80ICda,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICda['+i+']'),10));
		}
	var table = document.getElementById('deductInNorthEastArunachalPradesh');
		var rowCount = table.rows.length;
		var sumTotal80ICdb=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICdb = eval(parseInt(sumTotal80ICdb,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICdb['+i+']'),10));
		}
	var table = document.getElementById('deductInNorthEastManipur');
		var rowCount = table.rows.length;
		var sumTotal80ICdc=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICdc = eval(parseInt(sumTotal80ICdc,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICdc['+i+']'),10));
		}
	var table = document.getElementById('deductInNorthEastMizoram');
		var rowCount = table.rows.length;
		var sumTotal80ICdd=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICdd = eval(parseInt(sumTotal80ICdd,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICdd['+i+']'),10));
		}
	var table = document.getElementById('deductInNorthEastMeghalaya');
		var rowCount = table.rows.length;
		var sumTotal80ICde=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICde = eval(parseInt(sumTotal80ICde,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICde['+i+']'),10));
		}
	var table = document.getElementById('deductInNorthEastNagaland');
		var rowCount = table.rows.length;
		var sumTotal80ICdf=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICdf = eval(parseInt(sumTotal80ICdf,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICdf['+i+']'),10));
		}
	var table = document.getElementById('deductInNorthEastTripura');
		var rowCount = table.rows.length;
		var sumTotal80ICdg=0;
		for(var i=0;i<rowCount-2;i++){
			sumTotal80ICdg = eval(parseInt(sumTotal80ICdg,10) + parseInt(coalesceSetRet('schedule80.dedUs80Detail.dedFromUndertaking.80ICdg['+i+']'),10));
		}

	var totDeductInNorthEast=$('[name="schedule80IC.deductInNorthEast.totDeductInNorthEast"]')[0];

	totDeductInNorthEast.value=
	sumTotal80ICda+
	sumTotal80ICdb+
	sumTotal80ICdc+
	sumTotal80ICdd+
	sumTotal80ICde+
	sumTotal80ICdf+
	sumTotal80ICdg;


	document.getElementsByName('schedule80IC.totSchedule80IC')[0].value=
	sumTotal80ICa+
	sumTotal80ICb+
	sumTotal80ICc+
	sumTotal80ICda+
	sumTotal80ICdb+
	sumTotal80ICdc+
	sumTotal80ICdd+
	sumTotal80ICde+
	sumTotal80ICdf+
	sumTotal80ICdg;
}


function calcTotal80GDeductions (tableId,noOfRow,last,amt5BBC,amt5Ea)  {
	 try {

		 	var grossTotalIncome = coalesce(document.getElementsByName('partBTI.grossTotalIncome')[0].value);
		 	var incChrgable= coalesce(document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value);
			var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
			var pan = document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
			var ded10A=coalesce(document.getElementsByName('partBTI.deductionsUnder10Aor10AA')[0].value);

		 	if(parseInt(grossTotalIncome ,10)< 0){

		 		grossTotalIncome='0';

		 	}

		 	var residue50Perc;
			var qualifyingLimit;
			var scheduleVIA =  document.getElementsByName('scheduleVIA.deductUndChapVIA.totalChapVIADeductions')[0]; scheduleVIA.value = coalesce(scheduleVIA.value);
			var schedule80G=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80G')[0]; schedule80G.value = coalesce(schedule80G.value);
			var schedule80GGC=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80GGC')[0]; schedule80GGC.value = coalesce(schedule80GGC.value);
			var schedule80JJAA=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80JJAA')[0]; schedule80JJAA.value = coalesce(schedule80JJAA.value);
			var usr80GGC=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80GGC')[0];
			usr80GGC.value = coalesce(usr80GGC.value);
			var deductionsSysTotal=0;

			deductionsSysTotal=zeroOrMore(eval(parseInt(scheduleVIA.value,10)-parseInt(schedule80G.value,10)-parseInt(schedule80GGC.value,10)+parseInt(usr80GGC.value ,10)));

			if(parseInt(deductionsSysTotal ,10)> parseInt(grossTotalIncome ,10)){

				deductionsSysTotal=grossTotalIncome;
			}

			var gtiLimit=eval(parseInt(coalesce(grossTotalIncome),10)-parseInt(coalesce(incChrgable),10)-parseInt(coalesce(ded10A),10)) ;

			if(gtiLimit<0){
				gtiLimit=0;
			}
			var tab = document.getElementById(tableId);
			var allInputTags = tab.getElementsByTagName('input');

			if ( tableId == 'ded100PerWithoutQual' ) {
				for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("eligibleDonationAmt$")) {
						allInputTags[i].value = coalesce(allInputTags[i - 1].value);
							if( parseInt(allInputTags[i].value,10) > parseInt(gtiLimit ,10)) {
								allInputTags[i].value = gtiLimit;
							}
					}
				}
				calcTableTotEligAmt('ded100PerWithoutQual',qualifyingLimit,residue50Perc);
			}

			if ( tableId == 'ded50WithoutQual' ) {
				for(var i = 0; i < allInputTags.length; i++) {
					if (allInputTags[i].name.match("eligibleDonationAmt$")) {

						allInputTags[i].value = parseInt(Math.round(coalesce(allInputTags[i - 1].value)/2) , 10);
							if( parseInt(allInputTags[i].value ,10) > parseInt(gtiLimit ,10) ) {
								allInputTags[i].value = gtiLimit;
							}

					}
				}
				calcTableTotEligAmt('ded50WithoutQual',qualifyingLimit,residue50Perc);
			}


			//Net Qualifyin Limit calculation


			var adjstGTI;
			if(grossTotalIncome==scheduleVIA.value){
				adjstGTI=0;
			}else{

			 adjstGTI = eval(parseInt(grossTotalIncome,10))-eval(parseInt(deductionsSysTotal,10))
	 			-eval(incChrgable)
	 			+ parseInt(document.getElementsByName('scheduleSI.splCodeRateTax[0].splRateInc')[0].value)
	 			+ parseInt(document.getElementsByName('scheduleSI.splCodeRateTax[2].splRateInc')[0].value)
	 			+ parseInt(coalesce(amt5BBC));

			}

			qualifyingLimit = eval(parseInt(adjstGTI ,10) * parseFloat('0.10'));


			if(parseInt(qualifyingLimit,10) <0){
				qualifyingLimit='0';
			}
			var totEligAmtTableC = document.getElementsByName('schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0];

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


			var residue;
			if(parseInt(qualifyingLimit , 10) > parseInt(coalesce(totEligAmtTableC.value) , 10)) {

					residue = eval(parseInt(qualifyingLimit , 10)) -eval( parseInt(totEligAmtTableC.value , 10) );
				} else {
					residue = parseInt('0' ,10) ;
				}


			 residue50Perc = eval( parseInt(residue , 10) * parseFloat( '0.50' ));


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
			alert ('ss :- ' + e);
			alert ('Uma :- ' + e.stack);
		}

	}



function calcTableTotEligAmt(tableId,qualifyingLimit,residue50Perc){
	try{

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


			var grossTotalIncome = coalesce(document.getElementsByName('partBTI.grossTotalIncome')[0].value);

			if(parseInt(grossTotalIncome ,10)< 0){

		 		grossTotalIncome='0';

		 	}

			if( parseInt(sumOfAll ,10) > parseInt(grossTotalIncome ,10)) {
				sumOfAll = grossTotalIncome;
			}



			if(tableId == 'ded100PerWithoutQual'){
					var temp1 = document.getElementsByName('schedule80G.don100Percent.totEligibleDon100Percent')[0] ;
					var temp2 = document.getElementsByName('schedule80G.don100Percent.totDon100Percent')[0] ;

					temp1.value = parseInt(sumOfAll ,10);

					temp2.value = parseInt(sumOfAlluserEntredValue ,10);


				}
			else if(tableId == 'ded50WithoutQual'){
					var temp1 = document.getElementsByName('schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0] ;
					var temp2 = document.getElementsByName('schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0] ;
					temp1.value = parseInt(sumOfAll ,10);
					temp2.value = parseInt(sumOfAlluserEntredValue ,10);
				}
			else if(tableId == 'ded100Qual'){
					var temp1 = document.getElementsByName('schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0] ;
					var temp2 = document.getElementsByName('schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0] ;
					temp1.value = parseInt(sumOfAll ,10);
					temp2.value = parseInt(sumOfAlluserEntredValue ,10);

					if(parseInt(temp1.value ,10) > parseInt(qualifyingLimit ,10)){

						temp1.value=parseInt(qualifyingLimit ,10);;
					}

			}
			else if(tableId == 'ded50WithQual'){

					var temp1 = document.getElementsByName('schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0] ;
					var temp2 = document.getElementsByName('schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0] ;

					temp1.value = parseInt(sumOfAll ,10);
					temp2.value = parseInt(sumOfAlluserEntredValue ,10);

					if(parseInt(temp1.value ,10) > parseInt(residue50Perc ,10)){

						temp1.value=parseInt(residue50Perc ,10);;
					}

			}

			calcTotalDonations80G();
			calcEligbDonations80G();
	}catch(e){
		//alert(e);
	}
	}




function calcTotalDonations80G(){

	 var tot80GAuserEntrd =  document.getElementsByName('schedule80G.don100Percent.totDon100Percent')[0]; tot80GAuserEntrd.value = coalesce(tot80GAuserEntrd.value);
	 var tot80GBuserEntrd =  document.getElementsByName('schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0]; tot80GBuserEntrd.value = coalesce(tot80GBuserEntrd.value);
	 var tot80GCuserEntrd =  document.getElementsByName('schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0]; tot80GCuserEntrd.value = coalesce(tot80GCuserEntrd.value);
	 var tot80GDuserEntrd =  document.getElementsByName('schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0]; tot80GDuserEntrd.value = coalesce(tot80GDuserEntrd.value);
	 var tot80GDonuserEntrd =  document.getElementsByName('schedule80G.totalDonationsUs80G')[0]; tot80GDonuserEntrd.value = coalesce(tot80GDonuserEntrd.value);

	 tot80GDonuserEntrd.value = eval(tot80GAuserEntrd.value)+ eval(tot80GBuserEntrd.value)+ eval(tot80GCuserEntrd.value)+ eval(tot80GDuserEntrd.value) ;

	}




function calcEligbDonations80G(){
	var grossTotalIncome = coalesce(document.getElementsByName('partBTI.grossTotalIncome')[0].value);
	var incChrgable= coalesce(document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value);
	var ded10A=coalesce(document.getElementsByName('partBTI.deductionsUnder10Aor10AA')[0].value);
	var gtiLimit=eval(parseInt(coalesce(grossTotalIncome),10)-parseInt(coalesce(incChrgable),10)-parseInt(coalesce(ded10A),10)) ;
	 var tot80GAelig =  document.getElementsByName('schedule80G.don100Percent.totEligibleDon100Percent')[0]; tot80GAelig.value = coalesce(tot80GAelig.value);
	 var tot80GBelig =  document.getElementsByName('schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0]; tot80GBelig.value = coalesce(tot80GBelig.value);
	 var tot80GCelig =  document.getElementsByName('schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0]; tot80GCelig.value = coalesce(tot80GCelig.value);
	 var tot80GDelig =  document.getElementsByName('schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0]; tot80GDelig.value = coalesce(tot80GDelig.value);
	 var tot80GDonelig =  document.getElementsByName('schedule80G.totalEligibleDonationsUs80G')[0]; tot80GDonelig.value = coalesce(tot80GDonelig.value);

	 tot80GDonelig.value = eval(tot80GAelig.value)+ eval(tot80GBelig.value)+ eval(tot80GCelig.value)+ eval(tot80GDelig.value) ;

	 if(gtiLimit<0){
		 gtiLimit=parseInt('0',10);
	 }

	 if(tot80GDonelig.value> gtiLimit){
		 tot80GDonelig.value=gtiLimit;
	 }
}



function caclDedSchVIA(){
	try{
		var grossTotInc = document.getElementsByName('partBTI.grossTotalIncome')[0];
		var incChrgable=document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0];
		var statusOrCompanyType=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
		var substatusOrCompanyType=document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
		var deductionsUnder10Aor10AA=document.getElementsByName('partBTI.deductionsUnder10Aor10AA')[0];

		if(parseInt(grossTotInc.value ,10) <0){

			grossTotInc.value='0';
		}

		if(parseInt(incChrgable.value ,10) <0){

			incChrgable.value='0';
		}


     var gtiLimit=eval(parseInt(coalesce(grossTotInc.value),10)-parseInt(coalesce(incChrgable.value),10)
                						-parseInt(coalesce(deductionsUnder10Aor10AA.value),10));

                if(gtiLimit<0){
                    gtiLimit=0;
                }


    var profGainSpecifiedBus = document.getElementsByName('partBTI.profBusGain.profGainSpecifiedBus')[0];
    var gtiLimitC = zeroOrMore(parseInt(coalesce(gtiLimit),10) - parseInt(coalesce(profGainSpecifiedBus.value),10));


	var sec80G=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80G')[0];
	var sec80GSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80G')[0];
	var totalElgblAmt80G=document.getElementsByName('schedule80G.totalEligibleDonationsUs80G')[0];

	var sec80GGC=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGC')[0];
	var sec80GGCSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80GGC')[0];

	var sch80IA=document.getElementsByName('schedule80IA.totSchedule80IA')[0];
	var sec80IA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IA')[0];
	var sec80IASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IA')[0];


	var sec80IAB=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IAB')[0];
	var sec80IABSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IAB')[0];

	var sec80IAC=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IAC')[0];
	var sec80IACSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IAC')[0];

	var sch80IB=document.getElementsByName('schedule80IB.totSchedule80IB')[0];
	var sec80IB=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IB')[0];
	var sec80IBSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IB')[0];

	var sec80IBA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IBA')[0];
	var sec80IBASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IBA')[0];

	var sch80IC=document.getElementsByName('schedule80IC.totSchedule80IC')[0];
	var sec80IC=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IC')[0];
	var sec80ICSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IC')[0];

	/*var sec80ID=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80ID')[0];
	var sec80IDSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80ID')[0];*/

	var sec80JJA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80JJA')[0];
	var sec80JJASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80JJA')[0];


	var section80JJAA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80JJAA')[0];
	var sec80JJAASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80JJAA')[0];

	var sec80LA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80LA')[0];
	var sec80LASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80LA')[0];

	var sec80P=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80P')[0];
	var sec80PSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80P')[0];

	var totalDedVIA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.totalChapVIADeductions')[0]; totalDedVIA.value=coalesce(totalDedVIA.value);
	var totalDedVIASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.totalChapVIADeductions')[0]; totalDedVIASysCal.value=coalesce(totalDedVIASysCal.value);

	var total80P = document.getElementsByName('schedule80P.usrDeductUndSec80P.total')[0];


	//Autopopulate 80G

	sec80G.value=totalElgblAmt80G.value;

	if(eval(parseInt(sec80G.value,10)>parseInt(gtiLimit,10))){

		sec80GSysCal.value=parseInt(gtiLimit,10);
	}else{
		sec80GSysCal.value = parseInt(sec80G.value,10);
	}



	//80GGC
	if(!(substatusOrCompanyType == '9') && statusOrCompanyType != '2') {
		if(eval(parseInt(sec80GGC.value,10)>parseInt(gtiLimit,10))){

			sec80GGCSysCal.value=parseInt(gtiLimit,10);
		}else{
			sec80GGCSysCal.value = parseInt(sec80GGC.value,10);
		}
	} else {
			sec80GGCSysCal.value = parseInt(0,10);
	}

//Part C limited to gtiLimitC
	//80IAB
	if(eval(parseInt(sec80IAB.value,10)>parseInt(gtiLimitC,10))){

		sec80IABSysCal.value=parseInt(gtiLimitC,10);
	}else{
		sec80IABSysCal.value = parseInt(coalesce(sec80IAB.value,10));
	}

	//80IAC
	if(eval(parseInt(sec80IAC.value,10)>parseInt(gtiLimitC,10))){

		sec80IACSysCal.value=parseInt(gtiLimitC,10);
	}else{
		sec80IACSysCal.value = parseInt(coalesce(sec80IAC.value,10));
	}

	//80JJAA
	if(eval(parseInt(section80JJAA.value,10)>parseInt(gtiLimitC,10))){

		sec80JJAASysCal.value=parseInt(gtiLimitC,10);
	}else{
		sec80JJAASysCal.value = parseInt(coalesce(section80JJAA.value,10));
	}

	//Autopoulate 80IA
	if(eval(parseInt(coalesce(sec80IA.value),10)>parseInt(coalesce(gtiLimitC),10))){

		sec80IA.value = parseInt(coalesce(sch80IA.value),10);
		sec80IASysCal.value = parseInt(gtiLimitC,10);
	}else{
		sec80IA.value = parseInt(coalesce(sch80IA.value),10);
		sec80IASysCal.value = parseInt(coalesce(sch80IA.value),10);
	}

	//Autopoulate 80IB

	if(eval(parseInt(coalesce(sec80IB.value),10)>parseInt(coalesce(gtiLimitC),10))){

		sec80IB.value = parseInt(coalesce(sch80IB.value),10);
		sec80IBSysCal.value = parseInt(gtiLimitC,10);
	}else{

		sec80IB.value = parseInt(coalesce(sch80IB.value),10);
		sec80IBSysCal.value = parseInt(coalesce(sch80IB.value),10);
	}

	//80IBA
	if(eval(parseInt(sec80IBA.value,10)>parseInt(gtiLimitC,10))){

		sec80IBASysCal.value=parseInt(gtiLimitC,10);
	}else{
		sec80IBASysCal.value = parseInt(coalesce(sec80IBA.value,10));
	}

	//Autopoulate 80IC

	if(eval(parseInt(coalesce(sec80IC.value),10)>parseInt(coalesce(gtiLimitC),10))){

		sec80IC.value = parseInt(coalesce(sch80IC.value),10);
		sec80ICSysCal.value = parseInt(gtiLimitC,10);
	}else{
		sec80IC.value = parseInt(coalesce(sch80IC.value),10);
		sec80ICSysCal.value = parseInt(coalesce(sch80IC.value),10);
	}


	//80ID


/*	if(eval(parseInt(sec80ID.value,10)>parseInt(gtiLimitC,10))){

		sec80IDSysCal.value=parseInt(gtiLimitC,10);
	}else{
		sec80IDSysCal.value = parseInt(coalesce(sec80ID.value,10));
	}*/


	//80JJA
	if(eval(parseInt(sec80JJA.value,10)>parseInt(gtiLimitC,10))){

		sec80JJASysCal.value=parseInt(gtiLimitC,10);
	}else{
		sec80JJASysCal.value = parseInt(coalesce(sec80JJA.value,10));
	}

        //80LA
	if(eval(parseInt(sec80LA.value,10)>parseInt(gtiLimitC,10))){

		sec80LASysCal.value=parseInt(gtiLimitC,10);
	}else{
		sec80LASysCal.value = parseInt(coalesce(sec80LA.value,10));

	}

	sec80P.value=parseInt(coalesce(total80P.value,10));
        //80P
	if(eval(parseInt(sec80PSysCal.value,10)>parseInt(gtiLimitC,10))){

		sec80PSysCal.value=parseInt(gtiLimitC,10);
	}
	else{
		sec80PSysCal.value=parseInt(coalesce(total80P.value,10));

	}

	sumUserEntrdDed();

	// Do the sum of deductions again after adding 80GG and 80G
	sumDeductions(sec80GSysCal,sec80GGCSysCal,
			sec80IASysCal,sec80IABSysCal,sec80IACSysCal,sec80IBSysCal,sec80IBASysCal,sec80ICSysCal,sec80JJASysCal,
			sec80JJAASysCal,sec80LASysCal,sec80PSysCal);


	}catch(e){
		//alert(e);
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

function sumUserEntrdDed() {

	var sec80G=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80G')[0];
	var sec80GGC=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGC')[0];
	var sec80IA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IA')[0];
	var sec80IAB=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IAB')[0];
	var sec80IAC=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IAC')[0];
	var sec80IB=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IB')[0];
	var sec80IBA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IBA')[0];
	var sec80IC=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80IC')[0];
	/*var sec80ID=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80ID')[0];*/
	var sec80JJA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80JJA')[0];
	var sec80JJAA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80JJAA')[0];
	var sec80LA=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80LA')[0];
	var sec80P=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80P')[0];

	var userEntrdDedPartB=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.totalDeductionPartb')[0];
	var userEntrdDedPartC=document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.totalDeductionPartC')[0];


	  userEntrdDedPartB.value= eval(parseInt(coalesce(sec80G.value) ,10))+
							 eval(parseInt(coalesce(sec80GGC.value) ,10));

	  userEntrdDedPartC.value= eval(parseInt(coalesce(sec80IA.value) ,10))+
							 eval(parseInt(coalesce(sec80IAB.value) ,10))+
							 eval(parseInt(coalesce(sec80IAC.value) ,10))+
							 eval(parseInt(coalesce(sec80IB.value) ,10))+
							 eval(parseInt(coalesce(sec80IBA.value) ,10))+
							 eval(parseInt(coalesce(sec80IC.value) ,10))+
							 eval(parseInt(coalesce(sec80JJA.value) ,10))+
							 eval(parseInt(coalesce(sec80JJAA.value) ,10))+
	                                                 eval(parseInt(coalesce(sec80LA.value) ,10))+
							 eval(parseInt(coalesce(sec80P.value) ,10));

	        var userEntrdDed = document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.totalChapVIADeductions')[0];
		userEntrdDed.value =eval(parseInt(coalesce(userEntrdDedPartB.value) ,10))+eval(parseInt(coalesce(userEntrdDedPartC.value) ,10));

		}

	function sumDeductions(sec80GSysCalc,sec80GGCSysCalc,
		sec80IASysCal,sec80IABSysCal,sec80IACSysCal,sec80IBSysCal,sec80IBASysCal,sec80ICSysCal,sec80JJASysCal,
		sec80JJAASysCal,sec80LASysCalc,sec80PSysCalc){

	sec80GSysCalc.value = coalesce(sec80GSysCalc.value); sec80GGCSysCalc.value = coalesce(sec80GGCSysCalc.value);
	sec80IASysCal.value = coalesce(sec80IASysCal.value); sec80IABSysCal.value = coalesce(sec80IABSysCal.value);
	sec80IACSysCal.value = coalesce(sec80IACSysCal.value); sec80IBASysCal.value = coalesce(sec80IBASysCal.value);
	sec80IBSysCal.value = coalesce(sec80IBSysCal.value); sec80ICSysCal.value = coalesce(sec80ICSysCal.value);
	sec80LASysCalc.value = coalesce(sec80LASysCalc.value); sec80PSysCalc.value=   coalesce(sec80PSysCalc.value);

	var dedPartB=document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartb')[0];
	var dedPartC=document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartC')[0];

	dedPartB.value= eval(sec80GSysCalc.value) + eval(sec80GGCSysCalc.value);
	dedPartC.value= eval(sec80IASysCal.value)+ eval(sec80IABSysCal.value)+eval(sec80IACSysCal.value)+eval(sec80ICSysCal.value)+ eval(sec80IBSysCal.value)+
	                eval(sec80IBASysCal.value)+eval(sec80JJASysCal.value)+eval(sec80JJAASysCal.value)+eval(sec80LASysCalc.value)+ eval(sec80PSysCalc.value);

	var totalDedVIASysCal = document.getElementsByName('scheduleVIA.deductUndChapVIA.totalChapVIADeductions')[0];

	var grossTotInc = document.getElementsByName('partBTI.grossTotalIncome')[0];
	var incChrgable=document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0];
	var deductionsUnder10Aor10AA = document.getElementsByName('partBTI.deductionsUnder10Aor10AA')[0];
	var gtiLimit=eval(parseInt(coalesce(grossTotInc.value),10)-parseInt(coalesce(incChrgable.value),10)
						-parseInt(coalesce(deductionsUnder10Aor10AA.value),10));

	var profGainSpecifiedBus = document.getElementsByName('partBTI.profBusGain.profGainSpecifiedBus')[0];
	var gtiLimitC = zeroOrMore(parseInt(coalesce(gtiLimit),10) - parseInt(coalesce(profGainSpecifiedBus.value),10));

	if(gtiLimit<0){
		gtiLimit=0;
	}

	dedPartB.value = Math.min(dedPartB.value, gtiLimit);
	dedPartC.value = Math.min(dedPartC.value, gtiLimitC);

	var temp2 = eval(parseInt(dedPartB.value,10) + parseInt(dedPartC.value,10));

	if(coalesce(grossTotInc.value) > parseInt('0',10)){
		if( temp2 >  parseInt(coalesce(gtiLimit) ,10)){
			totalDedVIASysCal.value = parseInt(coalesce(gtiLimit) ,10);
		} else{
			totalDedVIASysCal.value = temp2;
		}
	}else{
		totalDedVIASysCal.value = temp2;
	}

	}

	function calScheduleAmtc(){
		try{
		var taxSection115JC = $('[name="scheduleAMTC.taxSection115JC"]')[0];
		var taxOthProvisions = $('[name="scheduleAMTC.taxOthProvision"]')[0];
		var amtTaxCreditAvailable = $('[name="scheduleAMTC.amtTaxCreditAvailable"]')[0];
		var partBttiTotalTax=$('[name="partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.totalTax"]')[0];
		var partBttiGrossTaxLiability=$('[name="partBTTI.computationOfTaxLiability.grossTaxLiability"]')[0];

		taxSection115JC.value=partBttiTotalTax.value;
		taxOthProvisions.value=partBttiGrossTaxLiability.value;

		if(eval(parseInt(coalesce(taxOthProvisions.value),10)) > eval(parseInt(coalesce(taxSection115JC.value),10))){

			amtTaxCreditAvailable.value=eval(parseInt(coalesce(taxOthProvisions.value),10))-eval(parseInt(coalesce(taxSection115JC.value),10));
		}else{
			amtTaxCreditAvailable.value=parseInt('0',10);
		}

		var tab = document.getElementById('scheduleAmtc');
		var allInputTags = tab.getElementsByTagName('input');

		var totAMTGross = parseInt('0' ,10);
		var totBalBF = parseInt('0' ,10);
		var totAmtCreditUtilisedCY = parseInt('0' ,10);
		var totBalAMTCreditCF = parseInt('0' ,10);

		var amtCreditFwd = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[0].amtCreditFwd')[0].value;
		var amtCreditSetOfEy = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[0].amtCreditSetOfEy')[0].value;
		var amtCreditBalBroughtFwd = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[0].amtCreditBalBroughtFwd')[0];
		var amtCreditUtilized = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[0].amtCreditUtilized')[0].value;
		var balAmtCreditCarryFwd = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[0].balAmtCreditCarryFwd')[0];

		var amtCreditFwd1 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[1].amtCreditFwd')[0].value;
		var amtCreditSetOfEy1 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[1].amtCreditSetOfEy')[0].value;
		var amtCreditBalBroughtFwd1 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[1].amtCreditBalBroughtFwd')[0];
		var amtCreditUtilized1 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[1].amtCreditUtilized')[0].value;
		var balAmtCreditCarryFwd1 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[1].balAmtCreditCarryFwd')[0];

		var amtCreditFwd2 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil.CYamtCreditFwd')[0].value;
		var amtCreditBalBroughtFwd2 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil.CYamtCreditBalBroughtFwd')[0];
		var balAmtCreditCarryFwd2 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil.CYbalAmtCreditCarryFwd')[0];

		//14-15
		var amtCreditFwd3 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[2].amtCreditFwd')[0].value;
		var amtCreditSetOfEy3 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[2].amtCreditSetOfEy')[0].value;
		var amtCreditBalBroughtFwd3 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[2].amtCreditBalBroughtFwd')[0];
		var amtCreditUtilized3 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[2].amtCreditUtilized')[0].value;
		var balAmtCreditCarryFwd3 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[2].balAmtCreditCarryFwd')[0];

		var amtCreditFwd4 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[3].amtCreditFwd')[0].value;
		var amtCreditSetOfEy4 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[3].amtCreditSetOfEy')[0].value;
		var amtCreditBalBroughtFwd4 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[3].amtCreditBalBroughtFwd')[0];
		var amtCreditUtilized4 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[3].amtCreditUtilized')[0].value;
		var balAmtCreditCarryFwd4 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[3].balAmtCreditCarryFwd')[0];

		var amtCreditFwd5 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[4].amtCreditFwd')[0].value;
		var amtCreditSetOfEy5 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[4].amtCreditSetOfEy')[0].value;
		var amtCreditBalBroughtFwd5 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[4].amtCreditBalBroughtFwd')[0];
		var amtCreditUtilized5 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[4].amtCreditUtilized')[0].value;
		var balAmtCreditCarryFwd5 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[4].balAmtCreditCarryFwd')[0];

		var amtCreditFwd6 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[5].amtCreditFwd')[0].value;
		var amtCreditBalBroughtFwd6 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[5].amtCreditBalBroughtFwd')[0];
		var amtCreditUtilized6 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[5].amtCreditUtilized')[0].value;
		var balAmtCreditCarryFwd6 = document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[5].balAmtCreditCarryFwd')[0];

		//12-13
		if(parseInt(coalesce(amtCreditSetOfEy),10) > parseInt(coalesce(amtCreditFwd),10)){
			j.setFieldError('scheduleAMTC.scheduleAMTCUtil[0].amtCreditSetOfEy','Set-off in earlier years (B2) should not be greater than Gross (B1)');
	 		addErrorXHTML(document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[0].amtCreditSetOfEy')[0],'Set-off in earlier years (B2) should not be greater than Gross (B1)',true);
	 		document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[0].amtCreditSetOfEy')[0].value=parseInt('0' ,10);
			document.getElementsByName('scheduleAMTC.totSetOffEys')[0].value=parseInt('0' ,10);
			amtCreditSetOfEy=parseInt('0' ,10);
	     }else{
			amtCreditBalBroughtFwd.value = eval(parseInt(coalesce(amtCreditFwd),10)) - eval(parseInt(coalesce(amtCreditSetOfEy),10));
	     }

		//13-14
		if(parseInt(coalesce(amtCreditSetOfEy1),10) > parseInt(coalesce(amtCreditFwd1),10)){
			j.setFieldError('scheduleAMTC.scheduleAMTCUtil[1].amtCreditSetOfEy','Set-off in earlier years (B2) should not be greater than Gross (B1)');
	 		addErrorXHTML(document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[1].amtCreditSetOfEy')[0],'Set-off in earlier years (B2) should not be greater than Gross (B1)',true);
	 		document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[1].amtCreditSetOfEy')[0].value=parseInt('0' ,10);
	 		amtCreditSetOfEy1=parseInt('0' ,10);
			document.getElementsByName('scheduleAMTC.totSetOffEys')[0].value=parseInt('0' ,10);
	     }else{
			amtCreditBalBroughtFwd1.value = eval(parseInt(coalesce(amtCreditFwd1),10)) - eval(parseInt(coalesce(amtCreditSetOfEy1),10));
	     }
		// 14-15
		 if(parseInt(coalesce(amtCreditSetOfEy3),10) > parseInt(coalesce(amtCreditFwd3),10)){
			j.setFieldError('scheduleAMTC.scheduleAMTCUtil[2].amtCreditSetOfEy','Set-off in earlier years (B2) should not be greater than Gross (B1)');
	 		addErrorXHTML(document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[2].amtCreditSetOfEy')[0],'Set-off in earlier years (B2) should not be greater than Gross (B1)',true);
	 		document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[2].amtCreditSetOfEy')[0].value=parseInt('0' ,10);
	 		amtCreditSetOfEy1=parseInt('0' ,10);
			document.getElementsByName('scheduleAMTC.totSetOffEys')[0].value=parseInt('0' ,10);
	     }else{
			amtCreditBalBroughtFwd3.value = eval(parseInt(coalesce(amtCreditFwd3),10)) - eval(parseInt(coalesce(amtCreditSetOfEy3),10));
	     }

		 if(parseInt(coalesce(amtCreditSetOfEy4),10) > parseInt(coalesce(amtCreditFwd4),10)){
				j.setFieldError('scheduleAMTC.scheduleAMTCUtil[3].amtCreditSetOfEy','Set-off in earlier years (B2) should not be greater than Gross (B1)');
		 		addErrorXHTML(document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[3].amtCreditSetOfEy')[0],'Set-off in earlier years (B2) should not be greater than Gross (B1)',true);
		 		document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[3].amtCreditSetOfEy')[0].value=parseInt('0' ,10);
		 		amtCreditSetOfEy4=parseInt('0' ,10);
				document.getElementsByName('scheduleAMTC.totSetOffEys')[0].value=parseInt('0' ,10);
		     }else{
				amtCreditBalBroughtFwd4.value = eval(parseInt(coalesce(amtCreditFwd4),10)) - eval(parseInt(coalesce(amtCreditSetOfEy4),10));
		     }

		 if(parseInt(coalesce(amtCreditSetOfEy5),10) > parseInt(coalesce(amtCreditFwd5),10)){
				j.setFieldError('scheduleAMTC.scheduleAMTCUtil[4].amtCreditSetOfEy','Set-off in earlier years (B2) should not be greater than Gross (B1)');
		 		addErrorXHTML(document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[4].amtCreditSetOfEy')[0],'Set-off in earlier years (B2) should not be greater than Gross (B1)',true);
		 		document.getElementsByName('scheduleAMTC.scheduleAMTCUtil[4].amtCreditSetOfEy')[0].value=parseInt('0' ,10);
		 		amtCreditSetOfEy5=parseInt('0' ,10);
				document.getElementsByName('scheduleAMTC.totSetOffEys')[0].value=parseInt('0' ,10);
		     }else{
				amtCreditBalBroughtFwd5.value = eval(parseInt(coalesce(amtCreditFwd5),10)) - eval(parseInt(coalesce(amtCreditSetOfEy5),10));
		     }

		 amtCreditBalBroughtFwd2.value = parseInt(coalesce(amtCreditFwd2),10);

		 amtCreditBalBroughtFwd6.value = parseInt(coalesce(amtCreditFwd6),10);

		 totAMTGross = parseInt(coalesce(amtCreditFwd),10) + parseInt(coalesce(amtCreditFwd1),10) + parseInt(coalesce(amtCreditFwd2),10)+parseInt(coalesce(amtCreditFwd3),10)+parseInt(coalesce(amtCreditFwd4),10)+parseInt(coalesce(amtCreditFwd5),10)+parseInt(coalesce(amtCreditFwd6),10);
		 totBalBF = parseInt(coalesce(amtCreditBalBroughtFwd.value),10) + parseInt(coalesce(amtCreditBalBroughtFwd1.value),10) + parseInt(coalesce(amtCreditBalBroughtFwd2.value),10)+ parseInt(coalesce(amtCreditBalBroughtFwd3.value),10)+parseInt(coalesce(amtCreditBalBroughtFwd4.value),10)+parseInt(coalesce(amtCreditBalBroughtFwd5.value),10)+parseInt(coalesce(amtCreditBalBroughtFwd6.value),10);

		 balAmtCreditCarryFwd.value= parseInt(coalesce(amtCreditBalBroughtFwd.value),10) - parseInt(coalesce(amtCreditUtilized),10);
		 balAmtCreditCarryFwd1.value= parseInt(coalesce(amtCreditBalBroughtFwd1.value),10) - parseInt(coalesce(amtCreditUtilized1),10);
		 balAmtCreditCarryFwd3.value= parseInt(coalesce(amtCreditBalBroughtFwd3.value),10) - parseInt(coalesce(amtCreditUtilized3),10);
		 balAmtCreditCarryFwd4.value= parseInt(coalesce(amtCreditBalBroughtFwd4.value),10) - parseInt(coalesce(amtCreditUtilized4),10);
		 balAmtCreditCarryFwd5.value= parseInt(coalesce(amtCreditBalBroughtFwd5.value),10) - parseInt(coalesce(amtCreditUtilized5),10);
		 balAmtCreditCarryFwd2.value= parseInt(coalesce( amtCreditBalBroughtFwd2.value),10);

		balAmtCreditCarryFwd6.value= parseInt(coalesce(amtCreditBalBroughtFwd6.value),10) - parseInt(coalesce(amtCreditUtilized6),10);

		 totAmtCreditUtilisedCY = parseInt(coalesce(amtCreditUtilized),10) + parseInt(coalesce(amtCreditUtilized1),10)+ parseInt(coalesce(amtCreditUtilized3),10)+parseInt(coalesce(amtCreditUtilized4),10)+parseInt(coalesce(amtCreditUtilized5),10)+parseInt(coalesce(amtCreditUtilized6),10);
		 totBalAMTCreditCF = parseInt(coalesce(balAmtCreditCarryFwd.value),10) + parseInt(coalesce(balAmtCreditCarryFwd1.value),10) + parseInt(coalesce(balAmtCreditCarryFwd2.value),10)+ parseInt(coalesce(balAmtCreditCarryFwd3.value),10)+parseInt(coalesce(balAmtCreditCarryFwd4.value),10)+parseInt(coalesce(balAmtCreditCarryFwd5.value),10)+parseInt(coalesce(balAmtCreditCarryFwd6.value),10);


		 document.getElementsByName('scheduleAMTC.totSetOffEys')[0].value= parseInt(coalesce(amtCreditSetOfEy1),10) + parseInt(coalesce(amtCreditSetOfEy),10)+parseInt(coalesce(amtCreditSetOfEy3),10)+parseInt(coalesce(amtCreditSetOfEy4),10)+parseInt(coalesce(amtCreditSetOfEy5),10);
			document.getElementsByName('scheduleAMTC.totAMTGross')[0].value=totAMTGross;
			document.getElementsByName('scheduleAMTC.totBalBF')[0].value=totBalBF;
			document.getElementsByName('scheduleAMTC.totAmtCreditUtilisedCY')[0].value=totAmtCreditUtilisedCY;
			document.getElementsByName('scheduleAMTC.totBalAMTCreditCF')[0].value=totBalAMTCreditCF;


			document.getElementsByName('scheduleAMTC.taxSection115JD')[0].value=totAmtCreditUtilisedCY;
			document.getElementsByName('scheduleAMTC.amtLiabilityAvailable')[0].value=totBalAMTCreditCF;

		}catch(e){
			alert(e);
		}


	}

function populateAMT(){

	var totIncomeTi=$('[name="partBTI.totalIncome"]')[0];
	var amtTotIncome=$('[name="itrScheduleAMT.totalIncItem11"]')[0];
	var deductClaimSec6A=$('[name="itrScheduleAMT.adjustmentSec115JC.deductClaimSec6A"]')[0];
	var deductClaimSec10AA=$('[name="itrScheduleAMT.adjustmentSec115JC.deductClaimSec10AA"]')[0];
	var deductClaimSec35AD=$('[name="itrScheduleAMT.adjustmentSec115JC.deductClaimSec35AD"]')[0];

	var sec115JCTotal=$('[name="itrScheduleAMT.adjustmentSec115JC.total"]')[0];
	var adjustedUnderSec115JC=$('[name="itrScheduleAMT.adjustedUnderSec115JC"]')[0];
	var taxPayableUnderSec115JC=$('[name="itrScheduleAMT.taxPayableUnderSec115JC"]')[0];

	var dedUnder10AA=$('[name="schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub"]')[0];

	var userType=$('[name="partAGEN1.orgFirmInfo.statusOrCompanyType"]')[0];
	var subuserType=$('[name="partAGEN1.orgFirmInfo.subStatus"]')[0];

	var grossTotInc = document.getElementsByName('partBTI.grossTotalIncome')[0];
	var incChargeSplRate=document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0];
	var sec80IASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IA')[0];
	var sec80IABSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IAB')[0];
	var sec80IACSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IAC')[0];
	var sec80IBSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IB')[0];
	var sec80ICSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IC')[0];
/*	var sec80IDSysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80ID')[0];*/
	var sec80JJASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80JJA')[0];
	var sec80JJAASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80JJAA')[0];
	var sec80LASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80LA')[0];
	var sec80IBASysCal=document.getElementsByName('scheduleVIA.deductUndChapVIA.section80IBA')[0];

	/*	Total of Schedule AMT Change*/

	var partBTotal5 = document.getElementsByName('partBTI.totalTI')[0].value;
	var partBCurntYerLoss6 = document.getElementsByName('partBTI.currentYearLoss')[0].value;
	var partBbrtFwdLossSetOff8 = document.getElementsByName('partBTI.broughtFwdLossesSetoff')[0].value;
	var partBTotInc13 = document.getElementsByName('partBTI.totalIncome')[0].value;

	var schBPAProfBefTaxA1 = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.profBfrTaxPL')[0].value;
	var schBPnetProfLossSpecifiedBus2B = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netProfLossSpecifiedBus')[0].value;
	var schBPdeductionUs35ADC46 = document.getElementsByName('itr5ScheduleBP.specifiedBusinessInc.deductionUs35AD')[0].value;
	var schBPpLFrmSpecifiedBus47 = document.getElementsByName('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal')[0].value;

	/*	End*/



	var dedVIA=eval(parseInt(coalesce(sec80IASysCal.value),10))+eval(parseInt(coalesce(sec80IABSysCal.value),10))+eval(parseInt(coalesce(sec80IACSysCal.value),10))+eval(parseInt(coalesce(sec80IBSysCal.value),10))+
	eval(parseInt(coalesce(sec80ICSysCal.value),10))+eval(parseInt(coalesce(sec80JJASysCal.value),10))+eval(parseInt(coalesce(sec80IBASysCal.value),10))+
	eval(parseInt(coalesce(sec80JJAASysCal.value),10))+eval(parseInt(coalesce(sec80LASysCal.value),10));

  	var deductionsUnder10Aor10AA=document.getElementsByName('partBTI.deductionsUnder10Aor10AA')[0];
  	var profGainSpecifiedBus=document.getElementsByName('partBTI.profBusGain.profGainSpecifiedBus')[0];
	var gtiLimit=eval(parseInt(coalesce(grossTotInc.value),10)-parseInt(coalesce(incChargeSplRate.value),10)
			- parseInt(coalesce(deductionsUnder10Aor10AA.value),10)- parseInt(coalesce(profGainSpecifiedBus.value),10));

        if(gtiLimit < 0){gtiLimit=0;}
	if(eval(parseInt(coalesce(dedVIA),10)) > eval(parseInt(coalesce(gtiLimit),10))){
		dedVIA=gtiLimit;
	}
	if(partBTotal5 == 0 && partBCurntYerLoss6 == 0 && partBbrtFwdLossSetOff8 == 0 && partBTotInc13 == 0 && (schBPAProfBefTaxA1 == schBPnetProfLossSpecifiedBus2B) && schBPdeductionUs35ADC46 > 0 && schBPpLFrmSpecifiedBus47 < 0 ){
		amtTotIncome.value=schBPpLFrmSpecifiedBus47;
	}else{
		amtTotIncome.value=totIncomeTi.value;
	}

	deductClaimSec6A.value=dedVIA;
	var ded10A10AAAlwd = parseInt(coalesceSetRet('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrAfterSetOffBFLosses'));

	deductClaimSec10AA.value=Math.min(dedUnder10AA.value,ded10A10AAAlwd);

	//2c=2a+2b
	sec115JCTotal.value=eval(parseInt(coalesce(deductClaimSec6A.value),10))+eval(parseInt(coalesce(deductClaimSec10AA.value),10))+eval(parseInt(coalesce(deductClaimSec35AD.value),10));
	//3=1+2c
	adjustedUnderSec115JC.value=returnZeroIfNegative(eval(parseInt(coalesce(amtTotIncome.value),10))+eval(parseInt(coalesce(sec115JCTotal.value),10)));
	//4

	if(subuserType.value=="7" || subuserType.value=="8" || userType.value=="9"|| subuserType.value=="17" || subuserType.value=="15" || subuserType.value=="16" || subuserType.value=="4" || subuserType.value=="12"){
	if((eval(parseInt(coalesce(adjustedUnderSec115JC.value),10)) > eval('2000000'))
			&& (eval(parseInt(coalesce(sec115JCTotal.value),10)) >eval('0'))){
		taxPayableUnderSec115JC.value=Math.round((18.5 * eval(parseInt(
				coalesce(adjustedUnderSec115JC.value), 10))) / 100);

	}else{
		taxPayableUnderSec115JC.value=parseInt('0',10);
	}

	}

	if(userType.value=="1" || userType.value=="2" || subuserType.value=="5" ){

		if(eval(parseInt(coalesce(sec115JCTotal.value),10)) >eval('0')){
			taxPayableUnderSec115JC.value=Math.round((18.5 * eval(parseInt(
					coalesce(adjustedUnderSec115JC.value), 10))) / 100);

		}else{

			taxPayableUnderSec115JC.value=parseInt('0',10);
		}
	}
	//17 Schedule B-TI
	document.getElementsByName('partBTI.deemedTotIncSec115JC')[0].value=eval(parseInt(coalesce(adjustedUnderSec115JC.value),10));

}

function calcSchDEPFor6(){

	var deprBlockTot15Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.deprBlockTot15Percent')[0]; deprBlockTot15Percent.value = coalesce(deprBlockTot15Percent.value);
	var deprBlockTot30Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.deprBlockTot30Percent')[0]; deprBlockTot30Percent.value = coalesce(deprBlockTot30Percent.value);
	var deprBlockTot40Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.deprBlockTot40Percent')[0]; deprBlockTot40Percent.value = coalesce(deprBlockTot40Percent.value);
	/*var deprBlockTot50Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.deprBlockTot50Percent')[0]; deprBlockTot50Percent.value = coalesce(deprBlockTot50Percent.value);
	var deprBlockTot60Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.deprBlockTot60Percent')[0]; deprBlockTot60Percent.value = coalesce(deprBlockTot60Percent.value);
	var deprBlockTot80Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.deprBlockTot80Percent')[0]; deprBlockTot80Percent.value = coalesce(deprBlockTot80Percent.value);
	var deprBlockTot100Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.deprBlockTot100Percent')[0]; deprBlockTot100Percent.value = coalesce(deprBlockTot100Percent.value);*/
	var totPlntMach = document.getElementsByName('scheduleDEP.summaryFromDeprSch.plantMachinerySummary.totPlntMach')[0]; totPlntMach.value = coalesce(totPlntMach.value);
	var deprBlockTot5Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.buildingSummary.deprBlockTot5Percent')[0]; deprBlockTot5Percent.value = coalesce(deprBlockTot5Percent.value);
	var deprBlockTot10Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.buildingSummary.deprBlockTot10Percent')[0]; deprBlockTot10Percent.value = coalesce(deprBlockTot10Percent.value);
	var buildingDeprBlockTot40Percent = document.getElementsByName('scheduleDEP.summaryFromDeprSch.buildingSummary.deprBlockTot40Percent')[0]; buildingDeprBlockTot40Percent.value = coalesce(buildingDeprBlockTot40Percent.value);
	var totBuildng = document.getElementsByName('scheduleDEP.summaryFromDeprSch.buildingSummary.totBuildng')[0]; totBuildng.value = coalesce(totBuildng.value);
	var furnitureSummary = document.getElementsByName('scheduleDEP.summaryFromDeprSch.furnitureSummary')[0]; furnitureSummary.value = coalesce(furnitureSummary.value);
	var intangibleAssetSummary = document.getElementsByName('scheduleDEP.summaryFromDeprSch.intangibleAssetSummary')[0]; intangibleAssetSummary.value = coalesce(intangibleAssetSummary.value);
	var shipsSummary = document.getElementsByName('scheduleDEP.summaryFromDeprSch.shipsSummary')[0]; shipsSummary.value = coalesce(shipsSummary.value);
	var profBfrTaxPL = document.getElementsByName('scheduleDEP.summaryFromDeprSch.totalDepreciation')[0]; profBfrTaxPL.value = coalesce(profBfrTaxPL.value);

	if(coalesce( parseInt(document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.proportionateAggDepreciation')[0].value,10) ) >0){

		deprBlockTot15Percent.value =coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.proportionateAggDepreciation')[0].value)
	}else{
		deprBlockTot15Percent.value =coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.netAggregateDepreciation')[0].value)
	}
	//deprBlockTot15Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.totalDepreciation')[0].value) ;

	if(coalesce( parseInt(document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.proportionateAggDepreciation')[0].value,10) ) >0){
			deprBlockTot30Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.proportionateAggDepreciation')[0].value) ;
		}
	    else
	    {
			deprBlockTot30Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.netAggregateDepreciation')[0].value) ;
		}

	//deprBlockTot30Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.totalDepreciation')[0].value) ;
    if(coalesce( parseInt(document.getElementsByName('scheduleDPM.plantMachinery.rate40.depreciationDetail.proportionateAggDepreciation')[0].value,10) ) >0)
    {
	deprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate40.depreciationDetail.proportionateAggDepreciation')[0].value) ;
	}
    else
    {
	deprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate40.depreciationDetail.netAggregateDepreciation')[0].value) ;
	}


    /*	deprBlockTot15Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.totalDepreciation')[0].value) ;
	deprBlockTot30Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.totalDepreciation')[0].value) ;
	deprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate40.depreciationDetail.totalDepreciation')[0].value) ;
	deprBlockTot50Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate50.depreciationDetail.totalDepreciation')[0].value) ;
	deprBlockTot60Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate60.depreciationDetail.totalDepreciation')[0].value) ;
	deprBlockTot80Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate80.depreciationDetail.totalDepreciation')[0].value) ;
	deprBlockTot100Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate100.depreciationDetail.totalDepreciation')[0].value) ;*/
	totPlntMach.value = eval(parseInt(deprBlockTot15Percent.value,10)) + eval(parseInt(deprBlockTot30Percent.value,10)) + eval(parseInt(deprBlockTot40Percent.value,10)) /*+ eval(parseInt(deprBlockTot50Percent.value,10)) + eval(parseInt(deprBlockTot60Percent.value,10)) + eval(parseInt(deprBlockTot80Percent.value,10)) + eval(parseInt(deprBlockTot100Percent.value,10))*/;
	if(coalesce( parseInt(document.getElementsByName('scheduleDOA.building.rate5.depreciationDetail.proportionateAggDepreciation')[0].value,10) ) >0)
    {
	 	deprBlockTot5Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate5.depreciationDetail.proportionateAggDepreciation')[0].value) ;
	}
    else
    {
		deprBlockTot5Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate5.depreciationDetail.netAggregateDepreciation')[0].value) ;
	}

    if(coalesce( parseInt(document.getElementsByName('scheduleDOA.building.rate10.depreciationDetail.proportionateAggDepreciation')[0].value,10) ) >0)
    {
	 	deprBlockTot10Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate10.depreciationDetail.proportionateAggDepreciation')[0].value) ;
	}
    else
    {
		deprBlockTot10Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate10.depreciationDetail.netAggregateDepreciation')[0].value) ;
	}

    if(coalesce( parseInt(document.getElementsByName('scheduleDOA.building.rate40.depreciationDetail.proportionateAggDepreciation')[0].value,10) ) >0)
    {
	 buildingDeprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate40.depreciationDetail.proportionateAggDepreciation')[0].value) ;
	}
    else
    {
    buildingDeprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate40.depreciationDetail.netAggregateDepreciation')[0].value) ;
	}

/*
	deprBlockTot5Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate5.depreciationDetail.totalDepreciation')[0].value) ;
	deprBlockTot10Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate10.depreciationDetail.totalDepreciation')[0].value) ;
	buildingDeprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate40.depreciationDetail.totalDepreciation')[0].value) ;*/
	totBuildng.value = eval(parseInt(deprBlockTot5Percent.value,10)) + eval(parseInt(deprBlockTot10Percent.value,10)) + eval(parseInt(buildingDeprBlockTot40Percent.value,10));


	if(parseInt(document.getElementsByName('scheduleDOA.furnitureFittings.rate10.depreciationDetail.proportionateAggDepreciation')[0].value,10)>0){
		furnitureSummary.value = coalesce(document.getElementsByName('scheduleDOA.furnitureFittings.rate10.depreciationDetail.proportionateAggDepreciation')[0].value);
	}
	else{
		furnitureSummary.value = coalesce(document.getElementsByName('scheduleDOA.furnitureFittings.rate10.depreciationDetail.netAggregateDepreciation')[0].value);
	}
	if(parseInt(document.getElementsByName('scheduleDOA.intangibleAssets.rate25.depreciationDetail.proportionateAggDepreciation')[0].value,10)>0){
		intangibleAssetSummary.value = coalesce(document.getElementsByName('scheduleDOA.intangibleAssets.rate25.depreciationDetail.proportionateAggDepreciation')[0].value);
	}
	else{
		intangibleAssetSummary.value = coalesce(document.getElementsByName('scheduleDOA.intangibleAssets.rate25.depreciationDetail.netAggregateDepreciation')[0].value);
	}
	if(parseInt(document.getElementsByName('scheduleDOA.ships.rate20.depreciationDetail.proportionateAggDepreciation')[0].value,10)>0){
		shipsSummary.value = coalesce(document.getElementsByName('scheduleDOA.ships.rate20.depreciationDetail.proportionateAggDepreciation')[0].value);
	}
	else{
		shipsSummary.value = coalesce(document.getElementsByName('scheduleDOA.ships.rate20.depreciationDetail.netAggregateDepreciation')[0].value);
	}

	profBfrTaxPL.value = eval(parseInt(totPlntMach.value,10)) + eval(parseInt(totBuildng.value,10)) + eval(parseInt(furnitureSummary.value,10)) + eval(parseInt(intangibleAssetSummary.value,10)) + eval(parseInt(shipsSummary.value,10));

}
function validatepoint1513(){
	if(getAmt('scheduleDOA.building.rate5.depreciationDetail.proportionateAggDepreciation')>getAmt('scheduleDOA.building.rate5.depreciationDetail.netAggregateDepreciation')){
		j.setFieldError('scheduleDOA.building.rate5.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.building.rate5.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}
	if(getAmt('scheduleDOA.building.rate10.depreciationDetail.proportionateAggDepreciation')>getAmt('scheduleDOA.building.rate10.depreciationDetail.netAggregateDepreciation')){
		j.setFieldError('scheduleDOA.building.rate10.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.building.rate10.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}
	if(getAmt('scheduleDOA.building.rate40.depreciationDetail.proportionateAggDepreciation')>getAmt('scheduleDOA.building.rate40.depreciationDetail.netAggregateDepreciation')){
		j.setFieldError('scheduleDOA.building.rate40.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.building.rate40.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}
	if(getAmt('scheduleDOA.furnitureFittings.rate10.depreciationDetail.proportionateAggDepreciation')>getAmt('scheduleDOA.furnitureFittings.rate10.depreciationDetail.netAggregateDepreciation')){
		j.setFieldError('scheduleDOA.furnitureFittings.rate10.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.furnitureFittings.rate10.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}
	if(getAmt('scheduleDOA.intangibleAssets.rate25.depreciationDetail.proportionateAggDepreciation')>getAmt('scheduleDOA.intangibleAssets.rate25.depreciationDetail.netAggregateDepreciation')){
		j.setFieldError('scheduleDOA.intangibleAssets.rate25.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.intangibleAssets.rate25.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}
	if(getAmt('scheduleDOA.ships.rate20.depreciationDetail.proportionateAggDepreciation')>getAmt('scheduleDOA.ships.rate20.depreciationDetail.netAggregateDepreciation')){
		j.setFieldError('scheduleDOA.ships.rate20.depreciationDetail.proportionateAggDepreciation','Amount cannot be more than the amount entered in Net aggregate depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.ships.rate20.depreciationDetail.proportionateAggDepreciation')[0],
				'Amount cannot be more than the amount entered in Net aggregate depreciation',
				true);
	}
	if(getAmt('scheduleDOA.building.rate5.depreciationDetail.depDisAllowUs38_2')>getAmt('scheduleDOA.building.rate5.depreciationDetail.totalDepreciation')){
		j.setFieldError('scheduleDOA.building.rate5.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.building.rate5.depreciationDetail.depDisAllowUs38_2')[0],
				'Amount cannot be more than the amount entered in Total depreciation',
				true);
	}
	if(getAmt('scheduleDOA.building.rate10.depreciationDetail.depDisAllowUs38_2')>getAmt('scheduleDOA.building.rate10.depreciationDetail.totalDepreciation')){
		j.setFieldError('scheduleDOA.building.rate10.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.building.rate10.depreciationDetail.depDisAllowUs38_2')[0],
				'Amount cannot be more than the amount entered in Total depreciation',
				true);
	}
	if(getAmt('scheduleDOA.building.rate40.depreciationDetail.depDisAllowUs38_2')>getAmt('scheduleDOA.building.rate40.depreciationDetail.totalDepreciation')){
		j.setFieldError('scheduleDOA.building.rate40.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.building.rate40.depreciationDetail.depDisAllowUs38_2')[0],
				'Amount cannot be more than the amount entered in Total depreciation',
				true);
	}
	if(getAmt('scheduleDOA.furnitureFittings.rate10.depreciationDetail.depDisAllowUs38_2')>getAmt('scheduleDOA.furnitureFittings.rate10.depreciationDetail.totalDepreciation')){
		j.setFieldError('scheduleDOA.furnitureFittings.rate10.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.furnitureFittings.rate10.depreciationDetail.depDisAllowUs38_2')[0],
				'Amount cannot be more than the amount entered in Total depreciation',
				true);
	}
	if(getAmt('scheduleDOA.intangibleAssets.rate25.depreciationDetail.depDisAllowUs38_2')>getAmt('scheduleDOA.intangibleAssets.rate25.depreciationDetail.totalDepreciation')){
		j.setFieldError('scheduleDOA.intangibleAssets.rate25.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.intangibleAssets.rate25.depreciationDetail.depDisAllowUs38_2')[0],
				'Amount cannot be more than the amount entered in Total depreciation',
				true);
	}
	if(getAmt('scheduleDOA.ships.rate20.depreciationDetail.depDisAllowUs38_2')>getAmt('scheduleDOA.ships.rate20.depreciationDetail.totalDepreciation')){
		j.setFieldError('scheduleDOA.ships.rate20.depreciationDetail.depDisAllowUs38_2','Amount cannot be more than the amount entered in Total depreciation');
		addErrorXHTML( document.getElementsByName('scheduleDOA.ships.rate20.depreciationDetail.depDisAllowUs38_2')[0],
				'Amount cannot be more than the amount entered in Total depreciation',
				true);
	}

}
function calcSchDCGFor6(){

	var deprBlockTot15Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.deprBlockTot15Percent')[0]; deprBlockTot15Percent.value = coalesce(deprBlockTot15Percent.value);
	var deprBlockTot30Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.deprBlockTot30Percent')[0]; deprBlockTot30Percent.value = coalesce(deprBlockTot30Percent.value);
	var deprBlockTot40Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.deprBlockTot40Percent')[0]; deprBlockTot40Percent.value = coalesce(deprBlockTot40Percent.value);
	/*var deprBlockTot50Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.deprBlockTot50Percent')[0]; deprBlockTot50Percent.value = coalesce(deprBlockTot50Percent.value);
	var deprBlockTot60Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.deprBlockTot60Percent')[0]; deprBlockTot60Percent.value = coalesce(deprBlockTot60Percent.value);
	var deprBlockTot80Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.deprBlockTot80Percent')[0]; deprBlockTot80Percent.value = coalesce(deprBlockTot80Percent.value);
	var deprBlockTot100Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.deprBlockTot100Percent')[0]; deprBlockTot100Percent.value = coalesce(deprBlockTot100Percent.value);*/
	var totPlntMach = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.plantMachinerySummaryCG.totPlntMach')[0]; totPlntMach.value = coalesce(totPlntMach.value);
	var deprBlockTot5Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.buildingSummaryCG.deprBlockTot5Percent')[0]; deprBlockTot5Percent.value = coalesce(deprBlockTot5Percent.value);
	var deprBlockTot10Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.buildingSummaryCG.deprBlockTot10Percent')[0]; deprBlockTot10Percent.value = coalesce(deprBlockTot10Percent.value);
	var buildingDeprBlockTot40Percent = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.buildingSummaryCG.deprBlockTot40Percent')[0]; buildingDeprBlockTot40Percent.value = coalesce(buildingDeprBlockTot40Percent.value);
	var totBuildng = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.buildingSummaryCG.totBuildng')[0]; totBuildng.value = coalesce(totBuildng.value);
	var furnitureSummary = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.furnitureSummary')[0]; furnitureSummary.value = coalesce(furnitureSummary.value);
	var intangibleAssetSummary = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.intangibleAssetSummary')[0]; intangibleAssetSummary.value = coalesce(intangibleAssetSummary.value);
	var shipsSummary = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.shipsSummary')[0]; shipsSummary.value = coalesce(shipsSummary.value);
	var profBfrTaxPL = document.getElementsByName('scheduleDCG.summaryFromDeprSchCG.totalDepreciation')[0]; profBfrTaxPL.value = coalesce(profBfrTaxPL.value);


	deprBlockTot15Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate15.depreciationDetail.capGainUs50')[0].value) ;
	deprBlockTot30Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate30.depreciationDetail.capGainUs50')[0].value) ;
	deprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDPM.plantMachinery.rate40.depreciationDetail.capGainUs50')[0].value) ;
	totPlntMach.value = eval(parseInt(deprBlockTot15Percent.value,10)) + eval(parseInt(deprBlockTot30Percent.value,10)) + eval(parseInt(deprBlockTot40Percent.value,10));


	deprBlockTot5Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate5.depreciationDetail.capGainUs50')[0].value) ;
	deprBlockTot10Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate10.depreciationDetail.capGainUs50')[0].value) ;
	buildingDeprBlockTot40Percent.value = coalesce(document.getElementsByName('scheduleDOA.building.rate40.depreciationDetail.capGainUs50')[0].value) ;
	totBuildng.value = eval(parseInt(deprBlockTot5Percent.value,10)) + eval(parseInt(deprBlockTot10Percent.value,10)) + eval(parseInt(buildingDeprBlockTot40Percent.value,10));

	furnitureSummary.value = coalesce(document.getElementsByName('scheduleDOA.furnitureFittings.rate10.depreciationDetail.capGainUs50')[0].value) ;
	intangibleAssetSummary.value = coalesce(document.getElementsByName('scheduleDOA.intangibleAssets.rate25.depreciationDetail.capGainUs50')[0].value) ;
	shipsSummary.value = coalesce(document.getElementsByName('scheduleDOA.ships.rate20.depreciationDetail.capGainUs50')[0].value);

	profBfrTaxPL.value = eval(parseInt(totPlntMach.value,10)) + eval(parseInt(totBuildng.value,10)) + eval(parseInt(furnitureSummary.value,10)) + eval(parseInt(intangibleAssetSummary.value,10)) + eval(parseInt(shipsSummary.value,10));
	}

function calculateCYLA(cgosIncome){
	try{
		//prefill the CYLA-schedule
		prefillCYLA();

		//doing successive setoffs
		//Income of current year (Fill this column only if income is zero or positive)

		setOffOthSrcLossCYLA(cgosIncome);


		// Current year's Income remaining after set off
		document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead') -
			coalescePath('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');

		}

		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');


		}

		// Speculative Income
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');
		}

		// Specified Business Income
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');
		}


		//Short-term capital gain taxable @ 15%
		document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');
		}
		//Short-term capital gain taxable @ 30%
		document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');
		}

		//Short-term capital gain taxable at applicable rates
		document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');
		}
		// 	Long term capital gain taxable @ 10%
		document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');

		}
		// 	Long term capital gain taxable @ 20%
		document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff')[0].value =
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');

		}

		// 	Other sources
		document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0].value=
			coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff');
		if(coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');
		}
		// Profit from owning and maintaining race horses
		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0].value=
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')-
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff',
				'This figure cannot be negative. Please rearrange your figures');
		}

		//total loss setoff
		document.getElementsByName('scheduleCYLA.totalLossSetOff.totHPlossCurYrSetoff')[0].value=
			coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')+
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff');

		// Business
		document.getElementsByName('scheduleCYLA.totalLossSetOff.totBusLossSetoff')[0].value=
			coalescePath('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')+
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')+
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')+
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')+
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')+
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')+
			coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')+
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff');

		document.getElementsByName('scheduleCYLA.totalLossSetOff.totOthSrcLossNoRaceHorseSetoff')[0].value=
			coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')+
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff');

		//Loss remaining after set-off
		document.getElementsByName('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')[0].value=
			coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-coalescePath('scheduleCYLA.totalLossSetOff.totHPlossCurYrSetoff');
		if(coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff',
				'This figure cannot be negative. Please rearrange your figures');
		}

		document.getElementsByName('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')[0].value=
			coalescePath('scheduleCYLA.totalCurYr.totBusLoss')-coalescePath('scheduleCYLA.totalLossSetOff.totBusLossSetoff');
		if(coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff',
				'This figure cannot be negative. Please rearrange your figures');

		}

		document.getElementsByName('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff')[0].value=
			coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-coalescePath('scheduleCYLA.totalLossSetOff.totOthSrcLossNoRaceHorseSetoff');
		if(coalescePath('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff')<0){
			addErrorXHTML(document.getElementsByName('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff')[0],
				'This figure cannot be negative. Please rearrange your figures',true);
			j.setFieldError('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff',
				'This figure cannot be negative. Please rearrange your figures');

		}

		cgosIncome.cgInc.stcg.prctgAr = coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff');
		cgosIncome.cgInc.stcg.prctg30 = coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff');
		cgosIncome.cgInc.ltcg.prctg20.sec112 = coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff');
		cgosIncome.bpNetInc = coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff');

		calcBFLA(cgosIncome);

	}catch(e){
		alert('error in calcCYLA=' + e.stack);
	}
}

function prefillCYLA(){
	try{

		//Field 3c of Schedule HP) , only if 3c is positive
		document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('scheduleHP.totalIncomeChargeableUnHP'));


		//prefilling column :: Income of current year (Fill this column only if income is zero or positive)- Business (excluding speculation income and income from specified business)
		// A37 of Sch BP,only if A37 is positive
		coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead');
		coalescePath('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrUnderThatHead');
		coalescePath('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrUnderThatHead');

		// Business income
		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7C'));

		// Speculative Income
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('itr5ScheduleBP.busSetoffCurYr.speculativeInc.incOfCurYrAfterSetOff'));

		// Specified Business Income
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('itr5ScheduleBP.busSetoffCurYr.specifiedInc.incOfCurYrAfterSetOff'));

		//prefilling column :: Short-term capital gain taxable @ 15%
		//Field (7ii of item E of schedule CG)
		document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')[0].value =
			coalescePath('scheduleCGPost45.currYrLosses.inStcg15Per.CurrYrLosSetOff');

		//prefilling column :: Short-term capital gain taxable @ 30%
		//Field (7iii of item E of schedule CG)
		document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')[0].value =
			coalescePath('scheduleCGPost45.currYrLosses.inStcg30Per.currYrLosSetOff');

		//prefilling column :: Short-term capital gain taxable at applicable rates
		//Field (7iv of item E of schedule CG)
		document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')[0].value =
			coalescePath('scheduleCGPost45.currYrLosses.inStcgAppRate.currYrLosSetOff');

		//prefilling column :: Long term capital gain taxable @ 10%
		//Field (7v of item E of schedule CG)
		document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')[0].value =
			coalescePath('scheduleCGPost45.currYrLosses.inLtcg10Per.currYrLosSetOff');

		//prefilling column :: Long term capital gain taxable @ 20%
		//Field (7vi of item E of schedule CG)
		document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')[0].value =
			coalescePath('scheduleCGPost45.currYrLosses.inLtcg20Per.CurrYrLosSetOff');

		//prefilling column :: Other sources income
		//Field (1i of schedule OS)
		document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('scheduleOS.balanceNoRaceHorse'));

		//prefilling column :: Profit from owning and maintaining race horses
		//Field (3c of schedule OS)
		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse'));

		// populating losses in the respective heads
		coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr');
		if(!isPostv('scheduleHP.totalIncomeChargeableUnHP')){
			document.getElementsByName('scheduleCYLA.totalCurYr.totHPlossCurYr')[0].value =
				Math.abs(coalescePath('scheduleHP.totalIncomeChargeableUnHP'));
		}else{
			document.getElementsByName('scheduleCYLA.totalCurYr.totHPlossCurYr')[0].value = 0;
		}

		coalescePath('scheduleCYLA.totalCurYr.totBusLoss');
		document.getElementsByName('scheduleCYLA.totalCurYr.totBusLoss')[0].value =
			coalescePath('itr5ScheduleBP.busSetoffCurYr.lossRemainSetOffOnBus');

		coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse');
		if(!isPostv('scheduleOS.balanceNoRaceHorse')){
			document.getElementsByName('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')[0].value =
				Math.abs(coalescePath('scheduleOS.balanceNoRaceHorse')) ;
		}else{
			document.getElementsByName('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')[0].value = 0;
		}


	}catch(e){
		alert('error in prefillCYLA()=' + e.stack);
	}
}

function setOffOthSrcLossCYLA(cgosIncome){
	try{
		var stcgPercent15Sec111a = zeroOrMore(cgosIncome.cgInc.stcg.prctg15.sec111a);
		var stcgPercent15Sec115ad_1_b_ii = zeroOrMore(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii);
		var ltcgPrctg10SecProviso = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.secProviso);
		var ltcgPrctg10Sec112c2 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2);
		var ltcgPrctg10Sec115AC1 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1);
		var ltcgPrctg10Sec115AD3 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3);
		var ltcgPrctg10Sec115AB1B = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B);

		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;


		if( !checkIfChanged('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff') ){
			document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		}else{
			checkFirstLessThanMinOthTwo('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

		}

		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;

		if(!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
			document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		}else{
			checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
				'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
				coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if( !checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')){
			document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0 ;
		}else{
			checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
				'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
				coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if( !checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
			document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0 ;
		}else{
			checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
				'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
				coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if( !checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
			document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0 ;
		}else{
			checkFirstLessThanMinOthTwo('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
				'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
				coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if( !checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
			document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0 ;
		}else{
			checkFirstLessThanMinOthTwo('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
				'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
				coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
				coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		/*
		Order of adjustment :-
			1) Profit from owning and maintaining race horses
			2) HP Income
			3) Business Income
			4) Speculative Income
			5) specified Income
			6) Short-term capital gain taxable @ 30%
			7) Short-term capital gain taxable at applicable rates
			8) Long term capital gain taxable @ 20%
			9) Short-term capital gain taxable @ 15%
			10) Long term capital gain taxable @ 10% (1. cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2,
													2. cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B,
													3. cgosIncome.cgInc.ltcg.prctg10.sec115AC_1,
													4. cgosIncome.cgInc.ltcg.prctg10.sec115AD_3,
													5. cgosIncome.cgInc.ltcg.prctg10.secProviso)
		*/

		var setOffRem = coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead');

		// 1. Race Horse
		if(parseInt(setOffRem,10)>=0){
			document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead');

		}else{
			document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
				coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse');
			setOffRem =0 ;
		}


		//2.House property
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead');
		if(parseInt(setOffRem,10)>=0){
			if( !checkIfChanged('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead');
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		}else{

			if( !checkIfChanged('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem =0 ;
		}

		//3. Business Income
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead');
		if(parseInt(setOffRem,10)>=0){
			if( !checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead');
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		}else{

			if( !checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem =0 ;
		}

		//4. Speculative Income
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrUnderThatHead');
		if(parseInt(setOffRem,10)>=0){
				document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrUnderThatHead');
		} else{

			document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			setOffRem =0 ;
		}

		//5. specified Income
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrUnderThatHead');
		if(parseInt(setOffRem,10)>=0){
				document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrUnderThatHead');
		} else{

			document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			setOffRem =0 ;
		}

		//6. Short-term capital gain taxable @ 30%
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead');
		if(parseInt(setOffRem,10)>=0){
			if( !checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead');
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		}else{

			if( !checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem =0 ;
		}

		//7.Short-term capital gain taxable at applicable rates
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead');
		if(parseInt(setOffRem,10)>=0){
			if( !checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead');
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		}else{

			if( !checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem =0 ;
		}

		// 8)Long term capital gain taxable @ 20%
		prevSetOffRem = setOffRem;
		var ltcgSetOffRem = coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead');
		if(ltcgSetOffRem>=0 && setOffRem>=0){
			if(ltcgSetOffRem>=setOffRem){
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcgSetOffRem,10);
				if(setOffRem>=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(ltcgSetOffRem,10);

					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = tempAk;
						setOffRem=0;

					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			}else{
				var prevLtcgSetOffRem= ltcgSetOffRem;

				if(ltcgSetOffRem >=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(ltcgSetOffRem,10);
						ltcgSetOffRem=0;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevLtcgSetOffRem;
						ltcgSetOffRem =0 ;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			}
		}

		//9.Short-term capital gain taxable @ 15%
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead');
		if(parseInt(setOffRem,10)>=0){
			if( !checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value =
					coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead');
				stcgPercent15Sec111a = 0;
				stcgPercent15Sec115ad_1_b_ii = 0;
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		}else{

			if( !checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;

				// sec break up
				if(parseInt(prevSetOffRem, 10) >= 0 && parseInt(stcgPercent15Sec115ad_1_b_ii, 10) > parseInt(prevSetOffRem, 10)){
					stcgPercent15Sec115ad_1_b_ii = parseInt(stcgPercent15Sec115ad_1_b_ii, 10) -
															parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				}else{
					prevSetOffRem = parseInt(prevSetOffRem, 10) -
								parseInt(stcgPercent15Sec115ad_1_b_ii, 10) ;
					stcgPercent15Sec115ad_1_b_ii = 0;
				}

				if(parseInt(prevSetOffRem, 10) >= 0 && parseInt(stcgPercent15Sec111a, 10) > parseInt(prevSetOffRem, 10)){
					stcgPercent15Sec111a = parseInt(stcgPercent15Sec111a, 10) -
															parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				}else{
					prevSetOffRem = parseInt(prevSetOffRem, 10) -
								parseInt(stcgPercent15Sec111a, 10) ;
					stcgPercent15Sec111a = 0;
				}


			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')-
					coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')-
					coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem =0 ;
		}

		// 10)Long term capital gain taxable @ 10%
		prevSetOffRem = setOffRem;
		var ltcgSetOffRem = coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead');
		if(ltcgSetOffRem>=0 && setOffRem>=0){
			if(ltcgSetOffRem>=setOffRem){
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcgSetOffRem,10);

				if(setOffRem>=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(ltcgSetOffRem,10);

						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115AB1B = 0;
						ltcgPrctg10SecProviso = 0;

					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = tempAk;
						setOffRem=0;
						//Section break up

							if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec112c2, 10) > parseInt(tempAk, 10)){
								ltcgPrctg10Sec112c2 = parseInt(ltcgPrctg10Sec112c2, 10) -
																		parseInt(tempAk, 10);
								tempAk = 0;
							}else{
								tempAk = parseInt(tempAk, 10) -
											parseInt(ltcgPrctg10Sec112c2, 10) ;
								ltcgPrctg10Sec112c2 = 0;
							}

							if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AB1B, 10) > parseInt(tempAk, 10)){
								ltcgPrctg10Sec115AB1B = parseInt(ltcgPrctg10Sec115AB1B, 10) -
																		parseInt(tempAk, 10);
								tempAk = 0;
							}else{
								tempAk = parseInt(tempAk, 10) -
											parseInt(ltcgPrctg10Sec115AB1B, 10) ;
								ltcgPrctg10Sec115AB1B = 0;
							}

							if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AC1, 10) > parseInt(tempAk, 10)){
								ltcgPrctg10Sec115AC1 = parseInt(ltcgPrctg10Sec115AC1, 10) -
																		parseInt(tempAk, 10);
								tempAk = 0;
							}else{
								tempAk = parseInt(tempAk, 10) -
											parseInt(ltcgPrctg10Sec115AC1, 10) ;
								ltcgPrctg10Sec115AC1 = 0;
							}


							if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AD3, 10) > parseInt(tempAk, 10)){
								ltcgPrctg10Sec115AD3 = parseInt(ltcgPrctg10Sec115AD3, 10) -
																		parseInt(tempAk, 10);
								tempAk = 0;
							}else{
								tempAk = parseInt(tempAk, 10) -
											parseInt(ltcgPrctg10Sec115AD3, 10) ;
								ltcgPrctg10Sec115AD3 = 0;
							}

							if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10SecProviso, 10) > parseInt(tempAk, 10)){
								ltcgPrctg10SecProviso = parseInt(ltcgPrctg10SecProviso, 10) - parseInt(tempAk, 10);
								tempAk = 0;
							} else{
								tempAk = parseInt(tempAk, 10) - parseInt(ltcgPrctg10SecProviso, 10) ;
								ltcgPrctg10SecProviso = 0;
							}
					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			}else{
				var prevLtcgSetOffRem= ltcgSetOffRem;

				if(ltcgSetOffRem >=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(ltcgSetOffRem,10);
						ltcgSetOffRem=0;
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115AB1B = 0;
						ltcgPrctg10SecProviso = 0;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			}
		}
		cgosIncome.cgInc.stcg.prctg15.sec111a = stcgPercent15Sec111a;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = stcgPercent15Sec115ad_1_b_ii;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = ltcgPrctg10SecProviso;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = ltcgPrctg10Sec112c2;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = ltcgPrctg10Sec115AC1;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = ltcgPrctg10Sec115AD3;
		cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = ltcgPrctg10Sec115AB1B;

		setOffHPLossCYLA(cgosIncome);
	}catch(e){
		alert('error in setOffOthSrcLossCYLA()=' + e.stack);
	}
}



function setOffHPLossCYLA(cgosIncome){
	try{
		var stcgPercent15Sec111a = cgosIncome.cgInc.stcg.prctg15.sec111a;
		var stcgPercent15Sec115ad_1_b_ii = cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
		var ltcgPrctg10SecProviso = cgosIncome.cgInc.ltcg.prctg10.secProviso;
		var ltcgPrctg10Sec112c2 = cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2;
		var ltcgPrctg10Sec115AC1 = cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
		var ltcgPrctg10Sec115AD3 = cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
		var ltcgPrctg10Sec115AB1B = cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B;


		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].value = 0;

		if( !checkIfChanged('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')){
			document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		}else{
			checkFirstLessThanMinOthTwo('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff',
				'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totHPlossCurYr',
				coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));
		}

		if(!checkIfChanged('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')){
			document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		}else{
			checkHPeditableValidity('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff',
				'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'
				,'scheduleCYLA.totalCurYr.totHPlossCurYr',
				coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
				coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));
		}

		if(!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')){
			document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		}else{
			checkHPeditableValidity('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff',
				'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'
				,'scheduleCYLA.totalCurYr.totHPlossCurYr',
				coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
				coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff'));
		}

		if(!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')){
			document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		}else{
			checkHPeditableValidity('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff',
				'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'
				,'scheduleCYLA.totalCurYr.totHPlossCurYr',
				coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
				coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));
		}

		if(!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')){
			document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		}else{
			checkHPeditableValidity('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff',
				'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'
				,'scheduleCYLA.totalCurYr.totHPlossCurYr',
				coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
				coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));
		}

		if(!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')){
			document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		}else{
			checkHPeditableValidity('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff',
				'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'
				,'scheduleCYLA.totalCurYr.totHPlossCurYr',
				coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
				coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
		}

		if(!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')){
			document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		}else{
			checkHPeditableValidity('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff',
				'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'
				,'scheduleCYLA.totalCurYr.totHPlossCurYr',
				coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
				coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')-
				coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff'));
		}

				/*
		Order of adjustment :-
			1) Business Income
			2) Speculative Income
			3) Specified Income
			4) Other sources
			5) Profit from owning and maintaining race horses
			6) Short-term capital gain taxable @ 30%
			7) Short-term capital gain taxable at applicable rates
			8) Long term capital gain taxable @ 20%
			9) Short-term capital gain taxable @ 15%
			10) Long term capital gain taxable @ 10% (1. cgosIncome.cgInc.ltcg.prctg10.secProviso,
													2. cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2,
													3. cgosIncome.cgInc.ltcg.prctg10.sec115AC_1,
													4. cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1,
													5. cgosIncome.cgInc.ltcg.prctg10.sec115AD_3,
													6. cgosIncome.cgInc.ltcg.prctg10.sec115E_b)
		*/


		// 1.  Business Income
		var busIncSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead')-
					coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff'));
		var prevSetOffRemStart = coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr');
		var hpLossRem = 200000;
		var prevSetOffRem =  Math.min(parseInt(prevSetOffRemStart,10),parseInt(hpLossRem,10));
		var setOffRem = prevSetOffRem - busIncSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
				if( !checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')){
					document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value =	busIncSetOffRem;
				}else{
					checkFirstLessThanMinOthTwo('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));

					setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff');
				}
			}
		}else{
			if( !checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')){
				document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));
			}
			setOffRem =0 ;
		}

		// 2.  Speculative Income
		var specltvIncSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrUnderThatHead')-
					coalescePath('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff'));
		prevSetOffRem = setOffRem;
		setOffRem = prevSetOffRem - specltvIncSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
					document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].value =	specltvIncSetOffRem;
			}
		}else{
				document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			setOffRem =0 ;
		}

		// 3.  Specified Income
		var specfidIncSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrUnderThatHead')-
					coalescePath('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff'));
		prevSetOffRem = setOffRem;
		setOffRem = prevSetOffRem - specfidIncSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
					document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].value =	specfidIncSetOffRem;
			}
		}else{
				document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			setOffRem =0 ;
		}

		//4) Other sources (excluding profit from owning race horses)

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead');

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
				if( (!checkIfChanged('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'))){
					document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value =
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead');
				}else{
					checkFirstLessThanMinOthTwo('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));

					setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff');
				}
			}
		}else{
			if( !checkIfChanged('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')){
				document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			}else{
				checkFirstLessThanMinOthTwo('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));
			}
			setOffRem =0 ;
		}

		//5) Profit from owning and maintaining race horse
		var raceHrsSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - raceHrsSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
				if(!checkIfChanged('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')){
					document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = raceHrsSetOffRem;
				}else{
					checkHPeditableValidity('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff');
				}
			}
		}else{
			if( !checkIfChanged('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')){
				document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			}else{
				checkHPeditableValidity('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem =0 ;
		}

		// 6) Short-term capital gain taxable @ 30%

		var stcg30PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg30PercntSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
				if(!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')){
					document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = stcg30PercntSetOffRem;
				}else{
					checkHPeditableValidity('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff');
				}
			}
		}else{
			if( !checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			}else{
				checkHPeditableValidity('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem =0 ;
		}

		// 7) Short-term capital gain taxable at applicable rates

		var stcgAppRateSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcgAppRateSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
				if(!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')){
					document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = stcgAppRateSetOffRem;
				}else{
					checkHPeditableValidity('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff');
				}
			}
		}else{
			if( !checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			}else{
				checkHPeditableValidity('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem =0 ;
		}

		// 8) Long term capital gain taxable @ 20%
		prevSetOffRem = setOffRem;
		var ltcg20PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

		if(ltcg20PercntSetOffRem>=0 && setOffRem>=0){
			if(ltcg20PercntSetOffRem>=setOffRem){
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg20PercntSetOffRem,10);

				if(setOffRem>=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(ltcg20PercntSetOffRem,10);

					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = tempAk;
						setOffRem=0;

					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				}
			}else{
				var prevLtcgSetOffRem= ltcg20PercntSetOffRem;

				if(ltcg20PercntSetOffRem >=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(ltcg20PercntSetOffRem,10);
						ltcg20PercntSetOffRem = 0;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = prevLtcgSetOffRem;
						ltcg20PercntSetOffRem =0 ;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				}
			}
		}

		// 9) Short-term capital gain taxable @ 15%
		var stcg15PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg15PercntSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			}else{
				if(!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')){
					document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = stcg15PercntSetOffRem;
					stcg15PercntSetOffRem = 0;
					stcgPercent15Sec111a = 0;
					stcgPercent15Sec115ad_1_b_ii = 0;

				}else{
					checkHPeditableValidity('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem,10) - coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff');
				}
			}
		}else{
			if( !checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')){
				document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;

				// sec break up
				if(parseInt(prevSetOffRem, 10) >= 0 && parseInt(stcgPercent15Sec115ad_1_b_ii, 10) > parseInt(prevSetOffRem, 10)){
					stcgPercent15Sec115ad_1_b_ii = parseInt(stcgPercent15Sec115ad_1_b_ii, 10) -
															parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				}else{
					prevSetOffRem = parseInt(prevSetOffRem, 10) -
								parseInt(stcgPercent15Sec115ad_1_b_ii, 10) ;
					stcgPercent15Sec115ad_1_b_ii = 0;
				}

				if(parseInt(prevSetOffRem, 10) >= 0 && parseInt(stcgPercent15Sec111a, 10) > parseInt(prevSetOffRem, 10)){
					stcgPercent15Sec111a = parseInt(stcgPercent15Sec111a, 10) -
															parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				}else{
					prevSetOffRem = parseInt(prevSetOffRem, 10) -
								parseInt(stcgPercent15Sec111a, 10) ;
					stcgPercent15Sec111a = 0;
				}

			}else{
				checkHPeditableValidity('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead','scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'
						,'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')-
						coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')-
						coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem =0 ;
		}

		// 10) Long term capital gain taxable @ 10%
		prevSetOffRem = setOffRem;
		var ltcg10PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

		if(ltcg10PercntSetOffRem>=0 && setOffRem>=0){
			if(ltcg10PercntSetOffRem>=setOffRem){
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg10PercntSetOffRem,10);

				if(setOffRem>=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(ltcg10PercntSetOffRem,10);
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115AB1B = 0;
						ltcgPrctg10SecProviso = 0;

					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = tempAk;
						setOffRem=0;

						//Section break up

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec112c2, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec112c2 = parseInt(ltcgPrctg10Sec112c2, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec112c2, 10) ;
							ltcgPrctg10Sec112c2 = 0;
						}

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AB1B, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec115AB1B = parseInt(ltcgPrctg10Sec115AB1B, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec115AB1B, 10) ;
							ltcgPrctg10Sec115AB1B = 0;
						}

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AC1, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec115AC1 = parseInt(ltcgPrctg10Sec115AC1, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec115AC1, 10) ;
							ltcgPrctg10Sec115AC1 = 0;
						}


						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AD3, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec115AD3 = parseInt(ltcgPrctg10Sec115AD3, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec115AD3, 10) ;
							ltcgPrctg10Sec115AD3 = 0;
						}

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10SecProviso, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10SecProviso = parseInt(ltcgPrctg10SecProviso, 10) - parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) - parseInt(ltcgPrctg10SecProviso, 10) ;
							ltcgPrctg10SecProviso = 0;
						}
					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
				}
			}else{
				var prevLtcgSetOffRem= ltcg10PercntSetOffRem;

				if(ltcg10PercntSetOffRem >=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(ltcg10PercntSetOffRem,10);
						ltcg10PercntSetOffRem=0;
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115AB1B = 0;
						ltcgPrctg10SecProviso = 0;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
				}
			}
		}

		cgosIncome.cgInc.stcg.prctg15.sec111a = stcgPercent15Sec111a;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = stcgPercent15Sec115ad_1_b_ii;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = ltcgPrctg10SecProviso;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = ltcgPrctg10Sec112c2;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = ltcgPrctg10Sec115AC1;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = ltcgPrctg10Sec115AD3;
		cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = ltcgPrctg10Sec115AB1B;
		setOffBussLossCYLA(cgosIncome);
	}catch(e){
		alert('error in setOffHPLossCYLA = ' + e.stack);
	}
}


function setOffBussLossCYLA(cgosIncome){
	try{
		var stcgPercent15Sec111a = cgosIncome.cgInc.stcg.prctg15.sec111a;
		var stcgPercent15Sec115ad_1_b_ii = cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
		var ltcgPrctg10SecProviso = cgosIncome.cgInc.ltcg.prctg10.secProviso;
		var ltcgPrctg10Sec112c2 = cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2;
		var ltcgPrctg10Sec115AC1 = cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
		var ltcgPrctg10Sec115AD3 = cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
		var ltcgPrctg10Sec115AB1B = cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B;

		document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value = 0;
		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = 0;


		/*
		Order of adjustment :-
			1) HP Income
			2) Other sources
			3) Profit from owning and maintaining race horses
			4) Short-term capital gain taxable @ 30%
			5) Short-term capital gain taxable at applicable rates
			6) Long term capital gain taxable @ 20% (1.cgosIncome.cgInc.ltcg.prctg20.sec112, 2.cgosIncome.cgInc.ltcg.prctg20.sec11EA)
			7) Short-term capital gain taxable @ 15%
			8) Long term capital gain taxable @ 10% (1. cgosIncome.cgInc.ltcg.prctg10.secProviso,
													2. cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2,
													3. cgosIncome.cgInc.ltcg.prctg10.sec115AC_1,
													4. cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1,
													5. cgosIncome.cgInc.ltcg.prctg10.sec115AD_3,
													6. cgosIncome.cgInc.ltcg.prctg10.sec115E_b)
		*/

		// 1. HP Income
		var hpSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead')-
					coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));
		var prevSetOffRem = coalescePath('scheduleCYLA.totalCurYr.totBusLoss');
		var setOffRem = prevSetOffRem - hpSetOffRem;

		if(setOffRem>=0){
			if(coalescePath('scheduleCYLA.totalCurYr.totBusLoss')==0){
				document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value = 0;
			}else{
					document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value = hpSetOffRem;
			}
		}else{
				document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value =
					coalescePath('scheduleCYLA.totalCurYr.totBusLoss');
			setOffRem =0 ;
		}

		// 2. Other sources
		var osIncSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead')-
					coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));
		prevSetOffRem = setOffRem;
		setOffRem = prevSetOffRem - osIncSetOffRem;

		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value = 0;
			}else{
					document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value =	osIncSetOffRem;
			}
		}else{
				document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
			setOffRem =0 ;
		}

		//3) Profit from owning and maintaining race horse
		var raceHrsSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')-
			coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - raceHrsSetOffRem;
		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = 0;
			}else{
					document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = raceHrsSetOffRem;
			}
		}else{
				document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
			setOffRem =0 ;
		}

		// 4) Short-term capital gain taxable @ 30%

		var stcg30PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
			coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg30PercntSetOffRem;
		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = 0;
			}else{
				document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = stcg30PercntSetOffRem;
			}
		}else{
				document.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
				setOffRem =0 ;
		}

		// 5) Short-term capital gain taxable at applicable rates

		var stcgAppRateSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')-
			coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcgAppRateSetOffRem;
		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = 0;
			}else{
				document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = stcgAppRateSetOffRem;
			}
		}else{
				document.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
				setOffRem =0 ;
		}

		// 6) Long term capital gain taxable @ 20%
		prevSetOffRem = setOffRem;
		var ltcg20PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
			coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
		if(ltcg20PercntSetOffRem>=0 && setOffRem>=0){
			if(ltcg20PercntSetOffRem>=setOffRem){
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg20PercntSetOffRem,10);

				if(setOffRem>=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = parseInt(ltcg20PercntSetOffRem,10);

					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = tempAk;
						setOffRem=0;

					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				}
			}else{
				var prevLtcgSetOffRem= ltcg20PercntSetOffRem;

				if(ltcg20PercntSetOffRem >=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = parseInt(ltcg20PercntSetOffRem,10);
						ltcg20PercntSetOffRem = 0;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = prevLtcgSetOffRem;
						ltcg20PercntSetOffRem =0 ;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				}
			}
		}

		// 7) Short-term capital gain taxable @ 15%
		var stcg15PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
			coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg15PercntSetOffRem;
		if(setOffRem>=0){
			if(prevSetOffRem==0){
				document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = 0;
			}else{
					document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = stcg15PercntSetOffRem;
					stcg15PercntSetOffRem = 0;
					stcgPercent15Sec111a = 0;
					stcgPercent15Sec115ad_1_b_ii = 0;

			}
		}else{
				document.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = prevSetOffRem;

				// sec break up
				if(parseInt(prevSetOffRem, 10) >= 0 && parseInt(stcgPercent15Sec115ad_1_b_ii, 10) > parseInt(prevSetOffRem, 10)){
					stcgPercent15Sec115ad_1_b_ii = parseInt(stcgPercent15Sec115ad_1_b_ii, 10) -
															parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				}else{
					prevSetOffRem = parseInt(prevSetOffRem, 10) -
								parseInt(stcgPercent15Sec115ad_1_b_ii, 10) ;
					stcgPercent15Sec115ad_1_b_ii = 0;
				}

				if(parseInt(prevSetOffRem, 10) >= 0 && parseInt(stcgPercent15Sec111a, 10) > parseInt(prevSetOffRem, 10)){
					stcgPercent15Sec111a = parseInt(stcgPercent15Sec111a, 10) -
															parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				}else{
					prevSetOffRem = parseInt(prevSetOffRem, 10) -
								parseInt(stcgPercent15Sec111a, 10) ;
					stcgPercent15Sec111a = 0;
				}

			setOffRem =0 ;
		}

		// 8) Long term capital gain taxable @ 10%
		prevSetOffRem = setOffRem;
		var ltcg10PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')-
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')-
			coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
		if(ltcg10PercntSetOffRem>=0 && setOffRem>=0){
			if(ltcg10PercntSetOffRem>=setOffRem){
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg10PercntSetOffRem,10);

				if(setOffRem>=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = parseInt(ltcg10PercntSetOffRem,10);
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115AB1B = 0;
						ltcgPrctg10SecProviso = 0;

					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff'));
				}else{
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = tempAk;
						setOffRem=0;

						//Section break up

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec112c2, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec112c2 = parseInt(ltcgPrctg10Sec112c2, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec112c2, 10) ;
							ltcgPrctg10Sec112c2 = 0;
						}

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AB1B, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec115AB1B = parseInt(ltcgPrctg10Sec115AB1B, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec115AB1B, 10) ;
							ltcgPrctg10Sec115AB1B = 0;
						}

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AC1, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec115AC1 = parseInt(ltcgPrctg10Sec115AC1, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec115AC1, 10) ;
							ltcgPrctg10Sec115AC1 = 0;
						}


						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10Sec115AD3, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10Sec115AD3 = parseInt(ltcgPrctg10Sec115AD3, 10) -
																	parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) -
										parseInt(ltcgPrctg10Sec115AD3, 10) ;
							ltcgPrctg10Sec115AD3 = 0;
						}

						if(parseInt(tempAk, 10) >= 0 && parseInt(ltcgPrctg10SecProviso, 10) > parseInt(tempAk, 10)){
							ltcgPrctg10SecProviso = parseInt(ltcgPrctg10SecProviso, 10) - parseInt(tempAk, 10);
							tempAk = 0;
						}else{
							tempAk = parseInt(tempAk, 10) - parseInt(ltcgPrctg10SecProviso, 10) ;
							ltcgPrctg10SecProviso = 0;
						}
					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff'));
				}
			}else{
				var prevLtcgSetOffRem= ltcg10PercntSetOffRem;

				if(ltcg10PercntSetOffRem >=0){
						document.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = parseInt(ltcg10PercntSetOffRem,10);
						ltcg10PercntSetOffRem=0;
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115AB1B = 0;
						ltcgPrctg10SecProviso = 0;
					setOffRem = zeroOrMore(setOffRem - coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff'));
				}
			}
		}

		cgosIncome.cgInc.stcg.prctg15.sec111a = stcgPercent15Sec111a;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = stcgPercent15Sec115ad_1_b_ii;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = ltcgPrctg10SecProviso;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = ltcgPrctg10Sec112c2;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = ltcgPrctg10Sec115AC1;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = ltcgPrctg10Sec115AD3;
		cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = ltcgPrctg10Sec115AB1B;

	}catch(e){
		alert('error in  setOffBussLossCYLA() = ' + e.stack);
	}
}

function calcBFLA(cgosIncome){
	try{
		prefillBFLA();
		calcCFL_sumAll();
		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF',
							'scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA',
							'scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF',
							'scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA',
							'scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecBusCF',
							'scheduleBFLA.speculativeInc.incBFLA.incOfCurYrUndHeadFromCYLA',
							'scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		var specltvIncSetOff = document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value ;

		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecifiedBusCF',
							'scheduleBFLA.specifiedInc.incBFLA.incOfCurYrUndHeadFromCYLA',
							'scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		var specfdIncSetOff = document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value ;


		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF',
						'scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA',
						'scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF',
						'scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA',
						'scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF',
						'scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA',
						'scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF',
						'scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA',
						'scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF',
						'scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA',
						'scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF',
							'scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA',
							'scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		// setting off loss from business
		var setOffBusLoss = coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF')-
		coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff');

				//b
		var setOffNotDoneInSpecInc = coalescePath('scheduleBFLA.speculativeInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		var prevSetOffBusLoss = setOffBusLoss;
		setOffBusLoss = setOffBusLoss - setOffNotDoneInSpecInc;
		if(setOffBusLoss>=0){
			document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
				coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff') + setOffNotDoneInSpecInc;
		}else{
			document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
				coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff') + prevSetOffBusLoss;
			setOffBusLoss = 0;
		}

				//c
		var setOffNotDoneInSpecfdInc = coalescePath('scheduleBFLA.specifiedInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		prevSetOffBusLoss = setOffBusLoss;
		setOffBusLoss = setOffBusLoss - setOffNotDoneInSpecfdInc;
		if(setOffBusLoss>=0){
			document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
				coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff') + setOffNotDoneInSpecfdInc;

		}else{
			document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
				coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff') + prevSetOffBusLoss;
			setOffBusLoss = 0;
		}


		//setting off STCG and LTCG
		var stcgCFL = coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF');  var tempstcgCFL = stcgCFL;
		var ltcgCFL = coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF');	 var tempLtcgCFL = ltcgCFL;

		var stcgBreakUp1  = cgosIncome.cgInc.stcg.prctg30;
		var stcgBreakUp2  = cgosIncome.cgInc.stcg.prctgAr;
		var stcgBreakUp3  = cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
		var stcgBreakUp4  = cgosIncome.cgInc.stcg.prctg15.sec111a;

		var ltcgBreakUp1 = cgosIncome.cgInc.ltcg.prctg20.sec112;


		var ltcgBreakUp2 = cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2;
		var ltcgBreakUp3 = cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B;
		var ltcgBreakUp4 = cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
		var ltcgBreakUp5 = cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
		var ltcgBreakUp6 = cgosIncome.cgInc.ltcg.prctg10.secProviso;


		var tempstcgBreakUp1  = parseInt(stcgBreakUp1,10);
		var tempstcgBreakUp2  = parseInt(stcgBreakUp2,10);
		var tempstcgBreakUp3  = parseInt(stcgBreakUp3,10);
		var tempstcgBreakUp4  = parseInt(stcgBreakUp4,10);

		var templtcgBreakUp1 = parseInt(ltcgBreakUp1,10);
		var templtcgBreakUp2 = parseInt(ltcgBreakUp2,10);
		var templtcgBreakUp3 = parseInt(ltcgBreakUp3,10);
		var templtcgBreakUp4 = parseInt(ltcgBreakUp4,10);
		var templtcgBreakUp5 = parseInt(ltcgBreakUp5,10);
		var templtcgBreakUp6 = parseInt(ltcgBreakUp6,10);

		if(tempLtcgCFL>templtcgBreakUp1){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp1;
			templtcgBreakUp1 =0;
		}else{
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp2){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp2;
			templtcgBreakUp2 =0;
		}else{
			templtcgBreakUp2= zeroOrMore(templtcgBreakUp2 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp3){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp3;
			templtcgBreakUp3 =0;
		}else{
			templtcgBreakUp3 = zeroOrMore(templtcgBreakUp3 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp4){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp4;
			templtcgBreakUp4 =0;
		}else{
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp5){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp5;
			templtcgBreakUp5 =0;
		}else{
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp6){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp6;
			templtcgBreakUp6 =0;
		}else{
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - tempLtcgCFL);
			tempLtcgCFL=0;
		}



		//setting the "adjustment of above losses in BFLA" - LTCG value in CFL
		document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.ltcgLossCF')[0].value =
				parseInt(zeroOrMore(parseInt(ltcgBreakUp1,10) - templtcgBreakUp1),10) +
				parseInt(zeroOrMore(parseInt(ltcgBreakUp2,10) - templtcgBreakUp2),10) +
				parseInt(zeroOrMore(parseInt(ltcgBreakUp3,10) - templtcgBreakUp3),10) +
				parseInt(zeroOrMore(parseInt(ltcgBreakUp4,10) - templtcgBreakUp4),10) +
				parseInt(zeroOrMore(parseInt(ltcgBreakUp5,10) - templtcgBreakUp5),10) +
				parseInt(zeroOrMore(parseInt(ltcgBreakUp6,10) - templtcgBreakUp6),10) ;



		var storeSTCG1 = tempstcgBreakUp1;
		var storeSTCG2 = tempstcgBreakUp2;
		var storeSTCG3 = tempstcgBreakUp3;
		var storeSTCG4 = tempstcgBreakUp4;
		var storeLTCG1 = templtcgBreakUp1;
		var storeLTCG2 = templtcgBreakUp2;
		var storeLTCG3 = templtcgBreakUp3;
		var storeLTCG4 = templtcgBreakUp4;
		var storeLTCG5 = templtcgBreakUp5;
		var storeLTCG6 = templtcgBreakUp6;



		if(tempstcgCFL>tempstcgBreakUp1){
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp1;
			tempstcgBreakUp1 =0;
		}else{
			tempstcgBreakUp1 = zeroOrMore(tempstcgBreakUp1 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempstcgCFL>tempstcgBreakUp2){
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp2;
			tempstcgBreakUp2 =0;
		}else{
			tempstcgBreakUp2 = zeroOrMore(tempstcgBreakUp2 - tempstcgCFL);
			tempstcgCFL=0;
		}


		if(tempstcgCFL>templtcgBreakUp1){
			tempstcgCFL = tempstcgCFL - templtcgBreakUp1;
			templtcgBreakUp1 =0;
		}else{
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempstcgCFL>tempstcgBreakUp3){
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp3;
			tempstcgBreakUp3 =0;
		}else{
			tempstcgBreakUp3 = zeroOrMore(tempstcgBreakUp3 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempstcgCFL>tempstcgBreakUp4){
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp4;
			tempstcgBreakUp4 =0;
		}else{
			tempstcgBreakUp4 = zeroOrMore(tempstcgBreakUp4 - tempstcgCFL);
			tempstcgCFL=0;
		}

		// adjusting STCG first


		if(tempstcgCFL>templtcgBreakUp2){
			tempstcgCFL = tempstcgCFL - templtcgBreakUp2;
			templtcgBreakUp2 =0;
		}else{
			templtcgBreakUp2 = zeroOrMore(templtcgBreakUp2 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempstcgCFL>templtcgBreakUp3){
			tempstcgCFL = tempstcgCFL - templtcgBreakUp3;
			templtcgBreakUp3 =0;
		}else{
			templtcgBreakUp3= zeroOrMore(templtcgBreakUp3 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempstcgCFL>templtcgBreakUp4){
			tempstcgCFL = tempstcgCFL - templtcgBreakUp4;
			templtcgBreakUp4 =0;
		}else{
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempstcgCFL>templtcgBreakUp5){
			tempstcgCFL = tempstcgCFL - templtcgBreakUp5;
			templtcgBreakUp5 =0;
		}else{
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempstcgCFL>templtcgBreakUp6){
			tempstcgCFL = tempstcgCFL - templtcgBreakUp6;
			templtcgBreakUp6 =0;
		}else{
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - tempstcgCFL);
			tempstcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp1){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp1;
			templtcgBreakUp1 =0;
		}else{
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp2){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp2;
			templtcgBreakUp2 =0;
		}else{
			templtcgBreakUp2 = zeroOrMore(templtcgBreakUp2 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp3){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp3;
			templtcgBreakUp3 =0;
		}else{
			templtcgBreakUp3= zeroOrMore(templtcgBreakUp3 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp4){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp4;
			templtcgBreakUp4 =0;
		}else{
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp5){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp5;
			templtcgBreakUp5 =0;
		}else{
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - tempLtcgCFL);
			tempLtcgCFL=0;
		}

		if(tempLtcgCFL>templtcgBreakUp6){
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp6;
			templtcgBreakUp6 =0;
		}else{
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - tempLtcgCFL);
			tempLtcgCFL=0;
		}


		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
		parseInt(zeroOrMore(parseInt(stcgBreakUp1,10) - tempstcgBreakUp1),10);
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
		parseInt(zeroOrMore(parseInt(stcgBreakUp2,10) - tempstcgBreakUp2),10);
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
		parseInt(zeroOrMore(parseInt(stcgBreakUp3,10) - tempstcgBreakUp3),10) +
		parseInt(zeroOrMore(parseInt(stcgBreakUp4,10) - tempstcgBreakUp4),10);
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
		parseInt(zeroOrMore(parseInt(ltcgBreakUp1,10) - templtcgBreakUp1),10);
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value =
		parseInt(zeroOrMore(parseInt(ltcgBreakUp2,10) - templtcgBreakUp2),10) +
		parseInt(zeroOrMore(parseInt(ltcgBreakUp3,10) - templtcgBreakUp3),10) +
		parseInt(zeroOrMore(parseInt(ltcgBreakUp4,10) - templtcgBreakUp4),10) +
		parseInt(zeroOrMore(parseInt(ltcgBreakUp5,10) - templtcgBreakUp5),10) +
		parseInt(zeroOrMore(parseInt(ltcgBreakUp6,10) - templtcgBreakUp6),10) ;



		document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.stcgLossCF')[0].value =
				parseInt(zeroOrMore( storeSTCG1 - tempstcgBreakUp1 ),10)+
				parseInt(zeroOrMore( storeSTCG2 - tempstcgBreakUp2 ),10)+
				parseInt(zeroOrMore( storeSTCG3 - tempstcgBreakUp3 ),10)+
				parseInt(zeroOrMore( storeSTCG4 - tempstcgBreakUp4 ),10)+
				parseInt(zeroOrMore( storeLTCG1 - templtcgBreakUp1 ),10)+
				parseInt(zeroOrMore( storeLTCG2 - templtcgBreakUp2 ),10)+
				parseInt(zeroOrMore( storeLTCG3 - templtcgBreakUp3 ),10)+
				parseInt(zeroOrMore( storeLTCG4 - templtcgBreakUp4 ),10)+
				parseInt(zeroOrMore( storeLTCG5 - templtcgBreakUp5 ),10)+
				parseInt(zeroOrMore( storeLTCG6 - templtcgBreakUp6 ),10);

	var totalUDDeprctn = document.getElementsByName('itrScheduleUD.totalamtDepCurYr')[0].value;

	var busProfSpecProfset=coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff');

	if(busProfSpecProfset>0){
    	if(busProfSpecProfset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bfUnabsorbedDeprSetoff')[0].value = busProfSpecProfset;
		totalUDDeprctn = totalUDDeprctn - busProfSpecProfset;

	} else {
		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var Speculativeset=coalescePath('scheduleBFLA.speculativeInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(Speculativeset>0){
	if(Speculativeset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bfUnabsorbedDeprSetoff')[0].value = Speculativeset;
		totalUDDeprctn = totalUDDeprctn - Speculativeset;

	} else {
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var specifiedSet=coalescePath('scheduleBFLA.specifiedInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(specifiedSet>0){
	if(specifiedSet<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bfUnabsorbedDeprSetoff')[0].value = specifiedSet;
		totalUDDeprctn = totalUDDeprctn - specifiedSet;

	} else {
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var hpset=coalescePath('scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(hpset>0){
	if(hpset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.hp.incBFLA.bfUnabsorbedDeprSetoff')[0].value = hpset;
		totalUDDeprctn = totalUDDeprctn - hpset;

	} else {
		document.getElementsByName('scheduleBFLA.hp.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.hp.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var otherSrcset=coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA');
	if(otherSrcset>0){
	if(otherSrcset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')[0].value = otherSrcset;
		totalUDDeprctn = totalUDDeprctn - otherSrcset;

	} else {
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var profitOwnset=coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(profitOwnset>0){
	if(profitOwnset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')[0].value = profitOwnset;
		totalUDDeprctn = totalUDDeprctn - profitOwnset;

	} else {
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	//1
	var stcg30Perset=coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(stcg30Perset>0){
	if(stcg30Perset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = stcg30Perset;
		totalUDDeprctn = totalUDDeprctn - stcg30Perset;

	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var stcgAppset=coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(stcgAppset>0){
	if(stcgAppset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff')[0].value = stcgAppset;
		totalUDDeprctn = totalUDDeprctn - stcgAppset;

	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}
	var ltcg20Perset=coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(ltcg20Perset>0){
	if(ltcg20Perset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = ltcg20Perset;
		totalUDDeprctn = totalUDDeprctn - ltcg20Perset;

	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var stcg15Perset=coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(stcg15Perset>0){
	if(stcg15Perset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = stcg15Perset;
		totalUDDeprctn = totalUDDeprctn - stcg15Perset;

	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;

	}

	var ltcg10Perset=coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
	if(ltcg10Perset>0){
	if(ltcg10Perset<=totalUDDeprctn){
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = ltcg10Perset;
		totalUDDeprctn = totalUDDeprctn - ltcg10Perset;

	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = totalUDDeprctn;
		totalUDDeprctn = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff')[0].value = 0;
	}

	// calculating sum of column 3
	document.getElementsByName('scheduleBFLA.totalBFLossSetOff.totUnabsorbedDeprSetoff')[0].value =
		coalescePath('scheduleBFLA.hp.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.speculativeInc.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.specifiedInc.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')+
		coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfUnabsorbedDeprSetoff');


	//checking max limits of "Brought forward depreciation set off" --- column 4

	var busProfSpecAllwnceSet = (coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bfUnabsorbedDeprSetoff'));
	var totalUDAllwnce = document.getElementsByName('itrScheduleUD.amountASACYIncome')[0].value;


	if(busProfSpecAllwnceSet>0){
	if(busProfSpecAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bfAllUs35Cl4Setoff')[0].value = busProfSpecAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - busProfSpecAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;
	}
	} else {
		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var SpeculatvAllwnceSet = (coalescePath('scheduleBFLA.speculativeInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.speculativeInc.incBFLA.bfUnabsorbedDeprSetoff'));

	if(SpeculatvAllwnceSet>0){
	if(SpeculatvAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bfAllUs35Cl4Setoff')[0].value = SpeculatvAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - SpeculatvAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}


	var SpecfiedAllwnceSet = (coalescePath('scheduleBFLA.specifiedInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.specifiedInc.incBFLA.bfUnabsorbedDeprSetoff'));

	if(SpecfiedAllwnceSet>0){
	if(SpecfiedAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bfAllUs35Cl4Setoff')[0].value = SpecfiedAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - SpecfiedAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var hpAllwnceSet = (coalescePath('scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.hp.incBFLA.bfUnabsorbedDeprSetoff'));

	if(hpAllwnceSet>0){
	if(hpAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.hp.incBFLA.bfAllUs35Cl4Setoff')[0].value = hpAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - hpAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.hp.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.hp.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var othrSrcAllwnceSet = (coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfUnabsorbedDeprSetoff'));

	if(othrSrcAllwnceSet>0){
	if(othrSrcAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfAllUs35Cl4Setoff')[0].value = othrSrcAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - othrSrcAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var profitAllwnceSet = (coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfUnabsorbedDeprSetoff'));

	if(profitAllwnceSet>0){
	if(profitAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfAllUs35Cl4Setoff')[0].value = profitAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - profitAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	//1
	var stcg30PerAllwnceSet = (coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff'));

	if(stcg30PerAllwnceSet>0){
	if(stcg30PerAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = stcg30PerAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - stcg30PerAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var stcgAppAllwnceSet = (coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff'));

	if(stcgAppAllwnceSet>0){
	if(stcgAppAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfAllUs35Cl4Setoff')[0].value = stcgAppAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - stcgAppAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var ltcg20PerAllwnceSet = (coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff'));

	if(ltcg20PerAllwnceSet>0){
	if(ltcg20PerAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = ltcg20PerAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - ltcg20PerAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var stcg15PerAllwnceSet = (coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff'));

	if(stcg15PerAllwnceSet>0){
	if(stcg15PerAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = stcg15PerAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - stcg15PerAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	var ltcg10PerAllwnceSet = (coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
		 coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
		 coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff'));

	if(ltcg10PerAllwnceSet>0){
	if(ltcg10PerAllwnceSet<=totalUDAllwnce){
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = ltcg10PerAllwnceSet;
		totalUDAllwnce = totalUDAllwnce - ltcg10PerAllwnceSet;

	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = totalUDAllwnce;
		totalUDAllwnce = 0;

	}
	} else {
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfAllUs35Cl4Setoff')[0].value = 0;
	}

	//calculating the income after setOff
		document.getElementsByName('scheduleBFLA.hp.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.hp.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.hp.incBFLA.bfAllUs35Cl4Setoff');

		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfAllUs35Cl4Setoff');
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value =
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')-
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff')-
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')-
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfAllUs35Cl4Setoff');
		// Total of brought forward loss set off
		document.getElementsByName('scheduleBFLA.totalBFLossSetOff.totBFLossSetoff')[0].value =
			coalescePath('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')+
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document.getElementsByName('scheduleBFLA.totalBFLossSetOff.totUnabsorbedDeprSetoff')[0].value =
			coalescePath('scheduleBFLA.hp.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfUnabsorbedDeprSetoff');
		document.getElementsByName('scheduleBFLA.totalBFLossSetOff.totAllUs35Cl4Setoff')[0].value =
			coalescePath('scheduleBFLA.hp.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.bfAllUs35Cl4Setoff')+
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bfAllUs35Cl4Setoff');
		//x :: sum
		document.getElementsByName('scheduleBFLA.incomeOfCurrYrAftCYLABFLA')[0].value =
			coalescePath('scheduleBFLA.hp.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.speculativeInc.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.specifiedInc.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses')+
			coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses');

		var sumUD35_4_stcg15Per = coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bfAllUs35Cl4Setoff');
		var sumUD35_4_stcg30Per = coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bfAllUs35Cl4Setoff');
		var sumUD35_4_stcgAppPer = coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bfAllUs35Cl4Setoff');
		var sumUD35_4_ltcg20Per = coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bfAllUs35Cl4Setoff');
		var sumUD35_4_ltcg10Per = coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfUnabsorbedDeprSetoff')+
			coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bfAllUs35Cl4Setoff');

		if(sumUD35_4_stcg30Per>tempstcgBreakUp1){
			sumUD35_4_stcg30Per = sumUD35_4_stcg30Per - tempstcgBreakUp1;
			tempstcgBreakUp1 =0;
		}else{
			tempstcgBreakUp1 = zeroOrMore(tempstcgBreakUp1 - sumUD35_4_stcg30Per);
			sumUD35_4_stcg30Per=0;
		}

		if(sumUD35_4_stcgAppPer>tempstcgBreakUp2){
			sumUD35_4_stcgAppPer = sumUD35_4_stcgAppPer - tempstcgBreakUp2;
			tempstcgBreakUp2 =0;
		}else{
			tempstcgBreakUp2 = zeroOrMore(tempstcgBreakUp2 - sumUD35_4_stcgAppPer);
			sumUD35_4_stcgAppPer=0;
		}


		if(sumUD35_4_ltcg20Per>templtcgBreakUp1){
			sumUD35_4_ltcg20Per = sumUD35_4_ltcg20Per - templtcgBreakUp1;
			templtcgBreakUp1 =0;
		}else{
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - sumUD35_4_ltcg20Per);
			sumUD35_4_ltcg20Per=0;
		}

		if(sumUD35_4_stcg15Per>tempstcgBreakUp3){
			sumUD35_4_stcg15Per = sumUD35_4_stcg15Per - tempstcgBreakUp3;
			tempstcgBreakUp3 =0;
		}else{
			tempstcgBreakUp3 = zeroOrMore(tempstcgBreakUp3 - sumUD35_4_stcg15Per);
			sumUD35_4_stcg15Per=0;
		}

		if(sumUD35_4_stcg15Per>tempstcgBreakUp4){
			sumUD35_4_stcg15Per = sumUD35_4_stcg15Per - tempstcgBreakUp4;
			tempstcgBreakUp4 =0;
		}else{
			tempstcgBreakUp4 = zeroOrMore(tempstcgBreakUp4 - sumUD35_4_stcg15Per);
			sumUD35_4_stcg15Per=0;
		}


		if(sumUD35_4_ltcg10Per>templtcgBreakUp2){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp2;
			templtcgBreakUp2 =0;
		}else{
			templtcgBreakUp2= zeroOrMore(templtcgBreakUp2 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp3){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp3;
			templtcgBreakUp3 =0;
		}else{
			templtcgBreakUp3 = zeroOrMore(templtcgBreakUp3 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp4){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp4;
			templtcgBreakUp4 =0;
		}else{
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp5){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp5;
			templtcgBreakUp5 =0;
		}else{
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp6){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp6;
			templtcgBreakUp6 =0;
		}else{
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}


		if(sumUD35_4_ltcg20Per>templtcgBreakUp1){
			sumUD35_4_ltcg20Per = sumUD35_4_ltcg20Per - templtcgBreakUp1;
			templtcgBreakUp1 =0;
		}else{
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - sumUD35_4_ltcg20Per);
			sumUD35_4_ltcg20Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp2){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp2;
			templtcgBreakUp2 =0;
		}else{
			templtcgBreakUp2 = zeroOrMore(templtcgBreakUp2 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp3){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp3;
			templtcgBreakUp3 =0;
		}else{
			templtcgBreakUp3= zeroOrMore(templtcgBreakUp3 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp4){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp4;
			templtcgBreakUp4 =0;
		}else{
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp5){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp5;
			templtcgBreakUp5 =0;
		}else{
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}

		if(sumUD35_4_ltcg10Per>templtcgBreakUp6){
			sumUD35_4_ltcg10Per = sumUD35_4_ltcg10Per - templtcgBreakUp6;
			templtcgBreakUp6 =0;
		}else{
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - sumUD35_4_ltcg10Per);
			sumUD35_4_ltcg10Per=0;
		}



		cgosIncome.cgInc.stcg.prctg30 = tempstcgBreakUp1;
		cgosIncome.cgInc.stcg.prctgAr = tempstcgBreakUp2;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = tempstcgBreakUp3;
		cgosIncome.cgInc.stcg.prctg15.sec111a = tempstcgBreakUp4;
		cgosIncome.cgInc.ltcg.prctg20.sec112 = templtcgBreakUp1;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = templtcgBreakUp2;
		cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B = templtcgBreakUp3;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = templtcgBreakUp4;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = templtcgBreakUp5;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = templtcgBreakUp6;

		calcCFL(specltvIncSetOff, specfdIncSetOff);

	}catch(e){
		alert('error in calcBFLA' + e.stack);
	}

}

function prefillBFLA(){
	try{

		document.getElementsByName('scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff');
		document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff');
		document.getElementsByName('scheduleBFLA.speculativeInc.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.speculativeInc.incCYLA.incOfCurYrAfterSetOff');
		document.getElementsByName('scheduleBFLA.specifiedInc.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.specifiedInc.incCYLA.incOfCurYrAfterSetOff');
		document.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff');//4iv of CYLA --> 3i of BFLA
		document.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff');//4v of CYLA --> 4i of BFLA
		document.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff');//4Vi of CYLA --> 5i of BFLA
		document.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff');//4Vii of CYLA --> 6i of BFLA
		document.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff');//4Viii of CYLA --> 7i of BFLA
		document.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff');
		document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value =  coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff');


	}catch(e){
		alert('error in prefillBFLA' + e.stack);
	}
}


function setFirstToSecondMax(first,second,target){
	try{
		if(coalescePath(first) > coalescePath(second)){
			document.getElementsByName(target)[0].value= coalescePath(second);
		}else{
			document.getElementsByName(target)[0].value= coalescePath(first);
		}
	}catch(e){
		alert('error in setFirstToSecondMax= '+e.stack );
	}
}

function calcCFL(specltvIncSetOff, specfdIncSetOff){
	try {

	document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.hpLossCF')[0].value = zeroOrMore(document.getElementsByName('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value);

	document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value =
				parseInt(zeroOrMore(document.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value),10)+
				parseInt(zeroOrMore(coalescePath('scheduleBFLA.speculativeInc.incBFLA.bFlossPrevYrUndSameHeadSetoff') - specltvIncSetOff),10)+
				parseInt(zeroOrMore(coalescePath('scheduleBFLA.specifiedInc.incBFLA.bFlossPrevYrUndSameHeadSetoff') - specfdIncSetOff),10);

		document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.lossFrmSpecBusCF')[0].value = specltvIncSetOff;
		document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].value = specfdIncSetOff;

		document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value = zeroOrMore(document.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value);

		// scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.hpLossCF
		var hpLossCFL = document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF')[0];

		setEditableFieldValue(hpLossCFL,Math
				.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')));

		if(hpLossCFL.value > Math
				.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')))
		{
			hpLossCFL.value = Math.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff'));
		}else
		{
			hpLossCFL.value=hpLossCFL.value;
		}

		var busLossOthThanSpecLossCFL = document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF')[0];
		setEditableFieldValue(busLossOthThanSpecLossCFL,Math
				.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')));

		if(busLossOthThanSpecLossCFL.value > Math
				.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')))
		{
			busLossOthThanSpecLossCFL.value = Math.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff'));
		}else
		{
			busLossOthThanSpecLossCFL.value=busLossOthThanSpecLossCFL.value;
		}




		// setting values to 0 before populating - specu, specified, stcg , ltcg
		/*document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF')[0].value = parseInt(0,10);
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].value = parseInt(0,10);
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0].value = parseInt(0,10);
		document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0].value = parseInt(0,10);*/

		// speculative  ---- mod(B41) of schedule BP if B41 is -ve
		if(coalescePath('itr5ScheduleBP.specBusinessInc.adjustedPLFrmSpecuBus') < 0 ){
			var lossFrmSpecBusCFL = document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF')[0];
			setEditableFieldValue(lossFrmSpecBusCFL,Math
					.abs(coalescePath('itr5ScheduleBP.specBusinessInc.adjustedPLFrmSpecuBus')));

			if(lossFrmSpecBusCFL.value > Math
					.abs(coalescePath('itr5ScheduleBP.specBusinessInc.adjustedPLFrmSpecuBus')))
			{
				lossFrmSpecBusCFL.value = Math.abs(coalescePath('itr5ScheduleBP.specBusinessInc.adjustedPLFrmSpecuBus'));
			}else
			{
				lossFrmSpecBusCFL.value=lossFrmSpecBusCFL.value;
			}
		}

		// specified   ---- mod(C47)  of schedule BP only if C47 is -ve
		if(coalescePath('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal') < 0){
			var lossFrmSpecifiedBusCFL = document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF')[0];
			setEditableFieldValue(lossFrmSpecifiedBusCFL,Math
					.abs(coalescePath('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal')));

			if(lossFrmSpecifiedBusCFL.value > Math
					.abs(coalescePath('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal')))
			{
				lossFrmSpecifiedBusCFL.value = Math.abs(coalescePath('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal'));
			}else
			{
				lossFrmSpecifiedBusCFL.value=lossFrmSpecifiedBusCFL.value;
			}
		}

		var totalSTCG = coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoff15Per') +
			coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoff30Per') +
			coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoffAppRate');

		var totalLTCG = coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.ltclSetOff10Per') +
				coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.ltclSetOff20Per') ;

		var stcgTotal = document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0];

		setEditableFieldValue(stcgTotal, totalSTCG);

		if(stcgTotal.value > totalSTCG )
		{
			stcgTotal.value = totalSTCG;
		}else
		{
			stcgTotal.value=stcgTotal.value;
		}

		var ltcgTotal = document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0];

		setEditableFieldValue(ltcgTotal, totalLTCG);

		if(ltcgTotal.value > totalLTCG )
		{
			ltcgTotal.value = totalLTCG;
		}else
		{
			ltcgTotal.value=ltcgTotal.value;
		}

		// os ----- Enter current year OS if any from 4c of Sch OS. ie. any negative figure.
		if(coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse') < 0){
			var othSrcLossRaceHorseCFL = document.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF')[0];
			setEditableFieldValue(othSrcLossRaceHorseCFL,Math
					.abs(coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse')));

			if(othSrcLossRaceHorseCFL.value > Math
					.abs(coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse')))
			{
				othSrcLossRaceHorseCFL.value = Math.abs(coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse'));
			}else
			{
				othSrcLossRaceHorseCFL.value=othSrcLossRaceHorseCFL.value;
			}
		}

		var firstHp = document.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.hpLossCF')[0].value;
		var firstBus = document.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')[0].value;
		var firstSpeculatvBus = document.getElementsByName('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.lossFrmSpecBusCF')[0].value;
		var firstSpecifiedBusC = document.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.lossFrmSpecifiedBusCF')[0].value;
		var firstShortTerm = document.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.stcgLossCF')[0].value;
		var firstLongTerm = document.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.ltcgLossCF')[0].value;
		var firstOth = document.getElementsByName('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')[0].value;

		var adjstHp = document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.hpLossCF')[0].value;
		var adjstBus = document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value;
		var adjstSpeculatvBus = document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.lossFrmSpecBusCF')[0].value;
		var adjstSpecifdBus = document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].value;
		var adjstShortTerm = document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.stcgLossCF')[0].value;
		var adjstLongTerm = document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.ltcgLossCF')[0].value;
		var adjstOth = document.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value;

		if(parseInt(firstHp, 10)>parseInt(adjstHp, 10)){
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.hpLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF') - firstHp +
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF'));
		}else{
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.hpLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF') - adjstHp +
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF'));
		}

		if(parseInt(firstBus, 10)>parseInt(adjstBus, 10)){
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF')- firstBus +
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF'));
		}else{
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF')- adjstBus +
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF'));
		}

		if(parseInt(firstSpeculatvBus, 10) > parseInt(adjstSpeculatvBus, 10)){
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.lossFrmSpecBusCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecBusCF')-firstSpeculatvBus+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF'));
		}else{
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.lossFrmSpecBusCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecBusCF')-adjstSpeculatvBus+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF'));
		}

		if(parseInt(firstSpecifiedBusC, 10) > parseInt(adjstSpecifdBus, 10)){
			document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].value =
				zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecifiedBusCF')-firstSpecifiedBusC+
				coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF'));
			}else{
				document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecifiedBusCF')-adjstSpecifdBus+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF'));
		}


		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.lossFrmSpecifiedBusCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.lossFrmSpecifiedBusCF')-adjstSpecifdBus+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF'));

		if(parseInt(firstShortTerm, 10)>parseInt(adjstShortTerm, 10)){
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.stcgLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF')-firstShortTerm+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF'));
		}else{
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.stcgLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF')-adjstShortTerm+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF'));
		}

		if(parseInt(firstLongTerm, 10)>parseInt(adjstLongTerm, 10)){
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.ltcgLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF')-firstLongTerm+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF'));
		}else{
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.ltcgLossCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF')-adjstLongTerm+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF'));
		}

		if(parseInt(firstOth, 10)>parseInt(adjstOth, 10)){
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF')-firstOth+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF'));

		}else{
		document.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value =
			zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF')-adjstOth+
			coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF'));

		}

		}catch(e){
		alert('error in calcCFL()= '+e.stack);
	}

}

function calcBalSheet(){
	//1
	var totResrNSurp = document.getElementsByName('partabs.fundSrc.partnerOrMemberFund.resrNSurp.totResrNSurp')[0];
	totResrNSurp.value = coalesceSetRet('partabs.fundSrc.partnerOrMemberFund.resrNSurp.revResr') +
						 coalesceSetRet('partabs.fundSrc.partnerOrMemberFund.resrNSurp.capResr') +
						 coalesceSetRet('partabs.fundSrc.partnerOrMemberFund.resrNSurp.statResr') +
						 coalesceSetRet('partabs.fundSrc.partnerOrMemberFund.resrNSurp.othResr')+
						 coalesceSetRet('partabs.fundSrc.partnerOrMemberFund.resrNSurp.creditBalOfPLAccount');
    var totPartnerOrMemberFund = document.getElementsByName('partabs.fundSrc.partnerOrMemberFund.totPartnerOrMemberFund')[0];
    totPartnerOrMemberFund.value = parseInt(totResrNSurp.value, 10) +
						coalesceSetRet('partabs.fundSrc.partnerOrMemberFund.partnerOrMemberCap');

  //2

    var totRupeeLoan = document.getElementsByName('partabs.fundSrc.loanFunds.secrLoan.rupeeLoan.totRupeeLoan')[0];
	totRupeeLoan.value =  coalesceSetRet('partabs.fundSrc.loanFunds.secrLoan.rupeeLoan.frmBank') +
						 coalesceSetRet('partabs.fundSrc.loanFunds.secrLoan.rupeeLoan.frmOthrs');
	var totSecrLoan = document.getElementsByName('partabs.fundSrc.loanFunds.secrLoan.totSecrLoan')[0];
	totSecrLoan.value =  parseInt(totRupeeLoan.value, 10) +
						 coalesceSetRet('partabs.fundSrc.loanFunds.secrLoan.foreignCurrLoan');

	var totUnsecrRupeeLoan=document.getElementsByName('partabs.fundSrc.loanFunds.unsecrLoan.rupeeLoan.totRupeeLoan')[0];
	totUnsecrRupeeLoan.value=coalesceSetRet('partabs.fundSrc.loanFunds.unsecrLoan.rupeeLoan.frmBank') +
	 						 coalesceSetRet('partabs.fundSrc.loanFunds.unsecrLoan.rupeeLoan.frmPersonSpcfdUs40A2B')+
	 						 coalesceSetRet('partabs.fundSrc.loanFunds.unsecrLoan.rupeeLoan.frmOthrs');

	var totUnSecrLoan = document.getElementsByName('partabs.fundSrc.loanFunds.unsecrLoan.totUnSecrLoan')[0];
	totUnSecrLoan.value =parseInt(totUnsecrRupeeLoan.value, 10) +
	 				     coalesceSetRet('partabs.fundSrc.loanFunds.unsecrLoan.foreignCurrencyLoans');

	var totLoanFund = document.getElementsByName('partabs.fundSrc.loanFunds.totLoanFund')[0];
	totLoanFund.value =  parseInt(totSecrLoan.value, 10) +
						 parseInt(totUnSecrLoan.value, 10);

	//4
	var totAdvances = document.getElementsByName('partabs.fundSrc.advances.totalAdvances')[0];
	totAdvances.value =  coalesceSetRet('partabs.fundSrc.advances.frmPersonSpcfdUs40A2B') +
						 coalesceSetRet('partabs.fundSrc.advances.frmOthers');

	 //5

	var totFundSrc = document.getElementsByName('partabs.fundSrc.totFundSrc')[0];
	totFundSrc.value = parseInt(totPartnerOrMemberFund.value, 10) +
					   parseInt(totLoanFund.value, 10) +
					   coalesceSetRet('partabs.fundSrc.deferredTax')+
					   parseInt(totAdvances.value, 10);


	//1
	var netBlock = document.getElementsByName('partabs.fundApply.fixedAsset.netBlock')[0];
	netBlock.value =  zeroOrMore(coalesceSetRet('partabs.fundApply.fixedAsset.grossBlock') -
						 coalesceSetRet('partabs.fundApply.fixedAsset.depreciation'));

	var totFixedAsset = document.getElementsByName('partabs.fundApply.fixedAsset.totFixedAsset')[0];
	totFixedAsset.value =  parseInt(netBlock.value, 10) +
						 coalesceSetRet('partabs.fundApply.fixedAsset.capWrkProg');

	//2
	var totLongTermEquityInstruments = document.getElementsByName('partabs.fundApply.investments.longTermInv.equityInstruments.total')[0];
	totLongTermEquityInstruments.value =coalesceSetRet('partabs.fundApply.investments.longTermInv.equityInstruments.listedEquities') +
	 						    coalesceSetRet('partabs.fundApply.investments.longTermInv.equityInstruments.unListedEquities');


	var totLongTermInv = document.getElementsByName('partabs.fundApply.investments.longTermInv.totLongTermInv')[0];
	totLongTermInv.value =coalesceSetRet('partabs.fundApply.investments.longTermInv.invInProperty') +
						  parseInt(totLongTermEquityInstruments.value, 10)+
						  coalesceSetRet('partabs.fundApply.investments.longTermInv.preferenceShares') +
						  coalesceSetRet('partabs.fundApply.investments.longTermInv.govtOrTrustSecurities')+
						  coalesceSetRet('partabs.fundApply.investments.longTermInv.debenturesOrBonds')+
						  coalesceSetRet('partabs.fundApply.investments.longTermInv.mutualFunds')+
						  coalesceSetRet('partabs.fundApply.investments.longTermInv.others')


	var totShortTermEquities = document.getElementsByName('partabs.fundApply.investments.shortTermInv.equityInst.totalEquities')[0];
	totShortTermEquities.value =coalesceSetRet('partabs.fundApply.investments.shortTermInv.equityInst.listedEquities') +
	 						    coalesceSetRet('partabs.fundApply.investments.shortTermInv.equityInst.unlistedEquities');

	var totShortTermInv = document.getElementsByName('partabs.fundApply.investments.shortTermInv.totshortTermInv')[0];
	totShortTermInv.value =parseInt(totShortTermEquities.value, 10)+
						  coalesceSetRet('partabs.fundApply.investments.shortTermInv.preferenceShares') +
						  coalesceSetRet('partabs.fundApply.investments.shortTermInv.governmentOrTrustSecurities')+
						  coalesceSetRet('partabs.fundApply.investments.shortTermInv.debentureOrBonds')+
						  coalesceSetRet('partabs.fundApply.investments.shortTermInv.mutualFunds')+
						  coalesceSetRet('partabs.fundApply.investments.shortTermInv.others');


	var totInvestments = document.getElementsByName('partabs.fundApply.investments.totInvestments')[0];
	totInvestments.value =  parseInt(totLongTermInv.value, 10) +
						 parseInt(totShortTermInv.value, 10);


	//3
	var totInventries = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.totInventries')[0];
	totInventries.value =coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.rawMatl') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.workInProgress') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.finOrTradGood') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.stkInTrade')+
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.storesConsumables')+
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.looseTools')+
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.inventories.others');

	var totalSundryDebtors = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currAsset.sundryDebtorsDtls.totalSundryDebtors')[0];
	totalSundryDebtors.value =coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.sundryDebtorsDtls.outstandindMorethanOneYr') +
       						  coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.sundryDebtorsDtls.others');

	var totCashOrBankBal = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currAsset.cashOrBankBal.totCashOrBankBal')[0];
	totCashOrBankBal.value =  coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.cashOrBankBal.cashinHand') +
							  coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.cashOrBankBal.bankBal') +
						      coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.cashOrBankBal.others');

	var totCurrAsset = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currAsset.totCurrAsset')[0];
	totCurrAsset.value = parseInt(totInventries.value, 10) +
						 parseInt(totalSundryDebtors.value, 10) +
	 					 parseInt(totCashOrBankBal.value, 10) +
	 					 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currAsset.othCurrAsset');

	var totLoanAdv = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.loanAdv.totLoanAdv')[0];
	totLoanAdv.value =  coalesceSetRet('partabs.fundApply.currAssetLoanAdv.loanAdv.advRecoverable') +
						coalesceSetRet('partabs.fundApply.currAssetLoanAdv.loanAdv.deposits') +
						coalesceSetRet('partabs.fundApply.currAssetLoanAdv.loanAdv.balWithRevAuth') ;


	var totCurrAssetLoanAdv = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.totCurrAssetLoanAdv')[0];
	totCurrAssetLoanAdv.value =  parseInt(totCurrAsset.value, 10) +
								parseInt(totLoanAdv.value, 10) ;


	var totalSundryCreditors = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.sundryCreditors.totalSundryCreditors')[0];
	totalSundryCreditors.value =  coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.sundryCreditors.outstandindMorethanOneYr') +
								  coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.sundryCreditors.others') ;

	var totCurrLiabilities = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.totCurrLiabilities')[0];
	totCurrLiabilities.value =  parseInt(totalSundryCreditors.value, 10) +
					     coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.liabForLeasedAsset') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.accrIntonLeasedAsset') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.accrIntNotDue') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.incRecvdInAdv') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.currLiabilities.otherPayables');

	var totProvisions = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.provisions.totProvisions')[0];
	totProvisions.value =  coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.provisions.itProvision') +
						 /*coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.provisions.wtProvision') + */
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.provisions.elSuperAnnGratProvision') +
						 coalesceSetRet('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.provisions.othProvision');

	var totCurrLiabilitiesProvision = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.currLiabilitiesProv.totCurrLiabilitiesProvision')[0];
	totCurrLiabilitiesProvision.value =  parseInt(totCurrLiabilities.value, 10) +
								parseInt(totProvisions.value, 10) ;

	var netCurrAsset = document.getElementsByName('partabs.fundApply.currAssetLoanAdv.netCurrAsset')[0];
	netCurrAsset.value =  parseInt(totCurrAssetLoanAdv.value, 10) -
								parseInt(totCurrLiabilitiesProvision.value, 10) ;

	//4
	var totMiscAdjust = document.getElementsByName('partabs.fundApply.miscAdjust.totMiscAdjust')[0];
	totMiscAdjust.value =coalesceSetRet('partabs.fundApply.miscAdjust.miscExpndr') +
						 coalesceSetRet('partabs.fundApply.miscAdjust.defTaxAsset') +
						 coalesceSetRet('partabs.fundApply.miscAdjust.accumultedLosses');
	//5
	var totFundApply = document.getElementsByName('partabs.fundApply.totFundApply')[0];
	totFundApply.value =  	parseInt(totFixedAsset.value, 10)  +
							parseInt(totInvestments.value, 10)  +
							parseInt(netCurrAsset.value, 10) +
							parseInt(totMiscAdjust.value, 10) ;

	coalesceSetRet('partabs.noBooksOfAccBS.totSundryDbtAmt');
	coalesceSetRet('partabs.noBooksOfAccBS.totSundryCrdAmt');
	coalesceSetRet('partabs.noBooksOfAccBS.totStkInTradAmt');
	coalesceSetRet('partabs.noBooksOfAccBS.cashBalAmt');
}



function calcSchBP()
{
try
{
	calcculateAnyOtherInc();
	var profBfrTaxPL = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.profBfrTaxPL')[0]; profBfrTaxPL.value = coalesce(profBfrTaxPL.value);
	var netPLFromSpecBus = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netPLFromSpecBus')[0]; netPLFromSpecBus.value = coalesce(netPLFromSpecBus.value);
	var netProfLossSpecifiedBus = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netProfLossSpecifiedBus')[0]; netProfLossSpecifiedBus.value = coalesce(netProfLossSpecifiedBus.value);
	var incRecCredPLOthHeadsHp = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.houseProperty')[0]; incRecCredPLOthHeadsHp.value = coalesce(incRecCredPLOthHeadsHp.value);
	var incRecCredPLOthHeadsCg = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.capitalGains')[0]; incRecCredPLOthHeadsCg.value = coalesce(incRecCredPLOthHeadsCg.value);
    var incRecCredPLOthHeadsOs = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.othSources')[0]; incRecCredPLOthHeadsOs.value = coalesce(incRecCredPLOthHeadsOs.value);
    var incRecCredPL5BBFHeadsOs = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBF')[0]; incRecCredPL5BBFHeadsOs.value = coalesce(incRecCredPL5BBFHeadsOs.value);
    var incRecCredPL5BBGHeadsOs = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBG')[0]; incRecCredPL5BBGHeadsOs.value = coalesce(incRecCredPL5BBGHeadsOs.value);
    /*var plUs44SChapXIIG = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.plUs44SChapXIIG')[0]; plUs44SChapXIIG.value = coalesce(plUs44SChapXIIG.value);*/
    var incUS115B = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.underSec115B')[0]; incUS115B.value = coalesce(incUS115B.value);
    var incUsOther = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.underSecOther')[0]; incUsOther.value = coalesce(incUsOther.value);

	var firmShareInc = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incCredPL.firmShareInc')[0]; firmShareInc.value = coalesce(firmShareInc.value);
	var aopboiSharInc = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incCredPL.aopboiSharInc')[0]; aopboiSharInc.value = coalesce(aopboiSharInc.value);
	var totExempInc = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incCredPL.totExempIncPL')[0];  totExempInc.value = coalesce(totExempInc.value);

	var balancePLOthThanSpecBus = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.balancePLOthThanSpecBus')[0]; balancePLOthThanSpecBus.value = coalesce(balancePLOthThanSpecBus.value);
	var expDebToPLOthHeadsHouseProperty = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.houseProperty')[0]; expDebToPLOthHeadsHouseProperty.value = coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.houseProperty');
	var expDebToPLOthHeadsCapitalGains = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.capitalGains')[0]; expDebToPLOthHeadsCapitalGains.value = coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.capitalGains');
	var expDebToPLOthHeadsOthSources = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.othSources')[0]; expDebToPLOthHeadsOthSources.value = coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.othSources');
	var expDebToPLOthHeadsUndSec115BBF = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.underSec115BBF')[0]; expDebToPLOthHeadsUndSec115BBF.value = coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.underSec115BBF');
	var expDebToPLOthHeadsUndSec115BBG = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.underSec115BBG')[0]; expDebToPLOthHeadsUndSec115BBG.value = coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.underSec115BBG');
	var expDebToPLExemptInc = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.expDebToPLExemptInc')[0];  expDebToPLExemptInc.value = coalesce(expDebToPLExemptInc.value);

	var totExpDebPL = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.totExpDebPL')[0]; totExpDebPL.value = coalesce(totExpDebPL.value);
	var adjustedPLOthThanSpecBus = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.adjustedPLOthThanSpecBus')[0]; adjustedPLOthThanSpecBus.value = coalesce(adjustedPLOthThanSpecBus.value);
	var depreciationDebPLCosAct = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.depreciationDebPLCosAct')[0]; depreciationDebPLCosAct.value = coalesce(depreciationDebPLCosAct.value);

	var depreciationAllowUs321Ii = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.depreciationAllowITAct32.depreciationAllowUs321Ii')[0]; depreciationAllowUs321Ii.value = coalesce(depreciationAllowUs321Ii.value);
	var depreciationAllowUs321I = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.depreciationAllowITAct32.depreciationAllowUs321I')[0]; depreciationAllowUs321I.value = coalesce(depreciationAllowUs321I.value);
	var totDeprAllowITAct = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.depreciationAllowITAct32.totDeprAllowITAct')[0]; totDeprAllowITAct.value = coalesce(totDeprAllowITAct.value);

	var adjustPLAfterDeprOthSpecInc = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.adjustPLAfterDeprOthSpecInc')[0]; adjustPLAfterDeprOthSpecInc.value = coalesce(adjustPLAfterDeprOthSpecInc.value);
	var amtDebPLDisallowUs36 = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.amtDebPLDisallowUs36')[0]; amtDebPLDisallowUs36.value = coalesce(amtDebPLDisallowUs36.value);
	var amtDebPLDisallowUs37 = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.amtDebPLDisallowUs37')[0]; amtDebPLDisallowUs37.value = coalesce(amtDebPLDisallowUs37.value);
	var amtDebPLDisallowUs40 = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.amtDebPLDisallowUs40')[0]; amtDebPLDisallowUs40.value = coalesce(amtDebPLDisallowUs40.value);
	var amtDebPLDisallowUs40A = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.amtDebPLDisallowUs40A')[0]; amtDebPLDisallowUs40A.value = coalesce(amtDebPLDisallowUs40A.value);
	var amtDebPLDisallowUs43B = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.amtDebPLDisallowUs43B')[0]; amtDebPLDisallowUs43B.value = coalesce(amtDebPLDisallowUs43B.value);
	var interestDisAllowUs23SMEAct = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.interestDisAllowUs23SMEAct')[0]; interestDisAllowUs23SMEAct.value = coalesce(interestDisAllowUs23SMEAct.value);
	var deemIncUs41 = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs41')[0]; deemIncUs41.value = coalesce(deemIncUs41.value);
	var deemIncUs3380HHD80IA = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs3380HHD80IA')[0]; deemIncUs3380HHD80IA.value = coalesce(deemIncUs3380HHD80IA.value);
	var deemIncUs43ca = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedIncomeUs43CA')[0]; deemIncUs43ca.value = coalesce(deemIncUs43ca.value);
    var othItemDisallowUs28To44DA = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.othItemDisallowUs28To44DA')[0]; othItemDisallowUs28To44DA.value = coalesce(othItemDisallowUs28To44DA.value);
	var anyOthIncNotInclInExpDisallowPL = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.anyOthIncNotInclInExpDisallowPL')[0];
	var incProfDecLossAccICDSAdj = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incProfDecLossAccICDSAdj')[0];  incProfDecLossAccICDSAdj.value = coalesce(incProfDecLossAccICDSAdj.value);
	var totAfterAddToPLDeprOthSpecInc =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.totAfterAddToPLDeprOthSpecInc')[0]; totAfterAddToPLDeprOthSpecInc.value = coalesce(totAfterAddToPLDeprOthSpecInc.value);
	var profDeviatDueAcctMeth = document.getElementsByName('partaoi.profDeviatDueAcctMeth')[0]; profDeviatDueAcctMeth.value = coalesce(profDeviatDueAcctMeth.value);
	var profDeviatDueAcctMethN = document.getElementsByName('partaoi.decProfDeviatDueAcctMeth')[0]; profDeviatDueAcctMethN.value = coalesce(profDeviatDueAcctMethN.value);
	var effectOnPL = document.getElementsByName('partaoi.methodOfValClgStk.effectOnPL')[0]; effectOnPL.value = coalesce(effectOnPL.value);
	var effectOnPLN = document.getElementsByName('partaoi.methodOfValClgStk.decProOrIncLossUs145_A')[0]; effectOnPLN.value = coalesce(effectOnPLN.value);
	var adjICDS = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.decProfIncLossAccICDSAdj')[0];adjICDS.value = coalesce(adjICDS.value);

	var deductUs321Iii =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deductUs321Iii')[0]; deductUs321Iii.value = coalesce(deductUs321Iii.value);
	var debPLUs35ExcessAmt = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.debPLUs35ExcessAmt')[0];  debPLUs35ExcessAmt.value = coalesce(debPLUs35ExcessAmt.value);
	var amtDisallUs40NowAllow =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.amtDisallUs40NowAllow')[0];  amtDisallUs40NowAllow.value = coalesce(amtDisallUs40NowAllow.value);
	var amtDisallUs43BNowAllow =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.amtDisallUs43BNowAllow')[0]; amtDisallUs43BNowAllow.value = coalesce(amtDisallUs43BNowAllow.value);

	var anyOthAmtAllDeduct =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.anyOthAmtAllDeduct')[0]; anyOthAmtAllDeduct.value = coalesce(anyOthAmtAllDeduct.value);
	var decProfIncLossAccICDSAdj =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.decProfIncLossAccICDSAdj')[0]; decProfIncLossAccICDSAdj.value = coalesce(decProfIncLossAccICDSAdj.value);
	var totDeductionAmts =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.totDeductionAmts')[0]; totDeductionAmts.value = coalesce(totDeductionAmts.value);
	var plAftAdjDedBusOthThanSpec =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.plAftAdjDedBusOthThanSpec')[0]; plAftAdjDedBusOthThanSpec.value = coalesce(plAftAdjDedBusOthThanSpec.value);

	var section44AD = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD')[0];  section44AD.value = coalesce(section44AD.value);
	var section44ADA = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44ADA')[0];  section44ADA.value = coalesce(section44ADA.value);
	var section44AE = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AE')[0];  section44AE.value = coalesce(section44AE.value);
	var section44B = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44B')[0];  section44B.value = coalesce(section44B.value);
	var section44BB = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44BB')[0];  section44BB.value = coalesce(section44BB.value);
	var section44BBA = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44BBA')[0];  section44BBA.value = coalesce(section44BBA.value);
	var section44BBB = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44BBB')[0];  section44BBB.value = coalesce(section44BBB.value);
	var section44D = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44D')[0];  section44D.value = coalesce(section44D.value);
	var section44DA = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44DA')[0];  section44DA.value = coalesce(section44DA.value);
	var section44DB = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44DB')[0];  section44DB.value = coalesce(section44DB.value);
	var firstSchTAct155B = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.firstSchTAct.115B')[0]; firstSchTAct155B.value = coalesce(firstSchTAct155B.value);
	var firstSchTActOther = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.firstSchTAct.other')[0]; firstSchTActOther.value = coalesce(firstSchTActOther.value);
	var totDeemedProfitBusUs = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.totDeemedProfitBusUs')[0];   totDeemedProfitBusUs.value = coalesce(totDeemedProfitBusUs.value);
	var netPLAftAdjBusOthThanSpec =  document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netPLAftAdjBusOthThanSpec')[0];   netPLAftAdjBusOthThanSpec.value = coalesce(netPLAftAdjBusOthThanSpec.value);
	var schSI115B = document.getElementsByName('scheduleSI.splCodeRateTax[2].splRateInc')[0]; schSI115B.value = coalesce(schSI115B.value);

	var netPLBusOthThanSpec7A7B7CI = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7CI')[0];   netPLBusOthThanSpec7A7B7CI.value = coalesce(netPLBusOthThanSpec7A7B7CI.value);
	var netPLBusOthThanSpec7A7B7C = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7C')[0];   netPLBusOthThanSpec7A7B7C.value = coalesce(netPLBusOthThanSpec7A7B7C.value);

	var netPLFrmSpecBus = document.getElementsByName('itr5ScheduleBP.specBusinessInc.netPLFrmSpecBus')[0]; netPLFrmSpecBus.value = coalesce(netPLFrmSpecBus.value);
	var additionUs28To44DA = document.getElementsByName('itr5ScheduleBP.specBusinessInc.additionUs28To44DA')[0]; additionUs28To44DA.value = coalesce(additionUs28To44DA.value);
	var deductUs28To44DA = document.getElementsByName('itr5ScheduleBP.specBusinessInc.deductUs28To44DA')[0];  deductUs28To44DA.value = coalesce(deductUs28To44DA.value);
	var adjustedPLFrmSpecuBus = document.getElementsByName('itr5ScheduleBP.specBusinessInc.adjustedPLFrmSpecuBus')[0];  adjustedPLFrmSpecuBus.value = coalesce(adjustedPLFrmSpecuBus.value);

	var netPLFrmSpecifiedBus = document.getElementsByName('itr5ScheduleBP.specifiedBusinessInc.netPLFrmSpecifiedBus')[0];  netPLFrmSpecifiedBus.value = coalesce(netPLFrmSpecifiedBus.value);
	var addSec28To44DA = document.getElementsByName('itr5ScheduleBP.specifiedBusinessInc.addSec28To44DA')[0]; addSec28To44DA.value = coalesce(addSec28To44DA.value);
	var dedSec28To44DAOTDedSec35AD = document.getElementsByName('itr5ScheduleBP.specifiedBusinessInc.dedSec28To44DAOTDedSec35AD')[0];  dedSec28To44DAOTDedSec35AD.value = coalesce(dedSec28To44DAOTDedSec35AD.value);
	var profitLossSpecifiedBusiness = document.getElementsByName('itr5ScheduleBP.specifiedBusinessInc.profitLossSpecifiedBusiness')[0]; profitLossSpecifiedBusiness.value = coalesce(profitLossSpecifiedBusiness.value);

	var dedSec35AD = document.getElementsByName('itr5ScheduleBP.specifiedBusinessInc.deductionUs35AD')[0]; dedSec35AD.value = coalesce(dedSec35AD.value);
	var profitLossSpecifiedBusFinal = document.getElementsByName('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal')[0]; profitLossSpecifiedBusFinal.value = coalesce(profitLossSpecifiedBusFinal.value);
	var incChrgUnHdProftGain = document.getElementsByName('itr5ScheduleBP.incChrgUnHdProftGain')[0]; incChrgUnHdProftGain.value = coalesce(incChrgUnHdProftGain.value);

	/*dedSec35AD.value = eval(
			parseInt(coalesceSetRet('itr5ScheduleBP.specifiedBusinessInc.deductionUs35AD1'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.specifiedBusinessInc.deductionUs35AD1A'),10)
			);*/

	deemIncUs3380HHD80IA.value = eval(
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs32AC'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs32AD'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs33AB'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs33ABA'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs35ABA'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs35ABB'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs35AC'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs40A3A'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs33AC'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs72A'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs80HHD'),10)+
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemIncUs80IA'),10)
			);

	var tab = document.getElementById('scheduleBP1');
	var Count_SCH_BP=document.getElementsByName('Count_SCH_BP')[0]; Count_SCH_BP.value =0;

	for(var i = 0; i < tab.rows.length-3; i++) {

		Count_SCH_BP.value = eval(parseInt(Count_SCH_BP.value,10) + parseInt(coalesce(document.getElementsByName('itr5ScheduleBP.otherExempt['+i+'].totalAmount')[0].value),10));

	}
		document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incCredPL.othExempInc')[0].value = addBPExmptInc('scheduleBP1');
        profBfrTaxPL.value = eval(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.pbt')[0].value)) + eval(coalesceSetRet('partapl.noBooksOfAccPL.totalBusProf'));
        //11. Depreciation and amoritisation debited to profit and loss account. as from 42 of part A- P&L
        depreciationDebPLCosAct.value = zeroOrMore(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.depreciationAmort')[0].value));

        // 12. Depreciation allowable under section 32(1)(ii) (column 6 of Schedule-DEP)
        depreciationAllowUs321Ii.value = coalesce(document.getElementsByName('scheduleDEP.summaryFromDeprSch.totalDepreciation')[0].value);
        // 14. Amounts debited to the profit and loss account, to the extent disallowable under section 36 (6p of Part-OI)
        amtDebPLDisallowUs36.value = coalesce(document.getElementsByName('partaoi.amtDisallUs36.totAmtDisallUs36')[0].value);
        // 15. Amounts debited to the profit and loss account, to the extent disallowable under section 37 (7h of Part-OI)
        amtDebPLDisallowUs37.value = coalesce(document.getElementsByName('partaoi.amtDisallUs37.totAmtDisallUs37')[0].value);
        // 16. Amounts debited to the profit and loss account, to the extent disallowable under section 40 (8Af of Part-OI)
        amtDebPLDisallowUs40.value = coalesce(document.getElementsByName('partaoi.amtDisallUs40.totAmtDisallUs40')[0].value);
        // 17. Amounts debited to the profit and loss account, to the extent disallowable under section 40A (9f of Part-OI)
        amtDebPLDisallowUs40A.value = coalesce(document.getElementsByName('partaoi.amtDisallUs40A.totAmtDisallUs40A')[0].value);
        // 18. Any amount debited to profit and loss account of the previous year but disallowable under section 43B (11g of Part-OI)
        amtDebPLDisallowUs43B.value = coalesce(document.getElementsByName('partaoi.amtDisall43B.amtUs43B.totAmtUs43B')[0].value);
        // 26. Amount of deduction under section 35 in excess of the amount debited to profit and loss account (item vii(4) of Schedule ESR)
        debPLUs35ExcessAmt.value = coalesce(document.getElementsByName('scheduleESR.deductionUs35.totUs35.deductUs35.excessAmtOverDebPL')[0].value);
        // 27. Any amount disallowed under section 40 in any preceding previous year but allowable during the previous year(8B of Part-OI)
        amtDisallUs40NowAllow.value = coalesce(document.getElementsByName('partaoi.amtDisallUs40.anyAmtOfSec40AllowPrevYr')[0].value);
        // 28. Any amount disallowed under section 43B in any preceding previous year but allowable during the previous year(10 g of Part-OI)
        amtDisallUs43BNowAllow.value = coalesce(document.getElementsByName('partaoi.amtDisallUs43BPyNowAll.amtUs43B.totAmtUs43B')[0].value);
        //33 new
        adjICDS.value = eval(parseInt(profDeviatDueAcctMethN.value,10)) + eval(parseInt(effectOnPLN.value,10));
        //25 new
        incProfDecLossAccICDSAdj.value = eval(parseInt(profDeviatDueAcctMeth.value,10)) + eval(parseInt(effectOnPL.value,10));

        // 34. Deduction allowable under section 32(1)(iii)
        totDeemedProfitBusUs.value = eval(parseInt(section44AD.value,10))  + eval(parseInt(section44ADA.value,10))  + eval(parseInt(section44AE.value,10)) + eval(parseInt(section44B.value,10)) + eval(parseInt(section44BB.value,10)) + eval(parseInt(section44BBA.value,10)) + eval(parseInt(section44BBB.value,10)) + eval(parseInt(section44D.value,10)) + eval(parseInt(section44DA.value,10)) + eval(parseInt(section44DB.value,10)) + eval(parseInt(firstSchTAct155B.value,10)) + eval(parseInt(firstSchTActOther.value,10));
        // 4. Profit or loss included in 1, 44AE etc Chapter-XII-G/ populates from point 33(xi)
       /* plUs44SChapXIIG.value = eval(parseInt(totDeemedProfitBusUs.value,10));*/
        incUS115B.value=eval(parseInt(firstSchTAct155B.value,10));
        schSI115B.value=eval(parseInt(incUS115B.value,10));
        incUsOther.value=eval(parseInt(totDeemedProfitBusUs.value,10))-eval(parseInt(firstSchTAct155B.value,10));
        // 5. Income credited to Profit and Loss account (included in 1)which is exempt
        totExempInc.value = eval(parseInt(firmShareInc.value ,10)) + eval(parseInt(aopboiSharInc.value ,10)) + eval(parseInt(Count_SCH_BP.value,10));
        // 6. Balance ((1- 2a - 2b - 3a -3b - 3c - 3d - 4 - 5d))
        balancePLOthThanSpecBus.value = eval(parseInt(profBfrTaxPL.value ,10)) - eval(parseInt(netPLFromSpecBus.value ,10)) - eval(parseInt(netProfLossSpecifiedBus.value,10)) - eval(parseInt(incRecCredPLOthHeadsHp.value,10)) - eval(parseInt(incRecCredPLOthHeadsCg.value,10)) - eval(parseInt(incRecCredPLOthHeadsOs.value,10)) - eval(parseInt(incRecCredPL5BBFHeadsOs.value,10)) - eval(parseInt(incRecCredPL5BBGHeadsOs.value,10)) - eval(parseInt(incUS115B.value,10)) - eval(parseInt(incUsOther.value,10)) - eval(parseInt(totExempInc.value,10));
        // 9. Total (7 + 8)
        totExpDebPL.value = eval(parseInt(expDebToPLOthHeadsHouseProperty.value,10)) + eval(parseInt(expDebToPLOthHeadsCapitalGains.value,10)) + eval(parseInt(expDebToPLOthHeadsOthSources.value,10))  + eval(parseInt(expDebToPLOthHeadsUndSec115BBF.value,10)) + eval(parseInt(expDebToPLOthHeadsUndSec115BBG.value,10))  + eval(parseInt(expDebToPLExemptInc.value,10)) ;
        // 10. Adjusted profit or loss (6+9)
        adjustedPLOthThanSpecBus.value = eval(parseInt(balancePLOthThanSpecBus.value,10)) + eval(parseInt(totExpDebPL.value,10));
        // 12. Depreciation allowable under Income-tax Act
        totDeprAllowITAct.value = eval(parseInt(depreciationAllowUs321Ii.value,10)) + eval(parseInt(depreciationAllowUs321I.value,10));
        // 13. Profit or loss after adjustment for depreciation (10 +11 - 12iii)
        adjustPLAfterDeprOthSpecInc.value = eval(parseInt(adjustedPLOthThanSpecBus.value,10)) + eval(parseInt(depreciationDebPLCosAct.value,10)) - eval(parseInt(totDeprAllowITAct.value,10));
        // 25. Total (14 + 15 + 16 + 17 + 18 + 19 + 20 + 21+22 +23+24)
        totAfterAddToPLDeprOthSpecInc.value = eval(parseInt(amtDebPLDisallowUs36.value,10)) + eval(parseInt(deemIncUs43ca.value,10)) + eval(parseInt(amtDebPLDisallowUs37.value,10)) + eval(parseInt(amtDebPLDisallowUs40.value,10)) + eval(parseInt(amtDebPLDisallowUs40A.value,10)) + eval(parseInt(amtDebPLDisallowUs43B.value,10)) + eval(parseInt(interestDisAllowUs23SMEAct.value,10)) + eval(parseInt(deemIncUs41.value,10)) + eval(parseInt(deemIncUs3380HHD80IA.value,10)) + eval(parseInt(othItemDisallowUs28To44DA.value,10)) + eval(parseInt(anyOthIncNotInclInExpDisallowPL.value,10)) + eval(parseInt(incProfDecLossAccICDSAdj.value,10));

        var deductAllowus32ad= parseInt(document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deductAllowus32ad')[0].value);

        deductAllowus32ad= coalesce(deductAllowus32ad);
        // 32. Total (26 + 27+28 +29 +30c + 31)
        totDeductionAmts.value = eval(parseInt(deductUs321Iii.value,10)) + eval(parseInt(debPLUs35ExcessAmt.value,10)) + eval(parseInt(amtDisallUs40NowAllow.value,10)) + eval(parseInt(amtDisallUs43BNowAllow.value,10)) + eval(parseInt(anyOthAmtAllDeduct.value,10)
        		+eval(deductAllowus32ad))+eval(parseInt(decProfIncLossAccICDSAdj.value,10));

        // 33. Income (13 + 25 � 32)
        plAftAdjDedBusOthThanSpec.value = eval(parseInt(adjustPLAfterDeprOthSpecInc.value,10)) + eval(parseInt(totAfterAddToPLDeprOthSpecInc.value,10)) - eval(parseInt(totDeductionAmts.value,10));


        // 35. Net profit or loss from business or profession other than speculative and specified business(33 + 34x)
        	netPLAftAdjBusOthThanSpec.value = eval(parseInt(plAftAdjDedBusOthThanSpec.value,10)) + eval(parseInt(totDeemedProfitBusUs.value,10));
        // 37. Net Profit or loss from business or profession other than speculative business and specified business after applying rule  7A, 7B  or 7C, if applicable (If rule 7A, 7B or 7C is not applicable, enter same figure as in 36)

		coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7CI');

		if(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7CI') != 0) {
			document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7C')[0].value =
				coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7CI');
		} else {
			document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7C')[0].value =
				coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.netPLAftAdjBusOthThanSpec');
		}

        // 38. Net profit or loss from speculative business as per profit or loss account - auto populates from field 2A of Sch BP
        netPLFrmSpecBus.value = eval(parseInt(netPLFromSpecBus.value,10)) ;


        // B40. Computation of income from speculative business
        adjustedPLFrmSpecuBus.value = eval(parseInt(netPLFrmSpecBus.value,10)) + eval(parseInt(additionUs28To44DA.value,10)) - eval(parseInt(deductUs28To44DA.value,10));
        // 42. Net profit or loss from specified business as per profit or loss account (populates from 2B of Sch BP)
        netPLFrmSpecifiedBus.value = eval(parseInt(netProfLossSpecifiedBus.value,10));
        // 45. Profit or loss from specified business (42+43-44)
        profitLossSpecifiedBusiness.value = eval(parseInt(netPLFrmSpecifiedBus.value,10)) + eval(parseInt(addSec28To44DA.value,10)) - eval(parseInt(dedSec28To44DAOTDedSec35AD.value,10));
        // 47 Profit or loss from specified business (44-45) (enter nil if loss)
        profitLossSpecifiedBusFinal.value = eval(parseInt(profitLossSpecifiedBusiness.value,10)) - eval(parseInt(dedSec35AD.value,10));

        var tempPLFrmSpecuBus = adjustedPLFrmSpecuBus.value ;
        var tempSpecifiedBusFinal = profitLossSpecifiedBusFinal.value;

        if(parseInt(tempPLFrmSpecuBus,10) < 0){
        	tempPLFrmSpecuBus = parseInt(0,10);
        }
        if(parseInt(tempSpecifiedBusFinal,10) < 0){
        	tempSpecifiedBusFinal = parseInt(0,10);
        }
        // D. Income chargeable under the head 'Profits and gains' (A37+B41+C47)
        incChrgUnHdProftGain.value = eval(parseInt(netPLBusOthThanSpec7A7B7C.value,10)) + eval(parseInt(tempPLFrmSpecuBus,10)) + eval(parseInt(tempSpecifiedBusFinal,10));

        setOffSchBP();

	}catch(e){
		alert(' error in calcSchBP() =  ' + e.stack);
	}
}

function calcculateAnyOtherInc(){
	var totalOSIntGross = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.anyOthIncNotInclInExpDisallowPL')[0];
	totalOSIntGross.value = eval(
			parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.anyOthIncNotInc.Salary'),10)
			+ parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.anyOthIncNotInc.Bonus'),10)
			+ parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.anyOthIncNotInc.Interest'),10)
			+ parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.anyOthIncNotInc.Others'),10)
			+ parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.anyOthIncNotInc.Commission'),10)
		);

}

function setOffSchBP() {
	try{
		prefillSchBP();
		setOffBPBusLoss();
	} catch(e){
		alert('error in setOffSchBP()=' + e.stack);
	}

}

function prefillSchBP() {
	try{
		//prefilling column :: Income from speculative business
		//Field (B40 of schedule BP)

		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.speculativeInc.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('itr5ScheduleBP.specBusinessInc.adjustedPLFrmSpecuBus'));

		//prefilling column ::  	Income from specified business
		//Field (C46 of schedule BP)
		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.specifiedInc.incOfCurYrUnderThatHead')[0].value =
			zeroOrMore(coalescePath('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal'));

		// populating losses Business loss set off
		//Field (A36 of schedule BP)
		coalescePath('itr5ScheduleBP.busSetoffCurYr.lossSetOffOnBusLoss');
		if(!isPostv('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7C')){
			document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.lossSetOffOnBusLoss')[0].value =
				Math.abs(coalescePath('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7C'));
		}else{
			document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.lossSetOffOnBusLoss')[0].value = 0;
		}
	} catch(e){
		alert('error in prefillSchBP()=' + e.stack);
	}
}

function setOffBPBusLoss() {
	try{
		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.speculativeInc.busLossSetoff')[0].value = 0;
		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.specifiedInc.busLossSetoff')[0].value = 0;

		/*
		Order of adjustment :-
			1) Income from speculative business
			2) Income from specified business
			*/

		var setOffRem = coalescePath('itr5ScheduleBP.busSetoffCurYr.lossSetOffOnBusLoss')-
		coalescePath('itr5ScheduleBP.busSetoffCurYr.speculativeInc.incOfCurYrUnderThatHead');

		// 1. Income from speculative business
		if(parseInt(setOffRem,10)>=0){
			document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.speculativeInc.busLossSetoff')[0].value =
					coalescePath('itr5ScheduleBP.busSetoffCurYr.speculativeInc.incOfCurYrUnderThatHead');

		}else{
			document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.speculativeInc.busLossSetoff')[0].value =
				coalescePath('itr5ScheduleBP.busSetoffCurYr.lossSetOffOnBusLoss');
			setOffRem =0 ;
		}

		//2. Income from specified business
		var prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem,10) - coalescePath('itr5ScheduleBP.busSetoffCurYr.specifiedInc.incOfCurYrUnderThatHead');

		if(parseInt(setOffRem,10)>=0){
				document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.specifiedInc.busLossSetoff')[0].value =
					coalescePath('itr5ScheduleBP.busSetoffCurYr.specifiedInc.incOfCurYrUnderThatHead');
		}else{
				document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.specifiedInc.busLossSetoff')[0].value = prevSetOffRem;
			setOffRem =0 ;
		}

		// Income from speculative business income remaining after set off
		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.speculativeInc.incOfCurYrAfterSetOff')[0].value=
			coalescePath('itr5ScheduleBP.busSetoffCurYr.speculativeInc.incOfCurYrUnderThatHead')-
			coalescePath('itr5ScheduleBP.busSetoffCurYr.speculativeInc.busLossSetoff');

		//  	Income from specified business income remaining after set off
		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.specifiedInc.incOfCurYrAfterSetOff')[0].value=
			coalescePath('itr5ScheduleBP.busSetoffCurYr.specifiedInc.incOfCurYrUnderThatHead')-
			coalescePath('itr5ScheduleBP.busSetoffCurYr.specifiedInc.busLossSetoff');


		//total loss setoff
		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.totLossSetOffOnBus')[0].value=
			coalescePath('itr5ScheduleBP.busSetoffCurYr.speculativeInc.busLossSetoff')+
			coalescePath('itr5ScheduleBP.busSetoffCurYr.specifiedInc.busLossSetoff');

		//Loss remaining after set-off
		document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.lossRemainSetOffOnBus')[0].value=
			coalescePath('itr5ScheduleBP.busSetoffCurYr.lossSetOffOnBusLoss')-coalescePath('itr5ScheduleBP.busSetoffCurYr.totLossSetOffOnBus');
	} catch(e){
		alert('error in setOffBPBusLoss()=' + e.stack);
	}
}




function calcPartAOI(){
	try{
		//5f
		coalesceSetRet('partaoi.noCredToPLAmt.totNoCredToPLAmt');
		document.getElementsByName('partaoi.noCredToPLAmt.totNoCredToPLAmt')[0].value = eval(
			parseInt(coalesceSetRet('partaoi.noCredToPLAmt.section28Items'),10)+
			parseInt(coalesceSetRet('partaoi.noCredToPLAmt.proformaCreditsDue'),10)+
			parseInt(coalesceSetRet('partaoi.noCredToPLAmt.prevYrEscalClaim'),10)+
			parseInt(coalesceSetRet('partaoi.noCredToPLAmt.othItemInc'),10)+
			parseInt(coalesceSetRet('partaoi.noCredToPLAmt.capReceipt'),10));

		//6p
		coalesceSetRet('partaoi.amtDisallUs36.totAmtDisallUs36');
		document.getElementsByName('partaoi.amtDisallUs36.totAmtDisallUs36')[0].value = eval(
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.stkInsurPrem'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.empHealthInsurPrem'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.empBonusCommSum'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.intOnBorrCap'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.zeroCoupBondDisc'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.recogPFContribAmt'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.appSuperAnnFundAmt'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.pensionScheme80CCD'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.appGratFundAmt'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.othFundAmt'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.esiAmt'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.badDebtDoubtAmt'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.badDebtDoubtProvn'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.specResrvTranfr'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.famPlanPromoExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.securityAmt'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.expGovtApprovedSugarPrice'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.anyOthDisallowance'),10)
			);

		//6qiii
		coalesceSetRet('partaoi.amtDisallUs36.noOfEmployeesEmployed.total');
		document.getElementsByName('partaoi.amtDisallUs36.noOfEmployeesEmployed.total')[0].value = eval(
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.noOfEmployeesEmployed.deployedInIndia'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs36.noOfEmployeesEmployed.deployedOutSideIndia'),10)
			);

		//7h
		coalesceSetRet('partaoi.amtDisallUs37.totAmtDisallUs37');
		document.getElementsByName('partaoi.amtDisallUs37.totAmtDisallUs37')[0].value = eval(
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.capitalExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.personalExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.businessExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.politicPartyExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.lawVoilatPenalExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.othPenalFineExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.offenceExp'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.contigentLiability'),10)+
			parseInt(coalesceSetRet('partaoi.amtDisallUs37.othAmtNotAllowUs37'),10)
			);

		//8j
		coalesceSetRet('partaoi.amtDisallUs40.totAmtDisallUs40');
		document.getElementsByName('partaoi.amtDisallUs40.totAmtDisallUs40')[0].value = eval(
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.nonCompChapXVIIBAmt'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.nonCompChapXVIIBAmt40aia'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.nonComp40aibChapXVIIBAmt'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.nonCompChapXVIIBAmt40aiii'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.taxAmtOnProfits'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.wtAmt'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.royaltyAmt'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.intSalBonPartner'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40.anyOthDisallowance'),10)
			);

		//9f
		coalesceSetRet('partaoi.amtDisallUs40A.totAmtDisallUs40A');
		document.getElementsByName('partaoi.amtDisallUs40A.totAmtDisallUs40A')[0].value = eval(
				parseInt(coalesceSetRet('partaoi.amtDisallUs40A.amtPaidUs40A2B'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40A.amtGT20KCash'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40A.provPmtGrat'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40A.contToSetupTrust'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs40A.anyOthDisallowance'),10)
			);

		//10g
		coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.totAmtUs43B');
		document.getElementsByName('partaoi.amtDisallUs43BPyNowAll.amtUs43B.totAmtUs43B')[0].value = eval(
				parseInt(coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.taxDutyCesAmt'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.contToEmpPFSFGF'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.empBonusComm'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.intPayaleToFI'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.intPayaleToFISchBank'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.leaveEncashPayable'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisallUs43BPyNowAll.amtUs43B.railwayAsstsPyble'),10)
				);

		//11h
		coalesceSetRet('partaoi.amtDisall43B.amtUs43B.totAmtUs43B');
		document.getElementsByName('partaoi.amtDisall43B.amtUs43B.totAmtUs43B')[0].value = eval(
				parseInt(coalesceSetRet('partaoi.amtDisall43B.amtUs43B.taxDutyCesAmt'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisall43B.amtUs43B.contToEmpPFSFGF'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisall43B.amtUs43B.empBonusComm'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisall43B.amtUs43B.intPayaleToFI'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisall43B.amtUs43B.intPayaleToFISchBank'),10)+
				parseInt(coalesceSetRet('partaoi.amtDisall43B.amtUs43B.railwayAsstsPyble'),10) +
				parseInt(coalesceSetRet('partaoi.amtDisall43B.amtUs43B.leaveEncashPayable'),10)
				);

		//12e
		coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.totExciseCustomsVAT');
		document.getElementsByName('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.totExciseCustomsVAT')[0].value = eval(
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.unionExciseDuty'),10)+
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.serviceTax'),10)+
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.vaTorSaleTax'),10)+
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.centralGoodServiceTax'),10)+
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.stateGoodServiceTax'),10)+
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.integratedGoodServiceTax'),10)+
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.unionTerrGoodServiceTax'),10)+
				parseInt(coalesceSetRet('partaoi.amtExciseCustomsVATOutstanding.exciseCustomsVAT.othDutyTaxCess'),10)
				);

		//13
		coalesceSetRet('partaoi.deemedProfUs33ABs');
		document.getElementsByName('partaoi.deemedProfUs33ABs')[0].value = eval(
				parseInt(coalesceSetRet('partaoi.deemedProfUs33AB'),10)+
				parseInt(coalesceSetRet('partaoi.deemedProfUs33ABA'),10)+
				parseInt(coalesceSetRet('partaoi.deemedProfUs33AC'),10)
				);

	}catch(e){
		alert(e.stack);
	}
}

function calcUD(){
	try{
		var table = document.getElementById('scheduleUD');
		var rowCount = table.rows.length;
		var sumTotal=0;
		for(var i=0;i<rowCount-5;i++){
			if(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtBFUD')[0].value!='' || document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtDepCurYr')[0].value!=''
                                 || document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountBFUA')[0].value!='' || document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountASACYIncome')[0].value!=''  )
                             {

				document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balCFNY')[0].value =
				eval(parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtBFUD')[0].value) ,10)-
				parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtDepCurYr')[0].value) ,10));

                               document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balOfAllowance')[0].value =
				eval(parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountBFUA')[0].value) ,10)-
				parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountASACYIncome')[0].value) ,10));



				if(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balCFNY')[0].value <0)  {
					document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balCFNY')[0].value=0;

				}
                                if(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balOfAllowance')[0].value <0)  {
					document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balOfAllowance')[0].value=0;

				}

			}
                        else{
			 document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balCFNY')[0].value = '';
			}
				sumTotal = eval( parseInt(sumTotal,10) + parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balCFNY')[0].value),10));

		}


		coalesceSetRet('itrScheduleUD.totalBalCFNY');
		calcTotalUD();
	}
        catch(e){
		alert(e);
	}
}
function calcTotalUD(){
    try{
        var table = document.getElementById('scheduleUD');
        var rowCount = table.rows.length;
        var totalamtBFUD = 0;
        var totalamtDepCurYr = 0;
        var totalbalCFNY = 0;
        var totalamountBFUA = 0;
        var totalamountASACYIncome = 0;
        var totalbalOfAllowance = 0;
        for(var i=0;i<rowCount-5;i++){

	         totalamtBFUD=eval( parseInt(totalamtBFUD,10) + parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtBFUD')[0].value),10));
	         totalamtDepCurYr=eval( parseInt(totalamtDepCurYr,10) + parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtDepCurYr')[0].value),10));
	         totalbalCFNY=eval( parseInt(totalbalCFNY,10) + parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balCFNY')[0].value),10));
	         totalamountBFUA=eval( parseInt(totalamountBFUA,10) + parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountBFUA')[0].value),10));
	         totalamountASACYIncome=eval( parseInt(totalamountASACYIncome,10) + parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountASACYIncome')[0].value),10));
	         totalbalOfAllowance=eval( parseInt(totalbalOfAllowance,10) + parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].balOfAllowance')[0].value),10));

              if((document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtBFUD')[0].value)< (document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtDepCurYr')[0].value)) {
					document.getElementsByName('itrScheduleUD.totalamtDepCurYr')[0].value=0;
              }
		 }

		var CurYrbalCFNY = parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD.CurYrbalCFNY')[0].value),10);
		var CurYrbalOfAllowance = parseInt(coalesce(document.getElementsByName('itrScheduleUD.scheduleUD.CurYrbalOfAllowance')[0].value),10);

	    document.getElementsByName('itrScheduleUD.totalamtBFUD')[0].value =parseInt(totalamtBFUD,10);
	    document.getElementsByName('itrScheduleUD.totalamtDepCurYr')[0].value =parseInt(totalamtDepCurYr,10);
	    document.getElementsByName('itrScheduleUD.totalBalCFNY')[0].value =parseInt(totalbalCFNY,10)+parseInt(CurYrbalCFNY,10);
	    document.getElementsByName('itrScheduleUD.totalamountBFUA')[0].value =parseInt(totalamountBFUA,10);
	    document.getElementsByName('itrScheduleUD.amountASACYIncome')[0].value =parseInt(totalamountASACYIncome,10);
	    document.getElementsByName('itrScheduleUD.totalbalOfAllowance')[0].value =parseInt(totalbalOfAllowance,10)+parseInt(CurYrbalOfAllowance,10);

	     if(document.getElementsByName('itrScheduleUD.totalamtBFUD')[0].value <0)  {
				document.getElementsByName('itrScheduleUD.totalamtBFUD')[0].value=0;
	     }
	     if(document.getElementsByName('itrScheduleUD.totalamtDepCurYr')[0].value <0)  {
				document.getElementsByName('itrScheduleUD.totalamtDepCurYr')[0].value=0;
	     }
	     if(document.getElementsByName('itrScheduleUD.totalBalCFNY')[0].value <0)  {
				document.getElementsByName('itrScheduleUD.totalBalCFNY')[0].value=0;
	     }

	     if(document.getElementsByName('itrScheduleUD.totalamountBFUA')[0].value <0)  {
				document.getElementsByName('itrScheduleUD.totalamountBFUA')[0].value=0;
	     }
	     if(document.getElementsByName('itrScheduleUD.amountASACYIncome')[0].value <0)  {
				document.getElementsByName('itrScheduleUD.amountASACYIncome')[0].value=0;
	     }
	     if(document.getElementsByName('itrScheduleUD.totalbalOfAllowance')[0].value <0)  {
				document.getElementsByName('itrScheduleUD.totalbalOfAllowance')[0].value=0;
	     }
    }
     catch(e){
        alert(e.stack);
    }
}

function deleteRowTableScheduleUD(tx,ty,tz){
	deleteRowTableUD(tx,ty,tz);
	calcUD();
}








function addRowToTable80(tx,ty,tz,tn){
	addRowToTable(tx,ty,tz);
	var table = document.getElementById(tx);
	var rowCount = table.rows.length;
	for(var i=0;i<rowCount-2;i++){
            var name=tn+'['+i+']';
			document.getElementsByName(name)[0].parentNode.previousSibling.previousSibling.innerHTML=
				'Undertaking No.'+eval(parseInt(i,10)+1);
	}
}

function deleteRowTableTaxDed80(tx,ty,tz,tn){
	deleteRowTable(tx,ty,tz);

	var table = document.getElementById(tx);
	var rowCount = table.rows.length;
	for(var i=0;i<rowCount-2;i++){
            var name=tn+'['+i+']';
			document.getElementsByName(name)[0].parentNode.previousSibling.previousSibling.innerHTML=
				'Undertaking No.'+eval(parseInt(i,10)+1);
	}
}

function calc10AA(){
	try{
		var table = document.getElementById('taxDed10AAId');
		var rowCount = table.rows.length;
		var sumTotal=0;
		for(var i=0;i<rowCount-4;i++){
			sumTotal = eval(parseInt(sumTotal,10) + parseInt(coalesce(document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail['+i+'].dedFromUndertaking')[0].value),10));
		}
		coalesceSetRet('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub');
		document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub')[0].value  = parseInt(coalesce(sumTotal),10);

	}catch(e){
			alert(e.stack);
	}
}





function addRowToTable10AA(tx,ty,tz){
	addRowToTable(tx,ty,tz);
	var table = document.getElementById('taxDed10AAId');
	var rowCount = table.rows.length;
	for(var i=0;i<rowCount-3;i++){
			document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail['+i+'].dedFromUndertaking')[0].parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML=
				'Undertaking No.'+eval(parseInt(i,10)+1);
	}
}





function deleteRowTableTaxDed10AAId(tx,ty,tz){
	deleteRowTable(tx,ty,tz);
	calc10AA();
	var table = document.getElementById('taxDed10AAId');
	var rowCount = table.rows.length;
	for(var i=0;i<rowCount-3;i++){
			document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail['+i+'].dedFromUndertaking')[0].parentNode.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML=
				'Undertaking No.'+eval(parseInt(i,10)+1);
	}
}
function validateUD(){
	var tab = document.getElementById('scheduleUD');
	var allInputTags = tab.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("amtDepCurYr$")) {
				if(parseInt(allInputTags[i].value,10) >  parseInt(allInputTags[i-1].value,10)){
					j.setFieldError(allInputTags[i].name,'Amount of depreciation set-off against the current year income cannot be more than Amount of brought forward unabsorbed depreciation.');
					addError(allInputTags[i],'Amount of depreciation set-off against the current year income cannot be more than Amount of brought forward unabsorbed depreciation.',true);
				}
			}
                        if (allInputTags[i].name.match("amountASACYIncome$")) {
				if(parseInt(allInputTags[i].value,10) >  parseInt(allInputTags[i-1].value,10)){
					j.setFieldError(allInputTags[i].name,'Amount of allowance set-off against the current year income cannot exceed amount of brought forward unabsorbed allowance.');
					addError(allInputTags[i],'Amount of allowance set-off against the current year income cannot exceed amount of brought forward unabsorbed allowance.',true);
				}
			}
		}
}
function appendzeroto5or6TCS() {
	var mainTab = document.getElementById('scheduleTCS');
	var mainTabRows = mainTab.rows.length;
	for (var i = 0; i < mainTabRows - 5; i++) {
		if (document.getElementsByName('scheduleTCS.tcs['+i+'].totalTCS')[0].value != '') {
			if(document.getElementsByName('scheduleTCS.tcs['+i+'].amountBF')[0].value>parseInt('0', 10)){
				j.setFieldError('scheduleTCS.tcs['+i+'].amountBF','Unclaimed TCS brought forward and details of TCS of current FY should be provided in different rows');
		        addErrorXHTML(document.getElementsByName('scheduleTCS.tcs[' + i + '].amountBF')[0],'Unclaimed TCS brought forward and details of TCS of current FY should be provided in different rows',true);
			}
		}
	}
}
function calculateTCS(){
	var TCS = parseInt('0' ,10);
	var tcsTAB = document.getElementById('scheduleTCS');
	var allInputTags = tcsTAB.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("amtTCSClaimedThisYear$")) {

			if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  eval(parseInt(coalesce(allInputTags[i-1].value),10) + parseInt(coalesce(allInputTags[i-2].value),10))){

					addError(allInputTags[i],'Amount claimed cannot exceed Total Tax collected',true);
					j.setFieldError(allInputTags[i].name,'Amount claimed cannot exceed Total Tax collected');
					allInputTags[i].value = '0';

					TCS = eval(parseInt(TCS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
				}else{
					TCS = eval(parseInt(TCS ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
				}
			allInputTags[i+1].value=eval(parseInt(isNVL(allInputTags[i-1].value) ,10) + parseInt(isNVL(allInputTags[i-2].value) ,10)-parseInt(isNVL(allInputTags[i].value) ,10));
			}
		}
	document.getElementsByName('partBTTI.taxPaid.taxesPaid.tcs')[0].value = parseInt(TCS,10);
	document.getElementsByName('scheduleTCS.totalTcSSalary')[0].value = parseInt(TCS,10);
	return TCS;
}


function calculatePL()
{

	var tableOprtRevTableId = document.getElementById('oprtRevTableId');
	var rowCountOprtRevTableId = tableOprtRevTableId.rows.length;
	var sumTotalOprtRevTableId=0;
	for(var i=0;i<rowCountOprtRevTableId-3;i++){
		sumTotalOprtRevTableId = eval(parseInt(sumTotalOprtRevTableId,10) +
										parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.otherOperatingRevenueDtls['+i+'].operatingRevenueAmt')[0].value),10));
	}
	var totExciseCustomsVAT2 = document.getElementsByName('partapl.creditsToPL.operatingRevenueTotAmt')[0];
	totExciseCustomsVAT2.value = coalesce(totExciseCustomsVAT2.value);
	totExciseCustomsVAT2.value =parseInt(sumTotalOprtRevTableId,10) ;

	var businessReceipts = document.getElementsByName('partapl.creditsToPL.businessReceipts')[0];
	businessReceipts.value = coalesce(businessReceipts.value);
	businessReceipts.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.saleOfGoods')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.saleOfServices')[0].value,10))+
		parseInt(totExciseCustomsVAT2.value,10));

	var profReceipts = document.getElementsByName('partapl.creditsToPL.plGrossReceipts')[0];
	profReceipts.value = coalesce(profReceipts.value);

	var totExciseCustomsVAT = document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.totExciseCustomsVAT')[0];
	totExciseCustomsVAT.value = coalesce(totExciseCustomsVAT.value);
	totExciseCustomsVAT.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.unionExciseDuty')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.serviceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.vaTorSaleTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.centralGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.stateGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.integratedGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.unionTerrGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.exciseCustomsVAT.othDutyTaxCess')[0].value,10)));

	var totRevenueFrmOperations1= document.getElementsByName('partapl.creditsToPL.totRevenueFrmOperations')[0];
	totRevenueFrmOperations1.value = coalesce(totRevenueFrmOperations1.value);
	totRevenueFrmOperations1.value= eval(
		parseInt(totExciseCustomsVAT.value,10)+
		parseInt(businessReceipts.value,10) +
		parseInt(profReceipts.value,10));

	var tableOthIncTableId = document.getElementById('othIncTableId');
	var rowCountOthIncTableId = tableOthIncTableId.rows.length;
	var sumTotalOthIncTableId=0;
	for(var i=0;i<rowCountOthIncTableId-3;i++){
		sumTotalOthIncTableId = eval(parseInt(sumTotalOthIncTableId,10) +
										parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.otherIncDtls['+i+'].amount')[0].value),10));
	}
	var miscOthIncome = document.getElementsByName('partapl.creditsToPL.othIncome.miscOthIncome')[0];
	miscOthIncome.value = coalesce(miscOthIncome.value);
	miscOthIncome.value =parseInt(sumTotalOthIncTableId,10) ;


	var totOthIncome2 = document.getElementsByName('partapl.creditsToPL.othIncome.totOthIncome')[0];
	totOthIncome2.value = coalesce(totOthIncome2.value);
	totOthIncome2.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.rentInc')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.comissions')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.dividends')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.interestInc')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.profitOnSaleFixedAsset')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.profitOnInvChrSTT')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.profitOnOthInv')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.profitOnCurrFluct')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.othIncome.profitOnAgriIncome')[0].value,10))+
		parseInt(miscOthIncome.value,10));

	var closingStock3= document.getElementsByName('partapl.creditsToPL.closingStockDtls.closingStock')[0];
	closingStock3.value = coalesce(closingStock3.value);
	closingStock3.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.closingStockDtls.rawMaterial')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.closingStockDtls.workInProgress')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.creditsToPL.closingStockDtls.finishedGoods')[0].value,10)));

	var totCreditsToPL4= document.getElementsByName('partapl.creditsToPL.totCreditsToPL')[0];
	totCreditsToPL4.value = coalesce(totCreditsToPL4.value);
	totCreditsToPL4.value= eval(
		parseInt(totRevenueFrmOperations1.value,10)+
		parseInt(totOthIncome2.value,10)+
		parseInt(closingStock3.value,10));



	var openingStock5= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.openingStockDtls.openingStock')[0];
	openingStock5.value = coalesce(openingStock5.value);
	openingStock5.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.openingStockDtls.rawMaterial')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.openingStockDtls.workInProgress')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.openingStockDtls.finishedGoods')[0].value,10)));

	var totExciseCustomsVAT7= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.totExciseCustomsVAT')[0];
	totExciseCustomsVAT7.value = coalesce(totExciseCustomsVAT7.value);
	totExciseCustomsVAT7.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.customDuty')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.counterVailDuty')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.splAddDuty')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.unionExciseDuty')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.serviceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.vaTorSaleTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.centralGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.stateGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.integratedGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.unionTerrGoodServiceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.dutyTaxPay.exciseCustomsVAT.othDutyTaxCess')[0].value,10)));


	var totEmployeeComp14xi= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.totEmployeeComp')[0];
	totEmployeeComp14xi.value = coalesce(totEmployeeComp14xi.value);
	totEmployeeComp14xi.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.salsWages')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.bonus')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.medExpReimb')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.leaveEncash')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.leaveTravelBenft')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.contToSuperAnnFund')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.contToPF')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.contToGratFund')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.contToOthFund')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.employeeComp.othEmpBenftExpdr')[0].value,10)));


	var totInsurances15= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.insurances.totInsurances')[0];
	totInsurances15.value = coalesce(totInsurances15.value);
	totInsurances15.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.insurances.medInsur')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.insurances.lifeInsur')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.insurances.keyManInsur')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.insurances.othInsur')[0].value,10)));


	var total22= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.commissionExpdrDtls.total')[0];
	total22.value = coalesce(total22.value);
	total22.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.commissionExpdrDtls.nonResOtherCompany')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.commissionExpdrDtls.others')[0].value,10)));


	var total23= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.royalityDtls.total')[0];
	total23.value = coalesce(total23.value);
	total23.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.royalityDtls.nonResOtherCompany')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.royalityDtls.others')[0].value,10)));


	var total24= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.professionalConstDtls.total')[0];
	total24.value = coalesce(total24.value);
	total24.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.professionalConstDtls.nonResOtherCompany')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.professionalConstDtls.others')[0].value,10)));


	var totExciseCustomsVAT36= document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.totExciseCustomsVAT')[0];
	totExciseCustomsVAT36.value = coalesce(totExciseCustomsVAT36.value);
	totExciseCustomsVAT36.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.unionExciseDuty')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.serviceTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.vaTorSaleTax')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.cess')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.csAtxCgst')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.csAtxSgst')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.csAtxIgst')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.csAtxUTgst')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.ratesTaxesPays.exciseCustomsVAT.othDutyTaxCess')[0].value,10)));

	var tableExpPLTableId = document.getElementById('othExpPLTableId');
	var rowCountExpPLTableId = tableExpPLTableId.rows.length;
	var sumTotalExpPLTableId=0;
	for(var i=0;i<rowCountExpPLTableId-3;i++){
		sumTotalExpPLTableId = eval(parseInt(sumTotalExpPLTableId,10) +
										parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.otherExpensesDtls['+i+'].amount')[0].value),10));
	}
	var otherExpenses38 = document.getElementsByName('partapl.debitsToPL.debitPlAcnt.otherExpenses')[0];
	otherExpenses38.value = coalesce(otherExpenses38.value);
	otherExpenses38.value =parseInt(sumTotalExpPLTableId,10) ;


	var tablebadDebtPL = document.getElementById('badDebtPL');
	var rowCountbadDebtPL = tablebadDebtPL.rows.length;
	var sumTotalbadDebtPL39=0;
	for(var i=0;i<rowCountbadDebtPL-2;i++){
		sumTotalbadDebtPL39 = eval(parseInt(sumTotalbadDebtPL39,10) +
										parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.badDebtDtls.badDebtAmtDtls['+i+'].amount')[0].value),10));
	}


	var badDebt39 = document.getElementsByName('partapl.debitsToPL.debitPlAcnt.badDebtDtls.badDebt')[0];
	badDebt39.value = coalesce(badDebt39.value);
	badDebt39.value= eval(
		parseInt(sumTotalbadDebtPL39,10)+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.badDebtDtls.othersWherePANNotAvlble')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.badDebtDtls.othersAmtLt1Lakh')[0].value,10)));


	var pbidta42 = document.getElementsByName('partapl.debitsToPL.debitPlAcnt.pbidta')[0];
	pbidta42.value = coalesce(pbidta42.value);
	pbidta42.value= eval(
		parseInt(totCreditsToPL4.value,10)-(
		parseInt(openingStock5.value,10)+
		parseInt(totExciseCustomsVAT7.value,10)+

		parseInt(totEmployeeComp14xi.value,10)+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.purchases')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.freight')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.consumptionOfStores')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.powerFuel')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.rentExpdr')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.repairsBldg')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.repairMach')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.staffWelfareExp')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.entertainment')[0].value,10))+

		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.hospitality')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.conference')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.salePromoExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.advertisement')[0].value,10))+
		parseInt(totInsurances15.value,10)+
		parseInt(total22.value,10)+
		parseInt(total23.value,10)+
		parseInt(total24.value,10)+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.hotelBoardLodge')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.travelExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.foreignTravelExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.conveyanceExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.telephoneExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.guestHouseExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.clubExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.festivalCelebExp')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.scholarship')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.gift')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.donation')[0].value,10))+
		parseInt(totExciseCustomsVAT36.value,10)+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.auditFee')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.salRemuneration')[0].value,10))+
		parseInt(otherExpenses38.value,10)+
		parseInt(badDebt39.value,10)+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.provForBadDoubtDebt')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.othProvisionsExpdr')[0].value,10))));

	var interestExpdr43 = document.getElementsByName('partapl.debitsToPL.debitPlAcnt.interestExpdrtDtls.interestExpdr')[0];
	interestExpdr43.value = coalesce(interestExpdr43.value);
	interestExpdr43.value= eval(
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.interestExpdrtDtls.partners')[0].value,10))+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.interestExpdrtDtls.others')[0].value,10))
		+parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.interestExpdrtDtls.paidIndia.partners')[0].value,10))
		+parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.interestExpdrtDtls.paidIndia.others')[0].value,10)));

	var pbt45 = document.getElementsByName('partapl.debitsToPL.debitPlAcnt.pbt')[0];
	pbt45.value = coalesce(pbt45.value);
	pbt45.value= eval(
		parseInt(pbidta42.value,10)-parseInt(interestExpdr43.value,10)-
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.debitPlAcnt.depreciationAmort')[0].value,10)));


	var profitAfterTax48 = document.getElementsByName('partapl.debitsToPL.taxProvAppr.profitAfterTax')[0];
	profitAfterTax48.value = coalesce(profitAfterTax48.value);
	profitAfterTax48.value= eval(
		parseInt(pbt45.value,10)-
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.taxProvAppr.provForCurrTax')[0].value,10))-
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.taxProvAppr.provDefTax')[0].value,10)));

	var amtAvlAppr50 = document.getElementsByName('partapl.debitsToPL.taxProvAppr.amtAvlAppr')[0];
	amtAvlAppr50.value = coalesce(amtAvlAppr50.value);
	amtAvlAppr50.value= eval(
		parseInt(profitAfterTax48.value,10)+
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.taxProvAppr.balBFPrevYr')[0].value,10)));

	var partnerAccBalTrf52 = document.getElementsByName('partapl.debitsToPL.taxProvAppr.partnerAccBalTrf')[0];
	partnerAccBalTrf52.value = coalesce(partnerAccBalTrf52.value);
	partnerAccBalTrf52.value= eval(
		parseInt(amtAvlAppr50.value,10)-
		parseInt(coalesce(document.getElementsByName('partapl.debitsToPL.taxProvAppr.trfToReserves')[0].value,10)));

	//53d
	document.getElementsByName('partapl.noBooksOfAccPL.netProfit')[0].value = eval(
			parseInt(coalesce(document.getElementsByName('partapl.noBooksOfAccPL.grossProfit')[0].value),10)-
			parseInt(coalesce(document.getElementsByName('partapl.noBooksOfAccPL.expenses')[0].value),10));

	document.getElementsByName('partapl.noBooksOfAccPL.netProfitProf')[0].value = eval(
			parseInt(coalesce(document.getElementsByName('partapl.noBooksOfAccPL.grossProfitProf')[0].value),10)-
			parseInt(coalesce(document.getElementsByName('partapl.noBooksOfAccPL.expensesProf')[0].value),10));

	document.getElementsByName('partapl.noBooksOfAccPL.totalBusProf')[0].value = eval(
			parseInt(coalesce(document.getElementsByName('partapl.noBooksOfAccPL.netProfit')[0].value),10) +
			parseInt(coalesce(document.getElementsByName('partapl.noBooksOfAccPL.netProfitProf')[0].value),10));
}

var rateCase = -1;

function calculateTaxPayableOnTotalInc(netTxblIncome, addExemption){
	rateCase = -1;
	var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0];
	var subtaxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0];
	//1-Firm,2-Local Auth,3-Co-Op-Bank,4-Co-Op-Society,5-LLP,6-AOP/BOI/AJP				2013
	//1-Firm,2-Local Auth,3-Co-Op-Bank,4-Co-Op-Society,5-LLP,7-PDT,8-AOP/BOI,9-AJP		2014
	if(addExemption){
		netTxblIncome = parseInt(netTxblIncome) + parseInt(getExemption());
	}

	var incTaxTemp = 0;

	if(taxPayer.value=='9' || (taxPayer.value=='14' && subtaxPayer.value=='11') ){

		if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('0',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('250000',10)){
			incTaxTemp = parseInt('0',10);
		}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('250001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('500000',10)){
			incTaxTemp = eval( eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('250000',10) )  * parseFloat('0.05')) ;
		}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('500001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('1000000',10)){
			incTaxTemp = eval(eval(eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('500000',10) )* parseFloat('0.2')) + parseInt('12500',10));
		}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('1000001',10)){
			incTaxTemp = eval(eval(eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('1000000',10) )* parseFloat('0.3')) + parseInt('112500',10));
		}

	}else if(taxPayer.value=='14' &&  subtaxPayer.value=='8'){
		var isSharedForeign = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;
		var totIncFrmMemberOfAop = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].totIncFrmMemberOfAop')[0].value;
		var shares = getPercentOfShare();
		var total = shares.foreignPerc+shares.otherPerc;
		if(isSharedForeign=='NO' && shares.otherPerc<=100 && shares.otherPerc>=99.9){
			if(totIncFrmMemberOfAop=='Y'){
				rateCase = 1;
				incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.3'));

			}else{
				rateCase = 2;
				if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('0',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('250000',10)){
					incTaxTemp = parseInt('0',10);
				}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('250001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('500000',10)){
					incTaxTemp = eval( eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('250000',10) )  * parseFloat('0.05')) ;
				}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('500001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('1000000',10)){
					incTaxTemp = eval(eval(eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('500000',10) )* parseFloat('0.2')) + parseInt('12500',10));
				}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('1000001',10)){
					incTaxTemp = eval(eval(eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('1000000',10) )* parseFloat('0.3')) + parseInt('112500',10));
				}
			}
		}else if(isSharedForeign=='NO'){
			rateCase = 3;
			incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.3'));
		}else if(isSharedForeign=='YES' && total<=100 && total>=99.9){

			var taxForeign = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat(shares.foreignPerc==0?0:shares.foreignPerc/100) * parseFloat('0.4'));
			var taxOth = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat(shares.otherPerc==0?0:shares.otherPerc/100) * parseFloat('0.3'));
			rateCase = 4;
			incTaxTemp = Math.round(parseFloat(taxForeign) + parseFloat(taxOth));
		}else{
			rateCase = 5;
			incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.4'));
		}

	}else if(taxPayer.value=='14' && (subtaxPayer.value=='7' || subtaxPayer.value=='13')){

		var firstFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare')[0].value;
		var secondFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusInc')[0].value;
		var thirdFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].value;
		var fourthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic')[0].value;
		var fifthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable')[0].value;
		var sixthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives')[0].value;
		var seventhFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf')[0].value;

		var isSharedForeign = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;
		var totIncFrmMemberOfAop = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].totIncFrmMemberOfAop')[0].value;
		var shares = getPercentOfShare();
		var total = shares.foreignPerc+shares.otherPerc;

		if( (firstFlag=='Y' && secondFlag=='Y' && thirdFlag=='Y' ) || (firstFlag=='N' && secondFlag=='Y' && thirdFlag=='Y') || (firstFlag=='N' && secondFlag=='N' && (fourthFlag=='Y' || fifthFlag=='Y' || sixthFlag=='Y' || seventhFlag=='Y')) ){

			if(isSharedForeign=='NO' && shares.otherPerc<=100 && shares.otherPerc>=99.9){
			if(totIncFrmMemberOfAop=='Y'){
				rateCase = 1;
				incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.3'));

			}else{
				rateCase = 2;
				if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('0',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('250000',10)){
					incTaxTemp = parseInt('0',10);
				}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('250001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('500000',10)){
					incTaxTemp = eval( eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('250000',10) )  * parseFloat('0.05')) ;
				}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('500001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('1000000',10)){
					incTaxTemp = eval(eval(eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('500000',10) )* parseFloat('0.2')) + parseInt('12500',10));
				}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('1000001',10)){
					incTaxTemp = eval(eval(eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('1000000',10) )* parseFloat('0.3')) + parseInt('112500',10));
				}
			}
		}else if(isSharedForeign=='NO'){
			rateCase = 3;
			incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.3'));
		}else if(isSharedForeign=='YES' && total<=100 && total>=99.9){

			var taxForeign = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat(shares.foreignPerc==0?0:shares.foreignPerc/100) * parseFloat('0.4'));
			var taxOth = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat(shares.otherPerc==0?0:shares.otherPerc/100) * parseFloat('0.3'));
			rateCase = 4;
			incTaxTemp = Math.round(parseFloat(taxForeign) + parseFloat(taxOth));
		}else{
			rateCase = 5;
			incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.4'));
			}
		}else if( (firstFlag=='Y' && secondFlag=='Y' && thirdFlag=='N' ) || (firstFlag=='N' && secondFlag=='Y' && thirdFlag=='N') || (firstFlag=='N' && secondFlag=='N' && fourthFlag=='N' && fifthFlag=='N' && sixthFlag=='N' && seventhFlag=='N')){

			incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.3'));

		}

	}else if(taxPayer.value=='2' || (taxPayer.value=='1' &&( subtaxPayer.value=='5' || subtaxPayer.value=='10')) || (taxPayer.value=='14' && subtaxPayer.value=='12') ){
		incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.3'));

	}else if(taxPayer.value=='14' && (subtaxPayer.value=='17' || subtaxPayer.value=='15' || subtaxPayer.value=='16' || subtaxPayer.value=='4')){
		if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('0',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('10000',10)){
			incTaxTemp = eval(parseInt(rndOffNrsTen(netTxblIncome),10) * parseFloat('0.1'));
		}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('10001',10) && parseInt(rndOffNrsTen(netTxblIncome),10) <= parseInt('20000',10)){
			incTaxTemp = eval( eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('10000',10) )  * parseFloat('0.2') + parseInt('1000',10)) ;
		}else if(parseInt(rndOffNrsTen(netTxblIncome),10) >= parseInt('20001',10)){
			incTaxTemp = eval(eval(eval(parseInt(rndOffNrsTen(netTxblIncome),10) - parseInt('20000',10) )* parseFloat('0.3')) + parseInt('3000',10));
		}
	}

	return incTaxTemp;
}

	function showTaxRateMsg(){
		switch(rateCase)
		{
		case 1:
		  addErrorXHTML('','Since none of members is Foreign Company, and since the total income of members (as selected in D of sheet Nature of Business) exceeds the maximum amount not chargeable to tax, AOP will be taxed @30%.');
		  break;
		case 2:
		  addErrorXHTML('',"Since none of members is Foreign Company, and since none of the member's total income  (as selected in D of sheet Nature of Business) exceeds the maximum amount not chargeable to tax, AOP will be taxed at slab rates.");
		  break;
		case 4:
		  addErrorXHTML('','Share of Foreign Company will be taxed @ 40% & income of other members will be taxed @ 30%');
		  break;
		case 3:
		  addErrorXHTML('','The share of AOP is indeterminate hence AOP will be taxed @ 30%');
		  break;
		case 5:
		  addErrorXHTML('','The share of AOP is indeterminate & Foreign Company is a member hence AOP will be taxed @ 40%');
		  break;
		default:
		  break;
		}
	}

function getDueDate234A(){
		var duedate = '31/08/2018'; //// Modified due to the due date extended for filing the return

		// partAGEN2.auditInfo.repSec92EFlag  --->30 nov
		// partAGEN2.auditInfo.liableSec44ABflg --->30 sep


		var auditFlag = document.getElementsByName('partAGEN2.liableSec44ABflg')[0].value;
		if(auditFlag=='Y'){
			duedate = "30/09/2018";
		}


	var tab92E=document.getElementById('othSecDateTabId');
	var allInputTags = tab92E.getElementsByTagName('select');

	for(var i = 0; i < allInputTags.length; i++) {

		if (allInputTags[i].name.match("auditedSection$")) {
			if(document.getElementsByName('partAGEN2.liableSec92Eflg')[0].value=='Y'){
			duedate = '30/11/2018';
			break;
				} else if(allInputTags[i].value!='' && auditFlag != 'Y'){
				duedate = '30/09/2018';
				}
			}
		}

	return duedate;
	}

function getDueDate(){
	var duedate = '31/08/2018';

	// partAGEN2.auditInfo.repSec92EFlag  --->30 nov
	// partAGEN2.auditInfo.liableSec44ABflg --->30 sep


	var auditFlag = document.getElementsByName('partAGEN2.liableSec44ABflg')[0].value;
	if(auditFlag=='Y'){
		duedate = "30/09/2018";
	}


var tab92E=document.getElementById('othSecDateTabId');
var allInputTags = tab92E.getElementsByTagName('select');

for(var i = 0; i < allInputTags.length; i++) {

	if (allInputTags[i].name.match("auditedSection$")) {
		if(document.getElementsByName('partAGEN2.liableSec92Eflg')[0].value=='Y'){
		duedate = '01/12/2018';
		break;
			} else if(allInputTags[i].value!='' && auditFlag != 'Y'){
			duedate = '01/10/2018';
			}
		}
	}

return duedate;
}

function calcInterestPayable(cgosIncome){

try{

		var advanceTax = document.getElementsByName('partBTTI.taxPaid.taxesPaid.advanceTax')[0].value;
		var AMT = document.getElementsByName('partBTTI.computationOfTaxLiability.creditUS115JD')[0].value;

		var TDSToDisplay = document.getElementsByName('partBTTI.taxPaid.taxesPaid.tds')[0];
		TDSToDisplay.value = coalesce(TDSToDisplay.value);
		var TDS = TDSToDisplay.value;

		var TCSToDisplay = document.getElementsByName('partBTTI.taxPaid.taxesPaid.tcs')[0];
		TCSToDisplay.value = coalesce(TCSToDisplay.value);
		var TCS = TCSToDisplay.value;

		var balTaxPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0];
		balTaxPayable.value = coalesce(balTaxPayable.value);

		var advanceTax234A = calculateAdvancedTax234A(getDueDate234A());

		var intrst234Aprinciple	;
		if(parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(advanceTax234A ,10) - parseInt(TDS ,10) - parseInt(TCS ,10) < 0){
			intrst234Aprinciple = parseInt('0' ,10);
			}else {

			intrst234Aprinciple = parseInt(balTaxPayable.value ,10) - parseInt(advanceTax ,10) - parseInt(advanceTax234A ,10) - parseInt(TDS ,10) - parseInt(TCS ,10);
			// Rounding off to previous hundered
				if(parseInt(intrst234Aprinciple,10) > 100){
					intrst234Aprinciple= Math.floor(parseInt(intrst234Aprinciple,10)/100)*parseInt('100' ,10);
				}
		}
		var currentDate = document.getElementsByName('verification.date')[0].value;
		var filingType = document.getElementsByName('partAGEN1.filingStatus.returnFileSec.incomeTaxSec')[0].value;

		if(checkFirstDateBefore(currentDate, getCurrentDate())){
			currentDate = getCurrentDate();
		}

		var actualdate = currentDate;

		var originalFilingDate = document.getElementsByName('partAGEN1.filingStatus.origRetFiledDate')[0].value;
		if((filingType=='17' || filingType=='19' || filingType=='18' ) && originalFilingDate !=undefined && originalFilingDate!=null && originalFilingDate!=''){
			currentDate = originalFilingDate;
		}

		var duedate = getDueDate();

		if(getDueDate234A() == '31/08/2018'){

			duedate = '01/09/2018';
		}else if(getDueDate234A() == '30/09/2018'){

			duedate = '01/10/2018';
		}else if(getDueDate234A() == '30/11/2018'){

			duedate = '01/12/2018';
		}


		var MonthsAfterDueDate =  calcNoOfMonths(currentDate , duedate);

		var intrst234A = parseInt(intrst234Aprinciple,10) * parseFloat('0.01') * parseInt(MonthsAfterDueDate) ;


		var intrst234B = parseInt('0' ,10);
		var	intrst234C = parseInt('0' ,10);
		var	intrst234F = parseInt('0' ,10);

		var slab0 = parseInt('0' ,10);
		var slab1 = parseInt('0' ,10);
		var slab2 = parseInt('0' ,10);
		var slab3 = parseInt('0' ,10);
		var slab4 = parseInt('0' ,10);

		var state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];

			var tab4 = document.getElementById('scheduleIt');
			var allInputTags = tab4.getElementsByTagName('input');
			for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("dateDep$")) {

					if(checkFirstDateBefore(FY_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab0_end_date ) ){
						slab0 = eval(parseInt(slab0 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					if(checkFirstDateBefore(slab1_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab1_end_date ) ){
						slab1 = eval(parseInt(slab1 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					if(checkFirstDateBefore(slab2_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab2_end_date ) ){
						slab2 = eval(parseInt(slab2 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					else if(checkFirstDateBefore(slab3_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , slab3_end_date ) ){
						slab3 = eval(parseInt(slab3 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
					else if(checkFirstDateBefore(slab4_start_date , allInputTags[i].value) && checkFirstDateBefore( allInputTags[i].value , FY_end_date ) ){
						slab4 = eval(parseInt(slab4 ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
					}
				}
			}

		//Calculate tax on CG
		var intrstRates = [0.1030, 0.2060, 0.1545, 0.3090];

		var totalUpto15Of6 = 0;

		var totalUpto15Of9 = 0;

		var totalUp16Of9To15Of12 = 0;

		var totalUp16Of12To15Of3 = 0;

		var totalUp16Of3To31Of3 = 0;


		intrst234C = calculate234cIntrst(TDS, TCS, [slab0, slab1, slab2, slab3, slab4], cgosIncome,AMT);


		// ===============Interest234F calculation=======================
		var filingType = document.getElementsByName('partAGEN1.filingStatus.returnFileSec.incomeTaxSec')[0].value;

        var originalFilingDate = document.getElementsByName('partAGEN1.filingStatus.origRetFiledDate')[0].value;
        if((filingType=='17'|| filingType=='18') && originalFilingDate !=undefined && originalFilingDate!=null && originalFilingDate!=''){
        	currentDate = originalFilingDate;
        }

		  var intrst234F = parseInt('0',10);
  		var filerType=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;


  		if (filingType=='11' || filingType=='12' || filingType=='17' ||filingType=='18' || filingType=='13' ){

  			var totInc = document.getElementsByName('partBTI.totalIncome')[0].value;
  			var grossInc = getAmt('partBTI.grossTotalIncome');
  			var gtiInc =grossInc+getAmt('scheduleEI.ltcgWhereSTTPaid');
  			var currentDate234F = '01/09/2018';

  			var status=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

     				var dueDate234A = getDueDate234A();

     			    if(dueDate234A == '30/09/2018'){
     			    	currentDate234F = '01/10/2018';

     				 }else if(dueDate234A == '30/11/2018'){
     					currentDate234F = '01/12/2018';
     				 }

     			   var isSharedForeign = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;
 					var totIncFrmMemberOfAop = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].totIncFrmMemberOfAop')[0].value;
 					var shares = getPercentOfShare();
 					var total = parseInt(shares.foreignPerc,10)+parseInt(shares.otherPerc,10);


  			var subfiler=document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
  			if(isSharedForeign=='NO' && totIncFrmMemberOfAop == 'N' && total == 100 && subfiler=='8'){
				if(parseInt(gtiInc,10)> eval('250000')){
					if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
	  				if(parseInt(totInc,10)<= eval('500000')){
							intrst234F= '1000';
						}
				    else if(parseInt(totInc,10)> eval('500000')){
							intrst234F= '5000';
						}
					}
					else if(checkFirstDateBefore('01/01/2019', currentDate)){
						if(parseInt(totInc,10)<= eval('500000')){
							intrst234F= '1000';
						}
						else if(parseInt(totInc,10)> eval('500000')){
							intrst234F= '10000';
						}
					}
					else{
						intrst234F= parseInt('0',10);
					}
	  				}
	  				else{
						intrst234F= parseInt('0',10);
					}

			}
			else {
				if(!(subfiler=='11'||filerType=='9')){
					if(parseInt(gtiInc,10) > eval('0')){
				if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  				if(parseInt(totInc,10)<= eval('500000')){
						intrst234F= '1000';
					}
			    else if(parseInt(totInc,10)> eval('500000')){
						intrst234F= '5000';
					}
						}
				else if(checkFirstDateBefore('01/01/2019', currentDate)){
					if(parseInt(totInc,10)<= eval('500000')){
						intrst234F= '1000';
					}
					else if(parseInt(totInc,10)> eval('500000')){
						intrst234F= '10000';
					}
				}
				else{
					intrst234F= parseInt('0',10);
				}
				}
				}
			}
  			if(filerType=='14'&&(subfiler=='17'|| subfiler=='15'|| subfiler=='16'|| subfiler=='4'|| subfiler=='12' || subfiler=='7' || subfiler=='13')){
  				if(subfiler=='7' || subfiler=='13'){
  					var isSharedForeign = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;
  					var totIncFrmMemberOfAop = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].totIncFrmMemberOfAop')[0].value;
  					var shares = getPercentOfShare();
  					var total = parseInt(shares.foreignPerc,10)+parseInt(shares.otherPerc,10);

  					var firstFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare')[0].value;
  					var secondFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusInc')[0].value;
  					var thirdFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].value;
  					var fourthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic')[0].value;
  					var fifthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable')[0].value;
  					var sixthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives')[0].value;
  					var seventhFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf')[0].value;
  					if( (firstFlag=='Y' && secondFlag=='Y' && thirdFlag=='Y' ) || (firstFlag=='N' && secondFlag=='Y' && thirdFlag=='Y') || (firstFlag=='N' && secondFlag=='N' && (fourthFlag=='Y' || fifthFlag=='Y' || sixthFlag=='Y' || seventhFlag=='Y')) ){
  						if(isSharedForeign=='NO' && totIncFrmMemberOfAop == 'N' && total == 100){
  							if(parseInt(gtiInc,10)> eval('250000')){
  								if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  				  				if(parseInt(totInc,10)<= eval('500000')){
  										intrst234F= '1000';
  									}
  							    else if(parseInt(totInc,10)> eval('500000')){
  										intrst234F= '5000';
  									}
  								}
  								else if(checkFirstDateBefore('01/01/2019', currentDate)){
  									if(parseInt(totInc,10)<= eval('500000')){
  										intrst234F= '1000';
  									}
  									else if(parseInt(totInc,10)> eval('500000')){
  										intrst234F= '10000';
  									}
  								}
  								else{
  									intrst234F= parseInt('0',10);
  								}
  				  				}
  				  				else{
  									intrst234F= parseInt('0',10);
  								}

  						}
  			  				else{
  			  					if(parseInt(gtiInc,10)> eval('0')){
  			  					if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  			    				if(parseInt(totInc,10)<= eval('500000')){
  									intrst234F= '1000';
  								}
  						    else if(parseInt(totInc,10)> eval('500000')){
  									intrst234F= '5000';
  								}
  			  					}
  							else if(checkFirstDateBefore('01/01/2019', currentDate)){
  								if(parseInt(totInc,10)<= eval('500000')){
  									intrst234F= '1000';
  								}
  								else if(parseInt(totInc,10)> eval('500000')){
  									intrst234F= '10000';
  								}
  							}
  							else{
  								intrst234F= parseInt('0',10);
  							}
  			  				}
  							}
  					}
  					alert("intrst234F"+intrst234F);

  				}
  				else{
  				if(parseInt(gtiInc,10)> eval('0')){
  				if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  				if(parseInt(totInc,10)<= eval('500000')){
						intrst234F= '1000';
					}
			    else if(parseInt(totInc,10)> eval('500000')){
						intrst234F= '5000';
					}
  					}
				else if(checkFirstDateBefore('01/01/2019', currentDate)){
					if(parseInt(totInc,10)<= eval('500000')){
						intrst234F= '1000';
					}
					else if(parseInt(totInc,10)> eval('500000')){
						intrst234F= '10000';
					}
				}
				else{
					intrst234F= parseInt('0',10);
				}
  				}
  			}

  			}
  			if(filerType=='14'&&gtiInc>250000){
  				if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '5000';
  					}
  				}
  				else if(checkFirstDateBefore('01/01/2019', currentDate)){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '10000';
  					}
  				}
  				else{
  					intrst234F= parseInt('0',10);
  				}
  			}
  			if((filerType=='9'||subfiler=='11')&&gtiInc>250000){
  				if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '5000';
  					}
  				}
  				else if(checkFirstDateBefore('01/01/2019', currentDate)){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '10000';
  					}
  				}
  				else{
  					intrst234F= parseInt('0',10);
  				}
  			}
  			else{
  				if(filerType!='2'){
  				if(filerType!='9'){
  				if(!(filerType=='14'&&(subfiler=='17'|| subfiler=='15'|| subfiler=='16'|| subfiler=='4' ||subfiler=='11' || subfiler=='8' || subfiler=='7'  || subfiler=='12' || subfiler=='13'))){
  				if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '5000';
  					}
  				}
  				else if(checkFirstDateBefore('01/01/2019', currentDate)){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '10000';
  					}
  				}
  				else{
  					intrst234F= parseInt('0',10);
  				}
  			}
  			}
  			}
  			}
  			var prevFlag = document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value;
  			var cflLoss = document.getElementsByName('partBTI.lossesOfCurrentYearCarriedFwd')[0].value;
  			if(prevFlag=='YES'||parseInt(cflLoss,10)>eval('0')){
  				if(checkFirstDateBefore(currentDate234F , currentDate) && checkFirstDateBefore( currentDate , '31/12/2018' )){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '5000';
  					}
  				}
  				else if(checkFirstDateBefore('01/01/2019', currentDate)){
  					if(parseInt(totInc,10)<= eval('500000')){
  						intrst234F= '1000';
  					}
  					else if(parseInt(totInc,10)> eval('500000')){
  						intrst234F= '10000';
  					}
  				}
  				else{
  					intrst234F= parseInt('0',10);
  				}

  			}
  		/*	if(subfiler=='7'|| subfiler=='12'|| subfiler=='13'){
  				document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234F')[0].readOnly=false;
  			}
  			else{
  				document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234F')[0].readOnly=true;
  			}*/
  		}

		// ===============Interest234B calculation=======================
		var presInc44AD = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD')[0];
   	 	var dtaa = document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0].value;
   	 	var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

   	 	var winLottRacePuzz = parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[0].sourceAmount'));
   	 	var rebateOnAgriInc = parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture'), 10);


   	 	var totalCG = 	  parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctg30, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctgAr, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg20.sec11EA, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10)))
		+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115E_b, 10)));

   	 	var normalBalIncome = eval(
				parseInt(coalesceSetRet('partBTI.grossTotalIncome'))
				- totalCG
				- parseInt(coalesceSetRet('partBTI.totalDeductionsUnderScheduleVIA'))
                                      - parseInt(coalesceSetRet('partBTI.deductionsUnder10Aor10AA'))
				- parseInt(winLottRacePuzz)
				);

   	 	if(parseInt(rebateOnAgriInc, 10) > parseInt('0', 10)){
   	 		normalBalIncome = eval(parseInt(normalBalIncome, 10)
   	 				+ parseInt(coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'), 10));
   	 		}

   	 	var surchrge1 = parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.totalSurcharge'));
		var totalInc = parseInt(coalesceSetRet('partBTI.totalIncome'));

		presInc44AD = parseInt(coalesce(presInc44AD.value),10);

   	 	if(presInc44AD > 0 && ((coalesce(parseInt(document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartC')[0].value, 10))+

				(coalesce(parseInt(document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub')[0].value, 10))) == 0)) && taxPayer=='1'){


   	 	surcharge= surchrge1;

   	 		var sumSIWithDtaa = calculatePureSITax()- parseInt(coalesce(dtaa),10);
   	 		var totSplRateIncTax = document.getElementsByName('scheduleSI.totSplRateIncTax')[0].value;
   	 		var pureSIIncFor234B = totSplRateIncTax - parseInt(sumSIWithDtaa);
   	 	}

   	 balTaxPayable=balTaxPayable.value;

		var intrst234Bprinciple;
		var intrst234Bi=parseInt('0',10);
		var earliestSelfAsspaidDate=parseInt('0',10);
		var noOfMonthsTillSelfasst= parseInt('0',10);


		if(parseInt(balTaxPayable,10) - parseInt(TDS,10) - parseInt(TCS ,10) >= parseInt('10000' ,10)) {
			if(parseInt(advanceTax,10) < ((parseInt(balTaxPayable,10) - parseInt(TDS,10) - parseInt(TCS ,10)) * parseFloat('0.90'))) {
				intrst234Bprinciple = (parseInt(balTaxPayable ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10) - parseInt(TCS ,10));

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


				currentDate = actualdate;

				// to get all self assesment tax values
				for(var p = 0; p < allInputTags.length; p++) {
					if(allInputTags[p].name.match("dateDep$")){
						if( checkFirstDateBefore('01/04/2018' , allInputTags[p].value) && checkFirstDateBefore(allInputTags[p].value, currentDate) ){
							if(allInputTags[p+2].value!=0){
								selfAsspaidDates[x]=allInputTags[p].value;
								selfAsspaidAmts[x]=allInputTags[p+2].value;
								x++;
							}
						}
					}
				}

				// to sort all self assesment tax values according to date

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
					var lastYear =0;
					for(var q = 0; q < arrLen; q++) {
						if(parseInt(selfAsspaidDates[q].substr(3,2), 10) == lastMonth && parseInt(selfAsspaidDates[q].substr(8,2), 10) == lastYear){
							selfAsspaidAmts[lastIndex] = parseInt(selfAsspaidAmts[lastIndex], 10) + parseInt(selfAsspaidAmts[q], 10);
						}else{
							lastMonth = parseInt(selfAsspaidDates[q].substr(3,2), 10);
							lastYear = parseInt(selfAsspaidDates[q].substr(8,2), 10);
							selfAsspaidAmts[++lastIndex] = selfAsspaidAmts[q];
							selfAsspaidDates[lastIndex] = selfAsspaidDates[q];
						}
					}
					selfAsspaidAmts.length = ++lastIndex;
					selfAsspaidDates.length = lastIndex;
				}

				if(selfAsspaidDates.length==0){
					noOfMonthsTillSelfasst=calcNoOfMonths(currentDate,'01/04/2018');
				}else{
					noOfMonthsTillSelfasst=calcNoOfMonths(selfAsspaidDates[0],'01/04/2018');
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

						intrst234Bprinciple2=zeroOrMore(eval(parseInt(balTaxPayable ,10) - parseInt(advanceTax ,10) - parseInt(TDS,10) - parseInt(TCS ,10)+
								parseInt(intrst234A ,10)+parseInt(intrst234C ,10)+parseInt(intrst234Bi ,10)+parseInt(intrst234Bii ,10)+parseInt(intrst234F ,10)
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
							intrst234Bprinciple = intrst234Bprinciple2;
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

		intrst234A = parseInt(intrst234A ,10);
		intrst234B = parseInt(intrst234B ,10);
		intrst234C = parseInt(intrst234C ,10);
		intrst234F = parseInt(intrst234F ,10);

		var intrstPayUs234A = document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234A')[0];
		if(intrstPayUs234A.old != intrst234A){
			intrstPayUs234A.old = intrst234A;
			intrstPayUs234A.value = intrst234A;
		}

		var intrstPayUs234B = document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234B')[0];
		if(intrstPayUs234B.old != intrst234B){
			intrstPayUs234B.old =	intrst234B;
			intrstPayUs234B.value =	intrst234B;
		}

		var intrstPayUs234C = document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234C')[0];
		if(intrstPayUs234C.old != intrst234C){
			intrstPayUs234C.old =	intrst234C;
			intrstPayUs234C.value =	intrst234C;
		}

		var intrstPayUs234F = document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234F')[0];
		if(intrstPayUs234F.old != intrst234F){
			intrstPayUs234F.old =	intrst234F;
			intrstPayUs234F.value =	intrst234F;
		}

		var intrstPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.totalIntrstPay')[0]; intrstPayable.value = coalesce(intrstPayable.value);
		intrstPayable.value = Math.round(eval(parseInt(intrstPayUs234A.value ,10) + parseInt(intrstPayUs234B.value ,10) + parseInt(intrstPayUs234C.value ,10) + parseInt(intrstPayUs234F.value ,10)));

		var balTaxPay = document.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0]; balTaxPay.value = coalesce(balTaxPay.value);
		var totIntrstPay = document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.totalIntrstPay')[0]; totIntrstPay.value = coalesce(totIntrstPay.value);
		var totTaxIntrstPay = document.getElementsByName('partBTTI.computationOfTaxLiability.aggregateTaxInterestLiability')[0]; totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);

		totTaxIntrstPay.value = eval(balTaxPay.value) + eval(totIntrstPay.value);


	}catch(e){
		alert('Exception in calcInterestPayable() = ' + e.stack);
	}
}

function calculate234cIntrst(TDS, TCS, slabs, cgosIncome,AMT){
	try{
	var slab0 = parseInt(slabs[0] ,10);
	var slab1 = parseInt(slabs[1] ,10);
	var slab2 = parseInt(slabs[2] ,10);
	var slab3 = parseInt(slabs[3] ,10);
	var slab4 = parseInt(slabs[4] ,10);

	var winLottRacePuzz = parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[0].sourceAmount'));
	var rebateOnAgriInc = parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture'), 10);
	var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

	var totalCG = 	  parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctg30, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctgAr, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg20.sec11EA, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115_AB_1_B, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10)))
					+ parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.ltcg.prctg10.sec115E_b, 10)));


	var normalBalIncome = eval(
						parseInt(coalesceSetRet('partBTI.grossTotalIncome'))
						- totalCG- parseInt(coalesceSetRet('partBTI.incFromOS.incChargeSplRate')) - parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBF')) - parseInt(coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBG'))
						- parseInt(coalesceSetRet('partBTI.capGain.shortTerm.shortTermChargableDtaa'))  - parseInt(coalesceSetRet('partBTI.capGain.longTerm.longTermDtaa')) - parseInt(coalesceSetRet('partBTI.totalDeductionsUnderScheduleVIA'))
                                                    - parseInt(coalesceSetRet('partBTI.deductionsUnder10Aor10AA'))
						);


	if(parseInt(rebateOnAgriInc, 10) > parseInt('0', 10)){
		normalBalIncome = eval(parseInt(normalBalIncome, 10)
		+ parseInt(coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'), 10));
	}

	var normalBalIncIncl44Ad = normalBalIncome;
	var sec44AD = parseInt(document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD')[0].value, 10);
	var sec44ADA = parseInt(document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44ADA')[0].value, 10);

	var dtaan11b = parseInt(coalesce(document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0].value));

	var siexmption = getLTCG20ExmpFrmSI();
	var exemption10Pct = eval(siexmption["10"]);
	var exemption15Pct = eval(parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[3].splRateInc')) - parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[3].taxableInc')));
	var exemption20Pct = eval(siexmption["20"]);
	var exemption30Pct = eval(parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[7].splRateInc')) - parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[7].taxableInc')));
	var exemptionOth111A = parseInt(getExemption()) -  eval(
							parseInt(exemption10Pct)
							+ parseInt(exemption15Pct)
							+ parseInt(exemption20Pct)
							+ parseInt(exemption30Pct)
							);
	//Calculate tax on CG
	var intrstRates = [0.1, 0.2, 0.15,0.3];
	var appRateSurcharge = 1;

	var totalIncome = coalesceSetRet('partBTI.totalIncome');

	var marginal = isMarginalRelfApplcbl();

	var totalUpto15Of6 = 0;
	var totalUpto15Of9 = 0;
	var totalUp16Of9To15Of12 = 0;
	var totalUp16Of12To15Of3 = 0;
	var totalUp16Of3To31Of3 = 0;
	var avaTdsTcs =0;
	var taxOnWinLottRacePuzz = 0;

	var balTaxPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0];
	var netTaxLiability = balTaxPayable.value;

	var statusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

	var othExemptions = 0;

	var siTax=0;
	var marginal1 = isMarginalRelfApplcblCheck();

	if(parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.totalTax'))!=
		parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.grossTaxPayable'))){

		siTax = parseInt(coalesceSetRet('scheduleSI.totSplRateIncTax')) - calculatePureSITax()-parseInt(coalesce(dtaan11b),10);

		var SISurcharge = 0;
		var totalInc = parseInt(document.getElementsByName('partBTI.totalIncome')[0].value);

		var remove115BBE = eval(parseInt(
				coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
				10));

		var totalInc = parseInt(document.getElementsByName('partBTI.totalIncome')[0].value) - remove115BBE;

		var SurchargeUnderSec = 0; //both sec44AD & sec44ADA surcharge
		var TaxpayableUnderSec = 0; // both sec44AD & sec44ADA taxpayable
		var taxpayableIncSec44 = 0;
		var secIncome = 0;

		if (sec44AD>0 && sec44ADA>0){
			secIncome = sec44AD + sec44ADA;
		}
			else if (sec44AD>0 && sec44ADA<=0){
				secIncome = sec44AD;
			}
			else if (sec44AD<=0 && sec44ADA>0){
				secIncome = sec44ADA;
			}
			else{
				secIncome=0;
			}


		if(secIncome > 0 &&((coalesce(parseInt(document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartC')[0].value, 10))+

				(coalesce(parseInt(document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub')[0].value, 10))) == 0)) && taxPayer=='1'){

			taxpayableIncSec44=calculateTaxPayableOnTotalInc(normalBalIncome+parseInt(( parseInt(cgosIncome.cgInc.stcg.prctgAr, 10))))+parseInt(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].value);
			TaxpayableUnderSec=calculateTaxPayableOnTotalInc(normalBalIncome+parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctgAr, 10)))-secIncome)+parseInt(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].value)-(remove115BBE*0.6)-rebateOnAgriInc;
			SurchargeUnderSec=(parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F'))*((totalInc-secIncome)/totalInc));


			var TaxpayableOnTotalInc=calculateTaxPayableOnTotalInc(normalBalIncome+parseInt(zeroOrMore( parseInt(cgosIncome.cgInc.stcg.prctgAr, 10))))+parseInt(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].value)-rebateOnAgriInc;
			var TaxPayableOnly44AD=eval(parseInt(TaxpayableOnTotalInc)-parseInt(TaxpayableUnderSec)- (remove115BBE*0.6));

			var SurchargeOnly44AD=(parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F'))-SurchargeUnderSec);

		}else{

			SurchargeUnderSec=document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].value;
			TaxpayableUnderSec=eval(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc')[0].value - (remove115BBE*0.6));
			taxpayableIncSec44=document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc')[0].value;
			TaxPayableOnly44AD=0;

		}

		if(parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F'))>0){

			if(marginal1 ||(secIncome>0 && ((coalesce(parseInt(document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartC')[0].value, 10))+

					(coalesce(parseInt(document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub')[0].value, 10))) == 0))) && taxPayer=='1'){

			SISurcharge= parseInt((parseInt(SurchargeUnderSec)*(coalesce((siTax-(remove115BBE*0.6))/TaxpayableUnderSec))),10);

		}else {

			if( statusCompany == "1" || statusCompany == "2" || statusCompany == "17" || statusCompany == "15" || statusCompany == "16" || statusCompany == "4" || statusCompany == "5"){

				SISurcharge=(siTax -(remove115BBE*0.6)) *0.12;
			}else
				{
				SISurcharge=(siTax -(remove115BBE*0.6)) *0.15;
				}
		}
	}

		siTax= (siTax-(remove115BBE*0.6));
		siTax = (siTax+SISurcharge) * 1.03;


		taxOnWinLottRacePuzz = parseInt(winLottRacePuzz) *  intrstRates[3];

		if(secIncome>0 &&((coalesce(parseInt(document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartC')[0].value, 10))+

				(coalesce(parseInt(document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub')[0].value, 10))) == 0)) && taxPayer=='1'){

		normalBalIncome = zeroOrMore(normalBalIncome - secIncome);

		}else if(secIncome>0){

			secIncome = 0;
		}


	//App Rate
	if(parseInt(normalBalIncome) > parseInt(exemptionOth111A)){
		normalBalIncome = parseInt(normalBalIncome) - parseInt(exemptionOth111A);
		exemptionOth111A = 0;
	}else if(parseInt(normalBalIncome, 0) > 0){
		exemptionOth111A = parseInt(exemptionOth111A) - parseInt(normalBalIncome);
		normalBalIncome = 0;
	}


	var taxOnstcgOthers0 =     eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of6'), 10)  + parseInt(normalBalIncome));
	var taxOnstcgOthers1 =     eval(parseInt(taxOnstcgOthers0) + eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of9'), 10) ));
	var taxOnstcgOthers2 =     eval(parseInt(taxOnstcgOthers1) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of9To15Of12'), 10) );
	var taxOnstcgOthers3 =     eval(parseInt(taxOnstcgOthers2) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of12To15Of3'), 10) + parseInt(secIncome));
	var taxOnstcgOthers4 =     eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of3To31Of3'), 10) + parseInt(taxOnstcgOthers3, 10) );


	//30%
	var shortTermUnder30Per0 = eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of6'), 10) );
	var shortTermUnder30Per1 = eval(parseInt(shortTermUnder30Per0) + eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of9'), 10) ));
	var shortTermUnder30Per2 = eval(parseInt(shortTermUnder30Per1) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of9To15Of12'), 10) );
	var shortTermUnder30Per3 = eval(parseInt(shortTermUnder30Per2) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of12To15Of3'), 10) );
	var shortTermUnder30Per4 = eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of3To31Of3'), 10) );


	//20%
	var taxOnltcgNonProviso0 = eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of6'), 10) );
	var taxOnltcgNonProviso1 = eval(parseInt(taxOnltcgNonProviso0) + eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of9'), 10) ));
	var taxOnltcgNonProviso2 = eval(parseInt(taxOnltcgNonProviso1) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of9To15Of12'), 10) );
	var taxOnltcgNonProviso3 = eval(parseInt(taxOnltcgNonProviso2) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of12To15Of3'), 10) );
	var taxOnltcgNonProviso4 = eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of3To31Of3'), 10) );


	//15%
	var taxOnstcg111A0 =       eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of6'), 10)  );
	var taxOnstcg111A1 =       eval(parseInt(taxOnstcg111A0) + eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of9'), 10)  ));
	var taxOnstcg111A2 =       eval(parseInt(taxOnstcg111A1) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of9To15Of12'), 10) );
	var taxOnstcg111A3 =       eval(parseInt(taxOnstcg111A2) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of12To15Of3'), 10) );
	var taxOnstcg111A4 =       eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of3To31Of3'), 10) );


	//10%
	var taxOnltcgProviso0 =    eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of6'), 10) );
	var taxOnltcgProviso1 =    eval(parseInt(taxOnltcgProviso0) + eval(parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of9'), 10) ));
	var taxOnltcgProviso2 =    eval(parseInt(taxOnltcgProviso1) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of9To15Of12'), 10) );
	var taxOnltcgProviso3 =    eval(parseInt(taxOnltcgProviso2) + parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of12To15Of3'), 10) );
	var taxOnltcgProviso4 =    eval( parseInt(coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of3To31Of3'), 10) );


	var temp = applyExemption2017([taxOnltcgProviso0,taxOnltcgProviso1,taxOnltcgProviso2,taxOnltcgProviso3,taxOnltcgProviso4], exemption10Pct);
	taxOnltcgProviso0 = temp[0],taxOnltcgProviso1 = temp[1],taxOnltcgProviso2 = temp[2],taxOnltcgProviso3 = temp[3],taxOnltcgProviso4 = temp[4];
	taxOnltcgProviso0 *= intrstRates[0],taxOnltcgProviso1*= intrstRates[0],taxOnltcgProviso2 *= intrstRates[0],taxOnltcgProviso3 *= intrstRates[0],taxOnltcgProviso4 *= intrstRates[0];


	temp = applyExemption2017([shortTermUnder30Per0,shortTermUnder30Per1,shortTermUnder30Per2,shortTermUnder30Per3,shortTermUnder30Per4], exemption30Pct);
	shortTermUnder30Per0=temp[0], shortTermUnder30Per1=temp[1], shortTermUnder30Per2=temp[2], shortTermUnder30Per3=temp[3],shortTermUnder30Per4=temp[4];
	shortTermUnder30Per0 *= intrstRates[3],shortTermUnder30Per1 *= intrstRates[3],shortTermUnder30Per2 *= intrstRates[3],shortTermUnder30Per3 *= intrstRates[3],shortTermUnder30Per4 *= intrstRates[3];


	temp = applyExemption2017([taxOnltcgNonProviso0,taxOnltcgNonProviso1,taxOnltcgNonProviso2,taxOnltcgNonProviso3,taxOnltcgNonProviso4], exemption20Pct);
	taxOnltcgNonProviso0=temp[0],taxOnltcgNonProviso1=temp[1],taxOnltcgNonProviso2=temp[2],taxOnltcgNonProviso3=temp[3],taxOnltcgNonProviso4=temp[4];
	taxOnltcgNonProviso0 *= intrstRates[1],taxOnltcgNonProviso1 *= intrstRates[1],taxOnltcgNonProviso2 *= intrstRates[1],taxOnltcgNonProviso3 *= intrstRates[1],taxOnltcgNonProviso4 *= intrstRates[1];


	temp = applyExemption2017([taxOnstcg111A0,taxOnstcg111A1,taxOnstcg111A2,taxOnstcg111A3,taxOnstcg111A4], exemption15Pct);
	taxOnstcg111A0=temp[0],taxOnstcg111A1=temp[1],taxOnstcg111A2=temp[2],taxOnstcg111A3=temp[3],taxOnstcg111A4=temp[4];
	taxOnstcg111A0 *= intrstRates[2],taxOnstcg111A1 *= intrstRates[2],taxOnstcg111A2 *= intrstRates[2],taxOnstcg111A3 *= intrstRates[2],taxOnstcg111A4 *= intrstRates[2];


	temp = applyExemption2017([taxOnstcgOthers0,taxOnstcgOthers1,taxOnstcgOthers2,taxOnstcgOthers3,taxOnstcgOthers4], exemptionOth111A, true);
	taxOnstcgOthers0=temp[0],taxOnstcgOthers1=temp[1],taxOnstcgOthers2=temp[2],taxOnstcgOthers3=temp[3],taxOnstcgOthers4=temp[4];


	if(totalCG>0){
		taxOnstcgOthers0 = ((calculateTaxPayableOnTotalInc(taxOnstcgOthers0, true)  + parseInt(dtaan11b)) * appRateSurcharge) ;
		taxOnstcgOthers1 = ((calculateTaxPayableOnTotalInc(taxOnstcgOthers1, true)  + parseInt(dtaan11b)) * appRateSurcharge) ;
		taxOnstcgOthers2 = ((calculateTaxPayableOnTotalInc(taxOnstcgOthers2, true)  + parseInt(dtaan11b)) * appRateSurcharge );
		taxOnstcgOthers3 = calculateTaxPayableOnTotalInc(taxOnstcgOthers3, true);

		if ((calculateTaxPayableOnTotalInc(taxOnstcgOthers4, true)- parseInt(taxOnstcgOthers3) - parseInt(coalesce(dtaan11b))) > 0) {

			taxOnstcgOthers4 = ((zeroOrMore(calculateTaxPayableOnTotalInc(taxOnstcgOthers4, true) - parseInt(taxOnstcgOthers3) - parseInt(coalesce(dtaan11b)))))  ;

			} else{
			taxOnstcgOthers4 = 0;
			}
		taxOnstcgOthers3 = ((taxOnstcgOthers3 + parseInt(dtaan11b)) * appRateSurcharge );
	}else{
		taxOnstcgOthers0 = (calculateTaxPayableOnTotalInc(taxOnstcgOthers0, true) + parseInt(dtaan11b));
		taxOnstcgOthers1 = (calculateTaxPayableOnTotalInc(taxOnstcgOthers1, true) + parseInt(dtaan11b));
		taxOnstcgOthers2 = (calculateTaxPayableOnTotalInc(taxOnstcgOthers2, true) + parseInt(dtaan11b));
		taxOnstcgOthers3 = calculateTaxPayableOnTotalInc(taxOnstcgOthers3, true);
		if ((calculateTaxPayableOnTotalInc(taxOnstcgOthers4, true) - parseInt(taxOnstcgOthers3) - parseInt(coalesce(dtaan11b))) > 0) {

			taxOnstcgOthers4 = (zeroOrMore(calculateTaxPayableOnTotalInc(taxOnstcgOthers4, true) - parseInt(taxOnstcgOthers3)  - parseInt(coalesce(dtaan11b))));
			} else{
			taxOnstcgOthers4 = 0;
			}
		taxOnstcgOthers3 = taxOnstcgOthers3 + parseInt(dtaan11b);
	}


	 totalUpto15Of6 = taxOnltcgProviso0 + taxOnltcgNonProviso0 + taxOnstcg111A0 + taxOnstcgOthers0 + shortTermUnder30Per0;
	 totalUpto15Of9 = taxOnltcgProviso1 + taxOnltcgNonProviso1 + taxOnstcg111A1 + taxOnstcgOthers1 + shortTermUnder30Per1;
	 totalUp16Of9To15Of12 = taxOnltcgProviso2 + taxOnltcgNonProviso2 + taxOnstcg111A2 + taxOnstcgOthers2 + shortTermUnder30Per2;
	 totalUp16Of12To15Of3 = taxOnltcgProviso3 + taxOnltcgNonProviso3 + taxOnstcg111A3 + taxOnstcgOthers3 + shortTermUnder30Per3;
	 totalUp16Of3To31Of3 = taxOnltcgProviso4 + taxOnltcgNonProviso4 + taxOnstcg111A4 + taxOnstcgOthers4 + shortTermUnder30Per4;


	 //for checking agri_rebate

	var oldTotalUp16Of12To15Of3 = totalUp16Of12To15Of3;

	 totalUpto15Of6= zeroOrMore(eval(parseInt(totalUpto15Of6)- parseInt(rebateOnAgriInc)));
	 totalUpto15Of9= zeroOrMore(eval(parseInt(totalUpto15Of9)- parseInt(rebateOnAgriInc)));
	 totalUp16Of9To15Of12= zeroOrMore(eval(parseInt(totalUp16Of9To15Of12)- parseInt(rebateOnAgriInc)));
	 totalUp16Of12To15Of3= zeroOrMore(eval(parseInt(totalUp16Of12To15Of3)- parseInt(rebateOnAgriInc)));

	 var avaRebate =parseInt(rebateOnAgriInc) - Math.min(parseInt(rebateOnAgriInc), parseInt(oldTotalUp16Of12To15Of3));

	 totalUp16Of3To31Of3 = zeroOrMore(eval(parseInt(totalUp16Of3To31Of3)- parseInt(avaRebate)));


	 var actualTax = [(totalUpto15Of6),(totalUpto15Of9 - totalUpto15Of6),(totalUp16Of9To15Of12 - totalUpto15Of9),(totalUp16Of12To15Of3 - totalUp16Of9To15Of12),(totalUp16Of3To31Of3)];


	 var surcharge115BBE= document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge25ofSI')[0].value;

	 if(marginal1 || (secIncome > 0 && ((coalesce(parseInt(document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartC')[0].value, 10))+

				(coalesce(parseInt(document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub')[0].value, 10))) == 0))) && taxPayer=='1'){

		 totalUpto15Of6 = (parseInt(totalUpto15Of6) +(remove115BBE*0.6) +parseInt(surcharge115BBE) + parseInt(coalesce(parseInt(SurchargeUnderSec) * coalesce(actualTax[0]/TaxpayableUnderSec)))) * 1.03;
		 totalUpto15Of9 = parseInt(totalUpto15Of6) + (parseInt(actualTax[1]) + parseInt(coalesce(parseInt(SurchargeUnderSec) * coalesce(actualTax[1]/TaxpayableUnderSec)))) * 1.03;
		 totalUp16Of9To15Of12 = parseInt(totalUpto15Of9) + (parseInt(actualTax[2]) + parseInt(coalesce(parseInt(SurchargeUnderSec) * coalesce(actualTax[2]/TaxpayableUnderSec)))) * 1.03;


		 totalUp16Of12To15Of3 = (parseInt(coalesce(totalUp16Of9To15Of12), 10)+(parseInt(coalesce(actualTax[3]), 10)+
					parseInt(coalesce(SurchargeOnly44AD), 10) +	(parseInt(coalesce(SurchargeUnderSec), 10) *
							((parseInt(coalesce(actualTax[3]), 10)-parseInt(coalesce(TaxPayableOnly44AD), 10))/
									parseInt(coalesce(TaxpayableUnderSec), 10))))* 1.03); // old working changes

		 if (parseInt(coalesce(TaxpayableUnderSec), 10) == 0)
			{
			 totalUp16Of12To15Of3 = (parseInt(coalesce(totalUp16Of9To15Of12), 10)+(parseInt(coalesce(actualTax[3]), 10)+
						parseInt(coalesce(SurchargeOnly44AD), 10) )* 1.03);
			}

		 totalUp16Of3To31Of3 = (parseInt(actualTax[4]) + parseInt(coalesce( parseInt(SurchargeUnderSec) * actualTax[4]/TaxpayableUnderSec))) * 1.03;


		}else{
		if(SurchargeUnderSec>0){

			if( statusCompany == "1" || statusCompany == "2" || statusCompany == "17" || statusCompany == "15" || statusCompany == "16" || statusCompany == "4" || statusCompany == "5"){

				 totalUpto15Of6 =parseInt( (parseInt(totalUpto15Of6) + parseInt(surcharge115BBE) + parseInt(actualTax[0])*0.12) * 1.03);
				 totalUpto15Of9 = parseInt(totalUpto15Of6) + (parseInt(actualTax[1]) + actualTax[1]*0.12) * 1.03;
				 totalUp16Of9To15Of12 = parseInt(totalUpto15Of9) + (parseInt(actualTax[2]) + actualTax[2]*0.12) * 1.03;
				 totalUp16Of12To15Of3 = parseInt(totalUp16Of9To15Of12) + (parseInt(actualTax[3]) + actualTax[3]*0.12) * 1.03;
				 totalUp16Of3To31Of3 = (parseInt(actualTax[4]) + actualTax[4]*0.12) * 1.03;
			}else
				{
				 totalUpto15Of6 =parseInt( (parseInt(totalUpto15Of6) + parseInt(surcharge115BBE) + parseInt(actualTax[0])*0.15) * 1.03);
				 totalUpto15Of9 = parseInt(totalUpto15Of6) + (parseInt(actualTax[1]) + actualTax[1]*0.15) * 1.03;
				 totalUp16Of9To15Of12 = parseInt(totalUpto15Of9) + (parseInt(actualTax[2]) + actualTax[2]*0.15) * 1.03;
				 totalUp16Of12To15Of3 = parseInt(totalUp16Of9To15Of12) + (parseInt(actualTax[3]) + actualTax[3]*0.15) * 1.03;
				 totalUp16Of3To31Of3 = (parseInt(actualTax[4]) + actualTax[4]*0.15) * 1.03;
				}
		}
		else{
			totalUpto15Of6 = parseInt((parseInt(totalUpto15Of6) + parseInt(surcharge115BBE)) * 1.03);
			totalUpto15Of9 = parseInt(totalUpto15Of6) + (parseInt(actualTax[1]) ) * 1.03;
			 totalUp16Of9To15Of12 = parseInt(totalUpto15Of9) + (parseInt(actualTax[2]) ) * 1.03;
			 totalUp16Of12To15Of3 = parseInt(totalUp16Of9To15Of12) + (parseInt(actualTax[3])) * 1.03;
			 totalUp16Of3To31Of3 = (parseInt(actualTax[4]) ) * 1.03;

			}
	}

	netTaxLiability = 0;

	othExemptions = eval(
	+	parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxRelief.totTaxRelief'), 10)
	+ parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.creditUS115JD'), 10)
	);

	}else{
		taxOnWinLottRacePuzz = 0;
		totSplRateIncTax = 0;
		othExemptions = 0;
	}


	var intrst234C0 = parseInt('0' ,10);
	var intrst234Ci = parseInt('0' ,10);
	var intrst234Cii = parseInt('0' ,10);
	var intrst234Ciii = parseInt('0' ,10);
	var intrst234Civ = parseInt('0' ,10);

	var tempintrstBeforeSlab0 = parseInt('0' ,10);
	var tempintrstBeforeSlab1 = parseInt('0' ,10);
	var tempintrstBeforeSlab2 = parseInt('0' ,10);
	var tempintrstBeforeSlab3 = parseInt('0' ,10);
	var totSlab = parseInt('0' ,10);


	if(( eval(parseInt(balTaxPayable.value ,10) - parseInt(TDS ,10) - parseInt(TCS ,10)) >=  parseInt('10000',10))){

		var totSplRateIncTax = 0;



		if(parseInt(slab0 ,10) < eval((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax ,10) + totalUpto15Of6 + siTax  - parseInt(othExemptions)  - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.12'))){



			tempintrstBeforeSlab0 = (parseInt(netTaxLiability, 10) + parseInt(totSplRateIncTax ,10) + totalUpto15Of6  + siTax - parseInt(othExemptions) - parseInt(TDS ,10) - parseInt(TCS ,10)  * parseFloat('0.15'));



			var tempintrst234C0 = (((parseInt(netTaxLiability, 10) + parseInt(totSplRateIncTax ,10) + totalUpto15Of6  + siTax  - parseInt(othExemptions) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.15'))  - parseInt(slab0 ,10));

			if(parseInt(tempintrst234C0,10) > 100){
				tempintrst234C0= Math.floor(parseInt(tempintrst234C0,10)/100)*parseInt('100' ,10);
			}


			intrst234C0=parseInt(tempintrst234C0,10)* parseFloat('0.01') * parseInt('3' ,10);
		}

		if(eval(parseInt(slab0 ,10) + parseInt(slab1 ,10)) < eval((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax, 10) + totalUpto15Of9 + siTax - parseInt(othExemptions) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.36') )){

			tempintrstBeforeSlab1 = ((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax ,10) + totalUpto15Of9 + siTax - parseInt(othExemptions) - parseInt(TDS ,10) - parseInt(TCS ,10))* parseFloat('0.45')) ;

			var tempintrst234Ci = (((parseInt(netTaxLiability, 10) + parseInt(totSplRateIncTax, 10) + totalUpto15Of9 - parseInt(othExemptions) + siTax - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.45') )  - parseInt(slab0 ,10) - parseInt(slab1 ,10) );

			if(parseInt(tempintrst234Ci,10) > 100){
				tempintrst234Ci= Math.floor(parseInt(tempintrst234Ci,10)/100)*parseInt('100' ,10);
			}
			intrst234Ci=parseInt(tempintrst234Ci,10)* parseFloat('0.01') * parseInt('3' ,10) ;
		}

		if(eval(parseInt(slab0 ,10) + parseInt(slab1 ,10) + parseInt(slab2 ,10)) < eval((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax ,10) + totalUp16Of9To15Of12 + siTax - parseInt(othExemptions) -  parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.75') )){
			tempintrstBeforeSlab2 =((parseInt(netTaxLiability, 10) + parseInt(totSplRateIncTax ,10) + totalUp16Of9To15Of12 + siTax - parseInt(othExemptions) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.75')) ;
			var tempintrst234Cii = (((parseInt(netTaxLiability, 10) + parseInt(totSplRateIncTax ,10) + totalUp16Of9To15Of12 + siTax - parseInt(othExemptions) - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('0.75') )  - parseInt(slab0 ,10) -parseInt(slab1 ,10) - parseInt(slab2 ,10) );
			if(parseInt(tempintrst234Cii,10) > 100){
				tempintrst234Cii= Math.floor(parseInt(tempintrst234Cii,10)/100)*parseInt('100' ,10);
			}
			intrst234Cii=parseInt(tempintrst234Cii,10)* parseFloat('0.01') * parseInt('3' ,10) ;
		}


		var tempintrstForAdvTax = zeroOrMore((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax ,10)  + totalUp16Of12To15Of3 + siTax - parseInt(othExemptions)  - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('1'));

		if(eval(parseInt(slab0 ,10) + parseInt(slab1 ,10) + parseInt(slab2 ,10) + parseInt(slab3 ,10)) < eval((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax ,10) + totalUp16Of12To15Of3 + siTax - parseInt(othExemptions) -  parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('1' ,10))){

			tempintrstBeforeSlab3 = ((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax ,10)  + totalUp16Of12To15Of3 + siTax - parseInt(othExemptions)  - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('1'));

			var tempintrst234Ciii = zeroOrMore(((parseInt(netTaxLiability, 10)  + parseInt(totSplRateIncTax ,10)  + totalUp16Of12To15Of3 + siTax - parseInt(othExemptions)  - parseInt(TDS ,10) - parseInt(TCS ,10)) * parseFloat('1')) - parseInt(slab0 ,10)- parseInt(slab1 ,10)- parseInt(slab2 ,10) - parseInt(slab3 ,10) );

			if(parseInt(tempintrst234Ciii,10) > 100){
				tempintrst234Ciii= Math.floor(parseInt(tempintrst234Ciii,10)/100)*parseInt('100' ,10);
			}
			intrst234Ciii=parseInt(tempintrst234Ciii,10)* parseFloat('0.01') * parseInt('1' ,10) ;

		}

		totSlab =  parseInt(slab0 ,10) + parseInt(slab1 ,10) + parseInt(slab2 ,10) + parseInt(slab3 ,10);

		var usedTdsTcs = zeroOrMore(parseInt(TDS ,10) + parseInt(TCS ,10) + parseInt(othExemptions));
		 var avlTdsTcs =0;


		avlTdsTcs = zeroOrMore(parseInt(usedTdsTcs) - Math.min(parseInt(usedTdsTcs), parseInt(totalUp16Of12To15Of3)));

		totalUp16Of3To31Of3 =zeroOrMore(eval( totalUp16Of3To31Of3 - parseInt(avlTdsTcs, 10)));


		if( parseInt(tempintrstBeforeSlab3,10) == 0){
			var avalSlab = parseInt(totSlab) - Math.min(parseInt(totSlab), parseInt(tempintrstForAdvTax));
		}

		else {

		avalSlab = parseInt(totSlab) - Math.min(parseInt(totSlab), parseInt(tempintrstBeforeSlab3));
		}

		if(eval( parseInt(slab4 ,10)) < totalUp16Of3To31Of3){
			var tempintrst234Civ =zeroOrMore(totalUp16Of3To31Of3 -  parseInt(slab4 ,10) -  parseInt(avalSlab ,10));
			if(parseInt(tempintrst234Civ,10) > 100){
				tempintrst234Civ= Math.floor(parseInt(tempintrst234Civ,10)/100)*parseInt('100' ,10);
			}
			intrst234Civ=parseInt(tempintrst234Civ,10)* parseFloat('0.01') * parseInt('1' ,10) ;
		}
	}

	else {
		 intrst234C0 = parseInt('0',10);
		 intrst234Ci = parseInt('0',10);
		 intrst234Cii = parseInt('0',10);
		 intrst234Ciii = parseInt('0',10);
		 intrst234Civ = parseInt('0',10);
	}



	intrst234C = eval(parseInt(intrst234C0 ,10) + parseInt(intrst234Ci ,10) + parseInt(intrst234Cii ,10) + parseInt(intrst234Ciii ,10) + parseInt(intrst234Civ ,10));




	if((secIncome > 0 &&((coalesce(parseInt(document.getElementsByName('scheduleVIA.deductUndChapVIA.totalDeductionPartC')[0].value, 10))+

			(coalesce(parseInt(document.getElementsByName('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub')[0].value, 10))) == 0)) && taxPayer=='1') && ((parseInt((taxpayableIncSec44-othExemptions)*1.03)- parseInt(TDS ,10) - parseInt(TCS ,10))  <  parseInt('10000',10))){

		intrst234C = parseInt('0',10);
	}

	}catch(e){
		alert('Error in calculate234cIntrst: ' + e.stack);
	}

	return intrst234C;

}

function isMarginalRelfApplcbl(){
	var surcharge = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.totalSurcharge')[0];
	var taxPybl = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc')[0];
	if(parseInt(surcharge.value) > 0){
		if(parseInt(surcharge.value * 0.15) != taxPybl.value){
			return true;
		}
	}
	return false;
}

//To calculate exemptions
function applyExemption2017(original, exemption,appRate) {
	var remaining = exemption;
	var nonZero = 0;
	for (var i = original.length - 1; i >= 0; i--) {
		if (i > 0 && (i < original.length - 1 || (appRate && i < original.length))) {
			original[i] = original[i] - original[i - 1];
		}
		if (original[i] != 0) {
			nonZero++;
		}
	}
	if (nonZero == 0) {
		return original;
	}
	var total = 0;
	for (var i = 0; i < original.length; i++) {
		if (parseInt(original[i], 10) > parseInt(0, 10)) {
			if (parseInt(original[i]) > parseInt(remaining)) {
				original[i] = (parseInt(original[i], 10)) - remaining;
				remaining = 0;
			} else {
				remaining = remaining - original[i];
				original[i] = 0;
			}
		}
		if (i > 0
				&& (i < original.length - 1 || (appRate && i < original.length))) {
			original[i] = original[i] + original[i - 1];
		}
		total = eval(parseInt(total, 10) + parseInt(original[i]));
	}
	if (parseInt(remaining, 10) > parseInt(0, 10) && total > parseInt(0, 10)) {
		original = applyExemption2017(original, remaining);
	}

	return original;
}


function rndOffNrsTen(newVar){

            if(  parseInt(newVar.toString().charAt(newVar.toString().length-1),10) >= parseInt('5',10)){
                    newVar = eval(Math.floor(eval(parseInt(newVar,10) / parseInt('10',10))) * parseInt('10',10));
                    newVar = eval(parseInt(newVar,10) + parseInt('10',10));

                    return newVar;
            }else{
                    newVar = eval(Math.floor(eval(parseInt(newVar,10) / parseInt('10',10))) * parseInt('10',10));

                    return newVar;
            }

        }

/*function calsurchargeOnAmtcAboveCrore(){
	var taxPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.taxDeemedTISec115JC')[0];
	var surchargeOnAboveCrore = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.surchargeA')[0];
	var totInc = document.getElementsByName('itrScheduleAMT.adjustedUnderSec115JC')[0];	totInc.value = coalesce(totInc.value);

	var statusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

	var substatusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	// for surcharge
				var taxOnTotInc =  parseInt(taxPayable.value,10);

				var taxOnCutOffInc = (10000000 * .185);

				if( rndOffNrsTen(totInc.value) > 10000000 ){

						if( statusCompany == "1" || statusCompany == "2" || (statusCompany == "14" && (substatusCompany == "3" || substatusCompany == "15" || substatusCompany == "16" || substatusCompany == "4")) || (statusCompany == "1" && substatusCompany == "5")){

							var surchargeRate = 0.12;
						}else
							{
							var surchargeRate = 0.15;
							}

						var tempSurcharge = taxOnTotInc  * surchargeRate;

						//check if eligible for marginal relief
						var extraInc = rndOffNrsTen(totInc.value) - 10000000;

						if( statusCompany == "1" || statusCompany == "2" || (statusCompany == "14" && (substatusCompany == "3" || substatusCompany == "15" || substatusCompany == "16" || substatusCompany == "4")) || (statusCompany == "1" && substatusCompany == "5")){
									if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc + (taxOnCutOffInc * 0.10)) ){

										var marginalRelief =zeroOrMore( taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc));

										surchargeOnAboveCrore.value = zeroOrMore(tempSurcharge - marginalRelief);
										surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);

									}else {
										surchargeOnAboveCrore.value = tempSurcharge;
										surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
										}
						}else
							{
									if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc + (taxOnCutOffInc * 0.10)) ){

										var marginalRelief =zeroOrMore( taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc + (taxOnCutOffInc * 0.10)));

										surchargeOnAboveCrore.value = zeroOrMore(tempSurcharge - marginalRelief);
										surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);

									}else {
										surchargeOnAboveCrore.value = tempSurcharge;
										surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
										}
							}

				} else if( (rndOffNrsTen(totInc.value) > 5000000 && rndOffNrsTen(totInc.value) <= 10000000) && !( statusCompany == "1" || statusCompany == "2" || (statusCompany == "14" && (substatusCompany == "3" ||  substatusCompany == "15" ||  substatusCompany == "16" || substatusCompany == "4")) || (statusCompany == "1" && substatusCompany == "5")) ){

						var taxOnCutOffInc1= (5000000 * .185);
						var surchargeRate = 0.10;

						var tempSurcharge = taxOnTotInc  * surchargeRate;

						//check if eligible for marginal relief
						var extraInc = rndOffNrsTen(totInc.value) - 5000000;

						if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc1 + extraInc)){
							var marginalRelief =zeroOrMore( taxOnTotInc + tempSurcharge - (taxOnCutOffInc1 + extraInc ));
							surchargeOnAboveCrore.value = zeroOrMore(tempSurcharge - marginalRelief);
							surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);

						}else {
							surchargeOnAboveCrore.value = tempSurcharge;
							surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
							}

				} else {
					 surchargeOnAboveCrore.value = parseInt('0' ,10);
				}
	}*/
function calsurchargeOnAmtcAboveCrore(){
	var taxPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.taxDeemedTISec115JC')[0];
	var surchargeOnAboveCrore = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.surchargeA')[0];
	var totInc = document.getElementsByName('itrScheduleAMT.adjustedUnderSec115JC')[0];	totInc.value = coalesce(totInc.value);
	var statusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;


	// for surcharge
				var taxOnTotInc =  parseInt(taxPayable.value,10);
				var taxOnCutOffInc = (10000000 * .185);

				if( rndOffNrsTen(totInc.value) > 10000000 ){
					var tempSurcharge = taxOnTotInc  * 0.15 ;
					var extraInc = rndOffNrsTen(totInc.value) - 10000000;
					if(statusCompany=='1'||statusCompany=='2'||substatusCompany=='15'||substatusCompany=='16'||substatusCompany=='17'||substatusCompany=='4'){
						tempSurcharge = taxOnTotInc  * 0.12 ;
						if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc)){
							var marginalRelief = taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc );
							surchargeOnAboveCrore.value = tempSurcharge - marginalRelief;
							surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);

						}else {
							surchargeOnAboveCrore.value = tempSurcharge;
							surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
							}
					}
					else{
						if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc  + (taxOnCutOffInc * 0.10))){
							var marginalRelief = taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc + (taxOnCutOffInc * 0.10));
							surchargeOnAboveCrore.value = tempSurcharge - marginalRelief;
							surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);

						}else {
							surchargeOnAboveCrore.value = tempSurcharge;
							surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
							}
					}

				}

				else if( (rndOffNrsTen(totInc.value) > 5000000 && rndOffNrsTen(totInc.value) <= 10000000)&& !( statusCompany == "1" || statusCompany == "2" || (statusCompany == "14" && (substatusCompany == "17" || substatusCompany == "15" || substatusCompany == "16" || substatusCompany == "4")) ) ){
					var taxOnCutOffInc1= (5000000 * .185);
					var surchargeRate = 0.10;

					var tempSurcharge = taxOnTotInc  * surchargeRate;

					//check if eligible for marginal relief
					var extraInc = rndOffNrsTen(totInc.value) - 5000000;


					if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc1 + extraInc)){
						var marginalRelief =zeroOrMore( taxOnTotInc + tempSurcharge - (taxOnCutOffInc1 + extraInc ));
						surchargeOnAboveCrore.value = zeroOrMore(tempSurcharge - marginalRelief);
						surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);

					}else {
						surchargeOnAboveCrore.value = tempSurcharge;
						surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
						}

				}

				else {
					 surchargeOnAboveCrore.value = parseInt('0' ,10);
				}
	}

function calculatePartBTTI_first(cgosIncome)
{
	try{
	//1
	var taxOnDeemedTotIncSec115JB = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.taxDeemedTISec115JC')[0];
	taxOnDeemedTotIncSec115JB.value = eval(parseInt(coalesceSetRet('itrScheduleAMT.taxPayableUnderSec115JC'),10));

	//surcharge on 1a
	calsurchargeOnAmtcAboveCrore();

	var educationCess = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.educationCess')[0];

	educationCess.value = Math.round((parseInt(taxOnDeemedTotIncSec115JB.value, 10)+
			parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.surchargeA'),10)) * 0.03	);

	var totalTax = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.totalTax')[0];
	totalTax.value = eval(parseInt(taxOnDeemedTotIncSec115JB.value,10)+ parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.surchargeA'),10)+
						+ parseInt(educationCess.value,10));
	//2
	var incTax = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0];
	setEditableFieldValue(incTax,parseInt(calculateTaxPayableOnTotalInc(zeroOrMore( eval( parseInt(coalesceSetRet('partBTI.aggregateIncome'),10)))),10));

	var taxAtSpecialRates = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0];
	var substatusCompany = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	if(substatusCompany==7 || substatusCompany==13 || substatusCompany==12){
		setEditableFieldValue(taxAtSpecialRates,eval(	parseInt(coalesceSetRet('scheduleSI.totSplRateIncTax'),10)));
	}else{
		taxAtSpecialRates.value = eval(	parseInt(coalesceSetRet('scheduleSI.totSplRateIncTax'),10));
	}
	calculateRebateAgriculture();
	var rebateAgriculture = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0];
	var taxPayableOnTotInc = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc')[0];

	taxPayableOnTotInc.value = zeroOrMore(eval(parseInt(incTax.value,10)
								+ parseInt(coalesce(taxAtSpecialRates.value,10))
								- parseInt(coalesce(rebateAgriculture.value),10)));

	//Surcharge on 2d
	calsurchargeOnAboveCrore(cgosIncome);
	surcharge201718();

	var surchargeOnAboveCrore = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.totalSurcharge')[0];

	//3
	var educationCess = document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0];

	var cess = Math.round(eval((parseInt(taxPayableOnTotInc.value,10) +
			parseInt(surchargeOnAboveCrore.value,10)) * 0.03));

	setEditableFieldValue(educationCess,cess);

	//4
	var surchargeTotal = coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.totalSurcharge');
	var grossTaxLiability = document.getElementsByName('partBTTI.computationOfTaxLiability.grossTaxLiability')[0];
	grossTaxLiability.value = eval(
		parseInt(taxPayableOnTotInc.value,10)
		+ parseInt(surchargeTotal,10)
		+ parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.educationCess'),10));

	//5
	var grossTaxPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.grossTaxPayable')[0];
	grossTaxPayable.value = Math.max(parseInt(grossTaxLiability.value,10),parseInt(totalTax.value,10));

	}catch(e){
		alert('calculatePartBTTI_first: ' + e.stack);
	}
}

function calsurchargeOnAboveCrore(cgosIncome){
	var taxPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc')[0];

	var surchargeOnAboveCrore = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.totalSurcharge')[0];

	var surchargeOn2F = document
	.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0];

	var totInc = document.getElementsByName('partBTI.totalIncome')[0].value;	totInc = coalesce(totInc);

	var surcharge = 0;
	var totalIncome = document.getElementsByName('partBTI.totalIncome')[0].value;
	var incChargeTaxSplRate111A112 = document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value;
	var taxAtSpecialRates = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].value;

	var dtaaInc = document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateInc')[0].value;
	var b115Inc = document.getElementsByName('scheduleSI.splCodeRateTax[2].splRateInc')[0].value;
	var dtaaTax = document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0].value;
	var b115Taxed = 0;
	var b115Tax = 0;

	var statusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	// for surcharge

				var taxOnTotInc = parseInt(calculateTaxPayableOnTotalInc(totalIncome - incChargeTaxSplRate111A112)) + parseInt(taxAtSpecialRates);

				var normalInc = getSlabbedIncome(parseInt(totalIncome - incChargeTaxSplRate111A112));

				if( rndOffNrsTen(totInc) > 5000000 && rndOffNrsTen(totInc) <= 10000000 ){

					var toBeTaxed = 5000000 - coalesce(dtaaInc);
				}else
					{
					var toBeTaxed = 10000000 - coalesce(dtaaInc);
					}


				var rowCount1 = countRowInTable('scheduleSI.splCodeRateTax', 'splRateInc');

				var percent5SIInc = 0;

				var percent10SIInc = 0;

				var percent15SIInc = 0;

				var percent20SIInc = 0;

				var percent125SIInc = 0;

				var percent25SIInc = 0;

				var percent30SIInc = 0;

				var percent50SIInc = 0;

				var percent60SIInc= 0;


				for ( var i = 0; i < rowCount1; i++) {

					var splCodeValue = document
							.getElementsByName('scheduleSI.splCodeRateTax[' + i
									+ '].splRateInc')[0].value;
					var splRatePercent = document
							.getElementsByName('scheduleSI.splCodeRateTax[' + i
									+ '].splRatePercent')[0].value;

					if (splRatePercent == 5) {

						percent5SIInc = eval(parseInt(percent5SIInc, 10)
								+ parseInt(document
										.getElementsByName('scheduleSI.splCodeRateTax[' + i
												+ '].taxableInc')[0].value, 10));

					} else if (splRatePercent == 10) {

						percent10SIInc = eval(parseInt(percent10SIInc, 10)
								+ parseInt(document
										.getElementsByName('scheduleSI.splCodeRateTax[' + i
												+ '].taxableInc')[0].value, 10));

					} else if (splRatePercent == 12.5) {

						percent125SIInc = eval(parseInt(percent125SIInc, 10)
								+ parseInt(document
										.getElementsByName('scheduleSI.splCodeRateTax[' + i
												+ '].taxableInc')[0].value, 10));

					}else if (splRatePercent == 15) {

						percent15SIInc = eval(parseInt(percent15SIInc, 10)
								+ parseInt(document
										.getElementsByName('scheduleSI.splCodeRateTax[' + i
												+ '].taxableInc')[0].value, 10));

					} else if (splRatePercent == 20) {

						percent20SIInc = eval(parseInt(percent20SIInc, 10)
								+ parseInt(document
										.getElementsByName('scheduleSI.splCodeRateTax[' + i
												+ '].taxableInc')[0].value, 10));

					} else if (splRatePercent == 25) {

						percent25SIInc = eval(parseInt(percent25SIInc, 10)
								+ parseInt(document
										.getElementsByName('scheduleSI.splCodeRateTax[' + i
												+ '].taxableInc')[0].value, 10));

					} else if (splRatePercent == 30) {

						percent30SIInc = eval(parseInt(percent30SIInc, 10)
								+ parseInt(document
										.getElementsByName('scheduleSI.splCodeRateTax[' + i
												+ '].taxableInc')[0].value, 10));

					}else if (splRatePercent == 60) {

				percent60SIInc = eval(parseInt(percent60SIInc, 10)
						+ parseInt(document
								.getElementsByName('scheduleSI.splCodeRateTax[' + i
										+ '].taxableInc')[0].value, 10));
						}
				}

				var cgTax = 0;

				var cgTaxed = 0;

				var exmptn10 = coalesceSetRet('scheduleSI.splCodeRateTax[5].splRateInc') -
				coalesceSetRet('scheduleSI.splCodeRateTax[5].taxableInc');

				var exmptn15 = coalesceSetRet('scheduleSI.splCodeRateTax[3].splRateInc') -
				coalesceSetRet('scheduleSI.splCodeRateTax[3].taxableInc');

				var exmptn20 = coalesceSetRet('scheduleSI.splCodeRateTax[4].splRateInc') -
				coalesceSetRet('scheduleSI.splCodeRateTax[4].taxableInc');

				var exemption = getExemption() - exmptn10 - exmptn15 - exmptn20;

				var normal10Tax = 0;

				var normal20Tax = 0;

				var normal30Tax = 0;

				var exemptionUsed = 0;

				if (parseInt(totalIncome - incChargeTaxSplRate111A112) > 0) {
					if (parseInt(totalIncome - incChargeTaxSplRate111A112) >= getExemption()) {
						exemptionUsed = getExemption();
					} else {
						exemptionUsed = parseInt(totalIncome - incChargeTaxSplRate111A112);
					}

				}

				toBeTaxed = zeroOrMore(parseInt(toBeTaxed - exemptionUsed - exmptn10 - exmptn15 - exmptn20));

				percent5SIInc = parseInt(percent5SIInc, 10)+ parseInt(normalInc["5"], 10);

				if (parseInt(percent5SIInc, 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (percent5SIInc) * 0.05;
					cgTaxed = parseInt(cgTaxed) + percent5SIInc;
					toBeTaxed -= parseInt(percent5SIInc, 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.05;
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				percent10SIInc = parseInt(percent10SIInc, 10)+ parseInt(normalInc["10"], 10);

				if (parseInt(percent10SIInc, 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (percent10SIInc) * 0.1;
					cgTaxed = parseInt(cgTaxed) + percent10SIInc;
					toBeTaxed -= parseInt(percent10SIInc, 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.1;
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				if (parseInt(percent125SIInc, 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (percent125SIInc) *parseFloat(0.125);
					cgTaxed = parseInt(cgTaxed) + percent125SIInc;
					toBeTaxed -= parseInt(percent125SIInc, 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * parseFloat(0.125);
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				if (parseInt(percent15SIInc, 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (percent15SIInc) * parseFloat(0.15);
					cgTaxed = parseInt(cgTaxed) + percent15SIInc;
					toBeTaxed -= parseInt(percent15SIInc, 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * parseFloat(0.15);
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				percent20SIInc = parseInt(percent20SIInc, 10) + parseInt(normalInc["20"], 10);

				if (parseInt(percent20SIInc, 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (percent20SIInc) * 0.2;
					cgTaxed = parseInt(cgTaxed) + percent20SIInc;
					toBeTaxed -= parseInt(percent20SIInc, 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.2;
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				if (parseInt(percent25SIInc, 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (percent25SIInc) * 0.25;
					cgTaxed = parseInt(cgTaxed) + percent25SIInc;
					toBeTaxed -= parseInt(percent25SIInc, 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.25;
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				percent30SIInc = parseInt(percent30SIInc, 10)
						+ parseInt(normalInc["30"], 10);

				if (parseInt(percent30SIInc, 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (percent30SIInc) * 0.3;
					cgTaxed = parseInt(cgTaxed) + percent30SIInc;
					toBeTaxed -= parseInt(percent30SIInc, 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.3;
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				if (parseInt(normalInc["40"], 10) < parseInt(toBeTaxed, 0)) {
					cgTax = parseInt(cgTax, 10) + (normalInc["40"]) * 0.4;
					cgTaxed = parseInt(cgTaxed) + normalInc["40"];
					toBeTaxed -= parseInt(normalInc["40"], 0);
				} else {
					cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.4;
					cgTaxed = parseInt(cgTaxed) + toBeTaxed;
					toBeTaxed = 0;
				}

				//Added for 5BBE 60%

				percent60SIInc= parseInt(percent60SIInc,10);

				var taxbefore60per = parseInt(coalesce(cgTax));

				if(parseInt(percent60SIInc, 10) < parseInt(toBeTaxed, 0)){
					cgTax =  parseInt(cgTax, 10)+(percent60SIInc) * 0.60 * 1.25;
					cgTaxed = parseInt(cgTaxed)+ percent60SIInc;
					toBeTaxed -= parseInt(percent60SIInc, 0);
				}else{
					cgTax = parseInt(cgTax, 10)+ (toBeTaxed ) * 0.60 * 1.25;
					cgTaxed = parseInt(cgTaxed)+toBeTaxed;
					toBeTaxed = 0;
				}

				var taxOnCutOffInc = eval(parseInt(coalesce(cgTax)) + parseInt(coalesce(dtaaTax)));





				 if( rndOffNrsTen(totInc) > 10000000 ){

					 if(statusCompany == "1" || statusCompany == "2" || (statusCompany == "14" && (substatusCompany == "17" || substatusCompany == "15" || substatusCompany == "16" || substatusCompany == "4"))){

							var surchargeRate = 0.12;
						}else
							{
							var surchargeRate = 0.15;
							}

						//For 115BBE
						var f_115BBE = eval(parseInt(
								coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc'),
								10)
								- (parseInt(
										coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
										10) * 0.60));

						var tempSurcharge = eval((surchargeRate * parseInt(f_115BBE, 10))
								+ (parseInt(
										coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
										10) * 0.60 * 0.25));

						//check if eligible for marginal relief

						var extraInc = rndOffNrsTen(totInc) - 10000000;

						var surchargeOn1Cr = taxbefore60per*0.1;

						if(statusCompany == "1" || statusCompany == "2" || (statusCompany == "14" && (substatusCompany == "17" || substatusCompany == "15" || substatusCompany == "16" || substatusCompany == "4")))
							{

									if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc)){

										var marginalRelief = zeroOrMore(taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc));
										surcharge = zeroOrMore(tempSurcharge - marginalRelief);
										surcharge  = Math.round(surcharge);

									}else {
										surcharge = tempSurcharge;
										surcharge  = Math.round(surcharge);
										}
							}else
								{

										if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc + surchargeOn1Cr)){

											var marginalRelief = zeroOrMore(taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc + surchargeOn1Cr));

											surcharge = zeroOrMore(tempSurcharge - marginalRelief);
											surcharge  = Math.round(surcharge);

										}else {
											surcharge = tempSurcharge;
											surcharge  = Math.round(surcharge);
											}
								}

				}else if( (rndOffNrsTen(totInc) > 5000000 && rndOffNrsTen(totInc) <= 10000000) && !( statusCompany == "1" || statusCompany == "2" || (statusCompany == "14" && (substatusCompany == "17" || substatusCompany == "15" || substatusCompany == "16" || substatusCompany == "4")) ) ){

					var surchargeRate = 0.10;

					//For 115BBE
					var f_115BBE = eval(parseInt(
							coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc'),
							10)
							- (parseInt(
									coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
									10) * 0.60));

					var tempSurcharge = eval((surchargeRate * parseInt(f_115BBE, 10))
							+ (parseInt(
									coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
									10) * 0.60 * 0.25));


					//check if eligible for marginal relief
					var extraInc = rndOffNrsTen(totInc) - 5000000;




					if( (taxOnTotInc + tempSurcharge ) > (taxOnCutOffInc + extraInc)){

						var marginalRelief = zeroOrMore(taxOnTotInc + tempSurcharge - (taxOnCutOffInc + extraInc));

						surcharge = zeroOrMore(tempSurcharge - marginalRelief);
						surcharge  = Math.round(surcharge);


					}else {
						surcharge = tempSurcharge;
						surcharge  = Math.round(surcharge);
						}

			}else {
					surcharge = parseInt('0' ,10);
				}



				setEditableFieldValue(surchargeOnAboveCrore, surcharge);

				var surcharge2F = zeroOrMore(eval(surcharge-
						(parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),10) * 0.60* 0.25)));

				setEditableFieldValue(surchargeOn2F, surcharge2F);
	}

function calculatePartBTTI_second(cgosIncome)
{
	try{

		surcharge201718();
	//1
	var totalTax = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.totalTax')[0];
	//4
	var grossTaxLiability = document.getElementsByName('partBTTI.computationOfTaxLiability.grossTaxLiability')[0];

	//5
	var grossTaxPayable = document.getElementsByName('partBTTI.computationOfTaxLiability.grossTaxPayable')[0];

	//6
	var credUs115JAATaxPaid = document.getElementsByName('partBTTI.computationOfTaxLiability.creditUS115JD')[0];
	if(parseInt(grossTaxLiability.value,10) > parseInt(totalTax.value,10)){

		credUs115JAATaxPaid.value = coalesceSetRet('scheduleAMTC.taxSection115JD');
	}else{
		credUs115JAATaxPaid.value = 0;
	}

	//7
	var taxPaidUnderCredit = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPaidUnderCredit')[0];
	taxPaidUnderCredit.value = eval(parseInt(grossTaxPayable.value,10)
												- parseInt(credUs115JAATaxPaid.value,10));

	//8
	var section90 = document.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.section90')[0];
	section90.value = eval(
		parseInt(coalesceSetRet('scheduleTR1.totalIncomeOutIndia'),10)
		);
	var section91 = document.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.section91')[0];
	section91.value = eval(
		parseInt(coalesceSetRet('scheduleTR1.totalIncomeOutIndiaDTAA'),10)
		);
	var totTaxRelief = document.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.totTaxRelief')[0];
	totTaxRelief.value = eval(	parseInt(section90.value,10)
								+ parseInt(section91.value,10));

    //9
	var netTaxLiability = document.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0];
	netTaxLiability.value = zeroOrMore(eval(
											parseInt(taxPaidUnderCredit.value,10)
											- parseInt(totTaxRelief.value,10)	));

	//12

	calculateAdvancedTax();
	calculateTDS();
	calculateTCS();


	var totalTaxesPaid = document.getElementsByName('partBTTI.taxPaid.taxesPaid.totalTaxesPaid')[0];
	totalTaxesPaid.value = eval(
	parseInt(coalesceSetRet('partBTTI.taxPaid.taxesPaid.advanceTax'),10)
	+ parseInt(coalesceSetRet('partBTTI.taxPaid.taxesPaid.selfAssessmentTax'),10)
	+ parseInt(coalesceSetRet('partBTTI.taxPaid.taxesPaid.tds'),10)
	+ parseInt(coalesceSetRet('partBTTI.taxPaid.taxesPaid.tcs'),10)
	);

	//10
	calcInterestPayable(cgosIncome);

	var totIntrstPay = document.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.totalIntrstPay')[0]; totIntrstPay.value = coalesce(totIntrstPay.value);

	//11
	var aggregateTaxInterestLiability = document.getElementsByName('partBTTI.computationOfTaxLiability.aggregateTaxInterestLiability')[0]; aggregateTaxInterestLiability.value = coalesce(aggregateTaxInterestLiability.value);
	aggregateTaxInterestLiability.value = eval(netTaxLiability.value) + eval(totIntrstPay.value);

	//13
	var balTaxPayable = document.getElementsByName('partBTTI.taxPaid.balTaxPayable')[0];
	//14
	var refundsDue = document.getElementsByName('partBTTI.refundsDue')[0];

	var totFinalAmtPayorRefund = parseInt(aggregateTaxInterestLiability.value,10) - parseInt(totalTaxesPaid.value,10);

	if(zeroOrMore(totFinalAmtPayorRefund)){
		balTaxPayable.value =  rndOffNrsTen(Math.abs(totFinalAmtPayorRefund));
		refundsDue.value = parseInt(0,10);
	}else{
		balTaxPayable.value = parseInt(0,10);
		refundsDue.value =  rndOffNrsTen(Math.abs(totFinalAmtPayorRefund));
	}

	showEpay();

	}catch(e){
		alert('calculatePartBTTI_second:' + e.stack);
	}
}


function calculateAdvancedTax(){
	var advanceTax = parseInt('0' ,10) ;
	var selfAssessmentTax = parseInt('0' ,10) ;
	var tab3 = document.getElementById('scheduleIt');
	var allInputTags = tab3.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
		if(allInputTags[i].name.match("dateDep$")){
			if(checkFirstDateBefore('01/04/2017' , allInputTags[i].value) && checkFirstDateBefore(allInputTags[i].value , '31/03/2018')){
					advanceTax = eval( parseInt(isNVL(advanceTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
				}else if( checkFirstDateBefore('01/04/2018' , allInputTags[i].value)){
					selfAssessmentTax = eval(parseInt(isNVL(selfAssessmentTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10)) ;
				}
		}
	}
	document.getElementsByName('partBTTI.taxPaid.taxesPaid.advanceTax')[0].value = advanceTax;
	document.getElementsByName('partBTTI.taxPaid.taxesPaid.selfAssessmentTax')[0].value = selfAssessmentTax;
	return advanceTax;
}

function calculateAdvancedTax234A(date){
	var advanceTax = parseInt('0' ,10) ;
	var selfAssessmentTax = parseInt('0' ,10) ;
	var tab3 = document.getElementById('scheduleIt');
	var allInputTags = tab3.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
		if(allInputTags[i].name.match("dateDep$")){
			if(checkFirstDateBefore('01/04/2018' , allInputTags[i].value) && checkFirstDateBefore(allInputTags[i].value , date)){
					advanceTax = eval( parseInt(isNVL(advanceTax) ,10) + parseInt(isNVL(allInputTags[i+2].value) ,10));
				}
		}
	}
	return advanceTax;
}
function calculate80P(){
	var tot80P=parseInt('0' ,10);
	var tab1 = document.getElementById('Schedule80P');
	var allInputTags = tab1.getElementsByTagName('input');
		for(var i = 0; i < allInputTags.length; i++) {
					if (!allInputTags[i].name.match("total$")) {
						tot80P = eval(parseInt(tot80P ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}
				}
		if(tot80P>=0){
			document.getElementsByName('schedule80P.usrDeductUndSec80P.total')[0].value = tot80P;
		}
}

function enableSch80p(){
	var tab1 = document.getElementById('Schedule80P');
	var allInputTags = tab1.getElementsByTagName('input');
	var substatusOrCompanyType=document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
	if(substatusOrCompanyType=='15'|| substatusOrCompanyType=='16'|| substatusOrCompanyType=='4'){

		for(var i = 0; i < allInputTags.length; i++) {
			if (!allInputTags[i].name.match("total$")) {
				allInputTags[i].readOnly=false;
			}
		}
	}
	else{
		for(var i = 0; i < allInputTags.length; i++) {
			if (!allInputTags[i].name.match("total$")) {
				allInputTags[i].readOnly=true;
				allInputTags[i].value='';
			}
		}

	}



}
function calculateTDS2AmntFwd(el){
	var mainTab = document.getElementById('scheduleTDS2');
	var mainTabRows = mainTab.rows.length;

	var sum = 0;

	while ((el = el.parentNode) && el.nodeName.toLowerCase() !== 'tr')
		;
	if (el) {
		var index = el.rowIndex - 4;
	}
	for (var i = 0; i < mainTabRows - 6; i++) {
		if (i == index) {

			totTDSOnAmtPaid = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].totTDSOnAmtPaid')[0].value;

			taxDeductedOwnHands = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value;

			taxDeductedTDS = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxDeductedTDS')[0].value;

			taxCreditedOwnHands = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0].value;

			taxCreditedTDS = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxCreditedTDS')[0].value;

			sum = zeroOrMore(eval(parseInt(sum, 10)
					+ parseInt(coalesce(totTDSOnAmtPaid), 10)
					+ parseInt(coalesce(taxDeductedOwnHands), 10)
					+ parseInt(coalesce(taxDeductedTDS), 10)
					- parseInt(coalesce(taxCreditedOwnHands), 10)
					- parseInt(coalesce(taxCreditedTDS), 10)));

			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].amntCarryForward')[0].value = sum;

		}
	}

}
function calculateTDS3AmntFwd(el){
var mainTab = document.getElementById('scheduleTDS3');
var mainTabRows = mainTab.rows.length;

var sum = 0;

while ((el = el.parentNode) && el.nodeName.toLowerCase() !== 'tr')
	;
if (el) {
	var index = el.rowIndex - 4;
}
for (var i = 0; i < mainTabRows - 6; i++) {
	if (i == index) {

		totTDSOnAmtPaid = document
				.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
						+ '].totTDSOnAmtPaid')[0].value;

		taxDeductedOwnHands = document
				.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
						+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value;

		taxDeductedTDS = document
				.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
						+ '].taxDeductCreditDtls.taxDeductedTDS')[0].value;

		taxCreditedOwnHands = document
				.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
						+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0].value;

		taxCreditedTDS = document
				.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
						+ '].taxDeductCreditDtls.taxCreditedTDS')[0].value;

		sum = zeroOrMore(eval(parseInt(sum, 10)
				+ parseInt(coalesce(totTDSOnAmtPaid), 10)
				+ parseInt(coalesce(taxDeductedOwnHands), 10)
				+ parseInt(coalesce(taxDeductedTDS), 10)
				- parseInt(coalesce(taxCreditedOwnHands), 10)
				- parseInt(coalesce(taxCreditedTDS), 10)));

		document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
				+ '].amntCarryForward')[0].value = sum;

	}
}
}
/*function populateMobileCodeonLoad()
{

	state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
	country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];

	if (state.value != '99' && state.value != '-1') {
		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobile')[0].value = '91';
		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobile')[0].disabled = true;
	} else if (state.value == '99') {
		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobile')[0].disabled = false;
		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobileNoSec')[0].disabled = false;
	}


}*/
function populateMobileCode()

{

	state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
	country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];

	if (state.value != '99' && state.value != '-1') {

		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobile')[0].value = '91';
	//	document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobile')[0].disabled = true;
	} else if (state.value == '99') {
		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobile')[0].value = '';
	//	document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobile')[0].disabled = false;
		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobileNoSec')[0].value = '';
		document.getElementsByName('partAGEN1.personalInfo.address.countryCodeMobileNoSec')[0].disabled = false;
	}




}
/*function validateTCS(){
	var mainTab = document.getElementById('scheduleTCS');
	var mainTabRows = mainTab.rows.length;

	for (var i = 0; i < mainTabRows - 6; i++) {
			var taxDeductedOwnHands = document.getElementsByName('scheduleTCS.tcs[' + i + '].amountBF')[0].value;
			var totTDSOnAmtPaid = document.getElementsByName('scheduleTCS.tcs[' + i + '].totalTCS')[0].value ;
		if (taxDeductedOwnHands !='' && totTDSOnAmtPaid !=''){


			addErrorXHTML(
					'',
					'Unclaimed TCS brought forward and details of TCS of current FY should be provided in different rows');
			j.setFieldError('scheduleTCS.tcs[' + i + '].amountBF','Unclaimed TCS brought forward and details of TCS of current FY should be provided in different rows');


			}
	}

}*/
function validateTDS2(){

	var mainTab = document.getElementById('scheduleTDS2');
	var mainTabRows = mainTab.rows.length;

	for (var i = 0; i < mainTabRows - 6; i++) {
			var taxDeductedOwnHands = document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i + '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value;
			var totTDSOnAmtPaid = document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i + '].totTDSOnAmtPaid')[0].value ;
			var totTDSOn32 = document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i + '].taxDeductCreditDtls.taxDeductedTDS')[0].value ;
		if (taxDeductedOwnHands !='' && totTDSOnAmtPaid !=''){


			addErrorXHTML(
					'',
					'Unclaimed TDS brought forward and details of TDS of current FY should be provided in different rows in Sch TDS 1.');
			j.setFieldError('scheduleTDS2.tdSonOthThanSal[' + i+ '].totTDSOnAmtPaid','Unclaimed TDS brought forward and details of TDS of current FY should be provided in different rows in Sch TDS 1.');


			}
		if (totTDSOnAmtPaid !='' && totTDSOn32 !=''){
			addErrorXHTML(
					'',
					'Unclaimed TDS brought forward and Income details of TDS Deducted in the hands of any other person as per rule 37BA(2) should be provided in different rows in Sch TDS 1');
			j.setFieldError('scheduleTDS2.tdSonOthThanSal[' + i + '].taxDeductCreditDtls.taxDeductedTDS','Unclaimed TDS brought forward and Income details of TDS Deducted in the hands of any other person as per rule 37BA(2) should be provided in different rows in Sch TDS 1');


			}
	}
}



function validateTDS3(){

	var mainTab = document.getElementById('scheduleTDS3');
	var mainTabRows = mainTab.rows.length;


	for (var i = 0; i < mainTabRows - 6; i++) {

			var taxDeductedOwnHands = document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i + '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value;
			var totTDSOnAmtPaid = document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i + '].totTDSOnAmtPaid')[0].value ;
			var totTDSon32 = document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i + '].taxDeductCreditDtls.taxDeductedTDS')[0].value ;
		if (taxDeductedOwnHands !='' && totTDSOnAmtPaid !=''){

			addErrorXHTML(
					'',
					'Unclaimed TDS brought forward and details of TDS of current FY should be provided in different rows in Sch TDS 2.');
			j.setFieldError('scheduleTDS3.tDS3onOthThanSal[' + i+ '].totTDSOnAmtPaid','Unclaimed TDS brought forward and details of TDS of current FY should be provided in different rows in Sch TDS 2.');



			}
		if (totTDSOnAmtPaid !='' && totTDSon32 !=''){

			addErrorXHTML(
					'',
					'Unclaimed TDS brought forward and Income details of TDS Deducted in the hands of any other person as per rule 37BA(2) should be provided in different rows in Sch TDS 2');
			j.setFieldError('scheduleTDS3.tDS3onOthThanSal[' + i + '].taxDeductCreditDtls.taxDeductedTDS','Unclaimed TDS brought forward and Income details of TDS Deducted in the hands of any other person as per rule 37BA(2) should be provided in different rows in Sch TDS 2');



			}
	}
}

function calculateTDS(){

    var TDS = parseInt('0',10);
var TDS2 = parseInt('0' ,10);
var tab1 = document.getElementById('scheduleTDS2');
var allInputTags = tab1.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("taxCreditedOwnHands$")) {
					/*if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  eval(parseInt(coalesce(allInputTags[i-1].value),10) + parseInt(coalesce(allInputTags[i-2].value),10))){
						addError(allInputTags[i],'Amount claimed for this year cannot be more than total tax deducted',true);
						j.setFieldError(allInputTags[i].name,'Amount claimed for this year cannot be more than total tax deducted');
						TDS2 = eval(parseInt(TDS2 ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}else{*/
						TDS2 = eval(parseInt(TDS2 ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					/*}
					allInputTags[i+1].value = zeroOrMore(parseInt(coalesce(allInputTags[i-2].value)) + parseInt(coalesce(allInputTags[i-1].value))
					- parseInt(coalesce(allInputTags[i].value)));*/
				}
			}

var TDS3 = parseInt('0' ,10);
var tab1 = document.getElementById('scheduleTDS3');
var allInputTags = tab1.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("taxCreditedOwnHands$")) {
					/*if(eval(parseInt(coalesce(allInputTags[i].value),10)) >  eval(parseInt(coalesce(allInputTags[i-1].value),10) + parseInt(coalesce(allInputTags[i-2].value),10))){
						addError(allInputTags[i],'Amount claimed for this year cannot be more than total tax deducted',true);
						j.setFieldError(allInputTags[i].name,'Amount claimed for this year cannot be more than total tax deducted');
						TDS2 = eval(parseInt(TDS2 ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					}else{*/
						TDS3 = eval(parseInt(TDS3 ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
					/*}
					allInputTags[i+1].value = zeroOrMore(parseInt(coalesce(allInputTags[i-2].value)) + parseInt(coalesce(allInputTags[i-1].value))
					- parseInt(coalesce(allInputTags[i].value)));*/
				}
			}



    TDS=eval(parseInt(TDS2,10)+parseInt(TDS3,10));
    document.getElementsByName('partBTTI.taxPaid.taxesPaid.tds')[0].value = TDS;
/*
    document.getElementsByName('scheduleTDS2.tdSonOthThanSal.totalTDSonSalaries')[0].value = parseInt(TDS2,10);
	document.getElementsByName('scheduleTDS3.tdSonOthThanSal.totalTDSonOthThanSals')[0].value = parseInt(TDS3,10);*/
return TDS;
}

function calcTotalTDS2()
{

	var tdsTable = document.getElementById('scheduleTDS2');
	var noOfRows = tdsTable.rows.length;

	var sum = 0;

	for (var i = 0; i < (noOfRows - 6); i++) {

		var taxCreditedOwnHands =  document
		.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i + '].taxDeductCreditDtls.taxCreditedOwnHands')[0].value;

		sum = eval(parseInt(sum, 10) + parseInt(coalesce(taxCreditedOwnHands), 10));

	}

	document.getElementsByName('scheduleTDS2.tdSonOthThanSal.totalTDSonOthThanSals')[0].value = sum;

}


function calcTotalTDS3()
{

	var tdsTable = document.getElementById('scheduleTDS3');
	var noOfRows = tdsTable.rows.length;

	var sum = 0;

	for (var i = 0; i < (noOfRows - 6); i++) {

		var taxCreditedOwnHands =  document
		.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i	+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0].value;

		sum = eval(parseInt(sum, 10) + parseInt(coalesce(taxCreditedOwnHands), 10));

	}

	document.getElementsByName('scheduleTDS3.tDS3onOthThanSal.totalTDS3OnOthThanSal')[0].value = sum;

}
function validateTDS29Grtthen67() {

	var mainTab = document.getElementById('scheduleTDS2');

	var mainTabRows = mainTab.rows.length;

	for (var i = 0; i < mainTabRows - 6; i++) {

		tDSCreditName = document.getElementsByName('scheduleTDS2.tdSonOthThanSal['
				+ i + '].tDSCreditName')[0].value;

		if (tDSCreditName == 'S') {

			var amt6 = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].totTDSOnAmtPaid')[0].value;

			var amt7 = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value;

			var amt9 = document
					.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0];

			var tempVal = eval(parseInt(coalesce(amt6),10) + parseInt(coalesce(amt7),10));

			if (amt9.value > tempVal) {
				j
						.setFieldError('scheduleTDS2.tdSonOthThanSal[' + i
								+ '].taxDeductCreditDtls.taxCreditedOwnHands',
								'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)');
				addErrorXHTML(
						document
								.getElementsByName('scheduleTDS2.tdSonOthThanSal['
										+ i
										+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0],
						'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)',
						true);
			}
		}
		else
			{
			var amt6 = document
			.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].totTDSOnAmtPaid')[0].value;

	var amt8 = document
			.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].value;

	var amt9 = document
			.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0];

	var tempVal =  eval(parseInt(coalesce(amt6),10) + parseInt(coalesce(amt8),10));

	if (amt9.value > tempVal) {
		j
				.setFieldError('scheduleTDS2.tdSonOthThanSal[' + i
						+ '].taxDeductCreditDtls.taxCreditedOwnHands',
						'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)');
		addErrorXHTML(
				document
						.getElementsByName('scheduleTDS2.tdSonOthThanSal['
								+ i
								+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0],
				'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)',
				true);
	}


			}
	}
}


function validateTDS39Grtthen67() {

	var mainTab = document.getElementById('scheduleTDS3');

	var mainTabRows = mainTab.rows.length;

	for (var i = 0; i < mainTabRows - 6; i++) {

		tDSCreditName = document.getElementsByName('scheduleTDS3.tDS3onOthThanSal['
				+ i + '].tDSCreditName')[0].value;

		if (tDSCreditName == 'S') {

			var amt6 = document
					.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
							+ '].totTDSOnAmtPaid')[0].value;

			var amt7 = document
					.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value;

			var amt9 = document
					.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
							+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0];

			var tempVal = eval(parseInt(coalesce(amt6),10) + parseInt(coalesce(amt7),10));

			if (amt9.value > tempVal) {
				j
						.setFieldError('scheduleTDS3.tDS3onOthThanSal[' + i
								+ '].taxDeductCreditDtls.taxCreditedOwnHands',
								'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)');
				addErrorXHTML(
						document
								.getElementsByName('scheduleTDS3.tDS3onOthThanSal['
										+ i
										+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0],
						'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)',
						true);
			}
		}
		else
			{

			var amt6 = document
			.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].totTDSOnAmtPaid')[0].value;

	var amt8 = document
			.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].value;

	var amt9 = document
			.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0];

	var tempVal = eval(parseInt(coalesce(amt6),10) + parseInt(coalesce(amt8),10));

	if (amt9.value > tempVal) {
		j
				.setFieldError('scheduleTDS3.tDS3onOthThanSal[' + i
						+ '].taxDeductCreditDtls.taxCreditedOwnHands',
						'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)');
		addErrorXHTML(
				document
						.getElementsByName('scheduleTDS3.tDS3onOthThanSal['
								+ i
								+ '].taxDeductCreditDtls.taxCreditedOwnHands')[0],
				'Amount entered in Column (9) cannot be more than amount entered in Column (6) or TDS field of Column (8)',
				true);
	}



			}
	}
}


function disableTDS2Fields() {
	var tdsTable = document.getElementById('scheduleTDS2');
	var noOfRows = tdsTable.rows.length;

	for (var i = 0; i < (noOfRows - 6); i++) {

		tDSCreditName = document.getElementsByName('scheduleTDS2.tdSonOthThanSal['
				+ i + '].tDSCreditName')[0].value;

		if (tDSCreditName == 'O') {

			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].disabled = true;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value = "";
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].disabled = true;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].disabled = true;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].disabled = true;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].value = "";
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].value = "";
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].value = "";
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].disabled = false;
		}
		else if (tDSCreditName == 'S') {

			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].disabled = true;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].disabled = true;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].disabled = true;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].value = "";
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].value = "";
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].value = "";
		}
		else
			{
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS2.tdSonOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].disabled = false;


			}

	}

}

function disableTDS3Fields() {
	var tdsTable = document.getElementById('scheduleTDS3');
	var noOfRows = tdsTable.rows.length;

	for (var i = 0; i < (noOfRows - 6); i++) {

		tDSCreditName = document.getElementsByName('scheduleTDS3.tDS3onOthThanSal['
				+ i + '].tDSCreditName')[0].value;

		if (tDSCreditName == 'O') {

			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].disabled = true;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].value = "";
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].disabled = true;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].disabled = true;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].disabled = true;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].value = "";
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].value = "";
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].value = "";
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].disabled = false;
		}

		else if (tDSCreditName == 'S') {

			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].disabled = true;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].disabled = true;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].disabled = true;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].value = "";
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].value = "";
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].value = "";
		}

		else
		{
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedOwnHands')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedIncome')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxCreditedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedTDS')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedSpousePAN')[0].disabled = false;
			document.getElementsByName('scheduleTDS3.tDS3onOthThanSal[' + i
					+ '].taxDeductCreditDtls.taxDeductedIncome')[0].disabled = false;
		}

	}

}



function zeroOrLess(val){
	if(parseInt(val, 10) > 0 ){
		return 0;
	}
	return parseInt(val, 10);
}

function calculateSchDPM() {
	dpmCeasesMesg='';
	var rate15Adjustment = coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.realizationTotalPeriod");
	var rate30Adjustment = coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.realizationTotalPeriod");
	var rate40Adjustment = coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.wDVFirstDayOfPrevYr") + coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.realizationTotalPeriod");
	/*var rate50Adjustment = coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.realizationTotalPeriod");
	var rate60Adjustment = coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.realizationTotalPeriod");
	var rate80Adjustment = coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.realizationTotalPeriod");
	var rate100Adjustment = coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.realizationTotalPeriod");*/

    // For Field 6

	document.getElementsByName("scheduleDPM.plantMachinery.rate15.depreciationDetail.fullRateDeprAmt")[0].value = zeroOrMore(rate15Adjustment);
	document.getElementsByName("scheduleDPM.plantMachinery.rate30.depreciationDetail.fullRateDeprAmt")[0].value = zeroOrMore(rate30Adjustment);
	document.getElementsByName("scheduleDPM.plantMachinery.rate40.depreciationDetail.fullRateDeprAmt")[0].value = zeroOrMore(rate40Adjustment);
	/*document.getElementsByName("scheduleDPM.plantMachinery.rate50.depreciationDetail.fullRateDeprAmt")[0].value = zeroOrMore(rate50Adjustment);
	document.getElementsByName("scheduleDPM.plantMachinery.rate60.depreciationDetail.fullRateDeprAmt")[0].value = zeroOrMore(rate60Adjustment);
	document.getElementsByName("scheduleDPM.plantMachinery.rate80.depreciationDetail.fullRateDeprAmt")[0].value = zeroOrMore(rate80Adjustment);
	document.getElementsByName("scheduleDPM.plantMachinery.rate100.depreciationDetail.fullRateDeprAmt")[0].value = zeroOrMore(rate100Adjustment);*/

	rate15Adjustment = zeroOrLess(rate15Adjustment );
	rate30Adjustment = zeroOrLess(rate30Adjustment );
	rate40Adjustment = zeroOrLess(rate40Adjustment );
	/*rate50Adjustment = zeroOrLess(rate50Adjustment );
	rate60Adjustment = zeroOrLess(rate60Adjustment );
	rate80Adjustment = zeroOrLess(rate80Adjustment );
	rate100Adjustment =zeroOrLess(rate100Adjustment);*/

    // For Field 9

	rate15Adjustment  =	coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.realizationPeriodDuringYear") + parseInt(rate15Adjustment, 10);
	rate30Adjustment  = coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.realizationPeriodDuringYear") + parseInt(rate30Adjustment, 10);
	rate40Adjustment  = coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.realizationPeriodDuringYear") + parseInt(rate40Adjustment, 10);
	/*rate50Adjustment  = coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.realizationPeriodDuringYear") + parseInt(rate50Adjustment, 10);
	rate60Adjustment  = coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.realizationPeriodDuringYear") + parseInt(rate60Adjustment, 10);
	rate80Adjustment  = coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.realizationPeriodDuringYear") + parseInt(rate80Adjustment, 10);
	rate100Adjustment =	coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.realizationPeriodDuringYear") + parseInt(rate100Adjustment, 10);*/


	document.getElementsByName("scheduleDPM.plantMachinery.rate15.depreciationDetail.halfRateDeprAmt")[0].value = zeroOrMore( rate15Adjustment );
	document.getElementsByName("scheduleDPM.plantMachinery.rate30.depreciationDetail.halfRateDeprAmt")[0].value = zeroOrMore( rate30Adjustment );
	document.getElementsByName("scheduleDPM.plantMachinery.rate40.depreciationDetail.halfRateDeprAmt")[0].value = zeroOrMore( rate40Adjustment );
	/*document.getElementsByName("scheduleDPM.plantMachinery.rate50.depreciationDetail.halfRateDeprAmt")[0].value = zeroOrMore( rate50Adjustment );
	document.getElementsByName("scheduleDPM.plantMachinery.rate60.depreciationDetail.halfRateDeprAmt")[0].value = zeroOrMore( rate60Adjustment );
	document.getElementsByName("scheduleDPM.plantMachinery.rate80.depreciationDetail.halfRateDeprAmt")[0].value = zeroOrMore( rate80Adjustment );
	document.getElementsByName("scheduleDPM.plantMachinery.rate100.depreciationDetail.halfRateDeprAmt")[0].value = zeroOrMore(rate100Adjustment);*/

	rate15Adjustment = zeroOrLess(rate15Adjustment );
	rate30Adjustment = zeroOrLess(rate30Adjustment );
	rate40Adjustment = zeroOrLess(rate40Adjustment );
	/*rate50Adjustment = zeroOrLess(rate50Adjustment );
	rate60Adjustment = zeroOrLess(rate60Adjustment );
	rate80Adjustment = zeroOrLess(rate80Adjustment );
	rate100Adjustment =zeroOrLess(rate100Adjustment);*/

    // For Field 10
	document.getElementsByName("scheduleDPM.plantMachinery.rate15.depreciationDetail.depreciationAtFullRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.fullRateDeprAmt") * 0.15);
	document.getElementsByName("scheduleDPM.plantMachinery.rate30.depreciationDetail.depreciationAtFullRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.fullRateDeprAmt") * 0.30);
	document.getElementsByName("scheduleDPM.plantMachinery.rate40.depreciationDetail.depreciationAtFullRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.fullRateDeprAmt") * 0.40);
	/*document.getElementsByName("scheduleDPM.plantMachinery.rate50.depreciationDetail.depreciationAtFullRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.fullRateDeprAmt") * 0.50);
	document.getElementsByName("scheduleDPM.plantMachinery.rate60.depreciationDetail.depreciationAtFullRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.fullRateDeprAmt") * 0.60);
	document.getElementsByName("scheduleDPM.plantMachinery.rate80.depreciationDetail.depreciationAtFullRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.fullRateDeprAmt") * 0.80);
	document.getElementsByName("scheduleDPM.plantMachinery.rate100.depreciationDetail.depreciationAtFullRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.fullRateDeprAmt"));*/

     // For Field 11
	document.getElementsByName("scheduleDPM.plantMachinery.rate15.depreciationDetail.depreciationAtHalfRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.halfRateDeprAmt") * 0.075);
	document.getElementsByName("scheduleDPM.plantMachinery.rate30.depreciationDetail.depreciationAtHalfRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.halfRateDeprAmt") * 0.15);
	document.getElementsByName("scheduleDPM.plantMachinery.rate40.depreciationDetail.depreciationAtHalfRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.halfRateDeprAmt") * 0.20);
	/*document.getElementsByName("scheduleDPM.plantMachinery.rate50.depreciationDetail.depreciationAtHalfRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.halfRateDeprAmt") * 0.25);
	document.getElementsByName("scheduleDPM.plantMachinery.rate60.depreciationDetail.depreciationAtHalfRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.halfRateDeprAmt") * 0.30);
	document.getElementsByName("scheduleDPM.plantMachinery.rate80.depreciationDetail.depreciationAtHalfRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.halfRateDeprAmt") * 0.40);
	document.getElementsByName("scheduleDPM.plantMachinery.rate100.depreciationDetail.depreciationAtHalfRate")[0].value = Math.round(coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.halfRateDeprAmt") * 0.50);*/

     // For Field 15
	document.getElementsByName("scheduleDPM.plantMachinery.rate15.depreciationDetail.totalDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.depreciationAtHalfRate")+ coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.addlnDeprOnGT180DayAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.addlnDeprDuringYearAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.addlnDeprOnLessThan180DayAdditions"));
	document.getElementsByName("scheduleDPM.plantMachinery.rate30.depreciationDetail.totalDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.depreciationAtHalfRate")+ coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.addlnDeprOnGT180DayAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.addlnDeprDuringYearAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.addlnDeprOnLessThan180DayAdditions"));
	document.getElementsByName("scheduleDPM.plantMachinery.rate40.depreciationDetail.totalDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.depreciationAtHalfRate")+ coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.addlnDeprOnGT180DayAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.addlnDeprDuringYearAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.addlnDeprOnLessThan180DayAdditions"));
	/*document.getElementsByName("scheduleDPM.plantMachinery.rate50.depreciationDetail.totalDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.depreciationAtHalfRate")+ coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.addlnDeprOnGT180DayAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.addlnDeprDuringYearAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate50.depreciationDetail.addlnDeprOnLessThan180DayAdditions"));
	document.getElementsByName("scheduleDPM.plantMachinery.rate60.depreciationDetail.totalDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.depreciationAtHalfRate")+ coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.addlnDeprOnGT180DayAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.addlnDeprDuringYearAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate60.depreciationDetail.addlnDeprOnLessThan180DayAdditions"));
	document.getElementsByName("scheduleDPM.plantMachinery.rate80.depreciationDetail.totalDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.depreciationAtHalfRate")+ coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.addlnDeprOnGT180DayAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.addlnDeprDuringYearAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate80.depreciationDetail.addlnDeprOnLessThan180DayAdditions"));
	document.getElementsByName("scheduleDPM.plantMachinery.rate100.depreciationDetail.totalDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.depreciationAtHalfRate")+ coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.addlnDeprOnGT180DayAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.addlnDeprDuringYearAdditions") + coalesceSetRet("scheduleDPM.plantMachinery.rate100.depreciationDetail.addlnDeprOnLessThan180DayAdditions"));*/

	document.getElementsByName("scheduleDPM.plantMachinery.rate15.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(eval
	(coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.totalDepreciation") -
	coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.depDisAllowUs38_2")));

	document.getElementsByName("scheduleDPM.plantMachinery.rate30.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(eval
	(coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.totalDepreciation") -
	coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.depDisAllowUs38_2")));

	document.getElementsByName("scheduleDPM.plantMachinery.rate40.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(eval
	(coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.totalDepreciation") -
	coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.depDisAllowUs38_2")));

     // For Field 17
	document.getElementsByName("scheduleDPM.plantMachinery.rate15.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDPM.plantMachinery.rate15.depreciationDetail.totalDepreciation") +  	parseInt(rate15Adjustment , 10));
	document.getElementsByName("scheduleDPM.plantMachinery.rate30.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDPM.plantMachinery.rate30.depreciationDetail.totalDepreciation") +  	parseInt(rate30Adjustment , 10));
	document.getElementsByName("scheduleDPM.plantMachinery.rate40.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDPM.plantMachinery.rate40.depreciationDetail.totalDepreciation") +  	parseInt(rate40Adjustment , 10));
     calculatePointNo16DPM('rate15');
     calculatePointNo16DPM('rate30');
     calculatePointNo16DPM('rate40');

}


function calculatePointNo16DPM(percentRate) {
	 if( $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value!=0 &&  $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value!="") {

   	 var CapGainUs50 = calcPoint16DPMvalue(percentRate);


		 if(CapGainUs50>0 && $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value>parseInt("0", 10) && $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value<CapGainUs50) {
			if(document.getElementsByName('scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed==true){

			 document.getElementsByName('scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed=false;
			 }
			 main.generateMsgDialogWithOk('The calculated value of Capital Gain/Loss u/s 50 in S.No 20 is '+CapGainUs50+' and is different from what has been entered by you (value entered by user). Please enter correct value of sale consideration in S.No 5 or 8 of this schedule. Else the entered value will be replaced with the calculated value.',"");
			overrideDpmCapGainUs50(percentRate,CapGainUs50);
			calcSchDCGFor6();
		 }

		 if(CapGainUs50<0 && $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value<parseInt("0", 10) && $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value>CapGainUs50) {
			 if(document.getElementsByName('scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed==true){

			 document.getElementsByName('scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed=false;
			 }
			 main.generateMsgDialogWithOk('The calculated value of Capital Gain/Loss u/s 50 in S.No 20 is '+CapGainUs50+' and is different from what has been entered by you. Please enter correct value of sale consideration in S.No 5 or 8 of this schedule. Else the entered value will be replaced with the calculated value.',"");
			 overrideDpmCapGainUs50(percentRate,CapGainUs50);
			 calcSchDCGFor6();

		 }

		 if(CapGainUs50<0 && $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value<0) {
			dpmCeasesMesg=dpmCeasesMesg+'Block Depreciation - Plant and Machinery @ '+percentRate.substring(4)+'% ceases to exist.<br/>';

		 }

		 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.depreciationAtFullRate"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.depreciationAtHalfRate"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.addlnDeprOnGT180DayAdditions"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.addlnDeprDuringYearAdditions"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.totalDepreciation"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.netAggregateDepreciation"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.depDisAllowUs38_2"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.proportionateAggDepreciation"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.wdvLastDay"]')[0].value=0;
    	 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.addlnDeprOnLessThan180DayAdditions"]')[0].value=0;

    }

}

function calcPoint16DPMvalue(percentRate) {
	if(percentRate=='rate40'){
		return coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.realizationTotalPeriod") + coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.realizationPeriodDuringYear") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.wdvFirstDay") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.expdrOnTrforSaleAsset")-getAmt('scheduleDPM.plantMachinery.rate40.depreciationDetail.wDVFirstDayOfPrevYr');
	}
	return coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.realizationTotalPeriod") + coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.realizationPeriodDuringYear") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.wdvFirstDay") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDPM.plantMachinery."+percentRate+".depreciationDetail.expdrOnTrforSaleAsset");
}

function overrideDpmCapGainUs50(percentRate,CapGainUs50) {
 $('[name="scheduleDPM.plantMachinery.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value = parseInt(CapGainUs50,10);

}

function calculateSchDOA() {
	doaCeasesMesg = '';
	var buildingRate5FullRateDeprAmt = coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.realizationTotalPeriod");
	var buildingRate10FullRateDeprAmt = coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.realizationTotalPeriod");
	var buildingRate40FullRateDeprAmt = coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.realizationTotalPeriod");
	var furnitureFittingsRate10FullRateDeprAmt = coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.realizationTotalPeriod");
	var intangibleAssetsRate25FullRateDeprAmt = coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.realizationTotalPeriod");
	var shipsRate20FullRateDeprAmt = coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.wdvFirstDay") + coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.realizationTotalPeriod");


    // For Field 6
    $('[name="scheduleDOA.building.rate5.depreciationDetail.fullRateDeprAmt"]')[0].value = zeroOrMore(buildingRate5FullRateDeprAmt);
    $('[name="scheduleDOA.building.rate10.depreciationDetail.fullRateDeprAmt"]')[0].value = zeroOrMore(buildingRate10FullRateDeprAmt);
    $('[name="scheduleDOA.building.rate40.depreciationDetail.fullRateDeprAmt"]')[0].value = zeroOrMore(buildingRate40FullRateDeprAmt);
    $('[name="scheduleDOA.furnitureFittings.rate10.depreciationDetail.fullRateDeprAmt"]')[0].value = zeroOrMore(furnitureFittingsRate10FullRateDeprAmt);
    $('[name="scheduleDOA.intangibleAssets.rate25.depreciationDetail.fullRateDeprAmt"]')[0].value = zeroOrMore(intangibleAssetsRate25FullRateDeprAmt);
    $('[name="scheduleDOA.ships.rate20.depreciationDetail.fullRateDeprAmt"]')[0].value = zeroOrMore(shipsRate20FullRateDeprAmt);

	buildingRate5FullRateDeprAmt = zeroOrLess(buildingRate5FullRateDeprAmt);
	buildingRate10FullRateDeprAmt = zeroOrLess(buildingRate10FullRateDeprAmt);
	buildingRate40FullRateDeprAmt = zeroOrLess(buildingRate40FullRateDeprAmt);
	furnitureFittingsRate10FullRateDeprAmt = zeroOrLess(furnitureFittingsRate10FullRateDeprAmt);
	intangibleAssetsRate25FullRateDeprAmt = zeroOrLess(intangibleAssetsRate25FullRateDeprAmt);
	shipsRate20FullRateDeprAmt = zeroOrLess(shipsRate20FullRateDeprAmt);


	buildingRate5FullRateDeprAmt = 				(coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.realizationPeriodDuringYear") + buildingRate5FullRateDeprAmt);
	buildingRate10FullRateDeprAmt =             (coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.realizationPeriodDuringYear") + buildingRate10FullRateDeprAmt);
	buildingRate40FullRateDeprAmt =            (coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.realizationPeriodDuringYear") + buildingRate40FullRateDeprAmt);
	furnitureFittingsRate10FullRateDeprAmt =    (coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.realizationPeriodDuringYear") + furnitureFittingsRate10FullRateDeprAmt);
	intangibleAssetsRate25FullRateDeprAmt =     (coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.realizationPeriodDuringYear") + intangibleAssetsRate25FullRateDeprAmt);
	shipsRate20FullRateDeprAmt =                (coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.realizationPeriodDuringYear") + shipsRate20FullRateDeprAmt);


    // For Field 9

    $('[name="scheduleDOA.building.rate5.depreciationDetail.halfRateDeprAmt"]')[0].value = zeroOrMore(buildingRate5FullRateDeprAmt);
    $('[name="scheduleDOA.building.rate10.depreciationDetail.halfRateDeprAmt"]')[0].value = zeroOrMore(buildingRate10FullRateDeprAmt);
    $('[name="scheduleDOA.building.rate40.depreciationDetail.halfRateDeprAmt"]')[0].value = zeroOrMore(buildingRate40FullRateDeprAmt);
    $('[name="scheduleDOA.furnitureFittings.rate10.depreciationDetail.halfRateDeprAmt"]')[0].value = zeroOrMore(furnitureFittingsRate10FullRateDeprAmt);
    $('[name="scheduleDOA.intangibleAssets.rate25.depreciationDetail.halfRateDeprAmt"]')[0].value = zeroOrMore(intangibleAssetsRate25FullRateDeprAmt);
    $('[name="scheduleDOA.ships.rate20.depreciationDetail.halfRateDeprAmt"]')[0].value = zeroOrMore(shipsRate20FullRateDeprAmt);

	buildingRate5FullRateDeprAmt = zeroOrLess(buildingRate5FullRateDeprAmt);
	buildingRate10FullRateDeprAmt = zeroOrLess(buildingRate10FullRateDeprAmt);
	buildingRate40FullRateDeprAmt = zeroOrLess(buildingRate40FullRateDeprAmt);
	furnitureFittingsRate10FullRateDeprAmt = zeroOrLess(furnitureFittingsRate10FullRateDeprAmt);
	intangibleAssetsRate25FullRateDeprAmt = zeroOrLess(intangibleAssetsRate25FullRateDeprAmt);
	shipsRate20FullRateDeprAmt = zeroOrLess(shipsRate20FullRateDeprAmt);

    // For Field 10
     $('[name="scheduleDOA.building.rate5.depreciationDetail.depreciationAtFullRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.fullRateDeprAmt") * 0.05);
     $('[name="scheduleDOA.building.rate10.depreciationDetail.depreciationAtFullRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.fullRateDeprAmt") * 0.10);
     $('[name="scheduleDOA.building.rate40.depreciationDetail.depreciationAtFullRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.fullRateDeprAmt") * 0.4);
     $('[name="scheduleDOA.furnitureFittings.rate10.depreciationDetail.depreciationAtFullRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.fullRateDeprAmt") * 0.10);
     $('[name="scheduleDOA.intangibleAssets.rate25.depreciationDetail.depreciationAtFullRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.fullRateDeprAmt") * 0.25);
     $('[name="scheduleDOA.ships.rate20.depreciationDetail.depreciationAtFullRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.fullRateDeprAmt") * 0.20);

     // For Field 11
     $('[name="scheduleDOA.building.rate5.depreciationDetail.depreciationAtHalfRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.halfRateDeprAmt") * 0.025);
     $('[name="scheduleDOA.building.rate10.depreciationDetail.depreciationAtHalfRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.halfRateDeprAmt") * 0.05);
     $('[name="scheduleDOA.building.rate40.depreciationDetail.depreciationAtHalfRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.halfRateDeprAmt") * 0.20);
     $('[name="scheduleDOA.furnitureFittings.rate10.depreciationDetail.depreciationAtHalfRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.halfRateDeprAmt") * 0.05);
     $('[name="scheduleDOA.intangibleAssets.rate25.depreciationDetail.depreciationAtHalfRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.halfRateDeprAmt") * 0.125);
     $('[name="scheduleDOA.ships.rate20.depreciationDetail.depreciationAtHalfRate"]')[0].value = Math.round(coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.halfRateDeprAmt") * 0.10);

     // For Field 14
     $('[name="scheduleDOA.building.rate5.depreciationDetail.totalDepreciation"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.depreciationAtHalfRate"));
     $('[name="scheduleDOA.building.rate10.depreciationDetail.totalDepreciation"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.depreciationAtHalfRate"));
     $('[name="scheduleDOA.building.rate40.depreciationDetail.totalDepreciation"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.depreciationAtHalfRate"));
     $('[name="scheduleDOA.furnitureFittings.rate10.depreciationDetail.totalDepreciation"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.depreciationAtHalfRate"));
     $('[name="scheduleDOA.intangibleAssets.rate25.depreciationDetail.totalDepreciation"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.depreciationAtHalfRate"));
     $('[name="scheduleDOA.ships.rate20.depreciationDetail.totalDepreciation"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.depreciationAtFullRate") + coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.depreciationAtHalfRate"));

     document.getElementsByName("scheduleDOA.building.rate5.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.totalDepreciation") - coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.depDisAllowUs38_2"));
     document.getElementsByName("scheduleDOA.building.rate10.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.totalDepreciation") - coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.depDisAllowUs38_2"));
 	 document.getElementsByName("scheduleDOA.building.rate40.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.totalDepreciation") - coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.depDisAllowUs38_2"));
 	 document.getElementsByName("scheduleDOA.furnitureFittings.rate10.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.totalDepreciation") - coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.depDisAllowUs38_2"));
 	 document.getElementsByName("scheduleDOA.intangibleAssets.rate25.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.totalDepreciation") - coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.depDisAllowUs38_2"));
 	 document.getElementsByName("scheduleDOA.ships.rate20.depreciationDetail.netAggregateDepreciation")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.totalDepreciation") - coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.depDisAllowUs38_2"));

     // For Field 17
     $('[name="scheduleDOA.building.rate5.depreciationDetail.wdvLastDay"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.totalDepreciation")	+ parseInt(buildingRate5FullRateDeprAmt,10));
     $('[name="scheduleDOA.building.rate10.depreciationDetail.wdvLastDay"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.totalDepreciation")	+ parseInt(buildingRate10FullRateDeprAmt,10));
     $('[name="scheduleDOA.building.rate40.depreciationDetail.wdvLastDay"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.totalDepreciation") + parseInt(buildingRate40FullRateDeprAmt,10));
     $('[name="scheduleDOA.furnitureFittings.rate10.depreciationDetail.wdvLastDay"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.totalDepreciation")	+ parseInt(furnitureFittingsRate10FullRateDeprAmt ,10));
     $('[name="scheduleDOA.intangibleAssets.rate25.depreciationDetail.wdvLastDay"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.totalDepreciation") + parseInt(intangibleAssetsRate25FullRateDeprAmt  ,10));
     $('[name="scheduleDOA.ships.rate20.depreciationDetail.wdvLastDay"]')[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.fullRateDeprAmt") + coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.halfRateDeprAmt") - coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.totalDepreciation") + parseInt(shipsRate20FullRateDeprAmt ,10));

     document
		.getElementsByName("scheduleDOA.building.rate5.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.fullRateDeprAmt")
		+ coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.halfRateDeprAmt")
		- coalesceSetRet("scheduleDOA.building.rate5.depreciationDetail.totalDepreciation") + parseInt(buildingRate5FullRateDeprAmt,10));

document
		.getElementsByName("scheduleDOA.building.rate10.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.fullRateDeprAmt")
		+ coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.halfRateDeprAmt")
		- coalesceSetRet("scheduleDOA.building.rate10.depreciationDetail.totalDepreciation")+ parseInt(buildingRate10FullRateDeprAmt,10));

document
		.getElementsByName("scheduleDOA.building.rate40.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.fullRateDeprAmt")
		+ coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.halfRateDeprAmt")
		- coalesceSetRet("scheduleDOA.building.rate40.depreciationDetail.totalDepreciation") + parseInt(buildingRate40FullRateDeprAmt,10));

document
		.getElementsByName("scheduleDOA.furnitureFittings.rate10.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.fullRateDeprAmt")
		+ coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.halfRateDeprAmt")
		- coalesceSetRet("scheduleDOA.furnitureFittings.rate10.depreciationDetail.totalDepreciation")+ parseInt(furnitureFittingsRate10FullRateDeprAmt ,10));

document
		.getElementsByName("scheduleDOA.intangibleAssets.rate25.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.fullRateDeprAmt")
		+ coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.halfRateDeprAmt")
		- coalesceSetRet("scheduleDOA.intangibleAssets.rate25.depreciationDetail.totalDepreciation") + parseInt(intangibleAssetsRate25FullRateDeprAmt  ,10));

document
		.getElementsByName("scheduleDOA.ships.rate20.depreciationDetail.wdvLastDay")[0].value = zeroOrMore(coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.fullRateDeprAmt")
		+ coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.halfRateDeprAmt")
		- coalesceSetRet("scheduleDOA.ships.rate20.depreciationDetail.totalDepreciation")+ parseInt(shipsRate20FullRateDeprAmt ,10));





// Nil value form 3 to 18
document.getElementsByName("scheduleDOA.building.rateNil.depreciationDetail.wdvLastDay")[0].value =
	zeroOrMore(coalesceSetRet("scheduleDOA.landWDVFirstDay") );

     calculatePointNo16DOA('building','rate5');
     calculatePointNo16DOA('building','rate10');
     calculatePointNo16DOA('building','rate40');
     calculatePointNo16DOA('furnitureFittings','rate10');
     calculatePointNo16DOA('intangibleAssets','rate25');
     calculatePointNo16DOA('ships','rate20');

}

function calculatePointNo16DOA(assetName,percentRate) {
	 if( $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value!=0 &&  $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value!="") {

	   	 var CapGainUs50 = calcPoint16DOAvalue(assetName,percentRate);
			 if(CapGainUs50>0 && $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value>parseInt("0", 10) && $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value<CapGainUs50) {
				 if(document.getElementsByName('scheduleDOA.'+ assetName +'.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed==true){

				 document.getElementsByName('scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed=false;
				 }

				 main.generateMsgDialogWithOk('The calculated value of Capital Gain/Loss u/s 50 in S.No 17 is '+CapGainUs50+' and is different from what has been entered by you (value entered by user). Please enter correct value of sale consideration in S.No 5 or 8 of this schedule. Else the entered value will be replaced with the calculated value.',"");
				 overrideDoaCapGainUs50(percentRate,CapGainUs50,assetName);
				 calcSchDCGFor6();
			 }

			 if(CapGainUs50<0 && $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value<parseInt("0", 10) && $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value>CapGainUs50) {
				 if(document.getElementsByName('scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed==true){

				 document.getElementsByName('scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50')[0].changed=false;
				 }

				main.generateMsgDialogWithOk('The calculated value of Capital Gain/Loss u/s 50 in S.No 17 is '+CapGainUs50+' and is different from what has been entered by you. Please enter correct value of sale consideration in S.No 5 or 8 of this schedule. Else the entered value will be replaced with the calculated value.',"");
				overrideDoaCapGainUs50(percentRate,CapGainUs50,assetName);
				calcSchDCGFor6();
			 }

			 if(CapGainUs50<0 && $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value<0) {
				doaCeasesMesg=doaCeasesMesg+'Block Depreciation - '+assetName+' @ '+percentRate.substring(4)+'% ceases to exist.<br/>';

			 }

			 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.netAggregateDepreciation"]')[0].value=0;
			 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.proportionateAggDepreciation"]')[0].value=0;
			 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.depDisAllowUs38_2"]')[0].value=0;
			 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.depreciationAtFullRate"]')[0].value=0;
		   	 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.depreciationAtHalfRate"]')[0].value=0;
		   	 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.totalDepreciation"]')[0].value=0;
		   	 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.wdvLastDay"]')[0].value=0;

	    }

}

function calcPoint16DOAvalue(assetName,percentRate) {
	return coalesceSetRet("scheduleDOA."+assetName+"."+percentRate+".depreciationDetail.realizationTotalPeriod") + coalesceSetRet("scheduleDOA."+assetName+"."+percentRate+".depreciationDetail.realizationPeriodDuringYear") - coalesceSetRet("scheduleDOA."+assetName+"."+percentRate+".depreciationDetail.wdvFirstDay") - coalesceSetRet("scheduleDOA."+assetName+"."+percentRate+".depreciationDetail.additionsGrThan180Days") - coalesceSetRet("scheduleDOA."+assetName+"."+percentRate+".depreciationDetail.additionsLessThan180Days") - coalesceSetRet("scheduleDOA."+assetName+"."+percentRate+".depreciationDetail.expdrOnTrforSaleAsset");
}

function overrideDoaCapGainUs50(percentRate,CapGainUs50,assetName) {
	 $('[name="scheduleDOA.'+assetName+'.'+percentRate+'.depreciationDetail.capGainUs50"]')[0].value = parseInt(CapGainUs50,10);
	 }


function calcSchESRFor5() {
    var amtDebPL1i = document.getElementsByName('scheduleESR.deductionUs35.section351I.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section351I.deductUs35.amtDebPL');
	    var amtUs35Allowable1i = document.getElementsByName('scheduleESR.deductionUs35.section351I.deductUs35.amtUs35Allowable')[0];		coalesceSetRet('scheduleESR.deductionUs35.section351I.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL1i = document.getElementsByName('scheduleESR.deductionUs35.section351I.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section351I.deductUs35.excessAmtOverDebPL');

	    var amtDebPL1ii = document.getElementsByName('scheduleESR.deductionUs35.section351Ii.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section351Ii.deductUs35.amtDebPL');
	    var amtUs35Allowable1ii = document.getElementsByName('scheduleESR.deductionUs35.section351Ii.deductUs35.amtUs35Allowable')[0]; 		coalesceSetRet('scheduleESR.deductionUs35.section351Ii.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL1ii = document.getElementsByName('scheduleESR.deductionUs35.section351Ii.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section351Ii.deductUs35.excessAmtOverDebPL');

		var amtDebPL1iia = document.getElementsByName('scheduleESR.deductionUs35.section351Iia.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section351Iia.deductUs35.amtDebPL');
	    var amtUs35Allowable1iia = document.getElementsByName('scheduleESR.deductionUs35.section351Iia.deductUs35.amtUs35Allowable')[0]; 		coalesceSetRet('scheduleESR.deductionUs35.section351Iia.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL1iia = document.getElementsByName('scheduleESR.deductionUs35.section351Iia.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section351Iia.deductUs35.excessAmtOverDebPL');

	    var amtDebPL1iii = document.getElementsByName('scheduleESR.deductionUs35.section351Iii.deductUs35.amtDebPL')[0];					coalesceSetRet('scheduleESR.deductionUs35.section351Iii.deductUs35.amtDebPL');
	    var amtUs35Allowable1iii = document.getElementsByName('scheduleESR.deductionUs35.section351Iii.deductUs35.amtUs35Allowable')[0];	coalesceSetRet('scheduleESR.deductionUs35.section351Iii.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL1iii = document.getElementsByName('scheduleESR.deductionUs35.section351Iii.deductUs35.excessAmtOverDebPL')[0];coalesceSetRet('scheduleESR.deductionUs35.section351Iii.deductUs35.excessAmtOverDebPL');

	    var amtDebPL1iiv = document.getElementsByName('scheduleESR.deductionUs35.section351Iv.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section351Iv.deductUs35.amtDebPL');
	    var amtUs35Allowable1iiv = document.getElementsByName('scheduleESR.deductionUs35.section351Iv.deductUs35.amtUs35Allowable')[0];		coalesceSetRet('scheduleESR.deductionUs35.section351Iv.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL1iv = document.getElementsByName('scheduleESR.deductionUs35.section351Iv.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section351Iv.deductUs35.excessAmtOverDebPL');

	    var amtDebPL2AA = document.getElementsByName('scheduleESR.deductionUs35.section352AA.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section352AA.deductUs35.amtDebPL');
	    var amtUs35Allowable2AA = document.getElementsByName('scheduleESR.deductionUs35.section352AA.deductUs35.amtUs35Allowable')[0];		coalesceSetRet('scheduleESR.deductionUs35.section352AA.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL2AA = document.getElementsByName('scheduleESR.deductionUs35.section352AA.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section352AA.deductUs35.excessAmtOverDebPL');

	    var amtDebPL2AB = document.getElementsByName('scheduleESR.deductionUs35.section352AB.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section352AB.deductUs35.amtDebPL');
	    var amtUs35Allowable2AB = document.getElementsByName('scheduleESR.deductionUs35.section352AB.deductUs35.amtUs35Allowable')[0];		coalesceSetRet('scheduleESR.deductionUs35.section352AB.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL2AB = document.getElementsByName('scheduleESR.deductionUs35.section352AB.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section352AB.deductUs35.excessAmtOverDebPL');

		var amtDebPLCCC = document.getElementsByName('scheduleESR.deductionUs35.section35CCC.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section35CCC.deductUs35.amtDebPL');
	    var amtUs35AllowableCCC = document.getElementsByName('scheduleESR.deductionUs35.section35CCC.deductUs35.amtUs35Allowable')[0];		coalesceSetRet('scheduleESR.deductionUs35.section35CCC.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPLCCC = document.getElementsByName('scheduleESR.deductionUs35.section35CCC.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section35CCC.deductUs35.excessAmtOverDebPL');

		var amtDebPLCCD = document.getElementsByName('scheduleESR.deductionUs35.section35CCD.deductUs35.amtDebPL')[0];						coalesceSetRet('scheduleESR.deductionUs35.section35CCD.deductUs35.amtDebPL');
	    var amtUs35AllowableCCD = document.getElementsByName('scheduleESR.deductionUs35.section35CCD.deductUs35.amtUs35Allowable')[0];		coalesceSetRet('scheduleESR.deductionUs35.section35CCD.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPLCCD = document.getElementsByName('scheduleESR.deductionUs35.section35CCD.deductUs35.excessAmtOverDebPL')[0];	coalesceSetRet('scheduleESR.deductionUs35.section35CCD.deductUs35.excessAmtOverDebPL');

	    var amtDebPLTot = document.getElementsByName('scheduleESR.deductionUs35.totUs35.deductUs35.amtDebPL')[0];							coalesceSetRet('scheduleESR.deductionUs35.totUs35.deductUs35.amtDebPL');
	    var amtUs35AllowableTot = document.getElementsByName('scheduleESR.deductionUs35.totUs35.deductUs35.amtUs35Allowable')[0];			coalesceSetRet('scheduleESR.deductionUs35.totUs35.deductUs35.amtUs35Allowable');
	    var excessAmtOverDebPL1iTot = document.getElementsByName('scheduleESR.deductionUs35.totUs35.deductUs35.excessAmtOverDebPL')[0];		coalesceSetRet('scheduleESR.deductionUs35.totUs35.deductUs35.excessAmtOverDebPL');

	    excessAmtOverDebPL1i.value = eval(parseInt(amtUs35Allowable1i.value,10)) - eval(parseInt(amtDebPL1i.value,10));
	    if(eval(excessAmtOverDebPL1i.value,10) < 0){
	     excessAmtOverDebPL1i.value =  parseInt(0,10);
	    }

	    excessAmtOverDebPL1ii.value = eval(parseInt(amtUs35Allowable1ii.value,10)) - eval(parseInt(amtDebPL1ii.value,10));
	    if(eval(excessAmtOverDebPL1ii.value,10) < 0){
	     excessAmtOverDebPL1ii.value =  parseInt(0,10);
	    }

		excessAmtOverDebPL1iia.value = eval(parseInt(amtUs35Allowable1iia.value,10)) - eval(parseInt(amtDebPL1iia.value,10));
	    if(eval(excessAmtOverDebPL1iia.value,10) < 0){
	     excessAmtOverDebPL1iia.value =  parseInt(0,10);
	    }

	    excessAmtOverDebPL1iii.value = eval(parseInt(amtUs35Allowable1iii.value,10)) - eval(parseInt(amtDebPL1iii.value,10));
	    if(eval(excessAmtOverDebPL1iii.value,10) < 0){
	     excessAmtOverDebPL1iii.value =  parseInt(0,10);
	    }

	    excessAmtOverDebPL1iv.value = eval(parseInt(amtUs35Allowable1iiv.value,10)) - eval(parseInt(amtDebPL1iiv.value,10));
	    if(eval(excessAmtOverDebPL1iv.value,10) < 0){
	     excessAmtOverDebPL1iv.value =  parseInt(0,10);
	    }

	    excessAmtOverDebPL2AA.value = eval(parseInt(amtUs35Allowable2AA.value,10)) - eval(parseInt(amtDebPL2AA.value,10));
	    if(eval(excessAmtOverDebPL2AA.value,10) < 0){
	     excessAmtOverDebPL2AA.value =  parseInt(0,10);
	    }

	    excessAmtOverDebPL2AB.value = eval(parseInt(amtUs35Allowable2AB.value,10)) - eval(parseInt(amtDebPL2AB.value,10));
	    if(eval(excessAmtOverDebPL2AB.value,10) < 0){
	     excessAmtOverDebPL2AB.value =  parseInt(0,10);
	    }

		excessAmtOverDebPLCCC.value = eval(parseInt(amtUs35AllowableCCC.value,10)) - eval(parseInt(amtDebPLCCC.value,10));
	    if(eval(excessAmtOverDebPLCCC.value,10) < 0){
	     excessAmtOverDebPLCCC.value =  parseInt(0,10);
	    }

		excessAmtOverDebPLCCD.value = eval(parseInt(amtUs35AllowableCCD.value,10)) - eval(parseInt(amtDebPLCCD.value,10));
	    if(eval(excessAmtOverDebPLCCD.value,10) < 0){
	     excessAmtOverDebPLCCD.value =  parseInt(0,10);
	    }

	    amtDebPLTot.value = eval(parseInt(amtDebPL1i.value,10)) + eval(parseInt(amtDebPL1ii.value,10))+ eval(parseInt(amtDebPL1iia.value,10))+ eval(parseInt(amtDebPL1iii.value,10))+ eval(parseInt(amtDebPL1iiv.value,10))+ eval(parseInt(amtDebPL2AA.value,10))+ eval(parseInt(amtDebPL2AB.value,10))+ eval(parseInt(amtDebPLCCC.value,10))+ eval(parseInt(amtDebPLCCD.value,10));
	    amtUs35AllowableTot.value = eval(parseInt(amtUs35Allowable1i.value,10)) + eval(parseInt(amtUs35Allowable1ii.value,10))+ eval(parseInt(amtUs35Allowable1iia.value,10))+ eval(parseInt(amtUs35Allowable1iii.value,10))+ eval(parseInt(amtUs35Allowable1iiv.value,10))+ eval(parseInt(amtUs35Allowable2AA.value,10))+ eval(parseInt(amtUs35Allowable2AB.value,10))+ eval(parseInt(amtUs35AllowableCCC.value,10))+ eval(parseInt(amtUs35AllowableCCD.value,10));
	    excessAmtOverDebPL1iTot.value = eval(parseInt(excessAmtOverDebPL1i.value,10)) + eval(parseInt(excessAmtOverDebPL1ii.value,10))+ eval(parseInt(excessAmtOverDebPL1iia.value,10))+ eval(parseInt(excessAmtOverDebPL1iii.value,10))+ eval(parseInt(excessAmtOverDebPL1iv.value,10))+ eval(parseInt(excessAmtOverDebPL2AA.value,10))+ eval(parseInt(excessAmtOverDebPL2AB.value,10))+ eval(parseInt(excessAmtOverDebPLCCC.value,10))+ eval(parseInt(excessAmtOverDebPLCCD.value,10));

}




function getExemption(){
	var pan = document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
	var taxPayer = document.getElementsByName("partAGEN1.orgFirmInfo.statusOrCompanyType")[0];
	var subtaxPayer = document.getElementsByName("partAGEN1.orgFirmInfo.subStatus")[0];
			if(taxPayer.value=='9' || (taxPayer.value=='14' && subtaxPayer.value=='11') ){
					return 250000;
			}else if(taxPayer.value=='14' && subtaxPayer.value=='8'){
					var isSharedForeign = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;
					var totIncFrmMemberOfAop = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].totIncFrmMemberOfAop')[0].value;
					var shares = getPercentOfShare();
					var total = parseInt(shares.foreignPerc,10)+parseInt(shares.otherPerc,10);
					if(isSharedForeign=='NO' && totIncFrmMemberOfAop == 'N' && total == 100){
						return 250000;
					}
					return 0;
			}else if(taxPayer.value=='14' && (subtaxPayer.value=='7' || subtaxPayer.value=='13')){

				var isSharedForeign = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;
				var totIncFrmMemberOfAop = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].totIncFrmMemberOfAop')[0].value;
				var shares = getPercentOfShare();
				var total = parseInt(shares.foreignPerc,10)+parseInt(shares.otherPerc,10);

				var firstFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare')[0].value;
				var secondFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusInc')[0].value;
				var thirdFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].value;
				var fourthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic')[0].value;
				var fifthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable')[0].value;
				var sixthFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives')[0].value;
				var seventhFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf')[0].value;
				if( (firstFlag=='Y' && secondFlag=='Y' && thirdFlag=='Y' ) || (firstFlag=='N' && secondFlag=='Y' && thirdFlag=='Y') || (firstFlag=='N' && secondFlag=='N' && (fourthFlag=='Y' || fifthFlag=='Y' || sixthFlag=='Y' || seventhFlag=='Y')) ){
					if(isSharedForeign=='NO' && totIncFrmMemberOfAop == 'N' && total == 100){
						return 250000;
					}
					return 0;

				}else{
					return 0;
				}
			}else{

					return 0;
				}
	}


function getPercentOfShare(){
	var tab = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
	var inputs = tab.getElementsByTagName('input');
	var foreignPerc = 0;
	var otherPerc = 0;

	for(var i =0; i < inputs.length; i++){
		if(inputs[i].name!=undefined && inputs[i].name.match('sharePercentage$')){

			var index = inputs[i].name.substr(eval(inputs[i].name.indexOf("["))+1,1);
			var type = document.getElementsByName('partAGEN2.partnerOrMemberInfo['+index+'].status')[0].value;
			if(type=='FOREIGN_COMPANY'){
				foreignPerc = eval(foreignPerc + (mulFloatBy100(inputs[i].value)));
			}else if(status==1 || (status==1 && substatus==5)){
				if(type !='IND_RETIRED' ){
					otherPerc = eval(otherPerc + (mulFloatBy100(inputs[i].value)));
				}

			}else{
				otherPerc = eval(otherPerc + (mulFloatBy100(inputs[i].value)));
			}
		}
	}
	return {'foreignPerc':foreignPerc/100, 'otherPerc':otherPerc/100};
}

function calculatePartBTI_first(){
	try{
		surcharge201718();
		//1
		var incomeFromHP = document.getElementsByName('partBTI.incomeFromHP')[0];
		incomeFromHP.value =  zeroOrMore( coalesceSetRet('scheduleHP.totalIncomeChargeableUnHP') );

		//2
		var adjustedBp41 = parseInt(
					coalesceSetRet('itr5ScheduleBP.specBusinessInc.adjustedPLFrmSpecuBus'), 10);
		var bp37 = parseInt(
					coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.netPLBusOthThanSpec7A7B7C'), 10);

		var adjustedBp47 = parseInt(
					coalesceSetRet('itr5ScheduleBP.incSpecifiedBusiness.profitLossSpecifiedBusFinal'), 10);

		var bp3d = parseInt(
				coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBF'), 10);

		var bp3e = parseInt(
				coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBG'), 10);

		if (bp37 > 0) {
			document.getElementsByName('partBTI.profBusGain.profGainNoSpecBus')[0].value = bp37;
		} else {
			document.getElementsByName('partBTI.profBusGain.profGainNoSpecBus')[0].value = parseInt(0, 10);
		}

		if (eval(adjustedBp41) > 0) {
			var speclBusinessAfterSet = document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.speculativeInc.incOfCurYrAfterSetOff')[0].value;
			document.getElementsByName('partBTI.profBusGain.profGainSpecBus')[0].value = eval(speclBusinessAfterSet);

		} else {
			document.getElementsByName('partBTI.profBusGain.profGainSpecBus')[0].value = parseInt(0, 10);
		}

		if (eval(adjustedBp47) > 0) {
			var specBuisnessAfterSet= document.getElementsByName('itr5ScheduleBP.busSetoffCurYr.specifiedInc.incOfCurYrAfterSetOff')[0].value;
			document.getElementsByName('partBTI.profBusGain.profGainSpecifiedBus')[0].value = eval(specBuisnessAfterSet);

		} else {
			document.getElementsByName('partBTI.profBusGain.profGainSpecifiedBus')[0].value = parseInt(0, 10);
		}

		if (bp3d > 0) {
			document.getElementsByName('partBTI.profBusGain.underSecBBF')[0].value = bp3d;
		} else {
			document.getElementsByName('partBTI.profBusGain.underSecBBF')[0].value = parseInt(0, 10);
		}

		if (bp3e > 0) {
			document.getElementsByName('partBTI.profBusGain.underSecBBG')[0].value = bp3e;
		} else {
			document.getElementsByName('partBTI.profBusGain.underSecBBG')[0].value = parseInt(0, 10);
		}

	document.getElementsByName('partBTI.profBusGain.totProfBusGain')[0].value = eval(
		parseInt(coalesceSetRet('partBTI.profBusGain.profGainNoSpecBus'),10)
		+ parseInt(coalesceSetRet('partBTI.profBusGain.profGainSpecBus'),10)
		+ parseInt(coalesceSetRet('partBTI.profBusGain.profGainSpecifiedBus'),10)
		+ parseInt(coalesceSetRet('partBTI.profBusGain.underSecBBF'),10)
		+ parseInt(coalesceSetRet('partBTI.profBusGain.underSecBBG'),10)
		);

	//3a
	document.getElementsByName('partBTI.capGain.shortTerm.shortTerm15Per')[0].value =
		parseInt(coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg15Per.CurrYrLosSetOff'),10);

	document.getElementsByName('partBTI.capGain.shortTerm.shortTerm30Per')[0].value =
		parseInt(coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg30Per.currYrLosSetOff'),10);

	document.getElementsByName('partBTI.capGain.shortTerm.shortTermAppRate')[0].value =
		parseInt(coalesceSetRet('scheduleCGPost45.currYrLosses.inStcgAppRate.currYrLosSetOff'),10);

	document.getElementsByName('partBTI.capGain.shortTerm.shortTermChargableDtaa')[0].value =
		parseInt(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg'),10);

	document.getElementsByName('partBTI.capGain.shortTerm.totalShortTerm')[0].value = eval(
		parseInt(coalesceSetRet('partBTI.capGain.shortTerm.shortTerm15Per'),10)
		+ parseInt(coalesceSetRet('partBTI.capGain.shortTerm.shortTerm30Per'),10)
		+ parseInt(coalesceSetRet('partBTI.capGain.shortTerm.shortTermAppRate'),10)
		+ parseInt(coalesceSetRet('partBTI.capGain.shortTerm.shortTermChargableDtaa'),10)
		);
	//3b
	document.getElementsByName('partBTI.capGain.longTerm.longTerm10Per')[0].value =
		parseInt(coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg10Per.currYrLosSetOff'),10);

	document.getElementsByName('partBTI.capGain.longTerm.longTerm20Per')[0].value =
		parseInt(coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg20Per.CurrYrLosSetOff'),10);

	document.getElementsByName('partBTI.capGain.longTerm.longTermDtaa')[0].value =
		parseInt(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg'),10);

	document.getElementsByName('partBTI.capGain.longTerm.totalLongTerm')[0].value = eval(
		parseInt(coalesceSetRet('partBTI.capGain.longTerm.longTerm10Per'),10)
		+ parseInt(coalesceSetRet('partBTI.capGain.longTerm.longTerm20Per'),10)
		+ parseInt(coalesceSetRet('partBTI.capGain.longTerm.longTermDtaa'),10)
		);

	if (eval(document.getElementsByName('partBTI.capGain.longTerm.totalLongTerm')[0].value,10) < 0) {
		document.getElementsByName('partBTI.capGain.longTerm.totalLongTerm')[0].value = parseInt(0,10);
	}


	var totalCapGains = document.getElementsByName('partBTI.capGain.totalCapGains')[0];
	totalCapGains.value = parseInt(document.getElementsByName('partBTI.capGain.shortTerm.totalShortTerm')[0].value)
							+ parseInt(document.getElementsByName('partBTI.capGain.longTerm.totalLongTerm')[0].value);

	//4
	var otherSrcThanOwnRaceHorse = document.getElementsByName('partBTI.incFromOS.otherSrcThanOwnRaceHorse')[0];
	otherSrcThanOwnRaceHorse.value = zeroOrMore(coalesceSetRet('scheduleOS.balanceNoRaceHorse'));

	var incChargeSplRate = document.getElementsByName('partBTI.incFromOS.incChargeSplRate')[0];
	incChargeSplRate.value = zeroOrMore(coalesceSetRet('scheduleOS.incChargblSplRateOS.totalOSGrossChargblSplRate'));

	var fromOwnRaceHorse = document.getElementsByName('partBTI.incFromOS.fromOwnRaceHorse')[0];
	fromOwnRaceHorse.value = zeroOrMore(coalesceSetRet('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse'));



	var totIncFromOS = document.getElementsByName('partBTI.incFromOS.totIncFromOS')[0];
	totIncFromOS.value = eval(parseInt(otherSrcThanOwnRaceHorse.value, 10)
							 + parseInt(incChargeSplRate.value, 10)
							 + parseInt(fromOwnRaceHorse.value, 10)
							 );

	//5
	document.getElementsByName('partBTI.totalTI')[0].value = eval(
		parseInt(coalesceSetRet('partBTI.incomeFromHP'),10)
		+ parseInt(coalesceSetRet('partBTI.profBusGain.totProfBusGain'),10)
		+ parseInt(coalesceSetRet('partBTI.capGain.totalCapGains'),10)
		+ parseInt(coalesceSetRet('partBTI.incFromOS.totIncFromOS'),10)
		);

	//6
	document.getElementsByName('partBTI.currentYearLoss')[0].value = eval(
		parseInt(coalesceSetRet('scheduleCYLA.totalLossSetOff.totHPlossCurYrSetoff'),10)
		+ parseInt(coalesceSetRet('scheduleCYLA.totalLossSetOff.totBusLossSetoff'),10)
		+ parseInt(coalesceSetRet('scheduleCYLA.totalLossSetOff.totOthSrcLossNoRaceHorseSetoff'),10)
		);

	//7
	document.getElementsByName('partBTI.balanceAfterSetoffLosses')[0].value = eval(
		parseInt(coalesceSetRet('partBTI.totalTI'),10)
		- parseInt(coalesceSetRet('partBTI.currentYearLoss'),10)
		);

	//8
	document.getElementsByName('partBTI.broughtFwdLossesSetoff')[0].value = zeroOrMore(eval(
		parseInt(coalesceSetRet('scheduleBFLA.totalBFLossSetOff.totBFLossSetoff'),10)
		+ parseInt(coalesceSetRet('scheduleBFLA.totalBFLossSetOff.totUnabsorbedDeprSetoff'),10)
		+ parseInt(coalesceSetRet('scheduleBFLA.totalBFLossSetOff.totAllUs35Cl4Setoff'),10)
		));

	//9
	document.getElementsByName('partBTI.grossTotalIncome')[0].value = zeroOrMore(eval(
		parseInt(coalesceSetRet('partBTI.balanceAfterSetoffLosses'),10)
		- parseInt(coalesceSetRet('partBTI.broughtFwdLossesSetoff'),10)
		));

	//10
	 document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value = eval(
				parseInt(coalesceSetRet('scheduleSI.totSplRateInc'),10)
				);

		//11

		var ded10A10AAAlwd = parseInt(coalesceSetRet('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrAfterSetOffBFLosses')) ;

     document.getElementsByName('partBTI.deductionsUnder10Aor10AA')[0].value=Math.min(zeroOrMore(eval(

                 parseInt(coalesceSetRet('schedule10AA.deductSEZ.dedUs10Detail.totalDedUs10Sub'),10)
		)),ded10A10AAAlwd);

	}catch(e){
		alert(e.stack);
	}
}

function calculatePartBTI_second(){
	try{
		surcharge201718();
	  //12
    var dedPartBLimit=zeroOrMore(eval(
	parseInt(coalesceSetRet('partBTI.grossTotalIncome'),10)-
               parseInt(coalesceSetRet('partBTI.incChargeTaxSplRate111A112'),10)-
               parseInt(coalesceSetRet('partBTI.deductionsUnder10Aor10AA'),10)
	));
    var dedPartCLimit=zeroOrMore(eval(
	parseInt(coalesceSetRet('partBTI.grossTotalIncome'),10)-
               parseInt(coalesceSetRet('partBTI.incChargeTaxSplRate111A112'),10)-
               parseInt(coalesceSetRet('partBTI.deductionsUnder10Aor10AA'),10)-
               parseInt(coalesceSetRet('partBTI.profBusGain.profGainSpecifiedBus'),10)
	));

       var dedPartB=zeroOrMore(eval(
	parseInt(coalesceSetRet('scheduleVIA.deductUndChapVIA.totalDeductionPartb'),10)
	));
              //13a
               if(dedPartB<dedPartBLimit){
                   document.getElementsByName('partBTI.deductionsUnderScheduleVIAPartB')[0].value=dedPartB
               }else{
                 document.getElementsByName('partBTI.deductionsUnderScheduleVIAPartB')[0].value=dedPartBLimit;
               }
               //13b
           var dedPartC=zeroOrMore(eval(
	parseInt(coalesceSetRet('scheduleVIA.deductUndChapVIA.totalDeductionPartC'),10)
	));

           if(dedPartC<dedPartCLimit){
                   document.getElementsByName('partBTI.deductionsUnderScheduleVIAPartC')[0].value=dedPartC;
               }else{
                 document.getElementsByName('partBTI.deductionsUnderScheduleVIAPartC')[0].value=dedPartCLimit;
               }

  //13c
  var totalDedChapVIA=zeroOrMore(eval(
	parseInt(coalesceSetRet('partBTI.deductionsUnderScheduleVIAPartB'),10)+
               parseInt(coalesceSetRet('partBTI.deductionsUnderScheduleVIAPartC'),10)
	));

 if(dedPartBLimit<totalDedChapVIA){
     document.getElementsByName('partBTI.totalDeductionsUnderScheduleVIA')[0].value=dedPartBLimit;
 }else{

     document.getElementsByName('partBTI.totalDeductionsUnderScheduleVIA')[0].value=totalDedChapVIA;
 }


	//12
 	document.getElementsByName('partBTI.totalIncome')[0].value = rndOffNrsTen(zeroOrMore(eval(
			parseInt(coalesceSetRet('partBTI.grossTotalIncome'),10)-
	                    parseInt(coalesceSetRet('partBTI.deductionsUnder10Aor10AA'),10)
			- parseInt(coalesceSetRet('partBTI.totalDeductionsUnderScheduleVIA'),10)
			)));

	//13
 // calling SI before 13
	calcScheduleSI();

	document.getElementsByName('partBTI.incomeChargeableTotTax')[0].value = eval(
	parseInt(coalesceSetRet('scheduleSI.totSplRateTaxableInc'),10)
	);


	//14
        if(eval(
		parseInt(coalesceSetRet('scheduleEI.netAgriIncOrOthrIncRule7'),10))>5000){
	document.getElementsByName('partBTI.netAgricultureIncomeOrOtherIncomeForRate')[0].value = eval(
		parseInt(coalesceSetRet('scheduleEI.netAgriIncOrOthrIncRule7'),10));
                } else {
         document.getElementsByName('partBTI.netAgricultureIncomeOrOtherIncomeForRate')[0].value=0;
                }

	//15
        calculateAggregateIncome();


	//16
	document.getElementsByName('partBTI.lossesOfCurrentYearCarriedFwd')[0].value = eval(
		parseInt(coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF'),10)
		+ parseInt(coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF'),10)
		+ parseInt(coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecBusCF'),10)
		+ parseInt(coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.lossFrmSpecifiedBusCF'),10)
		+ parseInt(coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF'),10)
		+ parseInt(coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF'),10)
		+ parseInt(coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF'),10)
		);

	}catch(e){
		alert(e.stack);
	}
}



function adjustFormPartAGEN2(){

	var pan=document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
	 var statusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	 var substatusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
	var fourth;
	if(pan!=undefined && pan!=''){
		pan = pan.toUpperCase();
		fourth= pan.charAt(3);
	}

	if(substatusCompany==8 || substatusCompany==12){
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].disabled = false;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.totIncFrmMemberOfAop')[0].disabled = false;
	}else{
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp')[0].disabled = true;
    	document.getElementsByName('partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp')[0].value='';
    	document.getElementsByName('partAGEN2.partnerOrMemberInfo.totIncFrmMemberOfAop')[0].disabled = true;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].disabled = true;
    	document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].value='';
	}

	if(statusCompany=='2' || statusCompany=='9' || substatusCompany=='7'  || statusCompany==''){
		document.getElementsByName('partAGEN2.prevYrMemPartChange')[0].disabled = true;
    	document.getElementsByName('partAGEN2.prevYrMemPartChange')[0].value='';
	}else{
		document.getElementsByName('partAGEN2.prevYrMemPartChange')[0].disabled = false;

	}

    //Enable 80P for co-op

    if(substatusCompany== '17' ||  substatusCompany== '15' || substatusCompany== '16' || substatusCompany== '4'){
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80P')[0].disabled = false;

    }else{
    	document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80P')[0].disabled = true;
    	document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80P')[0].value='';
    }

}


function enableYesNoForForeignCompFlg(element1,element2){

	if(document.getElementsByName(element1)[0].value=='NO'){

		document.getElementsByName(element2)[0].disabled=true;
		document.getElementsByName(element2)[0].value="";
	}
	else if(document.getElementsByName(element1)[0].value=='YES'){

		document.getElementsByName(element2)[0].disabled=false;

	}
	else{
		document.getElementsByName(element2)[0].disabled=true;
		document.getElementsByName(element2)[0].value="";

	}

}



function deleteRowTablebadDebtPL(tx,ty,tz){
	deleteRowTable(tx,ty,tz);
	calculatePL();
}

function deleteRowTableOprtRev(tx,ty,tz){
	deleteRowTable(tx,ty,tz);
	calculatePL();
}

function deleteRowTableOthExp(tx,ty,tz){
	deleteRowTable(tx,ty,tz);
	calculatePL();
}

function deleteRowTableOthInc(tx,ty,tz){
	deleteRowTable(tx,ty,tz);
	calculatePL();
}

function validateOnSubmit() {

	try{
    appendzeroto5or6TCS();
	checkDropdownSelectedin1d();
	verificationPanValidation('partAGEN2PartnerOrMemberInfoTable');
	validateTDS2();
	validateTDS3();
	validateCGSecwiseDed();
	//validateCGDedDate();
	showTaxRateMsg();
	checkForeignSelected();
	calcSchCGLtcgStcg();
	validateScheduleHP();
	checkSchFAMandatory();
	checkQDRawMatMandatory('scheduleQDRaw','scheduleQDFin');
	validateUD();
	balSheetWarnig();
	validatepoint1513();
	checkAmtcSubmit();
	checkAMTCCurAY();
	validatePartners();
	validateHPRent();
	calculateTDS();
	calculateTCS();
	checkAMTCCurAY();
	validateFSI();
	priBankMandtry();
	CheckHPShareProperty();
	checkUniqueOSSec();
	CheckPLExpenses();
	CheckProfExpenses();
	CheckBFLAUDMismatch();
	checkEmptySchUDAmt();
	//isDSCMandatory();
	checkSIAmount();
	calculateTotalTaxIT('scheduleIt');
	checkPercentShare(); // Part A gen 2 Table E
	checkUniqueTableCol('scheduleFSI', 'countryCode$','Same Country cannot be selected more than once.');
	makePartAGenRowOneMandate();
	checkLLIPNForTwoLLP();
	percentageShareMan();
	validateSTCGSectionWiseDTAA();
    validateLTCGSectionWiseDTAA();
    panValidation80G('ded100PerWithoutQual');
	panValidation80G('ded50WithoutQual');
	panValidation80G('ded100Qual');
	panValidation80G('ded50WithQual');
	setCG54Dtls();
	mandateA6();
	mandateB8();
	calculatePL();
	validateSEBI();
	validatePartAGen2();
	validateAuditDtls();
	calcTotalAmt('schEIMinorChild');
	//Always keep alertItr2User() at the last
	alertItr5User();
	pdtItr5NotReqd();
	validateDTAAStcg();
	validateDTAALtcg();
	validateTDS29Grtthen67();
	validateTDS39Grtthen67();
	checkFor16thFiledValue();
	calculateTotalDeductions();
	validateNatureOfBussiness();
	}catch(e){
		alert('error in validate=' + e.stack);
	}




}

function validatePartAGen2() {
	var tab1 = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
    var noOfRows=tab1.rows.length;
	for ( var i = 0; i < (noOfRows-4); i++) {
			var status = document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].status')[0].value;
			var pan = document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].pan')[0].value;
			if(status == 'PRINCIPAL_OFFICER' && pan == '') {
				addErrorXHTML(document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].pan')[0],'Please enter a PAN',true);
				j.setFieldError('partAGEN2.partnerOrMemberInfo[0].pan','Please enter a PAN');
			}
		}
}
function calcTotFullConA(a,b,c) {

	var afield = document
	.getElementsByName(a)[0];afield.value=coalesce(afield.value);
	var bfield = document
	.getElementsByName(b)[0];bfield.value=coalesce(bfield.value);
	var cfield = document
	.getElementsByName(c)[0];cfield.value=coalesce(cfield.value);

	 if(parseInt(coalesce(afield.value),10) >= parseInt(coalesce(bfield.value),10)){
		 cfield.value=afield.value;
	     }
	 if(parseInt(coalesce(afield.value),10) <= parseInt(coalesce(bfield.value),10)){
		 cfield.value=bfield.value;
	     }



}

function validateSEBI() {

	var value = document.getElementsByName('partAGEN1.filingStatus.sebiRegnNo')[0].value;
	var fiiFpiFlg = document.getElementsByName('partAGEN1.filingStatus.fiiFpiFlg')[0].value;

	if (fiiFpiFlg == 'Y' && !isNaN(value) && parseInt(value,10) == 0) {
		addErrorXHTML(document.getElementsByName('partAGEN1.filingStatus.sebiRegnNo')[0],'Please enter valid SEBI Registration Number.', true);
		j.setFieldError('partAGEN1.filingStatus.sebiRegnNo','Please enter valid SEBI Registration Number.');
	}
}


//mandatory Field A6.
function mandateA6()
{
	var valueA13=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0].value;
	var valueAb4=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.deductSec48.totalDedn')[0].value;
	var valueA1d=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.exemptionOrDednUs54')[0].value;


	var valueA2ia=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].fullConsideration')[0].value;
	var valueA2b4=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].deductSec48.totalDedn')[0].value;
	var valueA2d=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].lossSec94of7Or94of8')[0].value;


	var valueA3a=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0].value;
	var valueA3b=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0].value;


	//var valueA4a=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0].value;
	var valueA44=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.totalDedn')[0].value;
	var valueA4d=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.capgainonAssets')[0].value;


	//var valueA5a=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration')[0].value;
	var valueA54=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.deductSec48.totalDedn')[0].value;
	var valueA5d=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.capgainonAssets')[0].value;

	var valueA6=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa')[0].value;

	var valueSTCG= valueA13+valueAb4+valueA1d+valueA2ia+valueA2b4+valueA2d+valueA3a+valueA3b+valueA44+valueA4d+valueA54+valueA5d+valueA6;

	var fieldSTCG=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag')[0];

	var fieldLTCG=document.getElementsByName('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag')[0];
	if(valueSTCG >0 && fieldSTCG.value=="")
	{
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag','Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A7a of Schedule CG');
		addErrorXHTML(fieldSTCG,'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A7 of Schedule CG',true);
	}
	if(valueSTCG>0 && fieldLTCG.value=='')
	{
		addErrorXHTML(fieldLTCG,'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B9 of Schedule CG',true);
		j.setFieldError('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag','Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B9 of Schedule CG');
	}

}

// Mandatory Field B8.
function mandateB8()
{

	var valueB1aiii=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0].value;
	var valueB1biv=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.deductSec48.totalDedn')[0].value;
	var valueB1d=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.exemptionOrDednUs54')[0].value;

	var valueB2a=document.getElementsByName('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.fullConsiderationB')[0].value;
	var valueB2b=document.getElementsByName('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.netWorthOfUTDivnB')[0].value;
	var valueB2d=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.capGainSlumpSale.exemptionOrDednUs54')[0].value;

	var valueB3a=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.fullConsideration')[0].value;
	var valueB3biv=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.deductSec48.totalDedn')[0].value;
	var valueB3d=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.exemptionOrDednUs54')[0].value;

	var valueB4a=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].fullConsideration')[0].value;
	var valueB4biv=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].deductSec48.totalDedn')[0].value;
	var valueB4d=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].exemptionOrDednUs54S')[0].value;


	var valueB5a=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit')[0].value;
	var valueB5b=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0].value;

	var valueB6a=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].fullConsideration')[0].value;
	var valueB6biv=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].deductSec48.totalDedn')[0].value;
	var valueB6d=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].exemptionOrDednUs54S')[0].value;

	var valueB7a=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration')[0].value;
	var valueB7biv=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.totalDedn')[0].value;
	var valueB7d=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.exemptionOrDednUs54S')[0].value;


	var valueB8b=document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54.amtDeemedLtcg')[0].value;

	var fieldLTCG=document.getElementsByName('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag')[0];

	var valueLTCG = valueB1aiii + valueB1biv + valueB1d + valueB2a + valueB2b + valueB2d + valueB3a + valueB3biv + valueB3d + valueB4a + valueB4biv +
	valueB4d + valueB5a + valueB5b + valueB6a + valueB6biv + valueB6d + valueB7a + valueB7biv + valueB7d + valueB8b;

	var fieldSTCG=document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag')[0];

	if((valueLTCG!=null && valueLTCG!=undefined ) && valueLTCG >0 && fieldLTCG.value == '')
	{
			addErrorXHTML(fieldLTCG,'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B8 of Schedule CG',true);
			j.setFieldError('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag','Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B8 of Schedule CG');
	}
	if(valueLTCG>0 && fieldSTCG.value == '')
	{
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag','Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A7a of Schedule CG');
		addErrorXHTML(fieldSTCG,'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A7 of Schedule CG',true);
	}
}


function setCG54Dtls() {
	var tab1 = document.getElementById('scheduleStcgunUtilizedCapGain54');
    var noOfRows=tab1.rows.length;

	for ( var i = 0; i < (noOfRows-3); i++) {
			var section = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['+i+'].section')[0].value;
			if(section != '') {
				document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['+i+'].ay')[0].value = '2014-15';
			} else {
				document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['+i+'].ay')[0].value = '';
			}
		}


	var tab1 = document.getElementById('scheduleLtcgunUtilizedCapGain54');
    var noOfRows=tab1.rows.length;

	for ( var i = 0; i < (noOfRows-3); i++) {
			var section = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['+i+'].section')[0].value;
			if(section != '') {
				document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['+i+'].ay')[0].value = '2014-15';
			} else {
				document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['+i+'].ay')[0].value = '';
			}
		}
}

function checkPercentShare() {
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	if(status==1 || (status==1 && substatus==5)) {
		var tab = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
		var rowCount = tab.rows.length;
		var sharePercentage = 0;
		var retiredSharePercentage = 0;
		 for(var i=0;i<eval(parseInt(rowCount,10)-4);i++){

			 var patnerStatus = document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].status')[0].value;
				 if(patnerStatus != "IND_RETIRED"){
					 sharePercentage = eval(sharePercentage + (mulFloatBy100(document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].sharePercentage')[0].value)));
				 }
			 }

		 if(checkHPShareSum(sharePercentage/100)){
			 j.setFieldError('partAGEN2.partnerOrMemberInfo[0].sharePercentage','Please ensure that total share of percentage for existing partners must be equal to 100.');
			 addErrorXHTML('','Please ensure that total share of percentage for existing partners must be equal to 100.',true);
        }
	}

}

//Calculate Total Tax for Schedule-IT.
function calculateTotalTaxIT(tableId){

	var tab1 = document.getElementById('scheduleIt');
	var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;

	for ( var i = 0; i < (noOfRows-3); i++) {
		amt = document.getElementsByName('scheduleIT.taxPayment['+i+'].amt')[0].value;
		sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
	}
	document.getElementsByName('scheduleIT.taxPayment.totalTaxPayments')[0].value = parseInt(sum,10);
}

function scheduleFSIAlert()
{
   var tableFSI = checkRowBlank('scheduleFSI', 3, 2);
   if(tableFSI==false){

   addErrorXHTML('','Please ensure that the incomes shown in Schedule FSI  are also reflected under respective income schedules.');

  }

}


function checkSchFAMandatory() {

    	var table1 = checkRowBlank('schFADtlsFrignAssets', 2, 1);
		var table2 = checkRowBlank('schFADtlsFinIntrest', 2, 1);
		var table3 = checkRowBlank('schFADtlsImmvbleProp', 2, 1);
		var table4 = checkRowBlank('schFADtlsOtherAsset', 2, 1);
		var table5 = checkRowBlank('schFADtlsSigningAuth', 2, 1);
		var table6 = checkRowBlank('schFADtlsTrusts', 2, 1);
		var table7 = checkRowBlank('DetailsOthIncomeOutsideIndia', 2, 1);

	if(document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value=='YES' && document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value!='NRI') {
		if(table1 && table2 && table3 && table4 && table5 && table6 && table7 ) {
			j.setFieldError('scheduleFA.detailsForiegnBank[0].countryCode','Please enter any one table in Schedule FA.');
			addErrorXHTML('','Please enter any one table in Schedule FA.');
		}
	}
        if(document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value=='NO' && document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value!='NRI') {
		if( !(table1 && table2 && table3 && table4 && table5 && table6) && table7 ) {
			j.setFieldError('scheduleBA.assetOutIndiaFlag','Please correct your selection of assets outside India in Part B -TTI.');
			addErrorXHTML('','Please correct your selection of assets outside India in Part B -TTI.');
		}
	}
}



function validateScheduleHP(){
	var tab = document.getElementById('scheduleHPMain');
	var allInputTags = tab.getElementsByTagName('select');
	var count = 0;
	for(var i=0; i<allInputTags.length; i++ ){
		if(allInputTags[i].name.match("ifLetOut$")){
			if(allInputTags[i].value=="N"){
				if(++count > 1){
					j.setFieldError(allInputTags[i].name,'Where there is more than one Self occupied House property(SOP) , one of them shall be treated as SOP and all other House properties shall be deemed to be let out');
					break;
				}
			}
		}
	}
}
function checkQDRawMatMandatory(tableId1,tableId2){
	try{
	var tab = document.getElementById(tableId1);
	var allInputTags = tab.getElementsByTagName('input');

	var tabFin = document.getElementById(tableId2);
	var allInputTagsFin = tabFin.getElementsByTagName('input');

	var rawMatCheck=false;
	var finGoodsCheck=false;

	var allInputTagsSelect = tab.getElementsByTagName('select');
	var allInputTagsSelectFin = tabFin.getElementsByTagName('select');

	if(tableId1=='scheduleQDRaw'){

		for(var i=0;i<allInputTags.length;i++ ){

		if(allInputTags[i].value !='' && !rawMatCheck && allInputTags[i].type !='checkbox' && allInputTags[i].type !='hidden'){

			rawMatCheck=true;
			break;

		}
		}

		for(var i=0;i<allInputTagsSelect.length;i++ ){
			if( allInputTagsSelect[i].value !='' && !rawMatCheck){
				rawMatCheck=true;
				break;

			}
			}

	}

	if(tableId2=='scheduleQDFin'){

		for(var i=0;i<allInputTagsFin.length;i++ ){
		if(allInputTagsFin[i].value !='' && !finGoodsCheck && allInputTagsFin[i].type !='checkbox' && allInputTagsFin[i].type !='hidden'){
			finGoodsCheck=true;
			break;
			}
		}


		for(var i=0;i<allInputTagsSelectFin.length;i++ ){
			if(allInputTagsSelectFin[i].value !='' && !finGoodsCheck ){
				finGoodsCheck=true;

				break;
			}
			}

	}

	if(rawMatCheck && !finGoodsCheck){

		addErrorXHTML('','At least one entry is required in Finished goods in the sheet Quantitative Details');
		j.setFieldError('partaqd.manfactrConcern.finishrByProd.quantitDet[0].itemName','At least one entry is required in Finished goods in the sheet Quantitative Details');
	}

	if(!rawMatCheck && finGoodsCheck){

		addErrorXHTML('','At least one entry is required in Raw Materials in the sheet Quantitative Details');
		j.setFieldError('partaqd.manfactrConcern.rawMaterial.quantitDet[0].itemName','At least one entry is required in Raw Materials in the sheet Quantitative Details');

	}
	}catch(e){
		alert('errorrrrr checkQDRawMatMandatory: ' +e);
	}
}
function totAmtOfSchedFSIFor6(tableId){

	var tab = document.getElementById(tableId);
	var allInputTags = tab.getElementsByTagName('input');
	var totIncFromHPPartBTIA = parseInt('0' ,10);
	var totIncBusinessPartBTIB = parseInt('0' ,10);
	var totIncCapGainPartBTIC = parseInt('0' ,10);
	var totIncOthSrcPartBTID = parseInt('0' ,10);
	var totalAmtCountryWise = parseInt('0' ,10);
	var totalCountryWise = parseInt('0' ,10);
	var totalIncomeOutIndiaWoDTAA = document.getElementsByName('itrScheduleFSI.totalIncomeOutIndiaWoDTAA')[0]; totalIncomeOutIndiaWoDTAA.value = coalesce(totalIncomeOutIndiaWoDTAA.value);

		for(var i = 0; i < allInputTags.length; i++) {

			if (allInputTags[i].name.match("incFromHPPartBTIA$")) {
				totIncFromHPPartBTIA = eval ( parseInt(totIncFromHPPartBTIA ,10) + parseInt( coalesce(allInputTags[i].value) ,10) );
				totIncBusinessPartBTIB = eval ( parseInt(totIncBusinessPartBTIB ,10) + parseInt( coalesce(allInputTags[i+1].value) ,10));
				totIncCapGainPartBTIC = eval ( parseInt(totIncCapGainPartBTIC ,10) + parseInt( coalesce(allInputTags[i+2].value) ,10) );
				totIncOthSrcPartBTID = eval ( parseInt(totIncOthSrcPartBTID ,10) + parseInt( coalesce(allInputTags[i+3].value) ,10) );
				if(allInputTags[i].value=='' && allInputTags[i+1].value=='' && allInputTags[i+2].value=='' && allInputTags[i+3].value==''){
					allInputTags[i+4].value = '';
				}else{
					allInputTags[i+4].value=eval(parseInt( coalesce(allInputTags[i].value) ,10)+ parseInt( coalesce(allInputTags[i+1].value)) + parseInt( coalesce(allInputTags[i+2].value)) + parseInt( coalesce(allInputTags[i+3].value)));
				}
				totalAmtCountryWise = eval ( parseInt(totalAmtCountryWise ,10) + parseInt( coalesce(allInputTags[i+4].value) ,10) );
			}
		}

		document.getElementsByName('itrScheduleFSI.totIncFromHPPartBTIA')[0].value=totIncFromHPPartBTIA;
		document.getElementsByName('itrScheduleFSI.totIncBusinessPartBTIB')[0].value=totIncBusinessPartBTIB;
		document.getElementsByName('itrScheduleFSI.totIncCapGainPartBTIC')[0].value=totIncCapGainPartBTIC;
		document.getElementsByName('itrScheduleFSI.totIncOthSrcPartBTID')[0].value=totIncOthSrcPartBTID;
		document.getElementsByName('itrScheduleFSI.totalAmtCountryWise')[0].value=totalAmtCountryWise;
        document.getElementsByName('itrScheduleFSI.totalIncomeOutIndia')[0].value=totalAmtCountryWise;
		var totalIncomeOutIndiaWoDTAATemp = eval(totalAmtCountryWise)-eval(parseInt(coalesce(document.getElementsByName('itrScheduleFSI.totalIncomeOutIndiaDTAA')[0].value ,10)));

		if( parseInt(totalIncomeOutIndiaWoDTAATemp ,10) >0 ){
			totalIncomeOutIndiaWoDTAA.value = totalIncomeOutIndiaWoDTAATemp;
		}else{
			totalIncomeOutIndiaWoDTAA.value = parseInt(0,10);
		}


}

function convertPercentToDecimal(element){

	var fieldName=element.name;
	var fieldVal=element.value;
	if(fieldVal.indexOf('%') !='-1'){
		fieldVal=fieldVal.substring(0,fieldVal.indexOf('%'));
		fieldVal=Math.round(fieldVal);
		element.value=fieldVal/100;

	}

}

function populatePincode(state,pin){
	var stateId = document.getElementsByName(state)[0];
	var pinCode = document.getElementsByName(pin)[0];

	if(stateId.value != '99' && stateId.value != '-1'){
		pinCode.value='';
	}else if(stateId.value == '99'){
		pinCode.value='999999';
	}
}


function calTotalEI(){

			document.getElementsByName('scheduleEI.totalExemptInc')[0].value=eval(parseInt(coalesce(document.getElementsByName('scheduleEI.interestInc')[0].value ,10)))+
			eval(parseInt(coalesce(document.getElementsByName('scheduleEI.dividendInc')[0].value) ,10))+
			eval(parseInt(coalesce(document.getElementsByName('scheduleEI.ltcgWhereSTTPaid')[0].value) ,10))+
			eval(parseInt(coalesce(document.getElementsByName('scheduleEI.netAgriIncOrOthrIncRule7')[0].value) ,10))+
			eval(parseInt(coalesce(document.getElementsByName('scheduleEI.others')[0].value) ,10));


	}

//To calculate NetAgricultureIncomeforEI
function calculateNetAgricultureIncomeforEI() {
	var grossAgriReceipt7B8 = document
			.getElementsByName('scheduleEI.grossAgriReceipt7B8')[0].value;
	var expendAgriculture = document
			.getElementsByName('scheduleEI.expendAgriculture')[0].value;
	var expendAgricultureUnabsorbed = document
			.getElementsByName('scheduleEI.expendAgricultureUnabsorbed')[0].value;

	var result = zeroOrMore(zeroOrMore(grossAgriReceipt7B8)
			- zeroOrMore(expendAgriculture)
			- zeroOrMore(expendAgricultureUnabsorbed));
	document.getElementsByName('scheduleEI.netAgriIncOrOthrIncRule7')[0].value = result;
}

function copySourceDestn(source,destination){

	document.getElementsByName(destination)[0].value=document.getElementsByName(source)[0].value;
}

function calculateTiTti(cgosIncome) {
	var varDate = document.getElementsByName('verification.date')[0];
	if(varDate.value=='' || varDate.value==undefined || varDate.value== null){
		var dt = new Date();
		varDate.value= ("00" + dt.getDate()).slice(-2) + '/' + ("00" + (dt.getMonth()+1)).slice(-2)+ '/' + dt.getFullYear() ;
	}

	calculatePartBTTI_first(cgosIncome);


}

function coalesce(value){
		if (isNaN(value) || value=='') {
			value = 0;
		}
		return value;
	}

function zeroOrMore(val){
		val = coalesce(val);
		if(val < 0){
			return 0;
		}
		return val;
	}

function rndOffNrsTen(newVar){

            if(  parseInt(newVar.toString().charAt(newVar.toString().length-1),10) >= parseInt('5',10)){
                    newVar = eval(Math.floor(eval(parseInt(newVar,10) / parseInt('10',10))) * parseInt('10',10));
                    newVar = eval(parseInt(newVar,10) + parseInt('10',10));

                    return newVar;
            }else{
                    newVar = eval(Math.floor(eval(parseInt(newVar,10) / parseInt('10',10))) * parseInt('10',10));

                    return newVar;
            }

        }
function revisedSetFor6OnLoad(section,type){

    var fileSec=document.getElementsByName(section)[0].value;
    var fileType=document.getElementsByName(type)[0];

	if(fileSec=='17' && fileType.value!='R'){
		document.getElementsByName(type)[0].value='R';

		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;

		document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].value='';
		document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=true;

       }
	   else if(fileSec=='19'){
	   document.getElementsByName(type)[0].value='O';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;

	   }
	   else if(fileSec=='18'){
	   document.getElementsByName(type)[0].value='O';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;

	   }
       else if(fileSec !='17' || fileType.value!='R'){
		   document.getElementsByName(type)[0].value='O';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=true;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=true;
       }
           if(fileSec=='18') {
               document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=false;
				document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
				document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;
           } else {
               document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].value='';
               document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=true;

               document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].disabled=true;


           }
		   if(fileSec=='13' || fileSec=='14' || fileSec=='15' || fileSec=='16' || fileSec=='18' || fileSec=='19'){
		      enableField('partAGEN1.filingStatus.returnFileSec.incomeTaxSec',fileSec,
		'partAGEN1.filingStatus.returnFileSec.noticeDate'
		);

		   }
}

function revisedSetFor6(section, type) {
	try{
	var fileSec=document.getElementsByName(section)[0].value;
	    var fileType=document.getElementsByName(type)[0];

		if(fileSec=='17' && fileType.value!='R'){

			document.getElementsByName(type)[0].value='R';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;

			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=true;

	       } else if(fileSec=='19'){
	         document.getElementsByName(type)[0].value='O';
		     document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].disabled=false;

	       }else if(fileSec=='18'){
	         document.getElementsByName(type)[0].value='O';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=false;

	       }else if(fileSec !='17' || fileType.value!='R'){
			document.getElementsByName(type)[0].value='O';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=true;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=true;
	       }

			if(fileSec == '20')
	    	   {
	    	   document.getElementsByName(type)[0].value='O';
				document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=true;
				document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=true;
				document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].value='';
				document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].disabled=true;
				document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=true;
	    	   }

	       if(fileSec=='18') {
	         document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;
	       }else{
	               document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].value='';
	               document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=true;
	       }
	       if(fileSec=='13' || fileSec=='14' || fileSec=='15' || fileSec=='16' || fileSec=='18' || fileSec=='19'){
			enableField('partAGEN1.filingStatus.returnFileSec.incomeTaxSec',fileSec,'partAGEN1.filingStatus.returnFileSec.noticeDate');
	       }else if(fileSec=='11' || fileSec=='12' || fileSec=='17' || fileSec==''){
			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].value='';
	                document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].disabled=true;
	       }
	       if(fileSec=='11' || fileSec=='12' || fileSec=='13' || fileSec=='14' || fileSec=='15' || fileSec=='16'){
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value='';
			document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].value='';
	                document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=true;
			document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=true;
			document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=true;
	      }
	}catch(e){
		alert('error in revisedset 6:'+e);
	}
}

function sectionSetFor6(section,type){
  var fileSec = document.getElementsByName(section)[0];
  var fileType=document.getElementsByName(type)[0].value;

      if(fileType=='R' && fileSec.value!=17){
          fileSec.value='17';
      }
      else {
          fileSec.value='';
      }

      if(fileType=='R') {
          document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=false;
          document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=false;
          document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].readOnly=false;
          document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].readOnly=false;
          document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].value='';
          document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeNo")[0].disabled=true;
          document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].value='';
          document.getElementsByName("partAGEN1.filingStatus.returnFileSec.noticeDate")[0].disabled=true;

      } else {
          document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value='';
          document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value='';
          document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled=true;
          document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled=true;
          document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].readOnly=true;
          document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].readOnly=true;

      }
}

function disHoldComp(){

		var i=document.getElementsByName('partAGEN2For6.natOfCompFlg')[0].value;

		$('#natOfComSubBoth').find(':input').prop('disabled', true);
		$('#natOfComSubBoth').find('.addbtn').prop('hidden', true);
		$('#natOfComHoldBoth').find(':input').prop('disabled', true);
		$('#natOfComHoldBoth').find('.addbtn').prop('hidden', true);

		if(i=='2' || i== '3'){
				$('#natOfComSubBoth').find('.addbtn').prop('hidden', false);
				$('#natOfComSubBoth').find(':input').prop('disabled', false);
			}else{
				$('#natOfComSubBoth').find('[type=\"checkbox\"]').attr('checked','checked');
				deleteRowTable('natOfComSubBoth',2,1);
				$('#natOfComSubBoth').find(':input').prop('disabled', true);
				$('#natOfComSubBoth').find('.addbtn').prop('hidden', true);
			}

		if(i=='1' || i== '3'){
				$('#natOfComHoldBoth').find('.addbtn').prop('hidden', false);
				$('#natOfComHoldBoth').find(':input').prop('disabled', false);
			}else{
				$('#natOfComHoldBoth').find('[type=\"checkbox\"]').attr('checked','checked');
				deleteRowTable('natOfComHoldBoth',2,1);
				$('#natOfComHoldBoth').find(':input').prop('disabled', true);
				$('#natOfComHoldBoth').find('.addbtn').prop('hidden', true);
			}

		 }


function totAmtOfSchedTRFor6(tableId){

	 var table=document.getElementById('scheduleTR');
	    var noOfRows=table.rows.length;
	    var totTaxPaidOutsideInd = parseInt('0' ,10);
		var totReliefAvailable = parseInt('0' ,10);
		var totReliefAvailable9090A = parseInt('0' ,10);
		var totReliefAvailable91 = parseInt('0' ,10);

	    for(var i=0;i<eval(parseInt(noOfRows,10)-4);i++){
	        if(document.getElementsByName('scheduleTR1.scheduleTR['+i+'].relavantArticleDTAA')[0].value=='91'){
	        	totReliefAvailable91=eval(totReliefAvailable91+ parseInt(coalesce(document.getElementsByName('scheduleTR1.scheduleTR['+i+'].taxReliefOutsideIndia')[0].value),10));

	        } else if(document.getElementsByName('scheduleTR1.scheduleTR['+i+'].relavantArticleDTAA')[0].value=='90' ||
		        document.getElementsByName('scheduleTR1.scheduleTR['+i+'].relavantArticleDTAA')[0].value=='90A'){
	        	totReliefAvailable9090A=eval(totReliefAvailable9090A+parseInt(coalesce(document.getElementsByName('scheduleTR1.scheduleTR['+i+'].taxReliefOutsideIndia')[0].value),10));
	        }

	        totTaxPaidOutsideInd = eval(parseInt(totTaxPaidOutsideInd,10) + parseInt(coalesce(document.getElementsByName('scheduleTR1.scheduleTR['+i+'].taxPaidOutsideIndia')[0].value,10)));
	        totReliefAvailable = eval(parseInt(totReliefAvailable,10) + parseInt(coalesce(document.getElementsByName('scheduleTR1.scheduleTR['+i+'].taxReliefOutsideIndia')[0].value,10)));

	    }

	    document.getElementsByName('scheduleTR1.totalIncomeOutIndia')[0].value = totReliefAvailable9090A;
	    document.getElementsByName('scheduleTR1.totalIncomeOutIndiaDTAA')[0].value = totReliefAvailable91;
	    document.getElementsByName('scheduleTR1.totTaxPaidDeclaredInFSI')[0].value = totTaxPaidOutsideInd;
	    document.getElementsByName('scheduleTR1.totReliefClaimUs9090A')[0].value = totReliefAvailable;

}



function addRowSchedFSIFor2(nocheck){

	var mainTable=document.getElementById('scheduleFSI').rows;
	var noOfRows=mainTable.length;

	var tobeInsertBefore=document.getElementById('scheduleFSIAddRow');
	var flag=true;
	var checkFirst=true;
	var totRow=document.getElementById('scheduleFSIFirst').cells[0].textContent;

	var iterate=eval(parseInt(totRow,10));

	var indexValue=eval(((parseInt(noOfRows,10)-4)/5)+1);

	var isRowBlank = true;
	for(var i=0;i<6;i++){
		if(!checkRowBlank('scheduleFSI', (3+i), 0)){
			isRowBlank = false;
			break;
		}
	}

	if(!isRowBlank || nocheck){

	for(var i=2;i<mainTable.length;i++){
	var cloneNode=mainTable[i].cloneNode(true);
        if(flag){
		var cellsTot=cloneNode.cells;
		var newVal=eval(parseInt(totRow)+1);
		if(checkFirst){
		iterate=eval(indexValue-1);

		cloneNode.cells[0].innerHTML=indexValue;
		checkFirst=false;
		}

                //Numbering
		var inputTags=cloneNode.getElementsByTagName('input');
		for(var a=0;a<inputTags.length;a++){
			inputTags[a].name=inputTags[a].name.replace('[0]','['+iterate+']');

                        inputTags[a].id=inputTags[a].name.replace(/([\.\[\]])/g,'_').replace(/(__)/g,'_');
                        inputTags[a].value='';
                        var blurAttr=inputTags[a].getAttribute('onblur');
            			if(blurAttr!=null){
            				blurAttr=blurAttr+";";
            			}else{
            				blurAttr="";
            			}
            			inputTags[a].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
		}

		var selectTags=cloneNode.getElementsByTagName('select');
		for(var a=0;a<selectTags.length;a++){
			selectTags[a].name=selectTags[a].name.replace('[0]','['+iterate+']');
			selectTags[a].value='';

                        selectTags[a].id=selectTags[a].name.replace(/([\.\[\]])/g,'_').replace(/(__)/g,'_');

                        var blurAttr=selectTags[a].getAttribute('onblur');
            			if(blurAttr!=null){
            				blurAttr=blurAttr+";";
            			}else{
            				blurAttr="";
            			}
            			selectTags[a].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
		}



		document.getElementById('scheduleFSI').getElementsByTagName('tr')[0].parentNode.insertBefore(cloneNode,tobeInsertBefore);
            }
            if(mainTable[i].id =='scheduleFSIEnd'){
		flag=false;
		break;
		}
        }
	if($('#scheduleFSIAddRow')[0].parentNode.children.length==10){
		$('#delFSIButtonId').prop('disabled', true);
	}else if($('#scheduleFSIAddRow')[0].parentNode.children.length>10){
		$('#delFSIButtonId').prop('disabled', false);
	}
	checkMaxLengthLimit();
	}else{
		addErrorXHTML('', 'Please fill in all the mandatory fields in the last row before adding another row.');
	}

}


function zeroOrLess(val){
	if(parseInt(val, 10) > 0 ){
		return 0;
	}
	return parseInt(val, 10);
}
function addRowToCG(tableId){
	var tab = document.getElementById(tableId);
	var body = tab.tBodies[0];
	var clone = body.cloneNode(true);
	var index = parseInt(tab.tBodies.length,10) + 1;
	clone.rows[0].cells[0].innerHTML = index;
	var inputs = clone.getElementsByTagName('INPUT');
	for(var i=0;i<inputs.length;i++){
		inputs[i].name = inputs[i].name.replace(/\[[\d]+\]/, '[' + (index-1) + ']');
		inputs[i].value = '';
		var blurAttr=inputs[i].getAttribute('onblur');
		if(blurAttr!=null){
			blurAttr=blurAttr+";";
		}else{
			blurAttr="";
		}
		inputs[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
	}
	var selects = clone.getElementsByTagName('SELECT');
	for(var i=0;i<selects.length;i++){
		selects[i].name = selects[i].name.replace(/\[[\d]+\]/, '[' + (index-1) + ']');
		selects[i].selectedIndex = 0;
		var blurAttr=selects[i].getAttribute('onblur');
		if(blurAttr!=null){
			blurAttr=blurAttr+";";
		}else{
			blurAttr="";
		}
		selects[i].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
	}

	if(clone.getElementsByTagName('table').length>0){
		clone.getElementsByTagName('table')[0].setAttribute('id',tableId+'_ded'+index);
		clone.getElementsByTagName('img')[0].setAttribute('onclick','addRowToTable('+'\''+tableId+'_ded'+index+'\',3,2,this);');
		clone.getElementsByTagName('img')[1].setAttribute('onclick','deleteRowTable('+'\''+tableId+'_ded'+index+'\',1,2)');
	}
	tab.appendChild(clone);
	modifyRow(tab);

	if(clone.getElementsByTagName('table').length>0){
		$('#'+tableId+'_ded'+index+' input').attr("checked" , true);
	    deleteRowTable(tableId+'_ded'+index,1,2);
		$('#'+tableId+'_ded'+index+' input').attr("checked" , false);
	}
}

function deleteRowToCG(tableId){
	var tab = document.getElementById(tableId);
	var len = tab.tBodies.length;
	if(len>1){
		tab.removeChild(tab.tBodies[len-1]);
	}
	modifyRow(tab);
}





function calcSchCG(cgosIncome){
	try{

		calculateSTCG(cgosIncome);
		calculateLTCG(cgosIncome);

		var totScheduleCGPost45 = document.getElementsByName('scheduleCGPost45.totScheduleCGPost45')[0];
		totScheduleCGPost45.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.totalSTCG') +
										 parseInt(zeroOrMore(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.totalLTCG'))));

		/*calculateCGDeductions();*/

		doCGSetOff(cgosIncome);


	}catch(e){
		alert('error in calcSchCG=' + e.stack);
	}
}

function calcSchCGLtcgStcg(){

	try{

	var stcg15Per = coalesceSetRet("scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
	var shortTermUnder15Per = 		coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of6") +
		coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of9") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of9To15Of12") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of12To15Of3") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of3To31Of3");

	var stcgAppRate = coalesceSetRet("scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrAfterSetOffBFLosses");
	var shortTermUnderAppRate = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of6") +
		coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of9") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of9To15Of12") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of12To15Of3") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of3To31Of3");

	var stcg30Per = coalesceSetRet("scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
	var shortTermUnder30Per = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of6") +
		coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of9") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of9To15Of12") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of12To15Of3") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of3To31Of3") ;

	var ltcg10Per = coalesceSetRet("scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
	var longTermUnder10Per = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of6") +
		coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of9") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of9To15Of12") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of12To15Of3") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of3To31Of3") ;

	var ltcg20Per = coalesceSetRet("scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
	var longTermUnder20Per = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of6") +
		coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of9") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of9To15Of12") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of12To15Of3") +
								coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of3To31Of3") ;

	// check for STCG
	if(stcg15Per > shortTermUnder15Per) {
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of6','Total of Quarterly breakup in STCG 15% is less by ' + (stcg15Per-shortTermUnder15Per));
		addErrorXHTML('',"Total of Quarterly breakup in STCG 111A is less by " + (stcg15Per-shortTermUnder15Per));
		}
	if(stcg15Per < shortTermUnder15Per) {
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of6','Total of Quarterly breakup in STCG 15% is more by ' + Math.abs(stcg15Per-shortTermUnder15Per));
		addErrorXHTML('',"Total of Quarterly breakup in STCG 111A is more by " + Math.abs(stcg15Per-shortTermUnder15Per));
		}

	if(stcgAppRate > shortTermUnderAppRate) {
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of6','Total of Quarterly breakup in STCG Applicable Rates is less by ' + (stcgAppRate-shortTermUnderAppRate));
		addErrorXHTML('',"Total of Quarterly breakup in STCG Others is less by " + (stcgAppRate-shortTermUnderAppRate));
	}
	if(stcgAppRate < shortTermUnderAppRate) {
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of6','Total of Quarterly breakup in STCG Applicable Rates is more by ' + Math.abs(stcgAppRate-shortTermUnderAppRate));
		addErrorXHTML('',"Total of Quarterly breakup in STCG Others is more by " + Math.abs(stcgAppRate-shortTermUnderAppRate));
	}
	if(stcg30Per > shortTermUnder30Per) {
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of6', 'Total of Quarterly breakup in STCG 30% is less by ' + (stcg30Per-shortTermUnder30Per));
		addErrorXHTML('',"Total of Quarterly breakup in LTCG Proviso is less by " + (stcg30Per-shortTermUnder30Per));
	}
	if(stcg30Per < shortTermUnder30Per) {
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of6', 'Total of Quarterly breakup in STCG 30% is more by ' + Math.abs(stcg30Per-shortTermUnder30Per));
		addErrorXHTML('',"Total of Quarterly breakup in LTCG Proviso is more by " + Math.abs(stcg30Per-shortTermUnder30Per));
	}

	// check for LTCG

	if(ltcg10Per > longTermUnder10Per)	{
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of6','Total of Quarterly breakup in LTCG 10% is less by ' + (ltcg10Per-longTermUnder10Per));
		addErrorXHTML('',"Total of Quarterly breakup in LTCG Non Proviso is less by " + (ltcg10Per-longTermUnder10Per));
	}

	if(ltcg10Per < longTermUnder10Per)	{
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of6','Total of Quarterly breakup in LTCG 10% is more by ' + Math.abs(ltcg10Per-longTermUnder10Per));
		addErrorXHTML('',"Total of Quarterly breakup in LTCG Non Proviso is more by " + Math.abs(ltcg10Per-longTermUnder10Per));
	}

	if(ltcg20Per > longTermUnder20Per)	{
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of6','Total of Quarterly breakup in LTCG 20% is less by ' + (ltcg20Per-longTermUnder20Per));
		addErrorXHTML('',"Total of Quarterly breakup in LTCG Non Proviso is less by " + (ltcg20Per-longTermUnder20Per));
	}

	if(ltcg20Per < longTermUnder20Per)	{
		j.setFieldError('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of6','Total of Quarterly breakup in LTCG 20% is more by ' + Math.abs(ltcg20Per-longTermUnder20Per));
		addErrorXHTML('',"Total of Quarterly breakup in LTCG Non Proviso is more by " + Math.abs(ltcg20Per-longTermUnder20Per));
	}

	var fullConsideration = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration')[0];
	var propertyValuation = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.propertyValuation')[0];
	var fullConsideration50C = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];

	if(fullConsideration50C.value!=fullConsideration.value && fullConsideration50C.value!=propertyValuation.value){
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C',"Please enter value from 'ai' or 'aii' only");
		addErrorXHTML(fullConsideration50C ,"Please enter value from 'ai' or 'aii' only");
	}

	fullConsideration = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration')[0];
	propertyValuation = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.propertyValuation')[0];
	fullConsideration50C = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];

	if(fullConsideration50C.value!=fullConsideration.value && fullConsideration50C.value!=propertyValuation.value){
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C',"Please enter value from 'ai' or 'aii' only");
		addErrorXHTML(fullConsideration50C ,"Please enter value from 'ai' or 'aii' only");
	}

	var balanceCG = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.BalanceCG')[0];


	var tab = document.getElementById('stcg10pctTab');
	var selects = tab.getElementsByTagName('SELECT');
	var count = {"21ciii": 0,"5AC1c": 0,"5ADiii": 0,"5ACA1b": 0};
	for(var i=0;i<selects.length;i++){
		count[selects[i].value] = count[selects[i].value]+1;
		if(count[selects[i].value] > 1){
			j.setFieldError(selects[i].name,' A particular drop down cannot be selected twice');
			addErrorXHTML(selects[i] ," A particular drop down cannot be selected twice");
			break;
		}
	}

	dropDownSelection('ltcgDeduction54ec54ee1');
	dropDownSelection('ltcgDeduction54ec54ee2');
	dropDownSelection('ltcgDeduction54ec54ee4');

	}catch(e){
		alert('error in calcSchCGLtcgStcg=' + e.stack);
	}
}

function dropDownSelection(tabName){
	var tab = document.getElementById(tabName);
	var selects = tab.getElementsByTagName('SELECT');
	var count = {"54EE": 0,"54EC": 0};
	for(var i=0;i<selects.length;i++){
		count[selects[i].value] = count[selects[i].value]+1;
		if(count[selects[i].value] > 1){
			j.setFieldError(selects[i].name,' A particular drop down cannot be selected twice');
			addErrorXHTML(selects[i] ," A particular drop down cannot be selected twice");
			break;
		}
	}
}

function calculateOS(cgosIncome){

	var simap = initMapForSI(cgosIncome);
	calculateOSIntstTotal();
	var othersGross = document.getElementsByName('scheduleOS.othersGross')[0];
	othersGross.value = calculateOSGross(simap);
	validateSchOSDTAA1a1b();
	var totalOSGross = document.getElementsByName('scheduleOS.totalOSGross')[0];
	totalOSGross.value = eval(
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.dividendGross'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.interestGross'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.rentFromMachPlantBldgs'),10)
			+ parseInt(coalesceSetRet('scheduleOS.othersGross'),10)
		);
	var totAmtUnderDtaa = document
	.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa.totAmtUnderDtaa')[0];
totAmtUnderDtaa.value = addCGDeductions('scheduleOsNriIncTaxDtaa');

	var totalOSGrossChargblSplRate = document.getElementsByName('scheduleOS.incChargblSplRateOS.totalOSGrossChargblSplRate')[0];
	//parseInt(totalOSGrossChargblSplRate.value,10);
	totalOSGrossChargblSplRate.value = eval(
			parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.winningFrmLotteries'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBF'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBG'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.secXIIOth'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa.totAmtUnderDtaa'),10)
		);

	var grossAmtChargblNormalRate = document.getElementsByName('scheduleOS.grossAmtChargblNormalRate')[0];
	grossAmtChargblNormalRate.value = eval(
			parseInt(totalOSGross.value,10)
			- parseInt(totalOSGrossChargblSplRate.value,10)
		);

	var totDeductions = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.deductions.totDeductions')[0];
	totDeductions.value = eval(
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.deductions.expenses'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.deductions.depreciation'),10)
		);

	var balanceNoRaceHorse = document.getElementsByName('scheduleOS.balanceNoRaceHorse')[0];
    var amtNotDeductibleUs58 = document.getElementsByName('scheduleOS.amtNotDeductibleUs58')[0];
	var profitChargTaxUs59 = document.getElementsByName('scheduleOS.profitChargTaxUs59')[0];
	balanceNoRaceHorse.value = eval(
			parseInt(grossAmtChargblNormalRate.value,10)
			- parseInt(totDeductions.value,10)+ parseInt(zeroOrMore(parseInt(amtNotDeductibleUs58.value,10)))
			+ parseInt(zeroOrMore(parseInt(profitChargTaxUs59.value,10)))
		);

	var totOthSrcNoRaceHorse = document.getElementsByName('scheduleOS.winLottRacePuzz')[0];
	var IncmOthrSrc = document.getElementsByName('scheduleOS.balanceNoRaceHorse')[0];

	totOthSrcNoRaceHorse.value = eval(
			parseInt(totalOSGrossChargblSplRate.value,10)
			+ parseInt(zeroOrMore(parseInt(IncmOthrSrc.value,10)))
		);

	var balanceOwnRaceHorse = document.getElementsByName('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse')[0];
	balanceOwnRaceHorse.value = eval(
			parseInt(coalesceSetRet('scheduleOS.incFromOwnHorse.receipts'),10)
			- parseInt(coalesceSetRet('scheduleOS.incFromOwnHorse.deductSec57'),10) +
			 parseInt(coalesceSetRet('scheduleOS.incFromOwnHorse.amtNotDeductibleUs58'),10) +
			 parseInt(coalesceSetRet('scheduleOS.incFromOwnHorse.profitChargTaxUs59'),10)
		);

	var incChargeable = document.getElementsByName('scheduleOS.incChargeable')[0];
	incChargeable.value = eval(
			parseInt(totOthSrcNoRaceHorse.value,10)
			+ parseInt(zeroOrMore(parseInt(balanceOwnRaceHorse.value ,10)))
		);
	return simap;
}

function calculateOSIntstTotal(){

	var totalOSIntGross = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.interestGross')[0];
	totalOSIntGross.value = eval(
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.fromSavBank'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.fromTermDep'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.fromIncTaxRef'),10)
			+ parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.fromOthers'),10)
		);


}

function validateSchOSDTAA1a1b() {
	var dividendGross = parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.dividendGross')[0].value),10);
	var interestGross = parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.interestGross')[0].value),10);

	var table = document.getElementById('scheduleOsNriIncTaxDtaa');
	var rowCount = table.rows.length - 2;

	var dividendGrossTot = parseInt('0',10);
	var interestGrossTot = parseInt('0',10);

	for(var k=0; k<rowCount; k++) {
		if(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].itemIncluded')[0].value == '56i') {
			dividendGrossTot = eval(dividendGrossTot + parseInt(coalesce(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount')[0].value),10));
			if(eval(dividendGrossTot > dividendGross)) {
				if (document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount')[0].value != '') {
					document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount')[0].value = 0;
					addErrorXHTML(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount')[0],'For Dividend - The sum of amount should not exceed amount entered in 1a.',true);
					j.setFieldError('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount','For Dividend - The sum of amount should not exceed amount entered in 1a.');
				}
			}
		} else if (document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].itemIncluded')[0].value == '56') {
			interestGrossTot = eval(interestGrossTot + parseInt(coalesce(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount')[0].value),10));
			if(eval(interestGrossTot > interestGross)) {
				if (document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount')[0].value != '') {
					document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount')[0].value = 0;
					addErrorXHTML(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount')[0],'For Interest - The sum of amount should not exceed amount entered in 1b.',true);
					j.setFieldError('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ k + '].amount','For Interest - The sum of amount should not exceed amount entered in 1b.');
				}
			}
		}
	}

}

function calculateOSGross(simap){

	var total = parseInt('0' ,10);

	try{
	var tabl = document.getElementById('schduleOsf');
	var allInputTags = tabl.getElementsByTagName('input');

	var v115BBDAsec = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0];
	v115BBDAsec.value=0;
	var v115BBFsec = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0];
	v115BBFsec.value=0;
	var v115BBEsec = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBE')[0];
	v115BBEsec.value=0;
	var v115BBGsec = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBG')[0];
	v115BBGsec.value=0;
	var winningFrmLotteries = document.getElementsByName('scheduleOS.incChargblSplRateOS.winningFrmLotteries')[0];
	winningFrmLotteries.value=0;


	var dropDownBBDA = parseInt(0,10);
	var dropDownBBF = parseInt(0,10);
	var dropDownBBE = parseInt(0,10);
	var dropDownBBG = parseInt(0,10);
	var dropDownBB = parseInt(0,10);


	/*var temp=eval(parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[7].sourceAmount')[0].value),10));*/
	var temp=eval(parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[7].sourceAmount')[0].value),10));
	//+	eval(parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[13].sourceAmount')[0].value),10));

	var tempTotal=parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[13].sourceAmount')[0].value),10);

	for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("sourceAmount$")) {

					total = eval(parseInt(total ,10) + parseInt(isNVL(allInputTags[i].value) ,10));
			}
		}

	total=eval(parseInt(total ,10)- parseInt(temp ,10) - parseInt(tempTotal ,10) );
	var allSelects = tabl.getElementsByTagName('SELECT');

	var table = document.getElementById('scheduleOsNriIncTaxDtaa');
	var rowCount = table.rows.length - 2;
	var arr = {'5A1ai':0,'5A1aii':0,'5A1aiia':0,'5A1aiiaa':0,'5A1aiiab':0,'5A1aiiac':0,'5A1aiii':0,'5A1bA':0,'5A1bB':0,'5AC1ab':0,'5BBA':0};
	var sum = 0;

	for(var i = 0; i < allSelects.length; i++) {
			var name = allSelects[i].name;
			var index = name.substring(name.indexOf('[')+1, name.indexOf(']'));

			if(allSelects[i].value=='Others'){
				document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].style.display='';
			}
			else{
				simap[allSelects[i].value] = coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ i +'].sourceAmount')[0].value);
				document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].style.display='none';
				document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].value='';


				if(allSelects[i].value=='5BB'){

					winningFrmLotteries.value = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].sourceAmount')[0].value;

				}

				if(allSelects[i].value=='5BBE'){

					v115BBEsec.value = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].sourceAmount')[0].value;

				}

				if(allSelects[i].value=='5BBF'){

					v115BBFsec.value = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].sourceAmount')[0].value;

				}

				if(allSelects[i].value=='5BBG'){

					v115BBGsec.value = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].sourceAmount')[0].value;

				}

				if(allSelects[i].value =='5BBDA'){

					v115BBDAsec.value = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].sourceAmount')[0].value;

				}
				 if(allSelects[i].value != 'DTAA'){
					var temp=eval(parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[7].sourceAmount')[0].value),10));
					sum = parseInt(sum) + parseInt(coalesce(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].sourceAmount')[0].value));

					for(var k=0; k<rowCount; k++) {
						if(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].itemIncluded')[0].value == allSelects[i].value) {
							arr[allSelects[i].value] = eval(parseInt(coalesce(arr[allSelects[i].value])) +
									parseInt(coalesce(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount')[0].value)));

							if(arr[allSelects[i].value] > parseInt(coalesce(document.getElementsByName('scheduleOS.totalOSGross')[0].value))) {

								if(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount')[0].value != '') {
									document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount')[0].value = 0;
									addErrorXHTML(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount')[0]  ,'The sum of amount should not exceed amount entered in 1e.',true);
									j.setFieldError('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount','The sum of amount should not exceed amount entered in 1e.');
								}
							} else {

								sum -=  document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].amount')[0].value;
							}
					}
				}
					simap[allSelects[i].value] -= parseInt(coalesce(arr[allSelects[i].value]),10);
			}
		}
	}

	for (var j = 0; j < rowCount; j++) {

		var dropDownOS  = document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
				+ j + '].itemIncluded')[0].value;

		var amountofSum = document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
				+ j + '].amount')[0].value;

		if(dropDownOS == '5BBDA')
		{
			dropDownBBDA = coalesce(eval(parseInt(dropDownBBDA) + parseInt(amountofSum)));
		}

		if(dropDownOS == '5BBF')
		{
			dropDownBBF = coalesce(eval(parseInt(dropDownBBF) + parseInt(amountofSum)));
		}
		if(dropDownOS == '5BBE')
		{
			dropDownBBE = coalesce(eval(parseInt(dropDownBBE) + parseInt(amountofSum)));
		}
		if(dropDownOS == '5BBG')
		{
			dropDownBBG = coalesce(eval(parseInt(dropDownBBG) + parseInt(amountofSum)));
		}
		if(dropDownOS == '5BB')
		{
			dropDownBB = coalesce(eval(parseInt(dropDownBB) + parseInt(amountofSum)));
		}
	}

	var finalBBDA = parseInt(0,10);
	finalBBDA =zeroOrMore(v115BBDAsec.value - dropDownBBDA);
	document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value = finalBBDA;

	var finalBBF = parseInt(0,10);
	finalBBF = zeroOrMore(v115BBFsec.value - dropDownBBF);
	document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value = finalBBF;

	var finalBBE = parseInt(0,10);
	finalBBE = zeroOrMore(v115BBEsec.value - dropDownBBE);
	document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBE')[0].value = finalBBE;

	var finalBBG = parseInt(0,10);
	finalBBG = zeroOrMore(v115BBGsec.value - dropDownBBG);
	document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBG')[0].value = finalBBG;

	var finalBB = parseInt(0,10);
	finalBB = zeroOrMore(document.getElementsByName('scheduleOS.incChargblSplRateOS.winningFrmLotteries')[0].value - dropDownBB);
	document.getElementsByName('scheduleOS.incChargblSplRateOS.winningFrmLotteries')[0].value = finalBB;


	var temp115BB = document.getElementsByName('scheduleOS.incChargblSplRateOS.winningFrmLotteries')[0].value;

	var temp115BBDA = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value;

	var temp115BBF = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value;

	var temp115BBG = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBG')[0].value;

	var temp115BBE = document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBE')[0].value;


	var secXIIOth = document.getElementsByName('scheduleOS.incChargblSplRateOS.secXIIOth')[0];
	//secXIIOth.value = eval(sum - temp - temp115BBDA - temp115BBF - temp115BBE - temp115BBG - temp115BB);

	secXIIOth.value = eval(sum - temp - temp115BBDA - temp115BBF -  temp115BBG - temp115BBE- temp115BB - 2*tempTotal);
	} catch(e) {
		alert('Exception in calculateOSGross : '+e);
	}
	return total;
}



function setFirstToSecondMax(first,second,target){
	try{
		if(coalesceSetRet(first) > coalesceSetRet(second)){
			document.getElementsByName(target)[0].value= coalesceSetRet(second);
		}else{
			document.getElementsByName(target)[0].value= coalesceSetRet(first);
		}
	}catch(e){
		alert('error in setFirstToSecondMax= '+e.stack );
	}
}


function adjustForm(){
	try{
			enableField('partAGEN2.liableSec44ABflg','Y',
			'partAGEN2.auditedByAccountantFlg',
			'scheduleVIA.usrDeductUndChapVIA.section80JJAA'
			);
			enableField('partAGEN2.liableSec92Eflg','Y',
						'partAGEN2.sec92Edate'
					);
			enableField('partAGEN2.auditedByAccountantFlg','Y',
			'partAGEN2.auditInfo.auditReportFurnishDate',
			'partAGEN2.auditInfo.auditorName',
			'partAGEN2.auditInfo.audFrmRegNo',
			'partAGEN2.auditInfo.auditorMemNo',
			'partAGEN2.auditInfo.audFrmName',
			'partAGEN2.auditInfo.audFrmPAN',
			'partAGEN2.auditInfo.auditDate'
			);

			enableField('partAGEN1.filingStatus.residentialStatus','NRI',
			'partAGEN1.filingStatus.nripe'
			);
			enableField('partAGEN1.orgFirmInfo.statusOrCompanyType',['1','14'],
					'partAGEN1.orgFirmInfo.subStatus'
					);
			enableField('partAGEN1.filingStatus.asseseeRepFlg','Y',
			'partAGEN1.filingStatus.assesseeRep.repName',
			'partAGEN1.filingStatus.assesseeRep.repAddress',
			'partAGEN1.filingStatus.assesseeRep.repPAN'
			);

			enableField('partAGEN1.filingStatus.residentialStatus','RES',
					'partBTTI.assetOutIndiaFlag'
					);
			enableField('partAGEN1.filingStatus.residentialStatus','RES',
					'itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBF',
					'itr5ScheduleBP.businessIncOthThanSpec.expDebToPLOthHeads.underSec115BBF'
					);

			enableField('scheduleTR1.taxPaidOutsideIndFlg','YES',
					'scheduleTR1.amtTaxRefunded',
					'scheduleTR1.assmtYrTaxRelief'
					);
			enableTable('partAGEN2.prevYrMemPartChange', 'Y', 'partnerTableId');
			disableSebiRegNo('partAGEN1.filingStatus.fiiFpiFlg');
			adjustCG();
			adjustOS();
			enableField('partAGEN1.filingStatus.residentialStatus','RES',
					'itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD'
					);
			enableField('partAGEN1.orgFirmInfo.statusOrCompanyType',['1','2','9'],
					'partapl.debitsToPL.debitPlAcnt.salRemuneration'
					);
			enableField('partAGEN1.orgFirmInfo.subStatus',['15','16','17','4','5','7','10'],
					'partapl.debitsToPL.debitPlAcnt.salRemuneration'
					);
			enableField('partAGEN1.orgFirmInfo.subStatus',['4'],
					'partaoi.amtDisallUs36.expGovtApprovedSugarPrice'
					);
			enableField('partAGEN1.orgFirmInfo.subStatus',['5'],
					'scheduleVIA.usrDeductUndChapVIA.section80IAC'
					);
			enableField('partAGEN1.orgFirmInfo.subStatus',['7','13'],
					'partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare',
					'partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusInc',
					'partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill',
					'partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic',
					'partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable',
					'partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives',
					'partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf'
					);
			enableField('partAGEN1.orgFirmInfo.subStatus',['15','16','17'],
					'itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44DB'
					);
			enableField('partAGEN1.orgFirmInfo.subStatus',['15','16','17','4','5','7','8','10','11','12','13'],
					'scheduleVIA.usrDeductUndChapVIA.section80GGC'
					);
			coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD');
			coalesceSetRet('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44ADA');
			coalesceSetRet('partapl.debitsToPL.debitPlAcnt.salRemuneration');
			enableFieldsPDTAOT();

}catch(e){
	alert('Error in adjustForm:'+e);
}
}

function adjustOS() {
	var tabl = document.getElementById('schduleOsf');

	var allSelects = tabl.getElementsByTagName('SELECT');

	for(var i = 0; i < allSelects.length; i++) {
			var name = allSelects[i].name;
			var index = name.substring(name.indexOf('[')+1, name.indexOf(']'));
			if(allSelects[i].value=='Others'){
				document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].style.display='';
			} else {
				document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].style.display='none';
				document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].value='';
			}
	}
}

function adjustCG() {

	enableTable('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag','Y','scheduleStcgunUtilizedCapGain54');
	enableTable('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag','Y','scheduleLtcgunUtilizedCapGain54');
	/*enableNRItables();*/

	if(document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value=='NRI'){
		//A3
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0].readOnly=false;
		//A4
		//document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.improveCost')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.expOnTrans')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.lossSec94of7Or94of8')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0].readOnly=false;

		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdRecvUnqshr')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fairMrktValueUnqshr')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdSec50CA')[0].readOnly=true;
		document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdOthUnqshr')[0].readOnly=false;

		//B4
		document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit')[0].readOnly=false;
		document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0].readOnly=false;


		//B5
		var tab = document.getElementById('stcg10pctTab');
		var inputs = tab.getElementsByTagName('INPUT');
		var selects =  tab.getElementsByTagName('SELECT');
		for(var i=0;i<inputs.length;i++){
			if(!(inputs[i].classList.contains("readonly"))){
				inputs[i].readOnly=false;
			}
		}
		for(var i=0;i<selects.length;i++){
			if( !(selects[i].classList.contains("readonly"))){
				selects[i].disabled=false;
			}
		}


		tab = document.getElementById('ltcgDeduction54ec54ee4');
		inputs = tab.getElementsByTagName('INPUT');
		selects =  tab.getElementsByTagName('SELECT');
		for(var i=0;i<inputs.length;i++){
			if(!(inputs[i].classList.contains("readonly"))){
				inputs[i].readOnly=false;
			}
		}
		for(var i=0;i<selects.length;i++){
			if( !(selects[i].classList.contains("readonly"))){
				selects[i].disabled=false;
			}
		}

		document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0].readOnly=true;
	}else{
		//A3
		var nRItaxSTTPaid = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0];
		nRItaxSTTPaid.readOnly=true;
		nRItaxSTTPaid.value = 0;

		var nRItaxSTTNotPaid = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0];
		nRItaxSTTNotPaid.readOnly=true;
		nRItaxSTTNotPaid.value = 0;

		//A4
		//var fullConsideration = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0];
		//fullConsideration.readOnly=true;
		//fullConsideration.value = 0;
		var aquisitCost = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0];
		aquisitCost.readOnly=true;
		aquisitCost.value = 0;
		var improveCost = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.improveCost')[0];
		improveCost.readOnly=true;
		improveCost.value = 0;
		var expOnTrans = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.expOnTrans')[0];
		expOnTrans.readOnly=true;
		expOnTrans.value = 0;
		var lossSec94of7Or94of8 = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.lossSec94of7Or94of8')[0];
		lossSec94of7Or94of8.readOnly=true;
		lossSec94of7Or94of8.value = 0;
		var aquisitCost = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0];
		aquisitCost.readOnly=true;
		aquisitCost.value = 0;

		var fullConsidtnia = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdRecvUnqshr')[0];
		var fullConsidtnib = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fairMrktValueUnqshr')[0];
		var fullConsidtnic = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdSec50CA')[0];
		var fullConsidtnii = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullValueConsdOthUnqshr')[0];
		var fullConsideration = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0];

		fullConsidtnia.readOnly=true;
		fullConsidtnia.value=0;

		fullConsidtnib.readOnly=true;
		fullConsidtnib.value=0;

		fullConsidtnic.readOnly=true;
		fullConsidtnic.value=0;

		fullConsidtnii.readOnly=true;
		fullConsidtnii.value=0;

		fullConsideration.readOnly=true;
		fullConsideration.value = 0;

		//B4
		var ltcgWithoutBenefit = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit')[0];
		ltcgWithoutBenefit.readOnly=true;
		ltcgWithoutBenefit.value = 0;
		var exemptionOrDednUs54 = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0];
		exemptionOrDednUs54.readOnly=true;
		exemptionOrDednUs54.value = 0;




		//B5
		var tab = document.getElementById('stcg10pctTab');
		var inputs = tab.getElementsByTagName('INPUT');
		var selects =  tab.getElementsByTagName('SELECT');
		for(var i=0;i<inputs.length;i++){
			if(!inputs[i].classList.contains("readonly")){
				inputs[i].readOnly=true;
				inputs[i].value = '';
			}
		}
		for(var i=0;i<selects.length;i++){
			if(!selects[i].classList.contains("readonly")){
				selects[i].disabled=true;
				selects[i].selectedIndex=0;
			}
		}

		var tab = document.getElementById('ltcgDeduction54ec54ee4');
		var inputs = tab.getElementsByTagName('INPUT');
		var selects =  tab.getElementsByTagName('SELECT');

		$("#ltcgDeduction54ec54ee4 input").attr("checked" , true);
	    deleteRowTable('ltcgDeduction54ec54ee4',1,2);
		$("#ltcgDeduction54ec54ee4 input").attr("checked" , false);

		for(var i=0;i<inputs.length;i++){
			if(!inputs[i].classList.contains("readonly")){
				inputs[i].readOnly=true;
				inputs[i].value = '';
			}
		}
		for(var i=0;i<selects.length;i++){
			if(!selects[i].classList.contains("readonly")){
				selects[i].disabled=true;
				selects[i].selectedIndex=0;
			}
		}
	}
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



function removeAuditAllDetails(elem){
	if(elem.value!='Y'){
		$('.auditDetailsRow:not(:first)').remove();
		$('.auditDetailsRow').find(':input').val('');
		$('.auditDetailsRow').find(':input').prop('disabled', true);
		$('#auditDetailsButton').find(':button').prop('disabled', true);

	}else{
		$('.auditDetailsRow').find(':input').prop('disabled', false);
		$('#auditDetailsButton').find(':button').prop('disabled', false);
		if($('.auditDetailsRow').length==1){
			$('#deleteAuditBtnId').prop('disabled', true);
		}
	}

}

function setAuditSectionCode() {
	var repSec92EFlag =	document.getElementsByName('partAGEN2.repSec92EFlag')[0].value;

	if(repSec92EFlag=='YES') {
		document.getElementsByName('partAGEN2.auditDetails[0].auditedSection')[0].value='92E';
	} else {
		document.getElementsByName('partAGEN2.auditDetails[0].auditedSection')[0].value='';
	}
}

function onChngState(state,str1,str2) {

	var position = parseInt(state.name.substring(state.name.indexOf("[") + 1, state.name.indexOf("]")));

	if(state.value == '99'){
		document.getElementsByName(str1+'['+position+'].'+str2)[0].value='999999';
	} else if(state.value != '99' && document.getElementsByName(str1+'['+position+'].'+str2)[0].value == '999999') {
		document.getElementsByName(str1+'['+position+'].'+str2)[0].value='';
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


function onStateChngSetCountry(state,country) {
		var country = document.getElementsByName(country)[0];
		if(state.value != '99' && state.value != '-1' && state.value != '') {
			country.value='91';
	} else {
		country.value='';
	}
}

function onStateChng(){
	try{
		var state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
		var country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];
		var pinCode = document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0];

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



function ensureToFillSchTrFsi(field) {
	var claimUs9090A91Flag = document.getElementsByName(field)[0];
	var resStatus=document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	if(field.value=='YES' && resStatus=='RES') {
		addErrorXHTML('','Do not forget to fill Schedule TR and Schedule FSI to claim Tax relief.');
		}
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



function calculateTotalInTable(iteratorValue,columnName,tableId,totalField){
	var total=0,i=0;
	var nameTemp="";
	var tableInput=document.getElementById(tableId).getElementsByTagName('input');
	while(true){
		nameTemp=iteratorValue+'['+(i++)+'].'+columnName;
	 if(document.getElementsByName(nameTemp).length!=0){
            var val=parseInt(document.getElementsByName(nameTemp)[0].value);
              if(isNaN(val)){
                    val=0;
                }
		total=parseInt(total)+parseInt(val);
	 }
	 else{
		break;
	 }
	}
	document.getElementsByName(totalField)[0].value=total;
}

function coalesceString(val){
    if(val==undefined || val == null){
        return 0;
    }
    return val;
}

function scheduleHPCalcFor5(){
	var totHp=eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent)-1);
	var total=0;
    var thirtyPercentOfBalanceTemp = 0;

	for(var i=0;i<totHp;i++){

		document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.totalUnrealizedAndTax')[0].value=
		eval(parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.rentNotRealized')[0].value==""?0:coalesceSetRet('scheduleHP.propertyDetails['+i+'].rentdetails.rentNotRealized'))
		+ parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.localTaxes')[0].value==""?0:coalesceSetRet('scheduleHP.propertyDetails['+i+'].rentdetails.localTaxes')));


		document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.balanceALV')[0].value=
		eval(parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.annualLetableValue')[0].value==""?0:coalesceSetRet('scheduleHP.propertyDetails['+i+'].rentdetails.annualLetableValue'))-parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.totalUnrealizedAndTax')[0].value==""?0:coalesceSetRet('scheduleHP.propertyDetails['+i+'].rentdetails.totalUnrealizedAndTax')));

		var incomeChargbleOwnHands = document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.incomeChargbleOwnHands')[0];
		setEditableFieldValue(incomeChargbleOwnHands, Math.round(eval(parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.balanceALV')[0].value) * (parseFloat(document.getElementsByName('scheduleHP.propertyDetails['+i+'].asseseeShareProperty')[0].value)) /100 )));

                  thirtyPercentOfBalanceTemp = Math.round(eval(parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.incomeChargbleOwnHands')[0].value==""?0:document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.incomeChargbleOwnHands')[0].value) * 0.3 ));
			if( parseInt(thirtyPercentOfBalanceTemp ,10) >0 ){
				document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.thirtyPercentOfBalance')[0].value = thirtyPercentOfBalanceTemp;
			}else{
				document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.thirtyPercentOfBalance')[0].value = parseInt(0,10);
			}

		document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.totalDeduct')[0].value=
		eval(parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.thirtyPercentOfBalance')[0].value==""?0:document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.thirtyPercentOfBalance')[0].value)
		+ parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.intOnBorwCap')[0].value==""?0:coalesceSetRet('scheduleHP.propertyDetails['+i+'].rentdetails.intOnBorwCap')));
		document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.incomeOfHP')[0].value=
		eval(parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.incomeChargbleOwnHands')[0].value==""?0:document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.incomeChargbleOwnHands')[0].value) - parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.totalDeduct')[0].value==""?0:document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.totalDeduct')[0].value));

		total=eval(parseInt(total) + parseInt(document.getElementsByName('scheduleHP.propertyDetails['+i+'].rentdetails.incomeOfHP')[0].value));
	}

	document.getElementsByName('scheduleHP.totalIncomeChargeableUnHP')[0].value = eval(parseInt(document.getElementsByName('scheduleHP.rentOfEarlierYrSec25AandAA')[0].value==""?0:	coalesceSetRet('scheduleHP.rentOfEarlierYrSec25AandAA'))+ parseInt(total));

}

function calcScheduleSI(){
	try{
		  	var secCode1A =  document.getElementsByName('scheduleSI.splCodeRateTax[3].secCode')[0]; secCode1A.value = coalesceString(secCode1A.value);
			var splRatePercent1A = document.getElementsByName('scheduleSI.splCodeRateTax[3].splRatePercent')[0]; splRatePercent1A.value = coalesce(splRatePercent1A.value);
			var splRateInc1A = document.getElementsByName('scheduleSI.splCodeRateTax[3].splRateInc')[0]; splRateInc1A.value = coalesce(splRateInc1A.value);
			var taxableInc1A = document.getElementsByName('scheduleSI.splCodeRateTax[3].taxableInc')[0]; taxableInc1A.value = coalesce(taxableInc1A.value);
			var splRateIncTax1A = document.getElementsByName('scheduleSI.splCodeRateTax[3].splRateIncTax')[0]; splRateIncTax1A.value = coalesce(splRateIncTax1A.value);

			var secCode22 =  document.getElementsByName('scheduleSI.splCodeRateTax[5].secCode')[0]; secCode22.value = coalesceString(secCode22.value);
			var splRatePercent22 = document.getElementsByName('scheduleSI.splCodeRateTax[5].splRatePercent')[0]; splRatePercent22.value = coalesce(splRatePercent22.value);
			var splRateInc22 = document.getElementsByName('scheduleSI.splCodeRateTax[5].splRateInc')[0]; splRateInc22.value = coalesce(splRateInc22.value);
			var taxableInc22 = document.getElementsByName('scheduleSI.splCodeRateTax[5].taxableInc')[0]; taxableInc22.value = coalesce(taxableInc22.value);
			var splRateIncTax22 = document.getElementsByName('scheduleSI.splCodeRateTax[5].splRateIncTax')[0]; splRateIncTax22.value = coalesce(splRateIncTax22.value);

			var secCode21ciii =  document.getElementsByName('scheduleSI.splCodeRateTax[6].secCode')[0]; secCode21ciii.value = coalesceString(secCode21ciii.value);
			var splRatePercent21ciii = document.getElementsByName('scheduleSI.splCodeRateTax[6].splRatePercent')[0]; splRatePercent21ciii.value = coalesce(splRatePercent21ciii.value);
			var splRateInc21ciii = document.getElementsByName('scheduleSI.splCodeRateTax[6].splRateInc')[0]; splRateInc21ciii.value = coalesce(splRateInc21ciii.value);
			var taxableInc21ciii = document.getElementsByName('scheduleSI.splCodeRateTax[6].taxableInc')[0]; taxableInc21ciii.value = coalesce(taxableInc21ciii.value);
			var splRateIncTax21ciii = document.getElementsByName('scheduleSI.splCodeRateTax[6].splRateIncTax')[0]; splRateIncTax21ciii.value = coalesce(splRateIncTax21ciii.value);

			var secCode21 =  document.getElementsByName('scheduleSI.splCodeRateTax[4].secCode')[0]; secCode21.value = coalesceString(secCode21.value);
			var splRatePercent21 = document.getElementsByName('scheduleSI.splCodeRateTax[4].splRatePercent')[0]; splRatePercent21.value = coalesce(splRatePercent21.value);
			var splRateInc21 = document.getElementsByName('scheduleSI.splCodeRateTax[4].splRateInc')[0]; splRateInc21.value = coalesce(splRateInc21.value);
			var taxableInc21 = document.getElementsByName('scheduleSI.splCodeRateTax[4].taxableInc')[0]; taxableInc21.value = coalesce(taxableInc21.value);
			var splRateIncTax21 = document.getElementsByName('scheduleSI.splCodeRateTax[4].splRateIncTax')[0]; splRateIncTax21.value = coalesce(splRateIncTax21.value);

			var secCode5BB =  document.getElementsByName('scheduleSI.splCodeRateTax[7].secCode')[0]; secCode5BB.value = coalesceString(secCode5BB.value);
			var splRatePercent5BB = document.getElementsByName('scheduleSI.splCodeRateTax[7].splRatePercent')[0]; splRatePercent5BB.value = coalesce(splRatePercent5BB.value);
			var splRateInc5BB = document.getElementsByName('scheduleSI.splCodeRateTax[7].splRateInc')[0]; splRateInc5BB.value = coalesce(splRateInc5BB.value);
			var taxableInc5BB = document.getElementsByName('scheduleSI.splCodeRateTax[7].taxableInc')[0]; taxableInc5BB.value = coalesce(taxableInc5BB.value);
			var splRateIncTax5BB = document.getElementsByName('scheduleSI.splCodeRateTax[7].splRateIncTax')[0]; splRateIncTax5BB.value = coalesce(splRateIncTax5BB.value);

		    var secCode1 =  document.getElementsByName('scheduleSI.splCodeRateTax[0].secCode')[0]; secCode1.value = coalesceString(secCode1.value);
			var splRatePercent1 = document.getElementsByName('scheduleSI.splCodeRateTax[0].splRatePercent')[0]; splRatePercent1.value = coalesce(splRatePercent1.value);
			var splRateInc1 = document.getElementsByName('scheduleSI.splCodeRateTax[0].splRateInc')[0]; splRateInc1.value = coalesce(splRateInc1.value);
			var taxableInc1 = document.getElementsByName('scheduleSI.splCodeRateTax[0].taxableInc')[0];
			var splRateIncTax1 = document.getElementsByName('scheduleSI.splCodeRateTax[0].splRateIncTax')[0];

		    var secCodeDTAA =  document.getElementsByName('scheduleSI.splCodeRateTax[1].secCode')[0]; secCodeDTAA.value = coalesceString(secCodeDTAA.value);
			var splRatePercentDTAA = document.getElementsByName('scheduleSI.splCodeRateTax[1].splRatePercent')[0]; splRatePercentDTAA.value = coalesce(splRatePercentDTAA.value);
			var splRateIncDTAA = document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateInc')[0]; splRateIncDTAA.value = coalesce(splRateIncDTAA.value);
			var taxableIncDTAA = document.getElementsByName('scheduleSI.splCodeRateTax[1].taxableInc')[0]; taxableIncDTAA.value = coalesce(taxableIncDTAA.value);
			var splRateIncTaxDTAA = document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0]; splRateIncTaxDTAA.value = coalesce(splRateIncTaxDTAA.value);

			var secCode5b =  document.getElementsByName('scheduleSI.splCodeRateTax[2].secCode')[0]; secCode5b.value = coalesceString(secCode5b.value);
			var splRatePercent5b = document.getElementsByName('scheduleSI.splCodeRateTax[2].splRatePercent')[0]; splRatePercent5b.value = coalesce(splRatePercent5b.value);
			var splRateInc5b = document.getElementsByName('scheduleSI.splCodeRateTax[2].splRateInc')[0]; splRateInc5b.value = coalesce(splRateInc5b.value);
			var taxableInc5b = document.getElementsByName('scheduleSI.splCodeRateTax[2].taxableInc')[0]; taxableInc5b.value = coalesce(taxableInc5b.value);
			var splRateIncTax5b = document.getElementsByName('scheduleSI.splCodeRateTax[2].splRateIncTax')[0]; splRateIncTax5b.value = coalesce(splRateIncTax5b.value);

			//Taxable Income autopopulate
			taxableInc21.value=zeroOrMore(splRateInc21.value);
			taxableInc1A.value=zeroOrMore(splRateInc1A.value);
			taxableInc22.value =zeroOrMore(splRateInc22.value);

			taxableInc21ciii.value=zeroOrMore(splRateInc21ciii.value);
			taxableInc5BB.value=zeroOrMore(splRateInc5BB.value);
			taxableIncDTAA.value=zeroOrMore(splRateIncDTAA.value);
			taxableInc5b.value=zeroOrMore(splRateInc5b.value);

			//Column 'Tax thereon' values for fixed rows
			splRateIncTax1A.value = Math.round((15*eval(parseInt(taxableInc1A.value,10)))/parseInt('100' ,10));
			splRateIncTax22.value = Math.round((10*eval(parseInt(taxableInc22.value,10)))/parseInt('100' ,10));
			splRateIncTax21ciii.value = Math.round((10*eval(parseInt(taxableInc21ciii.value,10)))/parseInt('100' ,10));
			splRateIncTax21.value = Math.round((20*eval(parseInt(taxableInc21.value,10)))/parseInt('100' ,10));
			splRateIncTax5BB.value = Math.round((30*eval(parseInt(taxableInc5BB.value,10)))/parseInt('100' ,10));

			splRateIncTax5b.value = Math.round((12.5*eval(parseInt(taxableInc5b.value,10)))/parseInt('100' ,10));


			var totSplRateInc = eval(parseInt(splRateInc1A.value ,10)) + eval(parseInt(splRateInc22.value ,10))+ eval(parseInt(splRateInc21ciii.value ,10)) + eval(parseInt(splRateInc21.value ,10)) + eval(parseInt(splRateInc5BB.value ,10))
		                            + eval(parseInt(splRateIncDTAA.value ,10)) + eval(parseInt(splRateInc1.value ,10))+ eval(parseInt(splRateInc5b.value ,10));
			var totSplRateIncTax = eval(parseInt(splRateIncTax1A.value ,10)) + eval(parseInt(splRateIncTax22.value ,10)) + eval(parseInt(splRateIncTax21ciii.value ,10)) + eval(parseInt(splRateIncTax21.value ,10)) + eval(parseInt(splRateIncTax5BB.value ,10))
		                         + eval(parseInt(splRateIncTaxDTAA.value ,10)) + eval(parseInt(coalesce(splRateIncTax1.value) ,10))+ eval(parseInt(coalesce(splRateIncTax5b.value) ,10));

			var totTaxableInc= eval(parseInt(taxableInc1A.value ,10)) + eval(parseInt(taxableInc22.value ,10)) + eval(parseInt(taxableInc21ciii.value ,10)) + eval(parseInt(taxableInc21.value ,10)) + eval(parseInt(taxableInc5BB.value ,10))
		                        + eval(parseInt(taxableIncDTAA.value ,10)) + eval(parseInt(coalesce(taxableInc1.value) ,10))+ eval(parseInt(coalesce(taxableInc5b.value) ,10));


			var rowCount1=countRowInTable('scheduleSI.splCodeRateTax','splRateInc');

			for(var i = 8; i < rowCount1; i++) {
				var splCodeValue=document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].splRateInc')[0].value;
				var splRatePercent = document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].splRatePercent')[0].value;
				document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].taxableInc')[0].value=zeroOrMore(coalesce(splCodeValue));
				document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].splRateIncTax')[0].value=Math.round(eval((parseFloat(coalesce(splRatePercent) ,10) * parseInt(coalesce(splCodeValue),10))/parseInt('100' ,10) ));

							totSplRateInc = eval ( parseInt(totSplRateInc ,10) + parseInt( coalesce(splCodeValue) ,10) );
							totSplRateIncTax = eval ( parseInt(totSplRateIncTax ,10) + parseInt( coalesce(document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].splRateIncTax')[0].value) ,10) );
							totTaxableInc=eval ( parseInt(totTaxableInc ,10) + parseInt( coalesce(document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].taxableInc')[0].value) ,10) );
			}
			document.getElementsByName('scheduleSI.totSplRateIncTax')[0].value = zeroOrMore(totSplRateIncTax);
			document.getElementsByName('scheduleSI.totSplRateInc')[0].value = zeroOrMore(totSplRateInc);
			document.getElementsByName('scheduleSI.totSplRateTaxableInc')[0].value = zeroOrMore(totTaxableInc);
			checkSIAmount();
		    }catch(e){
		        alert('Errror in SI:'+e);
		    }
	}


function addSchSIRow(SecCode,SecCodeValue){
    try{
    var tableId=document.getElementById('scheduleSI');
    var mainTable=document.getElementById('scheduleSI').rows;
    var noOfRows=tableId.rows.length;
    var toInsertBefore=document.getElementById('scheduleSILastRow');

    var lastIndex=eval(parseInt(noOfRows,10)-2);


    var cloneNode=mainTable[lastIndex].cloneNode(true);
    var newSlNo=cloneNode.cells[0].textContent;

    var iterate=eval(parseInt(newSlNo,10)-1);


    cloneNode.cells[0].innerHTML=eval(parseInt(newSlNo,10)+1);
    //getSection
    cloneNode.cells[1].innerHTML=getSectionTextMap(SecCode);
    var inputTags=cloneNode.getElementsByTagName('input');
		for(var a=0;a<inputTags.length;a++){

			inputTags[a].name=inputTags[a].name.replace('['+iterate+']','['+lastIndex+']');

                        inputTags[a].id=inputTags[a].name.replace(/([\.\[\]])/g,'_').replace(/(__)/g,'_');
                        //Display Section Rate
						inputTags[1].value=getSectionTaxRate(SecCode);
                        //Income
                        inputTags[2].value=zeroOrMore(parseInt(SecCodeValue,10));


                        if(inputTags[a].getAttribute('type')=='hidden' && inputTags[a].name.match("secCode$")){
                            inputTags[a].value=SecCode;
                        }


                        var blurAttr=inputTags[a].getAttribute('onblur');
            			if(blurAttr!=null){
            				blurAttr=blurAttr+";";
            			}else{
            				blurAttr="";
            			}
            			inputTags[a].setAttribute('onblur',blurAttr+'j.blur(this,this.name,this.value);');
		}
    document.getElementById('scheduleSI').getElementsByTagName('tr')[0].parentNode.insertBefore(cloneNode,toInsertBefore);


}catch(e){
        alert('addSchSIRow'+e);
    }
}

function populateSI(cgosIncome,simap){
	   try{
		   updateMapForSI(cgosIncome, simap);

	      //111
	    document.getElementsByName('scheduleSI.splCodeRateTax[0].splRateInc')[0].value= zeroOrMore(parseInt(cgosIncome.osInc.sec111,10));

	 // DTAAOS
		document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateInc')[0].value = getAmt('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa.totAmtUnderDtaa')+getAmt('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg')+getAmt('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg');

	    //111A
	    document.getElementsByName('scheduleSI.splCodeRateTax[3].splRateInc')[0].value= zeroOrMore(parseInt(cgosIncome.cgInc.stcg.prctg15.sec111a,10));

	     //112
	    document.getElementsByName('scheduleSI.splCodeRateTax[4].splRateInc')[0].value = zeroOrMore(parseInt(cgosIncome.cgInc.ltcg.prctg20.sec112,10) );

	    //112proviso
	    document.getElementsByName('scheduleSI.splCodeRateTax[5].splRateInc')[0].value = zeroOrMore(parseInt(cgosIncome.cgInc.ltcg.prctg10.secProviso,10));

	    //112(1)(c)(iii)
	    document.getElementsByName('scheduleSI.splCodeRateTax[6].splRateInc')[0].value = zeroOrMore(parseInt(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2,10));

	    //5BB
	    document.getElementsByName('scheduleSI.splCodeRateTax[7].splRateInc')[0].value = zeroOrMore(parseInt(cgosIncome.osInc.sec115BB));

	    //5ADii
	   document.getElementsByName('scheduleSI.splCodeRateTax[8].splRateInc')[0].value = zeroOrMore(parseInt(cgosIncome.cgInc.stcg.prctg30,10));

	   // 5BBF BP
		document.getElementsByName('scheduleSI.splCodeRateTax[9].splRateInc')[0].value = zeroOrMore(parseInt(
				document
						.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBF')[0].value,
				10));

		 // 5BBG BP
		document.getElementsByName('scheduleSI.splCodeRateTax[10].splRateInc')[0].value = zeroOrMore(parseInt(
				document
						.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.incRecCredPLOthHeads.underSec115BBG')[0].value,
				10));


	   deleteSIRow();

	    for(var i in simap){
	        if(simap[i]!='undefined' && simap[i]!=null && simap[i]!=0 && i !=''){
	            var secAdded=checkSectionAddedSI(i,simap[i]);
	            if(!secAdded && !(i=='5BBE68' || i=='5BBE69' ||i=='5BBE69A' || i=='5BBE69B' ||i=='5BBE69C' || i=='5BBE69D'||i=='aggrtvaluewithoutcons562x' || i=='immovpropwithoutcons562x' ||
	            		i=='immovpropinadeqcons562x' || i=='anyotherpropwithoutcons562x' || i=='anyotherpropinadeqcons562x'  || i=='Tot562x')){
	            addSchSIRow(i,simap[i]);
	          }
	        }

	    }

	    for(var si in simap){

	     simap[si]='';
	    }
	    calcScheduleSI();
	   }catch(e){
	       alert('Error in populateSI:' +e);
	   }

	}

function checkSectionAddedSI(secCode,secValue){
    try{
    var tab=document.getElementById('scheduleSI');
    var noofRows=tab.rows.length;
    var secAdded=false;
    for(var i=0;i<eval(parseInt(noofRows,10)-5);i++){

        if(document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].secCode')[0].value==secCode ){
            document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].splRateInc')[0].value=zeroOrMore(parseInt(secValue,10));
            secAdded=true;
            }

    }
    }catch(e){
       alert('error in checkSectionAddedSI' +e);
    }
    return secAdded;
}

function deleteSIRow(){
    try{
    var siTable=document.getElementById('scheduleSI');
    var noRows=siTable.rows.length;
    if(parseInt(noRows,10) > 13){

    for(var i=10;i<parseInt(noRows,10)-3;i++){
       siTable.deleteRow(12);
    }

    }

    }catch(e){
        alert('Error in deleteSIRow:'+e)
    }
   }


function getSectionTextMap(key){
    var sectionTextMap={"1":"111 - Tax on accumulated balance of recognised PF",
                        "1A":"111A (STCG on shares where STT paid)",
                        "21":"112 (LTCG on others)",
                        "22":"112 proviso (LTCG on listed securities/ units without indexation)",
                        "21ciii":"112(1)(c)(iii)(LTCG on unlisted securities in case of non-residents)",
                        "5A1ai":"115A(1)(a)(i)- Dividends interest and income from units purchase in foreign currency",
                        "5A1aii":"115A(1)(a)(ii)- Interest received from govt/Indian Concerns recived in Foreign Currency",
                        "5A1aiia":"115A(1) (a)(iia) -Interest from Infrastructure Debt Fund",
                        "5A1aiiaa":"115A(1) (a)(iiaa) -Interest as per Sec. 194LC",
                        "5A1aiiab":"115A(1) (a)(iiab) -Interest as per Sec. 194LD",
                        "5A1aiiac" : "115A(1)(a)(iiac) -Interest as per Sec. 194LBA",
                        "5A1aiii":"115A(1) (a)(iii) - Income received in respect of units of UTI purchased in Foreign Currency",
                        "5A1bA":"115A(1)(b)(A)- Income from royalty & technical services",
                        "5A1bB":"115A(1)(b)(B) Income from royalty & technical services",
                        "5AC1ab":"115AC(1)(a & b) - Income from bonds or GDR purchased in foreign currency - non-resident",
                        "5AC1c":"115AC(1)(c) -LTCG arising from the transfer of bonds or GDR purchased in foreign currency - non-resident",
                        "5AB1b":"115AB(1)(b) - Income by way of long-term capital gains arising from the transfer of units purchased in foreign currency by a off-shore fund",
                        "5ACA1b":"115ACA(1)(b) - LTCG arising from the transfer of GDR purchased in foreign currency - resident",
                        "5AD1i":"115AD(1)(i) -Income received by an FII in respect of securities (other than units as per Sec 115AB)",
                        "5AD1iP":"115AD(1)(i) -Income received by an FII in respect of bonds or government securities as per Sec 194LD ",
                        "5ADii":"115AD(1)(ii) -STCG (other than on equity share or equity oriented mutual fund referred to in section 111A) by an FII",
                        "5ADiii":"115AD(1)(iii)-Long term capital gains by an FII",
                        "5B":"115B - Profits and gains of life insurance business",
                        "5BB":"115BB (Winnings from lotteries, puzzles, races, games etc.)",
                        "5BBA":"115BBA - Tax on non-residents sportsmen or sports associations",
                        "5BBDA":"115BBDA - Tax on certain dividends received from domestic companies",
                        "5BBC":"115BBC - Anonymous donations",
                        "5BBE":"115BBE - Tax on income referred to in sections 68 or 69 or 69A or 69B or 69C or 69D",
                        "5BBF":"115BBF - Tax on income from patent",
                        "5BBF_BP":"115BBF - Tax on income from patent (Income under head business or profession)",
                        "5BBG":"115BBG - Tax on Transfer of carbon credits",
                        "5BBG_BP":"115BBG - Tax on Transfer of carbon credits (Income under head business or profession)",
                        "5Ea":"115E(a) - Investment income",
                        "5Eacg":"115E(a)-LTCG on any asset other than a specified asset-non resident Indian",
                        "5Eb":"115E(b) - Income by way of long term capital gains",
                        "DTAAOS" : "Chargeable under DTAA rate",
                        "5AB1a":"115AB(1)(a) - Income in respect of units - off -shore fund",
						"5AD1biip":"115AD(1)(b)(ii)- Short term capital gains referred to in section 111A",
						"5Eacg":"115E(a)-LTCG on any asset other than a specified asset-non resident Indian",
			            "5Eb":"115E(b) - Income by way of long term capital gains",
			            "DTAAOS":"Chargeable under DTAA rate",
			            "5AD1biip":"115AD(1)(b)(ii)- Short term capital gains referred to in section 111A",
			            "56i":"56(2)(i)- Dividends",
			            "56":"56(2)- Interest",
			            "A1e":"A1e",
			            "A2c":"A2c",
			            "A3e_111A":"A3e-111A",
			            "A3e_115AD":"A3e-115AD",
			            "A4a":"A4a",
			            "A4b":"A4b",
			            "A5e":"A5e",
			            "A6g":"A6g",
			            "A7":"A7",
			            "B1e":"B1e",
			            "B2e":"B2e",
			            "B3e":"B3e",
			            "B4e":"B4e",
			            "B5c":"B5c",
			            "B6e_21ciii":"B6e-112(1)(c)",
			            "B6e_5AB1b":"B6e_5AB1b",
			            "B6e_5AC1c":"B6e-115AC",
			            "B6e_5ADiii":"B6e-115AD",
			            "B7e":"B7e",
			            "B8":"B8",
			            "Others":"Others"
    };

    return sectionTextMap[key];
}

function getSectionTaxRate(key){
       var sectionRateMap={"1A":"15",
                        "21":"20",
                        "22":"10",
                        "21ciii":"10",
                        "5A1ai":"20",
                        "5A1aii":"20",
                        "5A1aiia":"5",
                        "5A1aiiaa":"5",
                        "5A1aiiab":"5",
                        "5A1aiiac" : "5",
                        "5A1aiii":"20",
                        "5A1bA":"10",
                        "5A1bB":"10",
                        "5AC1ab":"10",
                        "5AC1c":"10",
                        "5AB1b":"10",
                        "5ACA1b":"10",
                        "5AD1i":"20",
                        "5AD1iP":"5",
                        "5ADii":"30",
                        "5ADiii":"10",
                        "5B":"12.5",
                        "5BB":"30",
                        "5BBA":"20",
                        "5BBDA":"10",
                        "5BBC":"30",
                        "5BBE":"60",
                        "5BBF":"10",
                        "5BBF_BP":"10",
                        "5BBG":"10",
                        "5BBG_BP":"10",
                        "5Ea":"20",
                        "5Eacg":"20",
                        "5Eb":"10",
						"5AB1a":"10",
                        "5AD1biip":"15"
    };

    return sectionRateMap[key];

}

function natureOfBusChck(tableId){
	var noRows=4;
	var tab = document.getElementById(tableId);
	var rowCount = tab.rows.length;
	if(rowCount > noRows) {
	addErrorXHTML('','Cannot insert more than 3 rows');
	return false;
	}
	return true;

}


//Validate Balance Sheets.
function balSheetWarnig(){
var totLaibilty = document.getElementsByName('partabs.fundSrc.totFundSrc')[0].value;
var totAsests = document.getElementsByName('partabs.fundApply.totFundApply')[0].value;

if(totLaibilty != totAsests){
	addErrorXHTML('','Source of funds(5) must be equal to Total application of funds(5)');
}

}

//to add rows to table sch HP tenants
function addRowToTableSchHpTenants(tableId, noOfRow, last, elem) {

	addRowToTable(tableId, noOfRow, last);
	setSerialNumberTenants(elem, 2);
}

//set serial number tenants
function setSerialNumberTenants(element, header) {
	try {

		var tableId = element.getAttribute('onclick').substring(27,
				element.getAttribute('onclick').lastIndexOf('\''));

		var index = tableId.substring(16);

		index = eval(index - 1);

		var table = document.getElementById(tableId);
		var noOfRows = table.rows.length;

		for ( var i = 0; i < eval(parseInt(noOfRows, 10) - header); i++) {

			document.getElementsByName('scheduleHP.propertyDetails[' + index
					+ '].coTenants[' + i + '].coTenantsSNo')[0].value = i + 1;

		}
	} catch (e) {
		alert('Exception in setSerialNumberTenants method :: ' + e.stack);
	}

}

function addScheduleHP() {

	var mainTable = document.getElementById('scheduleHPMain').rows;
	var tobeInsertBefore = document.getElementById('scheduleHPAddRow');
	var flag = false;
	var totRow = document.getElementById('scheduleHPLast').cells[0].textContent;

	var iterate = eval(parseInt(totRow) - 1);
	for ( var i = 0; i < mainTable.length; i++) {
		var cloneNode = mainTable[i].cloneNode(true);
		if (mainTable[i].id == 'scheduleHP1st') {
			flag = true;
			cloneNode.cells[0].innerHTML = totRow;
		}
		if (mainTable[i].id == 'coOwnerTr') {
			cloneNode.getElementsByTagName('table')[0].setAttribute('id','scheduleHP' + totRow);
			cloneNode.getElementsByTagName('img')[0].setAttribute('onclick','addRowToTableSchHp(' + '\'scheduleHP' + totRow + '\',2,1,this);');
			cloneNode.getElementsByTagName('img')[1].setAttribute('onclick','deleteRowTable(' + '\'scheduleHP' + totRow + '\',1,1)');

		}

		if (mainTable[i].id == 'coTenantTr') {
			cloneNode.getElementsByTagName('table')[0].setAttribute('id','scheduleHPTenant' + totRow);
			cloneNode.getElementsByTagName('img')[0].setAttribute('onclick','addRowToTableSchHpTenants(' + '\'scheduleHPTenant' + totRow + '\',2,1,this);');
			cloneNode.getElementsByTagName('img')[1].setAttribute('onclick', 'deleteRowTable(' + '\'scheduleHPTenant' + totRow + '\',1,1)');
		}

		if (flag) {

			var cellsTot = cloneNode.cells;
			for ( var j = 0; j < cellsTot.length; j++) {
				cloneNode.cells[j].innerHTML = cloneNode.cells[j].innerHTML
						.replace('1a', totRow + 'a')
						.replace('1b', totRow + 'b')
						.replace('1c', totRow + 'c')
						.replace('1d', totRow + 'd')
						.replace('1e', totRow + 'e')
						.replace('1f', totRow + 'f')
						.replace('1g', totRow + 'g')
						.replace('1h', totRow + 'h')
						.replace('1i', totRow + 'i')
						.replace('1j', totRow + 'j').replace('property 1',
								'property ' + totRow).replace('property 1',
								'property ' + totRow);
			}

			var inputTags = cloneNode.getElementsByTagName('input');
			for ( var a = 0; a < inputTags.length; a++) {
				inputTags[a].name = inputTags[a].name.replace('[0]', '['+ iterate + ']');
				if (inputTags[a].name.indexOf('coOwnersSNo') == '-1') {
					inputTags[a].value = '';
				}

				if (inputTags[a].name.indexOf('coTenantsSNo') == '-1') {
					inputTags[a].value = '';
				}
				inputTags[a].id = inputTags[a].name.replace(/([\.\[\]])/g, '_').replace(/(__)/g, '_');

				var blurAttr = inputTags[a].getAttribute('onblur');
				if (blurAttr != null) {
					blurAttr = blurAttr + ";";
				} else {
					blurAttr = "";
				}
				inputTags[a].setAttribute('onblur', blurAttr + 'j.blur(this,this.name,this.value);');
			}

			var selectTags = cloneNode.getElementsByTagName('select');
			for ( var a = 0; a < selectTags.length; a++) {
				selectTags[a].name = selectTags[a].name.replace('[0]', '['
						+ iterate + ']');
				selectTags[a].value = '';
				var name = "scheduleHP.propertyDetails["+iterate+"].addressDetail.stateCode";
				var Countryname = "scheduleHP.propertyDetails["+iterate+"].addressDetail.country";
				if(selectTags[a].name== name){
						if (selectTags[a].name.indexOf('stateCode') != '') {
							selectTags[a].onchange = function() {
								setCounrtyForStateNew('scheduleHP.propertyDetails[' + iterate + '].addressDetail.stateCode','scheduleHP.propertyDetails[' + iterate + '].addressDetail.country','scheduleHP.propertyDetails[' + iterate + '].addressDetail.pinCode','scheduleHP.propertyDetails[' + iterate + '].addressDetail.zipCode');
							};
						}
				}else if(selectTags[a].name== Countryname){

					if (selectTags[a].name.indexOf('country') != '') {
						selectTags[a].onchange = function() {
							setStateForCountryNew('scheduleHP.propertyDetails[' + iterate + '].addressDetail.stateCode','scheduleHP.propertyDetails[' + iterate + '].addressDetail.country','scheduleHP.propertyDetails[' + iterate + '].addressDetail.pinCode','scheduleHP.propertyDetails[' + iterate + '].addressDetail.zipCode');
						};
					}
				}
				selectTags[a].id = selectTags[a].name.replace(/([\.\[\]])/g,
						'_').replace(/(__)/g, '_');

				var blurAttr = selectTags[a].getAttribute('onblur');
				if (blurAttr != null) {
					blurAttr = blurAttr + ";";
				} else {
					blurAttr = "";
				}
				selectTags[a].setAttribute('onblur', blurAttr + 'j.blur(this,this.name,this.value);');
			}

			var textareaTags = cloneNode.getElementsByTagName('textarea');
			for ( var a = 0; a < textareaTags.length; a++) {
				textareaTags[a].name = textareaTags[a].name.replace('[0]', '['+ iterate + ']');
				textareaTags[a].value = '';
				textareaTags[a].id = textareaTags[a].name.replace(/([\.\[\]])/g, '_').replace(/(__)/g, '_');

				var blurAttr = textareaTags[a].getAttribute('onblur');
				if (blurAttr != null) {
					blurAttr = blurAttr + ";";
				} else {
					blurAttr = "";
				}
				textareaTags[a].setAttribute('onblur', blurAttr + 'j.blur(this,this.name,this.value);');
			}

			document.getElementById('scheduleHPMain')
					.getElementsByTagName('tr')[0].parentNode.insertBefore(
					cloneNode, tobeInsertBefore);
		}
		if (mainTable[i].id == 'scheduleHPEnd') {
			flag = false;
			break;
		}
	}
	var newVal = eval(parseInt(totRow) + 1);
	var newText = 'Total (';
	for ( var k = 1; k < newVal; k++) {
		newText = newText + k + 'j +';
	}
	newText=newText+newVal+'a )';
	document.getElementById('scheduleHPLast').cells[0].innerHTML=newVal;
	document.getElementById('scheduleHPLast').nextElementSibling.cells[3].innerHTML=newVal+'a';
	document.getElementById('scheduleHPLast').nextElementSibling.nextElementSibling.cells[2].innerHTML=newVal+'b';
	document.getElementById('scheduleHPLast').nextElementSibling.nextElementSibling.cells[1].innerHTML=newText;

	if ($('#scheduleHPAddRow')[0].parentNode.children.length == 26) {
		$('#delHPButtonId').prop('disabled', true);
	} else if ($('#scheduleHPAddRow')[0].parentNode.children.length > 26) {
		$('#delHPButtonId').prop('disabled', false);
	}

	$('#scheduleHPTenant' + eval(parseInt(totRow))).find('[type=\"checkbox\"]') .attr('checked', 'checked');
	deleteRowTable('scheduleHPTenant' + eval(parseInt(totRow)), 1, 1);

	document.getElementsByName('scheduleHP.propertyDetails['
			+ (parseInt(totRow) - 1) + '].hpSno')[0].value = totRow;
	var table = document.getElementById('scheduleHPMain');
	modifyRow(table);
	var onchange1 = document.getElementsByName('scheduleHP.propertyDetails['+ (parseInt(totRow) - 1) + '].propCoOwnedFlg')[0].getAttribute('onchange');
	var onchange2 = document.getElementsByName('scheduleHP.propertyDetails['+ (parseInt(totRow) - 1) + '].ifLetOut')[0].getAttribute('onchange');
	onchange1 = onchange1.substring(0, onchange1.indexOf('('));
	onchange2 = onchange2.substring(0, onchange2.indexOf('('));
	window[onchange1]();
	window[onchange2]();
	checkMaxLengthLimit();
}

function delScheduleHPForITR5(){

	if($('#scheduleHPAddRow')[0].parentNode.children.length>25){
		for(var i=0;i<21;i++){
			$('#scheduleHPAddRow')[0].parentNode.deleteRow($('#scheduleHPAddRow')[0].parentNode.children.length-6);
		}
		if($('#scheduleHPAddRow')[0].parentNode.children.length==26){
			$('#delHPButtonId').prop('disabled', true);
		}
	}else if($('#scheduleHPAddRow')[0].parentNode.children.length==26){
		$('#delHPButtonId').prop('disabled', true);
	}

	($('#scheduleHPLast')[0].children)[0].innerHTML =  parseInt(($('#scheduleHPLast')[0].children)[0].innerHTML) - 1;

	var totRow=document.getElementById('scheduleHPLast').cells[0].textContent;

	var newVal = eval( parseInt(totRow));
	var newText='Total (';
	for(var k=1;k<newVal;k++){
		newText=newText+k+'j +'; //j will be according to the html sl no
	}
	newText=newText+newVal+'a  )';
	document.getElementById('scheduleHPLast').cells[0].innerHTML=newVal;
	document.getElementById('scheduleHPLast').nextElementSibling.cells[3].innerHTML=newVal+'a';
	document.getElementById('scheduleHPLast').nextElementSibling.nextElementSibling.cells[2].innerHTML=newVal+'b';
	document.getElementById('scheduleHPLast').nextElementSibling.nextElementSibling.cells[1].innerHTML=newText;
	var table=document.getElementById('scheduleHPMain');

	modifyRow(table);
	calcITR5();
}

function setSerialNumber(element,header){
	try{

	 var tableId=element.getAttribute('onclick').substring(20,element.getAttribute('onclick').lastIndexOf('\''));

	  var index=tableId.substring(10);

	  index=eval(index-1);

	var table = document.getElementById(tableId);
	var noOfRows = table.rows.length;

	for ( var i = 0; i < eval(parseInt(noOfRows, 10) - header); i++) {

		document.getElementsByName('scheduleHP.propertyDetails['+index+'].coOwners['+i+'].coOwnersSNo')[0].value=i+1;

	}
	}catch(e){
	alert('errror:' +e);
	}

}

function onchangeSetPartnerInfo(){

	var partnerForeignCompFlg=document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].value;
	var percentageOfShareForeignComp=document.getElementsByName('partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp')[0].value;
	var totIncFrmMemberOfAop=document.getElementsByName('partAGEN2.partnerOrMemberInfo.totIncFrmMemberOfAop')[0].value;

	var tab=document.getElementById('partAGEN2PartnerOrMemberInfoTable').rows;
	for(var i=0;i<(parseInt(tab.length,10)-4);i++){

		document.getElementsByName('partAGEN2.partnerOrMemberInfo['+ i +'].partnerForeignCompFlg')[0].value=partnerForeignCompFlg;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].percentageOfShareForeignComp')[0].value=percentageOfShareForeignComp;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].totIncFrmMemberOfAop')[0].value=totIncFrmMemberOfAop;

	}

}
function onloadSetPartnerInfo(){

	var partnerForeignCompFlg=document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].value;
	var percentageOfShareForeignComp=document.getElementsByName('partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp')[0].value;
	var totIncFrmMemberOfAop=document.getElementsByName('partAGEN2.partnerOrMemberInfo.totIncFrmMemberOfAop')[0].value;

	var tab=document.getElementById('partAGEN2PartnerOrMemberInfoTable').rows;
	for(var i=0;i<(parseInt(tab.length,10)-4);i++){

		document.getElementsByName('partAGEN2.partnerOrMemberInfo['+ i +'].partnerForeignCompFlg')[0].value=partnerForeignCompFlg;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].percentageOfShareForeignComp')[0].value=percentageOfShareForeignComp;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].totIncFrmMemberOfAop')[0].value=totIncFrmMemberOfAop;


	}
	if(partnerForeignCompFlg.value=='YES'){
		percentageOfShareForeignComp.disabled=false;
	} else {
		percentageOfShareForeignComp.value = '';

	}


}

function checkForeignSelected(){
	try{
	var partnerForeignCompFlg=document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerForeignCompFlg')[0].value;

	var tabl = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
	var selectTags=tabl.getElementsByTagName('select');

	var isForeign=false;

	if(partnerForeignCompFlg=='YES'){
		for(var i = 0; i < selectTags.length; i++) {

			if(selectTags[i].name.match('status$')){
				if(selectTags[i].value=='FOREIGN_COMPANY'){
					isForeign=true;
					break;
				}
			}

		}
		if(!isForeign){
			j.setFieldError('partAGEN2.partnerOrMemberInfo[0].status','Please select atleast one member as foreign company');
			addErrorXHTML('','Please select atleast one member as foreign company');
		}

	}
	}catch(e){
		alert(e);
	}

}

function isCoOwned(){
var totHp=eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent)-1);

	for(var i=0;i<totHp;i++){
		var tempName='scheduleHP.propertyDetails['+i+'].propCoOwnedFlg';
		var val=document.getElementsByName(tempName)[0].value;
		var assessePercentShareProp = document.getElementsByName('scheduleHP.propertyDetails['+i+'].asseseeShareProperty')[0];
		if(val=='YES'){
			$('#scheduleHP'+eval(parseInt(i)+1)).find(':input').prop('disabled', false);
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].coOwners[0].coOwnersSNo')[0].value = 1;
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].asseseeShareProperty')[0].disabled=false;
			if(assessePercentShareProp.value==100 || assessePercentShareProp.value==0.0){
				assessePercentShareProp.value = '0';
			}
		}
		else{
			$('#scheduleHP'+eval(parseInt(i)+1)).find('[type=\"checkbox\"]').attr('checked','checked');
			deleteRowTable('scheduleHP'+eval(parseInt(i)+1),1,1);
			$('#scheduleHP'+eval(parseInt(i)+1)).find(':input').prop('disabled', true);
			assessePercentShareProp.disabled=true;
			if(val=='NO'){
				assessePercentShareProp.value='100';
			}else{
				assessePercentShareProp.value='0.0';
			}
		}
	}
}
function checkAmtcSubmit(){
	var taxValue=document.getElementsByName('scheduleAMTC.amtTaxCreditAvailable')[0].value;
	var totalValue=document.getElementsByName('scheduleAMTC.taxSection115JD')[0];

	if(eval(totalValue.value)>eval(taxValue)){
		addError(totalValue,'The total amount of credit utilzed during the current year cannot be greater than amount of Tax against which credit is available',true);
	j.setFieldError(totalValue.name,'The total amount of credit utilzed during the current year cannot be greater than amount of Tax against which credit is available');
	}
}

function checkAMTCValue(minValueName,maxValueName){
try{
	var minValue=minValueName.value;
	var maxValue=$('[name="' + maxValueName+ '"]')[0].value;

	var taxValue=$('[name="scheduleAMTC.amtTaxCreditAvailable"]')[0].value;

	if(eval(minValue)>eval(maxValue)){

		minValueName.value=0;
		addError(minValueName,'The amount of credit utilized cannot be greater than amount of credit brought forward',true);
		j.setFieldError(minValueName.name,'The total amount of credit utilzed during the current year cannot be greater than amount of Tax against which credit is available');
	}
	if(eval(minValue)>eval(taxValue)){

		minValueName.value=0;
		addError(minValueName,'The amount of credit utilized cannot be greater than amount of tax against which credit is available',true);
		j.setFieldError(minValueName.name,'The amount of credit utilized cannot be greater than amount of tax against which credit is available');
	}
}catch(e){
	alert(e);
}
}

function isLetOut() {

	var totHp = eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent) - 1);
	for ( var i = 0; i < totHp; i++) {
		var tempName = 'scheduleHP.propertyDetails[' + i + '].ifLetOut';
		var val = document.getElementsByName(tempName)[0].value;

		if (val == 'Y') {

			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(':input').prop('disabled', false);
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].coTenants[0].coTenantsSNo')[0].value = 1;
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.annualLetableValue')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.rentNotRealized')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.localTaxes')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.incomeChargbleOwnHands')[0].disabled = true;
		} else if (val == 'D') {
			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find('[type=\"checkbox\"]').attr('checked', 'checked');
			deleteRowTable('scheduleHPTenant' + eval(parseInt(i) + 1), 1, 1);
			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(':input').prop('disabled', true);
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.annualLetableValue')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.rentNotRealized')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.localTaxes')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.incomeChargbleOwnHands')[0].disabled = true;
		} else {

			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find('[type=\"checkbox\"]').attr('checked', 'checked');
			deleteRowTable('scheduleHPTenant' + eval(parseInt(i) + 1), 1, 1);
			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(':input').prop('disabled', true);

			document.getElementsByName('scheduleHP.propertyDetails[' + i+ '].rentdetails.annualLetableValue')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i + '].rentdetails.annualLetableValue')[0].value = '';
			document.getElementsByName('scheduleHP.propertyDetails[' + i + '].rentdetails.rentNotRealized')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i + '].rentdetails.rentNotRealized')[0].value = '';
			document.getElementsByName('scheduleHP.propertyDetails[' + i + '].rentdetails.localTaxes')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i + '].rentdetails.localTaxes')[0].value = '';
			document.getElementsByName('scheduleHP.propertyDetails[' + i + '].rentdetails.incomeChargbleOwnHands')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i + '].rentdetails.incomeChargbleOwnHands')[0].value = '';
		}

	}

}

function calculateTax(){
clearOldValues();
calcITR5();
}

function profLossWarning(){

	var businessReceipts=document.getElementsByName('partapl.creditsToPL.totRevenueFrmOperations')[0];

	if(businessReceipts.value > parseInt('10000000',10)){
		addErrorXHTML(businessReceipts,'Total Revenue from operations (1C of Part A-P & L) of Business & Profession is greater than 1 crore then AUDIT INFORMATION must be completely filled',true);
	}
}

function deleteRowToTableScheduleSI(tableId,noOfRow,last){

	deleteRowTableModified(tableId,noOfRow,last);
	calcScheduleSI();
}

function checkIfChanged(pathToCheck){
	if( (document.getElementsByName(pathToCheck)[0].fieldChanged == undefined) ||
			(document.getElementsByName(pathToCheck)[0].fieldChanged != undefined &&
			 document.getElementsByName(pathToCheck)[0].fieldChanged =='false')){
		return false;
	}else{
		return true;
	}
}

function checkFirstLessThanMinOthTwo(path1, path2, path3,verticalCeiling){
	if(coalesceSetRet(path2) <= verticalCeiling){
		if(coalesceSetRet(path1) > coalesceSetRet(path2)){
			addErrorXHTML(document.getElementsByName(path1)[0] , 'This value cannot be greater than '+ coalesceSetRet(path2),true );
			document.getElementsByName(path1)[0].value = coalesceSetRet(path2);
		}
	}else if(verticalCeiling < coalesceSetRet(path2)){
		if(coalesceSetRet(path1) > verticalCeiling){
			addErrorXHTML(document.getElementsByName(path1)[0] , 'This value cannot be greater than '+ verticalCeiling,true );
			document.getElementsByName(path1)[0].value = verticalCeiling;
		}
	}
}

function checkHPeditableValidity(path1,path2,path4,path3,verticalCeilingHP){
	var tempVal =coalesceSetRet(path2)- coalesceSetRet(path4);
	if(tempVal <= verticalCeilingHP){
		if(coalesceSetRet(path1) > tempVal){
			addErrorXHTML(document.getElementsByName(path1)[0] , 'This value cannot be greater than '+tempVal,true );
			document.getElementsByName(path1)[0].value = tempVal;
		}
	}else if(verticalCeilingHP < tempVal){
		if(coalesceSetRet(path1) > verticalCeilingHP){
			addErrorXHTML(document.getElementsByName(path1)[0] , 'This value cannot be greater than '+ verticalCeilingHP,true );
			document.getElementsByName(path1)[0].value = verticalCeilingHP;
		}
	}

}

function checkBPeditableValidity(path1,path2,path4,path5,path3,verticalCeilingBP){

	var tempVal = coalesceSetRet(path2)-coalesceSetRet(path4)-coalesceSetRet(path5);

	if(tempVal <= verticalCeilingBP){
		if(coalesceSetRet(path1) > tempVal){
			addErrorXHTML(document.getElementsByName(path1)[0] , 'This value cannot be greater than '+tempVal,true );
			document.getElementsByName(path1)[0].value = tempVal;
		}
	}else if(verticalCeilingBP < tempVal){
		if(coalesceSetRet(path1) > verticalCeilingBP){
			addErrorXHTML(document.getElementsByName(path1)[0] , 'This value cannot be greater than '+ verticalCeilingBP,true );
			document.getElementsByName(path1)[0].value = verticalCeilingBP;
		}
	}
}

function clearCYLA(){

	if(document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].fieldChanged=undefined;
	}

	if(document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].fieldChanged=undefined;
	}

	if(document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged=undefined;
	}

	if(document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged!=undefined){
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged=undefined;
	}

	if(document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].oldvalue=undefined;
	}

	if(document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.hPlossCurYrSetoff')[0].oldvalue=undefined;
	}

	if(document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.hPlossCurYrSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue=undefined;
	}

	if(document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.speculativeInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.specifiedInc.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue=undefined;
	}
	if(document.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue!=undefined){
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue=undefined;
	}

	calcITR5();
}

function checkAMTCCurAY(){
	try{
	var curAYGross=$('[name="scheduleAMTC.scheduleAMTCUtil.CYamtCreditFwd"]')[0];
	var taxSection115JC = $('[name="scheduleAMTC.taxSection115JC"]')[0];
	var taxOthProvisions = $('[name="scheduleAMTC.taxOthProvision"]')[0];
	var curAYGrossTemp;

	if(eval(parseInt(coalesce(taxOthProvisions.value),10)) < eval(parseInt(coalesce(taxSection115JC.value),10))){

		curAYGrossTemp=eval(parseInt(coalesce(taxSection115JC.value),10))-eval(parseInt(coalesce(taxOthProvisions.value),10));

	}else{
		curAYGross.value='0';
		curAYGrossTemp=parseInt('0',10);
	}

	if(curAYGross.value>curAYGrossTemp){

		addError(document.getElementsByName('scheduleAMTC.scheduleAMTCUtil.CYamtCreditFwd')[0],'Gross income for current AY cannot be greater than 1-2',true);
		j.setFieldError('scheduleAMTC.scheduleAMTCUtil.CYamtCreditFwd','Gross income for current AY cannot be greater than 1-2');


	}
	}catch(e){
		alert('Error in checkAMTCCurAY:' +e);
	}
}

function setForeignPartner(){
	try{
	var partnerForeignCompFlg=document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0];
	if(partnerForeignCompFlg.value!='YES'){
	var tabl = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
	var selectTags=tabl.getElementsByTagName('select');

	var isForeign=false;


		for(var i = 0; i < selectTags.length; i++) {

			if(selectTags[i].name.match('status$')){
				if(selectTags[i].value=='FOREIGN_COMPANY'){
					isForeign=true;
					break;
				}
			}

		}
		if(isForeign){
		if(partnerForeignCompFlg.disabled!=true){
			partnerForeignCompFlg.value = 'YES';
			}
			enableYesNoForForeignCompFlg('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg','partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp');onchangeSetPartnerInfo();
		}

	}
	}catch(e){
		alert(e);
	}
}

function validatePartners(){
	var fshare = document.getElementsByName('partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp')[0].value;
	var shares = getPercentOfShare();
	var partnerForeignCompFlg = document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0];
	if(parseFloat(shares.foreignPerc) + parseFloat(shares.otherPerc) > 100 ){
		j.setFieldError('partAGEN2.partnerOrMemberInfo[0].sharePercentage','Total share cannot be more than 100%');
		addErrorXHTML(document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].sharePercentage')[0],'Total share cannot be more than 100%');
	}else if(partnerForeignCompFlg.value=='YES'){

		if(parseFloat(fshare) != parseFloat(shares.foreignPerc)){
						j.setFieldError('partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp','Foreign Company share mismatch.');
		addErrorXHTML(document.getElementsByName('partAGEN2.partnerOrMemberInfo.percentageOfShareForeignComp')[0],'Foreign Company share mismatch.');
		}
	}
	else if(parseFloat(shares.foreignPerc) > 0  && partnerForeignCompFlg.disabled!=true){

		j.setFieldError('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg','Invalid details of Partner Foreign Company.');
				addErrorXHTML(partnerForeignCompFlg,'Invalid details of Partner Foreign Company.');
	}

	var pan = document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	if(substatus == 5 || status == 1|| substatus == 15|| substatus == 16|| substatus == 17 || substatus == 4 || substatus == 8 || substatus == 11){
		if(document.getElementById('partAGEN2PartnerOrMemberInfoTable').rows.length < 6){
			j.setFieldError('partAGEN2.partnerOrMemberInfo[0].partnerOrMemberName','Atleast two members are required');
			addErrorXHTML(document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerOrMemberName')[0],'Atleast two members are required');
		}
	}
	if(substatus == 12 || substatus == 7|| substatus == 13){
		if(document.getElementById('partAGEN2PartnerOrMemberInfoTable').rows.length < 5){
			j.setFieldError('partAGEN2.partnerOrMemberInfo[0].partnerOrMemberName','Atleast one members are required');
			addErrorXHTML(document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerOrMemberName')[0],'Atleast one members are required');
		}
	}

}

function validateHPRent(){

	var tab=document.getElementById('scheduleHPMain');
	var allInputTags = tab.getElementsByTagName('input');
	var selectTags=tab.getElementsByTagName('select');

	for(var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("rentdetails.annualLetableValue$")) {
				if( parseInt(allInputTags[i+1].value,10) > parseInt(allInputTags[i].value ,10)) {

					addError(allInputTags[i+1],
							'Rent not realized cannot exceed Annual Letable Value',true);
						j.setFieldError(allInputTags[i+1].name,'Rent not realized cannot exceed Annual Letable Value');
						break;
				}
		}
	}

}

function onEmptySetZero(element){

	if(element.value==""){

		element.value='0';
	}

}

function getPan(){

var pan = document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
return pan;
}

function disableScheduleFA(){

	var resStatus=document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

        removeTableData('schFADtlsFrignAssets',resStatus);
        removeTableData('schFADtlsFinIntrest',resStatus);
        removeTableData('schFADtlsImmvbleProp',resStatus);
        removeTableData('schFADtlsOtherAsset',resStatus);
        removeTableData('schFADtlsSigningAuth',resStatus);
        removeTableData('schFADtlsTrusts',resStatus);
        removeTableData('DetailsOthIncomeOutsideIndia', resStatus);
}

function removeTableData(tableID,resStatus){

        var tab = document.getElementById(tableID);
    	var asstFlag = document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value;

    	if (!(resStatus == 'RES'  && asstFlag == 'YES')) {
    		$('#' + tableID + ' input').attr("checked", true);
    		deleteRowTable(tableID,3, 1);
    		$('#' + tableID + ' input').attr("checked", false);
    	}

	var allInputTags = tab.getElementsByTagName('input');
	var selectTags=tab.getElementsByTagName('select');

	for ( var i = 0; i < allInputTags.length; i++) {
    		if (resStatus == 'RES' && asstFlag == 'YES') {
    			allInputTags[i].disabled = false;
    			allInputTags[i].readOnly = false;

    		} else {

    			allInputTags[i].disabled = true;
    			allInputTags[i].readOnly = true;
    			allInputTags[i].value = "";
    		}
	}

	for ( var i = 0; i < selectTags.length; i++) {
		if (resStatus == 'RES'  && asstFlag == 'YES') {
			selectTags[i].disabled = false;
		} else {
			selectTags[i].disabled = true;
			selectTags[i].value = "";

		}
	}
}

function numberOfCoOwnersCheck(tableId,noRows){
	var tab = document.getElementById(tableId);
	var rowCount = tab.rows.length;
	if(rowCount > noRows) {
	addErrorXHTML('','Cannot insert more than 5 rows',true);
	return false;
	}
	return true;

}

function numberOfRowsForQDCheck(tableId){
	var noRows=21;
	var tab = document.getElementById(tableId);
	var rowCount = tab.rows.length;
	if(rowCount > noRows) {
	addErrorXHTML('','Cannot insert more than 20 rows');
	return false;
	}
	return true;

}

function addRowToTableSchHp(tableId, noOfRow, last,elem) {

		addRowToTable(tableId,noOfRow,last);
		setSerialNumber(elem,2);

}

function schTRonLoad() {

	var fsiTable = document.getElementById('scheduleFSI');
	var noRows = (fsiTable.rows.length-4)/5;

	for(var i=0;i<noRows;i++) {
		var index = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].countryCode')[0].selectedIndex;
		var countryCodeName = document.getElementsByName('scheduleTR1.scheduleTR['+i+'].countryCodeName')[0];

		countryCodeName.value = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].countryCode')[0].options[index].text;

		if(countryCodeName.value == "Select"){
			countryCodeName.value = '';
		}
	}
	totAmtOfSchedTRFor6();
}

function validateFSI() {
	var table=document.getElementById('scheduleFSI');
    var noOfRows=table.rows.length;
    var indexValue=eval(((parseInt(noOfRows,10)-4)/5));
    var empty2,empty3,empty4;
    for(var i=0;i<indexValue;i++){
		if(document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].countryCode')[0].value!=''){
		var empty = true;
			var errors = ['Income from outside India(included in PART B-TI) is required',
			              'Tax paid outside India is required',
						  'Tax payable on such income under normal provisions in India is required',
			              'Relevant article of DTAA if relief claimed u/s 90 or 90A is required'];
			empty2 = empty && !validateAllFilled(['itrScheduleFSI.scheduleFSI['+i+'].incFromHP.incFrmOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incFromHP.taxPaidOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incFromHP.taxPayableinInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incFromHP.dtaaReliefUs90or90A'],errors);
			empty3 = empty && !validateAllFilled(['itrScheduleFSI.scheduleFSI['+i+'].incCapGain.incFrmOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incCapGain.taxPaidOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incCapGain.taxPayableinInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incCapGain.dtaaReliefUs90or90A'],errors);
			empty4 = empty && !validateAllFilled(['itrScheduleFSI.scheduleFSI['+i+'].incOthSrc.incFrmOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incOthSrc.taxPaidOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incOthSrc.taxPayableinInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incOthSrc.dtaaReliefUs90or90A'],errors);
			empty5 = empty && !validateAllFilled(['itrScheduleFSI.scheduleFSI['+i+'].incFromBusiness.incFrmOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incFromBusiness.taxPaidOutsideInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incFromBusiness.taxPayableinInd',
			                                     'itrScheduleFSI.scheduleFSI['+i+'].incFromBusiness.dtaaReliefUs90or90A'],errors);
			if(empty2&&empty3&&empty4&&empty5){
	            j.setFieldError('itrScheduleFSI.scheduleFSI['+i+'].incFromHP.incFrmOutsideInd','Please fill atleast one income');
	            addErrorXHTML(document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].incFromHP.incFrmOutsideInd')[0],'Please fill atleast one income',true);
			}
		}
    }
}

function validateAllFilled(fieldNames,errors){
	var fields = [];
	var filled = 0;
	for(var i=0; i<fieldNames.length; i++){
		fields[i] = document.getElementsByName(fieldNames[i])[0];
		if(fields[i].value!='' && fields[i].value!=undefined){
			filled++;
		}
	}
	if(filled>0){
		for(var i=0; i<fieldNames.length; i++){
			if(fields[i].value=='' || fields[i].value==undefined){
				if(i==fieldNames.length-1){
					if(Math.min(coalesce(fields[1].value),coalesce(fields[2].value)) == parseInt(0)){
						continue;
					}
				}
	            j.setFieldError(fieldNames[i],errors[i]);
	            addErrorXHTML(fields[i],errors[i],true);
	            break;
			}
		}
		return true;
	}
	return false;
}

function calcScheduleFSI(){
	try{
		var table=document.getElementById('scheduleFSI');
	        var noOfRows=table.rows.length;
	        var indexValue=eval(((parseInt(noOfRows,10)-4)/5));

	        for(var i=0;i<indexValue;i++){

	            document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].totalCountryWise.incFrmOutsideInd")[0].value=
	                 eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.incFrmOutsideInd")[0].value),10))+
	                     eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.incFrmOutsideInd")[0].value),10))+
	                         eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.incFrmOutsideInd")[0].value),10))+
	                         eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.incFrmOutsideInd")[0].value),10));

	              document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].totalCountryWise.taxPaidOutsideInd")[0].value=
	                 eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxPaidOutsideInd")[0].value),10))+
	                     eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxPaidOutsideInd")[0].value),10))+
	                         eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxPaidOutsideInd")[0].value),10))+
	                         eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxPaidOutsideInd")[0].value),10));

	                   document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].totalCountryWise.taxPayableinInd")[0].value=
	                 eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxPayableinInd")[0].value),10))+
	                     eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxPayableinInd")[0].value),10))+
	                         eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxPayableinInd")[0].value),10))+
	                        eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxPayableinInd")[0].value),10));

	                   if(eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxPaidOutsideInd")[0].value)<
	                    eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxPayableinInd")[0].value)){
	                 document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxReliefinInd")[0].value=
	                     document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxPaidOutsideInd")[0].value;
	                    }else{
	                         document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxReliefinInd")[0].value=
	                             document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxPayableinInd")[0].value;
	                    }

	                         if(eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxPaidOutsideInd")[0].value)<
	                    eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxPayableinInd")[0].value)){
	                 document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxReliefinInd")[0].value=
	                     document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxPaidOutsideInd")[0].value;
	                    }else{
	                         document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxReliefinInd")[0].value=
	                             document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxPayableinInd")[0].value;
	                    }

	                         if(eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxPaidOutsideInd")[0].value)<
	                    eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxPayableinInd")[0].value)){
	                 document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxReliefinInd")[0].value=
	                     document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxPaidOutsideInd")[0].value;
	                    }else{
	                         document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxReliefinInd")[0].value=
	                             document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxPayableinInd")[0].value;
	                    }

	                       if(eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxPaidOutsideInd")[0].value)<
	                    eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxPayableinInd")[0].value)){
	                 document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxReliefinInd")[0].value=
	                     document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxPaidOutsideInd")[0].value;
	                    }else{
	                         document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxReliefinInd")[0].value=
	                             document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxPayableinInd")[0].value;
	                    }

	                    document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].totalCountryWise.taxReliefinInd")[0].value=
	                 eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromHP.taxReliefinInd")[0].value),10))+
	                     eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incFromBusiness.taxReliefinInd")[0].value),10))+
	                         eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incCapGain.taxReliefinInd")[0].value),10))+
	                         eval(parseInt(coalesce(document.getElementsByName("itrScheduleFSI.scheduleFSI["+i+"].incOthSrc.taxReliefinInd")[0].value),10));
	        }
	        populateTR();
		}catch(e){
			alert('error in calcScheduleFSI = '  +e.stack);
		}
}

function populateTR() {
	try {
		deleteTRRow();
		var fsiTable = document.getElementById('scheduleFSI');
		var noRows = (fsiTable.rows.length-4)/5;
		var pos = document.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].selectedIndex;

		document.getElementsByName('scheduleTR1.scheduleTR[0].countryCode')[0].value = document.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].value;
		document.getElementsByName('scheduleTR1.scheduleTR[0].countryName')[0].value = document.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryName')[0].value;

		if(document.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].options[pos].text=="Select") {
			document.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value = '';
		} else {
			document.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value = document.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].options[pos].text;
		}

		document.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value = document.getElementsByName('itrScheduleFSI.scheduleFSI[0].taxIdentificationNo')[0].value;
		document.getElementsByName('scheduleTR1.scheduleTR[0].taxPaidOutsideIndia')[0].value = document.getElementsByName('itrScheduleFSI.scheduleFSI[0].totalCountryWise.taxPaidOutsideInd')[0].value;
		document.getElementsByName('scheduleTR1.scheduleTR[0].taxReliefOutsideIndia')[0].value = document.getElementsByName('itrScheduleFSI.scheduleFSI[0].totalCountryWise.taxReliefinInd')[0].value;

		var firstSecCode = document.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value+'_'+document.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value;

		document.getElementsByName('scheduleTR1.scheduleTR[0].relavantArticleDTAA')[0].value=sectionClaimed[firstSecCode];

		if(noRows>1) {

			var countryCodeName='';
			var taxIdentificationNo='';
			var taxPaidOutsideIndia='';
			var taxReliefOutsideIndia='';

			for(var i=1;i<noRows;i++) {
				var index = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].countryCode')[0].selectedIndex;

				countryCodeName = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].countryCode')[0].options[index].text;

				if(countryCodeName=="Select"){
					countryCodeName = '';
				}

				taxIdentificationNo = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].taxIdentificationNo')[0].value;
				taxPaidOutsideIndia = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].totalCountryWise.taxPaidOutsideInd')[0].value;
				taxReliefOutsideIndia = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].totalCountryWise.taxReliefinInd')[0].value;

				addSchTRRow(countryCodeName,taxIdentificationNo,taxPaidOutsideIndia,taxReliefOutsideIndia);

				var countryCode=document.getElementsByName('scheduleTR1.scheduleTR['+i+'].countryCode')[0];
				var countryName=document.getElementsByName('scheduleTR1.scheduleTR['+i+'].countryName')[0];

				countryCode.value = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].countryCode')[0].value;
				countryName.value = document.getElementsByName('itrScheduleFSI.scheduleFSI['+i+'].countryName')[0].value;


				document.getElementsByName('scheduleTR1.scheduleTR['+i+'].relavantArticleDTAA')[0].value = sectionClaimed[countryCodeName+'_'+taxIdentificationNo];


			}

		}
		for(var i=0;i<noRows;i++) {
			var relavantArticleDTAA = document.getElementsByName('scheduleTR1.scheduleTR['+i+'].relavantArticleDTAA')[0];
			if(relavantArticleDTAA.value != '90' && relavantArticleDTAA.value != '90A' && relavantArticleDTAA.value != '91') {
				relavantArticleDTAA.value='';
			}
		}
		totAmtOfSchedTRFor6('scheduleTR');
	} catch (e) {
		alert('Error in populateTR:' + e);
	}

}

var sectionClaimed = {};

function deleteTRRow() {
	try {
		var trTable = document.getElementById('scheduleTR');
		var noRows = trTable.rows.length;

		if (parseInt(noRows, 10) > 4) {
			for ( var i = 2; i < parseInt(noRows, 10) - 3; i++) {
				var countryCode = document.getElementsByName('scheduleTR1.scheduleTR['+(i-1)+'].countryCodeName')[0];
				var taxIdentificationNo = document.getElementsByName('scheduleTR1.scheduleTR['+(i-1)+'].taxIdentificationNo')[0];
				sectionClaimed[countryCode.value+'_'+taxIdentificationNo.value] = document.getElementsByName('scheduleTR1.scheduleTR['+(i-1)+'].relavantArticleDTAA')[0].value;
				trTable.deleteRow(3);
			}
		}
		sectionClaimed[document.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value+'_'+document.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value] = document.getElementsByName('scheduleTR1.scheduleTR[0].relavantArticleDTAA')[0].value;

		document.getElementsByName('scheduleTR1.scheduleTR[0].countryCode')[0].value='';
		document.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value='';
		document.getElementsByName('scheduleTR1.scheduleTR[0].taxPaidOutsideIndia')[0].value='';
		document.getElementsByName('scheduleTR1.scheduleTR[0].taxReliefOutsideIndia')[0].value='';


	} catch (e) {
		alert('Error in deleteTRRow:' + e);
	}
}

function addSchTRRow(countryCodeName, taxIdentificationNo, taxPaidOutsideIndia,taxReliefOutsideIndia) {
	try {
		var tableId = document.getElementById('scheduleTR');
		var mainTable = document.getElementById('scheduleTR').rows;
		var noOfRows = tableId.rows.length;
		var toInsertBefore = document.getElementById('scheduleTRLastRow');

		var lastIndex = eval(parseInt(noOfRows, 10) - 3);

		var cloneNode = mainTable[lastIndex].cloneNode(true);
		var newSlNo = cloneNode.cells[0].textContent;

		var iterate = eval(parseInt(newSlNo, 10) - 1);

		cloneNode.cells[0].innerHTML = eval(parseInt(newSlNo, 10) + 1);
		var inputTags = cloneNode.getElementsByTagName('input');
		var selectTags = cloneNode.getElementsByTagName('select');
		for ( var a = 0; a < inputTags.length; a++) {
			inputTags[a].name = inputTags[a].name.replace('[' + iterate + ']','[' + (lastIndex - 1) + ']');

			inputTags[a].id = inputTags[a].name.replace(/([\.\[\]])/g, '_').replace(/(__)/g, '_');

			inputTags[0].value = countryCodeName;

			inputTags[3].value = taxIdentificationNo;

			inputTags[4].value = parseInt(taxPaidOutsideIndia, 10);
			inputTags[5].value = parseInt(taxReliefOutsideIndia, 10);

			var blurAttr = inputTags[a].getAttribute('onblur');
			if (blurAttr != null) {
				blurAttr = blurAttr + ";";
			} else {
				blurAttr = "";
			}
			inputTags[a].setAttribute('onblur', blurAttr+ 'j.blur(this,this.name,this.value);');
		}

		for ( var a = 0; a < selectTags.length; a++) {
			selectTags[a].name = selectTags[a].name.replace('[' + iterate + ']', '[' + (lastIndex - 1) + ']');
			selectTags[a].id = selectTags[a].name.replace(/([\.\[\]])/g, '_').replace(/(__)/g, '_');

			var blurAttr = inputTags[a].getAttribute('onblur');
			if (blurAttr != null) {
				blurAttr = blurAttr + ";";
			} else {
				blurAttr = "";
			}
			selectTags[a].setAttribute('onblur', blurAttr+ 'j.blur(this,this.name,this.value);');
		}
		document.getElementById('scheduleTR').getElementsByTagName('tr')[0].parentNode.insertBefore(cloneNode, toInsertBefore);

	} catch (e) {
		alert('addSchTRRow' + e);
	}
}
function calculateTotalDeductions()
{

	var tab = document.getElementById('schduleCGDed54B');
	var noOfRows = tab.rows.length;
	var sum = 0;
	var amt = 0;
	for (var i = 0; i < (noOfRows -3); i++) {
		amt = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].AmtClaimed')[0].value;
		sum = eval(parseInt(sum, 10) + parseInt(coalesce(amt), 10));
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point4')[0].value="N";
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point23')[0].value="N";
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].dateofOrginalAsset')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].AmtClaimed')[0].value!=""){
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].AmtDeposited')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].costOfAgLand')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].dateofAcquist')[0].value==""){
			j.setFieldError('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54B');
			addErrorXHTML('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54B',true);
		}
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].costOfAgLand')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].dateofAcquist')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point23')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point4')[0].value="N";
		}
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].AmtDeposited')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point4')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point23')[0].value="N";
		}
		else{
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point4')[0].value="Y";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54B[' + i + '].point23')[0].value="Y";

		}
	}
	}

	var tab1 = document.getElementById('schduleCGDed54D');
	var noOfRows1 = tab1.rows.length;
	var sum1 = 0;
	var amt1 = 0;

	for (var i = 0; i < (noOfRows1 -3); i++) {
		amt1 = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].AmtClaimed')[0].value;
		sum1 = eval(parseInt(sum1, 10) + parseInt(coalesce(amt1), 10));
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point4')[0].value="N";
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point23')[0].value="N";
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].dateofOrginalAsset')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].AmtClaimed')[0].value!=""){
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].AmtDeposited')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].costOfAgLand')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].dateofAcquist')[0].value==""){
				j.setFieldError('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54D');
				addErrorXHTML('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54D',true);
		}
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].costOfAgLand')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].dateofAcquist')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point23')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point4')[0].value="N";
		}
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].AmtDeposited')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point4')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point23')[0].value="N";
		}
		else{
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point4')[0].value="Y";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].point23')[0].value="Y";

		}
	}

	}

	var tab2 = document.getElementById('schduleCGDed54EC');
	var noOfRows2 = tab2.rows.length;
	var sum2 = 0;
	var amt2 = 0;

	for (var i = 0; i < (noOfRows2 -3); i++) {
		amt2 = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54EC[' + i + '].AmtClaimed')[0].value;
		sum2 = eval(parseInt(sum2, 10) + parseInt(coalesce(amt2), 10));
	}

	var tab3 = document.getElementById('schduleCGDed54EE');
	var noOfRows3 = tab3.rows.length;
	var sum3 = 0;
	var amt3 = 0;

	for (var i = 0; i < (noOfRows3 -3); i++) {
		amt3 = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54EE[' + i + '].AmtClaimed')[0].value;
		sum3 = eval(parseInt(sum3, 10) + parseInt(coalesce(amt3), 10));
	}

	var tab4 = document.getElementById('schduleCGDed54G');
	var noOfRows4 = tab4.rows.length;
	var sum4 = 0;
	var amt4 = 0;

	for (var i = 0; i < (noOfRows4 -3); i++) {
		amt4 = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].AmtClaimed')[0].value;
		sum4 = eval(parseInt(sum4, 10) + parseInt(coalesce(amt4), 10));
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point23')[0].value="N";
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point4')[0].value="N";
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].dateofOrginalAsset')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].AmtClaimed')[0].value!=""){
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].AmtDeposited')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].costOfAgLand')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].dateofAcquist')[0].value==""){
				j.setFieldError('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54G');
				addErrorXHTML('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54G',true);
	    }
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].costOfAgLand')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].dateofAcquist')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point23')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point4')[0].value="N";
		}
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].AmtDeposited')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point4')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point23')[0].value="N";
		}
		else{
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point4')[0].value="Y";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].point23')[0].value="Y";

		}
		}

	}

	var tab5 = document.getElementById('schduleCGDed54GA');
	var noOfRows5 = tab5.rows.length;
	var sum5 = 0;
	var amt5 = 0;

	for (var i = 0; i < (noOfRows5 -3); i++) {
		amt5 = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].AmtClaimed')[0].value;
		sum5 = eval(parseInt(sum5, 10) + parseInt(coalesce(amt5), 10));
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point23')[0].value="N";
		document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point4')[0].value="N";
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].dateofOrginalAsset')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].AmtClaimed')[0].value!=""){
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].AmtDeposited')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].costOfAgLand')[0].value==""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].dateofAcquist')[0].value==""){
				j.setFieldError('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54GA');
				addErrorXHTML('','Please enter Cost and Date of purchase or Amount Deposited in Deduction claimed u/s 54GA',true);
		}
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].costOfAgLand')[0].value!=""&&document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].dateofAcquist')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point23')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point4')[0].value="N";
		}
		else if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].AmtDeposited')[0].value!=""){
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point4')[0].value="N";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point23')[0].value="N";
		}
		else{
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point4')[0].value="Y";
			document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].point23')[0].value="Y";

		}
		}

	}
	var totalDed=parseInt(sum, 10) + parseInt(sum1, 10) +	parseInt(sum2, 10) + parseInt(sum3, 10) +	parseInt(sum4, 10) + parseInt(sum5, 10);

	var totVal = document.getElementsByName('scheduleCGPost45.deducClaimInfo.totDeductClaim')[0];
	totVal.value = totalDed;


}

function validateCGSecwiseDed(){
	var arr = {'54':0,'54B':0,'54EC':0,'54D':0,'54G':0,'54GA':0,'54EE':0};
	var arrDed = {'54':0,'54B':0,'54EC':0,'54D':0,'54G':0,'54GA':0,'54EE':0};
	sumSectionWise('stcgDeduction1', arr);
	sumSectionWise('stcgDeduction2', arr);
	sumSectionWise('ltcgDeduction1', arr);
	sumSectionWise('scheduleCGltcg7', arr);
	sumSectionWise('scheduleCGltcg3_ded1',arr);
	/*sumSectionWise('scheduleCGltcg3',arr);*/

	sumSectionWise('ltcgDeduction54ec54ee1', arr);
	sumSectionWise('ltcgDeduction54ec54ee2', arr);
	sumSectionWise('ltcgDeduction54ec54ee4', arr);

/*	var len = document.getElementById('scheduleCGltcg3').tBodies.length;
	for(var i=0;i<len;i++){
		sumSectionWise('scheduleCGltcg3_ded'+(i+1), arr);
	}*/
	len = document.getElementById('stcg10pctTab').tBodies.length;
	for(var i=0;i<len;i++){
		sumSectionWise('stcg10pctTab_ded'+(i+1), arr);
	}


	sumSectionWiseCGTableD('schduleCGDed54B', arrDed,'54B');
	sumSectionWiseCGTableD('schduleCGDed54D', arrDed,'54D');
	sumSectionWiseCGTableD('schduleCGDed54EC', arrDed,'54EC');
	sumSectionWiseCGTableD('schduleCGDed54EE', arrDed,'54EE');
	sumSectionWiseCGTableD('schduleCGDed54G', arrDed,'54G');
	sumSectionWiseCGTableD('schduleCGDed54GA', arrDed,'54GA');

	//sumSectionWise('schduleCGDed', arrDed);

	if(arr['54']!=arrDed['54']){
		j.setFieldError('scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode','Deduction under 54 must match with deduction in table D');
		addErrorXHTML('','Deduction under 54 must match with deduction in table D',true);
	}
	if(arr['54B']!=arrDed['54B']){
		j.setFieldError('scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode','Deduction under 54B must match with deduction in table D');
		addErrorXHTML('','Deduction under 54B must match with deduction in table D',true);
	}
	if(arr['54EC']!=arrDed['54EC']){
		j.setFieldError('scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode','Deduction under 54EC must match with deduction in table D');
		addErrorXHTML('','Deduction under 54EC must match with deduction in table D',true);
	}
	if(arr['54EE']!=arrDed['54EE']){
		j.setFieldError('scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode','Deduction under 54EE must match with deduction in table D');
		addErrorXHTML('','Deduction under 54EE must match with deduction in table D',true);
	}
	if(arr['54D']!=arrDed['54D']){
		j.setFieldError('scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode','Deduction under 54D must match with deduction in table D');
		addErrorXHTML('','Deduction under 54D must match with deduction in table D',true);
	}
	if(arr['54G']!=arrDed['54G']){
		j.setFieldError('scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode','Deduction under 54G must match with deduction in table D');
		addErrorXHTML('','Deduction under 54G must match with deduction in table D',true);
	}
	if(arr['54GA']!=arrDed['54GA']){
		j.setFieldError('scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode','Deduction under 54GA must match with deduction in table D');
		addErrorXHTML('','Deduction under 54GA must match with deduction in table D',true);
	}
	if(arr){
		if(arr['54D']>0){
			document.getElementsByName('scheduleCG54D')[0].value="Y";
		}
		else{
			document.getElementsByName('scheduleCG54D')[0].value="N";

		}
		if(arr['54EC']>0){
			document.getElementsByName('scheduleCG54EC')[0].value="Y";
		}
		else{
			document.getElementsByName('scheduleCG54EC')[0].value="N";

		}
		if(arr['54EE']>0){
			document.getElementsByName('scheduleCG54EE')[0].value="Y";
		}
		else{
			document.getElementsByName('scheduleCG54EE')[0].value="N";

		}
		if(arr['54G']>0){
			document.getElementsByName('scheduleCG54G')[0].value="Y";
		}
		else{
			document.getElementsByName('scheduleCG54G')[0].value="N";

		}
		if(arr['54GA']>0){
			document.getElementsByName('scheduleCG54GA')[0].value="Y";
		}
		else{
			document.getElementsByName('scheduleCG54GA')[0].value="N";

		}
		var tab4 = document.getElementById('schduleCGDed54G');
		var noOfRows4 = tab4.rows.length;

		for (var i = 0; i < (noOfRows4 -3); i++) {
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].costOfAgLand')[0].value!=""||document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].dateofAcquist')[0].value!=""||document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54D[' + i + '].AmtDeposited')[0].value!=""){
			document.getElementsByName('scheduleCG54D')[0].value="Y";
		}
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].costOfAgLand')[0].value!=""||document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].dateofAcquist')[0].value!=""||document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54G[' + i + '].AmtDeposited')[0].value!=""){
			document.getElementsByName('scheduleCG54G')[0].value="Y";
		}
		if(document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].costOfAgLand')[0].value!=""||document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].dateofAcquist')[0].value!=""||document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls54GA[' + i + '].AmtDeposited')[0].value!=""){
			document.getElementsByName('scheduleCG54GA')[0].value="Y";
		}
		}
	}
}

function sumSectionWiseCGTableD(tableId, arr,section) {
	var tab = document.getElementById(tableId);
	var input = tab.getElementsByTagName("INPUT");
	for (var i = 0; i < input.length; i++) {
		if ((input[i].name.match('AmtClaimed$')) && input[i].value != '') {
		arr[section] = parseInt(arr[section])
					+ parseInt(coalesce(input[i].value ));

		}
	}
	return arr;
}

function sumSectionWise(tableId, arr){
	var tab = document.getElementById(tableId);
	var selects = tab.getElementsByTagName("SELECT");
	for(var i=0;i<selects.length;i++){
		if((selects[i].name.match('section$') || selects[i].name.match('deductedSecCode$')) && selects[i].value!=''){
			var name = selects[i].name;
			var str1 = name.substr(0,name.lastIndexOf('[')+1);
			var amt = document.getElementsByName(str1+i+'].amount')[0];
			/*if(tableId=='schduleCGDed'){
				amt = document.getElementsByName(str1+i+'].amtDed')[0];
			}*/
			arr[selects[i].value] = parseInt(arr[selects[i].value]) + parseInt(coalesce(amt.value));
		}
	}
	return arr;
}

/*function validateCGDedDate(){
	var tab = document.getElementById('schduleCGDed');
	var selects  = tab.getElementsByTagName('SELECT');
	for(var i=0; i<selects.length;i++){
		var name = selects[i].name;
		var index = name.substring(name.indexOf("[")+1,name.indexOf("]"));
		var dedDt = document.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls['+index+'].dateofAcquist')[0];
		if(dedDt!='' && selects[i].value!=''){
			if(isFirstDateBefore(dedDt.value, Cg_ded_start_date) || isFirstDateBefore(Cg_ded_end_date, dedDt.value)){
	            j.setFieldError(dedDt.name,'Date must be between 01/04/2015 and 31/03/2020');
	            addErrorXHTML(dedDt,'Date must be between 01/04/2015 and 31/03/2020',true);
			}
		}
	}
}*/

function enableScheduleOSOther(){
	var tabl = document.getElementById('schduleOsf');
		var allSelects = tabl.getElementsByTagName('SELECT');
		for(var i = 0; i < allSelects.length; i++) {
				var name = allSelects[i].name;
				var index = name.substring(name.indexOf('[')+1, name.indexOf(']'));
				if(allSelects[i].value=='Others'){
					document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].style.display='';
				} else {
					document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].style.display='none';
					document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ index +'].otherDesc')[0].value='';
				}
		}
}

function CheckHPShareProperty(){
	var totHp=eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent)-1);

	for(var i=0;i<totHp;i++){

		if(document.getElementsByName('scheduleHP.propertyDetails['+i+'].propCoOwnedFlg')[0].value=='YES') {
			var count = i;
			var AssessPerc = document.getElementsByName('scheduleHP.propertyDetails['+i+'].asseseeShareProperty')[0];
			var tab = document.getElementById('scheduleHP'+(++count));

			var sumOfCoOwner = parseFloat('0');

			var rowCount = tab.rows.length;

			for(var k=0;k<rowCount-2;k++) {

				sumOfCoOwner = sumOfCoOwner + (mulFloatBy100(document.getElementsByName('scheduleHP.propertyDetails['+i+'].coOwners['+k+'].percentShareProperty')[0].value));
			}


			if(checkHPShareSum((parseInt(sumOfCoOwner)+mulFloatBy100(AssessPerc.value))/100)){
				addErrorXHTML(AssessPerc,'Sum of Assessee Percentage and Co-owner(s) Percentage should be equal to 100 percent',true);
				j.setFieldError('scheduleHP.propertyDetails['+i+'].asseseeShareProperty','Sum of Assessee Percentage and Co-owner(s) Percentage should be equal to 100 percent');
			}
		}
	}
}

function checkHPShareSum(total) {
	if(total>=99.9 && total<=100) {
		return false;
	}
	return true;
}
function calcPL54(){
	document.getElementsByName('partapl.noBooksOfAccPL.grossReceipt')[0].value=getAmt('partapl.noBooksOfAccPL.grossReceipt.payeeMode')+getAmt('partapl.noBooksOfAccPL.grossReceipt.otherMode');
}
function CheckPLExpenses(){

var grossRec = document.getElementsByName('partapl.noBooksOfAccPL.grossReceipt')[0].value;
var grosProf = document.getElementsByName('partapl.noBooksOfAccPL.grossProfit')[0].value;
var expnses = document.getElementsByName('partapl.noBooksOfAccPL.expenses')[0].value;
if((grossRec+grosProf)<=0 && expnses>0){
	addErrorXHTML(document.getElementsByName('partapl.noBooksOfAccPL.expenses')[0],
			'In order claim Expenses, Either Gross Receipts or Gross Profit must be greater than zero',true);
		j.setFieldError('partapl.noBooksOfAccPL.expenses',
			'In order claim Expenses, Either Gross Receipts or Gross Profit must be greater than zero');
}

}

function CheckProfExpenses(){
	var grossRec = document.getElementsByName('partapl.noBooksOfAccPL.grossReceiptProf')[0].value;
	var grosProf = document.getElementsByName('partapl.noBooksOfAccPL.grossProfitProf')[0].value;
	var expnses = document.getElementsByName('partapl.noBooksOfAccPL.expensesProf')[0].value;
	if((grossRec+grosProf)<=0 && expnses>0){
		addErrorXHTML(document.getElementsByName('partapl.noBooksOfAccPL.expensesProf')[0],
				'In order claim Expenses, Either Gross Receipts or Gross Profit must be greater than zero',true);
			j.setFieldError('partapl.noBooksOfAccPL.expensesProf',
				'In order claim Expenses, Either Gross Receipts or Gross Profit must be greater than zero');
	}

}

function CheckBFLAUDMismatch(){
if(coalescePath('scheduleBFLA.totalBFLossSetOff.totUnabsorbedDeprSetoff')
		!= coalescePath('itrScheduleUD.totalamtDepCurYr')){
		addErrorXHTML(document.getElementsByName('itrScheduleUD.totalamtDepCurYr')[0],
			'This figure must match with Total of brought forward loss set off in BFLA',true);
		j.setFieldError('itrScheduleUD.totalamtDepCurYr',
			'This figure must match with Total of brought forward loss set off in BFLA');
	}

	if(coalescePath('scheduleBFLA.totalBFLossSetOff.totAllUs35Cl4Setoff')
		!= coalescePath('itrScheduleUD.amountASACYIncome')){
		addErrorXHTML(document.getElementsByName('itrScheduleUD.amountASACYIncome')[0],
			'This figure must match with Total of brought forward loss set off in BFLA',true);
		j.setFieldError('itrScheduleUD.amountASACYIncome',
			'This figure must match with Total of brought forward loss set off in BFLA');
	}
}

function checkEmptySchUDAmt(){
var tab1 = document.getElementById('scheduleUD');
var rowCount = tab1.rows.length;

	for(var i = 0; i < rowCount - 5; i++) {
		var assYr = document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].assYr')[0].value;
		if(assYr != '' && assYr != undefined && assYr !=null){
			var amtBFUD = document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtBFUD')[0];
			var amountBFUA = document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountBFUA')[0];

			var amtDepCurYr = document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amtDepCurYr')[0];
			var amountASACYIncome = document.getElementsByName('itrScheduleUD.scheduleUD['+i+'].amountASACYIncome')[0];

			if(amtBFUD.value == ''&& amountBFUA.value == ''){
				addError(amtBFUD,'Please enter amount of brought forward unabsorbed depreciation or Allowance u/s 35(4)',true);
				j.setFieldError(amtBFUD.name,'Please enter amount of brought forward unabsorbed depreciation or Allowance u/s 35(4)');
			} else {
			if(amtBFUD.value>0 && amtDepCurYr.value==''){
				addError(amtDepCurYr,'Please enter amount of depreciation set-off against the current year income u/s 35(4)',true);
				j.setFieldError(amtDepCurYr.name,'Please enter amount of depreciation set-off against the current year income u/s 35(4)');
			}
			if(amountBFUA.value>0 && amountASACYIncome.value==''){
				addError(amountASACYIncome,'Please enter amount of allowance set-off against the current year income u/s 35(4)',true);
				j.setFieldError(amountASACYIncome.name,'Please enter amount of allowance set-off against the current year income u/s 35(4)');
			}
			}

		}
	}
}

function populateAMTC(){
	try{
	var taxSec115JC=$('[name="scheduleAMTC.taxSection115JC"]')[0];
	var taxProvAct=$('[name="scheduleAMTC.taxOthProvision"]')[0];
	var amtCreditAvail=$('[name="scheduleAMTC.amtTaxCreditAvailable"]')[0];
	var partBttiTotalTax=$('[name="partBTTI.computationOfTaxLiability.taxPayableOnDeemedTI.totalTax"]')[0];
	var partBttiGrossTaxLiability=$('[name="partBTTI.computationOfTaxLiability.grossTaxLiability"]')[0];

	taxSec115JC.value=partBttiTotalTax.value;
	taxProvAct.value=partBttiGrossTaxLiability.value;

	if(eval(parseInt(coalesce(taxProvAct.value),10)) > eval(parseInt(coalesce(taxSec115JC.value),10))){

		amtCreditAvail.value=eval(parseInt(coalesce(taxProvAct.value),10))-eval(parseInt(coalesce(taxSec115JC.value),10));
	}else{
		amtCreditAvail.value=parseInt('0',10);
	}

	var amtCreditFwd=document.getElementsByName('scheduleAMTC.scheduleAMTCUtil.CYamtCreditFwd')[0];
	var taxRelief=document.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.totTaxRelief')[0];
	var grossTaxLiab=document.getElementsByName('partBTTI.computationOfTaxLiability.grossTaxLiability')[0];
	var taxlaib=parseInt(coalesce(taxRelief.value),10)-parseInt(coalesce(grossTaxLiab.value),10);
	var taxlaibsub=parseInt(coalesce(taxRelief.value),10)-parseInt(coalesce(grossTaxLiab.value),10);
	if(taxlaibsub > parseInt('0',10)){
		amtCreditFwd.value = zeroOrMore((coalesce(taxSec115JC.value)-coalesce(taxProvAct.value))- coalesce(taxlaib));
		if(amtCreditFwd.value < parseInt('0',10)){
			amtCreditFwd.value=parseInt('0',10);
		}
		alert("amtCreditFwd"+amtCreditFwd);
	}
	else{
		amtCreditFwd.value = zeroOrMore(coalesce(taxSec115JC.value)-coalesce(taxProvAct.value));
	}


	}catch(e){
		alert('error in populateAMTC:-' +e);
	}
}

/*function checkSI5BWarning(){

	if(document.getElementsByName('scheduleSI.splCodeRateTax[2].splRateInc')[0].value>0){

		addErrorXHTML('','Please ensure that income u/s 115B forms part of Sch BP',true);
	}
}
*/
function checkSIAmount(){
var taxableInc1 = document.getElementsByName('scheduleSI.splCodeRateTax[0].taxableInc')[0]; taxableInc1.value = coalesce(taxableInc1.value);
var splRateInc1 = document.getElementsByName('scheduleSI.splCodeRateTax[0].splRateInc')[0]; splRateInc1.value = coalesce(splRateInc1.value);
if(parseInt(taxableInc1.value,10) > parseInt(splRateInc1.value,10)){
			addError(taxableInc1,'Taxable Income after adjusting cannot be greater than Income shown in Schedule OS',true);
			j.setFieldError(taxableInc1.name,'Taxable Income after adjusting cannot be greater than Income shown in Schedule OS');

		}
}

function setSch80HiddenField(tableId,SecDesc){
	var tab = document.getElementById(tableId);
	var inputs = tab.getElementsByTagName('INPUT');

	for(var i=0;i<inputs.length;i++){

		if(inputs[i].name.match('SectionDesc$')){
			inputs[i].value=SecDesc;
		}
	}

}

function makePartAGenRowOneMandate(){
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0];
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0];
	var nameOfMem = document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerOrMemberName')[0];
	if( (substatus.value==7 || substatus.value==13)  && (document.getElementsByName('partAGEN2.partnerOrMemberInfo[0].partnerOrMemberName')[0].value == '')){

		addError(nameOfMem,'Please enter the Name',true);
		j.setFieldError(nameOfMem.name,'Please enter the Name');

	}


}

function checkLLIPNForTwoLLP(){

	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0];
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0];


	var tab = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
	var inputs = tab.getElementsByTagName('input');
	var foreignPerc = 0;
	var otherPerc = 0;
	var count = 0;
	var elem;
	if(substatus.value==5){

	for(var i =0; i < inputs.length; i++){
		if(inputs[i].value!='' && inputs[i].name.match('designPartnerIdNumber$')){
			count++;
		}else if(inputs[i].name.match('designPartnerIdNumber$')){
			elem = inputs[i];
		}
	}
	if(count<2){
		addError(elem,'Please enter Designated Partner Identification Number.',true);
		j.setFieldError(elem.name,'Please enter Designated Partner Identification Number.');
		}
	}
}


function makeSurchargeCessEditable(){

	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	if( status == '14' ){
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0].readOnly = true;
	}else if( substatus == '8'){
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0].readOnly = false;
	} else{
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0].readOnly = true;
	}

}
function ifscCheckNRIForeignComp(){


	var resStatus = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0];
	var ifscCode = document.getElementsByName('itr.refund.depositToBankAccount.iFSCCode')[0];

	if(resStatus.value=='RES'){
		if(ifscCode.value=='NNNN0NNNNNN'){
			addError(ifscCode,'Mention a valid IFS code',true);
			j.setFieldError(ifscCode.name,'Mention a valid IFS code');

		}

	}
}

//To get Ifsc Bank Details
function getIfscBankDetails(elem) {

	var position = parseInt(elem.name.substring(elem.name.indexOf("[") + 1,	elem.name.indexOf("]")));

	var ifscCode = document.getElementsByName('itr.scheduleBA[' + position + '].ifscCode')[0].value;

	document.getElementsByName('itr.scheduleBA[' + position + '].bankName')[0].value = main.getBankName(ifscCode);

}


function getIfscBankName(field) {

	document.getElementsByName('itr.refund.depositToBankAccount.bankName')[0].value = main.getBankName(field.value);

}

//To enable point FA-E fields
function enableFieldsForPointE(tableId) {

	var tab = document.getElementById(tableId);
	var rows = tab.getElementsByTagName('tr');
	var rowCount = rows.length;

	for ( var i = 0; i < rowCount - 4; i++) {
		var selectedOptionId = document
				.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
						+ i + '].taxableIncomeFlag')[0];
		var selectedOption = selectedOptionId.options[selectedOptionId.selectedIndex].value;

		if (selectedOption == 'Y') {
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].interestInAccount')[0].disabled = false;
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].amount')[0].disabled = false;
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].scheduleOffered')[0].disabled = false;
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].itemNo')[0].disabled = false;

		} else {
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].interestInAccount')[0].disabled = true;
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].amount')[0].disabled = true;
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].scheduleOffered')[0].disabled = true;
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].itemNo')[0].disabled = true;

			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].interestInAccount')[0].value = '';
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].amount')[0].value = '';
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].scheduleOffered')[0].value = '';
			document
					.getElementsByName('scheduleFA.detailsOfAccntsHvngSigningAuth['
							+ i + '].itemNo')[0].value = '';

		}
	}
}

//To enable point F fields
function enableFieldsForPointF(tableId) {

	var tab = document.getElementById(tableId);
	var rows = tab.getElementsByTagName('tr');
	var rowCount = rows.length;

	for ( var i = 0; i < rowCount - 4; i++) {
		var selectedOptionId = document
				.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
						+ i + '].trustIncomeFlag')[0];
		var selectedOption = selectedOptionId.options[selectedOptionId.selectedIndex].value;

		if (selectedOption == 'Y') {
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].trustIncome')[0].disabled = false;
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].amount')[0].disabled = false;
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].scheduleOffered')[0].disabled = false;
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].itemNo')[0].disabled = false;

		} else {
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].trustIncome')[0].disabled = true;
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].amount')[0].disabled = true;
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].scheduleOffered')[0].disabled = true;
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].itemNo')[0].disabled = true;

			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].trustIncome')[0].value = '';
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].amount')[0].value = '';
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].scheduleOffered')[0].value = '';
			document
					.getElementsByName('scheduleFA.detailsOfTrustOutIndiaTrustee['
							+ i + '].itemNo')[0].value = '';

		}
	}
}

// /To enable point G fields
function enableFieldsForPointG(tableId) {

	var tab = document.getElementById(tableId);
	var rows = tab.getElementsByTagName('tr');
	var rowCount = rows.length;

	for ( var i = 0; i < rowCount - 4; i++) {
		var selectedOptionId = document
				.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
						+ '].trustIncomeFlag')[0];
		var selectedOption = selectedOptionId.options[selectedOptionId.selectedIndex].value;

		if (selectedOption == 'Y') {
			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].amount')[0].disabled = false;
			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].scheduleOffered')[0].disabled = false;
			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].itemNo')[0].disabled = false;

		} else {

			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].amount')[0].disabled = true;
			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].scheduleOffered')[0].disabled = true;
			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].itemNo')[0].disabled = true;

			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].amount')[0].value = '';
			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].scheduleOffered')[0].value = '';
			document.getElementsByName('scheduleFA.detailsOfOtherIncome[' + i
					+ '].itemNo')[0].value = '';
		}
	}
}

//on change of part BTTI refund
function onChngBTTIRefund() {
	var typeHP = document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value;
	if (typeHP == 'YES') {
		addErrorXHTML('',
				'Schedule FA is mandatory. Ensure all the details in Schedule FA are filled');
	}
}

//To set other gross
function setOtherGrossSource() {
	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	var statusOrCompanyType = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

	var tab = document.getElementById('schduleOsf');
	var rowCount = tab.rows.length - 4;

	var allSectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
			'5A1aiiab', '5A1aiiac', '5A1aiii', '5A1bA', '5A1bB', '5AC1ab',
			 '5AD1i', '5AD1iP', '5BBA','5BBDA', '5BBC', '5BBF', '5BBG', '1','5AB1a',
			'Others'];

	if (status == 'RES' ) {
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
				'5A1aiiab', '5A1aiiac','5A1aiii', '5A1bA', '5A1bB', '5AC1ab','5AB1a',
				'5BBA'];
		removeSection(sectionArray, rowCount);

	} else if (status == 'NRI') {
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = ['5BBDA','5BBF'];
		removeSection(sectionArray, rowCount);

	}

	/*if(status == 'RES' && statusOrCompanyType == '1'){
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
				'5A1aiiab', '5A1aiiac','5A1aiii', '5A1bA', '5A1bB', '5AC1ab','5AB1a',
				'5BBA'];
		removeSection(sectionArray, rowCount);
		}*/
}

//To set other sections newly added

//To set other gross
function setOtherGrossSourceOnChange() {
	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	var tab = document.getElementById('schduleOsf');
	var rowCount = tab.rows.length - 4;

	var allSectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
			'5A1aiiab', '5A1aiiac', '5A1aiii', '5A1bA', '5A1bB', '5AC1ab',
			 '5AD1i', '5AD1iP', '5BBA','5BBDA', '5BBC', '5BBF', '5BBG', '1','5AB1a',
			'Others'];



	if (status == 'RES') {
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
				'5A1aiiab', '5A1aiiac','5A1aiii', '5A1bA', '5A1bB', '5AC1ab','5AB1a',
				'5BBA'];
		removeSectionOnChange(sectionArray, rowCount);

	} else if (status == 'NRI') {
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = ['5BBDA','5BBF'];
		removeSectionOnChange(sectionArray, rowCount);

	}


}

function setOtherGrossSourceOnChangeDTAA() {

	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	var tab = document.getElementById('scheduleOsNriIncTaxDtaa');
	var rowCount = tab.rows.length - 2;

	var allSectionArray = [ '56i', '56', '5A1ai', '5A1aii', '5A1aiia',
			'5A1aiiaa', '5A1aiiab', '5A1aiiac', '5A1aiii', '5A1bA', '5A1bB',
			'5AC1ab', '5AD1i', '5AD1iP', '5BBA', '5BBG', '5BBDA',
			'5BBF', '1', '5BBC','5AB1a','5BB'];

	if (status == 'RES'){
		addAllOptionsDTAA(allSectionArray, rowCount);
		var sectionArray =['5A1ai','5A1aii','5A1aiia','5A1aiiaa','5A1aiiac','5A1aiiab','5A1aiii','5A1bA','5A1bB','5AC1ab','5BBA','5AB1a'];
		removeSectionOnChangeDTAA(sectionArray, rowCount);
	} else if (status == 'NRI') {
		addAllOptionsDTAA(allSectionArray, rowCount);
		var sectionArray = ['5BBDA','5BBF'];
		removeSectionOnChangeDTAA(sectionArray, rowCount);
	}

}
function removeSectionOnChangeDTAA(sectionArray, rowCount) {

	try {
		for (var i = 0; i < rowCount ; i++) {

			var selectsLength = document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ i + '].itemIncluded')[0].options.length - 1 ;


			for (var k = selectsLength; k > 0; k--) {
				if (document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ i + '].itemIncluded')[0].options[k] != null
						&& sectionArray.indexOf(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ i + '].itemIncluded')[0].options[k].value) != -1) {
					document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ i + '].itemIncluded')[0].remove(k);

				}
			}
		}
		calcITR5();

	} catch (e) {
		alert('exception in removeSection' + e.stack);
	}
}

function setOtherGrossSourceOnChangeCGSTCG() {
	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	var tab = document.getElementById('scheduleStcgDtaa');
	var rowCount = tab.rows.length - 2;

	var allSectionArray = [ 'A1e','A2c' ,'A3e_111A', 'A3e_115AD', 'A4a', 'A4b',
			'A5e', 'A6g', 'A7'];

	if (status == 'RES') {
		addAllOptionsCGSTCG(allSectionArray, rowCount);
		var sectionArray = [ 'A4a', 'A4b', 'A5e'];
		removeSectionOnChangeCGSTCG(sectionArray, rowCount);
	}  else {
		addAllOptionsCGSTCG(allSectionArray, rowCount);
	}

}


function addAllOptionsCGSTCG(allSectionArray, rowCount) {
	for (var i = 0; i < rowCount; i++) {
		var srcDesc = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
						+ i + '].itemIncluded')[0];
		var selectedValue = srcDesc.value;
		removeAll(srcDesc);
		for (var k = 0; k < allSectionArray.length; k++) {
			var optn = document.createElement("option");
			optn.text = getSectionTextMap(allSectionArray[k]);
			optn.value = allSectionArray[k];
			srcDesc.options.add(optn);
		}
		srcDesc.value = selectedValue;
	}
}



function removeSectionOnChangeCGSTCG(sectionArray, rowCount) {
	try {
		for (var i = 0; i < rowCount; i++) {
			var selectsLength = document
					.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
							+ i + '].itemIncluded')[0].options.length - 1;
			for (var k = selectsLength; k > 0; k--) {
				if (document
						.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
								+ i + '].itemIncluded')[0].options[k] != null
						&& sectionArray
								.indexOf(document
										.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
												+ i + '].itemIncluded')[0].options[k].value) != -1) {

					document
							.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
									+ i + '].itemIncluded')[0].remove(k);

				}
			}
		}
		calcITR5();

	} catch (e) {
		alert('exception in removeSectionOnChangeCGSTCG' + e.stack);
	}
}



////////

function setOtherGrossSourceOnChangeCGLTCG() {
	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	var tab = document.getElementById('scheduleLtcgDtaa');

	var rowCount = tab.rows.length - 2;

	var allSectionArray = [ 'B1e', 'B2e', 'B3e', 'B4e' ,'B5c', 'B6e_21ciii','B6e_5AB1b','B6e_5AC1c','B6e_5ADiii','B7e','B8'];

	if (status == 'RES') {
		addAllOptionsCGLTCG(allSectionArray, rowCount);

		var sectionArray = [ 'B5c','B6e_21ciii', 'B6e_5AB1b', 'B6e_5AC1c', 'B6e_5ADiii','B7e'];
		removeSectionOnChangeCGLTCG(sectionArray, rowCount);
	}  else {
		addAllOptionsCGLTCG(allSectionArray, rowCount);
	}

}

function addAllOptionsCGLTCG(allSectionArray, rowCount) {
	for (var i = 0; i < rowCount; i++) {
		var srcDesc = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
						+ i + '].itemIncluded')[0];
		var selectedValue = srcDesc.value;
		removeAll(srcDesc);
		for (var k = 0; k < allSectionArray.length; k++) {
			var optn = document.createElement("option");
			optn.text = getSectionTextMap(allSectionArray[k]);
			optn.value = allSectionArray[k];
			srcDesc.options.add(optn);
		}
		srcDesc.value = selectedValue;
	}
}


//////


function removeSectionOnChangeCGLTCG(sectionArray, rowCount) {
	try {
		for (var i = 0; i < rowCount; i++) {
			var selectsLength = document
					.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
							+ i + '].itemIncluded')[0].options.length - 1;
			for (var k = selectsLength; k > 0; k--) {
				if (document
						.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
								+ i + '].itemIncluded')[0].options[k] != null
						&& sectionArray
								.indexOf(document
										.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
												+ i + '].itemIncluded')[0].options[k].value) != -1) {

					document
							.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
									+ i + '].itemIncluded')[0].remove(k);

				}
			}
		}
		calcITR5();

	} catch (e) {
		alert('exception in removeSectionOnChangeCGLTCG' + e.stack);
	}
}
function addAllOptionsDTAA(allSectionArray, rowCount) {
	for (var i=0; i<rowCount;  i++) {
		var srcDesc = document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+ i + '].itemIncluded')[0];
		var selectedValue = srcDesc.value;
		removeAll(srcDesc);
		for(var k=0; k<allSectionArray.length; k++) {
			var optn = document.createElement("option");
			optn.text = getSectionTextMap(allSectionArray[k]);
			optn.value = allSectionArray[k];
			srcDesc.options.add(optn);
		}
		srcDesc.value = selectedValue;
	}
}
//To add all options
function addAllOptions(allSectionArray, rowCount) {
	for ( var i = 1; i < rowCount; i++) {
		var srcDesc = document
				.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
						+ i + '].sourceDescription')[0];
		var selectedValue = srcDesc.value;
		removeAll(srcDesc);
		for ( var k = 0; k < allSectionArray.length; k++) {
			var optn = document.createElement("option");
			optn.text = getSectionTextMap(allSectionArray[k]);
			optn.value = allSectionArray[k];
			srcDesc.options.add(optn);
		}
		srcDesc.value = selectedValue;
	}
}

//To remove section
function removeSection(sectionArray, rowCount) {
	try {
		for ( var i = 1; i < rowCount; i++) {
			var selectsLength = document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ i + '].sourceDescription')[0].options.length;
			for ( var k = selectsLength; k > 0; k--) {
				if (document
						.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
								+ i + '].sourceDescription')[0].options[k] != null
						&& sectionArray
								.indexOf(document
										.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
												+ i + '].sourceDescription')[0].options[k].value) != -1) {
					document
							.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
									+ i + '].sourceDescription')[0].remove(k);
				}
			}
		}
	} catch (e) {
		alert('exception in removeSection' + e.stack);
	}
}


//To remove Sections on change of status newly added

function removeSectionOnChange(sectionArray, rowCount) {
	try {

		for (var i = 1; i < rowCount; i++) {
			var selectsLength = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ i + '].sourceDescription')[0].options.length;
			for (var k = selectsLength; k > 0; k--) {
				if (document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ i + '].sourceDescription')[0].options[k] != null
						&& sectionArray.indexOf(document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ i + '].sourceDescription')[0].options[k].value) != -1) {

					var NRI_value= document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ i + '].sourceDescription')[0].value ;

					if (NRI_value=='5BBF' || NRI_value=='5BBDA')
						{
						document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ i + '].sourceAmount')[0].value=0;
						}
					document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+ i + '].sourceDescription')[0].remove(k);

				}
			}
		}
		calcITR5();

	} catch (e) {
		alert('exception in removeSectionOnChange ' + e.stack);
	}
}


//To delete all options
function removeAll(selectbox) {

	for ( var i = selectbox.options.length - 1; i > 0; i--) {
		selectbox.removeChild(selectbox[i]);

	}
}

//To enable tables for NRI
function enableTableForNRI(element, value, tableId) {

	var flag = document.getElementsByName(element)[0].value;
	var tabId = "#" + tableId;

	$(tabId).find(':input').prop('disabled', true);
	$(tabId).find('.addbtn').prop('hidden', true);

	if (flag == value) {
		$(tabId).find('.addbtn').prop('hidden', false);
		$(tabId).find(':input').prop('disabled', false);
	} else {
		$(tabId).find('[type=\"checkbox\"]').attr('checked', 'checked');
		deleteRowTable(tableId, 1, 1);
		$(tabId).find(':input').prop('disabled', true);
		$(tabId).find('.addbtn').prop('hidden', true);
	}
}

//To check dropdown
function checkDropdownSelectedin1d() {
	var table = document.getElementById('scheduleOsNriIncTaxDtaa');
	var rowCount = table.rows.length - 2;
	var itemIncluded = [];

	var tabl = document.getElementById('schduleOsf');
	var rowCountTab1 = tabl.rows.length - 4;
	var sourceDescriptionMap = [];

	for(var i=0; i<rowCount; i++) {
		var section = document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+i+'].itemIncluded')[0];
		if(section.value != '' && section.value != '56i' && section.value != '56' && itemIncluded.indexOf(section.value) == -1) {
			itemIncluded.push(section.value);
		}
	}

	for(var i=0; i<rowCountTab1; i++) {

		var sourceDescription = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+i+'].sourceDescription')[0];

		if(sourceDescription.value != '' && sourceDescriptionMap.indexOf(sourceDescription.value) == -1) {
			sourceDescriptionMap.push(sourceDescription.value);
		}
	}

	var index = 0;

	for(var i=0; i<itemIncluded.length; i++) {

		if(sourceDescriptionMap.indexOf(itemIncluded[i]) == -1) {
			for(var k=0; k<rowCount; k++) {
				var section = document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+k+'].itemIncluded')[0];

				if(section.value != '' && section.value == itemIncluded[i] ) {

					index = k;
				}
			}
			addErrorXHTML(document.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+index+'].itemIncluded')[0]  ,'Please select this section in table 1d.',true);
			j.setFieldError('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['+index+'].itemIncluded','Please select this section in table 1d.');
		}
	}
}

//Validate Pure Schedule SI Tax.
function calculatePureSITax(){

	var rowCount1=countRowInTable('scheduleSI.splCodeRateTax','splRateInc');
	var sum = 0;
	var sumWithDtaa = 0;
	for(var i = 0; i < rowCount1; i++) {

		var section = document.getElementsByName('scheduleSI.splCodeRateTax[' + i +'].secCode')[0].value;

		if(section=='1A'||section=='21'||section=='22'||section=='21ciii'||section=='5AC1c'||section=='5ACA1b'||section=='5ADii'||section=='5ADiii'||section=='5Eacg'||section=='5AD1biip'||section=='5Eb'||section=='5AB1b'){
			sum = parseInt(sum) + parseInt(document.getElementsByName('scheduleSI.splCodeRateTax['+i+'].splRateIncTax')[0].value);
		}

	}
	sumWithDtaa = sum;
	return parseInt(sumWithDtaa);

}

//Calculate Virtual Tax Payable on PartB-TI.
function calcVirtualTaxPayableOnTI(){
	 try{
	 var totInc = document.getElementsByName('partBTI.aggregateIncome')[0];
	 var presInc44AD = document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD')[0];
	 presInc44AD.value = coalesce(parseInt(presInc44AD.value,10));

	 var resStatus=document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

		var virtualTotInc=parseInt('0',10);;
		if(resStatus=='RES' || resStatus=='NOR'){
			//virtualTotInc = eval(parseInt(totInc.value,10) - parseInt( presInc44AD.value ,10));
			virtualTotInc = eval(parseInt(totInc.value,10));//17-18
		}else{
			virtualTotInc = parseInt(totInc.value,10);
		}

	  var virtualTaxPayable;

	  var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

		if((taxPayer=='1') && (resStatus == 'RES' )){

			var temp = (eval(virtualTotInc)) * eval('0.30');

			virtualTaxPayable = Math.round(eval(temp));
		}

		surcharge = coalesce(parseInt(surcharge));

		virtualTaxPayable= parseInt(virtualTaxPayable) - parseInt(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0].value) + parseInt(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].value);

		var virtualEduCess= Math.round(eval(parseInt(virtualTaxPayable,10) + parseInt(surcharge))* eval('0.03'));
		var virtualTotalTaxWithEduCess = eval(parseInt(virtualTaxPayable)) + parseInt(surcharge) + eval(parseInt(virtualEduCess));

		var sec9091 = document.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.totTaxRelief')[0]; sec9091.value = coalesce(sec9091.value);
		var virtualBalTaxPayable = Math.round(eval(parseInt(virtualTotalTaxWithEduCess ,10)-parseInt(sec9091.value ,10)));


		if(virtualBalTaxPayable < eval('0')) {
			virtualBalTaxPayable = '0';
		}

		return parseInt(virtualBalTaxPayable);
		}catch(e){
			alert('Exception in calcVirtualTaxPayableOnTI = ' + e.stack);
		}
}

//Check if Marginal Relief Applicable.
function isMarginalRelfApplcblCheck(){
	var surcharge = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.totalSurcharge')[0];
	var taxPybl = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc')[0];
	if(parseInt(surcharge.value) > 0){
		if(parseInt(surcharge.value ) != parseInt(taxPybl.value* 0.15)){
			return true;
		}
	}
	return false;
}

function percentageShareMan(){
	var prevYrMemPartChange = document.getElementsByName('partAGEN2.prevYrMemPartChange')[0].value;
	var statusOrCompanyType = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatusOrCompanyType = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	var tabl = document.getElementById('partnerTableId');
	var rowCountTab1 = tabl.rows.length - 2;

	for ( var i = 0; i < rowCountTab1; i++) {
		var sharePercentage = document.getElementsByName('partAGEN2.prevYrMemPart.prevYrMemPartDtls['+ i + '].sharePercentage')[0].value;
	      if((prevYrMemPartChange =='Y') && (statusOrCompanyType == '1'|| substatusOrCompanyType == '5') && (sharePercentage == '') ){
	  		j.setFieldError('partAGEN2.prevYrMemPart.prevYrMemPartDtls['+ i + '].sharePercentage','Please enter Percentage of share');
			addErrorXHTML(document.getElementsByName('partAGEN2.prevYrMemPart.prevYrMemPartDtls['+ i + '].sharePercentage')[0],'Please enter Percentage of share',true);

	    }
	}


}

//To enable/disable tables based on the value
function enableTable(element, value, tableId){

	var flag =document.getElementsByName(element)[0].value;
	var tabId = "#"+tableId;

	$(tabId).find(':input').prop('disabled', true);
	$(tabId).find('.addbtn').prop('hidden', true);

	if(flag==value){
			$(tabId).find('.addbtn').prop('hidden', false);
			$(tabId).find(':input').prop('disabled', false);
		}else{
			$(tabId).find('[type=\"checkbox\"]').attr('checked','checked');
			if(tableId == 'partnerTableId') {
				deleteRowTable(tableId,1,1);
			}
			else {
				deleteRowTable(tableId,2,1);
			}
			$(tabId).find(':input').prop('disabled', true);
			$(tabId).find('.addbtn').prop('hidden', true);
		}
}

function enableTableWithOutCB(element, value, tableId){
	var flag =document.getElementsByName(element)[0].value;
	var tabId = "#"+tableId;
	if(flag == value){
		$(tabId).find(':input').prop('disabled', false);
		$(tabId).find('.addbtn').prop('hidden', false);
	}else{
		$(tabId).find(':input').prop('disabled', true);
		$(tabId).find('.addbtn').prop('hidden', true);
		$(tabId).find(':input').prop('value', '');
		if(tableId == 'stcg10pctTab') {
			deleteRowToCG('stcg10pctTab');
		}
	}
	calCGA7TotalSum();
	calCGPointB8Total();
}

/*function enableNRItables(){
	 enableTableForNRI('partAGEN1.filingStatus.residentialStatus','NRI','scheduleStcgDtaa');
	 enableTableForNRI('partAGEN1.filingStatus.residentialStatus','NRI','scheduleLtcgDtaa');
	 enableTableForNRI('partAGEN1.filingStatus.residentialStatus','NRI','scheduleOsNriIncTaxDtaa');
	 enableTableWithOutCB('partAGEN1.filingStatus.residentialStatus','NRI','stcg10pctTab');
}
*/
//To display 92CD Verification based on the filing section
function display92CDVerification(type) {

	var fileSec=document.getElementsByName('partAGEN1.filingStatus.returnFileSec.incomeTaxSec')[0].value;

	if(fileSec=='19') {
		   document.getElementById('92cdVerification').style.display='';
	   } else {
		   document.getElementById('92cdVerification').style.display='none';
	   }

	if(type != 'onload' && fileSec == '19'){
		addErrorXHTML('','To file return u/s 92CD, post login in e-Filing portal, go to "e-File" --> "Income Tax Return" and select the applicable AY, ITR and other options.');
	}
	if(type != 'onload' && fileSec == '20'){
		addErrorXHTML('','Section 139 read with section 119(2)(b) for AY 2018-19 can be filed only after 31st March 2019.');
	}
}

// To calculate total Renumeration Paid/ Payable and poulate to 38 of PL
function calculateRemurationPaid(){
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
	var sum = 0;
	if(substatus == '8' || status == '2' || substatus == '15' ||  substatus == '16' || substatus == '17' || substatus == '4' || substatus == '7' || status == '9' ||substatus == '13' ||substatus == '11'|| substatus == '12') {
		document.getElementsByName('partapl.debitsToPL.debitPlAcnt.salRemuneration')[0].readOnly=true;
	}
	else {
		var tab1 = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
		var noOfRows=tab1.rows.length;

		var amt = 0;

		for ( var i = 0; i < (noOfRows-4); i++) {
			amt = document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].remunerationPaid')[0].value;
			sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
		}
		document.getElementsByName('partapl.debitsToPL.debitPlAcnt.salRemuneration')[0].readOnly=false;
		//document.getElementsByName('partapl.debitsToPL.debitPlAcnt.salRemuneration')[0].value = parseInt(sum,10);
	}
	var salRemuneration = document.getElementsByName('partapl.debitsToPL.debitPlAcnt.salRemuneration')[0];
	if(salRemuneration.oldVal != sum){
		salRemuneration.oldVal = sum;
		salRemuneration.value = sum;
	}

}

function disableSebiRegNo() {
	var fiiFpiFlag = document.getElementsByName("partAGEN1.filingStatus.fiiFpiFlg")[0].value;

	if (fiiFpiFlag == 'Y') {
		document.getElementsByName("partAGEN1.filingStatus.sebiRegnNo")[0].disabled = false;
	} else {
		document.getElementsByName("partAGEN1.filingStatus.sebiRegnNo")[0].disabled = true;
		document.getElementsByName("partAGEN1.filingStatus.sebiRegnNo")[0].value="";
	}

}

//Calculate a6 Total Sum.
function calCGA7TotalSum() {

	var tab1 = document.getElementById('scheduleStcgunUtilizedCapGain54');
	var noOfRows = tab1.rows.length;


	var sum = 0;
	for (var i = 0; i < (noOfRows - 3); i++) {
		var amt = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['
						+ i + '].amountUnUtilized')[0].value;
		sum = eval(parseInt(sum, 10) + parseInt(coalesce(amt), 10));
	}
	var total = eval(parseInt(sum, 10)
			+ parseInt(
					coalesce(document
							.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.amtDeemedStcg')[0].value),
					10));
	document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa')[0].value = total;
}

//Calculate Point B8 Total.
function calCGPointB8Total() {

	var tab1 = document.getElementById('scheduleLtcgunUtilizedCapGain54');
    var noOfRows=tab1.rows.length;
	var sum = 0;
	for ( var i = 0; i < (noOfRows-3); i++) {
		var amt = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['+i+'].amountUnUtilized')[0].value;
			sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));
	}
	var total = eval(parseInt(sum,10)
				+ parseInt(coalesce(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54.amtDeemedLtcg')[0].value),10));
	document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0].value = total;
}
function populateRateOS()

{
	var tab = document.getElementById('scheduleOsNriIncTaxDtaa');
	var noOfRows = tab.rows.length;

	for (var i = 0; i < (noOfRows - 2); i++) {

		var rateAsPerTreaty = parseFloat(document
				.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
						+ i + '].rateOfTax')[0].value);

		var rateAsPerITAct = parseFloat(document
				.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
						+ i + '].rateAsPerITAct')[0].value);

		if (rateAsPerTreaty > rateAsPerITAct) {
			document
					.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
							+ i + '].amountOfIncome')[0].value = rateAsPerITAct;
		}

		if (rateAsPerITAct > rateAsPerTreaty)
		{
			document
					.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
							+ i + '].amountOfIncome')[0].value = rateAsPerTreaty;
		}
		else if (document
				.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
						+ i + '].rateOfTax')[0].value ==''&&document
						.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
								+ i + '].rateAsPerITAct')[0].value=='') {
			document
					.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
							+ i + '].amountOfIncome')[0].value = '';
		}

		else if (rateAsPerTreaty == rateAsPerITAct) {
			document
					.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
							+ i + '].amountOfIncome')[0].value = rateAsPerTreaty;
		}
	}

}

function populateRateSTCG()

{
	var tab = document.getElementById('scheduleStcgDtaa');
	var noOfRows = tab.rows.length;

	for (var i = 0; i < (noOfRows - 2); i++) {

		var rateAsPerTreaty = parseFloat(document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
						+ i + '].rateOfTreaty')[0].value);

		var rateAsPerITAct = parseFloat(document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
						+ i + '].rateAsPerItAct')[0].value);

		if (rateAsPerTreaty > rateAsPerITAct) {
			document
					.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
							+ i + '].amntOfIncome')[0].value = document
					.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
							+ i + '].rateAsPerItAct')[0].value;

		} else {

			document
					.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
							+ i + '].amntOfIncome')[0].value = document
					.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
							+ i + '].rateOfTreaty')[0].value;
		}
	}

}


function populateRateLTCG()

{
	var tab = document.getElementById('scheduleLtcgDtaa');
	var noOfRows = tab.rows.length;

	for (var i = 0; i < (noOfRows - 2); i++){
	var rateAsPerTreaty = parseFloat(document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].rateAsPerTreaty')[0].value);
	var rateAsPerITAct = parseFloat(document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].rateAsPerItAct')[0].value);
	if (rateAsPerTreaty > rateAsPerITAct) {
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].applicableRate')[0].value = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].rateAsPerItAct')[0].value;
	} else {

		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].applicableRate')[0].value = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].rateAsPerTreaty')[0].value;
	}
	}

}

function validateDTAAStcg(){
	var tab = document.getElementById('scheduleStcgDtaa');
	var rowCount = tab.rows.length -2;
	var amount = 0;
	for(var i=0;i<rowCount;i++){
		amount=parseInt(coalesce(document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['+ i +'].amount')[0].value),10)+ parseInt(coalesce(amount),10);
	}
	var totalNotTax = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg')[0]; totalNotTax.value = coalesce(totalNotTax.value);
	total=parseInt(coalesce(totalNotTax.value),10)+parseInt(coalesce(document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0].value),10)
	if(amount!=total){
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa','Total of [(a) Total amount of STCG not chargeable to tax in India as per DTAA] and [(b) Total amount of STCG chargeable at special rates in India as per DTAA] should be equal to sum of Amount of income (2)');
 		addErrorXHTML(document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0],'Total of [(a) Total amount of STCG not chargeable to tax in India as per DTAA] and [(b) Total amount of STCG chargeable at special rates in India as per DTAA] should be equal to sum of Amount of income (2)',true);
	}

}
function validateDTAALtcg(){
	var tab = document.getElementById('scheduleLtcgDtaa');
	var rowCount = tab.rows.length -2;
	var amount = 0;
	for(var i=0;i<rowCount;i++){
		amount=parseInt(coalesce(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].amount')[0].value),10)+ parseInt(coalesce(amount),10);
	}
	var totalNotTax = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg')[0];
	totalNotTax.value = coalesce(totalNotTax.value);
	total=parseInt(coalesce(totalNotTax.value),10)+parseInt(coalesce(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.totAmtLtcgUnderDtaa')[0].value),10)
	if(amount!=total){
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg','Total of [(a) Total amount of STCG not chargeable to tax in India as per DTAA] and [(b) Total amount of STCG chargeable at special rates in India as per DTAA] should be equal to sum of Amount of income (2)');
 		addErrorXHTML(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.TotalAmtNotTaxUsDTAALtcg')[0],'Total of [(a) Total amount of STCG not chargeable to tax in India as per DTAA] and [(b) Total amount of STCG chargeable at special rates in India as per DTAA] should be equal to sum of Amount of income (2)',true);
	}

}
//Validate STCG Section Wise along with DTAA.
function validateSTCGSectionWiseDTAA() {
	var arr = {'A1e':0,'A2c':0,'A3e_111A':0,'A3e_115AD':0,'A4a':0,'A4b':0,'A5e':0,'A6g':0,'A7':0};
	var tab = document.getElementById('scheduleStcgDtaa');
	  var rowCount = tab.rows.length -2;
	  for(var i=0; i<rowCount; i++) {
	    var itemIncluded = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['+ i +'].itemIncluded')[0].value;
	    var amount = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['+ i +'].amount')[0].value;
	   if(itemIncluded == 'A1e') {
	       arr['A1e'] = parseInt(arr['A1e'],10) +  parseInt(coalesce(amount),10);
	    } else if(itemIncluded == 'A2c') {
		       arr['A2c'] = parseInt(arr['A2c'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'A4a') {
		       arr['A4a'] = parseInt(arr['A4a'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'A4b') {
		       arr['A4b'] = parseInt(arr['A4b'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'A5e') {
		       arr['A5e'] = parseInt(arr['A5e'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'A6g') {
		       arr['A6g'] = parseInt(arr['A6g'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'A3e_111A') {
			   arr['A3e_111A'] = parseInt(arr['A3e_111A'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'A3e_115AD') {
		       arr['A3e_115AD'] = parseInt(arr['A3e_115AD'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'A7') {
		       arr['A7'] = parseInt(arr['A7'],10) +  parseInt(coalesce(amount),10);
		}
	  }

	var table = document.getElementById('scheduleStcgDtaa');
	var rowCount = table.rows.length -2;

	var dtaaSection = [];

	for(var i=0; i<rowCount; i++) {
		var itemIncluded = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['+ i +'].itemIncluded')[0].value;
		if(itemIncluded != '' && dtaaSection.indexOf(itemIncluded) == -1) {
			dtaaSection.push(itemIncluded);
		}
	}

	var table1 = document.getElementById('scheduleCGstcg2');
	var rowCount1 = table1.rows.length/10;

	var arrSection2 = [];
	var arrAmount2 = {'1A':0,'5AD1biip':0};

	for(var k=0; k<rowCount1; k++) {
	 var section = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ k +'].section')[0].value;
	 var amount = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['+ k +'].fullConsideration')[0].value;
		  if(section != '' && arrSection2.indexOf(section) == -1) {
			  arrSection2.push(section);
			  arrAmount2[section] = amount;
			}
	 }

	var fullConsideration50C = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];
	if(dtaaSection.indexOf('A1e') != -1 && arr['A1e'] > 0 && fullConsideration50C.value == 0) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C','A1(aiii) value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsideration50C,'A1(aiii) value should not be zero as there is an entry in DTAA table.',true);
	}

	var fullConsideration = document.getElementsByName('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.fullConsideration')[0];
	if(dtaaSection.indexOf('A2c') != -1 && arr['A2c'] > 0 && fullConsideration.value == 0) {
		j.setFieldError('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.fullConsideration','A2a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsideration,'A2a value should not be zero as there is an entry in DTAA table.',true);
	}


	if(dtaaSection.indexOf('A3e_111A') != -1 && arr['A3e_111A'] > 0 && (arrSection2.indexOf('1A') == -1 || arrAmount2['1A'] == 0)) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section','111A section in A3 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section')[0],'111A section in A3 should be selected and amount should not be zero, as there is an entry in DTAA table.',true);
	}

	if(dtaaSection.indexOf('A3e_115AD') != -1 && arr['A3e_115AD'] > 0 && (arrSection2.indexOf('5AD1biip') == -1 || arrAmount2['5AD1biip'] == 0)) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section','115AD(1)(b)(ii) section in A3 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section')[0],'115AD(1)(b)(ii) section in A3 should be selected and amount should not be zero, as there is an entry in DTAA table.',true);
	}

	var nRItaxSTTPaid = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0];
	if(dtaaSection.indexOf('A4a') != -1 && arr['A4a'] > 0 && nRItaxSTTPaid.value == 0) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid','A4a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(nRItaxSTTPaid,'A4a value should not be zero as there is an entry in DTAA table.',true);
	}

	var nRItaxSTTNotPaid = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0];
	if(dtaaSection.indexOf('A4b') != -1 && arr['A4b'] > 0 && nRItaxSTTNotPaid.value == 0) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid','A4b value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(nRItaxSTTNotPaid,'A4b value should not be zero as there is an entry in DTAA table.',true);
	}

	var fullConsideration = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0];
	if(dtaaSection.indexOf('A5e') != -1 && arr['A5e'] > 0 && fullConsideration.value == 0) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration','A5a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsideration,'A5a value should not be zero as there is an entry in DTAA table.',true);
	}

	var fullConsiderationA6g = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration')[0];
	if(dtaaSection.indexOf('A6g') != -1 && arr['A6g'] > 0 && fullConsiderationA6g.value == 0) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration','A6a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsiderationA6g,'A6a value should not be zero as there is an entry in DTAA table.',true);
	}

	var totAmtStcgUnderDtaa = document.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa')[0];
	if(dtaaSection.indexOf('A7') != -1 && arr['A7'] > 0 && totAmtStcgUnderDtaa.value == 0) {
		j.setFieldError('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa','A7 value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(totAmtStcgUnderDtaa,'A7 value should not be zero as there is an entry in DTAA table.',true);
	}

}

// Validate LTCG Section-wise along with DTAA.
function validateLTCGSectionWiseDTAA() {

	var arr = {'B1e':0,'B2e':0,'B3e':0,'B4e':0,'B5c':0,'B6e_21ciii':0,'B6e_5AB1b':0,'B6e_5AC1c':0,'B6e_5ADiii':0,'B7e':0,'B8':0};
	var tab = document.getElementById('scheduleLtcgDtaa');
	  var rowCount = tab.rows.length -2;
	  for(var i=0; i<rowCount; i++) {
	    var itemIncluded = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].itemIncluded')[0].value;
	    var amount = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].amount')[0].value;
	   if(itemIncluded == 'B1e') {
	       arr['B1e'] = parseInt(arr['B1e'],10) +  parseInt(coalesce(amount),10);
	    } else if(itemIncluded == 'B2e') {
		       arr['B2e'] = parseInt(arr['B2e'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B3e') {
		       arr['B3e'] = parseInt(arr['B3e'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B4e') {
		       arr['B4e'] = parseInt(arr['B4e'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B5c') {
		       arr['B5c'] = parseInt(arr['B5c'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B6e_21ciii') {
		       arr['B6e_21ciii'] = parseInt(arr['B6e_21ciii'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B6e_5AB1b') {
		       arr['B6e_5AB1b'] = parseInt(arr['B6e_5AB1b'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B6e_5AC1c') {
			   arr['B6e_5AC1c'] = parseInt(arr['B6e_5AC1c'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B6e_5ADiii') {
		       arr['B6e_5ADiii'] = parseInt(arr['B6e_5ADiii'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B7e') {
		       arr['B7e'] = parseInt(arr['B7e'],10) +  parseInt(coalesce(amount),10);
		} else if(itemIncluded == 'B8') {
		       arr['B8'] = parseInt(arr['B8'],10) +  parseInt(coalesce(amount),10);
		}
	  }

	var table = document.getElementById('scheduleLtcgDtaa');
	var rowCount = table.rows.length -2;

	var dtaaSection = [];

	for(var i=0; i<rowCount; i++) {
		var itemIncluded = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['+ i +'].itemIncluded')[0].value;
		if(itemIncluded != '' && dtaaSection.indexOf(itemIncluded) == -1) {
			dtaaSection.push(itemIncluded);
		}
	}

	var fullConsideration50C = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];
	if(dtaaSection.indexOf('B1e') != -1 && arr['B1e'] > 0 && fullConsideration50C.value == 0) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C','B1(aiii) value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsideration50C,'B1(aiii) value should not be zero as there is an entry in DTAA table.',true);
	}

	var fullConsideration = document.getElementsByName('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.fullConsiderationB')[0];
	if(dtaaSection.indexOf('B2e') != -1 && arr['B2e'] > 0  && fullConsideration.value == 0) {
		j.setFieldError('scheduleCGFor4.shortTermCapGainFor4.capGainSlumpSale.fullConsiderationB','B2a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsideration,'B2a value should not be zero as there is an entry in DTAA table.',true);
	}

	var fullConsiderationB3e = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.fullConsideration')[0];
	if(dtaaSection.indexOf('B3e') != -1 && arr['B3e'] > 0  && fullConsiderationB3e.value == 0) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.fullConsideration','B3a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsiderationB3e,'B3a value should not be zero as there is an entry in DTAA table.',true);
	}

	var fullConsiderationB4a = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].fullConsideration')[0];
	if(dtaaSection.indexOf('B4e') != -1 && arr['B4e'] > 0  && fullConsiderationB4a.value == 0) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].fullConsideration','B4a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsiderationB4a,'B4a value should not be zero as there is an entry in DTAA table.',true);
	}


	var ltcgWithoutBenefit = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit')[0];
	if(dtaaSection.indexOf('B5c') != -1 && arr['B5c'] > 0 && ltcgWithoutBenefit.value == 0) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit','B5a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(ltcgWithoutBenefit,'B5a value should not be zero as there is an entry in DTAA table.',true);
	}


	var table2 = document.getElementById('stcg10pctTab');
	var rowCount2 = table2.rows.length/16;

	var arrSection1 = [];
	var arrAmount1 = {'21ciii':0,'5AB1b':0,'5AC1c':0,'5ADiii':0};

	for(var a=0; a<rowCount2; a++) {
	 var sectionCode = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+a+'].sectionCode')[0].value;
	 var amount = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['+a+'].fullConsideration')[0].value;
		  if(sectionCode != '' && arrSection1.indexOf(sectionCode) == -1) {
			  arrSection1.push(sectionCode);
			  arrAmount1[sectionCode] = amount;
			}
	 }

	if(dtaaSection.indexOf('B6e_21ciii') != -1 && arr['B6e_21ciii'] > 0 && (arrSection1.indexOf('21ciii') == -1 || arrAmount1['21ciii'] == 0)) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode','21ciii section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode')[0],'21ciii section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.',true);
	}

	if(dtaaSection.indexOf('B6e_5AB1b') != -1 && arr['B6e_5AB1b'] > 0 && (arrSection1.indexOf('5AB1b') == -1 || arrAmount1['5AB1b'] == 0)) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode','5AB1b section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode')[0],'5AB1b section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.',true);
	}

	if(dtaaSection.indexOf('B6e_5AC1c') != -1 && arr['B6e_5AC1c'] > 0 && (arrSection1.indexOf('5AC1c') == -1 || arrAmount1['5AC1c'] == 0)) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode','5AC1c section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode')[0],'5AC1c section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.',true);
	}

	if(dtaaSection.indexOf('B6e_5ADiii') != -1 && arr['B6e_5ADiii'] > 0 && (arrSection1.indexOf('5ADiii') == -1 || arrAmount1['5ADiii'] == 0)) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode','5ADiii section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].sectionCode')[0],'5ADiii section in B6 should be selected and amount should not be zero, as there is an entry in DTAA table.',true);
	}

	var fullConsiderationB7a = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration')[0];
	if(dtaaSection.indexOf('B7e') != -1 && arr['B7e'] > 0 && fullConsiderationB7a.value == 0) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration','B7a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsiderationB7a,'B7a value should not be zero as there is an entry in DTAA table.',true);
	}

	var fullConsiderationB8e = document.getElementsByName('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0];
	if(dtaaSection.indexOf('B8') != -1 && arr['B8'] > 0  && fullConsiderationB8e.value == 0) {
		j.setFieldError('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa','B8 value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(fullConsiderationB8e,'B8 value should not be zero as there is an entry in DTAA table.',true);
	}
}

function panValidation80G(tableId) {

	var pan = document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
	var verificationPAN = document.getElementsByName('verification.declaration.assesseeVerPAN')[0].value;
	var table = document.getElementById(tableId);
	var allInputTags = table.getElementsByTagName('input');
	for(var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("doneePanNo$")) {
			if(allInputTags[i].value != '' && (allInputTags[i].value == pan || allInputTags[i].value == verificationPAN )){
				j.setFieldError(allInputTags[i].name,'Enter the PAN of the person to whom the donation is made.');

			}
		}
	}
}

//To alert user
function alertItr5User() {

	var errText="";
	var i=1;
	var amountPayable = document.getElementsByName('partBTTI.taxPaid.balTaxPayable')[0].value;
	var fileSec = document.getElementsByName('partAGEN1.filingStatus.returnFileSec.incomeTaxSec')[0].value;
	var inchBPAlert=document.getElementsByName('itr5ScheduleBP.incChrgUnHdProftGain')[0].value;

	var checkForBPAlert = coalesceSetRet('partabs.fundSrc.totFundSrc')
							+ coalesceSetRet('partabs.noBooksOfAccBS.totSundryDbtAmt')
							+ coalesceSetRet('partabs.noBooksOfAccBS.totSundryCrdAmt')
							+ coalesceSetRet('partabs.noBooksOfAccBS.totStkInTradAmt')
							+ coalesceSetRet('partabs.noBooksOfAccBS.cashBalAmt');

	if(fileSec=='19'){
		errText+=(i++)+". To file return u/s 92CD, post login in e-Filing portal, go to 'e-File' --> 'Income Tax Return' and select the applicable AY, ITR and other options.\n\n";
	}
	if(fileSec=='20'){
		errText+=(i++)+". Section 139 read with section 119(2)(b) for AY 2018-19 can be filed only after 31st March 2019.\n\n";
	}
	if (checkForBPAlert == 0 && inchBPAlert > 250000){
		errText+=(i++)+". Please ensure that the relevant fields of Profit & Loss and Balance Sheet are filled, else Return of Income may be treated as defective u/s 139(9).\n";
	}
	main.generateMsgDialogWithOk(errText,"");
}

//To open Save file dialog
function popupWithOk()
{
	  j.popup();
}

function verificationPanValidation(tableId){

	var verificationPAN = document.getElementsByName('verification.declaration.assesseeVerPAN')[0];
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var substatus = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	var flag = true;
	var table = document.getElementById(tableId);
	var allInputTags = table.getElementsByTagName('input');
	if(status=='1'||substatus=='15' ||substatus=='16' ||substatus=='17' ||substatus=='4'||substatus=='5'||substatus=='7'||substatus=='8'){
		for(var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("pan$")) {
				if(allInputTags[i].value == verificationPAN.value ){
					flag = false;
				}
			}
		}

		if(flag){
			j.setFieldError(verificationPAN.name,'PAN entered at Verification is not matching with the PAN entered at PARTNERS/MEMBERS/TRUST INFORMATION.Please ensure that the person authorized to verify the ITR is as per Section 140 of the Income Tax Act.');
		}
	}
}

//Calculate Total Income for Schedule ICDS.
function calcTotalICDS(){
    try{
        var totalNatEffect = document.getElementsByName('itrScheduleICDS.totNetEffect')[0];
        var totalNetAmtNegative = document.getElementsByName('itrScheduleICDS.totNetEffectN')[0];

        var	temp=eval( parseInt(coalesce(document.getElementsByName('itrScheduleICDS.accntPolicies')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.valInventories')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.constructionCon')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.revenueRecog')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.tangFixedAssets')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.foriegnExcRates')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.govGrants')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.securities')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.assets')[0].value),10) +
        		parseInt(coalesce(document.getElementsByName('itrScheduleICDS.borrowingCosts')[0].value),10))
        		if(parseInt(temp)>0){
        			document.getElementsByName('itrScheduleICDS.totNetEffect')[0].value=''
            		document.getElementsByName('itrScheduleICDS.totNetEffectN')[0].value=''
        			document.getElementsByName('itrScheduleICDS.totNetEffect')[0].value=temp
        			}
        		else {
        			document.getElementsByName('itrScheduleICDS.totNetEffect')[0].value=''
        			document.getElementsByName('itrScheduleICDS.totNetEffectN')[0].value=''
        			document.getElementsByName('itrScheduleICDS.totNetEffectN')[0].value=Math.abs(temp);
        		}

        		//populates to OI point 3a and 3b
        		document.getElementsByName('partaoi.profDeviatDueAcctMeth')[0].value = parseInt(coalesce(totalNatEffect.value),10);
        		document.getElementsByName('partaoi.decProfDeviatDueAcctMeth')[0].value = parseInt(coalesce(totalNetAmtNegative.value),10);

    }
     catch(e){
        alert(e.stack);
    }

}

//to add rows to table sch PTI
function addRowSchedPTIFor5(nocheck) {

	var mainTable = document.getElementById('schedulePTI').rows;
	var noOfRows = mainTable.length;

	var tobeInsertBefore = document.getElementById('schedulePTIAddRow');
	var flag = true;
	var checkFirst = true;
	var totRow = document.getElementById('schedulePTIFirst').cells[0].textContent;

	var iterate = eval(parseInt(totRow, 10));

	var indexValue = eval(((parseInt(noOfRows, 10) - 3) / 9) + 1);

	var isRowBlank = true;
	for ( var i = 0; i < 9; i++) {
		if (!checkRowBlank('schedulePTI', i, 0)) {
			isRowBlank = false;
			break;
		}
	}

	if (!isRowBlank || nocheck) {

		for ( var i = 1; i < mainTable.length; i++) {
			var cloneNode = mainTable[i].cloneNode(true);
			if (flag) {
				if (checkFirst) {
					iterate = eval(indexValue - 1);

					cloneNode.cells[0].innerHTML = indexValue;
					checkFirst = false;
				}

				// Numbering
				var inputTags = cloneNode.getElementsByTagName('input');
				for ( var a = 0; a < inputTags.length; a++) {
					inputTags[a].name = inputTags[a].name.replace('[0]', '['
							+ iterate + ']');

					inputTags[a].id = inputTags[a].name.replace(/([\.\[\]])/g,
							'_').replace(/(__)/g, '_');
					inputTags[a].value = '';
					var blurAttr = inputTags[a].getAttribute('onblur');
					if (blurAttr != null) {
						blurAttr = blurAttr + ";";
					} else {
						blurAttr = "";
					}
					inputTags[a].setAttribute('onblur', blurAttr
							+ 'j.blur(this,this.name,this.value);');
				}

				document.getElementById('schedulePTI').getElementsByTagName(
						'tr')[0].parentNode.insertBefore(cloneNode,
						tobeInsertBefore);
			}
			if (mainTable[i].id == 'schedulePTIEnd') {
				flag = false;
				break;
			}
		}
		if ($('#schedulePTIAddRow')[0].parentNode.children.length == 12) {
			$('#delPTIButtonId').prop('disabled', true);
		} else if ($('#schedulePTIAddRow')[0].parentNode.children.length > 12) {
			$('#delPTIButtonId').prop('disabled', false);
		}

	} else {
		addErrorXHTML(
				'',
				'Please fill in all the mandatory fields in the last row before adding another row.');
	}
	checkMaxLengthLimit();
}

//To delete row from PTI
function deleteRowPTI(tableId , noOfHeader , noOfFooter){
	try{
		var mytable = document.getElementById(tableId);
		var rowCount = mytable.rows.length;
		var itemCount = (rowCount - 3 )/ 9;
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

		for(var j=1; j<=totalChecked ; j++){
			var totalNoOfInput = mytable.getElementsByTagName('input');

			for(var z=0; z<totalNoOfInput.length; z++){
				if(totalNoOfInput[z].name.match(".chosenCheckBox$")){

					var akhilIndex1 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf('[') ,10)+1);
					var akhilIndex2 = eval(parseInt(totalNoOfInput[z].name.lastIndexOf(']') ,10));
					var rowNumber = totalNoOfInput[z].name.substring(akhilIndex1, akhilIndex2);
					rowNumber = parseInt(rowNumber ,10);

					var myCurrtable = document.getElementById(tableId);
					var rowCurrCount = myCurrtable.rows.length;


					if(totalNoOfInput[z].checked==true){
						if((rowNumber!=0) || (rowNumber==0 &&  parseInt(eval(rowCurrCount-noOfHeader-noOfFooter)/9)>1) ){
							rowNumber = eval(parseInt(rowNumber,10) * 9 + noOfHeader);
							for(var i=0;i<9;i++){
								mytable.deleteRow(rowNumber);
							}
							//To Do - reset the name of row for all input , textarea, select
							var newTrList = mytable.getElementsByTagName('tr');
							var newTrListLength = eval(parseInt(newTrList.length ,10)-noOfFooter);
							for( var q=rowNumber; q < newTrListLength ; q++ ){
								var p = parseInt((q-noOfHeader) /9) + noOfHeader;
								//set the serial number;
								if((q-noOfHeader)%9==0){
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
						}else if((rowNumber==0)  && (parseInt(eval(rowCurrCount-noOfHeader-noOfFooter)/9)==1)){
							//Vacate the content if its first row

							for(var m=0; m<9; m++){
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
	}catch(e){
		alert('exception caught in =' +e.stack );
	}
}

function disablePartAoiPt6()
{
  if(document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value=='4'){
	  document.getElementsByName('partaoi.amtDisallUs36.expGovtApprovedSugarPrice')[0].readOnly=false;
	}
	else{
		document.getElementsByName('partaoi.amtDisallUs36.expGovtApprovedSugarPrice')[0].readOnly=true;
	}
}

function surchargeEditable(){
	var splRateIncTax = parseInt(coalesce(document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0].value));

	if(splRateIncTax>0){
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = false;
	}else{
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = true;
	}

}

function clearOldSurchargeValue(){
	var surcharge = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0];
		if(surcharge.old!=undefined){
			surcharge.old = undefined;
		}
		if(surcharge.oldvalue!=undefined){
			surcharge.oldvalue = undefined;
		}
}

function returnZeroIfNegative(value){
	if (value < 0) {
		return 0;
	}else{
	return value;
	}
}

function enable44AD()
{

	var resStatus=document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	 var statusType= document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;

	 if (resStatus == 'RES' && statusType == '1')
		 {
		 document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD')[0].readOnly = false;
		 document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44ADA')[0].readOnly = false;
		 }else
			 {
			 document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD')[0].value= '0';
			 document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44ADA')[0].value='0';
			 document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44AD')[0].readOnly = true;
			 document.getElementsByName('itr5ScheduleBP.businessIncOthThanSpec.deemedProfitBusUs.section44ADA')[0].readOnly = true;
			 }

}
function OSSubCal(){

	document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[7].sourceAmount')[0].value = eval(
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[1].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[2].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[3].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[4].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[5].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[6].sourceAmount'),10));

	document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[13].sourceAmount')[0].value = eval(
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[12].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[11].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[10].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[9].sourceAmount'),10)+
			parseInt(coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[8].sourceAmount'),10));


}


function surcharge201718(){
	document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge25ofSI')[0].value = eval(
		parseInt(coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),10) * 0.60* 0.25);

	document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.totalSurcharge')[0].value = eval(
			parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge25ofSI'),10)+
			parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F'),10));

}

function removeIncomeDtls1() {

	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	if ( status == 'NRI' || status == 'RES' ) {
		document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value = 0;
		document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value = 0;
		document
		.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBG')[0].value = 0;
	}

}

function clearFields(){

	 var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	 var resStatus = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	  if(taxPayer!='1' || resStatus == "NRI" ){

			document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value = 0;
	  }
	  if( resStatus == "NRI" ){

		  document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value = 0;
	  }

	  document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value = 0;
	  document.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBG')[0].value = 0;

}

function checkRegistrationNoLength(RegNO) {
	if(RegNO.value=="00000000") {
		var regno = document.getElementsByName('partAGEN2.auditInfo.audFrmRegNo')[0];
        addErrorXHTML(regno,'Please enter valid Registration No. of the proprietorship/firm.',true);

   }
}


function statusPDTFields()
{
	var firstFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare')[0].value;
	var secondFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusInc')[0].value;
	var thirdFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].value;

	var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var subtaxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	if(subtaxPayer == '7' || subtaxPayer == '13'){
		if( (firstFlag=='Y' && secondFlag=='Y' && thirdFlag=='Y') || (firstFlag=='Y' && secondFlag=='Y' && thirdFlag=='N') || (firstFlag=='Y' && secondFlag=='N')
				|| (firstFlag=='N' && secondFlag=='Y' && thirdFlag=='Y') || (firstFlag=='N' && secondFlag=='Y' && thirdFlag=='N')){

			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic')[0].disabled = true;
			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable')[0].disabled = true;
			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives')[0].disabled = true;
			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf')[0].disabled = true;

			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic')[0].value = "";
			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable')[0].value = "";
			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives')[0].value = "";
			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf')[0].value = "";
	}else
		{
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic')[0].disabled = false;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable')[0].disabled = false;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives')[0].disabled = false;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf')[0].disabled = false;

		}
	}else{

		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBasic')[0].disabled = true;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustReceivable')[0].disabled = true;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustRelatives')[0].disabled = true;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusProf')[0].disabled = true;
	}

}

function pdtSubFields()
{
	var firstFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare')[0].value;
	var secondFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusInc')[0].value;
	var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var subtaxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	if(subtaxPayer == '7' || subtaxPayer == '13'){
			if((firstFlag=='Y' && secondFlag=='N') || (firstFlag=='N' && secondFlag=='N')){

				document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].disabled = true;
				document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].value = "";
		}else
			{
			document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].disabled = false;

			}
	}else{
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustWill')[0].disabled = true;
	}
}

function pdtItr5NotReqd (){

	var firstFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare')[0].value;
	var secondFlag = document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustBusInc')[0].value;
	var taxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	var subtaxPayer = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;


		if ( (subtaxPayer == '7' || subtaxPayer == '13') && firstFlag=='Y' && secondFlag=='N' ){

			j.setFieldError('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare','Under this scenario, filing of ITR 5 is not required. The share of income should be reflected in the personal return of income.');
	 		addErrorXHTML(document.getElementsByName('partAGEN2.partnerOrMemberInfo.pvtDiscretioneryTrustShare')[0],'Under this scenario, filing of ITR 5 is not required. The share of income should be reflected in the personal return of income.',true);
		}

}

function subStatus()
{

	var statusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0];
	var statusCompany1 = statusCompany.value;

	var sub = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0];
	var sub1 = sub.value;

	if(statusCompany1 == '1'){
		for(var i=0;sub.options.length > 0;i++){
			sub.options.remove(0);
		}
		sub.options[0] = new Option('Select','-1');
		sub.options[1] = new Option('Partnership Firm','10');
		sub.options[2] = new Option('Limited Liability Partnership','5');

	}else if(statusCompany1 == '14'){
		for(var i=0;sub.options.length > 0;i++){
			sub.options.remove(0);
		}
		sub.options[0] = new Option('Select','-1');
		sub.options[1] = new Option('Primary Agricultural Credit Society/ Primary Co-operative Agricultural Bank','15');
		sub.options[2] = new Option('Rural Development bank','16');
		sub.options[3] = new Option('Other Cooperative Bank','17');
		sub.options[4] = new Option('Society Registered under Societies Registration Act-1860 or any law corresponding to that Act','11');
		sub.options[5] = new Option('Cooperative Society','4');
		sub.options[6] = new Option('Private Discretionary Trust','7');
		sub.options[7] = new Option('Estate of the deceased','12');
		sub.options[8] = new Option('Any other Trust/Institution','13');
		sub.options[9] = new Option('Any other AOP/BOI','8');

	}else{
		for(var i=0;sub.options.length > 0;i++){
			sub.options.remove(0);
		}
		sub.options[0] = new Option('Select','');
	}

}

function setCountryForStateItr5(){


	try {

		var state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
		var country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];

		if(state.value=='99' ){

			country.value = '';

		} else if(state.value==''){

			country.value = '';

		}else{

			country.value = "91";

		}

	} catch (e) {
	}
}


function checkPinOnStateChangeVer()
{
	var state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];

	if ( state.value == "99" || country.value != "91")
		{
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].disabled=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].value="";
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].disabled=false;

		}
	else
		{
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].disabled=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].value="";
		}

}

function checkPinOnCountryChangeVer()
{
	var state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];

	var zipCode =document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].value
	if (country.value == "91" || country.value== "-1"){
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].disabled=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].value="";
		}
	else
		{
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].disabled=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].value="";
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].disabled=false;


		}

}

function setStateForCountryitr5(){

	var state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];

	try{
	if(country.value=='91'){

		state.value = '';

	} else if(country.value!='91'){
		state.value = "99";

	}
	}catch (e) {
	}
}

function populateZipCodeVer(){

	var zipCodeCheck= document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0];
	var country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];

	if(zipCodeCheck.checked==true && country.value !='91' && country.value !="" ){

		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].value="XXXXXX";
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].readOnly=true;
		zipCodeCheck.value=true;

	}else{

		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].value="";
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].readOnly=false;
		zipCodeCheck.value=false;
	}

}

function checkPinZipOnload()
{
	var state = document.getElementsByName('partAGEN1.orgFirmInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.orgFirmInfo.address.country')[0];
	var zipCode =document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].value

	if (country.value == "91" || country.value== "-1"){
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].disabled=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].value="";

		}
	else
		{
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].disabled=false;

		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode')[0].value="";
		if(zipCode=="XXXXXX"){

			document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].readOnly=true;
			document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=true;
		}else{

			document.getElementsByName('partAGEN1.orgFirmInfo.address.zipCode')[0].readOnly=false;
			document.getElementsByName('partAGEN1.orgFirmInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		}

		}

}



function priBankMandtry()
{
	var bankDtlflag = document.getElementsByName('itr.scheduleBA.bankDtlsFlag')[0].value;
	var bankName = document.getElementsByName('itr.refund.depositToBankAccount.bankName')[0].value;
	var ifscCode = document.getElementsByName('itr.refund.depositToBankAccount.iFSCCode')[0].value;
	var bankAcctNo = document.getElementsByName('itr.refund.bankAccountNumber')[0].value;

	var tab = document.getElementById('scheduleBA');
	var allInputTags = tab.getElementsByTagName('input');

	if(bankDtlflag=='N' )
	{
		if(bankName !="" && (ifscCode=="" || bankAcctNo=="")){

			addErrorXHTML('' ,'Please fill all the fields under Indian Bank Account details.');
			j.setFieldError('itr.refund.depositToBankAccount','Please fill all the fields under Indian Bank Account details.');
		}

	if(ifscCode !="" && (bankName=="" || bankAcctNo=="")){

		addErrorXHTML('' ,'Please fill all the fields under Indian Bank Account details.');
		j.setFieldError('itr.refund.depositToBankAccount','Please fill all the fields under Indian Bank Account details.');
	}

	if(bankAcctNo !="" && (ifscCode=="" || bankName=="")){

	addErrorXHTML('' ,'Please fill all the fields under Indian Bank Account details.');
	j.setFieldError('itr.refund.depositToBankAccount','Please fill all the fields under Indian Bank Account details.');
   }
/*
   if(ifscCode=="" || bankAcctNo==""||bankName==""){

	addErrorXHTML('' ,'Please fill all the fields under Indian Bank Account details.');
	j.setFieldError('itr.refund.depositToBankAccount','Please fill all the fields under Indian Bank Account details.');
   }*/

	}

/*	for(var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("ifscCode$") && allInputTags[i+1].name.match("bankName$") && allInputTags[i+2].name.match("accNo$")) {
				if(allInputTags[i].value!='' && (allInputTags[i+1].value=='' || allInputTags[i+2].value=='')){
					addError('','Please fill all the fields under Other Bank account details.',true);
					j.setFieldError('itr.scheduleBA[0].ifscCode','Please fill all the fields under Other Bank account details.');
			}
		}
	}
*/

}
function calculateAggregateIncome(){


	var aggregateIncomeFirst=0;
	aggregateIncomeFirst=eval(
			parseInt(coalesceSetRet('partBTI.totalIncome'),10)
			- parseInt(coalesceSetRet('partBTI.incomeChargeableTotTax'),10)
			);
	var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	if(status=='14' || status == '9' ){
		if (parseInt(aggregateIncomeFirst, 10) > getExemption()) {
			document.getElementsByName('partBTI.aggregateIncome')[0].value = zeroOrMore(eval(
					parseInt(aggregateIncomeFirst,10)+
					parseInt(coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'),10)));

		} else {
			document.getElementsByName('partBTI.aggregateIncome')[0].value = 0;
		}

	}else{

		document.getElementsByName('partBTI.aggregateIncome')[0].value = zeroOrMore(eval(
				parseInt(aggregateIncomeFirst,10)+
				parseInt(coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'),10)));
	}
}

function calculateRebateAgriculture(){

	var rebateAgriculture = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0];
	var exemption =  parseInt(getExemption(), 10);
	var agricultureIncome = parseInt(coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'),10);
	if (agricultureIncome == 0){

		exemption = 0;
	}
	 var netAgriIncome=0;
	 var aggregateIncomeFirst=0;

	 aggregateIncomeFirst=eval(
				parseInt(coalesceSetRet('partBTI.totalIncome'),10)
				- parseInt(coalesceSetRet('partBTI.incomeChargeableTotTax'),10)
				);

	 var status = document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0].value;
	 var substatusCompany = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

		if((status=='14' &&  (substatusCompany != '7' && substatusCompany != '13' && substatusCompany != '12')) || status == '9' ){

			if (parseInt(aggregateIncomeFirst, 10) > getExemption()) {
				var rebateCalc = calculateTaxPayableOnTotalInc(zeroOrMore( eval( parseInt(coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'),10) + parseInt(exemption, 10))));
				rebateAgriculture.value=eval(rebateCalc);
			} else {
				document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0].value = 0;
			}

		}else{
			setEditableFieldValue(rebateAgriculture,calculateTaxPayableOnTotalInc(zeroOrMore( eval( parseInt(coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'),10) + parseInt(exemption, 10)))));

		}

}

function subStatusOnLoad()
{

	var statusCompany=document.getElementsByName('partAGEN1.orgFirmInfo.statusOrCompanyType')[0];
	var statusCompany1 = statusCompany.value;

	var sub = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0];
	var sub1 = sub.value;

	if(statusCompany1 == '1'){
		for(var i=0;sub.options.length > 0;i++){
			sub.options.remove(0);
		}
		sub.options[0] = new Option('Select','-1');
		sub.options[1] = new Option('Partnership Firm','10');
		sub.options[2] = new Option('Limited Liability Partnership','5');

	}else if(statusCompany1 == '14'){
		for(var i=0;sub.options.length > 0;i++){
			sub.options.remove(0);
		}
		sub.options[0] = new Option('Select','-1');
		sub.options[1] = new Option('Primary Agricultural Credit Society/ Primary Co-operative Agricultural Bank','15');
		sub.options[2] = new Option('Rural Development bank','16');
		sub.options[3] = new Option('Other Cooperative Bank','17');
		sub.options[4] = new Option('Society Registered under Societies Registration Act-1860 or any law corresponding to that Act','11');
		sub.options[5] = new Option('Cooperative Society','4');
		sub.options[6] = new Option('Private Discretionary Trust','7');
		sub.options[7] = new Option('Estate of the deceased','12');
		sub.options[8] = new Option('Any other Trust/Institution','13');
		sub.options[9] = new Option('Any other AOP/BOI','8');

	}else{
		for(var i=0;sub.options.length > 0;i++){
			sub.options.remove(0);
		}
		sub.options[0] = new Option('Select','');
	}
	sub.value =sub1;
}

function enableBankDtls()
{

	enableField('itr.scheduleBA.bankDtlsFlag','Y','itr.refund.depositToBankAccount.iFSCCode');
	enableField('itr.scheduleBA.bankDtlsFlag','Y','itr.refund.depositToBankAccount.bankName');
	enableField('itr.scheduleBA.bankDtlsFlag','Y','itr.refund.bankAccountNumber');

	enableTableForNRI('itr.scheduleBA.bankDtlsFlag', 'Y','scheduleBA');

	enableField('itr.scheduleBA.bankDtlsFlag','N','itr.scheduleBA.foreignBankDtls[0].ibanSwiftCode');
	enableField('itr.scheduleBA.bankDtlsFlag','N','itr.scheduleBA.foreignBankDtls[0].bankName');
	enableField('itr.scheduleBA.bankDtlsFlag','N','itr.scheduleBA.foreignBankDtls[0].countryCode');
	enableField('itr.scheduleBA.bankDtlsFlag','N','itr.scheduleBA.foreignBankDtls[0].bankAccountNo');

}

function enableGen2ForPDTAOT(){

	var substatusCompany = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
	var pan=document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
	var fourth;
	if(pan!=undefined && pan!=''){
		pan = pan.toUpperCase();
		fourth= pan.charAt(3);
	}

	if(substatusCompany==7 || substatusCompany==13){
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].value = 'NO';
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].disabled = true;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.totIncFrmMemberOfAop')[0].disabled = false;
  }else
	  {
	  document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].value = '';
	  }
}

function enableGen2ForPDTAOTOnLoad(){

	var substatusCompany = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;
	var pan=document.getElementsByName('partAGEN1.orgFirmInfo.panNumber')[0].value;
	var fourth;
	if(pan!=undefined && pan!=''){
		pan = pan.toUpperCase();
		fourth= pan.charAt(3);
	}

	if(substatusCompany==7 || substatusCompany==13){
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].value = 'NO';
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.partnerForeignCompFlg')[0].disabled = true;
		document.getElementsByName('partAGEN2.partnerOrMemberInfo.totIncFrmMemberOfAop')[0].disabled = false;
  }
}

function enableFieldsPDTAOT(){
	var substatusCompany = document.getElementsByName('partAGEN1.orgFirmInfo.subStatus')[0].value;

	if(substatusCompany==7 || substatusCompany==13 || substatusCompany==12 ){
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = false;
	}else{
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateAgriculture')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeOn2F')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = true;
		surchargeEditable();
	}

}

function populateBankFlg()
{

	var residentialStatus  = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	if(residentialStatus == 'RES')
		{
		document.getElementsByName('itr.scheduleBA.bankDtlsFlag')[0].value = 'Y';
		document.getElementsByName('itr.scheduleBA.bankDtlsFlag')[0].disabled=true;
		}else
			{
			document.getElementsByName('itr.scheduleBA.bankDtlsFlag')[0].disabled=false;
			}
	enableBankDtls();
}



function setPartAGen2PinZipOnLoad(){

	var table = document.getElementById('partAGEN2PartnerOrMemberInfoTable');
	var rowCount = table.rows.length;
	var state ;
	var country ;

	for(var i=0 ;i<rowCount-4;i++){

		state = document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.stateCode')[0].value;
		country = document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.country')[0].value;

		if(country == '91' ){
			document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.zipCode')[0].value='';
			document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.zipCode')[0].disabled=true;
		}else if(state =='99'){
			document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.pinCode')[0].value='';
			document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.pinCode')[0].disabled=true;
		}else{
			document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.zipCode')[0].value='';
			document.getElementsByName('partAGEN2.partnerOrMemberInfo['+i+'].addressDetail.zipCode')[0].disabled=true;
		}
	}

}

function setSchHPPinZipOnLoad(){

	var totHp=eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent)-1);

	var state ;
	var country ;

	for(var i=0 ;i<totHp;i++){

		state = document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.stateCode')[0].value;
		country = document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.country')[0].value;

		if(country == '91' ){
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.zipCode')[0].value='';
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.zipCode')[0].disabled=true;
		}else if(state =='99'){
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.pinCode')[0].value='';
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.pinCode')[0].disabled=true;
		}else{
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.zipCode')[0].value='';
			document.getElementsByName('scheduleHP.propertyDetails['+i+'].addressDetail.zipCode')[0].disabled=true;
		}
	}

}

function calcTotalAmt(tableId){

	var tab1 = document.getElementById('schEIMinorChild');
	var noOfRows=tab1.rows.length;
	var sum = 0;
	var amt = 0;

	for ( var i = 0; i < (noOfRows-2); i++) {
		amt = document.getElementsByName('scheduleEI.othersInc['+i+'].othAmount')[0].value;
		sum = eval(parseInt(sum,10) + parseInt(coalesce(amt),10));

	}
	document.getElementsByName('scheduleEI.others')[0].value = parseInt(sum,10);
}

function validateAuditDtls() {

	var tab = document.getElementById('othSecDateTabId1');
	var allInputTags = tab.getElementsByTagName('input');

	for(var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("auditReportAct$") && allInputTags[i+1].name.match("auditReportSection$") && allInputTags[i+2].name.match("auditReportDate$")) {
				if(allInputTags[i+2].value!='' && (allInputTags[i].value=='' || allInputTags[i+1].value=='')){
					addError(allInputTags[i],'Please fill all the fields under Audit details.',true);
					j.setFieldError(allInputTags[i].name,'Please fill all the fields under Audit details.');
			}
		}
	}
}

function genWarningMsgForNRI() {

	var resStatus = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	var bankDtlsFlg = document.getElementsByName('itr.scheduleBA.bankDtlsFlag')[0].value;
	if( resStatus == 'NRI' && bankDtlsFlg == 'N' ){
	  addErrorXHTML('','Currently refund will be credited to a bank account located in India and not to a bank account located in a foreign country.');
	  j.setFieldError('itr.scheduleBA.bankDtlsFlag','Currently refund will be credited to a bank account located in India and not to a bank account located in a foreign country.');
	}
}

function displayWarningOsSec115BBDA(elem){

	var secValue = elem.value;

	if(secValue=='5BBDA'){

		addErrorXHTML('','Please enter the amount, if Dividend income from domestic company exceeds Rs.10 lakh.');

	}


}