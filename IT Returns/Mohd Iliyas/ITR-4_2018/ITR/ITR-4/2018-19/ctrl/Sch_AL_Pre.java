package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import java.util.ResourceBundle;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.util.DateUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;

public class Sch_AL_Pre  implements Initializable{

	@FXML
	Label immovableAssetFlag,jewellery,archaeological,vehicles,bank,shares,insurance,loans,cash,firm,wardTextField,totalTextfield;
	
	
	
	
	
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		// TODO Auto-generated method stub

		String x;
		x=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.immovableFlag");
		if(x.equalsIgnoreCase("Y"))
		{
			immovableAssetFlag.setText("Yes");
		}
		else if(x.equalsIgnoreCase("N"))
		{
			immovableAssetFlag.setText("No");
		}
		else
		{
			immovableAssetFlag.setText("");
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.jewelleryBullionEtc").equals("empty")){
			jewellery.setText("");}
		else{
			jewellery.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.jewelleryBullionEtc"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.archCollDrawPaintSulpArt").equals("empty")){
			archaeological.setText("");}
		else{
			archaeological.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.archCollDrawPaintSulpArt"));}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts").equals("empty")){
			vehicles.setText("");}
		else{
			vehicles.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.vehiclYachtsBoatsAircrafts"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.depositsInBank").equals("empty")){
			bank.setText("");}
		else{
			bank.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.depositsInBank"));}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.sharesAndSecurities").equals("empty")){
			shares.setText("");}
		else{
			shares.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.sharesAndSecurities"));}
		if (OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.insurancePolicies").equals("empty")) {
			insurance.setText("");
		} else {
			insurance.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.insurancePolicies"));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.loansAndAdvancesGiven").equals("empty"))
		{
			loans.setText("");
		}
		else
		{
			loans.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.loansAndAdvancesGiven"));
		}
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.cashInHand").equals("empty"))
		{
			cash.setText("");
		}
		else{
			cash.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.movableAsset.cashInHand"));
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.interstAOPFlag").equalsIgnoreCase("empty"))
		{
			firm.setText("");
		}
		else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.interstAOPFlag").equalsIgnoreCase("Y"))
		{
			firm.setText("Yes");
		}
		else if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.interstAOPFlag").equalsIgnoreCase("N"))
		{
			firm.setText("No");
		}
		
		if(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.liabilityInRelatAssets").equals("empty"))
		{
			totalTextfield.setText("");
		}
		else
		{
			totalTextfield.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleAL.liabilityInRelatAssets"));
		}
		
		
		
		
	}
	


}
