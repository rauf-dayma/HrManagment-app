import { Link } from "react-router-dom";
import "./home.css"

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Interview Scheduler</h1>
      <Link className="btn home-btn" to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};
export default Home;
