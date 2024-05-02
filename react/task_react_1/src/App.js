import './App.css';

import React, { useState, useEffect } from 'react';
import './MyModal.css';

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

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <MyModal open={open} disableGlobalScroll={true}>
        <div>
          <h1>Some content</h1>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </MyModal>

    </div>


  );
}

export default App;
