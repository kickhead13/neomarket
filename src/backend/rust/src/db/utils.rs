use std::collections::HashMap;
use crate::db::structures::*;

pub fn get_user_from_hashmap(
    hashmap: &HashMap<String, User>
) -> Vec<User> {

    return hashmap.values().cloned().collect::<Vec<User>>();

}