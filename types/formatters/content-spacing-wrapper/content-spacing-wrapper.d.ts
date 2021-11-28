import { ContentLineTextAlignOptions, ResponsiveBoolean, ResponsiveNumber, ResponsiveString } from '../../typings';
/**
 * @slot content - Inner contents of spacing wrapper, can be anything.
 * @slot - Default slot, same as content slot.
 */
export declare class ContentSpacingWrapper {
  /**
   * Pipe separated list of max width numbers. You can also use units such as "px" and "vw".
   * @type Percentage
   * @responsive
   */
  maxWidth: ResponsiveNumber;
  /**
   * Pipe separated boolean values for full height. Typically, this is used if you have a hero block and you want a footer that aligns with the text layer. This is a niche case, but a valid one.
   * @type Boolean
   * @responsive
   */
  fullHeight: ResponsiveBoolean;
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
   * Pipe separated list of ContentLineTextAlignOptions for where to place text box when a max width is specified.
   * @type Select
   * @choice default
   * @choice left
   * @choice center
   * @choice right
   * @responsive
   */
  horizontalAlignment: ContentLineTextAlignOptions | ResponsiveString;
  /**
   * Pipe separated numbers between 0 and 100.
   * @type Number
   * @responsive
   */
  topOffset: ResponsiveNumber;
  /**
   * Pipe separated numbers between 0 and 100.
   * @type Number
   * @responsive
   */
  bottomOffset: ResponsiveNumber;
  /**
   * Pipe separated numbers between 0 and 100.
   * @type Number
   * @responsive
   */
  leftOffset: ResponsiveNumber;
  /**
   * Pipe separated numbers between 0 and 100.
   * @type Number
   * @responsive
   */
  rightOffset: ResponsiveNumber;
  /**
   * A custom class to use as the offset. This cannot be pipe separated, because this causes repaint of content.
   * @type String
   */
  offsetClass: string;
  inlineStyle?: {
    [key: string]: string;
  };
  componentWillLoad(): void;
  computedClasses(): string;
  computedOffsetClasses(): string;
  render(): any;
}
