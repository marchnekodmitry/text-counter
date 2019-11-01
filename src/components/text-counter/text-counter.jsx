import React, { useState, useRef } from 'react';
import { getPrice, getDateOfCompletion, transformDate } from '../../utils/text-counter'

export const TextCounter = () => {
  const [charactersCount, setCharactersCount] = useState(0)
  const [language, setLanguage] = useState('')
  const [modifier, setModifier] = useState(1)
  const [isFilePicked, setIsFilePicked] = useState(false)

  const textForm = useRef(null)
  const fileRef = useRef(null)

  const sendFile = (e) => {
    const formData = new FormData(textForm.current)

    fetch('https://radiant-depths-07602.herokuapp.com/characters', {
      method: 'POST',
      body: formData
    })
    .then((res) => res.json())
    .then((data) => {
      setCharactersCount(data.length)
      setModifier(data.modifier)
      setIsFilePicked(true)
    })
    .catch((err) => console.error(err))
  }

  const price = getPrice({ count: charactersCount, language, modifier });
  const date = transformDate(getDateOfCompletion(charactersCount, language, modifier))
  const shouldCalculate = charactersCount !== 0 && language.length !== 0

  return (
    <div>
      {
        isFilePicked ?
        null :
        <textarea onChange={e => setCharactersCount(e.target.value.length)}/>
      }
      <form ref={textForm} style={{display: isFilePicked || charactersCount ? 'none' : 'block'}}>
        <input type="file" name="text-file" onChange={sendFile} ref={fileRef}/>
      </form>
      {
        isFilePicked ?
        <button onClick={() => {
          fileRef.current.value = null
          setCharactersCount(0)
          setModifier(1)
          setIsFilePicked(false)
        }}>Try again</button> :
        null
      }
      <p>Цена: { shouldCalculate ? price : 0}</p>
      <p>{ shouldCalculate ? `Срок выполнения: ${date}` : null }</p>
      <fieldset onChange={(e) => setLanguage(e.target.value)}>
        <label>
          <input type="radio" name="language" value="ru"/>
          Русский
        </label>
        <label>
          <input type="radio" name="language" value="ua"/>
          Украинский
        </label>
        <label>
          <input type="radio" name="language" value="en"/>
          Английский
        </label>
      </fieldset>
    </div>
  )
}