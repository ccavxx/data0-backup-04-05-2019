package com.itd.efiling.offline.ITR4.model;

import java.math.BigDecimal;
import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "tdsAppOtherPerson",
    "otherPersonPAN",
    "percentageShare"
})
public class TaxDeductDetails {

    @XmlElement(name = "TDSAppOtherPerson", required = true)
    protected BigInteger tdsAppOtherPerson;
    @XmlElement(name = "OtherPersonPAN", required = true)
    protected String otherPersonPAN;
    @XmlElement(name = "PercentageShare", required = true)
    protected BigDecimal percentageShare;
    
    public BigInteger getTDSAppOtherPerson() {
        return tdsAppOtherPerson;
    }

    public void setTDSAppOtherPerson(BigInteger value) {
        this.tdsAppOtherPerson = value;
    }

   
    public String getOtherPersonPAN() {
        return otherPersonPAN;
    }

  
    public void setOtherPersonPAN(String value) {
        this.otherPersonPAN = value;
    }

	public BigInteger getTdsAppOtherPerson() {
		return tdsAppOtherPerson;
	}

	public void setTdsAppOtherPerson(BigInteger tdsAppOtherPerson) {
		this.tdsAppOtherPerson = tdsAppOtherPerson;
	}

	public BigDecimal getPercentageShare() {
		return percentageShare;
	}

	public void setPercentageShare(BigDecimal percentageShare) {
		this.percentageShare = percentageShare;
	}

	





}
