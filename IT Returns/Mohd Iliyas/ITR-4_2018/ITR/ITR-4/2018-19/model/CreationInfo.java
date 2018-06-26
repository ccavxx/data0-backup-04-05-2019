package com.itd.efiling.offline.ITR4.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import com.itd.efiling.offline.common.config.Configs;
import com.itd.efiling.offline.common.jaxb.adapters.DateAdapter;
import com.itd.efiling.offline.common.util.DateUtil;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = { "swVersionNo", "swCreatedBy", "xmlCreatedBy", "xmlCreationDate", "intermediaryCity", "digest"})

@XmlRootElement(name = "CreationInfo")
public class CreationInfo {

    @XmlElement(name = "SWVersionNo", required = true, defaultValue = "1.0")
    private String swVersionNo;

    @XmlElement(name = "SWCreatedBy", required = true)
    private String swCreatedBy;
    
    @XmlElement(name = "XMLCreatedBy", required = true)
    private String xmlCreatedBy;
    
    @XmlElement(name = "XMLCreationDate", required = true)
    @XmlSchemaType(name = "date")
    @XmlJavaTypeAdapter(DateAdapter.class)
    private Date xmlCreationDate;
    
    @XmlElement(name = "IntermediaryCity", required = true, defaultValue = "Delhi")
    private String intermediaryCity;
    
    @XmlElement(name = "Digest", required = true)
    private String digest;

    public CreationInfo() throws ParseException {
        super();

        this.swVersionNo = Configs.getConfigProperty("xml.soft.version.no");
        this.swCreatedBy = Configs.getConfigProperty("xml.soft.created.by");
        this.xmlCreatedBy = Configs.getConfigProperty("xml.created.by");
        this.xmlCreationDate = DateUtil.toXmlDate(new Date()); 
        this.setIntermediaryCity("Delhi");
        this.setDigest("-");
    }
    public CreationInfo(final String digest) throws ParseException {
        super();

        this.swVersionNo = Configs.getConfigProperty("xml.soft.version.no");
        this.swCreatedBy = Configs.getConfigProperty("xml.soft.created.by");
        this.xmlCreatedBy = Configs.getConfigProperty("xml.created.by");
        this.xmlCreationDate = DateUtil.toXmlDate(new Date()); 
        this.setIntermediaryCity("Delhi");
        this.setDigest(digest);
    }
    
    public String getSWVersionNo() {
        return swVersionNo;
    }

    public void setSWVersionNo(String value) {
        this.swVersionNo = value;
    }

    public String getSWCreatedBy() {
        return swCreatedBy;
    }

    public void setSWCreatedBy(String value) {
        this.swCreatedBy = value;
    }

    public String getXMLCreatedBy() {
        return xmlCreatedBy;
    }

    public void setXMLCreatedBy(String value) {
        this.xmlCreatedBy = value;
    }

    public Date getXMLCreationDate() {
        return xmlCreationDate;
    }

    public void setXMLCreationDate(Date value) {
        this.xmlCreationDate = value;
    }

    public String getIntermediaryCity() {
        return intermediaryCity;
    }

    public void setIntermediaryCity(String value) {
        this.intermediaryCity = value;
    }

    public String getDigest() {
        return digest;
    }

    public void setDigest(String value) {
        this.digest = value;
    }

}
