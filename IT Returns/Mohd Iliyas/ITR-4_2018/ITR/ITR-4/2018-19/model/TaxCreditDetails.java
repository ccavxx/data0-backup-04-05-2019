package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "taxCreditedIncome",
    "taxCreditedTDS",
    "taxCreditedSpouseOthPrsnPAN"
   
})

public class TaxCreditDetails {
	
	  @XmlElement(name = "TaxCreditedIncome", required = true)
      protected BigInteger taxCreditedIncome;
      @XmlElement(name = "TaxCreditedTDS", required = true)
      protected BigInteger taxCreditedTDS;
      @XmlElement(name = "TaxCreditedSpouseOthPrsnPAN", required = true)
      protected String taxCreditedSpouseOthPrsnPAN;
      
      
	public BigInteger getTaxCreditedIncome() {
		return taxCreditedIncome;
	}
	public void setTaxCreditedIncome(BigInteger taxCreditedIncome) {
		this.taxCreditedIncome = taxCreditedIncome;
	}
	public BigInteger getTaxCreditedTDS() {
		return taxCreditedTDS;
	}
	public void setTaxCreditedTDS(BigInteger taxCreditedTDS) {
		this.taxCreditedTDS = taxCreditedTDS;
	}
	public String getTaxCreditedSpouseOthPrsnPAN() {
		return taxCreditedSpouseOthPrsnPAN;
	}
	public void setTaxCreditedSpouseOthPrsnPAN(String taxCreditedSpouseOthPrsnPAN) {
		this.taxCreditedSpouseOthPrsnPAN = taxCreditedSpouseOthPrsnPAN;
	}
	
      
      
      
}
