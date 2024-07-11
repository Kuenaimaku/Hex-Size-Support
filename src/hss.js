import { registerSettings } from "./modules/settings";
import { registerBorderWrappers } from "./modules/border";
import { isAltOrientation } from "./modules/grid";
import { extendTokenConfig } from "./modules/token-config";

Hooks.once("init", () => {
	console.log("hex-size-support | Initializing module");
	registerSettings();
	const API = {
		isAltOrientation,
	};
	game.modules.get("hex-size-support").api = API;
});

Hooks.once("libWrapper.Ready", () => {
	registerBorderWrappers();
});

Hooks.on("renderTokenConfig", extendTokenConfig);
