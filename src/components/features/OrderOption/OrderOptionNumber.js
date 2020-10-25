import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import PropTypes from 'prop-types';


const OrderOptionNumber = ({limits, setOptionValue, price, currentValue}) => (
  <div className={styles.number}>
    <input
      className={styles.inputSmall}
      type='number'
      min={limits.min} max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)}
      value={currentValue}
    />
    ( +{formatPrice(price)})
  </div>
);

OrderOptionNumber.propTypes = {
  limits: PropTypes.object,
  price: PropTypes.string,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionNumber;
