class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public stack?: string;

    constructor(statusCode: number, message: string, isOperational = true, stack?: string) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.stack = stack;
    }
}

export default ApiError;
