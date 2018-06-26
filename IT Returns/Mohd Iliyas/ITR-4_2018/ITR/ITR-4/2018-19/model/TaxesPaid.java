//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.01.30 at 07:12:47 PM IST 
//


package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;



@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "advanceTax",
    "tds",
    "tcs",
    "selfAssessmentTax",
    "totalTaxesPaid"
})
@XmlRootElement(name = "TaxesPaid")
public class TaxesPaid {

    @XmlElement(name = "AdvanceTax", required = true)
    protected BigInteger advanceTax;
    @XmlElement(name = "TDS", required = true)
    protected BigInteger tds;
    @XmlElement(name = "TCS", required = true)
    protected BigInteger tcs;
    @XmlElement(name = "SelfAssessmentTax", required = true)
    protected BigInteger selfAssessmentTax;
    @XmlElement(name = "TotalTaxesPaid", required = true)
    protected BigInteger totalTaxesPaid;

    /**
     * Gets the value of the advanceTax property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getAdvanceTax() {
        return advanceTax;
    }

    /**
     * Sets the value of the advanceTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setAdvanceTax(BigInteger value) {
        this.advanceTax = value;
    }

    /**
     * Gets the value of the tds property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
   

    /**
     * Gets the value of the tcs property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    

    public BigInteger getTds() {
		return tds;
	}

	public void setTds(BigInteger tds) {
		this.tds = tds;
	}

	public BigInteger getTcs() {
		return tcs;
	}

	public void setTcs(BigInteger tcs) {
		this.tcs = tcs;
	}

	/**
     * Sets the value of the tcs property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
   

    /**
     * Gets the value of the selfAssessmentTax property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getSelfAssessmentTax() {
        return selfAssessmentTax;
    }

    /**
     * Sets the value of the selfAssessmentTax property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setSelfAssessmentTax(BigInteger value) {
        this.selfAssessmentTax = value;
    }

    /**
     * Gets the value of the totalTaxesPaid property.
     * 
     * @return
     *     possible object is
     *     {@link BigInteger }
     *     
     */
    public BigInteger getTotalTaxesPaid() {
        return totalTaxesPaid;
    }

    /**
     * Sets the value of the totalTaxesPaid property.
     * 
     * @param value
     *     allowed object is
     *     {@link BigInteger }
     *     
     */
    public void setTotalTaxesPaid(BigInteger value) {
        this.totalTaxesPaid = value;
    }

}
