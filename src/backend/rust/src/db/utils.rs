use std::collections::HashMap;
use crate::db::structures::*;

pub fn get_user_from_hashmap(
    hashmap: &HashMap<String, User>
) -> Vec<User> {

    hashmap.values().cloned().collect::<Vec<User>>()

}

pub fn get_owners_tag(
    username1: String,
    username2: String
) -> String {

    let mut owner_vec = Vec::new();
    owner_vec.push(username1);
    owner_vec.push(username2);
    owner_vec.sort();

    format!("{}{}", owner_vec[0], owner_vec[1])

}

pub fn current_time() -> String {

    chrono::prelude::Utc::now().to_string().replace(&[' ', '.', ':'][..], "&")

}