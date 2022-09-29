import React from 'react'
import { ReactComponent as DeleteIcon } from 'asset/svg/delete.svg'
import { ReactComponent as EditIcon } from 'asset/svg/Edit.svg'
import { Container, IconWrapper, SharesWrapper, Top } from './styled'
import { SpinningCircles } from 'react-loading-icons'

const LaunchSummaryCard = ({
  number,
  name,
  shares,
  sharesPercentage,
  email,
  phone,
  editAction,
  deleteAction,
  director_role,
  stake,
  occupation,
  isLoading,
  icon,
}) => {
  return (
    <Container>
      <Top>
        <p>{`${number}. ${name}`}</p>
        <SharesWrapper shares={shares}>
          {shares && <div>{`${shares} - ${sharesPercentage}%`}</div>}
          {director_role && <div>{`Role - ${director_role}`}</div>}
          {stake && <div>{`Occupation: ${occupation} - Stake: ${stake}%`}</div>}
          {!icon && (
            <IconWrapper>
              <EditIcon onClick={editAction} />
              {isLoading ? (
                <SpinningCircles
                  stroke="#00A2D4"
                  fill="#00A2D4"
                  width={25}
                  height={25}
                />
              ) : (
                <DeleteIcon onClick={deleteAction} />
              )}
            </IconWrapper>
          )}
        </SharesWrapper>
      </Top>
      <div>{email}</div>
      <div>{phone}</div>
    </Container>
  )
}

export default LaunchSummaryCard
