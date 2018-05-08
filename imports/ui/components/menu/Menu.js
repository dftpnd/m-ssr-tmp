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
                    name_2: 'Описание описание',
                    price: '410',
                    price_2: 'Заказать'
                },
                {
                    name: 'Primavera (Примавера)',
                    name_2: 'Описание описание описание',
                    price: '450',
                    price_2: 'Заказать'
                },
                {
                    name: 'Soleluna (Солелуна)',
                    name_2: 'Описание описание описание',
                    price: '420',
                    price_2: 'Заказать'
                },
                {
                    name: 'A modo mio (А модо мио)',
                    name_2: 'Описание описание описание',
                    price: '500',
                    price_2: 'Заказать'
                },
                {
                    name: 'Gustosa (Густоза)',
                    name_2: 'Описание описание описание',
                    price: '500',
                    price_2: 'Заказать'
                },
                {
                    name: 'Vegetariana (Веджетариана)',
                    name_2: 'Описание описание описание',
                    price: '350',
                    price_2: 'Заказать'
                },
                {
                    name: 'Diavola (Дьявола)',
                    name_2: 'Описание описание описание',
                    price: '370',
                    price_2: 'Заказать'
                },
                {
                    name: 'Dolce Verona (Дольче Верона)',
                    name_2: 'Описание описание описание',
                    price: '520',
                    price_2: 'Заказать'
                },
                {
                    name: 'Friulana (Фриулана)',
                    name_2: 'Описание описание описание',
                    price: '400',
                    price_2: 'Заказать'
                },
                {
                    name: 'Bolognese (Болоньезе)',
                    name_2: 'Описание описание описание',
                    price: '390',
                    price_2: 'Заказать'
                },
                {
                    name: 'La metà (Ла мета)',
                    name_2: 'Описание описание описание',
                    price: '450',
                    price_2: 'Заказать'
                },
                {
                    name: 'Margherita (Маргерита)',
                    name_2: 'Описание описание описание',
                    price: '450',
                    price_2: 'Заказать'
                },
                {
                    name: 'Calabrese (Калабрэзэ)',
                    name_2: 'Описание описание описание',
                    price: '350',
                    price_2: 'Заказать'
                },
                {
                    name: 'Tartufo (Тартуфо)',
                    name_2: 'Описание описание описание',
                    price: '450',
                    price_2: 'Заказать'
                },
                {
                    name: '4 formaggi (4 формаджи)',
                    name_2: 'Описание описание описание',
                    price: '520',
                    price_2: 'Заказать'
                },
                {
                    name: 'Napoletana (Наполетана)',
                    name_2: 'Описание описание описание',
                    price: '750',
                    price_2: 'Заказать'
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
                {menu2.map((item, index) => (
                    <div className="bordertwo" key={index}>
                        {item.name}
                    </div>
                ))}
                {menu2.map((item, index) => (
                    <div className="border" key={index}>
                        {menu2.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item.list.map((subItem, i) => {
                                        return (
                                            <div className="text" key={i}>
                                                <p>
                                                    {subItem.name}
                                                    <br />
                                                    {subItem.name_2}.
                                                </p>
                                                <p>
                                                    Цена: {subItem.price}
                                                    <br />
                                                    {subItem.price_2}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
};

Menu.propTypes = {
    menu: array.isRequired,
    fetch: func.isRequired
};

const mapStateToProps = state => ({ menu: state.menu });

export default connect(mapStateToProps, { fetch: callGetMenu })(Menu);
