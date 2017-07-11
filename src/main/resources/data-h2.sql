--Drop the table every time and fill it only with the test-data

--DELETE FROM MESSAGE_;
--DELETE FROM USER_;


--Password besteht aus:
--<gehashtem SALT-WERT><gehashtem Password des User> (ohne Leerzeichen, direkt hintereinander)
--Passwörter:
--Luan -->TestPassword
--Rovi -->foo
--Alan -->Alan
--Bert -->Bert
INSERT INTO USER_ (ID, EMAIL, PASSWORD, USERTEXT) VALUES
(1,'Luan','aa8a696e869786ced969fb159ac5bdd0fb690033bbf0319550c4989e8b013a7aa7cbea27e5edd6769607f82a26434570be0bffa17c08f5665d1b0ee882a038a2', 'Luans Beispiel-text'),
(2,'Rovi','bcada0b36f8c6106f0d73cb417e2b6989a3259736bfa5deb922392be37b60485296f78721036fbd12e7d600c26a1752070d1ff17e1411dd2e2c382fdf002855b', 'Rovis Beispiel-text'),
(3, 'Alan', 'ebd40b1bba46eb4e9518763bad877620d29064eaa96b97c774318b830fadc0d4cdc2e7d461340568bd9504662fd751a68b701853cd8a03da8f8123bf55792e6f', 'Alans Beispiel-text'),
(4, 'Bert', 'ccd74c7ff909292513894530de9c82da8f6a5aaa757aba1e872660b5aa0bd7c2152a5a90c7de8f82480b826682b7f95e59918a2cca631bba7da695e570a3ecd9', 'Berts Beispiel-text');