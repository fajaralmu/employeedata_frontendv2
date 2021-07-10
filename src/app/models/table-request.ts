export class TableRequest {
    page:number = 0;
    limit:number = 5;
    orderBy:string = "id";
    orderType:string = "asc";
    search:string = "";
// 
    totalData:number = 0;
}
