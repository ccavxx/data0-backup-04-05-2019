package com.itd.efiling.offline.ITR4.ctrl;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TDSonSalary;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

import javafx.fxml.Initializable;

public class TaxDeductedFrmSal extends TableViewController<TDSonSalary> implements Initializable{

    @Override
    public TDSonSalary getNewBean() {
    	 RefHolders.limitRows=false;
        return new TDSonSalary();
    }

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setTaxDetailsTabController(this);
		
	}

}
