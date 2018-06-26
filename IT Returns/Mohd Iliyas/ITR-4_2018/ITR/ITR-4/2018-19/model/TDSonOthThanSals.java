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
    "tdSonOthThanSal",
    "totalTDSonOthThanSals"
})
@XmlRootElement(name = "TDSonOthThanSals")
public class TDSonOthThanSals {

    @XmlElement(name = "TDSonOthThanSal", required = true)
    protected List<TDSonOthThanSal> tdSonOthThanSal;
    @XmlElement(name = "TotalTDSonOthThanSals", required = true, defaultValue = "0")
    protected BigInteger totalTDSonOthThanSals;
	public List<TDSonOthThanSal> getTdSonOthThanSal() {
		if (tdSonOthThanSal == null) {
            tdSonOthThanSal = new ArrayList<TDSonOthThanSal>();
        }
        return this.tdSonOthThanSal;
	}
	public void setTdSonOthThanSal(List<TDSonOthThanSal> tdSonOthThanSal) {
		this.tdSonOthThanSal = tdSonOthThanSal;
	}
	public BigInteger getTotalTDSonOthThanSals() {
		return totalTDSonOthThanSals;
	}
	public void setTotalTDSonOthThanSals(BigInteger totalTDSonOthThanSals) {
		this.totalTDSonOthThanSals = totalTDSonOthThanSals;
	}

    
}
