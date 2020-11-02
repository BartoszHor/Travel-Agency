import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import OrderOption from '../OrderOption/OrderOption';
import pricing from '../../../data/pricing.json';
import Button from '../../common/Button/Button';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import {settings} from '../../../data/settings';

const sendOrder = (options, tripCost, country) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  const tripId = country.trips[0];
  const tripName = country.name;


  const payload = {
    ...options,
    totalCost,
    tripId,
    tripName,
    countryCode: country.alpha2Code,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  if(options.name == '' || options.contact == '' || !options.contact.includes('@')) {
    alert('Please fill in both name and contact with proper format');
    return;
  }

  fetch(url, fetchOptions)
    .then(function(response){
      console.log(response);
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderFrom = ({options, tripCost, setOrderOption, country}) => (
  <Row>
    {pricing.map(option => (
      <Col md={6} key={option.id}>
        <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
      </Col>
    ))}
    <Col xs={12}>
      <OrderSummary cost={tripCost}  options={options}/>
    </Col>
    <Button onClick={() => sendOrder(options, tripCost, country)}>Order now!</Button>
  </Row>
);


OrderFrom.propTypes = {
  options: PropTypes.object,
  tripCost: PropTypes.string,
  setOrderOption: PropTypes.func,
  country: PropTypes.object,
};

export default OrderFrom;
