@if "%_echo%"=="" echo off
setlocal

set TMP=d:\tmp
set TEMP=d:\tmp

python checker.py --out_dir %TMP% ^ --externs ^
    externs/es6_externs.js ^
    externs/html5_externs.js ^
    externs/editing_externs.js ^
    externs/editing_context_externs.js ^
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
