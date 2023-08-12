variable "name" {
  description = "Name of the APIM instance."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the APIM instance should reside in."
  type        = string
}

variable "location" {
  description = "Location of the APIM."
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

variable "company_name" {
  description = "Name of the publisher company."
  type        = string
}

variable "company_email" {
  description = "Email of the publisher company."
  type        = string
}

variable "sku" {
  description = "SKU for the APIM."
  type        = string
}
