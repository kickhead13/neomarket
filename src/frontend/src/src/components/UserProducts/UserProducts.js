import React from 'react'
import UserProduct from './UserProduct';
import { useState, useEffect } from "react";
import "./UserProduct.css"
import img from "../Assert/img.jpeg"

const UserProducts = () => {
    const getComments = async () => {
        return [
          {
            id: "1",
            body: "Laptop negru si fain",
            product: "Laptop",
            image: img,
            parentId: null,
           
          },
          {
            id: "2",
            body: "Albastre mari",
            product: "Casti",
            image: img,
            parentId: null,
            
          },
          {
            id: "1",
            body: "Functional",
            product: "Monitor",
            image: img,
            parentId: null,
           
          },
          {
            id: "2",
            body: "Violet",
            product: "Bicicleta",
            image: img,
            parentId: null,
           
          },
        ];
      };
    
      const [backendComments, setBackendComments] = useState([]);
      useEffect(() => {
        getComments().then((data) => {
          setBackendComments(data);
        });
      }, []);
    
      const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null
      );
    
    
        return (
          <>
            <div className="comments">
              <h3 className="comments-title">Products</h3>
              {rootComments.map((rootComments) => (
             <UserProduct
             key={rootComments.id}
             comment={rootComments}
             />
            ))}
            </div>
           
            </>
          )
}

export default UserProducts