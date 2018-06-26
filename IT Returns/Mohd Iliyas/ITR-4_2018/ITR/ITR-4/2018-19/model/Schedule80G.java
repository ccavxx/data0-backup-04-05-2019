package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "don100Percent", "don50PercentNoApprReqd", "don100PercentApprReqd",
		"don50PercentApprReqd", "totalDonationsUs80G","totalEligibleDonationsUs80G"

})

@XmlRootElement(name = "Schedule80G")
public class Schedule80G {

    @XmlElement(name = "Don100Percent")
    private Don100Percent don100Percent;
    
    @XmlElement(name = "Don50PercentNoApprReqd")
    private Don50PercentNoApprReqd don50PercentNoApprReqd;
    
    @XmlElement(name = "Don100PercentApprReqd")
    private Don100PercentApprReqd don100PercentApprReqd;
    
    @XmlElement(name = "Don50PercentApprReqd")
    private Don50PercentApprReqd don50PercentApprReqd;
   
    @XmlElement(name = "TotalEligibleDonationsUs80G")
    private BigInteger totalEligibleDonationsUs80G;
    @XmlElement(name = "TotalDonationsUs80G", required = true)
    private BigInteger totalDonationsUs80G;
    
  
    
    public Don100Percent getDon100Percent() {
		return don100Percent;
	}
	public void setDon100Percent(Don100Percent don100Percent) {
		this.don100Percent = don100Percent;
	}
	public Don50PercentNoApprReqd getDon50PercentNoApprReqd() {
		return don50PercentNoApprReqd;
	}
	public void setDon50PercentNoApprReqd(Don50PercentNoApprReqd don50PercentNoApprReqd) {
		this.don50PercentNoApprReqd = don50PercentNoApprReqd;
	}
	public Don100PercentApprReqd getDon100PercentApprReqd() {
		return don100PercentApprReqd;
	}
	public void setDon100PercentApprReqd(Don100PercentApprReqd don100PercentApprReqd) {
		this.don100PercentApprReqd = don100PercentApprReqd;
	}
	public Don50PercentApprReqd getDon50PercentApprReqd() {
		return don50PercentApprReqd;
	}
	public void setDon50PercentApprReqd(Don50PercentApprReqd don50PercentApprReqd) {
		this.don50PercentApprReqd = don50PercentApprReqd;
	}
	public BigInteger getTotalEligibleDonationsUs80G() {
		return totalEligibleDonationsUs80G;
	}
	public void setTotalEligibleDonationsUs80G(BigInteger totalEligibleDonationsUs80G) {
		this.totalEligibleDonationsUs80G = totalEligibleDonationsUs80G;
	}
	public BigInteger getTotalDonationsUs80G() {
		return totalDonationsUs80G;
	}
	public void setTotalDonationsUs80G(BigInteger totalDonationsUs80G) {
		this.totalDonationsUs80G = totalDonationsUs80G;
	}
	   
}
