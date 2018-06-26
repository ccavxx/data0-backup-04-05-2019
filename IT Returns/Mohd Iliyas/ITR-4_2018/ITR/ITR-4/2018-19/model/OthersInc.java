package com.itd.efiling.offline.ITR4.model;


import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "othersIncDtls","othersIncTotal" })
public class OthersInc {

    @XmlElement(name = "OthersIncDtls", required = true)
    private List<OthersIncDtls> othersIncDtls;
    @XmlElement(name = "OthersTotalTaxExe", required = true, defaultValue = "0")
    protected BigInteger othersIncTotal;
    
    
	public List<OthersIncDtls> getOthersIncDtls() {
		 if (othersIncDtls == null) {
	        	othersIncDtls = new ArrayList<OthersIncDtls>();
	        }
		return this.othersIncDtls;
	}

	public void setOthersIncDtls(List<OthersIncDtls> othersIncDtls) {
		this.othersIncDtls = othersIncDtls;
	}

	public BigInteger getOthersIncTotal() {
		return othersIncTotal;
	}

	public void setOthersIncTotal(BigInteger othersIncTotal) {
		this.othersIncTotal = othersIncTotal;
	}
	
	
  
}
