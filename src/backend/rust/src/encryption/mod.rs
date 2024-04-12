use sha256;

use crate::environment;

#[allow(dead_code)]
pub fn encrypt_url(
    url: &str
) -> &str {
    url
}

#[allow(dead_code)]
pub fn decrypt_url(
    url: &str
) -> &str {
    url
}

pub fn encrypt_password(
    password: &str
) -> String  {

    sha256::digest(
        format!(
            "{}{}",
            password,
            &environment::hash_context()
        )
    )

}