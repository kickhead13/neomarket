use serde::{Deserialize, Serialize};

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
pub struct SignUpUser {
    pub username: String,
    pub password: String,
    pub email:String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct SendMessage {
    pub username1: String,
    pub username2: String,
    pub body: String
}