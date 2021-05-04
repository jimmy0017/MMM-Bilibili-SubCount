# MMM-Bilibili-SubCount

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

This is inspired by [MMM-YT-SubCount](https://github.com/choffmann/MMM-YT-SubCount).

This module show the number of Bilibili Subscriber on the MagicMirror. 

[![Project Status: Inactive – The project has reached a stable, usable state but is no longer being actively developed; support/maintenance will be provided as time allows.](https://www.repostatus.org/badges/latest/inactive.svg)](https://www.repostatus.org/#inactive)

Version 1.0.0

## Installation

This module is pretty simple to set up. You simply need to clone the module into your modules folder (like other modules).

```
$ cd MagicMirror/modules
$ git clone https://github.com/jimmy0017/MMM-Bilibili-SubCount.git
```

After you clone the repositories, you have to install the `node modules`

```
$ cd ./MMM-Bilibili-SubCount
$ npm install
```

## Bilibili Channel

To display the subscribtion, you need to define which channel you want to display. You can also only display **ONE** channel.
All you need is the Channel ID. You can find the Channel ID in the URL in Bilibili.

```
https://space.bilibili.com/xxxxxx
```

Where xxxx is your channel ID

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: "MMM-Bilibili-SubCount",
      header: "Bilibili Counter",
      position: "top_right",
      config: {
        showChannelImg: true,
        channelId: "123456789",
      }
    }
  ]
};
```

## Configuration options

| Option           | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `channelId`     | **_Required_** Put the Channel id here |
| `showChannelImg` | **_Optional_** Display the channel profile image <br><br>**Type:** `boolean` <br>Default `true`             |
| `updateInterval` | **_Optional_** Refresh rate <br><br>**Type:** `int`(milliseconds) <br>Default 60000 milliseconds (1 minute) |
