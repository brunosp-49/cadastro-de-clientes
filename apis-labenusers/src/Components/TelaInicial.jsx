import styled from 'styled-components'
import React from 'react';

const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
width: 100%;
height: 100%;
color: white;
h1{
-webkit-text-stroke-width: 0.2px;
-webkit-text-stroke-color: #000;
margin: 0;
padding: 0;
padding-top: 28px;
font-size: 3em;
}

h3{
-webkit-text-stroke-width: 0.2px;
-webkit-text-stroke-color: #000;
font-size: 1.5em;
}

button{
margin-bottom: 0.5em;
height: 2.5em;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
font-size: 1em;
margin-top: 12px;
cursor: pointer;
}

button:hover{
    background-color: #d29ebc;}
`
const InputEmail = styled.input`
width: 16em;
height: 2em;
border-radius: 5px;
margin-bottom: 12px;
`

const InputNome = styled.input`
width: 16em;
height: 2em;
border-radius: 5px;
`
const BottomButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 3em;
h2{
  margin-left: 52%;
  -webkit-text-stroke-width: 0.4px;
  -webkit-text-stroke-color: #000;
}
h2:hover{
  font-weight: bold;
  font-size: 1.522em;
  cursor: pointer;
}
`

class TelaInicial extends React.Component {
    render(){
    return (
      <MainContainer>
          <h1>Bem-vindo</h1>
          <h3>Faça seu cadastro</h3>
          <InputEmail type="email" value={this.props.state.inputEmail} placeholder='Email' onChange={this.props.onChangeEmail}/>
          <InputNome type="text" value={this.props.state.inputNome} placeholder='Nome' onChange={this.props.onChangeName}/>
          <button onClick={() => this.props.onClickPost()}>ENVIAR</button>
          <BottomButton>
            <h2 onClick={this.props.onClickCadastrados}>Ir para cadastrados -{'>'} </h2>
          </BottomButton>
      </MainContainer>
    );}
  }
  
  export default TelaInicial;