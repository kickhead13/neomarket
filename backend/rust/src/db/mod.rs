use std::collections::HashMap;

use firebase_rs::*;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
struct Response {
    pub name: String
}
