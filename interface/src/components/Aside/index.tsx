import React from 'react';
import Link from "next/link";

import ContainerAside from './styles';

import { GiArchiveRegister } from "react-icons/gi";
import { FaNotesMedical } from "react-icons/fa";

import { useMenu } from "../../providers/MenuProvider";

const Aside = () => {
    const { left, closeMenu } = useMenu();

    return ( 
        <>
            <ContainerAside left={left}>
                <ul>
                    <li onClick={() => { closeMenu() }}>
                        <GiArchiveRegister /> 
                        <Link href="/">Cadastrar Médicos</Link>
                    </li>

                    <li onClick={() => { closeMenu() }}>
                        <FaNotesMedical /> 
                        <Link href="/doctors">Consultar Médicos</Link>
                    </li>
                </ul>

            </ContainerAside>
        </>
     );
}
 
export default Aside;