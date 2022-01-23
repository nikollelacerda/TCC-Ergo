export const formatErrorMessage = (error: any) => {
    console.error('Erro!',error);
    let msg = '';
    if (error.error) {
        if (error.error instanceof Array) {
            for (let entry of error.error) {
                msg += entry + '\n';
            }
        } else if(error.error instanceof Object){
            for(let key of Object.keys(error.error)){
                msg += `${key}: ${error.error[key]}\n`;
            }
        } else {
            if(error.error instanceof String && error.error.match('<!DOCTYPE html>')){
                msg = error.statusError;
            } else {
                msg = error.error;
            }
        }
    } else {
        msg = 'Erro Desconhecido...'
    }
    return msg;
}