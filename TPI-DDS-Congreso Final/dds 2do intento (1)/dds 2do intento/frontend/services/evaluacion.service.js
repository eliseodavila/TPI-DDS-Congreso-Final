import axios from 'axios'

const API_URL = "http://localhost:3000/evaluacion";

async function getEvaluaciones() {
    try{
        return await axios.get(API_URL).then((response) => {
            return response.data; });
    }
    catch (error) {
        throw error;
    }
    
}

async function crearEvaluacion(data) {
    try{
        return await axios.post(API_URL, data).then((response) => {
        return response.data;
      });
    }catch (error) {
        throw error;
    }
    
  }


  async function actualizarEvaluacion(id, data) {
    let newUrl = API_URL + "/" + id;
    try{
        return await axios.put(newUrl, data).then((response) => {
            return response.data;
        });
    }catch (error) {
        throw error;
    }
  }
  async function eliminarEvaluacion(id) {
    try{
        let newUrl = API_URL + "/" + id;
        return await axios.delete(newUrl).then((response) => {
          return response.data;
        });
    }catch (error) {
        throw error;
    }
   
  }
  
export default {getEvaluaciones, crearEvaluacion, actualizarEvaluacion, eliminarEvaluacion}