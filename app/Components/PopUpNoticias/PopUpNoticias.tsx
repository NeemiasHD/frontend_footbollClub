"use client"
import { Desativar_ou_ativar_ScrollGlobal, UseBagresContext } from '@/app/Context/BagresContext';
import React, { useEffect } from 'react'
import { BiX } from 'react-icons/bi';
import NoticiaSecao from '../noticias/NoticiaSecao';


function PopUpNoticias() {
    const {
        setPopUpNoticia, popupNoticia
    } = UseBagresContext();
    useEffect(() => {
        Desativar_ou_ativar_ScrollGlobal()

    }, [popupNoticia])
    return (<>
        {popupNoticia &&

            <div className={` fixed bg-black bg-opacity-70 backdrop-blur-[2px] w-[100vw] h-[100vh] z-[106] flex items-center  justify-center overflow-y-auto`} >
                <div className="fixed top-2 right-2 cursor-pointer">

                    <div
                        className=""
                        onClick={() => { setPopUpNoticia(!popupNoticia) }}
                        style={{
                            color: "white",
                            fontSize: "39px",
                            textAlign: "center",

                        }}
                    >
                        <BiX />
                    </div>
                </div>

                <div className="">
                    <NoticiaSecao tipo={true} />
                </div>
            </div>
        }
    </>
    )
}

export default PopUpNoticias