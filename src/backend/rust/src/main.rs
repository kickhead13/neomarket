use actix_web;
use actix_cors;
use local_ip_address;
use std::io::Read;

mod api;
mod db;
mod environment;
mod encryption;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    if let Ok(lan_ip) = local_ip_address::local_ip() {
 

        env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

        let mut builder = openssl::ssl::SslAcceptor::mozilla_intermediate(openssl::ssl::SslMethod::tls()).unwrap();

        builder
            .set_private_key(&load_encrypted_private_key())
            .unwrap();

        builder.set_certificate_chain_file("tls/cert.crt").unwrap();


        let mut lan_ip_str = format!("{:?}", lan_ip);
        let lan_ip = lan_ip_str.clone();
        lan_ip_str.push_str(":8443");
        let mut https = format!("https://");
        https.push_str(&format!("{:?}", lan_ip));
        println!("api binding to {}...", lan_ip_str);
        
        let _ = actix_web::HttpServer::new(move || {
            actix_web::App::new()
                //.wrap(actix_web::middleware::Logger::default())
                //.wrap(actix_cors::Cors::default().allowed_origin(&https))
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
                .service(api::fetch_spec_prod)
                .service(api::new_comm)
                .service(api::fetch_comms_from_post)
            })
            .bind_openssl(lan_ip_str, builder)?
            .workers(8)
            .run()
            .await;
        Ok(())
    } else {
        println!("api error: can't detect LAN ip.");
        Ok(())
    }
}

fn load_encrypted_private_key() -> openssl::pkey::PKey<openssl::pkey::Private> {
    let mut file = std::fs::File::open("tls/cert.key").unwrap();
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer).expect("Failed to read file");

    openssl::pkey::PKey::private_key_from_pem_passphrase(&buffer, b"password").unwrap()
}
