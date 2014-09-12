@if "%_echo%"=="" echo off
if "%CR_ROOT%"=="" goto :no_cr_root
setlocal

set TMP=d:\tmp
set TEMP=d:\tmp
set closure_jar=%CR_ROOT%\third_party\closure_compiler\compiler\compiler.jar

python checker.py --compiler %closure_jar% --out_dir %TMP% ^
    --js_externs externs/es6_externs.js ^
    externs/html5_externs.js ^
    externs/editing_externs.js ^
    externs/editing_context_externs.js ^
    externs/editing_style_externs.js ^
    externs/editor_externs.js ^
    externs/nodes_externs.js ^
    externs/operations_externs.js ^
    externs/read_only_selection_externs.js ^
    externs/selection_tracker_externs.js ^
    testing/externs/sample_externs.js ^
    testing/externs/testing_externs.js ^
    testing/externs/test_runner_externs.js ^
    -- %*

exit /b

python checker.py --out_dir %TMP% ^ --externs ^
    externs/editing_context_externs.js ^
    externs/editor_externs.js ^
    externs/es6_externs.js ^
    externs/html5_externs.js ^
    externs/operations_externs.js ^
    externs/read_only_selection_externs.js ^
    externs/selection_tracker_externs.js ^
    externs/typedefs.js ^
    testing/externs/sample_externs.js ^
    testing/externs/testing_externs.js ^
    testing/externs/test_runner_externs.js ^
    testing/externs/testing_typedefs.js ^
    -- %*
endlocal
exit /b %ERRORLEVEL%

:no_cr_root
echo You should set CR_ROOT to Chromium source root, e.g. d:\src\w\crbk\src.
exit /b 1
