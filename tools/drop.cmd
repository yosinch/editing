@if "%_echo%"=="" echo off
setlocal
set dest_dir=d:\src\w\crbk\src\third_party\WebKit\Source\core\editing\js
set files= ^
    editing.js ^
    content_model.js ^
    editing_context.js ^
    editor.js ^
    nodes.js ^
    operations.js ^
    read_only_selection.js ^
    selection_tracker.js ^
    commands\create_link_command.js ^
    commands\undo_command.js

for %%x in (%files%) do (
  copy %%x %dest_dir%\%%x
)

python tools\expand_include.py %dest_dir%\DocumentExecCommandInJavaScript.js DocumentExecCommandInJavaScript.js
endlocal
