import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius, shadows } from '../theme';
import Card, { CardContent } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTeamStore } from '../store/teamStore';

interface HomeScreenProps {
  onCreateTeam: () => void;
  onJoinTeam: () => void;
  onNavigateToMap: () => void;
  onNavigateToProfile: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onCreateTeam,
  onJoinTeam,
  onNavigateToMap,
  onNavigateToProfile,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [maxMembers, setMaxMembers] = useState('20');
  const [days, setDays] = useState('7');

  const createTeam = useTeamStore(state => state.createTeam);
  const isJoined = useTeamStore(state => state.isJoined);

  const handleCreateTeam = () => {
    if (!teamName) return;
    
    createTeam(teamName, parseInt(maxMembers), parseInt(days));
    setShowCreateModal(false);
    setTeamName('');
    onCreateTeam();
  };

  const handleJoinTeam = () => {
    if (!inviteCode) return;
    
    // TODO: 通过邀请码加入队伍
    setShowJoinModal(false);
    setInviteCode('');
    onJoinTeam();
  };

  if (isJoined) {
    // 已组队状态，跳转到队伍空间
    return null;
  }

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>碰一碰组队</Text>
      </View>

      {/* 内容区 */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* 创建队伍卡片 */}
        <Card style={styles.actionCard} onPress={() => setShowCreateModal(true)}>
          <CardContent>
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionTitle}>创建队伍</Text>
            <Text style={styles.actionDesc}>快速组建你的小队，设置有效期 1-14 天</Text>
          </CardContent>
        </Card>

        {/* 加入队伍卡片 */}
        <Card style={styles.actionCard} onPress={() => setShowJoinModal(true)}>
          <CardContent>
            <Text style={styles.actionIcon}>📲</Text>
            <Text style={styles.actionTitle}>加入队伍</Text>
            <Text style={styles.actionDesc}>碰一碰或输入邀请码加入</Text>
          </CardContent>
        </Card>

        {/* 空状态 */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎯</Text>
          <Text style={styles.emptyTitle}>暂无活跃队伍</Text>
          <Text style={styles.emptyDesc}>创建或加入一个队伍开始组队</Text>
        </View>
      </ScrollView>

      {/* 底部导航 */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>首页</Text>
        </View>
        <View style={styles.tabItem} onTouchEnd={onNavigateToMap}>
          <Text style={styles.tabIcon}>🗺️</Text>
          <Text style={styles.tabLabel}>地图</Text>
        </View>
        <View style={styles.tabItem} onTouchEnd={onNavigateToProfile}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>我的</Text>
        </View>
      </View>

      {/* 创建队伍弹窗 */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>创建队伍</Text>
            
            <Input
              label="队伍名称"
              placeholder="给队伍起个名字"
              value={teamName}
              onChangeText={setTeamName}
            />
            
            <Input
              label="最大人数"
              placeholder="20"
              value={maxMembers}
              onChangeText={setMaxMembers}
              keyboardType="numeric"
            />
            
            <Input
              label="有效期（天）"
              placeholder="7"
              value={days}
              onChangeText={setDays}
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <Button
                title="取消"
                variant="secondary"
                onPress={() => setShowCreateModal(false)}
                style={styles.modalButton}
              />
              <Button
                title="创建"
                variant="primary"
                onPress={handleCreateTeam}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* 加入队伍弹窗 */}
      <Modal
        visible={showJoinModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowJoinModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>加入队伍</Text>
            
            <Input
              label="邀请码"
              placeholder="输入 6 位邀请码"
              value={inviteCode}
              onChangeText={setInviteCode}
              keyboardType="number-pad"
            />

            <View style={styles.modalButtons}>
              <Button
                title="取消"
                variant="secondary"
                onPress={() => setShowJoinModal(false)}
                style={styles.modalButton}
              />
              <Button
                title="加入"
                variant="primary"
                onPress={handleJoinTeam}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.tertiary,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 44,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.semibold,
    color: colors.background.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  actionCard: {
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  actionIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  actionTitle: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  actionDesc: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  emptyState: {
    marginTop: spacing.xxl,
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    color: colors.text.tertiary,
    marginBottom: spacing.xs,
  },
  emptyDesc: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: spacing.sm,
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.modal,
    padding: spacing.xl,
    width: '90%',
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  modalButton: {
    flex: 1,
  },
});

export default HomeScreen;
