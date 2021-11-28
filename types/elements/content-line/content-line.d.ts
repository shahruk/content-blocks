import { ResponsiveNumber, ResponsiveString } from '../../typings';
export declare type ContentLineTagOptions = 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'section' | 'article';
export declare type ContentLineTextAlignOptions = 'default' | 'left' | 'center' | 'right';
/**
 * @slot content - Inner contents of the line, usually plaintext.
 * @slot - Default slot, same as content slot.
 */
export declare class ContentBlockLine {
  /**
   * Pipe separated list of ContentLineTextAlignOptions for text alignment.
   * @type Select
   * @choice default
   * @choice left
   * @choice center
   * @choice right
   * @responsive
   */
  textAlign: ContentLineTextAlignOptions | ResponsiveString;
  /**
   * The font class for the line.
   * @type String
   * @responsive
   */
  styleClass: ResponsiveString;
  /**
   * Pipe separated list of max width numbers. You can also use units such as "px" and "vw".
   * @type Percentage
   * @responsive
   */
  maxWidth: ResponsiveNumber;
  activeClass: string;
  innerActiveClass: string;
  inlineStyle: {
    [key: string]: string;
  };
  componentWillLoad(): void;
  render(): any;
}
