terraform {
  required_version = ">=1.8.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.100.0"
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
