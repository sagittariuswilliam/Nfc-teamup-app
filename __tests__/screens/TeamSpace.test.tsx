import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TeamSpace } from '../../src/screens/TeamSpace';

// Mock zustand store
jest.mock('../../src/store/teamStore', () => ({
  useTeamStore: jest.fn(),
}));

// Mock child components
jest.mock('../../src/screens/ChatTab', () => ({
  __esModule: true,
  default: () => <test-child>ChatTab</test-child>,
}));

jest.mock('../../src/screens/MapTab', () => ({
  __esModule: true,
  default: () => <test-child>MapTab</test-child>,
}));

jest.mock('../../src/screens/FileTab', () => ({
  __esModule: true,
  default: () => <test-child>FileTab</test-child>,
}));

jest.mock('../../src/screens/InfoTab', () => ({
  __esModule: true,
  default: ({ onShowExitModal, onShowDismissModal, isCaptain }) => (
    <test-child>
      InfoTab
      <button onPress={onShowExitModal}>Exit Button</button>
      <button onPress={onShowDismissModal}>Dismiss Button</button>
      {isCaptain ? 'Captain' : 'Member'}
    </test-child>
  ),
}));

const mockCurrentTeam = {
  id: 'team_001',
  name: 'Test Team',
  captainId: 'user_001',
  members: [],
  maxMembers: 20,
  createdAt: new Date().toISOString(),
  expiresAt: new Date().toISOString(),
  isActive: true,
};

describe('TeamSpace Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('../../src/store/teamStore').useTeamStore.mockImplementation((selector) => {
      if (typeof selector === 'function') {
        return selector({ currentTeam: mockCurrentTeam });
      }
      return { currentTeam: mockCurrentTeam };
    });
  });

  test('renders correctly', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    expect(getByText('Test Team')).toBeTruthy();
    expect(getByText('队伍信息')).toBeTruthy();
  });

  test('renders all tabs', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    expect(getByText('聊天')).toBeTruthy();
    expect(getByText('地图')).toBeTruthy();
    expect(getByText('文件')).toBeTruthy();
    expect(getByText('信息')).toBeTruthy();
  });

  test('shows ChatTab by default', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    expect(getByText('ChatTab')).toBeTruthy();
  });

  test('switches to MapTab when map tab is pressed', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    fireEvent.press(getByText('地图'));
    
    expect(getByText('MapTab')).toBeTruthy();
  });

  test('switches to FileTab when file tab is pressed', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    fireEvent.press(getByText('文件'));
    
    expect(getByText('FileTab')).toBeTruthy();
  });

  test('switches to InfoTab when info tab is pressed', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    fireEvent.press(getByText('信息'));
    
    expect(getByText('InfoTab')).toBeTruthy();
  });

  test('shows exit modal when exit button is pressed in InfoTab', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Switch to InfoTab
    fireEvent.press(getByText('信息'));
    
    // Press exit button
    fireEvent.press(getByText('Exit Button'));
    
    expect(getByText('退出队伍确认')).toBeTruthy();
  });

  test('shows dismiss modal when dismiss button is pressed in InfoTab', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Switch to InfoTab
    fireEvent.press(getByText('信息'));
    
    // Press dismiss button
    fireEvent.press(getByText('Dismiss Button'));
    
    expect(getByText('解散队伍确认')).toBeTruthy();
  });

  test('calls onLeaveTeam when exit is confirmed', async () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Switch to InfoTab and open exit modal
    fireEvent.press(getByText('信息'));
    fireEvent.press(getByText('Exit Button'));
    
    // Confirm exit
    fireEvent.press(getByText('确认退出'));
    
    await waitFor(() => {
      expect(onLeaveTeam).toHaveBeenCalledTimes(1);
    });
  });

  test('calls onLeaveTeam when dismiss is confirmed', async () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Switch to InfoTab and open dismiss modal
    fireEvent.press(getByText('信息'));
    fireEvent.press(getByText('Dismiss Button'));
    
    // Confirm dismiss
    fireEvent.press(getByText('确认解散'));
    
    await waitFor(() => {
      expect(onLeaveTeam).toHaveBeenCalledTimes(1);
    });
  });

  test('closes exit modal when cancel is pressed', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText, queryByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Switch to InfoTab and open exit modal
    fireEvent.press(getByText('信息'));
    fireEvent.press(getByText('Exit Button'));
    
    // Cancel
    fireEvent.press(getByText('取消'));
    
    // Modal should be closed
    expect(queryByText('退出队伍确认')).toBeFalsy();
  });

  test('navigates to map when bottom nav map is pressed', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getAllByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Find map in bottom nav
    const mapTabs = getAllByText('地图');
    fireEvent.press(mapTabs[0]); // Bottom nav item
    
    expect(onNavigateToMap).toHaveBeenCalledTimes(1);
  });

  test('navigates to profile when bottom nav profile is pressed', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getAllByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Find profile in bottom nav
    const profileTabs = getAllByText('我的');
    fireEvent.press(profileTabs[0]); // Bottom nav item
    
    expect(onNavigateToProfile).toHaveBeenCalledTimes(1);
  });

  test('shows captain indicator when user is captain', () => {
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    const onLeaveTeam = jest.fn();
    
    const { getByText } = render(
      <TeamSpace 
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
        onLeaveTeam={onLeaveTeam}
      />
    );
    
    // Switch to InfoTab
    fireEvent.press(getByText('信息'));
    
    expect(getByText('Captain')).toBeTruthy();
  });
});
