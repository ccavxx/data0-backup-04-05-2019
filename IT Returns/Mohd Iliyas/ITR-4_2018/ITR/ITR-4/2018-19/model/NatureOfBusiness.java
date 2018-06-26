package com.itd.efiling.offline.ITR4.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
		 "code",
		    "tradeName1",
		    "tradeName2",
		    "tradeName3"
})
public class NatureOfBusiness {

    @XmlElement(name = "Code")
    protected String code;
    @XmlElement(name = "TradeName1")
    protected String tradeName1;
    @XmlElement(name = "TradeName2")
    protected String tradeName2;
    @XmlElement(name = "TradeName3")
    protected String tradeName3;

    /**
     * Gets the value of the code property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCode() {
        return code;
    }

    /**
     * Sets the value of the code property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCode(String value) {
        this.code = value;
    }

    /**
     * Gets the value of the tradeName1 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTradeName1() {
        return tradeName1;
    }

    /**
     * Sets the value of the tradeName1 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTradeName1(String value) {
        this.tradeName1 = value;
    }

    /**
     * Gets the value of the tradeName2 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTradeName2() {
        return tradeName2;
    }

    /**
     * Sets the value of the tradeName2 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTradeName2(String value) {
        this.tradeName2 = value;
    }

    /**
     * Gets the value of the tradeName3 property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTradeName3() {
        return tradeName3;
    }

    /**
     * Sets the value of the tradeName3 property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTradeName3(String value) {
        this.tradeName3 = value;
    }

}
