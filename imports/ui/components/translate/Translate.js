import React from 'react';
import i18n from 'meteor/universe:i18n';
import { array } from 'prop-types';

i18n.setLocale('ru-RU');
const T = i18n.createComponent();

// link: [{ type: 'ru', val: 'menu.title.salads' }],
const Translate = ({ link }) => {
    const locale = i18n.getLocale();
    const dictionary = { 'ru-RU': 'ru', 'en-US': 'en' };
    const type = dictionary[locale];
    const key = ['common.', link.filter(lang => lang.type === type)[0].val].join('');
    return <T>{key}</T>;
};

Translate.propTypes = { link: array.isRequired };

export default Translate;
