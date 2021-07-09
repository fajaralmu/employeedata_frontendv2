import { Position } from './position';
export class Employee {

    id:number |undefined;
    position:Position|undefined;
    name:string|undefined;
    email:string|undefined;
    address:string|undefined;
    idNumber:string|undefined;
    gender:number = 0;
    birthDate:Date|undefined;
    
    genderString:string = "";
    birthDateString:string = "";
}
