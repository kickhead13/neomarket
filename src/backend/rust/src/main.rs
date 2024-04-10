
use actix_web;
use firestore::*;
use firebase_rs::*;

mod api;
mod db;
//use crate::api::get_test;

const PROJECT_ID: &str = "PROJECT_ID";

//#[actix_web::main]
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let _ = actix_web::HttpServer::new(|| 
        actix_web::App::new().service(api::get_test))
        .bind("127.0.0.1:8080")?
        .run()
        .await;
    /**
    println!("test");

    let user = db::users::User::new();
    let firebase = firebase_rs::Firebase::auth("https://neomarket-app-default-rtdb.europe-west1.firebasedatabase.app", "AIzaSyB1c5NadbYB1pRT_vKBQLvTxpcN4").unwrap().at("users");
    let set = firebase.set(&user).await;
    println!("{:?}", set);
    **/
    Ok(())
}
