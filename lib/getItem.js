require("dotenv").config();
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { tableName } = require("../config/db");

module.exports = async (id) => {
  const client = new DynamoDBClient({ region: "eu-central-1" });
  const getItemCmd = new GetItemCommand({
    TableName: tableName,
    Key: {
      ID: { S: id },
    },
  });

  try {
    const result = await client.send(getItemCmd);
    return result;
  } catch (err) {
    console.error(err);
  }
};
