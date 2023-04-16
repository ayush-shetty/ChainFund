import React, { useState, useEffect } from "react";
import { CustomButton, FormField } from "../components";
import { useStateContext } from "../context";
import { loader } from "../assets";
import language from "@google-cloud/language";
import axios from "axios";

const AIsearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [who, setWho] = useState("");
  const [suggestedCampaigns, setSuggestedCampaigns] = useState([]);
 

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

      setIsLoading(true);
  
     
     /*  const response = await fetch('https://127.0.0.1:8000/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: who,
          campaigns: campaigns,
        }), 
      });
      const data = await response.json();
      
      setSuggestedCampaigns(data);*/

      const result = await axios.get(`http://127.0.0.1:8000/?who=${who}`);

console.log(result);
  
      
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

/*def analyze(request: dict):
    content = request['content']

    # Instantiates a client
    client = language_v1.LanguageServiceClient()

    document = language_v1.Document(
        content=content,
        type_=language_v1.Document.Type.PLAIN_TEXT
    )

    # Analyze the user input for entities and categories
    userInputEntities = client.analyze_entities(
        document=document
    ).entities

    userInputCategories = client.classify_text(
        document=document
    ).categories

    # Filter the campaigns based on matching entities and categories
    relevant_campaigns = []
    for campaign in request['campaigns']:
        campaignEntities = client.analyze_entities(
            document=language_v1.Document(
                content=campaign['description'],
                type_=language_v1.Document.Type.PLAIN_TEXT
            )
        ).entities
        campaignCategories = client.classify_text(
            document=language_v1.Document(
                content=campaign['description'],
                type_=language_v1.Document.Type.PLAIN_TEXT
            )
        ).categories

        matching_entities = [entity for entity in campaignEntities if
                             any(inputEntity.name == entity.name for inputEntity in userInputEntities)]
        matching_categories = [category for category in campaignCategories if
                               any(inputCategory.name == category.name for inputCategory in userInputCategories)]

        if len(matching_entities) > 0 or len(matching_categories) > 0:
            relevant_campaigns.append(campaign)

    return relevant_campaigns
 */

    /* client = language_v1.LanguageServiceClient()
    document = language_v1.Document(content=who, type_=language_v1.Document.Type.PLAIN_TEXT)
    response = client.analyze_entities(request={'document': document})
    entities = [{'name': entity.name, 'type': entity.type_.name} for entity in response.entities]
    return {"message": f"Hello, {who}!", "entities": entities}
    
    who: str*/