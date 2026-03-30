import { useTeamStore } from '../../src/store/teamStore';

describe('teamStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTeamStore.setState({
      currentTeam: null,
      isJoined: false,
    });
  });

  test('initial state is correct', () => {
    const state = useTeamStore.getState();
    
    expect(state.currentTeam).toBeNull();
    expect(state.isJoined).toBe(false);
  });

  test('createTeam creates a new team', () => {
    const { createTeam } = useTeamStore.getState();
    
    createTeam('Test Team', 20, 7);
    
    const state = useTeamStore.getState();
    expect(state.currentTeam).toBeTruthy();
    expect(state.currentTeam?.name).toBe('Test Team');
    expect(state.currentTeam?.maxMembers).toBe(20);
    expect(state.currentTeam?.members.length).toBe(1);
    expect(state.currentTeam?.captainId).toBe('user_001');
    expect(state.isJoined).toBe(true);
  });

  test('createTeam sets correct expiration date', () => {
    const { createTeam } = useTeamStore.getState();
    
    createTeam('Test Team', 20, 7);
    
    const state = useTeamStore.getState();
    expect(state.currentTeam?.expiresAt).toBeTruthy();
    
    const expiresAt = new Date(state.currentTeam!.expiresAt);
    const now = new Date();
    const diffDays = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    expect(diffDays).toBeGreaterThan(6);
    expect(diffDays).toBeLessThan(8);
  });

  test('createTeam sets isActive to true', () => {
    const { createTeam } = useTeamStore.getState();
    
    createTeam('Test Team', 20, 7);
    
    expect(useTeamStore.getState().currentTeam?.isActive).toBe(true);
  });

  test('joinTeam sets current team', () => {
    const { joinTeam } = useTeamStore.getState();
    
    const mockTeam = {
      id: 'team_002',
      name: 'Joined Team',
      captainId: 'user_002',
      members: [],
      maxMembers: 10,
      createdAt: new Date().toISOString(),
      expiresAt: new Date().toISOString(),
      isActive: true,
    };
    
    joinTeam(mockTeam);
    
    const state = useTeamStore.getState();
    expect(state.currentTeam).toEqual(mockTeam);
    expect(state.isJoined).toBe(true);
  });

  test('leaveTeam clears current team', () => {
    // First create a team
    useTeamStore.getState().createTeam('Test Team', 20, 7);
    
    expect(useTeamStore.getState().currentTeam).toBeTruthy();
    expect(useTeamStore.getState().isJoined).toBe(true);
    
    // Then leave
    useTeamStore.getState().leaveTeam();
    
    expect(useTeamStore.getState().currentTeam).toBeNull();
    expect(useTeamStore.getState().isJoined).toBe(false);
  });

  test('updateTeam updates team fields', () => {
    // First create a team
    useTeamStore.getState().createTeam('Test Team', 20, 7);
    
    // Update team
    useTeamStore.getState().updateTeam({
      name: 'Updated Team',
      description: 'New description',
    });
    
    const team = useTeamStore.getState().currentTeam;
    expect(team?.name).toBe('Updated Team');
    expect(team?.description).toBe('New description');
  });

  test('updateTeam does nothing when currentTeam is null', () => {
    // Ensure currentTeam is null
    useTeamStore.setState({ currentTeam: null });
    
    // Try to update
    useTeamStore.getState().updateTeam({ name: 'Test' });
    
    // Should still be null
    expect(useTeamStore.getState().currentTeam).toBeNull();
  });

  test('addMember adds a member to the team', () => {
    // First create a team
    useTeamStore.getState().createTeam('Test Team', 20, 7);
    
    const newMember = {
      id: 'user_002',
      name: 'New Member',
      role: 'member' as const,
      joinedAt: new Date().toISOString(),
    };
    
    useTeamStore.getState().addMember(newMember);
    
    const team = useTeamStore.getState().currentTeam;
    expect(team?.members.length).toBe(2);
    expect(team?.members[1]).toEqual(newMember);
  });

  test('addMember does nothing when currentTeam is null', () => {
    useTeamStore.setState({ currentTeam: null });
    
    const newMember = {
      id: 'user_002',
      name: 'New Member',
      role: 'member' as const,
      joinedAt: new Date().toISOString(),
    };
    
    useTeamStore.getState().addMember(newMember);
    
    expect(useTeamStore.getState().currentTeam).toBeNull();
  });

  test('removeMember removes a member from the team', () => {
    // First create a team
    useTeamStore.getState().createTeam('Test Team', 20, 7);
    
    // Add a member
    const newMember = {
      id: 'user_002',
      name: 'New Member',
      role: 'member' as const,
      joinedAt: new Date().toISOString(),
    };
    useTeamStore.getState().addMember(newMember);
    
    expect(useTeamStore.getState().currentTeam?.members.length).toBe(2);
    
    // Remove the member
    useTeamStore.getState().removeMember('user_002');
    
    expect(useTeamStore.getState().currentTeam?.members.length).toBe(1);
    expect(useTeamStore.getState().currentTeam?.members[0].id).toBe('user_001');
  });

  test('removeMember does nothing when member not found', () => {
    // First create a team
    useTeamStore.getState().createTeam('Test Team', 20, 7);
    
    const initialLength = useTeamStore.getState().currentTeam?.members.length;
    
    // Try to remove non-existent member
    useTeamStore.getState().removeMember('non_existent');
    
    expect(useTeamStore.getState().currentTeam?.members.length).toBe(initialLength);
  });

  test('removeMember does nothing when currentTeam is null', () => {
    useTeamStore.setState({ currentTeam: null });
    
    useTeamStore.getState().removeMember('user_001');
    
    expect(useTeamStore.getState().currentTeam).toBeNull();
  });

  test('multiple members can be added', () => {
    useTeamStore.getState().createTeam('Test Team', 20, 7);
    
    useTeamStore.getState().addMember({
      id: 'user_002',
      name: 'Member 2',
      role: 'member',
      joinedAt: new Date().toISOString(),
    });
    
    useTeamStore.getState().addMember({
      id: 'user_003',
      name: 'Member 3',
      role: 'member',
      joinedAt: new Date().toISOString(),
    });
    
    expect(useTeamStore.getState().currentTeam?.members.length).toBe(3);
  });

  test('team has correct structure after creation', () => {
    useTeamStore.getState().createTeam('Test Team', 15, 5);
    
    const team = useTeamStore.getState().currentTeam;
    
    expect(team).toHaveProperty('id');
    expect(team).toHaveProperty('name');
    expect(team).toHaveProperty('captainId');
    expect(team).toHaveProperty('members');
    expect(team).toHaveProperty('maxMembers');
    expect(team).toHaveProperty('createdAt');
    expect(team).toHaveProperty('expiresAt');
    expect(team).toHaveProperty('isActive');
  });

  test('isJoined is true after creating team', () => {
    useTeamStore.getState().createTeam('Test Team', 20, 7);
    
    expect(useTeamStore.getState().isJoined).toBe(true);
  });

  test('isJoined is true after joining team', () => {
    const mockTeam = {
      id: 'team_002',
      name: 'Joined Team',
      captainId: 'user_002',
      members: [],
      maxMembers: 10,
      createdAt: new Date().toISOString(),
      expiresAt: new Date().toISOString(),
      isActive: true,
    };
    
    useTeamStore.getState().joinTeam(mockTeam);
    
    expect(useTeamStore.getState().isJoined).toBe(true);
  });
});
