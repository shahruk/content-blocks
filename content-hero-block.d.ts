import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentHeroBlock extends Components.ContentHeroBlock, HTMLElement {}
export const ContentHeroBlock: {
  prototype: ContentHeroBlock;
  new (): ContentHeroBlock;
};
