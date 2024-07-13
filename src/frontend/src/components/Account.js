import React, { useState, useRef }from 'react'
import "./styles/Accountstyles.css"
import Footer from "./Footer"
import NavBar from "./Header.js"
import { useNavigate, useSearchParams } from 'react-router-dom';
import getCookie from "./Cookies/Cookies.js"
import missimg from "./Assert/null.jpg"

const Account = () => {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(null);
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("ansfsudusajf");
    reader.onloadend = () => {
      // use a regex to remove data url part
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");

      // log to console
      // logs wL2dvYWwgbW9yZ...
      console.log(base64String);
    };
    reader.readAsDataURL(file);

    /*reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            //console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };*/
    if(image) {
      //console.log(URL.createObjectURL(image));
      //console.log(image);
    }
  };

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers();
    const token = "adhgsdaksdhk938742937423";
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        //console.log(JSON.parse(result));
        const profileurl = JSON.parse(result);
        setImage(profileurl.img_url);
      })
      .catch((error) => console.log("error", error));
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChatButtonClick = (other, user) => {
    navigate('/chat?user='+user+'&other='+other); // Navigate to the "/chat" route
  };

  let [sp, setSp] = useSearchParams();
  let wuser = sp.get('user');
  let puser = sp.get('profile');
  
  async function tryNewPic() {
    console.log('damn');
        let host = window.location.hostname;
		const formData = new FormData();
        formData.append("file", upload);
        let url = "https://" + host + ":8991/prof?name=" + puser;
		var compareTo;
		if(upload != null){
        await fetch(url,{
			method: "POST",
			body: formData
		}).catch(function(err){compareTo="fail";console.log(err);return false;});
		
		let url2 = "https://" + host + ":8443/api/change_user_pic?username=" + puser + "&pic=" + puser;
		const resp = await fetch(url2).catch(function(err){compareTo="fail";console.log(err);return false;});
        if(!resp){
            return false;
        }
        const data= await resp.json().catch(function(err){compareTo="fail";console.log(err);return false;});
        if(!data){
            return false;
        }
        console.log(data);
        compareTo = data['confirm'];
        return (compareTo === "ok");
		}
        return false;
  }
  const newPic = (e) => {
    let check = tryNewPic();
    check.then( val => {
      if(val===true){
              console.log("W");
      }
      else{
				console.log("L");
      }
    }).catch(err=>console.log(err));
  }
  
  const images = require.context("../../pfp", true);
  let def = missimg;
  getCookie('user');
  try {
    console.log(getCookie('user'));
    def = images("./" + puser + ".jpg");
    console.log(def);
  } catch(error) {
  }
  console.log(def);

  const urll = (immage) => {

    /*const reader = new FileReader();
    console.log(URL.createObjectURL(immage));
    reader.readAsDataURL(immage).then(data => console.log(data));
    return URL.createObjectURL(immage);
    */
  }
  return (
   <>
    <NavBar/>
   <div className='parent-container'>
      <div className="box-decoration">
        
         {
            <img src={def} alt = "nah" className="img-display-before" style={{width: "300px", height: "300px"}}/>
          }
              </div>
     <div className='elements-container'>
      <p>{puser}</p>
      <button onClick={() => handleChatButtonClick(puser, wuser)}> Chat</button>
      {
          getCookie('user') === puser ? <span><button style={{marginTop: "10px"}} onClick={newPic}>Change Image</button><input type="file" id="poze" name="poze" onChange={(ev) => setUpload(ev.target.files[0])} name="poze" /></span>: <p></p>
      }

     </div>
     </div>
     <Footer />
    </>
  );
}
export default Account
