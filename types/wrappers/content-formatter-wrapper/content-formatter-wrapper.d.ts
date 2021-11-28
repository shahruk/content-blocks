/**
 * @slot content - Contents of the wrapper, can be anything.
 * @slot - Default slot, same as content slot.
 */
export declare class ContentFormatterWrapper {
  background: string;
  name: string;
  extraClasses: string;
  outerClassName: string;
  innerClassName: string;
  computedClassString(): string;
  render(): any;
}
