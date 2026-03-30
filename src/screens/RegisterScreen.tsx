import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, fontSize, spacing } from '../theme';
import Button from '../components/Button';
import Input from '../components/Input';
import { useUserStore } from '../store/userStore';

interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSuccess,
  onNavigateToLogin,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const register = useUserStore(state => state.register);

  const validateForm = (): boolean => {
    if (!username || !password || !confirmPassword) {
      setError('请填写所有必填项');
      return false;
    }

    if (username.length < 3) {
      setError('用户名至少 3 个字符');
      return false;
    }

    if (password.length < 6) {
      setError('密码至少 6 个字符');
      return false;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const success = await register(username, password, phone || undefined);
    setLoading(false);

    if (success) {
      onRegisterSuccess();
    } else {
      setError('注册失败，请稍后重试');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>创建账号</Text>
          <Text style={styles.subtitle}>加入我们，开始组队</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="用户名"
            placeholder="请输入用户名（至少 3 个字符）"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="words"
          />

          <Input
            label="手机号（选填）"
            placeholder="请输入手机号"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Input
            label="密码"
            placeholder="请输入密码（至少 6 个字符）"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Input
            label="确认密码"
            placeholder="请再次输入密码"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonContainer}>
            <Button
              title="注册"
              onPress={handleRegister}
              loading={loading}
              fullWidth
              size="large"
            />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>已有账号？</Text>
            <TouchableOpacity onPress={onNavigateToLogin}>
              <Text style={styles.linkText}>立即登录</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSize.heading,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  linkText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: '500',
    marginLeft: spacing.xs,
  },
  errorText: {
    color: colors.error,
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});

export default RegisterScreen;
