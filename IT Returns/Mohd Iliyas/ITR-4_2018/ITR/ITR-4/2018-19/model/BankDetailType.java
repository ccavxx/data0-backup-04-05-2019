package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "BankDetailType", propOrder = {
    "ifscCode",
    "bankName",
    "bankAccountNo"
   
})

public class BankDetailType {

    @XmlElement(name = "IFSCCode")
    private String ifscCode;
    
    @XmlElement(name = "BankName")
    private String bankName;
    
    @XmlElement(name = "BankAccountNo")
    private String bankAccountNo;
    
      public String getBankName() {
        return bankName;
    }

    public void setBankName(String value) {
        this.bankName = value;
    }

    public String getBankAccountNo() {
        return bankAccountNo;
    }

    public void setBankAccountNo(String value) {
        this.bankAccountNo = value;
    }

  
	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

}
