import { twMerge } from "tailwind-merge";

interface InputProps {
  placeholder?: string;
  className?: string;
  setter:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<string[]>>;
  onChange?: () => void; // n
}

const Input = (props: InputProps) => {
  return (
    <>
      <input
        placeholder={props.placeholder}
        className={twMerge("rounded p-2", props.className)}
      />
    </>
  );
};

export { Input };
