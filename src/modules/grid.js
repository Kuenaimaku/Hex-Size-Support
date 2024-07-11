/**
 * Determine whether the token should use the alternate orientation
 * @param {Token} token
 */
export function isAltOrientation(token) {
	return !!(token.document.hexagonalShape & 1);
}
