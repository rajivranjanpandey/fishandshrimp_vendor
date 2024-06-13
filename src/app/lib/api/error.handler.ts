export async function apiErrorHandler(e: Error) {
    console.log(e.message);
    return false;
}