/* Magic Mirror
 * Node Helper: MMM-Bilibili-SubCount
 *
 * By Jimmy Lin (https://github.com/jimmy0017)
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
  start: function () {
    this.finalData = [];
    this.channelId = null;
    // this.apiKey = null;
  },

  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case "MMM-Bilibili-SubCount-HERE_IS_CONFIG":
        // this.apiKey = payload.apiKey;
        this.channelId = payload.channelId;
        this.breakDownChannelIds();
        break;
      case "UPDATE_PLEASE":
        this.crypto();
        break;
    }
  },

  breakDownChannelIds: function () {
    this.url =
      "http://api.bilibili.com/x/web-interface/card?mid=" + this.channelId;
    console.log(this.url);
    this.getData(this.url);
  },

  getData: function (url) {
    // fetch(url + "&key=" + this.apiKey, {
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => this.handleData(data))
      .catch((error) => console.log("Error: ", error));
  },

  handleData: function (data) {
    this.sendSocketNotification("MMM-Bilibili-SubCount-DATA_IS_READY", data);
  }
});
