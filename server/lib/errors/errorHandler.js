export const errorHandler=(err,req,res,next)=>{
    console.error(`${err}`.bgRed.black);
    console.error(`Error stack: ${err.stack}`.underline.red);

    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong!';

    res.status(statusCode).json({ message: message });
}