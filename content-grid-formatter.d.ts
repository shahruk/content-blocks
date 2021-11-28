import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentGridFormatter extends Components.ContentGridFormatter, HTMLElement {}
export const ContentGridFormatter: {
  prototype: ContentGridFormatter;
  new (): ContentGridFormatter;
};
