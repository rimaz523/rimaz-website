project     = "Rimaz"
environment = "dev"

resource_groups = {
  "app" = {
    location = "australiaeast"
  }
}

service_plans = {
  "asp" = {
    sku = "B1"
    os  = "Linux"
  }
}
