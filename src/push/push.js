/* eslint-disable @typescript-eslint/no-var-requires */
let push = require("web-push");

let sub = require("./samplePush.json");
let keys = require("./keys.json");

push.sendNotification(sub, "test message");
