import axios from "axios"
export default class Service{
    getSpecies(){
        return axios.get("http://localhost:8080/api/species/all")
    }
}