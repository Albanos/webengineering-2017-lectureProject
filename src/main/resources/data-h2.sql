--Drop the table every time and fill it only with the test-data

DELETE FROM USERTEXT;
DELETE FROM USER_;


INSERT INTO USER_ (ID, EMAIL, PASSWORD) VALUES
(1,'luan','TestPassword'),
(2,'Rovi','foo');

INSERT INTO USERTEXT (ID, AUTHOR, TEXT) VALUES
(1,1,'Text von Luan'),
(2,2,'Text von Rovi');