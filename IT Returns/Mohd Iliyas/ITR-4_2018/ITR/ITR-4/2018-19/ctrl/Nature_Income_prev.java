package com.itd.efiling.offline.ITR4.ctrl;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.OthersIncDtls;
import com.itd.efiling.offline.ITR4.model.TCS;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;

public class Nature_Income_prev implements Initializable{
	@FXML
	GridPane grid;
	private Node children;
	 
	@FXML
	Label total;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		 ITRView form = (ITRView) Form.getForm();
		 LOG.info("value in controller"+form.getTaxDetailsTabController());
		List<OthersIncDtls> list =(List<OthersIncDtls>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.Nature_Income").getTableView().getItems();
		
		LOG.info("list message ::"+list.size());
		
		for(int i =0;i<list.size();i++)
		{
			
				OthersIncDtls td = list.get(i);
				Label label=new Label();
				label.setText(String.valueOf(i+1));
				label.setWrapText(true);
				label.setMaxWidth(200);
				label.setMinHeight(50);
				HBox sno=new HBox();
				sno.getChildren().add(label);
				sno.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(sno, 0, i+1);
				
				Label tan=new Label();
				tan.setText(ComboBoxOptionsCacher.getValueForKey("natureDesc",td.getNatureDesc()));
				tan.setWrapText(true);
				tan.setMaxWidth(200);
				tan.setMinHeight(50);
				HBox hbox_tan=new HBox();
				hbox_tan.getChildren().add(tan);
				hbox_tan.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_tan, 1, i+1);
				
				Label collector=new Label();
				collector.setText(td.getOthNatOfInc());
				collector.setWrapText(true);
				collector.setMaxWidth(200);
				collector.setMinHeight(50);
				HBox hbox_collector=new HBox();
				hbox_collector.getChildren().add(collector);
				hbox_collector.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_collector, 2, i+1);
				
				Label amount=new Label();
				amount.setText(td.getOthAmount().toString());
				amount.setWrapText(true);
				amount.setMaxWidth(200);
				amount.setMinHeight(50);
				HBox hbox_amount=new HBox();
				hbox_amount.getChildren().add(amount);
				hbox_amount.setStyle("-fx-padding:0 0 0 80;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_amount, 3, i+1);
				
			
			
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxExmpIntIncDtls.othersInc.othersIncTotal").equals("empty"))
		{
			total.setText(OnChangeUtil.getElementValueByTargetName(""));
		}
		else
		{
			total.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.taxExmpIntIncDtls.othersInc.othersIncTotal"));
		}
		
}
}
