#![allow(dead_code)]

fn env_var(name: &str) -> Result<String, String> {
    std::env::var(name).map_err(|e| format!("{}: {}", name, e))
}

pub fn auth_key() -> Result<String, String> {
    env_var("AUTH_KEY")
}

pub fn rtdb_url() -> Result<String, String> {
    env_var("RTDB_URL")
}