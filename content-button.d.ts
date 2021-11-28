import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentButton extends Components.ContentButton, HTMLElement {}
export const ContentButton: {
  prototype: ContentButton;
  new (): ContentButton;
};
