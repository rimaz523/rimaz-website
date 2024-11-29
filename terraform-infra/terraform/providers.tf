terraform {
  required_version = ">=1.9.8"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=4.10.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rimaz-admin-rg"
    storage_account_name = "rmzadminstore"
    container_name       = "tfstate"
    key                  = "#{terraform-state-key}#"
  }

}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}
