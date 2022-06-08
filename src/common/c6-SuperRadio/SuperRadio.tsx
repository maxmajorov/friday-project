import React, {
  ChangeEvent,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from "react";

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperRadioPropsType = DefaultRadioPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};

const SuperRadio: React.FC<SuperRadioPropsType> = ({
  type,
  name,
  options,
  value,
  onChange,
  onChangeOption,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeOption && onChangeOption(e.currentTarget.value);
  };

  console.log(value);

  const exampleOptions: any[] = ["x", "y", "z"];

  const mappedOptions: any[] = exampleOptions
    ? exampleOptions.map((el, ind) => (
        <label key={`${name} - ${ind}`}>
          <input
            type="radio"
            name={el}
            checked={el === value}
            value={el}
            onChange={onChangeCallback}
          />
          {el}
        </label>
      ))
    : [];

  return <>{mappedOptions}</>;
};

export default SuperRadio;
