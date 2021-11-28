import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentSpacingWrapper extends Components.ContentSpacingWrapper, HTMLElement {}
export const ContentSpacingWrapper: {
  prototype: ContentSpacingWrapper;
  new (): ContentSpacingWrapper;
};
