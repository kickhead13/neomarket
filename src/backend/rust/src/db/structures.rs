use serde::{Deserialize, Serialize};

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

#[derive(Serialize, Deserialize, Debug)]
pub struct Message {
    pub owners: String,
    pub time: String,
    pub message_body: String
}

impl Message {
    pub fn new(
        username1: &str,
        username2: &str,
        time: &str,
        message: &str
    ) -> Self {
        let mut owner_vec = Vec::new();
        owner_vec.push(username1);
        owner_vec.push(username2);
        owner_vec.sort();
        let oowners = format!("{}{}", owner_vec[0], owner_vec[1]);
        Self {
            owners: oowners,
            time: time.to_string(),
            message_body: message.to_string()
        }
    }
}