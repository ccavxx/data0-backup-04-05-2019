package com.itd.efiling.offline.ITR4.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "firstName",
    "middleName",
    "surNameOrOrgName"
})
@XmlRootElement(name = "AssesseeName")
public class AssesseeName {

    @XmlElement(name = "FirstName")
    private String firstName;
    
    @XmlElement(name = "MiddleName")
    private String middleName;
    
    @XmlElement(name = "SurNameOrOrgName", required = true)
    private String surNameOrOrgName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String value) {
        this.firstName = value;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String value) {
        this.middleName = value;
    }

    public String getSurNameOrOrgName() {
        return surNameOrOrgName;
    }

    public void setSurNameOrOrgName(String value) {
        this.surNameOrOrgName = value;
    }

}
