export const formatErrorMessage = (error: any) => {
    console.error('Erro!',error);
    let msg = '';
    if (error.error) {
        if (error.error instanceof Array) {
            for (let entry of error.error) {
                msg += entry + '\n';
            }
        } else {
            if(error.error.match('<!DOCTYPE html>')){
                msg = error.statusError;
            } else {
                msg = eval(error.error);
            }
        }
    } else {
        msg = 'Erro Desconhecido...'
    }
    return msg;
}