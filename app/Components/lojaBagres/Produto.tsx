import React from 'react';
import { BiCart } from 'react-icons/bi';
import { BsHeart } from 'react-icons/bs';
import { Rating } from 'react-simple-star-rating';

interface produtoProps {
  imagemUrl: string;
  valor: string;
  nome: string;
}

const Produto: React.FC<produtoProps> = ({ imagemUrl, valor, nome }) => {
  return (
    <div
      style={{
        width: '250px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 30px var(--cinzaEscuro)',
        cursor: 'pointer',
      }}
      onClick={() => {
        window.open(
          'https://api.whatsapp.com/send?phone=5564996238206&text=Ol%C3%A1%20tenho%20interesse%20na%20camisa%20dos%20Bagres%20FC%F0%9F%98%8D%F0%9F%94%A5',
          '_blank'
        );
      }}
    >
      <img src={imagemUrl} width={250} />
      <div
        className='p-1'
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: "250px"
        }}
      >
        <div className=''>
          <p className='Nome_Produto' >
            {nome.toUpperCase()}
          </p>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            className='stars flex '
          >

            <Rating
              emptyStyle={{ display: 'flex' }}
              readonly={true}
              size={20}
              initialValue={5}
              fillStyle={{ display: '-webkit-inline-box' }}
              style={{ display: 'flex' }}
            />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div
            className='pt-1'
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <BiCart />
            <BsHeart color='red' />
          </div>
          <p className='Preco_Produto' >{valor} R$</p>
        </div>
      </div>
    </div>
  );
};

export default Produto;
