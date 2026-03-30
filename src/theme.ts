/**
 * NFC TeamUp 主题配置
 * 基于设计规范 v1.1
 */

export const colors = {
  // 主色 - 科技蓝
  primary: '#1890FF',
  primaryLight: '#40A9FF',
  primaryDark: '#096DD9',
  
  // 辅助色
  success: '#52C41A',
  successLight: '#95DE64',
  warning: '#FAAD14',
  warningLight: '#FFC53D',
  error: '#F5222D',
  errorLight: '#FFA39E',
  
  // 中性色
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
    disabled: '#BBBBBB',
  },
  
  // 背景色
  background: {
    primary: '#FFFFFF',
    secondary: '#F5F5F5',
    tertiary: '#F0F2F5',
    gradient: ['#1890FF', '#096DD9'],
  },
  
  // 边框色
  border: {
    light: '#E8E8E8',
    medium: '#D9D9D9',
  },
  
  // 阴影
  shadow: {
    light: 'rgba(0, 0, 0, 0.08)',
    medium: 'rgba(0, 0, 0, 0.12)',
  },
};

export const spacing = {
  // 8px 栅格系统
  xs: 4,    // 0.5x
  sm: 8,    // 1x
  md: 16,   // 2x
  lg: 24,   // 3x
  xl: 32,   // 4x
  xxl: 40,  // 5x
};

export const borderRadius = {
  // 圆角规范
  button: 8,
  card: 12,
  input: 8,
  avatar: 20, // 圆形头像半径
  modal: 16,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 15,
  xl: 16,
  xxl: 18,
  title: 20,
  heading: 22,
  large: 24,
};

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  shadows,
};

export type Theme = typeof theme;
