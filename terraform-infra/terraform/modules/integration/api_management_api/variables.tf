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

variable "service_url" {
  description = "URL of the domain servicing the api requests."
  type        = string
}

variable "swagger_file_name" {
  description = "Name of the swagger definition file."
  type        = string
}

variable "azure_storage_container_url_for_swagger" {
  description = "URL of the azure blob container that holds the swagger definition file."
  type        = string
}

variable "swagger_format" {
  description = "Format of the swagger file."
  type        = string
}

variable "whitelist_localhost_domain" {
  description = "Localhost url to whitelist for APIM access."
  type        = string
}

variable "whitelist_frontend_webapp_domain" {
  description = "Frontend Webapp url to whitelist for APIM access."
  type        = string
}

variable "whitelist_frontend_webapp_domain_www" {
  description = "Frontend Webapp url to whitelist for APIM access for www prefix."
  type        = string
}

variable "whitelist_localhost_domain_react" {
  description = "Localhost react url to whitelist for APIM access."
  type        = string
}

variable "whitelist_frontend_webapp_domain_react" {
  description = "Frontend Angular Webapp url to whitelist for APIM access."
  type        = string
}
