import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PositionSizeCalculator from '../PositionSizeCalculator.jsx';

describe('<PositionSizeCalculator />', () => {
  it('should render correctly', () => {
    const recipeForm = (
      <PositionSizeCalculator risk={0.02} />
    );
    const wrapper = shallow(recipeForm);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should take in values and purpose the correct output', () => {
    const recipeForm = (
      <PositionSizeCalculator risk={0.02} />
    );
    const wrapper = shallow(recipeForm);

    let acctSizeInput = wrapper.find('#acct_size_input');
    acctSizeInput.simulate('change', { target: { value: '3000' } });
    acctSizeInput = wrapper.find('#acct_size_input');
    expect(acctSizeInput.props().value).toBe('3000');

    let stopLossInput = wrapper.find('#stop_loss_input');
    stopLossInput.simulate('change', { target: { value: '50' } });
    stopLossInput = wrapper.find('#stop_loss_input');
    expect(stopLossInput.props().value).toBe('50');

    let entryInput = wrapper.find('#entry_input');
    entryInput.simulate('change', { target: { value: '55' } });
    entryInput = wrapper.find('#entry_input');
    expect(entryInput.props().value).toBe('55');

    const output = wrapper.find('#output');
    expect(output.html().includes('Position Size is 660.')).toBe(true);
    expect(output.html().includes('Number of Shares is 12.')).toBe(true);
    expect(output.html().includes('Amount at risk 60.')).toBe(true);
  });
});
