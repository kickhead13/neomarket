use serde::{Deserialize, Serialize};
use crate::db;

#[derive(Serialize)]
pub struct FetchResponse {
    pub password: String
}

#[derive(Serialize)]
pub struct ConfirmResponse {
    pub confirm: String
}

#[derive(Serialize)]
pub struct ProdList {
    pub list: Vec<db::structures::Prod>
}

#[derive(Serialize)]
pub struct CommList {
    pub list: Vec<db::structures::Comm>
}

#[derive(Deserialize, Serialize, Debug)]
pub struct FetchProdsCat{
    pub category: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct FetchPostComms{
    pub post: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct FetchSpecProd{
    pub category: String,
    pub code: String
}


#[derive(Deserialize, Serialize, Debug)]
pub struct MessageList {
    pub list: Vec<db::structures::Message>
}

#[derive(Deserialize, Serialize, Debug)]
pub struct TestParamsStruct {
    pub param1: String,
    pub param2: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UserParamsStruct {
    pub username: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UserChangePic {
    pub username: String,
    pub pic: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CheckUserPassword {
    pub username: String, 
    pub password_hash: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct SignUpUser {
    pub username: String,
    pub password: String,
    pub email:String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct ApiMessage {
    pub username1: String,
    pub username2: String,
    pub body: String,
    pub tail: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Email {
    pub email: String,
    pub code: String
}
