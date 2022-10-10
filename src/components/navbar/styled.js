import { motion } from 'framer-motion'
import styled from 'styled-components'

export const NavWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 15px clamp(20px, 5vw, 40px);
  border-bottom: ${(prop) => prop.border};
  background-color: white;
  z-index: 4;
  box-shadow: ${(props) =>
    props.boxshadow === 'true' ? '0px 10px 15px -5px #9596971a' : ''};
`

export const Image = styled.img`
  max-width: 134px;
  width: 100%;
  min-width: 84px;
`
export const BellIcon = styled.img`
  width: 20px;
  height: 20px;
`
export const UserIcon = styled.img`
  width: 20px;
  height: 20px;
`
export const DownIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`
export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`
export const SearchBar = styled.input`
  background: transparent;
  outline: none;
  width: 90%;
  border: none;
  margin-left: 15px;
`
export const SearchIconWrapper = styled.div`
  width: 5%;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
`

export const SearchBarWrapper = styled.div`
  max-width: 563px;
  width: 100%;
  border: 1px solid #edf1f7;
  border-radius: 20px;
  background: #fafafa;
  display: flex;
  padding: 10px 16px;
`
export const RightIcons = styled.div`
  display: flex;
  align-items: center;
`
export const BellContainer = styled.div`
  border: 1px solid #edf1f7;
  border-radius: 8px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
`

export const UserContainer = styled.div`
  background: #f1f1f1;
  border-radius: 20px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  margin-left: 24px;
`
export const NotificationWrapper = styled.div`
  width: 32%;
  position: fixed;
  right: 24px;
  z-index: 10;
  box-shadow: -4px 10px 10px 5px rgba(149, 150, 151, 0.08);
  border-radius: 10px;
  top: 72px;
  background-color: white;
`

export const NotificationHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #151717;
  }

  p {
    color: #4e5152;
    font-size: 12px;
  }
`

export const NotificationMessages = styled.div``

export const Message = styled.div`
  padding: 16px;
  border-top: solid 1px #edf1f6;

  :hover {
    background-color: rgba(0, 162, 212, 0.1);
    cursor: pointer;
  }

  h6 {
    color: #151717;
    font-size: 14px;
    line-height: 24px;
    font-weight: 500;
  }
  span {
    color: #00a2d4;
    font-size: 14px;
  }

  p {
    color: #959697;
    font-size: 12px;
  }
`

export const NoMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 150px 24px;
  p {
    font-size: 16px;
    line-height: 24px;
    color: #151717;
    text-align: center;
  }
`

export const NotificationBadge = styled.div`
  border-radius: 100%;
  background-color: #00a2d4;
  padding: 2px 5px 0px 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  bottom: 40px;
  right: 115px;
  color: white;
  p {
    font-size: 12px;
    font-weight: bold;
  }
`
