package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TDSDetails26QCB;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSal;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSalB;
import com.itd.efiling.offline.ITR4.model.TaxCreditDetails;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;


import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

public class TaxDeductedFrmSourceWS2_prev  implements Initializable{
	
	@FXML
	GridPane grid;
	private Node children;
	
	@FXML
	Label tds26ASStmtPANFlag1,tds26ASStmtAnotherPANFlag;
	
	@FXML
	Label total,totalAB;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		
		
		
		
		ITRView form = (ITRView) Form.getForm();
		List<TDSDetails26QCB> list =(List<TDSDetails26QCB>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmIncomeQCPartB").getTableView().getItems();
		
		
		for(int i =0;i<list.size();i++)
		{
			TDSDetails26QCB td = list.get(i);
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(50);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(sno, 0, i+4);
			
			
			Label tan=new Label();
			tan.setText(td.getPaNofTenant());
			tan.setWrapText(true);
			tan.setMaxWidth(200);
			tan.setMinHeight(50);
			HBox hbox_name=new HBox();
			hbox_name.getChildren().add(tan);
			hbox_name.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_name, 1, i+4);
			
			Label name=new Label();
			name.setText(td.getDeductorTenantName());
			name.setWrapText(true);
			name.setMaxWidth(165);
			name.setMinHeight(50);
			HBox hbox_address=new HBox();
			hbox_address.getChildren().add(name);
			hbox_address.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_address, 2, i+4);
			
			Label unique=new Label();
			unique.setText(td.getUniqueTDSCerNo());
			unique.setWrapText(true);
			unique.setMaxWidth(165);
			unique.setMinHeight(50);
			HBox hbox_unique=new HBox();
			hbox_unique.getChildren().add(unique);
			hbox_unique.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_unique, 3, i+4);
			
			
			
			Label deductedYr=new Label();
			deductedYr.setText(ComboBoxOptionsCacher.getValueForKey("Dyear_Qc",td.getDeductedYr()));
			deductedYr.setWrapText(true);
			deductedYr.setMaxWidth(165);
			deductedYr.setMinHeight(50);
			HBox hbox_deductedYr=new HBox();
			hbox_deductedYr.getChildren().add(deductedYr);
			hbox_deductedYr.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_deductedYr, 4, i+4);
			
			Label amtForTaxDeduct=new Label();
		    amtForTaxDeduct.setText(td.getAmtAppOthPANTDSClaimed().toString());
		    amtForTaxDeduct.setWrapText(true);
			amtForTaxDeduct.setMaxWidth(200);
			amtForTaxDeduct.setMinHeight(50);
			HBox hbox_city=new HBox();
			hbox_city.getChildren().add(amtForTaxDeduct);
			hbox_city.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_city, 5, i+4);
			
				
				
			Label TaxDeduct=new Label();
			TaxDeduct.setText(td.getTdsAppoOthPANClaimedSelf().toString());
		    TaxDeduct.setWrapText(true);
		    TaxDeduct.setMaxWidth(200);
		    TaxDeduct.setMinHeight(50);
			HBox hbox_taxDeduct=new HBox();
			hbox_taxDeduct.getChildren().add(TaxDeduct);
			hbox_taxDeduct.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_taxDeduct, 6, i+4);
			
				
				
			Label TdsClaimed=new Label();
			TdsClaimed.setText(td.getTaxDeductedPAN().toString());
			TdsClaimed.setWrapText(true);
			TdsClaimed.setMaxWidth(200);
			TdsClaimed.setMinHeight(50);
			HBox hbox_tdsClaimed=new HBox();
			hbox_tdsClaimed.getChildren().add(TdsClaimed);
			hbox_tdsClaimed.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tdsClaimed, 7, i+4);
			
			
			Label HeadofIncForTax=new Label();
			HeadofIncForTax.setText(ComboBoxOptionsCacher.getValueForKey("Head",td.getHeadofIncForTax()));
			//HeadofIncForTax.setText(td.getHeadofIncForTax().toString());
			HeadofIncForTax.setWrapText(true);
			HeadofIncForTax.setMaxWidth(200);
			HeadofIncForTax.setMinHeight(50);
			HBox hbox_headofIncForTax=new HBox();
			hbox_headofIncForTax.getChildren().add(HeadofIncForTax);
			hbox_headofIncForTax.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_headofIncForTax, 8, i+4);
			
			
			Label ReasonClaimOwnHands=new Label();
			ReasonClaimOwnHands.setText(ComboBoxOptionsCacher.getValueForKey("reason",td.getReasonClaimOwnHands()));
			//ReasonClaimOwnHands.setText(td.getReasonClaimOwnHands().toString());
			ReasonClaimOwnHands.setWrapText(true);
			ReasonClaimOwnHands.setMaxWidth(200);
			ReasonClaimOwnHands.setMinHeight(50);
			HBox hbox_reasonClaimOwnHands=new HBox();
			hbox_reasonClaimOwnHands.getChildren().add(ReasonClaimOwnHands);
			hbox_reasonClaimOwnHands.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_reasonClaimOwnHands, 9, i+4);
			
			Label IncOffered=new Label();
			IncOffered.setText(td.getIncOffered().toString());
			IncOffered.setWrapText(true);
			IncOffered.setMaxWidth(200);
			IncOffered.setMinHeight(50);
			HBox hbox_incOffered=new HBox();
			hbox_incOffered.getChildren().add(IncOffered);
			hbox_incOffered.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_incOffered, 10, i+4);
			
			
			Label TdsClaimed1=new Label();
			TdsClaimed1.setText(td.getTdsClaimed().toString());
			TdsClaimed1.setWrapText(true);
			TdsClaimed1.setMaxWidth(200);
			TdsClaimed1.setMinHeight(50);
			HBox hbox_tdsClaimed1=new HBox();
			hbox_tdsClaimed1.getChildren().add(TdsClaimed1);
			hbox_tdsClaimed1.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tdsClaimed1, 11, i+4);
			
			
			Label IncBalCarryFrwd=new Label();
			IncBalCarryFrwd.setText(td.getIncBalCarryFrwd().toString());
			IncBalCarryFrwd.setWrapText(true);
			IncBalCarryFrwd.setMaxWidth(200);
			IncBalCarryFrwd.setMinHeight(50);
			HBox hbox_incBalCarryFrwd=new HBox();
			hbox_incBalCarryFrwd.getChildren().add(IncBalCarryFrwd);
			hbox_incBalCarryFrwd.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_incBalCarryFrwd, 12, i+4);
			
			Label TdsBalCarryFrwd=new Label();
			TdsBalCarryFrwd.setText(td.getTdsBalCarryFrwd().toString());
			TdsBalCarryFrwd.setWrapText(true);
			TdsBalCarryFrwd.setMaxWidth(200);
			TdsBalCarryFrwd.setMinHeight(50);
			HBox hbox_tdsBalCarryFrwd=new HBox();
			hbox_tdsBalCarryFrwd.getChildren().add(TdsBalCarryFrwd);
			hbox_tdsBalCarryFrwd.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tdsBalCarryFrwd, 13, i+4);
			
		
			
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdsDtls26QC.totalTDSDetails26QBQCPartB").equals("empty"))
		{
			total.setText("0");
		}
		else
		{
			total.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdsDtls26QC.totalTDSDetails26QBQCPartB"));
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdsDtls26QC.totalTDS26QBQCPartAPartB").equals("empty"))
		{
			totalAB.setText("0");
		}
		else
		{
			totalAB.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdsDtls26QC.totalTDS26QBQCPartAPartB"));
		}
		
	}

	
}
