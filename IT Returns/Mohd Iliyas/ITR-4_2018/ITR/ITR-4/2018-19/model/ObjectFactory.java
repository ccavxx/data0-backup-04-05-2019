package com.itd.efiling.offline.ITR4.model;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;

@XmlRegistry
public class ObjectFactory {

	private static final QName ITR_QNAME = new QName("http://incometaxindiaefiling.gov.in/main", "ITR");

	public ObjectFactory() {

	}

	@XmlElementDecl(namespace = "http://incometaxindiaefiling.gov.in/main", name = "ITR", defaultValue = "0")
	public final JAXBElement<ITR> createITR(final ITR value) {

		return new JAXBElement<ITR>(ITR_QNAME, ITR.class, null, value);
	}

}
