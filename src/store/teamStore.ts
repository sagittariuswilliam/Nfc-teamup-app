import { create } from 'zustand';

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: 'captain' | 'member';
  joinedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  captainId: string;
  members: TeamMember[];
  maxMembers: number;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

interface TeamState {
  // 当前队伍
  currentTeam: Team | null;
  
  // 队伍状态
  isJoined: boolean;
  
  // 操作
  createTeam: (name: string, maxMembers: number, days: number) => void;
  joinTeam: (team: Team) => void;
  leaveTeam: () => void;
  updateTeam: (updates: Partial<Team>) => void;
  
  // 成员管理
  addMember: (member: TeamMember) => void;
  removeMember: (memberId: string) => void;
}

export const useTeamStore = create<TeamState>((set, get) => ({
  currentTeam: null,
  isJoined: false,

  createTeam: (name, maxMembers, days) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    
    // 模拟当前用户 ID
    const currentUserId = 'user_001';
    
    const newTeam: Team = {
      id: `team_${Date.now()}`,
      name,
      captainId: currentUserId,
      members: [
        {
          id: currentUserId,
          name: '我',
          role: 'captain',
          joinedAt: now.toISOString(),
        },
      ],
      maxMembers,
      createdAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      isActive: true,
    };

    set({ currentTeam: newTeam, isJoined: true });
  },

  joinTeam: (team) => {
    set({ currentTeam: team, isJoined: true });
  },

  leaveTeam: () => {
    set({ currentTeam: null, isJoined: false });
  },

  updateTeam: (updates) => {
    const { currentTeam } = get();
    if (currentTeam) {
      set({ currentTeam: { ...currentTeam, ...updates } });
    }
  },

  addMember: (member) => {
    const { currentTeam } = get();
    if (currentTeam) {
      set({
        currentTeam: {
          ...currentTeam,
          members: [...currentTeam.members, member],
        },
      });
    }
  },

  removeMember: (memberId) => {
    const { currentTeam } = get();
    if (currentTeam) {
      set({
        currentTeam: {
          ...currentTeam,
          members: currentTeam.members.filter(m => m.id !== memberId),
        },
      });
    }
  },
}));

export default useTeamStore;
