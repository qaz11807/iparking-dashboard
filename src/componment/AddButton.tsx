import React from 'react';

/**
 * @param {T} datas response datas
 * @return {ReactElement}
 */
export default function AddButton({onClick}: {onClick: VoidFunction}) {
    return (
        <button value="Add" className="btn btn-square" onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4L12 20M4 12l16 0"></path>
            </svg>
        </button>
    );
}
