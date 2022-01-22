export const blobToBase64 = (blob: Blob, callback?: Function) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
        callback &&
            callback(reader.result);
        return reader.result;
    }
}

export const NoProfilePicture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";