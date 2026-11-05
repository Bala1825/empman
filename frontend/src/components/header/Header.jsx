
import { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="app-header">

      <div className="header-welcome">
        <h2>Welcome back!</h2>
        <p>Here's your workspace at a glance.</p>
      </div>

      <div className="header-clock">
        <div className="clock-icon">🕒</div>

        <div className="clock-details">
          <h3>{formattedTime}</h3>
          <p>{formattedDate}</p>
        </div>
      </div>

      <div className="header-actions">

        <button className="header-help">
          <span>🎧</span>
          Help Desk
        </button>

        <button className="header-notification" aria-label="Notifications">
          🔔
          <span className="notification-dot"></span>
        </button>

      </div>

    </header>
  );
}

export default Header;
