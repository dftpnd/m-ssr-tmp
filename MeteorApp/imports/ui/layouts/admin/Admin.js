import { connect } from 'react-redux';
import { element, oneOfType, arrayOf, object } from 'prop-types';

const Admin = ({ children }) => children;

Admin.propTypes = {
    children: oneOfType([arrayOf(element), object]).isRequired
};

export default connect()(Admin);
