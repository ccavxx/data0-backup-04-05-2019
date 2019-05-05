package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TDSonSalary;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;

public class TaxDeductedFrmSal_Prev  implements Initializable{
	
	@FXML
	GridPane grid;
	private Node children;
	@FXML
	Label total;
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		 ITRView form = (ITRView) Form.getForm();
		List<TDSonSalary> list =(List<TDSonSalary>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmSal").getTableView().getItems();
		
		
		for(int i =0;i<list.size();i++)
		{
			TDSonSalary td = list.get(i);
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(50);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(sno, 0, i+1);
			
			Label tan=new Label();
			tan.setText(td.getEmployerOrDeductorOrCollectDetl().getTan());
			tan.setWrapText(true);
			tan.setMaxWidth(200);
			tan.setMinHeight(50);
			HBox hbox_tan=new HBox();
			hbox_tan.getChildren().add(tan);
			hbox_tan.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tan, 1, i+1);
			
			Label name=new Label();
			name.setText(td.getEmployerOrDeductorOrCollectDetl().getEmployerOrDeductorOrCollecterName());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(50);
			HBox hbox_name=new HBox();
			hbox_name.getChildren().add(name);
			hbox_name.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_name, 2, i+1);
			
			
			Label salary=new Label();
			salary.setText(td.getIncChrgSal().toString());
			salary.setWrapText(true);
			salary.setMaxWidth(200);
			salary.setMinHeight(50);
			HBox hbox_salary=new HBox();
			hbox_salary.getChildren().add(salary);
			hbox_salary.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_salary, 3, i+1);
			
			
			Label tds=new Label();
			tds.setText(td.getTotalTDSSal().toString());
			tds.setWrapText(true);
			tds.setMaxWidth(200);
			tds.setMinHeight(50);
			HBox hbox_tds=new HBox();
			hbox_tds.getChildren().add(tds);
			hbox_tds.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tds, 4, i+1);
		}
		
		total.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdSonSalaries.totalTDSonSalaries"));
	}

	
}
