variable "name" {
  description = "Name of the app insights standard web test."
  type        = string
}

variable "resource_group_name" {
  description = "Name of the resource group where the standard web test should reside in."
  type        = string
}

variable "location" {
  description = "Location of the app insights standard web test."
  type        = string
}

variable "application_insights_id" {
  description = "The application insights resource where the test resides in."
  type        = string
}

variable "geo_locations" {
  description = "geo locations for the standard web test."
  type        = list(string)
}

variable "url" {
  description = "URL for the standard web test."
  type        = string
}

variable "frequency" {
  description = "Frequency of the standard web test."
  type        = number
}

variable "timeout" {
  description = "Timeout in seconds for each test."
  type        = number
}
