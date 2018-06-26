package com.itd.efiling.offline.ITR4.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import com.itd.efiling.offline.common.jaxb.adapters.DateAdapter;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "declaration",
    "capacity",
    "place",
    "date"
})

@XmlRootElement(name = "Verification")
public class Verification {

    @XmlElement(name = "Declaration", required = true)
    private Declaration declaration;
    
    @XmlElement(name = "Capacity", required = true)
    protected String capacity;
    
    @XmlElement(name = "Place", required = true)
    private String place;
    
    @XmlElement(name = "Date", required = true)
    @XmlSchemaType(name = "date")
    @XmlJavaTypeAdapter(DateAdapter.class)
    private Date date;

    public Declaration getDeclaration() {
        return declaration;
    }

    public void setDeclaration(Declaration value) {
        this.declaration = value;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String value) {
        this.place = value;
    }

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

}
