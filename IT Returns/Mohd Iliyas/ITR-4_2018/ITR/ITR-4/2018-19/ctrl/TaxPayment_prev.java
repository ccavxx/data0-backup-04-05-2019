package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TaxPayment;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;

public class TaxPayment_prev  implements Initializable{
	
	@FXML
	GridPane grid;
	private Node children;
	
	@FXML
	Label total;
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		 ITRView form = (ITRView) Form.getForm();
		List<TaxPayment> list =(List<TaxPayment>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.TaxPaymentController").getTableView().getItems();
		
		String d2 = null;
		for(int i =0;i<list.size();i++)
		{
			TaxPayment td = list.get(i);
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(50);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(sno, 0, i+1);
			
			Label code=new Label();
			code.setText(td.getBsrCode());
			code.setWrapText(true);
			code.setMaxWidth(200);
			code.setMinHeight(50);
			HBox hbox_code=new HBox();
			hbox_code.getChildren().add(code);
			hbox_code.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_code, 1, i+1);
			
			
			try {
				SimpleDateFormat form1 = new SimpleDateFormat("EEE MMM d HH:mm:ss zzz yyyy");
				Date d1 = form1.parse(td.getDateDep().toString());
				SimpleDateFormat dat = new SimpleDateFormat("dd/MM/yyyy");
				 d2 = dat.format(d1);
				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			Label date=new Label();
			date.setText(d2);
			date.setWrapText(true);
			date.setMaxWidth(200);
			date.setMinHeight(50);
			HBox hbox_date=new HBox();
			hbox_date.getChildren().add(date);
			hbox_date.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_date, 2, i+1);
			
			Label SrlNoOfChaln=new Label();
			SrlNoOfChaln.setText(td.getSrlNoOfChaln().toString());
			SrlNoOfChaln.setWrapText(true);
			SrlNoOfChaln.setMaxWidth(200);
			SrlNoOfChaln.setMinHeight(50);
			HBox hbox_SrlNoOfChaln=new HBox();
			hbox_SrlNoOfChaln.getChildren().add(SrlNoOfChaln);
			hbox_SrlNoOfChaln.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_SrlNoOfChaln, 3, i+1);
			
			Label amount=new Label();
			amount.setText(td.getAmt().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(50);
			HBox hbox_amount=new HBox();
			hbox_amount.getChildren().add(amount);
			hbox_amount.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_amount, 4, i+1);
			
			
			
		}
		total.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleIT.totalTaxPayments"));
}
}
