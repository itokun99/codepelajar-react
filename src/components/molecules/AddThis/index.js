import { useEffect } from 'react';
import { View } from 'components/atoms';

const AddThis = ({ id = '' }) => {
  useEffect(() => {
    if (!id) return;
    const el = document.createElement('script');
    el.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-${id}`;
    el.type = 'text/javascript';
    el.async = true;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(el);
  }, [id]);

  return <View id="addThis" />;
};

export default AddThis;
