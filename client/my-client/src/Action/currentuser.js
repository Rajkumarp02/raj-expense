
//read-data
export const currentuser = (data) => {

    return{
     type:'FETCH-CURRENT-USER',
     payload:data
    }
}