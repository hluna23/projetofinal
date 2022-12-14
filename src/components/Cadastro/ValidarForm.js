/*import { useState } from "react";
import userEvent from "@testing-library/user-event";

export default function ValidarEmail(){

const [user, setUser] = useState({
    email: '',
});

const [status, setStatus] = useState({
    type:'',
    mensagem:''
})

const valueInput = (e) => setUser({...user,[e.target.email]: e.target.value});


const addUser = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  const saveDataForm = true;

  if (saveDataForm) {
    setStatus({
      type: "success",
      mensagem: " usuario cadastrado com sucesso!",
    });
    setUser ({
      email: "",
    });
  } else {
    setStatus({
      type: "error",
      mensagem: "Erro: usuario no cadastrado!!!",
    });
  }
};

function validate(){
    if(!user.email) return setStatus({type:'error', mensagem:'Erro, e necessario preencher o campo'})
}

return (
    <div>
        {status.type === 'sucess' ? <p style={{ color:'green'}}>{status.mensagem}</p>: ''}
        {status.type === 'erro' ? <p style={{ color:'red'}}>{status.mensagem}</p>: ''}

    </div>
)

function validate() {
  if (!userEvent.email)
    return setStatus({
      type: "error",
      mensagem: "Erro, necessario preencher o campo e-mail",
    });

  return true;
}
}
document.querySelector('#email').addEventListener('input', ValidarEmail)*/
