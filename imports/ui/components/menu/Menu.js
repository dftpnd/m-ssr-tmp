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
                    name: 'Boscaiola (Боскайола)',
                    price: '410'
                },
                {
                    name: 'Primavera (Примавера)',
                    price: '450'
                },
                {
                    name: 'Soleluna (Солелуна)',
                    price: '420'
                },
                {
                    name: 'A modo mio (А модо мио)',
                    price: '500'
                },
                {
                    name: 'Gustosa (Густоза)',
                    price: '500'
                },
                {
                    name: 'Vegetariana (Веджетариана)',
                    price: '350'
                },
                {
                    name: 'Diavola (Дьявола)',
                    price: '370'
                },
                {
                    name: 'Dolce Verona (Дольче Верона)',
                    price: '520'
                },
                {
                    name: 'Friulana (Фриулана)',
                    price: '400'
                },
                {
                    name: 'Bolognese (Болоньезе)',
                    price: '390'
                },
                {
                    name: 'La metà (Ла мета)',
                    price: '450'
                },
                {
                    name: 'Margherita (Маргерита)',
                    price: '450'
                },
                {
                    name: 'Calabrese (Калабрэзэ)',
                    price: '350'
                },
                {
                    name: 'Tartufo (Тартуфо)',
                    price: '450'
                },
                {
                    name: '4 formaggi (4 формаджи)',
                    price: '520'
                },
                {
                    name: 'Napoletana (Наполетана)',
                    price: '750'
                }
            ]
        },
        {
            name: 'Pasta',
            list: [
                {
                    name: 'Tagliatelle alla boscaiola (Тальятелле алла боскайола)',
                    price: '350'
                },
                {
                    name: 'Al pomodoro (Аль помодоро)',
                    price: '320'
                },
                {
                    name: 'Bolognese (Болоньезе)',
                    price: '320'
                },
                {
                    name: 'Penne con pollo (Пенне кон полло)',
                    price: '300'
                },
                {
                    name: 'Piemontese (Пьемонтезе)',
                    price: '420'
                },
                {
                    name: 'Carbonara (Карбонара)',
                    price: '350'
                },
                {
                    name: 'Nera (Нера)',
                    price: '380'
                },
                {
                    name: 'Tenera (Тэнэра)',
                    price: '450'
                },
                {
                    name: 'Con calamari',
                    price: '450'
                }
            ]
        }
    ];

    return (
        <section>
            <div className="menu">
                {menu.map((item, index) => <div key={index}>{item.name}</div>)}
                <a>название</a>
            </div>
            {menu2.map((item, index) => {
                return (
                    <div key={index}>
                        {item.list.map((subItem, i) => {
                            return (<div className="text" key={i}><p>{subItem.name}</p><p>цена:{subItem.price}</p></div>);
                        })}
                    </div>
                );
            })}
        </section>
    );
};

Menu.propTypes = {
    menu: array.isRequired,
    fetch: func.isRequired
};

const mapStateToProps = state => ({ menu: state.menu });

export default connect(mapStateToProps, { fetch: callGetMenu })(Menu);
