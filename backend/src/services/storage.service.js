import ImageKit, {toFile} from '@imagekit/javascript'
import config from '../config/config.js'

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY
});

export const uploadFile = async ({buffer, fileName}) => {
    const response = await client.files.upload({
        file: await toFile(buffer),
        fileName: fileName,
    })
    return response
}