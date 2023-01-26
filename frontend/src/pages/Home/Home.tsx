import { Link } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";

import "./Home.scss";
import NumberText from "./NumberText/NumberText";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo"><RiProductHuntLine size={35}/></div>
        <ul className="home-links">
          <ShowOnLogout>
            <li><Link to="/register">Register</Link></li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Login</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      <section className="container hero">
        <div className="hero-text">
          <h2>Inventory & Stock Management Solution</h2>
          <p>Inventory system to control and manage products in the warehouse in real time and integrated to make it easier to develop your business.</p>
          <div className="hero-buttons">
            <button className="--btn --btn-secondary">
              <Link to="/dashboard">1 Month Free Trial</Link>
            </button>
          </div>
          <div className="--flex-start">
            <NumberText num="14k" text="Brand Owners" />
            <NumberText num="23k" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="inventory" />
        </div>
      </section>
    </div>
  )
};

export default Home;