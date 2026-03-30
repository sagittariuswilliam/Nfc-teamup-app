import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius, fontSize, fontWeight } from '../theme';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  name?: string;
  imageUrl?: string;
  color?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  name,
  imageUrl,
  color,
  style,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32, fontSize: 12 };
      case 'medium':
        return { width: 40, height: 40, fontSize: 16 };
      case 'large':
        return { width: 56, height: 56, fontSize: 20 };
      case 'xlarge':
        return { width: 80, height: 80, fontSize: 28 };
      default:
        return { width: 40, height: 40, fontSize: 16 };
    }
  };

  const { width, height, fontSize: fontSizeValue } = getSize();

  const getInitials = (name?: string): string => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getBackgroundColor = (name?: string): string => {
    if (color) return color;
    
    const gradients = [
      ['#1890FF', '#40A9FF'],
      ['#FA8C16', '#FFC53D'],
      ['#52C41A', '#95DE64'],
      ['#13C2C2', '#36CFC9'],
      ['#722ED1', '#9254DE'],
      ['#EB2F96', '#F759AB'],
    ];
    
    if (!name) return gradients[0][0];
    
    const index = name.length % gradients.length;
    return gradients[index][0];
  };

  const renderContent = () => {
    if (imageUrl) {
      return (
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { width, height, borderRadius: width / 2 }]}
        />
      );
    }

    return (
      <Text
        style={[
          styles.initials,
          {
            width,
            height,
            fontSize: fontSizeValue,
            borderRadius: width / 2,
            backgroundColor: getBackgroundColor(name),
          },
        ]}
      >
        {getInitials(name)}
      </Text>
    );
  };

  return (
    <View style={[styles.container, { width, height }, style]}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.background.primary,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Avatar;
