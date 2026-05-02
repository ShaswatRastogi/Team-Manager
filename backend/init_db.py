import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def init_db():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("DATABASE_URL not found in .env")
        return
    
    print("Connecting to Supabase...")
    conn = psycopg2.connect(db_url)
    cursor = conn.cursor()
    
    print("Creating tables...")
    
    # 1. Create the Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL
    );
    """)
    
    # 2. Create the Projects table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL
    );
    """)
    
    # 3. Create the Tasks table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        task_name VARCHAR(255) NOT NULL,
        assigned_to VARCHAR(255) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL
    );
    """)
    
    conn.commit()
    cursor.close()
    conn.close()
    
    print("Database initialized successfully!")

if __name__ == "__main__":
    init_db()
