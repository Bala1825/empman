
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const dashboardCards = [
    {
      title: "Attendance",
      description: "View your attendance records",
      icon: "📅",
      link: "/attendance",
    },
    {
      title: "Work Progress",
      description: "Track your ongoing work",
      icon: "📊",
      link: "/dashboard",
    },
    {
      title: "Events",
      description: "View upcoming company events",
      icon: "🎉",
      link: "/dashboard",
    },
    {
      title: "People",
      description: "View your team members",
      icon: "👥",
      link: "/dashboard",
    },
    {
      title: "Leave Balance",
      description: "Check your available leave days",
      icon: "🏖️",
      link: "/dashboard",
    },
    {
      title: "Pending Tasks",
      description: "Review tasks that need attention",
      icon: "📝",
      link: "/dashboard",
    },
    {
      title: "Completed Tasks",
      description: "Review your completed work",
      icon: "✅",
      link: "/dashboard",
    },
    {
      title: "Upcoming Holidays",
      description: "Check upcoming holidays",
      icon: "🎊",
      link: "/notfound/notfound.jsx",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <p className="dashboard-welcome">
          Welcome back! Here's your workspace overview.
        </p>
      </div>

      <div className="dashboard-cards">
        {dashboardCards.map((card) => (
          <Link
            to={card.link}
            className="dashboard-card"
            key={card.title}
          >
            <div className="dashboard-card-icon">
              {card.icon}
            </div>

            <h2>{card.title}</h2>

            <p>{card.description}</p>

            <span className="dashboard-card-link">
              View details →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
