
import { Photo } from '../types/Photo'
import { storage } from '../libs/firebase'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

export async function getAllPhotos() {
    let list: Photo[] = [];
    
    const imagesFolder = ref(storage, 'images')
    const photoList = await listAll(imagesFolder)

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i])

        list.push({
            name: photoList.items[i].name,
            url: photoUrl,
        })
    }
    return list
}

export async function uploadPhoto(file: File) {
    if(['image/jpg','image/jpeg', 'image/png'].includes(file.type)) {
        
        const newFilePath = ref(storage, `images/${v4()}`)

        const upload = await uploadBytes(newFilePath, file)

        const newPhotoUrl = await getDownloadURL(upload.ref)

        return {
            name: upload.ref.name,
            url: newPhotoUrl
        } as Photo

    } else {
        return new Error('Tipo de arquivo não permitido')
    }
}