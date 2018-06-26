package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "tdsCreditName",
    "paNofTenant",
    "nameOfTenant",
    "uniqueTDSCerNo",
    "deductedYr",
    "rcptDtls26AS",
    "taxDeductCreditDtls"
})
@XmlRootElement(name = "TDSDetails26QC")
public class TDSDetails26QC {

    @XmlElement(name = "TDSCreditName", required = true)
    protected String tdsCreditName;
    @XmlElement(name = "PANofTenant", required = true)
    protected String paNofTenant;
    @XmlElement(name = "NameOfTenant", required = true)
    protected String nameOfTenant;
    @XmlElement(name = "UniqueTDSCerNo")
    protected String uniqueTDSCerNo;
    @XmlElement(name = "DeductedYr", required = true)
    protected String deductedYr;
    @XmlElement(name = "RcptDtls26AS", required = true)
    protected BigInteger rcptDtls26AS;
    @XmlElement(name = "TaxDeductCreditDtls", required = true)
    protected TaxDeductCreditDtls taxDeductCreditDtls;
	public String getTdsCreditName() {
		return tdsCreditName;
	}
	public void setTdsCreditName(String tdsCreditName) {
		this.tdsCreditName = tdsCreditName;
	}
	public String getPaNofTenant() {
		return paNofTenant;
	}
	public void setPaNofTenant(String paNofTenant) {
		this.paNofTenant = paNofTenant;
	}
	public String getNameOfTenant() {
		return nameOfTenant;
	}
	public void setNameOfTenant(String nameOfTenant) {
		this.nameOfTenant = nameOfTenant;
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
	public BigInteger getRcptDtls26AS() {
		return rcptDtls26AS;
	}
	public void setRcptDtls26AS(BigInteger rcptDtls26AS) {
		this.rcptDtls26AS = rcptDtls26AS;
	}
	public TaxDeductCreditDtls getTaxDeductCreditDtls() {
		return taxDeductCreditDtls;
	}
	public void setTaxDeductCreditDtls(TaxDeductCreditDtls taxDeductCreditDtls) {
		this.taxDeductCreditDtls = taxDeductCreditDtls;
	}
}
