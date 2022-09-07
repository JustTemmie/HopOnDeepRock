/**
 * @name HopOnDeepRock
 * @author Temmie
 * @description Forces you into hopping on deep rock when your friends demand it <3
 * @version 0.0.1
 * @authorId 725539745572323409
 * @donate https://paypal.me/TemmieTem
 * @source https://github.com/JustTemmie/HopOnDeepRock/
 */

const execSync = require('child_process').execSync;

module.exports = (() => {
  const config = {"info":{"name":"Hop On Deep Rock","authors":[{"name":"Temmie","discord_id":"725539745572323409","github_username":"JustTemmie",}],"version":"0.0.1","description":"Deep Rock?!?!", "main":"index.js"}};

  return !global.ZeresPluginLibrary ? class {
      constructor() {this._config = config;}
      getName() {return config.info.name;}
      getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
      getDescription() {return config.info.description;}
      getVersion() {return config.info.version;}
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

  const {Logger, Patcher, Settings} = Library;

  return class HopOnDeepRock extends Plugin {
    async onStart() {
      this.cancelPatches = [];
      
      let dispatchModule = BdApi.findModuleByProps('dispatch', 'subscribe');
      BdApi.Patcher.after(this.getName(), dispatchModule, 'dispatch', this.handleMessage.bind(this));
      Logger.log("Started");
      Patcher.before(Logger, "log", (t, a) => {
        a[0] = "Patched Message: " + a[0];
      });

      this.userId = BdApi.findModuleByProps('getId').getId();
      console.log(this.userId);
    }

    handleMessage(_, args) {
      let event = args[0];
      if (event.type !== 'MESSAGE_CREATE') return;
      let { message } = event;
      if (message.author.bot) return;
      if (message.author.id === this.userId) return;
      if (message.content )
      console.log(message.content);
      if (message.content.includes("hop on deep rock")) execSync('start steam://rungameid/548430', { encoding: 'utf-8' });
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
  // Dispatcher.subscribe("MESSAGE_CREATE", this.onMessage);
  // onMessage({ message }) {
  //   BdApi.alert("HEY!", "Ready to play some deeprock?!!?!?!!?");
  // }