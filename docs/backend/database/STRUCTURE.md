# Structura documentelor în baza de date
Tipurile de obiecte stocate în baza de date conectată cu aplicația, și atributele lor de bază, sunt:

## User
* `id` - ID-ul unic al utilizatorului (numeric)
* `name` - Numele ales de utilizator (text)
* `email` - Adresa e-mail a utilizatorului (text)
* `location` - Locația aproximativă a utilizatorului (text)
* `phone_num` - Numărul de telefon al utilizatorului (text)
* `profile_pic` - Locația de unde va fi încărcată poza de profil a utilizatorului (text)
* `avg_rating` - Rating-ul mediu al utilizatorului, salvat pentru conveniență (numeric)
* `account_type` - Tipul contului de utilizator (utilizator normal, admin/system etc) (enum)
* `password` - Parola utilizatorului encriptată/sub formă de hash (text)

## Offer
* `id` - ID-ul ofertei (numeric)
* `seller_id` - ID-ul utilizatorului care a postat oferta (numeric)
* `title` - Titlul ofertei (text)
* `description` - Descrierea ofertei (text)
* `gallery` - Locația galerier cu imagini pentru produs (text)
* `price` - Prețul ofertei (numeric)
* `category` - Categoria din care face parte produsul/serviciul (enum?)
* `special_data` - Date suplimentare care depind de tipul ofertei; exemplu: memoria la un laptop (json)

## Comment
* `id` - ID-ul comentariului (numeric)
* `comment_body` - Conținutul propriu zis al comentariului (text)
* `user_id` - ID-ul utilizatorului care a postat comentariul (numeric)
* `post_id` - ID-ul ofertei/postării sub care s-a făcut comentariul (numeric)
* `parent_comment` - ID-ul comentariului părinte dacă există (altfel null/0)

## Messages
* `id` - ID-ul conversației
* `user1_id`, `user2_id` - ID-urile utilizatorilor implicați în conversație
* `logfile` - Path-ul către fila criptată care conține istoricul mesajelor

## Ratings
* `id` - ID-ul relației (numeric)
* `user_id` - ID-ul utilizatorului (numeric)
* `avg` - Rating-ul mediu al utilizatorului (numeric)
* `r5` ... `r1` - Numărul de rating-uri pentru fiecare scor (numeric)
