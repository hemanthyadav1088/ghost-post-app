import {useState} from "react";

import "./SecretForm.css";
import axios from "axios";

const SecretForm = ({ onNewSecret })=>{
    const[text, setText] = useState("");
    const [categeory, setCategeory] =  useState("random");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!text) return;
        try{
            const response = await axios.post('/api/secrets',{text, categeory});
            onNewSecret(response.data);
            setText("");

        }
        catch(err){
            console.log("Error posting secret",err)

        }
    };
    return(
        <form className="secret-form" onSubmit={handleSubmit}>
            <textarea
                placeholder="what's your secret"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                rows='3'
            
            ></textarea>
            <div className="form-footer">
                <select value={categeory} onChange={(e)=>setCategeory(e.target.value)}>
                    <option value="random">Random</option>
                    <option value="confession">confession</option>
                    <option value="work">work</option>
                    <option value="relationship">relationship</option>
                </select>
                <button type="submit">Post Secret</button>
            </div>
        </form>
    )
};
export default SecretForm;