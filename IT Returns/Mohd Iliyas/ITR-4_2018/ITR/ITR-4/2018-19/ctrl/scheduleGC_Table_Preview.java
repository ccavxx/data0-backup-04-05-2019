package com.itd.efiling.offline.ITR4.ctrl;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.DoneeWithPan;
import com.itd.efiling.offline.ITR4.model.DtlsOfTransDurPrevYr;
import com.itd.efiling.offline.ITR4.model.ScheduleGC;
import com.itd.efiling.offline.ITR4.model.ScheduleGC.ScheduleGCDtls;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.geometry.Orientation;
import javafx.scene.control.Label;
import javafx.scene.control.Separator;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;

public class scheduleGC_Table_Preview implements Initializable{

	@FXML
	GridPane grid,grid1,grid2,grid3;
	
	@FXML
	Label lender_pan,trans_nature,agg_amount,premises,total;
	
	@SuppressWarnings("unchecked")
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		List<ScheduleGC.ScheduleGCDtls> list =(List<ScheduleGC.ScheduleGCDtls>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.scheduleGC_Table").getTableView().getItems();
	
		
		String d2 = null;
		for(int i=0;i<list.size();i++)               
		{
			
			
			ScheduleGCDtls td = list.get(i);
			
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(50);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 10;");
			grid.add(sno, 0, i+1);
			
			Label name=new Label();
			name.setText(td.getRegistrationNo());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(50);
			HBox hbox_name=new HBox();
			hbox_name.getChildren().add(name);
			hbox_name.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 10;");
			grid.add(hbox_name, 1, i+1);
			
			Label address=new Label();
			address.setText(td.getTonnageCapacity().toString());
			address.setWrapText(true);
			address.setMaxWidth(205);
			address.setMinHeight(50);
			HBox hbox_address=new HBox();
			hbox_address.getChildren().add(address);
			hbox_address.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 40;");
			grid.add(hbox_address, 2, i+1);
			
			try {
				SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
				Date d1 = form1.parse(td.getDateOfPurchase().toString());
				SimpleDateFormat dat = new SimpleDateFormat("dd/MM/yyyy");
				 d2 = dat.format(d1);
				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			Label cityDist=new Label();
		    cityDist.setText(d2);
		    cityDist.setWrapText(true);
			cityDist.setMaxWidth(200);
			cityDist.setMinHeight(50);
			HBox hbox_city=new HBox();
			hbox_city.getChildren().add(cityDist);
			hbox_city.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 10;");
			grid.add(hbox_city, 3, i+1);
			
			Label CostOfAcquisition=new Label();
			CostOfAcquisition.setText(td.getCostOfAcquisition().toString());
			CostOfAcquisition.setWrapText(true);
			CostOfAcquisition.setMaxWidth(165);
			CostOfAcquisition.setMinHeight(50);
			HBox hbox_CostOfAcquisition=new HBox();
			hbox_CostOfAcquisition.getChildren().add(CostOfAcquisition);
			hbox_CostOfAcquisition.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 40;");
			grid.add(hbox_CostOfAcquisition, 4, i+1);
			
			Label road=new Label();
			road.setText(td.getModeofFinance());
			road.setWrapText(true);
			road.setMaxWidth(200);
			road.setMinHeight(50);
			HBox hbox_road=new HBox();
			hbox_road.getChildren().add(road);
			hbox_road.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 40;");
			grid.add(hbox_road, 5, i+1);
			
			Label locality=new Label();
			locality.setText(td.getHoldingPeriod().toString());
			locality.setWrapText(true);
			locality.setMaxWidth(200);
			locality.setMinHeight(50);
			HBox hbox_locality=new HBox();
			hbox_locality.getChildren().add(locality);
			hbox_locality.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 90;");
			grid.add(hbox_locality, 6, i+1);
			
			Label town=new Label();
			town.setText(td.getIncomePerVehicle().toString());
			town.setWrapText(true);
			town.setMaxWidth(200);
			town.setMinHeight(50);
			HBox hbox_town=new HBox();
			hbox_town.getChildren().add(town);
			hbox_town.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 60;");
			grid.add(hbox_town, 7, i+1);
			
			
			Label amount=new Label();
			amount.setText(td.getDeemedInc().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(50);
			HBox hbox_amount=new HBox();
			hbox_amount.getChildren().add(amount);
			hbox_amount.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 40;");
			grid.add(hbox_amount, 8, i+1);

		}
		String get_total=OnChangeUtil.getElementValueByTargetName("itr.itr4.totalHeavyVehcl");
		if(get_total.equals("empty"))
		{
			total.setText("0");
		}
		else
		{
			total.setText(get_total);
		}
		
		
		
	}



}
