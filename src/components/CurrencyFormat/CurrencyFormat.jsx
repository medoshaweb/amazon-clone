import React from 'react';
import numeral from 'numeral';

const CurrencyFormat = ({ value }) => {
  return <span>{numeral(value).format('$0,0.00')}</span>;
};

export default CurrencyFormat;
