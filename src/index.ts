export { given, When, WhenEach } from './next-gen';

export const describeGiven = (name: string, fn: () => void) => {
  describe(`GIVEN ${name}`, fn);
};

describeGiven.only = (name: string, fn: () => void) => {
  describe.only(`GIVEN ${name}`, fn);
};

export const xdescribeGiven = (name: string, fn: () => void) => {
  xdescribe(`GIVEN ${name}`, fn);
};

export const when = (name: string, fn: () => void) => {
  describe(`WHEN ${name}`, fn);
};

when.each = <T extends any[] | [any]>(cases: ReadonlyArray<T>) => (name: string, fn: (...args: T) => void) => {
  describe.each(cases)(`WHEN ${name}`, fn);
};

when.only = (name: string, fn: () => void) => {
  describe.only(`WHEN ${name}`, fn);
};

when.skip = (name: string, fn: () => void) => {
  describe.skip(`WHEN ${name}`, fn);
};

export const xwhen = (name: string, fn: () => void) => {
  xdescribe(`WHEN ${name}`, fn);
};

interface DoneCallback {
  (...args: any[]): any;
  fail(error?: string | { message: string }): any;
}

type ProvidesCallback = (cb: DoneCallback) => any;

export const then = (name: string, fn: ProvidesCallback) => {
  it(`THEN ${name}`, fn);
};

then.each = <T>(cases: ReadonlyArray<T>) => (name: string, fn: (...args: T[]) => any) => {
  it.each(cases)(`THEN ${name}`, fn);
};

then.only = (name: string, fn: ProvidesCallback) => {
  it.only(`THEN ${name}`, fn);
};

then.skip = (name: string, fn: ProvidesCallback) => {
  it.skip(`THEN ${name}`, fn);
};

export const xthen = (name: string, fn: ProvidesCallback) => {
  xit(`THEN ${name}`, fn);
};
