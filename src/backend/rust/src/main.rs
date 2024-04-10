use actix_web;

mod api;
mod db;
mod environment;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let _ = actix_web::HttpServer::new(|| 
        actix_web::App::new().service(api::get_test))
        .bind("127.0.0.1:8080")?
        .run()
        .await;
    Ok(())
}
