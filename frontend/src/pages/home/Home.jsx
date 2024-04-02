import Table from "../../components/table/Table";
// import Button from "~/components/Layout/components/Button";
import drlData from "../../assets/DIEM_REN_LUYEN.json";
import Button from "../../components/button/Button";

const Home = () => {
    return (
        <div className="">
            <div className="">
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Điểm hiện tại"
                    className="input w-full max-w-xs"
                />
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Điểm mong muốn"
                    className="input w-full max-w-xs"
                />
                <Button table>Check</Button>
            </div>
            <Table dataName={drlData} />
        </div>
    );
};

export default Home;
