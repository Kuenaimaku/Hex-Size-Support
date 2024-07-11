import { registerSettings, renderSettingsConfig } from "./modules/settings";
import { hitAreaDraw, hitAreaUpdate, pivotToken } from "./modules/hitarea";
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

Hooks.on("drawToken", hitAreaDraw);
Hooks.on("updateToken", hitAreaUpdate);
Hooks.on("refreshToken", pivotToken);
Hooks.on("renderSettingsConfig", renderSettingsConfig);
Hooks.on("renderTokenConfig", extendTokenConfig);
