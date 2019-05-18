// "use strict";

// module.exports = require("./src/main/node/functions");

const LeapStarterLoader = require("./src/main/node/boot/LeapStarterLoader");

const leapStarterLoader = new LeapStarterLoader();

leapStarterLoader.load();