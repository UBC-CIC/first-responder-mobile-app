#!/bin/bash

APPNAME=$1
apiID=$(aws appsync list-graphql-apis | jq -r --arg APPNAME "$APPNAME" '.graphqlApis[]|select(.name==$APPNAME).apiId')
echo $apiID