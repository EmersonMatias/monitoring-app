'use client'
import { PieChart } from '@mui/x-charts/PieChart';
import Header from '../inicio/components/Header.component';

export default function Estatisticas() {
  const palette = ['red', 'orange', 'green'];
  const pieParams = { width: 900, height: 300, margin: { right: 5 } };

  return (
    <div >
      <Header />

      <div className='flex flex-col items-center mt-10 '>
        <h2 className='text-3xl text-center mb-10'>Estatísticas</h2>
        <PieChart
          colors={palette}
          series={[{ data: [{ value: 10, label: "ATRASADO"  }, { value: 15, label: "AGUARDANDO CHEGADA" }, { value: 20, label: "CHEGOU AGORA" }] }]}
          {...pieParams}
        />
      </div>

      <div className='mt-10' >
        <h2 className='text-3xl text-center mb-10'>Status Alerta</h2>
        <section className='flex gap-5 px-20'>

          <div className=' p-4 bg-[#4a4845] rounded-md'>
            <h3 className='text-center'>Instituição 3</h3>
            <div className='text-center mt-4'>
              <span>Paulo </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Wagner </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Amanda </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
          </div>

          <div className=' p-4 bg-[#4a4845] rounded-md'>
            <h3 className='text-center'>Instituição 3</h3>
            <div className='text-center mt-4'>
              <span>Paulo </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Wagner </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Amanda </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
          </div>

          <div className=' p-4 bg-[#4a4845] rounded-md'>
            <h3 className='text-center'>Instituição 3</h3>
            <div className='text-center mt-4'>
              <span>Paulo </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Wagner </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Amanda </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
          </div>

          <div className=' p-4 bg-[#4a4845] rounded-md'>
            <h3 className='text-center'>Instituição 3</h3>
            <div className='text-center mt-4'>
              <span>Paulo </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Wagner </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
            <div className='text-center mt-4'>
              <span>Amanda </span> <span className='text-red-500 font-bold'> ATRASADO</span>
            </div>
          </div>

   
        </section>

      </div>

    </div>


  );
}