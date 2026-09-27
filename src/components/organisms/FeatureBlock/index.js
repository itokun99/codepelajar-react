import { useState, useEffect } from 'react';
import { View, Text, Anchor, Image, Skeleton, Button } from 'components/atoms';
import { callFeaturedPost } from 'services';
import { isLocalhost, getImage } from 'utils';

const dummy = {
  title: 'Dokumentasi Simpel Template Black Clover',
  description:
    'Selamat datang di postingan dokumentasi template yang saya buat dan bernama BLACK CLOVER. Berikut dokumentasinya:Cara Setting TemplatePemasangan- Buka Blogger.com- Pergi ke menu Tema- Lihat kiri atas ada tombol backup/pulihkan dan klik- Akan ada Modal popup, tekan tombol "choose file"- Pilih template ini- DoneKonfigurasi kelengkapan templateKonfigurasi sosial dan verifikasiCari SOSIAL AND ',
  image:
    'https://2.bp.blogspot.com/-_EVYfMGHtDU/W2Vd0vSfVRI/AAAAAAAABOk/NuOGcRH2eI4o5R9fNUN8dmXjrmcYwjSWQCPcBGAYYCw/w400-h400-c/2b31cd88f286a2c063c58aa2176fdc30.png',
  url:
    'https://nextcodepelajar.blogspot.com/2018/08/dokumentasi-simpel-template-black-clover.html'
};

const FeatureBlock = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const handleWheel = () => setShowImage(prev => prev || false);
    window.addEventListener('mousewheel', handleWheel);
    window.addEventListener('touchmove', handleWheel);
    return () => {
      window.removeEventListener('mousewheel', handleWheel);
      window.removeEventListener('touchmove', handleWheel);
    };
  }, []);

  useEffect(() => {
    if (isLocalhost) {
      setTimeout(() => {
        setTitle(dummy.title);
        setDescription(dummy.description);
        setImage(dummy.image);
        setUrl(dummy.url);
        setIsLoading(false);
        setIsLoaded(true);
      }, 3000);
      return;
    }
    init();
  }, []);

  const init = async () => {
    try {
      setIsLoading(true);
      const data = await callFeaturedPost();
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.image);
      setUrl(data.url);
      setIsLoading(false);
      setIsLoaded(true);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const renderSkeleton = type => {
    if (type === 'text') {
      return (
        <>
          <Skeleton style={{ width: '100%', paddingBottom: 40, marginBottom: 32 }} />
          <Skeleton style={{ width: '60%', paddingBottom: 25, marginBottom: 14 }} />
          <Skeleton style={{ width: '100%', paddingBottom: 25, marginBottom: 14 }} />
          <Skeleton style={{ width: '80%', paddingBottom: 25, marginBottom: 14 }} />
          <Skeleton style={{ width: '40%', paddingBottom: 25, marginBottom: 60 }} />
          <Skeleton style={{ width: '40%', paddingBottom: 60, marginBottom: 14 }} />
        </>
      );
    }
    if (type === 'image') {
      return <Skeleton style={{ width: '100%', paddingBottom: '80%' }} />;
    }
  };

  return (
    <View className="o-feature-block__wrapper">
      <View className="o-feature-block__column">
        <View className="o-feature-block__inner">
          {isLoading && renderSkeleton('image')}
          {isLoaded && (
            <Image
              className="o-feature-block__image"
              source={showImage ? getImage(image) : ''}
              backgroundImage
              resizeMode="cover"
              title={title}
              alt={title}
            />
          )}
        </View>
      </View>
      <View className="o-feature-block__column">
        <View className="o-feature-block__inner o-feature-block__inner--text">
          {isLoading && renderSkeleton('text')}
          {isLoaded && (
            <>
              <Anchor href={url} title={title}>
                <Text tag="h2" className="o-feature-block__title">
                  {title}
                </Text>
              </Anchor>
              <Text className="o-feature-block__description" style={{ marginBottom: 40 }}>
                {description}
              </Text>
              <Button variant="primary" anchor href={url} title={title}>
                Read More
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default FeatureBlock;
