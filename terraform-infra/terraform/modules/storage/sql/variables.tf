variable "name" {
  description = "Name of the sql server."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the sql server should reside in."
  type        = string
}

variable "location" {
  description = "Location of the sql server."
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
  description = "SKU for the database."
  type        = string
}

variable "admin_login_name" {
  description = "Database server login username."
  type        = string
  sensitive   = true
}

variable "admin_login_password" {
  description = "Database server login password."
  type        = string
  sensitive   = true
}

variable "ms_entra_login_username" {
  description = "Database server MS Entra login username."
  type        = string
}

variable "ms_entra_login_object_id" {
  description = "Database server MS Entra login object id."
  type        = string
}
