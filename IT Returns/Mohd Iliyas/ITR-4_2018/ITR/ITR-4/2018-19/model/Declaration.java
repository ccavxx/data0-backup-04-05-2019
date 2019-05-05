package com.itd.efiling.offline.ITR4.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "assesseeVerName",
        "fatherName",
        "assesseeVerPAN"
    })

@XmlRootElement(name = "Declaration")
public class Declaration {

	@XmlElement(name = "AssesseeVerName", required = true)
    private String assesseeVerName;
        
    @XmlElement(name = "FatherName", required = true)
    private String fatherName;
        
    @XmlElement(name = "AssesseeVerPAN", required = true)
    private String assesseeVerPAN;

    public String getAssesseeVerName() {
        return assesseeVerName;
    }

    public void setAssesseeVerName(String value) {
    	this.assesseeVerName = value;
    }

    public String getFatherName() {
    	return fatherName;
    }

    public void setFatherName(String value) {
    	this.fatherName = value;
    }

    public String getAssesseeVerPAN() {
    	return assesseeVerPAN;
    }

    public void setAssesseeVerPAN(String value) {
    	this.assesseeVerPAN = value;
    }

}
