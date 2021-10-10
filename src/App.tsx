import { useState, useEffect, FormEvent } from "react";


import { Container, Area, Header, ScreenWarning, PhotoList, UploadForm } from "./App.styles";
import { getAllPhotos, uploadPhoto } from "./services/photos";
import { Photo } from './types/Photo'
import { PhotoItem } from './components/PhotoItem'

export default function App() {

  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(()=> {
    async function getPhotos() {
      setLoading(true)

      setPhotos(await getAllPhotos())

      setLoading(false)
    }

    getPhotos() 
  }, [])

  async function handleAddImage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File

    if(file && file.size > 0) {
      setUploading(true)
      const uploadedPhoto = await uploadPhoto(file)
      setUploading(false)

      if(uploadedPhoto instanceof Error) {
        alert(uploadedPhoto.message)
      } else {

        let newPhotoList = [...photos]
        newPhotoList.push(uploadedPhoto)
        setPhotos(newPhotoList)

      }
    }
  }

  return (
    <Container>
      <Area>
      <Header>Galeria de Fotos</Header>
      
      <UploadForm onSubmit={handleAddImage}>
        <input type="file" name="image"/>      
        <input type="submit" value="Enviar"/> 
        {uploading && 'Enviando...'}
      </UploadForm>

      {/* Lista de fotos */}

        {loading && 
          <ScreenWarning>
            <div className='emoji'>✋</div>
            <div>Carregando...</div>
        </ScreenWarning>
        }

        {!loading && photos.length > 0 && 
          <PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} name={item.name} url={item.url}/>
            ))}
          </PhotoList>
        }

        {!loading && photos.length === 0 && 
          <ScreenWarning>
          <div className='emoji'>😐</div>
            <div>Não há fotos na galeria...</div>
          </ScreenWarning>
        }
      </Area>
    </Container>
  )
}