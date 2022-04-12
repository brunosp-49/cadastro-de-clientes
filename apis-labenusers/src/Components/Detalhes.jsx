import styled from 'styled-components'
import React from 'react';
import ReactTooltip from 'react-tooltip';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css'; 
import toast, { Toaster } from 'react-hot-toast';

const MainContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
max-height: 17%;
min-height: 19%;
padding-bottom: 0;
`
const UsuariosContainer = styled.div`
display: flex;
background-color: #d9d6d6;
box-shadow: 2px 2px 8px black;
min-width: 50%;
min-height: 20%;
max-height:40vh ;
justify-content: center;
align-items: center;
border-radius: 20px;
padding-top: 1em;
margin: 1.6em;
padding-bottom: 0;
`
const Divespecial = styled.li`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
height: 100%;
text-align: center;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
font-weight: bolder;
color: #1c001c;
button{
max-height: 8em;
min-height: 3em;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
font-size: 1em;
margin-top: 1em;
margin-bottom: 1em;
cursor: pointer;
border-radius: 5px;
border: 1px solid darkgray;
}

button:hover{
    background-color: #d29ebc;
}
div{
    min-width: 100%;
    margin-bottom: 1.7vw;
    padding-bottom:0;
}
h2{
    padding-bottom: 0;
    margin-bottom: 2%;
    margin-left: 2%;
    font-size: 1.75vw;
    border: 2px solid #d9d6d6;
}
h2:hover{
  font-weight: bold;
  cursor: pointer;
  border: 2px solid #1c001c;
  border-radius: 1em;
}
`
const ButtonDel = styled.div`
button:hover{
    background-color: #e47c7c;
}
`

class Detalhes extends React.Component {
    render(){
    return (
      <MainContainer>
          <Toaster />
          <UsuariosContainer>
            <Divespecial>
                <div>Nome: {this.props.userDetail.name}</div>
                <div>Email: {this.props.userDetail.email}</div>
                <ButtonDel>
                    <button onClick={this.props.onClickDelete} >Deletar</button>
                </ButtonDel>    
                <h2 onClick={this.props.onClickReturnUsers}>{"<"}- Voltar</h2>
            </Divespecial>
          </UsuariosContainer>
      </MainContainer>
    );}
  }
  
  export default Detalhes;