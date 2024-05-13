use actix_web;
use serde_json;

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
                .service(api::send_message)
                .service(api::fetch_messages)
                .service(api::delete_user)
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
    
    /*let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    println!(
        "{:?}", 
        match fire_db.at("messages").at("alexana123nobody").get_as_string().await {
            Ok(response) => {
                let mut val: serde_json::Value = serde_json::from_str(&response.data)?;
                let mut ret: String = "".to_string();
                for (key, value) in val.as_object_mut().unwrap() {
                    ret = value.to_string()
                }
                ret
            },
            Err(_) => "".to_string(),
        }
    );
    */
    Ok(())
}
