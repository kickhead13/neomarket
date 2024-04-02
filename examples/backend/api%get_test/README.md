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

