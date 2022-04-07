import styled from 'styled-components'
import React from 'react';
import axios from 'axios';

const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
min-height: 19.5em;
font-size: 1.1em;
padding-bottom: 0;
button{
  cursor: pointer;
}
`
const ButtonB = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
color: white;
h2{
  position: absolute;
  bottom: 130px;
  left: 418px;
  -webkit-text-stroke-width: 0.4px;
  -webkit-text-stroke-color: #000;
  font-size: 1.4em;
}
h2:hover{
  font-weight: bold;
  font-size: 1.40441em;
  cursor: pointer;
}
`

const UsuariosContainer = styled.div`
display: flex;
background-color: #d9d6d6;
box-shadow: 2px 2px 8px black;
margin-top: 30px;
padding-right: 10px;
min-width: 50%;
min-height: 75%;
justify-content: space-around;
border-radius: 20px;
ol{
  cursor: pointer;
}
span:hover{
  border: 1px solid #1c001c;
}
`

class Cadastros extends React.Component {
    render(){
    return (
      <MainContainer>
        <UsuariosContainer>
            <ol>{this.props.componentsUser}</ol>
            
        </UsuariosContainer>
        <ButtonB>  
          <h2 onClick={this.props.onClickReturn}>{"<"}- Página inicial</h2>
        </ButtonB>  
      </MainContainer>
    );}
  }
  
  export default Cadastros;