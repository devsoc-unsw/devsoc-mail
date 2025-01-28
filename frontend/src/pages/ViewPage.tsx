import { ViewBox } from "../components/ViewBox/ViewBox";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const ViewPage = () => {
  const navigate = useNavigate();
  return (
    <div id="view-page" className="page">
      <div id="view-page-header">
        <img src={Logo} height="50px"></img>
        <button onClick={() => navigate("/")}>Exit button</button>
      </div>
      <ViewBox
        subject="Dummy"
        date="26 Jan 2025, 17:12 (5 hours ago)"
        from="admin@devsoc.mail"
        to={["me@devsoc.mail", "you@devsoc.mail"]}
        body="Hello, World!"
      />
    </div>
  );
};

export { ViewPage };
