#![allow(dead_code)]

fn env_var(name: &str) -> String {
    match std::env::var(name).map_err(|e| format!("{}: {}", name, e)) {
        Ok(string) => string,
        Err(_) => "".to_string()
    }
}

pub fn auth_key() -> String {
    env_var("AUTH_KEY")
}

pub fn rtdb_url() -> String {
    env_var("RTDB_URL")
}