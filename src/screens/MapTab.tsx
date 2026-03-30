import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, borderRadius } from '../theme';

interface MemberLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  isSelf?: boolean;
}

// 模拟队员位置
const mockLocations: MemberLocation[] = [
  { id: '1', name: '我', latitude: 30.274, longitude: 120.155, isSelf: true },
  { id: '2', name: '张三', latitude: 30.276, longitude: 120.158 },
  { id: '3', name: '李四', latitude: 30.272, longitude: 120.152 },
];

export const MapTab: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* 地图占位区域 */}
      <View style={styles.mapPlaceholder}>
        {/* 模拟地图背景 */}
        <View style={styles.mapBackground}>
          {/* 模拟道路 */}
          <View style={styles.road1} />
          <View style={styles.road2} />
        </View>

        {/* 队员位置标记 */}
        {mockLocations.map(location => (
          <View
            key={location.id}
            style={[
              styles.locationMarker,
              {
                top: `${50 + (location.latitude - 30.274) * 1000}%`,
                left: `${50 + (location.longitude - 120.155) * 1000}%`,
              },
            ]}
          >
            <View style={[styles.pin, location.isSelf && styles.pinSelf]}>
              <View style={styles.pinInner} />
            </View>
            <View style={styles.label}>
              <Text style={styles.labelText}>{location.name}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* 图例 */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendPin, { backgroundColor: colors.primary }]} />
          <Text style={styles.legendText}>我</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendPin, { backgroundColor: colors.success }]} />
          <Text style={styles.legendText}>队员</Text>
        </View>
      </View>

      {/* 提示信息 */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📍 实时位置共享</Text>
        <Text style={styles.infoText}>
          队员位置每 30 秒更新一次
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
    padding: spacing.lg,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4FF',
    borderRadius: borderRadius.card,
    marginBottom: spacing.md,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 280,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  road1: {
    position: 'absolute',
    width: '100%',
    height: 8,
    backgroundColor: '#D0E1F5',
    top: '40%',
    transform: [{ rotate: '15deg' }],
  },
  road2: {
    position: 'absolute',
    width: 8,
    height: '100%',
    backgroundColor: '#D0E1F5',
    left: '60%',
  },
  locationMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  pin: {
    width: 40,
    height: 40,
    backgroundColor: colors.success,
    borderRadius: '50% 50% 50% 0',
    transform: [{ rotate: '-45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  pinSelf: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
  },
  pinInner: {
    width: 14,
    height: 14,
    backgroundColor: colors.background.primary,
    borderRadius: 7,
    transform: [{ rotate: '45deg' }],
  },
  label: {
    marginTop: 8,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  labelText: {
    fontSize: fontSize.sm,
    color: colors.text.primary,
  },
  legend: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  infoCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.md,
  },
  infoTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
});

export default MapTab;
