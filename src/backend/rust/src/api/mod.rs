#![allow(dead_code)]
use actix_web;

use crate::environment;
use crate::db;
use crate::encryption;

mod structures;

#[actix_web::get("/api/test")]
pub async fn get_test(
    req: actix_web::web::Query<structures::TestParamsStruct>
) -> impl actix_web::Responder {
    
    actix_web::HttpResponse::Ok().body(
        format!("{:?}{:?}", req.param1, req.param2)
    )

}

#[actix_web::get("/api/fetch_user_password")]
pub async fn fetch_user_password(
    req: actix_web::web::Query<structures::UserParamsStruct>
) -> impl actix_web::Responder {

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let vect = db::get_user_by_username(
        &req.username,
        fire_db
    ).await;
    
    actix_web::HttpResponse::Ok().body(
        format!("{{\"password\":{:?}}}", vect[0].password)
    )

}

#[actix_web::get("/api/sign_up")]
pub async fn sign_user_up(
    req: actix_web::web::Query<structures::SignUpUser>
) -> impl actix_web::Responder {

    let username = &req.username;
    let password = encryption::encrypt_password(&req.password);
    let email = &req.email;

    let user: db::structures::User = db::structures::User::new_sign_up_user(
        username.to_string(),
        password,
        email.to_string()
    );

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let _ = db::insert_user(user, fire_db).await;

    actix_web::HttpResponse::Ok().body(
        "{{\"response\":\"ok\"}}"
    )

}

#[actix_web::get("/api/send_message")]
pub async fn send_message(
    req: actix_web::web::Query<structures::SendMessage>
) -> impl actix_web::Responder {

    let message = db::structures::Message::new(
        (&req.username1).to_string(),
        (&req.username2).to_string(),
        db::utils::current_time(),
        (&req.body).to_string()
    );

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let _ = db::send_message(
        message,
        fire_db
    ).await;

    actix_web::HttpResponse::Ok().body(
        "{{\"response\":\"ok\"}}"
    )

}