import React, { useState, useEffect } from "react";
import { CustomButton, FormField } from "../components";
import { useStateContext } from "../context";
import { loader } from "../assets";
import language from "@google-cloud/language";

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
    

   // const apiKeyResponse = await fetch("C:\Project\ChainFund\decent-micron-383707-d0395c4b3446.json");
    const apiKey ="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDa5gFxaUfDx3Ae\na39guCE0JES9OmczVXypY7Zj5cIOKggFnORvYQvKHKg0HIHf9kNbUnnNSsSODm0n\nTIrkxHbFfogAnQ7lj0wlGNPewGumrhazu0Hf1AQ2z98/H9pixERpYVQOU1UPXdg/\ntnxTE2eEI3Rlkkgamqtd+0kT3sau1SxZEFC4FzYzmVWSSe5qX2cIaTHxgqIqBUB8\nP8wUh2pw6SkK9aBH5nbrDTMSn37GwJ/zuWgwKFN+9/11wLnb5psu5RDLgoRuO3Ya\nccoEnP+h+rlRKpef+47x88yoUCgXUDee9qZEi+raoBnOM/1WCi3/J9oHL905MG/Z\nkZtRDDgFAgMBAAECggEAGZi+v3PHrAmUv0HjvbwaSd4Z2aTML5EGCEq8J7dUt1JL\n6NgdUDbhaYtrUdipiTZjTvj4fDyLem8ObYOCVFjy6Iowvh2fgdF9XnMmR0xp6i4+\nQlsZy2If8gbhvKBtaZI4y7fRW/F7p1XadSzSIebJeoao1D3ER7QhaNZ7B6NLyWK1\nqfNE2X1qkDb6qXOjI8M4irN7riZSPpFQBO4gTqaJXUdsHdJWTu3Vyc3NIBfdLh/b\nqIeN2RxSj9SBNSX8BEpLKuK+o3l+m/ReuoHWXRz7zkzzmRrkv9s+6xvt2T8sFjep\nmtEH6KCHXVbkqYUU+od3VLOm8fdR4D0bX6hVn+ZHuwKBgQD2dvDL2a2qRHWKnUqT\nfGtWVuWEAUvM2+oT1m8bVmQTr4NubsiagutYUz3qs+xM2Bvqi8RYa0mphJkDKKEV\nbdxgGh95/48nFScNA9nL/oxbsE/DVP0qfFZ1QyMYGeCtPO7ezcDTlvmdLasKP13F\nx3LYZR1KKkND4eHcnF6gAPJxOwKBgQDjXgqlw6EUsLRKap+hO+AcuMu8+586St0r\n8CdEvBsFQM/Cnn/DO/tYmKiV0rujLQaxav1zS0T+p6QbvBJ969mT4fLrQRCB/rx/\ntSYaFeu7ADDAb070BUvqjZlWdw0bgHqS4EE04jyaWEABTABw7TI9D2CTP+lQWVQZ\nleZB6CFnvwKBgEXetCbmH/B8FeJk8uZayEcivVAt2eJKmdJj4P2cAST/hcAB0gbT\nhIp2lr/5n8ytG0TjuJbkW26eM46MrxXXHjl0TmYUh+2pdnefFthY4kt/8SzL5DVu\nKEh37vP/Kg2Sj5lENR0G2N6xOqLeEeRmxW0JRUNoNceBurkC72RmwFRPAoGBAKuK\n+nGSpefcYkp7I7EcYbyJ2H3fQoVSkohiCt6bJa/S9G2b9D0y9jIkC53ufs9gW1pk\npJDmS0nu5axfO3xyA5jFsue4EWJi9YlM/VBVFaPjQuUNlf4aOOrgpr5L2EHVr6U9\nOTVTM/InfzL7SqHo9CyJe43dfIS4wPEE3dL/9qQ1AoGBAI10kqbQ6ZmfeykQm759\nuUVe86iCdYzUkaOSrN7mkLQ+69c7ieMYjqdkngjpkPLg+gpd1yJpJOwYo5qmfEF1\n5bThVKIrm0ziH8zFWo5XMoDs08U0ecaRntAdoGccFlfm18PR3hi2oKInawHQCfgr\n9BS52b5TF6dS6nzWbozQTAMe\n-----END PRIVATE KEY-----\n"; //await apiKeyResponse.text();

    // Initialize the Google Cloud client
    const client = new language.LanguageServiceClient({
      credentials: { private_key: apiKey, client_email: "first-839@decent-micron-383707.iam.gserviceaccount.com" },
    });

    

    // Analyze the user input for entities and categories
    const [userInputEntities] = await client.analyzeEntities({
      document: {
        content: who,
        type: "PLAIN_TEXT",
      },
    });
    const [userInputCategories] = await client.classifyText({
      document: {
        content: who,
        type: "PLAIN_TEXT",
      },
    });

    // Filter the campaigns based on matching entities and categories
    const relevantCampaigns = campaigns.filter((campaign) => {
      const [campaignEntities] = client.analyzeEntities({
        document: {
          content: campaign.description,
          type: "PLAIN_TEXT",
        },
      });
      const [campaignCategories] = client.classifyText({
        document: {
          content: campaign.description,
          type: "PLAIN_TEXT",
        },
      });

      const matchingEntities = campaignEntities.entities.filter((entity) =>
        userInputEntities.entities.some(
          (inputEntity) => inputEntity.name === entity.name
        )
      );

      const matchingCategories = campaignCategories.categories.filter(
        (category) =>
          userInputCategories.categories.some(
            (inputCategory) => inputCategory.name === category.name
          )
      );

      return matchingEntities.length > 0 || matchingCategories.length > 0;
    });

    setSuggestedCampaigns(relevantCampaigns);
    console.log(suggestedCampaigns);
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
