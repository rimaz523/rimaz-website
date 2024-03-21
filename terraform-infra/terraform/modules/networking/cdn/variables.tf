variable "project" {
  description = "Name of the project."
  type        = string
}

variable "environment" {
  description = "The deployed environment."
  type        = string
}

variable "type" {
  description = "The name/type of the cdn."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the cdv should reside in."
  type        = string
}

variable "location" {
  description = "Location of the cdn."
  type        = string
}

variable "sku" {
  description = "SKU of the cdn."
  type        = string
}

variable "endpoint" {
  description = "name of cdn endpoint"
  type        = string
}

variable "hostname" {
  description = "origin hostname"
  type        = string
}

variable "custom_hostname" {
  description = "custom hostname"
  type        = string
}

variable "ssl_cert_kv_secret_id" {
  description = "The ID of the associated Key Vault secret."
  type        = string
}
