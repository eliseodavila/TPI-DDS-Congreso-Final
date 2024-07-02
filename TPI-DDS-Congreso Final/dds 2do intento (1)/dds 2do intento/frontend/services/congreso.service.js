import axios from 'axios'

const API_URL = "http://localhost:3000/congreso";

async function getCongresos() {
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



export default {getCongresos, eliminarCongreso}