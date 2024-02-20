const gymSessions = [
  { user: 8, duration: 50, equipment: ['bench'] },
  { user: 7, duration: 150, equipment: ['dumbbell', 'kettlebell'] },
  { user: 1, duration: 10, equipment: ['barbell'] },
  { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
  { user: 7, duration: 200, equipment: ['bike'] },
  { user: 2, duration: 200, equipment: ['treadmill'] },
  { user: 2, duration: 200, equipment: ['bike'] },
];
type Session = { user: number; duration: number; equipment: Array<string> };
type Options = {
  user?: number;
  minDuration?: number;
  equipment?: Array<string>;
  merge?: boolean;
};
export default function selectData(
  sessions: Array<Session>,
  options?: Options
): Array<Session> {
  // deep clone an array
  let selectedSessions: Array<Session> = JSON.parse(JSON.stringify(sessions));
  if (!options) return sessions;
  function filterUser(_user: number) {
    return selectedSessions.filter((_session) => _session.user === _user);
  }
  function filterMinDuration(_minDuration: number) {
    return selectedSessions.filter(
      (_session) => _session.duration >= _minDuration
    );
  }
  function filterEquipment(_equipment: Array<string>) {
    return selectedSessions.filter((_session) =>
      _session.equipment.some((e) => _equipment.includes(e))
    );
  }
  function mergeFn() {
    const uniqueUsers = new Set();
    const uniqueSessions: Array<Session> = [];
    const reversedSession = selectedSessions.slice().reverse();
    reversedSession.forEach((_session) => {
      if (uniqueUsers.has(_session.user)) {
        const index = uniqueSessions.findIndex((e) => e.user === _session.user);
        const element = uniqueSessions[index];
        element.duration += _session.duration;
        element.equipment = Array.from(
          new Set(element.equipment.concat(_session.equipment))
        ).sort((a, b) => a.localeCompare(b));
        uniqueSessions.splice(index, 1, element);
      } else {
        uniqueUsers.add(_session.user);
        uniqueSessions.push(_session);
      }
    });
    return uniqueSessions.reverse();
  }

  Object.keys(options).forEach((key) => {
    switch (key) {
      case 'user':
        selectedSessions = filterUser(options.user ?? 0);
        break;
      case 'merge':
        selectedSessions = mergeFn();
        break;
      case 'minDuration':
        selectedSessions = filterMinDuration(options.minDuration ?? 0);
        break;
      case 'equipment':
        selectedSessions = filterEquipment(options.equipment ?? []);
        break;
    }
  });
  return selectedSessions;
}
// console.log(selectData(gymSessions, { user: 2 }))
// console.log(selectData(gymSessions, { minDuration: 200 }))
// console.log(selectData(gymSessions, { equipment: ['bike', 'dumbbell'] }))
// console.log(selectData(gymSessions, { merge: true }));
// console.log(
//   selectData(gymSessions, {
//     merge: true,
//     minDuration: 400,
//     equipment: ['treadmill', 'bench', 'barbell', 'dumbbell', 'bike'],
//   })
// );
console.log(
  selectData(gymSessions, {
    merge: true,
    equipment: ['treadmill', 'bench', 'barbell', 'dumbbell', 'bike'],
  })
);
