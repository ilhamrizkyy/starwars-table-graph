import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';

import './Table.css';

const Table = () => {
    const [peopleList, setPeopleList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)

    let fetchPeopleList = useCallback(({ pageIndex }) => {
        let fetchPeople = async (pageIndex) => {
            try {
                setIsLoading(true)
                let response = await axios.get(`https://swapi.dev/api/people/?page=${pageIndex+1}`)
                setPeopleList(response.data.results)
                let count = response.data.count
                pagesize = 10
                let controlledPageCount = Math.ceil(count/ pagesize)
                setPageCount(controlledPageCount)
                setIsLoading(false)
            } catch (err) {
                console.log('Error:', err)
            }
        }
        fetchPeople(pageIndex)
    },[]) 

    let columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Height',
                accessor: 'height',
            },
            {
                Header: 'Mass',
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
        <PeopleTable
            columns = { columns }
            fetchPeopleList = { fetchPeopleList }
            isLoading = { isLoading }
            pageCount = { pageCount }
            peopleList = { peopleList }
        />
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
        fetchPeopleList({pageIndex, pageSize})
    },[fetchPeopleList, pageIndex, pageSize])

    return (
        <div className = 'people-table'>
            <table { ...getTableProps() }>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr
                            { ...headerGroup.getHeaderGroupProps() }
                            key = { headerIndex }
                        >
                            {headerGroup.headers.map((column, columnIndex) => {
                            return (
                                <th key = { columnIndex } { ...column.getHeaderProps() }>
                                    {column.render('Header')}
                                </th>
                            )
                        })}
                        </tr>
                ))}
                </thead>
                <tbody { ...getTableBodyProps() }>
                    {!isLoading && (
                    page.map((row, rowIndex) => {
                        prepareRow(row)
                        return (
                            <tr { ...row.getRowProps() } key = { rowIndex }>
                                {row.cells.map((cell, cellIndex) => {
                                    return (
                                        <td key = { cellIndex }>
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
                <div className = 'pagination'>
                    <button disabled = { !canPreviousPage } onClick = { () => gotoPage(0) }>
                        {'First'}
                    </button>{' '}
                    <button disabled = { !canPreviousPage } onClick = { () => previousPage() }>
                        {'Previous'}
                    </button>{' '}
                    <button disabled = { !canNextPage } onClick = { () => nextPage() }>
                        {'Next'}
                    </button>{' '}
                    <button disabled = { !canNextPage } onClick = { () => gotoPage(pageCount - 1) }>
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
                count = { 10 } height = { 50 }
                width = { '100%' }
                         />
        }
        </div>
    )
}

export default Table