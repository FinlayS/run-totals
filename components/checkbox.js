import React from 'react';

const Checkbox = (isChecked) => {

  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          checked={isChecked.checked}
        />
      </label>
    </div>
  )
}

export default Checkbox;
