import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { connect } from 'react-redux';

import { getFullYear, getFooterCopy } from '../utils/utils';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return (
      <footer>
        <p>{`Copyright ${getFullYear()} - ${getFooterCopy(true)}`}</p>
        { user ?
          <p id="conctacUs"><a>Contact us</a></p> :
          <></> }
      </footer>
    );
  }
}

Footer.propTypes = {
  user: PropTypes.object,
};

Footer.defaultProps = {
  user: null,
};

export const mapStateToProps = (state) => {
  return {
    user: state.get('user'),
  };
};

export default connect(mapStateToProps, null)(Footer);
