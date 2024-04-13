# get_test

Funcție:

```rs
#[actix_web::get("/api/test")]
pub async fn get_test(
    req: actix_web::web::Query<TestParamsStruct>
) -> impl actix_web::Responder {
    
    return actix_web::HttpResponse::Ok()
        .body(format!("{:?}{:?}", req.param1, req.param2));

}
```

## URL

La accesarea URL-ului 'http://localhost:8080/api/test?param1=val1&param2=val2' se va accesa un site web cu următorul conținut:
```
"val1""val2"
```
În fapt, val1 și val2 din query-ul URL-ului sunt parametrii generali pot fi înlocuiți cu orice string, iar conținutul site-ului web va fi înlocuit "accordingly".

## Resurse
 - artix-web: https://docs.rs/actix-web/latest/actix_web/index.html

# fetch_user_password
Funcție
```rs
#[actix_web::get("/api/fetch_user_password")]
pub async fn fetch_user_password(
    req: actix_web::web::Query<UserParamsStruct>
) -> impl actix_web::Responder {

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let vect = db::get_user_by_username(
        &req.username,
        fire_db
    ).await;
    
    actix_web::HttpResponse::Ok().body(
        format!("{{\"password\":{:?}}}", vect[0].password)
    )

}
```
## URL

La accesarea URL-ului 'http://localhost:8080/api/fetch_user_password?username=val' se va face accesul la o pagină web al cărui corp are un conținut de forma:

```
{"password":"???"}
```
astfel că această pagină conține un JSON din care se poate extrage parola user-ulu "val" (PAROLA ESTE ENCRIPTATĂ).

## Obsevație

Parola este encriptată utilizând următoarea funcție de encriptare:
```rs
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
```
astfel că pentru o parolă oarecare dată ca input primim hash-ul (sha256) a stringului ```parola + <valoarea variabilei de mediu HASH_CONTEXT>```.

# sign_up

Funcție:
```rs
#[actix_web::get("/api/sign_up")]
pub async fn sign_user_up(
    req: actix_web::web::Query<SignUpUser>
) -> impl actix_web::Responder {

    let username = &req.username;
    let password = encryption::encrypt_password(&req.password);
    let email = &req.email;

    let user: db::structures::User = db::structures::User::new_sign_up_user(
        username.to_string(),
        password,
        email.to_string()
    );

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let _ = db::insert_user(user, fire_db).await;

    actix_web::HttpResponse::Ok().body(
        "{{\"response\":\"ok\"}}"
    )

}
```

## URL
Acest apel se efectuează tot printr-o cerere GET (chiar dacă ar fi fost mai logic să fie POST). Cererea se va face la adresa 'http://localhost:8080/api/sign_up?username=val1&password=val2&email=val3'. 

## Observație 
Răspunsul primit în caz de succes este:

```
{"response":"ok"}
```
LA ACEST PAS ESTE REALIZATĂ ENCRIPTAREA PAROLEI. SĂ SE IA ACEST LUCRU ÎN MINTE DACĂ ENCRIPTĂM PAROLA ȘI LA ALT PAS (DUBLĂ ENCRIPTARE ?).

# send_message

```rs
#[actix_web::get("/api/send_message")]
pub async fn send_message(
    req: actix_web::web::Query<structures::SendMessage>
) -> impl actix_web::Responder {

    let message = db::structures::Message::new(
        (&req.username1).to_string(),
        (&req.username2).to_string(),
        db::utils::current_time(),
        (&req.body).to_string()
    );

    let fire_db = firebase_rs::Firebase::auth(
        &environment::rtdb_url(),
        &environment::auth_key()
    ).unwrap();

    let _ = db::send_message(
        message,
        fire_db
    ).await;

    actix_web::HttpResponse::Ok().body(
        "{{\"response\":\"ok\"}}"
    )

}
```

## URL
```
localhost:8080/api/send_message?username1=...&username2=...&body="..."
```
 - username1: utilizatorul care trimite mesajul
 - username2: utilizatorul pentru care este destinat mesajul
 - body: mesajul efectiv

## Observație
Da este GET nu POST kys but what about it? Im still a loving person, a good gamer and coder deal with it. În plus, cel mai bine este ca mesajul să fie pus între ghilimele (nu știu ce se întâmplă dacă nu este pus între ghilimele și are spații, mi lene să verific). Răspunsul primit în caz de succes este:

```
{"response":"ok"}
```
