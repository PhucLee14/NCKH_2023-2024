import * as React from "react";
import { useTable } from "react-table";
import styles from "./Table.module.scss";
import drlData from "~/DIEM_REN_LUYEN.json";
import Button from "../Button";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
var i = 1;
function Table({ dataName }) {
    const data = React.useMemo(() => dataName, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "STT",
                accessor: "ID",
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
    console.log(data);

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
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
                                        {cell
                                            .getCellProps()
                                            .key.substring(
                                                cell.getCellProps().key.length -
                                                    7
                                            ) === "content"
                                            ? cell
                                                  .render("Cell")
                                                  .props.data[
                                                      index
                                                  ].content.split("\n")[0]
                                            : cell.render("Cell")}
                                        {cell
                                            .getCellProps()
                                            .key.substring(
                                                cell.getCellProps().key.length -
                                                    7
                                            ) === "content" ? (
                                            <div
                                                className={cx("activity-type")}
                                            >
                                                {cell
                                                    .render("Cell")
                                                    .props.data[
                                                        index
                                                    ].content.split("\n")
                                                    .map((item, i) =>
                                                        cell
                                                            .render("Cell")
                                                            .props.data[
                                                                index
                                                            ].content.split(
                                                                "\n"
                                                            )[i] !=
                                                            cell
                                                                .render("Cell")
                                                                .props.data[
                                                                    index
                                                                ].content.split(
                                                                    "\n"
                                                                )[0] &&
                                                        cell
                                                            .render("Cell")
                                                            .props.data[
                                                                index
                                                            ].content.split(
                                                                "\n"
                                                            )[i] !=
                                                            cell
                                                                .render("Cell")
                                                                .props.data[
                                                                    index
                                                                ].content.split(
                                                                    "\n"
                                                                )[
                                                                cell
                                                                    .render(
                                                                        "Cell"
                                                                    )
                                                                    .props.data[
                                                                        index
                                                                    ].content.split(
                                                                        "\n"
                                                                    ).length - 1
                                                            ] ? (
                                                            <p
                                                                className={cx(
                                                                    "activity-detail"
                                                                )}
                                                            >
                                                                {item}
                                                            </p>
                                                        ) : (
                                                            <p></p>
                                                        )
                                                    )}
                                                {
                                                    cell
                                                        .render("Cell")
                                                        .props.data[
                                                            index
                                                        ].content.split("\n")[
                                                        cell
                                                            .render("Cell")
                                                            .props.data[
                                                                index
                                                            ].content.split(
                                                                "\n"
                                                            ).length - 1
                                                    ]
                                                }
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {}
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
