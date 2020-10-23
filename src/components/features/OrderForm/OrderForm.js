import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';


const OrderFrom = (props) => (
  <Row>
    <Col xs={12}>
      <OrderSummary cost={props.tripCost}  options={props.options}/>
    </Col>
  </Row>
);


OrderFrom.propTypes = {
  options: PropTypes.object,
  tripCost: PropTypes.string,
};

export default OrderFrom;
