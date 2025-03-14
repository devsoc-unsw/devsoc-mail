type InputProp = {
  text?: string;
  className?: string;
};

const Input = (props: InputProp) => {
  return (
    <>
      <input
        placeholder={props.text}
        className={`rounded p-2 ${props.className || ""}`}
      />
    </>
  );
};

export { Input };
