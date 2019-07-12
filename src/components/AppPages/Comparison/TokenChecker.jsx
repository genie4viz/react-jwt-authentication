import React, { useRef } from 'react';

export const TokenChecker = props => {
  const { coin_id, initValue, onChange } = props;
  const checkRef = useRef();
  const onChangeHandler = () => {
    let checked = checkRef.current.checked;
    onChange(coin_id, checked);
  };
  return (
    <input
      type="checkbox"
      className="checkbox"
      checked={initValue}
      ref={checkRef}
      onChange={() => {
        onChangeHandler();
      }}
    />
  );
};
