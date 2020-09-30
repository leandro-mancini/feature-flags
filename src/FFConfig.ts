import { DEVICE } from "./Globals";

export class FFConfig {
    device: DEVICE;
    url: string;

    constructor(
        device: DEVICE,
        url: string
    ) {
        this.device = device;
        this.url = url;
    }
}
