import session from './session'
import upload from "./uploadImage";
import {AsyncStorage} from "react-native"

const headers = {
    'Content-Type': 'application/json',
    'x-access-token': AsyncStorage.getItem('userToken')
};

export default {
    createIssue(metrics) {
        const {media, ...issue} = {...metrics}
        const mediaUrls = []
        media.map(
            media => upload.uploadToS3(media).then(response => mediaUrls.push(response.body.postResponse.location))
        );
        session.post('/resident/addIssue', {...issue, 'media':mediaUrls}, {headers:headers})
    }
}
