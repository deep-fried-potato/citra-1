import Config from "react-native-config";
import { RNS3 } from 'react-native-aws3';

const options = {
    keyPrefix: Config.AWS_S3_FOLDER,
    bucket: Config.AWS_S3_BUCKET,
    region: Config.AWS_REGION,
    accessKey: Config.AWS_ACCESS_KEY,
    secretKey: Config.AWS_SECRET_KEY,
    successActionStatus: 201
}

export default {
    uploadToS3(file, mediaType){
        RNS3.put({uri:file, name:file.replace(/^.*[\\\/]/, ''), type: mediaType}, options)
    }
}

