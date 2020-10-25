import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const newValueSet = (currentValue, id, checked) => {

  if(checked){
    return [
      ...currentValue,
      id,
    ];
  } else {
    return currentValue.filter(value => value != id);
  }
};

const OrderOptionCheckboxes = ({values, currentValue, setOptionValue}) => {
  return (
    <div className={styles.checkboxes}>
      {values.map(value => (
        <label key={value.id}>
          <input
            value={value.id}
            checked={(currentValue.indexOf(value.id) > -1) ? true : false}
            type='checkbox'
            onChange={event => setOptionValue(newValueSet(currentValue, value.id, event.currentTarget.checked))}
          />
          {value.name + ' ' + formatPrice(value.price)}
        </label>
      ))}
    </div>
  );
};

OrderOptionCheckboxes.propTypes = {
  values: PropTypes.array,
  'values.map': PropTypes.func,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionCheckboxes;
