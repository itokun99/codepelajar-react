import { React } from 'libraries';
import { Section, Container, Button } from 'components';

class PostContainer extends React.Component {
  render() {
    return (
      <Section
        style={{ paddingTop: 50, paddingBottom: 50 }}
        className="post-container"
      >
        <Container style={{marginBottom: 14}}>
          <Button>Default</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="info">Info</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </Container>

        <Container style={{marginBottom: 14}}>
          <Button anchor>Default</Button>
          <Button anchor variant="success">Success</Button>
          <Button anchor variant="danger">Danger</Button>
          <Button anchor variant="info">Info</Button>
          <Button anchor variant="warning">Warning</Button>
          <Button anchor variant="primary">Primary</Button>
          <Button anchor variant="secondary">Secondary</Button>
        </Container>
      </Section>
    );
  }
}

export default PostContainer;
