import React from 'react';

type InputProp = {
  text?: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
};

const Input = (props: InputProp) => {
  return (
    <>
      <input
        placeholder={props.text}
        onChange={(e) => props.setter(e.target.value)}
      ></input>
    </>
  );
};

export { Input };
