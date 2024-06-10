"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { NOOP_STORAGE, storageAvailable } from "../_util/storageUtils";

export interface StorageMapper<T> {
  toStorage: (value: T) => string;
  fromStorage: (value: string) => T;
}

export const buildJsonStorageMapper: <T>() => StorageMapper<T> = <T>() => ({
  toStorage: (value: T) => JSON.stringify(value),
  // THIS IS RECKLESS PROLLY DON'T MY GUY. Turns out in typescript the `as`
  // keyword is NOT a cast. It's a type assertion. It's like saying "I know
  // better than you, typescript. Trust me." We don't tho, we're assuming that
  // this hook is the ONLY one altering these keys. Improve this later (or
  // remove it if we should just use `any` instead of `T`).
  fromStorage: (value: string) => JSON.parse(value) as T,
});

export const useStorage = (): Storage => {
  const [storage, setStorage] = useState<Storage>(NOOP_STORAGE);
  useEffect(() => {
    setStorage(
      storageAvailable("localStorage") ? window.localStorage : NOOP_STORAGE
    );
  }, []);

  return storage;
};

export const useStoredState = <T>(
  key: string,
  defaultValue: T,
  mapper: StorageMapper<T> = buildJsonStorageMapper<T>()
): [T, Dispatch<SetStateAction<T>>] => {
  const storage = useStorage();
  const valueFromStorage = useCallback((): T => {
    const storedValue = storage.getItem(key);
    return storedValue ? mapper.fromStorage(storedValue) : defaultValue;
  }, [storage, key, defaultValue, mapper]);

  const [value, setValue] = useState(valueFromStorage());
  useEffect(() => {
    setValue(valueFromStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storage]);

  useEffect(() => {
    const toSave = mapper.toStorage(value);
    storage.setItem(key, toSave);

    // Omitting storage from the dependency array because it changing shouldn't
    // re-save the value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, key]);

  return [value, setValue];
};
