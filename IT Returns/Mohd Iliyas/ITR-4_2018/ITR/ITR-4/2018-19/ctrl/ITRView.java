package com.itd.efiling.offline.ITR4.ctrl;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import static com.itd.efiling.offline.common.onchange.util.OnChangeCommonUtil.setElementValueByTargetName;

import java.math.BigInteger;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.ResourceBundle;
import java.util.Set;
import java.util.logging.Level;

import com.itd.efiling.offline.ITR4.model.CreationInfo;
import com.itd.efiling.offline.ITR4.model.FilingStatus;
import com.itd.efiling.offline.ITR4.model.FormITR4;
import com.itd.efiling.offline.ITR4.model.ITR;
import com.itd.efiling.offline.ITR4.model.ITR4IncomeDeductions;
import com.itd.efiling.offline.ITR4.model.PersonalInfo;
import com.itd.efiling.offline.ITR4.model.Refund;
import com.itd.efiling.offline.ITR4.model.Schedule80G;
import com.itd.efiling.offline.ITR4.model.ScheduleIT;
import com.itd.efiling.offline.ITR4.model.ScheduleTCS;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSals;
import com.itd.efiling.offline.ITR4.model.TDSonSalaries;
import com.itd.efiling.offline.ITR4.model.TaxComputation;
import com.itd.efiling.offline.ITR4.model.TaxPaid;
import com.itd.efiling.offline.ITR4.model.Us44AeHeavy;
import com.itd.efiling.offline.ITR4.model.Verification;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.Configs;
import com.itd.efiling.offline.common.onchange.util.OnChangeCommonUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.player.ctrl.FormPlayerController;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.common.util.DataTransporter;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import com.itd.efiling.offline.javafx.ui.components.ValidationAware;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;

public class ITRView extends Form implements Initializable {
	
	public static Button buttonPointer,buttonPointertable,buttonPointerQCtable;

    private ITR itr = new ITR();
   
    private commonButtonController commonButton;
    
    private ITR4_80G itr4_80GController;

    private ITR4_80GTable1 itr4_80GController1;

    private ITR4_80GTable2 itr4_80GController2;

    private ITR4_80GTable3 itr4_80GController3;

    private ITR1_IncomeDetails itr1_IncomeDetailsController;

    private Income_Details_Table incomeDetailsController;
    
    private Nature_Income natureIncomeController;
    
    private TaxDeductedFrmIncome taxDeductedFrmIncomeController;
	
	private TaxCollectedAtSource taxCollectedAtSourceController;
	
	private TaxPaymentController advancedTax;
	
	private NonResidenttBankdetails foreignBankDetailsController;
	
 	private Us44AeHeavyTable  us44AeHeavyController;
 	
 	private NatureOfBusiness_Table  natureOfBusinessController;
	
 	private ImmovableDetails_Table  immovableDetailsController;
 	
 	private AOP_Table  aopController;
 	
 	private scheduleGC_Table  schedule_GC;
 	
 	private Schedule_CT_Tab1  controllerScheduleCT1;
 	
 	private Schedule_CT_Tab2  controllerScheduleCT2;
 	
 	private Schedule_CT_Tab3  controllerScheduleCT3;
 	
 	private Schedule_CT_Tab4  controllerScheduleCT4;
 	
 	private Schedule_CT_Tab5  controllerScheduleCT5;
 	
 	private  TDSDetails26QC_Controller  tdsDetails26QCIncomeController;

 	
	 @FXML //  fx:id="myButton"
    private Button myButton; // Value injected by FXMLLoader
	
	 @FXML
	 Button ePay,pandetailsButton,QCtablebutton;
	
	
	public ITR getItr() {
		return itr;
	}

	public void setItr(ITR itr) {
		this.itr = itr;
	}

	
	public void load(final Object entity) {
		setEntity(entity);
		
		RefHolders.loading = true;
		DataTransporter.updateJfxUiOnLoad(this);
        
        RefHolders.loading = false;
        RefHolders.form = Form.getForm();
        LOG.info("form in load ::"+RefHolders.form);
        
       
        
        RefHolders.pan = OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.pan");
        RefHolders.verpan = OnChangeUtil.getElementValueByTargetName("itr.itr4.verification.declaration.assesseeVerPAN");
        String dob = OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.dob");
        SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
		Date d = null;
		try {
				d = form1.parse(dob.toString());
			
			SimpleDateFormat form = new SimpleDateFormat("dd/MM/yyyy");
	
			RefHolders.DOB = form.format(d);
			OnChangeUtil.onImportVal();
			OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.filingStatus.returnFileSec"));
	        
	        OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get("taxDetailsTabController.type.totalTDSSal"));
	        OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get("taxDeductedFrmIncomeController.type.rcptDtls26AS"));
	        OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get("tdsDetails26QCIncomeController.type.rcptDtls26AS"));
	        OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get("taxCollectedAtSourceController.type.amtClaimedBySpouse"));
	        OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get("advancedTax.type.amt"));
			OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.emailAddress"));
	        
	    	
			String  zipp=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.zipcode");
			
			if(zipp!= null && zipp.equals("XXXXXX"))
			{
				ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.personalInfo.address.pinCode").setDisable(true);
				setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck",true);
	
			}
			else
			{
				setElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck",null);
	
			}
	        LOG.info("After updateJfxUiOnLoad load");
	        LOG.info(" RefHolders.loading = false;"+ RefHolders.loading );
	        
	        FormPlayerController.flag = true;
	        LOG.info("FormPlayerController.flag :: "+FormPlayerController.flag);
	
//	        if (itr.getItr4().getPersonalInfo().getPAN() != null) {
//				String name = "itr.itr4.verification.declaration.assesseeVerPAN";
//				String partA = itr.getItr4().getPersonalInfo().getPAN();
//				setElementValueByTargetName(name, partA);
//				
//			}
	        
	        if( ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData()==null){
	
						setElementValueByTargetName("itr.itr4.verification.date",OnChangeUtil.getCurrentDate());
	       	 
	       }
		}catch (Exception e) {
			e.printStackTrace();
		}
 
		
		 buttonPointer = ePay;
		 buttonPointertable=pandetailsButton;
		 buttonPointerQCtable=QCtablebutton;
		
	}

	
    public ITRView() {

        LOG.info("Before loading fxmlLoader.....");
        
        final FXMLLoader fxmlLoader = new FXMLLoader(ITRView.class.getResource("/com/itd/efiling/offline/ITR4/fxml/ITR4.fxml"));

        fxmlLoader.setRoot(ITRView.this);
        fxmlLoader.setController(ITRView.this);

        try {

            fxmlLoader.load();
           
            LOG.info("After loading fxmlLoader.....");
            final Properties properties = new Properties();
	            properties.load(Configs.class.getResourceAsStream("/resources/config/targetName.properties"));
	            final Set<String> keys = properties.stringPropertyNames();

		            for (final String key : keys) {
		             if(key.equals("itr.itr4.refund.bankAccountDtls.bankDtlsFlag"))
		             {
		            	 DataTransporter.transferDataToBean(Form.getForm(),key,"Y");
		             }
		            
		             else if(key.equals("itr.itr4.filingStatus.portugeseCC5A"))
		             {
		            	 
		            	 DataTransporter.transferDataToBean(Form.getForm(),key,"N");
		             }
		             
		             else if(key.equals("itr.itr4.filingStatus.taxStatus"))
		             {
		            	 DataTransporter.transferDataToBean(Form.getForm(),key,"-1");
		             }
		             else if(key.equals("itr.itr4.filingStatus.residentialStatus"))
		             {
		            	 OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get(key));
		             }
		             else if(key.equals("itr.itr4.personalInfo.address.phone.stDcode"))
		             {
		            	 OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get(key));
		             }
		             else if(key.equals("itr.itr4.personalInfo.address.phone.phoneNo"))
		             {
		            	 OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get(key));
		             }
		             else 
		             {
		            	 DataTransporter.transferDataToBean(Form.getForm(),key,BigInteger.ZERO);
		             }
                OnChangeCommonUtil.executeOnChangeMethod(ValidationUtil.ALL_FIELDS_MAP.get(key));
		            }
		            FormPlayerController.flag=true;
		            
		            if( ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.verification.date").getData()==null){

		   				setElementValueByTargetName("itr.itr4.verification.date",OnChangeUtil.getCurrentDate());
		   		
		           	 
		           }
        } catch (final Throwable e) {
            LOG.log(Level.SEVERE, e.getLocalizedMessage(), e);
        }
        
    }

	

    @Override
    public void initialize(final URL url, final ResourceBundle bundle) {
    	 LOG.info("hi start of initialize in itrview");
    	setElementzero();
    	try {
			itr.getItr4().setCreationInfo(new CreationInfo());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	itr.getItr4().setFormITR4(new FormITR4());
    	itr.getItr4().setFilingStatus(new FilingStatus());
    	itr.getItr4().setItr1IncomeDeductions(new ITR4IncomeDeductions());
    	itr.getItr4().setTaxComputation(new TaxComputation());
    	itr.getItr4().setPersonalInfo(new PersonalInfo());
    	itr.getItr4().setRefund(new Refund());
    	itr.getItr4().setSchedule80G(new Schedule80G());
    	itr.getItr4().setScheduleTCS(new ScheduleTCS());
    	itr.getItr4().setTaxPaid(new TaxPaid());
    	itr.getItr4().setScheduleIT(new ScheduleIT());
    	itr.getItr4().setTdSonOthThanSals(new TDSonOthThanSals());
    	itr.getItr4().setTdSonSalaries(new TDSonSalaries());
    	itr.getItr4().setVerification(new Verification());
    	//itr.getItr4().getItr1IncomeDeductions().setIncomeFromSal(BigInteger.valueOf(0));
        setChanged(false);
        Form.loaded = true;

        RefHolders.form = this;
        
      //  setElementValueByTargetName("itr.itr4.itr1TaxComputation.totalTaxPayable", BigInteger.valueOf(0));
        LOG.info("hi end of initialize in itrview");
    }
    public void setElementzero()
    {
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromSal",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.salary",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.alwnsNotExempt",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.perquisitesValue",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.profitsInSalary",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductionUs16",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossRentReceived",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.taxPaidlocalAuth",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.annualValue",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.standardDeduction",new BigInteger("0"));
    	setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.interestPayable",new BigInteger("0"));
    	
    	  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.grossTotIncome",new BigInteger("0"));
    	  setElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A","N");
    	   setElementValueByTargetName("itr.itr4.filingStatus.taxStatus","-1");
    	 
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncomeOfHP",new BigInteger("0") );
		 setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeOthSrc",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80C",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCC",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployeeOrSE",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCD1B",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCDEmployer",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80CCG",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80D",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DD",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80DDB",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80E",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80EE",new BigInteger("0") );
		  
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80G",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GG",new BigInteger("0") );
		//  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGA",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80GGC",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80RRB",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80QQB",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80TTA",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.section80U",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80C",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCC",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployeeOrSE",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCD1B",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCDEmployer",new BigInteger("0"));
		 
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80CCG",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DD",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DDB",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80E",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80EE",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80G",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GG",new BigInteger("0") );
		  //setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGA",new BigInteger("0") );
		 setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80GGC",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80RRB",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80QQB",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80TTA",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80U",new BigInteger("0") );
		  
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DHealthInsurancePremiumUsr",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DMedicalExpenditureUsr",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.section80DHealthInsPremium.sec80DPreventiveHealthCheckUpUsr",new BigInteger("0") );
		  
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.usrDeductUndChapVIA.totalChapVIADeductions",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.deductUndChapVIAType.totalChapVIADeductions",new BigInteger("0"));	
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.totalIncome",new BigInteger("0"));	
		  
		  setElementValueByTargetName("itr.itr4.taxComputation.totalTaxPayable",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.taxComputation.rebate87A",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.taxPayableOnRebate",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.section89",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234B",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234C",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.tdsDtls26QC.totalTDSDetails26QC",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleTCS.totalSchTCS",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleIT.totalTaxPayments",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.grsReceipt",new BigInteger("0"));
		  
		  setElementValueByTargetName("itr.itr4.taxComputation.netTaxLiability",new BigInteger("0"));  
		  setElementValueByTargetName("itr.itr4.taxComputation.totalIntrstPay",new BigInteger("0"));
		  
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.advanceTax",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tds",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tcs",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleTCS.totalSchTCS",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.refund.refundDue",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.educationCess",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.grossTaxLiability",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.section89",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.intrstPayUs234A",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.totTaxPlusIntrstPay",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.balTaxPayable",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxComputation.intrstPay.lateFilingFee234F",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.verification.date",new Date());
		 
		  setElementValueByTargetName("itr.itr4.schedule80G.totalDonationsUs80G",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.totalEligibleDonationsUs80G",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA",new BigInteger("0"));
		  
		  setElementValueByTargetName("itr.itr4.itr1IncomeDeductions.incomeFromBusinessProf",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.advanceTax",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.selfAssessmentTax",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tds",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.tcs",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.totalTaxesPaid",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.taxPaid.balTaxPayable",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.refund.refundDue",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.refund.bankAccountDtls.bankDtlsFlag","Y");
		 // setElementValueByTargetName("itr.itr4.taxPaid.taxesPaid.excIncSec1038",new BigInteger("0"));
		  
		  setElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totDon100Percent",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd",new BigInteger("0"));
		  
		  
		  setElementValueByTargetName("itr4_80GController1.type.eligibleDonationAmt",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent",new BigInteger("0"));
		  setElementValueByTargetName("itr4_80GController2.type.eligibleDonationAmt",new BigInteger("0"));
		  
	
		  setElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr4_80GController3.type.eligibleDonationAmt",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd",new BigInteger("0"));
	/*	  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD8Per",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD6Per",new BigInteger("0"));*/
		  
		//  setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totalPersumptiveInc",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.incChargeableUnderBus",new BigInteger("0"));
		  /*setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.jewelleryBullionEtc",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.archCollDrawPaintSulpArt",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.depositsInBank",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.sharesAndSecurities",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.insurancePolicies",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.loansAndAdvancesGiven",new BigInteger("0") );
		  setElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.cashInHand",new BigInteger("0") );*/
		 // setElementValueByTargetName("itr.itr4.scheduleAL.liabilityInRelatAssets",new BigInteger("0") );
		  
		  /*setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.partnerMemberOwnCapital",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSecuredLoans",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totUnSecuredLoans",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totAdvances",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSundryCreditors",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totOthrCurrLiab",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSrcOfFunds",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.fixedAssets",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.inventories",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.sundryDebtors",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.balWithBanks",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totCashInHand",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.loansAndAdvances",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.otherAssets",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totApplnOfFunds",new BigInteger("0"));*/
		  
		  setElementValueByTargetName("itr.itr4.tdSonSalaries.totalTDSonSalaries",new BigInteger("0"));
		  //setElementValueByTargetName("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals",new BigInteger("0"));
		 // setElementValueByTargetName("itr.itr4.tdsDtls26QC.totalTDSDetails26QC",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleTCS.totalSchTCS",new BigInteger("0"));
		  setElementValueByTargetName("itr.itr4.scheduleIT.totalTaxPayments",new BigInteger("0"));
		  ValidationAware field =ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.itr1IncomeDeductions.incomeFromSal");
	        OnChangeCommonUtil.executeOnChangeMethod(field);
    }

  
    
    @Override
    public Object getEntity() {
        return itr;
    }

    @Override
    public void setEntity(final Object entity) {
        this.itr = (ITR) entity;
        try {
			itr.getItr4().setCreationInfo(new CreationInfo());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	itr.getItr4().setFormITR4(new FormITR4());
    	itr.getItr4().setFormITR4(new FormITR4());
    }

	@Override
	public void setDigest(final String digest) {
		itr.getItr4().getCreationInfo().setDigest(digest);
	}
	
	public Nature_Income getNatureIncomeController() {
		return natureIncomeController;
	}

	public void setNatureIncomeController(Nature_Income natureIncomeController) {
		this.natureIncomeController = natureIncomeController;
	}

	

	/*public Us44AeHeavyTable getUs44AeHeavy() {
		return us44AeHeavyController;
	}

	public void setUs44AeHeavy(Us44AeHeavyTable  us44AeHeavyController) {
		us44AeHeavyController = us44AeHeavyController;
	}*/


	

	public ITR4_80GTable1 getItr4_80GController1() {
		return itr4_80GController1;
	}

	public Us44AeHeavyTable getUs44AeHeavyController() {
		return us44AeHeavyController;
	}

	public void setUs44AeHeavyController(Us44AeHeavyTable us44AeHeavyController) {
		this.us44AeHeavyController = us44AeHeavyController;
	}

	public void setItr4_80GController1(ITR4_80GTable1 itr4_80gController1) {
		itr4_80GController1 = itr4_80gController1;
	}

	public ITR4_80G getItr4_80GController() {
		return itr4_80GController;
	}

	public void setItr4_80GController(ITR4_80G itr4_80gController) {
		itr4_80GController = itr4_80gController;
	}

	public ITR4_80GTable2 getItr4_80GController2() {
		return itr4_80GController2;
	}

	public void setItr4_80GController2(ITR4_80GTable2 itr4_80gController2) {
		itr4_80GController2 = itr4_80gController2;
	}

	public ITR4_80GTable3 getItr4_80GController3() {
		return itr4_80GController3;
	}

	public void setItr4_80GController3(ITR4_80GTable3 itr4_80gController3) {
		itr4_80GController3 = itr4_80gController3;
	}

	
	public ITR1_IncomeDetails getItr1_IncomeDetailsController() {
		return itr1_IncomeDetailsController;
	}

	public void setItr1_IncomeDetailsController(ITR1_IncomeDetails itr1_IncomeDetailsController) {
		this.itr1_IncomeDetailsController = itr1_IncomeDetailsController;
	}

	public Income_Details_Table getIncomeDetailsController() {
		return incomeDetailsController;
	}

	public void setIncomeDetailsController(Income_Details_Table incomeDetailsController) {
		this.incomeDetailsController = incomeDetailsController;
	}

	private TaxDeductedFrmSal taxDetailsTabController;
    
    public TaxDeductedFrmSal getTaxDetailsTabController() {
		return taxDetailsTabController;
	}

	public void setTaxDetailsTabController(TaxDeductedFrmSal taxDetailsTabController) {
		this.taxDetailsTabController = taxDetailsTabController;
	}
	
	public TaxCollectedAtSource getTaxCollectedAtSourceController() {
		return taxCollectedAtSourceController;
	}

	public void setTaxCollectedAtSourceController(TaxCollectedAtSource taxCollectedAtSourceController) {
		this.taxCollectedAtSourceController = taxCollectedAtSourceController;
	}

	public TaxDeductedFrmIncome getTaxDeductedFrmIncomeController() {
		return taxDeductedFrmIncomeController;
	}

	public void setTaxDeductedFrmIncomeController(TaxDeductedFrmIncome taxDeductedFrmIncomeController) {
		this.taxDeductedFrmIncomeController = taxDeductedFrmIncomeController;
	}

    public TaxPaymentController getAdvancedTax() {
		return advancedTax;
	}

	public void setAdvancedTax(TaxPaymentController advancedTax) {
		this.advancedTax = advancedTax;
	}

	public NonResidenttBankdetails getForeignBankDetailsController() {
		return foreignBankDetailsController;
	}

	public void setForeignBankDetailsController(NonResidenttBankdetails foreignBankDetailsController) {
		this.foreignBankDetailsController = foreignBankDetailsController;
	}

	public NatureOfBusiness_Table getNatureOfBusinessController() {
		return natureOfBusinessController;
	}

	public void setNatureOfBusinessController(NatureOfBusiness_Table natureOfBusinessController) {
		this.natureOfBusinessController = natureOfBusinessController;
	}

	public ImmovableDetails_Table getImmovableDetailsController() {
		return immovableDetailsController;
	}

	public void setImmovableDetailsController(ImmovableDetails_Table immovableDetailsController) {
		this.immovableDetailsController = immovableDetailsController;
	}

	public AOP_Table getAopController() {
		return aopController;
	}

	public void setAopController(AOP_Table aopController) {
		this.aopController = aopController;
	}

	public commonButtonController getCommonButton() {
		return commonButton;
	}

	public void setCommonButton(commonButtonController commonButton) {
		this.commonButton = commonButton;
	}

	public scheduleGC_Table getSchedule_GC() {
		return schedule_GC;
	}

	public void setSchedule_GC(scheduleGC_Table schedule_GC) {
		this.schedule_GC = schedule_GC;
	}

	public Schedule_CT_Tab1 getControllerScheduleCT1() {
		return controllerScheduleCT1;
	}

	public void setControllerScheduleCT1(Schedule_CT_Tab1 controllerScheduleCT1) {
		this.controllerScheduleCT1 = controllerScheduleCT1;
	}

	public Schedule_CT_Tab2 getControllerScheduleCT2() {
		return controllerScheduleCT2;
	}

	public void setControllerScheduleCT2(Schedule_CT_Tab2 controllerScheduleCT2) {
		this.controllerScheduleCT2 = controllerScheduleCT2;
	}

	public Schedule_CT_Tab3 getControllerScheduleCT3() {
		return controllerScheduleCT3;
	}

	public void setControllerScheduleCT3(Schedule_CT_Tab3 controllerScheduleCT3) {
		this.controllerScheduleCT3 = controllerScheduleCT3;
	}

	public Schedule_CT_Tab4 getControllerScheduleCT4() {
		return controllerScheduleCT4;
	}

	public void setControllerScheduleCT4(Schedule_CT_Tab4 controllerScheduleCT4) {
		this.controllerScheduleCT4 = controllerScheduleCT4;
	}

	public Schedule_CT_Tab5 getControllerScheduleCT5() {
		return controllerScheduleCT5;
	}

	public void setControllerScheduleCT5(Schedule_CT_Tab5 controllerScheduleCT5) {
		this.controllerScheduleCT5 = controllerScheduleCT5;
	}

	public TDSDetails26QC_Controller getTdsDetails26QCIncomeController() {
		return tdsDetails26QCIncomeController;
	}

	public void setTdsDetails26QCIncomeController(TDSDetails26QC_Controller tdsDetails26QCIncomeController) {
		this.tdsDetails26QCIncomeController = tdsDetails26QCIncomeController;
	}



	


}
