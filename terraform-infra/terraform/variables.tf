variable "project" {
  default     = "#{project}#"
  description = "Name of the project."
}

variable "environment" {
  default     = "#{environment}#"
  description = "The deployed environment."
}

variable "resource_groups" {
  description = "create resource groups in the project's environment"
  type = map(object({
    location = string
  }))
  default = {
    "app" = {
      location = "#{resource_group_location}#"
    }
    "data" = {
      location = "#{resource_group_location}#"
    }
    "common" = {
      location = "#{resource_group_location}#"
    }
  }
}

variable "service_plans" {
  description = "create app service plans"
  type = map(object({
    sku = string
    os  = string
  }))
  default = {
    "asp" = {
      sku = "#{app_service_sku}#"
      os  = "#{app_service_os}#"
    }
  }
}

variable "linux_webapps" {
  description = "create linux web apps for deploying the marketplace api and frontends"
  type = map(object({
    stack         = string
    stack_version = string
  }))
  default = {
    "react" = {
      stack         = "node"
      stack_version = "18-lts"
    }
  }
}

variable "ssl_certificates" {
  description = "get ssl certificates for the hosted web apps"
  type = map(object({
    kv_name           = string
    kv_resource_group = string
    ssl_cert_name     = string
  }))
  default = {
    "react-ssl" = {
      kv_name           = "#{admin_key_vault}#"
      kv_resource_group = "#{admin_resource_group}#"
      ssl_cert_name     = "#{kv_ssl_cert_name}#"
    }
  }
}

variable "web_app_ssl_domains" {
  description = "Custom domain and ssl bindings for the hosted web apps"
  type = map(object({
    ssl_state = string
  }))
  default = {
    "rimaz.dev" = {
      ssl_state = "IpBasedEnabled"
    }
    "www.rimaz.dev" = {
      ssl_state = "SniEnabled"
    }
  }
}

variable "laws" {
  description = "create log analytics workspaces"
  type = map(object({
    retention_days = string
    sku            = string
  }))
  default = {
    "app" = {
      retention_days = "90"
      sku            = "PerGB2018"
    }
  }
}

variable "app_insights" {
  description = "create application insights resources"
  type = map(object({
    retention_days   = string
    application_type = string
  }))
  default = {
    "app" = {
      retention_days   = "90"
      application_type = "web"
    }
  }
}

variable "key_vaults" {
  description = "create key vault resources"
  type = map(object({
    tenant_id = string
    sku       = string
  }))
  default = {
    "app" = {
      tenant_id = "#{tenant_id}#"
      sku       = "standard"
    }
  }
}
