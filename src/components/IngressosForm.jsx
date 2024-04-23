'use client'

import { api } from '@/api';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function IngressoForm() {

    const IngressoSchema = yup.object().shape({
        quantidade: yup.number()
                    .min(1, "A quantia mínima é de 1 ingresso!")
                    .required("A quantia de ingressos é obrigatória!"),
        preco: yup.number()
                    .required("É necessário informar o valor do ingresso"),
      });
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({ resolver: yupResolver(IngressoSchema) });
    
      const router = useRouter();
    
      const onSubmit = async (data) => {
        api.post('/event', data)
          .then((response) => {
            toast.success('Ingresso cadastrado com sucesso!');
            router.replace('/admin/categorias');
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || 'Erro ao cadastrar departamento!');
          })
      };
    
      return (
        <>
          <div className="flex min-h-full flex-1 flex-col justify-left py-12 sm:px-6 lg:px-8">
            <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
              <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form className="space-y-6" action="#" method="POST"  onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Quantidade
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("quantidade")}
                        type="text"
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {errors.quantidade && <p className="mt-2 text-sm text-red-600" id="name-error">{errors.quantidade.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Evento
                    </label>
                    <div className="mt-2">
                      <select name="evento" id="evento" {...register("evento")}
                        type="text"
                        autoComplete="name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">

                      </select>
                        
                    </div>
                    {errors.quantidade && <p className="mt-2 text-sm text-red-600" id="name-error">{errors.quantidade.message}</p>}
                  </div>
    
                  <div className='flex flex-row gap-x-4'>
    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                        Preço
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("preco")}
                          type="text"
                          autoComplete="description"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      {errors.preco && <p className="mt-2 text-sm text-red-600" id="description-error">{errors.preco.message}</p>}
                    </div>

                    
    
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Cadastrar
                    </button>
                  </div>
                </form>
    
              </div>
    
            </div>
          </div>
        </>
      )    
}