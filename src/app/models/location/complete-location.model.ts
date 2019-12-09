export interface ICompleteLocationModel {
    adminArea: string; // state // New South Wales
    subAdminArea: string; // council // Canterbury City Council
    countryCode: string; // AU
    countryName: string; // Australia
    latitude: number; // -33.9294253
    longitude: number; // 151.0697303
    locality: string; // suburb or city
    subLocality: string; //
    postalCode: string; // 2195
    thoroughfare: string; // street, road
    subThoroughfare: string; // House number
    timestamp?: Date;
    speed?: string;
}
