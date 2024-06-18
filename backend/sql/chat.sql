USE prj3;

SELECT *
FROM chat;

SELECT *
FROM chat_room;

# test1 userId : 21, test2 userId : 27

# k 10
SELECT *
FROM chat
WHERE user_id = 10;

SELECT f.*
FROM chat f
         INNER JOIN (SELECT chat_room_id, MAX(inserted) AS latest_inserted
                     FROM chat
                     GROUP BY chat_room_id) AS second
                    ON f.chat_room_id = second.chat_room_id AND f.inserted = second.latest_inserted;
SELECT *
FROM chat c
         LEFT JOIN chat_room cr ON c.chat_room_id = cr.id;

SELECT m.*
FROM chat m
         INNER JOIN (SELECT chat_room_id, MAX(inserted) AS latest_inserted
                     FROM chat
                     GROUP BY chat_room_id) AS latest
                    ON m.chat_room_id = latest.chat_room_id AND m.inserted = latest.latest_inserted;


SELECT *
FROM chat_room;

SELECT *
FROM chat;

