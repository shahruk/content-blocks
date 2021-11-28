import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentAccordion extends Components.ContentAccordion, HTMLElement {}
export const ContentAccordion: {
  prototype: ContentAccordion;
  new (): ContentAccordion;
};
