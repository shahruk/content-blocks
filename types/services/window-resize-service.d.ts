import { BehaviorSubject } from "rxjs";
declare class WindowResizeController {
  currentBreakpoint: number;
  breakpointIndex$: BehaviorSubject<number>;
  timeoutHolder: number;
  constructor();
}
export declare const WindowResizeService: WindowResizeController;
export {};
