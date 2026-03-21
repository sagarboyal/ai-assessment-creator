import {
  AssignmentIcon,
  BookIcon,
  ClockIcon,
  GridIcon,
  GroupIcon,
} from '../components/icons'

export const navigationItems = [
  { label: 'Home', active: false, icon: GridIcon },
  { label: 'My Groups', active: false, icon: GroupIcon },
  { label: 'Assignments', active: true, icon: AssignmentIcon },
  { label: "AI Teacher's Toolkit", active: false, icon: BookIcon },
  { label: 'My Library', active: false, icon: ClockIcon },
] as const
