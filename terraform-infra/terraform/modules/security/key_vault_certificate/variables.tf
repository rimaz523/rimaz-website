variable "kv_name" {
  description = "Name of the key vault."
  type        = string
}

variable "kv_resource_group" {
  description = "Name of the resource group the key vault resides in."
  type        = string
}

variable "ssl_cert_name" {
  description = "Name of the ssl certificate to retrieve."
  type        = string
}
