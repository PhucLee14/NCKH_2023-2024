import * as React from "react";
import { useTable } from "react-table";
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
        <div className="mb-10">
            <table
                {...getTableProps()}
                className="border-collapse overflow-hidden rounded-xl m-4 bg-white shadow-xl"
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps()}
                                    className="text-left bg-indigo-600 text-white p-4"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                            <th className="text-left bg-indigo-600 text-white p-4">
                                Chi tiết
                            </th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="hover:bg-indigo-50"
                            >
                                {row.cells.map((cell) => (
                                    <td
                                        {...cell.getCellProps()}
                                        className="p-4 text-black"
                                    >
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
                                            <div className="text-indigo-600 italic text-sm mt-2 font-bold h-full w-full  ">
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
                                                            <p className="text-black font-normal ">
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
                                    <button className="text-indigo-600 font-bold hover:underline">
                                        Xem thêm
                                    </button>
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
