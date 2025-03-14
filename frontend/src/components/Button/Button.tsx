type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`bg-[#D9807E] border-2 border-black p-2 ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export { Button };
