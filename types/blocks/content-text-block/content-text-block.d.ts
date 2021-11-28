import { HTMLStencilElement } from '../../stencil-public-runtime';
import { ContentVerticalAlignments, ResponsiveString } from '../../typings';
/**
 * @slot content - This slot will usually serve a text block.
 * @slot footer - This slot is placed below the content slot
 * @slot - Default slot, same as content slot
 */
export declare class ContentTextBlock {
  /**
   * This is a pipe separated string representing the style class.
   * @type String
   * @responsive
   */
  styleClass: ResponsiveString;
  /**
   * @type String
   * @responsive
   */
  background: ResponsiveString;
  /**
   * Pipe separated list of ContentVerticalAlignments for text box placement.
   * @type Select
   * @choice top
   * @choice center
   * @choice bottom
   * @responsive
   */
  verticalAlignment: ContentVerticalAlignments | ResponsiveString;
  hostElement: HTMLStencilElement;
  computedClasses(): string;
  computedBackgroundClasses(): string;
  render(): any;
}
