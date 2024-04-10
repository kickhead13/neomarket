use firebase_rs::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
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
        User {
            id: "2".to_string(),
            username: "nobody".to_string(),
            email: "neomarketapp@gmail.com".to_string(),
            avg_rating: "5".to_string(),
            city: "".to_string(),
            country: "".to_string(),
            password: "test".to_string(),
            phone_num: "".to_string(),
            region: "".to_string(),
            profile_pic: "".to_string(),
            account_type: "admin".to_string()
        }
    }
}