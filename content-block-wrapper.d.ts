import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentBlockWrapper extends Components.ContentBlockWrapper, HTMLElement {}
export const ContentBlockWrapper: {
  prototype: ContentBlockWrapper;
  new (): ContentBlockWrapper;
};
