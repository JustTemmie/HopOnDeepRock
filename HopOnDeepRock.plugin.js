/**
 * @name HopOnDeepRock
 * @author Temmie
 * @description Forces you into hopping on deep rock when your friends demand it <3
 * @version 0.0.3
 * @authorId 725539745572323409
 * @donate https://paypal.me/TemmieTem
 * @source https://github.com/JustTemmie/HopOnDeepRock/HopOnDeepRock.plugin.js
 */

 // var config = {
 //   "ignoredUsers": [],
 //   "games": {
 //       "gameID": "538430",
 //       "gameQuote": "hop on deep rock",
 //   }
 // };

const Dispatcher = ZLibrary.DiscordModules.Dispatcher;

module.exports = (() => {
    const defaultSettings = {
        on: true,
        os: "windows",
        phrases: ["hop on deep rock"],
        gameIDs: ["548430"]
    };

    const config = {
        info: {
            name: "HopOnDeepRock",
            authors: [{
                name: "Temmie"
            }],
            version: "0.0.3",
            description: "Forces you into hopping on deep rock when your friends demand it <3",
            github_raw: "https://raw.githubusercontent.com/JustTemmie/HopOnDeepRock/main/HopOnDeepRock.plugin.js",
        },
        changelog: [
            {
                title : "v0.0.2",
                items: ["just some tests.",
                        "yknow, things."],
            }
        ]
    };

    var settings = {
    };
   
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

const {Logger, Patcher, Settings, Utilities, PluginUpdater, PluginUtilities} = Library;

return class HopOnDeepRock extends Plugin {
    async onStart() {
        settings = PluginUtilities.loadSettings('HopOnDeepRock', settings);
        settings = Utilities.deepclone(PluginUtilities.loadSettings('HopOnDeepRock', defaultSettings));
        this.cancelPatches = [];
       
        // Check for Plugin Updates
        PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/JustTemmie/HopOnDeepRock/main/HopOnDeepRock.plugin.js");
    
        this.getOS()

        console.log("connecting")

        let cb = e => {
            this.handleMessage(e)
        }
        
        Dispatcher.subscribe('MESSAGE_CREATE', cb);
        };
    
    makeSwitch(iv, callback) {
        let label = document.createElement('label');
        label.className = 'switch';
        let input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.checked = iv;
        let div = document.createElement('div');
        label.append(input);
        label.append(div);
        input.addEventListener('input', function (e) { 
            callback(this.checked);
        });
        return label;
    }

    getOS() {
        // detect user OS and bullshit
        var OS = "unknown";
        if (navigator.userAgent.indexOf("Win") != -1) OS = "windows";
        if (navigator.userAgent.indexOf("Linux") != -1) OS = "linux";
        if (navigator.userAgent.indexOf("Mac") != -1) OS = "mac";
        if (navigator.userAgent.indexOf("X11") != -1) OS = "unix";
        
        console.log(OS + " detected");
        if (OS == "mac") {
            PluginUtilities.showToast("sorry, the " + this.getName() + " plugin is not supported for " + OS + " please create a ticket at https://github.com/JustTemmie/HopOnDeepRock/issues for further assistance");
        }
        else if (OS == "unknown") {
            PluginUtilities.showToast("failed to detect host OS, please open the plugin settings to select your operation system");
        }
        else {
            settings.os = OS
        }
        console.log(settings.os)
    }
     
    getSettingsPanel() {
        var panel = new Settings.SettingPanel();

        var phrases = new Settings.SettingGroup('Phrases');
        let tip = new Settings.SettingField('', 'Messages the plugin will react to, one message per line.', null, document.createElement('div'));
        phrases.append(tip);
        panel.append(phrases);

        
        var gameIDs = new Settings.SettingGroup('GameIDs');
        tip = new Settings.SettingField('', 'The game IDs steam will try launching on a found phrase. First line in phrases launches the first phrase in here and so on - the game IDs are found in their store page URL', null, document.createElement('div'));
        gameIDs.append(tip);
        panel.append(gameIDs);
        
        panel.append(
            new Settings.Switch(
                "enabled", "disable or enable the plugin, BD's toggle button doesn't work with the plugin", settings.on,
                (val) => {
                    settings.on = val;
                    this.saveSettings();
                }
            )
        );

        let textbox = document.createElement('textarea');
        textbox.value = settings.phrases.join('\n');
        textbox.addEventListener('change', () => {
            settings.phrases = textbox.value.split('\n');
            this.saveSettings();
        });
        textbox.setAttribute('rows', '8');
        textbox.style.width = '95%';
        textbox.style.resize = 'none';
        textbox.style['margin-left'] = '2.5%';
        textbox.style.borderRadius = '3px';
        textbox.style.border = '2px solid grey';
        textbox.style.backgroundColor = '#ddd';
        phrases.append(textbox);


        let textbox2 = document.createElement('textarea');
        textbox2.value = settings.gameIDs.join('\n');
        textbox2.addEventListener('change', () => {
            settings.gameIDs = textbox2.value.split('\n');
            this.saveSettings();
        });
        textbox2.setAttribute('rows', '8');
        textbox2.style.width = '95%';
        textbox2.style.resize = 'none';
        textbox2.style['margin-left'] = '2.5%';
        textbox2.style.borderRadius = '3px';
        textbox2.style.border = '2px solid grey';
        textbox2.style.backgroundColor = '#ddd';
        gameIDs.append(textbox2);
        
        
        let osexplenation = document.createElement('div');
        osexplenation.innerHTML += "<p style='color:#b9bbbe'>your operating system, this is used to exectuce the necessary system calls corresponding to your OS</p>";
        panel.append(osexplenation);

        let ostextbox = document.createElement("textarea"); 
        ostextbox.value = settings.os;
        ostextbox.addEventListener('change', () => {
            settings.os = ostextbox.value;
            this.saveSettings();
        });
        ostextbox.setAttribute('rows', '1');
        ostextbox.style.width = '95%';
        ostextbox.style.resize = 'none';
        ostextbox.style['margin-left'] = '2.5%';
        ostextbox.style.borderRadius = '3px';
        ostextbox.style.border = '2px solid grey';
        ostextbox.style.backgroundColor = '#ddd';
        panel.append(ostextbox);


        return panel.getElement();
    }

    saveSettings() {
        settings.phrases = settings.phrases.filter((v) => v.trim().length > 0);
        settings.gameIDs = settings.gameIDs.filter((v) => v.trim().length > 0);
        PluginUtilities.saveSettings('HopOnDeepRock', settings);
        this.getOS()
    }
 
    handleMessage(event) {
        if (settings.on == false) return;
        if (event.type !== 'MESSAGE_CREATE') return;
        if (event.message.author.bot) return;
        // var exec = require('child_process').exec;
        // exec("ls")
        for (let i in settings.gameIDs) {
            if (event.message.content.includes(settings.phrases[i])) {
                var keyword = "start"
                if (settings.os.includes("windows")) keyword = "start";
                else if (settings.os.includes("linux") || settings.os.includes("unix")) keyword = "steam";
                else PluginUtilities.showToast("sorry, that doesn't seem to be a valid operating system");;

                console.log(keyword + ' steam://rungameid/' + String(settings.gameIDs[i]));

            }
        }
    }
 
    onStop() {
        BdApi.Patcher.unpatchAll(this.getName());
    }
 
   }
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
