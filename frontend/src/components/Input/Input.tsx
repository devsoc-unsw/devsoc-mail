type InputProp = {
  text?: string;
};

const Input = (props: InputProp) => {
  return (
    <>
      <input placeholder={props.text}></input>
    </>
  );
};

export { Input };
