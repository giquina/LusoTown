export const communityStats = {
  members: process.env.NEXT_PUBLIC_TOTAL_MEMBERS || '750+',
  students: process.env.NEXT_PUBLIC_TOTAL_STUDENTS || '2150+',
  partnerships: process.env.NEXT_PUBLIC_UNIVERSITY_PARTNERSHIPS || '8',
  events: process.env.NEXT_PUBLIC_MONTHLY_EVENTS || '12+'
};

export const communityMilestones = {
  foundedYear: process.env.NEXT_PUBLIC_FOUNDED_YEAR || '2024',
  firstEvent: process.env.NEXT_PUBLIC_FIRST_EVENT_DATE || '2024',
  majorMilestones: [
    { year: '2024', description: 'Platform Launch' },
    { year: '2024', description: 'First 500 Members' },
    { year: '2025', description: 'Portuguese speakers' }
  ]
};

// Helper function to get numeric value from stats (removes + and converts to number)
export const getNumericStat = (stat: string): number => {
  return parseInt(stat.replace(/[^\d]/g, '')) || 0;
};

// Helper function to format stats for display
export const formatStat = (stat: string, showPlus: boolean = true): string => {
  const num = getNumericStat(stat);
  return showPlus ? `${num}+` : num.toString();
};