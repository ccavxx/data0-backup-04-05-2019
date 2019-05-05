package com.itd.efiling.offline.ITR4.ctrl;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.TaxPayment;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;

import javafx.fxml.Initializable;

public class TaxPaymentController extends TableViewController<TaxPayment> implements Initializable{

    @Override
    public TaxPayment getNewBean() {
    	 RefHolders.limitRows=false;
        return new TaxPayment ();
    }
    
    @Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setAdvancedTax(this);
		
	}


}
