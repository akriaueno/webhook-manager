#!/bin/bash
set -eu

script_dir=$(cd $(dirname $0) && pwd)
project_dir=$(cd "$script_dir/.." && pwd)

schema_dir="$project_dir/schemas"
types_dir="$project_dir/src/types"

mkdir -p "$types_dir"

find "$schema_dir" -name "*.json" | while read -r schema_file; do
    relative_path=${schema_file#$schema_dir/}
    type_file="$types_dir/${relative_path%.json}.d.ts"

    mkdir -p "$(dirname "$type_file")"
    npx json2ts "$schema_file" > "$type_file"
done
