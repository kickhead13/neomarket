use serde::{Deserialize, Serialize};

use crate::db;

#[derive(Serialize, Deserialize, Debug, Clone )]
pub struct User {
    pub id: String,
    pub username: String,
    pub email: String,
    pub avg_rating: String,
    pub city: String,
    pub country: String,
    pub password: String,
    pub phone_num: String,
    pub region: String,
    pub profile_pic: String,
    pub account_type: String
}

impl User {
    pub fn new() -> Self {
        Self {
            id: "2".to_string(),
            username: "nobody".to_string(),
            password: "test".to_string(),
            email: "neomarketapp@gmail.com".to_string(),
            avg_rating: "5".to_string(),
            city: "".to_string(),
            country: "".to_string(),
            phone_num: "".to_string(),
            region: "".to_string(),
            profile_pic: "".to_string(),
            account_type: "admin".to_string()
        }
    }

    pub fn new_sign_up_user(
        username_: String,
        password_: String,
        email_: String 
    ) -> Self {

        Self {
            username: username_,
            password: password_,
            email: email_,
            avg_rating: "5".to_string(),
            city: "".to_string(),
            country: "".to_string(),
            phone_num: "".to_string(),
            region: "".to_string(),
            profile_pic: "".to_string(),
            account_type: "user".to_string(),
            id: "2".to_string()
        }

    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Message {
    pub owners: String,
    pub sender: String,
    pub time: String,
    pub message_body: String
}

impl Message {
    pub fn new(
        username1: String,
        username2: String,
        time: String,
        message: String
    ) -> Self {
        Self {
            owners: db::utils::get_owners_tag(username1.clone(), username2.clone()),
            time: time,
            message_body: message,
            sender: username1
        }
    }
}
