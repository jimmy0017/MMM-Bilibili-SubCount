/* Magic Mirror
 * Module: MMM-Bilibili-SubCount
 *
 * By Jimmy Lin (https://github.com/jimmy0017)
 * MIT Licensed.
 */

Module.register("MMM-Bilibili-SubCount", {
  defaults: {
    // apiKey: "",
    channelIds: [
      {
        id: ""
      }
    ],
    showChannelImg: true,
    updateInterval: 60000
  },

  requiresVersion: "2.1.0", // Required version of MagicMirror

  start: function () {
    var self = this;
    this.finalPayload = [];

    // Schedule update timer.
    this.sendSocketNotification("MMM-Bilibili-SubCount-HERE_IS_CONFIG", this.config);
    setInterval(function () {
      self.updateDom();
    }, this.config.updateInterval);
  },

  getDom: function () {
    var self = this;

    var wrapper = document.createElement("div");
    wrapper.id = "MMM-Bilibili-SubCount-root";
    if (this.finalPayload !== undefined) {
      Log.log(this.finalPayload);
      if (this.finalPayload.items !== undefined) {
        this.finalPayload.items.forEach((item) => {
          var section = document.createElement("div");
          section.id = "MMM-Bilibili-SubCount-container";

          var img = document.createElement("div");
          img.innerHTML = `<img src="${item.data.card.face}" width="180" height="180">`;
          section.appendChild(img);

          var content = document.createElement("div");
          content.id = "MMM-Bilibili-SubCount-content";

          var title = document.createElement("p");
          title.id = "MMM-Bilibili-SubCount-title";
          title.innerText = `${item.data.card.name}`;

          var count = document.createElement("div");
          count.id = "MMM-Bilibili-SubCount-count";
          count.innerHTML = `<p class="mdi mdi-bilibili">${this.numFormatter(
            item.data.follower
          )}`;

          if (!this.config.showChannelImg) {
            img.style.visibility = "hidden";
          }

          content.appendChild(title);
          content.appendChild(count);
          section.appendChild(content);
          wrapper.appendChild(section);
        });
      }else{
        item = this.finalPayload;
        var section = document.createElement("div");
          section.id = "MMM-Bilibili-SubCount-container";

          var img = document.createElement("div");
          img.innerHTML = `<img src="${item.data.card.face}" width="88" height="88">`;
          section.appendChild(img);

          var content = document.createElement("div");
          content.id = "MMM-Bilibili-SubCount-content";

          var title = document.createElement("p");
          title.id = "MMM-Bilibili-SubCount-title";
          title.innerText = `${item.data.card.name}`;

          var count = document.createElement("div");
          count.id = "MMM-Bilibili-SubCount-count";
          count.innerHTML = `<p class="mdi mdi-bilibili"><span class="iconify" data-icon="simple-icons:bilibili" data-inline="false"></span>${this.numFormatter(
            item.data.follower
          )}`;

          if (!this.config.showChannelImg) {
            img.style.visibility = "hidden";
          }

          content.appendChild(title);
          content.appendChild(count);
          section.appendChild(content);
          wrapper.appendChild(section);
      }
    }

    return wrapper;
  },

  numFormatter: function (num) {
    if (Math.abs(num) > 999999) {
      return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M";
    } else if (Math.abs(num) > 999) {
      return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K";
    } else {
      return Math.sign(num) * Math.abs(num);
    }
  },

  getScripts: function () {
    return [
    "https://code.iconify.design/1/1.0.7/iconify.min.js"
    ];
  },

  getStyles: function () {
    return [
      "MMM-Bilibili-SubCount.css",
      "https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css"
    ];
  },

  // Load translations files
  getTranslations: function () {
    //FIXME: This can be load a one file javascript definition
    return {
      en: "translations/en.json",
      es: "translations/es.json"
    };
  },

  // socketNotificationReceived from helper
  socketNotificationReceived: function (notification, payload) {
    if (notification === "MMM-Bilibili-SubCount-DATA_IS_READY") {
      this.finalPayload = payload;
      this.updateDom();
    }
  }
});
