import { createCampaign, home, logout,  profile, AIsearchh } from '../assets';
import { AIsearch } from '../pages';

export const navlinks = [
  {
    name: 'Home',
    imgUrl: home,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },

  {
    name: 'AIsearch',
    imgUrl: AIsearchh,
    link: '/AIsearch',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/logout',
  },
];