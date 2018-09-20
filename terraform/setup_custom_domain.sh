#!/bin/bash

echo "Getting modules..."
terraform get

echo "Initializing state backend..."
terraform init

echo "Applying full terraform manipulation"
terraform apply -auto-approve
