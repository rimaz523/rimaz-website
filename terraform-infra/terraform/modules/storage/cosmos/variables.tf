variable "name" {
  description = "Name of the cosmos db."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the cosmos db should reside in."
  type        = string
}

variable "location" {
  description = "Location of the cosmos db."
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

variable "kind" {
  description = "Kind of cosmos DB."
  type        = string
}

variable "containers" {
  description = "List of containers to be created."
  type = map(object({
    partition_key  = string
    max_throughput = number
  }))
}
