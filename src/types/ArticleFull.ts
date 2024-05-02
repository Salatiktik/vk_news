export interface ArticleFull{
    id : number,
    title : string,
    by : string,
    time : Date,
    score : number,
    kids : number[],
    descendants : number,
    url : string,
}