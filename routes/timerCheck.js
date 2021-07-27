const { names } = require("../config/names");
const deleteItem = require("../lib/deleteItem");
const queryItemsExpired = require("../lib/queryItemsExpired");
const sendSlackMessage = require("../lib/sendSlackMessage");

module.exports = async (req, res) => {
  // check for outrunning timers
  const result = await queryItemsExpired();
  // for each timer found
  const promises = result.Items.map(async (item) => {
    // send the timer message
    const id = item.ID.S;
    const message = `🏁 ${names[id]} ist jetzt wieder verfügbar.`;

    await sendSlackMessage(message);

    // remove the timer entry
    await deleteItem(item.ID.S);
  });

  await Promise.all(promises);
  // res.json(result)
  res.status(200).json({ status: "ok" });
};
