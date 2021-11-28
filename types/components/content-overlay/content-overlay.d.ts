import { EventEmitter, HTMLStencilElement } from '../../stencil-public-runtime';
import { ContentLineTextAlignOptions, ContentVerticalAlignments, ResponsiveBoolean, ResponsiveString } from '../../typings';
import './libraries/aria-utilities';
import './libraries/aria-dialog';
/**
 * @slot closeButton - Contents of the <button> that will close the overlay when triggered.
 * @slot header - This is adjacent to the close button, usually a header or title for the overlay.
 * @slot content - Contents that sit inside the overlay.
 */
export declare class ContentOverlay {
  hostElement: HTMLStencilElement;
  /**
   * @type String
   * @responsive
   */
  target: string;
  /**
   * @type Boolean
   * @responsive
   */
  fullScreen: ResponsiveBoolean;
  /**
   * @type String
   * @responsive
   */
  styleClass: ResponsiveString;
  /**
   * A pipe delimited setting for horizontal alignment. This only applies when fullscreen mode is activated.
   * @type Select
   * @choice default
   * @choice left
   * @choice center
   * @choice right
   * @responsive
   */
  horizontalAlignment: ContentLineTextAlignOptions | ResponsiveString;
  /**
   * A pipe delimited setting for vertical alignment. This only applies when fullscreen mode is activated.
   * @type Select
   * @choice top
   * @choice center
   * @choice bottom
   */
  verticalAlignment: ContentVerticalAlignments | ResponsiveString;
  /**
   * Title attribute value for the close button.
   * @type String
   */
  closeTitle: string;
  isActive: boolean;
  activeClass: string;
  contentOverlayActivated: EventEmitter<HTMLElement>;
  private contentSlot;
  dialogElement: HTMLDivElement;
  contentElement: HTMLDivElement;
  isFullScreen: boolean;
  ariaDialog: any;
  onContentBlockActivated(event: CustomEvent): boolean;
  setComputedActiveClass(): void;
  componentWillLoad(): void;
  closeOverlayButtonClicked(event: any): void;
  onAriaDialogClosed(): void;
  render(): any;
}
