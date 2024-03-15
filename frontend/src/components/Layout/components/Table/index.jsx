import * as React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.scss";
import fakeData from "~/MOCK_DATA.json";
import fakeDataDrl from "~/drl1.json";
import Button from "../Button";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Table({ dataName }) {
    const data = React.useMemo(() => dataName, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "STT",
                accessor: "id",
            },
            {
                Header: "Nội dung",
                accessor: "content",
            },
            {
                Header: "Điểm",
                accessor: "point",
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <div className={cx("container")}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                            <th>Chi tiết</th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
                                        {" "}
                                        {cell.render("Cell")}
                                        <p>
                                            {console.log(cell.getCellProps())}
                                        </p>
                                    </td>
                                ))}
                                <td>
                                    <Button table>Xem thêm</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
