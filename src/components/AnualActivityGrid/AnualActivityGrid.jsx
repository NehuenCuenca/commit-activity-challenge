import { getMonths } from "../../helpers/dates";
import WeekActivityItem from "../WeekActivityItem/WeekActivityItem";
import "./AnualActivityGrid.css";

const AnualActivityGrid = ({ activity }) => {
  const activityWithConvertedTimestamps = activity.map(({ week, ...rest }) => ({
    week: new Date(week * 1_000),
    ...rest,
  }));

  const months = getMonths(activityWithConvertedTimestamps)

  return (
    <div className="container-activity">
      <ol className="months-guide">
        {months.map((monthGuide, monthGuideIndex) => (
          <li key={monthGuideIndex}>{monthGuide}</li>
        ))}
      </ol>
      
      <ol className="days-guide">
        {["Monday", "Wednesday", "Friday"].map((dayGuide, dayGuideIndex) => (
          <li key={dayGuideIndex}>{dayGuide.slice(0, 3)}</li>
        ))}
      </ol>

      <ul className="anual-list">
        {activityWithConvertedTimestamps.map((weekActivity, index) => (
          <WeekActivityItem key={index} weekActivity={weekActivity} />
        ))}
      </ul>
    </div>
  );
};

export default AnualActivityGrid;
