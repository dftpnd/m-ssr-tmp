import React from 'react';
import { connect } from 'react-redux';
import { string, func, bool } from 'prop-types';

const Accounts = ({ accounts }) => <div className="accounts">{accounts.email}</div>;

Accounts.propTypes = {};
Accounts.defaultProps = {};

const mapStateToProps = state => ({ accounts: state.accounts });
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
