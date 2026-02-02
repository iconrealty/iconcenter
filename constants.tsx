import { AppLink } from './types';

// INCREMENT THIS VERSION NUMBER (e.g. '1.1' -> '1.2') whenever you deploy changes 
// to INITIAL_APPS. This will force all users' browsers to discard their old 
// local save and load the new list from this file.
export const APP_VERSION = '1.2';

export const INITIAL_APPS: AppLink[] = [
  {
    id: '1',
    title: 'Team Properties',
    description: 'Active and off-market Properties',
    url: 'https://offmarket-eta.vercel.app',
    icon: 'MapPinned'
  },
  {
    id: '2',
    title: 'Signs Manager',
    description: 'Check-in and check-out signs',
    url: 'https://signmanager.emergent.host/login',
    icon: 'Baseline'
  },
  {
    id: '3',
    title: 'Submission Zone',
    description: 'New Escrows and More',
    url: 'https://sites.google.com/mcluregroup.com/hub/submit-here?',
    icon: 'CopyCheck'
  },
  {
    id: '4',
    title: 'My eXp Apps',
    description: 'eXp Dashboard',
    url: 'https://exprealty.okta.com/app/UserHome',
    icon: 'FileText'
  },
  {
    id: '5',
    title: 'CMA Generator',
    description: 'Create comparable market reports',
    url: 'https://www.narrpr.com/home',
    icon: 'BarChart3'
  },
  {
    id: '6',
    title: 'Housing Report',
    description: 'Market Insights',
    url: 'https://sites.google.com/mcluregroup.com/hub/housing-report?',
    icon: 'House'
  },
  {
    id: '7',
    title: 'Celebrity Agent',
    description: 'Listing generation',
    url: 'https://backoffice.celebrityagent.com/login?',
    icon: 'Share2'
  },
  {
    id: '8',
    title: 'My Transactions',
    description: 'Closed transactions',
    url: 'https://my.exprealty.com/agent/agent-detail-report',
    icon: 'CircleDollarSign'
  },
  {
    id: '9',
    title: 'The HUB',
    description: 'Central Team Site',
    url: 'https://sites.google.com/mcluregroup.com/hub/home',
    icon: 'Settings'
  },
  {
    id: '10',
    title: 'OC TAX',
    description: 'OC Tax info',
    url: 'https://mello.ocgov.com/#!/search',
    icon: 'Banknote'
  },
{
    id: '11',
    title: 'Zip forms',
    description: 'CAR forms',
    url: 'https://login.car.org/login?state=hKFo2SBMOWR6eG5pZVFLaXFuaURhcTJUX2hHUl90cENhcHFsS6FupWxvZ2luo3RpZNkgQjIyT0V1SzNSaV94VHlOMlJjeXZyTUtUSXlGYXRUTzmjY2lk2SBaQTJWZjF1QmRQcXBjakRpSG8wcUtCRVZjaDhhaThlTw&client=ZA2Vf1uBdPqpcjDiHo0qKBEVch8ai8eO&protocol=oauth2&redirect_uri=https%3A%2F%2Fwww.car.org%2FCallback&response_type=code&scope=openid%20profile%20email&response_mode=form_post&nonce=639042748124751661.MTI4ZDg1MGItZDkwNi00YjA4LWI3MjYtZjhjMDRlN2IwM2NkYTA5YzFhNzEtMWNmMC00MmQ1LWIzYjctOTk3NTY5ZWE0MmY4&audience=https%3A%2F%2Fcarorg.us.auth0.com%2Fapi%2Fv2%2F&x-client-SKU=ID_NET461&x-client-ver=5.3.0.0
',
    icon: 'Banknote'
  }


  
];
