const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ELASTIC_HOST,
  auth: {
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = client;
