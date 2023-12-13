const SessionList = ({ sessions }) => {
  return (
    <div>
      <h2>Sessions</h2>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>
            <strong>{session.header}</strong> - {session.date} - {session.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;