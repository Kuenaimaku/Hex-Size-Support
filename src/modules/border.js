export function registerBorderWrappers() {
	libWrapper.register(
		"hex-size-support",
		"Token.prototype._refreshBorder",
		/** @this Token */
		function () {
			/** @type boolean */
			const always_show = game.settings.get("hex-size-support", "alwaysShowBorder");
      const options = {};
      if (always_show) options.hover = true;

			this.border.clear();
			if (!this.isVisible) return;
			const borderColor = this._getBorderColor(options);
			if (borderColor == null) return;
			const t = CONFIG.Canvas.objectBorderThickness;
			this.border.position.set(this.document.x, this.document.y);

			// Draw Hex border for size 1 tokens on a hex grid
			if (canvas.grid.isHex) {
				const polygon = canvas.grid.grid.getBorderPolygon(
					this.document.width,
					this.document.height,
					t
				);
				if (polygon) {
					this.border.lineStyle(t, 0x000000, 0.8).drawPolygon(polygon);
					this.border.lineStyle(t / 2, borderColor, 1.0).drawPolygon(polygon);
					return;
				}
			}

			// Otherwise, draw square border
			const h = Math.round(t / 2);
			const o = Math.round(h / 2);
			this.border.lineStyle(t, 0x000000, 0.8).drawRoundedRect(-o, -o, this.w + h, this.h + h, 3);
			this.border.lineStyle(h, borderColor, 1.0).drawRoundedRect(-o, -o, this.w + h, this.h + h, 3);
		},
		"OVERRIDE"
	);
}
