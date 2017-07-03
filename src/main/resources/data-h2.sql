--Drop the table every time and fill it only with the test-data

--DELETE FROM USERTEXT;
DELETE FROM USER_;


INSERT INTO USER_ (ID, EMAIL, PASSWORD, USERTEXT) VALUES
(1,'Luan','TestPassword', 'Luans Beispiel-text'),
(2,'Rovi','foo', 'Rovis Beispiel-text');

--INSERT INTO USERTEXT (ID, AUTHOR, TEXT) VALUES
--(1,1,'Text von Luan'),
--(2,2,'Text von Rovi');