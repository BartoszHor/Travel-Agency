import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
  <select
    className={styles.dropdown}
    value={currentValue}
    onChange={event => setOptionValue(event.currentTarget.value)}
    required = {true}
  >
    {required ? '' : (
      <option key='null' value=''>Choose Your car</option>
    )}
    {values.map(value => (
      <option key={value.id} value={value.id}> {value.name} ({formatPrice(value.price)}) </option>
    ))}
  </select>
);

OrderOptionDropdown.propTypes = {
  values: PropTypes.array,
  'values.map': PropTypes.func,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
  required: PropTypes.node,
};

export default OrderOptionDropdown;
