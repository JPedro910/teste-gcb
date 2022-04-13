import styled from "styled-components";

const Form = styled.form`
    width: 100%;
    padding: 1rem;
    text-align: center;

    input[type=number]::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }
    
    input[type=number] { 
        -moz-appearance: textfield;
        appearance: textfield;
    }

    > div > h3 {
        text-align: left;
        margin-bottom: 10px;
    }

    > div > input, h2 {
        margin-bottom: 1.5rem;
    }

    > div > p {
        text-align: left;
        font-weight: bold;
        margin-bottom: 7px;
        text-indent: 3px;
    }
`;

export default Form;