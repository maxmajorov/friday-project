import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  action: string;
  status: string;
  children: React.ReactNode;
};

export const UniversalModal: React.FC<PropsType> = ({ status, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton disabled={status === "loading"} onClick={handleOpen}>
        action === "delete" ? <Delete color={"error"} />
        : action === "edit" ? <CreateIcon color={"warning"} />: null
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
