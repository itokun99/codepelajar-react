import React from 'react';
import { Section, PostBlock } from 'components';

const PostContainer = () => (
  <Section style={{ paddingTop: 50, paddingBottom: 50 }} className="post-container">
    <PostBlock />
  </Section>
);

export default PostContainer;
