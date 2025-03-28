'use client'

import Link from "next/link";
import React from "react";


interface Props {
  NomeSecao: string;
  URL?: string;
}
/*Cabecalho das secoes com botoes de saiba mais */

const HeaderSection: React.FC<Props> = ({ NomeSecao, URL }) => {
  return (
    <div className='w-[100%] justify-center flex items-center pt-[50px] pb-[50px]'>

      <div className="HeaderSectionMain">
        <h1 className="NomeSecao">{NomeSecao}</h1>
        <Link href={`/${URL}`} className="VermaisBtn">Ver mais</Link>
      </div>
    </div>
  );
};

export default HeaderSection;
