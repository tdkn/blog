export * from "./post";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      Prism: any;
    }
  }
}
declare global {
  interface Window {
    Prism: any;
  }
}
