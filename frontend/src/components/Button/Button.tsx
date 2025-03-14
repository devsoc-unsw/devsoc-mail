type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      style={{ backgroundColor: "#D9807E", border: "2px solid black" }}
      className={`p-2 ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export { Button };
