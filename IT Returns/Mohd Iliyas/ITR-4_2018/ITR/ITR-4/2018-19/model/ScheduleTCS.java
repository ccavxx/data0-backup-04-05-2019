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
    "tcs",
    "totalSchTCS"
})

@XmlRootElement(name = "ScheduleTCS")
public class ScheduleTCS {

    @XmlElement(name = "TCS", required = true)
    private List<TCS> tcs;
    
    @XmlElement(name = "TotalSchTCS", required = true, defaultValue = "0")
    private BigInteger totalSchTCS;
    
    public List<TCS> getTcs() {
    	 if (tcs == null) {
    		 tcs = new ArrayList<TCS>();
         }
         return this.tcs;
	}

	public void setTcs(List<TCS> tcs) {
		this.tcs = tcs;
	}

	public BigInteger getTotalSchTCS() {
        return totalSchTCS;
    }

    public void setTotalSchTCS(BigInteger value) {
        this.totalSchTCS = value;
    }

}
