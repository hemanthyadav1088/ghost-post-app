import { useEffect,useState } from "react";
import {formatDistanceToNow} from "date-fns";
import SecretForm from "./components/secretForm.js";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || 'htpp://localhost:5000';

function App(){
  const [secrets, setSecrets]= useState([]);
  useEffect(()=>{
    const fetchSecrets = async ()=>{
      try{
        const response =await axios.get(`${API_BASE}/api/secrets`);
        setSecrets(response.data);

      }
      catch(err){
        console.log('Error fetching data:',err);
        
      }
      
    };
    fetchSecrets();
  },[]);
  const handleNewSecret =(onNewSecret)=>{
    setSecrets([onNewSecret, ...secrets]);
  }
  const handleLike = async (id)=>{
    try{
      const response = await axios.put(`${API_BASE}/api/secrets/${id}/like`);
      const updatedSecret = response.data;
      setSecrets((prevSecrets) =>
        prevSecrets.map((secret)=>
          secret._id === id ? updatedSecret:secret,
      ),
    );
    }
    catch(err){
      console.log(err)
    }
  }
  return(
    <div className="container">
      <header>
        <h1>👻Ghost Post</h1>
        <p>Share your feelings anonymously</p>
      </header>
      <SecretForm onNewSecret={handleNewSecret} />
      <div className="secrets-feed">
        {secrets.length === 0 ?(
          <p style={{textAlign:'center',color:'#94c3b8'}}>
            No secrets Yet...
          </p>
        ):(
          secrets.map((secret)=>(
          <div key={secret._id} className="secret-card">
            <div className="card-header">
            <span className="categeory-tag">{secret.categeory}</span>
            <span className="timestamp">
              {formatDistanceToNow(new Date(secret.createdAt),{
                addSuffix:true,
              })}
            </span>

            </div>
            <p className="secret-text">{secret.text}</p>
            <button className="like-btn" onClick={()=>handleLike(secret._id)}>❤️{secret.likes}Likes</button>
          </div>
          ))
        )}
      </div>
    </div>
  )

}
export default App;
