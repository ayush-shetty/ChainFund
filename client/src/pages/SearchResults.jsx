import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const SearchResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [keyword, setKeyword] = useState('');

  const location = useLocation();

  useEffect(() => {
    const keyword = new URLSearchParams(location.search).get('query');
    setKeyword(keyword);
  }, [location.search]);
  
  const { contract, address, getCampaigns } = useStateContext();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const data = await getCampaigns();
      const filteredCampaigns = data.filter(campaign => {
        const title = campaign.title.toLowerCase();
        return title.includes(keyword.toLowerCase());
      });
      setCampaigns(filteredCampaigns);
      setIsLoading(false);
    };

    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract, getCampaigns, keyword]);

  return (
    <DisplayCampaigns
      title={`Search results for "${keyword}"`}
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default SearchResults;
