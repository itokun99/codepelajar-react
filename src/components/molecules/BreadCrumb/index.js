import { React, PropTypes } from 'libraries';
import { createSearchUrl } from 'utils';
import { View, Text, Anchor, Icon } from 'components/atoms';
import _ from 'lodash';

const BreadCrumb = ({ labels, title, url }) => (
  <View className="m-breadcrumb__wrapper">
    <Anchor href="/" title="Go to home" className="m-breadcrumb__item">
      <Icon name="home" style={{ marginRight: 8, color: '#222' }} />
      Home
    </Anchor>

    {labels && !_.isEmpty(labels) ? (
      <React.Fragment>
        <Text tag="span" className="m-breadcrumb__separator">
          /
        </Text>
        <Anchor
          href={createSearchUrl(labels[0], '/search?q=')}
          title={labels[0]}
          className="m-breadcrumb__item"
        >
          {labels[0]}
        </Anchor>
        <Text tag="span" className="m-breadcrumb__separator">
          /
        </Text>
        <Anchor
          href={url}
          title={title}
          className="m-breadcrumb__item m-breadcrumb__item--current"
        >
          {title}
        </Anchor>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Text tag="span" className="m-breadcrumb__separator">
          /
        </Text>
        <Anchor
          href={url}
          title={title}
          className="m-breadcrumb__item m-breadcrumb__item--current"
        >
          {title}
        </Anchor>
      </React.Fragment>
    )}
  </View>
);

BreadCrumb.propTypes = {
  labels: PropTypes.array,
  title: PropTypes.string,
  url: PropTypes.string
};

BreadCrumb.defaultProps = {
  labels: [],
  title: '',
  url: ''
};

export default BreadCrumb;
