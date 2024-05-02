import React, { useState, useEffect } from 'react';
import './Modal.css';

const MyModal = ({ open, disableGlobalScroll, children }) => {
    const [prevOverflow, setPrevOverflow] = useState('');

    useEffect(() => {
        if (disableGlobalScroll && open) {
            setPrevOverflow(document.body.style.overflow);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            if (disableGlobalScroll) {
                document.body.style.overflow = prevOverflow;
            }
        };
    }, [open, disableGlobalScroll, prevOverflow]);

    return (
        <div className={`modal ${open ? 'open' : ''}`}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default MyModal 