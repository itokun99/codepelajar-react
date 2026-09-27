import { useState, useEffect } from 'react';
import { View, Anchor, Icon } from 'components/atoms';
import { getSocial } from 'utils';

const FooterSocialBlock = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socialData = getSocial('footer');
    setData(socialData);
  }, []);

  return (
    <View className="o-brand-logo__social">
      <View tag="ul" className="m-social-links">
        {data &&
          data.map((val, index) => (
            <View key={index} tag="li">
              <Anchor href={val.url} title={val.title}>
                {val.title}
                <Icon name={val.type} />
              </Anchor>
            </View>
          ))}
      </View>
    </View>
  );
};

export default FooterSocialBlock;
