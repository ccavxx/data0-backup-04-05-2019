package com.itd.efiling.offline.ITR4.ctrl;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.OthersIncDtls;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

import javafx.fxml.Initializable;

public class Nature_Income extends TableViewController<OthersIncDtls> implements Initializable{

    @Override
    public OthersIncDtls getNewBean() {
        return new OthersIncDtls();
    }

	@Override
public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setNatureIncomeController(this);
	}

}
