// import classNames from 'classnames';
import React, {useState} from 'react';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hook/useApp';
import {actions} from '../../provider/DataTableProvider';

/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function Pager() {
    const count = useAppSelector((state) => state.dataTable!.count);
    const page = useAppSelector((state) => state.dataTable!.pagination.page)!;
    const pageSize = useAppSelector((state) => state.dataTable!.pagination.pageSize)!;
    const dispatch = useAppDispatch();
    const [totalPages, setTotalPage] = useState(Math.ceil(count/pageSize));

    useEffect(() => {
        setTotalPage(Math.ceil(count/pageSize));
    }, [count, pageSize]);

    const onClickPrevious = useCallback(
        () => {
            if (page <= 1) {
                return;
            } else {
                dispatch(actions.setPage(page-1));
            }
        }, [totalPages, page],
    );

    const onClickPage = useCallback(
        (index) => {
            if ( index > (totalPages || index < 1 || index === page)) {
                return;
            } else {
                dispatch(actions.setPage(index));
            }
        }, [totalPages, page],
    );

    const onClickNext = useCallback(
        () => {
            if (page >= totalPages) {
                return;
            } else {
                dispatch(actions.setPage(page+1));
            }
        }, [totalPages, page],
    );

    const startIndex = (page + 10) < totalPages? page : 1;
    const endIndex = (startIndex + 10) < totalPages ? startIndex + 10 : totalPages;

    const pageButtons = Array.from(
        {length: endIndex - startIndex + 1},
        (v, i) => {
            const ni = startIndex+i;
            return <button
                key={ni}
                className={`btn ${ni === page ? 'btn-active' : '' }`}
                onClick={()=>onClickPage(ni)}
            >{ni}</button>;
        },
    );

    return (
        <div className="btn-group">
            <button className="btn" onClick={onClickPrevious}>Previous</button>
            {pageButtons}
            <button className="btn" onClick={onClickNext}>Next</button>
        </div>
    );
}
