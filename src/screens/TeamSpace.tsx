import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../theme';
import ChatTab from './ChatTab';
import MapTab from './MapTab';
import FileTab from './FileTab';
import InfoTab from './InfoTab';
import Button from '../components/Button';
import { useTeamStore } from '../store/teamStore';

type TabType = 'chat' | 'map' | 'file' | 'info';

interface TeamSpaceProps {
  onNavigateToMap: () => void;
  onNavigateToProfile: () => void;
  onLeaveTeam: () => void;
}

export const TeamSpace: React.FC<TeamSpaceProps> = ({
  onNavigateToMap,
  onNavigateToProfile,
  onLeaveTeam,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [showExitModal, setShowExitModal] = useState(false);
  const [showDismissModal, setShowDismissModal] = useState(false);

  const currentTeam = useTeamStore(state => state.currentTeam);
  const isCaptain = currentTeam?.captainId === 'user_001';

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'chat', label: '聊天', icon: '💬' },
    { id: 'map', label: '地图', icon: '🗺️' },
    { id: 'file', label: '文件', icon: '📁' },
    { id: 'info', label: '信息', icon: 'ℹ️' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatTab />;
      case 'map':
        return <MapTab />;
      case 'file':
        return <FileTab />;
      case 'info':
        return (
          <InfoTab
            onShowExitModal={() => setShowExitModal(true)}
            onShowDismissModal={() => setShowDismissModal(true)}
            isCaptain={isCaptain}
          />
        );
      default:
        return null;
    }
  };

  const handleExitTeam = () => {
    setShowExitModal(false);
    onLeaveTeam();
  };

  const handleDismissTeam = () => {
    setShowDismissModal(false);
    onLeaveTeam();
  };

  return (
    <View style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.teamName}>{currentTeam?.name || '队伍'}</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setActiveTab('info')}
        >
          <Text style={styles.infoButtonText}>队伍信息</Text>
        </TouchableOpacity>
      </View>

      {/* Tab 切换 */}
      <View style={styles.tabs}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 内容区 */}
      <ScrollView style={styles.content}>{renderContent()}</ScrollView>

      {/* 底部导航 */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>队伍</Text>
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

      {/* 退出队伍确认弹窗 */}
      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExitModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalIcon}>⚠️</Text>
            <Text style={styles.modalTitle}>退出队伍确认</Text>
            <Text style={styles.modalContent}>
              退出后你将：
            </Text>
            <View style={styles.modalList}>
              <Text style={styles.modalListItem}>• 无法查看队伍聊天记录</Text>
              <Text style={styles.modalListItem}>• 无法访问队伍共享文件</Text>
              <Text style={styles.modalListItem}>• 不再共享位置信息</Text>
            </View>
            <Text style={styles.modalContent}>
              队伍"{currentTeam?.name}"将继续存在
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="取消"
                variant="secondary"
                onPress={() => setShowExitModal(false)}
                style={styles.modalButton}
              />
              <Button
                title="确认退出"
                variant="danger"
                onPress={handleExitTeam}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* 解散队伍确认弹窗 */}
      <Modal
        visible={showDismissModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDismissModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalIcon}>🗑️</Text>
            <Text style={styles.modalTitle}>解散队伍确认</Text>
            <Text style={styles.modalContent}>
              解散后：
            </Text>
            <View style={styles.modalList}>
              <Text style={styles.modalListItem}>• 所有聊天记录将删除</Text>
              <Text style={styles.modalListItem}>• 共享文件将删除 (7 天后)</Text>
              <Text style={styles.modalListItem}>• 队员位置共享停止</Text>
            </View>
            <Text style={[styles.modalContent, styles.warningText]}>
              此操作不可恢复，请谨慎操作
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="取消"
                variant="secondary"
                onPress={() => setShowDismissModal(false)}
                style={styles.modalButton}
              />
              <Button
                title="确认解散"
                variant="danger"
                onPress={handleDismissTeam}
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
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.background.primary,
  },
  infoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  infoButtonText: {
    color: colors.background.primary,
    fontSize: fontSize.sm,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
    backgroundColor: colors.background.secondary,
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    fontWeight: fontWeight.medium,
  },
  activeTabLabel: {
    color: colors.primary,
  },
  content: {
    flex: 1,
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
  modalIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  modalContent: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  modalList: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  modalListItem: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  warningText: {
    color: colors.error,
    fontWeight: fontWeight.semibold,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
});

export default TeamSpace;
