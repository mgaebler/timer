const QRCode = require("qrcode");
async function getQrCode(url) {
  try {
    const result = await QRCode.toDataURL(url);
    return result;
  } catch (error) {
    console.log("Could not generate code", error);
  }
}

const stageUrl =
  "http://slack-timer-development.eba-wvzpmbji.eu-central-1.elasticbeanstalk.com";

module.exports = async (req, res) => {
  // examples for the timer endpoint
  // /timer/channel/timer_id/minutes/message
  const commands = [
    {
      name: "Add washer_1",
      url: "/timer/washer_1",
      qrCode: await getQrCode(stageUrl + "/timer/washer_1"),
    },
    {
      name: "Add washer_2",
      url: "/timer/washer_2",
      qrCode: await getQrCode(stageUrl + "/timer/washer_2"),
    },
    {
      name: "Add dryer_1",
      url: "/timer/dryer_1",
      qrCode: await getQrCode(stageUrl + "/timer/dryer_1"),
    },
    {
      name: "Add dryer_2",
      url: "/timer/dryer_2",
      qrCode: await getQrCode(stageUrl + "/timer/dryer_2"),
    },
  ];
  res.render("dev", { commands });
};
