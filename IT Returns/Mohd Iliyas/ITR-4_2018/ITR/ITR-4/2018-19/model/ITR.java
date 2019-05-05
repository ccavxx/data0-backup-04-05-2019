package com.itd.efiling.offline.ITR4.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {"itr4"})

@XmlRootElement(name ="ITR",namespace = "http://incometaxindiaefiling.gov.in/main")
public class ITR {

    @XmlElement(name ="ITR4", namespace = "http://incometaxindiaefiling.gov.in/ITR4", required = true)
    private ITR4 itr4;

	public ITR4 getItr4() {
		return itr4;
	}

	public void setItr4(ITR4 itr4) {
		this.itr4 = itr4;
	}

    
}
