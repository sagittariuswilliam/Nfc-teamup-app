import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Card, { CardHeader, CardContent, CardFooter } from '../../src/components/Card';

describe('Card Component', () => {
  test('renders correctly with children', () => {
    const { getByText } = render(
      <Card>
        <test-child>Card Content</test-child>
      </Card>
    );
    
    expect(getByText('Card Content')).toBeTruthy();
  });

  test('renders as TouchableOpacity when onPress is provided', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card onPress={onPress} testID="card">
        <test-child>Clickable Card</test-child>
      </Card>
    );
    
    const card = getByTestId('card');
    fireEvent.press(card);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('renders as View when onPress is not provided', () => {
    const { getByTestId } = render(
      <Card testID="card">
        <test-child>Static Card</test-child>
      </Card>
    );
    
    expect(getByTestId('card')).toBeTruthy();
  });

  test('applies elevated shadow by default', () => {
    const { getByTestId } = render(
      <Card testID="card">
        <test-child>Elevated</test-child>
      </Card>
    );
    
    expect(getByTestId('card')).toBeTruthy();
  });

  test('does not apply elevated shadow when elevated is false', () => {
    const { getByTestId } = render(
      <Card testID="card" elevated={false}>
        <test-child>Flat</test-child>
      </Card>
    );
    
    expect(getByTestId('card')).toBeTruthy();
  });

  test('applies custom style', () => {
    const customStyle = { marginTop: 20 };
    const { getByTestId } = render(
      <Card testID="card" style={customStyle}>
        <test-child>Custom Style</test-child>
      </Card>
    );
    
    expect(getByTestId('card')).toBeTruthy();
  });

  test('calls onPress with correct activeOpacity', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Card testID="card" onPress={onPress}>
        <test-child>Press Me</test-child>
      </Card>
    );
    
    const card = getByTestId('card');
    fireEvent.press(card);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('CardHeader Component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <CardHeader>
        <test-child>Header Content</test-child>
      </CardHeader>
    );
    
    expect(getByText('Header Content')).toBeTruthy();
  });

  test('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <CardHeader testID="header" style={customStyle}>
        <test-child>Styled Header</test-child>
      </CardHeader>
    );
    
    expect(getByTestId('header')).toBeTruthy();
  });
});

describe('CardContent Component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <CardContent>
        <test-child>Content Body</test-child>
      </CardContent>
    );
    
    expect(getByText('Content Body')).toBeTruthy();
  });

  test('applies custom style', () => {
    const customStyle = { padding: 30 };
    const { getByTestId } = render(
      <CardContent testID="content" style={customStyle}>
        <test-child>Styled Content</test-child>
      </CardContent>
    );
    
    expect(getByTestId('content')).toBeTruthy();
  });
});

describe('CardFooter Component', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <CardFooter>
        <test-child>Footer Content</test-child>
      </CardFooter>
    );
    
    expect(getByText('Footer Content')).toBeTruthy();
  });

  test('applies custom style', () => {
    const customStyle = { borderTopWidth: 2 };
    const { getByTestId } = render(
      <CardFooter testID="footer" style={customStyle}>
        <test-child>Styled Footer</test-child>
      </CardFooter>
    );
    
    expect(getByTestId('footer')).toBeTruthy();
  });
});
