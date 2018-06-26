package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "doneeWithPan","totDon100Percent","totEligibleDon100Percent" })
public class Don100Percent {

    @XmlElement(name = "DoneeWithPan", required = true)
    private List<DoneeWithPan> doneeWithPan;
    
    @XmlElement(name = "TotEligibleDon100Percent",defaultValue="0")
    private BigInteger totEligibleDon100Percent;
    @XmlElement(name = "TotDon100Percent", required = true, defaultValue = "0")
    private BigInteger totDon100Percent;

 
    
    public List<DoneeWithPan> getDoneeWithPan() {
        if (doneeWithPan == null) {
            doneeWithPan = new ArrayList<DoneeWithPan>();
        }
        return this.doneeWithPan;
    }
    
    public void setDoneeWithPan(List<DoneeWithPan> doneeWithPan){
    	this.doneeWithPan=doneeWithPan;
    }

    public BigInteger getTotEligibleDon100Percent() {
        return totEligibleDon100Percent;
    }

    public void setTotEligibleDon100Percent(BigInteger value) {
        this.totEligibleDon100Percent = value;
    }

    public BigInteger getTotDon100Percent() {
        return totDon100Percent;
    }

    public void setTotDon100Percent(BigInteger value) {
        this.totDon100Percent = value;
    }

}
