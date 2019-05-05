package com.itd.efiling.offline.ITR4.ctrl;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.DoneeWithPan;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

import javafx.fxml.Initializable;

public class ITR4_80GTable3 extends TableViewController<DoneeWithPan> implements Initializable{

    @Override
    public DoneeWithPan getNewBean() {
    	 RefHolders.limitRows=false;
        return new DoneeWithPan();
    }

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setItr4_80GController3(this);
	}

}
