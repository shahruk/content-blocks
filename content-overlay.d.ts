import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentOverlay extends Components.ContentOverlay, HTMLElement {}
export const ContentOverlay: {
  prototype: ContentOverlay;
  new (): ContentOverlay;
};
