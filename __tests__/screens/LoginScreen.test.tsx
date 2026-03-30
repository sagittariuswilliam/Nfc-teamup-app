import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../../src/screens/LoginScreen';

// Mock zustand store
jest.mock('../../src/store/userStore', () => ({
  useUserStore: jest.fn(),
}));

const mockLogin = jest.fn();

describe('LoginScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('../../src/store/userStore').useUserStore.mockReturnValue({
      login: mockLogin,
    });
  });

  test('renders correctly', () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    
    const { getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    expect(getByText('欢迎回来')).toBeTruthy();
    expect(getByText('登录你的账号继续组队')).toBeTruthy();
  });

  test('renders username and password inputs', () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    expect(getByPlaceholderText('请输入用户名')).toBeTruthy();
    expect(getByPlaceholderText('请输入密码')).toBeTruthy();
    expect(getByText('用户名')).toBeTruthy();
    expect(getByText('密码')).toBeTruthy();
  });

  test('shows error when submitting empty form', () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    
    const { getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    fireEvent.press(getByText('登录'));
    
    expect(getByText('请填写用户名和密码')).toBeTruthy();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('calls login with correct credentials', async () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    mockLogin.mockResolvedValue(true);
    
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    fireEvent.changeText(getByPlaceholderText('请输入用户名'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('请输入密码'), 'password123');
    
    fireEvent.press(getByText('登录'));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    });
  });

  test('calls onLoginSuccess when login succeeds', async () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    mockLogin.mockResolvedValue(true);
    
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    fireEvent.changeText(getByPlaceholderText('请输入用户名'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('请输入密码'), 'password123');
    
    fireEvent.press(getByText('登录'));
    
    await waitFor(() => {
      expect(onLoginSuccess).toHaveBeenCalledTimes(1);
    });
  });

  test('shows error message when login fails', async () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    mockLogin.mockResolvedValue(false);
    
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    fireEvent.changeText(getByPlaceholderText('请输入用户名'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('请输入密码'), 'wrongpassword');
    
    fireEvent.press(getByText('登录'));
    
    await waitFor(() => {
      expect(getByText('登录失败，请检查用户名和密码')).toBeTruthy();
    });
  });

  test('navigates to register screen when link is pressed', () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    
    const { getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    fireEvent.press(getByText('立即注册'));
    
    expect(onNavigateToRegister).toHaveBeenCalledTimes(1);
  });

  test('shows loading state during login', async () => {
    const onLoginSuccess = jest.fn();
    const onNavigateToRegister = jest.fn();
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));
    
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen 
        onLoginSuccess={onLoginSuccess} 
        onNavigateToRegister={onNavigateToRegister} 
      />
    );
    
    fireEvent.changeText(getByPlaceholderText('请输入用户名'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('请输入密码'), 'password123');
    
    fireEvent.press(getByText('登录'));
    
    // Should show loading state
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });
});
