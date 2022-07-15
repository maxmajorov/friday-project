import React from "react";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

export type GradeValuesType = {
  value: 0 | 1 | 2 | 3 | 4 | 5;
};

type GradePropsType = {
  value: number;
};

export const Grade: React.FC<GradePropsType> = ({ value }) => {
  return (
    <div>
      <GradeOutlinedIcon
        fontSize="small"
        color={value > 0 ? "warning" : "action"}
      />
      <GradeOutlinedIcon
        fontSize="small"
        color={value > 1 ? "warning" : "action"}
      />
      <GradeOutlinedIcon
        fontSize="small"
        color={value > 2 ? "warning" : "action"}
      />
      <GradeOutlinedIcon
        fontSize="small"
        color={value > 3 ? "warning" : "action"}
      />
      <GradeOutlinedIcon
        fontSize="small"
        color={value > 4 ? "warning" : "action"}
      />
    </div>
  );
};
