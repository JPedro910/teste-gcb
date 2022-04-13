import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

import Header from "../components/Header";
import Aside from "../components/Aside";
import ContainerMain from "../components/ContainerMain";

import Input from '../styles/input';
import SearchForm from '../styles/pages/searchForm';

import { Table, UpdateButton, DeleteButton, InformationButton } from "../styles/pages/doctors";

import serverApi from "../services/api/serverApi";
import clientApi from "../services/api/clientApi";

import { useModal } from "../providers/ModalProvider";
import { DoctorTypes } from '../types/doctor';

import { maskedLandline } from '../utils/masked/maskedLandline';
import { maskedCellPhone } from '../utils/masked/maskedCellPhone';
import { maskedCep } from '../utils/masked/maskedCep';

type DoctorsTypes = {
  doctors: DoctorTypes[];
}

const Doctors = ({ doctors }: DoctorsTypes) => {
    const router = useRouter();
    const { handleShowModal } = useModal();
    const { register, handleSubmit, reset } = useForm();
    const handleUpdateDoctor = (
      id: string, name: string, crm: string, specialties: string[], landline: string, cellPhone: string, cep: string
    ) => {
      router.push(
        `/update-doctor?id=${id}&name=${name}&crm=${crm}&` + 
        `specialtiesList=${specialties}&landline=${landline}&cellPhone=${cellPhone}&cep=${cep}`
      );
    }
    const handleDoctorDeletion = async (id: string) => {
      await clientApi
        .delete(`/doctors/${id}`)
        .catch(({ request: { response } }) =>
          response
            ? handleShowModal(JSON.parse(response).message)
            : handleShowModal("Erro no Servidor")
        );

      router.push("/doctors");
    }
    const handleSearch = async (data: any) => {
      const { field, value } = data;
      router.push(`/doctors?field=${field}&value=${value}`);
      reset();
    };
    const handleAllDoctors = () => router.push("/doctors");
    
    return ( 
        <>
            <Header />
            <Aside />
            <ContainerMain>
                <SearchForm onSubmit={handleSubmit(handleSearch)}>
                  <div>
                      <Input 
                        {...register("value", { required: true })}
                        type="text" 
                        name="value"
                      />
                  </div>
                  <div>
                      <select {...register("field")} name="field">
                        <option value="name">Nome</option>
                        <option value="crm">CRM</option>
                        <option value="specialties">Especialidades</option>
                        <option value="landline">Telefone Fixo</option>
                        <option value="cellPhone">Telefone Celular</option>
                        <option value="cep">CEP</option>
                        <option value="street">Rua</option>
                        <option value="district">Bairro</option>
                        <option value="city">Cidade</option>
                        <option value="state">Estado</option>
                    </select>
                      <button type="submit">
                        Pesquisar
                      </button>
                      <button type="button" onClick={handleAllDoctors}>
                        Mostrar Todos os Médicos
                      </button>
                  </div>
                </SearchForm>
                <Table>
                    <thead>
                        <tr>
                          <th>Nome</th>
                          <th>CRM</th>
                          <th>Informações</th>
                          <th>Atualizar</th>
                          <th>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {doctors.map((doctor: DoctorTypes) => ( 
                        <tr key={doctor.id}>
                          <td>{doctor.name}</td>
                          <td>{doctor.crm}</td>
                          <td>
                            <InformationButton onClick={
                              () => handleShowModal(
                                  <ul id="message">
                                    <li accessKey="li">Nome: {doctor.name}</li>
                                    <li accessKey="li">CRM: {doctor.crm}</li>
                                    <li accessKey="li">Especilidades: {doctor.specialties.join(", ")}</li>
                                    <li accessKey="li">Telefone Fixo: {maskedLandline(doctor.landline)}</li>
                                    <li accessKey="li">Telefone Celular: {maskedCellPhone(doctor.cellPhone)}</li>
                                    <li accessKey="li">CEP: {maskedCep(doctor.cep)}</li>
                                    <li accessKey="li">Rua: {doctor.street}</li>
                                    <li accessKey="li">Bairro: {doctor.district}</li>
                                    <li accessKey="li">Cidade: {doctor.city}</li>
                                    <li accessKey="li">Estado: {doctor.state}</li>
                                  </ul>, 
                                "Information"
                              )
                            }>
                              Informações
                            </InformationButton>
                          </td>
                          <td>
                            <UpdateButton onClick={
                                () => handleUpdateDoctor(
                                      doctor.id, 
                                      doctor.name, 
                                      doctor.crm, 
                                      doctor.specialties, 
                                      doctor.landline, 
                                      doctor.cellPhone, 
                                      doctor.cep
                                  )
                              }>
                              Atualizar
                            </UpdateButton>
                          </td>
                          <td><DeleteButton onClick={() => handleDoctorDeletion(doctor.id)}>Excluir</DeleteButton></td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
            </ContainerMain>
        </>
     );
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { field, value } = context.query;

  let doctors;

  if(field && value) {
    doctors = await serverApi(context)
                  .get(`/doctors/search?field=${field}&value=${value}`)
                  .then(({ data }) => data)
                  .catch((error) => {
                    console.log(error);
                    return [];
                  }) 
  } else {
    doctors = await serverApi(context)
                    .get("/doctors")
                    .then(({ data }) => data)
                    .catch((error) => {
                      console.log(error);
                      return [];
                    }) 
  }

  return {
        props: {
          doctors
        }
    }
}

export default Doctors;