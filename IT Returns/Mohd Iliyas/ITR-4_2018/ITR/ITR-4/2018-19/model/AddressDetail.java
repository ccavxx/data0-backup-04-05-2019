package com.itd.efiling.offline.ITR4.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "addrDetail",
    "cityOrTownOrDistrict",
    "stateCode",
    "pinCode"
})
@XmlRootElement(name = "AddressDetail")
public class AddressDetail {

    @XmlElement(name = "AddrDetail", required = true)
    private String addrDetail;
    
    @XmlElement(name = "CityOrTownOrDistrict", required = true)
    private String cityOrTownOrDistrict;
    
    @XmlElement(name = "StateCode", required = true)
    private String stateCode;
    
    @XmlElement(name = "PinCode", required = true)
    private String pinCode;

    public String getAddrDetail() {
        return addrDetail;
    }

    public void setAddrDetail(String value) {
        this.addrDetail = value;
    }

    public String getCityOrTownOrDistrict() {
        return cityOrTownOrDistrict;
    }

    public void setCityOrTownOrDistrict(String value) {
        this.cityOrTownOrDistrict = value;
    }

    public String getStateCode() {
        return stateCode;
    }

    public void setStateCode(String value) {
        this.stateCode = value;
    }

	public String getPinCode() {
		return pinCode;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}
   
}
