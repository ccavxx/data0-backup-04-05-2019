@echo off
set path=C:\Program Files(x86)\Java\jre6\bin;%path%
set CLASSPATH=%CLASSPATH%;.;./TDS_RPU.jar
start javaw -jar TDS_RPU.jar