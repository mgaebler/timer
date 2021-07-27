const createTimer = require("./createTimer");
const dev = require("./dev");
const home = require("./home");
const timerCheck = require("./timerCheck");

module.exports = (app) => {
  app.get("/", home);

  app.get("/dev", dev);

  /**
   * checks all timers
   * If the timer is ready the message will be sent and the timer deleted.
   */
  app.get("/timer/_check", timerCheck);
  app.get("/timer/:id", createTimer);
  app.get("/test", (req, res) =>
    res.render("createItemSuccess", { id: "foo" })
  );
};
