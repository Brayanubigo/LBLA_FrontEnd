
const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center font-bold mt-5' 
    
    : 'bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative text-center font-bold mt-5'}
     `}>
      {alerta.msg}
      </div>
  )
}

export default Alerta