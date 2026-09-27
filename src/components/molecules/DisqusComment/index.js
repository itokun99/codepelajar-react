import { useState, useCallback } from 'react';
import { View, Button } from 'components/atoms';
import { config } from 'config/api/url';

const DisqusComment = ({ currentUrl }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const init = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const { url: { origin }, disqus } = config;
        window.disqus_shortname = disqus.shortName;
        window.disqus_blogger_current_url = currentUrl || origin;
        window.disqus_blogger_homepage_url = origin;
        window.disqus_blogger_canonical_homepage_url = origin;

        const bloggerjs = document.createElement('script');
        bloggerjs.type = 'text/javascript';
        bloggerjs.async = true;
        bloggerjs.src = `//${disqus.shortName}.disqus.com/blogger_item.js`;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(bloggerjs);
        setIsLoaded(true);
      } catch (err) {
        setIsLoading(false);
        setIsLoaded(true);
      }
      setIsLoading(false);
    }, 2000);
  }, [currentUrl]);

  return (
    <View className="m-disqus__wrapper">
      <View className="m-disqus__action">
        {!isLoaded && (
          <Button onPress={!isLoading ? init : null} variant="primary" block large>
            {isLoading ? 'Memuat Komentar....' : 'Buka Komentar'}
          </Button>
        )}
      </View>
      <View className="m-disqus__body">
        <View id="comments" />
      </View>
    </View>
  );
};

export default DisqusComment;
