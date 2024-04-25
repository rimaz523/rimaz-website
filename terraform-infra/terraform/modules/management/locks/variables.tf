variable "lock_name" {
  description = "Name of the lock"
  type        = string
}

variable "resource_id" {
  description = "subscription, resource group or resource id"
  type        = string
}

variable "lock_level" {
  description = "Type of lock - ReadOnly or CannotDelete"
  type        = string
}

variable "lock_reason" {
  description = "Reason for locking the resource"
  type        = string
}
