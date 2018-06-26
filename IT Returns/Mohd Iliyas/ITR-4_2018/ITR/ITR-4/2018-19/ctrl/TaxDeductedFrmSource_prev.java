package com.itd.efiling.offline.ITR4.ctrl;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TDSDetails26QC;
import com.itd.efiling.offline.ITR4.model.TDSDetails26QCB;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSal;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSalB;
import com.itd.efiling.offline.ITR4.model.TaxCreditDetails;
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
import javafx.scene.layout.VBox;

public class TaxDeductedFrmSource_prev  implements Initializable{
	
	@FXML
	GridPane grid;
	private Node children;
	
	@FXML
	Label tds26ASStmtPANFlag1,tds26ASStmtAnotherPANFlag;
	
	
	@FXML
	Label total;
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		
		
		
		ITRView form = (ITRView) Form.getForm();
		List<TDSDetails26QC> list =(List<TDSDetails26QC>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.TDSDetails26QC_Controller").getTableView().getItems();
		
		
		for(int i =0;i<list.size();i++)
		{
			TDSDetails26QC td = list.get(i);
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(50);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(sno, 0, i+4);
			
			
			Label creditName=new Label();
			String creditNme = td.getTdsCreditName() ;
			if(creditNme.equals("S"))
			{
				creditName.setText("Self");
				creditName.setWrapText(true);
				creditName.setMaxWidth(200);
				creditName.setMinHeight(50);
				HBox hbox_creditName=new HBox();
				hbox_creditName.getChildren().add(creditName);
				hbox_creditName.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_creditName, 1, i+4);
			}
			else if(creditNme.equals("O"))
			{
				creditName.setText("Other PAN");
				creditName.setWrapText(true);
				creditName.setMaxWidth(200);
				creditName.setMinHeight(50);
				HBox hbox_creditName=new HBox();
				hbox_creditName.getChildren().add(creditName);
				hbox_creditName.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_creditName, 1, i+4);
			}
			
			
			Label tan=new Label();
			tan.setText(td.getPaNofTenant());
			tan.setWrapText(true);
			tan.setMaxWidth(200);
			tan.setMinHeight(50);
			HBox hbox_name=new HBox();
			hbox_name.getChildren().add(tan);
			hbox_name.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_name, 2, i+4);
			
			Label name=new Label();
			name.setText(td.getNameOfTenant());
			name.setWrapText(true);
			name.setMaxWidth(165);
			name.setMinHeight(50);
			HBox hbox_address=new HBox();
			hbox_address.getChildren().add(name);
			hbox_address.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_address, 3, i+4);
			
			Label unique=new Label();
			unique.setText(td.getUniqueTDSCerNo());
			unique.setWrapText(true);
			unique.setMaxWidth(165);
			unique.setMinHeight(50);
			HBox hbox_unique=new HBox();
			hbox_unique.getChildren().add(unique);
			hbox_unique.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_unique, 4, i+4);
			
			
			
			Label deductedYr=new Label();
			deductedYr.setText(ComboBoxOptionsCacher.getValueForKey("Dyear",td.getDeductedYr()));
			deductedYr.setWrapText(true);
			deductedYr.setMaxWidth(165);
			deductedYr.setMinHeight(50);
			HBox hbox_deductedYr=new HBox();
			hbox_deductedYr.getChildren().add(deductedYr);
			hbox_deductedYr.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_deductedYr, 5, i+4);
			
			
			
			if(td.getRcptDtls26AS()!=null){
				Label amtForTaxDeduct=new Label();
			    amtForTaxDeduct.setText(td.getRcptDtls26AS().toString());
			    amtForTaxDeduct.setWrapText(true);
				amtForTaxDeduct.setMaxWidth(200);
				amtForTaxDeduct.setMinHeight(50);
				HBox hbox_city=new HBox();
				hbox_city.getChildren().add(amtForTaxDeduct);
				hbox_city.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_city, 6, i+4);
			}
			else
			{
				Label amtForTaxDeduct=new Label();
			    amtForTaxDeduct.setText("");
			    amtForTaxDeduct.setWrapText(true);
				amtForTaxDeduct.setMaxWidth(200);
				amtForTaxDeduct.setMinHeight(50);
				HBox hbox_city=new HBox();
				hbox_city.getChildren().add(amtForTaxDeduct);
				hbox_city.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_city, 6, i+4);
			}
			
			
			
			if(td.getTaxDeductCreditDtls().getTaxDeductedOwnHands()!=null){
				Label taxDeductedOwnHands=new Label();
				taxDeductedOwnHands.setText(td.getTaxDeductCreditDtls().getTaxDeductedOwnHands().toString());
				taxDeductedOwnHands.setWrapText(true);
				taxDeductedOwnHands.setMaxWidth(200);
				taxDeductedOwnHands.setMinHeight(50);
				HBox hbox_taxDeductedOwnHands=new HBox();
				hbox_taxDeductedOwnHands.getChildren().add(taxDeductedOwnHands);
				hbox_taxDeductedOwnHands.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxDeductedOwnHands, 7, i+4);
			}
			else
			{
				Label taxDeductedOwnHands=new Label();
				taxDeductedOwnHands.setText("");
				taxDeductedOwnHands.setWrapText(true);
				taxDeductedOwnHands.setMaxWidth(200);
				taxDeductedOwnHands.setMinHeight(50);
				HBox hbox_taxDeductedOwnHands=new HBox();
				hbox_taxDeductedOwnHands.getChildren().add(taxDeductedOwnHands);
				hbox_taxDeductedOwnHands.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxDeductedOwnHands, 7, i+4);
			}
			
			
			
			if(td.getTaxDeductCreditDtls().getTaxDeductedIncome()!=null){
					Label taxDeductedIncome=new Label();
					taxDeductedIncome.setText(td.getTaxDeductCreditDtls().getTaxDeductedIncome().toString());
					taxDeductedIncome.setWrapText(true);
					taxDeductedIncome.setMaxWidth(200);
					taxDeductedIncome.setMinHeight(50);
					HBox hbox_taxDeductedIncome=new HBox();
					hbox_taxDeductedIncome.getChildren().add(taxDeductedIncome);
					hbox_taxDeductedIncome.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
					grid.add(hbox_taxDeductedIncome, 8, i+4);
			}
			else
			{
				Label taxDeductedIncome=new Label();
				taxDeductedIncome.setText("");
				HBox hbox_taxDeductedIncome=new HBox();
				hbox_taxDeductedIncome.getChildren().add(taxDeductedIncome);
				hbox_taxDeductedIncome.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxDeductedIncome, 8, i+4);
			}
			
			if(td.getTaxDeductCreditDtls().getTaxDeductedTDS()!=null){
					Label taxDeductedTDS=new Label();
					taxDeductedTDS.setText(td.getTaxDeductCreditDtls().getTaxDeductedTDS().toString());
					taxDeductedTDS.setWrapText(true);
					taxDeductedTDS.setMaxWidth(200);
					taxDeductedTDS.setMinHeight(50);
					HBox hbox_taxDeductedTDS=new HBox();
					hbox_taxDeductedTDS.getChildren().add(taxDeductedTDS);
					hbox_taxDeductedTDS.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
					grid.add(hbox_taxDeductedTDS, 9, i+4);
			}
			else
			{
				Label taxDeductedIncome=new Label();
				taxDeductedIncome.setText("");
				HBox hbox_taxDeductedIncome=new HBox();
				hbox_taxDeductedIncome.getChildren().add(taxDeductedIncome);
				hbox_taxDeductedIncome.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxDeductedIncome, 9, i+4);
			}
			if(td.getTaxDeductCreditDtls().getTaxDeductedSpouseOthPrsnPAN()!=null){
					Label taxDeductedSpousePAN=new Label();
					taxDeductedSpousePAN.setText(td.getTaxDeductCreditDtls().getTaxDeductedSpouseOthPrsnPAN());
					taxDeductedSpousePAN.setWrapText(true);
					taxDeductedSpousePAN.setMaxWidth(200);
					taxDeductedSpousePAN.setMinHeight(50);
					HBox hbox_taxDeductedSpousePAN=new HBox();
					hbox_taxDeductedSpousePAN.getChildren().add(taxDeductedSpousePAN);
					hbox_taxDeductedSpousePAN.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
					grid.add(hbox_taxDeductedSpousePAN, 10, i+4);
			}
			else
			{
				Label taxDeductedIncome=new Label();
				taxDeductedIncome.setText("");
				HBox hbox_taxDeductedIncome=new HBox();
				hbox_taxDeductedIncome.getChildren().add(taxDeductedIncome);
				hbox_taxDeductedIncome.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxDeductedIncome, 10, i+4);
			}
			
			Label taxCreditedOwnHands=new Label();
			taxCreditedOwnHands.setText(td.getTaxDeductCreditDtls().getTaxCreditedOwnHands().toString());
			taxCreditedOwnHands.setWrapText(true);
			taxCreditedOwnHands.setMaxWidth(200);
			taxCreditedOwnHands.setMinHeight(50);
			HBox hbox_taxCreditedOwnHands=new HBox();
			hbox_taxCreditedOwnHands.getChildren().add(taxCreditedOwnHands);
			hbox_taxCreditedOwnHands.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_taxCreditedOwnHands, 11, i+4);
			
			
		
			
			
			if(td.getTaxDeductCreditDtls().getTaxCreditedIncome()!=null){
				Label taxCreditedIncome=new Label();
				taxCreditedIncome.setText(td.getTaxDeductCreditDtls().getTaxCreditedIncome().toString());
				taxCreditedIncome.setWrapText(true);
				taxCreditedIncome.setMaxWidth(200);
				taxCreditedIncome.setMinHeight(50);
				HBox hbox_taxCreditedIncome=new HBox();
				hbox_taxCreditedIncome.getChildren().add(taxCreditedIncome);
				hbox_taxCreditedIncome.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxCreditedIncome, 12, i+4);
			}
			else
			{
				Label taxCreditedIncome=new Label();
				taxCreditedIncome.setText("");
				HBox hbox_taxCreditedIncome=new HBox();
				hbox_taxCreditedIncome.getChildren().add(taxCreditedIncome);
				hbox_taxCreditedIncome.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxCreditedIncome, 12, i+4);
			}
		
		if(td.getTaxDeductCreditDtls().getTaxCreditedTDS()!=null){
				Label taxCreditedTDS=new Label();
				taxCreditedTDS.setText(td.getTaxDeductCreditDtls().getTaxCreditedTDS().toString());
				taxCreditedTDS.setWrapText(true);
				taxCreditedTDS.setMaxWidth(200);
				taxCreditedTDS.setMinHeight(50);
				HBox hbox_taxCreditedTDS=new HBox();
				hbox_taxCreditedTDS.getChildren().add(taxCreditedTDS);
				hbox_taxCreditedTDS.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxCreditedTDS, 13, i+4);
		}
		else
		{
			Label taxCreditedTDS=new Label();
			taxCreditedTDS.setText("");
			HBox hbox_taxCreditedTDS=new HBox();
			hbox_taxCreditedTDS.getChildren().add(taxCreditedTDS);
			hbox_taxCreditedTDS.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_taxCreditedTDS, 13, i+4);
		}
		if(td.getTaxDeductCreditDtls().getTaxCreditedSpouseOthPrsnPAN()!=null){
				Label taxCreditedSpouseOthPrsnPAN=new Label();
				taxCreditedSpouseOthPrsnPAN.setText(td.getTaxDeductCreditDtls().getTaxCreditedSpouseOthPrsnPAN());
				taxCreditedSpouseOthPrsnPAN.setWrapText(true);
				taxCreditedSpouseOthPrsnPAN.setMaxWidth(200);
				taxCreditedSpouseOthPrsnPAN.setMinHeight(50);
				HBox hbox_taxCreditedSpouseOthPrsnPANN=new HBox();
				hbox_taxCreditedSpouseOthPrsnPANN.getChildren().add(taxCreditedSpouseOthPrsnPAN);
				hbox_taxCreditedSpouseOthPrsnPANN.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
				grid.add(hbox_taxCreditedSpouseOthPrsnPANN, 14, i+4);
		}
		else
		{
			Label taxCreditedSpouseOthPrsnPAN=new Label();
			taxCreditedSpouseOthPrsnPAN.setText("");
			HBox hbox_taxCreditedSpouseOthPrsnPANN=new HBox();
			hbox_taxCreditedSpouseOthPrsnPANN.getChildren().add(taxCreditedSpouseOthPrsnPAN);
			hbox_taxCreditedSpouseOthPrsnPANN.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_taxCreditedSpouseOthPrsnPANN, 14, i+4);
		}
				
			}
			
			
		String total_TDS=OnChangeUtil.getElementValueByTargetName("itr.itr4.tdsDtls26QC.totalTDSDetails26QC");
		if(total_TDS.equals("empty"))
		{
			total.setText("0");
		}
		else
		{
			total.setText(total_TDS);
		}
			
			
	}
}
