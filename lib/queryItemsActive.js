require("dotenv").config();
const dayjs = require("dayjs");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { tableName } = require("../config/db");

module.exports = async () => {
  const client = new DynamoDBClient({ region: "eu-central-1" });
  const query = new ScanCommand({
    TableName: tableName,
    ProjectionExpression: "ID, message, time_target, channel, time_target_iso",
    FilterExpression: "time_target > :tnow",
    ExpressionAttributeValues: {
      ":tnow": { N: String(dayjs().valueOf()) },
    },
  });

  try {
    const result = await client.send(query);
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
