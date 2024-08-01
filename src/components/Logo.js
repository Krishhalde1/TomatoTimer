import { Link } from "react-router-dom";
import logo from "../assets/Logo1.png";
import classes from "./Logo.module.css";

export default function Logo() {
  return (
    <h1 className={classes.text}>
      <Link to="/" className={classes.link}>
        <img src={logo} alt="TomatoTimer-logo" className={classes.logo} />
        TomatoTimer
      </Link>
    </h1>
  );
}
