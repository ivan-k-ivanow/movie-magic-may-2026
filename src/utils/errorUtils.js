import z from "zod";

export const getErrorMessage = (error) => {
    let errorMessage = null;

    if (error.name === 'ZodError') {
        const errors = z.flattenError(error).fieldErrors;
        
        errorMessage = Object.values(errors).flat().at(0) || "Invalid Input";
    } else if ( error.name === 'PrismaClientKnownRequestError') {
        switch (error.code) {
            case 'P2002':
                error = 'Unique constraint failed';
                break;
            default:
                error = 'Database error';
        }
    } else {
        errorMessage = error.message || 'An unexpected error occurred';
    }

    return errorMessage;
};

