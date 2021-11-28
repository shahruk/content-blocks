declare class ContentEventsController {
  firstRun: boolean;
  timeoutHolder: any;
  elementsListening: any[];
  constructor();
  attachElement(elem: any): void;
  getElementsListening(): any[];
}
export declare const ContentEventsService: ContentEventsController;
export {};
