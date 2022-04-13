import React from "react";

import { UseFormRegister } from "react-hook-form";
import CheckboxContainer from "./styles";

type CheckboxTypes = {
    name: string;
    register: UseFormRegister<any>;
    values?: string[] | undefined;
} 

const CheckBox = ({ name, register, values }: CheckboxTypes) => {
    return (
        <CheckboxContainer>
            <input 
                type="checkbox" 
                {...register("checkbox")}
                value={name}
                defaultChecked={values?.includes(name) ? true : false}
            />
            <label>
                <b>{name}</b>
            </label>
        </CheckboxContainer>
    );
}

export default CheckBox;