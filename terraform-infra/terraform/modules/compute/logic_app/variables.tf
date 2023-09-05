variable "project" {
  description = "Name of the project."
  type        = string
}

variable "environment" {
  description = "The deployed environment."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the logic app should reside in."
  type        = string
}

variable "name" {
  description = "Name of the deployment/logic app."
  type        = string
}

variable "deployment_mode" {
  description = "Deployment mode for the logic app template workflow."
  type        = string
}

variable "template_file" {
  description = "Name of the template file to deploy."
  type        = string
}

variable "connection_name" {
  description = "Name of the connection used by the logic app."
  type        = string
}

variable "subscription_id" {
  description = "Id of the subscription the logic app gets deployed to."
  type        = string
}
