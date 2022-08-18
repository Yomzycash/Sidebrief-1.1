import styled from 'styled-components';

export const InputWrapper = styled.div((borderColor) => ({
    border: '1px solid black',
    alignItems: 'center',
    display: 'flex',  
    flexDirection: 'row',
    borderColor: '#ECECEC',
    borderRadius: 10,
    padding: '8px 24px',
    marginTop: 20,
}))

export const Wrapper = styled.div({
    marginBottom: 20,
});
    
export const Input = styled.input({
    fontSize: 15,
    height: 50,
    width: '90%',
    border: 'none',
    background: 'none',
    outline: 'none',

  });

  export const Select = styled.select({
    fontSize: 15,
    height: 50,
    border: 'none',
    background: 'none',
    outline: 'none',
    backgroundColor: 'none',
    padding: '5px 24px',
    width: '100%',
    cursor: 'inherit',

  });

  export const Option = styled.option({
    fontSize: 15,

  });

  export const Label = styled.label({
    color: '#4E5152',
    fontWeight: 400,
    fontSize: 14,
  });

  export const Iconwrapper = styled.div({
    marginRight: 20,
});

export const ErrMsg = styled.div({
    color: 'red',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
});

export const Top = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
});