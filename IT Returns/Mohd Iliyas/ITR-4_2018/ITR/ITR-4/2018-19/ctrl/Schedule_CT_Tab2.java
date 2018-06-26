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

import com.itd.efiling.offline.ITR4.model.DoneeWithPan;
import com.itd.efiling.offline.ITR4.model.DtlsOfTransDurPrevYr;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

public class Schedule_CT_Tab2 extends TableViewController<DtlsOfTransDurPrevYr> implements Initializable{

	    @Override
    public DtlsOfTransDurPrevYr getNewBean() {
        return new DtlsOfTransDurPrevYr();
    }

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setControllerScheduleCT2(this);
		
	
		
	}



}
