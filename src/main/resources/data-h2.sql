--Drop the table every time and fill it only with the test-data

DELETE FROM USER_;

INSERT INTO USER_ (ID, EMAIL, PASSWORD) VALUES
(1,'luan','hallo'),
(2,'Rovi','hallo2');