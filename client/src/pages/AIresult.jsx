
import { useLocation } from "react-router-dom";
import { DisplayCampaigns } from "../components";


const AIresult = () => {
  const { state } = useLocation();
  const { suggestedCampaigns } = state;


  return (
    <DisplayCampaigns
      title="Suggested Campaigns"
      campaigns={suggestedCampaigns}
    />
  );
};

export default AIresult;
