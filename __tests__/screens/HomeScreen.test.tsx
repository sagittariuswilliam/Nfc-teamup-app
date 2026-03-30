import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { HomeScreen } from '../../src/screens/HomeScreen';

// Mock zustand store
jest.mock('../../src/store/teamStore', () => ({
  useTeamStore: jest.fn(),
}));

const mockCreateTeam = jest.fn();
const mockIsJoined = false;

describe('HomeScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('../../src/store/teamStore').useTeamStore.mockImplementation((selector) => {
      if (typeof selector === 'function') {
        return selector({ createTeam: mockCreateTeam, isJoined: mockIsJoined, currentTeam: null });
      }
      return { createTeam: mockCreateTeam, isJoined: mockIsJoined, currentTeam: null };
    });
  });

  test('renders correctly', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    expect(getByText('碰一碰组队')).toBeTruthy();
    expect(getByText('创建队伍')).toBeTruthy();
    expect(getByText('加入队伍')).toBeTruthy();
  });

  test('shows create team card', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    expect(getByText('快速组建你的小队，设置有效期 1-14 天')).toBeTruthy();
  });

  test('shows join team card', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    expect(getByText('碰一碰或输入邀请码加入')).toBeTruthy();
  });

  test('opens create team modal when create card is pressed', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    fireEvent.press(getByText('创建队伍'));
    
    expect(getByText('创建队伍')).toBeTruthy();
    expect(getByText('队伍名称')).toBeTruthy();
  });

  test('opens join team modal when join card is pressed', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    fireEvent.press(getByText('加入队伍'));
    
    expect(getByText('加入队伍')).toBeTruthy();
    expect(getByText('邀请码')).toBeTruthy();
  });

  test('creates team with valid data', async () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText, getByPlaceholderText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    // Open create modal
    fireEvent.press(getByText('创建队伍'));
    
    // Fill in form
    fireEvent.changeText(getByPlaceholderText('给队伍起个名字'), 'Test Team');
    fireEvent.changeText(getByPlaceholderText('20'), '10');
    fireEvent.changeText(getByPlaceholderText('7'), '5');
    
    // Submit
    fireEvent.press(getByText('创建'));
    
    await waitFor(() => {
      expect(mockCreateTeam).toHaveBeenCalledWith('Test Team', 10, 5);
    });
  });

  test('navigates to map when map tab is pressed', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    fireEvent.press(getByText('地图'));
    
    expect(onNavigateToMap).toHaveBeenCalledTimes(1);
  });

  test('navigates to profile when profile tab is pressed', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    fireEvent.press(getByText('我的'));
    
    expect(onNavigateToProfile).toHaveBeenCalledTimes(1);
  });

  test('closes create modal when cancel is pressed', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText, queryByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    // Open create modal
    fireEvent.press(getByText('创建队伍'));
    
    // Cancel
    fireEvent.press(getByText('取消'));
    
    // Modal should be closed
    expect(queryByText('队伍名称')).toBeFalsy();
  });

  test('shows empty state when no team', () => {
    const onCreateTeam = jest.fn();
    const onJoinTeam = jest.fn();
    const onNavigateToMap = jest.fn();
    const onNavigateToProfile = jest.fn();
    
    const { getByText } = render(
      <HomeScreen 
        onCreateTeam={onCreateTeam}
        onJoinTeam={onJoinTeam}
        onNavigateToMap={onNavigateToMap}
        onNavigateToProfile={onNavigateToProfile}
      />
    );
    
    expect(getByText('暂无活跃队伍')).toBeTruthy();
    expect(getByText('创建或加入一个队伍开始组队')).toBeTruthy();
  });
});
