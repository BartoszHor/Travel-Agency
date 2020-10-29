import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from'./OrderOption';


describe('Component OrderOption', () => {
  it('should render correctly', () => {
    const component = shallow(<OrderOption name='name' type='dropdown'/>);

    expect(component).toBeTruthy();
  });
  it('should return null if props type is false', () => {
    const component = shallow(<OrderOption/>);

    expect(component).toEqual({});
  });
  it('should render title name from props name', () => {
    const expectedName = 'name';
    const component = shallow(<OrderOption name={expectedName} type='dropdown'/>);

    expect(component.find('.title').text()).toEqual(expectedName);
  });
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcon',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem ipsum dolor',
  values: [
    {id: 'abc', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'abc', icon: 'h-square', name: 'Lorem X', price: 10},
  ],
  required: false,
  currentValue: 'abc',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
//const testValueNumber = 3;

for(let option in optionTypes){
  describe(`Component OrderOption with type=${option}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow(
        <OrderOption
          type={option}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[option]}
        />
      );
      subcomponent = component.find(optionTypes[option]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it('passes dummy test', () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (option) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () =>{
          const selectExists = renderedSubcomponent.find('select');
          expect(selectExists.length).toBe(1);

          const emptyOption = renderedSubcomponent.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = renderedSubcomponent.find('option').not('option[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });
        it('should run setOrderOption funcion on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }
      case 'icons': {
        /* tests for icons */
        it('contains icon components', () => {
          const icons = renderedSubcomponent.find('Icon');
          expect(icons.length).toBe(mockProps.values.length);
          const iconName = renderedSubcomponent.find('Icon').at(1).prop('name');
          expect(iconName).toEqual(mockProps.values[0].icon);
          renderedSubcomponent.find('.icon > div').last().simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({[mockProps.id]: testValue});
        });
        break;
      }
    }
  });
}
