# get_test A.P.I. call

Rulând backend/rust
```
$ cd ./backend/rust
$ cargo run
```
vom putea accesa 'http://localhost:8080/api/test?param1=...&param2=...'.
Acest modul de A.P.I. va afișa cei doi parametrii într-un JSON. Scopul acestui push este experimentarea creiării unui A.P.I. folosind RUST.

## Exemplu efectiv

Accesând 'http://localhost:8080/api/test?param1=1&param2=2' în urma executării programului backend/rust, va rezulta în afișarea site-ului web care va conține în body textul:

```
"1""2"
```

## Utilitate

Minimă. Așa cum se vede, aceasta nu este o funcționalitate, ci doar un test pentru developarea mai apoi a funcționalității A.P.I.-ului.

# insert_user

Appelând
```rs
let user = ...
let firebase_db_instance = ...
db::insert_user(user, firebase_db_instance).await?;
```
inserăm în baza de date un user (user-ul și baza de date sunt definite mai sus).

## Instanțiere baza de date
Vom instanția baza de date astfel:
```rs
let rtdb = firebase_rs::Firebase::auth(&environment::rtdb_url()?, &environment::auth_key()?).unwrap();
```
Pentru ca programul să ruleze normal va trebui să compilăm aplicația utilizând următoarele variabile de mediu (environment variables):
```
AUTH_KEY="..."
RTDB_URL="..."
```
astfel că ar trebui să rulăm programul astfel:
```sh
 $ cd src/backend/rust
 $ export AUTH_KEY="..." && export RTFB_URL="..." && cargo run
```

## Exemplu efectiv
```rs
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {

    let user = db::users::User::new(); 
    let firebase = firebase_rs::Firebase::auth(&environment::rtdb_url()?, &environment::auth_key()?).unwrap();
    let test = db::insert_user(user, firebase).await;
    Ok(())
}
```

## Utilitate
Inserarea unui utilizator în baza de date.