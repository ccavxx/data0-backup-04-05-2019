@echo off
set path=C:\Program Files\Java\jre6\bin;%path%
set CLASSPATH=%CLASSPATH%;.;./TDS_RPU_2.3.jar
start javaw -jar TDS_RPU_2.3.jar