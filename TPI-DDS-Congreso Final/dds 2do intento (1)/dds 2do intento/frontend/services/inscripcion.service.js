import axios from 'axios'

const API_URL = "http://localhost:3000/inscripcion";

async function getInscripciones() {
    try{
        return await axios.get(API_URL).then((response) => {
            return response.data; });
    }
    catch (error) {
        throw error;
    }
    
}

async function crearInscripciones(data) {
    try{
        return await axios.post(API_URL, data).then((response) => {
        return response.data;
      });
    }catch (error) {
        throw error;
    }
    
  }


  async function actualizarInscripciones(id, data) {
    let newUrl = API_URL + "/" + id;
    try{
        return await axios.put(newUrl, data).then((response) => {
            return response.data;
        });
    }catch (error) {
        throw error;
    }
  }
  async function eliminarInscripciones(id) {
    try{
        let newUrl = API_URL + "/" + id;
        return await axios.delete(newUrl).then((response) => {
          return response.data;
        });
    }catch (error) {
        throw error;
    }
   
  }


  async function getByFilters(filter){
    let newUrl = API_URL + "/participante/" + filter;
    try{
        return await axios.get(newUrl).then((response) => {
            return response.data; });
    }
    catch (error) {
        throw error;
    }
}
  
export default {getInscripciones, crearInscripciones, actualizarInscripciones, eliminarInscripciones, getByFilters}