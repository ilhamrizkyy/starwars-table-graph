import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import { Bar } from "react-chartjs-2";

import './Table.css';

const TableAndGraph = () => {
    const [peopleList, setPeopleList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [chartData, setChartData] = useState({})

    let fetchPeopleList = useCallback(({ pageIndex }) => {
        let fetchPeople = async (pageIndex) => {
            let charName = [];
            let charHeight = [];
            let charMass = [];
            try {
                setIsLoading(true)
                let response = await axios.get(`https://swapi.dev/api/people/?page=${pageIndex + 1}`)
                setPeopleList(response.data.results)
                localStorage.setItem('data', JSON.stringify(response))
                let count = response.data.count
                var pagesize = 10
                let pageCount = Math.ceil(count / pagesize)
                setPageCount(pageCount)
                setIsLoading(false)
                for (const dataObj of response.data.results) {
                    charName.push(dataObj.name);
                    charHeight.push(parseInt(dataObj.height));
                    charMass.push(parseInt(dataObj.mass));
                }
                setChartData({
                    labels: charName,
                    datasets: [
                        {
                            label: "Character Height",
                            data: charHeight,
                            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.6)",
                                "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.6)"
                                , "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.6)"],
                            borderWidth: 4
                        },
                        {
                            label: "Character Mass",
                            data: charMass,
                            backgroundColor: ["rgba(122, 52, 120, 0.6)", "rgba(122, 52, 120, 0.6)",
                                "rgba(122, 52, 120, 0.6)", "rgba(122, 52, 120, 0.6)", "rgba(122, 52, 120, 0.6)",
                                "rgba(122, 52, 120, 0.6)", "rgba(122, 52, 120, 0.6)", "rgba(122, 52, 120, 0.6)", "rgba(122, 52, 120, 0.6)",
                                "rgba(122, 52, 120, 0.6)", "rgba(122, 52, 120, 0.6)"],
                            borderWidth: 4
                        },
                    ]
                });
            } catch (err) {
                console.log('Error:', err)
            }
            console.log(charName, charHeight, charMass)
        }
        fetchPeople(pageIndex)
    }, [])

    let columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Height (cm)',
                accessor: 'height',
            },
            {
                Header: 'Mass (Kg)',
                accessor: 'mass',
            },
            {
                Header: 'Hair Color',
                accessor: 'hair_color',
            },
            {
                Header: 'Skin Color',
                accessor: 'skin_color',
            },
        ],
        [],
    )

    return (
        <div className="content-wrapper">
            <PeopleTable
                columns={columns}
                fetchPeopleList={fetchPeopleList}
                isLoading={isLoading}
                pageCount={pageCount}
                peopleList={peopleList}
            />
            <div className="chart-wrapper">
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: true
                                    }
                                },
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        </div>
    )
}

const PeopleTable = ({ columns, peopleList: data, isLoading, pageCount: controlledPageCount, fetchPeopleList }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        pageOptions,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            pageCount: controlledPageCount
        },
        usePagination
    )

    useEffect(() => {
        fetchPeopleList({ pageIndex, pageSize })
    }, [fetchPeopleList, pageIndex, pageSize])

    return (
        <div className='people-table'>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={headerIndex}
                        >
                            {headerGroup.headers.map((column, columnIndex) => {
                                return (
                                    <th key={columnIndex} {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {!isLoading && (
                        page.map((row, rowIndex) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} key={rowIndex}>
                                    {row.cells.map((cell, cellIndex) => {
                                        return (
                                            <td key={cellIndex}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
            {
                !isLoading &&
                <div className='pagination'>
                    <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
                        {'First'}
                    </button>{' '}
                    <button disabled={!canPreviousPage} onClick={() => previousPage()}>
                        {'Previous'}
                    </button>{' '}
                    <button disabled={!canNextPage} onClick={() => nextPage()}>
                        {'Next'}
                    </button>{' '}
                    <button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
                        {'Last'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                </div>
            }
            {
                isLoading && <Skeleton
                    count={10} height={50}
                    width={'100%'}
                />
            }
        </div>
    )
}

export default TableAndGraph