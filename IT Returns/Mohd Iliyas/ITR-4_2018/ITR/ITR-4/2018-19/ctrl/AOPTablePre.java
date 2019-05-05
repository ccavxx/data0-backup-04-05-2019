package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.ImmovableDetails;
import com.itd.efiling.offline.ITR4.model.InterestHeldInaAsset;
import com.itd.efiling.offline.ITR4.model.NatureOfBusiness;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.config.ComboBoxOptionsCacher;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.geometry.Orientation;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.control.Separator;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;

public class AOPTablePre implements Initializable{
	
	
	
	@FXML
	GridPane immovableAssetTablePre;
	private Node children;
	
	
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
	
		@SuppressWarnings("unchecked")
		List<InterestHeldInaAsset> immovableDetails = (List<InterestHeldInaAsset>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.AOP_Table").getTableView().getItems();

		for (int i = 0; i < immovableDetails.size(); i++) {
			InterestHeldInaAsset td = immovableDetails.get(i);
		
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(30);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:6 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(sno, 0, i+2);
			
			Label name=new Label();
			name.setText(td.getNameOfFirm());
			name.setWrapText(true);
			name.setMaxWidth(200);
			name.setMinHeight(30);
			HBox hbox_name=new HBox();
			hbox_name.getChildren().add(name);
			hbox_name.setStyle("-fx-padding:6 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_name, 1, i+2);
			
			Label address=new Label();
			address.setText(td.getAddressAL().getResidenceNo());
			address.setWrapText(true);
			address.setMaxWidth(165);
			address.setMinHeight(30);
			HBox hbox_address=new HBox();
			hbox_address.getChildren().add(address);
			hbox_address.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_address, 2, i+2);
			
			Label cityDist=new Label();
		    cityDist.setText(td.getAddressAL().getResidenceName());
		    cityDist.setWrapText(true);
			cityDist.setMaxWidth(200);
			cityDist.setMinHeight(40);
			HBox hbox_city=new HBox();
			hbox_city.getChildren().add(cityDist);
			hbox_city.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_city, 3, i+2);
			
			
			Label road=new Label();
			road.setText(td.getAddressAL().getRoadOrStreet());
			road.setWrapText(true);
			road.setMaxWidth(200);
			road.setMinHeight(50);
			HBox hbox_road=new HBox();
			hbox_road.getChildren().add(road);
			hbox_road.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_road, 4, i+2);
			
			Label locality=new Label();
			locality.setText(td.getAddressAL().getLocalityOrArea());
			locality.setWrapText(true);
			locality.setMaxWidth(200);
			locality.setMinHeight(50);
			HBox hbox_locality=new HBox();
			hbox_locality.getChildren().add(locality);
			hbox_locality.setStyle("-fx-padding:0;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_locality, 5, i+2);
			
			Label town=new Label();
			town.setText(td.getAddressAL().getCityOrTownOrDistrict());
			town.setWrapText(true);
			town.setMaxWidth(200);
			town.setMinHeight(50);
			HBox hbox_town=new HBox();
			hbox_town.getChildren().add(town);
			hbox_town.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_town, 6, i+2);
			
			Label state=new Label();
			state.setText(ComboBoxOptionsCacher.getValueForKey("stateCode",td.getAddressAL().getStateCode()));
			state.setWrapText(true);
			state.setMaxWidth(165);
			state.setMinHeight(50);
			HBox hbox_state=new HBox();
			hbox_state.getChildren().add(state);
			hbox_state.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_state, 7, i+2);
			
			Label country=new Label();
			country.setText(ComboBoxOptionsCacher.getValueForKey("countryCode",td.getAddressAL().getCountryCode()));
			country.setWrapText(true);
			country.setMaxWidth(165);
			country.setMinHeight(50);
			HBox hbox_country=new HBox();
			hbox_country.getChildren().add(country);
			hbox_country.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_country, 8, i+2);
			
			Label pincode=new Label();
			pincode.setText(td.getAddressAL().getPinCode());
			pincode.setWrapText(true);
			pincode.setMaxWidth(165);
			pincode.setMinHeight(50);
			HBox hbox_pin=new HBox();
			hbox_pin.getChildren().add(pincode);
			hbox_pin.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_pin, 9, i+2);
			
				
			Label pan=new Label();
			pan.setText(td.getPanOfFirm());
			pan.setWrapText(true);
			pan.setMaxWidth(200);
			pan.setMinHeight(50);
			HBox hbox_pan=new HBox();
			hbox_pan.getChildren().add(pan);
			hbox_pan.setStyle("-fx-padding:0 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_pan, 10, i+2);
			
			Label amount=new Label();
			amount.setText(td.getAssesseInvestment().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(50);
			HBox hbox_amount=new HBox();
			hbox_amount.getChildren().add(amount);
			hbox_amount.setStyle("-fx-padding:0 0 0 110;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_amount, 11, i+2);
		}
		
}
}