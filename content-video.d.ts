import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentVideo extends Components.ContentVideo, HTMLElement {}
export const ContentVideo: {
  prototype: ContentVideo;
  new (): ContentVideo;
};
