import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentTabs extends Components.ContentTabs, HTMLElement {}
export const ContentTabs: {
  prototype: ContentTabs;
  new (): ContentTabs;
};
