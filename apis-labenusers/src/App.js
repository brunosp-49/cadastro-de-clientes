import './App.css';
import React from 'react';
import styled from 'styled-components';
import TelaInicial from './Components/TelaInicial';
import Cadastros from './Components/Cadastros';
import axios from 'axios';
import Detalhes from './Components/Detalhes';
import ReactTooltip from 'react-tooltip'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css'; 
import toast, { Toaster } from 'react-hot-toast';

const headers = {
  headers: {
    Authorization: "bruno-siqueira-shaw"
  }
};

const TelaTotal = styled.div`
display: flex;
height: 99.95vh;
justify-content: center;
align-items: center;
background-color: #d29ebc;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`

const MainContainer = styled.div`
 width: 40vw;
 min-height: 55vh;
 background-image: radial-gradient(circle at 100% 0%, #cb3288 0, #b82d84 25%, #a4287e 50%, #902378 75%, #7e2071 100%);
 border-radius: 20px;
 box-shadow: 10px 5px 5px black;
`
const Liespecial = styled.span`
display: flex;
width: 6em;
justify-content: space-between;
color: #1c001c;
margin: 0.5em;
padding: 0.5em;
div:hover{
  font-weight: bold;
}
`

const ButtonDel = styled.div`
button:hover{
    background-color: #e47c7c;
}
`

const ConfirmContainer = styled.div`
display: flex;
flex-direction: column;
height: 18vh;
width: 25vw;
align-items: center;
justify-content: center;
font-weight: bolder;
`

const ContainerButton = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

const ButtomSim = styled.div`
button{
  height: 2.5em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  width: 7em;
  border: 0.2px solid #afadad;
}
button:hover{
  background-color: #48eb82;
}
`
const ButtomNao = styled.div`
button{
  height: 2.5em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  width: 7em;
  border: 0.2px solid #afadad;
}
button:hover{
  background-color: #ec6e78;
}
`


class App extends React.Component {
  state = {
    tela: "inicial",
    inputEmail: "",
    inputNome: "",
    users: [],
    userDetail: [],
    currentid: ""
}


componentDidMount() {
  this.getAllUser();
  
};


getAllUser() {
  const url =
    "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users";
  axios
    .get(url, headers)
    .then((res) => {
      this.setState({
        users: res.data
      });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

postUser = () => {
  //body é criado com o valor que tem no inputName
  const body = {
    name: this.state.inputNome,
    email: this.state.inputEmail
  };
  //Aqui é onde a função de post é chamada
  //No pot passamos a url, body, e o headers
  axios
    .post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, headers)
    .then((res) => {
      //Pegartodas as Users
      this.getAllUser();
      this.toastfyCadastroS()
      this.setState({tela: "cadastros"})
      //Deixar o texto do input com um valor vazio
      this.setState({
        inputNome: ""
      });
      this.setState({
        inputEmail: ""
      });
    })
    .catch((err) => {
      //Alertar caso um erro aconteça
      toast.error("Erro ao criar o usuário  verefique as informações");
    });
};

DeleteUser = () => {
  //body é criado com o valor que tem no inputName
  //Aqui é onde a função de post é chamada
  //No pot passamos a url, body, e o headers
  axios
    .delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${this.state.currentid}`,headers)
    .then((res) => {
      //Pegartodas as Users
      this.getAllUser();
      this.toastfyDeleted()
      //Deixar o texto do input com um valor vazio
    })
    .catch((err) => {
      //Alertar caso um erro aconteça
      toast.error("Erro ao deletar o usuário");
    });
};

GetUserById = () => {
  //body é criado com o valor que tem no inputName
  //Aqui é onde a função de post é chamada
  //No pot passamos a url, body, e o headers
  axios
    .get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${this.state.currentid}`,headers)
    .then((res) => {
      this.setState({
        userDetail: res.data
      });
    })
    .catch((err) => {
      //Alertar caso um erro aconteça
      toast.error(err.data);
    });
};

onChangeName = (e) => {
  this.setState({
    inputNome: e.target.value
  });
};

onChangeEmail = (e) => {
  this.setState({
    inputEmail: e.target.value
  });
};

toastfyCadastroS = () => {
  toast.success("Cadastro efetuado com sucesso", {
    duration: 1500})
}

toastfyDeleted = () => {
  toast.success("Cadastro excluido com sucesso", {
    duration: 1500})
}

onClickYes = () => {
  this.postUser()
}

onClickNo = () => {
  toast.success("Cadastro cancelado com sucesso")
}

onSecoundPart = () => {
  
}

onClickPost = async() => {
  if(this.state.inputEmail.length > 0 && this.state.inputNome.length > 0){
    toast((t) => (
      <ConfirmContainer>
        <h4>Confirmar cadastro?</h4>
        <ContainerButton>
          <ButtomSim>
            <button onClick={() => {this.onClickYes() ; toast.dismiss(t.id)}}>
              Confirmar
            </button>
          </ButtomSim>
          <ButtomNao> 
            <button onClick={() => {this.onClickNo() ; toast.dismiss(t.id)}}>
              Cancelar
            </button>
          </ButtomNao>
        </ContainerButton>
      </ConfirmContainer>
    ), {
      duration: Infinity});
  } else{
    toast.error("Complete os dados corretamente", {
      duration: 1500})
  }
};

onClickReturn = () => {
  this.setState({tela: "inicial"})
};

onClickReturnUsers = () => {
  this.setState({tela: "cadastros"})
};

onMouseEnterId = (id) => {
  this.setState({currentid: id})
  this.GetUserById()
}

onClickDelete = () => {
  this.DeleteUser()
  if(this.state.tela === "detalhes"){
    this.setState({tela: "cadastros"})
  }
};

onClickCadastrados = () => {
  this.setState({tela: "cadastros"})
}

onClickDetail = () => {
  this.GetUserById()
  this.setState({tela: "detalhes"})
};


  render(){
    const componentsUser = this.state.users.map((user) => {
      return [<Liespecial><div key={user.id} data-tip="Clique para ver mais informações" onMouseEnter={() => this.onMouseEnterId(user.id)}  onClick={this.onClickDetail}>{user.name}</div><ButtonDel><button data-tip="Excluir" onMouseEnter={() => this.onMouseEnterId(user.id)} onClick={this.onClickDelete}>X</button></ButtonDel><ReactTooltip place="left" type="light" effect="float"/></Liespecial>];
    });
  return (
    <TelaTotal>
      <MainContainer>
        {(() => {
  
        switch (this.state.tela) {
        case 'inicial':
        return (
        <TelaInicial
        state = {this.state}
        getAllUser = {this.getAllUser}
        postUser = {this.postUser}
        onChangeName = {this.onChangeName}
        onChangeEmail = {this.onChangeEmail}
        onClickPost = {this.onClickPost}
        onClickCadastrados = {this.onClickCadastrados}
        handleClick = {this.handleClick}
        >
        </TelaInicial>
        )
        case 'cadastros':
        return (
        <Cadastros
        componentsUser = {componentsUser}
        state = {this.state}
        getAllUser = {this.getAllUser}
        postUser = {this.postUser}
        onClickReturn = {this.onClickReturn}
        onClickDelete = {this.onClickDelete}
        />
        )
        case 'detalhes':
          return(
            <Detalhes
            userDetail = {this.state.userDetail}
            onClickDelete = {this.onClickDelete}
            onClickReturnUsers = {this.onClickReturnUsers}
            />
          )
        default:
        return (
        <div>You are a User.</div>
        )
        }

        })()}
      </MainContainer>
    </TelaTotal>
  );}
}

export default App;
