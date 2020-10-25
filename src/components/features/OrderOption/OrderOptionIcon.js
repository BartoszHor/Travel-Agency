import React from 'react';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';
import Icon from '../../common/Icon/Icon';
import PropTypes from 'prop-types';

const OrderOptionIcon = ({values, setOptionValue, currentValue}) => {

  return (
    <div className={styles.icon}>
      {values.map(value => (
        <div
          onClick={ () => setOptionValue(value.id)}
          key={value.id}
          className={(value.id != currentValue) ? styles.icon : styles.iconActive }
        >
          <Icon name={value.icon}/> {value.name} ({formatPrice(value.price)})
        </div>
      ))}
    </div>
  );
};

OrderOptionIcon.propTypes = {
  values: PropTypes.array,
  'values.map': PropTypes.func,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionIcon;
