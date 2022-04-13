import React, { ReactElement } from 'react';

import ContainerMainStyle from "./styles";

type ContainerMainTypes = {
    children: ReactElement | ReactElement[];
}

const ContainerMain = ( { children }: ContainerMainTypes ) => {
    return ( 
        <>
            <ContainerMainStyle>
                {children}
            </ContainerMainStyle>
        </>
     );
}
 
export default ContainerMain;