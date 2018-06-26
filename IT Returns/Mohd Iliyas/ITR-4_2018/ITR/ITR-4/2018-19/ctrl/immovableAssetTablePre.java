package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.ImmovableDetails;
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

public class immovableAssetTablePre implements Initializable{
	
	
	
	@FXML
	GridPane immovableAssetTablePre;
	private Node children;
	
	
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
	
		@SuppressWarnings("unchecked")
		List<ImmovableDetails> immovableDetails = (List<ImmovableDetails>) ValidationUtil.ALL_TVC
				.get("class com.itd.efiling.offline.ITR4.ctrl.ImmovableDetails_Table").getTableView().getItems();

		for (int i = 0; i < immovableDetails.size(); i++) {
			ImmovableDetails td = immovableDetails.get(i);
		
			
			Label label=new Label();
			label.setText(String.valueOf(i+1));
			label.setWrapText(true);
			label.setMaxWidth(200);
			label.setMinHeight(30);
			HBox sno=new HBox();
			sno.getChildren().add(label);
			sno.setStyle("-fx-padding:6 0 0 40;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(sno, 0, i+2);
			
			Label name=new Label();
			name.setText(td.getDescription());
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
			hbox_address.setStyle("-fx-padding:6 0 0 5;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
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
			
				
			Label amount=new Label();
			amount.setText(td.getAmount().toString());
			amount.setWrapText(true);
			amount.setMaxWidth(200);
			amount.setMinHeight(50);
			HBox hbox_amount=new HBox();
			hbox_amount.getChildren().add(amount);
			hbox_amount.setStyle("-fx-padding:0 0 0 120;-fx-border-style: solid inside;-fx-border-width:1 1 1 1;-fx-border-color: grey;");
			immovableAssetTablePre.add(hbox_amount, 10, i+2);
			/*Label lab =new Label(String.valueOf(i + 1));
			lab.setWrapText(true);
			lab.setMinHeight(100);
			lab.setPrefWidth(60);
			immovableAssetTablePre.setMargin(lab, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(lab, 0, i + 1);

			Label label,label2,label3,label4,label5,label6,label7,label8,label9,label10;
			
			label = new Label(td.getDescription().toString());
			label.setWrapText(true);
			label.setMinHeight(100);
			label.setPrefWidth(300);
			immovableAssetTablePre.setMargin(label, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(label, 1, i + 1);

			
			
			Label label11=new Label(td.getAddressAL().getResidenceNo().toString());
			HBox HBox1=new HBox();
			label11.setWrapText(true);
			Separator sep=new Separator();
			sep.maxHeight(220);
			sep.setOrientation(Orientation.VERTICAL);
			label11.setMinHeight(100);
			label11.setPrefWidth(100);
	
			HBox1.setMargin(label11, new Insets(5, 10, 5, 10));
			HBox1.getChildren().addAll(label11,sep);
			
			immovableAssetTablePre.setMargin(HBox1, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox1, 2,
					i + 1);
			if(td.getAddressAL().getResidenceNo() != null){

			Label label21=new Label(td.getAddressAL().getResidenceName().toString());
			HBox HBox2=new HBox();
			label21.setWrapText(true);
			Separator sep1=new Separator();
			sep1.maxHeight(220);
			sep1.setOrientation(Orientation.VERTICAL);
			//label1.setMinSize(70, 75);
			label21.setMinHeight(100);
			label21.setPrefWidth(160);
			HBox1.setMargin(label21, new Insets(5, 10, 5, 10));
			HBox1.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
			HBox1.getChildren().addAll(label21,sep1);
			immovableAssetTablePre.setMargin(HBox2, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox2, 2,
					i + 1);
			
			}
			else{
				Label label21=new Label("");
				HBox HBox2=new HBox();
				label21.setWrapText(true);
				Separator sep1=new Separator();
				sep1.maxHeight(220);
				sep1.setOrientation(Orientation.VERTICAL);
				//label1.setMinSize(70, 75);
				label21.setMinHeight(100);
				label21.setPrefWidth(160);
				HBox1.setMargin(label21, new Insets(5, 10, 5, 10));
				HBox1.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
				HBox1.getChildren().addAll(label21,sep1);
				immovableAssetTablePre.setMargin(HBox2, new Insets(5, 10, 5, 10));
				immovableAssetTablePre.add(HBox2, 2,
						i + 1);	
			}
			
			
			if(td.getAddressAL().getRoadOrStreet()!= null){

			Label label22=new Label(td.getAddressAL().getRoadOrStreet().toString());
			HBox HBox3=new HBox();
			Separator sep2=new Separator();
			sep2.maxHeight(220);
			sep2.setOrientation(Orientation.VERTICAL);
			label22.setWrapText(true);
			//label1.setMinSize(70, 75);
			label22.setMinHeight(100);
			label22.setPrefWidth(140);
		
			HBox1.setMargin(label22, new Insets(5, 10, 5, 10));
			HBox3.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
			HBox1.getChildren().addAll(label22,sep2);
			immovableAssetTablePre.setMargin(HBox3, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox3, 2,
					i + 1);
			}else{
				Label label22=new Label("");
				HBox HBox3=new HBox();
				Separator sep2=new Separator();
				sep2.maxHeight(220);
				sep2.setOrientation(Orientation.VERTICAL);
				label22.setWrapText(true);
				//label1.setMinSize(70, 75);
				label22.setMinHeight(100);
				label22.setPrefWidth(140);
			
				HBox1.setMargin(label22, new Insets(5, 10, 5, 10));
				HBox3.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
				HBox1.getChildren().addAll(label22,sep2);
				immovableAssetTablePre.setMargin(HBox3, new Insets(5, 10, 5, 10));
				immovableAssetTablePre.add(HBox3, 2,
						i + 1);
			}
			
			Label label31=new Label(td.getAddressAL().getRoadOrStreet().toString());
			HBox HBox4=new HBox();
			Separator sep3=new Separator();
			sep3.maxHeight(220);
			sep3.setOrientation(Orientation.VERTICAL);
			label31.setWrapText(true);
			//label1.setMinSize(70, 75);
			label31.setMinHeight(100);
			label31.setPrefWidth(140);
		
			
			HBox1.setMargin(label31, new Insets(5, 10, 5, 10));
			HBox4.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
			HBox1.getChildren().addAll(label31,sep3);
			immovableAssetTablePre.setMargin(HBox4, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox4, 2,
					i + 1);
			
			
			Label labe=new Label(td.getAddressAL().getLocalityOrArea().toString());
			HBox HBox4a=new HBox();
			Separator sep3a=new Separator();
			sep3.maxHeight(220);
			sep3.setOrientation(Orientation.VERTICAL);
			label31.setWrapText(true);
			//label1.setMinSize(70, 75);
			labe.setMinHeight(100);
			labe.setPrefWidth(140);
		
			
			HBox1.setMargin(labe, new Insets(5, 10, 5, 10));
			HBox4a.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
			HBox1.getChildren().addAll(labe,sep3a);
			immovableAssetTablePre.setMargin(HBox4a, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox4a, 2,
					i + 1);
			
			Label label32=new Label(td.getAddressAL().getCityOrTownOrDistrict().toString());
			Separator sep4=new Separator();
			sep4.maxHeight(220);
			sep4.setOrientation(Orientation.VERTICAL);
			HBox HBox5=new HBox();
			label32.setWrapText(true);
			//label1.setMinSize(70, 75);
			label32.setMinHeight(100);
			label32.setPrefWidth(120);
			
			HBox1.setMargin(label32, new Insets(5, 10, 5, 10));
			HBox5.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
			HBox1.getChildren().addAll(label32,sep4);
			immovableAssetTablePre.setMargin(HBox5, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox5, 2,
					i + 1);
			
			
		
			
			String stateValue=ComboBoxOptionsCacher.getValue("immovableDetailsController.type.addressAL.stateCode",td.getAddressAL().getStateCode().toString());
			Label label34=new Label(stateValue);
			Separator sep5=new Separator();
			sep5.maxHeight(220);
			sep5.setOrientation(Orientation.VERTICAL);
			HBox HBox7=new HBox();
			label34.setWrapText(true);
			//label1.setMinSize(70, 75);
			label34.setMinHeight(100);
			label34.setPrefWidth(120);
			HBox1.setMargin(label34, new Insets(5, 10, 5, 10));
			HBox7.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
			HBox1.getChildren().addAll(label34,sep5);
			immovableAssetTablePre.setMargin(HBox7, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox7, 2,
					i + 1);
			
			
			String countryValue=ComboBoxOptionsCacher.getValue("immovableDetailsController.type.addressAL.countryCode",td.getAddressAL().getCountryCode().toString());
			Label label35=new Label(countryValue);
			Separator sep6=new Separator();
			sep6.maxHeight(220);
			sep6.setOrientation(Orientation.VERTICAL);
			HBox HBox8=new HBox();
			label35.setWrapText(true);
			//label1.setMinSize(70, 75);
			label35.setMinHeight(100);
			label35.setPrefWidth(120);
			HBox1.setMargin(label35, new Insets(5, 10, 5, 10));
			HBox8.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
			HBox1.getChildren().addAll(label35,sep6);
			immovableAssetTablePre.setMargin(HBox8, new Insets(5, 10, 5, 10));
			immovableAssetTablePre.add(HBox8, 2,
					i + 1);
			
		
			Label label36=new Label(td.getAddressAL().getPinCode().toString());
			
			HBox HBox9=new HBox();
			label36.setWrapText(true);
			//label1.setMinSize(70, 75);
			label36.setMinHeight(100);
			label36.setPrefWidth(100);
			HBox1.setMargin(label36, new Insets(5, 10, 5, 10));
		    HBox1.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
		    HBox1.getChildren().add(label36);
		    immovableAssetTablePre.setMargin(HBox9, new Insets(5, 10, 5, 10));
		    immovableAssetTablePre.add(HBox9, 2,
					i + 1);
			
		    Label label37=new Label(td.getAmount().toString());
			
			HBox HBox10=new HBox();
			label37.setWrapText(true);
			//label1.setMinSize(70, 75);
			label37.setMinHeight(100);
			label37.setPrefWidth(100);
			HBox1.setMargin(label37, new Insets(5, 10, 5, 10));
		    HBox1.setStyle("-fx-padding:5;-fx-border-style: solid inside;-fx-border-width:0 0 0 0;-fx-border-color: grey;");
		    HBox1.getChildren().add(label37);
		    immovableAssetTablePre.setMargin(HBox10, new Insets(5, 10, 5, 10));
		    immovableAssetTablePre.add(HBox10, 4,
					i + 1);*/
		

		}
		
}
}