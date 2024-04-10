#![allow(unused_variables)]
#![allow(dead_code)]
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

pub mod structures;
pub mod utils;

#[allow(dead_code)]
const USERS_COLLECTION_NAME: &str= "users";

#[derive(Deserialize, Serialize, Debug)]
struct Response {
    pub name: String
}
 
#[allow(dead_code)]
pub async fn insert_user(
    user: structures::User,
    db: firebase_rs::Firebase
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> { 
    
    let resp = db.at(USERS_COLLECTION_NAME)
            .at(&user.username)
            .set(&user)
            .await;
    Ok(())

}

#[allow(dead_code)]
pub async fn delete_user_by_username(
    username: &str,
    db: firebase_rs::Firebase
) ->  Result<(), Box<dyn std::error::Error + Send + Sync>> {

    let _ = db.at(USERS_COLLECTION_NAME)
      .at(username)
      .delete()
      .await;
    Ok(())
    
}

pub async fn get_user_by_username(
    username: &str,
    db: firebase_rs::Firebase
) -> Vec<structures::User> {

    let user_with_random_string = db.at(USERS_COLLECTION_NAME)
      .at(username)
      .get::<HashMap<String, structures::User>>()
      .await;

    return match user_with_random_string { 
        Ok(hashmap) => utils::get_user_from_hashmap(&hashmap),
        Err(error) => Vec::<structures::User>::new()
    }

}

