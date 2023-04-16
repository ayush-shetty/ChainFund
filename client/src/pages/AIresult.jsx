
import { useLocation } from "react-router-dom";
import { DisplayCampaigns } from "../components";


const AIresult = () => {
  const { state } = useLocation();
  const { filteredCampaigns } = state;


  return (
    <DisplayCampaigns
      title="AI Suggested Campaigns"
      campaigns={filteredCampaigns}
    />
  );
};

export default AIresult;