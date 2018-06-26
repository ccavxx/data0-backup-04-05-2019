package com.itd.efiling.offline.ITR4.ctrl;
import java.net.URL;
import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;
import java.util.List;
import java.util.ResourceBundle;

import com.itd.efiling.offline.ITR4.model.NatureOfBusiness;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.common.validation.validators.ValidationUtil;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;

public class NON_BP_Prev2 implements Initializable{



	@FXML
	GridPane grid;
	private Node children;

	@FXML
	Label grossTurnover, Incomefromsal, othermodeTextField, e1aTextfield, e1bTextfield, totalTextfield, grossTextField,
	carriageTextField, TextField44ADA, salaryTextField, TextField44AE, professionTextField, E9TextField,
	E10TextField, E11TextField, E12TextField, E13TextField, E14TextField, E15TextField, E16TextField,
	E17TextField, E18TextField, E19TextField, E20TextField, E21TextField, E22TextField, E23TextField,GSTRField,receiptField;


	@Override
	public void initialize(URL location, ResourceBundle resources) {


		String temp=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank");
        String Incomefromsaltext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank");
        String othermodeTextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode");
        String e1aTextfieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD6Per");
        String e1bTextfieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD8Per");
        String totalTextfieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD");
        String grossTextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.grsReceipt");
        String carriageTextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA");
        String TextField44ADAtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE");
        String TextField44AEtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm");
        String salaryTextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totalPersumptiveInc");
        String professionTextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.incChargeableUnderBus");
        String GSTRFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.turnoverGrsRcptForGST.gstrNo");
        String receiptFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.turnoverGrsRcptForGST.amtTurnGrossRcptGST");
		String E9TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.partnerMemberOwnCapital");
        String E10TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSecuredLoans");
        String E11TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totUnSecuredLoans");
        String E12TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totAdvances");
        String E13TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSundryCreditors");
        String E14TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totOthrCurrLiab");
        String E15TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSrcOfFunds");
        String E16TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.fixedAssets");
        String E17TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.inventories");
        String E18TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.sundryDebtors");
        String E19TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.balWithBanks");
        String E20TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totCashInHand");
        String E21TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.loansAndAdvances");
        String E22TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.otherAssets");
        String E23TextFieldtext=OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totApplnOfFunds");

		
		
		LOG.info("e1aTextfieldtext ::"+e1aTextfieldtext);
		LOG.info("e1bTextfieldtext ::"+e1bTextfieldtext);
		LOG.info("totalTextfieldtext ::"+totalTextfieldtext);
        if(Incomefromsaltext.equals("empty"))
        {
        	Incomefromsal.setText("");
        }
        else
        {
        	Incomefromsal.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverBank"));
        }
        if(othermodeTextFieldtext.equals("empty"))
        {
        	othermodeTextField.setText("");
        }
        else
        {
        	othermodeTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.grsTrnOverAnyOthMode"));
        }	
        if(e1aTextfieldtext.equals("empty"))
        {
        	e1aTextfield.setText("");
        }
        else
        {
        	e1aTextfield.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD6Per"));
        }
        if(e1bTextfieldtext.equals("empty"))
        {
        	e1bTextfield.setText("");
        }
        else
        {
        	e1bTextfield.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.persumptiveInc44AD8Per"));
        }
        if(totalTextfieldtext.equals("empty"))
        {
        	totalTextfield.setText("");
        }
        else
        {
        	totalTextfield.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AD.totPersumptiveInc44AD"));
        }
        if(grossTextFieldtext.equals("empty"))
        {
        	grossTextField.setText("");
        }
        else
        {
        	grossTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.grsReceipt"));
        }
        if(carriageTextFieldtext.equals("empty"))
        {
        	carriageTextField.setText("");
        }
        else
        {
        	carriageTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44ADA.totPersumptiveInc44ADA"));
        }
        if(TextField44ADAtext.equals("empty"))
        {
        	TextField44ADA.setText("");
        }
        else
        {
        	TextField44ADA.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totPersumInc44AE"));
        }
        
        if(TextField44AEtext.equals("empty"))
        {
        	TextField44AE.setText("");
        }
        else
        {
        	TextField44AE.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.salInterestByFirm"));
        }
        if(salaryTextFieldtext.equals("empty"))
        {
        	salaryTextField.setText("");
        }
        else
        {
        	salaryTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.totalPersumptiveInc"));
        }
        
        if(professionTextFieldtext.equals("empty"))
        {
        	professionTextField.setText("");
        }
        else
        {
        	professionTextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.persumptiveInc44AE.incChargeableUnderBus"));
        }
        if(E9TextFieldtext.equals("empty"))
        {
        	E9TextField.setText("");
        }
        else
        {
        	E9TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.partnerMemberOwnCapital"));
        }
        
        if(E10TextFieldtext.equals("empty"))
        {
        	E10TextField.setText("");
        }
        else
        {
        	E10TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSecuredLoans"));
        }
        if(E11TextFieldtext.equals("empty"))
        {
        	E11TextField.setText("");
        }
        else
        {
        	E11TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totUnSecuredLoans"));
        }
        if(E12TextFieldtext.equals("empty"))
        {
    		E12TextField.setText("");

        }
        else
        {
    		E12TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totAdvances"));

        }
        if(E13TextFieldtext.equals("empty"))
        {
    		E13TextField.setText("");
        }
        else
        {
    		E13TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSundryCreditors"));
        }
        if(E14TextFieldtext.equals("empty"))
        {
    		E14TextField.setText("");
        }
        else
        {
    		E14TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totOthrCurrLiab"));
        }
        if(E15TextFieldtext.equals("empty"))
        {
    		E15TextField.setText("");
        }
        else
        {
    		E15TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totSrcOfFunds"));
        }
        if(E16TextFieldtext.equals("empty"))
        {
    		E16TextField.setText("");
        }
        else
        {
    		E16TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.fixedAssets"));
        }
        if(E17TextFieldtext.equals("empty"))
        {
    		E17TextField.setText("");
        }
        else
        {
    		E17TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.inventories"));
        }
        if(E18TextFieldtext.equals("empty"))
        {
    		E18TextField.setText("");
        }
        else
        {
    		E18TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.sundryDebtors"));
        }
        if(E19TextFieldtext.equals("empty"))
        {
    		E19TextField.setText("");
        }
        else
        {
    		E19TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.balWithBanks"));
        }
        if(E20TextFieldtext.equals("empty"))
        {
    		E20TextField.setText("");
        }
        else
        {
    		E20TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totCashInHand"));
        }
        if(E21TextFieldtext.equals("empty"))
        {
    		E21TextField.setText("");
        }
        else
        {
    		E21TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.loansAndAdvances"));
        }
        if(E22TextFieldtext.equals("empty"))
        {
    		E22TextField.setText("");
        }
        else
        {
    		E22TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.otherAssets"));
        }
        if(E23TextFieldtext.equals("empty"))
        {
    		E23TextField.setText("");
        }
        else
        {
    		E23TextField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.noBooksOfAccBS.totApplnOfFunds"));
        }
        if(GSTRFieldtext.equals("empty"))
        {
        	GSTRField.setText("");
        }
        else
        {
        	GSTRField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.turnoverGrsRcptForGST.gstrNo"));
        }
        if(receiptFieldtext.equals("empty"))
        {
        	receiptField.setText("");
        }
        else
        {
        	receiptField.setText(OnChangeUtil.getElementValueByTargetName("itr.itr4.scheduleBP.turnoverGrsRcptForGST.amtTurnGrossRcptGST"));
        }
		
		
		
		
		
		
		

}
}
