--Drop the table every time and fill it only with the test-data

DELETE FROM USER_;

INSERT INTO USER_ (ID, EMAIL, PASSWORD, USERTEXT) VALUES
(1,'luan','TestPassword', 'Hallo Welt'),
(2,'Rovi','foo', 'Hallo wunderschoene Welt');