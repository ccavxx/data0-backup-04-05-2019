package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;



@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "natureDesc",
    "othNatOfInc",
    "othAmount"
})
@XmlRootElement(name = "OthersIncDtls")
public class OthersIncDtls {

    @XmlElement(name = "NatureDesc", required = true)
    protected String natureDesc;
    @XmlElement(name = "OthNatOfInc")
    protected String othNatOfInc;
    @XmlElement(name = "OthAmount", required = true)
    protected BigInteger othAmount;
	public String getNatureDesc() {
		return natureDesc;
	}
	public void setNatureDesc(String natureDesc) {
		this.natureDesc = natureDesc;
	}
	public String getOthNatOfInc() {
		return othNatOfInc;
	}
	public void setOthNatOfInc(String othNatOfInc) {
		this.othNatOfInc = othNatOfInc;
	}
	public BigInteger getOthAmount() {
		return othAmount;
	}
	public void setOthAmount(BigInteger othAmount) {
		this.othAmount = othAmount;
	}

  
}
