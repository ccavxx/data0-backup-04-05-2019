package com.itd.efiling.offline.ITR4.onchange.util;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSal;
import com.itd.efiling.offline.javafx.ui.components.Option;
import com.itd.efiling.offline.javafx.ui.components.ValComboBox;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.security.GeneralSecurityException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

import com.itd.efiling.offline.ITR4.ctrl.HyperLink;
import com.itd.efiling.offline.ITR4.ctrl.TDSDetails26QC_Controller;
import com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmIncome;
import com.itd.efiling.offline.ITR4.model.BankDetailType;
import com.itd.efiling.offline.ITR4.model.DoneeWithPan;
import com.itd.efiling.offline.ITR4.model.ITR;
import com.itd.efiling.offline.ITR4.model.ImmovableDetails;
import com.itd.efiling.offline.ITR4.model.InterestHeldInaAsset;
import com.itd.efiling.offline.ITR4.model.NatureOfBusiness;
import com.itd.efiling.offline.ITR4.model.OthersIncDtls;
import com.itd.efiling.offline.ITR4.model.ScheduleGC;
import com.itd.efiling.offline.ITR4.model.ScheduleGC.ScheduleGCDtls;
import com.itd.efiling.offline.ITR4.model.TCS;
import com.itd.efiling.offline.ITR4.model.TDSDetails26QC;
import com.itd.efiling.offline.ITR4.model.TDSDetails26QCB;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSal;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSalB;
import com.itd.efiling.offline.ITR4.model.TDSonSalary;
import com.itd.efiling.offline.ITR4.model.TaxCreditDetails;
import com.itd.efiling.offline.ITR4.model.TaxDeductDetails;
import com.itd.efiling.offline.ITR4.model.TaxPayment;
import com.itd.efiling.offline.ITR4.model.Us44AeHeavy;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.config.IFSC_Bank;
import com.itd.efiling.offline.common.dialog.MessageDialogCtrl;
import com.itd.efiling.offline.common.onchange.util.OnChangeCommonUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.common.util.Base64Utils;
import com.itd.efiling.offline.common.util.DataTransporter;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import com.itd.efiling.offline.common.validation.validators.ValidatorInteface;
import com.itd.efiling.offline.javafx.ui.components.ValComboBox;
import com.itd.efiling.offline.javafx.ui.components.ValidationAware;
import com.itd.efiling.offline.javafx.ui.wrappers.TabPropertyValueFactory;
import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;

import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.Button;


public class OnChangeUtil {

	private OnChangeUtil() {

	}
	
	@FXML
	Button addRowBtn,pandetailsButton;
	
	
	public static void validateTDS(ValidationAware field) throws java.text.ParseException {
	
		
		ValidationAware tcs = ValidationUtil.ALL_FIELDS_MAP.get("taxCollectedAtSourceController.type.amtClaimedBySpouse");
		ValidationAware panOfSpouse = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.panOfSpouse");
		
		if(field.getData() !=null)
		{
			if(field.getData().toString().equals("Y"))
			{
				MessageDialogCtrl.displayInfoDialog("",
							"You have selected to be governed by Sec 5A. Please enter only your share of 'Income from Business', 'Income from House Property' and 'Income from Other Sources'. Refer to instructions (A22) for further clarification..");
			
				tcs.setDisable(false);
				panOfSpouse.setDisable(false);
				@SuppressWarnings("unchecked")
				List<TCS> list = (List<TCS>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCollectedAtSource").getTableView().getItems();
				
				for(TCS td:list)
				{
					if(td.getAmtClaimedBySpouse() == null)
					{
						td.setAmtClaimedBySpouse(new BigInteger("0"));
						setElementValueByTargetName("taxCollectedAtSourceController.type.amtClaimedBySpouse", new BigInteger("0"));
					 	setElementValueByTargetName("itr.itr4.scheduleTCS.tcs.amtClaimedBySpouse", new BigInteger("0"));
					}
					
				}
				DataTransporter.updat(Form.getForm());
			}
			else
			{
						@SuppressWarnings("unchecked")
						List<TCS> list = (List<TCS>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCollectedAtSource").getTableView().getItems();
						
						for(TCS td:list)
						{
							td.setAmtClaimedBySpouse(null);
						}
					DataTransporter.updat(Form.getForm());
				 	tcs.setDisable(true);
				 	setElementValueByTargetName("taxCollectedAtSourceController.type.amtClaimedBySpouse", null);
				 	setElementValueByTargetName("itr.itr4.scheduleTCS.tcs.amtClaimedBySpouse", null);
					panOfSpouse.setDisable(true);
					setElementValueByTargetName("itr.itr4.filingStatus.panOfSpouse", null);
					
					
			}
		}
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}
	
	public static void onChangeIFSC(ValidationAware field) {

		if (String.valueOf(field.getData()).equals("0")) {
			// setElementValueByTargetName("itr.itr1.refund.bankAccountDtls.priBankDetails.bankName",null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode", null);
		}
		IFSC_Bank k = new IFSC_Bank();
		String IFSCKey = "0";
		if (field.getData() != null && !field.getData().toString().isEmpty()) {

			String IFSCfield = field.getData().toString();

			IFSCKey = IFSCfield.substring(0, 4);
		}

		String IFSCValue = IFSC_Bank.getStringValue(IFSCKey);
		String ifsc = getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode");
		if (ifsc.isEmpty() || ifsc.equals("null")) {
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankName", null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode", null);
		} else {

		if (field.getTarget().equals("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode")) {
				if (IFSCValue.equals("0")) {
					setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankName", null);

				} else {
					setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankName", IFSCValue);

				}

			} 
		}
		
		
		String conifsc = getElementValueByTargetName("incomeDetailsController.type.ifscCode");
		if (conifsc.isEmpty() || conifsc.equals("null")) {
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.bankName", null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.ifscCode", null);
			setElementValueByTargetName("incomeDetailsController.type.bankName", null);
			setElementValueByTargetName("incomeDetailsController.type.ifscCode", null);
		}
		else {
			
			if(field.getTarget().equals("incomeDetailsController.type.ifscCode")){
				if((IFSCValue.equals("0") || IFSCValue.equals("") || IFSCValue==null) || IFSCValue.equals("empty")){
					
					 	String IFSC=getElementValueByTargetName("incomeDetailsController.type.bankName");
					 	
					 	if(!IFSC.equals("empty"))
					 	{
					 	setElementValueByTargetName("incomeDetailsController.type.bankName", IFSC);
					    setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.addtnlBankDetails.bankName", IFSC);
					 	}
					 	else
					 	{
					 		setElementValueByTargetName("incomeDetailsController.type.bankName", null);
						    setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.addtnlBankDetails.bankName", null);
					 	}
						}
				else
				{
						   
					setElementValueByTargetName("incomeDetailsController.type.bankName", IFSCValue);
				}
			}
		}
	}
	
public static void onChangeBankDtlsFlag(ValidationAware field) {	
	
	
	
	
		String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
		ValidationAware Bankflag = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.refund.bankAccountDtls.bankDtlsFlag");
		ValidationAware pifsc = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode");
		ValidationAware pname = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.priBankDetails.bankName");
		ValidationAware paccount = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.priBankDetails.bankAccountNo");
		ValidationAware pcash = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.priBankDetails.cashDeposited");

		ValidationAware fifsc = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.foreignBankDetails.swiftCode");
		ValidationAware fname = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.foreignBankDetails.iban");
		ValidationAware fcountry = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.foreignBankDetails.bankName");
		ValidationAware fcountryNew = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.refund.bankAccountDtls.foreignBankDetails.countryCode");
		
		ValidationAware Oifsc = ValidationUtil.ALL_FIELDS_MAP.get("incomeDetailsController.type.ifscCode");
		ValidationAware Oname = ValidationUtil.ALL_FIELDS_MAP.get("incomeDetailsController.type.bankName");
		ValidationAware Oaccount = ValidationUtil.ALL_FIELDS_MAP.get("incomeDetailsController.type.bankAccountNo");
		//ValidationAware Ocash = ValidationUtil.ALL_FIELDS_MAP.get("incomeDetailsController.type.cashDeposited");
		
		
		if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {
			
			
			
			Bankflag.setDisable(true);
			Bankflag.setData("Y");
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.bankDtlsFlag", "Y");
			
			pifsc.setDisable(false);
			pname.setDisable(false);
			paccount.setDisable(false);
			//pcash.setDisable(false);
			
			Oifsc.setDisable(false);
			Oname.setDisable(false);
			Oaccount.setDisable(false);
			//Ocash.setDisable(false);
		}
		
		
		
		if (field.getData()==null || field.getData().equals("Y")) {
			
			
			fifsc.setDisable(true);
			fifsc.setData("");
			fname.setDisable(true);
			fname.setData("");
			fcountry.setDisable(true);
			fcountryNew.setDisable(true);
			fcountry.setData("");
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.bankDtlsFlag", "Y");
			
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.iban", null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.bankName", null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.swiftCode", null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.foreignBankDetails.countryCode", null);

			pifsc.setDisable(false);
			pname.setDisable(false);
			paccount.setDisable(false);
			//pcash.setDisable(false);

			Oifsc.setDisable(false);
			Oname.setDisable(false);
			Oaccount.setDisable(false);
			//Ocash.setDisable(false);
			/*if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {
				
				LOG.info("525252");
				Bankflag.setDisable(true);
				Bankflag.setData("Y");
				setElementValueByTargetName("itr.itr1.refund.bankAccountDtls.bankDtlsFlag", "Y");
				
				pifsc.setDisable(false);
				pname.setDisable(false);
				paccount.setDisable(false);
				pcash.setDisable(false);
				
				Oifsc.setDisable(false);
				Oname.setDisable(false);
				Oaccount.setDisable(false);
				Ocash.setDisable(false);
			}*/

		} else {
			
			LOG.info("Verification :3:");
			pifsc.setDisable(true);
			pifsc.setData(null);
			pname.setDisable(true);
			pname.setData(null);
			paccount.setDisable(true);
			paccount.setData(null);
			//pcash.setDisable(true);
			//pcash.setData(null);
			

			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.ifscCode", null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankName", null);
			setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.priBankDetails.bankAccountNo", null);

			Oifsc.setDisable(true);
			Oifsc.setData("");
			Oname.setDisable(true);
			Oname.setData("");
			Oaccount.setDisable(true);
			Oaccount.setData("");
			//Ocash.setDisable(true);
			//Ocash.setData("");

			fifsc.setDisable(false);

			fname.setDisable(false);

			fcountry.setDisable(false);
			fcountryNew.setDisable(false);
			// fcountry.setData("-1");

		
			
			
			

			@SuppressWarnings("unchecked")
			List<BankDetailType> list = (List<BankDetailType>) ValidationUtil.ALL_TVC
					.get("class com.itd.efiling.offline.ITR4.ctrl.Income_Details_Table").getTableView().getItems();

			if (list != null && !list.isEmpty()) {

				((ITR) Form.getForm().getEntity()).getItr4().getRefund().getBankAccountDtls().getAddtnlBankDetails()
						.clear();
			}

			list.clear();

			if(residentialStatus.equals("NRI"))
			{
				if(field.getData().equals("N") )
				{
					MessageDialogCtrl.displayInfoDialog("WARNING",
							"Currently refund will be credited to a bank account located in India and not to a bank account located in a foreign country.");			}
				//OnChangeCommonUtil.flagtable6="true";
			}
		}
		
		/*if(residentialStatus.equals("NRI"))
		{
			if(field.getData().equals("N") && OnChangeCommonUtil.flagtable6 == "true")
			{
				MessageDialogCtrl.displayInfoDialog("WARNING",
						"Currently refund will be credited to a bank account located in India and not to a bank account located in a foreign country.");			}
			OnChangeCommonUtil.flagtable6="true";
		}*/

	}
	public static void onChangeStatus(ValidationAware field) throws java.text.ParseException {
		
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
		ValidationAware Bankflag = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.refund.bankAccountDtls.bankDtlsFlag");
		ValidationAware flag = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank");
		ValidationAware flag1 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode");
		ValidationAware flag2 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD6Per");
		ValidationAware flag3 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD8Per");
		ValidationAware flag4 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44ADA.grsReceipt");
		ValidationAware flag5 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA");
		ValidationAware totalPresumptive44AD = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD");
		
		if (field.getData()!= null && field.getData().equals("NRI")) {
			String bankFlag=getElementValueByTargetName("itr.itr4.refund.bankAccountDtls.bankDtlsFlag");
			if(bankFlag.equals(""))
			{
				Bankflag.setDisable(false);
				Bankflag.setData("Y");
				setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.bankDtlsFlag", "Y");
			}
			else
			{
				Bankflag.setDisable(false);
				setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.bankDtlsFlag", bankFlag);
			}
			flag.setDisable(true);
			flag1.setDisable(true);
			flag2.setDisable(true);
			flag3.setDisable(true);
			flag4.setDisable(true);
			flag5.setDisable(true);
			flag.setData("");
			flag1.setData("");
			flag2.setData("");
			flag3.setData("");
			flag4.setData("");
			flag5.setData("");
			totalPresumptive44AD.setData("");
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank", null);
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode", null);
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD6Per", null);
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD8Per", null);
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.grsReceipt", null);
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA", null);
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD", null);
			
		} else {
			
			if((field.getData() == null) ||(field.getData().equals("-1") && field.getData().equals("empty")))
			{
				flag.setDisable(true);
				flag1.setDisable(true);
				flag2.setDisable(true);
				flag3.setDisable(true);
				flag4.setDisable(true);
				flag5.setDisable(true);
				flag.setData("");
				flag1.setData("");
				flag2.setData("");
				flag3.setData("");
				flag4.setData("");
				flag5.setData("");
				totalPresumptive44AD.setData("");
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank", null);
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode", null);
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD6Per", null);
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD8Per", null);
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.grsReceipt", null);
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA", null);
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD", null);
			}
			else
			{
				flag.setDisable(false);
				flag1.setDisable(false);
				flag2.setDisable(false);
				flag3.setDisable(false);
				flag4.setDisable(false);
				flag5.setDisable(false);
			}
			
			
			Bankflag.setDisable(true);
			Bankflag.setData("Y");
			setElementValueByTargetName("itr.itr1.refund.bankAccountDtls.bankDtlsFlag", "Y");
		}
		if(field.getTarget().toString().equals("itr.itr4.filingStatus.residentialStatusfirm"))
		{
			
	      setElementValueByTargetName("itr.itr4.filingStatus.residentialStatus", field.getData().toString());
		}
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(status.equals("H") && field.getData().equals("NRI"))
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",new BigInteger("0"));
    		
    	}
    	else if(status.equals("I") && field.getData().equals("NRI"))
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",new BigInteger("0"));
    	}
    	else if(field.getData()!=null && status.equals("F"))
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",new BigInteger("0"));
    	}
    	else
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(false);
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(false);
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(false);
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(false);
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType").setDisable(false);
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U").setDisable(false);
    		
    		
    	}
		onChangeBankDtlsFlag(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.refund.bankAccountDtls.bankDtlsFlag"));
		
		presumptiveTotal();
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}
	
	
	public static void immovableAsseseTable_Validation(ValidationAware field) throws java.text.ParseException {
		
		
		if(field.getData()!=null)
		{
			if(field.getTarget().equalsIgnoreCase("itr.itr4.scheduleAL.immovableFlag"))
			{
			if(field.getData().toString().equals("Y"))
			{
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.description").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceNo").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceName").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.roadOrStreet").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.localityOrArea").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.cityOrTownOrDistrict").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.stateCode").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.countryCode").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setDisable(false);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.amount").setDisable(false);
				 
			}
			else
			{
				List<ImmovableDetails>  list=(List<ImmovableDetails>) OnChangeUtil.getElementValueByTarget("itr.itr4.scheduleAL.immovableDetails");
				if(list != null )
				{
					list.clear();
				}
				
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.description").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceNo").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceName").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.roadOrStreet").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.localityOrArea").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.cityOrTownOrDistrict").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.stateCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.countryCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.amount").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.description").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceNo").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceName").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.roadOrStreet").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.localityOrArea").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.cityOrTownOrDistrict").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.stateCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.countryCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.amount").setData(null);
				 
				 
				 
				 
			}
			}
			else if(field.getTarget().equalsIgnoreCase("itr.itr4.scheduleAL.interstAOPFlag"))
			{
				
				if(field.getData().toString().equals("Y"))
				{
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.nameOfFirm").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceNo").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceName").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.roadOrStreet").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.localityOrArea").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.cityOrTownOrDistrict").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.stateCode").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.countryCode").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.pinCode").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.panOfFirm").setDisable(false);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.assesseInvestment").setDisable(false);
					 
				}
				else
				{
					List<InterestHeldInaAsset>  list_aop=(List<InterestHeldInaAsset>) OnChangeUtil.getElementValueByTarget("itr.itr4.scheduleAL.interestHeldInaAsset");
					if(list_aop!=null)
					{
						list_aop.clear();
					}
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.nameOfFirm").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceNo").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceName").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.roadOrStreet").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.localityOrArea").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.cityOrTownOrDistrict").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.stateCode").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.countryCode").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.pinCode").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.panOfFirm").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.assesseInvestment").setDisable(true);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.nameOfFirm").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceNo").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceName").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.roadOrStreet").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.localityOrArea").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.cityOrTownOrDistrict").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.stateCode").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.countryCode").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.pinCode").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.panOfFirm").setData(null);
					 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.assesseInvestment").setData(null);
					 
					 
				}
			}
		}
		else
		{
			if(field.getTarget().equals("itr.itr4.scheduleAL.immovableFlag"))
			{
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.description").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceNo").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceName").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.roadOrStreet").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.localityOrArea").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.cityOrTownOrDistrict").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.stateCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.countryCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.amount").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.description").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceNo").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceName").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.roadOrStreet").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.localityOrArea").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.cityOrTownOrDistrict").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.stateCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.countryCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.amount").setData(null);
				 
			}
			else
			{
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.nameOfFirm").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceNo").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceName").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.roadOrStreet").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.localityOrArea").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.cityOrTownOrDistrict").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.stateCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.countryCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.pinCode").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.panOfFirm").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.assesseInvestment").setDisable(true);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.nameOfFirm").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceNo").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceName").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.roadOrStreet").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.localityOrArea").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.cityOrTownOrDistrict").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.stateCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.countryCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.pinCode").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.panOfFirm").setData(null);
				 ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.assesseInvestment").setData(null);
				 
			}
		}
		//defaultZero(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.immovableFlag"));
	}
	public static void onChangeReturnFileSec(ValidationAware field) throws java.text.ParseException {
		
		
		RefHolders.flag234A = false;
		String returnFileSec=getElementValueByTargetName("itr.itr4.filingStatus.returnFileSec");
		if(field.getData()!= null && field.getData().toString().equals("Y"))
		{
			MessageDialogCtrl.displayInfoDialog("",
					"You have selected to be governed by Sec 5A. Please enter only your share of 'Income from Business', 'Income from House Property' and 'Income from Other Sources'. Refer to instructions (A22) for further clarification.");
		}
		if(field.getData()!= null && (field.getData().toString().equals("20") || returnFileSec.equals("20")))
		{
			MessageDialogCtrl.displayInfoDialog("WARNING",
					"Sec139(4) read with section 119(2)(b) should be filed after expiry of due date mentioned in 139(1)/139(4).");
		}
		
		ValidationAware flag = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.ackNoOriginalReturn");
		ValidationAware flag1 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.defRetOrigRetFiledDate");
		ValidationAware flag2 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.noticeNo");
		ValidationAware revisednoticeDate = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.noticeDateUnderSec");
		ValidationAware flag4 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.receiptNo");
		ValidationAware flag5 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.origRetFiledDate");
		ValidationAware flag6 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.returnType");
		ValidationAware flag7 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.portugeseCC5A");
		ValidationAware flag8 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.panOfSpouse");
		ValidationAware flag9 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.taxStatus");
	//	ValidationAware A26 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.noticeNoUs142");
		ValidationAware interest_234A = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.taxComputation.intrstPay.intrstPayUs234A");
		ValidationAware interest_234B = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.taxComputation.intrstPay.intrstPayUs234B");
	//	ValidationAware interest_234C = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.taxComputation.intrstPay.intrstPayUs234C");
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		
		flag4.setDisable(true);
        flag5.setDisable(true);
		flag2.setDisable(true);
        flag.setDisable(true);
        revisednoticeDate.setDisable(true);
        
        String x = String.valueOf(flag7.getData());
        
		if (x == "null" || x.equals(null)) {
			x = "-1";
         }
		if (x.equals("Y")) {
			flag8.setDisable(false);
		}
		if (x.equals("N") || x.equals("-1")) {
			
			flag8.setDisable(true);
			flag8.setData("");
		}
		

		if (field.getData().toString().equals("18") || returnFileSec.equals("18")) {
			flag.setDisable(false);
			flag1.setDisable(false);
			flag2.setDisable(false);
			setElementValueByTargetName("itr.itr4.filingStatus.receiptNo", null);
			flag4.setDisable(true);
			flag5.setDisable(false);
			setElementValueByTargetName("itr.itr4.filingStatus.origRetFiledDate", null);
			flag5.setDisable(true);
			setElementValueByTargetName("itr.itr4.filingStatus.returnType", "O");
			flag6.setData('O');
			interest_234A.setDisable(true);
			interest_234B.setDisable(true);
		//	interest_234C.setDisable(true);
			/*A26.setDisable(false);
			A26.setDisable(true);
			A26.setData("");*/
			revisednoticeDate.setDisable(false);

		} else if (field.getData().toString().equals("17") || returnFileSec.equals("17")) {
			setElementValueByTargetName("itr.itr4.filingStatus.returnType", "R");
			flag.setDisable(true);
			setElementValueByTargetName("itr.itr4.filingStatus.ackNoOriginalReturn", null);
			//flag.setData("");
			flag1.setDisable(false);
			setElementValueByTargetName("itr.itr4.filingStatus.defRetOrigRetFiledDate", null);
			flag1.setDisable(true);
			flag2.setDisable(true);
			setElementValueByTargetName("itr.itr4.filingStatus.noticeNo", null);
			//flag2.setData("");
			flag4.setDisable(false);
			flag5.setDisable(false);
			//A26.setDisable(false);
			interest_234A.setDisable(true);
			interest_234B.setDisable(true);
		//	interest_234C.setDisable(true);
			revisednoticeDate.setDisable(false);
			setElementValueByTargetName("itr.itr4.filingStatus.noticeDateUnderSec", null);
			revisednoticeDate.setDisable(true);
			//A26.setDisable(true);
		//	A26.setData("");
		}
		
		else {
			
			if (field.getData().toString().equals("13") || field.getData().toString().equals("14")
					|| field.getData().toString().equals("15") || field.getData().toString().equals("13") || returnFileSec.equals("14")
					|| returnFileSec.equals("15")) {
				revisednoticeDate.setDisable(false);
		//		A26.setDisable(false);
				setElementValueByTargetName("itr.itr4.filingStatus.ackNoOriginalReturn", null);
				flag.setDisable(true);
				flag1.setDisable(false);
				setElementValueByTargetName("itr.itr4.filingStatus.defRetOrigRetFiledDate", null);
				flag1.setDisable(true);
				flag2.setDisable(true);
				setElementValueByTargetName("itr.itr4.filingStatus.noticeNo", null);
				flag4.setDisable(true);
				setElementValueByTargetName("itr.itr4.filingStatus.receiptNo", null);
				flag5.setDisable(false);
				setElementValueByTargetName("itr.itr4.filingStatus.origRetFiledDate", null);
				flag5.setDisable(true);
				interest_234A.setDisable(false);
				interest_234B.setDisable(false);
				//interest_234C.setDisable(false);
			} else {
				if(returnFileSec.equals("16"))
				{
			//		A26.setDisable(false);
					interest_234A.setDisable(false);
					interest_234B.setDisable(false);
					revisednoticeDate.setDisable(false);
				}
				else if(returnFileSec.equals("12"))
				{
			//		A26.setDisable(true);
			//		A26.setData("");
					interest_234A.setDisable(true);
					interest_234B.setDisable(true);
				//	interest_234C.setDisable(true);
					revisednoticeDate.setDisable(false);
					setElementValueByTargetName("itr.itr4.filingStatus.noticeDateUnderSec", null);
					revisednoticeDate.setDisable(true);
				}
				else if(returnFileSec.equals("11"))
				{
			//		A26.setDisable(true);
			//		A26.setData("");
					interest_234A.setDisable(true);
					interest_234B.setDisable(true);
				//	interest_234C.setDisable(true);
					revisednoticeDate.setDisable(false);
					setElementValueByTargetName("itr.itr4.filingStatus.noticeDateUnderSec", null);
					revisednoticeDate.setDisable(true);
					
				}
				else
				{
					revisednoticeDate.setDisable(false);
					setElementValueByTargetName("itr.itr4.filingStatus.noticeDateUnderSec", null);
					revisednoticeDate.setDisable(true);
			//		A26.setDisable(true);
		//			A26.setData("");
					interest_234A.setDisable(false);
					interest_234B.setDisable(false);
				//	interest_234C.setDisable(false);
				}
				
				setElementValueByTargetName("itr.itr4.filingStatus.ackNoOriginalReturn", null);
				flag.setDisable(true);
				flag1.setDisable(false);
				setElementValueByTargetName("itr.itr4.filingStatus.defRetOrigRetFiledDate", null);
				flag1.setDisable(true);
				flag2.setDisable(true);
				setElementValueByTargetName("itr.itr4.filingStatus.noticeNo", null);
				flag4.setDisable(true);
				setElementValueByTargetName("itr.itr4.filingStatus.receiptNo", null);
				flag5.setDisable(false);
				setElementValueByTargetName("itr.itr4.filingStatus.origRetFiledDate", null);
				flag5.setDisable(true);
			}
			setElementValueByTargetName("itr.itr4.filingStatus.returnType", "O");
		}

	    intialize();
	    
		immovableAsseseTable_Validation(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.immovableFlag"));
		immovableAsseseTable_Validation(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.interstAOPFlag"));
		onChangePersonalStatus(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.status"));
		onChangeStatus(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.residentialStatus"));
	//	onChangeState(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.stateCode"));
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
	//	onChangeBankFlag();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		/*onChangeSection80D1(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr"));
		*/onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		/*onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC_Usr"));
		*/
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
		//CT_Tab1_StateValidate(ValidationUtil.ALL_FIELDS_MAP.get("controllerScheduleCT1.type.addressCT.stateCode"));
		
		
	}
	public static void onImportVal() throws Exception {
		checkPinZipOnload();
		String country=getElementValueByTargetName("itr.itr4.personalInfo.address.countryCode");
		
			if(country.equals("91"))
			{
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCodeMobile").setDisable(true);
			}
			else
			{
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCodeMobile").setDisable(false);
			}

		
		RefHolders.flag_90=true;
	}
	public static void checkPinZipOnload() {
		ValidationAware zipcode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipCode");
		ValidationAware pincode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.pinCode");
		ValidationAware zipcodeCheck = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipcodeCheck");
		ValidationAware country = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCode");
		
		
		if (country.getData().equals("91") || country.getData().equals("-1")) {
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", false);
			zipcodeCheck.setDisable(true);
			pincode.setDisable(false);
			zipcode.setDisable(true);
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipcode", null);
		} else {
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", false);
			zipcodeCheck.setDisable(false);
			pincode.setDisable(true);
			zipcode.setDisable(false);
			setElementValueByTargetName("itr.itr4.personalInfo.address.pincodee", null);
			if (zipcode.getData().equals("XXXXXX")) {
				zipcode.setDisable(true);
				setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", true);
			} else {
				zipcode.setDisable(false);
				setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", false);
			}

		}
	}
	
	public static void onChangePan(ValidationAware field) {
		
		
	    String pan=getElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerPAN");
	     
	    if(pan == null || pan.equals("empty") || pan.equals(""))
	    {
	    	setElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerPAN", field.getData().toString());
	    }
	    else
	    {
	    	setElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerPAN",pan );
	    }
		
		RefHolders.pan=field.getData().toString();
		String _80G1 = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController1.type.doneePAN").getData());
		String _80G2 = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController2.type.doneePAN").getData());
		String _80G3 = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController3.type.doneePAN").getData());
		String _80G4 = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController.type.doneePAN").getData());
		if (!(String.valueOf(field.getData()).equals(""))) {
			
			if (field.getData().toString().equals(_80G1) || field.getData().toString().equals(_80G2)
					|| field.getData().toString().equals(_80G3) || field.getData().toString().equals(_80G4)) {
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Enter the PAN of the person to whom the donation is made.");
				setElementValueByTargetName(field.getTarget().toString(), "");
			}
		}
		
		if(!ValidationUtil.isObjectEmpty(field.getData()) && getElementValueByTargetName("itr.itr4.filingStatus.panOfSpouse") != null)
		{
			if(field.getData().equals(getElementValueByTargetName("itr.itr4.filingStatus.panOfSpouse")))
					{
						MessageDialogCtrl.displayErrorDialog("ERROR",
						"PAN entered in Part A -General Information and PAN of the Spouse cannot be same.");
						setElementValueByTargetName("itr.itr4.filingStatus.panOfSpouse", null);
					}
		}
		
		if(!ValidationUtil.isObjectEmpty(field.getData()) && getElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN") != null)
		{
			if(field.getData().equals(getElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN")))
					{
						MessageDialogCtrl.displayErrorDialog("ERROR",
						"PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same.");
						setElementValueByTargetName(field.getTarget(), null);
					}
		}
		
		if(!ValidationUtil.isObjectEmpty(field.getData()) && getElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN") != null)
		{
			if(field.getData().equals(getElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN")))
					{
						MessageDialogCtrl.displayErrorDialog("ERROR",
						"PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same.");
						setElementValueByTargetName(field.getTarget(), null);
					}
		}
		
		
		if(!ValidationUtil.isObjectEmpty(field.getData()) && getElementValueByTargetName("tdsDetails26QCIncomeController.type.paNofTenant") != null)
		{
			if(field.getData().equals(getElementValueByTargetName("tdsDetails26QCIncomeController.type.paNofTenant")))
					{
						MessageDialogCtrl.displayErrorDialog("ERROR",
						"PAN entered in Part A -General Information and PAN of the Tenant cannot be same.");
						setElementValueByTargetName(field.getTarget(), null);
					}
		}
		
		
		if(!ValidationUtil.isObjectEmpty(field.getData()) && getElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN") != null)
		{
			if(field.getData().equals(getElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN")))
					{
						MessageDialogCtrl.displayErrorDialog("ERROR",
						"PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same.");
						setElementValueByTargetName(field.getTarget(), null);
					}
		}
		
		if(!ValidationUtil.isObjectEmpty(field.getData()) && getElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN") != null)
		{
			if(field.getData().equals(getElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN")))
					{
						MessageDialogCtrl.displayErrorDialog("ERROR",
						"PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same.");
						setElementValueByTargetName(field.getTarget(), null);
					}
		}
		
	}
	
	
	

public static void onCheckZipcode(ValidationAware field) {
		
		/*ValidationAware country=ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCode");
		ValidationAware state=ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.stateCode");
		ValidationAware zipcode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipCode");
		
		if(country.getData() == null)
		{
			country.setData("");
		}
		if(!(country == null && country.getData().toString().equals("91"))||(state.getData().toString().equals("99"))){
			
			if(field == null )
			{
				
				if(zipcode.getData()!= null && zipcode.getData().equals("XXXXXX"))
				{
					setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", true);
				}
				
			}
			
			
			if (field != null && field.getData().toString() == "true" && (ValidationUtil.isObjectEmpty(zipcode.getData()) || zipcode.getData().equals("XXXXXX"))) {
				
				setElementValueByTargetName(field.getTarget(), true);
				setElementValueByTargetName("itr.itr4.personalInfo.address.zipCode", "XXXXXX");
				zipcode.setDisable(true);
				String k = getElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck");
				
			} else if(field != null && field.getData().toString() == "false"){
				
				if(zipcode.getData() == null || zipcode.getData().toString().equals("XXXXXX"))
				{
					setElementValueByTargetName("itr.itr4.personalInfo.address.zipCode", null);
				}
				else
				{
					setElementValueByTargetName("itr.itr4.personalInfo.address.zipCode", zipcode.getData());
				}
				zipcode.setDisable(false);
			}
			
		}*/
	
	ValidationAware country = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCode");
	ValidationAware state = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.stateCode");
	ValidationAware zipcode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipCode");

	if (!(country.getData().equals("91")) || (state.getData().equals("99"))) {
		if (field.getData().toString() == "true") {
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipCode", "XXXXXX");

			zipcode.setDisable(true);

			String k = getElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck");
			LOG.info(k);
		} else if (field.getData().toString() == "false") {
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipCode", null);
			zipcode.setDisable(false);
		}
	}
	}
	public static void onChangeState(ValidationAware field) {
		ValidationAware zipcode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipCode");
		ValidationAware pincode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.pinCode");
		ValidationAware zipcodeCheck = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipcodeCheck");
		String country = getElementValueByTargetName("itr.itr4.personalInfo.address.countryCode");


		if (field != null && field.getData().equals("99")) {
			pincode.setData(null);
			setElementValueByTargetName("itr.itr4.personalInfo.address.pinCode", null);
			//setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", false);
			//setElementValueByTargetName("itr.itr1.personalInfo.address.zipcode", null);
			/*if(zipcode.getData() != null && zipcodeCheck.getData().toString().equals("false") && !zipcode.getData().toString().equals("XXXXXX"))
			{
				zipcode.setDisable(false);
			}
			else
			{*/
				/*setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", true);
				zipcodeCheck.setDisable(false);
				zipcodeCheck.setData("true");
				setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", true);
				zipcode.setDisable(true);*/
			zipcode.setDisable(false);
			zipcodeCheck.setDisable(false);
			pincode.setDisable(true);
		} else {
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", false);
			zipcode.setData(null);
			zipcodeCheck.setData(null);
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipCode", null);
			zipcode.setDisable(true);
			pincode.setDisable(false);
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", null);
			zipcodeCheck.setDisable(true);
		}

		if ((field.getData().equals("-1"))) {

			setElementValueByTargetName("itr.itr4.personalInfo.address.countryCode", "-1");

		} else if (field.getData().equals("99")) {
			    
			
				setElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobile", null);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCodeMobile").setDisable(false);
				setElementValueByTargetName("itr.itr4.personalInfo.address.countryCode", "-1");
			

		} else {
			setElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobile", new BigInteger("91"));
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCodeMobile").setDisable(true);
			setElementValueByTargetName("itr.itr4.personalInfo.address.countryCode", "91");

		}
		
		//onCheckZipcode(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipcodeCheck"));
	}
	
public static void onChangeCountry(ValidationAware field) {
		
		String state = String
				.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.stateCode").getData());
		if ((field.getData().equals("91") && (state.equals("99")))) {
			MessageDialogCtrl.displayInfoDialog("ERROR",
					"Country should be other than India, as you have selected state outside India.");
			setElementValueByTargetName(field.getTarget(), "-1");

		} 
		else if(!field.getData().toString().equalsIgnoreCase("91"))
		{
			setElementValueByTargetName("itr.itr4.personalInfo.address.stateCode", "99");
		}
		else {
			if ((!field.getData().equals("91") && (!state.equals("99")))) {
				if (state.equals("null")) {

					String country = String.valueOf(
							ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCode").getData());
					setElementValueByTargetName(field.getTarget(), country);
				} else {
					MessageDialogCtrl.displayInfoDialog("ERROR",
							"Country cannot be other than India, as you have selected an Indian state.");
					setElementValueByTargetName(field.getTarget(), "-1");
				}

			}
		}
		ValidationAware zipcode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipCode");
		ValidationAware pincode = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.pinCode");
		ValidationAware zipcodeCheck = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.zipcodeCheck");
		if (field.getData()!=null && field.getData().equals("91")) {
			setElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobile", new BigInteger("91"));
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCodeMobile").setDisable(true);
			zipcode.setData("");
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipCode", "");
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", false);
			zipcode.setDisable(false);
			zipcode.setDisable(true);
			zipcodeCheck.setDisable(true);
			pincode.setDisable(false);
		} else {
			setElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobile", null);
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.countryCodeMobile").setDisable(false);
			pincode.setData("");
			setElementValueByTargetName("itr.itr4.personalInfo.address.pinCode", "");
			setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck", false);
			//setElementValueByTargetName("itr.itr1.personalInfo.address.zipcode", null);
			zipcode.setDisable(false);
			zipcodeCheck.setDisable(false);
			pincode.setDisable(true);
			
		}
		//onCheckZipcode(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.personalInfo.address.zipcodeCheck"));
	}
	
	public static void onChangeIncome(ValidationAware field) throws java.text.ParseException {
	
		
		if (field.getData() != null) {
			BigInteger incomeFromOther = BigInteger.valueOf(Long.valueOf(field.getData().toString()));
			BigInteger totalincofHP = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP");
			BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
			BigInteger sum = totalincofHP.add(incomeFromOther).add(incomeFromSal);

			
		}
			
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
		
		
	
	}
	
	
	public static void onChangeTotalIncomeOfHP(ValidationAware field) throws java.text.ParseException {

		// selfOccupdNegativChk();
		if (field.getData() != null) {
			BigInteger totalincofHP = BigInteger.valueOf(Long.valueOf(field.getData().toString()));
			/*BigInteger incomeFromOther = getElementValueByTargetNameBig("itr.itr1.itr1IncomeDeductions.incomeOthSrc");
			BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr1.itr1IncomeDeductions.incomeFromSal");
			BigInteger sum = totalincofHP.add(incomeFromOther).add(incomeFromSal);*/
			/*if (totalincofHP.compareTo(new BigInteger("-200000"))==-1) {
				MessageDialogCtrl.displayInfoDialog("Info",
						"To avail the benefit of carry forward and set off of loss, please use ITR-2.");
			}*/
			OnChangeCommonUtil.flagtable3 = "true";
			OnChangeCommonUtil.flagtable4 = "true";
		}
		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}
	
	
	
	public static void onChangeIncomeFromOther(ValidationAware field) throws java.text.ParseException {

		if (field.getData() != null) {
			BigInteger incomeFromOther = BigInteger.valueOf(Long.valueOf(field.getData().toString()));
			BigInteger totalincofHP = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP");
			BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
			BigInteger sum = totalincofHP.add(incomeFromOther).add(incomeFromSal);

			

		} // onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}
	public static void GrossIncome() throws java.text.ParseException {

		BigInteger incomeFromBusiness = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf");
		BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
		String typeOfHP = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.typeOfHP");
		BigInteger totalIncomeOfHp = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP");
		BigInteger incomeFromOther = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeOthSrc");

		
		if(totalIncomeOfHp.compareTo(new BigInteger("-200000"))==-1)
		{
			totalIncomeOfHp=new BigInteger("-200000");
		}

		BigInteger grossTotIncome = incomeFromSal.add(totalIncomeOfHp).add(incomeFromBusiness).add(incomeFromOther);
		
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", grossTotIncome);
	
	}
	

	public static void onChangeSection80C_User(ValidationAware field) throws java.text.ParseException {
		
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && (status.equalsIgnoreCase("I")||status.equalsIgnoreCase("H") )) {
			

			BigInteger section80_User = new BigInteger(String.valueOf(field.getData()));
			BigInteger grossTotIncome = new BigInteger(
					getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (grossTotIncome.compareTo(new BigInteger("100000")) == 1) {

					if (section80_User.compareTo(new BigInteger("150000")) == 1) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
								new BigInteger("150000"));
					} else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
								field.getData());

					}
				} else {

					if (section80_User.compareTo(grossTotIncome) == 1) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
								grossTotIncome);

					} else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
								field.getData());

					}

				}

				BigInteger section80C = new BigInteger(
						getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C"));

				if (grossTotIncome.compareTo(section80C) == -1) {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
							grossTotIncome);

				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
						new BigInteger("0"));

			}

			
			

		} else {
			BigInteger C_80=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C",
					C_80);
			if(status.equals("F"))
			{
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
					new BigInteger("0"));
			}

		}
		intialize();
		checkSum80C80CCC();
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80CCC_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
		
		
		
		
		

		
	}
	public static void onChangeSection80CCC_User(ValidationAware field) throws java.text.ParseException {
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {
			BigInteger section80CCC_User = new BigInteger(field.getData().toString());
			BigInteger grossTotIncome = new BigInteger(
					getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (grossTotIncome.compareTo(new BigInteger("100000")) == 1) {
					int val = section80CCC_User.compareTo(new BigInteger("150000"));
					if (val == 1) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
								new BigInteger("150000"));
					} else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
								section80CCC_User);

					}
				} else {
					// setElementValueByTargetName("itr.DeductUndChapVIAType.section80C",field.getData());

					if (section80CCC_User.compareTo(grossTotIncome) == 1) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
								grossTotIncome);

					} else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
								field.getData());

					}

				}

				BigInteger section80CCC = getElementValueByTargetNameBig(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC");

				if (grossTotIncome.compareTo(section80CCC) == -1) {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
							grossTotIncome);

				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
						new BigInteger("0"));             
				
			}
		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
					new BigInteger("0"));
			}
		}
		checkSum80C80CCC();
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80CCD(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	
	
	

	public static void onChangeSection80CCD(ValidationAware field) throws java.text.ParseException {
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field != null && status.equalsIgnoreCase("I")) {
			BigInteger section80CCD1_User1 = (new BigInteger(field.getData().toString()))
					.multiply(new BigInteger("10"));
			BigInteger section80CCD = new BigInteger(field.getData().toString());
			BigInteger b1Amount=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.salary");
			BigInteger b2Amount=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.alwnsNotExempt");
			BigInteger b4Amount=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.profitsInSalary");
			
			BigInteger incomeFromSal = b1Amount.add(b2Amount).add(b4Amount);
			BigInteger temp1 = incomeFromSal.multiply(new BigInteger("10"));
			BigInteger temp2 = temp1.divide(new BigInteger("100"));
			BigInteger section80CCD1_User = section80CCD1_User1.divide(new BigInteger("100"));
			BigInteger grossTotIncome = new BigInteger(
					getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));
			BigInteger grossTotIncome1 = grossTotIncome.multiply(new BigInteger("20"));
			BigInteger grossTotIncome2 = grossTotIncome1.divide(new BigInteger("100"));

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (incomeFromSal.compareTo(new BigInteger("0")) == 0) {
					if (grossTotIncome2.compareTo(new BigInteger("150000")) == 1) {
						if (section80CCD.compareTo(new BigInteger("150000")) == 1) {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									new BigInteger("150000"));
						} else {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									section80CCD);

						}

					} else {

						if (section80CCD.compareTo(grossTotIncome2) == 1) {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									grossTotIncome2);
						} else {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									section80CCD);

						}
						BigInteger section80CCD1 = getElementValueByTargetNameBig(
								"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE");

						if (grossTotIncome.compareTo(section80CCD1) == -1) {

							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									grossTotIncome);

						}

					}
				} else {
					if (temp2.compareTo(new BigInteger("150000")) == 1) {
						if (section80CCD.compareTo(new BigInteger("150000")) == 1) {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									new BigInteger("150000"));
						} else {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									section80CCD);

						}
					} else {
						if (section80CCD.compareTo(temp2) == 1) {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									temp2);

						} else {
							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									section80CCD);

						}
						BigInteger section80CCD1 = getElementValueByTargetNameBig(
								"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE");

						if (grossTotIncome.compareTo(section80CCD1) == -1) {

							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
									grossTotIncome);

						}
					}
				}

			} else {

				setElementValueByTargetName(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
						new BigInteger("0"));

			}
		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
					new BigInteger("0"));
			}
		}
		checkSum80C80CCC();
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}
	public static void checkSum80C80CCC() {

		BigInteger section80C = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C");
		BigInteger section80CCC = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC");
		BigInteger section80CCD = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE");

		BigInteger netSum1 = section80C.add(section80CCC);
		BigInteger netSum2 = netSum1.add(section80CCD);

		BigInteger maxAmount = getMaxLimitAmount();

		if (netSum2.compareTo(maxAmount) == 1) {
			BigInteger residue = netSum2.subtract(maxAmount);

			if (section80CCD.compareTo(residue) == 1 || section80CCD.compareTo(residue) == 0) {
				section80CCD = section80CCD.subtract(residue);
				setElementValueByTargetName(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE", section80CCD);

			} else {
				residue = residue.subtract(section80CCD);
				setElementValueByTargetName(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
						new BigInteger("0"));

				if (section80CCC.compareTo(residue) == 1 || section80CCC.compareTo(residue) == 0) {
					section80CCC = section80CCC.subtract(residue);
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
							section80CCC);

				} else {
					residue = residue.subtract(section80CCC);

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
							new BigInteger("0"));

				}

			}
		}


	}
	
	public static void onChangeSection80CCD1B_User(ValidationAware field) throws java.text.ParseException {
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {

			BigInteger section80CCD1B_User = new BigInteger(field.getData().toString());
			BigInteger grossTotIncome = new BigInteger(
					getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));
			BigInteger section80CCD1B_User1 = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B_Usr");
			BigInteger temp = new BigInteger("0");

			if (section80CCD1B_User1 == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B",
						new BigInteger("0"));

			}

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (grossTotIncome.compareTo(section80CCD1B_User) == 1) {
					temp = section80CCD1B_User;
				} else {
					temp = grossTotIncome;
				}
				if (temp.compareTo(new BigInteger("50000")) == 1) {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B",
							new BigInteger("50000"));
				} else {

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B",
							temp);
				}
			} else {
				
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B",
						new BigInteger("0"));
			}
		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B",
					new BigInteger("0"));
			}
		}
		
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80CCDEmployer_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		
		if (field.getData() != null && status.equalsIgnoreCase("I")) {
			BigInteger b1Amount=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.salary");
			BigInteger b2Amount=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.alwnsNotExempt");
			BigInteger b4Amount=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.profitsInSalary");
			
			BigInteger incomeFromSal = b1Amount.add(b2Amount).add(b4Amount);
			BigInteger temp1 = incomeFromSal.multiply(new BigInteger("10"));
			BigInteger temp2 = temp1.divide(new BigInteger("100"));

			BigInteger grossTotIncome = new BigInteger(
					getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));
			BigInteger section80CCDEmp = new BigInteger(field.getData().toString());

			
			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (section80CCDEmp.compareTo(temp2) == 1) {

					setElementValueByTargetName(
							"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer", temp2);

				} else {

					setElementValueByTargetName(
							"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer", section80CCDEmp);

				}

				BigInteger section80D_User = getElementValueByTargetNameBig(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer");

				if (grossTotIncome.compareTo(section80D_User) == -1) {
					setElementValueByTargetName(
							"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer", grossTotIncome);
				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer",
						new BigInteger("0"));
			}

		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer",
					new BigInteger("0"));
			}
		}
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80CCG_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80CCG_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {
			BigInteger grossTotIncome = new BigInteger(
					getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));
			BigInteger section80CCG_User = new BigInteger(field.getData().toString());
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

				if ((residentialStatus.equals("RES") || residentialStatus.equals("NOR"))) {
					if (grossTotIncome.compareTo(new BigInteger("1200000")) == -1
							|| grossTotIncome.compareTo(new BigInteger("1200000")) == 0) {

						if (section80CCG_User.compareTo(new BigInteger("25000")) == 1) {

							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
									new BigInteger("25000"));

						} else {

							setElementValueByTargetName(
									"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
									section80CCG_User);

						}
					} else {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
								new BigInteger("0"));

					}
				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
							new BigInteger("0"));

				}

				BigInteger section80CCG = getElementValueByTargetNameBig(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG");

				if (section80CCG.compareTo(new BigInteger("0")) == 1 && grossTotIncome.compareTo(section80CCG) == -1) {

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
							grossTotIncome);

				}

			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
						new BigInteger("0"));

			}

		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
					new BigInteger("0"));
			}
		}
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
	onChangeSection80D_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DHealthInsurancePremiumUsr"));
	onChangeSection80D2_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DMedicalExpenditureUsr"));
	onChangeSection80D3_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DPreventiveHealthCheckUpUsr"));
	onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();
	}

	
	public static void onChangeSection80D_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null && !field.getTarget().toString().equals("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium"))
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		String option80Dchk = getElementValueByTargetName(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium");
		
		if((option80Dchk.equals("8") && status.equals("NRI")))
				{
			MessageDialogCtrl.displayInfoDialog("ERROR",
					"Please select a valid option from the dropdown of Sec.80D under Chapter VIA.");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium", "-1");
				}
		
		if (field.getData() != null && status.equalsIgnoreCase("I")) {

			
		
			BigInteger section80D = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80D");
			BigInteger grossTotIncome = new BigInteger(
					getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");

			Date dob = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
			
			if (dob == null) {
				Calendar cal = Calendar.getInstance();
				cal.set(Calendar.HOUR_OF_DAY, 0);
				cal.set(Calendar.MINUTE, 0);
				cal.set(Calendar.SECOND, 0);
				cal.set(Calendar.MILLISECOND, 0);

				dob = cal.getTime();
			}

			// Age Calculator
			int years = 0;
			int months = 0;
			int days = 0;

			// create calendar object for birth day
			Calendar birthDay = Calendar.getInstance();
			birthDay.setTimeInMillis(dob.getTime());

			// create calendar object for current day
			long currentTime = System.currentTimeMillis();
			Calendar now = Calendar.getInstance();
			now.setTimeInMillis(currentTime);

			// Get difference between years
			years = now.get(Calendar.YEAR) - birthDay.get(Calendar.YEAR);
			int currMonth = now.get(Calendar.MONTH) + 1;
			int birthMonth = birthDay.get(Calendar.MONTH) + 1;

			// Get difference between months
			months = currMonth - birthMonth;

			// if month difference is in negative then reduce years by one and
			// calculate the number of months.
			if (months < 0) {
				//years--;
				months = 12 - birthMonth + currMonth;
				if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
					months--;
			} else if (months == 0 && now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
				//years--;
				months = 11;
			}
			// Calculate the days
			if (now.get(Calendar.DATE) > birthDay.get(Calendar.DATE))
				days = now.get(Calendar.DATE) - birthDay.get(Calendar.DATE);
			else if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
				int today = now.get(Calendar.DAY_OF_MONTH);
				now.add(Calendar.MONTH, -1);
				days = now.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay.get(Calendar.DAY_OF_MONTH) + today;
			} else {
				days = 0;
				if (months == 12) {
					years++;
					months = 0;
				}
			}

			String option80D = getElementValueByTargetName(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium");
			
			
			if((option80D.equals("0") || option80D.equals("empty")))
			{
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium", null);
			}
			
			SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
			Date d1 = form1.parse(dob.toString());
			SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");
			String d2 = form.format(d1);
			Date date1 = form.parse(d2);
			
			if((option80D.equals("2") || option80D.equals("7")) && (date1.after(form.parse("02/04/1958")) || date1.equals(form.parse("02/04/1958"))))
			{
				
				MessageDialogCtrl.displayInfoDialog("ERROR",
						"Please select a valid option from the dropdown of Sec.80D under Chapter VIA.");
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium", "-1");
			}
			
			

			
		}
		
		
		if (option80Dchk.equals("empty")) {
			
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium",
					null);

		}
		calculte80DSum();
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80DD_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}
	public static void onChangeSection80D2_User(ValidationAware field) throws java.text.ParseException {
		
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		int years=calculateAge();
		if(field.getData() == null && !field.getTarget().toString().equals("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure"))
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		String option80D2chk = getElementValueByTargetName(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure");
		
		if(((option80D2chk.equals("1") || option80D2chk.equals("3")) && status.equals("NRI")) || ((option80D2chk.equals("1")|| option80D2chk.equals("3")) && years <79 ))
				{
			MessageDialogCtrl.displayInfoDialog("ERROR",
					"Please select a valid option from the dropdown of Part B of Sec.80D under Chapter VIA.");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure", null);
				}
			if(option80D2chk.equals("empty") || option80D2chk.equals("-1") || option80D2chk.equals("0"))
				{
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure", null);
				}
		calculte80DSum();
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80DD_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
				
	}
	public static void onChangeSection80D3_User(ValidationAware field) throws java.text.ParseException {
		
		
		if(field.getData() == null && !field.getTarget().toString().equals("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp"))
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		String option80D2chk = getElementValueByTargetName(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp");
		if(option80D2chk.equals("empty") || option80D2chk.equals("-1") || option80D2chk.equals("0"))
		{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp", null);
		}
		calculte80DSum();
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80DD_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
		
	}
	public static void calculte80DSum() throws java.text.ParseException {
		
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		long amount_80D1=0,amount_80D2=0,amount_80D3=0;
		int years=calculateAge();
		if ( status.equalsIgnoreCase("I")) {

			BigInteger section80D = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DHealthInsurancePremiumUsr");
			BigInteger section80D2 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DMedicalExpenditureUsr");
			BigInteger section80D3 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DPreventiveHealthCheckUpUsr");
			BigInteger grossTotIncome = new BigInteger(getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome"));
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
			String option80D = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium");
			String option80D2 = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure");
			String option80D3 = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp");

			
			
			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				
				if (option80D.equals("1")) {
					if (section80D.compareTo(new BigInteger("25000")) == 1) {
						
						amount_80D1=25000;
					} else {
						amount_80D1=Long.valueOf(section80D.toString());
					}
				} else if (option80D.equals("2")) {
					if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {
						if (section80D.compareTo(new BigInteger("30000")) == 1) {
							amount_80D1=30000;
						} else {
							amount_80D1=Long.valueOf(section80D.toString());
						}
					} else {
						if (section80D.compareTo(new BigInteger("25000")) == 1) {
							amount_80D1=25000;
						} else {
							amount_80D1=Long.valueOf(section80D.toString());
						}
					}

				} else if (option80D.equals("3")) {
					if (section80D.compareTo(new BigInteger("25000")) == 1) {
						amount_80D1=25000;
					} else {
						amount_80D1=Long.valueOf(section80D.toString());
					}
				} else if (option80D.equals("4")) {
					if (section80D.compareTo(new BigInteger("30000")) == 1) {
						amount_80D1=30000;
					} else {
						amount_80D1=Long.valueOf(section80D.toString());
					}
				} else if (option80D.equals("5")) {
					if (section80D.compareTo(new BigInteger("50000")) == 1) {
						amount_80D1=50000;
					} else {
						amount_80D1=Long.valueOf(section80D.toString());
					}
				} else if (option80D.equals("6")) {
					if (section80D.compareTo(new BigInteger("55000")) == 1) {
						amount_80D1=55000;
					} else {
						amount_80D1=Long.valueOf(section80D.toString());
					}
				} else if (option80D.equals("7")) {
					if (years > 59 && (residentialStatus.equals("RES") || residentialStatus.equals("NOR"))) {
						if (section80D.compareTo(new BigInteger("60000")) == 1) {
							amount_80D1=60000;
						} else {
							amount_80D1=Long.valueOf(section80D.toString());
						}
					} else {
						if (section80D.compareTo(new BigInteger("55000")) == 1) {
							amount_80D1=55000;
						} else {
							amount_80D1=Long.valueOf(section80D.toString());
						}
					}
				} else {
						amount_80D1=0;
				}

				//Calculation part of 80D 2nd Drop-Down	
				if (option80D2.equals("1")) {
					if (years > 79 && (residentialStatus.equals("RES") || residentialStatus.equals("NOR"))) {
						
						if (section80D2.compareTo(new BigInteger("30000")) == 1) {
							
							amount_80D2=30000;
						} else {
							amount_80D2=Long.valueOf(section80D2.toString());
						}
						
					}
				}
				else if(option80D2.equals("2"))
				{
					if (section80D2.compareTo(new BigInteger("30000")) == 1) {
							
						amount_80D2=30000;
						} else {
							amount_80D2=Long.valueOf(section80D2.toString());
						}
						
				}
				else if(option80D2.equals("3"))
				{
					if (years > 79 && (residentialStatus.equals("RES") || residentialStatus.equals("NOR"))) {
						
						if (section80D2.compareTo(new BigInteger("60000")) == 1) {
							
							amount_80D2=60000;
						} else {
							amount_80D2=Long.valueOf(section80D2.toString());
						}
					}
				}
				
				//Calculation part of 80D 3rd Drop-Down
				
				if (option80D3.equals("1")) {
					
					if (section80D3.compareTo(new BigInteger("5000")) == 1) {
						
						amount_80D3=5000;
					} else {
						amount_80D3=Long.valueOf(section80D3.toString());
					}
					
				}
				else if(option80D3.equals("2"))
				{
					if (section80D3.compareTo(new BigInteger("5000")) == 1) {
						
						amount_80D3=5000;
					} else {
						amount_80D3=Long.valueOf(section80D3.toString());
					}
				}
				else if(option80D3.equals("3"))
				{
					if (section80D3.compareTo(new BigInteger("5000")) == 1) {
						
						amount_80D3=5000;
					} else {
						amount_80D3=Long.valueOf(section80D3.toString());
					}
				}
				
				if (grossTotIncome.compareTo(BigInteger.valueOf(amount_80D1)) == -1) {
					amount_80D1=Long.valueOf(grossTotIncome.toString());
				}
				if (grossTotIncome.compareTo(BigInteger.valueOf(amount_80D2)) == -1) {
					amount_80D2=Long.valueOf(grossTotIncome.toString());
				}
				if (grossTotIncome.compareTo(BigInteger.valueOf(amount_80D3)) == -1) {
					amount_80D3=Long.valueOf(grossTotIncome.toString());
				}
				
		
			} else {
				amount_80D1=0;
				amount_80D2=0;
				amount_80D3=0;
			}

			
	       
			
			
			
		} 
		else if(status.equalsIgnoreCase("H"))
		{
				BigInteger gross=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
				BigInteger sec80D=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DHealthInsurancePremiumUsr");
				BigInteger sec80D2=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DMedicalExpenditureUsr");

				if(sec80D.compareTo(new BigInteger("25000"))==1)
				{
					amount_80D1=25000;
				}
				else
				{
					amount_80D1=Long.valueOf(sec80D.toString());
				}
				
			
			//Calculation of 80D 2nd Drop-Down HUF case	
				
				if(gross.compareTo(BigInteger.valueOf(amount_80D1))==-1 && gross.compareTo(new BigInteger("0")) != -1)
				{
					amount_80D1=Long.valueOf(gross.toString());
				}
				if(sec80D2.compareTo(new BigInteger("30000"))==1)
				{
					amount_80D2=30000;
				}
				else
				{
					amount_80D2=Long.valueOf(sec80D2.toString());
				}
				if(gross.compareTo(BigInteger.valueOf(amount_80D2))==-1 && gross.compareTo(new BigInteger("0")) != -1)
				{
					amount_80D2=Long.valueOf(gross.toString());
				}
				
				amount_80D3=0;
				
		}
		else if(status.equalsIgnoreCase("F"))
		{
			amount_80D1=0;
			amount_80D2=0;
			amount_80D3=0;
		}
		
		long sum=amount_80D1+amount_80D2+amount_80D3;
		if(sum >60000)
		{
			sum=60000;
		}
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80D", BigInteger.valueOf(sum));
	}
	
	public static void onChangeSection80DD_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
     //   LOG.info("Status ::"+status);		
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		String option80DDchk = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType");

		if (option80DDchk.equals("empty") || option80DDchk.equals("0")) {

			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType", null);
		}
		if (field.getData() != null && (status.equalsIgnoreCase("I") || status.equalsIgnoreCase("H"))) {
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
			BigInteger section80DD_Usr = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD");
			
			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {
					/*if (section80DD_Usr.compareTo(new BigInteger("125000")) == 1) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",
								new BigInteger("125000"));

					} else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",
								section80DD_Usr);

					}*/
					String option80DD = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType");
					if ((option80DD.equals("1")) && (section80DD_Usr.compareTo(new BigInteger("75000")) == 1)) {
						
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("75000"));
					}

					else if ((option80DD.equals("2")) &&  (section80DD_Usr.compareTo(new BigInteger("125000")) == 1)) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("125000"));

					} else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",section80DD_Usr);

					}
					BigInteger section80D = getElementValueByTargetNameBig(
							"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD");

					if (grossTotIncome.compareTo(section80D) == -1) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",
								grossTotIncome);
					}
				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",
							new BigInteger("0"));
				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",
						new BigInteger("0"));
			}
		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",
					temp_data);
			if(status.equals("F"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",
					new BigInteger("0"));
			}
		}
	
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80DDB(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null && !field.getTarget().equals("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType"))
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		

		if (field.getData() != null && (status.equalsIgnoreCase("I") || status.equalsIgnoreCase("H"))) {
			
			String option80DDchk = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType");
			if (option80DDchk.equals("empty") || option80DDchk.equals("0")) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType", null);
			}
			
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
			BigInteger section80DDB_User = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB");

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

				if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {
					
					if ((option80DDchk.equals("1")) && (section80DDB_User.compareTo(new BigInteger("40000")) == 1)) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
								new BigInteger("40000"));

					} 
					else if ((option80DDchk.equals("2")) && (section80DDB_User.compareTo(new BigInteger("60000")) == 1)) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
								new BigInteger("60000"));

					}
					else if ((option80DDchk.equals("3")) && (section80DDB_User.compareTo(new BigInteger("80000")) == 1)) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
								new BigInteger("80000"));

					}
					else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
								section80DDB_User);

					}

					BigInteger section80DDB = getElementValueByTargetNameBig(
							"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB");

					if (grossTotIncome.compareTo(section80DDB) == -1) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
								grossTotIncome);

					}

				} else {

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
							new BigInteger("0"));

				}

			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
						new BigInteger("0"));

			}

		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",
					temp_data);
			if(status.equals("F"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
					new BigInteger("0"));
			}
		}
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80E_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}
	public static void onChangeSection80E_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			BigInteger section80E_User = new BigInteger(field.getData().toString());

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (grossTotIncome.compareTo(section80E_User) == 1) {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E",
							section80E_User);

				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E",
							grossTotIncome);

				}

				BigInteger section80E = getElementValueByTargetNameBig(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E");

				if (grossTotIncome.compareTo(section80E) == -1) {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E",
							grossTotIncome);

				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E",
						new BigInteger("0"));

			}
		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E",
					new BigInteger("0"));
			}
		}
		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.incomeFromSal"));
		
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80EE_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80EE_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {

			BigInteger section80EE_User = new BigInteger(field.getData().toString());
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (section80EE_User.compareTo(new BigInteger("50000")) == 1) {

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",
							new BigInteger("50000"));

				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",
							section80EE_User);

				}

				BigInteger section80EE = getElementValueByTargetNameBig(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE");

				if (section80EE.compareTo(grossTotIncome) == 1) {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",
							grossTotIncome);

				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",
							section80EE);

				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",
						new BigInteger("0"));

			}
		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",
					new BigInteger("0"));
			}
		}

		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80G_User(ValidationAware field) throws java.text.ParseException {

        if(field.getData() == null)
        {
        	setElementValueByTargetName(field.getTarget(), new BigInteger("0"));
        }
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
		BigInteger sec80Geligdonations = new BigInteger("0");
        
		if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
			// sec80G.value = parseInt(sec80Geligdonations,10);

			sec80Geligdonations = getElementValueByTargetNameBig("itr.itr4.schedule80G.totalEligibleDonationsUs80G");

			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G",
					sec80Geligdonations);

		} 

		if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G",
					sec80Geligdonations);

			BigInteger section80G = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G");

			if (grossTotIncome.compareTo(section80G) == -1) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G",
						grossTotIncome);

			}
		} else {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G",
					new BigInteger("0"));
		}
        
        
		
		GrossIncome();
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();

		sumDeductions();
		
	
	}

	public static void check80GGAgain1(ValidationAware field) throws java.text.ParseException {

		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		
		GrossIncome();
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();

		sumDeductions();
		changeoftable1();
		changeoftable2();
		changeoftable3();
        changeoftable4();
	}
	public static void check80GGAgain(ValidationAware field) throws java.text.ParseException {

		if(getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG").equals("empty"))
        {
			
        	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG", new BigInteger("0"));
        }
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");
        
		if(status.equals("I"))
		{
		if (totInc.compareTo(new BigInteger("0")) == 1) {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome",
					BigInteger.valueOf(totInc.longValue()));

		}

		BigInteger oneFrth1 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome")
				.multiply(new BigInteger("25"));

		BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		BigInteger oneFrth2 = oneFrth1.divide(new BigInteger("100"));
		BigInteger sec80GG = new BigInteger(field.getData().toString());

		if (oneFrth2.compareTo(new BigInteger("60000")) == -1) {

			if (sec80GG.compareTo(oneFrth2) == 1) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG", oneFrth2);
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG", sec80GG);

			}
		} else {
			if (sec80GG.compareTo(new BigInteger("60000")) == 1) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
						new BigInteger("60000"));

			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG", sec80GG);

			}
		}

		if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

			BigInteger sec80GGsys = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG");
			if (sec80GGsys.compareTo(new BigInteger("0")) == -1) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
						new BigInteger("0"));

			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
						sec80GGsys);

			}

			if (grossTotIncome.compareTo(sec80GGsys) == -1) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
						grossTotIncome);

			}

		} else {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
					new BigInteger("0"));

		}

		if (grossTotIncome.compareTo(new BigInteger("0")) == -1) {

			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
					new BigInteger("0"));

		}
		}
		else
        {
        	BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
					new BigInteger("0"));
			}
        }
		
		
	}
	

	public static void onChangeSection80GGC_User(ValidationAware field) throws java.text.ParseException {
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null) {
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			BigInteger section80GGC_User = new BigInteger(field.getData().toString());

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

				if (section80GGC_User.compareTo(grossTotIncome) == 1
						|| section80GGC_User.compareTo(grossTotIncome) == 0) {

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC",
							grossTotIncome);

				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC",
							section80GGC_User);

				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC",
						new BigInteger("0"));

			}

		}
		
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80RRB_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}
	

	public static void onChangeSection80RRB_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			BigInteger section80RRB_User = new BigInteger(field.getData().toString());
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

				if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {

					if (section80RRB_User.compareTo(new BigInteger("300000")) == -1) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",
								section80RRB_User);
					} else {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",
								new BigInteger("300000"));

					}

				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",
							new BigInteger("0"));

				}

				BigInteger section80RRB = getElementValueByTargetNameBig(
						"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB");

				if ((section80RRB.compareTo(new BigInteger("0")) == 1
						&& grossTotIncome.compareTo(section80RRB) == -1)) {

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",
							grossTotIncome);

				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",
						new BigInteger("0"));
			}

		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",
					new BigInteger("0"));
			}
		}

		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80QQB_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80QQB_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {

			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			BigInteger section80QQB = new BigInteger(field.getData().toString());
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

				if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {
					if (section80QQB.compareTo(new BigInteger("300000")) == -1) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",
								section80QQB);

					} else {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",
								new BigInteger("300000"));

					}
					BigInteger section80QQBsys = getElementValueByTargetNameBig(
							"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB");

					if ((section80QQBsys.compareTo(new BigInteger("0")) == 1
							&& grossTotIncome.compareTo(section80QQBsys) == -1)) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",
								grossTotIncome);
					}
				}

				else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",
							new BigInteger("0"));
				}

			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",
						new BigInteger("0"));

			}

		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB",
					temp_data);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",
					new BigInteger("0"));
			}
		}
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80TTA_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80TTA_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null)
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && (status.equalsIgnoreCase("I") || status.equals("H"))) {
			BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeOthSrc");
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			BigInteger section80TTA_User = new BigInteger(field.getData().toString());

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (section80TTA_User.compareTo(new BigInteger("0")) == 1) {

					Math.min(incomeFromSal.longValue(), grossTotIncome.longValue());
					BigInteger b1 = BigInteger.valueOf(Math.min(incomeFromSal.longValue(), grossTotIncome.longValue()));

					BigInteger b2 = BigInteger.valueOf(Math.min(b1.longValue(), section80TTA_User.longValue()));
					BigInteger b3 = BigInteger.valueOf(Math.min(b2.longValue(), new BigInteger("10000").longValue()));

					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA", b3);

				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA",
							new BigInteger("0"));
				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA",
						new BigInteger("0"));
			}
		}
		else
		{
			BigInteger temp_data=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA",
					temp_data);
			if(status.equals("F") )
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA",
					new BigInteger("0"));
			}
		}
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		onChangeSection80U_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U"));
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
	}

	public static void onChangeSection80U_User(ValidationAware field) throws java.text.ParseException {

		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		if(field.getData() == null && !field.getTarget().equals("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType"))
		{
			field.setData(new BigInteger("0"));
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}
		if (field.getData() != null && status.equalsIgnoreCase("I")) {
			
			String option80Uchk = getElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType");
			if (option80Uchk.equals("empty") || option80Uchk.equals("0")) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType", null);
			}
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
			BigInteger section80U_User=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U");

			if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {
				if (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) {
					
					if ((option80Uchk.equals("1")) && (section80U_User.compareTo(new BigInteger("75000")) == 1)) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
								new BigInteger("75000"));

					}
					else if ((option80Uchk.equals("2")) && (section80U_User.compareTo(new BigInteger("125000")) == 1)) {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
								new BigInteger("125000"));
					} 
					
					else {
						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
								section80U_User);

					}

					BigInteger section80U = getElementValueByTargetNameBig(
							"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U");
					if (grossTotIncome.compareTo(section80U) == -1) {

						setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
								grossTotIncome);

					}
				} else {
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
							new BigInteger("0"));
				}
			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
						new BigInteger("0"));
			}

		}
		else
		{
			BigInteger section80U_80=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U");
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U",
					section80U_80);
			if(status.equals("F") || status.equals("H"))
			{
			  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
					new BigInteger("0"));
			}
		}
		
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		GrossIncome();
		checkSum80C80CCC();
		onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();         
	}
	public static void sumUserEntrdDed() {

		BigInteger sum = new BigInteger("0");

		BigInteger section80C = new BigInteger("0"), section80CCC = new BigInteger("0"),
				section80CCCDEmp = new BigInteger("0"), section80CCD1B = new BigInteger("0"),
				section80CCDEmp1 = new BigInteger("0"), section80CCG = new BigInteger("0"),
				section80D1 = new BigInteger("0"),section80D2 = new BigInteger("0"),section80D3 = new BigInteger("0"), section80DD = new BigInteger("0"), section80DDB = new BigInteger("0"),
				section80E = new BigInteger("0"), section80EE = new BigInteger("0"), section80G = new BigInteger("0"),
				section80GG = new BigInteger("0"), section80GGA = new BigInteger("0"),
				section80GGC = new BigInteger("0"), section80RRB = new BigInteger("0"),
				section80QQB = new BigInteger("0"), section80TTA = new BigInteger("0"),
				section80U = new BigInteger("0");
		section80C = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C");
		section80CCC = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC");
		section80CCCDEmp = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE");
		section80CCD1B = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B");
		section80CCDEmp1 = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer");
		section80CCG = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG");
		section80D1 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DHealthInsurancePremiumUsr");
		section80D2 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DMedicalExpenditureUsr");
		section80D3 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DPreventiveHealthCheckUpUsr");
		section80DD = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD");
		section80DDB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB");
		section80E = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E");
		section80EE = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE");
		section80G = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G");
		section80GG = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG");
		
		section80GGC = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC");
		section80RRB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB");
		section80QQB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB");
		section80TTA = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA");
		section80U = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U");

		if (section80C != null) {
			sum = sum.add(section80C);
		}
		if (section80CCC != null) {
			sum = sum.add(section80CCC);

		}
		if (section80CCCDEmp != null) {
			sum = sum.add(section80CCCDEmp);

		}
		if (section80CCD1B != null) {
			sum = sum.add(section80CCD1B);

		}
		if (section80CCDEmp1 != null) {
			sum = sum.add(section80CCDEmp1);

		}
		if (section80CCG != null) {
			sum = sum.add(section80CCG);

		}
		if (section80D1 != null) {
			sum = sum.add(section80D1);

		}
		if (section80D2 != null) {
			sum = sum.add(section80D2);

		}
		if (section80D3 != null) {
			sum = sum.add(section80D3);

		}
		if (section80DD != null) {
			sum = sum.add(section80DD);

		}
		if (section80DDB != null) {
			sum = sum.add(section80DDB);

		}
		if (section80EE != null) {
			sum = sum.add(section80EE);

		}
		if (section80E != null) {
			sum = sum.add(section80E);

		}
		if (section80G != null) {
			sum = sum.add(section80G);

		}
		if (section80GG != null) {
			sum = sum.add(section80GG);

		}
		if (section80GGA != null) {
			sum = sum.add(section80GGA);

		}
		if (section80GGC != null) {
			sum = sum.add(section80GGC);

		}
		if (section80RRB != null) {
			sum = sum.add(section80RRB);

		}
		if (section80QQB != null) {
			sum = sum.add(section80QQB);

		}
		if (section80TTA != null) {
			sum = sum.add(section80TTA);

		}
		if (section80U != null) {
			sum = sum.add(section80U);

		}

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.totalChapVIADeductions",
				sum);

	}
	
	public static void sumDeductions() throws java.text.ParseException {

		BigInteger sum = new BigInteger("0");
		BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		BigInteger section80C = new BigInteger("0"), section80GG = new BigInteger("0"),
				section80CCC = new BigInteger("0"), section80CCCDEmp = new BigInteger("0"),
				section80CCD1B = new BigInteger("0"), section80CCDEmp1 = new BigInteger("0"),
				section80CCG = new BigInteger("0"), section80D = new BigInteger("0"), section80DD = new BigInteger("0"),
				section80DDB = new BigInteger("0"), section80E = new BigInteger("0"), section80EE = new BigInteger("0"),
				section80G = new BigInteger("0"), section80GGA = new BigInteger("0"),
				section80GGC = new BigInteger("0"), section80RRB = new BigInteger("0"),
				section80QQB = new BigInteger("0"), section80TTA = new BigInteger("0"),
				section80U = new BigInteger("0");

		section80C = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C");
		section80CCC = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC");
		section80CCCDEmp = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE");
		section80CCD1B = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B");
		section80CCDEmp1 = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer");
		section80CCG = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG");
		section80D = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80D");
		section80DD = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD");
		section80DDB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB");
		section80E = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E");
		section80EE = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE");
		section80G = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G");
		section80GG = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG");
		
		section80GGC = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC");
		section80RRB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB");
		section80QQB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB");
		section80TTA = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA");
		section80U = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U");

		if (section80C != null) {
			sum = sum.add(section80C);
		}
		if (section80CCC != null) {
			sum = sum.add(section80CCC);

		}
		if (section80CCCDEmp != null) {
			sum = sum.add(section80CCCDEmp);

		}
		if (section80CCD1B != null) {
			sum = sum.add(section80CCD1B);

		}
		if (section80CCDEmp1 != null) {
			sum = sum.add(section80CCDEmp1);

		}
		if (section80CCG != null) {
			sum = sum.add(section80CCG);

		}
		if (section80D != null) {
			sum = sum.add(section80D);

		}
		if (section80DD != null) {
			sum = sum.add(section80DD);

		}
		if (section80DDB != null) {
			sum = sum.add(section80DDB);

		}
		if (section80E != null) {
			sum = sum.add(section80E);

		}
		if (section80EE != null) {
			sum = sum.add(section80EE);

		}
		if (section80G != null) {
			sum = sum.add(section80G);

		}
		if (section80GG != null) {
			sum = sum.add(section80GG);

		}
		
		if (section80GGC != null) {
			sum = sum.add(section80GGC);

		}
		if (section80RRB != null) {
			sum = sum.add(section80RRB);

		}
		if (section80QQB != null) {
			sum = sum.add(section80QQB);

		}
		if (section80TTA != null) {
			sum = sum.add(section80TTA);

		}
		if (section80U != null) {
			sum = sum.add(section80U);

		}

		if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

			if (sum.compareTo(grossTotIncome) == 1) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",
						grossTotIncome);

			} else {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",
						sum);

			}
		} else {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",
					sum);

		}

		BigInteger totInc = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions");

		BigInteger nettotInc = grossTotIncome.subtract(totInc);
		if (nettotInc.longValue() > 100) {
			long nettotInc1 = (long) (Math.floor(nettotInc.longValue() / 100) * 100);
			nettotInc = BigInteger.valueOf(nettotInc1);
		}

		if (nettotInc.compareTo(new BigInteger("0")) == 1 || nettotInc.compareTo(new BigInteger("0")) == 0) {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome",
					BigInteger.valueOf((nettotInc.longValue())));

		} else {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome", new BigInteger("0"));

		}
		calcTI();
	}
	
	
	public static void calcTI() throws java.text.ParseException {

		
		BigInteger dedVIA = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions");
		BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");
		BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		if (grossTotIncome.compareTo(dedVIA) == 1) {
			totInc = BigInteger.valueOf(grossTotIncome.subtract(dedVIA).longValue());
			
			if (totInc.longValue() > 100) {
				long totInc1 = roundToNearestTenthDigit(totInc.longValue());
				totInc = BigInteger.valueOf(totInc1);
			}
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome",
					BigInteger.valueOf(roundToNearestTenthDigit(totInc.longValue())));
			
		}
		calcTaxPayableOnTI();
		calcRebate();

	}
	
	public static void calcRebate() throws java.text.ParseException {
		BigInteger taxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.totalTaxPayable");
		BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");
        String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
        BigInteger surCharge=getElementValueByTargetNameBig("itr.itr4.taxComputation.surchargeOnAboveCrore");
		BigInteger rebate87A = getElementValueByTargetNameBig("itr.itr4.itr1TaxComputation.rebate87A");
		String resStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
		taxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.totalTaxPayable");
		BigInteger taxPayableOnRebate = getElementValueByTargetNameBig("itr.itr4.taxComputation.taxPayableOnRebate");

		
		if (status.equalsIgnoreCase("I") && (resStatus.equals("RES") || resStatus.equals("NOR")) && (totInc.longValue()<=350000)){
				
			if (taxPayable.compareTo(new BigInteger("2500")) == -1) {
				setElementValueByTargetName("itr.itr4.taxComputation.rebate87A", taxPayable);

			} else {
				setElementValueByTargetName("itr.itr4.taxComputation.rebate87A", new BigInteger("2500"));
                }
		} else {
              
			setElementValueByTargetName("itr.itr4.taxComputation.rebate87A", new BigInteger("0"));

		}

		rebate87A = getElementValueByTargetNameBig("itr.itr4.taxComputation.rebate87A");
		taxPayableOnRebate = taxPayable.subtract(rebate87A);
		setElementValueByTargetName("itr.itr4.taxComputation.taxPayableOnRebate", taxPayableOnRebate);
		calsurchargeOnAboveCrore();

	}
	public static void calcTaxPayableOnTI() throws java.text.ParseException {

		
		BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");

		BigInteger taxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.totalTaxPayable");

		String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
		
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		
		//Date dob = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();

		Date dob = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
		if (dob == null) {
			Calendar cal = Calendar.getInstance();
			cal.set(Calendar.HOUR_OF_DAY, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			cal.set(Calendar.MILLISECOND, 0);

			dob = cal.getTime();
		}


		int years = 0;
		int months = 0;
		int days = 0;

		// create calendar object for birth day
		Calendar birthDay = Calendar.getInstance();

		birthDay.setTimeInMillis(dob.getTime());

		// create calendar object for current day
		long currentTime = System.currentTimeMillis();
		Calendar now = Calendar.getInstance();
		now.setTimeInMillis(currentTime);

		// Get difference between years
		years = now.get(Calendar.YEAR) - birthDay.get(Calendar.YEAR);
		int currMonth = now.get(Calendar.MONTH) + 1;
		int birthMonth = birthDay.get(Calendar.MONTH) + 1;

		// Get difference between months
		months = currMonth - birthMonth;

		// if month difference is in negative then reduce years by one and
		// calculate the number of months.
		if (months < 0) {
			//years--;
			months = 12 - birthMonth + currMonth;
			if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
				months--;
		} else if (months == 0 && now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			//years--;
			months = 11;
		}
		// Calculate the days
		if (now.get(Calendar.DATE) > birthDay.get(Calendar.DATE))
			days = now.get(Calendar.DATE) - birthDay.get(Calendar.DATE);
		else if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			int today = now.get(Calendar.DAY_OF_MONTH);
			now.add(Calendar.MONTH, -1);
			days = now.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay.get(Calendar.DAY_OF_MONTH) + today;
		} else {
			days = 0;
			if (months == 12) {
				years++;
				months = 0;
			}
		}

		String assessment = "2018";

		SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		Date d1 = form1.parse(dob.toString());
		SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");

		String d2 = form.format(d1);

		Date date1 = form.parse(d2);

		Calendar cal = Calendar.getInstance();
		cal.setTime(date1);
		int k = cal.get(Calendar.MONTH);
		int k1 = cal.get(Calendar.DAY_OF_MONTH);
		if (k + 1 > 4) {
			years = years - 1;

		}

		else if ((k + 1 == 4) && (k1 > 1)) {
			years = years - 1;
		}

		// Create new Age object
		// return new Age(days, months, years);

		
		if (((residentialStatus.equals("RES") || residentialStatus.equals("NOR")) && (years >59 && years <= 79))) {
        if(status.equals("H") || status.equals("h")){
				if (totInc.compareTo(new BigInteger("250000")) == -1 || totInc.compareTo(new BigInteger("250000")) == 0){
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", new BigInteger("0"));
				} else {
					if((totInc.compareTo(new BigInteger("250001"))==1 || totInc.compareTo(new BigInteger("250001"))==0) && ((totInc.compareTo(new BigInteger("500000"))==-1||totInc.compareTo(new BigInteger("500000"))==0))){
						BigInteger temp = ((totInc.subtract(new BigInteger("250000"))).multiply(new BigInteger("5")))
								.divide(new BigInteger("100"));
						setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", temp);
                      } else if ((totInc.compareTo(new BigInteger("500001")) == 1
      						|| totInc.compareTo(new BigInteger("500001")) == 0)
      						&& (totInc.compareTo(new BigInteger("1000000")) == -1
      								|| totInc.compareTo(new BigInteger("1000000")) == 0)) {
                    	  
                    	 
                    	  long totInc1 = totInc.longValue();
      					long temp = (long) (((totInc1 - 500000) * 0.20) + 10000);
      					BigInteger netTemp = BigInteger.valueOf(temp);
    					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);

						
						
					}  else if ((totInc.compareTo(new BigInteger("1000001")) == 1
							|| totInc.compareTo(new BigInteger("1000001")) == 0)){
						
						long totInc1 = totInc.longValue();
						long temp = (long) (((totInc1 - 1000000) * 0.30) + 110000);
						BigInteger netTemp = BigInteger.valueOf(temp);
						setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
						
						
					}
				}
				}
			else if(status.equalsIgnoreCase("F") && (residentialStatus.equals("RES") || residentialStatus.equals("NRI"))){
				
				
				long temp = (long) (totInc.longValue() * 0.30);
				BigInteger netTemp = BigInteger.valueOf(temp);
				
				setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
			}
			else
			{
			if (totInc.compareTo(new BigInteger("300000")) == -1 || totInc.compareTo(new BigInteger("300000")) == 0) {

				setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", new BigInteger("0"));
			} else {
				if ((totInc.compareTo(new BigInteger("300001")) == 1 || totInc.compareTo(new BigInteger("300001")) == 0)
						&& (totInc.compareTo(new BigInteger("500000")) == -1
								|| totInc.compareTo(new BigInteger("500000")) == 0)) {

					BigInteger temp = ((totInc.subtract(new BigInteger("300000"))).multiply(new BigInteger("5")))
							.divide(new BigInteger("100"));
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", temp);

				} else if ((totInc.compareTo(new BigInteger("500001")) == 1
						|| totInc.compareTo(new BigInteger("500001")) == 0)
						&& (totInc.compareTo(new BigInteger("1000000")) == -1
								|| totInc.compareTo(new BigInteger("1000000")) == 0)) {

					long totInc1 = totInc.longValue();
					long temp = (long) (((totInc1 - 500000) * 0.20) + 10000);
					BigInteger netTemp = BigInteger.valueOf(temp);
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);

				} else if ((totInc.compareTo(new BigInteger("1000001")) == 1
						|| totInc.compareTo(new BigInteger("1000001")) == 0)) {

					long totInc1 = totInc.longValue();
					long temp = (long) (((totInc1 - 1000000) * 0.30) + 110000);
					BigInteger netTemp = BigInteger.valueOf(temp);
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);

				}
			}
			}
		}
		
		else if (((residentialStatus.equals("RES") || residentialStatus.equals("NOR")) && (years > 79))) {
			
			
			
			
			if(status.equalsIgnoreCase("H")){
				if ( totInc.compareTo(new BigInteger("250000")) == -1 || totInc.compareTo(new BigInteger("250000")) == 0){
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", new BigInteger("0"));
				} 
				else {
					if((totInc.compareTo(new BigInteger("250001"))==1 || totInc.compareTo(new BigInteger("250001"))==0) && ((totInc.compareTo(new BigInteger("500000"))==-1||totInc.compareTo(new BigInteger("500000"))==0))){
						
						long totInc1 = totInc.longValue();
						long temp = (long) ((totInc1 - 250000) * 0.05);
						BigInteger netTemp = BigInteger.valueOf(temp);
						setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
					
					}if ((totInc.compareTo(new BigInteger("500001")) == 1 || totInc.compareTo(new BigInteger("500001")) == 0)
							&& (totInc.compareTo(new BigInteger("1000000")) == -1
							|| totInc.compareTo(new BigInteger("1000000")) == 0))  {
						
						
						
						
						long totInc1 = totInc.longValue();
						long temp = (long) (((totInc1 - 500000) * 0.20) + 12500);
						BigInteger netTemp = BigInteger.valueOf(temp);
						setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
						
					} else if ((totInc.compareTo(new BigInteger("1000001")) == 1
							|| totInc.compareTo(new BigInteger("1000001")) == 0)){
						
						long totInc1 = totInc.longValue();
						long temp = (long) (((totInc1 - 1000000) * 0.30) + 112500);
						BigInteger netTemp = BigInteger.valueOf(temp);
						
						setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);

					}
				}
				}else if(status.equalsIgnoreCase("F") && (residentialStatus.equals("RES") || residentialStatus.equals("NRI") )){
					
					long totInc1 = totInc.longValue();
					long temp = (long) (((totInc1 ) * 0.30) );
					BigInteger netTemp = BigInteger.valueOf(temp);
					
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
					
					
					
				} 
				else { 
					if (totInc.compareTo(new BigInteger("500000")) == -1 || totInc.compareTo(new BigInteger("500000")) == 0) {

						setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", new BigInteger("0"));
					} else {
						if ((totInc.compareTo(new BigInteger("500001")) == 1 || totInc.compareTo(new BigInteger("500001")) == 0)
								&& (totInc.compareTo(new BigInteger("1000000")) == -1
										|| totInc.compareTo(new BigInteger("1000000")) == 0)) {

							long totInc1 = totInc.longValue();
							long temp = (long) ((totInc1 - 500000) * 0.20);
							BigInteger netTemp = BigInteger.valueOf(temp);
							setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
						} else if ((totInc.compareTo(new BigInteger("1000001")) == 1
								|| totInc.compareTo(new BigInteger("1000001")) == 0)) {

							long totInc1 = totInc.longValue();
							long temp = (long) (((totInc1 - 1000000) * 0.30) + 100000);
							BigInteger netTemp = BigInteger.valueOf(temp);
							setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
						}
					}
				}
			
		}
		else if(status.equalsIgnoreCase("F") && (residentialStatus.equals("RES") || residentialStatus.equals("NRI"))){
			
			long totInc1 = totInc.longValue();
			long temp = (long) (((totInc1 ) * 0.30) );
			BigInteger netTemp = BigInteger.valueOf(temp);
			
			setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
		} 
		else {
			
			if ((totInc.compareTo(new BigInteger("250000")) == -1 || totInc.compareTo(new BigInteger("250000")) == 0)) {
				setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", new BigInteger("0"));
			} else {
				if ((totInc.compareTo(new BigInteger("250001")) == 1 || totInc.compareTo(new BigInteger("250001")) == 0)
						&& (totInc.compareTo(new BigInteger("500000")) == -1
								|| totInc.compareTo(new BigInteger("500000")) == 0)) {

					long totInc1 = totInc.longValue();
					long temp = (long) ((totInc1 - 250000) * 0.05);
					BigInteger netTemp = BigInteger.valueOf(temp);
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);

				} else if ((totInc.compareTo(new BigInteger("500001")) == 1
						|| totInc.compareTo(new BigInteger("500001")) == 0)
						&& (totInc.compareTo(new BigInteger("1000000")) == -1
								|| totInc.compareTo(new BigInteger("1000000")) == 0)) {

					long totInc1 = totInc.longValue();
					long temp = (long) (((totInc1 - 500000) * 0.20) + 12500);
					BigInteger netTemp = BigInteger.valueOf(temp);
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);

				} else if ((totInc.compareTo(new BigInteger("1000001")) == 1
						|| totInc.compareTo(new BigInteger("1000001")) == 0)) {

					long totInc1 = totInc.longValue();
					long temp = (long) (((totInc1 - 1000000) * 0.30) + 112500);
					BigInteger netTemp = BigInteger.valueOf(temp);
					setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", netTemp);
				}
			}
		}

		calcRebate();
        calcEduCess();

	}
	
	public static void calcEduCess() throws java.text.ParseException {
		
		
		BigInteger taxPayableOnRebate = getElementValueByTargetNameBig("itr.itr4.taxComputation.taxPayableOnRebate");
		BigInteger surchargeOnAboveCrore = getElementValueByTargetNameBig("itr.itr4.taxComputation.surchargeOnAboveCrore");
        long eduCess1 = (long) ((taxPayableOnRebate.longValue()+surchargeOnAboveCrore.longValue()) * 0.03);
        
		BigInteger neteduCess = BigInteger.valueOf(eduCess1);
		setElementValueByTargetName("itr.itr4.taxComputation.educationCess", neteduCess);

		
		
		
		calcBalTaxPay();

		
	}
	
	public static void calsurchargeOnAboveCrore() throws java.text.ParseException{
		
		BigInteger taxPayable=getElementValueByTargetNameBig("itr.itr4.taxComputation.totalTaxPayable");
		BigInteger surchargeOnAboveCrore=getElementValueByTargetNameBig("itr.itr4.taxComputation.surchargeOnAboveCrore");
		BigInteger totInc=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");
		String residentialStatus=getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
		String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
		
		//Date dob = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
		Date dob = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
		if (dob == null) {
			Calendar cal = Calendar.getInstance();
			cal.set(Calendar.HOUR_OF_DAY, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			cal.set(Calendar.MILLISECOND, 0);

			dob = cal.getTime();
		}


		int years = 0;
		int months = 0;
		int days = 0;

		// create calendar object for birth day
		Calendar birthDay = Calendar.getInstance();

		birthDay.setTimeInMillis(dob.getTime());

		// create calendar object for current day
		long currentTime = System.currentTimeMillis();
		Calendar now = Calendar.getInstance();
		now.setTimeInMillis(currentTime);

		// Get difference between years
		years = now.get(Calendar.YEAR) - birthDay.get(Calendar.YEAR);
		int currMonth = now.get(Calendar.MONTH) + 1;
		int birthMonth = birthDay.get(Calendar.MONTH) + 1;

		// Get difference between months
		months = currMonth - birthMonth;

		// if month difference is in negative then reduce years by one and
		// calculate the number of months.
		if (months < 0) {
			//years--;
			months = 12 - birthMonth + currMonth;
			if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
				months--;
		} else if (months == 0 && now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			//years--;
			months = 11;
		}
		// Calculate the days
		if (now.get(Calendar.DATE) > birthDay.get(Calendar.DATE))
			days = now.get(Calendar.DATE) - birthDay.get(Calendar.DATE);
		else if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			int today = now.get(Calendar.DAY_OF_MONTH);
			now.add(Calendar.MONTH, -1);
			days = now.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay.get(Calendar.DAY_OF_MONTH) + today;
		} else {
			days = 0;
			if (months == 12) {
				years++;
				months = 0;
			}
		}

		String assessment = "2018";

		SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		Date d1 = form1.parse(dob.toString());
		SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");

		String d2 = form.format(d1);

		Date date1 = form.parse(d2);

		Calendar cal = Calendar.getInstance();
		cal.setTime(date1);
		int k = cal.get(Calendar.MONTH);
		int k1 = cal.get(Calendar.DAY_OF_MONTH);
		if (k + 1 > 4) {
			years = years - 1;

		}

		else if ((k + 1 == 4) && (k1 > 1)) {
			years = years - 1;
		}

		
		BigInteger taxOnTotInc=getElementValueByTargetNameBig("itr.itr4.taxComputation.totalTaxPayable");
		BigInteger taxOnCutOffInc;
		BigInteger taxOnCutOffInc2 = new BigInteger("0");
					
			if(status.equals("I") && (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) && (years> 59 && years <= 79)){
						
						if( (totInc.compareTo(new BigInteger("5000000")) == 1 && totInc.compareTo(new BigInteger("10000000"))==-1)|| (totInc.compareTo(new BigInteger("5000000"))==0) ){
							
							taxOnCutOffInc = BigInteger.valueOf((long) ((5000000 - 1000000)  * 0.3 + 110000));	
						}else
							{
							taxOnCutOffInc = BigInteger.valueOf((long) ((10000000 - 1000000)  * 0.3 + 110000));
							taxOnCutOffInc2 = BigInteger.valueOf((long) ((totInc.longValue() - 1000000)  * 0.3 + 110000));
							}
					}
					
					else if((status.equals("I") && (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) && years>79)){
						
						if( totInc.compareTo(new BigInteger("5000000"))==1  && (totInc.compareTo(new BigInteger("10000000"))==-1 || totInc.compareTo(new BigInteger("10000000"))==0)){
							taxOnCutOffInc = BigInteger.valueOf((long) ((5000000 - 1000000)  * 0.3 + 100000));
						}else
							{
							taxOnCutOffInc = BigInteger.valueOf((long) ((10000000 - 1000000)  * 0.3 + 100000));
							taxOnCutOffInc2 = BigInteger.valueOf((long) (((totInc.longValue() - 1000000)  * 0.3 + 100000)));
							}
					}
					else if(status.equals("F")) {
						taxOnCutOffInc = BigInteger.valueOf((long) ((10000000)* 0.3));
					}
					
					else {
						
						if( totInc.compareTo(new BigInteger("5000000"))==1  && (totInc.compareTo(new BigInteger("10000000"))==-1 || totInc.compareTo(new BigInteger("10000000"))==0) ){
							
							taxOnCutOffInc = BigInteger.valueOf((long) ((5000000 - 1000000)  * 0.3 + 112500));
							
						}else
							{
							
							taxOnCutOffInc = BigInteger.valueOf((long) ((10000000 - 1000000)  * 0.3 + 112500)); 
							taxOnCutOffInc2 = BigInteger.valueOf((long) ((totInc.longValue() - 1000000)  * 0.3 + 112500));
							}
						
					}
		
		
		/*if(status.equals("I") && (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) && (years> 59 && years <= 79)){
			taxOnCutOffInc = BigInteger.valueOf((long) ((10000000 - 1000000)  * 0.3 + 120000));	
		}
		else if((status.equals("I") && (residentialStatus.equals("RES") || residentialStatus.equals("NOR")) && years>79))
		{
			taxOnCutOffInc = BigInteger.valueOf((long) ((10000000 - 1000000)  * 0.3 + 100000));
		}else if(status.equals("F")) {
			taxOnCutOffInc = BigInteger.valueOf((long) ((10000000)* 0.3));
		}
		else
		{
			taxOnCutOffInc = BigInteger.valueOf((long) ((10000000 - 1000000)  * 0.3 + 125000));
		}*/
		
		
				/*	long tempSurcharge = 0;
					if( totInc.longValue() > 10000000 ){
						 if(status.equals("F")){
						tempSurcharge = (long) (taxOnTotInc.longValue()  * 0.12) ; 
						 }
						 else if(status.equals("I") || status.equals("H")){
							 
							 tempSurcharge = (long) (taxOnTotInc.longValue()  * 0.15) ;  
						 }
						 
						//check if eligible for marginal relief
						long extraInc = totInc.longValue() - 10000000;
						
						if( (taxOnCutOffInc2.longValue() + tempSurcharge) > (taxOnCutOffInc.longValue() + extraInc + (taxOnCutOffInc.longValue() * 0.10)) ){
							long marginalRelief = (long) (taxOnCutOffInc2.longValue() + tempSurcharge - (taxOnCutOffInc.longValue() + extraInc + (taxOnCutOffInc.longValue() * 0.10)));
							surchargeOnAboveCrore = BigInteger.valueOf(tempSurcharge - marginalRelief);
							setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
							
							//surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
							} else {
						
							setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", tempSurcharge);
							//surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
							}
						}
					   else if(totInc.longValue() > 5000000 && totInc.longValue() <= 10000000 ){
							
									 if(status.equals("I") || status.equals("H")){
										 
										  tempSurcharge = (long) (taxOnTotInc.longValue()  * 0.10) ;  // for ind n huf for 17-18
									 }
									
									//check if eligible for marginal relief
									long extraInc = totInc.longValue() - 5000000;
									
									if( (taxOnTotInc.longValue() + tempSurcharge) > (taxOnCutOffInc.longValue() + extraInc)){
										
										long marginalRelief = (taxOnTotInc.longValue()+ tempSurcharge) - (taxOnCutOffInc.longValue() + extraInc );
										surchargeOnAboveCrore= BigInteger.valueOf(tempSurcharge - marginalRelief);
										setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
									//	surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
										} else {
										surchargeOnAboveCrore = BigInteger.valueOf(tempSurcharge);
										setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
										//surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
										}
									}
					
					else {
						setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", new BigInteger("0"));

							//surchargeOnAboveCrore.value = parseInt('0' ,10);
					}*/
		
		
		long tempSurcharge = 0;
		if( totInc.longValue() > 10000000 ){
			 if(status.equals("F")){
			tempSurcharge = (long) (taxOnTotInc.longValue()  * 0.12) ; 
			
			 }
			 else if(status.equals("I") || status.equals("H")){
				 
				 tempSurcharge = (long) (taxOnTotInc.longValue()  * 0.15) ;  
			 }
			 
			//check if eligible for marginal relief
			long extraInc = totInc.longValue() - 10000000;
			if(status.equals("F"))
			{
				if(totInc.longValue() > 10000000)
				{
					 
					  long incm=(long) (10000000*0.30);
					  long imcmplusextraincm=incm+extraInc;
					  
					  long partB=(long) (totInc.longValue()*0.30);
					  long partBii=(long) (partB*0.12);
					  long sum=partB+partBii;
					  long diff=sum-imcmplusextraincm;
					  if( diff>0)
					  {
						 surchargeOnAboveCrore=BigInteger.valueOf(partBii-diff);
						 setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
					  }
					  else
					  {
						  surchargeOnAboveCrore =BigInteger.valueOf(tempSurcharge);
						  setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
					  }
					  
				}
				else
				{
					surchargeOnAboveCrore =BigInteger.valueOf(tempSurcharge);
				}
			}
			else
			{
			if( (taxOnCutOffInc2.longValue() + tempSurcharge) > (taxOnCutOffInc.longValue() + extraInc +(taxOnCutOffInc.longValue()* 0.10))){
				long marginalRelief = (long) (taxOnCutOffInc2.longValue() + tempSurcharge - (taxOnCutOffInc.longValue() + extraInc +(taxOnCutOffInc.longValue()* 0.10)));
				surchargeOnAboveCrore = BigInteger.valueOf(tempSurcharge - marginalRelief);
				setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
				
				//surchargeOnAboveCrore.value  = Math.round(surchargeOnAboveCrore.value);
				}
			else
			{
				
				surchargeOnAboveCrore =BigInteger.valueOf(tempSurcharge);
				setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
			}
			}
		}
		else if(totInc.longValue() > 5000000 && totInc.longValue() <= 10000000 ){
			
			 if(status.equalsIgnoreCase("I") || status.equalsIgnoreCase("H")){
				 
				  tempSurcharge = (long) (taxOnTotInc.longValue()  * 0.10) ; // for ind n huf for 17-18
			 }
			
			//check if eligible for marginal relief
			long extraInc = totInc.longValue() - 5000000;
			
			if( (taxOnTotInc.longValue() + tempSurcharge ) > (taxOnCutOffInc.longValue() + extraInc)){
				
				long marginalRelief = (taxOnTotInc.longValue() + tempSurcharge) - (taxOnCutOffInc.longValue() + extraInc );
				surchargeOnAboveCrore =BigInteger.valueOf( tempSurcharge - marginalRelief);
				setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);

				} else {
				surchargeOnAboveCrore = BigInteger.valueOf(tempSurcharge);
				setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", surchargeOnAboveCrore);
				}
			}
		else
		{
			setElementValueByTargetName("itr.itr4.taxComputation.surchargeOnAboveCrore", new BigInteger("0"));
		}
			
		}
	
	
	
	public static void calcBalTaxPay() throws java.text.ParseException {

		BigInteger sec89 = getElementValueByTargetNameBig("itr.itr4.taxComputation.section89");
		BigInteger taxPayableOnRebate = getElementValueByTargetNameBig(
				"itr.itr4.taxComputation.taxPayableOnRebate");
		BigInteger eduCess = getElementValueByTargetNameBig("itr.itr4.taxComputation.educationCess");
		BigInteger surcharge = getElementValueByTargetNameBig("itr.itr4.taxComputation.surchargeOnAboveCrore");
		
		BigInteger totTaxWithEduCess = (eduCess.add(taxPayableOnRebate).add(surcharge));
		setElementValueByTargetName("itr.itr4.taxComputation.grossTaxLiability", totTaxWithEduCess);

		BigInteger balTaxPay = totTaxWithEduCess.subtract(sec89);

		setElementValueByTargetName("itr.itr4.taxComputation.netTaxLiability", balTaxPay);

		if (balTaxPay.compareTo(new BigInteger("0")) == -1) {
			setElementValueByTargetName("itr.itr4.taxComputation.netTaxLiability", new BigInteger("0"));
		}

		try {
			calcInterestPayable();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		calcIntrstPayable();

	}
	
	
	
	
	@SuppressWarnings("unchecked")
	public static void calcInterestPayable() throws ParseException, java.text.ParseException {

		
		BigInteger advanceTaxToDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.advanceTax");
		BigInteger TDSToDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.tds");
		BigInteger SATtoDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax");
		BigInteger TCStoDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.tcs");

		BigInteger balTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");

		long advanceTax = 0;
		long selfAssessmentTax = 0;
		long TDS = 0;
		Boolean bool = false;

		List<TDSonSalary> list = (List<TDSonSalary>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmSal").getTableView().getItems();
		TDSonSalary values[] = list.toArray(new TDSonSalary[list.size()]);

		for (int i = 0; i < values.length; i++) {

			if (values[i].getTotalTDSSal().compareTo(values[i].getIncChrgSal()) == 1) {

				setElementValueByTargetName("taxDetailsTabController.type.totalTDSSal", new BigInteger("0"));

				TDS = TDS + values[i].getTotalTDSSal().longValue();
			} else {
				TDS = TDS + values[i].getTotalTDSSal().longValue();

			}
		}

		String portugeseVal = getElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A");

		List<TDSonOthThanSal> list1 = (List<TDSonOthThanSal>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmIncome").getTableView().getItems();
		TDSonOthThanSal values1[] = list1.toArray(new TDSonOthThanSal[list1.size()]);

		

			for (int i = 0; i < values1.length; i++) {

				BigInteger AmtForTaxDeduct = new BigInteger("0");
				BigInteger ClaimOutOfTotTDSOnAmtPaid = new BigInteger("0");

				
				if (values1[i].getTaxDeductCreditDtls().getTaxCreditedOwnHands()!= null) {
					
					AmtForTaxDeduct = values1[i].getTaxDeductCreditDtls().getTaxCreditedOwnHands();

				}
				
					TDS = TDS + AmtForTaxDeduct.longValue();
					
			}

			
			
			List<TDSDetails26QC> list1a = (List<TDSDetails26QC>) ValidationUtil.ALL_TVC
					.get("class com.itd.efiling.offline.ITR4.ctrl.TDSDetails26QC_Controller").getTableView().getItems();
			TDSDetails26QC values1a[] = list1a.toArray(new TDSDetails26QC[list1a.size()]);

			for (int i = 0; i < values1a.length; i++) {

				BigInteger AmtForTaxDeduct_QC = new BigInteger("0");
				BigInteger ClaimOutOfTotTDSOnAmtPaid_QC = new BigInteger("0");

				
				if (values1a[i].getTaxDeductCreditDtls().getTaxCreditedOwnHands()!= null) {
					AmtForTaxDeduct_QC = values1a[i].getTaxDeductCreditDtls().getTaxCreditedOwnHands();

				}
				
					TDS = TDS + AmtForTaxDeduct_QC.longValue();

			}

		// TCS Starts
		setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tds", BigInteger.valueOf(TDS));

		long TCS = 0;

		List<TCS> list2 = (List<TCS>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCollectedAtSource").getTableView().getItems();
		TCS values2[] = list2.toArray(new TCS[list2.size()]);

		if (portugeseVal.equals("N")) {

			for (int i = 0; i < values2.length; i++) {
				if (values2[i].getAmtTCSClaimedThisYear() == null) {
					values2[i].setAmtTCSClaimedThisYear(new BigInteger("0"));
				}

				if (values2[i].getAmtTCSClaimedThisYear().compareTo(values2[i].getTotalTCS()) == 1) {
					setElementValueByTargetName("taxCollectedAtSourceController.type.amtTCSClaimedThisYear",
							new BigInteger("0"));

					values2[i].setAmtTCSClaimedThisYear(new BigInteger("0"));
					TCS = TCS + values2[i].getAmtTCSClaimedThisYear().longValue();
					BigInteger netTCS = BigInteger.valueOf(TCS);
				} else {
					TCS = TCS + values2[i].getAmtTCSClaimedThisYear().longValue();
					BigInteger netTCS = BigInteger.valueOf(TCS);
				}

			}

		} else {
			for (int i = 0; i < values2.length; i++) {
				if (values2[i].getAmtTCSClaimedThisYear() == null) {
					values2[i].setAmtTCSClaimedThisYear(new BigInteger("0"));
				}
				
				if (values2[i].getAmtClaimedBySpouse() == null) {
					values2[i].setAmtClaimedBySpouse(new BigInteger("0"));
				}
				
				if ((values2[i].getAmtTCSClaimedThisYear().add(values2[i].getAmtClaimedBySpouse()))
						.compareTo(values2[i].getTotalTCS()) == 1) {

					setElementValueByTargetName("taxCollectedAtSourceController.type.amtTCSClaimedThisYear",
							new BigInteger("0"));
					setElementValueByTargetName("taxCollectedAtSourceController.type.amtClaimedBySpouse",
							new BigInteger("0"));

					values2[i].setAmtClaimedBySpouse(new BigInteger("0"));
					TCS = TCS + values2[i].getAmtTCSClaimedThisYear().longValue();
					BigInteger netTCS = BigInteger.valueOf(TCS);
				} else {
					TCS = TCS + values2[i].getAmtTCSClaimedThisYear().longValue();
					BigInteger netTCS = BigInteger.valueOf(TCS);
				}

			}
		}
		long totalTCS = 0;

		if (getElementValueByTargetNameBig("itr.itr4.scheduleTCS.totalSchTCS") != null) {

			totalTCS = Long.valueOf(String.valueOf(getElementValueByTargetNameBig("itr.itr4.scheduleTCS.totalSchTCS")));
		}
		TCStoDisplay = BigInteger.valueOf(totalTCS);
		setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tcs", BigInteger.valueOf(TCS));

		TCS = totalTCS;

		Date firstdate = null;
		Date secondDate = null;
		List<TaxPayment> list5 = (List<TaxPayment>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.TaxPaymentController").getTableView().getItems();
		TaxPayment values6[] = list5.toArray(new TaxPayment[list5.size()]);
		for (int i = 0; i < values6.length; i++) {
			Date d1 = values6[i].getDateDep();

			
			SimpleDateFormat format = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
			SimpleDateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");

			Date dat1 = format.parse(d1.toString());
			String a9 = format1.format(dat1);
			Date selfAssm = format1.parse(a9);

			Date selfAssm1 = format1.parse("01/04/2017");
			Date selfAssm2 = format1.parse("31/03/2018");
			Date selfAssm3 = format1.parse("01/04/2018");

			if (checkFirstDateBefore(selfAssm1, selfAssm) && checkFirstDateBefore(selfAssm, selfAssm2)) {

				advanceTax = advanceTax + values6[i].getAmt().longValue();

			} else if (checkFirstDateBefore(selfAssm3, selfAssm)) {
				selfAssessmentTax = selfAssessmentTax + values6[i].getAmt().longValue();

			}
		}

		SimpleDateFormat foatter1 = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat f = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		SimpleDateFormat f1 = new SimpleDateFormat("dd/MM/yyyy");
		try {
			firstdate = foatter1.parse("01/04/2018");
			secondDate = f1.parse("31/07/2018");
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		long selfAssessmentTax234A = 0;
		for (int i = 0; i < values6.length; i++) {
			Date d1 = values6[i].getDateDep();
			Date dat1 = f.parse(d1.toString());
			String a9 = f1.format(dat1);
			Date selfAssm = f1.parse(a9);
			{
				if (checkFirstDateBefore(firstdate, selfAssm) && checkFirstDateBefore(selfAssm, secondDate)) {
					selfAssessmentTax234A = selfAssessmentTax234A + values6[i].getAmt().longValue();

				}
			}
		}

		setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.advanceTax", BigInteger.valueOf(advanceTax));
		setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax",
				BigInteger.valueOf(selfAssessmentTax));

		long intrst234Aprinciple = 0;

		if ((balTaxPayable.longValue() - advanceTax - TDS - TCS - selfAssessmentTax234A) < 0) {

			intrst234Aprinciple = 0;

		} else {

			intrst234Aprinciple = balTaxPayable.longValue() - advanceTax - TDS - TCS - selfAssessmentTax234A;

			// Rounding off to previous hundered
			if (intrst234Aprinciple > 100) {
				intrst234Aprinciple = (long) (Math.floor(intrst234Aprinciple / 100) * 100);
			}

		}
		/*String sDate1="31/12/1998";  
	    Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(sDate1);*/  

		Date currentDate1 = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();

		if (currentDate1 == null) {
			currentDate1 = getCurrentDate();

		} else {
			currentDate1 = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();

		}

		SimpleDateFormat formDate = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		Date datee1 = formDate.parse(currentDate1.toString());
		SimpleDateFormat formDate1 = new SimpleDateFormat("dd/MM/yyyy");
		String toodate = formDate1.format(datee1);
		Date currentDate = formDate1.parse(toodate);

		Date toDate1 = getCurrentDate();

		Date toDate3 = formDate.parse(toDate1.toString());
		String toDate2 = formDate1.format(toDate3);
		Date toDate = formDate1.parse(toDate2);

		int MonthsAfterDueDate;

		try {
			if (checkFirstDateBefore(currentDate, toDate)) {
				currentDate = toDate;

			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Date Int_start_date_234A = null;

		SimpleDateFormat simp = new SimpleDateFormat("dd/MM/yyyy");
		String Int_start_date_234A1 = "01/08/2018";
		Int_start_date_234A = simp.parse(Int_start_date_234A1);

		MonthsAfterDueDate = calcNoOfMonths(currentDate, Int_start_date_234A);
		
		String returnFile = getElementValueByTargetName("itr.itr4.filingStatus.returnFileSec");
		String returntype = getElementValueByTargetName("itr.itr4.filingStatus.returnType");

		if (returnFile.equals("17") && returntype.equals("R")) {
			Date origDate = null;
			String origDate1 = null;
			origDate1 = getElementValueByTargetName("itr.itr4.filingStatus.origRetFiledDate");

			if (origDate1 != null && !origDate1.equals("empty")) {
				try {
					SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
					Date d1 = form1.parse(origDate1);
					SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");

					String k = form.format(d1);
					origDate = form.parse(k);
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}

			if (origDate != null) {

				MonthsAfterDueDate = calcNoOfMonths(origDate, Int_start_date_234A); // for
																					// Revised
																		// return
																					// take
																					// date
																					// of
																					// original
																					// filling

			} else {
				
				MonthsAfterDueDate = 0;
			}

		}
		
		if (returnFile.equals("18")) {

			Date origDate = null;
			String origDate1 = null;
			origDate1 = getElementValueByTargetName("itr.itr4.filingStatus.defRetOrigRetFiledDate");

			if (origDate1 != null && !origDate1.equals("empty")) {

				SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
				Date d1 = form1.parse(origDate1);
				SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");
				String k = form.format(d1);
				origDate = form.parse(k);

				MonthsAfterDueDate = calcNoOfMonths(origDate, Int_start_date_234A); // for
																					// Revised
																					// return
																					// take
																					// date
																					// of
																		// original
																					// filling

			} else {
				
				MonthsAfterDueDate = 0;
			}

		}
		
		
		long intrst234A = Math.round((long) (Math.round(intrst234Aprinciple) * 0.01 * MonthsAfterDueDate));
		long intrst234B = 0;
		long intrst234C = 0;
		long intrst234F = 0;
		
		
		
		//Date dob_status = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
		
		Date dob_status = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
		if (dob_status == null) {
			Calendar cal_status = Calendar.getInstance();
			cal_status.set(Calendar.HOUR_OF_DAY, 0);
			cal_status.set(Calendar.MINUTE, 0);
			cal_status.set(Calendar.SECOND, 0);
			cal_status.set(Calendar.MILLISECOND, 0);

			dob_status = cal_status.getTime();
		}
		int years_status = 0;
		int months_status = 0;
		int days_status = 0;

		
		// create calendar object for birth day
		Calendar birthDay_status = Calendar.getInstance();
		birthDay_status.setTimeInMillis(dob_status.getTime());

		// create calendar object for current day
		long currentTime_status = System.currentTimeMillis();
		Calendar now_status = Calendar.getInstance();
		now_status.setTimeInMillis(currentTime_status);

		// Get difference between years
		years_status = now_status.get(Calendar.YEAR) - birthDay_status.get(Calendar.YEAR);
		int currMonth_status = now_status.get(Calendar.MONTH) + 1;
		int birthMonth_status = birthDay_status.get(Calendar.MONTH) + 1;

		// Get difference between months
		months_status = currMonth_status - birthMonth_status;

		// if month difference is in negative then reduce years by one and
		// calculate the number of months.
		if (months_status < 0) {
			//years_status--;
			months_status = 12 - birthMonth_status + currMonth_status;
			if (now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE))
				months_status--;
		} else if (months_status == 0 && now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE)) {
			//years_status--;
			months_status = 11;
		}
		// Calculate the days
		if (now_status.get(Calendar.DATE) > birthDay_status.get(Calendar.DATE))
			days_status = now_status.get(Calendar.DATE) - birthDay_status.get(Calendar.DATE);
		else if (now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE)) {
			int today = now_status.get(Calendar.DAY_OF_MONTH);
			now_status.add(Calendar.MONTH, -1);
			days_status = now_status.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay_status.get(Calendar.DAY_OF_MONTH) + today;
		} else {
			days_status = 0;
			if (months_status == 12) {
				years_status++;
				months_status = 0;
			}
		}

		SimpleDateFormat form1_status = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		Date date1_status = form1_status.parse(dob_status.toString());
		SimpleDateFormat form_status = new SimpleDateFormat("dd/MM/yyyy");

		String str_status = form_status.format(date1_status);

		Date date2_status = form_status.parse(str_status);

		Calendar calc_status = Calendar.getInstance();
		calc_status.setTime(date1_status);
		int month_status = calc_status.get(Calendar.MONTH);
		int date_status = calc_status.get(Calendar.DAY_OF_MONTH);
		if (month_status + 1 > 4) {
			years_status = years_status - 1;

		}

		else if ((month_status + 1 == 4) && (date_status > 1)) {
			years_status = years_status - 1;
		}

	
		String resStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
		String taxPayer = getElementValueByTargetName("itr.itr4.personalInfo.status");
		String pan = getElementValueByTargetName("itr.itr4.personalInfo.pan");
		BigInteger totBPInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf");

		

		long slab1 = 0;
		long slab2 = 0;
		long slab3 = 0;
		long slab4 = 0;

		String state = getElementValueByTargetName("itr.itr4.personalInfo.address.stateCode");

		SimpleDateFormat format = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		SimpleDateFormat format1 = new SimpleDateFormat("dd/MM/yyyy");

		Date sec234c1 = format1.parse("01/04/2017");
		Date sec234c3 = format1.parse("15/06/2017");
		Date sec234c5 = format1.parse("16/06/2017");
		Date sec234c7 = format1.parse("15/09/2017");
		Date sec234c9 = format1.parse("16/09/2017");
		Date sec234c11 = format1.parse("15/12/2017");
		Date sec234c13 = format1.parse("16/12/2017");
		Date sec234c15 = format1.parse("15/03/2018");

		List<TaxPayment> list3 = (List<TaxPayment>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.TaxPaymentController").getTableView().getItems();
		TaxPayment values4[] = list3.toArray(new TaxPayment[list3.size()]);

		for (int i = 0; i < values4.length; i++) {
			Date d1 = values4[i].getDateDep();

			Date dat1 = format.parse(d1.toString());
			String a9 = format1.format(dat1);
			Date sec234c17 = format1.parse(a9);

			if (checkFirstDateBefore(sec234c1, dat1) && checkFirstDateBefore(dat1, sec234c3)) {

				slab1 = slab1 + values4[i].getAmt().longValue();
			} else if (checkFirstDateBefore(sec234c5, dat1) && checkFirstDateBefore(dat1, sec234c7)) {
				slab2 = slab2 + values4[i].getAmt().longValue();

			} else if (checkFirstDateBefore(sec234c9, dat1) && checkFirstDateBefore(dat1, sec234c11)) {
				slab3 = slab3 + values4[i].getAmt().longValue();

			} else if (checkFirstDateBefore(sec234c13, dat1) && checkFirstDateBefore(dat1, sec234c15)) {
				slab4 = slab4 + values4[i].getAmt().longValue();

			}
		}

		long intrst234Ci = 0;
		long intrst234Cii = 0;
		long intrst234Ciii = 0;
		long intrst234Civ = 0;
		long tempintrst234Ci = 0;
		advanceTaxToDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.advanceTax");
		TDSToDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.tds");
		SATtoDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax");
		balTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");

		long virtualBalTaxPayableFor234C = calcVirtualTaxPayableOnTI();  

		
		if ((balTaxPayable.longValue() - TDS - TCS) >= 10000) {

			
			if (slab1 < ((virtualBalTaxPayableFor234C - TDS - TCS) * 0.12)) {
				tempintrst234Ci = (long) (((virtualBalTaxPayableFor234C - TDS - TCS) * 0.15) - slab1);
			
				if (tempintrst234Ci > 100) {
				//	tempintrst234Ci = (long) (Math.floor(tempintrst234Ci / 100) * 100);
				}
				intrst234Ci = (long) (tempintrst234Ci * 0.01 * 3);
				
			}

			if (slab1 + slab2 < (virtualBalTaxPayableFor234C - TDS - TCS) * 0.36) {

				Long tempintrst234Cii = (long) (((virtualBalTaxPayableFor234C - TDS - TCS) * 0.45) - slab1 - slab2);
				
				if (tempintrst234Cii > 100) {
					//tempintrst234Cii = (long) (Math.floor(tempintrst234Cii / 100) * 100);
				}
				intrst234Cii = (long) (tempintrst234Cii * 0.01 * 3);
			
			}

			if (slab1 + slab2 + slab3 < (virtualBalTaxPayableFor234C - TDS - TCS) * 0.75) {
				Long tempintrst234Ciii = (long) (((virtualBalTaxPayableFor234C - TDS - TCS) * 0.75) - slab1 - slab2
						- slab3);
				
				if (tempintrst234Ciii > 100) {
				//	tempintrst234Ciii = (long) (Math.floor(tempintrst234Ciii / 100) * 100);
				}
				intrst234Ciii = (long) (tempintrst234Ciii * 0.01 * 3);
				
			}

			if (slab1 + slab2 + slab3 + slab4 < (balTaxPayable.longValue() - TDS - TCS) * 1) {
				Long tempintrst234Civ = (long) (((balTaxPayable.longValue() - TDS - TCS) * 1) - slab1 - slab2 - slab3
						- slab4);
				
				if (tempintrst234Civ > 100) {
					//tempintrst234Civ = (long) (Math.floor(tempintrst234Civ / 100) * 100);
				}
				intrst234Civ = (long) (tempintrst234Civ * 0.01 * 1);
				
			}

		} else {

			intrst234Ci = 0;
			intrst234Cii = 0;
			intrst234Ciii = 0;
			intrst234Civ = 0;
		}
		
		String residentialStatus = getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
		intrst234C = intrst234Ci + intrst234Cii + intrst234Ciii + intrst234Civ;
		
		//Date dob = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
		Date dob = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
		if (dob == null) {
			Calendar cal = Calendar.getInstance();
			cal.set(Calendar.HOUR_OF_DAY, 0);
			cal.set(Calendar.MINUTE, 0);
			cal.set(Calendar.SECOND, 0);
			cal.set(Calendar.MILLISECOND, 0);

			dob = cal.getTime();
		}
		// Age Calculator

		int years = 0;
		int months = 0;
		int days = 0;

		// create calendar object for birth day
		Calendar birthDay = Calendar.getInstance();
		birthDay.setTimeInMillis(dob.getTime());

		// create calendar object for current day
		long currentTime = System.currentTimeMillis();
		Calendar now = Calendar.getInstance();
		now.setTimeInMillis(currentTime);

		// Get difference between years
		years = now.get(Calendar.YEAR) - birthDay.get(Calendar.YEAR);
		int currMonth = now.get(Calendar.MONTH) + 1;
		int birthMonth = birthDay.get(Calendar.MONTH) + 1;

		// Get difference between months
		months = currMonth - birthMonth;

		// if month difference is in negative then reduce years by one and
		// calculate the number of months.
		if (months < 0) {
			//years--;
			months = 12 - birthMonth + currMonth;
			if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
				months--;
		} else if (months == 0 && now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			//years--;
			months = 11;
		}
		// Calculate the days
		if (now.get(Calendar.DATE) > birthDay.get(Calendar.DATE))
			days = now.get(Calendar.DATE) - birthDay.get(Calendar.DATE);
		else if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE)) {
			int today = now.get(Calendar.DAY_OF_MONTH);
			now.add(Calendar.MONTH, -1);
			days = now.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay.get(Calendar.DAY_OF_MONTH) + today;
		} else {
			days = 0;
			if (months == 12) {
				years++;
				months = 0;
			}
		}

		SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		Date date1 = form1.parse(dob.toString());
		SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");

		String str = form.format(date1);

		Date date2 = form.parse(str);

		Calendar calc = Calendar.getInstance();
		calc.setTime(date1);
		int month = calc.get(Calendar.MONTH);
		int date = calc.get(Calendar.DAY_OF_MONTH);
		if (month + 1 > 4) {
			years = years - 1;

		}

		else if ((month + 1 == 4) && (date > 1)) {
			years = years - 1;
		}
		String status_ag=getElementValueByTargetName("itr.itr4.personalInfo.status");
		BigInteger E1aAmount=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank");
		BigInteger E1bAmount=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode");
		BigInteger E3Amount=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44ADA.grsReceipt");
		BigInteger E5Amount=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE");
		if ( E1aAmount.compareTo(new BigInteger("0")) != 1 && E1bAmount.compareTo(new BigInteger("0")) != 1 && E3Amount.compareTo(new BigInteger("0")) != 1 &&E5Amount.compareTo(new BigInteger("0")) != 1 &&(years > 59) && status_ag.equals("I") && (residentialStatus.equals("RES") || residentialStatus.equals("NOR"))) {
			
			intrst234C = 0;
		}
		
		
		
		
		// ===========234F fee calculations======
		
		String residential_status=getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
		String return_type=getElementValueByTargetName("itr.itr4.filingStatus.returnFileSec");
		
		
		int years_stat=calculateAge();
		
		if(residential_status.equalsIgnoreCase("RES") || residential_status.equalsIgnoreCase("NOR"))
		{
			
			if(return_type.equals("11") || return_type.equals("12") || return_type.equals("17") || return_type.equals("18"))
			{
				
				
				BigInteger gorss=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
				String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
				BigInteger totalIncome=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");
				if(status.equals("I") || status.equals("H"))
				  {
					
					if( (years_stat>59 &&   years_stat<= 79))
					{
						
						if(gorss.compareTo(new BigInteger("300000")) == 1 )
						{
							
							BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");

							Date slabDate = null;
							
							if (return_type.equals("17")) {

								 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.origRetFiledDate").getData();
								 
								
							} else if (return_type.equals("18")) {

								slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.defRetOrigRetFiledDate").getData(); 
							} else if (return_type.equals("11") || return_type.equals("12")) {
								
								 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();
							}


							SimpleDateFormat frmt = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
							SimpleDateFormat frmt1 = new SimpleDateFormat("dd/MM/yyyy");

							Date currDate = frmt1.parse("31/07/2018");
							Date currDate2 = frmt1.parse("31/12/2018");
							Date currDate5 = frmt1.parse("01/01/2019");

							Date dte1 = frmt.parse(currDate.toString());
							String b9 = frmt1.format(dte1);
							Date currDate1 = format1.parse(b9);

							Date dat2 = frmt.parse(currDate2.toString());
							String a10 = frmt1.format(dat2);
							Date currDate3 = frmt1.parse(a10);

							Date dat3 = frmt.parse(currDate5.toString());
							String a11 = frmt1.format(dat3);
							Date currDate4 = frmt1.parse(a11);

							Date slabDate1 = null;
							
							if (slabDate != null) {
								slabDate1 = format1.parse(frmt1.format(frmt.parse(slabDate.toString())));
							}
							
							if (slabDate1 != null) {
								if (totInc.compareTo(new BigInteger("500000")) == -1
										|| totInc.compareTo(new BigInteger("500000")) == 0) {
									if (checkFirstDateBefore(slabDate1, currDate1) ) {

										intrst234F = 0;
									} else {
										intrst234F = 1000;
									}

								} else if (totInc.compareTo(new BigInteger("500000")) == 1) {

									if (checkFirstDateBefore(slabDate1, currDate1)) {

										intrst234F = 0;
									}
									else if(checkFirstDateBefore(slabDate1, currDate2))
									{
										intrst234F = 5000;
									}
									else  {

										intrst234F = 10000;
									}
									
								}
							}
						}
						else
						{
							intrst234F=0;
						}
						
					}
					else if( years_stat > 79)
					{
						if(gorss.compareTo(new BigInteger("500000")) == 1 )
						{
						BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");

						Date slabDate = null;
						
						if (return_type.equals("17")) {

							 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.origRetFiledDate").getData();
							 
							
						} else if (return_type.equals("18")) {

							slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.defRetOrigRetFiledDate").getData(); 
						} else if (return_type.equals("11") || return_type.equals("12")) {
							
							 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();
						}


						SimpleDateFormat frmt = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
						SimpleDateFormat frmt1 = new SimpleDateFormat("dd/MM/yyyy");

						Date currDate = frmt1.parse("31/07/2018");
						Date currDate2 = frmt1.parse("31/12/2018");
						Date currDate5 = frmt1.parse("01/01/2019");

						Date dte1 = frmt.parse(currDate.toString());
						String b9 = frmt1.format(dte1);
						Date currDate1 = format1.parse(b9);

						Date dat2 = frmt.parse(currDate2.toString());
						String a10 = frmt1.format(dat2);
						Date currDate3 = frmt1.parse(a10);

						Date dat3 = frmt.parse(currDate5.toString());
						String a11 = frmt1.format(dat3);
						Date currDate4 = frmt1.parse(a11);

						Date slabDate1 = null;
						
						if (slabDate != null) {
							slabDate1 = format1.parse(frmt1.format(frmt.parse(slabDate.toString())));
						}
						
						if (slabDate1 != null) {
							if (totInc.compareTo(new BigInteger("500000")) == -1
									|| totInc.compareTo(new BigInteger("500000")) == 0) {
								if (checkFirstDateBefore(slabDate1, currDate1)) {

									intrst234F = 0;
								} else {
									intrst234F = 1000;
								}

							} else if (totInc.compareTo(new BigInteger("500000")) == 1) {

								if (checkFirstDateBefore(slabDate1, currDate1)) {

									intrst234F = 0;
								}
								else if(checkFirstDateBefore(slabDate1, currDate2))
								{
									intrst234F = 5000;
								}
								else  {

									intrst234F = 10000;
								}
								
							}
						}
						}
						else
						{
							intrst234F=0;
						}
						
					}
					else
					{
						if(gorss.compareTo(new BigInteger("250000")) == 1 )
						{
							BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");

							Date slabDate = null;
							
							if (return_type.equals("17")) {

								 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.origRetFiledDate").getData();
								 
								
							} else if (return_type.equals("18")) {

								slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.defRetOrigRetFiledDate").getData(); 
							} else if (return_type.equals("11") || return_type.equals("12")) {
								
								 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();
							}


							SimpleDateFormat frmt = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
							SimpleDateFormat frmt1 = new SimpleDateFormat("dd/MM/yyyy");

							Date currDate = frmt1.parse("31/07/2018");
							Date currDate2 = frmt1.parse("31/12/2018");
							Date currDate5 = frmt1.parse("01/01/2019");

							Date dte1 = frmt.parse(currDate.toString());
							String b9 = frmt1.format(dte1);
							Date currDate1 = format1.parse(b9);

							Date dat2 = frmt.parse(currDate2.toString());
							String a10 = frmt1.format(dat2);
							Date currDate3 = frmt1.parse(a10);

							Date dat3 = frmt.parse(currDate5.toString());
							String a11 = frmt1.format(dat3);
							Date currDate4 = frmt1.parse(a11);

							Date slabDate1 = null;
							
							if (slabDate != null) {
								slabDate1 = format1.parse(frmt1.format(frmt.parse(slabDate.toString())));
							}
							
							if (slabDate1 != null) {
								if (totInc.compareTo(new BigInteger("500000")) == -1
										|| totInc.compareTo(new BigInteger("500000")) == 0) {
									if (checkFirstDateBefore(slabDate1, currDate1)) {

										intrst234F = 0;
									} else {
										intrst234F = 1000;
									}

								} else if (totInc.compareTo(new BigInteger("500000")) == 1) {

									if (checkFirstDateBefore(slabDate1, currDate1)) {

										intrst234F = 0;
									}
									else if(checkFirstDateBefore(slabDate1, currDate2))
									{
										intrst234F = 5000;
									}
									else  {

										intrst234F = 10000;
									}
									
								}
							}
						}
					
				
					}
				  }
				else if(status.equals("F"))
				{

					BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");

					Date slabDate = null;
					
					if (return_type.equals("17")) {

						 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.origRetFiledDate").getData();
						 
						
					} else if (return_type.equals("18")) {

						slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.defRetOrigRetFiledDate").getData(); 
					} else if(return_type.equals("11") || return_type.equals("12")) {
						
						 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();
					}


					SimpleDateFormat frmt = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
					SimpleDateFormat frmt1 = new SimpleDateFormat("dd/MM/yyyy");

					Date currDate = frmt1.parse("31/07/2018");
					Date currDate2 = frmt1.parse("31/12/2018");
					Date currDate5 = frmt1.parse("01/01/2019");

					Date dte1 = frmt.parse(currDate.toString());
					String b9 = frmt1.format(dte1);
					Date currDate1 = format1.parse(b9);

					Date dat2 = frmt.parse(currDate2.toString());
					String a10 = frmt1.format(dat2);
					Date currDate3 = frmt1.parse(a10);

					Date dat3 = frmt.parse(currDate5.toString());
					String a11 = frmt1.format(dat3);
					Date currDate4 = frmt1.parse(a11);

					Date slabDate1 = null;
					
					if (slabDate != null) {
						slabDate1 = format1.parse(frmt1.format(frmt.parse(slabDate.toString())));
					}
					
					if (slabDate1 != null) {
						if (totInc.compareTo(new BigInteger("500000")) == -1
								|| totInc.compareTo(new BigInteger("500000")) == 0) {
							if (checkFirstDateBefore(slabDate1, currDate1)) {

								intrst234F = 0;
							} else {
								intrst234F = 1000;
							}

						} else if (totInc.compareTo(new BigInteger("500000")) == 1) {

							if (checkFirstDateBefore(slabDate1, currDate1)) {

								intrst234F = 0;
							}
							else if(checkFirstDateBefore(slabDate1, currDate2))
							{
								intrst234F = 5000;
							}
							else  {

								intrst234F = 10000;
							}
							
						}
					}
						
					
				}
					
				
			}
			else
			{
				intrst234F=0;
			}
		}
		else if(residential_status.equalsIgnoreCase("NRI"))
		{
			String status=getElementValueByTargetName("itr.itr4.personalInfo.status");
			if(return_type.equals("11") || return_type.equals("12") || return_type.equals("17") || return_type.equals("18"))
			{
				
				if(status.equals("I") || status.equals("H"))
				{
					BigInteger gorss=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
					if(gorss.compareTo(new BigInteger("250000")) == 1 )
					{

						BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");

						Date slabDate = null;
						
						if (return_type.equals("17")) {

							 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.origRetFiledDate").getData();
							 
							
						} else if (return_type.equals("18")) {

							slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.defRetOrigRetFiledDate").getData(); 
						} else if (return_type.equals("11") || return_type.equals("12")){
							
							 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();
						}


						SimpleDateFormat frmt = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
						SimpleDateFormat frmt1 = new SimpleDateFormat("dd/MM/yyyy");

						Date currDate = frmt1.parse("31/07/2018");
						Date currDate2 = frmt1.parse("31/12/2018");
						Date currDate5 = frmt1.parse("01/01/2019");

						Date dte1 = frmt.parse(currDate.toString());
						String b9 = frmt1.format(dte1);
						Date currDate1 = format1.parse(b9);

						Date dat2 = frmt.parse(currDate2.toString());
						String a10 = frmt1.format(dat2);
						Date currDate3 = frmt1.parse(a10);

						Date dat3 = frmt.parse(currDate5.toString());
						String a11 = frmt1.format(dat3);
						Date currDate4 = frmt1.parse(a11);

						Date slabDate1 = null;
						
						if (slabDate != null) {
							slabDate1 = format1.parse(frmt1.format(frmt.parse(slabDate.toString())));
						}
						
						if (slabDate1 != null) {
							if (totInc.compareTo(new BigInteger("500000")) == -1
									|| totInc.compareTo(new BigInteger("500000")) == 0) {
								if (checkFirstDateBefore(slabDate1, currDate1)) {

									intrst234F = 0;
								} else {
									intrst234F = 1000;
								}

							} else if (totInc.compareTo(new BigInteger("500000")) == 1) {

								if (checkFirstDateBefore(slabDate1, currDate1)) {

									intrst234F = 0;
								}
								else if(checkFirstDateBefore(slabDate1, currDate2))
								{
									intrst234F = 5000;
								}
								else  {

									intrst234F = 10000;
								}
								
							}
						}
					}
					else
					{
						intrst234F=0;
				     }
			}
				else if(status.equals("F"))
				{
					

					BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");

					Date slabDate = null;
					
					if (return_type.equals("17")) {

						 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.origRetFiledDate").getData();
						 
						
					} else if (return_type.equals("18")) {

						slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.defRetOrigRetFiledDate").getData(); 
					} else if (return_type.equals("11") || return_type.equals("12")) {
						
						 slabDate = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData();
					}


					SimpleDateFormat frmt = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
					SimpleDateFormat frmt1 = new SimpleDateFormat("dd/MM/yyyy");

					Date currDate = frmt1.parse("31/07/2018");
					Date currDate2 = frmt1.parse("31/12/2018");
					Date currDate5 = frmt1.parse("01/01/2019");

					Date dte1 = frmt.parse(currDate.toString());
					String b9 = frmt1.format(dte1);
					Date currDate1 = format1.parse(b9);

					Date dat2 = frmt.parse(currDate2.toString());
					String a10 = frmt1.format(dat2);
					Date currDate3 = frmt1.parse(a10);

					Date dat3 = frmt.parse(currDate5.toString());
					String a11 = frmt1.format(dat3);
					Date currDate4 = frmt1.parse(a11);

					Date slabDate1 = null;
					
					if (slabDate != null) {
						slabDate1 = format1.parse(frmt1.format(frmt.parse(slabDate.toString())));
					}
					
					if (slabDate1 != null) {
						if (totInc.compareTo(new BigInteger("500000")) == -1
								|| totInc.compareTo(new BigInteger("500000")) == 0) {
							if (checkFirstDateBefore(slabDate1, currDate1)) {

								intrst234F = 0;
							} else {
								intrst234F = 1000;
							}

						} else if (totInc.compareTo(new BigInteger("500000")) == 1) {

							if (checkFirstDateBefore(slabDate1, currDate1)) {

								intrst234F = 0;
							}
							else if(checkFirstDateBefore(slabDate1, currDate2))
							{
								intrst234F = 5000;
							}
							else  {

								intrst234F = 10000;
							}
							
						}
					}
					
				}
			}
			else 
			{
				intrst234F=0;
			}
		}
		
		
		
		
		
		
		
		
		long intrst234Bprinciple = 0;
		long intrst234Bi = 0;
		long noOfMonthsTillSelfasst = 0;

		if (balTaxPayable.longValue() - TDS - TCS >= 10000) {
			if (advanceTax < ((balTaxPayable.longValue() - TDS - TCS) * 0.90)) {
				intrst234Bprinciple = (balTaxPayable.longValue() - advanceTax - TDS - TCS);

				// Rounding off to previous hundered

				if (intrst234Bprinciple > 100) {
					intrst234Bprinciple = (long) (Math.floor(intrst234Bprinciple / 100) * 100);
				}

				// ======== Interest 234B first part calc==========

				Date[] selfAsspaidDates = null;
				long selfAsspaidAmts[] = null;
				int x = 1;
				Date tempDate = null;
				long tempAmt = 0;

				SimpleDateFormat dd = new SimpleDateFormat("dd/MM/yyyy");
				String dt = "01/04/2018";
				Date AY_start_date = dd.parse(dt);

				List<TaxPayment> list4 = (List<TaxPayment>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.TaxPaymentController").getTableView().getItems();
				TaxPayment values5[] = list4.toArray(new TaxPayment[list4.size()]);

				for (int i = 0; i < values5.length; i++) {

					Date d1 = values5[i].getDateDep();
					Date dat1 = format.parse(d1.toString());
					String a9 = format1.format(dat1);
					Date selfAssm = format1.parse(a9);

					if (checkFirstDateBefore(AY_start_date, selfAssm) && checkFirstDateBefore(selfAssm, currentDate)) {
						if (values5[i].getAmt().longValue() != 0) {
							selfAsspaidDates = new Date[x];
							selfAsspaidAmts = new long[x];

							for (int y = 1; y <= selfAsspaidDates.length; y++) {
								y = y - 1;
								if (selfAsspaidDates[y] == null) {
									for (int k = 0; k < values5.length; k++) {
										Date inner = values5[k].getDateDep();
										Date inner1 = format.parse(inner.toString());
										String inner2 = format1.format(inner1);
										Date inner3 = format1.parse(inner2);
										if (checkFirstDateBefore(AY_start_date, inner3)
												&& checkFirstDateBefore(inner3, currentDate)) {
											if (y < selfAsspaidDates.length) {
												if (selfAsspaidDates[y] == null) {
													selfAsspaidDates[y] = values5[k].getDateDep();
													selfAsspaidAmts[y] = values5[k].getAmt().longValue();
												}
												y++;
											} else {
												y++;
												break;
											}
										}
									}

								}

							}

							x++;

						}

					}

				}

				int selfAsspaidAmtslen = 0;
				int selfAsspaidDateslen = 0;
				if (selfAsspaidDates != null && (selfAsspaidDates.length > 1)) {
					for (int q = 0; q < selfAsspaidDates.length - 1; q++) {
						for (int r = q + 1; r < selfAsspaidDates.length; r++) {

							if (checkFirstDateBefore(selfAsspaidDates[q], selfAsspaidDates[r])) {

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

					int arrLen = selfAsspaidDates.length;
					int lastMonth = 0;
					int lastIndex = -1;
					int lastYear = 0;
					for (int q = 0; q < arrLen; q++) {
						if (selfAsspaidDates[q] == null) {

						} else {
							Calendar cal = Calendar.getInstance();
							cal.setTime(selfAsspaidDates[q]);
							if (cal.get(Calendar.MONTH) == lastMonth && cal.get(Calendar.YEAR) == lastYear) {
								selfAsspaidAmts[lastIndex] = selfAsspaidAmts[lastIndex] + selfAsspaidAmts[q];
							} else {
								lastMonth = cal.get(Calendar.MONTH);
								lastYear = cal.get(Calendar.YEAR);
								selfAsspaidAmts[++lastIndex] = selfAsspaidAmts[q];
								selfAsspaidDates[lastIndex] = selfAsspaidDates[q];
							}
						}
					}

					/*
					 * selfAsspaidAmts.length = ++lastIndex;
					 * selfAsspaidDates.length = lastIndex;
					 */
					selfAsspaidAmtslen = ++lastIndex;
					selfAsspaidDateslen = lastIndex;

					bool = true;
				}

				if (bool == true) {

					if (selfAsspaidDateslen == 0) {
						noOfMonthsTillSelfasst = calcNoOfMonths(currentDate, AY_start_date);

					} else {

						noOfMonthsTillSelfasst = calcNoOfMonths(selfAsspaidDates[0], AY_start_date);

					}

					intrst234Bi = (long) (intrst234Bprinciple * 0.01 * noOfMonthsTillSelfasst);

					// ======== Interest 234B second part calc==========
					long intrst234Bprinciple2 = 0; // intrst234Bprinciple if
													// self assesment is paid
					long selfAsspart = 0;
					long noOfMonthsTillSelfasst2;
					long intrst234Bii = 0;
					long partialSelfAssPaid = 0;
					int k = 0;
					Date interestFrom;
					Date interestTill;

					balTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");

					if (selfAsspaidDateslen != 0) {

						for (int i = 0; i < selfAsspaidDateslen; i++) {

							partialSelfAssPaid = partialSelfAssPaid + selfAsspaidAmts[i];

							intrst234Bprinciple2 = balTaxPayable.longValue() - advanceTax - TDS - TCS + intrst234A
									+ intrst234C + intrst234F +intrst234Bi + intrst234Bii - partialSelfAssPaid;

							// Rounding off to previous hundered
							if (intrst234Bprinciple2 < 0) {
								intrst234Bprinciple2 = 0;
							}
							if (intrst234Bprinciple2 > 100) {
								intrst234Bprinciple2 = (long) (Math.floor(intrst234Bprinciple2 / 100) * 100);
							}
							// calclulating remaining months to levy interest

							interestTill = currentDate;
							interestFrom = selfAsspaidDates[i];

							if (i != (selfAsspaidDateslen) - 1) {

								for (k = i; k < (selfAsspaidDateslen) - 1; k++) {
									if (selfAsspaidDates[k] != selfAsspaidDates[k + 1]) {
										interestTill = selfAsspaidDates[k + 1];
										interestFrom = selfAsspaidDates[k];
										k = selfAsspaidDates.length;
									}
								}
							}

							SimpleDateFormat intr = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
							SimpleDateFormat intr1 = new SimpleDateFormat("dd/MM/yyyy");

							Date dat1 = intr.parse(interestTill.toString());
							String a9 = intr1.format(dat1);
							interestTill = intr1.parse(a9);

							Date dat11 = intr.parse(interestFrom.toString());
							String a91 = intr1.format(dat11);
							interestFrom = intr1.parse(a91);

							noOfMonthsTillSelfasst2 = calcNoOfMonths(interestTill, interestFrom);
							noOfMonthsTillSelfasst2 = noOfMonthsTillSelfasst2 - 1;
							if (intrst234Bprinciple2 < intrst234Bprinciple) {
								intrst234Bprinciple = intrst234Bprinciple2;
								intrst234Bii = (long) (intrst234Bii
										+ (intrst234Bprinciple2 * 0.01 * noOfMonthsTillSelfasst2));

							} else {
								intrst234Bii = (long) (intrst234Bii
										+ (intrst234Bprinciple * 0.01 * noOfMonthsTillSelfasst2));

							}
						}
					}

					intrst234B = intrst234Bi + intrst234Bii;

				} else if (bool == false) {

					if (selfAsspaidDates == null) {

						noOfMonthsTillSelfasst = calcNoOfMonths(currentDate, AY_start_date);

					} else {

						noOfMonthsTillSelfasst = calcNoOfMonths(selfAsspaidDates[0], AY_start_date);

					}
					intrst234Bi = (long) (intrst234Bprinciple * 0.01 * noOfMonthsTillSelfasst);

					// ======== Interest 234B second part calc==========
					long intrst234Bprinciple2 = 0; // intrst234Bprinciple if
													// self assesment is paid
					long selfAsspart = 0;
					long noOfMonthsTillSelfasst2;
					long intrst234Bii = 0;
					long partialSelfAssPaid = 0;
					int k = 0;
					Date interestFrom;
					Date interestTill;

					balTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");

					if (selfAsspaidDates != null && (selfAsspaidDates.length != 0)) {

						for (int i = 0; i < selfAsspaidDates.length; i++) {

							partialSelfAssPaid = partialSelfAssPaid + selfAsspaidAmts[i];

							intrst234Bprinciple2 = balTaxPayable.longValue() - advanceTax - TDS - TCS + intrst234A
									+ intrst234C + intrst234F +intrst234Bi + intrst234Bii - partialSelfAssPaid;

							// Rounding off to previous hundered
							if (intrst234Bprinciple2 < 0) {
								intrst234Bprinciple2 = 0;
							}
							if (intrst234Bprinciple2 > 100) {
								intrst234Bprinciple2 = (long) (Math.floor(intrst234Bprinciple2 / 100) * 100);
							}
							// calclulating remaining months to levy interest

							interestTill = currentDate;
							interestFrom = selfAsspaidDates[i];

							if (i != (selfAsspaidDates.length) - 1) {

								for (k = i; k < (selfAsspaidDates.length) - 1; k++) {
									if (selfAsspaidDates[k] != selfAsspaidDates[k + 1]) {
										interestTill = selfAsspaidDates[k + 1];
										interestFrom = selfAsspaidDates[k];
										k = selfAsspaidDates.length;
									}
								}
							}

							SimpleDateFormat intr = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
							SimpleDateFormat intr1 = new SimpleDateFormat("dd/MM/yyyy");

							Date dat1 = intr.parse(interestTill.toString());
							String a9 = intr1.format(dat1);
							interestTill = intr1.parse(a9);

							Date dat11 = intr.parse(interestFrom.toString());
							String a91 = intr1.format(dat11);
							interestFrom = intr1.parse(a91);

							noOfMonthsTillSelfasst2 = calcNoOfMonths(interestTill, interestFrom);
							noOfMonthsTillSelfasst2 = noOfMonthsTillSelfasst2 - 1;
							if (intrst234Bprinciple2 < intrst234Bprinciple) {
								intrst234Bprinciple = intrst234Bprinciple2;
								intrst234Bii = (long) (intrst234Bii
										+ (intrst234Bprinciple2 * 0.01 * noOfMonthsTillSelfasst2));

							} else {
								intrst234Bii = (long) (intrst234Bii
										+ (intrst234Bprinciple * 0.01 * noOfMonthsTillSelfasst2));

							}
						}
					}

					intrst234B = intrst234Bi + intrst234Bii;
				}

			} else {
				intrst234B = 0;
			}

		}
		
		if (E1aAmount.compareTo(new BigInteger("0")) != 1 && E1bAmount.compareTo(new BigInteger("0")) != 1 && E3Amount.compareTo(new BigInteger("0")) != 1 &&E5Amount.compareTo(new BigInteger("0")) != 1 && years > 59 && status_ag.equals("I") && (residentialStatus.equals("RES") || residentialStatus.equals("NOR"))) {
			intrst234B = 0;
		}
		
		
		/*BigInteger input234A = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234A");
		BigInteger input234B = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234B");
		BigInteger input234C = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234C");
		BigInteger input234F = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.lateFilingFee234F");
		
		setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234A",
				BigInteger.valueOf(intrst234A));
		setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B",
				BigInteger.valueOf(intrst234B));
		setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234C",
				BigInteger.valueOf(intrst234C));
		setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.lateFilingFee234F",
				BigInteger.valueOf(intrst234F));*/
		
		BigInteger input234A = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234A");
		BigInteger input234B = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234B");
		ValidationAware returnFileSec=ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.returnFileSec");
		if (RefHolders.flag234A == true) {
			if ((returnFileSec.getData() != null)
					&& ((returnFileSec.getData().equals("11")) || (returnFileSec.getData().equals("12"))
							|| (returnFileSec.getData().equals("17")) || (returnFileSec.getData().equals("18")))) {

				setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234A",BigInteger.valueOf(intrst234A));
				setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B",BigInteger.valueOf(intrst234B));

			} else {
				if (input234A.equals(intrst234A)) {
					setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234A",BigInteger.valueOf(intrst234A));
				} else {
					setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234A", input234A);
				}
				if (input234B.equals(intrst234B)) {
					setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B",BigInteger.valueOf(intrst234B));
				} else {
					setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B", input234B);
				}
			}
			setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234C",BigInteger.valueOf(intrst234C));
			setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.lateFilingFee234F",BigInteger.valueOf(intrst234F));
			
			} else {
			
			setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234A",BigInteger.valueOf(intrst234A));
			setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B",BigInteger.valueOf(intrst234B));

			setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234C",BigInteger.valueOf(intrst234C));
			setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.lateFilingFee234F",BigInteger.valueOf(intrst234F));

		}
	
		BigInteger input234A1 = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234A");
		BigInteger input234B1 = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234B");

		long intrstPayable = input234A1.longValue() + input234B1.longValue() +intrst234C +intrst234F;

		BigInteger balTaxPay = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");

		long totTaxIntrstPay = balTaxPay.longValue() + intrstPayable;
		setElementValueByTargetName("itr.itr4.taxComputation.totTaxPlusIntrstPay",
				BigInteger.valueOf(totTaxIntrstPay));

		calcTotTaxPaid();

	}
	
	public static void calcTotTaxPaid() {

		BigInteger advanceTaxToDisplay = new BigInteger("0"), TDSToDisplay = new BigInteger("0"),
				TCStoDisplay = new BigInteger("0"), SATtoDisplay = new BigInteger("0");
		long totTaxPaid = 0;
		advanceTaxToDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.advanceTax");
		TDSToDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.tds");
		TCStoDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.tcs");

		SATtoDisplay = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax");
		totTaxPaid = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid").longValue();

		totTaxPaid = advanceTaxToDisplay.longValue() + TDSToDisplay.longValue() + SATtoDisplay.longValue()
				+ TCStoDisplay.longValue();

		setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid", BigInteger.valueOf(totTaxPaid));

		calcTaxPayable15Minus17();
	}

	
public static void calculateTotalTax(ValidationAware field) throws java.text.ParseException {
		
        
		if (field.getTarget().equals("taxDetailsTabController.type.totalTDSSal")) {

			onChangeTaxDeducted_table1("taxDetailsTabController.type.totalTDSSal");
			calculateTotal("itr.itr4.tdSonSalaries.totalTDSonSalaries");
		}
		if (field.getTarget().equals("taxDeductedFrmIncomeController.type.rcptDtls26AS")) {
			 
			 onChangeAmntClaimedSpouse("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands");
			 calculateTotal_claim("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals");
			 

		}
		if (field.getTarget().equals("tdsDetails26QCIncomeController.type.rcptDtls26AS") ) {

			 onChangeAmntClaimedSpouse_QC("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands");
			 calculateTotal_claim_QC("itr.itr4.tdsDtls26QC.totalTDSDetails26QC");
			}
		if (field.getTarget().equals("taxCollectedAtSourceController.type.amtClaimedBySpouse")) {

			onChangeAmountClaimedSpouse("taxCollectedAtSourceController.type.amtClaimedBySpouse");
			calculateTotal_TCS("itr.itr4.scheduleTCS.totalSchTCS");
		}

		if (field.getTarget().equals("advancedTax.type.amt")) {
			calculateTotal_tax("itr.itr4.scheduleIT.totalTaxPayments");
		}
		
		
	}
public static void calculateTotal(final String dest) throws java.text.ParseException {
	List<TDSonSalary> list = (List<TDSonSalary>) ValidationUtil.ALL_TVC
			.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmSal").getTableView().getItems();

	long total = 0;

	for (TDSonSalary tdsonsalary : list) {

		total = total + tdsonsalary.getTotalTDSSal().longValue();

	}
        
	ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
	destination.setData(BigInteger.valueOf(total));
	
	ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.tdSonSalaries.totalTDSonSalaries");

	point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));
	setElementValueByTargetName(dest, BigInteger.valueOf((total)));

	// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));

	BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	GrossIncome();
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	//onChangeSection80D1(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
	//onChangeSection80GGA_User(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA_Usr"));
	onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
	checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();
}



public static void calculateTotal_taxTDS2QC_b(final String dest) throws java.text.ParseException {
	List<TDSDetails26QCB> list = (List<TDSDetails26QCB>) ValidationUtil.ALL_TVC
			.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmIncomeQCPartB").getTableView().getItems();

	long total = 0;

	for (TDSDetails26QCB tdsonsalary : list) {

		total = total + tdsonsalary.getTdsClaimed().longValue();

	}
        
	ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
	destination.setData(BigInteger.valueOf(total));
	
	ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.tdsDtls26QC.totalTDSDetails26QBQCPartB");

	point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));
	setElementValueByTargetName(dest, BigInteger.valueOf((total)));

	// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));

	BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	GrossIncome();
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	//onChangeSection80D1(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
	//onChangeSection80GGA_User(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA_Usr"));
	onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
	checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();
}
public static void calculateTotalTDS2(final String dest) throws java.text.ParseException {

	List<TaxCreditDetails> list = (List<TaxCreditDetails>) getElementValueByTarget("itr.itr4.tdSonOthThanSals.tdSonOthThanSal.taxDeductCreditDtls.taxCreditDetails");

	long total = 0;
	for(TaxCreditDetails tdsDetails26QC1 : list)
	{
		total +=Long.valueOf(tdsDetails26QC1.getTaxCreditedTDS().toString());
		
	}
	BigInteger sum = null;
	BigInteger TDSCredit=getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands");
	BigInteger TDSDeducted=getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS");
	BigInteger TDSDeductOwn=getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands");

	sum=TDSCredit.add(new BigInteger(String.valueOf(total)));
	
	BigInteger sumDeduct=TDSDeducted.add(TDSDeductOwn);
	
	
	if(sum.compareTo(sumDeduct) == 1)
	{
		
		MessageDialogCtrl.displayErrorDialog("ERROR", "Amount in field Col (8+ TDS at Col.(9)) cannot be more than sum of field Col (6) and TDS at col.(7).");
		list.clear();
		total=0;
		ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands").setData(null);
		setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands", null);
		setElementValueByTargetName("itr.itr4.tdSonOthThanSals.tdSonOthThanSal.taxDeductCreditDtls.taxCreditedOwnHands",null);
		
	}

}

public static void calculateTotalQC(final String dest) throws java.text.ParseException {

		List<TaxCreditDetails> list = (List<TaxCreditDetails>) getElementValueByTarget("itr.itr4.tdsDtls26QC.tdsDetails26QC.taxDeductCreditDtls.taxCreditDetails");

		long total = 0;
		for(TaxCreditDetails tdsDetails26QC1 : list)
		{
			total +=Long.valueOf(tdsDetails26QC1.getTaxCreditedTDS().toString());
			
		}
		BigInteger sum = null;
		BigInteger TDSCredit=getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands");
		BigInteger TDSDeducted=getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS");
		BigInteger TDSDeductOwn=getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands");
		
		
		sum=TDSCredit.add(new BigInteger(String.valueOf(total)));
		
		BigInteger sumDeduct=TDSDeducted.add(TDSDeductOwn);
		
		
		if(sum.compareTo(sumDeduct) == 1)
		{
			
			list.clear();
			MessageDialogCtrl.displayErrorDialog("ERROR", "Amount in field Col (8+ TDS at Col.(9)) cannot be more than sum of field Col (6) and TDS at col.(7).");
			total=0;
			ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands").setData(null);
			setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands", null);
			setElementValueByTargetName("itr.itr4.tdsDtls26QC.tdsDetails26QC.taxDeductCreditDtls.taxCreditedOwnHands",null);
			DataTransporter.updat(Form.getForm());
		}

}
public static void onChangeTaxDeducted_table1(String s) {
	BigInteger incomeFromSal = getElementValueByTargetNameBig("taxDetailsTabController.type.incChrgSal");
	BigInteger taxDeducted = getElementValueByTargetNameBig(s);
	if (incomeFromSal.compareTo(taxDeducted) < 0) {
		MessageDialogCtrl.displayInfoDialog("ERROR",
				"Total tax deducted cannot be more than Income chargeable under Salaries");
		ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.totalTDSSal").setData(null);
		setElementValueByTargetName("taxDetailsTabController.type.totalTDSSal", null);
	}
}

public static void onChangeAmntClaimedSpouse(String s) throws java.text.ParseException {

		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	

}
public static void onChangeAmntClaimedSpouse_QC(String s) throws java.text.ParseException {
	/*String AmntClaimedSpouse = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get(s).getData());
	if (AmntClaimedSpouse == "null" || AmntClaimedSpouse.equals(null)) {
		AmntClaimedSpouse = "0";
	}
    long temp=0;
	long AmntClaimed = ValidationUtil.getNvlLongValue(
			getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands"));*/
	
	
	/*if(ValidationUtil.ALL_TVC
			.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCreditedController") != null)
	{
		List<TaxCreditDetails> list = (List<TaxCreditDetails>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCreditedController").getTableView().getItems();
		
		for (TaxCreditDetails taxCreditDetails : list) {

			temp = temp + taxCreditDetails.getTaxCreditedTDS().longValue();
			LOG.info("TDSSSS :5:"+temp);
		}
	}
	else
	{
		
		if(getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS") == null)
		{
			
		temp=0;
		}
		else
		{
			
			
			BigInteger TDS=getElementValueByTargetNameBig("tdsDetails26QCIncomeController.paymentDtlsController.type.taxCreditedTDS");
			temp=Long.valueOf(TDS.toString());
			LOG.info("TDSSSS :3:"+temp);
			LOG.info("TDSSSS :4:"+TDS);
		}
	}*/
	/*long TaxDeduct = ValidationUtil
			.getNvlLongValue(getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS"));
	long sumOf = AmntClaimed +TaxDeduct;
	long taxcreditown= ValidationUtil.getNvlLongValue(
			getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands"));
	long sumOfCredit = taxcreditown +temp;
	
	if (sumOfCredit > sumOf) {*/
		//MessageDialogCtrl.displayErrorDialog("ERROR", "Amount in field Col (8+ TDS at Col.(9)) cannot be more than sum of field Col (6) and TDS at col.(7).");
		
		
		//ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.paymentDtlsController.type.taxCreditedTDS").setData(null);
	//	setElementValueByTargetName("itr.itr4.tdsDtls26QC.tdsDetails26QC.taxDeductCreditDtls.taxCreditDetails.taxCreditedTDS",null);
		
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	//	intialize();
		GrossIncome();
		
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		//onChangeSection80D1(ValidationUtil.ALL_FIELDS_MAP
			//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr"));
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		//onChangeSection80GGA_User(ValidationUtil.ALL_FIELDS_MAP
			//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA_Usr"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	

}
@SuppressWarnings("unchecked")
public static void calculateTotal_claim(final String dest) {
	List<TDSonOthThanSal> list = (List<TDSonOthThanSal>) ValidationUtil.ALL_TVC
			.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmIncome").getTableView().getItems();

	long total = 0;

	for (TDSonOthThanSal tdsonOththanSal : list) {

		total = total + tdsonOththanSal.getTaxDeductCreditDtls().getTaxCreditedOwnHands().longValue();

	}

	ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);

	destination.setData(BigInteger.valueOf(total));

	ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals");

	point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));

	setElementValueByTargetName(dest, BigInteger.valueOf((total)));

}

@SuppressWarnings("unchecked")
public static void calculateTotal_claim_QC(final String dest) {
	List<TDSDetails26QC> list = (List<TDSDetails26QC>) ValidationUtil.ALL_TVC
			.get("class com.itd.efiling.offline.ITR4.ctrl.TDSDetails26QC_Controller").getTableView().getItems();

	long total = 0;

	for (TDSDetails26QC tdsDetails26QC : list) {

		total = total + tdsDetails26QC.getTaxDeductCreditDtls().getTaxCreditedOwnHands().longValue();

	}

	
//	if(gross.compareTo(new BigInteger("0"))== 0  && total != 0)
//	{
//		MessageDialogCtrl.displayInfoDialog("WARNING",
//				"Gross rent recieved/ recievable/ letable value should be greater than zero..");
//		
//	}
	ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);

	destination.setData(BigInteger.valueOf(total));

	ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.tdsDtls26QC.totalTDSDetails26QC");

	point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));

	setElementValueByTargetName(dest, BigInteger.valueOf((total)));

}
@SuppressWarnings("unchecked")
public static void calculateTotal_TCS(final String dest) throws java.text.ParseException {
	List<TCS> list = (List<TCS>) ValidationUtil.ALL_TVC
			.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCollectedAtSource").getTableView().getItems();

	long total = 0;

	for (TCS tcs : list) {

		total = total + tcs.getAmtTCSClaimedThisYear().longValue();

	}

	ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
	destination.setData(BigInteger.valueOf(total));

	ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleTCS.totalSchTCS");

	point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));

	setElementValueByTargetName(dest, BigInteger.valueOf((long) (total)));

	// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
	BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	//intialize();
	GrossIncome();
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	//onChangeSection80D1(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
	//onChangeSection80GGA_User(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA_Usr"));
	onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
	checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();

}

public static void calculateTotal_tax(final String dest) throws java.text.ParseException {
	List<TaxPayment> list = (List<TaxPayment>) ValidationUtil.ALL_TVC
			.get("class com.itd.efiling.offline.ITR4.ctrl.TaxPaymentController").getTableView().getItems();

	long total = 0;
	for (TaxPayment taxpay : list) {

		total = total + taxpay.getAmt().longValue();

	}

	ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
	destination.setData(BigInteger.valueOf(total));

	ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleIT.totalTaxPayments");

	point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));

	setElementValueByTargetName(dest, BigInteger.valueOf((long) (total)));

	// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
	BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	//intialize();
	GrossIncome();
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	//onChangeSection80D1(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB_Usr"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
	//onChangeSection80GGA_User(ValidationUtil.ALL_FIELDS_MAP
		//	.get("itr.itr1.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA_Usr"));
	onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
	checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();

}
	public static BigInteger getMaxLimitAmount() {
		BigInteger grossTotIncome1 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
		BigInteger maxAmount = new BigInteger("150000");

		if (grossTotIncome1.compareTo(new BigInteger("150000")) == 1
				|| grossTotIncome1.compareTo(new BigInteger("150000")) == 0) {
			return maxAmount;
		} else {
			return grossTotIncome1;
		}

	}
	public static void sumDeductionsWithout80GG() {

		BigInteger sum = new BigInteger("0");
		BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		BigInteger section80C = new BigInteger("0"), section80CCC = new BigInteger("0"),
				section80GG = new BigInteger("0"), section80CCCDEmp = new BigInteger("0"),
				section80CCD1B = new BigInteger("0"), section80CCDEmp1 = new BigInteger("0"),
				section80CCG = new BigInteger("0"), section80D = new BigInteger("0"), section80DD = new BigInteger("0"),
				section80DDB = new BigInteger("0"), section80E = new BigInteger("0"), section80EE = new BigInteger("0"),
				section80G = new BigInteger("0"), section80GGA = new BigInteger("0"),
				section80GGC = new BigInteger("0"), section80RRB = new BigInteger("0"),
				section80QQB = new BigInteger("0"), section80TTA = new BigInteger("0"),
				section80U = new BigInteger("0");
		section80C = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C");
		section80CCC = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC");
		section80CCCDEmp = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE");
		section80CCD1B = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B");
		section80CCDEmp1 = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer");
		section80CCG = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG");
		section80D = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80D");
		section80DD = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD");
		section80DDB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB");
		section80E = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E");
		section80EE = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE");
		section80G = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G");
		section80GG = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG");
		section80GGC = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC");
		section80RRB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB");
		section80QQB = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB");
		section80TTA = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA");
		section80U = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U");

		if (section80C != null) {
			sum = sum.add(section80C);
		}
		if (section80CCC != null) {
			sum = sum.add(section80CCC);

		}
		if (section80CCCDEmp != null) {
			sum = sum.add(section80CCCDEmp);

		}
		if (section80CCD1B != null) {
			sum = sum.add(section80CCD1B);

		}
		if (section80CCDEmp1 != null) {
			sum = sum.add(section80CCDEmp1);

		}
		if (section80CCG != null) {
			sum = sum.add(section80CCG);

		}
		if (section80D != null) {
			sum = sum.add(section80D);

		}
		if (section80DD != null) {
			sum = sum.add(section80DD);

		}
		if (section80DDB != null) {
			sum = sum.add(section80DDB);

		}
		if (section80E != null) {
			sum = sum.add(section80E);

		}
		if (section80EE != null) {
			sum = sum.add(section80EE);

		}
		if (section80G != null) {
			sum = sum.add(section80G);

		}
		if (section80GG != null) {
			sum = sum.add(section80GG);

		}
		
		if (section80GGC != null) {
			sum = sum.add(section80GGC);

		}
		if (section80RRB != null) {
			sum = sum.add(section80RRB);

		}
		if (section80QQB != null) {
			sum = sum.add(section80QQB);

		}
		if (section80TTA != null) {
			sum = sum.add(section80TTA);

		}
		if (section80U != null) {
			sum = sum.add(section80U);

		}

		if (grossTotIncome.compareTo(new BigInteger("0")) == 1) {

			if (sum.compareTo(grossTotIncome) == 1) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",
						grossTotIncome);

			} else {
				if (sum.longValue() > 100) {
					sum = BigInteger.valueOf((long) (Math.floor(sum.longValue() / 100) * 100));
				}
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",
						sum);

			}
		} else {
			if (sum.longValue() > 100) {
				sum = BigInteger.valueOf((long) (Math.floor(sum.longValue() / 100) * 100));
			}
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",
					sum);

		}

		BigInteger totInc = getElementValueByTargetNameBig(
				"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions");

		BigInteger nettotInc = grossTotIncome.subtract(totInc);
		if (nettotInc.compareTo(new BigInteger("0")) == 1 || nettotInc.compareTo(new BigInteger("0")) == 0) {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome",
					BigInteger.valueOf(nettotInc.longValue()));

		} else {
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome", new BigInteger("0"));

		}

	}
	
	
	public static void onChangeAmountClaimedSpouse(String s) {
		String AmntClaimedSpouse = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get(s).getData());
		if (AmntClaimedSpouse == "null" || AmntClaimedSpouse.equals(null)) {
			AmntClaimedSpouse = "0";
		}

		long AmntClaimed = ValidationUtil
				.getNvlLongValue(getElementValueByTargetNameBig("taxCollectedAtSourceController.type.amtTCSClaimedThisYear"));
		long TaxDeduct = ValidationUtil
				.getNvlLongValue(getElementValueByTargetNameBig("taxCollectedAtSourceController.type.totalTCS"));
		long sumOf = AmntClaimed + Long.valueOf(AmntClaimedSpouse);
		if (sumOf > TaxDeduct) {
			MessageDialogCtrl.displayErrorDialog("ERROR", "Amount in col[6] and col[5] cannot exceed tax collected");
			ValidationUtil.ALL_FIELDS_MAP.get(s).setData(new BigDecimal(0));
			ValidationAware amntClaimedPaid = ValidationUtil.ALL_FIELDS_MAP
					.get("taxCollectedAtSourceController.type.amtTCSClaimedThisYear");
			amntClaimedPaid.setData(BigInteger.valueOf(0));

			setElementValueByTargetName("taxCollectedAtSourceController.type.amtTCSClaimedThisYear",
					BigInteger.valueOf(0));
			setElementValueByTargetName("taxCollectedAtSourceController.type.amtClaimedBySpouse",
					BigInteger.valueOf(0));
		}

	}

	
	public static void calcIntrstPayable() {
		BigInteger balTaxPay = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");

		BigInteger input234A = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234A");
		BigInteger input234B = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234B");
		BigInteger input234C = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234C");
		BigInteger input234F = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.lateFilingFee234F");

		BigInteger intrst=input234A.add(input234B).add(input234C).add(input234F);
		BigInteger totTaxIntrstPay = balTaxPay.add(intrst);

		setElementValueByTargetName("itr.itr4.taxComputation.totTaxPlusIntrstPay", totTaxIntrstPay);
		calcTaxPayable15Minus17();

	}

	public static void calcTaxPayable15Minus17() {
		
		
		String taxStatus=getElementValueByTargetName("itr.itr4.filingStatus.taxStatus");
		
		BigInteger totTaxPaid = new BigInteger("0"), totTaxIntrstPay = new BigInteger("0");
        totTaxPaid = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid");
		totTaxIntrstPay = getElementValueByTargetNameBig("itr.itr4.taxComputation.totTaxPlusIntrstPay");
		BigInteger totTaxIntrstPay1 = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");

		if (totTaxPaid.compareTo(totTaxIntrstPay) == -1 || totTaxPaid.compareTo(totTaxIntrstPay) == 0) {

			setElementValueByTargetName("itr.itr4.refund.refundDue", new BigInteger("0"));
            BigInteger taxPayable15M17 = (totTaxIntrstPay.subtract(totTaxPaid));
			setElementValueByTargetName("itr.itr4.taxPaid.balTaxPayable",
					BigInteger.valueOf(Math.round(taxPayable15M17.doubleValue() / 10) * 10));
			updateEpayTaxButtonStatus(null);
			
			String amountPayable = getElementValueByTargetNameBig("itr.itr4.taxPaid.balTaxPayable").toString();

		} else {

			BigInteger refund15M17 = totTaxPaid.subtract(totTaxIntrstPay);
			setElementValueByTargetName("itr.itr4.refund.refundDue",BigInteger.valueOf(Math.round(refund15M17.doubleValue() / 10) * 10));
            setElementValueByTargetName("itr.itr4.taxPaid.balTaxPayable", new BigInteger("0"));

            setElementValueByTargetName("itr.itr4.filingStatus.taxStatus", "TR");
		}

		BigInteger balTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxPaid.balTaxPayable");
		BigInteger refundDue = getElementValueByTargetNameBig("itr.itr4.refund.refundDue"); 

		if(balTaxPayable.compareTo(new BigInteger("0"))==1) {
			setElementValueByTargetName("itr.itr4.filingStatus.taxStatus", "TP");
		}else if(refundDue.compareTo(new BigInteger("0"))==1) {
			setElementValueByTargetName("itr.itr4.filingStatus.taxStatus", "TR");
		}else {
			setElementValueByTargetName("itr.itr4.filingStatus.taxStatus","NT");
		}
		
		updateEpayTaxButtonStatus(null);
	}
	
	
	public static void calculateTotalTax_80G(ValidationAware field) {

		
		if (field.getTarget().toString().equals("itr4_80GController1.type.eligibleDonationAmt")) {
			
			calculateTotal_don100("itr.itr4.schedule80G.don100Percent.totDon100Percent");

		}
		if (field.getTarget().equals("itr4_80GController2.type.eligibleDonationAmt")) {
			calculateTotal_don50("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd");

		}
		if (field.getTarget().equals("itr4_80GController3.type.eligibleDonationAmt")) {
			calculateTotal_don100appr("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd");

		}
		if (field.getTarget().equals("itr4_80GController.type.eligibleDonationAmt")) {

			calculateTotal_don50appr("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd");

		}

	}
	
	
	
	//CALCULATION OF TOTAL TAX OF 80G TABLE1
	
	public static void calculateTotal_don100(final String dest) {
		
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable1").getTableView().getItems();

		long total = 0;

		for (DoneeWithPan doneewithpan : list) {
			
			total = total + doneewithpan.getDonationAmt().longValue();
		}

		ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
		destination.setData(BigInteger.valueOf(total));

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don100Percent.totDon100Percent");
		
		
		point7.setData(BigInteger.valueOf(total));

		setElementValueByTargetName(dest, BigInteger.valueOf((long) (total)));

		calculateTotalDonations(ValidationUtil.ALL_FIELDS_MAP.get(dest));
	}
	
	//CALCULATION OF TOTAL TAX OF 80G TABLE2
	
	public static void calculateTotal_don50(final String dest) {
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable2").getTableView().getItems();

		long total = 0;

		for (DoneeWithPan doneewithpan : list) {
			total = total + doneewithpan.getDonationAmt().longValue();
		}

		ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
		
		destination.setData(BigInteger.valueOf(total));

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd");

		point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));

		setElementValueByTargetName(dest, BigInteger.valueOf((long) (total)));

		calculateTotalDonations(ValidationUtil.ALL_FIELDS_MAP.get(dest));
	}
	
	//CALCULATION OF TOTAL TAX OF 80G TABLE3
	public static void calculateTotal_don100appr(final String dest) {
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable3").getTableView().getItems();

		long total = 0;

		for (DoneeWithPan doneewithpan : list) {

			total = total + doneewithpan.getDonationAmt().longValue();
		}

		ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
		destination.setData(BigInteger.valueOf(total));

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd");

		point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));

		setElementValueByTargetName(dest, BigInteger.valueOf((long) (total)));

		calculateTotalDonations(ValidationUtil.ALL_FIELDS_MAP.get(dest));

	}

	//CALCULATION OF TOTAL TAX OF 80G TABLE4
	public static void calculateTotal_don50appr(final String dest) {
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80G").getTableView().getItems();
		long total = 0;

		for (DoneeWithPan doneewithpan : list) {
			total = total + doneewithpan.getDonationAmt().longValue();
		}

		ValidationAware destination = ValidationUtil.ALL_FIELDS_MAP.get(dest);
		destination.setData(BigInteger.valueOf(total));

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd");

		point7.setData(BigInteger.valueOf(roundToNearestTenthDigit(total)));

		setElementValueByTargetName(dest, BigInteger.valueOf((long) (total)));

		calculateTotalDonations(ValidationUtil.ALL_FIELDS_MAP.get(dest));

	}

	//CALCULATION OF TOTAL TAX OF ALL TABLES
	public static void calculateTotalDonations(ValidationAware field) {

		String TotalDon_100, TotalDon_50, TotalDon_100appr, TotalDon_50appr;
		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.don100Percent.totDon100Percent")
				.getData() == null) {
			
			TotalDon_100 = "0";
		} else {

			
			TotalDon_100 = getElementValueByTarget("itr.itr4.schedule80G.don100Percent.totDon100Percent").toString();

		}

		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd")
				.getData() == null) {
			TotalDon_50 = "0";
		} else {
			
			TotalDon_50 = getElementValueByTarget(
					"itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd").toString();

		}

		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd")
				.getData() == null) {
			TotalDon_100appr = "0";
		} else {
			TotalDon_100appr = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd").getData());

		}

		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd")
				.getData() == null) {
			TotalDon_50appr = "0";
		} else {
			// TotalDon_50appr =
			// String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd").getData());
			TotalDon_50appr = getElementValueByTarget(
					"itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd").toString();

		}

		
		if (TotalDon_100.isEmpty()) {
			TotalDon_100 = "0";
		}
		if (TotalDon_50.isEmpty()) {
			TotalDon_50 = "0";
		}
		if (TotalDon_100appr.isEmpty()) {
			TotalDon_100appr = "0";
		}
		if (TotalDon_50appr.isEmpty()) {
			TotalDon_50appr = "0";
		}

		Long total1 = Long.valueOf(TotalDon_100) + Long.valueOf(TotalDon_50) + Long.valueOf(TotalDon_100appr)
				+ Long.valueOf(TotalDon_50appr);
		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.totalDonationsUs80G").setData(BigInteger.valueOf(total1));
		setElementValueByTargetName("itr.itr4.schedule80G.totalDonationsUs80G", BigInteger.valueOf((total1)));
		
		try {
			GrossIncome();
			onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			sumDeductionsWithout80GG();
			check80GGAgain(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		
	}
	
//CALCULATION OF ELIGIBLE DONATION OF 80G TABLE1
	public static void calculateEligibleAmnt_don100(ValidationAware field) throws java.text.ParseException {
		String grossincome = String
				.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.grossTotIncome").getData());

		if (grossincome.isEmpty() || grossincome == "null" || Long.valueOf(grossincome) < 0) {
			grossincome = "0";
		}
		String temp = "0";
		if (field.getData() != null) {
			temp = field.getData().toString();
		}
		if ((Long.valueOf(grossincome)) < (Long.valueOf(temp))) {
			temp = grossincome;
		}
		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController1.type.eligibleDonationAmt");

		point7.setData(new BigInteger(temp));

		setElementValueByTargetName("itr4_80GController1.type.eligibleDonationAmt",
				BigInteger.valueOf(Long.valueOf(temp)));

		// --- To calculate total eligible amount of this table--
		calculateSumEligibleAmnt_don100();

		// --- To calculate total eligible amount of all tables ---
		calculateTotalEligibleDonations();

		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));

		GrossIncome();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}


	public static void calculateSumEligibleAmnt_don100() {
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable1").getTableView().getItems();

		long total = 0;

		for (DoneeWithPan doneewithpan : list) {

			total = total + doneewithpan.getEligibleDonationAmt().longValue();

		}

		
		BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		if (grossincome.toString().isEmpty() || grossincome == null
				|| grossincome.compareTo(new BigInteger("0")) == -1) {
			grossincome = new BigInteger("0");
		}

		if (grossincome.compareTo(BigInteger.valueOf(total)) == -1) {

			total = Long.valueOf(grossincome.toString());

		}

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent");

		point7.setData(BigInteger.valueOf(total));
		setElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent",
				BigInteger.valueOf(total));

	}
	
	
	
	//CALCULATION OF ELIGIBLE DONATION OF 80G TABLE2
	public static void calculateEligibleAmnt_don50(ValidationAware field)
			throws java.text.ParseException, InstantiationException, IllegalAccessException {
		String grossincome = String
				.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.grossTotIncome").getData());

		if (grossincome.isEmpty() || grossincome == "null" || Long.valueOf(grossincome) < 0) {
			grossincome = "0";
		}
		String temp = "0";
		if (field.getData() != null) {
			temp = field.getData().toString();
		}
		Long temp_don50 = Long.valueOf(temp) / 2;
		if ((Long.valueOf(grossincome)) < temp_don50) {
			temp_don50 = Long.valueOf(grossincome);
		}

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController2.type.eligibleDonationAmt");

		point7.setData(BigInteger.valueOf(temp_don50));

		setElementValueByTargetName("itr4_80GController2.type.eligibleDonationAmt", BigInteger.valueOf(temp_don50));

		// --- To calculate eligible amount of this table ---
		calculateSumEligibleAmnt_don50();

		// ---To calculate eligible amount of all the tables ---
		calculateTotalEligibleDonations();

		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
		GrossIncome();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}
	
	public static void calculateSumEligibleAmnt_don50() {
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable2").getTableView().getItems();

		long total = 0;

		for (DoneeWithPan doneewithpan : list) {

			total = total + doneewithpan.getEligibleDonationAmt().longValue();

		}


		BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		if (grossincome.toString().isEmpty() || grossincome == null
				|| grossincome.compareTo(new BigInteger("0")) == -1) {
			grossincome = new BigInteger("0");
		}

		// String temp =donationamount.toString();

		if ((grossincome.compareTo(BigInteger.valueOf(total)) == -1)) {
			total = Long.valueOf(grossincome.toString());
		}

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent");

		point7.setData(BigInteger.valueOf(total));

		setElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent",
				BigInteger.valueOf((long) (total)));

	}
	
	
	
	//CALCULATION OF ELIGIBLE DONATION OF 80G TABLE3
	
	public static long calculateEligibleAmnt_don100Appr(ValidationAware field) throws java.text.ParseException {

		String flag=getElementValueByTargetName("itr.itr4.personalInfo.status");
		String grossincome = String
				.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.grossTotIncome").getData());

		if (grossincome.isEmpty() || grossincome == "null" || Long.valueOf(grossincome) < 0) {
			grossincome = "0";
		}
		Long adjstGTI;
		Long qualifyingLimit;

		String deductionsSysTotal = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions").getData());
		String sys80G = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G").getData());
		String sys80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG").getData());
		String usr80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG").getData());
		if (deductionsSysTotal.equals("null")) {
			deductionsSysTotal = "0";
		}
		if (sys80G.equals("null")) {
			sys80G = "0";
		}
		if (sys80GG.equals("null")) {
			sys80GG = "0";
		}
		if (usr80GG.equals("null")) {
			usr80GG = "0";
		}

		
		if (Long.valueOf(grossincome) == (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G))) {

			
			adjstGTI = (long) 0;
		} else {

			if(flag.equals("F") || flag.equals("H"))
			{
				adjstGTI = Long.valueOf(grossincome) - (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G)
						- Long.valueOf("0") + Long.valueOf("0"));
			}
			else
			{
				adjstGTI = Long.valueOf(grossincome) - (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G)
						- Long.valueOf(sys80GG) + Long.valueOf(usr80GG));
			}

		}
		
		qualifyingLimit = (long) (adjstGTI * 0.10);

		if (qualifyingLimit < 0) {
			qualifyingLimit = (long) 0;
		}

		if (grossincome.isEmpty() || grossincome == "null") {
			grossincome = "0";
		}
		Long temp = (long) 0;
		if (field.getData() != null) {
			temp = Long.valueOf(field.getData().toString());
		}
		if (qualifyingLimit < temp) {
			temp = qualifyingLimit;
		}

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController3.type.eligibleDonationAmt");

		point7.setData(BigInteger.valueOf(temp));

		setElementValueByTargetName("itr4_80GController3.type.eligibleDonationAmt", BigInteger.valueOf(temp));

		// --- To calculate eligible amount of this table ---
		calculateSumEligibleAmnt_don100appr(qualifyingLimit);

		// --- To calculate eligible amount of all the tables ---
		calculateTotalEligibleDonations();

		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));

		GrossIncome();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

		return temp;

	}
	
	public static void calculateSumEligibleAmnt_don100appr(Long qualifyingLimit) {
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable3").getTableView().getItems();
		DoneeWithPan values[] = list.toArray(new DoneeWithPan[list.size()]);

		long total = 0;

		for (int i = 0; i < values.length; i++) {

			total = total + values[i].getEligibleDonationAmt().longValue();

		}

		
		BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		if (grossincome.toString().isEmpty() || grossincome == null
				|| grossincome.compareTo(new BigInteger("0")) == -1) {
			grossincome = new BigInteger("0");
		}

		// String temp =donationamount.toString();

		if ((grossincome.compareTo(BigInteger.valueOf(total)) == -1)) {
			total = Long.valueOf(grossincome.toString());
		}

		if (total > qualifyingLimit) {
			total = qualifyingLimit;
		}

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd");

		point7.setData(BigInteger.valueOf(total));

		setElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd",
				BigInteger.valueOf((long) (total)));

	}
	
	//CALCULATION OF ELIGIBLE DONATION OF 80G TABLE4
	
	public static void calculateEligibleAmnt_don50Appr(ValidationAware field) throws java.text.ParseException {
		String flag=getElementValueByTargetName("itr.itr4.personalInfo.status");
		String grossincome = String
				.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.grossTotIncome").getData());
		if (grossincome.isEmpty() || grossincome == "null" || Long.valueOf(grossincome) < 0) {
			grossincome = "0";
		}
		String totEligAmtTableC = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd").getData());
		if (totEligAmtTableC.isEmpty()) {
			totEligAmtTableC = "0";
		}
		Long adjstGTI;
		Long qualifyingLimit;
		String deductionsSysTotal = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions").getData());
		String sys80G = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G").getData());
		String sys80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG").getData());
		String usr80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG").getData());
		if (usr80GG.equals("null")) {
			deductionsSysTotal = "0";
		}
		if (usr80GG.equals("null")) {
			sys80G = "0";
		}
		if (usr80GG.equals("null")) {
			sys80GG = "0";
		}
		if (usr80GG.equals("null")) {
			usr80GG = "0";
		}
		if (Long.valueOf(grossincome) == (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G))) {
			adjstGTI = (long) 0;
		} else {
			if(flag.equals("F") || flag.equals("H"))
			{
				adjstGTI = Long.valueOf(grossincome) - (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G)
						- Long.valueOf("0") + Long.valueOf("0"));
			}
			else
			{
				adjstGTI = Long.valueOf(grossincome) - (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G)
						- Long.valueOf(sys80GG) + Long.valueOf(usr80GG));
			}
			
		}
		String temp = "0";
		if (field.getData() != null) {
			temp = field.getData().toString();
		}
		qualifyingLimit = (long) (adjstGTI * 0.10);

		if (qualifyingLimit < 0) {
			qualifyingLimit = (long) 0;
		}

		Long residue, residue50Perc;
		if (qualifyingLimit > Long.valueOf(totEligAmtTableC)) {
			residue = qualifyingLimit - Long.valueOf(totEligAmtTableC);
		} else {
			residue = (long) 0;
		}
		residue50Perc = (long) (residue * 0.50);
		Long temp_don50appr = Long.valueOf(temp) / 2;
		if (temp_don50appr > residue50Perc) {
			temp_don50appr = residue50Perc;
		}

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController.type.eligibleDonationAmt");

		point7.setData(BigInteger.valueOf(temp_don50appr));

		setElementValueByTargetName("itr4_80GController.type.eligibleDonationAmt", BigInteger.valueOf(temp_don50appr));

		// --- To calculate eligible amount of this table ---
		calculateSumEligibleAmnt_don50appr(residue50Perc);

		// --- To calculate eligible amount of all the tables ---
		calculateTotalEligibleDonations();

		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
		GrossIncome();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}
	
	
	public static void calculateSumEligibleAmnt_don50appr(Long residue50Perc) {
		List<DoneeWithPan> list = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80G").getTableView().getItems();

		long total = 0;

		for (DoneeWithPan doneewithpan : list) {

			total = total + doneewithpan.getEligibleDonationAmt().longValue();

		}

		BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		if (grossincome.toString().isEmpty() || grossincome == null
				|| grossincome.compareTo(new BigInteger("0")) == -1) {
			grossincome = new BigInteger("0");
		}

		// String temp =donationamount.toString();

		if ((grossincome.compareTo(BigInteger.valueOf(total)) == -1)) {
			total = Long.valueOf(grossincome.toString());
		}
		if (total > residue50Perc) {
			total = residue50Perc;
		}

		ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd");

		point7.setData(BigInteger.valueOf(total));
		setElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd",
				BigInteger.valueOf((long) (total)));

	}
	
	
	
//CALCULATION OF TOTAL ELIGIBLE AMOUNT OF ALL 80G TABLES
	public static void calculateTotalEligibleDonations() {
		String TotalEligibleDon_100, TotalEligibleDon_50, TotalEligibleDon_100appr, TotalEligibleDon_50appr;
		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent")
				.getData() == null) {
			TotalEligibleDon_100 = "0";
		} else {
			TotalEligibleDon_100 = ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent").getData().toString();
		}

		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent")
				.getData() == null) {
			TotalEligibleDon_50 = "0";
		} else {
			TotalEligibleDon_50 = ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent").getData().toString();
		}

		if (ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd").getData() == null) {
			TotalEligibleDon_100appr = "0";
		} else {
			TotalEligibleDon_100appr = ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd").getData()
					.toString();
		}

		if (ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd").getData() == null) {
			TotalEligibleDon_50appr = "0";
		} else {
			TotalEligibleDon_50appr = ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd").getData()
					.toString();
		}

		if (TotalEligibleDon_100.isEmpty()) {
			TotalEligibleDon_100 = "0";
		}
		if (TotalEligibleDon_50.isEmpty()) {
			TotalEligibleDon_50 = "0";
		}
		if (TotalEligibleDon_100appr.isEmpty()) {
			TotalEligibleDon_100appr = "0";
		}
		if (TotalEligibleDon_50appr.isEmpty()) {
			TotalEligibleDon_50appr = "0";
		}
		Long total1 = Long.valueOf(TotalEligibleDon_100) + Long.valueOf(TotalEligibleDon_50)
				+ Long.valueOf(TotalEligibleDon_100appr) + Long.valueOf(TotalEligibleDon_50appr);


		BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

		if (grossincome.toString().isEmpty() || grossincome == null
				|| grossincome.compareTo(new BigInteger("0")) == -1) {
			grossincome = new BigInteger("0");
		}

		// String temp =donationamount.toString();

		if ((grossincome.compareTo(BigInteger.valueOf(total1)) == -1)) {
			total1 = Long.valueOf(grossincome.toString());
		}

		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.schedule80G.totalEligibleDonationsUs80G")
				.setData(BigInteger.valueOf(total1));
		setElementValueByTargetName("itr.itr4.schedule80G.totalEligibleDonationsUs80G", BigInteger.valueOf((total1)));

	}
	
	
	//FUNCTIONS:changeoftable1,2,3,4 FOR REFRESHING VALUES IN TABLES
	
	public static void changeoftable1() throws java.text.ParseException {
		List<DoneeWithPan> list2 = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable1").getTableView().getItems();
		DoneeWithPan values[] = list2.toArray(new DoneeWithPan[list2.size()]);

		for (int i = 0; i < values.length; i++) {
			BigInteger donationamount = values[i].getDonationAmt();

			// String grossincome =
			// String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.grossTotIncome").getData());

			BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

			if (grossincome.toString().isEmpty() || grossincome == null
					|| grossincome.compareTo(new BigInteger("0")) == -1) {
				grossincome = new BigInteger("0");
			}

			// String temp =donationamount.toString();

			if ((grossincome.compareTo(donationamount) == -1)) {
				donationamount = grossincome;
			}
			ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController1.type.eligibleDonationAmt");

			point7.setData(donationamount);

			// setElementValueByTargetName("itr1_80GController1.type.eligibleDonationAmt",
			// donationamount);

			// setElementValueByTargetName("itr1_80GController1.type.eligibleDonationAmt",
			// BigInteger.valueOf(temp));
			values[i].setEligibleDonationAmt(donationamount);
			DataTransporter.updat(Form.getForm());

			// --- To calculate total eligible amount of this table--
			calculateSumEligibleAmnt_don100();

			// --- To calculate total eligible amount of all tables ---
			calculateTotalEligibleDonations();
			// setElementValueByTargetName("itr.itr1.schedule80G.don100Percent.totEligibleDon100Percent",
			// BigInteger.valueOf(Long.valueOf(temp)));
			GrossIncome();
			onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			sumDeductionsWithout80GG();
			check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();

		}
	}

	public static void changeoftable2() throws java.text.ParseException {
		List<DoneeWithPan> list2 = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable2").getTableView().getItems();
		DoneeWithPan values[] = list2.toArray(new DoneeWithPan[list2.size()]);

		for (int i = 0; i < values.length; i++) {
			BigInteger donationamount = values[i].getDonationAmt();

		

			BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

			if (grossincome.toString().isEmpty() || grossincome == null
					|| grossincome.compareTo(new BigInteger("0")) == -1) {
				grossincome = new BigInteger("0");
			}

			String temp = donationamount.toString();

			Long temp_don50 = Long.valueOf(temp) / 2;
			if ((Long.valueOf(grossincome.toString())) < temp_don50) {
				temp_don50 = Long.valueOf(grossincome.toString());
			}

			ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController2.type.eligibleDonationAmt");

			point7.setData(BigInteger.valueOf(temp_don50));

			setElementValueByTargetName("itr4_80GController2.type.eligibleDonationAmt", BigInteger.valueOf(temp_don50));

			values[i].setEligibleDonationAmt(BigInteger.valueOf(temp_don50));
			DataTransporter.updat(Form.getForm());

			// --- To calculate eligible amount of this table ---
			calculateSumEligibleAmnt_don50();

			// ---To calculate eligible amount of all the tables ---
			calculateTotalEligibleDonations();

			GrossIncome();
			onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			sumDeductionsWithout80GG();
			check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();

		}
	}

	public static void changeoftable3() throws java.text.ParseException {
		String flag=getElementValueByTargetName("itr.itr4.personalInfo.status");
		List<DoneeWithPan> list2 = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable3").getTableView().getItems();
		DoneeWithPan values[] = list2.toArray(new DoneeWithPan[list2.size()]);

		for (int i = 0; i < values.length; i++) {
			BigInteger donationamount = values[i].getDonationAmt();
			// ValidationUtil.ALL_FIELDS_MAP.get("itr1_80GController3.type.donationAmt["
			// + i + "]");
			ValidationAware donation = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController3.type.donationAmt");
			donation.setData(donationamount);
			

			BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

			if (grossincome.toString().isEmpty() || grossincome == null
					|| grossincome.compareTo(new BigInteger("0")) == -1) {
				grossincome = new BigInteger("0");
			}

			Long adjstGTI;
			Long qualifyingLimit;

			String deductionsSysTotal = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions").getData());
			String sys80G = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G").getData());
			String sys80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG").getData());
			String usr80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG").getData());
			if (deductionsSysTotal.equals("null")) {
				deductionsSysTotal = "0";
			}
			if (sys80G.equals("null")) {
				sys80G = "0";
			}
			if (sys80GG.equals("null")) {
				sys80GG = "0";
			}
			if (usr80GG.equals("null")) {
				usr80GG = "0";
			}

			if (Long.valueOf(grossincome.toString()) == (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G))) {

				adjstGTI = (long) 0;
			} else {

				if(flag.equals("F") || flag.equals("H"))
				{
					adjstGTI = Long.valueOf(grossincome.toString()) - (Long.valueOf(deductionsSysTotal)
							- Long.valueOf(sys80G) - Long.valueOf("0") + Long.valueOf("0"));
				}
				else
				{
					adjstGTI = Long.valueOf(grossincome.toString()) - (Long.valueOf(deductionsSysTotal)
							- Long.valueOf(sys80G) - Long.valueOf(sys80GG) + Long.valueOf(usr80GG));
				}
				

			}
			qualifyingLimit = (long) (adjstGTI * 0.10);

			if (qualifyingLimit < 0) {
				qualifyingLimit = (long) 0;
			}

			if (grossincome.toString().isEmpty() || grossincome == null) {
				grossincome = new BigInteger("0");
			}
			Long temp = donationamount.longValue();

			if (qualifyingLimit < temp) {
				temp = qualifyingLimit;
			}

			ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController3.type.eligibleDonationAmt");

			point7.setData(BigInteger.valueOf(temp));

			setElementValueByTargetName("itr4_80GController3.type.eligibleDonationAmt", BigInteger.valueOf(temp));
			values[i].setEligibleDonationAmt(BigInteger.valueOf(temp));
			DataTransporter.updat(Form.getForm());

			// --- To calculate eligible amount of this table ---
			calculateSumEligibleAmnt_don100appr(qualifyingLimit);

			// --- To calculate eligible amount of all the tables ---
			calculateTotalEligibleDonations();

			GrossIncome();
			onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			sumDeductionsWithout80GG();
			check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();

		}
	}

	public static void changeoftable4() throws java.text.ParseException {
		String flag=getElementValueByTargetName("itr.itr4.personalInfo.status");
		List<DoneeWithPan> list2 = (List<DoneeWithPan>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80G").getTableView().getItems();
		DoneeWithPan values[] = list2.toArray(new DoneeWithPan[list2.size()]);

		for (int i = 0; i < values.length; i++) {
			BigInteger donationamount = values[i].getDonationAmt();

			BigInteger grossincome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

			if (grossincome.toString().isEmpty() || grossincome == null
					|| grossincome.compareTo(new BigInteger("0")) == -1) {
				grossincome = new BigInteger("0");
			}

			String temp = donationamount.toString();
			String totEligAmtTableC = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd").getData());
			if (totEligAmtTableC.isEmpty()) {
				totEligAmtTableC = "0";
			}
			Long adjstGTI;
			Long qualifyingLimit;
			String deductionsSysTotal = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions").getData());
			String sys80G = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G").getData());
			String sys80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG").getData());
			String usr80GG = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG").getData());
			if (usr80GG.equals("null")) {
				deductionsSysTotal = "0";
			}
			if (usr80GG.equals("null")) {
				sys80G = "0";
			}
			if (usr80GG.equals("null")) {
				sys80GG = "0";
			}
			if (usr80GG.equals("null")) {
				usr80GG = "0";
			}
			if (Long.valueOf(grossincome.toString()) == (Long.valueOf(deductionsSysTotal) - Long.valueOf(sys80G))) {
				adjstGTI = (long) 0;
			} else {
				
				if(flag.equals("F") || flag.equals("H"))
				{
					adjstGTI = Long.valueOf(grossincome.toString()) - (Long.valueOf(deductionsSysTotal)
							- Long.valueOf(sys80G) - Long.valueOf("0") + Long.valueOf("0"));
				}
				else
				{
					adjstGTI = Long.valueOf(grossincome.toString()) - (Long.valueOf(deductionsSysTotal)
							- Long.valueOf(sys80G) - Long.valueOf(sys80GG) + Long.valueOf(usr80GG));
				}
				
			}
			qualifyingLimit = (long) (adjstGTI * 0.10);

			if (qualifyingLimit < 0) {
				qualifyingLimit = (long) 0;
			}

			Long residue, residue50Perc;
			if (qualifyingLimit > Long.valueOf(totEligAmtTableC)) {
				residue = qualifyingLimit - Long.valueOf(totEligAmtTableC);
			} else {
				residue = (long) 0;
			}
			residue50Perc = (long) (residue * 0.50);
			Long temp_don50appr = Long.valueOf(temp) / 2;
			if (temp_don50appr > residue50Perc) {
				temp_don50appr = residue50Perc;
			}

			ValidationAware point7 = ValidationUtil.ALL_FIELDS_MAP.get("itr4_80GController.type.eligibleDonationAmt");

			point7.setData(BigInteger.valueOf(temp_don50appr));

			setElementValueByTargetName("itr4_80GController.type.eligibleDonationAmt",
					BigInteger.valueOf(temp_don50appr));

			values[i].setEligibleDonationAmt(BigInteger.valueOf(temp_don50appr));
			DataTransporter.updat(Form.getForm());

			// --- To calculate eligible amount of this table ---
			calculateSumEligibleAmnt_don50appr(residue50Perc);

			// --- To calculate eligible amount of all the tables ---
			calculateTotalEligibleDonations();

			GrossIncome();
			onChangeSection80G_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			sumDeductionsWithout80GG();
			check80GGAgain(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();

		}
	}
	
	
	
	
	public static void deemedIncomeCalc(ValidationAware field) throws java.text.ParseException {
		
		
		
	/*	List<Us44AeHeavy> list2 = (List<Us44AeHeavy>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.Us44AeHeavyTable").getTableView().getItems();
		Us44AeHeavy values[] = list2.toArray(new Us44AeHeavy[list2.size()]);*/

		
		
		    BigInteger deemedIncome;
		    BigInteger holdingPeriod=getElementValueByTargetNameBig("us44AeHeavyController.type.incomePerVehicle");
			BigInteger incomePerVeh=getElementValueByTargetNameBig("us44AeHeavyController.type.holdingPeriod");
			deemedIncome=holdingPeriod.multiply(incomePerVeh);
			setElementValueByTargetName("us44AeHeavyController.type.deemedInc", deemedIncome);
			setElementValueByTargetName("itr.itr4.us44AeHeavy.deemedInc", deemedIncome);
		
			totaldeemedIncomeCalc();
	}
	
	public static void totaldeemedIncomeCalc() throws java.text.ParseException {
		
		
		int count=0;
		long total = 0;
		List<Us44AeHeavy> list2 = (List<Us44AeHeavy>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.Us44AeHeavyTable").getTableView().getItems();
		//Us44AeHeavy values[] = list2.toArray(new Us44AeHeavy[list2.size()]);
		
		for (Us44AeHeavy us44AeHeavy : list2) {
			
			total = total + us44AeHeavy.getDeemedInc().longValue();
			count++;
		}
		
		if(total == 0)
		{
		setElementValueByTargetName("itr.itr4.totalHeavyVehcl", null);
		setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE", null);
		}
		else
		{
			
			setElementValueByTargetName("itr.itr4.totalHeavyVehcl", BigInteger.valueOf(total));
			setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE", BigInteger.valueOf(total));
		}
		
		presumptiveIncmeFirmCalc(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm"));
		
	}
	
	
	public static String getElementValueByTargetName(final String target) {
		String Data = null;
		if (ValidationUtil.ALL_FIELDS_MAP.containsKey(target)) {
			if (ValidationUtil.ALL_FIELDS_MAP.get(target).getData() == null) {
				Data = "empty";
			} else {
				Data = ValidationUtil.ALL_FIELDS_MAP.get(target).getData().toString();

			}
		}
		return Data;
	}

	public static boolean checkFirstDateBefore(Date firstDate, Date secondDate) {

		if (firstDate == null || secondDate == null) {
			return false;
		} else {
			Calendar cal = Calendar.getInstance();
			cal.setTime(firstDate);
			Calendar cal1 = Calendar.getInstance();
			cal1.setTime(secondDate);

			if (cal.get(Calendar.YEAR) < cal1.get(Calendar.YEAR)) {
				return true;
			} else if (cal.get(Calendar.YEAR) == cal1.get(Calendar.YEAR)) {
				if (cal.get(Calendar.MONTH) < cal1.get(Calendar.MONTH)) {
					int k = cal.get(Calendar.MONTH);
					return true;
				} else if (cal.get(Calendar.MONTH) == cal1.get(Calendar.MONTH)) {
					if (cal.get(Calendar.DAY_OF_MONTH) < cal1.get(Calendar.DAY_OF_MONTH)) {
						int k1 = cal.get(Calendar.MONTH);
						return true;

					} else if (cal.get(Calendar.DAY_OF_MONTH) == cal1.get(Calendar.DAY_OF_MONTH)) {
						int k1 = cal.get(Calendar.MONTH);
						return true;
					} else {
						return false;
					}
				} else {
					return false;

				}
			} else {
				return false;

			}
		}

	}
	public static int calcNoOfMonths(Date currentDate, Date startDate) {
		if (currentDate == null || startDate == null) {
			return 0;
		} else {
			int noOfMonths = 0;

			Calendar cal = Calendar.getInstance();
			cal.setTime(currentDate);
			Calendar cal1 = Calendar.getInstance();
			cal1.setTime(startDate);

			if ((cal.get(Calendar.YEAR) == cal1.get(Calendar.YEAR))
					&& (cal.get(Calendar.MONTH) == cal1.get(Calendar.MONTH))
					&& (cal.get(Calendar.DAY_OF_MONTH) == cal1.get(Calendar.DAY_OF_MONTH))) {
				noOfMonths = 1;
			} else if (checkFirstDateBefore(currentDate, startDate)) {

				noOfMonths = 0;

			} else {
				if (cal.get(Calendar.YEAR) == (cal1.get(Calendar.YEAR) + 1)) {
					if (cal.get(Calendar.MONTH) < cal1.get(Calendar.MONTH)) {
						noOfMonths = 12 - (cal1.get(Calendar.MONTH) - cal.get(Calendar.MONTH)) + 1;
					} else {
						noOfMonths = 12 + (cal.get(Calendar.MONTH) - cal1.get(Calendar.MONTH)) + 1;

					}
				} else if (cal.get(Calendar.YEAR) == cal1.get(Calendar.YEAR)) {
					noOfMonths = cal.get(Calendar.MONTH) - cal1.get(Calendar.MONTH) + 1;
				} else {
					if (cal.get(Calendar.MONTH) < cal1.get(Calendar.MONTH)) {
						noOfMonths = ((cal.get(Calendar.YEAR) - cal1.get(Calendar.YEAR) - 1) * 12) + 12
								- cal1.get(Calendar.MONTH) + cal.get(Calendar.MONTH) + 1;
					} else if (cal.get(Calendar.MONTH) > cal1.get(Calendar.MONTH)) {
						noOfMonths = ((cal.get(Calendar.YEAR) - cal1.get(Calendar.YEAR)) * 12) + cal.get(Calendar.MONTH)
								- cal1.get(Calendar.MONTH) + 1;

					} else {
						noOfMonths = ((cal.get(Calendar.YEAR) - cal1.get(Calendar.YEAR)) * 12) + 1;

					}

				}
			}

			return noOfMonths;
		}
	}

	
	
	public static void presumptiveIncmeCalc(ValidationAware field) throws java.text.ParseException {
		
		/*if(field.getData() == null)
		{
			setElementValueByTargetName(field.getTarget(), new BigInteger("0"));
		}*/
		BigInteger total;
		BigInteger persumptiveInc6Per=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD6Per");
		BigInteger persumptiveInc8Per=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD8Per");
		
		total=persumptiveInc6Per.add(persumptiveInc8Per);
		
		if(total.compareTo(new BigInteger("0"))== 0)
			{
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD", null);
			}
			else
			{
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD", total);
			}
		presumptiveTotal();
		
	}
	
	
	public static void onChangePersonalStatus(ValidationAware field) throws java.text.ParseException {
		
		
		if(field!=null)
		{
			if(field.getData().equals("P"))
			{
				field.setData("I");
				setElementValueByTargetName("itr.itr4.personalInfo.status", "I");
			}
			ValidationAware interestField = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm");
			
            if(field.getData()!=null && field.getData().toString().equalsIgnoreCase("F"))
			{
            	
            	interestField.setDisable(false);
            	
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.firstName").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.middleName").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarCardNo").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarEnrolmentId").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(true);
				
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.taxComputation.section89").setDisable(true);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.salary").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.alwnsNotExempt").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.perquisitesValue").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.profitsInSalary").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.deductionUs16").setDisable(true);
				
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.salary", new BigInteger("0"));
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.alwnsNotExempt", new BigInteger("0"));
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.perquisitesValue", new BigInteger("0"));
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.profitsInSalary",new BigInteger("0"));
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductionUs16",new BigInteger("0"));
				
				setElementValueByTargetName("itr.itr4.personalInfo.assesseeName.firstName", null);
				setElementValueByTargetName("itr.itr4.personalInfo.assesseeName.middleName", null);
				setElementValueByTargetName("itr.itr4.personalInfo.aadhaarCardNo", null);
				setElementValueByTargetName("itr.itr4.personalInfo.aadhaarEnrolmentId",null);
				
				LOG.info("345345345::"+getElementValueByTargetName("taxDetailsTabController.type.incChrgSal"));
				
				List<TDSonSalary> list = (List<TDSonSalary>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmSal").getTableView().getItems();

				
				if (list != null || !list.isEmpty()) {
						
					for(TDSonSalary td:list)
					{
						td.setEmployerOrDeductorOrCollectDetl(null);
						td.setIncChrgSal(null);
						td.setTotalTDSSal(null);
					}
					setElementValueByTargetName("itr.itr4.tdSonSalaries.totalTDSonSalaries",null);
					list.clear();
				}
				
				
				
				
				
				
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.employerOrDeductorOrCollectDetl.tan").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.incChrgSal").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.totalTDSSal").setDisable(true);
				
				
				
				
				

				if(field.getData().toString().equals("F"))
				{
					String resi=getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
					
					 ValidationAware subSector = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.residentialStatus");
				     subSector.setTarget("itr.itr4.filingStatus.residentialStatusfirm");
				     
				    
				     if(resi != null || !resi.equals("") )
				     {
				    	 
				    	 if(resi.equals("empty"))
				    	 {
				    		 
				    		 setElementValueByTargetName("itr.itr4.filingStatus.residentialStatus", "-1");
				    	 }
				    	 else
				    	 {
				    		 
				    	if(resi.equals("NOR"))
				    	{
				    		 setElementValueByTargetName("itr.itr4.filingStatus.residentialStatus", "-1");
					    	 setElementValueByTargetName("itr.itr4.filingStatus.residentialStatusfirm", "-1");
				    	}
				    	else
				    	{
				    		 setElementValueByTargetName("itr.itr4.filingStatus.residentialStatus", resi);
					    	 setElementValueByTargetName("itr.itr4.filingStatus.residentialStatusfirm", resi);
				    	}
				    	 }
				     }
				     else
				     {
				    	 
				    	 setElementValueByTargetName("itr.itr4.filingStatus.residentialStatus", null);
				    	 setElementValueByTargetName("itr.itr4.filingStatus.residentialStatusfirm", null);
				     }
				    	 
				     
				     
				}
				
				
				setElementValueByTargetName("itr.itr4.scheduleAL.immovableFlag", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.jewelleryBullionEtc", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.archCollDrawPaintSulpArt", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.depositsInBank", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.sharesAndSecurities", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.insurancePolicies", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.loansAndAdvancesGiven", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.cashInHand", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.insurancePolicies", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.interstAOPFlag", null);
				setElementValueByTargetName("itr.itr4.scheduleAL.liabilityInRelatAssets", null);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.immovableFlag").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.jewelleryBullionEtc").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.archCollDrawPaintSulpArt").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts").setDisable(true);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.depositsInBank").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.sharesAndSecurities").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.insurancePolicies").setDisable(true);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.loansAndAdvancesGiven").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.cashInHand").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.insurancePolicies").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.liabilityInRelatAssets").setDisable(true);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.interstAOPFlag").setDisable(true);
				
				List<ImmovableDetails> list1a = (List<ImmovableDetails>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.ImmovableDetails_Table").getTableView().getItems();
				
				if(!list1a.isEmpty())
				{
					list1a.clear();
				}
				
				List<InterestHeldInaAsset> listAOP = (List<InterestHeldInaAsset>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.AOP_Table").getTableView().getItems();
				if(!listAOP.isEmpty())
				{
					listAOP.clear();
				}
				
				
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.nameOfFirm").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceNo").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.residenceName").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.roadOrStreet").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.localityOrArea").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.cityOrTownOrDistrict").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.stateCode").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.countryCode").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.addressAL.pinCode").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.panOfFirm").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("aopController.type.assesseInvestment").setDisable(true);
				
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.description").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceNo").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.residenceName").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.roadOrStreet").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.localityOrArea").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.cityOrTownOrDistrict").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.stateCode").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.countryCode").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.addressAL.pinCode").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("immovableDetailsController.type.amount").setDisable(true);
			}
			else
			{
				
				String resi=getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
				
				ValidationAware subSector = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.residentialStatus");
				subSector.setTarget("itr.itr4.filingStatus.residentialStatus");
				
				if(resi != null && !resi.equals("") && !resi.equals("empty"))
				{
					
					setElementValueByTargetName("itr.itr4.filingStatus.residentialStatus", resi);
				}
				else
				{
					
					setElementValueByTargetName("itr.itr4.filingStatus.residentialStatus", "-1");
				}
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm", null);
				interestField.setDisable(true);
				interestField.setData(null);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.salary").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.alwnsNotExempt").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.perquisitesValue").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.profitsInSalary").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.deductionUs16").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.firstName").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.middleName").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarCardNo").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarEnrolmentId").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.employerOrDeductorOrCollectDetl.tan").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.employerOrDeductorOrCollectDetl.employerOrDeductorOrCollecterName").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.incChrgSal").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.totalTDSSal").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.taxComputation.section89").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(false);
				
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.immovableFlag").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.jewelleryBullionEtc").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.archCollDrawPaintSulpArt").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts").setDisable(false);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.depositsInBank").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.sharesAndSecurities").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.insurancePolicies").setDisable(false);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.loansAndAdvancesGiven").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.cashInHand").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.movableAsset.insurancePolicies").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.liabilityInRelatAssets").setDisable(false);
				
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.interstAOPFlag").setDisable(false);
				
				
				
				
			}
            
            if(field.getData().toString().equalsIgnoreCase("H") || field.getData().toString().equalsIgnoreCase("F"))
            {
            	
            	ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.portugeseCC5A").setDisable(true);
            	ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.panOfSpouse").setData(null);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.panOfSpouse").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarCardNo").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarEnrolmentId").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure").setDisable(true);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp").setDisable(true);

				setElementValueByTargetName("itr.itr4.personalInfo.aadhaarCardNo", null);
				setElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A", null);
				setElementValueByTargetName("itr.itr4.personalInfo.aadhaarEnrolmentId",null);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType").setDisable(true);
	    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U",new BigInteger("0"));
	    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U").setDisable(true);
	    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",new BigInteger("0"));
            }
            else
            {
            	
            	ValidationAware panOfSpouse = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.panOfSpouse");
            	
				String pro=getElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A");
				if(pro.equals("empty") || pro.equals(""))
				{
					setElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A","N");
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.portugeseCC5A").setDisable(false);
				}
				else if(pro.equals("Y"))
				{
					setElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A","Y");
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.portugeseCC5A").setDisable(false);
					panOfSpouse.setDisable(false);
				}
				else
				{
					setElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A","N");
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.portugeseCC5A").setDisable(false);
					panOfSpouse.setDisable(true);
				}
            	ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.healthInsurancePremium").setDisable(false);
            	ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.medicalExpenditure").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.preventiveHealthCheckUp").setDisable(false);

            	ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType").setDisable(false);
            	ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarCardNo").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.aadhaarEnrolmentId").setDisable(false);
            }
			
		}
		else
		{
			setElementValueByTargetName("itr.itr4.personalInfo.status", "-1");
		}
		String residential=getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");
    	if(residential.equals("NRI") && field.getData().equals("H"))
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",new BigInteger("0"));
    		
    	}
    	else if(residential.equals("NRI") && field.getData().equals("I"))
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80UUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",new BigInteger("0"));
    	}
    	else if(field.getData().equals("F"))
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("0"));
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",new BigInteger("0"));
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(true);
    		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",new BigInteger("0"));
    	}
    	else
    	{
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDUsrType").setDisable(false);
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD").setDisable(false);
    		
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDBUsrType").setDisable(false);
    		ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB").setDisable(false);
    		
    	}
		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		
		calculateGrossTotal(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.salary"));
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}
	
	public static void presumptiveIncmeFirmCalc(ValidationAware field) throws java.text.ParseException {
		
		BigInteger presumptiveIncmeFirmCalc=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm");
		if(presumptiveIncmeFirmCalc == null)
		{
			presumptiveIncmeFirmCalc=new BigInteger("0");
		}
		
		    BigInteger temp;
			BigInteger value_44AE=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE");
	    	  temp=value_44AE.subtract(presumptiveIncmeFirmCalc);
	    	  
	    	  if(temp.compareTo(new BigInteger("0"))==-1)
	    	  {
	    		  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totalPersumptiveInc", new BigInteger("0"));
	    	  }
	    	  if(temp.compareTo(new BigInteger("0")) == 0)
	    	  {
	    		  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totalPersumptiveInc", null);
	    	  }
	    	  else if(temp.compareTo(new BigInteger("0")) !=-1)
	    	  {
	    		  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totalPersumptiveInc", temp); 
	    	  }
	    	  
	    	  presumptiveTotal();
		
	}
	
	public static void presumptive_Total(ValidationAware field) throws java.text.ParseException {
		
		/*if(field.getData() ==  null)
		{
			setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
		}*/
		
		
		presumptiveTotal();
	}
	

  
	public static void onChangeAmntClaimed(ValidationAware field) throws java.text.ParseException {
		BigInteger AmntClaimed = null;
		if (field.getData() != null) {
			AmntClaimed = new BigInteger(field.getData().toString());

		} else {
			AmntClaimed = new BigInteger("0");
		}

		/*BigInteger TaxDeduct = getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands");
		BigInteger TaxDed = getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS");
		BigInteger Taxcredit = getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands");
		BigInteger TaxDed = getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS");
		BigInteger sum=TaxDeduct.add(TaxDed);
		
		
		if (AmntClaimed.compareTo(sum)== 1) {
			MessageDialogCtrl.displayInfoDialog("ERROR",
					"Amount in field col(8) cannot be more than sum of field col.(6) and TDS at col.(7).");
			field.setData(null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands", new BigInteger("0"));
		}*/

		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}
	public static void onChangeAmntClaimed_QC(ValidationAware field) throws java.text.ParseException {
		BigInteger AmntClaimed = null;
		if (field.getData() != null) {
			AmntClaimed = new BigInteger(field.getData().toString());

		} else {
			AmntClaimed = new BigInteger("0");
		}

		
		/*BigInteger TaxDeduct = getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands");
		BigInteger TaxDed = getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS");
		
		BigInteger sum=TaxDeduct.add(TaxDed);
		
		if (AmntClaimed.compareTo(sum)== 1) {
			MessageDialogCtrl.displayInfoDialog("ERROR",
					"Amount in field col(8) cannot be more than sum of field col.(6) and TDS at col.(7).");
			field.setData(null);
			setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands", new BigInteger("0"));
		}*/

		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	}
/*public static void checkAmountrcptDtls26AS(ValidationAware field) throws java.text.ParseException {
		
	  if(field.getData() !=null)
	  {
		 BigInteger totTDSOnAmtPaid=getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.totTDSOnAmtPaid");
		 BigInteger temp=totTDSOnAmtPaid.multiply(new BigInteger("2"));
		 BigInteger amountrcptDtls26AS=new BigInteger(field.getData().toString());
		 
		 if(amountrcptDtls26AS.compareTo(temp)==-1)
            {
			 MessageDialogCtrl.displayInfoDialog("ERROR",
						"Details of Receipt as mentioned in Form 26AS should not be less than twice of the amount of tax deducted.");
			 
			 setElementValueByTargetName("taxDeductedFrmIncomeController.type.rcptDtls26AS", null);
              }
	  }
		
}*/
	public static void presumptiveTotal() throws java.text.ParseException {
		
	           
		        BigInteger total;
		        BigInteger value_E2c=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD");
				BigInteger value_E4=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA");
				BigInteger value_E7=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AE.totalPersumptiveInc");
				
				total=value_E2c.add(value_E4).add(value_E7);
				
				if(total.compareTo(new BigInteger("0"))==0)
				{
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf", null);
					setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.incChargeableUnderBus", null);
				}
				else if(total.compareTo(new BigInteger("0")) !=-1)
				{
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf", total);
				setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.incChargeableUnderBus", total);
				}
				else if(total.compareTo(new BigInteger("0")) ==-1)
				{
					setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf", new BigInteger("0"));
					setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.incChargeableUnderBus",  new BigInteger("0"));
				}
				GrossIncome();
				onChangeSection80C_User(
						ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
				onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
						.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
				onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
						.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
				onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
						.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
				onChangeSection80E_User(
						ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
				onChangeSection80EE_User(
						ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
				onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
						.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
				checkSum80C80CCC();
				onChangeSection80G_User(
						ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
				sumUserEntrdDed();
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
						new BigInteger("0"));
				sumDeductionsWithout80GG();
				check80GGAgain(
						ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
				sumDeductions();
		
	}
	

	public static long calcVirtualTaxPayableOnTI() throws java.text.ParseException{
		 
		
		 BigInteger totInc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncome");
		 BigInteger taxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.totalTaxPayable");
		 BigInteger presInc44AD = getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD");
		 BigInteger salInt = getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm"); 
		 BigInteger totPersumInc44AE =getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE"); 
		 BigInteger presInc44ADA = getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA"); 

		 Date dob_status = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
			if (dob_status == null) {
				Calendar cal_status = Calendar.getInstance();
				cal_status.set(Calendar.HOUR_OF_DAY, 0);
				cal_status.set(Calendar.MINUTE, 0);
				cal_status.set(Calendar.SECOND, 0);
				cal_status.set(Calendar.MILLISECOND, 0);

				dob_status = cal_status.getTime();
			}
			int years_status = 0;
			int months_status = 0;
			int days_status = 0;

			
			// create calendar object for birth day
			Calendar birthDay_status = Calendar.getInstance();
			birthDay_status.setTimeInMillis(dob_status.getTime());

			// create calendar object for current day
			long currentTime_status = System.currentTimeMillis();
			Calendar now_status = Calendar.getInstance();
			now_status.setTimeInMillis(currentTime_status);

			// Get difference between years
			years_status = now_status.get(Calendar.YEAR) - birthDay_status.get(Calendar.YEAR);
			int currMonth_status = now_status.get(Calendar.MONTH) + 1;
			int birthMonth_status = birthDay_status.get(Calendar.MONTH) + 1;

			// Get difference between months
			months_status = currMonth_status - birthMonth_status;

			// if month difference is in negative then reduce years by one and
			// calculate the number of months.
			if (months_status < 0) {
				//years_status--;
				months_status = 12 - birthMonth_status + currMonth_status;
				if (now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE))
					months_status--;
			} else if (months_status == 0 && now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE)) {
				//years_status--;
				months_status = 11;
			}
			// Calculate the days
			if (now_status.get(Calendar.DATE) > birthDay_status.get(Calendar.DATE))
				days_status = now_status.get(Calendar.DATE) - birthDay_status.get(Calendar.DATE);
			else if (now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE)) {
				int today = now_status.get(Calendar.DAY_OF_MONTH);
				now_status.add(Calendar.MONTH, -1);
				days_status = now_status.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay_status.get(Calendar.DAY_OF_MONTH) + today;
			} else {
				days_status = 0;
				if (months_status == 12) {
					years_status++;
					months_status = 0;
				}
			}
			
			SimpleDateFormat form1_status = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
			Date date1_status = form1_status.parse(dob_status.toString());
			SimpleDateFormat form_status = new SimpleDateFormat("dd/MM/yyyy");

			String str_status = form_status.format(date1_status);

			Date date2_status = form_status.parse(str_status);
			
			Calendar calc_status = Calendar.getInstance();
			calc_status.setTime(date1_status);
			int month_status = calc_status.get(Calendar.MONTH);
			int date_status = calc_status.get(Calendar.DAY_OF_MONTH);
			if (month_status + 1 > 4) {
				years_status = years_status - 1;

			}

			else if ((month_status + 1 == 4) && (date_status > 1)) {
				years_status = years_status - 1;
			}	
			
			
		 //String gender = getElementValueByTargetName("itr.itr4.personalInfo.gender");

		 String resStatus=getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus");

			long virtualTotInc=0;
			
			if(resStatus.equals("RES") || resStatus.equals("NOR")){
				
				virtualTotInc = totInc.longValue()- presInc44AD.longValue()- presInc44ADA.longValue();
			}else{
				virtualTotInc = totInc.longValue();
			}
			
			
		  long virtualTaxPayable=0;
			String status = getElementValueByTargetName("itr.itr4.personalInfo.status");
			if((status.equalsIgnoreCase("I")) && (resStatus.equals("RES") || resStatus.equals("NOR")) && (years_status>59 &&   years_status<= 79)){
				
				if ( virtualTotInc <= 300000){
					
					virtualTaxPayable = 0;
				} else {
					
					if((virtualTotInc >= 300001 && virtualTotInc <= 500000)){
						long temp = (long) ((virtualTotInc - 300000)*0.05);
						virtualTaxPayable = temp;
					} else if(virtualTotInc >= 500001 && virtualTotInc <= 1000000) {
						long temp = (long) ((virtualTotInc - 500000) * 0.20);
						virtualTaxPayable = temp+10000;
					} else if(virtualTotInc >= 1000001) {
						long temp = (long) ((virtualTotInc - 1000000) * 0.30);
						virtualTaxPayable = temp + 110000;
					}
				}
			} else if((status.equals("I")) && (resStatus.equals("RES") || resStatus.equals("NOR")) &&  years_status > 79){
				
				if (virtualTotInc <= 500000){
					
					virtualTaxPayable = 0;
				} else {
					
					if(virtualTotInc >= 500001 && virtualTotInc <= 1000000){
						long temp = (long) ((virtualTotInc - 500000) * 0.20);
						virtualTaxPayable =temp;
					}
					else if(virtualTotInc>= 1000001) {
						long temp = (long) ((virtualTotInc - 1000000) * 0.30);
						virtualTaxPayable = temp + 100000;
					}
				}
			}
			
			else{
				if((status.equals("F")) && (resStatus.equals("RES") || resStatus.equals("NRI"))){
					
					long temp =(long) (virtualTotInc*0.30);
					virtualTaxPayable =temp;
				}
				else
				
				if (virtualTotInc <= 250000){
					
					virtualTaxPayable = 0;
				} else {
					
					if(virtualTotInc >= 250001 && virtualTotInc <= 500000){
						long temp = (long) ((virtualTotInc - 250000) * 0.05);
						virtualTaxPayable = temp;  
					} else if(virtualTotInc >=500001 && virtualTotInc <= 1000000) {
						long temp = (long) ((virtualTotInc - 500000) * 0.20);
						virtualTaxPayable = temp +12500; 
					} else if(virtualTotInc >= 1000001) {
						long temp = (long) ((virtualTotInc -1000000) * 0.30);
						virtualTaxPayable = temp +112500;
					}
				}
				
			}
			BigInteger rebate87A = getElementValueByTargetNameBig("itr.itr4.taxComputation.rebate87A");
			BigInteger surcharge = getElementValueByTargetNameBig("itr.itr4.taxComputation.surchargeOnAboveCrore");
			long surChargeFor44AD;
			if(totInc.longValue() != 0)
			{
			surChargeFor44AD = (surcharge.longValue() * virtualTotInc)/totInc.longValue();
			}
			else
			{
				surChargeFor44AD = (surcharge.longValue() * virtualTotInc);	
			}
			
			long virtualEduCess= (long) (((virtualTaxPayable)-(rebate87A.longValue()) + surChargeFor44AD )* 0.03);
			
			long virtualTotalTaxWithEduCess = virtualTaxPayable + surChargeFor44AD + virtualEduCess-rebate87A.longValue();
			
			BigInteger sec89 = getElementValueByTargetNameBig("itr.itr4.taxComputation.section89");
			
			long virtualBalTaxPayable = virtualTotalTaxWithEduCess-sec89.longValue();

			
			if(virtualBalTaxPayable < 0) {
				virtualBalTaxPayable = 0;
			}
			
			return virtualBalTaxPayable;
			}
		
	public static void onChangeVerification(ValidationAware field) throws java.text.ParseException {

		changeoftable1();
		changeoftable2();
		changeoftable3();
		changeoftable4();
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();

	} 
	public static void onChangeDate(ValidationAware field) throws java.text.ParseException {

		// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
		if(field.getData()!=null)
		{
		BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
		String dob=field.getData().toString();
		 SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
			Date d = null;
			try {
				d = form1.parse(dob.toString());
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");

			RefHolders.DOB = form.format(d);
        
	    setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
		
		GrossIncome();
		onChangeSection80C_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
		onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
		onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
		
		onChangeSection80E_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
		onChangeSection80EE_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
		onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
				.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
		checkSum80C80CCC();
		onChangeSection80G_User(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
		sumUserEntrdDed();
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
				new BigInteger("0"));
		sumDeductionsWithout80GG();
		check80GGAgain(
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
		sumDeductions();
		
		}

	}
	public static void onChangeName(ValidationAware field) {
		if(field.getData()!=null)
		{
		String lName = "", mName = "";
		String fName = "";
		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.firstName").getData() != null) {
			fName = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.firstName").getData().toString());
		} else {
			fName="";
		}
		
		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.middleName").getData() != null) {
			mName = String.valueOf(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.middleName")
					.getData().toString());
		} else {
			mName="";

		}
		if (ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.assesseeName.surNameOrOrgName")
				.getData() != null) {
			lName = String.valueOf(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.personalInfo.assesseeName.surNameOrOrgName").getData().toString());
		} else {
			lName="";

		}
		String verName;
		
		
		if ((!fName.equals("")) && (!mName.equals(""))) {
			verName = fName + " " + mName + " " + lName;
		}

		else if (fName.equals("") &&(!mName.equals(""))) {
			verName = mName + " " + lName;
		}

		else if (!(fName.equals("")) && mName.equals("")) {
			verName = fName + " " + lName;
		} else {
			verName = lName;
		}

		setElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerName", verName);
		}
	}
	
	public static void onchangeReturnType(ValidationAware field) {
		ValidationAware flag = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.returnFileSec");
		
		if(field.getData().toString().equals("R"))
		{
			flag.setData("17");
			setElementValueByTargetName("itr.itr4.filingStatus.returnFileSec", "17");
		}
		
		if (String.valueOf(flag.getData()).equals("17")) {
			field.setData("R");
			setElementValueByTargetName(field.getTarget().toString(), "R");

		} else {
			field.setData("O");
			setElementValueByTargetName(field.getTarget().toString(), "O");
		}
		
		
		
		
	}
	
	public static void sch_AL_StateValidate(ValidationAware field) {
		if(field.getData() !=null)
		{
              if(!(field.getData().toString().equals("99")))
			  {
				  setElementValueByTargetName("immovableDetailsController.type.addressAL.countryCode", "91");
				  setElementValueByTargetName("itr.itr4.scheduleAL.immovableDetails.addressAL.countryCode", "99");
				  String pincode=getElementValueByTargetName("immovableDetailsController.type.addressAL.pinCode");
				  if(pincode != null && !pincode.equals("999999") && !pincode.equals("empty"))
				  {
					  
					  setElementValueByTargetName("immovableDetailsController.type.addressAL.pinCode", pincode);
					  setElementValueByTargetName("itr.itr4.scheduleAL.immovableDetails.addressAL.pinCode", pincode);
				  }
				  else
				  {
					  setElementValueByTargetName("immovableDetailsController.type.addressAL.pinCode", null);
					  setElementValueByTargetName("itr.itr4.scheduleAL.immovableDetails.addressAL.pinCode", null);
				  }
				 
				  
				 
			  }
			  else
			  {
				  String country=getElementValueByTargetName("immovableDetailsController.type.addressAL.countryCode");
				  
				  if(country == null || country.equals("91") || country.equals("empty"))
				  {
				  setElementValueByTargetName("immovableDetailsController.type.addressAL.countryCode", "-1");
				  setElementValueByTargetName("itr.itr4.scheduleAL.immovableDetails.addressAL.countryCode", "-1");
				  setElementValueByTargetName("immovableDetailsController.type.addressAL.pinCode","999999");
				  setElementValueByTargetName("itr.itr4.scheduleAL.immovableDetails.addressAL.pinCode","999999");
				  }
				  else
				  {
					  setElementValueByTargetName("immovableDetailsController.type.addressAL.countryCode", country);
					  setElementValueByTargetName("itr.itr4.scheduleAL.immovableDetails.addressAL.countryCode", country);
					  
				  }
				
				 
			  }
			
		}
		
	}
	
	  public static void updateEpayTaxButtonStatus(ValidationAware field) {
		  
	    	BigInteger balTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxPaid.balTaxPayable");
	    	if(balTaxPayable.compareTo(new BigInteger("0")) == 1) {
	    		//Enable button
	    		HyperLink.buttonPointer.setDisable(false);
	    	} else {
	    		//Disable button
	    		HyperLink.buttonPointer.setDisable(true);
	    	}
	    }
	    
	
	/*public static void checkNegativeGrossIncome(ValidationAware field) {
		
		BigInteger gross=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
		if(gross.compareTo(new BigInteger("0"))==-1)
		{
			MessageDialogCtrl.displayInfoDialog("",
					"To avail the benefit of carry forward and set off of loss, please use ITR-3 or ITR-5 .");
		
		}
	}*/
	
public static void onChangeImmovableCountry(ValidationAware field) {
	
		
		String state_aop=getElementValueByTargetName("immovableDetailsController.type.addressAL.stateCode");
		
		if(!field.getData().toString().equals("91"))
		{
			if(state_aop.equals("empty"))
			{
				setElementValueByTargetName("immovableDetailsController.type.addressAL.stateCode", "99");
				
				
			}
			else if(!state_aop.equals("99") && !state_aop.equals("empty") && !field.getData().toString().equals("91"))
			{
				MessageDialogCtrl.displayInfoDialog("ERROR",
						"Country cannot be other than India as you have selected an Indian state.");
				setElementValueByTargetName(field.getTarget().toString(), "-1");
			}
		}
		else
		{
			if(state_aop.equals("empty") || state_aop == null)
			{
				setElementValueByTargetName("immovableDetailsController.type.addressAL.stateCode", "91");
			}
			else if(state_aop.equals("99") && field.getData().toString().equals("91"))
			{
				MessageDialogCtrl.displayInfoDialog("ERROR",
						"Country should be other than India ,as you have selected state outside India.");
				setElementValueByTargetName(field.getTarget().toString(), "-1");
			
			}
			else
			{
				setElementValueByTargetName("immovableDetailsController.type.addressAL.stateCode",state_aop );
			}
		}
	
	}

public static void AOP_StateValidate(ValidationAware field) {
	
	if(field.getData() !=null)
	{
            
		  if(!(field.getData().toString().equals("99")))
		  {
			  setElementValueByTargetName("aopController.type.addressAL.countryCode", "91");
			  setElementValueByTargetName("itr.itr4.scheduleAL.interestHeldInaAsset.addressAL.countryCode", "99");
			  String pincode=getElementValueByTargetName("aopController.type.addressAL.pinCode");
			  if(pincode != null && !pincode.equals("999999") && !pincode.equals("empty"))
			  {
				  
				  setElementValueByTargetName("aopController.type.addressAL.pinCode", pincode);
				  setElementValueByTargetName("itr.itr4.scheduleAL.interestHeldInaAsset.addressAL.pinCode", pincode);
			  }
			  else
			  {
				  setElementValueByTargetName("aopController.type.addressAL.pinCode", null);
				  setElementValueByTargetName("itr.itr4.scheduleAL.interestHeldInaAsset.addressAL.pinCode", null);
			  }
			 
			  
			 
		  }
		  else
		  {
			  String country=getElementValueByTargetName("aopController.type.addressAL.countryCode");
			  
			  if(country == null || country.equals("91") || country.equals("empty"))
			  {
			  setElementValueByTargetName("aopController.type.addressAL.countryCode", "-1");
			  setElementValueByTargetName("itr.itr4.scheduleAL.interestHeldInaAsset.addressAL.countryCode", "-1");
			  setElementValueByTargetName("aopController.type.addressAL.pinCode","999999");
			  setElementValueByTargetName("itr.itr4.scheduleAL.interestHeldInaAsset.addressAL.pinCode","999999");
			  }
			  else
			  {
				  setElementValueByTargetName("aopController.type.addressAL.countryCode", country);
				  setElementValueByTargetName("itr.itr4.scheduleAL.interestHeldInaAsset.addressAL.countryCode", country);
				  
			  }
			
			 
		  }
		
	}
	
}




public static void validateAOPPan(ValidationAware field) throws java.text.ParseException {
	
	String pan=getElementValueByTargetName("aopController.type.addressAL.pinCode");
	setElementValueByTargetName("aopController.type.addressAL.pinCode", pan);
	setElementValueByTargetName("itr.itr4.scheduleAL.interestHeldInaAsset.addressAL.pinCode", pan);
}
public static void defaultZero(ValidationAware field) throws java.text.ParseException {

	
	  if(  field.getData() == null || field.getData().toString().equals("0") || field.getData().toString().equals("") )
	  {
		 
		  setElementValueByTargetName(field.getTarget(),null);
	  }
	 /* if(field.getTarget().equals("itr.itr4.personalInfo.address.phone.stDcode"))
	  {
		  if(field.getData().toString().startsWith("0"))
			{
	          MessageDialogCtrl.displayErrorDialog("Error","STD Code cannot begin with '0'");
	          setElementValueByTargetName("itr.itr4.personalInfo.address.phone.stDcode", null);
			}
	  }*/
}

public static void defaultZeroTDSTotal(ValidationAware field) throws java.text.ParseException {

	
	  if(field.getTarget().equals("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals"))
	  {
		  
		   if(ValidationUtil.ALL_TVC
					.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmIncome").getTableView().getItems().isEmpty())
		   {
			  
			   setElementValueByTargetName("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals", new BigInteger("0"));
		   }
	  }
	  else if(field.getTarget().equals("itr.itr4.tdSonSalaries.totalTDSonSalaries"))
	  {
		  
		   if(ValidationUtil.ALL_TVC
					.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmSal").getTableView().getItems().isEmpty())
		   {
			   
			   setElementValueByTargetName("itr.itr4.tdSonSalaries.totalTDSonSalaries", new BigInteger("0"));
		   }
	  }
	  else if(field.getTarget().equals("itr.itr4.scheduleTCS.totalSchTCS"))
	  {
		  
		   if(ValidationUtil.ALL_TVC
					.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCollectedAtSource").getTableView().getItems().isEmpty())
		   {
			   setElementValueByTargetName("itr.itr4.scheduleTCS.totalSchTCS", new BigInteger("0"));
		   }
	  }
	  else if(field.getTarget().equals("itr.itr4.scheduleIT.totalTaxPayments"))
	  {
		 
		   if(ValidationUtil.ALL_TVC
					.get("class com.itd.efiling.offline.ITR4.ctrl.TaxPaymentController").getTableView().getItems().isEmpty())
		   {
			   
			   setElementValueByTargetName("itr.itr4.scheduleIT.totalTaxPayments", new BigInteger("0"));
		   }
	  }
	  
}

public static void defaultZeroSch_AL(ValidationAware field) throws java.text.ParseException {

	BigInteger gross=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");

	 /* if(gross.compareTo(new BigInteger("5000000"))==-1 && gross.compareTo(new BigInteger("0"))!=0)
	  {
		  setElementValueByTargetName(field.getTarget(),null);
	  }*/
}

public static void onChangeAmountClaimed(ValidationAware field) throws java.text.ParseException {
	BigInteger AmntClaimed = null;
	if (field.getData() != null) {
		AmntClaimed = new BigInteger(field.getData().toString());

	} else {
		AmntClaimed = new BigInteger("0");
	}

	BigInteger TaxCollect = getElementValueByTargetNameBig("taxCollectedAtSourceController.type.totalTCS");
	if (AmntClaimed.compareTo(TaxCollect) > 0) {
		MessageDialogCtrl.displayErrorDialog("ERROR",
				"Amount claimed for this year cannot be more than total tax collected");
		field.setData(null);
		setElementValueByTargetName("taxCollectedAtSourceController.type.amtTCSClaimedThisYear", null);
	}

	// onChangeIncome(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr1.itr1IncomeDeductions.incomeFromSal"));
	BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	GrossIncome();
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
	onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
	checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();

}

public static void submitEpay()
{
	
		String form ="ITR-4";
		
				
		String itr = "itr4";
		String panPath = "itr.itr4.personalInfo.pan";



		String panAccountNo =getElementValueByTargetName(panPath);
		
		if (panAccountNo =="") {
            setElementValueByTargetName("itr.itr4.personalInfo.pan", null);
			MessageDialogCtrl.displayInfoDialog("ERROR", "Please enter a PAN.");
			
		} else {
			String amount =getElementValueByTargetName("itr.itr4.taxPaid.balTaxPayable");
			String minorHead = "300";
			String majorHead = panAccountNo.charAt(4) == 'C' ? "20" : "21";
			String ay ="2018";

			String assessmentYear = ay + "-"
					+ String.valueOf((Long.valueOf(ay)+ 1)).substring(2);


				encodeURLDataForItr(majorHead, panAccountNo, assessmentYear,
						minorHead, amount);

			
		}
	
}

public static void  encodeURLDataForItr(final String majorHead, final String panAccountNo, final String assessmentYear,
        final String minorHead, final String amount) {

        String URL = "";
        String encryptdata = "";
        String encryptchecksum = "";
        String appinfo = "efile";

        final String URI_FOR_ITR = "https://onlineservices.tin.egov-nsdl.com/etaxnew/RequestPDFDataRecived?data=";

        try {

            encryptdata = encryptItrUrl("Major=00" + majorHead + "&PanNumber=" + panAccountNo + "&AY=" + assessmentYear
                + "&Minor=" + minorHead + "&DIN=" + null + "&Amount=" + amount);
            
            
            encryptchecksum = MD5CheckSum("00" + majorHead + "^" + panAccountNo + "^" + assessmentYear + "^"
                + minorHead + "^" + null + "^" + amount + "^" + appinfo);
            

            URL = URI_FOR_ITR + URLEncoder.encode(encryptdata, "UTF-8") + "&checksum=" + URLEncoder.encode(encryptchecksum, "UTF-8")
                + "&appinfo=" + appinfo;
            

            openLink(URL);
           

        } catch (Exception e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage(), e);
        }
      
    }

		public static void openLink(final String url) {
				RefHolders.hostServices.showDocument(url);
		}
		
		public static String encryptItrUrl(final String property) throws NoSuchAlgorithmException, GeneralSecurityException, UnsupportedEncodingException  {
			final char[] PASSWORD = "AESPREFilling280ChallanData@$!@#".toCharArray();
			final byte[] SALT = { -34, 51, 16, 18, -34, 51, 16, 18 };
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBEWithMD5AndDES");
			SecretKey key = keyFactory.generateSecret(new PBEKeySpec(PASSWORD));
			Cipher pbeCipher = Cipher.getInstance("PBEWithMD5AndDES");
			pbeCipher.init(1, key, new PBEParameterSpec(SALT, 20));
			return Base64Utils.base64Encode(pbeCipher.doFinal(property.getBytes("UTF-8")));
}
		
		   public static String MD5CheckSum(final String property) throws Exception {
		        MessageDigest md = MessageDigest.getInstance("MD5");

		        md.update(property.getBytes(), 0, property.length());

		        byte[] mdbytes = md.digest();

		        // convert the byte to hex format method 2
		        StringBuffer hexString = new StringBuffer();
		        for (byte mdbyte : mdbytes) {
		            String hex = Integer.toHexString(0xff & mdbyte);
		            if (hex.length() == 1)
		                hexString.append('0');
		            hexString.append(hex);
		        }

		        LOG.info("Digest(in hex format) "+ hexString.toString());
		        return hexString.toString();
		    }
		    
		public static void onChangeAOPCountry(ValidationAware field) {
	
			String state_aop=getElementValueByTargetName("aopController.type.addressAL.stateCode");
			
			if(!field.getData().toString().equals("91"))
			{
				if(state_aop.equals("empty"))
				{
					setElementValueByTargetName("aopController.type.addressAL.stateCode", "99");
					
					
				}
				else if(!state_aop.equals("99") && !state_aop.equals("empty") && !field.getData().toString().equals("91"))
				{
					MessageDialogCtrl.displayInfoDialog("ERROR",
							"Country cannot be other than India as you have selected an Indian state.");
					setElementValueByTargetName(field.getTarget().toString(), "-1");
				}
			}
			else
			{
				if(state_aop.equals("empty") || state_aop == null)
				{
					setElementValueByTargetName("aopController.type.addressAL.stateCode", "91");
				}
				else if(state_aop.equals("99") && field.getData().toString().equals("91"))
				{
					MessageDialogCtrl.displayInfoDialog("ERROR",
							"Country should be other than India ,as you have selected state outside India.");
					setElementValueByTargetName(field.getTarget().toString(), "-1");
				
				}
				else
				{
					setElementValueByTargetName("aopController.type.addressAL.stateCode",state_aop );
				}
			}
}
		public static void intialize() {
			BigInteger incomeFromBusinessProf = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf");
			BigInteger salary = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.salary");
			BigInteger alwnsNotExempt = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.alwnsNotExempt");
			BigInteger perquisitesValue = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.perquisitesValue");
			BigInteger profitsInSalary = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.profitsInSalary");
			BigInteger deductionUs16 = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductionUs16");
			BigInteger grossRentReceived = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossRentReceived");
			BigInteger taxPaidlocalAuth = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth");
			BigInteger annualValue = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.annualValue");
			BigInteger standardDeduction = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.standardDeduction");
			BigInteger interestPayable = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.interestPayable");
			BigInteger incomeFrmSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
			BigInteger grossTotIncome = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossTotIncome");
			BigInteger incomeOthSrc = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeOthSrc");
			BigInteger totalIncomeOfHP = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP");
			BigInteger section80C = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C");
			BigInteger section80CCC = getElementValueByTargetNameBig(
					"itr.ititr4r1.itr1IncomeDeductions.deductUndChapVIAType.section80CCC");
			BigInteger section80CCDEmployeeOrSE = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE");
			BigInteger section80CCD1B = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B");
			BigInteger section80CCDEmployer = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer");
			BigInteger section80CCG = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG");
			BigInteger section80D = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80D");
			BigInteger section80DD = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD");
			BigInteger section80DDB = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB");
			BigInteger section80E = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E");
			BigInteger section80EE = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE");
			BigInteger section80G = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G");
			BigInteger section80GG = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG");
			BigInteger section80GGA = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGA");
			BigInteger section80GGC = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC");
			BigInteger section80RRB = getElementValueByTargetNameBig(
					"itr.itr1.itr1IncomeDeductions.deductUndChapVIAType.section80RRB");
			BigInteger section80QQB = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB");
			BigInteger section80TTA = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA");
			BigInteger section80U = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U");
			BigInteger section80C_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C");
			BigInteger section80CCC_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC");
			BigInteger section80CCDEmployeeOrSE_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE");
			BigInteger section80CCD1B_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B");
			BigInteger section80CCDEmployer_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer");
			BigInteger totalChapVIADeductions_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.totalChapVIADeductions");
			BigInteger totalChapVIADeductions = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions");
			BigInteger totalIncome = getElementValueByTargetNameBig("itr.itr4.taxComputation.totalIncome");
			BigInteger totalTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxComputation.totalTaxPayable");
			BigInteger rebate87A = getElementValueByTargetNameBig("itr.itr4.taxComputation.rebate87A");
			BigInteger taxPayableOnRebate = getElementValueByTargetNameBig(
					"itr.itr4.taxComputation.taxPayableOnRebate");
			BigInteger section89 = getElementValueByTargetNameBig("itr.itr4.taxComputation.section89");
			BigInteger intrstPayUs234B = getElementValueByTargetNameBig(
					"itr.itr4.taxComputation.intrstPay.intrstPayUs234B");
			BigInteger intrstPayUs234C = getElementValueByTargetNameBig(
					"itr.itr4.taxComputation.intrstPay.intrstPayUs234C");
			BigInteger netTaxLiability = getElementValueByTargetNameBig("itr.itr4.taxComputation.netTaxLiability");
			BigInteger totalIntrstPay = getElementValueByTargetNameBig("itr.itr4.taxComputation.totalIntrstPay");
			BigInteger advanceTax = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.advanceTax");
			BigInteger tds = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.tds");
			BigInteger selfAssessmentTax = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax");
			BigInteger tcs = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.tcs");
			BigInteger totalSchTCS = getElementValueByTargetNameBig("itr.itr4.scheduleTCS.totalSchTCS");
			BigInteger totalTaxesPaid = getElementValueByTargetNameBig("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid");
			BigInteger refundDue = getElementValueByTargetNameBig("itr.itr4.refund.refundDue");
			BigInteger educationCess = getElementValueByTargetNameBig("itr.itr4.taxComputation.educationCess");
			BigInteger grossTaxLiability = getElementValueByTargetNameBig("itr.itr4.taxComputation.grossTaxLiability");
			BigInteger intrstPayUs234A = getElementValueByTargetNameBig(
					"itr.itr4.taxComputation.intrstPay.intrstPayUs234A");
			BigInteger totTaxPlusIntrstPay = getElementValueByTargetNameBig(
					"itr.itr4.taxComputation.totTaxPlusIntrstPay");
			BigInteger balTaxPayable = getElementValueByTargetNameBig("itr.itr4.taxPaid.balTaxPayable");
			BigInteger totalDonationsUs80G = getElementValueByTargetNameBig("itr.itr4.schedule80G.totalDonationsUs80G");
			BigInteger totalEligibleDonationsUs80G = getElementValueByTargetNameBig(
					"itr.itr4.schedule80G.totalEligibleDonationsUs80G");
			BigInteger section80CCG_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG");
			BigInteger section80D_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80D");
			BigInteger section80DD_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD");
			BigInteger section80DDB_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB");
			BigInteger section80E_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E");
			BigInteger section80EE_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE");
			BigInteger section80G_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G");
			BigInteger section80GG_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG");
			BigInteger section80GGA_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA");
			BigInteger section80GGC_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC");
			BigInteger section80RRB_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB");
			BigInteger section80QQB_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB");
			BigInteger section80TTA_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA");
			BigInteger section80U_Usr = getElementValueByTargetNameBig(
					"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U");

			
			if (incomeFromBusinessProf == null || incomeFromBusinessProf.compareTo(new BigInteger("0"))== 0) {
				
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf", new BigInteger("0"));
				
			}

			if (salary == null || salary.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.salary", new BigInteger("0"));
			}

			if (alwnsNotExempt == null || alwnsNotExempt.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.alwnsNotExempt", new BigInteger("0"));
			}

			if (grossTotIncome == null || grossTotIncome.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", new BigInteger("0"));
			}

			if (perquisitesValue == null || perquisitesValue.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.perquisitesValue", new BigInteger("0"));
			}

			if (profitsInSalary == null || profitsInSalary.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.profitsInSalary", new BigInteger("0"));
			}

			if (deductionUs16 == null || deductionUs16.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductionUs16", new BigInteger("0"));
			}

			if (grossRentReceived == null || grossRentReceived.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossRentReceived", new BigInteger("0"));
			}

			if (taxPaidlocalAuth == null || taxPaidlocalAuth.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth", new BigInteger("0"));
			}

			if (annualValue == null || annualValue.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.annualValue", new BigInteger("0"));
			}
			
			if (standardDeduction == null || standardDeduction.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.standardDeduction", new BigInteger("0"));
			}
			
			
			if (interestPayable == null || interestPayable.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.interestPayable", new BigInteger("0"));
			}
			
			
			

			if (incomeFrmSal == null || incomeFrmSal.compareTo(new BigInteger("0"))== 0) {

				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromSal", new BigInteger("0"));
			}

			if (totalIncomeOfHP == null || totalIncomeOfHP.compareTo(new BigInteger("0"))== 0) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP", new BigInteger("0"));
			}
			if (incomeOthSrc == null|| incomeOthSrc.compareTo(new BigInteger("0"))== 0) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeOthSrc", new BigInteger("0"));
			}
			if (section80C == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",
						new BigInteger("0"));
			}
			if (section80CCC == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",
						new BigInteger("0"));
			}
			if (section80CCDEmployeeOrSE == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",
						new BigInteger("0"));
			}
			if (section80CCD1B == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B",
						new BigInteger("0"));
			}
			if (section80CCDEmployer == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer",
						new BigInteger("0"));

			}
			if (section80CCG == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",
						new BigInteger("0"));
			}
			if (section80D == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80D",
						new BigInteger("0"));
			}
			if (section80DD == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",
						new BigInteger("0"));
			}
			if (section80DDB == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",
						new BigInteger("0"));
			}
			if (section80E == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E",
						new BigInteger("0"));
			}
			if (section80EE == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",
						new BigInteger("0"));
			}
			if (section80G == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G",
						new BigInteger("0"));
			}
			if (section80GG == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
						new BigInteger("0"));
			}
			if (section80GGA == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGA",
						new BigInteger("0"));
			}
			if (section80GGC == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC",
						new BigInteger("0"));
			}
			if (section80RRB == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",
						new BigInteger("0"));
			}
			if (section80QQB == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",
						new BigInteger("0"));
			}
			if (section80TTA == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA",
						new BigInteger("0"));
			}
			if (section80U == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",
						new BigInteger("0"));
			}
			if (section80C_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C",
						new BigInteger("0"));
			}
			if (section80CCC_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC",
						new BigInteger("0"));
			}
			if (section80CCDEmployeeOrSE_Usr == null) {
				setElementValueByTargetName(
						"itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE",
						new BigInteger("0"));
			}
			if (section80CCD1B_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B",
						new BigInteger("0"));
			}
			if (section80CCDEmployer_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer",
						new BigInteger("0"));
			}
			if (section80CCG_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG",
						new BigInteger("0"));
			}
			if (section80D_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80D",
						new BigInteger("0"));
			}
			if (section80DD_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",
						new BigInteger("0"));
			}
			if (section80DDB_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",
						new BigInteger("0"));
			}
			if (section80E_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E",
						new BigInteger("0"));
			}
			if (section80EE_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE",
						new BigInteger("0"));
			}
			if (section80G_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G",
						new BigInteger("0"));
			}
			if (section80GG_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG",
						new BigInteger("0"));
			}
			if (section80GGA_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA",
						new BigInteger("0"));
			}
			if (section80GGC_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC",
						new BigInteger("0"));
			}
			if (section80RRB_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB",
						new BigInteger("0"));
			}
			if (section80QQB_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB",
						new BigInteger("0"));
			}
			if (section80TTA_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA",
						new BigInteger("0"));
			}
			if (section80U_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U",
						new BigInteger("0"));

			}
			if (totalChapVIADeductions_Usr == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.totalChapVIADeductions",
						new BigInteger("0"));
			}
			if (totalChapVIADeductions == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",
						new BigInteger("0"));
			}
			if (totalIncome == null) {
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome", new BigInteger("0"));
			}
			if (totalTaxPayable == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable", new BigInteger("0"));
			}
			if (rebate87A == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.rebate87A", new BigInteger("0"));
			}
			if (taxPayableOnRebate == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.taxPayableOnRebate", new BigInteger("0"));
			}
			if (section89 == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.section89", new BigInteger("0"));
			}
			if (intrstPayUs234B == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B", new BigInteger("0"));
			}
			if (intrstPayUs234C == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234C", new BigInteger("0"));
			}
			if (netTaxLiability == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.netTaxLiability", new BigInteger("0"));
			}
			if (totalIntrstPay == null) {
				setElementValueByTargetName("itr.itr4.taxComputation.totalIntrstPay", new BigInteger("0"));
			}
			if (advanceTax == null) {
				setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.advanceTax", new BigInteger("0"));
			}
			if (tds == null) {
				setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tds", new BigInteger("0"));
			}
			if (selfAssessmentTax == null) {
				setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax", new BigInteger("0"));
			}
			if (tcs == null) {
				setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tcs", new BigInteger("0"));
			}
			if (totalSchTCS == null) {
				setElementValueByTargetName("itr.itr4.scheduleTCS.totalSchTCS", new BigInteger("0"));
			}
			if (totalTaxesPaid == null) {
				setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid", new BigInteger("0"));
			}
			if (refundDue == null) {
				setElementValueByTargetName("itr.itr4.refund.refundDue", new BigInteger("0"));
			}
			if (educationCess == null) {
				setElementValueByTargetName("itr.itr4.itr1TaxComputation.educationCess", new BigInteger("0"));
			}
			if (grossTaxLiability == null) {
				setElementValueByTargetName("itr.itr4.itr1TaxComputation.grossTaxLiability", new BigInteger("0"));
			}
			if (section89 == null) {
				setElementValueByTargetName("itr.itr4.itr1TaxComputation.section89", new BigInteger("0"));
			}
			if (intrstPayUs234A == null) {
				setElementValueByTargetName("itr.itr4.itr1TaxComputation.intrstPay.intrstPayUs234A", new BigInteger("0"));
			}
			if (totTaxPlusIntrstPay == null) {
				setElementValueByTargetName("itr.itr4.itr1TaxComputation.totTaxPlusIntrstPay", new BigInteger("0"));
			}
			if (balTaxPayable == null) {
				setElementValueByTargetName("itr.itr4.taxPaid.balTaxPayable", new BigInteger("0"));
			}
			if (totalDonationsUs80G == null) {
				setElementValueByTargetName("itr.itr4.schedule80G.totalDonationsUs80G", new BigInteger("0"));
			}

			if (totalEligibleDonationsUs80G == null) {
				setElementValueByTargetName("itr.itr4.schedule80G.totalEligibleDonationsUs80G", new BigInteger("0"));

			}

		}
		
		public static void validateE1Value(ValidationAware field) {
			
			
			BigInteger E1a=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank");
			BigInteger E1b=getElementValueByTargetNameBig("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode");
			
			BigInteger temp=E1a.add(E1b);
			
			
			if(temp.compareTo(new BigInteger("20000000"))==1)
			{
				
				MessageDialogCtrl.displayErrorDialog("Error",
						"The sum of E1(a)+E1(b) cannot be more than 2 crores.");
				
			    setElementValueByTargetName(field.getTarget(),null);
			}
		}
		public static void onChangeChargableIncome_table1(ValidationAware field) {

			/*BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
			BigInteger chargableinc = null;

			if (field.getData() != null) {

				chargableinc = new BigInteger(field.getData().toString());
				BigInteger income = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
				long TDS1 = (long) (chargableinc.longValue() * 0.90);

				if (income.longValue() < TDS1) {
					if (field.getTarget().toString().equals("taxDetailsTabController.type.incChrgSal") || OnChangeCommonUtil.flagtable == "false") {
						MessageDialogCtrl.displayInfoDialog("Info",
								"1.The Amount of salary disclosed in 'Income Details/Part BTI' is less than 90% of Salary reported in TDS1");
						OnChangeCommonUtil.flagtable = "true";
					}
				}

			} else {
				chargableinc = new BigInteger("0");
			}

			BigInteger x = new BigInteger("90");
			BigInteger y = new BigInteger("100");
			BigInteger mul = x.multiply(chargableinc).divide(y);
			if (incomeFromSal.compareTo(mul) < 0) {

				
			}*/
			
			
			BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
			
			BigInteger incChrgSal = getElementValueByTargetNameBig("taxDetailsTabController.type.incChrgSal");
			long total = 0;
			
			if (incChrgSal != null && !incomeFromSal.equals("11000")) {
				
				List<TDSonSalary> list = (List<TDSonSalary>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmSal").getTableView().getItems();
			
				for (TDSonSalary tdsonSalary : list) {

					total = total + tdsonSalary.getIncChrgSal().longValue();

				}

			//	chargableinc = new BigInteger(field.getData().toString());
				BigInteger income = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
				BigInteger OthersIncTotal = getElementValueByTargetNameBig("itr.itr4.taxExmpIntIncDtls.othersInc.othersIncTotal");
				
				
				long TDS1 = (long) (total * 0.90);
				
				BigInteger sum = income.add(OthersIncTotal);
				
				if (income.longValue() < TDS1) {
					
					RefHolders.flagincm = true;
				}
				else{
					RefHolders.flagincm = false;
				}
				
			/*	if (sum.longValue() < TDS1) {
					
					MessageDialogCtrl.displayInfoDialog("Info",
							"The amount of Salary disclosed in Income details is less than 90% of salary reported in Schedule TDS 1.");
					
					if (OnChangeCommonUtil.flagtable == "false") {
						MessageDialogCtrl.displayInfoDialog("Info",
								"The amount of Salary disclosed in Income details is less than 90% of salary reported in Schedule TDS 1.");
						OnChangeCommonUtil.flagtable = "true";
						
					}
				}*/

			} else {
				incChrgSal = new BigInteger("0");
			}

			BigInteger x = new BigInteger("90");
			BigInteger y = new BigInteger("100");
			BigInteger mul = x.multiply(incChrgSal).divide(y);
			if (incomeFromSal.compareTo(mul) < 0) {

			}


		}
		
		public static void onChangeSection89(ValidationAware field) throws java.text.ParseException {

			if(field.getData() ==  null)
			{
				setElementValueByTargetName(field.getTarget(),new BigInteger("0"));
			}
			changeoftable1();
			changeoftable2();
			changeoftable3();
			changeoftable4();
			BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
			//intialize();
			GrossIncome();
			onChangeSection80C_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
			onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
			onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
			
			onChangeSection80E_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
			onChangeSection80EE_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
			
			onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
			checkSum80C80CCC();
			onChangeSection80G_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
					new BigInteger("0"));
			sumDeductionsWithout80GG();
			check80GGAgain(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();

		}
		
		public static void onChangeInterst(ValidationAware field) {

			BigInteger input234A = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234A");
			BigInteger input234B = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234B");
			BigInteger input234C = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.intrstPayUs234C");
			BigInteger lateFilingFee234F = getElementValueByTargetNameBig("itr.itr4.taxComputation.intrstPay.lateFilingFee234F");
			DataTransporter.transferDataToBean(Form.getForm(), "itr.itr4.taxComputation.intrstPay.intrstPayUs234A", input234A);
			DataTransporter.transferDataToBean(Form.getForm(), "itr.itr4.taxComputation.intrstPay.intrstPayUs234B", input234B);
		
			Double intrstPayable = (Math.round(input234A.doubleValue()) + input234B.doubleValue()
					+ input234C.doubleValue()+lateFilingFee234F.longValue());

			setElementValueByTargetName("itr.itr4.taxComputation.totalIntrstPay",
					BigInteger.valueOf(intrstPayable.longValue()));

			calcIntrstPayable();

		}
		
		public static void onChangeRevised(ValidationAware field) throws java.text.ParseException {

			changeoftable1();
			changeoftable2();
			changeoftable3();
			changeoftable4();
			BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");

			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
			//intialize();
			GrossIncome();
			onChangeSection80C_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
			onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
			onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
			
			onChangeSection80E_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
			onChangeSection80EE_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
			
			onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
			checkSum80C80CCC();
			onChangeSection80G_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
					new BigInteger("0"));
			sumDeductionsWithout80GG();
			check80GGAgain(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();

		}
		
		public static void onChangeOrigRetFiledDate(ValidationAware field) throws java.text.ParseException {
			BigInteger incomesal = getElementValueByTargetNameBig("itr.itr1.itr1IncomeDeductions.incomeFromSal");

			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
			GrossIncome();
			onChangeSection80C_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
			onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
			onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
			
			onChangeSection80E_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
			onChangeSection80EE_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
			
			onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
					.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
			checkSum80C80CCC();
			onChangeSection80G_User(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
			sumUserEntrdDed();
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
					new BigInteger("0"));
			sumDeductionsWithout80GG();
			check80GGAgain(
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
			sumDeductions();

		}
	public static Date getCurrentDate() throws ParseException, java.text.ParseException {

		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Date finalDate = formatter.parse((formatter.format(date)));
		return finalDate;
	}

	public static void panValidation80G(ValidationAware field) {
		String pan = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.pan").getData().toString();
		String verificationPAN = ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.declaration.assesseeVerPAN")
				.getData().toString();
		String tablePan = String.valueOf(field.getData());
		if (!tablePan.equals("")) {
			if (pan.equals(tablePan) || verificationPAN.equals(tablePan)) {
				MessageDialogCtrl.displayInfoDialog("ERROR",
						"Donee PAN cannot be same as assesse PAN or verification PAN .");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
		}

	}
	
	public static void validateAadhar(ValidationAware field) {
	
		if(field.getTarget().toString().equals("itr.itr4.personalInfo.aadhaarCardNo"))
		{
			if(field.getData().toString().equals("000000000000") || field.getData().toString().equals("111111111111"))
			{
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Aadhar Number should not be all Zeros or all ones.");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
		}
		else if(field.getTarget().toString().equals("itr.itr4.personalInfo.aadhaarEnrolmentId"))
		{
			
			if(field.getData().toString().equals("0000000000000000000000000000") || field.getData().toString().equals("1111111111111111111111111111"))
			{
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Aadhar Enrolment Id should not be all Zeros or all ones.");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
		}
		else if(field.getTarget().toString().equals("itr.itr4.filingStatus.noticeNo"))
		{
			
			if(field.getData().toString().equals("00000000000000000000000"))
			{
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Invalid Notice Number.Please retry.");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
		}
		else if(field.getTarget().toString().equals("itr.itr4.filingStatus.ackNoOriginalReturn"))
		{
			
			if(field.getData().toString().equals("000000000000000"))
			{
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Invalid Acknowledgement Number. Please retry.");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
		}	
		else if(field.getTarget().toString().equals("itr.itr4.filingStatus.receiptNo"))
		{
			
			if(field.getData().toString().equals("000000000000000"))
			{
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Invalid Acknowledgement Number. Please retry.");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
		}
		else if(field.getTarget().toString().equals("itr.itr4.refund.bankAccountDtls.priBankDetails.bankAccountNo"))
		{
			
			if(field.getData().toString().equals("00000000000000000000") || field.getData().toString().equals("000000000"))
			{
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Please enter valid bank account number.");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
			
		}
		else if(field.getTarget().toString().equals("incomeDetailsController.type.bankAccountNo"))
		{
			
			if(field.getData().toString().equals("00000000000000000000") || field.getData().toString().equals("000000000"))
			{
				MessageDialogCtrl.displayErrorDialog("ERROR",
						"Please enter valid bank account number.");
				setElementValueByTargetName(field.getTarget().toString(), null);
			}
		}

	}
	
	public static void NOB_BP_Total(ValidationAware field) {
		
		
		BigInteger partners=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.partnerMemberOwnCapital");
		BigInteger secLoans=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.totSecuredLoans");
		BigInteger unsecLoans=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.totUnSecuredLoans");
		BigInteger advances=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.totAdvances");
		BigInteger sundry=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.totSundryCreditors");
		BigInteger totOthrCurrLiab=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.totOthrCurrLiab");
		BigInteger fixedAssets=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.fixedAssets");
		BigInteger inventories=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.inventories");
		BigInteger sundryDebtors=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.sundryDebtors");
		BigInteger balWithBanks=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.balWithBanks");
		BigInteger totCashInHand=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.totCashInHand");
		BigInteger loansAndAdvances=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.loansAndAdvances");
		BigInteger otherAssets=getElementValueByTargetNameBig("itr.itr4.scheduleBP.noBooksOfAccBS.otherAssets");
		
		/*if(field.getData() == null)
		{
			setElementValueByTargetName(field.getTarget(), new BigInteger("0"));
		}*/
		
		/*if(partners == null )
		{
			partners=new BigInteger("0");
		}
		else if(secLoans ==  null )
		{
			
			secLoans=new BigInteger("0");

		}
		else if(unsecLoans == null )
		{
			unsecLoans=new BigInteger("0");

		}
		else if(sundry== null )
		{
			partners=new BigInteger("0");
		}
		else if(advances == null )
		{
			advances=new BigInteger("0");
		}
		
		else if(fixedAssets == null )
		{
			fixedAssets=new BigInteger("0");

		}
		else if(inventories == null )
		{
			inventories=new BigInteger("0");

		}
		else if(sundryDebtors == null )
		{
			sundryDebtors=new BigInteger("0");

		}
		else if(balWithBanks == null || balWithBanks.compareTo(new BigInteger("0"))==0)
		{
			balWithBanks=new BigInteger("0");

		}
		else if(totCashInHand == null )
		{
			totCashInHand=new BigInteger("0");

		}
		else if(loansAndAdvances == null )
		{
			loansAndAdvances=new BigInteger("0");

		}
		else if(otherAssets == null )
		{
			otherAssets=new BigInteger("0");

		}*/
		
		
		BigInteger sum=partners.add(secLoans).add(unsecLoans).add(totOthrCurrLiab).add(sundry).add(advances);
		BigInteger sum_Debt=(fixedAssets).add(inventories).add(sundryDebtors).add(balWithBanks).add(totCashInHand).add(loansAndAdvances).add(otherAssets);
		
	
			setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSrcOfFunds", sum);
		
		
			setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totApplnOfFunds", sum_Debt);
		
		
		
	}
public static void calculateGrossTotal(ValidationAware field) throws java.text.ParseException {
		
	
		BigInteger salary=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.salary");
		BigInteger alwnsNotExempt=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.alwnsNotExempt");
		BigInteger perquisitesValue=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.perquisitesValue");
		BigInteger profitsInSalary=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.profitsInSalary");
		BigInteger deductionUs16=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.deductionUs16");
		BigInteger incomeFromSal=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
		
		
		if(field.getData() == null)
		{
			setElementValueByTargetName(field.getTarget(), new BigInteger("0"));
		}
		
		if(salary == null)
		{
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.salary", new BigInteger("0"));
		}
		else if(alwnsNotExempt ==  null)
		{
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.alwnsNotExempt", new BigInteger("0"));

		}
		else if(perquisitesValue == null)
		{
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.perquisitesValue", new BigInteger("0"));

		}
		else if(profitsInSalary== null)
		{
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductionUs16", new BigInteger("0"));
		}
		else if(deductionUs16 == null)
		{
			setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totAdvances", new BigInteger("0"));
		}
		
		BigInteger sum=salary.add(alwnsNotExempt).add(perquisitesValue).add(profitsInSalary).subtract(deductionUs16);

		if(sum.compareTo(new BigInteger("0")) == -1)
			{
	           sum=new BigInteger("0");
			}
		
		if(sum.compareTo(new BigInteger("0")) == -1)
		{
			sum=new BigInteger("0");
		}
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromSal", sum);
		
		calculationTypeOfHp(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.typeOfHP"));
	}

public static void calculationTypeOfHp(ValidationAware field) throws java.text.ParseException {

	  if(field.getData() != null && field.getData().toString().equals("S"))
	  {
		  
		  ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.grossRentReceived").setDisable(true);
		  ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth").setDisable(true);
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossRentReceived", new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth", new BigInteger("0"));
	  }
	  else if(field.getData() != null && field.getData().toString().equals("L"))
	  {
		  ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.grossRentReceived").setDisable(false);
		  ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth").setDisable(false);
		  
	  }
	  calculationHouseProperty(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.grossRentReceived"));
  	
}
public static void calculationHouseProperty(ValidationAware field) throws java.text.ParseException {
	
	BigInteger grossRentReceived=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.grossRentReceived");
	BigInteger taxPaidlocalAuth=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth");
	
	BigInteger value_Qc=getElementValueByTargetNameBig("itr.itr4.tdsDtls26QC.totalTDSDetails26QC");
	
	if(RefHolders.popup == true && value_Qc.compareTo(new BigInteger("0")) == 1 && field.getData().toString().equals("0"))
	{
	   MessageDialogCtrl.displayInfoDialog("WARNING","Gross rent recieved/ recievable/ letable value should be greater than zero.");	
	}
	
	if(grossRentReceived == null)
	{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossRentReceived", new BigInteger("0"));
	}
	else if(taxPaidlocalAuth ==  null)
	{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth", new BigInteger("0"));

	}
	
	BigInteger subtract=grossRentReceived.subtract(taxPaidlocalAuth);

	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.annualValue", subtract);
	
	cal30Percent(subtract);
}

public static void cal30Percent(BigInteger annualValue) throws java.text.ParseException {
	
	if(annualValue.compareTo(new BigInteger("0")) == -1 || annualValue.compareTo(new BigInteger("0")) == 0)
	{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.standardDeduction", new BigInteger("0"));
	}
	else
	{
				BigInteger temp=(annualValue.multiply(new BigInteger("30"))).divide(new BigInteger("100"));
				setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.standardDeduction", temp);
	}
	
	chargableHouseProp(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.interestPayable"));
}

public static void chargableHouseProp(ValidationAware field) throws java.text.ParseException {
	
	BigInteger annualVal=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.annualValue");
	BigInteger standardDeduction=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.standardDeduction");
	BigInteger interestPayable=getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.interestPayable");
	
	
	if(annualVal == null)
	{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.annualValue", new BigInteger("0"));
	}
	else if(standardDeduction ==  null)
	{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.standardDeduction", new BigInteger("0"));

	}
	else if(interestPayable ==  null)
	{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.interestPayable", new BigInteger("0"));

	}
	
	
	BigInteger diff=annualVal.subtract(standardDeduction).subtract(interestPayable);

	
	if(diff.compareTo(new BigInteger("0")) ==  1)
	{
		setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP", diff);
	}
	else
	{
		if(Long.valueOf(diff.toString()) <-200000)
		{
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP", new BigInteger("-200000"));
		}
		else
		{
			setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP", diff);
		}
	}
	
	
	
	
	BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
	
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	GrossIncome();
	
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
	onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
	checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();
	updateEpayTaxButtonStatus(null);
}
public static int calculateAge() throws java.text.ParseException {
	
	
	Date dob_status = (Date) ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.dob").getData();
	if (dob_status == null) {
		Calendar cal_status = Calendar.getInstance();
		cal_status.set(Calendar.HOUR_OF_DAY, 0);
		cal_status.set(Calendar.MINUTE, 0);
		cal_status.set(Calendar.SECOND, 0);
		cal_status.set(Calendar.MILLISECOND, 0);

		dob_status = cal_status.getTime();
	}
	int years_status = 0;
	int months_status = 0;
	int days_status = 0;

	
	// create calendar object for birth day
	Calendar birthDay_status = Calendar.getInstance();
	birthDay_status.setTimeInMillis(dob_status.getTime());

	// create calendar object for current day
	long currentTime_status = System.currentTimeMillis();
	Calendar now_status = Calendar.getInstance();
	now_status.setTimeInMillis(currentTime_status);

	// Get difference between years
	years_status = now_status.get(Calendar.YEAR) - birthDay_status.get(Calendar.YEAR);
	int currMonth_status = now_status.get(Calendar.MONTH) + 1;
	int birthMonth_status = birthDay_status.get(Calendar.MONTH) + 1;

	// Get difference between months
	months_status = currMonth_status - birthMonth_status;

	// if month difference is in negative then reduce years by one and
	// calculate the number of months.

	if (months_status < 0) {
		//years_status--;
		months_status = 12 - birthMonth_status + currMonth_status;
		if (now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE))
			months_status--;
	} else if (months_status == 0 && now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE)) {
		//years_status--;
		months_status = 11;
	}
	// Calculate the days
	if (now_status.get(Calendar.DATE) > birthDay_status.get(Calendar.DATE))
		days_status = now_status.get(Calendar.DATE) - birthDay_status.get(Calendar.DATE);
	else if (now_status.get(Calendar.DATE) < birthDay_status.get(Calendar.DATE)) {
		int today = now_status.get(Calendar.DAY_OF_MONTH);
		now_status.add(Calendar.MONTH, -1);
		days_status = now_status.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay_status.get(Calendar.DAY_OF_MONTH) + today;
	} else {
		days_status = 0;
		if (months_status == 12) {
			years_status++;
			months_status = 0;
		}
	}

	SimpleDateFormat form1_status = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
	Date date1_status = form1_status.parse(dob_status.toString());
	SimpleDateFormat form_status = new SimpleDateFormat("dd/MM/yyyy");

	String str_status = form_status.format(date1_status);

	Date date2_status = form_status.parse(str_status);
	
	Calendar calc_status = Calendar.getInstance();
	calc_status.setTime(date1_status);
	int month_status = calc_status.get(Calendar.MONTH);
	int date_status = calc_status.get(Calendar.DAY_OF_MONTH);
	
	if (month_status + 1 > 4) {
		years_status = years_status - 1;

	}

	else if ((month_status + 1 == 4) && (date_status > 1)) {
		years_status = years_status - 1;
	}	
	
	return years_status;
	
	
}

public static void onRecalculate(ValidationAware field) throws Exception
{
	
	
	//intialize();
	//GrossIncome();
	calculateGrossTotal(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	onChangeSection80DDB(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));
	onChangeSection80GGC_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC"));
	checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();
	LOG.info("after onRecalculate::");
}

public static void onXmlGen(ValidationAware field) throws Exception
{
	RefHolders.flag234A = true;
	RefHolders.popup = true;
	intialize();
	/*defaultZeroTDSTotal(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals"));
	defaultZeroTDSTotal(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.tdSonSalaries.totalTDSonSalaries"));
	defaultZeroTDSTotal(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleTCS.totalSchTCS"));
	defaultZeroTDSTotal(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleIT.totalTaxPayments"));*/
	onChangeChargableIncome_table1(ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.incChrgSal"));
	onChangeChargableIncome90(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.tdSonSalaries.totalTDSonSalaries"));
	immovableAsseseTable_Validation(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.immovableFlag"));
	immovableAsseseTable_Validation(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleAL.interstAOPFlag"));
	onChangePersonalStatus(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.status"));
	onChangeStatus(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.residentialStatus"));
	BigInteger incomesal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
    setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome", incomesal);
	GrossIncome();
	onChangeSection80C_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C"));
	/*onChangeSection80CCD1B_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B"));
	onChangeSection80CCDEmployer_User(ValidationUtil.ALL_FIELDS_MAP
			.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer"));
	onChangeSection80E_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E"));
	onChangeSection80EE_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE"));*/
	/*checkSum80C80CCC();
	onChangeSection80G_User(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G"));
	sumUserEntrdDed();
	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",
			new BigInteger("0"));
	sumDeductionsWithout80GG();
	check80GGAgain(
			ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG"));
	sumDeductions();*/
	totaldeemedIncomeCalc();
	calculateTotal("itr.itr4.tdSonSalaries.totalTDSonSalaries");
	calculateTotal_claim("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals");
	calculateTotal_claim_QC("itr.itr4.tdsDtls26QC.totalTDSDetails26QC");
	calculateTotal_TCS("itr.itr4.scheduleTCS.totalSchTCS");
	calculateTotal_tax("itr.itr4.scheduleIT.totalTaxPayments");
	
}

public static void populateZero(ValidationAware field) throws Exception
{
	/*if(field.getData() == null)
	{
		setElementValueByTargetName(field.getTarget(), new BigInteger("0"));
	}*/
	
}


	public static BigInteger getElementValueByTargetNameBig(final String target) {
		BigInteger Data = BigInteger.ZERO;
		if (ValidationUtil.ALL_FIELDS_MAP.containsKey(target)) {
			if (ValidationUtil.ALL_FIELDS_MAP.get(target).getData() == null) {
				Data = new BigInteger("0");
			} else {
				Data = new BigInteger(ValidationUtil.ALL_FIELDS_MAP.get(target).getData().toString());
			}

		}
		return Data;
	}
	
	public static BigInteger getElementValueByTargetNameTabBig(final String target) {
		BigInteger Data = BigInteger.ZERO;
		if (ValidationUtil.ALL_FIELDS_MAP.containsKey(target)) {
			if (ValidationUtil.ALL_FIELDS_MAP.get(target).getData() == null) {
				return null;
			} else {
				Data = new BigInteger(ValidationUtil.ALL_FIELDS_MAP.get(target).getData().toString());
			}

		}
		return Data;
	}
	
	public static void setElementValueByTargetName(final String target, final Object data) {

		if (ValidationUtil.ALL_FIELDS_MAP.containsKey(target)) {

			ValidationUtil.ALL_FIELDS_MAP.get(target).setData(data);

			setTargetValueByTargetName(target, data);
		}

	}
	
	public static Object getElementValueByTarget(final String target) {

		if (ValidationUtil.ALL_FIELDS_MAP.containsKey(target)) {
			return ValidationUtil.ALL_FIELDS_MAP.get(target).getData();
		}

		return null;
	}
	public static long roundToNearestTenthDigit(long value) {

		if (value % 10 >= 5) {
			value = value + (10 - value % 10);
		} else {
			value = value - value % 10;
		}
		return value;
	}
	public static void setTargetValueByTargetName(final String target, final Object data) {

		DataTransporter.transferDataToBean(Form.getForm(), target, data);
	}
	

	

// ===========TDS2PARTA_CALCULATION STARTS======

	public static void validteTDS2Fields(ValidationAware field) {
		
		String creditName=getElementValueByTargetName("taxDeductedFrmIncomeController.type.tdsCreditName");
		
		if(creditName.equals("O"))
		{
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.rcptDtls26AS", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedIncome", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedTDS", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN", null);
			
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.rcptDtls26AS").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedIncome").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedTDS").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedIncome").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN").setDisable(false);
			
		
		}
		else if(creditName.equals("S"))
		{
			
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedIncome", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN", null);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedIncome").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN").setDisable(true);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.rcptDtls26AS").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedIncome").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedTDS").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN").setDisable(false);
		}
		else
		{
			
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedIncome").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.rcptDtls26AS").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedIncome").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedTDS").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN").setDisable(false);
		}
		
	}
	
	public static void ChckSumTDS2(ValidationAware field) {
		
		BigInteger col6Amnt=getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands");
		BigInteger col7TDSAmnt=getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS");
		BigInteger col8Amnt=getElementValueByTargetNameBig("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands");
		
		if(col6Amnt == null)
		{
			col6Amnt=new BigInteger("0");
		}
		if(col7TDSAmnt == null)
		{
			col7TDSAmnt=new BigInteger("0");
		}
		if(col8Amnt == null)
		{
			col8Amnt=new BigInteger("0");
		}
		
		BigInteger sum=col6Amnt.add(col7TDSAmnt);
		
		if(col8Amnt.compareTo(sum) ==1)
		{
			MessageDialogCtrl.displayErrorDialog("Error","Amount in field Col (8) cannot be more than sum of field Col (6) or TDS field of (7).");
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedTDS", null);
			setElementValueByTargetName("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands", null);
		}
	}
	
// ===========TDS2PARTA_CALCULATION ENDS======	

//===========TDS3PARTB_CALCULATION STARTS======

public static void chkwithUserPAN(ValidationAware field) {
	    String userPAN=getElementValueByTargetName("itr.itr4.personalInfo.pan");
	    
	     if(field.getTarget().toString().equals("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN"))
	    {
	    	if(!ValidationUtil.isObjectEmpty(userPAN) && userPAN.equals(field.getData().toString()))
	    		{
	    			MessageDialogCtrl.displayErrorDialog("Error", "PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same.");
	    			setElementValueByTargetName(field.getTarget(), null);
	    		}
	    }
	    else if(!ValidationUtil.isObjectEmpty(userPAN) && field.getTarget().toString().equals("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN"))
	    {
	    	if(userPAN.equals(field.getData().toString()))
    		{
    			MessageDialogCtrl.displayErrorDialog("Error", "PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same.");
    			setElementValueByTargetName(field.getTarget(), null);
    		}
	    }
	    else  if(!ValidationUtil.isObjectEmpty(userPAN) && field.getTarget().toString().equals("itr.itr4.filingStatus.panOfSpouse"))
	    {
	    	if(userPAN.equals(field.getData().toString()))
    		{
    			MessageDialogCtrl.displayErrorDialog("Error", "PAN entered in Part A -Gen and PAN of the Spouse cannot be same.");
    			setElementValueByTargetName(field.getTarget(), null);
    		}
	    }
	    else  if(!ValidationUtil.isObjectEmpty(userPAN) && field.getTarget().toString().equals("taxDeductedFrmIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN"))
	    {
	    	if(userPAN.equals(field.getData().toString()))
    		{
    			MessageDialogCtrl.displayErrorDialog("Error", "PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same .");
    			setElementValueByTargetName(field.getTarget(), null);
    		}
	    }
	    else  if(!ValidationUtil.isObjectEmpty(userPAN) && field.getTarget().toString().equals("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN"))
	    {
	    	if(userPAN.equals(field.getData().toString()))
    		{
    			MessageDialogCtrl.displayErrorDialog("Error", "PAN entered in Part A -General Information and PAN of the Spouse/Other person cannot be same .");
    			setElementValueByTargetName(field.getTarget(), null);
    		}
	    }
	    /*else  if(!ValidationUtil.isObjectEmpty(userPAN) && field.getTarget().toString().equals("tdsDetails26QCIncomeController.type.paNofTenant"))
	    {
	    	if(userPAN.equals(field.getData().toString()))
    		{
    			MessageDialogCtrl.displayErrorDialog("Error", "PAN entered in Part A -General Information and PAN of the Tenant cannot be same .");
    			setElementValueByTargetName(field.getTarget(), null);
    		}
	    }*/
	    	
	    	
}
//===========TDS3PARTB_CALCULATION ENDS======
//===========TDS3PARTA_CALCULATION STARTS======
			
public static void validteTDS3Fields(ValidationAware field) {
	
	String creditName=getElementValueByTargetName("tdsDetails26QCIncomeController.type.tdsCreditName");
	
	if(creditName.equals("O"))
	{
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.rcptDtls26AS", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedIncome", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedTDS", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN", null);
		
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.rcptDtls26AS").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedIncome").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedTDS").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedIncome").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN").setDisable(false);
		
	
	}
	else if(creditName.equals("S"))
	{
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedIncome", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN", null);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedIncome").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN").setDisable(true);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.rcptDtls26AS").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedIncome").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedTDS").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN").setDisable(false);
	}
	else
	{
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedIncome").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedSpouseOthPrsnPAN").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.rcptDtls26AS").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedIncome").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedTDS").setDisable(false);
		ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedSpouseOthPrsnPAN").setDisable(false);
	}
	
}

public static void ChckSumTDS3(ValidationAware field) {
	
	BigInteger col6Amnt=getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands");
	BigInteger col7TDSAmnt=getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS");
	BigInteger col8Amnt=getElementValueByTargetNameBig("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands");
	
	if(col6Amnt == null)
	{
		col6Amnt=new BigInteger("0");
	}
	if(col7TDSAmnt == null)
	{
		col7TDSAmnt=new BigInteger("0");
	}
	if(col8Amnt == null)
	{
		col8Amnt=new BigInteger("0");
	}
	
	BigInteger sum=col6Amnt.add(col7TDSAmnt);
	
	if(col8Amnt.compareTo(sum) ==1)
	{
		MessageDialogCtrl.displayErrorDialog("Error","Amount in field Col (8) cannot be more than sum of field Col (6) or TDS field of (7).");
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedOwnHands", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxDeductedTDS", null);
		setElementValueByTargetName("tdsDetails26QCIncomeController.type.taxDeductCreditDtls.taxCreditedOwnHands", null);
	}
}
//===========TDS3PARTA_CALCULATION ENDS======
			/*public static void chkExemptIncm(ValidationAware field) {
				
				BigInteger exemptInmc=getElementValueByTargetNameBig("itr.itr4.taxExmpIntIncDtls.agricultureIncome");
				
				if(exemptInmc.compareTo(new BigInteger("5000")) == 1)
				{
					MessageDialogCtrl.displayInfoDialog("Warning","If agricultural income is more than Rs. 5000/-, use ITR-3/5");				}
			}*/
			
			public static void onChangeVerPan(ValidationAware field) {
				setElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerPAN", field.getData().toString());
				RefHolders.verpan = field.getData().toString();
			}
			
			
			public static void onChangeChargableIncome90(ValidationAware field) {
				/*BigInteger incomeFromSal = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
				BigInteger chargableinc = null;
				if (field.getData() != null) {

					chargableinc = new BigInteger(field.getData().toString());
					BigInteger income = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
					long TDS1 = (long) (chargableinc.longValue() * 0.90);
					if ((income.longValue() < TDS1) && (RefHolders.flag_90 == false)) {
							MessageDialogCtrl.displayInfoDialog("Info",
									"1.The Amount of salary disclosed in 'Income Details/Part BTI' is less than 90% of Salary reported in TDS1");
						}
					
				}*/
				
				
				BigInteger income = getElementValueByTargetNameBig("itr.itr4.itr1IncomeDeductions.incomeFromSal");
				List<OthersIncDtls>  othrs=(List<OthersIncDtls>) getElementValueByTarget("itr.itr4.taxExmpIntIncDtls.othersInc.othersIncDtls");
				BigInteger OthersIncTotal = getElementValueByTargetNameBig("itr.itr4.taxExmpIntIncDtls.othersInc.othersIncTotal");
				long total = 0;
				
				List<TDSonSalary> list = (List<TDSonSalary>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmSal").getTableView().getItems();
			
				for (TDSonSalary tdsonSalary : list) {

					total = total + tdsonSalary.getIncChrgSal().longValue();

				}

				
				BigInteger incChrgSal = getElementValueByTargetNameBig("taxDetailsTabController.type.incChrgSal");
				
				long TDS1 = (long) (total * 0.90);
				
				BigInteger sum = income.add(OthersIncTotal);
				
				if ((sum.longValue() < TDS1)&& !othrs.isEmpty() || (RefHolders.flag_90 == true) && (sum.longValue() < TDS1) && !othrs.isEmpty()) {
					MessageDialogCtrl.displayInfoDialog("Info",
							"The amount of Salary disclosed in Income details is less than 90% of salary reported in Schedule TDS 1.");
				}
			}
			
			public static void disableField(ValidationAware field) {
				
				String dropDownValue=getElementValueByTargetName("natureIncomeController.type.natureDesc");
				
				if(dropDownValue.equalsIgnoreCase("OTH"))
				{
					ValidationUtil.ALL_FIELDS_MAP.get("natureIncomeController.type.othNatOfInc").setDisable(false);
				}
				else
				{
					setElementValueByTargetName("natureIncomeController.type.othNatOfInc", null);
					ValidationUtil.ALL_FIELDS_MAP.get("natureIncomeController.type.othNatOfInc").setDisable(true);
				}
			}
			
			public static void calTotalOthrsIncm(ValidationAware field) {
				
				List<OthersIncDtls> list1a = (List<OthersIncDtls>) ValidationUtil.ALL_TVC
						.get("class com.itd.efiling.offline.ITR4.ctrl.Nature_Income").getTableView().getItems();
				OthersIncDtls values1a[] = list1a.toArray(new OthersIncDtls[list1a.size()]);
                long sum=0;
				for (int i = 0; i < values1a.length; i++) {

					BigInteger natureIncm = new BigInteger("0");

					
					if (values1a[i].getOthAmount()!= null) {
						natureIncm = values1a[i].getOthAmount();

					}
					
					sum = sum + natureIncm.longValue();

				}
			
					setElementValueByTargetName("itr.itr4.taxExmpIntIncDtls.othersInc.othersIncTotal",BigInteger.valueOf(sum));
				
			}
			
			public static void validateCountryCode(ValidationAware field) {
				
				String country=getElementValueByTargetName("itr.itr4.personalInfo.address.countryCode");
				    if(country.equals("91") && !field.getData().toString().equals("91"))
						{
					    MessageDialogCtrl.displayErrorDialog("Error","In case of Country other than India,Country code cannot be '91'");
					    setElementValueByTargetName(field.getTarget(), null);
						}
				
			}
			
			
}
