@echo off

set CHK_JAVA=""

set TEMP_FILE=%TEMP%\javaCheck%RANDOM%%TIME:~9,5%.txt


if %TEMP_FILE%=="" (
	set TEMP_FILE=C:\javaCheck%RANDOM%%TIME:~9,5%.txt
)

echo TRACES PDF Generation Utility to generate Form 16 / 16A requires JAVA Version 1.6 or above.

java -version 2>%TEMP_FILE%

FOR /F "tokens=*" %%i in (%TEMP_FILE%) do (
  echo %%i | find "version" >nul
  if not errorlevel 1 (
    echo %%i | find "1.6" >nul
    if not errorlevel 1 (
      set CHK_JAVA="OK"
    )
    echo %%i | find "1.7" >nul
        if not errorlevel 1 (
          set CHK_JAVA="OK"
    )
    echo %%i | find "1.8" >nul
        if not errorlevel 1 (
          set CHK_JAVA="OK"
     )
  )
)

del %TEMP_FILE%

if %CHK_JAVA%=="OK" (
  echo Launching now
  rem echo %~dp0TRACES-PDF-CONVERTER.jar
  rem pause
  start javaw -Xms1024m -jar %~dp0TRACES-PDF-CONVERTERV1.4L.jar
) else (

  echo You do not have JRE version 1.6 or above required to launch TRACES PDF Generation Utility.
  echo Please install JRE version 1.6 or above and try again.
  echo Visit http://www.java.com/en/download/index.jsp for JRE download details.
  pause
)
