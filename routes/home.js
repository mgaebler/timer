const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs.tz.setDefault("America/Toronto");
// dayjs.tz.setDefault("Europe/Berlin");

const queryItemsActive = require("../lib/queryItemsActive");
const { units, names } = require("../config/names");

const imgWasherRed = "/images/washer_red.svg";
const imgWasherGreen = "/images/washer_green.svg";
const imgDryerRed = "/images/dryer_red.svg";
const imgDryerGreen = "/images/dryer_green.svg";

module.exports = async (req, res) => {
  const result = await queryItemsActive();
  try {
    const itemsEnriched = result.Items.map((item) => ({
      id: item.ID.S,
      // message: item.message.S,
      timeUntilReady: dayjs(item.time_target_iso.S)
        .tz("Europe/Berlin")
        .format("HH:mm"),
      countdown: dayjs().diff(item.time_target_iso.S, "minutes"),
      imageSrc: item.ID.S.startsWith("washer") ? imgWasherRed : imgDryerRed,
      active: true,
    }));

    const items = units.map((unit) => {
      const foundItem = itemsEnriched.find((item) => item.id === unit);
      return (
        foundItem || {
          id: unit,
          active: false,
          imageSrc: unit.startsWith("washer") ? imgWasherGreen : imgDryerGreen,
        }
      );
    });

    const namedItems = items.map((item) => ({ ...item, name: names[item.id] }));

    res.render("home", { title: "Wash of Fame", items: namedItems });
  } catch (e) {
    res.send(e.message);
  }
};
