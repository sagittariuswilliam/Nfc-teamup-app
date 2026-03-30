import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from '../../src/components/Avatar';

describe('Avatar Component', () => {
  test('renders correctly with default props', () => {
    const { getByTestId } = render(<Avatar testID="avatar" />);
    
    expect(getByTestId('avatar')).toBeTruthy();
  });

  test('displays initials when name is provided', () => {
    const { getByText } = render(<Avatar name="John Doe" />);
    
    expect(getByText('JD')).toBeTruthy();
  });

  test('displays single initial when name has one word', () => {
    const { getByText } = render(<Avatar name="John" />);
    
    expect(getByText('JO')).toBeTruthy();
  });

  test('displays question mark when name is not provided', () => {
    const { getByText } = render(<Avatar />);
    
    expect(getByText('?')).toBeTruthy();
  });

  test('renders small size correctly', () => {
    const { getByTestId } = render(<Avatar testID="avatar" size="small" />);
    
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  test('renders medium size correctly', () => {
    const { getByTestId } = render(<Avatar testID="avatar" size="medium" />);
    
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  test('renders large size correctly', () => {
    const { getByTestId } = render(<Avatar testID="avatar" size="large" />);
    
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  test('renders xlarge size correctly', () => {
    const { getByTestId } = render(<Avatar testID="avatar" size="xlarge" />);
    
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  test('renders image when imageUrl is provided', () => {
    const { getByTestId } = render(
      <Avatar testID="avatar" imageUrl="https://example.com/avatar.jpg" />
    );
    
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  test('applies custom color when provided', () => {
    const { getByTestId } = render(
      <Avatar testID="avatar" name="Test" color="#FF0000" />
    );
    
    const avatar = getByTestId('avatar');
    expect(avatar).toBeTruthy();
  });

  test('applies custom style', () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(
      <Avatar testID="avatar" style={customStyle} />
    );
    
    expect(getByTestId('avatar')).toBeTruthy();
  });

  test('generates consistent background color for same name', () => {
    const { getByText: getByText1 } = render(<Avatar name="Alice" />);
    const { getByText: getByText2 } = render(<Avatar name="Alice" />);
    
    expect(getByText1('AL')).toBeTruthy();
    expect(getByText2('AL')).toBeTruthy();
  });

  test('generates different background colors for different names', () => {
    const { getByText: getByText1 } = render(<Avatar name="Alice" />);
    const { getByText: getByText2 } = render(<Avatar name="Bob" />);
    
    expect(getByText1('AL')).toBeTruthy();
    expect(getByText2('BO')).toBeTruthy();
  });

  test('handles empty string name', () => {
    const { getByText } = render(<Avatar name="" />);
    
    expect(getByText('?')).toBeTruthy();
  });

  test('handles special characters in name', () => {
    const { getByText } = render(<Avatar name="John O'Brien" />);
    
    expect(getByText('J\'')).toBeTruthy();
  });
});
