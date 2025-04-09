import { ViewBox } from "../components/ViewBox";
import Logo from "../assets/Logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { PORT } from "../../../backend/config.json";
import { Mail } from "../../../backend/src/constants/types";

const ViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, mailId] = location.pathname.split("/mail/");
  const [emailData, setEmailData] = useState<Mail>();

  /**
   * Route: /mail/${mailId}
   * headers: {
          session: localStorage.getItem("sessionId")
    }
   */
  const getEmail = async () => {
   
  };

  useEffect(() => {
    getEmail();
  }, []);

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
        subject={emailData?.title || ""}
        date={emailData?.timeSent || new Date()}
        from={emailData?.sender || ""}
        to={emailData?.receivers || []}
        body={emailData?.message || ""}
      />
    </div>
  );
};

export { ViewPage };
