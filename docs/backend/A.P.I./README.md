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

## Funcționalitate oferită

La accesarea URL-ului 'http://localhost:8080?param1=val1&param2=val2' se va accesa un site web cu următorul conținut:
```
"val1""val2"
```
În fapt, val1 și val2 din query-ul URL-ului sunt parametrii generali pot fi înlocuiți cu orice string, iar conținutul site-ului web va fi înlocuit "accordingly".

## Resurse
 - artix-web: https://docs.rs/actix-web/latest/actix_web/index.html