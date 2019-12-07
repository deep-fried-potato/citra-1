import session from './session'

export default {
    createIssue(metrics){
        session.post('/resident/addIssue',{
            ...metrics
        })
    }
}
