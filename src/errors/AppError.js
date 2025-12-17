export class AppError extends Error{
    constructor(message, error_status = 400){
        super(message);
        this.error_status = error_status;
    }
}