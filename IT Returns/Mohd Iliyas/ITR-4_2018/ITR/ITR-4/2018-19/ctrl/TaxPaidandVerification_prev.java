package com.itd.efiling.offline.ITR4.ctrl;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.BankDetailType;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.util.DateUtil;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;

public class TaxPaidandVerification_prev  implements Initializable{

	@FXML
	Label TotalAdvance,SelfAssemntTax,TDSclaimed,TCSclaimed,TotalTax,AmountPayable,Refund;
	
	@FXML
	Label Sec38,sec34,Agri_Income,bank,IFSCCode,NameBank,AcntNum,CashDep,trpName,trpPIN,trpAmount,capacity,country;
	
	@FXML
	GridPane grid;
	
	@FXML
	Label swiftcode,Non_Bank,iban;
	
	@FXML
	Label Name,father,Place,Verdate,VerPAN;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		// TODO Auto-generated method stub
		
		 ITRView form = (ITRView) Form.getForm();
		 LOG.info("value in controller"+form.getTaxDetailsTabController());
		List<BankDetailType> list =(List<BankDetailType>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.Income_Details_Table").getTableView().getItems();
		
		for(int i =0;i<list.size();i++)
		{
			BankDetailType td = list.get(i);
			grid.add(new Label(String.valueOf(i+2)), 0, i+1);
			grid.add(new Label(String.valueOf(td.getIfscCode())),1,i+1);
			grid.add(new Label(td.getBankName()),2,i+1);
			grid.add(new Label(td.getBankAccountNo().toString()),3,i+1);
			
			/*if(td.getCashDeposited()!=null){
				grid.add(new Label(td.getCashDeposited().toString()),4,i+1);
			}else{
				grid.add(new Label(),4,i+1);
			}*/
		}
		TotalAdvance.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.advanceTax"));
		SelfAssemntTax.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax"));
		TDSclaimed.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tds"));
		TCSclaimed.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tcs"));
		TotalTax.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid"));
		AmountPayable.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxPaid.balTaxPayable"));
		Refund.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.refundDue"));
		
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxExmpIntIncDtls.agricultureIncome").equals("empty"))
		{
			Agri_Income.setText("");
		}
		else
		{
			Agri_Income.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxExmpIntIncDtls.agricultureIncome"));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.bankDtlsFlag").equals("N"))
		{
			bank.setText("No");
		}
		else
		{
			bank.setText("Yes");
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode").equals("empty")){
			IFSCCode.setText("");}
		else{
			IFSCCode.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankName").equals("empty")){
			NameBank.setText("");}
		else{
			NameBank.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankName"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankAccountNo").equals("empty")){
			AcntNum.setText("");}
		else{
			AcntNum.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankAccountNo"));}
		/*if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.cashDeposited").equals("empty"))
		{
			CashDep.setText("");
		}
		else
		{
			CashDep.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.cashDeposited"));
		}*/
		
		
		String countryCode = OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.countryCode") ;
		
		String iban_countryCode = OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.countryCode") ;
		
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.swiftCode").equals("empty")){
			swiftcode.setText("");}
		else{
			swiftcode.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.swiftCode"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.bankName").equals("empty")){
			Non_Bank.setText("");}
		else{
			Non_Bank.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.bankName"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.iban").equals("empty")){
			iban.setText("");}
		else{
			iban.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.iban"));}
		
		country.setText(ComboBoxOptionsCacher.getValueForKey("itr.itr4.refund.bankAccountDtls.foreignBankDetails.countryCode",iban_countryCode));

		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerName").equals("empty")){
			Name.setText("");}
		else{
			Name.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerName"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.declaration.fatherName").equals("empty")){
			father.setText("");}
		else{
			father.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.declaration.fatherName"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.place").equals("empty")){
			Place.setText("");}
		else{
			Place.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.place"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.date").equals("empty")){
			Verdate.setText("");}
		else{
			Verdate.setText(DateUtil.toStringDate_preview(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.date")));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerPAN").equals("empty")){
			VerPAN.setText("");}
		else{
			VerPAN.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerPAN"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.capacity").equals("empty")){
			capacity.setText("");}
		else{
			capacity.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.capacity"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxReturnPreparer.nameOfTRP").equals("empty")){
			trpName.setText("");}
		else{
			trpName.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxReturnPreparer.nameOfTRP"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxReturnPreparer.identificationNoOfTRP").equals("empty")){
			trpPIN.setText("");}
		else{
			trpPIN.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxReturnPreparer.identificationNoOfTRP"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxReturnPreparer.reImbFrmGov").equals("empty")){
			trpAmount.setText("");}
		else{
			trpAmount.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxReturnPreparer.reImbFrmGov"));}
		
		
		
	}
	

}
