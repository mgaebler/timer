require("dotenv").config(); // we need this to have the access keys present
const dayjs = require("dayjs");
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { tableName } = require("../config/db");

module.exports = async (id, minutes) => {
  const client = new DynamoDBClient({ region: "eu-central-1" });
  const timeTarget = dayjs().add(minutes, "minutes");
  const putItemCmd = new PutItemCommand({
    TableName: tableName,
    Item: {
      ID: { S: id },
      // channel: { S: channel },
      time_target: { N: String(timeTarget.valueOf()) },
      time_target_iso: { S: timeTarget.toISOString() },
      // message: { S: message },
    },
  });

  try {
    const results = await client.send(putItemCmd);
    console.log(results);
    return results;
  } catch (err) {
    console.error(err);
  }
};
