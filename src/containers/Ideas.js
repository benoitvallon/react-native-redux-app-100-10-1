import React, {
  Component
} from 'react-native';

import IdeasList from '../components/IdeasList';

export default class Ideas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IdeasList {...this.props} />
    );
  }
}
