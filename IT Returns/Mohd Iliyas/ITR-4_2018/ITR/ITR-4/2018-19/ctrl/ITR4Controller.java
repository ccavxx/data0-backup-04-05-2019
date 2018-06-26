package com.itd.efiling.offline.ITR4.ctrl;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.common.player.ctrl.FormPlayerController;

import javafx.fxml.Initializable;

public class ITR4Controller implements Initializable {

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		// TODO Auto-generated method stub
		FormPlayerController formplayer = new FormPlayerController();
		formplayer.personalInfoScroll();
	}

		
}