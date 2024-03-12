import DayActivity from "../DayActivity/DayActivity";
import './WeekActivityItem.css'

const WeekActivityItem = ({ weekActivity }) => {
  return (
    <li className="week-item">
      <ol className="days-list">
        {weekActivity.days.map((commitsPerDay, index) => (
          <DayActivity key={index} commits={commitsPerDay} />
        ))}
      </ol>
    </li>
  );
};

export default WeekActivityItem;
