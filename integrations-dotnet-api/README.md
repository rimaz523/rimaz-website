# My Developer Website's Integrations Web API

## Description

This code implements the web api used by my blog site using dotnet core.
Site URL : https://rimaz.dev.

## Technologies & Tools used include:

- .Net Core 8.0


## Developer Notes

### Running EF Core DB Migration and Update Scripts

#### - Adding a new Database Migration
To create a new database migration :
    1. Move to dir <root>/src/scripts/efcore
    2. Run `./add-database-migration.ps1 <name_of_migration>`

#### - Updating the database
To update your database with the latest migrations :
    1. Move to dir <root>/src/scripts/efcore
    2. Run `./run-database-update.ps1`


## Project Wiki :
TODO

## Learn More

You can learn more about terraform by visiting the official documentation [here.](https://developer.hashicorp.com/terraform/docs).