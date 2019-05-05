package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "doneeWithPanName", "doneePAN", "addressDetail", "donationAmt",
		"eligibleDonationAmt", })

@XmlRootElement(name = "DoneeWithPan")
public class DoneeWithPan {

    @XmlElement(name = "DoneeWithPanName", required = true)
    private String doneeWithPanName;

    @XmlElement(name = "DoneePAN", required = true)
    private String doneePAN;
    
    @XmlElement(name = "AddressDetail", required = true)
    private AddressDetail addressDetail;
    
    @XmlElement(name = "DonationAmt", required = true)
    private BigInteger donationAmt;
    
    @XmlElement(name = "EligibleDonationAmt", required = true)
    private BigInteger eligibleDonationAmt;

    public String getDoneeWithPanName() {
        return doneeWithPanName;
    }

    public void setDoneeWithPanName(String value) {
        this.doneeWithPanName = value;
    }

    public String getDoneePAN() {
        return doneePAN;
    }

    public void setDoneePAN(String value) {
        this.doneePAN = value;
    }

    public AddressDetail getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(AddressDetail value) {
        this.addressDetail = value;
    }

    public BigInteger getDonationAmt() {
        return donationAmt;
    }

    public void setDonationAmt(BigInteger value) {
        this.donationAmt = value;
    }

    public BigInteger getEligibleDonationAmt() {
        return eligibleDonationAmt;
    }

    public void setEligibleDonationAmt(BigInteger value) {
        this.eligibleDonationAmt = value;
    }

}
