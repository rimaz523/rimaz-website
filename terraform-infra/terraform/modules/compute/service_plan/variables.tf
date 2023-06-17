variable "resource_group_name" {
  description = "Name of the resource group where the app service plan should reside in."
  type        = string
}
variable "location" {
  description = "Location of the app service plan."
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

variable "app_service_sku" {
  description = "SKU for the app service plan."
  type        = string
}

variable "app_service_os" {
  description = "Operating system for the app service plan."
  type        = string
}
