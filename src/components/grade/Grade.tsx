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
      {/* <Star selected={value > 0} value={1} />
      <Star selected={value > 1} value={2} />
      <Star selected={value > 2} value={3} />
      <Star selected={value > 3} value={4} />
      <Star selected={value > 4} value={5} /> */}
    </div>
  );
};
