import React from 'react'
import styled from 'styled-components'
import DropdownList from 'react-widgets/DropdownList'
import 'react-widgets/styles.css'
import { DropdownArrow } from 'asset/svg'
import { BottomText, ErrMsg } from './styled'

const DropDownWithSearch = ({
  name, // name, neccessary for React-hook-form
  title,
  list,
  renderer, // renderer is a React Component that describes how the item should be rendered
  selectAction,
  filterBy,
  bottomText,
  allowCreate,
  onCreate, // only used when object creation is allowed
  value, // only used when object creation is allowed
  setValue, // only used when object creation is allowed
  errorMessage,
  register,
  draft,
}) => {
  return (
    <Container>
      <Top>
        <Title>{title}</Title>
        {errorMessage ? <ErrMsg>{errorMessage}</ErrMsg> : null}
      </Top>
      {register ? (
        <DropdownList
          style={{ color: '#00A2D4', fontSize: '14px' }}
          containerClassName={'input'}
          textField={filterBy ? filterBy : 'text'}
          selectIcon={<DropdownArrow />}
          name={name}
          data={list}
          dataKey="id"
          placeholder="--"
          renderValue={renderer}
          renderListItem={renderer}
          onSelect={selectAction}
          allowCreate={allowCreate}
          onCreate={onCreate}
          value={value}
          onChange={setValue}
          defaultValue={draft}
          defaultSearchTerm={draft}
          {...register(name)}
        />
      ) : (
        <DropdownList
          style={{ color: '#00A2D4', fontSize: '14px' }}
          containerClassName={'input'}
          textField={filterBy ? filterBy : 'text'}
          selectIcon={<DropdownArrow />}
          name={name}
          data={list}
          dataKey="id"
          placeholder="--"
          renderValue={renderer}
          renderListItem={renderer}
          onSelect={selectAction}
          allowCreate={allowCreate}
          onCreate={onCreate}
          value={value}
          onChange={setValue}
          defaultValue={draft}
          defaultSearchTerm={draft}
        />
      )}
      {bottomText ? <BottomText>{bottomText}</BottomText> : null}
    </Container>
  )
}

export default DropDownWithSearch

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;

  .rw-list-option {
    padding-block: 14px;
  }

  .rw-list {
    // I think the scrollbar can be edited from here, also there is a listComponent prop, when passed will replace rw-list
  }

  .input {
    height: 48px;
    padding-inline: 12px;
    border-radius: 8px;
  }
`

const Top = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.span`
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  color: #4e5152;
  font-family: 'BR Firma';
  font-weight: 500;
  line-height: 21px;
`
