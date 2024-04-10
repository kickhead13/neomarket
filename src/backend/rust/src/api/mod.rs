#![allow(dead_code)]
use actix_web;
use serde::{Deserialize, Serialize};
use crate::environment;

use crate::db;

#[derive(Deserialize, Serialize, Debug)]
pub struct TestParamsStruct {
    param1: String,
    param2: String
}

#[derive(Deserialize, Serialize, Debug)]
pub struct UserParamsStruct {
    username: String
}

#[actix_web::get("/api/test")]
pub async fn get_test(
    req: actix_web::web::Query<TestParamsStruct>
) -> impl actix_web::Responder {
    
    return actix_web::HttpResponse::Ok()
        .body(format!("{:?}{:?}", req.param1, req.param2));

}

#[actix_web::get("/api/fetch_user_password")]
pub async fn fetch_user_password(
    req: actix_web::web::Query<UserParamsStruct>
) -> impl actix_web::Responder {

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let vect = db::get_user_by_username(
        &req.username,
        fire_db
    ).await;
    
    return actix_web::HttpResponse::Ok()
        .body(format!("{{\"password\":{:?}}}", vect[0].password));

}