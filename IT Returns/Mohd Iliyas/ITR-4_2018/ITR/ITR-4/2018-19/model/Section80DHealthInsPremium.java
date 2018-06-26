package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
		"healthInsurancePremium",
        "sec80DHealthInsurancePremiumUsr",
        "medicalExpenditure",
        "sec80DMedicalExpenditureUsr",
        "preventiveHealthCheckUp",
        "sec80DPreventiveHealthCheckUpUsr"
})
public class Section80DHealthInsPremium {

	 @XmlElement(name = "HealthInsurancePremium")
     protected String healthInsurancePremium;
     @XmlElement(name = "Sec80DHealthInsurancePremiumUsr")
     protected BigInteger sec80DHealthInsurancePremiumUsr;
     @XmlElement(name = "MedicalExpenditure")
     protected String medicalExpenditure;
     @XmlElement(name = "Sec80DMedicalExpenditureUsr")
     protected BigInteger sec80DMedicalExpenditureUsr;
     @XmlElement(name = "PreventiveHealthCheckUp")
     protected String preventiveHealthCheckUp;
     @XmlElement(name = "Sec80DPreventiveHealthCheckUpUsr")
     protected BigInteger sec80DPreventiveHealthCheckUpUsr;
    
	public String getHealthInsurancePremium() {
		return healthInsurancePremium;
	}
	public void setHealthInsurancePremium(String healthInsurancePremium) {
		this.healthInsurancePremium = healthInsurancePremium;
	}
	public String getMedicalExpenditure() {
		return medicalExpenditure;
	}
	public void setMedicalExpenditure(String medicalExpenditure) {
		this.medicalExpenditure = medicalExpenditure;
	}
	public String getPreventiveHealthCheckUp() {
		return preventiveHealthCheckUp;
	}
	public void setPreventiveHealthCheckUp(String preventiveHealthCheckUp) {
		this.preventiveHealthCheckUp = preventiveHealthCheckUp;
	}
	public BigInteger getSec80DHealthInsurancePremiumUsr() {
		return sec80DHealthInsurancePremiumUsr;
	}
	public void setSec80DHealthInsurancePremiumUsr(BigInteger sec80dHealthInsurancePremiumUsr) {
		sec80DHealthInsurancePremiumUsr = sec80dHealthInsurancePremiumUsr;
	}
	public BigInteger getSec80DMedicalExpenditureUsr() {
		return sec80DMedicalExpenditureUsr;
	}
	public void setSec80DMedicalExpenditureUsr(BigInteger sec80dMedicalExpenditureUsr) {
		sec80DMedicalExpenditureUsr = sec80dMedicalExpenditureUsr;
	}
	public BigInteger getSec80DPreventiveHealthCheckUpUsr() {
		return sec80DPreventiveHealthCheckUpUsr;
	}
	public void setSec80DPreventiveHealthCheckUpUsr(BigInteger sec80dPreventiveHealthCheckUpUsr) {
		sec80DPreventiveHealthCheckUpUsr = sec80dPreventiveHealthCheckUpUsr;
	}
  
}
