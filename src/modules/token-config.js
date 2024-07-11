/**
 * @param {TokenConfig} app
 * @param {JQuery<HTMLElement>} $el
 * @param {object} data
 */
export function extendTokenConfig(app, $el) {
	$el.find("[name=mirrorX]").closest(".form-group").after(`
	<div class="form-group slim">
		<label>${game.i18n.localize("hex-size-support.tokenConfig.hideBorder.label")}</label>
		<div class="form-fields">
			<input type="checkbox" step="1" name="flags.hex-size-support.hideBorder" ${
				app.object.getFlag("hex-size-support", "hideBorder") ? "checked" : ""
			}>
		</div>
	</div>
	`);

	let x = $el.find("[name=scale]");
	x.attr("max", Number(5.0));
	x.attr("step", Number(0.01));

	app.setPosition();
}
