import React from 'react';

/**
 * @return {ReactElement}
 */
export function Box({children}: {children: React.ReactNode}) {
    return (
        <div className="modal">
            <div className="modal-box">
                {children}
            </div>
        </div>
    );
}

/**
 * @param {boolean} isOpen
 * @return {ReactElement}
 */
function Toggle({isOpen}: {isOpen: boolean}) {
    return (
        <input readOnly type="checkbox" id="my-modal-2" className="modal-toggle" checked={isOpen}/>
    );
}

export default {Box, Toggle};
