#!/bin/sh

if [ -z "$CR_ROOT" ]; then
  echo "You should set CR_ROOT to Chromium source root, e.g. ~/chromium/src"
  exit 1
fi

closure_jar=$CR_ROOT/third_party/closure_compiler/compiler/compiler.jar

python checker.py --compiler $closure_jar --out_dir /tmp \
  --js_externs externs/es6_externs.js \
  externs/html5_externs.js \
  externs/dom_externs.js \
  externs/editing_externs.js \
  externs/editing_context_externs.js \
  externs/editing_style_externs.js \
  externs/editor_externs.js \
  externs/operations_externs.js \
  externs/immutable_selection_externs.js \
  externs/selection_tracker_externs.js \
  externs/undo_unit_externs.js \
  testing/externs/sample_externs.js \
  testing/externs/testing_externs.js \
  testing/externs/test_runner_externs.js \
  -- $@
