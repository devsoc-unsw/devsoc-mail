type InputProp = {
  text?: string;
};

const Input = (props: InputProp) => {
  return (
    <>
      <input placeholder={props.text ? props.text : ""}></input>
    </>
  );
};

export { Input };
