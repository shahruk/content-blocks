import { ResponsiveNumber, ResponsiveString } from '../../typings';
export declare class ContentImage {
  /**
   * @type Boolean
   */
  lazyLoad: boolean;
  /**
   * @type String
   * @responsive
   */
  src: ResponsiveString;
  /**
   * @type String
   * @responsive
   */
  alt: ResponsiveString;
  /**
   * @type Number
   * @responsive
   */
  width: ResponsiveNumber;
  /**
   * @type Number
   * @responsive
   */
  height: ResponsiveNumber;
  /**
   * @type String
   */
  videoType?: string;
  lazyLoadIsComplete: boolean;
  showVideo: boolean;
  activeMediaValues: {
    width: string;
    height: string;
    src: string;
    alt: string;
  };
  preloadImage(src: any): Promise<unknown>;
  componentWillLoad(): void;
  computedLazyLoadClass(): string;
  render(): any;
}
