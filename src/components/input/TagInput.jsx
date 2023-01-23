import React, { useEffect, useState } from 'react'
import { MdClear } from 'react-icons/md'
import {
  TagLabel,
  AllWrapper,
  TagWrapper,
  TagInputWrapper,
  TagItem,
  TagText,
  Tagclose,
  TagInputField,
  BottomText,
  TagTop,
} from './styled.js'

const TagInput = ({
  label = 'Business Name',
  bottomText = 'Please provide sidebrief with 4 names you want for your business, in order of preferences',
  getSelectedValues,
  initialValues,
}) => {
  const [tags, setTags] = useState([])
  const [error, setError] = useState('')
  const [currentInput, setCurrentInput] = useState('')
  const [inputValue, setInputValue] = useState('')
  let resultToReturn = false

  function handlekeydown(e) {
    if (e.key === 'Tab') e.preventDefault()

    if (!(e.key === 'Enter' || e.key === 'Tab')) return

    const value = currentInput
    if (!value.trim()) return

    if (tags.length >= 4) {
      setError('You cannot choose more than 4 business names')
      return
    }

    if (value.length <= 2) {
      setError('Business name must be at least 3 characters')
      return
    }

    for (let i = 0; i < tags.length; i++) {
      if (value.toLowerCase().trim() === tags[i].toLowerCase()) {
        resultToReturn = true
      }
    }
    if (resultToReturn) {
      setError('Please input unique business names')
      return
    }
    setTags([...tags, value.trim()])

    setCurrentInput('')
  }

  const handleChange = (e) => {
    const value = e.target.value
    const noTrailingComma = value.slice(-1) === ',' ? value.slice(0, -1) : value
    setCurrentInput(noTrailingComma)
    setInputValue(value.trim())
  }
  useEffect(() => {
    let lastChar = inputValue.charAt(inputValue.length - 1)
    if (lastChar === ',') {
      let value = currentInput
      // console.log('femi')
      for (let i = 0; i < tags.length; i++) {
        if (value.toLowerCase().trim() === tags[i].toLowerCase()) {
          resultToReturn = true
        }
      }
      if (resultToReturn) {
        setError('Please input unique business names')
        return
      }
     
      if (tags.length >= 4) {
        setError('You cannot choose more than 4 business names')
        return
      } else if (value.length <= 2) {
        setError('Business name must be at least 3 characters')
        return
      } else {
        setTags([...tags, value.trim()])

        setCurrentInput('')
      }
    }
  }, [inputValue.length])

  function removeTags(index) {
    setTags(tags.filter((el, i) => i !== index))
    setError('')
  }

  // Return the tags array
  useEffect(() => {
    if (getSelectedValues) getSelectedValues(tags)
  }, [tags])

  // This sets the values of the tags when the component mounts
  useEffect(() => {
    setTags([...initialValues])
  }, [initialValues.length])

  return (
    <>
      <AllWrapper>
        <TagTop>
          <TagLabel> {label} </TagLabel>
          <span>{error}</span>
        </TagTop>

        <TagWrapper>
          {tags.map((tag, index) => (
            <TagItem key={index}>
              <TagText>{tag}</TagText>
              <MdClear size={20} onClick={() => removeTags(index)} />
            </TagItem>
          ))}
        </TagWrapper>

        <TagInputWrapper>
          <TagInputField
            type="text"
            placeholder="Type your Business name "
            onKeyDown={handlekeydown}
            value={currentInput}
            onChange={handleChange}
          />
        </TagInputWrapper>
        <BottomText>{bottomText}</BottomText>
      </AllWrapper>
    </>
  )
}

export default TagInput
