import React from 'react';
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render proper link', () => {
    const ecpectedId = '/trip/abc';
    const component = shallow(<TripSummary tags={[]} id='abc' image='image.jpg' name='name' days={1} cost='100' />);
    expect(component.find('.link').prop('to')).toEqual(ecpectedId);
  });
  it('should render proper src and alt attribute for img', () => {
    const expectedImage = 'image.jpg';
    const expectedAlt = 'some alt';
    const component = shallow(<TripSummary tags={[]} image={expectedImage} name={expectedAlt} days={1} cost='100' />);

    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });
  it('should render correct name, cost and days', () => {
    const expectedName = 'Bali trip';
    const expectedCost = '100$';
    const expectedDays = 7;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays}  image='image.jpg' tags={[]}/>);

    const renderedDays = component.find('span').first().text();
    const renderedCost = component.find('span').last().text();

    expect(component.find('.title').text()).toEqual(expectedName);
    expect(renderedDays).toEqual(`${expectedDays} days`);
    expect(renderedCost).toEqual(`from ${expectedCost}`);
  });
  it('should throw error if required props are invalid', () => {
    expect(() => shallow(<TripSummary/>)).toThrow();
  });
  it('should have tag prop which is array and each elem is span name', () => {
    const expectedItems = ['span1', 'span2', 'span3'];
    const component = shallow(<TripSummary tags={expectedItems} id='abc' image='image.jpg' name='name' days={1} cost='100' />);

    const firstTag = component.find('.tag').at(0).text();
    const secondTag = component.find('.tag').at(1).text();
    const thirdTag = component.find('.tag').at(2).text();

    expect(firstTag).toEqual(expectedItems[0]);
    expect(secondTag).toEqual(expectedItems[1]);
    expect(thirdTag).toEqual(expectedItems[2]);
  });
  it('should not render div with tags if prop tags does not exist', () => {
    const component = shallow(<TripSummary tags={false} id='abc' image='image.jpg' name='name' days={1} cost='100' />);

    expect(component.find('.tags').exists()).toBe(false);
  });
});
