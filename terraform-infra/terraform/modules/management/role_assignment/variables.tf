variable "scope_id" {
  description = "Id of the instance."
  type        = string
}

variable "principal_id" {
  description = "user, managed identity or service principal Id."
  type        = string
}

variable "roles" {
  description = "List of roles to assign."
  type        = list(string)
}

variable "skip_service_principal_aad_check" {
  description = "Skip service principal AAD check"
  type        = bool
}
