#!/bin/bash

for name in $(aws lambda list-functions | jq -r ".Functions[].FunctionName") 
do
    echo "$name"
done