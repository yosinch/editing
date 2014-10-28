@if "%_echo%"=="" echo off
if "%CR_ROOT%"=="" goto :no_cr_root
setlocal

set TMP=d:\tmp
set TEMP=d:\tmp
set closure_jar=.\third_party\closure_compiler\compiler\compiler.jar

python checker.py --compiler %closure_jar% --out_dir %TMP% -- %*

exit /b %ERRORLEVEL%

:no_cr_root
echo You should set CR_ROOT to Chromium source root, e.g. d:\src\w\crbk\src.
exit /b 1
