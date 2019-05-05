package com.itd.efiling.offline.ITR4.ctrl;

import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;

import java.net.URL;
import java.util.ResourceBundle;

import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;

import com.itd.efiling.offline.ITR4.model.InterestHeldInaAsset;
import com.itd.efiling.offline.ITR4.model.Us44AeHeavy;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

public class AOP_Table extends TableViewController<InterestHeldInaAsset> implements Initializable{

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setAopController(this);
		
	}

	@Override
	public InterestHeldInaAsset getNewBean() {
		 RefHolders.limitRows=false;
		// TODO Auto-generated method stub
		return new InterestHeldInaAsset();
	}

	/*@Override
	public Us44AeHeavy getNewBean() {
		
		return new Us44AeHeavy();
	}*/

	



}
