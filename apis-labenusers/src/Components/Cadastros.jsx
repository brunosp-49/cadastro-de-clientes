import styled from 'styled-components'
import React from 'react';
import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css'; 
import toast, { Toaster } from 'react-hot-toast';

const MainContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
width: 100%;
min-height: 55vh;
font-size: 1.1em;
padding-bottom: 0;
button{
  cursor: pointer;
}
`
const ButtonB = styled.div`
display: flex;
width: 100%;
height: 3em;
color: white;
`

const H2h = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
padding-left: 3vh;
padding-bottom: 10vh;
h2{
  -webkit-text-stroke-width: 0.4px;
  -webkit-text-stroke-color: #000;
  font-size: 1.8vw;
  font-weight: bold;
  margin: 0;
  margin-top: 4%;
}
h2:hover{
  font-weight: bold;
  font-size: 1.83vw;
  cursor: pointer;
  border: 2px solid white;
  border-radius: 0.5em;
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
span{
  border: 2px solid #d9d6d6;
}
span:hover{
  border: 2px solid #1c001c;
  border-radius: 0.5em;
  
}
`

class Cadastros extends React.Component {
    render(){
    return (
      <MainContainer>
        <Toaster />
        <UsuariosContainer>
            <ol>{this.props.componentsUser}</ol>
        </UsuariosContainer>
        <ButtonB>  
          <H2h><h2 onClick={this.props.onClickReturn}>Página inicial</h2></H2h>
        </ButtonB>  
      </MainContainer>
    );}
  }
  
  export default Cadastros;