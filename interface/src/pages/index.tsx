import React, { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Header from "../components/Header";
import Aside from "../components/Aside";
import ContainerMain from "../components/ContainerMain";
import Button from "../components/Button/index";
import LoadingGif from "../components/LoadingGif/index";
import Checkbox from "../components/Checkbox";

import Form from "../styles/form";
import Input from "../styles/input";

import clientApi from "../services/api/clientApi";
import serverApi from "../services/api/serverApi";

import { useModal } from "../providers/ModalProvider";

import { SpecialtiesTypes } from "../types/specialties";

import { DoctorSchema } from "../utils/validation";

type RegisterDoctorTypes = {
  specialties: SpecialtiesTypes[];
}

const RegisterDoctor = ({ specialties }: RegisterDoctorTypes) => {
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Cadastrar Médico");
  const { handleShowModal } = useModal();
  const { handleSubmit, register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(DoctorSchema),
  });
  const handleRegisterDoctor: SubmitHandler<any> = async data => {
    
    const { name, crm, landline, cellPhone, cep, ["checkbox"]: specialties } = data;
    
    if(!specialties || specialties.length < 2) {
      return handleShowModal("Marque pelo menos duas especialidades");
    }

    setButtonChildren(<LoadingGif />);

    await clientApi
      .post("/doctors", {
        name, 
        crm, 
        landline, 
        cellPhone, 
        cep,
        specialties
      })
      .then(() => {
        reset();
        handleShowModal("Cadastro criado com sucesso");
      })
      .catch(({ request: { response } }) =>
        handleShowModal(JSON.parse(response).message)
      );

    setButtonChildren("Cadastrar Médico");
  };

  return (
    <>
      <Header />
      <Aside />
      <ContainerMain>
        <Form onSubmit={handleSubmit(handleRegisterDoctor)}>

          <div>
            <p>{ errors.name?.message }</p>
            <Input
              {...register("name")}
              type="text"
              placeholder="Nome"
              name="name"
            />
          </div>

          <div>
            <p>{ errors.crm?.message }</p>
            <Input
              {...register("crm")}
              type="number"
              min={0}
              placeholder="CRM"
              name="crm"
            />
          </div>

          <div>
            <p>{ errors.landline?.message }</p>
            <Input
              {...register("landline")}
              type="text"
              placeholder="Telefone Fixo - DD99999999"
              name="landline"
            />
          </div>

          <div>
            <p>{ errors.cellPhone?.message }</p>
            <Input
              {...register("cellPhone")}
              type="text"
              placeholder="Telefone Celular - DD999999999"
              name="cellPhone"
            />
          </div>

          <div>
            <p>{ errors.cep?.message }</p>
            <Input
              {...register("cep")}
              type="text"
              placeholder="CEP"
              name="cep"
            />
          </div>

          <div>
            <h3>Especialidades</h3>
            {specialties.map((specialty, i) => (
              <Checkbox key={i} name={specialty.name} register={register} />
            ))}
          </div>

          <Button type="submit">
            {buttonChildren}
          </Button>
        </Form>
      </ContainerMain>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const specialties = await serverApi(context)
                  .get("/doctors/specialties")
                  .then(({ data }) => data)
                  .catch((error) => {
                    console.log(error);
                    return [];
                  })

  return {
        props: {
          specialties
        }
    }
}

export default RegisterDoctor;