import React from 'react';

const Checkbox = (isChecked) => {

  return (
      <label className="checkbox">
        <input
          type="checkbox"
          checked={isChecked.checked}
        />
      </label>
  )
}

export default Checkbox;
