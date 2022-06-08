import { makeStyles, Slider } from "@material-ui/core";
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperDoubleRangePropsType = DefaultInputPropsType & {
  onChangeRange: (value: number | number[]) => void;
  value: number | number[];
  // min, max, step, disable, ...
};

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

// function valuetext(values: number) {
//   return `${values}°C`;
// }

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({
  type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
  onChange,
  onChangeRange,
  value,
  className,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState<number | number[]>(value);

  // Под капотом компоненты materialUI зашит тип number | number[]
  // Для обходя воспользуюсь таким подходом так как обычная деструктуризация
  // по индексу ругается

  const customValues: number | number[] = [
    Array.isArray(value) ? value.reduce((a: number) => a) : value,
    Array.isArray(values)
      ? values.reduce((a: number, b: number) => 0 + b)
      : values,
  ];

  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setValues(newValue as number | number[]);
    onChangeRange(newValue);
  };

  return (
    <>
      <Slider
        className={classes.root}
        value={customValues}
        // value={values} // Так не обновляется если тянуть первый
        onChange={handleChange}
        // disabled={Math.ceil(Math.random() * 10) > 3}
        step={5}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        color="secondary"
        // getAriaValueText={valuetext}
      />
    </>
  );
};

export default SuperDoubleRange;
