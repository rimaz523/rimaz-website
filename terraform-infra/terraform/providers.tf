terraform {
  required_version = ">=1.7.1"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.89.0"
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
}
