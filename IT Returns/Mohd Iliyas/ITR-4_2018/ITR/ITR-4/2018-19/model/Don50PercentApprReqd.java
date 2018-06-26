package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Don50PercentApprReqd", propOrder = { "doneeWithPan","totDon50PercentApprReqd","totEligibleDon50PercentApprReqd"})

public class Don50PercentApprReqd {

    @XmlElement(name = "DoneeWithPan", required = true)
    private List<DoneeWithPan> doneeWithPan;

    @XmlElement(name = "TotEligibleDon50PercentApprReqd", defaultValue = "0")
    private BigInteger totEligibleDon50PercentApprReqd;
    @XmlElement(name = "TotDon50PercentApprReqd", required = true, defaultValue = "0")
    private BigInteger totDon50PercentApprReqd;
    
 
    
    public List<DoneeWithPan> getDoneeWithPan() {
        if (doneeWithPan == null) {
            doneeWithPan = new ArrayList<DoneeWithPan>();
        }
        return this.doneeWithPan;
    }
    
    public void setDoneeWithPan(List<DoneeWithPan> doneeWithPan){
    	this.doneeWithPan=doneeWithPan;
    }

    public BigInteger getTotEligibleDon50PercentApprReqd() {
        return totEligibleDon50PercentApprReqd;
    }

    public void setTotEligibleDon50PercentApprReqd(BigInteger value) {
        this.totEligibleDon50PercentApprReqd = value;
    }

    public BigInteger getTotDon50PercentApprReqd() {
        return totDon50PercentApprReqd;
    }

    public void setTotDon50PercentApprReqd(BigInteger value) {
        this.totDon50PercentApprReqd = value;
    }

}
