import { HTMLStencilElement } from '../../stencil-public-runtime';
import { BehaviorSubject } from 'rxjs';
import { SwiperOptions } from 'swiper/bundle';
/**
 * @slot content - This slot will usually serve a content hero block or image.
 * @slot - Default slot, same as content slot.
 */
export declare type InitMethodType = 'load' | 'event';
export declare class ContentCarousel {
  hostElement: HTMLStencilElement;
  /**
   * @type Select
   * @choice load
   * @choice init
   */
  initMethod: InitMethodType;
  /**
   * @type String
   * @responsive
   */
  background: string;
  swiperOptions: string;
  swiperCarousel: any;
  swiperContainer?: HTMLDivElement;
  swiperWrapper?: HTMLDivElement;
  swiperPagination?: HTMLDivElement;
  swiperPrevElement?: HTMLDivElement;
  swiperNextElement?: HTMLDivElement;
  swiperScrollbar?: HTMLDivElement;
  swiperOptionsFinal: SwiperOptions;
  loadStatus: BehaviorSubject<boolean>;
  getSwiperOptions(newOptions: SwiperOptions | string): SwiperOptions;
  componentDidLoad(): void;
  setSwiperOptionsCallback(event: CustomEvent): void;
  initSwiper(): Promise<void>;
  render(): any;
}
