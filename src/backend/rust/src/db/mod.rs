#![allow(unused_variables)]
#![allow(dead_code)]
use serde::{Deserialize, Serialize};
pub mod users;

#[allow(dead_code)]
const USERS_COLLECTION_NAME: &str= "users";

#[derive(Deserialize, Serialize, Debug)]
struct Response {
    pub name: String
}
 
#[allow(dead_code)]
pub async fn insert_user(
    user: users::User,
    db: firebase_rs::Firebase
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> { 
    
    let set = db.at(USERS_COLLECTION_NAME).set(&user).await;
    Ok(())

}

