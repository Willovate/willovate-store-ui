const { Client } = require('pg');
const client = new Client('postgres://willovate:willovate_dev@localhost:5432/willovate_store');
client.connect().then(() => {
  return client.query(`DELETE FROM "PageElements" WHERE "Name" LIKE '%Main Hero%'`);
}).then(r => {
  console.log('Deleted ' + r.rowCount + ' duplicate elements.');
  client.end();
}).catch(console.error);
