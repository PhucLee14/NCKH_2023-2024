import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("navbar")}>
                    <div className={cx("link-section")}>
                        <Link className={cx("header-item")} to="/">
                            Home
                        </Link>
                        <Link className={cx("header-item")} to="/upload">
                            Upload
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
