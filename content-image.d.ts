import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentImage extends Components.ContentImage, HTMLElement {}
export const ContentImage: {
  prototype: ContentImage;
  new (): ContentImage;
};
