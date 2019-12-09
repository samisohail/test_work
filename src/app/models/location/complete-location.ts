export class CompleteLocation {
    state: string; // adminArea - state // New South Wales
    council: string; // subAdminArea - council // Canterbury City Council
    countryCode: string; // AU
    country: string; // Australia
    latitude: number; // -33.9294253
    longitude: number; // 151.0697303
    city: string; // locality - suburb or city
    // subLocality: string; //
    postalCode: string; // 2195
    street: string; // thoroughfare - street, road
    building: string; // subThoroughfare
    timestamp?: Date;
    speed?: string;
    distance: string;

    CompleteLocation() {
        this.state = '0',
        this.council = '0',
        this.countryCode = '0',
        this.country = '0',
        this.latitude = 0,
        this.longitude = 0,
        this.city = '0',
        // this.subLocality = '0',
        this.postalCode = '0',
        this.street = '0',
        this.building = '0',
        this.distance = '0'
    }
}
