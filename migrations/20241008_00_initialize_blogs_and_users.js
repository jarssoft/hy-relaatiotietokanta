const { DataTypes } = require('sequelize')


module.exports = {
  up: async ({ context: queryInterface }) => {
    /*
                                        Table "public.blogs"
        Column     |          Type          | Collation | Nullable |              Default              
    ---------------+------------------------+-----------+----------+-----------------------------------
    id            | integer                |           | not null | nextval('blogs_id_seq'::regclass)
    author        | text                   |           |          | 
    url           | text                   |           | not null | 
    title         | text                   |           | not null | 
    likes         | integer                |           |          | 0
    user_username | character varying(255) |           |          | 
    Indexes:
        "blogs_pkey" PRIMARY KEY, btree (id)
    Foreign-key constraints:
        "blogs_user_username_fkey" FOREIGN KEY (user_username) REFERENCES users(username) ON UPDATE CASCADE ON DELETE SET NULL
    */

    await queryInterface.createTable('notes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      important: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE
      },
    })

    /*
                                    Table "public.users"
    Column   |           Type           | Collation | Nullable | Default 
    ------------+--------------------------+-----------+----------+---------
    username   | character varying(255)   |           | not null | 
    name       | character varying(255)   |           | not null | 
    created_at | timestamp with time zone |           | not null | 
    updated_at | timestamp with time zone |           | not null | 
    Indexes:
        "users_pkey" PRIMARY KEY, btree (username)
    Referenced by:
        TABLE "blogs" CONSTRAINT "blogs_user_username_fkey" FOREIGN KEY (user_username) REFERENCES users(username) ON UPDATE CASCADE ON DELETE SET NULL    
    */

    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
    await queryInterface.addColumn('notes', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('notes')
    await queryInterface.dropTable('users')
  },
}