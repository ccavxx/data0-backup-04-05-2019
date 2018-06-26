package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "Don50PercentNoApprReqd", propOrder = { "doneeWithPan","totDon50PercentNoApprReqd","totEligibleDon50Percent"})

public class Don50PercentNoApprReqd {

    @XmlElement(name = "DoneeWithPan", required = true)
    private List<DoneeWithPan> doneeWithPan;
    
    @XmlElement(name = "TotEligibleDon50Percent", defaultValue = "0")
    private BigInteger totEligibleDon50Percent;
    @XmlElement(name = "TotDon50PercentNoApprReqd", required = true, defaultValue = "0")
    private BigInteger totDon50PercentNoApprReqd;


    


    public List<DoneeWithPan> getDoneeWithPan() {
        if (doneeWithPan == null) {
            doneeWithPan = new ArrayList<DoneeWithPan>();
        }
        return this.doneeWithPan;
    }
    
    public void setDoneeWithPan(List<DoneeWithPan> doneeWithPan){
    	this.doneeWithPan=doneeWithPan;
    }

    public BigInteger getTotEligibleDon50Percent() {
        return totEligibleDon50Percent;
    }

    public void setTotEligibleDon50Percent(BigInteger value) {
        this.totEligibleDon50Percent = value;
    }

    public BigInteger getTotDon50PercentNoApprReqd() {
        return totDon50PercentNoApprReqd;
    }

    public void setTotDon50PercentNoApprReqd(BigInteger value) {
        this.totDon50PercentNoApprReqd = value;
    }

}
