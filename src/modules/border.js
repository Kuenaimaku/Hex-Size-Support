export function registerBorderWrappers() {
	// Make gridless tokens round
	libWrapper.register(
		"hex-size-support",
		"Token.prototype.getShape",
		/** @this {Token} */
		function (wrapped) {
			const size = this.getSize();
			if (canvas.grid.isGridless && size.width === size.height) {
				return new PIXI.Circle(size.width / 2, size.height / 2, size.width / 2);
			}
			return wrapped();
		},
		"MIXED"
	);

	libWrapper.register(
		"hex-size-support",
		"Token.prototype._refreshState",
		/** @this {Token} */
		function (wrapped) {
			/** @type {boolean} */
			const hideBorder = this.document.getFlag("hex-size-support", "hideBorder");
			wrapped();
			const secret = this.document.disposition !== CONST.TOKEN_DISPOSITIONS.SECRET;
			if (this.hover && game.settings.get("hex-size-support", "borderBehindToken")) {
				this.addChildAt(this.voidMesh, this.getChildIndex(this.border) + 1);
				this.zIndex = this.mesh.zIndex = 2;
			}
			if (game.settings.get("hex-size-support", "alwaysShowBorder")) {
				this.border.visible = !this.document.isSecret;
			}
			this.borderFill.visible = !this.document.isSecret;
			this.borderFill.tint = this.border.tint;
			if (hideBorder) this.border.visible = this.borderFill.visible = false;
		},
		"WRAPPER"
	);

	// Add layer for border fill
	libWrapper.register(
		"hex-size-support",
		"Token.prototype._draw",
		/** @this {Token} */
		async function (wrapped, options) {
			await wrapped(options);
			this.borderFill ||= this.addChildAt(new PIXI.Graphics(), 0);
		},
		"WRAPPER"
	);
	libWrapper.register(
		"hex-size-support",
		"Token.prototype._refreshBorder",
		function (wrapped) {
			wrapped();
			if (!game.settings.get("hex-size-support", "fillBorder")) return;
			this.borderFill.clear();
			this.borderFill.beginFill(0xffffff, 0.3);
			this.borderFill.drawShape(this.shape);
		},
		"WRAPPER"
	);
}
