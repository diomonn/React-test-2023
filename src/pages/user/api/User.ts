import axios from '@/utils/http';
export const initial = {
  _id:"",
  phoneNumber: '',
  password: '',
  name: '',
  avatar: '',
  email: '',
  job: '',
  jobName: '',
  organization: '',
  location: '',
  personalWebsite: '',
};
export type User = typeof initial

export const getTableData = async ({ current, pageSize }) => {
  const {
     data:list, 
     meta:{total}
    }= await axios.get<{data,meta}>(`/api/user`,{
      params:{
        pageSize:pageSize,
        page:current
      }
    })
  
    console.log(list,total);
    
    return {list,total}
 };
export const deleteTableData=async   (id:string)=>{
 
  
  const res = await axios.delete(`/api/user/${id}`)
  // const json = await res.json();
  // console.log(affected);
  
  return { ok: res.affected === 1 };
  
}
export const updateTableData = async (id: string, data: Partial<User>) => {
  const {data:result}=await axios.patch<{data}>(`/api/user/${id}`,data,{
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  console.log(result);
  
  return { ok: result && result.affected === 1 };
};
export const addTableData= async (data: Partial<User>) => {
  // data._id=Math.floor((Math.random()*1000)).toString();
  const newItem=await axios.post<User>(`/api/user`,data,{
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    }
  })    

  data._id='' 

  return { ok: newItem && newItem._id, data: newItem };
} 
export const AxiosgetALL=async ()=>{
   let a=await axios.get('/api/user')
   console.log(a);
}
