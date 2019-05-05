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
    "agricultureIncome",
    "othersInc"
})
@XmlRootElement(name = "TaxExmpIntIncDtls")
public class TaxExmpIntIncDtls {

    @XmlElement(name = "AgricultureIncome")
    protected BigInteger agricultureIncome;
    @XmlElement(name = "OthersInc")
    protected OthersInc othersInc;
	
    public BigInteger getAgricultureIncome() {
		return agricultureIncome;
	}
	public void setAgricultureIncome(BigInteger agricultureIncome) {
		this.agricultureIncome = agricultureIncome;
	}
	public OthersInc getOthersInc() {
		return othersInc;
	}
	public void setOthersInc(OthersInc othersInc) {
		this.othersInc = othersInc;
	}


    
}
