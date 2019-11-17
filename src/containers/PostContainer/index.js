import { React } from 'libraries';
import { Section, Container, Button, PostBlock } from 'components';

class PostContainer extends React.Component {
  render() {
    return (
      <Section
        style={{ paddingTop: 50, paddingBottom: 50 }}
        className="post-container"
      >
        <PostBlock />
      </Section>
    );
  }
}

export default PostContainer;
