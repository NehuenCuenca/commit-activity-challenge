import { calculateColorByCommits } from "../../helpers/colors";
import "./DayActivity.css";

const DayActivity = ({ commits = null, initialColor }) => {

  const color = (commits === null) 
                ? initialColor 
                : calculateColorByCommits(commits) 
            
  return (
    <li
      className="days-list__day-item"
      title={commits}
      style={{ backgroundColor: `var(${color})` }}
    ></li>
  );
};

export default DayActivity;
