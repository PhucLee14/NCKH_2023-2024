import Table from "../../components/table/Table";
// import Button from "~/components/Layout/components/Button";
import drlData from "../../assets/DIEM_REN_LUYEN.json";

const Home = () => {
    return (
        <div className="mt-14 w-5/6">
            {/* <div className="">
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Điểm mong muốn"
                    className="input w-full max-w-xs border-slate-300 ml-4"
                />
                <button className="btn btn-active btn-primary text-white ml-4">
                    Check
                </button>
            </div> */}
            <Table dataName={drlData} />
        </div>
    );
};

export default Home;
