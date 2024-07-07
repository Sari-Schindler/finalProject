function getByIdQuery(table, column, includeSoftDeletes = false) {
    const whereClause = includeSoftDeletes ? `${column} = ?` : `${column} = ?`;
    return `SELECT * FROM ${table} WHERE ${whereClause}`;
}

function getQuery(table, queryParams, includeSoftDeletes = false) {
    let query = `SELECT * FROM ${table}`;
    let params = [];
    let whereClause = [];

    if (!includeSoftDeletes) {
        whereClause.push(`deleted_at IS NULL`);
    }

    for (const key in queryParams) {
        whereClause.push(`${key} = ?`);
        params.push(queryParams[key]);
    }

    if (whereClause.length > 0) {
        query += ` WHERE ${whereClause.join(' AND ')}`;
    }

    return { query, params };
}

function deleteQuery(table, column) {
    return `DELETE FROM ${table} WHERE ${column} = ?`;
}

function updateQuery(table, column, columnsToUpdate, includeSoftDeletes = false) {
    const setClause = columnsToUpdate;
    const whereClause = includeSoftDeletes ? `${column} = ?` : `${column} = ? AND deleted_at IS NULL`;
    return `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
}

function createQuery(table, columns, values) {
    return `INSERT INTO ${table} (${columns}) VALUES (${values})`;
}


module.exports = { getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery };
