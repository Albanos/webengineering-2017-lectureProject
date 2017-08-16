--Drop the table every time and fill it only with the test-data

DELETE FROM MESSAGE_;
DELETE FROM LIKES;
DELETE FROM USER__DISLIKE;
DELETE FROM USER_;



--Password besteht aus:
--<gehashtem SALT-WERT><gehashtem Password des User> (ohne Leerzeichen, direkt hintereinander)
--Passwörter:
--Luan -->TestPassword
--Rovi -->foo
--Alan -->Alan
--Bert -->Bert
--Claudia --> Claudia
--Dennis --> Dennis
--Erica --> Erica
--Frank --> Frank
INSERT INTO USER_ (ID, EMAIL, PASSWORD, USERTEXT) VALUES
(1,'Luan','aa8a696e869786ced969fb159ac5bdd0fb690033bbf0319550c4989e8b013a7aa7cbea27e5edd6769607f82a26434570be0bffa17c08f5665d1b0ee882a038a2', 'Luans Beispiel-text'),
(2,'Rovi','bcada0b36f8c6106f0d73cb417e2b6989a3259736bfa5deb922392be37b60485296f78721036fbd12e7d600c26a1752070d1ff17e1411dd2e2c382fdf002855b', 'Rovis Beispiel-text'),
(3, 'Alan', 'ebd40b1bba46eb4e9518763bad877620d29064eaa96b97c774318b830fadc0d4cdc2e7d461340568bd9504662fd751a68b701853cd8a03da8f8123bf55792e6f', 'Alans Beispiel-text'),
(4, 'Bert', 'ccd74c7ff909292513894530de9c82da8f6a5aaa757aba1e872660b5aa0bd7c2152a5a90c7de8f82480b826682b7f95e59918a2cca631bba7da695e570a3ecd9', 'Berts Beispiel-text'),
(5, 'Claudia', 'f2ae5a7c5c7323dfa674ab1dfbba05b0fc116b80892bdb58997b3d8de605b41f45cb10ea4fb2e649d82364112a7c8e537351e267c46d3101018775fe1780dc2f', 'Claudias Beispiel-text'),
(6, 'Dennis', '7f313d49ee309f985661037a9ea54051e4c2f97e2c43c70b563e8d39b903e0868ba09ae6205ed6b31fac265bffc7c2a6559614325cf9c4905e113d8c6e2a7206', 'Dennis Beispiel-text'),
(7, 'Erica', '9bbd40f837a456cd1bf79dbc719bb4865a58d9ab1fbcec54aecc2ca87c7d12c71fef2689fcad5f4448a984a0057e98327bc27078bf78fe12e0a9d067b1c32770', 'Ericas Beispiel-text'),
(8, 'Frank', 'b75c82579475dab2ee45d03efc79121fe0877be06669c65f00d21f4651a33e64d500feb74094b32a366503c80a98b5a745d294e15af32a5b8c5d63e07c48cf88', 'Franks Beispiel-Text');

INSERT INTO LIKES (LIKE_FROM, LIKE_TO) VALUES
(1,2),
(2,1);

INSERT INTO USER__DISLIKE (USER__ID, DISLIKE_ID) VALUES
(1,3);

--INSERT INTO LIKES (LIKE_FROM, LIKE_TO) VALUES
--(1,2),
--(1,4),
--(1,3),
--(2,1),
--(3,4),
--(4,1);