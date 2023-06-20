import { React, useRef } from 'react'

function PhotoUpload({ name, onUpload }) {
  const photo = useRef()

  const previewPhoto = (ev) => {
    photo.current.src = URL.createObjectURL(ev.target.files[0])
  }

  return (
    <div class='mx-auto w-full text-center'>
      <div class='relative w-full text-center'>
        <label htmlFor={name}>
          <img
            ref={photo}
            class='w-28 h-28 rounded-full mx-auto cursor-pointer border-2 border-indigo-400 object-cover'
            src='https://st2.depositphotos.com/1104517/11967/v/950/depositphotos_119675554-stock-illustration-male-avatar-profile-picture-vector.jpg'
            accepts='images/*'
          />
        </label>
        {/* <div class='w-28 h-28 bg-gray-200 opacity-60 rounded-full flex justify-center items-center cursor-pointer transition duration-500'>
          <img
            class='mx-auto group-hover:block w-12'
            src='https://www.svgrepo.com/show/33565/upload.svg'
          />
        </div> */}
        <input
          type='file'
          name={name}
          id={name}
          hidden
          onChange={(ev) => {
            onUpload(ev)
            previewPhoto(ev)
          }}
        />
      </div>
    </div>
  )
}

export default PhotoUpload
