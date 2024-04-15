import {firestore} from "../../config/FirebaseConfig";

const useListAllFriends = async (userId) => {
    const userDoc =

    console.log('DATAAAAA', userDoc.data());

    return {
        data: userDoc.data()
    };
}

export default useListAllFriends;