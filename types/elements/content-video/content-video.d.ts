import { HTMLStencilElement } from '../../stencil-public-runtime';
import { ResponsiveString } from '../../typings';
export declare type SupportedVideoMethods = 'html5' | 'youtube';
/**
 * @slot poster - Poster shown before video is played.
 * @slot playButton - Play button contents.
 * @slot no-js-message - Contents of no JS message.
 * @slot content - Adjacent to no-js message for video. Usually not needed.
 * @slot - Default slot, same as content slot.
 */
export declare class ContentVideo {
  player: any;
  videoElement: HTMLVideoElement;
  hostElement: HTMLStencilElement;
  /**
   * If this video is opened within a container, e.g. a <content-overlay> with a target.
   * The height of the video will fit the container instead of resizing to the video aspect ratio.
   * @type Boolean
   * @responsive
   */
  fitContainer: boolean;
  /**
   * @type Select
   * @choice youtube
   * @choice html5
   */
  method: SupportedVideoMethods;
  /**
   * If you're using this inside a content-overlay for example, you may want the video to play immediately on launch.
   * @type Boolean
   */
  autoplay: boolean;
  /**
   * Supports YouTube and self hosted URLs.
   * @type String
   */
  src: string;
  /**
   * @type Number
   */
  width: number;
  /**
   * @type Number
   */
  height: number;
  /**
   * @type String
   */
  type: string;
  /**
   * @type String
   */
  playButtonAriaLabel: string;
  /**
   * @type String
   * @responsive
   */
  styleClass: ResponsiveString;
  /**
   * @type Boolean
   */
  controls: boolean;
  /**
   * @type String
   */
  preload: string;
  isLoaded: boolean;
  hasPoster: boolean;
  activeClass: string;
  isPlayed: boolean;
  computedVideoConfig(): object;
  initVideo(): void;
  componentDidRender(): void;
  onClickHandler(event: MouseEvent): void;
  render(): any;
}
