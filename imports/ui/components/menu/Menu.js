import React from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { callGetMenu } from '../../../api/redux/async-actions';

const Menu = ({ menu, fetch }) => {
    fetch();

    const menu2 = [
        {
            name: 'pizza',
            list: [
                {
                    name: 'Boscaoila',
                    price: '230'
                },
                {
                    name: 'Primavera',
                    price: '300'
                }
            ]
        },
        {
            name: 'паста',
            list: [
                {
                    name: 'Kolya',
                    price: '130'
                },
                {
                    name: 'Sergei',
                    price: '500'
                }
            ]
        }
    ];

    return (
        <section>
            <div className="menu">
                {menu.map((item, index) => <div key={index}>{item.name}</div>)}
                <a>мудак</a>
            </div>
            {menu2.map((item, index) => {
                return (
                    <div key={index}>
                        {item.list.map((subItem, i) => {
                            return <div key={i}>{subItem.name}</div>;
                        })}
                    </div>
                );
            })}
            asdasdas
        </section>
    );
};

Menu.propTypes = {
    menu: array.isRequired,
    fetch: func.isRequired
};

const mapStateToProps = state => ({ menu: state.menu });

export default connect(mapStateToProps, { fetch: callGetMenu })(Menu);
