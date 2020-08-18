import React from 'react';

const Checkbox = (isChecked) => {

  return (
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isChecked.checked}
          readOnly={true}
        />
      </label>
  )
}

export default Checkbox;
