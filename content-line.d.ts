import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentLine extends Components.ContentLine, HTMLElement {}
export const ContentLine: {
  prototype: ContentLine;
  new (): ContentLine;
};
