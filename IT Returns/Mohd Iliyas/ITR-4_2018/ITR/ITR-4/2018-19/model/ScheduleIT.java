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
    "taxPayment",
    "totalTaxPayments"
})

@XmlRootElement(name = "ScheduleIT")
public class ScheduleIT {

    @XmlElement(name = "TaxPayment", required = true)
    private List<TaxPayment> taxPayment;
    
    @XmlElement(name = "TotalTaxPayments", required = true, defaultValue = "0")
    private BigInteger totalTaxPayments;

    public List<TaxPayment> getTaxPayment() {
        if (taxPayment == null) {
            taxPayment = new ArrayList<TaxPayment>();
        }
        return this.taxPayment;
    }

    public void setTaxPayment(List<TaxPayment> taxPayment) {
		this.taxPayment = taxPayment;
	}

	public BigInteger getTotalTaxPayments() {
        return totalTaxPayments;
    }

    public void setTotalTaxPayments(BigInteger value) {
        this.totalTaxPayments = value;
    }

}
