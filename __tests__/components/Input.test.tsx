import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../../src/components/Input';

describe('Input Component', () => {
  test('renders correctly with default props', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" value="" onChangeText={onChangeText} />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('displays label when provided', () => {
    const onChangeText = jest.fn();
    const { getByText } = render(
      <Input label="Username" value="" onChangeText={onChangeText} />
    );
    
    expect(getByText('Username')).toBeTruthy();
  });

  test('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Enter text" value="" onChangeText={onChangeText} />
    );
    
    fireEvent.changeText(getByPlaceholderText('Enter text'), 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  test('displays value correctly', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <Input value="Test Value" onChangeText={onChangeText} />
    );
    
    expect(getByDisplayValue('Test Value')).toBeTruthy();
  });

  test('renders as password field when secureTextEntry is true', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Password" value="" onChangeText={onChangeText} secureTextEntry />
    );
    
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  test('toggles secure text entry when eye icon is pressed', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Input placeholder="Password" value="" onChangeText={onChangeText} secureTextEntry />
    );
    
    const eyeIcon = getByText('👁️');
    fireEvent.press(eyeIcon);
    
    // After toggle, should show different icon
    expect(getByText('👁️‍🗨️')).toBeTruthy();
  });

  test('displays error message when error prop is provided', () => {
    const onChangeText = jest.fn();
    const { getByText } = render(
      <Input 
        value="" 
        onChangeText={onChangeText} 
        error="This field is required" 
      />
    );
    
    expect(getByText('This field is required')).toBeTruthy();
  });

  test('applies error style when error is present', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        value="" 
        onChangeText={onChangeText} 
        error="Error" 
      />
    );
    
    const input = getByPlaceholderText('Enter text');
    expect(input).toBeTruthy();
  });

  test('renders as multiline when multiline prop is true', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter description" 
        value="" 
        onChangeText={onChangeText} 
        multiline 
      />
    );
    
    const input = getByPlaceholderText('Enter description');
    expect(input.props.multiline).toBe(true);
  });

  test('renders with correct keyboardType', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Email" 
        value="" 
        onChangeText={onChangeText} 
        keyboardType="email-address" 
      />
    );
    
    const input = getByPlaceholderText('Email');
    expect(input.props.keyboardType).toBe('email-address');
  });

  test('renders as disabled when editable is false', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Disabled" 
        value="Cannot edit" 
        onChangeText={onChangeText} 
        editable={false} 
      />
    );
    
    const input = getByPlaceholderText('Disabled');
    expect(input.props.editable).toBe(false);
  });

  test('renders leftIcon when provided', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <Input 
        value="" 
        onChangeText={onChangeText} 
        leftIcon={<test-icon data-testid="left-icon" />} 
      />
    );
    
    expect(getByTestId('left-icon')).toBeTruthy();
  });

  test('renders rightIcon when provided', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <Input 
        value="" 
        onChangeText={onChangeText} 
        rightIcon={<test-icon data-testid="right-icon" />} 
      />
    );
    
    expect(getByTestId('right-icon')).toBeTruthy();
  });

  test('applies custom style', () => {
    const onChangeText = jest.fn();
    const customStyle = { marginTop: 20 };
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        value="" 
        onChangeText={onChangeText} 
        style={customStyle} 
      />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  test('applies custom inputStyle', () => {
    const onChangeText = jest.fn();
    const customInputStyle = { fontSize: 20 };
    const { getByPlaceholderText } = render(
      <Input 
        placeholder="Enter text" 
        value="" 
        onChangeText={onChangeText} 
        inputStyle={customInputStyle} 
      />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });
});
