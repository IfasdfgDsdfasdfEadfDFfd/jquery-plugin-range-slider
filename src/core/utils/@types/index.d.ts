type MemoFunc<TArgs, TResult> = (args: TArgs) => TResult;

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
