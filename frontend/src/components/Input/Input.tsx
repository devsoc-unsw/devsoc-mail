import React from 'react';

type InputProp = {
  text?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  onChange?: () => void; // needed for task 6
};

const Input = (props: InputProp) => {
  return (
    <>
      <input
        placeholder={props.text}
        onChange={(e) => {
          props.setter(e.target.value);
          // task 6 solution
          if (props.onChange) props.onChange();
        }}
      ></input>
    </>
  );
};

export { Input };
