-- CREATE DATABASE IF NOT EXISTS nest-apidb
SELECT 'CREATE DATABASE nest-apidb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nest-apidb')\gexec