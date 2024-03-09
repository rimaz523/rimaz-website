# My Developer Website's Platform Infrastructure Code

## Description

This code creates the infrastructure of my dev website using terraform.
Site URL : https://rimaz.dev

## Technologies & Tools used include:

- Terraform v1.7.1
- CI/CD using Azure DevOps


## Prerequisites

- Install [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli). v2.45.0
- Install [Terraform](https://developer.hashicorp.com/terraform/downloads) v1.3.8
- Install Powershell 7

## Running Terraform Locally

- Clone the project locally
- Run `/scripts/set_access_key.ps1` to login to azure cli, select your subscription and then set your access_key to the tfstate backend stored in azure storage.
- Change to the `/terraform` directory.
- Run `terraform init -backend-config="key=dev.terraform.tfstate"`
- Run `terraform plan -out terraform.tfplan --var-file="dev.tfvars"` to see your planned changes
- Run `terraform apply terraform.tfplan` to apply your changes to the cloud environment

## Upgrading to a newer version of Terraform

- Download/Install the latest terraform binary from https://developer.hashicorp.com/terraform/install
- Replace the old binary with the new one (Your Environment variable should point to the binary)
- Run `terraform -v` to check if newer version is running
- Update the `providers.tf` file in your code and set the latest terraform (and optionally azurem provider) version
- In the terminal change to the `/terraform` directory.
- Run `terraform init -upgrade`
- Run `terraform init -backend-config="key=dev.terraform.tfstate"`
- Run `terraform plan -out terraform.tfplan --var-file="dev.tfvars"` to see your planned changes
- Run `terraform apply terraform.tfplan` to apply your changes to the cloud environment
- 

## Configuring VSCode

- Install the most recent version of VSCode

## Project Wiki :
TODO

## Learn More

You can learn more about terraform by visiting the official documentation [here.](https://developer.hashicorp.com/terraform/docs).