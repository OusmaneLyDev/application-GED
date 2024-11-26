import fileUpload from 'express-fileupload';

const fileUploadConfig = () => ({
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 },
    useTempFile: false
})

export default fileUploadConfig;