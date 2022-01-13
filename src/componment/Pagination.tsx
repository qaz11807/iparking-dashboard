// import classNames from 'classnames';
import React from 'react';
import {useState, useCallback, useEffect} from 'react';


interface PaginationProps {
    totalPages: number
    onChangePage: (page: number) => void
}
/**
 * the page that related order operation
 * @return {ReactElement}
 */
export default function Pagination(
    {totalPages, onChangePage}: PaginationProps,
) {
    const [init, setInit] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        if (init) {
            onChangePage(page);
        } else {
            setInit(true);
        }
    }, [page]);

    const onClickPrevious = useCallback(
        () => {
            if (page <= 1) {
                return;
            } else {
                setPage(page-1);
            }
        }, [totalPages, page],
    );

    const onClickPage = useCallback(
        (index) => {
            if ( index > (totalPages || index < 1 || index === page)) {
                return;
            } else {
                console.log(index);
                setPage(index);
            }
        }, [totalPages, page],
    );

    const onClickNext = useCallback(
        () => {
            if (page >= totalPages) {
                return;
            } else {
                console.log(page);
                setPage(page+1);
            }
        }, [totalPages, page],
    );

    const buttons = [];
    const startIndex = (page + 10) < totalPages? page : 1;
    const endIndex = (startIndex + 10) < totalPages ? startIndex + 10 : totalPages;
    for (let i=startIndex; i <= endIndex; i++) {
        buttons.push(
            <button
                key={i}
                className={`btn ${i === page ? 'btn-active' : '' }`}
                onClick={()=>onClickPage(i)}
            >{i}</button>);
    }

    return (
        <div className="btn-group">
            <button className="btn" onClick={onClickPrevious}>Previous</button>
            {buttons}
            <button className="btn" onClick={onClickNext}>Next</button>
        </div>
    );
}
