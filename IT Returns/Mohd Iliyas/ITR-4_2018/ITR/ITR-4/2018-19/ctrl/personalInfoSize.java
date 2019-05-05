package com.itd.efiling.offline.ITR4.ctrl;

import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.paint.Color;


public class personalInfoSize implements Initializable {

	   @FXML
	   AnchorPane Content,Content1;
	   
	   
	   @FXML
	    Button ePayButton;
	   
	   @FXML
		
		Button colorButton,backColor,reduceButton,increaseButton,resetFontSize;

	   @FXML
		
	 		Label label1,label2,label3,label4,label5,label6,label7,label8,label9,label10,label11,label12,label13,label14,label15,label16,label17,label18,label19,label20,label21,label22,label23,label24,label25,label26,label27,label28,label29,label30,label31,label32,label33,label34,
	 		label36,label37,label38,label39,label40,label41,label42,label43,label44,label45,label46,label47,label48,label49,label50,label51,label52,
	 		label53,label54,label55,label56,label57,label58,label59,label60,label61,label62,label63,label35,label64;
	 	
	   Double k=1.0,k1=1.5;
	    
	   @FXML
		  public void changeColor(final Event e){
		 
		   colorButton.setOnKeyPressed(new EventHandler<KeyEvent>() {

				public void handle(KeyEvent keyEvent) {
					
					if(keyEvent.getCode()==KeyCode.ENTER)
		               {

					  Content.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
						if(label64!=null)
						{
							label64.setTextFill(Color.web("#ffd700"));
						}
						  
						  label1.setTextFill(Color.web("#ffd700"));
						  label2.setTextFill(Color.web("#ffd700"));
						  if(label3!=null)
						  {
						  label3.setTextFill(Color.web("#ffd700"));
						  }
						  label4.setTextFill(Color.web("#ffd700"));
						  label5.setTextFill(Color.web("#ffd700"));
						  label6.setTextFill(Color.web("#ffd700"));
						  label7.setTextFill(Color.web("#ffd700"));
						  label8.setTextFill(Color.web("#ffd700"));
						  label9.setTextFill(Color.web("#ffd700"));
						  label10.setTextFill(Color.web("#ffd700"));
						  if(label11!=null)
						  {
						  label11.setTextFill(Color.web("#ffd700"));
						  }
						  label12.setTextFill(Color.web("#ffd700"));
						  label13.setTextFill(Color.web("#ffd700"));
						  label14.setTextFill(Color.web("#ffd700"));
						  label15.setTextFill(Color.web("#ffd700"));
						  label16.setTextFill(Color.web("#ffd700"));
						  label17.setTextFill(Color.web("#ffd700"));
						  label18.setTextFill(Color.web("#ffd700"));
						  label19.setTextFill(Color.web("#ffd700"));
						  label20.setTextFill(Color.web("#ffd700"));
						  label21.setTextFill(Color.web("#ffd700"));
						  label22.setTextFill(Color.web("#ffd700"));
						  label23.setTextFill(Color.web("#ffd700"));
						  label24.setTextFill(Color.web("#ffd700"));
						  label25.setTextFill(Color.web("#ffd700"));
						  label26.setTextFill(Color.web("#ffd700"));
						  label27.setTextFill(Color.web("#ffd700"));
						  label28.setTextFill(Color.web("#ffd700"));
						  label29.setTextFill(Color.web("#ffd700"));
						  label30.setTextFill(Color.web("#ffd700"));
						  label31.setTextFill(Color.web("#ffd700"));
						  label32.setTextFill(Color.web("#ffd700"));
						  label33.setTextFill(Color.web("#ffd700"));
						  label34.setTextFill(Color.web("#ffd700"));
						  label35.setTextFill(Color.web("#ffd700"));
						  label36.setTextFill(Color.web("#ffd700"));
						  label37.setTextFill(Color.web("#ffd700"));
						  label38.setTextFill(Color.web("#ffd700"));
						  label39.setTextFill(Color.web("#ffd700"));
						  label40.setTextFill(Color.web("#ffd700"));
						  label41.setTextFill(Color.web("#ffd700"));
						  label42.setTextFill(Color.web("#ffd700"));
						  label43.setTextFill(Color.web("#ffd700"));
						  label44.setTextFill(Color.web("#ffd700"));
						  label45.setTextFill(Color.web("#ffd700"));
						  label46.setTextFill(Color.web("#ffd700"));
						  label47.setTextFill(Color.web("#ffd700"));
						  label48.setTextFill(Color.web("#ffd700"));
						  label49.setTextFill(Color.web("#ffd700"));
						  label50.setTextFill(Color.web("#ffd700"));
						  label51.setTextFill(Color.web("#ffd700"));
						  label52.setTextFill(Color.web("#ffd700"));
						  label53.setTextFill(Color.web("#ffd700"));
						  label54.setTextFill(Color.web("#ffd700"));
						  label55.setTextFill(Color.web("#ffd700"));
						  label56.setTextFill(Color.web("#ffd700"));
						  label57.setTextFill(Color.web("#ffd700"));
						  label58.setTextFill(Color.web("#ffd700"));
						  label59.setTextFill(Color.web("#ffd700"));
						  label60.setTextFill(Color.web("#ffd700"));
						  label61.setTextFill(Color.web("#ffd700"));
						  if(label62!=null)
						  {
						  label62.setTextFill(Color.web("#ffd700"));
						  }
						  if(label63!=null)
						  {
						  label63.setTextFill(Color.web("#ffd700"));
						 }
		               }
					  }
			         });
		   
		   colorButton.setOnMouseClicked(new EventHandler<MouseEvent>() {

				  @Override
	    			public void handle(MouseEvent mouseEvent) {
					
					  Content.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
					if(label64!=null)
					{
						label64.setTextFill(Color.web("#ffd700"));
					}
					  
					  label1.setTextFill(Color.web("#ffd700"));
					  label2.setTextFill(Color.web("#ffd700"));
					  if(label3!=null)
					  {
					  label3.setTextFill(Color.web("#ffd700"));
					  }
					  label4.setTextFill(Color.web("#ffd700"));
					  label5.setTextFill(Color.web("#ffd700"));
					  label6.setTextFill(Color.web("#ffd700"));
					  label7.setTextFill(Color.web("#ffd700"));
					  label8.setTextFill(Color.web("#ffd700"));
					  label9.setTextFill(Color.web("#ffd700"));
					  label10.setTextFill(Color.web("#ffd700"));
					  if(label11!=null)
					  {
					  label11.setTextFill(Color.web("#ffd700"));
					  }
					  label12.setTextFill(Color.web("#ffd700"));
					  label13.setTextFill(Color.web("#ffd700"));
					  label14.setTextFill(Color.web("#ffd700"));
					  label15.setTextFill(Color.web("#ffd700"));
					  label16.setTextFill(Color.web("#ffd700"));
					  label17.setTextFill(Color.web("#ffd700"));
					  label18.setTextFill(Color.web("#ffd700"));
					  label19.setTextFill(Color.web("#ffd700"));
					  label20.setTextFill(Color.web("#ffd700"));
					  label21.setTextFill(Color.web("#ffd700"));
					  label22.setTextFill(Color.web("#ffd700"));
					  label23.setTextFill(Color.web("#ffd700"));
					  label24.setTextFill(Color.web("#ffd700"));
					  label25.setTextFill(Color.web("#ffd700"));
					  label26.setTextFill(Color.web("#ffd700"));
					  label27.setTextFill(Color.web("#ffd700"));
					  label28.setTextFill(Color.web("#ffd700"));
					  label29.setTextFill(Color.web("#ffd700"));
					  label30.setTextFill(Color.web("#ffd700"));
					  label31.setTextFill(Color.web("#ffd700"));
					  label32.setTextFill(Color.web("#ffd700"));
					  label33.setTextFill(Color.web("#ffd700"));
					  label34.setTextFill(Color.web("#ffd700"));
					  label35.setTextFill(Color.web("#ffd700"));
					  label36.setTextFill(Color.web("#ffd700"));
					  label37.setTextFill(Color.web("#ffd700"));
					  label38.setTextFill(Color.web("#ffd700"));
					  label39.setTextFill(Color.web("#ffd700"));
					  label40.setTextFill(Color.web("#ffd700"));
					  label41.setTextFill(Color.web("#ffd700"));
					  label42.setTextFill(Color.web("#ffd700"));
					  label43.setTextFill(Color.web("#ffd700"));
					  label44.setTextFill(Color.web("#ffd700"));
					  label45.setTextFill(Color.web("#ffd700"));
					  label46.setTextFill(Color.web("#ffd700"));
					  label47.setTextFill(Color.web("#ffd700"));
					  label48.setTextFill(Color.web("#ffd700"));
					  label49.setTextFill(Color.web("#ffd700"));
					  label50.setTextFill(Color.web("#ffd700"));
					  label51.setTextFill(Color.web("#ffd700"));
					  label52.setTextFill(Color.web("#ffd700"));
					  label53.setTextFill(Color.web("#ffd700"));
					  label54.setTextFill(Color.web("#ffd700"));
					  label55.setTextFill(Color.web("#ffd700"));
					  label56.setTextFill(Color.web("#ffd700"));
					  label57.setTextFill(Color.web("#ffd700"));
					  label58.setTextFill(Color.web("#ffd700"));
					  label59.setTextFill(Color.web("#ffd700"));
					  label60.setTextFill(Color.web("#ffd700"));
					  label61.setTextFill(Color.web("#ffd700"));
					  if(label62!=null)
					  {
					  label62.setTextFill(Color.web("#ffd700"));
					  }
					  if(label63!=null)
					  {
					  label63.setTextFill(Color.web("#ffd700"));
					 
					  }
				  }
		         });

		        
		    }
		  
	
	   @FXML
		  public void backColor(final Event e){
		   
		   
		   backColor.setOnKeyPressed(new EventHandler<KeyEvent>() {

				public void handle(KeyEvent keyEvent) {
					if(keyEvent.getCode()==KeyCode.ENTER)
		               {

					  Content.setBackground(new Background(new BackgroundFill(Color.WHITESMOKE, CornerRadii.EMPTY, Insets.EMPTY)));
						
					  label1.setTextFill(Color.web("#000000"));
					  label2.setTextFill(Color.web("#000000"));
					  if(label3!=null)
					  {
					  label3.setTextFill(Color.web("#000000"));
					  }
					  label4.setTextFill(Color.web("#000000"));
					  label5.setTextFill(Color.web("#000000"));
					  
					  label6.setTextFill(Color.web("#000000"));
					  label7.setTextFill(Color.web("#000000"));
					  label8.setTextFill(Color.web("#000000"));
					  label9.setTextFill(Color.web("#000000"));
					  label10.setTextFill(Color.web("#000000"));
					  if(label11!=null)
					  {
					  label11.setTextFill(Color.web("#000000"));
					  }
					  label12.setTextFill(Color.web("#000000"));
					  label13.setTextFill(Color.web("#000000"));
					  label14.setTextFill(Color.web("#000000"));
					  label15.setTextFill(Color.web("#000000"));
					  label16.setTextFill(Color.web("#000000"));
					  label17.setTextFill(Color.web("#000000"));
					  label18.setTextFill(Color.web("#000000"));
					  label19.setTextFill(Color.web("#000000"));
					  label20.setTextFill(Color.web("#000000"));
					  label21.setTextFill(Color.web("#000000"));
					  label22.setTextFill(Color.web("#000000"));
					  label23.setTextFill(Color.web("#000000"));
					  label24.setTextFill(Color.web("#000000"));
					  label25.setTextFill(Color.web("#000000"));
					  label26.setTextFill(Color.web("#000000"));
					  label27.setTextFill(Color.web("#000000"));
					  label28.setTextFill(Color.web("#000000"));
					  label29.setTextFill(Color.web("#000000"));
					  label30.setTextFill(Color.web("#000000"));
					  label31.setTextFill(Color.web("#000000"));
					  label32.setTextFill(Color.web("#000000"));
					  label33.setTextFill(Color.web("#000000"));
					  label34.setTextFill(Color.web("#000000"));
					  label35.setTextFill(Color.web("#000000"));
					  label36.setTextFill(Color.web("#000000"));
					  label37.setTextFill(Color.web("#000000"));
					  label38.setTextFill(Color.web("#000000"));
					  label39.setTextFill(Color.web("#000000"));
					  label40.setTextFill(Color.web("#000000"));
					  label41.setTextFill(Color.web("#000000"));
					  label42.setTextFill(Color.web("#000000"));
					  label43.setTextFill(Color.web("#000000"));
					  label44.setTextFill(Color.web("#000000"));
					  label45.setTextFill(Color.web("#000000"));
					  label46.setTextFill(Color.web("#000000"));
					  label47.setTextFill(Color.web("#000000"));
					  label48.setTextFill(Color.web("#000000"));
					  label49.setTextFill(Color.web("#000000"));
					  label50.setTextFill(Color.web("#000000"));
					  label51.setTextFill(Color.web("#000000"));
					  label52.setTextFill(Color.web("#000000"));
					  label53.setTextFill(Color.web("#000000"));
					  label54.setTextFill(Color.web("#000000"));
					  label55.setTextFill(Color.web("#000000"));
					  label56.setTextFill(Color.web("#000000"));
					  label57.setTextFill(Color.web("#000000"));
					  label58.setTextFill(Color.web("#000000"));
					  label59.setTextFill(Color.web("#000000"));
					  label60.setTextFill(Color.web("#000000"));
					  label61.setTextFill(Color.web("#000000"));
					  if(label62!=null)
					  {
					  label62.setTextFill(Color.web("#000000"));
					  }
					  if(label63!=null)
					  {
					  label63.setTextFill(Color.web("#000000"));
					  }
					  if(label64!=null)
					  {
					  label64.setTextFill(Color.web("#000000"));
					  }
		               }
				  }
		         });
		   
		   backColor.setOnMouseClicked(new EventHandler<MouseEvent>() {

				  @Override
	    			public void handle(MouseEvent mouseEvent) {
					
					  Content.setBackground(new Background(new BackgroundFill(Color.WHITESMOKE, CornerRadii.EMPTY, Insets.EMPTY)));
					
					  label1.setTextFill(Color.web("#000000"));
					  label2.setTextFill(Color.web("#000000"));
					  if(label3!=null)
					  {
					  label3.setTextFill(Color.web("#000000"));
					  }
					  label4.setTextFill(Color.web("#000000"));
					  label5.setTextFill(Color.web("#000000"));
					  
					  label6.setTextFill(Color.web("#000000"));
					  label7.setTextFill(Color.web("#000000"));
					  label8.setTextFill(Color.web("#000000"));
					  label9.setTextFill(Color.web("#000000"));
					  label10.setTextFill(Color.web("#000000"));
					  if(label11!=null)
					  {
					  label11.setTextFill(Color.web("#000000"));
					  }
					  label12.setTextFill(Color.web("#000000"));
					  label13.setTextFill(Color.web("#000000"));
					  label14.setTextFill(Color.web("#000000"));
					  label15.setTextFill(Color.web("#000000"));
					  label16.setTextFill(Color.web("#000000"));
					  label17.setTextFill(Color.web("#000000"));
					  label18.setTextFill(Color.web("#000000"));
					  label19.setTextFill(Color.web("#000000"));
					  label20.setTextFill(Color.web("#000000"));
					  label21.setTextFill(Color.web("#000000"));
					  label22.setTextFill(Color.web("#000000"));
					  label23.setTextFill(Color.web("#000000"));
					  label24.setTextFill(Color.web("#000000"));
					  label25.setTextFill(Color.web("#000000"));
					  label26.setTextFill(Color.web("#000000"));
					  label27.setTextFill(Color.web("#000000"));
					  label28.setTextFill(Color.web("#000000"));
					  label29.setTextFill(Color.web("#000000"));
					  label30.setTextFill(Color.web("#000000"));
					  label31.setTextFill(Color.web("#000000"));
					  label32.setTextFill(Color.web("#000000"));
					  label33.setTextFill(Color.web("#000000"));
					  label34.setTextFill(Color.web("#000000"));
					  label35.setTextFill(Color.web("#000000"));
					  label36.setTextFill(Color.web("#000000"));
					  label37.setTextFill(Color.web("#000000"));
					  label38.setTextFill(Color.web("#000000"));
					  label39.setTextFill(Color.web("#000000"));
					  label40.setTextFill(Color.web("#000000"));
					  label41.setTextFill(Color.web("#000000"));
					  label42.setTextFill(Color.web("#000000"));
					  label43.setTextFill(Color.web("#000000"));
					  label44.setTextFill(Color.web("#000000"));
					  label45.setTextFill(Color.web("#000000"));
					  label46.setTextFill(Color.web("#000000"));
					  label47.setTextFill(Color.web("#000000"));
					  label48.setTextFill(Color.web("#000000"));
					  label49.setTextFill(Color.web("#000000"));
					  label50.setTextFill(Color.web("#000000"));
					  label51.setTextFill(Color.web("#000000"));
					  label52.setTextFill(Color.web("#000000"));
					  label53.setTextFill(Color.web("#000000"));
					  label54.setTextFill(Color.web("#000000"));
					  label55.setTextFill(Color.web("#000000"));
					  label56.setTextFill(Color.web("#000000"));
					  label57.setTextFill(Color.web("#000000"));
					  label58.setTextFill(Color.web("#000000"));
					  label59.setTextFill(Color.web("#000000"));
					  label60.setTextFill(Color.web("#000000"));
					  label61.setTextFill(Color.web("#000000"));
					  if(label62!=null)
					  {
					  label62.setTextFill(Color.web("#000000"));
					  }
					  if(label63!=null)
					  {
					  label63.setTextFill(Color.web("#000000"));
					  }
					  if(label64!=null)
					  {
					  label64.setTextFill(Color.web("#000000"));
					  }
		            
				  }
		         });
}
	   
	   @FXML
		  public void reduceSize(final Event e){
		   
		   
		   reduceButton.setOnKeyPressed(new EventHandler<KeyEvent>() {

				public void handle(KeyEvent keyEvent) {
					
					
					if(keyEvent.getCode()==KeyCode.ENTER)
		               {

					   Double max=30.0;
						if(k>1.0)
						{
							
							k-=0.1; 
							if(label1!=null)
								 label1.setStyle("-fx-font-size:"+k+"em;");
							 if(label3!=null)
						    label3.setStyle("-fx-font-size:"+k+"em;");
							 if(label2!=null)
						    label2.setStyle("-fx-font-size:"+k+"em;");
						   // label1.setStyle("-fx-font-size:"+k+"em;");
							 if(label4!=null)
						    label4.setStyle("-fx-font-size:"+k+"em;");
							 if(label5!=null)
						    label5.setStyle("-fx-font-size:"+k+"em;");
							 if(label6!=null)
						    label6.setStyle("-fx-font-size:"+k+"em;");
							 if(label7!=null)
						    label7.setStyle("-fx-font-size:"+k+"em;");
							 if(label8!=null)
						    label8.setStyle("-fx-font-size:"+k+"em;");
							 if(label9!=null)
						    label9.setStyle("-fx-font-size:"+k+"em;");
							 if(label10!=null && k>=1.2)
						    label10.setStyle("-fx-font-size:"+k+"em;");
							 if(label11!=null){
								    label11.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label12!=null)
									 {
								    label12.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label13!=null)
									 {
								    label13.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label14!=null)
									 {
								    label14.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label15!=null)
									 {
								    label15.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label16!=null)
									 {
								    label16.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label17!=null)
									 {
								    label17.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label18!=null)
									 {
								    label18.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label19!=null)
									 {
								    label19.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label20!=null)
									 {
								    label20.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label21!=null)
									 {
								    label21.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label22!=null)
									 {
								    label22.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label23!=null)
									 {
								    label23.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label24!=null)
									 {
										 label24.setStyle("-fx-font-size:"+k+"em;");
									 }
										 if(label25!=null)
										 {
											 label25.setStyle("-fx-font-size:"+k+"em;");
									 
										 }
										 if(label26!=null && k>=1.2)
										 {
								    label26.setStyle("-fx-font-size:"+k+"em;");
										 }
									 if(label27!=null)
									 {
								    label27.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label28!=null)
									 {
								    label28.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label29!=null)
									 {
								    label29.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label30!=null)
									 {
								    label30.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label31!=null)
									 {
								    label31.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label32!=null)
									 {
								    label32.setStyle("-fx-font-size:"+k+"em;");
									 }
								    if(label33!=null)
								    {
								    label33.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label34!=null && k>=1.2)
								    {
								    label34.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label35!=null && k>=1.2)
								    {
								    label35.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label36!=null)
								    {
								    label36.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label37!=null)
								    {
								    label37.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label38!=null)
								    {
								    label38.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label39!=null)
								    {
								    label39.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label40!=null)
								    {
								    label40.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label41!=null)
								    {
								    label41.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label42!=null)
								    {
								    label42.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label43!=null)
								    {
								    label43.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label44!=null)
								    {
								    label44.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label45!=null)
								    {
								    label45.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label46!=null)
								    {
								    label46.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label47!=null)
								    {
								    label47.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label48!=null) 
								    {
								    label48.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label49!=null)
								    {
								    label49.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label50!=null)
								    {
								    label50.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label51!=null)
								    {
								    label51.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label52!=null)
								    {
								  label52.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label53!=null)
								    {
								    label53.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label54!=null)
								    {
								    label54.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label55!=null)
								    {
								    label55.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label56!=null)
								    {
								    label56.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label57!=null)
								    {
								   label57.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label58!=null)
								    {
								    label58.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label59!=null)
								    {
								    label59.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label60!=null)
								    {
								    label60.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label61!=null)
								    {
								    label61.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label64!=null)
								    {
								    label64.setStyle("-fx-font-size:"+k+"em;");
								    }
						
						    
						}
					  if(k1>=1.8)
					  {
						  k1=1.5;
					  }
						}
				}
		         });
		   reduceButton.setOnMouseClicked(new EventHandler<MouseEvent>() {

				  @Override
	    			public void handle(MouseEvent mouseEvent) {
					
					
					    Double max=30.0;
						if(k>1.0)
						{
							
							k-=0.1; 
							if(label1!=null)
								 label1.setStyle("-fx-font-size:"+k+"em;");
							 if(label3!=null)
						    label3.setStyle("-fx-font-size:"+k+"em;");
							 if(label2!=null)
						    label2.setStyle("-fx-font-size:"+k+"em;");
						   // label1.setStyle("-fx-font-size:"+k+"em;");
							 if(label4!=null)
						    label4.setStyle("-fx-font-size:"+k+"em;");
							 if(label5!=null)
						    label5.setStyle("-fx-font-size:"+k+"em;");
							 if(label6!=null)
						    label6.setStyle("-fx-font-size:"+k+"em;");
							 if(label7!=null)
						    label7.setStyle("-fx-font-size:"+k+"em;");
							 if(label8!=null)
						    label8.setStyle("-fx-font-size:"+k+"em;");
							 if(label9!=null)
						    label9.setStyle("-fx-font-size:"+k+"em;");
							 if(label10!=null && k>=1.2)
						    label10.setStyle("-fx-font-size:"+k+"em;");
							 if(label11!=null){
								    label11.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label12!=null)
									 {
								    label12.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label13!=null)
									 {
								    label13.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label14!=null)
									 {
								    label14.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label15!=null)
									 {
								    label15.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label16!=null)
									 {
								    label16.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label17!=null)
									 {
								    label17.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label18!=null)
									 {
								    label18.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label19!=null)
									 {
								    label19.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label20!=null)
									 {
								    label20.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label21!=null)
									 {
								    label21.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label22!=null)
									 {
								    label22.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label23!=null)
									 {
								    label23.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label24!=null)
									 {
										 label24.setStyle("-fx-font-size:"+k+"em;");
									 }
										 if(label25!=null)
										 {
											 label25.setStyle("-fx-font-size:"+k+"em;");
									 
										 }
										 if(label26!=null && k>=1.2)
										 {
								    label26.setStyle("-fx-font-size:"+k+"em;");
										 }
									 if(label27!=null)
									 {
								    label27.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label28!=null)
									 {
								    label28.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label29!=null)
									 {
								    label29.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label30!=null)
									 {
								    label30.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label31!=null)
									 {
								    label31.setStyle("-fx-font-size:"+k+"em;");
									 }
									 if(label32!=null)
									 {
								    label32.setStyle("-fx-font-size:"+k+"em;");
									 }
								    if(label33!=null)
								    {
								    label33.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label34!=null && k>=1.2)
								    {
								    label34.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label35!=null && k>=1.2)
								    {
								    label35.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label36!=null)
								    {
								    label36.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label37!=null)
								    {
								    label37.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label38!=null)
								    {
								    label38.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label39!=null)
								    {
								    label39.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label40!=null)
								    {
								    label40.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label41!=null)
								    {
								    label41.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label42!=null)
								    {
								    label42.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label43!=null)
								    {
								    label43.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label44!=null)
								    {
								    label44.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label45!=null)
								    {
								    label45.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label46!=null)
								    {
								    label46.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label47!=null)
								    {
								    label47.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label48!=null) 
								    {
								    label48.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label49!=null)
								    {
								    label49.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label50!=null)
								    {
								    label50.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label51!=null)
								    {
								    label51.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label52!=null)
								    {
								  label52.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label53!=null)
								    {
								    label53.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label54!=null)
								    {
								    label54.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label55!=null)
								    {
								    label55.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label56!=null)
								    {
								    label56.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label57!=null)
								    {
								   label57.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label58!=null)
								    {
								    label58.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label59!=null)
								    {
								    label59.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label60!=null)
								    {
								    label60.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label61!=null)
								    {
								    label61.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label64!=null)
								    {
								    label64.setStyle("-fx-font-size:"+k+"em;");
								    }
						
						    
						}
					  if(k1>=1.8)
					  {
						  k1=1.5;
					  }
						}
		            
				  
		         });

		        
		    }
	   @FXML
		  public void increaseSize(final Event e){
		   
		   increaseButton.setOnKeyPressed(new EventHandler<KeyEvent>() {

				public void handle(KeyEvent keyEvent) {
					if(keyEvent.getCode()==KeyCode.ENTER)
		               {

					Double max=1.7;
					if(k<max)
					{
						if(label1!=null)
							 label1.setStyle("-fx-font-size:"+k+"em;");
						 if(label3!=null)
					    label3.setStyle("-fx-font-size:"+k+"em;");
						 if(label2!=null)
					    label2.setStyle("-fx-font-size:"+k+"em;");
					   
						 if(label4!=null)
					    label4.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label6!=null)
					    label6.setStyle("-fx-font-size:"+k+"em;");
						 if(label7!=null)
					    label7.setStyle("-fx-font-size:"+k+"em;");
						 if(label8!=null)
					    label8.setStyle("-fx-font-size:"+k+"em;");
						 if(label9!=null)
					    label9.setStyle("-fx-font-size:"+k+"em;");
						 if(label14!=null)
						 {
					    label14.setStyle("-fx-font-size:"+k+"em;");
						 }
						 
						 if(label16!=null)
						 {
					    label16.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label17!=null)
						 {
					    label17.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label18!=null)
						 {
					    label18.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label19!=null)
						 {
					    label19.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label20!=null)
						 {
					    label20.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label21!=null)
						 {
					    label21.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label22!=null)
						 {
					    label22.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label23!=null)
						 {
					    label23.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label24!=null)
						 {
							 label24.setStyle("-fx-font-size:"+k+"em;");
						 }
							 if(label25!=null)
							 {
								 label25.setStyle("-fx-font-size:"+k+"em;");
						 
							 }
							
						 if(label27!=null)
						 {
					    label27.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label28!=null)
						 {
					    label28.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label29!=null)
						 {
					    label29.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label30!=null)
						 {
					    label30.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label31!=null)
						 {
					    label31.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label32!=null)
						 {
					    label32.setStyle("-fx-font-size:"+k+"em;");
						 }
					    if(label33!=null)
					    {
					    label33.setStyle("-fx-font-size:"+k+"em;");
					    }
					 
					    if(label36!=null)
					    {
					    label36.setStyle("-fx-font-size:"+k+"em;");
					    }
					  
					    if(label38!=null)
					    {
					    label38.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label39!=null)
					    {
					    label39.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label40!=null)
					    {
					    label40.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label41!=null)
					    {
					    label41.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label42!=null)
					    {
					    label42.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label43!=null)
					    {
					    label43.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label44!=null)
					    {
					    label44.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label45!=null)
					    {
					    label45.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label46!=null)
					    {
					    label46.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label47!=null)
					    {
					    label47.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label48!=null) 
					    {
					    label48.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label49!=null)
					    {
					    label49.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label50!=null)
					    {
					    label50.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label51!=null)
					    {
					    label51.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label52!=null)
					    {
					  label52.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label53!=null)
					    {
					    label53.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label54!=null)
					    {
					    label54.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label55!=null)
					    {
					    label55.setStyle("-fx-font-size:"+k+"em;");
					    }
					    
					    if(label57!=null)
					    {
					   label57.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label58!=null)
					    {
					    label58.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label59!=null)
					    {
					    label59.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label60!=null)
					    {
					    label60.setStyle("-fx-font-size:"+k+"em;");
					    }
					    if(label5!=null)
						 {
							    label5.setStyle("-fx-font-size:"+k+"em;");
						 }
						if(label64!=null)
					    {
					    label64.setStyle("-fx-font-size:"+k+"em;");
					    }
						
						if(label15!=null)
						 {
					    label15.setStyle("-fx-font-size:"+k+"em;");
						 }
						
						 if(label11!=null){
							    label11.setStyle("-fx-font-size:"+k+"em;");
								 }
						 
						 if(label12!=null)
						 {
					    label12.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label13!=null)
						 {
					    label13.setStyle("-fx-font-size:"+k+"em;");
						 }
						 if(label61!=null)
						    {
						    label61.setStyle("-fx-font-size:"+k+"em;");
						    }
						 if(label56!=null)
						    {
						    label56.setStyle("-fx-font-size:"+k+"em;");
						    }
						  if(label37!=null)
						    {
						    label37.setStyle("-fx-font-size:"+k+"em;");
						    }
					    
					    k+=0.1;
					    
					}
					
					if(k1<1.8)
				    {
						 
						 if(label10!=null)
						 {
							    label10.setStyle("-fx-font-size:"+k1+"em;");
							    if(label34!=null)
							    {
							    label34.setStyle("-fx-font-size:"+k1+"em;");
							    }
							    if(label35!=null)
							    {
							    label35.setStyle("-fx-font-size:"+k1+"em;");
							    }
							 if(label26!=null)
							 {
					    label26.setStyle("-fx-font-size:"+k1+"em;");
							 }
						 }
					
						  k1+=0.1;
						  
				    }
			  }
				}     
		         });
		   
		   
		   increaseButton.setOnMouseClicked(new EventHandler<MouseEvent>() {

				  @Override
	    			public void handle(MouseEvent mouseEvent) {
					
						
						Double max=1.7;
						if(k<max)
						{
							
							 if(label1!=null)
								 label1.setStyle("-fx-font-size:"+k+"em;");
							 if(label3!=null)
						    label3.setStyle("-fx-font-size:"+k+"em;");
							 if(label2!=null)
						    label2.setStyle("-fx-font-size:"+k+"em;");
						   
							 if(label4!=null)
						    label4.setStyle("-fx-font-size:"+k+"em;");
							
							 if(label6!=null)
						    label6.setStyle("-fx-font-size:"+k+"em;");
							 if(label7!=null)
						    label7.setStyle("-fx-font-size:"+k+"em;");
							 if(label8!=null)
						    label8.setStyle("-fx-font-size:"+k+"em;");
							 if(label9!=null)
						    label9.setStyle("-fx-font-size:"+k+"em;");
							 if(label14!=null)
							 {
						    label14.setStyle("-fx-font-size:"+k+"em;");
							 }
							 
							 if(label16!=null)
							 {
						    label16.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label17!=null)
							 {
						    label17.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label18!=null)
							 {
						    label18.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label19!=null)
							 {
						    label19.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label20!=null)
							 {
						    label20.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label21!=null)
							 {
						    label21.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label22!=null)
							 {
						    label22.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label23!=null)
							 {
						    label23.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label24!=null)
							 {
								 label24.setStyle("-fx-font-size:"+k+"em;");
							 }
								 if(label25!=null)
								 {
									 label25.setStyle("-fx-font-size:"+k+"em;");
							 
								 }
								
							 if(label27!=null)
							 {
						    label27.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label28!=null)
							 {
						    label28.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label29!=null)
							 {
						    label29.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label30!=null)
							 {
						    label30.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label31!=null)
							 {
						    label31.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label32!=null)
							 {
						    label32.setStyle("-fx-font-size:"+k+"em;");
							 }
						    if(label33!=null)
						    {
						    label33.setStyle("-fx-font-size:"+k+"em;");
						    }
						 
						    if(label36!=null)
						    {
						    label36.setStyle("-fx-font-size:"+k+"em;");
						    }
						  
						    if(label38!=null)
						    {
						    label38.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label39!=null)
						    {
						    label39.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label40!=null)
						    {
						    label40.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label41!=null)
						    {
						    label41.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label42!=null)
						    {
						    label42.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label43!=null)
						    {
						    label43.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label44!=null)
						    {
						    label44.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label45!=null)
						    {
						    label45.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label46!=null)
						    {
						    label46.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label47!=null)
						    {
						    label47.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label48!=null) 
						    {
						    label48.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label49!=null)
						    {
						    label49.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label50!=null)
						    {
						    label50.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label51!=null)
						    {
						    label51.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label52!=null)
						    {
						  label52.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label53!=null)
						    {
						    label53.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label54!=null)
						    {
						    label54.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label55!=null)
						    {
						    label55.setStyle("-fx-font-size:"+k+"em;");
						    }
						    
						    if(label57!=null)
						    {
						   label57.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label58!=null)
						    {
						    label58.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label59!=null)
						    {
						    label59.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label60!=null)
						    {
						    label60.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label5!=null)
							 {
								    label5.setStyle("-fx-font-size:"+k+"em;");
							 }
							if(label64!=null)
						    {
						    label64.setStyle("-fx-font-size:"+k+"em;");
						    }
							
							if(label15!=null)
							 {
						    label15.setStyle("-fx-font-size:"+k+"em;");
							 }
							
							 if(label11!=null){
								    label11.setStyle("-fx-font-size:"+k+"em;");
									 }
							 
							 if(label12!=null)
							 {
						    label12.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label13!=null)
							 {
						    label13.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label61!=null)
							    {
							    label61.setStyle("-fx-font-size:"+k+"em;");
							    }
							 if(label56!=null)
							    {
							    label56.setStyle("-fx-font-size:"+k+"em;");
							    }
							  if(label37!=null)
							    {
							    label37.setStyle("-fx-font-size:"+k+"em;");
							    }
						    
						    k+=0.1;
						    
						}
						
						if(k1<1.8)
					    {
							 
							 if(label10!=null)
							 {
								    label10.setStyle("-fx-font-size:"+k1+"em;");
								    if(label34!=null)
								    {
								    label34.setStyle("-fx-font-size:"+k1+"em;");
								    }
								    if(label35!=null)
								    {
								    label35.setStyle("-fx-font-size:"+k1+"em;");
								    }
								 if(label26!=null)
								 {
						    label26.setStyle("-fx-font-size:"+k1+"em;");
								 }
							 }
						
							  k1+=0.1;
							  
					    }
				  }
		         });

		        
		    }
	   
	  
	   @FXML
	   public void resetFontSize(final Event e){
	   	
	   	resetFontSize.setOnKeyPressed(new EventHandler<KeyEvent>() {

	   		public void handle(KeyEvent keyEvent) {
	   			if(keyEvent.getCode()==KeyCode.ENTER)
	              {
	   				 k=1.0;
	   					k1=1.5;
	   					
	   						
	   				   label10.setStyle("-fx-font-size:"+k1+"em;");
					    if(label34!=null)
					    {
					    label34.setStyle("-fx-font-size:"+k1+"em;");
					    }
					    if(label35!=null)
					    {
					    label35.setStyle("-fx-font-size:"+k1+"em;");
					    }
					 if(label26!=null)
					 {
			    label26.setStyle("-fx-font-size:"+k1+"em;");
					 }
					 if(label1!=null)
						 label1.setStyle("-fx-font-size:"+k+"em;");
					 if(label3!=null)
				    label3.setStyle("-fx-font-size:"+k+"em;");
					 if(label2!=null)
				    label2.setStyle("-fx-font-size:"+k+"em;");
				   
					 if(label4!=null)
				    label4.setStyle("-fx-font-size:"+k+"em;");
					
					 if(label6!=null)
				    label6.setStyle("-fx-font-size:"+k+"em;");
					 if(label7!=null)
				    label7.setStyle("-fx-font-size:"+k+"em;");
					 if(label8!=null)
				    label8.setStyle("-fx-font-size:"+k+"em;");
					 if(label9!=null)
				    label9.setStyle("-fx-font-size:"+k+"em;");
					 if(label14!=null)
					 {
				    label14.setStyle("-fx-font-size:"+k+"em;");
					 }
					 
					 if(label16!=null)
					 {
				    label16.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label17!=null)
					 {
				    label17.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label18!=null)
					 {
				    label18.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label19!=null)
					 {
				    label19.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label20!=null)
					 {
				    label20.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label21!=null)
					 {
				    label21.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label22!=null)
					 {
				    label22.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label23!=null)
					 {
				    label23.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label24!=null)
					 {
						 label24.setStyle("-fx-font-size:"+k+"em;");
					 }
						 if(label25!=null)
						 {
							 label25.setStyle("-fx-font-size:"+k+"em;");
					 
						 }
						
					 if(label27!=null)
					 {
				    label27.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label28!=null)
					 {
				    label28.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label29!=null)
					 {
				    label29.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label30!=null)
					 {
				    label30.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label31!=null)
					 {
				    label31.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label32!=null)
					 {
				    label32.setStyle("-fx-font-size:"+k+"em;");
					 }
				    if(label33!=null)
				    {
				    label33.setStyle("-fx-font-size:"+k+"em;");
				    }
				 
				    if(label36!=null)
				    {
				    label36.setStyle("-fx-font-size:"+k+"em;");
				    }
				  
				    if(label38!=null)
				    {
				    label38.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label39!=null)
				    {
				    label39.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label40!=null)
				    {
				    label40.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label41!=null)
				    {
				    label41.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label42!=null)
				    {
				    label42.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label43!=null)
				    {
				    label43.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label44!=null)
				    {
				    label44.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label45!=null)
				    {
				    label45.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label46!=null)
				    {
				    label46.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label47!=null)
				    {
				    label47.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label48!=null) 
				    {
				    label48.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label49!=null)
				    {
				    label49.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label50!=null)
				    {
				    label50.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label51!=null)
				    {
				    label51.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label52!=null)
				    {
				  label52.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label53!=null)
				    {
				    label53.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label54!=null)
				    {
				    label54.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label55!=null)
				    {
				    label55.setStyle("-fx-font-size:"+k+"em;");
				    }
				    
				    if(label57!=null)
				    {
				   label57.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label58!=null)
				    {
				    label58.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label59!=null)
				    {
				    label59.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label60!=null)
				    {
				    label60.setStyle("-fx-font-size:"+k+"em;");
				    }
				    if(label5!=null)
					 {
						    label5.setStyle("-fx-font-size:"+k+"em;");
					 }
					if(label64!=null)
				    {
				    label64.setStyle("-fx-font-size:"+k+"em;");
				    }
					
					if(label15!=null)
					 {
				    label15.setStyle("-fx-font-size:"+k+"em;");
					 }
					
					 if(label11!=null){
						    label11.setStyle("-fx-font-size:"+k+"em;");
							 }
					 
					 if(label12!=null)
					 {
				    label12.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label13!=null)
					 {
				    label13.setStyle("-fx-font-size:"+k+"em;");
					 }
					 if(label61!=null)
					    {
					    label61.setStyle("-fx-font-size:"+k+"em;");
					    }
					 if(label56!=null)
					    {
					    label56.setStyle("-fx-font-size:"+k+"em;");
					    }
					  if(label37!=null)
					    {
					    label37.setStyle("-fx-font-size:"+k+"em;");
					    }	
	   				
	   				
	   			
	   			
	              }
	              
	              }
	   	  
	      });
	   	
	   	resetFontSize.setOnMouseClicked(new EventHandler<MouseEvent>() {

	   		  @Override
	   			public void handle(MouseEvent mouseEvent) {
	   			 k=1.0;
					k1=1.1;
					
						
				   label10.setStyle("-fx-font-size:"+k1+"em;");
				    if(label34!=null)
				    {
				    label34.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label35!=null)
				    {
				    label35.setStyle("-fx-font-size:"+k1+"em;");
				    }
				 if(label26!=null)
				 {
		    label26.setStyle("-fx-font-size:"+k1+"em;");
				 }
				 if(label1!=null)
					 label1.setStyle("-fx-font-size:"+k+"em;");
				 if(label3!=null)
			    label3.setStyle("-fx-font-size:"+k+"em;");
				 if(label2!=null)
			    label2.setStyle("-fx-font-size:"+k+"em;");
			   
				 if(label4!=null)
			    label4.setStyle("-fx-font-size:"+k+"em;");
				
				 if(label6!=null)
			    label6.setStyle("-fx-font-size:"+k+"em;");
				 if(label7!=null)
			    label7.setStyle("-fx-font-size:"+k+"em;");
				 if(label8!=null)
			    label8.setStyle("-fx-font-size:"+k+"em;");
				 if(label9!=null)
			    label9.setStyle("-fx-font-size:"+k+"em;");
				 if(label14!=null)
				 {
			    label14.setStyle("-fx-font-size:"+k+"em;");
				 }
				 
				 if(label16!=null)
				 {
			    label16.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label17!=null)
				 {
			    label17.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label18!=null)
				 {
			    label18.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label19!=null)
				 {
			    label19.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label20!=null)
				 {
			    label20.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label21!=null)
				 {
			    label21.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label22!=null)
				 {
			    label22.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label23!=null)
				 {
			    label23.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label24!=null)
				 {
					 label24.setStyle("-fx-font-size:"+k+"em;");
				 }
					 if(label25!=null)
					 {
						 label25.setStyle("-fx-font-size:"+k+"em;");
				 
					 }
					
				 if(label27!=null)
				 {
			    label27.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label28!=null)
				 {
			    label28.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label29!=null)
				 {
			    label29.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label30!=null)
				 {
			    label30.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label31!=null)
				 {
			    label31.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label32!=null)
				 {
			    label32.setStyle("-fx-font-size:"+k+"em;");
				 }
			    if(label33!=null)
			    {
			    label33.setStyle("-fx-font-size:"+k+"em;");
			    }
			 
			    if(label36!=null)
			    {
			    label36.setStyle("-fx-font-size:"+k+"em;");
			    }
			  
			    if(label38!=null)
			    {
			    label38.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label39!=null)
			    {
			    label39.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label40!=null)
			    {
			    label40.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label41!=null)
			    {
			    label41.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label42!=null)
			    {
			    label42.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label43!=null)
			    {
			    label43.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label44!=null)
			    {
			    label44.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label45!=null)
			    {
			    label45.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label46!=null)
			    {
			    label46.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label47!=null)
			    {
			    label47.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label48!=null) 
			    {
			    label48.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label49!=null)
			    {
			    label49.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label50!=null)
			    {
			    label50.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label51!=null)
			    {
			    label51.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label52!=null)
			    {
			  label52.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label53!=null)
			    {
			    label53.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label54!=null)
			    {
			    label54.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label55!=null)
			    {
			    label55.setStyle("-fx-font-size:"+k+"em;");
			    }
			    
			    if(label57!=null)
			    {
			   label57.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label58!=null)
			    {
			    label58.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label59!=null)
			    {
			    label59.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label60!=null)
			    {
			    label60.setStyle("-fx-font-size:"+k+"em;");
			    }
			    if(label5!=null)
				 {
					    label5.setStyle("-fx-font-size:"+k+"em;");
				 }
				if(label64!=null)
			    {
			    label64.setStyle("-fx-font-size:"+k+"em;");
			    }
				
				if(label15!=null)
				 {
			    label15.setStyle("-fx-font-size:"+k+"em;");
				 }
				
				 if(label11!=null){
					    label11.setStyle("-fx-font-size:"+k+"em;");
						 }
				 
				 if(label12!=null)
				 {
			    label12.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label13!=null)
				 {
			    label13.setStyle("-fx-font-size:"+k+"em;");
				 }
				 if(label61!=null)
				    {
				    label61.setStyle("-fx-font-size:"+k+"em;");
				    }
				 if(label56!=null)
				    {
				    label56.setStyle("-fx-font-size:"+k+"em;");
				    }
				  if(label37!=null)
				    {
				    label37.setStyle("-fx-font-size:"+k+"em;");
				    }	
				
	   					
	   				
	   				
	   				
	   					
	             
	   		  }
	          });

	         
	     } 
	@Override
	public void initialize(URL location, ResourceBundle resources) {
	
		buttonPointer=ePayButton;
		
	}

	public static Button buttonPointer;
}
