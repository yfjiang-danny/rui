import { MutableRefObject } from "react";

// Check is browser
const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

// Target type
export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(
  target: BasicTarget<T>,
  defaultElement?: T
): TargetValue<T> {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (typeof target === "function") {
    targetElement = target();
  } else if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}
