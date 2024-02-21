// https://www.greatfrontend.com/questions/javascript/data-merging?list=data-structures-algorithms

const gymSessions = [
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
];

type Session = { user: number; duration: number; equipment: Array<string> };

export default function mergeData(sessions: Array<Session>): Array<Session> {
  const sessionsClone = JSON.parse(JSON.stringify(sessions));
  const uniqueUsers = new Set();
  const uniqueSessions: Array<Session> = [];

  sessionsClone.map((session: Session) => {
    if (uniqueUsers.has(session.user)) {
      const index = uniqueSessions.findIndex(
        (s: Session) => s.user === session.user
      );
      const selectedSession = uniqueSessions[index];
      const newSession = Object.assign({}, selectedSession);
      newSession.duration += session.duration;
      newSession.equipment = Array.from(
        new Set(newSession.equipment.concat(session.equipment))
      ).sort((a, b) => a.localeCompare(b));
      uniqueSessions.splice(index, 1, newSession);
    } else {
      uniqueUsers.add(session.user);
      uniqueSessions.push(session);
    }
  });
  return uniqueSessions;
}

console.log(mergeData(gymSessions));
