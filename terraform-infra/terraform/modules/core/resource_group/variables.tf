variable "name" {
  description = "Identifier of the resource group."
  type        = string
}

variable "location" {
  description = "Location of the resource group."
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
