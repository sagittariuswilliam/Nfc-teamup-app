import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, borderRadius, fontSize, fontWeight, spacing } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.button;
    
    const variantStyle = {
      primary: styles.primaryButton,
      secondary: styles.secondaryButton,
      danger: styles.dangerButton,
    }[variant];
    
    const sizeStyle = {
      small: styles.smallButton,
      medium: styles.mediumButton,
      large: styles.largeButton,
    }[size];
    
    return [baseStyle, variantStyle, sizeStyle, fullWidth && styles.fullWidth, style];
  };
  
  const getTextStyle = (): TextStyle => {
    const baseStyle = styles.buttonText;
    
    const variantStyle = {
      primary: styles.primaryButtonText,
      secondary: styles.secondaryButtonText,
      danger: styles.dangerButtonText,
    }[variant];
    
    const sizeStyle = {
      small: styles.smallButtonText,
      medium: styles.mediumButtonText,
      large: styles.largeButtonText,
    }[size];
    
    return [baseStyle, variantStyle, sizeStyle, disabled && styles.disabledText, textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.text.primary : colors.background.primary} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // 变体
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  dangerButton: {
    backgroundColor: colors.errorLight,
    borderWidth: 1,
    borderColor: colors.error,
  },
  
  // 尺寸
  smallButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  mediumButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  largeButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  // 文字
  buttonText: {
    fontWeight: fontWeight.medium,
  },
  primaryButtonText: {
    color: colors.background.primary,
  },
  secondaryButtonText: {
    color: colors.text.primary,
  },
  dangerButtonText: {
    color: colors.error,
  },
  smallButtonText: {
    fontSize: fontSize.sm,
  },
  mediumButtonText: {
    fontSize: fontSize.xl,
  },
  largeButtonText: {
    fontSize: fontSize.xxl,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default Button;
