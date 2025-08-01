import { Button, Modal, ModalBody } from "@scaflo/ui";
import React, { useState } from "react";
// import "./index.css";
const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setOpen(true);
          console.log("first", open);
        }}
      >
        Open
      </Button>
      <Modal size="md" isOpen={open} onClose={() => setOpen(false)}>
        <ModalBody>
          <h3 className="text-2xl">Hello world</h3>
        </ModalBody>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};

export default App;
