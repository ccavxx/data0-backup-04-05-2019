package com.itd.efiling.offline.ITR4.ctrl;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.ResourceBundle;

import com.itd.efiling.offline.javafx.ui.components.ValBigIntegerField;

import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;


public class instructionsSize implements Initializable {

    @FXML
    ScrollPane scrollPane;

    @FXML
    StackPane formContainer;

    @FXML
    VBox progressDialog, msgContainer,reCalculateDialog,VBox,VBox1;
	  
	@FXML
	Hyperlink hyperlink,imageView1;
	  
	@FXML
	ImageView imageView;
	
	@FXML
	Button ePay,reduceButton,increaseButton,resetFontSize;
	
	@FXML
	 HBox HBx;
	
	@FXML
	 GridPane grid;
	
	@FXML
	 Font x9;
	
	@FXML
	ValBigIntegerField AmntPay;
	
	  @FXML
	   AnchorPane Content,Content1;
	   
	   @FXML
		
		Button colorButton,backColor,reduceSize,increaseSize;

	   
	   @FXML
		
	 		Label label1,label2,label3,label4,label5,label6,label7,label8,label9,label10,label11,label12,label13,label14,label15,label16,label17,label18,label19,label20,label21,label22,label23,label24,label25,label26,label27,label28,label29,label30,label31,label32,label33,label34,
	 		label36,label37,label38,label39,label40,label41,label42,label43,label44,label45,label46,label47,label48,label49,label50,label51,label52,
	 		label53,label54,label55,label56,label57,label58,label59,label60,label61,label62,label63,label35,label64;
	 		
	    
	   Double i=2.0;
	   Double k=1.1,k1=1.2;
	
  
	   
	   
	@FXML
	  public void changeColor(final Event e){
		
		colorButton.setOnKeyPressed(new EventHandler<KeyEvent>() {
			
			  @Override
	         public void handle(KeyEvent keyEvent) {
					if(keyEvent.getCode()==KeyCode.ENTER)
		               {
				  Content.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				 /* if(HBx!=null){
				  HBx.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  
				  VBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY))); 
				  VBox1.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  }*/
				  HBx.setStyle("-fx-background-color:#000000");
				  
				  if(grid!=null){
				  grid.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  grid.setStyle("-fx-border-color: #000000;-fx-border-width: 10px;");
			
				 // grid.setBorder(new Bor));
				  }
				
				  label1.setTextFill(Color.web("#ffd700"));
				  label2.setTextFill(Color.web("#ffd700"));
				  label3.setTextFill(Color.web("#ffd700"));
				  label4.setTextFill(Color.web("#ffd700"));
				  label5.setTextFill(Color.web("#ffd700"));
				  label6.setTextFill(Color.web("#ffd700"));
				  label7.setTextFill(Color.web("#ffd700"));
		               }
	        	
			  }
	         });
		
	   colorButton.setOnMouseClicked(new EventHandler<MouseEvent>() {

			  @Override
  			public void handle(MouseEvent mouseEvent) {
				
				  Content.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  
				//  HBx.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  HBx.setStyle("-fx-background-color:#000000");
				/*  VBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY))); 
				  VBox1.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));*/ 
				
				  
				  if(grid!=null){
				  grid.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  grid.setStyle("-fx-border-color: #000000;-fx-border-width: 10px;");
			
				 // grid.setBorder(new Bor));
				  }
				
				  label1.setTextFill(Color.web("#ffd700"));
				  label2.setTextFill(Color.web("#ffd700"));
				  label3.setTextFill(Color.web("#ffd700"));
				  label4.setTextFill(Color.web("#ffd700"));
				  label5.setTextFill(Color.web("#ffd700"));
				  label6.setTextFill(Color.web("#ffd700"));
				  label7.setTextFill(Color.web("#ffd700"));
			
		            
	            
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
				 
				  //HBx.setBackground(new Background(new BackgroundFill(Color.color(0.83, 0.83,1.0), CornerRadii.EMPTY, Insets.EMPTY)));
				  HBx.setStyle("-fx-background-color:#d0d0ff");
				  
				
				  if(grid!=null){
			      grid.setStyle("-fx-border-color: #d0d0ff;-fx-border-width: 10px;");
				  grid.setBackground(new Background(new BackgroundFill(Color.color(1.0,1.0,0.93), CornerRadii.EMPTY, Insets.EMPTY)));
				 
				  }
				 
				  label1.setTextFill(Color.web("#000000"));
				  label2.setTextFill(Color.web("#000000"));
				  label3.setTextFill(Color.web("#000000"));
				  label4.setTextFill(Color.web("#000000"));
				  label5.setTextFill(Color.web("#000000"));
				  
				  label6.setTextFill(Color.web("#000000"));
				  label7.setTextFill(Color.web("#000000"));
	               }
	            
			  }
	         });

	 
	   backColor.setOnMouseClicked(new EventHandler<MouseEvent>() {

			  @Override
  			public void handle(MouseEvent mouseEvent) {
				LOG.info("kjkj");
				  Content.setBackground(new Background(new BackgroundFill(Color.WHITESMOKE, CornerRadii.EMPTY, Insets.EMPTY)));
				 /* if(HBx!=null){
				  HBx.setBackground(new Background(new BackgroundFill(Color.color(0.83, 0.83,1.0), CornerRadii.EMPTY, Insets.EMPTY)));
				  }*/
				  
				  HBx.setStyle("-fx-background-color:#d0d0ff");
				  if(grid!=null){
					  grid.setStyle("-fx-border-color: #d0d0ff;-fx-border-width: 10px;");
				  grid.setBackground(new Background(new BackgroundFill(Color.color(1.0,1.0,0.93), CornerRadii.EMPTY, Insets.EMPTY)));
				 
				  }
				 
				  label1.setTextFill(Color.web("#000000"));
				  label2.setTextFill(Color.web("#000000"));
				  label3.setTextFill(Color.web("#000000"));
				  label4.setTextFill(Color.web("#000000"));
				  label5.setTextFill(Color.web("#000000"));
				  
				  label6.setTextFill(Color.web("#000000"));
				  label7.setTextFill(Color.web("#000000"));
				
	            
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
				
					 if(k>=1.1)
					 {
					 label1.setStyle("-fx-font-size:"+k+"em;");
					 }
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
					
				   
				    
				}
				
				if(k1>=1.7)
				{
					k1=1.1;
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
				
					 if(k>=1.1)
					 {
					 label1.setStyle("-fx-font-size:"+k+"em;");
					 }
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
					
				   
				    
				}
				
				if(k1>=1.7)
				{
					k1=1.1;
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
			if(k<1.7)
			{
				LOG.info("Hiiii"+k);
			  if(label3!=null)
			    label3.setStyle("-fx-font-size:"+k+"em;");
				 if(label2!=null)
			    label2.setStyle("-fx-font-size:"+k+"em;");
		
				 if(label4!=null)
			    label4.setStyle("-fx-font-size:"+k+"em;");
				 if(label5!=null)
			    label5.setStyle("-fx-font-size:"+k+"em;");
				 if(label6!=null)
					 label6.setStyle("-fx-font-size:"+k+"em;");
				 if(label7!=null)
					 label7.setStyle("-fx-font-size:"+k+"em;");
			    k+=0.1;
			}
			
			if(k1<1.7)
			{
				label1.setStyle("-fx-font-size:"+k1+"em;");
				
				k1+=0.1;
				
			
			}
			
            }
       
	  }
    });
	
	increaseButton.setOnMouseClicked(new EventHandler<MouseEvent>() {

		  @Override
			public void handle(MouseEvent mouseEvent) {
			
	
				Double max=1.7;
				if(k<1.7)
				{
					LOG.info("Hiiii"+k);
				  if(label3!=null)
				    label3.setStyle("-fx-font-size:"+k+"em;");
					 if(label2!=null)
				    label2.setStyle("-fx-font-size:"+k+"em;");
			
					 if(label4!=null)
				    label4.setStyle("-fx-font-size:"+k+"em;");
					 if(label5!=null)
				    label5.setStyle("-fx-font-size:"+k+"em;");
					 if(label6!=null)
						 label6.setStyle("-fx-font-size:"+k+"em;");
					 if(label7!=null)
						 label7.setStyle("-fx-font-size:"+k+"em;");
				    k+=0.1;
				}
				
				if(k1<1.7)
				{
					label1.setStyle("-fx-font-size:"+k1+"em;");
					
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
				 k=1.1;
					k1=1.2;
					
						
					  if(label3!=null)
					    label3.setStyle("-fx-font-size:"+k+"em;");
						 if(label2!=null)
					    label2.setStyle("-fx-font-size:"+k+"em;");
				
						 if(label4!=null)
					    label4.setStyle("-fx-font-size:"+k+"em;");
						 if(label5!=null)
					    label5.setStyle("-fx-font-size:"+k+"em;");
						 if(label6!=null)
							 label6.setStyle("-fx-font-size:"+k+"em;");
						 if(label7!=null)
							 label7.setStyle("-fx-font-size:"+k+"em;");
					
						label1.setStyle("-fx-font-size:"+k1+"em;");
						
				
				
			
			
           }
           
           }
	  
   });
	
	resetFontSize.setOnMouseClicked(new EventHandler<MouseEvent>() {

		  @Override
			public void handle(MouseEvent mouseEvent) {
			
			  k=1.1;
				k1=1.2;
				
					
				  if(label3!=null)
				    label3.setStyle("-fx-font-size:"+k+"em;");
					 if(label2!=null)
				    label2.setStyle("-fx-font-size:"+k+"em;");
			
					 if(label4!=null)
				    label4.setStyle("-fx-font-size:"+k+"em;");
					 if(label5!=null)
				    label5.setStyle("-fx-font-size:"+k+"em;");
					 if(label6!=null)
						 label6.setStyle("-fx-font-size:"+k+"em;");
					 if(label7!=null)
						 label7.setStyle("-fx-font-size:"+k+"em;");
				
					label1.setStyle("-fx-font-size:"+k1+"em;");
					
					
					
				
				
				
					
          
		  }
       });

      
  }
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		buttonPointer = ePay;

		
	}

	public static Button buttonPointer;
}
