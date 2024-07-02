import axios from 'axios'

const API_URL = "http://localhost:3000/participante";

async function getParticipante() {
    try{
        return await axios.get(API_URL).then((response) => {
            return response.data; });
    }
    catch (error) {
        throw error;
    }
}

async function eliminarParticipante(id) {
    try{
        let newUrl = API_URL + "/e/" + id;
        return await axios.put(newUrl).then((response) => {
          return response.data;
        });
    }catch (error) {
        throw error;
    }
   
  }



  async function actualizarParticipante(id, data) {
    let newUrl = API_URL + "/" + id;
    try{
        return await axios.put(newUrl, data).then((response) => {
            return response.data;
        });
    }catch (error) {
        throw error;
    }
  }

  async function crearParticipante(data) {
    try{
        return await axios.post(API_URL, data).then((response) => {
        return response.data;
      });
    }catch (error) {
        throw error;
    }
    
  }


export default {getParticipante, eliminarParticipante, actualizarParticipante, crearParticipante}