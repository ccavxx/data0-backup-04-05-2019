

package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;



@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "paNofTenant",
    "deductorTenantName",
    "uniqueTDSCerNo",
    "deductedYr",
    "amtAppOthPANTDSClaimed",
    "tdsAppoOthPANClaimedSelf",
    "taxDeductedPAN",
    "headofIncForTax",
    "reasonClaimOwnHands",
    "incOffered",
    "tdsClaimed",
    "incBalCarryFrwd",
    "tdsBalCarryFrwd"
})
@XmlRootElement(name = "TDSDetails26QBQC")
public class TDSDetails26QCB {

    @XmlElement(name = "PANofTenant", required = true)
    protected String paNofTenant;
    @XmlElement(name = "DeductorTenantName", required = true)
    protected String deductorTenantName;
    @XmlElement(name = "UniqueTDSCerNo")
    protected String uniqueTDSCerNo;
    @XmlElement(name = "DeductedYr")
    protected String deductedYr;
    @XmlElement(name = "AmtAppOthPANTDSClaimed", required = true)
    protected BigInteger amtAppOthPANTDSClaimed;
    @XmlElement(name = "TDSAppoOthPANClaimedSelf", required = true)
    protected BigInteger tdsAppoOthPANClaimedSelf;
    @XmlElement(name = "TaxDeductedPAN", required = true)
    protected String taxDeductedPAN;
    @XmlElement(name = "HeadofIncForTax", required = true)
    protected String headofIncForTax;
    @XmlElement(name = "ReasonClaimOwnHands", required = true)
    protected String reasonClaimOwnHands;
    @XmlElement(name = "IncOffered", required = true)
    protected BigInteger incOffered;
    @XmlElement(name = "TDSClaimed", required = true)
    protected BigInteger tdsClaimed;
    @XmlElement(name = "IncBalCarryFrwd", required = true)
    protected BigInteger incBalCarryFrwd;
    @XmlElement(name = "TDSBalCarryFrwd", required = true)
    protected BigInteger tdsBalCarryFrwd;
	public String getPaNofTenant() {
		return paNofTenant;
	}
	public void setPaNofTenant(String paNofTenant) {
		this.paNofTenant = paNofTenant;
	}
	public String getDeductorTenantName() {
		return deductorTenantName;
	}
	public void setDeductorTenantName(String deductorTenantName) {
		this.deductorTenantName = deductorTenantName;
	}
	public String getUniqueTDSCerNo() {
		return uniqueTDSCerNo;
	}
	public void setUniqueTDSCerNo(String uniqueTDSCerNo) {
		this.uniqueTDSCerNo = uniqueTDSCerNo;
	}
	public String getDeductedYr() {
		return deductedYr;
	}
	public void setDeductedYr(String deductedYr) {
		this.deductedYr = deductedYr;
	}
	public BigInteger getAmtAppOthPANTDSClaimed() {
		return amtAppOthPANTDSClaimed;
	}
	public void setAmtAppOthPANTDSClaimed(BigInteger amtAppOthPANTDSClaimed) {
		this.amtAppOthPANTDSClaimed = amtAppOthPANTDSClaimed;
	}
	public BigInteger getTdsAppoOthPANClaimedSelf() {
		return tdsAppoOthPANClaimedSelf;
	}
	public void setTdsAppoOthPANClaimedSelf(BigInteger tdsAppoOthPANClaimedSelf) {
		this.tdsAppoOthPANClaimedSelf = tdsAppoOthPANClaimedSelf;
	}
	public String getTaxDeductedPAN() {
		return taxDeductedPAN;
	}
	public void setTaxDeductedPAN(String taxDeductedPAN) {
		this.taxDeductedPAN = taxDeductedPAN;
	}
	public String getHeadofIncForTax() {
		return headofIncForTax;
	}
	public void setHeadofIncForTax(String headofIncForTax) {
		this.headofIncForTax = headofIncForTax;
	}
	public String getReasonClaimOwnHands() {
		return reasonClaimOwnHands;
	}
	public void setReasonClaimOwnHands(String reasonClaimOwnHands) {
		this.reasonClaimOwnHands = reasonClaimOwnHands;
	}
	public BigInteger getIncOffered() {
		return incOffered;
	}
	public void setIncOffered(BigInteger incOffered) {
		this.incOffered = incOffered;
	}
	public BigInteger getTdsClaimed() {
		return tdsClaimed;
	}
	public void setTdsClaimed(BigInteger tdsClaimed) {
		this.tdsClaimed = tdsClaimed;
	}
	public BigInteger getIncBalCarryFrwd() {
		return incBalCarryFrwd;
	}
	public void setIncBalCarryFrwd(BigInteger incBalCarryFrwd) {
		this.incBalCarryFrwd = incBalCarryFrwd;
	}
	public BigInteger getTdsBalCarryFrwd() {
		return tdsBalCarryFrwd;
	}
	public void setTdsBalCarryFrwd(BigInteger tdsBalCarryFrwd) {
		this.tdsBalCarryFrwd = tdsBalCarryFrwd;
	}

 

}
