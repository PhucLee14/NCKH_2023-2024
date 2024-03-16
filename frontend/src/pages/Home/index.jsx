import Table from "~/components/Layout/components/Table";
import Button from "~/components/Layout/components/Button";
import drlData from "~/DIEM_REN_LUYEN.json";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("home-container")}>
            <div className={cx("controll-section")}>
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Điểm hiện tại"
                    className={cx("input-point")}
                />
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Điểm mong muốn"
                    className={cx("input-point")}
                />
                <Button primary>Check</Button>
            </div>
            <Table dataName={drlData} />
        </div>
    );
}

export default Home;
