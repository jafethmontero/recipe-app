import { FirebaseError } from 'firebase/app';
import { useCallback, useDebugValue, useMemo, useState } from 'react';
import useValueRef from './useValueRef';

type ErrorT = FirebaseError | null;

type StateType = {
  error: ErrorT;
  pending: boolean;
};

const useFirebaseApiCallback = (
  callback: (...args: any) => Promise<any>,
  deps: React.DependencyList
): [(args?: any) => void, boolean, ErrorT] => {
  const [state, setState] = useState<StateType>({ pending: false, error: null });

  const callbackRef = useValueRef(callback);

  const firebaseApiCallback = useCallback(
    async (...args: any) => {
      const callback = callbackRef.current;

      if (callback) {
        setState({ pending: true, error: null });
        try {
          await callback(...args);
          setState({ pending: false, error: null });
        } catch (error) {
          if (error instanceof FirebaseError) {
            setState({ pending: false, error });
          }
        }
      }
    },
    [deps]
  );

  const result = useMemo(
    () => [firebaseApiCallback, state.pending, state.error],
    [state.pending, state.error]
  );
  useDebugValue(result);
  return result as [(args?: any) => void, boolean, ErrorT];
};

export { useFirebaseApiCallback };
