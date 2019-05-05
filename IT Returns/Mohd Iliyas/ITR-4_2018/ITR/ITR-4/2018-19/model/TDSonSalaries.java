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
    "tdSonSalary",
    "totalTDSonSalaries"
})

@XmlRootElement(name = "TDSonSalaries")
public class TDSonSalaries {

    @XmlElement(name = "TDSonSalary", required = true)
    private List<TDSonSalary> tdSonSalary;
    
    @XmlElement(name = "TotalTDSonSalaries", required = true, defaultValue = "0")
    private BigInteger totalTDSonSalaries;
    
    public List<TDSonSalary> getTdSonSalary() {
        if (tdSonSalary == null) {
        	tdSonSalary = new ArrayList<TDSonSalary>();
        }
        return this.tdSonSalary;
    }

	public void setTdSonSalary(List<TDSonSalary> tdSonSalary) {
		this.tdSonSalary = tdSonSalary;
	}

	public BigInteger getTotalTDSonSalaries() {
        return totalTDSonSalaries;
    }

   public void setTotalTDSonSalaries(BigInteger value) {
        this.totalTDSonSalaries = value;
    }

}
