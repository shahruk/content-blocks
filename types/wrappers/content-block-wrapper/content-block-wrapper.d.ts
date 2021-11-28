import { EventEmitter } from '../../stencil-public-runtime';
import { HTMLStencilElement } from '../../stencil-public-runtime';
import { ResponsiveNumber, ResponsiveString } from '../../typings';
/**
 * @slot content - Inner contents of the block, can be anything.
 * @slot - Default slot, same as content slot.
 */
export declare class ContentBlockWrapper {
  contentBlockReady: EventEmitter<HTMLElement>;
  hostElement: HTMLStencilElement;
  styleObject: {
    [key: string]: string;
  };
  background: ResponsiveString;
  name: string;
  styleClass: ResponsiveString;
  backgroundClasses: string;
  maxWidth: ResponsiveNumber;
  activeClass: string;
  inlineStyle?: {
    [key: string]: string;
  };
  innerClassName: string;
  computedBackgroundClassString(): string;
  componentWillLoad(): void;
  componentDidRender(): void;
  render(): any;
}
