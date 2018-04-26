import { connect } from 'react-redux';
import { element, oneOfType, arrayOf, object } from 'prop-types';

const Main = ({ children }) => children;

Main.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default connect()(Main);
