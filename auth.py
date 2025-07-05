from db import connect_db , mysql

def register_user(name, email, password):
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", 
                       (name, email, password))
        conn.commit()
        return True, "Registration successful!"
    except mysql.connector.Error as e:
        return False, f"Error: {e}"
    finally:
        conn.close()

def login_user(email, password):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name FROM users WHERE email=%s AND password=%s", (email, password))
    result = cursor.fetchone()
    conn.close()
    if result:
        return True, result[0], result[1]
    else:
        return False, None, None
