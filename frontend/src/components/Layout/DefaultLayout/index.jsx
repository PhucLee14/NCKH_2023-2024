import Header from "~/components/Layout/components/Header";
import styles from "./DefaultLayout.module.scss";
import Table from "~/components/Layout/components/Table";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
