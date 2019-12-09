import { ILocation } from '../location/location.model';


export interface IAddRequest {
    accessCode: string;
    message: string;
    group: string;
    location: ILocation;
}
