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

export default Table