package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "othNatOfInc",
    "othAmount",
})

@XmlRootElement(name = "NatureOfIncome")
public class NatureOfIncome {

	@XmlElement(name = "OthNatOfInc")
	private String othNatOfInc;

	@XmlElement(name = "OthAmount")
	private BigInteger othAmount;
	
	public void setOthNatOfInc(String othNatOfInc) {
		this.othNatOfInc = othNatOfInc;
	}
	
	public String getOthNatOfInc() {
		return othNatOfInc;
	}

	public BigInteger getOthAmount() {
		return othAmount;
	}

	public void setOthAmount(BigInteger othAmount) {
		this.othAmount = othAmount;
	}

}
