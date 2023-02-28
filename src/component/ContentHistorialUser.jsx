import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useAuthUser from '../hooks/useAuthUser';
import clienteAxios from '../config/axios';
const ContentHistorialUser = () => {
  const {authu } = useAuthUser();
  const [datosSoli, setDatosSoli] = useState([])
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    
    obtenerSoli()
  
    }, []);

    const obtenerSoli = async () =>{
      const id = authu._id
      console.log(id)
      const url = `/soli/perfiluser/${id}`
        const res = await clienteAxios.get(url)
      console.log(res.data)
      setDatosSoli(res.data)
    }

    const columns = [
  
     
      { field: 'tipo', headerName: 'Tipo de insumo', width: 130, align:"center" },
      { field: 'asignatura', headerName: 'Asignatura', width: 130, align:"center" },
      { field: 'cantidad', headerName: 'Cantidad', width: 130, align:"center" },
      { field: 'fecha', headerName: 'Fecha Solicitud', width: 150, align:"center" },
      { field: 'fechaHoraPedido', headerName: 'Fecha Requerimiento', width: 160, align:"center" },
      { field: 'descripcion', headerName: 'Descripcion', width: 200, align:"center" },
      { field: 'entregado',type: 'boolean', headerName: 'Entregado', width: 120 ,align:'center'},
    ]
 
 
  return (
    <>
     <DataGrid
        rows={datosSoli}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5,10,20]}
        onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
        getRowHeight={() => 'auto'}
        getEstimatedRowHeight={() => 100}
          sx={{
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
            py: 1,
          },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
            py: '15px',
          },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
            py: '22px',
          },
        }}
       
        getRowSpacing={params =>({
          top:params.isFirstVisible ? 0 : 5,
          bottom:params.isLastVisible ? 0 : 5,
        })}
        
      />
    </>
  )
}

export default ContentHistorialUser