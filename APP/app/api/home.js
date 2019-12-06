import session from "./session"

export default {
    getIssues(lat, lng, rad){
        return session.post("/common/getIssues",{
            lat, lng, rad
        })
    }
}
