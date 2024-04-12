use actix_web;

mod api;
mod db;
mod environment;
mod encryption;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    //println!("{}", encryption::encrypt_password("parolameasecreta"));
    let _ = actix_web::HttpServer::new(|| 
            actix_web::App::new()
                .service(api::get_test)
                .service(api::fetch_user_password)
                .service(api::sign_user_up)
        )
        .bind("127.0.0.1:8080")?
        .run()
        .await;
    
    //let user = db::structures::User::new();
    //let fire_db = firebase_rs::Firebase::auth(&environment::rtdb_url()?, &environment::auth_key()?).unwrap();
    //let _ = db::insert_user(user, fire_db).await;
    //let _ = db::delete_user_by_username(&user.username, fire_db).await;
    //let test = db::get_user_by_username("nobody", fire_db).await;
    //print!("{:?}", test[0]);
    
    Ok(())
}
