import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentTextBlock extends Components.ContentTextBlock, HTMLElement {}
export const ContentTextBlock: {
  prototype: ContentTextBlock;
  new (): ContentTextBlock;
};
