import Table from "~/components/Layout/components/Table";
import Button from "~/components/Layout/components/Button";
import fakeData from "~/MOCK_DATA.json";
import fakeDataDrl from "~/drl.json";
import fakeDataDrl1 from "~/drl1.json";
import fakeDataDrl2 from "~/drl2.json";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
    console.log(fakeDataDrl);
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
            {/* <h3 className={cx("table-type")}>
                1. Đánh giá về ý thức tham gia học tập (Điểm tối đa 20 điểm)
            </h3> */}
            <Table dataName={fakeDataDrl} />
        </div>
    );
}

export default Home;
