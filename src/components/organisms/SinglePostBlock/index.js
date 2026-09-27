import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { View, Text, Skeleton } from 'components/atoms';
import { PostAuthorMeta, DisqusComment, AddThis, BreadCrumb } from 'components/molecules';
import { parseJSON, createAuthor } from 'utils';
import { callPostById } from 'services';
import { config } from 'config/api/url';
import _ from 'lodash';

const SinglePostBlock = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [times, setTimes] = useState(0);
  const [contentLoaded, setContentLoaded] = useState(false);
  const preTagRef = useRef(null);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contentLoaded && preTagRef.current) {
      renderPreTag();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentLoaded]);

  const init = async () => {
    try {
      setIsLoading(true);
      const postJSON = parseJSON(window.__POSTS__);
      const { id } = postJSON;
      const postData = await callPostById(id);
      setTimeout(() => {
        setData(postData);
        setIsLoading(false);
        setContentLoaded(true);
      }, 2000);
    } catch (err) {
      if (times < 2) {
        setTimes(prev => prev + 1);
        init();
        return;
      }
      setIsLoading(false);
      if (window.confirm('Koneksi bermasalah! Silahkan refresh ulang.')) {
        window.location.reload();
      }
    }
  };

  const loadPretify = () => {
    const el = document.createElement('script');
    el.src = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
    el.type = 'text/javascript';
    el.async = true;
    (document.getElementsByTagName('body')[0] || document.getElementsByTagName('head')[0]).appendChild(el);
    setContentLoaded(false);
  };

  const renderPreTag = async () => {
    const preTag = document.getElementsByTagName('pre');
    if (!_.isEmpty(preTag)) {
      const preCount = preTag.length;
      for (let i = 0; i < preCount; i += 1) {
        preTag[i].classList.add('prettyprint');
      }
      await loadPretify();
    }
  };

  const renderSkeleton = () => (
    <>
      <Skeleton style={{ width: '80%', height: 40, marginBottom: 24 }} />
      <View className="d-flex">
        <Skeleton style={{ width: '20%', height: 20, marginBottom: 24, marginRight: 24 }} />
        <Skeleton style={{ width: '30%', height: 20, marginBottom: 40 }} />
      </View>
      <Skeleton style={{ width: '100%', height: 1, marginBottom: 40 }} />
      <View style={{ display: 'flex', alignItems: 'center', marginBottom: 50 }} className="d-flex">
        <Skeleton style={{ width: 50, height: 50, marginRight: 24, borderRadius: 50 }} />
        <Skeleton style={{ width: 200, height: 20 }} />
      </View>
      <Skeleton style={{ width: '100%', paddingBottom: '40%', marginBottom: 40 }} />
      {[1, 2].map(val => (
        <View key={val} style={{ marginBottom: 54 }}>
          <Skeleton style={{ width: '80%', height: 20, marginBottom: 14 }} />
          <Skeleton style={{ width: '100%', height: 20, marginBottom: 14 }} />
          <Skeleton style={{ width: '90%', height: 20, marginBottom: 14 }} />
          <Skeleton style={{ width: '60%', height: 20, marginBottom: 14 }} />
        </View>
      ))}
    </>
  );

  if (isLoading) {
    return <View className="o-single-post-block__wrapper">{renderSkeleton()}</View>;
  }

  if (!data) {
    return null;
  }

  return (
    <View className="o-single-post-block__wrapper">
      <View className="o-single-post-block__header">
        <BreadCrumb title={data.title} labels={data.labels} url={data.url} />
        {data.title && <Text tag="h1" className="o-single-post-block__title">{data.title}</Text>}
        <View className="o-single-post-block__meta">
          {data.published && (
            <Text className="o-single-post-block__datetime">
              Diposting pada: {moment(data.published).format('LLLL')}
            </Text>
          )}
          {data.author && (
            <PostAuthorMeta imageSize={50} data={createAuthor(data.author)} />
          )}
        </View>
      </View>
      <View className="o-single-post-block__body" dangerouslySetInnerHTML={{ __html: data.content }} ref={preTagRef} />
      <View className="o-single-post-block__footer">
        {data.url && <DisqusComment currentUrl={data.url} />}
      </View>
      <AddThis id={config.addThis.id} />
    </View>
  );
};

export default SinglePostBlock;
