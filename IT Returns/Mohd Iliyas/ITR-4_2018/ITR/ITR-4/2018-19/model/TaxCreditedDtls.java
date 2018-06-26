package com.itd.efiling.offline.ITR4.model;


import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;


public class TaxCreditedDtls {

	@XmlElement(name = "PaymentDetail", required = true)
	protected List<TaxCredited> taxCredited;

	public List<TaxCredited> getTaxCredited() {
		if (taxCredited == null) {
			taxCredited = new ArrayList<TaxCredited>();
		}
		return taxCredited;
	}

	public void setTaxCredited(List<TaxCredited> taxCredited) {
		this.taxCredited = taxCredited;
	}

	
	
	
	/*public List<TaxCredited> () {
		if (taxCredited == null) {
			taxCredited = new ArrayList<TaxCredited>();
		}
		return taxCredited;
	}

	public void setPaymentDetail(final List<TaxCredited> taxCredited) {
		this.taxCredited = taxCredited;
	}*/

}
