import React, { useState, useEffect } from "react";
import { CustomButton, FormField } from "../components";
import { useStateContext } from "../context";
import { loader } from "../assets";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import stringSimilarity from 'string-similarity';



const AIsearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [who, setWho] = useState("");
  const [Campaignscategories, setCampaignscategories] = useState([]);
  const navigate = useNavigate();
 
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };



  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const handleFormFieldChange = (e) => {
    setWho(e.target.value);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Who:', who);
    console.log('Who:', campaigns);

    
  
      const campaignDescriptions = campaigns.map((campaign) => campaign.description);

      if(campaignDescriptions){
        setIsLoading(true);
        const Campaignscategories = [];

      for (let i = 0; i < campaignDescriptions.length; i++) {
        const result = await axios.get(`http://127.0.0.1:8000/?who=${campaignDescriptions[i]}`);
        Campaignscategories.push(result.data);
      }
    
      setCampaignscategories(Campaignscategories);
     

     console.log("Campaign categories:", Campaignscategories);


      const result = await axios.get(`http://127.0.0.1:8000/?who=${who}`);

      const Usercategories = result.data;

     console.log("User categories:", Usercategories);
     
     
     const threshold = 0.3; // set your string threshold here
     const threshold1 = 0.5; // set your confidence threshold here

     const filteredCampaigns = campaigns.filter((campaign) => {
       const campaignCategories = Campaignscategories[campaigns.indexOf(campaign)];
       const hasOverlap = campaignCategories.categories && campaignCategories.categories.some((category) => {
         const matchingCategory = Usercategories.categories.find((userCategory) => {
           const similarity = stringSimilarity.compareTwoStrings(userCategory.name, category.name);
           console.log(similarity);
           return similarity >= threshold;
         });
         return matchingCategory && matchingCategory.confidence >= threshold1;
       });
       return hasOverlap;
     });
 
     console.log("Filtered campaigns:", filteredCampaigns);
     navigate('/AIresult', { state: { filteredCampaigns } });
   }
 

   

      setIsLoading(false);
    };
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && (
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[100px] object-contain"
        />
      )}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Who do you want to donate to?
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Describe in your own words"
            placeholder="I want to donate to donate to animal welfare"
            isTextArea
            value={who}
            handleChange={(e) => handleFormFieldChange(e)}
          />
        </div>
  
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  )

}

export default AIsearch 

//set GOOGLE_APPLICATION_CREDENTIALS="C:\Project\ChainFund\decent-micron-383707-d0395c4b3446.json"

