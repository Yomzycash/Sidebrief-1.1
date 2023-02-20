import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 16px;
gap: 24px;

width: 261px;
height: 58px;

/* Blue 3 */

border: 1px solid #00C3FF;
box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1), 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
border-radius: 10px;`

export const InnerContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 181px;
height: 42px;`

export const FileContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 4px;
width: 149px;
height: 42px;
`