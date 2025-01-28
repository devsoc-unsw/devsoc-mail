import Logo from "../assets/Logo.png";
import { Input } from "../components/Input";
const MailPage = () => {
  return (
    <>
      <img
        src={Logo}
        style={{
          width: "10%",
          height: "auto",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      ></img>
        <Input text="Search" />
      <p>mail</p>
    </>
  );
};

export { MailPage };
