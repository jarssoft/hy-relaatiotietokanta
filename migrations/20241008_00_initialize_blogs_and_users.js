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

    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      author: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
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
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,        
            validate: {
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
    await queryInterface.addColumn('blogs', 'user_username', {
      type: DataTypes.STRING,
      allowNull: false,
      references: { model: 'users', key: 'username' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },
}