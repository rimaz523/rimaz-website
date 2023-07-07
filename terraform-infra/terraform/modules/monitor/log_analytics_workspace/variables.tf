variable "resource_group_name" {
  description = "Name of the resource group where the log analytics workspace should reside in."
  type        = string
}

variable "location" {
  description = "Location of the log analytics workspace."
  type        = string
}

variable "environment" {
  description = "The deployed environment."
  type        = string
}

variable "name" {
  description = "Name of the log analytics workspace."
  type        = string
}

variable "sku" {
  description = "SKU of the log analytics workspace."
  type        = string
}

variable "retention_days" {
  description = "Number of days to retain logs."
  type        = string
}

variable "project" {
  description = "Name of the project."
  type        = string
}
