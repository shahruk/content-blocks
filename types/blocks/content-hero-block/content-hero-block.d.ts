import { HTMLStencilElement } from '../../stencil-public-runtime';
import { ResponsiveString } from '../../typings';
export declare type HeroContentPlacementOptions = 'above' | 'below';
/**
 * @slot media - This slot is usually either a video or image component.
 * @slot content - This slot will usually serve a text block.
 * @slot - Default slot, same as content slot
 */
export declare class ContentHeroBlock {
  hostElement: HTMLStencilElement;
  hasMedia: boolean;
  /**
   * Pipe separated HeroContentPlacementOptions that will determine where the content is positioned with the media.
   * @type Select
   * @choice below
   * @choice above
   * @responsive
   */
  contentPosition: ResponsiveString | HeroContentPlacementOptions;
  /**
   * @type String
   * @responsive
   */
  background: ResponsiveString;
  activeClasses: string;
  revealHiddenContent: boolean;
  hasHiddenContent: boolean;
  componentWillLoad(): void;
  computedClasses(): string;
  computedContentClasses(): string;
  computedBackgroundClasses(): string;
  contentBlockActivationHandler(event: CustomEvent<HTMLElement>): void;
  render(): any;
}
