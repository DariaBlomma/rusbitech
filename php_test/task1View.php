<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get db task 1 info</title>
</head>
<style>
    table {
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid black;
    }
</style>
<body>
    <h1>Task 1 </h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Script name</th>
            <th>Sort index</th>
            <th>Result</th>
        </tr>
        <?php foreach($result as $row): ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= $row['script_name'] ?></td>
            <td><?= $row['sort_index'] ?></td>
            <td><?= $row['result'] ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    <h1>Task 3 </h1>
    <table>
        <tr>
            <th>Book name</th>
            <th>Authors number</th>
        </tr>
        <?php foreach($result2 as $row2): ?>
        <tr>
            <td><?= $row2['book_name'] ?></td>
            <td><?= $row2['amount'] ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>