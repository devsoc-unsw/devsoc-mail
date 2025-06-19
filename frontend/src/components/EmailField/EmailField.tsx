import styles from "./EmailField.module.css";
import { Input } from "../Input/Input";

interface EmailFieldProps {
  label: string;
  type: "static" | "input";
  value?: string;
  placeholder?: string;
}

const EmailField = ({ label, type, value }: EmailFieldProps) => {
  return (
    <div className={styles.grid}>
      <strong>{label}:&nbsp;</strong>
      {type === "static" ? (
        <p>{value}</p>
      ) : (
        <Input  />
      )}
    </div>
  );
};

export { EmailField }; 