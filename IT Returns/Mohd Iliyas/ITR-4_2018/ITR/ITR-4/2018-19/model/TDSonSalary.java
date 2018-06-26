package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "employerOrDeductorOrCollectDetl",
    "incChrgSal",
    "totalTDSSal"
})

@XmlRootElement(name = "TDSonSalary")
public class TDSonSalary {

    @XmlElement(name = "EmployerOrDeductorOrCollectDetl", required = true)
    private EmployerOrDeductorOrCollectDetl employerOrDeductorOrCollectDetl;
    
    @XmlElement(name = "IncChrgSal", required = true, defaultValue = "0")
    private BigInteger incChrgSal;
    
    @XmlElement(name = "TotalTDSSal", required = true, defaultValue = "0")
    private BigInteger totalTDSSal;

	public EmployerOrDeductorOrCollectDetl getEmployerOrDeductorOrCollectDetl() {
		return employerOrDeductorOrCollectDetl;
	}

	public void setEmployerOrDeductorOrCollectDetl(EmployerOrDeductorOrCollectDetl employerOrDeductorOrCollectDetl) {
		this.employerOrDeductorOrCollectDetl = employerOrDeductorOrCollectDetl;
	}

	public BigInteger getIncChrgSal() {
        return incChrgSal;
    }
   
    public void setIncChrgSal(BigInteger value) {
        this.incChrgSal = value;
    }

    public BigInteger getTotalTDSSal() {
        return totalTDSSal;
    }
   
    public void setTotalTDSSal(BigInteger value) {
        this.totalTDSSal = value;
    }

}
