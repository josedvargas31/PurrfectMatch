import React from "react";
import { DeleteIcon } from "../nextUI/DeleteIcon";
import { Tooltip } from "@nextui-org/react";

const ButtonDesactivar = ({ estado, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  // Determinar el contenido del tooltip según el estado
  let tooltipContent = "";
  let tooltipColor = "";
  let iconColor = "";

  if (estado === "activo") {
    tooltipContent = "Desactivar";
    tooltipColor = "danger";
    iconColor = "#E10032";
  } else if (estado === "proceso") {
    tooltipContent = "Activar";
    tooltipColor = "success";
    iconColor = "#006000";
  } else {
    tooltipContent = "Activar";
    tooltipColor = "success";
    iconColor = "#006000";
  }

  return (
    <Tooltip color={tooltipColor} content={tooltipContent}>
      <span className="text-lg cursor-pointer active:opacity-50">
        <DeleteIcon
          onClick={handleClick}
          style={{ color: iconColor }}
        />
      </span>
    </Tooltip>
  );
};

export default ButtonDesactivar;
