type InputProp = {
  text?: string;
};

const Input = (props: InputProp) => {
  return (
    <>
      <input placeholder={props.text}
      className="border-black border-2 rounded p-2 mb-2"></input>
    </>
  );
};

export { Input };
