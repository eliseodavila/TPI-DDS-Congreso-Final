import axios from 'axios'

const API_URL = "http://localhost:3000/congreso";

async function getCongreso() {
    try{
        return await axios.get(API_URL).then((response) => {
            return response.data; });
    }
    catch (error) {
        throw error;
    }
}

async function eliminarCongreso(id) {
    try{
        let newUrl = API_URL + "/e/" + id;
        return await axios.put(newUrl).then((response) => {
          return response.data;
        });
    }catch (error) {
        throw error;
    }
   
  }



  async function actualizarCongreso(id, data) {
    let newUrl = API_URL + "/" + id;
    try{
        return await axios.put(newUrl, data).then((response) => {
            return response.data;
        });
    }catch (error) {
        throw error;
    }
  }

  async function crearCongreso(data) {
    try{
        return await axios.post(API_URL, data).then((response) => {
        return response.data;
      });
    }catch (error) {
        throw error;
    }
    
  }


export default {getCongreso, eliminarCongreso, actualizarCongreso, crearCongreso}