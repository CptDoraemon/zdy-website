import {useEffect, useState} from "react";
import lodash from 'lodash'

export enum DownloadStatusTableDataObjectKey {
    'key'='key',
    'status'='status',
    'requestedAt'='requestedAt',
    'size'= 'size',
    'url'='url'
}
export type DownloadStatusTableData = {
    [key in DownloadStatusTableDataObjectKey]: string
}

export type SortOption = {
    key: DownloadStatusTableDataObjectKey,
    order: 'desc' | 'asc'
};

const defaultSortOption: SortOption = {
    key: DownloadStatusTableDataObjectKey.requestedAt,
    order: 'desc'
};

const useDownloadStatusTableSort = (data: DownloadStatusTableData[] | null) => {
    const [sortedData, setSortedData] = useState<DownloadStatusTableData[] | null>(null);
    const [sortOption, setSortOption] = useState(defaultSortOption);

    const compareFunction = (a: DownloadStatusTableData, b: DownloadStatusTableData) => {
        const order = sortOption.order === 'desc' ? -1 : 1;
        return a[sortOption.key].localeCompare(b[sortOption.key]) * order;
    };

    useEffect(() => {
        if (data === null) return;
        const _data = lodash.cloneDeep(data);
        _data.sort(compareFunction);
        setSortedData(_data);
    }, [data]);

    useEffect(() => {
        if (sortedData === null) return;
        const _sortedData = lodash.cloneDeep(sortedData);
        _sortedData.sort(compareFunction);
        setSortedData(_sortedData);
    }, [sortOption]);

    const changeSortOption = (key: DownloadStatusTableDataObjectKey) => {
        setSortOption((oldOption) => {
            if (key === oldOption.key) {
                return {
                    key: oldOption.key,
                    order: oldOption.order === 'desc' ? 'asc' : 'desc'
                }
            } else {
                return {
                    key: key,
                    order: defaultSortOption.order === 'desc' ? 'asc' : 'desc'
                }
            }
        });
    };

    return {
        sortedData,
        sortOption,
        changeSortOption
    }
};

export default useDownloadStatusTableSort
