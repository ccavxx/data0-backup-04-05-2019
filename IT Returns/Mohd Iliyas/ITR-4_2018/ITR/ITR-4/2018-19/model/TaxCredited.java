package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlElement;

public class TaxCredited {

	 @XmlElement(name = "TaxCreditedIncome", required = true)
	    protected BigInteger taxCreditedIncome;
	    @XmlElement(name = "TaxCreditedTDS", required = true)
	    protected BigInteger taxCreditedTDS;
	    @XmlElement(name = "TaxCreditedSpouseOthPrsnPAN", required = true)
	    protected String taxCreditedSpouseOthPrsnPAN;
	    
	    
	    public BigInteger getTaxCreditedIncome() {
	        return taxCreditedIncome;
	    }


	    public void setTaxCreditedIncome(BigInteger value) {
	        this.taxCreditedIncome = value;
	    }


	    public BigInteger getTaxCreditedTDS() {
	        return taxCreditedTDS;
	    }

	   
	    public void setTaxCreditedTDS(BigInteger value) {
	        this.taxCreditedTDS = value;
	    }

		public String getTaxCreditedSpouseOthPrsnPAN() {
			return taxCreditedSpouseOthPrsnPAN;
		}

		public void setTaxCreditedSpouseOthPrsnPAN(String taxCreditedSpouseOthPrsnPAN) {
			this.taxCreditedSpouseOthPrsnPAN = taxCreditedSpouseOthPrsnPAN;
		}

}
