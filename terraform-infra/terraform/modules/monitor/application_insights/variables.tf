variable "resource_group_name" {
  description = "Name of the resource group where the app insights instance should reside in."
  type        = string
}

variable "location" {
  description = "Location of the app insights instance."
  type        = string
}

variable "environment" {
  description = "The deployed environment."
  type        = string
}

variable "name" {
  description = "Name of the app insights instance."
  type        = string
}

variable "retention_days" {
  description = "Number of days to retain app insights logs."
  type        = string
}

variable "application_type" {
  description = "The type of app insights to create. Values : web, ios, java, MobileCenter, Node.JS, other, phone, store."
  type        = string
}

variable "workspace_id" {
  description = "The workspace id for the app insights instance."
  type        = string
}

variable "project" {
  description = "Name of the project."
  type        = string
}
