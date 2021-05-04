type WhenFunction<S> = (setup: S) => void;

export interface When<S> {
  // tslint:disable-next-line ban-types
  (name: number | string | Function | jest.FunctionLike, fn: WhenFunction<S>): void;
  /** Only runs the tests inside this `describe` for the current file */
  only: When<S>;
  /** Skips running the tests inside this `describe` for the current file */
  skip: When<S>;
  each: WhenEach<S>;
}

export interface WhenEach<S> {
  // Exclusively arrays.
  <T extends any[] | [any]>(cases: ReadonlyArray<T>): (name: string, fn: (setup: S, ...args: T) => any, timeout?: number) => void;
  <T extends ReadonlyArray<any>>(cases: ReadonlyArray<T>): (name: string, fn: (setup: S, ...args: ExtractEachCallbackArgs<T>) => any, timeout?: number) => void;
  // Not arrays.
  <T>(cases: ReadonlyArray<T>): (name: string, fn: (setup: S, ...args: T[]) => any, timeout?: number) => void;
  (cases: ReadonlyArray<ReadonlyArray<any>>): (
    name: string,
    fn: (setup: S, ...args: any[]) => any,
    timeout?: number
  ) => void;
  (strings: TemplateStringsArray, ...placeholders: any[]): (
    name: string,
    fn: (setup: S, arg: any) => any,
    timeout?: number
  ) => void;
}

const then = (name: string, thenFn: jest.ProvidesCallback) => {
  it(`THEN ${name}`, thenFn);
};

then.each = <T>(cases: ReadonlyArray<T>) => (name: string, thenFn: (...args: T[]) => any) => {
  it.each(cases)(`THEN ${name}`, thenFn);
};

then.only = (name: string, thenFn: jest.ProvidesCallback) => {
  it.only(`THEN ${name}`, thenFn);
};

then.skip = (name: string, thenFn: jest.ProvidesCallback) => {
  it.skip(`THEN ${name}`, thenFn);
};

then.todo = (name: string) => {
  it.todo(`THEN ${name}`);
};

export const given = <S>(name: string, setup: () => S, fn: (when: When<S>, then: jest.It) => void) => {
  describe(`GIVEN ${name}`, () => {
    const whenImpl = (name: string, whenFn: (state: S) => void) => {
      describe(`WHEN ${name}`, () => {
        whenFn(setup())
      });
    };

    whenImpl.each = <T extends any[] | [any]>(cases: ReadonlyArray<T>) => (name: string, whenFn: (state: S, ...args: T) => void) => {
      describe.each(cases)(`WHEN ${name}`, (...passedArgs) => {
        whenFn(setup(), ...passedArgs);
      });
    };

    whenImpl.only = (name: string, whenFn: (state: S) => void) => {
      describe.only(`WHEN ${name}`, () => {
        whenFn(setup())
      });
    };

    whenImpl.skip = (name: string, whenFn: (state: S) => void) => {
      describe.skip(`WHEN ${name}`, () => {
        whenFn(setup())
      });
    };

    fn(whenImpl as When<S>, then as jest.It);
  });
}

given.only = (name: string, _setup: () => any, _fn: (when: When<any>, then: jest.It) => void) => {
  describe.only(`GIVEN ${name}`, () => { });
};

given.skip = (name: string, _setup: () => any, _fn: (when: When<any>, then: jest.It) => void) => {
  describe.skip(`GIVEN ${name}`, () => { });
};
