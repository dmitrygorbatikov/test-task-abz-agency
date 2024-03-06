#!/bin/bash

AWS_SECRET_ID="test-task-store-secrets"
AWS_REGION="eu-north-1"
ENVFILE="./.env"

# Export the secret to .env
aws secretsmanager get-secret-value --secret-id $AWS_SECRET_ID --region $AWS_REGION | \
  jq -r '.SecretString' | \
  jq -r "to_entries|map(\"\(.key)=\\\"\(.value|tostring)\\\"\")|.[]" > $ENVFILE