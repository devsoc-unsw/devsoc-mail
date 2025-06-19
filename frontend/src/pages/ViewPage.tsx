import { ViewBox } from "../components/ViewBox/ViewBox";
import Logo from "../assets/Logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";

const ViewPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get email data from URL parameters
  const emailData = {
    subject: searchParams.get('subject') || "No Subject",
    date: searchParams.get('date') || "Unknown Date",
    from: searchParams.get('from') || "unknown@devsoc.mail",
    to: searchParams.get('to')?.split(',') || ["unknown@devsoc.mail"],
    body: searchParams.get('body') || "No content available"
  };

  return (
    <div id="view-page" className="page">
      <div id="view-page-header">
        <img src={Logo} height="50px"></img>
        <button onClick={() => navigate("/mail")}>Exit button</button>
      </div>
      <ViewBox
        subject={emailData.subject}
        date={emailData.date}
        from={emailData.from}
        to={emailData.to}
        body={emailData.body}
      />
    </div>
  );
};

export { ViewPage };
