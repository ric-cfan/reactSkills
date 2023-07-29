import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

//posts

export const createSession = async (login, senha) => {
  console.log("createsession", {login, senha});
  
  return api.post('/login', {login, senha});
};

export const createUser = async (login, senha, confirmaSenha) => {
  try {
    console.log("createuser", {login, senha, confirmaSenha});

    const {data} = await api.post('/api/usuario', {login, senha, confirmaSenha});
    alert("Usuário criado com sucesso!")
    return data;
  }
  catch {
    alert("Erro na criação de usuário, nome de usuário já está em uso!")
  }
};

export const createUserSkill = async (idUser, idSkill, lvl) => {
  const usuario = {
    id: idUser
  }
  const skill = {
    id: idSkill
  }
  console.log("createuserskill", {usuario, skill, lvl});
  const token = localStorage.getItem("token");
  return api.post('/api/usuarioSkill', {usuario, skill, lvl}, { headers: {"Authorization": `${token}`},  "Accept": "application/json"});
};

//gets

export const getSkills = async() => {
  const token = localStorage.getItem("token");
  return api.get('/api/skill', { headers: {"Authorization": `${token}`},  "Accept": "application/json"});
}

export const getUserId = async() => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");
  return api.get(`/api/usuario/${user}`, { headers: {"Authorization": `${token}`},  "Accept": "application/json"});
}

export const getUserSkills = async(idUser) => {
  const token = localStorage.getItem("token");
  return api.get(`/api/usuarioSkill/${idUser}`, { headers: {"Authorization": `${token}`},  "Accept": "application/json"});
}

//put

export const updateUserSkill = async(idUserSkill, lvl) => {
  const token = localStorage.getItem("token");
  return api.put(`/api/usuarioSkill/${idUserSkill}`, {lvl}, { headers: {"Authorization": `${token}`},  "Accept": "application/json"});
}

//delete

export const deleteUserSkill = async(idUserSkill) => {
  const token = localStorage.getItem("token");
  return api.delete(`/api/usuarioSkill/${idUserSkill}`, { headers: {"Authorization": `${token}`},  "Accept": "application/json"});
}