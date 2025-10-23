## My Developer Website's Integrations Web API

[![Build Status](https://dev.azure.com/rimazmohommed523/Rimaz%20-%20Website/_apis/build/status%2Frimaz523.rimaz-website-api?branchName=master)](https://dev.azure.com/rimazmohommed523/Rimaz%20-%20Website/_build/latest?definitionId=21&branchName=master)

### Description

This code implements the web api used by my blog site using dotnet core.
Site URL : https://rimaz.dev

### Technologies & Tools used include:

- .Net Core 8.0


### Developer Notes

#### Running EF Core DB Migration and Update Scripts

##### - Adding a new Database Migration
To create a new database migration :
    1. Move to dir <root>/src/scripts/efcore
    2. Run `./add-database-migration.ps1 <name_of_migration>`

##### - Updating the database
To update your database with the latest migrations :
    1. Move to dir <root>/src/scripts/efcore
    2. Run `./run-database-update.ps1`


### Learn More

You can learn more about terraform by visiting the official documentation [here](https://developer.hashicorp.com/terraform/docs).