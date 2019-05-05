package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TCS;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;

public class TaxCollectedAtSource_prev  implements Initializable{
	
	@FXML
	GridPane grid;
	private Node children;
	@FXML
	Label total;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		 ITRView form = (ITRView) Form.getForm();
		List<TCS> list =(List<TCS>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.TaxCollectedAtSource").getTableView().getItems();

		for(int i =0;i<list.size();i++)               
		{
			TCS td = list.get(i);
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
			tan.setText(td.getEmployerOrDeductorOrCollectDetl().getTan());
			tan.setWrapText(true);
			tan.setMaxWidth(200);
			tan.setMinHeight(50);
			HBox hbox_tan=new HBox();
			hbox_tan.getChildren().add(tan);
			hbox_tan.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tan, 1, i+1);
			
			Label collector=new Label();
			collector.setText(td.getEmployerOrDeductorOrCollectDetl().getEmployerOrDeductorOrCollecterName());
			collector.setWrapText(true);
			collector.setMaxWidth(200);
			collector.setMinHeight(50);
			HBox hbox_collector=new HBox();
			hbox_collector.getChildren().add(collector);
			hbox_collector.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_collector, 2, i+1);
			
			Label amount=new Label();
			amount.setText(td.getAmtfrom26AS().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(50);
			HBox hbox_amount=new HBox();
			hbox_amount.getChildren().add(amount);
			hbox_amount.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_amount, 3, i+1);
			
			Label tcs=new Label();
			tcs.setText(td.getTotalTCS().toString());
			tcs.setWrapText(true);
			tcs.setMaxWidth(200);
			tcs.setMinHeight(50);
			HBox hbox_tcs=new HBox();
			hbox_tcs.getChildren().add(tcs);
			hbox_tcs.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tcs, 4, i+1);
			
			Label year=new Label();
			year.setText(td.getAmtTCSClaimedThisYear().toString());
			year.setWrapText(true);
			year.setMaxWidth(200);
			year.setMinHeight(50);
			HBox hbox_year=new HBox();
			hbox_year.getChildren().add(year);
			hbox_year.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_year, 5, i+1);
			
			
			if(td.getAmtClaimedBySpouse()!=null){
				
				Label spouse=new Label();
				spouse.setText(td.getAmtClaimedBySpouse().toString());
				spouse.setWrapText(true);
				spouse.setMaxWidth(200);
				spouse.setMinHeight(50);
				HBox hbox_spouse=new HBox();
				hbox_spouse.getChildren().add(spouse);
				hbox_spouse.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_spouse, 6, i+1);
		}else
		{
			Label spouse=new Label();
			spouse.setText("");
			spouse.setWrapText(true);
			spouse.setMaxWidth(200);
			spouse.setMinHeight(50);
			HBox hbox_spouse=new HBox();
			hbox_spouse.getChildren().add(spouse);
			hbox_spouse.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_spouse, 6, i+1);
		}
			
			
			
			
			
			
			
			
		}
		total.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleTCS.totalSchTCS"));
	}

	
}
