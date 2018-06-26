How to run the application?
- Ensure that java version 1.7 or more is installed.(version can be identified by executing "java -version" command)
- Unzip and extract the files in the desired path/location.
-----------------------------------------------------------
						To run in WINDOWS
-----------------------------------------------------------						
Double click FORM.bat
Or
Run from command prompt by executing "FORM.bat" (ensure that current working directory has the extracted files)

-----------------------------------------------------------
						To run in LINUX
-----------------------------------------------------------		
Change the FORM.sh file's permission, provide execution permission by executing the following command
> chmod 755 FORM.sh 				
run using the command "sh FORM.sh" or ./FORM.sh


-----------------------------------------------------------
						Troubleshooting
-----------------------------------------------------------
Make sure that your java version is 1.7 (version can be identified by executing "java -version" command)
1. Extract the files to a directory. (Example:  D:\Utility)
2. Open command prompt
3. Change to the extraction directory (cd D:\Utility)
4. Type the following command :
<Path to java executable> -jar <jarFileName>

For example If your Java 7 Installation path is "C:\Program Files (x86)\Java\jre7" and you are opening FORM15CA then execute the following command
   
D:\Utility>"C:\Program Files (x86)\Java\jre7\bin\java" -jar FORM15CA_PR7.jar
------------------------------------------------------------