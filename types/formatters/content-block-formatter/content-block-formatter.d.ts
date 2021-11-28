import { HTMLStencilElement } from '../../stencil-public-runtime';
/**
 * @slot header - Header area, usually shown framed above or next to the content.
 * @slot content - Contents of the formatter, can be anything.
 * @slot - Default slot, same as content slot.
 */
export declare class ContentBlockFormatter {
  hasHeader: boolean;
  hostElement: HTMLStencilElement;
  componentWillLoad(): void;
  render(): any;
}
