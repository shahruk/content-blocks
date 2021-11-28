import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentBlockFormatter extends Components.ContentBlockFormatter, HTMLElement {}
export const ContentBlockFormatter: {
  prototype: ContentBlockFormatter;
  new (): ContentBlockFormatter;
};
