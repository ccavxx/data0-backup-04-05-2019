package com.itd.efiling.offline.ITR4.model;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "doneewithpan",
    "bankDetailtype"
})
public class ITRDtls {

    @XmlElement(name = "DoneeWithPan", required = true)
    private List<DoneeWithPan> doneewithpan;

    @XmlElement(name = "BankDetailType", required = true)
    private List<BankDetailType> bankDetailtype;

   
    public List<DoneeWithPan> getDoneewithpan() {
        if (doneewithpan == null) {
        	doneewithpan = new ArrayList<DoneeWithPan>();
        }
        return this.doneewithpan;
    }
    
    public List<BankDetailType> getBankDetailType() {
        if (bankDetailtype == null) {
        	bankDetailtype = new ArrayList<BankDetailType>();
        }
        return this.bankDetailtype;
    }

	public List<BankDetailType> getBankDetailtype() {
		return bankDetailtype;
	}

	public void setBankDetailtype(List<BankDetailType> bankDetailtype) {
		this.bankDetailtype = bankDetailtype;
	}

	public void setDoneewithpan(List<DoneeWithPan> doneewithpan) {
		this.doneewithpan = doneewithpan;
	}

}
