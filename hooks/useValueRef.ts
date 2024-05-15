import { useEffect, useRef } from 'react';

const useValueRef = (value: any) => {
  const ref = useRef(value);

  ref.current = value;

  useEffect(
    () => () => {
      ref.current = null;
    },
    []
  );

  return ref;
};

export default useValueRef;
