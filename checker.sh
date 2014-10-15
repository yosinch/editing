#!/bin/sh

if [ -z "$CR_ROOT" ]; then
  echo "You should set CR_ROOT to Chromium source root, e.g. ~/chromium/src"
  exit 1
fi

closure_jar=$CR_ROOT/third_party/closure_compiler/compiler/compiler.jar

python checker.py --compiler $closure_jar --out_dir /tmp -- $@
