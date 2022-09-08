//META{"name":"Example"}*//

class Example {
    // Constructor
    constructor() {
        this.initialized = false;
    }

    // Meta
    getName() { return "Example"; }
    getShortName() { return "Example"; }
    getDescription() { return "This is an example/template for a BD plugin."; }
    getVersion() { return "0.1.0"; }
    getAuthor() { return "Minin"; }

    // Settings  Panel
    getSettingsPanel() {
        return "<!--Enter Settings Panel Options, just standard HTML-->";
    }
    
    // Load/Unload
    load() {}

    unload() {}

    // Events

    onMessage() {
      print("hi")
      let event = args[0];
      if (event.type !== 'MESSAGE_CREATE') return;
      let { message } = event;
      console.log(message.content)
      if (message.author.bot) return;
      if (message.author.id === this.userId) return;
      if (message.content.includes("hop on deep rock")) execSync('steam steam://rungameid/548430');
      else if (message.content.includes("hop on bloons")) execSync('steam steam://rungameid/960090');
      else if (message.content.includes("hop on risk of rain")) execSync('steam steam://rungameid/632360');
      else if (message.content.includes("hop on among us")) execSync('steam steam://rungameid/945360');
    };
    
    // Start/Stop
    start() {
      console.log("hop on deep rock has started")
      var libraryScript = document.getElementById('zeresLibraryScript');
      if (!libraryScript) {
        libraryScript = document.createElement("script");
        libraryScript.setAttribute("type", "text/javascript");
        libraryScript.setAttribute("src", "https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js");
        libraryScript.setAttribute("id", "zeresLibraryScript");
        document.head.appendChild(libraryScript);
      }

      if (typeof window.ZeresLibrary !== "undefined") this.initialize();
      else libraryScript.addEventListener("load", () => { this.initialize(); });
    }
       
    stop() {
        BdApi.Patcher.unpatchAll(this.getName());
    };

    //  Initialize
    initialize() {
        this.initialized = true;
        console.log("hi")
    }
}