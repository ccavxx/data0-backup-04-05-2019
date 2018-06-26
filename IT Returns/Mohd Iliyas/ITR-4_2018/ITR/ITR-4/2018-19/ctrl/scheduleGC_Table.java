package com.itd.efiling.offline.ITR4.ctrl;

import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;

import com.itd.efiling.offline.ITR4.model.NatureOfBusiness;
import com.itd.efiling.offline.ITR4.model.ScheduleGC;
import com.itd.efiling.offline.ITR4.model.ScheduleGC.ScheduleGCDtls;
import com.itd.efiling.offline.ITR4.model.Us44AeHeavy;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.dialog.MessageDialogCtrl;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

public class scheduleGC_Table extends TableViewController<ScheduleGC.ScheduleGCDtls> implements Initializable{

	
	@FXML 
	Button addRowBtn,copyRowBtn;
	
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setSchedule_GC(this);
		
	}

	@Override
	public ScheduleGCDtls getNewBean() {
		
		List<ScheduleGC>  list=(List<ScheduleGC>) OnChangeUtil.getElementValueByTarget("itr.itr4.scheduleGC.scheduleGCDtls");

		
		if(RefHolders.add == true)
		{
			if(RefHolders.cancel == true)
			{
				
				if(list.size()-1 == 8)
				{
					addRowBtn.setDisable(false);
					copyRowBtn.setDisable(false);
					
					RefHolders.cancel = false;
				}
				RefHolders.cancel = false;
				RefHolders.add = false;
			}
			else
			{
				
				if(list.size() == 9)
				{
					
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					
					RefHolders.add = false;
				}
				else if(list.size() == 10)
				{
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.registrationNo").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.tonnageCapacity").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.costOfAcquisition").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.dateOfPurchase").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.modeofFinance").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.holdingPeriod").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.incomePerVehicle").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.deemedInc").setDisable(true);
					RefHolders.add = false;
				}
					
				
			}
		}
		else if(RefHolders.copy == true)
		{
			if(RefHolders.cancel == true)
			{
				
				if(list.size()-1 == 8)
				{
					addRowBtn.setDisable(false);
					copyRowBtn.setDisable(false);
					
					
				}
				else if(list.size() == 10)
				{
					
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.registrationNo").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.tonnageCapacity").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.costOfAcquisition").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.dateOfPurchase").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.modeofFinance").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.holdingPeriod").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.incomePerVehicle").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.deemedInc").setDisable(true);
					
					RefHolders.add = false;
				}
				RefHolders.cancel = false;
				RefHolders.add = false;
				RefHolders.delete = false;
				RefHolders.copy=false;
			}
			
			else
			{
				if(list.size() == 9)
				{
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					
					RefHolders.cancel = false;
					RefHolders.add = false;
					RefHolders.delete = false;
					RefHolders.copy=false;
				}
				else if(list.size() == 10)
				{
					RefHolders.cancel = false;
					RefHolders.add = false;
					RefHolders.delete = false;
					RefHolders.copy=false;
					RefHolders.add = false;
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					OnChangeUtil.setElementValueByTargetName("itr.itr4.scheduleGC.scheduleGCDtls.tonnageCapacity", null);
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.scheduleGC.scheduleGCDtls.tonnageCapacity").setData(null);
					
					
				}
				
			}
		}
		else if(RefHolders.edit == true)
		{
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.registrationNo").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.tonnageCapacity").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.costOfAcquisition").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.dateOfPurchase").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.modeofFinance").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.holdingPeriod").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.incomePerVehicle").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.deemedInc").setDisable(false);
			RefHolders.cancel = false;
			RefHolders.add = false;
			RefHolders.delete = false;
			RefHolders.copy=false;
			RefHolders.edit=false;
		}
		else if(RefHolders.delete == true)
		{
			if(list.size()-1 == 8)
			{
				
				addRowBtn.setDisable(false);
				copyRowBtn.setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.registrationNo").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.tonnageCapacity").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.costOfAcquisition").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.dateOfPurchase").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.modeofFinance").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.holdingPeriod").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.incomePerVehicle").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("schedule_GC.type.deemedInc").setDisable(false);
				RefHolders.cancel = false;
				RefHolders.add = false;
				RefHolders.delete = false;
				RefHolders.copy=false;
			}
		}	
		else if(RefHolders.cancel == true)
		{
			
			if(list.size()-1 == 8)
			{
				addRowBtn.setDisable(false);
				copyRowBtn.setDisable(false);
				RefHolders.cancel = false;
				
				RefHolders.copy=false;
			}
		}
	   
	 	
		return new ScheduleGCDtls();
	}

	



}
