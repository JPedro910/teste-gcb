import styled from "styled-components";

const SearchForm = styled.form`
    text-align: center;
    margin-bottom: 20px;

    > div > input {
        margin-bottom: 10px;
    }

    > div > button {
        cursor: pointer;
        width: 100%;
        background-color: #000;
        color: #fff;
        border: none;
        font-weight: bold;
        padding: 1rem;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    > div > select {
        width: 100%;
        font-weight: bold;
        padding: 1rem;
    }
`;

export default SearchForm;