//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.8-b130911.1802 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.03.14 at 03:31:43 PM IST 
//


package com.itd.efiling.offline.ITR4.model;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="LoanOrDepositSec269SS" type="{http://incometaxindiaefiling.gov.in/master}DtlsOfTransDurPrevYr" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="ReceiptExcSec269ST" type="{http://incometaxindiaefiling.gov.in/master}DtlsOfTransDurPrevYr" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="PaymntExcSec269ST" type="{http://incometaxindiaefiling.gov.in/master}DtlsOfTransDurPrevYr" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="RepaymntMadeSec269T" type="{http://incometaxindiaefiling.gov.in/master}DtlsOfTransDurPrevYr" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element name="RepaymntRcvdSec269T" type="{http://incometaxindiaefiling.gov.in/master}DtlsOfTransDurPrevYr" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "loanOrDepositSec269SS",
    "receiptExcSec269ST",
    "paymntExcSec269ST",
    "repaymntMadeSec269T",
    "repaymntRcvdSec269T"
})
@XmlRootElement(name = "ScheduleCT")
public class ScheduleCT {

    @XmlElement(name = "LoanOrDepositSec269SS")
    protected List<DtlsOfTransDurPrevYr> loanOrDepositSec269SS;
    @XmlElement(name = "ReceiptExcSec269ST")
    protected List<DtlsOfTransDurPrevYr> receiptExcSec269ST;
    @XmlElement(name = "PaymntExcSec269ST")
    protected List<DtlsOfTransDurPrevYr> paymntExcSec269ST;
    @XmlElement(name = "RepaymntMadeSec269T")
    protected List<DtlsOfTransDurPrevYr> repaymntMadeSec269T;
    @XmlElement(name = "RepaymntRcvdSec269T")
    protected List<DtlsOfTransDurPrevYr> repaymntRcvdSec269T;

    /**
     * Gets the value of the loanOrDepositSec269SS property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the loanOrDepositSec269SS property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getLoanOrDepositSec269SS().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DtlsOfTransDurPrevYr }
     * 
     * 
     */
    public List<DtlsOfTransDurPrevYr> getLoanOrDepositSec269SS() {
        if (loanOrDepositSec269SS == null) {
            loanOrDepositSec269SS = new ArrayList<DtlsOfTransDurPrevYr>();
        }
        return this.loanOrDepositSec269SS;
    }

    /**
     * Gets the value of the receiptExcSec269ST property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the receiptExcSec269ST property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getReceiptExcSec269ST().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DtlsOfTransDurPrevYr }
     * 
     * 
     */
    public List<DtlsOfTransDurPrevYr> getReceiptExcSec269ST() {
        if (receiptExcSec269ST == null) {
            receiptExcSec269ST = new ArrayList<DtlsOfTransDurPrevYr>();
        }
        return this.receiptExcSec269ST;
    }

    /**
     * Gets the value of the paymntExcSec269ST property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the paymntExcSec269ST property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPaymntExcSec269ST().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DtlsOfTransDurPrevYr }
     * 
     * 
     */
    public List<DtlsOfTransDurPrevYr> getPaymntExcSec269ST() {
        if (paymntExcSec269ST == null) {
            paymntExcSec269ST = new ArrayList<DtlsOfTransDurPrevYr>();
        }
        return this.paymntExcSec269ST;
    }

    /**
     * Gets the value of the repaymntMadeSec269T property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the repaymntMadeSec269T property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRepaymntMadeSec269T().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DtlsOfTransDurPrevYr }
     * 
     * 
     */
    public List<DtlsOfTransDurPrevYr> getRepaymntMadeSec269T() {
        if (repaymntMadeSec269T == null) {
            repaymntMadeSec269T = new ArrayList<DtlsOfTransDurPrevYr>();
        }
        return this.repaymntMadeSec269T;
    }

    /**
     * Gets the value of the repaymntRcvdSec269T property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the repaymntRcvdSec269T property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRepaymntRcvdSec269T().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link DtlsOfTransDurPrevYr }
     * 
     * 
     */
    public List<DtlsOfTransDurPrevYr> getRepaymntRcvdSec269T() {
        if (repaymntRcvdSec269T == null) {
            repaymntRcvdSec269T = new ArrayList<DtlsOfTransDurPrevYr>();
        }
        return this.repaymntRcvdSec269T;
    }

}
