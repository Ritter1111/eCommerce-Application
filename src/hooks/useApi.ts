import {useState} from "react";

type FetchingFunction<T = string> = (args?: T) => Promise<void>;

export const useApi = (callback: FetchingFunction): [FetchingFunction, boolean, string] => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetching: FetchingFunction = async (...args: Parameters<FetchingFunction>) => {
      try {
          setIsLoading(true)
          await callback(...args)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
          setIsLoading(false)
      }
    }

    return [fetching, isLoading, error];
}