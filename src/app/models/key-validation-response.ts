export interface KeyValidationResponse {
    userId: string;
    token: string;
    photo: Blob;
    locationUpdateFreq: number;
}
