import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLStencilElement } from '../../stencil-public-runtime';
/**
 * @slot content - Inner contents of the button, usually plaintext.
 * @slot - Default slot, same as content slot.
 * @slot activatedContent - If this slot is used, the content in this will be scrolled to and triggered.
 */
export declare class ContentButton {
  hostElement: HTMLStencilElement;
  /**
   * @type URL
   */
  href: string;
  /**
   * @type String
   */
  target: string;
  /**
   * @type String
   */
  styleClass?: string;
  /**
   * @type Boolean
   */
  clickableBlock: boolean;
  /**
   * @type String
   */
  expanded: string;
  /**
   * @type String
   */
  controls: string;
  activeClass: string;
  hasContentToActivate: boolean;
  activatedContent: HTMLDivElement;
  contentBlockActivated: EventEmitter<HTMLElement>;
  componentWillLoad(): void;
  onHandleClickEvent(ev: any): void;
  render(): any;
}
