use actix_web;
use actix_cors;
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
        let mut https = format!("https://");
        https.push_str(&format!("{:?}", lan_ip));
        println!("api binding to {}...", lan_ip_str);
        
        let _ = actix_web::HttpServer::new(move || 
            actix_web::App::new()
                .wrap(actix_cors::Cors::default().allowed_origin(&https))
                .service(api::get_test)
                .service(api::fetch_user_password)
                .service(api::sign_user_up)
                .service(api::send_message)
                .service(api::fetch_messages)
                .service(api::delete_user)
                .service(api::new_prod)
                .service(api::fetch_prods_from_cat)
                .service(api::send_email)
                .service(api::check_user_password)
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
