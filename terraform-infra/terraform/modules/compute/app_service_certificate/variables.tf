variable "resource_group_name" {
  description = "Name of the resource group where the web app should reside in."
  type        = string
}

variable "location" {
  description = "Location of the web app."
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
