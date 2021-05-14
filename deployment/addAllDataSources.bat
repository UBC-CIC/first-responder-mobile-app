#!/bin/bash

apiid=$1
region=$2

for name in $(cat ./deployment/tableNames.txt) 
do
    echo "Adding $name as a datasource"
    ./addDataSource.bat -n $name -i $apiid -r $region
done