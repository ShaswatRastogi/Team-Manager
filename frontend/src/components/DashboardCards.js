function DashboardCards({ tasks }) {
  return (
    <div className="cards">

      <div className="card">
        <h3>Total Tasks</h3>
        <p>{tasks.length}</p>
      </div>

      <div className="card">
        <h3>Completed</h3>
        <p>
          {
            tasks.filter(
              (task) =>
                task.status === "Completed"
            ).length
          }
        </p>
      </div>

      <div className="card">
        <h3>Pending</h3>
        <p>
          {
            tasks.filter(
              (task) =>
                task.status === "Pending"
            ).length
          }
        </p>
      </div>

      <div className="card">
        <h3>In Progress</h3>
        <p>
          {
            tasks.filter(
              (task) =>
                task.status === "In Progress"
            ).length
          }
        </p>
      </div>

    </div>
  );
}

export default DashboardCards;