variable "kv_name" {
  description = "Name of the key vault."
  type        = string
}

variable "kv_resource_group" {
  description = "Name of the resource group the key vault resides in."
  type        = string
}

variable "secret_name" {
  description = "Name of the secret to retrieve."
  type        = string
}
