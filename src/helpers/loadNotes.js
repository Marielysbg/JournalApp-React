import { collection, getDocs } from "@firebase/firestore"
import { db } from "../firebase/firebase-config"


export const loadNotes = async (uid) => {

    const noteSnap = await getDocs(collection(db, `${uid}`, "journal/notes"));
    const notes = [];

    noteSnap.forEach( snapHijo => {
        
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })

    })
    
    return notes;

}