import { useNavigate } from "react-router-dom";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface ViewBoxProps {
  subject: string;
  date: string; // change this into Date object once database is implemented
  from: string;
  to: string[];
  body: string;
}

const ViewBox = (props: ViewBoxProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full border-2 border-black rounded-[23px] overflow-hidden">
      <div className="px-4 py-3 bg-[#D9807E] text-white flex justify-between items-center border-b-2 border-black">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/mail")}
            className="p-1 hover:bg-[#c57471] rounded-full transition-colors"
          >
            <ArrowBackIosRoundedIcon />
          </button>
          <h2 className="text-xl font-bold">{props.subject}</h2>
        </div>
        <p>{props.date}</p>
      </div>

      <div className="flex h-12 px-6 border-b-2 border-black items-center">
        <strong>From:&nbsp;</strong>
        <p>{props.from}</p>
      </div>
      <div className="flex h-12 px-6 border-b-2 border-black items-center">
        <strong>To:&nbsp;</strong>
        <p>{props.to.join(", ")}</p>
      </div>

      <div className="m-1 px-6 py-4 text-justify h-[250px] overflow-y-auto">
        {props.body}
      </div>
    </div>
  );
};

export { ViewBox };
