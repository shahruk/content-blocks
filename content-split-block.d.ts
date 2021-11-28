import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentSplitBlock extends Components.ContentSplitBlock, HTMLElement {}
export const ContentSplitBlock: {
  prototype: ContentSplitBlock;
  new (): ContentSplitBlock;
};
