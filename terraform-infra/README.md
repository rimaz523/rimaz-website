## My Developer Website's Platform Infrastructure Code

[![Build Status](https://dev.azure.com/rimazmohommed523/Rimaz%20-%20Website/_apis/build/status%2Frimaz523.rimaz-website-infra?branchName=master)](https://dev.azure.com/rimazmohommed523/Rimaz%20-%20Website/_build/latest?definitionId=19&branchName=master)

### Description

This code creates the infrastructure of my dev website using terraform.
Site URL : https://rimaz.dev

### Technologies & Tools used include:

- Terraform v1.7.1
- CI/CD using Azure DevOps


### Prerequisites

- Install [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli). v2.45.0
- Install [Terraform](https://developer.hashicorp.com/terraform/downloads) v1.3.8
- Install Powershell 7

### Running Terraform Locally

- Clone the project locally
- Run `/scripts/set_access_key.ps1` to login to azure cli, select your subscription and then set your access_key to the tfstate backend stored in azure storage.
- Change to the `/terraform` directory.
- Run `terraform init -backend-config="key=dev.terraform.tfstate"`
- Run `terraform plan -out terraform.tfplan --var-file="dev.tfvars"` to see your planned changes
- Run `terraform apply terraform.tfplan` to apply your changes to the cloud environment

### Upgrading to a newer version of Terraform

- Download/Install the latest terraform binary from https://developer.hashicorp.com/terraform/install
- Replace the old binary with the new one (Your Environment variable should point to the binary)
- Note : Alternatively, if you are using Chocolatey, you can upgrade terraform using the following command `choco upgrade terraform`
- Run `terraform -v` to check if newer version is running
- Update the `providers.tf` file in your code and set the latest terraform (and optionally azurem provider) version
- In the terminal change to the `/terraform` directory.
- Run `terraform init -upgrade`
- Run `terraform init -backend-config="key=dev.terraform.tfstate"`
- Run `terraform plan -out terraform.tfplan --var-file="dev.tfvars"` to see your planned changes
- Run `terraform apply terraform.tfplan` to apply your changes to the cloud environment

### Configuring VSCode

- Install the most recent version of VSCode

### Project Wiki :
TODO

### Learn More

You can learn more about terraform by visiting the official documentation [here.](https://developer.hashicorp.com/terraform/docs).


<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >=1.8.0 |
| <a name="requirement_azurerm"></a> [azurerm](#requirement\_azurerm) | >=3.100.0 |

## Providers

No providers.

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_add_resource_group_lock"></a> [add\_resource\_group\_lock](#module\_add\_resource\_group\_lock) | ./modules/management/locks | n/a |
| <a name="module_api_management"></a> [api\_management](#module\_api\_management) | ./modules/integration/api_management | n/a |
| <a name="module_api_management_api"></a> [api\_management\_api](#module\_api\_management\_api) | ./modules/integration/api_management_api | n/a |
| <a name="module_app_insights"></a> [app\_insights](#module\_app\_insights) | ./modules/monitor/application_insights | n/a |
| <a name="module_app_key_vault_rbac"></a> [app\_key\_vault\_rbac](#module\_app\_key\_vault\_rbac) | ./modules/management/role_assignment | n/a |
| <a name="module_app_key_vault_secret"></a> [app\_key\_vault\_secret](#module\_app\_key\_vault\_secret) | ./modules/security/key_vault_secret | n/a |
| <a name="module_availability_alerts"></a> [availability\_alerts](#module\_availability\_alerts) | ./modules/monitor/alert_rule | n/a |
| <a name="module_availability_tests"></a> [availability\_tests](#module\_availability\_tests) | ./modules/monitor/standard_web_test | n/a |
| <a name="module_azure_cdns"></a> [azure\_cdns](#module\_azure\_cdns) | ./modules/networking/cdn | n/a |
| <a name="module_get_kv_secret"></a> [get\_kv\_secret](#module\_get\_kv\_secret) | ./modules/security/get_key_vault_secret | n/a |
| <a name="module_get_ssl_certificate"></a> [get\_ssl\_certificate](#module\_get\_ssl\_certificate) | ./modules/security/key_vault_certificate | n/a |
| <a name="module_key_vault"></a> [key\_vault](#module\_key\_vault) | ./modules/security/key_vault | n/a |
| <a name="module_linux_web_app"></a> [linux\_web\_app](#module\_linux\_web\_app) | ./modules/compute/linux_web_app | n/a |
| <a name="module_log_analytics"></a> [log\_analytics](#module\_log\_analytics) | ./modules/monitor/log_analytics_workspace | n/a |
| <a name="module_logic_app"></a> [logic\_app](#module\_logic\_app) | ./modules/compute/logic_app | n/a |
| <a name="module_resource_group"></a> [resource\_group](#module\_resource\_group) | ./modules/core/resource_group | n/a |
| <a name="module_service_plan"></a> [service\_plan](#module\_service\_plan) | ./modules/compute/service_plan | n/a |
| <a name="module_sql_server"></a> [sql\_server](#module\_sql\_server) | ./modules/storage/sql | n/a |
| <a name="module_storage_account"></a> [storage\_account](#module\_storage\_account) | ./modules/storage/storage_account | n/a |
| <a name="module_web_app_ssl_custom_domain"></a> [web\_app\_ssl\_custom\_domain](#module\_web\_app\_ssl\_custom\_domain) | ./modules/compute/app_service_custom_hostname_binding | n/a |

## Resources

No resources.

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_add_rg_locks"></a> [add\_rg\_locks](#input\_add\_rg\_locks) | creates resource locks to prevent accidental modification or deletion of resource groups | <pre>map(object({<br>    lock_level = string<br>    reason     = string<br>  }))</pre> | <pre>{<br>  "data": {<br>    "lock_level": "CanNotDelete",<br>    "reason": "Prevent accidental deletion of data"<br>  }<br>}</pre> | no |
| <a name="input_apims"></a> [apims](#input\_apims) | create APIMs | <pre>map(object({<br>    company = string<br>    email   = string<br>    sku     = string<br>  }))</pre> | <pre>{<br>  "backend": {<br>    "company": "#{company_name}#",<br>    "email": "#{company_email}#",<br>    "sku": "#{apim_sku}#"<br>  }<br>}</pre> | no |
| <a name="input_apis"></a> [apis](#input\_apis) | create APIs | <pre>map(object({<br>    api_revision                            = string<br>    path                                    = string<br>    service_url                             = string<br>    azure_storage_container_url_for_swagger = string<br>    swagger_file_name                       = string<br>    swagger_format                          = string<br>    whitelist_localhost_domain              = string<br>    whitelist_frontend_webapp_domain        = string<br>    whitelist_frontend_webapp_domain_www    = string<br>  }))</pre> | <pre>{<br>  "Backend": {<br>    "api_revision": "v1",<br>    "azure_storage_container_url_for_swagger": "#{az_storage_container_url_for_swagger}#",<br>    "path": "v1",<br>    "service_url": "#{api_domain_url}#",<br>    "swagger_file_name": "swagger.json",<br>    "swagger_format": "openapi+json-link",<br>    "whitelist_frontend_webapp_domain": "#{apim_policy_whitelist_frontend_webapp_domain}#",<br>    "whitelist_frontend_webapp_domain_www": "#{apim_policy_whitelist_frontend_webapp_domain_www}#",<br>    "whitelist_localhost_domain": "http://localhost:3000/"<br>  }<br>}</pre> | no |
| <a name="input_app_insights"></a> [app\_insights](#input\_app\_insights) | create application insights resources | <pre>map(object({<br>    retention_days   = string<br>    application_type = string<br>  }))</pre> | <pre>{<br>  "app": {<br>    "application_type": "web",<br>    "retention_days": "90"<br>  }<br>}</pre> | no |
| <a name="input_app_insights_alerts"></a> [app\_insights\_alerts](#input\_app\_insights\_alerts) | applicatoin insights alerts | <pre>map(object({<br>    action_group_name = string<br>    email_receivers = map(object({<br>      email                   = string<br>      use_common_alert_schema = bool<br>    }))<br>    push_notification_receivers = map(object({<br>      email = string<br>    }))<br>    alerts = map(object({<br>      description            = string<br>      frequency              = string<br>      window_size            = string<br>      severity               = number<br>      metric_namespace       = string<br>      metric_name            = string<br>      aggregation            = string<br>      operator               = string<br>      threshold              = number<br>      skip_metric_validation = bool<br>    }))<br>  }))</pre> | <pre>{<br>  "rmz-site-grp": {<br>    "action_group_name": "Rimaz Website Monitor Action Group",<br>    "alerts": {<br>      "Rimaz Blog Website Availability": {<br>        "aggregation": "Average",<br>        "description": "Alert will be triggered when Availability is less than 100%.",<br>        "frequency": "PT15M",<br>        "metric_name": "availabilityResults/availabilityPercentage",<br>        "metric_namespace": "microsoft.insights/components",<br>        "operator": "LessThan",<br>        "severity": 0,<br>        "skip_metric_validation": false,<br>        "threshold": 100,<br>        "window_size": "PT15M"<br>      }<br>    },<br>    "email_receivers": {<br>      "alert-developer": {<br>        "email": "#{company_email}#",<br>        "use_common_alert_schema": true<br>      }<br>    },<br>    "push_notification_receivers": {<br>      "push-to-developer-app": {<br>        "email": "#{company_email}#"<br>      }<br>    }<br>  }<br>}</pre> | no |
| <a name="input_app_key_vault_rbac"></a> [app\_key\_vault\_rbac](#input\_app\_key\_vault\_rbac) | RBAC role assignments for app key vault | <pre>map(object({<br>    roles                            = list(string)<br>    principal_id                     = string<br>    skip_service_principal_aad_check = bool<br>    is_managed_identity              = bool<br>    mi_key                           = string<br>  }))</pre> | <pre>{<br>  "app_kv_rmz_principal": {<br>    "is_managed_identity": false,<br>    "mi_key": "",<br>    "principal_id": "#{devops_service_principal_id}#",<br>    "roles": [<br>      "Owner",<br>      "Key Vault Secrets Officer"<br>    ],<br>    "skip_service_principal_aad_check": false<br>  },<br>  "app_kv_usr_rimaz": {<br>    "is_managed_identity": false,<br>    "mi_key": "",<br>    "principal_id": "#{local_user_id}#",<br>    "roles": [<br>      "Owner",<br>      "Key Vault Secrets Officer"<br>    ],<br>    "skip_service_principal_aad_check": false<br>  },<br>  "app_kv_web_app_sami_api": {<br>    "is_managed_identity": true,<br>    "mi_key": "api",<br>    "principal_id": "",<br>    "roles": [<br>      "Reader",<br>      "Key Vault Secrets Officer"<br>    ],<br>    "skip_service_principal_aad_check": false<br>  },<br>  "app_kv_web_app_sami_react": {<br>    "is_managed_identity": true,<br>    "mi_key": "react",<br>    "principal_id": "",<br>    "roles": [<br>      "Reader",<br>      "Key Vault Secrets Officer"<br>    ],<br>    "skip_service_principal_aad_check": false<br>  }<br>}</pre> | no |
| <a name="input_app_key_vault_secrets"></a> [app\_key\_vault\_secrets](#input\_app\_key\_vault\_secrets) | create key vault resources | <pre>map(object({<br>    secret = string<br>  }))</pre> | <pre>{<br>  "application-insights-conn-string": {<br>    "secret": "connection_string"<br>  },<br>  "application-insights-key": {<br>    "secret": "instrumentation_key"<br>  }<br>}</pre> | no |
| <a name="input_cdns"></a> [cdns](#input\_cdns) | creates an azure cdn | <pre>map(object({<br>    sku           = string<br>    location      = string<br>    endpoint      = string<br>    hostname      = string<br>    custom_domain = string<br>  }))</pre> | <pre>{<br>  "app": {<br>    "custom_domain": "cdn.rimaz.dev",<br>    "endpoint": "blob",<br>    "hostname": "rimazdevappstore.blob.core.windows.net",<br>    "location": "global",<br>    "sku": "Standard_Microsoft"<br>  }<br>}</pre> | no |
| <a name="input_environment"></a> [environment](#input\_environment) | The deployed environment. | `string` | `"#{environment}#"` | no |
| <a name="input_key_vault_secrets"></a> [key\_vault\_secrets](#input\_key\_vault\_secrets) | get secrets from the key vault | <pre>map(object({<br>    kv_name           = string<br>    kv_resource_group = string<br>  }))</pre> | <pre>{<br>  "sql-app-db-server-admin-login-name": {<br>    "kv_name": "#{app_key_vault}#",<br>    "kv_resource_group": "#{data_resource_group}#"<br>  },<br>  "sql-app-db-server-admin-login-password": {<br>    "kv_name": "#{app_key_vault}#",<br>    "kv_resource_group": "#{data_resource_group}#"<br>  }<br>}</pre> | no |
| <a name="input_key_vaults"></a> [key\_vaults](#input\_key\_vaults) | create key vault resources | <pre>map(object({<br>    tenant_id = string<br>    sku       = string<br>  }))</pre> | <pre>{<br>  "app": {<br>    "sku": "standard",<br>    "tenant_id": "#{tenant_id}#"<br>  }<br>}</pre> | no |
| <a name="input_laws"></a> [laws](#input\_laws) | create log analytics workspaces | <pre>map(object({<br>    retention_days = string<br>    sku            = string<br>  }))</pre> | <pre>{<br>  "app": {<br>    "retention_days": "90",<br>    "sku": "PerGB2018"<br>  }<br>}</pre> | no |
| <a name="input_linux_webapps"></a> [linux\_webapps](#input\_linux\_webapps) | create linux web apps for deploying the marketplace api and frontends | <pre>map(object({<br>    stack         = string<br>    stack_version = string<br>  }))</pre> | <pre>{<br>  "api": {<br>    "stack": "dotnet",<br>    "stack_version": "8.0"<br>  },<br>  "react": {<br>    "stack": "node",<br>    "stack_version": "18-lts"<br>  }<br>}</pre> | no |
| <a name="input_logic_apps"></a> [logic\_apps](#input\_logic\_apps) | create logic apps | <pre>map(object({<br>    deployment_mode = string<br>    connection_name = string<br>  }))</pre> | <pre>{<br>  "send-email": {<br>    "connection_name": "gmail",<br>    "deployment_mode": "Incremental"<br>  }<br>}</pre> | no |
| <a name="input_project"></a> [project](#input\_project) | Name of the project. | `string` | `"#{project}#"` | no |
| <a name="input_resource_groups"></a> [resource\_groups](#input\_resource\_groups) | create resource groups in the project's environment | <pre>map(object({<br>    location = string<br>  }))</pre> | <pre>{<br>  "app": {<br>    "location": "#{resource_group_location}#"<br>  },<br>  "common": {<br>    "location": "#{resource_group_location}#"<br>  },<br>  "data": {<br>    "location": "#{resource_group_location}#"<br>  }<br>}</pre> | no |
| <a name="input_service_plans"></a> [service\_plans](#input\_service\_plans) | create app service plans | <pre>map(object({<br>    sku = string<br>    os  = string<br>  }))</pre> | <pre>{<br>  "asp": {<br>    "os": "#{app_service_os}#",<br>    "sku": "#{app_service_sku}#"<br>  }<br>}</pre> | no |
| <a name="input_sql_servers"></a> [sql\_servers](#input\_sql\_servers) | create SQL servers | <pre>map(object({<br>    sku                      = string<br>    ms_entra_login_username  = string<br>    ms_entra_login_object_id = string<br>  }))</pre> | <pre>{<br>  "app": {<br>    "ms_entra_login_object_id": "3207c7da-5eed-46eb-abd3-1deb49b95e1e",<br>    "ms_entra_login_username": "rimazmohommed523_gmail.com#EXT#@rimazmohommed523gmail.onmicrosoft.com",<br>    "sku": "Basic"<br>  }<br>}</pre> | no |
| <a name="input_ssl_certificates"></a> [ssl\_certificates](#input\_ssl\_certificates) | get ssl certificates for the hosted web apps | <pre>map(object({<br>    kv_name           = string<br>    kv_resource_group = string<br>    ssl_cert_name     = string<br>  }))</pre> | <pre>{<br>  "rimaz-ssl": {<br>    "kv_name": "#{admin_key_vault}#",<br>    "kv_resource_group": "#{admin_resource_group}#",<br>    "ssl_cert_name": "#{kv_ssl_cert_name}#"<br>  }<br>}</pre> | no |
| <a name="input_storage_accounts"></a> [storage\_accounts](#input\_storage\_accounts) | create storage account resources | <pre>map(object({<br>    replication_type = string<br>    sku              = string<br>  }))</pre> | <pre>{<br>  "app": {<br>    "replication_type": "LRS",<br>    "sku": "Standard"<br>  }<br>}</pre> | no |
| <a name="input_subscription_id"></a> [subscription\_id](#input\_subscription\_id) | The azure subscription id. | `string` | `"#{subscription_id}#"` | no |
| <a name="input_web_app_ssl_domains"></a> [web\_app\_ssl\_domains](#input\_web\_app\_ssl\_domains) | Custom domain and ssl bindings for the hosted web apps | <pre>map(object({<br>    web_app_key = string<br>    ssl_state   = string<br>  }))</pre> | <pre>{<br>  "api.rimaz.dev": {<br>    "ssl_state": "SniEnabled",<br>    "web_app_key": "api"<br>  },<br>  "rimaz.dev": {<br>    "ssl_state": "IpBasedEnabled",<br>    "web_app_key": "react"<br>  },<br>  "www.rimaz.dev": {<br>    "ssl_state": "SniEnabled",<br>    "web_app_key": "react"<br>  }<br>}</pre> | no |
| <a name="input_web_tests"></a> [web\_tests](#input\_web\_tests) | create application insights availability tests | <pre>map(object({<br>    url           = string<br>    geo_locations = list(string)<br>    frequency     = number<br>    timeout       = number<br>  }))</pre> | <pre>{<br>  "api_health": {<br>    "frequency": 900,<br>    "geo_locations": [<br>      "emea-au-syd-edge"<br>    ],<br>    "timeout": 120,<br>    "url": "#{standard_web_test_api_health_url}#"<br>  },<br>  "blog_home_page": {<br>    "frequency": 900,<br>    "geo_locations": [<br>      "emea-au-syd-edge"<br>    ],<br>    "timeout": 120,<br>    "url": "#{standard_web_test_blog_url}#"<br>  },<br>  "site_cdn": {<br>    "frequency": 900,<br>    "geo_locations": [<br>      "emea-au-syd-edge"<br>    ],<br>    "timeout": 120,<br>    "url": "#{standard_web_test_cdn_hero_url}#"<br>  }<br>}</pre> | no |

## Outputs

No outputs.
<!-- END_TF_DOCS -->