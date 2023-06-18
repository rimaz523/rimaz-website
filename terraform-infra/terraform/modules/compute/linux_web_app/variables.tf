variable "project" {
  description = "Name of the project."
  type        = string
}

variable "environment" {
  description = "The deployed environment."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the web app should reside in."
  type        = string
}

variable "location" {
  description = "Location of the web app."
  type        = string
}

variable "service_plan_id" {
  description = "The app service plan."
  type        = string
}

variable "name" {
  description = "Name of the app."
  type        = string
}

variable "stack" {
  description = "The stack to run the app on."
  type        = string
}

variable "stack_version" {
  description = "Version of the stack."
  type        = string
}

variable "app_ssl_cert_name" {
  description = "Name of the ssl cert."
  type        = string
}

variable "ssl_cert_kv_secret_id" {
  description = "The ID of the associated Key Vault secret."
  type        = string
}
