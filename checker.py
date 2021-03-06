# Copyright (C) 2013 by Project Vogue.
# Written by Yoshifumi "VOGUE" INOUE. (yosi@msn.com)

import argparse
import glob
import os
import re
import sys

# ${evita_src}/tools/closure_compiler.py
#script_dir = os.path.dirname(os.path.realpath(__file__))

JAVA_OPTIONS = ['-client', '-Xms1G', '-XX:+TieredCompilation'];

# See below folow list of warnings:
# https://code.google.com/p/closure-compiler/wiki/Warnings
CLOSURE_ERRORS = [
    'accessControls',
    'ambiguousFunctionDecl',
    'checkDebuggerStatement',
    'checkRegExp',
    'checkStructDictInheritance',
    'checkTypes',
    'checkVars',
    'const',
    'constantProperty',
    'deprecated',
    'externsValidation',
    'globalThis',
    'invalidCasts',
    'misplacedTypeAnnotation',
    'missingProperties',
    'missingReturn',
    'nonStandardJsDocs',
    'strictModuleDepCheck',
    'suspiciousCode',
    'undefinedNames',
    'undefinedVars',
    'unknownDefines',
    'uselessCode',
    'visibility',
];

CLOSURE_WARNINGS = [
];

CLOSURE_OPTIONS = [
    '--compilation_level=SIMPLE',
    '--formatting=PRETTY_PRINT',
    '--language_in=ECMASCRIPT6_STRICT',
    '--language_out=ECMASCRIPT5',
    '--summary_detail_level=3',
    '--warning_level=VERBOSE',
];

FILES_IGNORING_TEST = [
    os.path.join('.', name) for name in [
        'DocumentExecCommand.js',
        'polyfill.js',
    ]
];

JS_EXTERNS = [
    'externs/es6_externs.js',
    'externs/dom_externs.js',
    'externs/html5_externs.js',
    'externs/command_context_externs.js',
    'externs/editing_externs.js',
    'externs/editing_context_externs.js',
    'externs/editing_style_externs.js',
    'externs/editor_externs.js',
    'externs/link_command_context_base_externs.js',
    'externs/operations_externs.js',
    'externs/immutable_selection_externs.js',
    'externs/selection_tracker_externs.js',
    'externs/undo_unit_externs.js',
    'testing/externs/sample_externs.js',
    'testing/externs/testing_externs.js',
    'testing/externs/test_runner_externs.js',
];

def makeOptions(name, values):
    if not len(values):
      return ''
    return name + ' ' + (' ' + name + ' ').join(values)

def check(closure_jar, js_output_file, js_files, closure_options):
    params = {
        'java_options': ' '.join(JAVA_OPTIONS),
        'closure_errors': makeOptions('--jscomp_error', CLOSURE_ERRORS),
        'closure_warnings': makeOptions('--jscomp_warning', CLOSURE_WARNINGS),
        'closure_jar': closure_jar,
        'closure_options': ' '.join(CLOSURE_OPTIONS + closure_options),
        'js_files': makeOptions('--js', js_files),
        'js_externs': makeOptions('--externs', JS_EXTERNS),
    }
    command_line = ('java %(java_options)s -jar %(closure_jar)s' + \
                    ' --js_output_file=' + js_output_file + \
                    ' %(closure_options)s' + \
                    ' %(closure_errors)s' + \
                    ' %(closure_warnings)s' + \
                    ' %(js_files)s' + \
                    ' %(js_externs)s') % params;
    exit_code = os.system(command_line)
    if exit_code != 0:
        try:
            if os.path.isfile(js_output_file):
                os.remove(js_output_file)
        except OSError as detail:
            print detail
    return exit_code == 0

def main():
    parser = argparse.ArgumentParser(
        description="Typecheck JavaScript using Closure compiler")
    parser.add_argument("sources", nargs=argparse.ZERO_OR_MORE,
        help="Path to source files to typecheck")
    parser.add_argument("-C", "--compiler",
        help="Path to compiler.jar");
    parser.add_argument("-o", "--out_dir",
        help="A place to output results", default='.')

    options = parser.parse_args()

    closure_options = []
    succeeded = True
    js_sources = options.sources

    if len(js_sources) == 0:
        # TODO(hajimehoshi): Now 'testing/*.js' are skipped because they causes
        # a lot of warnings. Enable type-checking for them later.
        filenames = []
        for dir in ['.', 'commands']:
            filenames.extend(glob.glob(dir + '/*.js'))
        js_sources = [filename for filename in filenames
                      if not (filename.endswith('_unittest.js') or
                              filename in FILES_IGNORING_TEST)]
        if len(js_sources) == 0:
            return 0

        js_output_file = js_output_file = os.path.join(
            options.out_dir, 'output.js')
        succeeded = check(options.compiler, js_output_file,
                          js_sources, closure_options) and succeeded
    else:
        for js_source in js_sources:
            js_basename = os.path.basename(js_source)
            js_output_file = os.path.join(
                options.out_dir, os.path.splitext(js_basename)[0] + '_min.js')
            print 'Checking', js_source
            succeeded = check(options.compiler, js_output_file,
                              [js_source], closure_options) and succeeded
    return 0 if succeeded else 1

if __name__ == '__main__':
    sys.exit(main())
