import { useEffect } from 'react';
import { View } from 'components/atoms';

const GoogleSearch = () => {
  useEffect(() => {
    const el = document.createElement('script');
    el.src = 'https://cse.google.com/cse.js?cx=005178091281942032751:rimwwhz9ofx';
    el.type = 'text/javascript';
    el.async = true;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(el);
  }, []);

  return <View className="gcse-searchresults-only" />;
};

export default GoogleSearch;
