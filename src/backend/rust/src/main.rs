use actix_web;
use local_ip_address;

mod api;
mod db;
mod environment;
mod encryption;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    if let Ok(lan_ip) = local_ip_address::local_ip() {
        let mut lan_ip_str = format!("{:?}", lan_ip);
        lan_ip_str.push_str(":8080");
        
        println!("api binding to {}...", lan_ip_str);
        
        let _ = actix_web::HttpServer::new(|| 
            actix_web::App::new()
                .service(api::get_test)
                .service(api::fetch_user_password)
                .service(api::sign_user_up)
                .service(api::send_message)
                .service(api::fetch_messages)
                .service(api::delete_user)
            )
            .bind(lan_ip_str)?
            .run()
            .await;
        Ok(())
    } else {
        println!("api error: can't detect LAN ip.");
        Ok(())
    }
}
