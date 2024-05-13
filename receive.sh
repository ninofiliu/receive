#!/bin/sh
cd $(dirname $(readlink $0))
deno run -A ./main.ts
