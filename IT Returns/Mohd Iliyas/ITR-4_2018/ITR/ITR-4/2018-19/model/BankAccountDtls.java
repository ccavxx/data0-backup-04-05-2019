package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
	"bankDtlsFlag",
    "priBankDetails",
    "addtnlBankDetails",
    "foreignBankDetails",
    "bankAccounts"
    
})

@XmlRootElement(name = "BankAccountDtls")
public class BankAccountDtls {

	 @XmlElement(name = "BankDtlsFlag", defaultValue = "Y", required = true)
	 protected  String bankDtlsFlag;
	 
    @XmlElement(name = "PriBankDetails", required = true)
    private BankDetailType priBankDetails;

    @XmlElement(name = "AddtnlBankDetails")
    private List<BankDetailType> addtnlBankDetails;
    
    @XmlElement(name = "ForeignBankDetails")
    private ForeignBankDtls foreignBankDetails;
    
    @XmlElement(name = "BankAccounts", required = true)
    private BigInteger bankAccounts;

    public BankDetailType getPriBankDetails() {
        return priBankDetails;
    }

    public void setPriBankDetails(BankDetailType value) {
        this.priBankDetails = value;
    }

    public List<BankDetailType> getAddtnlBankDetails() {
        if (addtnlBankDetails == null) {
            addtnlBankDetails = new ArrayList<BankDetailType>();
        }
        return this.addtnlBankDetails;
    }

    
    
    public BigInteger getBankAccounts() {
        return bankAccounts;
    }

    public void setBankAccounts(BigInteger value) {
        this.bankAccounts = value;
    }

	public String getBankDtlsFlag() {
		return bankDtlsFlag;
	}

	public void setBankDtlsFlag(String bankDtlsFlag) {
		this.bankDtlsFlag = bankDtlsFlag;
	}


	
	public void setAddtnlBankDetails(List<BankDetailType> addtnlBankDetails) {
		this.addtnlBankDetails = addtnlBankDetails;
	}

	public ForeignBankDtls getForeignBankDetails() {
		return foreignBankDetails;
	}

	public void setForeignBankDetails(ForeignBankDtls foreignBankDetails) {
		this.foreignBankDetails = foreignBankDetails;
	}

    
}
