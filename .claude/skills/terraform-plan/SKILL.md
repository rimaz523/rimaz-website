---
name: terraform-plan
description: Run a Terraform plan/apply for the Azure infrastructure in terraform-infra, including the required Azure auth and backend setup. Use when changing or deploying cloud infrastructure.
---

# Terraform workflow for terraform-infra

Infrastructure is Terraform on Azure, pinned to **v1.9.8**, with remote state in an Azure storage backend. The root config in `terraform/` is split one `.tf` file per Azure resource and composed by `main.tf`; reusable modules live in `terraform/modules/` grouped by concern (`compute`, `core`, `integration`, `management`, `monitor`, `networking`, `security`, `storage`).

## Setup (run once per session)

From `terraform-infra/`, authenticate to Azure and set the tfstate backend access key:

```powershell
./scripts/set_access_key.ps1
```

This logs into the Azure CLI, prompts for the subscription, and exports the storage access key needed by the backend.

## Plan & apply

From the `terraform-infra/terraform/` directory:

```powershell
terraform init -backend-config="key=dev.terraform.tfstate"
terraform plan -out terraform.tfplan --var-file="dev.tfvars"
terraform apply terraform.tfplan
```

Always `plan -out` to a file and `apply` that exact plan file — never `apply` without a saved plan. Show the plan output and get confirmation before applying, since this mutates live cloud infrastructure.

## Guidelines

- Put new resources in their own `<resource>.tf` file at the `terraform/` root (matching the existing naming, e.g. `cosmosdb.tf`, `key_vault.tf`); reusable/parameterized logic goes in a `modules/<concern>/` module.
- Never commit secrets or `.tfvars` values containing credentials; secrets flow through Key Vault (`key_vault.tf`, `app_key_vault_secret.tf`).
- Frontends sit behind Cloudflare + API Management — changes to ingress, SCM access, or IP allowlists touch `api_management*.tf`, `linux_web_app.tf`, and `web_app_ssl_custom_domain.tf`; review recent commits before altering access rules.
- Helper scripts in `scripts/` cover common one-offs: `destroy_apim_api.ps1`, `whitelist_ip_in_azure_store.ps1`.
