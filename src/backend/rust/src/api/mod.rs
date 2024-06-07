#![allow(dead_code)]
use actix_web;
use rand::{distributions::Alphanumeric, Rng};
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
    
    println!(" -> api/fetch_user_password : {}", (&req.username).to_string());

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::FetchResponse {
            password: vect[0].password.clone(),
        }
        //format!("{{\"password\":{:?}}}", vect[0].password)
    )

}

#[actix_web::get("/api/check_user_password")]
pub async fn check_user_password(
    req: actix_web::web::Query<structures::CheckUserPassword>
) -> impl actix_web::Responder {

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let vect = db::get_user_by_username(
        &req.username,
        fire_db
    ).await;
    
    println!(" -> api/check_user_password : {}", (&req.username).to_string());
 
    if String::from(&req.password_hash) == vect[0].password {
        let token: String = rand::thread_rng()
            .sample_iter(&Alphanumeric)
            .take(16)
            .map(char::from)
            .collect();
        actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
            &structures::ConfirmResponse {
                confirm: vect[0].account_type.clone() + ";" + &token,
            }
        )
    } else {
        actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
            &structures::ConfirmResponse {
                confirm: "nok".to_string(),
            }
        )
    }
}

#[actix_web::get("/api/sign_up")]
pub async fn sign_user_up(
    req: actix_web::web::Query<structures::SignUpUser>
) -> impl actix_web::Responder {

    let username = &req.username;
    let password = encryption::encrypt_password(&req.password);
    let email = &req.email;
    
    println!(" --> api/sign_up");
    
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

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::ConfirmResponse {
            confirm: "ok".to_string()
        }
    )

}

#[actix_web::get("/api/delete_user")]
pub async fn delete_user(
    req: actix_web::web::Query<structures::UserParamsStruct>
) -> impl actix_web::Responder {

    let username = &req.username;
    
    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

   let _ = db::delete_user_by_username(
        &username,
        fire_db
    ).await;

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::ConfirmResponse {
            confirm: "ok".to_string()
        }
    )
}

#[actix_web::get("/api/send_message")]
pub async fn send_message(
    req: actix_web::web::Query<structures::ApiMessage>
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

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::ConfirmResponse {
            confirm: "ok".to_string()
        }
    )

}

#[actix_web::get("/api/fetch_messages")]
pub async fn fetch_messages(
    req: actix_web::web::Query<structures::ApiMessage>
) -> impl actix_web::Responder {
    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let messages = db::fetch_messages_from(
        (&req.username1).to_string(),
        (&req.username2).to_string(),
        (&req.tail).to_string().parse::<u8>().unwrap_or_else(|_|0u8),
        fire_db
    ).await;

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::MessageList {
            list: messages
        }
        //format!("{{\"messages\":{} }}", serde_json::json!(messages))     
    )
} 

#[actix_web::get("/api/new_prod")]
pub async fn new_prod(
    req: actix_web::web::Query<db::structures::Prod>
) -> impl actix_web::Responder {
    
    let prod = db::structures::Prod::new(
        (&req.seller).to_string(),
        (&req.title).to_string(),
        (&req.description).to_string(),
        (&req.img).to_string(),
        (&req.category).to_string(),
        (&req.price).to_string()
    );

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let _ = db::send_prod(
        prod,
        fire_db
    ).await;

    println!(" -> api/new_prod : {} {} {} {} {} {}",
        (&req.seller).to_string(),
        (&req.title).to_string(),
        (&req.description).to_string(),
        (&req.img).to_string(),
        (&req.category).to_string(),
        (&req.price).to_string()
    );

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::ConfirmResponse {
            confirm: "ok".to_string()
        }
    )
}

#[actix_web::get("/api/fetch_prods_from_cat")]
pub async fn fetch_prods_from_cat(
    req: actix_web::web::Query<structures::FetchProdsCat>
) -> impl actix_web::Responder {

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let prod_list = db::fetch_prods(
        (&req.category).to_string(),
        fire_db
    ).await;

    println!(" -> api/fetch_prods_from_cat : {}", (&req.category).to_string());

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::ProdList {
            list: prod_list
        }
    )
}

#[actix_web::get("/api/fetch_spec_prod")]
pub async fn fetch_spec_prod(
    req: actix_web::web::Query<structures::FetchSpecProd>
) -> impl actix_web::Responder {

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let res = db::fetch_spec_prod(
        (&req.category).to_string(),
        (&req.code).to_string(),
        fire_db
    ).await;

    println!(" -> api/fetch_prods_from_cat : {}", (&req.category).to_string());

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &res
    )
}

#[actix_web::get("/api/send_email")]
pub async fn send_email(
    req: actix_web::web::Query<structures::Email>
) -> impl actix_web::Responder {

    let email = &req.email;
    let code = &req.code;

    let output = std::process::Command::new("python")
        .arg(environment::abs_path("../scripts/email_sender"))
        .arg(email)
        .arg(code)
        .output()
        .expect("Failed to execute command");

    match std::str::from_utf8(output.stderr.as_slice()) {
        Ok(err) => println!(" -> api/send_email : (){:?}()", err),
        Err(_) => println!(" x api/send_email..."),
    }

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::ConfirmResponse {
            confirm: "ok".to_string()
        }
    )
}

#[actix_web::get("/api/new_comm")]
pub async fn new_comm(
    req: actix_web::web::Query<db::structures::Comm>
) -> impl actix_web::Responder {
    
    let comm = db::structures::Comm::new(
        (&req.user).to_string(),
        (&req.body).to_string(),
        (&req.post).to_string(),
    );

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let _ = db::send_comm(
        comm,
        fire_db
    ).await;

    println!(" -> api/new_prod : {} {} {}",
        (&req.user).to_string(),
        (&req.body).to_string(),
        (&req.post).to_string(),
    );

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::ConfirmResponse {
            confirm: "ok".to_string()
        }
    )
}

#[actix_web::get("/api/fetch_comms_from_post")]
pub async fn fetch_comms_from_post(
    req: actix_web::web::Query<structures::FetchPostComms>
) -> impl actix_web::Responder {
    println!("here");
    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    println!("nothere");

    let prod_list = db::fetch_comms(
        (&req.post).to_string(),
        fire_db
    ).await;

    println!(" -> api/fetch_prods_from_cat : {}", (&req.post).to_string());

    actix_web::HttpResponse::Ok().insert_header(("Access-Control-Allow-Origin", "*")).json(
        &structures::CommList {
            list: prod_list
        }
    )
}
