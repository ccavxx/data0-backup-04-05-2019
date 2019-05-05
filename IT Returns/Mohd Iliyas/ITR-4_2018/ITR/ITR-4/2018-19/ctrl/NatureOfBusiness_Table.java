package com.itd.efiling.offline.ITR4.ctrl;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;

import com.itd.efiling.offline.ITR4.model.NatOfBus;
import com.itd.efiling.offline.ITR4.model.NatureOfBusiness;
import com.itd.efiling.offline.ITR4.model.TDSonSalary;
import com.itd.efiling.offline.ITR4.model.Us44AeHeavy;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.dialog.MessageDialogCtrl;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;
import com.itd.efiling.offline.javafx.ui.components.ValidationAware;

public class NatureOfBusiness_Table extends TableViewController<NatureOfBusiness> implements Initializable{

	@FXML
	Button addRowBtn,copyRowBtn;
	
	Boolean flag=false;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		
		
		ITRView form = (ITRView) Form.getForm();
		form.setNatureOfBusinessController(this);
		
	}

	@Override
	public NatureOfBusiness getNewBean() {
		
		RefHolders.limitRows=true;
		List<NatureOfBusiness>  list=(List<NatureOfBusiness>) OnChangeUtil.getElementValueByTarget("itr.itr4.natOfBus.natureOfBusiness");
	
		if(RefHolders.add == true)
		{
			if(RefHolders.cancel == true)
			{
				
				if(list.size()-1 == 1)
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
				
				if(list.size() == 2)
				{
					
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					
					RefHolders.add = false;
				}
				else if(list.size() == 3)
				{
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.code").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName1").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName2").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName3").setDisable(true);
					RefHolders.add = false;
				}
					
				
			}
		}
		else if(RefHolders.copy == true)
		{
			if(RefHolders.cancel == true)
			{
				
				if(list.size()-1 == 1)
				{
					addRowBtn.setDisable(false);
					copyRowBtn.setDisable(false);
					
					
				}
				else if(list.size() == 3)
				{
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					
					RefHolders.add = false;
				}
				RefHolders.cancel = false;
				RefHolders.add = false;
				RefHolders.delete = false;
				RefHolders.copy=false;
			}
			
			else
			{
				if(list.size() == 2)
				{
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					
					RefHolders.cancel = false;
					RefHolders.add = false;
					RefHolders.delete = false;
					RefHolders.copy=false;
				}
				else if(list.size() == 3)
				{
					RefHolders.cancel = false;
					RefHolders.add = false;
					RefHolders.delete = false;
					RefHolders.copy=false;
					RefHolders.add = false;
					addRowBtn.setDisable(true);
					copyRowBtn.setDisable(true);
					OnChangeUtil.setElementValueByTargetName("itr.itr4.natOfBus.natureOfBusiness.tradeName1", null);
					ValidationUtil.ALL_FIELDS_MAP.get("itr.itr4.natOfBus.natureOfBusiness.tradeName1").setData(null);
					
					
				}
				
			}
		}
		else if(RefHolders.edit == true)
		{
			ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.code").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName1").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName2").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName3").setDisable(false);
			RefHolders.cancel = false;
			RefHolders.add = false;
			RefHolders.delete = false;
			RefHolders.copy=false;
			RefHolders.edit=false;
		}
		else if(RefHolders.delete == true)
		{
			if(list.size()-1 == 1)
			{
				
				addRowBtn.setDisable(false);
				copyRowBtn.setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.code").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName1").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName2").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("natureOfBusinessController.type.tradeName3").setDisable(false);
				RefHolders.cancel = false;
				RefHolders.add = false;
				RefHolders.delete = false;
				RefHolders.copy=false;
			}
		}	
		else if(RefHolders.cancel == true)
		{
			
			if(list.size()-1 == 1)
			{
				addRowBtn.setDisable(false);
				copyRowBtn.setDisable(false);
				RefHolders.cancel = false;
				
				RefHolders.copy=false;
			}
		}
	   
	 
	
		return new NatureOfBusiness();
	}

	



}
