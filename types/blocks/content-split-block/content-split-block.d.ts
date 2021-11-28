import { ResponsiveBoolean } from '../../typings';
/**
 * @slot column1 - This will be column 1.
 * @slot column2 - This will be column 2.
 */
export declare class ContentSplitBlock {
  /**
   * @type Boolean
   * @responsive
   */
  reverse: ResponsiveBoolean | boolean;
  /**
   * @type String
   * @responsive
   */
  background: string;
  activeClass: string;
  activeBackground: string;
  componentWillLoad(): void;
  render(): any;
}
