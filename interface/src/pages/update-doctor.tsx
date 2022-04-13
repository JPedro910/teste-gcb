import React, { ReactElement, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
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

type UpdateDoctorTypes = {
  specialties: SpecialtiesTypes[];
}

const UpdateDoctor = ({ specialties }: UpdateDoctorTypes) => {
  const { handleShowModal } = useModal();
  const { query, push } = useRouter();
  const { id, name, crm, landline, cellPhone, cep, specialtiesList } = query;
  const [buttonChildren, setButtonChildren] = useState<string | ReactElement>("Atualizar Médico");
  const { handleSubmit, register, formState: { errors, }, reset } = useForm({
    resolver: yupResolver(DoctorSchema),
  });
  const handleUpdateDoctor: SubmitHandler<any> = async data => {
    
    const { name, crm, landline, cellPhone, cep, ["checkbox"]: specialties } = data;

    if(!specialties || specialties.length < 2) {
      return handleShowModal("Marque pelo menos duas especialidades");
    }

    setButtonChildren(<LoadingGif />);

    await clientApi
      .patch(`/doctors/${id}`, {
        name, 
        crm, 
        landline, 
        cellPhone, 
        cep,
        specialties
      })
      .then(() => {
        handleShowModal("Cadastro atualizado com sucesso");
        push("/doctors");
      })
      .catch(({ request: { response } }) =>
        response
          ? handleShowModal(JSON.parse(response).message)
          : handleShowModal("Erro no Servidor")
      );

      setButtonChildren("Atualizar Médico");
  };

  return (
    <>
      <Header />
      <Aside />
      <ContainerMain>
        <Form onSubmit={handleSubmit(handleUpdateDoctor)}>

          <div>
            <p>{ errors.name?.message }</p>
            <Input
              {...register("name")}
              type="text"
              placeholder="Nome"
              name="name"
              defaultValue={name}
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
              defaultValue={crm}
            />
          </div>

          <div>
            <p>{ errors.landline?.message }</p>
            <Input
              {...register("landline")}
              type="text"
              placeholder="Telefone Fixo"
              name="landline"
              defaultValue={landline}
            />
          </div>

          <div>
            <p>{ errors.cellPhone?.message }</p>
            <Input
              {...register("cellPhone")}
              type="text"
              placeholder="Telefone Celular"
              name="cellPhone"
              defaultValue={cellPhone}
            />
          </div>

          <div>
            <p>{ errors.cep?.message }</p>
            <Input
              {...register("cep")}
              type="number"
              min={0}
              placeholder="CEP"
              name="cep"
              defaultValue={cep}
            />
          </div>

          <div>
            {specialties.map((specialty, i) => (
              <Checkbox key={i} name={specialty.name} register={register} values={specialtiesList?.toString().split(",")} />
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

export default UpdateDoctor;