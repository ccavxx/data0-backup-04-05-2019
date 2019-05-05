package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "taxDeductedOwnHands",
    "taxDeductedIncome",
    "taxDeductedTDS",
    "taxDeductedSpouseOthPrsnPAN",
    "taxCreditedOwnHands",
    "taxCreditedIncome",
    "taxCreditedTDS",
    "taxCreditedSpouseOthPrsnPAN"
})
@XmlRootElement(name = "TaxDeductCreditDtls")
public class TaxDeductCreditDtls {

    @XmlElement(name = "TaxDeductedOwnHands")
    protected BigInteger taxDeductedOwnHands;
    @XmlElement(name = "TaxDeductedIncome")
    protected BigInteger taxDeductedIncome;
    @XmlElement(name = "TaxDeductedTDS")
    protected BigInteger taxDeductedTDS;
    @XmlElement(name = "TaxDeductedSpouseOthPrsnPAN")
    protected String taxDeductedSpouseOthPrsnPAN;
    @XmlElement(name = "TaxCreditedOwnHands", required = true)
    protected BigInteger taxCreditedOwnHands;
    @XmlElement(name = "TaxCreditedIncome")
    protected BigInteger taxCreditedIncome;
    @XmlElement(name = "TaxCreditedTDS")
    protected BigInteger taxCreditedTDS;
    @XmlElement(name = "TaxCreditedSpouseOthPrsnPAN")
    protected String taxCreditedSpouseOthPrsnPAN;
	public BigInteger getTaxDeductedOwnHands() {
		return taxDeductedOwnHands;
	}
	public void setTaxDeductedOwnHands(BigInteger taxDeductedOwnHands) {
		this.taxDeductedOwnHands = taxDeductedOwnHands;
	}
	public BigInteger getTaxDeductedIncome() {
		return taxDeductedIncome;
	}
	public void setTaxDeductedIncome(BigInteger taxDeductedIncome) {
		this.taxDeductedIncome = taxDeductedIncome;
	}
	public BigInteger getTaxDeductedTDS() {
		return taxDeductedTDS;
	}
	public void setTaxDeductedTDS(BigInteger taxDeductedTDS) {
		this.taxDeductedTDS = taxDeductedTDS;
	}
	public String getTaxDeductedSpouseOthPrsnPAN() {
		return taxDeductedSpouseOthPrsnPAN;
	}
	public void setTaxDeductedSpouseOthPrsnPAN(String taxDeductedSpouseOthPrsnPAN) {
		this.taxDeductedSpouseOthPrsnPAN = taxDeductedSpouseOthPrsnPAN;
	}
	public BigInteger getTaxCreditedOwnHands() {
		return taxCreditedOwnHands;
	}
	public void setTaxCreditedOwnHands(BigInteger taxCreditedOwnHands) {
		this.taxCreditedOwnHands = taxCreditedOwnHands;
	}
	public BigInteger getTaxCreditedIncome() {
		return taxCreditedIncome;
	}
	public void setTaxCreditedIncome(BigInteger taxCreditedIncome) {
		this.taxCreditedIncome = taxCreditedIncome;
	}
	public BigInteger getTaxCreditedTDS() {
		return taxCreditedTDS;
	}
	public void setTaxCreditedTDS(BigInteger taxCreditedTDS) {
		this.taxCreditedTDS = taxCreditedTDS;
	}
	public String getTaxCreditedSpouseOthPrsnPAN() {
		return taxCreditedSpouseOthPrsnPAN;
	}
	public void setTaxCreditedSpouseOthPrsnPAN(String taxCreditedSpouseOthPrsnPAN) {
		this.taxCreditedSpouseOthPrsnPAN = taxCreditedSpouseOthPrsnPAN;
	}
}
