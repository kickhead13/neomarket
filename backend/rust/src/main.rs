
use actix_web;
mod api;
//use crate::api::get_test;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    actix_web::HttpServer::new(|| 
        actix_web::App::new().service(api::get_test))
        .bind("127.0.0.1:8080")?
        .run()
        .await

}
