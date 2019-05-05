package com.itd.efiling.offline.ITR4.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "tan",
    "employerOrDeductorOrCollecterName"
})

@XmlRootElement(name = "EmployerOrDeductorOrCollectDetl")
public class EmployerOrDeductorOrCollectDetl {

    @XmlElement(name = "TAN", required = true)
    private String tan;
    
	@XmlElement(name = "EmployerOrDeductorOrCollecterName", required = true)
    private String employerOrDeductorOrCollecterName;
    
    public String getTan() {
		return tan;
	}

	public void setTan(String tan) {
		this.tan = tan;
	}

    public String getEmployerOrDeductorOrCollecterName() {
        return employerOrDeductorOrCollecterName;
    }

    public void setEmployerOrDeductorOrCollecterName(String value) {
        this.employerOrDeductorOrCollecterName = value;
    }

}
