# Copyright 2014 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

"""Expand include directive in JavaScript file.
FIXME: We don't want to add more build scripts. Rewrite this script in grit. crbug.com/388121

Usage:
python make_private_script_source.py DESTINATION_FILE SOURCE_FILES
"""

import os
import re
import sys


RE_INCLUDE = re.compile('<include[^>]+src=[\'"]([^>]*)[\'"]>')

# Expand <include src="file_name"> directives
# FIXME: Expansion of include directive will be done by GRD resources building
# system in the future.
def process_input_file(filename):
    result_text = ''
    dirname = os.path.dirname(filename)
    with open(filename) as input_file:
        for line in input_file.readlines():
            match = re.search(RE_INCLUDE, line)
            if match:
                result_text += process_input_file(os.path.join(dirname, match.group(1)))
            else:
                result_text += line
        return result_text

def main():
    output_filename = sys.argv[1]
    input_filename = sys.argv[2]

    output_text = process_input_file(input_filename)
    with open(output_filename, 'w') as output_file:
        output_file.write(output_text)


if __name__ == '__main__':
    sys.exit(main())
