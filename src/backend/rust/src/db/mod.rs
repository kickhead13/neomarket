#![allow(unused_variables)]
#![allow(dead_code)]
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

pub mod structures;
pub mod utils;

#[allow(dead_code)]
pub const USERS_COLLECTION_NAME: &str = "users";
pub const MESSAGE_COLLECTION_NAME: &str = "messages";
pub const PROD_COLLECTION_NAME: &str = "products";
pub const COMM_COLLECTION_NAME: &str = "comments";

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
    println!("inserted user {:?}: {:?}", user, resp);
    Ok(())

}

#[allow(dead_code)]
pub async fn delete_user_by_username(
    username: &str,
    db: firebase_rs::Firebase
) ->  Result<(), Box<dyn std::error::Error + Send + Sync>> {

    let resp = db.at(USERS_COLLECTION_NAME)
      .at(username)
      .delete()
      .await;
    println!("deleted user {}: {:?}", username, resp);
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

    match user_with_random_string { 
        Ok(hashmap) => utils::get_user_from_hashmap(&hashmap),
        Err(error) => Vec::<structures::User>::new()
    }

}

#[allow(dead_code)]
pub async fn change_user_pic(
    username: &str,
    pic: &str,
    db1: firebase_rs::Firebase,
    db2: firebase_rs::Firebase,
    db3: firebase_rs::Firebase
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {

    let mut user = get_user_by_username(username, db1).await;
    let _ = delete_user_by_username(username, db2).await;
    user[0].profile_pic = pic.to_string();
    println!("db/change_pic: {:?}", user[0].clone());
    let _ = insert_user(user[0].clone(), db3).await;
    Ok(())

}

pub async fn send_message(
    message: structures::Message,
    db: firebase_rs::Firebase
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {


    println!("{:?}", &format!(
        "by{}convo{}at{}",
        &message.sender,
        &message.owners,
        &message.time
    ));

    let resp = db.at(MESSAGE_COLLECTION_NAME)
            .at(&message.owners)
            .set(&message)
            .await;
    println!("{:?}", resp);
    Ok(())
}

pub async fn send_prod(
    prod: structures::Prod,
    db: firebase_rs::Firebase
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {


    println!("{:?}", &format!(
        " {} {} {}",
        &prod.seller,
        &prod.title,
        &prod.id
    ));

    let resp = db.at(PROD_COLLECTION_NAME)
            .at(&prod.category)
            //.at(&prod.id)
            .set(&prod)
            .await;
    println!("{:?}", resp);
    Ok(())
}

pub async fn fetch_messages_from(
    username1: String,
    username2: String,
    tail: u8,
    db: firebase_rs::Firebase
) -> Vec<structures::Message> {

    let owners_tag = utils::get_owners_tag(username1, username2);
    let potential_hash = db.at(MESSAGE_COLLECTION_NAME)
        .at(&owners_tag)
        .get::<HashMap<String,structures::Message>>()
        .await;

    println!("(db) {}", &owners_tag);

    match potential_hash {
        Ok(hashmap) => {
            let mut ret_vec = Vec::<structures::Message>::new();
            for (key, value) in hashmap.into_iter() {
                ret_vec.push(value.clone());
            }
            ret_vec
        },
        Err(error) => Vec::<structures::Message>::new()
    }

}

pub async fn fetch_prods(
    category: String,
    db: firebase_rs::Firebase
) -> Vec<structures::Prod> {

    let potential_hash = db.at(PROD_COLLECTION_NAME)
        .at(&category)
        .get::<HashMap<String,structures::Prod>>()
        .await;

    println!("(db) {}", &category);

    match potential_hash {
        Ok(hashmap) => {
            let mut ret_vec = Vec::<structures::Prod>::new();
            for (key, mut value) in hashmap.into_iter() {
                println!("db:: {:?}", value.clone());
                value.id = format!("{}+{}", value.category.clone(), key);
                ret_vec.push(value.clone());
            }
            ret_vec
        },
        Err(error) => Vec::<structures::Prod>::new()
    }


}

pub async fn fetch_spec_prod(
    category: String,
    code: String,
    db: firebase_rs::Firebase
) -> structures::Prod {

    let potential_prod = db.at(PROD_COLLECTION_NAME)
        .at(&category)
        .at(&code)
        .get::<structures::Prod>()
        .await;

    match potential_prod {
        Ok(prod) => prod,
        Err(_) => structures::Prod::new("".to_string(),
            "".to_string(),
            "".to_string(),
            "".to_string(),
            "".to_string(),   
            "".to_string()
            )
    }

}

pub async fn send_comm(
    prod: structures::Comm,
    db: firebase_rs::Firebase
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {


    println!("{:?}", &format!(
        " {} {} {}",
        &prod.user,
        &prod.body,
        &prod.post
    ));

    let resp = db.at(COMM_COLLECTION_NAME)
            .at(&prod.post)
            .set(&prod)
            .await;
    println!("{:?}", resp);
    Ok(())
}

pub async fn fetch_comms(
    post: String,
    db: firebase_rs::Firebase
) -> Vec<structures::Comm> {

    let potential_hash = db.at(COMM_COLLECTION_NAME)
        .at(&post)
        .get::<HashMap<String,structures::Comm>>()
        .await;

    println!("(db) {}", &post);

    match potential_hash {
        Ok(hashmap) => {
            let mut ret_vec = Vec::<structures::Comm>::new();
            for (key, mut value) in hashmap.into_iter() {
                println!("db:: {:?}", value.clone());
                ret_vec.push(value.clone());
            }
            ret_vec
        },
        Err(error) => Vec::<structures::Comm>::new()
    }


}
