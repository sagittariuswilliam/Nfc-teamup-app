import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../theme';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { useTeamStore } from '../store/teamStore';

interface InfoTabProps {
  onShowExitModal: () => void;
  onShowDismissModal: () => void;
  isCaptain: boolean;
}

interface Member {
  id: string;
  name: string;
  role: 'captain' | 'member';
  avatar?: string;
}

const mockMembers: Member[] = [
  { id: '1', name: '张三', role: 'captain' },
  { id: '2', name: '李四', role: 'member' },
  { id: '3', name: '王五', role: 'member' },
  { id: '4', name: '我', role: 'member' },
];

export const InfoTab: React.FC<InfoTabProps> = ({
  onShowExitModal,
  onShowDismissModal,
  isCaptain,
}) => {
  const currentTeam = useTeamStore(state => state.currentTeam);

  const getRemainingTime = () => {
    if (!currentTeam?.expiresAt) return '未知';
    const now = new Date();
    const expires = new Date(currentTeam.expiresAt);
    const diff = expires.getTime() - now.getTime();
    
    if (diff <= 0) return '已过期';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `剩余 ${days}天 ${hours}小时`;
  };

  return (
    <ScrollView style={styles.container}>
      {/* 队伍信息卡片 */}
      <View style={styles.teamCard}>
        <Text style={styles.cardTitle}>队伍信息</Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>队伍名称</Text>
          <Text style={styles.statValue}>{currentTeam?.name}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>有效期</Text>
          <Text style={[styles.statValue, styles.warningText]}>{getRemainingTime()}</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>队员人数</Text>
          <Text style={styles.statValue}>{currentTeam?.members.length || 0}/{currentTeam?.maxMembers} 人</Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>队长</Text>
          <Text style={styles.statValue}>
            {mockMembers.find(m => m.role === 'captain')?.name || '未知'}
          </Text>
        </View>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>创建时间</Text>
          <Text style={styles.statValue}>
            {currentTeam?.createdAt ? new Date(currentTeam.createdAt).toLocaleDateString('zh-CN') : '未知'}
          </Text>
        </View>
      </View>

      {/* 队员列表 */}
      <View style={styles.memberList}>
        <Text style={styles.cardTitle}>队员列表</Text>
        
        {mockMembers.map(member => (
          <View key={member.id} style={styles.memberItem}>
            <Avatar name={member.name} size="medium" />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>
                {member.role === 'captain' ? '👑 队长' : '队员'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* 危险操作区 */}
      <View style={styles.dangerZone}>
        <Text style={[styles.cardTitle, styles.dangerTitle]}>⚠️ 危险操作</Text>
        
        <Button
          title="🚪 退出队伍"
          variant="danger"
          onPress={onShowExitModal}
          fullWidth
          style={styles.dangerButton}
        />
        
        {isCaptain && (
          <Button
            title="🗑️ 解散队伍 (仅队长)"
            variant="danger"
            onPress={onShowDismissModal}
            fullWidth
            style={styles.dangerButton}
          />
        )}
      </View>

      {/* 底部间距 */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  teamCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    margin: spacing.lg,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  statLabel: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  statValue: {
    fontSize: fontSize.md,
    color: colors.text.primary,
    fontWeight: fontWeight.medium,
  },
  warningText: {
    color: colors.warning,
  },
  memberList: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    margin: spacing.lg,
    marginBottom: spacing.md,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  memberInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  memberName: {
    fontSize: fontSize.lg,
    color: colors.text.primary,
    marginBottom: 4,
  },
  memberRole: {
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  dangerZone: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    margin: spacing.lg,
    marginBottom: spacing.md,
  },
  dangerTitle: {
    color: colors.error,
  },
  dangerButton: {
    marginTop: spacing.md,
  },
  bottomPadding: {
    height: spacing.xl,
  },
});

export default InfoTab;
