import { twMerge } from "tailwind-merge";

interface InputProps<T> {
  placeholder?: string;
  className?: string;
  multipleStr?: boolean;
  setter:
    | React.Dispatch<React.SetStateAction<T>>;
  onChange?: () => void; // n
}

const Input = <T extends string | string[]> (props: InputProps<T>) => {
  return (
    <>
      <input
        placeholder={props.placeholder}
        className={twMerge("rounded p-2", props.className)}
        onChange={(e) => {
          const text = e.target.value;
          if (props.multipleStr) {
            const receivers = text.split(",");
            props.setter(receivers as T);
          }  else {
            props.setter(text as T);
          }
          // task 6 solution
          if (props.onChange) props.onChange();
        }}
      />
    </>
  );
};

export { Input };
