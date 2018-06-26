package com.itd.efiling.offline.ITR4.ctrl;

import java.net.URL;
import java.util.ResourceBundle;
import com.itd.efiling.offline.ITR4.model.TDSDetails26QC;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.reference.holders.RefHolders;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;
import javafx.fxml.Initializable;


public class TDSDetails26QC_Controller extends TableViewController<TDSDetails26QC> implements Initializable {


	
    @Override
    public TDSDetails26QC getNewBean() {
    	 RefHolders.limitRows=false;
        return new TDSDetails26QC();
    }
    
    @Override
	public void initialize(URL location, ResourceBundle resources) {
    	
    	ITRView form = (ITRView) Form.getForm();
		form.setTdsDetails26QCIncomeController(this);
		
	}   
}
