package com.itd.efiling.offline.ITR4.ctrl;

import static com.itd.efiling.offline.common.logging.util.LoggerManager.LOG;

import java.net.URL;
import java.util.ResourceBundle;
import javafx.print.Printer;
import com.itd.efiling.offline.ITR4.onchange.util.OnChangeUtil;
import com.itd.efiling.offline.common.player.ctrl.FormPlayerController;
import com.itd.efiling.offline.javafx.ui.components.ValBigIntegerField;
import com.sun.deploy.uitoolkit.impl.fx.HostServicesFactory;
import com.sun.javafx.application.HostServicesDelegate;

import javafx.collections.ObservableSet;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.Insets;
import javafx.geometry.Rectangle2D;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Hyperlink;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.TextArea;
import javafx.scene.image.Image;
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
import javafx.stage.FileChooser;
import javafx.stage.Screen;
import javafx.stage.Stage;


public class HyperLink extends FormPlayerController implements Initializable {

    @FXML
    ScrollPane scrollPane;

    @FXML
    StackPane formContainer;

    @FXML
    VBox progressDialog, msgContainer,reCalculateDialog,VBox,VBox1;
	  
    public static Button buttonPointer;
    
	@FXML
	Hyperlink hyperlink,imageView1;
	  
	@FXML
	ImageView imageView;
	
	@FXML
    Button ePay;

	@FXML
	Button reduceButton,printBtn;

	@FXML
	Button increaseButton;
	
	@FXML
	 HBox HBox;
	
	@FXML
	 GridPane grid;
	
	@FXML
	 Font x9;
	
	@FXML
	ValBigIntegerField AmntPay;
	
	  @FXML
	   AnchorPane Content,Content1;
	   
	   @FXML
		
		Button colorButton,backColor,reduceSize,increaseSize,resetFontSize;

	   
	   @FXML
		
	 		Label label1,label2,label3,label4,label5,label6,label7,label8,label9,label10,label11,label12,label13,label14,label15,label16,label17,label18,label19,label20,label21,label22,label23,label24,label25,label26,label27,label28,label29,label30,label31,label32,label33,label34,
	 		label36,label37,label38,label39,label40,label41,label42,label43,label44,label45,label46,label47,label48,label49,label50,label51,label52,
	 		label53,label54,label55,label56,label57,label58,label59,label60,label61,label62,label63,label35,label64;
	 		
	    
	   Double i=2.0;
	   Double k=1.0,k1=1.4;
	   
	   
	 
	   @FXML
		  public void print(final Event e){
			  printBtn.setOnMouseClicked(new EventHandler<MouseEvent>() {

				  @Override
	  			public void handle(MouseEvent mouseEvent) {
					
					  final TextArea textArea = new TextArea();
					  
					  Printer defaultprinter = Printer.getDefaultPrinter();
					
					  	 
				
					  	                if (defaultprinter != null)
					
					  	                {
					
					  	                    String name = defaultprinter.getName();
					 
					  	                    textArea.appendText("Default printer name: " + name);
					  
					  	                }
					
					  	                else
					
					  	                {
					
					  	                    textArea.appendText("No printers installed.");
					  
					  	                }   
					  	                		
					  	           
					  	            	        Button printSceneButton = new Button("Print Scene");
					  	                		VBox root = new VBox(10);  
					  	            
					  	            	        // Add the Children to the VBox
					  	            
					  	            	        root.getChildren().addAll(printSceneButton,textArea);
					  	            
					  	            	        // Set the Size of the VBox
					  	            
					  	            	        root.setPrefSize(400, 250);    
					  	            
					  	            	        // Set the Style-properties of the VBox
					  	            
					  	            	        root.setStyle("-fx-padding: 10;" +
					  	            
					  	            	                "-fx-border-style: solid inside;" +
					  	            
					  	            	                "-fx-border-width: 2;" +
					  	            
					  	            	                "-fx-border-insets: 5;" +
					  	           
					  	            	                "-fx-border-radius: 5;" +
					  	            
					  	            	                "-fx-border-color: blue;");
					  	            
					  	            	        		
					  	            	    		
					  	            	    			 
					  	            	      
					  	            	    			        printSceneButton.setOnAction(new EventHandler <ActionEvent>()
					  	            	    		
					  	            	    			        {
					  	            	    		
					  	            	    			            public void handle(ActionEvent event)
					  	            	    		
					  	            	    			            {
					  	            	    		
					  	            	    			                FormPlayerController form=new FormPlayerController();
					  	            	    			                form.Preview(e);
					  	            	    	
					  	            	    			            }
					  	            	    		
					  	            	    			        });
					  	            
					  	            	        // Create the Scene
					  	            
					  	            	        Scene scene = new Scene(root);
					  	            
					  	            	        // Add the scene to the Stage
					  	            
					  	            	   Stage stage = new Stage();
					  			            stage.setTitle("Print");
					  			            final Rectangle2D rectangle2D = Screen.getPrimary().getVisualBounds();
					  			            final double windowWidth = rectangle2D.getWidth();
					  			            final double height = rectangle2D.getHeight();

					  			            stage.setHeight(300);
					  			            stage.setWidth(300);
					  			            stage.setScene(scene);
					  			            stage.show();  
				  }
		         });

		        
		    }
		
	   
	   
	   
    private FileChooser filechooser = new FileChooser();

	  @FXML
	  public void setImage(final Event e){
		  imageView1.setOnMouseClicked(new EventHandler<MouseEvent>() {

			  @Override
    			public void handle(MouseEvent mouseEvent) {
				
				Double db= imageView.getFitHeight();

						if(imageView.isVisible()==true)
         			{
			            	 imageView.setVisible(false);
			            	 imageView.setImage(null);
							imageView.setFitHeight(0.0);
							imageView.setFitWidth(0.0);
			
			  			}
						else
						{
						Image image1 = 
						 new Image(this.getClass().getResourceAsStream("/resources/images/Cheque.png"));
						imageView.setImage(image1);
						imageView.setVisible(true);
						imageView.setFitHeight(260.0);
						imageView.setFitWidth(320.0);
						}
	            
			  }
	         });

	        
	    }
	  
	  
	  
	  @FXML
	  public void hyper(final Event e){
		  hyperlink.setOnMouseClicked(new EventHandler<MouseEvent>() {


			  @Override
    			public void handle(MouseEvent mouseEvent) {
					
	            	    HostServicesDelegate hostServices = HostServicesFactory.getInstance(null);
						
	            	    hostServices.showDocument("http://www.incometaxindia.gov.in/Pages/downloads/income-tax-return.aspx");
	            	   
	             }
	         });

	        
	    }
 

	  @FXML
      public void openLink(final Event e){
		  ePay.setOnMouseEntered(new EventHandler<MouseEvent>(){
            @Override
			public void handle(MouseEvent event) {
				// TODO Auto-generated method stub
			    if(AmntPay!=null)
	       		{
	       			LOG.info("text value inside ::"+ AmntPay.getText());
	       			LOG.info("text chars inside::"+ AmntPay.getCharacters());
	       		if(AmntPay.getText().equals("0") || AmntPay.getText()=="" ||  AmntPay.getText().isEmpty())
	       		{
	       			LOG.info("inside amntPay.getText() inside == 0");
	       			ePay.setDisable(true);
	       		}
	       		else
	       		{
	       			LOG.info("inside amntPay.getText() inside != 0");
	       			ePay.setDisable(false);
	       		}
	       		}
			}
			  
		  });
		  ePay.setOnMouseClicked(new EventHandler<MouseEvent>() {

              @Override
                public void handle(MouseEvent mouseEvent) {
                
              	OnChangeUtil.submitEpay();   
              
              }
             });

            
        }
	  
	 
	@FXML
	  public void changeval()
	  {
		if(AmntPay!=null)
		{
			LOG.info("text value inside ::"+ AmntPay.getText());
			LOG.info("text chars inside::"+ AmntPay.getCharacters());
		if(AmntPay.getText().equals("0")|| AmntPay.getText()=="" ||  AmntPay.getText().isEmpty())
		{
			LOG.info("inside amntPay.getText() inside == 0");
			ePay.setDisable(true);
		}
		else
		{
			LOG.info("inside amntPay.getText() inside != 0");
			ePay.setDisable(false);
		}
		}
	  }
	 
	
	
	@FXML
	  public void changeColor(final Event e){
		
		  colorButton.setOnKeyPressed(new EventHandler<KeyEvent>() {

				public void handle(KeyEvent keyEvent) {
					

					if(keyEvent.getCode()==KeyCode.ENTER)
		               {

						  Content.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
						  if(HBox!=null){
						  HBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
						  }
						  if(grid!=null){
						  grid.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
						  }
						 /* VBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
						  VBox1.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));*/
						  label1.setTextFill(Color.web("#ffd700"));
						  label2.setTextFill(Color.web("#ffd700"));
						  label3.setTextFill(Color.web("#ffd700"));
						  label4.setTextFill(Color.web("#ffd700"));
						  label5.setTextFill(Color.web("#ffd700"));
						  label6.setTextFill(Color.web("#ffd700"));
						  label7.setTextFill(Color.web("#ffd700"));
						  label8.setTextFill(Color.web("#ffd700"));
						  label9.setTextFill(Color.web("#ffd700"));
						  label10.setTextFill(Color.web("#ffd700"));
						  label11.setTextFill(Color.web("#ffd700"));
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
						  label62.setTextFill(Color.web("#ffd700"));
						  label63.setTextFill(Color.web("#ffd700"));
						  label64.setTextFill(Color.web("#ffd700"));
						  /*label35.setTextFill(Color.web("#ffd700"));
						  label35.setTextFill(Color.web("#ffd700"));
						  label35.setTextFill(Color.web("#ffd700"));
						  label35.setTextFill(Color.web("#ffd700"));
						  label35.setTextFill(Color.web("#ffd700"));*/
				            
			               }
				}
			});
		
	   colorButton.setOnMouseClicked(new EventHandler<MouseEvent>() {

			  @Override
  			public void handle(MouseEvent mouseEvent) {
				
				  
				  Content.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  if(HBox!=null){
				  HBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  }
				  if(grid!=null){
				  grid.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  }
				 /* VBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  VBox1.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));*/
				  label1.setTextFill(Color.web("#ffd700"));
				  label2.setTextFill(Color.web("#ffd700"));
				  label3.setTextFill(Color.web("#ffd700"));
				  label4.setTextFill(Color.web("#ffd700"));
				  label5.setTextFill(Color.web("#ffd700"));
				  label6.setTextFill(Color.web("#ffd700"));
				  label7.setTextFill(Color.web("#ffd700"));
				  label8.setTextFill(Color.web("#ffd700"));
				  label9.setTextFill(Color.web("#ffd700"));
				  label10.setTextFill(Color.web("#ffd700"));
				  label11.setTextFill(Color.web("#ffd700"));
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
				  label62.setTextFill(Color.web("#ffd700"));
				  label63.setTextFill(Color.web("#ffd700"));
				  label64.setTextFill(Color.web("#ffd700"));
				  /*label35.setTextFill(Color.web("#ffd700"));
				  label35.setTextFill(Color.web("#ffd700"));
				  label35.setTextFill(Color.web("#ffd700"));
				  label35.setTextFill(Color.web("#ffd700"));
				  label35.setTextFill(Color.web("#ffd700"));*/
		            
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
					  if(HBox!=null){
					  HBox.setBackground(new Background(new BackgroundFill(Color.color(0.83, 0.83,1.0), CornerRadii.EMPTY, Insets.EMPTY)));
					  }
					  
					//  HBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
					  if(grid!=null){
					  grid.setBackground(new Background(new BackgroundFill(Color.color(1.0,1.0,0.93), CornerRadii.EMPTY, Insets.EMPTY)));
					  }
					  /*VBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
					  VBox1.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));*/
					  label1.setTextFill(Color.web("#000000"));
					  label2.setTextFill(Color.web("#000000"));
					  label3.setTextFill(Color.web("#000000"));
					  label4.setTextFill(Color.web("#000000"));
					  label5.setTextFill(Color.web("#000000"));
					  
					  label6.setTextFill(Color.web("#000000"));
					  label7.setTextFill(Color.web("#000000"));
					  label8.setTextFill(Color.web("#000000"));
					  label9.setTextFill(Color.web("#000000"));
					  label10.setTextFill(Color.web("#000000"));
					  label11.setTextFill(Color.web("#000000"));
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
					  label62.setTextFill(Color.web("#000000"));
					  label63.setTextFill(Color.web("#000000"));
					  label64.setTextFill(Color.web("#000000"));
			            
		               }
			}
		});
	 
	   backColor.setOnMouseClicked(new EventHandler<MouseEvent>() {

			  @Override
  			public void handle(MouseEvent mouseEvent) {
				
				  Content.setBackground(new Background(new BackgroundFill(Color.WHITESMOKE, CornerRadii.EMPTY, Insets.EMPTY)));
				  if(HBox!=null){
				  HBox.setBackground(new Background(new BackgroundFill(Color.color(0.83, 0.83,1.0), CornerRadii.EMPTY, Insets.EMPTY)));
				  }
				  
				//  HBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  if(grid!=null){
				  grid.setBackground(new Background(new BackgroundFill(Color.color(1.0,1.0,0.93), CornerRadii.EMPTY, Insets.EMPTY)));
				  }
				  /*VBox.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));
				  VBox1.setBackground(new Background(new BackgroundFill(Color.BLACK, CornerRadii.EMPTY, Insets.EMPTY)));*/
				  label1.setTextFill(Color.web("#000000"));
				  label2.setTextFill(Color.web("#000000"));
				  label3.setTextFill(Color.web("#000000"));
				  label4.setTextFill(Color.web("#000000"));
				  label5.setTextFill(Color.web("#000000"));
				  
				  label6.setTextFill(Color.web("#000000"));
				  label7.setTextFill(Color.web("#000000"));
				  label8.setTextFill(Color.web("#000000"));
				  label9.setTextFill(Color.web("#000000"));
				  label10.setTextFill(Color.web("#000000"));
				  label11.setTextFill(Color.web("#000000"));
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
				  label62.setTextFill(Color.web("#000000"));
				  label63.setTextFill(Color.web("#000000"));
				  label64.setTextFill(Color.web("#000000"));
	            
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
						if(k>=1.4)
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
						 if(label8!=null)
					    label8.setStyle("-fx-font-size:"+k+"em;");
						 if(label9!=null)
					    label9.setStyle("-fx-font-size:"+k+"em;");
						 if(label10!=null)
					    label10.setStyle("-fx-font-size:"+k+"em;");
						 if(label1!=null)
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
									 if(label17!=null && k>=1.4)
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
										 if(label26!=null && k>=1.4)
										 {
								    label26.setStyle("-fx-font-size:"+k+"em;");
										 }
									 if(label27!=null && k>=1.4)
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
									 if(label30!=null && k>=1.4)
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
								    if(label34!=null)
								    {
								    label34.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label35!=null)
								    {
								    label35.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label36!=null)
								    {
								    label36.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label37!=null && k>=1.4)
								    {
								    label37.setStyle("-fx-font-size:"+k+"em;");
								    }
								    if(label38!=null && k>=1.4)
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
								    if(label44!=null && k>=1.4)
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
					    
					}
					
					if(k1>=1.7)
					{
						k1=1.4;
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
					if(k>=1.4)
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
					 if(label8!=null)
				    label8.setStyle("-fx-font-size:"+k+"em;");
					 if(label9!=null)
				    label9.setStyle("-fx-font-size:"+k+"em;");
					 if(label10!=null)
				    label10.setStyle("-fx-font-size:"+k+"em;");
					 if(label1!=null)
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
								 if(label17!=null && k>=1.4)
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
									 if(label26!=null && k>=1.4)
									 {
							    label26.setStyle("-fx-font-size:"+k+"em;");
									 }
								 if(label27!=null && k>=1.4)
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
								 if(label30!=null && k>=1.4)
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
							    if(label34!=null)
							    {
							    label34.setStyle("-fx-font-size:"+k+"em;");
							    }
							    if(label35!=null)
							    {
							    label35.setStyle("-fx-font-size:"+k+"em;");
							    }
							    if(label36!=null)
							    {
							    label36.setStyle("-fx-font-size:"+k+"em;");
							    }
							    if(label37!=null && k>=1.4)
							    {
							    label37.setStyle("-fx-font-size:"+k+"em;");
							    }
							    if(label38!=null && k>=1.4)
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
							    if(label44!=null && k>=1.4)
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
				    
				}
				
				if(k1>=1.7)
				{
					k1=1.4;
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
					
					
					//label3.setFont(Font.font("Cambria", k));
					 LOG.info("hhh12"+k);
					 
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
					 if(label10!=null)
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
								
							 if(label28!=null)
							 {
						    label28.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label29!=null)
							 {
						    label29.setStyle("-fx-font-size:"+k+"em;");
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
						    if(label34!=null)
						    {
						    label34.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label35!=null)
						    {
						    label35.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label36!=null)
						    {
						    label36.setStyle("-fx-font-size:"+k+"em;");
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
				    k+=0.1;
				}
				
				if(k1<1.7)
				{
					label1.setStyle("-fx-font-size:"+k1+"em;");
					 if(label17!=null)
					 {
				    label17.setStyle("-fx-font-size:"+k1+"em;");
					 }
					 if(label26!=null)
					 {
			    label26.setStyle("-fx-font-size:"+k1+"em;");
					 }
				 if(label27!=null)
				 {
			    label27.setStyle("-fx-font-size:"+k1+"em;");
				 }
				 
				  if(label30!=null)
					 {
				    label30.setStyle("-fx-font-size:"+k1+"em;");
					 }
				    if(label37!=null)
				    {
				    label37.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label38!=null)
				    {
				    label38.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label44!=null)
				    {
				    label44.setStyle("-fx-font-size:"+k1+"em;");
				    }
					k1+=0.1;
					
				
				}
               }
		}
	});
 
	
	increaseButton.setOnMouseClicked(new EventHandler<MouseEvent>() {

		  @Override
			public void handle(MouseEvent mouseEvent) {
			
				LOG.info("hhh"+k);
				Double max=1.7;
				if(k<max)
				{
					
					
				
					 LOG.info("hhh12"+k);
					 
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
					 if(label10!=null)
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
								
							 if(label28!=null)
							 {
						    label28.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label29!=null)
							 {
						    label29.setStyle("-fx-font-size:"+k+"em;");
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
						    if(label34!=null)
						    {
						    label34.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label35!=null)
						    {
						    label35.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label36!=null)
						    {
						    label36.setStyle("-fx-font-size:"+k+"em;");
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
				    k+=0.1;
				}
				
				if(k1<1.7)
				{
					label1.setStyle("-fx-font-size:"+k1+"em;");
					 if(label17!=null)
					 {
				    label17.setStyle("-fx-font-size:"+k1+"em;");
					 }
					 if(label26!=null)
					 {
			    label26.setStyle("-fx-font-size:"+k1+"em;");
					 }
				 if(label27!=null)
				 {
			    label27.setStyle("-fx-font-size:"+k1+"em;");
				 }
				 
				  if(label30!=null)
					 {
				    label30.setStyle("-fx-font-size:"+k1+"em;");
					 }
				    if(label37!=null)
				    {
				    label37.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label38!=null)
				    {
				    label38.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label44!=null)
				    {
				    label44.setStyle("-fx-font-size:"+k1+"em;");
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
					k1=1.4;
					
						
					label1.setStyle("-fx-font-size:"+k1+"em;");
					 if(label17!=null)
					 {
				    label17.setStyle("-fx-font-size:"+k1+"em;");
					 }
					 if(label26!=null)
					 {
			    label26.setStyle("-fx-font-size:"+k1+"em;");
					 }
				 if(label27!=null)
				 {
			    label27.setStyle("-fx-font-size:"+k1+"em;");
				 }
				 
				  if(label30!=null)
					 {
				    label30.setStyle("-fx-font-size:"+k1+"em;");
					 }
				    if(label37!=null)
				    {
				    label37.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label38!=null)
				    {
				    label38.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label44!=null)
				    {
				    label44.setStyle("-fx-font-size:"+k1+"em;");
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
					 if(label8!=null)
				    label8.setStyle("-fx-font-size:"+k+"em;");
					 if(label9!=null)
				    label9.setStyle("-fx-font-size:"+k+"em;");
					 if(label10!=null)
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
								
							 if(label28!=null)
							 {
						    label28.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label29!=null)
							 {
						    label29.setStyle("-fx-font-size:"+k+"em;");
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
						    if(label34!=null)
						    {
						    label34.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label35!=null)
						    {
						    label35.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label36!=null)
						    {
						    label36.setStyle("-fx-font-size:"+k+"em;");
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
				
			
			
           }
           
           }
	  
   });
	
	resetFontSize.setOnMouseClicked(new EventHandler<MouseEvent>() {

		  @Override
			public void handle(MouseEvent mouseEvent) {
			
				 k=1.0;
					k1=1.4;
					
						
					label1.setStyle("-fx-font-size:"+k1+"em;");
					 if(label17!=null)
					 {
				    label17.setStyle("-fx-font-size:"+k1+"em;");
					 }
					 if(label26!=null)
					 {
			    label26.setStyle("-fx-font-size:"+k1+"em;");
					 }
				 if(label27!=null)
				 {
			    label27.setStyle("-fx-font-size:"+k1+"em;");
				 }
				 
				  if(label30!=null)
					 {
				    label30.setStyle("-fx-font-size:"+k1+"em;");
					 }
				    if(label37!=null)
				    {
				    label37.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label38!=null)
				    {
				    label38.setStyle("-fx-font-size:"+k1+"em;");
				    }
				    if(label44!=null)
				    {
				    label44.setStyle("-fx-font-size:"+k1+"em;");
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
					 if(label8!=null)
				    label8.setStyle("-fx-font-size:"+k+"em;");
					 if(label9!=null)
				    label9.setStyle("-fx-font-size:"+k+"em;");
					 if(label10!=null)
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
								
							 if(label28!=null)
							 {
						    label28.setStyle("-fx-font-size:"+k+"em;");
							 }
							 if(label29!=null)
							 {
						    label29.setStyle("-fx-font-size:"+k+"em;");
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
						    if(label34!=null)
						    {
						    label34.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label35!=null)
						    {
						    label35.setStyle("-fx-font-size:"+k+"em;");
						    }
						    if(label36!=null)
						    {
						    label36.setStyle("-fx-font-size:"+k+"em;");
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
				
			
				
					
          
		  }
       });

      
  }
		@Override
		public void initialize(URL location, ResourceBundle resources) {
			
		   
			buttonPointer = ePay;
			LOG.info("Hyperlink"+buttonPointer);
		}	

	
}
