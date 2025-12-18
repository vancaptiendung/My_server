export const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    const status = err.error_status || 500;

    res.status(status).json({
        message : err.message || "Internal server errror !"
    });
};