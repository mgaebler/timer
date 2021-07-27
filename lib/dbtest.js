require("dotenv").config();

const {
  DynamoDBClient,
  ListTablesCommand,
  GetItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { tableName } = require("../config/db");

(async () => {
  const client = new DynamoDBClient({ region: "eu-central-1" });

  const getItemCmd = new GetItemCommand({
    TableName: tableName,
    Key: {
      ID: { S: "fooo" },
    },
  });

  try {
    const results = await client.send(getItemCmd);
    console.log(results);
  } catch (err) {
    console.error(err);
  }
})();
