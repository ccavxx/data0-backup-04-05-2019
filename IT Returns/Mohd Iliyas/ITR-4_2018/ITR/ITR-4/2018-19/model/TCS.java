package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "employerOrDeductorOrCollectDetl",
    "amtfrom26AS",
    "collectedYr",
    "totalTCS",
    "amtTCSClaimedThisYear",
    "amtClaimedBySpouse"
})

public class TCS {

    @XmlElement(name = "EmployerOrDeductorOrCollectDetl", required = true)
    private EmployerOrDeductorOrCollectDetl employerOrDeductorOrCollectDetl;
    
    @XmlElement(name = "Amtfrom26AS")
    private BigInteger amtfrom26AS;
    
    @XmlElement(name = "CollectedYr", required = true)
    private String collectedYr;
    
    @XmlElement(name = "TotalTCS", required = true, defaultValue = "0")
    private BigInteger totalTCS;
    
    @XmlElement(name = "AmtTCSClaimedThisYear", required = true, defaultValue = "0")
    private BigInteger amtTCSClaimedThisYear;
    
    @XmlElement(name = "AmtClaimedBySpouse", defaultValue = "0")
    private BigInteger amtClaimedBySpouse;

    public EmployerOrDeductorOrCollectDetl getEmployerOrDeductorOrCollectDetl() {
        return employerOrDeductorOrCollectDetl;
    }

    public void setEmployerOrDeductorOrCollectDetl(EmployerOrDeductorOrCollectDetl value) {
        this.employerOrDeductorOrCollectDetl = value;
    }

    
    public BigInteger getAmtfrom26AS() {
		return amtfrom26AS;
	}

	public void setAmtfrom26AS(BigInteger amtfrom26as) {
		amtfrom26AS = amtfrom26as;
	}

	public String getCollectedYr() {
        return collectedYr;
    }

    public void setCollectedYr(String value) {
        this.collectedYr = value;
    }

    public BigInteger getTotalTCS() {
        return totalTCS;
    }

    public void setTotalTCS(BigInteger value) {
        this.totalTCS = value;
    }

    public BigInteger getAmtTCSClaimedThisYear() {
        return amtTCSClaimedThisYear;
    }

    public void setAmtTCSClaimedThisYear(BigInteger value) {
        this.amtTCSClaimedThisYear = value;
    }

    public BigInteger getAmtClaimedBySpouse() {
        return amtClaimedBySpouse;
    }

    public void setAmtClaimedBySpouse(BigInteger value) {
        this.amtClaimedBySpouse = value;
    }

}