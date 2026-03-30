import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, fontSize, fontWeight } from '../theme';

interface SplashScreenProps {
  onReady: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onReady }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // 入场动画
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // 2 秒后跳转
    const timer = setTimeout(() => {
      onReady();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* NFC 波纹动画 */}
        <View style={styles.nfcWaves}>
          <Animated.View
            style={[
              styles.wave,
              styles.wave1,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.wave,
              styles.wave2,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.wave,
              styles.wave3,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        碰一碰组队
      </Animated.Text>

      <Animated.Text
        style={[
          styles.slogan,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        让组队像碰一碰一样简单
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.background.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 32,
    elevation: 8,
  },
  nfcWaves: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  wave1: {
    width: 80,
    height: 80,
    top: 0,
    left: 0,
  },
  wave2: {
    width: 60,
    height: 60,
    top: 10,
    left: 10,
  },
  wave3: {
    width: 40,
    height: 40,
    top: 20,
    left: 20,
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: fontWeight.bold,
    color: colors.background.primary,
    marginBottom: 10,
  },
  slogan: {
    fontSize: fontSize.lg,
    color: colors.background.primary,
    opacity: 0.9,
  },
});

export default SplashScreen;
