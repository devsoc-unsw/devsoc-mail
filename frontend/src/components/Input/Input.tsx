type InputProp = {
  text?: string;
  className?: string;
};

const Input = (props: InputProp) => {
  return (
    <>
      <input
        placeholder={props.text}
        className={`border-black border-2 rounded p-2 mb-2 ${props.className}`}
      ></input>
    </>
  );
};

export { Input };
