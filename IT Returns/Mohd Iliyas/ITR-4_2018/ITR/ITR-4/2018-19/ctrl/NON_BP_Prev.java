package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.NatureOfBusiness;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;

public class NON_BP_Prev implements Initializable{
	
	
	
	@FXML
	GridPane grid;
	private Node children;
	
	@FXML
	Label Incomefromsal,othermodeTextField,presumptiveTextField,e1aTextfield,e1bTextfield,totalTextfield,grossTextField,carriageTextField,TextField44ADA,salaryTextField
	,TextField44AE,professionTextField,E9TextField,E10TextField,E11TextField,E12TextField;
	
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		 ITRView form = (ITRView) Form.getForm();
		List<NatureOfBusiness> list =(List<NatureOfBusiness>) ValidationUtil.ALL_TVC.get("class com.itd.efiling.offline.ITR4.ctrl.NatureOfBusiness_Table").getTableView().getItems();
		
		for(int i =0;i<list.size();i++)
		{
			NatureOfBusiness td = list.get(i);
			Label s1=new Label(String.valueOf(i+1));
			s1.setWrapText(true);
			s1.maxWidth(150);
			s1.minHeight(20);
			s1.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 15;");
			grid.add(s1, 0, i+1);
			
			Label code=new Label(td.getCode().toString());
			code.setWrapText(true);
			code.maxWidth(150);
			code.minHeight(60);
			code.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 80;");
			grid.add(code,1,i+1);
			
			if(td.getTradeName1() !=null)
			{
			Label trade1=new Label(td.getTradeName1().toString());
			trade1.setWrapText(true);
			trade1.maxWidth(140);
			trade1.minHeight(20);
			trade1.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 170;");
			grid.add(trade1,2,i+1);
			}
			else
			{
				Label trade1=new Label("");
				trade1.setWrapText(true);
				trade1.maxWidth(140);
				trade1.minHeight(20);
				trade1.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 170;");
				grid.add(trade1,2,i+1);
			}
			
			if(td.getTradeName2() != null)
			{
			Label trade2=new Label(td.getTradeName2().toString());
			trade2.setWrapText(true);
			trade2.maxWidth(140);
			trade2.minHeight(20);
			trade2.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 170;");
			grid.add(trade2,3,i+1);
			}
			else
			{
				Label trade2=new Label("");
				trade2.setWrapText(true);
				trade2.maxWidth(140);
				trade2.minHeight(20);
				trade2.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 170;");
				grid.add(trade2,3,i+1);
			}
			
			if(td.getTradeName3() != null)
			{
			Label trade3=new Label(td.getTradeName3().toString());
			trade3.setWrapText(true);
			trade3.maxWidth(140);
			trade3.minHeight(20);
			trade3.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 170;");
			grid.add(trade3,4,i+1);
			}
			else
			{
				Label trade3=new Label("");
				trade3.setWrapText(true);
				trade3.maxWidth(140);
				trade3.minHeight(20);
				trade3.setStyle("-fx-font-weight:bold;-fx-padding:0 0 0 170;");
				grid.add(trade3,4,i+1);
			}
			
		}
		String temp=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank");
		
	
		
}
}
