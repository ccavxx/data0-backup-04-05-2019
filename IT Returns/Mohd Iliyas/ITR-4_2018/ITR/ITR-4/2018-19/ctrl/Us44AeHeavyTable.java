package com.itd.efiling.offline.ITR4.ctrl;

import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.ResourceBundle;

import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import com.itd.efiling.offline.ITR4.model.NatureOfBusiness;
import com.itd.efiling.offline.ITR4.model.Us44AeHeavy;
import com.itd.efiling.offline.ITR4.model.ScheduleGC.ScheduleGCDtls;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.dialog.MessageDialogCtrl;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

public class Us44AeHeavyTable extends TableViewController<Us44AeHeavy> implements Initializable{

	
	@FXML 
	Button addRowBtn,copyRowBtn;
	
	
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		
//		TableColumn<Us44AeHeavy,Button> button = new TableColumn<Us44AeHeavy,Button>("GET DETAILS");
// 
//		button.setCellFactory(column -> {
//			return new TableCell<Us44AeHeavy, Button>() {
//				@Override
//				protected void updateItem(Button item, boolean empty) {
//					super.updateItem(item, empty);
//					
//					
//						
//					
//						
//					   	setGraphic(new Button("GET DETAILS"));
//					
//				}
//			};
//			
//			//button.setOnAction(e -> edit(cell.getItem(), primaryStage));
//		});
//		TableView<Us44AeHeavy> tableView = new TableView<Us44AeHeavy>();
//		tableView.getColumns().add(button);
		
		ITRView form = (ITRView) Form.getForm();
		form.setUs44AeHeavyController(this);
		
		
	}

	@Override
	public Us44AeHeavy getNewBean() {
		RefHolders.limitRows=true;
		List<NatureOfBusiness>  list=(List<NatureOfBusiness>) OnChangeUtil.getElementValueByTarget("itr.itr4.us44AeHeavy");
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
					ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.holdingPeriod").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.incomePerVehicle").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.deemedInc").setDisable(true);
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
					ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.holdingPeriod").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.incomePerVehicle").setDisable(true);
					ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.deemedInc").setDisable(true);
					
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
			ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.holdingPeriod").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.incomePerVehicle").setDisable(false);
			ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.deemedInc").setDisable(false);
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
				ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.holdingPeriod").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.incomePerVehicle").setDisable(false);
				ValidationUtil.ALL_FIELDS_MAP.get("us44AeHeavyController.type.deemedInc").setDisable(false);
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
	   
	 	
		return new Us44AeHeavy();
	
		
		
	}

	



}
