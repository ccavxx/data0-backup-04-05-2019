var globTempStcg1 = 0;
var globTempStcg2 = 0;
var globTempltcg1 = 0;
var globTempltcg2 = 0;

var FY_start_date = '01/04/2016';
var FY_end_date = '31/03/2017';
var AY_start_date = '01/04/2017';
var Filing_dueDate = '05/08/2017';
var Int_start_date_234A = '06/08/2017';

var slab0_end_date = '15/06/2016';
var slab1_start_date = '16/06/2016';
var slab1_end_date = '15/09/2016';
var slab2_start_date = '16/09/2016';
var slab2_end_date = '15/12/2016';
var slab3_start_date = '16/12/2016';
var slab3_end_date = '15/03/2017';
var slab4_start_date = '16/03/2017';
var Cg_ded_start_date = '31/03/2015';
var Cg_ded_end_date = '01/04/2020';

var Int_234A_Due_date_234A = '06/08/2017'; // Modified due to the due date
// extended for filing the return
var Int_234A_IF_Yes_dt = '08/11/2017';
var Int_234A_IF_Yes_dt_SAT = '07/11/2017';
var Int_234A_IF_NO_dt = '05/08/2017'; // Modified due to the due date extended
// for filing the return

// To calculate ITR3
function calcITR3() {
	try {
		var cgosIncome = {};
		initCgOsInc(cgosIncome);
		enableTable(
				'scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag',
				'Y', 'scheduleLtcgunUtilizedCapGain54');
		enableTable(
				'scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag',
				'Y', 'scheduleStcgunUtilizedCapGain54');
		calSchS('scheduleSalaryMain');
		enableNRItables();
		calcScheduleFSI();
		totAmtOfSchedTR();
		scheduleHPCalcFor3();
		calCGPointB8Total();
		calCGA6TotalSum();
		calcSchBP(cgosIncome);
		calcSchCG(cgosIncome);
		var simap = calculateOS(cgosIncome);
		calculateCYLA(cgosIncome);
		var amt5BBC = simap['5BBC'];
		var amt5Ea = simap['5Ea'];
		populateSI(cgosIncome, simap);
		OSSubCal();
		calculatePartBTI_first();
		enableSchedule6A80GGA_Recalulate();
		caclDedSchVIA();
		calcTotal80GDeductions('ded100PerWithoutQual', 3, 2, amt5BBC, amt5Ea);
		calcTotal80GDeductions('ded50WithoutQual', 3, 2, amt5BBC, amt5Ea);
		calcTotal80GDeductions('ded100Qual', 3, 2, amt5BBC, amt5Ea);
		calcTotal80GDeductions('ded50WithQual', 3, 2, amt5BBC, amt5Ea);
		caclDedSchVIA();
		calcTotSchIF();
		calTotalEI();
		totAmtOfSched5A();
		calculatePartBTI_second();
		calculateTiTti(cgosIncome);
		calculateTCS();
		calculatePartBTTI_second(cgosIncome);
		panValidation80G('ded100PerWithoutQual');
		panValidation80G('ded50WithoutQual');
		panValidation80G('ded100Qual');
		panValidation80G('ded50WithQual');
		//checkNoOfRowsFilled();
		calculateTotalTaxIT('scheduleIt');
		surchargeEditable();
		removeIncomeDtls();
		enable115HFlag();
		enableFieldsFor115HFlg();
		checkSchEIxmlblock();
		section80DChk();
		genWarningMsgForNRI();

	} catch (e) {
		alert('Error in calcITR3:' + e);
	}
}

// Initialize cgosIncome variables
function initCgOsInc(cgosIncome) {
	cgosIncome.cgInc = {};
	cgosIncome.osInc = {};
	cgosIncome.cgInc.stcg = {};
	cgosIncome.cgInc.ltcg = {};
	cgosIncome.cgInc.ltcg.prctg10 = {};
	cgosIncome.cgInc.ltcg.prctg20 = {};
	cgosIncome.cgInc.stcg.prctg30 = 0;
	cgosIncome.cgInc.stcg.prctgAr = 0;
	cgosIncome.cgInc.stcg.prctg15 = {};
	cgosIncome.cgInc.stcg.prctg15.sec111a = 0;
	cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = 0;
	cgosIncome.cgInc.ltcg.prctg20.sec112 = 0;
	cgosIncome.cgInc.ltcg.prctg20.sec11EA = 0;
	cgosIncome.cgInc.ltcg.prctg10.secProviso = 0;
	cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = 0;
	cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = 0;
	cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1 = 0;
	cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = 0;
	cgosIncome.cgInc.ltcg.prctg10.sec115E_b = 0;
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
	cgosIncome.osInc.sec115BBC = 0;
	cgosIncome.osInc.sec115BBE = 0;
	cgosIncome.osInc.sec115BB = 0;
	cgosIncome.osInc.sec115E_a = 0;
	cgosIncome.osInc.sec111 = 0;
	cgosIncome.bpNetInc = 0;
}

// Initialize SI variables
function initMapForSI(cgosIncome) {
	var simap = {
		"5Eacg" : cgosIncome.cgInc.ltcg.prctg20.sec11EA,
		"5AC1c" : cgosIncome.cgInc.ltcg.prctg10.sec115AC_1,
		"5ACA1b" : cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1,
		"5ADiii" : cgosIncome.cgInc.ltcg.prctg10.sec115AD_3,
		"5Eb" : cgosIncome.cgInc.ltcg.prctg10.sec115E_b,
		"5AD1biip" : cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii,
		"1A" : cgosIncome.cgInc.stcg.prctg15.sec111a
	};
	return simap;
}

// To update SI variables
function updateMapForSI(cgosIncome, simap) {
	simap["5Eacg"] = cgosIncome.cgInc.ltcg.prctg20.sec11EA;
	simap["5AC1c"] = cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
	simap["5ACA1b"] = cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1;
	simap["5ADiii"] = cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
	simap["5Eb"] = cgosIncome.cgInc.ltcg.prctg10.sec115E_b;
	simap["5AD1biip"] = cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
	simap["1A"] = cgosIncome.cgInc.stcg.prctg15.sec111a;
}

//To enable NRI tables based on the status
function enableNRItables() {
	
	var resStatus =document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	if(resStatus == "NRI"){
		enableTableForNRI('partAGEN1.filingStatus.residentialStatus', 'NRI',
		'scheduleStcgDtaa');
		
		enableTableForNRI('partAGEN1.filingStatus.residentialStatus', 'NRI',
		'scheduleLtcgDtaa');
		
		enableTableForNRI('partAGEN1.filingStatus.residentialStatus', 'NRI',
		'scheduleOsNriIncTaxDtaa');
		
	}else{
		enableOSTableFor115H('partAGEN1.filingStatus.benefitUs115HFlg', 'Y',
		'scheduleStcgDtaa');
		
		enableOSTableFor115H('partAGEN1.filingStatus.benefitUs115HFlg', 'Y',
		'scheduleLtcgDtaa');

		enableOSTableFor115H('partAGEN1.filingStatus.benefitUs115HFlg', 'Y',
		'scheduleOsNriIncTaxDtaa');
	}
	
}

// To enable/disable tables based on the value
function enableTable(element, value, tableId) {

	var flag = document.getElementsByName(element)[0].value;
	var tabId = "#" + tableId;

	$(tabId).find(':input').prop('disabled', true);
	$(tabId).find('.addbtn').prop('hidden', true);

	if (flag == value) {
		$(tabId).find('.addbtn').prop('hidden', false);
		$(tabId).find(':input').prop('disabled', false);
	} else {
		$(tabId).find('[type=\"checkbox\"]').attr('checked', 'checked');
		if (tableId == 'scheduleLtcgunUtilizedCapGain54'
				|| tableId == 'scheduleStcgunUtilizedCapGain54') {
			deleteRowTable(tableId, 2, 2);
		} else {
			deleteRowTable(tableId, 2, 1);
		}
		$(tabId).find(':input').prop('disabled', true);
		$(tabId).find('.addbtn').prop('hidden', true);
	}
}

// To enable/disable tables based on the value for NRI's
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

// To calculate Schedule S values
function calSchS(tableId) {
	try {

		var tab = document.getElementById(tableId);
		var rowcount = tab.rows.length;
		var salaryCount = parseInt(rowcount / 14, 10);// 14 --> Total number
		// of fields will be
		// added for each click
		// 'Add Salary'
		var sumTotal = 0;
		var salaryTotal = 0;
		var exemptUs10Total = 0;

		for (var i = 0; i < salaryCount; i++) {

			var salary = document.getElementsByName('scheduleS.salaries[' + i
					+ '].salarys.salary')[0];
			salary.value = coalesce(salary.value);
			var allowancesNotExempt = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.allowancesNotExempt')[0];
			allowancesNotExempt.value = coalesce(allowancesNotExempt.value);
			var travelConcession = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.travelConcession')[0];
			travelConcession.value = coalesce(travelConcession.value);
			var taxPaidNonMonetary = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.TaxPaidNonMonetary')[0];
			taxPaidNonMonetary.value = coalesce(taxPaidNonMonetary.value);
			var allowanceExpHouseRent = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.allowanceExpHouseRent')[0];
			allowanceExpHouseRent.value = coalesce(allowanceExpHouseRent.value);
			var otherAllowances = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.otherAllowances')[0];
			otherAllowances.value = coalesce(otherAllowances.value);
			var valueOfPerquisites = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.valueOfPerquisites')[0];
			valueOfPerquisites.value = coalesce(valueOfPerquisites.value);
			var profitsInLieuOfSalary = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.profitsinLieuOfSalary')[0];
			profitsInLieuOfSalary.value = coalesce(profitsInLieuOfSalary.value);
			var deductionUS16 = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.deductionUnderSection16')[0];
			deductionUS16.value = coalesce(deductionUS16.value);
			var incomeChargeable = document
					.getElementsByName('scheduleS.salaries[' + i
							+ '].salarys.incomeFromSalary')[0];
			incomeChargeable.value = coalesce(incomeChargeable.value);

			salaryTotal = eval(parseInt(coalesce(salary.value), 10)
					+ parseInt(coalesce(allowancesNotExempt.value), 10)
					+ parseInt(coalesce(valueOfPerquisites.value), 10)
					+ parseInt(coalesce(profitsInLieuOfSalary.value), 10));

			if ((parseInt(salaryTotal, 0) < parseInt(
					coalesce(deductionUS16.value), 10))
					|| parseInt(coalesce(deductionUS16.value), 10) > 7500) {
				addErrorXHTML(document.getElementsByName('scheduleS.salaries['
						+ i + '].salarys.deductionUnderSection16')[0],
						'Deduction u/s 16 should not exceed '
								+ Math.min(7500, zeroOrMore(salaryTotal)), true);
				document.getElementsByName('scheduleS.salaries[' + i
						+ '].salarys.deductionUnderSection16')[0].value = "0";
			}

			incomeChargeable.value = eval(parseInt(salary.value, 10)
					+ parseInt(valueOfPerquisites.value, 10)
					+ parseInt(profitsInLieuOfSalary.value, 10)
					+ parseInt(allowancesNotExempt.value, 10)
					- parseInt(deductionUS16.value, 10));

			if (incomeChargeable.value < 0) {
				incomeChargeable.value = parseInt('0', 10);
			}
			sumTotal = eval(parseInt(sumTotal, 10)
					+ parseInt(coalesce(document
							.getElementsByName('scheduleS.salaries[' + i
									+ '].salarys.incomeFromSalary')[0].value),
							10));
			exemptUs10Total = eval(parseInt(travelConcession.value, 10)
					+ parseInt(taxPaidNonMonetary.value, 10)
					+ parseInt(allowanceExpHouseRent.value, 10)
					+ parseInt(otherAllowances.value, 10));
			document.getElementsByName('scheduleS.incomeChargeable')[0].value = parseInt(
					sumTotal, 10);
			document.getElementsByName('scheduleS.salaries[' + i
					+ '].salarys.allowancesExemptUSection10')[0].value = parseInt(
					exemptUs10Total, 10);
		}

	} catch (e) {
		alert('error in calSchS' + e);
	}
}

// To add Schedule S property on click on Add value
function addScheduleSalary() {
	var mainTable = document.getElementById('scheduleSalaryMain').rows;
	var tobeInsertBefore = document.getElementById('scheduleSalaryAddRow');
	var flag = false;
	var totRow = Math.floor(mainTable.length / 14) + 1;// 14 --> Total number
	// of fields will be
	// added for each click
	// 'Add Salary'
	var iterate = eval(parseInt(totRow) - 1);
	for (var i = 0; i < mainTable.length; i++) {
		var cloneNode = mainTable[i].cloneNode(true);
		if (mainTable[i].id == 'scheduleSalary1st') {
			flag = true;
			cloneNode.cells[0].innerHTML = totRow;
		}

		if (flag) {

			var cellsTot = cloneNode.cells;
			for (var j = 0; j < cellsTot.length; j++) {
				cloneNode.cells[j].innerHTML = cloneNode.cells[j].

				innerHTML.replace('1a', totRow + 'a').replace('1b',
						totRow + 'b').replace('1c', totRow + 'c').replace('1d',
						totRow + 'd').replace('1e', totRow + 'e').replace('1f',
						totRow + 'f').replace('1g', totRow + 'g').replace('1h',
						totRow + 'h').replace('1i', totRow + 'i').replace(
						'property 1', 'property ' + totRow).replace(
						'property 1', 'property ' + totRow);
			}

			var inputTags = cloneNode.getElementsByTagName('input');
			for (var a = 0; a < inputTags.length; a++) {
				inputTags[a].name = inputTags[a].name.replace('[0]', '['
						+ iterate + ']');
				inputTags[a].id = inputTags[a].name.replace(/([\.\[\]])/g, '_')
						.replace(/(__)/g, '_');

				var blurAttr = inputTags[a].getAttribute('onblur');
				if (blurAttr != null) {
					blurAttr = blurAttr + ";";
				} else {
					blurAttr = "";
				}
				inputTags[a].setAttribute('onblur', blurAttr
						+ 'j.blur(this,this.name,this.value);');
			}

			var selectTags = cloneNode.getElementsByTagName('select');
			for (var a = 0; a < selectTags.length; a++) {
				selectTags[a].name = selectTags[a].name.replace('[0]', '['
						+ iterate + ']');
				selectTags[a].value = '';
				selectTags[a].id = selectTags[a].name.replace(/([\.\[\]])/g,
						'_').replace(/(__)/g, '_');

				var blurAttr = selectTags[a].getAttribute('onblur');
				if (blurAttr != null) {
					blurAttr = blurAttr + ";";
				} else {
					blurAttr = "";
				}
				selectTags[a].setAttribute('onblur', blurAttr
						+ 'j.blur(this,this.name,this.value);');
			}

			var textareaTags = cloneNode.getElementsByTagName('textarea');
			for (var a = 0; a < textareaTags.length; a++) {
				textareaTags[a].name = textareaTags[a].name.replace('[0]', '['
						+ iterate + ']');
				textareaTags[a].value = '';
				textareaTags[a].id = textareaTags[a].name.replace(
						/([\.\[\]])/g, '_').replace(/(__)/g, '_');

				var blurAttr = textareaTags[a].getAttribute('onblur');
				if (blurAttr != null) {
					blurAttr = blurAttr + ";";
				} else {
					blurAttr = "";
				}
				textareaTags[a].setAttribute('onblur', blurAttr
						+ 'j.blur(this,this.name,this.value);');
			}

			document.getElementById('scheduleSalaryMain').getElementsByTagName(
					'tr')[0].parentNode.insertBefore(cloneNode,
					tobeInsertBefore);
		}
		if (mainTable[i].id == 'scheduleSalaryEnd') {
			flag = false;
			break;
		}
	}

	var newVal = eval(parseInt(totRow) + 1);
	document.getElementById('scheduleSlast').cells[0].innerHTML = newVal;

	if ($('#scheduleSalaryAddRow')[0].parentNode.children.length == 11) {
		$('#delSalaryButtonId').prop('disabled', true);
	} else if ($('#scheduleSalaryAddRow')[0].parentNode.children.length > 11) {
		$('#delSalaryButtonId').prop('disabled', false);
	}

	var table = document.getElementById('scheduleSalaryMain');
	modifyRow(table);
	checkMaxLengthLimit();
}

// To delete Schedule Salary Values on click on Delete button
function delScheduleSalary() {

	if ($('#scheduleSalaryAddRow')[0].parentNode.children.length > 16) {

		for (var i = 0; i < 14; i++) {

			$('#scheduleSalaryAddRow')[0].parentNode
					.deleteRow($('#scheduleSalaryAddRow')[0].parentNode.children.length - 3);
		}

	}
	var totRow = document.getElementById('scheduleSlast').cells[0].textContent;
	var newVal = eval(parseInt(totRow) - 1);
	var newText = 'Total (';
	for (var k = 1; k < newVal; k++) {
		newText = newText + k + 'i +';
	}
	newText = newText + newVal + 'a +' + newVal + 'b )';
	document.getElementById('scheduleSlast').cells[0].innerHTML = newVal;

	if ($('#scheduleSalaryAddRow')[0].parentNode.children.length == 16) {
		$('#delSalaryButtonId').prop('disabled', true);
	} else if ($('#scheduleSalaryAddRow')[0].parentNode.children.length > 16) {
		$('#delSalaryButtonId').prop('disabled', false);
	}
	calcITR3();
}

// To calculate tax
function calculateTax() {
	clearOldValues();
	calcITR3();
}

// To validate on submit of ITR
function validateOnSubmit() {
	checkDropdownSelectedin1d();
	calcSchCGLtcgStcg();
	validateScheduleHP();
	mandateA6();
	mandateB8();
	checkSchFAMandatory();
	validateHPRent();
	onSubmitCheck_CYLA_BFLA_CFL();
	calculateTDS();
	calculateTCS();
	validateCGSecwiseDed();
	validateCGDedDate();
	checkUniqueOSSec();
	checkEmptyAmtSpouse();
	panStatusCheckValdt();
	validateFSI();
	scheduleFSIAlert();
	CheckHPShareProperty();
	priBankMandtry();
	calSchS('scheduleSalaryMain');
	checkSchedule5A();
	checkUniqueTableCol('scheduleFSI', 'countryCode$',
			'Same Country cannot be selected more than once.');
	panValidation80G('ded100PerWithoutQual');
	panValidation80G('ded50WithoutQual');
	panValidation80G('ded100Qual');
	panValidation80G('ded50WithQual');
	//checkNoOfRowsFilled();
	setValuesCG54B();
	validateSTCGSectionWiseDTAA();
	validateLTCGSectionWiseDTAA();
	// validatePassport();
	calculateTotalTaxIT('scheduleIt');
	checkUnUtilizedCG();
	checkUnUtilizedLTCG();
	checkPANFromIF();
	mandtryAL();
	checkSchEIxmlblock();
	section80DChk();
	// validateSchAL();
	// Always keep alertItr3User() at the last
	alertItr3User();
	
}

/*
 * function validateSchAL() { var immovableAssetLand = document
 * .getElementsByName('scheduleAL.immovableAssetLand')[0].value; var
 * immovableAssetBuilding = document
 * .getElementsByName('scheduleAL.immovableAssetBuilding')[0].value; var
 * depositsInBank = document
 * .getElementsByName('scheduleAL.movableAsset.depositsInBank')[0].value; var
 * sharesAndSecurities = document
 * .getElementsByName('scheduleAL.movableAsset.sharesAndSecurities')[0].value;
 * var insurancePolicies = document
 * .getElementsByName('scheduleAL.movableAsset.insurancePolicies')[0].value; var
 * loansAndAdvancesGiven = document
 * .getElementsByName('scheduleAL.movableAsset.loansAndAdvancesGiven')[0].value;
 * var cashInHand = document
 * .getElementsByName('scheduleAL.movableAsset.cashInHand')[0].value; var
 * jewelleryBullionEtc = document
 * .getElementsByName('scheduleAL.movableAsset.jewelleryBullionEtc')[0].value;
 * var archCollDrawPaintSulpArt = document
 * .getElementsByName('scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].value;
 * var vehiclYachtsBoatsAircrafts = document
 * .getElementsByName('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value;
 * var liabilityInRelatAssets = document
 * .getElementsByName('scheduleAL.liabilityInRelatAssets')[0].value;
 * 
 * var totalImmovablMovablAssets = document
 * .getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0];
 * 
 * if (immovableAssetLand == '' && immovableAssetBuilding == '' &&
 * depositsInBank == '' && sharesAndSecurities == '' && insurancePolicies == '' &&
 * loansAndAdvancesGiven == '' && cashInHand == '' && jewelleryBullionEtc == '' &&
 * archCollDrawPaintSulpArt == '' && vehiclYachtsBoatsAircrafts == '' &&
 * liabilityInRelatAssets == '') { totalImmovablMovablAssets.value = ''; } }
 */
// To check whether UnUtilized CG schedule is filled
function checkUnUtilizedCG() {

	var UnUtilizedFlag = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag')[0].value;

	if (UnUtilizedFlag == 'Y') {
		var tab1 = document.getElementById('scheduleStcgunUtilizedCapGain54');
		var isRowBlank = checkRowBlank('scheduleStcgunUtilizedCapGain54', 3, 2);
		var yearConst54B = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.yearConst')[0].value;
		var amtUtilizd54B = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.amountUtilized')[0].value;
		var amtNotUtilzd54B = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.amountUnUtilized')[0].value;
		var isSecondRowBlank = false;

		if (yearConst54B == '' && amtUtilizd54B == '' && amtNotUtilzd54B == '') {
			isSecondRowBlank = true;
		}

		if (isRowBlank && isSecondRowBlank) {
			j
					.setFieldError(
							'scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag',
							'Entry in CG Table is mandatry');
		}
	}
}

// To check whether UnUtilized LTCG schedule is filled
function checkUnUtilizedLTCG() {

	var UnUtilizedFlag = document
			.getElementsByName('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag')[0].value;

	if (UnUtilizedFlag == 'Y') {
		var tab1 = document.getElementById('scheduleLtcgunUtilizedCapGain54');
		var isRowBlank = checkRowBlank('scheduleLtcgunUtilizedCapGain54', 3, 2);
		var yearConst54B = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.yearConst')[0].value;
		var amtUtilizd54B = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.amountUtilized')[0].value;
		var amtNotUtilzd54B = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.amountUnUtilized')[0].value;
		var isSecondRowBlank = false;

		if (yearConst54B == '' && amtUtilizd54B == '' && amtNotUtilzd54B == '') {
			isSecondRowBlank = true;
		}

		if (isRowBlank && isSecondRowBlank) {
			j
					.setFieldError(
							'scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag',
							'Entry in CG Table is mandatry');
		}
	}
}

// To validate STCG Section Wise values with DTAA table
function validateSTCGSectionWiseDTAA() {
	var arr = {
		'A1e' : 0,
		'A2e_111A' : 0,
		'A2e_115AD' : 0,
		'A3a' : 0,
		'A3b' : 0,
		'A4e' : 0,
		'A5e' : 0,
		'A6' : 0
	};
	var tab = document.getElementById('scheduleStcgDtaa');
	var rowCount = tab.rows.length - 2;
	for (var i = 0; i < rowCount; i++) {
		var itemIncluded = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
						+ i + '].itemIncluded')[0].value;
		var amount = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
						+ i + '].amount')[0].value;
		if (itemIncluded == 'A1e') {
			arr['A1e'] = parseInt(arr['A1e'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'A3a') {
			arr['A3a'] = parseInt(arr['A3a'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'A3b') {
			arr['A3b'] = parseInt(arr['A3b'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'A4e') {
			arr['A4e'] = parseInt(arr['A4e'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'A5e') {
			arr['A5e'] = parseInt(arr['A5e'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'A6') {
			arr['A6'] = parseInt(arr['A6'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'A2e_111A') {
			arr['A2e_111A'] = parseInt(arr['A2e_111A'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'A2e_115AD') {
			arr['A2e_115AD'] = parseInt(arr['A2e_115AD'], 10)
					+ parseInt(coalesce(amount), 10);
		}
	}

	var table = document.getElementById('scheduleStcgDtaa');
	var rowCount = table.rows.length - 2;

	var dtaaSection = [];

	for (var i = 0; i < rowCount; i++) {
		var itemIncluded = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.stcgUnderDtaa['
						+ i + '].itemIncluded')[0].value;
		if (itemIncluded != '' && dtaaSection.indexOf(itemIncluded) == -1) {
			dtaaSection.push(itemIncluded);
		}
	}

	var table1 = document.getElementById('scheduleCGstcg2');
	var rowCount1 = table1.rows.length / 10;

	var arrSection2 = [];
	var arrAmount2 = {
		'1A' : 0,
		'5AD1biip' : 0
	};

	for (var k = 0; k < rowCount1; k++) {
		var section = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['
						+ k + '].section')[0].value;
		var amount = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT['
						+ k + '].fullConsideration')[0].value;
		if (section != '' && arrSection2.indexOf(section) == -1) {
			arrSection2.push(section);
			arrAmount2[section] = amount;
		}
	}

	var fullConsideration50C = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];
	if (dtaaSection.indexOf('A1e') != -1 && arr['A1e'] > 0
			&& fullConsideration50C.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C',
						'A1e value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				fullConsideration50C,
				'A1e value should not be zero as there is an entry in DTAA table.',
				true);
	}

	if (dtaaSection.indexOf('A2e_111A') != -1 && arr['A2e_111A'] > 0
			&& (arrSection2.indexOf('1A') == -1 || arrAmount2['1A'] == 0)) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section',
						'111A section in A2 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(
				document
						.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section')[0],
				'111A section in A2 should be selected and amount should not be zero, as there is an entry in DTAA table.',
				true);
	}

	if (dtaaSection.indexOf('A2e_115AD') != -1
			&& arr['A2e_115AD'] > 0
			&& (arrSection2.indexOf('5AD1biip') == -1 || arrAmount2['5AD1biip'] == 0)) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section',
						'115AD(1)(b)(ii) section in A2 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(
				document
						.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].section')[0],
				'115AD(1)(b)(ii) section in A2 should be selected and amount should not be zero, as there is an entry in DTAA table.',
				true);
	}

	var nRItaxSTTPaid = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0];
	if (dtaaSection.indexOf('A3a') != -1 && arr['A3a'] > 0
			&& nRItaxSTTPaid.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid',
						'A3a value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				nRItaxSTTPaid,
				'A3a value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var nRItaxSTTNotPaid = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0];
	if (dtaaSection.indexOf('A3b') != -1 && arr['A3b'] > 0
			&& nRItaxSTTNotPaid.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid',
						'A3b value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				nRItaxSTTNotPaid,
				'A3b value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var fullConsideration = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0];
	if (dtaaSection.indexOf('A4e') != -1 && arr['A4e'] > 0
			&& fullConsideration.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration',
						'A4e value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				fullConsideration,
				'A4e value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var fullConsiderationA5e = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration')[0];
	if (dtaaSection.indexOf('A5e') != -1 && arr['A5e'] > 0
			&& fullConsiderationA5e.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration',
						'A5e value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				fullConsiderationA5e,
				'A5e value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var totAmtStcgUnderDtaa = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa')[0];
	if (dtaaSection.indexOf('A6') != -1 && arr['A6'] > 0
			&& totAmtStcgUnderDtaa.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa',
						'A6 value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				totAmtStcgUnderDtaa,
				'A6 value should not be zero as there is an entry in DTAA table.',
				true);
	}
}

// To validate LTCG Section Wise values with DTAA table
function validateLTCGSectionWiseDTAA() {
	var arr = {
		'B1e' : 0,
		'B2e' : 0,
		'B3e_22' : 0,
		'B3e_5ACA1b' : 0,
		'B4c' : 0,
		'B5e_21ciii' : 0,
		'B5e_5AC1c' : 0,
		'B5e_5ADiii' : 0,
		'B6c' : 0,
		'B6f' : 0,
		'B7e' : 0,
		'B8' : 0
	};
	var tab = document.getElementById('scheduleLtcgDtaa');
	var rowCount = tab.rows.length - 2;
	for (var i = 0; i < rowCount; i++) {
		var itemIncluded = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
						+ i + '].itemIncluded')[0].value;
		var amount = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
						+ i + '].amount')[0].value;
		if (itemIncluded == 'B1e') {
			arr['B1e'] = parseInt(arr['B1e'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B2e') {
			arr['B2e'] = parseInt(arr['B2e'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B3e_22') {
			arr['B3e_22'] = parseInt(arr['B3e_22'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B3e_5ACA1b') {
			arr['B3e_5ACA1b'] = parseInt(arr['B3e_5ACA1b'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B4c') {
			arr['B4c'] = parseInt(arr['B4c'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B5e_21ciii') {
			arr['B5e_21ciii'] = parseInt(arr['B5e_21ciii'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B5e_5AC1c') {
			arr['B5e_5AC1c'] = parseInt(arr['B5e_5AC1c'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B5e_5ADiii') {
			arr['B5e_5ADiii'] = parseInt(arr['B5e_5ADiii'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B6c') {
			arr['B6c'] = parseInt(arr['B6c'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B6f') {
			arr['B6f'] = parseInt(arr['B6f'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B7e') {
			arr['B7e'] = parseInt(arr['B7e'], 10)
					+ parseInt(coalesce(amount), 10);
		} else if (itemIncluded == 'B8') {
			arr['B8'] = parseInt(arr['B8'], 10)
					+ parseInt(coalesce(amount), 10);
		}
	}

	var table = document.getElementById('scheduleLtcgDtaa');
	var rowCount = table.rows.length - 2;

	var dtaaSection = [];

	for (var i = 0; i < rowCount; i++) {
		var itemIncluded = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa['
						+ i + '].itemIncluded')[0].value;
		if (itemIncluded != '' && dtaaSection.indexOf(itemIncluded) == -1) {
			dtaaSection.push(itemIncluded);
		}
	}

	var fullConsideration50C = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];
	if (dtaaSection.indexOf('B1e') != -1 && arr['B1e'] > 0
			&& fullConsideration50C.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C',
						'B1e value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				fullConsideration50C,
				'B1e value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var fullConsideration = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.fullConsideration')[0];
	if (dtaaSection.indexOf('B2e') != -1 && arr['B2e'] > 0
			&& fullConsideration.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.fullConsideration',
						'B2e value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				fullConsideration,
				'B2e value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var table1 = document.getElementById('scheduleCGltcg3');
	var rowCount1 = table1.rows.length / 11;

	var arrSection = [];
	var arrAmount = {
		'22' : 0,
		'5ACA1b' : 0
	};

	for (var k = 0; k < rowCount1; k++) {
		var sectionCode = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['
						+ k + '].sectionCode')[0].value;
		var fullConsideration = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable['
						+ k + '].fullConsideration')[0].value;
		if (sectionCode != '' && arrSection.indexOf(sectionCode) == -1) {
			arrSection.push(sectionCode);
			arrAmount[sectionCode] = fullConsideration;
		}
	}

	if (dtaaSection.indexOf('B3e_22') != -1 && arr['B3e_22'] > 0
			&& (arrSection.indexOf('22') == -1 || arrAmount['22'] == 0)) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode',
						'22 section in B3 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(
				document
						.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode')[0],
				'22 section in B3 should be selected and amount should not be zero, as there is an entry in DTAA table.',
				true);
	}
	if (dtaaSection.indexOf('B3e_5ACA1b') != -1 && arr['B3e_5ACA1b'] > 0
			&& (arrSection.indexOf('5ACA1b') == -1 || arrAmount['5ACA1b'] == 0)) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode',
						'5ACA1b section in B3 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(
				document
						.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode')[0],
				'5ACA1b section in B3 should be selected and amount should not be zero, as there is an entry in DTAA table.',
				true);
	}

	var BalanceCG = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.BalanceCG')[0];
	if (dtaaSection.indexOf('B4c') != -1 && arr['B4c'] > 0
			&& BalanceCG.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.BalanceCG',
						'B4c value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				BalanceCG,
				'B4c value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var table2 = document.getElementById('stcg10pctTab');
	var rowCount2 = table2.rows.length / 11;

	var arrSection1 = [];
	var arrAmount1 = {
		'21ciii' : 0,
		'5AC1c' : 0,
		'5ADiii' : 0
	};

	for (var a = 0; a < rowCount2; a++) {
		var sectionCode = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['
						+ a + '].sectionCode')[0].value;
		var amount = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115['
						+ a + '].fullConsideration')[0].value;
		if (sectionCode != '' && arrSection1.indexOf(sectionCode) == -1) {
			arrSection1.push(sectionCode);
			arrAmount1[sectionCode] = amount;
		}
	}

	if (dtaaSection.indexOf('B5e_21ciii') != -1
			&& arr['B5e_21ciii'] > 0
			&& (arrSection1.indexOf('21ciii') == -1 || arrAmount1['21ciii'] == 0)) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode',
						'21ciii section in B5 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(
				document
						.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode')[0],
				'21ciii section in B5 should be selected and amount should not be zero, as there is an entry in DTAA table.',
				true);
	}

	if (dtaaSection.indexOf('B5e_5AC1c') != -1 && arr['B5e_5AC1c'] > 0
			&& (arrSection1.indexOf('5AC1c') == -1 || arrAmount1['5AC1c'] == 0)) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode',
						'5AC1c section in B5 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(
				document
						.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode')[0],
				'5AC1c section in B5 should be selected and amount should not be zero, as there is an entry in DTAA table.',
				true);
	}

	if (dtaaSection.indexOf('B5e_5ADiii') != -1
			&& arr['B5e_5ADiii'] > 0
			&& (arrSection1.indexOf('5ADiii') == -1 || arrAmount1['5ADiii'] == 0)) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode',
						'5ADiii section in B5 should be selected and amount should not be zero, as there is an entry in DTAA table.');
		addErrorXHTML(
				document
						.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].sectionCode')[0],
				'5ADiii section in B5 should be selected and amount should not be zero, as there is an entry in DTAA table.',
				true);
	}

	var balonSpeciAsset = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balonSpeciAsset')[0];
	if (dtaaSection.indexOf('B6c') != -1 && arr['B6c'] > 0
			&& balonSpeciAsset.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balonSpeciAsset',
						'B6c value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				balonSpeciAsset,
				'B6c value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var balOtherthanSpecAsset = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balOtherthanSpecAsset')[0];
	if (dtaaSection.indexOf('B6f') != -1 && arr['B6f'] > 0
			&& balOtherthanSpecAsset.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.balOtherthanSpecAsset',
						'B6f value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				balOtherthanSpecAsset,
				'B6f value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var fullConsiderationB7e = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration')[0];
	if (dtaaSection.indexOf('B7e') != -1 && arr['B7e'] > 0
			&& fullConsiderationB7e.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration',
						'B7e value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				fullConsiderationB7e,
				'B7e value should not be zero as there is an entry in DTAA table.',
				true);
	}

	var totAmtStcgUnderDtaa = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0];
	if (dtaaSection.indexOf('B8') != -1 && arr['B8'] > 0
			&& totAmtStcgUnderDtaa.value == 0) {
		j
				.setFieldError(
						'scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa',
						'B8 value should not be zero as there is an entry in DTAA table.');
		addErrorXHTML(
				totAmtStcgUnderDtaa,
				'B8 value should not be zero as there is an entry in DTAA table.',
				true);
	}
}

// To check the value selected in DTAA table is selected in the 1d table or not
function checkDropdownSelectedin1d() {
	var table = document.getElementById('scheduleOsNriIncTaxDtaa');
	var rowCount = table.rows.length - 2;
	var itemIncluded = [];

	var tabl = document.getElementById('schduleOsf');
	var rowCountTab1 = tabl.rows.length - 3;
	var sourceDescriptionMap = [];

	for (var i = 0; i < rowCount; i++) {
		var section = document
				.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
						+ i + '].itemIncluded')[0];
		if (section.value != '' && section.value != '56i'
				&& section.value != '56'
				&& itemIncluded.indexOf(section.value) == -1) {
			itemIncluded.push(section.value);
		}
	}

	for (var i = 1; i < rowCountTab1; i++) {
		var sourceDescription = document
				.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
						+ i + '].sourceDescription')[0];

		if (sourceDescription.value != ''
				&& sourceDescriptionMap.indexOf(sourceDescription.value) == -1) {
			sourceDescriptionMap.push(sourceDescription.value);
		}
	}
	var index = 0;
	for (var i = 0; i < itemIncluded.length; i++) {
		if (sourceDescriptionMap.indexOf(itemIncluded[i]) == -1) {
			for (var k = 0; k < rowCount; k++) {
				var section = document
						.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
								+ k + '].itemIncluded')[0];
				if (section.value != '' && section.value == itemIncluded[i]) {
					index = k;
				}
			}
			addErrorXHTML(
					document
							.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
									+ index + '].itemIncluded')[0],
					'Please select this section in table 1d.', true);
			j.setFieldError('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
					+ index + '].itemIncluded',
					'Please select this section in table 1d.');
		}
	}
}

// To remove all the Sections from the drop down
function removeSection(sectionArray, rowCount) {
	try {
		for (var i = 1; i < rowCount; i++) {
			var selectsLength = document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ i + '].sourceDescription')[0].options.length;
			for (var k = selectsLength; k > 0; k--) {
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
		alert(e.stack);
	}
}

function removeSectionOnChange(sectionArray, rowCount) {
	try {
		for (var i = 1; i < rowCount; i++) {
			var selectsLength = document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ i + '].sourceDescription')[0].options.length;
			for (var k = selectsLength; k > 0; k--) {
				if (document
						.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
								+ i + '].sourceDescription')[0].options[k] != null
						&& sectionArray
								.indexOf(document
										.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
												+ i + '].sourceDescription')[0].options[k].value) != -1) {

					var NRI_value = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
									+ i + '].sourceDescription')[0].value;

					if (NRI_value == '5BBF' || NRI_value == '5BBDA'
							|| NRI_value == '5ACA1a') {
						document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
										+ i + '].sourceAmount')[0].value = 0;
					}
					document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
									+ i + '].sourceDescription')[0].remove(k);

				}
			}
		}
		calcITR3();

	} catch (e) {
		alert('exception in removeSection' + e.stack);
	}
}

// To add all the Sections to the drop down
function addAllOptions(allSectionArray, rowCount) {
	for (var i = 1; i < rowCount; i++) {
		var srcDesc = document
				.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
						+ i + '].sourceDescription')[0];
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

// To set Other Gross Source based on the Residential status
function setOtherGrossSource() {
	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	
	var ben115HFlg = document
	.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;

	
	var tab = document.getElementById('schduleOsf');
	var rowCount = tab.rows.length - 3;

	var allSectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
			'5A1aiiab', '5A1aiiac', '5A1aiii', '5A1bA', '5A1bB', '5AC1ab',
			'5ACA1a', '5AD1i', '5AD1iP', '5BBA', '5BBC', '5BBDA', '5BBF',
			'5Ea', '1', 'Others' ];
	
	if(ben115HFlg == 'Y')
	{
	addAllOptions(allSectionArray, rowCount);
	}

	if ((status == 'RES' || status == 'NOR')&& ben115HFlg != 'Y' ){
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
				'5A1aiiab', '5A1aiiac', '5A1aiii', '5A1bA', '5A1bB', '5AC1ab',
				'5BBA' ];
		removeSection(sectionArray, rowCount);
	} else if (status == 'NRI') {
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = [ '5ACA1a', '5BBDA', '5BBF' ];
		removeSection(sectionArray, rowCount);
	}
	
}

function setOtherGrossSourceOnChange() {
	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	
	var ben115HFlg = document
	.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;

	var tab = document.getElementById('schduleOsf');
	var rowCount = tab.rows.length - 3;

	var allSectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
			'5A1aiiab', '5A1aiiac', '5A1aiii', '5A1bA', '5A1bB', '5AC1ab',
			'5ACA1a', '5AD1i', '5AD1iP', '5BBA', '5BBC', '5BBDA', '5BBF',
			'5Ea', '1', 'Others' ];

	if ((status == 'RES' || status == 'NOR')&& ben115HFlg != 'Y' ){
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = [ '5A1ai', '5A1aii', '5A1aiia', '5A1aiiaa',
				'5A1aiiab', '5A1aiiac', '5A1aiii', '5A1bA', '5A1bB', '5AC1ab',
				'5BBA' ];
		removeSectionOnChange(sectionArray, rowCount);
	} else if (status == 'NRI') {
		addAllOptions(allSectionArray, rowCount);
		var sectionArray = [ '5ACA1a', '5BBDA', '5BBF' ];
		removeSectionOnChange(sectionArray, rowCount);
	}
	
	if(ben115HFlg == 'Y')
	{
	addAllOptions(allSectionArray, rowCount);
	}
}
// To calculate VIA deductions
function caclDedSchVIA() {
	try {

		var grossTotInc = document
				.getElementsByName('partBTI.grossTotalIncome')[0];
		var incChrgable = document
				.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0];
		var resStatus = document
				.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
		var status = document
				.getElementsByName('partAGEN1.personalInfo.status')[0].value;

		if (parseInt(grossTotInc.value, 10) < 0) {

			grossTotInc.value = '0';
		}
		if (parseInt(incChrgable.value, 10) < 0) {

			incChrgable.value = '0';
		}
		var gtiLimit = eval(parseInt(coalesce(grossTotInc.value), 10)
				- parseInt(coalesce(incChrgable.value), 10));

		if (gtiLimit < 0) {
			gtiLimit = 0;
		}

		var sec80C = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80C')[0];
		var sec80CSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80C')[0];

		var sec80CCC = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCC')[0];
		var sec80CCCSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCC')[0];

		var sec80CCDi = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCDi')[0];
		var sec80CCDiSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCDi')[0];

		var sec80CCD1B = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCD1B')[0];
		var sec80CCD1BSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCD1B')[0];

		var sec80CCDii = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCDii')[0];
		var sec80CCDiiSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCDii')[0];

		var sec80CCG = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCG')[0];
		var sec80CCGSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCG')[0];

		var sec80D = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80D')[0];
		var sec80DSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80D')[0];

		var sec80DD = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DD')[0];
		var sec80DDSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80DD')[0];

		var sec80DDB = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DDB')[0];
		var sec80DDBSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80DDB')[0];

		var sec80EE = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80EE')[0];
		var sec80EESysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80EE')[0];

		var sec80E = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80E')[0];
		var sec80ESysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80E')[0];

		var sec80G = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80G')[0];
		var sec80GSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80G')[0];
		var totalElgblAmt80G = document
				.getElementsByName('schedule80G.totalEligibleDonationsUs80G')[0];

		var sec80GG = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GG')[0];
		var sec80GGSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80GG')[0];

		var sec80GGA = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0];
		var sec80GGASysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80GGA')[0];

		var sec80GGC = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGC')[0];
		var sec80GGCSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80GGC')[0];

		var sec80QQB = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80QQB')[0];
		var sec80QQBSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80QQB')[0];

		var sec80RRB = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80RRB')[0];
		var sec80RRBSysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80RRB')[0];

		var sec80TTA = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80TTA')[0];
		var sec80TTASysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80TTA')[0];

		var sec80U = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80U')[0];
		var sec80USysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.section80U')[0];

		var totalDedVIA = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.totalChapVIADeductions')[0];

		totalDedVIA.value = coalesce(totalDedVIA.value);


		var totalDedVIASysCal = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.totalChapVIADeductions')[0];


		totalDedVIASysCal.value = coalesce(totalDedVIASysCal.value);

		var salaries = document.getElementsByName('partBTI.salaries')[0];

		// 80C

		if (parseInt(coalesce(gtiLimit), 10) > eval('100000')) {
			if (parseInt(coalesce(sec80C.value), 10) > eval('150000')) {
				sec80CSysCal.value = '150000';
			} else {
				sec80CSysCal.value = parseInt(coalesce(sec80C.value), 10);
			}

		} else {

			if (parseInt(coalesce(sec80C.value), 10) > parseInt(
					coalesce(gtiLimit), 10)) {
				sec80CSysCal.value = gtiLimit;
			} else {
				sec80CSysCal.value = parseInt(coalesce(sec80C.value), 10);
			}
		}
		// 80CCC

		if (status == 'I') {

			if (parseInt(coalesce(gtiLimit), 10) > eval('100000')) {
				if (parseInt(coalesce(sec80CCC.value), 10) > eval('150000')) {
					sec80CCCSysCal.value = '150000';
				} else {
					sec80CCCSysCal.value = parseInt(coalesce(sec80CCC.value),
							10);
				}

			} else {

				if (parseInt(coalesce(sec80CCC.value), 10) > parseInt(
						coalesce(gtiLimit), 10)) {
					sec80CCCSysCal.value = gtiLimit;
				} else {
					sec80CCCSysCal.value = parseInt(coalesce(sec80CCC.value),
							10);
				}

			}

		} else {

			sec80CCCSysCal.value = parseInt('0', 10);

		}

		// CHECK FOR 80CCDii (EMPLOYER CONTRIBUTIION)
		var temp = Math.round(eval(parseInt(coalesce(salaries.value), 10))
				* eval('0.10'));
		if (status == 'I') {
			if (parseInt(sec80CCDii.value, 10) > temp) {
				sec80CCDiiSysCal.value = temp;
			} else {
				sec80CCDiiSysCal.value = parseInt(sec80CCDii.value, 10);
			}
		} else {
			sec80CCDiiSysCal.value = parseInt('0', 10);
		}

		// CHECK FOR 80CCD1B

		if (status == 'I') {
			if (parseInt(grossTotInc.value, 10) > eval('50000')) {
				if (parseInt(sec80CCD1B.value, 10) > eval('50000')) {
					sec80CCD1BSysCal.value = '50000';
				} else {
					sec80CCD1BSysCal.value = parseInt(sec80CCD1B.value, 10);
				}
			} else {

				if (parseInt(coalesce(sec80CCD1B.value), 10) > parseInt(
						coalesce(grossTotInc.value), 10)) {
					sec80CCD1BSysCal.value = parseInt(grossTotInc.value, 10);
				} else {
					sec80CCD1BSysCal.value = parseInt(
							coalesce(sec80CCD1B.value), 10);
				}

			}
		} else {
			sec80CCD1BSysCal.value = parseInt('0', 10);

		}

		// CHECK FOR 80CCDi(EMPLOYEE)

		var salUppLimit = Math
				.round(eval(parseInt(coalesce(salaries.value), 10))
						* eval('0.10'));
		var gtiUppLimit = Math.round(eval(parseInt(coalesce(grossTotInc.value),
				10))
				* eval('0.10'));

		if (status == 'I') {
			if (parseInt(coalesce(salaries.value)) == parseInt('0', 10)) {
				if (gtiUppLimit > parseInt('150000', 10)) {
					if (parseInt(coalesce(sec80CCDi.value), 10) > eval('150000')) {
						sec80CCDiSysCal.value = '150000';
					} else {
						sec80CCDiSysCal.value = parseInt(
								coalesce(sec80CCDi.value), 10);
					}
				} else {
					if (parseInt(coalesce(sec80CCDi.value), 10) > gtiUppLimit) {
						sec80CCDiSysCal.value = gtiUppLimit;
					} else {
						sec80CCDiSysCal.value = parseInt(
								coalesce(sec80CCDi.value), 10);
					}
				}
			} else {

				if (salUppLimit > parseInt('150000', 10)) {
					if (parseInt(coalesce(sec80CCDi.value), 10) > eval('150000')) {
						sec80CCDiSysCal.value = '150000';
					} else {
						sec80CCDiSysCal.value = parseInt(
								coalesce(sec80CCDi.value), 10);
					}
				} else {
					if (parseInt(coalesce(sec80CCDi.value), 10) > salUppLimit) {
						sec80CCDiSysCal.value = salUppLimit;
					} else {
						sec80CCDiSysCal.value = parseInt(
								coalesce(sec80CCDi.value), 10);
					}
				}

			}
		} else if (status == 'H') {
			sec80CCDiSysCal.value = parseInt('0', 10);
		}
		// 80CCG
		if (status == 'I') {
			if (resStatus == 'RES' || resStatus == 'NOR') {

				if (parseInt(coalesce(grossTotInc.value), 10) <= parseInt(
						'1200000', 10)) {

					if (gtiLimit > parseInt('25000', 10)) {

						if (parseInt(coalesce(sec80CCG.value), 10) > eval('25000')) {
							sec80CCGSysCal.value = '25000';
						} else {
							sec80CCGSysCal.value = parseInt(
									coalesce(sec80CCG.value), 10);
						}

					} else {

						if (parseInt(coalesce(sec80CCG.value), 10) > gtiLimit) {
							sec80CCGSysCal.value = gtiLimit;
						} else {
							sec80CCGSysCal.value = parseInt(
									coalesce(sec80CCG.value), 10);
						}
					}

				} else {
					sec80CCGSysCal.value = parseInt('0', 10);
				}

			} else {

				sec80CCGSysCal.value = parseInt('0', 10);
			}

		} else {
			sec80CCGSysCal.value = parseInt('0', 10);
		}

		// 80D

		var age = calcAge();
		 var option80D = document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].value;
		if (status == 'I') {
			

			if(option80D == '1'){
				if( parseInt(sec80D.value,10) > eval('25000')){
					sec80DSysCal.value = '25000';
				} else {
					sec80DSysCal.value =  parseInt(sec80D.value,10);
				}
			}else if(option80D== '2'&& (resStatus == 'RES' || resStatus == 'NOR')){
				if( parseInt(sec80D.value,10) > eval('30000')){
					sec80DSysCal.value = '30000';
				} else {
					sec80DSysCal.value =  parseInt(sec80D.value,10);
				}
			}else if(option80D== '2'){
				if( parseInt(sec80D.value,10) > eval('25000')){
					sec80DSysCal.value = '25000';
				} else {
					sec80DSysCal.value =  parseInt(sec80D.value,10);
				}
			}else if(option80D== '3'){
				if( parseInt(sec80D.value,10) > eval('25000')){
					sec80DSysCal.value = '25000';
				} else {
					sec80DSysCal.value =  parseInt(sec80D.value,10);
				}
			}else if(option80D== '4'){
				if( parseInt(sec80D.value,10) > eval('30000')){
					sec80DSysCal.value = '30000';
				} else {
					sec80DSysCal.value =  parseInt(sec80D.value,10);
				}
			}else if(option80D== '5'){
				if( parseInt(sec80D.value,10) > eval('50000')){
					sec80DSysCal.value = '50000';
				} else {
					sec80DSysCal.value =  parseInt(sec80D.value,10);
				}
			}else if(option80D== '6'){
				if( parseInt(sec80D.value,10) > eval('55000')){
					sec80DSysCal.value = '55000';
				} else {
					sec80DSysCal.value =  parseInt(sec80D.value,10);
				}

			}else if(option80D== '7' ){
				if(age > eval('59') && (resStatus == 'RES' || resStatus == 'NOR')){
					if( parseInt(sec80D.value,10) > eval('60000')){

						sec80DSysCal.value = '60000';
					} else {
						sec80DSysCal.value =  parseInt(sec80D.value,10);
					}
				}else{

					if( parseInt(sec80D.value,10) > eval('55000')){
						sec80DSysCal.value = '55000';
					} else {
						sec80DSysCal.value =  parseInt(sec80D.value,10);
					}

				}
			}else{
				sec80DSysCal.value= parseInt('0',10);
			}
			if(parseInt(gtiLimit ,10) < sec80DSysCal.value){
					sec80DSysCal.value = gtiLimit;
			}
			
			
		} else {
			if (gtiLimit > parseInt('30000', 10)) {
				if (parseInt(coalesce(sec80D.value), 10) > eval('30000')) {

					sec80DSysCal.value = '30000';
				} else {
					sec80DSysCal.value = parseInt(coalesce(sec80D.value), 10);
				}
			} else {

				if (parseInt(coalesce(sec80D.value), 10) > gtiLimit) {
					sec80DSysCal.value = gtiLimit;
				} else {
					sec80DSysCal.value = parseInt(coalesce(sec80D.value), 10);
				}
			}
		}

		// CHECK FOR 80DD
		if (resStatus == 'RES' || resStatus == 'NOR') {

			if (parseInt(coalesce(gtiLimit), 10) > eval('125000')) {

				if (parseInt(coalesce(sec80DD.value), 10) > eval('125000')) {
					sec80DDSysCal.value = '125000';
				} else {
					sec80DDSysCal.value = parseInt(coalesce(sec80DD.value), 10);
				}

			} else {

				if (parseInt(coalesce(sec80DD.value), 10) > eval(parseInt(
						coalesce(gtiLimit), 10))) {
					sec80DDSysCal.value = gtiLimit;
				} else {
					sec80DDSysCal.value = parseInt(coalesce(sec80DD.value), 10);
				}

			}
		} else {
			sec80DDSysCal.value = parseInt('0', 10);
		}
		// CHECK FOR 80DDB
		if (resStatus == 'RES' || resStatus == 'NOR') {

			if (parseInt(coalesce(gtiLimit), 10) > eval('80000')) {

				if (parseInt(coalesce(sec80DDB.value), 10) > eval('80000')) {
					sec80DDBSysCal.value = '80000';
				} else {
					sec80DDBSysCal.value = parseInt(coalesce(sec80DDB.value),
							10);
				}

			} else {
				if (parseInt(coalesce(sec80DDB.value), 10) > eval(parseInt(
						coalesce(gtiLimit), 10))) {
					sec80DDBSysCal.value = gtiLimit;
				} else {
					sec80DDBSysCal.value = parseInt(coalesce(sec80DDB.value),
							10);
				}
			}
		} else {
			sec80DDBSysCal.value = parseInt('0', 10);
		}

		// CHECK FOR 80E
		if (status == 'I') {
			if (eval(parseInt(coalesce(gtiLimit), 10) > parseInt(
					coalesce(sec80E.value), 10))) {
				sec80ESysCal.value = parseInt(coalesce(sec80E.value), 10);
			} else {
				sec80ESysCal.value = parseInt(coalesce(gtiLimit), 10);
			}
		} else {
			sec80ESysCal.value = parseInt('0', 10);
		}

		// CHECK FOR 80EE
		if (status == 'I') {

			if (parseInt(coalesce(gtiLimit), 10) > eval('50000')) {

				if (parseInt(coalesce(sec80EE.value), 10) > eval('50000')) {
					sec80EESysCal.value = '50000';
				} else {
					sec80EESysCal.value = parseInt(coalesce(sec80EE.value), 10);
				}

			} else {
				if (parseInt(coalesce(sec80EE.value), 10) > eval(parseInt(
						coalesce(gtiLimit), 10))) {
					sec80EESysCal.value = gtiLimit;
				} else {
					sec80EESysCal.value = parseInt(coalesce(sec80EE.value), 10);
				}
			}

		} else {
			sec80EESysCal.value = parseInt('0', 10);
		}

		// Autopopulate 80G
		sec80GSysCal.value = totalElgblAmt80G.value;
		sec80G.value = totalElgblAmt80G.value;

		// 80GGC
		if (eval(parseInt(coalesce(sec80GGC.value), 10) > parseInt(
				coalesce(gtiLimit), 10))) {

			sec80GGCSysCal.value = parseInt(coalesce(gtiLimit), 10);
		} else {
			sec80GGCSysCal.value = parseInt(coalesce(sec80GGC.value), 10);
		}

		// 80QQB

		if (status == 'I') {

			if (resStatus == 'RES' || resStatus == 'NOR') {
				if (parseInt(coalesce(gtiLimit), 10) > eval('300000')) {
					if (parseInt(coalesce(sec80QQB.value), 10) > eval('300000')) {
						sec80QQBSysCal.value = '300000';
					} else {
						sec80QQBSysCal.value = parseInt(
								coalesce(sec80QQB.value), 10);
					}

				} else {

					if (parseInt(coalesce(sec80QQB.value), 10) > parseInt(
							coalesce(gtiLimit), 10)) {
						sec80QQBSysCal.value = gtiLimit;
					} else {
						sec80QQBSysCal.value = parseInt(
								coalesce(sec80QQB.value), 10);
					}
				}
			} else {
				sec80QQBSysCal.value = parseInt('0', 10);
			}

		} else {
			sec80QQBSysCal.value = parseInt('0', 10);
		}

		// CHECK FOR 80RRB

		if (status == 'I') {

			if (resStatus == 'RES' || resStatus == 'NOR') {
				if (parseInt(coalesce(gtiLimit), 10) > eval('300000')) {
					if (parseInt(coalesce(sec80RRB.value), 10) > eval('300000')) {
						sec80RRBSysCal.value = '300000';
					} else {
						sec80RRBSysCal.value = parseInt(
								coalesce(sec80RRB.value), 10);
					}

				} else {

					if (parseInt(coalesce(sec80RRB.value), 10) > parseInt(
							coalesce(gtiLimit), 10)) {
						sec80RRBSysCal.value = gtiLimit;
					} else {
						sec80RRBSysCal.value = parseInt(
								coalesce(sec80RRB.value), 10);
					}
				}
			} else {
				sec80RRBSysCal.value = parseInt('0', 10);
			}

		} else {
			sec80RRBSysCal.value = parseInt('0', 10);
		}

		// CHECK FOR 80TTA

		var incOs = document
				.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.interestGross')[0].value;
		if (parseInt(coalesce(gtiLimit), 10) > 0) {
			if (parseInt(isNVL(sec80TTA.value), 10) > parseInt('0', 10)) {
				sec80TTASysCal.value = Math.min(parseInt(incOs, 10), parseInt(
						gtiLimit, 10), 10000, parseInt(isNVL(sec80TTA.value),
						10));
			} else {
				sec80TTASysCal.value = parseInt('0', 10);
			}
		} else {
			sec80TTASysCal.value = parseInt('0', 10);
		}

		// CHECK FOR 80U

		if (status == 'I') {
			if (resStatus == 'RES' || resStatus == 'NOR') {
				if (parseInt(coalesce(gtiLimit), 10) > eval('125000')) {
					if (parseInt(coalesce(sec80U.value), 10) > eval('125000')) {
						sec80USysCal.value = '125000';
					} else {
						sec80USysCal.value = parseInt(coalesce(sec80U.value),
								10);
					}

				} else {

					if (parseInt(coalesce(sec80U.value), 10) > parseInt(
							coalesce(gtiLimit), 10)) {
						sec80USysCal.value = gtiLimit;
					} else {
						sec80USysCal.value = parseInt(coalesce(sec80U.value),
								10);
					}
				}
			} else {
				sec80USysCal.value = parseInt('0', 10);
			}

		} else {
			sec80USysCal.value = parseInt('0', 10);
		}

		// CHECK FOR 80GGA
		if (eval(parseInt(coalesce(gtiLimit), 10) > parseInt(
				coalesce(sec80GGA.value), 10))) {
			sec80GGASysCal.value = parseInt(coalesce(sec80GGA.value), 10);
		} else {
			sec80GGASysCal.value = parseInt(coalesce(gtiLimit), 10);
		}

		checkSum80C80CCC();

		sumUserEntrdDed();
		sec80GGSysCal.value = 0;
		sumDeductionsWithout80GG(sec80CSysCal, sec80CCCSysCal, sec80CCDiSysCal,
				sec80CCD1BSysCal, sec80CCDiiSysCal, sec80DSysCal,
				sec80DDSysCal, sec80DDBSysCal, sec80ESysCal, sec80EESysCal,
				sec80GSysCal, sec80GGCSysCal, sec80GGASysCal, sec80USysCal,
				sec80CCGSysCal, sec80RRBSysCal, sec80QQBSysCal, sec80TTASysCal);

		// CHECK FOR 80GG again
		var totInc = document.getElementsByName('partBTI.totalIncome')[0];
		if (totInc.value < 0) {
			totInc.value = eval(parseInt('0', 10));
		}
		var oneFrthTI = Math.round(eval(totInc.value) * eval(0.25));

		if (status == 'I') {
			if (eval(oneFrthTI) < eval('60000')) {
				if (eval(sec80GG.value) > eval(oneFrthTI)) {
					sec80GGSysCal.value = eval(oneFrthTI);
				} else {
					sec80GGSysCal.value = sec80GG.value;
				}
			} else {
				if (eval(sec80GG.value) > eval('60000')) {
					sec80GGSysCal.value = eval('60000');
				} else {
					sec80GGSysCal.value = sec80GG.value;
				}
			}
		} else {
			sec80GGSysCal.value = eval(parseInt('0', 10));
		}

		// Do the sum of deductions again after adding 80GG and 80G
		sumDeductions(sec80CSysCal, sec80CCCSysCal, sec80CCDiSysCal,
				sec80CCD1BSysCal, sec80CCDiiSysCal, sec80DSysCal,
				sec80DDSysCal, sec80DDBSysCal, sec80ESysCal, sec80EESysCal,
				sec80GSysCal, sec80GGSysCal, sec80GGCSysCal, sec80GGASysCal,
				sec80USysCal, sec80CCGSysCal, sec80RRBSysCal, sec80QQBSysCal,
				sec80TTASysCal);

	} catch (e) {
		alert('Error in Schedule V1A' + e);
	}

}

// To calculate different deductions sum
function sumUserEntrdDed() {

	var sec80C = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80C')[0];
	var sec80CCC = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCC')[0];
	var sec80CCDi = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCDi')[0];
	var sec80CCD1B = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCD1B')[0];
	var sec80CCDii = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCDii')[0];
	var sec80CCG = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80CCG')[0];
	var sec80D = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80D')[0];
	var sec80DD = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DD')[0];
	var sec80DDB = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DDB')[0];
	var sec80E = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80E')[0];
	var sec80EE = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80EE')[0];
	var sec80G = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80G')[0];
	var sec80GG = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GG')[0];
	var sec80GGA = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0];
	var sec80GGC = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGC')[0];
	var sec80QQB = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80QQB')[0];
	var sec80RRB = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80RRB')[0];
	var sec80TTA = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80TTA')[0];
	var sec80U = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80U')[0];

	var userEntrdDed = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.totalChapVIADeductions')[0];
	userEntrdDed.value = eval(parseInt(coalesce(sec80C.value), 10))
			+ eval(parseInt(coalesce(sec80CCC.value), 10))
			+ eval(parseInt(coalesce(sec80CCDi.value), 10))
			+ eval(parseInt(coalesce(sec80CCD1B.value), 10))
			+ eval(parseInt(coalesce(sec80CCDii.value), 10))
			+ eval(parseInt(coalesce(sec80D.value), 10))
			+ eval(parseInt(coalesce(sec80DD.value), 10))
			+ eval(parseInt(coalesce(sec80DDB.value), 10))
			+ eval(parseInt(coalesce(sec80E.value), 10))
			+ eval(parseInt(coalesce(sec80EE.value), 10))
			+ eval(parseInt(coalesce(sec80G.value), 10))
			+ eval(parseInt(coalesce(sec80GG.value), 10))
			+ eval(parseInt(coalesce(sec80GGA.value), 10))
			+ eval(parseInt(coalesce(sec80GGC.value), 10))
			+ eval(parseInt(coalesce(sec80U.value), 10))
			+ eval(parseInt(coalesce(sec80CCG.value), 10))
			+ eval(parseInt(coalesce(sec80RRB.value), 10))
			+ eval(parseInt(coalesce(sec80QQB.value), 10))
			+ eval(parseInt(coalesce(sec80TTA.value), 10));

}

// To check sum of section 80C,80CCC,80CCD
function checkSum80C80CCC() {
	var sec80CSysCalc = document
			.getElementsByName('scheduleVIA.deductUndChapVIA.section80C')[0];
	var sec80CCCSysCalc = document
			.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCC')[0];
	var sec80CCDempeContrSysCalc = document
			.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCDi')[0];
	var netSum = eval(sec80CSysCalc.value) + eval(sec80CCCSysCalc.value)
			+ eval(sec80CCDempeContrSysCalc.value);
	var maxAmount = getMaxLimitAmount();

	if (eval(netSum) > eval(maxAmount)) {
		var residue = eval(netSum) - eval(maxAmount);
		if (sec80CCDempeContrSysCalc.value >= residue) {
			sec80CCDempeContrSysCalc.value = eval(sec80CCDempeContrSysCalc.value)
					- eval(residue);
		} else {
			residue = eval(residue) - eval(sec80CCDempeContrSysCalc.value);
			sec80CCDempeContrSysCalc.value = eval('0');

			if (sec80CCCSysCalc.value >= residue) {
				sec80CCCSysCalc.value = eval(sec80CCCSysCalc.value)
						- eval(residue);
			} else {
				residue = eval(residue) - eval(sec80CCCSysCalc.value);
				sec80CCCSysCalc.value = eval('0');
			}
		}
	}
}

// To get maximum limit amount
function getMaxLimitAmount() {
	var gtaAmount = document.getElementsByName('partBTI.grossTotalIncome')[0].value;
	var maxAmount = eval('150000');
	if (gtaAmount >= eval('150000')) {
		return maxAmount;
	} else {
		return gtaAmount;
	}

}

// To calculate sum of different deductions
function sumDeductions(sec80CSysCalc, sec80CCCSysCalc, sec80CCDiSysCalc,
		sec80CCD1BSysCalc, sec80CCDiiSysCalc, sec80DSysCalc, sec80DDSysCalc,
		sec80DDBSysCalc, sec80ESysCalc, sec80EESysCalc, sec80GSysCalc,
		sec80GGSysCalc, sec80GGCSysCalc, sec80GGASysCal, sec80USysCalc,
		sec80CCGSysCalc, sec80RRBSysCalc, sec80QQBSysCalc, sec80TTASysCalc) {

	sec80CSysCalc.value = coalesce(sec80CSysCalc.value);
	sec80CCCSysCalc.value = coalesce(sec80CCCSysCalc.value);
	sec80CCDiSysCalc.value = coalesce(sec80CCDiSysCalc.value);
	sec80CCD1BSysCalc.value = coalesce(sec80CCD1BSysCalc.value);
	sec80CCDiiSysCalc.value = coalesce(sec80CCDiiSysCalc.value);
	sec80DSysCalc.value = coalesce(sec80DSysCalc.value);
	sec80DDSysCalc.value = coalesce(sec80DDSysCalc.value);
	sec80DDBSysCalc.value = coalesce(sec80DDBSysCalc.value);
	sec80ESysCalc.value = coalesce(sec80ESysCalc.value);
	sec80EESysCalc.value = coalesce(sec80EESysCalc.value);
	sec80GSysCalc.value = coalesce(sec80GSysCalc.value);
	sec80GGSysCalc.value = coalesce(sec80GGSysCalc.value);
	sec80GGCSysCalc.value = coalesce(sec80GGCSysCalc.value);
	sec80USysCalc.value = coalesce(sec80USysCalc.value);
	sec80CCGSysCalc.value = coalesce(sec80CCGSysCalc.value);
	sec80RRBSysCalc.value = coalesce(sec80RRBSysCalc.value);
	sec80QQBSysCalc.value = coalesce(sec80QQBSysCalc.value);
	sec80TTASysCalc.value = coalesce(sec80TTASysCalc.value);
	sec80GGASysCal.value = coalesce(sec80GGASysCal.value);

	var dedVIA = document
			.getElementsByName('scheduleVIA.deductUndChapVIA.totalChapVIADeductions')[0];
	var temp2 = eval(sec80CSysCalc.value) + eval(sec80CCCSysCalc.value)
			+ eval(sec80CCDiSysCalc.value) + eval(sec80CCD1BSysCalc.value)
			+ eval(sec80CCDiiSysCalc.value) + eval(sec80DSysCalc.value)
			+ eval(sec80DDSysCalc.value) + eval(sec80DDBSysCalc.value)
			+ eval(sec80ESysCalc.value) + eval(sec80EESysCalc.value)
			+ eval(sec80GSysCalc.value) + eval(sec80GGSysCalc.value)
			+ eval(sec80GGCSysCalc.value) + eval(sec80USysCalc.value)
			+ eval(sec80CCGSysCalc.value) + eval(sec80RRBSysCalc.value)
			+ eval(sec80QQBSysCalc.value) + eval(sec80TTASysCalc.value)
			+ eval(sec80GGASysCal.value);

	var grossTotInc = document.getElementsByName('partBTI.grossTotalIncome')[0];

	var incChrgable = document
			.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0];
	var gtiLimit = eval(parseInt(coalesce(grossTotInc.value), 10)
			- parseInt(coalesce(incChrgable.value), 10));

	if (gtiLimit < 0) {
		gtiLimit = 0;
	}

	if (coalesce(grossTotInc.value) > parseInt('0', 10)) {
		if (temp2 > parseInt(coalesce(gtiLimit), 10)) {
			dedVIA.value = parseInt(coalesce(gtiLimit), 10);
		} else {
			dedVIA.value = temp2;
		}
	} else {
		dedVIA.value = temp2;
	}

}

// To calculate deductions sum without 80GG
function sumDeductionsWithout80GG(sec80CSysCalc, sec80CCCSysCalc,
		sec80CCDiSysCalc, sec80CCD1BSysCalc, sec80CCDiiSysCalc, sec80DSysCalc,
		sec80DDSysCalc, sec80DDBSysCalc, sec80ESysCalc, sec80EESysCalc,
		sec80GSysCalc, sec80GGCSysCalc, sec80GGASysCal, sec80USysCalc,
		sec80CCGSysCalc, sec80RRBSysCalc, sec80QQBSysCalc, sec80TTASysCalc) {

	sec80CSysCalc.value = coalesce(sec80CSysCalc.value);
	sec80CCCSysCalc.value = coalesce(sec80CCCSysCalc.value);
	sec80CCDiSysCalc.value = coalesce(sec80CCDiSysCalc.value);
	sec80CCD1BSysCalc.value = coalesce(sec80CCD1BSysCalc.value);
	sec80CCDiiSysCalc.value = coalesce(sec80CCDiiSysCalc.value);
	sec80DSysCalc.value = coalesce(sec80DSysCalc.value);
	sec80DDSysCalc.value = coalesce(sec80DDSysCalc.value);
	sec80DDBSysCalc.value = coalesce(sec80DDBSysCalc.value);
	sec80ESysCalc.value = coalesce(sec80ESysCalc.value);
	sec80EESysCalc.value = coalesce(sec80EESysCalc.value);
	sec80GSysCalc.value = coalesce(sec80GSysCalc.value);
	sec80GGCSysCalc.value = coalesce(sec80GGCSysCalc.value);
	sec80USysCalc.value = coalesce(sec80USysCalc.value);
	sec80CCGSysCalc.value = coalesce(sec80CCGSysCalc.value);
	sec80RRBSysCalc.value = coalesce(sec80RRBSysCalc.value);
	sec80QQBSysCalc.value = coalesce(sec80QQBSysCalc.value);
	sec80TTASysCalc.value = coalesce(sec80TTASysCalc.value);
	sec80GGASysCal.value = coalesce(sec80GGASysCal.value);

	var dedVIA = document
			.getElementsByName('scheduleVIA.deductUndChapVIA.totalChapVIADeductions')[0];
	var temp2 = eval(sec80CSysCalc.value) + eval(sec80CCCSysCalc.value)
			+ eval(sec80CCDiiSysCalc.value) + eval(sec80CCD1BSysCalc.value)
			+ eval(sec80CCDiSysCalc.value) + eval(sec80DSysCalc.value)
			+ eval(sec80DDSysCalc.value) + eval(sec80DDBSysCalc.value)
			+ eval(sec80ESysCalc.value) + eval(sec80EESysCalc.value)
			+ eval(sec80GSysCalc.value) + eval(sec80GGCSysCalc.value)
			+ eval(sec80USysCalc.value) + eval(sec80CCGSysCalc.value)
			+ eval(sec80RRBSysCalc.value) + eval(sec80QQBSysCalc.value)
			+ eval(sec80TTASysCalc.value) + eval(sec80GGASysCal.value);

	var grossTotInc = document.getElementsByName('partBTI.grossTotalIncome')[0];
	var incChrgable = document
			.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0];
	var gtiLimit = eval(parseInt(coalesce(grossTotInc.value), 10)
			- parseInt(coalesce(incChrgable.value), 10));

	if (gtiLimit < 0) {
		gtiLimit = 0;
	}
	if (coalesce(grossTotInc.value) > parseInt('0', 10)) {
		if (temp2 > parseInt(coalesce(gtiLimit), 10)) {
			dedVIA.value = parseInt(coalesce(gtiLimit), 10);
		} else {
			dedVIA.value = temp2;
		}
	} else {
		dedVIA.value = temp2;
	}

	var totInc = document.getElementsByName('partBTI.totalIncome')[0];
	totInc.value = eval(parseInt(coalesce(grossTotInc.value), 10)
			- parseInt(coalesce(dedVIA.value), 10));
}

// To calculate total 80G deductions
function calcTotal80GDeductions(tableId, noOfRow, last, amt5BBC, amt5Ea) {
	try {

		var grossTotalIncome = coalesce(document
				.getElementsByName('partBTI.grossTotalIncome')[0].value);
		var incChrgable = coalesce(document
				.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value);
		var status = document
				.getElementsByName('partAGEN1.personalInfo.status')[0].value;
		var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;

		if (parseInt(grossTotalIncome, 10) < 0) {

			grossTotalIncome = '0';

		}

		var residue50Perc;

		var usr80GG = document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GG')[0];

		var ChapVIASumWithout80G80GG = (parseInt(
				coalesce(document
						.getElementsByName('scheduleVIA.deductUndChapVIA.section80C')[0].value),
				10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCC')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCDi')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCD1B')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCDii')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80CCG')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80D')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80DD')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80DDB')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80E')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80EE')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80GGA')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80GGC')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80QQB')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80RRB')[0].value),
						10)
				+ parseInt(
						coalesce(document
								.getElementsByName('scheduleVIA.deductUndChapVIA.section80TTA')[0].value),
						10) + parseInt(
				coalesce(document
						.getElementsByName('scheduleVIA.deductUndChapVIA.section80U')[0].value),
				10));

		usr80GG.value = coalesce(usr80GG.value);

		var deductionsSysTotal = 0;
		if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
				&& (status == 'I')) {
			deductionsSysTotal = eval(parseInt(ChapVIASumWithout80G80GG, 10)
					+ parseInt(usr80GG.value, 10));
		} else {
			deductionsSysTotal = eval(parseInt(ChapVIASumWithout80G80GG, 10));
		}

		if (parseInt(deductionsSysTotal, 10) > parseInt(grossTotalIncome, 10)) {

			deductionsSysTotal = grossTotalIncome;
		}

		var gtiLimit = eval(parseInt(coalesce(grossTotalIncome), 10)
				- parseInt(coalesce(incChrgable), 10));

		if (gtiLimit < 0) {
			gtiLimit = 0;
		}

		var tab = document.getElementById(tableId);
		var allInputTags = tab.getElementsByTagName('input');

		if (tableId == 'ded100PerWithoutQual') {
			for (var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("eligibleDonationAmt$")) {
					allInputTags[i].value = coalesce(allInputTags[i - 1].value);
					if (parseInt(allInputTags[i].value, 10) > parseInt(
							gtiLimit, 10)) {
						allInputTags[i].value = gtiLimit;
					}
				}
			}
			calcTableTotEligAmt('ded100PerWithoutQual', qualifyingLimit,
					residue50Perc);
		}

		if (tableId == 'ded50WithoutQual') {
			for (var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("eligibleDonationAmt$")) {

					allInputTags[i].value = parseInt(Math
							.round(coalesce(allInputTags[i - 1].value) / 2), 10);
					if (parseInt(allInputTags[i].value, 10) > parseInt(
							gtiLimit, 10)) {
						allInputTags[i].value = gtiLimit;
					}

				}
			}
			calcTableTotEligAmt('ded50WithoutQual', qualifyingLimit,
					residue50Perc);
		}

		// Net Qualifyin Limit calculation

		var adjstGTI;

		if (grossTotalIncome == eval(parseInt(ChapVIASumWithout80G80GG, 10))) {
			adjstGTI = 0;
		} else {

			adjstGTI = eval(parseInt(grossTotalIncome, 10))
					- eval(parseInt(deductionsSysTotal, 10))
					- eval(incChrgable)
					+ parseInt(document
							.getElementsByName('scheduleSI.splCodeRateTax[0].splRateInc')[0].value)
					+ parseInt(coalesce(amt5BBC)) + parseInt(coalesce(amt5Ea));
		}


		var qualifyingLimit = eval(parseInt(adjstGTI, 10) * parseFloat('0.10'));


		if (parseInt(qualifyingLimit, 10) < 0) {
			qualifyingLimit = '0';
		}
		var totEligAmtTableC = document
				.getElementsByName('schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0];

		if (tableId == 'ded100Qual') {
			for (var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("eligibleDonationAmt$")) {

					allInputTags[i].value = parseInt(Math
							.round(coalesce(allInputTags[i - 1].value)), 10);
					if (parseInt(allInputTags[i].value, 10) > parseInt(
							qualifyingLimit, 10)) {
						allInputTags[i].value = parseInt(qualifyingLimit, 10);
					}

				}
			}
			calcTableTotEligAmt('ded100Qual', qualifyingLimit, residue50Perc);
		}

		var residue;
		if (parseInt(qualifyingLimit, 10) > parseInt(
				coalesce(totEligAmtTableC.value), 10)) {

			residue = eval(parseInt(qualifyingLimit, 10))
					- eval(parseInt(totEligAmtTableC.value, 10));
		} else {
			residue = parseInt('0', 10);
		}

		residue50Perc = eval(parseInt(residue, 10) * parseFloat('0.50'));

		if (tableId == 'ded50WithQual') {
			for (var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("eligibleDonationAmt$")) {

					allInputTags[i].value = parseInt(Math
							.round(coalesce(allInputTags[i - 1].value) / 2), 10);
					if (parseInt(allInputTags[i].value, 10) > parseInt(
							residue50Perc, 10)) {
						allInputTags[i].value = parseInt(residue50Perc, 10);

					}
				}
			}
			calcTableTotEligAmt('ded50WithQual', qualifyingLimit, residue50Perc);
		}

	} catch (e) {

	}

}

// To calculate total Eligible amount
function calcTableTotEligAmt(tableId, qualifyingLimit, residue50Perc) {
	try {

		var tab = document.getElementById(tableId);
		var allInputTags = tab.getElementsByTagName('input');
		var sumOfAll = parseInt('0', 10);
		var sumOfAlluserEntredValue = parseInt('0', 10);
		for (var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("eligibleDonationAmt$")) {
				sumOfAll = eval(parseInt(sumOfAll, 10)
						+ parseInt(allInputTags[i].value, 10));
				sumOfAlluserEntredValue = eval(parseInt(
						sumOfAlluserEntredValue, 10)
						+ parseInt(coalesce(allInputTags[i - 1].value), 10));
			}
		}

		var grossTotalIncome = coalesce(document
				.getElementsByName('partBTI.grossTotalIncome')[0].value);

		if (parseInt(grossTotalIncome, 10) < 0) {

			grossTotalIncome = '0';

		}

		if (parseInt(sumOfAll, 10) > parseInt(grossTotalIncome, 10)) {
			sumOfAll = grossTotalIncome;
		}

		if (tableId == 'ded100PerWithoutQual') {
			var temp1 = document
					.getElementsByName('schedule80G.don100Percent.totEligibleDon100Percent')[0];
			var temp2 = document
					.getElementsByName('schedule80G.don100Percent.totDon100Percent')[0];

			temp1.value = parseInt(sumOfAll, 10);

			temp2.value = parseInt(sumOfAlluserEntredValue, 10);

		} else if (tableId == 'ded50WithoutQual') {
			var temp1 = document
					.getElementsByName('schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0];
			var temp2 = document
					.getElementsByName('schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0];
			temp1.value = parseInt(sumOfAll, 10);
			temp2.value = parseInt(sumOfAlluserEntredValue, 10);
		} else if (tableId == 'ded100Qual') {
			var temp1 = document
					.getElementsByName('schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0];
			var temp2 = document
					.getElementsByName('schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0];
			temp1.value = parseInt(sumOfAll, 10);
			temp2.value = parseInt(sumOfAlluserEntredValue, 10);

			if (parseInt(temp1.value, 10) > parseInt(qualifyingLimit, 10)) {

				temp1.value = parseInt(qualifyingLimit, 10);
				;
			}

		} else if (tableId == 'ded50WithQual') {

			var temp1 = document
					.getElementsByName('schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0];
			var temp2 = document
					.getElementsByName('schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0];

			temp1.value = parseInt(sumOfAll, 10);
			temp2.value = parseInt(sumOfAlluserEntredValue, 10);

			if (parseInt(temp1.value, 10) > parseInt(residue50Perc, 10)) {

				temp1.value = parseInt(residue50Perc, 10);
				;
			}

		}

		calcTotalDonations80G();
		calcEligbDonations80G();
	} catch (e) {

	}
}

// To calculate total donations 80G
function calcTotalDonations80G() {

	var tot80GAuserEntrd = document
			.getElementsByName('schedule80G.don100Percent.totDon100Percent')[0];
	tot80GAuserEntrd.value = coalesce(tot80GAuserEntrd.value);
	var tot80GBuserEntrd = document
			.getElementsByName('schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd')[0];
	tot80GBuserEntrd.value = coalesce(tot80GBuserEntrd.value);
	var tot80GCuserEntrd = document
			.getElementsByName('schedule80G.don100PercentApprReqd.totDon100PercentApprReqd')[0];
	tot80GCuserEntrd.value = coalesce(tot80GCuserEntrd.value);
	var tot80GDuserEntrd = document
			.getElementsByName('schedule80G.don50PercentApprReqd.totDon50PercentApprReqd')[0];
	tot80GDuserEntrd.value = coalesce(tot80GDuserEntrd.value);
	var tot80GDonuserEntrd = document
			.getElementsByName('schedule80G.totalDonationsUs80G')[0];
	tot80GDonuserEntrd.value = coalesce(tot80GDonuserEntrd.value);

	tot80GDonuserEntrd.value = eval(tot80GAuserEntrd.value)
			+ eval(tot80GBuserEntrd.value) + eval(tot80GCuserEntrd.value)
			+ eval(tot80GDuserEntrd.value);

}

// To calculate Eligible Donations under section 80G
function calcEligbDonations80G() {
	var grossTotalIncome = coalesce(document
			.getElementsByName('partBTI.grossTotalIncome')[0].value);
	var incChrgable = coalesce(document
			.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value);
	var gtiLimit = eval(parseInt(coalesce(grossTotalIncome), 10)
			- parseInt(coalesce(incChrgable), 10));
	var tot80GAelig = document
			.getElementsByName('schedule80G.don100Percent.totEligibleDon100Percent')[0];
	tot80GAelig.value = coalesce(tot80GAelig.value);
	var tot80GBelig = document
			.getElementsByName('schedule80G.don50PercentNoApprReqd.totEligibleDon50Percent')[0];
	tot80GBelig.value = coalesce(tot80GBelig.value);
	var tot80GCelig = document
			.getElementsByName('schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd')[0];
	tot80GCelig.value = coalesce(tot80GCelig.value);
	var tot80GDelig = document
			.getElementsByName('schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd')[0];
	tot80GDelig.value = coalesce(tot80GDelig.value);
	var tot80GDonelig = document
			.getElementsByName('schedule80G.totalEligibleDonationsUs80G')[0];
	tot80GDonelig.value = coalesce(tot80GDonelig.value);

	tot80GDonelig.value = eval(tot80GAelig.value) + eval(tot80GBelig.value)
			+ eval(tot80GCelig.value) + eval(tot80GDelig.value);
	if (tot80GDonelig.value > gtiLimit) {
		tot80GDonelig.value = gtiLimit;
	}
}

// To calculate total values in Schedule IF
function calcTotSchIF() {
	var amtTotal = parseInt('0', 10);
	var capTotal = parseInt('0', 10);
	var tabl = document.getElementById('scheduleIF');
	var allInputTags = tabl.getElementsByTagName('input');

	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("amount$")) {
			amtTotal = eval(parseInt(amtTotal, 10)
					+ parseInt(isNVL(allInputTags[i].value), 10));
		} else if (allInputTags[i].name.match("capitalBalance$")) {
			capTotal = eval(parseInt(capTotal, 10)
					+ parseInt(isNVL(allInputTags[i].value), 10));
		}
	}

	document.getElementsByName('scheduleIF.totalProfitShareAmt')[0].value = amtTotal;
	document.getElementsByName('scheduleIF.totalFirmCapBalOn31Mar')[0].value = capTotal;
}

// To enable/disable field section 80GG
function enable80GG() {

	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0].value;
	var sec80GG = document
			.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GG')[0];

	if (status == 'I') {
		sec80GG.disabled = false;
		sec80GG.readOnly = false;

	} else {
		if (status == 'H') {
			sec80GG.disabled = true;
			sec80GG.readOnly = true;
			sec80GG.value = "";
			document
					.getElementsByName('scheduleVIA.deductUndChapVIA.section80GG')[0].value = "";
		}
	}
}

// To set Aadhar Option based on the status
/*
 * function setAadharOption() { var status =
 * document.getElementsByName('partAGEN1.personalInfo.status')[0].value;
 * 
 * var aadhar = document
 * .getElementsByName('partAGEN1.personalInfo.adharNoOption')[0];
 * 
 * if (status == 'I') { removeAll(aadhar); addOption(aadhar, 'Yes', 'Y');
 * addOption(aadhar, 'No', 'N'); } else if (status == 'H') { removeAll(aadhar);
 * addOption(aadhar, 'NA', 'X'); } else { removeAll(aadhar); addOption(aadhar,
 * 'Yes', 'Y'); addOption(aadhar, 'No', 'N'); addOption(aadhar, 'NA', 'X'); } }
 */

// To add options to the select element
function addOption(selectbox, text, value) {
	var optn = document.createElement("option");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

// To remove All dropdowns for the given select box.
function removeAll(selectbox) {

	for (var i = selectbox.options.length - 1; i > 0; i--) {
		selectbox.removeChild(selectbox[i]);

	}
}

// To calculate Age of an Assessee
function calcAge() {
	var dob = document.getElementsByName('partAGEN1.personalInfo.dob')[0];
	var retVal = calcAgeCommon(dob);
	return retVal;
}

// To populate Name in Verification section
function populateVerName() {

	var fName = document
			.getElementsByName('partAGEN1.personalInfo.assesseeName.firstName')[0].value;
	var mName = document
			.getElementsByName('partAGEN1.personalInfo.assesseeName.middleName')[0].value;
	var lName = document
			.getElementsByName('partAGEN1.personalInfo.assesseeName.surNameOrOrgName')[0].value;

	var verName;

	if (fName != '' && mName != '') {
		verName = fName + ' ' + mName + ' ' + lName;
	}

	else if (fName == '' && mName != '') {
		verName = mName + ' ' + lName;
	}

	else if (fName != '' && mName == '') {
		verName = fName + ' ' + lName;
	} else {
		verName = lName;
	}
	document.getElementsByName('verification.declaration.assesseeVerName')[0].value = verName;

}

// To adjust the Form on load of the page
function adjustForm() {
	enableField('partAGEN1.filingStatus.asseseeRepFlg', 'Y',
			'partAGEN1.filingStatus.assesseeRep.repName',
			'partAGEN1.filingStatus.assesseeRep.repAddress',
			'partAGEN1.filingStatus.assesseeRep.repPAN');
	enableField('scheduleTR1.taxPaidOutsideIndFlg', 'YES',
			'scheduleTR1.amtTaxRefunded', 'scheduleTR1.assmtYrTaxRelief');

	enableField('partAGEN1.filingStatus.residentialStatus', [ 'RES', '', '' ],
			'partBTTI.assetOutIndiaFlag');

	adjustTDS2();
	adjustCG();
	adjustOS();
}

// To adjust schedule OS onload of the page
function adjustOS() {
	var tabl = document.getElementById('schduleOsf');

	var allSelects = tabl.getElementsByTagName('SELECT');

	for (var i = 0; i < allSelects.length; i++) {
		var name = allSelects[i].name;
		var index = name.substring(name.indexOf('[') + 1, name.indexOf(']'));
		if (allSelects[i].value == 'Others') {
			document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ index + '].otherDesc')[0].style.display = '';
		} else {
			document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ index + '].otherDesc')[0].style.display = 'none';
			document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ index + '].otherDesc')[0].value = '';
		}
	}
}

// To adjust schedule CG onload of the page
function adjustCG() {

	var ben115HFlg = document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;
	enableTable('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag',
			'Y', 'scheduleLtcgunUtilizedCapGain54');
	enableTable(
			'scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag',
			'Y', 'scheduleStcgunUtilizedCapGain54');
	enableNRItables();
	
	if (document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value == 'NRI' || ben115HFlg == 'Y'){
		// A3
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0].readOnly = false;
		// A4
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.improveCost')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.expOnTrans')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.lossSec94of7Or94of8')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0].readOnly = false;

		// B4
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0].readOnly = false;

		// B5
		var tab = document.getElementById('stcg10pctTab');
		var inputs = tab.getElementsByTagName('INPUT');
		var selects = tab.getElementsByTagName('SELECT');
		for (var i = 0; i < inputs.length; i++) {
			if (!(inputs[i].classList.contains("readonly"))) {
				inputs[i].readOnly = false;
			}
		}
		for (var i = 0; i < selects.length; i++) {
			if (!(selects[i].classList.contains("readonly"))) {
				selects[i].disabled = false;
			}
		}

		// B6
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleonSpecAsset')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednSpecAssetus115')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleOtherSpecAsset')[0].readOnly = false;
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednOtherSpecAssetus115')[0].readOnly = false;

		// B4

		tab = document.getElementById('scheduleCGltcg4_ded1');
		inputs = tab.getElementsByTagName('INPUT');
		selects = tab.getElementsByTagName('SELECT');
		for (var i = 0; i < inputs.length; i++) {
			if (!(inputs[i].classList.contains("readonly"))) {
				inputs[i].readOnly = false;
			}
		}
		for (var i = 0; i < selects.length; i++) {
			if (!(selects[i].classList.contains("readonly"))) {
				selects[i].disabled = false;
			}
		}

		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0].readOnly = true;

	} else {
		// A3
		var nRItaxSTTPaid = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0];
		nRItaxSTTPaid.readOnly = true;
		nRItaxSTTPaid.value = 0;

		var nRItaxSTTNotPaid = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0];
		nRItaxSTTNotPaid.readOnly = true;
		nRItaxSTTNotPaid.value = 0;

		// A4
		var fullConsideration = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0];
		fullConsideration.readOnly = true;
		fullConsideration.value = 0;
		var aquisitCost = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0];
		aquisitCost.readOnly = true;
		aquisitCost.value = 0;
		var improveCost = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.improveCost')[0];
		improveCost.readOnly = true;
		improveCost.value = 0;
		var expOnTrans = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.expOnTrans')[0];
		expOnTrans.readOnly = true;
		expOnTrans.value = 0;
		var lossSec94of7Or94of8 = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.lossSec94of7Or94of8')[0];
		lossSec94of7Or94of8.readOnly = true;
		lossSec94of7Or94of8.value = 0;
		var aquisitCost = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.aquisitCost')[0];
		aquisitCost.readOnly = true;
		aquisitCost.value = 0;

		// B4
		var ltcgWithoutBenefit = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit')[0];
		ltcgWithoutBenefit.readOnly = true;
		ltcgWithoutBenefit.value = 0;
		var exemptionOrDednUs54 = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0];
		exemptionOrDednUs54.readOnly = true;
		exemptionOrDednUs54.value = 0;

		// B5
		var tab = document.getElementById('stcg10pctTab');
		var inputs = tab.getElementsByTagName('INPUT');
		var selects = tab.getElementsByTagName('SELECT');
		for (var i = 0; i < inputs.length; i++) {
			if (!inputs[i].classList.contains("readonly")) {
				inputs[i].readOnly = true;
				inputs[i].value = '';
			}
		}
		for (var i = 0; i < selects.length; i++) {
			if (!selects[i].classList.contains("readonly")) {
				selects[i].disabled = true;
				selects[i].selectedIndex = 0;
			}
		}

		// B6
		var saleonSpecAsset = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleonSpecAsset')[0];
		saleonSpecAsset.readOnly = true;
		saleonSpecAsset.value = 0;
		var dednSpecAssetus115 = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednSpecAssetus115')[0];
		dednSpecAssetus115.readOnly = true;
		dednSpecAssetus115.value = 0;
		var saleOtherSpecAsset = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleOtherSpecAsset')[0];
		saleOtherSpecAsset.readOnly = true;
		saleOtherSpecAsset.value = 0;
		var dednOtherSpecAssetus115 = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednOtherSpecAssetus115')[0];
		dednOtherSpecAssetus115.readOnly = true;
		dednOtherSpecAssetus115.value = 0;

		// B4
		var tab = document.getElementById('scheduleCGltcg4_ded1');
		var inputs = tab.getElementsByTagName('INPUT');
		var selects = tab.getElementsByTagName('SELECT');

		$("#scheduleCGltcg4_ded1 input").attr("checked", true);
		deleteRowTable('scheduleCGltcg4_ded1', 1, 2);
		$("#scheduleCGltcg4_ded1 input").attr("checked", false);

		for (var i = 0; i < inputs.length; i++) {
			if (!inputs[i].classList.contains("readonly")) {
				inputs[i].readOnly = true;
				inputs[i].value = '';
			}
		}
		for (var i = 0; i < selects.length; i++) {
			if (!selects[i].classList.contains("readonly")) {
				selects[i].disabled = true;
				selects[i].selectedIndex = 0;
			}
		}
	}
}

// To enable or disable 54GB Company PAN
function enable54GBCompanyPAN() {
	var tab = document.getElementById('schduleCGDed');
	var inputs = tab.getElementsByTagName('SELECT');
	var tempPAN = '';
	if (document.getElementsByName('scheduleCGPost45.deducClaimInfo.deductPAN')[0].value != null
			&& document
					.getElementsByName('scheduleCGPost45.deducClaimInfo.deductPAN')[0].value != undefined) {
		tempPAN = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deductPAN')[0].value;
	}
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].name.match('deductedSecCode$')) {

			if (inputs[i].value == '54GB') {
				document
						.getElementsByName('scheduleCGPost45.deducClaimInfo.deductPAN')[0].readOnly = false;
				document
						.getElementsByName('scheduleCGPost45.deducClaimInfo.deductPAN')[0].value = tempPAN;
				break;
			} else {
				document
						.getElementsByName('scheduleCGPost45.deducClaimInfo.deductPAN')[0].readOnly = true;
				document
						.getElementsByName('scheduleCGPost45.deducClaimInfo.deductPAN')[0].value = '';
			}
		}
	}

}

// To adjust TDS2 schedule on load of the Form
function adjustTDS2() {
	var tab = document.getElementById('scheduleTDS2');
	var inputs = tab.getElementsByTagName('INPUT');
	var tab3 = document.getElementById('scheduleTDS3');
	var inputs3 = tab3.getElementsByTagName('INPUT');
	var portCode = document
			.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].name.match('claimSpouseHands$')) {
			if (portCode == 'Y') {
				inputs[i].disabled = false;
			} else {
				inputs[i].disabled = true;
				inputs[i].value = '';
			}
		}
	}

	for (var k = 0; k < inputs3.length; k++) {
		if (inputs3[k].name.match('claimSpouseHands$')) {
			if (portCode == 'Y') {
				inputs3[k].disabled = false;
			} else {
				inputs3[k].disabled = true;
				inputs3[k].value = '';
			}
		}
	}
}

// To check the validations in Schedule TDS2 and TDS3
function checkEmptyAmtSpouse() {
	var tab = document.getElementById('scheduleTDS2');
	var allInputTags = tab.getElementsByTagName('INPUT');

	var tab3 = document.getElementById('scheduleTDS3');
	var allInputTags3 = tab3.getElementsByTagName('INPUT');

	var portuVal = document
			.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value;
	var isRowBlank = checkRowBlank('scheduleTDS2', 3, 2);
	var isRowBlankTDS3 = checkRowBlank('scheduleTDS3', 3, 2);
	if (portuVal == 'Y' && isRowBlank == false) {
		for (var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("claimSpouseHands$")) {
				if (allInputTags[i].value == '') {
					addError(
							allInputTags[i],
							' Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero',
							true);
					j
							.setFieldError(
									allInputTags[i].name,
									'Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero');
				}
			}
		}
	}

	if (portuVal == 'Y' && isRowBlankTDS3 == false) {
		for (var k = 0; k < allInputTags3.length; k++) {
			if (allInputTags3[k].name.match("claimSpouseHands$")) {
				if (allInputTags3[k].value == '') {
					addError(
							allInputTags3[k],
							' Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero',
							true);
					j
							.setFieldError(
									allInputTags3[k].name,
									'Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero');
				}
			}
		}
	}

	var tab4 = document.getElementById('scheduleTCS');
	var rowCount = tab4.rows.length - 3;

	var isRowBlankTCS = checkRowBlank('scheduleTCS', 3, 2);
	if (portuVal == 'Y' && isRowBlankTCS == false) {
		for (var i = 0; i < rowCount; i++) {
			var amtClaimedBySpouse = document
					.getElementsByName('itr3.scheduleTCS.tcs[' + i
							+ '].amtClaimedBySpouse')[0];
			if (amtClaimedBySpouse.value == '') {
				addError(
						amtClaimedBySpouse,
						' Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero',
						true);
				j
						.setFieldError(
								'itr3.scheduleTCS.tcs[' + i
										+ '].amtClaimedBySpouse',
								'Amount claimed in the hands  of spouse is mandatory as the assessee is governed by Portuguese Civil Code under Sec 5A. In case of nil amount, please enter zero');
			}
		}
	}

}

// To validate Sec50C in schedule CG
function validateSec50C_CG(capGainType) {
	var fullConsideration = document.getElementsByName('scheduleCGPost45.'
			+ capGainType + '.saleofLandBuild.fullConsideration')[0];
	var propertyValuation = document.getElementsByName('scheduleCGPost45.'
			+ capGainType + '.saleofLandBuild.propertyValuation')[0];
	var fullConsideration50C = document.getElementsByName('scheduleCGPost45.'
			+ capGainType + '.saleofLandBuild.fullConsideration50C')[0];

	if (fullConsideration50C.value != fullConsideration.value
			&& fullConsideration50C.value != propertyValuation.value) {
		j.setFieldError('scheduleCGPost45.' + capGainType
				+ '.saleofLandBuild.fullConsideration50C',
				'Please enter value from ai or aii only');
		addErrorXHTML(fullConsideration50C,
				'Please enter value from ai or aii only', true);
	}
}

// To calculate the sum of section Wise deductions
function sumSectionWise(tableId, arr) {
	var tab = document.getElementById(tableId);
	var selects = tab.getElementsByTagName("SELECT");
	for (var i = 0; i < selects.length; i++) {
		if ((selects[i].name.match('section$') || selects[i].name
				.match('deductedSecCode$'))
				&& selects[i].value != '') {
			var name = selects[i].name;
			var str1 = name.substr(0, name.lastIndexOf('[') + 1);
			var amt = document.getElementsByName(str1 + i + '].amount')[0];
			if (tableId == 'schduleCGDed') {
				amt = document.getElementsByName(str1 + i + '].amtDed')[0];
			}
			arr[selects[i].value] = parseInt(arr[selects[i].value])
					+ parseInt(coalesce(amt.value));
		}
	}
	return arr;
}

// To validate section CG sections wise Deductions
function validateCGSecwiseDed() {
	var arr = {
		'54' : 0,
		'54B' : 0,
		'54EC' : 0,
		'54EE' : 0,
		'54F' : 0,
		'54GB' : 0,
		'115F' : 0
	};
	var arrDed = {
		'54' : 0,
		'54B' : 0,
		'54EC' : 0,
		'54EE' : 0,
		'54F' : 0,
		'54GB' : 0,
		'115F' : 0
	};
	sumSectionWise('ltcgDeduction1', arr);
	sumSectionWise('ltcgDeduction2', arr);
	sumSectionWise('scheduleCGltcg7', arr);
	sumSectionWise('scheduleCGltcg4_ded1', arr);

	arr['54B'] = parseInt(arr['54B'])
			+ coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.exemptionOrDednUs54');
	arr['115F'] = parseInt(arr['115F'])
			+ coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednSpecAssetus115');
	arr['115F'] = parseInt(arr['115F'])
			+ coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednOtherSpecAssetus115');

	var len = document.getElementById('scheduleCGltcg3').tBodies.length;
	for (var i = 0; i < len; i++) {
		sumSectionWise('scheduleCGltcg3_ded' + (i + 1), arr);
	}
	len = document.getElementById('stcg10pctTab').tBodies.length;
	for (var i = 0; i < len; i++) {
		sumSectionWise('stcg10pctTab_ded' + (i + 1), arr);
	}

	sumSectionWise('schduleCGDed', arrDed);


	if (arr['54'] != arrDed['54']) {
		j
				.setFieldError(
						'scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode',
						'Deduction under 54 must match with deduction in table D');
		addErrorXHTML('',
				'Deduction under 54 must match with deduction in table D', true);
	}
	if (arr['54B'] != arrDed['54B']) {
		j
				.setFieldError(
						'scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode',
						'Deduction under 54B must match with deduction in table D');
		addErrorXHTML('',
				'Deduction under 54B must match with deduction in table D',
				true);
	}
	if (arr['54EC'] != arrDed['54EC']) {
		j
				.setFieldError(
						'scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode',
						'Deduction under 54EC must match with deduction in table D');
		addErrorXHTML('',
				'Deduction under 54EC must match with deduction in table D',
				true);
	}
	if (arr['54EE'] != arrDed['54EE']) {
		j
				.setFieldError(
						'scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode',
						'Deduction under 54EE must match with deduction in table D');
		addErrorXHTML('',
				'Deduction under 54EE must match with deduction in table D',
				true);
	}
	if (arr['54F'] != arrDed['54F']) {
		j
				.setFieldError(
						'scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode',
						'Deduction under 54F must match with deduction in table D');
		addErrorXHTML('',
				'Deduction under 54F must match with deduction in table D',
				true);
	}
	if (arr['54GB'] != arrDed['54GB']) {
		j
				.setFieldError(
						'scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode',
						'Deduction under 54GB must match with deduction in table D');
		addErrorXHTML('',
				'Deduction under 54GB must match with deduction in table D',
				true);
	}
	if (arr['115F'] != arrDed['115F']) {
		j
				.setFieldError(
						'scheduleCGPost45.deducClaimInfo.deducClaimDtls[0].deductedSecCode',
						'Deduction under 115F must match with deduction in table D');
		addErrorXHTML('',
				'Deduction under 115F must match with deduction in table D',
				true);
	}
}

// To enable Schedule OS Other drop down description
function enableScheduleOSOther() {
	var tabl = document.getElementById('schduleOsf');
	var allSelects = tabl.getElementsByTagName('SELECT');
	for (var i = 0; i < allSelects.length; i++) {
		var name = allSelects[i].name;
		var index = name.substring(name.indexOf('[') + 1, name.indexOf(']'));
		if (allSelects[i].value == 'Others') {
			document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ index + '].otherDesc')[0].style.display = '';
		} else {
			document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ index + '].otherDesc')[0].style.display = 'none';
			document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
							+ index + '].otherDesc')[0].value = '';
		}
	}
}

// To enable Field based on the source value
function enableField(src, val, targets) {
	var srcField = document.getElementsByName(src)[0];
	if (contains(val, srcField.value)) {
		for (var i = 2; i < arguments.length; i++) {
			var targetField = document.getElementsByName(arguments[i])[0];
			targetField.disabled = false;
			targetField.readOnly = false;
		}
	} else {
		for (var i = 2; i < arguments.length; i++) {
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

// To check the given value present in the Array or not.
function contains(arr, val) {
	if (arr.constructor.name == "Array") {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				return true;
			}
		}
		return false;
	} else {
		return (arr == val);
	}
}

// To disable or enable the values on chnage of status
function onStatusChange() {
	var gender = document.getElementsByName('partAGEN1.personalInfo.gender')[0];
	var genderdisplay = gender.value;
	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	var portugeseCC5A = document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0];
	if (status.value == 'I') {
		
		for(var i=0;gender.options.length > 0;i++){
			gender.options.remove(0);
		}
		gender.options[0] = new Option('Select','');
		gender.options[1] = new Option('Male','M');
		gender.options[2] = new Option('Female','F');
		gender.options[3] = new Option('Transgender','T');
		gender.disabled=false;
		
		if(genderdisplay=='F' || genderdisplay=='M'|| genderdisplay=='T'){
			 gender.value =genderdisplay;
		}
		
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].disabled = false;
		if(portugeseCC5A.value==""){
			portugeseCC5A.value = 'N';
		}
		document.getElementsByName('partAGEN1.personalInfo.aadhaarEnrolmentId')[0].disabled = false;
		document.getElementsByName('partAGEN1.personalInfo.adharNumber')[0].disabled = false;
		
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].disabled = false;
	} else if (status.value == 'H') {
		
		for(var i=0;gender.options.length > 0;i++){
			gender.options.remove(0);
		}
		gender.options[0] = new Option('Not Applicable','X');
		gender.options[0].selected = true;
		gender.disabled=true;
		
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value = '';
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].disabled = true;
		
		document.getElementsByName('partAGEN1.personalInfo.adharNumber')[0].value = '';
		document.getElementsByName('partAGEN1.personalInfo.adharNumber')[0].disabled = true;
		
		document.getElementsByName('partAGEN1.personalInfo.aadhaarEnrolmentId')[0].value = '';
		document.getElementsByName('partAGEN1.personalInfo.aadhaarEnrolmentId')[0].disabled = true;
		
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].value = '';
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].disabled = true;
	}else if(status.value == '')
		{
		
		for(var i=0;gender.options.length > 0;i++){
			gender.options.remove(0);
		}
		gender.options[0] = new Option('Select','');
		gender.options[1] = new Option('Male','M');
		gender.options[2] = new Option('Female','F');
		gender.options[3] = new Option('Transgender','T');
		gender.options[4] = new Option('Not Applicable','X');
		gender.options[0].selected = true;
		gender.disabled=false;
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].disabled = false;
		if(portugeseCC5A.value==""){
			portugeseCC5A.value = 'N';
		}
		document.getElementsByName('partAGEN1.personalInfo.aadhaarEnrolmentId')[0].disabled = false;
		document.getElementsByName('partAGEN1.personalInfo.adharNumber')[0].disabled = false;
		
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].disabled = false;
	}
	
	onChngPCC5A();
	disableSchedule5A();
}

// To validate Pan 4th char with the selected Status
function validatePanStatus() {
	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0].value;
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;

	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& (status == 'H')) {

		addErrorXHTML(
				document.getElementsByName('partAGEN1.personalInfo.status')[0],
				'Since PAN entered is Individual PAN, Select Status as Individual',
				true);
		j
				.setFieldError('partAGEN1.personalInfo.status',
						'Since PAN entered is Individual PAN, Select Status as Individual');

	} else if ((pan.substring(3, 4) == 'H' || pan.substring(3, 4) == 'h')
			&& (status == 'I')) {

		addErrorXHTML(document
				.getElementsByName('partAGEN1.personalInfo.status')[0],
				'Since PAN entered is HUF PAN, Select Status as HUF', true);
		j.setFieldError('partAGEN1.personalInfo.status',
				'Since PAN entered is HUF PAN, Select Status as HUF');
	}

}

// To enable or disable the fields on change of gender.
function onGenderChange() {
	var gender = document.getElementsByName('partAGEN1.personalInfo.gender')[0];
	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	if (gender.value == 'X') {
		status.options[2].selected = true;
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].disabled = true;
	} else if (gender.value == 'F' || gender.value == 'M'|| gender.value == 'T') {
		status.options[1].selected = true;
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].disabled = false;
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value = '';
	} else {
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].disabled = false;
		document.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value = '';
	}
}

// To show a warning message based on the portuese value
function onChngPCC5A() {
	var typeHP = document
			.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value;
	if (typeHP == 'Y') {
		addErrorXHTML(
				'',
				'You have selected to be governed by Sec 5A. Please enter only your share of  Income from'
						+ 'House Property and Income from Other Sources.Refer to instructions (A22) for further clarification');
	}
	adjustTDS2();
}

// To validate the pan status
function panStatusCheck() {

	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0].value;
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;

	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& (status == 'I')) {
		document.getElementsByName('verification.declaration.assesseeVerPAN')[0].value = document
				.getElementsByName('partAGEN1.personalInfo.pan')[0].value
				.toUpperCase();
	} else {
		document.getElementsByName('verification.declaration.assesseeVerPAN')[0].value = "";
	}

	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& (status == 'H')) {
		addErrorXHTML('',
				'Since PAN entered is Individual PAN, Select Status as Individual');
		j
				.setFieldError('partAGEN1.personalInfo.pan',
						'Since PAN entered is Individual PAN, Select Status as Individual');
	} else if ((pan.substring(3, 4) == 'H' || pan.substring(3, 4) == 'h')
			&& (status == 'I')) {
		addErrorXHTML('', 'Since PAN entered is HUF PAN, Select Status as HUF');
		j.setFieldError('partAGEN1.personalInfo.pan',
				'Since PAN entered is HUF PAN, Select Status as HUF');
	}

}

// To validate the pan status
function panStatusCheckValdt() {

	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0].value;
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	var assesseeVerPAN = document
			.getElementsByName('verification.declaration.assesseeVerPAN')[0].value;

	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& (status == 'I')
			&& (assesseeVerPAN == '' || assesseeVerPAN == undefined || assesseeVerPAN == null)) {
		assesseeVerPAN = document
				.getElementsByName('partAGEN1.personalInfo.pan')[0].value
				.toUpperCase();
	}

	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& (status == 'H')) {
		addErrorXHTML('',
				'Since PAN entered is Individual PAN, Select Status as Individual');
		j
				.setFieldError('partAGEN1.personalInfo.pan',
						'Since PAN entered is Individual PAN, Select Status as Individual');
	} else if ((pan.substring(3, 4) == 'H' || pan.substring(3, 4) == 'h')
			&& (status == 'I')) {
		addErrorXHTML('', 'Since PAN entered is HUF PAN, Select Status as HUF');
		j.setFieldError('partAGEN1.personalInfo.pan',
				'Since PAN entered is HUF PAN, Select Status as HUF');
	}

}

// To set the country value based on the state
function onStateChng() {
	try {
		var state = document
				.getElementsByName('partAGEN1.personalInfo.address.stateCode')[0];
		var country = document
				.getElementsByName('partAGEN1.personalInfo.address.country')[0];
		var pinCode = document
				.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0];

		if (state.value != '99' && state.value != '-1') {
			country.value = '91';
			pinCode.value = '';
			$('.country').selectmenu('refresh', true);
		} else if (state.value == '99') {
			pinCode.value = '999999';
		}
	} catch (e) {
		alert(e.stack);
	}
}




// To enable or disable fields based on the return filed under section
function revisedSetFor6(section, type) {

	var fileSec = document.getElementsByName(section)[0].value;
	var fileType = document.getElementsByName(type)[0];

	if (fileSec == '17' && fileType.value != 'R') {

		document.getElementsByName(type)[0].value = 'R';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;

		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = true;

	} else if (fileSec == '19') {
		document.getElementsByName(type)[0].value = 'O';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].disabled = false;

	} else if (fileSec == '18') {
		document.getElementsByName(type)[0].value = 'O';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].disabled = false;

	} else if (fileSec != '17' || fileType.value != 'R') {
		
		
		
		document.getElementsByName(type)[0].value = 'O';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value='';
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value='';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = true;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = true;
		

		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].value='';
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].disabled=true;
	}
	if (fileSec == '18') {
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;
	} else {
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = true;
	}
	if (fileSec == '13' || fileSec == '14' || fileSec == '15'
			|| fileSec == '16' || fileSec == '18' || fileSec == '19') {
		enableField('partAGEN1.filingStatus.returnFileSec', fileSec,
				'partAGEN1.filingStatus.noticeDateUnderSec');
	} else if (fileSec == '11' || fileSec == '12' || fileSec == '17'
			|| fileSec == '') {
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].disabled = true;
	}
	if (fileSec == '11' || fileSec == '12' || fileSec == '13'
		|| fileSec == '14' || fileSec == '15' || fileSec == '16' || fileSec=='20') {
	document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value = '';
	document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value = '';
	document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].value = '';
	document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = true;
	document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = true;
	document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = true;
	}
}



// To enable or disable fields based on the return filed under section on load
// of Form
function revisedSetFor6OnLoad(section, type) {

	var fileSec = document.getElementsByName(section)[0].value;
	var fileType = document.getElementsByName(type)[0];

	if (fileSec == '17' && fileType.value != 'R') {

		document.getElementsByName(type)[0].value = 'R';

		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;

		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = true;

	} else if (fileSec == '19') {
		document.getElementsByName(type)[0].value = 'O';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;

	} else if (fileSec == '18') {
		document.getElementsByName(type)[0].value = 'O';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;

	} else if (fileSec != '17' || fileType.value != 'R') {
		document.getElementsByName(type)[0].value = 'O';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = true;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = true;
	}
	if (fileSec == '18') {
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;
	} else {
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = true;

	}
	if (fileSec == '13' || fileSec == '14' || fileSec == '15'
			|| fileSec == '16' || fileSec == '18' || fileSec == '19') {
		enableField('partAGEN1.filingStatus.returnFileSec', fileSec,
				'partAGEN1.filingStatus.noticeDateUnderSec');
	} else {
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeDateUnderSec")[0].disabled = true;
	}
}

// To set the values based on the type of return
function sectionSetFor6(section, type) {
	var fileSec = document.getElementsByName(section)[0];
	var fileType = document.getElementsByName(type)[0].value;

	if (fileType == 'R' && fileSec.value != 17) {
		fileSec.value = '17';
	} else {
		fileSec.value = '';
	}
	if (fileType == 'R') {
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = false;
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.noticeNo")[0].disabled = true;
	} else {
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].value = '';
		document.getElementsByName("partAGEN1.filingStatus.receiptNo")[0].disabled = true;
		document.getElementsByName("partAGEN1.filingStatus.origRetFiledDate")[0].disabled = true;

	}
}

// To calculate total amount of Schedule TR
function totAmtOfSchedTR() {

	var table = document.getElementById('scheduleTR');
	var noOfRows = table.rows.length;
	var totTaxPaidOutsideInd = parseInt('0', 10);
	var totReliefAvailable = parseInt('0', 10);
	var totReliefAvailable9090A = parseInt('0', 10);
	var totReliefAvailable91 = parseInt('0', 10);

	for (var i = 0; i < eval(parseInt(noOfRows, 10) - 4); i++) {
		if (document.getElementsByName('scheduleTR1.scheduleTR[' + i
				+ '].relavantArticleDTAA')[0].value == '91') {
			totReliefAvailable91 = eval(totReliefAvailable91
					+ parseInt(coalesce(document
							.getElementsByName('scheduleTR1.scheduleTR[' + i
									+ '].taxReliefOutsideIndia')[0].value), 10));

		} else if (document.getElementsByName('scheduleTR1.scheduleTR[' + i
				+ '].relavantArticleDTAA')[0].value == '90'
				|| document.getElementsByName('scheduleTR1.scheduleTR[' + i
						+ '].relavantArticleDTAA')[0].value == '90A') {
			totReliefAvailable9090A = eval(totReliefAvailable9090A
					+ parseInt(coalesce(document
							.getElementsByName('scheduleTR1.scheduleTR[' + i
									+ '].taxReliefOutsideIndia')[0].value), 10));
		}

		totTaxPaidOutsideInd = eval(parseInt(totTaxPaidOutsideInd, 10)
				+ parseInt(coalesce(document
						.getElementsByName('scheduleTR1.scheduleTR[' + i
								+ '].taxPaidOutsideIndia')[0].value, 10)));
		totReliefAvailable = eval(parseInt(totReliefAvailable, 10)
				+ parseInt(coalesce(document
						.getElementsByName('scheduleTR1.scheduleTR[' + i
								+ '].taxReliefOutsideIndia')[0].value, 10)));

	}

	document.getElementsByName('scheduleTR1.totalIncomeOutIndia')[0].value = totReliefAvailable9090A;
	document.getElementsByName('scheduleTR1.totalIncomeOutIndiaDTAA')[0].value = totReliefAvailable91;
	document.getElementsByName('scheduleTR1.totTaxPaidDeclaredInFSI')[0].value = totTaxPaidOutsideInd;
	document.getElementsByName('scheduleTR1.totReliefClaimUs9090A')[0].value = totReliefAvailable;

}

// To add a row for schedule TR
function addRowSchedTRFor2(tableId, noOfRow, last) {

	addRowToTable(tableId, noOfRow, last);
	totAmtOfSchedTR(tableId);

}

// To delete a row for schedule TR
function delRowSchedTRFor2(tableId, noOfRow, last) {

	deleteRowTable(tableId, noOfRow, last);
	totAmtOfSchedTR(tableId);

}

// to validate schedule TR
function validateScheduleTR(tableId) {
	var tab = document.getElementById(tableId);
	var allInputTags = tab.getElementsByTagName('input');

	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("totTaxIncScheduleFSI$")) {
			if (parseInt(coalesce(allInputTags[i].value), 10) < eval(parseInt(
					coalesce(allInputTags[i + 1].value), 10)
					+ parseInt(coalesce(allInputTags[i + 2].value), 10))) {
				addError(
						allInputTags[i],
						'Relief claimed u/s 90/91 (B1 +B2) cannot exceed the total taxes paid.',
						true);
				j
						.setFieldError(allInputTags[i].name,
								'Relief claimed u/s 90/91 (B1 +B2) cannot exceed the total taxes paid');
			}
		}
	}
}

// To check Schedule FA Mandatory or not
function checkSchFAMandatory() {

	var table1 = checkRowBlank('schFADtlsFrignAssets', 2, 1);
	var table2 = checkRowBlank('schFADtlsFinIntrest', 2, 1);
	var table3 = checkRowBlank('schFADtlsImmvbleProp', 2, 1);
	var table4 = checkRowBlank('schFADtlsOtherAsset', 2, 1);
	var table5 = checkRowBlank('schFADtlsSigningAuth', 2, 1);
	var table6 = checkRowBlank('schFADtlsTrusts', 2, 1);
	var table7 = checkRowBlank('DetailsOthIncomeOutsideIndia', 2, 1);

	if (document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value == 'YES'
			&& document
					.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value != 'NRI') {
		if (table1 && table2 && table3 && table4 && table5 && table6 && table7) {
			j.setFieldError('scheduleFA.detailsForiegnBank[0].countryCode',
					'Please enter any one table in Schedule FA.');
			addErrorXHTML('', 'Please enter any one table in Schedule FA.');
		}
	}
	if (document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value == 'NO'
			&& document
					.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value != 'NRI') {
		if (!(table1 && table2 && table3 && table4 && table5 && table6)) {
			j
					.setFieldError('partBTTI.assetOutIndiaFlag',
							'Please correct your selection of assets outside India in Part B -TTI.');
			addErrorXHTML('',
					'Please correct your selection of assets outside India in Part B -TTI.');
		}
	}
}

// To calculate the total amount of Schedule 5A
function totAmtOfSched5A() {
	document
			.getElementsByName('schedule5A2014.totalHeadIncome.incRecvdUndHead')[0].value = eval(parseInt(
			coalesce(document
					.getElementsByName('schedule5A2014.hPHeadIncome.incRecvdUndHead')[0].value),
			10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.busHeadIncome.incRecvdUndHead')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.capGainHeadIncome.incRecvdUndHead')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.otherSourcesHeadIncome.incRecvdUndHead')[0].value),
					10));

	document
			.getElementsByName('schedule5A2014.totalHeadIncome.amtApprndOfSpouse')[0].value = eval(parseInt(
			coalesce(document
					.getElementsByName('schedule5A2014.hPHeadIncome.amtApprndOfSpouse')[0].value),
			10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.busHeadIncome.amtApprndOfSpouse')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.capGainHeadIncome.amtApprndOfSpouse')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.otherSourcesHeadIncome.amtApprndOfSpouse')[0].value),
					10));

	document.getElementsByName('schedule5A2014.totalHeadIncome.amtTDSDeducted')[0].value = eval(parseInt(
			coalesce(document
					.getElementsByName('schedule5A2014.hPHeadIncome.amtTDSDeducted')[0].value),
			10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.busHeadIncome.amtTDSDeducted')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.capGainHeadIncome.amtTDSDeducted')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.otherSourcesHeadIncome.amtTDSDeducted')[0].value),
					10));

	document
			.getElementsByName('schedule5A2014.totalHeadIncome.tDSApprndOfSpouse')[0].value = eval(parseInt(
			coalesce(document
					.getElementsByName('schedule5A2014.hPHeadIncome.tDSApprndOfSpouse')[0].value),
			10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.busHeadIncome.tDSApprndOfSpouse')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.capGainHeadIncome.tDSApprndOfSpouse')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('schedule5A2014.otherSourcesHeadIncome.tDSApprndOfSpouse')[0].value),
					10));
}

// To calculate the total amount of Schedule AL

/*
 * function totAmtOfSchedAL() { var totalIncome = parseInt(coalesce(document
 * .getElementsByName('partBTI.totalIncome')[0].value), 10); if (totalIncome <=
 * eval('5000000')) { document
 * .getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value =
 * eval(coalesceSetRet('scheduleAL.immovableAssetLand') +
 * coalesceSetRet('scheduleAL.immovableAssetBuilding') +
 * coalesceSetRet('scheduleAL.movableAsset.depositsInBank') +
 * coalesceSetRet('scheduleAL.movableAsset.sharesAndSecurities') +
 * coalesceSetRet('scheduleAL.movableAsset.insurancePolicies') +
 * coalesceSetRet('scheduleAL.movableAsset.loansAndAdvancesGiven') +
 * coalesceSetRet('scheduleAL.movableAsset.cashInHand') +
 * coalesceSetRet('scheduleAL.movableAsset.jewelleryBullionEtc') +
 * coalesceSetRet('scheduleAL.movableAsset.archCollDrawPaintSulpArt') +
 * coalesceSetRet('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts'));
 * 
 * coalesceSetRet('scheduleAL.liabilityInRelatAssets'); } else { document
 * .getElementsByName('scheduleAL.movableAsset.totalImmovablMovablAssets')[0].value =
 * eval(parseInt( coalesce(document
 * .getElementsByName('scheduleAL.immovableAssetLand')[0].value), 10) +
 * parseInt( coalesce(document
 * .getElementsByName('scheduleAL.immovableAssetBuilding')[0].value), 10) +
 * parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.depositsInBank')[0].value), 10) +
 * parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.sharesAndSecurities')[0].value),
 * 10) + parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.insurancePolicies')[0].value),
 * 10) + parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.loansAndAdvancesGiven')[0].value),
 * 10) + parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.cashInHand')[0].value), 10) +
 * parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.jewelleryBullionEtc')[0].value),
 * 10) + parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].value),
 * 10) + parseInt( coalesce(document
 * .getElementsByName('scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value),
 * 10)); } }
 */

// To disable Schedule 5A
function disableSchedule5A() {

	var tabl = document.getElementById('schedule5A');
	var allInputTags = tabl.getElementsByTagName('input');

	var portugeseStatus = document
			.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value;

	for (var i = 0; i < allInputTags.length; i++) {
		if (portugeseStatus == 'Y') {
			allInputTags[i].disabled = false;
			allInputTags[i].readOnly = false;
			/*
			 * document.getElementsByName('schedule5A2014.busHeadIncome.incRecvdUndHead')[0].disabled=true;
			 * document.getElementsByName('schedule5A2014.busHeadIncome.amtApprndOfSpouse')[0].disabled=true;
			 * document.getElementsByName('schedule5A2014.busHeadIncome.amtTDSDeducted')[0].disabled=true;
			 * document.getElementsByName('schedule5A2014.busHeadIncome.tDSApprndOfSpouse')[0].disabled=true;
			 */

			document
					.getElementsByName('schedule5A2014.totalHeadIncome.incRecvdUndHead')[0].disabled = true;
			document
					.getElementsByName('schedule5A2014.totalHeadIncome.amtApprndOfSpouse')[0].disabled = true;
			document
					.getElementsByName('schedule5A2014.totalHeadIncome.amtTDSDeducted')[0].disabled = true;
			document
					.getElementsByName('schedule5A2014.totalHeadIncome.tDSApprndOfSpouse')[0].disabled = true;
			tabs.enableTabs(27);

		} else {
			allInputTags[i].disabled = true;
			allInputTags[i].readOnly = true;
			allInputTags[i].value = "";

		}
	}
	/*
	 * document.getElementsByName('schedule5A2014.capGainHeadIncome.incRecvdUndHead')[0].disabled=true;
	 * document.getElementsByName('schedule5A2014.capGainHeadIncome.amtApprndOfSpouse')[0].disabled=true;
	 * document.getElementsByName('schedule5A2014.capGainHeadIncome.amtTDSDeducted')[0].disabled=true;
	 * document.getElementsByName('schedule5A2014.capGainHeadIncome.tDSApprndOfSpouse')[0].disabled=true;
	 */

}

// To calculate Total amount of EI
function calTotalEI() {
	document.getElementsByName('scheduleEI.totalExemptInc')[0].value = coalesceSetRet('scheduleEI.interestInc')
			+ coalesceSetRet('scheduleEI.dividendInc')
			+ coalesceSetRet('scheduleEI.ltcgWhereSTTPaid')
			+ coalesceSetRet('scheduleEI.netAgriIncOrOthrIncRule7')
			+ coalesceSetRet('scheduleEI.others');
}

// To calculate Schedule BP values
function calcSchBP(cgosIncome) {
	try {
		var table = document.getElementById('scheduleBP');
		var rowCount = table.rows.length;
		var totalFirmSalBonComRen = parseInt('0', 10);
		var totalIntFirmCap = parseInt('0', 10);
		var sumTotalIncome = parseInt('0', 10);
		var totalExpensesTotal = parseInt('0', 10);
		var totalNetIncome = parseInt('0', 10);

		for (var i = 0; i < rowCount - 6; i++) {

			document.getElementsByName('scheduleBPA.partnerFirmIncomes[' + i
					+ '].totalIncome')[0].value = eval(parseInt(
					coalesce(document
							.getElementsByName('scheduleBPA.partnerFirmIncomes['
									+ i + '].firmSalBonComRen')[0].value), 10)
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleBPA.partnerFirmIncomes['
											+ i + '].intFirmCap')[0].value), 10));

			document.getElementsByName('scheduleBPA.partnerFirmIncomes[' + i
					+ '].netIncome')[0].value = eval(parseInt(coalesce(document
					.getElementsByName('scheduleBPA.partnerFirmIncomes[' + i
							+ '].totalIncome')[0].value), 10)
					- parseInt(
							coalesce(document
									.getElementsByName('scheduleBPA.partnerFirmIncomes['
											+ i + '].expenses')[0].value), 10));

			totalFirmSalBonComRen = eval(parseInt(totalFirmSalBonComRen, 10)
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleBPA.partnerFirmIncomes['
											+ i + '].firmSalBonComRen')[0].value),
							10));
			totalIntFirmCap = eval(parseInt(totalIntFirmCap, 10)
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleBPA.partnerFirmIncomes['
											+ i + '].intFirmCap')[0].value), 10));
			sumTotalIncome = eval(parseInt(sumTotalIncome, 10)
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleBPA.partnerFirmIncomes['
											+ i + '].totalIncome')[0].value),
							10));
			totalExpensesTotal = eval(parseInt(totalExpensesTotal, 10)
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleBPA.partnerFirmIncomes['
											+ i + '].expenses')[0].value), 10));
			totalNetIncome = eval(parseInt(totalNetIncome, 10)
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleBPA.partnerFirmIncomes['
											+ i + '].netIncome')[0].value), 10));
		}
		coalesceSetRet('scheduleBPA.total.aggreFirmSalBonComRen');
		coalesceSetRet('scheduleBPA.total.aggreIntFirmCap');
		coalesceSetRet('scheduleBPA.total.aggreTotalIncome');
		coalesceSetRet('scheduleBPA.total.aggreExpensesTotal');
		coalesceSetRet('scheduleBPA.total.aggreNetIncome');

		var netIncomeFrmBus = totalNetIncome
				- document.getElementsByName('scheduleBPA.deductSchemeUs35AC')[0].value;

		document.getElementsByName('scheduleBPA.total.aggreFirmSalBonComRen')[0].value = totalFirmSalBonComRen;
		document.getElementsByName('scheduleBPA.total.aggreIntFirmCap')[0].value = totalIntFirmCap;
		document.getElementsByName('scheduleBPA.total.aggreTotalIncome')[0].value = sumTotalIncome;
		document.getElementsByName('scheduleBPA.total.aggreExpensesTotal')[0].value = totalExpensesTotal;
		document.getElementsByName('scheduleBPA.total.aggreNetIncome')[0].value = totalNetIncome;
		document.getElementsByName('scheduleBPA.netIncFrmBus')[0].value = netIncomeFrmBus;

		cgosIncome.bpNetInc = coalesceSetRet('scheduleBPA.total.aggreNetIncome');

	} catch (e) {
		alert('Error in calcSchBP' + e.stack);
	}
}

// To calculate schedule CYLA
function calculateCYLA(cgosIncome) {
	try {
		// prefill the CYLA-schedule
		prefillCYLA();

		// doing successive setoffs
		// Income of current year (Fill this column only if income is zero or
		// positive)

		setOffOthSrcLossCYLA(cgosIncome);

		// Current year's Income remaining after set off
		document
				.getElementsByName('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');

		}

		// Current year's Income remaining after set off
		document
				.getElementsByName('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');

		}

		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');

		}

		// Short-term capital gain taxable @ 15%
		document
				.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');
		}
		// Short-term capital gain taxable @ 30%
		document
				.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');
		}

		// Short-term capital gain taxable at applicable rates
		document
				.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');
		}
		// Long term capital gain taxable @ 10%
		document
				.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');

		}
		// Long term capital gain taxable @ 20%
		document
				.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');

		}

		// Other sources
		document
				.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff');
		if (coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');
		}
		// Profit from owning and maintaining race horses
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0].value = coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')
				- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff',
							'This figure cannot be negative. Please rearrange your figures');
		}

		// total loss setoff
		document
				.getElementsByName('scheduleCYLA.totalLossSetOff.totHPlossCurYrSetoff')[0].value = coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
				+ coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff');

		// Business
		document
				.getElementsByName('scheduleCYLA.totalLossSetOff.totBusLossSetoff')[0].value = coalescePath('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')
				+ coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')
				+ coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')
				+ coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')
				+ coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff');

		document
				.getElementsByName('scheduleCYLA.totalLossSetOff.totOthSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				+ coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff');

		// Loss remaining after set-off
		document
				.getElementsByName('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')[0].value = coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
				- coalescePath('scheduleCYLA.totalLossSetOff.totHPlossCurYrSetoff');
		if (coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff',
							'This figure cannot be negative. Please rearrange your figures');
		}

		document
				.getElementsByName('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')[0].value = coalescePath('scheduleCYLA.totalCurYr.totBusLoss')
				- coalescePath('scheduleCYLA.totalLossSetOff.totBusLossSetoff');
		if (coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff',
							'This figure cannot be negative. Please rearrange your figures');

		}

		document
				.getElementsByName('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff')[0].value = coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
				- coalescePath('scheduleCYLA.totalLossSetOff.totOthSrcLossNoRaceHorseSetoff');
		if (coalescePath('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff') < 0) {
			addErrorXHTML(
					document
							.getElementsByName('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff')[0],
					'This figure cannot be negative. Please rearrange your figures',
					true);
			j
					.setFieldError(
							'scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff',
							'This figure cannot be negative. Please rearrange your figures');

		}

		// cgosIncome.cgInc.stcg.prctg15 =
		// coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff');
		cgosIncome.cgInc.stcg.prctgAr = coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff');
		cgosIncome.cgInc.stcg.prctg30 = coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff');
		cgosIncome.bpNetInc = coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff');

		var losses = coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')
				+ coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')
				+ coalescePath('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff');
		if (losses > 0) {
			var incomeRem = coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff');

			if (incomeRem > 0) {
				addErrorXHTML(
						'',
						'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.',
						true);
				if (coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff') > 0) {
					j
							.setFieldError(
									'scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff',
									'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.');
				} else if (coalescePath('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff') > 0) {
					j
							.setFieldError(
									'scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff',
									'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.');
				} else if (coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff') > 0) {
					j
							.setFieldError(
									'scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff',
									'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.');
				}
			}
		}

		calcBFLA(cgosIncome);

	} catch (e) {
		alert('error in calcCYLA=' + e.stack);
	}
}

// To prefill schedule CYLA
function prefillCYLA() {
	try {

		// prefilling column :: Income of current year Salaries (Fill this
		// column only if income is zero or positive) - House Property
		// Field 7 of Sch s , only if field 7 is positive
		document
				.getElementsByName('scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead')[0].value = zeroOrMore(coalescePath('scheduleS.incomeChargeable'));

		// Field 3c of Schedule HP) , only if 3c is positive
		// alert(zeroOrMore(coalescePath('scheduleHP.totalIncomeChargeableUnHP')));
		document
				.getElementsByName('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead')[0].value = zeroOrMore(coalescePath('scheduleHP.totalIncomeChargeableUnHP'));

		// prefilling Business income
		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead')[0].value = zeroOrMore(coalescePath('scheduleBPA.netIncFrmBus'));

		// prefilling column :: Short-term capital gain taxable @ 15%
		// Field (7ii of item E of schedule CG)
		document
				.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')[0].value = coalescePath('scheduleCGPost45.currYrLosses.inStcg15Per.CurrYrLosSetOff');

		// prefilling column :: Short-term capital gain taxable @ 30%
		// Field (7iii of item E of schedule CG)
		document
				.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')[0].value = coalescePath('scheduleCGPost45.currYrLosses.inStcg30Per.currYrLosSetOff');

		// prefilling column :: Short-term capital gain taxable at applicable
		// rates
		// Field (7iv of item E of schedule CG)
		document
				.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')[0].value = coalescePath('scheduleCGPost45.currYrLosses.inStcgAppRate.currYrLosSetOff');

		// prefilling column :: Long term capital gain taxable @ 10%
		// Field (7v of item E of schedule CG)
		document
				.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')[0].value = coalescePath('scheduleCGPost45.currYrLosses.inLtcg10Per.currYrLosSetOff');

		// prefilling column :: Long term capital gain taxable @ 20%
		// Field (7vi of item E of schedule CG)
		document
				.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')[0].value = coalescePath('scheduleCGPost45.currYrLosses.inLtcg20Per.CurrYrLosSetOff');

		// prefilling column :: Other sources income
		// Field (1i of schedule OS)
		document
				.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead')[0].value = zeroOrMore(coalescePath('scheduleOS.balanceNoRaceHorse'));

		// prefilling column :: Profit from owning and maintaining race horses
		// Field (3c of schedule OS)
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')[0].value = zeroOrMore(coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse'));

		// populating losses in the respective heads
		coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr');
		if (!isPostv('scheduleHP.totalIncomeChargeableUnHP')) {
			document
					.getElementsByName('scheduleCYLA.totalCurYr.totHPlossCurYr')[0].value = Math
					.abs(coalescePath('scheduleHP.totalIncomeChargeableUnHP'));
		} else {
			document
					.getElementsByName('scheduleCYLA.totalCurYr.totHPlossCurYr')[0].value = 0;
		}

		coalescePath('scheduleCYLA.totalCurYr.totBusLoss');
		if (!isPostv('scheduleBPA.netIncFrmBus')) {
			document.getElementsByName('scheduleCYLA.totalCurYr.totBusLoss')[0].value = Math
					.abs(coalescePath('scheduleBPA.netIncFrmBus'));
		} else {
			document.getElementsByName('scheduleCYLA.totalCurYr.totBusLoss')[0].value = 0;
		}

		coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse');
		if (!isPostv('scheduleOS.balanceNoRaceHorse')) {
			document
					.getElementsByName('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')[0].value = Math
					.abs(coalescePath('scheduleOS.balanceNoRaceHorse'));
		} else {
			document
					.getElementsByName('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')[0].value = 0;
		}

	} catch (e) {
		alert('error in prefillCYLA()=' + e.stack);
	}
}

// To setOff Other Source Loss CYLA
function setOffOthSrcLossCYLA(cgosIncome) {
	try {
		var stcgPercent15Sec111a = zeroOrMore(cgosIncome.cgInc.stcg.prctg15.sec111a);
		var stcgPercent15Sec115ad_1_b_ii = zeroOrMore(cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii);
		var ltcgPrctg20Sec112 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg20.sec112);
		var ltcgPrctg20Sec11EA = zeroOrMore(cgosIncome.cgInc.ltcg.prctg20.sec11EA);
		var ltcgPrctg10SecProviso = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.secProviso);
		var ltcgPrctg10Sec112c2 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2);
		var ltcgPrctg10Sec115AC1 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec115AC_1);
		var ltcgPrctg10Sec115ACA1 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1);
		var ltcgPrctg10Sec115AD3 = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec115AD_3);
		var ltcgPrctg10Sec115Eb = zeroOrMore(cgosIncome.cgInc.ltcg.prctg10.sec115E_b);

		// alert('ltcgPrctg10Sec115Eb1: ' + ltcgPrctg10Sec115Eb);
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;

		if (!checkIfChanged('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')) {
			document
					.getElementsByName('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')) {
			document
					.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff'));

		}

		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;

		if (!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
			document
					.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')) {
			document
					.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
			document
					.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
			document
					.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
			document
					.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
					coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		}

		/*
		 * Order of adjustment :- 1) Profit from owning and maintaining race
		 * horses 2) Salaries 3) HP Income 4) Business Income 5) Short-term
		 * capital gain taxable @ 30% 6) Short-term capital gain taxable at
		 * applicable rates 7) Long term capital gain taxable @ 20%
		 * (1.cgosIncome.cgInc.ltcg.prctg20.sec112,
		 * 2.cgosIncome.cgInc.ltcg.prctg20.sec11EA) 8) Short-term capital gain
		 * taxable @ 15% 9) Long term capital gain taxable @ 10% (1.
		 * cgosIncome.cgInc.ltcg.prctg10.secProviso, 2.
		 * cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 3.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 4.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1, 5.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 6.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115E_b)
		 */

		var setOffRem = coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
				- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead');

		// 1. Race Horse
		if (parseInt(setOffRem, 10) >= 0) {
			document
					.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead');

		} else {
			document
					.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse');
			setOffRem = 0;
		}

		// 2.salary
		var prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem, 10)
				- coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead');

		if (parseInt(setOffRem, 10) >= 0) {
			if (!checkIfChanged('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead');
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem, 10)
						- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem = 0;
		}

		// 3.House property
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem, 10)
				- coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead');
		if (parseInt(setOffRem, 10) >= 0) {
			if (!checkIfChanged('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead');
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem, 10)
						- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		} else {

			if (!checkIfChanged('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem = 0;
		}

		// 4. Business Income
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem, 10)
				- coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead');
		if (parseInt(setOffRem, 10) >= 0) {
			if (!checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead');
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem, 10)
						- coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		} else {

			if (!checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem = 0;
		}

		// 5. Short-term capital gain taxable @ 30%
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem, 10)
				- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead');
		if (parseInt(setOffRem, 10) >= 0) {
			if (!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead');
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem, 10)
						- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		} else {

			if (!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem = 0;
		}

		// 6.Short-term capital gain taxable at applicable rates
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem, 10)
				- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead');
		if (parseInt(setOffRem, 10) >= 0) {
			if (!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead');
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem, 10)
						- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		} else {

			if (!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem = 0;
		}

		// parseInt(ltcgPrctg20Sec112,10) ltcgBreakUp1--> ltcgPrctg20Sec112
		// 7)Long term capital gain taxable @ 20%
		prevSetOffRem = setOffRem;
		var ltcgSetOffRem = coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead');
		if (ltcgSetOffRem >= 0 && setOffRem >= 0) {
			if (ltcgSetOffRem >= setOffRem) {
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcgSetOffRem, 10);// mod
				if (setOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(
								ltcgSetOffRem, 10);
						ltcgPrctg20Sec112 = 0;
						ltcgPrctg20Sec11EA = 0;
					} else {
						checkFirstLessThanMinOthTwo(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
								coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));

						if (parseInt(ltcgPrctg20Sec112, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
							if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
								ltcgPrctg20Sec11EA = parseInt(
										ltcgPrctg20Sec11EA, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
										- parseInt(ltcgPrctg20Sec11EA, 10);
								ltcgPrctg20Sec11EA = 0;
							}
						}
					}
					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				} else {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = tempAk;
						setOffRem = 0;

						// sec break up
						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg20Sec11EA, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg20Sec11EA = parseInt(ltcgPrctg20Sec11EA,
									10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg20Sec11EA, 10);
							ltcgPrctg20Sec11EA = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg20Sec112, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
						}

					} else {
						checkFirstLessThanMinOthTwo(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
								coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));

						if (parseInt(ltcgPrctg20Sec112, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
							if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
								ltcgPrctg20Sec11EA = parseInt(
										ltcgPrctg20Sec11EA, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
										- parseInt(ltcgPrctg20Sec11EA, 10);
								ltcgPrctg20Sec11EA = 0;
							}
						}
					}
					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			} else {
				var prevLtcgSetOffRem = ltcgSetOffRem;

				if (ltcgSetOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(
								ltcgSetOffRem, 10);
						ltcgSetOffRem = 0;
						ltcgPrctg20Sec112 = 0;
						ltcgPrctg20Sec11EA = 0;
					} else {

						checkFirstLessThanMinOthTwo(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
								coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));

						var remaLTCGcomplete = document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
								- parseInt(ltcgPrctg20Sec112, 10);
						ltcgPrctg20Sec112 = 0;
						if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
							ltcgPrctg20Sec11EA = parseInt(ltcgPrctg20Sec11EA,
									10)
									- remaLTCGcomplete;
						} else {
							remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
									- parseInt(ltcgPrctg20Sec11EA, 10);
							ltcgPrctg20Sec11EA = 0;
						}
					}
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				} else {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevLtcgSetOffRem;
						ltcgSetOffRem = 0;
						ltcgPrctg20Sec112 = 0;
						ltcgPrctg20Sec11EA = 0;
					} else {

						checkFirstLessThanMinOthTwo(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
								coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));

						var remaLTCGcomplete = document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
								- parseInt(ltcgPrctg20Sec112, 10);
						ltcgPrctg20Sec112 = 0;
						if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
							ltcgPrctg20Sec11EA = parseInt(ltcgPrctg20Sec11EA,
									10)
									- remaLTCGcomplete;
						} else {
							remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
									- parseInt(ltcgPrctg20Sec11EA, 10);
							ltcgPrctg20Sec11EA = 0;
						}
					}
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			}
		}

		// 8.Short-term capital gain taxable @ 15%
		prevSetOffRem = setOffRem;
		setOffRem = parseInt(setOffRem, 10)
				- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead');
		if (parseInt(setOffRem, 10) >= 0) {
			if (!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead');
				stcgPercent15Sec111a = 0;
				stcgPercent15Sec115ad_1_b_ii = 0;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

				setOffRem = parseInt(prevSetOffRem, 10)
						- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff');
			}
		} else {

			if (!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = prevSetOffRem;

				// sec break up
				if (parseInt(prevSetOffRem, 10) >= 0
						&& parseInt(stcgPercent15Sec115ad_1_b_ii, 10) > parseInt(
								prevSetOffRem, 10)) {
					stcgPercent15Sec115ad_1_b_ii = parseInt(
							stcgPercent15Sec115ad_1_b_ii, 10)
							- parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				} else {
					prevSetOffRem = parseInt(prevSetOffRem, 10)
							- parseInt(stcgPercent15Sec115ad_1_b_ii, 10);
					stcgPercent15Sec115ad_1_b_ii = 0;
				}

				if (parseInt(prevSetOffRem, 10) >= 0
						&& parseInt(stcgPercent15Sec111a, 10) > parseInt(
								prevSetOffRem, 10)) {
					stcgPercent15Sec111a = parseInt(stcgPercent15Sec111a, 10)
							- parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				} else {
					prevSetOffRem = parseInt(prevSetOffRem, 10)
							- parseInt(stcgPercent15Sec111a, 10);
					stcgPercent15Sec111a = 0;
				}

			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
						coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
								- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
			}
			setOffRem = 0;
		}

		// 9)Long term capital gain taxable @ 10%
		prevSetOffRem = setOffRem;
		var ltcgSetOffRem = coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead');
		if (ltcgSetOffRem >= 0 && setOffRem >= 0) {
			if (ltcgSetOffRem >= setOffRem) {
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcgSetOffRem, 10); // mod

				if (setOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(
								ltcgSetOffRem, 10);

						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115ACA1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115Eb = 0;
						ltcgPrctg10SecProviso = 0;

					} else {
						checkFirstLessThanMinOthTwo(
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
								coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

						if (parseInt(ltcgPrctg10SecProviso, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value) {
							ltcgPrctg10SecProviso = parseInt(
									ltcgPrctg10SecProviso, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
									- parseInt(ltcgPrctg10SecProviso, 10);
							ltcgPrctg10SecProviso = 0;
							if (parseInt(ltcgPrctg10Sec112c2, 10) >= remaLTCGcomplete) {
								ltcgPrctg10Sec112c2 = parseInt(
										ltcgPrctg10Sec112c2, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
										- parseInt(ltcgPrctg10Sec112c2, 10);
								ltcgPrctg10Sec112c2 = 0;
								if (parseInt(ltcgPrctg10Sec115AC1, 10) >= remaLTCGcomplete) {
									ltcgPrctg10Sec115AC1 = parseInt(
											ltcgPrctg10Sec115AC1, 10)
											- remaLTCGcomplete;
								} else {
									remaLTCGcomplete = document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
											- parseInt(ltcgPrctg10Sec115AC1, 10);
									ltcgPrctg10Sec115AC1 = 0;
									if (parseInt(ltcgPrctg10Sec115ACA1, 10) >= remaLTCGcomplete) {
										ltcgPrctg10Sec115ACA1 = parseInt(
												ltcgPrctg10Sec115ACA1, 10)
												- remaLTCGcomplete;
									} else {
										remaLTCGcomplete = document
												.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
												- parseInt(
														ltcgPrctg10Sec115ACA1,
														10);
										ltcgPrctg10Sec115ACA1 = 0;
										if (parseInt(ltcgPrctg10Sec115AD3, 10) >= remaLTCGcomplete) {
											ltcgPrctg10Sec115AD3 = parseInt(
													ltcgPrctg10Sec115AD3, 10)
													- remaLTCGcomplete;
										} else {
											remaLTCGcomplete = document
													.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
													- parseInt(
															ltcgPrctg10Sec115AD3,
															10);
											ltcgPrctg10Sec115AD3 = 0;
											if (parseInt(ltcgPrctg10Sec115Eb,
													10) >= remaLTCGcomplete) {
												ltcgPrctg10Sec115Eb = parseInt(
														ltcgPrctg10Sec115Eb, 10)
														- remaLTCGcomplete;
											} else {
												ltcgPrctg10Sec115Eb = 0;
											}
										}
									}
								}
							}
						}
					}
					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				} else {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = tempAk;
						setOffRem = 0;

						// Section break up

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec112c2, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec112c2 = parseInt(ltcgPrctg10Sec112c2,
									10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec112c2, 10);
							ltcgPrctg10Sec112c2 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115AC1, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115AC1 = parseInt(
									ltcgPrctg10Sec115AC1, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115AC1, 10);
							ltcgPrctg10Sec115AC1 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115ACA1, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115ACA1 = parseInt(
									ltcgPrctg10Sec115ACA1, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115ACA1, 10);
							ltcgPrctg10Sec115ACA1 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115AD3, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115AD3 = parseInt(
									ltcgPrctg10Sec115AD3, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115AD3, 10);
							ltcgPrctg10Sec115AD3 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115Eb, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115Eb = parseInt(ltcgPrctg10Sec115Eb,
									10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115Eb, 10);
							ltcgPrctg10Sec115Eb = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10SecProviso, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10SecProviso = parseInt(
									ltcgPrctg10SecProviso, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10SecProviso, 10);
							ltcgPrctg10SecProviso = 0;
						}
					} else {
						checkFirstLessThanMinOthTwo(
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
								coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

						if (parseInt(ltcgPrctg10SecProviso, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value) {
							ltcgPrctg10SecProviso = parseInt(
									ltcgPrctg10SecProviso, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
									- parseInt(ltcgPrctg10SecProviso, 10);
							ltcgPrctg10SecProviso = 0;
							if (parseInt(ltcgPrctg10Sec112c2, 10) >= remaLTCGcomplete) {
								ltcgPrctg10Sec112c2 = parseInt(
										ltcgPrctg10Sec112c2, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
										- parseInt(ltcgPrctg10Sec112c2, 10);
								ltcgPrctg10Sec112c2 = 0;
								if (parseInt(ltcgPrctg10Sec115AC1, 10) >= remaLTCGcomplete) {
									ltcgPrctg10Sec115AC1 = parseInt(
											ltcgPrctg10Sec115AC1, 10)
											- remaLTCGcomplete;
								} else {
									remaLTCGcomplete = document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
											- parseInt(ltcgPrctg10Sec115AC1, 10);
									ltcgPrctg10Sec115AC1 = 0;
									if (parseInt(ltcgPrctg10Sec115ACA1, 10) >= remaLTCGcomplete) {
										ltcgPrctg10Sec115ACA1 = parseInt(
												ltcgPrctg10Sec115ACA1, 10)
												- remaLTCGcomplete;
									} else {
										remaLTCGcomplete = document
												.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
												- parseInt(
														ltcgPrctg10Sec115ACA1,
														10);
										ltcgPrctg10Sec115ACA1 = 0;
										if (parseInt(ltcgPrctg10Sec115AD3, 10) >= remaLTCGcomplete) {
											ltcgPrctg10Sec115AD3 = parseInt(
													ltcgPrctg10Sec115AD3, 10)
													- remaLTCGcomplete;
										} else {
											remaLTCGcomplete = document
													.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
													- parseInt(
															ltcgPrctg10Sec115AD3,
															10);
											ltcgPrctg10Sec115AD3 = 0;
											if (parseInt(ltcgPrctg10Sec115Eb,
													10) >= remaLTCGcomplete) {
												ltcgPrctg10Sec115Eb = parseInt(
														ltcgPrctg10Sec115Eb, 10)
														- remaLTCGcomplete;
											} else {
												ltcgPrctg10Sec115Eb = 0;
											}
										}
									}
								}
							}
						}
					}
					ltcgSetOffRem = zeroOrMore(ltcgSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			} else {

				if (ltcgSetOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value = parseInt(
								ltcgSetOffRem, 10);
						ltcgSetOffRem = 0;
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115ACA1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115Eb = 0;
						ltcgPrctg10SecProviso = 0;
					} else {

						checkFirstLessThanMinOthTwo(
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse',
								coalescePath('scheduleCYLA.totalCurYr.totOthSrcLossNoRaceHorse')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

						var remaLTCGcomplete = document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
								- parseInt(ltcgPrctg10SecProviso, 10);
						ltcgPrctg10SecProviso = 0;
						if (parseInt(ltcgPrctg10Sec112c2, 10) >= remaLTCGcomplete) {
							ltcgPrctg10Sec112c2 = parseInt(ltcgPrctg10Sec112c2,
									10)
									- remaLTCGcomplete;
						} else {
							remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
									- parseInt(ltcgPrctg10Sec112c2, 10);
							ltcgPrctg10Sec112c2 = 0;
							if (parseInt(ltcgPrctg10Sec115AC1, 10) >= remaLTCGcomplete) {
								ltcgPrctg10Sec115AC1 = parseInt(
										ltcgPrctg10Sec115AC1, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
										- parseInt(ltcgPrctg10Sec115AC1, 10);
								ltcgPrctg10Sec115AC1 = 0;
								if (parseInt(ltcgPrctg10Sec115ACA1, 10) >= remaLTCGcomplete) {
									ltcgPrctg10Sec115ACA1 = parseInt(
											ltcgPrctg10Sec115ACA1, 10)
											- remaLTCGcomplete;
								} else {
									remaLTCGcomplete = document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
											- parseInt(ltcgPrctg10Sec115ACA1,
													10);
									ltcgPrctg10Sec115ACA1 = 0;
									if (parseInt(ltcgPrctg10Sec115AD3, 10) >= remaLTCGcomplete) {
										ltcgPrctg10Sec115AD3 = parseInt(
												ltcgPrctg10Sec115AD3, 10)
												- remaLTCGcomplete;
									} else {
										remaLTCGcomplete = document
												.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')[0].value
												- parseInt(
														ltcgPrctg10Sec115AD3,
														10);
										ltcgPrctg10Sec115AD3 = 0;
										if (parseInt(ltcgPrctg10Sec115Eb, 10) >= remaLTCGcomplete) {
											ltcgPrctg10Sec115Eb = parseInt(
													ltcgPrctg10Sec115Eb, 10)
													- remaLTCGcomplete;
										} else {
											ltcgPrctg10Sec115Eb = 0;
										}
									}
								}
							}
						}
					}
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
				}
			}
		}
		cgosIncome.cgInc.stcg.prctg15.sec111a = stcgPercent15Sec111a;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = stcgPercent15Sec115ad_1_b_ii;
		cgosIncome.cgInc.ltcg.prctg20.sec112 = ltcgPrctg20Sec112;
		cgosIncome.cgInc.ltcg.prctg20.sec11EA = ltcgPrctg20Sec11EA;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = ltcgPrctg10SecProviso;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = ltcgPrctg10Sec112c2;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = ltcgPrctg10Sec115AC1;
		cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1 = ltcgPrctg10Sec115ACA1;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = ltcgPrctg10Sec115AD3;
		cgosIncome.cgInc.ltcg.prctg10.sec115E_b = ltcgPrctg10Sec115Eb;

		setOffHPLossCYLA(cgosIncome);
	} catch (e) {
		alert('error in setOffOthSrcLossCYLA()=' + e.stack);
	}
}

// To setOff schedule HP Loss CYLA
function setOffHPLossCYLA(cgosIncome) {
	try {

		var stcgPercent15Sec111a = cgosIncome.cgInc.stcg.prctg15.sec111a;
		var stcgPercent15Sec115ad_1_b_ii = cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
		var ltcgPrctg20Sec112 = cgosIncome.cgInc.ltcg.prctg20.sec112;
		var ltcgPrctg20Sec11EA = cgosIncome.cgInc.ltcg.prctg20.sec11EA;
		var ltcgPrctg10SecProviso = cgosIncome.cgInc.ltcg.prctg10.secProviso;
		var ltcgPrctg10Sec112c2 = cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2;
		var ltcgPrctg10Sec115AC1 = cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
		var ltcgPrctg10Sec115ACA1 = cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1;
		var ltcgPrctg10Sec115AD3 = cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
		var ltcgPrctg10Sec115Eb = cgosIncome.cgInc.ltcg.prctg10.sec115E_b;

		if (!checkIfChanged('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkHPeditableValidity(
					'scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));
		}

		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value = 0;

		if (!checkIfChanged('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkFirstLessThanMinOthTwo(
					'scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkHPeditableValidity(
					'scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkHPeditableValidity(
					'scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkHPeditableValidity(
					'scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkHPeditableValidity(
					'scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkHPeditableValidity(
					'scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
		}

		if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')) {
			document
					.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
		} else {
			checkHPeditableValidity(
					'scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff',
					'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
					'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
					'scheduleCYLA.totalCurYr.totHPlossCurYr',
					coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')
							- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff'));
		}

		/*
		 * Order of adjustment :- 1) Salaries 2) Business Income 3) Other
		 * sources 4) Profit from owning and maintaining race horses 5)
		 * Short-term capital gain taxable @ 30% 6) Short-term capital gain
		 * taxable at applicable rates 7) Long term capital gain taxable @ 20%
		 * (1.cgosIncome.cgInc.ltcg.prctg20.sec112,
		 * 2.cgosIncome.cgInc.ltcg.prctg20.sec11EA) 8) Short-term capital gain
		 * taxable @ 15% 9) Long term capital gain taxable @ 10% (1.
		 * cgosIncome.cgInc.ltcg.prctg10.secProviso, 2.
		 * cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 3.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 4.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1, 5.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 6.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115E_b)
		 */

		// 1. salary Income
		var salarySetOffRem = zeroOrMore(coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff'));
		var prevSetOffRem = coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr');
		var setOffRem = prevSetOffRem - salarySetOffRem;

		if (setOffRem >= 0) {
			if (coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr') == 0) {
				document
						.getElementsByName('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			} else {
				if (!checkIfChanged('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')) {
					document
							.getElementsByName('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')[0].value = salarySetOffRem;
				} else {
					checkHPeditableValidity(
							'scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff',
							'scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead',
							'scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff',
							'scheduleCYLA.totalCurYr.totHPlossCurYr',
							coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));

					setOffRem = parseInt(prevSetOffRem, 10)
							- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff');
				}
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')) {
				document
						.getElementsByName('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')[0].value = coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr');
			} else {
				checkHPeditableValidity(
						'scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.Salaries.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr'));
			}
			setOffRem = 0;
		}

		// 2. Business Income
		var busIncSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff'));
		prevSetOffRem = setOffRem;
		setOffRem = prevSetOffRem - busIncSetOffRem;

		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			} else {
				if (!checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')) {
					document
							.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value = busIncSetOffRem;
				} else {
					checkFirstLessThanMinOthTwo(
							'scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff',
							'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead',
							'scheduleCYLA.totalCurYr.totHPlossCurYr',
							coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
									- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem, 10)
							- coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff');
				}
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')) {
				document
						.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem = 0;
		}

		// 3) Other sources (excluding profit from owning race horses)

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem
				- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead');
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			} else {
				if (!checkIfChanged('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')) {
					document
							.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead');
				} else {
					checkFirstLessThanMinOthTwo(
							'scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff',
							'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead',
							'scheduleCYLA.totalCurYr.totHPlossCurYr',
							coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
									- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem, 10)
							- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff');
				}
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')) {
				document
						.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			} else {
				checkFirstLessThanMinOthTwo(
						'scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem = 0;
		}

		// 4) Profit from owning and maintaining race horse
		var raceHrsSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - raceHrsSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			} else {
				if (!checkIfChanged('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')) {
					document
							.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = raceHrsSetOffRem;
				} else {
					checkHPeditableValidity(
							'scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff',
							'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead',
							'scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff',
							'scheduleCYLA.totalCurYr.totHPlossCurYr',
							coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
									- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem, 10)
							- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff');
				}
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')) {
				document
						.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			} else {
				checkHPeditableValidity(
						'scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem = 0;
		}

		// 5) Short-term capital gain taxable @ 30%

		var stcg30PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg30PercntSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			} else {
				if (!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')) {
					document
							.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = stcg30PercntSetOffRem;
				} else {
					checkHPeditableValidity(
							'scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff',
							'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead',
							'scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
							'scheduleCYLA.totalCurYr.totHPlossCurYr',
							coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
									- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem, 10)
							- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff');
				}
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			} else {
				checkHPeditableValidity(
						'scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem = 0;
		}

		// 6) Short-term capital gain taxable at applicable rates

		var stcgAppRateSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcgAppRateSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			} else {
				if (!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')) {
					document
							.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = stcgAppRateSetOffRem;
				} else {
					checkHPeditableValidity(
							'scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff',
							'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead',
							'scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
							'scheduleCYLA.totalCurYr.totHPlossCurYr',
							coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
									- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem, 10)
							- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff');
				}
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;
			} else {
				checkHPeditableValidity(
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem = 0;
		}

		// 7) Long term capital gain taxable @ 20%
		prevSetOffRem = setOffRem;
		var ltcg20PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		if (ltcg20PercntSetOffRem >= 0 && setOffRem >= 0) {
			if (ltcg20PercntSetOffRem >= setOffRem) {
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg20PercntSetOffRem, 10);// mod

				if (setOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(
								ltcg20PercntSetOffRem, 10);
						ltcgPrctg20Sec112 = 0;
						ltcgPrctg20Sec11EA = 0;

					} else {

						checkHPeditableValidity(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.totalCurYr.totHPlossCurYr',
								coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));

						if (parseInt(ltcgPrctg20Sec112, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
							if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
								ltcgPrctg20Sec11EA = parseInt(
										ltcgPrctg20Sec11EA, 10)
										- remaLTCGcomplete;
							} else {

								ltcgPrctg20Sec11EA = 0;
							}
						}
					}
					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				} else {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = tempAk;
						setOffRem = 0;
						// sec break up

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg20Sec11EA, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg20Sec11EA = parseInt(ltcgPrctg20Sec11EA,
									10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg20Sec11EA, 10);
							ltcgPrctg20Sec11EA = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg20Sec112, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
						}

					} else {

						checkHPeditableValidity(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.totalCurYr.totHPlossCurYr',
								coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));

						if (parseInt(ltcgPrctg20Sec112, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
							if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
								ltcgPrctg20Sec11EA = parseInt(
										ltcgPrctg20Sec11EA, 10)
										- remaLTCGcomplete;
							} else {

								ltcgPrctg20Sec11EA = 0;
							}
						}
					}
					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				}
			} else {
				var prevLtcgSetOffRem = ltcg20PercntSetOffRem;

				if (ltcg20PercntSetOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(
								ltcg20PercntSetOffRem, 10);
						ltcg20PercntSetOffRem = 0;
						ltcgPrctg20Sec112 = 0;
						ltcgPrctg20Sec11EA = 0;
					} else {

						checkHPeditableValidity(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.totalCurYr.totHPlossCurYr',
								coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));

						if (parseInt(ltcgPrctg20Sec112, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
							if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
								ltcgPrctg20Sec11EA = parseInt(
										ltcgPrctg20Sec11EA, 10)
										- remaLTCGcomplete;
							} else {

								ltcgPrctg20Sec11EA = 0;
							}
						}
					}
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				} else {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value = prevLtcgSetOffRem;
						ltcg20PercntSetOffRem = 0;
						ltcgPrctg20Sec112 = 0;
						ltcgPrctg20Sec11EA = 0;

					} else {

						checkHPeditableValidity(
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.totalCurYr.totHPlossCurYr',
								coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));

						if (parseInt(ltcgPrctg20Sec112, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value) {
							ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')[0].value
									- parseInt(ltcgPrctg20Sec112, 10);
							ltcgPrctg20Sec112 = 0;
							if (parseInt(ltcgPrctg20Sec11EA, 10) >= remaLTCGcomplete) {
								ltcgPrctg20Sec11EA = parseInt(
										ltcgPrctg20Sec11EA, 10)
										- remaLTCGcomplete;
							} else {

								ltcgPrctg20Sec11EA = 0;
							}
						}
					}
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
				}
			}
		}

		// 8) Short-term capital gain taxable @ 15%
		var stcg15PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg15PercntSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = 0;
			} else {
				if (!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')) {
					document
							.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = stcg15PercntSetOffRem;
					stcg15PercntSetOffRem = 0;
					stcgPercent15Sec111a = 0;
					stcgPercent15Sec115ad_1_b_ii = 0;

				} else {
					checkHPeditableValidity(
							'scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff',
							'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead',
							'scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
							'scheduleCYLA.totalCurYr.totHPlossCurYr',
							coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
									- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
									- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));

					setOffRem = parseInt(prevSetOffRem, 10)
							- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff');
				}
			}
		} else {
			if (!checkIfChanged('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff')[0].value = prevSetOffRem;

				// sec break up
				if (parseInt(prevSetOffRem, 10) >= 0
						&& parseInt(stcgPercent15Sec115ad_1_b_ii, 10) > parseInt(
								prevSetOffRem, 10)) {
					stcgPercent15Sec115ad_1_b_ii = parseInt(
							stcgPercent15Sec115ad_1_b_ii, 10)
							- parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				} else {
					prevSetOffRem = parseInt(prevSetOffRem, 10)
							- parseInt(stcgPercent15Sec115ad_1_b_ii, 10);
					stcgPercent15Sec115ad_1_b_ii = 0;
				}

				if (parseInt(prevSetOffRem, 10) >= 0
						&& parseInt(stcgPercent15Sec111a, 10) > parseInt(
								prevSetOffRem, 10)) {
					stcgPercent15Sec111a = parseInt(stcgPercent15Sec111a, 10)
							- parseInt(prevSetOffRem, 10);
					prevSetOffRem = 0;
				} else {
					prevSetOffRem = parseInt(prevSetOffRem, 10)
							- parseInt(stcgPercent15Sec111a, 10);
					stcgPercent15Sec111a = 0;
				}

			} else {
				checkHPeditableValidity(
						'scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff',
						'scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead',
						'scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff',
						'scheduleCYLA.totalCurYr.totHPlossCurYr',
						coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
								- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
								- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
			}
			setOffRem = 0;
		}

		// 9) Long term capital gain taxable @ 10%
		prevSetOffRem = setOffRem;
		var ltcg10PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff'));
		if (ltcg10PercntSetOffRem >= 0 && setOffRem >= 0) {
			if (ltcg10PercntSetOffRem >= setOffRem) {
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg10PercntSetOffRem, 10);// mod

				if (setOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(
								ltcg10PercntSetOffRem, 10);
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115ACA1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115Eb = 0;
						ltcgPrctg10SecProviso = 0;

					} else {

						checkHPeditableValidity(
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.totalCurYr.totHPlossCurYr',
								coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff'));

						if (parseInt(ltcgPrctg10SecProviso, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value) {
							ltcgPrctg10SecProviso = parseInt(
									ltcgPrctg10SecProviso, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
									- parseInt(ltcgPrctg10SecProviso, 10);
							ltcgPrctg10SecProviso = 0;
							if (parseInt(ltcgPrctg10Sec112c2, 10) >= remaLTCGcomplete) {
								ltcgPrctg10Sec112c2 = parseInt(
										ltcgPrctg10Sec112c2, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
										- parseInt(ltcgPrctg10Sec112c2, 10);
								ltcgPrctg10Sec112c2 = 0;
								if (parseInt(ltcgPrctg10Sec115AC1, 10) >= remaLTCGcomplete) {
									ltcgPrctg10Sec115AC1 = parseInt(
											ltcgPrctg10Sec115AC1, 10)
											- remaLTCGcomplete;
								} else {
									remaLTCGcomplete = document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
											- parseInt(ltcgPrctg10Sec115AC1, 10);
									ltcgPrctg10Sec115AC1 = 0;
									if (parseInt(ltcgPrctg10Sec115ACA1, 10) >= remaLTCGcomplete) {
										ltcgPrctg10Sec115ACA1 = parseInt(
												ltcgPrctg10Sec115ACA1, 10)
												- remaLTCGcomplete;
									} else {
										remaLTCGcomplete = document
												.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
												- parseInt(
														ltcgPrctg10Sec115ACA1,
														10);
										ltcgPrctg10Sec115ACA1 = 0;
										if (parseInt(ltcgPrctg10Sec115AD3, 10) >= remaLTCGcomplete) {
											ltcgPrctg10Sec115AD3 = parseInt(
													ltcgPrctg10Sec115AD3, 10)
													- remaLTCGcomplete;
										} else {
											remaLTCGcomplete = document
													.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
													- parseInt(
															ltcgPrctg10Sec115AD3,
															10);
											ltcgPrctg10Sec115AD3 = 0;
											if (parseInt(ltcgPrctg10Sec115Eb,
													10) >= remaLTCGcomplete) {
												ltcgPrctg10Sec115Eb = parseInt(
														ltcgPrctg10Sec115Eb, 10)
														- remaLTCGcomplete;
											} else {
												remaLTCGcomplete = document
														.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
														- parseInt(
																ltcgPrctg10Sec115Eb,
																10);
												ltcgPrctg10Sec115Eb = 0;
											}
										}
									}
								}
							}
						}
					}
					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
				} else {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = tempAk;
						setOffRem = 0;

						// Section break up

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec112c2, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec112c2 = parseInt(ltcgPrctg10Sec112c2,
									10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec112c2, 10);
							ltcgPrctg10Sec112c2 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115AC1, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115AC1 = parseInt(
									ltcgPrctg10Sec115AC1, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115AC1, 10);
							ltcgPrctg10Sec115AC1 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115ACA1, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115ACA1 = parseInt(
									ltcgPrctg10Sec115ACA1, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115ACA1, 10);
							ltcgPrctg10Sec115ACA1 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115AD3, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115AD3 = parseInt(
									ltcgPrctg10Sec115AD3, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115AD3, 10);
							ltcgPrctg10Sec115AD3 = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10Sec115Eb, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10Sec115Eb = parseInt(ltcgPrctg10Sec115Eb,
									10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10Sec115Eb, 10);
							ltcgPrctg10Sec115Eb = 0;
						}

						if (parseInt(tempAk, 10) >= 0
								&& parseInt(ltcgPrctg10SecProviso, 10) > parseInt(
										tempAk, 10)) {
							ltcgPrctg10SecProviso = parseInt(
									ltcgPrctg10SecProviso, 10)
									- parseInt(tempAk, 10);
							tempAk = 0;
						} else {
							tempAk = parseInt(tempAk, 10)
									- parseInt(ltcgPrctg10SecProviso, 10);
							ltcgPrctg10SecProviso = 0;
						}
					} else {

						checkHPeditableValidity(
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.totalCurYr.totHPlossCurYr',
								coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff'));

						if (parseInt(ltcgPrctg10SecProviso, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value) {
							ltcgPrctg10SecProviso = parseInt(
									ltcgPrctg10SecProviso, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
									- parseInt(ltcgPrctg10SecProviso, 10);
							ltcgPrctg10SecProviso = 0;
							if (parseInt(ltcgPrctg10Sec112c2, 10) >= remaLTCGcomplete) {
								ltcgPrctg10Sec112c2 = parseInt(
										ltcgPrctg10Sec112c2, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
										- parseInt(ltcgPrctg10Sec112c2, 10);
								ltcgPrctg10Sec112c2 = 0;
								if (parseInt(ltcgPrctg10Sec115AC1, 10) >= remaLTCGcomplete) {
									ltcgPrctg10Sec115AC1 = parseInt(
											ltcgPrctg10Sec115AC1, 10)
											- remaLTCGcomplete;
								} else {
									remaLTCGcomplete = document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
											- parseInt(ltcgPrctg10Sec115AC1, 10);
									ltcgPrctg10Sec115AC1 = 0;
									if (parseInt(ltcgPrctg10Sec115ACA1, 10) >= remaLTCGcomplete) {
										ltcgPrctg10Sec115ACA1 = parseInt(
												ltcgPrctg10Sec115ACA1, 10)
												- remaLTCGcomplete;
									} else {
										remaLTCGcomplete = document
												.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
												- parseInt(
														ltcgPrctg10Sec115ACA1,
														10);
										ltcgPrctg10Sec115ACA1 = 0;
										if (parseInt(ltcgPrctg10Sec115AD3, 10) >= remaLTCGcomplete) {
											ltcgPrctg10Sec115AD3 = parseInt(
													ltcgPrctg10Sec115AD3, 10)
													- remaLTCGcomplete;
										} else {
											remaLTCGcomplete = document
													.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
													- parseInt(
															ltcgPrctg10Sec115AD3,
															10);
											ltcgPrctg10Sec115AD3 = 0;
											if (parseInt(ltcgPrctg10Sec115Eb,
													10) >= remaLTCGcomplete) {
												ltcgPrctg10Sec115Eb = parseInt(
														ltcgPrctg10Sec115Eb, 10)
														- remaLTCGcomplete;
											} else {
												remaLTCGcomplete = document
														.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
														- parseInt(
																ltcgPrctg10Sec115Eb,
																10);
												ltcgPrctg10Sec115Eb = 0;
											}
										}
									}
								}
							}
						}
					}
					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
				}
			} else {

				if (ltcg10PercntSetOffRem >= 0) {
					if (!checkIfChanged('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')) {
						document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value = parseInt(
								ltcg10PercntSetOffRem, 10);
						ltcg10PercntSetOffRem = 0;
						ltcgPrctg10Sec112c2 = 0;
						ltcgPrctg10Sec115AC1 = 0;
						ltcgPrctg10Sec115ACA1 = 0;
						ltcgPrctg10Sec115AD3 = 0;
						ltcgPrctg10Sec115Eb = 0;
						ltcgPrctg10SecProviso = 0;
					} else {

						checkHPeditableValidity(
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead',
								'scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff',
								'scheduleCYLA.totalCurYr.totHPlossCurYr',
								coalescePath('scheduleCYLA.totalCurYr.totHPlossCurYr')
										- coalescePath('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff')
										- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff'));

						if (parseInt(ltcgPrctg10SecProviso, 10) >= document
								.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value) {
							ltcgPrctg10SecProviso = parseInt(
									ltcgPrctg10SecProviso, 10)
									- document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value;
						} else {
							var remaLTCGcomplete = document
									.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
									- parseInt(ltcgPrctg10SecProviso, 10);
							ltcgPrctg10SecProviso = 0;
							if (parseInt(ltcgPrctg10Sec112c2, 10) >= remaLTCGcomplete) {
								ltcgPrctg10Sec112c2 = parseInt(
										ltcgPrctg10Sec112c2, 10)
										- remaLTCGcomplete;
							} else {
								remaLTCGcomplete = document
										.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
										- parseInt(ltcgPrctg10Sec112c2, 10);
								ltcgPrctg10Sec112c2 = 0;
								if (parseInt(ltcgPrctg10Sec115AC1, 10) >= remaLTCGcomplete) {
									ltcgPrctg10Sec115AC1 = parseInt(
											ltcgPrctg10Sec115AC1, 10)
											- remaLTCGcomplete;
								} else {
									remaLTCGcomplete = document
											.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
											- parseInt(ltcgPrctg10Sec115AC1, 10);
									ltcgPrctg10Sec115AC1 = 0;
									if (parseInt(ltcgPrctg10Sec115ACA1, 10) >= remaLTCGcomplete) {
										ltcgPrctg10Sec115ACA1 = parseInt(
												ltcgPrctg10Sec115ACA1, 10)
												- remaLTCGcomplete;
									} else {
										remaLTCGcomplete = document
												.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
												- parseInt(
														ltcgPrctg10Sec115ACA1,
														10);
										ltcgPrctg10Sec115ACA1 = 0;
										if (parseInt(ltcgPrctg10Sec115AD3, 10) >= remaLTCGcomplete) {
											ltcgPrctg10Sec115AD3 = parseInt(
													ltcgPrctg10Sec115AD3, 10)
													- remaLTCGcomplete;
										} else {
											remaLTCGcomplete = document
													.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
													- parseInt(
															ltcgPrctg10Sec115AD3,
															10);
											ltcgPrctg10Sec115AD3 = 0;
											if (parseInt(ltcgPrctg10Sec115Eb,
													10) >= remaLTCGcomplete) {
												ltcgPrctg10Sec115Eb = parseInt(
														ltcgPrctg10Sec115Eb, 10)
														- remaLTCGcomplete;
											} else {
												remaLTCGcomplete = document
														.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff')[0].value
														- parseInt(
																ltcgPrctg10Sec115Eb,
																10);
												ltcgPrctg10Sec115Eb = 0;
											}
										}
									}
								}
							}
						}
					}
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
				}
			}
		}

		cgosIncome.cgInc.stcg.prctg15.sec111a = stcgPercent15Sec111a;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = stcgPercent15Sec115ad_1_b_ii;
		cgosIncome.cgInc.ltcg.prctg20.sec112 = ltcgPrctg20Sec112;
		cgosIncome.cgInc.ltcg.prctg20.sec11EA = ltcgPrctg20Sec11EA;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = ltcgPrctg10SecProviso;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = ltcgPrctg10Sec112c2;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = ltcgPrctg10Sec115AC1;
		cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1 = ltcgPrctg10Sec115ACA1;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = ltcgPrctg10Sec115AD3;
		cgosIncome.cgInc.ltcg.prctg10.sec115E_b = ltcgPrctg10Sec115Eb;
		setOffBussLossCYLA(cgosIncome);
	} catch (e) {
		alert('error in setOffHPLossCYLA = ' + e.stack);
	}
}

// To setOff schedule Buss Loss CYLA
function setOffBussLossCYLA(cgosIncome) {
	try {
		var stcgPercent15Sec111a = cgosIncome.cgInc.stcg.prctg15.sec111a;
		var stcgPercent15Sec115ad_1_b_ii = cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
		var ltcgPrctg20Sec112 = cgosIncome.cgInc.ltcg.prctg20.sec112;
		var ltcgPrctg20Sec11EA = cgosIncome.cgInc.ltcg.prctg20.sec11EA;
		var ltcgPrctg10SecProviso = cgosIncome.cgInc.ltcg.prctg10.secProviso;
		var ltcgPrctg10Sec112c2 = cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2;
		var ltcgPrctg10Sec115AC1 = cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
		var ltcgPrctg10Sec115ACA1 = cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1;
		var ltcgPrctg10Sec115AD3 = cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
		var ltcgPrctg10Sec115Eb = cgosIncome.cgInc.ltcg.prctg10.sec115E_b;

		document
				.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value = 0;
		document
				.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = 0;
		document
				.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = 0;
		document
				.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = 0;
		document
				.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = 0;
		document
				.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = 0;
		document
				.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value = 0;
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = 0;

		/*
		 * Order of adjustment :- 1) HP Income 2) Other sources 3) Profit from
		 * owning and maintaining race horses 4) Short-term capital gain taxable @
		 * 30% 5) Short-term capital gain taxable at applicable rates 6) Long
		 * term capital gain taxable @ 20%
		 * (1.cgosIncome.cgInc.ltcg.prctg20.sec112,
		 * 2.cgosIncome.cgInc.ltcg.prctg20.sec11EA) 7) Short-term capital gain
		 * taxable @ 15% 8) Long term capital gain taxable @ 10% (1.
		 * cgosIncome.cgInc.ltcg.prctg10.secProviso, 2.
		 * cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 3.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 4.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1, 5.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 6.
		 * cgosIncome.cgInc.ltcg.prctg10.sec115E_b)
		 */

		// 1. HP Income
		var hpSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff'));
		var prevSetOffRem = coalescePath('scheduleCYLA.totalCurYr.totBusLoss');
		var setOffRem = prevSetOffRem - hpSetOffRem;

		if (setOffRem >= 0) {
			if (coalescePath('scheduleCYLA.totalCurYr.totBusLoss') == 0) {
				document
						.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value = 0;
			} else {
				document
						.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value = hpSetOffRem;
			}
		} else {
			document
					.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].value = coalescePath('scheduleCYLA.totalCurYr.totBusLoss');
			setOffRem = 0;
		}

		// 2. Other sources
		var osIncSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff'));
		prevSetOffRem = setOffRem;
		setOffRem = prevSetOffRem - osIncSetOffRem;

		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value = 0;
			} else {
				document
						.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value = osIncSetOffRem;
			}
		} else {
			document
					.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
			setOffRem = 0;
		}

		// 3) Profit from owning and maintaining race horse
		var raceHrsSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')
				- coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.othSrcLossNoRaceHorseSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - raceHrsSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = 0;
			} else {
				document
						.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = raceHrsSetOffRem;
			}
		} else {
			document
					.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
			setOffRem = 0;
		}

		// 4) Short-term capital gain taxable @ 30%

		var stcg30PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				- coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.hPlossCurYrSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg30PercntSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = 0;
			} else {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = stcg30PercntSetOffRem;
			}
		} else {
			document
					.getElementsByName('scheduleCYLA.stcg.stcg30Per.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
			setOffRem = 0;
		}

		// 5) Short-term capital gain taxable at applicable rates

		var stcgAppRateSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.othSrcLossNoRaceHorseSetoff')
				- coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.hPlossCurYrSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcgAppRateSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = 0;
			} else {
				document
						.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = stcgAppRateSetOffRem;
			}
		} else {
			document
					.getElementsByName('scheduleCYLA.stcg.stcgAppRate.incCYLA.busLossSetoff')[0].value = prevSetOffRem;
			setOffRem = 0;
		}

		// 6) Long term capital gain taxable @ 20%
		prevSetOffRem = setOffRem;
		var ltcg20PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.hPlossCurYrSetoff'));
		if (ltcg20PercntSetOffRem >= 0 && setOffRem >= 0) {
			if (ltcg20PercntSetOffRem >= setOffRem) {
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg20PercntSetOffRem, 10);

				if (setOffRem >= 0) {
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = parseInt(
							ltcg20PercntSetOffRem, 10);
					ltcgPrctg20Sec112 = 0;
					ltcgPrctg20Sec11EA = 0;

					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				} else {
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = tempAk;
					setOffRem = 0;
					// sec break up

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg20Sec11EA, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg20Sec11EA = parseInt(ltcgPrctg20Sec11EA, 10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg20Sec11EA, 10);
						ltcgPrctg20Sec11EA = 0;
					}

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg20Sec112, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg20Sec112 = parseInt(ltcgPrctg20Sec112, 10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg20Sec112, 10);
						ltcgPrctg20Sec112 = 0;
					}

					ltcg20PercntSetOffRem = zeroOrMore(ltcg20PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				}
			} else {
				var prevLtcgSetOffRem = ltcg20PercntSetOffRem;

				if (ltcg20PercntSetOffRem >= 0) {
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = parseInt(
							ltcg20PercntSetOffRem, 10);
					ltcg20PercntSetOffRem = 0;
					ltcgPrctg20Sec112 = 0;
					ltcgPrctg20Sec11EA = 0;
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				} else {
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff')[0].value = prevLtcgSetOffRem;
					ltcg20PercntSetOffRem = 0;
					ltcgPrctg20Sec112 = 0;
					ltcgPrctg20Sec11EA = 0;
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.busLossSetoff'));
				}
			}
		}

		// 7) Short-term capital gain taxable @ 15%
		var stcg15PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				- coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.hPlossCurYrSetoff'));

		prevSetOffRem = setOffRem;
		setOffRem = setOffRem - stcg15PercntSetOffRem;
		if (setOffRem >= 0) {
			if (prevSetOffRem == 0) {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = 0;
			} else {
				document
						.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = stcg15PercntSetOffRem;
				stcg15PercntSetOffRem = 0;
				stcgPercent15Sec111a = 0;
				stcgPercent15Sec115ad_1_b_ii = 0;

			}
		} else {
			document
					.getElementsByName('scheduleCYLA.stcg.stcg15Per.incCYLA.busLossSetoff')[0].value = prevSetOffRem;

			// sec break up
			if (parseInt(prevSetOffRem, 10) >= 0
					&& parseInt(stcgPercent15Sec115ad_1_b_ii, 10) > parseInt(
							prevSetOffRem, 10)) {
				stcgPercent15Sec115ad_1_b_ii = parseInt(
						stcgPercent15Sec115ad_1_b_ii, 10)
						- parseInt(prevSetOffRem, 10);
				prevSetOffRem = 0;
			} else {
				prevSetOffRem = parseInt(prevSetOffRem, 10)
						- parseInt(stcgPercent15Sec115ad_1_b_ii, 10);
				stcgPercent15Sec115ad_1_b_ii = 0;
			}

			if (parseInt(prevSetOffRem, 10) >= 0
					&& parseInt(stcgPercent15Sec111a, 10) > parseInt(
							prevSetOffRem, 10)) {
				stcgPercent15Sec111a = parseInt(stcgPercent15Sec111a, 10)
						- parseInt(prevSetOffRem, 10);
				prevSetOffRem = 0;
			} else {
				prevSetOffRem = parseInt(prevSetOffRem, 10)
						- parseInt(stcgPercent15Sec111a, 10);
				stcgPercent15Sec111a = 0;
			}

			setOffRem = 0;
		}

		// 8) Long term capital gain taxable @ 10%
		prevSetOffRem = setOffRem;
		var ltcg10PercntSetOffRem = zeroOrMore(coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrUnderThatHead')
				- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.othSrcLossNoRaceHorseSetoff')
				- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.hPlossCurYrSetoff'));
		if (ltcg10PercntSetOffRem >= 0 && setOffRem >= 0) {
			if (ltcg10PercntSetOffRem >= setOffRem) {
				var tempAk = setOffRem;
				setOffRem = setOffRem - parseInt(ltcg10PercntSetOffRem, 10);

				if (setOffRem >= 0) {
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = parseInt(
							ltcg10PercntSetOffRem, 10);
					ltcgPrctg10Sec112c2 = 0;
					ltcgPrctg10Sec115AC1 = 0;
					ltcgPrctg10Sec115ACA1 = 0;
					ltcgPrctg10Sec115AD3 = 0;
					ltcgPrctg10Sec115Eb = 0;
					ltcgPrctg10SecProviso = 0;

					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff'));
				} else {
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = tempAk;
					setOffRem = 0;

					// Section break up

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg10Sec112c2, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg10Sec112c2 = parseInt(ltcgPrctg10Sec112c2, 10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg10Sec112c2, 10);
						ltcgPrctg10Sec112c2 = 0;
					}

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg10Sec115AC1, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg10Sec115AC1 = parseInt(ltcgPrctg10Sec115AC1,
								10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg10Sec115AC1, 10);
						ltcgPrctg10Sec115AC1 = 0;
					}

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg10Sec115ACA1, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg10Sec115ACA1 = parseInt(ltcgPrctg10Sec115ACA1,
								10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg10Sec115ACA1, 10);
						ltcgPrctg10Sec115ACA1 = 0;
					}

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg10Sec115AD3, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg10Sec115AD3 = parseInt(ltcgPrctg10Sec115AD3,
								10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg10Sec115AD3, 10);
						ltcgPrctg10Sec115AD3 = 0;
					}

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg10Sec115Eb, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg10Sec115Eb = parseInt(ltcgPrctg10Sec115Eb, 10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg10Sec115Eb, 10);
						ltcgPrctg10Sec115Eb = 0;
					}

					if (parseInt(tempAk, 10) >= 0
							&& parseInt(ltcgPrctg10SecProviso, 10) > parseInt(
									tempAk, 10)) {
						ltcgPrctg10SecProviso = parseInt(ltcgPrctg10SecProviso,
								10)
								- parseInt(tempAk, 10);
						tempAk = 0;
					} else {
						tempAk = parseInt(tempAk, 10)
								- parseInt(ltcgPrctg10SecProviso, 10);
						ltcgPrctg10SecProviso = 0;
					}
					ltcg10PercntSetOffRem = zeroOrMore(ltcg10PercntSetOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff'));
				}
			} else {

				if (ltcg10PercntSetOffRem >= 0) {
					document
							.getElementsByName('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff')[0].value = parseInt(
							ltcg10PercntSetOffRem, 10);
					ltcg10PercntSetOffRem = 0;
					ltcgPrctg10Sec112c2 = 0;
					ltcgPrctg10Sec115AC1 = 0;
					ltcgPrctg10Sec115ACA1 = 0;
					ltcgPrctg10Sec115AD3 = 0;
					ltcgPrctg10Sec115Eb = 0;
					ltcgPrctg10SecProviso = 0;
					setOffRem = zeroOrMore(setOffRem
							- coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.busLossSetoff'));
				}
			}
		}

		cgosIncome.cgInc.stcg.prctg15.sec111a = stcgPercent15Sec111a;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = stcgPercent15Sec115ad_1_b_ii;
		cgosIncome.cgInc.ltcg.prctg20.sec112 = ltcgPrctg20Sec112;
		cgosIncome.cgInc.ltcg.prctg20.sec11EA = ltcgPrctg20Sec11EA;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = ltcgPrctg10SecProviso;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = ltcgPrctg10Sec112c2;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = ltcgPrctg10Sec115AC1;
		cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1 = ltcgPrctg10Sec115ACA1;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = ltcgPrctg10Sec115AD3;
		cgosIncome.cgInc.ltcg.prctg10.sec115E_b = ltcgPrctg10Sec115Eb;

	} catch (e) {
		alert('error in  setOffBussLossCYLA() = ' + e.stack);
	}
}

// To set the large value to the First field
function setFirstToSecondMax(first, second, target) {
	try {
		if (coalescePath(first) > coalescePath(second)) {
			document.getElementsByName(target)[0].value = coalescePath(second);
		} else {
			document.getElementsByName(target)[0].value = coalescePath(first);
		}
	} catch (e) {
		alert('error in setFirstToSecondMax= ' + e.stack);
	}
}

// To calculate schedule BFLA
function calcBFLA(cgosIncome) {
	try {
		prefillBFLA();
		calcCFL_sumAll();

		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF',
				'scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF',
				'scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF',
				'scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF',
				'scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF',
				'scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF',
				'scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF',
				'scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		setFirstToSecondMax(
				'scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF',
				'scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA',
				'scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		var stcgCFL = coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF');
		var tempstcgCFL = stcgCFL;
		var ltcgCFL = coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF');
		var tempLtcgCFL = ltcgCFL;

		var stcgBreakUp1 = cgosIncome.cgInc.stcg.prctg30;
		var stcgBreakUp2 = cgosIncome.cgInc.stcg.prctgAr;
		var stcgBreakUp3 = cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii;
		var stcgBreakUp4 = cgosIncome.cgInc.stcg.prctg15.sec111a;

		var ltcgBreakUp2 = cgosIncome.cgInc.ltcg.prctg20.sec11EA;
		var ltcgBreakUp1 = cgosIncome.cgInc.ltcg.prctg20.sec112;
		var ltcgBreakUp4 = cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2;
		var ltcgBreakUp5 = cgosIncome.cgInc.ltcg.prctg10.sec115AC_1;
		var ltcgBreakUp6 = cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1;
		var ltcgBreakUp7 = cgosIncome.cgInc.ltcg.prctg10.sec115AD_3;
		var ltcgBreakUp8 = cgosIncome.cgInc.ltcg.prctg10.sec115E_b;
		var ltcgBreakUp3 = cgosIncome.cgInc.ltcg.prctg10.secProviso;

		var tempstcgBreakUp1 = parseInt(stcgBreakUp1, 10);
		var tempstcgBreakUp2 = parseInt(stcgBreakUp2, 10);
		var tempstcgBreakUp3 = parseInt(stcgBreakUp3, 10);
		var tempstcgBreakUp4 = parseInt(stcgBreakUp4, 10);

		var templtcgBreakUp1 = parseInt(ltcgBreakUp1, 10);
		var templtcgBreakUp2 = parseInt(ltcgBreakUp2, 10);
		var templtcgBreakUp3 = parseInt(ltcgBreakUp3, 10);
		var templtcgBreakUp4 = parseInt(ltcgBreakUp4, 10);
		var templtcgBreakUp5 = parseInt(ltcgBreakUp5, 10);
		var templtcgBreakUp6 = parseInt(ltcgBreakUp6, 10);
		var templtcgBreakUp7 = parseInt(ltcgBreakUp7, 10);
		var templtcgBreakUp8 = parseInt(ltcgBreakUp8, 10);

		// stage-1 setting off LTCG_CFL
		// setting with templtcgBreakUp1

		if (tempLtcgCFL > templtcgBreakUp2) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp2;
			templtcgBreakUp2 = 0;
		} else {
			templtcgBreakUp2 = zeroOrMore(templtcgBreakUp2 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp1) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp1;
			templtcgBreakUp1 = 0;
		} else {
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp4) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp4;
			templtcgBreakUp4 = 0;
		} else {
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp5) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp5;
			templtcgBreakUp5 = 0;
		} else {
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp6) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp6;
			templtcgBreakUp6 = 0;
		} else {
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp7) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp7;
			templtcgBreakUp7 = 0;
		} else {
			templtcgBreakUp7 = zeroOrMore(templtcgBreakUp7 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp8) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp8;
			templtcgBreakUp8 = 0;
		} else {
			templtcgBreakUp8 = zeroOrMore(templtcgBreakUp8 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp3) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp3;
			templtcgBreakUp3 = 0;
		} else {
			templtcgBreakUp3 = zeroOrMore(templtcgBreakUp3 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		// setting the "adjustment of above losses in BFLA" - LTCG value in CFL
		document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.ltcgLossCF')[0].value = parseInt(
				zeroOrMore(parseInt(ltcgBreakUp1, 10) - templtcgBreakUp1), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp2, 10)
						- templtcgBreakUp2), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp3, 10)
						- templtcgBreakUp3), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp4, 10)
						- templtcgBreakUp4), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp5, 10)
						- templtcgBreakUp5), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp6, 10)
						- templtcgBreakUp6), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp7, 10)
						- templtcgBreakUp7), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp8, 10)
						- templtcgBreakUp8), 10);

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
		var storeLTCG7 = templtcgBreakUp7;
		var storeLTCG8 = templtcgBreakUp8;

		if (tempstcgCFL > tempstcgBreakUp1) {
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp1;
			tempstcgBreakUp1 = 0;
		} else {
			tempstcgBreakUp1 = zeroOrMore(tempstcgBreakUp1 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > tempstcgBreakUp2) {
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp2;
			tempstcgBreakUp2 = 0;
		} else {
			tempstcgBreakUp2 = zeroOrMore(tempstcgBreakUp2 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > templtcgBreakUp2) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp2;
			templtcgBreakUp2 = 0;
		} else {
			templtcgBreakUp2 = zeroOrMore(templtcgBreakUp2 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > templtcgBreakUp1) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp1;
			templtcgBreakUp1 = 0;
		} else {
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > tempstcgBreakUp3) {
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp3;
			tempstcgBreakUp3 = 0;
		} else {
			tempstcgBreakUp3 = zeroOrMore(tempstcgBreakUp3 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > tempstcgBreakUp4) {
			tempstcgCFL = tempstcgCFL - tempstcgBreakUp4;
			tempstcgBreakUp4 = 0;
		} else {
			tempstcgBreakUp4 = zeroOrMore(tempstcgBreakUp4 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		// adjusting STCG first

		if (tempstcgCFL > templtcgBreakUp4) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp4;
			templtcgBreakUp4 = 0;
		} else {
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > templtcgBreakUp5) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp5;
			templtcgBreakUp5 = 0;
		} else {
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > templtcgBreakUp6) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp6;
			templtcgBreakUp6 = 0;
		} else {
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > templtcgBreakUp7) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp7;
			templtcgBreakUp7 = 0;
		} else {
			templtcgBreakUp7 = zeroOrMore(templtcgBreakUp7 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > templtcgBreakUp8) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp8;
			templtcgBreakUp8 = 0;
		} else {
			templtcgBreakUp8 = zeroOrMore(templtcgBreakUp8 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		if (tempstcgCFL > templtcgBreakUp3) {
			tempstcgCFL = tempstcgCFL - templtcgBreakUp3;
			templtcgBreakUp3 = 0;
		} else {
			templtcgBreakUp3 = zeroOrMore(templtcgBreakUp3 - tempstcgCFL);
			tempstcgCFL = 0;
		}

		// adjusting with LTCG

		if (tempLtcgCFL > templtcgBreakUp2) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp2;
			templtcgBreakUp2 = 0;
		} else {
			templtcgBreakUp2 = zeroOrMore(templtcgBreakUp2 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp1) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp1;
			templtcgBreakUp1 = 0;
		} else {
			templtcgBreakUp1 = zeroOrMore(templtcgBreakUp1 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp4) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp4;
			templtcgBreakUp4 = 0;
		} else {
			templtcgBreakUp4 = zeroOrMore(templtcgBreakUp4 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp5) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp5;
			templtcgBreakUp5 = 0;
		} else {
			templtcgBreakUp5 = zeroOrMore(templtcgBreakUp5 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp6) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp6;
			templtcgBreakUp6 = 0;
		} else {
			templtcgBreakUp6 = zeroOrMore(templtcgBreakUp6 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp7) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp7;
			templtcgBreakUp7 = 0;
		} else {
			templtcgBreakUp7 = zeroOrMore(templtcgBreakUp7 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp8) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp8;
			templtcgBreakUp8 = 0;
		} else {
			templtcgBreakUp8 = zeroOrMore(templtcgBreakUp8 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		if (tempLtcgCFL > templtcgBreakUp3) {
			tempLtcgCFL = tempLtcgCFL - templtcgBreakUp3;
			templtcgBreakUp3 = 0;
		} else {
			templtcgBreakUp3 = zeroOrMore(templtcgBreakUp3 - tempLtcgCFL);
			tempLtcgCFL = 0;
		}

		// stage-2 setting off STCG_CFL

		document
				.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value = parseInt(
				zeroOrMore(parseInt(stcgBreakUp1, 10) - tempstcgBreakUp1), 10);
		document
				.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value = parseInt(
				zeroOrMore(parseInt(stcgBreakUp2, 10) - tempstcgBreakUp2), 10);
		document
				.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value = parseInt(
				zeroOrMore(parseInt(stcgBreakUp3, 10) - tempstcgBreakUp3), 10)
				+ parseInt(zeroOrMore(parseInt(stcgBreakUp4, 10)
						- tempstcgBreakUp4), 10);
		document
				.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value = parseInt(
				zeroOrMore(parseInt(ltcgBreakUp1, 10) - templtcgBreakUp1), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp2, 10)
						- templtcgBreakUp2), 10);
		document
				.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value = parseInt(
				zeroOrMore(parseInt(ltcgBreakUp3, 10) - templtcgBreakUp3), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp4, 10)
						- templtcgBreakUp4), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp5, 10)
						- templtcgBreakUp5), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp6, 10)
						- templtcgBreakUp6), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp7, 10)
						- templtcgBreakUp7), 10)
				+ parseInt(zeroOrMore(parseInt(ltcgBreakUp8, 10)
						- templtcgBreakUp8), 10);

		document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.stcgLossCF')[0].value = parseInt(
				zeroOrMore(storeSTCG1 - tempstcgBreakUp1), 10)
				+ parseInt(zeroOrMore(storeSTCG2 - tempstcgBreakUp2), 10)
				+ parseInt(zeroOrMore(storeSTCG3 - tempstcgBreakUp3), 10)
				+ parseInt(zeroOrMore(storeSTCG4 - tempstcgBreakUp4), 10)
				+ parseInt(zeroOrMore(storeLTCG1 - templtcgBreakUp1), 10)
				+ parseInt(zeroOrMore(storeLTCG2 - templtcgBreakUp2), 10)
				+ parseInt(zeroOrMore(storeLTCG3 - templtcgBreakUp3), 10)
				+ parseInt(zeroOrMore(storeLTCG4 - templtcgBreakUp4), 10)
				+ parseInt(zeroOrMore(storeLTCG5 - templtcgBreakUp5), 10)
				+ parseInt(zeroOrMore(storeLTCG6 - templtcgBreakUp6), 10)
				+ parseInt(zeroOrMore(storeLTCG7 - templtcgBreakUp7), 10)
				+ parseInt(zeroOrMore(storeLTCG8 - templtcgBreakUp8), 10);

		// calculating the income after setOff

		document
				.getElementsByName('scheduleBFLA.hp.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document
				.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document
				.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document
				.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document
				.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document
				.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document
				.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff');
		document
				.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA');
		document
				.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')
				- coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		// Total of brought forward loss set off
		document
				.getElementsByName('scheduleBFLA.totalBFLossSetOff.totBFLossSetoff')[0].value = coalescePath('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff')
				+ coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff')
				+ coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')
				+ coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')
				+ coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.bFlossPrevYrUndSameHeadSetoff')
				+ coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')
				+ coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.bFlossPrevYrUndSameHeadSetoff')
				+ coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff');

		// x :: sum of Current years income remaining after set off
		document.getElementsByName('scheduleBFLA.incomeOfCurrYrAftCYLABFLA')[0].value = coalescePath('scheduleBFLA.salary.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.hp.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses')
				+ coalescePath('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrAfterSetOffBFLosses');

		cgosIncome.cgInc.stcg.prctg30 = tempstcgBreakUp1;
		cgosIncome.cgInc.stcg.prctgAr = tempstcgBreakUp2;
		cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii = tempstcgBreakUp3;
		cgosIncome.cgInc.stcg.prctg15.sec111a = tempstcgBreakUp4;
		cgosIncome.cgInc.ltcg.prctg20.sec112 = templtcgBreakUp1;
		cgosIncome.cgInc.ltcg.prctg20.sec11EA = templtcgBreakUp2;
		cgosIncome.cgInc.ltcg.prctg10.secProviso = templtcgBreakUp3;
		cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2 = templtcgBreakUp4;
		cgosIncome.cgInc.ltcg.prctg10.sec115AC_1 = templtcgBreakUp5;
		cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1 = templtcgBreakUp6;
		cgosIncome.cgInc.ltcg.prctg10.sec115AD_3 = templtcgBreakUp7;
		cgosIncome.cgInc.ltcg.prctg10.sec115E_b = templtcgBreakUp8;

		calcCFL(cgosIncome);

	} catch (e) {
		alert('error in calcBFLA' + e.stack);
	}

}

// To calculate schedule CFL
function calcCFL(cgosIncome) {
	try {

		// adjustment of above losses in schedule BFLA
		document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.hpLossCF')[0].value = zeroOrMore(document
				.getElementsByName('scheduleBFLA.hp.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value);

		document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value = parseInt(
				zeroOrMore(document
						.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value),
				10);
		document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value = zeroOrMore(document
				.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.bFlossPrevYrUndSameHeadSetoff')[0].value);

		// scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.hpLossCF
		document
				.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF')[0].value = Math
				.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff'));
		document
				.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value = Math
				.abs(coalescePath('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff'));

		// setting values to 0 before populating - specu, specified, stcg , ltcg
		document
				.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0].value = parseInt(
				0, 10);
		document
				.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0].value = parseInt(
				0, 10);

		var totalSTCG = coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoff15Per')
				+ coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoff30Per')
				+ coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.stclSetoffAppRate');

		var totalLTCG = coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.ltclSetOff10Per')
				+ coalescePath('scheduleCGPost45.currYrLosses.lossRemainSetOff.ltclSetOff20Per');

		document
				.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF')[0].value = totalSTCG;

		document
				.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF')[0].value = totalLTCG;

		// os ----- Enter current year OS if any from 4c of Sch OS. ie. any
		// negative figure.
		document
				.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value = parseInt(
				0, 10);
		if (coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse') < 0) {
			document
					.getElementsByName('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value = Math
					.abs(coalescePath('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse'));
		}

		var firstHp = document
				.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.hpLossCF')[0].value;
		var firstBus = document
				.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')[0].value;
		var firstShortTerm = document
				.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.stcgLossCF')[0].value;
		var firstLongTerm = document
				.getElementsByName('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.ltcgLossCF')[0].value;
		var firstOth = document
				.getElementsByName('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')[0].value;

		var adjstHp = document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.hpLossCF')[0].value;
		var adjstBus = document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value;
		var adjstShortTerm = document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.stcgLossCF')[0].value;
		var adjstLongTerm = document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.ltcgLossCF')[0].value;
		var adjstOth = document
				.getElementsByName('scheduleCFL.adjTotBFLossInBFLA.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value;

		if (parseInt(firstHp, 10) > parseInt(adjstHp, 10)) {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.hpLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF')
					- firstHp
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF'));
		} else {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.hpLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF')
					- adjstHp
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF'));
		}

		if (parseInt(firstBus, 10) > parseInt(adjstBus, 10)) {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF')
					- firstBus
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF'));
		} else {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF')
					- adjstBus
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF'));
		}

		if (parseInt(firstShortTerm, 10) > parseInt(adjstShortTerm, 10)) {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.stcgLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF')
					- firstShortTerm
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF'));
		} else {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.stcgLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF')
					- adjstShortTerm
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF'));
		}

		if (parseInt(firstLongTerm, 10) > parseInt(adjstLongTerm, 10)) {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.ltcgLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF')
					- firstLongTerm
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF'));
		} else {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.ltcgLossCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF')
					- adjstLongTerm
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF'));
		}

		if (parseInt(firstOth, 10) > parseInt(adjstOth, 10)) {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF')
					- firstOth
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF'));

		} else {
			document
					.getElementsByName('scheduleCFL.totalLossCFSummary.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value = zeroOrMore(coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF')
					- adjstOth
					+ coalescePath('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF'));

		}

	} catch (e) {
		alert('error in calcCFL()= ' + e.stack);
	}
}

// To prefill schedule BFLA
function prefillBFLA() {
	try {

		document
				.getElementsByName('scheduleBFLA.salary.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff');// 4ii
		// of
		// CYLA
		// -->
		// 1i
		// of
		// BFLA
		document
				.getElementsByName('scheduleBFLA.salary.incBFLA.incOfCurYrAfterSetOffBFLosses')[0].value = coalescePath('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff');// 4ii
		// of
		// CYLA
		// -->
		// 1iii
		// of
		// BFLA
		document
				.getElementsByName('scheduleBFLA.hp.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff');// 4iii
		// of
		// CYLA
		// -->
		// 2i
		// of
		// BFLA
		document
				.getElementsByName('scheduleBFLA.busProfInclSpecProf.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff');
		document
				.getElementsByName('scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.stcg.stcg15Per.incCYLA.incOfCurYrAfterSetOff');// 4iv
		// of
		// CYLA
		// -->
		// 3i
		// of
		// BFLA
		document
				.getElementsByName('scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.stcg.stcg30Per.incCYLA.incOfCurYrAfterSetOff');// 4v
		// of
		// CYLA
		// -->
		// 4i
		// of
		// BFLA
		document
				.getElementsByName('scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.stcg.stcgAppRate.incCYLA.incOfCurYrAfterSetOff');// 4Vi
		// of
		// CYLA
		// -->
		// 5i
		// of
		// BFLA
		document
				.getElementsByName('scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.ltcg.ltcg10Per.incCYLA.incOfCurYrAfterSetOff');// 4Vii
		// of
		// CYLA
		// -->
		// 6i
		// of
		// BFLA
		document
				.getElementsByName('scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.ltcg.ltcg20Per.incCYLA.incOfCurYrAfterSetOff');// 4Viii
		// of
		// CYLA
		// -->
		// 7i
		// of
		// BFLA

		document
				.getElementsByName('scheduleBFLA.othSrcInclRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff');
		document
				.getElementsByName('scheduleBFLA.profitFrmRaceHorse.incBFLA.incOfCurYrUndHeadFromCYLA')[0].value = coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff');

	} catch (e) {
		alert('error in prefillBFLA' + e.stack);
	}
}

// To calculate schedule CFL sum
function calcCFL_sumAll() {
	try {
		// HP Loss :: total of earlier year losses
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF');
		document
				.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.hpLossCF')[0].value = coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.hpLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.hpLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.hpLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.hpLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.hpLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.hpLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.hpLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.hpLossCF');

		// Loss from business other than loss from speculative business and
		// specified business :: total of earlier year losses
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF');
		document
				.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.busLossOthThanSpecLossCF')[0].value = coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.busLossOthThanSpecLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.busLossOthThanSpecLossCF');

		// Short-term capital loss
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF');
		document
				.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.stcgLossCF')[0].value = coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.stcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.stcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.stcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.stcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.stcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.stcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.stcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.stcgLossCF');

		// Long-term Capital loss
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF');
		document
				.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.ltcgLossCF')[0].value = coalescePath('scheduleCFL.lossCFFromPrev8ThYearFromAY.carryFwdLossDetail.ltcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev7ThYearFromAY.carryFwdLossDetail.ltcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev6ThYearFromAY.carryFwdLossDetail.ltcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev5ThYearFromAY.carryFwdLossDetail.ltcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.ltcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.ltcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.ltcgLossCF')
				+ coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.ltcgLossCF');

		// Other sources loss (from owning race horses)
		coalescePath('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF');
		document
				.getElementsByName('scheduleCFL.totalOfBFLossesEarlierYrs.lossSummaryDetail.othSrcLossRaceHorseCF')[0].value = coalescePath('scheduleCFL.lossCFFromPrev4ThYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev3RdYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')
				+ coalescePath('scheduleCFL.lossCFFromPrev2NdYearFromAY.carryFwdLossDetail.othSrcLossRaceHorseCF')
				+ coalescePath('scheduleCFL.lossCFFromPrevYrToAY.carryFwdLossDetail.othSrcLossRaceHorseCF');

	} catch (e) {
		alert('error in calcCFL_sumALL=' + e.stack);
	}
}

// To check the field has been changed or not.
function checkIfChanged(pathToCheck) {
	if ((document.getElementsByName(pathToCheck)[0].fieldChanged == undefined)
			|| (document.getElementsByName(pathToCheck)[0].fieldChanged != undefined && document
					.getElementsByName(pathToCheck)[0].fieldChanged == 'false')) {
		return false;
	} else {
		return true;
	}
}

// To check First value is less than minimum of the other two or not
function checkFirstLessThanMinOthTwo(path1, path2, path3, verticalCeiling) {
	if (coalesceSetRet(path2) <= verticalCeiling) {
		if (coalesceSetRet(path1) > coalesceSetRet(path2)) {
			addErrorXHTML(document.getElementsByName(path1)[0],
					'This value cannot be greater than '
							+ coalesceSetRet(path2), true);
			document.getElementsByName(path1)[0].value = coalesceSetRet(path2);
		}
	} else if (verticalCeiling < coalesceSetRet(path2)) {
		if (coalesceSetRet(path1) > verticalCeiling) {
			addErrorXHTML(document.getElementsByName(path1)[0],
					'This value cannot be greater than ' + verticalCeiling,
					true);
			document.getElementsByName(path1)[0].value = verticalCeiling;
		}
	}
}

// To check schedule HP editable value Validity
function checkHPeditableValidity(path1, path2, path4, path3, verticalCeilingHP) {
	var tempVal = coalesceSetRet(path2) - coalesceSetRet(path4);
	if (tempVal <= verticalCeilingHP) {
		if (coalesceSetRet(path1) > tempVal) {
			addErrorXHTML(document.getElementsByName(path1)[0],
					'This value cannot be greater than ' + tempVal, true);
			document.getElementsByName(path1)[0].value = tempVal;
		}
	} else if (verticalCeilingHP < tempVal) {
		if (coalesceSetRet(path1) > verticalCeilingHP) {
			addErrorXHTML(document.getElementsByName(path1)[0],
					'This value cannot be greater than ' + verticalCeilingHP,
					true);
			document.getElementsByName(path1)[0].value = verticalCeilingHP;
		}
	}

}

// To check schedule BP editable value Validity
function checkBPeditableValidity(path1, path2, path4, path5, path3,
		verticalCeilingBP) {

	var tempVal = coalesceSetRet(path2) - coalesceSetRet(path4)
			- coalesceSetRet(path5);

	if (tempVal <= verticalCeilingBP) {
		if (coalesceSetRet(path1) > tempVal) {
			addErrorXHTML(document.getElementsByName(path1)[0],
					'This value cannot be greater than ' + tempVal, true);
			document.getElementsByName(path1)[0].value = tempVal;
		}
	} else if (verticalCeilingBP < tempVal) {
		if (coalesceSetRet(path1) > verticalCeilingBP) {
			addErrorXHTML(document.getElementsByName(path1)[0],
					'This value cannot be greater than ' + verticalCeilingBP,
					true);
			document.getElementsByName(path1)[0].value = verticalCeilingBP;
		}
	}
}

// To clear schedule CYLA values
function clearCYLA() {

	if (document
			.getElementsByName('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.Salaries.incCYLA.hPlossCurYrSetoff')[0].fieldChanged = undefined;
	}

	if (document
			.getElementsByName('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.Salaries.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged = undefined;
	}

	if (document
			.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].fieldChanged = undefined;
	}

	if (document
			.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].fieldChanged = undefined;
	}

	if (document
			.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].fieldChanged = undefined;
	}
	if (document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].fieldChanged != undefined) {
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].fieldChanged = undefined;
	}
	if (document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].fieldChanged != undefined) {
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged != undefined) {
		document
				.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].fieldChanged = undefined;
	}

	if (document
			.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.hPlossCurYrSetoff')[0].oldvalue = undefined;
	}

	if (document
			.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.stcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.ltcg.incCYLA.hPlossCurYrSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.hPlossCurYrSetoff')[0].oldvalue = undefined;
	}

	if (document
			.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.houseProperty.incCYLA.busLossSetoff')[0].oldvalue = undefined;
	}
	if (document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].oldvalue != undefined) {
		document.getElementsByName('scheduleCYLA.stcg.incCYLA.busLossSetoff')[0].oldvalue = undefined;
	}
	if (document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].oldvalue != undefined) {
		document.getElementsByName('scheduleCYLA.ltcg.incCYLA.busLossSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.busLossSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.busLossSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.houseProperty.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.stcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue = undefined;
	}
	if (document
			.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue != undefined) {
		document
				.getElementsByName('scheduleCYLA.ltcg.incCYLA.othSrcLossNoRaceHorseSetoff')[0].oldvalue = undefined;
	}

	calcITR3();
}

// To calculate part B Ti and Tti schedules
function calculateTiTti(cgosIncome) {
	var varDate = document.getElementsByName('verification.date')[0];
	if (varDate.value == '' || varDate.value == undefined
			|| varDate.value == null) {
		var dt = new Date();
		varDate.value = ("00" + dt.getDate()).slice(-2) + '/'
				+ ("00" + (dt.getMonth() + 1)).slice(-2) + '/'
				+ dt.getFullYear();
	}

	calculatePartBTTI_first(cgosIncome);

}

// To calculate Part B TI first part
function calculatePartBTI_first() {
	try {

		surcharge201718();
		// 1
		var salaries = document.getElementsByName('partBTI.salaries')[0];
		salaries.value = coalesceSetRet('scheduleS.incomeChargeable');

		// 2
		var incomeFromHP = document.getElementsByName('partBTI.incomeFromHP')[0];
		incomeFromHP.value = zeroOrMore(coalesceSetRet('scheduleHP.totalIncomeChargeableUnHP'));
		// 3
		document.getElementsByName('partBTI.profBusGain.totProfBusGain')[0].value = coalesceSetRet('scheduleBPA.netIncFrmBus');

		if (document.getElementsByName('partBTI.profBusGain.totProfBusGain')[0].value < 0) {
			document.getElementsByName('partBTI.profBusGain.totProfBusGain')[0].value = 0;
		}

		// 4ai
		var shortTerm15Per = document
				.getElementsByName('partBTI.capGain.shortTerm.shortTerm15Per')[0];
		shortTerm15Per.value = coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg15Per.CurrYrLosSetOff');

		var shortTerm30Per = document
				.getElementsByName('partBTI.capGain.shortTerm.shortTerm30Per')[0];
		shortTerm30Per.value = coalesceSetRet('scheduleCGPost45.currYrLosses.inStcg30Per.currYrLosSetOff');

		var shortTermAppRate = document
				.getElementsByName('partBTI.capGain.shortTerm.shortTermAppRate')[0];
		shortTermAppRate.value = coalesceSetRet('scheduleCGPost45.currYrLosses.inStcgAppRate.currYrLosSetOff');

		var longTerm10Per = document
				.getElementsByName('partBTI.capGain.longTerm.longTerm10Per')[0];
		longTerm10Per.value = coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg10Per.currYrLosSetOff');

		var longTerm20Per = document
				.getElementsByName('partBTI.capGain.longTerm.longTerm20Per')[0];
		longTerm20Per.value = coalesceSetRet('scheduleCGPost45.currYrLosses.inLtcg20Per.CurrYrLosSetOff');

		// 4a
		// scheduleCGFor23.shortTermCapGainFor23.nriAssetSec48Dtl.nri111AApplicable
		var totalShortTerm = document
				.getElementsByName('partBTI.capGain.shortTerm.totalShortTerm')[0];
		totalShortTerm.value = eval(parseInt(shortTerm15Per.value, 10)
				+ parseInt(shortTerm30Per.value, 10)
				+ parseInt(shortTermAppRate.value, 10));
		// 43b

		var totalLongTerm = document
				.getElementsByName('partBTI.capGain.longTerm.totalLongTerm')[0];
		totalLongTerm.value = eval(parseInt(longTerm10Per.value, 10)
				+ parseInt(longTerm20Per.value, 10));

		// 4 Total
		document.getElementsByName('partBTI.capGain.totalCapGains')[0].value = eval(parseInt(
				coalesceSetRet('partBTI.capGain.shortTerm.totalShortTerm'), 10)
				+ parseInt(
						coalesceSetRet('partBTI.capGain.longTerm.totalLongTerm'),
						10));
		if (eval(document.getElementsByName('partBTI.capGain.totalCapGains')[0].value) < 0) {
			document.getElementsByName('partBTI.capGain.totalCapGains')[0].value = parseInt(
					0, 10);
		}

		// 5 OS
		var otherSrcThanOwnRaceHorse = document
				.getElementsByName('partBTI.incFromOS.otherSrcThanOwnRaceHorse')[0];
		otherSrcThanOwnRaceHorse.value = zeroOrMore(coalesceSetRet('scheduleOS.balanceNoRaceHorse'));

		var incChargeSplRate = document
				.getElementsByName('partBTI.incFromOS.incChargeSplRate')[0];
		incChargeSplRate.value = zeroOrMore(coalesceSetRet('scheduleOS.incChargblSplRateOS.totalOSGrossChargblSplRate'));

		var fromOwnRaceHorse = document
				.getElementsByName('partBTI.incFromOS.fromOwnRaceHorse')[0];
		fromOwnRaceHorse.value = zeroOrMore(coalesceSetRet('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse'));

		var totIncFromOS = document
				.getElementsByName('partBTI.incFromOS.totIncFromOS')[0];
		totIncFromOS.value = eval(parseInt(otherSrcThanOwnRaceHorse.value, 10)
				+ parseInt(incChargeSplRate.value, 10)
				+ parseInt(fromOwnRaceHorse.value, 10));

		// 6
		document.getElementsByName('partBTI.totalTI')[0].value = eval(parseInt(
				salaries.value, 10)
				+ parseInt(incomeFromHP.value, 10)
				+ parseInt(
						coalesceSetRet('partBTI.profBusGain.totProfBusGain'),
						10)
				+ parseInt(coalesceSetRet('partBTI.capGain.totalCapGains'), 10)
				+ parseInt(coalesceSetRet('partBTI.incFromOS.totIncFromOS'), 10));

		// 7
		document.getElementsByName('partBTI.currentYearLoss')[0].value = eval(parseInt(
				coalesceSetRet('scheduleCYLA.totalLossSetOff.totHPlossCurYrSetoff'),
				10)
				+ parseInt(
						coalesceSetRet('scheduleCYLA.totalLossSetOff.totBusLossSetoff'),
						10)
				+ parseInt(
						coalesceSetRet('scheduleCYLA.totalLossSetOff.totOthSrcLossNoRaceHorseSetoff'),
						10));

		// 8
		document.getElementsByName('partBTI.balanceAfterSetoffLosses')[0].value = zeroOrMore(eval(parseInt(
				coalesceSetRet('partBTI.totalTI'), 10)
				- parseInt(coalesceSetRet('partBTI.currentYearLoss'), 10)));

		// 9
		document.getElementsByName('partBTI.broughtFwdLossesSetoff')[0].value = zeroOrMore(eval(parseInt(
				coalesceSetRet('scheduleBFLA.totalBFLossSetOff.totBFLossSetoff'),
				10)

		));

		// 10
		document.getElementsByName('partBTI.grossTotalIncome')[0].value = zeroOrMore(eval(parseInt(
				coalesceSetRet('partBTI.balanceAfterSetoffLosses'), 10)
				- parseInt(coalesceSetRet('partBTI.broughtFwdLossesSetoff'), 10)));

		// 11
		document.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value = eval(parseInt(
				coalesceSetRet('scheduleSI.totSplRateInc'), 10));
	} catch (e) {
		alert(e);
	}
}

// To calculate Part B TI second part
function calculatePartBTI_second() {
	try {

		surcharge201718();
		// 11
		var grossIncome = document
				.getElementsByName('partBTI.grossTotalIncome')[0].value;
		var splRate111A112 = document
				.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value;
		var totalChapVIADeductions = document
				.getElementsByName('scheduleVIA.deductUndChapVIA.totalChapVIADeductions')[0].value;
		var deductionChapVIA = parseInt(grossIncome) - parseInt(splRate111A112);

		if (deductionChapVIA < totalChapVIADeductions) {
			document.getElementsByName('partBTI.deductionsUnderScheduleVIA')[0].value = deductionChapVIA;
		} else {

			document.getElementsByName('partBTI.deductionsUnderScheduleVIA')[0].value = zeroOrMore(eval(parseInt(
					coalesceSetRet('scheduleVIA.deductUndChapVIA.totalChapVIADeductions'),
					10)));
		}

		// 12
		var valToRoundOff = zeroOrMore(
				eval(parseInt(coalesceSetRet('partBTI.grossTotalIncome'), 10)
						- parseInt(
								coalesceSetRet('partBTI.deductionsUnderScheduleVIA'),
								10))).toString();
		document.getElementsByName('partBTI.totalIncome')[0].value = rndOffNrsTen(valToRoundOff);
		// calling SI before 14
		calcScheduleSI();

		// 13
		document.getElementsByName('partBTI.incomeChargeableTotTax')[0].value = parseInt(
				coalesceSetRet('scheduleSI.totSplRateTaxableInc'), 10);

		// 14
		var netAgricultureIncomeOrOtherIncomeForRate = document
				.getElementsByName('partBTI.netAgricultureIncomeOrOtherIncomeForRate')[0];
		var newVal15 = eval(parseInt(
				coalesceSetRet('scheduleEI.netAgriIncOrOthrIncRule7'), 10));

		if (parseInt(newVal15) <= 5000) {
			newVal15 = 0;
		}

		if (netAgricultureIncomeOrOtherIncomeForRate.old != newVal15) {
			netAgricultureIncomeOrOtherIncomeForRate.old = newVal15;
			netAgricultureIncomeOrOtherIncomeForRate.value = newVal15;
		}

		// 15
		var tempInc = zeroOrMore(eval(parseInt(
				coalesceSetRet('partBTI.totalIncome'), 10)
				- parseInt(coalesceSetRet('partBTI.incomeChargeableTotTax'), 10)));
		if (parseInt(tempInc, 10) > getExemption()) {
			document.getElementsByName('partBTI.aggregateIncome')[0].value = zeroOrMore(eval(parseInt(
					tempInc, 10)
					+ parseInt(
							coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'),
							10)));
		} else {
			document.getElementsByName('partBTI.aggregateIncome')[0].value = 0;
		}

		// 16
		document.getElementsByName('partBTI.lossesOfCurrentYearCarriedFwd')[0].value = eval(parseInt(
				coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.hpLossCF'),
				10)
				+ parseInt(
						coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.busLossOthThanSpecLossCF'),
						10)
				+ parseInt(
						coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.stcgLossCF'),
						10)
				+ parseInt(
						coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.ltcgLossCF'),
						10)
				+ parseInt(
						coalesceSetRet('scheduleCFL.currentAYloss.lossSummaryDetail.othSrcLossRaceHorseCF'),
						10));

	} catch (e) {
		alert(e.stack);
	}
}

// To calculate Part B TTI first part
function calculatePartBTTI_first(cgosIncome) {
	try {

				
		// 1
		calculateTaxPayableOnTotalIncFor1a('partBTI.aggregateIncome',
				'partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc');
		
		var falg115H = document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;
		if(coalesceSetRet('scheduleSI.totSplRateIncTax') > 0)
			{
			if(falg115H=="Y"){
        		var taxAtSpecialRates =document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0];
        		var totSplRateIncTax = document.getElementsByName('scheduleSI.totSplRateIncTax')[0].value;
        		
        		setEditableFieldValue(taxAtSpecialRates,totSplRateIncTax);
        		
        	}else{
        		document
    			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].value = eval(parseInt(
    			coalesceSetRet('scheduleSI.totSplRateIncTax'), 10));
        	}

			}else
				{
				setEditableFieldValue(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0],0);
				}
		
		if (coalesceSetRet('partBTI.aggregateIncome') > 0) {
			
				calculateTaxPayableOnTotalIncRebate('partBTI.netAgricultureIncomeOrOtherIncomeForRate','partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateOnAgriInc',true);
			
		} else {
			setEditableFieldValue(document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateOnAgriInc')[0],0);
		}
		var taxPayableOnTotInc = document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc')[0];
		taxPayableOnTotInc.value = eval(parseInt(
				coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc'),
				10)
				+ parseInt(
						coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates'),
						10)
				- parseInt(
						coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateOnAgriInc'),
						10));
		if (taxPayableOnTotInc.value < 0) {
			taxPayableOnTotInc.value = parseInt('0', 10);
		}
		var rebate87A = document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebate87A')[0];
		var taxPayable = coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayableOnTotInc');
		var resStatus = document
				.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
		var totalIncome = coalesceSetRet('partBTI.totalIncome');
		var dtaaInc = document
				.getElementsByName('scheduleSI.splCodeRateTax[1].splRateInc')[0].value;
		totalIncome = parseInt(totalIncome) + parseInt(coalesce(dtaaInc));
		var status = document
				.getElementsByName('partAGEN1.personalInfo.status')[0].value;
		if (status == 'I' && (resStatus == 'RES' || resStatus == 'NOR')
				&& totalIncome <= 500000) {
			rebate87A.value = Math.min(parseInt(taxPayable, 10), 5000);
		} else {
			rebate87A.value = parseInt('0', 10);
		}

		// 3
		var taxPayableOnRebate = document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayable')[0];


		taxPayableOnRebate.value = eval(parseInt(taxPayableOnTotInc.value, 10)
				- parseInt(rebate87A.value, 10));
		// 4

		calsurchargeOnAboveCrore(cgosIncome);

		surcharge201718();

		// 5
		var educationCess = document
				.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0];
		var eduCessTax = Math
				.round(eval(parseInt(taxPayableOnRebate.value)
						+ coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge')) * 0.03);

		if (educationCess.old != eduCessTax) {
			educationCess.old = eduCessTax;
			educationCess.value = eduCessTax;
		}

		// 6
		var grossTaxLiability = document
				.getElementsByName('partBTTI.computationOfTaxLiability.grossTaxLiability')[0];
		grossTaxLiability.value = eval(parseInt(taxPayableOnRebate.value)
				+ coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge')
				+ parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.educationCess')));

	} catch (e) {
		alert(e.stack);
	}
}

// To calculate surcharge On Above Crore
function calsurchargeOnAboveCrore(cgosIncome) {
	var taxPayable = document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayable')[0];
	var surchargeOnAboveCrore = document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge')[0];
	
	var surchargeonTI = document
	.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI')[0];
	
	var totInc = document.getElementsByName('partBTI.totalIncome')[0].value;
	totInc = coalesce(totInc);

	var surcharge = 0;
	var totalIncome = document.getElementsByName('partBTI.totalIncome')[0].value;
	var incChargeTaxSplRate111A112 = document
			.getElementsByName('partBTI.incChargeTaxSplRate111A112')[0].value;
	var taxAtSpecialRates = document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].value;

	var dtaaInc = parseInt(
			coalesce(document
					.getElementsByName('scheduleSI.splCodeRateTax[1].splRateInc')[0].value),
			10);
	var dtaaTax = parseInt(
			coalesce(document
					.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0].value),
			10);

	// for surcharge
	var taxOnTotInc = parseInt(calculateTaxPayable(totalIncome
			- incChargeTaxSplRate111A112))
			+ parseInt(taxAtSpecialRates);

	var normalInc = getSlabbedIncome(parseInt(totalIncome
			- incChargeTaxSplRate111A112));

	var toBeTaxed = 10000000 - coalesce(dtaaInc);

	var rowCount1 = countRowInTable('scheduleSI.splCodeRateTax', 'splRateInc');

	var percent5SIInc = 0;

	var percent10SIInc = 0;

	var percent15SIInc = 0;

	var percent20SIInc = 0;

	var percent25SIInc = 0;

	var percent30SIInc = 0;

	var percent60SIInc = 0;

	for (var i = 0; i < rowCount1; i++) {

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

		} else if (splRatePercent == 15) {

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

		}

		else if (splRatePercent == 60) {

			percent60SIInc = eval(parseInt(percent60SIInc, 10)
					+ parseInt(document
							.getElementsByName('scheduleSI.splCodeRateTax[' + i
									+ '].taxableInc')[0].value, 10));

		}
	}

	var cgTax = 0;

	var cgTaxed = 0;

	var exmptn10 = coalesceSetRet('scheduleSI.splCodeRateTax[4].splRateInc')
			- coalesceSetRet('scheduleSI.splCodeRateTax[4].taxableInc');

	var exmptn15 = coalesceSetRet('scheduleSI.splCodeRateTax[2].splRateInc')
			- coalesceSetRet('scheduleSI.splCodeRateTax[2].taxableInc');

	var exmptn20 = coalesceSetRet('scheduleSI.splCodeRateTax[3].splRateInc')
			- coalesceSetRet('scheduleSI.splCodeRateTax[3].taxableInc');

	var exemptionUsed = 0;

	if (parseInt(totalIncome - incChargeTaxSplRate111A112) > 0) {
		if (parseInt(totalIncome - incChargeTaxSplRate111A112) >= getExemption()) {
			exemptionUsed = getExemption();
		} else {
			exemptionUsed = parseInt(totalIncome - incChargeTaxSplRate111A112);
		}

	}

	toBeTaxed = zeroOrMore(parseInt(toBeTaxed - exemptionUsed - exmptn10
			- exmptn15 - exmptn20));

	if (parseInt(percent5SIInc, 10) < parseInt(toBeTaxed, 0)) {
		cgTax = (percent5SIInc) * 0.05;
		cgTaxed = percent5SIInc;
		toBeTaxed -= parseInt(percent5SIInc, 0);
	} else {
		cgTax = (toBeTaxed) * 0.05;
		cgTaxed = toBeTaxed;
		toBeTaxed = 0;
	}

	percent10SIInc = parseInt(percent10SIInc, 10)
			+ parseInt(normalInc["10"], 10);

	if (parseInt(percent10SIInc, 10) < parseInt(toBeTaxed, 0)) {
		cgTax = parseInt(cgTax, 10) + (percent10SIInc) * 0.1;
		cgTaxed = parseInt(cgTaxed) + percent10SIInc;
		toBeTaxed -= parseInt(percent10SIInc, 0);
	} else {
		cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.1;
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

	percent20SIInc = parseInt(percent20SIInc, 10)
			+ parseInt(normalInc["20"], 10);

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
	}

	else {
		cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.3;
		cgTaxed = parseInt(cgTaxed) + toBeTaxed;
		toBeTaxed = 0;
	}

	percent60SIInc = parseInt(percent60SIInc, 10);

	if (parseInt(percent60SIInc, 10) < parseInt(toBeTaxed, 0)) {
		cgTax = parseInt(cgTax, 10) + (percent60SIInc) * 0.6;
		cgTaxed = parseInt(cgTaxed) + percent60SIInc;
		toBeTaxed -= parseInt(percent60SIInc, 0);
	}

	else {
		cgTax = parseInt(cgTax, 10) + (toBeTaxed) * 0.6 * 1.25;
		cgTaxed = parseInt(cgTaxed) + toBeTaxed;
		toBeTaxed = 0;
	}
	
	var taxOnCutOffInc = parseInt(cgTax) + parseInt(dtaaTax);


	if (rndOffNrsTen(totInc) > 10000000) {

		var f_115BBE = eval(parseInt(
				coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayable'),
				10)
				- (parseInt(
						coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
						10) * 0.60));
		var tempSurcharge = eval((0.15 * parseInt(f_115BBE, 10))
				+ (parseInt(
						coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
						10) * 0.60 * 0.25));

		var extraInc = rndOffNrsTen(totInc) - 10000000;

		if ((taxOnTotInc + tempSurcharge) > (taxOnCutOffInc + extraInc)) {

			var totaltax1 = eval(parseInt(coalesce(tempSurcharge))
					+ parseInt(coalesce(taxOnTotInc)));

			var marginalRelief = zeroOrMore(taxOnTotInc + tempSurcharge
					- (taxOnCutOffInc + extraInc));

			surcharge = zeroOrMore(tempSurcharge - marginalRelief);
			surcharge = Math.round(surcharge);

		} else {
			surcharge = tempSurcharge;
			surcharge = Math.round(surcharge);
		}
	} else {
		surcharge = parseInt('0', 10);
	}
	setEditableFieldValue(surchargeOnAboveCrore, surcharge);
	
	var surchargeTI= zeroOrMore(eval(surcharge-(parseInt(
			coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
			10) * 0.60 * 0.25)));
	setEditableFieldValue(surchargeonTI, surchargeTI);

}

// To calculate Part B TTI second part
function calculatePartBTTI_second(cgosIncome) {
	try {

		// 4
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.section90')[0].value = eval(parseInt(
				coalesceSetRet('scheduleTR1.totalIncomeOutIndia'), 10));
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.section91')[0].value = eval(parseInt(
				coalesceSetRet('scheduleTR1.totalIncomeOutIndiaDTAA'), 10));
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxRelief.totTaxRelief')[0].value = eval(parseInt(
				coalesceSetRet('partBTTI.computationOfTaxLiability.taxRelief.section89'),
				10)
				+ parseInt(
						coalesceSetRet('partBTTI.computationOfTaxLiability.taxRelief.section90'),
						10)
				+ parseInt(
						coalesceSetRet('partBTTI.computationOfTaxLiability.taxRelief.section91'),
						10));
		// 5
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0].value = zeroOrMore(eval(parseInt(
				coalesceSetRet('partBTTI.computationOfTaxLiability.grossTaxLiability'),
				10)
				- parseInt(
						coalesceSetRet('partBTTI.computationOfTaxLiability.taxRelief.totTaxRelief'),
						10)));

		// 8
		calculateAdvancedTax();
		calculateTDS();

		// 6
		calcInterestPayable(cgosIncome);

		// 8
		document.getElementsByName('partBTTI.taxPaid.taxesPaid.totalTaxesPaid')[0].value = eval(parseInt(
				coalesceSetRet('partBTTI.taxPaid.taxesPaid.advanceTax'), 10)
				+ parseInt(
						coalesceSetRet('partBTTI.taxPaid.taxesPaid.selfAssessmentTax'),
						10)
				+ parseInt(coalesceSetRet('partBTTI.taxPaid.taxesPaid.tds'), 10)
				+ parseInt(coalesceSetRet('partBTTI.taxPaid.taxesPaid.tcs'), 10));

		// 9

		var rndOffVal = zeroOrMore(
				eval(parseInt(
						coalesceSetRet('partBTTI.computationOfTaxLiability.aggregateTaxInterestLiability'),
						10)
						- parseInt(
								coalesceSetRet('partBTTI.taxPaid.taxesPaid.totalTaxesPaid'),
								10))).toString();
		document.getElementsByName('partBTTI.taxPaid.balTaxPayable')[0].value = rndOffNrsTen(rndOffVal);

		// 10
		var rndVal = zeroOrMore(
				eval(parseInt(
						coalesceSetRet('partBTTI.taxPaid.taxesPaid.totalTaxesPaid'),
						10)
						- parseInt(
								coalesceSetRet('partBTTI.computationOfTaxLiability.aggregateTaxInterestLiability'),
								10))).toString();
		document.getElementsByName('partBTTI.refundsDue')[0].value = rndOffNrsTen(rndVal);

		if (document.getElementsByName('partBTTI.taxPaid.balTaxPayable')[0].value > 0) {
			document.getElementsByName('partAGEN1.filingStatus.taxStatus')[0].value = 'TP';
		} else if (document.getElementsByName('partBTTI.refundsDue')[0].value > 0) {
			document.getElementsByName('partAGEN1.filingStatus.taxStatus')[0].value = 'TR';
		} else {
			document.getElementsByName('partAGEN1.filingStatus.taxStatus')[0].value = 'NT';
		}
		
		showEpay();

	} catch (e) {
		alert(e.stack);
	}
}

// To calculate Tax Payable On Total Income
function calculateTaxPayableOnTotalInc(srcElementName, destElementName,
		forRebate) {

	var totalIncome = zeroOrMore(parseInt(coalesceSetRet(srcElementName), 10));
	var taxPayer = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	// IN-I,HUF-H
	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0]; // RES
	// ,
	// NRI

	var age = calcAge();

	var netTxblIncome = totalIncome;
	if (forRebate == true) {
		netTxblIncome = parseInt(totalIncome, 10)
				+ parseInt(getExemption(), 10);
	}

	var tax = 0;

	var incTax = document.getElementsByName(destElementName)[0];
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age > 59 && age < 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('300000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('300001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('300000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('20000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('120000', 10)));
		}

	} else if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age >= 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2')));

		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('100000', 10)));
		}

	} else if ((taxPayer.value == 'I') || taxPayer.value == 'H') {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('250000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('250001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('250000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('25000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('125000', 10)));
		}

	}

	if (forRebate) {
		setEditableFieldValue(incTax, tax);
	} else {
		incTax.value = tax;
	}
}

// To get the exemption based on the status
function getExemption() {
	var age = calcAgeCommon(document
			.getElementsByName('partAGEN1.personalInfo.dob')[0]);
	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0]; // RES
	// ,
	// NRI
	var taxPayer = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age > 59 && age < 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {
		return 300000;
	} else if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age >= 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {
		return 500000;
	} else if ((taxPayer.value == 'I') || taxPayer.value == 'H') {
		return 250000;
	} else {
		return 0;
	}
}

// To calculate Advanced Tax
function calculateAdvancedTax() {
	var advanceTax = parseInt('0', 10);
	var selfAssessmentTax = parseInt('0', 10);
	var tab3 = document.getElementById('scheduleIt');
	var allInputTags = tab3.getElementsByTagName('input');
	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("dateDep$")) {
			if (checkFirstDateBefore(FY_start_date, allInputTags[i].value)
					&& checkFirstDateBefore(allInputTags[i].value, FY_end_date)) {
				advanceTax = eval(parseInt(isNVL(advanceTax), 10)
						+ parseInt(isNVL(allInputTags[i + 2].value), 10));
			} else if (checkFirstDateBefore(AY_start_date,
					allInputTags[i].value)) {
				selfAssessmentTax = eval(parseInt(isNVL(selfAssessmentTax), 10)
						+ parseInt(isNVL(allInputTags[i + 2].value), 10));
			}
		}
	}
	document.getElementsByName('partBTTI.taxPaid.taxesPaid.advanceTax')[0].value = advanceTax;
	document.getElementsByName('partBTTI.taxPaid.taxesPaid.selfAssessmentTax')[0].value = selfAssessmentTax;
	return advanceTax;
}

// To calculate Advanced Tax 234A section
function calculateAdvancedTax234A(dueDate) {
	var advanceTax = parseInt('0', 10);
	var tab3 = document.getElementById('scheduleIt');
	var allInputTags = tab3.getElementsByTagName('input');
	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("dateDep$")) {
			if (checkFirstDateBefore(AY_start_date, allInputTags[i].value)
					&& checkFirstDateBefore(allInputTags[i].value, dueDate)) {
				advanceTax = eval(parseInt(isNVL(advanceTax), 10)
						+ parseInt(isNVL(allInputTags[i + 2].value), 10));
			}
		}
	}
	return advanceTax;
}

// To calculate TDS total values
function calculateTDS() {
	var TDS = parseInt('0', 10);
	var TDS1 = parseInt('0', 10);
	var tab2 = document.getElementById('scheduleTDS1');
	var allInputTags = tab2.getElementsByTagName('input');
	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("totalTDSSal$")) {
			if (parseInt(allInputTags[i].value, 10) > parseInt(
					allInputTags[i - 1].value, 10)) {
				addError(
						allInputTags[i],
						'Total Tax deducted cannot exceed Income chargeable under Salaries',
						true);
				j
						.setFieldError(allInputTags[i].name,
								'Total Tax deducted cannot exceed Income chargeable under Salaries');
				allInputTags[i].value = '0';
				TDS1 = eval(parseInt(TDS1, 10)
						+ parseInt(isNVL(allInputTags[i].value), 10));
			} else {
				TDS1 = eval(parseInt(TDS1, 10)
						+ parseInt(isNVL(allInputTags[i].value), 10));
			}
		}
	}
	var TDS2 = parseInt('0', 10);
	var tab2 = document.getElementById('scheduleTDS2');
	var allInputTags = tab2.getElementsByTagName('input');
	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("claimOwnHands$")) {
			if (eval(parseInt(coalesce(allInputTags[i].value), 10)
					+ parseInt(coalesce(allInputTags[i + 1].value), 10)) > eval(parseInt(
					coalesce(allInputTags[i - 1].value), 10)
					+ parseInt(coalesce(allInputTags[i - 2].value), 10))) {
				addError(
						allInputTags[i],
						'Amount claimed for this year cannot be more than total tax deducted',
						true);
				j
						.setFieldError(allInputTags[i].name,
								'Amount claimed for this year cannot be more than total tax deducted');
				// allInputTags[i].value = '0';
				TDS2 = eval(parseInt(TDS2, 10)
						+ parseInt(isNVL(allInputTags[i].value), 10));
			} else {
				TDS2 = eval(parseInt(TDS2, 10)
						+ parseInt(isNVL(allInputTags[i].value), 10));
			}
			allInputTags[i + 2].value = zeroOrMore(parseInt(coalesce(allInputTags[i - 2].value))
					+ parseInt(coalesce(allInputTags[i - 1].value))
					- parseInt(coalesce(allInputTags[i].value))
					- parseInt(coalesce(allInputTags[i + 1].value)));
		}
	}

	var TDS3 = parseInt('0', 10);
	var tab3 = document.getElementById('scheduleTDS3');
	var allInputTagsTDS3 = tab3.getElementsByTagName('input');
	for (var i = 0; i < allInputTagsTDS3.length; i++) {
		if (allInputTagsTDS3[i].name.match("claimOwnHands$")) {
			if (eval(parseInt(coalesce(allInputTagsTDS3[i].value), 10)
					+ parseInt(coalesce(allInputTagsTDS3[i + 1].value), 10)) > eval(parseInt(
					coalesce(allInputTagsTDS3[i - 1].value), 10)
					+ parseInt(coalesce(allInputTagsTDS3[i - 2].value), 10))) {
				addError(
						allInputTagsTDS3[i],
						'Amount claimed for this year cannot be more than total tax deducted',
						true);
				j
						.setFieldError(allInputTagsTDS3[i].name,
								'Amount claimed for this year cannot be more than total tax deducted');
				// allInputTagsTDS3[i].value = '0';
				TDS3 = eval(parseInt(TDS3, 10)
						+ parseInt(isNVL(allInputTagsTDS3[i].value), 10));
			} else {
				TDS3 = eval(parseInt(TDS3, 10)
						+ parseInt(isNVL(allInputTagsTDS3[i].value), 10));
			}
			allInputTagsTDS3[i + 2].value = zeroOrMore(parseInt(coalesce(allInputTagsTDS3[i - 2].value))
					+ parseInt(coalesce(allInputTagsTDS3[i - 1].value))
					- parseInt(coalesce(allInputTagsTDS3[i].value))
					- parseInt(coalesce(allInputTagsTDS3[i + 1].value)));
		}
	}

	TDS = eval(parseInt(TDS1, 10) + parseInt(TDS2, 10) + parseInt(TDS3, 10));
	document.getElementsByName('partBTTI.taxPaid.taxesPaid.tds')[0].value = parseInt(
			TDS, 10);
	document
			.getElementsByName('itr3.scheduleTDS1.tdSonOthThanSal.totalTDSonSalaries')[0].value = parseInt(
			TDS1, 10);
	document
			.getElementsByName('itr3.scheduleTDS2.tdSonOthThanSal.totalTDSonOthThanSals')[0].value = parseInt(
			TDS2, 10);
	document
			.getElementsByName('itr3.scheduleTDS3.tdSonOthThanSal.totalTDS3OnOthThanSal')[0].value = parseInt(
			TDS3, 10);

	return TDS;

}

// To calculate schedule TCS
function calculateTCS() {
	var TCS = parseInt('0', 10);
	var tcsTAB = document.getElementById('scheduleTCS');
	var portuVal = document
			.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value;
	var allInputTags = tcsTAB.getElementsByTagName('input');

	if (portuVal == 'N') {
		for (var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("amtTCSClaimedThisYear$")) {
				if (parseInt(allInputTags[i].value, 10) > parseInt(
						allInputTags[i - 1].value, 10)) {

					addError(allInputTags[i],
							'Amount claimed cannot exceed Total Tax collected',
							true);
					j.setFieldError(allInputTags[i].name,
							'Amount claimed cannot exceed Total Tax collected');
					// allInputTags[i].value = '0';
					TCS = eval(parseInt(TCS, 10)
							+ parseInt(isNVL(allInputTags[i].value), 10));
				} else {
					TCS = eval(parseInt(TCS, 10)
							+ parseInt(isNVL(allInputTags[i].value), 10));
				}
			}
		}
	} else {

		for (var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("amtTCSClaimedThisYear$")
					&& allInputTags[i + 1].name.match("amtClaimedBySpouse$")) {
				if (eval(parseInt(coalesce(allInputTags[i].value), 10)
						+ parseInt(coalesce(allInputTags[i + 1].value), 10)) > parseInt(
						allInputTags[i - 1].value, 10)) {
					addError(
							allInputTags[i],
							'Amount claimed in Col 5+Col 6 cannot exceed Total tax collected',
							true);
					j
							.setFieldError(allInputTags[i].name,
									'Amount claimed in Col 4+Col 5 cannot exceed Total tax collected');
					// allInputTags[i].value = parseInt('0',10);
					// allInputTags[i+1].value = parseInt('0',10);
					TCS = eval(parseInt(TCS, 10)
							+ parseInt(isNVL(allInputTags[i].value), 10));
				} else {
					TCS = eval(parseInt(TCS, 10)
							+ parseInt(isNVL(allInputTags[i].value), 10));
				}
			}
		}
	}
	document.getElementsByName('partBTTI.taxPaid.taxesPaid.tcs')[0].value = parseInt(
			TCS, 10);
	document.getElementsByName('itr3.scheduleTCS.totalTcSSalary')[0].value = parseInt(
			TCS, 10);
	return TCS;
}

// To calculate Interest Payable
function calcInterestPayable(cgosIncome) {

	try {

		var advanceTax = document
				.getElementsByName('partBTTI.taxPaid.taxesPaid.advanceTax')[0].value;
		var TDSToDisplay = document
				.getElementsByName('partBTTI.taxPaid.taxesPaid.tds')[0];
		TDSToDisplay.value = coalesce(TDSToDisplay.value);
		var TDS = TDSToDisplay.value;
		var TCS = document.getElementsByName('itr3.scheduleTCS.totalTcSSalary')[0].value;
		var balTaxPayable = document
				.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0];
		balTaxPayable.value = coalesce(balTaxPayable.value);

		var duedate = Int_234A_Due_date_234A;
		var advanceTax234A = parseInt('0', 10);

		var tabIf = document.getElementById('scheduleIF');
		var allInputTags = tabIf.getElementsByTagName('select');

		for (var i = 0; i < allInputTags.length; i++) {

			if (allInputTags[i].name.match("isLiableToAudit$")) {
				if (allInputTags[i].value == 'Y') {
					duedate = Int_234A_IF_Yes_dt;
					advanceTax234A = calculateAdvancedTax234A(Int_234A_IF_Yes_dt_SAT);
					break;
				} else {

					advanceTax234A = calculateAdvancedTax234A(Int_234A_IF_NO_dt);
				}
			}
		}

		var intrst234Aprinciple;
		if (parseInt(balTaxPayable.value, 10) - parseInt(advanceTax, 10)
				- parseInt(advanceTax234A, 10) - parseInt(TDS, 10)
				- parseInt(TCS, 10) < 0) {
			intrst234Aprinciple = parseInt('0', 10);
		} else {

			intrst234Aprinciple = parseInt(balTaxPayable.value, 10)
					- parseInt(advanceTax, 10) - parseInt(advanceTax234A, 10)
					- parseInt(TDS, 10) - parseInt(TCS, 10);

			// Rounding off to previous hundered
			if (parseInt(intrst234Aprinciple, 10) > 100) {
				intrst234Aprinciple = Math.floor(parseInt(intrst234Aprinciple,
						10) / 100)
						* parseInt('100', 10);
			}
		}
		var currentDate = document.getElementsByName('verification.date')[0].value;
		var filingType = document
				.getElementsByName('partAGEN1.filingStatus.returnFileSec')[0].value;

		if (checkFirstDateBefore(currentDate, getCurrentDate())) {
			currentDate = getCurrentDate();
		}
		var actualDate = currentDate;

		var originalFilingDate = document
				.getElementsByName('partAGEN1.filingStatus.origRetFiledDate')[0].value;
		if ((filingType == '17' || filingType == '19' || filingType == '18')
				&& originalFilingDate != undefined
				&& originalFilingDate != null && originalFilingDate != '') {
			currentDate = originalFilingDate;
		}

		var MonthsAfterDueDate = calcNoOfMonths(currentDate, duedate);

		var intrst234A = parseInt(intrst234Aprinciple, 10) * parseFloat('0.01')
				* parseInt(MonthsAfterDueDate);

		var intrst234B = parseInt('0', 10);
		var intrst234C = parseInt('0', 10);

		var age = calcAgeCommon(document
				.getElementsByName('partAGEN1.personalInfo.dob')[0]);
		var resStatus = document
				.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
		var taxPayer = document
				.getElementsByName('partAGEN1.personalInfo.status')[0].value;
		var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;

		var totBPInc = document
				.getElementsByName('scheduleBPA.total.aggreTotalIncome')[0].value;

		if (!((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
				&& taxPayer == 'I'
				&& (resStatus == 'RES' || resStatus == 'NOR')
				&& parseInt(age, 10) > parseInt(59, 0) && parseInt(totBPInc, 10) <= 0)) {
			var slab0 = parseInt('0', 10);
			var slab1 = parseInt('0', 10);
			var slab2 = parseInt('0', 10);
			var slab3 = parseInt('0', 10);
			var slab4 = parseInt('0', 10);

			
			var tab4 = document.getElementById('scheduleIt');
			var allInputTags = tab4.getElementsByTagName('input');
			for (var i = 0; i < allInputTags.length; i++) {
				if (allInputTags[i].name.match("dateDep$")) {
					if (checkFirstDateBefore(FY_start_date,
							allInputTags[i].value)
							&& checkFirstDateBefore(allInputTags[i].value,
									slab0_end_date)) {
						slab0 = eval(parseInt(slab0, 10)
								+ parseInt(isNVL(allInputTags[i + 2].value), 10));
					}
					if (checkFirstDateBefore(slab1_start_date,
							allInputTags[i].value)
							&& checkFirstDateBefore(allInputTags[i].value,
									slab1_end_date)) {
						slab1 = eval(parseInt(slab1, 10)
								+ parseInt(isNVL(allInputTags[i + 2].value), 10));
					}
					if (checkFirstDateBefore(slab2_start_date,
							allInputTags[i].value)
							&& checkFirstDateBefore(allInputTags[i].value,
									slab2_end_date)) {
						slab2 = eval(parseInt(slab2, 10)
								+ parseInt(isNVL(allInputTags[i + 2].value), 10));
					} else if (checkFirstDateBefore(slab3_start_date,
							allInputTags[i].value)
							&& checkFirstDateBefore(allInputTags[i].value,
									slab3_end_date)) {
						slab3 = eval(parseInt(slab3, 10)
								+ parseInt(isNVL(allInputTags[i + 2].value), 10));
					} else if (checkFirstDateBefore(slab4_start_date,
							allInputTags[i].value)
							&& checkFirstDateBefore(allInputTags[i].value,
									FY_end_date)) {
						slab4 = eval(parseInt(slab4, 10)
								+ parseInt(isNVL(allInputTags[i + 2].value), 10));
					}
				}
			}

			intrst234C = calculate234cIntrst(TDS, TCS, [ slab0, slab1, slab2,
					slab3, slab4 ], cgosIncome);

			// ===============Interest234B calculation=======================

			var intrst234Bprinciple;
			var intrst234Bi = parseInt('0', 10);
			var noOfMonthsTillSelfasst = parseInt('0', 10);
			if (parseInt(balTaxPayable.value, 10) - parseInt(TDS, 10)
					- parseInt(TCS, 10) >= parseInt('10000', 10)) {
				if (parseInt(advanceTax, 10) < ((parseInt(balTaxPayable.value,
						10)
						- parseInt(TDS, 10) - parseInt(TCS, 10)) * parseFloat('0.90'))) {

					intrst234Bprinciple = (parseInt(balTaxPayable.value, 10)
							- parseInt(advanceTax, 10) - parseInt(TDS, 10) - parseInt(
							TCS, 10));

					// Rounding off to previous hundered
					if (parseInt(intrst234Bprinciple, 10) > 100) {
						intrst234Bprinciple = Math.floor(parseInt(
								intrst234Bprinciple, 10) / 100)
								* parseInt('100', 10);
					}

					// ======== Interest 234B first part calc==========

					var selfAsspaidDates = new Array();
					var selfAsspaidAmts = new Array();
					var x = parseInt('0', 10);
					var tempDate = parseInt('0', 10);
					var tempAmt = parseInt('0', 10);

					currentDate = actualDate;
					// to get all self assesment tax values
					for (var p = 0; p < allInputTags.length; p++) {
						if (allInputTags[p].name.match("dateDep$")) {
							if (checkFirstDateBefore(AY_start_date,
									allInputTags[p].value)
									&& checkFirstDateBefore(
											allInputTags[p].value, currentDate)) {
								if (allInputTags[p + 2].value != 0) {
									selfAsspaidDates[x] = allInputTags[p].value;
									selfAsspaidAmts[x] = allInputTags[p + 2].value;
									x++;
								}
							}
						}
					}

					if (selfAsspaidDates.length > 1) {
						for (var q = 0; q < selfAsspaidDates.length - 1; q++) {
							for (var r = q + 1; r < selfAsspaidDates.length; r++) {
								if (checkFirstDateBefore(selfAsspaidDates[q],
										selfAsspaidDates[r])) {

								} else {
									tempDate = selfAsspaidDates[q];
									tempAmt = selfAsspaidAmts[q];

									selfAsspaidDates[q] = selfAsspaidDates[r];
									selfAsspaidAmts[q] = selfAsspaidAmts[r];

									selfAsspaidDates[r] = tempDate;
									selfAsspaidAmts[r] = tempAmt;
								}
							}
						}
						var arrLen = selfAsspaidDates.length;
						var lastMonth = 0;
						var lastIndex = -1;
						var lastYear =0;
						for (var q = 0; q < arrLen; q++) {
							if (parseInt(selfAsspaidDates[q].substr(3, 2), 10) == lastMonth && parseInt(selfAsspaidDates[q].substr(8,2), 10) == lastYear) {
								selfAsspaidAmts[lastIndex] = parseInt(
										selfAsspaidAmts[lastIndex], 10)
										+ parseInt(selfAsspaidAmts[q], 10);
							} else {
								lastMonth = parseInt(selfAsspaidDates[q]
										.substr(3, 2), 10);
								lastYear = parseInt(selfAsspaidDates[q].substr(8,2), 10);
								selfAsspaidAmts[++lastIndex] = selfAsspaidAmts[q];
								selfAsspaidDates[lastIndex] = selfAsspaidDates[q];
							}
						}
						selfAsspaidAmts.length = ++lastIndex;
						selfAsspaidDates.length = lastIndex;
					}

					if (selfAsspaidDates.length == 0) {
						noOfMonthsTillSelfasst = calcNoOfMonths(currentDate,
								AY_start_date);
					} else {
						noOfMonthsTillSelfasst = calcNoOfMonths(
								selfAsspaidDates[0], AY_start_date);
					}

					intrst234Bi = parseInt(intrst234Bprinciple, 10)
							* parseFloat('0.01')
							* parseInt(noOfMonthsTillSelfasst);

					// ======== Interest 234B second part calc==========
					var intrst234Bprinciple2 = parseInt('0', 10); // intrst234Bprinciple
					// if self
					// assesment
					// is paid
					var noOfMonthsTillSelfasst2;
					var intrst234Bii = parseInt('0', 10);
					var partialSelfAssPaid = parseInt('0', 10);
					var k = parseInt('0', 10);
					var interestFrom;
					var interestTill;

					if (selfAsspaidDates.length != 0) {

						for (var i = 0; i < selfAsspaidDates.length; i++) {
							partialSelfAssPaid = eval(parseInt(
									partialSelfAssPaid, 10)
									+ parseInt(selfAsspaidAmts[i], 10));

							intrst234Bprinciple2 = zeroOrMore(eval(parseInt(
									balTaxPayable.value, 10)
									- parseInt(advanceTax, 10)
									- parseInt(TDS, 10)
									- parseInt(TCS, 10)
									+ parseInt(intrst234A, 10)
									+ parseInt(intrst234C, 10)
									+ parseInt(intrst234Bi, 10)
									+ parseInt(intrst234Bii, 10)
									- parseInt(partialSelfAssPaid, 10)));

							// Rounding off to previous hundered
							if (parseInt(intrst234Bprinciple2, 10) > parseInt(
									'100', 10)) {
								intrst234Bprinciple2 = Math.floor(parseInt(
										intrst234Bprinciple2, 10) / 100)
										* parseInt('100', 10);
							}
							// calclulating remaining months to levy interest

							interestTill = currentDate;
							interestFrom = selfAsspaidDates[i];

							if (i != eval(selfAsspaidDates.length
									- parseInt('1', 10))) {

								for (k = i; k < eval(selfAsspaidDates.length
										- parseInt('1', 10)); k++) {
									if (selfAsspaidDates[k] != selfAsspaidDates[k + 1]) {
										interestTill = selfAsspaidDates[k + 1];
										interestFrom = selfAsspaidDates[k];
										k = selfAsspaidDates.length;
									}
								}
							}

							noOfMonthsTillSelfasst2 = calcNoOfMonths(
									interestTill, interestFrom)
									- parseInt('1', 10);
							if (parseInt(intrst234Bprinciple2, 10) < parseInt(
									intrst234Bprinciple, 10)) {
								intrst234Bprinciple = intrst234Bprinciple2;
								intrst234Bii = eval(parseInt(intrst234Bii, 10)
										+ (parseInt(intrst234Bprinciple2, 10)
												* parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst2)));
							} else {
								intrst234Bii = eval(parseInt(intrst234Bii, 10)
										+ (parseInt(intrst234Bprinciple, 10)
												* parseFloat('0.01') * parseInt(noOfMonthsTillSelfasst2)));
							}
						}
					}
					intrst234B = eval(parseInt(intrst234Bi, 10)
							+ parseInt(intrst234Bii, 10));
				}
			} else {
				intrst234B = parseInt('0', 10);
			}
		}

		intrst234A = parseInt(intrst234A, 10);
		intrst234B = parseInt(intrst234B, 10);
		intrst234C = parseInt(intrst234C, 10);

		var intrstPayUs234A = document
				.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234A')[0];
		if (intrstPayUs234A.old != intrst234A) {
			intrstPayUs234A.old = intrst234A;
			intrstPayUs234A.value = intrst234A;
		}

		var intrstPayUs234B = document
				.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234B')[0];
		if (intrstPayUs234B.old != intrst234B) {
			intrstPayUs234B.old = intrst234B;
			intrstPayUs234B.value = intrst234B;
		}

		var intrstPayUs234C = document
				.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.intrstPayUs234C')[0];
		if (intrstPayUs234C.old != intrst234C) {
			intrstPayUs234C.old = intrst234C;
			intrstPayUs234C.value = intrst234C;
		}

		var intrstPayable = document
				.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.totalIntrstPay')[0];
		intrstPayable.value = coalesce(intrstPayable.value);
		intrstPayable.value = Math.round(eval(parseInt(intrstPayUs234A.value,
				10)
				+ parseInt(intrstPayUs234B.value, 10)
				+ parseInt(intrstPayUs234C.value, 10)));

		var balTaxPay = document
				.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0];
		balTaxPay.value = coalesce(balTaxPay.value);
		var totIntrstPay = document
				.getElementsByName('partBTTI.computationOfTaxLiability.intrstPay.totalIntrstPay')[0];
		totIntrstPay.value = coalesce(totIntrstPay.value);
		var totTaxIntrstPay = document
				.getElementsByName('partBTTI.computationOfTaxLiability.aggregateTaxInterestLiability')[0];
		totTaxIntrstPay.value = coalesce(totTaxIntrstPay.value);

		totTaxIntrstPay.value = eval(balTaxPay.value)
				+ eval(totIntrstPay.value);

	} catch (e) {
		alert('Exception in calcInterestPayable() = ' + e.stack);
	}
}

// To check Marginal Relief Applicable or not
function isMarginalRelfApplcbl() {
	var surcharge = document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge')[0];
	var taxPybl = document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxPayable')[0];
	if (parseInt(surcharge.value) > 0) {
		if (parseInt(surcharge.value * 0.12) != taxPybl.value) {
			return true;
		}
	}
	return false;
}

// To calculate 234c Interest
function calculate234cIntrst(TDS, TCS, slabs, cgosIncome) {
	try {

		var slab0 = parseInt(slabs[0], 10);
		var slab1 = parseInt(slabs[1], 10);
		var slab2 = parseInt(slabs[2], 10);
		var slab3 = parseInt(slabs[3], 10);
		var slab4 = parseInt(slabs[4], 10);

		var rebateOnAgriInc = parseInt(
				coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateOnAgriInc'),
				10);
		var totalCG = parseInt(zeroOrMore(parseInt(
				cgosIncome.cgInc.stcg.prctg30, 10)))
				+ parseInt(zeroOrMore(parseInt(cgosIncome.cgInc.stcg.prctgAr,
						10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.stcg.prctg15.sec111a, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.stcg.prctg15.sec115ad_1_b_ii, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg20.sec112, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg20.sec11EA, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg10.secProviso, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg10.sec115AC_1, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg10.sec115ACA_1, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg10.sec115AD_3, 10)))
				+ parseInt(zeroOrMore(parseInt(
						cgosIncome.cgInc.ltcg.prctg10.sec115E_b, 10)));
		var normalBalIncome = eval(parseInt(coalesceSetRet('partBTI.grossTotalIncome'))
				- totalCG
				- parseInt(coalesceSetRet('partBTI.incFromOS.incChargeSplRate'))
				- parseInt(coalesceSetRet('partBTI.deductionsUnderScheduleVIA')));
		if (parseInt(rebateOnAgriInc, 10) > parseInt('0', 10)) {
			normalBalIncome = eval(parseInt(normalBalIncome, 10)
					+ parseInt(
							coalesceSetRet('partBTI.netAgricultureIncomeOrOtherIncomeForRate'),
							10));
		}

		var dtaa = parseInt(
				coalesce(document
						.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0].value),
				10);

		var siexmption = getLTCG20ExmpFrmSI();
		var exemption10Pct = eval(siexmption["10"]);
		var exemption15Pct = eval(parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[2].splRateInc'))
				- parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[2].taxableInc')));
		var exemption20Pct = eval(siexmption["20"]);
		var exemption30Pct = eval(parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[6].splRateInc'))
				- parseInt(coalesceSetRet('scheduleSI.splCodeRateTax[6].taxableInc')));
		var exemptionOth111A = parseInt(getExemption())
				- eval(parseInt(exemption10Pct) + parseInt(exemption15Pct)
						+ parseInt(exemption20Pct) + parseInt(exemption30Pct));
		// Calculate tax on CG
		var appRateSurcharge = 1;

		var totalIncome = coalesceSetRet('partBTI.totalIncome');

		var marginal = isMarginalRelfApplcbl();

		var intrstRates = [ 0.1, 0.2, 0.15, 0.3 ];

		var totalUpto15Of6 = 0;
		var totalUpto15Of9 = 0;
		var totalUp16Of9To15Of12 = 0;
		var totalUp16Of12To15Of3 = 0;
		var totalUp16Of3To31Of3 = 0;

		var balTaxPayable = document
				.getElementsByName('partBTTI.computationOfTaxLiability.netTaxLiability')[0];
		var netTaxLiability = balTaxPayable.value;
		var siTax = parseInt(coalesceSetRet('scheduleSI.totSplRateIncTax'))
				- calculatePureSITax();

		// App Rate
		if (parseInt(normalBalIncome) > parseInt(exemptionOth111A)) {
			normalBalIncome = parseInt(normalBalIncome)
					- parseInt(exemptionOth111A);
			exemptionOth111A = 0;
		} else if (parseInt(normalBalIncome, 0) > 0) {
			exemptionOth111A = parseInt(exemptionOth111A)
					- parseInt(normalBalIncome);
			normalBalIncome = 0;
		}

		var taxOnstcgOthers0 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of6'),
				10)
				+ parseInt(normalBalIncome));
		var taxOnstcgOthers1 = eval(parseInt(taxOnstcgOthers0)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of9'),
						10));
		var taxOnstcgOthers2 = eval(parseInt(taxOnstcgOthers1)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of9To15Of12'),
						10));
		var taxOnstcgOthers3 = eval(parseInt(taxOnstcgOthers2)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of12To15Of3'),
						10));
		var taxOnstcgOthers4 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of3To31Of3'),
				10)
				+ parseInt(taxOnstcgOthers3, 10));

		// 30%
		if (parseInt(normalBalIncome) > parseInt(exemption30Pct)) {
			normalBalIncome = parseInt(normalBalIncome)
					- parseInt(exemption30Pct);
			exemption30Pct = 0;
		} else if (parseInt(normalBalIncome, 0) > 0) {
			exemption30Pct = parseInt(exemption30Pct)
					- parseInt(normalBalIncome);
			normalBalIncome = 0;
		}

		var shortTermUnder30Per0 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of6'),
				10));
		var shortTermUnder30Per1 = eval(parseInt(shortTermUnder30Per0)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of9'),
						10));
		var shortTermUnder30Per2 = eval(parseInt(shortTermUnder30Per1)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of9To15Of12'),
						10));
		var shortTermUnder30Per3 = eval(parseInt(shortTermUnder30Per2)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of12To15Of3'),
						10));
		var shortTermUnder30Per4 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of3To31Of3'),
				10));

		// 20%
		if (parseInt(normalBalIncome) > parseInt(exemption20Pct)) {
			normalBalIncome = parseInt(normalBalIncome)
					- parseInt(exemption20Pct);
			exemption20Pct = 0;
		} else if (parseInt(normalBalIncome, 0) > 0) {
			exemption20Pct = parseInt(exemption20Pct)
					- parseInt(normalBalIncome);
			normalBalIncome = 0;
		}

		var taxOnltcgNonProviso0 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of6'),
				10));
		var taxOnltcgNonProviso1 = eval(parseInt(taxOnltcgNonProviso0)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of9'),
						10));
		var taxOnltcgNonProviso2 = eval(parseInt(taxOnltcgNonProviso1)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of9To15Of12'),
						10));
		var taxOnltcgNonProviso3 = eval(parseInt(taxOnltcgNonProviso2)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of12To15Of3'),
						10));
		var taxOnltcgNonProviso4 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of3To31Of3'),
				10));

		// 15%
		if (parseInt(normalBalIncome) > parseInt(exemption15Pct)) {
			normalBalIncome = parseInt(normalBalIncome)
					- parseInt(exemption15Pct);
			exemption15Pct = 0;
		} else if (parseInt(normalBalIncome, 0) > 0) {
			exemption15Pct = parseInt(exemption15Pct)
					- parseInt(normalBalIncome);
			normalBalIncome = 0;
		}

		var taxOnstcg111A0 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of6'),
				10));
		var taxOnstcg111A1 = eval(parseInt(taxOnstcg111A0)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of9'),
						10));
		var taxOnstcg111A2 = eval(parseInt(taxOnstcg111A1)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of9To15Of12'),
						10));
		var taxOnstcg111A3 = eval(parseInt(taxOnstcg111A2)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of12To15Of3'),
						10));
		var taxOnstcg111A4 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of3To31Of3'),
				10));

		if (parseInt(normalBalIncome) > parseInt(exemption10Pct)) {
			normalBalIncome = parseInt(normalBalIncome)
					- parseInt(exemption10Pct);
			exemption10Pct = 0;
		} else if (parseInt(normalBalIncome, 0) > 0) {
			exemption10Pct = parseInt(exemption10Pct)
					- parseInt(normalBalIncome);
			normalBalIncome = 0;

		}

		// 10%

		var taxOnltcgProviso0 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of6'),
				10));
		var taxOnltcgProviso1 = eval(parseInt(taxOnltcgProviso0)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of9'),
						10));
		var taxOnltcgProviso2 = eval(parseInt(taxOnltcgProviso1)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of9To15Of12'),
						10));
		var taxOnltcgProviso3 = eval(parseInt(taxOnltcgProviso2)
				+ parseInt(
						coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of12To15Of3'),
						10));
		var taxOnltcgProviso4 = eval(parseInt(
				coalesceSetRet('scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of3To31Of3'),
				10));

		var temp = applyExemption2017([ taxOnltcgProviso0, taxOnltcgProviso1,
				taxOnltcgProviso2, taxOnltcgProviso3, taxOnltcgProviso4 ],
				exemption10Pct);
		taxOnltcgProviso0 = temp[0], taxOnltcgProviso1 = temp[1],
				taxOnltcgProviso2 = temp[2], taxOnltcgProviso3 = temp[3],
				taxOnltcgProviso4 = temp[4];
		taxOnltcgProviso0 *= intrstRates[0];
		taxOnltcgProviso1 *= intrstRates[0],
				taxOnltcgProviso2 *= intrstRates[0],
				taxOnltcgProviso3 *= intrstRates[0],
				taxOnltcgProviso4 *= intrstRates[0],

				console.log('taxOnltcgProviso0 : ' + taxOnltcgProviso0);
		console.log('taxOnltcgProviso1 : ' + taxOnltcgProviso1);
		console.log('taxOnltcgProviso2 : ' + taxOnltcgProviso2);
		console.log('taxOnltcgProviso3 : ' + taxOnltcgProviso3);
		console.log('taxOnltcgProviso4 : ' + taxOnltcgProviso4);

		temp = applyExemption2017([ shortTermUnder30Per0, shortTermUnder30Per1,
				shortTermUnder30Per2, shortTermUnder30Per3,
				shortTermUnder30Per4 ], exemption30Pct);
		shortTermUnder30Per0 = temp[0], shortTermUnder30Per1 = temp[1],
				shortTermUnder30Per2 = temp[2], shortTermUnder30Per3 = temp[3],
				shortTermUnder30Per4 = temp[4];
		shortTermUnder30Per0 *= intrstRates[3];
		shortTermUnder30Per1 *= intrstRates[3],
				shortTermUnder30Per2 *= intrstRates[3],
				shortTermUnder30Per3 *= intrstRates[3],
				shortTermUnder30Per4 *= intrstRates[3],

				console.log('shortTermUnder30Per0 : ' + shortTermUnder30Per0);
		console.log('shortTermUnder30Per1 : ' + shortTermUnder30Per1);
		console.log('shortTermUnder30Per2 : ' + shortTermUnder30Per2);
		console.log('shortTermUnder30Per3 : ' + shortTermUnder30Per3);
		console.log('shortTermUnder30Per4 : ' + shortTermUnder30Per4);

		temp = applyExemption2017([ taxOnltcgNonProviso0, taxOnltcgNonProviso1,
				taxOnltcgNonProviso2, taxOnltcgNonProviso3,
				taxOnltcgNonProviso4 ], exemption20Pct);
		taxOnltcgNonProviso0 = temp[0], taxOnltcgNonProviso1 = temp[1],
				taxOnltcgNonProviso2 = temp[2], taxOnltcgNonProviso3 = temp[3],
				taxOnltcgNonProviso4 = temp[4];
		taxOnltcgNonProviso0 *= intrstRates[1];
		taxOnltcgNonProviso1 *= intrstRates[1],
				taxOnltcgNonProviso2 *= intrstRates[1],
				taxOnltcgNonProviso3 *= intrstRates[1],
				taxOnltcgNonProviso4 *= intrstRates[1],

				console.log('taxOnltcgNonProviso0 : ' + taxOnltcgNonProviso0);
		console.log('taxOnltcgNonProviso1 : ' + taxOnltcgNonProviso1);
		console.log('taxOnltcgNonProviso2 : ' + taxOnltcgNonProviso2);
		console.log('taxOnltcgNonProviso3 : ' + taxOnltcgNonProviso3);
		console.log('taxOnltcgNonProviso4 : ' + taxOnltcgNonProviso4);

		temp = applyExemption2017([ taxOnstcg111A0, taxOnstcg111A1,
				taxOnstcg111A2, taxOnstcg111A3, taxOnstcg111A4 ],
				exemption15Pct);
		taxOnstcg111A0 = temp[0], taxOnstcg111A1 = temp[1],
				taxOnstcg111A2 = temp[2], taxOnstcg111A3 = temp[3],
				taxOnstcg111A4 = temp[4];
		taxOnstcg111A0 *= intrstRates[2];
		taxOnstcg111A1 *= intrstRates[2], taxOnstcg111A2 *= intrstRates[2],
				taxOnstcg111A3 *= intrstRates[2],
				taxOnstcg111A4 *= intrstRates[2],

				console.log('taxOnstcg111A0 : ' + taxOnstcg111A0);
		console.log('taxOnstcg111A1 : ' + taxOnstcg111A1);
		console.log('taxOnstcg111A2 : ' + taxOnstcg111A2);
		console.log('taxOnstcg111A3 : ' + taxOnstcg111A3);
		console.log('taxOnstcg111A4 : ' + taxOnstcg111A4);

		temp = applyExemption2017([ taxOnstcgOthers0, taxOnstcgOthers1,
				taxOnstcgOthers2, taxOnstcgOthers3, taxOnstcgOthers4 ],
				exemptionOth111A, true);
		taxOnstcgOthers0 = temp[0], taxOnstcgOthers1 = temp[1],
				taxOnstcgOthers2 = temp[2], taxOnstcgOthers3 = temp[3],
				taxOnstcgOthers4 = temp[4];

		taxOnstcgOthers0 = zeroOrMore(calculateSlabbedTax(taxOnstcgOthers0));
		taxOnstcgOthers1 = zeroOrMore(calculateSlabbedTax(taxOnstcgOthers1));
		taxOnstcgOthers2 = zeroOrMore(calculateSlabbedTax(taxOnstcgOthers2));
		taxOnstcgOthers3 = calculateSlabbedTax(taxOnstcgOthers3);
		taxOnstcgOthers4 = zeroOrMore(calculateSlabbedTax(taxOnstcgOthers4)
				- parseInt(taxOnstcgOthers3));
		taxOnstcgOthers3 = zeroOrMore(taxOnstcgOthers3);

		var remove115BBE = eval(parseInt(
				coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
				10) * 0.60);

		totalUpto15Of6 = eval(parseInt(taxOnltcgProviso0, 10)
				+ parseInt(taxOnltcgNonProviso0, 10)
				+ parseInt(taxOnstcg111A0, 10) + parseInt(taxOnstcgOthers0, 10)
				+ parseInt(shortTermUnder30Per0, 10) + parseInt(siTax, 10));

		totalUpto15Of9 = eval(parseInt(taxOnltcgProviso1, 10)
				+ parseInt(taxOnltcgNonProviso1, 10)
				+ parseInt(taxOnstcg111A1, 10) + parseInt(taxOnstcgOthers1, 10)
				+ parseInt(shortTermUnder30Per1, 10) + parseInt(siTax, 10));

		totalUp16Of9To15Of12 = eval(parseInt(taxOnltcgProviso2, 10)
				+ parseInt(taxOnltcgNonProviso2, 10)
				+ parseInt(taxOnstcg111A2, 10) + parseInt(taxOnstcgOthers2, 10)
				+ parseInt(shortTermUnder30Per2, 10) + parseInt(siTax, 10));

		totalUp16Of12To15Of3 = eval(parseInt(taxOnltcgProviso3, 10)
				+ parseInt(taxOnltcgNonProviso3, 10)
				+ parseInt(taxOnstcg111A3, 10) + parseInt(taxOnstcgOthers3, 10)
				+ parseInt(shortTermUnder30Per3, 10) + parseInt(siTax, 10));

		totalUp16Of3To31Of3 = eval(parseInt(taxOnltcgProviso4, 10)
				+ parseInt(taxOnltcgNonProviso4, 10)
				+ parseInt(taxOnstcg111A4, 10) + parseInt(taxOnstcgOthers4, 10)
				+ parseInt(shortTermUnder30Per4, 10));

		console.log('taxOnltcgProviso4 =>' + taxOnltcgProviso4);
		console.log('taxOnltcgNonProviso4 =>' + taxOnltcgNonProviso4);
		console.log('taxOnstcg111A4 =>' + taxOnstcg111A4);
		console.log('taxOnstcgOthers4 =>' + taxOnstcgOthers4);
		console.log('shortTermUnder30Per4 =>' + shortTermUnder30Per4);

		var rebate87A = eval(parseInt(
				coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebate87A'),
				10));
		// for checking rebate

		var oldTotalUpto15Of6 = totalUpto15Of6;
		var oldTotalUpto15Of9 = totalUpto15Of9;
		var oldTotalUp16Of9To15Of12 = totalUp16Of9To15Of12;
		var oldTotalUp16Of12To15Of3 = totalUp16Of12To15Of3;
		var avaTdsTcs = 0;

		totalUpto15Of6 = zeroOrMore(eval(parseInt(totalUpto15Of6)
				- parseInt(rebate87A)));
		totalUpto15Of9 = zeroOrMore(eval(parseInt(totalUpto15Of9)
				- parseInt(rebate87A)));
		totalUp16Of9To15Of12 = zeroOrMore(eval(parseInt(totalUp16Of9To15Of12)
				- parseInt(rebate87A)));
		totalUp16Of12To15Of3 = zeroOrMore(eval(parseInt(totalUp16Of12To15Of3)
				- parseInt(rebate87A)));

		var avaRebate = parseInt(rebate87A)
				- Math.min(parseInt(rebate87A),
						parseInt(oldTotalUp16Of12To15Of3));

		totalUp16Of3To31Of3 = zeroOrMore(eval(parseInt(totalUp16Of3To31Of3)
				- parseInt(avaRebate)));

		// for checking agri_rebate

		var old1TotalUpto15Of6 = totalUpto15Of6;
		var old1TotalUpto15Of9 = totalUpto15Of9;
		var old1TotalUp16Of9To15Of12 = totalUp16Of9To15Of12;
		var old1TotalUp16Of12To15Of3 = totalUp16Of12To15Of3;
		var avaTdsTcs1 = 0;

		totalUpto15Of6 = zeroOrMore(eval(parseInt(totalUpto15Of6)
				- parseInt(rebateOnAgriInc)));
		totalUpto15Of9 = zeroOrMore(eval(parseInt(totalUpto15Of9)
				- parseInt(rebateOnAgriInc)));
		totalUp16Of9To15Of12 = zeroOrMore(eval(parseInt(totalUp16Of9To15Of12)
				- parseInt(rebateOnAgriInc)));
		totalUp16Of12To15Of3 = zeroOrMore(eval(parseInt(totalUp16Of12To15Of3)
				- parseInt(rebateOnAgriInc)));

		var ava_agri_Rebate = parseInt(rebateOnAgriInc)
				- Math.min(parseInt(rebateOnAgriInc),
						parseInt(old1TotalUp16Of12To15Of3));

		totalUp16Of3To31Of3 = zeroOrMore(eval(parseInt(totalUp16Of3To31Of3)
				- parseInt(ava_agri_Rebate)));

		var total = parseInt(totalUp16Of12To15Of3)
				+ parseInt(totalUp16Of3To31Of3) - parseInt(remove115BBE);
		var surcharge = document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI')[0].value;

		totalUpto15Of6Act = zeroOrMore(eval(parseInt(totalUpto15Of6)
				- parseInt(remove115BBE)));
		totalUpto15Of9Act = zeroOrMore(eval(parseInt(totalUpto15Of9)
				- parseInt(remove115BBE)));
		totalUp16Of9To15Of12Act = zeroOrMore(eval(parseInt(totalUp16Of9To15Of12)
				- parseInt(remove115BBE)));
		totalUp16Of12To15Of3Act = zeroOrMore(eval(parseInt(totalUp16Of12To15Of3)
				- parseInt(remove115BBE)));

		var actualTax = [ (totalUpto15Of6Act),
				(totalUpto15Of9Act - totalUpto15Of6Act),
				(totalUp16Of9To15Of12Act - totalUpto15Of9Act),
				(totalUp16Of12To15Of3Act - totalUp16Of9To15Of12Act),
				(totalUp16Of3To31Of3) ];

		var surcharge115BBE = document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonSI')[0].value;

		totalUpto15Of6 = parseInt((parseInt(totalUpto15Of6) + (parseInt(surcharge115BBE) + parseInt(surcharge)
				* coalesce(actualTax[0] / total))) * 1.03);

		totalUpto15Of9 = parseInt(totalUpto15Of6)
				+ coalesce(parseInt(actualTax[1]) + parseInt(surcharge) * coalesce(actualTax[1]
						/ total)) * 1.03;
		totalUp16Of9To15Of12 = parseInt(totalUpto15Of9)
				+ coalesce(parseInt(actualTax[2]) + parseInt(surcharge) * coalesce(actualTax[2]
						/ total)) * 1.03;
		totalUp16Of12To15Of3 = parseInt(totalUp16Of9To15Of12)
				+ coalesce(parseInt(actualTax[3]) + parseInt(surcharge) * coalesce(actualTax[3]
						/ total)) * 1.03;
		totalUp16Of3To31Of3 = coalesce(parseInt(actualTax[4]) + parseInt(surcharge)
				* coalesce(actualTax[4] / total)) * 1.03;

		console.log('actualTax[4] =>' + actualTax[4]);
		console.log('surcharge =>' + surcharge);
		console.log('total =>' + total)

		netTaxLiability = 0;

		var intrst234Ci = parseInt('0', 10);
		var intrst234Cii = parseInt('0', 10);
		var intrst234Ciii = parseInt('0', 10);
		var intrst234Civ = parseInt('0', 10);
		var intrst234Cv = parseInt('0', 10);

		var tempintrstBeforeSlab0 = parseInt('0', 10);
		var tempintrstBeforeSlab1 = parseInt('0', 10);
		var tempintrstBeforeSlab2 = parseInt('0', 10);
		var tempintrstBeforeSlab3 = parseInt('0', 10);
		var tempintrstForAdvTax = parseInt('0', 10);
		var totSlab = parseInt('0', 10);

		var othExemptions = eval(parseInt(
				coalesceSetRet('partBTTI.computationOfTaxLiability.taxRelief.totTaxRelief'),
				10));

		// +
		// parseInt(coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebate87A'),
		// 10)
		// );

		if ((eval(parseInt(balTaxPayable.value, 10) - parseInt(TDS, 10)
				- parseInt(TCS, 10)) >= parseInt('10000', 10))) {

			var totSplRateIncTax = 0;
			
			if (parseInt(slab0, 10) < eval((parseInt(netTaxLiability, 10)
					+ parseInt(totSplRateIncTax, 10) + totalUpto15Of6
					- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
					TCS, 10))
					* parseFloat('0.12'))) {
				

				tempintrstBeforeSlab0 = (parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUpto15Of6
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)
						* parseFloat('0.15'));
				var tempintrst234Ci = (((parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUpto15Of6
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)) * parseFloat('0.15')) - parseInt(slab0, 10));
				if (parseInt(tempintrst234Ci, 10) > 100) {
					tempintrst234Ci = Math
							.floor(parseInt(tempintrst234Ci, 10) / 100)
							* parseInt('100', 10);
				}
				intrst234Ci = parseInt(tempintrst234Ci, 10)
						* parseFloat('0.01') * parseInt('3', 10);

			}

			if (eval(parseInt(slab0, 10) + parseInt(slab1, 10)) < eval((parseInt(
					netTaxLiability, 10)
					+ parseInt(totSplRateIncTax, 10)
					+ totalUpto15Of9
					- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
					TCS, 10))
					* parseFloat('0.36'))) {
				tempintrstBeforeSlab1 = ((parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUpto15Of9
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)) * parseFloat('0.45'));
				var tempintrst234Cii = (((parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUpto15Of9
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)) * parseFloat('0.45'))
						- parseInt(slab0, 10) - parseInt(slab1, 10));
				if (parseInt(tempintrst234Cii, 10) > 100) {
					tempintrst234Cii = Math
							.floor(parseInt(tempintrst234Cii, 10) / 100)
							* parseInt('100', 10);
				}
				intrst234Cii = parseInt(tempintrst234Cii, 10)
						* parseFloat('0.01') * parseInt('3', 10);

			}

			if (eval(parseInt(slab0, 10) + parseInt(slab1, 10)
					+ parseInt(slab2, 10)) < eval((parseInt(netTaxLiability, 10)
					+ parseInt(totSplRateIncTax, 10)
					+ totalUp16Of9To15Of12
					- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
					TCS, 10))
					* parseFloat('0.75', 10))) {
				tempintrstBeforeSlab2 = ((parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUp16Of9To15Of12
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)) * parseFloat('0.75'));
				var tempintrst234Ciii = (((parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUp16Of9To15Of12
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)) * parseFloat('0.75'))
						- parseInt(slab0, 10) - parseInt(slab1, 10) - parseInt(
						slab2, 10));

				if (parseInt(tempintrst234Ciii, 10) > 100) {
					tempintrst234Ciii = Math.floor(parseInt(tempintrst234Ciii,
							10) / 100)
							* parseInt('100', 10);
				}
				intrst234Ciii = parseInt(tempintrst234Ciii, 10)
						* parseFloat('0.01') * parseInt('3', 10);
			}

			var tempintrstForAdvTax = zeroOrMore((parseInt(netTaxLiability, 10)
					+ parseInt(totSplRateIncTax, 10) + totalUp16Of12To15Of3
					+ siTax - parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
					TCS, 10))
					* parseFloat('1'));

			if (eval(parseInt(slab0, 10) + parseInt(slab1, 10)
					+ parseInt(slab2, 10) + parseInt(slab3, 10)) < eval((parseInt(
					netTaxLiability, 10)
					+ parseInt(totSplRateIncTax, 10)
					+ totalUp16Of12To15Of3
					- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
					TCS, 10))
					* parseFloat('1', 10))) {

				tempintrstBeforeSlab3 = ((parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUp16Of12To15Of3
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)) * parseFloat('1'));

				var tempintrst234Civ = (((parseInt(netTaxLiability, 10)
						+ parseInt(totSplRateIncTax, 10) + totalUp16Of12To15Of3
						- parseInt(othExemptions) - parseInt(TDS, 10) - parseInt(
						TCS, 10)) * parseFloat('1'))
						- parseInt(slab0, 10)
						- parseInt(slab1, 10)
						- parseInt(slab2, 10) - parseInt(slab3, 10));


				if (parseInt(tempintrst234Civ, 10) > 100) {
					tempintrst234Civ = Math
							.floor(parseInt(tempintrst234Civ, 10) / 100)
							* parseInt('100', 10);
				}
				intrst234Civ = parseInt(tempintrst234Civ, 10)
						* parseFloat('0.01') * parseInt('1', 10);
			}


			totSlab = parseInt(slab0, 10) + parseInt(slab1, 10)
					+ parseInt(slab2, 10) + parseInt(slab3, 10);

			var usedTdsTcs = parseInt(TDS, 10) + parseInt(TCS, 10)
					+ parseInt(othExemptions);

			avaTdsTcs = parseInt(usedTdsTcs)
					- Math.min(parseInt(usedTdsTcs),
							parseInt(totalUp16Of12To15Of3));

			totalUp16Of3To31Of3 = zeroOrMore(eval(totalUp16Of3To31Of3
					- parseInt(avaTdsTcs, 10)));

			if (parseInt(tempintrstBeforeSlab3, 10) == 0) {
				var avalSlab = parseInt(totSlab)
						- Math.min(parseInt(totSlab),
								parseInt(tempintrstForAdvTax));
			}

			else {
				var avalSlab = parseInt(totSlab)
						- Math.min(parseInt(totSlab),
								parseInt(tempintrstBeforeSlab3));

			}

			if (eval(parseInt(slab4, 10)) < totalUp16Of3To31Of3) {
				var tempintrst234Cv = zeroOrMore(totalUp16Of3To31Of3
						- parseInt(slab4, 10) - parseInt(avalSlab, 10));

				if (parseInt(tempintrst234Cv, 10) > 100) {
					tempintrst234Cv = Math
							.round(parseInt(tempintrst234Cv, 10) / 100)
							// .floor(parseInt(tempintrst234Cv, 10) / 100)
							* parseInt('100', 10);
				}
				intrst234Cv = parseInt(tempintrst234Cv, 10)
						* parseFloat('0.01') * parseInt('1', 10);
			}

		} else {
			intrst234Ci = parseInt('0', 10);
			intrst234Cii = parseInt('0', 10);
			intrst234Ciii = parseInt('0', 10);
			intrst234Civ = parseInt('0', 10);
			intrst234Cv = parseInt('0', 10);
		}

		intrst234C = eval(parseInt(intrst234Ci, 10)
				+ parseInt(intrst234Cii, 10) + parseInt(intrst234Ciii, 10)
				+ parseInt(intrst234Civ, 10) + parseInt(intrst234Cv, 10));
	} catch (e) {
		alert('Error in calculate234cIntrst: ' + e.stack);
	}

	return intrst234C;

}

// To calculate Slabbed Tax
function calculateSlabbedTax(netTxblIncome, dontAddExemption) {
	var incTax = 0;
	if (!dontAddExemption) {
		netTxblIncome = parseInt(netTxblIncome) + getExemption();
	}
	var age = calcAge();
	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0].value;
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;

	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& status == 'I' && (resStatus == 'RES' || resStatus == 'NOR')
			&& parseInt(age, 10) > 59 && parseInt(age, 10) < 80) {
		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('300000', 10)) {
			incTax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('300001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			incTax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('300000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('20000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('120000', 10)));
		}
	} else if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& status == 'I' && (resStatus == 'RES' || resStatus == 'NOR')
			&& parseInt(age, 10) >= 80) {
		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			incTax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('100000', 10)));
		}
	} else {
		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('250000', 10)) {
			incTax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('250001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			incTax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('250000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('25000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('125000', 10)));
		}
	}
	return incTax;
}

// To apply Exemption
function applyExemption(original, exemption, appRate) {
	var remaining = exemption;
	var nonZero = 0;
	for (var i = original.length - 1; i >= 0; i--) {
		if (i > 0
				&& (i < original.length - 1 || (appRate && i < original.length))) {
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
			var part = remaining / nonZero--;
			if (parseInt(original[i]) > parseInt(part)) {
				remaining = remaining - part;
				original[i] = original[i] - part;
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
		original = applyExemption(original, remaining);
	}

	return original;
}

// To round of amount values
function rndOffNrsTen(newVar) {

	if (parseInt(newVar.toString().charAt(newVar.toString().length - 1), 10) >= parseInt(
			'5', 10)) {
		newVar = eval(Math
				.floor(eval(parseInt(newVar, 10) / parseInt('10', 10)))
				* parseInt('10', 10));
		newVar = eval(parseInt(newVar, 10) + parseInt('10', 10));

		return newVar;
	} else {
		newVar = eval(Math
				.floor(eval(parseInt(newVar, 10) / parseInt('10', 10)))
				* parseInt('10', 10));

		return newVar;
	}

}

// To calculate schedule CG Deductions
function calculateCGDeductions() {
	var tab = document.getElementById('schduleCGDed');
	var inputs = tab.getElementsByTagName('INPUT');
	var sum = 0;
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].name.match('amtDed$')) {
			sum = parseInt(sum, 10) + parseInt(coalesce(inputs[i].value), 10);
		}
	}
	var totDeductClaim = document
			.getElementsByName('scheduleCGPost45.deducClaimInfo.totDeductClaim')[0];
	totDeductClaim.value = sum;
}

// To calculate Schedule CG
function calcSchCG(cgosIncome) {
	try {

		calculateSTCG(cgosIncome);
		calculateLTCG(cgosIncome);

		var totScheduleCGPost45 = document
				.getElementsByName('scheduleCGPost45.totScheduleCGPost45')[0];
		totScheduleCGPost45.value = eval(coalesceSetRet('scheduleCGPost45.shortTermCapGainPost45.totalSTCG')
				+ parseInt(zeroOrMore(coalesceSetRet('scheduleCGPost45.longTermCapGainPost45.totalLTCG'))));

		calculateCGDeductions();

		doCGSetOff(cgosIncome);

	} catch (e) {
		alert('error in calcSchCG=' + e.stack);
	}
}

// To add Row To scheudle CG
function addRowToCG(tableId) {
	var tab = document.getElementById(tableId);
	var body = tab.tBodies[0];
	var clone = body.cloneNode(true);
	var index = parseInt(tab.tBodies.length, 10) + 1;
	clone.rows[0].cells[0].innerHTML = index;
	var inputs = clone.getElementsByTagName('INPUT');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].name = inputs[i].name.replace(/\[[\d]+\]/, '[' + (index - 1)
				+ ']');
		inputs[i].value = '';
		var blurAttr = inputs[i].getAttribute('onblur');
		if (blurAttr != null) {
			blurAttr = blurAttr + ";";
		} else {
			blurAttr = "";
		}
		inputs[i].setAttribute('onblur', blurAttr
				+ 'j.blur(this,this.name,this.value);');
	}
	var selects = clone.getElementsByTagName('SELECT');
	for (var i = 0; i < selects.length; i++) {
		selects[i].name = selects[i].name.replace(/\[[\d]+\]/, '['
				+ (index - 1) + ']');
		selects[i].selectedIndex = 0;
		var blurAttr = selects[i].getAttribute('onblur');
		if (blurAttr != null) {
			blurAttr = blurAttr + ";";
		} else {
			blurAttr = "";
		}
		selects[i].setAttribute('onblur', blurAttr
				+ 'j.blur(this,this.name,this.value);');
	}

	if (clone.getElementsByTagName('table').length > 0) {
		clone.getElementsByTagName('table')[0].setAttribute('id', tableId
				+ '_ded' + index);
		clone.getElementsByTagName('img')[0].setAttribute('onclick',
				'addRowToTable(' + '\'' + tableId + '_ded' + index
						+ '\',3,2,this);');
		clone.getElementsByTagName('img')[1]
				.setAttribute('onclick', 'deleteRowTable(' + '\'' + tableId
						+ '_ded' + index + '\',1,2)');
	}
	tab.appendChild(clone);
	modifyRow(tab);

	if (clone.getElementsByTagName('table').length > 0) {
		$('#' + tableId + '_ded' + index + ' input').attr("checked", true);
		deleteRowTable(tableId + '_ded' + index, 1, 2);
		$('#' + tableId + '_ded' + index + ' input').attr("checked", false);
	}
}

// To delete Row To schedule CG
function deleteRowToCG(tableId) {
	var tab = document.getElementById(tableId);
	var len = tab.tBodies.length;
	if (len > 1) {
		tab.removeChild(tab.tBodies[len - 1]);
	}
	modifyRow(tab);
}

// To calculate Schedule CG
function calcSchCGLtcgStcg() {

	try {

		var stcg15Per = coalesceSetRet("scheduleBFLA.stcg.stcg15Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
		var shortTermUnder15Per = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of6")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of9")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of9To15Of12")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of12To15Of3")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.up16Of3To31Of3");

		var stcgAppRate = coalesceSetRet("scheduleBFLA.stcg.stcgAppRate.incBFLA.incOfCurYrAfterSetOffBFLosses");
		var shortTermUnderAppRate = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of6")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of9")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of9To15Of12")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of12To15Of3")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.up16Of3To31Of3");

		var stcg30Per = coalesceSetRet("scheduleBFLA.stcg.stcg30Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
		var shortTermUnder30Per = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of6")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of9")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of9To15Of12")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of12To15Of3")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.up16Of3To31Of3");

		var ltcg10Per = coalesceSetRet("scheduleBFLA.ltcg.ltcg10Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
		var longTermUnder10Per = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of6")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of9")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of9To15Of12")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of12To15Of3")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.up16Of3To31Of3");

		var ltcg20Per = coalesceSetRet("scheduleBFLA.ltcg.ltcg20Per.incBFLA.incOfCurYrAfterSetOffBFLosses");
		var longTermUnder20Per = coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of6")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of9")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of9To15Of12")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of12To15Of3")
				+ coalesceSetRet("scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.up16Of3To31Of3");

		// check for STCG
		if (stcg15Per > shortTermUnder15Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of9',
							'Total of Quarterly breakup in STCG 15% is less by '
									+ (stcg15Per - shortTermUnder15Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in STCG 111A is less by "
							+ (stcg15Per - shortTermUnder15Per));
		}
		if (stcg15Per < shortTermUnder15Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.shortTermUnder15Per.upto15Of9',
							'Total of Quarterly breakup in STCG 15% is more by '
									+ Math.abs(stcg15Per - shortTermUnder15Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in STCG 111A is more by "
							+ Math.abs(stcg15Per - shortTermUnder15Per));
		}

		if (stcgAppRate > shortTermUnderAppRate) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of9',
							'Total of Quarterly breakup in STCG Applicable Rates is less by '
									+ (stcgAppRate - shortTermUnderAppRate));
			addErrorXHTML('',
					"Total of Quarterly breakup in STCG Others is less by "
							+ (stcgAppRate - shortTermUnderAppRate));
		}
		if (stcgAppRate < shortTermUnderAppRate) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.shortTermUnderAppRate.upto15Of9',
							'Total of Quarterly breakup in STCG Applicable Rates is more by '
									+ Math.abs(stcgAppRate
											- shortTermUnderAppRate));
			addErrorXHTML('',
					"Total of Quarterly breakup in STCG Others is more by "
							+ Math.abs(stcgAppRate - shortTermUnderAppRate));
		}
		if (stcg30Per > shortTermUnder30Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of9',
							'Total of Quarterly breakup in STCG 30% is less by '
									+ (stcg30Per - shortTermUnder30Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in LTCG Proviso is less by "
							+ (stcg30Per - shortTermUnder30Per));
		}
		if (stcg30Per < shortTermUnder30Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.shortTermUnder30Per.upto15Of9',
							'Total of Quarterly breakup in STCG 30% is more by '
									+ (stcg30Per - shortTermUnder30Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in LTCG Proviso is more by "
							+ Math.abs(stcg30Per - shortTermUnder30Per));
		}

		// check for LTCG

		if (ltcg10Per > longTermUnder10Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of9',
							'Total of Quarterly breakup in LTCG 10% is less by '
									+ (ltcg10Per - longTermUnder10Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in LTCG Non Proviso is less by "
							+ (ltcg10Per - longTermUnder10Per));
		}

		if (ltcg10Per < longTermUnder10Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.longTermUnder10Per.upto15Of9',
							'Total of Quarterly breakup in LTCG 10% is more by '
									+ Math.abs(ltcg10Per - longTermUnder10Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in LTCG Non Proviso is more by "
							+ Math.abs(ltcg10Per - longTermUnder10Per));
		}

		if (ltcg20Per > longTermUnder20Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of9',
							'Total of Quarterly breakup in LTCG 20% is less by '
									+ (ltcg20Per - longTermUnder20Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in LTCG Non Proviso is less by "
							+ (ltcg20Per - longTermUnder20Per));
		}

		if (ltcg20Per < longTermUnder20Per) {
			j
					.setFieldError(
							'scheduleCGPost45.accruOrRecOfCG.longTermUnder20Per.upto15Of9',
							'Total of Quarterly breakup in LTCG 20% is more by '
									+ Math.abs(ltcg20Per - longTermUnder20Per));
			addErrorXHTML('',
					"Total of Quarterly breakup in LTCG Non Proviso is more by "
							+ Math.abs(ltcg20Per - longTermUnder20Per));
		}

		var fullConsideration = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration')[0];
		var propertyValuation = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.propertyValuation')[0];
		var fullConsideration50C = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];

		if (fullConsideration50C.value != fullConsideration.value
				&& fullConsideration50C.value != propertyValuation.value) {
			j
					.setFieldError(
							'scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C',
							"Please enter value from 'ai' or 'aii' only");
			addErrorXHTML(fullConsideration50C,
					"Please enter value from 'ai' or 'aii' only");
		}

		fullConsideration = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration')[0];
		propertyValuation = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.propertyValuation')[0];
		fullConsideration50C = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0];

		if (fullConsideration50C.value != fullConsideration.value
				&& fullConsideration50C.value != propertyValuation.value) {
			j
					.setFieldError(
							'scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C',
							"Please enter value from 'ai' or 'aii' only");
			addErrorXHTML(fullConsideration50C,
					"Please enter value from 'ai' or 'aii' only");
		}

		var tab = document.getElementById('stcg10pctTab');
		var selects = tab.getElementsByTagName("SELECT");
		var count = {
			"21ciii" : 0,
			"5AC1c" : 0,
			"5ADiii" : 0,
			"5ACA1b" : 0
		};
		for (var i = 0; i < selects.length; i++) {
			count[selects[i].value] = count[selects[i].value] + 1;
			if (count[selects[i].value] > 1) {
				j.setFieldError(selects[i].name,
						' A particular drop down cannot be selected twice');
				addErrorXHTML(selects[i],
						" A particular drop down cannot be selected twice");
				break;
			}
		}
	} catch (e) {
		alert('error in calcSchCGLtcgStcg=' + e.stack);
	}
}

// To calculate schedule OS
function calculateOS(cgosIncome) {

	var simap = initMapForSI(cgosIncome);

	coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[0].sourceAmount');

	var othersGross = document.getElementsByName('scheduleOS.othersGross')[0];
	othersGross.value = calculateOSGross(simap);
	validateSchOSDTAA1a1b();
	var totalOSGross = document.getElementsByName('scheduleOS.totalOSGross')[0];
	totalOSGross.value = eval(parseInt(
			coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.dividendGross'),
			10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.interestGross'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.rentFromMachPlantBldgs'),
					10)
			+ parseInt(coalesceSetRet('scheduleOS.othersGross'), 10));

	var totAmtUnderDtaa = document
			.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa.totAmtUnderDtaa')[0];
	totAmtUnderDtaa.value = addCGDeductions('scheduleOsNriIncTaxDtaa');

	var totalOSGrossChargblSplRate = document
			.getElementsByName('scheduleOS.incChargblSplRateOS.totalOSGrossChargblSplRate')[0];
	totalOSGrossChargblSplRate.value = eval(parseInt(
			coalesceSetRet('scheduleOS.incChargblSplRateOS.winningFrmLotteries'),
			10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBF'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incChargblSplRateOS.secXIIOth'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa.totAmtUnderDtaa'),
					10));

	var grossAmtChargblNormalRate = document
			.getElementsByName('scheduleOS.grossAmtChargblNormalRate')[0];
	
	
	grossAmtChargblNormalRate.value =eval(parseInt(totalOSGross.value, 10)
			- parseInt(totalOSGrossChargblSplRate.value, 10));
	

	var totDeductions = document
			.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.deductions.totDeductions')[0];
	totDeductions.value = eval(parseInt(
			coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.deductions.expenses'),
			10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.deductions.depreciation'),
					10));

	var balanceNoRaceHorse = document
			.getElementsByName('scheduleOS.balanceNoRaceHorse')[0];
	

	balanceNoRaceHorse.value = eval(parseInt(grossAmtChargblNormalRate.value,
			10)
			- parseInt(totDeductions.value, 10));
	

	var totOthSrcNoRaceHorse = document
			.getElementsByName('scheduleOS.totOthSrcNoRaceHorse')[0];
	var IncmOthrSrc = document
			.getElementsByName('scheduleOS.balanceNoRaceHorse')[0];

	totOthSrcNoRaceHorse.value = eval(parseInt(
			totalOSGrossChargblSplRate.value, 10)
			+ parseInt(zeroOrMore(parseInt(IncmOthrSrc.value, 10))));

	var balanceOwnRaceHorse = document
			.getElementsByName('scheduleOS.incFromOwnHorse.balanceOwnRaceHorse')[0];
	balanceOwnRaceHorse.value = eval(parseInt(
			coalesceSetRet('scheduleOS.incFromOwnHorse.receipts'), 10)
			- parseInt(
					coalesceSetRet('scheduleOS.incFromOwnHorse.deductSec57'),
					10));

	var incChargeable = document.getElementsByName('scheduleOS.incChargeable')[0];
	incChargeable.value = eval(parseInt(totOthSrcNoRaceHorse.value, 10)
			+ parseInt(zeroOrMore(parseInt(balanceOwnRaceHorse.value, 10))));
	return simap;
}

function validateSchOSDTAA1a1b() {
	var dividendGross = parseInt(
			coalesce(document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.dividendGross')[0].value),
			10);
	var interestGross = parseInt(
			coalesce(document
					.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.interestGross')[0].value),
			10);

	var table = document.getElementById('scheduleOsNriIncTaxDtaa');
	var rowCount = table.rows.length - 2;

	var dividendGrossTot = parseInt('0', 10);
	var interestGrossTot = parseInt('0', 10);

	for (var k = 0; k < rowCount; k++) {
		if (document
				.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
						+ k + '].itemIncluded')[0].value == '56i') {
			dividendGrossTot = eval(dividendGrossTot
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
											+ k + '].amount')[0].value), 10));
			if (eval(dividendGrossTot > dividendGross)) {
				if (document
						.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
								+ k + '].amount')[0].value != '') {
					document
							.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
									+ k + '].amount')[0].value = 0;
					addErrorXHTML(
							document
									.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
											+ k + '].amount')[0],
							'For Dividend - The sum of amount should not exceed amount entered in 1a.',
							true);
					j
							.setFieldError(
									'scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
											+ k + '].amount',
									'For Dividend - The sum of amount should not exceed amount entered in 1a.');
				}
			}
		} else if (document
				.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
						+ k + '].itemIncluded')[0].value == '56') {
			interestGrossTot = eval(interestGrossTot
					+ parseInt(
							coalesce(document
									.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
											+ k + '].amount')[0].value), 10));
			if (eval(interestGrossTot > interestGross)) {
				if (document
						.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
								+ k + '].amount')[0].value != '') {
					document
							.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
									+ k + '].amount')[0].value = 0;
					addErrorXHTML(
							document
									.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
											+ k + '].amount')[0],
							'For Interest - The sum of amount should not exceed amount entered in 1b.',
							true);
					j
							.setFieldError(
									'scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
											+ k + '].amount',
									'For Interest - The sum of amount should not exceed amount entered in 1b.');
				}
			}
		}
	}

}

// To calculate schedule OS Gross amount
function calculateOSGross(simap) {

	var total = parseInt('0', 10);

	try {
		var tabl = document.getElementById('schduleOsf');
		var temp = eval(parseInt(
				coalesce(document
						.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[7].sourceAmount')[0].value),
				10));
		var allInputTags = tabl.getElementsByTagName('input');
		for (var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("sourceAmount$")) {
				total = eval(parseInt(total, 10)
						+ parseInt(isNVL(allInputTags[i].value), 10));
			}
		}
		total = parseInt(total, 10) - parseInt(temp, 10);
		var allSelects = tabl.getElementsByTagName('SELECT');

		var table = document.getElementById('scheduleOsNriIncTaxDtaa');
		var rowCount = table.rows.length - 2;
		var arr = {
			'5A1ai' : 0,
			'5A1aii' : 0,
			'5A1aiia' : 0,
			'5A1aiiaa' : 0,
			'5A1aiiab' : 0,
			'5A1aiiac' : 0,
			'5A1aiii' : 0,
			'5A1bA' : 0,
			'5A1bB' : 0,
			'5AC1ab' : 0,
			'5BBA' : 0,
			'5Ea' : 0
		};
		var sum = 0;
		for (var i = 0; i < allSelects.length; i++) {
			var name = allSelects[i].name;
			var index = name
					.substring(name.indexOf('[') + 1, name.indexOf(']'));
			if (allSelects[i].value == 'Others') {
				document
						.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
								+ index + '].otherDesc')[0].style.display = '';
			} else {
				simap[allSelects[i].value] = coalesce(document
						.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
								+ i + '].sourceAmount')[0].value);
				document
						.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
								+ index + '].otherDesc')[0].style.display = 'none';
				document
						.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
								+ index + '].otherDesc')[0].value = '';
				if (allSelects[i].value == '5BB') {
					var winningFrmLotteries = document
							.getElementsByName('scheduleOS.incChargblSplRateOS.winningFrmLotteries')[0];
					winningFrmLotteries.value = document
							.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
									+ index + '].sourceAmount')[0].value;
				}

				if (allSelects[i].value == '5BBDA') {
					var dividendIncome115BBDA = document
							.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0];
					dividendIncome115BBDA.value = document
							.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
									+ index + '].sourceAmount')[0].value;
				}
				if (allSelects[i].value == '5BBF') {
					var dividendIncome115BBF = document
							.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0];
					dividendIncome115BBF.value = document
							.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
									+ index + '].sourceAmount')[0].value;
				}

				if (allSelects[i].value == '5BBE') {
					var dividendIncome115BBE = document
							.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBE')[0];
					dividendIncome115BBE.value = document
							.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
									+ index + '].sourceAmount')[0].value;
				}

				if (allSelects[i].value != 'DTAA') {
					sum = parseInt(sum)
							+ parseInt(coalesce(document
									.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
											+ index + '].sourceAmount')[0].value));
					for (var k = 0; k < rowCount; k++) {
						if (document
								.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
										+ k + '].itemIncluded')[0].value == allSelects[i].value) {
							arr[allSelects[i].value] = eval(parseInt(coalesce(arr[allSelects[i].value]))
									+ parseInt(coalesce(document
											.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
													+ k + '].amount')[0].value)));
							if (arr[allSelects[i].value] > parseInt(coalesce(document
									.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['
											+ index + '].sourceAmount')[0].value))) {

								if (document
										.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
												+ k + '].amount')[0].value != '') {
									document
											.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
													+ k + '].amount')[0].value = 0;
									addErrorXHTML(
											document
													.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
															+ k + '].amount')[0],
											'The sum of amount should not exceed amount entered in 1d.',
											true);
									j
											.setFieldError(
													'scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
															+ k + '].amount',
													'The sum of amount should not exceed amount entered in 1d.');
								}
							} else {
								sum -= document
										.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa['
												+ k + '].amount')[0].value;
							}
						}
					}
					simap[allSelects[i].value] -= parseInt(
							coalesce(arr[allSelects[i].value]), 10);
				}
			}
		}
		
		var tempWinningFromLotteries = document
		.getElementsByName('scheduleOS.incChargblSplRateOS.winningFrmLotteries')[0].value;

		var temp115BBDA = document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value;

		var temp115BBF = document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value;

		var temp115BBE = document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBE')[0].value;


		var secXIIOth = document
				.getElementsByName('scheduleOS.incChargblSplRateOS.secXIIOth')[0];

		secXIIOth.value = eval(sum - temp - tempWinningFromLotteries -temp115BBDA - temp115BBF
				- temp115BBE);

	
	} catch (e) {
		alert('Exception in calculateOSGross : ' + e);
	}
	return total;
}

// To calculate schedule HP
function scheduleHPCalcFor3() {

	var totHp = eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent) - 1);
	var total = 0;
	var thirtyPercentOfBalanceTemp = 0;

	for (var i = 0; i < totHp; i++) {

		document.getElementsByName('scheduleHP.propertyDetails[' + i
				+ '].rentdetails.totalUnrealizedAndTax')[0].value = eval(parseInt(document
				.getElementsByName('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.rentNotRealized')[0].value == "" ? 0
				: coalesceSetRet('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.rentNotRealized'))
				+ parseInt(document
						.getElementsByName('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.localTaxes')[0].value == "" ? 0
						: coalesceSetRet('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.localTaxes')));

		document.getElementsByName('scheduleHP.propertyDetails[' + i
				+ '].rentdetails.balanceALV')[0].value = eval(parseInt(document
				.getElementsByName('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.annualLetableValue')[0].value == "" ? 0
				: coalesceSetRet('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.annualLetableValue'))
				- parseInt(document
						.getElementsByName('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.totalUnrealizedAndTax')[0].value == "" ? 0
						: coalesceSetRet('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.totalUnrealizedAndTax')));

		var incomeChargbleOwnHands = document
				.getElementsByName('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.incomeChargbleOwnHands')[0];
		setEditableFieldValue(
				incomeChargbleOwnHands,
				Math
						.round(eval(parseInt(document
								.getElementsByName('scheduleHP.propertyDetails['
										+ i + '].rentdetails.balanceALV')[0].value)
								* (parseFloat(document
										.getElementsByName('scheduleHP.propertyDetails['
												+ i + '].asseseeShareProperty')[0].value))
								/ 100)));

		thirtyPercentOfBalanceTemp = Math
				.round(eval(parseInt(document
						.getElementsByName('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.incomeChargbleOwnHands')[0].value == "" ? 0
						: document
								.getElementsByName('scheduleHP.propertyDetails['
										+ i
										+ '].rentdetails.incomeChargbleOwnHands')[0].value) * 0.3));
		if (parseInt(thirtyPercentOfBalanceTemp, 10) > 0) {
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.thirtyPercentOfBalance')[0].value = thirtyPercentOfBalanceTemp;
		} else {
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.thirtyPercentOfBalance')[0].value = parseInt(
					0, 10);
		}

		document.getElementsByName('scheduleHP.propertyDetails[' + i
				+ '].rentdetails.totalDeduct')[0].value = eval(parseInt(document
				.getElementsByName('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.thirtyPercentOfBalance')[0].value == "" ? 0
				: coalesceSetRet('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.thirtyPercentOfBalance'))
				+ parseInt(document
						.getElementsByName('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.intOnBorwCap')[0].value == "" ? 0
						: coalesceSetRet('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.intOnBorwCap')));

		document.getElementsByName('scheduleHP.propertyDetails[' + i
				+ '].rentdetails.incomeOfHP')[0].value = eval(parseInt(document
				.getElementsByName('scheduleHP.propertyDetails[' + i
						+ '].rentdetails.balanceALV')[0].value == "" ? 0
				: coalesce(document
						.getElementsByName('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.incomeChargbleOwnHands')[0].value))
				- parseInt(document
						.getElementsByName('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.totalDeduct')[0].value == "" ? 0
						: document
								.getElementsByName('scheduleHP.propertyDetails['
										+ i + '].rentdetails.totalDeduct')[0].value));

		total = eval(parseInt(total)
				+ parseInt(document
						.getElementsByName('scheduleHP.propertyDetails[' + i
								+ '].rentdetails.incomeOfHP')[0].value));
	}
	document.getElementsByName('scheduleHP.totalIncomeChargeableUnHP')[0].value = eval(parseInt(document
			.getElementsByName('scheduleHP.rentOfEarlierYrSec25AandAA')[0].value == "" ? 0
			: document
					.getElementsByName('scheduleHP.rentOfEarlierYrSec25AandAA')[0].value)
			+ parseInt(total));
}

// To add Schedule HP property
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
	
	if ($('#scheduleHPAddRow')[0].parentNode.children.length == 47) {
		$('#delHPButtonId').prop('disabled', true);
	} else if ($('#scheduleHPAddRow')[0].parentNode.children.length > 47) {
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

// To delete Schedule HP property
function delScheduleHPForITR3() {

	if($('#scheduleHPAddRow')[0].parentNode.children.length>50){
		for(var i=0;i<21;i++){
			$('#scheduleHPAddRow')[0].parentNode.deleteRow($('#scheduleHPAddRow')[0].parentNode.children.length-6);
		}
		if($('#scheduleHPAddRow')[0].parentNode.children.length==47){
			$('#delHPButtonId').prop('disabled', true);
		}
	}else if($('#scheduleHPAddRow')[0].parentNode.children.length==47){
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
	calcITR3();
}

// To set Serial Number for co Owners
function setSerialNumber(element, header) {
	try {

		var tableId = element.getAttribute('onclick').substring(20,
				element.getAttribute('onclick').lastIndexOf('\''));
		var index = tableId.substring(10);
		index = eval(index - 1);

		var table = document.getElementById(tableId);
		var noOfRows = table.rows.length;

		for (var i = 0; i < eval(parseInt(noOfRows, 10) - header); i++) {

			document.getElementsByName('scheduleHP.propertyDetails[' + index
					+ '].coOwners[' + i + '].coOwnersSNo')[0].value = i + 1;
		}
	} catch (e) {
		alert('errror:' + e);
	}
}

// To set Serial Number for co tenants
function setSerialNumberTenants(element, header) {
	try {

		var tableId = element.getAttribute('onclick').substring(27,
				element.getAttribute('onclick').lastIndexOf('\''));
		var index = tableId.substring(16);
		index = eval(index - 1);

		var table = document.getElementById(tableId);
		var noOfRows = table.rows.length;

		for (var i = 0; i < eval(parseInt(noOfRows, 10) - header); i++) {

			document.getElementsByName('scheduleHP.propertyDetails[' + index
					+ '].coTenants[' + i + '].coTenantsSNo')[0].value = i + 1;
		}
	} catch (e) {
		alert('errror:' + e);
	}
}

// To validate Schedule HP
function validateScheduleHP() {
	var tab = document.getElementById('scheduleHPMain');
	var allInputTags = tab.getElementsByTagName('select');
	var count = 0;
	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("ifLetOut$")) {
			if (allInputTags[i].value == "N") {
				if (++count > 1) {
					j
							.setFieldError(
									allInputTags[i].name,
									'Where there is more than one Self occupied House property(SOP) , one of them shall be treated as SOP and all other House properties shall be deemed to be let out');
					break;
				}
			}
		}
	}
}

// To enable or disable fields based on the letout property
function isLetOut() {

	var totHp = eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent) - 1);

	for (var i = 0; i < totHp; i++) {

		var tempName = 'scheduleHP.propertyDetails[' + i + '].ifLetOut';
		var val = document.getElementsByName(tempName)[0].value;

		if (val == 'Y') {

			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(':input').prop(
					'disabled', false);
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].coTenants[0].coTenantsSNo')[0].value = 1;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.annualLetableValue')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.rentNotRealized')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.localTaxes')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.incomeChargbleOwnHands')[0].disabled = true;
		} else if (val == 'D') {
			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(
					'[type=\"checkbox\"]').attr('checked', 'checked');
			deleteRowTable('scheduleHPTenant' + eval(parseInt(i) + 1), 1, 1);
			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(':input').prop(
					'disabled', true);
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.annualLetableValue')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.rentNotRealized')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.localTaxes')[0].disabled = false;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.incomeChargbleOwnHands')[0].disabled = true;
		} else {

			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(
					'[type=\"checkbox\"]').attr('checked', 'checked');
			deleteRowTable('scheduleHPTenant' + eval(parseInt(i) + 1), 1, 1);
			$('#scheduleHPTenant' + eval(parseInt(i) + 1)).find(':input').prop(
					'disabled', true);

			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.annualLetableValue')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.annualLetableValue')[0].value = '';
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.rentNotRealized')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.rentNotRealized')[0].value = '';
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.localTaxes')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.localTaxes')[0].value = '';
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.incomeChargbleOwnHands')[0].disabled = true;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].rentdetails.incomeChargbleOwnHands')[0].value = '';
		}
	}
}

// To enable or disable fields based on the co owned property
function isCoOwned() {
	var totHp = eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent) - 1);

	for (var i = 0; i < totHp; i++) {
		var tempName = 'scheduleHP.propertyDetails[' + i + '].propCoOwnedFlg';
		var val = document.getElementsByName(tempName)[0].value;
		var assessePercentShareProp = document
				.getElementsByName('scheduleHP.propertyDetails[' + i
						+ '].asseseeShareProperty')[0];
		if (val == 'YES') {
			$('#scheduleHP' + eval(parseInt(i) + 1)).find(':input').prop(
					'disabled', false);
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].coOwners[0].coOwnersSNo')[0].value = 1;
			document.getElementsByName('scheduleHP.propertyDetails[' + i
					+ '].asseseeShareProperty')[0].disabled = false;
			if (assessePercentShareProp.value == 100
					|| assessePercentShareProp.value == 0.0) {
				assessePercentShareProp.value = '0';
			}
		} else {
			$('#scheduleHP' + eval(parseInt(i) + 1))
					.find('[type=\"checkbox\"]').attr('checked', 'checked');
			deleteRowTable('scheduleHP' + eval(parseInt(i) + 1), 1, 1);
			$('#scheduleHP' + eval(parseInt(i) + 1)).find(':input').prop(
					'disabled', true);
			assessePercentShareProp.disabled = true;
			if (val == 'NO') {
				assessePercentShareProp.value = '100';
			} else {
				assessePercentShareProp.value = '0.0';
			}
		}
	}
}

// To calculate Schedule SI
function calcScheduleSI() {

	var secCode1A = document
			.getElementsByName('scheduleSI.splCodeRateTax[2].secCode')[0];
	secCode1A.value = coalesceString(secCode1A.value);
	var splRatePercent1A = document
			.getElementsByName('scheduleSI.splCodeRateTax[2].splRatePercent')[0];
	splRatePercent1A.value = coalesce(splRatePercent1A.value);
	var splRateInc1A = document
			.getElementsByName('scheduleSI.splCodeRateTax[2].splRateInc')[0];
	splRateInc1A.value = coalesce(splRateInc1A.value);
	var taxableInc1A = document
			.getElementsByName('scheduleSI.splCodeRateTax[2].taxableInc')[0];
	taxableInc1A.value = coalesce(taxableInc1A.value);
	var splRateIncTax1A = document
			.getElementsByName('scheduleSI.splCodeRateTax[2].splRateIncTax')[0];
	splRateIncTax1A.value = coalesce(splRateIncTax1A.value);

	var secCode22 = document
			.getElementsByName('scheduleSI.splCodeRateTax[4].secCode')[0];
	secCode22.value = coalesceString(secCode22.value);
	var splRatePercent22 = document
			.getElementsByName('scheduleSI.splCodeRateTax[4].splRatePercent')[0];
	splRatePercent22.value = coalesce(splRatePercent22.value);
	var splRateInc22 = document
			.getElementsByName('scheduleSI.splCodeRateTax[4].splRateInc')[0];
	splRateInc22.value = coalesce(splRateInc22.value);
	var taxableInc22 = document
			.getElementsByName('scheduleSI.splCodeRateTax[4].taxableInc')[0];
	taxableInc22.value = coalesce(taxableInc22.value);
	var splRateIncTax22 = document
			.getElementsByName('scheduleSI.splCodeRateTax[4].splRateIncTax')[0];
	splRateIncTax22.value = coalesce(splRateIncTax22.value);

	var secCode21ciii = document
			.getElementsByName('scheduleSI.splCodeRateTax[5].secCode')[0];
	secCode21ciii.value = coalesceString(secCode21ciii.value);
	var splRatePercent21ciii = document
			.getElementsByName('scheduleSI.splCodeRateTax[5].splRatePercent')[0];
	splRatePercent21ciii.value = coalesce(splRatePercent21ciii.value);
	var splRateInc21ciii = document
			.getElementsByName('scheduleSI.splCodeRateTax[5].splRateInc')[0];
	splRateInc21ciii.value = coalesce(splRateInc21ciii.value);
	var taxableInc21ciii = document
			.getElementsByName('scheduleSI.splCodeRateTax[5].taxableInc')[0];
	taxableInc21ciii.value = coalesce(taxableInc21ciii.value);
	var splRateIncTax21ciii = document
			.getElementsByName('scheduleSI.splCodeRateTax[5].splRateIncTax')[0];
	splRateIncTax21ciii.value = coalesce(splRateIncTax21ciii.value);

	var secCode21 = document
			.getElementsByName('scheduleSI.splCodeRateTax[3].secCode')[0];
	secCode21.value = coalesceString(secCode21.value);
	var splRatePercent21 = document
			.getElementsByName('scheduleSI.splCodeRateTax[3].splRatePercent')[0];
	splRatePercent21.value = coalesce(splRatePercent21.value);
	var splRateInc21 = document
			.getElementsByName('scheduleSI.splCodeRateTax[3].splRateInc')[0];
	splRateInc21.value = coalesce(splRateInc21.value);
	var taxableInc21 = document
			.getElementsByName('scheduleSI.splCodeRateTax[3].taxableInc')[0];
	taxableInc21.value = coalesce(taxableInc21.value);
	var splRateIncTax21 = document
			.getElementsByName('scheduleSI.splCodeRateTax[3].splRateIncTax')[0];
	splRateIncTax21.value = coalesce(splRateIncTax21.value);

	var secCode5BB = document
			.getElementsByName('scheduleSI.splCodeRateTax[6].secCode')[0];
	secCode5BB.value = coalesceString(secCode5BB.value);
	var splRatePercent5BB = document
			.getElementsByName('scheduleSI.splCodeRateTax[6].splRatePercent')[0];
	splRatePercent5BB.value = coalesce(splRatePercent5BB.value);
	var splRateInc5BB = document
			.getElementsByName('scheduleSI.splCodeRateTax[6].splRateInc')[0];
	splRateInc5BB.value = coalesce(splRateInc5BB.value);
	var taxableInc5BB = document
			.getElementsByName('scheduleSI.splCodeRateTax[6].taxableInc')[0];
	taxableInc5BB.value = coalesce(taxableInc5BB.value);
	var splRateIncTax5BB = document
			.getElementsByName('scheduleSI.splCodeRateTax[6].splRateIncTax')[0];
	splRateIncTax5BB.value = coalesce(splRateIncTax5BB.value);

	var secCode1 = document
			.getElementsByName('scheduleSI.splCodeRateTax[0].secCode')[0];
	secCode1.value = coalesceString(secCode1.value);
	var splRatePercent1 = document
			.getElementsByName('scheduleSI.splCodeRateTax[0].splRatePercent')[0];
	splRatePercent1.value = coalesce(splRatePercent1.value);
	var splRateInc1 = document
			.getElementsByName('scheduleSI.splCodeRateTax[0].splRateInc')[0];
	splRateInc1.value = coalesce(splRateInc1.value);
	var taxableInc1 = document
			.getElementsByName('scheduleSI.splCodeRateTax[0].taxableInc')[0];
	var splRateIncTax1 = document
			.getElementsByName('scheduleSI.splCodeRateTax[0].splRateIncTax')[0];

	var splRateIncDTAAOS = document
			.getElementsByName('scheduleSI.splCodeRateTax[1].splRateInc')[0];
	var taxableIncDTAAOS = document
			.getElementsByName('scheduleSI.splCodeRateTax[1].taxableInc')[0];
	var splRateIncTaxDTAAOS = document
			.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0];

	var splRateInc5ADii = document
			.getElementsByName('scheduleSI.splCodeRateTax[7].splRateInc')[0];
	splRateInc5ADii.value = coalesce(splRateInc5ADii.value);
	var taxableInc5ADii = document
			.getElementsByName('scheduleSI.splCodeRateTax[7].taxableInc')[0];
	taxableInc5ADii.value = coalesce(taxableInc5ADii.value);
	var splRateIncTax5ADii = document
			.getElementsByName('scheduleSI.splCodeRateTax[7].splRateIncTax')[0];
	splRateIncTax5ADii.value = coalesce(splRateIncTax5ADii.value);

	var exemption = getExemption_SI();

	var partbSetoffInc = parseInt(coalescePath('partBTI.totalIncome'), 10)
			- parseInt(coalescePath('partBTI.incChargeTaxSplRate111A112'), 10);

	// second :: setoff income with total income - final loss setooff
	if (partbSetoffInc > 0) {
		if (partbSetoffInc >= exemption) {
			exemption = 0;
		} else {
			exemption = exemption - partbSetoffInc;
		}
	}

	if (exemption <= splRateInc21.value) {
		taxableInc21.value = zeroOrMore(splRateInc21.value - exemption);
		exemption = 0;
	} else {
		taxableInc21.value = 0;
		exemption = zeroOrMore(exemption - splRateInc21.value);
	}

	if (exemption <= splRateInc1A.value) {
		taxableInc1A.value = zeroOrMore(splRateInc1A.value - exemption);
		exemption = 0;
	} else {
		taxableInc1A.value = 0;
		exemption = zeroOrMore(exemption - splRateInc1A.value);
	}

	if (exemption <= splRateInc22.value) {
		taxableInc22.value = zeroOrMore(splRateInc22.value - exemption);
		exemption = 0;
	} else {
		taxableInc22.value = 0;
		exemption = zeroOrMore(exemption - splRateInc22.value);
	}

	// Taxable Income autopoulate
	taxableInc21ciii.value = zeroOrMore(splRateInc21ciii.value);
	taxableInc5BB.value = zeroOrMore(splRateInc5BB.value);
	taxableInc5ADii.value = zeroOrMore(splRateInc5ADii.value);
	taxableIncDTAAOS.value = zeroOrMore(splRateIncDTAAOS.value);

	// Column 'Tax thereon' values for fixed rows
	splRateIncTax1A.value = Math.round((15 * eval(parseInt(taxableInc1A.value,
			10)))
			/ parseInt('100', 10));
	splRateIncTax22.value = Math.round((10 * eval(parseInt(taxableInc22.value,
			10)))
			/ parseInt('100', 10));
	splRateIncTax21ciii.value = Math.round((10 * eval(parseInt(
			taxableInc21ciii.value, 10)))
			/ parseInt('100', 10));
	splRateIncTax21.value = Math.round((20 * eval(parseInt(taxableInc21.value,
			10)))
			/ parseInt('100', 10));
	splRateIncTax5BB.value = Math.round((30 * eval(parseInt(
			taxableInc5BB.value, 10)))
			/ parseInt('100', 10));
	splRateIncTax5ADii.value = Math.round((30 * eval(parseInt(
			taxableInc5ADii.value, 10)))
			/ parseInt('100', 10));

	var totSplRateInc = eval(parseInt(splRateInc1A.value, 10))
			+ eval(parseInt(splRateInc22.value, 10))
			+ eval(parseInt(splRateInc21ciii.value, 10))
			+ eval(parseInt(splRateInc21.value, 10))
			+ eval(parseInt(splRateInc5BB.value, 10))
			+ eval(parseInt(splRateInc5ADii.value, 10))
			+ eval(parseInt(splRateIncDTAAOS.value, 10))
			+ eval(parseInt(splRateInc1.value, 10));
	var totSplRateIncTax = eval(parseInt(splRateIncTax1A.value, 10))
			+ eval(parseInt(splRateIncTax22.value, 10))
			+ eval(parseInt(splRateIncTax21ciii.value, 10))
			+ eval(parseInt(splRateIncTax21.value, 10))
			+ eval(parseInt(splRateIncTax5BB.value, 10))
			+ eval(parseInt(coalesce(splRateIncTax5ADii.value), 10))
			+ eval(parseInt(coalesce(splRateIncTaxDTAAOS.value), 10))
			+ eval(parseInt(coalesce(splRateIncTax1.value), 10));

	var totTaxableInc = eval(parseInt(taxableInc1A.value, 10))
			+ eval(parseInt(taxableInc22.value, 10))
			+ eval(parseInt(taxableInc21ciii.value, 10))
			+ eval(parseInt(taxableInc21.value, 10))
			+ eval(parseInt(taxableInc5BB.value, 10))
			+ eval(parseInt(taxableInc5ADii.value, 10))
			+ eval(parseInt(taxableIncDTAAOS.value, 10))
			+ eval(parseInt(coalesce(taxableInc1.value), 10));

	var rowCount1 = countRowInTable('scheduleSI.splCodeRateTax', 'splRateInc');

	for (var i = 8; i < rowCount1; i++) {

		var splCodeValue = document
				.getElementsByName('scheduleSI.splCodeRateTax[' + i
						+ '].splRateInc')[0].value;
		var splRatePercent = document
				.getElementsByName('scheduleSI.splCodeRateTax[' + i
						+ '].splRatePercent')[0].value;
		document.getElementsByName('scheduleSI.splCodeRateTax[' + i
				+ '].taxableInc')[0].value = zeroOrMore(coalesce(splCodeValue));
		document.getElementsByName('scheduleSI.splCodeRateTax[' + i
				+ '].splRateIncTax')[0].value = Math.round(eval((parseFloat(
				coalesce(splRatePercent), 10) * parseInt(
				coalesce(splCodeValue), 10))
				/ parseInt('100', 10)));

		totSplRateInc = eval(parseInt(totSplRateInc, 10)
				+ parseInt(coalesce(splCodeValue), 10));
		totSplRateIncTax = eval(parseInt(totSplRateIncTax, 10)
				+ parseInt(coalesce(document
						.getElementsByName('scheduleSI.splCodeRateTax[' + i
								+ '].splRateIncTax')[0].value), 10));
		totTaxableInc = eval(parseInt(totTaxableInc, 10)
				+ parseInt(coalesce(document
						.getElementsByName('scheduleSI.splCodeRateTax[' + i
								+ '].taxableInc')[0].value), 10));
	}
	document.getElementsByName('scheduleSI.totSplRateIncTax')[0].value = zeroOrMore(totSplRateIncTax);
	document.getElementsByName('scheduleSI.totSplRateInc')[0].value = zeroOrMore(totSplRateInc);
	document.getElementsByName('scheduleSI.totSplRateTaxableInc')[0].value = zeroOrMore(totTaxableInc);

}

// To get Exemption for schedule SI
function getExemption_SI() {
	var age = calcAgeCommon(document
			.getElementsByName('partAGEN1.personalInfo.dob')[0]);
	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0]; // RES
	// ,
	// NRI
	var taxPayer = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age > 59 && age < 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {
		return 300000;
	} else if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age >= 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {
		return 500000;
	} else if ((taxPayer.value == 'I' || taxPayer.value == 'H')
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {
		return 250000;
	} else {
		return 0;
	}
}

// to validate HP
function validateHPRent() {

	var tab = document.getElementById('scheduleHPMain');
	var allInputTags = tab.getElementsByTagName('input');

	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("rentdetails.annualLetableValue$")) {
			if (parseInt(allInputTags[i + 1].value, 10) > parseInt(
					allInputTags[i].value, 10)) {

				addError(allInputTags[i + 1],
						'Rent not realized cannot exceed Annual Letable Value',
						true);
				j.setFieldError(allInputTags[i + 1].name,
						'Rent not realized cannot exceed Annual Letable Value');
				break;
			}
		}
	}
}

// To validate schedule CYLA BFLA and CFL on submit of the form
function onSubmitCheck_CYLA_BFLA_CFL() {

	if (coalesceSetRet('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff',
						'This figure cannot be negative. Please rearrange your figures');

	}

	if (coalesceSetRet('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff',
						'This figure cannot be negative. Please rearrange your figures');

	}

	if (coalesceSetRet('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff',
						'This figure cannot be negative. Please rearrange your figures');

	}

	/*if (coalesceSetRet('scheduleCYLA.stcg.incCYLA.incOfCurYrAfterSetOff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.stcg.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.stcg.incCYLA.incOfCurYrAfterSetOff',
						'This figure cannot be negative. Please rearrange your figures');
	}

	if (coalesceSetRet('scheduleCYLA.ltcg.incCYLA.incOfCurYrAfterSetOff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.ltcg.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.ltcg.incCYLA.incOfCurYrAfterSetOff',
						'This figure cannot be negative. Please rearrange your figures');

	}*/

	if (coalesceSetRet('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff',
						'This figure cannot be negative. Please rearrange your figures');
	}

	if (coalesceSetRet('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff',
						'This figure cannot be negative. Please rearrange your figures');
	}

	if (coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff',
						'This figure cannot be negative. Please rearrange your figures');
	}

	if (coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff',
						'This figure cannot be negative. Please rearrange your figures');

	}

	if (coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff') < 0) {
		addErrorXHTML(
				document
						.getElementsByName('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff')[0],
				'This figure cannot be negative. Please rearrange your figures',
				true);
		j
				.setFieldError(
						'scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff',
						'This figure cannot be negative. Please rearrange your figures');

	}

	if (parseInt(
			coalescePath('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')
					/*+ coalescePath('scheduleCYLA.stcg.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.ltcg.incCYLA.incOfCurYrAfterSetOff')*/
					+ coalescePath('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')
					+ coalescePath('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff'),
			10) > 0
			||

			parseInt(
					coalescePath('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')
							+ coalescePath('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff'),
					10) > 0) {

		var losses = coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff')
				+ coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff')
				+ coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff');

		if (losses > 0) {
			var incomeRem = coalesceSetRet('scheduleCYLA.Salaries.incCYLA.incOfCurYrAfterSetOff')
					+ coalesceSetRet('scheduleCYLA.houseProperty.incCYLA.incOfCurYrAfterSetOff')
					+ coalesceSetRet('scheduleCYLA.busProfInclSpecProf.incCYLA.incOfCurYrAfterSetOff')
					/*+ coalesceSetRet('scheduleCYLA.stcg.incCYLA.incOfCurYrAfterSetOff')
					+ coalesceSetRet('scheduleCYLA.ltcg.incCYLA.incOfCurYrAfterSetOff')*/
					+ coalesceSetRet('scheduleCYLA.othSrcInclRaceHorse.incCYLA.incOfCurYrAfterSetOff')
					+ coalesceSetRet('scheduleCYLA.profitFrmRaceHorse.incCYLA.incOfCurYrAfterSetOff');

			if (incomeRem > 0) {
				addErrorXHTML(
						'',
						'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.',
						true);

				if (coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff') > 0) {
					j
							.setFieldError(
									'scheduleCYLA.lossRemAftSetOff.balHPlossCurYrAftSetoff',
									'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.');
				} else if (coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff') > 0) {
					j
							.setFieldError(
									'scheduleCYLA.lossRemAftSetOff.balBusLossAftSetoff',
									'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.');
				} else if (coalesceSetRet('scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff') > 0) {
					j
							.setFieldError(
									'scheduleCYLA.lossRemAftSetOff.balOthSrcLossNoRaceHorseAftSetoff',
									'Losses of the current year should be first setoff with the income of the current year in schedule CYLA.');
				}
			}
		}
	}
}

// To set the value as zero if the value is empty
function onEmptySetZero(element) {

	if (element.value == "") {

		element.value = '0';
	}

}

// To get the PAN
function getPan() {

	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	return pan;
}

// To calculate Tax Payable
function calculateTaxPayable(netTxblIncome) {

	var taxPayer = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	// IN-I,HUF-H
	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0]; // RES
	// ,
	// NRI

	var age = calcAge();

	var incTax = parseInt('0', 10);

	if (taxPayer.value == 'I' && age > 59 && age < 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('300000', 10)) {
			incTax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('300001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			incTax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('300000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('20000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('120000', 10)));
		}

	} else if (taxPayer.value == 'I' && age >= 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			incTax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			incTax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2')));

		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('100000', 10)));
		}

	} else if ((taxPayer.value == 'I') || taxPayer.value == 'H') {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('250000', 10)) {
			incTax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('250001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			incTax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('250000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('25000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			incTax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('125000', 10)));
		}

	}

	return incTax;

}

// To check Schedule FA is mandatory or not
function onChngBTTIRefund() {
	var typeHP = document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value;
	if (typeHP == 'YES') {
		addErrorXHTML('',
				'Schedule FA is mandatory. Ensure all the details in Schedule FA are filled');
	}
}

// To disable Schedule FA
function disableScheduleFA() {

	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	removeTableData('schFADtlsFrignAssets', resStatus);
	removeTableData('schFADtlsFinIntrest', resStatus);
	removeTableData('schFADtlsImmvbleProp', resStatus);
	removeTableData('schFADtlsOtherAsset', resStatus);
	removeTableData('schFADtlsSigningAuth', resStatus);
	removeTableData('schFADtlsTrusts', resStatus);
	removeTableData('DetailsOthIncomeOutsideIndia', resStatus);
}

// To remove Table Data
function removeTableData(tableID, resStatus) {

	var tab = document.getElementById(tableID);
	var asstFlag = document.getElementsByName('partBTTI.assetOutIndiaFlag')[0].value;

	if (!((resStatus == 'RES' || resStatus == 'NOR') && asstFlag == 'YES')) {
		$('#' + tableID + ' input').attr("checked", true);
		deleteRowTable(tableID, 3, 1);
		$('#' + tableID + ' input').attr("checked", false);
	}

	var allInputTags = tab.getElementsByTagName('input');
	var selectTags = tab.getElementsByTagName('select');

	for (var i = 0; i < allInputTags.length; i++) {
		if ((resStatus == 'RES' || resStatus == 'NOR') && asstFlag == 'YES') {
			allInputTags[i].disabled = false;
			allInputTags[i].readOnly = false;

		} else {

			allInputTags[i].disabled = true;
			allInputTags[i].readOnly = true;
			allInputTags[i].value = "";
		}
	}
	for (var i = 0; i < selectTags.length; i++) {
		if ((resStatus == 'RES' || resStatus == 'NOR') && asstFlag == 'YES') {
			selectTags[i].disabled = false;
		} else {
			selectTags[i].disabled = true;
			selectTags[i].value = "";

		}
	}
	if ((resStatus == 'RES' || resStatus == 'NOR') && asstFlag == 'YES') {
		tabs.enableTabs(26);
	}
}

// To enable Fields For Point E
function enableFieldsForPointE(tableId) {

	var tab = document.getElementById(tableId);
	var rows = tab.getElementsByTagName('tr');
	var rowCount = rows.length;

	for (var i = 0; i < rowCount - 4; i++) {
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

// To enable Fields For Point F
function enableFieldsForPointF(tableId) {

	var tab = document.getElementById(tableId);
	var rows = tab.getElementsByTagName('tr');
	var rowCount = rows.length;

	for (var i = 0; i < rowCount - 4; i++) {
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

// To enable Fields For Point G
function enableFieldsForPointG(tableId) {

	var tab = document.getElementById(tableId);
	var rows = tab.getElementsByTagName('tr');
	var rowCount = rows.length;

	for (var i = 0; i < rowCount - 4; i++) {
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

// To get Ifsc Bank Details
function getIfscBankDetails(elem) {

	var position = parseInt(elem.name.substring(elem.name.indexOf("[") + 1,
			elem.name.indexOf("]")));

	var ifscCode = document.getElementsByName('itr3.scheduleBA[' + position
			+ '].ifscCode')[0].value;

	document.getElementsByName('itr3.scheduleBA[' + position + '].bankName')[0].value = main
			.getBankName(ifscCode);

}

// To check number of CoOwners
function numberOfCoOwnersCheck(tableId, noRows) {
	var tab = document.getElementById(tableId);
	var rowCount = tab.rows.length;
	if (rowCount > noRows) {
		addErrorXHTML('', 'Cannot insert more than 5 rows', true);
		return false;
	}
	return true;

}

// To add Row in Schedule Hp table
function addRowToTableSchHp(tableId, noOfRow, last, elem) {

	addRowToTable(tableId, noOfRow, last);
	setSerialNumber(elem, 2);
}

// To add Row in Schedule Hp tenants table
function addRowToTableSchHpTenants(tableId, noOfRow, last, elem) {

	addRowToTable(tableId, noOfRow, last);
	setSerialNumberTenants(elem, 2);
}

// To calculate Schedule FSI
function calcScheduleFSI() {
	try {
		var table = document.getElementById('scheduleFSI');
		var noOfRows = table.rows.length;
		var indexValue = eval(((parseInt(noOfRows, 10) - 4) / 6));

		for (var i = 0; i < indexValue; i++) {

			document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
					+ "].totalCountryWise.incFrmOutsideInd")[0].value = eval(parseInt(
					coalesce(document
							.getElementsByName("itrScheduleFSI.scheduleFSI["
									+ i + "].incFromSal.incFrmOutsideInd")[0].value),
					10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incFromHP.incFrmOutsideInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incFromBusiness.incFrmOutsideInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incCapGain.incFrmOutsideInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incOthSrc.incFrmOutsideInd")[0].value),
							10));

			document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
					+ "].totalCountryWise.taxPaidOutsideInd")[0].value = eval(parseInt(
					coalesce(document
							.getElementsByName("itrScheduleFSI.scheduleFSI["
									+ i + "].incFromSal.taxPaidOutsideInd")[0].value),
					10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incFromHP.taxPaidOutsideInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incFromBusiness.taxPaidOutsideInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incCapGain.taxPaidOutsideInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incOthSrc.taxPaidOutsideInd")[0].value),
							10));

			document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
					+ "].totalCountryWise.taxPayableinInd")[0].value = eval(parseInt(
					coalesce(document
							.getElementsByName("itrScheduleFSI.scheduleFSI["
									+ i + "].incFromSal.taxPayableinInd")[0].value),
					10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i + "].incFromHP.taxPayableinInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incFromBusiness.taxPayableinInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incCapGain.taxPayableinInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i + "].incOthSrc.taxPayableinInd")[0].value),
							10));

			if (eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["
					+ i + "].incFromSal.taxPaidOutsideInd")[0].value) < eval(document
					.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
							+ "].incFromSal.taxPayableinInd")[0].value)) {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incFromSal.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incFromSal.taxPaidOutsideInd")[0].value;
			} else {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incFromSal.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incFromSal.taxPayableinInd")[0].value;
			}

			if (eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["
					+ i + "].incFromHP.taxPaidOutsideInd")[0].value) < eval(document
					.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
							+ "].incFromHP.taxPayableinInd")[0].value)) {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incFromHP.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incFromHP.taxPaidOutsideInd")[0].value;
			} else {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incFromHP.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incFromHP.taxPayableinInd")[0].value;
			}

			if (eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["
					+ i + "].incFromBusiness.taxPaidOutsideInd")[0].value) < eval(document
					.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
							+ "].incFromBusiness.taxPayableinInd")[0].value)) {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incFromBusiness.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incFromBusiness.taxPaidOutsideInd")[0].value;
			} else {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incFromBusiness.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incFromBusiness.taxPayableinInd")[0].value;
			}

			if (eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["
					+ i + "].incCapGain.taxPaidOutsideInd")[0].value) < eval(document
					.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
							+ "].incCapGain.taxPayableinInd")[0].value)) {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incCapGain.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incCapGain.taxPaidOutsideInd")[0].value;
			} else {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incCapGain.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incCapGain.taxPayableinInd")[0].value;
			}

			if (eval(document.getElementsByName("itrScheduleFSI.scheduleFSI["
					+ i + "].incOthSrc.taxPaidOutsideInd")[0].value) < eval(document
					.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
							+ "].incOthSrc.taxPayableinInd")[0].value)) {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incOthSrc.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incOthSrc.taxPaidOutsideInd")[0].value;
			} else {
				document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
						+ "].incOthSrc.taxReliefinInd")[0].value = document
						.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
								+ "].incOthSrc.taxPayableinInd")[0].value;
			}

			document.getElementsByName("itrScheduleFSI.scheduleFSI[" + i
					+ "].totalCountryWise.taxReliefinInd")[0].value = eval(parseInt(
					coalesce(document
							.getElementsByName("itrScheduleFSI.scheduleFSI["
									+ i + "].incFromSal.taxReliefinInd")[0].value),
					10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i + "].incFromHP.taxReliefinInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i
											+ "].incFromBusiness.taxReliefinInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i + "].incCapGain.taxReliefinInd")[0].value),
							10))
					+ eval(parseInt(
							coalesce(document
									.getElementsByName("itrScheduleFSI.scheduleFSI["
											+ i + "].incOthSrc.taxReliefinInd")[0].value),
							10));
		}
		populateTR();
	} catch (e) {
		alert('error in calcScheduleFSI = ' + e.stack);
	}
}

// To add Row for Schedule FSI
function addRowSchedFSIFor2(nocheck) {

	var mainTable = document.getElementById('scheduleFSI').rows;
	var noOfRows = mainTable.length;

	var tobeInsertBefore = document.getElementById('scheduleFSIAddRow');
	var flag = true;
	var checkFirst = true;
	var totRow = document.getElementById('scheduleFSIFirst').cells[0].textContent;

	var iterate = eval(parseInt(totRow, 10));

	var indexValue = eval(((parseInt(noOfRows, 10) - 4) / 6) + 1);

	var isRowBlank = true;
	for (var i = 0; i < 6; i++) {
		if (!checkRowBlank('scheduleFSI', (3 + i), 0)) {
			isRowBlank = false;
			break;
		}
	}

	if (!isRowBlank || nocheck) {

		for (var i = 2; i < mainTable.length; i++) {
			var cloneNode = mainTable[i].cloneNode(true);
			if (flag) {
				if (checkFirst) {
					iterate = eval(indexValue - 1);

					cloneNode.cells[0].innerHTML = indexValue;
					checkFirst = false;
				}

				// Numbering
				var inputTags = cloneNode.getElementsByTagName('input');
				for (var a = 0; a < inputTags.length; a++) {
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

				var selectTags = cloneNode.getElementsByTagName('select');
				for (var a = 0; a < selectTags.length; a++) {
					selectTags[a].name = selectTags[a].name.replace('[0]', '['
							+ iterate + ']');
					selectTags[a].value = '';

					selectTags[a].id = selectTags[a].name.replace(
							/([\.\[\]])/g, '_').replace(/(__)/g, '_');

					var blurAttr = selectTags[a].getAttribute('onblur');
					if (blurAttr != null) {
						blurAttr = blurAttr + ";";
					} else {
						blurAttr = "";
					}
					selectTags[a].setAttribute('onblur', blurAttr
							+ 'j.blur(this,this.name,this.value);');
				}

				document.getElementById('scheduleFSI').getElementsByTagName(
						'tr')[0].parentNode.insertBefore(cloneNode,
						tobeInsertBefore);
			}
			if (mainTable[i].id == 'scheduleFSIEnd') {
				flag = false;
				break;
			}
		}
		if ($('#scheduleFSIAddRow')[0].parentNode.children.length == 10) {
			$('#delFSIButtonId').prop('disabled', true);
		} else if ($('#scheduleFSIAddRow')[0].parentNode.children.length > 10) {
			$('#delFSIButtonId').prop('disabled', false);
		}

	} else {
		addErrorXHTML(
				'',
				'Please fill in all the mandatory fields in the last row before adding another row.');
	}
	checkMaxLengthLimit();
}

// To add Schedule SI Row
function addSchSIRow(SecCode, SecCodeValue) {
	try {
		var tableId = document.getElementById('scheduleSI');
		var mainTable = document.getElementById('scheduleSI').rows;
		var noOfRows = tableId.rows.length;
		var toInsertBefore = document.getElementById('scheduleSILastRow');

		var lastIndex = eval(parseInt(noOfRows, 10) - 2);

		var cloneNode = mainTable[lastIndex].cloneNode(true);
		var newSlNo = cloneNode.cells[0].textContent;

		var iterate = eval(parseInt(newSlNo, 10) - 1);
		;
		cloneNode.cells[0].innerHTML = eval(parseInt(newSlNo, 10) + 1);
		// getSection
		cloneNode.cells[1].innerHTML = getSectionTextMap(SecCode);
		var inputTags = cloneNode.getElementsByTagName('input');
		for (var a = 0; a < inputTags.length; a++) {

			inputTags[a].name = inputTags[a].name.replace('[' + iterate + ']',
					'[' + lastIndex + ']');

			inputTags[a].id = inputTags[a].name.replace(/([\.\[\]])/g, '_')
					.replace(/(__)/g, '_');
			// Display Section Rate
			inputTags[1].value = getSectionTaxRate(SecCode);
			// Income
			inputTags[2].value = zeroOrMore(parseInt(SecCodeValue, 10));

			if (inputTags[a].getAttribute('type') == 'hidden'
					&& inputTags[a].name.match("secCode$")) {
				inputTags[a].value = SecCode;
			}

			var blurAttr = inputTags[a].getAttribute('onblur');
			if (blurAttr != null) {
				blurAttr = blurAttr + ";";
			} else {
				blurAttr = "";
			}
			inputTags[a].setAttribute('onblur', blurAttr
					+ 'j.blur(this,this.name,this.value);');
		}
		document.getElementById('scheduleSI').getElementsByTagName('tr')[0].parentNode
				.insertBefore(cloneNode, toInsertBefore);

	} catch (e) {
		alert('addSchSIRow' + e);
	}
}

// To populate schedule SI values
function populateSI(cgosIncome, simap) {
	try {
		updateMapForSI(cgosIncome, simap);

		// 111
		document.getElementsByName('scheduleSI.splCodeRateTax[0].splRateInc')[0].value = zeroOrMore(parseInt(
				cgosIncome.osInc.sec111, 10));

		// DTAAOS
		document.getElementsByName('scheduleSI.splCodeRateTax[1].splRateInc')[0].value = zeroOrMore(parseInt(
				document
						.getElementsByName('scheduleOS.incChargblSplRateOS.nriIncTaxDtaa.totAmtUnderDtaa')[0].value,
				10));

		// 111A
		document.getElementsByName('scheduleSI.splCodeRateTax[2].splRateInc')[0].value = zeroOrMore(parseInt(
				cgosIncome.cgInc.stcg.prctg15.sec111a, 10));

		// 112
		document.getElementsByName('scheduleSI.splCodeRateTax[3].splRateInc')[0].value = zeroOrMore(parseInt(
				cgosIncome.cgInc.ltcg.prctg20.sec112, 10));

		// 112proviso
		document.getElementsByName('scheduleSI.splCodeRateTax[4].splRateInc')[0].value = zeroOrMore(parseInt(
				cgosIncome.cgInc.ltcg.prctg10.secProviso, 10));

		// 112(1)(c)(iii)
		document.getElementsByName('scheduleSI.splCodeRateTax[5].splRateInc')[0].value = zeroOrMore(parseInt(
				cgosIncome.cgInc.ltcg.prctg10.sec112_1_c_2, 10));

		// 5BB
		document.getElementsByName('scheduleSI.splCodeRateTax[6].splRateInc')[0].value = zeroOrMore(parseInt(cgosIncome.osInc.sec115BB));
		// 5ADii
		document.getElementsByName('scheduleSI.splCodeRateTax[7].splRateInc')[0].value = zeroOrMore(parseInt(
				cgosIncome.cgInc.stcg.prctg30, 10));

		deleteSIRow();
		for ( var i in simap) {
			if (simap[i] != 'undefined' && simap[i] != null && simap[i] != 0) {
				var secAdded = checkSectionAddedSI(i, simap[i]);
				if (!secAdded
						&& !(i == '68' || i == '69' || i == '69A' || i == '69B'
								|| i == '69C' || i == '69D')) {
					addSchSIRow(i, simap[i]);
				}
			}

		}
		for ( var si in simap) {

			simap[si] = '';
		}
		calcScheduleSI();
	} catch (e) {
		alert('Error in populateSI:' + e);
	}
}

// To check the given Section Added in schedule SI or not
function checkSectionAddedSI(secCode, secValue) {
	try {
		var tab = document.getElementById('scheduleSI');
		var noofRows = tab.rows.length;
		var secAdded = false;
		for (var i = 0; i < eval(parseInt(noofRows, 10) - 3); i++) {

			if (document.getElementsByName('scheduleSI.splCodeRateTax[' + i
					+ '].secCode')[0].value == secCode) {
				document.getElementsByName('scheduleSI.splCodeRateTax[' + i
						+ '].splRateInc')[0].value = zeroOrMore(parseInt(
						secValue, 10));
				secAdded = true;
			}

		}
		return secAdded;
	} catch (e) {
		alert('error in checkSectionAddedSI' + e);
	}
}

// To delete schedule SI Row
function deleteSIRow() {
	try {
		var siTable = document.getElementById('scheduleSI');
		var noRows = siTable.rows.length;
		if (parseInt(noRows, 10) > 10) {

			for (var i = 9; i < parseInt(noRows, 10) - 1; i++) {
				siTable.deleteRow(9);
			}

		}

	} catch (e) {
		alert('Error in deleteSIRow:' + e);
	}
}

// To get SI Section Text Map
function getSectionTextMap(key) {
	var sectionTextMap = {
		"1" : "111 - Tax on accumulated balance of recognised PF",
		"1A" : "111A (STCG on shares where STT paid)",
		"21" : "112 (LTCG on others)",
		"22" : "112 proviso (LTCG on listed securities/ units without indexation)",
		"21ciii" : "112(1)(c)(iii)(LTCG on unlisted securities in case of non-residents)",
		"5A1ai" : "115A(1)(a)(i)- Dividends interest and income from units purchase in foreign currency",
		"5A1aii" : "115A(1)(a)(ii)- Interest received from govt/Indian Concerns recived in Foreign Currency",
		"5A1aiia" : "115A(1) (a)(iia) -Interest from Infrastructure Debt Fund",
		"5A1aiiaa" : "115A(1) (a)(iiaa) -Interest as per Sec. 194LC",
		"5A1aiiab" : "115A(1) (a)(iiab) -Interest as per Sec. 194LD",
		"5A1aiiac" : "115A(1)(a)(iiac) -Interest as per Sec. 194LBA",
		"5A1aiii" : "115A(1) (a)(iii) - Income received in respect of units of UTI purchased in Foreign Currency",
		"5A1bA" : "115A(1)(b)(A)- Income from royalty & technical services",
		"5A1bB" : "115A(1)(b)(B) Income from royalty & technical services",
		"5AC1ab" : "115AC(1)(a & b) - Income from bonds or GDR purchased in foreign currency - non-resident",
		"5AC1c" : "115AC(1)(c) -LTCG arising from the transfer of bonds or GDR purchased in foreign currency - non-resident",
		"5ACA1a" : "115ACA(1)(a) - Income from GDR purchased in foreign currency -resident",
		"5ACA1b" : "115ACA(1)(b) - LTCG arising from the transfer of GDR purchased in foreign currency -resident",
		"5AD1i" : "115AD(1)(i) -Income received by an FII in respect of securities (other than units as per Sec 115AB)",
		"5AD1iP" : "115AD(1)(i) -Income received by an FII in respect of bonds or government securities as per Sec 194LD ",
		"5ADii" : "115AD(1)(ii) -STCG (other than on equity share or equity oriented mutual fund referred to in section 111A) by an FII",
		"5ADiii" : "115AD(1)(iii)-Long term capital gains by an FII",
		"5B" : "115B - Profits and gains of life insurance business",
		"5BB" : "115BB (Winnings from lotteries, puzzles, races, games etc.)",
		"5BBA" : "115BBA - Tax on non-residents sportsmen or sports associations",
		"5BBC" : "115BBC - Anonymous donations",
		"5BBDA" : "115BBDA - Dividend income from domestic company",
		"5BBE" : "115BBE - Tax on income referred to in sections 68 or 69 or 69A or 69B or 69C or 69D",
		"5BBF" : "115BBF - Tax on income from patent",
		"5Ea" : "115E(a) - Investment income",
		"5Eacg" : "115E(a)-LTCG on any asset other than a specified asset-non resident Indian",
		"5Eb" : "115E(b) - Income by way of long term capital gains",
		"DTAAOS" : "OS - Chargeable at DTAA Rate",
		"5AD1biip" : "115AD(1)(b)(ii)- Short term capital gains referred to in section 111A",
		"Others" : "Others"
	};

	return sectionTextMap[key];
}

// To get Section Tax Rate for schedule SI
function getSectionTaxRate(key) {
	var sectionRateMap = {
		"1A" : "15",
		"21" : "20",
		"22" : "10",
		"21ciii" : "10",
		"5A1ai" : "20",
		"5A1aii" : "20",
		"5A1aiia" : "5",
		"5A1aiiaa" : "5",
		"5A1aiiab" : "5",
		"5A1aiiac" : "5",
		"5A1aiii" : "20",
		"5A1bA" : "10",
		"5A1bB" : "10",
		"5AC1ab" : "10",
		"5AC1c" : "10",
		"5ACA1a" : "10",
		"5ACA1b" : "10",
		"5AD1i" : "20",
		"5AD1iP" : "5",
		"5ADii" : "30",
		"5ADiii" : "10",
		"5B" : "12.5",
		"5BB" : "30",
		"5BBA" : "20",
		"5BBC" : "30",
		"5BBDA" : "10",
		"5BBE" : "60",
		"5BBF" : "10",
		"5Ea" : "20",
		"5Eacg" : "20",
		"5Eb" : "10",
		"5AD1biip" : "15"
	};

	return sectionRateMap[key];

}

// To validate FSI table
function validateFSI() {
	var table = document.getElementById('scheduleFSI');
	var noOfRows = table.rows.length;
	var indexValue = eval(((parseInt(noOfRows, 10) - 4) / 6));
	var empty1, empty2, empty3, empty4;
	for (var i = 0; i < indexValue; i++) {
		if (document.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
				+ '].countryCode')[0].value != '') {
			var empty = true;
			var errors = [
					'Income from outside India(included in PART B-TI) is required',
					'Tax paid outside India is required',
					'Tax payable on such income under normal provisions in India is required',
					'Relevant article of DTAA if relief claimed u/s 90 or 90A is required' ];
			empty1 = empty
					&& !validateAllFilled([
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromSal.incFrmOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromSal.taxPaidOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromSal.taxPayableinInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromSal.dtaaReliefUs90or90A' ],
							errors);
			empty2 = empty
					&& !validateAllFilled([
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromHP.incFrmOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromHP.taxPaidOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromHP.taxPayableinInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incFromHP.dtaaReliefUs90or90A' ],
							errors);
			empty3 = empty
					&& !validateAllFilled([
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incCapGain.incFrmOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incCapGain.taxPaidOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incCapGain.taxPayableinInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incCapGain.dtaaReliefUs90or90A' ],
							errors);
			empty4 = empty
					&& !validateAllFilled([
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incOthSrc.incFrmOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incOthSrc.taxPaidOutsideInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incOthSrc.taxPayableinInd',
							'itrScheduleFSI.scheduleFSI[' + i
									+ '].incOthSrc.dtaaReliefUs90or90A' ],
							errors);
			empty5 = empty
					&& !validateAllFilled(
							[
									'itrScheduleFSI.scheduleFSI['
											+ i
											+ '].incFromBusiness.incFrmOutsideInd',
									'itrScheduleFSI.scheduleFSI['
											+ i
											+ '].incFromBusiness.taxPaidOutsideInd',
									'itrScheduleFSI.scheduleFSI['
											+ i
											+ '].incFromBusiness.taxPayableinInd',
									'itrScheduleFSI.scheduleFSI['
											+ i
											+ '].incFromBusiness.dtaaReliefUs90or90A' ],
							errors);
			if (empty1 && empty2 && empty3 && empty4 && empty5) {
				j.setFieldError('itrScheduleFSI.scheduleFSI[' + i
						+ '].countryCode', 'Please fill atleast one income');
				addErrorXHTML(document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].countryCode')[0],
						'Please fill atleast one income', true);
			}
		}
	}
}

// To validate fields
function validateAllFilled(fieldNames, errors) {
	var fields = [];
	var filled = 0;
	for (var i = 0; i < fieldNames.length; i++) {
		fields[i] = document.getElementsByName(fieldNames[i])[0];
		if (fields[i].value != '' && fields[i].value != undefined) {
			filled++;
		}
	}
	if (filled > 0) {
		for (var i = 0; i < fieldNames.length; i++) {
			if (fields[i].value == '' || fields[i].value == undefined) {
				if (i == fieldNames.length - 1) {
					if (Math.min(coalesce(fields[1].value),
							coalesce(fields[2].value)) == parseInt(0)) {
						continue;
					}
				}
				j.setFieldError(fieldNames[i], errors[i]);
				addErrorXHTML(fields[i], errors[i], true);
				break;
			}
		}
		return true;
	}
	return false;
}

// To validate CG deduction date
function validateCGDedDate() {
	var tab = document.getElementById('schduleCGDed');
	var selects = tab.getElementsByTagName('SELECT');

	for (var i = 0; i < selects.length; i++) {
		var name = selects[i].name;
		var index = name.substring(name.indexOf("[") + 1, name.indexOf("]"));
		var dedDt = document
				.getElementsByName('scheduleCGPost45.deducClaimInfo.deducClaimDtls['
						+ index + '].dateofAcquist')[0];
		if (dedDt != '' && selects[i].value != '') {
			if (isFirstDateBefore(dedDt.value, Cg_ded_start_date)
					|| isFirstDateBefore(Cg_ded_end_date, dedDt.value)) {
				j.setFieldError(dedDt.name,
						'Date must be between 01/04/2015 and 31/03/2019');
				addErrorXHTML(dedDt,
						'Date must be between 01/04/2015 and 31/03/2019', true);
			}
		}
	}
}

// To calculate Schedule 5A
function checkSchedule5A() {
	var hpIncome1 = document
			.getElementsByName('schedule5A2014.hPHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome1 = document
			.getElementsByName('schedule5A2014.hPHeadIncome.amtApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome1, 10) > parseInt(hpIncome1, 10)) {
		j
				.setFieldError(
						'schedule5A2014.hPHeadIncome.amtApprndOfSpouse',
						'Amount apportioned in the hands of the spouse in House Property cannot exceed Income received under the head');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.hPHeadIncome.amtApprndOfSpouse')[0],
				'Amount apportioned in the hands of the spouse in House Property cannot exceed Income received under the head',
				true);
	}

	var hpIncome2 = document
			.getElementsByName('schedule5A2014.hPHeadIncome.amtTDSDeducted')[0].value;
	var busHeadIncome2 = document
			.getElementsByName('schedule5A2014.hPHeadIncome.tDSApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome2, 10) > parseInt(hpIncome2, 10)) {
		j
				.setFieldError(
						'schedule5A2014.hPHeadIncome.tDSApprndOfSpouse',
						'TDS apportioned in the hands of spouse in House Property cannot exceed Amount of TDS deducted on income at (ii)');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.hPHeadIncome.tDSApprndOfSpouse')[0],
				'TDS apportioned in the hands of spouse in House Property cannot exceed Amount of TDS deducted on income at (ii)',
				true);
	}

	var hpIncome3 = document
			.getElementsByName('schedule5A2014.busHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome3 = document
			.getElementsByName('schedule5A2014.busHeadIncome.amtApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome3, 10) > parseInt(hpIncome3, 10)) {
		j
				.setFieldError(
						'schedule5A2014.busHeadIncome.amtApprndOfSpouse',
						'Amount apportioned in the hands of the spouse in Business/Profession cannot exceed Income received under the head');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.busHeadIncome.amtApprndOfSpouse')[0],
				'Amount apportioned in the hands of the spouse in Business/Profession cannot exceed Income received under the head',
				true);
	}

	var hpIncome4 = document
			.getElementsByName('schedule5A2014.busHeadIncome.amtTDSDeducted')[0].value;
	var busHeadIncome4 = document
			.getElementsByName('schedule5A2014.busHeadIncome.tDSApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome4, 10) > parseInt(hpIncome4, 10)) {
		j
				.setFieldError(
						'schedule5A2014.busHeadIncome.tDSApprndOfSpouse',
						'TDS apportioned in the hands of spouse in Business/Profession cannot exceed Amount of TDS deducted on income at (ii)');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.busHeadIncome.tDSApprndOfSpouse')[0],
				'TDS apportioned in the hands of spouse in Business/Profession cannot exceed Amount of TDS deducted on income at (ii)',
				true);
	}

	var hpIncome5 = document
			.getElementsByName('schedule5A2014.capGainHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome5 = document
			.getElementsByName('schedule5A2014.capGainHeadIncome.amtApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome5, 10) > parseInt(hpIncome5, 10)) {
		j
				.setFieldError(
						'schedule5A2014.capGainHeadIncome.amtApprndOfSpouse',
						'Amount apportioned in the hands of the spouse in Capital Gains cannot exceed Income received under the head');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.capGainHeadIncome.amtApprndOfSpouse')[0],
				'Amount apportioned in the hands of the spouse in Capital Gains cannot exceed Income received under the head',
				true);
	}

	var hpIncome6 = document
			.getElementsByName('schedule5A2014.capGainHeadIncome.amtTDSDeducted')[0].value;
	var busHeadIncome6 = document
			.getElementsByName('schedule5A2014.capGainHeadIncome.tDSApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome6, 10) > parseInt(hpIncome6, 10)) {
		j
				.setFieldError(
						'schedule5A2014.capGainHeadIncome.tDSApprndOfSpouse',
						'TDS apportioned in the hands of spouse in Capital Gains cannot exceed Amount of TDS deducted on income at (ii)');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.capGainHeadIncome.tDSApprndOfSpouse')[0],
				'TDS apportioned in the hands of spouse in Capital Gains cannot exceed Amount of TDS deducted on income at (ii)',
				true);
	}

	var hpIncome7 = document
			.getElementsByName('schedule5A2014.otherSourcesHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome7 = document
			.getElementsByName('schedule5A2014.otherSourcesHeadIncome.amtApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome7, 10) > parseInt(hpIncome7, 10)) {
		j
				.setFieldError(
						'schedule5A2014.otherSourcesHeadIncome.amtApprndOfSpouse',
						'Amount apportioned in the hands of the spouse in Other sources cannot exceed Income received under the head');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.otherSourcesHeadIncome.amtApprndOfSpouse')[0],
				'Amount apportioned in the hands of the spouse in Other sources cannot exceed Income received under the head',
				true);
	}

	var hpIncome8 = document
			.getElementsByName('schedule5A2014.otherSourcesHeadIncome.amtTDSDeducted')[0].value;
	var busHeadIncome8 = document
			.getElementsByName('schedule5A2014.otherSourcesHeadIncome.tDSApprndOfSpouse')[0].value;
	if (parseInt(busHeadIncome8, 10) > parseInt(hpIncome8, 10)) {
		j
				.setFieldError(
						'schedule5A2014.otherSourcesHeadIncome.tDSApprndOfSpouse',
						'TDS apportioned in the hands of spouse in Other sources cannot exceed Amount of TDS deducted on income at (ii)');
		addErrorXHTML(
				document
						.getElementsByName('schedule5A2014.otherSourcesHeadIncome.tDSApprndOfSpouse')[0],
				'TDS apportioned in the hands of spouse in Other sources cannot exceed Amount of TDS deducted on income at (ii)',
				true);
	}

	var hpIncome9 = document
			.getElementsByName('schedule5A2014.hPHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome9 = document
			.getElementsByName('schedule5A2014.hPHeadIncome.amtTDSDeducted')[0].value;
	if (parseInt(busHeadIncome9, 10) > parseInt(hpIncome9, 10)) {
		j
				.setFieldError(
						'schedule5A2014.hPHeadIncome.amtTDSDeducted',
						'Amount of TDS deducted on income at (ii) should not exceed Income received under the head');
		addErrorXHTML(
				'',
				'Amount of TDS deducted on income at (ii) should not exceed Income received under the head',
				true);
	}

	var hpIncome12 = document
			.getElementsByName('schedule5A2014.busHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome12 = document
			.getElementsByName('schedule5A2014.busHeadIncome.amtTDSDeducted')[0].value;
	if (parseInt(busHeadIncome12, 10) > parseInt(hpIncome12, 10)) {
		j
				.setFieldError(
						'schedule5A2014.busHeadIncome.amtTDSDeducted',
						'Amount of TDS deducted on income at (ii) should not exceed Income received under the head');
		addErrorXHTML(
				'',
				'Amount of TDS deducted on income at (ii) should not exceed Income received under the head',
				true);
	}

	var hpIncome10 = document
			.getElementsByName('schedule5A2014.capGainHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome10 = document
			.getElementsByName('schedule5A2014.capGainHeadIncome.amtTDSDeducted')[0].value;
	if (parseInt(busHeadIncome10, 10) > parseInt(hpIncome10, 10)) {
		j
				.setFieldError(
						'schedule5A2014.capGainHeadIncome.amtTDSDeducted',
						'Amount of TDS deducted on income at (ii) should not exceed Income received under the head');
		addErrorXHTML(
				'',
				'Amount of TDS deducted on income at (ii) should not exceed Income received under the head',
				true);
	}

	var hpIncome11 = document
			.getElementsByName('schedule5A2014.otherSourcesHeadIncome.incRecvdUndHead')[0].value;
	var busHeadIncome11 = document
			.getElementsByName('schedule5A2014.otherSourcesHeadIncome.amtTDSDeducted')[0].value;
	if (parseInt(busHeadIncome11, 10) > parseInt(hpIncome11, 10)) {
		j
				.setFieldError(
						'schedule5A2014.otherSourcesHeadIncome.amtTDSDeducted',
						'Amount of TDS deducted on income at (ii) should not exceed Income received under the head');
		addErrorXHTML(
				'',
				'Amount of TDS deducted on income at (ii) should not exceed Income received under the head',
				true);
	}

}

// To give warning message for schedule FSI
function scheduleFSIAlert() {
	var tableFSI = checkRowBlank('scheduleFSI', 8, 2);
	if (tableFSI == false) {

		addErrorXHTML(
				'',
				'Please ensure that the incomes shown in Schedule FSI  are also reflected under respective income schedules.');

	}

}

// To Check schedule HP Share Property value
function CheckHPShareProperty() {
	var totHp = eval(parseInt(document.getElementById('scheduleHPLast').cells[0].textContent) - 1);

	for (var i = 0; i < totHp; i++) {

		if (document.getElementsByName('scheduleHP.propertyDetails[' + i
				+ '].propCoOwnedFlg')[0].value == 'YES') {
			var count = i;
			var AssessPerc = document
					.getElementsByName('scheduleHP.propertyDetails[' + i
							+ '].asseseeShareProperty')[0];
			var tab = document.getElementById('scheduleHP' + (++count));

			var sumOfCoOwner = parseFloat('0');

			var rowCount = tab.rows.length;

			for (var k = 0; k < rowCount - 2; k++) {

				sumOfCoOwner = sumOfCoOwner
						+ (mulFloatBy100(document
								.getElementsByName('scheduleHP.propertyDetails['
										+ i
										+ '].coOwners['
										+ k
										+ '].percentShareProperty')[0].value));
			}

			if (checkHPShareSum((parseInt(sumOfCoOwner) + mulFloatBy100(AssessPerc.value)) / 100)) {
				addErrorXHTML(
						AssessPerc,
						'Sum of Assessee Percentage and Co-owner(s) Percentage should be equal to 100 percent',
						true);
				j
						.setFieldError(
								'scheduleHP.propertyDetails[' + i
										+ '].asseseeShareProperty',
								'Sum of Assessee Percentage and Co-owner(s) Percentage should be equal to 100 percent');
			}
		}
	}
}

// To check schedule HP Share Sum value
function checkHPShareSum(total) {
	if (total >= 99.9 && total <= 100) {
		return false;
	}
	return true;
}

// To populate schedule TR values
function populateTR() {
	try {
		deleteTRRow();
		var fsiTable = document.getElementById('scheduleFSI');
		var noRows = (fsiTable.rows.length - 4) / 6;
		var pos = document
				.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].selectedIndex;

		document.getElementsByName('scheduleTR1.scheduleTR[0].countryCode')[0].value = document
				.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].value;
		document.getElementsByName('scheduleTR1.scheduleTR[0].countryName')[0].value = document
				.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryName')[0].value;

		if (document
				.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].options[pos].text == "Select") {
			document
					.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value = '';
		} else {
			document
					.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value = document
					.getElementsByName('itrScheduleFSI.scheduleFSI[0].countryCode')[0].options[pos].text;
		}

		document
				.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value = document
				.getElementsByName('itrScheduleFSI.scheduleFSI[0].taxIdentificationNo')[0].value;
		document
				.getElementsByName('scheduleTR1.scheduleTR[0].taxPaidOutsideIndia')[0].value = document
				.getElementsByName('itrScheduleFSI.scheduleFSI[0].totalCountryWise.taxPaidOutsideInd')[0].value;
		document
				.getElementsByName('scheduleTR1.scheduleTR[0].taxReliefOutsideIndia')[0].value = document
				.getElementsByName('itrScheduleFSI.scheduleFSI[0].totalCountryWise.taxReliefinInd')[0].value;

		var firstSecCode = document
				.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value
				+ '_'
				+ document
						.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value;

		document
				.getElementsByName('scheduleTR1.scheduleTR[0].relavantArticleDTAA')[0].value = sectionClaimed[firstSecCode];

		if (noRows > 1) {

			var countryCodeName = '';
			var taxIdentificationNo = '';
			var taxPaidOutsideIndia = '';
			var taxReliefOutsideIndia = '';

			for (var i = 1; i < noRows; i++) {
				var index = document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].countryCode')[0].selectedIndex;

				countryCodeName = document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].countryCode')[0].options[index].text;

				if (countryCodeName == "Select") {
					countryCodeName = '';
				}

				taxIdentificationNo = document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].taxIdentificationNo')[0].value;
				taxPaidOutsideIndia = document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].totalCountryWise.taxPaidOutsideInd')[0].value;
				taxReliefOutsideIndia = document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].totalCountryWise.taxReliefinInd')[0].value;

				addSchTRRow(countryCodeName, taxIdentificationNo,
						taxPaidOutsideIndia, taxReliefOutsideIndia);

				var countryCode = document
						.getElementsByName('scheduleTR1.scheduleTR[' + i
								+ '].countryCode')[0];
				var countryName = document
						.getElementsByName('scheduleTR1.scheduleTR[' + i
								+ '].countryName')[0];

				countryCode.value = document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].countryCode')[0].value;
				countryName.value = document
						.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
								+ '].countryName')[0].value;

				document.getElementsByName('scheduleTR1.scheduleTR[' + i
						+ '].relavantArticleDTAA')[0].value = sectionClaimed[countryCodeName
						+ '_' + taxIdentificationNo];

			}

		}
		for (var i = 0; i < noRows; i++) {
			var relavantArticleDTAA = document
					.getElementsByName('scheduleTR1.scheduleTR[' + i
							+ '].relavantArticleDTAA')[0];
			if (relavantArticleDTAA.value != '90'
					&& relavantArticleDTAA.value != '90A'
					&& relavantArticleDTAA.value != '91') {
				relavantArticleDTAA.value = '';
			}
		}
		totAmtOfSchedTR('scheduleTR');
	} catch (e) {
		alert('Error in populateTR:' + e);
	}

}

var sectionClaimed = {};

// To delete schedule TR Row
function deleteTRRow() {
	try {
		var trTable = document.getElementById('scheduleTR');
		var noRows = trTable.rows.length;

		if (parseInt(noRows, 10) > 4) {
			for (var i = 2; i < parseInt(noRows, 10) - 3; i++) {
				var countryCode = document
						.getElementsByName('scheduleTR1.scheduleTR[' + (i - 1)
								+ '].countryCodeName')[0];
				var taxIdentificationNo = document
						.getElementsByName('scheduleTR1.scheduleTR[' + (i - 1)
								+ '].taxIdentificationNo')[0];
				sectionClaimed[countryCode.value + '_'
						+ taxIdentificationNo.value] = document
						.getElementsByName('scheduleTR1.scheduleTR[' + (i - 1)
								+ '].relavantArticleDTAA')[0].value;
				trTable.deleteRow(3);
			}
		}
		sectionClaimed[document
				.getElementsByName('scheduleTR1.scheduleTR[0].countryCodeName')[0].value
				+ '_'
				+ document
						.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value] = document
				.getElementsByName('scheduleTR1.scheduleTR[0].relavantArticleDTAA')[0].value;

		document.getElementsByName('scheduleTR1.scheduleTR[0].countryCode')[0].value = '';
		document
				.getElementsByName('scheduleTR1.scheduleTR[0].taxIdentificationNo')[0].value = '';
		document
				.getElementsByName('scheduleTR1.scheduleTR[0].taxPaidOutsideIndia')[0].value = '';
		document
				.getElementsByName('scheduleTR1.scheduleTR[0].taxReliefOutsideIndia')[0].value = '';

	} catch (e) {
		alert('Error in deleteTRRow:' + e);
	}
}

// To add Schedule TR Row
function addSchTRRow(countryCodeName, taxIdentificationNo, taxPaidOutsideIndia,
		taxReliefOutsideIndia) {
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
		for (var a = 0; a < inputTags.length; a++) {
			inputTags[a].name = inputTags[a].name.replace('[' + iterate + ']',
					'[' + (lastIndex - 1) + ']');

			inputTags[a].id = inputTags[a].name.replace(/([\.\[\]])/g, '_')
					.replace(/(__)/g, '_');

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
			inputTags[a].setAttribute('onblur', blurAttr
					+ 'j.blur(this,this.name,this.value);');
		}

		for (var a = 0; a < selectTags.length; a++) {
			selectTags[a].name = selectTags[a].name.replace(
					'[' + iterate + ']', '[' + (lastIndex - 1) + ']');
			selectTags[a].id = selectTags[a].name.replace(/([\.\[\]])/g, '_')
					.replace(/(__)/g, '_');

			var blurAttr = inputTags[a].getAttribute('onblur');
			if (blurAttr != null) {
				blurAttr = blurAttr + ";";
			} else {
				blurAttr = "";
			}
			selectTags[a].setAttribute('onblur', blurAttr
					+ 'j.blur(this,this.name,this.value);');
		}
		document.getElementById('scheduleTR').getElementsByTagName('tr')[0].parentNode
				.insertBefore(cloneNode, toInsertBefore);

	} catch (e) {
		alert('addSchTRRow' + e);
	}
}

// To set country value in schedule TR onLoad
function schTRonLoad() {

	var fsiTable = document.getElementById('scheduleFSI');
	var noRows = (fsiTable.rows.length - 4) / 6;

	for (var i = 0; i < noRows; i++) {
		var index = document.getElementsByName('itrScheduleFSI.scheduleFSI['
				+ i + '].countryCode')[0].selectedIndex;
		var countryCodeName = document
				.getElementsByName('scheduleTR1.scheduleTR[' + i
						+ '].countryCodeName')[0];

		countryCodeName.value = document
				.getElementsByName('itrScheduleFSI.scheduleFSI[' + i
						+ '].countryCode')[0].options[index].text;

		if (countryCodeName.value == "Select") {
			countryCodeName.value = '';
		}
	}
	totAmtOfSchedTR();
}

// To enable Schedule BA Account Status
function enableScheduleBAAccountStatus(elem) {
	var position = parseInt(elem.name.substring(elem.name.indexOf("[") + 1,
			elem.name.indexOf("]")));

	var index = elem.selectedIndex;
	if (index == 1) {
		document.getElementsByName('itr3.scheduleBA[' + position
				+ '].accBalance')[0].value = '0';
		document.getElementsByName('itr3.scheduleBA[' + position
				+ '].accBalance')[0].disabled = true;
	} else if (index == 2) {
		document.getElementsByName('itr3.scheduleBA[' + position
				+ '].accBalance')[0].value = '';
		document.getElementsByName('itr3.scheduleBA[' + position
				+ '].accBalance')[0].disabled = false;
	} else {
		document.getElementsByName('itr3.scheduleBA[' + position
				+ '].accBalance')[0].disabled = true;
		document.getElementsByName('itr3.scheduleBA[' + position
				+ '].accBalance')[0].value = '';
	}

}

// To enable Schedule BA Account Status On Load
function enableScheduleBAAccountStatusOnLoad() {

	var table = document.getElementById('scheduleBA');
	var rows = table.getElementsByTagName('tr');
	var rowCount = rows.length;

	for (var i = 0; i < rowCount - 2; i++) {
		var selectedOptionValue = document.getElementsByName('itr3.scheduleBA['
				+ i + '].accStatusFlag')[0].value;

		if (selectedOptionValue == 'C') {
			document.getElementsByName('itr3.scheduleBA[' + i + '].accBalance')[0].disabled = true;
		} else {
			document.getElementsByName('itr3.scheduleBA[' + i + '].accBalance')[0].disabled = false;
		}
	}
}

// To calculate Net Agriculture Income for schedule EI
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

// To calculate schedule CG A6 Total Sum
function calCGA6TotalSum() {

	var tab1 = document.getElementById('scheduleStcgunUtilizedCapGain54');
	var noOfRows = tab1.rows.length;
	var sum = 0;
	for (var i = 0; i < (noOfRows - 4); i++) {
		var amt = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['
						+ i + '].amountUnUtilized')[0].value;
		sum = eval(parseInt(sum, 10) + parseInt(coalesce(amt), 10));
	}
	var total = eval(parseInt(sum, 10)
			+ parseInt(
					coalesce(document
							.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.amountUnUtilized')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.amtDeemedStcg')[0].value),
					10));
	document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa')[0].value = total;
}

// To display 92CD Verification based on the filing section
function display92CDVerification(type) {

	var fileSec = document
			.getElementsByName('partAGEN1.filingStatus.returnFileSec')[0].value;

	if (fileSec == '19') {
		document.getElementById('92cdVerification').style.display = '';
	} else {
		document.getElementById('92cdVerification').style.display = 'none';
	}
	
	if(type != 'onload' && fileSec == '19'){
		addErrorXHTML('','To file return u/s 92CD, post login in e-Filing portal, go to "e-File" --> "Income Tax Return" and select the applicable AY, ITR and other options.');
	}
	if (type != 'onload' && fileSec == '20') {
		addErrorXHTML('',
				'Section 139 read with section 119(2)(b) for AY 2017-18 can be filed only after 31st March 2018.');
	}
	
}

// To populate schedule BP values
function populateBP() {

	var tabBP = document.getElementById('scheduleBP');
	var tabIF = document.getElementById('scheduleIF');

	var countBP = tabBP.rows.length - 6;
	var countIF = tabIF.rows.length - 3;

	for (var i = 0; i < countIF; i++) {
		if (i > countBP - 1) {
			addRowToTable('scheduleBP', 6, 5);
			countBP++;
		}
		document.getElementsByName('scheduleBPA.partnerFirmIncomes[' + i
				+ '].firmPAN')[0].value = document
				.getElementsByName('scheduleIF.InforFirm[' + i + '].panOfFirm')[0].value;
	}

}

// To validate PAN in schedule 80G
function panValidation80G(tableId) {

	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	var verificationPAN = document
			.getElementsByName('verification.declaration.assesseeVerPAN')[0].value;
	var table = document.getElementById(tableId);
	var allInputTags = table.getElementsByTagName('input');
	for (var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("doneePanNo$")) {
			if (allInputTags[i].value != ''
					&& (allInputTags[i].value == pan || allInputTags[i].value == verificationPAN)) {
				// addError(allInputTags[i],'Enter the PAN of the person to whom
				// the donation is made.',true);
				j
						.setFieldError(allInputTags[i].name,
								'Enter the PAN of the person to whom the donation is made.');
			}
		}
	}
}

// To calculate schedule CG Point B8 Total
function calCGPointB8Total() {

	var tab1 = document.getElementById('scheduleLtcgunUtilizedCapGain54');
	var noOfRows = tab1.rows.length;
	var sum = 0;
	for (var i = 0; i < (noOfRows - 4); i++) {
		var amt = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['
						+ i + '].amountUnUtilized')[0].value;
		sum = eval(parseInt(sum, 10) + parseInt(coalesce(amt), 10));
	}
	var total = eval(parseInt(sum, 10)
			+ parseInt(
					coalesce(document
							.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.amountUnUtilized')[0].value),
					10)
			+ parseInt(
					coalesce(document
							.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54.amtDeemedLtcg')[0].value),
					10));
	document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0].value = total;
}

// To calculate schedule CG Point 9 Total
function calCGPoint9Total(tableId) {
	var tab = document.getElementById(tableId);
	var allInputTags = tab.getElementsByTagName('input');
	var totalSTCG = parseInt(0, 10);

	if (tableId == 'scheduleLtcgDtaa') {
		for (var i = 0; i < allInputTags.length; i++) {
			if (allInputTags[i].name.match("amount$")) {
				totalSTCG = totalSTCG + parseInt(allInputTags[i].value, 10);
			}
		}
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.totAmtLtcgUnderDtaa')[0].value = coalesce(parseInt(
				totalSTCG, 10));
	}
}

// To check number of Rows filled in schedule BA
function checkNoOfRowsFilled() {
	var tab = document.getElementById('scheduleBA');
	var rowCount = tab.rows.length;
	var count = parseInt(0, 10);
	var noOfBankAccounts = document
			.getElementsByName('itr.scheduleBA.noOfBankAcc')[0].value;
	for (var i = 0; i < (rowCount - 2); i++) {
		var IFSC = document.getElementsByName('itr.scheduleBA[' + i
				+ '].ifscCode')[0].value;
		if (IFSC != "") {
			count = count + 1;
		}
	}
	if (noOfBankAccounts != '' && (noOfBankAccounts - 1) != count) {
		j
				.setFieldError(
						'itr.scheduleBA.noOfBankAcc',
						'Number of bank accounts held during the previous year should be equal to number of rows entered in the below tables');
	}

}

// To make mandate A6 on submit
function mandateA6() {

	var valueA13 = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0].value;
	var valueAb4 = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.deductSec48.totalDedn')[0].value;
	var valueA1d = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleofLandBuild.exemptionOrDednUs54')[0].value;

	var valueA2ia = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].fullConsideration')[0].value;
	var valueA2b4 = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].deductSec48.totalDedn')[0].value;
	var valueA2d = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.equityMFonSTT[0].lossSec94of7Or94of8')[0].value;

	var valueA3a = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTPaid')[0].value;
	var valueA3b = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRITransacSec48Dtl.nRItaxSTTNotPaid')[0].value;

	var valueA4a = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.fullConsideration')[0].value;
	var valueA44 = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.deductSec48.totalDedn')[0].value;
	var valueA4d = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.nRISecur115AD.capgainonAssets')[0].value;

	var valueA5a = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.fullConsideration')[0].value;
	var valueA54 = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.deductSec48.totalDedn')[0].value;
	var valueA5d = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.saleOnOtherAssets.capgainonAssets')[0].value;

	var valueA6 = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54.totAmtStcgUnderDtaa')[0].value;

	var valueSTCG = valueA13 + valueAb4 + valueA1d + valueA2ia + valueA2b4
			+ valueA2d + valueA3a + valueA3b + valueA4a + valueA44 + valueA4d
			+ valueA5a + valueA54 + valueA5d + valueA6;

	var fieldSTCG = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag')[0];

	var fieldLTCG = document
			.getElementsByName('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag')[0];
	if (valueSTCG > 0 && fieldLTCG.value == '') {
		addErrorXHTML(
				fieldLTCG,
				'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B8 of Schedule CG',
				true);
		j
				.setFieldError(
						'scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag',
						'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B8 of Schedule CG');
	}
	if (valueSTCG > 0 && fieldSTCG.value == "") {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag',
						'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A6a of Schedule CG');
		addErrorXHTML(
				fieldSTCG,
				'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A6 of Schedule CG',
				true);
	}

}

// To make mandate B8 field on submit
function mandateB8() {

	var valueBa3 = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.fullConsideration50C')[0].value;
	var valueB1d = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofLandBuild.exemptionOrDednUs54')[0].value;

	var valueB2a = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.fullConsideration')[0].value;
	var valueBb4 = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.deductSec48.totalDedn')[0].value;
	var valueB2d = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofBondsDebntr.exemptionOrDednUs54')[0].value;

	var valueB3a = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].fullConsideration')[0].value;
	var valueB34 = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].deductSec48.totalDedn')[0].value;
	var valueB3d = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.proviso112Applicable[0].exemptionOrDednUs54S')[0].value;

	var valueB4a = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.ltcgWithoutBenefit')[0].value;
	var valueB4b = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIProvisoSec48.exemptionOrDednUs54')[0].value;

	var valueB5a = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].fullConsideration')[0].value;
	var valueB54 = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].deductSec48.totalDedn')[0].value;
	var valueB5d = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRIOnSec112and115[0].exemptionOrDednUs54S')[0].value;

	var valueB6a = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleonSpecAsset')[0].value;
	var valueB6b = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednSpecAssetus115')[0].value;
	var valueB6d = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.saleOtherSpecAsset')[0].value;
	var valueB6e = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.nRISaleofForeignAsset.dednOtherSpecAssetus115')[0].value;

	var valueB7a = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.fullConsideration')[0].value;
	var valueB74 = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.deductSec48.totalDedn')[0].value;
	var valueB7d = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.saleofAssetNA.exemptionOrDednUs54S')[0].value;

	var valueB9 = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.ltcgUnderDtaa.totAmtLtcgUnderDtaa')[0].value;

	var valueB8 = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.stcgUnderDtaa.totAmtStcgUnderDtaa')[0].value;

	var fieldLTCG = document
			.getElementsByName('scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag')[0];

	var valueLTCG = valueBa3 + valueBb4 + valueB1d + valueB2a + valueBb4
			+ valueB2d + valueB3a + valueB34 + valueB3d + valueB4a + valueB4b
			+ valueB5a + valueB54 + valueB5d + valueB6a + valueB6b + valueB6d
			+ valueB6e + valueB7a + valueB74 + valueB7d + valueB9 + valueB8;

	var fieldSTCG = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag')[0];

	if (valueLTCG > 0 && fieldSTCG.value == '') {
		j
				.setFieldError(
						'scheduleCGPost45.shortTermCapGainPost45.unutilizedCapgainFlag',
						'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A6a of Schedule CG');
		addErrorXHTML(
				fieldSTCG,
				'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in A6 of Schedule CG',
				true);
	}
	if ((valueLTCG != null || valueLTCG != undefined) && valueLTCG > 0
			&& fieldLTCG.value == "") {
		addErrorXHTML(
				fieldLTCG,
				'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B8 of Schedule CG',
				true);
		j
				.setFieldError(
						'scheduleCGPost45.LongTermCapGainPost45.unutilizedCapgainFlag',
						'Please select whether any amount of unutilized capital gain on asset transferred during the previous years in B8 of Schedule CG');
	}

}

// To enable Passport field
/*
 * function enablePassport() { var status =
 * document.getElementsByName('partAGEN1.personalInfo.status')[0].value; if
 * (status == 'I') {
 * document.getElementsByName('partAGEN1.personalInfo.passportNumber')[0].disabled =
 * false;
 * document.getElementsByName('partAGEN1.personalInfo.passportNumber')[0].readOnly =
 * false; } if (status == 'H') {
 * document.getElementsByName('partAGEN1.personalInfo.passportNumber')[0].disabled =
 * true;
 * document.getElementsByName('partAGEN1.personalInfo.passportNumber')[0].readOnly =
 * true;
 * document.getElementsByName('partAGEN1.personalInfo.passportNumber')[0].value =
 * ''; } }
 */

// To validate Passport
/*
 * function validatePassport() {
 * 
 * var value = document
 * .getElementsByName('partAGEN1.personalInfo.passportNumber')[0].value;
 * 
 * if (value == '00000000000000') { addErrorXHTML(document
 * .getElementsByName('partAGEN1.personalInfo.passportNumber')[0], 'Passport
 * number should be alpha-numeric', true);
 * j.setFieldError('partAGEN1.personalInfo.passportNumber', 'Passport number
 * should be alpha-numeric'); } }
 */

// To get Ifsc Bank Name
function getIfscBankName(field) {

	document.getElementsByName('itr.refund.depositToBankAccount.bankName')[0].value = main
			.getBankName(field.value);
}

// To get Ifsc Bank Details
function getIfscBankDetails(elem) {

	var position = parseInt(elem.name.substring(elem.name.indexOf("[") + 1,
			elem.name.indexOf("]")));

	var ifscCode = document.getElementsByName('itr.scheduleBA[' + position
			+ '].ifscCode')[0].value;

	document.getElementsByName('itr.scheduleBA[' + position + '].bankName')[0].value = main
			.getBankName(ifscCode);
}

// To set Values schedule CG 54B
function setValuesCG54B() {

	var yearConstant = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.yearConst')[0].value;
	var amountUtilized = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.amountUtilized')[0].value;
	var amountUnUtilized = document
			.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.amountUnUtilized')[0].value;

	if (yearConstant == "" && amountUtilized == "" && amountUnUtilized == "") {
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.section')[0].value = '';
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.year')[0].value = '';
	} else {
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.section')[0].value = '54B';
		document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54B.year')[0].value = '2014-15';
	}

	var tab = document.getElementById('scheduleLtcgunUtilizedCapGain54');
	var rowCount = tab.rows.length - 4;
	for (var k = 0; k < rowCount; k++) {
		var section = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].section')[0].value;
		var yearConst = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].yearConst')[0].value;
		var amountUtilized = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].amountUtilized')[0].value;
		var amountUnUtilized = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].amountUnUtilized')[0].value;
		var ay = document
				.getElementsByName('scheduleCGPost45.longTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].ay')[0];
		if (section == "" && yearConst == "" && amountUtilized == ""
				&& amountUnUtilized == "") {
			ay.value = '';
		} else {
			ay.value = '2013-14';
		}
	}

	var yearConstantStcg = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.yearConst')[0].value;
	var amountUtilizedStcg = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.amountUtilized')[0].value;
	var amountUnUtilizedStcg = document
			.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.amountUnUtilized')[0].value;

	if (yearConstantStcg == "" && amountUtilizedStcg == ""
			&& amountUnUtilizedStcg == "") {
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.section')[0].value = '';
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.year')[0].value = '';
	} else {
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.section')[0].value = '54B';
		document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54B.year')[0].value = '2014-15';
	}

	var tab1 = document.getElementById('scheduleStcgunUtilizedCapGain54');
	var rowCount1 = tab1.rows.length - 4;
	for (var k = 0; k < rowCount1; k++) {
		var section = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].section')[0].value;
		var yearConst = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].yearConst')[0].value;
		var amountUtilized = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].amountUtilized')[0].value;
		var amountUnUtilized = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].amountUnUtilized')[0].value;
		var ay = document
				.getElementsByName('scheduleCGPost45.shortTermCapGainPost45.unUtilizedCapGain54['
						+ k + '].ay')[0];
		if (section == "" && yearConst == "" && amountUtilized == ""
				&& amountUnUtilized == "") {
			ay.value = '';
		} else {
			ay.value = '2013-14';
		}
	}
}

// To calculate Total Tax IT
function calculateTotalTaxIT(tableId) {

	var tab1 = document.getElementById('scheduleIt');
	var noOfRows = tab1.rows.length;
	var sum = 0;
	var amt = 0;

	for (var i = 0; i < (noOfRows - 3); i++) {
		amt = document
				.getElementsByName('scheduleIT.taxPayment[' + i + '].amt')[0].value;
		sum = eval(parseInt(sum, 10) + parseInt(coalesce(amt), 10));
	}

	document.getElementsByName('scheduleIT.taxPayment.totalTaxPayments')[0].value = parseInt(
			sum, 10);
}

// To calculate Pure SI Tax
function calculatePureSITax() {

	var rowCount1 = countRowInTable('scheduleSI.splCodeRateTax', 'splRateInc');
	var sum = 0;
	var sumWithDtaa = 0;
	for (var i = 0; i < rowCount1; i++) {

		var section = document.getElementsByName('scheduleSI.splCodeRateTax['
				+ i + '].secCode')[0].value;

		if (section == '1A' || section == '21' || section == '22'
				|| section == '21ciii' || section == '5AC1c'
				|| section == '5ACA1b' || section == '5ADii'
				|| section == '5ADiii' || section == '5Eacg'
				|| section == '5AD1biip' || section == '5Eb') {
			sum = parseInt(sum)
					+ parseInt(document
							.getElementsByName('scheduleSI.splCodeRateTax[' + i
									+ '].splRateIncTax')[0].value);
		}

	}
	sumWithDtaa = sum;
	return parseInt(sumWithDtaa);

}

// To alert user
function alertItr3User() {
	var incSal = document.getElementsByName('partBTI.salaries')[0].value;
	var tab1 = document.getElementById('scheduleTDS1');
	var noOfRows = tab1.rows.length;
	var sum = 0;
	var amt = 0;

	for (var i = 0; i < (noOfRows - 3); i++) {
		amt = document.getElementsByName('scheduleTDS1.tdSonOthThanSal[' + i
				+ '].incChrgSal')[0].value;
		sum = eval(parseInt(sum, 10) + parseInt(coalesce(amt), 10));
	}

	var tdsSalminusTenPer = sum * parseFloat('0.90');
	var errText = "";
	var i = 1;
	var amountPayable = document
			.getElementsByName('partBTTI.taxPaid.balTaxPayable')[0].value;
	var fileSec = document
			.getElementsByName('partAGEN1.filingStatus.returnFileSec')[0].value;

	if (incSal < tdsSalminusTenPer) {
		errText += (i++)
				+ ". The amount of salary disclosed in \"Income details/Part BTI\" is less than 90% of Salary reported in TDS1.\n\n";
	}

	if (fileSec == '20') {
		errText += (i++)
				+ ". Section 139 read with section 119(2)(b) for AY 2017-18 can be filed only after 31st March 2018.\n\n";
	}
	if (fileSec == '19') {
		errText += (i++)
				+ ".  To file return u/s 92CD, post login in e-Filing portal, go to 'e-File' --> 'Income Tax Return' and select the applicable AY, ITR and other options.\n\n";
	}
	/*if (amountPayable > 0) {
		errText += (i++)
				+ ". Please ensure that the taxes are paid before the submission of the return, else return shall be treated as defective.\n";
	}*/
	main.generateMsgDialogWithOk(errText, "");
}

// To open Save file dialog
function popupWithOk() {
	j.popup();
}

function enableTCSspouseAmtOnLoad() {
	var portVal = document
			.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value;
	var table = document.getElementById('scheduleTCS');
	var noOfRows = table.rows.length;

	if (portVal == 'Y') {

		for (var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].disabled = false;
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].readOnly = false;
		}
	} else {
		for (var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].disabled = true;
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].readOnly = true;
		}
	}
}

// Enable or disable TCS spouse amount field

function enableTCSspouseAmt(portVal) {
	var table = document.getElementById('scheduleTCS');
	var portVal = document
			.getElementsByName('partAGEN1.filingStatus.portugeseCC5A')[0].value;
	var noOfRows = table.rows.length;
	if (portVal == 'Y') {
		for (var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].disabled = false;
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].readOnly = false;
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].value = '';
		}
	} else {
		for (var i = 0; i < eval(parseInt(noOfRows, 10) - 3); i++) {
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].disabled = true;
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].readOnly = true;
			document.getElementsByName('itr3.scheduleTCS.tcs[' + i
					+ '].amtClaimedBySpouse')[0].value = '';
		}
	}
}

function checkPANFromIF() {
	var tableIF = document.getElementById('scheduleIF');
	var noOfRowsIF = tableIF.rows.length;

	var table = document.getElementById('scheduleBP');
	var noOfRows = table.rows.length;

	var strpan = [];

	for (var k = 0; k < (noOfRowsIF - 3); k++) {
		panIF = document.getElementsByName('scheduleIF.InforFirm[' + k
				+ '].panOfFirm')[0];
		strpan[k] = panIF.value;
	}

	for (var i = 0; i < (noOfRows - 6); i++) {
		var firmPAN = document
				.getElementsByName('scheduleBPA.partnerFirmIncomes[' + i
						+ '].firmPAN')[0].value;
		if ((strpan.indexOf(firmPAN)) == -1) {
			j.setFieldError(
					'scheduleBPA.partnerFirmIncomes[' + i + '].firmPAN',
					'PAN of the firm entered in Schedule BP and Schedule IF should be same.');

		}
	}
}

// to add rows to table sch PTI
function addRowSchedPTIFor2(nocheck) {

	var mainTable = document.getElementById('schedulePTI').rows;
	var noOfRows = mainTable.length;

	var tobeInsertBefore = document.getElementById('schedulePTIAddRow');
	var flag = true;
	var checkFirst = true;
	var totRow = document.getElementById('schedulePTIFirst').cells[0].textContent;

	var iterate = eval(parseInt(totRow, 10));

	var indexValue = eval(((parseInt(noOfRows, 10) - 3) / 9) + 1);

	var isRowBlank = true;
	for (var i = 0; i < 9; i++) {
		if (!checkRowBlank('schedulePTI', i, 0)) {
			isRowBlank = false;
			break;
		}
	}

	if (!isRowBlank || nocheck) {

		for (var i = 1; i < mainTable.length; i++) {
			var cloneNode = mainTable[i].cloneNode(true);
			if (flag) {
				if (checkFirst) {
					iterate = eval(indexValue - 1);

					cloneNode.cells[0].innerHTML = indexValue;
					checkFirst = false;
				}

				// Numbering
				var inputTags = cloneNode.getElementsByTagName('input');
				for (var a = 0; a < inputTags.length; a++) {
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

// To enable the 80GGA field in Schedule VIA, based on the fields on Schedule
// BP.
function enableSchedule6A80GGA() {
	var Salary = document
			.getElementsByName('scheduleBPA.total.aggreFirmSalBonComRen')[0].value;
	var Interest = document
			.getElementsByName('scheduleBPA.total.aggreIntFirmCap')[0].value;
	var Expenses = document
			.getElementsByName('scheduleBPA.total.aggreExpensesTotal')[0].value;
	var Deduction = document
			.getElementsByName('scheduleBPA.deductSchemeUs35AC')[0].value;

	if (Salary == 0 && Interest == 0 && Expenses == 0 && Deduction == 0) {
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].disabled = false;
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].readOnly = false;
		// document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].value='';
	} else {

		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].disabled = true;
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].readOnly = true;
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].value = '0';

	}

	calcITR3();

}

// populate PAN in case of Individual
function populatePAN(source, dest) {
	document.getElementsByName(dest)[0].value = "";
	if (document.getElementsByName(source)[0].value
			.match('^[A-Za-z]{3}[pP]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$')) {
		document.getElementsByName(dest)[0].value = document
				.getElementsByName(source)[0].value.toUpperCase();
	}
}

function surchargeEditable() {
	var splRateIncTax = parseInt(coalesce(document
			.getElementsByName('scheduleSI.splCodeRateTax[1].splRateIncTax')[0].value));

	if (splRateIncTax > 0) {
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI')[0].readOnly = false;
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = false;
	} else {
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI')[0].readOnly = true;
		document
				.getElementsByName('partBTTI.computationOfTaxLiability.educationCess')[0].readOnly = true;
	}

}
function clearOldSurchargeValue() {
	var surcharge = document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI')[0];
	if (surcharge.old != undefined) {
		surcharge.old = undefined;
	}
	if (surcharge.oldvalue != undefined) {
		surcharge.oldvalue = undefined;
	}
}

// To calculate exemptions
function applyExemption2017(original, exemption, appRate) {
	var remaining = exemption;
	var nonZero = 0;
	for (var i = original.length - 1; i >= 0; i--) {
		if (i > 0
				&& (i < original.length - 1 || (appRate && i < original.length))) {
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
			// var part = remaining / nonZero--;
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

function OSSubCal() {

	document
			.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[7].sourceAmount')[0].value = eval(parseInt(
			coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[1].sourceAmount'),
			10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[2].sourceAmount'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[3].sourceAmount'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[4].sourceAmount'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[5].sourceAmount'),
					10)
			+ parseInt(
					coalesceSetRet('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls[6].sourceAmount'),
					10));

}

function removeIncomeDtls() {

	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	if (status == 'NRI') {
		document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value = 0;
		document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value = 0;
	}

}

function removeIncomeDtls1() {

	var status = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	if (status == 'NRI' || status == 'RES' || status == 'NOR') {
		document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value = 0;
		document
				.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value = 0;
	}

}

function surcharge201718() {

	document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonSI')[0].value = eval(parseInt(
			coalesceSetRet('scheduleOS.incChargblSplRateOS.dividendIncome115BBE'),
			10) * 0.60 * 0.25);

	document
			.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surcharge')[0].value = eval(parseInt(
			coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonSI'),
			10)
			+ parseInt(
					coalesceSetRet('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI'),
					10));
	
}


function clearFields(){
	 
		document
		.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBDA')[0].value = 0;
		document
		.getElementsByName('scheduleOS.incChargblSplRateOS.dividendIncome115BBF')[0].value = 0;
	
	
}

function disableFields_AL(){
	
	var listOfTr = document.getElementById('scheduleAL').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 4);
	
	
	for (var j = 0; j < noOfRows; j++) {
	
		var flag = document.getElementsByName('itr2.scheduleAL.immovableFlag')[0].value;
		if(flag=="Y")
		{
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].description')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].residenceNo')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].residenceName')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].roadOrStreet')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].localityOrArea')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].cityOrTownOrDistrict')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].stateCode')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].country')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].pinCode')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].amount')[0].disabled=false;
		 
		
		}
	else{
		
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].description')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].description')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].residenceNo')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].residenceNo')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].residenceName')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].residenceName')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].roadOrStreet')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].roadOrStreet')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].localityOrArea')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].localityOrArea')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].cityOrTownOrDistrict')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].cityOrTownOrDistrict')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].stateCode')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].stateCode')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].country')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].country')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].pinCode')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].pinCode')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].amount')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.immovableDtls['+j+'].amount')[0].value="";
		 
    
		}
	
	}
}


function mandtryAL(){
	
	var totalin = document.getElementsByName('partBTI.grossTotalIncome')[0].value; 
	var immflag = document.getElementsByName('itr2.scheduleAL.immovableFlag')[0].value;
	var jewflag = document.getElementsByName('itr2.scheduleAL.movableAsset.jewelleryBullionEtc')[0].value;
	var archflag = document.getElementsByName('itr2.scheduleAL.movableAsset.archCollDrawPaintSulpArt')[0].value;
	var vehiflag = document.getElementsByName('itr2.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts')[0].value;
	var deposflag = document.getElementsByName('itr2.scheduleAL.movableAsset.depositsinbank')[0].value;
	var shreflag = document.getElementsByName('itr2.scheduleAL.movableAsset.sharesandsecurities')[0].value;
	var insurflag = document.getElementsByName('itr2.scheduleAL.movableAsset.insurancepolicies')[0].value;
	var loanflag = document.getElementsByName('itr2.scheduleAL.movableAsset.loansandadvancesgiven')[0].value;
	var cashflag = document.getElementsByName('itr2.scheduleAL.movableAsset.cashInHand')[0].value;
	var AOPflag = document.getElementsByName('itr2.scheduleAL.interstAOPFlag')[0].value;
	var liabflag = document.getElementsByName('itr2.scheduleAL.liabilityInRelatAssets')[0].value;
	

	if(totalin <= 5000000 )
		{
		
	if ((immflag != ""))
	{
		if((jewflag =="")||(archflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(insurflag =="") ||(loanflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the  fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((jewflag != ""))
	{
		if((immflag =="")||(archflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(insurflag =="") ||(loanflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the  fields in schedule AL ..');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((archflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(insurflag =="") ||(loanflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((vehiflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(archflag =="") ||(deposflag =="") ||(shreflag =="") ||(insurflag =="") ||(loanflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((deposflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(archflag =="") ||(shreflag =="") ||(insurflag =="") ||(loanflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((shreflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(deposflag =="") ||(archflag =="") ||(insurflag =="") ||(loanflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((insurflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(archflag =="") ||(loanflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((loanflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(archflag =="") ||(insurflag =="")
				||(cashflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	if ((cashflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(archflag =="") ||(insurflag =="")
				||(loanflag =="")||(AOPflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	
	if ((AOPflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(archflag =="") ||(insurflag =="")
				||(loanflag =="")||(cashflag =="")||(liabflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	
	if ((liabflag != ""))
	{
		if((immflag =="")||(jewflag =="")||(vehiflag =="") ||(deposflag =="") ||(shreflag =="") ||(archflag =="") ||(insurflag =="")
				||(loanflag =="")||(AOPflag =="")||(cashflag =="")){
		
			addErrorXHTML('' ,'Please fill all the fields in schedule AL.');	
			j.setFieldError('itr2.scheduleAL.immovableFlag','Please fill all the fields in schedule AL.');}
			
		}
	
		}
	}


function disableFields_AOP(){
	
	var listOfTr = document.getElementById('scheduleALInt').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);
	
	
	for (var j = 0; j < noOfRows; j++) {
	
		var flag = document.getElementsByName('itr2.scheduleAL.interstAOPFlag')[0].value;
		if(flag=="Y")
		{
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].nameOfFirm')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].residenceNo')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].residenceName')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].roadOrStreet')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].localityOrArea')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].cityOrTownOrDistrict')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].stateCode')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].country')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].pinCode')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].panOfFirm')[0].disabled=false;
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].assesseInvestment')[0].disabled=false;
		 
		
		}
	else{
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].nameOfFirm')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].nameOfFirm')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].residenceNo')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].residenceNo')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].residenceName')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].residenceName')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].roadOrStreet')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].roadOrStreet')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].localityOrArea')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].localityOrArea')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].cityOrTownOrDistrict')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].cityOrTownOrDistrict')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].stateCode')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].stateCode')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].country')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].country')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].pinCode')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].pinCode')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].panOfFirm')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].panOfFirm')[0].value="";
		 
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].assesseInvestment')[0].disabled=true;
		 document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+j+'].assesseInvestment')[0].value="";
		 
    
		}
	
	}
}


function disableImmovableAsset(){

	var immovableFlag=document.getElementsByName('itr2.scheduleAL.immovableFlag')[0].value;
	
        removeTableDataAL('scheduleAL',immovableFlag);

}

//To remove Table Data
function removeTableDataAL(tableID,immovableFlag){
    
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
	
	var interestFlag = document.getElementsByName('itr2.scheduleAL.interstAOPFlag')[0].value;	
	removeTableData1('scheduleALInt',interestFlag);
	
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


function onStateChngAL(){
	
	var listOfTr = document.getElementById('scheduleAL').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);
	
	
	for (var i = 0; i < noOfRows; i++) {
	var state = document.getElementsByName('itr2.scheduleAL.immovableDtls['+ i +'].stateCode')[0];
	var country = document.getElementsByName('itr2.scheduleAL.immovableDtls['+ i +'].country')[0];
	var pinCode = document.getElementsByName('itr2.scheduleAL.immovableDtls['+ i +'].pinCode')[0];
	
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
var state = document.getElementsByName('itr2.scheduleAL.immovableDtls['+ i +'].stateCode')[0];
var country = document.getElementsByName('itr2.scheduleAL.immovableDtls['+ i +'].country')[0];
var pinCode = document.getElementsByName('itr2.scheduleAL.immovableDtls['+ i +'].pinCode')[0];

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
function onStateChngAOP(){
	
	var listOfTr = document.getElementById('scheduleALInt').getElementsByTagName('tr');
	var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);
	
	for (var i = 0; i < noOfRows; i++) {
	
	
	var state = document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+ i +'].stateCode')[0];
	var country = document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+ i +'].country')[0];
	var pinCode = document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+ i +'].pinCode')[0];
	
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

var listOfTr = document.getElementById('scheduleALInt').getElementsByTagName('tr');
var noOfRows = eval(parseInt(listOfTr.length, 10) - 3);

for (var i = 0; i < noOfRows; i++) {


var state = document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+ i +'].stateCode')[0];
var country = document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+ i +'].country')[0];
var pinCode = document.getElementsByName('itr2.scheduleAL.interestHeldInaAssetDtls['+ i +'].pinCode')[0];

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
function setCountryForStateItr2(){
	
	
	try {
		
		var state = document.getElementsByName('partAGEN1.personalInfo.address.stateCode')[0];
		var country = document.getElementsByName('partAGEN1.personalInfo.address.country')[0];
		
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
	var state = document.getElementsByName('partAGEN1.personalInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.personalInfo.address.country')[0];
	
	if ( state.value == "99" || country.value != "91")
		{
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].disabled=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].value="";
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].disabled=false;
		
		}
	else 
		{
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].disabled=false;
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].value="";
		}
	
	//populateZipCodeVer();
		
}
function checkPinOnCountryChangeVer()
{
	var state = document.getElementsByName('partAGEN1.personalInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.personalInfo.address.country')[0];
	var zipCode =document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].value
	if (country.value == "91" || country.value== "-1"){
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].disabled=false;
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].value="";
		}
	else 
		{
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].disabled=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].value="";
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].disabled=false;
		
		
		}
	
	//populateZipCodeVer();
		
}
function setStateForCountryitr2(){
	
	var state = document.getElementsByName('partAGEN1.personalInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.personalInfo.address.country')[0];
	
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
	
	var zipCodeCheck= document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0];
	var country = document.getElementsByName('partAGEN1.personalInfo.address.country')[0];
	
	if(zipCodeCheck.checked==true && country.value !='91' && country.value !="" ){
		
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].value="XXXXXX";
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].readOnly=true;
		zipCodeCheck.value=true;
		
	}else{
		
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].value="";
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].readOnly=false;
		zipCodeCheck.value=false;
	}
	
}
function checkPinZipOnload()
{
	var state = document.getElementsByName('partAGEN1.personalInfo.address.stateCode')[0];
	var country = document.getElementsByName('partAGEN1.personalInfo.address.country')[0];
	var zipCode =document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].value
	if (country.value == "91" || country.value== "-1"){
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].disabled=false;
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].value="";
		}
	else 
		{
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].disabled=false;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].disabled=true;
		document.getElementsByName('partAGEN1.personalInfo.address.pinCode')[0].value="";
		if(zipCode=="XXXXXX"){
			
			document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].readOnly=true;
			document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=true;
		}else{
			
			document.getElementsByName('partAGEN1.personalInfo.address.zipCode')[0].readOnly=false;
			document.getElementsByName('partAGEN1.personalInfo.address.pinCode.pChosenCheckBox')[0].checked=false;
		}
	
		
		}
	
	//populateZipCodeVer();
		
}
function priBankMandtry()
{
	var bankDtlflag = document.getElementsByName('itr.refund.scheduleBA.bankDtlsFlag')[0].value;
	var bankName = document.getElementsByName('itr.refund.depositToBankAccount.bankName')[0].value;
	var ifscCode = document.getElementsByName('itr.refund.depositToBankAccount.iFSCCode')[0].value;
	var bankAcctNo = document.getElementsByName('itr.refund.bankAccountNumber')[0].value;
	var cashDeposit = document.getElementsByName('itr.refund.depositToBankAccount.depositAmount')[0].value;
	
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

   if(cashDeposit !="" && (ifscCode=="" || bankAcctNo==""||bankName=="")){
	
	addErrorXHTML('' ,'Please fill all the fields under Indian Bank Account details.');	
	j.setFieldError('itr.refund.depositToBankAccount','Please fill all the fields under Indian Bank Account details.');
   }
		
	}
	
	for(var i = 0; i < allInputTags.length; i++) {
		if (allInputTags[i].name.match("ifscCode$") && allInputTags[i+1].name.match("bankName$") && allInputTags[i+2].name.match("accNo$") && allInputTags[i+3].name.match("depositAmount$")) {
				if(allInputTags[i+3].value!='' && (allInputTags[i].value=='' || allInputTags[i+1].value=='' || allInputTags[i+2].value=='')){
					addError('','Please fill all the fields under Other Bank account details.',true);
					j.setFieldError('itr.scheduleBA[0].ifscCode','Please fill all the fields under Other Bank account details.');
					//allInputTags[i].value = parseInt('0',10);
			}
		}
	}
	
	
}

function onLoadSection80DType(){
	
	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	if(status.value == 'I'){
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].disabled = false;
	} else{
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].value = '';
		document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].disabled = true;
	}
	
}

//To display sech OS sec 115BDA
function displaySec115BBDA() {

	var tabl = document.getElementById('schduleOsf');
	var allSelects = tabl.getElementsByTagName('SELECT');
	var flag115h = document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;
	
	if(flag115h == 'Y'){
		for(var i = 0; i < allSelects.length; i++) {
			if (allSelects[i].name.match("sourceDescription")) {
				var sec115BBDA = document.getElementsByName('scheduleOS.incOthThanOwnRaceHorse.othersGrossDtls['+i+'].sourceDescription')[0].value;
				if(sec115BBDA=='5BBDA'){
					
					addErrorXHTML('','Please enter the amount, if Dividend income from domestic company exceeds Rs.10 lakh.');
					
				}
	
			}		
			
			
		}
	}
	
}


function enableFieldsFor115HFlg()
{
	var ben115HFlg = document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;

  if(ben115HFlg == 'Y') {
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI')[0].readOnly = false;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateOnAgriInc')[0].readOnly = false;
		
	}else
		{
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtNormalRatesOnAggrInc')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.surchargeonTI')[0].readOnly = true;
		document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.rebateOnAgriInc')[0].readOnly = true;
		surchargeEditable();

		}

}


function enable115HFlag()
{
	var status = document.getElementsByName('partAGEN1.personalInfo.status')[0].value;
	var res = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;

	if ( status == 'I' &&  (res == 'RES' || res == 'NOR') )
		{
		document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].disabled = false;
		}else
			{
			document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].disabled = true;
			document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value = "";
			}
}

function enableOSTableFor115H(element, value, tableId) {

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

//To calculate Tax Payable On Total Income for partB-TTI 1 d
function calculateTaxPayableOnTotalIncFor1a(srcElementName, destElementName) {

	var totalIncome = zeroOrMore(parseInt(coalesceSetRet(srcElementName), 10));
	var taxPayer = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	// IN-I,HUF-H
	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0]; // RES
	// ,
	// NRI

	var age = calcAge();

	var netTxblIncome = totalIncome;

	var tax = 0;

	var incTax = document.getElementsByName(destElementName)[0];
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age > 59 && age < 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('300000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('300001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('300000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('20000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('120000', 10)));
		}

	} else if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age >= 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2')));

		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('100000', 10)));
		}

	} else if ((taxPayer.value == 'I') || taxPayer.value == 'H') {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('250000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('250001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('250000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('25000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('125000', 10)));
		}

	}

	var falg115H = document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;
	if(falg115H=="Y"){
		setEditableFieldValue(incTax, tax);
	}else{
		incTax.value = tax;
	}

}

//To calculate Tax Payable On Total Income for rebate
function calculateTaxPayableOnTotalIncRebate(srcElementName, destElementName,forRebate) {

	var totalIncome = zeroOrMore(parseInt(coalesceSetRet(srcElementName), 10));
	var taxPayer = document.getElementsByName('partAGEN1.personalInfo.status')[0];
	// IN-I,HUF-H
	var resStatus = document
			.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0]; // RES
	// ,
	// NRI

	var age = calcAge();

	var netTxblIncome = totalIncome;
	if (forRebate == true) {
		netTxblIncome = parseInt(totalIncome, 10)
				+ parseInt(getExemption(), 10);
	}

	var tax = 0;

	var incTax = document.getElementsByName(destElementName)[0];
	var pan = document.getElementsByName('partAGEN1.personalInfo.pan')[0].value;
	if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age > 59 && age < 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('300000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('300001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('300000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('20000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('120000', 10)));
		}

	} else if ((pan.substring(3, 4) == 'P' || pan.substring(3, 4) == 'p')
			&& taxPayer.value == 'I' && age >= 80
			&& (resStatus.value == 'RES' || resStatus.value == 'NOR')) {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2')));

		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('100000', 10)));
		}

	} else if ((taxPayer.value == 'I') || taxPayer.value == 'H') {

		if (parseInt(netTxblIncome, 10) >= parseInt('0', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('250000', 10)) {
			tax = parseInt('0', 10);
		} else if (parseInt(netTxblIncome, 10) >= parseInt('250001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('500000', 10)) {
			tax = Math.round(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('250000', 10))
					* parseFloat('0.1')));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('500001', 10)
				&& parseInt(netTxblIncome, 10) <= parseInt('1000000', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('500000', 10))
					* parseFloat('0.2'))
					+ parseInt('25000', 10)));
		} else if (parseInt(netTxblIncome, 10) >= parseInt('1000001', 10)) {
			tax = Math.round(eval(eval(eval(parseInt(netTxblIncome, 10)
					- parseInt('1000000', 10))
					* parseFloat('0.3'))
					+ parseInt('125000', 10)));
		}

	}

	var falg115H = document.getElementsByName('partAGEN1.filingStatus.benefitUs115HFlg')[0].value;
	if (forRebate && falg115H=="Y" ) {
		setEditableFieldValue(incTax, tax);
	} else {
		incTax.value = tax;
	}
}
function clearOldSpecialRateTaxValue(){
	var surcharge = document.getElementsByName('partBTTI.computationOfTaxLiability.taxPayableOnTI.taxAtSpecialRates')[0];
		if(surcharge.old!=undefined){
			surcharge.old = undefined;
		}
		if(surcharge.oldvalue!=undefined){
			surcharge.oldvalue = undefined;
		}
}

function enableSchedule6A80GGA_Recalulate() {
	var Salary = document
			.getElementsByName('scheduleBPA.total.aggreFirmSalBonComRen')[0].value;
	var Interest = document
			.getElementsByName('scheduleBPA.total.aggreIntFirmCap')[0].value;
	var Expenses = document
			.getElementsByName('scheduleBPA.total.aggreExpensesTotal')[0].value;
	var Deduction = document
			.getElementsByName('scheduleBPA.deductSchemeUs35AC')[0].value;

	if (Salary == 0 && Interest == 0 && Expenses == 0 && Deduction == 0) {
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].disabled = false;
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].readOnly = false;
		// document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].value='';
	} else {

		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].disabled = true;
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].readOnly = true;
		document
				.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80GGA')[0].value = '0';

	}

}
function clearAadharEnrollment()
{
	var aadharNo = document.getElementsByName('partAGEN1.personalInfo.adharNumber')[0].value;
	if(aadharNo.length > 12){
		
		document.getElementsByName('partAGEN1.personalInfo.adharNumber')[0].value = '';
	}

}


function enableBankDtls()
{

	enableField('itr.refund.scheduleBA.bankDtlsFlag','Y','itr.refund.depositToBankAccount.iFSCCode');
	enableField('itr.refund.scheduleBA.bankDtlsFlag','Y','itr.refund.depositToBankAccount.bankName');
	enableField('itr.refund.scheduleBA.bankDtlsFlag','Y','itr.refund.bankAccountNumber');
	enableField('itr.refund.scheduleBA.bankDtlsFlag','Y','itr.refund.depositToBankAccount.depositAmount');
	
	enableTableForNRI('itr.refund.scheduleBA.bankDtlsFlag', 'Y','scheduleBA');
	
	enableField('itr.refund.scheduleBA.bankDtlsFlag','N','itr.refund.scheduleBA.foreignBankDtls[0].ibanSwiftCode');
	enableField('itr.refund.scheduleBA.bankDtlsFlag','N','itr.refund.scheduleBA.foreignBankDtls[0].bankName');
	enableField('itr.refund.scheduleBA.bankDtlsFlag','N','itr.refund.scheduleBA.foreignBankDtls[0].countryCode');
	enableField('itr.refund.scheduleBA.bankDtlsFlag','N','itr.refund.scheduleBA.foreignBankDtls[0].bankAccountNo');
	
}


function checkSchEIxmlblock()
{
	var resStatus = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value; 
	
	var divIncome = parseInt(coalesce(document.getElementsByName('scheduleEI.dividendInc')[0].value));
	
	if( (resStatus == 'RES' || resStatus == 'NOR') && divIncome > 1000000)
		{
		j.setFieldError('scheduleEI.dividendInc','Dividend income from domestic company should not be entered more than Rs. 10 lakh');
 		addErrorXHTML(document.getElementsByName('scheduleEI.dividendInc')[0],'Dividend income from domestic company should not be entered more than Rs. 10 lakh',true);
		}
	
}

function populateBankFlg()
{

	var residentialStatus  = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	
	if(residentialStatus == 'RES' || residentialStatus == 'NOR')
		{
		document.getElementsByName('itr.refund.scheduleBA.bankDtlsFlag')[0].value = 'Y';
		document.getElementsByName('itr.refund.scheduleBA.bankDtlsFlag')[0].disabled=true;
		}else
			{
			document.getElementsByName('itr.refund.scheduleBA.bankDtlsFlag')[0].disabled=false;
			}
	enableBankDtls();
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


function section80DChk()
{
	var age = calcAge();
	var sec80D  = document.getElementsByName('scheduleVIA.usrDeductUndChapVIA.section80DUsrType')[0].value;
	if( (sec80D == '2' || sec80D == '7' ) && age < 60)
		{
		j.setFieldError('scheduleVIA.usrDeductUndChapVIA.section80DUsrType','Please select a valid option from the dropdown of Sec.80D under Chapter VI-A');
		addErrorXHTML('','Please select a valid option from the dropdown of Sec.80D under Chapter VI-A',true);
		}

}

function genWarningMsgForNRI() {
	
	var resStatus = document.getElementsByName('partAGEN1.filingStatus.residentialStatus')[0].value;
	var bankDtlsFlg = document.getElementsByName('itr.refund.scheduleBA.bankDtlsFlag')[0].value;
	if( resStatus == 'NRI' && bankDtlsFlg == 'N' ){
	  addErrorXHTML('','Currently refund will be credited to a bank account located in India and not to a bank account located in a foreign country.');
	  j.setFieldError('itr.refund.scheduleBA.bankDtlsFlag','Currently refund will be credited to a bank account located in India and not to a bank account located in a foreign country.');
	}
}
