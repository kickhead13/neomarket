use actix_web;

mod api;
mod db;
mod environment;
mod encryption;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let _ = actix_web::HttpServer::new(|| 
            actix_web::App::new()
                .service(api::get_test)
                .service(api::fetch_user_password)
                .service(api::sign_user_up)
                .service(api::send_message)
                .service(api::fetch_messages)
                .service(api::delete_user)
        )
        .bind("127.0.0.1:8080")?
        .run()
        .await;
    
    Ok(())
}
