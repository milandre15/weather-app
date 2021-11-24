import styles from "./Header.module.scss";
import { Plus } from "react-feather";
import { Sliders } from "react-feather";
import { MapPin } from "react-feather";
import useLocation from "../../services/useLocation";
const Header = () => {
  const location = useLocation();
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.box}>
            <Plus className={styles.icon} />
          </div>
          <div className={styles.box}>
            <MapPin className={styles.pin_icon} />
            <span className={styles.place_name}>{location.city}</span>
          </div>
          <div className={styles.box}>
            <Sliders className={styles.icon} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
