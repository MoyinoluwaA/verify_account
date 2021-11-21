const queries = {
    addUser: `
        INSERT INTO users(
            first_name,
            last_name,
            email,
            password,
            is_verified
        ) 
        VALUES ($1, $2, $3, $4, 'false')
        RETURNING *
    `,

    getUser: `
        SELECT *
        FROM users
        WHERE email=$1
    `,

    verifyUser: `
        UPDATE users
        SET 
            is_verified='true',
            updated_at = NOW()
        WHERE user_id = $1
        RETURNING *
    `,

    updatePassword: `
        UPDATE users
        SET 
            password = $1,
            updated_at = NOW()
        WHERE user_id = $2
        RETURNING *
    `
}

module.exports = queries