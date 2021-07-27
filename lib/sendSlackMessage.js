require("dotenv").config();
const axios = require("axios");
const slackChannelHook = process.env.SLACK_CHANNEL_HOOK;

module.exports = async (text) => {
  try {
    await axios.post(slackChannelHook, { text });
  } catch (e) {
    console.log(e);
  }
};
