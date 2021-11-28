import { HTMLStencilElement } from '../../stencil-public-runtime';
import { ResponsiveBoolean } from '../../typings';
/**
 * @slot media - This slot is usually a video or image component.
 * @slot mediaContent - This is a layer that floats the media layer and is revealed on hover.
 * @slot content - This slot will usually serve a text block.
 * @slot - Default slot, same as content slot.
 */
export declare class ContentToutBlock {
  /**
   * If true, the media content will show only on hover
   * @type Boolean
   * @responsive
  */
  hover: ResponsiveBoolean;
  hostElement: HTMLStencilElement;
  hasMediaContent: boolean;
  hasHoverContent: boolean;
  componentWillLoad(): void;
  render(): any;
}
