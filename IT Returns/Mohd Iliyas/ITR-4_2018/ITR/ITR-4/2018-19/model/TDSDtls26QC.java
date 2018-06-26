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
    "tdsDetails26QC",
    "totalTDSDetails26QC"
})
@XmlRootElement(name = "TDSDtls26QC")
public class TDSDtls26QC {

    @XmlElement(name = "TDSDetails26QC", required = true)
    protected List<TDSDetails26QC> tdsDetails26QC;
    @XmlElement(name = "TotalTDSDetails26QC", required = true, defaultValue = "0")
    protected BigInteger totalTDSDetails26QC;
    
	public List<TDSDetails26QC> getTdsDetails26QC() {
		
		if (tdsDetails26QC == null) {
			tdsDetails26QC = new ArrayList<TDSDetails26QC>();
        }
        return this.tdsDetails26QC;
	}
	public void setTdsDetails26QC(List<TDSDetails26QC> tdsDetails26QC) {
		this.tdsDetails26QC = tdsDetails26QC;
	}
	public BigInteger getTotalTDSDetails26QC() {
		return totalTDSDetails26QC;
	}
	public void setTotalTDSDetails26QC(BigInteger totalTDSDetails26QC) {
		this.totalTDSDetails26QC = totalTDSDetails26QC;
	} 
}
