import { $host } from "./host";


export const getNews = async()=>{
    let {data} = await $host.get(`/newstories.json?print=pretty`);
    return data
}

export const getItem = async(id:number)=>{
    let {data} = await $host.get(`/item/${id}.json?print=pretty`);
    return data
}