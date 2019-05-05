package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TaxPayment;
import com.itd.efiling.offline.ITR4.model.Us44AeHeavy;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;

public class Preview_44  implements Initializable{
	
	@FXML
	GridPane grid;
	private Node children;
	
	@FXML
	Label total;
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		 ITRView form = (ITRView) Form.getForm();
		List<Us44AeHeavy> list =(List<Us44AeHeavy>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.Us44AeHeavyTable").getTableView().getItems();
		
		for(int i =0;i<list.size();i++)
		{
			Us44AeHeavy td = list.get(i);
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(50);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 30;");
			grid.add(sno, 0, i+1);
			
			Label locality=new Label();
			locality.setText(td.getHoldingPeriod().toString());
			locality.setWrapText(true);
			locality.setMaxWidth(200);
			locality.setMinHeight(50);
			HBox hbox_locality=new HBox();
			hbox_locality.getChildren().add(locality);
			hbox_locality.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 30;");
			grid.add(hbox_locality, 1, i+1);
			
			Label town=new Label();
			town.setText(td.getIncomePerVehicle().toString());
			town.setWrapText(true);
			town.setMaxWidth(200);
			town.setMinHeight(50);
			HBox hbox_town=new HBox();
			hbox_town.getChildren().add(town);
			hbox_town.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 30;");
			grid.add(hbox_town, 2, i+1);
			
			
			Label amount=new Label();
			amount.setText(td.getDeemedInc().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(50);
			HBox hbox_amount=new HBox();
			hbox_amount.getChildren().add(amount);
			hbox_amount.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 30;");
			grid.add(hbox_amount, 3, i+1);
			
			
			/*grid.add(new Label(td.getHoldingPeriod().toString()),1,i+1);
			grid.add(new Label(td.getIncomePerVehicle().toString()),2,i+1);
			grid.add(new Label(td.getDeemedInc().toString()),3,i+1);*/
			
			
			
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
