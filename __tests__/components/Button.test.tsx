import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/components/Button';

describe('Button Component', () => {
  test('renders correctly with default props', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click Me" onPress={onPress} />);
    
    expect(getByText('Click Me')).toBeTruthy();
  });

  test('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Click Me" onPress={onPress} />);
    
    fireEvent.press(getByText('Click Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('renders primary variant by default', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Primary" onPress={onPress} />);
    
    const button = getByText('Primary').parent;
    expect(button).toBeTruthy();
  });

  test('renders secondary variant', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Secondary" onPress={onPress} variant="secondary" />
    );
    
    expect(getByText('Secondary')).toBeTruthy();
  });

  test('renders danger variant', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Danger" onPress={onPress} variant="danger" />
    );
    
    expect(getByText('Danger')).toBeTruthy();
  });

  test('renders small size', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Small" onPress={onPress} size="small" />
    );
    
    expect(getByText('Small')).toBeTruthy();
  });

  test('renders large size', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Large" onPress={onPress} size="large" />
    );
    
    expect(getByText('Large')).toBeTruthy();
  });

  test('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" onPress={onPress} disabled />
    );
    
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  test('shows loading indicator when loading', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button title="Loading" onPress={onPress} loading />
    );
    
    // ActivityIndicator should be present
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  test('does not call onPress when loading', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Loading" onPress={onPress} loading />
    );
    
    fireEvent.press(getByText('Loading'));
    expect(onPress).not.toHaveBeenCalled();
  });

  test('renders full width when fullWidth prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Full Width" onPress={onPress} fullWidth />
    );
    
    expect(getByText('Full Width')).toBeTruthy();
  });

  test('applies custom style', () => {
    const onPress = jest.fn();
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <Button title="Custom" onPress={onPress} style={customStyle} />
    );
    
    expect(getByText('Custom')).toBeTruthy();
  });

  test('applies custom text style', () => {
    const onPress = jest.fn();
    const customTextStyle = { fontSize: 20 };
    const { getByText } = render(
      <Button title="Custom Text" onPress={onPress} textStyle={customTextStyle} />
    );
    
    expect(getByText('Custom Text')).toBeTruthy();
  });
});
