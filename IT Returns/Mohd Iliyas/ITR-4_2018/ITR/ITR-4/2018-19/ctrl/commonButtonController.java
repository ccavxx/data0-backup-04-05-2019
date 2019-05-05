package com.itd.efiling.offline.ITR4.ctrl;

import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;

import com.itd.efiling.offline.common.player.ctrl.Form;
import com.itd.efiling.offline.javafx.ui.components.TableViewController;
import com.itd.efiling.offline.javafx.ui.components.ValBigIntegerField;
import com.itd.efiling.offline.javafx.ui.components.colorPaneController;

public class commonButtonController extends colorPaneController implements Initializable{
	public static Button buttonPointer;
	  @FXML
	  Button ePayBut;
	  
	  @FXML
		ValBigIntegerField AmntPay;
	  
	public commonButtonController() throws IOException {
		super();
		
	}

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		ITRView form = (ITRView) Form.getForm();
		form.setCommonButton(this);
		buttonPointer = ePayBut;

	}

	
	@FXML
    public void openLink(final Event e){
		ePayBut.setOnMouseEntered(new EventHandler<MouseEvent>(){

			@Override
			public void handle(MouseEvent event) {
				// TODO Auto-generated method stub
			    if(AmntPay!=null)
	       		{
	       			
	       		if(AmntPay.getText().equals("0") || AmntPay.getText()=="" ||  AmntPay.getText().isEmpty())
	       		{
	       			ePayBut.setDisable(true);
	       		}
	       		else
	       		{
	       			LOG.info("inside amntPay.getText() inside != 0");
	       			ePayBut.setDisable(false);
	       		}
	       		}
			}
			  
		  });
		ePayBut.setOnMouseClicked(new EventHandler<MouseEvent>() {

            @Override
              public void handle(MouseEvent mouseEvent) {
              
            
             submitEpay();   
     		   
              
            }
           });

          
      }
	
}
