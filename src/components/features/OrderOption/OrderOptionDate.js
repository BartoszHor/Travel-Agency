import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({setOptionValue}) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      onSelect={event => setOptionValue(event)}
      closeOnScroll={true}
    />
  );
};

OrderOptionDate.propTypes = {
  limits: PropTypes.object,
  price: PropTypes.string,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.ReactNode,
};

export default OrderOptionDate;
