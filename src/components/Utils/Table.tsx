import React, { useId } from "react";

export default function Table(props : any) {
    const columns = props.columnNames;
    const data = props.data;
    const title = props.title;
    const isShrinkable = props.isShrinkable;
    const idShrinkButton = useId();
    function shrink() {
        // Change the logo to an arrow pointing right
        // Hide all rows except the column names
        const button = document.getElementById(idShrinkButton);
        if (button === null) {
            return;
        }
        const svg = button.getElementsByTagName('svg')[0];
        if (svg === undefined) {
            return;
        }
        const path = svg.getElementsByTagName('path')[0];
        if (path === undefined) {
            return;
        }
        if (path.getAttribute('d') === "M9 5l7 7-7 7") {
            path.setAttribute('d', "M5 13l7 7 7-7");
        }
        else {
            path.setAttribute('d', "M9 5l7 7-7 7");
        }

        const table = button.closest('table');
        if (table === null) {
            return;
        }
        const tbody = table.getElementsByTagName('tbody')[0];
        if (tbody === undefined) {
            return;
        }
        const rows = tbody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            row.classList.toggle('hidden');
        }

    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {title !== undefined ?
                                    <tr>
                                        <th
                                            colSpan={columns.length}
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                        { isShrinkable ?
                                            <button onClick={shrink} className="inline-block" id={idShrinkButton}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l7 7 7-7" />
                                                </svg>
                                            </button>
                                        : null
                                        }
                                            {title}
                                        </th>
                                    </tr>
                                : null
                                }
                                <tr>
                                    {columns.map((column : any) => (
                                        <th
                                            key={column}
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.map((row : any) => (
                                    <tr key={row}>
                                        {columns.map((column : any, index: number) => (
                                            <td
                                                key={column}
                                                className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                                            >
                                                {row[index]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
