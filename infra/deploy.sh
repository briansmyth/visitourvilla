#!/usr/bin/env bash
# deploy.sh — one-shot infrastructure provisioning for Vista Loop Villa
# Requires: Azure CLI logged in, jq
# Usage: bash infra/deploy.sh

set -euo pipefail

RESOURCE_GROUP="visitourvilla-rg"
LOCATION="eastus"
REPO_URL="https://github.com/YOUR_ORG/visitourvilla"   # ← update this

echo "▶  Creating resource group..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output none

echo "▶  Deploying Bicep template..."
DEPLOY_OUTPUT=$(az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file "$(dirname "$0")/main.bicep" \
  --parameters repositoryUrl="$REPO_URL" \
  --output json)

COSMOS_ENDPOINT=$(echo "$DEPLOY_OUTPUT" | jq -r '.properties.outputs.cosmosEndpoint.value')
SWA_TOKEN=$(echo "$DEPLOY_OUTPUT" | jq -r '.properties.outputs.staticWebAppDeploymentToken.value')
SWA_HOSTNAME=$(echo "$DEPLOY_OUTPUT" | jq -r '.properties.outputs.staticWebAppHostname.value')

# Fetch Cosmos primary key
COSMOS_KEY=$(az cosmosdb keys list \
  --resource-group "$RESOURCE_GROUP" \
  --name "visitourvilla-cosmos" \
  --type keys \
  --query primaryMasterKey -o tsv)

echo ""
echo "✅  Infrastructure deployed."
echo ""
echo "── Next steps ──────────────────────────────────────────────────"
echo ""
echo "1. Add these GitHub repository secrets:"
echo "   AZURE_STATIC_WEB_APPS_API_TOKEN = $SWA_TOKEN"
echo "   COSMOS_ENDPOINT                 = $COSMOS_ENDPOINT"
echo "   COSMOS_KEY                      = $COSMOS_KEY"
echo "   COSMOS_DB                       = visitourvilla"
echo "   RESEND_API_KEY                  = re_YOUR_KEY"
echo "   HOST_EMAIL                      = stay@vistaloopvilla.com"
echo ""
echo "2. Push to main — GitHub Actions will build and deploy."
echo ""
echo "3. Your site will be live at: https://$SWA_HOSTNAME"
