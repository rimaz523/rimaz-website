variable "name" {
  description = "Name of the storage account."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the storage account should reside in."
  type        = string
}

variable "location" {
  description = "Location of the storage account."
  type        = string
}

variable "environment" {
  description = "The deployed environment."
  type        = string
}

variable "project" {
  description = "Name of the project."
  type        = string
}

variable "sku" {
  description = "SKU for the storage account."
  type        = string
}

variable "replication_type" {
  description = "Replication type for the storage account"
  type        = string
}
