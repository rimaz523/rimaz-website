variable "custom_domain" {
  description = "Name of the custom domain."
  type        = string
}

variable "web_app_name" {
  description = "Name of the web app to bing the custom domain."
  type        = string
}

variable "app_resource_group" {
  description = "Name of the resource group where the web app resides in."
  type        = string
}

variable "ssl_state" {
  description = "The type of certificate binding."
  type        = string
}

variable "certificate_id" {
  description = "The ID of the certificate to bind to the custom domain."
  type        = string
}
