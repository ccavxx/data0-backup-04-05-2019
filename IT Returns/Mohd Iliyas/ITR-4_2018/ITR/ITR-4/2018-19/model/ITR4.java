package com.itd.efiling.offline.ITR4.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {"creationInfo", "formITR4", "personalInfo", "filingStatus", "itr1IncomeDeductions",
		"taxComputation", "taxPaid", "refund","schedule80G", "taxExmpIntIncDtls","verification",
	    "taxReturnPreparer", "natOfBus", "scheduleBP","scheduleIT","scheduleTCS","tdSonSalaries", "tdSonOthThanSals","tdsDtls26QC",
	    "us44AeHeavy","totalHeavyVehcl","scheduleAL" })


@XmlRootElement(name = "ITR4", namespace = "http://incometaxindiaefiling.gov.in/ITR4")
public class ITR4 {
	
    @XmlElement(name = "CreationInfo", required = true)
    private CreationInfo creationInfo;
    
	/*@XmlElement(name = "ITRDtls", required = true)
    private ITRDtls itrdtls;*/
   
	@XmlElement(name = "Form_ITR4", required = true)
    protected FormITR4 formITR4;
	
	//Done ITR-4
	@XmlElement(name = "PersonalInfo", required = true)
    protected PersonalInfo personalInfo;
	    
    @XmlElement(name = "FilingStatus", required = true)
    private FilingStatus filingStatus;
	    
    @XmlElement(name = "IncomeDeductions", required = true)
	private ITR4IncomeDeductions itr1IncomeDeductions;
    
	@XmlElement(name = "TaxComputation", required = true)
    private TaxComputation taxComputation;
	
	@XmlElement(name = "TaxPaid", required = true)
	 protected TaxPaid taxPaid;
    
    @XmlElement(name = "Refund", required = true)
    private Refund refund;
    
    @XmlElement(name = "Schedule80G")
    private Schedule80G schedule80G;
   
    @XmlElement(name = "TaxExmpIntIncDtls")
    protected TaxExmpIntIncDtls taxExmpIntIncDtls;
    
    @XmlElement(name = "Verification", required = true)
    private Verification verification;
    
    @XmlElement(name = "TaxReturnPreparer")
    protected TaxReturnPreparer taxReturnPreparer;
    
    @XmlElement(name = "NatOfBus")
    protected NatOfBus natOfBus;
    
    @XmlElement(name = "ScheduleBP", required = true)
    protected ScheduleBP scheduleBP;
 
    @XmlElement(name = "TotalHeavyVehcl")
    private BigInteger totalHeavyVehcl;
    
	@XmlElement(name = "ScheduleIT")
    protected ScheduleIT scheduleIT;
	
	@XmlElement(name = "ScheduleTCS")
    private ScheduleTCS scheduleTCS;
	
    @XmlElement(name = "TDSonSalaries")
    private TDSonSalaries tdSonSalaries;
    
    @XmlElement(name = "TDSonOthThanSals")
    private TDSonOthThanSals tdSonOthThanSals;
    
    @XmlElement(name = "TDSDtls26QC")
    protected TDSDtls26QC tdsDtls26QC;
    
    @XmlElement(name = "ScheduleAL")
    protected ScheduleAL scheduleAL;
    
    @XmlTransient
    protected BigInteger total;
    
    @XmlElement(name = "Us44aeHeavy")
    protected List<Us44AeHeavy> us44AeHeavy;
    
	public List<Us44AeHeavy> getUs44AeHeavy() {
		
		if (us44AeHeavy == null) {
			us44AeHeavy = new ArrayList<Us44AeHeavy>();
        }
       return this.us44AeHeavy;
   }

	public void setUs44AeHeavy(List<Us44AeHeavy> us44AeHeavy) {
		this.us44AeHeavy = us44AeHeavy;
	}

	/*public ITRDtls getItrdtls() {
		return itrdtls;
	}

	public void setItrdtls(ITRDtls itrdtls) {
		this.itrdtls = itrdtls;
	}*/

    public ITR4IncomeDeductions getItr1IncomeDeductions() {
		return itr1IncomeDeductions;
	}

	public void setItr1IncomeDeductions(ITR4IncomeDeductions itr1IncomeDeductions) {
		this.itr1IncomeDeductions = itr1IncomeDeductions;
	}

	

    public TaxComputation getTaxComputation() {
		return taxComputation;
	}

	public void setTaxComputation(TaxComputation taxComputation) {
		this.taxComputation = taxComputation;
	}

	public TDSonSalaries getTdSonSalaries() {
		return tdSonSalaries;
	}

	public void setTdSonSalaries(TDSonSalaries tdSonSalaries) {
		this.tdSonSalaries = tdSonSalaries;
	}

	
    public TDSonOthThanSals getTdSonOthThanSals() {
		return tdSonOthThanSals;
	}

	public void setTdSonOthThanSals(TDSonOthThanSals tdSonOthThanSals) {
		this.tdSonOthThanSals = tdSonOthThanSals;
	}

    public CreationInfo getCreationInfo() {
        return creationInfo;
    }

    public void setCreationInfo(CreationInfo value) {
        this.creationInfo = value;
    }

    public FormITR4 getFormITR4() {
		return formITR4;
	}

	public void setFormITR4(FormITR4 formITR4) {
		this.formITR4 = formITR4;
	}

	public PersonalInfo getPersonalInfo() {
        return personalInfo;
    }

    public void setPersonalInfo(PersonalInfo value) {
        this.personalInfo = value;
    }

    public FilingStatus getFilingStatus() {
        return filingStatus;
    }

    public void setFilingStatus(FilingStatus value) {
        this.filingStatus = value;
    }

  

    public TaxPaid getTaxPaid() {
        return taxPaid;
    }

    public void setTaxPaid(TaxPaid value) {
        this.taxPaid = value;
    }

    public Refund getRefund() {
        return refund;
    }

    public void setRefund(Refund value) {
        this.refund = value;
    }

    public Schedule80G getSchedule80G() {
        return schedule80G;
    }

    public void setSchedule80G(Schedule80G value) {
        this.schedule80G = value;
    }

    public ScheduleTCS getScheduleTCS() {
        return scheduleTCS;
    }

    public void setScheduleTCS(ScheduleTCS value) {
        this.scheduleTCS = value;
    }

   

    public ScheduleIT getScheduleIT() {
		return scheduleIT;
	}

	public void setScheduleIT(ScheduleIT scheduleIT) {
		this.scheduleIT = scheduleIT;
	}

    public TaxExmpIntIncDtls getTaxExmpIntIncDtls() {
		return taxExmpIntIncDtls;
	}

	public void setTaxExmpIntIncDtls(TaxExmpIntIncDtls taxExmpIntIncDtls) {
		this.taxExmpIntIncDtls = taxExmpIntIncDtls;
	}

	public Verification getVerification() {
        return verification;
    }

    public void setVerification(Verification value) {
        this.verification = value;
    }

	public NatOfBus getNatOfBus() {
		return natOfBus;
	}

	public void setNatOfBus(NatOfBus natOfBus) {
		this.natOfBus = natOfBus;
	}

	public ScheduleBP getScheduleBP() {
		return scheduleBP;
	}

	public void setScheduleBP(ScheduleBP scheduleBP) {
		this.scheduleBP = scheduleBP;
	}

	public TaxReturnPreparer getTaxReturnPreparer() {
		return taxReturnPreparer;
	}

	public void setTaxReturnPreparer(TaxReturnPreparer taxReturnPreparer) {
		this.taxReturnPreparer = taxReturnPreparer;
	}

	public ScheduleAL getScheduleAL() {
		return scheduleAL;
	}

	public void setScheduleAL(ScheduleAL scheduleAL) {
		this.scheduleAL = scheduleAL;
	}

	public BigInteger getTotalHeavyVehcl() {
		return totalHeavyVehcl;
	}

	public void setTotalHeavyVehcl(BigInteger totalHeavyVehcl) {
		this.totalHeavyVehcl = totalHeavyVehcl;
	}

	public TDSDtls26QC getTdsDtls26QC() {
		return tdsDtls26QC;
	}

	public void setTdsDtls26QC(TDSDtls26QC tdsDtls26QC) {
		this.tdsDtls26QC = tdsDtls26QC;
	}

	public BigInteger getTotal() {
		return total;
	}

	public void setTotal(BigInteger total) {
		this.total = total;
	}


	
	
}
