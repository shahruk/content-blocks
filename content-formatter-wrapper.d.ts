import type { Components, JSX } from "../content-blocks-stenciljs/dist/types/typings";

interface ContentFormatterWrapper extends Components.ContentFormatterWrapper, HTMLElement {}
export const ContentFormatterWrapper: {
  prototype: ContentFormatterWrapper;
  new (): ContentFormatterWrapper;
};
