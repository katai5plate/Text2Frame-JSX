import { ReactElementObject } from "./type";

export const parse = (
  component: ReactElementObject
): ReactElementObject | string => {
  if (typeof component.type === "function") {
    const { children, ...rest } = component.props || {};
    const parsedRest = Object.entries(rest).reduce(
      (a: { [key: string]: any }, [k, v]) => {
        a[k] = v.$$typeof === Symbol.for("react.element") ? parse(v) : v;
        return a;
      },
      {}
    );
    const parsedChildren = children
      ? parse(children as ReactElementObject)
      : "";
    return component.type({ ...parsedRest, children: parsedChildren });
  }
  if (component.props?.children) {
    if (Array.isArray(component.props.children)) {
      return component.props.children.map((child) => parse(child)).join("\n");
    } else {
      return parse(component.props.children);
    }
  }
  return component;
};
