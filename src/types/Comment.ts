export interface Comment{
    id : number,
    text : string,
    by : string,
    time : Date,
    parent : number,
    kids : number[],
    type : string
}