# hubspot-intercom-integtation
This script takes data from hubspot and sends to intercom. It keeps both the services in sync 24x7

The need came when we were using Zaiper to sync data between Hubspot and Intercom. As the business grew, we kept hitting our monthly limit of available zaps.

To tackle this issue, I wrote a simple program which:
1. Monitors the specific properties (for all contacts) for changes in Hubspot.
2. Sends the modified information to a webhook on AWS.
3. The script then parses through the received JSON information and modifies the fields to match the names in Intercom.
4. The scrip then populates the data into the user's account.

This helped us cancel Zapier's subscription and use an in-house script which synced data 24X7.
