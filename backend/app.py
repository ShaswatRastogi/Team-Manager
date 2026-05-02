from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

import os
from dotenv import load_dotenv

load_dotenv()

db_url = os.getenv("DATABASE_URL")

if db_url:
    conn = psycopg2.connect(db_url)
else:
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", os.getenv("PGHOST", "localhost")),
        database=os.getenv("DB_NAME", os.getenv("PGDATABASE", "Ethara")),
        user=os.getenv("DB_USER", os.getenv("PGUSER", "postgres")),
        password=os.getenv("DB_PASSWORD", os.getenv("PGPASSWORD", "")),
        port=os.getenv("DB_PORT", os.getenv("PGPORT", "5432"))
    )

cursor = conn.cursor()


@app.route("/register", methods=["POST"])
def register():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not name or not email or not password:
        return jsonify({
            "message": "Please fill all details"
        }), 400

    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({
            "message": "User already exists"
        }), 400

    cursor.execute(
        """
        INSERT INTO users (name, email, password, role)
        VALUES (%s, %s, %s, %s)
        """,
        (name, email, password, role)
    )

    conn.commit()

    return jsonify({
        "message": "User Registered Successfully"
    }), 200

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data.get("email")
    password = data.get("password")

    cursor.execute(
        """
        SELECT role FROM users
        WHERE email = %s AND password = %s
        """,
        (email, password)
    )

    user = cursor.fetchone()

    if user:
        return jsonify({
            "message": "Login Successful",
            "role": user[0]
        }), 200
    else:
        return jsonify({
            "message": "Invalid Email or Password"
        }), 400
    
@app.route("/create-project", methods=["POST"])
def create_project():
    data = request.json

    project_name = data.get("projectName")
    project_description = data.get("projectDescription")

    if not project_name or not project_description:
        return jsonify({
            "message": "Please fill project details"
        }), 400

    cursor.execute(
        """
        INSERT INTO projects (name, description)
        VALUES (%s, %s)
        """,
        (project_name, project_description)
    )

    conn.commit()

    return jsonify({
        "message": "Project Created Successfully"
    }), 200

@app.route("/create-task", methods=["POST"])
def create_task():
    try:
        data = request.json

        task_name = data.get("taskName")
        assigned_to = data.get("assignedTo")
        task_status = data.get("taskStatus")

        if not task_name or not assigned_to:
            return jsonify({
                "message": "Please fill task details"
            }), 400

        cursor.execute("SELECT email FROM users WHERE email = %s", (assigned_to,))
        if not cursor.fetchone():
            return jsonify({
                "message": f"User with email {assigned_to} doesn't exist"
            }), 400

        cursor.execute(
            """
            INSERT INTO tasks
            (task_name, assigned_to, status)
            VALUES (%s, %s, %s)
            """,
            (task_name, assigned_to, task_status)
        )

        conn.commit()

        return jsonify({
            "message": "Task Created Successfully"
        }), 200

    except Exception as e:
        conn.rollback()

        return jsonify({
            "message": str(e)
        }), 500

@app.route("/get-projects", methods=["GET"])
def get_projects():
    cursor.execute(
        "SELECT * FROM projects"
    )

    projects = cursor.fetchall()

    project_list = []

    for project in projects:
        project_list.append({
            "id": project[0],
            "name": project[1],
            "description": project[2]
        })

    return jsonify(project_list), 200

@app.route("/get-tasks", methods=["GET"])
def get_tasks():
    try:
        email = request.args.get("email")
        role = request.args.get("role")
        print("EMAIL RECEIVED:", email, "ROLE:", role)
        
        if role == 'Admin':
            cursor.execute("SELECT * FROM tasks")
        else:
            cursor.execute(
                """
                SELECT * FROM tasks
                WHERE assigned_to = %s
                """,
                (email,)
            )

        tasks = cursor.fetchall()

        task_list = []

        for task in tasks:
            task_list.append({
                "id": task[0],
                "task": task[1],
                "member": task[2],
                "status": task[3]
            })

        return jsonify(task_list), 200

    except Exception as e:
        conn.rollback()

        return jsonify({
            "message": str(e)
        }), 500
    
@app.route("/delete-task/<int:id>", methods=["DELETE"])
def delete_task(id):
    cursor.execute(
        "DELETE FROM tasks WHERE id = %s",
        (id,)
    )

    conn.commit()

    return jsonify({
        "message": "Task Deleted Successfully"
    }), 200
if __name__ == "__main__":
    app.run(debug=True)