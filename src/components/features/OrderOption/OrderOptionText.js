import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';


const OrderOptionText = ({setOptionValue, currentValue, inputType}) => {

  return (
    <div className={styles.text}>
      <input type={inputType}
        onChange={event => setOptionValue(event.currentTarget.value)}
        value={currentValue}
      />
    </div>
  );
};

OrderOptionText.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
  inputType: PropTypes.string,
};

export default OrderOptionText;
