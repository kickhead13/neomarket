use std::collections::HashMap;

use firebase_rs::*;
use firestore::*;
use serde::{Deserialize, Serialize};

pub mod users;


const USERS_COLLECTION_NAME: &str= "users";

#[derive(Deserialize, Serialize, Debug)]
struct Response {
    pub name: String
}

pub fn config_env_var(name: &str) -> Result<String, String> {
    std::env::var(name).map_err(|e| format!("{}: {}", name, e))
}
 
pub async fn insert_user(
    user: users::User,
    db: FirestoreDb
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> { 
    let _ = db.fluent()
        .insert()
        .into(USERS_COLLECTION_NAME)
        .document_id(&user.id)
        .object(&user)
        .execute()
        .await?;
    Ok(())
}

