const testCase1 = [
    {
      key: "key1",
      offset: "0",
      nameApi: "Client",
      name: "apiTestCase",
      versions: [
        {
          offset: "1",
          name: "clientApiVersion",
          nameVersion: "v4",
          actions: [
            "create",
            "get",
            "delete",
            "update"
            
          ],
        },
        {
          offset: "1",
          name: "clientApiVersion",
          nameVersion: "v5",
          actions: [
            "create",
            "get",
            "delete",
            "update"
          ],
        },
      ],
    },
    {
      key: "key2",
      offset: "2",
      nameApi: "Consumer",
      name: "apiTestCase",
      actions: ["post", "get", "delete",
      "update"],
    },
    {
      key: "key3",
      offset: "3",
      nameApi: "RO",
      name: "apiTestCase",
      actions: ["post", "get", "delete",
      "update"],
    },
  
    {
      key: "key4",
      offset: "4",
      nameApi: "Consent",
      name: "apiTestCase",
      actions: ["post", "get", "delete",
      "update"],
    },
   
    {
      key: "key5",
      offset: "6",
      nameApi: "Scope",
      name: "apiTestCase",
      actions: ["post", "get", "delete",
      "update"],
    },

    {
      key: "key6",
      offset: "7",
      nameApi: "Token   ",
      name: "apiTestCase",
      actions: ["get", "delete"],
    },
    {
      key: "key7",
      offset: "8",
      nameApi: "Event",
      name: "apiTestCase",
      actions: ["post", "get", "delete",
      "update"],
    },
    {
      key: "key8",
      offset: "10",
      nameApi: "UserInfo",
      name: "apiTestCase",
      actions: ["post", "get"]
    }, {
      key: "key9",
      offset: "11",
      nameApi: "Authorize",
      name: "apiTestCase",
      actions: ["post", "get", "delete"]
    }
     
  ]
  export default testCase1 ;
