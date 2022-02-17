import { createClient } from "@astrajs/rest";


export default async function  initDB(){ 

const basePath = "/api/rest/v2/namespaces/app/collections/users";
// create an Astra DB client
const astraClient = await createClient({
  astraDatabaseId: '5b6c0baa-2a79-48f7-8bf9-9f89e4abd69d',
  astraDatabaseRegion: 'asia-south1',
  applicationToken: 'AstraCS:SBGCjGGPMvLZyBpnhqCrvLix:0c01c84308c6464f823c53e14b40e832a8f3348670b4686ee3cb512663fd807e',
});

 // Check for the "rest" table. If it doesn't exist create it dynamically.
 let tables =  astraClient.get('/api/rest/v2/schemas/keyspaces/todos/tables')
 let results = tables.data.filter(entry => entry.name === "rest");
 if (!results.length) {
    //createTable("rest")
 }

// get a single user by document id
const { data, status } = await astraClient.get(`${basePath}/cliff@wicklow.com`);

// get a subdocument by path


// search a collection of documents
const { data2, status2 } = await astraClient.get(basePath, {
  params: {
    where: {
      name: { $eq: "Cliff" },
    },
  },
});

// create a new user without a document id
const { data3, status3 } = await astraClient.post(basePath, {
  name: "cliff",
});

// create a new user with a document id
const { data4, status4 } = await astraClient.put(
  `${basePath}/cliff@wicklow.com`,
  {
    name: "cliff",
  }
);

// create a user subdocument
const { data5, status5 } = await astraClient.put(
  `${basePath}/cliff@wicklow.com/blog`,
  {
    title: "new blog",
  }
);

// partially update user
const { data6, status6 } = await astraClient.patch(
  `${basePath}/cliff@wicklow.com`,
  {
    name: "cliff",
  }
);

// delete a user
const { data7, status7 } = await astraClient.delete(
  `${basePath}/cliff@wicklow.com`
);

return astraClient;
}