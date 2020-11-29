import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';


const select = {
  title: '.title',
  promoDescription: '.promoDescription',
  descr: '.descr',
};

const mockProps = {
  title: 'Happy Hour',
  promoDescription: 'It is your time! Take advantage of Happy Hour! All offers 20% off!',
};

beforeAll(() => {
  const utilsModule = jest.requireActual('../../../utils/formatTime.js');
  utilsModule.formatTime = jest.fn(seconds => seconds);
});

describe('Component HappyHourAd', () => {
  it('should render withour crashing', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

  it('should contain header and paragraph', () => {
    const component = shallow(<HappyHourAd />);
    expect(component.exists(select.title)).toEqual(true);
    expect(component.exists(select.promoDescription)).toEqual(true);
  });

  it('should have content from props', () => {
    const expectedTitle = mockProps.title;
    const expectedPromoDescription = mockProps.promoDescription;
    const component = shallow(<HappyHourAd {...mockProps} />);
    expect(component.find(select.title).text()).toEqual(expectedTitle);
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
  
const checkDescriptionAtTime = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
  
    const component = shallow(<HappyHourAd/>);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
  
    global.Date = trueDate;
  });
};

   
describe('Component HappyHourAd with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:01', 23 * 60 * 60 - 1 + '');
});

const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {
    jest.useFakeTimers();
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
  
    const component = shallow(<HappyHourAd/>);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());
    jest.advanceTimersByTime(delaySeconds * 1000);
    const renderedTime = component.find(select.promoDescription).text();
    expect(renderedTime).toEqual(expectedDescription);
  
    global.Date = trueDate;
    jest.useRealTimers();
  });
};

describe('Component HappyHourAd with mocked Date and delay should start rendering with deley and show poromoDescription', () => {
  checkDescriptionAfterTime('11:57:58', 122, mockProps.promoDescription);
});

describe('Component HappyHourAd with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2, '120');
  checkDescriptionAfterTime('11:59:58', 1, '1');
  checkDescriptionAfterTime('13:00:00', 60 * 60, 22 * 60 * 60 + '');
});

const checkPromoDescription = (time, expectedDescription) => {
  it(`should show correct at ${time}`, () => {
    global.Date = mockDate(`2019-05-14T${time}.135Z`);
  
    const component = shallow(<HappyHourAd/>);
    const promoDescription = component.find(select.promoDescription).text();
    expect(promoDescription).toEqual(expectedDescription);
  
    global.Date = trueDate;
  });
};

describe('Component HappyHourAd with mocked Date', () => {
  checkPromoDescription('12:00:00', mockProps.promoDescription);
  checkPromoDescription('12:59:59', mockProps.promoDescription);
  checkPromoDescription('12:45:01', mockProps.promoDescription);
});


 
