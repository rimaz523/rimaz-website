variable "name" {
  description = "Name of the API."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the API should reside in."
  type        = string
}

variable "project" {
  description = "Name of the project."
  type        = string
}

variable "environment" {
  description = "The deployed environment."
  type        = string
}

variable "api_management_name" {
  description = "Name of the APIM instance the API will be published into."
  type        = string
}

variable "api_revision" {
  description = "Revision of the API."
  type        = string
}

variable "path" {
  description = "Path for the API."
  type        = string
}

variable "backend_base_url" {
  description = "Base URL of the Logic App host (scheme + host + port). The signed path is appended via rewrite-uri."
  type        = string
}

variable "logic_app_url_path" {
  description = "Logic App HTTP trigger relative path including the SAS query string. Stored as a secret APIM named value."
  type        = string
  sensitive   = true
}
