import styled from 'styled-components';

export const PrimaryText = styled.h3({
    color: '#151717',
    fontSize: 28,
    fontWeight: 700,
    marginTop: 24,
});

export const SecondaryText = styled.p(({
    color, 
    marginTop, 
    fontSize, 
    marginRight,
    cursor
    }) =>({
    color: color,
    fontSize: fontSize,
    fontWeight: 400,
    marginTop: marginTop,
    marginRight: marginRight,
    cursor: cursor,
}));
