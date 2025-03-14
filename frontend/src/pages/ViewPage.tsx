import { ViewBox } from "../components/ViewBox/ViewBox";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";

const ViewPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <img src={Logo} alt="DevSoc Mail Logo" className="h-12" />
        <button
          onClick={() => navigate("/")}
          className="bg-[#D9807E] text-white px-4 py-2 rounded-lg border-2 border-black hover:bg-[#c57471] transition-colors"
        >
          Exit
        </button>
      </div>
      <ViewBox
        subject="New opportunities at devsoc"
        date="26 Jan 2025, 17:12 (5 hours ago)"
        from="lachlan.shoesmith@devsoc.mail"
        to={[
          "eve.miles@devsoc.mail",
          "kj.low@devsoc.mail",
          "sisyphus@devsoc.mail",
          "sisyphus.boulder@devsoc.mail",
        ]}
        body="Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩 Join devsoc training program 🤩"
      />
    </div>
  );
};

export { ViewPage };
