import React from 'react';

const CurrencyFormatter = ( value ) => {
   if (typeof value !== 'number' || isNaN(value)) {
    return null; 
   }
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });  
  return formatter.format(value);
};

export default CurrencyFormatter;