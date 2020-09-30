export interface IFeature {
    getFeature(featureName: string, userID: string): Promise<any>;
}