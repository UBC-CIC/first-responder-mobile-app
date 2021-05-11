#!/bin/bash

helpFunction()
{
   echo ""
   echo "Usage: $0 -n <DDB Table Name> -i <AppSync ApiId> -r <region>"
   echo -e "\t-n The name of the dynamoDB Table that is to be added as a dataSource"
   echo -e "\t-i AppSync ApiId for the app to add a dataSource to"
   echo -e "\t-r AWS Region"
   exit 1 # Exit script after printing help
}


deletePolicy(){
    aws iam delete-policy --policy-arn $1 | echo "Deleting Policy $1"
}

deleteRole(){
    aws iam delete-role --role-name $1 | echo "Deleting Role $1"
}

detachAllPolicies(){
    for policy in $(aws iam list-role-policies --role-name $1 --query PolicyNames --output text); do
        aws iam delete-role-policy --role-name $1 --policy-name $policy | echo "Deleting Policy $policy"
    done
}

error(){
    echo "Error Ocurred, please retry. This operation may have created AWS resourses that should be deleted"
    # detachAllPolicies $1
    # deleteRole $1
    exit 1
}


while getopts "n:i:r:" opt
do
   case "$opt" in
      n ) tableName="$OPTARG" ;;
      i ) ApiId="$OPTARG" ;;
      r ) region="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$tableName" ] || [ -z "$ApiId" ] || [ -z "$region" ]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi

# Begin script in case all parameters are correct

roleName=$tableName-ddb-access-data-source

# Get the user's accountNumber for defining ARNS
accountNumber=$(aws sts get-caller-identity --query Account --output text) || echo "Error getting AWS Account Number" exit 1

trustPolicyDocument=""{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"appsync.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}""
ddbPolicyDocument=""{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":[\"dynamodb:DeleteItem\",\"dynamodb:GetItem\",\"dynamodb:PutItem\",\"dynamodb:Query\",\"dynamodb:Scan\",\"dynamodb:UpdateItem\"],\"Resource\":[\"arn:aws:dynamodb:ca-central-1:$accountNumber:table\/$tableName\",\"arn:aws:dynamodb:ca-central-1:$accountNumber:table\/$tableName\/*\"]}]}""

# get the role that will define DataSource permissions
echo "Creating or Getting IAM Role: $roleName"
serviceRoleArn=$(aws iam create-role --role-name $roleName --assume-role-policy-document $trustPolicyDocument --query Role.Arn --output text || aws iam get-role --role-name $roleName --query Role.Arn --output text)

aws iam put-role-policy --role-name $roleName --policy-name $roleName-policy --policy-document $ddbPolicyDocument | echo "Attaching DDB Policy to Role $roleName" || error "$roleName"

# create Appsync datasource with dynamoDB

dataSourceName=$(sed -E 's/-([a-z])/\1/g' <<< $tableName)

aws appsync create-data-source --api-id $ApiId --name "$dataSourceName" --type AMAZON_DYNAMODB --dynamodb-config tableName=$tableName,awsRegion=$region --service-role-arn $serviceRoleArn && echo "" || error "$roleName"