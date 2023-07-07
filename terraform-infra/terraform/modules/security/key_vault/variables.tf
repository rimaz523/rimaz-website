variable "name" {
  description = "Name of the key vault instance."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the key vault instance should reside in."
  type        = string
}

variable "location" {
  description = "Location of the key vault."
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
  description = "SKU for the key vault."
  type        = string
}

variable "tenant_id" {
  description = "Tenant id for the key vault"
}
