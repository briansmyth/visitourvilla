// Azure infrastructure for Vista Loop Villa
// Deploys: Cosmos DB (serverless) + Static Web App
// Deploy with: az deployment group create --resource-group visitourvilla-rg --template-file infra/main.bicep

@description('The name prefix for all resources')
param prefix string = 'visitourvilla'

@description('Azure region for all resources')
param location string = resourceGroup().location

@description('The branch to deploy from GitHub')
param repositoryBranch string = 'main'

@description('Your GitHub repo URL e.g. https://github.com/YourOrg/visitourvilla')
param repositoryUrl string

// ── Cosmos DB account (serverless) ──────────────────────────────────────────
resource cosmosAccount 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: '${prefix}-cosmos'
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    capabilities: [
      { name: 'EnableServerless' }
    ]
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        locationName: location
        failoverPriority: 0
        isZoneRedundant: false
      }
    ]
    enableFreeTier: false
    backupPolicy: {
      type: 'Periodic'
      periodicModeProperties: {
        backupIntervalInMinutes: 240
        backupRetentionIntervalInHours: 8
        backupStorageRedundancy: 'Geo'
      }
    }
  }
}

// Cosmos database
resource cosmosDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2023-04-15' = {
  parent: cosmosAccount
  name: prefix
  properties: {
    resource: { id: prefix }
  }
}

// bookings container
resource bookingsContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: cosmosDatabase
  name: 'bookings'
  properties: {
    resource: {
      id: 'bookings'
      partitionKey: {
        paths: ['/status']
        kind: 'Hash'
      }
      indexingPolicy: {
        automatic: true
        indexingMode: 'consistent'
      }
    }
  }
}

// messages container
resource messagesContainer 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2023-04-15' = {
  parent: cosmosDatabase
  name: 'messages'
  properties: {
    resource: {
      id: 'messages'
      partitionKey: {
        paths: ['/email']
        kind: 'Hash'
      }
      indexingPolicy: {
        automatic: true
        indexingMode: 'consistent'
      }
    }
  }
}

// ── Azure Static Web App ─────────────────────────────────────────────────────
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: '${prefix}-swa'
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {
    repositoryUrl: repositoryUrl
    branch: repositoryBranch
    buildProperties: {
      appLocation: '/'
      apiLocation: ''
      outputLocation: '.next'
      appBuildCommand: 'npm run build'
    }
  }
}

// ── Outputs ──────────────────────────────────────────────────────────────────
output cosmosEndpoint string = cosmosAccount.properties.documentEndpoint
output staticWebAppHostname string = staticWebApp.properties.defaultHostname
output staticWebAppDeploymentToken string = staticWebApp.listSecrets().properties.apiKey
