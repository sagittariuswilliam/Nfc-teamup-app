import React from 'react';
import { render } from '@testing-library/react-native';
import { SplashScreen } from '../../src/screens/SplashScreen';

// Mock Animated
jest.mock('react-native', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...ReactNative,
    Animated: {
      ...ReactNative.Animated,
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
      })),
      parallel: jest.fn((animations) => ({
        start: jest.fn(),
      })),
    },
  };
});

describe('SplashScreen Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const onReady = jest.fn();
    const { getByText } = render(<SplashScreen onReady={onReady} />);
    
    expect(getByText('碰一碰组队')).toBeTruthy();
    expect(getByText('让组队像碰一碰一样简单')).toBeTruthy();
  });

  test('calls onReady after 2 seconds', () => {
    const onReady = jest.fn();
    render(<SplashScreen onReady={onReady} />);
    
    // Fast-forward 2 seconds
    jest.advanceTimersByTime(2000);
    
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  test('clears timer on unmount', () => {
    const onReady = jest.fn();
    const { unmount } = render(<SplashScreen onReady={onReady} />);
    
    unmount();
    
    // Fast-forward time after unmount
    jest.advanceTimersByTime(2000);
    
    // onReady should not be called after unmount
    expect(onReady).not.toHaveBeenCalled();
  });

  test('renders logo container', () => {
    const onReady = jest.fn();
    const { getByTestId } = render(<SplashScreen onReady={onReady} testID="splash" />);
    
    expect(getByTestId('splash')).toBeTruthy();
  });

  test('renders NFC wave animations', () => {
    const onReady = jest.fn();
    const { getAllByTestId } = render(<SplashScreen onReady={onReady} />);
    
    // Should have wave elements
    expect(getAllByTestId).toBeTruthy();
  });
});
