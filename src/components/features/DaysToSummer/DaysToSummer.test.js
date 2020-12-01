import React from 'react';
import { shallow } from 'enzyme';
import DaysToSummer from './DaysToSummer';

const select = {
  promoDescription: '.promoDescription',
};

const mockProps = {
  promoDescription: 'Enjoy Summer Time',
};

describe('Component DaysToSummer', () => {
  it('should render without crashing', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });
  it('should contain header', () => {
    const component = shallow(<DaysToSummer />);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });
  it('should take header content from props', () => {
    const expectedPromoDescription = mockProps.promoDescription;
    const component = shallow(<DaysToSummer {...mockProps} />);
    expect(component.find(select.promoDescription).text()).toEqual(expectedPromoDescription);
  });
});

const trueDate = Date;
const mockDate = customDate => class extends Date {
  constructor(...args) {
    if(args.length){
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now(){
    return (new Date(customDate)).getTime();
  }
};
  
const checkDescriptionAtDate = (date, expectedDescription) => {
  it(`should show correct at ${date}`, () => {
    global.Date = mockDate(`${date}T10:00:00.135Z`);
  
    const component = shallow(<DaysToSummer/>);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
  
    global.Date = trueDate;
  });
};

   
describe('Component DaysToSummer with mocked Date', () => {
  checkDescriptionAtDate('2020-06-19', '1 days to summer');
  checkDescriptionAtDate('2020-12-01', '201 days to summer');
});