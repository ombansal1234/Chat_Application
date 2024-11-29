export const dataSender=(res,data,status)=>{
    return res.status(status).json(data);  
}