import { React } from 'libraries';
import { Section, Container, FeatureBlock } from 'components';

class FeaturePost extends React.Component {
  render() {
    return (
      <Section style={{ paddingTop: 50, paddingBottom: 50 }} className="home-feature">
        <Container>
          <FeatureBlock />
        </Container>
      </Section>
    );
  }
}

export default FeaturePost;
