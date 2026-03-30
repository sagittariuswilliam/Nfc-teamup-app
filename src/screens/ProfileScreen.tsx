import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, fontSize, fontWeight, spacing, borderRadius } from '../theme';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { useUserStore } from '../store/userStore';
import { useTeamStore } from '../store/teamStore';

interface ProfileScreenProps {
  onNavigateToLogin: () => void;
  onNavigateToHome: () => void;
  onNavigateToMap: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateToLogin,
  onNavigateToHome,
  onNavigateToMap,
}) => {
  const user = useUserStore(state => state.user);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const currentTeam = useTeamStore(state => state.currentTeam);
  const logout = useUserStore(state => state.logout);

  const handleLogout = () => {
    logout();
    onNavigateToLogin();
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>我的</Text>
        </View>

        <View style={styles.unauthenticatedContent}>
          <Text style={styles.unauthenticatedIcon}>👤</Text>
          <Text style={styles.unauthenticatedTitle}>未登录</Text>
          <Text style={styles.unauthenticatedDesc}>
            登录后可以创建或加入队伍
          </Text>
          <View style={styles.loginButtons}>
            <Button
              title="登录"
              variant="primary"
              onPress={onNavigateToLogin}
              style={styles.loginButton}
            />
            <Button
              title="注册"
              variant="secondary"
              onPress={onNavigateToLogin}
              style={styles.loginButton}
            />
          </View>
        </View>

        {/* 底部导航 */}
        <View style={styles.tabBar}>
          <View style={styles.tabItem} onTouchEnd={onNavigateToHome}>
            <Text style={styles.tabIcon}>🏠</Text>
            <Text style={styles.tabLabel}>首页</Text>
          </View>
          <View style={styles.tabItem} onTouchEnd={onNavigateToMap}>
            <Text style={styles.tabIcon}>🗺️</Text>
            <Text style={styles.tabLabel}>地图</Text>
          </View>
          <View style={styles.tabItem}>
            <Text style={[styles.tabIcon, styles.tabIconActive]}>👤</Text>
            <Text style={[styles.tabLabel, styles.tabLabelActive]}>我的</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>我的</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* 用户信息卡片 */}
        <View style={styles.profileCard}>
          <Avatar name={user?.nickname || user?.username} size="xlarge" />
          <Text style={styles.username}>{user?.nickname || user?.username}</Text>
          <Text style={styles.userid}>ID: {user?.id}</Text>
        </View>

        {/* 当前队伍 */}
        {currentTeam && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>当前队伍</Text>
            <TouchableOpacity style={styles.teamCard}>
              <View style={styles.teamInfo}>
                <Text style={styles.teamName}>{currentTeam.name}</Text>
                <Text style={styles.teamMembers}>
                  {currentTeam.members.length}/{currentTeam.maxMembers} 人
                </Text>
              </View>
              <Text style={styles.teamStatus}>剩余 3 天</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 功能列表 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>功能</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuItemText}>设置</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuItemText}>通知</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuItemText}>帮助与反馈</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>ℹ️</Text>
            <Text style={styles.menuItemText}>关于我们</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 退出登录 */}
        <View style={styles.section}>
          <Button
            title="退出登录"
            variant="secondary"
            onPress={handleLogout}
            fullWidth
          />
        </View>

        {/* 底部间距 */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* 底部导航 */}
      <View style={styles.tabBar}>
        <View style={styles.tabItem} onTouchEnd={onNavigateToHome}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>首页</Text>
        </View>
        <View style={styles.tabItem} onTouchEnd={onNavigateToMap}>
          <Text style={styles.tabIcon}>🗺️</Text>
          <Text style={styles.tabLabel}>地图</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={[styles.tabIcon, styles.tabIconActive]}>👤</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>我的</Text>
        </View>
      </View>
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
  unauthenticatedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  unauthenticatedIcon: {
    fontSize: 80,
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  unauthenticatedTitle: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  unauthenticatedDesc: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  loginButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  loginButton: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.xxl,
    margin: spacing.lg,
    alignItems: 'center',
  },
  username: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  userid: {
    fontSize: fontSize.md,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  teamCard: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  teamMembers: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
  },
  teamStatus: {
    fontSize: fontSize.sm,
    color: colors.warning,
  },
  menuItem: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.card,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: fontSize.lg,
    color: colors.text.primary,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.text.tertiary,
  },
  bottomPadding: {
    height: spacing.xxl,
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
  tabIconActive: {
    color: colors.primary,
  },
  tabLabel: {
    fontSize: fontSize.sm,
    color: colors.text.tertiary,
  },
  tabLabelActive: {
    color: colors.primary,
  },
});

export default ProfileScreen;
