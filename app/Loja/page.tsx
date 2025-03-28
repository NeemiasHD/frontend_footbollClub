import React from 'react';
import ResultadosSection from '../Components/resultados/ResultadosSection';
import CalendarioSecao from '../Components/calendario/CalendarioSecao';
import LojaSection from '../Components/lojaBagres/LojaSection';




function page() {
  return (
    <div className='Main'>

      <LojaSection tipo={true} />
    
    </div>
  );
}

export default page;
