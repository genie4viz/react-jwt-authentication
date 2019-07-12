import React, { useRef } from 'react';
import ReactTooltip from 'react-tooltip';
export const FieldChecker = props => {
  const { field, initValue, label, onChangeHandler } = props;
  const checkRef = useRef();
  const onChange = () => {
    let checked = checkRef.current.checked;
    onChangeHandler(field, checked);
  };

  return (
    <div style={{ display: 'flex', padding: '10px 10px 10px 40px' }}>
      <input
        type="checkbox"
        className="checkbox"
        checked={initValue}
        ref={checkRef}
        onChange={() => {
          onChange();
        }}
      />
      <span style={{ paddingLeft: '5px' }}>{label}</span>
      <span data-tip data-for="check_tip" style={{ color: 'blue', paddingLeft: '5px' }}>
        i
      </span>
      <ReactTooltip id="check_tip" type="warning" effect="solid">
        <span>Information ToolTip</span>
      </ReactTooltip>
    </div>
  );
};
