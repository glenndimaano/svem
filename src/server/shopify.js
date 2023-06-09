import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-01";
import { shopifyApp } from '@shopify/shopify-app-express'
import { MongoDBSessionStorage } from '@shopify/shopify-app-session-storage-mongodb';

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const billingConfig = {
    "My Shopify One-Time Charge": {
        // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
        amount: 5.0,
        currencyCode: "USD",
        interval: BillingInterval.OneTime,
    },
};

const shopify = shopifyApp({
    api: {
        apiKey: process.env.SHOPIFY_API_KEY,
        apiSecretKey: process.env.SHOPIFY_SECRET_KEY,
        scopes: ["read_products,write_products"],
        hostName: process.env.SHOPIFY_APP_URL,
        apiVersion: LATEST_API_VERSION,
        restResources,
        billing: undefined, // or replace with billingConfig above to enable example billing
    },
    auth: {
        path: '/api/auth',
        callbackPath: '/api/auth/callback',
    },
    webhooks: {
        path: '/api/webhooks',
    },
    sessionStorage: new MongoDBSessionStorage(
        process.env.MONGO_URL,
        'shopify-vite-express',
    ),

});


export default shopify
