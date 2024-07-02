import axios from 'axios'

const API_URL = "http://localhost:3000/orador";

async function getOrador() {
    try{
        return await axios.get(API_URL).then((response) => {
            return response.data; });
    }
    catch (error) {
        throw error;
    }
}

async function eliminarOrador(id) {
    try{
        let newUrl = API_URL + "/e/" + id;
        return await axios.put(newUrl).then((response) => {
          return response.data;
        });
    }catch (error) {
        throw error;
    }
   
  }



  async function actualizarOrador(id, data) {
    let newUrl = API_URL + "/" + id;
    try{
        return await axios.put(newUrl, data).then((response) => {
            return response.data;
        });
    }catch (error) {
        throw error;
    }
  }

  async function crearOrador(data) {
    try{
        return await axios.post(API_URL, data).then((response) => {
        return response.data;
      });
    }catch (error) {
        throw error;
    }
    
  }


export default {getOrador, eliminarOrador, actualizarOrador, crearOrador}