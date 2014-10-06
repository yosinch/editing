@if "%_echo%"=="" echo off
setlocal

: Remove resouce file which contains our JavaScript file.
del %CR_ROOT%\out\Debug\gen\blink\public\resources\blink_resources.pak

set dest_dir=%CR_ROOT%\third_party\WebKit\Source\core\editing\js
set files= ^
    editing.js ^
    content_model.js ^
    dom.js ^
    editing_context.js ^
    editor.js ^
    operations.js ^
    immutable_selection.js ^
    selection_tracker.js ^
    commands\create_link_command.js ^
    commands\select_all_command.js ^
    commands\undo_command.js

for %%x in (%files%) do (
  echo %%x
  copy %%x %dest_dir%\%%x
)

python tools\expand_include.py %dest_dir%\DocumentExecCommand.js DocumentExecCommand.js
endlocal
