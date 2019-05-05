package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.util.DateUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;

public class PersonalinfoPreview  implements Initializable{

	@FXML
	Label panPreview,firstTextField,midTextField,lastTextField,adhTextField,adhEnrollTextField,DOBTextField,mobTextField,emailTextField,sexPreview,wardTextField;
	
	@FXML
	Label FlatTextField,Building,RoadTextField,Area,TownTextField,State,CountryTextField,Pincode,zipcode,zipcode1,statusTextField,phoneTextField,mobSecTextField;
	
	@FXML
	Label employerCatogary,ResidStat,ReturnFiled,origOrRev, OrigAckNo, Date_orig,taxStatusField,applicableTextField,porcivil;
	
	@FXML
	Label OrigAckNO2,Date_Orig2,NoticeNo,Date_notice,PanOfSpouse,notic42;
	
	
	
	
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		// TODO Auto-generated method stub

		String x;
		x=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.pan");
		panPreview.setText(x);
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.desigOfficerWardorCircle").equals("empty")){
			wardTextField.setText("");}
		else{
			wardTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.desigOfficerWardorCircle"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.assesseeName.firstName").equals("empty")){
			firstTextField.setText("");}
		else{
			firstTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.assesseeName.firstName"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.assesseeName.middleName").equals("empty")){
			midTextField.setText("");}
		else{
			midTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.assesseeName.middleName"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.assesseeName.surNameOrOrgName").equals("empty")){
			midTextField.setText("");}
		else{
			lastTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.assesseeName.surNameOrOrgName"));}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.aadhaarCardNo").equals("empty")) {
			adhTextField.setText("");
		} else {
			adhTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.aadhaarCardNo"));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.aadhaarEnrolmentId").equals("empty"))
		{
			adhEnrollTextField.setText("");
		}
		else
		{
		adhEnrollTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.aadhaarEnrolmentId"));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.dob").equals("empty"))
		{
			DOBTextField.setText("");
		}
		else{
		DOBTextField.setText(DateUtil.toStringDate_preview(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.dob")));
		}
		
		String mob1=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.mobileNo");
		String mob2=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.mobileNoSec");
		if(mob1.equals("empty"))
		{
			mobTextField.setText("");
		}
		else
		{
			String mob="";
			String countryCode=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobile");
			if(countryCode.equals("empty"))
			{
				mob=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.mobileNo").toString();

			}
			else
			{
				mob=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobile").toString()+"-"+OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.mobileNo").toString();

			}
			mobTextField.setText(mob);
		}
		
		emailTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.emailAddress"));
		if(mob2.equals("empty"))
		{
			mobSecTextField.setText("");
		}
		else
		{
			String mobsec="";
			String countryCode=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobileNoSec");
			if(countryCode.equals("empty"))
			{
				mobsec=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.mobileNoSec").toString();

			}
			else
			{
				mobsec=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.countryCodeMobileNoSec").toString()+"-"+OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.mobileNoSec").toString();

			}
			
			
			
			mobSecTextField.setText(mobsec);
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.phone.phoneNo").equals("empty"))
		{
			phoneTextField.setText("");
		}
		else{
			String conct=OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.phone.stDcode").toString()+"-"+OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.phone.phoneNo").toString();
			phoneTextField.setText(conct);
		}
		//phoneTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.phone.phoneNo"));

		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.status").equals("empty")){
			statusTextField.setText("");}
		else{
			if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.status").equals("I"))
			{
				statusTextField.setText("Individual");
			}
			else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.status").equals("F"))
			{
				statusTextField.setText("Firm(other than LLP)");
			}
			else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.status").equals("H"))
			{
				statusTextField.setText("HUF");
			}
			}
		
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.residenceNo").equals("empty")){
			FlatTextField.setText("");}
		else{
			FlatTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.residenceNo"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.residenceName").equals("empty")){
			Building.setText("");}
		else{
			Building.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.residenceName"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.roadOrStreet").equals("empty")){
			RoadTextField.setText("");}
		else{
			RoadTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.roadOrStreet"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.localityOrArea").equals("empty")){
			Area.setText("");}
		else{
			Area.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.localityOrArea"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.cityOrTownOrDistrict").equals("empty")){
			TownTextField.setText("");}
		else{
			TownTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.cityOrTownOrDistrict"));}
		
		
		
		String stateCode = OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.stateCode") ;
		String countryCode = OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.countryCode") ;
		
		State.setText(ComboBoxOptionsCacher.getValueForKey("natureDesc",stateCode));
		CountryTextField.setText(ComboBoxOptionsCacher.getValueForKey("itr.itr4.personalInfo.address.countryCode",countryCode));
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.pinCode").equals("empty"))
		{
			Pincode.setText("");
		}
		else
		{
			Pincode.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.pinCode"));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.zipCode").equals("empty"))
		{
			zipcode.setText("");
		}
		else
		{
			zipcode.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.zipCode"));
		}
		
		zipcode1.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.address.zipcodeCheck"));
		
		
/*		String employerCatgry = OnChangeUtil.getElementValueByTargetName("itr.itr4.personalInfo.employerCategory") ;
		
		employerCatogary.setText(ComboBoxOptionsCacher.getValueForKey("itr.itr4.personalInfo.employerCategory",employerCatgry));*/
		
		
		String res_status = OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.residentialStatus") ;
		
		ResidStat.setText(ComboBoxOptionsCacher.getValueForKey("itr.itr4.filingStatus.residentialStatus",res_status));
		
		String returnFiled = OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.returnFileSec") ;
		
		ReturnFiled.setText(ComboBoxOptionsCacher.getValueForKey("itr.itr4.filingStatus.returnFileSec",returnFiled));
		
		
		String filingType = OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.returnType") ;
		
		origOrRev.setText(ComboBoxOptionsCacher.getValueForKey("itr.itr4.filingStatus.returnType",filingType));
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.taxStatus").equals("empty")){
			taxStatusField.setText("");}
		else{
			if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.taxStatus").equals("TP"))
			{
				taxStatusField.setText("Tax Payable");
			}
			else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.taxStatus").equals("TR"))
			{
				taxStatusField.setText("Tax Refundable");
			}
			else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.taxStatus").equals("NT"))
			{
				taxStatusField.setText("Nil Tax Balance");
			}
			}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A").equals("empty")){
			porcivil.setText("");}
		else{
			if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A").equals("Y"))
			{
				porcivil.setText("Yes");	
			}
			else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.portugeseCC5A").equals("N"))
			{
				porcivil.setText("No");	
			}
			}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.panOfSpouse").equals("empty")){
			applicableTextField.setText("");}
		else{
			applicableTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.panOfSpouse"));}
		
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.receiptNo").equals("empty")){
			OrigAckNo.setText("");}
		else{
			OrigAckNo.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.receiptNo"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.ackNoOriginalReturn").equals("empty")){
			OrigAckNO2.setText("");}
		else{
			OrigAckNO2.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.ackNoOriginalReturn"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.receiptNo").equals("empty"))
		{
			OrigAckNo.setText("");
		}
		else
		{
			OrigAckNo.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.receiptNo"));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.origRetFiledDate").equals("empty"))
		{
			Date_orig.setText("");
		}
		else
		{
			
		Date_orig.setText(DateUtil.toStringDate_preview(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.origRetFiledDate")));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.defRetOrigRetFiledDate").equals("empty"))
		{
			Date_Orig2.setText("");
		}
		else{
			Date_Orig2.setText(DateUtil.toStringDate_preview(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.defRetOrigRetFiledDate")));
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.noticeNo").equals("empty"))
		{
			NoticeNo.setText("");
		}
		else{
		//	NoticeNo.setText(DateUtil.toStringDate_preview(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.noticeNo")));
			NoticeNo.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.noticeNo"));
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.noticeDateUnderSec").equals("empty"))
		{
			Date_notice.setText("");
		}
		else
		{
			Date_notice.setText(DateUtil.toStringDate_preview(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.noticeDateUnderSec")));
		}
		
		/*if(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.noticeNoUs142").equals("empty"))
		{
			notic42.setText("");
		}
		else
		{
			notic42.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.filingStatus.noticeNoUs142"));
		}
		*/
	}
	


}
