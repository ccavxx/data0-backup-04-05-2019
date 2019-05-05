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


public class tableHeadingPane implements Initializable {

	   @FXML
	   AnchorPane Content,Content1;
	   
	   @FXML
	    Button ePay;
	   
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
						 if(label1!=null)
						  {
						  label1.setTextFill(Color.web("#ffd700"));
						  }
						  if(label11!=null)
						  {
						  label11.setTextFill(Color.web("#ffd700"));
						  }
						  label2.setTextFill(Color.web("#ffd700"));
						  if(label3!=null)
						  {
						  label3.setTextFill(Color.web("#ffd700"));
						  }
						  if(label4!=null)
						  {
						  label4.setTextFill(Color.web("#ffd700"));
						  }
						  if(label5!=null)
						  {
						  label5.setTextFill(Color.web("#ffd700"));
						  }
						  if(label6!=null)
						  {
						  label6.setTextFill(Color.web("#ffd700"));
						  }
						  if(label7!=null)
						  {
						  label7.setTextFill(Color.web("#ffd700"));
						  }
						  if(label8!=null)
						  {
						  label8.setTextFill(Color.web("#ffd700"));
						  }
						  if(label12!=null)
						  {
						  label12.setTextFill(Color.web("#ffd700"));
						  }
						  if(label10!=null)
						  {
						  label10.setTextFill(Color.web("#ffd700"));
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
					 if(label1!=null)
					  {
					  label1.setTextFill(Color.web("#ffd700"));
					  }
					  if(label11!=null)
					  {
					  label11.setTextFill(Color.web("#ffd700"));
					  }
					  label2.setTextFill(Color.web("#ffd700"));
					  if(label3!=null)
					  {
					  label3.setTextFill(Color.web("#ffd700"));
					  }
					  if(label4!=null)
					  {
					  label4.setTextFill(Color.web("#ffd700"));
					  }
					  if(label5!=null)
					  {
					  label5.setTextFill(Color.web("#ffd700"));
					  }
					  if(label6!=null)
					  {
					  label6.setTextFill(Color.web("#ffd700"));
					  }
					  if(label7!=null)
					  {
					  label7.setTextFill(Color.web("#ffd700"));
					  }
					  if(label8!=null)
					  {
					  label8.setTextFill(Color.web("#ffd700"));
					  }
					  if(label12!=null)
					  {
					  label12.setTextFill(Color.web("#ffd700"));
					  }
					  if(label10!=null)
					  {
					  label10.setTextFill(Color.web("#ffd700"));
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

					  
					  
					  if(label64!=null)
						{
							label64.setTextFill(Color.web("#000000"));
						}
						 if(label1!=null)
						  {
						  label1.setTextFill(Color.web("#000000"));
						  }
						  if(label11!=null)
						  {
						  label11.setTextFill(Color.web("#000000"));
						  }
						  label2.setTextFill(Color.web("#000000"));
						  if(label3!=null)
						  {
						  label3.setTextFill(Color.web("#000000"));
						  }
						  if(label4!=null)
						  {
						  label4.setTextFill(Color.web("#000000"));
						  }
						  if(label5!=null)
						  {
						  label5.setTextFill(Color.web("#000000"));
						  }
						  if(label6!=null)
						  {
						  label6.setTextFill(Color.web("#000000"));
						  }
						  if(label7!=null)
						  {
						  label7.setTextFill(Color.web("#000000"));
						  }
						  if(label8!=null)
						  {
						  label8.setTextFill(Color.web("#000000"));
						  }
						  if(label12!=null)
						  {
						  label12.setTextFill(Color.web("#000000"));
						  }
						  if(label10!=null)
						  {
						  label10.setTextFill(Color.web("#000000"));
						  }
					  
		               }
		            
				  }
		         });
		   backColor.setOnMouseClicked(new EventHandler<MouseEvent>() {

				  @Override
	    			public void handle(MouseEvent mouseEvent) {
					
					  Content.setBackground(new Background(new BackgroundFill(Color.WHITESMOKE, CornerRadii.EMPTY, Insets.EMPTY)));
					  
					  if(label64!=null)
						{
							label64.setTextFill(Color.web("#000000"));
						}
						 if(label1!=null)
						  {
						  label1.setTextFill(Color.web("#000000"));
						  }
						  if(label11!=null)
						  {
						  label11.setTextFill(Color.web("#000000"));
						  }
						  label2.setTextFill(Color.web("#000000"));
						  if(label3!=null)
						  {
						  label3.setTextFill(Color.web("#000000"));
						  }
						  if(label4!=null)
						  {
						  label4.setTextFill(Color.web("#000000"));
						  }
						  if(label5!=null)
						  {
						  label5.setTextFill(Color.web("#000000"));
						  }
						  if(label6!=null)
						  {
						  label6.setTextFill(Color.web("#000000"));
						  }
						  if(label7!=null)
						  {
						  label7.setTextFill(Color.web("#000000"));
						  }
						  if(label8!=null)
						  {
						  label8.setTextFill(Color.web("#000000"));
						  }
						  if(label12!=null)
						  {
						  label12.setTextFill(Color.web("#000000"));
						  }
						  if(label10!=null)
						  {
						  label10.setTextFill(Color.web("#000000"));
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
						 if(label2!=null)
					    label2.setStyle("-fx-font-size:"+k+"em;");
					 
						 if(label4!=null)
					    label4.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label6!=null)
					    label6.setStyle("-fx-font-size:"+k+"em;");
						 
						 if(label7!=null)
							 if(label8!=null)
					    label8.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label10!=null)
							 label10.setStyle("-fx-font-size:"+k+"em;");
					 /*   label62.setStyle("-fx-font-size:"+k+"em;");
					    label63.setStyle("-fx-font-size:"+k+"em;");
					    label64.setStyle("-fx-font-size:"+k+"em;");*/
					   
					}
				  
					if(k1>1.5)
					{
						 k1-=0.1; 
						 if(label1!=null)
							    label1.setStyle("-fx-font-size:"+k1+"em;");
						 if(label3!=null)
							    label3.setStyle("-fx-font-size:"+k1+"em;");
						 if(label5!=null)
							    label5.setStyle("-fx-font-size:"+k1+"em;");
						 if(label7!=null)
						 label7.setStyle("-fx-font-size:"+k1+"em;");
						 if(label11!=null)
							    label11.setStyle("-fx-font-size:"+k1+"em;");
						 if(label12!=null)
						 label12.setStyle("-fx-font-size:"+k1+"em;");
						 
						
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
							 if(label2!=null)
						    label2.setStyle("-fx-font-size:"+k+"em;");
						 
							 if(label4!=null)
						    label4.setStyle("-fx-font-size:"+k+"em;");
							
							 if(label6!=null)
						    label6.setStyle("-fx-font-size:"+k+"em;");
							 
						
								 if(label8!=null)
						    label8.setStyle("-fx-font-size:"+k+"em;");
							
							 if(label10!=null)
								 label10.setStyle("-fx-font-size:"+k+"em;");
					}
					  
						if(k1>1.5)
						{
							 k1-=0.1; 
							 if(label1!=null)
								    label1.setStyle("-fx-font-size:"+k1+"em;");
							 if(label3!=null)
								    label3.setStyle("-fx-font-size:"+k1+"em;");
							 if(label5!=null)
								    label5.setStyle("-fx-font-size:"+k1+"em;");
							 if(label7!=null)
							 label7.setStyle("-fx-font-size:"+k1+"em;");
							 if(label11!=null)
								    label11.setStyle("-fx-font-size:"+k1+"em;");
							 if(label12!=null)
							 label12.setStyle("-fx-font-size:"+k1+"em;");
							 
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
						
						
						 if(label2!=null)
					    label2.setStyle("-fx-font-size:"+k+"em;");
					   // label1.setStyle("-fx-font-size:"+k+"em;");
						 if(label4!=null)
					    label4.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label6!=null)
					    label6.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label8!=null)
					    label8.setStyle("-fx-font-size:"+k+"em;");
						 if(label10!=null)
							 label10.setStyle("-fx-font-size:"+k+"em;");
					    k+=0.1;
					    
					}
					if(k1<1.9)
					{
						if(label1!=null)
						    label1.setStyle("-fx-font-size:"+k1+"em;");
						 if(label3!=null)
					    label3.setStyle("-fx-font-size:"+k1+"em;");
						 if(label5!=null)
							    label5.setStyle("-fx-font-size:"+k1+"em;");
						 if(label7!=null)
							    label7.setStyle("-fx-font-size:"+k1+"em;");
						 k1+=0.1;
						 if(label11!=null)
							    label11.setStyle("-fx-font-size:"+k1+"em;");
						 if(label12!=null)
						 label12.setStyle("-fx-font-size:"+k1+"em;");
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
							
							
							 if(label2!=null)
						    label2.setStyle("-fx-font-size:"+k+"em;");
						   // label1.setStyle("-fx-font-size:"+k+"em;");
							 if(label4!=null)
						    label4.setStyle("-fx-font-size:"+k+"em;");
							
							 if(label6!=null)
						    label6.setStyle("-fx-font-size:"+k+"em;");
							
							 if(label8!=null)
						    label8.setStyle("-fx-font-size:"+k+"em;");
							 if(label10!=null)
								 label10.setStyle("-fx-font-size:"+k+"em;");
						    k+=0.1;
						    
						}
						if(k1<1.9)
						{
							if(label1!=null)
							    label1.setStyle("-fx-font-size:"+k1+"em;");
							 if(label3!=null)
						    label3.setStyle("-fx-font-size:"+k1+"em;");
							 if(label5!=null)
								    label5.setStyle("-fx-font-size:"+k1+"em;");
							 if(label7!=null)
								    label7.setStyle("-fx-font-size:"+k1+"em;");
							 k1+=0.1;
							 if(label11!=null)
								    label11.setStyle("-fx-font-size:"+k1+"em;");
							 if(label12!=null)
							 label12.setStyle("-fx-font-size:"+k1+"em;");
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
	   					k1=1.3;
	   					
	   						
	   				 if(label2!=null)
						    label2.setStyle("-fx-font-size:"+k+"em;");
						   // label1.setStyle("-fx-font-size:"+k+"em;");
							 if(label4!=null)
						    label4.setStyle("-fx-font-size:"+k+"em;");
							
							 if(label6!=null)
						    label6.setStyle("-fx-font-size:"+k+"em;");
							
							 if(label8!=null)
						    label8.setStyle("-fx-font-size:"+k+"em;");
							 if(label10!=null)
								 label10.setStyle("-fx-font-size:"+k+"em;");
	   						
							 if(label1!=null)
								    label1.setStyle("-fx-font-size:"+k1+"em;");
								 if(label3!=null)
							    label3.setStyle("-fx-font-size:"+k1+"em;");
								 if(label5!=null)
									    label5.setStyle("-fx-font-size:"+k1+"em;");
								 if(label7!=null)
									    label7.setStyle("-fx-font-size:"+k1+"em;");
								 
								 if(label11!=null)
									    label11.setStyle("-fx-font-size:"+k1+"em;");
								 if(label12!=null)
								 label12.setStyle("-fx-font-size:"+k1+"em;");
	   				
	   			
	   			
	              }
	              
	              }
	   	  
	      });
	   	
	   	resetFontSize.setOnMouseClicked(new EventHandler<MouseEvent>() {

	   		  @Override
	   			public void handle(MouseEvent mouseEvent) {
	   			
	   			 k=1.0;
					k1=1.3;
					
						
				 if(label2!=null)
					    label2.setStyle("-fx-font-size:"+k+"em;");
					   // label1.setStyle("-fx-font-size:"+k+"em;");
						 if(label4!=null)
					    label4.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label6!=null)
					    label6.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label8!=null)
					    label8.setStyle("-fx-font-size:"+k+"em;");
						 if(label10!=null)
							 label10.setStyle("-fx-font-size:"+k+"em;");
						
						 if(label1!=null)
							    label1.setStyle("-fx-font-size:"+k1+"em;");
							 if(label3!=null)
						    label3.setStyle("-fx-font-size:"+k1+"em;");
							 if(label5!=null)
								    label5.setStyle("-fx-font-size:"+k1+"em;");
							 if(label7!=null)
								    label7.setStyle("-fx-font-size:"+k1+"em;");
							
							 if(label11!=null)
								    label11.setStyle("-fx-font-size:"+k1+"em;");
							 if(label12!=null)
							 label12.setStyle("-fx-font-size:"+k1+"em;");
				
	   					
	   					
	   				
	   				
	   				
	   					
	             
	   		  }
	          });

	         
	     }
	 
	@Override
	public void initialize(URL location, ResourceBundle resources) {
	
		
		buttonPointer=ePay;
		
	}

	public static Button buttonPointer;
}
