package com.itd.efiling.offline.ITR4.ctrl;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.DoneeWithPan;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;

public class Tables80GController_prev implements Initializable{

	@FXML
	GridPane grid,grid1,grid2,grid3;
	
	@FXML
	Label totalAmnt,totalEligbleAmnt,totalAmnt_B,totalEligbleAmnt_B,totalAmnt_C,totalEligbleAmnt_C,totalAmnt_D,totalEligbleAmnt_D,totalAmnt_E,totalEligbleAmnt_E;
	
	@SuppressWarnings("unchecked")
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		//ITRView form = (ITRView) Form.getForm();
		List<DoneeWithPan> list =(List<DoneeWithPan>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable1").getTableView().getItems();
		List<DoneeWithPan> list1 =(List<DoneeWithPan>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable2").getTableView().getItems();
		List<DoneeWithPan> list2 =(List<DoneeWithPan>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80GTable3").getTableView().getItems();
		List<DoneeWithPan> list3 =(List<DoneeWithPan>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.ITR4_80G").getTableView().getItems();
		
		LOG.info("list message ::"+list.size());
		
		for(int i =0;i<list.size();i++)               
		{
			DoneeWithPan td = list.get(i);
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(100);
			grid.add(label, 0, i+1);
			
			Label name=new Label();
			name.setText(td.getDoneeWithPanName());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(100);
			grid.add(name, 1, i+1);
			
			Label address=new Label();
			address.setText(td.getAddressDetail().getAddrDetail());
			address.setWrapText(true);
			address.setMaxWidth(165);
			address.setMinHeight(100);
			grid.add(address, 2, i+1);
			
			Label cityDist=new Label();
			cityDist.setText(td.getAddressDetail().getCityOrTownOrDistrict());
			cityDist.setWrapText(true);
			cityDist.setMaxWidth(200);
			cityDist.setMinHeight(100);
			grid.add(cityDist, 3, i+1);
			
			Label state=new Label();
			state.setText(ComboBoxOptionsCacher.getValueForKey("stateCode",td.getAddressDetail().getStateCode()));
			state.setWrapText(true);
			state.setMaxWidth(165);
			state.setMinHeight(100);
			grid.add(state, 4, i+1);
			
			Label pincode=new Label();
			pincode.setText(td.getAddressDetail().getPinCode());
			pincode.setWrapText(true);
			pincode.setMaxWidth(165);
			pincode.setMinHeight(100);
			grid.add(pincode, 5, i+1);
			
			Label pan=new Label();
			pan.setText(td.getDoneePAN());
			pan.setWrapText(true);
			pan.setMaxWidth(200);
			pan.setMinHeight(100);
			grid.add(pan, 6, i+1);
			
			Label amount=new Label();
			amount.setText(td.getDonationAmt().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(100);
			grid.add(amount, 7, i+1);
			
			Label eligible=new Label();
			eligible.setText(td.getDonationAmt().toString());
			eligible.setWrapText(true);
			eligible.setMaxWidth(200);
			eligible.setMinHeight(100);
			grid.add(eligible, 8, i+1);
			
			
		}
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totDon100Percent").toString().equals("empty"))
		{
			totalAmnt.setText("0");
		}
		else
		{
		totalAmnt.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totDon100Percent"));
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent").toString().equals("empty")){
			totalAmnt_D.setText("0");}
		else{
			totalEligbleAmnt.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100Percent.totEligibleDon100Percent"));}
		
		
		
		for(int i =0;i<list1.size();i++)               
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
			eligible.setText(td.getEligibleDonationAmt().toString());
			eligible.setWrapText(true);
			eligible.setMaxWidth(200);
			eligible.setMinHeight(100);
			grid1.add(eligible, 8, i+1);
		}
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd").toString().equals("empty"))
		{
			totalAmnt_B.setText("0");
		}
		else
		{
		totalAmnt_B.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.totDon50PercentNoApprReqd"));
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentNoApprReqd.TotEligibleDon50Percent").toString().equals("empty")){
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
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd").toString().equals("empty"))
		{
			totalAmnt_C.setText("0");
		}
		else
		{
		totalAmnt_C.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totDon100PercentApprReqd"));
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don100PercentApprReqd.totEligibleDon100PercentApprReqd").toString().equals("empty")){
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
			eligible.setText(td.getEligibleDonationAmt().toString());
			eligible.setWrapText(true);
			eligible.setMaxWidth(200);
			eligible.setMinHeight(100);
			eligible.setStyle("-fx-padding:0 0 0 20;-fx-font-weight:bold;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			grid3.add(eligible, 8, i+1);
		}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd").toString().equals("empty")){
			totalAmnt_D.setText("0");}
		else{
		totalAmnt_D.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totDon50PercentApprReqd"));}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd").toString().equals("empty")){
			totalAmnt_D.setText("0");}
		else{
			totalEligbleAmnt_D.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.don50PercentApprReqd.totEligibleDon50PercentApprReqd"));}
		
		
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalDonationsUs80G").toString().equals("empty")){
			totalAmnt_E.setText("0");}
		else{
		totalAmnt_E.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalDonationsUs80G"));}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalEligibleDonationsUs80G").toString().equals("empty")){
			totalEligbleAmnt_E.setText("0");}
		else{
		totalEligbleAmnt_E.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.schedule80G.totalEligibleDonationsUs80G"));}

		
		
	}



}
