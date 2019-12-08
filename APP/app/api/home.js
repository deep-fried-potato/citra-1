import session from "./session"
import {AsyncStorage} from "react-native";

export default {
    getIssues(lat, lng, rad, headers) {
        return session.get("/common/getIssues", {
            params: {
                'lat': lat,
                'lng': lng,
                'rad': rad
            },
            headers: headers,
        })
    }
}

