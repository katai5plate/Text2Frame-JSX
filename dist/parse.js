"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parse = (component) => {
    if (typeof component.type === "function") {
        const { children, ...rest } = component.props || {};
        const parsedRest = Object.entries(rest).reduce((a, [k, v]) => {
            a[k] = v.$$typeof === Symbol.for("react.element") ? (0, exports.parse)(v) : v;
            return a;
        }, {});
        const parsedChildren = children
            ? (0, exports.parse)(children)
            : "";
        return component.type({ ...parsedRest, children: parsedChildren });
    }
    if (component.props?.children) {
        if (Array.isArray(component.props.children)) {
            return component.props.children.map((child) => (0, exports.parse)(child)).join("\n");
        }
        else {
            return (0, exports.parse)(component.props.children);
        }
    }
    return component;
};
exports.parse = parse;
