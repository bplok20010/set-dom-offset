import css from "dom-helpers/css";
import offset from "dom-helpers/offset";
import position from "dom-helpers/position";

export default function setOffset(
	node: HTMLElement,
	pos: { top: number; left?: number } | { top?: number; left: number }
) {
	let curPosition,
		curLeft,
		curCSSTop,
		curTop,
		curOffset,
		curCSSLeft,
		calculatePosition,
		positionState = css(node, "position"),
		props: {
			left?: string;
			top?: string;
		} = {};

	// Set position first, in-case top/left are set even on static elem
	if (positionState === "static") {
		node.style.position = "relative";
	}

	curOffset = offset(node);
	curCSSTop = css(node, "top");
	curCSSLeft = css(node, "left");
	calculatePosition =
		(positionState === "absolute" || positionState === "fixed") &&
		(curCSSTop + curCSSLeft).indexOf("auto") > -1;

	// Need to be able to calculate position if either
	// top or left is auto and position is either absolute or fixed
	if (calculatePosition) {
		curPosition = position(node);
		curTop = curPosition.top;
		curLeft = curPosition.left;
	} else {
		curTop = parseFloat(curCSSTop) || 0;
		curLeft = parseFloat(curCSSLeft) || 0;
	}

	if (pos.top != null) {
		props.top = pos.top - curOffset.top + curTop + "px";
	}
	if (pos.left != null) {
		props.left = pos.left - curOffset.left + curLeft + "px";
	}

	css(node, props);
}
