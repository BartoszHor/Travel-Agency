import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


const OrderOptionText = ({setOptionValue, currentValue}) => {

  return (
    <div className={styles.text}>
      <input type='text'
        onChange={event => setOptionValue(event.currentTarget.value)}
        value={currentValue}
      />
    </div>
  );
};

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionText;
