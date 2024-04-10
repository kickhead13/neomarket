use actix_web;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
pub struct TestParamsStruct {
    param1: String,
    param2: String
}

#[actix_web::get("/api/test")]
pub async fn get_test(
    req: actix_web::web::Query<TestParamsStruct>
) -> impl actix_web::Responder {
    
    return actix_web::HttpResponse::Ok()
        .body(format!("{:?}{:?}", req.param1, req.param2));

}