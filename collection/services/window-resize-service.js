import { BehaviorSubject } from "rxjs";
import { getCurrentBreakpointIndex } from "../utils/utils";
class WindowResizeController {
  // timeoutHolder: Timeout;
  constructor() {
    this.currentBreakpoint = getCurrentBreakpointIndex();
    this.breakpointIndex$ = new BehaviorSubject(this.currentBreakpoint);
    window.addEventListener('resize', () => {
      this.timeoutHolder = window.setTimeout(() => {
        if (this.timeoutHolder) {
          clearTimeout(this.timeoutHolder);
        }
        let activeValue = getCurrentBreakpointIndex();
        if (this.breakpointIndex$.value === activeValue) {
          return false;
        }
        this.breakpointIndex$.next(activeValue);
      }, 100);
    });
  }
}
export const WindowResizeService = new WindowResizeController();
