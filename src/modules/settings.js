export function registerSettings() {
	const canvasRedraw = () => {
		if (canvas.ready) canvas.draw();
	};

	game.settings.register("hex-size-support", "alwaysShowBorder", {
		name: "hex-size-support.settings.alwaysShowBorder.name",
		hint: "hex-size-support.settings.alwaysShowBorder.hint",
		scope: "world",
		type: Boolean,
		config: true,
		default: false,
		onChange: canvasRedraw,
	});

	game.settings.register("hex-size-support", "borderWidth", {
		name: "hex-size-support.settings.borderWidth.name",
		hint: "hex-size-support.settings.borderWidth.hint",
		scope: "world",
		type: Number,
		config: true,
		default: CONFIG.Canvas.objectBorderThickness,
		range: {
			min: 1,
			max: 20,
			step: 1,
		},
		onChange: val => {
			CONFIG.Canvas.objectBorderThickness = val;
			canvasRedraw();
		},
	});
	CONFIG.Canvas.objectBorderThickness = game.settings.get("hex-size-support", "borderWidth");

	game.settings.register("hex-size-support", "borderBehindToken", {
		name: "hex-size-support.settings.borderBehindToken.name",
		hint: "hex-size-support.settings.borderBehindToken.hint",
		scope: "world",
		type: Boolean,
		config: true,
		default: true,
		onChange: canvasRedraw,
	});

	game.settings.register("hex-size-support", "fillBorder", {
		name: "hex-size-support.settings.fillBorder.name",
		hint: "hex-size-support.settings.fillBorder.hint",
		scope: "world",
		type: Boolean,
		config: true,
		default: false,
		onChange: canvasRedraw,
	});

	/**
	 * Border Color Settings
	 */

	game.settings.register("hex-size-support", "controlledColor", {
		scope: "client",
		name: "hex-size-support.settings.controlledColor.name",
		type: new foundry.data.fields.ColorField({
			required: true,
			blank: false,
			initial: "#FF9829",
		}),
		config: true,
		onChange: val => {
			CONFIG.Canvas.dispositionColors.CONTROLLED = parseInt(val.substr(1), 16);
			canvasRedraw();
		},
	});
	CONFIG.Canvas.dispositionColors.CONTROLLED = parseInt(
		game.settings.get("hex-size-support", "controlledColor").substr(1),
		16
	);

	game.settings.register("hex-size-support", "partyColor", {
		scope: "client",
		name: "hex-size-support.settings.partyColor.name",
		type: new foundry.data.fields.ColorField({
			required: true,
			blank: false,
			initial: "#0A7AB2",
		}),
		config: true,
		onChange: val => {
			CONFIG.Canvas.dispositionColors.PARTY = parseInt(val.substr(1), 16);
			canvasRedraw();
		},
	});
	CONFIG.Canvas.dispositionColors.PARTY = parseInt(
		game.settings.get("hex-size-support", "partyColor").substr(1),
		16
	);

	game.settings.register("hex-size-support", "friendlyColor", {
		name: "hex-size-support.settings.friendlyColor.name",
		scope: "client",
		type: new foundry.data.fields.ColorField({
			required: true,
			blank: false,
			initial: "#0A7AB2",
		}),
		config: true,
		onChange: val => {
			CONFIG.Canvas.dispositionColors.FRIENDLY = parseInt(val.substr(1), 16);
			canvasRedraw();
		},
	});
	CONFIG.Canvas.dispositionColors.FRIENDLY = parseInt(
		game.settings.get("hex-size-support", "friendlyColor").substr(1),
		16
	);

	game.settings.register("hex-size-support", "neutralColor", {
		name: "hex-size-support.settings.neutralColor.name",
		scope: "client",
		type: new foundry.data.fields.ColorField({
			required: true,
			blank: false,
			initial: "#F1D836",
		}),
		config: true,
		onChange: val => {
			CONFIG.Canvas.dispositionColors.NEUTRAL = parseInt(val.substr(1), 16);
			canvasRedraw();
		},
	});
	CONFIG.Canvas.dispositionColors.NEUTRAL = parseInt(
		game.settings.get("hex-size-support", "neutralColor").substr(1),
		16
	);

	game.settings.register("hex-size-support", "hostileColor", {
		name: "hex-size-support.settings.hostileColor.name",
		scope: "client",
		type: new foundry.data.fields.ColorField({
			required: true,
			blank: false,
			initial: "#E72124",
		}),
		config: true,
		onChange: val => {
			CONFIG.Canvas.dispositionColors.HOSTILE = parseInt(val.substr(1), 16);
			canvasRedraw();
		},
	});
	CONFIG.Canvas.dispositionColors.HOSTILE = parseInt(
		game.settings.get("hex-size-support", "hostileColor").substr(1),
		16
	);

	// Register flipping to keybinds for those that want it.
	game.keybindings.register("hex-size-support", "swapOrientation", {
		name: "hex-size-support.keybinds.swapOrientation.name",
		hint: "hex-size-support.keybinds.swapOrientation.hint",
		onDown: flipControlledTokens,
		editable: [], //[{ key: "KeyR", modifiers: ["Shift"] }],
		precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL,
	});
}

/**
 * Toggle the orientation flag on all controlled tokens
 */
function flipControlledTokens() {
	const updates = canvas.tokens?.controlled.map(t => {
		return {
			_id: t.document.id,
			hexagonalShape: t.document.hexagonalShape ^ 1,
		};
	});
	canvas.scene?.updateEmbeddedDocuments("Token", updates).then(() => {
		canvas.tokens?.controlled.forEach(t => t.draw());
	});
}

/**
My sincerest affection and love for the Pilot NET Discord community. Without your support, patience and good feels I wouldn't have 
ever gotten this far. This is all for you now, I'm sorry I made you all wait for so long.
 - Ember Scaleborne <3

In regards to the 0.8.6 foundry update,
    My deepest thanks for the efforts of @FolkvangrForgent, @Eranziel, @The-E and @Bolts. Without your hard work and nagging, this update would
have been a lot later than it had any right to be be. Life seems to really enjoy kicking me right when a new update comes out >.>
 - Ember Scaleborne 06/26/2021 <3

Big huge thanks to Ember Scaleborne (@Ourobor). I would not have been
able to make this update if you hadn't made this module in the first
place. I hope you are doing well <3
 - Bolts, 09/18/2022
*/
