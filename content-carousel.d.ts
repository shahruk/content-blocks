import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentCarousel extends Components.ContentCarousel, HTMLElement {}
export const ContentCarousel: {
  prototype: ContentCarousel;
  new (): ContentCarousel;
};
