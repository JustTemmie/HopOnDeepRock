/**
 * @name HopOnDeepRock
 * @author Temmie
 * @description Forces you into hopping on deep rock when your friends demand it <3
 * @version 0.0.2
 * @authorId 725539745572323409
 * @donate https://paypal.me/TemmieTem
 * @source https://github.com/JustTemmie/HopOnDeepRock/
 */

const execSync = require('child_process').execSync;

// var config = {
//   "ignoredUsers": [],
//   "games": {
//       "gameID": "538430",
//       "gameQuote": "hop on deep rock",
//   }
// };

const config = {
    info: {
        name: "HopOnDeepRock",
        authors: [{
            name: "Temmie"
        }],
        version: "0.0.3",
        description: "Forces you into hopping on deep rock when your friends demand it <3",
        github_raw: "https://github.com/JustTemmie/HopOnDeepRock/blob/main/HopOnDeepRock.plugin.js",
    },
    changelog: [
        {
            title : "v0.0.3",
            items: ["just some tests.",
                    "yknow, things."],
        }
    ]
  };

var settings = {
    "test": {
        "title": "don't mind me, just testing some things",
        "description": "aaaaaaaaaaaaaaaaa",
        "value": true
    }
}

module.exports = (() => {
  
return !global.ZeresPluginLibrary ? class {
    constructor() {
        this.initialized = false;
        //this._config = config;
    }
    load() {
        BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
            confirmText: "Download Now",
            cancelText: "Cancel",
            onConfirm: () => {
                require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                    if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                });
            }
        });
    }
    start() {}
    stop() {}
} : (([Plugin, Api]) => {
      const plugin = (Plugin, Library) => {

const {Logger, Patcher, Settings, PluginUpdater, PluginUtilities} = Library;

return class HopOnDeepRock extends Plugin {
    async onStart() {
        // Check for Plugin Updates
        PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/danegottwald/BetterDiscordPlugins/main/HideStreamPreview/HideStreamPreview.plugin.js");

        // Load Settings from Config on Startup
        Object.entries(PluginUtilities.loadData("HopOnDeepRock", "settings", {})).forEach(([setting, value]) => {
            settings[setting]["value"] = value
        });


        this.cancelPatches = [];
        
        let dispatchModule = BdApi.findModuleByProps('dispatch', 'subscribe');
        BdApi.Patcher.after(this.getName(), dispatchModule, 'dispatch', this.handleMessage.bind(this));
        Logger.log("Started");
        Patcher.before(Logger, "log", (t, a) => {
                a[0] = "Patched Message: " + a[0];
            });

            this.userId = BdApi.findModuleByProps('getId').getId();
            //console.log("logged in as user " + str(this.userId));
        }
    
    getSettingsPanel() {
        // Dynamically create settings panel depending on the keys in the 'settings' dictionary
        var panel = new Settings.SettingPanel();
        Object.entries(settings).forEach(([setting, content]) => {
            panel.append(
                new Settings.Switch(
                    content["title"], content["description"], content["value"],
                    (val) => {
                        settings[setting]["value"] = val;
                        PluginUtilities.saveSettings("HopOnDeepRock", { [setting]: val });
                    }
                )
            );
        });

        return panel.getElement();
    }

    handleMessage(_, args) {
        let event = args[0];
        if (event.type !== 'MESSAGE_CREATE') return;
        let { message } = event;
        if (message.author.bot) return;
        if (message.author.id === this.userId) return;
        if (message.content.includes("hop on deep rock")) execSync('steam steam://rungameid/548430');
        else if (message.content.includes("hop on bloons")) execSync('steam steam://rungameid/960090');
        else if (message.content.includes("hop on risk of rain")) execSync('steam steam://rungameid/632360');
        else if (message.content.includes("hop on among us")) execSync('steam steam://rungameid/945360');
    }

    onStop() {
        Logger.log("Stopped");
        BdApi.Patcher.unpatchAll(this.getName());
    }

  }
};
      return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();