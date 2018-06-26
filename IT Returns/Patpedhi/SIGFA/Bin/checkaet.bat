"%PROGRAMFILES%\A.E.T. Europe B.V\SafeSign\tokenadmin.exe">nul
echo %ERRORLEVEL%
Set a=%ERRORLEVEL%
echo %a%
:while1
If %a% == 0 (
"%PROGRAMFILES%\A.E.T. Europe B.V\SafeSign\tokenadmin.exe">nul
Set a=%ERRORLEVEL%
echo %a%
Goto :while1
)Start=..\CertUtil\CCS.exe
