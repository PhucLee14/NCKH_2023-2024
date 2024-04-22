import React, { useState } from "react";

import { useTable } from "react-table";
import NewsFeed from "../../pages/newsfeed/NewsFeed";
function Table({ dataName }) {
    const [modal, setModal] = useState(false);
    const [point, setPoint] = useState(0);
    const [pos, setPos] = useState(0);

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

    return (
        <div className="mb-10 flex flex-col">
            <div className="m-6 mb-0 text-sm">
                {" "}
                Điểm hiện tại: <span className="font-bold">{point}</span>
            </div>
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
                            <th className="text-left bg-indigo-600 text-white p-4"></th>
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
                                    <button
                                        className="text-indigo-600 font-bold hover:underline"
                                        onClick={() =>
                                            document
                                                .getElementById("my_modal_2")
                                                .showModal()
                                        }
                                    >
                                        Xem thêm
                                    </button>
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            const { value, checked } = e.target;
                                            if (checked) {
                                                setPoint(
                                                    point + data[index].point
                                                );
                                            } else {
                                                setPoint(
                                                    point - data[index].point
                                                );
                                            }
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {/* <div className="fixed w-full h-full z-50 bg-opacity-30 bg-gray-400 left-0 top-0 flex justify-center items-center">
                <div className="bg-white w-3/4 h-3/4 rounded-xl">
                    <h1 className="p-8" onClick={setModal(false)}>
                        x
                    </h1>
                </div>
            </div> */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                        Press ESC key or click outside to close
                    </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}

export default Table;
