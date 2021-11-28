import { FLEX_JUSTIFY_OPTIONS, GRID_TYPES, ResponsiveBoolean, ResponsiveNumber, ResponsiveString } from '../../typings';
/**
 * @slot media - This slot can either be a video or image component.
 * @slot content - This slot will usually serve a content text block.
 */
export declare class ContentGridFormatter {
  /**
   * @type Select
   * @choice flex
   * @choice grid
   * @responsive
   */
  type: GRID_TYPES | ResponsiveString;
  /**
   * @type Boolean
   * @responsive
   */
  flexGrow: ResponsiveBoolean;
  /**
   * @type Boolean
   * @responsive
   */
  flexShrink: ResponsiveBoolean;
  /**
   * @type Select
   * @choice flex-start
   * @choice space-between
   * @choice center
   * @choice space-evenly
   * @responsive
   */
  flexAlign: FLEX_JUSTIFY_OPTIONS | ResponsiveString;
  /**
 * @type Number
 * @responsive
 */
  columns: ResponsiveNumber;
  activeClassString: string;
  componentWillLoad(): void;
  render(): any;
}
