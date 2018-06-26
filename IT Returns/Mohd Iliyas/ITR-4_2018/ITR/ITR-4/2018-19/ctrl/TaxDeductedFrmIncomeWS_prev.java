package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TDSonOthThanSal;
import com.itd.efiling.offline.ITR4.model.TDSonOthThanSalB;
import com.itd.efiling.offline.ITR4.model.TaxCreditDetails;
import com.itd.efiling.offline.ITR4.model.TaxDeductDetails;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;


import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.geometry.Orientation;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.control.Separator;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;

public class TaxDeductedFrmIncomeWS_prev  implements Initializable{
	
	@FXML
	GridPane grid;
	private Node children;
	
	@FXML
	Label tds26ASStmtPANFlag1,tds26ASStmtAnotherPANFlag;
	
	@FXML
	Label total;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdSonOthThanSals.tds26ASStmtPANFlag").equals("Y"))
		{
			tds26ASStmtPANFlag1.setText("Yes");
		}
		else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdSonOthThanSals.tds26ASStmtPANFlag").equals("N"))
		{
			tds26ASStmtPANFlag1.setText("No");
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdSonOthThanSals.tds26ASStmtAnotherPANFlag").equals("Y"))
		{
			tds26ASStmtAnotherPANFlag.setText("Yes");
		}
		else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdSonOthThanSals.tds26ASStmtAnotherPANFlag").equals("N"))
		{
			tds26ASStmtAnotherPANFlag.setText("No");
		}
		
		
		
		ITRView form = (ITRView) Form.getForm();
		List<TDSonOthThanSal> list =(List<TDSonOthThanSal>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.TaxDeductedFrmIncome").getTableView().getItems();
		
		
		for(int i =0;i<list.size();i++)
		{
			TDSonOthThanSal td = list.get(i);
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(50);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(sno, 0, i+4);
			
			if(td.getEmployerOrDeductorOrCollectDetl().getTan()!=null){
			Label tan=new Label();
			tan.setText(td.getEmployerOrDeductorOrCollectDetl().getTan());
			tan.setWrapText(true);
			tan.setMaxWidth(200);
			tan.setMinHeight(50);
			HBox hbox_name=new HBox();
			hbox_name.getChildren().add(tan);
			hbox_name.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_name, 1, i+4);
			}
			
			if(td.getEmployerOrDeductorOrCollectDetl().getEmployerOrDeductorOrCollecterName()!=null){
			Label name=new Label();
			name.setText(td.getEmployerOrDeductorOrCollectDetl().getEmployerOrDeductorOrCollecterName());
			name.setWrapText(true);
			name.setMaxWidth(165);
			name.setMinHeight(50);
			HBox hbox_address=new HBox();
			hbox_address.getChildren().add(name);
			hbox_address.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_address, 2, i+4);
			}
			
			if(td.getUniqueTDSCerNo()!=null){
			Label unique=new Label();
			unique.setText(td.getUniqueTDSCerNo());
			unique.setWrapText(true);
			unique.setMaxWidth(165);
			unique.setMinHeight(50);
			HBox hbox_unique=new HBox();
			hbox_unique.getChildren().add(unique);
			hbox_unique.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_unique, 3, i+4);
			}
			
			if(td.getDeductedYr()!=null){
			Label deductedYr=new Label();
			deductedYr.setText(ComboBoxOptionsCacher.getValueForKey("Dyear",td.getDeductedYr()));
			deductedYr.setWrapText(true);
			deductedYr.setMaxWidth(165);
			deductedYr.setMinHeight(50);
			HBox hbox_deductedYr=new HBox();
			hbox_deductedYr.getChildren().add(deductedYr);
			hbox_deductedYr.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_deductedYr, 4, i+4);
			}
			
			if(td.getRcptDtls26AS()!=null){
			Label amtForTaxDeduct=new Label();
		    amtForTaxDeduct.setText(td.getRcptDtls26AS().toString());
		    amtForTaxDeduct.setWrapText(true);
			amtForTaxDeduct.setMaxWidth(200);
			amtForTaxDeduct.setMinHeight(50);
			HBox hbox_city=new HBox();
			hbox_city.getChildren().add(amtForTaxDeduct);
			hbox_city.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_city, 5, i+4);
			}
		
	/*		if(td.getTaxDeducted26AS()!=null){	
			Label TaxDeduct=new Label();
			TaxDeduct.setText(td.getTaxDeducted26AS().toString());
		    TaxDeduct.setWrapText(true);
		    TaxDeduct.setMaxWidth(200);
		    TaxDeduct.setMinHeight(50);
			HBox hbox_taxDeduct=new HBox();
			hbox_taxDeduct.getChildren().add(TaxDeduct);
			hbox_taxDeduct.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_taxDeduct, 6, i+4);
			}
			
			if(td.getTdsAmountClaimed()!=null){	
			Label TdsClaimed=new Label();
			TdsClaimed.setText(td.getTdsAmountClaimed().toString());
			TdsClaimed.setWrapText(true);
			TdsClaimed.setMaxWidth(200);
			TdsClaimed.setMinHeight(50);
			HBox hbox_tdsClaimed=new HBox();
			hbox_tdsClaimed.getChildren().add(TdsClaimed);
			hbox_tdsClaimed.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tdsClaimed, 7, i+4);
			}
			
			if(td.getHeadofIncForTax()!=null){	
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
			}
			
			if(td.getTaxClaimedOwnHands()!=null){	
			Label TaxClaimedOwnHands=new Label();
			TaxClaimedOwnHands.setText(td.getTaxClaimedOwnHands().toString());
			TaxClaimedOwnHands.setWrapText(true);
			TaxClaimedOwnHands.setMaxWidth(200);
			TaxClaimedOwnHands.setMinHeight(50);
			HBox hbox_taxClaimedOwnHands=new HBox();
			hbox_taxClaimedOwnHands.getChildren().add(TaxClaimedOwnHands);
			hbox_taxClaimedOwnHands.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_taxClaimedOwnHands, 9, i+4);
			}
			
			if(td.getApportioningReason()!=null){
			Label ApportioningReason=new Label();
			ApportioningReason.setText(ComboBoxOptionsCacher.getValueForKey("reasonTds2a",td.getApportioningReason()));
			//ApportioningReason.setText(td.getApportioningReason().toString());
			ApportioningReason.setWrapText(true);
			ApportioningReason.setMaxWidth(200);
			ApportioningReason.setMinHeight(50);
			HBox hbox_apportioningReason=new HBox();
			hbox_apportioningReason.getChildren().add(ApportioningReason);
			hbox_apportioningReason.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_apportioningReason, 10, i+4);
			}
			
			if(td.getIncOffered()!=null){
			Label IncOffered=new Label();
			IncOffered.setText(td.getIncOffered().toString());
			IncOffered.setWrapText(true);
			IncOffered.setMaxWidth(200);
			IncOffered.setMinHeight(50);
			HBox hbox_incOffered=new HBox();
			hbox_incOffered.getChildren().add(IncOffered);
			hbox_incOffered.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_incOffered, 14, i+4);
			}
			
			if(td.getTdsClaimed()!=null){
			Label TdsClaimed1=new Label();
			TdsClaimed1.setText(td.getTdsClaimed().toString());
			TdsClaimed1.setWrapText(true);
			TdsClaimed1.setMaxWidth(200);
			TdsClaimed1.setMinHeight(50);
			HBox hbox_tdsClaimed1=new HBox();
			hbox_tdsClaimed1.getChildren().add(TdsClaimed1);
			hbox_tdsClaimed1.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tdsClaimed1, 15, i+4);
			}
			
			if(td.getIncBalCarryFrwd()!=null){
			Label IncBalCarryFrwd=new Label();
			IncBalCarryFrwd.setText(td.getIncBalCarryFrwd().toString());
			IncBalCarryFrwd.setWrapText(true);
			IncBalCarryFrwd.setMaxWidth(200);
			IncBalCarryFrwd.setMinHeight(50);
			HBox hbox_incBalCarryFrwd=new HBox();
			hbox_incBalCarryFrwd.getChildren().add(IncBalCarryFrwd);
			hbox_incBalCarryFrwd.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_incBalCarryFrwd, 16, i+4);
			}
			
			if(td.getTdsBalCarryFrwd()!=null){
			Label TdsBalCarryFrwd=new Label();
			TdsBalCarryFrwd.setText(td.getTdsBalCarryFrwd().toString());
			TdsBalCarryFrwd.setWrapText(true);
			TdsBalCarryFrwd.setMaxWidth(200);
			TdsBalCarryFrwd.setMinHeight(50);
			HBox hbox_tdsBalCarryFrwd=new HBox();
			hbox_tdsBalCarryFrwd.getChildren().add(TdsBalCarryFrwd);
			hbox_tdsBalCarryFrwd.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_tdsBalCarryFrwd, 17, i+4);
			}
			
			
			
			 int m1=10;
			    List list_Tab1=td.getTaxDeductDetails();
			    for(int k=0;k<list_Tab1.size();k++)
			    {
			    	
			    	m1+=80;
			    	String issuedby=td.getTaxDeductDetails().get(k).getTDSAppOtherPerson().toString();
			    	Label label11=new Label(issuedby);
			    	label11.setWrapText(true);
			    	label11.setMaxWidth(200);
			    	label11.setMinHeight(50);
					GridPane gri=new GridPane();
					gri.setMaxWidth(200);
					VBox hbox_taxCreditedIncome=new VBox();
					hbox_taxCreditedIncome.getChildren().add(label11);
					String s="-fx-padding:"+m1+" 0 0 20";
					hbox_taxCreditedIncome.setStyle(s+";-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
					gri.add(hbox_taxCreditedIncome, 0, k);
					grid.add(hbox_taxCreditedIncome, 11, i+4);
			    	
					
					String OtherPersonPAN=td.getTaxDeductDetails().get(k).getOtherPersonPAN().toString();
			    	Label label12=new Label(OtherPersonPAN);
			    	label12.setWrapText(true);
			    	label12.setMaxWidth(220);
			    	label12.setMinHeight(50);
					GridPane gri1=new GridPane();
					gri.setMaxWidth(220);
					VBox hbox_OtherPersonPAN=new VBox();
					hbox_OtherPersonPAN.getChildren().add(label12);
					String s1="-fx-padding:"+m1+" 0 0 10";
					hbox_OtherPersonPAN.setStyle(s1+";-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
					gri1.add(hbox_OtherPersonPAN, 0, k);
					grid.add(hbox_OtherPersonPAN, 12, i+4);
					
					String PercentageShare=td.getTaxDeductDetails().get(k).getPercentageShare().toString();
			    	Label label13=new Label(PercentageShare);
			    	label13.setWrapText(true);
			    	label13.setMaxWidth(200);
			    	label13.setMinHeight(50);
					GridPane gri2=new GridPane();
					gri.setMaxWidth(200);
					VBox hbox_PercentageShare=new VBox();
					hbox_PercentageShare.getChildren().add(label13);
					String s2="-fx-padding:"+m1+" 0 0 20";
					hbox_PercentageShare.setStyle(s2+";-fx-font-weight:Bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
					gri2.add(hbox_PercentageShare, 0, k);
					grid.add(hbox_PercentageShare, 13, i+4);
			    	
				
			    }
			
			*/
		}
		
		total.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.tdSonOthThanSals.totalTDSonOthThanSals"));
	}

	
}
