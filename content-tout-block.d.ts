import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentToutBlock extends Components.ContentToutBlock, HTMLElement {}
export const ContentToutBlock: {
  prototype: ContentToutBlock;
  new (): ContentToutBlock;
};
