import './App.css';
import React from 'react';
import styled from 'styled-components';
import TelaInicial from './Components/TelaInicial';
import Cadastros from './Components/Cadastros';
import axios from 'axios';
import Detalhes from './Components/Detalhes';
import ReactTooltip from 'react-tooltip'

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
      alert("Usuário adicionado com sucesso")
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
      alert("Erro ao criar o usuário");
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
      alert("Usuario deletado com sucesso")
      //Deixar o texto do input com um valor vazio
    })
    .catch((err) => {
      //Alertar caso um erro aconteça
      alert("Erro ao deletar o usuário");
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
      alert(err.data);
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

onClickPost = () => {
  if(this.state.inputEmail.length > 0 && this.state.inputNome.length > 0){
    let confirm = window.confirm("Tem certeza?")
    if (confirm == true){
      this.postUser()
      this.setState({tela: "cadastros"})
    }else{
      alert("Cadastro cancelado com sucesso")
    }
  } else{
    alert("Complete os dados corretamente")
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
        />
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
