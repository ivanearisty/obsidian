## Intro

Tonight we have successfully deployed our website to our live production domain on www.wavelinkinternet.com. 

The following documents outlines Pre-Deployment checks, our deployment configuration and status, and Post-Deployment checks.

## Post-Deployment Checks
### E2E Checkout

Checkout is successful.

### MongoDB Atlas Cluster

Created Order:
```json
{
  "_id": {
    "$oid": "6865ee6a67911d5d1f8dc1bc"
  },
  "email": "ivanearisty@gmail.com",
  "orderNumber": "WL-1751510634059-xg2b4ywcz",
  "serviceAddress": {
    "street": "75 St James Pl",
    "city": "Brooklyn",
    "state": "NY",
    "zipCode": "11238",
    "fullAddress": "75 St James Pl, Brooklyn, NY 11238, USA"
  },
  "shippingAddress": {
    "isServiceAddress": false
  },
  "contactInfo": {
    "firstName": "Ivan",
    "lastName": "Aristy"
  },
  "items": [
    {
      "productId": "price_1RgYMgFVTTNnlGXmWoUkkwPk",
      "stripePriceId": "price_1RgYMgFVTTNnlGXmWoUkkwPk",
      "name": "WiFi On-the-Go Home",
      "description": "Monthly internet service plan",
      "quantity": 1,
      "unitAmount": 6900,
      "totalAmount": 6900,
      "type": "plan",
      "billingCycle": "monthly"
    },
    {
      "productId": "mifi-pro",
      "stripePriceId": "price_1RgYMZFVTTNnlGXmwBjLplX8",
      "name": "MiFi X Pro",
      "description": "Equipment - Monthly Rental",
      "quantity": 1,
      "unitAmount": 999,
      "totalAmount": 999,
      "type": "equipment",
      "billingCycle": "monthly"
    }
  ],
  "subtotal": 7899,
  "taxes": 0,
  "fees": 0,
  "totalAmount": 7899,
  "currency": "usd",
  "paymentStatus": "succeeded",
  "orderStatus": "processing",
  "waitlistFulfilled": false,
  "createdAt": {
    "$date": "2025-07-01T22:43:54.073Z"
  },
  "updatedAt": {
    "$date": "2025-07-01T22:44:27.704Z"
  },
  "__v": 0,
  "checkoutSessionData": "{\"sessionId\":\"cs_live_b1R9KAIETUEj6LvoTgNOAoUv1Fw5f6BwebEy0wSP2fx2TRMpL9nkQZexcR\",\"paymentStatus\":\"paid\",\"subscriptionId\":\"sub_1Rgd8KFVTTNnlGXmoJdhiODN\",\"customerEmail\":\"ivanearisty@gmail.com\",\"amountTotal\":0,\"currency\":\"usd\",\"created\":1751510634,\"metadata\":{\"customerEmail\":\"ivanearisty@gmail.com\",\"equipmentId\":\"mifi-pro\",\"equipmentPaymentType\":\"rental\",\"internalOrderId\":\"6865ee6a67911d5d1f8dc1bc\",\"orderId\":\"WL-1751510634059-xg2b4ywcz\",\"planName\":\"WiFi On-the-Go Home\",\"serviceAddress\":\"75 St James Pl, Brooklyn, NY 11238, USA\",\"shippingAddress\":\"{\\\"street\\\":\\\"75 Saint James Place\\\",\\\"state\\\":\\\"New York\\\",\\\"zipCode\\\":\\\"11238\\\",\\\"isServiceAddress\\\":true}\"}}",
  "stripeCheckoutSessionId": "cs_live_b1R9KAIETUEj6LvoTgNOAoUv1Fw5f6BwebEy0wSP2fx2TRMpL9nkQZexcR",
  "stripeSubscriptionId": "sub_1Rgd8KFVTTNnlGXmoJdhiODN"
}
```

Created Verification Token at Login:

```json
{"_id":{"$oid":"6865f10f67911d5d1f8dc1c5"},"identifier":"ivanearisty@gmail.com","token":"23477a0e8c2ee0c84cb54f26ccea880fae395359a135ea1b88b040755c849d80","expires":{"$date":{"$numberLong":"1751597711756"}}}
```

User Created after Login:
```json
_id
6865f15867911d5d1f8dc1c6
email
"ivanearisty@gmail.com"
emailVerified
2025-07-03T02:57:23.535+00:00
```