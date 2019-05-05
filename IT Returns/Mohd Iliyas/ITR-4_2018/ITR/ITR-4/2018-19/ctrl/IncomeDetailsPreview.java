package com.itd.efiling.offline.ITR4.ctrl;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;

public class IncomeDetailsPreview  implements Initializable{

	@FXML
	Label section80C_usr,section80C,
	section80CCC_usr,section80CCC,section80CCD_usr,section80CCD,section80CCCD11B_usr,section80CCCD11B,section80CCD2_usr,
	section80CCD2,section80CCG_usr,section80CCG,section80DUsrType,section80D_usr,section80D,section80DD_Usr,section80DD,
	section80DDB_Usr,section80DDB,section80E_Usr,section80E,section80EE_Usr,section80EE,section80G_usr,section80G,
	section80GG_usr,section80GG,section80GGA_usr,section80GGA,section80GGC_usr,section80GGC,section80RRB_usr,section80RRB,
	section80QQB_usr,section80QQB,section80TTA_usr,section80TTA,section80U_usr,section80U,TotalDeductions_usr,
	TotalDeductions,taxabletotal,totalTaxPayable,rebate87A,taxPayableOnRebate,educationCess,grossTaxLiability,section89,netTaxLiability,
	intrstPayUs234A,intrstPayUs234B,intrstPayUs234C,totTaxPlusIntrstPay,surcharge,section80DD_UsrDrop,section80DDU_UsrDrop,section80DDB_UsrDrop,section80DMedicalUsrType,section80DMedical_usr,section80DPreventiveUsrType,section80DPreventive_usr;
	
	@FXML
	Label prof,salary,alwnsNotExempt,perquisitesValue,profitsInSalary,deductionUs16,incomeFromSal,typeofhp,grossRentReceived,taxPaidlocalAuth,annualValue,standardDeduction,
	interestPayable,totalIncomeOfHP,incomeOthSrc,grossTotIncome,intrstPayUs234F;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		// TODO Auto-generated method stub
		
		incomeFromSal.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromSal"));
	
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.typeOfHP").equals("S"))
		{
			typeofhp.setText("Self-Occupied");
		}
		else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.typeOfHP").equals("L"))
		{
			typeofhp.setText("Let Out");
		}
		else{typeofhp.setText("");}
		prof.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf"));
		salary.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.salary"));
		alwnsNotExempt.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.alwnsNotExempt"));
		perquisitesValue.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.perquisitesValue"));
		profitsInSalary.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.profitsInSalary"));
		deductionUs16.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductionUs16"));
		incomeFromSal.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromSal"));
		grossRentReceived.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossRentReceived"));
		taxPaidlocalAuth.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth"));
		annualValue.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.annualValue"));
		standardDeduction.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.standardDeduction"));
		interestPayable.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.interestPayable"));
		totalIncomeOfHP.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP"));
		incomeOthSrc.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeOthSrc"));

		
		grossTotIncome.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));
		
		section80C_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		section80C.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C"));
		section80CCC_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC"));
		section80CCC.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC"));
		section80CCD_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE"));
		section80CCD.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE"));
		
		section80CCCD11B_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		section80CCCD11B.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B"));
		section80CCD2_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		section80CCD2.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer"));
		section80CCG_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG"));
		section80CCG.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG"));
		
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").equals("empty")) {
			section80DD_UsrDrop.setText("");
		} else  {
			if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").equals("1"))
			{
				section80DD_UsrDrop.setText("Dependent person with Disability");
			}
			else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").equals("2"))
			{
				section80DD_UsrDrop.setText("Dependent person with Severe Disability");
			}
		} 
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").equals("empty")) {
			section80DDB_UsrDrop.setText("");
		} else  {
			if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").equals("1"))
			{
				section80DDB_UsrDrop.setText("Self or dependent");
			}
			else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").equals("2"))
			{
				section80DDB_UsrDrop.setText("Senior Citizen - Self or dependent");
			}
			else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").equals("3"))
			{
				section80DDB_UsrDrop.setText("Super Senior Citizen - Self or dependent");
			}
		} 
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").equals("empty")) {
			section80DDU_UsrDrop.setText("");
		} else  {
			if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").equals("1"))
			{
				section80DDU_UsrDrop.setText("Self with disability");
			}
			else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").equals("2"))
			{
				section80DDU_UsrDrop.setText("Self with severe disability");
			}
		} 
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").equals("1")) {
			section80DUsrType.setText("Self and Family");
		} else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").equals("2")) {
			section80DUsrType.setText("self(Senior citizen) and Family");
		} else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").equals("3")) {
			section80DUsrType.setText("Parents");
		}else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").equals("4")) {
			section80DUsrType.setText("Parents(Senior citizen)");
		}else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").equals("5")) {
			section80DUsrType.setText("Self and Family including Parents");
		}else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").equals("6")) {
			section80DUsrType.setText("Self and Family including Senior Citizen Parents");
		}else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").equals("7")) {
			section80DUsrType.setText("Self (Senior Citizen) and Family including Senior Citizen Parents");
		}
		else {
			section80DUsrType.setText("");
		}
		
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure").equals("1")) {
			section80DMedicalUsrType.setText("Self(Super Senior citizen) & family");
		} else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure").equals("2")) {
			section80DMedicalUsrType.setText("Parents(Super Senior citizen)");
		} else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure").equals("3")) {
			section80DMedicalUsrType.setText("Self(Super Senior citizen) & family (Super Senior citizen) including senior citizen parents");
		}
		else {
			section80DMedicalUsrType.setText("");
		}
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp").equals("1")) {
			section80DPreventiveUsrType.setText("Self and faimly");
		} else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp").equals("2")) {
			section80DPreventiveUsrType.setText("Parent");
		} else if (OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp").equals("3")) {
			section80DPreventiveUsrType.setText("Self and faimly and Parents");
		}
		else {
			section80DPreventiveUsrType.setText("");
		}
		
		section80D_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DHealthInsurancePremiumUsr"));
		section80DMedical_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DMedicalExpenditureUsr"));
		section80DPreventive_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DPreventiveHealthCheckUpUsr"));
		section80D.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80D"));
		section80DD_Usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD"));
		section80DD.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD"));
		section80DDB_Usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
		section80DDB.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB"));
		section80E_Usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		section80E.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E"));
		section80EE_Usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		section80EE.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE"));
		section80G_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		section80G.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G"));
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG").toString().equals("empty"))
		{
			section80GG_usr.setText("0");
		}
		else
		{
			section80GG_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		}
		
		section80GG.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG"));
		section80GGC_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		section80GGC.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC"));
		section80RRB_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB"));
		section80RRB.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB"));
		section80QQB_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB"));
		section80QQB.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB"));
		section80TTA_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA"));
		section80TTA.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA"));
		section80U_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U"));
		section80U.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U"));
		
		TotalDeductions_usr.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.totalChapVIADeductions"));
		TotalDeductions.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions"));
		taxabletotal.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome"));
		
		
		totalTaxPayable.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable"));
		rebate87A.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.rebate87A"));
		surcharge.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore"));
		taxPayableOnRebate.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.taxPayableOnRebate"));
		educationCess.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.educationCess"));
		grossTaxLiability.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.grossTaxLiability"));
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.section89").toString().equals("empty"))
		{
			section89.setText("0");
		}
		else
		{
			section89.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.section89"));
		}
		
		netTaxLiability.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.netTaxLiability"));
		intrstPayUs234A.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234A"));
		intrstPayUs234B.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B"));
		intrstPayUs234C.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234C"));
		intrstPayUs234F.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.intrstPay.lateFilingFee234F"));
		totTaxPlusIntrstPay.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxComputation.totTaxPlusIntrstPay"));
		
		
		
		}
	


}
