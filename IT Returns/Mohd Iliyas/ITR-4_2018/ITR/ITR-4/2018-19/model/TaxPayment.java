package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import com.itd.efiling.offline.common.jaxb.adapters.DateAdapter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "bsrCode",
    "dateDep",
    "srlNoOfChaln",
    "amt"
})

@XmlRootElement(name = "TaxPayment")
public class TaxPayment {

    @XmlElement(name = "BSRCode", required = true)
    private String bsrCode;
    
    @XmlElement(name = "DateDep", required = true)
    @XmlSchemaType(name = "date")
    @XmlJavaTypeAdapter(DateAdapter.class) 
    private Date dateDep;
    
    @XmlElement(name = "SrlNoOfChaln", required = true)
    private BigInteger srlNoOfChaln;
    
    @XmlElement(name = "Amt", required = true, defaultValue = "0")
    private BigInteger amt;
    
    public String getBsrCode() {
		return bsrCode;
	}

	public void setBsrCode(String bsrCode) {
		this.bsrCode = bsrCode;
	}

	public Date getDateDep() {
		return dateDep;
	}

	public void setDateDep(Date dateDep) {
		this.dateDep = dateDep;
	}

    public BigInteger getSrlNoOfChaln() {
        return srlNoOfChaln;
    }

    public void setSrlNoOfChaln(BigInteger value) {
        this.srlNoOfChaln = value;
    }

    public BigInteger getAmt() {
        return amt;
    }

    public void setAmt(BigInteger value) {
        this.amt = value;
    }

}
