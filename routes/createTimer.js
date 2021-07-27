const { names } = require("../config/names");
const createItem = require("../lib/createItem");
const getItem = require("../lib/getItem");
const sendSlackMessage = require("../lib/sendSlackMessage");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { minutes } = req.query;

  const getItemResult = await getItem(id);
  console.log("getItemResult: ", getItemResult);

  // if the item already exists
  if (getItemResult.Item) {
    // update the entry
    // updateItem(id, minutes, message)
    // response the change text
    // res.json({ message: `The following item has been updated: ${id}` })

    // for now we're simply break at this point
    // res.json({ message: `This item already exists: ${id}` });
    res.render("itemInUse", { id });
    return;
  }

  if (!minutes) {
    res.render("minuteForm", { id });
    return;
  }

  // create a new entry
  await createItem(id, minutes);

  // Send the creation message to slack channel

  await sendSlackMessage(
    `🧺 ${names[id]} wurde mit ${minutes} Minuten gestartet.`
  );

  // response with the create text
  // res.json({
  //   message: `The following item has been created: ${id}`,
  //   resultDB,
  // });
  res.render("createItemSuccess", { id });

  // res.send(req.params)
};
