export {};

declare global {
  var NativeMath: {
    add(a: number, b: number): number;
    multiply(a: number, b: number): number;
  };
}
