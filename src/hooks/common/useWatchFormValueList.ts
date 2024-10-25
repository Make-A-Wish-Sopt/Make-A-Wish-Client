import { Control, Path, useWatch } from 'react-hook-form';

type WatchObjectType<T> = {
  [K in keyof T as `${string & K}Watch`]: T[K];
};

export function useWatchTest<T extends object>(control: Control<T>): WatchObjectType<T> {
  const objectKeys = Object.keys(control._defaultValues) as Array<Path<T>>; // Path<T> 타입으로 변환

  const watchArrayValues = useWatch({
    control,
    name: [...objectKeys],
  });

  const watchObject = objectKeys.reduce((acc, key, index) => {
    const watchKey = `${key}Watch` as keyof WatchObjectType<T>;
    acc[watchKey] = watchArrayValues[index];
    return acc;
  }, {} as WatchObjectType<T>);

  return watchObject;
}
