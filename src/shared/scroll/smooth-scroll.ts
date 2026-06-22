type ScrollToOptions = {
  immediate?: boolean;
};

export function scrollToPosition(y: number, options?: ScrollToOptions) {
  window.scrollTo({
    top: y,
    left: 0,
    behavior: options?.immediate ? "instant" : "auto",
  });
}

export function scrollToElement(element: Element, options?: ScrollToOptions) {
  element.scrollIntoView({
    behavior: options?.immediate ? "instant" : "auto",
    block: "start",
  });
}
