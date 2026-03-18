import ImageKit, { toFile } from '@imagekit/nodejs';

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async ({ buffer, fileName, folder = "" }) => {
    const file = await client.files.upload({
        file: await toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder
    });
    return file;
};

export const deleteFile = async ({ fileId, folder = "" }) => {
    await client.files.delete(fileId, {
        folder
    });
};