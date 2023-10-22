import { Notyf } from "notyf";

class Notification {

    private notify = new Notyf({
        duration: 4000,
        position: { x: 'center', y: 'top' }
    });

    public success(message: string): void {
        this.notify.success(message);
    }

    public error(error: any): void {
        this.notify.error(this.extractMessage(error));
    }

    private extractMessage(error: any): string {
        if (typeof error === "string") return error; // If regular string

        if (typeof error.response?.data === "string") return error.response.data; // If axios exception

        if (typeof error.message === "string") return error.message; // If other exception

        return "Some error, please try again."; // Unknown
    }
}

const notification = new Notification();

export default notification;