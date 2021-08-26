
export const getUser=()=>{

    let userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null

    if(userInfoFromStorage===null) {
        userInfoFromStorage = sessionStorage.getItem('userInfo')
            ? JSON.parse(sessionStorage.getItem('userInfo'))
            : null
    }

    if(userInfoFromStorage===null)
    {
        return null
    }
    else return ""


}
