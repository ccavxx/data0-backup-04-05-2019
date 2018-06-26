package com.itd.efiling.offline.ITR4.ctrl;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.DoneeWithPan;
import com.itd.efiling.offline.ITR4.model.DtlsOfTransDurPrevYr;
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

public class ScheduleCTTab1_Preview implements Initializable{

	@FXML
	GridPane grid,grid1,grid2,grid3;
	
	@FXML
	Label lender_pan,trans_nature,agg_amount,premises;
	
	@SuppressWarnings("unchecked")
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		//ITRView form = (ITRView) Form.getForm();
		List<DtlsOfTransDurPrevYr> list =(List<DtlsOfTransDurPrevYr>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.Schedule_CT_Tab1").getTableView().getItems();
		/*List<DoneeWithPan> list1 =(List<DoneeWithPan>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable2").getTableView().getItems();
		List<DoneeWithPan> list2 =(List<DoneeWithPan>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable3").getTableView().getItems();
		List<DoneeWithPan> list3 =(List<DoneeWithPan>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80G").getTableView().getItems();
		*/
		LOG.info("list message ::"+list.size());
		
		for(int i=0;i<list.size();i++)               
		{
			
			
			DtlsOfTransDurPrevYr td = list.get(i);
			
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(100);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(sno, 0, i+2);
			
			Label name=new Label();
			name.setText(td.getName());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(100);
			HBox hbox_name=new HBox();
			hbox_name.getChildren().add(name);
			hbox_name.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_name, 1, i+2);
			
			Label address=new Label();
			address.setText(td.getAddressCT().getResidenceNo());
			address.setWrapText(true);
			address.setMaxWidth(165);
			address.setMinHeight(100);
			HBox hbox_address=new HBox();
			hbox_address.getChildren().add(address);
			hbox_address.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_address, 2, i+2);
			
			Label cityDist=new Label();
		    cityDist.setText(td.getAddressCT().getResidenceName());
		    cityDist.setWrapText(true);
			cityDist.setMaxWidth(200);
			cityDist.setMinHeight(100);
			HBox hbox_city=new HBox();
			hbox_city.getChildren().add(cityDist);
			hbox_city.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_city, 3, i+2);
			
			
			Label road=new Label();
			road.setText(td.getAddressCT().getRoadOrStreet());
			road.setWrapText(true);
			road.setMaxWidth(200);
			road.setMinHeight(100);
			HBox hbox_road=new HBox();
			hbox_road.getChildren().add(road);
			hbox_road.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_road, 4, i+2);
			
			Label locality=new Label();
			locality.setText(td.getAddressCT().getLocalityOrArea());
			locality.setWrapText(true);
			locality.setMaxWidth(200);
			locality.setMinHeight(100);
			HBox hbox_locality=new HBox();
			hbox_locality.getChildren().add(locality);
			hbox_locality.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_locality, 5, i+2);
			
			Label town=new Label();
			town.setText(td.getAddressCT().getCityOrTownOrDistrict());
			town.setWrapText(true);
			town.setMaxWidth(200);
			town.setMinHeight(100);
			HBox hbox_town=new HBox();
			hbox_town.getChildren().add(town);
			hbox_town.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_town, 6, i+2);
			
			Label state=new Label();
			state.setText(ComboBoxOptionsCacher.getValueForKey("stateCode",td.getAddressCT().getStateCode()));
			state.setWrapText(true);
			state.setMaxWidth(165);
			state.setMinHeight(100);
			HBox hbox_state=new HBox();
			hbox_state.getChildren().add(state);
			hbox_state.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_state, 7, i+2);
			
			Label country=new Label();
			country.setText(ComboBoxOptionsCacher.getValueForKey("countryCode",td.getAddressCT().getCountryCode()));
			country.setWrapText(true);
			country.setMaxWidth(165);
			country.setMinHeight(100);
			HBox hbox_country=new HBox();
			hbox_country.getChildren().add(country);
			hbox_country.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_country, 8, i+2);
			
			Label pincode=new Label();
			pincode.setText(td.getAddressCT().getPinCode());
			pincode.setWrapText(true);
			pincode.setMaxWidth(165);
			pincode.setMinHeight(100);
			HBox hbox_pin=new HBox();
			hbox_pin.getChildren().add(pincode);
			hbox_pin.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_pin, 9, i+2);
			
			Label zipcode=new Label();
			zipcode.setText(td.getAddressCT().getZipCode());
			zipcode.setWrapText(true);
			zipcode.setMaxWidth(200);
			zipcode.setMinHeight(100);
			HBox hbox_zip=new HBox();
			hbox_zip.getChildren().add(zipcode);
			hbox_zip.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_zip, 10, i+2);
			
			Label trans=new Label();
			trans.setText(td.getNatureOfTrans());
			trans.setWrapText(true);
			trans.setMaxWidth(200);
			trans.setMinHeight(100);
			HBox hbox_trans=new HBox();
			hbox_trans.getChildren().add(trans);
			hbox_trans.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_trans, 11, i+2);
			
			Label pan=new Label();
			pan.setText(td.getPan());
			pan.setWrapText(true);
			pan.setMaxWidth(200);
			pan.setMinHeight(100);
			HBox hbox_pan=new HBox();
			hbox_pan.getChildren().add(pan);
			hbox_pan.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_pan, 12, i+2);
			
			Label amount=new Label();
			amount.setText(td.getAggAmount().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(100);
			HBox hbox_amount=new HBox();
			hbox_amount.getChildren().add(amount);
			hbox_amount.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid.add(hbox_amount, 13, i+2);

		}
		
	/*	if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totDon100Percent").isEmpty())
		{
			totalAmnt.setText("0");
		}
		else
		{
		totalAmnt.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totDon100Percent"));
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent").isEmpty()){
			totalAmnt_D.setText("0");}
		else{
			totalEligbleAmnt.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent"));}
		*/
		
		
	/*	for(int i =0;i<list1.size();i++)               
		{
			DoneeWithPan td = list1.get(i);
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(100);
			grid1.add(label, 0, i+1);
			
			Label name=new Label();
			name.setText(td.getDoneeWithPanName());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(100);
			grid1.add(name, 1, i+1);
			
			Label address=new Label();
			address.setText(td.getAddressDetail().getAddrDetail());
			address.setWrapText(true);
			address.setMaxWidth(165);
			address.setMinHeight(100);
			grid1.add(address, 2, i+1);
			
			Label cityDist=new Label();
			cityDist.setText(td.getAddressDetail().getCityOrTownOrDistrict());
			cityDist.setWrapText(true);
			cityDist.setMaxWidth(200);
			cityDist.setMinHeight(100);
			grid1.add(cityDist, 3, i+1);
			
			Label state=new Label();
			state.setText(ComboBoxOptionsCacher.getValueForKey("stateCode",td.getAddressDetail().getStateCode()));
			state.setWrapText(true);
			state.setMaxWidth(165);
			state.setMinHeight(100);
			grid1.add(state, 4, i+1);
			
			Label pincode=new Label();
			pincode.setText(td.getAddressDetail().getPinCode());
			pincode.setWrapText(true);
			pincode.setMaxWidth(165);
			pincode.setMinHeight(100);
			grid1.add(pincode, 5, i+1);
			
			Label pan=new Label();
			pan.setText(td.getDoneePAN());
			pan.setWrapText(true);
			pan.setMaxWidth(200);
			pan.setMinHeight(100);
			grid1.add(pan, 6, i+1);
			
			Label amount=new Label();
			amount.setText(td.getDonationAmt().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(100);
			grid1.add(amount, 7, i+1);
			
			Label eligible=new Label();
			eligible.setText(td.getDonationAmt().toString());
			eligible.setWrapText(true);
			eligible.setMaxWidth(200);
			eligible.setMinHeight(100);
			grid1.add(eligible, 8, i+1);
		}
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd").isEmpty())
		{
			totalAmnt_B.setText("0");
		}
		else
		{
		totalAmnt_B.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd"));
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent").isEmpty()){
			totalAmnt_D.setText("0");}
		else{
			totalEligbleAmnt_B.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent"));}
		
		
		
		for(int i =0;i<list2.size();i++)               
		{
			DoneeWithPan td = list2.get(i);
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(100);
			grid2.add(label, 0, i+1);
			
			Label name=new Label();
			name.setText(td.getDoneeWithPanName());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(100);
			grid2.add(name, 1, i+1);
			
			Label address=new Label();
			address.setText(td.getAddressDetail().getAddrDetail());
			address.setWrapText(true);
			address.setMaxWidth(165);
			address.setMinHeight(100);
			grid2.add(address, 2, i+1);
			
			Label cityDist=new Label();
			cityDist.setText(td.getAddressDetail().getCityOrTownOrDistrict());
			cityDist.setWrapText(true);
			cityDist.setMaxWidth(200);
			cityDist.setMinHeight(100);
			grid2.add(cityDist, 3, i+1);
			
			Label state=new Label();
			state.setText(ComboBoxOptionsCacher.getValueForKey("stateCode",td.getAddressDetail().getStateCode()));
			state.setWrapText(true);
			state.setMaxWidth(165);
			state.setMinHeight(100);
			grid2.add(state, 4, i+1);
			
			Label pincode=new Label();
			pincode.setText(td.getAddressDetail().getPinCode());
			pincode.setWrapText(true);
			pincode.setMaxWidth(165);
			pincode.setMinHeight(100);
			grid2.add(pincode, 5, i+1);
			
			Label pan=new Label();
			pan.setText(td.getDoneePAN());
			pan.setWrapText(true);
			pan.setMaxWidth(200);
			pan.setMinHeight(100);
			grid2.add(pan, 6, i+1);
			
			Label amount=new Label();
			amount.setText(td.getDonationAmt().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(100);
			grid2.add(amount, 7, i+1);
			
			Label eligible=new Label();
			eligible.setText(td.getDonationAmt().toString());
			eligible.setWrapText(true);
			eligible.setMaxWidth(200);
			eligible.setMinHeight(100);
			grid2.add(eligible, 8, i+1);
		}
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd").isEmpty())
		{
			totalAmnt_C.setText("0");
		}
		else
		{
		totalAmnt_C.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd"));
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd").isEmpty()){
			totalAmnt_D.setText("0");}
		else{
			totalEligbleAmnt_C.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd"));}
		
		
		for(int i =0;i<list3.size();i++)               
		{
			DoneeWithPan td = list3.get(i);
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(100);
			grid3.add(label, 0, i+1);
			
			Label name=new Label();
			name.setText(td.getDoneeWithPanName());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(100);
			grid3.add(name, 1, i+1);
			
			Label address=new Label();
			address.setText(td.getAddressDetail().getAddrDetail());
			address.setWrapText(true);
			address.setMaxWidth(165);
			address.setMinHeight(100);
			grid3.add(address, 2, i+1);
			
			Label cityDist=new Label();
			cityDist.setText(td.getAddressDetail().getCityOrTownOrDistrict());
			cityDist.setWrapText(true);
			cityDist.setMaxWidth(200);
			cityDist.setMinHeight(100);
			grid3.add(cityDist, 3, i+1);
			
			Label state=new Label();
			state.setText(ComboBoxOptionsCacher.getValueForKey("stateCode",td.getAddressDetail().getStateCode()));
			state.setWrapText(true);
			state.setMaxWidth(200);
			state.setMinHeight(100);
			grid3.add(state, 4, i+1);
			
			Label pincode=new Label();
			pincode.setText(td.getAddressDetail().getPinCode());
			pincode.setWrapText(true);
			pincode.setMaxWidth(165);
			pincode.setMinHeight(100);
			grid3.add(pincode, 5, i+1);
			
			Label pan=new Label();
			pan.setText(td.getDoneePAN());
			pan.setWrapText(true);
			pan.setMaxWidth(165);
			pan.setMinHeight(100);
			grid3.add(pan, 6, i+1);
			
			Label amount=new Label();
			amount.setText(td.getDonationAmt().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(100);
			grid3.add(amount, 7, i+1);
			
			Label eligible=new Label();
			eligible.setText(td.getDonationAmt().toString());
			eligible.setWrapText(true);
			eligible.setMaxWidth(200);
			eligible.setMinHeight(100);
			grid3.add(eligible, 8, i+1);
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd").isEmpty()){
			totalAmnt_D.setText("0");}
		else{
		totalAmnt_D.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd"));}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd").isEmpty()){
			totalAmnt_D.setText("0");}
		else{
			totalEligbleAmnt_D.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd"));}
		
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalDonationsUs80G").isEmpty()){
			totalAmnt_E.setText("0");}
		else{
		totalAmnt_E.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalDonationsUs80G"));}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalEligibleDonationsUs80G").isEmpty()){
			totalEligbleAmnt_E.setText("0");}
		else{
		totalEligbleAmnt_E.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalEligibleDonationsUs80G"));}

		*/
		
	}



}
