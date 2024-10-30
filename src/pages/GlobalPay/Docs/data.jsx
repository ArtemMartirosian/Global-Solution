import {useTranslation} from "react-i18next";

export function urls(){
    const UrlArray = [
        {"id":0, "url":"getCardInfo"},
        {"id":1, "url":"createCardToken"},
        {"id":2, "url":"deleteCard"},
        {"id":3, "url":"acceptionCard"},
        {"id":5, "url":"getServiceByToken"},
        {"id":6, "url":"getServiceByTokenId"},
        {"id":7, "url":"createPaymentSample"},
        {"id":8, "url":"infoPaymentSample"},
        {"id":9, "url":"addCardToken"},
        {"id":11, "url":"StatusPayment"},
        {"id":15, "url":"revertPartTransactions"},
    ]
    return UrlArray
}

export function Data (){
    const {t} = useTranslation()
    const data = 
        [
//  =====  getCardInfo  =====  // (1)
         {"title" : t(`docs.title1`),
          "requestType" : "POST",
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/cards/v1/card/token",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"cardToken", "type":"cardToken String (query)"}, t('docs.table1.1')],
                  [{"functionName":"Запрос", "type":"body"}, {"desc1":"", "code1":
                          `{ 
 "ids": ["string"]
}`}]],
              //=====TABLE-2=====//
              [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`[
  { "token": "string",
    "cardNumber": "string",
    "balance": 0,
    "expiryDate": "string",
    "externalToken": "string",
    "smsNotificationNumber": "string",
    "type": "UZCARD",
    "holderFullName": "string",
    "externalStatus": "string",
    "bankName": "string"  
  }
]`
                        }
                ],
                [{"errorCode":"401"}, "Unathorized"],
                [{"errorCode":"403"}, "Forbidden"],
                [{"errorCode":"404"}, "Not found"]]],
         },


//  =====  createCardToken  =====  // (2)
         {"title" : t(`docs.title2`),
          "requestType" : "POST", 
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/cards/v1/card",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"cardDTO", "type":"(body)"}, {
                  "desc1": t('docs.table2.1')+`\n smsNotificationNumber - optional`,
                  "code1":
                      `{  
    "cardNumber": "string",
    "expiryDate": "string",
    "smsNotificationNumber": "string"
}`,
                  "desc2": t('docs.table2.2'),
                  "code2":
                      `{  "cardToken": "string",
    "smsNotificationNumber": "string"
}`
              }
              ]],
                //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{  "cardToken": "string",
    "smsNotificationNumber": "string"
}`
            }],
            [{"errorCode":"200"}, "Created"],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====  deleteCard  =====  // (3)
         {"title" : t(`docs.title3`),
          "requestType" : "DELETE", 
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/cards/v1/card/{cardToken}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"cardToken", "type":"String (query)"}, t('docs.table2.1')]],
              //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "body": {},
    "statusCode": "100 CONTINUE",
    "statusCodeValue": 0
  }`
            }],
           [{"errorCode":"200"}, "Created"],
           [{"errorCode":"401"}, "Unathorized"],
           [{"errorCode":"403"}, "Forbidden"]]],
         },


//  =====  acceptionCard  =====  // (4)
         {"title" : t(`docs.title4`),
          "requestType" : "POST", 
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/cards/v1/card/confirm/{cardToken}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"confirmationDTO", "type":"(body)"}, {
                  "desc1": t('docs.table2.1'),
                  "code1":
`{
    "code": "string" 
}`
                }], 
                //=====TABLE-2=====//
               ],
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "token": "string",
    "cardNumber": "string",
    "balance": 0,
    "expiryDate": "string",
    "externalToken": "string",
    "smsNotificationNumber": "string",
    "type": "UZCARD",
    "holderFullName": "string",
    "externalStatus": "string",
    "bankName": "string"  
}`
            }],
            [{"errorCode":"200"}, "Created"],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====  sendPassword  =====  // (5)
         {"title" : t(`docs.title5`),
          "requestType" : "POST", 
          "requestUrl" : "/v1/gp-follower/cards/{id}/resend-code",
          "tables" : [
              [[{"functionName":"id", "type":"String (path)"}, t('docs.table5.1')
                ]
            ],
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "card_token": "string"
}`
            }],
            [{"errorCode":"201"}, "Created"],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====  getServiceByToken  =====  // (6)
         {"title" : t(`docs.title6`),
          "requestType" : "GET", 
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/merchants/v1/services/{provider_id}/provider",
          "tables" : [
                //=====TABLE-1=====//
              [[{"functionName":"provider_id", "type":"Integer($int64)"}, t('docs.table6.1')]],
                //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "id": 0,
    "legalName": "string",
    "name": "string",
    "minAmount": 0,
    "maxAmount": 0,
    "comission": 0,
    "fixedPrice": 0,
    "enabled": true,
    "paymentInstrumentId": 0,
    "paymentInstrument": "PAYNET",
    "uzcardMerchantId": "string",
    "uzcardTerminalId": "string",
    "humoMerchantId": "string",
    "humoTerminalId": "string",
    "url": "string",
    "responseFields": [
      {
        "id": 0,
        "fieldName": "string",
        "labelRu": "string",
        "labelUz": "string",
        "order": 0,
        "service": "string"
      }
    ],
    "requestFields": [
      {
        "id": 0,
        "instrumentId": 0,
        "order": 0,
        "name": "string",
        "titleRu": "string",
        "titleUz": "string",
        "required": true,
        "readOnly": true,
        "fieldType": "string",
        "isCustomerId": "string",
        "fieldControl": "string",
        "fieldValues": [
          {
            "id": 0,
            "instrumentId": 0,
            "titleRu": "string",
            "titleUz": "string",
            "requestedField": "string"
          }
        ],
        "service": "string"
      }
    ],
    "provider": {
      "id": 0,
      "legalName": "string",
      "name": "string",
      "enabled": true,
      "addressRegistry": "string",
      "inn": "string",
      "paymentInstrument": "PAYNET",
      "paymentInstrumentId": 0,
      "services": [
        "string"
      ]
    }
  }`
            }],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====  getServiceByTokenId  =====  // (7)
         {"title" : t(`docs.title7`),
          "requestType" : "GET", 
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/merchants/v1/services/{id}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"id", "type":"Integer($int32) (path)"}, t('docs.table7.1')]],
              //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
  "id": 0,
  "legalName": "string",
  "name": "string",
  "minAmount": 0,
  "maxAmount": 0,
  "comission": 0,
  "fixedPrice": 0,
  "enabled": true,
  "paymentInstrumentId": 0,
  "paymentInstrument": "PAYNET",
  "uzcardMerchantId": "string",
  "uzcardTerminalId": "string",
  "humoMerchantId": "string",
  "humoTerminalId": "string",
  "url": "string",
  "responseFields": [
    {
      "id": 0,
      "fieldName": "string",
      "labelRu": "string",
      "labelUz": "string",
      "order": 0,
      "service": "string"
    }
  ],
  "requestFields": [
    {
      "id": 0,
      "instrumentId": 0,
      "order": 0,
      "name": "string",
      "titleRu": "string",
      "titleUz": "string",
      "required": true,
      "readOnly": true,
      "fieldType": "string",
      "isCustomerId": "string",
      "fieldControl": "string",
      "fieldValues": [
        {
          "id": 0,
          "instrumentId": 0,
          "titleRu": "string",
          "titleUz": "string",
          "requestedField": "string"
        }
      ],
      "service": "string"
    }
  ],
  "provider": {
    "id": 0,
    "legalName": "string",
    "name": "string",
    "enabled": true,
    "addressRegistry": "string",
    "inn": "string",
    "paymentInstrument": "PAYNET",
    "paymentInstrumentId": 0,
    "services": [
      "string"
       ]
    }
  }`
            }],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====  createPaymentSample  =====  // (8)
         {"title" : t(`docs.title8`),
          "requestType" : "POST", 
          "requestUrl" : " https://gateway-api-dev.globalpay.uz/payments/v1/payment/init",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"followerCreateRequestDTO", "type":"(body)"}, {
                  "desc1":t('docs.table8.1'), 
                  "code1":
`{
  "externalId": "string",
  "serviceId": 0,
  "paymentFields": [
    {
      "requestFieldId": 0,
      "value": "string",
      "name": "string"
    }
  ]
}`
                          }]],
                //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "id": "string",
    "service": {
    "id": 0,
    "legalName": "string",
    "name": "string",
    "minAmount": 0,
    "maxAmount": 0,
    "comission": 0,
    "fixedPrice": 0,
    "enabled": true,
    "paymentInstrumentId": 0,
    "paymentInstrument": "PAYNET",
    "uzcardMerchantId": "string",
    "uzcardTerminalId": "string",
    "humoMerchantId": "string",
    "humoTerminalId": "string",
    "url": "string",
    "responseFields": [
      {
        "id": 0,
        "fieldName": "string",
        "labelRu": "string",
        "labelUz": "string",
        "order": 0
      }
    ],
    "requestFields": [
      {
        "id": 0,
        "paymentInstrumentId": 0,
        "paymentInstrument": "PAYNET",
        "order": 0,
        "name": "string",
        "titleRu": "string",
        "titleUz": "string",
        "required": true,
        "readOnly": true,
        "fieldType": "string",
        "isCustomerId": "string",
        "fieldControl": "string",
        "fieldValues": [
          {
            "id": 0,
            "paymentInstrumentId": 0,
            "paymentInstrument": "PAYNET",
            "titleRu": "string",
            "titleUz": "string"
          }
        ]
      }
    ],
    "provider": {
      "id": 0,
      "legalName": "string",
      "name": "string",
      "enabled": true,
      "addressRegistry": "string",
      "inn": "string",
      "paymentInstrument": "PAYNET",
      "paymentInstrumentId": 0
    },
    "info": true
  },
  "customer": {
    "id": 0,
    "name": "string",
    "merchantId": 0
  },
  "createdAt": "2022-12-16T10:45:13.481Z",
  "approvedAt": "2022-12-16T10:45:13.481Z",
  "revertAt": "2022-12-16T10:45:13.481Z",
  "cardToken": "string",
  "externalId": "string",
  "processingId": "string",
  "status": "INIT",
  "amount": 0,
  "processingType": "UZCARD",
  "paymentFields": [
    {
      "id": 0,
      "requestFieldId": 0,
      "value": "string",
      "name": "string"
    }
  ]
}`
            }],
            [{"errorCode":"200"}, "Created"],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====   infoPaymentSample  =====  // (9)
         {"title" : t(`docs.title9`),
          "requestType" : "GET", 
          "requestUrl" : " https://gateway-api-dev.globalpay.uz/payments/v1/payment/{id}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"id", "type":"String($uuid)"}, t('docs.table9.1')]],
              //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "id": "string",
    "service": {
    "id": 0,
    "legalName": "string",
    "name": "string",
    "minAmount": 0,
    "maxAmount": 0,
    "comission": 0,
    "fixedPrice": 0,
    "enabled": true,
    "paymentInstrumentId": 0,
    "paymentInstrument": "PAYNET",
    "uzcardMerchantId": "string",
    "uzcardTerminalId": "string",
    "humoMerchantId": "string",
    "humoTerminalId": "string",
    "url": "string",
    "responseFields": [
      {
        "id": 0,
        "fieldName": "string",
        "labelRu": "string",
        "labelUz": "string",
        "order": 0
      }
    ],
    "requestFields": [
      {
        "id": 0,
        "paymentInstrumentId": 0,
        "paymentInstrument": "PAYNET",
        "order": 0,
        "name": "string",
        "titleRu": "string",
        "titleUz": "string",
        "required": true,
        "readOnly": true,
        "fieldType": "string",
        "isCustomerId": "string",
        "fieldControl": "string",
        "fieldValues": [
          {
            "id": 0,
            "paymentInstrumentId": 0,
            "paymentInstrument": "PAYNET",
            "titleRu": "string",
            "titleUz": "string"
          }
        ]
      }
    ],
    "provider": {
      "id": 0,
      "legalName": "string",
      "name": "string",
      "enabled": true,
      "addressRegistry": "string",
      "inn": "string",
      "paymentInstrument": "PAYNET",
      "paymentInstrumentId": 0
    },
    "info": true
    },
   "customer": {
    "id": 0,
    "name": "string",
    "merchantId": 0
   },
  "createdAt": "2022-12-16T10:49:32.517Z",
  "approvedAt": "2022-12-16T10:49:32.517Z",
  "revertAt": "2022-12-16T10:49:32.517Z",
  "cardToken": "string",
  "externalId": "string",
  "processingId": "string",
  "status": "INIT",
  "amount": 0,
  "processingType": "UZCARD",
  "paymentFields": [
    {
      "id": 0,
      "requestFieldId": 0,
      "value": "string",
      "name": "string"
    }
  ]
 }`
            }],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====   addCardToken  =====  // (10)
         {"title" : t(`docs.title10`),
          "requestType" : "POST", 
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/payments/v1/payment/perform",
          "tables" : [
              //=====TABLE-1=====//
              [
              //=====TABLE-2=====//
               [{"functionName":"followerPerformRequestDTO", "type":"(body)"}, {
                   "desc1":"",
                   "code1":
`{ 
    "externalId": "string",
    "id": "string",
    "cardToken": "string"
}`
                           }
                        ] 
            ],
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "id": "string",
    "service": {
    "id": 0,
    "legalName": "string",
    "name": "string",
    "minAmount": 0,
    "maxAmount": 0,
    "comission": 0,
    "fixedPrice": 0,
    "enabled": true,
    "paymentInstrumentId": 0,
    "paymentInstrument": "PAYNET",
    "uzcardMerchantId": "string",
    "uzcardTerminalId": "string",
    "humoMerchantId": "string",
    "humoTerminalId": "string",
    "url": "string",
    "responseFields": [
      {
        "id": 0,
        "fieldName": "string",
        "labelRu": "string",
        "labelUz": "string",
        "order": 0
      }
    ],
    "requestFields": [
      {
        "id": 0,
        "paymentInstrumentId": 0,
        "paymentInstrument": "PAYNET",
        "order": 0,
        "name": "string",
        "titleRu": "string",
        "titleUz": "string",
        "required": true,
        "readOnly": true,
        "fieldType": "string",
        "isCustomerId": "string",
        "fieldControl": "string",
        "fieldValues": [
          {
            "id": 0,
            "paymentInstrumentId": 0,
            "paymentInstrument": "PAYNET",
            "titleRu": "string",
            "titleUz": "string"
          }
        ]
      }
    ],
    "provider": {
      "id": 0,
      "legalName": "string",
      "name": "string",
      "enabled": true,
      "addressRegistry": "string",
      "inn": "string",
      "paymentInstrument": "PAYNET",
      "paymentInstrumentId": 0
    },
    "info": true
  },
  "customer": {
    "id": 0,
    "name": "string",
    "merchantId": 0
  },
  "createdAt": "2022-12-16T10:52:19.149Z",
  "approvedAt": "2022-12-16T10:52:19.149Z",
  "revertAt": "2022-12-16T10:52:19.149Z",
  "cardToken": "string",
  "externalId": "string",
  "processingId": "string",
  "status": "INIT",
  "amount": 0,
  "processingType": "UZCARD",
  "paymentFields": [
    {
      "id": 0,
      "requestFieldId": 0,
      "value": "string",
      "name": "string"
    }
  ]
  }`
            }],
            [{"errorCode":"200"}, "Created"],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====   cancellationPayment  =====  // (11)
         {"title" : t(`docs.title11`),
          "requestType" : "POST",
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/payments/v1/payment/revert/{id}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"id", "type":"string($uuid)"}, t('docs.table9.1')],
                  [{"functionName":"Ext", "type":"(string)"}, t('docs.table9.2')],
                  [{"functionName":"Запрос", "type":""}, {"desc1":"", "code1":"curl -X 'POST' \\\n" +
                          "  'http:// gateway-api-dev.globalpay.uz/payments/v1/payment/revert/id?ext=0' \\\n" +
                          "  -H 'accept: */*' \\\n" +
                          "  -d ''"}]], // 11.1 === 9.1

              //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":`{
  "id": "string",
  "service": {
    "id": 0,
    "legalName": "string",
    "name": "string",
    "minAmount": 0,
    "maxAmount": 0,
    "comission": 0,
    "fixedPrice": 0,
    "enabled": true,
    "paymentInstrumentId": 0,
    "paymentInstrument": "PAYNET",
    "uzcardMerchantId": "string",
    "uzcardTerminalId": "string",
    "humoMerchantId": "string",
    "humoTerminalId": "string",
    "url": "string",
    "responseFields": [
      {
        "id": 0,
        "fieldName": "string",
        "labelRu": "string",
        "labelUz": "string",
        "order": 0
      }
    ],
    "requestFields": [
      {
        "id": 0,
        "paymentInstrumentId": 0,
        "paymentInstrument": "PAYNET",
        "order": 0,
        "name": "string",
        "titleRu": "string",
        "titleUz": "string",
        "required": true,
        "readOnly": true,
        "fieldType": "string",
        "isCustomerId": "string",
        "fieldControl": "string",
        "fieldValues": [
          {
            "id": 0,
            "paymentInstrumentId": 0,
            "paymentInstrument": "PAYNET",
            "titleRu": "string",
            "titleUz": "string"
          }
        ]
      }
    ],
    "provider": {
      "id": 0,
      "legalName": "string",
      "name": "string",
      "enabled": true,
      "addressRegistry": "string",
      "inn": "string",
      "paymentInstrument": "PAYNET",
      "paymentInstrumentId": 0
    },
    "info": true
  },
  "customer": {
    "id": 0,
    "name": "string",
    "merchantId": 0
  },
  "createdAt": "2022-12-16T10:52:19.149Z",
  "approvedAt": "2022-12-16T10:52:19.149Z",
  "revertAt": "2022-12-16T10:52:19.149Z",
  "cardToken": " string",
  "externalId": "string",
  "processingId": "string",
  "status": "INIT",
  "amount": 0,
  "processingType": "UZCARD",
  "paymentFields": [
    {
      "id": 0,
      "requestFieldId": 0,
      "value": "string",
      "name": "string"
    }
  ]
 }`
            }],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"]]],
         },


//  =====   StatusPayment  =====  // (12)
         {"title" : t(`docs.title12`),
          "requestType" : "GET", 
          "requestUrl" : "https://gateway-api-dev.globalpay.uz/payments/v1/payment/{id}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"id", "type":"string($uuid)"}, t('docs.table9.1')]], // 12.1 === 9.1
              //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
  "id": "string",
  "service": {
    "id": 0,
    "legalName": "string",
    "name": "string",
    "minAmount": 0,
    "maxAmount": 0,
    "comission": 0,
    "fixedPrice": 0,
    "enabled": true,
    "paymentInstrumentId": 0,
    "paymentInstrument": "PAYNET",
    "uzcardMerchantId": "string",
    "uzcardTerminalId": "string",
    "humoMerchantId": "string",
    "humoTerminalId": "string",
    "url": "string",
    "responseFields": [
      {
        "id": 0,
        "fieldName": "string",
        "labelRu": "string",
        "labelUz": "string",
        "order": 0
      }
    ],
    "requestFields": [
      {
        "id": 0,
        "paymentInstrumentId": 0,
        "paymentInstrument": "PAYNET",
        "order": 0,
        "name": "string",
        "titleRu": "string",
        "titleUz": "string",
        "required": true,
        "readOnly": true,
        "fieldType": "string",
        "isCustomerId": "string",
        "fieldControl": "string",
        "fieldValues": [
          {
            "id": 0,
            "paymentInstrumentId": 0,
            "paymentInstrument": "PAYNET",
            "titleRu": "string",
            "titleUz": "string"
          }
        ]
      }
    ],
    "provider": {
      "id": 0,
      "legalName": "string",
      "name": "string",
      "enabled": true,
      "addressRegistry": "string",
      "inn": "string",
      "paymentInstrument": "PAYNET",
      "paymentInstrumentId": 0
    },
    "info": true
  },
  "customer": {
    "id": 0,
    "name": "string",
    "merchantId": 0
  },
  "createdAt": "2022-12-16T10:49:32.517Z",
  "approvedAt": "2022-12-16T10:49:32.517Z",
  "revertAt": "2022-12-16T10:49:32.517Z",
  "cardToken": "string",
  "externalId": "string",
  "processingId": "string",
  "status": "INIT",
  "amount": 0,
  "processingType": "UZCARD",
  "paymentFields": [
    {
      "id": 0,
      "requestFieldId": 0,
      "value": "string",
      "name": "string"
    }
  ]
}`
            }],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====   StatusPayment  =====  // (13)
         {"title" : t(`docs.title13`),
          "requestType" : "POST", 
          "requestUrl" : "/v1/gp-follower/transactions/billing",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"followerCreateRequestDTO", "type":"(body)"}, {
                "desc1":t('docs.table13.1'), 
                "code1":
`{
    "card_token": "string",
    "external_id": "string",
    "requested_fields": {
      "fields": [
        {
          "name": "string",
          "value": "string"
        }
      ]
    },
    "service_id": 0
  }`,           "desc2":"",
                "code2":"{}"
                        }]], 
                //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "approved_at": "2022-03-21T06:51:18.903Z",
    "billing_transaction_id": "string",
    "created_at": "2022-03-21T06:51:18.903Z",
    "merchant_id": "string",
    "original_sum": 0,
    "payment_time": 0,
    "processing_type": "UZCARD",
    "provider_name": "string",
    "service_name": "string",
    "source_card_number": "string",
    "status": "PREPARED",
    "sum": 0,
    "terminal_id": "string",
    "transaction_id": "string"
}`
            }],
            [{"errorCode":"201"}, "Created"],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },
         

//  =====   InfoIdInExternalSystem  =====  // (14)
         {"title" : t(`docs.title14`),
          "requestType" : "GET", 
          "requestUrl" : "/v1/gp-follower/transactions/ext/{external_id}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"external_id", "type":"String (path)"}, t('docs.table14.1')]], // 12.1 === 9.1
              //=====TABLE-2=====//
               [[{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
`{
    "approved_at": "2022-03-21T07:05:52.350Z",
    "billing_transaction_id": "string",
    "created_at": "2022-03-21T07:05:52.350Z",
    "merchant_id": "string",
    "original_sum": 0,
    "payment_time": 0,
    "processing_type": "UZCARD",
    "provider_name": "string",
    "service_name": "string",
    "source_card_number": "string",
    "status": "PREPARED",
    "sum": 0,
    "terminal_id": "string",
    "transaction_id": "string"
}`
            }],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },


//  =====   transactionRefuse  =====  // (15)
         {"title" : t(`docs.title15`),
          "requestType" : "GET", 
          "requestUrl" : "/v1/gp-follower/transactions/revert/{id}",
          "tables" : [
              //=====TABLE-1=====//
              [[{"functionName":"fullAmount", "type":"Boolean (query)"}, t('docs.table15.1')],
               [{"functionName":"id", "type":"String (path)"}, t('docs.table15.2')],
               [{"functionName":"percent", "type":"integer($int32) (query)"}, t('docs.table15.3')]],
               //=====TABLE-2=====// 
               [
            [{"errorCode":"200"}, "OK"],
            [{"errorCode":"401"}, "Unathorized"],
            [{"errorCode":"403"}, "Forbidden"],
            [{"errorCode":"404"}, "Not found"]]],
         },
        //  =====   transactionRefuse  =====  // (16)
        {"title" : t(`docs.title16`),
            "requestType" : "POST",
            "requestUrl" : "https://gateway-api-dev.globalpay.uz/payments/v1/payment/revert/partial/{id}",
            "tables" : [
                //=====TABLE-1=====//
                [[{"functionName":"id", "type":"string($uuid)"}, t('docs.table16.1')],
                    [{"functionName":"percent", "type":"integer($int32) (query)"}, t('docs.table16.2')],
                    [{"functionName":"Ext", "type":"string"}, t('docs.table16.3')],
                    [{"functionName":"Запрос", "type":""}, {"desc1":"", "code1":"curl -X 'POST' \
  'http:// gateway-api-dev.globalpay.uz/payments/v1/payment/revert/partial/id?percent=80&ext=0' \
  -H 'accept: */*' \
  -d ''"}]],
                //=====TABLE-2=====//
                [
                    [{"errorCode":"200"}, {"desc1":"", "code1":"OK", "desc2":"", "code2":
                            `{
    "id": "string",
  "service": {
    "id": 0,
    "legalName": "string",
    "name": "string",
    "minAmount": 0,
    "maxAmount": 0,
    "comission": 0,
    "fixedPrice": 0,
    "enabled": true,
    "paymentInstrumentId": 0,
    "paymentInstrument": "PAYNET",
    "uzcardMerchantId": "string",
    "uzcardTerminalId": "string",
    "humoMerchantId": "string",
    "humoTerminalId": "string",
    "url": "string",
    "responseFields": [
      {
        "id": 0,
        "fieldName": "string",
        "labelRu": "string",
        "labelUz": "string",
        "order": 0
      }
    ],
    "requestFields": [
      {
        "id": 0,
        "paymentInstrumentId": 0,
        "paymentInstrument": "PAYNET",
        "order": 0,
        "name": "string",
        "titleRu": "string",
        "titleUz": "string",
        "required": true,
        "readOnly": true,
        "fieldType": "string",
        "isCustomerId": "string",
        "fieldControl": "string",
        "fieldValues": [
          {
            "id": 0,
            "paymentInstrumentId": 0,
            "paymentInstrument": "PAYNET",
            "titleRu": "string",
            "titleUz": "string"
          }
        ]
      }
    ],
    "provider": {
      "id": 0,
      "legalName": "string",
      "name": "string",
      "enabled": true,
      "addressRegistry": "string",
      "inn": "string",
      "paymentInstrument": "PAYNET",
      "paymentInstrumentId": 0
    },
    "info": true
  },
  "customer": {
    "id": 0,
    "name": "string",
    "merchantId": 0
  },
  "createdAt": "2022-12-16T11:06:59.588Z",
  "approvedAt": "2022-12-16T11:06:59.588Z",
  "revertAt": "2022-12-16T11:06:59.588Z",
  "cardToken": "string",
  "externalId": "string",
  "processingId": "string",
  "status": "INIT",
  "amount": 0,
  "processingType": "UZCARD",
  "paymentFields": [
    {
      "id": 0,
      "requestFieldId": 0,
      "value": "string",
      "name": "string"
    }
  ]
}`
                    }],
                    [{"errorCode":"401"}, "Unathorized"],
                    [{"errorCode":"403"}, "Forbidden"],
                    [{"errorCode":"404"}, "Not found"]]],
        },
        ]
    return data;
}







