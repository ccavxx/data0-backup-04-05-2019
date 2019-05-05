package com.itd.efiling.offline.ITR4.ctrl;

import javafx.fxml.Initializable;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.BankDetailType;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

public class Income_Details_Table extends TableViewController<BankDetailType> implements Initializable{

    @Override
    public BankDetailType getNewBean() {
    	 RefHolders.limitRows=false;
        return new BankDetailType();
    }

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setIncomeDetailsController(this);
	}


}
