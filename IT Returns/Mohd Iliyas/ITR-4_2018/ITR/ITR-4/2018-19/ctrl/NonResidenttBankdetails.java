package com.itd.efiling.offline.ITR4.ctrl;

import javafx.fxml.Initializable;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.BankDetailType;
import com.itd.efiling.offline.ITR4.model.ForeignBankDtls;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

public class NonResidenttBankdetails extends TableViewController<ForeignBankDtls> implements Initializable{

    @Override
    public ForeignBankDtls getNewBean() {
        return new ForeignBankDtls();
    }

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setForeignBankDetailsController(this);
	}


}
