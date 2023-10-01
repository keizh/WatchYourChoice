import { useState } from "react";

export function ListBox({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle " onClick={(e) => setOpen((open) => !open)}>
        {open ? "-" : "+"}
      </button>

      {open && children}
    </div>
  );
}
