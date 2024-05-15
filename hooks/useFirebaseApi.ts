import { useDebugValue, useEffect, useMemo, useState } from 'react';
import useValueRef from './useValueRef';
import { FirebaseError } from 'firebase/app';

type ErrorT = FirebaseError | null;

type StateType = {
  error: ErrorT;
  pending: boolean;
};

const useFirebaseApi = (
  getApiPromise: () => Promise<any>,
  callback: (result: any, error?: FirebaseError | null) => void,
  deps: React.DependencyList
): [boolean, ErrorT] => {
  const [state, setState] = useState<StateType>({ pending: false, error: null });

  const getPromiseRef = useValueRef(getApiPromise);
  const callbackRef = useValueRef(callback);

  useEffect(() => {
    const getPromise = getPromiseRef.current;
    const callback = callbackRef.current;

    if (getPromise) {
      (async () => {
        if (callback) {
          callback(null, null);
        }
        const promise = getPromise();
        if (!promise) {
          setState({ pending: false, error: null });
          return;
        }

        let result;
        try {
          setState({ pending: true, error: null });
          result = await promise;
        } catch (error) {
          if (error instanceof FirebaseError) {
            setState({ pending: false, error });
          }
          if (callback) {
            callback(null, error);
          }
          return;
        }

        setState({ pending: false, error: null });
        if (callback) {
          callback(result, null);
        }
      })();
    } else {
      setState({ pending: false, error: null });
    }
  }, deps || []);

  const result = useMemo(() => [state.pending, state.error], [state.pending, state.error]);
  useDebugValue(result);
  return result as [boolean, ErrorT];
};

export { useFirebaseApi };
