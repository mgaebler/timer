require("dotenv").config();
const {
  DynamoDBClient,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { tableName } = require("../config/db");

/**
 *
 * @param {string} id
 * @param {number} timeTarget
 * @param {string} message
 * @returns
 */
module.exports = async (id, timeTarget, message = "") => {
  const client = new DynamoDBClient({ region: "eu-central-1" });
  const putItemCmd = new UpdateItemCommand({
    TableName: tableName,
    Item: {
      ID: { S: id },
      time_target: { N: timeTarget },
      message: { S: message },
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
