import React from "react";
import { EditIcon } from "../nextUI/EditIcon";
import { Tooltip } from "@nextui-org/react";

const ButtonActualizar = ({ onClick }) => {
  return (
    <Tooltip content="Editar">
      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <EditIcon onClick={onClick} />
      </span>
    </Tooltip>
  );
};

export default ButtonActualizar;