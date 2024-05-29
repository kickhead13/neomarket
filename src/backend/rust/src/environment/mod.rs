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

pub fn hash_context() -> String {
    env_var("HASH_CONTEXT")
}

pub fn abs_path(path: &str) -> String {
    let path = std::path::PathBuf::from(path);
    match std::fs::canonicalize(&path) {
        Ok(abspath) => {
            let test = String::from(abspath.clone().to_str().expect("../scripts/email_sender.py"));
            test.clone()
        },
        Err(_) => String::from("../scripts/email_sender.py")
    }
}
