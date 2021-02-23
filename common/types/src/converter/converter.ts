export type Converter<I = any, O = any> = (inputs: I) => Promise<O>;
