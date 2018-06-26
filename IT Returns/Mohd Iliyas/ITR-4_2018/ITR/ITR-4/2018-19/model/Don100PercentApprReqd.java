package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Don100PercentApprReqd", propOrder = { "doneeWithPan","totDon100PercentApprReqd","totEligibleDon100PercentApprReqd"})

public class Don100PercentApprReqd {

    @XmlElement(name = "DoneeWithPan", required = true)
    private List<DoneeWithPan> doneeWithPan;
    
    @XmlElement(name = "TotEligibleDon100PercentApprReqd", defaultValue = "0")
    private BigInteger totEligibleDon100PercentApprReqd;
    @XmlElement(name = "TotDon100PercentApprReqd", required = true, defaultValue = "0")
    private BigInteger totDon100PercentApprReqd;
    

    
   
    
    public List<DoneeWithPan> getDoneeWithPan() {
        if (doneeWithPan == null) {
            doneeWithPan = new ArrayList<DoneeWithPan>();
        }
        return this.doneeWithPan;
    }
    
    public void setDoneeWithPan(List<DoneeWithPan> doneeWithPan){
    	this.doneeWithPan=doneeWithPan;
    }

    public BigInteger getTotEligibleDon100PercentApprReqd() {
        return totEligibleDon100PercentApprReqd;
    }

    public void setTotEligibleDon100PercentApprReqd(BigInteger value) {
        this.totEligibleDon100PercentApprReqd = value;
    }

    public BigInteger getTotDon100PercentApprReqd() {
        return totDon100PercentApprReqd;
    }

    public void setTotDon100PercentApprReqd(BigInteger value) {
        this.totDon100PercentApprReqd = value;
    }

}
